import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game'
import Leaderboard from './pages/Leaderboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/game',
    element: <Game />,
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />,
  },
], {
  basename: '/rocket-racer'
})

export default router
