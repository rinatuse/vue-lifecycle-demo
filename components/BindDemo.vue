<template>
    <div class="bind-polyfill">
      <h1>Реализация полифилла для метода bind()</h1>
      
      <div class="section-container">
        <!-- Секция: Введение -->
        <div class="section" id="introduction">
          <h2>Что такое bind() и зачем он нужен?</h2>
          <div class="explanation">
            <p>Метод <code>bind()</code> в JavaScript создаёт новую функцию, привязывая указанный объект в качестве контекста <code>this</code> к исходной функции.</p>
            <p>Это необходимо, когда вы хотите:</p>
            <ul>
              <li>Зафиксировать контекст <code>this</code> для функции, которая может вызываться в разных контекстах</li>
              <li>Частично применить аргументы, создав новую функцию с предустановленными параметрами</li>
              <li>Сохранить метод объекта для последующего использования, не теряя контекст</li>
            </ul>
            
            <div class="code-example">
              <h3>Стандартное использование bind()</h3>
              <pre><code>const user = {
    name: 'Иван',
    greet: function(greeting) {
      return `${greeting}, меня зовут ${this.name}`;
    }
  };
  
  // Используем метод объекта напрямую
  console.log(user.greet('Привет')); // "Привет, меня зовут Иван"
  
  // Теряем контекст при присваивании метода переменной
  const greetFunc = user.greet;
  console.log(greetFunc('Привет')); // "Привет, меня зовут undefined"
  
  // Фиксируем контекст с помощью bind()
  const boundGreet = user.greet.bind(user);
  console.log(boundGreet('Привет')); // "Привет, меня зовут Иван"
  
  // С предустановленным параметром
  const sayHello = user.greet.bind(user, 'Здравствуйте');
  console.log(sayHello()); // "Здравствуйте, меня зовут Иван"</code></pre>
            </div>
          </div>
        </div>
        
        <!-- Секция: Алгоритм реализации полифилла -->
        <div class="section" id="implementation">
          <h2>Алгоритм реализации полифилла для bind()</h2>
          
          <div class="explanation">
            <p>Полифилл - это код, который реализует функциональность, которая может отсутствовать в более старых браузерах или средах JavaScript. Мы создадим полифилл для <code>Function.prototype.bind()</code>.</p>
            
            <div class="algorithm-steps">
              <h3>Основные шаги реализации:</h3>
              <ol>
                <li>
                  <div class="step">
                    <strong>Проверить наличие нативной реализации</strong>
                    <p>Если <code>Function.prototype.bind</code> уже существует, не переопределять его</p>
                  </div>
                </li>
                <li>
                  <div class="step">
                    <strong>Сохранить ссылку на исходную функцию</strong>
                    <p>Нам нужно сохранить функцию, для которой вызывается bind</p>
                  </div>
                </li>
                <li>
                  <div class="step">
                    <strong>Сохранить аргументы, переданные в bind</strong>
                    <p>Это будут контекст (this) и начальные аргументы для функции</p>
                  </div>
                </li>
                <li>
                  <div class="step">
                    <strong>Создать функцию-обертку</strong>
                    <p>Эта функция будет возвращена и при вызове будет вызывать исходную функцию с правильным контекстом</p>
                  </div>
                </li>
                <li>
                  <div class="step">
                    <strong>Обработать случай с оператором new</strong>
                    <p>Если новая функция вызывается с оператором new, контекст this должен быть новым объектом</p>
                  </div>
                </li>
                <li>
                  <div class="step">
                    <strong>Объединить аргументы из bind и вызова функции</strong>
                    <p>При вызове функции нужно комбинировать предустановленные аргументы и новые</p>
                  </div>
                </li>
              </ol>
            </div>
            
            <div class="implementation-container">
              <div class="code-example full-width">
                <h3>Полная реализация полифилла</h3>
                <pre v-highlightjs><code>// Проверка наличия нативной реализации
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(thisArg) {
      // Сохраняем ссылку на исходную функцию
      var originalFunction = this;
      
      // Проверяем, что bind вызван на функции
      if (typeof originalFunction !== 'function') {
        throw new TypeError('Function.prototype.bind - привязываемый объект не является функцией');
      }
      
      // Получаем аргументы, переданные в bind (кроме первого, который thisArg)
      var bindArgs = Array.prototype.slice.call(arguments, 1);
      
      // Создаем функцию-обертку
      var boundFunction = function() {
        // Получаем аргументы при вызове
        var funcArgs = Array.prototype.slice.call(arguments);
        
        // Объединяем аргументы из bind и вызова
        var allArgs = bindArgs.concat(funcArgs);
        
        // Проверяем, был ли вызов через new
        if (this instanceof boundFunction) {
          // Вызов через new
          // Создаем экземпляр исходной функции с аргументами
          var result = originalFunction.apply(this, allArgs);
          
          // Если функция-конструктор вернула объект, возвращаем его
          // В противном случае возвращаем созданный экземпляр
          return (Object(result) === result) ? result : this;
        } else {
          // Обычный вызов - применяем thisArg
          return originalFunction.apply(thisArg, allArgs);
        }
      };
      
      // Создаем правильный прототип для использования с new
      if (originalFunction.prototype) {
        // Временный конструктор для наследования прототипа
        var Empty = function() {};
        Empty.prototype = originalFunction.prototype;
        boundFunction.prototype = new Empty();
      }
      
      // Возвращаем новую функцию
      return boundFunction;
    };
  }</code></pre>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Секция: Объяснение шаг за шагом -->
        <div class="section" id="explanation">
          <h2>Подробное объяснение реализации</h2>
          
          <div class="explanation">
            <div class="explanation-step" v-for="(step, index) in explanationSteps" :key="index">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">
                <h3>{{ step.title }}</h3>
                <p>{{ step.description }}</p>
                <div class="code-snippet">
                  <pre><code>{{ step.code }}</code></pre>
                </div>
                <div class="step-details">
                  <p v-html="step.details"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Секция: Визуализация работы bind() -->
        <div class="section" id="visualization">
          <h2>Визуализация работы bind()</h2>
          
          <div class="viz-container">
            <div class="viz-controls">
              <button @click="resetVisualization" :disabled="currentStep === 0">Сбросить</button>
              <button @click="previousStep" :disabled="currentStep === 0">Назад</button>
              <button @click="nextStep" :disabled="currentStep >= visualizationSteps.length - 1">Далее</button>
            </div>
            
            <div class="viz-content">
              <div class="viz-step">
                <h3>{{ visualizationSteps[currentStep].title }}</h3>
                <div class="viz-description">
                  <p>{{ visualizationSteps[currentStep].description }}</p>
                </div>
                
                <div class="viz-animation">
                  <div class="viz-memory-model">
                    <div class="viz-objects">
                      <!-- User Object -->
                      <div class="viz-object" :class="{ active: visualizationSteps[currentStep].activeObjects.includes('user') }">
                        <div class="viz-object-title">user</div>
                        <div class="viz-object-content">
                          <div class="viz-property">
                            <span class="property-name">name:</span>
                            <span class="property-value">"Иван"</span>
                          </div>
                          <div class="viz-property">
                            <span class="property-name">greet:</span>
                            <span class="property-value">function() { ... }</span>
                          </div>
                        </div>
                      </div>
                      
                      <!-- Original Function -->
                      <div class="viz-object" :class="{ active: visualizationSteps[currentStep].activeObjects.includes('originalFunction') }">
                        <div class="viz-object-title">originalFunction (user.greet)</div>
                        <div class="viz-object-content">
                          <div class="viz-code">
                            function(greeting) {<br>
                            &nbsp;&nbsp;return `${greeting}, меня зовут ${this.name}`;<br>
                            }
                          </div>
                        </div>
                      </div>
                      
                      <!-- Bound Function -->
                      <div class="viz-object" :class="{ active: visualizationSteps[currentStep].activeObjects.includes('boundFunction') }">
                        <div class="viz-object-title">boundFunction</div>
                        <div class="viz-object-content">
                          <div class="viz-code">
                            function() {<br>
                            &nbsp;&nbsp;// Сохраненный контекст: user<br>
                            &nbsp;&nbsp;// Сохраненные аргументы: bindArgs<br>
                            &nbsp;&nbsp;return originalFunction.apply(thisArg, allArgs);<br>
                            }
                          </div>
                          <div class="viz-closure">
                            <div class="viz-closure-title">Замыкание:</div>
                            <div class="viz-property">
                              <span class="property-name">thisArg:</span>
                              <span class="property-value">user</span>
                            </div>
                            <div class="viz-property">
                              <span class="property-name">bindArgs:</span>
                              <span class="property-value">{{ currentStep >= 3 ? '["Привет"]' : '[]' }}</span>
                            </div>
                            <div class="viz-property">
                              <span class="property-name">originalFunction:</span>
                              <span class="property-value">user.greet</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <!-- Function Call -->
                      <div class="viz-object viz-call" :class="{ active: visualizationSteps[currentStep].activeObjects.includes('functionCall') }">
                        <div class="viz-object-title">Вызов функции</div>
                        <div class="viz-object-content">
                          <div class="viz-code">
                            {{ visualizationSteps[currentStep].functionCall || "// Функция еще не вызвана" }}
                          </div>
                          <div class="viz-result" v-if="visualizationSteps[currentStep].functionResult">
                            <div class="viz-result-title">Результат:</div>
                            <div class="viz-result-value">{{ visualizationSteps[currentStep].functionResult }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Визуализация связей между объектами -->
                    <svg class="viz-connections" v-if="currentStep >= 2">
                      <path :class="{ active: visualizationSteps[currentStep].activeObjects.includes('connection1') }" 
                            d="M100,100 C150,50 200,150 250,100" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Секция: Подводные камни -->
        <div class="section" id="pitfalls">
          <h2>Подводные камни при реализации bind()</h2>
          
          <div class="pitfalls-list">
            <div class="pitfall" v-for="(pitfall, index) in pitfalls" :key="index">
              <div class="pitfall-header">
                <div class="pitfall-icon">⚠️</div>
                <h3>{{ pitfall.title }}</h3>
              </div>
              <div class="pitfall-content">
                <p>{{ pitfall.description }}</p>
                <div class="code-example" v-if="pitfall.example">
                  <pre><code>{{ pitfall.example }}</code></pre>
                </div>
                <div class="pitfall-solution" v-if="pitfall.solution">
                  <h4>Решение:</h4>
                  <p>{{ pitfall.solution }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Секция: Применение на практике -->
        <div class="section" id="practical-usage">
          <h2>Применение на практике</h2>
          
          <div class="use-cases">
            <div class="use-case" v-for="(useCase, index) in useCases" :key="index">
              <h3>{{ useCase.title }}</h3>
              <p>{{ useCase.description }}</p>
              <div class="code-example">
                <pre><code>{{ useCase.code }}</code></pre>
              </div>
            </div>
          </div>
          
          <div class="final-notes">
            <h3>Важные замечания</h3>
            <ul>
              <li>Стандартная реализация <code>bind()</code> присутствует во всех современных браузерах, полифилл нужен только для очень старых окружений</li>
              <li>В современном коде чаще используют стрелочные функции вместо <code>bind()</code> для сохранения контекста</li>
              <li>Понимание того, как работает <code>bind()</code>, помогает лучше понять контексты выполнения в JavaScript</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BindPolyfill',
    data() {
      return {
        currentStep: 0,
        explanationSteps: [
          {
            title: "Проверка наличия нативной реализации",
            description: "Сначала проверяем, существует ли уже нативная реализация метода bind()",
            code: "if (!Function.prototype.bind) {\n  // Здесь будет наша реализация\n}",
            details: "Эта проверка гарантирует, что мы не будем переопределять нативную реализацию, которая обычно более оптимизирована и может иметь дополнительную функциональность"
          },
          {
            title: "Определение метода в прототипе Function",
            description: "Добавляем метод bind в прототип Function, чтобы он был доступен всем функциям",
            code: "Function.prototype.bind = function(thisArg) {\n  // Реализация метода\n};",
            details: "Все функции в JavaScript наследуют методы из <code>Function.prototype</code>, поэтому добавление метода туда делает его доступным для всех функций"
          },
          {
            title: "Сохранение исходной функции и аргументов",
            description: "Сохраняем ссылку на функцию, к которой применяется bind(), и аргументы, переданные в bind()",
            code: "var originalFunction = this;\n\n// Проверка, что bind вызван на функции\nif (typeof originalFunction !== 'function') {\n  throw new TypeError('Function.prototype.bind - привязываемый объект не является функцией');\n}\n\n// Получаем аргументы, переданные в bind (кроме первого, который thisArg)\nvar bindArgs = Array.prototype.slice.call(arguments, 1);",
            details: "Внутри метода <code>this</code> указывает на функцию, для которой вызван <code>bind()</code>. Мы сохраняем её в переменную <code>originalFunction</code>. <br>Также извлекаем все аргументы, начиная со второго (первый аргумент — это <code>thisArg</code>), используя метод <code>Array.prototype.slice.call(arguments, 1)</code>. Это необходимо для partial application (частичного применения функции)."
          },
          {
            title: "Создание функции-обертки",
            description: "Создаем новую функцию, которая будет возвращена из bind()",
            code: "var boundFunction = function() {\n  // Получаем аргументы при вызове\n  var funcArgs = Array.prototype.slice.call(arguments);\n  \n  // Объединяем аргументы из bind и вызова\n  var allArgs = bindArgs.concat(funcArgs);\n  \n  // Логика вызова функции с правильным контекстом\n};",
            details: "Эта функция-обертка объединяет аргументы, переданные при вызове <code>bind()</code>, и аргументы, переданные при вызове новой функции. Это позволяет реализовать частичное применение функции."
          },
          {
            title: "Обработка вызова с оператором new",
            description: "Добавляем логику для корректной работы с оператором new",
            code: "if (this instanceof boundFunction) {\n  // Вызов через new\n  // Создаем экземпляр исходной функции с аргументами\n  var result = originalFunction.apply(this, allArgs);\n  \n  // Если функция-конструктор вернула объект, возвращаем его\n  // В противном случае возвращаем созданный экземпляр\n  return (Object(result) === result) ? result : this;\n} else {\n  // Обычный вызов - применяем thisArg\n  return originalFunction.apply(thisArg, allArgs);\n}",
            details: "Эта часть кода обрабатывает два случая: <br>1. Когда функция вызывается с оператором <code>new</code> — в этом случае <code>this</code> будет экземпляром <code>boundFunction</code>, и мы должны использовать этот новый объект как контекст для исходной функции.<br>2. Когда функция вызывается обычным образом — тогда мы используем <code>thisArg</code>, переданный в <code>bind()</code>."
          },
          {
            title: "Настройка прототипа для работы с new",
            description: "Обеспечиваем правильное наследование прототипа для корректной работы с оператором new",
            code: "if (originalFunction.prototype) {\n  // Временный конструктор для наследования прототипа\n  var Empty = function() {};\n  Empty.prototype = originalFunction.prototype;\n  boundFunction.prototype = new Empty();\n}",
            details: "Этот шаг необходим, чтобы новая функция имела тот же прототип, что и исходная. Это важно для корректной работы оператора <code>new</code>. Мы используем промежуточный конструктор <code>Empty</code>, чтобы избежать вызова исходной функции при создании прототипа."
          },
          {
            title: "Возвращение новой функции",
            description: "Возвращаем созданную функцию-обертку",
            code: "return boundFunction;",
            details: "Наконец, мы возвращаем созданную функцию, которая теперь содержит в своем замыкании информацию о контексте <code>thisArg</code>, исходной функции <code>originalFunction</code> и предустановленных аргументах <code>bindArgs</code>."
          }
        ],
        visualizationSteps: [
          {
            title: "Исходное состояние",
            description: "У нас есть объект user с методом greet",
            activeObjects: ['user'],
            functionCall: "",
            functionResult: ""
          },
          {
            title: "Вызов метода напрямую",
            description: "При прямом вызове метода объекта контекст this указывает на сам объект",
            activeObjects: ['user', 'originalFunction', 'functionCall'],
            functionCall: "user.greet('Привет')",
            functionResult: "Привет, меня зовут Иван"
          },
          {
            title: "Потеря контекста",
            description: "При сохранении метода в переменную и вызове как обычной функции, контекст теряется",
            activeObjects: ['originalFunction', 'functionCall'],
            functionCall: "const greetFunc = user.greet;\ngreetFunc('Привет')",
            functionResult: "Привет, меня зовут undefined"
          },
          {
            title: "Создание привязанной функции",
            description: "Вызываем bind() для фиксации контекста this",
            activeObjects: ['user', 'originalFunction', 'boundFunction', 'connection1'],
            functionCall: "const boundGreet = user.greet.bind(user)",
            functionResult: ""
          },
          {
            title: "Вызов привязанной функции",
            description: "При вызове функции, созданной через bind(), контекст this остаётся фиксированным",
            activeObjects: ['user', 'originalFunction', 'boundFunction', 'connection1', 'functionCall'],
            functionCall: "boundGreet('Привет')",
            functionResult: "Привет, меня зовут Иван"
          },
          {
            title: "Частичное применение",
            description: "bind() также позволяет предустановить аргументы, создавая функцию с частично примененными параметрами",
            activeObjects: ['user', 'originalFunction', 'boundFunction', 'connection1', 'functionCall'],
            functionCall: "const sayHello = user.greet.bind(user, 'Здравствуйте');\nsayHello()",
            functionResult: "Здравствуйте, меня зовут Иван"
          }
        ],
        pitfalls: [
          {
            title: "Неправильная обработка оператора new",
            description: "Одна из главных сложностей — корректная обработка случая, когда функция, созданная через bind(), вызывается с оператором new. В этом случае контекст this должен быть новым объектом, а не объектом, переданным в bind().",
            example: "function Person(name) {\n  this.name = name;\n}\n\nconst BoundPerson = Person.bind(null, 'Иван');\nconst person = new BoundPerson(); // this должен быть новым объектом, а не null",
            solution: "Необходимо проверять, создаётся ли функция через new (this instanceof boundFunction), и в этом случае использовать новый объект как контекст, а не тот, что передан в bind()."
          },
          {
            title: "Потеря свойств оригинальной функции",
            description: "При создании новой функции через bind() могут теряться некоторые свойства оригинальной функции, такие как name, length, и даже прототип.",
            example: "function greet() {}\ngreet.extraProp = 'дополнительное свойство';\n\nconst boundGreet = greet.bind(null);\nconsole.log(boundGreet.extraProp); // undefined",
            solution: "В полной реализации полифилла нужно копировать все нестандартные свойства и сохранять их на новой функции. Для прототипа нужно использовать временный конструктор, чтобы правильно настроить цепочку прототипов."
          },
          {
            title: "Проблемы с аргументами в строгом режиме",
            description: "В строгом режиме ('use strict') объект arguments может вести себя иначе, и манипуляции с ним могут быть ограничены.",
            example: "'use strict';\nfunction strict() {\n  arguments[0] = 'новое значение'; // Ошибка в строгом режиме\n}\n",
            solution: "Используйте Array.prototype.slice.call(arguments) для создания копии аргументов, а не изменяйте объект arguments напрямую."
          },
          {
            title: "Сложности с определением, что функция вызвана с new",
            description: "Определение, была ли функция вызвана с оператором new, может быть сложным, особенно в старых версиях JavaScript.",
            example: "function MyClass() {\n  console.log(this instanceof MyClass); // true при вызове с new\n}\n\nconst obj = { MyClass };\nobj.MyClass(); // false, но это не new-вызов",
            solution: "Проверка this instanceof boundFunction работает в большинстве случаев, но имеет ограничения. Если возможно, используйте нативную реализацию bind()."
          },
          {
            title: "Проблемы с возвращаемым значением в конструкторах",
            description: "Когда функция-конструктор возвращает объект, этот объект используется вместо созданного через new. Это поведение нужно сохранить в полифилле.",
            example: "function SpecialConstructor() {\n  return { special: true }; // Возвращаем объект, а не this\n}\n\nconst obj = new SpecialConstructor();\nconsole.log(obj.special); // true",
            solution: "Проверяйте, является ли результат работы исходной функции объектом, и если да, возвращайте его вместо this: return (Object(result) === result) ? result : this;"
          }
        ],
        useCases: [
          {
            title: "Обработчики событий в DOM",
            description: "Сохранение контекста this при передаче методов объекта в качестве обработчиков событий",
            code: "class Counter {\n  constructor() {\n    this.count = 0;\n    this.button = document.querySelector('#increment');\n    \n    // Без bind this внутри handleClick будет указывать на кнопку\n    this.button.addEventListener('click', this.handleClick.bind(this));\n  }\n  \n  handleClick() {\n    this.count++;\n    console.log('Счетчик:', this.count);\n  }\n}"
          },
          {
            title: "Частичное применение функций",
            description: "Создание новых функций с предустановленными параметрами",
            code: "function multiply(a, b) {\n  return a * b;\n}\n\n// Создаем функцию, которая умножает на 2\nconst double = multiply.bind(null, 2);\n\nconsole.log(double(5)); // 10\nconsole.log(double(10)); // 20"
          },
          {
            title: "Функции-конструкторы с дефолтными значениями",
            description: "Создание предварительно сконфигурированных функций-конструкторов",
            code: "function Person(name, age, job) {\n  this.name = name;\n  this.age = age;\n  this.job = job;\n}\n\n// Создаем конструктор с предустановленными значениями\nconst Developer = Person.bind(null, undefined, undefined, 'разработчик');\n\nconst dev = new Developer('Иван', 30);\nconsole.log(dev); // { name: 'Иван', age: 30, job: 'разработчик' }"
          },
          {
            title: "Сохранение методов для асинхронного использования",
            description: "Фиксация this для методов, которые будут вызваны позже в асинхронном коде",
            code: "class DataFetcher {\n  constructor(url) {\n    this.url = url;\n    this.data = null;\n  }\n  \n  fetchData() {\n    fetch(this.url)\n      .then(response => response.json())\n      .then(this.processData.bind(this)) // Сохраняем контекст для коллбэка\n      .catch(console.error);\n  }\n  \n  processData(data) {\n    this.data = data;\n    console.log('Данные сохранены:', this.data);\n  }\n}"
          }
        ]
      };
    },
    methods: {
      resetVisualization() {
        this.currentStep = 0;
      },
      previousStep() {
        if (this.currentStep > 0) {
          this.currentStep--;
        }
      },
      nextStep() {
        if (this.currentStep < this.visualizationSteps.length - 1) {
          this.currentStep++;
        }
      }
    }
  };
  </script>
  
  <style>
  .bind-polyfill {
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
  }
  
  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
  }
  
  h2 {
    color: #3498db;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  
  h3 {
    color: #2c3e50;
    margin-top: 25px;
    margin-bottom: 15px;
  }
  
  h4 {
    color: #16a085;
    margin-top: 15px;
    margin-bottom: 10px;
  }
  
  .section-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .section {
    padding: 25px;
    margin-bottom: 20px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #eee;
  }
  
  .explanation {
    line-height: 1.6;
  }
  
  .code-example {
    background-color: #f8f9fa;
    border-radius: 6px;
    padding: 15px;
    margin-top: 15px;
    margin-bottom: 25px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    overflow: auto;
  }
  
  .code-example pre {
    margin: 0;
    white-space: pre-wrap;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.9em;
  }
  
  .code-example code {
    display: block;
    color: #333;
    line-height: 1.5;
  }
  
  .full-width {
    width: 100%;
  }
  
  /* Стили для алгоритма */
  .algorithm-steps {
    margin: 25px 0;
  }
  
  .algorithm-steps ol {
    padding-left: 0;
    counter-reset: step-counter;
    list-style-type: none;
  }
  
  .step {
    position: relative;
    margin-bottom: 20px;
    padding: 15px 15px 15px 60px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .step:before {
    content: counter(step-counter);
    counter-increment: step-counter;
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    background-color: #3498db;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  
  .step strong {
    display: block;
    margin-bottom: 8px;
    color: #2c3e50;
  }
  
  .step p {
    margin: 0;
    color: #666;
  }
  
  /* Стили для пошагового объяснения */
  .explanation-step {
    display: flex;
    margin-bottom: 30px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
  
  .step-number {
    width: 50px;
    background-color: #3498db;
    color: white;
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .step-content {
    flex: 1;
    padding: 20px;
  }
  
  .step-content h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #3498db;
  }
  
  .code-snippet {
    background-color: #f8f9fa;
    border-radius: 4px;
    padding: 12px;
    margin: 15px 0;
    overflow: auto;
    border-left: 3px solid #3498db;
  }
  
  .code-snippet pre {
    margin: 0;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.9em;
  }
  
  .step-details {
    line-height: 1.6;
    color: #555;
    margin-top: 15px;
  }
  
  /* Стили для визуализации */
  .viz-container {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .viz-controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .viz-controls button {
    padding: 8px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .viz-controls button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .viz-controls button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .viz-content {
    margin-top: 20px;
  }
  
  .viz-step {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .viz-description {
    margin-bottom: 20px;
    color: #555;
  }
  
  .viz-animation {
    margin-top: 30px;
  }
  
  .viz-memory-model {
    position: relative;
    min-height: 400px;
  }
  
  .viz-objects {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .viz-object {
    width: 300px;
    background-color: #fff;
    border: 2px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
    opacity: 0.7;
    transform: translateY(10px);
  }
  
  .viz-object.active {
    opacity: 1;
    transform: translateY(0);
    border-color: #3498db;
    box-shadow: 0 4px 10px rgba(52, 152, 219, 0.2);
  }
  
  .viz-object-title {
    background-color: #f8f9fa;
    padding: 10px;
    font-weight: bold;
    color: #2c3e50;
    border-bottom: 1px solid #ddd;
  }
  
  .viz-object.active .viz-object-title {
    background-color: #3498db;
    color: white;
  }
  
  .viz-object-content {
    padding: 15px;
  }
  
  .viz-property {
    margin-bottom: 8px;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.9em;
  }
  
  .property-name {
    color: #e74c3c;
    margin-right: 5px;
  }
  
  .property-value {
    color: #2c3e50;
  }
  
  .viz-code {
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.9em;
    color: #333;
    line-height: 1.5;
  }
  
  .viz-closure {
    margin-top: 15px;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 4px;
    border-left: 3px solid #9b59b6;
  }
  
  .viz-closure-title {
    font-weight: bold;
    margin-bottom: 8px;
    color: #9b59b6;
  }
  
  .viz-call {
    width: 100%;
    margin-top: 20px;
  }
  
  .viz-result {
    margin-top: 15px;
    padding: 10px;
    background-color: #e8f8f5;
    border-radius: 4px;
    border-left: 3px solid #2ecc71;
  }
  
  .viz-result-title {
    font-weight: bold;
    margin-bottom: 5px;
    color: #27ae60;
  }
  
  .viz-result-value {
    font-family: 'Consolas', 'Monaco', monospace;
    color: #16a085;
  }

  .code-example {
    color: white;
  }
  
  .viz-connections {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10;
  }
  
  .viz-connections path {
    fill: none;
    stroke: #bdc3c7;
    stroke-width: 2;
    stroke-dasharray: 5, 5;
    opacity: 0.5;
    transition: all 0.3s ease;
  }
  
  .viz-connections path.active {
    stroke: #3498db;
    stroke-dasharray: none;
    opacity: 1;
  }
  
  /* Стили для подводных камней */
  .pitfalls-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .pitfall {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
  
  .pitfall-header {
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: #ffebee;
    border-bottom: 1px solid #ffcdd2;
  }
  
  .pitfall-icon {
    font-size: 24px;
    margin-right: 15px;
  }
  
  .pitfall-header h3 {
    margin: 0;
    color: #e53935;
  }
  
  .pitfall-content {
    padding: 20px;
  }
  
  .pitfall-solution {
    margin-top: 15px;
    padding: 15px;
    background-color: #e8f5e9;
    border-radius: 4px;
    border-left: 3px solid #4caf50;
  }
  
  /* Стили для практического применения */
  .use-cases {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .use-case {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .use-case h3 {
    margin-top: 0;
    color: #16a085;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 10px;
  }
  
  .final-notes {
    margin-top: 30px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    border-left: 4px solid #9b59b6;
  }
  
  .final-notes h3 {
    margin-top: 0;
    color: #9b59b6;
  }
  
  .final-notes ul {
    padding-left: 20px;
    line-height: 1.6;
  }
  
  /* Анимации */
  @keyframes highlight {
    0% { background-color: rgba(52, 152, 219, 0.1); }
    50% { background-color: rgba(52, 152, 219, 0.3); }
    100% { background-color: rgba(52, 152, 219, 0.1); }
  }
  
  .highlight-animation {
    animation: highlight 2s infinite;
  }
  
  /* Медиа-запросы для адаптивности */
  @media (max-width: 768px) {
    .explanation-step {
      flex-direction: column;
    }
    
    .step-number {
      width: 100%;
      padding: 10px 0;
    }
    
    .viz-objects {
      flex-direction: column;
    }
    
    .viz-object {
      width: 100%;
    }
  }
  </style>