// Telegram 配置
export const telegramConfig = {
  botToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
  botUsername: import.meta.env.VITE_TELEGRAM_BOT_USERNAME,
  
  // Mini App 配置
  initData: window.Telegram?.WebApp?.initData || '',
  initDataUnsafe: window.Telegram?.WebApp?.initDataUnsafe || {},
  
  // 檢查是否在 Telegram 環境中運行
  isInTelegram: Boolean(window.Telegram?.WebApp),
  
  // 檢查是否在開發環境
  isDevelopment: import.meta.env.DEV,
}

// 驗證 Telegram WebApp 數據
export const validateTelegramWebApp = () => {
  if (!telegramConfig.isInTelegram && !telegramConfig.isDevelopment) {
    throw new Error('此應用程序只能在 Telegram 中運行')
  }
  
  // 在生產環境中驗證 initData
  if (!telegramConfig.isDevelopment && !telegramConfig.initData) {
    throw new Error('無效的 Telegram WebApp 數據')
  }
  
  return true
}
