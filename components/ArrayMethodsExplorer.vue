<template>
    <div class="array-methods-explorer">
      <h1>Исследование метода map и customMap</h1>
      
      <div class="explanation-section">
        <h2>Что такое метод map?</h2>
        <p>
          Метод <code>map()</code> в JavaScript создаёт новый массив с результатами вызова указанной функции для каждого элемента исходного массива. 
          Это один из самых полезных методов массивов, который позволяет трансформировать данные без изменения исходного массива.
        </p>
        
        <div class="code-block">
          <pre><code>const numbers = [1, 2, 3, 4];
  const doubled = numbers.map((num) => num * 2);
  console.log(doubled); // [2, 4, 6, 8]</code></pre>
        </div>
      </div>
      
      <div class="task-section">
        <h2>Задача: Реализация customMap</h2>
        <p>
          Реализуйте функцию <code>customMap(array, callback)</code>, 
          которая имитирует поведение метода массива <code>.map()</code>. 
          Функция должна принимать массив и колбэк функцию, которая применяется 
          к каждому элементу массива, результаты выполнения колбэк функции формируют новый массив.
        </p>
        
        <div class="code-block">
          <pre><code>function customMap(array, callback) {
    // Ваш код здесь
  }
  
  // Пример использования
  const numbers = [1, 2, 3, 4];
  const doubled = customMap(numbers, (num) => num * 2);
  console.log(doubled); // [2, 4, 6, 8]</code></pre>
        </div>
      </div>
      
      <div class="solution-section">
        <h2>Решение</h2>
        
        <p>
          Давайте разберёмся, как реализовать функцию <code>customMap</code>:
        </p>
        
        <div class="steps-container">
          <div class="step" :class="{ 'active': currentStep >= 1 }">
            <div class="step-number">1</div>
            <div class="step-content">
              <p>Создайте пустой массив для хранения результатов</p>
              <div class="code-snippet">const result = [];</div>
            </div>
          </div>
          
          <div class="step" :class="{ 'active': currentStep >= 2 }">
            <div class="step-number">2</div>
            <div class="step-content">
              <p>Переберите каждый элемент исходного массива</p>
              <div class="code-snippet">for (let i = 0; i &lt; array.length; i++) {
    // ...
  }</div>
            </div>
          </div>
          
          <div class="step" :class="{ 'active': currentStep >= 3 }">
            <div class="step-number">3</div>
            <div class="step-content">
              <p>Применить колбэк-функцию к текущему элементу и добавить результат в новый массив</p>
              <div class="code-snippet">const newValue = callback(array[i], i, array);
  result.push(newValue);</div>
            </div>
          </div>
          
          <div class="step" :class="{ 'active': currentStep >= 4 }">
            <div class="step-number">4</div>
            <div class="step-content">
              <p>Вернуть новый массив с результатами</p>
              <div class="code-snippet">return result;</div>
            </div>
          </div>
        </div>
        
        <div class="controls">
          <button @click="prevStep" :disabled="currentStep <= 1">Назад</button>
          <button @click="nextStep" :disabled="currentStep >= 4">Вперёд</button>
          <button @click="resetSteps">Сбросить</button>
        </div>
        
        <div class="full-solution" v-if="currentStep >= 4">
          <h3>Полная реализация customMap:</h3>
          <div class="code-block">
            <pre><code>function customMap(array, callback) {
    const result = [];
    
    for (let i = 0; i &lt; array.length; i++) {
      const newValue = callback(array[i], i, array);
      result.push(newValue);
    }
    
    return result;
  }</code></pre>
          </div>
        </div>
      </div>
      
      <div class="visualization-section" v-if="currentStep >= 4">
        <h2>Визуализация работы customMap</h2>
        
        <div class="visualization-container">
          <div class="input-container">
            <h3>Исходный массив:</h3>
            <div class="array-display">
              <div 
                v-for="(num, index) in inputArray" 
                :key="'input-' + index" 
                class="array-item"
                :class="{ 'active': animationSteps === index }"
              >
                {{ num }}
              </div>
            </div>
          </div>
          
          <div class="process-container">
            <h3>Процесс:</h3>
            <div class="process-step" v-if="animationSteps >= 0 && animationSteps < inputArray.length">
              <div class="code-explanation">
                callback({{ inputArray[animationSteps] }}, {{ animationSteps }}, array) = {{ inputArray[animationSteps] }} * 2 = {{ inputArray[animationSteps] * 2 }}
              </div>
              <div class="arrow">↓</div>
            </div>
          </div>
          
          <div class="output-container">
            <h3>Результат:</h3>
            <div class="array-display">
              <div 
                v-for="(num, index) in outputArray" 
                :key="'output-' + index" 
                class="array-item"
                :class="{ 'visible': index <= animationSteps }"
              >
                {{ num }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="controls">
          <button @click="prevAnimation" :disabled="animationSteps <= -1">Назад</button>
          <button @click="nextAnimation" :disabled="animationSteps >= inputArray.length">Вперёд</button>
          <button @click="resetAnimation">Сбросить</button>
          <button @click="playAnimation" :disabled="isAnimationPlaying">Запустить анимацию</button>
        </div>
      </div>
      
      <div class="pitfalls-section" v-if="currentStep >= 4">
        <h2>Подводные камни</h2>
        
        <div class="pitfall">
          <h3>1. Параметры callback функции</h3>
          <p>
            Нативный метод <code>map()</code> передаёт в callback три аргумента: текущий элемент, индекс и исходный массив.
            Нужно учесть этот момент в реализации:
          </p>
          <div class="code-block">
            <pre><code>// Правильная сигнатура callback функции
  callback(currentElement, index, originalArray)</code></pre>
          </div>
        </div>
        
        <div class="pitfall">
          <h3>2. Разреженные массивы (Sparse Arrays)</h3>
          <p>
            Нативный <code>map()</code> пропускает отсутствующие элементы в разреженных массивах,
            но сохраняет "дыры" в результирующем массиве. Мы должны учесть это:
          </p>
          <div class="code-block">
            <pre><code>const sparseArray = [1, , 3]; // Массив с пропущенным элементом
  // Нативный map сохраняет структуру
  sparseArray.map(x => x * 2); // [2, undefined, 6]
  
  // Улучшенная реализация customMap
  function betterCustomMap(array, callback) {
    const result = new Array(array.length);
    
    for (let i = 0; i &lt; array.length; i++) {
      // Проверяем, существует ли элемент по данному индексу
      if (i in array) {
        result[i] = callback(array[i], i, array);
      }
    }
    
    return result;
  }</code></pre>
          </div>
        </div>
        
        <div class="pitfall">
          <h3>3. Контекст this</h3>
          <p>
            Нативный <code>map()</code> принимает необязательный второй параметр для установки контекста <code>this</code> в callback-функции.
            Для полной имитации нужно это учесть:
          </p>
          <div class="code-block">
            <pre><code>function fullCustomMap(array, callback, thisArg) {
    const result = [];
    
    for (let i = 0; i &lt; array.length; i++) {
      if (i in array) {
        result[i] = callback.call(thisArg, array[i], i, array);
      }
    }
    
    return result;
  }</code></pre>
          </div>
        </div>
      </div>
      
      <div class="comparison-section" v-if="currentStep >= 4">
        <h2>Сравнение customMap и customFilter</h2>
        
        <div class="comparison-container">
          <div class="comparison-side">
            <h3>customMap</h3>
            <div class="code-block">
              <pre><code>function customMap(array, callback) {
    const result = [];
    
    for (let i = 0; i &lt; array.length; i++) {
      const newValue = callback(array[i], i, array);
      result.push(newValue);
    }
    
    return result;
  }</code></pre>
            </div>
            <ul class="features">
              <li>Трансформирует каждый элемент массива</li>
              <li>Возвращает массив той же длины</li>
              <li>Не изменяет исходный массив</li>
              <li>Создаёт новый массив из результатов callback</li>
            </ul>
          </div>
          
          <div class="comparison-side">
            <h3>customFilter</h3>
            <div class="code-block">
              <pre><code>function customFilter(array, callback) {
    const result = [];
  
    for (let i = 0; i &lt; array.length; i++) {
      const cur = array[i];
  
      if (callback(cur, i, array)) result.push(cur);
    }
  
    return result;
  }</code></pre>
            </div>
            <ul class="features">
              <li>Фильтрует элементы массива</li>
              <li>Возвращает массив той же или меньшей длины</li>
              <li>Не изменяет исходный массив</li>
              <li>Создаёт новый массив из элементов, прошедших проверку</li>
            </ul>
          </div>
        </div>
        
        <div class="main-difference">
          <p>
            <strong>Ключевое различие:</strong> <code>map()</code> преобразует каждый элемент и сохраняет результаты, 
            а <code>filter()</code> отбирает элементы, но не изменяет их.
          </p>
        </div>
      </div>
      
      <div class="real-world-section" v-if="currentStep >= 4">
        <h2>Применение в реальной жизни</h2>
        
        <div class="use-cases">
          <div class="use-case">
            <h3>Форматирование данных</h3>
            <div class="code-block">
              <pre><code>// Преобразование данных с API
  const users = [
    { id: 1, name: 'Иван', age: 25 },
    { id: 2, name: 'Мария', age: 30 },
    { id: 3, name: 'Алексей', age: 22 }
  ];
  
  // Извлечение только имён для отображения в UI
  const userNames = users.map(user => user.name);
  // ["Иван", "Мария", "Алексей"]</code></pre>
            </div>
          </div>
          
          <div class="use-case">
            <h3>Расчёты и преобразования</h3>
            <div class="code-block">
              <pre><code>// Расчёт цен с налогом
  const prices = [100, 200, 300, 400];
  const taxRate = 0.2;
  
  const pricesWithTax = prices.map(price => {
    const tax = price * taxRate;
    return {
      original: price,
      tax: tax,
      total: price + tax
    };
  });
  
  /*
  [
    { original: 100, tax: 20, total: 120 },
    { original: 200, tax: 40, total: 240 },
    { original: 300, tax: 60, total: 360 },
    { original: 400, tax: 80, total: 480 }
  ]
  */</code></pre>
            </div>
          </div>
          
          <div class="use-case">
            <h3>Обработка DOM-элементов</h3>
            <div class="code-block">
              <pre><code>// Получение текста из списка элементов
  const listItems = document.querySelectorAll('li');
  const itemTexts = Array.from(listItems).map(item => item.textContent);
  
  // Добавление классов к элементам
  const buttons = document.querySelectorAll('button');
  Array.from(buttons).map((button, index) => {
    button.classList.add(`button-${index}`);
    return button;
  });</code></pre>
            </div>
          </div>
          
          <div class="use-case">
            <h3>Работа с асинхронными операциями</h3>
            <div class="code-block">
              <pre><code>// Получение данных для нескольких пользователей
  const userIds = [1, 2, 3, 4, 5];
  
  // Преобразование массива id в массив промисов
  const userPromises = userIds.map(id => fetch(`/api/users/${id}`));
  
  // Ожидание всех запросов
  Promise.all(userPromises)
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(users => console.log(users));</code></pre>
            </div>
          </div>
        </div>
      </div>
      
      <div class="interactive-section" v-if="currentStep >= 4">
        <h2>Попробуйте сами</h2>
        
        <div class="interactive-container">
          <div class="input-area">
            <h3>Исходный массив:</h3>
            <input 
              v-model="userInputArray" 
              placeholder="Введите числа через запятую (например: 1,2,3,4)"
              @input="updateUserOutput"
            />
            
            <h3>Callback функция:</h3>
            <select v-model="selectedCallback" @change="updateUserOutput">
              <option value="double">Умножить на 2</option>
              <option value="square">Возвести в квадрат</option>
              <option value="negate">Отрицательное число</option>
              <option value="round">Округлить</option>
            </select>
          </div>
          
          <div class="output-area">
            <h3>Результат:</h3>
            <div class="result-display">
              <div v-if="userOutputArray.length > 0">
                [{{ userOutputArray.join(', ') }}]
              </div>
              <div v-else>
                Введите данные для отображения результата
              </div>
            </div>
            
            <div class="code-execution">
              <pre><code>const input = [{{ parsedUserInput.join(', ') }}];
  {{ callbackCodeExamples[selectedCallback] }}
  const result = customMap(input, callback);
  // [{{ userOutputArray.join(', ') }}]</code></pre>
            </div>
          </div>
        </div>
      </div>
      
      <div class="conclusion-section" v-if="currentStep >= 4">
        <h2>Заключение</h2>
        
        <div class="summary">
          <p>
            Функция <code>customMap</code> - это реализация одного из самых универсальных и полезных методов массивов в JavaScript.
            Понимание того, как работает <code>map()</code> изнутри, помогает лучше осознать принципы функционального программирования
            и обработки данных.
          </p>
          
          <p>
            Ключевые выводы:
          </p>
          
          <ul>
            <li>Метод <code>map()</code> создаёт новый массив, не изменяя исходный</li>
            <li>Он применяет функцию-преобразователь к каждому элементу массива</li>
            <li>Функцию <code>map()</code> легко реализовать самостоятельно</li>
            <li>Понимание внутренней работы стандартных методов массивов улучшает ваши навыки JavaScript</li>
            <li>Эти принципы применимы к различным задачам обработки данных в реальных проектах</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onUnmounted } from 'vue';
  
  // Состояние для пошагового объяснения
  const currentStep = ref(1);
  
  // Состояние для анимации
  const inputArray = ref([1, 2, 3, 4]);
  const outputArray = ref([2, 4, 6, 8]);
  const animationSteps = ref(-1);
  const isAnimationPlaying = ref(false);
  let animationTimer = null;
  
  // Состояние для интерактивного примера
  const userInputArray = ref('1,2,3,4');
  const selectedCallback = ref('double');
  const userOutputArray = ref([]);
  
  // Примеры callback функций
  const callbackCodeExamples = {
    double: 'const callback = (num) => num * 2;',
    square: 'const callback = (num) => num * num;',
    negate: 'const callback = (num) => -num;',
    round: 'const callback = (num) => Math.round(num);'
  };
  
  // Парсинг ввода пользователя
  const parsedUserInput = computed(() => {
    return userInputArray.value
      .split(',')
      .map(item => item.trim())
      .filter(item => item !== '')
      .map(item => isNaN(parseFloat(item)) ? item : parseFloat(item));
  });
  
  // Обработчики для пошагового объяснения
  function nextStep() {
    if (currentStep.value < 4) {
      currentStep.value += 1;
    }
  }
  
  function prevStep() {
    if (currentStep.value > 1) {
      currentStep.value -= 1;
    }
  }
  
  function resetSteps() {
    currentStep.value = 1;
  }
  
  // Обработчики для анимации
  function nextAnimation() {
    if (animationSteps.value < inputArray.value.length) {
      animationSteps.value += 1;
    }
  }
  
  function prevAnimation() {
    if (animationSteps.value > -1) {
      animationSteps.value -= 1;
    }
  }
  
  function resetAnimation() {
    animationSteps.value = -1;
    stopAnimation();
  }
  
  function playAnimation() {
    if (isAnimationPlaying.value) return;
    
    isAnimationPlaying.value = true;
    animationSteps.value = -1;
    
    // Запускаем анимацию
    animationTimer = setInterval(() => {
      if (animationSteps.value < inputArray.value.length) {
        animationSteps.value += 1;
      } else {
        stopAnimation();
      }
    }, 1000);
  }
  
  function stopAnimation() {
    if (animationTimer) {
      clearInterval(animationTimer);
      animationTimer = null;
    }
    isAnimationPlaying.value = false;
  }
  
  // Обработчик для интерактивного примера
  function updateUserOutput() {
    const callbacks = {
      double: num => num * 2,
      square: num => num * num,
      negate: num => -num,
      round: num => Math.round(num)
    };
    
    const callback = callbacks[selectedCallback.value];
    
    // Реализация customMap
    function customMap(array, cb) {
      const result = [];
      for (let i = 0; i < array.length; i++) {
        result.push(cb(array[i], i, array));
      }
      return result;
    }
    
    userOutputArray.value = customMap(parsedUserInput.value, callback);
  }
  
  // Вызываем обработчик при инициализации
  updateUserOutput();
  
  // Очистка таймеров при уничтожении компонента
  onUnmounted(() => {
    stopAnimation();
  });
  </script>
  
  <style scoped>
  .array-methods-explorer {
    font-family: Arial, sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    color: black;
  }
  
  h1, h2, h3 {
    color: #333;
  }
  
  h1 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    border-bottom: 2px solid #eee;
    padding-bottom: 1rem;
  }
  
  h2 {
    font-size: 1.6rem;
    margin-top: 2rem;
    border-left: 4px solid #42b883;
    padding-left: 1rem;
  }
  
  h3 {
    font-size: 1.3rem;
    margin-top: 1.5rem;
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .explanation-section, .task-section, .solution-section, 
  .visualization-section, .pitfalls-section, .comparison-section,
  .real-world-section, .interactive-section, .conclusion-section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .code-block {
    background-color: #2d2d2d;
    color: #fff;
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;
    margin: 1rem 0;
  }
  
  .code-block code {
    font-family: 'Fira Code', Consolas, monospace;
    font-size: 14px;
    line-height: 1.5;
  }
  
  /* Стили для пошагового объяснения */
  .steps-container {
    margin: 2rem 0;
  }
  
  .step {
    display: flex;
    margin-bottom: 1.5rem;
    opacity: 0.5;
    transform: translateX(-10px);
    transition: all 0.3s ease;
  }
  
  .step.active {
    opacity: 1;
    transform: translateX(0);
  }
  
  .step-number {
    background-color: #42b883;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 1rem;
    flex-shrink: 0;
  }
  
  .step-content {
    flex-grow: 1;
  }
  
  .code-snippet {
    background-color: #f1f1f1;
    padding: 0.75rem;
    border-radius: 4px;
    font-family: 'Fira Code', Consolas, monospace;
    margin-top: 0.5rem;
    border-left: 3px solid #42b883;
  }
  
  .controls {
    display: flex;
    gap: 10px;
    margin: 1.5rem 0;
  }
  
  .controls button {
    padding: 8px 15px;
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .controls button:hover:not(:disabled) {
    background-color: #3aa876;
  }
  
  .controls button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  /* Стили для визуализации */
  .visualization-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 1.5rem 0;
    padding: 1.5rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .array-display {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin: 1rem 0;
  }
  
  .array-item {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e8f4ea;
    border: 1px solid #c2e0c6;
    border-radius: 4px;
    font-weight: bold;
    color: #333;
    transition: all 0.3s ease;
  }
  
  .array-item.active {
    background-color: #42b883;
    color: white;
    transform: scale(1.1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .array-item.visible {
    opacity: 1;
  }
  
  .array-item:not(.visible) {
    opacity: 0.3;
  }
  
  .process-container {
    text-align: center;
  }
  
  .process-step {
    animation: fadeIn 0.5s ease;
  }
  
  .code-explanation {
    background-color: #f0f8ff;
    padding: 0.75rem;
    border-radius: 4px;
    font-family: 'Fira Code', Consolas, monospace;
    display: inline-block;
    margin-bottom: 0.5rem;
    border: 1px solid #b3d7ff;
  }
  
  .arrow {
    font-size: 1.5rem;
    color: #42b883;
    margin: 0.5rem 0;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Стили для сравнения */
  .comparison-container {
    display: flex;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }
  
  .comparison-side {
    flex: 1;
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .features {
    list-style-type: none;
    padding-left: 0;
  }
  
  .features li {
    margin-bottom: 0.75rem;
    padding-left: 1.5rem;
    position: relative;
  }
  
  .features li:before {
    content: "✓";
    color: #42b883;
    position: absolute;
    left: 0;
    font-weight: bold;
  }
  
  .main-difference {
    background-color: #fff8e1;
    padding: 1rem;
    border-radius: 6px;
    border-left: 4px solid #ffc107;
    margin-top: 1.5rem;
  }
  
  /* Стили для интерактивного раздела */
  .interactive-container {
    display: flex;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }
  
  .input-area, .output-area {
    flex: 1;
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .input-area h3, .output-area h3 {
    margin-top: 0;
  }
  
  input, select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 1rem;
    font-size: 14px;
  }
  
  .result-display {
    background-color: #f0f8ff;
    padding: 1rem;
    border-radius: 4px;
    min-height: 40px;
    font-family: 'Fira Code', Consolas, monospace;
    margin-bottom: 1rem;
    border: 1px solid #b3d7ff;
  }
  
  .code-execution {
    background-color: #2d2d2d;
    color: #fff;
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;
  }
  
  /* Стили для подводных камней */
  .pitfall {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-left: 4px solid #ff7043;
  }
  
  .pitfall h3 {
    color: #e64a19;
    margin-top: 0;
  }
  
  /* Стили для примеров из жизни */
  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;
  }
  
  .use-case {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-top: 4px solid #3f51b5;
  }
  
  .use-case h3 {
    color: #3f51b5;
    margin-top: 0;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .comparison-container, .interactive-container {
      flex-direction: column;
    }
    
    .use-cases {
      grid-template-columns: 1fr;
    }
  }
  </style>