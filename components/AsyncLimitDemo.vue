<template>
    <div class="async-limit-demo">
      <h1>Ограничение времени выполнения асинхронных функций</h1>
      <p class="description">Изучим как реализовать функцию <code>asyncLimit</code>, которая добавляет таймаут для асинхронной функции</p>
      
      <div class="task-container">
        <h2>Задача:</h2>
        <div class="task-description">
          <p>Необходимо написать функцию, которая принимает два аргумента:</p>
          <ul>
            <li><strong>асинхронную функцию</strong> (fn)</li>
            <li><strong>время таймаута</strong> в миллисекундах (delay)</li>
          </ul>
          <p>Функция должна возвращать новую асинхронную функцию с таймаутом, которая:</p>
          <ul>
            <li>Выполняет исходную функцию, если та завершается до истечения таймаута</li>
            <li>Возвращает ошибку "Превышен лимит времени выполнения", если таймаут истекает раньше</li>
          </ul>
        </div>
      </div>
      
      <div class="solution-container">
        <h2>Решение:</h2>
        <div class="solution-code">
          <pre class="code-block">
  export const asyncLimit = (fn, delay) => {
    return async (...args) => {
      return Promise.race([
        fn(...args),
        new Promise((_, reject) => 
          setTimeout(() => reject("Превышен лимит времени выполнения"), delay)
        ),
      ]);
    };
  };</pre>
        </div>
        
        <div class="explanation">
          <h3>Как это работает:</h3>
          <p>Функция использует <code>Promise.race()</code> для "гонки" между:</p>
          <ul>
            <li>Исходной асинхронной функцией</li>
            <li>Таймером, который создаёт отклонённый промис после истечения времени ожидания</li>
          </ul>
          <p><code>Promise.race()</code> возвращает результат того промиса, который выполнится первым:</p>
          <ul>
            <li>Если исходная функция выполнится быстрее — получаем её результат</li>
            <li>Если таймер сработает быстрее — получаем ошибку с сообщением</li>
          </ul>
        </div>
      </div>
      
      <div class="visualization-container">
        <h2>Визуализация работы функции:</h2>
        <div class="controls">
          <div class="delay-control">
            <label for="delay-slider">Установите время таймаута: {{ timeoutDelay }} мс</label>
            <input 
              id="delay-slider" 
              type="range" 
              min="50" 
              max="200" 
              step="10" 
              v-model="timeoutDelay"
            >
          </div>
          <div class="function-control">
            <label for="function-select">Выберите функцию:</label>
            <select id="function-select" v-model="selectedFunction">
              <option value="fn">fn (выполняется 100 мс)</option>
              <option value="fn2">fn2 (выполняется 120 мс)</option>
            </select>
          </div>
          <button class="run-button" @click="runDemo" :disabled="isRunning">
            {{ isRunning ? 'Выполняется...' : 'Запустить демонстрацию' }}
          </button>
        </div>
        
        <div class="animation-container">
          <div class="timeline">
            <div class="timescale">
              <div class="time-marker" v-for="time in 220" :key="time" v-show="time % 50 === 0">
                {{ time }} мс
              </div>
            </div>
            
            <div class="execution-tracks">
              <div class="track">
                <div class="track-label">Таймаут</div>
                <div class="track-timeline">
                  <div 
                    class="timeout-progress" 
                    :style="{ width: `${timeoutProgress}%`, 'max-width': `${timeoutDelay / 2}px` }"
                    :class="{ 'timeout-triggered': timeoutTriggered }"
                  ></div>
                  <div 
                    class="timeout-marker" 
                    :style="{ left: `${timeoutDelay / 2}px` }"
                    :class="{ 'marker-triggered': timeoutTriggered }"
                    v-show="showTimeoutMarker"
                  >
                    ⏰
                  </div>
                </div>
              </div>
              
              <div class="track">
                <div class="track-label">Функция</div>
                <div class="track-timeline">
                  <div 
                    class="function-progress" 
                    :style="{ width: `${functionProgress}%`, 'max-width': `${functionDuration / 2}px` }"
                    :class="{ 'function-completed': functionCompleted }"
                  ></div>
                  <div 
                    class="function-marker" 
                    :style="{ left: `${functionDuration / 2}px` }"
                    :class="{ 'marker-triggered': functionCompleted }"
                    v-show="showFunctionMarker"
                  >
                    ✓
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="result-display" v-if="showResult">
            <div class="result-title">Результат:</div>
            <div class="result-value" :class="{ 'result-error': resultIsError }">
              {{ result }}
            </div>
            <div class="result-explanation">
              <p v-if="resultIsError">
                Время выполнения функции ({{ functionDuration }} мс) больше установленного таймаута ({{ timeoutDelay }} мс).
                <br>Promise был отклонён до завершения функции!
              </p>
              <p v-else>
                Время выполнения функции ({{ functionDuration }} мс) меньше установленного таймаута ({{ timeoutDelay }} мс).
                <br>Функция успешно завершилась и вернула результат!
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="edge-cases">
        <h2>Подводные камни и важные детали</h2>
        <div class="edge-case">
          <h3>1. Используйте reject для таймаута</h3>
          <div class="bad-code">
            <h4>❌ Неправильно:</h4>
            <pre class="code-block">
  // Неправильно - используется resolve для таймаута
  new Promise((resolve) => 
    setTimeout(() => resolve("Превышен лимит времени выполнения"), delay)
  )</pre>
          </div>
          <div class="good-code">
            <h4>✅ Правильно:</h4>
            <pre class="code-block">
  // Правильно - используется reject для таймаута
  new Promise((_, reject) => 
    setTimeout(() => reject("Превышен лимит времени выполнения"), delay)
  )</pre>
          </div>
          <p class="explanation">Таймаут должен создавать отклонённый промис (reject), а не успешно завершенный (resolve). Иначе при тайм-ауте вы получите успешный результат вместо ошибки!</p>
        </div>
        
        <div class="edge-case">
          <h3>2. Недостаточное очищение ресурсов</h3>
          <div class="bad-code">
            <h4>❌ Недоработка:</h4>
            <pre class="code-block">
  // Таймер не очищается, даже если функция завершилась раньше
  export const asyncLimit = (fn, delay) => {
    return async (...args) => {
      return Promise.race([
        fn(...args),
        new Promise((_, reject) => 
          setTimeout(() => reject("Превышен лимит времени выполнения"), delay)
        ),
      ]);
    };
  };</pre>
          </div>
          <div class="good-code">
            <h4>✅ Улучшенная версия:</h4>
            <pre class="code-block">
  // Таймер очищается, когда одна из операций завершается
  export const asyncLimit = (fn, delay) => {
    return async (...args) => {
      let timeoutId;
      const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => 
          reject("Превышен лимит времени выполнения"), delay);
      });
      
      try {
        return await Promise.race([fn(...args), timeoutPromise]);
      } finally {
        clearTimeout(timeoutId);
      }
    };
  };</pre>
          </div>
          <p class="explanation">В улучшенной версии таймер очищается с помощью clearTimeout, что предотвращает утечки памяти и выполнение ненужного кода, особенно важно в ситуациях с множественными вызовами.</p>
        </div>
        
        <div class="edge-case">
          <h3>3. Не прерывает выполнение функции</h3>
          <p class="explanation">Важно понимать, что исходная функция продолжает выполняться даже после истечения таймаута! Мы только перестаём ждать её результат, но функция всё равно работает в фоне.</p>
          <pre class="code-block">
  // Функция продолжит работу даже после тайм-аута
  const longTask = async () => {
    console.log("Начало выполнения");
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log("Функция все ещё выполняется, хотя уже был таймаут!");
    return "Результат";
  };
  
  // Вызов с таймаутом 1000 мс
  asyncLimit(longTask, 1000)()
    .catch(err => console.error(err));
    
  // В консоли всё равно появится "Функция все ещё выполняется..."
  // спустя 5 секунд, хотя Promise был отклонён уже через 1 секунду</pre>
        </div>
      </div>
      
      <div class="practical-use">
        <h2>Практическое применение</h2>
        <div class="use-cases">
          <div class="use-case">
            <h3>1. API-запросы и сетевые операции</h3>
            <p>Добавление таймаута к сетевым запросам повышает отзывчивость приложения, не позволяя ему зависать при медленном соединении:</p>
            <pre class="code-block">
  const fetchWithTimeout = asyncLimit(fetch, 5000);
  
  // Если запрос занимает больше 5 секунд, получим ошибку вместо зависания
  fetchWithTimeout("https://api.example.com/data")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Проблема с запросом:", error));</pre>
          </div>
          
          <div class="use-case">
            <h3>2. Кэширование и повторные попытки</h3>
            <p>Можно создать функцию с повторными попытками и кэшированием для повышения надёжности:</p>
            <pre class="code-block">
  const cache = new Map();
  
  const fetchWithRetry = async (url) => {
    // Проверяем кэш
    if (cache.has(url)) return cache.get(url);
    
    // До 3 попыток с таймаутом
    for (let attempt = 1; attempt &lt;= 3; attempt++) {
      try {
        const fetchWithTimeout = asyncLimit(fetch, 3000);
        const response = await fetchWithTimeout(url);
        const data = await response.json();
        
        // Сохраняем в кэш
        cache.set(url, data);
        return data;
      } catch (error) {
        if (attempt === 3) throw error;
        console.log(`Попытка ${attempt} не удалась, повторяем...`);
      }
    }
  };</pre>
          </div>
          
          <div class="use-case">
            <h3>3. Параллельное выполнение с ограничением времени</h3>
            <p>Можно применить к нескольким параллельным операциям, ожидая только заданное время:</p>
            <pre class="code-block">
  const parallelWithTimeout = async (functions, timeout) => {
    const limitedFns = functions.map(fn => asyncLimit(fn, timeout));
    
    // Выполняем все функции, но с таймаутом
    const results = await Promise.allSettled(
      limitedFns.map(fn => fn())
    );
    
    return results.map(result => 
      result.status === 'fulfilled' ? result.value : null
    );
  };</pre>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  
  // Параметры функций и таймаута
  const timeoutDelay = ref(120);
  const selectedFunction = ref('fn');
  
  // Вычисляемые свойства
  const functionDuration = computed(() => {
    return selectedFunction.value === 'fn' ? 100 : 120;
  });
  
  // Состояние анимации
  const isRunning = ref(false);
  const timeoutProgress = ref(0);
  const functionProgress = ref(0);
  const timeoutTriggered = ref(false);
  const functionCompleted = ref(false);
  const showTimeoutMarker = ref(false);
  const showFunctionMarker = ref(false);
  
  // Результат выполнения
  const showResult = ref(false);
  const result = ref('');
  const resultIsError = ref(false);
  
  // Запуск демонстрации
  const runDemo = () => {
    // Сброс состояния
    isRunning.value = true;
    timeoutProgress.value = 0;
    functionProgress.value = 0;
    timeoutTriggered.value = false;
    functionCompleted.value = false;
    showTimeoutMarker.value = true;
    showFunctionMarker.value = true;
    showResult.value = false;
    
    // Запускаем анимацию таймаута
    const timeoutAnimation = setInterval(() => {
      if (timeoutProgress.value < 100) {
        timeoutProgress.value += 2;
      } else {
        clearInterval(timeoutAnimation);
        timeoutTriggered.value = true;
        
        // Если функция еще не завершилась, показываем ошибку
        if (!functionCompleted.value) {
          result.value = "Ошибка: Превышен лимит времени выполнения";
          resultIsError.value = true;
          showResult.value = true;
          isRunning.value = false;
        }
      }
    }, timeoutDelay.value / 50);
    
    // Запускаем анимацию функции
    const fnAnimation = setInterval(() => {
      if (functionProgress.value < 100) {
        functionProgress.value += 2;
      } else {
        clearInterval(fnAnimation);
        functionCompleted.value = true;
        
        // Если таймаут еще не сработал, показываем результат функции
        if (!timeoutTriggered.value) {
          if (selectedFunction.value === 'fn') {
            result.value = "Результат: 25"; // n * n (где n = 5)
          } else {
            result.value = "Результат: 3";  // a + b (где a = 1, b = 2)
          }
          resultIsError.value = false;
          showResult.value = true;
          isRunning.value = false;
        }
      }
    }, functionDuration.value / 50);
  };
  
  // Отслеживаем изменения параметров
  watch([timeoutDelay, selectedFunction], () => {
    // Сбрасываем состояние при изменении параметров
    if (isRunning.value) return;
    
    timeoutProgress.value = 0;
    functionProgress.value = 0;
    timeoutTriggered.value = false;
    functionCompleted.value = false;
    showTimeoutMarker.value = true;
    showFunctionMarker.value = true;
    showResult.value = false;
  });
  </script>
  
  <style scoped>
  .async-limit-demo {
    font-family: Arial, sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
    background-color: #fff;
  }
  
  h1 {
    color: #2c3e50;
    margin-bottom: 10px;
    text-align: center;
  }
  
  h2 {
    color: #2c3e50;
    margin-top: 30px;
    margin-bottom: 15px;
    padding-bottom: 8px;
    border-bottom: 2px solid #3498db;
  }
  
  h3 {
    color: #2c3e50;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  h4 {
    margin-top: 15px;
    margin-bottom: 5px;
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 15px;
  }
  
  .description {
    text-align: center;
    color: #7f8c8d;
    margin-bottom: 30px;
  }
  
  code {
    background-color: #f8f9fa;
    padding: 2px 5px;
    border-radius: 3px;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
  }
  
  .task-container,
  .solution-container,
  .visualization-container,
  .edge-cases,
  .practical-use {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  ul {
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 8px;
  }
  
  .code-block {
    background-color: #2d2d2d;
    color: #f8f8f2;
    border-radius: 5px;
    padding: 12px 15px;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    overflow-x: auto;
    font-size: 14px;
    line-height: 1.5;
    margin: 15px 0;
    white-space: pre;
  }
  
  .explanation {
    margin-top: 15px;
  }
  
  /* Элементы управления визуализацией */
  .controls {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
    background-color: #eaeff4;
    padding: 15px;
    border-radius: 6px;
  }
  
  .delay-control,
  .function-control {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  input[type="range"] {
    width: 100%;
  }
  
  select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  
  .run-button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 12px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
    margin-top: 10px;
  }
  
  .run-button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .run-button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  /* Анимация */
  .animation-container {
    margin-top: 20px;
  }
  
  .timeline {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .timescale {
    position: relative;
    height: 20px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .time-marker {
    position: absolute;
    transform: translateX(-50%);
    font-size: 12px;
    color: #666;
  }
  
  .execution-tracks {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .track {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .track-label {
    width: 80px;
    text-align: right;
    font-weight: bold;
    color: #2c3e50;
  }
  
  .track-timeline {
    position: relative;
    height: 20px;
    background-color: #f3f3f3;
    border-radius: 10px;
    flex-grow: 1;
  }
  
  .timeout-progress {
    height: 100%;
    background-color: #3498db;
    border-radius: 10px;
    transition: width 0.1s linear;
  }
  
  .function-progress {
    height: 100%;
    background-color: #2ecc71;
    border-radius: 10px;
    transition: width 0.1s linear;
  }
  
  .timeout-marker,
  .function-marker {
    position: absolute;
    top: -25px;
    transform: translateX(-50%);
    font-size: 20px;
    transition: opacity 0.3s;
  }
  
  .timeout-triggered .timeout-progress {
    background-color: #e74c3c;
  }
  
  .function-completed .function-progress {
    background-color: #27ae60;
  }
  
  .marker-triggered {
    animation: bounce 0.5s;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-10px);
    }
    60% {
      transform: translateX(-50%) translateY(-5px);
    }
  }
  
  /* Результат */
  .result-display {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    margin-top: 20px;
    animation: fadeIn 0.5s;
  }
  
  .result-title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .result-value {
    padding: 10px;
    background-color: #f1f9f1;
    border-left: 4px solid #27ae60;
    border-radius: 4px;
    margin-bottom: 10px;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
  }
  
  .result-value.result-error {
    background-color: #ffeaea;
    border-left-color: #e74c3c;
  }
  
  .result-explanation {
    margin-top: 10px;
    font-size: 14px;
  }
  
  /* Подводные камни */
  .edge-case {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .bad-code h4 {
    color: #e74c3c;
  }
  
  .good-code h4 {
    color: #27ae60;
  }
  
  /* Практическое применение */
  .use-case {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 20px;
  }
  
  /* Анимации */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Адаптивная вёрстка */
  @media (max-width: 768px) {
    .controls {
      flex-direction: column;
    }
    
    .track {
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;
    }
    
    .track-label {
      width: 100%;
      text-align: left;
    }
  }
  </style>