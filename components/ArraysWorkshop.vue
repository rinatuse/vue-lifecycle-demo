<template>
    <div class="arrays-workshop">
      <h1>JavaScript Arrays Workshop</h1>
      
      <div class="difficulty-selector">
        <button 
          v-for="level in difficultyLevels" 
          :key="level.id"
          :class="{ active: currentDifficulty === level.id }"
          @click="changeDifficulty(level.id)"
        >
          {{ level.name }}
        </button>
      </div>
      
      <div class="task-container">
        <div class="task-header">
          <h2>{{ currentTask ? currentTask.title : 'Выберите задачу' }}</h2>
          <div class="level-badge" v-if="currentTask">
            {{ getDifficultyName(currentTask.difficulty) }}
          </div>
        </div>
        
        <div class="tasks-list">
          <div 
            v-for="task in filteredTasks" 
            :key="task.id"
            class="task-item"
            :class="{ active: currentTask && currentTask.id === task.id }"
            @click="selectTask(task)"
          >
            <div class="task-title">{{ task.title }}</div>
            <div class="task-tags">
              <span 
                v-for="tag in task.tags" 
                :key="tag"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="task-content" v-if="currentTask">
          <div class="task-description">
            <h3>Задача:</h3>
            <div v-html="currentTask.description"></div>
            
            <div class="task-example" v-if="currentTask.example">
              <h4>Пример:</h4>
              <pre><code>{{ currentTask.example }}</code></pre>
            </div>
          </div>
          
          <div class="code-playground">
            <div class="code-editor">
              <h3>Редактор кода:</h3>
              <textarea 
                v-model="userCode" 
                placeholder="Напишите ваше решение здесь..."
                @input="resetResults"
              ></textarea>
            </div>
            
            <div class="test-controls">
              <button @click="runSolution" class="run-button">Запустить</button>
              <button @click="showHint" :disabled="hintShown" class="hint-button">Подсказка</button>
              <button @click="showSolution" :disabled="solutionShown" class="solution-button">Показать решение</button>
            </div>
            
            <div class="results" v-if="testResults.length > 0">
              <h3>Результаты тестирования:</h3>
              <div 
                v-for="(result, index) in testResults" 
                :key="index"
                class="test-result"
                :class="{ passed: result.passed, failed: !result.passed }"
              >
                <div class="result-status">
                  {{ result.passed ? '✓' : '✗' }}
                </div>
                <div class="result-details">
                  <div class="test-name">{{ result.name }}</div>
                  <div class="test-info" v-if="!result.passed">
                    <div>Ожидалось: <span class="expected">{{ result.expected }}</span></div>
                    <div>Получено: <span class="actual">{{ result.actual }}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="hint-panel" v-if="currentTask && hintShown">
          <h3>Подсказка:</h3>
          <div v-html="currentTask.hint"></div>
        </div>
        
        <div class="solution-panel" v-if="currentTask && solutionShown">
          <h3>Решение:</h3>
          <pre><code>{{ currentTask.solution }}</code></pre>
          <div class="solution-explanation" v-if="currentTask.explanation">
            <h4>Объяснение:</h4>
            <div v-html="currentTask.explanation"></div>
          </div>
        </div>
      </div>
      
      <div class="array-methods-guide">
        <h2>Шпаргалка по методам массивов</h2>
        
        <div class="methods-categories">
          <div 
            v-for="category in methodCategories" 
            :key="category.id"
            class="method-category"
            :class="{ active: currentCategory === category.id }"
            @click="currentCategory = category.id"
          >
            {{ category.name }}
          </div>
        </div>
        
        <div class="methods-list">
          <div 
            v-for="method in filteredMethods" 
            :key="method.name"
            class="method-item"
          >
            <div class="method-header" @click="toggleMethod(method.name)">
              <div class="method-name">{{ method.name }}</div>
              <div class="method-brief">{{ method.brief }}</div>
              <div class="method-toggle">{{ expandedMethods.includes(method.name) ? '−' : '+' }}</div>
            </div>
            
            <div class="method-details" v-if="expandedMethods.includes(method.name)">
              <div class="method-syntax">
                <h4>Синтаксис:</h4>
                <pre><code>{{ method.syntax }}</code></pre>
              </div>
              
              <div class="method-description">
                <h4>Описание:</h4>
                <p>{{ method.description }}</p>
              </div>
              
              <div class="method-example">
                <h4>Пример:</h4>
                <pre><code>{{ method.example }}</code></pre>
              </div>
              
              <div class="method-notes" v-if="method.notes">
                <h4>Примечания:</h4>
                <ul>
                  <li v-for="(note, index) in method.notes" :key="index">{{ note }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="patterns-showcase">
        <h2>Полезные паттерны для работы с массивами</h2>
        
        <div class="patterns-list">
          <div 
            v-for="pattern in arrayPatterns" 
            :key="pattern.id"
            class="pattern-item"
            :class="{ expanded: expandedPatterns.includes(pattern.id) }"
          >
            <div class="pattern-header" @click="togglePattern(pattern.id)">
              <div class="pattern-title">{{ pattern.title }}</div>
              <div class="pattern-toggle">{{ expandedPatterns.includes(pattern.id) ? '−' : '+' }}</div>
            </div>
            
            <div class="pattern-content" v-if="expandedPatterns.includes(pattern.id)">
              <div class="pattern-description">
                <h4>Описание:</h4>
                <p>{{ pattern.description }}</p>
              </div>
              
              <div class="pattern-code">
                <h4>Код:</h4>
                <pre><code>{{ pattern.code }}</code></pre>
              </div>
              
              <div class="pattern-use-cases">
                <h4>Применение:</h4>
                <ul>
                  <li v-for="(useCase, index) in pattern.useCases" :key="index">{{ useCase }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Уровни сложности
  const difficultyLevels = [
    { id: 'all', name: 'Все уровни' },
    { id: 'easy', name: 'Легкий' },
    { id: 'medium', name: 'Средний' },
    { id: 'hard', name: 'Сложный' }
  ];
  
  const currentDifficulty = ref('all');
  
  function getDifficultyName(id) {
    const level = difficultyLevels.find(level => level.id === id);
    return level ? level.name : '';
  }
  
  function changeDifficulty(difficulty) {
    currentDifficulty.value = difficulty;
    currentTask.value = null;
    resetState();
  }
  
  // Задачи
  const tasks = [
    {
      id: 1,
      title: 'Найти максимальное число',
      difficulty: 'easy',
      tags: ['поиск', 'Math.max'],
      description: 'Напишите функцию <code>findMax(arr)</code>, которая принимает массив чисел и возвращает наибольшее число в массиве.',
      example: 'findMax([1, 5, 3, 9, 2]) // Вернет: 9',
      hint: 'Вы можете использовать метод <code>Math.max()</code> вместе с оператором расширения <code>...</code> для раскрытия массива.',
      solution: `function findMax(arr) {
    return Math.max(...arr);
  }`,
      explanation: 'Метод <code>Math.max()</code> возвращает наибольшее из переданных чисел. Используя оператор расширения <code>...</code>, мы передаем все элементы массива как отдельные аргументы в <code>Math.max()</code>.',
      tests: [
        { input: [1, 5, 3, 9, 2], expected: 9 },
        { input: [-1, -5, -3], expected: -1 },
        { input: [100], expected: 100 },
        { input: [7, 7, 7], expected: 7 }
      ]
    },
    {
      id: 2,
      title: 'Фильтрация четных чисел',
      difficulty: 'easy',
      tags: ['фильтрация', 'filter'],
      description: 'Напишите функцию <code>filterEven(arr)</code>, которая принимает массив чисел и возвращает новый массив, содержащий только четные числа из исходного массива.',
      example: 'filterEven([1, 2, 3, 4, 5, 6]) // Вернет: [2, 4, 6]',
      hint: 'Используйте метод <code>filter()</code> для создания нового массива с элементами, которые проходят условие. Число является четным, если при делении на 2 остаток равен 0.',
      solution: `function filterEven(arr) {
    return arr.filter(num => num % 2 === 0);
  }`,
      explanation: 'Метод <code>filter()</code> создает новый массив, включая только те элементы, для которых функция-предикат возвращает <code>true</code>. Выражение <code>num % 2 === 0</code> проверяет, делится ли число на 2 без остатка, т.е. является ли оно четным.',
      tests: [
        { input: [1, 2, 3, 4, 5, 6], expected: [2, 4, 6] },
        { input: [1, 3, 5], expected: [] },
        { input: [2, 4, 6], expected: [2, 4, 6] },
        { input: [-2, -1, 0, 1, 2], expected: [-2, 0, 2] }
      ]
    },
    {
      id: 3,
      title: 'Сумма элементов массива',
      difficulty: 'easy',
      tags: ['агрегация', 'reduce'],
      description: 'Напишите функцию <code>sumArray(arr)</code>, которая принимает массив чисел и возвращает сумму всех элементов.',
      example: 'sumArray([1, 2, 3, 4, 5]) // Вернет: 15',
      hint: 'Воспользуйтесь методом <code>reduce()</code> для последовательного сложения всех элементов массива.',
      solution: `function sumArray(arr) {
    return arr.reduce((sum, current) => sum + current, 0);
  }`,
      explanation: 'Метод <code>reduce()</code> применяет функцию аккумулятора к каждому элементу массива (слева направо), сводя его к единственному значению. В данном случае, мы начинаем с 0 и последовательно добавляем каждый элемент массива.',
      tests: [
        { input: [1, 2, 3, 4, 5], expected: 15 },
        { input: [-1, -2, -3], expected: -6 },
        { input: [10], expected: 10 },
        { input: [], expected: 0 }
      ]
    },
    {
      id: 4,
      title: 'Трансформация массива',
      difficulty: 'easy',
      tags: ['трансформация', 'map'],
      description: 'Напишите функцию <code>doubleNumbers(arr)</code>, которая принимает массив чисел и возвращает новый массив, где каждый элемент умножен на 2.',
      example: 'doubleNumbers([1, 2, 3]) // Вернет: [2, 4, 6]',
      hint: 'Используйте метод <code>map()</code>, который создает новый массив с результатами вызова функции для каждого элемента.',
      solution: `function doubleNumbers(arr) {
    return arr.map(num => num * 2);
  }`,
      explanation: 'Метод <code>map()</code> создает новый массив с результатами вызова указанной функции для каждого элемента массива. В нашем случае, мы умножаем каждый элемент на 2.',
      tests: [
        { input: [1, 2, 3], expected: [2, 4, 6] },
        { input: [0, -1, 5], expected: [0, -2, 10] },
        { input: [], expected: [] },
        { input: [100], expected: [200] }
      ]
    },
    {
      id: 5,
      title: 'Плоский массив из матрицы',
      difficulty: 'medium',
      tags: ['трансформация', 'flat', 'reduce'],
      description: 'Напишите функцию <code>flattenArray(arr)</code>, которая принимает двумерный массив (массив массивов) и возвращает одномерный массив со всеми элементами.',
      example: 'flattenArray([[1, 2], [3, 4], [5]]) // Вернет: [1, 2, 3, 4, 5]',
      hint: 'Используйте метод <code>flat()</code> или <code>reduce()</code> с <code>concat()</code> для объединения всех вложенных массивов в один.',
      solution: `function flattenArray(arr) {
    return arr.flat();
    
    // Альтернативное решение:
    // return arr.reduce((result, current) => result.concat(current), []);
  }`,
      explanation: 'Метод <code>flat()</code> создает новый массив со всеми элементами вложенных подмассивов, объединенными в него рекурсивно до указанной глубины. По умолчанию глубина равна 1, что подходит для нашего случая с двумерным массивом. Альтернативное решение с <code>reduce()</code> постепенно объединяет каждый вложенный массив с результирующим массивом.',
      tests: [
        { input: [[1, 2], [3, 4], [5]], expected: [1, 2, 3, 4, 5] },
        { input: [[1, 2]], expected: [1, 2] },
        { input: [[], [3, 4], []], expected: [3, 4] },
        { input: [[1], [2], [3], [4]], expected: [1, 2, 3, 4] }
      ]
    },
    {
      id: 6,
      title: 'Уникальные значения',
      difficulty: 'medium',
      tags: ['фильтрация', 'Set'],
      description: 'Напишите функцию <code>uniqueValues(arr)</code>, которая принимает массив и возвращает новый массив, содержащий только уникальные элементы (без дубликатов).',
      example: 'uniqueValues([1, 2, 2, 3, 4, 4, 5]) // Вернет: [1, 2, 3, 4, 5]',
      hint: 'Используйте объект <code>Set</code>, который по определению хранит только уникальные значения, а затем преобразуйте его обратно в массив.',
      solution: `function uniqueValues(arr) {
    return [...new Set(arr)];
    
    // Альтернативное решение:
    // return arr.filter((value, index, self) => self.indexOf(value) === index);
  }`,
      explanation: 'Конструктор <code>Set</code> создает объект, который хранит только уникальные значения любого типа. Когда мы передаем массив в <code>Set</code>, дубликаты автоматически удаляются. Затем мы используем оператор расширения <code>...</code> для преобразования объекта <code>Set</code> обратно в массив. Альтернативное решение с <code>filter()</code> оставляет только те элементы, для которых первое вхождение в массиве совпадает с текущим индексом.',
      tests: [
        { input: [1, 2, 2, 3, 4, 4, 5], expected: [1, 2, 3, 4, 5] },
        { input: [1, 1, 1, 1], expected: [1] },
        { input: ["a", "b", "a", "c", "c"], expected: ["a", "b", "c"] },
        { input: [true, false, true], expected: [true, false] }
      ]
    },
    {
      id: 7,
      title: 'Частота элементов',
      difficulty: 'medium',
      tags: ['агрегация', 'reduce', 'объекты'],
      description: 'Напишите функцию <code>countFrequency(arr)</code>, которая принимает массив и возвращает объект, где ключи — это уникальные элементы массива, а значения — количество их появлений.',
      example: 'countFrequency(["a", "b", "a", "c", "a", "b"]) // Вернет: { a: 3, b: 2, c: 1 }',
      hint: 'Используйте метод <code>reduce()</code> для построения объекта, увеличивая счетчик при каждом появлении элемента.',
      solution: `function countFrequency(arr) {
    return arr.reduce((freq, current) => {
      freq[current] = (freq[current] || 0) + 1;
      return freq;
    }, {});
  }`,
      explanation: 'Метод <code>reduce()</code> здесь используется для создания объекта, где ключами являются элементы массива, а значениями — количество их появлений. При каждой итерации мы проверяем, существует ли уже счетчик для текущего элемента, и если нет, инициализируем его нулем, а затем увеличиваем на 1.',
      tests: [
        { input: ["a", "b", "a", "c", "a", "b"], expected: { a: 3, b: 2, c: 1 } },
        { input: [1, 2, 3], expected: { 1: 1, 2: 1, 3: 1 } },
        { input: [5, 5, 5], expected: { 5: 3 } },
        { input: [], expected: {} }
      ]
    },
    {
      id: 8,
      title: 'Группировка по свойству',
      difficulty: 'medium',
      tags: ['агрегация', 'reduce', 'объекты'],
      description: 'Напишите функцию <code>groupBy(arr, key)</code>, которая принимает массив объектов и строку с именем свойства, а затем группирует объекты по значению этого свойства.',
      example: `const users = [
    { id: 1, name: "Alice", role: "admin" },
    { id: 2, name: "Bob", role: "user" },
    { id: 3, name: "Charlie", role: "admin" }
  ];
  groupBy(users, "role")
  // Вернет: { admin: [{id: 1, name: "Alice", role: "admin"}, {id: 3, name: "Charlie", role: "admin"}], user: [{id: 2, name: "Bob", role: "user"}] }`,
      hint: 'Используйте метод <code>reduce()</code> для создания объекта, где ключи — это различные значения указанного свойства, а значения — массивы объектов с этим значением свойства.',
      solution: `function groupBy(arr, key) {
    return arr.reduce((groups, item) => {
      const value = item[key];
      groups[value] = groups[value] || [];
      groups[value].push(item);
      return groups;
    }, {});
  }`,
      explanation: 'Метод <code>reduce()</code> используется для построения объекта, где каждый ключ — это уникальное значение свойства <code>key</code> из объектов массива, а каждое значение — массив объектов с таким значением свойства. При каждой итерации мы проверяем, существует ли уже массив для текущего значения свойства, и если нет, инициализируем его пустым массивом, а затем добавляем текущий объект в соответствующий массив.',
      tests: [
        { 
          input: [[
            { id: 1, name: "Alice", role: "admin" },
            { id: 2, name: "Bob", role: "user" },
            { id: 3, name: "Charlie", role: "admin" }
          ], "role"],
          expected: {
            admin: [
              { id: 1, name: "Alice", role: "admin" },
              { id: 3, name: "Charlie", role: "admin" }
            ],
            user: [
              { id: 2, name: "Bob", role: "user" }
            ]
          }
        },
        {
          input: [[
            { type: "fruit", name: "apple" },
            { type: "vegetable", name: "carrot" },
            { type: "fruit", name: "banana" }
          ], "type"],
          expected: {
            fruit: [
              { type: "fruit", name: "apple" },
              { type: "fruit", name: "banana" }
            ],
            vegetable: [
              { type: "vegetable", name: "carrot" }
            ]
          }
        }
      ]
    },
    {
      id: 9,
      title: 'Пересечение массивов',
      difficulty: 'medium',
      tags: ['фильтрация', 'includes', 'Set'],
      description: 'Напишите функцию <code>intersection(arr1, arr2)</code>, которая принимает два массива и возвращает новый массив, содержащий элементы, которые присутствуют в обоих исходных массивах.',
      example: 'intersection([1, 2, 3, 4], [3, 4, 5, 6]) // Вернет: [3, 4]',
      hint: 'Используйте метод <code>filter()</code> с <code>includes()</code> или объекты <code>Set</code> для нахождения общих элементов.',
      solution: `function intersection(arr1, arr2) {
    return arr1.filter(item => arr2.includes(item));
    
    // Альтернативное решение с Set:
    // const set2 = new Set(arr2);
    // return [...new Set(arr1)].filter(item => set2.has(item));
  }`,
      explanation: 'Метод <code>filter()</code> создает новый массив с элементами, которые проходят тест, предоставляемый функцией. В нашем случае, мы оставляем только те элементы из первого массива, которые также присутствуют во втором массиве (проверяем это с помощью метода <code>includes()</code>). Альтернативное решение с использованием <code>Set</code> может быть более эффективным для больших массивов, так как проверка наличия в <code>Set</code> выполняется за O(1), в то время как <code>includes()</code> требует O(n).',
      tests: [
        { input: [[1, 2, 3, 4], [3, 4, 5, 6]], expected: [3, 4] },
        { input: [[1, 2, 3], [4, 5, 6]], expected: [] },
        { input: [[1, 2, 2, 3], [2, 2, 3, 4]], expected: [2, 2, 3] },
        { input: [["a", "b", "c"], ["b", "c", "d"]], expected: ["b", "c"] }
      ]
    },
    {
      id: 10,
      title: 'Разделить массив на чанки',
      difficulty: 'hard',
      tags: ['трансформация', 'slice'],
      description: 'Напишите функцию <code>chunkArray(arr, size)</code>, которая разбивает массив на подмассивы указанного размера.',
      example: 'chunkArray([1, 2, 3, 4, 5, 6, 7], 3) // Вернет: [[1, 2, 3], [4, 5, 6], [7]]',
      hint: 'Создайте пустой массив результатов и используйте цикл с методом <code>slice()</code> для создания подмассивов нужного размера.',
      solution: `function chunkArray(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
    
    // Альтернативное решение с reduce:
    // return arr.reduce((chunks, item, index) => {
    //   const chunkIndex = Math.floor(index / size);
    //   if (!chunks[chunkIndex]) chunks[chunkIndex] = [];
    //   chunks[chunkIndex].push(item);
    //   return chunks;
    // }, []);
  }`,
      explanation: 'Мы создаем пустой массив <code>chunks</code> для хранения подмассивов. Затем с помощью цикла проходим по исходному массиву с шагом, равным размеру чанка. На каждой итерации используем метод <code>slice()</code> для извлечения части массива от текущего индекса до индекса плюс размер чанка и добавляем этот подмассив в результат. Альтернативное решение с <code>reduce()</code> группирует элементы в подмассивы на основе их индекса и размера чанка.',
      tests: [
        { input: [[1, 2, 3, 4, 5, 6, 7], 3], expected: [[1, 2, 3], [4, 5, 6], [7]] },
        { input: [[1, 2, 3, 4, 5], 2], expected: [[1, 2], [3, 4], [5]] },
        { input: [[1, 2, 3], 1], expected: [[1], [2], [3]] },
        { input: [[1, 2, 3], 5], expected: [[1, 2, 3]] }
      ]
    }
  ];
  
  // State для текущей задачи
  const currentTask = ref(null);
  const userCode = ref('');
  const testResults = ref([]);
  const hintShown = ref(false);
  const solutionShown = ref(false);
  
  function selectTask(task) {
    currentTask.value = task;
    resetState();
  }
  
  function resetState() {
    userCode.value = '';
    testResults.value = [];
    hintShown.value = false;
    solutionShown.value = false;
  }
  
  function resetResults() {
    testResults.value = [];
  }
  
  function showHint() {
    hintShown.value = true;
  }
  
  function showSolution() {
    solutionShown.value = true;
    userCode.value = currentTask.value.solution;
  }
  
  async function runSolution() {
    if (!currentTask.value || !userCode.value) return;
    
    try {
      // Создаем функцию из кода пользователя
      const functionName = userCode.value.split('function ')[1].split('(')[0];
      const userFunction = new Function(`
        ${userCode.value}
        return ${functionName};
      `)();
      
      // Запускаем тесты
      testResults.value = [];
      
      for (const test of currentTask.value.tests) {
        
        const result = {
          name: `Ввод: ${JSON.stringify(test.input)}`,
          passed: false,
          expected: JSON.stringify(test.expected),
          actual: ''
        };
        
        try {
        // Запускаем функцию пользователя с тестовыми данными
        const actual = Array.isArray(test.input) && !Array.isArray(test.input[0]) 
          ? userFunction(test.input)
          : userFunction(...test.input);
        
        // Проверяем результат
        result.actual = JSON.stringify(actual);
        
        // Сравниваем с ожидаемым результатом
        if (Array.isArray(test.expected) && Array.isArray(actual)) {
          // Для массивов сравниваем по содержимому
          result.passed = JSON.stringify(test.expected) === JSON.stringify(actual);
        } else if (typeof test.expected === 'object' && test.expected !== null && 
                   typeof actual === 'object' && actual !== null) {
          // Для объектов сравниваем по содержимому
          result.passed = JSON.stringify(test.expected) === JSON.stringify(actual);
        } else {
          // Для примитивов сравниваем напрямую
          result.passed = test.expected === actual;
        }
      } catch (error) {
        result.actual = `Ошибка: ${error.message}`;
      }
      
      testResults.value.push(result);
    }
  } catch (error) {
    testResults.value = [{
      name: 'Ошибка синтаксиса',
      passed: false,
      expected: 'Корректный код',
      actual: `Ошибка: ${error.message}`
    }];
  }
}

// Отфильтрованные задачи по уровню сложности
const filteredTasks = computed(() => {
  if (currentDifficulty.value === 'all') {
    return tasks;
  }
  return tasks.filter(task => task.difficulty === currentDifficulty.value);
});

// Категории методов массивов
const methodCategories = [
  { id: 'all', name: 'Все методы' },
  { id: 'create', name: 'Создание массивов' },
  { id: 'access', name: 'Доступ к элементам' },
  { id: 'iterate', name: 'Перебор элементов' },
  { id: 'transform', name: 'Трансформация' },
  { id: 'filter', name: 'Фильтрация' },
  { id: 'search', name: 'Поиск' },
  { id: 'aggregate', name: 'Агрегация' },
  { id: 'sort', name: 'Сортировка' }
];

const currentCategory = ref('all');
const expandedMethods = ref([]);

// Методы массивов
const arrayMethods = [
  {
    name: 'Array()',
    category: 'create',
    brief: 'Создание массива',
    syntax: 'new Array(length)\nnew Array(element0, element1, /* … ,*/ elementN)',
    description: 'Конструктор Array() создает новый экземпляр массива. Можно вызвать с длиной (создаст пустой массив заданной длины) или с элементами.',
    example: `// Создание пустого массива длиной 5
const arr1 = new Array(5);
console.log(arr1); // [empty × 5]

// Создание массива с элементами
const arr2 = new Array(1, 2, 3);
console.log(arr2); // [1, 2, 3]`,
    notes: [
      'Рекомендуется использовать литеральную нотацию [] вместо конструктора Array() для простоты.',
      'При создании массива с одним числовым аргументом, он интерпретируется как длина массива, а не элемент.'
    ]
  },
  {
    name: 'Array.from()',
    category: 'create',
    brief: 'Создание массива из итерируемого объекта',
    syntax: 'Array.from(arrayLike, mapFn?, thisArg?)',
    description: 'Создает новый экземпляр массива из массивоподобного или итерируемого объекта. Дополнительно можно передать функцию отображения, которая будет вызвана для каждого элемента.',
    example: `// Из строки
const arrFromString = Array.from('hello');
console.log(arrFromString); // ['h', 'e', 'l', 'l', 'o']

// Из Set
const set = new Set([1, 2, 3, 2, 1]);
console.log(Array.from(set)); // [1, 2, 3]

// С функцией отображения
const mapped = Array.from([1, 2, 3], x => x * 2);
console.log(mapped); // [2, 4, 6]`,
    notes: [
      'Полезен для преобразования итерируемых объектов и коллекций в массивы.',
      'Можно использовать для удаления дубликатов: Array.from(new Set(array)).'
    ]
  },
  {
    name: 'Array.of()',
    category: 'create',
    brief: 'Создание массива из аргументов',
    syntax: 'Array.of(element0, element1, /* … ,*/ elementN)',
    description: 'Создает новый экземпляр массива из переменного числа аргументов, независимо от количества или типа аргументов.',
    example: `// Создание массива из аргументов
const arr = Array.of(1, 2, 3);
console.log(arr); // [1, 2, 3]

// Отличие от Array()
console.log(Array.of(5)); // [5]
console.log(new Array(5)); // [empty × 5]`,
    notes: [
      'Решает проблему с конструктором Array(), когда один числовой аргумент интерпретируется как длина.'
    ]
  },
  {
    name: 'at()',
    category: 'access',
    brief: 'Доступ к элементу по индексу, включая отрицательные индексы',
    syntax: 'array.at(index)',
    description: 'Возвращает элемент массива по указанному индексу. Поддерживает отрицательные индексы для доступа с конца массива.',
    example: `const arr = ['a', 'b', 'c', 'd', 'e'];

// Положительные индексы работают как обычно
console.log(arr.at(2)); // 'c'

// Отрицательные индексы считаются с конца
console.log(arr.at(-1)); // 'e'
console.log(arr.at(-2)); // 'd'`,
    notes: [
      'Добавлен в ES2022 как альтернатива arr[arr.length - n] для доступа к элементам с конца.',
      'В отличие от скобочной нотации, может использоваться с отрицательными индексами.'
    ]
  },
  {
    name: 'forEach()',
    category: 'iterate',
    brief: 'Выполнение функции для каждого элемента',
    syntax: 'array.forEach(callback(element, index, array), thisArg?)',
    description: 'Выполняет указанную функцию один раз для каждого элемента массива. Не создает новый массив и не изменяет исходный.',
    example: `const numbers = [1, 2, 3, 4, 5];

numbers.forEach((num, index) => {
  console.log(\`Элемент \${num} находится на позиции \${index}\`);
});

// Использование для обновления объектов
const users = [{ name: 'Alice', active: false }, { name: 'Bob', active: false }];
users.forEach(user => user.active = true);`,
    notes: [
      'Нельзя прервать цикл forEach() с помощью break или return.',
      'Не возвращает значения, поэтому подходит только для операций с побочными эффектами.',
      'Пропускает пустые элементы массива.'
    ]
  },
  {
    name: 'map()',
    category: 'transform',
    brief: 'Создание нового массива через преобразование каждого элемента',
    syntax: 'array.map(callback(element, index, array), thisArg?)',
    description: 'Создает новый массив, заполненный результатами вызова предоставленной функции для каждого элемента исходного массива.',
    example: `const numbers = [1, 2, 3, 4, 5];

// Умножение каждого элемента на 2
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Преобразование объектов
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
const names = users.map(user => user.name);
console.log(names); // ['Alice', 'Bob']`,
    notes: [
      'Всегда возвращает новый массив, не изменяя исходный.',
      'Длина результирующего массива всегда совпадает с длиной исходного.',
      'Сохраняет пустые элементы массива.'
    ]
  },
  {
    name: 'filter()',
    category: 'filter',
    brief: 'Создание нового массива из элементов, прошедших проверку',
    syntax: 'array.filter(callback(element, index, array), thisArg?)',
    description: 'Создает новый массив со всеми элементами, прошедшими проверку, реализованную в переданной функции.',
    example: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Фильтрация четных чисел
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6, 8, 10]

// Фильтрация объектов
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
  { name: 'Charlie', age: 30 }
];
const adults = users.filter(user => user.age >= 18);
console.log(adults); // [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 30 }]`,
    notes: [
      'Возвращает новый массив, не изменяя исходный.',
      'Если ни один элемент не проходит проверку, возвращается пустой массив.',
      'Пропускает пустые элементы массива.'
    ]
  },
  {
    name: 'reduce()',
    category: 'aggregate',
    brief: 'Сведение массива к единственному значению',
    syntax: 'array.reduce(callback(accumulator, currentValue, index, array), initialValue?)',
    description: 'Применяет функцию к аккумулятору и каждому элементу массива (слева направо), сводя его к единственному значению.',
    example: `const numbers = [1, 2, 3, 4, 5];

// Сумма всех чисел
const sum = numbers.reduce((acc, current) => acc + current, 0);
console.log(sum); // 15

// Группировка объектов по свойству
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const countByFruit = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(countByFruit); // { apple: 3, banana: 2, orange: 1 }`,
    notes: [
      'Начальное значение аккумулятора очень важно для правильной работы!',
      'Если массив пуст и начальное значение не предоставлено, будет выброшена ошибка.',
      'Результат может быть любого типа, не обязательно массивом.',
      'Очень мощный метод для агрегации данных, группировки, построения объектов и других трансформаций.'
    ]
  },
  {
    name: 'find()',
    category: 'search',
    brief: 'Поиск первого элемента, удовлетворяющего условию',
    syntax: 'array.find(callback(element, index, array), thisArg?)',
    description: 'Возвращает значение первого элемента в массиве, который удовлетворяет предоставленной функции проверки. В противном случае возвращается undefined.',
    example: `const numbers = [5, 12, 8, 130, 44];

// Поиск первого числа больше 10
const found = numbers.find(num => num > 10);
console.log(found); // 12

// Поиск объекта по свойству
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
const user = users.find(user => user.id === 2);
console.log(user); // { id: 2, name: 'Bob' }`,
    notes: [
      'Возвращает первый найденный элемент, а не массив всех совпадений.',
      'Возвращает undefined, если элемент не найден.',
      'Полезен для поиска уникальных элементов, особенно в массивах объектов.'
    ]
  },
  {
    name: 'findIndex()',
    category: 'search',
    brief: 'Поиск индекса первого элемента, удовлетворяющего условию',
    syntax: 'array.findIndex(callback(element, index, array), thisArg?)',
    description: 'Возвращает индекс первого элемента в массиве, который удовлетворяет предоставленной функции проверки. В противном случае возвращается -1.',
    example: `const numbers = [5, 12, 8, 130, 44];

// Поиск индекса первого числа больше 10
const index = numbers.findIndex(num => num > 10);
console.log(index); // 1

// Поиск индекса элемента, которого нет
const notFound = numbers.findIndex(num => num > 200);
console.log(notFound); // -1`,
    notes: [
      'Похож на find(), но возвращает индекс элемента, а не сам элемент.',
      'Возвращает -1, если элемент не найден.',
      'Полезен, когда нужно знать позицию элемента для дальнейших операций.'
    ]
  },
  {
    name: 'includes()',
    category: 'search',
    brief: 'Проверка наличия элемента в массиве',
    syntax: 'array.includes(searchElement, fromIndex?)',
    description: 'Определяет, содержит ли массив определенный элемент, возвращая true или false соответственно.',
    example: `const fruits = ['apple', 'banana', 'orange'];

console.log(fruits.includes('banana')); // true
console.log(fruits.includes('grape')); // false

// С указанием начального индекса
console.log(fruits.includes('apple', 1)); // false, т.к. ищем после индекса 1`,
    notes: [
      'Использует строгое сравнение (===), с особым случаем для NaN.',
      'Второй параметр указывает индекс, с которого начинать поиск.',
      'Может использоваться с отрицательным индексом для поиска с конца массива.'
    ]
  },
  {
    name: 'some()',
    category: 'search',
    brief: 'Проверка, удовлетворяет ли хотя бы один элемент условию',
    syntax: 'array.some(callback(element, index, array), thisArg?)',
    description: 'Проверяет, удовлетворяет ли хотя бы один элемент массива предоставленной функции проверки.',
    example: `const numbers = [1, 2, 3, 4, 5];

// Проверка, есть ли хотя бы одно четное число
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true

// Проверка, есть ли число больше 10
const hasLarge = numbers.some(num => num > 10);
console.log(hasLarge); // false`,
    notes: [
      'Возвращает true, как только находит элемент, удовлетворяющий условию, и не проверяет оставшиеся элементы.',
      'Возвращает false для пустого массива.',
      'Полезен для проверки наличия элементов с определенными свойствами.'
    ]
  },
  {
    name: 'every()',
    category: 'search',
    brief: 'Проверка, удовлетворяют ли все элементы условию',
    syntax: 'array.every(callback(element, index, array), thisArg?)',
    description: 'Проверяет, удовлетворяют ли все элементы массива предоставленной функции проверки.',
    example: `const numbers = [1, 2, 3, 4, 5];

// Проверка, все ли числа положительные
const allPositive = numbers.every(num => num > 0);
console.log(allPositive); // true

// Проверка, все ли числа меньше 4
const allSmall = numbers.every(num => num < 4);
console.log(allSmall); // false`,
    notes: [
      'Возвращает false, как только находит элемент, не удовлетворяющий условию, и не проверяет оставшиеся элементы.',
      'Возвращает true для пустого массива (вакуумная истина).',
      'Полезен для валидации, когда все элементы должны соответствовать критериям.'
    ]
  },
  {
    name: 'flat()',
    category: 'transform',
    brief: 'Создание нового массива со всеми элементами вложенных подмассивов',
    syntax: 'array.flat(depth?)',
    description: 'Создает новый массив со всеми элементами вложенных подмассивов, соединенными в него рекурсивно до указанной глубины.',
    example: `const nestedArray = [1, 2, [3, 4, [5, 6]]];

// Плоский массив с глубиной 1 (по умолчанию)
console.log(nestedArray.flat()); // [1, 2, 3, 4, [5, 6]]

// Плоский массив с глубиной 2
console.log(nestedArray.flat(2)); // [1, 2, 3, 4, 5, 6]

// Плоский массив с бесконечной глубиной
console.log(nestedArray.flat(Infinity)); // [1, 2, 3, 4, 5, 6]`,
    notes: [
      'Параметр depth указывает, насколько глубоко нужно рекурсивно объединять массивы. По умолчанию 1.',
      'Удаляет пустые слоты в массивах.',
      'Особенно полезен при работе с данными из API, которые могут иметь вложенную структуру.'
    ]
  },
  {
    name: 'flatMap()',
    category: 'transform',
    brief: 'Комбинация map() и flat() с глубиной 1',
    syntax: 'array.flatMap(callback(element, index, array), thisArg?)',
    description: 'Сначала применяет функцию к каждому элементу, а затем сглаживает результат в новый массив. Это немного более эффективно, чем вызов map() с последующим flat() с глубиной 1.',
    example: `const sentences = ["Hello world", "How are you"];

// Разбиваем предложения на слова и формируем плоский массив
const words = sentences.flatMap(sentence => sentence.split(' '));
console.log(words); // ["Hello", "world", "How", "are", "you"]

// Эквивалентно:
// sentences.map(sentence => sentence.split(' ')).flat();`,
    notes: [
      'Особенно полезен, когда функция отображения возвращает массивы, которые нужно объединить в один массив.',
      'Комбинирует map() и flat() в одной операции, что может быть более эффективно.',
      'Глубина сглаживания всегда равна 1, нельзя настроить.'
    ]
  },
  {
    name: 'sort()',
    category: 'sort',
    brief: 'Сортировка элементов массива',
    syntax: 'array.sort(compareFn?)',
    description: 'Сортирует элементы массива на месте и возвращает отсортированный массив. По умолчанию сортирует элементы как строки в порядке Unicode.',
    example: `// Сортировка строк
const fruits = ['banana', 'apple', 'orange', 'grape'];
fruits.sort();
console.log(fruits); // ['apple', 'banana', 'grape', 'orange']

// Сортировка чисел (нужна функция сравнения)
const numbers = [10, 5, 40, 25, 1];
numbers.sort((a, b) => a - b); // По возрастанию
console.log(numbers); // [1, 5, 10, 25, 40]

// Сортировка объектов по свойству
const users = [
  { name: 'Bob', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Charlie', age: 35 }
];
users.sort((a, b) => a.age - b.age);
console.log(users); // Сортировка по возрасту`,
    notes: [
      'Мутирует исходный массив! Для сохранения оригинала используйте [...array].sort().',
      'Без функции сравнения сортирует элементы как строки, что может дать неожиданные результаты для чисел.',
      'Функция сравнения должна возвращать отрицательное число, если a < b, положительное, если a > b, и 0, если они равны.'
    ]
  },
  {
    name: 'slice()',
    category: 'transform',
    brief: 'Извлечение части массива',
    syntax: 'array.slice(start?, end?)',
    description: 'Возвращает новый массив, содержащий копию части исходного массива. Не изменяет исходный массив.',
    example: `const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

// Извлечение элементов с индекса 1 до 3 (не включая 3)
console.log(fruits.slice(1, 3)); // ['banana', 'cherry']

// Извлечение всех элементов начиная с индекса 3
console.log(fruits.slice(3)); // ['date', 'elderberry']

// Извлечение последних 2 элементов
console.log(fruits.slice(-2)); // ['date', 'elderberry']`,
    notes: [
      'Не изменяет исходный массив, а возвращает новый.',
      'Если конечный индекс не указан, извлекает до конца массива.',
      'Поддерживает отрицательные индексы для отсчета с конца массива.',
      'Часто используется для создания копии массива: array.slice().'
    ]
  },
  {
    name: 'splice()',
    category: 'transform',
    brief: 'Изменение массива путем удаления или замены элементов',
    syntax: 'array.splice(start, deleteCount?, item1?, item2?, ...)',
    description: 'Изменяет содержимое массива, удаляя существующие элементы и/или добавляя новые. Возвращает массив удаленных элементов.',
    example: `const months = ['Jan', 'Feb', 'March', 'April', 'May'];

// Удаление 1 элемента с индекса 2
const removed = months.splice(2, 1);
console.log(months); // ['Jan', 'Feb', 'April', 'May']
console.log(removed); // ['March']

// Замена элементов
months.splice(1, 2, 'February', 'March', 'April');
console.log(months); // ['Jan', 'February', 'March', 'April', 'May']

// Вставка без удаления
months.splice(2, 0, 'New Month');
console.log(months); // ['Jan', 'February', 'New Month', 'March', 'April', 'May']`,
    notes: [
      'Мутирует исходный массив, изменяя его содержимое.',
      'Чрезвычайно гибкий метод: может удалять, заменять и вставлять элементы.',
      'Возвращает массив удаленных элементов, который может быть пустым, если ничего не удалено.',
      'Поддерживает отрицательные индексы для отсчета с конца массива.'
    ]
  },
  {
    name: 'join()',
    category: 'transform',
    brief: 'Объединение всех элементов массива в строку',
    syntax: 'array.join(separator?)',
    description: 'Объединяет все элементы массива в строку. Можно указать разделитель, который будет помещен между элементами.',
    example: `const elements = ['Fire', 'Air', 'Water'];

console.log(elements.join()); // 'Fire,Air,Water' (запятая по умолчанию)
console.log(elements.join('')); // 'FireAirWater'
console.log(elements.join('-')); // 'Fire-Air-Water'
console.log(elements.join(', ')); // 'Fire, Air, Water'`,
    notes: [
      'Если разделитель не указан, используется запятая.',
      'Автоматически преобразует все элементы в строки, включая undefined и null.',
      'Часто используется для форматирования данных в удобочитаемую строку.'
    ]
  }
];

