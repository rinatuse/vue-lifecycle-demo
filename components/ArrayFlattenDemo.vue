<template>
    <div class="array-flatten-demo">
      <h1>Сглаживание массива: превращаем многомерный массив в одномерный</h1>
      
      <div class="task-description">
        <h2>Задача</h2>
        <p>Реализовать аналог метода массива <code>.flat()</code>, который превращает многомерный массив в плоский, одномерный.</p>
        <div class="code-block">
          <pre><code>const flatten = (arr) => { /* Ваш код здесь */ };
  console.log(flatten([1, 2, [3, 4], [[5, [6]]], 7, 8])); // [1,2,3,4,5,6,7,8]</code></pre>
        </div>
      </div>
      
      <div class="section">
        <h2>Визуализация проблемы</h2>
        <div class="visualization">
          <div class="array-container">
            <div class="original-array">
              <h3>Исходный массив:</h3>
              <div class="array-structure" ref="originalArray">
                <div class="array-bracket">[</div>
                <div class="array-content">
                  <div class="array-element">1,</div>
                  <div class="array-element">2,</div>
                  <div class="array-nested">
                    <div class="array-bracket">[</div>
                    <div class="array-content">
                      <div class="array-element">3,</div>
                      <div class="array-element">4</div>
                    </div>
                    <div class="array-bracket">]</div>
                    <div class="array-comma">,</div>
                  </div>
                  <div class="array-nested">
                    <div class="array-bracket">[</div>
                    <div class="array-content">
                      <div class="array-nested">
                        <div class="array-bracket">[</div>
                        <div class="array-content">
                          <div class="array-element">5,</div>
                          <div class="array-nested">
                            <div class="array-bracket">[</div>
                            <div class="array-content">
                              <div class="array-element">6</div>
                            </div>
                            <div class="array-bracket">]</div>
                          </div>
                        </div>
                        <div class="array-bracket">]</div>
                      </div>
                    </div>
                    <div class="array-bracket">]</div>
                    <div class="array-comma">,</div>
                  </div>
                  <div class="array-element">7,</div>
                  <div class="array-element">8</div>
                </div>
                <div class="array-bracket">]</div>
              </div>
            </div>
            
            <div class="transformation-arrow">
              <div class="arrow-line"></div>
              <div class="arrow-head"></div>
            </div>
            
            <div class="flattened-array">
              <h3>Результат:</h3>
              <div class="array-structure">
                <div class="array-bracket">[</div>
                <div class="array-content">
                  <div class="array-element">1,</div>
                  <div class="array-element">2,</div>
                  <div class="array-element">3,</div>
                  <div class="array-element">4,</div>
                  <div class="array-element">5,</div>
                  <div class="array-element">6,</div>
                  <div class="array-element">7,</div>
                  <div class="array-element">8</div>
                </div>
                <div class="array-bracket">]</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2>Подходы к решению</h2>
        
        <div class="tabs">
          <div
            v-for="(approach, index) in approaches"
            :key="approach.id"
            :class="['tab', { active: currentApproach === index }]"
            @click="currentApproach = index"
          >
            {{ approach.name }}
          </div>
        </div>
        
        <div class="approach-content">
          <h3>{{ approaches[currentApproach].name }}</h3>
          <p>{{ approaches[currentApproach].description }}</p>
          
          <div class="code-block">
            <pre><code>{{ approaches[currentApproach].code }}</code></pre>
          </div>
          
          <div class="approach-details">
            <div class="time-complexity">
              <h4>Временная сложность: {{ approaches[currentApproach].timeComplexity }}</h4>
              <p>{{ approaches[currentApproach].timeComplexityExplanation }}</p>
            </div>
            
            <div class="space-complexity">
              <h4>Пространственная сложность: {{ approaches[currentApproach].spaceComplexity }}</h4>
              <p>{{ approaches[currentApproach].spaceComplexityExplanation }}</p>
            </div>
            
            <div class="advantages-disadvantages">
              <div class="advantages">
                <h4>Преимущества:</h4>
                <ul>
                  <li v-for="(advantage, i) in approaches[currentApproach].advantages" :key="i">
                    {{ advantage }}
                  </li>
                </ul>
              </div>
              
              <div class="disadvantages">
                <h4>Недостатки:</h4>
                <ul>
                  <li v-for="(disadvantage, i) in approaches[currentApproach].disadvantages" :key="i">
                    {{ disadvantage }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2>Интерактивная демонстрация</h2>
        
        <div class="interactive-demo">
          <div class="input-section">
            <h3>Введите свой массив для сглаживания:</h3>
            <textarea 
              v-model="inputArray" 
              placeholder="Например: [1, 2, [3, 4], [[5, [6]]], 7, 8]"
              @input="validateInput"
            ></textarea>
            <div v-if="inputError" class="input-error">
              {{ inputError }}
            </div>
            <div class="demo-controls">
              <button @click="runDemo" :disabled="!!inputError || isAnimating">Запустить</button>
              <div class="algorithm-selector">
                <label>Алгоритм:</label>
                <select v-model="selectedAlgorithm">
                  <option v-for="(approach, index) in approaches" :key="index" :value="index">
                    {{ approach.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          
          <div class="visualization-section">
            <h3>Визуализация процесса:</h3>
            <div class="visualization-container">
              <div v-if="isAnimating" class="animation-container">
                <div class="animation-step">
                  <div class="step-description">{{ animationSteps[currentAnimationStep].description }}</div>
                  <div class="step-visualization">
                    <div class="current-state">
                      <div v-html="animationSteps[currentAnimationStep].state"></div>
                    </div>
                  </div>
                </div>
                <div class="animation-controls">
                  <button @click="prevAnimationStep" :disabled="currentAnimationStep === 0">Назад</button>
                  <div class="step-indicator">
                    Шаг {{ currentAnimationStep + 1 }} из {{ animationSteps.length }}
                  </div>
                  <button @click="nextAnimationStep" :disabled="currentAnimationStep === animationSteps.length - 1">Вперед</button>
                </div>
              </div>
              <div v-else class="placeholder">
                Введите массив и нажмите "Запустить" для начала визуализации
              </div>
            </div>
          </div>
          
          <div class="result-section">
            <h3>Результат:</h3>
            <div class="result-container">
              <pre v-if="result">{{ JSON.stringify(result) }}</pre>
              <div v-else class="placeholder">Результат появится здесь после выполнения</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2>Подводные камни и оптимизации</h2>
        
        <div class="pitfalls">
          <div class="pitfall" v-for="(pitfall, index) in pitfalls" :key="index">
            <h3>{{ pitfall.title }}</h3>
            <p>{{ pitfall.description }}</p>
            <div class="code-block" v-if="pitfall.code">
              <pre><code>{{ pitfall.code }}</code></pre>
            </div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2>Практическое применение</h2>
        
        <div class="real-world-applications">
          <div class="application" v-for="(application, index) in realWorldApplications" :key="index">
            <h3>{{ application.title }}</h3>
            <p>{{ application.description }}</p>
            <div class="code-block" v-if="application.code">
              <pre><code>{{ application.code }}</code></pre>
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
        currentApproach: 0,
        approaches: [
          {
            id: 'recursive',
            name: 'Рекурсивный подход',
            description: 'Это классический подход к сглаживанию массива, который использует рекурсию. Мы проходим по каждому элементу исходного массива, проверяем, является ли элемент массивом, и если да, то рекурсивно применяем функцию flatten к этому вложенному массиву.',
            code: `const flatten = (arr) => {
    let result = [];
    
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        // Если элемент - массив, рекурсивно сглаживаем его
        // и добавляем результат в наш массив
        result = result.concat(flatten(arr[i]));
      } else {
        // Если элемент не массив, просто добавляем его
        result.push(arr[i]);
      }
    }
    
    return result;
  };`,
            timeComplexity: 'O(n)',
            timeComplexityExplanation: 'Где n - общее количество элементов во всех вложенных массивах. Каждый элемент обрабатывается ровно один раз.',
            spaceComplexity: 'O(d + n)',
            spaceComplexityExplanation: 'Где d - максимальная глубина вложенности, n - количество элементов. Пространство используется для результирующего массива и стека вызовов.',
            advantages: [
              'Простота и понятность решения',
              'Естественно работает с любой глубиной вложенности',
              'Легко реализовать'
            ],
            disadvantages: [
              'Риск переполнения стека при очень глубокой вложенности',
              'Не самый эффективный метод с точки зрения памяти из-за множественных копирований массивов при concat',
              'Рекурсивные вызовы могут быть медленнее итеративных решений в некоторых JavaScript движках'
            ]
          },
          {
            id: 'reduce',
            name: 'Функциональный подход с reduce',
            description: 'Этот подход использует функциональное программирование с методом reduce для более элегантного решения. Метод reduce обрабатывает каждый элемент массива, накапливая результат.',
            code: `const flatten = (arr) => {
    return arr.reduce((acc, item) => {
      // Если элемент - массив, рекурсивно сглаживаем его
      // и объединяем с аккумулятором
      if (Array.isArray(item)) {
        return acc.concat(flatten(item));
      } else {
        // Если элемент не массив, добавляем его к аккумулятору
        return acc.concat(item);
      }
    }, []);
  };`,
            timeComplexity: 'O(n)',
            timeComplexityExplanation: 'Где n - общее количество элементов. В худшем случае мы просматриваем каждый элемент один раз.',
            spaceComplexity: 'O(d + n)',
            spaceComplexityExplanation: 'Где d - максимальная глубина, n - количество элементов. Создаются промежуточные массивы при каждом вызове concat.',
            advantages: [
              'Более декларативный и функциональный стиль',
              'Краткая и выразительная запись',
              'Хорошо читаемый код'
            ],
            disadvantages: [
              'Метод concat создает новые массивы, что может быть неэффективно для больших массивов',
              'Как и рекурсивный подход, может вызвать переполнение стека',
              'Может быть менее понятен для программистов, не знакомых с функциональным стилем'
            ]
          },
          {
            id: 'iterative',
            name: 'Итеративный подход со стеком',
            description: 'Этот подход избегает рекурсии, используя явный стек для отслеживания элементов, которые нужно обработать. Это помогает избежать переполнения стека вызовов в JavaScript.',
            code: `const flatten = (arr) => {
    const result = [];
    const stack = [...arr]; // Копируем исходный массив в стек
    
    while (stack.length > 0) {
      // Извлекаем элемент из стека
      const item = stack.pop();
      
      if (Array.isArray(item)) {
        // Если это массив, добавляем его элементы в стек
        // в обратном порядке (чтобы сохранить исходный порядок)
        for (let i = item.length - 1; i >= 0; i--) {
          stack.push(item[i]);
        }
      } else {
        // Если это не массив, добавляем его в результат
        result.unshift(item); // Используем unshift, т.к. элементы извлекаются в обратном порядке
      }
    }
    
    return result;
  };`,
            timeComplexity: 'O(n)',
            timeComplexityExplanation: 'Где n - общее количество элементов. Каждый элемент добавляется и извлекается из стека ровно один раз.',
            spaceComplexity: 'O(n)',
            spaceComplexityExplanation: 'В худшем случае все элементы могут оказаться в стеке одновременно. Стек вызовов не растет как в рекурсивном решении.',
            advantages: [
              'Избегает переполнения стека даже для очень глубоких структур',
              'Более эффективное использование памяти',
              'Часто быстрее рекурсивных решений для больших массивов'
            ],
            disadvantages: [
              'Код сложнее для понимания',
              'Использование unshift может быть неэффективным, так как имеет сложность O(n)',
              'Необходимо следить за порядком элементов при работе со стеком'
            ]
          },
          {
            id: 'optimized',
            name: 'Оптимизированное решение',
            description: 'Это оптимизированное решение, которое сочетает лучшие аспекты предыдущих подходов. Оно использует один цикл для обхода массива и добавляет элементы в результирующий массив без создания лишних промежуточных массивов.',
            code: `const flatten = (arr) => {
    const result = [];
    
    function flattenHelper(items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        if (Array.isArray(item)) {
          // Рекурсивно обрабатываем вложенный массив
          flattenHelper(item);
        } else {
          // Добавляем элемент напрямую в результат
          result.push(item);
        }
      }
    }
    
    flattenHelper(arr);
    return result;
  };`,
            timeComplexity: 'O(n)',
            timeComplexityExplanation: 'Где n - общее количество элементов. Каждый элемент обрабатывается ровно один раз.',
            spaceComplexity: 'O(d + n)',
            spaceComplexityExplanation: 'Где d - максимальная глубина, n - количество элементов. Пространство используется для результирующего массива и стека вызовов рекурсии.',
            advantages: [
              'Избегает неэффективных операций массива (concat создает новые массивы)',
              'Простой и понятный код',
              'Более эффективное использование памяти'
            ],
            disadvantages: [
              'Всё еще использует рекурсию (хотя и более эффективно)',
              'Зависит от внешней переменной result',
              'Потенциально может вызвать переполнение стека при очень глубокой вложенности'
            ]
          },
          {
            id: 'built-in',
            name: 'Встроенный метод Array.flat()',
            description: 'В современном JavaScript уже есть встроенный метод Array.flat(), который делает именно то, что нам нужно. По умолчанию он сглаживает массив на один уровень глубины, но можно передать параметр для сглаживания на большую глубину или Infinity для полного сглаживания.',
            code: `// Встроенное решение в современном JavaScript
  const flatten = (arr) => {
    return arr.flat(Infinity);
  };
  
  // Как работает Array.flat внутри (упрощенно):
  Array.prototype.myFlat = function(depth = 1) {
    let result = [];
    
    (function flatten(arr, depth) {
      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i]) && depth > 0) {
          flatten(arr[i], depth - 1);
        } else {
          result.push(arr[i]);
        }
      }
    })(this, depth);
    
    return result;
  };`,
            timeComplexity: 'O(n)',
            timeComplexityExplanation: 'Где n - общее количество элементов. Внутренняя реализация обычно похожа на оптимизированное решение.',
            spaceComplexity: 'O(n)',
            spaceComplexityExplanation: 'Где n - количество элементов. Встроенная реализация обычно оптимизирована для минимального использования памяти.',
            advantages: [
              'Готовое решение без необходимости писать свой код',
              'Оптимизировано и протестировано разработчиками JavaScript',
              'Поддерживает различные уровни сглаживания через параметр'
            ],
            disadvantages: [
              'Не поддерживается в старых браузерах (до ES2019)',
              'Может требовать полифилла для обеспечения совместимости',
              'Менее гибкий при необходимости кастомной логики'
            ]
          }
        ],
        
        inputArray: '[1, 2, [3, 4], [[5, [6]]], 7, 8]',
        inputError: '',
        selectedAlgorithm: 0,
        
        isAnimating: false,
        animationSteps: [],
        currentAnimationStep: 0,
        
        result: null,
        
        pitfalls: [
          {
            title: 'Переполнение стека с рекурсией',
            description: 'При работе с очень глубоко вложенными массивами рекурсивные решения могут вызвать переполнение стека вызовов. В таких случаях лучше использовать итеративный подход со стеком.',
            code: `// Проблема: может вызвать переполнение стека
  const dangerousArray = [];
  let current = dangerousArray;
  for (let i = 0; i < 100000; i++) {
    current[0] = [];
    current = current[0];
  }
  
  // Рекурсивный подход может упасть с ошибкой 
  // "RangeError: Maximum call stack size exceeded"
  flatten(dangerousArray);
  
  // Решение: использовать итеративный подход`
          },
          {
            title: 'Проблемы с производительностью при использовании concat',
            description: 'Метод concat создает новый массив при каждом вызове, что может привести к значительным накладным расходам при работе с большими массивами. Решение с прямым push в результирующий массив более эффективно.',
            code: `// Неэффективно: много операций создания новых массивов
  result = result.concat(flatten(arr[i])); 
  
  // Более эффективно: прямое добавление в результирующий массив
  function flattenHelper(items) {
    for (let i = 0; i < items.length; i++) {
      if (Array.isArray(items[i])) {
        flattenHelper(items[i]);
      } else {
        result.push(items[i]);
      }
    }
  }`
          },
          {
            title: 'Сохранение порядка элементов',
            description: 'При использовании стека для итеративного подхода важно помнить, что элементы извлекаются в порядке LIFO (последний вошел - первый вышел). Это может привести к изменению порядка элементов в результате, если не обрабатывать их правильно.',
            code: `// Проблема: неправильный порядок элементов
  const flatten = (arr) => {
    const result = [];
    const stack = [...arr];
    
    while (stack.length) {
      const item = stack.pop();
      if (Array.isArray(item)) {
        // Добавляем элементы в том же порядке, в каком они идут в массиве
        // Это приведет к обратному порядку при извлечении!
        for (let i = 0; i < item.length; i++) {
          stack.push(item[i]);
        }
      } else {
        result.push(item); // Результат будет в неправильном порядке
      }
    }
    
    return result;
  };
  
  // Решение: добавлять элементы в стек в обратном порядке
  // или использовать unshift для результата`
          },
          {
            title: 'Обработка пустых массивов',
            description: 'Некоторые реализации могут некорректно обрабатывать пустые массивы, особенно если они вложены. Важно тестировать решение на таких крайних случаях.',
            code: `const weirdArray = [1, [], 2, [[], [[[]]]], 3];
  
  // Должно вернуть [1, 2, 3]
  flatten(weirdArray);`
          },
          {
            title: 'Ограничение глубины сглаживания',
            description: 'В некоторых случаях может потребоваться ограничить глубину сглаживания, например, сгладить массив только на один уровень, как Array.flat() без параметров.',
            code: `// Вариант с ограничением глубины
  const flattenWithDepth = (arr, depth = Infinity) => {
    const result = [];
    
    function flattenHelper(items, currentDepth) {
      for (let i = 0; i < items.length; i++) {
        if (Array.isArray(items[i]) && currentDepth < depth) {
          flattenHelper(items[i], currentDepth + 1);
        } else {
          result.push(items[i]);
        }
      }
    }
    
    flattenHelper(arr, 0);
    return result;
  };
  
  // Пример использования
  flattenWithDepth([1, [2, [3, [4]]], 5], 1); // [1, 2, [3, [4]], 5]
  flattenWithDepth([1, [2, [3, [4]]], 5], 2); // [1, 2, 3, [4], 5]
  flattenWithDepth([1, [2, [3, [4]]], 5]);    // [1, 2, 3, 4, 5]`
          }
        ],
        
        realWorldApplications: [
          {
            title: 'Обработка вложенных комментариев',
            description: 'В социальных сетях и форумах комментарии часто имеют древовидную структуру (комментарии к комментариям). При сборе всех комментариев в один список для анализа или отображения может потребоваться сглаживание этой структуры.',
            code: `// Допустим, у нас есть дерево комментариев
  const commentTree = [
    { id: 1, text: "Основной комментарий 1", replies: [] },
    { 
      id: 2, 
      text: "Основной комментарий 2", 
      replies: [
        { id: 3, text: "Ответ на комментарий 2", replies: [] },
        { 
          id: 4, 
          text: "Еще ответ на комментарий 2", 
          replies: [
            { id: 5, text: "Ответ на ответ", replies: [] }
          ]
        }
      ]
    }
  ];
  
  // Функция для получения плоского списка всех комментариев
  function getAllComments(comments) {
    const result = [];
    
    function extractComments(commentsArray) {
      for (const comment of commentsArray) {
        // Сохраняем комментарий без вложенных ответов
        const { replies, ...commentWithoutReplies } = comment;
        result.push(commentWithoutReplies);
        
        // Рекурсивно обрабатываем вложенные ответы
        if (replies && replies.length) {
          extractComments(replies);
        }
      }
    }
    
    extractComments(comments);
    return result;
  }
  
  // Получаем плоский список всех комментариев
  const allComments = getAllComments(commentTree);
  console.log(allComments);
  // [
  //   { id: 1, text: "Основной комментарий 1" },
  //   { id: 2, text: "Основной комментарий 2" },
  //   { id: 3, text: "Ответ на комментарий 2" },
  //   { id: 4, text: "Еще ответ на комментарий 2" },
  //   { id: 5, text: "Ответ на ответ" }
  // ]`
          },
          {
            title: 'Обработка данных из API',
            description: 'При работе с API, которые возвращают иерархические данные (например, древовидные структуры категорий или организационные диаграммы), часто возникает необходимость преобразовать эти данные в плоский список для отображения или обработки.',
            code: `// Допустим, мы получили такую структуру категорий от API
  const categories = [
    { 
      id: 1, 
      name: "Электроника", 
      subCategories: [
        { id: 2, name: "Телефоны", subCategories: [] },
        { 
          id: 3, 
          name: "Компьютеры", 
          subCategories: [
            { id: 4, name: "Ноутбуки", subCategories: [] },
            { id: 5, name: "Настольные ПК", subCategories: [] }
          ]
        }
      ]
    },
    { 
      id: 6, 
      name: "Одежда", 
      subCategories: [
        { id: 7, name: "Мужская", subCategories: [] },
        { id: 8, name: "Женская", subCategories: [] }
      ]
    }
  ];
  
  // Функция для получения плоского списка категорий
  function flattenCategories(categories) {
    const result = [];
    
    function processCategory(category, depth = 0) {
      // Добавляем текущую категорию с информацией о глубине
      result.push({
        id: category.id,
        name: category.name,
        depth: depth  // Можно сохранить информацию о глубине вложенности
      });
      
      // Обрабатываем подкатегории
      if (category.subCategories && category.subCategories.length) {
        for (const subCategory of category.subCategories) {
          processCategory(subCategory, depth + 1);
        }
      }
    }
    
    // Обрабатываем все корневые категории
    for (const category of categories) {
      processCategory(category);
    }
    
    return result;
  }
  
  // Получаем плоский список категорий
  const flatCategories = flattenCategories(categories);
  console.log(flatCategories);
  // [
  //   { id: 1, name: "Электроника", depth: 0 },
  //   { id: 2, name: "Телефоны", depth: 1 },
  //   { id: 3, name: "Компьютеры", depth: 1 },
  //   { id: 4, name: "Ноутбуки", depth: 2 },
  //   { id: 5, name: "Настольные ПК", depth: 2 },
  //   { id: 6, name: "Одежда", depth: 0 },
  //   { id: 7, name: "Мужская", depth: 1 },
  //   { id: 8, name: "Женская", depth: 1 }
  // ]`
          },
          {
            title: 'Обработка вложенных маршрутов в SPA',
            description: 'В одностраничных приложениях (SPA) маршруты часто определяются в иерархической структуре. Для генерации карты сайта или создания навигации может потребоваться сгладить эту структуру.',
            code: `// Определение маршрутов в иерархической структуре
  const routes = [
    { 
      path: '/dashboard', 
      component: Dashboard,
      children: [
        { path: 'overview', component: Overview },
        { 
          path: 'reports', 
          component: Reports,
          children: [
            { path: 'daily', component: DailyReports },
            { path: 'weekly', component: WeeklyReports }
          ]
        }
      ]
    },
    { 
      path: '/users', 
      component: Users,
      children: [
        { path: 'profile', component: Profile },
        { path: 'settings', component: Settings }
      ]
    }
  ];
  
  // Функция для получения плоского списка всех маршрутов
  function flattenRoutes(routes, parentPath = '') {
    return routes.reduce((acc, route) => {
      // Формируем полный путь
      const fullPath = parentPath 
        ? \`\${parentPath}/\${route.path}\` 
        : route.path;
      
      // Добавляем текущий маршрут
      acc.push({
        path: fullPath,
        component: route.component
      });
      
      // Рекурсивно обрабатываем дочерние маршруты, если они есть
      if (route.children && route.children.length) {
        const childRoutes = flattenRoutes(route.children, fullPath);
        acc.push(...childRoutes);
      }
      
      return acc;
    }, []);
  }
  
  // Получаем плоский список всех маршрутов
  const allRoutes = flattenRoutes(routes);
  console.log(allRoutes);
  // [
  //   { path: '/dashboard', component: Dashboard },
  //   { path: '/dashboard/overview', component: Overview },
  //   { path: '/dashboard/reports', component: Reports },
  //   { path: '/dashboard/reports/daily', component: DailyReports },
  //   { path: '/dashboard/reports/weekly', component: WeeklyReports },
  //   { path: '/users', component: Users },
  //   { path: '/users/profile', component: Profile },
  //   { path: '/users/settings', component: Settings }
  // ]`
          },
          {
            title: 'Сбор всех тегов из сложной структуры документов',
            description: 'При работе с документами, имеющими вложенные разделы, каждый со своими тегами, может потребоваться собрать все уникальные теги в один список.',
            code: `// Структура документов с вложенными разделами и тегами
  const documents = [
    {
      title: "Руководство пользователя",
      tags: ["документация", "инструкция"],
      sections: [
        {
          title: "Установка",
          tags: ["настройка", "инсталляция"],
          subsections: []
        },
        {
          title: "Использование",
          tags: ["примеры", "использование"],
          subsections: [
            {
              title: "Базовые функции",
              tags: ["начало работы", "основы"]
            },
            {
              title: "Продвинутые функции",
              tags: ["продвинутый", "настройка"]
            }
          ]
        }
      ]
    },
    {
      title: "API Reference",
      tags: ["документация", "API", "разработка"],
      sections: [
        {
          title: "Endpoints",
          tags: ["API", "HTTP"],
          subsections: []
        }
      ]
    }
  ];
  
  // Функция для сбора всех тегов
  function getAllTags(documents) {
    const allTags = new Set();
    
    function collectTags(item) {
      // Добавляем теги текущего элемента
      if (item.tags && item.tags.length) {
        item.tags.forEach(tag => allTags.add(tag));
      }
      
      // Обрабатываем разделы
      if (item.sections && item.sections.length) {
        item.sections.forEach(collectTags);
      }
      
      // Обрабатываем подразделы
      if (item.subsections && item.subsections.length) {
        item.subsections.forEach(collectTags);
      }
    }
    
    // Обрабатываем все документы
    documents.forEach(collectTags);
    
    // Возвращаем массив уникальных тегов
    return Array.from(allTags);
  }
  
  // Получаем все уникальные теги
  const uniqueTags = getAllTags(documents);
  console.log(uniqueTags);
  // ["документация", "инструкция", "настройка", "инсталляция", 
  // "примеры", "использование", "начало работы", "основы", 
  // "продвинутый", "API", "разработка", "HTTP"]`
          }
        ]
      };
    },
    
    methods: {
      validateInput() {
        try {
          // Проверяем корректность ввода - должен быть валидный массив JSON
          const parsed = JSON.parse(this.inputArray);
          if (!Array.isArray(parsed)) {
            this.inputError = 'Введенное значение должно быть массивом';
            return;
          }
          this.inputError = '';
        } catch (e) {
          this.inputError = 'Некорректный формат массива JSON' + e.message;
        }
      },
      
      runDemo() {
        // Сбрасываем предыдущую анимацию
        this.isAnimating = false;
        this.animationSteps = [];
        this.currentAnimationStep = 0;
        
        try {
          const inputArray = JSON.parse(this.inputArray);
          
          // Выбираем алгоритм для выполнения
          const selectedApproach = this.approaches[this.selectedAlgorithm];
          
          // Генерируем шаги анимации в зависимости от выбранного алгоритма
          this.generateAnimationSteps(inputArray, selectedApproach.id);
          
          // Выполняем выбранный алгоритм
          let flattenFunction;
          
          // Создаем функцию flatten на основе кода выбранного подхода
          switch(selectedApproach.id) {
            case 'recursive':
              flattenFunction = (arr) => {
                let result = [];
                
                for (let i = 0; i < arr.length; i++) {
                  if (Array.isArray(arr[i])) {
                    result = result.concat(flattenFunction(arr[i]));
                  } else {
                    result.push(arr[i]);
                  }
                }
                
                return result;
              };
              break;
              
            case 'reduce':
              flattenFunction = (arr) => {
                return arr.reduce((acc, item) => {
                  if (Array.isArray(item)) {
                    return acc.concat(flattenFunction(item));
                  } else {
                    return acc.concat(item);
                  }
                }, []);
              };
              break;
              
            case 'iterative':
              flattenFunction = (arr) => {
                const result = [];
                const stack = [...arr];
                
                while (stack.length > 0) {
                  const item = stack.pop();
                  
                  if (Array.isArray(item)) {
                    for (let i = item.length - 1; i >= 0; i--) {
                      stack.push(item[i]);
                    }
                  } else {
                    result.unshift(item);
                  }
                }
                
                return result;
              };
              break;
              
            case 'optimized':
              flattenFunction = (arr) => {
                const result = [];
                
                function flattenHelper(items) {
                  for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    
                    if (Array.isArray(item)) {
                      flattenHelper(item);
                    } else {
                      result.push(item);
                    }
                  }
                }
                
                flattenHelper(arr);
                return result;
              };
              break;
              
            case 'built-in':
              flattenFunction = (arr) => {
                return arr.flat(Infinity);
              };
              break;
              
            default:
              flattenFunction = (arr) => arr.flat(Infinity);
          }
          
          // Выполняем функцию flatten и сохраняем результат
          this.result = flattenFunction(inputArray);
          
          // Запускаем анимацию
          this.isAnimating = true;
          
        } catch (e) {
          console.error('Ошибка при запуске демонстрации:', e);
          this.inputError = 'Произошла ошибка при обработке массива: ' + e.message;
        }
      },
      
      generateAnimationSteps(inputArray, approachId) {
        // Генерируем шаги анимации в зависимости от выбранного алгоритма
        this.animationSteps = [];
        
        // Добавляем начальный шаг
        this.animationSteps.push({
          description: 'Начинаем обработку исходного массива',
          state: this.formatArrayForVisualization(inputArray)
        });
        
        // Генерируем шаги в зависимости от алгоритма
        switch(approachId) {
          case 'recursive':
            this.generateRecursiveSteps(inputArray);
            break;
            
          case 'reduce':
            this.generateReduceSteps(inputArray);
            break;
            
          case 'iterative':
            this.generateIterativeSteps(inputArray);
            break;
            
          case 'optimized':
            this.generateOptimizedSteps(inputArray);
            break;
            
          case 'built-in':
            this.generateBuiltInSteps(inputArray);
            break;
        }
      },
      
      generateRecursiveSteps(arr, level = 0, path = '') {
        // Шаги для рекурсивного алгоритма
        const result = [];
        
        for (let i = 0; i < arr.length; i++) {
          const currentPath = path ? `${path}[${i}]` : `arr[${i}]`;
          
          if (Array.isArray(arr[i])) {
            this.animationSteps.push({
              description: `Обнаружен вложенный массив по пути ${currentPath}. Рекурсивный вызов flatten для обработки этого массива.`,
              state: this.formatArrayForVisualization(arr, i, true)
            });
            
            const nestedResult = this.generateRecursiveSteps(arr[i], level + 1, currentPath);
            
            this.animationSteps.push({
              description: `Получен результат рекурсивного вызова: [${nestedResult.join(', ')}]. Объединяем с текущим результатом.`,
              state: this.formatArrayWithHighlight(result.concat(nestedResult))
            });
            
            result.push(...nestedResult);
          } else {
            this.animationSteps.push({
              description: `Обрабатываем элемент ${currentPath} = ${arr[i]}. Добавляем его в результат.`,
              state: this.formatArrayForVisualization(arr, i)
            });
            
            result.push(arr[i]);
          }
        }
        
        if (level === 0) {
          this.animationSteps.push({
            description: 'Завершили обработку массива. Итоговый результат:',
            state: this.formatArrayWithHighlight(result)
          });
        }
        
        return result;
      },
      
      generateReduceSteps(arr, level = 0, path = '') {
        // Шаги для алгоритма с reduce
        let result = [];
        
        this.animationSteps.push({
          description: 'Начинаем обработку с пустым аккумулятором [].',
          state: this.formatArrayWithHighlight([])
        });
        
        for (let i = 0; i < arr.length; i++) {
          const currentPath = path ? `${path}[${i}]` : `arr[${i}]`;
          
          if (Array.isArray(arr[i])) {
            this.animationSteps.push({
              description: `Обнаружен вложенный массив по пути ${currentPath}. Рекурсивный вызов flatten через reduce.`,
              state: this.formatArrayForVisualization(arr, i, true)
            });
            
            const nestedResult = this.generateReduceSteps(arr[i], level + 1, currentPath);
            
            this.animationSteps.push({
              description: `Получен результат reduce для вложенного массива: [${nestedResult.join(', ')}]. Объединяем с аккумулятором.`,
              state: `Аккумулятор до: [${result.join(', ')}]<br>Новый результат: [${nestedResult.join(', ')}]<br>Аккумулятор после: [${result.concat(nestedResult).join(', ')}]`
            });
            
            result = result.concat(nestedResult);
          } else {
            this.animationSteps.push({
              description: `Обрабатываем элемент ${currentPath} = ${arr[i]}. Добавляем его в аккумулятор.`,
              state: `Аккумулятор до: [${result.join(', ')}]<br>Добавляем: ${arr[i]}<br>Аккумулятор после: [${result.concat(arr[i]).join(', ')}]`
            });
            
            result = result.concat(arr[i]);
          }
        }
        
        if (level === 0) {
          this.animationSteps.push({
            description: 'Завершили reduce. Итоговый результат:',
            state: this.formatArrayWithHighlight(result)
          });
        }
        
        return result;
      },
      
      generateIterativeSteps(arr) {
        // Шаги для итеративного алгоритма со стеком
        const result = [];
        const stack = [...arr];
        
        this.animationSteps.push({
          description: 'Инициализируем стек исходным массивом.',
          state: `Стек: ${JSON.stringify(stack)}<br>Результат: []`
        });
        
        let step = 1;
        while (stack.length > 0) {
          const item = stack.pop();
          
          this.animationSteps.push({
            description: `Шаг ${step++}: Извлекаем элемент из стека: ${JSON.stringify(item)}`,
            state: `Стек до: ${JSON.stringify(stack.concat([item]))}<br>Извлеченный элемент: ${JSON.stringify(item)}<br>Стек после: ${JSON.stringify(stack)}<br>Результат: [${result.join(', ')}]`
          });
          
          if (Array.isArray(item)) {
            this.animationSteps.push({
              description: 'Элемент является массивом. Добавляем его элементы в стек в обратном порядке.',
              state: `Стек до: ${JSON.stringify(stack)}<br>Добавляем элементы: ${JSON.stringify(item)}<br>Стек после: ${JSON.stringify(stack.concat(item.slice().reverse()))}`
            });
            
            for (let i = item.length - 1; i >= 0; i--) {
              stack.push(item[i]);
            }
          } else {
            this.animationSteps.push({
              description: `Элемент не является массивом. Добавляем ${item} в начало результата.`,
              state: `Результат до: [${result.join(', ')}]<br>Добавляем: ${item}<br>Результат после: [${[item].concat(result).join(', ')}]`
            });
            
            result.unshift(item);
          }
        }
        
        this.animationSteps.push({
          description: 'Стек пуст. Завершили итеративную обработку. Итоговый результат:',
          state: this.formatArrayWithHighlight(result)
        });
      },
      
      generateOptimizedSteps(arr) {
        // Шаги для оптимизированного алгоритма
        const result = [];
        
        this.animationSteps.push({
          description: 'Инициализируем пустой результирующий массив.',
          state: 'Результат: []'
        });
        
        this.optimizedHelper(arr, result);
        
        this.animationSteps.push({
          description: 'Завершили обработку. Итоговый результат:',
          state: this.formatArrayWithHighlight(result)
        });
      },
      
      optimizedHelper(items, result, path = 'arr') {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const currentPath = `${path}[${i}]`;
          
          if (Array.isArray(item)) {
            this.animationSteps.push({
              description: `Обнаружен вложенный массив по пути ${currentPath}. Рекурсивно обрабатываем его.`,
              state: `Обрабатываем: ${JSON.stringify(item)}<br>Текущий результат: [${result.join(', ')}]`
            });
            
            this.optimizedHelper(item, result, currentPath);
          } else {
            this.animationSteps.push({
              description: `Обрабатываем элемент ${currentPath} = ${item}. Добавляем его напрямую в результат.`,
              state: `Результат до: [${result.join(', ')}]<br>Добавляем: ${item}<br>Результат после: [${result.concat([item]).join(', ')}]`
            });
            
            result.push(item);
          }
        }
      },
      
      generateBuiltInSteps(arr) {
        // Шаги для встроенного метода Array.flat()
        this.animationSteps.push({
          description: 'Используем встроенный метод Array.flat(Infinity).',
          state: `Исходный массив: ${JSON.stringify(arr)}<br>Вызываем: arr.flat(Infinity)`
        });
        
        const result = arr.flat(Infinity);
        
        this.animationSteps.push({
          description: 'Метод flat() рекурсивно сглаживает все уровни вложенности. Результат:',
          state: this.formatArrayWithHighlight(result)
        });
      },
      
      formatArrayForVisualization(arr, highlightIndex = -1, isNested = false) {
        let result = '[';
        
        for (let i = 0; i < arr.length; i++) {
          if (i === highlightIndex) {
            if (isNested) {
              result += `<span class="highlight-nested">${JSON.stringify(arr[i])}</span>`;
            } else {
              result += `<span class="highlight-element">${JSON.stringify(arr[i])}</span>`;
            }
          } else {
            result += JSON.stringify(arr[i]);
          }
          
          if (i < arr.length - 1) {
            result += ', ';
          }
        }
        
        result += ']';
        return result;
      },
      
      formatArrayWithHighlight(arr) {
        return `<span class="result-array">[${arr.join(', ')}]</span>`;
      },
      
      prevAnimationStep() {
        if (this.currentAnimationStep > 0) {
          this.currentAnimationStep--;
        }
      },
      
      nextAnimationStep() {
        if (this.currentAnimationStep < this.animationSteps.length - 1) {
          this.currentAnimationStep++;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .array-flatten-demo {
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
    line-height: 1.6;
  }
  
  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
    font-size: 2rem;
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
    margin-top: 25px;
    margin-bottom: 15px;
  }
  
  h4 {
    color: #2c3e50;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  .section {
    margin-bottom: 40px;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  /* Код для визуализации массива */
  .visualization {
    margin: 30px 0;
  }
  
  .array-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
  }
  
  .original-array, .flattened-array {
    width: 45%;
  }
  
  .transformation-arrow {
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  
  .arrow-line {
    width: 80%;
    height: 2px;
    background-color: #3498db;
  }
  
  .arrow-head {
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 12px solid #3498db;
    position: absolute;
    right: 5px;
  }
  
  .array-structure {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 15px;
    font-family: monospace;
    overflow: auto;
    display: flex;
    flex-wrap: nowrap;
  }
  
  .array-bracket {
    color: #e74c3c;
    font-weight: bold;
    margin-right: 5px;
  }
  
  .array-bracket:last-child {
    margin-left: 5px;
    margin-right: 0;
  }
  
  .array-content {
    display: flex;
    flex-wrap: wrap;
  }
  
  .array-element {
    color: #2980b9;
    margin-right: 5px;
  }
  
  .array-nested {
    display: flex;
    margin-right: 5px;
  }
  
  .array-comma {
    margin-right: 5px;
  }
  
  /* Табы для подходов */
  .tabs {
    display: flex;
    overflow-x: auto;
    margin-bottom: 20px;
  }
  
  .tab {
    padding: 10px 20px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px 4px 0 0;
    margin-right: 5px;
    cursor: pointer;
    white-space: nowrap;
  }
  
  .tab.active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }
  
  .approach-content {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 0 4px 4px 4px;
    padding: 20px;
  }
  
  /* Блоки кода */
  .code-block {
    background-color: #2d2d2d;
    color: #f8f8f2;
    border-radius: 6px;
    padding: 15px;
    margin: 15px 0;
    overflow-x: auto;
  }
  
  .code-block pre {
    margin: 0;
    white-space: pre-wrap;
    font-family: 'Courier New', Courier, monospace;
  }
  
  .approach-details {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .time-complexity, .space-complexity {
    background-color: #f1f8e9;
    border-left: 4px solid #8bc34a;
    padding: 15px;
    border-radius: 4px;
  }
  
  .advantages-disadvantages {
    grid-column: span 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 15px;
  }
  
  .advantages {
    background-color: #e3f2fd;
    border-left: 4px solid #2196f3;
    padding: 15px;
    border-radius: 4px;
  }
  
  .disadvantages {
    background-color: #ffebee;
    border-left: 4px solid #f44336;
    padding: 15px;
    border-radius: 4px;
  }
  
  /* Интерактивная демонстрация */
  .interactive-demo {
    margin-top: 30px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .input-section textarea {
    width: 100%;
    height: 100px;
    font-family: monospace;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
  }
  
  .input-error {
    color: #f44336;
    margin-top: 5px;
    font-size: 0.9rem;
  }
  
  .demo-controls {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .demo-controls button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .demo-controls button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .algorithm-selector {
    display: flex;
    align-items: center;
  }
  
  .algorithm-selector label {
    margin-right: 10px;
  }
  
  .algorithm-selector select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .visualization-container {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 20px;
    min-height: 200px;
  }
  
  .placeholder {
    color: #95a5a6;
    font-style: italic;
    text-align: center;
    padding: 20px;
  }
  
  .animation-container {
    display: flex;
    flex-direction: column;
  }
  
  .animation-step {
    margin-bottom: 20px;
  }
  
  .step-description {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .step-visualization {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    min-height: 100px;
  }
  
  .current-state {
    font-family: monospace;
    line-height: 1.5;
  }
  
  .animation-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
  }
  
  .animation-controls button {
    padding: 8px 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .animation-controls button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .step-indicator {
    font-size: 0.9rem;
    color: #7f8c8d;
  }
  
  .result-container {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 15px;
    min-height: 50px;
    font-family: monospace;
  }
  
  /* Подсветка элементов в анимации */
  .highlight-element {
    background-color: #ffeb3b;
    padding: 2px 5px;
    border-radius: 3px;
  }
  
  .highlight-nested {
    background-color: #ff9800;
    color: white;
    padding: 2px 5px;
    border-radius: 3px;
  }
  
  .result-array {
    background-color: #e8f5e9;
    color: #2e7d32;
    padding: 2px 5px;
    border-radius: 3px;
    font-weight: bold;
  }
  
  /* Подводные камни и применения */
  .pitfalls, .real-world-applications {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .pitfall, .application {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 20px;
  }
  
  .pitfall h3 {
    color: #e74c3c;
  }
  
  .application h3 {
    color: #2e7d32;
  }
  
  /* Медиа-запросы для адаптивности */
  @media (max-width: 768px) {
    .array-container {
      flex-direction: column;
    }
    
    .original-array, .flattened-array {
      width: 100%;
      margin-bottom: 20px;
    }
    
    .transformation-arrow {
      width: 100%;
      height: 30px;
      transform: rotate(90deg);
      margin: 10px 0;
    }
    
    .approach-details {
      grid-template-columns: 1fr;
    }
    
    .advantages-disadvantages {
      grid-column: span 1;
      grid-template-columns: 1fr;
    }
  }
  </style>