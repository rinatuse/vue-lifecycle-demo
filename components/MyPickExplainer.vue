<template>
    <div class="my-pick-explainer">
      <h1>Разбираем Utility Type: MyPick</h1>
      <p class="subtitle">Глубокое понимание утилитарных типов в TypeScript</p>
  
      <section class="problem-statement">
        <h2>Задача</h2>
        <p>Реализовать тип <code>MyPick</code>, который работает аналогично встроенному типу <code>Pick</code> в TypeScript.</p>
        
        <div class="code-block">
          <pre>
  type Obj = { key1: string, key2: string, key3: string };
  
  // type Example = MyPick&lt;Obj, "key1" | "key2"&gt;;
  type MyPick&lt;T, Keys extends keyof T&gt; = {
    [k in Keys]: T[k];
  };
          </pre>
        </div>
      </section>
  
      <section class="explanation">
        <h2>Что делает MyPick?</h2>
        <p>Тип <code>MyPick</code> создаёт новый тип, выбирая только указанные ключи из существующего типа.</p>
        
        <div class="visualization">
          <div class="original-type">
            <h3>Исходный тип</h3>
            <div class="type-display">
              <div class="property-row">
                <span class="property-key">key1:</span>
                <span class="property-value">string</span>
              </div>
              <div class="property-row">
                <span class="property-key">key2:</span>
                <span class="property-value">string</span>
              </div>
              <div class="property-row">
                <span class="property-key">key3:</span>
                <span class="property-value">string</span>
              </div>
            </div>
          </div>
          
          <div class="arrow">
            <div class="arrow-line"></div>
            <div class="arrow-text">
              MyPick&lt;Obj, "key1" | "key2"&gt;
            </div>
          </div>
          
          <div class="result-type">
            <h3>Результат</h3>
            <div class="type-display">
              <div class="property-row highlighted">
                <span class="property-key">key1:</span>
                <span class="property-value">string</span>
              </div>
              <div class="property-row highlighted">
                <span class="property-key">key2:</span>
                <span class="property-value">string</span>
              </div>
            </div>
          </div>
        </div>
  
        <div class="animation-container">
          <h3>Процесс работы типа</h3>
          <div class="animation-steps">
            <div class="step" :class="{ active: currentStep >= 1 }">
              <div class="step-number">1</div>
              <div class="step-content">
                <p>Начинаем с исходного типа <code>T</code> и множества ключей <code>Keys</code>.</p>
                <div class="code-snippet">
                  <pre>type T = { key1: string, key2: string, key3: string }
  type Keys = "key1" | "key2"</pre>
                </div>
              </div>
            </div>
            
            <div class="step" :class="{ active: currentStep >= 2 }">
              <div class="step-number">2</div>
              <div class="step-content">
                <p>Проверяем, что <code>Keys</code> действительно являются ключами <code>T</code>.</p>
                <div class="code-snippet">
                  <pre>Keys extends keyof T // keyof T = "key1" | "key2" | "key3"</pre>
                </div>
              </div>
            </div>
            
            <div class="step" :class="{ active: currentStep >= 3 }">
              <div class="step-number">3</div>
              <div class="step-content">
                <p>Создаём новый тип-объект, перебирая все ключи из <code>Keys</code>.</p>
                <div class="code-snippet">
                  <pre>{ [k in Keys]: ... }</pre>
                </div>
              </div>
            </div>
            
            <div class="step" :class="{ active: currentStep >= 4 }">
              <div class="step-number">4</div>
              <div class="step-content">
                <p>Для каждого ключа <code>k</code> берём соответствующий тип из <code>T</code>.</p>
                <div class="code-snippet">
                  <pre>{ [k in Keys]: T[k] }</pre>
                </div>
              </div>
            </div>
            
            <div class="step" :class="{ active: currentStep >= 5 }">
              <div class="step-number">5</div>
              <div class="step-content">
                <p>Получаем новый тип только с выбранными ключами.</p>
                <div class="code-snippet">
                  <pre>{ key1: string, key2: string }</pre>
                </div>
              </div>
            </div>
          </div>
          
          <div class="animation-controls">
            <button @click="prevStep" :disabled="currentStep <= 1">Назад</button>
            <button @click="nextStep" :disabled="currentStep >= 5">Далее</button>
            <button @click="resetAnimation">Сбросить</button>
          </div>
        </div>
      </section>
  
      <section class="pitfalls">
        <h2>Подводные камни</h2>
        
        <div class="pitfall-card">
          <h3>1. Несуществующие ключи</h3>
          <div class="code-example">
            <pre>
  // Error: Type '"key4"' is not assignable to type 'keyof Obj'
  type BadPick = MyPick&lt;Obj, "key1" | "key4"&gt;;
            </pre>
          </div>
          <p>Если вы попытаетесь выбрать ключ, которого нет в исходном типе, TypeScript выдаст ошибку. Это обеспечивается ограничением <code>Keys extends keyof T</code>.</p>
        </div>
        
        <div class="pitfall-card">
          <h3>2. Пустой набор ключей</h3>
          <div class="code-example">
            <pre>
  // Допустимо, но результат будет пустым объектом
  type EmptyPick = MyPick&lt;Obj, never&gt;; // {}
            </pre>
          </div>
          <p>Если вы передадите <code>never</code> в качестве <code>Keys</code>, результатом будет пустой тип объекта <code>{}</code>.</p>
        </div>
        
        <div class="pitfall-card">
          <h3>3. Работа с методами</h3>
          <div class="code-example">
            <pre>
  type ObjWithMethod = {
    key1: string,
    method(): void
  };
  
  type MethodPick = MyPick&lt;ObjWithMethod, "method"&gt;; // { method(): void }
            </pre>
          </div>
          <p><code>MyPick</code> корректно работает с методами, но при использовании с интерфейсами классов могут возникнуть нюансы с приватными полями.</p>
        </div>
        
        <div class="pitfall-card">
          <h3>4. MyPick сохраняет модификаторы</h3>
          <div class="code-example">
            <pre>
  type ObjWithReadonly = {
    readonly key1: string,
    key2?: string
  };
  
  type ModifierPick = MyPick&lt;ObjWithReadonly, "key1" | "key2"&gt;; 
  // { readonly key1: string, key2?: string }
            </pre>
          </div>
          <p><code>MyPick</code> сохраняет модификаторы свойств, такие как <code>readonly</code> и <code>?</code> (опциональные свойства).</p>
        </div>
      </section>
  
      <section class="real-world">
        <h2>Практическое применение</h2>
        
        <div class="use-case">
          <h3>1. Создание подмножества данных для API</h3>
          <div class="code-example">
            <pre>
  // Полная модель пользователя
  interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Для отправки клиенту (без чувствительных данных)
  type PublicUser = MyPick&lt;User, "id" | "firstName" | "lastName" | "email"&gt;;
            </pre>
          </div>
          <p>Вы можете создавать подмножества ваших данных, чтобы отправлять клиенту только безопасную информацию.</p>
        </div>
        
        <div class="use-case">
          <h3>2. Формы и валидация</h3>
          <div class="code-example">
            <pre>
  interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    categories: string[];
    images: string[];
  }
  
  // Для формы редактирования только основных свойств
  type ProductEditForm = MyPick&lt;Product, "name" | "description" | "price"&gt;;
  
  // Для формы управления складом
  type InventoryForm = MyPick&lt;Product, "stock"&gt;;
            </pre>
          </div>
          <p>При работе с формами вы можете создавать специализированные типы для разных форм, использующих подмножество полей модели.</p>
        </div>
        
        <div class="use-case">
          <h3>3. Управление состоянием</h3>
          <div class="code-example">
            <pre>
  interface AppState {
    user: User;
    products: Product[];
    cart: CartItem[];
    ui: {
      theme: 'light' | 'dark';
      sidebarOpen: boolean;
    };
    // ... другие свойства
  }
  
  // Для компонентов, которым нужен только UI
  type UiState = MyPick&lt;AppState, "ui"&gt;;
  
  // Для страницы профиля
  type ProfileState = MyPick&lt;AppState, "user"&gt;;
            </pre>
          </div>
          <p>В управлении состоянием приложения <code>MyPick</code> помогает создать подмножества состояния для разных компонентов.</p>
        </div>
      </section>
  
      <section class="implementation-explanation">
        <h2>Как это работает?</h2>
        
        <div class="code-with-explanation">
          <div class="code-part">
            <pre>
  type MyPick&lt;T, Keys extends keyof T&gt; = {
    [k in Keys]: T[k];
  };
            </pre>
          </div>
          
          <div class="explanation-part">
            <div class="explanation-item">
              <h3>&lt;T, Keys extends keyof T&gt;</h3>
              <p>Это объявление двух параметров типа:</p>
              <ul>
                <li><code>T</code> - исходный тип, из которого мы будем выбирать свойства</li>
                <li><code>Keys</code> - набор ключей, которые мы хотим выбрать</li>
                <li><code>extends keyof T</code> - ограничение, указывающее что <code>Keys</code> должны быть подмножеством ключей <code>T</code></li>
              </ul>
            </div>
            
            <div class="explanation-item">
              <h3>[k in Keys]</h3>
              <p>Это mapping типов - цикл по всем ключам в <code>Keys</code>:</p>
              <ul>
                <li>Для каждого ключа <code>k</code> из <code>Keys</code> создаётся свойство в новом типе</li>
                <li>Аналог цикла <code>for..in</code> в JavaScript, но на уровне типов</li>
              </ul>
            </div>
            
            <div class="explanation-item">
              <h3>T[k]</h3>
              <p>Это индексный доступ к типам:</p>
              <ul>
                <li>Получает тип свойства <code>k</code> из типа <code>T</code></li>
                <li>Аналогично обращению к свойству объекта <code>obj[key]</code> в JavaScript</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
  
      <section class="equivalent-functions">
        <h2>Эквивалент в JavaScript</h2>
        
        <div class="js-code">
          <pre>
  function pick(obj, keys) {
    const result = {};
    
    for (const key of keys) {
      if (key in obj) {
        result[key] = obj[key];
      }
    }
    
    return result;
  }
  
  const obj = { key1: 'value1', key2: 'value2', key3: 'value3' };
  const picked = pick(obj, ['key1', 'key2']);
  console.log(picked); // { key1: 'value1', key2: 'value2' }
          </pre>
        </div>
        
        <p>Вот как бы выглядела функция, выполняющая ту же работу в JavaScript, что и тип <code>MyPick</code> делает на уровне типов.</p>
      </section>
  
      <section class="conclusion">
        <h2>Итоги</h2>
        
        <div class="summary">
          <ul>
            <li><code>MyPick</code> - это утилитарный тип, который создаёт новый тип с подмножеством свойств из исходного типа.</li>
            <li>Он использует механизмы <b>mapped types</b> и <b>indexed access types</b> для своей работы.</li>
            <li>Ограничение <code>Keys extends keyof T</code> обеспечивает безопасность типов.</li>
            <li>Такие утилитарные типы делают код более безопасным и выразительным.</li>
            <li>В реальных проектах <code>MyPick</code> (или встроенный <code>Pick</code>) часто используется для работы с API, формами и состоянием.</li>
          </ul>
        </div>
        
        <p>Понимание таких типов как <code>MyPick</code> не только помогает решать задачи, но и глубже понимать систему типов TypeScript в целом.</p>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MyPickExplainer',
    data() {
      return {
        currentStep: 1
      }
    },
    methods: {
      nextStep() {
        if (this.currentStep < 5) {
          this.currentStep++
        }
      },
      prevStep() {
        if (this.currentStep > 1) {
          this.currentStep--
        }
      },
      resetAnimation() {
        this.currentStep = 1
      }
    }
  }
  </script>
  
  <style>
  .my-pick-explainer {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #000;
    background-color: #fff;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    line-height: 1.6;
  }
  
  h1, h2, h3 {
    color: #000;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 5px;
  }
  
  .subtitle {
    text-align: center;
    color: #555;
    margin-top: 0;
    margin-bottom: 30px;
  }
  
  section {
    margin-bottom: 40px;
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .code-block {
    background-color: #282c34;
    border-radius: 5px;
    padding: 15px;
    overflow-x: auto;
    margin: 15px 0;
  }
  
  .code-block pre, .code-example pre, .code-snippet pre, .js-code pre {
    margin: 0;
    color: #fff;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 14px;
    line-height: 1.5;
  }
  
  code {
    background-color: #f0f0f0;
    padding: 2px 4px;
    border-radius: 3px;
    font-family: 'Consolas', 'Monaco', monospace;
    color: #d63384;
  }
  
  .visualization {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0;
  }
  
  .original-type, .result-type {
    width: 40%;
    background-color: #fff;
    border: 2px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .original-type h3, .result-type h3 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 15px;
    color: #333;
  }
  
  .type-display {
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 10px;
    background-color: #f8f8f8;
  }
  
  .property-row {
    padding: 8px;
    border-bottom: 1px solid #eee;
    display: flex;
  }
  
  .property-row:last-child {
    border-bottom: none;
  }
  
  .property-key {
    font-weight: bold;
    color: #0070f3;
    width: 80px;
  }
  
  .property-value {
    color: #d63384;
  }
  
  .property-row.highlighted {
    background-color: #e6f7ff;
    border-left: 3px solid #1890ff;
  }
  
  .arrow {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
  }
  
  .arrow-line {
    width: 100%;
    height: 2px;
    background-color: #1890ff;
    position: relative;
  }
  
  .arrow-line:after {
    content: "";
    position: absolute;
    right: 0;
    top: -4px;
    border: 5px solid transparent;
    border-left: 10px solid #1890ff;
  }
  
  .arrow-text {
    background-color: #e6f7ff;
    padding: 8px 12px;
    border-radius: 20px;
    margin-top: 10px;
    border: 1px solid #91d5ff;
    font-size: 14px;
    font-family: 'Consolas', 'Monaco', monospace;
  }
  
  .animation-container {
    margin-top: 40px;
  }
  
  .animation-steps {
    margin: 20px 0;
  }
  
  .step {
    display: flex;
    margin-bottom: 15px;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }
  
  .step.active {
    opacity: 1;
  }
  
  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: #1890ff;
    color: white;
    border-radius: 50%;
    margin-right: 15px;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  .step-content {
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;
    flex-grow: 1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .step-content p {
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .code-snippet {
    background-color: #282c34;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
  }
  
  .code-snippet pre {
    margin: 0;
    color: #fff;
  }
  
  .animation-controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  .animation-controls button {
    padding: 8px 16px;
    background-color: #1890ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .animation-controls button:hover:not(:disabled) {
    background-color: #096dd9;
  }
  
  .animation-controls button:disabled {
    background-color: #bfbfbf;
    cursor: not-allowed;
  }
  
  .pitfall-card, .use-case {
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .pitfall-card h3, .use-case h3 {
    margin-top: 0;
    color: #f56c6c;
    border-bottom: 1px solid #fde2e2;
    padding-bottom: 8px;
  }
  
  .use-case h3 {
    color: #67c23a;
    border-bottom-color: #e1f3d8;
  }
  
  .code-example {
    background-color: #282c34;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
    overflow-x: auto;
  }
  
  .code-with-explanation {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .code-part {
    background-color: #282c34;
    border-radius: 5px;
    padding: 15px;
    overflow-x: auto;
  }
  
  .explanation-part {
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .explanation-item {
    margin-bottom: 20px;
  }
  
  .explanation-item h3 {
    color: #1890ff;
    margin-bottom: 10px;
  }
  
  .explanation-item ul {
    padding-left: 20px;
  }
  
  .js-code {
    background-color: #282c34;
    border-radius: 5px;
    padding: 15px;
    overflow-x: auto;
    margin-bottom: 15px;
  }
  
  .summary {
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .summary ul {
    padding-left: 20px;
  }
  
  .summary li {
    margin-bottom: 8px;
  }
  
  @media (min-width: 768px) {
    .code-with-explanation {
      flex-direction: row;
    }
    
    .code-part {
      width: 40%;
    }
    
    .explanation-part {
      width: 60%;
    }
  }
  
  @media (max-width: 767px) {
    .visualization {
      flex-direction: column;
      gap: 20px;
    }
    
    .original-type, .result-type {
      width: 100%;
    }
    
    .arrow {
      transform: rotate(90deg);
      margin: 20px 0;
    }
  }
  </style>