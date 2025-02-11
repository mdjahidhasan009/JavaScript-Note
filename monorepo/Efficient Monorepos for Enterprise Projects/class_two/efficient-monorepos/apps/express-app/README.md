# Express TypeScript Application

This is a modern Express.js application built with TypeScript, providing a robust foundation for building scalable web applications.

## Features

- Express.js with TypeScript
- CORS enabled
- Security headers with Helmet
- Environment variables support
- Error handling middleware
- TypeScript configuration
- Development hot-reload
- ESLint configuration
- Jest testing setup

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start development server:
   ```bash
   pnpm dev
   ```

3. Build for production:
   ```bash
   pnpm build
   ```

4. Start production server:
   ```bash
   pnpm start
   ```

## Scripts

- `pnpm dev` - Start development server with hot-reload
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests

## Project Structure

```
express-app/
├── src/
│   └── index.ts
├── dist/
├── package.json
├── tsconfig.json
└── README.md
```
