<template>
    <div class="atm-demo">
      <h1>Алгоритм выдачи денег в банкомате</h1>
      <p class="intro">Разбор задачи о выдаче оптимального набора купюр с визуализацией и пошаговым объяснением</p>
      
      <div class="sections-nav">
        <button 
          v-for="(section, index) in sections" 
          :key="section.id"
          :class="{ active: currentSection === index }"
          @click="setCurrentSection(index)"
        >
          {{ section.title }}
        </button>
      </div>
      
      <!-- Секция с задачей -->
      <section v-show="currentSection === 0" class="problem-section">
        <h2>📋 Постановка задачи</h2>
        <div class="task-description">
          <p>В банкомате имеются купюры номиналом <code>50</code>, <code>100</code>, <code>500</code>, <code>1000</code>, <code>5000</code> рублей.</p>
          <p>Есть ограничение на количество каждой из купюр (аргумент <code>limits</code>), который нужно мутировать при выдаче.</p>
          <p>Необходимо вернуть объект с номиналами и количеством купюр, которыми можно выдать запрашиваемую сумму.</p>
          <p>При равных возможностях выдачи суммы, <strong>приоритет отдаётся крупным купюрам</strong>.</p>
          <p>Нужно обработать следующие ошибки:</p>
          <ul>
            <li>Если запрашиваемая сумма не кратна минимальному номиналу (50) - выбросить ошибку <code>'Incorrect value'</code>.</li>
            <li>Если в банкомате недостаточно нужных купюр - выбросить ошибку <code>'Not enough money'</code>.</li>
          </ul>
        </div>
        
        <div class="code-example">
          <h3>Сигнатура функции:</h3>
          <pre><code>const nominals = [5000, 1000, 500, 100, 50];
  const limits = { 50: 10, 100: 10, 500: 10, 1000: 10, 5000: 10 };
  
  function atm(amount, limits, nominals = nominals) {
    // Ваш код здесь
  }
  
  console.log(atm(2350, limits)); // {50: 1, 100: 3, 1000: 2}
  console.log(atm(11350, limits)); // {50: 1, 100: 3, 1000: 1, 5000: 2}
  console.log(atm(777, limits)); // Ошибка "Incorrect value"</code></pre>
        </div>
      </section>
      
      <!-- Секция с алгоритмом -->
      <section v-show="currentSection === 1" class="algorithm-section">
        <h2>⚙️ Алгоритм решения</h2>
        
        <div class="algorithm-description">
          <h3>Для решения этой задачи оптимально использовать <strong>Жадный алгоритм</strong> (Greedy Algorithm)</h3>
          
          <div class="algorithm-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Проверка корректности суммы</h4>
                <p>Проверьте, кратна ли запрашиваемая сумма минимальному номиналу (50). Если нет - выбросите ошибку <code>'Incorrect value'</code>.</p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Сортировка номиналов</h4>
                <p>Убедитесь, что номиналы отсортированы по убыванию (от самого крупного к самому мелкому).</p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Жадный выбор купюр</h4>
                <p>Для каждого номинала, начиная с самого крупного:</p>
                <ol>
                  <li>Посчитайте, сколько купюр данного номинала требуется (целочисленное деление суммы на номинал).</li>
                  <li>Сравните это число с доступным количеством купюр данного номинала.</li>
                  <li>Выберите минимум из этих двух чисел - это будет количество купюр данного номинала, которое мы возьмем.</li>
                  <li>Уменьшите остаток суммы на стоимость выбранных купюр.</li>
                  <li>Добавьте выбранные купюры в результат, если их количество больше 0.</li>
                </ol>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>Проверка возможности выдачи</h4>
                <p>После обработки всех номиналов проверьте, равен ли остаток суммы нулю. Если нет - выбросите ошибку <code>'Not enough money'</code>.</p>
              </div>
            </div>
          </div>
          
          <div class="why-greedy">
            <h3>Почему жадный алгоритм работает в данной задаче?</h3>
            <p>Жадный алгоритм гарантирует оптимальное решение в данной задаче, потому что:</p>
            <ul>
              <li>Номиналы купюр выбраны таким образом, что каждый больший номинал кратен или значительно больше меньших номиналов.</li>
              <li>Мы всегда можем разменять крупную купюру на несколько мелких.</li>
              <li>По условию, при равных возможностях предпочтение отдается крупным купюрам.</li>
            </ul>
          </div>
        </div>
      </section>
      
      <!-- Секция с визуализацией -->
      <section v-show="currentSection === 2" class="visualization-section">
        <h2>📊 Визуализация работы алгоритма</h2>
        
        <div class="visualization-controls">
          <div class="input-group">
            <label for="amount-input">Введите сумму для выдачи:</label>
            <input 
              id="amount-input" 
              v-model.number="inputAmount" 
              type="number" 
              min="50" 
              step="50"
              placeholder="Например, 2350"
            />
          </div>
          <button @click="runVisualization" :disabled="isVisualizing" class="run-btn">
            {{ isVisualizing ? 'Выполняется...' : 'Запустить' }}
          </button>
          <button @click="resetVisualization" :disabled="isVisualizing" class="reset-btn">
            Сбросить
          </button>
        </div>
        
        <div class="atm-state">
          <div class="amount-display">
            <div class="display-label">Запрашиваемая сумма:</div>
            <div class="amount-value">{{ formattedAmount }}</div>
            <div v-if="remainingAmount < inputAmount && remainingAmount > 0" class="remaining-label">
              Остаток: <span>{{ remainingAmount }} ₽</span>
            </div>
          </div>
          
          <div class="banknotes-container">
            <div 
              v-for="nominal in nominals" 
              :key="nominal"
              class="banknote-row"
              :class="{ active: currentNominal === nominal }"
            >
              <div class="nominal-label">{{ nominal }} ₽</div>
              <div class="banknote-limits">
                <div class="available">Доступно: {{ atmLimits[nominal] }}</div>
                <div v-if="visualSteps[nominal]" class="taken">
                  Взято: {{ visualSteps[nominal] }}
                </div>
              </div>
              <div class="banknotes-visual">
                <div 
                  v-for="i in atmLimits[nominal]" 
                  :key="`${nominal}-${i}`"
                  class="banknote"
                  :class="{ 
                    selected: visualSteps[nominal] && i <= visualSteps[nominal],
                    available: !visualSteps[nominal] || i > visualSteps[nominal]
                  }"
                  :style="{ backgroundImage: `url(https://via.placeholder.com/80x40/92C7CF/FFFFFF?text=${nominal})` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="visualization-result" v-if="visualizationDone">
          <h3>Результат:</h3>
          <div class="result-container">
            <div v-if="visualizationSuccess" class="success-result">
              <p>Сумма {{ formattedAmount }} успешно выдана следующими купюрами:</p>
              <div class="result-banknotes">
                <div v-for="(count, nominal) in result" :key="`result-${nominal}`" class="result-banknote">
                  <div class="banknote-visual" :style="{ backgroundImage: `url(https://via.placeholder.com/80x40/92C7CF/FFFFFF?text=${nominal})` }"></div>
                  <div class="banknote-count">× {{ count }}</div>
                </div>
              </div>
              <pre><code>{{ JSON.stringify(result, null, 2) }}</code></pre>
            </div>
            <div v-else class="error-result">
              <p>Произошла ошибка:</p>
              <div class="error-message">{{ errorMessage }}</div>
            </div>
          </div>
        </div>
        
        <div class="explanation-log">
          <h3>Пошаговое объяснение:</h3>
          <div class="log-container" ref="logContainer">
            <div v-for="(log, index) in visualizationLog" :key="index" class="log-item">
              <div class="log-icon" :class="log.type"></div>
              <div class="log-text" v-html="log.text"></div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Секция с кодом -->
      <section v-show="currentSection === 3" class="code-section">
        <h2>📝 Полная реализация</h2>
        
        <div class="implementation">
          <pre><code>/**
   * Функция для выдачи денег из банкомата.
   * @param {number} amount - Запрашиваемая сумма
   * @param {Object} limits - Объект с ограничениями на количество купюр
   * @param {Array} nominals - Массив доступных номиналов (по убыванию)
   * @returns {Object} - Объект с количеством купюр каждого номинала для выдачи
   */
  function atm(amount, limits, nominals = [5000, 1000, 500, 100, 50]) {
    // Проверка, кратна ли сумма минимальному номиналу
    if (amount % Math.min(...nominals) !== 0) {
      throw new Error('Incorrect value');
    }
    
    // Создаем копию лимитов, чтобы не мутировать входные данные сразу
    const availableLimits = { ...limits };
    
    // Создаем объект для результата
    const result = {};
    let remainingAmount = amount;
    
    // Перебираем номиналы от крупных к мелким
    for (const nominal of nominals) {
      // Сколько купюр данного номинала требуется
      const neededBanknotes = Math.floor(remainingAmount / nominal);
      
      // Сколько купюр данного номинала доступно
      const availableBanknotes = availableLimits[nominal] || 0;
      
      // Берем минимум из требуемого и доступного количества
      const takenBanknotes = Math.min(neededBanknotes, availableBanknotes);
      
      // Если взяли купюры, добавляем их в результат
      if (takenBanknotes > 0) {
        result[nominal] = takenBanknotes;
        
        // Уменьшаем доступное количество купюр
        availableLimits[nominal] -= takenBanknotes;
        
        // Уменьшаем оставшуюся сумму
        remainingAmount -= takenBanknotes * nominal;
      }
    }
    
    // Проверяем, выдали ли всю сумму
    if (remainingAmount > 0) {
      throw new Error('Not enough money');
    }
    
    // Обновляем исходные лимиты (мутация входного аргумента)
    Object.keys(availableLimits).forEach(nominal => {
      limits[nominal] = availableLimits[nominal];
    });
    
    return result;
  }</code></pre>
        </div>
        
        <div class="edge-cases">
          <h3>Подводные камни и важные моменты</h3>
          <ul>
            <li>
              <strong>Мутация лимитов:</strong> По условию задачи, мы должны мутировать входной аргумент <code>limits</code>. Однако в решении сначала создается копия, чтобы обновить лимиты только после успешной выдачи.
            </li>
            <li>
              <strong>Проверка кратности:</strong> Важно проверить кратность суммы минимальному номиналу в самом начале.
            </li>
            <li>
              <strong>Сортировка номиналов:</strong> Номиналы должны быть отсортированы по убыванию для работы жадного алгоритма.
            </li>
            <li>
              <strong>Проверка возможности выдачи:</strong> Даже если сумма кратна минимальному номиналу, может быть недостаточно купюр для её выдачи.
            </li>
            <li>
              <strong>Отсутствие номинала в лимитах:</strong> Если какой-то номинал отсутствует в лимитах, используется значение 0.
            </li>
          </ul>
        </div>
      </section>
      
      <!-- Секция с реальными примерами -->
      <section v-show="currentSection === 4" class="real-examples-section">
        <h2>🌐 Применение в реальной жизни</h2>
        
        <div class="real-examples">
          <div class="example-card">
            <div class="example-title">Банкоматы и кассовые аппараты</div>
            <div class="example-content">
              <p>Очевидное применение - это реальные банкоматы и кассовые аппараты, которые должны выдавать деньги оптимальным набором купюр.</p>
              <p>Современные банкоматы используют похожие алгоритмы, учитывая доступные номиналы и их количество в кассетах.</p>
            </div>
          </div>
          
          <div class="example-card">
            <div class="example-title">Платежные системы</div>
            <div class="example-content">
              <p>Электронные платежные системы могут использовать такие алгоритмы для оптимального распределения транзакций между разными счетами или для планирования выплат.</p>
            </div>
          </div>
          
          <div class="example-card">
            <div class="example-title">Обмен валют</div>
            <div class="example-content">
              <p>Обменные пункты и банки используют похожие алгоритмы для выдачи оптимального набора купюр при обмене валют.</p>
            </div>
          </div>
          
          <div class="example-card">
            <div class="example-title">Логистика и упаковка</div>
            <div class="example-content">
              <p>Аналогичный подход используется в логистике при упаковке товаров в контейнеры разного размера, где нужно оптимально использовать доступное пространство.</p>
            </div>
          </div>
          
          <div class="example-card">
            <div class="example-title">Финансовое планирование</div>
            <div class="example-content">
              <p>При бюджетном планировании часто нужно распределить ресурсы разными "порциями", используя похожие принципы оптимизации.</p>
            </div>
          </div>
        </div>
        
        <div class="similar-algorithms">
          <h3>Похожие алгоритмические задачи</h3>
          <ul>
            <li>
              <strong>Задача о размене монет (Coin Change Problem)</strong> - классическая задача динамического программирования, где нужно найти минимальное количество монет для размена суммы.
            </li>
            <li>
              <strong>Задача о рюкзаке (Knapsack Problem)</strong> - нужно выбрать предметы с максимальной ценностью, не превышая заданный вес.
            </li>
            <li>
              <strong>Задача о покрытии множества (Set Cover Problem)</strong> - найти минимальное количество подмножеств, которые покрывают все элементы.
            </li>
          </ul>
        </div>
      </section>
      
      <!-- Секция с тестированием -->
      <section v-show="currentSection === 5" class="testing-section">
        <h2>🧪 Проверь себя</h2>
        
        <div class="test-your-solution">
          <h3>Проверь свое решение на этих примерах:</h3>
          
          <div class="test-cases">
            <div v-for="(test, index) in testCases" :key="index" class="test-case">
              <div class="test-input">
                <strong>Входные данные:</strong>
                <pre><code>amount: {{ test.amount }}
  limits: {{ JSON.stringify(test.limits, null, 2) }}</code></pre>
              </div>
              
              <div class="test-output">
                <strong>Ожидаемый результат:</strong>
                <pre v-if="!test.isError"><code>{{ JSON.stringify(test.expected, null, 2) }}</code></pre>
                <div v-else class="expected-error">{{ test.expected }}</div>
              </div>
              
              <button @click="runTest(index)" class="test-button">Проверить</button>
              
              <div v-if="test.result !== undefined" class="test-result" :class="{ success: test.passed, error: !test.passed }">
                <div v-if="test.passed" class="success-message">✓ Тест пройден!</div>
                <div v-else class="error-message">
                  ✗ Тест не пройден!
                  <div class="actual-result">
                    <strong>Фактический результат:</strong>
                    <pre v-if="typeof test.result === 'object'"><code>{{ JSON.stringify(test.result, null, 2) }}</code></pre>
                    <div v-else class="actual-error">{{ test.result }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, nextTick } from 'vue';
  
  // Константы для задачи
  const nominals = [5000, 1000, 500, 100, 50];
  const initialLimits = { 50: 10, 100: 10, 500: 10, 1000: 10, 5000: 10 };
  
  // Состояние навигации
  const sections = [
    { id: 'problem', title: 'Задача' },
    { id: 'algorithm', title: 'Алгоритм' },
    { id: 'visualization', title: 'Визуализация' },
    { id: 'code', title: 'Код' },
    { id: 'real-examples', title: 'Применение' },
    { id: 'testing', title: 'Тестирование' }
  ];
  const currentSection = ref(0);
  
  // Состояние визуализации
  const inputAmount = ref(2350);
  const formattedAmount = computed(() => {
    return new Intl.NumberFormat('ru-RU').format(inputAmount.value) + ' ₽';
  });
  const atmLimits = ref({ ...initialLimits });
  const remainingAmount = ref(0);
  const currentNominal = ref(null);
  const visualSteps = ref({});
  const visualizationLog = ref([]);
  const isVisualizing = ref(false);
  const visualizationDone = ref(false);
  const visualizationSuccess = ref(false);
  const result = ref({});
  const errorMessage = ref('');
  const logContainer = ref(null);
  
  // Результаты тестов
  const testCases = ref([
    {
      amount: 2350,
      limits: { 50: 10, 100: 10, 500: 10, 1000: 10, 5000: 10 },
      expected: { 50: 1, 100: 3, 1000: 2 },
      isError: false
    },
    {
      amount: 11350,
      limits: { 50: 10, 100: 10, 500: 10, 1000: 10, 5000: 10 },
      expected: { 50: 1, 100: 3, 1000: 1, 5000: 2 },
      isError: false
    },
    {
      amount: 777,
      limits: { 50: 10, 100: 10, 500: 10, 1000: 10, 5000: 10 },
      expected: 'Incorrect value',
      isError: true
    },
    {
      amount: 50000,
      limits: { 50: 10, 100: 10, 500: 10, 1000: 10, 5000: 1 },
      expected: 'Not enough money',
      isError: true
    },
    {
      amount: 600,
      limits: { 50: 2, 100: 5, 500: 0, 1000: 0, 5000: 0 },
      expected: { 50: 2, 100: 5 },
      isError: false
    }
  ]);
  
  // Функции для навигации
  function setCurrentSection(index) {
    currentSection.value = index;
  }
  
  // Функция ATM для тестирования
  /**
   * Функция для выдачи денег из банкомата.
   * @param {number} amount - Запрашиваемая сумма
   * @param {Object} limits - Объект с ограничениями на количество купюр
   * @param {Array} nominals - Массив доступных номиналов (по убыванию)
   * @returns {Object} - Объект с количеством купюр каждого номинала для выдачи
   */
  function atmImplementation(amount, limits, nominals = [5000, 1000, 500, 100, 50]) {
    // Проверка, кратна ли сумма минимальному номиналу
    if (amount % Math.min(...nominals) !== 0) {
      throw new Error('Incorrect value');
    }
    
    // Создаем копию лимитов, чтобы не мутировать входные данные сразу
    const availableLimits = { ...limits };
    
    // Создаем объект для результата
    const result = {};
    let remainingAmount = amount;
    
    // Перебираем номиналы от крупных к мелким
    for (const nominal of nominals) {
      // Сколько купюр данного номинала требуется
      const neededBanknotes = Math.floor(remainingAmount / nominal);
      
      // Сколько купюр данного номинала доступно
      const availableBanknotes = availableLimits[nominal] || 0;
      
      // Берем минимум из требуемого и доступного количества
      const takenBanknotes = Math.min(neededBanknotes, availableBanknotes);
      
      // Если взяли купюры, добавляем их в результат
      if (takenBanknotes > 0) {
        result[nominal] = takenBanknotes;
        
        // Уменьшаем доступное количество купюр
        availableLimits[nominal] -= takenBanknotes;
        
        // Уменьшаем оставшуюся сумму
        remainingAmount -= takenBanknotes * nominal;
      }
    }
    
    // Проверяем, выдали ли всю сумму
    if (remainingAmount > 0) {
      throw new Error('Not enough money');
    }
    
    // Обновляем исходные лимиты (мутация входного аргумента)
    Object.keys(availableLimits).forEach(nominal => {
      limits[nominal] = availableLimits[nominal];
    });
    
    return result;
  }
  
  // Функция для запуска анимации
  async function runVisualization() {
    try {
      // Сбрасываем состояние
      resetVisualization();
      
      // Запускаем визуализацию
      isVisualizing.value = true;
      visualizationLog.value.push({
        type: 'info',
        text: `Начинаем выдачу суммы <strong>${formattedAmount.value}</strong>`
      });
      
      // Шаг 1: Проверка кратности суммы минимальному номиналу
      await delay(800);
      
      const minNominal = Math.min(...nominals);
      visualizationLog.value.push({
        type: 'check',
        text: `Проверка: кратна ли сумма ${inputAmount.value} минимальному номиналу ${minNominal}...`
      });
      
      await delay(800);
      
      if (inputAmount.value % minNominal !== 0) {
        visualizationLog.value.push({
          type: 'error',
          text: `Ошибка: сумма ${inputAmount.value} не кратна ${minNominal}. Выходим с ошибкой "Incorrect value".`
        });
        visualizationDone.value = true;
        visualizationSuccess.value = false;
        errorMessage.value = 'Incorrect value';
        isVisualizing.value = false;
        return;
      }
      
      visualizationLog.value.push({
        type: 'success',
        text: `Проверка успешна: сумма ${inputAmount.value} кратна ${minNominal}.`
      });
      
      // Шаг 2: Начинаем перебор номиналов
      await delay(800);
      visualizationLog.value.push({
        type: 'info',
        text: 'Начинаем выбирать купюры (жадный алгоритм)...'
      });
      
      remainingAmount.value = inputAmount.value;
      
      for (const nominal of nominals) {
        await delay(800);
        currentNominal.value = nominal;
        
        visualizationLog.value.push({
          type: 'process',
          text: `Обрабатываем номинал <strong>${nominal} ₽</strong>`
        });
        
        // Определяем, сколько купюр этого номинала нужно
        const neededBanknotes = Math.floor(remainingAmount.value / nominal);
        
        await delay(600);
        visualizationLog.value.push({
          type: 'calc',
          text: `Требуется купюр: ${remainingAmount.value} ÷ ${nominal} = ${neededBanknotes} шт.`
        });
        
        // Сколько купюр доступно
        const availableBanknotes = atmLimits.value[nominal] || 0;
        
        await delay(600);
        visualizationLog.value.push({
          type: 'check',
          text: `Доступно купюр номиналом ${nominal} ₽: ${availableBanknotes} шт.`
        });
        
        // Выбираем минимальное количество
        const takenBanknotes = Math.min(neededBanknotes, availableBanknotes);
        
        await delay(600);
        if (takenBanknotes > 0) {
          visualizationLog.value.push({
            type: 'success',
            text: `Берем ${takenBanknotes} купюр по ${nominal} ₽. Общая сумма: ${takenBanknotes * nominal} ₽.`
          });
          
          // Обновляем визуально
          visualSteps.value[nominal] = takenBanknotes;
          
          // Обновляем лимиты и остаток
          await delay(500);
          atmLimits.value[nominal] -= takenBanknotes;
          remainingAmount.value -= takenBanknotes * nominal;
          
          // Добавляем в результат
          result.value[nominal] = takenBanknotes;
          
          await delay(400);
          visualizationLog.value.push({
            type: 'info',
            text: `Осталось выдать: ${remainingAmount.value} ₽`
          });
        } else {
          visualizationLog.value.push({
            type: 'info',
            text: `Пропускаем номинал ${nominal} ₽, т.к. не берем купюр этого номинала.`
          });
        }
      }
      
      // Проверяем, выдали ли всю сумму
      await delay(800);
      visualizationLog.value.push({
        type: 'check',
        text: `Проверка: остаток суммы равен ${remainingAmount.value} ₽...`
      });
      
      await delay(800);
      if (remainingAmount.value > 0) {
        visualizationLog.value.push({
          type: 'error',
          text: `Ошибка: не удалось выдать всю сумму. Осталось ${remainingAmount.value} ₽. Выходим с ошибкой "Not enough money".`
        });
        visualizationDone.value = true;
        visualizationSuccess.value = false;
        errorMessage.value = 'Not enough money';
      } else {
        visualizationLog.value.push({
          type: 'success',
          text: 'Успех! Вся сумма успешно выдана.'
        });
        
        await delay(500);
        visualizationLog.value.push({
          type: 'info',
          text: `Итоговый результат: ${JSON.stringify(result.value)}`
        });
        
        visualizationDone.value = true;
        visualizationSuccess.value = true;
      }
    } catch (error) {
      visualizationLog.value.push({
        type: 'error',
        text: `Произошла ошибка: ${error.message}`
      });
      visualizationDone.value = true;
      visualizationSuccess.value = false;
      errorMessage.value = error.message;
    } finally {
      isVisualizing.value = false;
      currentNominal.value = null;
    }
  }
  
  // Функция для сброса визуализации
  function resetVisualization() {
    atmLimits.value = { ...initialLimits };
    visualSteps.value = {};
    remainingAmount.value = 0;
    currentNominal.value = null;
    visualizationLog.value = [];
    visualizationDone.value = false;
    result.value = {};
    errorMessage.value = '';
  }
  
  // Вспомогательная функция для задержки в анимации
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Функция для автоскролла логов
  watch(visualizationLog, async () => {
    await nextTick();
    if (logContainer.value) {
      logContainer.value.scrollTop = logContainer.value.scrollHeight;
    }
  });
  
  // Функции для тестирования
  function runTest(index) {
    const test = testCases.value[index];
    const testLimits = { ...test.limits };
    
    try {
      // Выполняем функцию
      const testResult = atmImplementation(test.amount, testLimits);
      
      // Проверяем результат
      if (test.isError) {
        // Должна была быть ошибка, но функция выполнилась успешно
        test.result = testResult;
        test.passed = false;
      } else {
        // Сравниваем результат с ожидаемым
        const resultMatches = JSON.stringify(testResult) === JSON.stringify(test.expected);
        test.result = testResult;
        test.passed = resultMatches;
      }
    } catch (error) {
      // Проверяем, ожидалась ли ошибка
      if (test.isError && error.message === test.expected) {
        test.result = error.message;
        test.passed = true;
      } else {
        test.result = error.message;
        test.passed = false;
      }
    }
  }
  
  // Автоскролл к верху при смене секции
  watch(currentSection, () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  </script>
  
  <style scoped>
  .atm-demo {
    font-family: Arial, sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
  }
  
  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  .intro {
    text-align: center;
    color: #7f8c8d;
    margin-bottom: 30px;
  }
  
  /* Навигация по секциям */
  .sections-nav {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }
  
  .sections-nav button {
    padding: 10px 15px;
    background-color: #f5f7fa;
    border: 1px solid #ddd;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.95rem;
    transition: all 0.3s;
  }
  
  .sections-nav button:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
  }
  
  .sections-nav button.active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
    box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
  }
  
  /* Общие стили секций */
  section {
    background-color: white;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
    margin-bottom: 30px;
    animation: fadeIn 0.5s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  h2 {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  
  h3 {
    color: #34495e;
    margin: 25px 0 15px;
  }
  
  /* Секция с описанием задачи */
  .task-description {
    line-height: 1.6;
  }
  
  .task-description p {
    margin-bottom: 12px;
  }
  
  .task-description ul {
    padding-left: 20px;
    margin-bottom: 20px;
  }
  
  .task-description li {
    margin-bottom: 8px;
  }
  
  .code-example {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    margin: 20px 0;
  }
  
  .code-example pre {
    background-color: #282c34;
    color: #abb2bf;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
    font-family: 'Courier New', Courier, monospace;
    margin: 0;
  }
  
  /* Секция с алгоритмом */
  .algorithm-description {
    line-height: 1.6;
  }
  
  .algorithm-steps {
    margin: 25px 0;
  }
  
  .step {
    display: flex;
    margin-bottom: 20px;
    align-items: flex-start;
  }
  
  .step-number {
    background-color: #3498db;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 15px;
    flex-shrink: 0;
  }
  
  .step-content {
    flex: 1;
  }
  
  .step-content h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  
  .step-content p {
    margin-top: 0;
  }
  
  .step-content ol {
    padding-left: 20px;
    margin-top: 10px;
  }
  
  .step-content li {
    margin-bottom: 8px;
  }
  
  .why-greedy {
    background-color: #f0f7fb;
    border-left: 5px solid #3498db;
    padding: 15px;
    border-radius: 5px;
    margin: 20px 0;
  }
  
  .why-greedy h3 {
    margin-top: 0;
    color: #3498db;
  }
  
  .why-greedy ul {
    padding-left: 20px;
    margin-bottom: 0;
  }
  
  /* Секция визуализации */
  .visualization-controls {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .input-group {
    flex: 1;
    min-width: 200px;
  }
  
  .input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .input-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  .run-btn, .reset-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
  }
  
  .run-btn {
    background-color: #3498db;
    color: white;
  }
  
  .run-btn:hover {
    background-color: #2980b9;
  }
  
  .reset-btn {
    background-color: #e74c3c;
    color: white;
  }
  
  .reset-btn:hover {
    background-color: #c0392b;
  }
  
  .run-btn:disabled, .reset-btn:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
  
  .atm-state {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .amount-display {
    text-align: center;
    margin-bottom: 25px;
    padding: 15px;
    background-color: #2c3e50;
    color: white;
    border-radius: 8px;
  }
  
  .display-label {
    font-size: 0.9rem;
    margin-bottom: 5px;
  }
  
  .amount-value {
    font-size: 2rem;
    font-weight: bold;
  }
  
  .remaining-label {
    margin-top: 10px;
    font-size: 0.9rem;
  }
  
  .remaining-label span {
    font-weight: bold;
    color: #e74c3c;
  }
  
  .banknotes-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .banknote-row {
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;
  }
  
  .banknote-row.active {
    background-color: #ebf7fd;
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.2);
    transform: translateX(10px);
  }
  
  .nominal-label {
    font-weight: bold;
    width: 100px;
    font-size: 1.2rem;
    color: #2c3e50;
  }
  
  .banknote-limits {
    width: 150px;
    margin-right: 20px;
  }
  
  .available {
    font-size: 0.9rem;
    color: #7f8c8d;
    margin-bottom: 5px;
  }
  
  .taken {
    font-size: 0.9rem;
    font-weight: bold;
    color: #3498db;
  }
  
  .banknotes-visual {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
  
  .banknote {
    width: 40px;
    height: 20px;
    background-color: #ecf0f1;
    border-radius: 3px;
    transition: all 0.3s;
    opacity: 0.5;
    background-size: cover;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .banknote.selected {
    opacity: 1;
    transform: translateY(-3px);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  }
  
  .visualization-result {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    animation: fadeIn 0.5s ease;
  }
  
  .success-result {
    color: #27ae60;
  }
  
  .error-result {
    color: #e74c3c;
  }
  
  .error-message {
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 10px;
    border: 1px solid #e74c3c;
    padding: 10px;
    border-radius: 5px;
    background-color: #fdedec;
  }
  
  .result-banknotes {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin: 15px 0;
  }
  
  .result-banknote {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .banknote-visual {
    width: 80px;
    height: 40px;
    background-color: #ecf0f1;
    border-radius: 5px;
    margin-bottom: 5px;
    background-size: cover;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .banknote-count {
    font-weight: bold;
  }
  
  .explanation-log {
    margin-top: 30px;
  }
  
  .log-container {
    max-height: 300px;
    overflow-y: auto;
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    border: 1px solid #ecf0f1;
  }
  
  .log-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ecf0f1;
  }
  
  .log-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
  
  .log-icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
    flex-shrink: 0;
    position: relative;
  }
  
  .log-icon.info::before {
    content: "i";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
    font-size: 0.8rem;
  }
  
  .log-icon.info {
    background-color: #3498db;
  }
  
  .log-icon.check::before {
    content: "?";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
    font-size: 0.8rem;
  }
  
  .log-icon.check {
    background-color: #f39c12;
  }
  
  .log-icon.process::before {
    content: "→";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
    font-size: 0.8rem;
  }
  
  .log-icon.process {
    background-color: #9b59b6;
  }
  
  .log-icon.calc::before {
    content: "=";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
    font-size: 0.8rem;
  }
  
  .log-icon.calc {
    background-color: #2ecc71;
  }
  
  .log-icon.success::before {
    content: "✓";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
    font-size: 0.8rem;
  }
  
  .log-icon.success {
    background-color: #27ae60;
  }
  
  .log-icon.error::before {
    content: "✕";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
    font-size: 0.8rem;
  }
  
  .log-icon.error {
    background-color: #e74c3c;
  }
  
  .log-text {
    flex: 1;
    line-height: 1.4;
  }
  
  /* Секция с кодом */
  .implementation {
    margin-bottom: 30px;
  }
  
  .implementation pre {
    background-color: #282c34;
    color: #abb2bf;
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;
    font-family: 'Courier New', Courier, monospace;
    line-height: 1.5;
  }
  
  .edge-cases {
    background-color: #fff8dc;
    border-left: 5px solid #f1c40f;
    padding: 15px;
    border-radius: 5px;
  }
  
  .edge-cases h3 {
    margin-top: 0;
    color: #d35400;
  }
  
  .edge-cases ul {
    padding-left: 20px;
  }
  
  .edge-cases li {
    margin-bottom: 10px;
  }
  
  /* Секция с реальными примерами */
  .real-examples {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .example-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.3s;
  }
  
  .example-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .example-title {
    background-color: #3498db;
    color: white;
    padding: 15px;
    font-weight: bold;
    font-size: 1.1rem;
  }
  
  .example-content {
    padding: 15px;
    line-height: 1.5;
  }
  
  .similar-algorithms {
    background-color: #f0f7fb;
    border-left: 5px solid #3498db;
    padding: 15px;
    border-radius: 5px;
  }
  
  .similar-algorithms h3 {
    margin-top: 0;
    color: #3498db;
  }
  
  .similar-algorithms ul {
    padding-left: 20px;
  }
  
  .similar-algorithms li {
    margin-bottom: 12px;
  }
  
  /* Секция с тестированием */
  .test-cases {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .test-case {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .test-input, .test-output {
    margin-bottom: 15px;
  }
  
  .test-input pre, .test-output pre {
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 5px;
    font-family: 'Courier New', Courier, monospace;
    margin-top: 5px;
  }
  
  .expected-error {
    background-color: #fde2e2;
    color: #e74c3c;
    padding: 8px 12px;
    border-radius: 5px;
    font-family: monospace;
    margin-top: 5px;
  }
  
  .test-button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
  }
  
  .test-button:hover {
    background-color: #2980b9;
  }
  
  .test-result {
    margin-top: 15px;
    padding: 10px;
    border-radius: 5px;
    animation: fadeIn 0.5s ease;
  }
  
  .test-result.success {
    background-color: #d5f5e3;
  }
  
  .test-result.error {
    background-color: #fde2e2;
  }
  
  .success-message {
    color: #27ae60;
    font-weight: bold;
  }
  
  .error-message {
    color: #e74c3c;
    font-weight: bold;
  }
  
  .actual-result {
    margin-top: 10px;
  }
  
  .actual-error {
    background-color: #fde2e2;
    color: #e74c3c;
    padding: 8px 12px;
    border-radius: 5px;
    font-family: monospace;
    margin-top: 5px;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .visualization-controls {
      flex-direction: column;
      align-items: stretch;
    }
    
    .banknote-row {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .nominal-label {
      margin-bottom: 10px;
    }
    
    .banknote-limits {
      width: 100%;
      margin-bottom: 10px;
      margin-right: 0;
    }
    
    .real-examples {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 480px) {
    .sections-nav {
      flex-direction: column;
    }
    
    .sections-nav button {
      width: 100%;
    }
  }
  </style>