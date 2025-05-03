<template>
    <div class="closure-demo">
      <h1>Проблема замыканий с циклами и setTimeout</h1>
      
      <div class="problem-description card">
        <h2>Что происходит в этом коде?</h2>
        <pre class="code-block">
  for (var i = 0; i &lt; 10; i++) {
    setTimeout(function () {
      console.log(i);
    });
  }
        </pre>
        <p>На первый взгляд может показаться, что этот код выведет числа от 0 до 9 с небольшой задержкой. Но на самом деле он выведет число <strong>10</strong> десять раз!</p>
      </div>
  
      <div class="visualization card">
        <h2>Визуализация проблемы</h2>
        <div class="animation-container">
          <!-- Визуализация работы кода -->
          <div class="execution-flow">
            <div class="memory-model">
              <div class="var-declaration">
                <span class="var-name">var i = {{ currentVariableValue }}</span>
                <span class="scope-info">Область видимости: функция</span>
              </div>
            </div>
            
            <!-- Цикл for и создание таймеров -->
            <div class="loop-visualization">
              <div class="loop-title">Цикл for</div>
              <div class="loop-iterations">
                <div 
                  v-for="iteration in 10" 
                  :key="iteration"
                  :class="['iteration', { 'current-iteration': currentIteration === iteration - 1, 'completed': currentIteration > iteration - 1 }]"
                >
                  Итерация {{ iteration - 1 }}
                </div>
              </div>
            </div>
            
            <!-- Очередь таймеров -->
            <div class="timer-queue">
              <div class="queue-title">Очередь таймеров</div>
              <div class="timers-container">
                <div 
                  v-for="timer in timerFunctions" 
                  :key="timer.id"
                  class="timer-function"
                  :class="{ 'executing': timer.executing }"
                >
                  setTimeout({{ timer.id }})
                  <div v-if="timer.executing" class="timer-execution">
                    console.log(i) // i = {{ finalVariableValue }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Консоль -->
          <div class="console-output">
            <div class="console-header">Console Log</div>
            <div class="console-content">
              <div v-for="(logItem, index) in consoleOutput" :key="index" class="log-item">
                {{ logItem }}
              </div>
            </div>
          </div>
  
          <!-- Кнопки управления анимацией -->
          <div class="animation-controls">
            <button @click="startAnimation" :disabled="isAnimating">Запустить анимацию</button>
            <button @click="resetAnimation" :disabled="isAnimating && !isCompleted">Сбросить</button>
          </div>
        </div>
      </div>
  
      <div class="problem-explanation card">
        <h2>Почему так происходит?</h2>
        <div class="explanation-content">
          <p>Здесь сталкиваются две концепции JavaScript:</p>
          <ol>
            <li>
              <strong>Замыкания (Closures):</strong> Функции в JavaScript замыкают переменные из внешней области видимости.
            </li>
            <li>
              <strong>Область видимости var:</strong> Переменные, объявленные через <code>var</code>, имеют функциональную область видимости, а не блочную.
            </li>
          </ol>
          
          <p>В нашем примере:</p>
          <ul>
            <li>Все функции обратного вызова в <code>setTimeout</code> ссылаются на одну и ту же переменную <code>i</code>.</li>
            <li>После завершения цикла значение <code>i</code> будет равно 10 (то значение, при котором условие <code>i &lt; 10</code> становится ложным).</li>
            <li>Когда функции в <code>setTimeout</code> начинают выполняться, они все видят одно и то же значение <code>i = 10</code>.</li>
          </ul>
        </div>
      </div>
  
      <div class="solutions card">
        <h2>Решения проблемы</h2>
        
        <div class="solution-tabs">
          <button 
            v-for="(solution, index) in solutions" 
            :key="index"
            @click="currentSolution = index"
            :class="{ active: currentSolution === index }"
          >
            {{ solution.name }}
          </button>
        </div>
        
        <div class="solution-content">
          <div class="solution-header">
            <h3>{{ solutions[currentSolution].name }}</h3>
          </div>
          
          <pre class="code-block">{{ solutions[currentSolution].code }}</pre>
          
          <div class="solution-explanation">
            <p v-html="solutions[currentSolution].explanation"></p>
            <div class="pros-cons">
              <div class="pros">
                <h4>Преимущества</h4>
                <ul>
                  <li v-for="(pro, index) in solutions[currentSolution].pros" :key="index">{{ pro }}</li>
                </ul>
              </div>
              <div class="cons">
                <h4>Недостатки</h4>
                <ul>
                  <li v-for="(con, index) in solutions[currentSolution].cons" :key="index">{{ con }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="real-world-examples card">
        <h2>Применение в реальной разработке</h2>
        <div class="example-tabs">
          <button 
            v-for="(example, index) in realWorldExamples" 
            :key="index"
            @click="currentExample = index"
            :class="{ active: currentExample === index }"
          >
            {{ example.name }}
          </button>
        </div>
        
        <div class="example-content">
          <h3>{{ realWorldExamples[currentExample].name }}</h3>
          <div class="example-description">
            <p v-html="realWorldExamples[currentExample].description"></p>
          </div>
          
          <div class="example-code">
            <pre class="code-block">{{ realWorldExamples[currentExample].code }}</pre>
          </div>
        </div>
      </div>
  
      <div class="pitfalls card">
        <h2>Подводные камни</h2>
        <div class="pitfall-list">
          <div v-for="(pitfall, index) in pitfalls" :key="index" class="pitfall-item">
            <h3>{{ pitfall.title }}</h3>
            <p v-html="pitfall.description"></p>
            <pre v-if="pitfall.code" class="code-block">{{ pitfall.code }}</pre>
          </div>
        </div>
      </div>
  
      <div class="conclusion card">
        <h2>Ключевые выводы</h2>
        <ul class="conclusion-list">
          <li>Переменные <code>var</code> имеют функциональную область видимости, а <code>let</code> и <code>const</code> — блочную.</li>
          <li>Замыкания "запоминают" ссылки на переменные, а не их значения в момент создания.</li>
          <li>Асинхронные функции (как колбэки setTimeout) выполняются после завершения синхронного кода.</li>
          <li>Для работы с замыканиями в циклах выбирайте решение в зависимости от контекста и версии ECMAScript.</li>
          <li>Понимание этой концепции поможет избежать трудноуловимых ошибок в сложных JavaScript-приложениях.</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  
  // Состояние для визуализации
  const currentVariableValue = ref(0);
  const finalVariableValue = ref(10);
  const currentIteration = ref(-1);
  const timerFunctions = reactive([]);
  const consoleOutput = reactive([]);
  const isAnimating = ref(false);
  const isCompleted = ref(false);
  
  // Анимация
  function startAnimation() {
    isAnimating.value = true;
    isCompleted.value = false;
    
    const iterationDelay = 1000; // задержка между итерациями цикла
    const timerExecutionDelay = 500; // задержка исполнения таймеров
    
    // Симуляция цикла
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        currentIteration.value = i;
        currentVariableValue.value = i;
        
        // Добавляем функцию в очередь таймеров
        timerFunctions.push({
          id: i,
          executing: false
        });
      }, i * iterationDelay);
    }
    
    // После завершения цикла
    setTimeout(() => {
      currentVariableValue.value = 10;
      
      // Симуляция выполнения колбэков setTimeout
      const timerStart = 11 * iterationDelay;
      
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          timerFunctions[i].executing = true;
          consoleOutput.push(finalVariableValue.value);
          
          // Переключаем обратно через небольшой интервал
          setTimeout(() => {
            timerFunctions[i].executing = false;
            
            // Проверяем, завершилась ли анимация
            if (i === 9) {
              isAnimating.value = false;
              isCompleted.value = true;
            }
          }, 500);
        }, timerStart + i * timerExecutionDelay);
      }
    }, 10 * iterationDelay);
  }
  
  function resetAnimation() {
    currentVariableValue.value = 0;
    currentIteration.value = -1;
    timerFunctions.splice(0, timerFunctions.length);
    consoleOutput.splice(0, consoleOutput.length);
    isAnimating.value = false;
    isCompleted.value = false;
  }
  
  // Решения проблемы
  const currentSolution = ref(0);
  const solutions = [
    {
      name: "let вместо var",
      code: "for (let i = 0; i < 10; i++) {\n  setTimeout(function () {\n    console.log(i);\n  });\n}",
      explanation: "Ключевое слово <code>let</code> создаёт переменную с <strong>блочной областью видимости</strong>. В отличие от <code>var</code>, для каждой итерации цикла создаётся новая переменная <code>i</code>. Каждый колбэк в <code>setTimeout</code> будет замыкаться на свою версию переменной <code>i</code>.",
      pros: [
        "Самое чистое и современное решение",
        "Лёгкое для понимания и чтения",
        "Соответствует современным стандартам JavaScript"
      ],
      cons: [
        "Не работает в очень старых браузерах без транспиляции",
        "При перемещении этого кода в функциональную область требуется аккуратность"
      ]
    },
    {
      name: "IIFE (Самовызывающаяся функция)",
      code: "for (var i = 0; i < 10; i++) {\n  (function(j) {\n    setTimeout(function () {\n      console.log(j);\n    });\n  })(i);\n}",
      explanation: "IIFE (Immediately Invoked Function Expression) создаёт новую функциональную область видимости для каждой итерации. Параметр <code>j</code> получает текущее значение <code>i</code>, и функция внутри <code>setTimeout</code> замыкается на это значение. Каждая IIFE имеет свою копию значения <code>i</code>.",
      pros: [
        "Работает во всех версиях JavaScript",
        "Надёжно создаёт замыкание для каждой итерации",
        "Хорошо совместимо со старым кодом"
      ],
      cons: [
        "Более многословное решение",
        "Требует больше когнитивных усилий для понимания",
        "Может создавать излишнюю вложенность в сложных случаях"
      ]
    },
    {
      name: "Передача аргументов в setTimeout",
      code: "for (var i = 0; i < 10; i++) {\n  setTimeout(function (j) {\n    console.log(j);\n  }, 0, i);\n}",
      explanation: "Функция <code>setTimeout</code> принимает дополнительные аргументы после задержки, которые будут переданы в функцию обратного вызова. Это позволяет передать текущее значение <code>i</code> непосредственно в колбэк как параметр <code>j</code>.",
      pros: [
        "Довольно лаконичное решение",
        "Избегает создания дополнительных функций",
        "Работает во всех современных браузерах"
      ],
      cons: [
        "Менее известная особенность setTimeout",
        "Может быть неочевидным для разработчиков, не знакомых с этим подходом",
        "Не так широко применимо к другим асинхронным функциям"
      ]
    },
    {
      name: "Метод bind()",
      code: "for (var i = 0; i < 10; i++) {\n  setTimeout(function (j) {\n    console.log(j);\n  }.bind(null, i));\n}",
      explanation: "Метод <code>bind()</code> создаёт новую функцию с заданным контекстом (<code>null</code> в данном случае) и фиксированными начальными аргументами. Текущее значение <code>i</code> становится первым аргументом функции, который затем доступен как параметр <code>j</code>.",
      pros: [
        "Функциональный подход к решению",
        "Не требует дополнительных функциональных областей",
        "Работает во всех современных браузерах"
      ],
      cons: [
        "Менее интуитивно понятно для начинающих",
        "Использование null как первый аргумент может сбивать с толку",
        "Требует хорошего понимания функционального программирования"
      ]
    },
    {
      name: "Стрелочная функция + аргументы setTimeout",
      code: "for (var i = 0; i < 10; i++) {\n  setTimeout(j => console.log(j), 0, i);\n}",
      explanation: "Это элегантное сочетание стрелочной функции и передачи аргумента в <code>setTimeout</code>. Стрелочная функция принимает параметр <code>j</code>, в который передаётся текущее значение <code>i</code> как аргумент setTimeout.",
      pros: [
        "Очень лаконичное и современное решение",
        "Хорошо читаемый код",
        "Объединяет преимущества двух подходов"
      ],
      cons: [
        "Требует ES6-совместимого окружения",
        "Может быть непонятным для разработчиков, не знакомых с особенностями setTimeout",
        "Не так широко документировано, как другие подходы"
      ]
    }
  ];
  
  // Примеры из реальной разработки
  const currentExample = ref(0);
  const realWorldExamples = [
    {
      name: "Обработчики событий в цикле",
      description: "При добавлении обработчиков событий к элементам, созданным в цикле, легко наткнуться на проблему замыканий. Например, при создании кнопок с номерами, которые должны выводить свой номер по клику:",
      code: "// Проблемный код:\nfunction setupButtons() {\n  for (var i = 0; i < 5; i++) {\n    var button = document.createElement('button');\n    button.textContent = 'Кнопка ' + i;\n    \n    button.addEventListener('click', function() {\n      console.log('Нажата кнопка ' + i); // Всегда покажет 'Кнопка 5'\n    });\n    \n    document.body.appendChild(button);\n  }\n}\n\n// Решение с let:\nfunction setupButtonsFixed() {\n  for (let i = 0; i < 5; i++) {\n    const button = document.createElement('button');\n    button.textContent = 'Кнопка ' + i;\n    \n    button.addEventListener('click', function() {\n      console.log('Нажата кнопка ' + i); // Правильно покажет номер кнопки\n    });\n    \n    document.body.appendChild(button);\n  }\n}"
    },
    {
      name: "Запросы к API с задержкой",
      description: "При создании нескольких запросов к API с увеличивающейся задержкой (например, для реализации повторных попыток), важно правильно обрабатывать замыкания:",
      code: "// Проблемный код:\nfunction fetchWithRetries(urls) {\n  for (var i = 0; i < urls.length; i++) {\n    var url = urls[i];\n    var delay = i * 1000; // Увеличивающаяся задержка\n    \n    setTimeout(function() {\n      console.log('Запрос к ' + url); // url будет всегда последним элементом urls\n      fetch(url); // Будет использовать последний url для всех запросов\n    }, delay);\n  }\n}\n\n// Решение:\nfunction fetchWithRetriesFixed(urls) {\n  for (let i = 0; i < urls.length; i++) {\n    const url = urls[i];\n    const delay = i * 1000;\n    \n    setTimeout(function() {\n      console.log('Запрос к ' + url); // Каждый url будет правильным\n      fetch(url);\n    }, delay);\n  }\n}"
    },
    {
      name: "Создание компонентов в цикле (Vue/React)",
      description: "При динамическом создании компонентов в цикле и передаче им функций или значений, связанных с индексом, проблема замыканий также возникает:",
      code: "// Vue 3 компонент с проблемой:\n<script setup>\nimport { ref } from 'vue';\n\nconst items = ref([{id: 1, name: 'Item 1'}, {id: 2, name: 'Item 2'}, {id: 3, name: 'Item 3'}]);\n\nfunction generateHandlers() {\n  const handlers = [];\n  \n  for (var i = 0; i < items.value.length; i++) {\n    // Здесь будет проблема с замыканием\n    handlers.push(function() {\n      console.log('Обработка элемента ' + i); // Всегда будет 3\n    });\n  }\n  \n  return handlers;\n}\n\n// Правильное решение:\nfunction generateHandlersFixed() {\n  const handlers = [];\n  \n  for (let i = 0; i < items.value.length; i++) {\n    handlers.push(function() {\n      console.log('Обработка элемента ' + i); // Правильно покажет индекс элемента\n    });\n  }\n  \n  return handlers;\n}\n"
    },
    {
      name: "Загрузка изображений с задержкой",
      description: "При загрузке нескольких изображений с задержкой для создания эффекта постепенного появления галереи:",
      code: "// Проблемный код:\nfunction loadImagesWithDelay(imagePaths) {\n  for (var i = 0; i < imagePaths.length; i++) {\n    var delay = i * 500;\n    \n    setTimeout(function() {\n      var img = new Image();\n      img.src = imagePaths[i]; // ReferenceError: i выходит за пределы массива\n      document.getElementById('gallery').appendChild(img);\n    }, delay);\n  }\n}\n\n// Решение:\nfunction loadImagesWithDelayFixed(imagePaths) {\n  imagePaths.forEach((path, index) => {\n    const delay = index * 500;\n    \n    setTimeout(function() {\n      const img = new Image();\n      img.src = path; // Корректный путь к изображению\n      document.getElementById('gallery').appendChild(img);\n    }, delay);\n  });\n}"
    }
  ];
  
  // Подводные камни
  const pitfalls = [
    {
      title: "Передача замыканий в функции обещаний (Promises)",
      description: "При работе с Promise, переменные из цикла могут создавать неожиданное поведение из-за замыканий:",
      code: "// Проблемный код с Promise\nfunction loadUsersData(userIds) {\n  const promises = [];\n  \n  for (var i = 0; i < userIds.length; i++) {\n    promises.push(new Promise(function(resolve) {\n      // Асинхронная загрузка данных пользователя\n      fetchUserData(userIds[i]).then(function(data) {\n        console.log('Загружен пользователь с индексом ' + i); // i будет указывать на последний элемент\n        resolve(data);\n      });\n    }));\n  }\n  \n  return Promise.all(promises);\n}"
    },
    {
      title: "Создание локальных функций внутри циклов",
      description: "Определение функций внутри циклов может привести к проблемам с производительностью и замыканиями:",
      code: "// Неэффективный код\nfunction processArray(array) {\n  for (var i = 0; i < array.length; i++) {\n    // На каждой итерации создаётся новая функция\n    function processItem() {\n      return array[i] * 2; // Замыкание на i\n    }\n    \n    // Использование функции\n    const result = processItem();\n    console.log(result);\n  }\n}"
    },
    {
      title: "Смешивание let и var в сложных циклах",
      description: "При использовании вложенных циклов смешивание <code>let</code> и <code>var</code> может привести к неожиданному поведению:",
      code: "function processMatrix(matrix) {\n  // Внешний цикл с let\n  for (let i = 0; i < matrix.length; i++) {\n    // Внутренний цикл с var\n    for (var j = 0; j < matrix[i].length; j++) {\n      setTimeout(function() {\n        // i здесь работает правильно (благодаря let)\n        // j будет иметь значение после завершения цикла\n        console.log('Элемент [' + i + '][' + j + '] = ' + matrix[i][j]);\n      }, 100);\n    }\n  }\n}"
    },
    {
      title: "Замыкания в циклических структурах",
      description: "Создание объектов с циклическими ссылками внутри циклов может привести к утечкам памяти и непредсказуемому поведению:",
      code: "function createNodes(count) {\n  const nodes = [];\n  \n  for (var i = 0; i < count; i++) {\n    const node = {\n      index: i,\n      getNextIndex: function() {\n        // Замыкание на i\n        return (i + 1) % count;\n      }\n    };\n    nodes.push(node);\n  }\n  \n  // Все node.getNextIndex() вернут одно и то же значение!\n  return nodes;\n}"
    },
    {
      title: "Замыкания в условных конструкциях внутри циклов",
      description: "Сложное взаимодействие между условиями и замыканиями может создавать трудноуловимые ошибки:",
      code: "function processWithConditions(data) {\n  for (var i = 0; i < data.length; i++) {\n    if (data[i].needsProcessing) {\n      // Создание замыкания только для некоторых элементов\n      setTimeout(function() {\n        // i будет иметь значение после завершения цикла\n        console.log('Обработка элемента ' + i);\n        data[i].process(); // Может привести к ошибке, если i вне диапазона\n      }, 1000);\n    }\n  }\n}"
    }
  ];
  </script>
  
  <style scoped>
  .closure-demo {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
    line-height: 1.6;
  }
  
  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
  }
  
  h2 {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-top: 0;
  }
  
  h3 {
    color: #2980b9;
  }
  
  .card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 25px;
    margin-bottom: 30px;
  }
  
  .code-block {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 6px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    overflow-x: auto;
    white-space: pre;
    margin: 15px 0;
  }
  
  /* Визуализация */
  .animation-container {
    margin: 20px 0;
  }
  
  .execution-flow {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .memory-model {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 15px;
  }
  
  .var-declaration {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .var-name {
    font-family: monospace;
    font-weight: bold;
    font-size: 16px;
    color: #c0392b;
  }
  
  .scope-info {
    background-color: #f39c12;
    color: white;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 12px;
  }
  
  .loop-visualization {
    border: 1px solid #ddd;
    border-radius: 6px;
    overflow: hidden;
  }
  
  .loop-title {
    background-color: #3498db;
    color: white;
    padding: 8px 12px;
    font-weight: bold;
  }
  
  .loop-iterations {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 15px;
  }
  
  .iteration {
    padding: 8px 12px;
    background-color: #ecf0f1;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .iteration.current-iteration {
    background-color: #2ecc71;
    color: white;
    transform: scale(1.05);
  }
  
  .iteration.completed {
    background-color: #bdc3c7;
  }
  
  .timer-queue {
    border: 1px solid #ddd;
    border-radius: 6px;
    overflow: hidden;
  }
  
  .queue-title {
    background-color: #9b59b6;
    color: white;
    padding: 8px 12px;
    font-weight: bold;
  }
  
  .timers-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 15px;
  }
  
  .timer-function {
    position: relative;
    padding: 8px 12px;
    background-color: #ecf0f1;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .timer-function.executing {
    background-color: #e74c3c;
    color: white;
  }
  
  .timer-execution {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #c0392b;
    color: white;
    padding: 5px 10px;
    border-radius: 0 0 4px 4px;
    font-family: monospace;
    font-size: 12px;
    z-index: 5;
  }
  
  .console-output {
    margin-top: 30px;
    border: 1px solid #ddd;
    border-radius: 6px;
    overflow: hidden;
  }
  
  .console-header {
    background-color: #34495e;
    color: white;
    padding: 8px 12px;
    font-weight: bold;
  }
  
  .console-content {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    min-height: 100px;
    font-family: monospace;
  }
  
  .log-item {
    margin-bottom: 5px;
  }
  
  .animation-controls {
    display: flex;
    gap: 15px;
    margin-top: 20px;
    justify-content: center;
  }
  
  .animation-controls button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .animation-controls button:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
  
  .animation-controls button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  /* Решения */
  .solution-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .solution-tabs button {
    padding: 8px 15px;
    background-color: #ecf0f1;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .solution-tabs button:hover {
    background-color: #bdc3c7;
  }
  
  .solution-tabs button.active {
    background-color: #3498db;
    color: white;
  }
  
  .solution-content {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 6px;
  }
  
  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
  }
  
  .pros h4 {
    color: #27ae60;
  }
  
  .cons h4 {
    color: #c0392b;
  }
  
  .pros, .cons {
    padding: 15px;
    border-radius: 6px;
  }
  
  .pros {
    background-color: #e8f5e9;
    border-left: 3px solid #27ae60;
  }
  
  .cons {
    background-color: #ffebee;
    border-left: 3px solid #c0392b;
  }
  
  /* Примеры */
  .example-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .example-tabs button {
    padding: 8px 15px;
    background-color: #ecf0f1;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .example-tabs button:hover {
    background-color: #bdc3c7;
  }
  
  .example-tabs button.active {
    background-color: #9b59b6;
    color: white;
  }
  
  .example-content {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 6px;
  }
  
  /* Подводные камни */
  .pitfall-item {
    margin-bottom: 25px;
    padding-bottom: 25px;
    border-bottom: 1px solid #eee;
  }
  
  .pitfall-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  
  .pitfall-item h3 {
    color: #e74c3c;
  }
  
  /* Выводы */
  .conclusion-list li {
    margin-bottom: 10px;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .pros-cons {
      grid-template-columns: 1fr;
    }
    
    .execution-flow {
      gap: 15px;
    }
  }
  </style>