<template>
    <div class="event-loop-explainer">
      <h1>Понимание Event Loop и асинхронности в JavaScript</h1>
      
      <div class="code-block">
        <pre><code>console.log("A");
  
  const p = new Promise((resolve) => {
    resolve("");
    console.log("B");
  });
  
  p.then(() => {
    p.then(() => console.log("C"));
    console.log("D");
  });
  
  setTimeout(() => {
    console.log("E");
  }, 0);
  
  p.then(() => console.log("F"));</code></pre>
      </div>
      
      <div class="question-block">
        <h2>Какой будет порядок вывода букв в консоль?</h2>
        <div class="options">
          <button 
            v-for="option in options" 
            :key="option.value"
            :class="['option-button', { 
              'selected': selectedOption === option.value,
              'correct': showAnswer && option.correct,
              'incorrect': showAnswer && selectedOption === option.value && !option.correct
            }]"
            @click="selectOption(option.value)"
            :disabled="showAnswer"
          >
            {{ option.value }}
          </button>
        </div>
        
        <button 
          v-if="!showAnswer && selectedOption" 
          class="check-button" 
          @click="checkAnswer"
        >
          Проверить ответ
        </button>
        
        <div v-if="showAnswer" class="answer-result">
          <div v-if="isCorrect" class="correct-answer">
            Правильно! Порядок вывода: <strong>A, B, D, F, C, E</strong>
          </div>
          <div v-else class="incorrect-answer">
            Неправильно. Верный порядок: <strong>A, B, D, F, C, E</strong>
          </div>
        </div>
      </div>
      
      <div class="explanation-block" v-if="showAnswer || skipToExplanation">
        <h2>Объяснение решения</h2>
        
        <p>Для понимания порядка выполнения кода необходимо знать, как работает Event Loop в JavaScript:</p>
        
        <div class="event-loop-schema">
          <div class="schema-part call-stack">
            <div class="part-header">Call Stack</div>
            <div class="stack-items">
              <div 
                v-for="(item, index) in displayedCallStack" 
                :key="index" 
                class="stack-item"
                :style="{ opacity: 1 - (index * 0.2) }"
              >
                {{ item }}
              </div>
            </div>
          </div>
          
          <div class="schema-part micro-tasks">
            <div class="part-header">Очередь микрозадач</div>
            <div class="queue-items">
              <div 
                v-for="(item, index) in displayedMicroTasks" 
                :key="index" 
                class="queue-item"
              >
                {{ item }}
              </div>
            </div>
          </div>
          
          <div class="schema-part macro-tasks">
            <div class="part-header">Очередь макрозадач</div>
            <div class="queue-items">
              <div 
                v-for="(item, index) in displayedMacroTasks" 
                :key="index" 
                class="queue-item"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="console-output">
          <div class="console-header">
            <span>Console</span>
            <div class="console-controls">
              <button @click="startAnimation" :disabled="isAnimating || animationCompleted">
                {{ animationCompleted ? 'Анимация завершена' : 'Запустить анимацию' }}
              </button>
              <button @click="resetAnimation" :disabled="isAnimating || !animationStarted">
                Сбросить
              </button>
            </div>
          </div>
          <div class="console-content">
            <div 
              v-for="(log, index) in consoleLogs" 
              :key="index" 
              :class="['console-log', { 'active': log.active }]"
            >
              {{ log.text }}
            </div>
          </div>
        </div>
        
        <div class="execution-steps">
          <h3>Пошаговое объяснение:</h3>
          
          <div 
            v-for="(step, index) in executionSteps" 
            :key="index" 
            :class="['execution-step', { 'active-step': currentStepIndex >= index }]"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <p>{{ step.explanation }}</p>
              <div v-if="step.code" class="step-code">
                <pre><code>{{ step.code }}</code></pre>
              </div>
            </div>
          </div>
        </div>
        
        <div class="explanation-details">
          <h3>Ключевые принципы работы Event Loop:</h3>
          
          <ol>
            <li>
              <strong>Синхронный код</strong> всегда выполняется первым и полностью, до рассмотрения любых асинхронных операций.
            </li>
            <li>
              <strong>Микрозадачи</strong> (Promise callbacks) имеют приоритет над макрозадачами и выполняются сразу после завершения синхронного кода.
            </li>
            <li>
              <strong>Макрозадачи</strong> (setTimeout, setInterval, requestAnimationFrame) выполняются только после завершения всех микрозадач.
            </li>
            <li>
              Event Loop работает циклически: сначала обрабатывает весь синхронный код, затем все микрозадачи, затем одну макрозадачу, и так по кругу.
            </li>
          </ol>
          
          <h3>Практическое применение:</h3>
          
          <ul>
            <li>
              <strong>UI-обновления</strong>: понимание Event Loop помогает создавать отзывчивые интерфейсы, не блокируя рендеринг
            </li>
            <li>
              <strong>Управление асинхронными операциями</strong>: правильная организация кода для работы с API, базами данных и файлами
            </li>
            <li>
              <strong>Оптимизация производительности</strong>: распределение тяжёлых вычислений на нужные части цикла событий
            </li>
            <li>
              <strong>Отладка сложных проблем</strong>: понимание, почему определённый код выполняется не в том порядке, в котором ожидалось
            </li>
            <li>
              <strong>Работа с фреймворками</strong>: Vue.js, React, Angular используют Event Loop для эффективных обновлений DOM
            </li>
          </ul>
        </div>
      </div>
      
      <button 
        v-if="!showAnswer && !skipToExplanation" 
        class="skip-button" 
        @click="skipToExplanation = true"
      >
        Перейти к объяснению
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        options: [
          { value: 'A, B, C, D, E, F', correct: false },
          { value: 'A, B, D, C, F, E', correct: false },
          { value: 'A, B, D, F, C, E', correct: true },
          { value: 'A, B, E, D, C, F', correct: false }
        ],
        selectedOption: null,
        showAnswer: false,
        isCorrect: false,
        skipToExplanation: false,
        
        // Для анимации
        isAnimating: false,
        animationStarted: false,
        animationCompleted: false,
        currentStepIndex: -1,
        
        // Состояние для анимации
        displayedCallStack: [],
        displayedMicroTasks: [],
        displayedMacroTasks: [],
        consoleLogs: [
          { text: '', active: false }
        ],
        
        // Шаги выполнения
        executionSteps: [
          {
            explanation: 'Сначала выполняется синхронный код. Выводится "A".',
            code: 'console.log("A");',
            actions: {
              callStack: ['console.log("A")'],
              microTasks: [],
              macroTasks: [],
              consoleLogs: [{ text: '> A', active: true }]
            }
          },
          {
            explanation: 'Создается Promise и сразу вызывается функция-конструктор.',
            code: 'const p = new Promise((resolve) => { ... });',
            actions: {
              callStack: ['Promise constructor'],
              microTasks: [],
              macroTasks: [],
              consoleLogs: [{ text: '> A', active: false }]
            }
          },
          {
            explanation: 'Внутри Promise вызывается resolve(), но связанные с ним обработчики .then() будут выполнены позже как микрозадачи.',
            code: 'resolve("");',
            actions: {
              callStack: ['Promise constructor', 'resolve("")'],
              microTasks: [],
              macroTasks: [],
              consoleLogs: [{ text: '> A', active: false }]
            }
          },
          {
            explanation: 'Далее синхронно выводится "B".',
            code: 'console.log("B");',
            actions: {
              callStack: ['Promise constructor', 'console.log("B")'],
              microTasks: [],
              macroTasks: [],
              consoleLogs: [
                { text: '> A', active: false },
                { text: '> B', active: true }
              ]
            }
          },
          {
            explanation: 'При вызове p.then() мы добавляем колбэк в очередь микрозадач, но еще не выполняем его.',
            code: 'p.then(() => {\n  p.then(() => console.log("C"));\n  console.log("D");\n});',
            actions: {
              callStack: [],
              microTasks: ['p.then(() => { ... })'],
              macroTasks: [],
              consoleLogs: [
                { text: '> A', active: false },
                { text: '> B', active: false }
              ]
            }
          },
          {
            explanation: 'setTimeout добавляет колбэк в очередь макрозадач, которая будет обработана после всех микрозадач.',
            code: 'setTimeout(() => {\n  console.log("E");\n}, 0);',
            actions: {
              callStack: ['setTimeout(() => { ... }, 0)'],
              microTasks: ['p.then(() => { ... })'],
              macroTasks: ['setTimeout(() => console.log("E"))'],
              consoleLogs: [
                { text: '> A', active: false },
                { text: '> B', active: false }
              ]
            }
          },
          {
            explanation: 'Добавляем еще один обработчик then в очередь микрозадач.',
            code: 'p.then(() => console.log("F"));',
            actions: {
              callStack: [],
              microTasks: [
                'p.then(() => { ... })',
                'p.then(() => console.log("F"))'
              ],
              macroTasks: ['setTimeout(() => console.log("E"))'],
              consoleLogs: [
                { text: '> A', active: false },
                { text: '> B', active: false }
              ]
            }
          },
          {
            explanation: 'Синхронный код завершен. Event Loop переходит к обработке микрозадач. Выполняется первый Promise callback и выводится "D".',
            code: 'console.log("D");',
            actions: {
              callStack: ['p.then callback', 'console.log("D")'],
              microTasks: [
                'p.then(() => console.log("F"))'
              ],
              macroTasks: ['setTimeout(() => console.log("E"))'],
              consoleLogs: [
                { text: '> A', active: false },
                { text: '> B', active: false },
                { text: '> D', active: true }
              ]
            }
          },
          {
            explanation: 'Внутри первого then мы добавляем еще одну микрозадачу для вывода "C".',
            code: 'p.then(() => console.log("C"));',
            actions: {
              callStack: ['p.then callback'],
              microTasks: [
                'p.then(() => console.log("F"))',
                'p.then(() => console.log("C"))'
              ],
              macroTasks: ['setTimeout(() => console.log("E"))'],
              consoleLogs: [
                { text: '> A', active: false },
                { text: '> B', active: false },
                { text: '> D', active: false }
              ]
            }
          },
          {
            explanation: 'Первая микрозадача завершена. Event Loop переходит к следующей микрозадаче - выводит "F".',
            code: 'console.log("F");',
            actions: {
              callStack: ['p.then callback', 'console.log("F")'],
              microTasks: [
                'p.then(() => console.log("C"))'
              ],
              macroTasks: ['setTimeout(() => console.log("E"))'],
              consoleLogs: [
                { text: '> A', active: false },
                { text: '> B', active: false },
                { text: '> D', active: false },
                { text: '> F', active: true }
              ]
            }
          },
          {
            explanation: 'Вторая микрозадача завершена. Event Loop переходит к третьей микрозадаче - выводит "C".',
            code: 'console.log("C");',
            actions: {
              callStack: ['p.then callback', 'console.log("C")'],
              microTasks: [],
              macroTasks: ['setTimeout(() => console.log("E"))'],
              consoleLogs: [
                { text: '> A', active: false },
                { text: '> B', active: false },
                { text: '> D', active: false },
                { text: '> F', active: false },
                { text: '> C', active: true }
              ]
            }
          },
          {
            explanation: 'Все микрозадачи обработаны. Event Loop переходит к макрозадачам и выполняет setTimeout колбэк, выводит "E".',
            code: 'console.log("E");',
            actions: {
              callStack: ['setTimeout callback', 'console.log("E")'],
              microTasks: [],
              macroTasks: [],
              consoleLogs: [
                { text: '> A', active: false },
                { text: '> B', active: false },
                { text: '> D', active: false },
                { text: '> F', active: false },
                { text: '> C', active: false },
                { text: '> E', active: true }
              ]
            }
          },
          {
            explanation: 'Выполнение кода завершено. Итоговый порядок вывода: A, B, D, F, C, E',
            actions: {
              callStack: [],
              microTasks: [],
              macroTasks: [],
              consoleLogs: [
                { text: '> A', active: false },
                { text: '> B', active: false },
                { text: '> D', active: false },
                { text: '> F', active: false },
                { text: '> C', active: false },
                { text: '> E', active: false }
              ]
            }
          }
        ]
      };
    },
    computed: {
      // Вычисляемое свойство для проверки правильности ответа
      isCorrect() {
        return this.selectedOption === 'A, B, D, F, C, E';
      }
    },
    methods: {
      // Метод для выбора варианта ответа
      selectOption(option) {
        this.selectedOption = option;
      },
      
      // Метод для проверки ответа
      checkAnswer() {
        this.showAnswer = true;
      },
      
      // Методы для анимации
      async startAnimation() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.animationStarted = true;
        this.currentStepIndex = -1;
        
        // Очистка предыдущего состояния
        this.displayedCallStack = [];
        this.displayedMicroTasks = [];
        this.displayedMacroTasks = [];
        this.consoleLogs = [{ text: '', active: false }];
        
        // Последовательное выполнение шагов с задержкой
        for (let i = 0; i < this.executionSteps.length; i++) {
          await this.executeStep(i);
        }
        
        this.isAnimating = false;
        this.animationCompleted = true;
      },
      
      // Выполнение одного шага анимации
      async executeStep(index) {
        return new Promise(resolve => {
          setTimeout(() => {
            this.currentStepIndex = index;
            const step = this.executionSteps[index];
            
            if (step.actions) {
              this.displayedCallStack = step.actions.callStack || [];
              this.displayedMicroTasks = step.actions.microTasks || [];
              this.displayedMacroTasks = step.actions.macroTasks || [];
              
              if (step.actions.consoleLogs) {
                this.consoleLogs = step.actions.consoleLogs;
              }
            }
            
            resolve();
          }, 2000); // Задержка между шагами
        });
      },
      
      // Сброс анимации
      resetAnimation() {
        this.isAnimating = false;
        this.animationCompleted = false;
        this.currentStepIndex = -1;
        this.displayedCallStack = [];
        this.displayedMicroTasks = [];
        this.displayedMacroTasks = [];
        this.consoleLogs = [{ text: '', active: false }];
      }
    }
  };
  </script>
  
  <style>
  .event-loop-explainer {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    color: black;
    line-height: 1.6;
  }
  
  h1 {
    font-size: 28px;
    margin-bottom: 20px;
    text-align: center;
    color: black;
  }
  
  h2 {
    font-size: 22px;
    margin: 20px 0;
    color: black;
  }
  
  h3 {
    font-size: 18px;
    margin: 15px 0;
    color: black;
  }
  
  .code-block {
    background-color: #f8f8f8;
    border-radius: 6px;
    padding: 20px;
    margin: 20px 0;
    overflow-x: auto;
  }
  
  .code-block pre {
    margin: 0;
  }
  
  .code-block code {
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 14px;
    color: black;
  }
  
  .question-block {
    background-color: #f0f7ff;
    border-radius: 6px;
    padding: 20px;
    margin: 20px 0;
  }
  
  .options {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin: 20px 0;
  }
  
  .option-button {
    background-color: white;
    border: 2px solid #ccc;
    border-radius: 6px;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .option-button:hover:not(:disabled) {
    background-color: #f0f0f0;
  }
  
  .option-button.selected {
    border-color: #4C84FF;
    background-color: #E6EFFF;
  }
  
  .option-button.correct {
    border-color: #4CAF50;
    background-color: #E8F5E9;
  }
  
  .option-button.incorrect {
    border-color: #F44336;
    background-color: #FFEBEE;
  }
  
  .check-button, .skip-button {
    background-color: #4C84FF;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 12px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 15px;
  }
  
  .check-button:hover, .skip-button:hover {
    background-color: #3B71E8;
  }
  
  .skip-button {
    background-color: #9E9E9E;
    display: block;
    margin: 20px auto;
  }
  
  .skip-button:hover {
    background-color: #757575;
  }
  
  .answer-result {
    margin: 20px 0;
    padding: 15px;
    border-radius: 6px;
    font-size: 18px;
  }
  
  .correct-answer {
    background-color: #E8F5E9;
    border-left: 4px solid #4CAF50;
  }
  
  .incorrect-answer {
    background-color: #FFEBEE;
    border-left: 4px solid #F44336;
  }
  
  .explanation-block {
    animation: fadeIn 0.5s;
  }
  
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  .event-loop-schema {
    display: flex;
    gap: 20px;
    margin: 30px 0;
    flex-wrap: wrap;
  }
  
  .schema-part {
    flex: 1;
    min-width: 250px;
    background-color: #f8f8f8;
    border-radius: 6px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .part-header {
    font-weight: bold;
    font-size: 16px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }
  
  .stack-items, .queue-items {
    min-height: 150px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    display: flex;
    flex-direction: column;
  }
  
  .stack-items {
    flex-direction: column-reverse;
  }
  
  .stack-item, .queue-item {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px;
    margin-bottom: 8px;
    font-size: 14px;
    transition: all 0.3s;
  }
  
  .stack-item {
    border-left: 3px solid #FF5722;
  }
  
  .queue-item {
    border-left: 3px solid #4CAF50;
  }
  
  .micro-tasks .queue-item {
    border-left-color: #2196F3;
  }
  
  .console-output {
    margin: 30px 0;
    border: 1px solid #ddd;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .console-header {
    background-color: #f0f0f0;
    padding: 10px 15px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .console-controls button {
    background-color: #4C84FF;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    margin-left: 10px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .console-controls button:hover:not(:disabled) {
    background-color: #3B71E8;
  }
  
  .console-controls button:disabled {
    background-color: #B0BEC5;
    cursor: not-allowed;
  }
  
  .console-content {
    background-color: #2d2d2d;
    color: white;
    padding: 15px;
    min-height: 150px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  }
  
  .console-log {
    margin-bottom: 5px;
    padding: 5px;
    border-radius: 3px;
    transition: all 0.3s;
  }
  
  .console-log.active {
    background-color: rgba(76, 175, 80, 0.3);
  }
  
  .execution-steps {
    margin: 30px 0;
  }
  
  .execution-step {
    display: flex;
    margin-bottom: 20px;
    opacity: 0.5;
    transition: all 0.3s;
  }
  
  .execution-step.active-step {
    opacity: 1;
  }
  
  .step-number {
    background-color: #4C84FF;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 15px;
    flex-shrink: 0;
  }
  
  .step-content {
    flex: 1;
  }
  
  .step-code {
    background-color: #f8f8f8;
    border-radius: 4px;
    padding: 10px;
    margin-top: 10px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 14px;
    color: black;
  }
  
  .explanation-details {
    margin: 30px 0;
    background-color: #f8f8f8;
    border-radius: 6px;
    padding: 20px;
  }
  
  .explanation-details li {
    margin-bottom: 10px;
  }
  
  /* Медиа-запросы для адаптивности */
  @media (max-width: 768px) {
    .event-loop-schema {
      flex-direction: column;
    }
    
    .schema-part {
      width: 100%;
    }
    
    .options {
      flex-direction: column;
    }
    
    .option-button {
      width: 100%;
      text-align: left;
    }
  }
  </style>