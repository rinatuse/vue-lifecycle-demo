<template>
    <div class="event-emitter-demo">
      <h1>EventEmitter: Детальная реализация и анимация</h1>
      
      <div class="navigation">
        <button 
          v-for="(section, index) in sections" 
          :key="section.id"
          :class="{ active: activeSection === index }"
          @click="setActiveSection(index)"
        >
          {{ section.title }}
        </button>
      </div>
      
      <!-- 1. Концепция и принцип работы -->
      <div v-if="activeSection === 0" class="section">
        <h2>Концепция EventEmitter</h2>
        
        <div class="concept-explanation">
          <p><strong>EventEmitter</strong> - это реализация паттерна <em>Наблюдатель (Observer)</em>, позволяющая создать систему подписки и публикации событий.</p>
          
          <div class="concept-schema">
            <div class="emitter-container">
              <div class="emitter-object">
                <div class="emitter-title">EventEmitter</div>
                <div class="emitter-storage">
                  <div class="events-title">events</div>
                  <div class="events-object">
                    <template v-if="Object.keys(visualEvents).length === 0">
                      <div class="empty-events">{ } // Пустой объект</div>
                    </template>
                    <template v-else>
                      <div class="event-entry" v-for="(listeners, event) in visualEvents" :key="event">
                        <div class="event-name">{{ event }}:</div>
                        <div class="event-listeners">
                          [
                          <div class="listener-fn" v-for="(listener, idx) in listeners" :key="idx">
                            {{ listener.name || 'fn' + idx }}{{ idx < listeners.length - 1 ? ',' : '' }}
                          </div>
                          ]
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="actions-container">
              <div class="action-card">
                <div class="action-title">.on(event, callback)</div>
                <div class="action-description">Добавляет функцию-обработчик для указанного события</div>
                <button @click="demoAddListener" class="action-button">Попробовать</button>
              </div>
              
              <div class="action-card">
                <div class="action-title">.off(event, callback)</div>
                <div class="action-description">Удаляет функцию-обработчик для указанного события</div>
                <button @click="demoRemoveListener" class="action-button" :disabled="!hasListeners">Попробовать</button>
              </div>
              
              <div class="action-card">
                <div class="action-title">.emit(event, ...args)</div>
                <div class="action-description">Вызывает все функции-обработчики для указанного события</div>
                <button @click="demoEmitEvent" class="action-button" :disabled="!hasListeners">Попробовать</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="console-output" v-if="consoleOutput.length > 0">
          <div class="console-title">Консоль:</div>
          <div class="console-log">
            <div v-for="(log, index) in consoleOutput" :key="index" class="log-item">
              <span class="log-prefix">> </span>{{ log }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- 2. Детальный разбор реализации -->
      <div v-if="activeSection === 1" class="section">
        <h2>Детальный разбор реализации</h2>
        
        <div class="implementation-breakdown">
          <div class="code-container">
            <pre class="code"><code>class EventEmitter {
    constructor() {
      // Хранилище всех событий и их обработчиков
      this.events = {};
    }
  
    // Метод для добавления слушателя
    on(eventName, callback) {
      // Если события еще нет, создаем массив для обработчиков
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      
      // Добавляем обработчик в массив
      this.events[eventName].push(callback);
    }
  
    // Метод для удаления слушателя
    off(eventName, callback) {
      // Проверяем, существует ли такое событие
      if (!this.events[eventName]) return;
      
      // Фильтруем массив, оставляя только те функции, 
      // которые не равны переданной
      this.events[eventName] = this.events[eventName]
        .filter(cb => cb !== callback);
      
      // Если больше не осталось обработчиков, удаляем событие
      if (this.events[eventName].length === 0) {
        delete this.events[eventName];
      }
    }
  
    // Метод для вызова всех обработчиков
    emit(eventName, ...args) {
      // Проверяем, существует ли такое событие
      if (!this.events[eventName]) return;
      
      // Вызываем все обработчики с переданными аргументами
      this.events[eventName].forEach(callback => {
        callback(...args);
      });
    }
  }</code></pre>
          </div>
          
          <div class="explanation-blocks">
            <div class="explanation-block">
              <h3>Структура хранения данных</h3>
              <p>EventEmitter использует объект <code>this.events</code> в качестве хранилища, где:</p>
              <ul>
                <li><strong>Ключи</strong> - названия событий (строки)</li>
                <li><strong>Значения</strong> - массивы функций-обработчиков</li>
              </ul>
              <p>Например, структура может выглядеть так:</p>
              <pre class="data-example"><code>{
    "click": [fn1, fn2, fn3],
    "hover": [fn4, fn5],
    "load": [fn6]
  }</code></pre>
              <p>Такая структура позволяет эффективно хранить и получать доступ к обработчикам событий за время O(1).</p>
            </div>
            
            <div class="explanation-block">
              <h3>Метод <code>on(eventName, callback)</code></h3>
              <p>Алгоритм:</p>
              <ol>
                <li>Проверить, существует ли массив для указанного события</li>
                <li>Если нет, создать пустой массив</li>
                <li>Добавить переданную функцию в массив обработчиков</li>
              </ol>
              <p>Сложность: O(1) - константное время.</p>
            </div>
            
            <div class="explanation-block">
              <h3>Метод <code>off(eventName, callback)</code></h3>
              <p>Алгоритм:</p>
              <ol>
                <li>Проверить, существует ли массив для указанного события</li>
                <li>Если нет, завершить выполнение</li>
                <li>Отфильтровать массив, оставив только функции, которые не равны переданной</li>
                <li>Если после фильтрации массив пуст, удалить это событие</li>
              </ol>
              <p>Сложность: O(n), где n - количество обработчиков события.</p>
            </div>
            
            <div class="explanation-block">
              <h3>Метод <code>emit(eventName, ...args)</code></h3>
              <p>Алгоритм:</p>
              <ol>
                <li>Проверить, существует ли массив для указанного события</li>
                <li>Если нет, завершить выполнение</li>
                <li>Пройтись по всем функциям и вызвать каждую с переданными аргументами</li>
              </ol>
              <p>Сложность: O(n), где n - количество обработчиков события.</p>
              <p>Метод использует <code>...args</code> - rest-параметр для сбора всех дополнительных аргументов и передачи их в каждый обработчик.</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 3. Анимация работы -->
      <div v-if="activeSection === 2" class="section">
        <h2>Анимация работы EventEmitter</h2>
        
        <div class="animation-container">
          <div class="animation-controls">
            <button 
              v-for="(step, index) in animationSteps" 
              :key="step.id"
              :class="{ active: currentAnimationStep === index }"
              @click="setAnimationStep(index)"
            >
              {{ step.title }}
            </button>
            
            <div class="playback-controls">
              <button @click="playAnimation" :disabled="isAnimationPlaying">
                {{ isAnimationPlaying ? 'Воспроизводится...' : 'Воспроизвести' }}
              </button>
              <button @click="stopAnimation" :disabled="!isAnimationPlaying">Стоп</button>
            </div>
          </div>
          
          <div class="animation-stage">
            <div class="animation-title">{{ animationSteps[currentAnimationStep].title }}</div>
            
            <div class="animation-workspace">
              <!-- Объект EventEmitter -->
              <div class="emitter-instance">
                <div class="instance-title">myEventEmitter</div>
                <div class="instance-content">
                  <div class="instance-property">
                    <div class="property-name">events:</div>
                    <div class="property-value">
                      <div class="events-object animation-events-object">
                        <template v-if="Object.keys(animationEventStore).length === 0">
                          <div class="empty-events">{ }</div>
                        </template>
                        <template v-else>
                          <div class="event-entry animation-event-entry" 
                               v-for="(listeners, event) in animationEventStore" 
                               :key="event"
                               :class="{ 'highlight-event': highlightedEvent === event }">
                            <div class="event-name">{{ event }}:</div>
                            <div class="event-listeners">
                              [
                              <div class="listener-fn animation-listener" 
                                   v-for="(listener, idx) in listeners" 
                                   :key="idx"
                                   :class="{ 'highlight-listener': highlightedListener === listener.name }">
                                {{ listener.name }}{{ idx < listeners.length - 1 ? ',' : '' }}
                              </div>
                              ]
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Анимация действий -->
              <div class="animation-actions">
                <div class="code-execution">
                  <div class="execution-step" v-for="(step, idx) in currentAnimationSteps" 
                       :key="idx" 
                       :class="{ 'active-step': idx === currentExecutionStep }">
                    <div class="step-code">{{ step.code }}</div>
                    <div class="step-arrow" v-if="idx === currentExecutionStep">▶</div>
                  </div>
                </div>
                
                <div class="execution-result" v-if="currentExecutionResult">
                  {{ currentExecutionResult }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 4. Подводные камни и оптимизации -->
      <div v-if="activeSection === 3" class="section">
        <h2>Подводные камни и оптимизации</h2>
        
        <div class="pitfalls-section">
          <div class="pitfall-card">
            <h3>Проблема сравнения функций</h3>
            <div class="pitfall-description">
              <p>При удалении слушателя через метод <code>off</code> используется строгое сравнение:</p>
              <pre class="code-snippet"><code>this.events[eventName] = this.events[eventName]
    .filter(cb => cb !== callback);</code></pre>
              
              <p>Это работает только если передаётся <strong>та же самая</strong> функция-ссылка:</p>
              <div class="example-good">
                <pre class="code-snippet"><code>// Правильно - сохраняем ссылку на функцию
  const handler = (data) => console.log(data);
  emitter.on('event', handler);
  emitter.off('event', handler); // Работает!</code></pre>
              </div>
              
              <div class="example-bad">
                <pre class="code-snippet"><code>// Неправильно - разные ссылки на функции
  emitter.on('event', (data) => console.log(data));
  emitter.off('event', (data) => console.log(data)); // Не сработает!</code></pre>
                <p class="warning-text">Эти функции имеют одинаковый код, но разные ссылки в памяти!</p>
              </div>
            </div>
          </div>
          
          <div class="pitfall-card">
            <h3>Утечка памяти</h3>
            <div class="pitfall-description">
              <p>Если не удалять слушатели событий, может произойти утечка памяти:</p>
              <pre class="code-snippet"><code>// Создаём много слушателей
  for (let i = 0; i &lt; 1000; i++) {
    emitter.on('event', () => console.log('Listener', i));
  }
  
  // Но не удаляем их, когда они больше не нужны</code></pre>
              
              <p>Рекомендуется всегда удалять слушатели, когда они больше не нужны:</p>
              <pre class="code-snippet"><code>// Хорошая практика в компонентах Vue
  mounted() {
    this.handler = () => this.handleEvent();
    myEventEmitter.on('event', this.handler);
  },
  beforeUnmount() {
    myEventEmitter.off('event', this.handler);
  }</code></pre>
            </div>
          </div>
          
          <div class="pitfall-card">
            <h3>Расширенная функциональность</h3>
            <div class="pitfall-description">
              <p>Базовая реализация может быть дополнена полезными методами:</p>
              
              <div class="extended-methods">
                <div class="method-item">
                  <div class="method-name">once(eventName, callback)</div>
                  <div class="method-description">Добавляет слушателя, который вызывается только один раз</div>
                </div>
                
                <div class="method-item">
                  <div class="method-name">removeAllListeners(eventName)</div>
                  <div class="method-description">Удаляет всех слушателей конкретного события или всех событий</div>
                </div>
                
                <div class="method-item">
                  <div class="method-name">listenerCount(eventName)</div>
                  <div class="method-description">Возвращает количество слушателей для конкретного события</div>
                </div>
              </div>
              
              <div class="implementation-example">
                <h4>Пример реализации метода once:</h4>
                <pre class="code-snippet"><code>// Метод для одноразового слушателя
  once(eventName, callback) {
    const wrapper = (...args) => {
      // Сначала удаляем слушателя, чтобы он не вызвался повторно
      this.off(eventName, wrapper);
      // Затем вызываем исходную функцию
      callback(...args);
    };
    
    // Сохраняем ссылку на исходную функцию для возможности
    // удаления с помощью off оригинальной функции
    wrapper.original = callback;
    
    // Добавляем обёртку как слушателя
    this.on(eventName, wrapper);
  }</code></pre>
              </div>
            </div>
          </div>
          
          <div class="pitfall-card">
            <h3>Асинхронность и порядок выполнения</h3>
            <div class="pitfall-description">
              <p>В стандартной реализации, все обработчики вызываются синхронно в порядке добавления:</p>
              
              <pre class="code-snippet"><code>// Метод emit вызывает функции в порядке добавления
  emit(eventName, ...args) {
    if (!this.events[eventName]) return;
    
    this.events[eventName].forEach(callback => {
      callback(...args);
    });
  }</code></pre>
              
              <p>Асинхронная версия может быть полезна, чтобы не блокировать основной поток:</p>
              
              <pre class="code-snippet"><code>// Асинхронная версия emit
  emitAsync(eventName, ...args) {
    if (!this.events[eventName]) return Promise.resolve();
    
    const promises = this.events[eventName].map(callback => {
      return Promise.resolve().then(() => callback(...args));
    });
    
    return Promise.all(promises);
  }</code></pre>
              
              <p>Это позволяет дождаться выполнения всех обработчиков:</p>
              
              <pre class="code-snippet"><code>// Использование асинхронной версии
  await emitter.emitAsync('event', data);
  console.log('Все обработчики выполнены');</code></pre>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 5. Практическое применение -->
      <div v-if="activeSection === 4" class="section">
        <h2>Практическое применение</h2>
        
        <div class="practical-section">
          <div class="use-cases">
            <h3>Области применения EventEmitter</h3>
            
            <div class="use-case-item">
              <div class="use-case-icon">🔄</div>
              <div class="use-case-content">
                <h4>Обмен данными между компонентами</h4>
                <p>EventEmitter может быть использован для коммуникации между не связанными компонентами:</p>
                <pre class="code-snippet"><code>// eventBus.js
  import EventEmitter from './EventEmitter';
  export const eventBus = new EventEmitter();
  
  // ComponentA.vue
  eventBus.emit('data-updated', newData);
  
  // ComponentB.vue
  mounted() {
    eventBus.on('data-updated', this.handleDataUpdate);
  },
  beforeUnmount() {
    eventBus.off('data-updated', this.handleDataUpdate);
  }</code></pre>
              </div>
            </div>
            
            <div class="use-case-item">
              <div class="use-case-icon">🔌</div>
              <div class="use-case-content">
                <h4>Плагины и модули</h4>
                <p>Создание плагинов с возможностью подписки на события:</p>
                <pre class="code-snippet"><code>class DataProcessor extends EventEmitter {
    processData(data) {
      // Обработка данных...
      const result = transform(data);
      
      // Уведомляем подписчиков о результате
      this.emit('processing-complete', result);
      
      return result;
    }
  }
  
  const processor = new DataProcessor();
  processor.on('processing-complete', result => {
    console.log('Обработка завершена:', result);
  });</code></pre>
              </div>
            </div>
            
            <div class="use-case-item">
              <div class="use-case-icon">🧩</div>
              <div class="use-case-content">
                <h4>Архитектура слабой связанности</h4>
                <p>EventEmitter позволяет создавать системы со слабой связью между компонентами:</p>
                <pre class="code-snippet"><code>class UserService extends EventEmitter {
    login(username, password) {
      // Логика авторизации...
      if (valid) {
        const userData = { id: 123, username, role: 'admin' };
        this.emit('login-success', userData);
        return userData;
      } else {
        this.emit('login-failed', { reason: 'Invalid credentials' });
        return null;
      }
    }
  }
  
  // Различные части приложения могут реагировать на события:
  userService.on('login-success', user => {
    router.push('/dashboard');
  });
  
  userService.on('login-success', user => {
    analytics.trackLogin(user.id);
  });
  
  userService.on('login-failed', error => {
    notificationService.showError(error.reason);
  });</code></pre>
              </div>
            </div>
          </div>
          
          <div class="comparison-table">
            <h3>Сравнение EventEmitter с другими подходами</h3>
            
            <table>
              <thead>
                <tr>
                  <th>Подход</th>
                  <th>Преимущества</th>
                  <th>Недостатки</th>
                  <th>Применение</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>EventEmitter</td>
                  <td>
                    <ul>
                      <li>Простота реализации</li>
                      <li>Гибкость</li>
                      <li>Слабая связанность</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>Возможные утечки памяти</li>
                      <li>Сложно отслеживать поток данных</li>
                    </ul>
                  </td>
                  <td>Небольшие и средние приложения, простая коммуникация между компонентами</td>
                </tr>
                <tr>
                  <td>Vuex / Pinia</td>
                  <td>
                    <ul>
                      <li>Централизованное хранилище</li>
                      <li>Отслеживаемые изменения</li>
                      <li>Инструменты разработчика</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>Больше кода для настройки</li>
                      <li>Избыточно для простых случаев</li>
                    </ul>
                  </td>
                  <td>Средние и крупные приложения с сложным состоянием</td>
                </tr>
                <tr>
                  <td>Props/Emit в Vue</td>
                  <td>
                    <ul>
                      <li>Явная передача данных</li>
                      <li>Легко отслеживать</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>Props drilling</li>
                      <li>Только для связанных компонентов</li>
                    </ul>
                  </td>
                  <td>Коммуникация родитель-ребенок в компонентной структуре</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onUnmounted } from 'vue';
  
  // Разделы компонента
  const sections = [
    { id: 'concept', title: 'Концепция' },
    { id: 'implementation', title: 'Реализация' },
    { id: 'animation', title: 'Анимация' },
    { id: 'pitfalls', title: 'Подводные камни' },
    { id: 'practical', title: 'Применение' }
  ];
  
  const activeSection = ref(0);
  
  function setActiveSection(index) {
    activeSection.value = index;
  }
  
  // Демонстрация EventEmitter в первом разделе
  const visualEvents = ref({});
  const consoleOutput = ref([]);
  
  // Для управления состоянием кнопок
  const hasListeners = computed(() => {
    return Object.keys(visualEvents.value).length > 0 &&
           Object.values(visualEvents.value).some(listeners => listeners.length > 0);
  });
  
  // Демонстрационные обработчики
  const allListeners = {
    logHello: { name: 'logHello', fn: (name) => `Hello, ${name}!` },
    sendGreeting: { name: 'sendGreeting', fn: (name) => `Greeting sent to ${name}` },
    logJoin: { name: 'logJoin', fn: (name) => `${name} joined the chat` }
  };
  
  // Демонстрация добавления слушателя
  function demoAddListener() {
    const eventNames = ['greet', 'join', 'leave'];
    const eventName = eventNames[Math.floor(Math.random() * eventNames.length)];
    
    // Выбираем слушателя в зависимости от события
    let listener;
    if (eventName === 'greet') {
      listener = allListeners.logHello;
    } else if (eventName === 'join') {
      listener = allListeners.logJoin;
    } else {
      listener = allListeners.sendGreeting;
    }
    
    // Проверяем, существует ли массив для события
    if (!visualEvents.value[eventName]) {
      visualEvents.value[eventName] = [];
    }
    
    // Проверяем, нет ли уже такого слушателя
    const exists = visualEvents.value[eventName].some(l => l.name === listener.name);
    if (!exists) {
      // Добавляем слушателя
      visualEvents.value[eventName] = [...visualEvents.value[eventName], listener];
      consoleOutput.value.push(`myEventEmitter.on('${eventName}', ${listener.name})`);
    } else {
      consoleOutput.value.push(`Слушатель ${listener.name} уже добавлен к событию '${eventName}'`);
    }
  }
  
  // Демонстрация удаления слушателя
  function demoRemoveListener() {
    // Выбираем случайное событие из существующих
    const eventNames = Object.keys(visualEvents.value).filter(
      event => visualEvents.value[event].length > 0
    );
    
    if (eventNames.length === 0) return;
    
    const eventName = eventNames[Math.floor(Math.random() * eventNames.length)];
    const listeners = visualEvents.value[eventName];
    const listenerToRemove = listeners[Math.floor(Math.random() * listeners.length)];
    
    // Удаляем слушателя
    visualEvents.value[eventName] = listeners.filter(l => l.name !== listenerToRemove.name);
    
    // Если больше не осталось слушателей, удаляем событие
    if (visualEvents.value[eventName].length === 0) {
      const { [eventName]: removedEvent, ...rest } = visualEvents.value;
      visualEvents.value = rest;
    }
    
    consoleOutput.value.push(`myEventEmitter.off('${eventName}', ${listenerToRemove.name})`);
  }
  
  // Демонстрация вызова события
  function demoEmitEvent() {
    // Выбираем случайное событие из существующих
    const eventNames = Object.keys(visualEvents.value).filter(
      event => visualEvents.value[event].length > 0
    );
    
    if (eventNames.length === 0) return;
    
    const eventName = eventNames[Math.floor(Math.random() * eventNames.length)];
    const name = ['Alice', 'Bob', 'Charlie', 'Dave'][Math.floor(Math.random() * 4)];
    
    consoleOutput.value.push(`myEventEmitter.emit('${eventName}', '${name}')`);
    
    // Вызываем все обработчики этого события
    visualEvents.value[eventName].forEach(listener => {
      const result = listener.fn(name);
      consoleOutput.value.push(`  ${listener.name}: ${result}`);
    });
  }
  
  // Анимация работы EventEmitter
  const animationSteps = [
    { id: 'step1', title: 'Создание и добавление слушателей' },
    { id: 'step2', title: 'Вызов события (emit)' },
    { id: 'step3', title: 'Удаление слушателя' },
    { id: 'step4', title: 'Полный цикл использования' }
  ];
  
  const currentAnimationStep = ref(0);
  const isAnimationPlaying = ref(false);
  let animationTimer = null;
  
  // Анимационные данные
  const animationEventStore = ref({});
  const highlightedEvent = ref(null);
  const highlightedListener = ref(null);
  const currentExecutionStep = ref(0);
  const currentExecutionResult = ref('');
  
  // Шаги анимации для каждого сценария
  const animationScenarios = {
    0: [ // Создание и добавление слушателей
      { code: 'const myEventEmitter = new EventEmitter();', action: 'create' },
      { code: 'const greetListener = (name) => { console.log(`Hello, ${name}!`); };', action: 'define' },
      { code: 'myEventEmitter.on("greet", greetListener);', action: 'addListener', event: 'greet', listener: 'greetListener' },
      { code: 'const joinListener = (name) => { console.log(`${name} joined!`); };', action: 'define' },
      { code: 'myEventEmitter.on("join", joinListener);', action: 'addListener', event: 'join', listener: 'joinListener' },
      { code: 'myEventEmitter.on("greet", (name) => { console.log(`Hi ${name}!`); });', action: 'addAnonListener', event: 'greet', listener: 'anonGreeter' }
    ],
    1: [ // Вызов события (emit)
      { code: 'myEventEmitter.emit("greet", "Alice");', action: 'emit', event: 'greet', args: ['Alice'] },
      { code: '// Вызываются все обработчики события "greet"', action: 'comment' },
      { code: 'greetListener("Alice"); // "Hello, Alice!"', action: 'callListener', listener: 'greetListener', args: ['Alice'], result: 'Hello, Alice!' },
      { code: 'anonGreeter("Alice"); // "Hi Alice!"', action: 'callListener', listener: 'anonGreeter', args: ['Alice'], result: 'Hi Alice!' },
      { code: 'myEventEmitter.emit("join", "Bob");', action: 'emit', event: 'join', args: ['Bob'] },
      { code: 'joinListener("Bob"); // "Bob joined!"', action: 'callListener', listener: 'joinListener', args: ['Bob'], result: 'Bob joined!' }
    ],
    2: [ // Удаление слушателя
      { code: 'myEventEmitter.off("greet", greetListener);', action: 'removeListener', event: 'greet', listener: 'greetListener' },
      { code: 'myEventEmitter.emit("greet", "Charlie");', action: 'emit', event: 'greet', args: ['Charlie'] },
      { code: '// Вызывается только оставшийся обработчик', action: 'comment' },
      { code: 'anonGreeter("Charlie"); // "Hi Charlie!"', action: 'callListener', listener: 'anonGreeter', args: ['Charlie'], result: 'Hi Charlie!' },
      { code: '// greetListener не вызывается, так как был удален', action: 'comment' }
    ],
    3: [ // Полный цикл использования
      { code: 'const eventEmitter = new EventEmitter();', action: 'reset' },
      { code: 'const onDataReceived = (data) => { console.log(`Data: ${data}`); };', action: 'define' },
      { code: 'eventEmitter.on("data", onDataReceived);', action: 'addListener', event: 'data', listener: 'onDataReceived' },
      { code: 'eventEmitter.emit("data", "Sample info");', action: 'emit', event: 'data', args: ['Sample info'] },
      { code: 'onDataReceived("Sample info"); // "Data: Sample info"', action: 'callListener', listener: 'onDataReceived', args: ['Sample info'], result: 'Data: Sample info' },
      { code: 'eventEmitter.off("data", onDataReceived);', action: 'removeListener', event: 'data', listener: 'onDataReceived' },
      { code: 'eventEmitter.emit("data", "More info");', action: 'emit', event: 'data', args: ['More info'] },
      { code: '// Ничего не происходит, так как нет слушателей', action: 'comment' }
    ]
  };
  
  // Получение текущих шагов анимации
  const currentAnimationSteps = computed(() => {
    return animationScenarios[currentAnimationStep.value] || [];
  });
  
  // Установка шага анимации
  function setAnimationStep(index) {
    currentAnimationStep.value = index;
    resetAnimationState();
  }
  
  // Сброс состояния анимации
  function resetAnimationState() {
    currentExecutionStep.value = 0;
    highlightedEvent.value = null;
    highlightedListener.value = null;
    currentExecutionResult.value = '';
    
    // Сбрасываем анимационное хранилище событий
    if (currentAnimationStep.value === 3) {
      // Для полного цикла начинаем с пустого хранилища
      animationEventStore.value = {};
    } else {
      // Для других сценариев подготавливаем начальное состояние
      animationEventStore.value = {
        greet: [
          { name: 'greetListener', fn: (name) => `Hello, ${name}!` },
          { name: 'anonGreeter', fn: (name) => `Hi ${name}!` }
        ],
        join: [
          { name: 'joinListener', fn: (name) => `${name} joined!` }
        ]
      };
    }
  }
  
  // Выполнение текущего шага анимации
  function executeAnimationStep() {
    if (currentExecutionStep.value >= currentAnimationSteps.value.length) {
      stopAnimation();
      return;
    }
    
    const step = currentAnimationSteps.value[currentExecutionStep.value];
    currentExecutionResult.value = '';
    
    switch (step.action) {
      case 'create':
      case 'define':
      case 'comment':
        // Просто отображаем шаг
        break;
      case 'addListener':
      case 'addAnonListener':
        highlightedEvent.value = step.event;
        highlightedListener.value = step.listener;
        
        // Добавляем обработчик в хранилище
        if (!animationEventStore.value[step.event]) {
          animationEventStore.value[step.event] = [];
        }
        
      listenerExists = animationEventStore.value[step.event].some(
          l => l.name === step.listener
        );
        
        if (!listenerExists) {
          animationEventStore.value[step.event].push({
            name: step.listener,
            fn: (name) => step.listener === 'greetListener' 
              ? `Hello, ${name}!` 
              : step.listener === 'anonGreeter'
                ? `Hi ${name}!`
                : `${name} joined!`
          });
        }
        break;
      case 'emit':
        highlightedEvent.value = step.event;
        break;
      case 'callListener':
        highlightedListener.value = step.listener;
        currentExecutionResult.value = step.result;
        break;
      case 'removeListener':
        highlightedEvent.value = step.event;
        highlightedListener.value = step.listener;
        
        // Удаляем обработчик из хранилища
        if (animationEventStore.value[step.event]) {
          animationEventStore.value[step.event] = animationEventStore.value[step.event].filter(
            l => l.name !== step.listener
          );
          
          // Если больше нет обработчиков, удаляем событие
          if (animationEventStore.value[step.event].length === 0) {
            const { [step.event]: removedEvent, ...rest } = animationEventStore.value;
            animationEventStore.value = rest;
          }
        }
        break;
      case 'reset':
        animationEventStore.value = {};
        break;
    }
    
    // Переходим к следующему шагу после задержки
    currentExecutionStep.value++;
  }
  
  // Воспроизведение анимации
  function playAnimation() {
    if (isAnimationPlaying.value) return;
    
    isAnimationPlaying.value = true;
    resetAnimationState();
    
    // Запускаем первый шаг немедленно
    executeAnimationStep();
    
    // Запускаем остальные шаги с интервалом
    animationTimer = setInterval(() => {
      if (currentExecutionStep.value >= currentAnimationSteps.value.length) {
        stopAnimation();
      } else {
        executeAnimationStep();
      }
    }, 2000);
  }
  
  // Остановка анимации
  function stopAnimation() {
    if (animationTimer) {
      clearInterval(animationTimer);
      animationTimer = null;
    }
    
    isAnimationPlaying.value = false;
  }
  
  // Очистка при уничтожении компонента
  onUnmounted(() => {
    stopAnimation();
  });
  
  // Сброс анимационного состояния при переключении сценария
  watch(currentAnimationStep, () => {
    resetAnimationState();
  });
  </script>
  
  <style scoped>
  .event-emitter-demo {
    font-family: Arial, sans-serif;
    color: #333;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 25px;
  }
  
  h2 {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 8px;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  
  h3 {
    color: #2c3e50;
    margin-top: 25px;
    margin-bottom: 15px;
  }
  
  h4 {
    color: #2c3e50;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  /* Навигация */
  .navigation {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .navigation button {
    padding: 12px 20px;
    background-color: #f5f5f5;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .navigation button:hover {
    background-color: #e0e0e0;
    transform: translateY(-2px);
  }
  
  .navigation button.active {
    background-color: #3498db;
    color: white;
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
  }
  
  /* Секции */
  .section {
    background-color: white;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    animation: fadeIn 0.5s;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Концепция и схема */
  .concept-explanation {
    line-height: 1.6;
  }
  
  .concept-schema {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 30px;
  }
  
  .emitter-container {
    display: flex;
    justify-content: center;
  }
  
  .emitter-object {
    width: 400px;
    border: 2px solid #3498db;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f8f9fa;
  }
  
  .emitter-title {
    background-color: #3498db;
    color: white;
    padding: 10px 15px;
    font-weight: bold;
    font-size: 1.1rem;
  }
  
  .emitter-storage {
    padding: 15px;
  }
  
  .events-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #666;
  }
  
  .events-object {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 6px;
    font-family: 'Courier New', monospace;
    min-height: 50px;
  }
  
  .empty-events {
    color: #999;
    font-style: italic;
  }
  
  .event-entry {
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
  }
  
  .event-name {
    color: #e74c3c;
    margin-right: 5px;
    font-weight: bold;
  }
  
  .event-listeners {
    display: flex;
    flex-wrap: wrap;
    color: #333;
  }
  
  .listener-fn {
    color: #2980b9;
    margin: 0 2px;
  }
  
  /* Действия */
  .actions-container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .action-card {
    flex: 1;
    min-width: 250px;
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }
  
  .action-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #2c3e50;
    font-family: 'Courier New', monospace;
  }
  
  .action-description {
    color: #666;
    margin-bottom: 15px;
    flex-grow: 1;
  }
  
  .action-button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .action-button:hover {
    background-color: #2980b9;
  }
  
  .action-button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  /* Консоль */
  .console-output {
    margin-top: 30px;
    background-color: #2d3436;
    color: #dfe6e9;
    padding: 15px;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
  }
  
  .console-title {
    color: #74b9ff;
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  .console-log {
    max-height: 200px;
    overflow-y: auto;
  }
  
  .log-item {
    margin-bottom: 5px;
    line-height: 1.4;
  }
  
  .log-prefix {
    color: #00b894;
    font-weight: bold;
  }
  
  /* Реализация кода */
  .implementation-breakdown {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .code-container {
    background-color: #2d3436;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .code {
    padding: 20px;
    margin: 0;
    color: #dfe6e9;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    overflow-x: auto;
    white-space: pre;
  }
  
  .explanation-blocks {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
  
  .explanation-block {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #3498db;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .explanation-block h3 {
    margin-top: 0;
    color: #3498db;
  }
  
  .explanation-block p {
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  .explanation-block ul,
  .explanation-block ol {
    margin-bottom: 15px;
    padding-left: 20px;
  }
  
  .explanation-block li {
    margin-bottom: 8px;
    line-height: 1.5;
  }
  
  .data-example {
    background-color: #2d3436;
    color: #dfe6e9;
    padding: 15px;
    border-radius: 6px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    margin: 15px 0;
    white-space: pre;
  }
  
  /* Анимация */
  .animation-container {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
  }
  
  .animation-controls {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .animation-controls button {
    padding: 10px 15px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .animation-controls button:hover {
    background-color: #e0e0e0;
  }
  
  .animation-controls button.active {
    background-color: #3498db;
    color: white;
  }
  
  .animation-controls button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .playback-controls {
    display: flex;
    gap: 10px;
    margin-left: 20px;
  }
  
  .animation-stage {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .animation-title {
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #2c3e50;
  }
  
  .animation-workspace {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .emitter-instance {
    background-color: #f8f9fa;
    border: 2px solid #3498db;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .instance-title {
    background-color: #3498db;
    color: white;
    padding: 10px 15px;
    font-weight: bold;
  }
  
  .instance-content {
    padding: 15px;
  }
  
  .instance-property {
    display: flex;
    margin-bottom: 10px;
  }
  
  .property-name {
    font-weight: bold;
    margin-right: 10px;
    color: #2c3e50;
  }
  
  .property-value {
    flex: 1;
  }
  
  .animation-events-object {
    min-height: 150px;
    transition: all 0.3s ease;
  }
  
  .animation-event-entry {
    padding: 5px;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .highlight-event {
    background-color: #fff8e1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .animation-listener {
    padding: 2px 4px;
    border-radius: 3px;
    transition: all 0.3s ease;
  }
  
  .highlight-listener {
    background-color: #e3f2fd;
    color: #1565c0;
    font-weight: bold;
  }
  
  .animation-actions {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
  }
  
  .code-execution {
    flex: 1;
    font-family: 'Courier New', monospace;
  }
  
  .execution-step {
    padding: 8px 10px;
    margin-bottom: 5px;
    border-radius: 4px;
    position: relative;
    transition: all 0.3s ease;
  }
  
  .active-step {
    background-color: #e3f2fd;
    font-weight: bold;
  }
  
  .step-code {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .step-arrow {
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    color: #f44336;
    font-weight: bold;
  }
  
  .execution-result {
    margin-top: 20px;
    padding: 10px;
    background-color: #e8f5e9;
    border-left: 4px solid #4caf50;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    animation: fadeIn 0.5s;
  }
  
  /* Подводные камни */
  .pitfalls-section {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .pitfall-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .pitfall-card h3 {
    color: #e74c3c;
    margin-top: 0;
    margin-bottom: 15px;
  }
  
  .pitfall-description p {
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  .code-snippet {
    background-color: #2d3436;
    color: #dfe6e9;
    padding: 15px;
    border-radius: 6px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    margin: 15px 0;
    white-space: pre;
    overflow-x: auto;
  }
  
  .example-good, .example-bad {
    margin: 15px 0;
    padding: 15px;
    border-radius: 6px;
  }
  
  .example-good {
    background-color: #e8f5e9;
    border-left: 4px solid #4caf50;
  }
  
  .example-bad {
    background-color: #ffebee;
    border-left: 4px solid #f44336;
  }
  
  .warning-text {
    color: #f44336;
    font-weight: bold;
  }
  
  .extended-methods {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 15px 0;
  }
  
  .method-item {
    background-color: #f5f5f5;
    padding: 10px 15px;
    border-radius: 6px;
  }
  
  .method-name {
    font-weight: bold;
    color: #2c3e50;
    font-family: 'Courier New', monospace;
    margin-bottom: 5px;
  }
  
  .method-description {
    color: #666;
  }
  
  .implementation-example h4 {
    margin-top: 25px;
    color: #3498db;
  }
  
  /* Практическое применение */
  .practical-section {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .use-cases {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
  
  .use-case-item {
    display: flex;
    gap: 20px;
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .use-case-icon {
    font-size: 2rem;
    background-color: #e3f2fd;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  .use-case-content {
    flex: 1;
  }
  
  .use-case-content h4 {
    margin-top: 0;
    color: #3498db;
  }
  
  .comparison-table {
    margin-top: 30px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }
  
  th {
    background-color: #f5f5f5;
    font-weight: bold;
    color: #2c3e50;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  tr:hover {
    background-color: #f1f8ff;
  }
  
  td ul {
    margin: 0;
    padding-left: 20px;
  }
  
  /* Responsive design */
  @media (max-width: 992px) {
    .implementation-breakdown {
      grid-template-columns: 1fr;
    }
    
    .animation-workspace {
      grid-template-columns: 1fr;
    }
    
    .use-case-item {
      flex-direction: column;
    }
    
    .use-case-icon {
      margin-bottom: 15px;
    }
  }
  
  @media (max-width: 768px) {
    .actions-container {
      flex-direction: column;
    }
    
    .action-card {
      width: 100%;
    }
    
    table {
      font-size: 0.9rem;
    }
    
    th, td {
      padding: 8px 10px;
    }
  }
  
  @media (max-width: 576px) {
    .emitter-object {
      width: 100%;
    }
    
    .code {
      font-size: 0.8rem;
      padding: 15px;
    }
    
    .navigation button {
      font-size: 0.9rem;
      padding: 10px 15px;
    }
  }
  </style>