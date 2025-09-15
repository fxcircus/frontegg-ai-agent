# Jira Integration Setup Guide for Frontegg AI Agent
Example showing how to connect Jira to Frontegg's AI agent, allowing end-users to authorize and manage Jira directly from your app.

## Prerequisites
- ✅ Jira account created
- ✅ Frontegg environment with AI Agent configured
- ✅ Your agent running locally

## Step 1: Create OAuth App in Atlassian/Jira

### 1.1 Access Atlassian Developer Console
1. Go to https://developer.atlassian.com/console/myapps/
2. Log in with your Jira account credentials
3. Click "Create" → "OAuth 2.0 integration"

### 1.2 Configure Your OAuth App
Fill in the following details:

**App Name**: `Frontegg AI Agent Demo` (or your preferred name)


### 1.3 Set Permissions (Scopes)
Click on "Permissions" ➜ "Jira API", and add these scopes:

**Classic Scopes** (for Jira, add more as needed):
- `read:jira-work` - View Jira issue data
- `write:jira-work` - Create and edit issues
- `read:jira-user` - View user details
- `manage:jira-project` - Manage project details
- `manage:jira-configuration` - Manage Jira settings


### 1.4 Configure OAuth 2.0 Settings
1. Click on "Authorization" in the left menu
2. Set the **Callback URL** (Replace with your actual URL from the tool page in Frontegg)
:
   ```
   https://api.frontegg.com/app-integrations/resources/oauth/v1/callback
   ```
   
3. Save the configuration

### 1.5 Get Your Credentials
After saving, you'll receive:
- **Client ID**: Copy this (looks like: `AbCdEfGhIjKlMnOpQrStUvWxYz123456`)
- **Client Secret**: Copy this (keep it secure!)

## Step 2: Configure Jira Integration in Frontegg

### 2.1 Access Frontegg Portal
1. Log in to https://portal.frontegg.com
2. Navigate to your environment (Development/Production ...)

### 2.2 Set Up Third-Party Integration
1. Go to **AI Agents** → **Tools** ➜ Click on **Add Integration** ➜ Search for **Jira**


**OAuth Configuration**:
- **Client ID**: Paste from Step 1.5
- **Client Secret**: Paste from Step 1.5
- **Scopes (add as needed)**:
  ```
  read:jira-work
  write:jira-work
  read:jira-user
  offline_access
  ```
- **Redirect URI**: This is the link you need to copy to Jira

## Step 4: Authorize the Integration (User Side)

### 4.1 Access Your Application
1. Start your app: `npm run dev:all`
2. Navigate to http://localhost:3000
3. Log in with your user credentials
4. Ask our AI agent to authorize with Jira. The agent will respond that it needs authorization. Click it - you'll be redirected to Atlassian. Log in to your Jira account. Review and "Accept" the permissions. You'll be redirected back to your app

## Step 5: Test the Integration

### 5.1 Basic Test Commands
Try these prompts with your agent:

```
"Create a Jira ticket for the SSO feature we promised to Acme Corp"
```

```
"Log a task in Jira: Build SSO enhancement, Priority: High, Due: October 15th"
```

```
"What Jira tickets are currently open in the DEMO project?"
```

### 5.2 Expected Responses
The agent should:
1. Acknowledge the request
2. Create the ticket in Jira
3. Return the ticket ID (e.g., "DEMO-1")
4. Provide a link to the ticket

## Step 6: Verify in Jira

1. Go to your Jira instance: `https://[your-site].atlassian.net`
2. Navigate to your project
3. Check the "Issues" or "Board" view
4. You should see the newly created ticket

## Troubleshooting

### Common Issues and Solutions

**Issue**: "Authorization required" message keeps appearing
- **Solution**: Clear browser cookies and re-authorize

**Issue**: "Invalid redirect URI" error
- **Solution**: Ensure the callback URL in Atlassian matches exactly with Frontegg

**Issue**: "Insufficient permissions" when creating tickets
- **Solution**: Add more scopes in Atlassian app configuration

**Issue**: Agent says Jira is not configured
- **Solution**:
  1. Check that integration is enabled in Frontegg
  2. Verify agent has integration access
  3. Restart your server



## Step 7: Demo-Specific Setup

### Create Demo Data in Jira
1. Create a project called "DEMO" or "FEATURES"
2. Add a few sample issues:
   - "Implement SAML SSO" (In Progress)
   - "Add MFA Support" (Done)
   - "API Rate Limiting" (To Do)

### Set Up Quick Demo Scenarios
Create these for smooth demos:

1. **High Priority Feature**:
   ```
   "We promised Enterprise SSO to Acme Corp by October 15th for their $500K renewal"
   ```

2. **Bug Report**:
   ```
   "Customer reported login issues, need to track this in Jira as critical"
   ```

3. **Feature Request**:
   ```
   "Add this to Jira: Custom dashboard requested by TechCorp, medium priority"
   ```


## Key Points:
1. **OAuth Flow**: The agent requests permission just like a human user would
2. **Scoped Access**: Agent only has access to what you authorize
