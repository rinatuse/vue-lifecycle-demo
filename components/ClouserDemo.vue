<template>
    <div class="closure-explorer">
      <h1>Понимание замыканий в JavaScript</h1>
      <div class="problem-container">
        <h2>Проблема: Захват значений в замыканиях</h2>
        
        <div class="code-section">
          <h3>Исходный код с ошибкой</h3>
          <pre class="code-block">function createIncrement() {
    let count = 0;
  
    function increment() {
      count++;
    }
  
    let message = `Count is ${count}`;
  
    function log() {
      console.log(message);
    }
  
    return [increment, log];
  }
  
  const [increment, log] = createIncrement();
  increment();
  increment();
  increment();
  log(); // что выведет? "Count is 0"</pre>
        </div>
        
        <div class="explanation">
          <p><strong>Что происходит?</strong> Несмотря на то, что мы вызвали <code>increment()</code> 3 раза и ожидаем увидеть "Count is 3", 
             консоль показывает "Count is 0". Почему?</p>
        </div>
        
        <div class="animation-section">
          <h3>Визуализация проблемы</h3>
          <div class="animation-container">
            <div class="memory-model" :class="{ 'step-2': step >= 2, 'step-3': step >= 3, 'step-4': step >= 4 }">
              <div class="function-scope">
                <div class="scope-label">createIncrement() - Область видимости</div>
                <div class="variable-container">
                  <div class="variable">
                    <span class="var-name">count:</span>
                    <span class="var-value" :class="{ 'highlight': highlightCount }">{{ countValue }}</span>
                  </div>
                  <div class="variable">
                    <span class="var-name">message:</span>
                    <span class="var-value" :class="{ 'highlight': highlightMessage }">{{ messageValue }}</span>
                  </div>
                  <div class="functions">
                    <div class="function-item">increment() { count++; }</div>
                    <div class="function-item">log() { console.log(message); }</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="execution-steps">
              <div class="step-buttons">
                <button @click="resetDemo">Сбросить</button>
                <button @click="nextStep" :disabled="step >= maxSteps">Следующий шаг</button>
              </div>
              
              <div class="step-explanation">
                <div v-if="step === 0">
                  <h4>Исходное состояние</h4>
                  <p>При вызове <code>createIncrement()</code> создается область видимости с переменными и функциями.</p>
                  <p><code>count</code> инициализируется значением 0.</p>
                  <p><code>message</code> создается со значением "Count is 0".</p>
                </div>
                
                <div v-if="step === 1">
                  <h4>Вызов increment() #1</h4>
                  <p>Вызывается функция <code>increment()</code>, которая увеличивает <code>count</code> на 1.</p>
                  <p>Теперь <code>count = 1</code>, но <code>message</code> остается прежним: "Count is 0".</p>
                </div>
                
                <div v-if="step === 2">
                  <h4>Вызов increment() #2</h4>
                  <p>Ещё раз вызывается <code>increment()</code>, <code>count</code> увеличивается до 2.</p>
                  <p><code>message</code> всё ещё "Count is 0", так как оно не обновляется автоматически.</p>
                </div>
                
                <div v-if="step === 3">
                  <h4>Вызов increment() #3</h4>
                  <p>Третий вызов <code>increment()</code>, <code>count</code> становится равным 3.</p>
                  <p><code>message</code> не изменилось, оно всё ещё "Count is 0".</p>
                </div>
                
                <div v-if="step === 4">
                  <h4>Вызов log()</h4>
                  <p>Функция <code>log()</code> выводит значение <code>message</code>, которое всё ещё "Count is 0".</p>
                  <p><strong>Ключевая проблема:</strong> <code>message</code> было создано один раз при инициализации и содержит захваченное 
                     начальное значение <code>count</code>, которое равно 0.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="solution-section">
          <h3>Решение проблемы</h3>
          <pre class="code-block">function createIncrement() {
    let count = 0;
  
    function increment() {
      count++;
    }
  
    function log() {
      let message = `Count is ${count}`; // перенесли создание message внутрь функции
      console.log(message);
    }
    
    return [increment, log];
  }
  
  const [increment, log] = createIncrement();
  increment();
  increment();
  increment();
  log(); // Теперь выведет: "Count is 3"</pre>
          
          <div class="explanation">
            <p><strong>Исправление:</strong> Мы перенесли создание переменной <code>message</code> внутрь функции <code>log()</code>.</p>
            <p>Теперь каждый раз при вызове <code>log()</code> создается новая строка <code>message</code> с текущим значением <code>count</code>.</p>
          </div>
        </div>
        
        <div class="animation-section">
          <h3>Визуализация решения</h3>
          <div class="animation-container">
            <div class="memory-model" :class="{ 'step-2': solutionStep >= 2, 'step-3': solutionStep >= 3, 'step-4': solutionStep >= 4 }">
              <div class="function-scope">
                <div class="scope-label">createIncrement() - Область видимости</div>
                <div class="variable-container">
                  <div class="variable">
                    <span class="var-name">count:</span>
                    <span class="var-value" :class="{ 'highlight': solutionHighlightCount }">{{ solutionCountValue }}</span>
                  </div>
                  <div class="functions">
                    <div class="function-item">increment() { count++; }</div>
                    <div class="function-item">log() { 
                      <div :class="{ 'highlight-block': solutionHighlightMessage }">
                        let message = `Count is ${count}`; 
                        console.log(message);
                      </div>
                    }</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="execution-steps">
              <div class="step-buttons">
                <button @click="resetSolutionDemo">Сбросить</button>
                <button @click="nextSolutionStep" :disabled="solutionStep >= maxSolutionSteps">Следующий шаг</button>
              </div>
              
              <div class="step-explanation">
                <div v-if="solutionStep === 0">
                  <h4>Исходное состояние</h4>
                  <p>Вызывается <code>createIncrement()</code>, создается область видимости.</p>
                  <p><code>count</code> инициализируется значением 0.</p>
                  <p>Обратите внимание, что <code>message</code> теперь не создаётся при инициализации.</p>
                </div>
                
                <div v-if="solutionStep === 1">
                  <h4>Вызов increment() #1</h4>
                  <p>Вызывается функция <code>increment()</code>, увеличивая <code>count</code> до 1.</p>
                </div>
                
                <div v-if="solutionStep === 2">
                  <h4>Вызов increment() #2</h4>
                  <p><code>count</code> увеличивается до 2.</p>
                </div>
                
                <div v-if="solutionStep === 3">
                  <h4>Вызов increment() #3</h4>
                  <p><code>count</code> увеличивается до 3.</p>
                </div>
                
                <div v-if="solutionStep === 4">
                  <h4>Вызов log()</h4>
                  <p>Функция <code>log()</code> создаёт переменную <code>message</code> с текущим значением <code>count</code>.</p>
                  <p>Теперь <code>message</code> содержит строку "Count is 3".</p>
                  <p>Функция корректно выводит актуальное значение: "Count is 3".</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="explanation-section">
          <h3>Ключевые выводы и подводные камни</h3>
          <ul>
            <li>
              <strong>Замыкания захватывают переменные, а не их значения в момент создания.</strong> 
              В нашем случае, функция <code>log()</code> имеет доступ к переменной <code>count</code>, а не к её значению.
            </li>
            <li>
              <strong>Но!</strong> Переменная <code>message</code> создавалась один раз при инициализации 
              и содержала захваченное значение <code>count</code> на момент инициализации.
            </li>
            <li>
              <strong>Решение:</strong> Если нужно получать актуальные данные, вычисляйте их в момент вызова функции, 
              а не в момент создания замыкания.
            </li>
            <li>
              <strong>Типичная ошибка:</strong> Создание переменных с вычисляемыми значениями в момент создания замыкания 
              вместо их вычисления в момент вызова.
            </li>
          </ul>
        </div>
        
        <div class="practical-applications">
          <h3>Практическое применение</h3>
          <div class="application-card">
            <h4>1. Обработчики событий</h4>
            <p>Если вы создаете обработчики событий в цикле, аналогичная проблема может возникнуть:</p>
            <pre class="code-block">// Плохо:
  for (var i = 0; i &lt; 3; i++) {
    const button = document.createElement('button');
    button.textContent = 'Кнопка ' + i;
    button.addEventListener('click', function() {
      alert('Нажата кнопка ' + i); // всегда покажет "Нажата кнопка 3"
    });
    document.body.appendChild(button);
  }
  
  // Хорошо:
  for (var i = 0; i &lt; 3; i++) {
    const button = document.createElement('button');
    button.textContent = 'Кнопка ' + i;
    button.addEventListener('click', function(capturedI) {
      return function() {
        alert('Нажата кнопка ' + capturedI);
      };
    }(i)); // Немедленно вызываем функцию и передаем i
    document.body.appendChild(button);
  }</pre>
          </div>
          
          <div class="application-card">
            <h4>2. Создание менеджеров состояний</h4>
            <p>При создании простых менеджеров состояний (как в React/Vue), нужно следить за актуальностью данных:</p>
            <pre class="code-block">function createCounter() {
    let count = 0;
    
    return {
      increment() {
        count++;
      },
      getCount() {
        return count; // Возвращаем текущее значение при вызове
      },
      getStatus() {
        return `Current count: ${count}`; // Формируем строку с актуальным значением
      }
    };
  }</pre>
          </div>
          
          <div class="application-card">
            <h4>3. Асинхронные операции</h4>
            <p>Особенно важно учитывать эту особенность при работе с асинхронными операциями:</p>
            <pre class="code-block">// Плохо:
  function startProcess() {
    let status = 'starting';
    let message = `Process is ${status}`;
    
    setTimeout(() => {
      status = 'completed';
      console.log(message); // Выведет "Process is starting"
    }, 1000);
  }
  
  // Хорошо:
  function startProcess() {
    let status = 'starting';
    
    setTimeout(() => {
      status = 'completed';
      let message = `Process is ${status}`;
      console.log(message); // Выведет "Process is completed"
    }, 1000);
  }</pre>
          </div>
        </div>
        
        <div class="conclusion-section">
          <h3>Заключение</h3>
          <p>Замыкания в JavaScript – мощный механизм, но требующий внимательного обращения. Ключевые моменты:</p>
          <ul>
            <li>Замыкания захватывают переменные, не их значения</li>
            <li>Строки и другие примитивы, созданные при инициализации замыкания, не обновляются автоматически</li>
            <li>Для получения актуальных данных вычисляйте их в момент вызова функции</li>
            <li>Будьте особенно внимательны при работе с циклами и асинхронными операциями</li>
          </ul>
          <p>Понимание этих принципов поможет избежать распространенных ошибок и писать более предсказуемый код.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Данные для анимации проблемы
        step: 0,
        maxSteps: 4,
        countValue: 0,
        messageValue: "Count is 0",
        highlightCount: false,
        highlightMessage: false,
        
        // Данные для анимации решения
        solutionStep: 0,
        maxSolutionSteps: 4,
        solutionCountValue: 0,
        solutionHighlightCount: false,
        solutionHighlightMessage: false
      }
    },
    methods: {
      // Методы для анимации проблемы
      nextStep() {
        if (this.step < this.maxSteps) {
          this.step++;
          
          // Подсветка изменений
          this.highlightCount = false;
          this.highlightMessage = false;
          
          // Логика для каждого шага
          if (this.step === 1) {
            this.countValue = 1;
            this.highlightCount = true;
          } else if (this.step === 2) {
            this.countValue = 2;
            this.highlightCount = true;
          } else if (this.step === 3) {
            this.countValue = 3;
            this.highlightCount = true;
          } else if (this.step === 4) {
            this.highlightMessage = true;
          }
        }
      },
      resetDemo() {
        this.step = 0;
        this.countValue = 0;
        this.messageValue = "Count is 0";
        this.highlightCount = false;
        this.highlightMessage = false;
      },
      
      // Методы для анимации решения
      nextSolutionStep() {
        if (this.solutionStep < this.maxSolutionSteps) {
          this.solutionStep++;
          
          // Сбрасываем подсветку
          this.solutionHighlightCount = false;
          this.solutionHighlightMessage = false;
          
          // Логика для каждого шага
          if (this.solutionStep === 1) {
            this.solutionCountValue = 1;
            this.solutionHighlightCount = true;
          } else if (this.solutionStep === 2) {
            this.solutionCountValue = 2;
            this.solutionHighlightCount = true;
          } else if (this.solutionStep === 3) {
            this.solutionCountValue = 3;
            this.solutionHighlightCount = true;
          } else if (this.solutionStep === 4) {
            this.solutionHighlightMessage = true;
          }
        }
      },
      resetSolutionDemo() {
        this.solutionStep = 0;
        this.solutionCountValue = 0;
        this.solutionHighlightCount = false;
        this.solutionHighlightMessage = false;
      }
    }
  }
  </script>
  
  <style>
  .closure-explorer {
    font-family: Arial, sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    color: black;
  }
  
  h1, h2, h3, h4 {
    color: #333;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .problem-container {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .code-block {
    background-color: #f5f5f5;
    color: black;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: monospace;
    line-height: 1.5;
    margin: 15px 0;
    border: 1px solid #ddd;
  }
  
  .explanation {
    margin: 15px 0;
    line-height: 1.6;
  }
  
  .animation-section {
    margin: 30px 0;
  }
  
  .animation-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #eee;
  }
  
  .memory-model {
    margin-bottom: 20px;
    transition: all 0.5s ease;
  }
  
  .function-scope {
    border: 2px solid #3498db;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .scope-label {
    background-color: #3498db;
    color: white;
    padding: 8px 12px;
    font-weight: bold;
  }
  
  .variable-container {
    padding: 15px;
    background-color: white;
  }
  
  .variable {
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 4px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
  }
  
  .var-name {
    font-weight: bold;
    color: #333;
  }
  
  .var-value {
    color: #e74c3c;
    transition: all 0.3s ease;
  }
  
  .functions {
    margin-top: 15px;
    border-top: 1px solid #eee;
    padding-top: 15px;
  }
  
  .function-item {
    padding: 8px;
    background-color: #f5f5f5;
    border-radius: 4px;
    margin-bottom: 8px;
    font-family: monospace;
  }
  
  .highlight {
    background-color: #ffe9a8;
    padding: 2px 5px;
    border-radius: 3px;
    font-weight: bold;
    animation: pulse 1s ease-in-out;
  }
  
  .highlight-block {
    background-color: #ffe9a8;
    padding: 5px;
    border-radius: 3px;
    animation: pulse 1s ease-in-out;
  }
  
  @keyframes pulse {
    0% { background-color: #ffe9a8; }
    50% { background-color: #ffd166; }
    100% { background-color: #ffe9a8; }
  }
  
  .execution-steps {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 15px;
  }
  
  .step-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .step-buttons button {
    padding: 8px 16px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .step-buttons button:hover {
    background-color: #2980b9;
  }
  
  .step-buttons button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .step-explanation {
    min-height: 150px;
    line-height: 1.6;
  }
  
  .solution-section {
    margin: 30px 0;
    border-top: 2px solid #ddd;
    padding-top: 20px;
  }
  
  .explanation-section {
    margin: 30px 0;
  }
  
  .explanation-section ul {
    list-style-type: disc;
    padding-left: 20px;
    line-height: 1.6;
  }
  
  .practical-applications {
    margin: 30px 0;
  }
  
  .application-card {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .application-card h4 {
    color: #2c3e50;
    margin-top: 0;
  }
  
  .conclusion-section {
    background-color: #f0f8ff;
    border-radius: 8px;
    padding: 20px;
    margin-top: 30px;
  }
  
  .conclusion-section ul {
    list-style-type: disc;
    padding-left: 20px;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    .animation-container {
      flex-direction: column;
    }
    
    .code-block {
      font-size: 14px;
    }
  }
  </style>