# Frontegg AI Agent Example

This project demonstrates how to build AI agents using the Frontegg AI framework SDK. It serves as a reference implementation for developers looking to create authenticated AI agents with third-party integrations and user context management.

In this example we are building a Customer Commitment Lifecycle Agent.
An autonomous B2B agent that helps sales and customer success teams fulfill their product feature commitments. 
Working on behalf of authenticated users at B2B companies and have access to Slack, Jira, HubSpot, and Google Calendar.

## Overview

The project showcases:
- Langchain integration with Frontegg AI typescript SDK for authentication, user management, and Frontegg's built-in and 3rd party app tools integration
- Building Langchain AI agents with user and identity context
- Using third-party application tools (Slack, Jira, HubSpot, Google Calendar) with a secure OAuth connection managed by Frontegg
- React-based frontend with real-time agent interactions
- Express.js backend for agent orchestration

## Features

- **Authentication & Authorization**: Leverages Frontegg for secure user authentication
- **User Context**: Demonstrates how to maintain user context in AI agent interactions
- **Third-Party Integrations**: Shows integration patterns with various business tools

## Tech Stack

- Frontend: React, Vite, TailwindCSS
- Backend: Express.js, TypeScript
- AI Framework: Langchain, OpenAI as the LLM model and Frontegg AI Agents SDK
- Authentication: Frontegg
- Integrations: Slack, Jira, HubSpot, Google Calendar

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev:all
   ```

## Environment Variables

### Setup a Frontegg account

1.  **Get your Frontegg credentials:**
    *   Log in to your Frontegg environment via portal.frontegg.com
    *   Navigate to **Environments** -> **Development** (or your preferred environment).
    *   Go to **Settings** -> **Keys & Domains** and note down your **Client ID** and **Secret Key (API Key)**.
    *   Go to **Settings** -> **Keys & Domains / Domains tab** and note down your **Frontegg Base URL** (e.g., `https://app-xxxx.frontegg.com`).

2.  **Create a Frontegg Agent:**
    *   Navigate to the **AI Agents/Agents** section in your Frontegg environment.
    *   Click **Create Agent**.
    *   Give your agent a name (e.g., "My Cool Agent").
    *   After Creation open the Agent page and note down the **Agent ID**.



### Configure your .env

Create a `.env` file in the project root (you can copy from `.env.example`). Fill it with your credentials:

```env title=".env"
# Shared backend and frontend vars
VITE_FRONTEGG_AGENT_ID=YOUR_FRONTEGG_AGENT_ID     # ID from "Agents" ➜ YourAgentName
VITE_FRONTEGG_CLIENT_ID=YOUR_FRONTEGG_ENV_CLIENT_ID # Client ID from "Keys & Domains"

# Backend only vars
FRONTEGG_CLIENT_SECRET=YOUR_FRONTEGG_ENV_API_KEY # "API Key" from "Keys & Domains"
OPENAI_API_KEY=YOUR_OPENAI_API_KEY                # OpenAI API Key

# Frontend only vars
VITE_API_BASE_URL=http://localhost:3001           # Your backend API URL
VITE_FRONTEGG_BASE_URL=YOUR_FRONTEGG_BASE_URL    # Frontegg Base URL from "Applications" ➜ yourAppName
```
