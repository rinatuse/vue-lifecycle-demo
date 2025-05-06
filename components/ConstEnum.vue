<template>
    <div class="ts-explorer">
      <h1>TypeScript: Глубокое погружение</h1>
      
      <div class="tabs">
        <button 
          v-for="(tab, index) in tabs" 
          :key="index"
          :class="{ active: currentTab === index }"
          @click="switchTab(index)"
          class="tab-button"
        >
          {{ tab.title }}
        </button>
      </div>
      
      <div class="content-container">
        <!-- 1. Перегрузка функций -->
        <div v-if="currentTab === 0" class="tab-content">
          <h2>Как перегрузка функций компилируется в JavaScript</h2>
          
          <div class="explanation">
            <p>TypeScript позволяет объявлять перегруженные функции с разными сигнатурами, но одной реализацией. Это полезно для создания API, где функция может принимать разные типы аргументов.</p>
          </div>
          
          <div class="code-container">
            <div class="code-panel">
              <h3>TypeScript</h3>
              <pre class="code typescript">
  // Объявления перегрузок
  function process(x: number): number;
  function process(x: string): string;
  function process(x: boolean): boolean;
  
  // Реализация
  function process(x: number | string | boolean): any {
    if (typeof x === 'number') {
      return x * 2;
    } else if (typeof x === 'string') {
      return x.toUpperCase();
    } else {
      return !x;
    }
  }
  
  console.log(process(10));      // 20
  console.log(process("hello")); // "HELLO"
  console.log(process(true));    // false
              </pre>
              <button @click="triggerCompilation(0)" class="compile-button">Компилировать</button>
            </div>
            
            <div v-if="showCompiled[0]" class="code-panel compiled">
              <h3>JavaScript <span class="result">(результат компиляции)</span></h3>
              <pre class="code javascript" :class="{ 'animate-highlight': highlightCompiled[0] }">
  // Объявления перегрузок удаляются при компиляции
  
  // Остается только реализация
  function process(x) {
    if (typeof x === 'number') {
      return x * 2;
    } else if (typeof x === 'string') {
      return x.toUpperCase();
    } else {
      return !x;
    }
  }
  
  console.log(process(10));      // 20
  console.log(process("hello")); // "HELLO"
  console.log(process(true));    // false
              </pre>
            </div>
          </div>
          
          <div class="animation-container" v-if="showCompiled[0]">
            <div class="animation-title">Что происходит при компиляции:</div>
            <div class="animation-step" :class="{ active: animationStep[0] >= 1 }">
              <div class="step-number">1</div>
              <div class="step-desc">TypeScript анализирует все сигнатуры перегрузки</div>
            </div>
            <div class="animation-step" :class="{ active: animationStep[0] >= 2 }">
              <div class="step-number">2</div>
              <div class="step-desc">Проверяет, что реализация совместима со всеми объявленными типами</div>
            </div>
            <div class="animation-step" :class="{ active: animationStep[0] >= 3 }">
              <div class="step-number">3</div>
              <div class="step-desc">Удаляет все объявления перегрузок</div>
            </div>
            <div class="animation-step" :class="{ active: animationStep[0] >= 4 }">
              <div class="step-number">4</div>
              <div class="step-desc">Оставляет только одну реализацию функции без аннотаций типов</div>
            </div>
            <div class="important-note" :class="{ active: animationStep[0] >= 5 }">
              <strong>Важно:</strong> Перегрузки функций существуют только на этапе компиляции!
              В JavaScript нет настоящей перегрузки функций — это просто проверка типов в TypeScript.
            </div>
          </div>
          
          <div class="practical-use">
            <h3>Практическое применение на собеседовании:</h3>
            <div class="practical-example">
              <div class="example-title">Пример для API работы с данными:</div>
              <pre class="code typescript">
                // API для загрузки данных с разными типами идентификаторов
                function fetchData(id: number): Promise&lt;User&gt;;  
                function fetchData(username: string): Promise&lt;User&gt;;
                function fetchData(userIdentifier: number | string): Promise&lt;User&gt; {
                    if (typeof userIdentifier === 'number') {
                    return fetch(`/api/users/${userIdentifier}`)
                        .then(response => response.json());
                    } else {
                    return fetch(`/api/users?username=${userIdentifier}`)
                        .then(response => response.json());
                    }
                }
                </pre>
              <div class="example-explanation">
                <p>На собеседовании можно объяснить, что:</p>
                <ul>
                  <li>Перегрузка делает API более интуитивным для пользователей</li>
                  <li>TypeScript проверяет типы при разработке, но в JavaScript будет просто одна функция с проверкой типов</li>
                  <li>IDE показывает правильные подсказки типов для каждой перегрузки</li>
                  <li>Ваш код более типобезопасен при этом без дополнительных накладных расходов</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 2. Enum vs Типы и интерфейсы -->
        <div v-if="currentTab === 1" class="tab-content">
          <h2>Enum: зачем нужен и отличие от типов и интерфейсов</h2>
          
          <div class="explanation">
            <p>Enum (перечисление) в TypeScript — это способ определения набора именованных констант. Они могут использоваться как для числовых, так и для строковых значений.</p>
          </div>
          
          <div class="comparison-table">
            <h3>Сравнение с другими конструкциями типов</h3>
            <table>
              <thead>
                <tr>
                  <th>Функциональность</th>
                  <th>Enum</th>
                  <th>Type</th>
                  <th>Interface</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Генерирует значения во время выполнения</td>
                  <td class="yes">Да</td>
                  <td class="no">Нет</td>
                  <td class="no">Нет</td>
                </tr>
                <tr>
                  <td>Обратное отображение (значение -> имя)</td>
                  <td class="yes">Да (для числовых)</td>
                  <td class="no">Нет</td>
                  <td class="no">Нет</td>
                </tr>
                <tr>
                  <td>Может представлять сложные типы данных</td>
                  <td class="no">Нет</td>
                  <td class="yes">Да</td>
                  <td class="yes">Да</td>
                </tr>
                <tr>
                  <td>Может быть расширено</td>
                  <td class="no">Нет</td>
                  <td class="partial">Частично (union)</td>
                  <td class="yes">Да (extends)</td>
                </tr>
                <tr>
                  <td>Компилируется в JavaScript код</td>
                  <td class="yes">Да (объект)</td>
                  <td class="no">Нет</td>
                  <td class="no">Нет</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="code-container">
            <div class="code-panel">
              <h3>TypeScript</h3>
              <pre class="code typescript">
  // Числовой enum (по умолчанию)
  enum Direction {
    Up = 0,  // Можно не указывать значение, тогда будет 0, 1, 2, 3...
    Down,    // 1
    Left,    // 2
    Right    // 3
  }
  
  // Строковый enum
  enum HttpStatus {
    OK = "OK",
    NotFound = "NOT_FOUND",
    Error = "ERROR"
  }
  
  // Использование enum
  function move(direction: Direction) {
    console.log(`Moving ${Direction[direction]}`);
    return direction;
  }
  
  move(Direction.Up);    // "Moving Up"
  console.log(Direction[2]); // "Left" - обратное отображение
  
  // Аналогичная функциональность с типом (без обратного отображения)
  type DirectionType = 'Up' | 'Down' | 'Left' | 'Right';
              </pre>
              <button @click="triggerCompilation(1)" class="compile-button">Компилировать</button>
            </div>
            
            <div v-if="showCompiled[1]" class="code-panel compiled">
              <h3>JavaScript <span class="result">(результат компиляции)</span></h3>
              <pre class="code javascript" :class="{ 'animate-highlight': highlightCompiled[1] }">
  // Числовой enum преобразуется в двусторонний объект
  var Direction = {};
  Direction[Direction["Up"] = 0] = "Up";
  Direction[Direction["Down"] = 1] = "Down";
  Direction[Direction["Left"] = 2] = "Left";
  Direction[Direction["Right"] = 3] = "Right";
  
  // Строковый enum преобразуется в объект с односторонним отображением
  var HttpStatus = {
      "OK": "OK",
      "NotFound": "NOT_FOUND",
      "Error": "ERROR"
  };
  
  // Использование enum
  function move(direction) {
      console.log("Moving " + Direction[direction]);
      return direction;
  }
  
  move(Direction.Up);    // "Moving Up"
  console.log(Direction[2]); // "Left" - обратное отображение
  
  // Type полностью удаляется при компиляции
              </pre>
            </div>
          </div>
          
          <div class="animation-container" v-if="showCompiled[1]">
            <div class="animation-title">Особенности enum в JavaScript:</div>
            <div class="animation-visual">
              <div class="enum-visualization">
                <div class="enum-object" :class="{ active: animationStep[1] >= 1 }">
                  Direction = {
                    <div class="enum-prop">Up: 0,</div>
                    <div class="enum-prop">Down: 1,</div>
                    <div class="enum-prop">Left: 2,</div>
                    <div class="enum-prop">Right: 3,</div>
                    <div class="enum-prop reverse">0: "Up",</div>
                    <div class="enum-prop reverse">1: "Down",</div>
                    <div class="enum-prop reverse">2: "Left",</div>
                    <div class="enum-prop reverse">3: "Right"</div>
                  }
                </div>
                <div class="arrows" :class="{ active: animationStep[1] >= 2 }">
                  <div class="arrow-left">
                    <span class="arrow">←</span>
                    <span class="desc">Direction.Up → 0</span>
                  </div>
                  <div class="arrow-right">
                    <span class="desc">Direction[0] → "Up"</span>
                    <span class="arrow">→</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="important-note" :class="{ active: animationStep[1] >= 3 }">
              <strong>Важно:</strong> В отличие от типов и интерфейсов, enum генерирует реальный JavaScript-код!
            </div>
          </div>
          
          <div class="practical-use">
            <h3>Когда использовать enum vs типы/интерфейсы:</h3>
            <div class="use-cases">
              <div class="use-case">
                <h4>Используйте enum, когда:</h4>
                <ul>
                  <li>Нужны фиксированные именованные константы с численными значениями</li>
                  <li>Хотите иметь двустороннее отображение (число ↔ строка)</li>
                  <li>Нужен объект времени выполнения для перечисления</li>
                  <li>Работаете с API или протоколами, где значения важны (например, HTTP-коды)</li>
                </ul>
              </div>
              <div class="use-case">
                <h4>Используйте типы/интерфейсы, когда:</h4>
                <ul>
                  <li>Хотите только проверку типов без кода времени выполнения</li>
                  <li>Нужны более сложные типы данных (объекты, функции)</li>
                  <li>Важна расширяемость и композиция типов</li>
                  <li>Хотите минимизировать размер сгенерированного JavaScript-кода</li>
                </ul>
              </div>
            </div>
            
            <div class="practical-example">
              <div class="example-title">Пример для собеседования: Статусы заказа в e-commerce системе</div>
              <pre class="code typescript">
  // 1. Использование enum
  enum OrderStatus {
    Pending = 'PENDING',
    Processing = 'PROCESSING',
    Shipped = 'SHIPPED',
    Delivered = 'DELIVERED',
    Canceled = 'CANCELED'
  }
  
  // Пример использования
  function updateOrderStatus(orderId: string, status: OrderStatus) {
    console.log(`Updating order ${orderId} to status: ${status}`);
    // ...
  }
  
  // Можно использовать напрямую значения из enum
  updateOrderStatus('12345', OrderStatus.Shipped);
  
  // 2. Альтернатива с использованием union type и константы
  type OrderStatusType = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELED';
  
  // Константы для использования в коде
  const ORDER_STATUS = {
    PENDING: 'PENDING' as OrderStatusType,
    PROCESSING: 'PROCESSING' as OrderStatusType,
    SHIPPED: 'SHIPPED' as OrderStatusType,
    DELIVERED: 'DELIVERED' as OrderStatusType,
    CANCELED: 'CANCELED' as OrderStatusType,
  } as const;
  
  // Пример использования
  function updateOrderStatusWithType(orderId: string, status: OrderStatusType) {
    console.log(`Updating order ${orderId} to status: ${status}`);
    // ...
  }
  
  updateOrderStatusWithType('12345', ORDER_STATUS.SHIPPED);
              </pre>
              <div class="example-explanation">
                <p>На собеседовании объясните, что:</p>
                <ul>
                  <li>Enum обеспечивает типобезопасность и удобное автодополнение значений</li>
                  <li>Enum генерирует объект в JavaScript, который можно использовать во время выполнения</li>
                  <li>Union типы не генерируют JavaScript-код, но обеспечивают такую же типобезопасность</li>
                  <li>В больших проектах часто предпочитают типы + константы для уменьшения размера бандла</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 3. Const Enum -->
        <div v-if="currentTab === 2" class="tab-content">
          <h2>Что такое const enum и когда его использовать</h2>
          
          <div class="explanation">
            <p>Const enum - это специальный вид enum в TypeScript, который полностью удаляется при компиляции и заменяется литеральными значениями. Это позволяет избежать генерации JavaScript-объекта.</p>
          </div>
          
          <div class="code-container">
            <div class="code-panel">
              <h3>TypeScript</h3>
              <pre class="code typescript">
  // Обычный enum
  enum Color {
    Red = 1,
    Green = 2,
    Blue = 3
  }
  
  // Const enum
  const enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
  }
  
  function printColor(color: Color) {
    console.log(Color[color]); // Требует enum объект в runtime
  }
  
  function move(direction: Direction) {
    console.log(`Moving ${direction}`);
  }
  
  printColor(Color.Green);  // Использует объект Color
  move(Direction.Left);     // Использует строковый литерал "LEFT"
              </pre>
              <button @click="triggerCompilation(2)" class="compile-button">Компилировать</button>
            </div>
            
            <div v-if="showCompiled[2]" class="code-panel compiled">
              <h3>JavaScript <span class="result">(результат компиляции)</span></h3>
              <pre class="code javascript" :class="{ 'animate-highlight': highlightCompiled[2] }">
  // Обычный enum генерирует объект JavaScript
  var Color = {};
  Color[Color["Red"] = 1] = "Red";
  Color[Color["Green"] = 2] = "Green";
  Color[Color["Blue"] = 3] = "Blue";
  
  // Const enum полностью исчезает
  
  function printColor(color) {
    console.log(Color[color]); // Требует объект Color
  }
  
  function move(direction) {
    console.log("Moving " + direction);
  }
  
  printColor(Color.Green);  // printColor(2)
  move("LEFT");            // Заменено литералом "LEFT"!
              </pre>
            </div>
          </div>
          
          <div class="animation-container" v-if="showCompiled[2]">
            <div class="animation-title">Процесс преобразования const enum:</div>
            <div class="const-enum-animation">
              <div class="code-step" :class="{ active: animationStep[2] >= 1 }">
                <div class="ts-code">const enum Direction { Up = "UP", ... }</div>
                <div class="js-code">// Объект не создается</div>
              </div>
              <div class="code-step" :class="{ active: animationStep[2] >= 2 }">
                <div class="ts-code">move(Direction.Left);</div>
                <div class="js-code">move("LEFT");</div>
                <div class="arrow-down">↓</div>
                <div class="inline-replace">Инлайн-замена значения!</div>
              </div>
            </div>
            
            <div class="important-note" :class="{ active: animationStep[2] >= 3 }">
              <strong>Важно:</strong> Const enum существует только во время компиляции и не создает объект в JavaScript.
              Все обращения к const enum заменяются литеральными значениями!
            </div>
          </div>
          
          <div class="benefits-drawbacks">
            <div class="benefits">
              <h3>Преимущества const enum:</h3>
              <ul>
                <li>Меньший размер скомпилированного кода - нет объекта enum</li>
                <li>Лучшая производительность - прямое использование литералов</li>
                <li>Те же преимущества проверки типов, что и у обычного enum</li>
              </ul>
            </div>
            <div class="drawbacks">
              <h3>Ограничения const enum:</h3>
              <ul>
                <li>Нельзя использовать для reverse mapping (Color[1] → "Red")</li>
                <li>Проблемы при использовании с --isolatedModules и в библиотеках</li>
                <li>Требует перекомпиляции всех зависимых файлов при изменении</li>
              </ul>
            </div>
          </div>
          
          <div class="practical-use">
            <h3>Практический пример для собеседования:</h3>
            <div class="practical-example">
              <div class="example-title">Оптимизация API клиента с использованием const enum</div>
              <pre class="code typescript">
  // Оптимизация чувствительного к размеру клиентского кода
  
  // Эндпоинты API
  const enum ApiEndpoint {
    Users = "/api/users",
    Products = "/api/products",
    Orders = "/api/orders",
    Auth = "/api/auth"
  }
  
  // HTTP методы
  const enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
  }
  
  // Функция для запроса к API
  async function apiRequest&lt;T&gt;(
    endpoint: ApiEndpoint,
    method: HttpMethod,
    data?: any
  ): Promise&lt;T&gt; {
    const response = await fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: data ? JSON.stringify(data) : undefined
    });
    
    return response.json();
  }
  
  // Использование
  interface User {
    id: number;
    name: string;
    email: string;
  }
  
  // При компиляции будет заменено на литералы без создания объектов enum
  const users = await apiRequest&lt;User[]&gt;(ApiEndpoint.Users, HttpMethod.GET);
              </pre>
              <div class="example-explanation">
                <p>На собеседовании можно объяснить:</p>
                <ul>
                  <li>Использование const enum для уменьшения размера итогового JavaScript-кода</li>
                  <li>Компилятор заменит обращения на литералы (apiRequest("/api/users", "GET"))</li>
                  <li>Это особенно ценно в клиентских приложениях, где размер бандла критичен</li>
                  <li>При этом сохраняется типобезопасность и автодополнение в IDE во время разработки</li>
                  <li>Это пример оптимизации, которая невозможна с обычными enum или object literals</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="when-to-use">
            <h3>Когда использовать const enum:</h3>
            <ul>
              <li>Когда важно минимизировать размер сгенерированного кода</li>
              <li>Когда не нужен доступ к enum как к объекту во время выполнения</li>
              <li>В больших клиентских приложениях для оптимизации</li>
              <li>Когда все значения enum известны на этапе компиляции</li>
            </ul>
          </div>
        </div>
        
        <!-- 4. Практические примеры -->
        <div v-if="currentTab === 3" class="tab-content">
          <h2>Практические примеры для собеседования</h2>
          
          <div class="explanation">
            <p>Ниже представлены реальные примеры использования enum, type, interface и перегрузок функций, которые демонстрируют их применение в различных ситуациях и показывают отличия между ними.</p>
          </div>
          
          <div class="example-selector">
            <button 
              v-for="(example, index) in examples" 
              :key="index"
              :class="{ active: currentExample === index }"
              @click="currentExample = index"
              class="example-button"
            >
              {{ example.title }}
            </button>
          </div>
          
          <div class="code-example">
            <h3>{{ examples[currentExample].title }}</h3>
            <p>{{ examples[currentExample].description }}</p>
            
            <div class="example-tabs">
              <button 
                v-for="(tab, index) in examples[currentExample].tabs" 
                :key="index"
                :class="{ active: currentExampleTab === index }"
                @click="currentExampleTab = index"
                class="example-tab-button"
              >
                {{ tab.title }}
              </button>
            </div>
            
            <div class="example-content">
              <pre class="code typescript">{{ examples[currentExample].tabs[currentExampleTab].code }}</pre>
            </div>
            
            <div class="example-notes">
              <h4>Ключевые моменты:</h4>
              <ul>
                <li v-for="(point, index) in examples[currentExample].keyPoints" :key="index">
                  {{ point }}
                </li>
              </ul>
            </div>
            
            <div class="interview-tips">
              <h4>Что сказать на собеседовании:</h4>
              <p>{{ examples[currentExample].interviewTip }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  // Состояние вкладок
  const tabs = [
    { title: "Перегрузка функций" },
    { title: "Enum vs Типы и интерфейсы" },
    { title: "Const Enum" },
    { title: "Практические примеры" }
  ];
  const currentTab = ref(0);
  
  // Состояние компиляции и анимации
  const showCompiled = ref([false, false, false]);
  const highlightCompiled = ref([false, false, false]);
  const animationStep = ref([0, 0, 0]);
  
  // Таймеры для анимации
  let animationTimers = [];
  
  function switchTab(index) {
    currentTab.value = index;
    // Сбрасываем состояние при переключении вкладок
    clearAllTimers();
    showCompiled.value = [false, false, false];
    highlightCompiled.value = [false, false, false];
    animationStep.value = [0, 0, 0];
  }
  
  function clearAllTimers() {
    animationTimers.forEach(timer => clearTimeout(timer));
    animationTimers = [];
  }
  
  function triggerCompilation(tabIndex) {
    // Сбрасываем предыдущую анимацию
    clearAllTimers();
    animationStep.value[tabIndex] = 0;
    
    // Показываем скомпилированный код
    showCompiled.value[tabIndex] = true;
    
    // Запускаем анимацию подсветки
    highlightCompiled.value[tabIndex] = true;
    setTimeout(() => {
      highlightCompiled.value[tabIndex] = false;
    }, 1000);
    
    // Запускаем пошаговую анимацию объяснения
    const steps = tabIndex === 0 ? 5 : tabIndex === 1 ? 3 : 3;
    for (let i = 1; i <= steps; i++) {
      const timer = setTimeout(() => {
        animationStep.value[tabIndex] = i;
      }, 1000 + i * 1500);
      animationTimers.push(timer);
    }
  }
  
  // Состояние для практических примеров
  const currentExample = ref(0);
  const currentExampleTab = ref(0);
  
  // Практические примеры
  const examples = [
    {
      title: "Типизация REST API с перегрузками",
      description: "Пример API клиента с перегрузками функций для разных типов запросов и возвращаемых данных",
      tabs: [
        {
          title: "api-client.ts",
          code: `// Типы для API
  interface User {
    id: number;
    name: string;
    email: string;
  }
  
  interface Post {
    id: number;
    title: string;
    content: string;
    userId: number;
  }
  
  // Типизированные эндпоинты
  const enum Endpoint {
    Users = "/api/users",
    Posts = "/api/posts",
    Comments = "/api/comments",
  }
  
  // Перегрузки для разных эндпоинтов
  async function fetchData(endpoint: Endpoint.Users): Promise<User[]>;
  async function fetchData(endpoint: Endpoint.Posts): Promise<Post[]>;
  async function fetchData<T>(endpoint: string): Promise<T>;
  
  // Реализация
  async function fetchData<T>(endpoint: string): Promise<T> {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(\`API request failed: \${response.status}\`);
    }
    return response.json();
  }
  
  // При использовании TypeScript знает правильный тип возврата
  const users = await fetchData(Endpoint.Users); // Тип: User[]
  const posts = await fetchData(Endpoint.Posts); // Тип: Post[]
  const comments = await fetchData<Comment[]>(Endpoint.Comments); // Нужно указывать тип`
        }
      ],
      keyPoints: [
        "Перегрузки позволяют получить точный тип возвращаемых данных для каждого эндпоинта",
        "Совмещение перегрузок с const enum для строгой типизации и меньшего JavaScript кода",
        "Можно добавить больше перегрузок для методов POST, PUT, DELETE с разными типами",
        "TypeScript обеспечивает безопасность типов во время разработки, но код остается компактным"
      ],
      interviewTip: "Приведенный пример демонстрирует преимущества строгой типизации API в TypeScript. Это особенно полезно в больших приложениях, где API может иметь десятки различных эндпоинтов. В реальных проектах такой подход повышает качество кода и упрощает рефакторинг, так как TypeScript может проверить все места использования API на соответствие типов."
    },
    {
      title: "Типобезопасное управление состоянием",
      description: "Пример использования enum и типов для создания безопасной системы управления состоянием приложения",
      tabs: [
        {
          title: "state-management.ts",
          code: `// Типы действий
  const enum ActionType {
    IncrementCounter = "INCREMENT_COUNTER",
    DecrementCounter = "DECREMENT_COUNTER",
    SetUser = "SET_USER",
    ClearUser = "CLEAR_USER",
  }
  
  // Типы данных
  interface User {
    id: number;
    name: string;
  }
  
  // Типы состояния
  interface AppState {
    counter: number;
    user: User | null;
  }
  
  // Типы действий с использованием дискриминированных объединений
  interface IncrementAction {
    type: ActionType.IncrementCounter;
    payload: number;
  }
  
  interface DecrementAction {
    type: ActionType.DecrementCounter;
    payload: number;
  }
  
  interface SetUserAction {
    type: ActionType.SetUser;
    payload: User;
  }
  
  interface ClearUserAction {
    type: ActionType.ClearUser;
  }
  
  // Объединение всех возможных действий
  type Action = 
    | IncrementAction 
    | DecrementAction 
    | SetUserAction 
    | ClearUserAction;
  
  // Функция-редьюсер с проверкой типов
  function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
      case ActionType.IncrementCounter:
        return {
          ...state,
          counter: state.counter + action.payload
        };
      
      case ActionType.DecrementCounter:
        return {
          ...state,
          counter: state.counter - action.payload
        };
      
      case ActionType.SetUser:
        return {
          ...state,
          user: action.payload
        };
      
      case ActionType.ClearUser:
        return {
          ...state,
          user: null
        };
        
      default:
        // TypeScript проверяет исчерпывающую обработку всех типов
        const exhaustiveCheck: never = action;
        return exhaustiveCheck;
    }
  }`
        },
        {
          title: "use-example.ts",
          code: `// Использование типобезопасного управления состоянием
  
  // Начальное состояние
  const initialState: AppState = {
    counter: 0,
    user: null
  };
  
  // Создание действий
  function createAction<T extends Action>(action: T): T {
    return action;
  }
  
  // Примеры использования
  const incrementBy5 = createAction({
    type: ActionType.IncrementCounter,
    payload: 5
  });
  
  const setCurrentUser = createAction({
    type: ActionType.SetUser,
    payload: {
      id: 1,
      name: "John Doe"
    }
  });
  
  // TypeScript выдаст ошибку при неправильном типе:
  const invalidAction = createAction({
    type: ActionType.IncrementCounter,
    payload: "5" // Ошибка: Type 'string' is not assignable to type 'number'
  });
  
  // TypeScript выдаст ошибку при отсутствии payload:
  const missingPayload = createAction({
    type: ActionType.SetUser
    // Ошибка: Property 'payload' is missing
  });
  
  // Применение действий
  let state = initialState;
  state = reducer(state, incrementBy5);
  state = reducer(state, setCurrentUser);`
        }
      ],
      keyPoints: [
        "Использование const enum для типов действий уменьшает размер JavaScript-кода",
        "Дискриминированные объединения (discriminated unions) обеспечивают безопасность типов",
        "TypeScript проверяет полноту обработки всех вариантов в switch с помощью never",
        "Функция createAction гарантирует корректность типов во время разработки"
      ],
      interviewTip: "Этот паттерн широко используется в Redux и других системах управления состоянием. На собеседовании стоит отметить, что использование TypeScript здесь дает значительные преимущества: автодополнение действий, проверка типов payload, выявление необработанных действий в редьюсерах. Также можно упомянуть, что const enum здесь подходит идеально, так как нам не нужен объект enum во время выполнения, только строковые литералы."
    },
    {
      title: "Проверка типов для событий",
      description: "Применение interface, enum и перегрузок для типизации системы событий",
      tabs: [
        {
          title: "event-system.ts",
          code: `// Типы событий
  enum EventType {
    Click = "click",
    Hover = "hover",
    Submit = "submit",
    Load = "load",
    Error = "error"
  }
  
  // Интерфейсы данных событий
  interface BaseEventData {
    timestamp: number;
  }
  
  interface ClickEventData extends BaseEventData {
    x: number;
    y: number;
    target: HTMLElement;
  }
  
  interface HoverEventData extends BaseEventData {
    x: number;
    y: number;
    duration: number;
  }
  
  interface SubmitEventData extends BaseEventData {
    formData: Record<string, string>;
    valid: boolean;
  }
  
  interface LoadEventData extends BaseEventData {
    duration: number;
    success: boolean;
  }
  
  interface ErrorEventData extends BaseEventData {
    message: string;
    code: number;
  }
  
  // Map типов событий к типам данных
  interface EventDataMap {
    [EventType.Click]: ClickEventData;
    [EventType.Hover]: HoverEventData;
    [EventType.Submit]: SubmitEventData;
    [EventType.Load]: LoadEventData;
    [EventType.Error]: ErrorEventData;
  }
  
  // Обобщенный тип EventHandler
  type EventHandler<T extends EventType> = (data: EventDataMap[T]) => void;
  
  // Класс EventEmitter с перегрузками
  class EventEmitter {
    private handlers: { [key in EventType]?: Array<EventHandler<any>> } = {};
  
    // Перегрузки для строгой типизации
    on<T extends EventType>(event: T, handler: EventHandler<T>): void;
    on(event: EventType, handler: Function): void {
      if (!this.handlers[event]) {
        this.handlers[event] = [];
      }
      this.handlers[event]!.push(handler);
    }
  
    // Перегрузки для emit с правильными типами данных
    emit<T extends EventType>(event: T, data: EventDataMap[T]): void;
    emit(event: EventType, data: any): void {
      const eventHandlers = this.handlers[event];
      if (eventHandlers) {
        eventHandlers.forEach(handler => handler(data));
      }
    }
  }
  
  // Пример использования
  const emitter = new EventEmitter();
  
  // TypeScript знает какой тип данных нужен для каждого события
  emitter.on(EventType.Click, (data) => {
    // data типизирован как ClickEventData
    console.log(\`Клик по координатам: \${data.x}, \${data.y}\`);
  });
  
  emitter.on(EventType.Error, (data) => {
    // data типизирован как ErrorEventData
    console.log(\`Ошибка \${data.code}: \${data.message}\`);
  });
  
  // Вызов с правильными типами данных
  emitter.emit(EventType.Click, {
    timestamp: Date.now(),
    x: 100,
    y: 200,
    target: document.body
  });
  
  // TypeScript выдаст ошибку при несоответствии типов
  emitter.emit(EventType.Click, {
    timestamp: Date.now(),
    message: "Wrong data" // Ошибка: неверный тип для события Click
  });`
        }
      ],
      keyPoints: [
        "Использование enum для типов событий с конкретными строковыми значениями",
        "Интерфейсы с наследованием для структуры данных событий",
        "Применение mapped types (EventDataMap) для связи типов событий с их данными",
        "Использование перегрузок для обеспечения типобезопасности при вызове методов"
      ],
      interviewTip: "Этот пример демонстрирует, как TypeScript позволяет создать безопасную систему событий с проверкой типов. На собеседовании можно объяснить, что в JavaScript такая проверка была бы возможна только во время выполнения, что приводит к более поздним сбоям и ошибкам. TypeScript же позволяет отловить эти проблемы на этапе компиляции, повышая надежность кода."
    },
    {
      title: "Фабрика компонентов с const enum",
      description: "Пример типобезопасной фабрики компонентов с использованием const enum для оптимизации",
      tabs: [
        {
          title: "component-factory.ts",
          code: `// Типы компонентов UI
  const enum ComponentType {
    Button = "BUTTON",
    Input = "INPUT",
    Select = "SELECT",
    Modal = "MODAL",
    Card = "CARD",
    Table = "TABLE"
  }
  
  // Базовый интерфейс для всех компонентов
  interface ComponentProps {
    id: string;
    className?: string;
  }
  
  // Специфические пропсы для каждого типа компонентов
  interface ButtonProps extends ComponentProps {
    text: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
  }
  
  interface InputProps extends ComponentProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: 'text' | 'number' | 'email' | 'password';
  }
  
  interface SelectProps extends ComponentProps {
    options: Array<{ value: string; label: string }>;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  }
  
  interface ModalProps extends ComponentProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }
  
  interface CardProps extends ComponentProps {
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
  }
  
  interface TableProps extends ComponentProps {
    data: any[];
    columns: Array<{ key: string; title: string }>;
    onRowClick?: (row: any) => void;
  }
  
  // Маппинг типов компонентов к их пропсам
  type ComponentPropsMap = {
    [ComponentType.Button]: ButtonProps;
    [ComponentType.Input]: InputProps;
    [ComponentType.Select]: SelectProps;
    [ComponentType.Modal]: ModalProps;
    [ComponentType.Card]: CardProps;
    [ComponentType.Table]: TableProps;
  };
  
  // Перегрузки для фабричной функции
  function createComponent<T extends ComponentType>(
    type: T,
    props: ComponentPropsMap[T]
  ): React.ReactElement;
  
  // Реализация
  function createComponent(type: ComponentType, props: any): React.ReactElement {
    switch (type) {
      case ComponentType.Button:
        return &ltButton {...props} /&gt;;
      
      case ComponentType.Input:
        return &ltInput {...props} /&gt;;
      
      case ComponentType.Select:
        return &ltSelect {...props} /&gt;;
      
      case ComponentType.Modal:
        return &ltModal {...props} /&gt;;
      
      case ComponentType.Card:
        return &ltCard {...props} /&gt;;
      
      case ComponentType.Table:
        return &ltTable {...props} /&gt;;
      
      default:
        throw new Error(\`Unknown component type: \${type}\`);
    }
  }
  
  // Пример использования
  const button = createComponent(ComponentType.Button, {
    id: 'submit-btn',
    text: 'Submit',
    onClick: () => console.log('Button clicked'),
    variant: 'primary'
  });
  
  const input = createComponent(ComponentType.Input, {
    id: 'username-input',
    value: '',
    onChange: (value) => console.log('Input changed:', value),
    placeholder: 'Enter username',
    type: 'text'
  });
  
  // TypeScript выдаст ошибку при несоответствии типов
  const invalidButton = createComponent(ComponentType.Button, {
    id: 'invalid-button',
    // Ошибка: отсутствует обязательное свойство 'text'
    onClick: () => {}
  });`
        }
      ],
      keyPoints: [
        "Использование const enum для типов компонентов для оптимизации выходного JavaScript-кода",
        "Выстраивание иерархии интерфейсов с наследованием для пропсов компонентов",
        "Использование маппинга типов для связи типов компонентов с их пропсами",
        "Типобезопасная фабричная функция с перегрузками для проверки соответствия пропсов типу компонента"
      ],
      interviewTip: "На собеседовании можно подчеркнуть, что такой подход особенно полезен для систем компонентов UI, когда нужно гарантировать, что каждый компонент получает правильные пропсы. Использование const enum здесь оптимизирует код для продакшена, заменяя обращения на строковые литералы. Также стоит отметить, что этот паттерн совместим с различными UI-библиотеками (React, Vue и т.д.), так как абстрагирует логику создания компонентов."
    }
  ];
  
  // Сброс табов примеров при изменении примера
  watch(currentExample, () => {
    currentExampleTab.value = 0;
  });
  </script>
  
  <style scoped>
  .ts-explorer {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
    background-color: #f8f9fa;
    border-radius: 8px;
  }
  
  h1, h2, h3, h4 {
    color: #2c3e50;
  }
  
  h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 30px;
  }
  
  h2 {
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-size: 1.6rem;
  }
  
  h3 {
    font-size: 1.3rem;
    margin-top: 25px;
    margin-bottom: 15px;
  }
  
  /* Стили для табов */
  .tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .tab-button {
    padding: 10px 20px;
    background-color: #e9ecef;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .tab-button:hover {
    background-color: #dee2e6;
  }
  
  .tab-button.active {
    background-color: #3498db;
    color: white;
  }
  
  .content-container {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .tab-content {
    animation: fadeIn 0.5s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Стили для кода */
  .explanation {
    margin-bottom: 20px;
    line-height: 1.6;
  }
  
  .code-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .code-container.compiled .code-panel {
    grid-template-columns: 1fr 1fr;
  }
  
  .code-panel {
    background-color: #f8f9fa;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }
  
  .code-panel h3 {
    background-color: #e9ecef;
    margin: 0;
    padding: 10px 15px;
    font-size: 1rem;
    display: flex;
    align-items: center;
  }
  
  .result {
    font-size: 0.8rem;
    color: #6c757d;
    font-weight: normal;
    margin-left: 10px;
  }
  
  .code {
    margin: 0;
    padding: 15px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    overflow-x: auto;
    white-space: pre;
  }
  
  .typescript {
    background-color: #f5f5f5;
    color: #333;
  }
  
  .javascript {
    background-color: #fffde7;
    color: #333;
  }
  
  .compile-button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .compile-button:hover {
    background-color: #2980b9;
  }
  
  .animate-highlight {
    animation: highlight 1s ease;
  }
  
  @keyframes highlight {
    0% { background-color: #fffde7; }
    50% { background-color: #fff9c4; }
    100% { background-color: #fffde7; }
  }
  
  /* Стили для анимации шагов */
  .animation-container {
    margin-bottom: 30px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #3498db;
  }
  
  .animation-title {
    font-weight: bold;
    margin-bottom: 15px;
    color: #2c3e50;
  }
  
  .animation-step {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    opacity: 0.5;
    transition: all 0.5s ease;
  }
  
  .animation-step.active {
    opacity: 1;
  }
  
  .step-number {
    width: 30px;
    height: 30px;
    background-color: #3498db;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: 15px;
    font-weight: bold;
  }
  
  .step-desc {
    flex: 1;
  }
  
  .important-note {
    margin-top: 20px;
    padding: 15px;
    background-color: #fdfdea;
    border-left: 4px solid #f1c40f;
    border-radius: 4px;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.5s ease;
  }
  
  .important-note.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Стили для анимации enum */
  .animation-visual {
    margin: 20px 0;
    display: flex;
    justify-content: center;
  }
  
  .enum-visualization {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .enum-object {
    font-family: monospace;
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 6px;
    width: 300px;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.5s ease;
  }
  
  .enum-object.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .enum-prop {
    margin-left: 20px;
    color: #2980b9;
  }
  
  .enum-prop.reverse {
    color: #27ae60;
  }
  
  .arrows {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.5s ease;
    transition-delay: 0.5s;
  }
  
  .arrows.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .arrow-left, .arrow-right {
    display: flex;
    align-items: center;
  }
  
  .arrow {
    font-size: 1.5rem;
    margin: 0 10px;
    color: #e74c3c;
  }
  
  .desc {
    font-size: 0.9rem;
    color: #7f8c8d;
  }
  
  /* Стили для анимации const enum */
  .const-enum-animation {
    margin: 20px 0;
  }
  
  .code-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.5s ease;
  }
  
  .code-step.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .ts-code, .js-code {
    font-family: monospace;
    padding: 10px 15px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    margin-bottom: 10px;
  }
  
  .ts-code {
    background-color: #e3f2fd;
    color: #0d47a1;
  }
  
  .js-code {
    background-color: #fff9c4;
    color: #f57f17;
  }
  
  .arrow-down {
    font-size: 2rem;
    margin: 10px 0;
    color: #009688;
  }
  
  .inline-replace {
    font-weight: bold;
    color: #009688;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { opacity: 0.8; }
    50% { opacity: 1; }
    100% { opacity: 0.8; }
  }
  
  /* Стили для практических примеров */
  .practical-use {
    margin-top: 30px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #27ae60;
  }
  
  .practical-example {
    margin-top: 15px;
  }
  
  .example-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  
  .example-explanation {
    margin-top: 15px;
  }
  
  .example-explanation ul {
    padding-left: 20px;
  }
  
  .example-explanation li {
    margin-bottom: 5px;
  }
  
  /* Стили для сравнительной таблицы */
  .comparison-table {
    margin: 20px 0;
    overflow-x: auto;
  }
  
  .comparison-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .comparison-table th, .comparison-table td {
    padding: 10px 15px;
    text-align: left;
    border: 1px solid #dee2e6;
  }
  
  .comparison-table th {
    background-color: #e9ecef;
    font-weight: bold;
  }
  
  .comparison-table tr:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  .yes {
    color: #27ae60;
    font-weight: bold;
  }
  
  .no {
    color: #e74c3c;
  }
  
  .partial {
    color: #f39c12;
  }
  
  /* Стили для enum преимуществ и недостатков */
  .benefits-drawbacks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 20px 0;
  }
  
  .benefits, .drawbacks {
    padding: 15px;
    border-radius: 8px;
  }
  
  .benefits {
    background-color: #e3f2fd;
    border-left: 4px solid #2196f3;
  }
  
  .drawbacks {
    background-color: #ffebee;
    border-left: 4px solid #f44336;
  }
  
  .benefits h3, .drawbacks h3 {
    margin-top: 0;
    font-size: 1.1rem;
  }
  
  .benefits ul, .drawbacks ul {
    padding-left: 20px;
  }
  
  .when-to-use {
    margin-top: 20px;
    padding: 15px;
    background-color: #e8f5e9;
    border-left: 4px solid #4caf50;
    border-radius: 8px;
  }
  
  .when-to-use h3 {
    margin-top: 0;
    font-size: 1.1rem;
  }
  
  .when-to-use ul {
    padding-left: 20px;
  }
  
  /* Стили для примеров на собеседовании */
  .example-selector {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .example-button {
    padding: 10px 15px;
    background-color: #e9ecef;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .example-button:hover {
    background-color: #dee2e6;
  }
  
  .example-button.active {
    background-color: #3498db;
    color: white;
  }
  
  .code-example {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }
  
  .example-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid #dee2e6;
    padding-bottom: 10px;
  }
  
  .example-tab-button {
    padding: 8px 12px;
    background-color: #fff;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .example-tab-button:hover {
    background-color: #f8f9fa;
  }
  
  .example-tab-button.active {
    background-color: #4caf50;
    color: white;
    border-color: #4caf50;
  }
  
  .example-content {
    margin-bottom: 20px;
  }
  
  .example-notes, .interview-tips {
    margin-top: 20px;
  }
  
  .example-notes h4, .interview-tips h4 {
    margin-bottom: 10px;
  }
  
  .interview-tips {
    background-color: #fff8e1;
    padding: 15px;
    border-radius: 6px;
    border-left: 4px solid #ffc107;
  }
  
  .use-cases {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 20px 0;
  }
  
  .use-case {
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 6px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }
  
  .use-case h4 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.1rem;
  }
  
  /* Адаптивный дизайн */
  @media (max-width: 768px) {
    .benefits-drawbacks {
      grid-template-columns: 1fr;
    }
    
    .use-cases {
      grid-template-columns: 1fr;
    }
    
    .code-container.compiled .code-panel {
      grid-template-columns: 1fr;
    }
  }
  </style>