// Отфильтрованные методы по категории
const filteredMethods = computed(() => {
  if (currentCategory.value === 'all') {
    return arrayMethods;
  }
  return arrayMethods.filter(method => method.category === currentCategory.value);
});

// Переключение отображения деталей метода
function toggleMethod(methodName) {
  const index = expandedMethods.value.indexOf(methodName);
  if (index !== -1) {
    expandedMethods.value.splice(index, 1);
  } else {
    expandedMethods.value.push(methodName);
  }
}

// Паттерны работы с массивами
const arrayPatterns = [
  {
    id: 'remove-duplicates',
    title: 'Удаление дубликатов из массива',
    description: 'Несколько способов удаления повторяющихся элементов из массива. Самый современный и эффективный — использование объекта Set.',
    code: `// Способ 1: Set (самый быстрый и современный)
function removeDuplicates(array) {
  return [...new Set(array)];
}

// Способ 2: filter
function removeDuplicatesFilter(array) {
  return array.filter((item, index) => array.indexOf(item) === index);
}

// Способ 3: reduce
function removeDuplicatesReduce(array) {
  return array.reduce((unique, item) => 
    unique.includes(item) ? unique : [...unique, item], []);
}`,
    useCases: [
      'Очистка данных перед обработкой',
      'Подсчет уникальных элементов',
      'Удаление повторяющихся записей из списков'
    ]
  },
  {
    id: 'array-grouping',
    title: 'Группировка элементов массива по свойству',
    description: 'Группировка массива объектов по определенному свойству или критерию. Создает объект, где ключами являются значения свойств, а значениями — массивы соответствующих элементов.',
    code: `// Группировка с помощью reduce
function groupBy(array, key) {
  return array.reduce((result, item) => {
    // Получаем значение ключа группировки
    const groupKey = item[key];
    
    // Создаем группу, если её еще нет
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    
    // Добавляем элемент в группу
    result[groupKey].push(item);
    
    return result;
  }, {});
}

// Пример использования
const users = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
  { id: 3, name: 'Charlie', role: 'admin' },
  { id: 4, name: 'Dave', role: 'user' }
];

const groupedByRole = groupBy(users, 'role');
console.log(groupedByRole);
// Результат:
// {
//   admin: [
//     { id: 1, name: 'Alice', role: 'admin' },
//     { id: 3, name: 'Charlie', role: 'admin' }
//   ],
//   user: [
//     { id: 2, name: 'Bob', role: 'user' },
//     { id: 4, name: 'Dave', role: 'user' }
//   ]
// }`,
    useCases: [
      'Организация данных для отображения в UI',
      'Анализ данных по категориям',
      'Подготовка данных для отчетов',
      'Обработка результатов API-запросов'
    ]
  },
  {
    id: 'array-intersection',
    title: 'Пересечение массивов',
    description: 'Находит общие элементы между двумя или более массивами. Полезно при сравнении наборов данных или поиске совпадений.',
    code: `// Пересечение двух массивов
function intersection(array1, array2) {
  return array1.filter(item => array2.includes(item));
}

// Пересечение массивов с использованием Set (более эффективно)
function intersectionWithSets(array1, array2) {
  const set2 = new Set(array2);
  return [...new Set(array1)].filter(item => set2.has(item));
}

// Пересечение нескольких массивов
function multiIntersection(...arrays) {
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return [...new Set(arrays[0])];
  
  return arrays.reduce((result, array) => 
    result.filter(item => array.includes(item))
  );
}`,
    useCases: [
      'Сравнение списков элементов',
      'Поиск общих интересов или свойств',
      'Фильтрация данных на основе нескольких критериев',
      'Нахождение совпадающих записей в разных наборах данных'
    ]
  },
  {
    id: 'chunking',
    title: 'Разделение массива на чанки',
    description: 'Разбивает большой массив на подмассивы фиксированного размера. Полезно для пагинации, пакетной обработки или отображения данных по частям.',
    code: `// Разделение массива на чанки указанного размера
function chunkArray(array, size) {
  const chunks = [];
  
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  
  return chunks;
}

// Альтернативная версия с reduce
function chunkArrayReduce(array, size) {
  return array.reduce((chunks, item, index) => {
    const chunkIndex = Math.floor(index / size);
    
    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = [];
    }
    
    chunks[chunkIndex].push(item);
    return chunks;
  }, []);
}

// Пример использования
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chunked = chunkArray(numbers, 3);
console.log(chunked);
// Результат: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]`,
    useCases: [
      'Пагинация данных',
      'Отправка данных пакетами через API',
      'Разделение задач для параллельной обработки',
      'Создание матриц или сеток из одномерных массивов'
    ]
  },
  {
    id: 'array-shuffle',
    title: 'Перемешивание элементов массива',
    description: 'Алгоритм Fisher-Yates для случайного перемешивания элементов массива. Полезно для создания случайного порядка или для игр.',
    code: `// Алгоритм Fisher-Yates для перемешивания массива
function shuffleArray(array) {
  // Создаем копию исходного массива
  const shuffled = [...array];
  
  // Перемешиваем элементы
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Выбираем случайный индекс от 0 до i
    const j = Math.floor(Math.random() * (i + 1));
    
    // Меняем местами элементы i и j
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

// Пример использования
const cards = ['A♠', '2♠', '3♠', '4♠', '5♠', '6♠', '7♠', '8♠', '9♠', '10♠', 'J♠', 'Q♠', 'K♠'];
const shuffledDeck = shuffleArray(cards);
console.log(shuffledDeck);
// Результат: случайно перемешанный массив`,
    useCases: [
      'Игры с картами или другими элементами',
      'Рандомизация порядка элементов в UI',
      'Случайный выбор вопросов в тестах',
      'Создание случайной выборки из массива данных'
    ]
  },
  {
    id: 'memoization',
    title: 'Мемоизация результатов функции',
    description: 'Кеширование результатов функции для повторных вызовов с теми же аргументами. Использует массивы и объекты для хранения результатов.',
    code: `// Функция для мемоизации других функций
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    // Создаем ключ на основе аргументов
    const key = JSON.stringify(args);
    
    // Проверяем, есть ли результат в кеше
    if (key in cache) {
      console.log('Возвращаем из кеша:', key);
      return cache[key];
    }
    
    // Вычисляем результат
    const result = fn(...args);
    
    // Сохраняем в кеше
    cache[key] = result;
    
    return result;
  };
}

// Пример использования с дорогостоящей функцией
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Мемоизированная версия
const memoFibonacci = memoize(function(n) {
  if (n <= 1) return n;
  return memoFibonacci(n - 1) + memoFibonacci(n - 2);
});

console.time('Regular');
console.log(fibonacci(35)); // Очень медленно
console.timeEnd('Regular');

console.time('Memoized');
console.log(memoFibonacci(35)); // Намного быстрее
console.timeEnd('Memoized');`,
    useCases: [
      'Оптимизация рекурсивных функций',
      'Кеширование результатов дорогостоящих вычислений',
      'API-запросы с одинаковыми параметрами',
      'Динамическое программирование'
    ]
  }
];

