<template>
    <div class="fibonacci-solver">
      <h1>Алгоритмы вычисления чисел Фибоначчи</h1>
      
      <div class="intro-section">
        <h2>Что такое числа Фибоначчи?</h2>
        <p class="explanation">
          Последовательность Фибоначчи — это ряд чисел, где каждое следующее число является суммой двух предыдущих. 
          Первые два числа равны 1, затем идут 2 (1+1), 3 (1+2), 5 (2+3) и так далее: 1, 1, 2, 3, 5, 8, 13, 21...
        </p>
        
        <div class="sequence-visualization">
          <div 
            v-for="(num, index) in fibonacciSequence" 
            :key="index" 
            class="sequence-number"
            :class="{'highlighted': index === highlightedIndex || index === highlightedIndex - 1 || index === highlightedIndex - 2}"
          >
            <div class="number">{{ num }}</div>
            <div class="index">F<sub>{{ index + 1 }}</sub></div>
            <div class="addition" v-if="index >= 2 && highlightedIndex === index">
              <div class="addition-line"></div>
              <div class="addition-formula">
                {{ fibonacciSequence[index-2] }} + {{ fibonacciSequence[index-1] }} = {{ num }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="sequence-controls">
          <button @click="previousNumber" :disabled="highlightedIndex <= 0">Предыдущее</button>
          <button @click="nextNumber" :disabled="highlightedIndex >= fibonacciSequence.length - 1">Следующее</button>
        </div>
      </div>
      
      <div class="task-section">
        <h2>Задача</h2>
        <div class="task-description">
          <p>Написать функцию <code>fib(n)</code>, возвращающую n-ное число Фибоначчи.</p>
          <pre class="code-block">
  // Написать функцию fib(n), возвращающую n-ное число Фибоначчи
  // Первые два числа равны 1, затем 2(1+1), затем 3(1+2), 5(2+3) и так далее: 1, 1, 2, 3, 5, 8, 13, 21....
  
  function fib(n) {
    // Ваш код здесь
  }
  
  alert(fib(3)); // 2
  alert(fib(7)); // 13</pre>
        </div>
      </div>
      
      <div class="approaches-section">
        <h2>Подходы к решению</h2>
        
        <div class="approach-tabs">
          <button 
            v-for="(approach, index) in approaches" 
            :key="index" 
            @click="currentApproach = index"
            :class="{ active: currentApproach === index }"
            class="approach-tab"
          >
            {{ approach.name }}
          </button>
        </div>
        
        <div class="approach-content">
          <h3>{{ approaches[currentApproach].name }}</h3>
          <div class="approach-description">
            <p>{{ approaches[currentApproach].description }}</p>
          </div>
          
          <div class="code-implementation">
            <h4>Реализация:</h4>
            <pre class="code-block">{{ approaches[currentApproach].code }}</pre>
          </div>
          
          <div class="complexity-analysis">
            <h4>Анализ сложности:</h4>
            <ul>
              <li><strong>Временная сложность:</strong> {{ approaches[currentApproach].timeComplexity }}</li>
              <li><strong>Пространственная сложность:</strong> {{ approaches[currentApproach].spaceComplexity }}</li>
            </ul>
          </div>
          
          <div class="pros-cons">
            <div class="pros">
              <h4>Преимущества:</h4>
              <ul>
                <li v-for="(pro, index) in approaches[currentApproach].pros" :key="index">{{ pro }}</li>
              </ul>
            </div>
            <div class="cons">
              <h4>Недостатки:</h4>
              <ul>
                <li v-for="(con, index) in approaches[currentApproach].cons" :key="index">{{ con }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="visualization-section">
        <h2>Визуализация алгоритма</h2>
        
        <div class="visualization-controls">
          <div class="input-control">
            <label for="fibInput">Введите n (1-30):</label>
            <input 
              type="number" 
              id="fibInput" 
              v-model.number="inputN" 
              min="1" 
              max="30" 
              :disabled="isAnimating"
            />
          </div>
          <button @click="startVisualization" :disabled="isAnimating || !isValidInput">
            {{ isAnimating ? 'Вычисление...' : 'Запустить визуализацию' }}
          </button>
        </div>
        
        <div class="visualization-container">
          <div v-if="currentApproach === 0" class="recursive-visualization">
            <div class="recursion-tree">
              <div class="tree-container" ref="treeContainer">
                <!-- Дерево рекурсивных вызовов будет отображаться здесь -->
                <div 
                  v-for="(node, index) in recursionTree" 
                  :key="index" 
                  class="tree-node"
                  :class="{ 
                    'highlighted': node.highlighted, 
                    'computed': node.computed,
                    'duplicate': node.isDuplicate
                  }"
                  :style="{ left: `${node.x}px`, top: `${node.y}px` }"
                >
                  <div class="node-content">fib({{ node.n }})</div>
                  <div v-if="node.computed" class="node-result">= {{ node.result }}</div>
                </div>
                <svg class="tree-connections" ref="treeSvg">
                  <!-- Линии между узлами будут нарисованы здесь -->
                </svg>
              </div>
            </div>
            <div class="recursion-info">
              <div class="call-counter">Количество вызовов: {{ callCounter }}</div>
              <div class="duplicate-calls">Повторных вычислений: {{ duplicateCounter }}</div>
            </div>
          </div>
          
          <div v-else-if="currentApproach === 1" class="iterative-visualization">
            <div class="variables-container">
              <div class="variable">
                <div class="variable-name">n = {{ inputN }}</div>
              </div>
              <div class="iteration" v-for="(iter, index) in iterations" :key="index">
                <div class="iteration-header">Итерация {{ iter.i }}</div>
                <div class="variables">
                  <div class="variable" :class="{ 'changing': iter.changing === 'a' }">
                    <div class="variable-name">a</div>
                    <div class="variable-value">{{ iter.a }}</div>
                  </div>
                  <div class="variable" :class="{ 'changing': iter.changing === 'b' }">
                    <div class="variable-name">b</div>
                    <div class="variable-value">{{ iter.b }}</div>
                  </div>
                  <div class="variable" :class="{ 'changing': iter.changing === 'c' }">
                    <div class="variable-name">c</div>
                    <div class="variable-value">{{ iter.c !== undefined ? iter.c : '' }}</div>
                  </div>
                </div>
                <div class="operation" v-if="iter.operation">{{ iter.operation }}</div>
              </div>
              <div class="result" v-if="iterations.length > 0">
                <div class="result-label">Результат:</div>
                <div class="result-value">fib({{ inputN }}) = {{ computationResult }}</div>
              </div>
            </div>
          </div>
          
          <div v-else-if="currentApproach === 2" class="memoization-visualization">
            <div class="memo-container">
              <div class="recursion-tree-memo">
                <div class="tree-container" ref="memoTreeContainer">
                  <!-- Дерево рекурсивных вызовов с мемоизацией -->
                  <div 
                    v-for="(node, index) in recursionTree" 
                    :key="index" 
                    class="tree-node"
                    :class="{ 
                      'highlighted': node.highlighted, 
                      'computed': node.computed,
                      'memoized': node.memoized
                    }"
                    :style="{ left: `${node.x}px`, top: `${node.y}px` }"
                  >
                    <div class="node-content">fib({{ node.n }})</div>
                    <div v-if="node.computed || node.memoized" class="node-result">= {{ node.result }}</div>
                    <div v-if="node.memoized" class="memo-badge">из кэша</div>
                  </div>
                  <svg class="tree-connections" ref="memoTreeSvg">
                    <!-- Линии между узлами будут нарисованы здесь -->
                  </svg>
                </div>
              </div>
              <div class="memo-cache">
                <h4>Кэш вычислений:</h4>
                <div class="cache-container">
                  <div v-for="(value, key) in memoCache" :key="key" class="cache-item">
                    <div class="cache-key">memo[{{ key }}]</div>
                    <div class="cache-value">{{ value }}</div>
                  </div>
                </div>
              </div>
              <div class="memo-info">
                <div class="call-counter">Количество вызовов: {{ callCounter }}</div>
                <div class="cached-calls">Использовано кэшированных значений: {{ cachedCounter }}</div>
              </div>
            </div>
          </div>
          
          <div v-else class="matrix-visualization">
            <p>Визуализация для этого метода находится в разработке</p>
          </div>
        </div>
      </div>
      
      <div class="performance-section">
        <h2>Сравнение производительности</h2>
        <div class="performance-chart">
          <div class="chart-title">Время выполнения для разных значений n</div>
          <div class="chart-legend">
            <div v-for="(approach, index) in approaches" :key="index" class="legend-item">
              <div class="legend-color" :style="{ backgroundColor: getApproachColor(index) }"></div>
              <div class="legend-label">{{ approach.name }}</div>
            </div>
          </div>
          <div class="chart-container">
            <div class="y-axis">
              <div class="axis-label">Время (мс)</div>
              <div class="tick" v-for="tick in yAxisTicks" :key="tick">
                <span class="tick-label">{{ tick }}</span>
                <span class="tick-line"></span>
              </div>
            </div>
            <div class="x-axis">
              <div class="tick" v-for="n in xAxisValues" :key="n">
                <span class="tick-label">{{ n }}</span>
              </div>
              <div class="axis-label">n</div>
            </div>
            <div class="chart-bars">
              <div 
                v-for="(dataset, approachIndex) in performanceData" 
                :key="approachIndex"
                class="data-line"
                :style="{ 
                  backgroundColor: getApproachColor(approachIndex), 
                  opacity: 0.3,
                  display: approachIndex === 0 && !showRecursivePerformance ? 'none' : 'block'
                }"
              ></div>
              <div 
                v-for="(dataset, approachIndex) in performanceData" 
                :key="`points-${approachIndex}`"
                :style="{ display: approachIndex === 0 && !showRecursivePerformance ? 'none' : 'block' }"
              >
                <div 
                  v-for="(point, index) in dataset" 
                  :key="index"
                  class="data-point"
                  :style="{ 
                    left: `${getXPosition(point.n)}%`, 
                    bottom: `${getYPosition(point.time)}%`,
                    backgroundColor: getApproachColor(approachIndex)
                  }"
                  :title="`n=${point.n}, время=${point.time}мс`"
                ></div>
              </div>
            </div>
          </div>
          <div class="performance-controls">
            <label>
              <input type="checkbox" v-model="showRecursivePerformance"> Показать рекурсивный метод (предупреждение: очень медленный)
            </label>
          </div>
        </div>
      </div>
      
      <div class="real-world-section">
        <h2>Применение чисел Фибоначчи в реальном мире</h2>
        <div class="applications-list">
          <div class="application" v-for="(app, index) in realWorldApplications" :key="index">
            <h3>{{ app.title }}</h3>
            <p>{{ app.description }}</p>
            <div class="application-image" v-if="app.image">
              <img :src="app.image" :alt="app.title">
            </div>
          </div>
        </div>
      </div>
      
      <div class="conclusion-section">
        <h2>Заключение и советы</h2>
        <div class="conclusion-content">
          <p>При решении задач с числами Фибоначчи, выбор оптимального алгоритма зависит от контекста и требований:</p>
          <ul>
            <li><strong>Рекурсивный метод</strong> прост для понимания, но неэффективен для больших n.</li>
            <li><strong>Итеративный метод</strong> отлично подходит для большинства практических задач с линейной сложностью.</li>
            <li><strong>Метод с мемоизацией</strong> решает проблему избыточных вычислений в рекурсии.</li>
            <li><strong>Формула Бине</strong> дает мгновенный результат, но может страдать от потери точности из-за округления.</li>
          </ul>
          <p>Помните эти важные моменты при работе с числами Фибоначчи:</p>
          <ul>
            <li>Для небольших n (до 40-50) используйте итеративный подход.</li>
            <li>Для задач, требующих многократного вычисления разных чисел Фибоначчи, применяйте мемоизацию.</li>
            <li>Учитывайте, что числа Фибоначчи быстро растут — уже F(50) больше 12 миллионов.</li>
            <li>В JavaScript для очень больших n может потребоваться библиотека для работы с большими числами (например, BigInt).</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FibonacciSolver',
    
    data() {
      return {
        // Данные для демонстрации последовательности
        fibonacciSequence: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
        highlightedIndex: 0,
        
        // Текущий подход
        currentApproach: 1, // По умолчанию показываем итеративный подход
        
        // Данные для визуализации
        inputN: 7,
        isAnimating: false,
        computationResult: null,
        callCounter: 0,
        duplicateCounter: 0,
        cachedCounter: 0,
        recursionTree: [],
        iterations: [],
        memoCache: {},
        
        // Данные производительности
        showRecursivePerformance: false,
        performanceData: [
          // Рекурсивный метод
          [
            { n: 5, time: 0.1 },
            { n: 10, time: 1 },
            { n: 15, time: 10 },
            { n: 20, time: 100 },
            { n: 25, time: 1000 },
            { n: 30, time: 10000 }
          ],
          // Итеративный метод
          [
            { n: 5, time: 0.01 },
            { n: 10, time: 0.02 },
            { n: 15, time: 0.03 },
            { n: 20, time: 0.04 },
            { n: 25, time: 0.05 },
            { n: 30, time: 0.06 },
            { n: 1000, time: 0.5 }
          ],
          // Метод с мемоизацией
          [
            { n: 5, time: 0.05 },
            { n: 10, time: 0.1 },
            { n: 15, time: 0.15 },
            { n: 20, time: 0.2 },
            { n: 25, time: 0.25 },
            { n: 30, time: 0.3 },
            { n: 1000, time: 2 }
          ],
          // Формула Бине
          [
            { n: 5, time: 0.01 },
            { n: 10, time: 0.01 },
            { n: 15, time: 0.01 },
            { n: 20, time: 0.01 },
            { n: 25, time: 0.01 },
            { n: 30, time: 0.01 },
            { n: 1000, time: 0.01 }
          ]
        ],
        
        // Примеры применения в реальном мире
        realWorldApplications: [
          {
            title: 'Природа и биология',
            description: 'Числа Фибоначчи встречаются в расположении листьев на стеблях растений, в расположении семян подсолнуха, в структуре сосновых шишек и даже в спиралях галактик.',
            image: '/images/fibonacci-nature.jpg'
          },
          {
            title: 'Компьютерные алгоритмы',
            description: 'Числа Фибоначчи используются в алгоритмах поиска, вычисления НОД (алгоритм Евклида), в структурах данных (Фибоначчиева куча) и для генерации псевдослучайных чисел.',
            image: '/images/fibonacci-algorithms.jpg'
          },
          {
            title: 'Финансы и трейдинг',
            description: 'Уровни Фибоначчи используются в техническом анализе для определения уровней поддержки и сопротивления, а также для прогнозирования движений цены.',
            image: '/images/fibonacci-trading.jpg'
          },
          {
            title: 'Архитектура и искусство',
            description: 'Золотое сечение, тесно связанное с последовательностью Фибоначчи, использовалось в архитектуре и искусстве для создания гармоничных пропорций.',
            image: '/images/fibonacci-architecture.jpg'
          }
        ]
      };
    },
    
    computed: {
      approaches() {
        return [
          {
            name: 'Рекурсивный метод',
            description: 'Самый интуитивно понятный подход, напрямую следующий определению чисел Фибоначчи. Каждое число вычисляется как сумма двух предыдущих, которые сами вычисляются рекурсивно.',
            code: `function fib(n) {
    // Базовый случай
    if (n <= 2) return 1;
    
    // Рекурсивный случай
    return fib(n - 1) + fib(n - 2);
  }`,
            timeComplexity: 'O(2^n) - экспоненциальная',
            spaceComplexity: 'O(n) - для стека вызовов',
            pros: [
              'Простая реализация',
              'Наглядно отражает математическое определение',
              'Удобно для понимания концепции рекурсии'
            ],
            cons: [
              'Крайне неэффективен для больших значений n',
              'Много повторных вычислений одних и тех же значений',
              'Быстро переполняет стек вызовов для больших n'
            ]
          },
          {
            name: 'Итеративный метод',
            description: 'Вычисляет числа Фибоначчи последовательно, используя цикл. Хранит только два последних значения, что делает этот метод эффективным как по времени, так и по памяти.',
            code: `function fib(n) {
    // Обработка базовых случаев
    if (n <= 0) return 0;
    if (n <= 2) return 1;
    
    // Инициализация первых двух чисел
    let a = 1, b = 1;
    
    // Вычисление последующих чисел
    for (let i = 3; i <= n; i++) {
      // Вычисляем следующее число
      let c = a + b;
      
      // Сдвигаем значения
      a = b;
      b = c;
    }
    
    // Возвращаем n-ное число
    return b;
  }`,
            timeComplexity: 'O(n) - линейная',
            spaceComplexity: 'O(1) - константная',
            pros: [
              'Эффективная временная сложность',
              'Эффективное использование памяти',
              'Не переполняет стек для больших n',
              'Предсказуемое время выполнения'
            ],
            cons: [
              'Менее наглядная связь с математическим определением',
              'Необходимо вычислять все предыдущие числа даже для вычисления одного'
            ]
          },
          {
            name: 'Метод с мемоизацией',
            description: 'Объединяет рекурсивный подход с кэшированием результатов. При первом вычислении числа сохраняет его в кэше и при повторном обращении возвращает уже вычисленное значение.',
            code: `function fib(n, memo = {}) {
    // Обработка базовых случаев
    if (n <= 0) return 0;
    if (n <= 2) return 1;
    
    // Проверяем, вычисляли ли мы уже это число
    if (memo[n]) return memo[n];
    
    // Вычисляем и сохраняем в кэш
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    
    return memo[n];
  }`,
            timeComplexity: 'O(n) - линейная',
            spaceComplexity: 'O(n) - линейная (для хранения кэша)',
            pros: [
              'Эффективная временная сложность',
              'Сохраняет интуитивный рекурсивный подход',
              'Избегает повторных вычислений',
              'Может быть адаптирован для вычисления нескольких значений'
            ],
            cons: [
              'Требует дополнительной памяти для кэша',
              'Немного сложнее для понимания и реализации'
            ]
          },
          {
            name: 'Формула Бине',
            description: 'Математическая формула, позволяющая вычислить любое число Фибоначчи напрямую, без вычисления предыдущих чисел. Использует золотое сечение (phi).',
            code: `function fib(n) {
    // Обработка базовых случаев
    if (n <= 0) return 0;
    if (n <= 2) return 1;
    
    // Вычисление по формуле Бине
    const phi = (1 + Math.sqrt(5)) / 2;
    return Math.round(
      (Math.pow(phi, n) - Math.pow(-1 / phi, n)) / Math.sqrt(5)
    );
  }`,
            timeComplexity: 'O(1) - константная (но с затратами на вычисление степеней)',
            spaceComplexity: 'O(1) - константная',
            pros: [
              'Мгновенное вычисление для любого n',
              'Не требует вычисления предыдущих чисел',
              'Минимальное использование памяти'
            ],
            cons: [
              'Может быть неточным для больших n из-за ограничений в представлении чисел с плавающей точкой',
              'Включает вычисление степеней и корней, что может быть медленнее простых операций',
              'Менее интуитивная связь с определением последовательности'
            ]
          }
        ];
      },
      
      isValidInput() {
        return this.inputN >= 1 && this.inputN <= 30;
      },
      
      xAxisValues() {
        return [5, 10, 15, 20, 25, 30, 1000];
      },
      
      yAxisTicks() {
        return this.showRecursivePerformance 
          ? [0, 0.1, 1, 10, 100, 1000, 10000] 
          : [0, 0.1, 0.5, 1, 2, 5];
      }
    },
    
    methods: {
      // Методы для демонстрации последовательности
      previousNumber() {
        if (this.highlightedIndex > 0) {
          this.highlightedIndex--;
        }
      },
      
      nextNumber() {
        if (this.highlightedIndex < this.fibonacciSequence.length - 1) {
          this.highlightedIndex++;
        }
      },
      
      // Методы для визуализации алгоритмов
      startVisualization() {
        if (!this.isValidInput || this.isAnimating) return;
        
        this.isAnimating = true;
        this.computationResult = null;
        this.callCounter = 0;
        this.duplicateCounter = 0;
        this.cachedCounter = 0;
        this.recursionTree = [];
        this.iterations = [];
        this.memoCache = {};
        
        // Запускаем соответствующую визуализацию
        if (this.currentApproach === 0) {
          this.visualizeRecursive(this.inputN);
        } else if (this.currentApproach === 1) {
          this.visualizeIterative(this.inputN);
        } else if (this.currentApproach === 2) {
          this.visualizeMemoization(this.inputN);
        } else {
          // Метод Бине
          setTimeout(() => {
            const result = this.fibBinet(this.inputN);
            this.computationResult = result;
            this.isAnimating = false;
          }, 1000);
        }
      },
      
      // Визуализация рекурсивного метода
      async visualizeRecursive(n) {
        // Сбрасываем состояние визуализации
        this.recursionTree = [];
        
        // Запускаем рекурсивный процесс с визуализацией
        const result = await this.fibRecursiveVisual(n, 500, 50, null);
        
        // Завершаем анимацию
        this.computationResult = result;
        this.isAnimating = false;
      },
      
      async fibRecursiveVisual(n, x, y, parentId) {
        // Увеличиваем счетчик вызовов
        this.callCounter++;
        
        // Проверяем, не было ли уже вычислено такое же значение
        const duplicateNode = this.recursionTree.find(node => 
          node.n === n && node.computed && !node.highlighted
        );
        
        // Создаем узел для визуализации
        const nodeId = this.recursionTree.length;
        const node = {
          id: nodeId,
          n,
          x,
          y,
          parentId,
          highlighted: true,
          computed: false,
          result: null,
          isDuplicate: duplicateNode !== undefined
        };
        
        this.recursionTree.push(node);
        
        // Если это дубликат, увеличиваем счетчик дубликатов
        if (node.isDuplicate) {
          this.duplicateCounter++;
        }
        
        // Отрисовываем линию к родителю, если он есть
        if (parentId !== null) {
          this.$nextTick(() => {
            this.drawConnectionLine(nodeId, parentId);
          });
        }
        
        // Базовый случай
        if (n <= 2) {
          // Пауза для анимации
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Обновляем узел
          node.result = 1;
          node.computed = true;
          node.highlighted = false;
          
          return 1;
        }
        
        // Рекурсивный случай
        // Пауза для анимации
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Вычисляем первое подзначение
        const leftResult = await this.fibRecursiveVisual(
          n - 1, 
          x - 30 * (n - 1), 
          y + 70, 
          nodeId
        );
        
        // Вычисляем второе подзначение
        const rightResult = await this.fibRecursiveVisual(
          n - 2,
          x + 30 * (n - 2),
          y + 70,
          nodeId
        );
        
        // Вычисляем результат
        const result = leftResult + rightResult;
        
        // Обновляем узел
        node.result = result;
        node.computed = true;
        node.highlighted = false;
        
        // Возвращаем результат
        return result;
      },
      
      // Рисуем линию между узлами в дереве рекурсии
      drawConnectionLine(childId, parentId) {
        const svg = this.currentApproach === 0 ? this.$refs.treeSvg : this.$refs.memoTreeSvg;
        if (!svg) return;
        
        const child = this.recursionTree[childId];
        const parent = this.recursionTree[parentId];
        
        // Создаем SVG линию
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', parent.x + 40); // центр родительского узла
        line.setAttribute('y1', parent.y + 30); // нижняя часть родительского узла
        line.setAttribute('x2', child.x + 40); // центр дочернего узла
        line.setAttribute('y2', child.y); // верхняя часть дочернего узла
        line.setAttribute('stroke', '#666');
        line.setAttribute('stroke-width', '2');
        
        // Добавляем линию в SVG
        svg.appendChild(line);
      },
      
      // Визуализация итеративного метода
      async visualizeIterative(n) {
        // Сбрасываем состояние визуализации
        this.iterations = [];
        
        // Обработка базовых случаев
        if (n <= 0) {
          this.computationResult = 0;
          this.isAnimating = false;
          return;
        }
        
        if (n <= 2) {
          this.computationResult = 1;
          this.isAnimating = false;
          return;
        }
        
        // Инициализация
        let a = 1, b = 1;
        
        // Добавляем начальное состояние
        this.iterations.push({
          i: 'Инициализация',
          a,
          b,
          operation: 'Начальные значения: a = 1, b = 1'
        });
        
        // Пауза для анимации
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Итеративное вычисление
        for (let i = 3; i <= n; i++) {
          // Вычисляем следующее число
          const c = a + b;
          
          // Добавляем шаг вычисления c
          this.iterations.push({
            i,
            a,
            b,
            c,
            changing: 'c',
            operation: `c = a + b = ${a} + ${b} = ${c}`
          });
          
          // Пауза для анимации
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Обновляем a
          this.iterations.push({
            i,
            a: b, // новое значение a
            b,
            c,
            changing: 'a',
            operation: `a = b = ${b}`
          });
          
          // Пауза для анимации
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Обновляем b
          this.iterations.push({
            i,
            a: b,
            b: c, // новое значение b
            c,
            changing: 'b',
            operation: `b = c = ${c}`
          });
          
          // Пауза для анимации
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Обновляем переменные для следующей итерации
          a = b;
          b = c;
        }
        
        // Устанавливаем результат
        this.computationResult = b;
        this.isAnimating = false;
      },
      
      // Визуализация метода с мемоизацией
      async visualizeMemoization(n) {
        // Сбрасываем состояние визуализации
        this.recursionTree = [];
        this.memoCache = {};
        
        // Запускаем процесс с мемоизацией
        const result = await this.fibMemoVisual(n, 500, 50, null);
        
        // Завершаем анимацию
        this.computationResult = result;
        this.isAnimating = false;
      },
      
      async fibMemoVisual(n, x, y, parentId) {
        // Увеличиваем счетчик вызовов
        this.callCounter++;
        
        // Проверяем наличие значения в кэше
        if (this.memoCache[n]) {
          // Создаем узел для визуализации с признаком кэширования
          const nodeId = this.recursionTree.length;
          const node = {
            id: nodeId,
            n,
            x,
            y,
            parentId,
            highlighted: true,
            computed: false,
            memoized: true,
            result: this.memoCache[n]
          };
          
          this.recursionTree.push(node);
          
          // Отрисовываем линию к родителю, если он есть
          if (parentId !== null) {
            this.$nextTick(() => {
              this.drawConnectionLine(nodeId, parentId);
            });
          }
          
          // Увеличиваем счетчик кэширования
          this.cachedCounter++;
          
          // Пауза для анимации
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Обновляем узел
          node.highlighted = false;
          
          return this.memoCache[n];
        }
        
        // Создаем узел для визуализации
        const nodeId = this.recursionTree.length;
        const node = {
          id: nodeId,
          n,
          x,
          y,
          parentId,
          highlighted: true,
          computed: false,
          memoized: false,
          result: null
        };
        
        this.recursionTree.push(node);
        
        // Отрисовываем линию к родителю, если он есть
        if (parentId !== null) {
          this.$nextTick(() => {
            this.drawConnectionLine(nodeId, parentId);
          });
        }
        
        // Базовый случай
        if (n <= 2) {
          // Пауза для анимации
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Устанавливаем результат в кэш
          this.memoCache[n] = 1;
          
          // Обновляем узел
          node.result = 1;
          node.computed = true;
          node.highlighted = false;
          
          return 1;
        }
        
        // Рекурсивный случай
        // Пауза для анимации
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Вычисляем первое подзначение
        const leftResult = await this.fibMemoVisual(
          n - 1, 
          x - 40 * Math.log2(n), 
          y + 70, 
          nodeId
        );
        
        // Вычисляем второе подзначение
        const rightResult = await this.fibMemoVisual(
          n - 2,
          x + 40 * Math.log2(n - 1),
          y + 70,
          nodeId
        );
        
        // Вычисляем результат
        const result = leftResult + rightResult;
        
        // Устанавливаем результат в кэш
        this.memoCache[n] = result;
        
        // Обновляем узел
        node.result = result;
        node.computed = true;
        node.highlighted = false;
        
        // Возвращаем результат
        return result;
      },
      
      // Реализация формулы Бине
      fibBinet(n) {
        if (n <= 0) return 0;
        if (n <= 2) return 1;
        
        const phi = (1 + Math.sqrt(5)) / 2;
        return Math.round((Math.pow(phi, n) - Math.pow(-1 / phi, n)) / Math.sqrt(5));
      },
      
      // Методы для графика производительности
      getApproachColor(index) {
        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#9b59b6'];
        return colors[index % colors.length];
      },
      
      getXPosition(n) {
        const xValues = this.xAxisValues;
        const maxX = xValues[xValues.length - 1];
        const minX = xValues[0];
        
        // Логарифмическая шкала для х
        const positionPercent = (Math.log(n) - Math.log(minX)) / (Math.log(maxX) - Math.log(minX)) * 100;
        return positionPercent;
      },
      
      getYPosition(time) {
        const maxY = this.showRecursivePerformance ? 10000 : 5;
        const minY = 0;
        
        // Логарифмическая шкала для времени
        if (time <= 0) return 0;
        
        const logTime = Math.log10(time + 0.01); // Добавляем 0.01, чтобы избежать log(0)
        const logMax = Math.log10(maxY + 0.01);
        const logMin = Math.log10(minY + 0.01);
        
        const positionPercent = (logTime - logMin) / (logMax - logMin) * 100;
        return positionPercent;
      }
    }
  };
  </script>
  
  <style>
  .fibonacci-solver {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #333;
    background-color: #fff;
  }
  
  h1, h2, h3, h4 {
    color: #000;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  
  h1 {
    text-align: center;
    font-size: 2.2rem;
    margin-bottom: 30px;
  }
  
  h2 {
    font-size: 1.8rem;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
  }
  
  h3 {
    font-size: 1.4rem;
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 15px;
  }
  
  code {
    font-family: 'Courier New', Courier, monospace;
    background-color: #f5f5f5;
    padding: 2px 5px;
    border-radius: 3px;
    color: #c0392b;
  }
  
  /* Стили для секции с последовательностью */
  .intro-section {
    margin-bottom: 40px;
  }
  
  .sequence-visualization {
    display: flex;
    padding: 20px 0;
    margin: 20px 0;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .sequence-number {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 15px;
    position: relative;
    min-width: 50px;
  }
  
  .number {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3498db;
    color: white;
    border-radius: 50%;
    font-size: 1.2rem;
    font-weight: bold;
    transition: all 0.3s ease;
  }
  
  .index {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #666;
  }
  
  .sequence-number.highlighted .number {
    background-color: #e74c3c;
    transform: scale(1.2);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  .addition {
    position: absolute;
    top: -60px;
    width: 120px;
    text-align: center;
  }
  
  .addition-line {
    width: 2px;
    height: 20px;
    background-color: #e74c3c;
    margin: 0 auto 5px;
  }
  
  .addition-formula {
    background-color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-size: 0.9rem;
    white-space: nowrap;
  }
  
  .sequence-controls {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }
  
  .sequence-controls button {
    padding: 8px 16px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .sequence-controls button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .sequence-controls button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  /* Стили для блока с задачей */
  .task-description {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #3498db;
    margin-bottom: 30px;
  }
  
  .code-block {
    background-color: #282c34;
    color: #fff;
    padding: 15px;
    border-radius: 8px;
    font-family: 'Courier New', Courier, monospace;
    overflow-x: auto;
    white-space: pre;
    margin: 15px 0;
    line-height: 1.5;
  }
  
  /* Стили для подходов к решению */
  .approach-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .approach-tab {
    padding: 10px 20px;
    background-color: #f5f5f5;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .approach-tab:hover {
    background-color: #e0e0e0;
  }
  
  .approach-tab.active {
    background-color: #3498db;
    color: white;
  }
  
  .approach-content {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
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
    color: #e74c3c;
  }
  
  .pros, .cons {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
  }
  
  /* Стили для визуализации */
  .visualization-controls {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .input-control {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .input-control input {
    width: 60px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .visualization-controls button {
    padding: 8px 16px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 200px;
  }
  
  .visualization-controls button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .visualization-controls button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .visualization-container {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    min-height: 400px;
    margin-bottom: 30px;
    overflow: hidden;
  }
  
  /* Рекурсивная визуализация */
  .recursion-tree {
    position: relative;
    width: 100%;
    height: 500px;
    overflow: auto;
  }
  
  .tree-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .tree-connections {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  .tree-node {
    position: absolute;
    width: 80px;
    padding: 5px;
    background-color: #f5f5f5;
    border: 2px solid #3498db;
    border-radius: 8px;
    text-align: center;
    transition: all 0.3s ease;
    z-index: 2;
  }
  
  .tree-node.highlighted {
    background-color: #3498db;
    color: white;
    box-shadow: 0 0 10px rgba(52, 152, 219, 0.5);
  }
  
  .tree-node.computed {
    background-color: #2ecc71;
    border-color: #2ecc71;
    color: white;
  }
  
  .tree-node.duplicate {
    background-color: #e74c3c;
    border-color: #e74c3c;
    color: white;
  }
  
  .tree-node.memoized {
    background-color: #9b59b6;
    border-color: #9b59b6;
    color: white;
  }
  
  .node-content {
    font-size: 0.9rem;
    font-weight: bold;
  }
  
  .node-result {
    font-size: 0.8rem;
    margin-top: 5px;
  }
  
  .memo-badge {
    position: absolute;
    top: -12px;
    right: -12px;
    background-color: #e74c3c;
    color: white;
    font-size: 0.7rem;
    padding: 2px 5px;
    border-radius: 10px;
  }
  
  .recursion-info, .memo-info {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 4px;
  }
  
  .call-counter, .duplicate-calls, .cached-calls {
    font-size: 0.9rem;
    font-weight: bold;
  }
  
  /* Итеративная визуализация */
  .variables-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
  
  .iteration {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #3498db;
  }
  
  .iteration-header {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .variables {
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
  }
  
  .variable {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background-color: white;
    border-radius: 4px;
    min-width: 80px;
    transition: all 0.3s ease;
  }
  
  .variable.changing {
    background-color: #f39c12;
    color: white;
    transform: scale(1.1);
  }
  
  .variable-name {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .operation {
    text-align: center;
    font-style: italic;
    margin-top: 10px;
  }
  
  .result {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #2ecc71;
    color: white;
    border-radius: 8px;
    margin-top: 20px;
  }
  
  .result-label {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .result-value {
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  /* Мемоизация визуализация */
  .memo-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .recursion-tree-memo {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: auto;
  }
  
  .memo-cache {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
  }
  
  .cache-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .cache-item {
    background-color: white;
    padding: 8px;
    border-radius: 4px;
    display: flex;
    gap: 10px;
    font-size: 0.9rem;
  }
  
  .cache-key {
    font-weight: bold;
  }
  
  .cache-value {
    color: #e74c3c;
  }
  
  /* График производительности */
  .performance-chart {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin-bottom: 30px;
  }
  
  .chart-title {
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .chart-legend {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .legend-color {
    width: 20px;
    height: 10px;
    border-radius: 3px;
  }
  
  .chart-container {
    position: relative;
    height: 400px;
    margin-left: 60px;
    margin-right: 20px;
    margin-bottom: 60px;
    border-left: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  
  .y-axis {
    position: absolute;
    left: -60px;
    top: 0;
    height: 100%;
    width: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .axis-label {
    text-align: center;
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 10px;
  }
  
  .x-axis {
    position: absolute;
    bottom: -40px;
    left: 0;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
  }
  
  .x-axis .axis-label {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .tick {
    position: relative;
  }
  
  .tick-label {
    font-size: 0.8rem;
    color: #666;
  }
  
  .y-axis .tick {
    display: flex;
    align-items: center;
    width: 100%;
  }
  
  .y-axis .tick-line {
    position: absolute;
    left: 60px;
    width: calc(100vw - 120px);
    max-width: 1060px;
    height: 1px;
    background-color: #eee;
  }
  
  .x-axis .tick-label {
    position: absolute;
    top: 10px;
    transform: translateX(-50%);
  }
  
  .chart-bars {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .data-line {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  
  .data-point {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transform: translate(-50%, 50%);
  }
  
  .performance-controls {
    margin-top: 20px;
    text-align: center;
  }
  
  /* Секция с применениями в реальном мире */
  .applications-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .application {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .application h3 {
    margin-top: 0;
    color: #3498db;
  }
  
  .application-image {
    margin-top: 15px;
    text-align: center;
  }
  
  .application-image img {
    max-width: 100%;
    border-radius: 4px;
  }
  
  /* Заключение */
  .conclusion-content {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
  }
  
  .conclusion-content ul {
    padding-left: 20px;
  }
  
  .conclusion-content li {
    margin-bottom: 10px;
    line-height: 1.6;
  }
  
  /* Медиа-запросы для адаптивности */
  @media (max-width: 768px) {
    .pros-cons {
      grid-template-columns: 1fr;
    }
    
    .applications-list {
      grid-template-columns: 1fr;
    }
    
    .visualization-controls {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  </style>