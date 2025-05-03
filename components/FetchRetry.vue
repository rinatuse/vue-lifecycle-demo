<template>
    <div class="retry-fetch-demo">
      <h1>Функция fetchRetry: повторные попытки запросов с объяснением</h1>
      
      <div class="concept-explanation">
        <h2>Что такое fetchRetry?</h2>
        <p>
          <code>fetchRetry</code> — это функция, которая делает сетевой запрос и автоматически повторяет его в случае ошибки 
          указанное количество раз, прежде чем окончательно завершиться ошибкой. Это важный паттерн для создания 
          отказоустойчивых приложений.
        </p>
      </div>
  
      <div class="tabs">
        <div 
          v-for="(tab, index) in tabs" 
          :key="tab.id"
          :class="['tab', { active: activeTab === index }]"
          @click="activeTab = index"
        >
          {{ tab.title }}
        </div>
      </div>
  
      <!-- Раздел с реализацией -->
      <div v-if="activeTab === 0" class="tab-content">
        <h2>Пошаговая реализация</h2>
        
        <div class="code-block">
          <pre><code>/**
   * Функция для выполнения запроса с автоматическими повторными попытками при ошибке
   * @param {string} url - URL для запроса
   * @param {number} retryCount - Максимальное число повторных попыток
   * @param {number} delayMs - Задержка между попытками (в миллисекундах)
   * @param {Function} onRetry - Колбэк, вызываемый при каждой повторной попытке
   * @returns {Promise} Promise с результатом запроса
   */
  const fetchRetry = async (url, retryCount = 5, delayMs = 1000, onRetry = null) => {
    // Счетчик текущей попытки
    let currentAttempt = 0;
    
    // Функция задержки на указанное количество миллисекунд
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    // Функция для выполнения фактического запроса с повторными попытками
    const attempt = async () => {
      try {
        currentAttempt++;
        // Выполняем сетевой запрос
        const response = await fetch(url);
        
        // Проверяем статус ответа
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Возвращаем результат при успешном запросе
        return await response.json();
        
      } catch (error) {
        // Проверяем, остались ли еще попытки
        if (currentAttempt >= retryCount) {
          // Если попытки исчерпаны, прокидываем ошибку дальше
          throw new Error(`Failed after ${retryCount} attempts: ${error.message}`);
        }
        
        // Вызываем колбэк для отслеживания повторных попыток, если он предоставлен
        if (onRetry) {
          onRetry({
            error,
            attempt: currentAttempt,
            remaining: retryCount - currentAttempt,
            url
          });
        }
        
        // Ждем перед следующей попыткой
        await delay(delayMs);
        
        // Рекурсивно пытаемся еще раз
        return attempt();
      }
    };
    
    // Начинаем процесс запроса
    return attempt();
  };</code></pre>
        </div>
  
        <div class="key-components">
          <h3>Ключевые элементы реализации:</h3>
          <ol>
            <li>
              <strong>Рекурсивный подход</strong> — функция <code>attempt()</code> вызывает себя при ошибке, пока не исчерпаны все попытки
            </li>
            <li>
              <strong>Счетчик попыток</strong> — отслеживание текущей попытки для сравнения с максимально допустимым числом
            </li>
            <li>
              <strong>Обработка ошибок</strong> — блок <code>try/catch</code> для перехвата ошибок запроса
            </li>
            <li>
              <strong>Задержка между попытками</strong> — предотвращает слишком частые запросы при ошибках
            </li>
            <li>
              <strong>Колбэк для мониторинга</strong> — позволяет отслеживать процесс повторных попыток
            </li>
          </ol>
        </div>
      </div>
  
      <!-- Раздел с анимацией -->
      <div v-if="activeTab === 1" class="tab-content">
        <h2>Анимация работы функции</h2>
        
        <div class="controls">
          <div class="input-group">
            <label>URL запроса:</label>
            <input v-model="simulationUrl" type="text" />
          </div>
          
          <div class="input-group">
            <label>Кол-во попыток:</label>
            <input v-model.number="retryCount" type="number" min="1" max="10" />
          </div>
          
          <div class="input-group">
            <label>Задержка (мс):</label>
            <input v-model.number="delayMs" type="number" min="500" max="5000" step="500" />
          </div>
          
          <div class="input-group">
            <label>Сценарий:</label>
            <select v-model="selectedScenario">
              <option v-for="(scenario, index) in scenarios" :key="index" :value="index">
                {{ scenario.name }}
              </option>
            </select>
          </div>
          
          <button 
            @click="startSimulation" 
            :disabled="isSimulationRunning"
            class="simulate-button"
          >
            {{ isSimulationRunning ? 'Симуляция запущена...' : 'Запустить симуляцию' }}
          </button>
        </div>
        
        <div class="animation-container">
          <div class="network-visualization">
            <div class="client-side">
              <div class="client-icon">
                <div class="client-label">Клиент</div>
              </div>
            </div>
            
            <!-- Анимация запроса -->
            <div class="network-path">
              <div 
                v-for="(attempt, index) in visualAttempts" 
                :key="`request-${index}`" 
                :class="['request-packet', 
                        { 
                          active: attempt.status === 'requesting', 
                          error: attempt.status === 'error',
                          success: attempt.status === 'success' 
                        }]"
                :style="{ 
                  left: `${attempt.position}%`, 
                  opacity: attempt.visible ? 1 : 0 
                }"
              >
                <div class="packet-label">
                  Попытка {{ attempt.number }}
                </div>
              </div>
            </div>
            
            <div class="server-side">
              <div class="server-icon">
                <div class="server-label">Сервер</div>
              </div>
            </div>
          </div>
          
          <div class="log-container">
            <h3>Журнал выполнения:</h3>
            <div class="log-entries">
              <div 
                v-for="(entry, index) in logEntries" 
                :key="index" 
                :class="['log-entry', entry.type]"
              >
                <div class="log-time">{{ entry.time }}</div>
                <div class="log-message">{{ entry.message }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="simulation-result" v-if="simulationComplete">
          <h3>Результат:</h3>
          <div :class="['result-box', { 'success-result': simulationSuccess, 'error-result': !simulationSuccess }]">
            <div v-if="simulationSuccess">
              <strong>Успешно!</strong> Получен ответ после {{ successAttempt }} попытки.
            </div>
            <div v-else>
              <strong>Ошибка!</strong> Исчерпаны все {{ retryCount }} попыток.
            </div>
          </div>
        </div>
      </div>
      
      <!-- Подводные камни -->
      <div v-if="activeTab === 2" class="tab-content">
        <h2>Подводные камни и оптимизации</h2>
        
        <div class="pitfalls">
          <div class="pitfall-item">
            <h3>1. Экспоненциальная задержка (Exponential Backoff)</h3>
            <p>
              Вместо фиксированной задержки между попытками лучше использовать нарастающую задержку. 
              Это снижает нагрузку на сервер и даёт ему больше времени на восстановление.
            </p>
            <div class="code-snippet">
              <pre><code>// Экспоненциальная задержка
  const calculateDelay = (attempt, baseDelay = 1000) => {
    return Math.min(
      baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000,
      30000 // Максимальная задержка 30 секунд
    );
  };</code></pre>
            </div>
          </div>
          
          <div class="pitfall-item">
            <h3>2. Различная обработка разных типов ошибок</h3>
            <p>
              Не все ошибки следует пытаться исправить повторными запросами. Некоторые ошибки 
              (например, 404 или 401) указывают на проблемы, которые не решатся повторными попытками.
            </p>
            <div class="code-snippet">
              <pre><code>// Только определенные ошибки имеет смысл повторять
  if (error.status === 429 || // Too Many Requests
      error.status === 500 || // Internal Server Error
      error.status === 503 || // Service Unavailable
      error.name === 'NetworkError') {
    // Повторить запрос
  } else {
    // Сразу завершить с ошибкой
    throw error;
  }</code></pre>
            </div>
          </div>
          
          <div class="pitfall-item">
            <h3>3. Предотвращение утечек памяти</h3>
            <p>
              В рекурсивных функциях нужно следить за возможными утечками памяти, особенно 
              если повторные запросы могут накапливать данные или создавать замыкания.
            </p>
          </div>
          
          <div class="pitfall-item">
            <h3>4. Отмена запросов</h3>
            <p>
              Реализация возможности отмены запросов, особенно если пользователь уходит со страницы до завершения всех попыток.
            </p>
            <div class="code-snippet">
              <pre><code>// Использование AbortController для отмены запросов
  const fetchRetry = async (url, retryCount = 5, options = {}) => {
    const controller = new AbortController();
    const { signal } = controller;
    
    // Функция для отмены текущей операции
    const cancel = () => controller.abort();
    
    // Добавление signal в опции fetch
    const fetchOptions = { ...options, signal };
    
    try {
      // ... код функции fetchRetry
      const response = await fetch(url, fetchOptions);
      // ...
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request was cancelled');
      }
      // ... обработка других ошибок
    }
    
    // Возвращаем и Promise, и функцию отмены
    return { promise, cancel };
  };</code></pre>
            </div>
          </div>
          
          <div class="pitfall-item">
            <h3>5. Сохранение состояния между попытками</h3>
            <p>
              Иногда нужно сохранять состояние между попытками, например, для отправки 
              информации об ошибках или для обновления UI.
            </p>
          </div>
        </div>
      </div>
      
      <!-- Практические применения -->
      <div v-if="activeTab === 3" class="tab-content">
        <h2>Практические применения</h2>
        
        <div class="use-cases">
          <div class="use-case">
            <h3>1. Взаимодействие с нестабильными API</h3>
            <p>
              Когда вы работаете с внешними API, которые могут иметь временные сбои или ограничения 
              на количество запросов, <code>fetchRetry</code> помогает обеспечить надежное взаимодействие.
            </p>
            <div class="example-scenario">
              <strong>Пример:</strong> Получение данных о погоде, курсах валют или другой информации, 
              обновляемой в реальном времени.
            </div>
          </div>
          
          <div class="use-case">
            <h3>2. Мобильные приложения с нестабильным соединением</h3>
            <p>
              В мобильных приложениях, где качество соединения может меняться (например, при переходе из Wi-Fi в мобильную сеть), 
              важно иметь механизм автоматических повторных попыток.
            </p>
            <div class="example-scenario">
              <strong>Пример:</strong> Отправка данных с мобильного устройства при перемещении пользователя между зонами покрытия.
            </div>
          </div>
          
          <div class="use-case">
            <h3>3. Интеграция с микросервисами</h3>
            <p>
              В системах на основе микросервисов, где один сервис зависит от других, 
              механизм повторных попыток предотвращает каскадные отказы.
            </p>
            <div class="example-scenario">
              <strong>Пример:</strong> Сервис заказов, который должен проверить наличие товара, 
              статус клиента и платежную информацию перед обработкой.
            </div>
          </div>
          
          <div class="use-case">
            <h3>4. Загрузка больших файлов</h3>
            <p>
              При загрузке больших файлов повторные попытки с возможностью возобновления передачи 
              позволяют обрабатывать временные сбои сети.
            </p>
            <div class="example-scenario">
              <strong>Пример:</strong> Загрузка видео или фото в облачное хранилище с возможностью 
              продолжения с места обрыва соединения.
            </div>
          </div>
          
          <div class="use-case">
            <h3>5. Реализация паттерна Circuit Breaker</h3>
            <p>
              Функцию <code>fetchRetry</code> можно расширить для реализации паттерна Circuit Breaker, 
              который предотвращает повторные запросы, если система определяет, что сервис недоступен длительное время.
            </p>
            <div class="code-snippet">
              <pre><code>// Простая реализация Circuit Breaker
  class CircuitBreaker {
    constructor() {
      this.failures = 0;
      this.isOpen = false;
      this.lastFailure = null;
      this.resetTimeout = 60000; // 1 минута
    }
    
    async execute(fn) {
      // Если цепь разомкнута и время ожидания не истекло
      if (this.isOpen) {
        const timeSinceLastFailure = Date.now() - this.lastFailure;
        if (timeSinceLastFailure &lt; this.resetTimeout) {
          throw new Error('Circuit is open, request rejected');
        }
        // Пробуем сбросить состояние
        this.isOpen = false;
      }
      
      try {
        const result = await fn();
        // Успешное выполнение сбрасывает счетчик ошибок
        this.failures = 0;
        return result;
      } catch (error) {
        // Увеличиваем счетчик ошибок
        this.failures++;
        this.lastFailure = Date.now();
        
        // Если превышен порог ошибок, размыкаем цепь
        if (this.failures >= 5) {
          this.isOpen = true;
        }
        
        throw error;
      }
    }
  }</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RetryFetchDemo',
    
    data() {
      return {
        // Текущая активная вкладка
        activeTab: 0,
        
        // Вкладки
        tabs: [
          { id: 'implementation', title: 'Реализация' },
          { id: 'animation', title: 'Анимация' },
          { id: 'pitfalls', title: 'Подводные камни' },
          { id: 'use-cases', title: 'Применение' }
        ],
        
        // Параметры симуляции
        simulationUrl: '/api/data',
        retryCount: 5,
        delayMs: 1000,
        selectedScenario: 0,
        
        // Сценарии симуляции
        scenarios: [
          { 
            name: 'Успех после нескольких попыток', 
            successRate: 0.3, 
            description: 'Запрос завершается успешно после нескольких попыток' 
          },
          { 
            name: 'Все попытки неудачны', 
            successRate: 0, 
            description: 'Все попытки завершаются ошибкой' 
          },
          { 
            name: 'Мгновенный успех', 
            successRate: 1, 
            description: 'Первая попытка завершается успешно' 
          },
          { 
            name: 'Нестабильное соединение', 
            successRate: 0.15, 
            description: 'Очень низкая вероятность успеха' 
          }
        ],
        
        // Состояние симуляции
        isSimulationRunning: false,
        visualAttempts: [], // Визуальные пакеты данных для анимации
        logEntries: [], // Записи журнала
        simulationComplete: false,
        simulationSuccess: false,
        successAttempt: 0,
        
        // Интервалы и таймауты
        animationTimers: []
      };
    },
    
    methods: {
      // Запуск симуляции
      startSimulation() {
        if (this.isSimulationRunning) return;
        
        // Сброс состояния
        this.isSimulationRunning = true;
        this.visualAttempts = [];
        this.logEntries = [];
        this.simulationComplete = false;
        this.simulationSuccess = false;
        this.successAttempt = 0;
        
        // Очистка таймеров
        this.animationTimers.forEach(timer => clearTimeout(timer));
        this.animationTimers = [];
        
        // Добавление записи в журнал
        this.addLogEntry('info', `Начало запроса к ${this.simulationUrl} с ${this.retryCount} попытками`);
        
        // Запуск симуляции
        this.simulateAttempt(1);
      },
      
      // Симуляция одной попытки запроса
      simulateAttempt(attemptNumber) {
        if (attemptNumber > this.retryCount) {
          // Все попытки исчерпаны
          this.completeSimulation(false);
          return;
        }
        
        // Создаем визуальный пакет данных
        const attempt = {
          number: attemptNumber,
          position: 0,
          status: 'requesting',
          visible: true
        };
        
        this.visualAttempts.push(attempt);
        
        // Добавляем запись в журнал
        this.addLogEntry('info', `Попытка ${attemptNumber}: отправка запроса...`);
        
        // Анимация запроса (движение от клиента к серверу)
        const animationSpeed = this.delayMs / 5; // Скорость анимации
        
        const moveToServer = setInterval(() => {
          attempt.position += 2; // Инкремент позиции
          
          if (attempt.position >= 100) {
            // Достигли сервера
            clearInterval(moveToServer);
            
            // Определяем, будет ли запрос успешным
            const successRate = this.scenarios[this.selectedScenario].successRate;
            const isSuccess = Math.random() < successRate;
            
            // Обработка ответа от сервера
            setTimeout(() => {
              // Обновление статуса пакета
              attempt.status = isSuccess ? 'success' : 'error';
              
              // Добавление записи в журнал
              if (isSuccess) {
                this.addLogEntry('success', `Попытка ${attemptNumber}: успех! Получен ответ от сервера.`);
                this.successAttempt = attemptNumber;
                this.completeSimulation(true);
              } else {
                this.addLogEntry('error', `Попытка ${attemptNumber}: ошибка! Сервер вернул ошибку.`);
                
                // Движение обратно к клиенту
                const moveToClient = setInterval(() => {
                  attempt.position -= 2;
                  
                  if (attempt.position <= 0) {
                    // Достигли клиента
                    clearInterval(moveToClient);
                    attempt.visible = false;
                    
                    // Если есть еще попытки, запускаем следующую
                    if (attemptNumber < this.retryCount) {
                      this.addLogEntry('info', `Ожидание ${this.delayMs}мс перед следующей попыткой...`);
                      
                      const timer = setTimeout(() => {
                        this.simulateAttempt(attemptNumber + 1);
                      }, this.delayMs);
                      
                      this.animationTimers.push(timer);
                    } else {
                      // Все попытки исчерпаны
                      this.completeSimulation(false);
                    }
                  }
                }, animationSpeed);
                
                this.animationTimers.push(moveToClient);
              }
            }, animationSpeed * 10); // Задержка на "обработку" на сервере
          }
        }, animationSpeed);
        
        this.animationTimers.push(moveToServer);
      },
      
      // Завершение симуляции
      completeSimulation(success) {
        this.simulationComplete = true;
        this.simulationSuccess = success;
        this.isSimulationRunning = false;
        
        if (success) {
          this.addLogEntry('success', `Запрос выполнен успешно после ${this.successAttempt} попыток.`);
        } else {
          this.addLogEntry('error', `Запрос завершился неудачей после ${this.retryCount} попыток.`);
        }
      },
      
      // Добавление записи в журнал
      addLogEntry(type, message) {
        const now = new Date();
        const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
        
        this.logEntries.push({
          type,
          message,
          time
        });
        
        // Прокрутка журнала вниз
        this.$nextTick(() => {
          const logContainer = document.querySelector('.log-entries');
          if (logContainer) {
            logContainer.scrollTop = logContainer.scrollHeight;
          }
        });
      }
    },
    
    _beforeDestroy() {
      // Очистка всех таймеров при уничтожении компонента
      this.animationTimers.forEach(timer => clearTimeout(timer));
    }
  };
  </script>
  
  <style>
  .retry-fetch-demo {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: #000;
    background-color: #fff;
  }
  
  /* Заголовки */
  h1 {
    text-align: center;
    color: #000;
    margin-bottom: 30px;
    font-size: 2rem;
  }
  
  h2 {
    color: #000;
    border-bottom: 2px solid #374151;
    padding-bottom: 10px;
    margin: 30px 0 20px;
    font-size: 1.6rem;
  }
  
  h3 {
    color: #000;
    margin: 20px 0 10px;
    font-size: 1.3rem;
  }
  
  /* Пояснение концепции */
  .concept-explanation {
    background-color: #f9fafb;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #2563eb;
    margin-bottom: 30px;
  }
  
  /* Вкладки */
  .tabs {
    display: flex;
    gap: 2px;
    background-color: #f3f4f6;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  
  .tab {
    padding: 12px 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    flex: 1;
    text-align: center;
    background-color: #f9fafb;
    border-bottom: 2px solid transparent;
    color: #000;
  }
  
  .tab:hover {
    background-color: #eef2ff;
  }
  
  .tab.active {
    border-bottom: 2px solid #3b82f6;
    background-color: #fff;
    color: #3b82f6;
  }
  
  .tab-content {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    min-height: 400px;
    animation: fadeIn 0.3s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Блок кода */
  .code-block {
    background-color: #f8f9fa;
    color: #1f2937;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
    position: relative;
    margin: 20px 0;
    border: 1px solid #e5e7eb;
  }
  
  .code-block pre {
    margin: 0;
    padding: 0;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  /* Ключевые компоненты */
  .key-components {
    background-color: #f9fafb;
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;
  }
  
  .key-components ol {
    padding-left: 20px;
  }
  
  .key-components li {
    margin-bottom: 10px;
    line-height: 1.6;
  }
  
  /* Контролы симуляции */
  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 20px;
    background-color: #f9fafb;
    padding: 20px;
    border-radius: 8px;
    align-items: flex-end;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .input-group label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #000;
  }
  
  .input-group input, .input-group select {
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    width: 150px;
    font-size: 0.9rem;
    background-color: #fff;
    color: #000;
  }
  
  .simulate-button {
    padding: 10px 16px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    min-width: 180px;
  }
  
  .simulate-button:hover:not(:disabled) {
    background-color: #2563eb;
  }
  
  .simulate-button:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
  
  /* Контейнер анимации */
  .animation-container {
    margin-top: 30px;
  }
  
  /* Визуализация сети */
  .network-visualization {
    display: flex;
    align-items: center;
    height: 150px;
    background-color: #f9fafb;
    border-radius: 8px;
    padding: 0 20px;
    position: relative;
    margin-bottom: 20px;
  }
  
  .client-side, .server-side {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .client-icon, .server-icon {
    width: 70px;
    height: 70px;
    background-color: #e5e7eb;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  
  .client-label, .server-label {
    position: absolute;
    bottom: -25px;
    text-align: center;
    font-size: 0.8rem;
    font-weight: 500;
    color: #000;
  }
  
  .network-path {
    flex: 1;
    height: 4px;
    background-color: #e5e7eb;
    position: relative;
    margin: 0 10px;
  }
  
  .request-packet {
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: #3b82f6;
    border-radius: 50%;
    top: -4px;
    transition: left 0.1s ease-in-out, background-color 0.3s;
  }
  
  .packet-label {
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.8rem;
    color: #000;
    white-space: nowrap;
  }
  
  .request-packet.active {
    background-color: #3b82f6;
  }
  
  .request-packet.error {
    background-color: #ef4444;
  }
  
  .request-packet.success {
    background-color: #10b981;
  }
  
  /* Журнал */
  .log-container {
    margin-top: 20px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .log-container h3 {
    margin: 0;
    padding: 10px 15px;
    background-color: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    font-size: 1rem;
  }
  
  .log-entries {
    height: 200px;
    overflow-y: auto;
    padding: 10px 15px;
    background-color: #f3f4f6;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    font-size: 0.85rem;
  }
  
  .log-entry {
    display: flex;
    gap: 10px;
    padding: 5px 0;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .log-time {
    flex-shrink: 0;
    color: #6b7280;
  }
  
  .log-entry.info .log-message {
    color: #000;
  }
  
  .log-entry.success .log-message {
    color: #059669;
  }
  
  .log-entry.error .log-message {
    color: #dc2626;
  }
  
  /* Результат симуляции */
  .simulation-result {
    margin-top: 30px;
    animation: fadeIn 0.3s ease-in-out;
  }
  
  .result-box {
    padding: 15px;
    border-radius: 8px;
    font-weight: 500;
  }
  
  .success-result {
    background-color: #d1fae5;
    border-left: 4px solid #10b981;
    color: #065f46;
  }
  
  .error-result {
    background-color: #fee2e2;
    border-left: 4px solid #ef4444;
    color: #b91c1c;
  }
  
  /* Подводные камни */
  .pitfalls {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .pitfall-item {
    background-color: #f9fafb;
    border-radius: 8px;
    padding: 20px;
    border-left: 4px solid #f97316;
  }
  
  .pitfall-item h3 {
    margin-top: 0;
    color: #000;
  }
  
  .code-snippet {
    background-color: #f8f9fa;
    color: #1f2937;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 15px 0;
    border: 1px solid #e5e7eb;
  }
  
  .code-snippet pre {
    margin: 0;
    padding: 0;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    font-size: 0.85rem;
    line-height: 1.5;
  }
  
  /* Практические применения */
  .use-cases {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .use-case {
    background-color: #f9fafb;
    border-radius: 8px;
    padding: 20px;
    border-left: 4px solid #8b5cf6;
  }
  
  .use-case h3 {
    margin-top: 0;
    color: #000;
  }
  
  .example-scenario {
    background-color: #ede9fe;
    padding: 15px;
    border-radius: 8px;
    margin-top: 15px;
    color: #000;
  }
  
  /* Медиа-запросы для адаптивности */
  @media (max-width: 768px) {
    .controls {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
    }
    
    .input-group input, .input-group select {
      width: 100%;
    }
    
    .network-visualization {
      height: 200px;
      flex-direction: column;
      padding: 20px;
    }
    
    .client-side, .server-side {
      width: 80px;
      height: 80px;
    }
    
    .network-path {
      width: 4px;
      height: 80px;
      margin: 10px 0;
    }
    
    .request-packet {
      left: -4px !important;
      transition: top 0.1s ease-in-out, background-color 0.3s;
    }
    
    .packet-label {
      top: 50%;
      left: 20px;
      transform: translateY(-50%);
    }
  }
  </style>