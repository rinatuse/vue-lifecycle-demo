<template>
    <div class="twosum-explainer">
      <h1>Детальное объяснение Two Sum с расширенным массивом</h1>
      
      <div class="main-container">
        <section class="problem-section">
          <h2>Задача и исходные данные</h2>
          <div class="problem-box">
            <p>Дан массив чисел: <strong>{{ nums.join(', ') }}</strong></p>
            <p>Целевая сумма (target): <strong>{{ target }}</strong></p>
            <p>Нужно найти два числа, которые в сумме дают target, и вернуть их индексы.</p>
          </div>
        </section>
        
        <section class="algorithm-explanation">
          <h2>Как работает алгоритм Two Sum</h2>
          <div class="algorithm-overview">
            <p>Основные шаги:</p>
            <ol>
              <li>Создаём пустую хеш-таблицу (Map) для хранения пар <span class="code-highlight">{число: индекс}</span></li>
              <li>Проходим по каждому элементу массива nums[i]</li>
              <li>Для каждого элемента вычисляем его дополнение: <span class="code-highlight">complement = target - nums[i]</span></li>
              <li>Проверяем, есть ли это дополнение в Map</li>
              <li>Если есть, возвращаем [индекс_дополнения, текущий_индекс]</li>
              <li>Если нет, добавляем текущее число в Map и продолжаем</li>
            </ol>
          </div>
          
          <div class="code-explanation">
            <h3>Код алгоритма:</h3>
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
          </div>
        </section>
        
        <section class="interactive-demo">
          <h2>Пошаговая демонстрация</h2>
          
          <div class="controls">
            <button @click="resetDemo" :disabled="animating">Сбросить</button>
            <button @click="startDemo" :disabled="animating">Запустить анимацию</button>
            <button @click="stepForward" :disabled="animating || currentStep >= totalSteps">Следующий шаг</button>
            <button @click="stepBack" :disabled="animating || currentStep <= 0">Предыдущий шаг</button>
          </div>
          
          <div class="step-indicator">
            <span class="step-label">Шаг {{ currentStep }} из {{ totalSteps }}</span>
          </div>
          
          <div class="visualization">
            <div class="array-visualization">
              <h3>Массив чисел</h3>
              <div class="array-container">
                <div 
                  v-for="(num, idx) in nums" 
                  :key="idx" 
                  class="array-element" 
                  :class="{ 
                    'current-element': currentIndex === idx,
                    'processed-element': processedIndices.includes(idx),
                    'complement-element': complementIndex === idx,
                    'solution-element': (solutionFound && (solutionIndices.includes(idx)))
                  }"
                >
                  <div class="element-index">{{ idx }}</div>
                  <div class="element-value">{{ num }}</div>
                </div>
              </div>
            </div>
            
            <div class="map-visualization">
              <h3>Map (число: индекс)</h3>
              <div class="map-container">
                <div v-if="mapEntries.length === 0" class="empty-map">
                  Пустая Map
                </div>
                <div v-else class="map-entries">
                  <div 
                    v-for="(entry, idx) in mapEntries" 
                    :key="idx" 
                    class="map-entry"
                    :class="{ 'highlight-entry': complementFound && entry.key === complement }"
                  >
                    <div class="entry-key">{{ entry.key }}</div>
                    <div class="entry-arrow">→</div>
                    <div class="entry-value">{{ entry.value }}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="calculation-visualization">
              <h3>Текущие вычисления</h3>
              <div class="calculation-container">
                <div v-if="currentIndex >= 0" class="calculation-step">
                  <div class="calculation-row">
                    <span class="calc-label">Текущий индекс:</span>
                    <span class="calc-value">{{ currentIndex }}</span>
                  </div>
                  <div class="calculation-row">
                    <span class="calc-label">Текущее число (nums[{{ currentIndex }}]):</span>
                    <span class="calc-value">{{ nums[currentIndex] }}</span>
                  </div>
                  <div class="calculation-row highlight-calculation">
                    <span class="calc-label">Дополнение (complement):</span>
                    <span class="calc-value">
                      {{ target }} - {{ nums[currentIndex] }} = {{ complement }}
                    </span>
                  </div>
                  <div v-if="complementFound" class="calculation-row success-message">
                    <span>Найдено дополнение в Map! Индекс: {{ complementIndex }}</span>
                  </div>
                </div>
                <div v-else class="calculation-step">
                  <span>Начало алгоритма. Создаём пустую Map.</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="explanation-box">
            <h3>Объяснение текущего шага</h3>
            <div class="explanation-content">
              {{ currentExplanation }}
            </div>
          </div>
          
          <div v-if="solutionFound" class="solution-box">
            <h3>Решение найдено!</h3>
            <p>Индексы: [{{ solutionIndices[0] }}, {{ solutionIndices[1] }}]</p>
            <p>Числа: [{{ nums[solutionIndices[0]] }}, {{ nums[solutionIndices[1]] }}]</p>
            <p>Сумма: {{ nums[solutionIndices[0]] }} + {{ nums[solutionIndices[1]] }} = {{ target }}</p>
          </div>
        </section>
        
        <section class="complement-explanation">
          <h2>Подробное объяснение дополнения (complement)</h2>
          
          <div class="explanation-text">
            <p>Ключевая идея этого алгоритма — формула <span class="highlight-formula">complement = target - nums[i]</span>.</p>
            
            <p>Эта формула позволяет нам переформулировать задачу. Вместо того чтобы искать два числа a и b, которые в сумме дают target (a + b = target), мы можем искать для каждого числа его "дополнение" до target.</p>
            
            <p>Например, если target = 15 и у нас есть число 7, то нам нужно найти второе число, которое в сумме с 7 даст 15. Это число будет complement = 15 - 7 = 8.</p>
            
            <p>Для каждого числа в массиве мы проверяем:</p>
            <ul>
              <li>Вычисляем дополнение: <span class="code-highlight">complement = target - nums[i]</span></li>
              <li>Проверяем, есть ли это дополнение уже в Map</li>
              <li>Если есть, значит мы нашли пару чисел, которые в сумме дают target</li>
            </ul>
            
            <div class="formula-visualization">
              <div class="formula-row">
                <span class="formula-text">a + b = target</span>
                <span class="formula-arrow">↓</span>
                <span class="formula-text">b = target - a</span>
              </div>
              <div class="formula-example">
                <p>Для target = {{ target }} и числа a = 7:</p>
                <p>b = {{ target }} - 7 = {{ target - 7 }}</p>
                <p>Поэтому нам нужно найти число {{ target - 7 }} в массиве</p>
              </div>
            </div>
          </div>
          
          <div class="key-insights">
            <h3>Важные наблюдения</h3>
            <ul>
              <li>Этот метод позволяет решить задачу за один проход по массиву (O(n))</li>
              <li>Вместо перебора всех возможных пар (O(n²)), мы используем Map для быстрого поиска дополнения</li>
              <li>Map хранит все просмотренные числа и их индексы, поэтому мы можем быстро найти дополнение</li>
              <li>Алгоритм также правильно работает с отрицательными числами и нулями</li>
            </ul>
          </div>
        </section>
        
        <section class="map-detailed-explanation">
          <h2>Как работает Map в JavaScript</h2>
          
          <div class="map-explanation">
            <p>Map — это встроенная структура данных в JavaScript, которая хранит пары ключ-значение.</p>
            
            <h3>Основные операции с Map:</h3>
            <div class="operations-list">
              <div class="operation">
                <div class="operation-name">Создание:</div>
                <div class="operation-code">const numMap = new Map();</div>
                <div class="operation-description">Создаёт новую пустую Map</div>
              </div>
              
              <div class="operation">
                <div class="operation-name">Добавление элемента:</div>
                <div class="operation-code">numMap.set(key, value);</div>
                <div class="operation-description">Добавляет новую пару ключ-значение</div>
              </div>
              
              <div class="operation">
                <div class="operation-name">Проверка наличия ключа:</div>
                <div class="operation-code">numMap.has(key);</div>
                <div class="operation-description">Возвращает true, если ключ существует</div>
              </div>
              
              <div class="operation">
                <div class="operation-name">Получение значения:</div>
                <div class="operation-code">numMap.get(key);</div>
                <div class="operation-description">Возвращает значение по ключу</div>
              </div>
            </div>
            
            <div class="map-performance">
              <h3>Производительность Map:</h3>
              <p>Важное преимущество Map — константная сложность O(1) для операций добавления, поиска и удаления в среднем случае. Это делает Map идеальным выбором для алгоритма Two Sum, где нам нужен быстрый поиск элементов.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref,  computed, onBeforeUnmount } from 'vue';
  
  // Увеличенный массив с числами в конце
  const nums = [2, 7, 11, 15, 8, 1, 9, 6, 4, 3];
  const target = 10;
  
  // Состояние анимации
  const currentStep = ref(0);
  const currentIndex = ref(-1);
  const complement = ref(null);
  const complementIndex = ref(null);
  const complementFound = ref(false);
  const processedIndices = ref([]);
  const mapEntries = ref([]);
  const solutionFound = ref(false);
  const solutionIndices = ref([]);
  const animating = ref(false);
  const animationTimer = ref(null);
  
  // Максимальное количество шагов
  const totalSteps = computed(() => {
    // В нашем случае решение найдётся на 9-м шаге (индексы 1 и 9)
    // поэтому общее количество шагов будет равно этапу завершения + 1
    return 11;
  });
  
  // Объяснения для каждого шага
  const explanations = [
    "Начинаем алгоритм. Создаём пустую Map для хранения пар {число: индекс}.",
    
    "Шаг 1: Рассматриваем первый элемент nums[0] = 2. \n\nВычисляем дополнение: complement = target - nums[0] = 10 - 2 = 8. \n\nПроверяем, есть ли число 8 в Map. Map пуста, поэтому 8 нет. \n\nДобавляем число 2 и его индекс 0 в Map: {2: 0}.",
    
    "Шаг 2: Рассматриваем второй элемент nums[1] = 7. \n\nВычисляем дополнение: complement = target - nums[1] = 10 - 7 = 3. \n\nПроверяем, есть ли число 3 в Map. В Map только {2: 0}, поэтому 3 нет. \n\nДобавляем число 7 и его индекс 1 в Map: {2: 0, 7: 1}.",
    
    "Шаг 3: Рассматриваем третий элемент nums[2] = 11. \n\nВычисляем дополнение: complement = target - nums[2] = 10 - 11 = -1. \n\nПроверяем, есть ли число -1 в Map. В Map только {2: 0, 7: 1}, поэтому -1 нет. \n\nДобавляем число 11 и его индекс 2 в Map: {2: 0, 7: 1, 11: 2}.",
    
    "Шаг 4: Рассматриваем четвёртый элемент nums[3] = 15. \n\nВычисляем дополнение: complement = target - nums[3] = 10 - 15 = -5. \n\nПроверяем, есть ли число -5 в Map. В Map только {2: 0, 7: 1, 11: 2}, поэтому -5 нет. \n\nДобавляем число 15 и его индекс 3 в Map: {2: 0, 7: 1, 11: 2, 15: 3}.",
    
    "Шаг 5: Рассматриваем пятый элемент nums[4] = 8. \n\nВычисляем дополнение: complement = target - nums[4] = 10 - 8 = 2. \n\nПроверяем, есть ли число 2 в Map. Да! 2 есть в Map с индексом 0. \n\nМы нашли решение: [0, 4], так как nums[0] + nums[4] = 2 + 8 = 10.",
    
    "Решение найдено! Но давайте продолжим алгоритм, чтобы увидеть, есть ли другие пары. \n\nДобавляем число 8 и его индекс 4 в Map: {2: 0, 7: 1, 11: 2, 15: 3, 8: 4}.",
    
    "Шаг 6: Рассматриваем шестой элемент nums[5] = 1. \n\nВычисляем дополнение: complement = target - nums[5] = 10 - 1 = 9. \n\nПроверяем, есть ли число 9 в Map. В Map нет числа 9. \n\nДобавляем число 1 и его индекс 5 в Map: {2: 0, 7: 1, 11: 2, 15: 3, 8: 4, 1: 5}.",
    
    "Шаг 7: Рассматриваем седьмой элемент nums[6] = 9. \n\nВычисляем дополнение: complement = target - nums[6] = 10 - 9 = 1. \n\nПроверяем, есть ли число 1 в Map. Да! 1 есть в Map с индексом 5. \n\nМы нашли ещё одно решение: [5, 6], так как nums[5] + nums[6] = 1 + 9 = 10.",
    
    "Шаг 8: Рассматриваем восьмой элемент nums[7] = 6. \n\nВычисляем дополнение: complement = target - nums[7] = 10 - 6 = 4. \n\nПроверяем, есть ли число 4 в Map. В Map нет числа 4. \n\nДобавляем число 6 и его индекс 7 в Map: {2: 0, 7: 1, 11: 2, 15: 3, 8: 4, 1: 5, 9: 6, 6: 7}.",
    
    "Шаг 9: Рассматриваем девятый элемент nums[8] = 4. \n\nВычисляем дополнение: complement = target - nums[8] = 10 - 4 = 6. \n\nПроверяем, есть ли число 6 в Map. Да! 6 есть в Map с индексом 7. \n\nМы нашли ещё одно решение: [7, 8], так как nums[7] + nums[8] = 6 + 4 = 10.",
    
    "Шаг 10: Рассматриваем десятый элемент nums[9] = 3. \n\nВычисляем дополнение: complement = target - nums[9] = 10 - 3 = 7. \n\nПроверяем, есть ли число 7 в Map. Да! 7 есть в Map с индексом 1. \n\nМы нашли ещё одно решение: [1, 9], так как nums[1] + nums[9] = 7 + 3 = 10."
  ];
  
  const currentExplanation = computed(() => {
    return explanations[currentStep.value] || "";
  });
  
  // Методы для управления анимацией
  function resetDemo() {
    currentStep.value = 0;
    currentIndex.value = -1;
    complement.value = null;
    complementIndex.value = null;
    complementFound.value = false;
    processedIndices.value = [];
    mapEntries.value = [];
    solutionFound.value = false;
    solutionIndices.value = [];
  }
  
  function updateState() {
    // Обновляем состояние в зависимости от текущего шага
    // Шаг 0 - начальное состояние
    if (currentStep.value === 0) {
      resetDemo();
      return;
    }
    
    // Расчёт для шагов 1-10 (индексы 0-9)
    const stepIndex = currentStep.value - 1;
    if (stepIndex >= 0 && stepIndex < nums.length) {
      currentIndex.value = stepIndex;
      complement.value = target - nums[stepIndex];
      
      // Проверяем, есть ли дополнение в Map
      const foundEntry = mapEntries.value.find(entry => entry.key === complement.value);
      
      if (foundEntry) {
        complementFound.value = true;
        complementIndex.value = foundEntry.value;
        solutionFound.value = true;
        solutionIndices.value = [foundEntry.value, stepIndex];
      } else {
        complementFound.value = false;
        complementIndex.value = null;
        
        // Добавляем число в Map, если это не шаг с найденным решением
        // или если мы специально показываем добавление после найденного решения
        if (currentStep.value === 6) {
          // Добавляем 8 с индексом 4 после нахождения решения на шаге 5
          if (!mapEntries.value.some(entry => entry.key === nums[4])) {
            mapEntries.value.push({ key: nums[4], value: 4 });
          }
        } else if (!complementFound.value) {
          mapEntries.value.push({ key: nums[stepIndex], value: stepIndex });
        }
      }
      
      // Добавляем индекс в список обработанных
      if (!processedIndices.value.includes(stepIndex)) {
        processedIndices.value.push(stepIndex);
      }
    }
  }
  
  function stepForward() {
    if (currentStep.value < totalSteps.value) {
      currentStep.value++;
      updateState();
    }
  }
  
  function stepBack() {
    if (currentStep.value > 0) {
      currentStep.value--;
      
      // Для шага назад нужно пересчитать все состояния с нуля
      resetDemo();
      for (let i = 1; i <= currentStep.value; i++) {
        currentStep.value = i;
        updateState();
      }
    }
  }
  
  function startDemo() {
    resetDemo();
    animating.value = true;
    
    function runStep(step) {
      if (step <= totalSteps.value) {
        currentStep.value = step;
        updateState();
        
        animationTimer.value = setTimeout(() => {
          runStep(step + 1);
        }, 3000); // 3 секунды на шаг
      } else {
        animating.value = false;
      }
    }
    
    runStep(1);
  }
  
  // Очистка таймера при уничтожении компонента
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
    line-height: 1.6;
    background-color: #ffffff;
    color: #000000;
  }
  
  .main-container {
    background-color: #ffffff;
  }
  
  h1, h2, h3 {
    color: #000000;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 30px;
  }
  
  h2 {
    margin-top: 40px;
    margin-bottom: 20px;
    padding-bottom: 8px;
    border-bottom: 2px solid #f0f0f0;
  }
  
  section {
    margin-bottom: 50px;
    background-color: #ffffff;
  }
  
  .problem-box {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #4a90e2;
    margin-bottom: 20px;
  }
  
  .algorithm-overview ol {
    padding-left: 20px;
  }
  
  .algorithm-overview li {
    margin-bottom: 10px;
  }
  
  .code-block {
    background-color: #2d2d2d;
    color: #ffffff;
    padding: 15px;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
    overflow-x: auto;
    margin: 15px 0;
    white-space: pre;
  }
  
  .code-highlight {
    background-color: #2d2d2d;
    color: #ff9800;
    padding: 2px 5px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
  }
  
  .controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .controls button {
    padding: 10px 15px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 14px;
  }
  
  .controls button:hover:not(:disabled) {
    background-color: #3276c3;
  }
  
  .controls button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .step-indicator {
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
  }
  
  .visualization {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .array-visualization, .map-visualization, .calculation-visualization {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
  }
  
  .array-visualization {
    grid-column: 1 / -1;
  }
  
  .array-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 15px;
  }
  
  .array-element {
    width: 60px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border: 2px solid #dddddd;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  .element-index {
    font-size: 12px;
    color: #666666;
    margin-bottom: 5px;
  }
  
  .element-value {
    font-size: 24px;
    font-weight: bold;
  }
  
  .current-element {
    border-color: #4a90e2;
    background-color: #e6f3ff;
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .processed-element {
    border-color: #4caf50;
    background-color: #f1f8e9;
  }
  
  .complement-element {
    border-color: #ff9800;
    background-color: #fff3e0;
  }
  
  .solution-element {
    border-color: #e91e63;
    background-color: #fce4ec;
  }
  
  .map-container {
    background-color: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 6px;
    padding: 15px;
    min-height: 100px;
    max-height: 300px;
    overflow-y: auto;
  }
  
  .empty-map {
    color: #999999;
    text-align: center;
    padding: 20px;
    font-style: italic;
  }
  
  .map-entries {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .map-entry {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    padding: 8px 15px;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .entry-key, .entry-value {
    font-weight: bold;
  }
  
  .entry-arrow {
    margin: 0 10px;
    color: #666666;
  }
  
  .highlight-entry {
    background-color: #fff3e0;
    border-left: 3px solid #ff9800;
  }
  
  .calculation-container {
    background-color: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 6px;
    padding: 15px;
    min-height: 100px;
  }
  
  .calculation-step {
    font-size: 15px;
  }
  
  .calculation-row {
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .calc-label {
    font-weight: bold;
    color: #333333;
  }
  
  .highlight-calculation {
    padding: 8px;
    background-color: #e6f3ff;
    border-radius: 4px;
    border-left: 3px solid #4a90e2;
  }
  
  .success-message {
    padding: 8px;
    background-color: #f1f8e9;
    border-radius: 4px;
    border-left: 3px solid #4caf50;
    color: #2e7d32;
    font-weight: bold;
  }
  
  .explanation-box {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
  }
  
  .explanation-content {
    white-space: pre-line;
    line-height: 1.7;
  }
  
  .solution-box {
    background-color: #fce4ec;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #e91e63;
    margin-top: 30px;
  }
  
  .solution-box h3 {
    color: #e91e63;
    margin-top: 0;
  }
  
  .highlight-formula {
    background-color: #e8f5e9;
    color: #2e7d32;
    padding: 3px 6px;
    border-radius: 3px;
    font-weight: bold;
  }
  
  .formula-visualization {
    margin: 20px 0;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
  }
  
  .formula-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .formula-text {
    font-size: 20px;
    font-weight: bold;
    margin: 5px 0;
  }
  
  .formula-arrow {
    font-size: 24px;
    color: #4a90e2;
    margin: 5px 0;
  }
  
  .formula-example {
    background-color: #ffffff;
    padding: 15px;
    border-radius: 6px;
    border-left: 3px solid #4a90e2;
  }
  
  .key-insights {
    background-color: #fff3e0;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #ff9800;
    margin-top: 30px;
  }
  
  .key-insights h3 {
    color: #e65100;
    margin-top: 0;
  }
  
  .key-insights ul {
    padding-left: 20px;
  }
  
  .key-insights li {
    margin-bottom: 10px;
  }
  
  .operations-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
    margin: 20px 0;
  }
  
  .operation {
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 6px;
    border-left: 3px solid #4a90e2;
  }
  
  .operation-name {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .operation-code {
    font-family: 'Courier New', monospace;
    background-color: #2d2d2d;
    color: white;
    padding: 8px;
    border-radius: 4px;
    margin-bottom: 8px;
  }
  
  .operation-description {
    color: #555555;
  }
  
  .map-performance {
    background-color: #e8f5e9;
    padding: 15px;
    border-radius: 6px;
    border-left: 3px solid #4caf50;
    margin-top: 20px;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .visualization {
      grid-template-columns: 1fr;
    }
    
    .array-element {
      width: 50px;
      height: 60px;
    }
  }
  </style>