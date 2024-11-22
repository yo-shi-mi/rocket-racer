import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackButton } from '@vkruglikov/react-telegram-web-app'

const Game = () => {
  const navigate = useNavigate()
  const [gameState, setGameState] = useState('waiting') // waiting, playing, finished
  const [position, setPosition] = useState({ x: 10, y: 50 }) // 火箭位置百分比
  const [fuel, setFuel] = useState(100) // 燃料量
  const [score, setScore] = useState(0) // 分數
  const gameRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (gameState === 'playing') {
      const gameLoop = () => {
        setFuel(prev => Math.max(0, prev - 0.1))
        setScore(prev => prev + 1)
        animationRef.current = requestAnimationFrame(gameLoop)
      }
      animationRef.current = requestAnimationFrame(gameLoop)
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameState])

  const handleTouchMove = (e) => {
    if (gameState !== 'playing' || fuel <= 0) return
    
    const touch = e.touches[0]
    const gameRect = gameRef.current.getBoundingClientRect()
    const touchY = ((touch.clientY - gameRect.top) / gameRect.height) * 100
    
    setPosition(prev => ({
      ...prev,
      y: Math.max(0, Math.min(100, touchY))
    }))
  }

  const startGame = () => {
    setGameState('playing')
    setFuel(100)
    setScore(0)
    setPosition({ x: 10, y: 50 })
  }

  const activateThruster = (power) => {
    if (fuel <= 0) return
    setFuel(prev => Math.max(0, prev - power * 5))
    setPosition(prev => ({
      ...prev,
      x: Math.min(90, prev.x + power * 2)
    }))
  }

  return (
    <div className="game-page">
      <BackButton onClick={() => navigate('/')} />
      
      <div className="game-stats">
        <div className="fuel-bar" style={{ width: `${fuel}%` }} />
        <div className="score">得分: {score}</div>
      </div>

      <div 
        ref={gameRef}
        className="game-container"
        onTouchMove={handleTouchMove}
      >
        {gameState === 'waiting' ? (
          <div className="game-overlay">
            <button className="start-button" onClick={startGame}>
              開始遊戲
            </button>
          </div>
        ) : (
          <>
            <div 
              className="rocket"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%) rotate(90deg)'
              }}
            >
              🚀
              {fuel > 0 && <div className="thrust">🔥</div>}
            </div>
            <div className="finish-line" style={{ left: '90%' }}>
              🏁
            </div>
          </>
        )}
      </div>

      {gameState === 'playing' && (
        <div className="controls">
          <div className="thruster-controls">
            {[
              { power: 1, label: '小推力' },
              { power: 2, label: '中推力' },
              { power: 3, label: '大推力' }
            ].map(({ power, label }) => (
              <button
                key={power}
                className={`thruster-button ${fuel <= 0 ? 'disabled' : ''}`}
                onClick={() => activateThruster(power)}
                disabled={fuel <= 0}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Game
