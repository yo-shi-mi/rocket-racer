import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BackButton } from '@vkruglikov/react-telegram-web-app'

const Leaderboard = () => {
  const navigate = useNavigate()
  
  // 模擬排行榜數據
  const rankings = [
    { rank: 1, name: '玩家 1', wins: 10, totalGames: 12 },
    { rank: 2, name: '玩家 2', wins: 8, totalGames: 15 },
    { rank: 3, name: '玩家 3', wins: 6, totalGames: 10 },
  ]

  return (
    <div className="container">
      <BackButton onClick={() => navigate('/')} />
      
      <h1>排行榜</h1>
      
      <div className="leaderboard">
        {rankings.map((player) => (
          <div key={player.rank} className="leaderboard-item">
            <div className="rank">#{player.rank}</div>
            <div className="player-info">
              <div className="name">{player.name}</div>
              <div className="stats">
                勝場：{player.wins} / 總場次：{player.totalGames}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Leaderboard
