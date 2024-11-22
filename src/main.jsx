import React from 'react'
import ReactDOM from 'react-dom/client'
import { WebApp } from '@twa-dev/sdk'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './styles/index.scss'

// 初始化 Telegram WebApp
WebApp.ready()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
