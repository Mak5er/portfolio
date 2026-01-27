# Portfolio Frontend

Personal portfolio website built with React, Vite, TypeScript, and Tailwind CSS.

## Repository

This repo contains the frontend app and a serverless contact form endpoint.

## Requirements

- Node.js 18+ (recommended)
- npm (or yarn/pnpm)

## Getting Started

Install dependencies:

```bash
yarn
```

Start the dev server:

```bash
yarn dev
```

The app runs at `http://localhost:3000`.

## Build & Preview

Build for production:

```bash
yarn build
```

## Customize the Content

All site content is controlled from:

- `src/config/portfolio.ts`

Key sections you can edit:

- Personal info: `name`, `title`, `subtitle`, `bio`
- Contact/social links: `contact`
- Skills: `skills`
- Projects: `projects`
- Contributions & organization projects: `contributions`
- Contributors (GitHub avatars auto-fetched): `contributionsSection.contributors`
- GitHub stats: `githubStats`
- Tech stack (auto from GitHub languages): `contributionsTechStack`
- Experience timeline: `experience`

### Contributors (GitHub avatars)

Add GitHub links and roles here:

```ts
contributionsSection: {
  contributorsEnabled: true,
  contributorsTitle: "Contributors",
  contributors: [
    { github: "https://github.com/username", role: "Developer" },
  ],
},
```

The site fetches avatar + display name from the GitHub API.

### Tech Stack (auto from GitHub)

The tech stack can auto-populate from your GitHub repos:

```ts
contributionsTechStack: {
  enabled: true,
  title: "Tech Stack",
  source: "github",
  user: "username",
  limit: 8,
  items: [],
},
```

## Notes

- GitHub data is fetched from public APIs and may be rate-limited.
- If you want to avoid API calls, you can disable sections or provide manual data.

## Contact Form API (Telegram)

The contact form sends a POST request to `/api/contact` (see `functions/api/contact.ts`).
The function validates the form data and forwards the message to a Telegram group/chat
using a bot.

### Required Environment Variables

Set the following variables for the function:

- `BOT_TOKEN` - Telegram bot token from BotFather
- `CHAT_ID` - Telegram group/chat ID (for groups, it usually starts with `-100`)

For local development you can place them in `.dev.vars`:

```bash
BOT_TOKEN=123456789:your_bot_token_here
CHAT_ID=-1001234567890
```

### Telegram Bot Setup (Quick Steps)

1. Create a bot via @BotFather and copy the token.
2. Add the bot to your Telegram group.
3. Send a message in the group, then get the group chat ID (e.g., using @getidsbot
   or by calling the Telegram API `getUpdates` for your bot).
4. Put `BOT_TOKEN` and `CHAT_ID` into your environment (or `.dev.vars` for local).

### Payload Example

The frontend sends JSON:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hello! I like your work."
}
```