// Переключение отображения паттерна
const expandedPatterns = ref([]);

function togglePattern(patternId) {
  const index = expandedPatterns.value.indexOf(patternId);
  if (index !== -1) {
    expandedPatterns.value.splice(index, 1);
  } else {
    expandedPatterns.value.push(patternId);
  }
}
</script>

<style scoped>
.arrays-workshop {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

h1, h2, h3, h4 {
  color: #2c3e50;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.difficulty-selector {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
}

.difficulty-selector button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.difficulty-selector button:hover {
  background: #e5e5e5;
}

.difficulty-selector button.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.task-container {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 40px;
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.task-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.task-header h2 {
  margin: 0;
  flex: 1;
}

.level-badge {
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
  background: #95a5a6;
}

.tasks-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

.task-item {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  background: #f9f9f9;
}

.task-item:hover {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.task-item.active {
  border-color: #3498db;
  background: #ebf5fb;
}

.task-title {
  font-weight: bold;
  margin-bottom: 8px;
}

.task-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  padding: 3px 6px;
  background: #e1f5fe;
  color: #0277bd;
  border-radius: 3px;
  font-size: 0.75rem;
}

.task-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.task-description {
  line-height: 1.5;
}

.task-example {
  margin-top: 15px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
  font-family: monospace;
}

.code-playground {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.code-editor {
  flex: 1;
}

.code-editor textarea {
  width: 100%;
  height: 200px;
  padding: 10px;
  font-family: monospace;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

.test-controls {
  display: flex;
  gap: 10px;
}

.test-controls button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: bold;
}

.run-button {
  background: #2ecc71;
  color: white;
}

.hint-button {
  background: #f39c12;
  color: white;
}

.solution-button {
  background: #e74c3c;
  color: white;
}

.test-controls button:hover {
  opacity: 0.9;
}

.test-controls button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.results {
  margin-top: 20px;
}

.test-result {
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.test-result.passed {
  background: #d5f5e3;
  border-left: 4px solid #2ecc71;
}

.test-result.failed {
  background: #fadbd8;
  border-left: 4px solid #e74c3c;
}

.result-status {
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 15px;
}

.test-result.passed .result-status {
  color: #27ae60;
}

.test-result.failed .result-status {
  color: #c0392b;
}

.result-details {
  flex: 1;
}

.test-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.test-info {
  font-size: 0.9rem;
  font-family: monospace;
}

.expected {
  color: #2980b9;
}

.actual {
  color: #c0392b;
}

.hint-panel, .solution-panel {
  padding: 20px;
  margin: 20px 0;
  border-radius: 6px;
  background: #f9f9f9;
  border-left: 4px solid #3498db;
}

.hint-panel {
  border-left-color: #f39c12;
}

.solution-panel {
  border-left-color: #2ecc71;
}

.solution-panel pre {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 4px;
  overflow: auto;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.4;
  margin: 10px 0;
}

.solution-explanation {
  margin-top: 15px;
}

.array-methods-guide, .patterns-showcase {
  margin-top: 40px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.methods-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.method-category {
  padding: 8px 15px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.method-category:hover {
  background: #e5e5e5;
}

.method-category.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.methods-list, .patterns-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.method-item, .pattern-item {
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}

.method-header, .pattern-header {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  padding: 15px;
  background: #f5f5f5;
  cursor: pointer;
  transition: all 0.3s;
}

.method-header:hover, .pattern-header:hover {
  background: #e5e5e5;
}

.pattern-header {
  grid-template-columns: 1fr auto;
}

.method-name {
  font-weight: bold;
  color: #2980b9;
}

.method-brief {
  font-size: 0.9rem;
  color: #555;
}

.method-toggle, .pattern-toggle {
  font-size: 1.2rem;
  font-weight: bold;
  color: #777;
}

.method-details, .pattern-content {
  padding: 20px;
  border-top: 1px solid #ddd;
  background: #fff;
}

.method-syntax {
  margin-bottom: 15px;
}

.method-syntax pre, .method-example pre, .pattern-code pre {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 4px;
  overflow: auto;
  font-family: monospace;
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 10px 0;
}

.method-notes ul, .pattern-use-cases ul {
  padding-left: 20px;
  line-height: 1.5;
}

.method-notes li, .pattern-use-cases li {
  margin-bottom: 5px;
}

.pattern-title {
  font-weight: bold;
  font-size: 1.1rem;
}

.comparison-table {
  overflow-x: auto;
  margin-bottom: 30px;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th, .comparison-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.comparison-table th {
  background: #f5f5f5;
  font-weight: bold;
}

.comparison-table tr:nth-child(even) {
  background: #f9f9f9;
}

@media (max-width: 768px) {
  .task-content {
    grid-template-columns: 1fr;
  }
  
  .method-header {
    grid-template-columns: 100px 1fr auto;
  }
}

@media (max-width: 480px) {
  .difficulty-selector {
    flex-wrap: wrap;
  }
  
  .method-header {
    grid-template-columns: 1fr auto;
  }
  
  .method-brief {
    display: none;
  }
}
</style>