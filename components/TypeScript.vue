<template>
    <div class="partial-explainer">
      <h1 class="title">Utility Types в TypeScript: Реализация Partial</h1>
      <p class="subtitle">Углубленное понимание типов в TypeScript на примере собеседования в Газпромнефть</p>
  
      <div class="section">
        <h2>Что такое Partial?</h2>
        <div class="explanation">
          <p><code>Partial&lt;T&gt;</code> — это встроенный utility type в TypeScript, который делает <b>все свойства</b> типа <b>необязательными</b>.</p>
          <p>Другими словами, он добавляет <code>?</code> к каждому свойству объекта.</p>
  
          <div class="example-container">
            <div class="code-block">
              <pre>
  type User = {
    id: number;
    name: string;
    email: string;
  };
  
  // Использование встроенного Partial
  type PartialUser = Partial&lt;User&gt;;
  
  // Результат:
  // type PartialUser = {
  //   id?: number | undefined;
  //   name?: string | undefined;
  //   email?: string | undefined;
  // }
              </pre>
            </div>
          </div>
        </div>
      </div>
  
      <div class="section">
        <h2>Как реализовать свой Partial</h2>
        <div class="implementation">
          <p>Давайте разберем, как бы мы могли реализовать Partial самостоятельно:</p>
          <div class="code-block">
            <pre>
  type MyPartial&lt;T&gt; = {
    [K in keyof T]?: T[K];
  }
            </pre>
          </div>
          <div class="explanation-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-text">
                <p><code>[K in keyof T]</code> — это маппированный тип, который перебирает все ключи типа T</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-text">
                <p><code>?</code> — оператор опциональности, делающий свойство необязательным</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-text">
                <p><code>T[K]</code> — обращение к типу свойства K в типе T</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="section animation-section">
        <h2>Как работает Partial (анимация)</h2>
        <div class="animation-container" ref="animationContainer">
          <div class="animation-step" v-show="animationStep === 0">
            <h3>Исходный тип</h3>
            <div class="type-box">
              <div class="type-title">User</div>
              <div class="property">
                <span class="property-name">id:</span>
                <span class="property-type">number</span>
                <span class="required">обязательное</span>
              </div>
              <div class="property">
                <span class="property-name">name:</span>
                <span class="property-type">string</span>
                <span class="required">обязательное</span>
              </div>
              <div class="property">
                <span class="property-name">email:</span>
                <span class="property-type">string</span>
                <span class="required">обязательное</span>
              </div>
            </div>
            <button class="next-button" @click="nextStep">Далее</button>
          </div>
  
          <div class="animation-step" v-show="animationStep === 1">
            <h3>Применение Partial</h3>
            <div class="process-box">
              <div class="type-box input-type">
                <div class="type-title">User</div>
                <div class="property">
                  <span class="property-name">id:</span>
                  <span class="property-type">number</span>
                  <span class="required">обязательное</span>
                </div>
                <div class="property">
                  <span class="property-name">name:</span>
                  <span class="property-type">string</span>
                  <span class="required">обязательное</span>
                </div>
                <div class="property">
                  <span class="property-name">email:</span>
                  <span class="property-type">string</span>
                  <span class="required">обязательное</span>
                </div>
              </div>
              <div class="process-arrow">
                <span>Partial&lt;User&gt;</span>
                <div class="arrow">&rarr;</div>
              </div>
              <div class="type-box output-type">
                <div class="type-title">PartialUser</div>
                <div class="property transforming">
                  <span class="property-name">id?:</span>
                  <span class="property-type">number</span>
                  <span class="optional">необязательное</span>
                </div>
                <div class="property">
                  <span class="property-name">name:</span>
                  <span class="property-type">string</span>
                  <span class="required">обязательное</span>
                </div>
                <div class="property">
                  <span class="property-name">email:</span>
                  <span class="property-type">string</span>
                  <span class="required">обязательное</span>
                </div>
              </div>
            </div>
            <button class="next-button" @click="nextStep">Далее</button>
          </div>
  
          <div class="animation-step" v-show="animationStep === 2">
            <h3>Применение Partial</h3>
            <div class="process-box">
              <div class="type-box input-type">
                <div class="type-title">User</div>
                <div class="property">
                  <span class="property-name">id:</span>
                  <span class="property-type">number</span>
                  <span class="required">обязательное</span>
                </div>
                <div class="property">
                  <span class="property-name">name:</span>
                  <span class="property-type">string</span>
                  <span class="required">обязательное</span>
                </div>
                <div class="property">
                  <span class="property-name">email:</span>
                  <span class="property-type">string</span>
                  <span class="required">обязательное</span>
                </div>
              </div>
              <div class="process-arrow">
                <span>Partial&lt;User&gt;</span>
                <div class="arrow">&rarr;</div>
              </div>
              <div class="type-box output-type">
                <div class="type-title">PartialUser</div>
                <div class="property">
                  <span class="property-name">id?:</span>
                  <span class="property-type">number</span>
                  <span class="optional">необязательное</span>
                </div>
                <div class="property transforming">
                  <span class="property-name">name?:</span>
                  <span class="property-type">string</span>
                  <span class="optional">необязательное</span>
                </div>
                <div class="property">
                  <span class="property-name">email:</span>
                  <span class="property-type">string</span>
                  <span class="required">обязательное</span>
                </div>
              </div>
            </div>
            <button class="next-button" @click="nextStep">Далее</button>
          </div>
  
          <div class="animation-step" v-show="animationStep === 3">
            <h3>Применение Partial</h3>
            <div class="process-box">
              <div class="type-box input-type">
                <div class="type-title">User</div>
                <div class="property">
                  <span class="property-name">id:</span>
                  <span class="property-type">number</span>
                  <span class="required">обязательное</span>
                </div>
                <div class="property">
                  <span class="property-name">name:</span>
                  <span class="property-type">string</span>
                  <span class="required">обязательное</span>
                </div>
                <div class="property">
                  <span class="property-name">email:</span>
                  <span class="property-type">string</span>
                  <span class="required">обязательное</span>
                </div>
              </div>
              <div class="process-arrow">
                <span>Partial&lt;User&gt;</span>
                <div class="arrow">&rarr;</div>
              </div>
              <div class="type-box output-type">
                <div class="type-title">PartialUser</div>
                <div class="property">
                  <span class="property-name">id?:</span>
                  <span class="property-type">number</span>
                  <span class="optional">необязательное</span>
                </div>
                <div class="property">
                  <span class="property-name">name?:</span>
                  <span class="property-type">string</span>
                  <span class="optional">необязательное</span>
                </div>
                <div class="property transforming">
                  <span class="property-name">email?:</span>
                  <span class="property-type">string</span>
                  <span class="optional">необязательное</span>
                </div>
              </div>
            </div>
            <button class="next-button" @click="nextStep">Далее</button>
          </div>
  
          <div class="animation-step" v-show="animationStep === 4">
            <h3>Результат: все свойства стали необязательными</h3>
            <div class="result-box">
              <div class="type-box output-type final">
                <div class="type-title">PartialUser</div>
                <div class="property">
                  <span class="property-name">id?:</span>
                  <span class="property-type">number</span>
                  <span class="optional">необязательное</span>
                </div>
                <div class="property">
                  <span class="property-name">name?:</span>
                  <span class="property-type">string</span>
                  <span class="optional">необязательное</span>
                </div>
                <div class="property">
                  <span class="property-name">email?:</span>
                  <span class="property-type">string</span>
                  <span class="optional">необязательное</span>
                </div>
              </div>
            </div>
            <button class="restart-button" @click="resetAnimation">Начать заново</button>
          </div>
        </div>
      </div>
  
      <div class="section">
        <h2>Разбор задачи с собеседования</h2>
        <div class="task-analysis">
          <div class="code-block">
            <pre>
  type User = {
    id: number;
  };
  
  type MyPartial = {};
    
  type UnUnser&lt;K&gt; = {  
    [key in keyof K]?: K[key];  
  }
            </pre>
          </div>
          <div class="problem-explanation">
            <h3>Что выведет и в чём проблема?</h3>
            <div class="issues">
              <div class="issue">
                <div class="issue-icon">⚠️</div>
                <div class="issue-text">
                  <p><strong>Проблема 1:</strong> <code>MyPartial</code> объявлен как пустой объектный тип, но должен быть дженериком (generic type).</p>
                </div>
              </div>
              <div class="issue">
                <div class="issue-icon">⚠️</div>
                <div class="issue-text">
                  <p><strong>Проблема 2:</strong> <code>UnUnser&lt;K&gt;</code> на самом деле является правильной реализацией Partial, но с другим названием.</p>
                </div>
              </div>
            </div>
            
            <h3>Правильное решение:</h3>
            <div class="code-block correct-solution">
              <pre>
  type User = {
    id: number;
  };
  
  type MyPartial&lt;T&gt; = {
    [key in keyof T]?: T[key];  
  };
    
  // Теперь можем использовать:
  type PartialUser = MyPartial&lt;User&gt;;
  // Результат: { id?: number | undefined }
              </pre>
            </div>
          </div>
        </div>
      </div>
  
      <div class="section">
        <h2>Практическое применение Partial</h2>
        <div class="use-cases">
          <div class="use-case">
            <h3>1. Обновление объекта (Partial Update)</h3>
            <div class="explanation">
              <p>Часто при обновлении сущности нужно передать только изменяемые поля, а не весь объект:</p>
            </div>
            <div class="code-block">
              <pre>
  interface User {
    id: number;
    name: string;
    email: string;
    age: number;
  }
  
  // Функция обновления пользователя
  function updateUser(userId: number, updates: Partial&lt;User&gt;) {
    // Обновляем только переданные поля
    // ...
  }
  
  // Использование:
  updateUser(123, { name: 'Иван' }); // ✅ Обновляем только имя
  updateUser(123, { age: 30 });      // ✅ Обновляем только возраст
              </pre>
            </div>
          </div>
  
          <div class="use-case">
            <h3>2. Опциональные параметры для функций</h3>
            <div class="explanation">
              <p>Когда вы хотите сделать все параметры опциональными:</p>
            </div>
            <div class="code-block">
              <pre>
  interface TableOptions {
    width: number;
    height: number;
    title: string;
    columns: string[];
  }
  
  // Все параметры необязательны
  function createTable(options: Partial&lt;TableOptions&gt;) {
    // Используем значения по умолчанию для отсутствующих параметров
    const width = options.width || 500;
    const height = options.height || 300;
    // ...
  }
  
  // Использование:
  createTable({ width: 800 }); // ✅ Передаём только ширину
              </pre>
            </div>
          </div>
  
          <div class="use-case">
            <h3>3. Фильтры и поиск</h3>
            <div class="explanation">
              <p>При создании фильтров или поисковых запросов:</p>
            </div>
            <div class="code-block">
              <pre>
  interface ProductFilter {
    category: string;
    minPrice: number;
    maxPrice: number;
    inStock: boolean;
  }
  
  // Поиск с частичными критериями
  function searchProducts(filter: Partial&lt;ProductFilter&gt;) {
    // Применяем только предоставленные фильтры
    // ...
  }
  
  // Использование:
  searchProducts({ category: 'Электроника' }); // ✅ Только по категории
  searchProducts({ minPrice: 1000, maxPrice: 5000 }); // ✅ Только по цене
              </pre>
            </div>
          </div>
        </div>
      </div>
  
      <div class="section">
        <h2>Другие полезные Utility Types</h2>
        <div class="other-utils">
          <div class="util-card">
            <h3>Required&lt;T&gt;</h3>
            <p>Противоположность Partial: делает все свойства <strong>обязательными</strong></p>
            <div class="code-block small">
              <pre>
  type Required&lt;T&gt; = {
    [K in keyof T]-?: T[K];
  };
              </pre>
            </div>
          </div>
  
          <div class="util-card">
            <h3>Pick&lt;T, K&gt;</h3>
            <p>Создаёт тип, выбирая только указанные свойства из T</p>
            <div class="code-block small">
              <pre>
  type Pick&lt;T, K extends keyof T&gt; = {
    [P in K]: T[P];
  };
              </pre>
            </div>
          </div>
  
          <div class="util-card">
            <h3>Omit&lt;T, K&gt;</h3>
            <p>Создаёт тип, исключая указанные свойства из T</p>
            <div class="code-block small">
              <pre>
  type Omit&lt;T, K extends keyof any&gt; = Pick&lt;T, Exclude&lt;keyof T, K&gt;&gt;;
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Состояние для анимации
  const animationStep = ref(0);
  
  // Функции для управления анимацией
  function nextStep() {
    if (animationStep.value < 4) {
      animationStep.value++;
    }
  }
  
  function resetAnimation() {
    animationStep.value = 0;
  }
  </script>
  
  <style scoped>
  .partial-explainer {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    color: #000;
    line-height: 1.6;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
  }
  
  .title {
    font-size: 2rem;
    color: #000;
    text-align: center;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    text-align: center;
    color: #555;
    margin-bottom: 2rem;
  }
  
  .section {
    margin-bottom: 3rem;
    padding: 1.5rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  h2 {
    border-bottom: 2px solid #333;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 1.6rem;
  }
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #000;
  }
  
  .code-block {
    background-color: #f5f5f5;
    border-radius: 5px;
    padding: 1rem;
    margin: 1rem 0;
    overflow-x: auto;
    border-left: 4px solid #333;
  }
  
  .code-block pre {
    font-family: 'Courier New', Courier, monospace;
    color: #000;
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
  }
  
  .small {
    font-size: 0.9em;
  }
  
  .explanation-steps {
    margin: 1.5rem 0;
  }
  
  .step {
    display: flex;
    margin-bottom: 1rem;
    align-items: flex-start;
  }
  
  .step-number {
    background-color: #333;
    color: white;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 1rem;
    flex-shrink: 0;
  }
  
  .step-text {
    flex: 1;
  }
  
  .step-text p {
    margin: 0;
  }
  
  /* Стили для анимации */
  .animation-container {
    background-color: #fff;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .animation-step {
    min-height: 300px;
  }
  
  .type-box {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
    width: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .type-title {
    background-color: #333;
    color: white;
    padding: 0.5rem;
    border-radius: 4px;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  .property {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    background-color: #fff;
    display: flex;
    align-items: center;
    transition: all 0.5s ease;
  }
  
  .property-name {
    font-weight: bold;
    margin-right: 0.5rem;
  }
  
  .property-type {
    color: #0066cc;
    margin-right: 0.5rem;
  }
  
  .required, .optional {
    border-radius: 4px;
    padding: 0.1rem 0.5rem;
    font-size: 0.8rem;
    margin-left: auto;
  }
  
  .required {
    background-color: #ffebee;
    color: #c62828;
  }
  
  .optional {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
  
  .transforming {
    background-color: #fff9c4;
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(255, 193, 7, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 193, 7, 0);
    }
  }
  
  .process-box {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .input-type, .output-type {
    flex: 1;
    min-width: 200px;
  }
  
  .process-arrow {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 1rem;
  }
  
  .arrow {
    font-size: 2rem;
    color: #333;
    margin-top: 0.5rem;
  }
  
  .result-box {
    display: flex;
    justify-content: center;
  }
  
  .final {
    width: 80%;
    margin: 0 auto;
    border: 2px solid #2e7d32;
  }
  
  .next-button, .restart-button {
    background-color: #333;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1.5rem;
    display: block;
    transition: background-color 0.3s;
  }
  
  .next-button:hover, .restart-button:hover {
    background-color: #555;
  }
  
  .restart-button {
    margin: 1.5rem auto 0;
  }
  
  /* Стили для разбора задачи */
  .problem-explanation {
    margin-top: 1.5rem;
  }
  
  .issues {
    margin: 1.5rem 0;
  }
  
  .issue {
    display: flex;
    margin-bottom: 1rem;
    align-items: flex-start;
  }
  
  .issue-icon {
    margin-right: 1rem;
    font-size: 1.2rem;
  }
  
  .issue-text {
    flex: 1;
  }
  
  .correct-solution {
    border-left: 4px solid #2e7d32;
    background-color: #e8f5e9;
  }
  
  /* Стили для практического применения */
  .use-cases {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .use-case {
    background-color: #fff;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  
  .use-case h3 {
    margin-top: 0;
    color: #333;
  }
  
  /* Стили для других utility types */
  .other-utils {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .util-card {
    background-color: #fff;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  
  .util-card h3 {
    margin-top: 0;
    color: #333;
  }
  
  /* Медиа-запросы для адаптивности */
  @media (max-width: 768px) {
    .process-box {
      flex-direction: column;
    }
    
    .process-arrow {
      transform: rotate(90deg);
      margin: 1rem 0;
    }
    
    .other-utils {
      grid-template-columns: 1fr;
    }
  }
  </style>