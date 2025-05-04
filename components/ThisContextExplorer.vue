<template>
    <div class="this-context-explorer">
      <h1>Понимание контекста <code>this</code> в JavaScript</h1>
      
      <div class="problem-section">
        <h2>Проблема: потеря контекста</h2>
        
        <div class="code-container">
          <pre class="code-display">
  let obj = {
    name: "David",
    getName() {
      console.log(`name is: ${this.name}`);
    },
  };
  
  let fn = obj.getName;
  
  fn();  // Результат: name is: undefined
          </pre>
          
          <div class="explanation">
            <p>При запуске кода будет выведено <code>name is: undefined</code> (в нестрогом режиме) или ошибка в строгом режиме.</p>
            <p><strong>Почему это происходит?</strong> Значение <code>this</code> определяется в момент <em>вызова</em> функции, а не в момент её создания.</p>
          </div>
        </div>
      </div>
      
      <div class="visualization-section">
        <h2>Визуализация проблемы</h2>
        
        <div class="visualization-container">
          <div class="object-display" :class="{ highlighted: objectHighlighted }">
            <div class="object-title">obj</div>
            <div class="object-content">
              <div class="property">
                <span class="property-name">name:</span>
                <span class="property-value">"David"</span>
              </div>
              <div class="property method">
                <span class="property-name">getName:</span>
                <span class="property-value">function() { console.log(`name is: ${this.name}`); }</span>
              </div>
            </div>
          </div>
          
          <div class="execution-flow">
            <div class="execution-step" :class="{ active: step === 1 }">
              <div class="step-number">1</div>
              <div class="step-content">
                <div class="code-snippet">let fn = obj.getName;</div>
                <div class="explanation">
                  Мы сохраняем <strong>ссылку на функцию</strong>, но теряем привязку к объекту!
                </div>
              </div>
            </div>
            
            <div class="execution-step" :class="{ active: step === 2 }">
              <div class="step-number">2</div>
              <div class="step-content">
                <div class="code-snippet">fn();</div>
                <div class="explanation">
                  При вызове функции <code>this</code> указывает на глобальный объект (window)
                </div>
              </div>
            </div>
            
            <div class="execution-step" :class="{ active: step === 3 }">
              <div class="step-number">3</div>
              <div class="step-content">
                <div class="code-snippet">console.log(`name is: ${this.name}`);</div>
                <div class="explanation">
                  <code>this.name</code> ищется в глобальном объекте, где его нет → <code>undefined</code>
                </div>
              </div>
            </div>
          </div>
          
          <div class="this-context" :class="{ 
            'object-context': thisContext === 'object', 
            'window-context': thisContext === 'window',
            'undefined-context': thisContext === 'undefined'
          }">
            <div class="context-label">this =</div>
            <div class="context-value">{{ thisContextDisplay }}</div>
          </div>
        </div>
        
        <div class="controls">
          <button @click="startVisualization" :disabled="animationRunning">Запустить анимацию</button>
          <button @click="resetVisualization" :disabled="!started">Сбросить</button>
        </div>
      </div>
      
      <div class="solutions-section">
        <h2>Решения проблемы</h2>
        
        <div class="solutions-container">
          <div 
            v-for="(solution, index) in solutions" 
            :key="index"
            class="solution-card"
            :class="{ active: activeSolution === index }"
            @click="activeSolution = index"
          >
            <div class="solution-header">
              <div class="solution-number">{{ index + 1 }}</div>
              <h3>{{ solution.title }}</h3>
            </div>
            
            <div class="solution-content">
              <pre class="code-display">{{ solution.code }}</pre>
              <div class="solution-description">
                <p>{{ solution.description }}</p>
                <p class="pros-cons">
                  <strong>Плюсы:</strong> {{ solution.pros }}
                </p>
                <p class="pros-cons">
                  <strong>Минусы:</strong> {{ solution.cons }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="practical-usage">
        <h2>Практическое применение</h2>
        
        <div class="usage-cases">
          <div class="usage-case">
            <h3>Обработчики событий</h3>
            <pre class="code-display">
  class Counter {
    constructor() {
      this.count = 0;
      this.button = document.getElementById('counter');
      
      // НЕПРАВИЛЬНО: потеря контекста
      this.button.addEventListener('click', function() {
        this.count++; // this здесь указывает на button!
      });
      
      // ПРАВИЛЬНО: использование bind
      this.button.addEventListener('click', 
        function() {
          this.count++;
        }.bind(this)
      );
      
      // ИЛИ: использование стрелочной функции
      this.button.addEventListener('click', () => {
        this.count++; // this здесь сохраняет контекст
      });
    }
  }
            </pre>
          </div>
          
          <div class="usage-case">
            <h3>Колбэки в асинхронных функциях</h3>
            <pre class="code-display">
  class DataLoader {
    constructor() {
      this.data = [];
    }
    
    load() {
      // НЕПРАВИЛЬНО: потеря контекста
      setTimeout(function() {
        this.data = [1, 2, 3]; // this здесь window!
      }, 1000);
      
      // ПРАВИЛЬНО: стрелочная функция
      setTimeout(() => {
        this.data = [1, 2, 3]; // this сохраняет контекст
      }, 1000);
    }
  }
            </pre>
          </div>
          
          <div class="usage-case">
            <h3>Работа с промисами и async/await</h3>
            <pre class="code-display">
  class UserService {
    constructor() {
      this.users = [];
    }
    
    async fetchUsers() {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        
        // this здесь сохраняется благодаря тому,
        // что async-функции создаются на основе обычных,
        // не стрелочных функций
        this.users = data;
      } catch (error) {
        console.error('Ошибка загрузки пользователей:', error);
      }
    }
  }
            </pre>
          </div>
        </div>
      </div>
      
      <div class="algorithms-section">
        <h2>Алгоритм определения значения this</h2>
        
        <div class="algorithm-steps">
          <div class="algorithm-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Проверить, вызвана ли функция с new</h3>
              <p>Если функция вызвана с оператором <code>new</code>, то <code>this</code> будет указывать на новый созданный объект.</p>
              <pre class="code-display">const instance = new Constructor();</pre>
            </div>
          </div>
          
          <div class="algorithm-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Проверить, вызвана ли функция с call/apply/bind</h3>
              <p>Если да, то <code>this</code> будет равен первому переданному аргументу этих методов.</p>
              <pre class="code-display">func.call(context, ...args);</pre>
            </div>
          </div>
          
          <div class="algorithm-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Проверить, вызвана ли функция как метод объекта</h3>
              <p>Если функция вызвана как метод объекта (через точку), то <code>this</code> будет указывать на этот объект.</p>
              <pre class="code-display">object.method();</pre>
            </div>
          </div>
          
          <div class="algorithm-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>Проверить, является ли функция стрелочной</h3>
              <p>Стрелочные функции не имеют своего <code>this</code> — они наследуют его из внешнего лексического окружения.</p>
              <pre class="code-display">const arrow = () => { console.log(this); };</pre>
            </div>
          </div>
          
          <div class="algorithm-step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3>Это обычный вызов функции</h3>
              <p>В строгом режиме <code>this</code> будет <code>undefined</code>, в нестрогом — глобальный объект.</p>
              <pre class="code-display">function normalFunc() { console.log(this); }
  normalFunc(); // window или undefined в строгом режиме</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Состояние визуализации
  const step = ref(0);
  const started = ref(false);
  const animationRunning = ref(false);
  const objectHighlighted = ref(false);
  const thisContext = ref('none');
  
  // Вычисляемое значение для отображения контекста this
  const thisContextDisplay = computed(() => {
    switch (thisContext.value) {
      case 'object':
        return 'obj { name: "David", getName: function... }';
      case 'window':
        return 'window (глобальный объект)';
      case 'undefined':
        return 'undefined (в строгом режиме)';
      default:
        return '?';
    }
  });
  
  // Анимация выполнения кода
  function startVisualization() {
    if (animationRunning.value) return;
    
    started.value = true;
    animationRunning.value = true;
    resetVisualization(false);
    
    // Шаг 1: Объект создан и выделен
    objectHighlighted.value = true;
    thisContext.value = 'object';
    
    setTimeout(() => {
      // Шаг 2: Сохранение метода в переменную
      step.value = 1;
      objectHighlighted.value = false;
      
      setTimeout(() => {
        // Шаг 3: Вызов функции
        step.value = 2;
        thisContext.value = 'window';
        
        setTimeout(() => {
          // Шаг 4: Выполнение console.log с undefined
          step.value = 3;
          
          setTimeout(() => {
            animationRunning.value = false;
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  }
  
  // Сброс визуализации
  function resetVisualization(resetStarted = true) {
    step.value = 0;
    objectHighlighted.value = false;
    thisContext.value = 'none';
    if (resetStarted) {
      started.value = false;
    }
  }
  
  // Решения проблемы
  const solutions = [
    {
      title: 'Использование bind()',
      code: `let obj = {
    name: "David",
    getName() {
      console.log(\`name is: \${this.name}\`);
    },
  };
  
  let fn = obj.getName.bind(obj);
  
  fn(); // name is: David`,
      description: 'Метод bind() создаёт новую функцию, которая при вызове устанавливает в качестве контекста this указанное значение.',
      pros: 'Явно указывает привязку this, работает везде, не требует изменения оригинальной функции.',
      cons: 'Создаёт новую функцию, что менее эффективно по памяти при частом использовании.'
    },
    {
      title: 'Использование call() или apply()',
      code: `let obj = {
    name: "David",
    getName() {
      console.log(\`name is: \${this.name}\`);
    },
  };
  
  // С методом call
  obj.getName.call(obj); // name is: David
  
  // Или с методом apply
  obj.getName.apply(obj); // name is: David`,
      description: 'Методы call() и apply() позволяют вызвать функцию с явно указанным контекстом this и аргументами.',
      pros: 'Прямой вызов без создания новой функции, можно передать аргументы.',
      cons: 'Надо вызывать каждый раз с call/apply, не подходит для случаев, когда функция передаётся как колбэк.'
    },
    {
      title: 'Использование стрелочных функций',
      code: `let obj = {
    name: "David",
    // Использование стрелочной функции
    getName: () => {
      // Внимание: this здесь НЕ будет указывать на obj!
      console.log(\`name is: \${this.name}\`);
    }
  };
  
  // ИЛИ сохранение this во внешней переменной
  let obj2 = {
    name: "David",
    getName() {
      // Сохраняем this в переменную
      const self = this;
      
      // Используем стрелочную функцию, которая 
      // замкнёт внешний this в переменной self
      setTimeout(() => {
        console.log(\`name is: \${self.name}\`);
      }, 1000);
    }
  };`,
      description: 'Стрелочные функции не имеют своего this и используют значение из окружающего лексического контекста.',
      pros: 'Автоматически сохраняет контекст, очень удобно для колбэков и обработчиков событий.',
      cons: 'Не подходит для методов объектов, так как this будет указывать на лексическое окружение, где объект был создан, а не на сам объект.'
    },
    {
      title: 'Использование прямого вызова через объект',
      code: `let obj = {
    name: "David",
    getName() {
      console.log(\`name is: \${this.name}\`);
    },
  };
  
  // Вызовите метод напрямую через объект
  obj.getName(); // name is: David
  
  // Если нужно передать как колбэк, используйте
  // стрелочную функцию-обёртку
  setTimeout(() => obj.getName(), 1000);`,
      description: 'Самый прямолинейный подход — вызывать метод непосредственно через объект, а не через сохранённую ссылку на функцию.',
      pros: 'Простой и понятный код, работает предсказуемо, не создаёт новых функций.',
      cons: 'Не всегда возможно в случаях, когда функция передаётся как колбэк или обработчик событий.'
    }
  ];
  
  // Активное решение
  const activeSolution = ref(0);
  </script>
  
  <style>
  .this-context-explorer {
    font-family: Arial, sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    color: #000;
    background-color: #fff;
  }
  
  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
  }
  
  h2 {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 8px;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  
  h3 {
    color: #2c3e50;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  
  .code-container {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .code-display {
    background-color: #282c34;
    color: #abb2bf;
    padding: 15px;
    border-radius: 6px;
    font-family: 'Courier New', monospace;
    overflow-x: auto;
    margin: 0;
    line-height: 1.5;
  }
  
  .explanation {
    margin-top: 15px;
    line-height: 1.6;
  }
  
  .explanation p {
    margin-bottom: 10px;
  }
  
  code {
    background-color: #f1f1f1;
    padding: 2px 4px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    color: #e74c3c;
  }
  
  /* Визуализация */
  .visualization-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    margin-bottom: 20px;
  }
  
  .object-display {
    width: 90%;
    max-width: 500px;
    border: 2px solid #3498db;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .object-display.highlighted {
    box-shadow: 0 0 15px rgba(52, 152, 219, 0.7);
    transform: scale(1.03);
  }
  
  .object-title {
    background-color: #3498db;
    color: white;
    padding: 8px 12px;
    font-weight: bold;
  }
  
  .object-content {
    padding: 15px;
    background-color: #ecf0f1;
  }
  
  .property {
    margin-bottom: 8px;
    padding: 5px;
    border-radius: 4px;
    background-color: #fff;
  }
  
  .property.method {
    background-color: #e8f4f8;
  }
  
  .property-name {
    font-weight: bold;
    color: #2c3e50;
    margin-right: 5px;
  }
  
  .property-value {
    color: #e74c3c;
    font-family: 'Courier New', monospace;
  }
  
  .execution-flow {
    width: 90%;
    max-width: 500px;
  }
  
  .execution-step {
    display: flex;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 6px;
    background-color: #fff;
    border-left: 4px solid #95a5a6;
    opacity: 0.7;
    transform: translateX(-10px);
    transition: all 0.3s ease;
  }
  
  .execution-step.active {
    opacity: 1;
    border-left-color: #e74c3c;
    transform: translateX(0);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .step-number {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #95a5a6;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 15px;
    flex-shrink: 0;
  }
  
  .execution-step.active .step-number {
    background-color: #e74c3c;
  }
  
  .step-content {
    flex-grow: 1;
  }
  
  .code-snippet {
    font-family: 'Courier New', monospace;
    background-color: #f1f1f1;
    padding: 5px 8px;
    border-radius: 4px;
    margin-bottom: 8px;
    color: #2c3e50;
  }
  
  .this-context {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px;
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    background-color: #fff;
    transition: all 0.3s ease;
  }
  
  .this-context.object-context {
    background-color: #d4efdf;
    border-left: 4px solid #27ae60;
  }
  
  .this-context.window-context {
    background-color: #f9e79f;
    border-left: 4px solid #f39c12;
  }
  
  .this-context.undefined-context {
    background-color: #f5b7b1;
    border-left: 4px solid #c0392b;
  }
  
  .context-label {
    font-weight: bold;
    color: #2c3e50;
  }
  
  .context-value {
    font-family: 'Courier New', monospace;
    color: #e74c3c;
  }
  
  .controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
  }
  
  .controls button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
  }
  
  .controls button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .controls button:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
  
  /* Решения */
  .solutions-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .solution-card {
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .solution-card:hover {
    border-color: #3498db;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  
  .solution-card.active {
    border-color: #3498db;
    background-color: #f7fbfe;
  }
  
  .solution-header {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .solution-number {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #3498db;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  
  .solution-header h3 {
    margin: 0;
    font-size: 18px;
  }
  
  .solution-content {
    padding: 15px;
  }
  
  .solution-description {
    margin-top: 15px;
    font-size: 14px;
    line-height: 1.6;
  }
  
  .pros-cons {
    margin-top: 10px;
    padding: 8px;
    font-size: 13px;
    border-radius: 4px;
  }
  
  .pros-cons:first-of-type {
    background-color: #d4efdf;
  }
  
  .pros-cons:last-of-type {
    background-color: #f5b7b1;
  }
  
  /* Практическое применение */
  .usage-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .usage-case {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .usage-case h3 {
    margin-top: 0;
    color: #3498db;
  }
  
  /* Алгоритм определения this */
  .algorithm-steps {
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .algorithm-step {
    display: flex;
    margin-bottom: 25px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .algorithm-step:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  
  .algorithm-step .step-number {
    width: 36px;
    height: 36px;
    font-size: 18px;
    background-color: #3498db;
    margin-right: 20px;
  }
  
  .algorithm-step .step-content {
    flex-grow: 1;
  }
  
  .algorithm-step h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  
  .algorithm-step p {
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  .algorithm-step .code-display {
    margin-top: 10px;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .solutions-container, 
    .usage-cases {
      grid-template-columns: 1fr;
    }
    
    .visualization-container {
      padding: 15px;
    }
    
    .object-display, 
    .execution-flow, 
    .this-context {
      width: 100%;
    }
  }
  </style>