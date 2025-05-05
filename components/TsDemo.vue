<template>
    <div class="ts-generics">
      <h1>Типизация универсальных функций с помощью дженериков в TypeScript</h1>
      
      <!-- Переключатель между примерами -->
      <div class="tabs">
        <button 
          v-for="(tab, index) in tabs" 
          :key="tab.id"
          :class="['tab-button', { active: currentTab === index }]"
          @click="currentTab = index"
        >
          {{ tab.title }}
        </button>
      </div>
      
      <!-- Задача 1: getObjField -->
      <div v-if="currentTab === 0" class="task-container">
        <h2>Задача 1: Типизация функции <code>getObjField</code></h2>
        <p class="task-description">
          Нам нужно типизировать функцию, которая принимает объект и ключ и возвращает значение по этому ключу.
          Важно, чтобы ключ мог быть только тем, который есть в объекте.
        </p>
        
        <div class="code-container">
          <h3>Исходный код:</h3>
          <pre class="code">
  const getObjField = (obj, key) => {
    return obj[key];
  };
          </pre>
          
          <h3>Решение:</h3>
          <pre class="code">
  const getObjField = &lt;T extends object, K extends keyof T&gt;(obj: T, key: K): T[K] => {
    return obj[key];
  };
          </pre>
        </div>
        
        <div class="explanation">
          <h3>Объяснение решения:</h3>
          <div class="explanation-steps">
            <div class="step" :class="{ active: animationStep >= 1 }">
              <div class="step-number">1</div>
              <div class="step-content">
                <p><code>&lt;T extends object&gt;</code> – мы создаём дженерик-параметр <code>T</code>, который должен быть объектом.</p>
              </div>
            </div>
            
            <div class="step" :class="{ active: animationStep >= 2 }">
              <div class="step-number">2</div>
              <div class="step-content">
                <p><code>K extends keyof T</code> – создаём второй дженерик-параметр <code>K</code>, который должен быть ключом объекта <code>T</code>.</p>
                <p>Оператор <code>keyof</code> возвращает объединённый тип (union type) из всех ключей объекта.</p>
              </div>
            </div>
            
            <div class="step" :class="{ active: animationStep >= 3 }">
              <div class="step-number">3</div>
              <div class="step-content">
                <p><code>(obj: T, key: K)</code> – указываем типы для параметров функции.</p>
              </div>
            </div>
            
            <div class="step" :class="{ active: animationStep >= 4 }">
              <div class="step-number">4</div>
              <div class="step-content">
                <p><code>: T[K]</code> – указываем возвращаемый тип. Это тип значения, соответствующего ключу <code>K</code> в объекте типа <code>T</code>.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="animation-container">
          <h3>Визуализация работы типизированной функции:</h3>
          <div class="animation-content">
            <div class="code-editor">
              <div class="editor-tabs">
                <button class="editor-tab active">example.ts</button>
              </div>
              <div class="editor-content">
                <pre class="code-with-highlight">
  const user = {
    id: 1,
    name: "Алексей",
    age: 30,
    isAdmin: false
  };
  
  // Корректное использование
  const userName = getObjField(user, "name");
  // userName: string = "Алексей"
  
  // Ошибка: Property 'email' does not exist on type...
  const userEmail = getObjField(user, <span class="error-highlight">"email"</span>);
                </pre>
              </div>
            </div>
            
            <div class="animation-visual">
              <div class="animation-title">Процесс проверки типов</div>
              <div class="animation-demo">
                <div class="object-box" :class="{ active: animationStep >= 1 }">
                  <div class="box-title">Объект user</div>
                  <div class="box-content">
                    <div class="property-item">
                      <span class="property-key">id:</span>
                      <span class="property-value">1</span>
                      <span class="property-type">number</span>
                    </div>
                    <div class="property-item highlight" :class="{ active: animationStep >= 5 }">
                      <span class="property-key">name:</span>
                      <span class="property-value">"Алексей"</span>
                      <span class="property-type">string</span>
                    </div>
                    <div class="property-item">
                      <span class="property-key">age:</span>
                      <span class="property-value">30</span>
                      <span class="property-type">number</span>
                    </div>
                    <div class="property-item">
                      <span class="property-key">isAdmin:</span>
                      <span class="property-value">false</span>
                      <span class="property-type">boolean</span>
                    </div>
                  </div>
                </div>
                
                <div class="key-check-process" :class="{ active: animationStep >= 2 }">
                  <div class="key-check valid" :class="{ active: animationStep >= 5 }">
                    <div class="key-value">"name"</div>
                    <div class="check-result">✓ Ключ существует в объекте</div>
                  </div>
                  <div class="key-check invalid" :class="{ active: animationStep >= 6 }">
                    <div class="key-value">"email"</div>
                    <div class="check-result">✗ Ключ не существует в объекте</div>
                  </div>
                </div>
                
                <div class="result-box" :class="{ active: animationStep >= 5 }">
                  <div class="box-title">Результат вызова</div>
                  <div class="box-content">
                    <div class="result-item">
                      <div class="result-value">"Алексей"</div>
                      <div class="result-type">string</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="animation-controls">
                <button class="control-button" @click="startAnimation" :disabled="isAnimating">
                  {{ isAnimating ? 'Анимация...' : 'Запустить анимацию' }}
                </button>
                <button class="control-button reset" @click="resetAnimation" :disabled="!animationStarted">
                  Сбросить
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="practical-tips">
          <h3>Практические применения:</h3>
          <ul>
            <li>
              <strong>Безопасный доступ к полям объектов:</strong> Вместо использования индексной сигнатуры <code>obj[key]</code> без типизации, что может привести к ошибкам времени выполнения.
            </li>
            <li>
              <strong>Безопасные селекторы данных в Redux/Vuex:</strong> Типизация функций выборки данных из хранилища состояния.
            </li>
            <li>
              <strong>Работа с API:</strong> Типизация функций, обрабатывающих JSON-ответы от сервера.
            </li>
            <li>
              <strong>Работа с конфигурациями:</strong> Безопасный доступ к полям конфигурационных объектов.
            </li>
          </ul>
        </div>
        
        <div class="pitfalls">
          <h3>Подводные камни:</h3>
          <div class="pitfall-item">
            <h4>1. Проблема с пустыми объектами</h4>
            <pre class="code">
  // Для пустого объекта keyof {} является never
  const emptyObj = {};
  const value = getObjField(emptyObj, "anyKey"); // Ошибка: тип 'never' не имеет значений
            </pre>
            <p>Решение: убедитесь, что ваш объект имеет все необходимые поля.</p>
          </div>
          
          <div class="pitfall-item">
            <h4>2. Опциональные поля</h4>
            <pre class="code">
  interface User {
    id: number;
    name: string;
    email?: string; // опциональное поле
  }
  
  const user: User = { id: 1, name: "Алексей" };
  const email = getObjField(user, "email"); // email: string | undefined
            </pre>
            <p>Обратите внимание: для опциональных полей результат будет иметь тип с <code>undefined</code>.</p>
          </div>
          
          <div class="pitfall-item">
            <h4>3. Индексные сигнатуры</h4>
            <pre class="code">
  interface Dictionary {
    [key: string]: string;
  }
  
  const dict: Dictionary = { a: "один", b: "два" };
  const value = getObjField(dict, "c"); // Компилируется успешно, но вернёт undefined
            </pre>
            <p>Для объектов с индексной сигнатурой компилятор разрешит любой ключ, соответствующий типу индекса.</p>
          </div>
        </div>
      </div>
      
      <!-- Задача 2: getLength -->
      <div v-if="currentTab === 1" class="task-container">
        <h2>Задача 2: Типизация функции <code>getLength</code></h2>
        <p class="task-description">
          Нужно типизировать функцию, чтобы она принимала только объекты с полем length.
        </p>
        
        <div class="code-container">
          <h3>Исходный код:</h3>
          <pre class="code">
  const getLength = (data) => {
    return data.length;
  };
  
  getLength([1, 2, 3]); // ok
  getLength({ length: 777 }); // ok
  getLength({ key: 1 }); // error
          </pre>
          
          <h3>Решение:</h3>
          <pre class="code">
  interface HasLength {
    length: number;
  }
  
  const getLength = &lt;T extends HasLength&gt;(data: T): number => {
    return data.length;
  };
          </pre>
        </div>
        
        <div class="explanation">
          <h3>Объяснение решения:</h3>
          <div class="explanation-steps">
            <div class="step" :class="{ active: lengthAnimStep >= 1 }">
              <div class="step-number">1</div>
              <div class="step-content">
                <p>Создаём интерфейс <code>HasLength</code>, который описывает структуру с полем <code>length</code>.</p>
              </div>
            </div>
            
            <div class="step" :class="{ active: lengthAnimStep >= 2 }">
              <div class="step-number">2</div>
              <div class="step-content">
                <p><code>&lt;T extends HasLength&gt;</code> – создаём дженерик-параметр <code>T</code>, который должен расширять интерфейс <code>HasLength</code>, т.е. иметь поле <code>length</code>.</p>
              </div>
            </div>
            
            <div class="step" :class="{ active: lengthAnimStep >= 3 }">
              <div class="step-number">3</div>
              <div class="step-content">
                <p><code>(data: T)</code> – указываем, что параметр <code>data</code> имеет тип <code>T</code>.</p>
              </div>
            </div>
            
            <div class="step" :class="{ active: lengthAnimStep >= 4 }">
              <div class="step-number">4</div>
              <div class="step-content">
                <p><code>: number</code> – указываем, что функция возвращает число (длину).</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="animation-container">
          <h3>Визуализация работы типизированной функции:</h3>
          <div class="animation-content">
            <div class="code-editor">
              <div class="editor-tabs">
                <button class="editor-tab active">length-example.ts</button>
              </div>
              <div class="editor-content">
                <pre class="code-with-highlight">
  // Пример 1: Массив (у массивов есть свойство length)
  const arr = [1, 2, 3, 4, 5];
  const arrLength = getLength(arr); // ✓ OK
  
  // Пример 2: Объект с полем length
  const customObj = {
    length: 777,
    otherField: "test"
  };
  const objLength = getLength(customObj); // ✓ OK
  
  // Пример 3: Объект без поля length
  const invalidObj = {
    key: 1,
    value: "test"
  };
  const invalidLength = getLength(<span class="error-highlight">invalidObj</span>); // ✗ Ошибка!
  // Argument of type '{ key: number; value: string; }' is not assignable
  // to parameter of type 'HasLength'.
  // Property 'length' is missing in type '{ key: number; value: string; }'
  // but required in type 'HasLength'.
                </pre>
              </div>
            </div>
            
            <div class="animation-visual">
              <div class="animation-title">Процесс проверки типов</div>
              <div class="animation-demo">
                <div class="object-examples" :class="{ active: lengthAnimStep >= 1 }">
                  <div class="example-box valid" :class="{ active: lengthAnimStep >= 5 }">
                    <div class="box-title">Пример 1: Массив</div>
                    <div class="box-content">
                      <div class="property-item">
                        <span class="property-value">[1, 2, 3, 4, 5]</span>
                        <span class="property-type">Array&lt;number&gt;</span>
                      </div>
                      <div class="property-item highlight">
                        <span class="property-key">length:</span>
                        <span class="property-value">5</span>
                        <span class="property-type">number</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="example-box valid" :class="{ active: lengthAnimStep >= 6 }">
                    <div class="box-title">Пример 2: Объект с length</div>
                    <div class="box-content">
                      <div class="property-item highlight">
                        <span class="property-key">length:</span>
                        <span class="property-value">777</span>
                        <span class="property-type">number</span>
                      </div>
                      <div class="property-item">
                        <span class="property-key">otherField:</span>
                        <span class="property-value">"test"</span>
                        <span class="property-type">string</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="example-box invalid" :class="{ active: lengthAnimStep >= 7 }">
                    <div class="box-title">Пример 3: Объект без length</div>
                    <div class="box-content">
                      <div class="property-item">
                        <span class="property-key">key:</span>
                        <span class="property-value">1</span>
                        <span class="property-type">number</span>
                      </div>
                      <div class="property-item">
                        <span class="property-key">value:</span>
                        <span class="property-value">"test"</span>
                        <span class="property-type">string</span>
                      </div>
                      <div class="property-item missing">
                        <span class="property-key">length:</span>
                        <span class="property-error">Отсутствует!</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="type-check-process" :class="{ active: lengthAnimStep >= 2 }">
                  <div class="check-constraint">
                    <div class="constraint-title">Ограничение типа:</div>
                    <div class="constraint-code">
                      interface HasLength {
                        length: number;
                      }
                    </div>
                  </div>
                  <div class="type-check-results" :class="{ active: lengthAnimStep >= 5 }">
                    <div class="check-result valid" :class="{ active: lengthAnimStep >= 5 }">
                      <div class="check-icon">✓</div>
                      <div class="check-text">Массивы имеют поле length типа number</div>
                    </div>
                    <div class="check-result valid" :class="{ active: lengthAnimStep >= 6 }">
                      <div class="check-icon">✓</div>
                      <div class="check-text">Объект с полем length соответствует ограничению</div>
                    </div>
                    <div class="check-result invalid" :class="{ active: lengthAnimStep >= 7 }">
                      <div class="check-icon">✗</div>
                      <div class="check-text">Ошибка: объект не содержит обязательное поле length</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="animation-controls">
                <button class="control-button" @click="startLengthAnimation" :disabled="isLengthAnimating">
                  {{ isLengthAnimating ? 'Анимация...' : 'Запустить анимацию' }}
                </button>
                <button class="control-button reset" @click="resetLengthAnimation" :disabled="!lengthAnimStarted">
                  Сбросить
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="practical-tips">
          <h3>Практические применения:</h3>
          <ul>
            <li>
              <strong>Обработка коллекций:</strong> Функции, которые работают с различными типами коллекций, имеющими свойство length.
            </li>
            <li>
              <strong>Текстовые преобразования:</strong> Обработка строк и массивов одинаковым образом.
            </li>
            <li>
              <strong>Обработка DOM элементов:</strong> Работа с DOM коллекциями, такими как NodeList, которые имеют свойство length.
            </li>
            <li>
              <strong>Пользовательские структуры данных:</strong> Создание пользовательских коллекций, которые могут использоваться с общими функциями для коллекций.
            </li>
          </ul>
        </div>
        
        <div class="pitfalls">
          <h3>Подводные камни:</h3>
          <div class="pitfall-item">
            <h4>1. Проблема с типом length</h4>
            <pre class="code">
  // Объект с length неправильного типа
  const badObj = {
    length: "5" // length имеет тип string, а не number
  };
  
  const len = getLength(badObj); // Ошибка: Type 'string' is not assignable to type 'number'
            </pre>
            <p>Убедитесь, что свойство length имеет тип number.</p>
          </div>
          
          <div class="pitfall-item">
            <h4>2. Расширяемость интерфейса</h4>
            <pre class="code">
  // Более специфичный интерфейс
  interface StringCollection extends HasLength {
    [index: number]: string;
  }
  
  const getStringCollectionLength = (data: StringCollection): number => {
    return data.length;
  };
            </pre>
            <p>Можно расширять базовый интерфейс для создания более специфичных требований.</p>
          </div>
          
          <div class="pitfall-item">
            <h4>3. Дополнительная проверка на runtime</h4>
            <pre class="code">
  const getSafeLengthWithCheck = (data: any): number => {
    if (typeof data.length !== 'number') {
      throw new Error('Object does not have a valid length property');
    }
    return data.length;
  };
            </pre>
            <p>Для более безопасного использования в JavaScript можно добавить проверки во время выполнения.</p>
          </div>
        </div>
      </div>
      
      <!-- Дополнительная информация -->
      <div v-if="currentTab === 2" class="task-container">
        <h2>Дополнительная информация: выведение типов в TypeScript</h2>
        
        <div class="code-container">
          <h3>Проблема с выведением типов:</h3>
          <pre class="code">
  const getObjField = &lt;T extends object, K extends keyof T&gt;(obj: T, key: K) => {
    return obj[key];
  };
  
  const user = { name: "Иван", age: 30 };
  const value = getObjField(user, "name");
  // Какой тип у value?
          </pre>
        </div>
        
        <div class="explanation">
          <h3>Объяснение проблемы:</h3>
          <p>
            В данном коде отсутствует явное указание возвращаемого типа функции. Хотя TypeScript может вывести возвращаемый тип 
            <code>T[K]</code>, явное указание типа делает код более читаемым и предотвращает потенциальные ошибки при изменении реализации.
          </p>
          
          <p>
            Правильная запись с явным возвращаемым типом:
          </p>
          
          <pre class="code">
  const getObjField = &lt;T extends object, K extends keyof T&gt;(obj: T, key: K): T[K] => {
    return obj[key];
  };
          </pre>
          
          <p>
            Теперь TypeScript точно знает, что функция должна возвращать значение типа <code>T[K]</code>, 
            и будет проверять, что реализация функции соответствует этому типу.
          </p>
        </div>
        
        <div class="comparison">
          <h3>Сравнение решений для различных задач:</h3>
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Задача</th>
                <th>Решение</th>
                <th>Ключевые особенности</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Доступ к полям объекта</td>
                <td>
                  <pre class="code-inline">
  const getObjField = &lt;T extends object, K extends keyof T&gt;(obj: T, key: K): T[K] => {
    return obj[key];
  };</pre>
                </td>
                <td>
                  <ul>
                    <li>Тип ключа ограничен фактическими ключами объекта</li>
                    <li>Возвращаемый тип соответствует типу значения по ключу</li>
                    <li>Обеспечивает type safety на уровне компиляции</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>Работа с объектами, имеющими length</td>
                <td>
                  <pre class="code-inline">
  interface HasLength {
    length: number;
  }
  
  const getLength = &lt;T extends HasLength&gt;(data: T): number => {
    return data.length;
  };</pre>
                </td>
                <td>
                  <ul>
                    <li>Функция принимает любой тип, имеющий свойство length</li>
                    <li>Подходит для массивов, строк и пользовательских объектов</li>
                    <li>Возвращает всегда число независимо от структуры объекта</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>Трансформация значений объекта</td>
                <td>
                  <pre class="code-inline">
  const transformObjectValues = &lt;T extends object, U&gt;(
    obj: T, 
    transformer: (value: T[keyof T]) => U
  ): Record&lt;keyof T, U&gt; => {
    const result = {} as Record&lt;keyof T, U&gt;;
    for (const key in obj) {
      result[key] = transformer(obj[key]);
    }
    return result;
  };</pre>
                </td>
                <td>
                  <ul>
                    <li>Применяет функцию трансформации ко всем значениям объекта</li>
                    <li>Сохраняет структуру ключей исходного объекта</li>
                    <li>Обеспечивает типизацию для результирующего объекта</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="additional-resources">
          <h3>Полезные ресурсы:</h3>
          <ul>
            <li>
              <strong>Официальная документация TypeScript:</strong> 
              <a href="https://www.typescriptlang.org/docs/handbook/2/generics.html" target="_blank">Generics</a>,
              <a href="https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html" target="_blank">Indexed Access Types</a>
            </li>
            <li>
              <strong>TypeScript Deep Dive:</strong> 
              <a href="https://basarat.gitbook.io/typescript/type-system/generics" target="_blank">Generics</a>,
              <a href="https://basarat.gitbook.io/typescript/type-system/index-signatures" target="_blank">Index Signatures</a>
            </li>
            <li>
              <strong>Применение в TypeScript Utility Types:</strong> изучите исходный код 
              <a href="https://github.com/microsoft/TypeScript/blob/main/src/lib/es5.d.ts" target="_blank">стандартных utility типов</a> 
              в TypeScript, таких как Pick, Omit, Partial и другие.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Определение вкладок
  const tabs = [
    { id: 'getObjField', title: 'Задача 1: getObjField' },
    { id: 'getLength', title: 'Задача 2: getLength' },
    { id: 'additional', title: 'Дополнительная информация' }
  ];
  
  // Текущая активная вкладка
  const currentTab = ref(0);
  
  // Анимация для первой задачи
  const animationStep = ref(0);
  const isAnimating = ref(false);
  const animationStarted = ref(false);
  
  // Анимация для второй задачи
  const lengthAnimStep = ref(0);
  const isLengthAnimating = ref(false);
  const lengthAnimStarted = ref(false);
  
  // Запуск анимации для первой задачи
  function startAnimation() {
    if (isAnimating.value) return;
    
    animationStep.value = 0;
    isAnimating.value = true;
    animationStarted.value = true;
    
    // Анимация шагов объяснения
    for (let i = 1; i <= 4; i++) {
      setTimeout(() => {
        animationStep.value = i;
      }, i * 1000);
    }
    
    // Анимация визуализации
    setTimeout(() => {
      animationStep.value = 5; // Активация примера с name
      setTimeout(() => {
        animationStep.value = 6; // Активация примера с email
        setTimeout(() => {
          isAnimating.value = false;
        }, 1000);
      }, 1500);
    }, 5000);
  }
  
  // Сброс анимации для первой задачи
  function resetAnimation() {
    animationStep.value = 0;
    isAnimating.value = false;
  }
  
  // Запуск анимации для второй задачи
  function startLengthAnimation() {
    if (isLengthAnimating.value) return;
    
    lengthAnimStep.value = 0;
    isLengthAnimating.value = true;
    lengthAnimStarted.value = true;
    
    // Анимация шагов объяснения
    for (let i = 1; i <= 4; i++) {
      setTimeout(() => {
        lengthAnimStep.value = i;
      }, i * 1000);
    }
    
    // Анимация визуализации
    setTimeout(() => {
      lengthAnimStep.value = 5; // Активация примера с массивом
      setTimeout(() => {
        lengthAnimStep.value = 6; // Активация примера с объектом с length
        setTimeout(() => {
          lengthAnimStep.value = 7; // Активация примера с объектом без length
          setTimeout(() => {
            isLengthAnimating.value = false;
          }, 1000);
        }, 1500);
      }, 1500);
    }, 5000);
  }
  
  // Сброс анимации для второй задачи
  function resetLengthAnimation() {
    lengthAnimStep.value = 0;
    isLengthAnimating.value = false;
  }
  </script>
  
  <style>
  .ts-generics {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #333;
    background-color: #fff;
  }
  
  h1, h2, h3, h4 {
    color: #000;
    margin-top: 0;
  }
  
  h1 {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 30px;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    border-bottom: 2px solid #333;
    padding-bottom: 8px;
  }
  
  h3 {
    font-size: 1.2rem;
    margin-top: 25px;
    margin-bottom: 15px;
  }
  
  code {
    background-color: #f5f5f5;
    padding: 2px 4px;
    border-radius: 3px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9em;
  }
  
  /* Стили для вкладок */
  .tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }
  
  .tab-button {
    padding: 10px 20px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .tab-button:hover {
    background-color: #e0e0e0;
  }
  
  .tab-button.active {
    background-color: #333;
    color: #fff;
    border-color: #333;
  }
  
  .task-container {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.5s ease;
  }
  
  .task-description {
    font-size: 1.1rem;
    line-height: 1.5;
    margin-bottom: 20px;
  }
  
  /* Стили для блоков кода */
  .code-container {
    margin-bottom: 30px;
  }
  
  .code {
    background-color: #282c34;
    color: #abb2bf;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    white-space: pre;
  }
  
  .code-inline {
    background-color: #282c34;
    color: #abb2bf;
    padding: 10px;
    border-radius: 4px;
    overflow-x: auto;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.85rem;
    line-height: 1.4;
    white-space: pre;
    margin: 5px 0;
  }
  
  .code-with-highlight {
    background-color: #282c34;
    color: #abb2bf;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    white-space: pre;
  }
  
  .error-highlight {
    background-color: rgba(224, 80, 80, 0.3);
    border-bottom: 2px wavy #e05050;
    padding: 0 2px;
  }
  
  /* Стили для объяснения */
  .explanation {
    margin-bottom: 30px;
  }
  
  .explanation-steps {
    margin-top: 15px;
  }
  
  .step {
    display: flex;
    margin-bottom: 15px;
    opacity: 0.6;
    transition: all 0.5s ease;
  }
  
  .step.active {
    opacity: 1;
  }
  
  .step-number {
    width: 30px;
    height: 30px;
    background-color: #333;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: 15px;
    flex-shrink: 0;
  }
  
  .step-content {
    flex: 1;
  }
  
  .step-content p {
    margin: 0;
    line-height: 1.5;
  }
  
  /* Стили для анимации */
  .animation-container {
    margin: 30px 0;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  .animation-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  @media (min-width: 992px) {
    .animation-content {
      flex-direction: row;
    }
    
    .code-editor {
      width: 45%;
    }
    
    .animation-visual {
      width: 55%;
    }
  }
  
  .code-editor {
    border: 1px solid #ddd;
    border-radius: 6px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }
  
  .editor-tabs {
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    padding: 8px 15px;
  }
  
  .editor-tab {
    background: none;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 0.9rem;
  }
  
  .editor-tab.active {
    border-bottom: 2px solid #333;
    font-weight: bold;
  }
  
  .editor-content {
    padding: 0;
  }
  
  .animation-visual {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .animation-title {
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
    font-size: 1.1rem;
  }
  
  .animation-demo {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 15px;
    border: 1px dashed #ccc;
    border-radius: 6px;
    min-height: 300px;
  }
  
  .animation-controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
  }
  
  .control-button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
  }
  
  .control-button:hover {
    background-color: #45a049;
  }
  
  .control-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .control-button.reset {
    background-color: #f44336;
  }
  
  .control-button.reset:hover {
    background-color: #d32f2f;
  }
  
  /* Стили для объектов в анимации */
  .object-box {
    border: 2px solid #666;
    border-radius: 6px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
  }
  
  .object-box.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .box-title {
    background-color: #666;
    color: #fff;
    padding: 8px 12px;
    font-weight: bold;
    font-size: 0.9rem;
  }
  
  .box-content {
    padding: 12px;
  }
  
  .property-item {
    margin-bottom: 8px;
    padding: 5px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.03);
    transition: all 0.5s ease;
  }
  
  .property-item.highlight {
    background-color: rgba(76, 175, 80, 0.1);
  }
  
  .property-item.highlight.active {
    background-color: rgba(76, 175, 80, 0.3);
  }
  
  .property-key {
    font-weight: bold;
    color: #0b7ad1;
    margin-right: 5px;
  }
  
  .property-value {
    color: #d13e0b;
    margin-right: 10px;
  }
  
  .property-type {
    color: #666;
    font-size: 0.85rem;
    font-style: italic;
  }
  
  .property-error {
    color: #e91e63;
    font-weight: bold;
  }
  
  .key-check-process {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 15px 0;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
  }
  
  .key-check-process.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .key-check {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 6px;
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.5s ease;
  }
  
  .key-check.valid {
    background-color: rgba(76, 175, 80, 0.1);
    border-left: 3px solid #4CAF50;
  }
  
  .key-check.invalid {
    background-color: rgba(244, 67, 54, 0.1);
    border-left: 3px solid #f44336;
  }
  
  .key-check.active {
    opacity: 1;
    transform: translateX(0);
  }
  
  .key-value {
    background-color: #333;
    color: #fff;
    padding: 3px 8px;
    border-radius: 4px;
    font-family: 'Courier New', Courier, monospace;
  }
  
  .check-result {
    font-weight: 500;
  }
  
  .result-box {
    border: 2px solid #4CAF50;
    border-radius: 6px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
  }
  
  .result-box.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .result-box .box-title {
    background-color: #4CAF50;
  }
  
  .result-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .result-value {
    font-weight: bold;
    color: #d13e0b;
  }
  
  .result-type {
    color: #666;
    font-size: 0.85rem;
    font-style: italic;
  }
  
  /* Стили для объектов во второй анимации */
  .object-examples {
    display: flex;
    flex-direction: column;
    gap: 15px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
  }
  
  .object-examples.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .example-box {
    border: 2px solid #666;
    border-radius: 6px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    opacity: 0.5;
    transform: translateX(-10px);
    transition: all 0.5s ease;
  }
  
  .example-box.valid {
    border-color: #4CAF50;
  }
  
  .example-box.invalid {
    border-color: #f44336;
  }
  
  .example-box.active {
    opacity: 1;
    transform: translateX(0);
  }
  
  .example-box.valid .box-title {
    background-color: #4CAF50;
  }
  
  .example-box.invalid .box-title {
    background-color: #f44336;
  }
  
  .property-item.missing {
    background-color: rgba(244, 67, 54, 0.1);
    border-left: 3px solid #f44336;
  }
  
  .type-check-process {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
    margin: 15px 0;
  }
  
  .type-check-process.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .check-constraint {
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 6px;
    margin-bottom: 15px;
  }
  
  .constraint-title {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .constraint-code {
    padding: 8px;
    background-color: #282c34;
    color: #abb2bf;
    border-radius: 4px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9rem;
  }
  
  .type-check-results {
    display: flex;
    flex-direction: column;
    gap: 10px;
    opacity: 0;
    transition: all 0.5s ease;
  }
  
  .type-check-results.active {
    opacity: 1;
  }
  
  .check-result {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 6px;
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.5s ease;
  }
  
  .check-result.valid {
    background-color: rgba(76, 175, 80, 0.1);
    border-left: 3px solid #4CAF50;
  }
  
  .check-result.invalid {
    background-color: rgba(244, 67, 54, 0.1);
    border-left: 3px solid #f44336;
  }
  
  .check-result.active {
    opacity: 1;
    transform: translateX(0);
  }
  
  .check-icon {
    font-weight: bold;
    font-size: 1.1rem;
  }
  
  .check-result.valid .check-icon {
    color: #4CAF50;
  }
  
  .check-result.invalid .check-icon {
    color: #f44336;
  }
  
  /* Стили для практических советов и подводных камней */
  .practical-tips, .pitfalls {
    margin: 30px 0;
    padding: 15px;
    border-radius: 8px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
  }
  
  .practical-tips h3, .pitfalls h3 {
    margin-top: 0;
  }
  
  .practical-tips ul, .pitfalls ul {
    padding-left: 20px;
  }
  
  .practical-tips li, .pitfalls li {
    margin-bottom: 10px;
    line-height: 1.5;
  }
  
  .pitfall-item {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ddd;
  }
  
  .pitfall-item:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  
  .pitfall-item h4 {
    color: #e91e63;
    margin-bottom: 10px;
  }
  
  /* Стили для таблицы сравнения */
  .comparison {
    margin: 30px 0;
  }
  
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
  }
  
  .comparison-table th, .comparison-table td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  .comparison-table th {
    background-color: #f5f5f5;
    font-weight: bold;
  }
  
  .comparison-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .comparison-table ul {
    margin: 0;
    padding-left: 20px;
  }
  
  .comparison-table li {
    margin-bottom: 5px;
    font-size: 0.9rem;
  }
  
  /* Стили для дополнительных ресурсов */
  .additional-resources {
    margin: 30px 0;
    padding: 15px;
    border-radius: 8px;
    background-color: #f0f7ff;
    border: 1px solid #b3d4fc;
  }
  
  .additional-resources h3 {
    margin-top: 0;
    color: #1565c0;
  }
  
  .additional-resources ul {
    padding-left: 20px;
  }
  
  .additional-resources li {
    margin-bottom: 10px;
    line-height: 1.5;
  }
  
  .additional-resources a {
    color: #1976d2;
    text-decoration: none;
  }
  
  .additional-resources a:hover {
    text-decoration: underline;
  }
  
  /* Анимация */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Медиа-запросы для адаптивности */
  @media (max-width: 768px) {
    .animation-content {
      flex-direction: column;
    }
    
    .code-editor, .animation-visual {
      width: 100%;
    }
    
    .tabs {
      flex-direction: column;
    }
    
    .tab-button {
      width: 100%;
    }
  }
  </style>