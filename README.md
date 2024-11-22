# Rocket Racer - Telegram Mini App

A blockchain-based rocket racing game where two players compete to reach the finish line first, using smart contract-controlled thrusters.

## Features

- Two-player competitive racing
- Blockchain-integrated gameplay
- Three thrusters per rocket
- Smart contract betting system
- Real-time multiplayer interaction

## Technology Stack

- Frontend: React + Vite
- Game Engine: Phaser 3
- Blockchain Integration: Web3.js/Ethers.js
- Smart Contracts: Solidity
- Platform: Telegram Mini App

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Smart Contract Deployment

1. Install Hardhat or Truffle
2. Configure network settings
3. Deploy ThrusterControl.sol to your chosen network
4. Update contract address in the frontend code

## Game Rules

- Each rocket has 3 thrusters controlled by smart contracts
- Players can accelerate or brake using their thrusters
- Hitting screen edges results in a crash and loss
- First rocket to reach the target wins
- Winner receives their pot back plus a portion of the loser's pot

## Development

This is a Telegram Mini App that uses the Telegram Web App SDK for integration with the Telegram platform. The game is built using Phaser 3 for the game engine and integrates with blockchain for thruster control and betting mechanics.
