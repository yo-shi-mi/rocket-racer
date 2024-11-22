import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackButton } from '@vkruglikov/react-telegram-web-app'

const Game = () => {
  const navigate = useNavigate()
  const [gameState, setGameState] = useState('waiting') // waiting, playing, finished
  const [position, setPosition] = useState({ y: 50 }) // 火箭位置百分比
  const gameRef = useRef(null)

  useEffect(() => {
    // 返回按鈕處理
    const handleBack = () => {
      if (gameState === 'playing') {
        // 提示用戶是否確定要離開
        if (window.confirm('確定要離開遊戲嗎？')) {
          navigate('/')
        }
      } else {
        navigate('/')
      }
    }

    return () => {
      // 清理事件監聽
    }
  }, [gameState, navigate])

  const handleTouchStart = (e) => {
    if (gameState !== 'playing') return
    
    const touch = e.touches[0]
    const gameRect = gameRef.current.getBoundingClientRect()
    const touchY = ((touch.clientY - gameRect.top) / gameRect.height) * 100
    
    // 更新火箭位置
    setPosition({ y: Math.max(0, Math.min(100, touchY)) })
  }

  const startGame = () => {
    setGameState('playing')
  }

  return (
    <div className="container">
      <BackButton onClick={() => navigate('/')} />
      
      <div 
        ref={gameRef}
        className="game-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchStart}
      >
        {gameState === 'waiting' ? (
          <div className="game-overlay">
            <button className="button" onClick={startGame}>
              開始遊戲
            </button>
          </div>
        ) : (
          <>
            <div 
              className="rocket player1"
              style={{
                left: '10%',
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
            <div className="target" />
          </>
        )}
      </div>

      {gameState === 'playing' && (
        <div className="controls">
          <div className="thruster-controls">
            {[1, 2, 3].map((i) => (
              <button
                key={i}
                className="thruster-button"
                onClick={() => console.log(`啟動推進器 ${i}`)}
              >
                推進器 {i}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Game
