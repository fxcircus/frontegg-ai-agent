import 'dotenv/config'; // Load .env variables
import express, { Request, Response } from 'express';
import cors from 'cors'; // Import cors
import { createLLMAgent, LLMAgent } from './services/llm-agent'; // Adjust path if needed
import { logger } from './utils/logger'; // Assuming logger is setup similarly

const app = express();

// Use SERVER_PORT from env, default to 3001 if not set
const port = process.env.SERVER_PORT || 3001;

// Enable CORS for all origins (for development)
// IMPORTANT: For production, configure specific origins: app.use(cors({ origin: 'YOUR_FRONTEND_URL' }));
app.use(cors());

app.use(express.json()); // Middleware to parse JSON bodies

// Create a singleton instance of the agent
let agent: LLMAgent | null = null;
let isInitializing = false;
let initializationError: Error | null = null;

// Define timeout duration for agent initialization (120 seconds)
const INITIALIZATION_TIMEOUT = 120000;

async function getAgentInstance() {
	if (agent) {
		return agent;
	}
	if (isInitializing) {
		// Wait for the ongoing initialization to complete
		await new Promise<void>((resolve) => {
			const interval = setInterval(() => {
				if (!isInitializing) {
					clearInterval(interval);
					resolve();
				}
			}, 100); // Check every 100ms
		});
		// After waiting, check if initialization succeeded
		if (initializationError) throw initializationError;
		if (agent) return agent;
		// If agent is still null after waiting, something went wrong
		throw new Error('Agent initialization failed after waiting.');
	}

	isInitializing = true;
	initializationError = null;
	logger.info('Initializing agent instance...');

	// Create a promise that rejects after a timeout
	const timeoutPromise = new Promise<LLMAgent>((_, reject) => {
		setTimeout(() => {
			reject(new Error(`Agent initialization timed out after ${INITIALIZATION_TIMEOUT/1000} seconds`));
		}, INITIALIZATION_TIMEOUT);
	});

	try {
		const newAgent = createLLMAgent();
		
		// Race between initialization and timeout
		const initialized = await Promise.race([
			newAgent.initializeFronteggAIAgentsClient().then(() => newAgent),
			timeoutPromise
		]);
		
		agent = initialized; // Assign only after successful initialization
		logger.info('Agent instance initialized successfully.');
		isInitializing = false;
		return agent;
	} catch (error) {
		logger.error('Failed to initialize agent instance:', error);
		initializationError = error instanceof Error ? error : new Error(String(error));
		isInitializing = false;
		throw initializationError; // Re-throw the error
	}
}

// API Route for processing agent requests
app.post('/api/agent', async (req: Request, res: Response) => {
	try {
		const { message } = req.body;

		if (!message || typeof message !== 'string') {
			return res.status(400).json({ error: 'Message is required and must be a string' });
		}
		const userJwt = req.headers['authorization'] as string;

		// Check if userJwt is provided
		if (!userJwt) {
			return res.status(401).json({ error: 'Authorization header is required' });
		}

		try {
			const agentInstance = await getAgentInstance(); 
			logger.info('Processing request with agent...');
			const result = await agentInstance.processRequest(message, userJwt);
			logger.info('Agent processing complete.');

			// Extract the text content from the response
			const responseText =
				typeof result === 'string' ? result : result?.output || result?.content || JSON.stringify(result);

			res.json({ response: responseText });
		} catch (error: unknown) {
			// Handle agent-specific errors
			logger.error('Agent error:', error);
			
			// Special handling for timeout errors
			const agentError = error as Error;
			if (agentError.message && agentError.message.includes('timed out')) {
				return res.status(504).json({ 
					error: 'Gateway timeout',
					message: 'The request to Frontegg API timed out. Please try again later.',
					details: agentError.message
				});
			}
			
			// Handle other agent errors
			const errorMessage = agentError instanceof Error ? agentError.message : 'Failed to process with agent';
			const statusCode = agentError instanceof Error && (agentError as any).status ? (agentError as any).status : 500;
			
			res.status(statusCode).json({ error: errorMessage });
		}
	} catch (error) {
		logger.error('Error processing message in /api/agent:', error);
		const errorMessage = error instanceof Error ? error.message : 'Failed to process message';
		// Determine status code based on error type if needed
		const statusCode = error instanceof Error && (error as any).status ? (error as any).status : 500;
		// Check if the error indicates agent wasn't initialized (might happen if initialize fails)
		if (errorMessage.includes('Agent not initialized')) {
			res.status(503).json({
				error: 'Agent initialization failed or is in progress. Please try again later.',
				details: errorMessage,
			});
		} else {
			res.status(statusCode).json({ error: errorMessage });
		}
	}
});

// Basic root route
app.get('/', (req: Request, res: Response) => {
	res.send('AI Agent Backend Server is running!');
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
	res.json({ 
		status: 'ok',
		agent: agent ? 'initialized' : (isInitializing ? 'initializing' : 'not initialized'),
		timestamp: new Date().toISOString()
	});
});

// Start the server
app.listen(port, () => {
	logger.info(`Server listening on port ${port}`);
	// Try to initialize the agent on startup (optional, but can surface errors early)
	// getAgentInstance().catch(() => {
	// 	logger.warn('Agent initialization failed on startup. Will retry on first request.');
	// });
});
