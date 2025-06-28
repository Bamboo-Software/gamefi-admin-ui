# Flappy Fox Admin UI

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://choosealicense.com/licenses/mit/)

Flappy Fox Admin UI is a modern administration dashboard for managing the Lottery platform. Built with React, Vite, and TypeScript, it provides tools for user management, blockchain monitoring, season control, and more.

## 📝 About the Project

This project enables administrators to:

- Manage users, games, tasks, and rewards.
- Monitor and interact with blockchain smart contracts for lottery draws, ticket purchases, and prize distribution.
- Handle multiple lottery "seasons" (periods/rounds), each with its own configuration, participants, and results.
- View real-time statistics, reports, and activity logs.
- Use a modern, responsive UI with reusable components.

### Blockchain Handling

- Integrates with blockchain networks via smart contracts.
- Displays transaction hashes, contract events, and blockchain status.
- Allows admins to trigger on-chain actions (e.g., draw winners, distribute rewards).
- Provides troubleshooting tools for blockchain operations.

## 🔗 Chainlink Features Used

This project leverages several advanced Chainlink services to enhance security, interoperability, and fairness:

### 1. Chainlink CCIP (Cross-Chain Interoperability Protocol)
- **Purpose:** Enables secure cross-chain messaging and token transfers between supported blockchains.
- **Usage in project:** Used for cross-chain NFT and token operations, allowing users to interact seamlessly across Ethereum, BSC, and Avalanche.

### 2. Chainlink Price Feed
- **Purpose:** Provides reliable, decentralized price data for various tokens.
- **Usage in project:** Used to fetch real-time token prices for staking, rewards calculation, and NFT pricing, ensuring accurate and up-to-date values.

### 3. Chainlink VRF (Verifiable Random Function)
- **Purpose:** Supplies provably fair and tamper-proof randomness on-chain.
- **Usage in project:** Used for random reward distributions, guaranteeing fairness and transparency for all participants.


### Season Management

- Supports creation, updating, and closing of lottery seasons.
- Each season has its own tickets, prize pools, and participant tracking.
- Admins can configure season-specific rules and monitor progress.

## 🎉 Features

- **React** – Modern UI library.
- **Vite** – Fast build tool.
- **TypeScript** – Type-safe development.
- **Tailwind CSS** – Utility-first styling.
- **shadcn/ui** – Beautiful UI components.
- **Redux Toolkit & RTK Query** – State and API management.
- **React Hook Form** – Form handling.
- **React Router Dom** – Routing.
- **Motion** – Animations.
- **ESLint & Prettier** – Code quality.
- **Docker** – Containerization support.

## ⚙️ Prerequisites

- Node.js (version 16 or above)
- pnpm (recommended), npm, or yarn

## 🚀 Getting Started

Follow these steps to run the project locally:

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd admin-ui
   ```

2. **Install dependencies:**
   ```sh
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   - Copy the example file and edit as needed:
     ```sh
     cp .env.example .env
     ```
   - Edit `.env` to set your backend API endpoint.

4. **Run the development server:**
   ```sh
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

5. **Build for production:**
   ```sh
   pnpm build
   # or
   npm run build
   # or
   yarn build
   ```

6. **Preview the production build:**
   ```sh
   pnpm preview
   # or
   npm run preview
   # or
   yarn preview
   ```


7. **Run lint checks:**
   ```sh
   pnpm lint
   # or
   npm run lint
   # or
   yarn lint
   ```
