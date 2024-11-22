import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MainButton, BackButton } from '@vkruglikov/react-telegram-web-app'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="container">
      <h1>火箭競速</h1>
      <p>歡迎來到火箭競速遊戲！準備好與其他玩家一較高下了嗎？</p>
      
      <div className="button-container">
        <MainButton 
          text="開始遊戲"
          onClick={() => navigate('/game')}
        />
        
        <button 
          className="button"
          onClick={() => navigate('/leaderboard')}
        >
          排行榜
        </button>
      </div>
      
      <div className="rules">
        <h2>遊戲規則</h2>
        <ul>
          <li>每個火箭配備三個推進器</li>
          <li>使用推進器加速或減速</li>
          <li>撞到邊界即失敗</li>
          <li>第一個到達終點的玩家獲勝</li>
        </ul>
      </div>
    </div>
  )
}

export default Home
