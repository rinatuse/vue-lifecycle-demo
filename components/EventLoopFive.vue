<template>
    <div class="event-loop-explainer">
      <h1>Event Loop в JavaScript: наглядное объяснение</h1>
      
      <div class="code-section">
        <h2>Исходный код</h2>
        <pre class="code-block"><code>setTimeout(() => console.log("setTimeout 1"), 0);
  
  new Promise((resolve, reject) => {
    console.log("Promise 1");
    resolve();
    console.log("Promise 2");
  }).then(() => console.log("Promise 3"));
  
  Promise.resolve().then(() => setTimeout(() => console.log("setTimeout 2"), 0));
  
  Promise.resolve().then(() => console.log("Promise 4"));
  
  setTimeout(() => console.log("setTimeout 3"), 0);
  
  console.log("final");</code></pre>
      </div>
      
      <div class="result-section">
        <h2>Порядок вывода в консоль</h2>
        <div class="console-output">
          <div v-for="(item, index) in consoleOutput" 
              :key="index" 
              class="console-line"
              :class="{ 'sync': item.type === 'sync', 'micro': item.type === 'micro', 'macro': item.type === 'macro' }">
            <div class="execution-order">{{ index + 1 }}</div>
            <div class="console-content">{{ item.text }}</div>
            <div class="execution-type">{{ getExecutionTypeLabel(item.type) }}</div>
          </div>
        </div>
      </div>
  
      <div class="visual-explainer">
        <h2>Визуализация процесса выполнения</h2>
        
        <div class="event-loop-diagram">
          <div class="diagram-container">
            <!-- Главный поток выполнения (синхронный код) -->
            <div class="execution-flow sync-flow">
              <div class="flow-label">1. Синхронный код (Call Stack)</div>
              <div class="flow-content">
                <div class="flow-item">Выполнение глобального кода</div>
                <div class="flow-item highlighted">console.log("Promise 1")</div>
                <div class="flow-item highlighted">console.log("Promise 2")</div>
                <div class="flow-item highlighted">console.log("final")</div>
              </div>
            </div>
            
            <!-- Очередь микрозадач -->
            <div class="execution-flow micro-flow">
              <div class="flow-label">2. Микрозадачи (Promise)</div>
              <div class="flow-content">
                <div class="flow-item highlighted">Promise.then → "Promise 3"</div>
                <div class="flow-item highlighted">Promise.then → "Promise 4"</div>
                <div class="flow-item">Promise.then → setTimeout("setTimeout 2")</div>
              </div>
            </div>
            
            <!-- Очередь макрозадач -->
            <div class="execution-flow macro-flow">
              <div class="flow-label">3. Макрозадачи (setTimeout)</div>
              <div class="flow-content">
                <div class="flow-item highlighted">setTimeout → "setTimeout 1"</div>
                <div class="flow-item highlighted">setTimeout → "setTimeout 3"</div>
                <div class="flow-item highlighted">setTimeout → "setTimeout 2"</div>
              </div>
            </div>
          </div>
          
          <div class="event-loop-explanation">
            <div class="event-loop-icon">⟳</div>
            <div class="loop-description">
              <p><strong>Event Loop</strong> выполняет код в следующем порядке:</p>
              <ol>
                <li>Весь синхронный код из стека вызовов</li>
                <li>Все микрозадачи из очереди</li>
                <li>Одну макрозадачу из очереди</li>
              </ol>
              <p>Затем цикл повторяется, начиная с пункта 2</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="detailed-explanation">
        <h2>Пошаговое объяснение</h2>
        
        <div class="step-explanation">
          <h3>Фаза 1: Выполнение синхронного кода</h3>
          <ol>
            <li>Первый <code>setTimeout</code> регистрируется и его колбэк помещается в очередь макрозадач</li>
            <li>Конструктор <code>Promise</code> выполняется синхронно, поэтому в консоль выводится <code>"Promise 1"</code></li>
            <li>Вызов <code>resolve()</code> ставит колбэк <code>.then</code> в очередь микрозадач</li>
            <li>В консоль выводится <code>"Promise 2"</code></li>
            <li>Второй <code>Promise.resolve()</code> ставит свой колбэк <code>.then</code> в очередь микрозадач</li>
            <li>Третий <code>Promise.resolve()</code> ставит свой колбэк <code>.then</code> в очередь микрозадач</li>
            <li>Второй <code>setTimeout</code> регистрируется и его колбэк помещается в очередь макрозадач</li>
            <li>В консоль выводится <code>"final"</code></li>
          </ol>
        </div>
        
        <div class="step-explanation">
          <h3>Фаза 2: Обработка очереди микрозадач</h3>
          <ol>
            <li>Event Loop проверяет очередь микрозадач и выполняет первую задачу:
              <ul><li>Выполняется колбэк первого <code>.then</code> и в консоль выводится <code>"Promise 3"</code></li></ul>
            </li>
            <li>Затем выполняется вторая микрозадача:
              <ul><li>Колбэк из второго <code>Promise.resolve().then</code> регистрирует новый <code>setTimeout</code> и помещает его в очередь макрозадач</li></ul>
            </li>
            <li>Наконец, выполняется третья микрозадача:
              <ul><li>Колбэк из третьего <code>Promise.resolve().then</code> выводит в консоль <code>"Promise 4"</code></li></ul>
            </li>
          </ol>
        </div>
        
        <div class="step-explanation">
          <h3>Фаза 3: Обработка очереди макрозадач</h3>
          <ol>
            <li>Event Loop берет первую задачу из очереди макрозадач:
              <ul><li>Выполняется колбэк первого <code>setTimeout</code> и в консоль выводится <code>"setTimeout 1"</code></li></ul>
            </li>
            <li>Event Loop проверяет очередь микрозадач, но она пуста</li>
            <li>Event Loop берет следующую задачу из очереди макрозадач:
              <ul><li>Выполняется колбэк второго <code>setTimeout</code> и в консоль выводится <code>"setTimeout 3"</code></li></ul>
            </li>
            <li>Event Loop снова проверяет очередь микрозадач, но она по-прежнему пуста</li>
            <li>Event Loop берет последнюю задачу из очереди макрозадач:
              <ul><li>Выполняется колбэк <code>setTimeout</code>, зарегистрированный внутри Promise и в консоль выводится <code>"setTimeout 2"</code></li></ul>
            </li>
          </ol>
        </div>
      </div>
      
      <div class="summary-section">
        <h2>Итоговый порядок вывода</h2>
        <div class="result-summary">
          <ol>
            <li><code>"Promise 1"</code> - синхронный код в конструкторе Promise</li>
            <li><code>"Promise 2"</code> - синхронный код в конструкторе Promise</li>
            <li><code>"final"</code> - синхронный вызов console.log</li>
            <li><code>"Promise 3"</code> - микрозадача из первого Promise.then</li>
            <li><code>"Promise 4"</code> - микрозадача из третьего Promise.then</li>
            <li><code>"setTimeout 1"</code> - первая макрозадача</li>
            <li><code>"setTimeout 3"</code> - вторая макрозадача</li>
            <li><code>"setTimeout 2"</code> - третья макрозадача (из Promise)</li>
          </ol>
        </div>
      </div>
      
      <div class="applications-section">
        <h2>Практическое применение знаний об Event Loop</h2>
        
        <div class="application-card">
          <h3>1. Оптимизация производительности</h3>
          <p>Разбиение тяжелых вычислений на макрозадачи позволяет не блокировать интерфейс:</p>
          <pre class="code-block"><code>// Обработка большого массива без блокировки UI
  function processArray(array, chunkSize = 1000) {
    let index = 0;
    
    function process() {
      // Обрабатываем часть массива
      const chunk = array.slice(index, index + chunkSize);
      for (const item of chunk) {
        // Тяжелые вычисления...
        processItem(item);
      }
      
      index += chunkSize;
      
      // Если остались элементы, планируем следующую порцию
      if (index &gt; array.length) {
        setTimeout(process, 0); // Позволяем UI обновиться
      }
    }
    
    process();
  }</code></pre>
        </div>
        
        <div class="application-card">
          <h3>2. Приоритизация задач</h3>
          <p>Используйте микрозадачи для высокоприоритетных операций:</p>
          <pre class="code-block"><code>// Высокий приоритет (микрозадача)
  Promise.resolve().then(() => {
    // Критический код, который должен выполниться раньше
    updateCriticalUI();
  });
  
  // Низкий приоритет (макрозадача)
  setTimeout(() => {
    // Некритичные операции
    updateStatistics();
    sendAnalytics();
  }, 0);</code></pre>
        </div>
        
        <div class="pitfalls-section">
          <h3>Подводные камни</h3>
          <ul>
            <li><strong>setTimeout(fn, 0)</strong> - не означает мгновенного выполнения, а лишь минимальную задержку (обычно 4мс)</li>
            <li><strong>Вложенные микрозадачи</strong> - микрозадачи, созданные внутри микрозадач, выполняются в том же цикле</li>
            <li><strong>Разница браузер vs Node.js</strong> - реализации Event Loop немного отличаются</li>
            <li><strong>Блокирование Event Loop</strong> - тяжелые вычисления в синхронном коде могут "подвесить" всё приложение</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        consoleOutput: [
          { text: "Promise 1", type: "sync" },
          { text: "Promise 2", type: "sync" },
          { text: "final", type: "sync" },
          { text: "Promise 3", type: "micro" },
          { text: "Promise 4", type: "micro" },
          { text: "setTimeout 1", type: "macro" },
          { text: "setTimeout 3", type: "macro" },
          { text: "setTimeout 2", type: "macro" }
        ]
      };
    },
    methods: {
      getExecutionTypeLabel(type) {
        switch(type) {
          case "sync": return "Синхронный";
          case "micro": return "Микрозадача";
          case "macro": return "Макрозадача";
          default: return "";
        }
      }
    }
  };
  </script>
  
  <style>
  .event-loop-explainer {
    font-family: 'Arial', sans-serif;
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    color: #000;
  }
  
  h1, h2, h3 {
    color: #000;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .code-section, .result-section, .visual-explainer, 
  .detailed-explanation, .summary-section, 
  .applications-section {
    margin-bottom: 40px;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  /* Секция кода */
  .code-block {
    background-color: #1e1e1e;
    color: #fff;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 14px;
    line-height: 1.5;
    margin: 15px 0;
  }
  
  /* Вывод консоли */
  .console-output {
    background-color: #1e1e1e;
    border-radius: 6px;
    padding: 15px;
    font-family: 'Consolas', 'Monaco', monospace;
    color: #fff;
  }
  
  .console-line {
    display: flex;
    padding: 8px 10px;
    margin-bottom: 5px;
    border-radius: 4px;
    align-items: center;
  }
  
  .console-line.sync {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .console-line.micro {
    background-color: rgba(52, 152, 219, 0.3);
  }
  
  .console-line.macro {
    background-color: rgba(231, 76, 60, 0.3);
  }
  
  .execution-order {
    width: 30px;
    height: 30px;
    background-color: #333;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 15px;
  }
  
  .console-content {
    flex: 1;
  }
  
  .execution-type {
    background-color: #333;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
  }
  
  .console-line.sync .execution-type {
    background-color: #7f8c8d;
  }
  
  .console-line.micro .execution-type {
    background-color: #3498db;
  }
  
  .console-line.macro .execution-type {
    background-color: #e74c3c;
  }
  
  /* Визуальная схема */
  .event-loop-diagram {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .diagram-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .execution-flow {
    border: 1px solid #ddd;
    border-radius: 6px;
    overflow: hidden;
  }
  
  .flow-label {
    padding: 10px;
    font-weight: bold;
    color: #fff;
  }
  
  .sync-flow .flow-label {
    background-color: #7f8c8d;
  }
  
  .micro-flow .flow-label {
    background-color: #3498db;
  }
  
  .macro-flow .flow-label {
    background-color: #e74c3c;
  }
  
  .flow-content {
    padding: 10px;
    background-color: #fff;
  }
  
  .flow-item {
    padding: 8px 12px;
    margin-bottom: 5px;
    border-radius: 4px;
    background-color: #f5f5f5;
    border-left: 3px solid #ddd;
  }
  
  .flow-item.highlighted {
    background-color: #e8f4fc;
    border-left-color: #3498db;
    font-weight: bold;
  }
  
  .event-loop-explanation {
    display: flex;
    align-items: center;
    background-color: #f2f2f2;
    padding: 15px;
    border-radius: 6px;
    gap: 15px;
  }
  
  .event-loop-icon {
    font-size: 36px;
    color: #3498db;
    animation: rotate 2s infinite linear;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .loop-description ol {
    margin: 10px 0;
    padding-left: 25px;
  }
  
  /* Детальное объяснение */
  .step-explanation {
    margin-bottom: 25px;
  }
  
  .step-explanation h3 {
    margin-bottom: 15px;
    padding-bottom: 5px;
    border-bottom: 1px solid #ddd;
  }
  
  .step-explanation ol {
    padding-left: 20px;
  }
  
  .step-explanation li {
    margin-bottom: 10px;
    line-height: 1.5;
  }
  
  .step-explanation ul {
    padding-left: 20px;
    margin-top: 5px;
  }
  
  /* Итоговый результат */
  .result-summary {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 6px;
    border-left: 4px solid #3498db;
  }
  
  .result-summary ol {
    padding-left: 25px;
  }
  
  .result-summary li {
    margin-bottom: 8px;
    line-height: 1.5;
  }
  
  /* Практическое применение */
  .application-card {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 6px;
    margin-bottom: 20px;
    border-left: 4px solid #27ae60;
  }
  
  .application-card h3 {
    margin-top: 0;
    color: #27ae60;
  }
  
  .pitfalls-section {
    background-color: #fff3e0;
    padding: 15px;
    border-radius: 6px;
    border-left: 4px solid #f39c12;
  }
  
  .pitfalls-section h3 {
    margin-top: 0;
    color: #f39c12;
  }
  
  .pitfalls-section ul {
    padding-left: 20px;
  }
  
  .pitfalls-section li {
    margin-bottom: 8px;
    line-height: 1.5;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .event-loop-explanation {
      flex-direction: column;
      text-align: center;
    }
  }
  </style>