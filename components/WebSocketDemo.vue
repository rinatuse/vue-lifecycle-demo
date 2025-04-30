<template>
    <div class="websocket-demo">
      <h1>Изучаем WebSocket</h1>
      <p class="intro">Привет! Сегодня мы узнаем, как работает WebSocket и почему он такой классный!</p>
      
      <div class="mode-selector">
        <button 
          :class="{ active: currentMode === 'learn' }"
          @click="currentMode = 'learn'"
        >
          Узнать про WebSocket
        </button>
        <button 
          :class="{ active: currentMode === 'play' }"
          @click="currentMode = 'play'"
        >
          Поиграть с WebSocket
        </button>
        <button 
          :class="{ active: currentMode === 'code' }"
          @click="currentMode = 'code'"
        >
          Как использовать в Nuxt 3
        </button>
      </div>
      
      <!-- Режим обучения -->
      <div v-if="currentMode === 'learn'" class="learn-mode">
        <div class="step-navigation">
          <button 
            v-for="(step, index) in learningSteps" 
            :key="index"
            :class="{ active: currentStep === index }"
            @click="currentStep = index"
          >
            {{ index + 1 }}
          </button>
        </div>
        
        <div class="step-content">
          <h2>{{ learningSteps[currentStep].title }}</h2>
          <div class="step-description" v-html="learningSteps[currentStep].description"></div>
          
          <div class="visualization">
            <div class="ws-animation" :class="learningSteps[currentStep].animationClass">
              <div class="client-side">
                <div class="browser">
                  <div class="browser-bar">
                    <div class="url-bar">{{ currentUrl }}</div>
                  </div>
                  <div class="browser-content">
                    <div class="user-icon">
                      <div class="user-head"></div>
                      <div class="user-body"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="connection">
                <div class="traditional-connection" v-if="showTraditional">
                  <div class="http-request req1">HTTP запрос</div>
                  <div class="http-response resp1">HTTP ответ</div>
                  <div class="http-request req2">HTTP запрос</div>
                  <div class="http-response resp2">HTTP ответ</div>
                  <div class="http-request req3">HTTP запрос</div>
                  <div class="http-response resp3">HTTP ответ</div>
                </div>
                
                <div class="websocket-connection" v-if="showWebsocket">
                  <div class="ws-handshake-up">Установка соединения</div>
                  <div class="ws-handshake-down">Подтверждение</div>
                  <div class="ws-channel"></div>
                  <div class="ws-message client-message">Сообщение</div>
                  <div class="ws-message server-message">Сообщение</div>
                  <div class="ws-message client-message second">Сообщение</div>
                  <div class="ws-message server-message second">Сообщение</div>
                </div>
              </div>
              
              <div class="server-side">
                <div class="server">
                  <div class="server-lights">
                    <div class="light"></div>
                    <div class="light"></div>
                  </div>
                  <div class="server-body"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="step-navigation mobile">
            <button 
              :disabled="currentStep === 0"
              @click="currentStep--"
            >
              Назад
            </button>
            <button 
              :disabled="currentStep === learningSteps.length - 1"
              @click="currentStep++"
            >
              Вперёд
            </button>
          </div>
        </div>
      </div>
      
      <!-- Режим игры -->
      <div v-if="currentMode === 'play'" class="play-mode">
        <div class="playground">
          <h2>Поиграем с WebSocket!</h2>
          
          <div class="connection-controls">
            <div class="connection-status" :class="connectionStatus">
              <div class="status-indicator"></div>
              <span>{{ connectionStatusText }}</span>
            </div>
            <button 
              @click="toggleConnection"
              :class="connectionStatus"
            >
              {{ isConnected ? 'Отключиться' : 'Подключиться' }}
            </button>
          </div>
          
          <div class="interactive-demo">
            <div class="clients-container">
              <div class="client-card your-client">
                <h3>Твой браузер</h3>
                <div class="message-input">
                  <input 
                    v-model="messageToSend" 
                    placeholder="Напиши сообщение..." 
                    :disabled="!isConnected"
                    @keyup.enter="sendMessage"
                  />
                  <button @click="sendMessage" :disabled="!isConnected || !messageToSend">
                    Отправить
                  </button>
                </div>
                <div class="client-messages">
                  <div
                    v-for="(msg, index) in yourMessages"
                    :key="'you-' + index"
                    class="message"
                    :class="msg.type"
                  >
                    <div class="message-direction">{{ msg.type === 'sent' ? '↑' : '↓' }}</div>
                    <div class="message-content">{{ msg.text }}</div>
                    <div class="message-time">{{ msg.time }}</div>
                  </div>
                </div>
              </div>
              
              <div class="client-connector">
                <div class="connector-line" :class="connectionStatus"></div>
              </div>
              
              <div class="server-card">
                <h3>Сервер</h3>
                <div class="server-status" :class="connectionStatus">
                  {{ isConnected ? 'Работает' : 'Ждет подключения' }}
                </div>
                <div class="server-clients">
                  <div class="client-counter">
                    Подключено клиентов: {{ connectedClients }}
                  </div>
                  <div class="broadcast-controls" v-if="isConnected">
                    <button @click="sendBroadcast" class="broadcast-button">
                      Отправить всем сообщение
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="client-connector">
                <div class="connector-line" :class="connectionStatus"></div>
              </div>
              
              <div class="client-card other-client">
                <h3>Другой пользователь</h3>
                <div class="client-status" :class="otherClientStatus">
                  {{ isOtherConnected ? 'В сети' : 'Не в сети' }}
                </div>
                <div class="client-messages">
                  <div
                    v-for="(msg, index) in otherMessages"
                    :key="'other-' + index"
                    class="message"
                    :class="msg.type"
                  >
                    <div class="message-direction">{{ msg.type === 'sent' ? '↑' : '↓' }}</div>
                    <div class="message-content">{{ msg.text }}</div>
                    <div class="message-time">{{ msg.time }}</div>
                  </div>
                </div>
                <div class="client-actions" v-if="isOtherConnected">
                  <button @click="sendFromOtherClient">
                    Отправить сообщение
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="gameplay-explanation">
            <h3>Что происходит?</h3>
            <p v-if="!isConnected">
              Сейчас соединение закрыто. Нажми кнопку "Подключиться", чтобы открыть WebSocket-соединение.
            </p>
            <p v-else>
              Вы подключены через WebSocket! Теперь вы можете:
              <ul>
                <li>Отправлять сообщения на сервер</li>
                <li>Получать сообщения от сервера</li>
                <li>Видеть, как сообщения доставляются мгновенно</li>
                <li>Попробовать подключить "Другого пользователя" и увидеть, как работает общение</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
      
      <!-- Режим кода -->
      <div v-if="currentMode === 'code'" class="code-mode">
        <div class="code-examples">
          <h2>Как использовать WebSocket в Nuxt 3</h2>
          
          <div class="example-selector">
            <button 
              v-for="(example, index) in codeExamples" 
              :key="index"
              :class="{ active: currentExample === index }"
              @click="currentExample = index"
            >
              {{ example.title }}
            </button>
          </div>
          
          <div class="example-content">
            <h3>{{ codeExamples[currentExample].title }}</h3>
            <p v-html="codeExamples[currentExample].description"></p>
            
            <div class="code-block">
              <pre><code>{{ codeExamples[currentExample].code }}</code></pre>
            </div>
            
            <div class="explanation" v-html="codeExamples[currentExample].explanation"></div>
            
            <div class="tips-and-tricks" v-if="codeExamples[currentExample].tips">
              <h4>Советы:</h4>
              <ul>
                <li v-for="(tip, index) in codeExamples[currentExample].tips" :key="index">
                  {{ tip }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
 <script setup>
 import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
 
 // Текущий выбранный режим
 const currentMode = ref('learn');
 
 // Переменные для режима обучения
 const currentStep = ref(0);
 const showTraditional = ref(false);
 const showWebsocket = ref(false);
 const currentUrl = ref('https://example.com');
 
 // Переменные для режима игры
 const isConnected = ref(false);
 const isOtherConnected = ref(false);
 const messageToSend = ref('');
 const yourMessages = ref([]);
 const otherMessages = ref([]);
 const connectedClients = ref(0);
 
 // Переменные для режима кода
 const currentExample = ref(0);
 
 // Вычисляемые свойства
 const connectionStatus = computed(() => isConnected.value ? 'connected' : 'disconnected');
 const connectionStatusText = computed(() => isConnected.value ? 'Подключено' : 'Отключено');
 const otherClientStatus = computed(() => isOtherConnected.value ? 'connected' : 'disconnected');
 
 // Шаги обучения
 const learningSteps = [
   {
     title: 'Что такое WebSocket?',
     description: `
       <p>WebSocket - это технология, которая позволяет создать <strong>постоянное соединение</strong> между браузером и сервером.</p>
       <p>Благодаря этому, клиент и сервер могут обмениваться сообщениями в любой момент, без необходимости постоянно открывать и закрывать соединение.</p>
       <p>Представь телефонный звонок: ты позвонил другу, и теперь вы можете разговаривать в обе стороны, не набирая номер каждый раз заново!</p>
     `,
     animationClass: 'step-intro'
   },
   {
     title: 'Как работают обычные HTTP-запросы',
     description: `
       <p>В обычном HTTP, браузер <strong>отправляет запрос</strong>, сервер его обрабатывает и <strong>отправляет ответ</strong>.</p>
       <p>После получения ответа, соединение закрывается.</p>
       <p>Если нужны новые данные, приходится отправлять новый запрос!</p>
       <p>Это как отправлять письма: каждый раз нужно писать новое письмо, ждать доставки и ответа.</p>
     `,
     animationClass: 'step-http'
   },
   {
     title: 'Проблемы с обычными HTTP-запросами',
     description: `
       <p>Представь, что ты играешь в онлайн-игру или чат, где информация должна обновляться мгновенно.</p>
       <p>С обычными HTTP-запросами есть проблемы:</p>
       <ul>
         <li><strong>Задержки</strong> - приходится постоянно проверять, есть ли новые данные</li>
         <li><strong>Избыточные запросы</strong> - даже когда данных нет, ты всё равно делаешь запросы</li>
         <li><strong>Высокая нагрузка</strong> - каждое соединение требует ресурсов</li>
       </ul>
     `,
     animationClass: 'step-http-problems'
   },
   {
     title: 'Как работает WebSocket',
     description: `
       <p>WebSocket решает эти проблемы!</p>
       <p>Сначала происходит <strong>рукопожатие (handshake)</strong> - особый HTTP-запрос, который превращается в постоянное WebSocket-соединение.</p>
       <p>После этого канал остаётся открытым!</p>
       <p>И клиент, и сервер могут отправлять сообщения в любой момент без задержек.</p>
     `,
     animationClass: 'step-websocket'
   },
   {
     title: 'Преимущества WebSocket',
     description: `
       <p>Вот почему WebSocket такой классный:</p>
       <ul>
         <li><strong>Двусторонняя связь</strong> - обе стороны могут начать общение</li>
         <li><strong>Скорость</strong> - очень маленькие задержки</li>
         <li><strong>Эффективность</strong> - меньше нагрузка на сеть и сервер</li>
         <li><strong>Режим реального времени</strong> - данные передаются сразу, как появляются</li>
       </ul>
       <p>Всё это делает WebSocket идеальным для чатов, игр, торговых площадок, новостных лент и других приложений, где важны обновления в реальном времени!</p>
     `,
     animationClass: 'step-advantages'
   },
   {
     title: 'Где используется WebSocket?',
     description: `
       <p>WebSocket широко применяется в:</p>
       <ul>
         <li><strong>Онлайн-чатах</strong> - сообщения приходят мгновенно</li>
         <li><strong>Многопользовательских играх</strong> - игроки видят действия друг друга</li>
         <li><strong>Биржевых терминалах</strong> - цены обновляются в реальном времени</li>
         <li><strong>Совместных редакторах</strong> - как Google Docs, где видны правки других</li>
         <li><strong>Уведомлениях</strong> - получай новости сразу, как они появляются</li>
       </ul>
       <p>И даже в этой демонстрации! Давай попробуем поиграть с WebSocket, нажав на кнопку "Поиграть с WebSocket" вверху!</p>
     `,
     animationClass: 'step-examples'
   }
 ];
 
 // Примеры кода
 const codeExamples = [
   {
     title: 'Установка и создание плагина',
     description: 'В Nuxt 3 лучше всего работать с WebSocket через плагины. Создадим плагин для нашего WebSocket-соединения:',
     code: `// plugins/websocket.js
 export default defineNuxtPlugin(() => {
   const config = useRuntimeConfig()
   
   // Состояние WebSocket для всего приложения
   const webSocket = ref(null)
   const isConnected = ref(false)
   const error = ref(null)
   
   // Подключаемся к WebSocket-серверу
   function connect() {
     if (webSocket.value) return
     
     try {
       const ws = new WebSocket(config.public.websocketUrl)
       
       ws.onopen = () => {
         isConnected.value = true
         error.value = null
       }
       
       ws.onclose = () => {
         isConnected.value = false
         webSocket.value = null
       }
       
       ws.onerror = (e) => {
         error.value = 'Ошибка подключения'
         console.error('WebSocket error:', e)
       }
       
       ws.onmessage = (event) => {
         // Обрабатываем входящие сообщения
         const message = JSON.parse(event.data)
         handleMessage(message)
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
       webSocket.value.send(JSON.stringify(data))
       return true
     } catch (err) {
       error.value = err.message
       console.error('Error sending message:', err)
       return false
     }
   }
   
   // Обработка входящих сообщений
   function handleMessage(message) {
     // Здесь будет обработка сообщений, например:
     console.log('Received message:', message)
     
     // Далее можно делать что угодно с сообщением,
     // например, вызывать события или изменять состояние
   }
   
   // Закрытие соединения
   function disconnect() {
     if (webSocket.value) {
       webSocket.value.close()
     }
   }
   
   // Автоматическое подключение при запуске (опционально)
   if (process.client) {
     // Выполняем только на клиенте, не на сервере
     connect()
     
     // При размонтировании приложения закрываем соединение
     onUnmounted(() => {
       disconnect()
     })
   }
   
   // Предоставляем API для компонентов
   return {
     provide: {
       websocket: {
         connect,
         disconnect,
         sendMessage,
         isConnected,
         error
       }
     }
   }
 })`,
     explanation: `<p>Этот плагин создаёт WebSocket-соединение и предоставляет простой API для всего приложения:</p>
     <ul>
       <li><code>connect()</code> - устанавливает соединение</li>
       <li><code>disconnect()</code> - закрывает соединение</li>
       <li><code>sendMessage(data)</code> - отправляет данные на сервер</li>
       <li><code>isConnected</code> - реактивное свойство, показывающее статус соединения</li>
       <li><code>error</code> - информация об ошибке, если она произошла</li>
     </ul>`,
     tips: [
       'Храните URL для WebSocket в переменных окружения',
       'Используйте JSON для структурирования сообщений',
       'Всегда проверяйте статус соединения перед отправкой сообщений',
       'Обработка ошибок важна для стабильной работы WebSocket'
     ]
   },
   {
     title: 'Настройка в nuxt.config.ts',
     description: 'Добавим настройки для нашего WebSocket-соединения в конфигурацию Nuxt:',
     code: `// nuxt.config.ts
 export default defineNuxtConfig({
   // Другие настройки Nuxt
   
   runtimeConfig: {
     // Приватные переменные окружения, доступные только на сервере
     websocketServerPort: process.env.WEBSOCKET_SERVER_PORT || 3001,
     
     // Публичные переменные, доступные и на клиенте
     public: {
       websocketUrl: process.env.WEBSOCKET_URL || 'ws://localhost:3001'
     }
   },
   
   // Регистрируем плагин
   plugins: [
     '~/plugins/websocket.js'
   ]
 })`,
     explanation: `<p>В этой конфигурации:</p>
     <ul>
       <li>Мы определяем URL для WebSocket в переменных окружения</li>
       <li>Регистрируем наш плагин, чтобы он был доступен во всех компонентах</li>
       <li>Используем <code>runtimeConfig</code> для хранения настроек</li>
     </ul>
     <p>Переменные из <code>public</code> будут доступны на клиенте, а приватные - только на сервере.</p>`,
     tips: [
       'Используйте разные URL для разработки и продакшена',
       'Для безопасных соединений используйте wss:// вместо ws://',
       'Не храните секретные данные в public части конфигурации'
     ]
   },
  
   {
     title: 'Создание простого WebSocket-сервера',
     description: 'Для тестирования можно создать простой WebSocket-сервер на Node.js:',
     code: `// server/websocket.js
 const { WebSocketServer } = require('ws')
 const http = require('http')
 
 // Создаем HTTP-сервер
 const server = http.createServer()
 
 // Создаем WebSocket-сервер на основе HTTP-сервера
 const wss = new WebSocketServer({ server })
 
 // Хранение активных соединений
 const clients = new Set()
 
 // Обработка новых соединений
 wss.on('connection', (ws) => {
   console.log('Новое соединение установлено')
   
   // Добавляем клиента в список
   clients.add(ws)
   
   // Отправляем приветствие
   ws.send(JSON.stringify({ 
     type: 'system',
     text: 'Добро пожаловать на сервер!' 
   }))
   
   // Отправляем всем информацию о количестве клиентов
   broadcast({ 
     type: 'clients_count', 
     count: clients.size 
   })
   
   // Обработка входящих сообщений
   ws.on('message', (message) => {
     try {
       const data = JSON.parse(message)
       console.log('Получено сообщение:', data)
       
       // Рассылаем сообщение всем клиентам
       if (data.type === 'chat_message') {
         broadcast({
           type: 'chat_message',
           username: data.username || 'Аноним',
           text: data.text,
           timestamp: Date.now()
         })
       }
     } catch (e) {
       console.error('Ошибка обработки сообщения:', e)
     }
   })
   
   // Обработка закрытия соединения
   ws.on('close', () => {
     console.log('Соединение закрыто')
     clients.delete(ws)
     
     // Обновляем счетчик клиентов
     broadcast({
       type: 'clients_count',
       count: clients.size
     })
   })
   
   // Обработка ошибок
   ws.on('error', (error) => {
     console.error('Ошибка WebSocket:', error)
     clients.delete(ws)
   })
 })
 
 // Функция для отправки сообщения всем клиентам
 function broadcast(message) {
   const messageStr = JSON.stringify(message)
   
   for (const client of clients) {
     // Проверяем, что соединение открыто
     if (client.readyState === client.OPEN) {
       client.send(messageStr)
     }
   }
 }
 
 // Запускаем сервер
 const PORT = process.env.WEBSOCKET_SERVER_PORT || 3001
 server.listen(PORT, () => {
   console.log(\`WebSocket сервер запущен на порту \${PORT}\`)
 })`,
     explanation: `<p>Этот простой WebSocket-сервер выполняет базовые функции:</p>
     <ul>
       <li>Принимает подключения от клиентов</li>
       <li>Обрабатывает входящие сообщения</li>
       <li>Рассылает сообщения всем подключенным клиентам</li>
       <li>Отслеживает количество активных соединений</li>
     </ul>
     <p>Вы можете запустить этот сервер параллельно с вашим Nuxt-приложением для тестирования.</p>`,
     tips: [
       'Используйте библиотеку ws для простых WebSocket-серверов',
       'Для продакшена рассмотрите Socket.IO или uWebSockets для большей функциональности',
       'Всегда обрабатывайте ошибки и закрытие соединений',
       'Используйте структурированные сообщения с полем type для разных типов событий'
     ]
   },
   {
     title: 'Composable для WebSocket',
     description: 'Для более удобного использования WebSocket в разных компонентах можно создать composable-функцию:',
     code: `// composables/useWebSocket.js
 import { ref, onMounted, onUnmounted, watch } from 'vue'
 
 export function useWebSocket(url, options = {}) {
   const socket = ref(null)
   const isConnected = ref(false)
   const messages = ref([])
   const error = ref(null)
   
   const {
     immediate = true,
     reconnect = true,
     reconnectInterval = 3000,
     maxReconnectAttempts = 5,
     heartbeat = true,
     heartbeatInterval = 30000,
     onMessage = null,
     protocols = []
   } = options
   
   let reconnectAttempts = 0
   let reconnectTimer = null
   let heartbeatTimer = null
   
   // Установка соединения
   function connect() {
     if (socket.value?.readyState === WebSocket.CONNECTING || 
         socket.value?.readyState === WebSocket.OPEN) return
     
     try {
       socket.value = new WebSocket(url, protocols)
       
       socket.value.onopen = () => {
         isConnected.value = true
         error.value = null
         reconnectAttempts = 0
         messages.value.push({ type: 'system', text: 'Соединение установлено' })
         
         if (heartbeat) {
           startHeartbeat()
         }
       }
       
       socket.value.onclose = (event) => {
         isConnected.value = false
         messages.value.push({ type: 'system', text: 'Соединение закрыто' })
         
         if (heartbeatTimer) {
           clearInterval(heartbeatTimer)
         }
         
         if (reconnect && reconnectAttempts < maxReconnectAttempts) {
           reconnectTimer = setTimeout(() => {
             reconnectAttempts++
             messages.value.push({ 
               type: 'system', 
               text: \`Переподключение... (\${reconnectAttempts}/\${maxReconnectAttempts})\` 
             })
             connect()
           }, reconnectInterval)
         }
       }
       
       socket.value.onerror = (event) => {
         error.value = 'Ошибка соединения'
         messages.value.push({ type: 'error', text: 'Ошибка соединения' })
       }
       
       socket.value.onmessage = (event) => {
         try {
           const data = JSON.parse(event.data)
           messages.value.push(data)
           
           if (onMessage && typeof onMessage === 'function') {
             onMessage(data)
           }
         } catch (err) {
           messages.value.push({ 
             type: 'error', 
             text: 'Ошибка при обработке сообщения' 
           })
           console.error('Ошибка при обработке сообщения:', err)
         }
       }
     } catch (err) {
       error.value = err.message
       console.error('Ошибка при создании WebSocket:', err)
     }
   }
   
   // Отправка сообщения
   function send(data) {
     if (!socket.value || !isConnected.value) {
       return false
     }
     
     try {
       const message = typeof data === 'string' ? data : JSON.stringify(data)
       socket.value.send(message)
       return true
     } catch (err) {
       error.value = err.message
       console.error('Ошибка при отправке сообщения:', err)
       return false
     }
   }
   
   // Закрытие соединения
   function disconnect(code = 1000, reason = '') {
     if (reconnectTimer) {
       clearTimeout(reconnectTimer)
       reconnectTimer = null
     }
     
     if (heartbeatTimer) {
       clearInterval(heartbeatTimer)
       heartbeatTimer = null
     }
     
     if (socket.value) {
       socket.value.close(code, reason)
     }
   }
   
   // Пинг для поддержания соединения
   function startHeartbeat() {
     if (heartbeatTimer) {
       clearInterval(heartbeatTimer)
     }
     
     heartbeatTimer = setInterval(() => {
       if (isConnected.value) {
         send({ type: 'ping', timestamp: Date.now() })
       }
     }, heartbeatInterval)
   }
   
   // Автоподключение при монтировании
   if (immediate && process.client) {
     onMounted(() => {
       connect()
     })
   }
   
   // Отключение при размонтировании
   onUnmounted(() => {
     disconnect()
   })
   
   return {
     socket,
     isConnected,
     messages,
     error,
     connect,
     disconnect,
     send
   }
 }`,
     explanation: `<p>Этот composable предоставляет полный API для работы с WebSocket:</p>
     <ul>
       <li>Автоматическое подключение</li>
       <li>Повторное подключение при обрыве</li>
       <li>Отправка heartbeat для поддержания соединения</li>
       <li>Обработка сообщений в структурированном виде</li>
       <li>Отслеживание состояния соединения</li>
     </ul>
     <p>Его легко использовать в любом компоненте:</p>
     <pre><code>
 const { isConnected, messages, send } = useWebSocket('ws://localhost:3001', {
   onMessage: (data) => {
     // Дополнительная обработка сообщений
   }
 })
     </code></pre>`,
     tips: [
       'Используйте автоподключение (immediate) для постоянных соединений',
       'Настройте heartbeat для стабильности долгих соединений',
       'Правильно настраивайте параметры переподключения для оптимального UX',
       'Добавьте логирование для отладки в разработке'
     ]
   }
 ];
 
 // Методы для режима игры
 function toggleConnection() {
   if (isConnected.value) {
     isConnected.value = false;
     connectedClients.value = 0;
     isOtherConnected.value = false;
     addMessage('Соединение закрыто', 'system');
   } else {
     isConnected.value = true;
     connectedClients.value = 1;
     addMessage('Соединение установлено', 'system');
     
     // Имитация сообщения от сервера
     setTimeout(() => {
       addMessage('Добро пожаловать на сервер!', 'received');
     }, 500);
   }
 }
 
 function sendMessage() {
   if (!messageToSend.value.trim() || !isConnected.value) return;
   
   addMessage(messageToSend.value, 'sent');
   
   // Имитация ответа от сервера
   setTimeout(() => {
     addMessage(`Эхо: ${messageToSend.value}`, 'received');
   }, 800);
   
   // Если подключен другой клиент, отправляем и ему
   if (isOtherConnected.value) {
     setTimeout(() => {
       otherMessages.value.push({
         type: 'received',
         text: messageToSend.value,
         time: getCurrentTime()
       });
     }, 800);
   }
   
   messageToSend.value = '';
 }
 
 function sendBroadcast() {
   if (!isConnected.value) return;
   
   const broadcastMessage = 'Широковещательное сообщение от сервера!';
   
   // Отправка сообщения всем клиентам
   addMessage(broadcastMessage, 'received');
   
   if (isOtherConnected.value) {
     otherMessages.value.push({
       type: 'received',
       text: broadcastMessage,
       time: getCurrentTime()
     });
   }
 }
 
 function toggleOtherClient() {
   isOtherConnected.value = !isOtherConnected.value;
   
   if (isOtherConnected.value) {
     connectedClients.value++;
     otherMessages.value.push({
       type: 'system',
       text: 'Вы подключились к серверу',
       time: getCurrentTime()
     });
     
     // Имитация приветствия
     setTimeout(() => {
       otherMessages.value.push({
         type: 'received',
         text: 'Добро пожаловать на сервер!',
         time: getCurrentTime()
       });
     }, 500);
   } else {
     connectedClients.value--;
     otherMessages.value.push({
       type: 'system',
       text: 'Вы отключились от сервера',
       time: getCurrentTime()
     });
   }
 }
 
 function sendFromOtherClient() {
   if (!isOtherConnected.value) return;
   
   const randomMessages = [
     'Привет всем!',
     'Как дела?',
     'Это тестовое сообщение',
     'WebSocket - это круто!',
     'Сообщение в реальном времени'
   ];
   
   const randomIndex = Math.floor(Math.random() * randomMessages.length);
  const messageText = randomMessages[randomIndex];
  
  // Отправка сообщения от другого клиента
  otherMessages.value.push({
    type: 'sent',
    text: messageText,
    time: getCurrentTime()
  });
  
  // Получение вами сообщения от другого клиента
  setTimeout(() => {
    addMessage(`[Другой пользователь]: ${messageText}`, 'received');
  }, 800);
}

// Вспомогательные функции
function addMessage(text, type) {
  yourMessages.value.push({
    type,
    text,
    time: getCurrentTime()
  });
}

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// Эффекты в режиме обучения
watch(currentStep, (newStep) => {
  // Сбрасываем все анимации
  showTraditional.value = false;
  showWebsocket.value = false;
  
  // Устанавливаем нужные в зависимости от шага
  if (newStep === 1) {
    setTimeout(() => {
      showTraditional.value = true;
      currentUrl.value = 'https://example.com/api/data';
    }, 500);
  } else if (newStep === 3) {
    setTimeout(() => {
      showWebsocket.value = true;
      currentUrl.value = 'wss://example.com/socket';
    }, 500);
  } else {
    currentUrl.value = 'https://example.com';
  }
});

// ИСПРАВЛЕННЫЙ код для жизненного цикла
let intervalId = null;

onMounted(() => {
  // Автоматическое переключение между "другим клиентом"
  intervalId = setInterval(() => {
    if (currentMode.value === 'play' && isConnected.value && Math.random() > 0.7) {
      toggleOtherClient();
    }
  }, 5000);
});

// Отдельный хук для очистки ресурсов
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
});
</script>
  
  <style scoped>
  .websocket-demo {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #333;
  }
  
  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  .intro {
    text-align: center;
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 30px;
  }
  
  .mode-selector {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 40px;
  }
  
  .mode-selector button {
    padding: 12px 24px;
    background-color: #f8f9fa;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .mode-selector button:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
  }
  
  .mode-selector button.active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }
  
  /* Стили для режима обучения */
  .learn-mode {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .step-navigation {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .step-navigation button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #ddd;
    background-color: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .step-navigation button:hover {
    border-color: #3498db;
  }
  
  .step-navigation button.active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }
  
  .step-navigation.mobile {
    margin-top: 20px;
  }
  
  .step-navigation.mobile button {
    width: auto;
    padding: 10px 20px;
    border-radius: 6px;
  }
  
  .step-content {
    background-color: white;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
  
  .step-description {
    line-height: 1.6;
    margin-bottom: 30px;
  }
  
  .step-description ul {
    padding-left: 20px;
  }
  
  .step-description li {
    margin-bottom: 10px;
  }
  
  .visualization {
    min-height: 300px;
    position: relative;
    margin-bottom: 30px;
  }
  
  .ws-animation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 300px;
  }
  
  .client-side, .server-side {
    width: 200px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .connection {
    flex: 1;
    height: 100%;
    position: relative;
  }
  
  .browser {
    width: 180px;
    height: 220px;
    background-color: #f0f0f0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease;
  }
  
  .browser-bar {
    height: 30px;
    background-color: #e0e0e0;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  
  .url-bar {
    background-color: white;
    border-radius: 15px;
    padding: 4px 10px;
    font-size: 10px;
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .browser-content {
    height: calc(100% - 30px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .user-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .user-head {
    width: 40px;
    height: 40px;
    background-color: #3498db;
    border-radius: 50%;
  }
  
  .user-body {
    width: 60px;
    height: 70px;
    background-color: #3498db;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    margin-top: -20px;
  }
  
  .server {
    width: 150px;
    height: 200px;
    background-color: #2c3e50;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .server-lights {
    height: 30px;
    background-color: #34495e;
    display: flex;
    align-items: center;
    padding: 0 10px;
    gap: 10px;
  }
  
  .light {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #2ecc71;
    animation: blink 2s infinite;
  }
  
  .light:nth-child(2) {
    animation-delay: 0.5s;
    background-color: #e74c3c;
  }
  
  .server-body {
    flex: 1;
    background: repeating-linear-gradient(
      0deg,
      #2c3e50,
      #2c3e50 20px,
      #34495e 20px,
      #34495e 40px
    );
  }
  
  /* Анимации для HTTP запросов */
  .traditional-connection {
    width: 100%;
    height: 100%;
    position: relative;
  }
  
  .http-request, .http-response {
    position: absolute;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    transform: translateY(-50%);
    animation-duration: 2s;
    animation-iteration-count: infinite;
    opacity: 0;
  }
  
  .http-request {
    background-color: #3498db;
    color: white;
    left: 40px;
    animation-name: moveRight;
  }
  
  .http-response {
    background-color: #2ecc71;
    color: white;
    right: 40px;
    animation-name: moveLeft;
  }
  
  .req1, .resp1 {
    top: 30%;
    animation-delay: 0s;
  }
  
  .req2, .resp2 {
    top: 50%;
    animation-delay: 0.7s;
  }
  
  .req3, .resp3 {
    top: 70%;
    animation-delay: 1.4s;
  }
  
  /* Анимации для WebSocket */
  .websocket-connection {
    width: 100%;
    height: 100%;
    position: relative;
  }
  
  .ws-handshake-up, .ws-handshake-down {
    position: absolute;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    transform: translateY(-50%);
    opacity: 0;
  }
  
  .ws-handshake-up {
    background-color: #9b59b6;
    color: white;
    left: 40px;
    top: 30%;
    animation: handshakeUp 3s forwards;
  }
  
  .ws-handshake-down {
    background-color: #9b59b6;
    color: white;
    right: 40px;
    top: 30%;
    animation: handshakeDown 3s forwards;
    animation-delay: 1s;
  }
  
  .ws-channel {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 10px;
    background-color: #9b59b6;
    transform: translateY(-50%) scaleX(0);
    transform-origin: center;
    animation: createChannel 2s forwards;
    animation-delay: 2s;
  }
  
  .ws-message {
    position: absolute;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
  }
  
  .client-message {
    background-color: #f39c12;
    color: white;
    left: 20%;
    animation: clientMessage 4s infinite;
    animation-delay: 3s;
  }
  
  .server-message {
    background-color: #16a085;
    color: white;
    right: 20%;
    animation: serverMessage 4s infinite;
    animation-delay: 4s;
  }
  
  .client-message.second {
    animation-delay: 5s;
  }
  
  .server-message.second {
    animation-delay: 6s;
  }
  
  /* Контроль отображения на различных шагах */
  .step-intro .browser,
  .step-intro .server {
    transform: scale(1);
  }
  
  .step-http .browser,
  .step-http .server {
    transform: scale(1);
  }
  
  .step-http-problems .browser,
  .step-http-problems .server {
    transform: scale(0.9);
    opacity: 0.8;
  }
  
  .step-websocket .browser,
  .step-websocket .server {
    transform: scale(1.05);
  }
  
  .step-advantages .browser,
  .step-advantages .server {
    transform: scale(1.1);
  }
  
  .step-examples .browser,
  .step-examples .server {
    transform: scale(1);
  }
  
  /* Стили для режима игры */
  .play-mode {
    background-color: white;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
  
  .connection-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
  }
  
  .connection-status {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .status-indicator {
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
  
  .disconnected .status-indicator {
    background-color: #e74c3c;
  }
  
  .connected .status-indicator {
    background-color: #2ecc71;
    animation: pulse 2s infinite;
  }
  
  .connection-controls button {
    padding: 10px 20px;
    border-radius: 6px;
    border: none;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .connection-controls button.disconnected {
    background-color: #3498db;
  }
  
  .connection-controls button.connected {
    background-color: #e74c3c;
  }
  
  .connection-controls button:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .interactive-demo {
    margin-bottom: 30px;
  }
  
  .clients-container {
    display: grid;
    grid-template-columns: 3fr 1fr 2fr 1fr 3fr;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .client-card, .server-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .client-card h3, .server-card h3 {
    margin-top: 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .client-connector {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .connector-line {
    height: 2px;
    width: 100%;
  }
  
  .connector-line.disconnected {
    background-color: #ddd;
    border: 1px dashed #bbb;
  }
  
  .connector-line.connected {
    background-color: #3498db;
    animation: pulse 2s infinite;
  }
  
  .message-input {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .message-input input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .message-input button {
    padding: 8px 12px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .message-input button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .client-messages {
    height: 200px;
    overflow-y: auto;
    padding: 10px;
    background-color: white;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  
  .message {
    margin-bottom: 10px;
    padding: 8px 12px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .message.sent {
    background-color: #e1f5fe;
    align-self: flex-end;
  }
  
  .message.received {
    background-color: #f1f8e9;
  }
  
  .message.system {
    background-color: #eeeeee;
    font-style: italic;
    font-size: 0.9rem;
  }
  
  .message-direction {
    font-weight: bold;
    color: #757575;
  }
  
  .message-content {
    flex: 1;
  }
  
  .message-time {
    font-size: 0.8rem;
    color: #757575;
  }
  
  .server-status, .client-status {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.9rem;
    margin-bottom: 15px;
  }
  
  .server-status.connected, .client-status.connected {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
  
  .server-status.disconnected, .client-status.disconnected {
    background-color: #ffebee;
    color: #c62828;
  }
  
  .server-clients {
    background-color: white;
    padding: 15px;
    border-radius: 6px;
  }
  
  .client-counter {
    margin-bottom: 15px;
    font-weight: bold;
  }
  
  .broadcast-button {
    width: 100%;
    padding: 10px;
    background-color: #9c27b0;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .client-actions {
    margin-top: 15px;
  }
  
  .client-actions button {
    width: 100%;
    padding: 10px;
    background-color: #ff9800;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .gameplay-explanation {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-top: 30px;
  }
  
  .gameplay-explanation h3 {
    margin-top: 0;
    color: #2c3e50;
  }
  
  /* Стили для режима кода */
  .code-mode {
    background-color: white;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
  
  .example-selector {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 30px;
  }
  
  .example-selector button {
    padding: 10px 15px;
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .example-selector button:hover {
    background-color: #e9ecef;
  }
  
  .example-selector button.active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }
  
  .code-block {
    margin: 20px 0;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .code-block pre {
    margin: 0;
    padding: 20px;
    background-color: #2d2d2d;
    color: #f8f8f2;
    overflow-x: auto;
    font-family: monospace;
    font-size: 14px;
    line-height: 1.5;
  }
  
  .explanation {
    margin: 20px 0;
    line-height: 1.6;
  }
  
  .tips-and-tricks {
    background-color: #fffde7;
    padding: 15px;
    border-left: 4px solid #fdd835;
    border-radius: 6px;
    margin-top: 20px;
  }
  
  .tips-and-tricks h4 {
    margin-top: 0;
    color: #f57f17;
  }
  
  .tips-and-tricks ul {
    padding-left: 20px;
  }
  
  .tips-and-tricks li {
    margin-bottom: 8px;
  }
  
  /* Анимации */
  @keyframes moveRight {
    0% {
      left: 40px;
      opacity: 1;
    }
    100% {
      left: calc(100% - 150px);
      opacity: 0;
    }
  }
  
  @keyframes moveLeft {
    0% {
      right: 40px;
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      right: calc(100% - 150px);
      opacity: 0;
    }
  }
  
  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 1;
    }
  }
  
  @keyframes handshakeUp {
    0% {
      left: 40px;
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      left: calc(100% - 150px);
      opacity: 0;
    }
  }
  
  @keyframes handshakeDown {
    0% {
      right: 40px;
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      right: calc(100% - 150px);
      opacity: 0;
    }
  }
  
  @keyframes createChannel {
    0% {
      transform: translateY(-50%) scaleX(0);
      opacity: 0;
    }
    100% {
      transform: translateY(-50%) scaleX(1);
      opacity: 1;
    }
  }
  
  @keyframes clientMessage {
    0%, 100% {
      left: 20%;
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    90% {
      left: 80%;
      opacity: 0;
    }
  }
  
  @keyframes serverMessage {
    0%, 100% {
      right: 20%;
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    90% {
      right: 80%;
      opacity: 0;
    }
  }
  
  /* Адаптивность */
  @media (max-width: 992px) {
    .clients-container {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    
    .client-connector {
      display: none;
    }
    
    .step-navigation {
      overflow-x: auto;
      padding-bottom: 10px;
    }
    
    .example-selector {
      flex-wrap: nowrap;
      overflow-x: auto;
      padding-bottom: 10px;
    }
  }
  
  @media (max-width: 768px) {
    .ws-animation {
      flex-direction: column;
      height: auto;
      gap: 40px;
    }
    
    .connection {
      width: 100%;
      height: 150px;
    }
    
    .client-side, .server-side {
      width: 100%;
    }
  }
  
  @media (max-width: 576px) {
    .mode-selector {
      flex-direction: column;
      gap: 10px;
    }
    
    .mode-selector button {
      width: 100%;
    }
    
    .message-input {
      flex-direction: column;
    }
  }
  </style>