<template>
    <div class="array-diff-explainer">
      <h1>Разность массивов: поиск уникальных элементов</h1>
      <p class="task-description">
        Задача: написать функцию, которая вернёт те значения из первого массива, которых нет во втором массиве.
      </p>
      
      <div class="example-container">
        <div class="example-title">Пример исходных данных:</div>
        <div class="arrays-container">
          <div class="array">
            <div class="array-name">longArr1:</div>
            <div class="array-values">
              <div 
                v-for="(num, index) in initialArray1" 
                :key="`arr1-${index}`" 
                class="array-item"
                :class="{ 'highlight': highlightItemsArr1.includes(index) }"
              >
                {{ num }}
              </div>
            </div>
          </div>
          <div class="array">
            <div class="array-name">longArr2:</div>
            <div class="array-values">
              <div 
                v-for="(num, index) in initialArray2" 
                :key="`arr2-${index}`" 
                class="array-item"
                :class="{ 'highlight-compare': highlightItemsArr2.includes(index) }"
              >
                {{ num }}
              </div>
            </div>
          </div>
        </div>
        <div class="result-array" v-if="showResult">
          <div class="array-name">Результат:</div>
          <div class="array-values">
            <div 
              v-for="(num, index) in resultArray" 
              :key="`result-${index}`" 
              class="array-item result-item"
              :class="{ 'highlight-result': highlightResultItems.includes(index) }"
            >
              {{ num }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="algorithm-selector">
        <h2>Выберите алгоритм:</h2>
        <div class="selector-buttons">
          <button 
            v-for="(algo, index) in algorithms" 
            :key="index" 
            @click="selectAlgorithm(index)"
            :class="{ active: currentAlgorithm === index }"
          >
            {{ algo.name }}
          </button>
        </div>
      </div>
      
      <div class="current-algorithm" v-if="algorithms[currentAlgorithm]">
        <h3>{{ algorithms[currentAlgorithm].name }}</h3>
        <div class="algorithm-description">
          <p>{{ algorithms[currentAlgorithm].description }}</p>
        </div>
        
        <div class="code-container">
          <pre class="code"><code>{{ algorithms[currentAlgorithm].code }}</code></pre>
        </div>
        
        <div class="time-complexity">
          <strong>Временная сложность:</strong> {{ algorithms[currentAlgorithm].timeComplexity }}
        </div>
        <div class="advantages">
          <strong>Преимущества:</strong> {{ algorithms[currentAlgorithm].advantages }}
        </div>
        <div class="disadvantages">
          <strong>Недостатки:</strong> {{ algorithms[currentAlgorithm].disadvantages }}
        </div>
      </div>
      
      <div class="animation-controls">
        <button 
          @click="startAnimation" 
          :disabled="isAnimating" 
          class="start-button"
        >
          {{ isAnimating ? 'Анимация идёт...' : 'Запустить анимацию' }}
        </button>
        <button 
          @click="resetAnimation" 
          :disabled="!showResult" 
          class="reset-button"
        >
          Сбросить
        </button>
      </div>
      
      <div class="algorithm-steps" v-if="showSteps">
        <h3>Шаги алгоритма:</h3>
        <div 
          v-for="(step, index) in steps" 
          :key="index" 
          class="step"
          :class="{ 'current-step': currentStep === index }"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">{{ step }}</div>
        </div>
      </div>
      
      <div class="explanation" v-if="showExplanation">
        <h3>Подробное объяснение:</h3>
        <div class="explanation-text">
          <p>{{ currentExplanation }}</p>
        </div>
      </div>
      
      <div class="pitfalls-section">
        <h3>Подводные камни при решении задачи:</h3>
        <ul class="pitfalls-list">
          <li>
            <strong>Дубликаты:</strong> Если в первом массиве есть повторяющиеся значения, все они должны сохраниться в результате, если их нет во втором массиве.
          </li>
          <li>
            <strong>Производительность:</strong> Для небольших массивов разница в производительности разных подходов незаметна, но для больших массивов (тысячи элементов) это становится критичным.
          </li>
          <li>
            <strong>Порядок элементов:</strong> В некоторых решениях порядок элементов в результате может отличаться от их исходного порядка в первом массиве.
          </li>
          <li>
            <strong>Работа с разными типами данных:</strong> Если массивы содержат объекты или другие сложные типы данных, нужно адаптировать функцию сравнения.
          </li>
          <li>
            <strong>Мутации входных данных:</strong> Некоторые решения (как с сортировкой) могут изменять исходные массивы, если не сделать их копии.
          </li>
        </ul>
      </div>
      
      <div class="algorithms-comparison">
        <h3>Сравнение алгоритмов:</h3>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Алгоритм</th>
              <th>Временная сложность</th>
              <th>Сохранение порядка</th>
              <th>Простота реализации</th>
              <th>Лучше всего подходит для</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>filter + includes</td>
              <td>O(n×m)</td>
              <td>Да</td>
              <td>Очень просто</td>
              <td>Маленьких массивов, когда важна читаемость кода</td>
            </tr>
            <tr>
              <td>Set</td>
              <td>O(n+m)</td>
              <td>Да</td>
              <td>Просто</td>
              <td>Большинства практических задач</td>
            </tr>
            <tr>
              <td>Вложенные циклы</td>
              <td>O(n×m)</td>
              <td>Да</td>
              <td>Просто</td>
              <td>Образовательных целей, понимания алгоритма</td>
            </tr>
            <tr>
              <td>Сортировка + два указателя</td>
              <td>O(n log n + m log m)</td>
              <td>Нет</td>
              <td>Сложно</td>
              <td>Больших отсортированных массивов</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="conclusion">
        <h3>Вывод:</h3>
        <p>
          Для решения задачи нахождения значений из первого массива, которых нет во втором, оптимальным решением в большинстве случаев будет использование множества Set. Этот подход обеспечивает линейную временную сложность O(n+m) и прост в реализации. 
        </p>
        <p>
          Для маленьких массивов подойдет и решение с filter + includes из-за его краткости и читаемости. В учебных целях полезно разобрать решение с вложенными циклами, а для специфических сценариев с большими предварительно отсортированными массивами можно рассмотреть алгоритм с двумя указателями.
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onBeforeUnmount } from 'vue';
  
  // Исходные массивы
  const initialArray1 = ref([1, 4, 3, 2]);
  const initialArray2 = ref([1, 2]);
  const resultArray = ref([]);
  
  // Состояние анимации
  const isAnimating = ref(false);
  const showResult = ref(false);
  const showSteps = ref(false);
  const showExplanation = ref(false);
  const currentStep = ref(0);
  const highlightItemsArr1 = ref([]);
  const highlightItemsArr2 = ref([]);
  const highlightResultItems = ref([]);
  const currentExplanation = ref('');
  
  // Таймеры для анимации
  let animationTimers = [];
  
  // Определяем алгоритмы
  const algorithms = [
    {
      name: "filter + includes",
      description: "Этот подход использует встроенные методы массивов: filter для создания нового массива с элементами, удовлетворяющими условию, и includes для проверки наличия элемента во втором массиве.",
      code: `const func = (longArr1: number[], longArr2: number[]) => {
    return longArr1.filter(item => !longArr2.includes(item));
  };
  
  console.log(func([1, 4, 3, 2], [1, 2])); // [4, 3]`,
      timeComplexity: "O(n×m), где n - длина первого массива, m - длина второго массива",
      advantages: "Очень лаконичное решение, легко читать и понимать код",
      disadvantages: "Низкая производительность на больших массивах из-за вложенного includes (O(m) на каждой итерации filter)",
      steps: [
        "Перебираем каждый элемент из первого массива с помощью filter",
        "Для каждого элемента проверяем, есть ли он во втором массиве (используя includes)",
        "Если элемента нет во втором массиве, включаем его в результат",
        "Возвращаем отфильтрованный массив"
      ],
      explanations: [
        "Метод filter создаёт новый массив, включая только те элементы, для которых функция-предикат возвращает true",
        "Для элемента 1: includes проверяет, есть ли он во втором массиве (есть) → результат !true = false → не включаем",
        "Для элемента 4: includes проверяет, есть ли он во втором массиве (нет) → результат !false = true → включаем",
        "Для элемента 3: includes проверяет, есть ли он во втором массиве (нет) → результат !false = true → включаем",
        "Для элемента 2: includes проверяет, есть ли он во втором массиве (есть) → результат !true = false → не включаем",
        "Результат: [4, 3]"
      ]
    },
    {
      name: "Set",
      description: "Этот подход использует структуру данных Set, которая обеспечивает быстрый поиск элементов за константное время O(1).",
      code: `const func = (longArr1: number[], longArr2: number[]) => {
    const set2 = new Set(longArr2);
    return longArr1.filter(item => !set2.has(item));
  };
  
  console.log(func([1, 4, 3, 2], [1, 2])); // [4, 3]`,
      timeComplexity: "O(n+m), где n - длина первого массива, m - длина второго массива",
      advantages: "Высокая производительность за счёт быстрого поиска в Set (O(1))",
      disadvantages: "Немного сложнее для понимания, чем решение с filter + includes",
      steps: [
        "Создаём Set из элементов второго массива",
        "Перебираем каждый элемент из первого массива с помощью filter",
        "Для каждого элемента проверяем, есть ли он в Set (используя метод has)",
        "Если элемента нет в Set, включаем его в результат",
        "Возвращаем отфильтрованный массив"
      ],
      explanations: [
        "Создаём Set из второго массива: new Set([1, 2]) → {1, 2}. Это обеспечивает константную скорость поиска O(1)",
        "Для элемента 1: set2.has(1) проверяет, есть ли он в Set (есть) → результат !true = false → не включаем",
        "Для элемента 4: set2.has(4) проверяет, есть ли он в Set (нет) → результат !false = true → включаем",
        "Для элемента 3: set2.has(3) проверяет, есть ли он в Set (нет) → результат !false = true → включаем",
        "Для элемента 2: set2.has(2) проверяет, есть ли он в Set (есть) → результат !true = false → не включаем",
        "Результат: [4, 3]"
      ]
    },
    {
      name: "Вложенные циклы",
      description: "Классический подход с использованием двух вложенных циклов. Хотя он наименее эффективен, он демонстрирует базовое понимание алгоритма.",
      code: `const func = (longArr1: number[], longArr2: number[]) => {
    const result: number[] = [];
    
    for (const item of longArr1) {
      let exists = false;
      
      for (const item2 of longArr2) {
        if (item === item2) {
          exists = true;
          break;
        }
      }
      
      if (!exists) {
        result.push(item);
      }
    }
    
    return result;
  };
  
  console.log(func([1, 4, 3, 2], [1, 2])); // [4, 3]`,
      timeComplexity: "O(n×m), где n - длина первого массива, m - длина второго массива",
      advantages: "Простой для понимания, не использует встроенные методы массивов",
      disadvantages: "Низкая производительность на больших массивах из-за вложенного цикла",
      steps: [
        "Создаём пустой массив для результата",
        "Перебираем каждый элемент из первого массива",
        "Для каждого элемента проверяем, есть ли он во втором массиве, используя вложенный цикл",
        "Если элемента нет во втором массиве, добавляем его в результат",
        "Возвращаем массив результатов"
      ],
      explanations: [
        "Создаём пустой массив result для хранения результатов",
        "Для элемента 1: проверяем, есть ли он во втором массиве (есть) → пропускаем",
        "Для элемента 4: проверяем, есть ли он во втором массиве (нет) → добавляем в result",
        "Для элемента 3: проверяем, есть ли он во втором массиве (нет) → добавляем в result",
        "Для элемента 2: проверяем, есть ли он во втором массиве (есть) → пропускаем",
        "Результат: [4, 3]"
      ]
    },
    {
      name: "Сортировка + два указателя",
      description: "Продвинутый алгоритм, который сначала сортирует оба массива, а затем использует два указателя для эффективного сравнения элементов.",
      code: `const func = (longArr1: number[], longArr2: number[]) => {
    // Создаём копии массивов, чтобы не изменять оригиналы
    const sortedArr1 = [...longArr1].sort((a, b) => a - b);
    const sortedArr2 = [...longArr2].sort((a, b) => a - b);
    
    const result: number[] = [];
    let i = 0, j = 0;
    
    while (i < sortedArr1.length) {
      if (j >= sortedArr2.length || sortedArr1[i] < sortedArr2[j]) {
        result.push(sortedArr1[i]);
        i++;
      } else if (sortedArr1[i] > sortedArr2[j]) {
        j++;
      } else {
        i++;
        j++;
      }
    }
    
    return result;
  };
  
  console.log(func([1, 4, 3, 2], [1, 2])); // [3, 4]`,
      timeComplexity: "O(n log n + m log m), где n - длина первого массива, m - длина второго массива",
      advantages: "Эффективен для больших отсортированных массивов",
      disadvantages: "Сложный для понимания и реализации, меняет порядок элементов в результате",
      steps: [
        "Сортируем оба массива (создавая их копии, чтобы не изменять оригиналы)",
        "Инициализируем два указателя i и j, начиная с 0",
        "Перебираем элементы, сравнивая текущие значения в обоих массивах",
        "Если элемент из первого массива меньше или второй массив закончился, добавляем элемент в результат и увеличиваем i",
        "Если элемент из первого массива больше, увеличиваем j",
        "Если элементы равны, увеличиваем оба указателя (пропускаем элемент)",
        "Возвращаем массив результатов"
      ],
      explanations: [
        "Сортируем массивы: [1, 4, 3, 2] → [1, 2, 3, 4] и [1, 2] остаётся тем же",
        "Начинаем с i=0, j=0: сравниваем элементы 1 и 1 - они равны → увеличиваем оба указателя (i=1, j=1)",
        "Сравниваем элементы 2 и 2 - они равны → увеличиваем оба указателя (i=2, j=2)",
        "j=2 вышло за пределы второго массива → добавляем все оставшиеся элементы из первого массива",
        "Добавляем элемент 3 (i=2) в результат и увеличиваем i до 3",
        "Добавляем элемент 4 (i=3) в результат и увеличиваем i до 4",
        "i=4 вышло за пределы первого массива → завершаем",
        "Результат: [3, 4] (обратите внимание на порядок - он отличается от исходного из-за сортировки)"
      ]
    }
  ];
  
  // Текущий выбранный алгоритм
  const currentAlgorithm = ref(0);
  const steps = computed(() => algorithms[currentAlgorithm.value].steps);
  
  // Выбрать алгоритм
  function selectAlgorithm(index) {
    currentAlgorithm.value = index;
    resetAnimation();
  }
  
  // Запустить анимацию
  function startAnimation() {
    // Сбрасываем предыдущую анимацию
    resetAnimation();
    
    // Начинаем новую анимацию
    isAnimating.value = true;
    showSteps.value = true;
    
    algorithm = algorithms[currentAlgorithm.value];
    
    // Очищаем старые таймеры
    clearTimers();
    
    // Запускаем анимацию в зависимости от выбранного алгоритма
    switch (currentAlgorithm.value) {
      case 0: // filter + includes
        animateFilterIncludes();
        break;
      case 1: // Set
        animateSetApproach();
        break;
      case 2: // Вложенные циклы
        animateNestedLoops();
        break;
      case 3: // Сортировка + два указателя
        animateSortedPointers();
        break;
    }
  }
  
  // Анимация для подхода filter + includes
  function animateFilterIncludes() {
    const explanations = algorithms[0].explanations;
    resultArray.value = [];
    
    // Для каждого элемента в первом массиве
    for (let i = 0; i < initialArray1.value.length; i++) {
      // Добавляем таймер для анимации каждого элемента
      const timer1 = setTimeout(() => {
        currentStep.value = Math.min(i, steps.value.length - 1);
        highlightItemsArr1.value = [i];
        showExplanation.value = true;
        currentExplanation.value = explanations[i+1];
        
        // Проверяем, есть ли элемент во втором массиве
        const item = initialArray1.value[i];
        const inArr2 = initialArray2.value.includes(item);
        
        // Подсвечиваем элементы во втором массиве
        highlightItemsArr2.value = initialArray2.value.map((val, idx) => val === item ? idx : -1).filter(idx => idx !== -1);
        
        // Если элемента нет во втором массиве, добавляем его в результат
        if (!inArr2) {
          const timer2 = setTimeout(() => {
            resultArray.value.push(item);
            showResult.value = true;
            highlightResultItems.value = [resultArray.value.length - 1];
          }, 500);
          animationTimers.push(timer2);
        }
      }, i * 1500);
      animationTimers.push(timer1);
    }
    
    // Завершение анимации
    const timerEnd = setTimeout(() => {
      highlightItemsArr1.value = [];
      highlightItemsArr2.value = [];
      highlightResultItems.value = [];
      isAnimating.value = false;
      currentExplanation.value = explanations[explanations.length - 1];
    }, initialArray1.value.length * 1500 + 500);
    animationTimers.push(timerEnd);
  }
  
  // Анимация для подхода с Set
  function animateSetApproach() {
    const explanations = algorithms[1].explanations;
    resultArray.value = [];
    
    // Создаём Set из второго массива (анимация)
    const timer0 = setTimeout(() => {
      currentStep.value = 0;
      highlightItemsArr2.value = Array.from({ length: initialArray2.value.length }, (_, i) => i);
      showExplanation.value = true;
      currentExplanation.value = explanations[0];
    }, 1000);
    animationTimers.push(timer0);
    
    // Для каждого элемента в первом массиве
    for (let i = 0; i < initialArray1.value.length; i++) {
      // Добавляем таймер для анимации каждого элемента
      const timer1 = setTimeout(() => {
        currentStep.value = Math.min(i + 1, steps.value.length - 1);
        highlightItemsArr1.value = [i];
        highlightItemsArr2.value = [];
        showExplanation.value = true;
        currentExplanation.value = explanations[i+1];
        
        // Проверяем, есть ли элемент в Set
        const item = initialArray1.value[i];
        const inSet = new Set(initialArray2.value).has(item);
        
        // Подсвечиваем элементы во втором массиве
        highlightItemsArr2.value = initialArray2.value.map((val, idx) => val === item ? idx : -1).filter(idx => idx !== -1);
        
        // Если элемента нет в Set, добавляем его в результат
        if (!inSet) {
          const timer2 = setTimeout(() => {
            resultArray.value.push(item);
            showResult.value = true;
            highlightResultItems.value = [resultArray.value.length - 1];
          }, 500);
          animationTimers.push(timer2);
        }
      }, i * 1500 + 1500);
      animationTimers.push(timer1);
    }
    
    // Завершение анимации
    const timerEnd = setTimeout(() => {
      highlightItemsArr1.value = [];
      highlightItemsArr2.value = [];
      highlightResultItems.value = [];
      isAnimating.value = false;
      currentExplanation.value = explanations[explanations.length - 1];
    }, initialArray1.value.length * 1500 + 2000);
    animationTimers.push(timerEnd);
  }
  
  // Анимация для подхода с вложенными циклами
  function animateNestedLoops() {
    const explanations = algorithms[2].explanations;
    resultArray.value = [];
    
    // Инициализация пустого массива результатов
    const timer0 = setTimeout(() => {
      currentStep.value = 0;
      showExplanation.value = true;
      currentExplanation.value = explanations[0];
    }, 1000);
    animationTimers.push(timer0);
    
    // Для каждого элемента в первом массиве
    for (let i = 0; i < initialArray1.value.length; i++) {
      // Добавляем таймер для анимации каждого элемента
      const timer1 = setTimeout(() => {
        currentStep.value = Math.min(i + 1, steps.value.length - 1);
        highlightItemsArr1.value = [i];
        highlightItemsArr2.value = [];
        showExplanation.value = true;
        currentExplanation.value = explanations[i+1];
        
        // Проверяем, есть ли элемент во втором массиве
        const item = initialArray1.value[i];
        exists = false;
        
        for (let j = 0; j < initialArray2.value.length; j++) {
          const timer2 = setTimeout(() => {
            highlightItemsArr2.value = [j];
            if (initialArray2.value[j] === item) {
              exists = true;
            }
          }, j * 300);
          animationTimers.push(timer2);
        }
        
        // Если элемента нет во втором массиве, добавляем его в результат
        const timer3 = setTimeout(() => {
          if (!initialArray2.value.includes(item)) {
            resultArray.value.push(item);
            showResult.value = true;
            highlightResultItems.value = [resultArray.value.length - 1];
          }
        }, initialArray2.value.length * 300 + 300);
        animationTimers.push(timer3);
      }, i * (initialArray2.value.length * 300 + 800) + 1500);
      animationTimers.push(timer1);
    }
    
    // Завершение анимации
    const timerEnd = setTimeout(() => {
      highlightItemsArr1.value = [];
      highlightItemsArr2.value = [];
      highlightResultItems.value = [];
      isAnimating.value = false;
      currentExplanation.value = explanations[explanations.length - 1];
    }, initialArray1.value.length * (initialArray2.value.length * 300 + 800) + 2000);
    animationTimers.push(timerEnd);
  }
  
  // Анимация для подхода с сортировкой и двумя указателями
  function animateSortedPointers() {
    const explanations = algorithms[3].explanations;
    resultArray.value = [];
    
    // Временные массивы для анимации
    const sortedArr1 = [...initialArray1.value].sort((a, b) => a - b);
    const sortedArr2 = [...initialArray2.value].sort((a, b) => a - b);
    
    // Анимация сортировки
    const timer0 = setTimeout(() => {
      currentStep.value = 0;
      showExplanation.value = true;
      currentExplanation.value = explanations[0];
    }, 1000);
    animationTimers.push(timer0);
    
    // Инициализация указателей
    let i = 0, j = 0;
    
    // Анимация процесса с двумя указателями
    function animateStep() {
      if (i >= sortedArr1.length) {
        // Завершение анимации
        const timerEnd = setTimeout(() => {
          highlightItemsArr1.value = [];
          highlightItemsArr2.value = [];
          highlightResultItems.value = [];
          isAnimating.value = false;
          currentExplanation.value = explanations[explanations.length - 1];
        }, 1000);
        animationTimers.push(timerEnd);
        return;
      }
      
      // Подсвечиваем текущие элементы
      highlightItemsArr1.value = [i];
      highlightItemsArr2.value = j < sortedArr2.length ? [j] : [];
      
      // Обновляем шаг и объяснение
      currentStep.value = Math.min(1 + Math.floor(i/2), steps.value.length - 1);
      showExplanation.value = true;
      currentExplanation.value = explanations[1 + Math.min(i, explanations.length - 2)];
      
      // Логика сравнения указателей
      if (j >= sortedArr2.length || sortedArr1[i] < sortedArr2[j]) {
        // Добавляем элемент в результат
        const timer1 = setTimeout(() => {
          resultArray.value.push(sortedArr1[i]);
          showResult.value = true;
          highlightResultItems.value = [resultArray.value.length - 1];
          i++;
          
          // Переходим к следующему шагу
          const timer2 = setTimeout(animateStep, 1000);
          animationTimers.push(timer2);
        }, 500);
        animationTimers.push(timer1);
      } else if (sortedArr1[i] > sortedArr2[j]) {
        j++;
        const timer3 = setTimeout(animateStep, 1000);
        animationTimers.push(timer3);
      } else {
        i++;
        j++;
        const timer4 = setTimeout(animateStep, 1000);
        animationTimers.push(timer4);
      }
    }
    
    // Запускаем анимацию шагов
    const timerStart = setTimeout(animateStep, 2000);
    animationTimers.push(timerStart);
  }
  
  // Сбросить анимацию
  function resetAnimation() {
    clearTimers();
    
    isAnimating.value = false;
    showResult.value = false;
    showSteps.value = false;
    showExplanation.value = false;
    currentStep.value = 0;
    highlightItemsArr1.value = [];
    highlightItemsArr2.value = [];
    highlightResultItems.value = [];
    resultArray.value = [];
  }
  
  // Очистить все таймеры
  function clearTimers() {
    animationTimers.forEach(timerId => clearTimeout(timerId));
    animationTimers = [];
  }
  
  // Очистка таймеров при размонтировании компонента
  onBeforeUnmount(() => {
    clearTimers();
  });
  </script>
  
  <style scoped>
  .array-diff-explainer {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #333;
  }
  
  h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .task-description {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 1.1rem;
    border-left: 4px solid #3498db;
  }
  
  .example-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
  }
  
  .example-title {
    font-weight: bold;
    margin-bottom: 15px;
    color: #2c3e50;
  }
  
  .arrays-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .array {
    display: flex;
    flex-direction: column;
  }
  
  .array-name {
    font-weight: bold;
    margin-bottom: 10px;
    color: #3498db;
  }
  
  .array-values {
    display: flex;
    gap: 10px;
  }
  
  .array-item {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    font-weight: bold;
    transition: all 0.3s ease;
  }
  
  .array-item.highlight {
    background-color: #3498db;
    color: white;
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .array-item.highlight-compare {
    background-color: #e74c3c;
    color: white;
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .result-array {
    margin-top: 20px;
    animation: fadeIn 0.5s ease;
  }
  
  .result-item {
    background-color: #f1c40f;
    color: #333;
  }
  
  .result-item.highlight-result {
    background-color: #2ecc71;
    color: white;
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .algorithm-selector {
    margin-bottom: 30px;
  }
  
  .algorithm-selector h2 {
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  .selector-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .selector-buttons button {
    padding: 10px 15px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .selector-buttons button:hover {
    background-color: #e9ecef;
  }
  
  .selector-buttons button.active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }
  
  .current-algorithm {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    animation: fadeIn 0.5s ease;
  }
  
  .current-algorithm h3 {
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  .algorithm-description {
    margin-bottom: 20px;
  }
  
  .code-container {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    overflow-x: auto;
  }
  
  .code {
    font-family: monospace;
    font-size: 14px;
    line-height: 1.5;
    white-space: pre;
  }
  
  .time-complexity, .advantages, .disadvantages {
    margin-bottom: 10px;
  }
  
  .animation-controls {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
  }
  
  .start-button, .reset-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .start-button {
    background-color: #3498db;
    color: white;
  }
  
  .start-button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .reset-button {
    background-color: #e74c3c;
    color: white;
  }
  
  .reset-button:hover:not(:disabled) {
    background-color: #c0392b;
  }
  
  .start-button:disabled, .reset-button:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
  
  .algorithm-steps {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    animation: fadeIn 0.5s ease;
  }
  
  .algorithm-steps h3 {
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  .step {
    display: flex;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .step-number {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3498db;
    color: white;
    border-radius: 50%;
    margin-right: 15px;
    font-weight: bold;
  }
  
  .step-content {
    flex: 1;
  }
  
  .step.current-step {
    background-color: #f1f8ff;
    border-left: 4px solid #3498db;
  }
  
  .explanation {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    animation: fadeIn 0.5s ease;
  }
  
  .explanation h3 {
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  .explanation-text {
    line-height: 1.6;
  }
  
  .pitfalls-section {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
  }
  
  .pitfalls-section h3 {
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  .pitfalls-list {
    padding-left: 20px;
  }
  
  .pitfalls-list li {
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  .algorithms-comparison {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
  }
  
  .algorithms-comparison h3 {
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    overflow-x: auto;
    display: block;
  }
  
  .comparison-table th, .comparison-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #e9ecef;
  }
  
  .comparison-table th {
    background-color: #f8f9fa;
    font-weight: bold;
    color: #2c3e50;
  }
  
  .comparison-table tr:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  .comparison-table tr:hover {
    background-color: #f1f8ff;
  }
  
  .conclusion {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #2ecc71;
  }
  
  .conclusion h3 {
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  .conclusion p {
    margin-bottom: 10px;
    line-height: 1.6;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Адаптивная верстка */
  @media (max-width: 768px) {
    .arrays-container {
      flex-direction: column;
    }
    
    .selector-buttons {
      flex-direction: column;
    }
    
    .comparison-table {
      font-size: 0.9rem;
    }
  }
  </style>