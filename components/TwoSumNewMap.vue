<template>
    <div class="twosum-explainer">
      <h1>Алгоритм Two Sum: пошаговое объяснение</h1>
      
      <div class="explainer-sections">
        <section class="problem-section">
          <h2>Задача: поиск двух чисел с заданной суммой</h2>
          <div class="problem-description">
            <p>Классическая задача "Two Sum" звучит так:</p>
            <div class="problem-statement">
              <p>Дан массив целых чисел <code>nums</code> и целевое значение <code>target</code>.</p>
              <p>Необходимо найти два числа из массива, которые в сумме дают <code>target</code>, и вернуть их индексы.</p>
              <p>Предполагается, что каждый входной массив имеет ровно одно решение.</p>
            </div>
            
            <div class="example">
              <p><strong>Пример:</strong></p>
              <p><code>nums = [2, 7, 11, 15], target = 9</code></p>
              <p><code>Ответ: [0, 1]</code> (т.к. nums[0] + nums[1] = 2 + 7 = 9)</p>
            </div>
          </div>
        </section>
        
        <section class="solution-approaches">
          <h2>Подходы к решению</h2>
          
          <div class="approach naive">
            <h3>Наивный подход: перебор всех пар (O(n²))</h3>
            <pre class="code-block">
  function twoSumNaive(nums, target) {
    for (let i = 0; i &lt; nums.length; i++) {
      for (let j = i + 1; j &lt; nums.length; j++) {
        if (nums[i] + nums[j] === target) {
          return [i, j];
        }
      }
    }
    return null;
  }</pre>
            <p>Этот подход имеет временную сложность O(n²), так как использует вложенные циклы.</p>
          </div>
          
          <div class="approach optimized">
            <h3>Оптимальный подход: использование хеш-таблицы (O(n))</h3>
            <pre class="code-block">
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
  }</pre>
            <p>Данный подход имеет временную сложность O(n) и использует дополнительную память O(n).</p>
          </div>
        </section>
        
        <section class="map-explanation">
          <h2>Объяснение Map в JavaScript</h2>
          
          <div class="map-intro">
            <p><code>Map</code> - это встроенная структура данных в JavaScript, которая позволяет хранить пары ключ-значение.</p>
            <p>В отличие от обычных объектов JavaScript, ключами в Map могут быть любые значения (включая объекты и примитивы).</p>
          </div>
          
          <div class="map-methods">
            <h3>Основные методы Map:</h3>
            <ul>
              <li><code>new Map()</code> - создает новую пустую Map</li>
              <li><code>map.set(key, value)</code> - добавляет или обновляет элемент с указанным ключом и значением</li>
              <li><code>map.get(key)</code> - возвращает значение, связанное с ключом, или undefined, если ключ не существует</li>
              <li><code>map.has(key)</code> - возвращает true, если ключ существует в Map</li>
              <li><code>map.delete(key)</code> - удаляет элемент по указанному ключу</li>
              <li><code>map.size</code> - возвращает количество элементов в Map</li>
              <li><code>map.clear()</code> - удаляет все элементы из Map</li>
            </ul>
          </div>
          
          <div class="map-performance">
            <h3>Производительность Map:</h3>
            <p>Операции поиска, добавления и удаления в Map имеют константную сложность O(1) в среднем случае.</p>
            <p>Это делает Map идеальным для задач, где требуется быстрый доступ к данным по ключу, как в алгоритме Two Sum.</p>
          </div>
          
          <div class="map-vs-object">
            <h3>Map vs Object:</h3>
            <ul>
              <li>Map позволяет использовать любые типы данных в качестве ключей</li>
              <li>Map сохраняет порядок вставки элементов</li>
              <li>Map имеет встроенный метод size для получения количества элементов</li>
              <li>Map может быть более эффективным при частых добавлениях и удалениях</li>
            </ul>
          </div>
        </section>
        
        <section class="algorithm-visualization">
          <h2>Визуализация алгоритма Two Sum с использованием Map</h2>
          
          <div class="custom-example">
            <p>Рассмотрим пример: <code>nums = [2, 7, 11, 15]</code>, <code>target = 9</code></p>
            
            <div class="visualization-container">
              <div class="array-container">
                <div class="array-title">Массив nums:</div>
                <div class="array-items">
                  <div 
                    v-for="(num, idx) in nums" 
                    :key="idx" 
                    class="array-item" 
                    :class="{ active: currentIndex === idx, 'highlight-complement': complementIndex === idx }"
                  >
                    <div class="item-value">{{ num }}</div>
                    <div class="item-index">индекс: {{ idx }}</div>
                  </div>
                </div>
              </div>
              
              <div class="animation-container">
                <div class="map-container">
                  <div class="map-title">Map (число: индекс)</div>
                  <div class="map-content">
                    <div v-if="mapEntries.length === 0" class="empty-map">Пусто</div>
                    <div 
                      v-for="(entry, idx) in mapEntries" 
                      :key="idx" 
                      class="map-entry"
                      :class="{ 'highlight-found': foundComplement && entry[0] === complement }"
                    >
                      <div class="entry-key">{{ entry[0] }}</div>
                      <div class="entry-arrow">→</div>
                      <div class="entry-value">{{ entry[1] }}</div>
                    </div>
                  </div>
                </div>
                
                <div class="current-step-info">
                  <div class="step-number">Шаг {{ currentStep }} из {{ totalSteps }}</div>
                  <div class="current-values">
                    <p><strong>Текущий индекс:</strong> {{ currentIndex }}</p>
                    <p><strong>Текущее число:</strong> {{ currentIndex >= 0 ? nums[currentIndex] : '-' }}</p>
                    <p><strong>Искомое дополнение:</strong> {{ complement !== null ? complement : '-' }}</p>
                    <p v-if="foundSolution" class="solution-message">
                      <strong>Найдено решение!</strong> Индексы [{{ solution[0] }}, {{ solution[1] }}]
                    </p>
                  </div>
                  <div class="step-explanation">{{ currentExplanation }}</div>
                </div>
              </div>
              
              <div class="controls">
                <button @click="resetAnimation" :disabled="animationRunning">Сбросить</button>
                <button @click="startAnimation" :disabled="animationRunning">Запустить анимацию</button>
                <button @click="stepForward" :disabled="animationRunning || currentStep >= totalSteps">Шаг вперёд</button>
                <button @click="stepBack" :disabled="animationRunning || currentStep <= 0">Шаг назад</button>
              </div>
            </div>
          </div>
          
          <div class="algorithm-steps">
            <h3>Пошаговое объяснение алгоритма:</h3>
            <ol>
              <li>Создаем пустую хеш-таблицу (Map) для хранения пар {число: индекс}</li>
              <li>Проходим по каждому элементу массива:</li>
              <li>Для текущего числа вычисляем его дополнение: <code>complement = target - nums[i]</code></li>
              <li>Проверяем, есть ли это дополнение в Map:</li>
              <li>Если есть: Возвращаем пару индексов [индекс дополнения, текущий индекс]</li>
              <li>Если нет: Добавляем текущее число и его индекс в Map и продолжаем</li>
            </ol>
          </div>
        </section>
        
        <section class="time-complexity">
          <h2>Анализ временной и пространственной сложности</h2>
          
          <div class="complexity-analysis">
            <div class="time-analysis">
              <h3>Временная сложность: O(n)</h3>
              <p>Мы проходим по массиву только один раз, и операции с Map (set, get, has) имеют сложность O(1).</p>
              <p>Это значительно лучше, чем наивный подход с двумя вложенными циклами (O(n²)).</p>
            </div>
            
            <div class="space-analysis">
              <h3>Пространственная сложность: O(n)</h3>
              <p>В худшем случае мы можем добавить в Map до n элементов (если решение находится только в конце массива).</p>
            </div>
          </div>
        </section>
        
        <section class="real-world-applications">
          <h2>Применение в реальной жизни</h2>
          
          <div class="applications-list">
            <div class="application">
              <h3>1. Финансовые приложения</h3>
              <p>Поиск транзакций, которые в сумме дают определенную сумму. Например, выявление подозрительных транзакций.</p>
            </div>
            
            <div class="application">
              <h3>2. Анализ данных</h3>
              <p>Поиск пар элементов из большого набора данных, соответствующих определенному критерию.</p>
            </div>
            
            <div class="application">
              <h3>3. Веб-разработка</h3>
              <p>Кэширование результатов запросов или вычислений для повышения производительности приложений.</p>
            </div>
            
            <div class="application">
              <h3>4. Компьютерные игры</h3>
              <p>Определение возможных комбинаций предметов, которые могут дать определенный эффект или характеристику.</p>
            </div>
            
            <div class="application">
              <h3>5. Компиляторы и интерпретаторы</h3>
              <p>Хранение и быстрый доступ к символам в таблице символов.</p>
            </div>
          </div>
        </section>
        
        <section class="edge-cases">
          <h2>Подводные камни и особые случаи</h2>
          
          <div class="edge-cases-list">
            <div class="edge-case">
              <h3>1. Одинаковые элементы</h3>
              <pre class="code-block">
  const nums = [3, 3];
  const target = 6;
  // Ожидаемый результат: [0, 1]</pre>
              <p>Наш алгоритм корректно обработает этот случай, так как мы сначала проверяем наличие дополнения, а затем добавляем число в Map.</p>
            </div>
            
            <div class="edge-case">
              <h3>2. Отрицательные числа</h3>
              <pre class="code-block">
  const nums = [-1, -2, -3, -4, -5];
  const target = -8;
  // Ожидаемый результат: [2, 4] (-3 + -5 = -8)</pre>
              <p>Алгоритм работает одинаково хорошо с отрицательными числами.</p>
            </div>
            
            <div class="edge-case">
              <h3>3. Нулевые элементы</h3>
              <pre class="code-block">
  const nums = [0, 0];
  const target = 0;
  // Ожидаемый результат: [0, 1]</pre>
              <p>С нулями всё тоже работает корректно.</p>
            </div>
            
            <div class="edge-case">
              <h3>4. Большие массивы</h3>
              <p>Для очень больших массивов наш алгоритм с использованием Map гораздо эффективнее наивного решения.</p>
              <p>Например, для массива с 10,000 элементов:</p>
              <ul>
                <li>Наивный подход: ~50,000,000 операций</li>
                <li>Подход с Map: ~10,000 операций</li>
              </ul>
            </div>
            
            <div class="edge-case">
              <h3>5. Отсутствие решения</h3>
              <p>Если в массиве нет пары чисел, сумма которых равна target, алгоритм вернет null.</p>
              <p>Но по условию задачи гарантируется наличие решения.</p>
            </div>
          </div>
        </section>
        
        <section class="alternatives">
          <h2>Альтернативные подходы</h2>
          
          <div class="alternative">
            <h3>1. Сортировка + два указателя</h3>
            <pre class="code-block">
  function twoSumTwoPointers(nums, target) {
    // Создаем копию с сохранением исходных индексов
    const numWithIndices = nums.map((num, index) => ({ num, index }));
    
    // Сортируем массив по значениям
    numWithIndices.sort((a, b) => a.num - b.num);
    
    let left = 0;
    let right = numWithIndices.length - 1;
    
    while (left &lt; right) {
      const sum = numWithIndices[left].num + numWithIndices[right].num;
      
      if (sum === target) {
        return [numWithIndices[left].index, numWithIndices[right].index];
      } else if (sum &lt; target) {
        left++;
      } else {
        right--;
      }
    }
    
    return null;
  }</pre>
            <p>Временная сложность: O(n log n) из-за сортировки.</p>
            <p>Пространственная сложность: O(n) для хранения копии массива с индексами.</p>
            <p>Этот подход уступает решению с Map по временной сложности, но может быть полезен, если массив уже отсортирован.</p>
          </div>
        </section>
        
        <section class="interview-tips">
          <h2>Советы для собеседований</h2>
          
          <div class="tips-list">
            <div class="tip">
              <h3>1. Уточните условия задачи</h3>
              <p>Спросите, гарантируется ли наличие решения, могут ли быть отрицательные числа, и должны ли индексы быть различными.</p>
            </div>
            
            <div class="tip">
              <h3>2. Начните с наивного решения</h3>
              <p>Покажите, что вы понимаете задачу, предложив простое решение с двумя циклами.</p>
            </div>
            
            <div class="tip">
              <h3>3. Улучшите до оптимального</h3>
              <p>Объясните, как можно оптимизировать решение с помощью хеш-таблицы.</p>
            </div>
            
            <div class="tip">
              <h3>4. Проанализируйте сложность</h3>
              <p>Объясните временную и пространственную сложность вашего решения.</p>
            </div>
            
            <div class="tip">
              <h3>5. Протестируйте на примерах</h3>
              <p>Продемонстрируйте работу алгоритма на конкретных примерах, включая сложные случаи.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  
  // Данные для визуализации
  const nums = ref([2, 7, 11, 15]);
  const target = ref(9);
  const mapEntries = ref([]);
  const currentIndex = ref(-1);
  const complementIndex = ref(null);
  const complement = ref(null);
  const currentStep = ref(0);
  const solution = ref(null);
  const foundSolution = ref(false);
  const foundComplement = ref(false);
  const animationRunning = ref(false);
  const animationTimer = ref(null);
  
  // Шаги анимации
  const steps = [
    {
      description: "Инициализация алгоритма. Создаем пустую Map для хранения пар (число: индекс).",
      action: () => {
        currentIndex.value = -1;
        complementIndex.value = null;
        complement.value = null;
        mapEntries.value = [];
        foundSolution.value = false;
        foundComplement.value = false;
      }
    },
    {
      description: "Рассматриваем первый элемент (индекс 0): 2",
      action: () => {
        currentIndex.value = 0;
        complement.value = target.value - nums.value[0]; // 9 - 2 = 7
        foundComplement.value = false;
      }
    },
    {
      description: "Проверяем, есть ли дополнение (7) в Map. Map пуст, поэтому дополнения нет.",
      action: () => {}
    },
    {
      description: "Добавляем текущее число 2 и его индекс 0 в Map.",
      action: () => {
        mapEntries.value.push([nums.value[0], 0]); // [2, 0]
      }
    },
    {
      description: "Рассматриваем второй элемент (индекс 1): 7",
      action: () => {
        currentIndex.value = 1;
        complement.value = target.value - nums.value[1]; // 9 - 7 = 2
        foundComplement.value = false;
      }
    },
    {
      description: "Проверяем, есть ли дополнение (2) в Map. Находим! Дополнение 2, индекс 0.",
      action: () => {
        foundComplement.value = true;
        complementIndex.value = 0;
      }
    },
    {
      description: "Найдено решение! Возвращаем пару индексов [0, 1], так как nums[0] + nums[1] = 2 + 7 = 9",
      action: () => {
        solution.value = [0, 1];
        foundSolution.value = true;
      }
    }
  ];
  
  const totalSteps = computed(() => steps.length - 1);
  const currentExplanation = computed(() => steps[currentStep.value]?.description || "");
  
  // Методы для управления анимацией
  function resetAnimation() {
    currentStep.value = 0;
    steps[0].action();
  }
  
  function stepForward() {
    if (currentStep.value < totalSteps.value) {
      currentStep.value++;
      steps[currentStep.value].action();
    }
  }
  
  function stepBack() {
    if (currentStep.value > 0) {
      currentStep.value--;
      // Выполняем все шаги с начала до текущего
      resetAnimation();
      for (let i = 1; i <= currentStep.value; i++) {
        steps[i].action();
      }
    }
  }
  
  function startAnimation() {
    resetAnimation();
    animationRunning.value = true;
    
    function runStep(stepIndex) {
      if (stepIndex <= totalSteps.value) {
        currentStep.value = stepIndex;
        steps[stepIndex].action();
        
        animationTimer.value = setTimeout(() => {
          runStep(stepIndex + 1);
        }, 1500);
      } else {
        animationRunning.value = false;
      }
    }
    
    runStep(1);
  }
  
  // Инициализация и очистка
  onMounted(() => {
    resetAnimation();
  });
  
  onBeforeUnmount(() => {
    if (animationTimer.value) {
      clearTimeout(animationTimer.value);
    }
  });
  </script>
  
  <style scoped>
  .twosum-explainer {
    font-family: Arial, sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    color: #000000;
  }
  
  h1 {
    text-align: center;
    color: #000000;
    margin-bottom: 30px;
  }
  
  h2 {
    color: #000000;
    border-bottom: 2px solid #333;
    padding-bottom: 10px;
    margin-top: 40px;
  }
  
  h3 {
    color: #000000;
    margin-top: 25px;
  }
  
  section {
    margin-bottom: 40px;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .problem-statement {
    background-color: #f0f0f0;
    padding: 15px;
    border-left: 4px solid #333;
    margin-bottom: 20px;
  }
  
  .example {
    background-color: #f0f8ff;
    padding: 15px;
    border-radius: 6px;
    margin-top: 15px;
  }
  
  .code-block {
    background-color: #2d2d2d;
    color: #ffffff;
    padding: 15px;
    border-radius: 6px;
    font-family: 'Courier New', monospace;
    overflow-x: auto;
    margin: 15px 0;
    white-space: pre;
  }
  
  .map-methods ul,
  .map-vs-object ul,
  .applications-list,
  .edge-cases-list,
  .tips-list {
    padding-left: 20px;
  }
  
  .map-methods li,
  .map-vs-object li {
    margin-bottom: 10px;
  }
  
  /* Стили для визуализации */
  .visualization-container {
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  .array-container {
    margin-bottom: 30px;
  }
  
  .array-title, .map-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #000000;
  }
  
  .array-items {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .array-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 6px;
    background-color: #f8f8f8;
    min-width: 60px;
    transition: all 0.3s ease;
  }
  
  .array-item.active {
    border-color: #4caf50;
    background-color: #e8f5e9;
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .array-item.highlight-complement {
    border-color: #2196f3;
    background-color: #e3f2fd;
  }
  
  .item-value {
    font-weight: bold;
    font-size: 1.2rem;
  }
  
  .item-index {
    font-size: 0.8rem;
    color: #666;
  }
  
  .map-container {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 6px;
  }
  
  .map-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .empty-map {
    font-style: italic;
    color: #666;
    padding: 10px;
  }
  
  .map-entry {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 15px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .map-entry.highlight-found {
    background-color: #fff8e1;
    border-color: #ffc107;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .entry-key, .entry-value {
    font-family: 'Courier New', monospace;
    font-weight: bold;
  }
  
  .entry-arrow {
    color: #666;
  }
  
  .current-step-info {
    background-color: #e8f5e9;
    padding: 15px;
    border-radius: 6px;
    margin-bottom: 20px;
  }
  
  .step-number {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .current-values {
    margin-bottom: 15px;
  }
  
  .current-values p {
    margin: 5px 0;
  }
  
  .solution-message {
    color: #4caf50;
    font-weight: bold;
  }
  
  .step-explanation {
    font-style: italic;
    line-height: 1.5;
  }
  
  .controls {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
  }
  
  .controls button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    background-color: #2196f3;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .controls button:hover:not(:disabled) {
    background-color: #1976d2;
  }
  
  .controls button:disabled {
    background-color: #bdbdbd;
    cursor: not-allowed;
  }
  
  .algorithm-steps ol {
    line-height: 1.6;
  }
  
  .algorithm-steps li {
    margin-bottom: 10px;
  }
  
  .application, .edge-case, .tip {
    margin-bottom: 25px;
  }
  
  .application h3, .edge-case h3, .tip h3 {
    color: #000000;
    margin-bottom: 10px;
  }
  
  /* Анимации */
  @keyframes highlight {
    0% { background-color: #ffffff; }
    50% { background-color: #e3f2fd; }
    100% { background-color: #ffffff; }
  }
  
  .highlight-animation {
    animation: highlight 1.5s ease-in-out;
  }
  </style>