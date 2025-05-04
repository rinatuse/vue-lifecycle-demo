<template>
    <div class="event-loop-explorer">
      <h1>Event Loop в JavaScript: интерактивное объяснение</h1>
      
      <div class="introduction">
        <p>Понимание Event Loop - ключ к пониманию асинхронности в JavaScript. Давайте разберемся с примером кода и увидим, как именно он выполняется.</p>
      </div>
      
      <div class="code-container">
        <h2>Исходный код</h2>
        <pre class="code">
  console.log(1);
  
  setTimeout(function timeout() {
    console.log("Таймаут");
  }, 0);
  
  new Promise(function (resolve, reject) {
    console.log("Promise");
    setTimeout(() => {
      console.log(777);
      resolve();
    }, 0);
  })
    .then(() => {
      console.log("then1");
    })
    .then(() => {
      console.log("then2");
    });
  
  console.log(4);
  
  setTimeout(() => {
    console.log("timeOut2");
  }, 0);</pre>
      </div>
      
      <div class="control-panel">
        <button @click="startVisualization" :disabled="isAnimating" class="control-button">
          {{ isVisualizationComplete ? 'Запустить заново' : 'Запустить визуализацию' }}
        </button>
        <button @click="stepForward" :disabled="isAnimating || isVisualizationComplete" class="control-button">
          Шаг вперёд
        </button>
        <button @click="resetVisualization" :disabled="isAnimating || !visualizationStarted" class="control-button">
          Сбросить
        </button>
      </div>
      
      <div class="visualization-container" v-if="visualizationStarted">
        <div class="event-loop-diagram">
          <div class="call-stack">
            <h3>Call Stack</h3>
            <div class="stack-container">
              <div v-for="(item, index) in callStack" :key="'stack-' + index" class="stack-item" :style="{ opacity: callStackOpacity[index] }">
                {{ item }}
              </div>
            </div>
          </div>
          
          <div class="event-loop-circle">
            <div class="loop-animation" :class="{ active: isCheckingQueues }"></div>
            <span>Event Loop</span>
          </div>
          
          <div class="queues">
            <div class="task-queue">
              <h3>Task Queue</h3>
              <div class="queue-container">
                <div v-for="(task, index) in taskQueue" :key="'task-' + index" class="queue-item" :class="{ active: activeTaskIndex === index }">
                  {{ task }}
                </div>
              </div>
            </div>
            
            <div class="microtask-queue">
              <h3>Microtask Queue</h3>
              <div class="queue-container">
                <div v-for="(task, index) in microtaskQueue" :key="'microtask-' + index" class="queue-item" :class="{ active: activeMicrotaskIndex === index }">
                  {{ task }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="execution-log">
          <h3>Консоль</h3>
          <div class="log-container">
            <div v-for="(log, index) in consoleLogs" :key="'log-' + index" class="log-item" :class="{ highlight: highlightedLogIndex === index }">
              {{ log }}
            </div>
          </div>
        </div>
        
        <div class="explanation-panel">
          <h3>Подробное объяснение</h3>
          <div class="explanation-content">
            <p>{{ currentExplanation }}</p>
          </div>
          <div class="step-info">
            <span class="current-step">Шаг {{ currentStep }} из {{ totalSteps }}</span>
          </div>
        </div>
      </div>
      
      <div class="theory-section">
        <h2>Как работает Event Loop в JavaScript</h2>
        
        <div class="theory-block">
          <h3>1. Основные компоненты</h3>
          <ul>
            <li><strong>Call Stack</strong> — структура данных, которая отслеживает выполнение функций. Когда функция вызывается, она помещается на вершину стека.</li>
            <li><strong>Heap</strong> — область памяти для хранения объектов.</li>
            <li><strong>Task Queue (Очередь задач)</strong> — содержит задачи, которые будут выполнены в будущем (например, колбэки setTimeout).</li>
            <li><strong>Microtask Queue (Очередь микрозадач)</strong> — содержит микрозадачи, такие как обещания (promises) и MutationObserver.</li>
            <li><strong>Event Loop</strong> — механизм, который постоянно проверяет стек и очереди, определяя, что выполнять дальше.</li>
          </ul>
        </div>
        
        <div class="theory-block">
          <h3>2. Порядок выполнения</h3>
          <ol>
            <li>Сначала выполняется весь синхронный код (из Call Stack).</li>
            <li>Когда Call Stack пуст, проверяется Microtask Queue и все микрозадачи выполняются до полного опустошения этой очереди.</li>
            <li>После этого берется одна задача из Task Queue и помещается в Call Stack для выполнения.</li>
            <li>После каждой задачи из Task Queue снова проверяется и очищается Microtask Queue.</li>
            <li>Цикл повторяется.</li>
          </ol>
        </div>
        
        <div class="theory-block">
          <h3>3. Особенности и "подводные камни"</h3>
          <ul>
            <li><strong>setTimeout(fn, 0)</strong> не выполняется мгновенно. Он просто помещает колбэк в Task Queue как можно скорее.</li>
            <li><strong>Microtask Queue</strong> имеет приоритет над Task Queue и всегда очищается полностью.</li>
            <li>Создание Promise выполняется синхронно, но колбэки .then() и .catch() являются микрозадачами.</li>
            <li>Вложенные микрозадачи (например, Promise внутри Promise) также выполняются до перехода к следующей задаче.</li>
            <li>Анимации и рендеринг обычно происходят между выполнением задач.</li>
          </ul>
        </div>
        
        <div class="theory-block">
          <h3>4. Практическое применение знаний о Event Loop</h3>
          <p>Понимание Event Loop помогает в следующих сценариях:</p>
          <ul>
            <li><strong>Отладка асинхронного кода</strong> — понимание порядка выполнения помогает находить и исправлять ошибки.</li>
            <li><strong>Оптимизация производительности</strong> — длительные операции можно разбить на меньшие части, чтобы не блокировать UI.</li>
            <li><strong>Работа с API</strong> — понимание, когда будут выполнены колбэки от сетевых запросов.</li>
            <li><strong>Управление анимациями</strong> — синхронизация анимаций с событиями и асинхронными операциями.</li>
            <li><strong>Веб-воркеры</strong> — организация параллельных вычислений без блокировки основного потока.</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onBeforeUnmount } from 'vue';
  
  // Состояние визуализации
  const visualizationStarted = ref(false);
  const isAnimating = ref(false);
  const isVisualizationComplete = ref(false);
  const currentStep = ref(0);
  const totalSteps = ref(19);
  
  // Структуры данных для визуализации
  const callStack = ref([]);
  const callStackOpacity = ref([]);
  const taskQueue = ref([]);
  const microtaskQueue = ref([]);
  const consoleLogs = ref([]);
  const currentExplanation = ref('');
  
  // Индексы для подсветки
  const activeTaskIndex = ref(-1);
  const activeMicrotaskIndex = ref(-1);
  const highlightedLogIndex = ref(-1);
  const isCheckingQueues = ref(false);
  
  // Промежуточные шаги
  const steps = [
    {
      explanation: 'Начало выполнения программы. Глобальный контекст помещается в Call Stack.',
      action: () => {
        callStack.value = ['Global Execution Context'];
        callStackOpacity.value = [1];
      }
    },
    {
      explanation: 'Встречаем console.log(1). Эта функция добавляется в Call Stack и сразу выполняется.',
      action: () => {
        callStack.value = ['console.log(1)', 'Global Execution Context'];
        callStackOpacity.value = [1, 0.7];
        consoleLogs.value.push('1');
        highlightedLogIndex.value = consoleLogs.value.length - 1;
      }
    },
    {
      explanation: 'console.log(1) завершается и удаляется из Call Stack.',
      action: () => {
        callStack.value = ['Global Execution Context'];
        callStackOpacity.value = [1];
        highlightedLogIndex.value = -1;
      }
    },
    {
      explanation: 'Встречаем setTimeout с задержкой 0 мс. setTimeout - это Web API, который регистрирует колбэк.',
      action: () => {
        callStack.value = ['setTimeout(function timeout() {...}, 0)', 'Global Execution Context'];
        callStackOpacity.value = [1, 0.7];
      }
    },
    {
      explanation: 'setTimeout завершает работу и удаляется из Call Stack. Колбэк будет добавлен в Task Queue.',
      action: () => {
        callStack.value = ['Global Execution Context'];
        callStackOpacity.value = [1];
        taskQueue.value.push('timeout() { console.log("Таймаут"); }');
      }
    },
    {
      explanation: 'Встречаем создание нового Promise. Конструктор Promise выполняется синхронно.',
      action: () => {
        callStack.value = ['new Promise(function (resolve, reject) {...})', 'Global Execution Context'];
        callStackOpacity.value = [1, 0.7];
      }
    },
    {
      explanation: 'Внутри Promise выполняется console.log("Promise").',
      action: () => {
        callStack.value = ['console.log("Promise")', 'Promise executor', 'Global Execution Context'];
        callStackOpacity.value = [1, 0.8, 0.6];
        consoleLogs.value.push('Promise');
        highlightedLogIndex.value = consoleLogs.value.length - 1;
      }
    },
    {
      explanation: 'console.log("Promise") завершается и удаляется из Call Stack.',
      action: () => {
        callStack.value = ['Promise executor', 'Global Execution Context'];
        callStackOpacity.value = [1, 0.7];
        highlightedLogIndex.value = -1;
      }
    },
    {
      explanation: 'Внутри Promise встречаем еще один setTimeout, который регистрирует колбэк.',
      action: () => {
        callStack.value = ['setTimeout(() => {...}, 0)', 'Promise executor', 'Global Execution Context'];
        callStackOpacity.value = [1, 0.8, 0.6];
      }
    },
    {
      explanation: 'setTimeout завершает работу и удаляется из Call Stack. Колбэк будет добавлен в Task Queue.',
      action: () => {
        callStack.value = ['Promise executor', 'Global Execution Context'];
        callStackOpacity.value = [1, 0.7];
        taskQueue.value.push('() => { console.log(777); resolve(); }');
      }
    },
    {
      explanation: 'Promise executor завершается. Методы .then() регистрируются, но пока не выполняются.',
      action: () => {
        callStack.value = ['Global Execution Context'];
        callStackOpacity.value = [1];
      }
    },
    {
      explanation: 'Встречаем console.log(4). Эта функция добавляется в Call Stack и сразу выполняется.',
      action: () => {
        callStack.value = ['console.log(4)', 'Global Execution Context'];
        callStackOpacity.value = [1, 0.7];
        consoleLogs.value.push('4');
        highlightedLogIndex.value = consoleLogs.value.length - 1;
      }
    },
    {
      explanation: 'console.log(4) завершается и удаляется из Call Stack.',
      action: () => {
        callStack.value = ['Global Execution Context'];
        callStackOpacity.value = [1];
        highlightedLogIndex.value = -1;
      }
    },
    {
      explanation: 'Встречаем еще один setTimeout с задержкой 0 мс, регистрируется колбэк.',
      action: () => {
        callStack.value = ['setTimeout(() => {...}, 0)', 'Global Execution Context'];
        callStackOpacity.value = [1, 0.7];
      }
    },
    {
      explanation: 'setTimeout завершает работу и удаляется из Call Stack. Колбэк будет добавлен в Task Queue.',
      action: () => {
        callStack.value = ['Global Execution Context'];
        callStackOpacity.value = [1];
        taskQueue.value.push('() => { console.log("timeOut2"); }');
      }
    },
    {
      explanation: 'Синхронный код выполнен. Event Loop начинает проверять очереди. Первый колбэк из Task Queue ("Таймаут") помещается в Call Stack.',
      action: () => {
        callStack.value = ['Global Execution Context'];
        callStackOpacity.value = [0.7];
        isCheckingQueues.value = true;
        setTimeout(() => {
          isCheckingQueues.value = false;
          activeTaskIndex.value = 0;
          setTimeout(() => {
            callStack.value = ['timeout() { console.log("Таймаут"); }', 'Global Execution Context'];
            callStackOpacity.value = [1, 0.7];
            taskQueue.value.shift();
            activeTaskIndex.value = -1;
          }, 1000);
        }, 1000);
      }
    },
    {
      explanation: 'Выполняется console.log("Таймаут").',
      action: () => {
        callStack.value = ['console.log("Таймаут")', 'timeout()', 'Global Execution Context'];
        callStackOpacity.value = [1, 0.8, 0.6];
        consoleLogs.value.push('Таймаут');
        highlightedLogIndex.value = consoleLogs.value.length - 1;
      }
    },
    {
      explanation: 'console.log("Таймаут") завершается, timeout() также завершается и удаляется из Call Stack.',
      action: () => {
        callStack.value = ['Global Execution Context'];
        callStackOpacity.value = [1];
        highlightedLogIndex.value = -1;
      }
    },
    {
      explanation: 'Event Loop берет следующий колбэк из Task Queue, который выводит 777 и вызывает resolve() промиса.',
      action: () => {
        isCheckingQueues.value = true;
        setTimeout(() => {
          isCheckingQueues.value = false;
          activeTaskIndex.value = 0;
          setTimeout(() => {
            callStack.value = ['() => { console.log(777); resolve(); }', 'Global Execution Context'];
            callStackOpacity.value = [1, 0.7];
            taskQueue.value.shift();
            activeTaskIndex.value = -1;
          }, 1000);
        }, 1000);
      }
    },
    {
      explanation: 'Выполняется console.log(777).',
      action: () => {
        callStack.value = ['console.log(777)', '() => { ... }', 'Global Execution Context'];
        callStackOpacity.value = [1, 0.8, 0.6];
        consoleLogs.value.push('777');
        highlightedLogIndex.value = consoleLogs.value.length - 1;
      }
    },
    {
      explanation: 'console.log(777) завершается, затем вызывается resolve(), который добавляет первый .then колбэк в Microtask Queue.',
      action: () => {
        callStack.value = ['resolve()', '() => { ... }', 'Global Execution Context'];
        callStackOpacity.value = [1, 0.8, 0.6];
        highlightedLogIndex.value = -1;
        setTimeout(() => {
          microtaskQueue.value.push('() => { console.log("then1"); }');
        }, 1000);
      }
    },
    {
      explanation: 'Колбэк завершается и удаляется из Call Stack.',
      action: () => {
        callStack.value = ['Global Execution Context'];
        callStackOpacity.value = [1];
      }
    },
    {
      explanation: 'Event Loop проверяет Microtask Queue перед переходом к следующей задаче из Task Queue. Первый .then колбэк помещается в Call Stack.',
      action: () => {
        isCheckingQueues.value = true;
        setTimeout(() => {
          isCheckingQueues.value = false;
          activeMicrotaskIndex.value = 0;
          setTimeout(() => {
            callStack.value = ['() => { console.log("then1"); }', 'Global Execution Context'];
            callStackOpacity.value = [1, 0.7];
            microtaskQueue.value.shift();
            activeMicrotaskIndex.value = -1;
          }, 1000);
        }, 1000);
      }
    },
    {
      explanation: 'Выполняется console.log("then1").',
      action: () => {
        callStack.value = ['console.log("then1")', '() => { ... }', 'Global Execution Context'];
        callStackOpacity.value = [1, 0.8, 0.6];
        consoleLogs.value.push('then1');
        highlightedLogIndex.value = consoleLogs.value.length - 1;
      }
    },
    {
      explanation: 'console.log("then1") завершается, первый .then колбэк завершается и добавляет второй .then колбэк в Microtask Queue.',
      action: () => {
        callStack.value = ['Global Execution Context'];
        callStackOpacity.value = [1];
        highlightedLogIndex.value = -1;
        microtaskQueue.value.push('() => { console.log("then2"); }');
      }
    },
    {
      explanation: 'Event Loop продолжает проверять Microtask Queue. Второй .then колбэк помещается в Call Stack.',
      action: () => {
        isCheckingQueues.value = true;
        setTimeout(() => {
          isCheckingQueues.value = false;
          activeMicrotaskIndex.value = 0;
          setTimeout(() => {
            callStack.value = ['() => { console.log("then2"); }', 'Global Execution Context'];
            callStackOpacity.value = [1, 0.7];
            microtaskQueue.value.shift();
            activeMicrotaskIndex.value = -1;
          }, 1000);
        }, 1000);
      }
    },
    {
      explanation: 'Выполняется console.log("then2").',
      action: () => {
        callStack.value = ['console.log("then2")', '() => { ... }', 'Global Execution Context'];
        callStackOpacity.value = [1, 0.8, 0.6];
        consoleLogs.value.push('then2');
        highlightedLogIndex.value = consoleLogs.value.length - 1;
      }
    },
    {
      explanation: 'console.log("then2") завершается, второй .then колбэк завершается и удаляется из Call Stack.',
      action: () => {
        callStack.value = ['Global Execution Context'];
        callStackOpacity.value = [1];
        highlightedLogIndex.value = -1;
      }
    },
    {
      explanation: 'Microtask Queue пуста. Event Loop возвращается к Task Queue и берет следующий колбэк (timeOut2).',
      action: () => {
        isCheckingQueues.value = true;
        setTimeout(() => {
          isCheckingQueues.value = false;
          activeTaskIndex.value = 0;
          setTimeout(() => {
            callStack.value = ['() => { console.log("timeOut2"); }', 'Global Execution Context'];
            callStackOpacity.value = [1, 0.7];
            taskQueue.value.shift();
            activeTaskIndex.value = -1;
          }, 1000);
        }, 1000);
      }
    },
    {
      explanation: 'Выполняется console.log("timeOut2").',
      action: () => {
        callStack.value = ['console.log("timeOut2")', '() => { ... }', 'Global Execution Context'];
        callStackOpacity.value = [1, 0.8, 0.6];
        consoleLogs.value.push('timeOut2');
        highlightedLogIndex.value = consoleLogs.value.length - 1;
      }
    },
    {
      explanation: 'console.log("timeOut2") завершается, колбэк завершается и удаляется из Call Stack.',
      action: () => {
        callStack.value = ['Global Execution Context'];
        callStackOpacity.value = [1];
        highlightedLogIndex.value = -1;
      }
    },
    {
      explanation: 'Все задачи и микрозадачи выполнены. Программа завершается.',
      action: () => {
        callStack.value = [];
        callStackOpacity.value = [];
        isVisualizationComplete.value = true;
      }
    }
  ];
  
  // Функция для запуска автоматической визуализации всех шагов
  let animationInterval = null;
  function startVisualization() {
    if (isVisualizationComplete.value) {
      resetVisualization();
    }
    
    visualizationStarted.value = true;
    isAnimating.value = true;
    
    // Очищаем предыдущие данные, если были
    callStack.value = [];
    callStackOpacity.value = [];
    taskQueue.value = [];
    microtaskQueue.value = [];
    consoleLogs.value = [];
    
    // Запускаем анимацию с первого шага
    currentStep.value = 0;
    executeStep(0);
    
    animationInterval = setInterval(() => {
      currentStep.value++;
      if (currentStep.value >= steps.length) {
        isAnimating.value = false;
        clearInterval(animationInterval);
        return;
      }
      executeStep(currentStep.value);
    }, 3000); // 3 секунды на шаг для лучшего восприятия
  }
  
  // Функция для выполнения одного шага визуализации
  function executeStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= steps.length) return;
    
    const step = steps[stepIndex];
    currentExplanation.value = step.explanation;
    step.action();
  }
  
  // Функция для перехода на один шаг вперед
  function stepForward() {
    if (currentStep.value < steps.length - 1) {
      currentStep.value++;
      executeStep(currentStep.value);
    }
    if (currentStep.value === steps.length - 1) {
      isVisualizationComplete.value = true;
    }
  }
  
  // Функция для сброса визуализации
  function resetVisualization() {
    if (animationInterval) {
      clearInterval(animationInterval);
    }
    
    isAnimating.value = false;
    isVisualizationComplete.value = false;
    currentStep.value = 0;
    
    callStack.value = [];
    callStackOpacity.value = [];
    taskQueue.value = [];
    microtaskQueue.value = [];
    consoleLogs.value = [];
    currentExplanation.value = '';
    
    activeTaskIndex.value = -1;
    activeMicrotaskIndex.value = -1;
    highlightedLogIndex.value = -1;
    isCheckingQueues.value = false;
  }
  
  // Очистка таймеров при размонтировании компонента
  onBeforeUnmount(() => {
    if (animationInterval) {
      clearInterval(animationInterval);
    }
  });
  </script>
  
  <style>
  .event-loop-explorer {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    color: #000000;
  }
  
  h1, h2, h3 {
    color: #000000;
  }
  
  h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  h2 {
    font-size: 1.5rem;
    margin: 30px 0 15px;
    border-bottom: 2px solid #eeeeee;
    padding-bottom: 8px;
  }
  
  h3 {
    font-size: 1.2rem;
    margin: 20px 0 10px;
  }
  
  .introduction {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 4px;
    margin-bottom: 20px;
    border-left: 4px solid #4285f4;
  }
  
  .introduction p {
    margin: 0;
    line-height: 1.5;
  }
  
  .code-container {
    margin: 20px 0;
    background-color: #f8f9fa;
    border-radius: 4px;
    padding: 15px;
  }
  
  .code {
    background-color: #1e1e1e;
    color: #ffffff;
    padding: 15px;
    border-radius: 4px;
    font-family: 'Courier New', Courier, monospace;
    white-space: pre;
    overflow-x: auto;
    line-height: 1.5;
  }
  
  .control-panel {
    display: flex;
    gap: 10px;
    margin: 20px 0;
    justify-content: center;
  }
  
  .control-button {
    padding: 10px 20px;
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;
  }
  
  .control-button:hover {
    background-color: #3367d6;
  }
  
  .control-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .visualization-container {
    margin: 30px 0;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .event-loop-diagram {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 30px;
    justify-content: space-between;
  }
  
  .call-stack {
    flex: 1;
    min-width: 250px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 10px;
  }
  
  .stack-container {
    background-color: #ffffff;
    border: 1px solid #eeeeee;
    border-radius: 4px;
    min-height: 200px;
    padding: 10px;
    display: flex;
    flex-direction: column-reverse;
  }
  
  .stack-item {
    background-color: #e0f2fe;
    border: 1px solid #bfddf3;
    padding: 8px;
    margin-bottom: 5px;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .event-loop-circle {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 8px solid #4285f4;
    background-color: white;
    color: #333333;
    font-weight: bold;
    position: relative;
  }
  
  .loop-animation {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 8px solid transparent;
    border-top-color: #4285f4;
    margin: -8px;
    opacity: 0;
  }
  
  .loop-animation.active {
    opacity: 1;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .queues {
    flex: 1;
    min-width: 250px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .task-queue, .microtask-queue {
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 10px;
  }
  
  .queue-container {
    background-color: #ffffff;
    border: 1px solid #eeeeee;
    border-radius: 4px;
    min-height: 100px;
    padding: 10px;
  }
  
  .queue-item {
    background-color: #ffebee;
    border: 1px solid #f8bbd0;
    padding: 8px;
    margin-bottom: 5px;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .microtask-queue .queue-item {
    background-color: #e8f5e9;
    border: 1px solid #c8e6c9;
  }
  
  .queue-item.active {
    transform: scale(1.05);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: #ef9a9a;
  }
  
  .microtask-queue .queue-item.active {
    background-color: #81c784;
  }
  
  .execution-log {
    margin-bottom: 20px;
  }
  
  .log-container {
    background-color: #1e1e1e;
    color: #ffffff;
    padding: 15px;
    border-radius: 4px;
    font-family: 'Courier New', Courier, monospace;
    min-height: 100px;
    max-height: 200px;
    overflow-y: auto;
  }
  
  .log-item {
    line-height: 1.5;
    margin-bottom: 5px;
    padding: 3px 5px;
    border-radius: 2px;
    white-space: pre;
  }
  
  .log-item.highlight {
    background-color: #2d2d2d;
    color: #4caf50;
    animation: fade 1s ease-in-out;
  }
  
  @keyframes fade {
    0% { background-color: #4caf50; color: #000000; }
    100% { background-color: #2d2d2d; color: #4caf50; }
  }
  
  .explanation-panel {
    background-color: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 15px;
  }
  
  .explanation-content {
    min-height: 80px;
    line-height: 1.6;
  }
  
  .step-info {
    text-align: right;
    margin-top: 10px;
    font-style: italic;
    color: #666666;
  }
  
  .theory-section {
    margin-top: 40px;
  }
  
  .theory-block {
    margin-bottom: 25px;
    background-color: #ffffff;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .theory-block h3 {
    margin-top: 0;
    color: #4285f4;
  }
  
  .theory-block ul, .theory-block ol {
    padding-left: 20px;
  }
  
  .theory-block li {
    margin-bottom: 8px;
    line-height: 1.5;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .event-loop-diagram {
      flex-direction: column;
    }
    
    .event-loop-circle {
      margin: 0 auto;
    }
  }
  </style>