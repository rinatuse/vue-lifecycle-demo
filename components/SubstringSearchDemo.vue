<template>
    <div class="substring-search-demo">
      <h1>Поиск подстроки в массиве строк</h1>
      
      <div class="task-description">
        <h2>Задача:</h2>
        <p>Написать функцию <code>findSubstring</code>, которая принимает подстроку и массив строк, 
           а возвращает массив строк, в которых содержится эта подстрока.</p>
        
        <div class="example-code">
          <pre><code>const findSubstring = (substring, arr) => {
    // Код нашей функции
  };
  
  console.log(
    findSubstring("am", [
      "fuzzy",
      "maskva", 
      "mama", 
      "search", 
      "algorithm", 
      "utility",
    ])
  );</code></pre>
        </div>
        
        <p>Ожидаемый результат: <code>["mama"]</code></p>
      </div>
      
      <div class="solution-container">
        <h2>Решение задачи:</h2>
        
        <div class="solution-tabs">
          <button 
            v-for="(tab, index) in tabs" 
            :key="index"
            :class="{ active: currentTab === index }"
            @click="currentTab = index"
          >
            {{ tab.title }}
          </button>
        </div>
        
        <div class="solution-content">
          <!-- Решение с помощью for-цикла -->
          <div v-if="currentTab === 0" class="solution-panel">
            <div class="code-block">
              <pre><code>const findSubstring = (substring, arr) => {
    // Создаем пустой массив для результатов
    const result = [];
    
    // Проходим по каждой строке в массиве
    for (let i = 0; i &lt; arr.length; i++) {
      // Проверяем, содержит ли строка нашу подстроку
      if (arr[i].includes(substring)) {
        // Если содержит, добавляем в результат
        result.push(arr[i]);
      }
    }
    
    // Возвращаем массив строк, содержащих подстроку
    return result;
  };</code></pre>
            </div>
            
            <div class="explanation">
              <h3>Пошаговое объяснение:</h3>
              <ol>
                <li>Создаем пустой массив <code>result</code> для хранения результата</li>
                <li>Используем цикл <code>for</code> для перебора всех элементов исходного массива</li>
                <li>Для каждой строки проверяем, содержит ли она подстроку с помощью метода <code>includes()</code></li>
                <li>Если строка содержит подстроку, добавляем её в массив результатов</li>
                <li>После завершения цикла возвращаем массив результатов</li>
              </ol>
            </div>
          </div>
          
          <!-- Решение с помощью filter -->
          <div v-if="currentTab === 1" class="solution-panel">
            <div class="code-block">
              <pre><code>const findSubstring = (substring, arr) => {
    // Используем метод filter для фильтрации массива
    return arr.filter(str => str.includes(substring));
  };</code></pre>
            </div>
            
            <div class="explanation">
              <h3>Пошаговое объяснение:</h3>
              <ol>
                <li>Используем метод массива <code>filter()</code>, который создает новый массив с элементами, 
                    прошедшими проверку в переданной функции</li>
                <li>Для каждой строки проверяем, содержит ли она подстроку с помощью метода <code>includes()</code></li>
                <li>Метод <code>filter()</code> автоматически возвращает массив элементов, 
                    для которых переданная функция вернула <code>true</code></li>
              </ol>
              <p>Это решение более компактное и декларативное по сравнению с использованием цикла <code>for</code>.</p>
            </div>
          </div>
          
          <!-- Другие методы поиска подстроки -->
          <div v-if="currentTab === 2" class="solution-panel">
            <div class="code-block">
              <pre><code>// Варианты проверки наличия подстроки в строке:
  
  // 1. С помощью метода includes()
  if (str.includes(substring)) { ... }
  
  // 2. С помощью метода indexOf()
  if (str.indexOf(substring) !== -1) { ... }
  
  // 3. С помощью метода search() (с регулярным выражением)
  if (str.search(substring) !== -1) { ... }
  
  // 4. С помощью метода match() (с регулярным выражением)
  if (str.match(substring)) { ... }
  
  // 5. С помощью регулярного выражения и метода test()
  if (new RegExp(substring).test(str)) { ... }</code></pre>
            </div>
            
            <div class="explanation">
              <h3>Различные методы поиска подстроки:</h3>
              <ul>
                <li><code>includes()</code> - самый простой и читаемый способ, возвращает <code>true</code> или <code>false</code></li>
                <li><code>indexOf()</code> - возвращает индекс первого вхождения подстроки или <code>-1</code>, если подстрока не найдена</li>
                <li><code>search()</code> - работает с регулярными выражениями, возвращает индекс начала совпадения или <code>-1</code></li>
                <li><code>match()</code> - работает с регулярными выражениями, возвращает массив совпадений или <code>null</code></li>
                <li><code>RegExp.test()</code> - проверяет наличие совпадения с регулярным выражением, возвращает <code>true</code> или <code>false</code></li>
              </ul>
              <p>Выбор метода зависит от конкретной задачи и личных предпочтений. Для простого поиска подстроки <code>includes()</code> обычно является лучшим выбором.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="interactive-demo">
        <h2>Интерактивная демонстрация</h2>
        
        <div class="demo-inputs">
          <div class="input-group">
            <label for="substring">Искомая подстрока:</label>
            <input 
              id="substring" 
              v-model="searchSubstring" 
              type="text" 
              placeholder="Введите подстроку"
            />
          </div>
          
          <div class="input-group">
            <label>Массив строк (по одной на строку):</label>
            <textarea 
              v-model="inputArray" 
              rows="6" 
              placeholder="Введите строки массива (по одной на строку)"
            ></textarea>
          </div>
          
          <button @click="startAnimation" :disabled="isAnimating">Запустить поиск</button>
        </div>
        
        <div class="visualization">
          <h3>Визуализация алгоритма</h3>
          
          <div class="array-container">
            <div 
              v-for="(item, index) in arrayItems" 
              :key="index"
              class="array-item"
              :class="{
                'active': currentIndex === index,
                'matched': matchedIndices.includes(index),
                'not-matched': checkedIndices.includes(index) && !matchedIndices.includes(index)
              }"
            >
              <div class="array-item-value">
                {{ item }}
              </div>
              <div class="array-item-index">индекс: {{ index }}</div>
            </div>
          </div>
          
          <div class="algorithm-steps">
            <div class="step" :class="{ 'current-step': currentStep === 1 }">
              1. Создаем пустой массив для результатов
            </div>
            <div class="step" :class="{ 'current-step': currentStep === 2 }">
              2. Перебираем элементы исходного массива
            </div>
            <div class="step" :class="{ 'current-step': currentStep === 3 }">
              3. Проверяем, содержит ли текущая строка подстроку "{{ searchSubstring }}"
            </div>
            <div class="step" :class="{ 'current-step': currentStep === 4 }">
              4. Если содержит, добавляем строку в результат
            </div>
            <div class="step" :class="{ 'current-step': currentStep === 5 }">
              5. Переходим к следующему элементу массива
            </div>
            <div class="step" :class="{ 'current-step': currentStep === 6 }">
              6. Возвращаем массив результатов
            </div>
          </div>
          
          <div class="result-container" v-if="showResult">
            <h3>Результат:</h3>
            <div class="result-code">
              <pre><code>[{{ resultArray.join(', ') }}]</code></pre>
            </div>
          </div>
        </div>
      </div>
      
      <div class="real-world-applications">
        <h2>Практическое применение</h2>
        
        <div class="applications-grid">
          <div class="application-card">
            <h3>Текстовый поиск</h3>
            <p>Поиск ключевых слов в документах, статьях, комментариях или любых других текстовых данных.</p>
            <div class="example">
              <strong>Пример:</strong> Поиск статей по ключевому слову в блоге или CMS.
            </div>
          </div>
          
          <div class="application-card">
            <h3>Фильтрация данных</h3>
            <p>Фильтрация списков, таблиц или любых других наборов данных по введенному пользователем запросу.</p>
            <div class="example">
              <strong>Пример:</strong> Поисковая строка в интернет-магазине для фильтрации товаров.
            </div>
          </div>
          
          <div class="application-card">
            <h3>Автодополнение</h3>
            <p>Реализация подсказок при вводе в поле поиска на основе имеющихся данных.</p>
            <div class="example">
              <strong>Пример:</strong> Автодополнение в поисковой строке, предлагающее варианты на основе уже введенного текста.
            </div>
          </div>
          
          <div class="application-card">
            <h3>Валидация данных</h3>
            <p>Проверка наличия определенных подстрок в пользовательском вводе для валидации.</p>
            <div class="example">
              <strong>Пример:</strong> Проверка, содержит ли введенный email определенный домен.
            </div>
          </div>
          
          <div class="application-card">
            <h3>Анализ текста</h3>
            <p>Поиск определенных паттернов или ключевых слов в тексте для его анализа.</p>
            <div class="example">
              <strong>Пример:</strong> Анализ комментариев на наличие негативных или запрещенных слов.
            </div>
          </div>
          
          <div class="application-card">
            <h3>Обработка логов</h3>
            <p>Фильтрация логов приложения для поиска определенных сообщений об ошибках или предупреждений.</p>
            <div class="example">
              <strong>Пример:</strong> Поиск логов, содержащих "error" или "warning", для отладки приложения.
            </div>
          </div>
        </div>
      </div>
      
      <div class="performance-considerations">
        <h2>Подводные камни и оптимизация</h2>
        
        <div class="pitfalls">
          <h3>На что обратить внимание:</h3>
          <ul>
            <li>
              <strong>Регистр символов:</strong> Метод <code>includes()</code> чувствителен к регистру. 
              Для поиска без учета регистра можно привести обе строки к нижнему или верхнему регистру:
              <pre><code>if (str.toLowerCase().includes(substring.toLowerCase())) { ... }</code></pre>
            </li>
            <li>
              <strong>Специальные символы в регулярных выражениях:</strong> Если вы используете регулярные выражения 
              (методы <code>search()</code>, <code>match()</code>), помните, что некоторые символы имеют специальное 
              значение и должны быть экранированы:
              <pre><code>// Неправильно для поиска строки "a.b"
  if (str.match("a.b")) { ... } // "." будет означать любой символ!
  
  // Правильно
  if (str.match(/a\.b/)) { ... } // Экранируем специальный символ</code></pre>
            </li>
            <li>
              <strong>Производительность:</strong> При работе с большими массивами строк или очень длинными строками, 
              производительность может стать проблемой. В таких случаях можно рассмотреть более эффективные алгоритмы 
              поиска подстрок, например, алгоритм Кнута-Морриса-Пратта или использовать индексирование.
            </li>
            <li>
              <strong>Пустые строки:</strong> Пустая строка содержится в любой строке, поэтому если <code>substring</code> 
              является пустой строкой, будут возвращены все строки из исходного массива.
            </li>
          </ul>
        </div>
        
        <div class="optimizations">
          <h3>Возможные оптимизации:</h3>
          <ul>
            <li>
              <strong>Раннее прерывание:</strong> Если вам нужно найти только первое совпадение, 
              вы можете использовать <code>find()</code> вместо <code>filter()</code>:
              <pre><code>const findFirstMatch = (substring, arr) => {
    return arr.find(str => str.includes(substring));
  };</code></pre>
            </li>
            <li>
              <strong>Распараллеливание:</strong> Для очень больших массивов можно использовать 
              Web Workers для распараллеливания поиска.
            </li>
            <li>
              <strong>Индексирование:</strong> Если нужно часто искать в одном и том же массиве строк, 
              можно создать инвертированный индекс для ускорения поиска.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed} from 'vue';
  
  // Данные для вкладок решения
  const tabs = [
    { title: 'Решение с циклом for' },
    { title: 'Решение с filter()' },
    { title: 'Альтернативные методы' }
  ];
  const currentTab = ref(0);
  
  // Данные для интерактивной демонстрации
  const searchSubstring = ref('am');
  const inputArray = ref('fuzzy\nmaskva\nmama\nsearch\nalgorithm\nutility');
  const isAnimating = ref(false);
  const currentIndex = ref(-1);
  const currentStep = ref(0);
  const checkedIndices = ref([]);
  const matchedIndices = ref([]);
  const showResult = ref(false);
  const resultArray = ref([]);
  
  // Преобразуем текст из textarea в массив строк
  const arrayItems = computed(() => {
    return inputArray.value.split('\n').filter(item => item.trim() !== '');
  });
  
  // Функция для запуска анимации алгоритма
  function startAnimation() {
    // Сбрасываем предыдущую анимацию
    isAnimating.value = true;
    currentIndex.value = -1;
    currentStep.value = 0;
    checkedIndices.value = [];
    matchedIndices.value = [];
    showResult.value = false;
    resultArray.value = [];
    
    // Создаем пустой массив для результатов
    setTimeout(() => {
      currentStep.value = 1;
      
      // Начинаем перебирать элементы массива
      setTimeout(() => {
        currentStep.value = 2;
        animateArraySearch(0);
      }, 1000);
    }, 1000);
  }
  
  // Функция для пошаговой анимации перебора массива
  function animateArraySearch(index) {
    if (index >= arrayItems.value.length) {
      // Если достигли конца массива, завершаем анимацию
      setTimeout(() => {
        currentIndex.value = -1;
        currentStep.value = 6;
        showResult.value = true;
        isAnimating.value = false;
      }, 1000);
      return;
    }
    
    // Устанавливаем текущий индекс
    currentIndex.value = index;
    
    // Проверяем, содержит ли строка подстроку
    setTimeout(() => {
      currentStep.value = 3;
      
      const currentItem = arrayItems.value[index];
      const hasSubstring = currentItem.includes(searchSubstring.value);
      
      // Добавляем индекс в список проверенных
      checkedIndices.value.push(index);
      
      // Если строка содержит подстроку, добавляем в результат
      setTimeout(() => {
        if (hasSubstring) {
          currentStep.value = 4;
          matchedIndices.value.push(index);
          resultArray.value.push(`"${currentItem}"`);
          
          // Задержка перед переходом к следующему шагу
          setTimeout(() => {
            currentStep.value = 5;
            
            // Переходим к следующему элементу
            setTimeout(() => {
              animateArraySearch(index + 1);
            }, 1000);
          }, 1000);
        } else {
          // Если не содержит, сразу переходим к следующему элементу
          currentStep.value = 5;
          
          setTimeout(() => {
            animateArraySearch(index + 1);
          }, 1000);
        }
      }, 1000);
    }, 1000);
  }
  </script>
  
  <style scoped>
  .substring-search-demo {
    font-family: Arial, sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    color: #000000;
  }
  
  h1, h2, h3 {
    color: #000000;
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
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 10px;
  }
  
  h3 {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  
  .task-description {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
  }
  
  .example-code {
    margin: 15px 0;
    background-color: #f5f5f5;
    border-radius: 5px;
    overflow: hidden;
  }
  
  pre {
    margin: 0;
    padding: 15px;
    overflow-x: auto;
  }
  
  code {
    font-family: 'Courier New', monospace;
    color: #000000;
    background-color: #f5f5f5;
  }
  
  .solution-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }
  
  .solution-tabs button {
    padding: 10px 15px;
    border: none;
    background-color: #f0f0f0;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s;
  }
  
  .solution-tabs button:hover {
    background-color: #e0e0e0;
  }
  
  .solution-tabs button.active {
    background-color: #4a90e2;
    color: white;
  }
  
  .solution-panel {
    animation: fadeIn 0.3s;
  }
  
  .code-block {
    background-color: #2d2d2d;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  
  .code-block pre {
    margin: 0;
    padding: 15px;
  }
  
  .code-block code {
    color: #ffffff;
    background-color: transparent;
    font-family: 'Courier New', monospace;
  }
  
  .explanation {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  .explanation ol, .explanation ul {
    padding-left: 20px;
    line-height: 1.6;
  }
  
  .explanation li {
    margin-bottom: 10px;
  }
  
  /* Стили для интерактивной демонстрации */
  .interactive-demo {
    margin-top: 40px;
  }
  
  .demo-inputs {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  .input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .input-group input, .input-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
  }
  
  button {
    background-color: #4a90e2;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s;
  }
  
  button:hover {
    background-color: #3a80d2;
  }
  
  button:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
  
  .visualization {
    margin-top: 30px;
  }
  
  .array-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 20px 0;
  }
  
  .array-item {
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 4px;
    width: calc(33.33% - 10px);
    box-sizing: border-box;
    transition: all 0.3s;
    position: relative;
  }
  
  .array-item-value {
    font-weight: bold;
    font-family: 'Courier New', monospace;
    margin-bottom: 5px;
  }
  
  .array-item-index {
    font-size: 12px;
    color: #666;
  }
  
  .array-item.active {
    background-color: #ffeaa7;
    transform: scale(1.05);
    z-index: 1;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .array-item.matched {
    background-color: #c6ffc6;
  }
  
  .array-item.not-matched {
    background-color: #ffd6d6;
  }
  
  .algorithm-steps {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    margin: 20px 0;
  }
  
  .step {
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 4px;
    transition: all 0.3s;
  }
  
  .step.current-step {
    background-color: #4a90e2;
    color: white;
    font-weight: bold;
  }
  
  .result-container {
    background-color: #f0f0f0;
    padding: 15px;
    border-radius: 8px;
    margin-top: 20px;
    animation: fadeIn 0.5s;
  }
  
  .result-code {
    background-color: #2d2d2d;
    border-radius: 5px;
    overflow: hidden;
  }
  
  .result-code pre {
    margin: 0;
    padding: 15px;
  }
  
  .result-code code {
    color: #ffffff;
    background-color: transparent;
  }
  
  /* Стили для раздела практического применения */
  .applications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .application-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    transition: all 0.3s;
  }
  
  .application-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  
  .application-card h3 {
    margin-top: 0;
    color: #4a90e2;
  }
  
  .example {
    margin-top: 15px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: A4px;
    font-size: 14px;
  }
  
  /* Стили для раздела подводных камней */
  .pitfalls, .optimizations {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .pitfalls h3, .optimizations h3 {
    margin-top: 0;
  }
  
  .pitfalls ul, .optimizations ul {
    padding-left: 20px;
    line-height: 1.6;
  }
  
  .pitfalls li, .optimizations li {
    margin-bottom: 15px;
  }
  
  /* Анимации */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .array-item {
      width: calc(50% - 10px);
    }
    
    .applications-grid {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 480px) {
    .array-item {
      width: 100%;
    }
    
    .solution-tabs {
      flex-direction: column;
      gap: 5px;
    }
  }
  </style>