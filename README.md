# Portfolio Frontend ✨

Personal portfolio website built with React, Vite, TypeScript, and Tailwind CSS. ⚛️⚡🧩🎨

## Requirements ✅

- Node.js 18+ (recommended) 🟢
- npm (or yarn/pnpm) 📦

## Getting Started 🚀

Install dependencies: 📥

```bash
yarn
```

Start the dev server: 🧪

```bash
yarn dev
```

The app runs at `http://localhost:3000`. 🌐

## Build & Preview 🏗️

Build for production: 🏁

```bash
yarn build
```

## Customize the Content 🛠️

All site content is controlled from: 🗂️

- `src/config/portfolio.ts`

Key sections you can edit: ✍️

- Personal info: `name`, `title`, `subtitle`, `bio` 👤
- Contact/social links: `contact` 🔗
- Skills: `skills` 🧠
- Projects: `projects` 🧩
- Contributions & organization projects: `contributions` 🤝
- Contributors (GitHub avatars auto-fetched): `contributionsSection.contributors` 👥
- GitHub stats: `githubStats` 📊
- Tech stack (auto from GitHub languages): `contributionsTechStack` 🧰
- Experience timeline: `experience` 🧭

### Contributors (GitHub avatars) 👥

Add GitHub links and roles here: 🧾

```ts
contributionsSection: {
  contributorsEnabled: true,
  contributorsTitle: "Contributors",
  contributors: [
    { github: "https://github.com/username", role: "Developer" },
  ],
},
```

The site fetches avatar + display name from the GitHub API. 🧑‍💻

### Tech Stack (auto from GitHub) 🧰

The tech stack can auto-populate from your GitHub repos: ⚙️

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

## Notes 📝

- GitHub data is fetched from public APIs and may be rate-limited. ⏳
- If you want to avoid API calls, you can disable sections or provide manual data. ✋
