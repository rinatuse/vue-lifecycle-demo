<template>
    <div class="event-loop-container">
      <h1 class="main-title">Event Loop в JavaScript: Визуальное объяснение</h1>
      
      <div class="code-section">
        <h2>Исходный код</h2>
        <pre class="code-block">
  setTimeout(function timeout() {
    console.log("Таймаут");
  }, 0);
  
  let p = new Promise(function (resolve, reject) {
    console.log("Создание промиса");
    resolve();
  });
  
  p.then(function () {
    console.log("Обработка промиса");
  });
  
  console.log("Конец скрипта");
        </pre>
      </div>
  
      <div class="output-section">
        <h2>Порядок вывода в консоль</h2>
        <div class="output-list">
          <div class="output-item" :class="{ active: activeStep >= 1 }">1. "Создание промиса"</div>
          <div class="output-item" :class="{ active: activeStep >= 2 }">2. "Конец скрипта"</div>
          <div class="output-item" :class="{ active: activeStep >= 3 }">3. "Обработка промиса"</div>
          <div class="output-item" :class="{ active: activeStep >= 4 }">4. "Таймаут"</div>
        </div>
      </div>
  
      <div class="explanation-section">
        <h2>Почему такой порядок выполнения?</h2>
        <p>
          Для понимания этого порядка необходимо разобраться с тем, как работает Event Loop в JavaScript:
        </p>
        <ol>
          <li>JavaScript - однопоточный язык с асинхронными возможностями</li>
          <li>Все операции выполняются через Event Loop (цикл событий)</li>
          <li>Event Loop имеет несколько очередей задач разных приоритетов</li>
        </ol>
      </div>
  
      <div class="animation-section">
        <h2>Визуализация Event Loop</h2>
        
        <div class="animation-controls">
          <button @click="startAnimation" :disabled="isAnimating || activeStep > 0">
            Запустить анимацию
          </button>
          <button @click="resetAnimation" :disabled="isAnimating || activeStep === 0">
            Сбросить
          </button>
          <button @click="nextStep" :disabled="isAnimating || activeStep >= maxSteps">
            Шаг вперед
          </button>
        </div>
        
        <div class="event-loop-visualization">
          <div class="call-stack-container">
            <h3>Call Stack</h3>
            <div class="call-stack">
              <div v-for="(item, index) in callStack" :key="`stack-${index}`" class="stack-item">
                {{ item }}
              </div>
            </div>
          </div>
          
          <div class="event-loop-arrow" :class="{ active: loopActive }">
            <div class="arrow-body"></div>
            <div class="arrow-head"></div>
          </div>
          
          <div class="queues-container">
            <div class="queue-wrapper">
              <h3>Микрозадачи (Promise)</h3>
              <div class="task-queue micro-queue">
                <div v-for="(item, index) in microTaskQueue" :key="`micro-${index}`" class="queue-item micro-task">
                  {{ item }}
                </div>
              </div>
            </div>
            
            <div class="queue-wrapper">
              <h3>Макрозадачи (setTimeout)</h3>
              <div class="task-queue macro-queue">
                <div v-for="(item, index) in macroTaskQueue" :key="`macro-${index}`" class="queue-item macro-task">
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="execution-log">
          <h3>Лог выполнения</h3>
          <div class="log-entries">
            <div v-for="(log, index) in executionLog" :key="`log-${index}`" class="log-entry">
              <span class="log-step">Шаг {{ log.step }}:</span> {{ log.message }}
            </div>
          </div>
        </div>
        
        <div class="step-explanation" v-if="activeStep > 0">
          <h3>Объяснение текущего шага</h3>
          <div class="step-content">
            {{ stepExplanations[activeStep - 1] }}
          </div>
        </div>
      </div>
  
      <div class="algorithm-section">
        <h2>Алгоритм работы Event Loop</h2>
        <ol>
          <li>Выполнить весь синхронный код скрипта с начала до конца</li>
          <li>Проверить очередь микрозадач (microtask queue):
            <ul>
              <li>Если есть задачи, выполнить их по порядку</li>
              <li>Новые микрозадачи, добавленные во время выполнения, также обрабатываются в этом цикле</li>
            </ul>
          </li>
          <li>Проверить очередь макрозадач (macrotask queue):
            <ul>
              <li>Выбрать и выполнить ОДНУ задачу</li>
              <li>Вернуться к шагу 2 (снова проверить микрозадачи)</li>
            </ul>
          </li>
          <li>Повторять шаги 2-3 в бесконечном цикле</li>
        </ol>
      </div>
  
      <div class="task-types-section">
        <h2>Типы задач в JavaScript</h2>
        
        <div class="task-types">
          <div class="task-type">
            <h3>Микрозадачи (Microtasks)</h3>
            <ul>
              <li>Promise.then(), Promise.catch(), Promise.finally()</li>
              <li>queueMicrotask()</li>
              <li>MutationObserver</li>
              <li>process.nextTick() (в Node.js)</li>
            </ul>
            <div class="priority-tag high-priority">Высокий приоритет</div>
          </div>
          
          <div class="task-type">
            <h3>Макрозадачи (Macrotasks)</h3>
            <ul>
              <li>setTimeout(), setInterval()</li>
              <li>requestAnimationFrame()</li>
              <li>I/O операции</li>
              <li>UI рендеринг</li>
              <li>Обработчики событий (click, keydown и т.д.)</li>
            </ul>
            <div class="priority-tag low-priority">Низкий приоритет</div>
          </div>
        </div>
      </div>
  
      <div class="pitfalls-section">
        <h2>Подводные камни и распространенные ошибки</h2>
        
        <div class="pitfall">
          <h3>setTimeout(fn, 0) ≠ Немедленное выполнение</h3>
          <p>
            Многие разработчики ошибочно полагают, что <code>setTimeout</code> с задержкой 0 выполнится сразу после текущего кода. 
            На самом деле, задача попадает в очередь макрозадач и будет выполнена только после обработки всех микрозадач.
          </p>
          <div class="code-example">
            <pre>
  setTimeout(() => console.log('setTimeout'), 0);
  Promise.resolve().then(() => console.log('Promise'));
  console.log('Sync');
  
  // Вывод:
  // Sync
  // Promise
  // setTimeout
            </pre>
          </div>
        </div>
        
        <div class="pitfall">
          <h3>Вложенные промисы и микрозадачи</h3>
          <p>
            Каждый обработчик .then() создает отдельную микрозадачу. Вложенные промисы выполняются в порядке их создания, 
            что может привести к непредсказуемым результатам при сложной цепочке промисов.
          </p>
        </div>
        
        <div class="pitfall">
          <h3>Блокировка Event Loop</h3>
          <p>
            Тяжелые синхронные операции могут заблокировать Event Loop, что приведет к "зависанию" приложения. 
            Всегда разбивайте тяжелые вычисления на части и используйте асинхронные подходы.
          </p>
        </div>
      </div>
  
      <div class="practical-uses-section">
        <h2>Практическое применение знаний о Event Loop</h2>
        
        <div class="use-case">
          <h3>Оптимизация производительности UI</h3>
          <p>
            Понимание Event Loop помогает разработчикам создавать интерфейсы, которые не блокируют отрисовку и взаимодействие с пользователем.
            Тяжелые операции можно разбить на части с помощью микрозадач или макрозадач, чтобы браузер мог обрабатывать события рендеринга.
          </p>
        </div>
        
        <div class="use-case">
          <h3>Управление порядком выполнения асинхронных операций</h3>
          <p>
            Зная разницу между микрозадачами и макрозадачами, вы можете контролировать порядок выполнения кода:
            <ul>
              <li><code>Promise.then()</code> для операций, которые должны выполниться до следующего тика</li>
              <li><code>setTimeout(fn, 0)</code> для операций, которые могут подождать</li>
            </ul>
          </p>
        </div>
        
        <div class="use-case">
          <h3>Отладка асинхронного кода</h3>
          <p>
            Понимание Event Loop помогает отлаживать сложный асинхронный код, предсказывать порядок выполнения и находить причины гонок состояний (race conditions).
          </p>
        </div>
        
        <div class="use-case">
          <h3>Node.js серверы и обработка запросов</h3>
          <p>
            В Node.js Event Loop играет ключевую роль в обработке HTTP-запросов и операций ввода-вывода.
            Понимание его работы помогает оптимизировать серверный код и избежать блокировок.
          </p>
        </div>
      </div>
  
      <div class="conclusion-section">
        <h2>Заключение</h2>
        <p>
          Event Loop - это фундаментальный механизм JavaScript, который обеспечивает асинхронное выполнение кода в однопоточной среде. 
          Понимание принципов его работы и различий между микрозадачами и макрозадачами позволяет писать более эффективный, 
          предсказуемый и отзывчивый код.
        </p>
        <p>
          В нашем примере порядок вывода следующий:
        </p>
        <ol>
          <li>"Создание промиса" (синхронный код внутри конструктора Promise)</li>
          <li>"Конец скрипта" (синхронный код в основном потоке)</li>
          <li>"Обработка промиса" (микрозадача из Promise.then)</li>
          <li>"Таймаут" (макрозадача из setTimeout)</li>
        </ol>
        <p>
          Этот порядок полностью соответствует алгоритму работы Event Loop: сначала весь синхронный код, 
          затем все микрозадачи, и только потом первая макрозадача.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isAnimating: false,
        activeStep: 0,
        maxSteps: 7,
        loopActive: false,
        
        callStack: [],
        microTaskQueue: [],
        macroTaskQueue: [],
        executionLog: [],
        
        stepExplanations: [
          "Скрипт начинает выполнение. Видим вызов setTimeout, который регистрирует макрозадачу в Web API и добавляет её в очередь макрозадач.",
          "Далее мы создаём промис. Конструктор Promise выполняется синхронно и сразу же печатает 'Создание промиса'. Вызов resolve() помечает промис как выполненный.",
          "Мы регистрируем обработчик then для промиса. Так как промис уже выполнен, обработчик добавляется в очередь микрозадач.",
          "Выполняется последняя строчка кода, которая выводит 'Конец скрипта'. На этом синхронное выполнение основного скрипта завершается.",
          "Event Loop проверяет наличие микрозадач. Находит обработчик then и выполняет его, что приводит к выводу 'Обработка промиса'.",
          "После обработки всех микрозадач, Event Loop переходит к очереди макрозадач. Находит единственную макрозадачу - наш setTimeout.",
          "Event Loop выполняет макрозадачу, что приводит к выводу 'Таймаут'. Все задачи выполнены, Event Loop продолжает ждать новые задачи."
        ]
      };
    },
    
    methods: {
      async startAnimation() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.resetAnimation();
        
        for (let i = 1; i <= this.maxSteps; i++) {
          this.activeStep = i;
          this.updateAnimationState(i);
          await new Promise(resolve => setTimeout(resolve, 2000)); // Задержка между шагами
        }
        
        this.isAnimating = false;
      },
      
      resetAnimation() {
        this.activeStep = 0;
        this.loopActive = false;
        this.callStack = [];
        this.microTaskQueue = [];
        this.macroTaskQueue = [];
        this.executionLog = [];
      },
      
      nextStep() {
        if (this.activeStep >= this.maxSteps) return;
        
        this.activeStep++;
        this.updateAnimationState(this.activeStep);
      },
      
      updateAnimationState(step) {
        switch(step) {
          case 1:
            this.callStack = ["Main()"];
            this.macroTaskQueue = ["setTimeout callback"];
            this.executionLog.push({
              step: 1,
              message: "setTimeout(0) регистрирует макрозадачу"
            });
            break;
          case 2:
            this.callStack = ["Main()", "Promise constructor"];
            this.executionLog.push({
              step: 2,
              message: "Выполняется конструктор Promise -> 'Создание промиса'"
            });
            break;
          case 3:
            this.callStack = ["Main()"];
            this.microTaskQueue = ["Promise.then callback"];
            this.executionLog.push({
              step: 3,
              message: "Регистрируется обработчик then() как микрозадача"
            });
            break;
          case 4:
            this.callStack = ["Main()"];
            this.executionLog.push({
              step: 4,
              message: "Выполняется последняя строка кода -> 'Конец скрипта'"
            });
            break;
          case 5:
            this.callStack = ["Promise.then callback"];
            this.microTaskQueue = [];
            this.loopActive = true;
            this.executionLog.push({
              step: 5,
              message: "Event Loop обрабатывает микрозадачу -> 'Обработка промиса'"
            });
            break;
          case 6:
            this.callStack = [];
            this.executionLog.push({
              step: 6,
              message: "Event Loop проверяет очередь макрозадач"
            });
            break;
          case 7:
            this.callStack = ["setTimeout callback"];
            this.macroTaskQueue = [];
            this.executionLog.push({
              step: 7,
              message: "Event Loop обрабатывает макрозадачу -> 'Таймаут'"
            });
            break;
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .event-loop-container {
    font-family: Arial, sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    color: black;
  }
  
  .main-title {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
    font-size: 28px;
  }
  
  h2 {
    color: #333;
    margin-top: 30px;
    margin-bottom: 15px;
    font-size: 22px;
    border-bottom: 2px solid #eee;
    padding-bottom: 8px;
  }
  
  h3 {
    color: #444;
    margin-top: 20px;
    font-size: 18px;
  }
  
  /* Секция с кодом */
  .code-section {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 25px;
  }
  
  .code-block {
    background-color: #282c34;
    color: #abb2bf;
    padding: 15px;
    border-radius: 6px;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    white-space: pre;
    overflow-x: auto;
    font-size: 14px;
    line-height: 1.5;
  }
  
  /* Секция вывода */
  .output-section {
    margin-bottom: 25px;
  }
  
  .output-list {
    background-color: #f0f0f0;
    padding: 15px;
    border-radius: 6px;
  }
  
  .output-item {
    padding: 8px 12px;
    margin-bottom: 8px;
    background-color: #e0e0e0;
    border-radius: 4px;
    opacity: 0.7;
    transition: all 0.3s ease;
  }
  
  .output-item.active {
    background-color: #4caf50;
    color: white;
    opacity: 1;
    font-weight: bold;
  }
  
  /* Секция с анимацией */
  .animation-section {
    margin: 30px 0;
  }
  
  .animation-controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .animation-controls button {
    padding: 10px 15px;
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .animation-controls button:hover:not(:disabled) {
    background-color: #3367d6;
  }
  
  .animation-controls button:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
  
  .event-loop-visualization {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    min-height: 300px;
  }
  
  .call-stack-container, .queues-container {
    flex: 1;
  }
  
  .call-stack {
    background-color: white;
    border: 2px solid #ff9800;
    border-radius: 6px;
    padding: 10px;
    min-height: 200px;
    display: flex;
    flex-direction: column-reverse; /* Стек растет снизу вверх */
  }
  
  .stack-item {
    background-color: #fff3e0;
    border: 1px solid #ffcc80;
    border-radius: 4px;
    padding: 8px 12px;
    margin-bottom: 6px;
    text-align: center;
    animation: fadeIn 0.5s ease;
  }
  
  .queues-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .queue-wrapper {
    flex: 1;
  }
  
  .task-queue {
    background-color: white;
    border-radius: 6px;
    padding: 10px;
    min-height: 60px;
    display: flex;
    align-items: center;
  }
  
  .micro-queue {
    border: 2px solid #4caf50;
  }
  
  .macro-queue {
    border: 2px solid #2196f3;
  }
  
  .queue-item {
    padding: 8px 12px;
    border-radius: 4px;
    margin-right: 6px;
    text-align: center;
    animation: fadeIn 0.5s ease;
  }
  
  .micro-task {
    background-color: #e8f5e9;
    border: 1px solid #a5d6a7;
  }
  
  .macro-task {
    background-color: #e3f2fd;
    border: 1px solid #90caf9;
  }
  
  .event-loop-arrow {
    width: 60px;
    height: 180px;
    position: relative;
    margin: 0 20px;
    opacity: 0.5;
    transition: opacity 0.5s ease;
  }
  
  .event-loop-arrow.active {
    opacity: 1;
  }
  
  .arrow-body {
    width: 100%;
    height: 100%;
    border: 6px solid #673ab7;
    border-right: none;
    border-radius: 50% 0 0 50%;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .arrow-head {
    width: 0;
    height: 0;
    border-left: 15px solid #673ab7;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
  
  .execution-log {
    background-color: #fafafa;
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 15px;
    margin-bottom: 20px;
    max-height: 200px;
    overflow-y: auto;
  }
  
  .log-entry {
    margin-bottom: 8px;
    padding: 8px;
    border-bottom: 1px solid #eee;
    animation: fadeIn 0.5s ease;
  }
  
  .log-step {
    font-weight: bold;
    color: #673ab7;
  }
  
  .step-explanation {
    background-color: #e8eaf6;
    border-left: 4px solid #3f51b5;
    padding: 15px;
    border-radius: 4px;
    margin-bottom: 20px;
    animation: fadeIn 0.5s ease;
  }
  
  .step-content {
    line-height: 1.6;
  }
  
  /* Секция с типами задач */
  .task-types {
    display: flex;
    gap: 20px;
    margin-top: 20px;
  }
  
  .task-type {
    flex: 1;
    background-color: #fafafa;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    position: relative;
  }
  
  .priority-tag {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
  }
  
  .high-priority {
    background-color: #e8f5e9;
    color: #2e7d32;
    border: 1px solid #a5d6a7;
  }
  
  .low-priority {
    background-color: #e3f2fd;
    color: #1565c0;
    border: 1px solid #90caf9;
  }
  
  /* Подводные камни */
  .pitfall {
    background-color: #fff8e1;
    border-left: 4px solid #ffc107;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 4px;
  }
  
  .code-example {
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
  }
  
  .code-example pre {
    margin: 0;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    white-space: pre;
    font-size: 14px;
  }
  
  /* Практическое применение */
  .use-case {
    background-color: #f1f8e9;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .use-case h3 {
    color: #33691e;
    margin-top: 0;
  }
  
  .use-case ul {
    margin-top: 10px;
  }
  
  /* Заключение */
  .conclusion-section {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    margin-top: 30px;
  }
  
  .conclusion-section p {
    line-height: 1.6;
  }
  
  .conclusion-section ol {
    margin-left: 20px;
  }
  
  /* Анимации */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Адаптивная верстка */
  @media (max-width: 768px) {
    .event-loop-visualization {
      flex-direction: column;
    }
    
    .event-loop-arrow {
      width: 180px;
      height: 60px;
      margin: 20px 0;
    }
    
    .arrow-body {
      border: 6px solid #673ab7;
      border-bottom: none;
      border-radius: 50% 50% 0 0;
    }
    
    .arrow-head {
      border-top: 15px solid #673ab7;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-bottom: none;
      top: auto;
      bottom: 0;
      right: 50%;
      transform: translateX(50%);
    }
    
    .task-types {
      flex-direction: column;
    }
  }
  </style>