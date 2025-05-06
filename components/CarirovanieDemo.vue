<template>
    <div class="currying-demo">
      <h1>Каррирование функций в JavaScript</h1>
      <p class="intro">
        Каррирование — это техника функционального программирования, которая преобразует функцию с несколькими аргументами в последовательность функций, каждая из которых принимает один аргумент.
      </p>
  
      <!-- Навигация по секциям -->
      <div class="section-tabs">
        <button 
          v-for="(section, index) in sections" 
          :key="section.id"
          :class="{ active: currentSection === index }"
          @click="currentSection = index"
        >
          {{ section.title }}
        </button>
      </div>
  
      <!-- Основная часть -->
      <div class="content-container">
        <!-- 1. Что такое каррирование? -->
        <div v-if="currentSection === 0" class="section">
          <h2>Что такое каррирование?</h2>
          
          <div class="explanation-box">
            <p>
              <strong>Каррирование</strong> (от англ. currying) — это трансформация функции с несколькими аргументами в цепочку функций с одним аргументом.
            </p>
            <p>
              Например, функцию <code>sum(a, b)</code> можно превратить в <code>sum(a)(b)</code>, где:
            </p>
            <ul>
              <li><code>sum(a)</code> возвращает новую функцию</li>
              <li>Возвращенная функция принимает аргумент <code>b</code> и возвращает сумму <code>a + b</code></li>
            </ul>
          </div>
          
          <div class="comparison">
            <div class="normal-function">
              <h3>Обычная функция</h3>
              <pre class="code">function sum(a, b) {
    return a + b;
  }
  
  sum(1, 2); // 3</pre>
            </div>
            <div class="arrow">→</div>
            <div class="curried-function">
              <h3>Каррированная функция</h3>
              <pre class="code">function sum(a) {
    return function(b) {
      return a + b;
    };
  }
  
  sum(1)(2); // 3</pre>
            </div>
          </div>
          
          <h3>Важная особенность каррирования</h3>
          <div class="key-concept">
            <p>Ключевая идея: <strong>функция возвращает функцию</strong> до тех пор, пока не получит все необходимые аргументы для вычисления результата.</p>
            <p>При этом первая функция <strong>запоминает</strong> переданные ей аргументы через замыкание.</p>
          </div>
          
          <div class="why-useful">
            <h3>Зачем это нужно?</h3>
            <ul>
              <li>Создание функций с частичным применением аргументов</li>
              <li>Повышение гибкости и переиспользуемости кода</li>
              <li>Упрощение композиции функций</li>
              <li>Более чистый и выразительный код</li>
            </ul>
          </div>
        </div>
        
        <!-- 2. Решение задачи -->
        <div v-if="currentSection === 1" class="section">
          <h2>Решение задачи</h2>
          
          <div class="task">
            <h3>Задача:</h3>
            <pre class="code">// Реализовать функцию sum, которая работает двумя способами:
  const sum = (val1, val2) => {};
  
  sum(1, 2);    // Должно вернуть 3
  sum(1)(2);    // Должно вернуть 3</pre>
          </div>
          
          <div class="solution-steps">
            <h3>Алгоритм решения:</h3>
            <ol>
              <li>Проверяем, передан ли второй аргумент <code>val2</code></li>
              <li>Если <code>val2</code> передан, возвращаем сумму <code>val1 + val2</code></li>
              <li>Если <code>val2</code> не передан, возвращаем новую функцию, которая принимает второй аргумент и возвращает сумму</li>
            </ol>
          </div>
          
          <div class="solution">
            <h3>Решение:</h3>
            <pre class="code">const sum = (val1, val2) => {
    // Если переданы оба аргумента
    if (val2 !== undefined) {
      return val1 + val2;
    }
    
    // Если передан только первый аргумент
    return function(val2) {
      return val1 + val2;
    };
  };</pre>
          </div>
          
          <div class="testing">
            <h3>Проверка решения:</h3>
            <pre class="code">console.log(sum(1, 2));    // 3
  console.log(sum(1)(2));    // 3
  console.log(sum(5, 7));    // 12
  console.log(sum(10)(20));  // 30</pre>
          </div>
          
          <div class="es6-solution">
            <h3>Более компактная запись (ES6):</h3>
            <pre class="code">const sum = (val1, val2) => 
    val2 !== undefined 
      ? val1 + val2 
      : val2 => val1 + val2;</pre>
          </div>
        </div>
        
        <!-- 3. Визуализация -->
        <div v-if="currentSection === 2" class="section">
          <h2>Визуализация</h2>
          
          <div class="visualization-controls">
            <button 
              :class="{ active: visualMode === 'normal' }"
              @click="switchVisualMode('normal')"
            >
              sum(1, 2)
            </button>
            <button 
              :class="{ active: visualMode === 'curried' }"
              @click="switchVisualMode('curried')"
            >
              sum(1)(2)
            </button>
          </div>
          
          <!-- Визуализация обычного вызова -->
          <div v-if="visualMode === 'normal'" class="visualization">
            <h3>Обычный вызов: sum(1, 2)</h3>
            
            <div class="visual-container">
              <div class="code-execution">
                <div class="function-call" :class="{ active: normalAnimStep >= 1 }">
                  <div class="line-comment">// Вызываем функцию с двумя аргументами</div>
                  <div class="line-code">sum(1, 2);</div>
                </div>
                
                <div class="function-execution" :class="{ active: normalAnimStep >= 2 }">
                  <div class="line-comment">// Внутри функции sum</div>
                  <div class="line-code">function sum(val1, val2) {</div>
                  <div class="function-state">
                    <div>val1 = 1</div>
                    <div>val2 = 2</div>
                  </div>
                  
                  <div class="line-condition" :class="{ highlight: normalAnimStep >= 3 }">
                    <div class="line-comment">// Проверяем, есть ли второй аргумент</div>
                    <div class="line-code">if (val2 !== undefined) {</div>
                    <div class="condition-result">true</div>
                  </div>
                  
                  <div class="line-return" :class="{ highlight: normalAnimStep >= 4 }">
                    <div class="line-comment">// Возвращаем сумму аргументов</div>
                    <div class="line-code">return val1 + val2;</div>
                    <div class="return-value">1 + 2 = 3</div>
                  </div>
                  
                  <div class="line-code">}</div>
                </div>
                
                <div class="result" :class="{ active: normalAnimStep >= 5 }">
                  <div class="line-comment">// Результат вызова</div>
                  <div class="line-code">sum(1, 2) = 3</div>
                </div>
              </div>
              
              <div class="explanation">
                <div class="step" :class="{ active: normalAnimStep >= 1 }">
                  <div class="step-number">1</div>
                  <div class="step-text">
                    <p>Вызываем функцию <code>sum</code> с двумя аргументами: <code>1</code> и <code>2</code>.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: normalAnimStep >= 2 }">
                  <div class="step-number">2</div>
                  <div class="step-text">
                    <p>Внутри функции создаются переменные <code>val1 = 1</code> и <code>val2 = 2</code>.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: normalAnimStep >= 3 }">
                  <div class="step-number">3</div>
                  <div class="step-text">
                    <p>Проверяем, определен ли второй аргумент: <code>val2 !== undefined</code>.</p>
                    <p>Поскольку <code>val2 = 2</code>, условие истинно.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: normalAnimStep >= 4 }">
                  <div class="step-number">4</div>
                  <div class="step-text">
                    <p>Выполняем возврат суммы: <code>return val1 + val2</code>.</p>
                    <p>Результат: <code>1 + 2 = 3</code>.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: normalAnimStep >= 5 }">
                  <div class="step-number">5</div>
                  <div class="step-text">
                    <p>Вызов <code>sum(1, 2)</code> завершается и возвращает значение <code>3</code>.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button class="animate-btn" @click="animateNormal">{{ normalAnimInProgress ? 'Остановить' : 'Запустить анимацию' }}</button>
          </div>
          
          <!-- Визуализация каррированного вызова -->
          <div v-if="visualMode === 'curried'" class="visualization">
            <h3>Каррированный вызов: sum(1)(2)</h3>
            
            <div class="visual-container">
              <div class="code-execution">
                <div class="function-call" :class="{ active: curriedAnimStep >= 1 }">
                  <div class="line-comment">// Вызываем функцию с одним аргументом</div>
                  <div class="line-code">sum(1);</div>
                </div>
                
                <div class="function-execution" :class="{ active: curriedAnimStep >= 2 }">
                  <div class="line-comment">// Внутри функции sum</div>
                  <div class="line-code">function sum(val1, val2) {</div>
                  <div class="function-state">
                    <div>val1 = 1</div>
                    <div>val2 = undefined</div>
                  </div>
                  
                  <div class="line-condition" :class="{ highlight: curriedAnimStep >= 3 }">
                    <div class="line-comment">// Проверяем, есть ли второй аргумент</div>
                    <div class="line-code">if (val2 !== undefined) {</div>
                    <div class="condition-result">false</div>
                  </div>
                  
                  <div class="line-return" :class="{ highlight: curriedAnimStep >= 4 }">
                    <div class="line-comment">// Второй аргумент не передан, возвращаем новую функцию</div>
                    <div class="line-code">return function(val2) {</div>
                    <div class="line-code">  return val1 + val2;</div>
                    <div class="line-code">};</div>
                  </div>
                </div>
                
                <div class="returned-function" :class="{ active: curriedAnimStep >= 5 }">
                  <div class="line-comment">// sum(1) возвращает функцию</div>
                  <div class="line-code">function(val2) { return 1 + val2; }</div>
                </div>
                
                <div class="second-call" :class="{ active: curriedAnimStep >= 6 }">
                  <div class="line-comment">// Вызываем возвращенную функцию</div>
                  <div class="line-code">sum(1)(2);</div>
                </div>
                
                <div class="inner-function-execution" :class="{ active: curriedAnimStep >= 7 }">
                  <div class="line-comment">// Внутри возвращенной функции</div>
                  <div class="line-code">function(val2) {</div>
                  <div class="function-state">
                    <div>val1 = 1 (из замыкания)</div>
                    <div>val2 = 2</div>
                  </div>
                  
                  <div class="line-return" :class="{ highlight: curriedAnimStep >= 8 }">
                    <div class="line-code">return val1 + val2;</div>
                    <div class="return-value">1 + 2 = 3</div>
                  </div>
                  
                  <div class="line-code">}</div>
                </div>
                
                <div class="result" :class="{ active: curriedAnimStep >= 9 }">
                  <div class="line-comment">// Результат вызова</div>
                  <div class="line-code">sum(1)(2) = 3</div>
                </div>
              </div>
              
              <div class="explanation">
                <div class="step" :class="{ active: curriedAnimStep >= 1 }">
                  <div class="step-number">1</div>
                  <div class="step-text">
                    <p>Вызываем функцию <code>sum</code> с одним аргументом: <code>1</code>.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: curriedAnimStep >= 2 }">
                  <div class="step-number">2</div>
                  <div class="step-text">
                    <p>Внутри функции создаются переменные <code>val1 = 1</code> и <code>val2 = undefined</code>.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: curriedAnimStep >= 3 }">
                  <div class="step-number">3</div>
                  <div class="step-text">
                    <p>Проверяем, определен ли второй аргумент: <code>val2 !== undefined</code>.</p>
                    <p>Поскольку <code>val2 = undefined</code>, условие ложно.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: curriedAnimStep >= 4 }">
                  <div class="step-number">4</div>
                  <div class="step-text">
                    <p>Возвращаем новую функцию, которая:</p>
                    <ul>
                      <li>Принимает параметр <code>val2</code></li>
                      <li>Использует <code>val1</code> из замыкания (сохраняется значение <code>1</code>)</li>
                      <li>Возвращает сумму <code>val1 + val2</code></li>
                    </ul>
                  </div>
                </div>
                
                <div class="step" :class="{ active: curriedAnimStep >= 5 }">
                  <div class="step-number">5</div>
                  <div class="step-text">
                    <p>Выражение <code>sum(1)</code> возвращает новую функцию.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: curriedAnimStep >= 6 }">
                  <div class="step-number">6</div>
                  <div class="step-text">
                    <p>Вызываем возвращенную функцию с аргументом <code>2</code>.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: curriedAnimStep >= 7 }">
                  <div class="step-number">7</div>
                  <div class="step-text">
                    <p>Внутри возвращенной функции:</p>
                    <ul>
                      <li><code>val1 = 1</code> (из замыкания)</li>
                      <li><code>val2 = 2</code> (переданный аргумент)</li>
                    </ul>
                  </div>
                </div>
                
                <div class="step" :class="{ active: curriedAnimStep >= 8 }">
                  <div class="step-number">8</div>
                  <div class="step-text">
                    <p>Возвращаем сумму аргументов: <code>return val1 + val2</code>.</p>
                    <p>Результат: <code>1 + 2 = 3</code>.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: curriedAnimStep >= 9 }">
                  <div class="step-number">9</div>
                  <div class="step-text">
                    <p>Вызов <code>sum(1)(2)</code> завершается и возвращает значение <code>3</code>.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button class="animate-btn" @click="animateCurried">{{ curriedAnimInProgress ? 'Остановить' : 'Запустить анимацию' }}</button>
          </div>
        </div>
        
        <!-- 4. Подводные камни -->
        <div v-if="currentSection === 3" class="section">
          <h2>Подводные камни и особенности</h2>
          
          <div class="pitfalls">
            <div class="pitfall">
              <h3>1. Порядок аргументов имеет значение</h3>
              <div class="pitfall-content">
                <p>В каррированных функциях порядок аргументов критически важен, так как они применяются последовательно.</p>
                <pre class="code">// Пример с умножением
  const multiply = (a, b) => 
    b !== undefined ? a * b : b => a * b;
  
  // Создаем функцию умножения на 2
  const double = multiply(2);
  console.log(double(5)); // 10
  
  // А что, если нам нужно было создать функцию, которая умножает на 5?
  // Тогда нам пришлось бы переписать функцию multiply,
  // чтобы первым параметром шел множитель!</pre>
              </div>
            </div>
            
            <div class="pitfall">
              <h3>2. Усложнение читаемости кода</h3>
              <div class="pitfall-content">
                <p>Излишнее использование каррирования может сделать код трудным для понимания, особенно для тех, кто не знаком с этой техникой.</p>
                <pre class="code">// Вложенные каррированные функции могут быть сложными для восприятия
  const calculate = a => b => c => d => a + b * c - d;
  
  // Вызов такой функции выглядит необычно
  const result = calculate(10)(5)(3)(2); // 10 + 5 * 3 - 2 = 23</pre>
              </div>
            </div>
            
            <div class="pitfall">
              <h3>3. Проблемы с типами аргументов</h3>
              <div class="pitfall-content">
                <p>Если функция ожидает разные типы аргументов, могут возникнуть проблемы при проверке на <code>undefined</code>.</p>
                <pre class="code">// Что если 0 — допустимое значение?
  const divide = (a, b) => 
    b !== undefined ? a / b : b => a / b;
  
  divide(10, 0); // Infinity (деление на 0)
  divide(10)(0); // Infinity (деление на 0)
  
  // Лучше явно проверять количество аргументов
  const betterDivide = (...args) => 
    args.length > 1 
      ? args[0] / args[1] 
      : b => args[0] / b;</pre>
              </div>
            </div>
            
            <div class="pitfall">
              <h3>4. Сложности при работе с переменным числом аргументов</h3>
              <div class="pitfall-content">
                <p>Каррирование становится сложным, когда функция принимает переменное число аргументов.</p>
                <pre class="code">// Как каррировать функцию с переменным числом аргументов?
  function sum(...args) {
    return args.reduce((total, num) => total + num, 0);
  }
  
  // Сложно реализовать сумму(1)(2)(3)...</pre>
              </div>
            </div>
            
            <div class="pitfall">
              <h3>5. Проблемы с this</h3>
              <div class="pitfall-content">
                <p>Каррированные функции могут терять контекст <code>this</code>, особенно если они используются как методы объекта.</p>
                <pre class="code">const obj = {
    value: 10,
    multiply: function(a, b) {
      return b !== undefined 
        ? a * b * this.value 
        : b => a * b * this.value;
    }
  };
  
  const multiplyBy5 = obj.multiply(5);
  console.log(multiplyBy5(2)); // NaN, потому что this.value = undefined</pre>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 5. Практическое применение -->
        <div v-if="currentSection === 4" class="section">
          <h2>Практическое применение</h2>
          
          <div class="real-world-examples">
            <div class="example">
              <h3>1. Частичное применение функций</h3>
              <div class="example-content">
                <p>Создание специализированных функций на основе более общих.</p>
                <pre class="code">// Функция для форматирования цены
  const formatPrice = (currency, decimalSeparator, value) => {
    // Форматирует число с заданной валютой и разделителем
    return currency + value.toFixed(2).replace('.', decimalSeparator);
  };
  
  // Создаем специализированные функции
  const formatRuble = formatPrice('₽', ',');
  const formatDollar = formatPrice('$', '.');
  const formatEuro = formatPrice('€', ',');
  
  // Использование
  console.log(formatRuble(1000.5));    // "₽1000,50"
  console.log(formatDollar(89.99));    // "$89.99"
  console.log(formatEuro(749.49));     // "€749,49"</pre>
              </div>
            </div>
            
            <div class="example">
              <h3>2. Обработка событий в UI</h3>
              <div class="example-content">
                <p>Создание обработчиков событий с предустановленными параметрами.</p>
                <pre class="code">// Обработчик события с параметрами
  const handleItemAction = (action, itemId) => (event) => {
    event.preventDefault();
    console.log(`Performing ${action} on item ${itemId}`);
    // Выполнение действия...
  };
  
  // Использование в HTML
  /*
  <button onclick="handleItemAction('edit', 123)()">Редактировать</button>
  <button onclick="handleItemAction('delete', 123)()">Удалить</button>
  <button onclick="handleItemAction('view', 123)()">Просмотреть</button>
  */
  
  // Или в React/Vue компонентах
  /*
  <button @click="handleItemAction('edit', item.id)">Редактировать</button>
  */</pre>
              </div>
            </div>
            
            <div class="example">
              <h3>3. Композиция функций</h3>
              <div class="example-content">
                <p>Создание цепочек функций для обработки данных.</p>
                <pre class="code">// Функции для обработки данных
  const filterByType = type => data => 
    data.filter(item => item.type === type);
  
  const sortByDate = order => data => 
    [...data].sort((a, b) => {
      return order === 'asc' 
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });
  
  const limitResults = limit => data => 
    data.slice(0, limit);
  
  // Композиция функций
  const getLatestArticles = data => {
    return limitResults(5)(
      sortByDate('desc')(
        filterByType('article')(data)
      )
    );
  };
  
  // Использование
  const latestArticles = getLatestArticles(allData);</pre>
              </div>
            </div>
            
            <div class="example">
              <h3>4. Функциональные библиотеки</h3>
              <div class="example-content">
                <p>Библиотеки функционального программирования, такие как Ramda и Lodash/FP, широко используют каррирование.</p>
                <pre class="code">// Пример с использованием Ramda
  import { filter, where, propEq, pipe } from 'ramda';
  
  // Все функции в Ramda каррированы
  const getAdultUsers = filter(where({
    age: age => age >= 18,
    status: propEq('status', 'active')
  }));
  
  const processUsers = pipe(
    getAdultUsers,
    // другие операции...
  );
  
  // Использование
  const result = processUsers(users);</pre>
              </div>
            </div>
            
            <div class="example">
              <h3>5. Мемоизация функций</h3>
              <div class="example-content">
                <p>Кэширование результатов функций для повышения производительности.</p>
                <pre class="code">// Функция мемоизации
  const memoize = fn => {
    const cache = {};
    
    return (...args) => {
      const key = JSON.stringify(args);
      
      if (!(key in cache)) {
        cache[key] = fn(...args);
      }
      
      return cache[key];
    };
  };
  
  // Каррированная функция с мемоизацией
  const calculateArea = memoize(width => 
    memoize(height => width * height)
  );
  
  // Первый вызов вычисляется
  console.log(calculateArea(10)(5)); // 50
  
  // Повторные вызовы берутся из кэша
  console.log(calculateArea(10)(5)); // 50 (из кэша)
  console.log(calculateArea(10)(6)); // 60 (ширина из кэша, высота вычисляется)</pre>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 6. Интерактивный пример -->
        <div v-if="currentSection === 5" class="section">
          <h2>Исследуйте сами</h2>
          
          <div class="interactive-example">
            <h3>Попробуйте различные варианты каррирования:</h3>
            
            <div class="playground">
              <div class="playground-code">
                <div class="editor-header">Функция:</div>
                <pre class="code-editor">{{ codeExample }}</pre>
                
                <div class="editor-actions">
                  <button @click="updateCode('simple')">Простой пример</button>
                  <button @click="updateCode('advanced')">Расширенный пример</button>
                  <button @click="updateCode('universal')">Универсальное каррирование</button>
                </div>
              </div>
              
              <div class="playground-tests">
                <div class="editor-header">Тесты:</div>
                <div class="test-examples">
                  <div v-for="(test, index) in testExamples" :key="index" class="test-case">
                    <div class="test-expression">{{ test.expression }}</div>
                    <div class="test-result">
                      <span>Результат: </span>
                      <span class="result-value">{{ test.result }}</span>
                    </div>
                  </div>
                </div>
                
                <button class="run-tests-btn" @click="runTests">Запустить тесты</button>
              </div>
            </div>
            
            <div class="advanced-example" v-if="codeExample === advancedExample">
              <h3>Объяснение расширенного примера:</h3>
              <p>Эта функция поддерживает три варианта вызова и работает с любыми арифметическими операциями.</p>
              <ol>
                <li><code>calc('+')(5)(3)</code> — с оператором в виде строки</li>
                <li><code>calc(5)('+')(3)</code> — со значением в первую очередь</li>
                <li><code>calc(5, '+', 3)</code> — все аргументы сразу</li>
              </ol>
            </div>
            
            <div class="universal-example" v-if="codeExample === universalExample">
              <h3>Объяснение универсального каррирования:</h3>
              <p>Функция <code>curry</code> преобразует обычную функцию любой арности в каррированную версию.</p>
              <p>Это позволяет вызывать функцию с любым количеством аргументов в любом порядке:</p>
              <ul>
                <li><code>sum(1, 2, 3)</code></li>
                <li><code>sum(1)(2, 3)</code></li>
                <li><code>sum(1, 2)(3)</code></li>
                <li><code>sum(1)(2)(3)</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Управление секциями
        sections: [
          { id: "intro", title: "Что такое каррирование?" },
          { id: "solution", title: "Решение задачи" },
          { id: "visualization", title: "Визуализация" },
          { id: "pitfalls", title: "Подводные камни" },
          { id: "applications", title: "Применение" },
          { id: "interactive", title: "Исследуйте сами" }
        ],
        currentSection: 0,
        
        // Визуализация
        visualMode: 'normal', // 'normal' или 'curried'
        normalAnimStep: 0,
        curriedAnimStep: 0,
        normalAnimInProgress: false,
        curriedAnimInProgress: false,
        normalAnimTimers: [],
        curriedAnimTimers: [],
        
        // Интерактивный пример
        simpleExample: `const sum = (val1, val2) => {
    // Если переданы оба аргумента
    if (val2 !== undefined) {
      return val1 + val2;
    }
    
    // Если передан только первый аргумент
    return function(val2) {
      return val1 + val2;
    };
  };`,
        advancedExample: `const calc = (a, operator, b) => {
    const operations = {
      '+': (x, y) => x + y,
      '-': (x, y) => x - y,
      '*': (x, y) => x * y,
      '/': (x, y) => x / y
    };
    
    // Если все аргументы переданы сразу
    if (operator !== undefined && b !== undefined) {
      return operations[operator](a, b);
    }
    
    // Если первый аргумент - оператор
    if (typeof a === 'string' && a in operations) {
      return x => y => operations[a](x, y);
    }
    
    // Если первый аргумент - число
    return op => {
      if (typeof op === 'string' && op in operations) {
        return y => operations[op](a, y);
      }
      return operations[operator](a, op);
    };
  };`,
        universalExample: `// Универсальное каррирование
  const curry = (fn) => {
    const arity = fn.length;
    
    return function curried(...args) {
      if (args.length >= arity) {
        return fn.apply(this, args);
      }
      
      return function(...moreArgs) {
        return curried.apply(this, [...args, ...moreArgs]);
      };
    };
  };
  
  // Пример использования
  const sum = curry((a, b, c) => a + b + c);`,
        codeExample: '',
        testExamples: [
          { expression: 'sum(1, 2)', result: '?' },
          { expression: 'sum(1)(2)', result: '?' },
          { expression: 'sum(5, 7)', result: '?' },
          { expression: 'sum(10)(20)', result: '?' }
        ],
        advancedTests: [
          { expression: "calc('+'')(5)(3)", result: '?' },
          { expression: "calc(5)('+'')(3)", result: '?' },
          { expression: "calc(5, '+', 3)", result: '?' },
          { expression: "calc('*')(4)(2)", result: '?' }
        ],
        universalTests: [
          { expression: 'sum(1, 2, 3)', result: '?' },
          { expression: 'sum(1)(2, 3)', result: '?' },
          { expression: 'sum(1, 2)(3)', result: '?' },
          { expression: 'sum(1)(2)(3)', result: '?' }
        ]
      };
    },
    
    created() {
      this.codeExample = this.simpleExample;
    },
    
    methods: {
      // Переключение режима визуализации
      switchVisualMode(mode) {
        this.stopAllAnimations();
        this.visualMode = mode;
        this.normalAnimStep = 0;
        this.curriedAnimStep = 0;
      },
      
      // Остановка всех анимаций
      stopAllAnimations() {
        this.normalAnimTimers.forEach(timer => clearTimeout(timer));
        this.curriedAnimTimers.forEach(timer => clearTimeout(timer));
        this.normalAnimTimers = [];
        this.curriedAnimTimers = [];
        this.normalAnimInProgress = false;
        this.curriedAnimInProgress = false;
      },
      
      // Анимация обычного вызова
      animateNormal() {
        if (this.normalAnimInProgress) {
          this.stopAllAnimations();
          return;
        }
        
        this.normalAnimInProgress = true;
        this.normalAnimStep = 0;
        
        for (let i = 1; i <= 5; i++) {
          const timer = setTimeout(() => {
            this.normalAnimStep = i;
            
            if (i === 5) {
              this.normalAnimInProgress = false;
            }
          }, i * 1000);
          
          this.normalAnimTimers.push(timer);
        }
      },
      
      // Анимация каррированного вызова
      animateCurried() {
        if (this.curriedAnimInProgress) {
          this.stopAllAnimations();
          return;
        }
        
        this.curriedAnimInProgress = true;
        this.curriedAnimStep = 0;
        
        for (let i = 1; i <= 9; i++) {
          const timer = setTimeout(() => {
            this.curriedAnimStep = i;
            
            if (i === 9) {
              this.curriedAnimInProgress = false;
            }
          }, i * 1000);
          
          this.curriedAnimTimers.push(timer);
        }
      },
      
      // Изменение примера кода
      updateCode(type) {
        if (type === 'simple') {
          this.codeExample = this.simpleExample;
          this.testExamples = [
            { expression: 'sum(1, 2)', result: '?' },
            { expression: 'sum(1)(2)', result: '?' },
            { expression: 'sum(5, 7)', result: '?' },
            { expression: 'sum(10)(20)', result: '?' }
          ];
        } else if (type === 'advanced') {
          this.codeExample = this.advancedExample;
          this.testExamples = this.advancedTests;
        } else if (type === 'universal') {
          this.codeExample = this.universalExample;
          this.testExamples = this.universalTests;
        }
      },
      
      // Запуск тестов
      runTests() {
        try {
          // Определение типа примера
          const isSimple = this.codeExample === this.simpleExample;
          const isAdvanced = this.codeExample === this.advancedExample;
          const isUniversal = this.codeExample === this.universalExample;
          
          if (isSimple) {
            // Выполнение кода для простого примера
            const sum = (val1, val2) => {
              if (val2 !== undefined) {
                return val1 + val2;
              }
              return function(val2) {
                return val1 + val2;
              };
            };
            
            this.testExamples[0].result = sum(1, 2);
            this.testExamples[1].result = sum(1)(2);
            this.testExamples[2].result = sum(5, 7);
            this.testExamples[3].result = sum(10)(20);
          } else if (isAdvanced) {
            // Выполнение кода для расширенного примера
            const calc = (a, operator, b) => {
              const operations = {
                '+': (x, y) => x + y,
                '-': (x, y) => x - y,
                '*': (x, y) => x * y,
                '/': (x, y) => x / y
              };
              
              if (operator !== undefined && b !== undefined) {
                return operations[operator](a, b);
              }
              
              if (typeof a === 'string' && a in operations) {
                return x => y => operations[a](x, y);
              }
              
              return op => {
                if (typeof op === 'string' && op in operations) {
                  return y => operations[op](a, y);
                }
                return operations[operator](a, op);
              };
            };
            
            this.testExamples[0].result = calc('+')(5)(3);
            this.testExamples[1].result = calc(5)('+')(3);
            this.testExamples[2].result = calc(5, '+', 3);
            this.testExamples[3].result = calc('*')(4)(2);
          } else if (isUniversal) {
            // Выполнение кода для универсального примера
            const curry = (fn) => {
              const arity = fn.length;
              
              return function curried(...args) {
                if (args.length >= arity) {
                  return fn.apply(this, args);
                }
                
                return function(...moreArgs) {
                  return curried.apply(this, [...args, ...moreArgs]);
                };
              };
            };
            
            const sum = curry((a, b, c) => a + b + c);
            
            this.testExamples[0].result = sum(1, 2, 3);
            this.testExamples[1].result = sum(1)(2, 3);
            this.testExamples[2].result = sum(1, 2)(3);
            this.testExamples[3].result = sum(1)(2)(3);
          }
        } catch (error) {
          console.error("Ошибка при выполнении тестов:", error);
          this.testExamples.forEach(test => {
            test.result = "Ошибка!";
          });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .currying-demo {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    color: #000;
    background-color: #fff;
    line-height: 1.6;
  }
  
  h1, h2, h3, h4 {
    color: #000;
    margin-top: 1.5em;
    margin-bottom: 0.8em;
  }
  
  h1 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 20px;
  }
  
  h2 {
    font-size: 1.6rem;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
  }
  
  h3 {
    font-size: 1.3rem;
    color: #2c3e50;
  }
  
  p {
    margin: 0.8em 0;
  }
  
  .intro {
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 1.5em 0;
    text-align: center;
    color: #555;
  }
  
  /* Стили для кода */
  .code {
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
    margin: 15px 0;
    line-height: 1.4;
    white-space: pre;
  }
  
  /* Вкладки секций */
  .section-tabs {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin: 30px 0;
  }
  
  .section-tabs button {
    padding: 10px 15px;
    background-color: #f5f5f5;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .section-tabs button:hover {
    background-color: #e0e0e0;
  }
  
  .section-tabs button.active {
    background-color: #3498db;
    color: white;
  }
  
  .content-container {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  /* Секция "Что такое каррирование?" */
  .explanation-box {
    background-color: #f9f9f9;
    border-left: 4px solid #3498db;
    padding: 15px;
    margin: 20px 0;
    border-radius: 0 5px 5px 0;
  }
  
  .comparison {
    display: flex;
    align-items: center;
    margin: 25px 0;
    gap: 20px;
  }
  
  .normal-function, .curried-function {
    flex: 1;
    background-color: #f5f5f5;
    border-radius: 5px;
    padding: 15px;
  }
  
  .arrow {
    font-size: 2rem;
    color: #7f8c8d;
  }
  
  .key-concept {
    background-color: #eaf7ff;
    border-radius: 5px;
    padding: 15px;
    margin: 20px 0;
  }
  
  .why-useful {
    background-color: #f5f5f5;
    border-radius: 5px;
    padding: 15px;
    margin: 20px 0;
  }
  
  .why-useful ul {
    margin: 10px 0;
    padding-left: 20px;
  }
  
  /* Секция "Решение задачи" */
  .task {
    background-color: #f5f5f5;
    border-radius: 5px;
    padding: 15px;
    margin: 20px 0;
  }
  
  .solution-steps {
    margin: 20px 0;
  }
  
  .solution-steps ol {
    padding-left: 20px;
  }
  
  .solution {
    margin: 20px 0;
  }
  
  .testing {
    margin: 20px 0;
  }
  
  .es6-solution {
    background-color: #f0f4c3;
    border-radius: 5px;
    padding: 15px;
    margin: 20px 0;
  }
  
  /* Секция "Визуализация" */
  .visualization-controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 20px 0;
  }
  
  .visualization-controls button {
    padding: 10px 20px;
    background-color: #f5f5f5;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .visualization-controls button:hover {
    background-color: #e0e0e0;
  }
  
  .visualization-controls button.active {
    background-color: #3498db;
    color: white;
  }
  
  .visualization {
    margin: 20px 0;
  }
  
  .visual-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 20px 0;
  }
  
  .code-execution {
    background-color: #f5f5f5;
    border-radius: 5px;
    padding: 15px;
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  }
  
  .function-call, 
  .function-execution, 
  .returned-function, 
  .second-call,
  .inner-function-execution,
  .result {
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    opacity: 0.5;
    transition: all 0.5s;
  }
  
  .function-call.active, 
  .function-execution.active, 
  .returned-function.active, 
  .second-call.active,
  .inner-function-execution.active,
  .result.active {
    opacity: 1;
    background-color: #eaf7ff;
  }
  
  .line-comment {
    color: #7f8c8d;
    margin-bottom: 5px;
  }
  
  .line-code {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .function-state {
    margin: 10px 0;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
  }
  
  .line-condition, .line-return {
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0;
    transition: all 0.5s;
  }
  
  .line-condition.highlight, .line-return.highlight {
    background-color: #d5f5e3;
  }
  
  .condition-result, .return-value {
    color: #e74c3c;
    margin-top: 5px;
    font-weight: bold;
  }
  
  .explanation {
    padding: 15px;
  }
  
  .step {
    display: flex;
    margin-bottom: 15px;
    opacity: 0.5;
    transition: all 0.5s;
  }
  
  .step.active {
    opacity: 1;
  }
  
  .step-number {
    width: 30px;
    height: 30px;
    background-color: #3498db;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: 15px;
    flex-shrink: 0;
  }
  
  .step-text {
    flex: 1;
  }
  
  .step-text p {
    margin: 0 0 10px 0;
  }
  
  .step-text ul {
    margin: 10px 0;
    padding-left: 20px;
  }
  
  .animate-btn {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .animate-btn:hover {
    background-color: #2980b9;
  }
  
  /* Секция "Подводные камни" */
  .pitfalls {
    margin: 20px 0;
  }
  
  .pitfall {
    margin-bottom: 25px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .pitfall h3 {
    background-color: #f5f5f5;
    margin: 0;
    padding: 15px;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .pitfall-content {
    padding: 15px;
  }
  
  /* Секция "Практическое применение" */
  .real-world-examples {
    margin: 20px 0;
  }
  
  .example {
    margin-bottom: 25px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .example h3 {
    background-color: #f5f5f5;
    margin: 0;
    padding: 15px;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .example-content {
    padding: 15px;
  }
  
  /* Секция "Исследуйте сами" */
  .interactive-example {
    margin: 20px 0;
  }
  
  .playground {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 20px 0;
  }
  
  .playground-code, .playground-tests {
    background-color: #f9f9f9;
    border-radius: 5px;
    padding: 15px;
  }
  
  .editor-header {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .code-editor {
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
    margin-bottom: 15px;
    height: 300px;
    overflow-y: auto;
    white-space: pre;
  }
  
  .editor-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .editor-actions button {
    padding: 8px 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .editor-actions button:hover {
    background-color: #2980b9;
  }
  
  .test-examples {
    margin-bottom: 15px;
  }
  
  .test-case {
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .test-expression {
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .test-result {
    color: #7f8c8d;
  }
  
  .result-value {
    color: #e74c3c;
    font-weight: bold;
  }
  
  .run-tests-btn {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #2ecc71;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .run-tests-btn:hover {
    background-color: #27ae60;
  }
  
  .advanced-example, .universal-example {
    background-color: #f5f5f5;
    border-radius: 5px;
    padding: 15px;
    margin-top: 20px;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .comparison, .visual-container, .playground {
      grid-template-columns: 1fr;
    }
    
    .arrow {
      text-align: center;
      margin: 10px 0;
    }
  }
  </style>