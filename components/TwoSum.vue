<template>
    <div class="two-sum-container">
      <h1>Задача "Two Sum": поиск пары чисел с заданной суммой</h1>
      
      <div class="problem-description">
        <h2>Описание задачи</h2>
        <p>Дан массив чисел <code>nums</code> и число <code>target</code>. Необходимо найти два элемента массива, сумма которых равна <code>target</code>, и вернуть их индексы.</p>
        <p>Гарантируется, что для каждого входного набора существует ровно одно решение, и один и тот же элемент нельзя использовать дважды.</p>
        
        <div class="example">
          <h3>Пример:</h3>
          <pre><code>Дано: nums = [1, 16, 34, 76], target = 77
  Ответ: [0, 3]
  Объяснение: Сумма чисел nums[0] + nums[3] == 77, в ответе мы возвращаем их индексы: [0, 3].</code></pre>
        </div>
      </div>
  
      <!-- Вкладки с решениями -->
      <div class="solution-tabs">
        <div 
          v-for="(tab, index) in tabs" 
          :key="tab.id"
          class="tab" 
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
        >
          {{ tab.title }}
        </div>
      </div>
  
      <!-- Грубая сила - решение 1 -->
      <div v-if="activeTab === 0" class="solution-content">
        <h2>Решение 1: Метод грубой силы (Brute Force)</h2>
        
        <div class="approach-description">
          <p>Самый простой подход - перебрать все возможные пары чисел в массиве и найти ту, где сумма равна целевому значению.</p>
          <p>Для этого используем два вложенных цикла.</p>
        </div>
        
        <div class="code-block">
          <h3>Реализация</h3>
          <pre><code>function twoSum(nums, target) {
    const n = nums.length;
    
    // Перебираем первое число
    for (let i = 0; i &lt; n; i++) {
      // Перебираем второе число (начиная с i+1, чтобы не повторять пары)
      for (let j = i + 1; j &lt; n; j++) {
        // Проверяем, равна ли сумма целевому значению
        if (nums[i] + nums[j] === target) {
          return [i, j]; // Возвращаем индексы найденной пары
        }
      }
    }
    
    // Если пара не найдена (хотя по условию она должна быть)
    return null;
  }</code></pre>
        </div>
        
        <div class="complexity">
          <h3>Сложность</h3>
          <p><strong>Временная сложность:</strong> O(n²) - мы используем два вложенных цикла, перебирая все возможные пары.</p>
          <p><strong>Пространственная сложность:</strong> O(1) - используем фиксированное количество переменных, не зависящее от размера входных данных.</p>
        </div>
        
        <div class="visualization">
          <h3>Визуализация алгоритма</h3>
          <div class="array-container">
            <div class="array-label">Массив:</div>
            <div class="array-items">
              <div 
                v-for="(num, idx) in visualData.array" 
                :key="idx" 
                class="array-item"
                :class="{
                  'current-i': visualData.currentI === idx,
                  'current-j': visualData.currentJ === idx,
                  'found': (visualData.foundIndices && visualData.foundIndices.includes(idx))
                }"
              >
                <div class="array-value">{{ num }}</div>
                <div class="array-index">{{ idx }}</div>
              </div>
            </div>
          </div>
          
          <div class="visualization-controls">
            <div class="target-sum">Целевая сумма: <strong>{{ visualData.target }}</strong></div>
            <div class="status-message">{{ visualData.statusMessage }}</div>
            <div class="buttons">
              <button @click="resetVisualization(0)" class="control-button">Сбросить</button>
              <button @click="stepBruteForce" class="control-button" :disabled="visualData.finished">Следующий шаг</button>
              <button @click="runBruteForce" class="control-button" :disabled="visualData.finished">Запустить</button>
            </div>
          </div>
        </div>
        
        <div class="pros-cons">
          <h3>Преимущества и недостатки</h3>
          <div class="pros">
            <h4>Преимущества</h4>
            <ul>
              <li>Простота реализации</li>
              <li>Не требует дополнительной памяти</li>
              <li>Хорошо работает на очень маленьких массивах</li>
            </ul>
          </div>
          <div class="cons">
            <h4>Недостатки</h4>
            <ul>
              <li>Очень низкая эффективность на больших массивах</li>
              <li>Квадратичная временная сложность (O(n²))</li>
            </ul>
          </div>
        </div>
      </div>
  
      <!-- Хеш-таблица - решение 2 -->
      <div v-if="activeTab === 1" class="solution-content">
        <h2>Решение 2: Использование хеш-таблицы</h2>
        
        <div class="approach-description">
          <p>Вместо перебора всех пар можно использовать хеш-таблицу (объект или Map в JavaScript) для сохранения уже просмотренных чисел и быстрого поиска дополнения.</p>
          <p><strong>Ключевая идея:</strong> Если нам нужно найти два числа a и b, сумма которых равна target, то b = target - a.</p>
        </div>
        
        <div class="code-block">
          <h3>Реализация</h3>
          <pre><code>function twoSum(nums, target) {
    const numMap = new Map(); // Хеш-таблица для хранения {число: индекс}
    
    for (let i = 0; i &lt; nums.length; i++) {
      // Находим дополнение текущего числа до target
      const complement = target - nums[i];
      
      // Проверяем, есть ли такое дополнение уже в хеш-таблице
      if (numMap.has(complement)) {
        // Если есть, возвращаем индексы найденной пары
        return [numMap.get(complement), i];
      }
      
      // Добавляем текущее число и его индекс в хеш-таблицу
      numMap.set(nums[i], i);
    }
    
    // Если пара не найдена (хотя по условию она должна быть)
    return null;
  }</code></pre>
        </div>
        
        <div class="complexity">
          <h3>Сложность</h3>
          <p><strong>Временная сложность:</strong> O(n) - мы проходим по массиву всего один раз.</p>
          <p><strong>Пространственная сложность:</strong> O(n) - в худшем случае мы сохраним в хеш-таблице все n элементов массива.</p>
        </div>
        
        <div class="visualization">
          <h3>Визуализация алгоритма</h3>
          <div class="array-container">
            <div class="array-label">Массив:</div>
            <div class="array-items">
              <div 
                v-for="(num, idx) in visualData.array" 
                :key="idx" 
                class="array-item"
                :class="{
                  'current-i': visualData.currentI === idx,
                  'found': (visualData.foundIndices && visualData.foundIndices.includes(idx))
                }"
              >
                <div class="array-value">{{ num }}</div>
                <div class="array-index">{{ idx }}</div>
              </div>
            </div>
          </div>
          
          <div class="hash-table-container">
            <div class="hash-table-label">Хеш-таблица:</div>
            <div class="hash-table">
              <div 
                v-for="(entry, index) in visualData.hashTable" 
                :key="index" 
                class="hash-entry"
                :class="{ 'highlighted': entry.highlighted }"
              >
                <span class="hash-key">{{ entry.key }}</span>
                <span class="hash-arrow">→</span>
                <span class="hash-value">{{ entry.value }}</span>
              </div>
            </div>
          </div>
          
          <div class="visualization-controls">
            <div class="target-sum">Целевая сумма: <strong>{{ visualData.target }}</strong></div>
            <div class="status-message">{{ visualData.statusMessage }}</div>
            <div class="buttons">
              <button @click="resetVisualization(1)" class="control-button">Сбросить</button>
              <button @click="stepHashTable" class="control-button" :disabled="visualData.finished">Следующий шаг</button>
              <button @click="runHashTable" class="control-button" :disabled="visualData.finished">Запустить</button>
            </div>
          </div>
        </div>
        
        <div class="pros-cons">
          <h3>Преимущества и недостатки</h3>
          <div class="pros">
            <h4>Преимущества</h4>
            <ul>
              <li>Высокая эффективность - линейная временная сложность O(n)</li>
              <li>Проходит по массиву всего один раз</li>
              <li>Работает хорошо даже на больших массивах</li>
            </ul>
          </div>
          <div class="cons">
            <h4>Недостатки</h4>
            <ul>
              <li>Требует дополнительной памяти O(n) для хеш-таблицы</li>
              <li>Немного сложнее в понимании, чем метод грубой силы</li>
            </ul>
          </div>
        </div>
      </div>
  
      <!-- Двоичный поиск - решение 3 -->
      <div v-if="activeTab === 2" class="solution-content">
        <h2>Решение 3: Метод двух указателей (для отсортированного массива)</h2>
        
        <div class="approach-description">
          <p>Если массив отсортирован (или мы можем его отсортировать), можно использовать метод двух указателей.</p>
          <p><strong>Ключевая идея:</strong> Используем два указателя - один в начале массива, другой в конце, и двигаем их навстречу друг другу в зависимости от текущей суммы элементов.</p>
          <p>Примечание: этот метод возвращает индексы в отсортированном массиве, что может отличаться от исходных индексов. Для сохранения исходных индексов потребуется дополнительный шаг.</p>
        </div>
        
        <div class="code-block">
          <h3>Реализация</h3>
          <pre><code>function twoSum(nums, target) {
    // Создаем копию массива с сохранением исходных индексов
    const numWithIndices = nums.map((num, idx) => ({ num, idx }));
    
    // Сортируем массив по значениям
    numWithIndices.sort((a, b) => a.num - b.num);
    
    let left = 0;
    let right = numWithIndices.length - 1;
    
    while (left &lt; right) {
      const sum = numWithIndices[left].num + numWithIndices[right].num;
      
      if (sum === target) {
        // Возвращаем исходные индексы
        return [numWithIndices[left].idx, numWithIndices[right].idx];
      } else if (sum &lt; target) {
        // Если сумма меньше target, увеличиваем левый указатель
        left++;
      } else {
        // Если сумма больше target, уменьшаем правый указатель
        right--;
      }
    }
    
    // Если пара не найдена (хотя по условию она должна быть)
    return null;
  }</code></pre>
        </div>
        
        <div class="complexity">
          <h3>Сложность</h3>
          <p><strong>Временная сложность:</strong> O(n log n) - ограничена сортировкой массива.</p>
          <p><strong>Пространственная сложность:</strong> O(n) - для хранения массива с индексами.</p>
        </div>
        
        <div class="visualization">
          <h3>Визуализация алгоритма</h3>
          <div class="array-container">
            <div class="array-label">Отсортированный массив:</div>
            <div class="array-items">
              <div 
                v-for="(item, idx) in visualData.sortedArray" 
                :key="idx" 
                class="array-item"
                :class="{
                  'current-i': visualData.leftPointer === idx,
                  'current-j': visualData.rightPointer === idx,
                  'found': (visualData.foundSortedIndices && visualData.foundSortedIndices.includes(idx))
                }"
              >
                <div class="array-value">{{ item.num }}</div>
                <div class="array-index">{{ item.idx }}</div>
              </div>
            </div>
          </div>
          
          <div class="pointers-container">
            <div class="pointer left" :style="{ left: visualData.leftPointerPosition + '%' }">
              <div class="pointer-arrow">↑</div>
              <div class="pointer-name">Left</div>
            </div>
            <div class="pointer right" :style="{ left: visualData.rightPointerPosition + '%' }">
              <div class="pointer-arrow">↑</div>
              <div class="pointer-name">Right</div>
            </div>
          </div>
          
          <div class="visualization-controls">
            <div class="target-sum">Целевая сумма: <strong>{{ visualData.target }}</strong></div>
            <div class="status-message">{{ visualData.statusMessage }}</div>
            <div class="buttons">
              <button @click="resetVisualization(2)" class="control-button">Сбросить</button>
              <button @click="stepTwoPointers" class="control-button" :disabled="visualData.finished">Следующий шаг</button>
              <button @click="runTwoPointers" class="control-button" :disabled="visualData.finished">Запустить</button>
            </div>
          </div>
        </div>
        
        <div class="pros-cons">
          <h3>Преимущества и недостатки</h3>
          <div class="pros">
            <h4>Преимущества</h4>
            <ul>
              <li>Хорошая эффективность - O(n log n)</li>
              <li>Не требует хеш-таблицы</li>
              <li>Особенно эффективен, если массив уже отсортирован</li>
            </ul>
          </div>
          <div class="cons">
            <h4>Недостатки</h4>
            <ul>
              <li>Требует сортировки массива (если он не отсортирован)</li>
              <li>Необходимо отдельно отслеживать исходные индексы</li>
              <li>Менее эффективен, чем хеш-таблица, если массив не отсортирован</li>
            </ul>
          </div>
        </div>
      </div>
  
      <!-- Сравнение подходов -->
      <div v-if="activeTab === 3" class="solution-content">
        <h2>Сравнение подходов и выбор оптимального решения</h2>
        
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Подход</th>
                <th>Временная сложность</th>
                <th>Пространственная сложность</th>
                <th>Когда использовать</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Метод грубой силы</td>
                <td>O(n²)</td>
                <td>O(1)</td>
                <td>Для очень маленьких массивов или когда память критически ограничена</td>
              </tr>
              <tr>
                <td>Хеш-таблица</td>
                <td>O(n)</td>
                <td>O(n)</td>
                <td>Оптимальное решение для большинства случаев</td>
              </tr>
              <tr>
                <td>Метод двух указателей</td>
                <td>O(n log n)</td>
                <td>O(n)</td>
                <td>Когда массив уже отсортирован или сортировка не является проблемой</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="conclusion">
          <h3>Выбор оптимального решения</h3>
          <p>В большинстве случаев <strong>подход с хеш-таблицей</strong> является оптимальным решением для задачи Two Sum:</p>
          <ul>
            <li>Линейная временная сложность O(n)</li>
            <li>Однопроходный алгоритм (всего один цикл)</li>
            <li>Нет необходимости менять исходный массив</li>
            <li>Работает независимо от порядка элементов в массиве</li>
          </ul>
          <p>Однако есть случаи, когда другие подходы могут быть предпочтительнее:</p>
          <ul>
            <li><strong>Если массив очень маленький</strong> (менее 10 элементов) - метод грубой силы может быть проще и достаточно эффективен.</li>
            <li><strong>Если массив уже отсортирован</strong> - метод двух указателей может быть предпочтительнее, так как он не требует дополнительной памяти для хеш-таблицы.</li>
            <li><strong>Если память критически ограничена</strong> - метод грубой силы использует минимум памяти.</li>
          </ul>
        </div>
        
        <div class="common-pitfalls">
          <h3>Подводные камни и особенности</h3>
          <ol>
            <li>
              <strong>Дубликаты в массиве</strong>: Алгоритм с хеш-таблицей корректно обрабатывает дубликаты, так как проверяет наличие дополнения до добавления текущего элемента в хеш-таблицу.
            </li>
            <li>
              <strong>Порядок индексов в ответе</strong>: В зависимости от требований задачи, может потребоваться возвращать индексы в определенном порядке (например, по возрастанию).
            </li>
            <li>
              <strong>Отрицательные числа и нули</strong>: Все рассмотренные алгоритмы корректно работают с отрицательными числами и нулями.
            </li>
            <li>
              <strong>Несуществующее решение</strong>: По условию задачи гарантируется существование решения. Если это не гарантировано, алгоритм должен корректно обрабатывать случай отсутствия решения.
            </li>
            <li>
              <strong>Один элемент нельзя использовать дважды</strong>: Все рассмотренные алгоритмы обеспечивают это ограничение. В методе грубой силы мы начинаем второй цикл с i+1, в хеш-таблице проверяем дополнение перед добавлением текущего элемента.
            </li>
          </ol>
        </div>
        
        <div class="related-problems">
          <h3>Связанные задачи</h3>
          <ul>
            <li><strong>Three Sum</strong>: Найти три числа, дающие в сумме заданное значение.</li>
            <li><strong>Four Sum</strong>: Найти четыре числа, дающие в сумме заданное значение.</li>
            <li><strong>Two Sum II</strong>: Вариант задачи для отсортированного массива.</li>
            <li><strong>Two Sum - Data Structure</strong>: Разработать структуру данных, оптимизированную для поиска пар с заданной суммой.</li>
          </ul>
        </div>
      </div>
  
      <!-- Секция кода -->
      <div class="final-code-section">
        <h2>Итоговое решение</h2>
        <div class="code-block">
          <pre><code>/**
   * @param {number[]} nums - Массив чисел
   * @param {number} target - Целевая сумма
   * @return {number[]} - Индексы двух чисел, дающих в сумме target
   */
  function twoSum(nums, target) {
    const numMap = new Map(); // Хеш-таблица для хранения {число: индекс}
    
    for (let i = 0; i &lt; nums.length; i++) {
      // Находим дополнение текущего числа до target
      const complement = target - nums[i];
      
      // Проверяем, есть ли такое дополнение уже в хеш-таблице
      if (numMap.has(complement)) {
        // Если есть, возвращаем индексы найденной пары
        return [numMap.get(complement), i];
      }
      
      // Добавляем текущее число и его индекс в хеш-таблицу
      numMap.set(nums[i], i);
    }
    
    // Если пара не найдена (хотя по условию она должна быть)
    return null;
  }
  
  // Примеры
  console.log(twoSum([2, 7, 11, 15], 9)); // Output: [0, 1]
  console.log(twoSum([3, 2, 4], 6));      // Output: [1, 2]
  console.log(twoSum([3, 3], 6));         // Output: [0, 1]</code></pre>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tabs: [
          { id: 'brute-force', title: 'Метод грубой силы' },
          { id: 'hash-table', title: 'Хеш-таблица' },
          { id: 'two-pointers', title: 'Метод двух указателей' },
          { id: 'comparison', title: 'Сравнение подходов' }
        ],
        activeTab: 1, // По умолчанию показываем хеш-таблицу как оптимальный метод
        visualData: {
          array: [2, 7, 11, 15],
          target: 9,
          currentI: null,
          currentJ: null,
          foundIndices: null,
          statusMessage: 'Нажмите "Следующий шаг" или "Запустить" для начала визуализации',
          finished: false,
          // Для хеш-таблицы
          hashTable: [],
          // Для метода двух указателей
          sortedArray: [],
          leftPointer: null,
          rightPointer: null,
          leftPointerPosition: 0,
          rightPointerPosition: 100,
          foundSortedIndices: null
        },
        animationSpeed: 1000, // Скорость анимации в мс
        animationTimers: []
      };
    },
    methods: {
      // Сброс визуализации
      resetVisualization(tabIndex) {
        // Очищаем все таймеры
        this.animationTimers.forEach(timer => clearTimeout(timer));
        this.animationTimers = [];
        
        // Сбрасываем общие данные
        this.visualData.currentI = null;
        this.visualData.currentJ = null;
        this.visualData.foundIndices = null;
        this.visualData.statusMessage = 'Нажмите "Следующий шаг" или "Запустить" для начала визуализации';
        this.visualData.finished = false;
        
        // В зависимости от вкладки инициализируем специфичные данные
        if (tabIndex === 0) {
          // Для метода грубой силы
          this.visualData.array = [2, 7, 11, 15];
          this.visualData.target = 9;
        } 
        else if (tabIndex === 1) {
          // Для хеш-таблицы
          this.visualData.array = [2, 7, 11, 15];
          this.visualData.target = 9;
          this.visualData.hashTable = [];
        }
        else if (tabIndex === 2) {
          // Для метода двух указателей
          this.visualData.array = [2, 7, 11, 15];
          this.visualData.target = 9;
          // Подготавливаем отсортированный массив с исходными индексами
          this.visualData.sortedArray = this.visualData.array.map((num, idx) => ({ num, idx }));
          this.visualData.sortedArray.sort((a, b) => a.num - b.num);
          this.visualData.leftPointer = null;
          this.visualData.rightPointer = null;
          this.visualData.leftPointerPosition = 0;
          this.visualData.rightPointerPosition = 100;
          this.visualData.foundSortedIndices = null;
        }
      },
      
      // Методы для визуализации метода грубой силы
      stepBruteForce() {
        const n = this.visualData.array.length;
        
        // Если метод еще не начинался или закончился, начинаем сначала
        if (this.visualData.currentI === null || this.visualData.finished) {
          this.visualData.currentI = 0;
          this.visualData.currentJ = 1;
          this.visualData.statusMessage = `Проверяем пару (${this.visualData.array[0]}, ${this.visualData.array[1]})`;
          return;
        }
        
        // Проверяем текущую пару
        const i = this.visualData.currentI;
        const j = this.visualData.currentJ;
        const sum = this.visualData.array[i] + this.visualData.array[j];
        
        if (sum === this.visualData.target) {
          // Нашли решение
          this.visualData.foundIndices = [i, j];
          this.visualData.statusMessage = `Решение найдено! Пара (${this.visualData.array[i]}, ${this.visualData.array[j]}) дает сумму ${this.visualData.target}. Возвращаем индексы [${i}, ${j}]`;
          this.visualData.finished = true;
          return;
        }
        
        // Не нашли решение для текущей пары, переходим к следующей
        this.visualData.statusMessage = `Пара (${this.visualData.array[i]}, ${this.visualData.array[j]}) дает сумму ${sum} ≠ ${this.visualData.target}. Проверяем следующую пару.`;
        
        // Обновляем индексы
        if (j < n - 1) {
          // Еще есть элементы для второго указателя
          this.visualData.currentJ = j + 1;
        } else {
          // Переходим к следующему первому элементу
          this.visualData.currentI = i + 1;
          
          if (i + 1 >= n - 1) {
            // Перебрали все пары и не нашли решение
            this.visualData.statusMessage = 'Перебрали все пары, но решение не найдено.';
            this.visualData.finished = true;
          } else {
            this.visualData.currentJ = i + 2;
          }
        }
      },
      
      runBruteForce() {
        this.resetVisualization(0);
        
        const runStep = () => {
          if (this.visualData.finished) return;
          
          this.stepBruteForce();
          
          if (!this.visualData.finished) {
            const timer = setTimeout(runStep, this.animationSpeed);
            this.animationTimers.push(timer);
          }
        };
        
        runStep();
      },
      
      // Методы для визуализации подхода с хеш-таблицей
      stepHashTable() {
        // Если метод еще не начинался или закончился, начинаем сначала
        if (this.visualData.currentI === null || this.visualData.finished) {
          this.visualData.currentI = 0;
          this.visualData.hashTable = [];
          this.visualData.statusMessage = `Начинаем с пустой хеш-таблицы и рассматриваем элемент [${this.visualData.currentI}] = ${this.visualData.array[this.visualData.currentI]}`;
          return;
        }
        
        const i = this.visualData.currentI;
        const currentNum = this.visualData.array[i];
        const complement = this.visualData.target - currentNum;
        
        // Сбрасываем подсветку для всех записей в хеш-таблице
        this.visualData.hashTable.forEach(entry => entry.highlighted = false);
        
        // Проверяем, есть ли дополнение в хеш-таблице
        const complementEntry = this.visualData.hashTable.find(entry => entry.key === complement);
        
        if (complementEntry) {
          // Нашли решение
          complementEntry.highlighted = true;
          this.visualData.foundIndices = [complementEntry.value, i];
          this.visualData.statusMessage = `Нашли дополнение ${complement} в хеш-таблице с индексом ${complementEntry.value}. Возвращаем индексы [${complementEntry.value}, ${i}]`;
          this.visualData.finished = true;
          return;
        }
        
        // Дополнение не найдено, добавляем текущий элемент в хеш-таблицу
        this.visualData.hashTable.push({
          key: currentNum,
          value: i,
          highlighted: true
        });
        
        this.visualData.statusMessage = `Дополнение ${complement} не найдено в хеш-таблице. Добавляем текущий элемент ${currentNum} с индексом ${i} в хеш-таблицу.`;
        
        // Переходим к следующему элементу
        this.visualData.currentI = i + 1;
        
        if (i + 1 >= this.visualData.array.length) {
          // Прошли весь массив и не нашли решение
          this.visualData.statusMessage = 'Прошли весь массив, но решение не найдено.';
          this.visualData.finished = true;
        }
      },
      
      runHashTable() {
        this.resetVisualization(1);
        
        const runStep = () => {
          if (this.visualData.finished) return;
          
          this.stepHashTable();
          
          if (!this.visualData.finished) {
            const timer = setTimeout(runStep, this.animationSpeed);
            this.animationTimers.push(timer);
          }
        };
        
        runStep();
      },
      
      // Методы для визуализации метода двух указателей
      stepTwoPointers() {
        // Если метод еще не начинался или закончился, начинаем сначала
        if (this.visualData.leftPointer === null || this.visualData.finished) {
          this.visualData.leftPointer = 0;
          this.visualData.rightPointer = this.visualData.sortedArray.length - 1;
          this.updatePointerPositions();
          this.visualData.statusMessage = `Инициализируем левый указатель на индекс 0, правый на индекс ${this.visualData.sortedArray.length - 1}`;
          return;
        }
        
        const left = this.visualData.leftPointer;
        const right = this.visualData.rightPointer;
        
        if (left >= right) {
          // Указатели встретились, но решение не найдено
          this.visualData.statusMessage = 'Указатели встретились, решение не найдено.';
          this.visualData.finished = true;
          return;
        }
        
        const leftNum = this.visualData.sortedArray[left].num;
        const rightNum = this.visualData.sortedArray[right].num;
        const sum = leftNum + rightNum;
        
        if (sum === this.visualData.target) {
          // Нашли решение
          this.visualData.foundSortedIndices = [left, right];
          const originalLeftIndex = this.visualData.sortedArray[left].idx;
          const originalRightIndex = this.visualData.sortedArray[right].idx;
          this.visualData.foundIndices = [originalLeftIndex, originalRightIndex];
          this.visualData.statusMessage = `Решение найдено! Пара (${leftNum}, ${rightNum}) дает сумму ${this.visualData.target}. Возвращаем оригинальные индексы [${originalLeftIndex}, ${originalRightIndex}]`;
          this.visualData.finished = true;
          return;
        } else if (sum < this.visualData.target) {
          // Сумма меньше target, увеличиваем левый указатель
          this.visualData.statusMessage = `Сумма ${sum} < ${this.visualData.target}, увеличиваем левый указатель`;
          this.visualData.leftPointer = left + 1;
        } else {
          // Сумма больше target, уменьшаем правый указатель
          this.visualData.statusMessage = `Сумма ${sum} > ${this.visualData.target}, уменьшаем правый указатель`;
          this.visualData.rightPointer = right - 1;
        }
        
        this.updatePointerPositions();
      },
      
      updatePointerPositions() {
        const arrayLength = this.visualData.sortedArray.length;
        if (arrayLength <= 1) return;
        
        const step = 100 / (arrayLength - 1);
        
        if (this.visualData.leftPointer !== null) {
          this.visualData.leftPointerPosition = this.visualData.leftPointer * step;
        }
        
        if (this.visualData.rightPointer !== null) {
          this.visualData.rightPointerPosition = this.visualData.rightPointer * step;
        }
      },
      
      runTwoPointers() {
        this.resetVisualization(2);
        
        const runStep = () => {
          if (this.visualData.finished) return;
          
          this.stepTwoPointers();
          
          if (!this.visualData.finished) {
            const timer = setTimeout(runStep, this.animationSpeed);
            this.animationTimers.push(timer);
          }
        };
        
        runStep();
      }
    },
    mounted() {
      // Инициализируем данные для метода хеш-таблицы по умолчанию
      this.resetVisualization(1);
    }
  };
  </script>
  
  <style>
  .two-sum-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
    line-height: 1.5;
  }
  
  h1, h2, h3, h4 {
    color: #2c3e50;
  }
  
  h1 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-size: 1.5rem;
    border-bottom: 2px solid #3498db;
    padding-bottom: 0.5rem;
    margin-top: 2rem;
  }
  
  h3 {
    font-size: 1.2rem;
    margin-top: 1.5rem;
    color: #2980b9;
  }
  
  code {
    font-family: 'Courier New', Courier, monospace;
    background-color: #f4f6f8;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-size: 0.9rem;
    color: #e74c3c;
  }
  
  pre {
    background-color: #282c34;
    color: #abb2bf;
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
    margin: 1rem 0;
  }
  
  pre code {
    background: none;
    color: inherit;
    padding: 0;
    font-size: 0.9rem;
  }
  
  .problem-description {
    background-color: #f9f9f9;
    border-left: 4px solid #2ecc71;
    padding: 1rem;
    border-radius: 5px;
    margin-bottom: 2rem;
  }
  
  .example {
    background-color: #f0f4f8;
    padding: 1rem;
    border-radius: 4px;
    margin-top: 1rem;
  }
  
  /* Стили для вкладок */
  .solution-tabs {
    display: flex;
    background-color: #f5f7fa;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 1.5rem;
  }
  
  .tab {
    padding: 0.8rem 1.2rem;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    flex: 1;
    text-align: center;
    border-bottom: 3px solid transparent;
  }
  
  .tab:hover {
    background-color: #eaeff5;
  }
  
  .tab.active {
    background-color: #ffffff;
    border-bottom: 3px solid #3498db;
    color: #3498db;
  }
  
  .solution-content {
    background-color: #ffffff;
    border-radius: 5px;
    padding: 1.5rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    animation: fadeIn 0.5s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .approach-description {
    margin-bottom: 1.5rem;
  }
  
  .code-block {
    margin: 1.5rem 0;
  }
  
  .complexity {
    background-color: #f9f9f9;
    border-radius: 5px;
    padding: 1rem;
    margin: 1.5rem 0;
  }
  
  /* Стили для блока визуализации */
  .visualization {
    background-color: #f5f7fa;
    border-radius: 5px;
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
  
  .array-container {
    margin-bottom: 1.5rem;
  }
  
  .array-label {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .array-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .array-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    border: 2px solid #ced4da;
    border-radius: 5px;
    width: 60px;
    height: 60px;
    transition: all 0.3s ease;
  }
  
  .array-value {
    font-weight: 600;
    font-size: 1.2rem;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .array-index {
    background-color: #f1f3f5;
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    color: #666;
    border-top: 1px solid #ced4da;
  }
  
  .array-item.current-i {
    border-color: #3498db;
    background-color: #e3f2fd;
  }
  
  .array-item.current-j {
    border-color: #e74c3c;
    background-color: #ffebee;
  }
  
  .array-item.found {
    border-color: #2ecc71;
    background-color: #e8f5e9;
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  
  .visualization-controls {
    margin-top: 1.5rem;
    text-align: center;
  }
  
  .target-sum {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  .status-message {
    background-color: #f0f4f8;
    border-radius: 5px;
    padding: 0.8rem;
    margin-bottom: 1rem;
    min-height: 3rem;
  }
  
  .buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  
  .control-button {
    padding: 0.6rem 1.2rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .control-button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .control-button:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
  
  /* Стили для хеш-таблицы */
  .hash-table-container {
    margin: 1.5rem 0;
  }
  
  .hash-table-label {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .hash-table {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 1rem;
    border: 1px solid #ced4da;
  }
  
  .hash-entry {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.8rem;
    background-color: #f8f9fa;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    transition: all 0.3s ease;
  }
  
  .hash-entry.highlighted {
    background-color: #e3f2fd;
    border-color: #3498db;
    box-shadow: 0 2px 4px rgba(52, 152, 219, 0.2);
  }
  
  .hash-key {
    font-weight: 600;
    color: #e74c3c;
  }
  
  .hash-arrow {
    margin: 0 0.5rem;
    color: #7f8c8d;
  }
  
  .hash-value {
    color: #2980b9;
  }
  
  /* Стили для метода двух указателей */
  .pointers-container {
    position: relative;
    height: 50px;
    margin: 2rem 0;
    background-color: #ffffff;
    border-radius: 4px;
    border: 1px solid #ced4da;
  }
  
  .pointer {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: left 0.5s ease;
  }
  
  .pointer.left {
    color: #3498db;
  }
  
  .pointer.right {
    color: #e74c3c;
  }
  
  .pointer-arrow {
    font-size: 1.5rem;
    line-height: 1;
  }
  
  .pointer-name {
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  /* Стили для сравнения подходов */
  .comparison-table {
    margin: 1.5rem 0;
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #e5e7eb;
  }
  
  th, td {
    padding: 0.8rem;
    text-align: left;
    border: 1px solid #e5e7eb;
  }
  
  th {
    background-color: #f8f9fa;
    font-weight: 600;
  }
  
  tr:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  /* Стили для секции плюсов и минусов */
  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }
  
  .pros, .cons {
    padding: 1rem;
    border-radius: 5px;
  }
  
  .pros {
    background-color: #e8f5e9;
    border-left: 4px solid #2ecc71;
  }
  
  .cons {
    background-color: #ffebee;
    border-left: 4px solid #e74c3c;
  }
  
  .pros h4, .cons h4 {
    margin-top: 0;
    margin-bottom: 0.8rem;
  }
  
  .pros h4 {
    color: #2ecc71;
  }
  
  .cons h4 {
    color: #e74c3c;
  }
  
  .pros ul, .cons ul {
    margin: 0;
    padding-left: 1.5rem;
  }
  
  /* Стили для итогов и выводов */
  .conclusion {
    background-color: #f0f4f8;
    border-radius: 5px;
    padding: 1.2rem;
    margin: 1.5rem 0;
  }
  
  .common-pitfalls {
    margin: 1.5rem 0;
  }
  
  .common-pitfalls ol {
    padding-left: 1.5rem;
  }
  
  .common-pitfalls li {
    margin-bottom: 0.8rem;
  }
  
  .related-problems {
    background-color: #f8f9fa;
    border-radius: 5px;
    padding: 1.2rem;
    margin: 1.5rem 0;
  }
  
  .final-code-section {
    margin-top: 2.5rem;
    padding: 1.5rem;
    background-color: #f5f7fa;
    border-radius: 5px;
    border-top: 4px solid #3498db;
  }
  
  /* Медиа-запросы для адаптивности */
  @media (max-width: 768px) {
    .pros-cons {
      grid-template-columns: 1fr;
    }
    
    .visualization {
      padding: 1rem;
    }
    
    .array-item {
      width: 50px;
      height: 50px;
    }
    
    .solution-tabs {
      flex-wrap: wrap;
    }
    
    .tab {
      flex-basis: 50%;
    }
  }
  
  @media (max-width: 480px) {
    .tab {
      flex-basis: 100%;
    }
    
    .buttons {
      flex-direction: column;
    }
    
    .control-button {
      width: 100%;
    }
  }
  </style>