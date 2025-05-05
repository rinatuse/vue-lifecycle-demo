<template>
    <div class="sleep-tutorial">
      <h1 class="main-title">Функция задержки (sleep) в JavaScript</h1>
      <p class="intro-text">
        Разберёмся, как создать функцию задержки, какие проблемы могут возникнуть и где её можно применить.
      </p>
  
      <div class="section-container">
        <h2>Что такое функция sleep()?</h2>
        <div class="content-block">
          <p>
            Функция <code>sleep()</code> позволяет приостановить выполнение кода на определённое время. 
            В отличие от многих других языков программирования, в JavaScript нет встроенной функции <code>sleep()</code>, 
            поэтому её необходимо реализовать самостоятельно.
          </p>
        </div>
      </div>
  
      <div class="section-container">
        <h2>Две версии функции sleep</h2>
        <div class="content-block">
          <div class="code-comparison">
            <div class="code-block">
              <h3>Версия 1 (неполная)</h3>
              <pre class="code">function sleep(time = 100) {}</pre>
              <div class="code-explanation">
                <p>Эта версия только объявляет функцию с параметром <code>time</code> и значением по умолчанию 100.</p>
                <p>Но она не содержит никакой реализации и ничего не делает!</p>
              </div>
            </div>
  
            <div class="code-block">
              <h3>Версия 2 (полная)</h3>
              <pre class="code">function sleep(ms) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(ms);
      }, ms)
    );
  }</pre>
              <div class="code-explanation">
                <p>Эта версия создаёт и возвращает Promise, который разрешается через указанное количество миллисекунд.</p>
                <p>Она использует <code>setTimeout</code> для создания задержки.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="section-container">
        <h2>Как использовать функцию sleep</h2>
        <div class="content-block">
          <div class="usage-example">
            <h3>Вызов в асинхронной функции</h3>
            <pre class="code">async function example() {
    console.log("Начало");
    await sleep(2000); // Пауза 2 секунды
    console.log("После 2-секундной паузы");
    await sleep(1000); // Пауза 1 секунда
    console.log("После ещё 1 секунды");
  }</pre>
          </div>
  
          <div class="usage-notes">
            <p>
              Обратите внимание: функцию <code>sleep()</code> можно использовать только с ключевым словом 
              <code>await</code> внутри асинхронной функции (или с обработкой Promise через <code>.then()</code>).
            </p>
          </div>
        </div>
      </div>
  
      <div class="section-container">
        <h2>Визуализация работы функции sleep</h2>
        <div class="content-block">
          <div class="animation-container">
            <div class="code-execution">
              <div class="execution-line" :class="{ active: step >= 1, completed: step > 1 }">
                console.log("Начало");
              </div>
              <div class="execution-line" :class="{ active: step >= 2, completed: step > 2 }">
                await sleep(2000);
                <div class="timeout-indicator" v-if="step === 2">
                  <div class="timer-bar" :style="{ width: timerProgress + '%' }"></div>
                  <span class="timer-text">{{ currentTimeDisplay }}</span>
                </div>
              </div>
              <div class="execution-line" :class="{ active: step >= 3, completed: step > 3 }">
                console.log("После 2-секундной паузы");
              </div>
              <div class="execution-line" :class="{ active: step >= 4, completed: step > 4 }">
                await sleep(1000);
                <div class="timeout-indicator" v-if="step === 4">
                  <div class="timer-bar" :style="{ width: timerProgress + '%' }"></div>
                  <span class="timer-text">{{ currentTimeDisplay }}</span>
                </div>
              </div>
              <div class="execution-line" :class="{ active: step >= 5, completed: step > 5 }">
                console.log("После ещё 1 секунды");
              </div>
            </div>
  
            <div class="console-output">
              <div class="console-title">Консоль:</div>
              <div class="output-box">
                <div class="output-line" v-if="step >= 1">Начало</div>
                <div class="output-line" v-if="step >= 3">После 2-секундной паузы</div>
                <div class="output-line" v-if="step >= 5">После ещё 1 секунды</div>
              </div>
            </div>
  
            <div class="animation-controls">
              <button @click="startAnimation" :disabled="animationRunning">Запустить анимацию</button>
              <button @click="resetAnimation" :disabled="step === 0">Сбросить</button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="section-container">
        <h2>Проблемы с функцией sleep</h2>
        <div class="content-block">
          <div class="problem-container">
            <h3>Что выведет наша функция?</h3>
            <pre class="code">async function test() {
    console.log("Начало");
    const result = await sleep(1000);
    console.log("Результат:", result);
  }
  
  test();</pre>
  
            <div class="output-box">
              <div class="output-line">Начало</div>
              <div class="output-line">Результат: 1000</div>
            </div>
  
            <div class="problem-explanation">
              <h4>Проблема:</h4>
              <p>
                Функция возвращает значение параметра <code>ms</code>, а не какой-то специальный результат.
                Обычно функции задержки не должны возвращать входной параметр.
              </p>
              <p>
                Правильнее было бы сделать так:
              </p>
              <pre class="code">function sleep(ms) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve();  // Без параметра или resolve(null)
      }, ms)
    );
  }</pre>
            </div>
          </div>
  
          <div class="problem-container">
            <h3>Другие потенциальные проблемы</h3>
            <ul class="problems-list">
              <li>
                <strong>Блокировка основного потока:</strong> 
                Неправильная реализация (например, с использованием цикла) может заблокировать основной поток.
              </li>
              <li>
                <strong>Неточность таймера:</strong> 
                JavaScript не гарантирует точное время выполнения setTimeout из-за особенностей Event Loop.
              </li>
              <li>
                <strong>Использование в не-асинхронном коде:</strong> 
                Если забыть <code>await</code> или вызвать sleep в синхронном контексте, задержки не будет.
              </li>
              <li>
                <strong>Большое количество таймеров:</strong> 
                Создание множества таймеров может привести к проблемам с производительностью.
              </li>
            </ul>
          </div>
        </div>
      </div>
  
      <div class="section-container">
        <h2>Практические примеры использования</h2>
        <div class="content-block">
          <div class="examples-grid">
            <div class="example-card">
              <h3>1. Тестирование</h3>
              <p>Имитация задержки сетевых запросов в тестах</p>
              <pre class="code">async function testApiResponse() {
    // Имитируем сетевую задержку
    await sleep(500);
    return { data: "Test data" };
  }</pre>
            </div>
  
            <div class="example-card">
              <h3>2. Анимации</h3>
              <p>Последовательные анимации с задержкой</p>
              <pre class="code">async function animateSequence() {
    element1.animate();
    await sleep(300);
    element2.animate();
    await sleep(300);
    element3.animate();
  }</pre>
            </div>
  
            <div class="example-card">
              <h3>3. Повторные попытки</h3>
              <p>Повторные попытки с экспоненциальной задержкой</p>
              <pre class="code">async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i &lt; retries; i++) {
      try {
        return await fetch(url);
      } catch (error) {
        if (i === retries - 1) throw error;
        // Экспоненциальная задержка
        await sleep(1000 * Math.pow(2, i));
      }
    }
  }</pre>
            </div>
  
            <div class="example-card">
              <h3>4. Ограничение скорости</h3>
              <p>Ограничение частоты запросов к API</p>
              <pre class="code">async function processItems(items) {
    for (const item of items) {
      await processItem(item);
      // Делаем паузу между запросами
      await sleep(500);
    }
  }</pre>
            </div>
          </div>
        </div>
      </div>
  
      <div class="section-container">
        <h2>Алгоритмические аспекты функции sleep</h2>
        <div class="content-block">
          <div class="algorithm-explanation">
            <h3>Как работает наш алгоритм задержки?</h3>
  
            <div class="algorithm-steps">
              <div class="step-card">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>Создание Promise</h4>
                  <p>
                    Функция создаёт новый Promise, который представляет асинхронную операцию,
                    которая будет завершена в будущем.
                  </p>
                </div>
              </div>
  
              <div class="step-card">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>Настройка таймера</h4>
                  <p>
                    Внутри Promise используется setTimeout для откладывания выполнения callback-функции
                    на указанное количество миллисекунд.
                  </p>
                </div>
              </div>
  
              <div class="step-card">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>Разрешение Promise</h4>
                  <p>
                    Когда таймер срабатывает, вызывается функция resolve(),
                    которая меняет состояние Promise на "выполнено".
                  </p>
                </div>
              </div>
  
              <div class="step-card">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4>Продолжение выполнения</h4>
                  <p>
                    После разрешения Promise, код, следующий за await sleep(),
                    продолжает выполняться.
                  </p>
                </div>
              </div>
            </div>
  
            <div class="algorithm-visualization">
              <h3>Связь с Event Loop</h3>
              <div class="event-loop-diagram">
                <div class="event-loop-container">
                  <div class="call-stack">
                    <div class="stack-title">Call Stack</div>
                    <div class="stack-items">
                      <div class="stack-item" v-if="loopStep >= 1 && loopStep < 2">example()</div>
                      <div class="stack-item" v-if="loopStep >= 2 && loopStep < 3">console.log("Начало")</div>
                      <div class="stack-item" v-if="loopStep >= 3 && loopStep < 4">sleep(2000)</div>
                      <div class="stack-item" v-if="loopStep >= 5 && loopStep < 6">console.log("После паузы")</div>
                    </div>
                  </div>
  
                  <div class="event-loop-circle">
                    <div class="loop-arrow" :class="{ spinning: loopStep > 0 }"></div>
                    <div class="loop-text">Event Loop</div>
                  </div>
  
                  <div class="callback-queue">
                    <div class="queue-title">Callback Queue</div>
                    <div class="queue-items">
                      <div class="queue-item" v-if="loopStep >= 4 && loopStep < 5">
                        resolve() из setTimeout
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="event-loop-controls">
                  <button @click="startEventLoopAnimation" :disabled="loopAnimationRunning">
                    Показать Event Loop
                  </button>
                  <button @click="resetLoopAnimation" :disabled="loopStep === 0">Сбросить</button>
                </div>
  
                <div class="event-loop-description">
                  <p v-if="loopStep === 0">
                    Нажмите кнопку, чтобы увидеть, как функция sleep взаимодействует с Event Loop
                  </p>
                  <p v-if="loopStep === 1">
                    1. Функция example() добавляется в Call Stack и начинает выполняться
                  </p>
                  <p v-if="loopStep === 2">
                    2. console.log("Начало") добавляется в Call Stack и выполняется
                  </p>
                  <p v-if="loopStep === 3">
                    3. sleep(2000) добавляется в Call Stack, создаёт Promise и регистрирует setTimeout
                  </p>
                  <p v-if="loopStep === 4">
                    4. Через 2000 мс, callback из setTimeout добавляется в Callback Queue
                  </p>
                  <p v-if="loopStep === 5">
                    5. Event Loop забирает callback из очереди, Promise разрешается, и выполнение продолжается
                  </p>
                  <p v-if="loopStep === 6">
                    6. Процесс завершён, код после await sleep() продолжает выполняться
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="section-container">
        <h2>Лучшие практики использования функции sleep</h2>
        <div class="content-block">
          <div class="best-practices">
            <div class="practice-item">
              <h3>✅ Делайте</h3>
              <ul>
                <li>Используйте Promise-based реализацию</li>
                <li>Всегда используйте <code>await</code> или <code>.then()</code></li>
                <li>Указывайте разумные величины задержки</li>
                <li>Добавляйте комментарии, объясняющие цель задержки</li>
                <li>Рассмотрите возможность использования переменной для управления задержкой</li>
              </ul>
            </div>
  
            <div class="practice-item">
              <h3>❌ Избегайте</h3>
              <ul>
                <li>Не используйте циклы для блокирования потока выполнения</li>
                <li>Не создавайте задержки в критически важном коде производственной среды</li>
                <li>Не полагайтесь на точность таймера</li>
                <li>Не используйте задержки для синхронизации вместо правильных методов</li>
                <li>Не используйте слишком много задержек в одном приложении</li>
              </ul>
            </div>
          </div>
  
          <div class="optimized-code">
            <h3>Оптимизированная версия функции sleep</h3>
            <pre class="code">/**
   * Создаёт задержку выполнения кода на указанное количество миллисекунд
   * @param {number} ms - Время задержки в миллисекундах
   * @returns  Promise, который разрешается после задержки
   */
  function sleep(ms) {
    // Проверяем корректность входного параметра
    const delay = Math.max(0, Number(ms) || 0);
    
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }</pre>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Состояние для основной анимации
  const step = ref(0);
  const timerProgress = ref(0);
  const currentTimeDisplay = ref('');
  const animationRunning = ref(false);
  
  // Состояние для Event Loop анимации
  const loopStep = ref(0);
  const loopAnimationRunning = ref(false);
  
  // Функция для запуска основной анимации
  function startAnimation() {
    if (animationRunning.value) return;
    
    animationRunning.value = true;
    step.value = 1;
    
    // Задержка для первого console.log
    setTimeout(() => {
      // Запускаем первый sleep
      step.value = 2;
      startTimer(2000, () => {
        // После первого sleep
        step.value = 3;
        
        // Задержка для второго console.log
        setTimeout(() => {
          // Запускаем второй sleep
          step.value = 4;
          startTimer(1000, () => {
            // После второго sleep
            step.value = 5;
            
            // Задержка для третьего console.log
            setTimeout(() => {
              // Завершение анимации
              animationRunning.value = false;
            }, 1000);
          });
        }, 1000);
      });
    }, 1000);
  }
  
  // Функция для анимации таймера
  function startTimer(duration, callback) {
    timerProgress.value = 0;
    const startTime = Date.now();
    const interval = 50; // обновление каждые 50 мс
    
    function updateTimer() {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(100, (elapsedTime / duration) * 100);
      timerProgress.value = progress;
      
      const remainingTime = Math.max(0, duration - elapsedTime);
      currentTimeDisplay.value = `${(remainingTime / 1000).toFixed(1)}с`;
      
      if (progress < 100) {
        setTimeout(updateTimer, interval);
      } else {
        callback();
      }
    }
    
    updateTimer();
  }
  
  // Сброс основной анимации
  function resetAnimation() {
    animationRunning.value = false;
    step.value = 0;
    timerProgress.value = 0;
    currentTimeDisplay.value = '';
  }
  
  // Запуск анимации Event Loop
  function startEventLoopAnimation() {
    if (loopAnimationRunning.value) return;
    
    loopAnimationRunning.value = true;
    loopStep.value = 0;
    
    const steps = [1, 2, 3, 4, 5, 6];
    let currentStepIndex = 0;
    
    function nextStep() {
      if (currentStepIndex < steps.length) {
        loopStep.value = steps[currentStepIndex];
        currentStepIndex++;
        setTimeout(nextStep, 2000);
      } else {
        loopAnimationRunning.value = false;
      }
    }
    
    nextStep();
  }
  
  // Сброс анимации Event Loop
  function resetLoopAnimation() {
    loopAnimationRunning.value = false;
    loopStep.value = 0;
  }
  </script>
  
  <style scoped>
  .sleep-tutorial {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    color: #000;
    background-color: #fff;
  }
  
  .main-title {
    text-align: center;
    font-size: 2.2rem;
    margin-bottom: 10px;
    color: #333;
  }
  
  .intro-text {
    text-align: center;
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 40px;
  }
  
  .section-container {
    margin-bottom: 40px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .section-container h2 {
    background-color: #f5f5f5;
    margin: 0;
    padding: 15px 20px;
    font-size: 1.5rem;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .content-block {
    padding: 20px;
    background-color: #fff;
  }
  
  .code-comparison {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .code-block {
    flex: 1;
    min-width: 300px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .code-block h3 {
    margin: 0;
    padding: 10px 15px;
    background-color: #f5f5f5;
    font-size: 1.1rem;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .code {
    background-color: #fff;
    color: #000;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: a5px;
    font-family: 'Courier New', monospace;
    white-space: pre;
    overflow-x: auto;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .code-explanation {
    padding: 15px;
    font-size: 0.95rem;
  }
  
  .usage-example {
    margin-bottom: 20px;
  }
  
  .usage-example h3 {
    margin-top: 0;
    font-size: 1.1rem;
  }
  
  .usage-notes {
    padding: 15px;
    background-color: #f8f9fa;
    border-left: 4px solid #6c757d;
    border-radius: 4px;
  }
  
  .animation-container {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    background-color: #f8f9fa;
  }
  
  .code-execution {
    margin-bottom: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .execution-line {
    padding: 10px 15px;
    border-bottom: 1px solid #e0e0e0;
    font-family: 'Courier New', monospace;
    position: relative;
    background-color: #fff;
  }
  
  .execution-line:last-child {
    border-bottom: none;
  }
  
  .execution-line.active {
    background-color: #f0f8ff;
    font-weight: bold;
  }
  
  .execution-line.completed {
    background-color: #f0fff0;
  }
  
  .timeout-indicator {
    margin-top: 5px;
    height: 8px;
    width: 100%;
    background-color: #eee;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }
  
  .timer-bar {
    height: 100%;
    background-color: #4caf50;
    transition: width 0.05s linear;
  }
  
  .timer-text {
    position: absolute;
    right: 5px;
    top: -18px;
    font-size: 0.8rem;
    color: #555;
  }
  
  .console-output {
    margin-bottom: 20px;
  }
  
  .console-title {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .output-box {
    background-color: #000;
    color: #fff;
    padding: 15px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    min-height: 100px;
  }
  
  .output-line {
    margin-bottom: 5px;
  }
  
  .animation-controls {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  
  .animation-controls button {
    padding: 10px 15px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .animation-controls button:hover:not(:disabled) {
    background-color: #45a049;
  }
  
  .animation-controls button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .problem-container {
    margin-bottom: 30px;
  }
  
  .problem-container h3 {
    font-size: 1.2rem;
    margin-top: 0;
  }
  
  .problem-explanation {
    background-color: #fff9e6;
    border-left: 4px solid #f0ad4e;
    padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
  }
  
  .problem-explanation h4 {
    margin-top: 0;
    color: #e67e22;
  }
  
  .problems-list li {
    margin-bottom: 10px;
  }
  
  .examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .example-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .example-card h3 {
    margin: 0;
    padding: 10px 15px;
    background-color: #f5f5f5;
    font-size: 1.1rem;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .example-card p {
    padding: 10px 15px;
    margin: 0;
    font-style: italic;
  }
  
  .example-card .code {
    margin: 0;
    border-radius: 0;
    border-left: none;
    border-right: none;
    border-bottom: none;
  }
  
  .algorithm-steps {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 30px;
  }
  
  .step-card {
    flex: 1;
    min-width: 200px;
    display: flex;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
  }
  
  .step-number {
    padding: 15px;
    font-size: 1.5rem;
    font-weight: bold;
    background-color: #4caf50;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
  }
  
  .step-content {
    padding: 15px;
    flex: 1;
  }
  
  .step-content h4 {
    margin-top: 0;
    font-size: 1rem;
  }
  
  .event-loop-diagram {
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    margin-top: 30px;
  }
  
  .event-loop-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }
  
  .call-stack, .callback-queue {
    width: 200px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
  }
  
  .stack-title, .queue-title {
    background-color: #3498db;
    color: white;
    padding: 10px;
    text-align: center;
    font-weight: bold;
  }
  
  .stack-items, .queue-items {
    min-height: 150px;
    padding: 10px;
    display: flex;
    flex-direction: column-reverse;
  }
  
  .stack-item, .queue-item {
    padding: 8px 10px;
    margin-bottom: 5px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background-color: #f8f9fa;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
  }
  
  .event-loop-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 8px solid #3498db;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .loop-arrow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60px;
    height: 3px;
    background-color: transparent;
    transform-origin: 0 50%;
    transform: rotate(45deg);
  }
  
  .loop-arrow::after {
    content: '';
    position: absolute;
    top: -5px;
    right: -5px;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 8px solid #3498db;
  }
  
  .loop-arrow.spinning {
    animation: spin 5s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .loop-text {
    font-size: 0.8rem;
    color: #3498db;
    font-weight: bold;
    text-align: center;
  }
  
  .event-loop-controls {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    justify-content: center;
  }
  
  .event-loop-controls button {
    padding: 10px 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .event-loop-controls button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .event-loop-controls button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .event-loop-description {
    margin-top: 20px;
    min-height: 80px;
    padding: 15px;
    background-color: #e8f4fc;
    border-radius: 4px;
    text-align: center;
  }
  
  .best-practices {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .practice-item {
    flex: 1;
    min-width: 300px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .practice-item h3 {
    margin: 0;
    padding: 10px 15px;
    font-size: 1.1rem;
  }
  
  .practice-item:first-child h3 {
    background-color: #e6f4ea;
    color: #137333;
  }
  
  .practice-item:last-child h3 {
    background-color: #fce8e6;
    color: #c5221f;
  }
  
  .practice-item ul {
    padding: 10px 30px;
    margin: 0;
  }
  
  .practice-item li {
    margin-bottom: 8px;
  }
  
  .optimized-code {
    margin-top: 30px;
  }
  
  .optimized-code h3 {
    margin-top: 0;
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    .code-comparison {
      flex-direction: column;
    }
    
    .event-loop-container {
      flex-direction: column;
    }
    
    .call-stack, .callback-queue {
      width: 100%;
    }
    
    .event-loop-circle {
      margin: 20px 0;
    }
  }
  </style>