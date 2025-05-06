<template>
    <div class="recursion-explorer">
      <h1 class="title">Исследователь рекурсии</h1>
      <p class="subtitle">Пошаговое изучение рекурсивных алгоритмов с визуализацией стека вызовов</p>
  
      <!-- Селектор алгоритма -->
      <div class="algorithm-selector">
        <button 
          v-for="algo in algorithms" 
          :key="algo.id"
          :class="['algorithm-button', { active: currentAlgorithm === algo.id }]"
          @click="selectAlgorithm(algo.id)"
        >
          {{ algo.name }}
        </button>
      </div>
  
      <div class="main-content">
        <!-- Описание алгоритма -->
        <div class="algorithm-description">
          <h2>{{ currentAlgoData.name }}</h2>
          <div class="problem-description">
            <h3>Описание задачи</h3>
            <p>{{ currentAlgoData.description }}</p>
          </div>
  
          <!-- Код алгоритма -->
          <div class="code-section">
            <h3>Рекурсивное решение</h3>
            <div class="code-container">
              <pre><code>{{ currentAlgoData.code }}</code></pre>
            </div>
            <div class="code-explanation">
              <p>{{ currentAlgoData.explanation }}</p>
            </div>
          </div>
        </div>
  
        <!-- Визуализация и интерактивная часть -->
        <div class="visualization-section">
          <h3>Визуализация рекурсии</h3>
          
          <!-- Ввод параметров -->
          <div class="params-input">
            <label>
              Введите значение:
              <input 
                type="number" 
                v-model.number="inputValue" 
                :min="currentAlgoData.minInput" 
                :max="currentAlgoData.maxInput"
                :disabled="isRunning"
              >
            </label>
            <button @click="runVisualization" :disabled="isRunning || !isValidInput">
              {{ isRunning ? 'Выполняется...' : 'Запустить' }}
            </button>
            <button @click="stepVisualization" :disabled="!isRunning || isAutoPlaying">
              Следующий шаг
            </button>
            <button @click="toggleAutoPlay" :disabled="!isRunning">
              {{ isAutoPlaying ? 'Пауза' : 'Авто' }}
            </button>
            <button @click="resetVisualization" :disabled="!isRunning && callStack.length === 0">
              Сбросить
            </button>
          </div>
          
          <!-- Визуализация стека вызовов -->
          <div class="call-stack-container">
            <h4>Стек вызовов</h4>
            <div class="call-stack">
              <div 
                v-for="(call, index) in callStack" 
                :key="index"
                :class="['stack-frame', { active: index === activeFrameIndex, returning: call.isReturning }]"
              >
                <div class="frame-header">
                  <span class="function-name">{{ currentAlgoData.fnName }}</span>
                  <span class="params">({{ formatParams(call.params) }})</span>
                </div>
                <div v-if="call.isReturning" class="return-value">
                  Возвращает: <span>{{ call.returnValue }}</span>
                </div>
              </div>
              <div v-if="callStack.length === 0" class="empty-stack">
                Стек пуст. Запустите визуализацию, чтобы увидеть вызовы.
              </div>
            </div>
          </div>
          
          <!-- Результат выполнения -->
          <div class="result-section">
            <h4>Результат</h4>
            <div class="result-value" v-if="finalResult !== null">
              {{ finalResult }}
            </div>
            <div class="result-visualization">
              <component 
                :is="currentAlgoData.vizComponent" 
                :call-stack="callStack"
                :result="finalResult"
                :input="inputValue"
              />
            </div>
          </div>
        </div>
      </div>
  
      <!-- Секция советов по рекурсии -->
      <div class="recursion-tips">
        <h3>Советы по работе с рекурсией</h3>
        <ul>
          <li>
            <strong>Базовый случай:</strong> Всегда определяйте базовый случай, который останавливает рекурсию. 
            Без него функция будет вызывать сама себя бесконечно.
          </li>
          <li>
            <strong>Продвижение к базовому случаю:</strong> Каждый рекурсивный вызов должен приближать вас к базовому случаю.
          </li>
          <li>
            <strong>Разделяй и властвуй:</strong> Разбивайте сложную задачу на более простые подзадачи того же типа.
          </li>
          <li>
            <strong>Отслеживайте стек:</strong> Помните, что каждый рекурсивный вызов добавляет фрейм в стек вызовов.
            Слишком глубокая рекурсия может привести к переполнению стека.
          </li>
          <li>
            <strong>Хвостовая рекурсия:</strong> Если рекурсивный вызов является последней операцией в функции,
            это хвостовая рекурсия, которая может быть оптимизирована в некоторых языках программирования.
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onBeforeUnmount, defineComponent } from 'vue';
  
  // Компоненты визуализации для различных алгоритмов
  const FactorialViz = defineComponent({
    props: ['callStack', 'result', 'input'],
    template: `
      <div class="factorial-viz">
        <div class="factor-chain">
          <div v-for="(call, index) in visualSteps" :key="index" class="factor-item">
            <span>{{ call.n }}</span>
            <span v-if="index < visualSteps.length - 1">×</span>
          </div>
          <span v-if="result !== null" class="equals">=</span>
          <span v-if="result !== null" class="result">{{ result }}</span>
        </div>
      </div>
    `,
    computed: {
      visualSteps() {
        if (!this.callStack || this.callStack.length === 0) return [];
        
        // Отображаем только те вызовы, которые уже вернули значение
        return this.callStack.filter(call => call.isReturning)
          .sort((a, b) => a.params[0] - b.params[0])
          .map(call => ({ 
            n: call.params[0], 
            result: call.returnValue 
          }));
      }
    }
  });
  
  const FibonacciViz = defineComponent({
    props: ['callStack', 'result', 'input'],
    template: `
      <div class="fibonacci-viz">
        <div class="fib-tree" v-if="callStack.length > 0">
          <div class="fib-node root">
            <span>fib({{ input }})</span>
            <span v-if="result !== null" class="result">= {{ result }}</span>
          </div>
          <div class="fib-branches" v-if="callStack.length > 1">
            <div class="fib-branch" v-if="input > 1">
              <div class="fib-node">
                <span>fib({{ input - 1 }})</span>
                <span v-if="hasCachedResult(input - 1)" class="result">= {{ getCachedResult(input - 1) }}</span>
              </div>
            </div>
            <div class="fib-branch" v-if="input > 2">
              <div class="fib-node">
                <span>fib({{ input - 2 }})</span>
                <span v-if="hasCachedResult(input - 2)" class="result">= {{ getCachedResult(input - 2) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="fib-sequence" v-if="result !== null">
          <h4>Последовательность Фибоначчи до {{ input }}:</h4>
          <div class="sequence-numbers">
            <span v-for="(num, index) in fibSequence" :key="index" 
                  :class="{'current-number': index === input}">
              {{ num }}
            </span>
          </div>
        </div>
      </div>
    `,
    computed: {
      fibSequence() {
        const sequence = [0, 1];
        for (let i = 2; i <= this.input; i++) {
          sequence.push(sequence[i-1] + sequence[i-2]);
        }
        return sequence;
      }
    },
    methods: {
      hasCachedResult(n) {
        return this.callStack.some(call => call.isReturning && call.params[0] === n);
      },
      getCachedResult(n) {
        const call = this.callStack.find(call => call.isReturning && call.params[0] === n);
        return call ? call.returnValue : null;
      }
    }
  });
  
  const SumToViz = defineComponent({
    props: ['callStack', 'result', 'input'],
    template: `
      <div class="sumto-viz">
        <div class="sum-progression">
          <div v-for="(call, index) in visualSteps" :key="index" class="sum-item" 
               :class="{'returning': call.isReturning }">
            <span>{{ call.params[0] }}</span>
            <span v-if="index < visualSteps.length - 1">+</span>
          </div>
          <span v-if="result !== null" class="equals">=</span>
          <span v-if="result !== null" class="result">{{ result }}</span>
        </div>
        <div class="sum-formula" v-if="result !== null">
          <p>Сумма чисел от 1 до {{ input }} = {{ result }}</p>
          <p>Формула: n(n+1)/2 = {{ input }}×({{ input }}+1)/2 = {{ input * (input + 1) / 2 }}</p>
        </div>
      </div>
    `,
    computed: {
      visualSteps() {
        if (!this.callStack || this.callStack.length === 0) return [];
        
        // Сортируем вызовы от меньшего к большему для наглядности
        return [...this.callStack].sort((a, b) => a.params[0] - b.params[0]);
      }
    }
  });
  
  const TowersOfHanoiViz = defineComponent({
    props: ['callStack', 'result', 'input'],
    template: `
      <div class="hanoi-viz">
        <div class="hanoi-towers">
          <div v-for="(tower, towerIndex) in towers" :key="towerIndex" class="tower">
            <div class="tower-pole"></div>
            <div class="tower-base"></div>
            <div v-for="disk in tower" :key="disk" class="disk" :style="{ width: diskWidth(disk) }">
              {{ disk }}
            </div>
          </div>
        </div>
        <div class="hanoi-moves" v-if="moves.length > 0">
          <h4>Ходы:</h4>
          <div class="move-list">
            <div v-for="(move, index) in moves" :key="index" class="move">
              <span>{{ index + 1 }}. Перенести диск {{ move.disk }} из {{ towerName(move.from) }} в {{ towerName(move.to) }}</span>
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        towers: [[], [], []],
        moves: []
      };
    },
    watch: {
      callStack: {
        handler(newStack) {
          this.processHanoiStack(newStack);
        },
        deep: true,
        immediate: true
      },
      input: {
        handler() {
          this.resetTowers();
        },
        immediate: true
      }
    },
    methods: {
      resetTowers() {
        // Инициализируем башни - все диски на первой башне
        this.towers = [
          [...Array(this.input)].map((_, i) => this.input - i),
          [],
          []
        ];
        this.moves = [];
      },
      processHanoiStack(stack) {
        if (!stack || stack.length === 0) {
          this.resetTowers();
          return;
        }
        
        // Находим завершенные ходы в стеке и обновляем состояние башен
        this.resetTowers();
        
        const completedMoves = stack
          .filter(call => call.isReturning && call.params.length === 4 && typeof call.params[0] === 'number')
          .sort((a, b) => {
            // Сортируем по номеру диска и башням, чтобы получить правильный порядок ходов
            if (a.params[0] !== b.params[0]) return a.params[0] - b.params[0];
            if (a.params[1] !== b.params[1]) return a.params[1] - b.params[1];
            return a.params[2] - b.params[2];
          });
        
        // Применяем каждый ход
        completedMoves.forEach(move => {
          const diskToMove = move.params[0];
          const fromTower = move.params[1] - 1; // Преобразуем 1-индексированные в 0-индексированные
          const toTower = move.params[2] - 1;
          
          // Находим диск во fromTower и перемещаем его в toTower
          const fromIndex = this.towers[fromTower].findIndex(disk => disk === diskToMove);
          if (fromIndex !== -1) {
            const disk = this.towers[fromTower].splice(fromIndex, 1)[0];
            this.towers[toTower].unshift(disk);
            
            this.moves.push({
              disk: diskToMove,
              from: fromTower,
              to: toTower
            });
          }
        });
      },
      diskWidth(diskSize) {
        // Рассчитываем ширину диска в зависимости от его размера
        const baseWidth = 30;
        const increment = 20;
        return `${baseWidth + increment * (diskSize - 1)}px`;
      },
      towerName(index) {
        return ['Башню A', 'Башню B', 'Башню C'][index];
      }
    }
  });
  
  // Определение алгоритмов
  const algorithms = [
    {
      id: 'factorial',
      name: 'Факториал',
      description: 'Факториал числа n (обозначается как n!) - это произведение всех положительных целых чисел от 1 до n. Например, 5! = 5 × 4 × 3 × 2 × 1 = 120.',
      code: `function factorial(n) {
    // Базовый случай
    if (n === 0 || n === 1) {
      return 1;
    }
    
    // Рекурсивный случай
    return n * factorial(n - 1);
  }`,
      explanation: 'Рекурсивная функция factorial разбивает задачу вычисления n! на произведение n и (n-1)!. Базовый случай наступает при n = 0 или n = 1, когда факториал равен 1. Для каждого значения n > 1 функция вызывает себя с параметром n-1.',
      fnName: 'factorial',
      minInput: 0,
      maxInput: 10,
      vizComponent: FactorialViz,
      implementation: function(n) {
        if (n === 0 || n === 1) {
          return 1;
        }
        return n * this.implementation(n - 1);
      }
    },
    {
      id: 'fibonacci',
      name: 'Числа Фибоначчи',
      description: 'Последовательность Фибоначчи - это ряд чисел, где каждое следующее число равно сумме двух предыдущих: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...',
      code: `function fibonacci(n) {
    // Базовые случаи
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    // Рекурсивный случай
    return fibonacci(n - 1) + fibonacci(n - 2);
  }`,
      explanation: 'Функция fibonacci вычисляет n-е число Фибоначчи. Базовые случаи: fib(0) = 0 и fib(1) = 1. Для n > 1 функция вызывает себя дважды, суммируя значения fib(n-1) и fib(n-2). Обратите внимание, что это не самая эффективная реализация из-за дублирования вычислений.',
      fnName: 'fib',
      minInput: 0,
      maxInput: 10,
      vizComponent: FibonacciViz,
      implementation: function(n) {
        if (n === 0) return 0;
        if (n === 1) return 1;
        return this.implementation(n - 1) + this.implementation(n - 2);
      }
    },
    {
      id: 'sumto',
      name: 'Сумма до n',
      description: 'Вычисление суммы всех натуральных чисел от 1 до n. Например, сумма чисел от 1 до 5 равна 1 + 2 + 3 + 4 + 5 = 15.',
      code: `function sumTo(n) {
    // Базовый случай
    if (n === 1) {
      return 1;
    }
    
    // Рекурсивный случай
    return n + sumTo(n - 1);
  }`,
      explanation: 'Функция sumTo вычисляет сумму чисел от 1 до n. Базовый случай: при n = 1 сумма равна 1. Для n > 1 функция возвращает сумму n и суммы чисел от 1 до (n-1).',
      fnName: 'sumTo',
      minInput: 1,
      maxInput: 100,
      vizComponent: SumToViz,
      implementation: function(n) {
        if (n === 1) {
          return 1;
        }
        return n + this.implementation(n - 1);
      }
    },
    {
      id: 'hanoi',
      name: 'Ханойские башни',
      description: 'Головоломка "Ханойские башни" состоит из трёх стержней и нескольких дисков разного размера. Цель игры - переместить все диски с первого стержня на третий, соблюдая правила: за один ход можно перемещать только один диск, и нельзя класть больший диск на меньший.',
      code: `function hanoi(n, source, target, auxiliary) {
    // Базовый случай
    if (n === 1) {
      console.log(\`Переместить диск 1 с \${source} на \${target}\`);
      return;
    }
    
    // Рекурсивные случаи
    // 1. Перемещаем (n-1) дисков с source на auxiliary
    hanoi(n - 1, source, auxiliary, target);
    
    // 2. Перемещаем диск n с source на target
    console.log(\`Переместить диск \${n} с \${source} на \${target}\`);
    
    // 3. Перемещаем (n-1) дисков с auxiliary на target
    hanoi(n - 1, auxiliary, target, source);
  }`,
      explanation: 'Алгоритм решения головоломки "Ханойские башни" разбивает задачу на три подзадачи: 1) переместить (n-1) дисков с исходного стержня на вспомогательный, 2) переместить самый большой диск на целевой стержень, 3) переместить (n-1) дисков с вспомогательного стержня на целевой.',
      fnName: 'hanoi',
      minInput: 1,
      maxInput: 7,
      vizComponent: TowersOfHanoiViz,
      implementation: function(n, source = 1, target = 3, auxiliary = 2) {
        if (n === 1) {
          return [[1, source, target]];
        }
        
        return [
          ...this.implementation(n - 1, source, auxiliary, target),
          [n, source, target],
          ...this.implementation(n - 1, auxiliary, target, source)
        ];
      }
    }
  ];
  
  // Состояние компонента
  const currentAlgorithm = ref('factorial');
  const inputValue = ref(5);
  const callStack = ref([]);
  const finalResult = ref(null);
  const isRunning = ref(false);
  const isAutoPlaying = ref(false);
  const activeFrameIndex = ref(-1);
  const autoPlayTimer = ref(null);
  
  // Вычисляемые свойства
  const currentAlgoData = computed(() => {
    return algorithms.find(algo => algo.id === currentAlgorithm.value);
  });
  
  const isValidInput = computed(() => {
    const value = inputValue.value;
    const { minInput, maxInput } = currentAlgoData.value;
    return !isNaN(value) && value >= minInput && value <= maxInput;
  });
  
  // Методы
  const selectAlgorithm = (algoId) => {
    if (isRunning.value) {
      resetVisualization();
    }
    currentAlgorithm.value = algoId;
    callStack.value = [];
    finalResult.value = null;
    
    // Устанавливаем значение по умолчанию в зависимости от алгоритма
    inputValue.value = algoId === 'factorial' ? 5 : 
                        algoId === 'fibonacci' ? 5 : 
                        algoId === 'sumto' ? 5 : 3;
  };
  
  const formatParams = (params) => {
    return params.join(', ');
  };
  
  // Пошаговая визуализация стека вызовов
  let visualizationSteps = [];
  let currentStepIndex = 0;
  
  const runVisualization = () => {
    if (!isValidInput.value) return;
    
    resetVisualization();
    isRunning.value = true;
    activeFrameIndex.value = -1;
    
    // Подготавливаем шаги визуализации
    prepareVisualizationSteps();
    
    // Если включено авто-воспроизведение, запускаем его
    if (isAutoPlaying.value) {
      startAutoPlay();
    }
  };
  
  const prepareVisualizationSteps = () => {
    visualizationSteps = [];
    currentStepIndex = 0;
    
    // Получаем функцию текущего алгоритма
    const algo = currentAlgoData.value;
    
    // Создаем трассировку выполнения
    traceExecution(algo.implementation, [inputValue.value]);
    
    // Если шаги не пустые, запускаем первый шаг
    if (visualizationSteps.length > 0) {
      stepVisualization();
    }
  };
  
  const traceExecution = (fn, initialParams) => {
    // Создаем обертку для функции, которая будет отслеживать рекурсивные вызовы
    function createTracedFunction(originalFn, fnName) {
      return function traced(...args) {
        // Записываем вход в функцию
        visualizationSteps.push({
          type: 'call',
          fn: fnName,
          params: [...args],
          depth: callStack.value.length
        });
        
        // Выполняем оригинальную функцию с теми же аргументами
        const result = originalFn.apply(this, args);
        
        // Записываем возврат из функции
        visualizationSteps.push({
          type: 'return',
          fn: fnName,
          params: [...args],
          result: result,
          depth: callStack.value.length
        });
        
        return result;
      };
    }
    
    // Создаем специальные версии функций алгоритмов
    let tracedImplementation;
    
    if (currentAlgorithm.value === 'hanoi') {
      // Особая обработка для Ханойских башен
      const moves = [];
      tracedImplementation = function(n, source = 1, target = 3, auxiliary = 2) {
        // Записываем вход в функцию
        visualizationSteps.push({
          type: 'call',
          fn: 'hanoi',
          params: [n, source, target, auxiliary],
          depth: callStack.value.length
        });
        
        if (n === 1) {
          moves.push([1, source, target]);
          // Записываем возврат из функции для базового случая
          visualizationSteps.push({
            type: 'return',
            fn: 'hanoi',
            params: [n, source, target, auxiliary],
            result: [[1, source, target]],
            depth: callStack.value.length
          });
          return [[1, source, target]];
        }
        
        const step1 = tracedImplementation(n - 1, source, auxiliary, target);
        moves.push([n, source, target]);
        const step3 = tracedImplementation(n - 1, auxiliary, target, source);
        
        // Записываем возврат из функции для рекурсивного случая
        const result = [...step1, [n, source, target], ...step3];
        visualizationSteps.push({
          type: 'return',
          fn: 'hanoi',
          params: [n, source, target, auxiliary],
          result: result,
          depth: callStack.value.length
        });
        
        return result;
      };
    } else {
      // Создаем трассированную версию функции алгоритма
      const originalImplementation = fn;
      tracedImplementation = createTracedFunction(originalImplementation.bind({
        implementation: function(...args) {
          // Эта функция будет рекурсивно вызываться из tracedImplementation
          return tracedImplementation(...args);
        }
      }), currentAlgoData.value.fnName);
    }
    
    // Запускаем трассированную функцию
    const result = tracedImplementation(...initialParams);
    
    // Сохраняем итоговый результат
    finalResult.value = result;
  };
  
  const stepVisualization = () => {
    if (!isRunning.value || currentStepIndex >= visualizationSteps.length) {
      if (currentStepIndex >= visualizationSteps.length) {
        isRunning.value = false;
        isAutoPlaying.value = false;
        if (autoPlayTimer.value) {
          clearInterval(autoPlayTimer.value);
          autoPlayTimer.value = null;
        }
      }
      return;
    }
    
    const step = visualizationSteps[currentStepIndex];
    
    if (step.type === 'call') {
      // Добавляем новый вызов в стек
      callStack.value.push({
        params: step.params,
        isReturning: false,
        returnValue: null
      });
      activeFrameIndex.value = callStack.value.length - 1;
    } else if (step.type === 'return') {
      // Находим соответствующий вызов в стеке и отмечаем его как возвращающий
      const depth = step.depth;
      if (depth < callStack.value.length) {
        callStack.value[depth].isReturning = true;
        callStack.value[depth].returnValue = step.result;
        
        // Если это самый верхний фрейм, то он будет удален на следующем шаге
        if (depth === callStack.value.length - 1) {
          activeFrameIndex.value = depth - 1;
        } else {
          activeFrameIndex.value = depth;
        }
        
        // Особая логика для Ханойских башен
        if (currentAlgorithm.value === 'hanoi' && step.params[0] === 1) {
          // Не удаляем фрейм для базового случая Ханойских башен
        } else if (depth === 0) {
          // Если это корневой вызов, сохраняем его результат
          finalResult.value = step.result;
        }
      }
    }
    
    currentStepIndex++;
  };
  
  const resetVisualization = () => {
    if (isAutoPlaying.value) {
      clearInterval(autoPlayTimer.value);
      isAutoPlaying.value = false;
    }
    
    isRunning.value = false;
    callStack.value = [];
    finalResult.value = null;
    activeFrameIndex.value = -1;
    visualizationSteps = [];
    currentStepIndex = 0;
  };
  
  const toggleAutoPlay = () => {
    isAutoPlaying.value = !isAutoPlaying.value;
    
    if (isAutoPlaying.value) {
      startAutoPlay();
    } else {
      if (autoPlayTimer.value) {
        clearInterval(autoPlayTimer.value);
        autoPlayTimer.value = null;
      }
    }
  };
  
  const startAutoPlay = () => {
    if (autoPlayTimer.value) {
      clearInterval(autoPlayTimer.value);
    }
    
    autoPlayTimer.value = setInterval(() => {
      stepVisualization();
      
      if (currentStepIndex >= visualizationSteps.length) {
        clearInterval(autoPlayTimer.value);
        autoPlayTimer.value = null;
        isAutoPlaying.value = false;
      }
    }, 800); // Скорость воспроизведения (в миллисекундах)
  };
  
  // Очистка таймеров при размонтировании компонента
  onBeforeUnmount(() => {
    if (autoPlayTimer.value) {
      clearInterval(autoPlayTimer.value);
    }
  });
  
  // Наблюдение за изменением алгоритма для сброса состояния
  watch(currentAlgorithm, () => {
    resetVisualization();
  });
  </script>
  
  <style scoped>
  .recursion-explorer {
    font-family: 'Arial', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    color: #333;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    color: #2c3e50;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 10px;
  }
  
  .subtitle {
    text-align: center;
    color: #7f8c8d;
    margin-bottom: 30px;
  }
  
  .algorithm-selector {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 30px;
    justify-content: center;
  }
  
  .algorithm-button {
    padding: 10px 20px;
    background-color: #f1f1f1;
    border: 1px solid #ddd;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 1rem;
  }
  
  .algorithm-button:hover {
    background-color: #e9e9e9;
    transform: translateY(-2px);
  }
  
  .algorithm-button.active {
    background-color: #3498db;
    color: white;
    border-color: #2980b9;
    box-shadow: 0 2px 5px rgba(52, 152, 219, 0.3);
  }
  
  .main-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  @media (max-width: 920px) {
    .main-content {
      grid-template-columns: 1fr;
    }
  }
  
  .algorithm-description, .visualization-section {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  }
  
  .algorithm-description h2 {
    color: #2c3e50;
    font-size: 1.5rem;
    margin-top: 0;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  
  .problem-description h3, .code-section h3, .visualization-section h3 {
    color: #34495e;
    font-size: 1.2rem;
    margin-top: 0;
  }
  
  .code-container {
    background-color: #f8f9fa;
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 15px;
    margin-bottom: 15px;
    overflow-x: auto;
  }
  
  .code-container pre {
    margin: 0;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .code-explanation {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #555;
  }
  
  .params-input {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    align-items: center;
  }
  
  .params-input label {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  .params-input input[type="number"] {
    width: 70px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .params-input button {
    padding: 8px 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .params-input button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .params-input button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .call-stack-container {
    margin-bottom: 20px;
  }
  
  .call-stack-container h4 {
    margin-top: 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }
  
  .call-stack {
    background-color: #f8f9fa;
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 10px;
    min-height: 120px;
    display: flex;
    flex-direction: column-reverse;
    gap: 8px;
    max-height: 300px;
    overflow-y: auto;
  }
  
  .stack-frame {
    background-color: #fff;
    border-left: 3px solid #3498db;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;
  }
  
  .stack-frame.active {
    background-color: #e3f2fd;
    border-left-color: #2196f3;
    box-shadow: 0 1px 5px rgba(33, 150, 243, 0.2);
  }
  
  .stack-frame.returning {
    border-left-color: #27ae60;
    background-color: #e8f5e9;
  }
  
  .frame-header {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
  
  .function-name {
    font-weight: bold;
    color: #3498db;
    margin-right: 5px;
  }
  
  .params {
    color: #e74c3c;
  }
  
  .return-value {
    margin-top: 8px;
    border-top: 1px solid #e0e0e0;
    padding-top: 5px;
    color: #27ae60;
    font-weight: bold;
  }
  
  .empty-stack {
    color: #7f8c8d;
    text-align: center;
    font-style: italic;
    padding: 20px 0;
  }
  
  .result-section {
    margin-top: 20px;
  }
  
  .result-section h4 {
    margin-top: 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }
  
  .result-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #27ae60;
    margin-bottom: 15px;
    text-align: center;
  }
  
  .result-visualization {
    background-color: #f8f9fa;
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 15px;
    min-height: 100px;
  }
  
  .recursion-tips {
    background-color: #e8f5e9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  }
  
  .recursion-tips h3 {
    color: #2c3e50;
    margin-top: 0;
    border-bottom: 2px solid #4caf50;
    padding-bottom: 10px;
    margin-bottom: 15px;
  }
  
  .recursion-tips ul {
    margin: 0;
    padding-left: 20px;
  }
  
  .recursion-tips li {
    margin-bottom: 10px;
    line-height: 1.6;
  }
  
  .recursion-tips strong {
    color: #2c3e50;
  }
  
  /* Стили для визуализации факториала */
  .factorial-viz {
    padding: 10px;
  }
  
  .factor-chain {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    font-size: 1.2rem;
  }
  
  .factor-item {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .equals {
    margin: 0 10px;
    font-weight: bold;
  }
  
  .result {
    font-weight: bold;
    color: #27ae60;
  }
  
  /* Стили для визуализации Фибоначчи */
  .fibonacci-viz {
    padding: 10px;
  }
  
  .fib-tree {
    margin-bottom: 20px;
  }
  
  .fib-node {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 50%;
    padding: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    min-width: 80px;
    min-height: 80px;
    position: relative;
    flex-direction: column;
  }
  
  .fib-node.root {
    background-color: #e3f2fd;
    border-color: #2196f3;
  }
  
  .fib-branches {
    display: flex;
    justify-content: center;
    gap: 20px;
    position: relative;
    margin-top: 15px;
  }
  
  .fib-branches:before {
    content: '';
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 15px;
    background-color: #aaa;
  }
  
  .fib-branch {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  
  .fib-branch:before {
    content: '';
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 15px;
    background-color: #aaa;
  }
  
  .fib-sequence {
    margin-top: 20px;
    text-align: center;
  }
  
  .fib-sequence h4 {
    margin-bottom: 10px;
  }
  
  .sequence-numbers {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
  
  .sequence-numbers span {
    padding: 5px 10px;
    background-color: #f1f1f1;
    border-radius: 4px;
    min-width: 30px;
    text-align: center;
  }
  
  .sequence-numbers span.current-number {
    background-color: #e3f2fd;
    font-weight: bold;
    border: 1px solid #2196f3;
  }
  
  /* Стили для визуализации sumTo */
  .sumto-viz {
    padding: 10px;
  }
  
  .sum-progression {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    font-size: 1.2rem;
    margin-bottom: 15px;
  }
  
  .sum-item {
    padding: 5px 10px;
    background-color: #f1f1f1;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .sum-item.returning {
    background-color: #e8f5e9;
    border: 1px solid #4caf50;
  }
  
  .sum-formula {
    margin-top: 15px;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 4px;
  }
  
  /* Стили для визуализации Ханойских башен */
  .hanoi-viz {
    padding: 10px;
  }
  
  .hanoi-towers {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    height: 150px;
  }
  
  .tower {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    position: relative;
    width: 120px;
  }
  
  .tower-pole {
    position: absolute;
    bottom: 0;
    width: 6px;
    height: 120px;
    background-color: #795548;
    z-index: 1;
  }
  
  .tower-base {
    width: 100px;
    height: 10px;
    background-color: #795548;
    border-radius: 3px;
    margin-bottom: 10px;
  }
  
  .disk {
    height: 20px;
    background-color: #3498db;
    border-radius: 10px;
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    z-index: 2;
  }
  
  .hanoi-moves {
    margin-top: 20px;
  }
  
  .hanoi-moves h4 {
    margin-bottom: 10px;
  }
  
  .move-list {
    background-color: #f8f9fa;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 10px;
    max-height: 150px;
    overflow-y: auto;
  }
  
  .move {
    padding: 5px 0;
    border-bottom: 1px solid #eee;
  }
  
  .move:last-child {
    border-bottom: none;
  }
  </style>