<template>
    <div class="event-loop-explorer">
      <h1 class="title">JavaScript Event Loop <span class="animated-text">Визуализация</span></h1>
      
      <div class="visualization-container">
        <!-- Основная визуализация -->
        <div class="event-loop-diagram">
          <!-- Стек вызовов -->
          <div class="component call-stack">
            <div class="component-header">
              <h2>Call Stack</h2>
              <div class="component-description">Стек выполнения JS кода</div>
            </div>
            <div class="component-body">
              <transition-group name="stack" tag="div" class="stack-container">
                <div 
                  v-for="item in callStack" 
                  :key="item.id" 
                  class="stack-item"
                  :class="{ 
                    'executing': item.executing, 
                    'highlighted': item.highlighted,
                    'async': item.async
                  }"
                >
                  {{ item.name }}
                  <div class="item-type" v-if="item.async">async</div>
                </div>
              </transition-group>
              <div class="stack-empty" v-if="callStack.length === 0">
                Стек пуст
              </div>
            </div>
          </div>
          
          <!-- Event Loop (центральная часть) -->
          <div class="component event-loop">
            <div class="component-header">
              <h2>Event Loop</h2>
              <div class="component-description">Основной цикл событий</div>
            </div>
            <div class="loop-circle" :class="{'active': isLoopActive}">
              <div class="loop-center"></div>
              <div class="loop-arrow" :style="loopArrowStyle"></div>
              <div class="loop-message" v-if="isLoopActive">Проверка очередей...</div>
            </div>
            <div class="loop-info">
              <div class="loop-info-item">
                <div class="loop-info-icon"><i class="fas fa-info-circle"></i></div>
                <div class="loop-info-text">Event Loop проверяет очереди, когда стек вызовов пуст</div>
              </div>
            </div>
          </div>
          
          <!-- Web APIs -->
          <div class="component web-apis">
            <div class="component-header">
              <h2>Web APIs</h2>
              <div class="component-description">Браузерные API (setTimeout, fetch, DOM)</div>
            </div>
            <div class="component-body api-container">
              <transition-group name="api" tag="div">
                <div 
                  v-for="item in webAPIs" 
                  :key="item.id" 
                  class="api-item"
                  :class="{ 'processing': item.processing }"
                >
                  <div class="api-icon" :class="item.type">
                    <i :class="getAPIIcon(item.type)"></i>
                  </div>
                  <div class="api-info">
                    <div class="api-name">{{ item.name }}</div>
                    <div class="api-timer" v-if="item.timer">
                      {{ item.timeRemaining }}ms
                    </div>
                    <div class="api-status" v-if="item.processing">Выполняется...</div>
                  </div>
                </div>
              </transition-group>
              <div class="apis-empty" v-if="webAPIs.length === 0">
                Нет активных API
              </div>
            </div>
          </div>
          
          <!-- Очереди задач -->
          <div class="queues-container">
            <!-- Task Queue (Macrotasks) -->
            <div class="component task-queue">
              <div class="component-header">
                <h2>Task Queue (Macrotasks)</h2>
                <div class="component-description">Очередь макрозадач (setTimeout, setInterval, I/O)</div>
              </div>
              <div class="component-body">
                <transition-group name="queue" tag="div" class="queue-container">
                  <div 
                    v-for="item in taskQueue" 
                    :key="item.id" 
                    class="queue-item"
                    :class="{ 'next': item.next }"
                  >
                    {{ item.name }}
                    <div class="queue-source">{{ item.source }}</div>
                    <div class="queue-indicator" v-if="item.next">Следующая задача</div>
                  </div>
                </transition-group>
                <div class="queue-empty" v-if="taskQueue.length === 0">Очередь пуста</div>
              </div>
            </div>
            
            <!-- Microtask Queue -->
            <div class="component microtask-queue">
              <div class="component-header micro">
                <h2>Microtask Queue</h2>
                <div class="component-description">Очередь микрозадач (Promise, queueMicrotask)</div>
              </div>
              <div class="component-body">
                <transition-group name="queue" tag="div" class="queue-container">
                  <div 
                    v-for="item in microtaskQueue" 
                    :key="item.id" 
                    class="queue-item micro"
                    :class="{ 'next': item.next }"
                  >
                    {{ item.name }}
                    <div class="queue-source">{{ item.source }}</div>
                    <div class="queue-indicator micro" v-if="item.next">Приоритетная задача</div>
                  </div>
                </transition-group>
                <div class="queue-empty" v-if="microtaskQueue.length === 0">Очередь пуста</div>
              </div>
            </div>
          </div>
          
          <!-- Анимированные стрелки -->
          <div v-if="showMoveArrow" class="move-arrow" :style="moveArrowStyle">
            <div class="arrow-body"></div>
            <div class="arrow-head"></div>
          </div>
        </div>
        
        <!-- Улучшенная панель управления -->
        <div class="control-panel">
          <div class="playback-controls">
            <button @click="resetDemo" class="control-button reset">
              <i class="fas fa-undo"></i> Сбросить
            </button>
            <button @click="togglePlayback" class="control-button play-pause">
              <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
              {{ isPlaying ? 'Пауза' : 'Старт' }}
            </button>
            <button @click="nextStep" class="control-button step" :disabled="isPlaying">
              <i class="fas fa-step-forward"></i> Шаг вперёд
            </button>
            <div class="speed-control">
              <span>Скорость:</span>
              <select v-model="animationSpeed">
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>
          </div>
          
          <!-- Прогресс анимации -->
          <div class="progress-section">
            <div class="step-progress">
              <div class="step-dots">
                <div 
                  v-for="(step, index) in demoSteps" 
                  :key="index"
                  class="step-dot"
                  :class="{ active: currentStep === index, completed: index < currentStep }"
                  @click="goToStep(index)"
                ></div>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{width: `${((currentStep + 1) / demoSteps.length) * 100}%`}"></div>
              </div>
            </div>
            <div class="step-count">
              Шаг {{ currentStep + 1 }} из {{ demoSteps.length }}
            </div>
          </div>
        </div>
        
        <!-- Код JavaScript и описание -->
        <div class="interactive-section">
          <!-- Код JavaScript -->
          <div class="code-display">
            <div class="code-header">
              <div class="file-name">script.js</div>
              <div class="code-actions">
                <span>Код демонстрации</span>
              </div>
            </div>
            <div class="code-content">
              <pre><code ref="codeElement" v-html="highlightedCode"></code></pre>
            </div>
          </div>
          
          <!-- Описание текущего шага -->
          <div class="explanation-panel">
            <transition name="fade" mode="out-in">
              <div :key="currentStep" class="step-description">
                <h3>{{ currentStepInfo.title }}</h3>
                <p v-html="currentStepInfo.description"></p>
              </div>
            </transition>
          </div>
        </div>
        
        <!-- Порядок выполнения кода -->
        <div class="execution-panel">
          <h3>Порядок выполнения кода:</h3>
          <div class="execution-order">
            <div 
              v-for="(item, index) in executionSteps" 
              :key="index"
              class="execution-step"
              :class="{ 'executed': index <= currentStep }"
            >
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-text">{{ item }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
  
  // ------------ Состояние анимации ------------
  const isPlaying = ref(false);
  const animationSpeed = ref(1);
  const currentStep = ref(0);
  const callStack = ref([]);
  const webAPIs = ref([]);
  const taskQueue = ref([]);
  const microtaskQueue = ref([]);
  const isLoopActive = ref(false);
  const loopRotation = ref(0);
  const playInterval = ref(null);
  
  // Анимация перемещения между компонентами
  const showMoveArrow = ref(false);
  const moveArrowStyle = ref({});
  
  // Список шагов выполнения для демонстрации
  const executionSteps = ref([
    'Загрузка скрипта',
    'console.log("Начало выполнения")',
    'Promise.resolve().then()',
    'setTimeout с задержкой 0ms',
    'Promise.resolve().then() (второй)',
    'console.log("Конец скрипта")',
    'Выполнение Микрозадачи 1',
    'Выполнение Микрозадачи 3',
    'Выполнение setTimeout',
    'Выполнение Микрозадачи 2'
  ]);
  
  // ------------ Демонстрационный сценарий ------------
  const demoCode = `console.log('Начало скрипта');
  
  // Создаем микрозадачу с Promise
  Promise.resolve().then(() => {
    console.log('Микрозадача 1: Promise.then');
  });
  
  // Создаем макрозадачу с setTimeout
  setTimeout(() => {
    console.log('Макрозадача: setTimeout');
    
    // Создаем еще одну микрозадачу внутри макрозадачи
    Promise.resolve().then(() => {
      console.log('Микрозадача 2: внутри setTimeout');
    });
  }, 0);
  
  // Создаем еще одну микрозадачу
  Promise.resolve().then(() => {
    console.log('Микрозадача 3: второй Promise.then');
  });
  
  console.log('Конец скрипта');`;
  
  // Шаги демонстрации
  const demoSteps = [
    {
      title: 'Старт скрипта',
      description: `<strong>Что происходит:</strong> Скрипт начинает выполняться. <code>main()</code> добавляется в стек вызовов.<br><br>
                   <strong>В этом примере:</strong> Рассмотрим взаимодействие микрозадач (Promise) и макрозадач (setTimeout) и приоритет их выполнения.`,
      highlightLines: [],
      action: (state) => {
        state.callStack = [{id: 1, name: 'main()', executing: true}];
      }
    },
    {
      title: 'console.log("Начало скрипта")',
      description: `<strong>Что происходит:</strong> Вызов <code>console.log()</code> добавляется в стек и выполняется.<br><br>
                   <strong>В консоли:</strong> "Начало скрипта"`,
      highlightLines: [0],
      action: (state) => {
        state.callStack = [
          {id: 1, name: 'main()', executing: false},
          {id: 2, name: 'console.log("Начало скрипта")', executing: true}
        ];
      }
    },
    {
      title: 'Завершение console.log()',
      description: `<strong>Что происходит:</strong> <code>console.log()</code> завершается и удаляется из стека.`,
      highlightLines: [2, 3],
      action: (state) => {
        state.callStack = [{id: 1, name: 'main()', executing: true}];
      }
    },
    {
      title: 'Promise.resolve().then()',
      description: `<strong>Что происходит:</strong> Вызов <code>Promise.resolve()</code> создает Promise, который сразу переходит в состояние resolved.<br><br>
                   <strong>Важно:</strong> Метод <code>then()</code> регистрирует колбэк, который будет помещен в очередь микрозадач.`,
      highlightLines: [3, 4, 5],
      action: (state) => {
        state.callStack = [
          {id: 1, name: 'main()', executing: false},
          {id: 3, name: 'Promise.resolve().then()', executing: true, async: true}
        ];
        
        // Показываем анимацию движения к очереди микрозадач
        state.moveArrowStyle = {
          top: '450px',
          left: '450px',
          width: '100px',
          transform: 'rotate(135deg)'
        };
        state.showMoveArrow = true;
        
        setTimeout(() => {
          state.showMoveArrow = false;
        }, 1000);
      }
    },
    {
      title: 'Регистрация микрозадачи',
      description: `<strong>Что происходит:</strong> Колбэк <code>Promise.then()</code> помещается в очередь микрозадач.<br><br>
                   <strong>Важно:</strong> Микрозадачи не выполняются немедленно, а ждут завершения текущей задачи.`,
      highlightLines: [8, 9],
      action: (state) => {
        state.callStack = [{id: 1, name: 'main()', executing: true}];
        state.microtaskQueue = [{
          id: 4,
          name: 'Promise.then (Микрозадача 1)',
          source: 'Promise.then',
          next: false
        }];
      }
    },
    {
      title: 'setTimeout с задержкой 0ms',
      description: `<strong>Что происходит:</strong> Вызов <code>setTimeout()</code> с задержкой 0мс добавляется в стек.<br><br>
                   <strong>Важно:</strong> setTimeout создает макрозадачу, которая обрабатывается в отдельной очереди.`,
      highlightLines: [8, 9, 10, 11, 12, 13, 14, 15],
      action: (state) => {
        state.callStack = [
          {id: 1, name: 'main()', executing: false},
          {id: 5, name: 'setTimeout(..., 0)', executing: true, async: true}
        ];
        
        // Показываем анимацию движения к Web API
        state.moveArrowStyle = {
          top: '120px',
          left: '400px',
          width: '100px',
          transform: 'rotate(0deg)'
        };
        state.showMoveArrow = true;
        
        setTimeout(() => {
          state.showMoveArrow = false;
        }, 1000);
      }
    },
    {
      title: 'setTimeout в Web API',
      description: `<strong>Что происходит:</strong> <code>setTimeout()</code> передается в Web API для обработки.<br><br>
                   <strong>Web API:</strong> Запускает таймер с минимальной задержкой.`,
      highlightLines: [18, 19],
      action: (state) => {
        state.callStack = [{id: 1, name: 'main()', executing: true}];
        state.webAPIs = [{
          id: 6,
          name: 'setTimeout(callback, 0ms)',
          type: 'timer',
          processing: true,
          timer: true,
          timeRemaining: 4
        }];
      }
    },
    {
      title: 'Второй Promise.resolve().then()',
      description: `<strong>Что происходит:</strong> Вызов второго <code>Promise.resolve().then()</code>.<br><br>
                   <strong>Микрозадачи:</strong> Колбэк второго Promise также помещается в очередь микрозадач.`,
      highlightLines: [18, 19, 20],
      action: (state) => {
        state.callStack = [
          {id: 1, name: 'main()', executing: false},
          {id: 7, name: 'Promise.resolve().then()', executing: true, async: true}
        ];
        
        // Показываем анимацию движения к очереди микрозадач
        state.moveArrowStyle = {
          top: '450px',
          left: '450px',
          width: '100px',
          transform: 'rotate(135deg)'
        };
        state.showMoveArrow = true;
        
        setTimeout(() => {
          state.showMoveArrow = false;
        }, 1000);
      }
    },
    {
      title: 'Регистрация второй микрозадачи',
      description: `<strong>Что происходит:</strong> Колбэк второго <code>Promise.then()</code> добавляется в очередь микрозадач.<br><br>
                   <strong>Очередь микрозадач:</strong> Теперь содержит два колбэка от Promise.`,
      highlightLines: [22],
      action: (state) => {
        state.callStack = [{id: 1, name: 'main()', executing: true}];
        state.microtaskQueue = [
          {id: 4, name: 'Promise.then (Микрозадача 1)', source: 'Promise.then', next: false},
          {id: 8, name: 'Promise.then (Микрозадача 3)', source: 'Promise.then', next: false}
        ];
      }
    },
    {
      title: 'console.log("Конец скрипта")',
      description: `<strong>Что происходит:</strong> Вызов <code>console.log()</code> добавляется в стек и выполняется.<br><br>
                   <strong>В консоли:</strong> "Конец скрипта"`,
      highlightLines: [22],
      action: (state) => {
        state.callStack = [
          {id: 1, name: 'main()', executing: false},
          {id: 9, name: 'console.log("Конец скрипта")', executing: true}
        ];
        
        // setTimeout завершается
        state.webAPIs = [];
        state.taskQueue = [{
          id: 6,
          name: 'setTimeout callback',
          source: 'setTimeout',
          next: false
        }];
      }
    },
    {
      title: 'Завершение основного скрипта',
      description: `<strong>Что происходит:</strong> Основной скрипт завершает выполнение. <code>main()</code> удаляется из стека.<br><br>
                   <strong>Важно:</strong> После завершения текущей задачи сначала обрабатываются все микрозадачи.`,
      highlightLines: [],
      action: (state) => {
        state.callStack = [];
        state.isLoopActive = true;
      }
    },
    {
      title: 'Обработка микрозадач',
      description: `<strong>Что происходит:</strong> Event Loop сначала проверяет очередь микрозадач и находит первый Promise.<br><br>
                   <strong>Правило:</strong> Все микрозадачи выполняются до обработки макрозадач.`,
      highlightLines: [4],
      action: (state) => {
        state.microtaskQueue[0].next = true;
        
        // Показываем анимацию движения от очереди микрозадач к стеку
        state.moveArrowStyle = {
          top: '300px',
          left: '400px',
          width: '150px',
          transform: 'rotate(225deg)'
        };
        state.showMoveArrow = true;
        
        setTimeout(() => {
          state.showMoveArrow = false;
        }, 1000);
      }
    },
    {
      title: 'Выполнение первой микрозадачи',
      description: `<strong>Что происходит:</strong> Колбэк первого Promise помещается в стек вызовов.<br><br>
                   <strong>Call Stack:</strong> Выполняется первая микрозадача.`,
      highlightLines: [4],
      action: (state) => {
        state.callStack = [{
          id: 4, 
          name: 'Promise.then (Микрозадача 1)', 
          executing: true
        }];
        state.microtaskQueue = [
          {id: 8, name: 'Promise.then (Микрозадача 3)', source: 'Promise.then', next: false}
        ];
        state.isLoopActive = false;
      }
    },
    {
      title: 'console.log в первой микрозадаче',
      description: `<strong>Что происходит:</strong> Внутри колбэка первого Promise выполняется <code>console.log()</code>.<br><br>
                   <strong>В консоли:</strong> "Микрозадача 1: Promise.then"`,
      highlightLines: [4],
      action: (state) => {
        state.callStack = [
          {id: 4, name: 'Promise.then (Микрозадача 1)', executing: false},
          {id: 10, name: 'console.log("Микрозадача 1...")', executing: true}
        ];
      }
    },
    {
      title: 'Завершение первой микрозадачи',
      description: `<strong>Что происходит:</strong> Первая микрозадача завершается и удаляется из стека.<br><br>
                   <strong>Event Loop:</strong> Возобновляет проверку очередей.`,
      highlightLines: [],
      action: (state) => {
        state.callStack = [];
        state.isLoopActive = true;
      }
    },
    {
      title: 'Обработка второй микрозадачи',
      description: `<strong>Что происходит:</strong> Event Loop находит вторую микрозадачу в очереди.<br><br>
                   <strong>Важно:</strong> Все микрозадачи должны быть выполнены до перехода к макрозадачам.`,
      highlightLines: [19],
      action: (state) => {
        state.microtaskQueue[0].next = true;
        
        // Показываем анимацию движения от очереди микрозадач к стеку
        state.moveArrowStyle = {
          top: '300px',
          left: '400px',
          width: '150px',
          transform: 'rotate(225deg)'
        };
        state.showMoveArrow = true;
        
        setTimeout(() => {
          state.showMoveArrow = false;
        }, 1000);
      }
    },
    {
      title: 'Выполнение второй микрозадачи',
      description: `<strong>Что происходит:</strong> Колбэк второго Promise помещается в стек вызовов.<br><br>
                   <strong>Call Stack:</strong> Выполняется вторая микрозадача.`,
      highlightLines: [19],
      action: (state) => {
        state.callStack = [{
          id: 8, 
          name: 'Promise.then (Микрозадача 3)', 
          executing: true
        }];
        state.microtaskQueue = [];
        state.isLoopActive = false;
      }
    },
    {
      title: 'console.log во второй микрозадаче',
      description: `<strong>Что происходит:</strong> Внутри колбэка второго Promise выполняется <code>console.log()</code>.<br><br>
                   <strong>В консоли:</strong> "Микрозадача 3: второй Promise.then"`,
      highlightLines: [19],
      action: (state) => {
        state.callStack = [
          {id: 8, name: 'Promise.then (Микрозадача 3)', executing: false},
          {id: 11, name: 'console.log("Микрозадача 3...")', executing: true}
        ];
      }
    },
    {
      title: 'Завершение второй микрозадачи',
      description: `<strong>Что происходит:</strong> Вторая микрозадача завершается и удаляется из стека.<br><br>
                   <strong>Очередь микрозадач:</strong> Теперь пуста.`,
      highlightLines: [],
      action: (state) => {
        state.callStack = [];
        state.isLoopActive = true;
      }
    },
    {
      title: 'Обработка макрозадачи setTimeout',
      description: `<strong>Что происходит:</strong> Только после выполнения всех микрозадач Event Loop переходит к очереди макрозадач.<br><br>
                   <strong>Task Queue:</strong> В очереди ожидает колбэк setTimeout.`,
      highlightLines: [8, 9, 10, 11, 12, 13, 14],
      action: (state) => {
        state.taskQueue[0].next = true;
        
        // Показываем анимацию движения от очереди задач к стеку
        state.moveArrowStyle = {
          top: '250px',
          left: '300px',
          width: '150px',
          transform: 'rotate(225deg)'
        };
        state.showMoveArrow = true;
        
        setTimeout(() => {
          state.showMoveArrow = false;
        }, 1000);
      }
    },
    {
      title: 'Выполнение колбэка setTimeout',
      description: `<strong>Что происходит:</strong> Колбэк setTimeout помещается в стек вызовов.<br><br>
                   <strong>Call Stack:</strong> Теперь выполняется макрозадача.`,
      highlightLines: [9],
      action: (state) => {
        state.callStack = [{
          id: 6, 
          name: 'setTimeout callback', 
          executing: true
        }];
        state.taskQueue = [];
        state.isLoopActive = false;
      }
    },
    {
      title: 'console.log в колбэке setTimeout',
      description: `<strong>Что происходит:</strong> В колбэке setTimeout выполняется <code>console.log()</code>.<br><br>
                   <strong>В консоли:</strong> "Макрозадача: setTimeout"`,
      highlightLines: [9],
      action: (state) => {
        state.callStack = [
          {id: 6, name: 'setTimeout callback', executing: false},
          {id: 12, name: 'console.log("Макрозадача...")', executing: true}
        ];
      }
    },
    {
      title: 'Promise внутри setTimeout',
      description: `<strong>Что происходит:</strong> Внутри колбэка setTimeout создается новый Promise.<br><br>
                   <strong>Важно:</strong> Каждый раз, когда выполняется задача, новые микрозадачи добавляются в очередь.`,
      highlightLines: [12, 13, 14],
      action: (state) => {
        state.callStack = [
          {id: 6, name: 'setTimeout callback', executing: false},
          {id: 13, name: 'Promise.resolve().then()', executing: true, async: true}
        ];
        
        // Показываем анимацию движения к очереди микрозадач
        state.moveArrowStyle = {
          top: '450px',
          left: '450px',
          width: '100px',
          transform: 'rotate(135deg)'
        };
        state.showMoveArrow = true;
        
        setTimeout(() => {
          state.showMoveArrow = false;
        }, 1000);
      }
    },
    {
      title: 'Регистрация новой микрозадачи',
      description: `<strong>Что происходит:</strong> Колбэк нового Promise помещается в очередь микрозадач.<br><br>
                   <strong>Call Stack:</strong> setTimeout продолжает выполняться.`,
      highlightLines: [12, 13, 14],
      action: (state) => {
        state.callStack = [{id: 6, name: 'setTimeout callback', executing: true}];
        state.microtaskQueue = [{
          id: 14,
          name: 'Promise.then (Микрозадача 2)',
          source: 'Promise.then',
          next: false
        }];
      }
    },
    {
      title: 'Завершение колбэка setTimeout',
      description: `<strong>Что происходит:</strong> Колбэк setTimeout завершается и удаляется из стека.<br><br>
                   <strong>Важно:</strong> После завершения текущей задачи сначала обрабатываются все микрозадачи.`,
      highlightLines: [],
      action: (state) => {
        state.callStack = [];
        state.isLoopActive = true;
      }
    },
    {
      title: 'Обработка новой микрозадачи',
      description: `<strong>Что происходит:</strong> Event Loop обнаруживает новую микрозадачу и помещает ее в стек.<br><br>
                   <strong>Правило:</strong> После выполнения макрозадачи все новые микрозадачи выполняются немедленно.`,
      highlightLines: [13],
      action: (state) => {
        state.microtaskQueue[0].next = true;
        
        // Показываем анимацию движения от очереди микрозадач к стеку
        state.moveArrowStyle = {
          top: '300px',
          left: '400px',
          width: '150px',
          transform: 'rotate(225deg)'
        };
        state.showMoveArrow = true;
        
        setTimeout(() => {
          state.showMoveArrow = false;
        }, 1000);
      }
    },
    {
      title: 'Выполнение микрозадачи из setTimeout',
      description: `<strong>Что происходит:</strong> Колбэк Promise, созданного внутри setTimeout, помещается в стек.<br><br>
                   <strong>Call Stack:</strong> Выполняется микрозадача.`,
      highlightLines: [13],
      action: (state) => {
        state.callStack = [{
          id: 14, 
          name: 'Promise.then (Микрозадача 2)', 
          executing: true
        }];
        state.microtaskQueue = [];
        state.isLoopActive = false;
      }
    },
    {
      title: 'console.log в микрозадаче из setTimeout',
      description: `<strong>Что происходит:</strong> Внутри колбэка Promise выполняется <code>console.log()</code>.<br><br>
                   <strong>В консоли:</strong> "Микрозадача 2: внутри setTimeout"`,
      highlightLines: [13],
      action: (state) => {
        state.callStack = [
          {id: 14, name: 'Promise.then (Микрозадача 2)', executing: false},
          {id: 15, name: 'console.log("Микрозадача 2...")', executing: true}
        ];
      }
    },
    {
      title: 'Завершение выполнения',
      description: `<strong>Что происходит:</strong> Последняя микрозадача завершается, и стек становится пустым.<br><br>
                   <strong>Event Loop:</strong> Продолжает проверять очереди на наличие новых задач.`,
      highlightLines: [],
      action: (state) => {
        state.callStack = [];
        state.isLoopActive = true;
      }
    },
    {
      title: 'Итоги микрозадач и макрозадач',
      description: `<strong>Порядок вывода в консоли:</strong><br>
                   1. "Начало скрипта"<br>
                   2. "Конец скрипта"<br>
                   3. "Микрозадача 1: Promise.then"<br>
                   4. "Микрозадача 3: второй Promise.then"<br>
                   5. "Макрозадача: setTimeout"<br>
                   6. "Микрозадача 2: внутри setTimeout"<br><br>
                   <strong>Ключевые правила:</strong><br>
                   • Синхронный код выполняется первым<br>
                   • Микрозадачи (Promise) имеют приоритет над макрозадачами (setTimeout)<br>
                   • После каждой макрозадачи выполняются ВСЕ накопленные микрозадачи<br>
                   • Event Loop обрабатывает задачи, только когда стек вызовов пуст`,
      highlightLines: [],
      action: (state) => {
        state.callStack = [];
        state.isLoopActive = false;
      }
    }
  ];
  
  // Подсветка кода для текущего шага
  const highlightedCode = computed(() => {
    const code = demoCode;
    const lines = code.split('\n');
    const highlightLines = demoSteps[currentStep.value]?.highlightLines || [];
    
    return lines.map((line, index) => {
      if (highlightLines.includes(index)) {
        return `<span class="code-line highlight">${line}</span>`;
      }
      return `<span class="code-line">${line}</span>`;
    }).join('\n');
  });
  
  // Информация о текущем шаге
  const currentStepInfo = computed(() => {
    if (currentStep.value >= demoSteps.length) {
      return { title: '', description: '' };
    }
    return demoSteps[currentStep.value];
  });
  
  // Стиль анимации стрелки Event Loop
  const loopArrowStyle = computed(() => {
    return {
      transform: `rotate(${loopRotation.value}deg)`
    };
  });
  
  // Функция выбора иконки для API
  function getAPIIcon(type) {
    switch (type) {
      case 'timer': return 'far fa-clock';
      case 'network': return 'fas fa-globe';
      case 'dom': return 'fas fa-code';
      default: return 'fas fa-cog';
    }
  }
  
  // ------------ Функции управления анимацией ------------
  
  // Сброс демонстрации
  function resetDemo() {
    clearInterval(playInterval.value);
    isPlaying.value = false;
    currentStep.value = 0;
    callStack.value = [];
    webAPIs.value = [];
    taskQueue.value = [];
    microtaskQueue.value = [];
    isLoopActive.value = false;
    loopRotation.value = 0;
    showMoveArrow.value = false;
    
    // Применяем первый шаг демонстрации
    const step = demoSteps[0];
    const state = {
      callStack: callStack.value,
      webAPIs: webAPIs.value,
      taskQueue: taskQueue.value,
      microtaskQueue: microtaskQueue.value,
      isLoopActive: isLoopActive.value,
      highlightLines: [],
      moveArrowStyle: moveArrowStyle.value,
      showMoveArrow: showMoveArrow.value
    };
    step.action(state);
    
    // Обновляем реактивные состояния
    callStack.value = [...state.callStack];
    webAPIs.value = [...state.webAPIs];
    taskQueue.value = [...state.taskQueue];
    microtaskQueue.value = [...state.microtaskQueue];
    isLoopActive.value = state.isLoopActive;
    
    // Обновляем анимацию стрелки
    moveArrowStyle.value = {...state.moveArrowStyle};
    showMoveArrow.value = state.showMoveArrow;
  }
  
  // Переключение воспроизведения/паузы
  function togglePlayback() {
    isPlaying.value = !isPlaying.value;
    
    if (isPlaying.value) {
      const speed = parseFloat(animationSpeed.value);
      const interval = 3000 / speed; // Увеличиваем базовый интервал для лучшего восприятия
      
      playInterval.value = setInterval(() => {
        if (currentStep.value < demoSteps.length - 1) {
          nextStep();
        } else {
          togglePlayback(); // Останавливаем воспроизведение, когда достигли конца
        }
      }, interval);
      
      // Запускаем анимацию вращения для Event Loop, если активен
      animateEventLoop();
    } else {
      clearInterval(playInterval.value);
    }
  }
  
  // Переход к следующему шагу
  function nextStep() {
    if (currentStep.value < demoSteps.length - 1) {
      currentStep.value++;
      
      // Применяем шаг
      const step = demoSteps[currentStep.value];
      const state = {
        callStack: callStack.value,
        webAPIs: webAPIs.value,
        taskQueue: taskQueue.value,
        microtaskQueue: microtaskQueue.value,
        isLoopActive: isLoopActive.value,
        highlightLines: [],
        moveArrowStyle: moveArrowStyle.value,
        showMoveArrow: showMoveArrow.value
      };
      step.action(state);
      
      // Обновляем реактивные состояния
      callStack.value = [...state.callStack];
      webAPIs.value = [...state.webAPIs];
      taskQueue.value = [...state.taskQueue];
      microtaskQueue.value = [...state.microtaskQueue];
      isLoopActive.value = state.isLoopActive;
      
      // Обновляем анимацию стрелки
      moveArrowStyle.value = {...state.moveArrowStyle};
      showMoveArrow.value = state.showMoveArrow;
      
      // Если Event Loop активен, анимируем его
      if (isLoopActive.value) {
        animateEventLoop();
      }
    }
  }
  
  // Переход к определенному шагу
  function goToStep(index) {
    if (isPlaying.value) {
      togglePlayback();
    }
    
    // Сначала сбрасываем до начального состояния
    callStack.value = [];
    webAPIs.value = [];
    taskQueue.value = [];
    microtaskQueue.value = [];
    isLoopActive.value = false;
    showMoveArrow.value = false;
    
    // Последовательно применяем все шаги до нужного
    for (let i = 0; i <= index; i++) {
      const step = demoSteps[i];
      const state = {
        callStack: callStack.value,
        webAPIs: webAPIs.value,
        taskQueue: taskQueue.value,
        microtaskQueue: microtaskQueue.value,
        isLoopActive: isLoopActive.value,
        highlightLines: [],
        moveArrowStyle: moveArrowStyle.value,
        showMoveArrow: false
      };
      step.action(state);
      
      // Обновляем реактивные состояния
      callStack.value = [...state.callStack];
      webAPIs.value = [...state.webAPIs];
      taskQueue.value = [...state.taskQueue];
      microtaskQueue.value = [...state.microtaskQueue];
      isLoopActive.value = state.isLoopActive;
      
      // На последнем шаге показываем анимацию стрелки, если нужно
      if (i === index && state.showMoveArrow) {
        moveArrowStyle.value = {...state.moveArrowStyle};
        showMoveArrow.value = true;
      }
    }
    
    currentStep.value = index;
    
    // Если Event Loop активен, анимируем его
    if (isLoopActive.value) {
      animateEventLoop();
    }
  }
  
  // Анимация Event Loop
  function animateEventLoop() {
    // Анимация вращения стрелки
    const rotateLoop = () => {
      loopRotation.value = (loopRotation.value + 2) % 360;
      if (isLoopActive.value) {
        requestAnimationFrame(rotateLoop);
      }
    };
    
    if (isLoopActive.value) {
      requestAnimationFrame(rotateLoop);
    }
  }
  
  // ------------ Обработка жизненного цикла компонента ------------
  
  // Инициализация
  onMounted(() => {
    // Загружаем необходимые скрипты для иконок (Font Awesome)
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    document.head.appendChild(link);
    
    // Применяем первый шаг при монтировании
    resetDemo();
  });
  
  // Очищаем интервалы при размонтировании
  onBeforeUnmount(() => {
    clearInterval(playInterval.value);
  });
  
  // Следим за скоростью анимации
  watch(animationSpeed, () => {
    if (isPlaying.value) {
      // Перезапускаем воспроизведение с новой скоростью
      togglePlayback();
      togglePlayback();
    }
  });
  </script>
  
  <style scoped>
  /* ------------ Основные стили ------------ */
  .event-loop-explorer {
    font-family: 'Roboto', 'Segoe UI', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 25px;
    background-color: #fafbff;
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
    color: #333;
  }
  
  .title {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 35px;
    font-size: 2.8rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 12px;
    font-weight: 700;
  }
  
  .animated-text {
    background: linear-gradient(90deg, #4f56ff, #ff4f9c);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-shift 3s infinite;
    font-size: 0.9em;
    padding: 0 10px;
  }
  
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .visualization-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 25px;
  }
  
  /* ------------ Основная диаграмма ------------ */
  .event-loop-diagram {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    grid-gap: 20px;
    margin-bottom: 25px;
    position: relative; /* Для позиционирования анимированных стрелок */
  }
  
  .component {
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid #eef0f7;
    transition: all 0.3s ease;
    position: relative;
  }
  
  .component:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    transform: translateY(-3px);
  }
  
  .component-header {
    background-color: #4f56ff;
    color: white;
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
  }
  
  .component-header h2 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
  
  .component-description {
    font-size: 0.85rem;
    margin-top: 5px;
    opacity: 0.9;
  }
  
  .component-header.micro {
    background-color: #ff4f9c;
  }
  
  .component-body {
    padding: 20px;
    min-height: 190px;
    position: relative;
  }
  
  /* ------------ Улучшенная панель управления ------------ */
  .control-panel {
    background-color: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    margin-bottom: 25px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
  
  .playback-controls {
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .control-button {
    padding: 12px 24px;
    background-color: #f8f9fb;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    font-weight: 500;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .control-button:hover:not(:disabled) {
    background-color: #eff0f7;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .control-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .control-button.play-pause {
    background-color: #4f56ff;
    color: white;
    padding: 12px 30px;
    font-weight: 600;
  }
  
  .control-button.play-pause:hover {
    background-color: #4048e0;
  }
  
  .control-button.reset {
    background-color: #f3f4ff;
    color: #4f56ff;
  }
  
  .control-button.step {
    background-color: #f0f2ff;
    color: #4f56ff;
  }
  
  .speed-control {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #555;
    background-color: #f8f9fb;
    padding: 8px 15px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .speed-control select {
    padding: 5px 10px;
    border-radius: 6px;
    border: 1px solid #e0e3ef;
    background-color: white;
    font-size: 0.9rem;
    color: #444;
  }
  
  /* Прогресс анимации */
  .progress-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }
  
  .step-progress {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .step-dots {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px;
  }
  
  .step-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #e0e3ef;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .step-dot:hover {
    transform: scale(1.2);
    background-color: #c0c6e0;
  }
  
  .step-dot.completed {
    background-color: #4f56ff;
  }
  
  .step-dot.active {
    background-color: #ff4f9c;
    transform: scale(1.3);
    box-shadow: 0 0 8px rgba(255, 79, 156, 0.5);
  }
  
  .progress-bar {
    height: 6px;
    background-color: #e0e3ef;
    border-radius: 3px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4f56ff, #ff4f9c);
    transition: width 0.3s ease;
  }
  
  .step-count {
    text-align: center;
    font-size: 0.9rem;
    color: #666;
    margin-top: 10px;
    font-weight: 500;
  }
  
  /* ------------ Интерактивная секция ------------ */
  .interactive-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 25px;
    margin-bottom: 25px;
  }
  
  /* Код JavaScript */
  .code-display {
    background-color: #282c34;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    background-color: #21252b;
    color: #abb2bf;
    font-size: 0.9rem;
  }
  
  .file-name {
    padding: 6px 12px;
    background-color: #333842;
    border-radius: 6px;
    font-family: monospace;
    font-weight: 500;
  }
  
  .code-actions {
    font-size: 0.85rem;
    opacity: 0.8;
  }
  
  .code-content {
    padding: 20px;
    overflow-x: auto;
    max-height: 450px;
    overflow-y: auto;
  }
  
  .code-content pre {
    margin: 0;
    font-family: 'Fira Code', 'Source Code Pro', monospace;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #abb2bf;
  }
  
  .code-line {
    display: block;
    white-space: pre;
    padding: 1px 0;
  }
  
  .code-line.highlight {
    background-color: rgba(255, 79, 156, 0.15);
    border-left: 3px solid #ff4f9c;
    padding-left: 10px;
    margin-left: -13px;
    border-radius: 0 3px 3px 0;
  }
  
  /* Панель объяснения */
  .explanation-panel {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
  
  .step-description {
    padding: 25px;
    min-height: 250px;
  }
  
  .step-description h3 {
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.35rem;
    border-bottom: 2px solid #f0f2ff;
    padding-bottom: 10px;
  }
  
  .step-description p {
    line-height: 1.7;
    color: #444;
    margin-bottom: 15px;
  }
  
  .step-description code {
    font-family: monospace;
    background-color: #f3f4ff;
    padding: 3px 6px;
    border-radius: 4px;
    color: #4f56ff;
    font-size: 0.9rem;
  }
  
  /* ------------ Панель выполнения ------------ */
  .execution-panel {
    background-color: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }
  
  .execution-panel h3 {
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 1.35rem;
    border-bottom: 2px solid #f0f2ff;
    padding-bottom: 10px;
  }
  
  .execution-order {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 400px;
    overflow-y: auto;
    padding-right: 10px;
  }
  
  .execution-step {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 15px;
    background-color: #f8f9fb;
    border-radius: 10px;
    transition: all 0.3s ease;
    border: 1px solid #eef0f7;
  }
  
  .execution-step.executed {
    background-color: #f3f4ff;
    border-left: 4px solid #4f56ff;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  
  .step-number {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e0e3ef;
    color: #555;
    border-radius: 50%;
    font-size: 0.85rem;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  .execution-step.executed .step-number {
    background-color: #4f56ff;
    color: white;
    box-shadow: 0 0 8px rgba(79, 86, 255, 0.3);
  }
  
  .step-text {
    font-size: 0.95rem;
    line-height: 1.5;
    font-family: 'Roboto Mono', monospace;
  }
  
  /* ------------ Стек вызовов ------------ */
  .call-stack {
    grid-column: 1;
    grid-row: 1;
  }
  
  .stack-container {
    display: flex;
    flex-direction: column-reverse;
    max-height: 190px;
    overflow-y: auto;
    padding-right: 5px;
  }
  
  .stack-item {
    padding: 14px;
    margin: 6px 0;
    background-color: #f3f4ff;
    border-left: 4px solid #4f56ff;
    border-radius: 8px;
    font-family: monospace;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    word-break: break-word;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .stack-item.executing {
    background-color: #e1e3ff;
    border-left-color: #3339cc;
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  
  .stack-item.highlighted {
    animation: highlight-pulse 1.5s infinite;
  }
  
  .stack-item.async {
    border-left-color: #ff4f9c;
    background-color: #fff3f9;
  }
  
  .stack-item.async.executing {
    background-color: #ffe1ef;
    border-left-color: #cc3980;
  }
  
  .item-type {
    position: absolute;
    top: 6px;
    right: 6px;
    font-size: 0.75rem;
    padding: 3px 8px;
    background-color: #ff4f9c;
    color: white;
    border-radius: 12px;
    font-weight: 500;
  }
  
  .stack-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    color: #999;
    font-style: italic;
    border: 1px dashed #ddd;
    border-radius: 8px;
    background-color: #f8f9fb;
  }
  
  @keyframes highlight-pulse {
    0% { box-shadow: 0 0 0 0 rgba(79, 86, 255, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(79, 86, 255, 0); }
    100% { box-shadow: 0 0 0 0 rgba(79, 86, 255, 0); }
  }
  
  /* ------------ Event Loop ------------ */
  .event-loop {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 250px;
    position: relative;
  }
  
  .loop-circle {
    width: 150px;
    height: 150px;
    border: 8px solid #e0e3ef;
    border-radius: 50%;
    position: relative;
    transition: all 0.3s ease;
    margin-top: 10px;
  }
  
  .loop-circle.active {
    border-color: #4f56ff;
    box-shadow: 0 0 30px rgba(79, 86, 255, 0.3);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(79, 86, 255, 0.4); }
    70% { box-shadow: 0 0 0 15px rgba(79, 86, 255, 0); }
    100% { box-shadow: 0 0 0 0 rgba(79, 86, 255, 0); }
  }
  
  .loop-center {
    position: absolute;
    width: 24px;
    height: 24px;
    background-color: #4f56ff;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px rgba(79, 86, 255, 0.5);
  }
  
  .loop-arrow {
    position: absolute;
    width: 60%;
    height: 5px;
    background-color: #4f56ff;
    top: 50%;
    left: 50%;
    transform-origin: left center;
    transform: translateY(-50%);
    transition: transform 0.5s ease;
  }
  
  .loop-arrow::after {
    content: '';
    position: absolute;
    right: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 12px solid #4f56ff;
  }
  
  .loop-message {
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.95rem;
    background-color: #4f56ff;
    color: white;
    padding: 6px 15px;
    border-radius: 20px;
    white-space: nowrap;
    opacity: 0;
    animation: fade-in-out 2s infinite;
    font-weight: 500;
    box-shadow: 0 4px 10px rgba(79, 86, 255, 0.3);
  }
  
  @keyframes fade-in-out {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  
  .loop-info {
    margin-top: 55px;
    width: 100%;
  }
  
  .loop-info-item {
    display: flex;
    align-items: flex-start;
    padding: 12px 15px;
    background-color: #f3f4ff;
    border-radius: 8px;
    font-size: 0.9rem;
    gap: 10px;
  }
  
  .loop-info-icon {
    color: #4f56ff;
    margin-top: 2px;
  }
  
  .loop-info-text {
    flex: 1;
    line-height: 1.5;
  }
  
  /* ------------ Web APIs ------------ */
  .web-apis {
    grid-column: 3;
    grid-row: 1;
  }
  
  .api-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 190px;
    overflow-y: auto;
    padding-right: 5px;
  }
  
  .api-item {
    display: flex;
    align-items: center;
    padding: 12px 15px;
    background-color: #f8f9fb;
    border-radius: 8px;
    border: 1px solid #e0e3ef;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .api-item.processing {
    background-color: #f3f8ff;
    border-color: #4f56ff;
    animation: processing-pulse 2s infinite;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  
  @keyframes processing-pulse {
    0% { box-shadow: 0 0 0 0 rgba(79, 86, 255, 0.2); }
    70% { box-shadow: 0 0 0 8px rgba(79, 86, 255, 0); }
    100% { box-shadow: 0 0 0 0 rgba(79, 86, 255, 0); }
  }
  
  .api-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    flex-shrink: 0;
    background-color: #f1f2f6;
    color: #5b5f97;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .api-icon.timer {
    background-color: #fff5e6;
    color: #ff9500;
  }
  
  .api-icon.network {
    background-color: #e6f7ff;
    color: #0080ff;
  }
  
  .api-icon.dom {
    background-color: #f2f9e8;
    color: #5cb85c;
  }
  
  .api-info {
    flex: 1;
  }
  
  .api-name {
    font-family: monospace;
    font-size: 0.95rem;
    margin-bottom: 4px;
  }
  
  .api-timer {
    font-size: 0.85rem;
    color: #ff9500;
    font-weight: 600;
    margin-left: 2px;
  }
  
  .api-status {
    font-size: 0.85rem;
    color: #4f56ff;
    margin-top: 4px;
    font-weight: 500;
  }
  
  .apis-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    color: #999;
    font-style: italic;
    border: 1px dashed #ddd;
    border-radius: 8px;
    background-color: #f8f9fb;
  }
  
  /* ------------ Очереди задач ------------ */
  .queues-container {
    grid-column: 1 / span 3;
    grid-row: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  
  .queue-container {
    display: flex;
    gap: 12px;
    min-height: 100px;
    overflow-x: auto;
    padding-bottom: 10px;
  }
  
  .queue-item {
    padding: 12px 18px;
    background-color: #f3f4ff;
    border-left: 4px solid #4f56ff;
    border-radius: 8px;
    font-family: monospace;
    font-size: 0.95rem;
    min-width: 180px;
    max-width: 220px;
    position: relative;
    transition: all 0.3s ease;
    flex-shrink: 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .queue-item.micro {
    background-color: #fff3f9;
    border-left-color: #ff4f9c;
  }
  
  .queue-item.next {
    background-color: #e1e3ff;
    border-left-color: #3339cc;
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }
  
  .queue-item.micro.next {
    background-color: #ffe1ef;
    border-left-color: #cc3980;
  }
  
  .queue-source {
    font-size: 0.75rem;
    color: #666;
    margin-top: 8px;
    border-top: 1px dashed #ddd;
    padding-top: 5px;
  }
  
  .queue-indicator {
    position: absolute;
    top: -12px;
    right: 10px;
    font-size: 0.75rem;
    padding: 4px 10px;
    background-color: #4f56ff;
    color: white;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    font-weight: 500;
  }
  
  .queue-indicator.micro {
    background-color: #ff4f9c;
  }
  
  .queue-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    color: #999;
    font-style: italic;
    border: 1px dashed #ddd;
    border-radius: 8px;
    background-color: #f8f9fb;
  }
  
  /* ------------ Анимированные стрелки ------------ */
  .move-arrow {
    position: absolute;
    height: 4px;
    background-color: #ff4f9c;
    z-index: 10;
    animation: arrow-pulse 1s infinite;
  }
  
  .arrow-body {
    width: 100%;
    height: 100%;
    position: relative;
  }
  
  .arrow-head {
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 12px solid #ff4f9c;
  }
  
  @keyframes arrow-pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
  
  /* ------------ Анимации для элементов ------------ */
  .stack-enter-active,
  .stack-leave-active,
  .api-enter-active,
  .api-leave-active,
  .queue-enter-active,
  .queue-leave-active {
    transition: all 0.5s ease;
  }
  
  .stack-enter-from {
    opacity: 0;
    transform: translateY(20px);
  }
  
  .stack-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
  
  .api-enter-from,
  .queue-enter-from {
    opacity: 0;
    transform: translateX(20px);
  }
  
  .api-leave-to,
  .queue-leave-to {
    opacity: 0;
    transform: translateX(-20px);
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  /* ------------ Адаптивность для разных устройств ------------ */
  @media (max-width: 1200px) {
    .event-loop-diagram {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto auto;
    }
    
    .call-stack {
      grid-column: 1;
      grid-row: 1;
    }
    
    .web-apis {
      grid-column: 2;
      grid-row: 1;
    }
    
    .event-loop {
      grid-column: 1 / span 2;
      grid-row: 2;
    }
    
    .queues-container {
      grid-column: 1 / span 2;
      grid-row: 3;
    }
    
    .interactive-section {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 900px) {
    .queues-container {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 768px) {
    .event-loop-explorer {
      padding: 15px;
    }
    
    .title {
      font-size: 2.2rem;
    }
    
    .event-loop-diagram {
      grid-template-columns: 1fr;
    }
    
    .call-stack, .event-loop, .web-apis {
      grid-column: 1;
    }
    
    .call-stack {
      grid-row: 1;
    }
    
    .event-loop {
      grid-row: 2;
    }
    
    .web-apis {
      grid-row: 3;
    }
    
    .queues-container {
      grid-column: 1;
      grid-row: 4;
    }
    
    .execution-order {
      max-height: 300px;
    }
    
    .playback-controls {
      flex-direction: column;
      align-items: stretch;
    }
    
    .control-button {
      width: 100%;
      justify-content: center;
    }
    
    .speed-control {
      justify-content: center;
    }
  }
  
  @media (max-width: 500px) {
    .event-loop-explorer {
      padding: 10px;
    }
    
    .title {
      font-size: 1.8rem;
      flex-direction: column;
      gap: 5px;
      align-items: center;
    }
    
    .component-header h2 {
      font-size: 1.1rem;
    }
    
    .step-description h3 {
      font-size: 1.2rem;
    }
    
    .execution-panel h3 {
      font-size: 1.2rem;
    }
  }
  </style>