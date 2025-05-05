<template>
    <div class="keyof-demo">
      <h1>Разбор типа <span class="highlight">keyof typeof</span> в TypeScript</h1>
      
      <div class="explanation-container">
        <h2>Что решает этот тип?</h2>
        <p>
          Тип <code>keyof typeof</code> позволяет вам создать <strong>union type (объединение)</strong>
          из всех ключей объекта. Это очень полезно, когда вы хотите ограничить значения
          переменных только существующими ключами объекта.
        </p>
        
        <div class="step-by-step">
          <h3>Как работает <code>keyof typeof</code>?</h3>
          
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>Исходный объект</h4>
              <div class="code-box">
                <pre>
  const obj = {
    name: "Nik",
    age: 25
  };</pre>
              </div>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>Применение <code>typeof</code></h4>
              <div class="code-box">
                <pre>
  typeof obj
  // Результат: { name: string; age: number }</pre>
              </div>
              <p>Оператор <code>typeof</code> получает <em>тип</em> объекта <code>obj</code></p>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Применение <code>keyof</code></h4>
              <div class="code-box">
                <pre>
  keyof (typeof obj)
  // Результат: "name" | "age"</pre>
              </div>
              <p>Оператор <code>keyof</code> извлекает все ключи из типа и создает объединение (union type)</p>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>Итоговый тип</h4>
              <div class="code-box">
                <pre>
  type MYType = keyof typeof obj;
  // Тип MYType теперь равен "name" | "age"</pre>
              </div>
              <p><code>MYType</code> - это объединение строковых литералов, которое может принимать только значения <code>"name"</code> или <code>"age"</code></p>
            </div>
          </div>
        </div>
        
        <div class="animation-container">
          <h3>Визуализация процесса</h3>
          <div class="animation-box">
            <div class="animation-step" :class="{ active: currentStep >= 1 }">
              <div class="object-box">
                <div class="object-title">Объект obj</div>
                <div class="object-content">
                  <div class="object-prop">name: "Nik"</div>
                  <div class="object-prop">age: 25</div>
                </div>
              </div>
            </div>
            
            <div class="animation-step" :class="{ active: currentStep >= 2 }">
              <div class="arrow">→</div>
              <div class="typeof-box">
                <div class="typeof-title">typeof obj</div>
                <div class="typeof-content">
                  <div class="type-prop">name: string</div>
                  <div class="type-prop">age: number</div>
                </div>
              </div>
            </div>
            
            <div class="animation-step" :class="{ active: currentStep >= 3 }">
              <div class="arrow">→</div>
              <div class="keyof-box">
                <div class="keyof-title">keyof typeof obj</div>
                <div class="keyof-content">
                  "name" | "age"
                </div>
              </div>
            </div>
          </div>
          
          <div class="controls">
            <button @click="prevStep" :disabled="currentStep <= 1">Назад</button>
            <button @click="nextStep" :disabled="currentStep >= 3">Вперед</button>
            <button @click="resetAnimation">Сбросить</button>
          </div>
        </div>
        
        <div class="examples">
          <h3>Проверка типов</h3>
          
          <div class="valid-examples">
            <h4>✅ Правильное использование</h4>
            <div class="code-box">
              <pre>
  const var1: MYType = "name";  // OK
  const var2: MYType = "age";   // OK</pre>
            </div>
          </div>
          
          <div class="invalid-examples">
            <h4>❌ Ошибки типов</h4>
            <div class="code-box">
              <pre>
  const var3: MYType = "test";  // Ошибка - "test" не ключ объекта obj
  const var4: MYType = 25;      // Ошибка - числовое значение, а не строка-ключ</pre>
            </div>
          </div>
        </div>
        
        <div class="practical-applications">
          <h3>Практическое применение</h3>
          
          <div class="use-case">
            <h4>1. Безопасный доступ к свойствам объекта</h4>
            <div class="code-box">
              <pre>
  function getProperty&lt;T, K extends keyof T&gt;(obj: T, key: K): T[K] {
    return obj[key];
  }
  
  // Безопасно, т.к. "name" - существующий ключ
  const name = getProperty(obj, "name");
  
  // Ошибка компиляции, т.к. "address" - не ключ объекта
  // const address = getProperty(obj, "address");</pre>
            </div>
          </div>
          
          <div class="use-case">
            <h4>2. Типизированные селекторы в Redux/Vuex</h4>
            <div class="code-box">
              <pre>
  const state = {
    user: { name: "Анна" },
    settings: { theme: "dark" }
  };
  
  type StateKey = keyof typeof state;
  
  function select&lt;K extends StateKey&gt;(key: K) {
    return state[key];
  }
  
  // Получим { name: "Анна" }
  const user = select("user");</pre>
            </div>
          </div>
          
          <div class="use-case">
            <h4>3. Типизация для API-запросов</h4>
            <div class="code-box">
              <pre>
  const endpoints = {
    users: "/api/users",
    products: "/api/products",
    orders: "/api/orders"
  };
  
  type Endpoint = keyof typeof endpoints;
  
  function fetchData(endpoint: Endpoint) {
    return fetch(endpoints[endpoint]);
  }
  
  // OK
  fetchData("users");
  
  // Ошибка! "customers" не существует в endpoints
  // fetchData("customers");</pre>
            </div>
          </div>
        </div>
        
        <div class="pitfalls">
          <h3>Подводные камни</h3>
          
          <div class="pitfall">
            <h4>1. Изменение объекта меняет тип</h4>
            <p>Если вы добавите или удалите свойства из исходного объекта, тип <code>keyof typeof</code> автоматически изменится:</p>
            <div class="code-box">
              <pre>
  const obj = { name: "Nik", age: 25 };
  // MYType = "name" | "age"
  
  // Позже в коде...
  obj.address = "Москва";
  // Теперь MYType = "name" | "age" | "address"</pre>
            </div>
            <p class="note">Примечание: Изменение объекта во время выполнения не влияет на типы, но если вы измените определение объекта в коде и перекомпилируете, тип изменится.</p>
          </div>
          
          <div class="pitfall">
            <h4>2. Числовые ключи</h4>
            <p>Если объект имеет числовые ключи, <code>keyof</code> включит их как числовой и строковой тип:</p>
            <div class="code-box">
              <pre>
  const arr = [1, 2, 3];
  type ArrKeyType = keyof typeof arr;
  // ArrKeyType = number | "length" | "push" | "pop" | ... (все методы массива)</pre>
            </div>
          </div>
          
          <div class="pitfall">
            <h4>3. Свойства прототипов</h4>
            <p><code>keyof</code> включает все доступные свойства, включая унаследованные:</p>
            <div class="code-box">
              <pre>
  class Person { 
    name: string = "";
    sayHello() {}
  }
  
  type PersonKeys = keyof Person;
  // PersonKeys = "name" | "sayHello" (включая методы)</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentStep: 1,
        animationInterval: null
      };
    },
    methods: {
      nextStep() {
        if (this.currentStep < 3) {
          this.currentStep++;
        }
      },
      prevStep() {
        if (this.currentStep > 1) {
          this.currentStep--;
        }
      },
      resetAnimation() {
        this.currentStep = 1;
      },
      startAutoAnimation() {
        if (this.animationInterval) {
          clearInterval(this.animationInterval);
        }
        
        this.resetAnimation();
        
        this.animationInterval = setInterval(() => {
          if (this.currentStep < 3) {
            this.currentStep++;
          } else {
            clearInterval(this.animationInterval);
            setTimeout(() => {
              this.resetAnimation();
              this.startAutoAnimation();
            }, 2000);
          }
        }, 1500);
      }
    },
    mounted() {
      this.startAutoAnimation();
    },
    beforeUnmount() {
      if (this.animationInterval) {
        clearInterval(this.animationInterval);
      }
    }
  };
  </script>
  
  <style>
  .keyof-demo {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
    background-color: #fff;
  }
  
  h1, h2, h3, h4 {
    color: #000;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 30px;
  }
  
  h2 {
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  
  h3 {
    margin-top: 25px;
    margin-bottom: 15px;
  }
  
  .highlight {
    color: #e74c3c;
    font-weight: bold;
  }
  
  .explanation-container {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .step-by-step {
    margin: 30px 0;
  }
  
  .step {
    display: flex;
    margin-bottom: 20px;
    align-items: flex-start;
  }
  
  .step-number {
    width: 30px;
    height: 30px;
    background-color: #3498db;
    color: white;
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
  
  .code-box {
    background-color: #f8f9fa;
    border-radius: 6px;
    padding: 15px;
    overflow-x: auto;
    margin: 10px 0;
    border: 1px solid #e9ecef;
  }
  
  .code-box pre {
    margin: 0;
    font-family: 'Source Code Pro', Consolas, 'Courier New', monospace;
    color: #000;
  }
  
  .animation-container {
    margin: 40px 0;
    text-align: center;
  }
  
  .animation-box {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 180px;
    margin: 30px 0;
    flex-wrap: wrap;
  }
  
  .animation-step {
    display: flex;
    align-items: center;
    opacity: 0.3;
    transform: translateY(20px);
    transition: all 0.5s ease;
  }
  
  .animation-step.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .arrow {
    font-size: 24px;
    margin: 0 15px;
    color: #3498db;
    font-weight: bold;
  }
  
  .object-box,
  .typeof-box,
  .keyof-box {
    border: 2px solid;
    border-radius: 8px;
    width: 200px;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .object-box {
    border-color: #e74c3c;
  }
  
  .typeof-box {
    border-color: #3498db;
  }
  
  .keyof-box {
    border-color: #2ecc71;
  }
  
  .object-title,
  .typeof-title,
  .keyof-title {
    color: white;
    padding: 8px 12px;
    font-weight: bold;
  }
  
  .object-title {
    background-color: #e74c3c;
  }
  
  .typeof-title {
    background-color: #3498db;
  }
  
  .keyof-title {
    background-color: #2ecc71;
  }
  
  .object-content,
  .typeof-content,
  .keyof-content {
    padding: 15px;
    text-align: left;
  }
  
  .object-prop,
  .type-prop {
    margin-bottom: 5px;
    font-family: 'Source Code Pro', Consolas, monospace;
  }
  
  .keyof-content {
    font-family: 'Source Code Pro', Consolas, monospace;
    font-weight: bold;
    color: #27ae60;
  }
  
  .controls {
    margin-top: 20px;
  }
  
  .controls button {
    padding: 8px 16px;
    margin: 0 5px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .controls button:hover:not(:disabled) {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
  
  .controls button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .examples {
    margin: 40px 0;
  }
  
  .valid-examples h4,
  .invalid-examples h4 {
    margin-bottom: 10px;
  }
  
  .valid-examples .code-box {
    border-left: 4px solid #2ecc71;
  }
  
  .invalid-examples .code-box {
    border-left: 4px solid #e74c3c;
  }
  
  .practical-applications {
    margin: 40px 0;
  }
  
  .use-case {
    margin-bottom: 25px;
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 8px;
  }
  
  .use-case h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  
  .pitfalls {
    margin: 40px 0;
  }
  
  .pitfall {
    margin-bottom: 25px;
    padding: 15px;
    background-color: #fff8e1;
    border-radius: 8px;
    border-left: 4px solid #f39c12;
  }
  
  .pitfall h4 {
    margin-top: 0;
    color: #d35400;
  }
  
  .note {
    font-style: italic;
    color: #7f8c8d;
    font-size: 0.9em;
    margin-top: 10px;
  }
  
  @media (max-width: 768px) {
    .animation-box {
      flex-direction: column;
    }
    
    .arrow {
      transform: rotate(90deg);
      margin: 15px 0;
    }
    
    .object-box,
    .typeof-box,
    .keyof-box {
      width: 100%;
      max-width: 250px;
    }
  }
  </style>