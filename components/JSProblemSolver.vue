<template>
    <div class="problem-solver">
      <header class="header">
        <h1>JavaScript Алгоритмы: Стратегии Решения Задач</h1>
        <p class="intro-text">Изучите эффективные стратегии и подходы к решению типичных задач JavaScript</p>
      </header>
  
      <div class="approach-navigator">
        <button 
          v-for="(approach, index) in approaches" 
          :key="approach.id"
          :class="{ active: currentApproachIndex === index }"
          @click="selectApproach(index)"
        >
          {{ approach.title }}
        </button>
      </div>
  
      <div class="content-container">
        <!-- Текущий выбранный подход -->
        <div class="current-approach">
          <h2>{{ currentApproach.title }}</h2>
          <div class="approach-description" v-html="currentApproach.description"></div>
          
          <!-- Когда использовать этот подход -->
          <div class="when-to-use">
            <h3>Когда использовать</h3>
            <ul>
              <li v-for="(item, i) in currentApproach.whenToUse" :key="i">{{ item }}</li>
            </ul>
          </div>
          
          <!-- Пример задачи -->
          <div class="example-problem">
            <h3>Пример задачи</h3>
            <div class="problem-statement">{{ currentApproach.example.problem }}</div>
            
            <div class="code-tabs">
              <button 
                :class="{ active: currentCodeTab === 'problemCode' }"
                @click="currentCodeTab = 'problemCode'"
              >
                Задача
              </button>
              <button 
                :class="{ active: currentCodeTab === 'solutionCode' }"
                @click="currentCodeTab = 'solutionCode'"
              >
                Решение
              </button>
              <button 
                :class="{ active: currentCodeTab === 'explanation' }"
                @click="currentCodeTab = 'explanation'"
              >
                Объяснение
              </button>
            </div>
            
            <div class="code-container">
              <pre v-if="currentCodeTab === 'problemCode'" class="code"><code>{{ currentApproach.example.problemCode }}</code></pre>
              <pre v-if="currentCodeTab === 'solutionCode'" class="code"><code>{{ currentApproach.example.solutionCode }}</code></pre>
              <div v-if="currentCodeTab === 'explanation'" class="explanation" v-html="currentApproach.example.explanation"></div>
            </div>
          </div>
          
          <!-- Плюсы и минусы подхода -->
          <div class="pros-cons">
            <div class="pros">
              <h3>Преимущества</h3>
              <ul>
                <li v-for="(pro, i) in currentApproach.pros" :key="i">{{ pro }}</li>
              </ul>
            </div>
            <div class="cons">
              <h3>Ограничения</h3>
              <ul>
                <li v-for="(con, i) in currentApproach.cons" :key="i">{{ con }}</li>
              </ul>
            </div>
          </div>
          
          <!-- Дополнительные ресурсы -->
          <div class="additional-resources">
            <h3>Дополнительные ресурсы</h3>
            <ul>
              <li v-for="(resource, i) in currentApproach.resources" :key="i">
                <a :href="resource.url" target="_blank">{{ resource.title }}</a>
                <span class="resource-description">{{ resource.description }}</span>
              </li>
            </ul>
          </div>
          
          <!-- Советы и трюки -->
          <div class="tips-tricks">
            <h3>Советы и рекомендации</h3>
            <div class="tip" v-for="(tip, i) in currentApproach.tips" :key="i">
              <span class="tip-number">{{ i + 1 }}</span>
              <div class="tip-content">{{ tip }}</div>
            </div>
          </div>
        </div>
        
        <!-- Боковая панель с подсказками -->
        <div class="problem-solving-cheatsheet">
          <h3>Шпаргалка по решению задач</h3>
          <div class="cheatsheet-step" v-for="(step, i) in problemSolvingSteps" :key="i">
            <div class="step-number">{{ i + 1 }}</div>
            <div class="step-content">
              <h4>{{ step.title }}</h4>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Указатель на текущий выбранный подход
  const currentApproachIndex = ref(0);
  const currentCodeTab = ref('problemCode'); // 'problemCode', 'solutionCode', 'explanation'
  
  // Список подходов к решению задач
  const approaches = [
    {
      id: 'divide-and-conquer',
      title: 'Разделяй и властвуй',
      description: `
        <p>Одна из самых мощных стратегий решения сложных задач. Суть подхода заключается в разбиении сложной задачи на более мелкие и более управляемые подзадачи, которые проще решать.</p>
        <p>После решения подзадач результаты объединяются, чтобы получить решение исходной проблемы.</p>
      `,
      whenToUse: [
        'Задача может быть естественным образом разбита на похожие подзадачи',
        'Рекурсивные задачи, такие как сортировка или поиск',
        'Задачи на рекурсивных структурах данных (деревья, графы)',
        'Когда решение можно получить путем комбинирования решений подзадач'
      ],
      example: {
        problem: 'Реализуйте алгоритм быстрой сортировки (QuickSort) для массива чисел.',
        problemCode: `// Дан массив: [5, 3, 8, 4, 2, 1, 7, 6]
  // Необходимо отсортировать его с использованием алгоритма QuickSort
  
  function quickSort(arr) {
    // Ваш код здесь
  }
  
  // Пример использования:
  const unsortedArray = [5, 3, 8, 4, 2, 1, 7, 6];
  const sortedArray = quickSort(unsortedArray);
  console.log(sortedArray); // Должно вывести [1, 2, 3, 4, 5, 6, 7, 8]`,
        solutionCode: `function quickSort(arr) {
    // Базовый случай: массив длиной 0 или 1 уже отсортирован
    if (arr.length <= 1) {
      return arr;
    }
    
    // Выбираем опорный элемент (pivot)
    const pivot = arr[Math.floor(arr.length / 2)];
    
    // Разделяем массив на три части:
    // 1. Элементы меньше опорного
    const less = arr.filter(x => x < pivot);
    // 2. Элементы равные опорному
    const equal = arr.filter(x => x === pivot);
    // 3. Элементы больше опорного
    const greater = arr.filter(x => x > pivot);
    
    // Рекурсивно сортируем подмассивы и объединяем результаты
    return [...quickSort(less), ...equal, ...quickSort(greater)];
  }
  
  // Пример использования:
  const unsortedArray = [5, 3, 8, 4, 2, 1, 7, 6];
  const sortedArray = quickSort(unsortedArray);
  console.log(sortedArray); // [1, 2, 3, 4, 5, 6, 7, 8]`,
        explanation: `
          <p>Алгоритм QuickSort - классический пример подхода "разделяй и властвуй":</p>
          <ol>
            <li><strong>Разделение:</strong> Мы выбираем опорный элемент (pivot) и разделяем массив на три подмассива: элементы меньше опорного, равные опорному и больше опорного.</li>
            <li><strong>Рекурсия:</strong> Рекурсивно применяем quickSort к подмассивам с элементами меньше и больше опорного.</li>
            <li><strong>Комбинирование:</strong> Объединяем результаты сортировки подмассивов и опорный элемент.</li>
          </ol>
          <p>Этот алгоритм имеет среднюю сложность O(n log n), хотя в худшем случае она может достигать O(n²).</p>
          <p>Обратите внимание на базовый случай: если длина массива меньше или равна 1, он уже отсортирован.</p>
        `
      },
      pros: [
        'Эффективно решает сложные задачи путем их декомпозиции',
        'Приводит к элегантным рекурсивным решениям',
        'Часто имеет хорошую алгоритмическую сложность',
        'Естественно подходит для параллельных вычислений'
      ],
      cons: [
        'Может привести к избыточному использованию памяти из-за рекурсии',
        'Иногда сложно определить, как правильно разделить задачу',
        'Для маленьких задач накладные расходы могут быть высокими',
        'Требует тщательного проектирования базового случая для избежания бесконечной рекурсии'
      ],
      resources: [
        {
          title: 'Визуализация алгоритмов сортировки',
          url: 'https://visualgo.net/en/sorting',
          description: 'Визуализация различных алгоритмов сортировки, включая QuickSort'
        },
        {
          title: 'Курс "Алгоритмы" на Coursera',
          url: 'https://www.coursera.org/learn/algorithms-part1',
          description: 'Подробное изучение алгоритмов, включая "разделяй и властвуй"'
        }
      ],
      tips: [
        'Всегда определяйте базовый случай для рекурсивных решений',
        'Выбор хорошего опорного элемента (pivot) может значительно повлиять на производительность',
        'Рассмотрите использование итеративных решений для алгоритмов с глубокой рекурсией, чтобы избежать переполнения стека',
        'Тестируйте граничные случаи, такие как пустые массивы или массивы с одним элементом'
      ]
    },
    {
      id: 'dynamic-programming',
      title: 'Динамическое программирование',
      description: `
        <p>Динамическое программирование — это метод оптимизации, который работает, разбивая сложную задачу на подзадачи и запоминая их решения, чтобы избежать повторных вычислений.</p>
        <p>Ключевой принцип — <strong>оптимальное решение большой задачи включает оптимальные решения подзадач</strong> (принцип оптимальности Беллмана).</p>
      `,
      whenToUse: [
        'Задачи с перекрывающимися подзадачами (одни и те же подзадачи решаются многократно)',
        'Задачи с оптимальной подструктурой (оптимальное решение задачи содержит оптимальные решения подзадач)',
        'Расчет n-го числа Фибоначчи, задачи на поиск путей, задачи оптимизации',
        'Когда рекурсивное решение слишком неэффективно из-за повторяющихся вычислений'
      ],
      example: {
        problem: 'Найдите n-е число Фибоначчи с использованием динамического программирования.',
        problemCode: `// Числа Фибоначчи определяются как:
  // F(0) = 0, F(1) = 1
  // F(n) = F(n-1) + F(n-2) для n > 1
  
  function fibonacci(n) {
    // Ваш код здесь
  }
  
  // Пример использования:
  console.log(fibonacci(10)); // Должно вывести 55`,
        solutionCode: `// Решение с помощью динамического программирования - подход "снизу вверх"
  function fibonacci(n) {
    // Обработка граничных случаев
    if (n <= 0) return 0;
    if (n === 1) return 1;
    
    // Создаем массив для хранения уже вычисленных значений
    const fib = [0, 1];
    
    // Последовательно вычисляем числа Фибоначчи от 2 до n
    for (let i = 2; i <= n; i++) {
      fib[i] = fib[i-1] + fib[i-2];
    }
    
    return fib[n];
  }
  
  // Пример использования:
  console.log(fibonacci(10)); // 55
  
  // Альтернативное решение с оптимизацией памяти
  function fibonacciOptimized(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    
    let prev = 0;
    let current = 1;
    
    for (let i = 2; i <= n; i++) {
      const next = prev + current;
      prev = current;
      current = next;
    }
    
    return current;
  }
  
  console.log(fibonacciOptimized(10)); // 55`,
        explanation: `
          <p>Числа Фибоначчи — классический пример для демонстрации динамического программирования:</p>
          <ol>
            <li><strong>Проблема с рекурсией:</strong> Прямая рекурсивная реализация имеет экспоненциальную сложность O(2^n) из-за повторных вычислений.</li>
            <li><strong>Подход DP "снизу вверх":</strong> Мы создаем массив и заполняем его, начиная с базовых случаев (F(0)=0, F(1)=1) и последовательно вычисляя каждое следующее число до F(n).</li>
            <li><strong>Оптимизация памяти:</strong> Поскольку для вычисления F(i) нужны только F(i-1) и F(i-2), можно хранить лишь два последних числа вместо всего массива.</li>
          </ol>
          <p>Сложность решения: O(n) по времени и O(1) по памяти для оптимизированного варианта.</p>
        `
      },
      pros: [
        'Значительно улучшает производительность для задач с перекрывающимися подзадачами',
        'Превращает экспоненциальные решения в полиномиальные',
        'Подходит для задач оптимизации',
        'Может быть реализовано как "сверху вниз" (мемоизация), так и "снизу вверх" (табуляция)'
      ],
      cons: [
        'Требует дополнительной памяти для хранения результатов подзадач',
        'Не всегда очевидно, как разбить задачу на подзадачи',
        'Может быть сложно определить порядок решения подзадач',
        'Иногда трудно найти эффективную рекуррентную формулу'
      ],
      resources: [
        {
          title: 'Визуализация динамического программирования',
          url: 'https://visualgo.net/en/dp',
          description: 'Интерактивные визуализации алгоритмов динамического программирования'
        },
        {
          title: 'Введение в динамическое программирование на Khan Academy',
          url: 'https://www.khanacademy.org/computing/computer-science/algorithms/dynamic-programming/a/dynamic-programming',
          description: 'Подробное объяснение концепций DP с примерами'
        }
      ],
      tips: [
        'Определите базовые случаи и рекуррентные отношения перед реализацией',
        'Если задача требует оптимального решения, проверьте, обладает ли она свойством оптимальной подструктуры',
        'Выбирайте между подходами "сверху вниз" (мемоизация) и "снизу вверх" (табуляция) в зависимости от задачи',
        'Оптимизируйте использование памяти, если это возможно, храня только необходимые данные'
      ]
    },
    {
      id: 'two-pointers',
      title: 'Метод двух указателей',
      description: `
        <p>Техника двух указателей использует два указателя (часто индексы в массиве), которые двигаются в определенном направлении для эффективного решения задач, особенно связанных с массивами и строками.</p>
        <p>Это элегантный подход, который часто позволяет решать задачи за один проход с линейным временем выполнения.</p>
      `,
      whenToUse: [
        'Работа с отсортированными массивами или связными списками',
        'Поиск пар элементов с определенным соотношением (например, сумма равна заданному значению)',
        'Обнаружение циклов в структурах данных',
        'Задачи, требующие сравнения элементов с разных концов коллекции'
      ],
      example: {
        problem: 'Дан отсортированный массив чисел, найдите пару элементов, сумма которых равна заданному целевому значению.',
        problemCode: `function findPairWithSum(sortedArray, targetSum) {
    // Ваш код здесь
  }
  
  // Пример использования:
  const array = [1, 2, 3, 4, 6, 8, 9, 14, 15];
  const target = 13;
  console.log(findPairWithSum(array, target)); // Должно вывести [4, 9] или [4, 6] и [9]`,
        solutionCode: `function findPairWithSum(sortedArray, targetSum) {
    // Инициализируем два указателя
    let left = 0;
    let right = sortedArray.length - 1;
    
    while (left < right) {
      const currentSum = sortedArray[left] + sortedArray[right];
      
      // Найдена пара с целевой суммой
      if (currentSum === targetSum) {
        return [sortedArray[left], sortedArray[right]];
      }
      
      // Если текущая сумма меньше целевой, увеличиваем левый указатель
      if (currentSum < targetSum) {
        left++;
      }
      // Если текущая сумма больше целевой, уменьшаем правый указатель
      else {
        right--;
      }
    }
    
    // Пара не найдена
    return null;
  }
  
  // Пример использования:
  const array = [1, 2, 3, 4, 6, 8, 9, 14, 15];
  const target = 13;
  console.log(findPairWithSum(array, target)); // [4, 9]
  
  // Если нужно найти все пары:
  function findAllPairsWithSum(sortedArray, targetSum) {
    const pairs = [];
    let left = 0;
    let right = sortedArray.length - 1;
    
    while (left < right) {
      const currentSum = sortedArray[left] + sortedArray[right];
      
      if (currentSum === targetSum) {
        pairs.push([sortedArray[left], sortedArray[right]]);
        left++;
        right--;
      } else if (currentSum < targetSum) {
        left++;
      } else {
        right--;
      }
    }
    
    return pairs;
  }
  
  console.log(findAllPairsWithSum(array, 13)); // [[4, 9]]`,
        explanation: `
          <p>Метод двух указателей отлично подходит для задач с отсортированными массивами:</p>
          <ol>
            <li><strong>Инициализация:</strong> Размещаем указатели на противоположных концах массива (left = 0, right = length-1).</li>
            <li><strong>Вычисление:</strong> Рассчитываем сумму элементов на текущих позициях указателей.</li>
            <li><strong>Сравнение:</strong> Сравниваем сумму с целевым значением.</li>
            <li><strong>Перемещение указателей:</strong> Если сумма меньше цели — увеличиваем левый указатель; если больше — уменьшаем правый указатель; если равна — нашли решение.</li>
          </ol>
          <p>Сложность: O(n) по времени и O(1) по памяти, что намного эффективнее, чем перебор всех пар за O(n²).</p>
          <p>Этот подход работает благодаря свойству сортированного массива: перемещение указателей гарантированно приближает текущую сумму к целевой.</p>
        `
      },
      pros: [
        'Обычно требует лишь одного прохода, что приводит к временной сложности O(n)',
        'Использует постоянное количество дополнительной памяти O(1)',
        'Элегантное решение для задач с линейными структурами данных',
        'Подходит для работы с большими наборами данных'
      ],
      cons: [
        'Применим в основном к отсортированным массивам или связным спискам',
        'Может потребоваться предварительная сортировка, которая добавляет сложность O(n log n)',
        'Не всегда очевидно, как правильно перемещать указатели для конкретной задачи',
        'Ограничен задачами определенных типов'
      ],
      resources: [
        {
          title: 'Алгоритмы с двумя указателями на LeetCode',
          url: 'https://leetcode.com/articles/two-pointer-technique/',
          description: 'Обзор техники двух указателей с примерами'
        },
        {
          title: 'Решение задач методом двух указателей',
          url: 'https://medium.com/@timothyhuang_40750/two-pointer-algorithm-897d83986acb',
          description: 'Подробное объяснение с разбором различных типов задач'
        }
      ],
      tips: [
        'Перед применением метода определите, в каком направлении должны двигаться указатели',
        'Для некоторых задач лучше начинать с указателей на одном конце массива, а не на противоположных',
        'Метод "быстрый и медленный указатели" полезен для обнаружения циклов в связных списках',
        'Всегда проверяйте граничные случаи, такие как пустые массивы или массивы с одним элементом'
      ]
    },
    {
      id: 'sliding-window',
      title: 'Скользящее окно',
      description: `
        <p>Техника скользящего окна — это вариация метода двух указателей, используемая для решения задач, связанных с подмассивами или подстроками фиксированного или переменного размера.</p>
        <p>"Окно" определяется двумя указателями, которые расширяются или сжимаются в зависимости от условий задачи, позволяя выполнять операции за один проход.</p>
      `,
      whenToUse: [
        'Поиск подмассива/подстроки с определенными свойствами',
        'Задачи на максимизацию/минимизацию для всех подмассивов определенной длины',
        'Вычисление скользящих сумм, средних или других агрегированных значений',
        'Задачи, где нужно отслеживать состояние набора соседних элементов'
      ],
      example: {
        problem: 'Найдите максимальную сумму подмассива заданной длины k.',
        problemCode: `function maxSubarraySum(arr, k) {
    // Ваш код здесь
  }
  
  // Пример использования:
  const array = [2, 1, 5, 1, 3, 2];
  const k = 3;
  console.log(maxSubarraySum(array, k)); // Должно вывести 9 (сумма подмассива [5, 1, 3])`,
        solutionCode: `function maxSubarraySum(arr, k) {
    // Проверка граничных случаев
    if (arr.length < k) {
      return null;
    }
    
    // Вычисляем сумму первого окна
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
      windowSum += arr[i];
    }
    
    // Устанавливаем начальное максимальное значение
    let maxSum = windowSum;
    
    // Скользим окно по массиву
    for (let i = k; i < arr.length; i++) {
      // Добавляем текущий элемент и вычитаем элемент, который выходит из окна
      windowSum = windowSum + arr[i] - arr[i - k];
      
      // Обновляем максимум, если необходимо
      maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
  }
  
  // Пример использования:
  const array = [2, 1, 5, 1, 3, 2];
  const k = 3;
  console.log(maxSubarraySum(array, k)); // 9`,
        explanation: `
          <p>Алгоритм скользящего окна эффективно решает эту задачу без необходимости пересчитывать сумму для каждого подмассива:</p>
          <ol>
            <li><strong>Инициализация:</strong> Вычисляем сумму первых k элементов (первое окно).</li>
            <li><strong>Скользящее вычисление:</strong> Для каждой новой позиции окна:
              <ul>
                <li>Добавляем новый элемент, входящий в окно (arr[i])</li>
                <li>Вычитаем элемент, который выходит из окна (arr[i-k])</li>
              </ul>
            </li>
            <li><strong>Отслеживание максимума:</strong> На каждом шаге обновляем значение максимальной суммы, если текущая сумма больше.</li>
          </ol>
          <p>Сложность: O(n) по времени и O(1) по памяти, в отличие от наивного подхода с вложенными циклами, который имеет сложность O(n*k).</p>
          <p>Ключевая идея: используем результаты предыдущего окна для вычисления суммы текущего окна, что устраняет избыточные операции.</p>
        `
      },
      pros: [
        'Обеспечивает линейную временную сложность для многих задач, требующих анализа подмассивов',
        'Избегает избыточных вычислений, используя инкрементальные обновления',
        'Использует постоянное количество дополнительной памяти',
        'Подходит для потоковой обработки данных'
      ],
      cons: [
        'Не подходит для задач, где элементы не имеют последовательного порядка',
        'Может быть непросто определить, когда расширять или сужать окно',
        'Некоторые вариации требуют дополнительных структур данных для отслеживания состояния окна',
        'Реализация может быть сложнее для динамических окон переменного размера'
      ],
      resources: [
        {
          title: 'Шаблон скользящего окна на Geeksforgeeks',
          url: 'https://www.geeksforgeeks.org/window-sliding-technique/',
          description: 'Введение в технику скользящего окна с примерами'
        },
        {
          title: 'Задачи на паттерн скользящего окна',
          url: 'https://leetcode.com/tag/sliding-window/',
          description: 'Коллекция задач, решаемых с помощью скользящего окна'
        }
      ],
      tips: [
        'Определите, является ли окно фиксированного размера или переменного (динамического)',
        'Для задач с динамическим окном используйте условия для определения, когда расширять и сужать окно',
        'Для отслеживания частоты элементов в окне используйте хеш-таблицу',
        'Обрабатывайте граничные случаи, такие как пустые массивы или окна, превышающие размер массива'
      ]
    },
    {
      id: 'hash-table',
      title: 'Хеш-таблицы и множества',
      description: `
        <p>Хеш-таблицы (объекты в JavaScript или Map) и множества (Set) — мощные структуры данных для быстрого поиска, вставки и удаления элементов.</p>
        <p>Они обеспечивают доступ к элементам за время O(1) в среднем, что делает их незаменимыми для оптимизации многих алгоритмов.</p>
      `,
      whenToUse: [
        'Быстрый поиск, подсчет или проверка наличия элементов',
        'Отслеживание частоты встречаемости элементов',
        'Кеширование результатов для предотвращения повторных вычислений',
        'Реализация таких структур как LRU-кеш или графов с быстрым доступом'
      ],
      example: {
        problem: 'Найдите первый повторяющийся элемент в массиве.',
        problemCode: `function findFirstDuplicate(array) {
    // Ваш код здесь
  }
  
  // Пример использования:
  const array = [2, 5, 1, 2, 3, 5, 1, 2, 4];
  console.log(findFirstDuplicate(array)); // Должно вывести 2`,
        solutionCode: `function findFirstDuplicate(array) {
    // Используем множество для отслеживания уже встреченных элементов
    const seen = new Set();
    
    for (const num of array) {
      // Если элемент уже в множестве, он повторяется
      if (seen.has(num)) {
        return num;
      }
      
      // Добавляем элемент в множество
      seen.add(num);
    }
    
    // Если повторяющихся элементов нет
    return null;
  }
  
  // Пример использования:
  const array = [2, 5, 1, 2, 3, 5, 1, 2, 4];
  console.log(findFirstDuplicate(array)); // 2
  
  // Вариант с использованием объекта вместо Set
  function findFirstDuplicateWithObject(array) {
    const seen = {};
    
    for (const num of array) {
      if (seen[num] !== undefined) {
        return num;
      }
      seen[num] = true;
    }
    
    return null;
  }
  
  console.log(findFirstDuplicateWithObject(array)); // 2`,
        explanation: `
          <p>Это классическая задача, где хеш-таблица или множество значительно улучшает производительность:</p>
          <ol>
            <li><strong>Структура данных:</strong> Используем Set (или объект) для отслеживания ранее встреченных элементов.</li>
            <li><strong>Линейный проход:</strong> Обходим массив один раз, проверяя каждый элемент.</li>
            <li><strong>Проверка наличия:</strong> Для каждого элемента проверяем, есть ли он уже в множестве (O(1) операция).</li>
            <li><strong>Обновление множества:</strong> Если элемент не встречался, добавляем его в множество.</li>
          </ol>
          <p>Сложность: O(n) по времени и O(n) по памяти в худшем случае, что намного лучше, чем наивный подход с вложенными циклами O(n²).</p>
          <p>В JavaScript можно использовать как Set (более элегантный и строгий), так и простой объект (немного быстрее для примитивных типов).</p>
        `
      },
      pros: [
        'Обеспечивает очень быстрый доступ, вставку и удаление — O(1) в среднем',
        'Позволяет избежать вложенных циклов, преобразовывая решения из O(n²) в O(n)',
        'Универсально применима для широкого спектра задач',
        'В JavaScript легко использовать с помощью встроенных типов Map, Set или простых объектов'
      ],
      cons: [
        'Требует дополнительной памяти пропорционально количеству элементов',
        'Производительность может ухудшаться при большом количестве коллизий',
        'Неупорядоченность элементов (хотя в JavaScript Map сохраняет порядок вставки)',
        'Не подходит для задач, требующих сложных операций над диапазонами элементов'
      ],
      resources: [
        {
          title: 'MDN: Map и Set',
          url: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Map',
          description: 'Документация по Map и Set в JavaScript'
        },
        {
          title: 'Визуализация хеш-таблиц',
          url: 'https://visualgo.net/en/hashtable',
          description: 'Интерактивная визуализация работы хеш-таблиц'
        }
      ],
      tips: [
        'Для задач с числовыми ключами можно использовать как Set, так и обычные объекты',
        'Для задач с ключами произвольных типов используйте Map и Set, а не объекты',
        'Будьте внимательны с ключами объектов - они всегда преобразуются в строки',
        'Map имеет преимущество перед объектами, когда важен порядок вставки или нужны нестроковые ключи'
      ]
    },
    {
      id: 'greedy',
      title: 'Жадные алгоритмы',
      description: `
        <p>Жадные алгоритмы выбирают локально оптимальное решение на каждом шаге с надеждой достичь глобального оптимума.</p>
        <p>Они принимают решения, которые выглядят наилучшими в текущий момент, без пересмотра предыдущих выборов.</p>
      `,
      whenToUse: [
        'Задачи на оптимизацию, где локальный оптимальный выбор приводит к глобальному оптимальному решению',
        'Задачи на составление расписаний или оптимальное распределение ресурсов',
        'Задачи на поиск минимального остовного дерева или кратчайшего пути в графе',
        'Кодирование Хаффмана и другие алгоритмы сжатия'
      ],
      example: {
        problem: 'Реализуйте задачу размена монет: найдите минимальное количество монет определенных номиналов, необходимое для размена заданной суммы.',
        problemCode: `function minCoins(coins, amount) {
    // Ваш код здесь
  }
  
  // Пример использования:
  const coins = [1, 5, 10, 25]; // Номиналы монет (центы)
  const amount = 63; // Сумма для размена
  console.log(minCoins(coins, amount)); // Должно вывести 6 (25 + 25 + 10 + 1 + 1 + 1)`,
        solutionCode: `function minCoins(coins, amount) {
    // Сортируем монеты в порядке убывания для жадного алгоритма
    coins.sort((a, b) => b - a);
    
    let remainingAmount = amount;
    let coinCount = 0;
    
    // Перебираем все номиналы монет от большего к меньшему
    for (const coin of coins) {
      // Используем максимально возможное количество текущего номинала
      const numCoins = Math.floor(remainingAmount / coin);
      
      // Увеличиваем общее количество используемых монет
      coinCount += numCoins;
      
      // Уменьшаем оставшуюся сумму
      remainingAmount -= numCoins * coin;
      
      // Если разменяли всю сумму, выходим из цикла
      if (remainingAmount === 0) {
        break;
      }
    }
    
    // Если не смогли разменять всю сумму, возвращаем -1
    return remainingAmount === 0 ? coinCount : -1;
  }
  
  // Пример использования:
  const coins = [1, 5, 10, 25]; // Номиналы монет (центы)
  const amount = 63; // Сумма для размена (центы)
  console.log(minCoins(coins, amount)); // 6
  
  // Обратите внимание: жадный алгоритм не всегда дает оптимальное решение!
  // Например, для coins = [1, 3, 4] и amount = 6
  // Жадный алгоритм даст: 4 + 1 + 1 = 3 монеты
  // Оптимальное решение: 3 + 3 = 2 монеты`,
        explanation: `
          <p>Жадный алгоритм размена монет работает следующим образом:</p>
          <ol>
            <li><strong>Сортировка:</strong> Сначала сортируем монеты по убыванию номинала.</li>
            <li><strong>Жадный выбор:</strong> На каждом шаге берем максимально возможное количество монет наибольшего доступного номинала.</li>
            <li><strong>Обновление:</strong> Уменьшаем оставшуюся сумму и переходим к следующему номиналу.</li>
            <li><strong>Проверка:</strong> Если в итоге оставшаяся сумма равна нулю, значит размен возможен.</li>
          </ol>
          <p><strong>Важное замечание:</strong> Для набора монет с номиналами [1, 5, 10, 25] жадный алгоритм всегда дает оптимальное решение. Однако это не всегда верно для произвольного набора номиналов!</p>
          <p>Для произвольных номиналов монет оптимальное решение может потребовать использования динамического программирования.</p>
        `
      },
      pros: [
        'Обычно простые в реализации и понимании',
        'Эффективные по времени выполнения (часто линейные или близкие к линейным)',
        'Хорошо работают для многих практических задач',
        'Требуют минимального объема дополнительной памяти'
      ],
      cons: [
        'Не всегда гарантируют оптимальное глобальное решение',
        'Трудно доказать правильность для сложных задач',
        'Могут застревать в локальных оптимумах',
        'Не подходят для задач с сильными зависимостями между решениями на разных шагах'
      ],
      resources: [
        {
          title: 'Greedy Algorithms на GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/greedy-algorithms/',
          description: 'Подробное объяснение жадных алгоритмов с примерами'
        },
        {
          title: 'Жадные алгоритмы в задачах на LeetCode',
          url: 'https://leetcode.com/tag/greedy/',
          description: 'Коллекция задач, решаемых жадными алгоритмами'
        }
      ],
      tips: [
        'Проверьте, обладает ли задача "свойством жадного выбора" перед применением жадного алгоритма',
        'Убедитесь, что локальный оптимальный выбор приводит к глобальному оптимальному решению',
        'Для проверки корректности используйте примеры и граничные случаи',
        'Если сомневаетесь в оптимальности жадного алгоритма, рассмотрите динамическое программирование'
      ]
    }
  ];
  
  // Общие шаги решения задач
  const problemSolvingSteps = [
    {
      title: "Понимание задачи",
      description: "Внимательно прочитайте условие. Определите входные и выходные данные, ограничения и граничные случаи."
    },
    {
      title: "Составление плана",
      description: "Подумайте о стратегии решения. Выберите подходящие структуры данных и алгоритмические подходы."
    },
    {
      title: "Декомпозиция задачи",
      description: "Разбейте сложную задачу на более простые подзадачи. Решайте по частям."
    },
    {
      title: "Реализация",
      description: "Напишите код, начиная с базовой логики и постепенно добавляя детали."
    },
    {
      title: "Тестирование",
      description: "Проверьте ваше решение на разных наборах входных данных, включая граничные случаи."
    },
    {
      title: "Оптимизация",
      description: "Проанализируйте время и пространственную сложность. Определите возможные улучшения алгоритма."
    },
    {
      title: "Рефакторинг",
      description: "Улучшите читаемость и поддерживаемость кода без изменения его функциональности."
    }
  ];
  
  // Вычисляемое свойство для текущего подхода
  const currentApproach = computed(() => {
    return approaches[currentApproachIndex.value];
  });
  
  // Метод для выбора подхода
  function selectApproach(index) {
    currentApproachIndex.value = index;
    currentCodeTab.value = 'problemCode'; // Сбросить вкладку кода при смене подхода
  }
  </script>
  
  <style scoped>
  .problem-solver {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
    line-height: 1.6;
  }
  
  .header {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .header h1 {
    color: #2c3e50;
    font-size: 2.2rem;
    margin-bottom: 10px;
  }
  
  .intro-text {
    color: #7f8c8d;
    font-size: 1.1rem;
  }
  
  .approach-navigator {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 30px;
    justify-content: center;
  }
  
  .approach-navigator button {
    padding: 12px 18px;
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .approach-navigator button:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
  }
  
  .approach-navigator button.active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
    box-shadow: 0 4px 6px rgba(52, 152, 219, 0.1);
  }
  
  .content-container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 30px;
  }
  
  .current-approach {
    background-color: white;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  .current-approach h2 {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  
  .approach-description {
    margin-bottom: 25px;
  }
  
  .when-to-use {
    background-color: #f0f8ff;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 25px;
    border-left: 4px solid #3498db;
  }
  
  .when-to-use h3 {
    margin-top: 0;
    color: #3498db;
  }
  
  .when-to-use ul {
    margin-bottom: 0;
  }
  
  .example-problem {
    margin-bottom: 25px;
  }
  
  .problem-statement {
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #f39c12;
    margin-bottom: 15px;
  }
  
  .code-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .code-tabs button {
    padding: 8px 15px;
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .code-tabs button:hover {
    background-color: #e9ecef;
  }
  
  .code-tabs button.active {
    background-color: #4caf50;
    color: white;
    border-color: #4caf50;
  }
  
  .code-container {
    margin-bottom: 20px;
  }
  
  .code {
    background-color: #282c34;
    color: #abb2bf;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    white-space: pre;
  }
  
  .explanation {
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 6px;
    border-left: 4px solid #4caf50;
  }
  
  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 25px;
  }
  
  .pros, .cons {
    padding: 20px;
    border-radius: 8px;
  }
  
  .pros {
    background-color: #e8f5e9;
    border-left: 4px solid #4caf50;
  }
  
  .cons {
    background-color: #ffebee;
    border-left: 4px solid #f44336;
  }
  
  .pros h3, .cons h3 {
    margin-top: 0;
    color: #2c3e50;
  }
  
  .additional-resources {
    margin-bottom: 25px;
  }
  
  .resource-description {
    display: block;
    color: #7f8c8d;
    font-size: 0.9rem;
    margin-top: 3px;
  }
  
  .tips-tricks {
    background-color: #fff8e1;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #ffc107;
  }
  
  .tips-tricks h3 {
    margin-top: 0;
    color: #f39c12;
  }
  
  .tip {
    display: flex;
    margin-bottom: 10px;
  }
  
  .tip-number {
    background-color: #ffc107;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 10px;
    flex-shrink: 0;
  }
  
  .problem-solving-cheatsheet {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    height: fit-content;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 20px;
  }
  
  .problem-solving-cheatsheet h3 {
    color: #2c3e50;
    margin-top: 0;
    padding-bottom: 10px;
    border-bottom: 2px solid #e9ecef;
  }
  
  .cheatsheet-step {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
  }
  
  .step-number {
    background-color: #3498db;
    color: white;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 15px;
    flex-shrink: 0;
  }
  
  .step-content h4 {
    margin: 0;
    color: #3498db;
  }
  
  .step-content p {
    margin-top: 5px;
    margin-bottom: 0;
    font-size: 0.9rem;
    color: #666;
  }
  
  /* Добавление адаптивности */
  @media (max-width: 900px) {
    .content-container {
      grid-template-columns: 1fr;
    }
    
    .problem-solving-cheatsheet {
      position: static;
      margin-top: 20px;
    }
  }
  
  @media (max-width: 600px) {
    .pros-cons {
      grid-template-columns: 1fr;
    }
    
    .approach-navigator button {
      padding: 10px 12px;
      font-size: 0.9rem;
    }
    
    .code {
      font-size: 0.8rem;
    }
  }
  </style>