import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game'
import Leaderboard from './pages/Leaderboard'

const router = createBrowserRouter([
  {
    path: '/rocket-racer/',
    element: <Home />,
  },
  {
    path: '/rocket-racer/game',
    element: <Game />,
  },
  {
    path: '/rocket-racer/leaderboard',
    element: <Leaderboard />,
  },
], {
  basename: '/rocket-racer'
})

export default router
