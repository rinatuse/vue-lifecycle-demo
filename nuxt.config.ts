// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],
  
  // Добавляем плагин WebSocket
  plugins: [
    '~/plugins/websocket.js'
  ],
  
  // Добавляем переменные окружения для WebSocket
  runtimeConfig: {
    // Приватные переменные, доступные только на сервере
    websocketServerPort: process.env.WEBSOCKET_SERVER_PORT || 3001,
    
    // Публичные переменные, доступные и на клиенте
    public: {
      websocketUrl: process.env.WEBSOCKET_URL || 'ws://localhost:3001'
    }
  }
})