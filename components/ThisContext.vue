<template>
    <div class="this-explainer">
      <h1>Понимание контекста <span class="highlight">this</span> в JavaScript</h1>
      
      <div class="task-container">
        <h2>Анализ задачи</h2>
        <div class="code-block">
          <pre><code>const object = {
    firstName: "Bill",
    lastName: "Ivanov",
    sayLastName: () => {
      console.log(this.lastName);
    },
    sayName() {
      console.log(this.firstName);
    },
  };
  object.sayName(); //
  object.sayLastName(); //
  var b = object.sayName;
  b(); //
  object.sayName.bind({ firstName: "Cash" })(); //
  object.sayLastName.bind({ firstName: "Arrow" })(); //
  object.sayName.bind({ firstName: "Name1" }).bind({ firstName: "Name2" })(); //</code></pre>
        </div>
      </div>
      
      <div class="explanation-container">
        <p class="intro">
          Разберём эту задачу шаг за шагом, чтобы понять, как работает контекст <code>this</code> 
          в разных ситуациях. Это одна из самых сложных и запутанных тем в JavaScript.
        </p>
        
        <div class="key-difference">
          <h3>Ключевое различие в методах объекта:</h3>
          <div class="methods-comparison">
            <div class="method-box">
              <h4>Обычный метод</h4>
              <pre><code>sayName() {
    console.log(this.firstName);
  }</code></pre>
              <p>Динамический контекст <code>this</code>, зависит от способа вызова</p>
            </div>
            <div class="method-box arrow">
              <h4>Стрелочная функция</h4>
              <pre><code>sayLastName: () => {
    console.log(this.lastName);
  }</code></pre>
              <p>Лексический контекст <code>this</code>, фиксируется при создании</p>
            </div>
          </div>
        </div>
        
        <div class="output-analysis">
          <h3>Анализ вывода:</h3>
          
          <div class="step-container" v-for="(step, index) in steps" :key="index">
            <div :class="['step', { active: currentStep === index }]" @click="setStep(index)">
              <div class="step-header">
                <div class="step-number">{{ index + 1 }}</div>
                <div class="step-code">{{ step.code }}</div>
                <div class="step-result">Результат: <span class="output">{{ step.result }}</span></div>
              </div>
              <div class="step-explanation" v-if="currentStep === index">
                <p v-html="step.explanation"></p>
                <div class="this-visualization">
                  <div class="this-arrow"></div>
                  <div class="this-target" :class="step.targetClass">
                    {{ step.thisValue }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="rules-container">
          <h3>Главные правила работы с <code>this</code>:</h3>
          <ol>
            <li>
              <strong>Обычные функции:</strong> значение <code>this</code> определяется во время вызова 
              и зависит от того, как функция вызывается.
            </li>
            <li>
              <strong>Стрелочные функции:</strong> не имеют собственного <code>this</code> и используют 
              <code>this</code> из родительского лексического окружения (где функция создана).
            </li>
            <li>
              <strong>Метод объекта:</strong> при вызове через точку (<code>obj.method()</code>) <code>this</code> 
              указывает на объект перед точкой.
            </li>
            <li>
              <strong>Простой вызов функции:</strong> в нестрогом режиме <code>this</code> указывает на глобальный 
              объект, в строгом режиме — <code>undefined</code>.
            </li>
            <li>
              <strong>bind():</strong> создаёт новую функцию с привязанным контекстом, причем повторный 
              вызов <code>bind()</code> не меняет уже привязанный контекст.
            </li>
            <li>
              <strong>call()/apply():</strong> вызывает функцию с указанным контекстом, но не работает 
              для стрелочных функций.
            </li>
          </ol>
        </div>
        
        <div class="practical-applications">
          <h3>Практическое применение понимания контекста <code>this</code>:</h3>
          <ul>
            <li>
              <strong>Работа с обработчиками событий:</strong> выбор между обычной и стрелочной функцией 
              определяет доступ к контексту компонента.
            </li>
            <li>
              <strong>Методы классов и объектов:</strong> понимание, когда использовать стрелочные функции,
              чтобы сохранить контекст при передаче метода.
            </li>
            <li>
              <strong>Асинхронные колбэки:</strong> сохранение доступа к <code>this</code> в асинхронных операциях.
            </li>
            <li>
              <strong>Библиотеки событий:</strong> создание правильных обработчиков с нужным контекстом.
            </li>
            <li>
              <strong>Функциональное программирование:</strong> передача функций как значений с сохранением контекста.
            </li>
          </ul>
        </div>
        
        <div class="common-pitfalls">
          <h3>Распространённые ошибки:</h3>
          <div class="pitfall">
            <h4>❌ Использование стрелочных функций как методов объектов</h4>
            <pre><code>const user = {
    name: "Алексей",
    // Ошибка! this не будет указывать на user
    greet: () => {
      console.log(`Привет, ${this.name}`);
    }
  };</code></pre>
            <p>
              Стрелочные функции берут <code>this</code> из места их создания, 
              а не из контекста вызова. В методах объекта лучше использовать обычные функции.
            </p>
          </div>
          
          <div class="pitfall">
            <h4>❌ Потеря контекста при передаче метода как колбэка</h4>
            <pre><code>const button = document.getElementById('myButton');
  const user = {
    name: "Алексей",
    greet() {
      console.log(`Привет, ${this.name}`);
    }
  };
  
  // Потеря контекста! this будет указывать на button, а не на user
  button.addEventListener('click', user.greet);</code></pre>
            <p>
              Решение: использовать <code>bind</code> или стрелочную функцию-обертку:
              <code>button.addEventListener('click', user.greet.bind(user));</code> или
              <code>button.addEventListener('click', () => user.greet());</code>
            </p>
          </div>
        </div>
        
        <div class="algorithms-section">
          <h3>Алгоритм определения значения <code>this</code>:</h3>
          <ol>
            <li>
              <strong>Проверить тип функции:</strong> если это стрелочная функция, <code>this</code> берётся 
              из лексического окружения (где функция определена), и дальнейшие шаги не нужны.
            </li>
            <li>
              <strong>Проверить способ вызова:</strong>
              <ul>
                <li>
                  <strong>С <code>new</code>:</strong> <code>this</code> указывает на новый созданный объект.
                </li>
                <li>
                  <strong>С <code>call</code>/<code>apply</code>/<code>bind</code>:</strong> <code>this</code> 
                  указывает на первый аргумент этих методов.
                </li>
                <li>
                  <strong>Через точку/квадратные скобки:</strong> <code>this</code> указывает на объект перед точкой.
                </li>
                <li>
                  <strong>Простой вызов:</strong> <code>this</code> указывает на глобальный объект (или <code>undefined</code> в строгом режиме).
                </li>
              </ul>
            </li>
            <li>
              <strong>Учесть вложенность:</strong> для вложенных функций (не стрелочных) контекст определяется при их вызове, 
              а не при вызове внешней функции.
            </li>
          </ol>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentStep: 0,
        steps: [
          {
            code: "object.sayName()",
            result: "Bill",
            explanation: "Метод <code>sayName</code> вызывается через объект <code>object</code>. При таком вызове (через точку) <code>this</code> внутри метода указывает на объект перед точкой, то есть на <code>object</code>. Поэтому <code>this.firstName</code> равно <code>\"Bill\"</code>.",
            thisValue: "object { firstName: 'Bill', ... }",
            targetClass: "object-target"
          },
          {
            code: "object.sayLastName()",
            result: "undefined",
            explanation: "Метод <code>sayLastName</code> определён как стрелочная функция. Особенность стрелочных функций: у них нет своего <code>this</code>, они используют <code>this</code> из места, где были созданы. В данном случае, это глобальный контекст. В глобальном объекте нет свойства <code>lastName</code>, поэтому результат <code>undefined</code>.",
            thisValue: "window/global (глобальный объект)",
            targetClass: "global-target"
          },
          {
            code: "var b = object.sayName; b()",
            result: "undefined",
            explanation: "Здесь мы сначала сохраняем метод <code>sayName</code> в переменную <code>b</code>, а затем вызываем его как обычную функцию. При таком вызове <code>this</code> указывает на глобальный объект (или <code>undefined</code> в строгом режиме). Поскольку в глобальном объекте нет свойства <code>firstName</code>, результат <code>undefined</code>.",
            thisValue: "window/global (глобальный объект)",
            targetClass: "global-target"
          },
          {
            code: "object.sayName.bind({ firstName: 'Cash' })()",
            result: "Cash",
            explanation: "Метод <code>bind</code> создаёт новую функцию с привязанным контекстом <code>this</code>. Мы передаём объект <code>{ firstName: 'Cash' }</code>, поэтому <code>this</code> внутри функции будет указывать на этот объект, и <code>this.firstName</code> равно <code>\"Cash\"</code>.",
            thisValue: "{ firstName: 'Cash' }",
            targetClass: "bind-target"
          },
          {
            code: "object.sayLastName.bind({ lastName: 'Arrow' })()",
            result: "undefined",
            explanation: "Важно! Метод <code>bind</code> <strong>не работает</strong> со стрелочными функциями. Стрелочные функции всегда сохраняют <code>this</code> из места их создания, и его нельзя изменить с помощью <code>bind</code>, <code>call</code> или <code>apply</code>. Поэтому <code>this</code> остаётся глобальным объектом, а результат <code>undefined</code>.",
            thisValue: "window/global (глобальный объект)",
            targetClass: "global-target"
          },
          {
            code: "object.sayName.bind({ firstName: 'Name1' }).bind({ firstName: 'Name2' })()",
            result: "Name1",
            explanation: "Особенность метода <code>bind</code>: повторный вызов <code>bind</code> не изменяет уже привязанный контекст! Первый <code>bind</code> создаёт новую функцию с <code>this</code>, привязанным к <code>{ firstName: 'Name1' }</code>. Второй <code>bind</code> не меняет этот контекст. Поэтому результат <code>\"Name1\"</code>.",
            thisValue: "{ firstName: 'Name1' }",
            targetClass: "bind-target"
          }
        ]
      };
    },
    methods: {
      setStep(index) {
        this.currentStep = index;
      }
    }
  }
  </script>
  
  <style scoped>
  .this-explainer {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    color: #000;
    background-color: #fff;
    line-height: 1.6;
  }
  
  h1, h2, h3, h4 {
    color: #000;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }
  
  h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .highlight {
    color: #e74c3c;
  }
  
  .task-container {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .code-block {
    background-color: #282c34;
    border-radius: 6px;
    overflow-x: auto;
  }
  
  pre {
    margin: 0;
    padding: 1rem;
    overflow-x: auto;
  }
  
  code {
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 0.9rem;
    background-color: #f0f0f0;
    padding: 2px 4px;
    border-radius: 3px;
    color: #e74c3c;
  }
  
  .code-block code {
    background-color: transparent;
    padding: 0;
    color: #abb2bf;
  }
  
  .intro {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
  
  .key-difference {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 2rem;
  }
  
  .methods-comparison {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .method-box {
    flex: 1;
    min-width: 280px;
    background-color: #fff;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .method-box.arrow {
    border-left: 4px solid #e74c3c;
  }
  
  .method-box h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #343a40;
  }
  
  .method-box p {
    margin-bottom: 0;
    font-size: 0.9rem;
  }
  
  .output-analysis {
    margin-bottom: 2rem;
  }
  
  .step-container {
    margin-bottom: 1rem;
  }
  
  .step {
    border: 1px solid #dee2e6;
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .step.active {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
  
  .step-header {
    padding: 12px 15px;
    background-color: #f8f9fa;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .step-number {
    width: 28px;
    height: 28px;
    background-color: #007bff;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 15px;
    flex-shrink: 0;
  }
  
  .step-code {
    font-family: monospace;
    background-color: #282c34;
    color: #abb2bf;
    padding: 4px 8px;
    border-radius: 4px;
    margin-right: 15px;
    flex-grow: 1;
  }
  
  .step-result {
    flex-shrink: 0;
    font-weight: bold;
  }
  
  .output {
    color: #e74c3c;
  }
  
  .step-explanation {
    padding: 15px;
    background-color: #fff;
    border-top: 1px solid #dee2e6;
    animation: fadeIn 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .this-visualization {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
  }
  
  .this-arrow {
    width: 2px;
    height: 30px;
    background-color: #007bff;
    position: relative;
  }
  
  .this-arrow:before {
    content: "this";
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #007bff;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: bold;
  }
  
  .this-target {
    max-width: 90%;
    padding: 10px 15px;
    border-radius: 6px;
    font-family: monospace;
    font-size: 0.9rem;
    margin-top: 5px;
    text-align: center;
  }
  
  .object-target {
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    color: #155724;
  }
  
  .global-target {
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    color: #721c24;
  }
  
  .bind-target {
    background-color: #fff3cd;
    border: 1px solid #ffeeba;
    color: #856404;
  }
  
  .rules-container, .practical-applications, .common-pitfalls, .algorithms-section {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 2rem;
  }
  
  .rules-container ol, .practical-applications ul, .algorithms-section ol, .algorithms-section ul {
    padding-left: 20px;
  }
  
  .rules-container li, .practical-applications li, .algorithms-section li {
    margin-bottom: 10px;
  }
  
  .pitfall {
    background-color: #fff;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    padding: 15px;
    margin-bottom: 1rem;
  }
  
  .pitfall h4 {
    color: #dc3545;
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .pitfall pre {
    background-color: #282c34;
    color: #abb2bf;
    border-radius: 6px;
    padding: 10px;
    margin: 10px 0;
  }
  
  @media (max-width: 768px) {
    .methods-comparison {
      flex-direction: column;
    }
    
    .step-header {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .step-number {
      margin-bottom: 10px;
    }
    
    .step-code {
      margin-right: 0;
      margin-bottom: 10px;
      width: 100%;
    }
  }
  </style>