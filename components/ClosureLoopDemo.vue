<template>
    <div class="closure-demo">
      <h1>Замыкания, циклы и setTimeout: разбор полётов</h1>
      
      <div class="problem-statement">
        <h2>Изучаем проблему</h2>
        <div class="code-container">
          <pre class="code-block">
  for (var i = 0; i &lt; 10; i++) {
    setTimeout(function () {
      console.log(i);
    });
  }</pre>
          <div class="question-block">
            <h3>Что выведется в консоль? 🤔</h3>
            <button class="reveal-button" @click="revealOutput" v-if="!outputRevealed">Показать результат</button>
          </div>
        </div>
        
        <div v-if="outputRevealed" class="output-container">
          <h3>Вывод в консоль:</h3>
          <div class="console-output">
            <div v-for="(item, index) in outputItems" :key="index" class="output-item" :class="{ 'fade-in': true }">
              {{ item }}
            </div>
          </div>
          <p class="output-explanation">
            <strong>Неожиданно?</strong> Вместо чисел от 0 до 9, мы получили десять раз число 10!
          </p>
        </div>
      </div>
  
      <div v-if="outputRevealed" class="explanation-section">
        <h2>Почему так происходит?</h2>
        
        <div class="explanation-container">
          <p>Чтобы понять проблему, нужно разобраться в трёх ключевых концепциях:</p>
          <ol>
            <li><strong>Область видимости переменной var</strong> — существует только на уровне функции, а не блока.</li>
            <li><strong>Замыкания</strong> — функции запоминают окружение, в котором они были созданы.</li>
            <li><strong>Асинхронность</strong> — setTimeout откладывает выполнение кода.</li>
          </ol>
          
          <div class="animation-container">
            <h3>Визуализация проблемы</h3>
            <div class="memory-model">
              <div class="execution-context">
                <div class="context-title">Глобальный контекст</div>
                <div class="variable-container">
                  <div class="variable">
                    i = <span class="variable-value">{{ currentAnimationStep > 0 ? animatedI : '0' }}</span>
                  </div>
                </div>
              </div>
              
              <div class="call-stack">
                <div class="stack-title">Event Loop и колбэки</div>
                <div class="stack-container">
                  <div v-for="n in 10" :key="n" class="callback-item" :class="{ 'highlight': currentAnimationStep === n + 1 }">
                    setTimeout(callback {{ n }}) → console.log(i)
                  </div>
                </div>
              </div>
            </div>
            
            <div class="animation-controls">
              <button @click="startAnimation" :disabled="animationRunning" class="control-button">
                {{ animationComplete ? 'Запустить заново' : 'Запустить анимацию' }}
              </button>
              <div v-if="animationRunning" class="animation-step">
                <span v-if="currentAnimationStep === 0">Запускаем цикл...</span>
                <span v-else-if="currentAnimationStep <= 10">Шаг {{ currentAnimationStep }}: цикл выполняется, i = {{ animatedI }}</span>
                <span v-else-if="currentAnimationStep === 11">Цикл завершён, i = {{ animatedI }}</span>
                <span v-else>Выполняются колбэки setTimeout...</span>
              </div>
            </div>
          </div>
          
          <div class="detailed-explanation">
            <h3>Подробное объяснение</h3>
            <p>Вот что происходит в нашем коде шаг за шагом:</p>
            <ol>
              <li>Цикл for начинает выполняться, инициализируя <code>var i = 0</code>.</li>
              <li>На каждой итерации цикла мы регистрируем новую функцию обратного вызова в setTimeout.</li>
              <li>Эта функция обратного вызова создает <strong>замыкание</strong>, которое "запоминает" переменную <code>i</code> из внешней области видимости.</li>
              <li>Важно: функция не запоминает <em>значение</em> переменной, а создаёт <em>ссылку</em> на саму переменную.</li>
              <li>Цикл быстро выполняется до конца, и значение <code>i</code> становится равным 10 (условие выхода из цикла <code>i &lt; 10</code>).</li>
              <li>Только после этого начинают выполняться колбэки setTimeout.</li>
              <li>Когда колбэки выполняются, они все обращаются к одной и той же переменной <code>i</code>, которая к этому моменту уже равна 10.</li>
            </ol>
          </div>
        </div>
      </div>
  
      <div v-if="outputRevealed" class="solutions-section">
        <h2>Как решить эту проблему?</h2>
        
        <div class="tabs">
          <div 
            v-for="(solution, index) in solutions" 
            :key="index" 
            @click="currentSolution = index" 
            class="tab" 
            :class="{ 'active-tab': currentSolution === index }">
            {{ solution.title }}
          </div>
        </div>
        
        <div class="solution-content">
          <div class="solution-header">
            <h3>{{ solutions[currentSolution].title }}</h3>
          </div>
          
          <div class="solution-code">
            <pre class="code-block">{{ solutions[currentSolution].code }}</pre>
            <button class="run-button" @click="runSolution">Запустить решение</button>
          </div>
          
          <div v-if="solutionOutput.length > 0" class="solution-output">
            <h4>Вывод в консоль:</h4>
            <div class="console-output">
              <div v-for="(item, index) in solutionOutput" :key="index" class="output-item" :class="{ 'fade-in': true }">
                {{ item }}
              </div>
            </div>
          </div>
          
          <div class="solution-explanation">
            <h4>Как это работает?</h4>
            <p>{{ solutions[currentSolution].explanation }}</p>
            
            <div class="solution-animation">
              <div class="animation-illustration">
                <img :src="solutions[currentSolution].animation" alt="Анимация решения" class="animation-img" />
              </div>
              <div class="key-points">
                <h4>Ключевые моменты</h4>
                <ul>
                  <li v-for="(point, idx) in solutions[currentSolution].keyPoints" :key="idx">
                    {{ point }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="outputRevealed" class="real-world-section">
        <h2>Где это применяется в реальной жизни?</h2>
        
        <div class="use-cases">
          <div class="use-case">
            <h3>1. Обработчики событий</h3>
            <p>При добавлении обработчиков событий для элементов, сгенерированных в цикле</p>
            <pre class="code-block">
  // Проблемный код
  var buttons = document.querySelectorAll('button');
  for (var i = 0; i &lt; buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      console.log('Нажата кнопка с индексом: ' + i);
    });
  }</pre>
          </div>
          
          <div class="use-case">
            <h3>2. Асинхронные запросы в цикле</h3>
            <p>При выполнении AJAX-запросов или Promise в цикле</p>
            <pre class="code-block">
  // Проблемный код
  var urls = ['url1', 'url2', 'url3'];
  for (var i = 0; i &lt; urls.length; i++) {
    fetch(urls[i]).then(function(response) {
      console.log('Получен ответ для запроса ' + i);
    });
  }</pre>
          </div>
          
          <div class="use-case">
            <h3>3. Динамическое создание функций</h3>
            <p>Создание функций с разным поведением на основе данных в цикле</p>
            <pre class="code-block">
  // Проблемный код
  var functions = [];
  for (var i = 0; i &lt; 5; i++) {
    functions.push(function() {
      return i * i;
    });
  }
  
  // Все функции вернут 25, а не 0, 1, 4, 9, 16</pre>
          </div>
        </div>
      </div>
      
      <div v-if="outputRevealed" class="concepts-section">
        <h2>Ключевые концепции для понимания</h2>
        
        <div class="concept">
          <h3>Лексическое окружение (Lexical Environment)</h3>
          <p>Каждая функция в JavaScript создаёт своё лексическое окружение — контейнер, где хранятся локальные переменные функции и ссылка на лексическое окружение родителя.</p>
          <p>Замыкание формируется, когда функция запоминает свое внешнее лексическое окружение, даже если эта функция выполняется вне своего первоначального контекста.</p>
        </div>
        
        <div class="concept">
          <h3>Событийный цикл (Event Loop)</h3>
          <p>JavaScript имеет однопоточную модель выполнения кода с асинхронностью, реализованной через событийный цикл.</p>
          <p>Колбэки setTimeout добавляются в очередь задач и выполняются только после того, как стек вызовов опустеет — в нашем случае, после завершения цикла for.</p>
        </div>
        
        <div class="concept">
          <h3>Отличия var, let и const</h3>
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Особенность</th>
                  <th>var</th>
                  <th>let</th>
                  <th>const</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Область видимости</td>
                  <td>Функциональная</td>
                  <td>Блочная</td>
                  <td>Блочная</td>
                </tr>
                <tr>
                  <td>Всплытие (Hoisting)</td>
                  <td>Всплывает (undefined)</td>
                  <td>Всплывает (TDZ)</td>
                  <td>Всплывает (TDZ)</td>
                </tr>
                <tr>
                  <td>Переопределение</td>
                  <td>Можно</td>
                  <td>Можно</td>
                  <td>Нельзя</td>
                </tr>
                <tr>
                  <td>Повторное объявление</td>
                  <td>Можно</td>
                  <td>Нельзя</td>
                  <td>Нельзя</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div v-if="outputRevealed" class="best-practices">
        <h2>Рекомендации и выводы</h2>
        
        <div class="recommendations">
          <ul>
            <li><strong>Используйте let и const</strong> вместо var для объявления переменных.</li>
            <li><strong>Понимайте замыкания</strong> и как они взаимодействуют с асинхронными операциями.</li>
            <li><strong>Избегайте мутации переменных</strong> во внешней области видимости из асинхронных колбэков.</li>
            <li><strong>Создавайте новые области видимости</strong> при работе с циклами и асинхронными функциями.</li>
            <li><strong>Помните о задержке</strong> при работе с setTimeout, даже если таймер установлен на 0 мс.</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onUnmounted } from 'vue';
  
  // Переменные для демонстрации проблемы
  const outputRevealed = ref(false);
  const outputItems = ref([]);
  
  // Состояние анимации
  const animationRunning = ref(false);
  const animationComplete = ref(false);
  const currentAnimationStep = ref(0);
  const animatedI = ref(0);
  let animationTimer = null;
  
  // Текущее решение
  const currentSolution = ref(0);
  const solutionOutput = ref([]);
  
  // Решения проблемы
  const solutions = [
    {
      title: 'Использование let вместо var',
      code: `for (let i = 0; i < 10; i++) {
    setTimeout(function () {
      console.log(i);
    });
  }`,
      explanation: 'В отличие от var, оператор let создаёт новую переменную для каждой итерации цикла. Это означает, что каждая функция обратного вызова замыкается на своей собственной копии переменной i, а не на общей переменной цикла.',
      animation: 'https://example.com/let-animation.gif',  // Здесь будет URL изображения или путь к нему
      keyPoints: [
        'let имеет блочную область видимости, в отличие от функциональной области видимости var',
        'let создаёт новую переменную для каждой итерации цикла',
        'Каждое замыкание запоминает свою уникальную копию i',
        'Это самое современное и удобное решение проблемы'
      ]
    },
    {
      title: 'IIFE (немедленно вызываемая функция)',
      code: `for (var i = 0; i < 10; i++) {
    (function(index) {
      setTimeout(function () {
        console.log(index);
      });
    })(i);
  }`,
      explanation: 'IIFE (Immediately Invoked Function Expression) создаёт новую область видимости для каждой итерации цикла. Мы передаём текущее значение i в эту функцию как параметр index, и внутренняя функция setTimeout замыкается на этом параметре вместо внешней переменной i.',
      animation: 'https://example.com/iife-animation.gif',
      keyPoints: [
        'Создаёт новую функциональную область видимости',
        'Параметр index содержит копию значения i на момент итерации',
        'Работает даже со старыми браузерами, не поддерживающими ES6',
        'Классический подход до появления let/const'
      ]
    },
    {
      title: 'Использование метода bind',
      code: `for (var i = 0; i < 10; i++) {
    setTimeout(function (index) {
      console.log(index);
    }.bind(null, i));
  }`,
      explanation: 'Метод bind() создаёт новую функцию, которая при вызове устанавливает указанное значение в качестве первого аргумента функции. В этом случае мы привязываем текущее значение i в качестве первого параметра функции обратного вызова.',
      animation: 'https://example.com/bind-animation.gif',
      keyPoints: [
        'Создаёт новую функцию с предустановленными аргументами',
        'Первый параметр bind - контекст this (null в нашем случае)',
        'Последующие параметры становятся аргументами функции',
        'Элегантное решение без создания дополнительных областей видимости'
      ]
    },
    {
      title: 'Использование третьего параметра setTimeout',
      code: `for (var i = 0; i < 10; i++) {
    setTimeout(function (index) {
      console.log(index);
    }, 0, i);
  }`,
      explanation: 'setTimeout может принимать дополнительные параметры после времени задержки, которые передаются в функцию обратного вызова как аргументы. Мы используем эту возможность, чтобы передать текущее значение i в каждый колбэк.',
      animation: 'https://example.com/settimeout-params-animation.gif',
      keyPoints: [
        'setTimeout принимает дополнительные аргументы после времени задержки',
        'Эти аргументы передаются в функцию обратного вызова',
        'Просто и элегантно, но менее известное решение',
        'Не требует создания дополнительных функций или областей видимости'
      ]
    }
  ];
  
  // Показать результат выполнения оригинального кода
  function revealOutput() {
    outputRevealed.value = true;
    
    // Имитация вывода в консоль
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          outputItems.value.push(10);
        }, i * 300);
      }
    }, 500);
  }
  
  // Анимирование процесса выполнения кода
  function startAnimation() {
    // Сброс состояния анимации
    currentAnimationStep.value = 0;
    animatedI.value = 0;
    animationRunning.value = true;
    animationComplete.value = false;
    
    // Очистка предыдущего таймера
    if (animationTimer) {
      clearTimeout(animationTimer);
    }
    
    // Функция для анимации следующего шага
    function nextStep() {
      if (currentAnimationStep.value < 11) {
        // Анимация цикла for
        currentAnimationStep.value++;
        animatedI.value = currentAnimationStep.value;
      } else if (currentAnimationStep.value < 22) {
        // Анимация выполнения колбэков
        currentAnimationStep.value++;
      } else {
        // Анимация завершена
        animationRunning.value = false;
        animationComplete.value = true;
        return;
      }
      
      // Планирование следующего шага
      animationTimer = setTimeout(nextStep, 800);
    }
    
    // Запуск анимации
    nextStep();
  }
  
  // Запуск выбранного решения
  function runSolution() {
    // Очистка предыдущего вывода
    solutionOutput.value = [];
    
    // Имитация выполнения выбранного решения
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          solutionOutput.value.push(i);
        }, i * 300);
      }
    }, 500);
  }
  
  // Очистка ресурсов при размонтировании компонента
  onUnmounted(() => {
    if (animationTimer) {
      clearTimeout(animationTimer);
    }
  });
  </script>
  
  <style scoped>
  .closure-demo {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #333;
    background-color: #fff;
  }
  
  h1, h2, h3, h4 {
    color: #000;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 28px;
  }
  
  h2 {
    margin-top: 40px;
    margin-bottom: 20px;
    font-size: 24px;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
  }
  
  h3 {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  
  /* Контейнер кода */
  .code-container {
    background-color: #f8f8f8;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .code-block {
    background-color: #282c34;
    color: #abb2bf;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    line-height: 1.5;
    font-size: 16px;
  }
  
  /* Блок вопроса */
  .question-block {
    margin-top: 20px;
    text-align: center;
  }
  
  .reveal-button, .run-button, .control-button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 10px 2px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .reveal-button:hover, .run-button:hover, .control-button:hover {
    background-color: #45a049;
  }
  
  .control-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  /* Консольный вывод */
  .output-container {
    margin-top: 20px;
    animation: fadeIn 0.5s;
  }
  
  .console-output {
    background-color: #282c34;
    color: #abb2bf;
    padding: 15px;
    border-radius: 5px;
    margin-top: 10px;
    font-family: 'Courier New', monospace;
    max-height: 200px;
    overflow-y: auto;
  }
  
  .output-item {
    margin-bottom: 5px;
    padding: 3px 0;
  }
  
  .output-item.fade-in {
    animation: fadeIn 0.3s;
  }
  
  .output-explanation {
    margin-top: 15px;
    padding: 10px;
    background-color: #fff3cd;
    border-left: 4px solid #ffeeba;
    border-radius: 4px;
  }
  
  /* Секция объяснения */
  .explanation-container {
    margin-top: 20px;
  }
  
  .memory-model {
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
  }
  
  .execution-context, .call-stack {
    flex-basis: 48%;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .context-title, .stack-title {
    font-weight: bold;
    margin-bottom: 15px;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;
    font-size: 18px;
  }
  
  .variable-container {
    padding: 10px;
  }
  
  .variable {
    font-family: 'Courier New', monospace;
    padding: 5px;
    background-color: #f8f8f8;
    border-radius: 4px;
  }
  
  .variable-value {
    font-weight: bold;
    color: #e74c3c;
  }
  
  .stack-container {
    max-height: 250px;
    overflow-y: auto;
  }
  
  .callback-item {
    padding: 8px;
    margin-bottom: 5px;
    background-color: #f8f8f8;
    border-radius: 4px;
    transition: all 0.3s;
  }
  
  .callback-item.highlight {
    background-color: #e74c3c;
    color: white;
    transform: scale(1.05);
  }
  
  .animation-controls {
    text-align: center;
    margin: 20px 0;
  }
  
  .animation-step {
    margin-top: 10px;
    padding: 10px;
    background-color: #f8f8f8;
    border-radius: 4px;
    font-weight: bold;
  }
  
  .detailed-explanation {
    margin-top: 30px;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 8px;
  }
  
  .detailed-explanation ol {
    padding-left: 20px;
  }
  
  .detailed-explanation li {
    margin-bottom: 10px;
  }
  
  /* Секция решений */
  .tabs {
    display: flex;
    overflow-x: auto;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }
  
  .tab {
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.3s;
    white-space: nowrap;
  }
  
  .tab:hover {
    background-color: #f5f5f5;
  }
  
  .active-tab {
    border-bottom: 3px solid #4CAF50;
    font-weight: bold;
  }
  
  .solution-content {
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 8px;
    margin-bottom: 30px;
    animation: fadeIn 0.5s;
  }
  
  .solution-header {
    margin-bottom: 20px;
  }
  
  .solution-code {
    margin-bottom: 20px;
  }
  
  .solution-animation {
    display: flex;
    margin-top: 20px;
  }
  
  .animation-illustration {
    flex-basis: 40%;
    min-height: 200px;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }
  
  .animation-img {
    max-width: 100%;
    max-height: 200px;
  }
  
  .key-points {
    flex-basis: 60%;
    padding-left: 20px;
  }
  
  .key-points ul {
    padding-left: 20px;
  }
  
  .key-points li {
    margin-bottom: 10px;
  }
  
  /* Секция примеров из реальной жизни */
  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .use-case {
    padding: 15px;
    background-color: #f8f8f8;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .use-case h3 {
    margin-top: 0;
    font-size: 18px;
  }
  
  /* Секция концепций */
  .concept {
    margin-bottom: 30px;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 8px;
  }
  
  .comparison-table {
    overflow-x: auto;
    margin-top: 15px;
  }
  
  .comparison-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .comparison-table th, .comparison-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .comparison-table th {
    background-color: #f2f2f2;
  }
  
  .comparison-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  /* Секция рекомендаций */
  .recommendations ul {
    padding-left: 20px;
  }
  
  .recommendations li {
    margin-bottom: 15px;
    line-height: 1.5;
  }
  
  /* Анимации */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .memory-model {
      flex-direction: column;
    }
    
    .execution-context, .call-stack {
      margin-bottom: 20px;
    }
    
    .solution-animation {
      flex-direction: column;
    }
    
    .animation-illustration {
      margin-bottom: 20px;
    }
    
    .key-points {
      padding-left: 0;
    }
  }
  </style>