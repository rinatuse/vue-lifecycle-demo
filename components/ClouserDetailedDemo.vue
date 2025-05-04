<template>
    <div class="closure-explanation">
      <h1>Замыкания (Closures) в JavaScript</h1>
      <p class="intro">
        Замыкание — это мощная концепция, которая позволяет функции запоминать и иметь доступ к переменным из своего лексического окружения,
        даже когда функция выполняется вне этого окружения.
      </p>
  
      <div class="example-container">
        <h2>Пример кода с замыканием</h2>
        <div class="code-block">
          <pre><code>let number = 0;
  
  const increment = () => {
    number += 1;
    const message = `Incremented to ${number}`;
  
    return () => {
      console.log(message);
      console.log(`Number: ${number}`);
    };
  };
  
  const log = increment();
  increment();
  increment();
  log();</code></pre>
        </div>
  
        <div class="result-block">
          <h3>Результат выполнения:</h3>
          <div class="console-output">
            <div class="console-line">Incremented to 1</div>
            <div class="console-line">Number: 3</div>
          </div>
        </div>
      </div>
  
      <div class="controls-section">
        <h2>Пошаговая визуализация</h2>
        <p>Нажимайте кнопки для перехода между шагами выполнения кода:</p>
        <div class="controls">
          <button 
            @click="resetAnimation" 
            :disabled="currentStep === 0"
            class="control-button reset-button"
          >
            Сбросить
          </button>
          <button 
            @click="prevStep" 
            :disabled="currentStep === 0"
            class="control-button prev-button"
          >
            Назад
          </button>
          <button 
            @click="nextStep" 
            :disabled="currentStep === totalSteps"
            class="control-button next-button"
          >
            Вперёд
          </button>
          <button 
            @click="autoPlay" 
            :disabled="isPlaying || currentStep === totalSteps"
            class="control-button play-button"
          >
            {{ isPlaying ? 'Пауза' : 'Воспроизвести' }}
          </button>
        </div>
        <div class="step-indicator">
          Шаг {{ currentStep }} из {{ totalSteps }}
        </div>
      </div>
  
      <div class="animation-container">
        <div class="memory-model">
          <div class="global-scope">
            <h3>Глобальная область видимости</h3>
            <div class="variable-container">
              <div class="variable">
                <div class="var-name">number</div>
                <div class="var-value">{{ variables.number }}</div>
              </div>
              <div class="variable">
                <div class="var-name">increment</div>
                <div class="var-value">Function</div>
              </div>
              <div class="variable" v-if="variables.logExists">
                <div class="var-name">log</div>
                <div class="var-value">Function</div>
              </div>
            </div>
          </div>
  
          <div class="closures-container">
            <div class="closure" v-if="closures.length > 0" v-for="(closure, index) in closures" :key="index">
              <h3>Замыкание #{{ index + 1 }} ({{ closure.label }})</h3>
              <div class="variable-container">
                <div class="variable">
                  <div class="var-name">message</div>
                  <div class="var-value">"{{ closure.message }}"</div>
                </div>
                <div class="variable">
                  <div class="var-name">Ссылка на number</div>
                  <div class="var-value">→ {{ variables.number }}</div>
                </div>
              </div>
            </div>
          </div>
  
          <div class="execution-container" v-if="execution.current">
            <h3>Текущее выполнение</h3>
            <div class="code-execution">
              <div class="execution-line">{{ execution.current }}</div>
            </div>
          </div>
        </div>
  
        <div class="explanation-box">
          <h3>Объяснение:</h3>
          <div class="explanation-content">
            {{ explanations[currentStep] }}
          </div>
        </div>
      </div>
  
      <div class="concept-explanation">
        <h2>Объяснение концепции замыканий</h2>
        
        <div class="explanation-section">
          <h3>Что такое замыкание?</h3>
          <p>
            <strong>Замыкание (closure)</strong> - это функция, которая запоминает свое лексическое окружение (переменные из внешней области видимости)
            даже после того, как внешняя функция завершила выполнение.
          </p>
          <p>
            В JavaScript, функции имеют доступ к переменным:
          </p>
          <ul>
            <li>Объявленным внутри функции</li>
            <li>Объявленным в родительской функции</li>
            <li>Объявленным в глобальной области видимости</li>
          </ul>
        </div>
        
        <div class="explanation-section">
          <h3>Основные свойства замыканий:</h3>
          <ol>
            <li>
              <strong>Захват лексического окружения</strong> - функция запоминает переменные из внешней области видимости, где она была объявлена
            </li>
            <li>
              <strong>Сохранение доступа</strong> - функция сохраняет доступ к этим переменным даже после завершения внешней функции
            </li>
            <li>
              <strong>Изоляция данных</strong> - замыкания могут сохранять приватное состояние, недоступное извне
            </li>
            <li>
              <strong>Разделение ссылок vs значений</strong> - переменные-примитивы захватываются по значению на момент создания замыкания, а объекты - по ссылке
            </li>
          </ol>
        </div>
  
        <div class="explanation-section">
          <h3>В нашем примере:</h3>
          <ol>
            <li>
              Функция <code>increment</code> создает и возвращает новую функцию
            </li>
            <li>
              Возвращаемая функция образует замыкание, где:
              <ul>
                <li><code>message</code> запоминается как значение на момент создания замыкания</li>
                <li><code>number</code> является ссылкой на переменную, которая продолжает изменяться в глобальной области</li>
              </ul>
            </li>
            <li>
              Даже после выполнения <code>increment()</code>, возвращаемая функция сохраняет доступ к <code>message</code> и <code>number</code>
            </li>
            <li>
              Когда мы вызываем <code>log()</code>, мы видим:
              <ul>
                <li>Значение <code>message</code>, захваченное в момент создания ("Incremented to 1")</li>
                <li>Текущее значение <code>number</code> (которое стало 3 после всех вызовов <code>increment()</code>)</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
  
      <div class="real-world-applications">
        <h2>Практическое применение замыканий</h2>
        
        <div class="application-section">
          <h3>1. Инкапсуляция и приватные данные</h3>
          <div class="code-block">
            <pre><code>function createCounter() {
    let count = 0;  // Приватная переменная
    
    return {
      increment: () => { count += 1; return count; },
      decrement: () => { count -= 1; return count; },
      getCount: () => count
    };
  }
  
  const counter = createCounter();
  console.log(counter.getCount());  // 0
  counter.increment();
  console.log(counter.getCount());  // 1</code></pre>
          </div>
          <p>
            Здесь переменная <code>count</code> недоступна напрямую, а только через методы возвращаемого объекта.
          </p>
        </div>
        
        <div class="application-section">
          <h3>2. Обработчики событий</h3>
          <div class="code-block">
            <pre><code>function setupButton(buttonId, message) {
    const button = document.getElementById(buttonId);
    
    button.addEventListener('click', function() {
      // Замыкание захватывает переменную message
      alert(message);
    });
  }
  
  setupButton('btn1', 'Кнопка 1 нажата!');
  setupButton('btn2', 'Кнопка 2 нажата!');</code></pre>
          </div>
          <p>
            Каждый обработчик события запоминает свое собственное сообщение, даже после выполнения функции <code>setupButton</code>.
          </p>
        </div>
        
        <div class="application-section">
          <h3>3. Фабричные функции и каррирование</h3>
          <div class="code-block">
            <pre><code>function multiplier(factor) {
    // Возвращаем функцию, которая запоминает factor
    return function(number) {
      return number * factor;
    };
  }
  
  const double = multiplier(2);
  const triple = multiplier(3);
  
  console.log(double(5));  // 10
  console.log(triple(5));  // 15</code></pre>
          </div>
          <p>
            Замыкания позволяют создавать специализированные функции на основе общей логики.
          </p>
        </div>
        
        <div class="application-section">
          <h3>4. Асинхронное программирование</h3>
          <div class="code-block">
            <pre><code>function fetchUserData(userId) {
    const url = `https://api.example.com/users/${userId}`;
    
    // Запоминаем userId в замыкании
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(`Данные пользователя ${userId}:`, data);
      });
  }
  
  fetchUserData(123);</code></pre>
          </div>
          <p>
            В асинхронном коде замыкания помогают сохранить контекст между разными частями кода.
          </p>
        </div>
      </div>
  
      <div class="pitfalls-section">
        <h2>Подводные камни и особенности</h2>
        
        <div class="pitfall">
          <h3>1. Циклы и замыкания</h3>
          <div class="code-block">
            <pre><code>// Проблема
  for (var i = 0; i &lt; 3; i++) {
    setTimeout(function() {
      console.log(i);  // Выведет: 3, 3, 3
    }, 100);
  }
  
  // Решение с let
  for (let j = 0; j &lt; 3; j++) {
    setTimeout(function() {
      console.log(j);  // Выведет: 0, 1, 2
    }, 100);
  }
  
  // Альтернативное решение с дополнительной функцией
  for (var k = 0; k &lt; 3; k++) {
    (function(index) {
      setTimeout(function() {
        console.log(index);  // Выведет: 0, 1, 2
      }, 100);
    })(k);
  }</code></pre>
          </div>
          <p>
            Классическая проблема: при использовании <code>var</code> в цикле, все замыкания получают ссылку на одну и ту же переменную.
          </p>
        </div>
        
        <div class="pitfall">
          <h3>2. Утечки памяти</h3>
          <p>
            Замыкания могут приводить к утечкам памяти, если не освобождать ссылки на объекты, когда они больше не нужны.
          </p>
          <div class="code-block">
            <pre><code>function createLargeArray() {
    // Большой массив данных (потенциально много памяти)
    const largeData = new Array(1000000).fill('x');
    
    return function() {
      // Используем всего один элемент массива,
      // но замыкание держит ссылку на весь массив
      return largeData[0];
    };
  }
  
  // Решение: обнулить ненужные ссылки
  let getData = createLargeArray();
  console.log(getData());
  getData = null; // Освобождаем замыкание и большой массив</code></pre>
          </div>
        </div>
        
        <div class="pitfall">
          <h3>3. Неожиданное поведение this</h3>
          <div class="code-block">
            <pre><code>const user = {
    name: 'Александр',
    sayHi: function() {
      setTimeout(function() {
        console.log(`Привет, ${this.name}`); // "Привет, undefined"
      }, 100);
    }
  };
  
  // Решение 1: сохранить this
  const user1 = {
    name: 'Борис',
    sayHi: function() {
      const self = this;
      setTimeout(function() {
        console.log(`Привет, ${self.name}`); // "Привет, Борис"
      }, 100);
    }
  };
  
  // Решение 2: использовать стрелочную функцию
  const user2 = {
    name: 'Василий',
    sayHi: function() {
      setTimeout(() => {
        console.log(`Привет, ${this.name}`); // "Привет, Василий"
      }, 100);
    }
  };</code></pre>
          </div>
          <p>
            Замыкания и <code>this</code> могут взаимодействовать неожиданным образом, особенно в асинхронном коде.
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  
  // Всего шагов анимации
  const totalSteps = 7;
  const currentStep = ref(0);
  const isPlaying = ref(false);
  let playInterval = null;
  
  // Состояние переменных
  const variables = reactive({
    number: 0,
    logExists: false
  });
  
  // Замыкания
  const closures = reactive([]);
  
  // Текущее выполнение
  const execution = reactive({
    current: null
  });
  
  // Объяснения для каждого шага
  const explanations = [
    "Начальное состояние: объявлена переменная number = 0 и функция increment.",
    "Вызов const log = increment(): number увеличивается до 1, создается переменная message = 'Incremented to 1', и возвращается функция, которая сохраняется в переменной log.",
    "Вызов increment(): number увеличивается до 2, создается переменная message = 'Incremented to 2', но возвращаемая функция не сохраняется.",
    "Вызов increment(): number увеличивается до 3, создается переменная message = 'Incremented to 3', но возвращаемая функция не сохраняется.",
    "Подготовка к вызову log(): функция log содержит замыкание, которое сохранило message = 'Incremented to 1', но имеет доступ к текущему значению number (3).",
    "Выполнение log(): выводится сообщение 'Incremented to 1' из замыкания.",
    "Выполнение log(): выводится 'Number: 3' (текущее значение number)."
  ];
  
  // Функции управления анимацией
  function resetAnimation() {
    stopAutoPlay();
    currentStep.value = 0;
    updateState();
  }
  
  function prevStep() {
    stopAutoPlay();
    if (currentStep.value > 0) {
      currentStep.value--;
      updateState();
    }
  }
  
  function nextStep() {
    if (currentStep.value < totalSteps) {
      currentStep.value++;
      updateState();
    } else {
      stopAutoPlay();
    }
  }
  
  function autoPlay() {
    if (isPlaying.value) {
      stopAutoPlay();
    } else {
      isPlaying.value = true;
      playInterval = setInterval(() => {
        if (currentStep.value < totalSteps) {
          currentStep.value++;
          updateState();
        } else {
          stopAutoPlay();
        }
      }, 2000); // 2 секунды между шагами
    }
  }
  
  function stopAutoPlay() {
    isPlaying.value = false;
    if (playInterval) {
      clearInterval(playInterval);
      playInterval = null;
    }
  }
  
  // Обновление состояния визуализации на основе текущего шага
  function updateState() {
    // Сбрасываем значения
    variables.number = 0;
    variables.logExists = false;
    closures.splice(0, closures.length);
    execution.current = null;
    
    switch (currentStep.value) {
      case 0:
        // Начальное состояние
        execution.current = "let number = 0;";
        break;
        
      case 1:
        // Вызов const log = increment()
        variables.number = 1;
        variables.logExists = true;
        closures.push({
          label: "log",
          message: "Incremented to 1"
        });
        execution.current = "const log = increment();";
        break;
        
      case 2:
        // Вызов increment()
        variables.number = 2;
        variables.logExists = true;
        closures.push({
          label: "log",
          message: "Incremented to 1"
        });
        execution.current = "increment();";
        break;
        
      case 3:
        // Вызов increment()
        variables.number = 3;
        variables.logExists = true;
        closures.push({
          label: "log",
          message: "Incremented to 1"
        });
        execution.current = "increment();";
        break;
        
      case 4:
        // Подготовка к вызову log()
        variables.number = 3;
        variables.logExists = true;
        closures.push({
          label: "log",
          message: "Incremented to 1"
        });
        execution.current = "log();";
        break;
        
      case 5:
        // Выполнение log() - вывод message
        variables.number = 3;
        variables.logExists = true;
        closures.push({
          label: "log",
          message: "Incremented to 1"
        });
        execution.current = "console.log(message);";
        break;
        
      case 6:
        // Выполнение log() - вывод number
        variables.number = 3;
        variables.logExists = true;
        closures.push({
          label: "log",
          message: "Incremented to 1"
        });
        execution.current = "console.log(`Number: ${number}`);";
        break;
        
      case 7:
        // Финальное состояние
        variables.number = 3;
        variables.logExists = true;
        closures.push({
          label: "log (выполнен)",
          message: "Incremented to 1"
        });
        execution.current = "// Выполнение завершено";
        break;
    }
  }
  
  // Инициализация начального состояния
  updateState();
  </script>
  
  <style scoped>
  .closure-explanation {
    font-family: Arial, sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    color: #000000;
    line-height: 1.6;
  }
  
  h1 {
    text-align: center;
    color: #000000;
    font-size: 2.2rem;
    margin-bottom: 20px;
  }
  
  h2 {
    color: #000000;
    font-size: 1.8rem;
    margin: 30px 0 15px;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 10px;
  }
  
  h3 {
    color: #000000;
    font-size: 1.4rem;
    margin: 20px 0 10px;
  }
  
  p {
    margin-bottom: 15px;
    color: #000000;
  }
  
  .intro {
    font-size: 1.1rem;
    margin-bottom: 30px;
    text-align: center;
  }
  
  /* Стили для блока с кодом */
  .example-container {
    margin: 20px 0;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .code-block {
    background-color: #f8f8f8;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding: 15px;
    margin: 15px 0;
    overflow-x: auto;
  }
  
  .code-block pre {
    margin: 0;
    white-space: pre-wrap;
  }
  
  .code-block code {
    font-family: 'Courier New', monospace;
    font-size: 14px;
    color: #000000;
  }
  
  /* Стили для результата выполнения */
  .result-block {
    margin-top: 20px;
  }
  
  .console-output {
    background-color: #2c2c2c;
    color: white;
    padding: 15px;
    border-radius: 5px;
    font-family: 'Courier New', monospace;
  }
  
  .console-line {
    margin: 5px 0;
    color: #ffffff;
  }
  
  /* Стили для элементов управления */
  .controls-section {
    text-align: center;
    margin: 30px 0;
  }
  
  .controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .control-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
  }
  
  .reset-button {
    background-color: #f44336;
    color: white;
  }
  
  .prev-button, .next-button {
    background-color: #2196f3;
    color: white;
  }
  
  .play-button {
    background-color: #4caf50;
    color: white;
  }
  
  .control-button:hover {
    opacity: 0.9;
  }
  
  .control-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .step-indicator {
    font-size: 1.1rem;
    margin-top: 10px;
  }
  
  /* Стили для анимации */
  .animation-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 30px 0;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .memory-model {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .global-scope, .closures-container, .execution-container {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .variable-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
  }
  
  .variable {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background-color: #f5f5f5;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .var-name {
    font-weight: bold;
    color: #000000;
  }
  
  .var-value {
    color: #e91e63;
    font-family: 'Courier New', monospace;
  }
  
  .closure {
    background-color: #e3f2fd;
    border: 1px solid #bbdefb;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    transition: all 0.3s ease;
  }
  
  .execution-line {
    font-family: 'Courier New', monospace;
    background-color: #fffde7;
    padding: 10px;
    border-left: 3px solid #ffc107;
    margin: 10px 0;
    font-weight: bold;
    color: #000000;
  }
  
  .explanation-box {
    background-color: #e8f5e9;
    border: 1px solid #c8e6c9;
    border-radius: 8px;
    padding: 15px;
    margin-top: 20px;
  }
  
  .explanation-content {
    color: #000000;
    font-size: 1.05rem;
  }
  
  /* Стили для секций с объяснениями */
  .concept-explanation, .real-world-applications, .pitfalls-section {
    margin: 40px 0;
  }
  
  .explanation-section, .application-section, .pitfall {
    margin-bottom: 30px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  ul, ol {
    padding-left: 25px;
    margin: 15px 0;
  }
  
  li {
    margin-bottom: 8px;
    color: #000000;
  }
  
  code {
    background-color: #f5f5f5;
    padding: 2px 5px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    color: #000000;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .memory-model {
      grid-template-columns: 1fr;
    }
    
    .controls {
      flex-wrap: wrap;
    }
  }
  </style>