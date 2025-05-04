<template>
    <div class="event-loop-container">
      <h1>Event Loop и асинхронность в JavaScript</h1>
      
      <div class="intro-section">
        <p>Давайте разберем пошагово, как JavaScript выполняет асинхронный код на примере этой задачи:</p>
        <pre class="code-block">
  console.log(1);
  setTimeout(() => console.log(2));
  Promise.reject(3).catch(console.log);
  new Promise((resolve) => setTimeout(resolve)).then(() => console.log(4));
  Promise.resolve(5).then(console.log);
  console.log(6);
  setTimeout(() => console.log(7), 0);
        </pre>
      </div>
  
      <!-- Панель управления анимацией -->
      <div class="controls">
        <button @click="startAnimation" :disabled="isAnimating || currentStep > 0" class="control-button start">Начать анимацию</button>
        <button @click="resetAnimation" :disabled="isAnimating || currentStep === 0" class="control-button reset">Сбросить</button>
        <button @click="prevStep" :disabled="isAnimating || currentStep <= 1" class="control-button">Предыдущий шаг</button>
        <button @click="nextStep" :disabled="isAnimating || currentStep >= steps.length" class="control-button">Следующий шаг</button>
      </div>
  
      <!-- Визуализация Event Loop, Call Stack, Task Queue и Microtask Queue -->
      <div class="event-loop-visualization">
        <div class="code-execution">
          <h3>Код</h3>
          <div class="code-container">
            <div v-for="(line, index) in codeLines" :key="index" 
                 :class="['code-line', { active: currentStep > 0 && executedLines.includes(index) }]">
              {{ line }}
            </div>
          </div>
          <div class="console-output">
            <h3>Консоль</h3>
            <div class="output-container">
              <div v-for="(output, index) in consoleOutput" :key="index" class="output-line">
                {{ output }}
              </div>
            </div>
          </div>
        </div>
  
        <div class="loop-components">
          <div class="call-stack-container">
            <h3>Call Stack</h3>
            <div class="call-stack">
              <div v-for="(item, index) in callStack" :key="index" class="stack-item">
                {{ item }}
              </div>
            </div>
          </div>
  
          <div class="queues-container">
            <div class="microtask-queue">
              <h3>Очередь микрозадач</h3>
              <div class="queue">
                <div v-for="(task, index) in microtaskQueue" :key="index" class="queue-item">
                  {{ task }}
                </div>
                <div v-if="microtaskQueue.length === 0" class="empty-queue">Пусто</div>
              </div>
            </div>
  
            <div class="task-queue">
              <h3>Очередь задач (макрозадач)</h3>
              <div class="queue">
                <div v-for="(task, index) in taskQueue" :key="index" class="queue-item">
                  {{ task }}
                </div>
                <div v-if="taskQueue.length === 0" class="empty-queue">Пусто</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Текущее объяснение шага -->
      <div class="step-explanation">
        <h3>Объяснение (Шаг {{ currentStep }} из {{ steps.length }})</h3>
        <div class="explanation-content">
          <div v-if="currentStep === 0">
            Нажмите кнопку "Начать анимацию", чтобы пошагово увидеть, как выполняется этот код.
          </div>
          <div v-else v-html="currentExplanation"></div>
        </div>
      </div>
  
      <!-- Раздел с подробной теорией -->
      <div class="theory-section">
        <h2>Теоретическое объяснение</h2>
        
        <h3>Что такое Event Loop?</h3>
        <p>Event Loop (цикл событий) — это основа асинхронности в JavaScript. Его главная задача — координировать выполнение кода, обработку событий, колбэков и других асинхронных операций.</p>
        
        <h3>Основные компоненты Event Loop:</h3>
        <ol>
          <li><strong>Call Stack (стек вызовов)</strong> — структура данных, которая хранит информацию о текущей позиции выполнения программы. Когда мы вызываем функцию, новый кадр добавляется на вершину стека, а когда функция возвращает значение, кадр удаляется из стека.</li>
          <li><strong>Heap (куча)</strong> — область памяти, где хранятся объекты.</li>
          <li><strong>Task Queue (очередь задач или макрозадач)</strong> — здесь хранятся задачи, которые будут выполнены в будущем. Сюда попадают колбэки из setTimeout, setInterval, события DOM и т.д.</li>
          <li><strong>Microtask Queue (очередь микрозадач)</strong> — очередь с более высоким приоритетом, чем очередь задач. Сюда попадают обработчики Promise (.then, .catch, .finally) и queueMicrotask().</li>
        </ol>
  
        <h3>Алгоритм работы Event Loop:</h3>
        <ol>
          <li>Выполнить весь синхронный код (всё что находится в Call Stack).</li>
          <li>Проверить, есть ли микрозадачи в очереди микрозадач. Если есть — выполнить все микрозадачи.</li>
          <li>Выполнить одну задачу из очереди задач, если таковая имеется.</li>
          <li>Снова проверить, есть ли микрозадачи, и выполнить их все.</li>
          <li>Перейти к следующей итерации цикла (п.3).</li>
        </ol>
  
        <h3>Порядок приоритетов выполнения в JavaScript:</h3>
        <ol>
          <li>Синхронный код</li>
          <li>Микрозадачи (Promises, queueMicrotask)</li>
          <li>Макрозадачи (setTimeout, setInterval, requestAnimationFrame, события I/O и т.д.)</li>
        </ol>
  
        <h3>Примеры из реальной жизни, где понимание Event Loop критически важно:</h3>
        <ol>
          <li><strong>Обработка пользовательских событий</strong> — реакция на клики, прокрутку, ввод данных.</li>
          <li><strong>Запросы к API</strong> — понимание асинхронности поможет правильно обрабатывать ответы от сервера.</li>
          <li><strong>Анимации и переходы</strong> — корректное планирование обновлений DOM для плавных анимаций.</li>
          <li><strong>Оптимизация производительности</strong> — разделение тяжелых вычислений на части, чтобы не блокировать интерфейс.</li>
          <li><strong>Работа с WebSockets</strong> — асинхронная обработка потока сообщений.</li>
          <li><strong>Параллельные операции</strong> — выполнение нескольких задач "одновременно".</li>
        </ol>
  
        <h3>Подводные камни и частые ошибки:</h3>
        <ol>
          <li><strong>Блокировка Event Loop</strong> — выполнение тяжелых синхронных операций может привести к "зависанию" интерфейса.</li>
          <li><strong>Race Conditions</strong> — ошибки, связанные с непредсказуемым порядком выполнения асинхронных операций.</li>
          <li><strong>Callback Hell</strong> — вложенные колбэки, усложняющие код (решается с помощью Promises и async/await).</li>
          <li><strong>Потеря контекста (this)</strong> — особенно в колбэках setTimeout и обработчиках событий.</li>
          <li><strong>Неправильное понимание микрозадач и макрозадач</strong> — что приводит к ошибкам в порядке выполнения кода.</li>
        </ol>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isAnimating: false,
        animationInterval: null,
        currentStep: 0,
        executedLines: [],
        consoleOutput: [],
        callStack: [],
        microtaskQueue: [],
        taskQueue: [],
        codeLines: [
          "console.log(1);",
          "setTimeout(() => console.log(2));",
          "Promise.reject(3).catch(console.log);",
          "new Promise((resolve) => setTimeout(resolve)).then(() => console.log(4));",
          "Promise.resolve(5).then(console.log);",
          "console.log(6);",
          "setTimeout(() => console.log(7), 0);"
        ],
        steps: [
          {
            explanation: "Исходное состояние. Все очереди пусты, код готов к выполнению.",
            executedLines: [],
            consoleOutput: [],
            callStack: [],
            microtaskQueue: [],
            taskQueue: []
          },
          {
            explanation: "<code>console.log(1)</code> - это синхронная операция. JavaScript помещает ее в стек вызовов, выполняет и выводит 1 в консоль.",
            executedLines: [0],
            consoleOutput: ["1"],
            callStack: ["console.log(1)"],
            microtaskQueue: [],
            taskQueue: []
          },
          {
            explanation: "<code>setTimeout(() => console.log(2))</code> - это асинхронная операция. JavaScript регистрирует колбэк и планирует его выполнение в будущем. Таймер запускается, а колбэк помещается в очередь задач (макрозадач) после истечения времени (в данном случае, времени не указано, поэтому браузер использует минимальное значение, обычно 4мс).",
            executedLines: [0, 1],
            consoleOutput: ["1"],
            callStack: ["setTimeout(...)"],
            microtaskQueue: [],
            taskQueue: ["() => console.log(2)"]
          },
          {
            explanation: "<code>Promise.reject(3).catch(console.log)</code> - создает промис, который сразу переходит в состояние rejected со значением 3. Метод <code>catch()</code> регистрирует обработчик, который будет вызван, когда промис отклонен. Этот обработчик помещается в очередь микрозадач.",
            executedLines: [0, 1, 2],
            consoleOutput: ["1"],
            callStack: ["Promise.reject(3).catch(console.log)"],
            microtaskQueue: ["console.log(3)"],
            taskQueue: ["() => console.log(2)"]
          },
          {
            explanation: "<code>new Promise((resolve) => setTimeout(resolve))</code> - создается новый промис. Внутри него запускается таймер, который вызовет <code>resolve()</code> после минимальной задержки. Затем регистрируется обработчик <code>.then(() => console.log(4))</code>, который будет вызван, когда промис выполнится. Этот обработчик не добавляется в очередь микрозадач сразу, так как промис еще не выполнен (resolve не вызван).",
            executedLines: [0, 1, 2, 3],
            consoleOutput: ["1"],
            callStack: ["new Promise(...).then(...)"],
            microtaskQueue: ["console.log(3)"],
            taskQueue: ["() => console.log(2)", "setTimeout(resolve)"]
          },
          {
            explanation: "<code>Promise.resolve(5).then(console.log)</code> - создается промис, который сразу переходит в состояние fulfilled со значением 5. Метод <code>.then()</code> регистрирует обработчик, который будет вызван, когда промис выполнен. Этот обработчик помещается в очередь микрозадач.",
            executedLines: [0, 1, 2, 3, 4],
            consoleOutput: ["1"],
            callStack: ["Promise.resolve(5).then(console.log)"],
            microtaskQueue: ["console.log(3)", "console.log(5)"],
            taskQueue: ["() => console.log(2)", "setTimeout(resolve)"]
          },
          {
            explanation: "<code>console.log(6)</code> - еще одна синхронная операция. JavaScript помещает ее в стек вызовов, выполняет и выводит 6 в консоль.",
            executedLines: [0, 1, 2, 3, 4, 5],
            consoleOutput: ["1", "6"],
            callStack: ["console.log(6)"],
            microtaskQueue: ["console.log(3)", "console.log(5)"],
            taskQueue: ["() => console.log(2)", "setTimeout(resolve)"]
          },
          {
            explanation: "<code>setTimeout(() => console.log(7), 0)</code> - регистрируется еще один таймер с колбэком, который будет вызван после нулевой задержки. Колбэк помещается в очередь задач (макрозадач).",
            executedLines: [0, 1, 2, 3, 4, 5, 6],
            consoleOutput: ["1", "6"],
            callStack: ["setTimeout(..., 0)"],
            microtaskQueue: ["console.log(3)", "console.log(5)"],
            taskQueue: ["() => console.log(2)", "setTimeout(resolve)", "() => console.log(7)"]
          },
          {
            explanation: "На этом этапе весь синхронный код выполнен. Теперь Event Loop проверяет очередь микрозадач. Там есть две микрозадачи. Выполняется первая микрозадача <code>console.log(3)</code>.",
            executedLines: [0, 1, 2, 3, 4, 5, 6],
            consoleOutput: ["1", "6", "3"],
            callStack: ["console.log(3)"],
            microtaskQueue: ["console.log(5)"],
            taskQueue: ["() => console.log(2)", "setTimeout(resolve)", "() => console.log(7)"]
          },
          {
            explanation: "Выполняется вторая микрозадача <code>console.log(5)</code>.",
            executedLines: [0, 1, 2, 3, 4, 5, 6],
            consoleOutput: ["1", "6", "3", "5"],
            callStack: ["console.log(5)"],
            microtaskQueue: [],
            taskQueue: ["() => console.log(2)", "setTimeout(resolve)", "() => console.log(7)"]
          },
          {
            explanation: "Очередь микрозадач пуста. Теперь Event Loop берет первую задачу из очереди задач: <code>() => console.log(2)</code>.",
            executedLines: [0, 1, 2, 3, 4, 5, 6],
            consoleOutput: ["1", "6", "3", "5", "2"],
            callStack: ["() => console.log(2)", "console.log(2)"],
            microtaskQueue: [],
            taskQueue: ["setTimeout(resolve)", "() => console.log(7)"]
          },
          {
            explanation: "Следующая задача из очереди задач: <code>setTimeout(resolve)</code>. Эта задача вызывает resolve() для промиса из шага 4. Когда промис разрешается, его обработчик .then(() => console.log(4)) добавляется в очередь микрозадач.",
            executedLines: [0, 1, 2, 3, 4, 5, 6],
            consoleOutput: ["1", "6", "3", "5", "2"],
            callStack: ["setTimeout(resolve)", "resolve()"],
            microtaskQueue: ["() => console.log(4)"],
            taskQueue: ["() => console.log(7)"]
          },
          {
            explanation: "Перед выполнением следующей задачи, Event Loop проверяет очередь микрозадач. Там есть одна микрозадача <code>() => console.log(4)</code>, которая выполняется.",
            executedLines: [0, 1, 2, 3, 4, 5, 6],
            consoleOutput: ["1", "6", "3", "5", "2", "4"],
            callStack: ["() => console.log(4)", "console.log(4)"],
            microtaskQueue: [],
            taskQueue: ["() => console.log(7)"]
          },
          {
            explanation: "Очередь микрозадач снова пуста. Event Loop переходит к последней задаче в очереди задач: <code>() => console.log(7)</code>.",
            executedLines: [0, 1, 2, 3, 4, 5, 6],
            consoleOutput: ["1", "6", "3", "5", "2", "4", "7"],
            callStack: ["() => console.log(7)", "console.log(7)"],
            microtaskQueue: [],
            taskQueue: []
          },
          {
            explanation: "Все очереди пусты, код полностью выполнен. Порядок вывода: 1, 6, 3, 5, 2, 4, 7.",
            executedLines: [0, 1, 2, 3, 4, 5, 6],
            consoleOutput: ["1", "6", "3", "5", "2", "4", "7"],
            callStack: [],
            microtaskQueue: [],
            taskQueue: []
          }
        ]
      };
    },
    computed: {
      currentExplanation() {
        return this.steps[this.currentStep]?.explanation || '';
      }
    },
    methods: {
      startAnimation() {
        this.isAnimating = true;
        this.currentStep = 0;
        this.animateStep();
      },
      resetAnimation() {
        this.isAnimating = false;
        if (this.animationInterval) {
          clearTimeout(this.animationInterval);
        }
        this.currentStep = 0;
        this.executedLines = [];
        this.consoleOutput = [];
        this.callStack = [];
        this.microtaskQueue = [];
        this.taskQueue = [];
      },
      animateStep() {
        if (this.currentStep < this.steps.length) {
          this.currentStep++;
          const step = this.steps[this.currentStep];
          
          // Обновляем состояние всех компонентов
          this.executedLines = [...step.executedLines];
          this.consoleOutput = [...step.consoleOutput];
          this.callStack = [...step.callStack];
          this.microtaskQueue = [...step.microtaskQueue];
          this.taskQueue = [...step.taskQueue];
          
          // Если это не последний шаг, планируем следующий
          if (this.currentStep < this.steps.length) {
            this.animationInterval = setTimeout(() => {
              this.animateStep();
            }, 3000); // 3 секунды на каждый шаг
          } else {
            this.isAnimating = false;
          }
        } else {
          this.isAnimating = false;
        }
      },
      nextStep() {
        if (this.currentStep < this.steps.length) {
          this.currentStep++;
          const step = this.steps[this.currentStep];
          
          // Обновляем состояние всех компонентов
          this.executedLines = [...step.executedLines];
          this.consoleOutput = [...step.consoleOutput];
          this.callStack = [...step.callStack];
          this.microtaskQueue = [...step.microtaskQueue];
          this.taskQueue = [...step.taskQueue];
        }
      },
      prevStep() {
        if (this.currentStep > 1) {
          this.currentStep--;
          const step = this.steps[this.currentStep];
          
          // Обновляем состояние всех компонентов
          this.executedLines = [...step.executedLines];
          this.consoleOutput = [...step.consoleOutput];
          this.callStack = [...step.callStack];
          this.microtaskQueue = [...step.microtaskQueue];
          this.taskQueue = [...step.taskQueue];
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .event-loop-container {
    font-family: Arial, sans-serif;
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
    margin-bottom: 20px;
  }
  
  h2 {
    border-bottom: 2px solid #666;
    padding-bottom: 10px;
    margin-top: 40px;
  }
  
  .intro-section {
    margin-bottom: 30px;
  }
  
  .code-block {
    background-color: #f8f8f8;
    color: #000000;
    padding: 15px;
    border-radius: 5px;
    font-family: 'Courier New', monospace;
    white-space: pre;
    overflow-x: auto;
    border: 1px solid #ddd;
  }
  
  .controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 30px;
  }
  
  .control-button {
    padding: 10px 15px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .control-button:hover:not(:disabled) {
    background-color: #3a70b2;
  }
  
  .control-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .control-button.start {
    background-color: #4caf50;
  }
  
  .control-button.start:hover:not(:disabled) {
    background-color: #3c8c40;
  }
  
  .control-button.reset {
    background-color: #f44336;
  }
  
  .control-button.reset:hover:not(:disabled) {
    background-color: #d32f2f;
  }
  
  .event-loop-visualization {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .code-execution {
    display: flex;
    gap: 20px;
  }
  
  .code-container, .output-container {
    flex: 1;
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    font-family: 'Courier New', monospace;
    min-height: 200px;
  }
  
  .code-line {
    padding: 5px;
    margin: 2px 0;
    border-radius: 3px;
    transition: background-color 0.3s;
  }
  
  .code-line.active {
    background-color: #ffeb3b;
    font-weight: bold;
  }
  
  .output-line {
    padding: 5px;
    margin: 2px 0;
  }
  
  .loop-components {
    display: flex;
    gap: 20px;
  }
  
  .call-stack-container, .queues-container {
    flex: 1;
  }
  
  .queues-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .call-stack, .queue {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    min-height: 150px;
    font-family: 'Courier New', monospace;
  }
  
  .call-stack {
    display: flex;
    flex-direction: column-reverse; /* Стек растет снизу вверх */
  }
  
  .stack-item, .queue-item {
    background-color: #e3f2fd;
    padding: 8px;
    margin: 5px 0;
    border-radius: 3px;
    border-left: 3px solid #2196f3;
    transition: all 0.3s;
  }
  
  .empty-queue {
    color: #999;
    font-style: italic;
    padding: 8px;
  }
  
  .step-explanation {
    background-color: #f5f5f5;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 30px;
    border-left: 5px solid #4a90e2;
  }
  
  .explanation-content {
    line-height: 1.6;
  }
  
  .theory-section {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
    margin-top: 30px;
  }
  
  .theory-section p, .theory-section li {
    line-height: 1.6;
    margin-bottom: 10px;
  }
  
  @media (max-width: 768px) {
    .code-execution, .loop-components {
      flex-direction: column;
    }
    
    .controls {
      flex-wrap: wrap;
    }
  }
  </style>