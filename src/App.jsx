import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import { ethers } from 'ethers';
import WebApp from '@twa-dev/sdk';

// Game configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  parent: 'game-container'
};

// Game variables
let rocket1;
let rocket2;
let cursors;
let gameStarted = false;
let game;

function preload() {
  this.load.image('rocket', 'assets/rocket.png');
  this.load.image('target', 'assets/target.png');
}

function create() {
  // Create rockets
  rocket1 = this.add.sprite(100, 300, 'rocket');
  rocket2 = this.add.sprite(100, 400, 'rocket');
  
  // Create target
  const target = this.add.sprite(700, 350, 'target');
  
  // Enable physics
  this.physics.add.existing(rocket1);
  this.physics.add.existing(rocket2);
  
  // Add controls
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (!gameStarted) return;
  
  // Basic movement controls
  if (cursors.up.isDown) {
    rocket1.y -= 4;
  }
  if (cursors.down.isDown) {
    rocket1.y += 4;
  }
  
  // Check boundaries
  if (rocket1.y < 0 || rocket1.y > 600) {
    gameOver('Rocket 1 crashed!');
  }
}

function gameOver(message) {
  gameStarted = false;
  // Handle game over logic
}

function App() {
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    // Initialize game
    game = new Phaser.Game(config);
    
    // Connect to blockchain
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setIsConnected(true);
        } catch (error) {
          console.error('Error connecting wallet:', error);
        }
      }
    };
    
    connectWallet();
    
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="app">
      <div id="game-container"></div>
      <div className="controls">
        <button onClick={() => gameStarted = true}>Start Game</button>
        {!isConnected && (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>
    </div>
  );
}

export default App;
