<template>
    <div class="typescript-demo">
      <h1>TypeScript в Nuxt 3</h1>
      <p class="intro">Изучаем TypeScript с нуля и как он используется в Nuxt 3</p>
      
      <div class="mode-selector">
        <button 
          v-for="mode in modes" 
          :key="mode.id"
          :class="{ active: currentMode === mode.id }"
          @click="currentMode = mode.id"
        >
          {{ mode.name }}
        </button>
      </div>
      
      <!-- Раздел "Что такое TypeScript" -->
      <div v-if="currentMode === 'intro'" class="section intro-section">
        <h2>Что такое TypeScript?</h2>
        
        <div class="concept-card">
          <div class="concept-header">
            <div class="concept-icon">
              <span class="ts-logo">TS</span>
            </div>
            <div class="concept-title">
              <h3>TypeScript — типизированный JavaScript</h3>
            </div>
          </div>
          
          <div class="concept-content">
            <p>TypeScript — это <strong>надмножество JavaScript</strong>, которое добавляет статическую типизацию. Это означает, что вы можете указывать типы данных для переменных, параметров функций и возвращаемых значений.</p>
            
            <div class="code-comparison">
              <div class="code-column">
                <h4>JavaScript</h4>
                <pre class="code-block"><code>function add(a, b) {
    return a + b;
  }
  
  // Можно вызвать как угодно
  add(5, 3);       // 8
  add("5", "3");   // "53"
  add(true, []);   // "true"</code></pre>
                <div class="code-description">
                  <p>В JavaScript функция <code>add</code> может получить любые аргументы, что потенциально приведет к неожиданным результатам.</p>
                </div>
              </div>
              
              <div class="code-arrow">
                <div class="arrow">→</div>
              </div>
              
              <div class="code-column">
                <h4>TypeScript</h4>
                <pre class="code-block"><code>function add(a: number, b: number): number {
    return a + b;
  }
  
  // Теперь компилятор проверит типы
  add(5, 3);       // 8
  add("5", "3");   // Ошибка!
  add(true, []);   // Ошибка!</code></pre>
                <div class="code-description">
                  <p>В TypeScript мы указываем, что функция принимает только числа и возвращает число, что помогает избежать ошибок.</p>
                </div>
              </div>
            </div>
            
            <div class="benefits">
              <h4>Преимущества TypeScript:</h4>
              <ul>
                <li><strong>Меньше ошибок в рантайме</strong> — многие ошибки обнаруживаются еще на этапе компиляции</li>
                <li><strong>Лучшая поддержка IDE</strong> — автодополнение, подсказки, навигация по коду</li>
                <li><strong>Лучшая документация</strong> — типы служат как документация к коду</li>
                <li><strong>Безопаснее рефакторинг</strong> — легче изменять код без неожиданных последствий</li>
                <li><strong>Лучшая масштабируемость</strong> — удобнее работать в больших проектах</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="concept-card">
          <div class="concept-header">
            <div class="concept-icon">
              <span class="compile-icon">{ }</span>
            </div>
            <div class="concept-title">
              <h3>Как это работает?</h3>
            </div>
          </div>
          
          <div class="concept-content">
            <p>TypeScript компилируется в обычный JavaScript, который запускается в браузерах или Node.js:</p>
            
            <div class="ts-workflow">
              <div class="workflow-step">
                <div class="workflow-icon">
                  <span class="file-icon">TS</span>
                </div>
                <div class="workflow-text">TypeScript код (.ts)</div>
              </div>
              <div class="workflow-arrow">→</div>
              <div class="workflow-step">
                <div class="workflow-icon">
                  <span class="compile-icon">tsc</span>
                </div>
                <div class="workflow-text">TypeScript компилятор</div>
              </div>
              <div class="workflow-arrow">→</div>
              <div class="workflow-step">
                <div class="workflow-icon">
                  <span class="file-icon">JS</span>
                </div>
                <div class="workflow-text">JavaScript код (.js)</div>
              </div>
              <div class="workflow-arrow">→</div>
              <div class="workflow-step">
                <div class="workflow-icon">
                  <span class="browser-icon">🌐</span>
                </div>
                <div class="workflow-text">Браузер или Node.js</div>
              </div>
            </div>
            
            <div class="important-note">
              <p><strong>Важно:</strong> Типы существуют только на этапе разработки и компиляции. В итоговом JavaScript-коде типов нет!</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Раздел "Основные типы" -->
      <div v-if="currentMode === 'types'" class="section types-section">
        <h2>Основные типы в TypeScript</h2>
        
        <div class="tabs">
          <div 
            v-for="tab in typeTabs" 
            :key="tab.id"
            :class="['tab', { active: currentTypeTab === tab.id }]"
            @click="currentTypeTab = tab.id"
          >
            {{ tab.name }}
          </div>
        </div>
        
        <div class="tab-content">
          <!-- Примитивные типы -->
          <div v-if="currentTypeTab === 'primitive'" class="type-category">
            <h3>Примитивные типы</h3>
            
            <div class="type-grid">
              <div v-for="type in primitiveTypes" :key="type.name" class="type-card">
                <div class="type-header">
                  <div class="type-name">{{ type.name }}</div>
                </div>
                <div class="type-example">
                  <pre><code>{{ type.example }}</code></pre>
                </div>
                <div class="type-description">
                  <p>{{ type.description }}</p>
                </div>
              </div>
            </div>
            
            <div class="type-playground">
              <h4>Примеры использования:</h4>
              <pre class="code-block"><code>// Объявление переменных с типами
  let isDone: boolean = false;
  let decimal: number = 6;
  let color: string = "blue";
  let notSure: any = 4;
  notSure = "может быть строкой";
  notSure = false; // или даже булевым значением
  
  // Контекстная типизация
  let sentence = `Привет, мое имя ${name}`;
  // TypeScript понимает, что sentence - это string
  // без явного указания типа</code></pre>
            </div>
          </div>
          
          <!-- Массивы и кортежи -->
          <div v-if="currentTypeTab === 'arrays'" class="type-category">
            <h3>Массивы и кортежи</h3>
            
            <div class="type-example-card">
              <h4>Массивы</h4>
              <pre class="code-block"><code>// Два способа объявить массив:
  let list1: number[] = [1, 2, 3];        // Способ 1
  let list2: Array&lt;number&gt; = [1, 2, 3];   // Способ 2 (дженерик)
  
  // Массив строк
  let names: string[] = ['Анна', 'Иван', 'Мария'];
  
  // Массив смешанных типов (избегайте any, когда возможно)
  let mixed: any[] = [1, 'привет', true];</code></pre>
              
              <div class="type-description">
                <p>Массивы в TypeScript типизируются по содержимому. Вы можете создавать массивы любых типов. Две записи <code>number[]</code> и <code>Array&lt;number&gt;</code> эквивалентны.</p>
              </div>
            </div>
            
            <div class="type-example-card">
              <h4>Кортежи (Tuples)</h4>
              <pre class="code-block"><code>// Кортеж - массив с фиксированным числом элементов
  // известных типов
  let person: [string, number] = ['Иван', 25];
  
  // Доступ к элементам по индексу
  console.log(person[0]); // Иван
  console.log(person[1]); // 25
  
  // Ошибка: Кортеж имеет 2 элемента
  // person[2] = 'что-то еще';
  
  // Также поддерживаются необязательные элементы
  let optTuple: [string, number?] = ['Иван'];
  // Второй элемент необязателен</code></pre>
              
              <div class="type-description">
                <p>Кортежи — это специальные массивы с заранее известным количеством элементов и их типами. Они полезны, когда вы хотите представить фиксированную структуру, например координаты точки [x, y] или пару ключ-значение.</p>
              </div>
            </div>
            
            <div class="type-animation">
              <div class="animation-title">Визуализация массива и кортежа:</div>
              <div class="animation-container">
                <div class="array-visual">
                  <div class="array-title">number[]</div>
                  <div class="array-items">
                    <div class="array-item" v-for="(item, index) in [1, 2, 3, 4, 5]" :key="index">
                      {{ item }}
                    </div>
                  </div>
                  <div class="array-type">все элементы: number</div>
                </div>
                
                <div class="tuple-visual">
                  <div class="array-title">[string, number, boolean]</div>
                  <div class="array-items">
                    <div class="array-item string-type">"Иван"</div>
                    <div class="array-item number-type">25</div>
                    <div class="array-item boolean-type">true</div>
                  </div>
                  <div class="array-type">фиксированные позиции с разными типами</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Объекты и интерфейсы -->
          <div v-if="currentTypeTab === 'objects'" class="type-category">
            <h3>Объекты и интерфейсы</h3>
            
            <div class="type-example-card">
              <h4>Типизация объектов</h4>
              <pre class="code-block"><code>// Анонимный тип объекта
  let user: { name: string; age: number } = {
    name: 'Иван',
    age: 30
  };
  
  // То же самое, но с интерфейсом:
  interface User {
    name: string;
    age: number;
    email?: string; // необязательное свойство (?)
    readonly id: number; // только для чтения
  }
  
  let admin: User = {
    name: 'Админ',
    age: 35,
    id: 1
  };
  
  // Ошибка: нельзя изменить id
  // admin.id = 2;
  
  // Расширение интерфейсов
  interface Employee extends User {
    salary: number;
    department: string;
  }
  
  let manager: Employee = {
    name: 'Менеджер',
    age: 40,
    id: 2,
    salary: 50000,
    department: 'Продажи'
  };</code></pre>
              
              <div class="type-description">
                <p>Интерфейсы — мощный способ определить структуру объектов. Они позволяют создавать многоразовые типы, которые можно расширять и реализовывать. Свойства могут быть обязательными, необязательными или только для чтения.</p>
              </div>
            </div>
            
            <div class="type-example-card">
              <h4>Типы vs. Интерфейсы</h4>
              <div class="comparison-table">
                <table>
                  <thead>
                    <tr>
                      <th>Интерфейс (interface)</th>
                      <th>Тип (type)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Можно объявлять несколько раз (они объединяются)</td>
                      <td>Нельзя объявлять несколько раз с одним именем</td>
                    </tr>
                    <tr>
                      <td>Может расширять интерфейсы и классы</td>
                      <td>Может расширять всё, включая примитивы, союзы, кортежи</td>
                    </tr>
                    <tr>
                      <td>Более "традиционно" для ООП</td>
                      <td>Более гибкий для сложных типов</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <pre class="code-block"><code>// Type alias (псевдоним типа)
  type Point = {
    x: number;
    y: number;
  };
  
  // Можно создавать сложные типы
  type ID = string | number;
  type UserID = ID;
  
  // Объединение и пересечение типов
  type A = { a: string };
  type B = { b: number };
  
  type AB = A & B;  // Пересечение: { a: string; b: number }
  type AorB = A | B;  // Объединение: { a: string } или { b: number }</code></pre>
            </div>
            
            <div class="important-note">
              <p><strong>Подводный камень:</strong> Выбирайте между <code>interface</code> и <code>type</code> осознанно. В Nuxt 3 рекомендуется использовать <code>interface</code> для объектов, которые могут расширяться, и <code>type</code> для более сложных случаев или когда нужны объединения/пересечения.</p>
            </div>
          </div>
          
          <!-- Функции -->
          <div v-if="currentTypeTab === 'functions'" class="type-category">
            <h3>Типизация функций</h3>
            
            <div class="type-example-card">
              <h4>Основы типизации функций</h4>
              <pre class="code-block"><code>// Типизация параметров и возвращаемого значения
  function greet(name: string): string {
    return `Привет, ${name}!`;
  }
  
  // Функция без возвращаемого значения
  function log(message: string): void {
    console.log(message);
  }
  
  // Функциональные типы (тип функции)
  type GreetFunction = (name: string) => string;
  
  const sayHello: GreetFunction = (name) => {
    return `Привет, ${name}!`;
  };
  
  // Необязательные и дефолтные параметры
  function buildName(firstName: string, lastName?: string): string {
    return lastName ? `${firstName} ${lastName}` : firstName;
  }
  
  function buildName2(firstName: string, lastName = "Иванов"): string {
    return `${firstName} ${lastName}`;
  }</code></pre>
              
              <div class="type-description">
                <p>Функции в TypeScript могут иметь типизированные параметры и возвращаемые значения. Вы можете создавать типы функций, использовать опциональные параметры (?) и параметры по умолчанию (=).</p>
              </div>
            </div>
            
            <div class="type-example-card">
              <h4>Rest-параметры и перегрузки</h4>
              <pre class="code-block"><code>// Rest параметры
  function sum(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
  }
  
  console.log(sum(1, 2, 3, 4)); // 10
  
  // Перегрузки функций
  function processValue(value: number): number;
  function processValue(value: string): string;
  function processValue(value: number | string): number | string {
    if (typeof value === 'number') {
      return value * 2;
    } else {
      return value.toUpperCase();
    }
  }
  
  console.log(processValue(10));      // 20
  console.log(processValue("hello")); // "HELLO"</code></pre>
              
              <div class="type-description">
                <p>TypeScript поддерживает rest-параметры для функций с переменным числом аргументов. Перегрузки функций позволяют определить несколько сигнатур для одной функции, что делает её использование более типобезопасным.</p>
              </div>
            </div>
            
            <div class="animation-container function-animation">
              <div class="animation-title">Визуализация типизированной функции:</div>
              <div class="function-visual">
                <div class="function-declaration">
                  <span class="keyword">function</span> 
                  <span class="function-name">calculateTotal</span>
                  <span class="punctuation">(</span>
                  <span class="param-name">price</span>
                  <span class="punctuation">:</span> 
                  <span class="param-type">number</span>
                  <span class="punctuation">,</span> 
                  <span class="param-name">quantity</span>
                  <span class="punctuation">:</span> 
                  <span class="param-type">number</span>
                  <span class="punctuation">)</span>
                  <span class="punctuation">:</span> 
                  <span class="return-type">number</span> 
                  <span class="punctuation">{</span>
                  <div class="function-body">
                    <span class="keyword">return</span> price * quantity;
                  </div>
                  <span class="punctuation">}</span>
                </div>
                <div class="function-parts">
                  <div class="part params">
                    <div class="part-arrow" style="left: 80px; width: 170px;"></div>
                    <div class="part-label">Параметры с типами</div>
                  </div>
                  <div class="part return">
                    <div class="part-arrow" style="left: 280px; width: 70px;"></div>
                    <div class="part-label">Возвращаемый тип</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Продвинутые типы -->
          <div v-if="currentTypeTab === 'advanced'" class="type-category">
            <h3>Продвинутые типы</h3>
            
            <div class="type-example-card">
              <h4>Объединения и пересечения</h4>
              <pre class="code-block"><code>// Объединение типов (Union Types)
  type ID = string | number;
  
  let id: ID = 101;  // OK
  id = "abc";        // OK
  // id = true;      // Ошибка: boolean не является частью типа ID
  
  // Пересечение типов (Intersection Types)
  type Person = {
    name: string;
    age: number;
  };
  
  type Employee = {
    employeeId: number;
    department: string;
  };
  
  type EmployeePerson = Person & Employee;
  
  const worker: EmployeePerson = {
    name: "Иван",
    age: 30,
    employeeId: 1,
    department: "IT"
  };</code></pre>
              
              <div class="type-description">
                <p>Объединения (|) позволяют переменной иметь один из нескольких типов. Пересечения (&) комбинируют несколько типов в один, требуя наличия всех свойств из обоих типов.</p>
              </div>
            </div>
            
            <div class="type-example-card">
              <h4>Дженерики (Generics)</h4>
              <pre class="code-block"><code>// Дженерики позволяют создавать переиспользуемые
  // компоненты с различными типами данных
  
  // Дженерик-функция
  function identity&lt;T&gt;(arg: T): T {
    return arg;
  }
  
  let output1 = identity&lt;string&gt;("myString");  // тип: string
  let output2 = identity(100);                 // тип: number (автовывод)
  
  // Дженерик-интерфейс
  interface Box&lt;T&gt; {
    value: T;
  }
  
  let boxOfStrings: Box&lt;string&gt; = { value: "hello" };
  let boxOfNumbers: Box&lt;number&gt; = { value: 42 };
  
  // Дженерики с ограничениями
  interface Lengthwise {
    length: number;
  }
  
  function getLength&lt;T extends Lengthwise&gt;(arg: T): number {
    return arg.length;
  }
  
  console.log(getLength("string"));       // 6
  console.log(getLength([1, 2, 3]));      // 3
  // console.log(getLength(123));         // Ошибка: 123 не имеет свойства length</code></pre>
              
              <div class="type-description">
                <p>Дженерики — мощный инструмент для создания многоразовых компонентов. Они позволяют определить типы как параметры, чтобы один и тот же код мог работать с разными типами, сохраняя при этом типобезопасность.</p>
              </div>
            </div>
            
            <div class="type-animation">
              <div class="animation-title">Визуализация дженериков:</div>
              <div class="animation-container">
                <div class="generic-visual">
                  <div class="generic-code">
                    <div class="line">interface List&lt;<span class="type-param">T</span>&gt; {</div>
                    <div class="line indent">items: <span class="type-param">T</span>[];</div>
                    <div class="line indent">add(item: <span class="type-param">T</span>): void;</div>
                    <div class="line indent">getFirst(): <span class="type-param">T</span>;</div>
                    <div class="line">}</div>
                  </div>
                  
                  <div class="generic-instances">
                    <div class="instance">
                      <div class="instance-title">List&lt;string&gt;</div>
                      <div class="instance-code">
                        <div class="line">interface List&lt;<span class="string-type">string</span>&gt; {</div>
                        <div class="line indent">items: <span class="string-type">string</span>[];</div>
                        <div class="line indent">add(item: <span class="string-type">string</span>): void;</div>
                        <div class="line indent">getFirst(): <span class="string-type">string</span>;</div>
                        <div class="line">}</div>
                      </div>
                    </div>
                    
                    <div class="instance">
                      <div class="instance-title">List&lt;number&gt;</div>
                      <div class="instance-code">
                        <div class="line">interface List&lt;<span class="number-type">number</span>&gt; {</div>
                        <div class="line indent">items: <span class="number-type">number</span>[];</div>
                        <div class="line indent">add(item: <span class="number-type">number</span>): void;</div>
                        <div class="line indent">getFirst(): <span class="number-type">number</span>;</div>
                        <div class="line">}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Раздел "TypeScript в Nuxt 3" -->
      <div v-if="currentMode === 'nuxt'" class="section nuxt-section">
        <h2>TypeScript в Nuxt 3</h2>
        
        <div class="nuxt-info">
          <p>Nuxt 3 полностью построен на TypeScript и предоставляет первоклассную поддержку типов. Даже если вы не используете TypeScript напрямую, вы получаете преимущества благодаря автодополнению и проверке типов.</p>
        </div>
        
        <div class="tabs nuxt-tabs">
          <div 
            v-for="tab in nuxtTabs" 
            :key="tab.id"
            :class="['tab', { active: currentNuxtTab === tab.id }]"
            @click="currentNuxtTab = tab.id"
          >
            {{ tab.name }}
          </div>
        </div>
        
        <div class="tab-content">
          <!-- Настройка TypeScript в Nuxt 3 -->
          <div v-if="currentNuxtTab === 'setup'" class="nuxt-category">
            <h3>Настройка TypeScript в Nuxt 3</h3>
            
            <div class="nuxt-example-card">
              <h4>Структура файлов</h4>
              <pre class="code-block file-structure"><code>my-nuxt-app/
  ├── tsconfig.json        # Конфигурация TypeScript
  ├── nuxt.config.ts       # Конфигурация Nuxt (в TypeScript)
  ├── app.vue              # Корневой компонент
  ├── components/          # Vue компоненты
  ├── composables/         # Композабл-функции
  ├── pages/               # Страницы (маршруты)
  ├── layouts/             # Шаблоны страниц
  ├── plugins/             # Плагины Nuxt
  ├── server/              # Серверный код
  └── types/               # Пользовательские типы</code></pre>
              
              <div class="nuxt-description">
                <p>В Nuxt 3 TypeScript включен по умолчанию. Основные файлы конфигурации уже настроены при создании проекта через <code>npx nuxi init</code>.</p>
              </div>
            </div>
            
            <div class="nuxt-example-card">
              <h4>tsconfig.json</h4>
              <pre class="code-block"><code>{
    // Файл создается Nuxt автоматически
    "extends": "./.nuxt/tsconfig.json",
    "compilerOptions": {
      // Дополнительные опции компилятора
      "strict": true,
      "skipLibCheck": true
    }
  }</code></pre>
              
              <div class="nuxt-description">
                <p>Nuxt 3 генерирует базовый <code>tsconfig.json</code> с правильными путями и настройками. Вы можете расширить его своими параметрами.</p>
              </div>
            </div>
            
            <div class="nuxt-example-card">
              <h4>Подводные камни при настройке</h4>
              <div class="pitfalls-list">
                <div class="pitfall">
                  <h5>Путь к типам</h5>
                  <p>Когда вы добавляете свои типы, убедитесь, что они находятся в папке <code>~/types</code> или вам нужно настроить <code>tsconfig.json</code> для их правильного импорта.</p>
                </div>
                <div class="pitfall">
                  <h5>Режим strict</h5>
                  <p>По умолчанию режим <code>strict</code> может быть отключен. Рекомендуется включить его, чтобы получить максимальную выгоду от TypeScript.</p>
                </div>
                <div class="pitfall">
                  <h5>Обновления Nuxt</h5>
                  <p>После обновления Nuxt, файл <code>.nuxt/tsconfig.json</code> может быть перегенерирован, не забудьте проверить ваши кастомные настройки.</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Vue компоненты с TypeScript -->
          <div v-if="currentNuxtTab === 'components'" class="nuxt-category">
            <h3>Vue компоненты с TypeScript</h3>
            
            <div class="nuxt-example-card">
              <h4>Типизация в компонентах с Composition API</h4>
              <pre class="code-block"><code>&lt;script setup lang="ts"&gt;
  // Импорт типов
  import { User } from '~/types/user';
  
  // Типизация ref
  const count = ref&lt;number&gt;(0);
  const message = ref&lt;string&gt;('Привет');
  
  // TypeScript автоматически выводит типы
  const autoTyped = ref(42); // тип: Ref&lt;number&gt;
  
  // Типизация reactive
  const user = reactive&lt;User&gt;({
    id: 1,
    name: 'Иван',
    email: 'ivan@example.com'
  });
  
  // Типизация props
  const props = defineProps&lt;{
    title: string;
    items: string[];
    user?: User; // Необязательный prop
  }&gt;();
  
  // Типизация emit
  const emit = defineEmits&lt;{
    (e: 'update', id: number): void;
    (e: 'delete', id: number): void;
  }&gt;();
  
  // Типизация функций
  function increment(step: number = 1): void {
    count.value += step;
  }
  
  // Асинхронные функции
  async function fetchUser(id: number): Promise&lt;User&gt; {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  }
  &lt;/script&gt;
  
  &lt;template&gt;
    &lt;div&gt;
      &lt;h1&gt;{{ props.title }}&lt;/h1&gt;
      &lt;p&gt;Счётчик: {{ count }}&lt;/p&gt;
      &lt;button @click="increment()"&gt;+1&lt;/button&gt;
      &lt;button @click="increment(5)"&gt;+5&lt;/button&gt;
    &lt;/div&gt;
  &lt;/template&gt;</code></pre>
              
              <div class="nuxt-description">
                <p>С <code>&lt;script setup lang="ts"&gt;</code> вы получаете полную поддержку TypeScript в Vue компонентах. Vue 3 и Nuxt 3 обеспечивают автоматический вывод типов для ref, reactive и других API.</p>
              </div>
            </div>
            
            <div class="nuxt-example-card">
              <h4>Глобальные типы компонентов</h4>
              <pre class="code-block"><code>// types/components.d.ts
  import { DefineComponent } from 'vue';
  
  declare module '@vue/runtime-core' {
    export interface GlobalComponents {
      // Автодополнение для глобальных компонентов
      AppButton: DefineComponent&lt;{
        size?: 'small' | 'medium' | 'large';
        color?: 'primary' | 'secondary' | 'danger';
        disabled?: boolean;
      }&gt;;
      
      AppInput: DefineComponent&lt;{
        modelValue: string;
        placeholder?: string;
        type?: 'text' | 'password' | 'email';
      }&gt;;
    }
  }</code></pre>
              
              <div class="nuxt-description">
                <p>Вы можете определить типы для ваших глобальных компонентов, чтобы получить автодополнение при их использовании в шаблонах.</p>
              </div>
              
              <div class="nuxt-highlight">
                <p><strong>Подводный камень:</strong> Nuxt автоматически регистрирует компоненты из директории <code>components/</code>, но для полной поддержки типов вам может понадобиться определить их интерфейсы вручную.</p>
              </div>
            </div>
            
            <div class="animation-container">
              <div class="animation-title">Преимущества TypeScript в компонентах:</div>
              <div class="ts-benefits-animation">
                <div class="benefit-card">
                  <div class="benefit-icon">✓</div>
                  <div class="benefit-title">Автодополнение props</div>
                  <div class="benefit-visual">
                    <div class="code-snippet">
                      <span>&lt;MyComponent </span>
                      <span class="highlight-props">title="Hello" :count="5"</span>
                      <span> /&gt;</span>
                    </div>
                  </div>
                </div>
                
                <div class="benefit-card">
                  <div class="benefit-icon">✓</div>
                  <div class="benefit-title">Проверка типов</div>
                  <div class="benefit-visual">
                    <div class="code-snippet">
                      <span>const value: string = </span>
                      <span class="error-highlight">42</span>
                      <span> // Ошибка!</span>
                    </div>
                  </div>
                </div>
                
                <div class="benefit-card">
                  <div class="benefit-icon">✓</div>
                  <div class="benefit-title">Безопасный рефакторинг</div>
                  <div class="benefit-visual">
                    <div class="code-snippet">
                      <span class="rename-highlight">user.name</span>
                      <span> → переименование во всех файлах</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Composables и типы -->
          <div v-if="currentNuxtTab === 'composables'" class="nuxt-category">
            <h3>Типизация Composables</h3>
            
            <div class="nuxt-example-card">
              <h4>Создание типизированного composable</h4>
              <pre class="code-block"><code>// composables/useCounter.ts
  import { ref } from 'vue';
  
  export interface UseCounterOptions {
    initial?: number;
    min?: number;
    max?: number;
  }
  
  export interface UseCounterReturn {
    count: Ref&lt;number&gt;;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
  }
  
  export function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
    const {
      initial = 0,
      min = Number.MIN_SAFE_INTEGER,
      max = Number.MAX_SAFE_INTEGER
    } = options;
    
    const count = ref(initial);
    
    function increment() {
      if (count.value &lt; max) {
        count.value++;
      }
    }
    
    function decrement() {
      if (count.value > min) {
        count.value--;
      }
    }
    
    function reset() {
      count.value = initial;
    }
    
    return {
      count,
      increment,
      decrement,
      reset
    };
  }</code></pre>
              
              <div class="nuxt-description">
                <p>Composables — переиспользуемые функции для логики компонентов. Хорошая практика — определять интерфейсы для входных опций и возвращаемого значения.</p>
              </div>
            </div>
            
            <div class="nuxt-example-card">
              <h4>Использование composable в компоненте</h4>
              <pre class="code-block"><code>&lt;script setup lang="ts"&gt;
  import { useCounter } from '~/composables/useCounter';
  
  // TypeScript знает типы всех возвращаемых значений
  const { count, increment, decrement, reset } = useCounter({
    initial: 10,
    min: 0,
    max: 20
  });
  
  // Можно также указать возвращаемый тип явно
  const counter = useCounter(); // Тип: UseCounterReturn
  &lt;/script&gt;
  
  &lt;template&gt;
    &lt;div&gt;
      &lt;p&gt;Счётчик: {{ count }}&lt;/p&gt;
      &lt;button @click="increment"&gt;+&lt;/button&gt;
      &lt;button @click="decrement"&gt;-&lt;/button&gt;
      &lt;button @click="reset"&gt;Сброс&lt;/button&gt;
    &lt;/div&gt;
  &lt;/template&gt;</code></pre>
              
              <div class="nuxt-description">
                <p>При использовании типизированных composables вы получаете автодополнение и проверку типов для всех опций и возвращаемых значений.</p>
              </div>
            </div>
            
            <div class="nuxt-highlight">
              <h4>Подводные камни при работе с composables:</h4>
              <ul>
                <li><strong>Утечка типов:</strong> Старайтесь не использовать <code>any</code> в composables, так как это уничтожает преимущества TypeScript.</li>
                <li><strong>Чрезмерное усложнение:</strong> Не перегружайте composables слишком сложными типами, это может сделать их трудными для понимания.</li>
                <li><strong>Циклические зависимости:</strong> Будьте осторожны с взаимными импортами между composables, это может привести к проблемам с типами.</li>
              </ul>
            </div>
          </div>
          
          <!-- API маршруты и серверный код -->
          <div v-if="currentNuxtTab === 'server'" class="nuxt-category">
            <h3>Типизация серверного кода</h3>
            
            <div class="nuxt-example-card">
              <h4>Типизированные API маршруты</h4>
              <pre class="code-block"><code>// server/api/users/[id].ts
  import { defineEventHandler, getRouterParam } from 'h3';
  
  // Определение интерфейса для пользователя
  interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'guest';
  }
  
  export default defineEventHandler(async (event) => {
    // Получение параметра с типом
    const id = parseInt(getRouterParam(event, 'id') || '0');
    
    // Проверка типа
    if (isNaN(id) || id &lt;= 0) {
      throw createError({
        statusCode: 400,
        message: 'Invalid user ID'
      });
    }
    
    // Пример данных (в реальности - из БД)
    const user: User = {
      id,
      name: 'Пользователь ' + id,
      email: `user${id}@example.com`,
      role: 'user'
    };
    
    return user;
  });</code></pre>
              
              <div class="nuxt-description">
                <p>API маршруты в Nuxt 3 полностью поддерживают TypeScript. Вы можете определять типы для запросов, ответов и промежуточных данных.</p>
              </div>
            </div>
            
            <div class="nuxt-example-card">
              <h4>Типизация Nitro Runtime</h4>
              <pre class="code-block"><code>// types/nitro.d.ts
  import { H3Event } from 'h3';
  
  declare module 'nitropack' {
    // Добавляем пользовательскую конфигурацию
    interface NitroRuntimeConfig {
      apiSecret: string;
      database: {
        host: string;
        port: number;
      };
    }
  }
  
  // Расширяем события
  declare module 'h3' {
    interface H3EventContext {
      // Добавляем пользовательские свойства контекста
      user?: {
        id: number;
        role: string;
      };
    }
  }</code></pre>
              
              <div class="nuxt-description">
                <p>Вы можете расширять типы Nitro Runtime (серверный движок Nuxt) для добавления поддержки пользовательских конфигураций и контекста.</p>
              </div>
            </div>
            
            <div class="nuxt-example-card">
              <h4>Типизация middleware</h4>
              <pre class="code-block"><code>// server/middleware/auth.ts
  import { defineEventHandler, getHeader } from 'h3';
  
  export default defineEventHandler((event) => {
    // Типизированный заголовок
    const token = getHeader(event, 'Authorization');
    
    if (!token) {
      // Ранний возврат при отсутствии токена
      return;
    }
    
    try {
      // В реальном приложении - проверка токена
      const payload = verifyToken(token);
      
      // Типизированное добавление в контекст
      event.context.user = {
        id: payload.userId,
        role: payload.role
      };
    } catch (error) {
      console.error('Ошибка проверки токена', error);
    }
  });</code></pre>
              
              <div class="nuxt-description">
                <p>Middleware в Nuxt 3 также типизированы. Вы можете использовать типы для проверки заголовков, параметров и добавления данных в контекст запроса.</p>
              </div>
            </div>
            
            <div class="animation-container server-animation">
              <div class="animation-title">Взаимодействие клиент-сервер с типами:</div>
              <div class="client-server-flow">
                <div class="client-side">
                  <div class="client-code">
                    <pre><code>// Клиентский код
  const { data } = await useFetch&lt;User&gt;('/api/users/1');
  console.log(data.value?.name); // Типизировано!</code></pre>
                  </div>
                </div>
                
                <div class="data-flow">
                  <div class="request-arrow">
                    <div class="arrow-line"></div>
                    <div class="request-label">запрос</div>
                  </div>
                  <div class="response-arrow">
                    <div class="arrow-line"></div>
                    <div class="response-label">ответ: User</div>
                  </div>
                </div>
                
                <div class="server-side">
                  <div class="server-code">
                    <pre><code>// Серверный код
  export default defineEventHandler((): User => {
    // Возвращаем типизированный объект
    return { id: 1, name: 'Иван', ... };
  });</code></pre>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="nuxt-highlight">
              <h4>Важное замечание:</h4>
              <p>TypeScript работает только во время разработки. На сервере выполняется скомпилированный JavaScript. Убедитесь, что вы добавляете также проверки во время выполнения для обеспечения безопасности.</p>
            </div>
          </div>
          
          <!-- Автодополнение и генерация типов -->
          <div v-if="currentNuxtTab === 'autocomplete'" class="nuxt-category">
            <h3>Автодополнение и генерация типов</h3>
            
            <div class="nuxt-example-card">
              <h4>Автодополнение в Nuxt 3</h4>
              <div class="autocomplete-example">
                <div class="code-editor">
                  <div class="editor-line"><span class="comment">// Автодополнение для API Nuxt</span></div>
                  <div class="editor-line"><span class="keyword">const</span> <span class="variable">config</span> = <span class="function">useRuntimeConfig</span>();</div>
                  <div class="editor-line autocomplete-line">config.<span class="complete-cursor">|</span></div>
                  <div class="autocomplete-popup">
                    <div class="autocomplete-item">app <span class="type-hint">object</span></div>
                    <div class="autocomplete-item selected">public <span class="type-hint">object</span></div>
                    <div class="autocomplete-item">apiSecret <span class="type-hint">string</span></div>
                    <div class="autocomplete-item">database <span class="type-hint">object</span></div>
                  </div>
                </div>
              </div>
              
              <div class="nuxt-description">
                <p>Nuxt 3 автоматически генерирует типы для всего фреймворка, включая конфигурацию, маршруты, хуки и API. Это обеспечивает отличное автодополнение в редакторах, поддерживающих TypeScript.</p>
              </div>
            </div>
            
            <div class="nuxt-example-card">
              <h4>Генерация типов и .nuxt/typed-router</h4>
              <pre class="code-block"><code>// Автоматически генерируемые маршруты и их типы
  import { useRoute, useRouter } from 'vue-router';
  
  // Типизированные маршруты для /users/[id]
  const route = useRoute('users-id');
  const id = route.params.id; // Тип: string или string[]
  
  // Типизированная навигация
  const router = useRouter();
  router.push({
    name: 'users-id',
    params: { id: '123' }
  });</code></pre>
              
              <div class="nuxt-description">
                <p>Nuxt генерирует типы для маршрутов на основе структуры файлов в директории <code>pages/</code>. Это обеспечивает типизированный доступ к параметрам маршрута и навигации.</p>
              </div>
            </div>
            
            <div class="nuxt-example-card">
              <h4>Пользовательские декларации типов</h4>
              <pre class="code-block"><code>// types/global.d.ts
  
  // Расширение глобального namespace
  declare global {
    // Добавление глобальных типов
    interface Window {
      myApp: {
        version: string;
        features: string[];
      };
    }
  }
  
  // Объявление модулей для нетипизированных библиотек
  declare module 'untyped-library' {
    export function someFunction(arg: string): number;
    export const VERSION: string;
  }
  
  // Обязательный экспорт
  export {};</code></pre>
              
              <div class="nuxt-description">
                <p>Вы можете добавлять собственные декларации типов для расширения глобальных объектов или добавления типов для библиотек, у которых их нет.</p>
              </div>
            </div>
            
            <div class="nuxt-highlight warning">
              <h4>Подводный камень при работе с автодополнением:</h4>
              <p>При изменении структуры проекта или конфигурации, типы могут не обновиться автоматически. Используйте команду <code>nuxi prepare</code> или <code>nuxi typecheck</code> для генерации свежих типов и проверки проекта.</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Раздел "Подводные камни" -->
      <div v-if="currentMode === 'pitfalls'" class="section pitfalls-section">
        <h2>Подводные камни TypeScript в Nuxt 3</h2>
        
        <div class="pitfall-card">
          <div class="pitfall-header">
            <div class="pitfall-icon">⚠️</div>
            <h3>Типы и Runtime</h3>
          </div>
          <div class="pitfall-content">
            <p class="pitfall-description">Один из самых распространённых подводных камней — забыть, что типы существуют только во время компиляции, но не во время выполнения.</p>
            
            <div class="code-example">
              <div class="wrong-example">
                <h4>❌ Неправильно</h4>
                <pre class="code-block"><code>// Типизация через enum
  enum UserRole {
    Admin = 'admin',
    User = 'user',
    Guest = 'guest'
  }
  
  // Попытка проверки в рантайме
  function hasAccess(role: UserRole) {
    if (role === UserRole.Admin) {
      return true;
    }
    return false;
  }
  
  // Опасность! Типы стираются при компиляции
  type ApiResponse = {
    success: boolean;
    data?: any;
  };
  
  function handleResponse(response: ApiResponse) {
    // Нет проверки структуры в рантайме
    console.log(response.data.items); // Может упасть!
  }</code></pre>
              </div>
              <div class="right-example">
                <h4>✅ Правильно</h4>
                <pre class="code-block"><code>// Использование const enum или объектов
  const UserRole = {
    Admin: 'admin',
    User: 'user',
    Guest: 'guest'
  } as const;
  type UserRoleType = typeof UserRole[keyof typeof UserRole];
  
  // Проверка будет работать и в рантайме
  function hasAccess(role: UserRoleType) {
    if (role === UserRole.Admin) {
      return true;
    }
    return false;
  }
  
  // Проверка в рантайме
  function isApiResponse(obj: any): obj is ApiResponse {
    return typeof obj === 'object' &&
      obj !== null &&
      'success' in obj;
  }
  
  function handleResponse(response: unknown) {
    if (isApiResponse(response) && 
        response.data && 
        'items' in response.data) {
      console.log(response.data.items);
    }
  }</code></pre>
              </div>
            </div>
            
            <div class="pitfall-solution">
              <h4>Решение:</h4>
              <ul>
                <li>Используйте константы вместо только типов для значений, которые нужны в рантайме</li>
                <li>Применяйте защитные проверки типов (type guards) для валидации данных</li>
                <li>Рассмотрите библиотеки валидации, такие как Zod или Yup</li>
                <li>Помните, что интерфейсы и типы не существуют во время выполнения</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="pitfall-card">
          <div class="pitfall-header">
            <div class="pitfall-icon">⚠️</div>
            <h3>Сложность с генерируемыми типами</h3>
          </div>
          <div class="pitfall-content">
            <p class="pitfall-description">Nuxt 3 автоматически генерирует много типов, что иногда может вызвать сложности при отладке и расширении.</p>
            
            <div class="code-example">
              <div class="wrong-example">
                <h4>❌ Проблемные ситуации</h4>
                <pre class="code-block"><code>// Непонятные ошибки типов
  // TS2345: Argument of type '{ path: string; }' is not
  // assignable to parameter of type 'RouteLocationRaw'.
  
  // Сложные автогенерируемые типы
  const route = useRoute(); // Тип очень сложный
  // infer N extends string = "all-blog",
  // infer S extends string = string,
  // infer _P extends ParamValue = ParamValue,
  // infer _Q extends LocationQuery = LocationQuery,
  // infer _H extends HistoryState = HistoryState
  
  // Несоответствие между автоматически сгенерированными
  // типами и фактически ожидаемыми значениями
  const layout = definePageMeta({
    layout: 'custom' // А если layout не существует?
  });</code></pre>
              </div>
              <div class="right-example">
                <h4>✅ Решения</h4>
                <pre class="code-block"><code>// Явное определение типов маршрутов
  // types/router.d.ts
  declare module '#app' {
    interface PageMeta {
      // Дополнительные свойства для pagesMeta
      auth?: boolean;
      roles?: string[];
    }
  }
  
  // Расширение типов
  export interface LayoutsList {
    default: any;
    custom: any;
    admin: any;
  }
  
  // Использование
  const layout = definePageMeta({
    layout: 'custom' as keyof LayoutsList
  });
  
  // Частичное определение типов для проверки
  const route = useRoute('users-id'); // Более специфичный тип</code></pre>
              </div>
            </div>
            
            <div class="pitfall-solution">
              <h4>Решение:</h4>
              <ul>
                <li>Расширяйте автогенерируемые типы через декларации модулей</li>
                <li>Используйте явные имена маршрутов вместо общего <code>useRoute()</code></li>
                <li>Создавайте собственные интерфейсы для страниц, макетов и других шаблонных элементов</li>
                <li>Проверяйте сгенерированные типы в <code>.nuxt/types</code> для лучшего понимания</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="pitfall-card">
          <div class="pitfall-header">
            <div class="pitfall-icon">⚠️</div>
            <h3>any и unknown</h3>
          </div>
          <div class="pitfall-content">
            <p class="pitfall-description">Неправильное использование <code>any</code> и <code>unknown</code> может свести на нет все преимущества TypeScript.</p>
            
            <div class="code-example">
              <div class="wrong-example">
                <h4>❌ Неправильно</h4>
                <pre class="code-block"><code>// Чрезмерное использование any
  function processData(data: any) {
    return data.value * 2; // Нет проверки типов!
  }
  
  // any распространяется на всю кодовую базу
  function getUser(): any {
    return { name: 'Иван', age: 30 };
  }
  const user = getUser();
  user.nonExistentProperty.doSomething(); // Нет ошибки!
  
  // Избыточное приведение типов
  const input = document.getElementById('myInput') as any;
  input.value = 'Текст'; // Опасно!</code></pre>
              </div>
              <div class="right-example">
                <h4>✅ Правильно</h4>
                <pre class="code-block"><code>// Использование unknown с проверкой типов
  function processData(data: unknown): number {
    if (typeof data === 'object' && data && 'value' in data) {
      return data.value * 2;
    }
    throw new Error('Invalid data format');
  }
  
  // Правильное определение возвращаемого типа
  interface User {
    name: string;
    age: number;
  }
  function getUser(): User {
    return { name: 'Иван', age: 30 };
  }
  
  // Безопасное приведение типов
  const input = document.getElementById('myInput');
  if (input instanceof HTMLInputElement) {
    input.value = 'Текст'; // Безопасно!
  }</code></pre>
              </div>
            </div>
            
            <div class="pitfall-solution">
              <h4>Решение:</h4>
              <ul>
                <li>Избегайте использования <code>any</code> и предпочитайте <code>unknown</code> с последующими проверками типов</li>
                <li>Определяйте интерфейсы для структур данных</li>
                <li>Используйте защитные проверки типов вместо небезопасного приведения типов</li>
                <li>Включите опцию <code>noImplicitAny</code> в tsconfig для обнаружения неявных any</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="tips-section">
          <h3>Советы для избежания подводных камней</h3>
          <div class="tips-list">
            <div class="tip-item">
              <div class="tip-icon">💡</div>
              <div class="tip-content">
                <h4>Придерживайтесь строгого режима</h4>
                <p>Включите <code>strict: true</code> в <code>tsconfig.json</code>, чтобы TypeScript проверял больше потенциальных ошибок.</p>
              </div>
            </div>
            
            <div class="tip-item">
              <div class="tip-icon">💡</div>
              <div class="tip-content">
                <h4>Используйте утилиты типов</h4>
                <p>Встроенные утилиты типов, такие как <code>Partial&lt;T&gt;</code>, <code>Required&lt;T&gt;</code>, <code>Pick&lt;T, K&gt;</code>, могут сделать ваш код более гибким и безопасным.</p>
              </div>
            </div>
            
            <div class="tip-item">
              <div class="tip-icon">💡</div>
              <div class="tip-content">
                <h4>Не перебарщивайте с типами</h4>
                <p>Стремитесь к балансу между безопасностью типов и читаемостью кода. Иногда слишком сложные типы могут сделать код непонятным.</p>
              </div>
            </div>
            
            <div class="tip-item">
              <div class="tip-icon">💡</div>
              <div class="tip-content">
                <h4>Регулярно обновляйте зависимости</h4>
                <p>TypeScript и Nuxt постоянно улучшаются. Регулярные обновления помогут вам получить новые функции и исправления ошибок.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Раздел "Практикум" -->
      <div v-if="currentMode === 'practice'" class="section practice-section">
        <h2>Практикум: TypeScript в Nuxt 3</h2>
        
        <div class="exercise-selector">
          <button 
            v-for="(exercise, index) in exercises" 
            :key="index"
            :class="{ active: currentExercise === index }"
            @click="currentExercise = index"
          >
            Упражнение {{ index + 1 }}
          </button>
        </div>
        
        <div class="exercise-container">
          <div class="exercise-header">
            <h3>{{ exercises[currentExercise].title }}</h3>
            <div class="difficulty-badge" :class="exercises[currentExercise].difficulty">
              {{ exercises[currentExercise].difficulty }}
            </div>
          </div>
          
          <div class="exercise-description">
            <p>{{ exercises[currentExercise].description }}</p>
          </div>
          
          <div class="exercise-task">
            <div class="task-header">
              <h4>Задание:</h4>
              <div class="controls">
                <button @click="resetExercise" class="reset-btn">Сбросить</button>
                <button @click="showHint" v-if="!hintShown" class="hint-btn">Подсказка</button>
                <button @click="toggleSolution" class="solution-btn">
                  {{ solutionShown ? 'Скрыть решение' : 'Показать решение' }}
                </button>
              </div>
            </div>
            
            <div class="code-editor">
              <pre class="code-block"><code>{{ exercises[currentExercise].initialCode }}</code></pre>
            </div>
            
            <div v-if="hintShown" class="exercise-hint">
              <h4>Подсказка:</h4>
              <p>{{ exercises[currentExercise].hint }}</p>
            </div>
            
            <div v-if="solutionShown" class="exercise-solution">
              <h4>Решение:</h4>
              <pre class="code-block"><code>{{ exercises[currentExercise].solution }}</code></pre>
              <div class="solution-explanation">
                <h4>Объяснение:</h4>
                <p>{{ exercises[currentExercise].explanation }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Режимы навигации
  const modes = [
    { id: 'intro', name: 'Что такое TypeScript?' },
    { id: 'types', name: 'Основные типы' },
    { id: 'nuxt', name: 'TypeScript в Nuxt 3' },
    { id: 'pitfalls', name: 'Подводные камни' },
    { id: 'practice', name: 'Практикум' }
  ];
  
  const currentMode = ref('intro');
  
  // Вкладки для раздела типов
  const typeTabs = [
    { id: 'primitive', name: 'Примитивные' },
    { id: 'arrays', name: 'Массивы и кортежи' },
    { id: 'objects', name: 'Объекты и интерфейсы' },
    { id: 'functions', name: 'Функции' },
    { id: 'advanced', name: 'Продвинутые' }
  ];
  
  const currentTypeTab = ref('primitive');
  
  // Примитивные типы для отображения
  const primitiveTypes = [
    {
      name: 'boolean',
      example: 'let isDone: boolean = false;',
      description: 'Логический тип для true/false значений.'
    },
    {
      name: 'number',
      example: 'let decimal: number = 6;\nlet hex: number = 0xf00d;\nlet binary: number = 0b1010;',
      description: 'Числовой тип для целых и дробных чисел.'
    },
    {
      name: 'string',
      example: 'let color: string = "blue";\nlet greeting: string = `Hello, ${name}`;',
      description: 'Текстовый тип для строк в одинарных, двойных кавычках или шаблонных строк.'
    },
    {
      name: 'any',
      example: 'let notSure: any = 4;\nnotSure = "maybe a string";\nnotSure = false;',
      description: 'Специальный тип, который отключает проверку типов. Используйте с осторожностью!'
    },
    {
      name: 'unknown',
      example: 'let value: unknown;\nvalue = 123;\nif (typeof value === "number") {\n  let sum = value + 10; // OK\n}',
      description: 'Более безопасная альтернатива any. Требует проверки типа перед использованием.'
    },
    {
      name: 'void',
      example: 'function logMessage(): void {\n  console.log("Hello");\n}',
      description: 'Используется для функций, которые ничего не возвращают.'
    },
    {
      name: 'null & undefined',
      example: 'let n: null = null;\nlet u: undefined = undefined;',
      description: 'Представляют отсутствие значения.'
    }
  ];
  
  // Вкладки для раздела Nuxt
  const nuxtTabs = [
    { id: 'setup', name: 'Настройка' },
    { id: 'components', name: 'Компоненты' },
    { id: 'composables', name: 'Composables' },
    { id: 'server', name: 'Сервер' },
    { id: 'autocomplete', name: 'Автодополнение' }
  ];
  
  const currentNuxtTab = ref('setup');
  
  // Практические упражнения
  const exercises = [
    {
      title: 'Типизация Props компонента',
      difficulty: 'easy',
      description: 'Создайте компонент ProductCard с типизированными props для отображения информации о продукте.',
      initialCode: `<script setup lang="ts">
  // Определите типы для props
  // ...
  
  // Определите props для компонента
  const props = defineProps<{
    // ваш код здесь
  }>();

  
  <template>
    <div class="product-card">
      <h3>{{ props.name }}</h3>
      <p class="price">{{ props.price }} ₽</p>
      <p class="description">{{ props.description }}</p>
      <span v-if="props.inStock" class="stock in-stock">В наличии</span>
      <span v-else class="stock out-of-stock">Нет в наличии</span>
    </div>
  </template>`,
      hint: 'Создайте интерфейс Product с полями name, price, description и inStock. Затем используйте этот интерфейс для типизации props.',
      solution: `<script setup lang="ts">
  // Определите типы для props
  interface Product {
    name: string;
    price: number;
    description: string;
    inStock: boolean;
    // Дополнительные свойства могут быть добавлены как необязательные
    discount?: number;
    category?: string;
  }
  
  // Определите props для компонента
  const props = defineProps<Product>();

  
  <template>
    <div class="product-card">
      <h3>{{ props.name }}</h3>
      <p class="price">{{ props.price }} ₽</p>
      <p class="description">{{ props.description }}</p>
      <span v-if="props.inStock" class="stock in-stock">В наличии</span>
      <span v-else class="stock out-of-stock">Нет в наличии</span>
    </div>
  </template>`,
      explanation: 'Мы создали интерфейс Product, который описывает структуру данных продукта. Затем мы использовали этот интерфейс в defineProps, чтобы указать типы для props компонента. Это гарантирует, что компонент будет получать правильные данные и предоставит автодополнение при использовании компонента.'
    },
    {
      title: 'Типизация Composable функции',
      difficulty: 'medium',
      description: 'Создайте типизированную composable функцию useCart для управления корзиной покупок.',
      initialCode: `// composables/useCart.ts
  
  // Определите необходимые типы
  // ...
  
  export function useCart() {
    // Состояние корзины
    const items = ref([]);
    const totalPrice = computed(() => {
      // Расчет общей стоимости
      // ...
    });
  
    // Методы
    function addToCart(product, quantity) {
      // Добавление товара в корзину
      // ...
    }
  
    function removeFromCart(productId) {
      // Удаление товара из корзины
      // ...
    }
  
    function clearCart() {
      // Очистка корзины
      // ...
    }
  
    return {
      items,
      totalPrice,
      addToCart,
      removeFromCart,
      clearCart
    };
  }`,
      hint: 'Создайте интерфейсы для Product и CartItem. Используйте дженерики для ref и computed. Определите возвращаемый тип функции.',
      solution: `// composables/useCart.ts
  import { ref, computed } from 'vue';
  
  // Определите необходимые типы
  interface Product {
    id: number;
    name: string;
    price: number;
  }
  
  interface CartItem {
    product: Product;
    quantity: number;
  }
  
  interface UseCartReturn {
    items: Ref&lt;CartItem[]&gt;;
    totalPrice: ComputedRef&lt;number&gt;;
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
  }
  
  export function useCart(): UseCartReturn {
    // Состояние корзины
    const items = ref&lt;CartItem[]&gt;([]);
    const totalPrice = computed&lt;number&gt;(() => {
      // Расчет общей стоимости
      return items.value.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);
    });
  
    // Методы
    function addToCart(product: Product, quantity: number): void {
      const existingItem = items.value.find(item => item.product.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        items.value.push({ product, quantity });
      }
    }
  
    function removeFromCart(productId: number): void {
      const index = items.value.findIndex(item => item.product.id === productId);
      if (index !== -1) {
        items.value.splice(index, 1);
      }
    }
  
    function clearCart(): void {
      items.value = [];
    }
  
    return {
      items,
      totalPrice,
      addToCart,
      removeFromCart,
      clearCart
    };
  }`,
      explanation: 'Мы создали интерфейсы Product и CartItem для описания структуры данных. Используем дженерики для ref и computed, чтобы указать типы хранимых значений. Определили интерфейс UseCartReturn для типизации возвращаемого значения функции useCart. Это обеспечивает полную типизацию и автодополнение при использовании этого composable в компонентах.'
    },
    {
      title: 'Типизация API маршрута',
      difficulty: 'hard',
      description: 'Создайте типизированный API маршрут для получения, создания и обновления данных пользователя.',
      initialCode: `// server/api/users/[id].ts
  import { defineEventHandler } from 'h3';
  
  // Определите типы для запросов и ответов
  // ...
  
  // GET /api/users/:id
  export const GET = defineEventHandler(async (event) => {
    const id = // получите id из параметров
    
    // Получение данных пользователя
    const user = // ...
    
    return user;
  });
  
  // POST /api/users
  export const POST = defineEventHandler(async (event) => {
    const body = // получите тело запроса
    
    // Валидация данных
    
    // Создание пользователя
    const newUser = // ...
    
    return newUser;
  });
  
  // PUT /api/users/:id
  export const PUT = defineEventHandler(async (event) => {
    const id = // получите id из параметров
    const body = // получите тело запроса
    
    // Валидация данных
    
    // Обновление пользователя
    const updatedUser = // ...
    
    return updatedUser;
  });`,
      hint: 'Создайте интерфейсы для User, CreateUserRequest и UpdateUserRequest. Используйте функции h3 для получения параметров и тела запроса с правильной типизацией.',
      solution: `// server/api/users/[id].ts
  import { defineEventHandler, getRouterParam, readBody, createError } from 'h3';
  
  // Определите типы для запросов и ответов
  interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    createdAt: string;
    updatedAt: string;
  }
  
  interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    role?: 'admin' | 'user';
  }
  
  interface UpdateUserRequest {
    name?: string;
    email?: string;
    role?: 'admin' | 'user';
  }
  
  // Имитация базы данных
  const users: User[] = [
    {
      id: 1,
      name: 'Иван',
      email: 'ivan@example.com',
      role: 'admin',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    }
  ];
  
  // GET /api/users/:id
  export const GET = defineEventHandler&lt;User&gt;(async (event) => {
    const id = parseInt(getRouterParam(event, 'id') || '0');
    
    if (isNaN(id) || id <= 0) {
      throw createError({
        statusCode: 400,
        message: 'Invalid user ID'
      });
    }
    
    // Получение данных пользователя
    const user = users.find(u => u.id === id);
    
    if (!user) {
      throw createError({
        statusCode: 404,
        message: \`User with ID \${id} not found\`
      });
    }
    
    return user;
  });
  
  // POST /api/users
  export const POST = defineEventHandler&lt;User&gt;(async (event) => {
    const body = await readBody&lt;CreateUserRequest&gt;(event);
    
    // Валидация данных
    if (!body.name || !body.email || !body.password) {
      throw createError({
        statusCode: 400,
        message: 'Name, email and password are required'
      });
    }
    
    // Создание пользователя
    const newUser: User = {
      id: users.length + 1,
      name: body.name,
      email: body.email,
      role: body.role || 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    return newUser;
  });
  
  // PUT /api/users/:id
  export const PUT = defineEventHandler&lt;User&gt;(async (event) => {
    const id = parseInt(getRouterParam(event, 'id') || '0');
    
    if (isNaN(id) || id <= 0) {
      throw createError({
        statusCode: 400,
        message: 'Invalid user ID'
      });
    }
    
    const body = await readBody&lt;UpdateUserRequest&gt;(event);
    
    // Валидация данных
    if (Object.keys(body).length === 0) {
      throw createError({
        statusCode: 400,
        message: 'No data provided for update'
      });
    }
    
    // Обновление пользователя
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      throw createError({
        statusCode: 404,
        message: \`User with ID \${id} not found\`
      });
    }
    
    const updatedUser: User = {
      ...users[userIndex],
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    users[userIndex] = updatedUser;
    
    return updatedUser;
  });`,
      explanation: 'Мы определили чёткие интерфейсы для User, CreateUserRequest и UpdateUserRequest. Использовали дженерики с defineEventHandler для указания возвращаемого типа. Применили функции h3 (getRouterParam, readBody) с правильной типизацией. Добавили проверки данных и обработку ошибок. В реальном приложении вместо массива users была бы база данных, но принцип типизации остается тем же.'
    }
  ];
  
  const currentExercise = ref(0);
  const hintShown = ref(false);
  const solutionShown = ref(false);
  
  // Методы для практических упражнений
  function resetExercise() {
    hintShown.value = false;
    solutionShown.value = false;
  }
  
  function showHint() {
    hintShown.value = true;
  }
  
  function toggleSolution() {
    solutionShown.value = !solutionShown.value;
  }

  </script>
  
  <style scoped>
  .typescript-demo {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #333;
  }
  
  h1, h2, h3, h4, h5 {
    color: #2c3e50;
    margin-top: 0;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 10px;
  }
  
  .intro {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 30px;
    color: #666;
  }
  
  /* Селектор режимов */
  .mode-selector {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 30px;
  }
  
  .mode-selector button {
    padding: 10px 20px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 1rem;
  }
  
  .mode-selector button:hover {
    background-color: #e9ecef;
  }
  
  .mode-selector button.active {
    background-color: #2563eb;
    color: white;
    border-color: #2563eb;
  }
  
  /* Общие стили для разделов */
  .section {
    margin-bottom: 40px;
    animation: fadeIn 0.5s;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Стили для вкладок */
  .tabs {
    display: flex;
    overflow-x: auto;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }
  
  .tab {
    padding: 10px 15px;
    cursor: pointer;
    transition: all 0.3s;
    border-bottom: 2px solid transparent;
  }
  
  .tab:hover {
    background-color: #f5f5f5;
  }
  
  .tab.active {
    border-bottom: 2px solid #2563eb;
    color: #2563eb;
    font-weight: bold;
  }
  
  .tab-content {
    padding: 20px 0;
  }
  
  /* Стили для карточек концепций */
  .concept-card {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .concept-header {
    display: flex;
    padding: 15px;
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    align-items: center;
  }
  
  .concept-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
  }
  
  .ts-logo {
    background-color: #3178c6;
    color: white;
    padding: 6px 10px;
    border-radius: 4px;
    font-weight: bold;
  }
  
  .compile-icon {
    background-color: #d97706;
    color: white;
    padding: 6px 10px;
    border-radius: 4px;
    font-weight: bold;
  }
  
  .concept-title {
    flex: 1;
  }
  
  .concept-content {
    padding: 20px;
  }
  
  /* Стили для сравнения кода */
  .code-comparison {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 15px;
    margin: 20px 0;
  }
  
  .code-column {
    border-radius: 6px;
    overflow: hidden;
  }
  
  .code-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .arrow {
    font-size: 1.5rem;
    color: #64748b;
  }
  
  .code-description {
    background-color: #f8fafc;
    padding: 10px;
    font-size: 0.9rem;
    border-top: 1px solid #e2e8f0;
  }
  
  .code-block {
    background-color: #1e293b;
    color: #e2e8f0;
    padding: 15px;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  /* Стили для преимуществ */
  .benefits {
    margin-top: 20px;
    background-color: #f0f9ff;
    padding: 15px;
    border-radius: 6px;
    border-left: 3px solid #0ea5e9;
  }
  
  /* Стили для важных примечаний */
  .important-note {
    margin-top: 15px;
    padding: 10px 15px;
    background-color: #fef2f2;
    border-left: 3px solid #ef4444;
    border-radius: 6px;
  }
  
  /* Workflow визуализация */
  .ts-workflow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 20px 0;
  }
  
  .workflow-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 120px;
  }
  
  .workflow-icon {
    width: 50px;
    height: 50px;
    background-color: #f1f5f9;
    border: 1px solid #cbd5e1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
  
  .workflow-arrow {
    color: #64748b;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .file-icon, .browser-icon {
    font-size: 0.8rem;
  }
  
  /* Стили для примеров типов */
  .type-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .type-card {
    background-color: #f8fafc;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
  }
  
  .type-header {
    padding: 10px;
    background-color: #f1f5f9;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .type-name {
    font-weight: bold;
    color: #334155;
  }
  
  .type-example {
    padding: 10px;
  }
  
  .type-description {
    padding: 10px;
    background-color: #f8fafc;
    font-size: 0.9rem;
    border-top: 1px solid #e2e8f0;
  }
  
  /* Стили для playground */
  .type-playground {
    background-color: #f8fafc;
    border-radius: 6px;
    padding: 15px;
    margin-top: 20px;
  }
  
  /* Стили для карточек примеров типов */
  .type-example-card {
    background-color: white;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    overflow: hidden;
    margin-bottom: 20px;
  }
  
  .type-example-card h4 {
    padding: 10px 15px;
    margin: 0;
    background-color: #f1f5f9;
    border-bottom: 1px solid #e2e8f0;
  }
  
  /* Стили для сравнения в таблице */
  .comparison-table {
    overflow-x: auto;
    margin: 20px 0;
  }
  
  .comparison-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .comparison-table th, .comparison-table td {
    padding: 10px;
    text-align: left;
    border: 1px solid #e2e8f0;
  }
  
  .comparison-table th {
    background-color: #f1f5f9;
  }
  
  .comparison-table tr:nth-child(even) td {
    background-color: #f8fafc;
  }
  
  /* Анимация массивов и кортежей */
  .type-animation {
    margin-top: 20px;
  }
  
  .animation-title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .animation-container {
    background-color: white;
    border-radius: 6px;
    padding: 15px;
    border: 1px solid #e2e8f0;
  }
  
  .array-visual, .tuple-visual {
    margin-bottom: 20px;
  }
  
  .array-title {
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  }
  
  .array-items {
    display: flex;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .array-item {
    padding: 8px 15px;
    border-right: 1px solid #cbd5e1;
    background-color: #f1f5f9;
    flex: 1;
    text-align: center;
  }
  
  .array-item:last-child {
    border-right: none;
  }
  
  .array-type {
    text-align: center;
    font-size: 0.8rem;
    color: #64748b;
    margin-top: 5px;
  }
  
  .string-type {
    background-color: #dcfce7;
    color: #166534;
  }
  
  .number-type {
    background-color: #dbeafe;
    color: #1e40af;
  }
  
  .boolean-type {
    background-color: #fef3c7;
    color: #92400e;
  }
  
  /* Анимация функций */
  .function-animation {
    margin-top: 30px;
  }
  
  .function-visual {
    background-color: #f8fafc;
    padding: 20px;
    border-radius: 6px;
    font-family: monospace;
    position: relative;
  }
  
  .function-declaration {
    margin-bottom: 15px;
  }
  
  .keyword {
    color: #8b5cf6;
  }
  
  .function-name {
    color: #2563eb;
  }
  
  .param-name {
    color: #d97706;
  }
  
  .param-type {
    color: #0ea5e9;
  }
  
  .return-type {
    color: #16a34a;
  }
  
  .punctuation {
    color: #64748b;
  }
  
  .function-body {
    margin-left: 20px;
  }
  
  .function-parts {
    margin-top: 20px;
    position: relative;
  }
  
  .part {
    position: relative;
    margin-bottom: 15px;
  }
  
  .part-arrow {
    position: absolute;
    top: -15px;
    height: 2px;
    background-color: #ef4444;
  }
  
  .part-arrow::before, .part-arrow::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: #ef4444;
    border-radius: 50%;
  }
  
  .part-arrow::before {
    left: -3px;
    top: -2px;
  }
  
  .part-arrow::after {
    right: -3px;
    top: -2px;
  }
  
  .part-label {
    text-align: center;
    font-size: 0.8rem;
    color: #ef4444;
    margin-top: 5px;
  }
  
  /* Анимация дженериков */
  .generic-visual {
    padding: 20px;
  }
  
  .generic-code {
    background-color: #1e293b;
    padding: 15px;
    border-radius: 6px;
    color: #e2e8f0;
    font-family: monospace;
    margin-bottom: 20px;
  }
  
  .generic-instances {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
  
  .instance {
    background-color: #f1f5f9;
    border-radius: 6px;
    overflow: hidden;
  }
  
  .instance-title {
    padding: 8px 15px;
    background-color: #cbd5e1;
    font-weight: bold;
  }
  
  .instance-code {
    padding: 15px;
    font-family: monospace;
    font-size: 0.85rem;
  }
  
  .type-param {
    color: #d946ef;
  }
  
  .line {
    margin-bottom: 5px;
  }
  
  .indent {
    margin-left: 20px;
  }
  
  /* Nuxt раздел */
  .nuxt-info {
    padding: 15px;
    background-color: #f0f9ff;
    border-radius: 6px;
    margin-bottom: 20px;
    border-left: 3px solid #0284c7;
  }
  
  .nuxt-tabs {
    margin-bottom: 15px;
  }
  
  .nuxt-example-card {
    background-color: white;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    overflow: hidden;
    margin-bottom: 20px;
  }
  
  .nuxt-example-card h4 {
    padding: 10px 15px;
    margin: 0;
    background-color: #f1f5f9;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .nuxt-description {
    padding: 10px 15px;
    background-color: #f8fafc;
    font-size: 0.9rem;
  }
  
  .nuxt-highlight {
    margin-top: 20px;
    padding: 15px;
    background-color: #ecfdf5;
    border-left: 3px solid #10b981;
    border-radius: 6px;
  }
  
  .nuxt-highlight.warning {
    background-color: #fff7ed;
    border-left-color: #f97316;
  }
  
  .file-structure {
    background-color: #2d3748;
  }
  
  .pitfalls-list {
    padding: 15px;
  }
  
  .pitfall {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .pitfall:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  
  .pitfall h5 {
    color: #e11d48;
    margin-bottom: 5px;
  }
  
  /* Серверная анимация */
  .server-animation {
    margin-top: 30px;
  }
  
  .client-server-flow {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 20px;
    align-items: center;
  }
  
  .client-code, .server-code {
    background-color: #1e293b;
    padding: 15px;
    border-radius: 6px;
    color: #e2e8f0;
    font-family: monospace;
  }
  
  .data-flow {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .request-arrow, .response-arrow {
    width: 100%;
    position: relative;
    text-align: center;
  }
  
  .arrow-line {
    height: 2px;
    background-color: #3b82f6;
    position: relative;
  }
  
  .request-label, .response-label {
    background-color: white;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.8rem;
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  }
  
  .request-arrow .arrow-line::after {
    content: '';
    position: absolute;
    right: -6px;
    top: -3px;
    width: 0;
    height: 0;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 8px solid #3b82f6;
  }
  
  .response-arrow .arrow-line::after {
    content: '';
    position: absolute;
    left: -6px;
    top: -3px;
    width: 0;
    height: 0;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-right: 8px solid #3b82f6;
  }
  
  /* Автодополнение демо */
  .autocomplete-example {
    margin: 20px 0;
  }
  
  .code-editor {
    background-color: #1e293b;
    color: #e2e8f0;
    font-family: monospace;
    padding: 15px;
    border-radius: 6px;
    position: relative;
  }
  
  .editor-line {
    margin-bottom: 5px;
  }
  
  .autocomplete-line {
    position: relative;
  }
  
  .complete-cursor {
    background-color: #3b82f6;
    animation: blink 1s infinite;
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  
  .autocomplete-popup {
    position: absolute;
    left: 80px;
    top: 65px;
    background-color: #f8fafc;
    color: #334155;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
  
  .autocomplete-item {
    padding: 5px 10px;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .autocomplete-item:last-child {
    border-bottom: none;
  }
  
  .autocomplete-item.selected {
    background-color: #dbeafe;
  }
  
  .type-hint {
    color: #64748b;
    font-size: 0.8rem;
    margin-left: 5px;
  }
  
  .comment {
    color: #94a3b8;
  }
  
  .variable {
    color: #8b5cf6;
  }
  
  .function {
    color: #22c55e;
  }
  
  /* Стили для раздела подводных камней */
  .pitfalls-section {
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  
  .pitfall-card {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    margin-bottom: 20px;
  }
  
  .pitfall-header {
    display: flex;
    padding: 15px;
    background-color: #fef2f2;
    border-bottom: 1px solid #fee2e2;
    align-items: center;
  }
  
  .pitfall-icon {
    margin-right: 10px;
    font-size: 1.2rem;
  }
  
  .pitfall-content {
    padding: 20px;
  }
  
  .pitfall-description {
    margin-bottom: 20px;
  }
  
  .code-example {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .wrong-example, .right-example {
    border-radius: 6px;
    overflow: hidden;
  }
  
  .wrong-example h4, .right-example h4 {
    padding: 8px 15px;
    margin: 0;
    font-size: 0.9rem;
  }
  
  .wrong-example h4 {
    background-color: #fee2e2;
    color: #b91c1c;
  }
  
  .right-example h4 {
    background-color: #dcfce7;
    color: #15803d;
  }
  
  .pitfall-solution {
    background-color: #f0f9ff;
    padding: 15px;
    border-radius: 6px;
    border-left: 3px solid #0ea5e9;
  }
  
  .pitfall-solution h4 {
    margin-top: 0;
    color: #0ea5e9;
  }
  
  .pitfall-solution ul {
    margin-bottom: 0;
  }
  
  .tips-section {
    margin-top: 30px;
  }
  
  .tips-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 20px;
  }
  
  .tip-item {
    background-color: #f8fafc;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    align-items: flex-start;
    border: 1px solid #e2e8f0;
  }
  
  .tip-icon {
    margin-right: 10px;
    font-size: 1.2rem;
  }
  
  .tip-content h4 {
    margin-top: 0;
    margin-bottom: 5px;
    color: #0ea5e9;
  }
  
  .tip-content p {
    margin-bottom: 0;
  }
  
  /* Стили для раздела практики */
  .practice-section {
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  
  .exercise-selector {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .exercise-selector button {
    padding: 8px 15px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .exercise-selector button:hover {
    background-color: #e9ecef;
  }
  
  .exercise-selector button.active {
    background-color: #2563eb;
    color: white;
    border-color: #2563eb;
  }
  
  .exercise-container {
    background-color: #f8fafc;
    border-radius: 8px;
    padding: 20px;
    border: 1px solid #e2e8f0;
  }
  
  .exercise-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .exercise-header h3 {
    margin: 0;
    flex: 1;
  }
  
  .difficulty-badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
    color: white;
  }
  
  .difficulty-badge.easy {
    background-color: #22c55e;
  }
  
  .difficulty-badge.medium {
    background-color: #f59e0b;
  }
  
  .difficulty-badge.hard {
    background-color: #ef4444;
  }
  
  .exercise-description {
    margin-bottom: 20px;
  }
  
  .exercise-task {
    background-color: white;
    border-radius: 6px;
    padding: 20px;
    border: 1px solid #e2e8f0;
  }
  
  .task-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .task-header h4 {
    margin: 0;
    flex: 1;
  }
  
  .controls {
    display: flex;
    gap: 10px;
  }
  
  .controls button {
    padding: 6px 12px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s;
  }
  
  .reset-btn {
    background-color: #f3f4f6;
    color: #374151;
  }
  
  .hint-btn {
    background-color: #fef3c7;
    color: #92400e;
  }
  
  .solution-btn {
    background-color: #dbeafe;
    color: #1e40af;
  }
  
  .exercise-hint {
    margin-top: 20px;
    padding: 15px;
    background-color: #fef3c7;
    border-radius: 6px;
    border-left: 3px solid #f59e0b;
  }
  
  .exercise-solution {
    margin-top: 20px;
    padding: 15px;
    background-color: #dbeafe;
    border-radius: 6px;
    border-left: 3px solid #2563eb;
  }
  
  .solution-explanation {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #bfdbfe;
  }
  
  .error-highlight {
    background-color: #fecaca;
    text-decoration: wavy underline #ef4444;
  }
  
  .rename-highlight {
    background-color: #e0f2fe;
    outline: 1px solid #3b82f6;
  }
  
  .highlight-props {
    background-color: #c7d2fe;
  }
  
  .ts-benefits-animation {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 15px;
  }
  
  .benefit-card {
    background-color: white;
    border-radius: 6px;
    padding: 15px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
    text-align: center;
  }
  
  .benefit-icon {
    width: 30px;
    height: 30px;
    background-color: #c7d2fe;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 10px;
    color: #4f46e5;
  }
  
  .benefit-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #4f46e5;
  }
  
  .benefit-visual {
    margin-top: 15px;
    padding: 10px;
    background-color: #f8fafc;
    border-radius: 4px;
  }
  
  .code-snippet {
    font-family: monospace;
    text-align: left;
    padding: 8px;
    font-size: 0.9rem;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .code-comparison {
      grid-template-columns: 1fr;
    }
    
    .code-arrow {
      display: none;
    }
    
    .ts-workflow {
      flex-direction: column;
      gap: 15px;
    }
    
    .workflow-arrow {
      transform: rotate(90deg);
    }
    
    .generic-instances {
      grid-template-columns: 1fr;
    }
    
    .code-example {
      grid-template-columns: 1fr;
    }
    
    .client-server-flow {
      grid-template-columns: 1fr;
    }
    
    .data-flow {
      display: none;
    }
  }
  </style>
         