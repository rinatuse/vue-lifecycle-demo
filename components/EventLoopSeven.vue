<template>
    <div class="event-loop-container">
      <h1 class="main-title">Разбор Event Loop в JavaScript</h1>
      <p class="intro-text">
        Разберем пошагово, как работает Event Loop на примере вашего кода и почему результат именно такой.
      </p>
  
      <div class="code-block-container">
        <h2>Исходный код:</h2>
        <pre class="code-block">
  setTimeout(console.log(1));
  new Promise(function (resolve, reject) { resolve(); }) 
    .then(() => console.log(2)) 
    .then(() => console.log(3)) 
    .catch(() => console.log("err")) 
    .then(() => setTimeout(() => console.log(4)));
  console.log(5);</pre>
      </div>
  
      <div class="navigation-container">
        <button @click="startDemo" class="control-button" :disabled="isAnimating" v-if="!started">
          Начать демонстрацию
        </button>
        <div v-else class="controls">
          <button @click="prevStep" class="control-button" :disabled="currentStep <= 0 || isAnimating">
            Назад
          </button>
          <button @click="nextStep" class="control-button" :disabled="currentStep >= steps.length - 1 || isAnimating">
            Вперед
          </button>
          <button @click="resetDemo" class="control-button reset" :disabled="isAnimating">
            Сначала
          </button>
        </div>
      </div>
  
      <div class="event-loop-visualization">
        <div class="stack-container">
          <h3>Call Stack</h3>
          <div class="stack-visualization">
            <div v-for="(item, index) in displayedStack" :key="'stack-' + index" 
                 class="stack-item" :style="{ opacity: 1 - (index * 0.2) }">
              {{ item }}
            </div>
            <div v-if="displayedStack.length === 0" class="empty-message">Стек пуст</div>
          </div>
        </div>
  
        <div class="queue-container">
          <div class="microtask-container">
            <h3>Очередь микрозадач</h3>
            <div class="queue-visualization">
              <div v-for="(item, index) in displayedMicrotasks" :key="'micro-' + index" 
                  class="queue-item microtask">
                {{ item }}
              </div>
              <div v-if="displayedMicrotasks.length === 0" class="empty-message">Очередь пуста</div>
            </div>
          </div>
  
          <div class="macrotask-container">
            <h3>Очередь макрозадач</h3>
            <div class="queue-visualization">
              <div v-for="(item, index) in displayedMacrotasks" :key="'macro-' + index" 
                  class="queue-item macrotask">
                {{ item }}
              </div>
              <div v-if="displayedMacrotasks.length === 0" class="empty-message">Очередь пуста</div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="console-output">
        <h3>Консоль:</h3>
        <div class="console-container">
          <div v-for="(log, index) in consoleOutput" :key="'log-' + index" 
               class="console-item" :class="{ 'new-output': log.isNew }">
            {{ log.value }}
          </div>
          <div v-if="consoleOutput.length === 0" class="empty-message">Консоль пуста</div>
        </div>
      </div>
  
      <div class="explanation-container">
        <h3>Объяснение:</h3>
        <div class="explanation-box">
          <p>{{ currentExplanation }}</p>
        </div>
      </div>
  
      <div class="current-code">
        <h3>Текущая операция:</h3>
        <pre class="code-block current">{{ currentCode }}</pre>
      </div>
  
      <div class="lessons-container">
        <h2>Основные выводы и применение</h2>
        <div class="lessons-box">
          <h3>Что мы узнали:</h3>
          <ul>
            <li><strong>Синхронный код</strong> выполняется немедленно и блокирует выполнение.</li>
            <li><strong>Event Loop</strong> обрабатывает асинхронные задачи в определенном порядке.</li>
            <li><strong>Микрозадачи</strong> (Promises) имеют приоритет над <strong>макрозадачами</strong> (setTimeout).</li>
            <li>При неправильном использовании setTimeout (передача результата вместо функции), код выполняется синхронно.</li>
          </ul>
  
          <h3>Применение в реальной разработке:</h3>
          <ul>
            <li><strong>Обработка данных:</strong> Загрузка данных через API без блокировки интерфейса.</li>
            <li><strong>Оптимизация производительности:</strong> Разделение тяжелых вычислений на микрозадачи.</li>
            <li><strong>Отложенное выполнение:</strong> Планирование задач, которые должны выполняться после основного потока.</li>
            <li><strong>Управление анимациями:</strong> Плавная анимация с помощью requestAnimationFrame.</li>
            <li><strong>Дебаггинг:</strong> Понимание порядка выполнения помогает находить сложные ошибки.</li>
          </ul>
  
          <div class="common-mistakes">
            <h3>Распространенные ошибки:</h3>
            <div class="mistake">
              <h4>1. Неправильное использование setTimeout</h4>
              <pre class="code-block mistake-code">
  // Неправильно - выполнится синхронно
  setTimeout(console.log('выполнено сразу'));
  
  // Правильно - выполнится асинхронно
  setTimeout(() => console.log('выполнено после задержки'), 0);</pre>
            </div>
  
            <div class="mistake">
              <h4>2. Игнорирование приоритета задач</h4>
              <pre class="code-block mistake-code">
  // Гарантия выполнения кода после всего синхронного кода
  setTimeout(() => { /* код */ }, 0); // макрозадача, низкий приоритет
  
  // Гарантия выполнения кода после синхронного, но перед setTimeout
  Promise.resolve().then(() => { /* код */ }); // микрозадача, высокий приоритет</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Состояние демонстрации
  const started = ref(false);
  const currentStep = ref(-1);
  const isAnimating = ref(false);
  
  // Логи консоли
  const consoleOutput = ref([]);
  
  // Стек и очереди
  const callStack = ref([]);
  const microtaskQueue = ref([]);
  const macrotaskQueue = ref([]);
  
  // Отображаемые значения (используются для анимации)
  const displayedStack = ref([]);
  const displayedMicrotasks = ref([]);
  const displayedMacrotasks = ref([]);
  
  // Текущее объяснение и фрагмент кода
  const currentExplanation = ref('Начнем пошаговый разбор кода и его выполнения в JavaScript.');
  const currentCode = ref('// Нажмите "Начать демонстрацию"');
  
  // Шаги демонстрации
  const steps = [
    {
      explanation: 'JavaScript начинает выполнение кода сверху вниз. Первая инструкция — setTimeout(console.log(1)). Обратите внимание на важный момент: здесь не передана функция в setTimeout, а сразу выполняется console.log(1)!',
      code: 'setTimeout(console.log(1));',
      stack: ['глобальный контекст', 'console.log(1)'],
      micro: [],
      macro: [],
      consoleAdd: { value: '1', isNew: true }
    },
    {
      explanation: 'console.log(1) возвращает undefined, который передается в setTimeout. Это ошибка, так как setTimeout ожидает функцию. setTimeout с некорректными параметрами не добавляет ничего в очередь макрозадач.',
      code: 'setTimeout(undefined); // Некорректный вызов',
      stack: ['глобальный контекст'],
      micro: [],
      macro: [],
      consoleAdd: null
    },
    {
      explanation: 'Далее создается Promise, который сразу же разрешается (resolve()).',
      code: 'new Promise(function (resolve, reject) { resolve(); })',
      stack: ['глобальный контекст', 'Promise executor'],
      micro: [],
      macro: [],
      consoleAdd: null
    },
    {
      explanation: 'Создается первый обработчик then. Эта функция будет добавлена в очередь микрозадач, так как Promise был разрешен.',
      code: '.then(() => console.log(2))',
      stack: ['глобальный контекст'],
      micro: ['Promise.then (console.log(2))'],
      macro: [],
      consoleAdd: null
    },
    {
      explanation: 'Создается второй обработчик then в цепочке. Он будет выполнен только после первого then.',
      code: '.then(() => console.log(3))',
      stack: ['глобальный контекст'],
      micro: ['Promise.then (console.log(2))'],
      macro: [],
      consoleAdd: null
    },
    {
      explanation: 'Создается обработчик catch. Он будет выполнен только при возникновении ошибки в цепочке.',
      code: '.catch(() => console.log("err"))',
      stack: ['глобальный контекст'],
      micro: ['Promise.then (console.log(2))'],
      macro: [],
      consoleAdd: null
    },
    {
      explanation: 'Создается еще один обработчик then, который запустит setTimeout.',
      code: '.then(() => setTimeout(() => console.log(4)))',
      stack: ['глобальный контекст'],
      micro: ['Promise.then (console.log(2))'],
      macro: [],
      consoleAdd: null
    },
    {
      explanation: 'Выполняется синхронная операция console.log(5).',
      code: 'console.log(5);',
      stack: ['глобальный контекст', 'console.log(5)'],
      micro: ['Promise.then (console.log(2))'],
      macro: [],
      consoleAdd: { value: '5', isNew: true }
    },
    {
      explanation: 'Весь синхронный код выполнен. Call Stack пустой. Event Loop проверяет очередь микрозадач и находит первый then.',
      code: '// Синхронный код завершен\n// Event Loop запускает первую микрозадачу',
      stack: [],
      micro: ['Promise.then (console.log(2))'],
      macro: [],
      consoleAdd: null
    },
    {
      explanation: 'Выполняется первая микрозадача - первый then из цепочки промисов.',
      code: '// Выполняется первый then\nconsole.log(2)',
      stack: ['Promise.then', 'console.log(2)'],
      micro: [],
      macro: [],
      consoleAdd: { value: '2', isNew: true }
    },
    {
      explanation: 'После выполнения первого then, второй then из цепочки добавляется в очередь микрозадач.',
      code: '// После выполнения первого then',
      stack: [],
      micro: ['Promise.then (console.log(3))'],
      macro: [],
      consoleAdd: null
    },
    {
      explanation: 'Выполняется вторая микрозадача - второй then из цепочки промисов.',
      code: '// Выполняется второй then\nconsole.log(3)',
      stack: ['Promise.then', 'console.log(3)'],
      micro: [],
      macro: [],
      consoleAdd: { value: '3', isNew: true }
    },
    {
      explanation: 'Поскольку ошибок не было, catch пропускается, и добавляется в очередь микрозадач последний then из цепочки.',
      code: '// catch пропускается, выполняется последний then',
      stack: [],
      micro: ['Promise.then (setTimeout)'],
      macro: [],
      consoleAdd: null
    },
    {
      explanation: 'Последний then выполняется и вызывает setTimeout, который добавляет новую задачу в очередь макрозадач.',
      code: '// В последнем then вызывается\nsetTimeout(() => console.log(4))',
      stack: ['Promise.then', 'setTimeout'],
      micro: [],
      macro: ['setTimeout (console.log(4))'],
      consoleAdd: null
    },
    {
      explanation: 'Все микрозадачи выполнены. Event Loop переходит к очереди макрозадач.',
      code: '// Все микрозадачи выполнены\n// Начинаем выполнять макрозадачи',
      stack: [],
      micro: [],
      macro: ['setTimeout (console.log(4))'],
      consoleAdd: null
    },
    {
      explanation: 'Выполняется единственная макрозадача - функция из setTimeout.',
      code: '// Выполняется setTimeout\nconsole.log(4)',
      stack: ['setTimeout callback', 'console.log(4)'],
      micro: [],
      macro: [],
      consoleAdd: { value: '4', isNew: true }
    },
    {
      explanation: 'Все задачи выполнены. В консоли мы видим числа в порядке: 1, 5, 2, 3, 4. Это демонстрирует, как работает Event Loop и порядок выполнения синхронного и асинхронного кода в JavaScript.',
      code: '// Все выполнено\n// Порядок вывода: 1, 5, 2, 3, 4',
      stack: [],
      micro: [],
      macro: [],
      consoleAdd: null
    }
  ];
  
  // Функции управления демонстрацией
  function startDemo() {
    started.value = true;
    nextStep();
  }
  
  function resetState() {
    callStack.value = [];
    microtaskQueue.value = [];
    macrotaskQueue.value = [];
    displayedStack.value = [];
    displayedMicrotasks.value = [];
    displayedMacrotasks.value = [];
    consoleOutput.value = [];
  }
  
  async function nextStep() {
    if (currentStep.value >= steps.length - 1) return;
    
    isAnimating.value = true;
    currentStep.value++;
    
    const step = steps[currentStep.value];
    
    // Обновляем объяснение и код
    currentExplanation.value = step.explanation;
    currentCode.value = step.code;
    
    // Обновляем стек и очереди с анимацией
    await animateUpdate(callStack, displayedStack, step.stack);
    await animateUpdate(microtaskQueue, displayedMicrotasks, step.micro);
    await animateUpdate(macrotaskQueue, displayedMacrotasks, step.macro);
    
    // Добавляем вывод в консоль
    if (step.consoleAdd) {
      consoleOutput.value.push(step.consoleAdd);
      
      // Сбрасываем флаг "новый вывод" у предыдущих записей
      if (consoleOutput.value.length > 1) {
        for (let i = 0; i < consoleOutput.value.length - 1; i++) {
          consoleOutput.value[i].isNew = false;
        }
      }
    }
    
    isAnimating.value = false;
  }
  
  async function prevStep() {
    if (currentStep.value <= 0) return;
    
    isAnimating.value = true;
    currentStep.value--;
    
    const step = steps[currentStep.value];
    
    // Обновляем объяснение и код
    currentExplanation.value = step.explanation;
    currentCode.value = step.code;
    
    // Обновляем стек и очереди с анимацией
    await animateUpdate(callStack, displayedStack, step.stack);
    await animateUpdate(microtaskQueue, displayedMicrotasks, step.micro);
    await animateUpdate(macrotaskQueue, displayedMacrotasks, step.macro);
    
    // Удаляем последний вывод из консоли, если нужно
    if (steps[currentStep.value + 1].consoleAdd) {
      consoleOutput.value.pop();
    }
    
    isAnimating.value = false;
  }
  
  async function animateUpdate(source, target, newValue) {
    // Обновляем исходный массив
    source.value = [...newValue];
    
    // Анимируем изменения в отображаемом массиве
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    await delay(300); // Задержка для более плавной анимации
    target.value = [...newValue];
  }
  
  function resetDemo() {
    currentStep.value = -1;
    resetState();
    startDemo();
  }
  </script>
  
  <style scoped>
  .event-loop-container {
    font-family: Arial, sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    color: #000;
  }
  
  .main-title {
    text-align: center;
    color: #333;
    margin-bottom: 10px;
  }
  
  .intro-text {
    text-align: center;
    color: #555;
    font-size: 1.1em;
    margin-bottom: 30px;
  }
  
  .code-block-container {
    margin-bottom: 20px;
  }
  
  h2 {
    color: #333;
    margin-bottom: 10px;
  }
  
  .code-block {
    background-color: #282c34;
    color: #fff;
    padding: 15px;
    border-radius: 5px;
    white-space: pre-wrap;
    font-family: 'Courier New', monospace;
    margin: 0;
    line-height: 1.5;
  }
  
  .navigation-container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
  
  .controls {
    display: flex;
    gap: 10px;
  }
  
  .control-button {
    padding: 10px 20px;
    background-color: #4a6cff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
  }
  
  .control-button:hover:not(:disabled) {
    background-color: #3a56dd;
  }
  
  .control-button:disabled {
    background-color: #c0c0c0;
    cursor: not-allowed;
  }
  
  .control-button.reset {
    background-color: #ff6b6b;
  }
  
  .control-button.reset:hover:not(:disabled) {
    background-color: #e55959;
  }
  
  .event-loop-visualization {
    display: flex;
    margin: 30px 0;
    gap: 20px;
  }
  
  .stack-container {
    flex: 1;
  }
  
  .queue-container {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  h3 {
    margin: 0 0 10px 0;
    color: #444;
  }
  
  .stack-visualization, .queue-visualization {
    border: 2px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    min-height: 150px;
    display: flex;
    flex-direction: column-reverse; /* Для стека - последний элемент снизу */
    position: relative;
  }
  
  .queue-visualization {
    flex-direction: column; /* Для очереди - первый элемент сверху */
    min-height: 100px;
  }
  
  .stack-item, .queue-item {
    padding: 8px 10px;
    margin: 5px 0;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    transition: all 0.5s ease;
  }
  
  .stack-item {
    background-color: #e3f2fd;
    border-left: 4px solid #2196f3;
  }
  
  .queue-item.microtask {
    background-color: #f1f8e9;
    border-left: 4px solid #8bc34a;
  }
  
  .queue-item.macrotask {
    background-color: #fff3e0;
    border-left: 4px solid #ff9800;
  }
  
  .console-output {
    margin: 20px 0;
  }
  
  .console-container {
    background-color: #282c34;
    color: #fff;
    padding: 15px;
    border-radius: 5px;
    min-height: 100px;
    font-family: 'Courier New', monospace;
  }
  
  .console-item {
    margin: 5px 0;
    padding: 5px;
    transition: all 0.3s ease;
  }
  
  .console-item.new-output {
    background-color: rgba(255, 255, 255, 0.1);
    animation: highlight 2s ease-out;
  }
  
  @keyframes highlight {
    0% { background-color: rgba(255, 255, 255, 0.3); }
    100% { background-color: rgba(255, 255, 255, 0.1); }
  }
  
  .explanation-container {
    margin: 20px 0;
  }
  
  .explanation-box {
    background-color: #f5f5f5;
    border-left: 4px solid #9c27b0;
    padding: 15px;
    border-radius: 0 5px 5px 0;
  }
  
  .current-code {
    margin: 20px 0;
  }
  
  .code-block.current {
    background-color: #1e293b;
    border-left: 4px solid #4a6cff;
  }
  
  .lessons-container {
    margin: 30px 0;
  }
  
  .lessons-box {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .lessons-box h3 {
    color: #333;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  .lessons-box ul {
    padding-left: 20px;
  }
  
  .lessons-box li {
    margin-bottom: 10px;
    line-height: 1.5;
  }
  
  .common-mistakes {
    margin-top: 30px;
  }
  
  .mistake {
    margin-bottom: 20px;
  }
  
  .mistake h4 {
    color: #d32f2f;
    margin-bottom: 10px;
  }
  
  .code-block.mistake-code {
    font-size: 0.9em;
    padding: 10px;
  }
  
  .empty-message {
    color: #777;
    font-style: italic;
    text-align: center;
    margin: 20px 0;
  }
  
  /* Адаптивная верстка */
  @media (max-width: 768px) {
    .event-loop-visualization {
      flex-direction: column;
    }
    
    .queue-container {
      flex-direction: column;
    }
  }
  </style>