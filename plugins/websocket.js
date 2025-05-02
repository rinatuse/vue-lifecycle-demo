// plugins/websocket.js
import { ref } from 'vue'

export default defineNuxtPlugin(() => {
  // Состояние WebSocket для всего приложения
  const webSocket = ref(null)
  const isConnected = ref(false)
  const error = ref(null)
  const messages = ref([])
  
  // URL для WebSocket-сервера
  const wsUrl = 'ws://localhost:3001' // В реальном приложении берем из конфигурации
  
  // Подключаемся к WebSocket-серверу
  function connect() {
    if (webSocket.value) return
    
    try {
      const ws = new WebSocket(wsUrl)
      
      ws.onopen = () => {
        isConnected.value = true
        error.value = null
        messages.value.push({
          type: 'system',
          text: 'Соединение установлено',
          timestamp: Date.now()
        })
      }
      
      ws.onclose = () => {
        isConnected.value = false
        webSocket.value = null
        messages.value.push({
          type: 'system',
          text: 'Соединение закрыто',
          timestamp: Date.now()
        })
      }
      
      ws.onerror = (e) => {
        error.value = 'Ошибка подключения'
        console.error('WebSocket error:', e)
        messages.value.push({
          type: 'error',
          text: 'Произошла ошибка соединения',
          timestamp: Date.now()
        })
      }
      
      ws.onmessage = (event) => {
        try {
          // Обрабатываем входящие сообщения
          const message = JSON.parse(event.data)
          
          messages.value.push({
            ...message,
            received: true,
            timestamp: Date.now()
          })
          
          // Если нужна дополнительная обработка
          handleMessage(message)
        } catch (err) {
          console.error('Error parsing message:', err)
          messages.value.push({
            type: 'error',
            text: 'Получено некорректное сообщение',
            timestamp: Date.now()
          })
        }
      }
      
      webSocket.value = ws
    } catch (err) {
      error.value = err.message
      console.error('Failed to connect to WebSocket:', err)
    }
  }
  
  // Отправка сообщения через WebSocket
  function sendMessage(data) {
    if (!webSocket.value || !isConnected.value) {
      return false
    }
    
    try {
      const message = typeof data === 'string' ? data : JSON.stringify(data)
      webSocket.value.send(message)
      
      // Добавляем отправленное сообщение в историю
      messages.value.push({
        ...(typeof data === 'string' ? { text: data } : data),
        sent: true,
        timestamp: Date.now()
      })
      
      return true
    } catch (err) {
      error.value = err.message
      console.error('Error sending message:', err)
      return false
    }
  }
  
  // Обработка входящих сообщений
  function handleMessage(message) {
    // Здесь можно добавить специальную обработку для разных типов сообщений
    console.log('Received message:', message)
  }
  
  // Закрытие соединения
  function disconnect() {
    if (webSocket.value) {
      webSocket.value.close()
    }
  }
  
  // Предоставляем API для компонентов
  return {
    provide: {
      websocket: {
        connect,
        disconnect,
        sendMessage,
        webSocket,
        isConnected,
        messages,
        error,
        clearMessages: () => {
          messages.value = []
        }
      }
    }
  }
})