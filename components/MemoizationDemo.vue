<template>
    <div class="memoization-demo">
      <h1>Мемоизация в JavaScript</h1>
      <div class="intro-section">
        <h2>Что такое мемоизация?</h2>
        <p>
          <strong>Мемоизация</strong> — это техника оптимизации, которая сохраняет результаты 
          функциональных вызовов и возвращает кэшированный результат при повторных вызовах 
          с теми же входными данными, избегая повторных вычислений.
        </p>
      </div>
  
      <div class="tabs">
        <div 
          v-for="(tab, index) in tabs" 
          :key="tab.id"
          :class="['tab', { active: activeTab === index }]"
          @click="activeTab = index"
        >
          {{ tab.title }}
        </div>
      </div>
  
      <!-- Вкладка "Реализация" -->
      <div v-if="activeTab === 0" class="tab-content implementation">
        <h2>Реализация функции <code>memo</code></h2>
        
        <div class="code-section">
          <pre class="code-block">
  const memo = (fn) => {
    const cache = {};
    
    return function(...args) {
      const key = JSON.stringify(args);
      
      if (key in cache) {
        console.log('Получение из кэша');
        return cache[key];
      }
      
      console.log('Вычисление результата');
      const result = fn(...args);
      cache[key] = result;
      return result;
    };
  };</pre>
        </div>
        
        <div class="explanation">
          <h3>Как это работает:</h3>
          <ol>
            <li>
              <span class="step">Создаём замыкание</span> - при вызове <code>memo</code> создаётся объект <code>cache</code>, 
              который сохраняется в замыкании, доступном только для возвращаемой функции.
            </li>
            <li>
              <span class="step">Преобразуем аргументы</span> - при вызове мемоизированной функции аргументы 
              преобразуются в строку с помощью <code>JSON.stringify</code>, чтобы использовать как ключ в кэше.
            </li>
            <li>
              <span class="step">Проверяем кэш</span> - если значение для таких аргументов уже вычислялось, 
              сразу возвращаем его из кэша без повторных вычислений.
            </li>
            <li>
              <span class="step">Вычисляем и сохраняем</span> - иначе вызываем исходную функцию, сохраняем 
              результат в кэш для последующего использования и возвращаем его.
            </li>
          </ol>
        </div>
        
        <div class="code-examples">
          <h3>Пример использования:</h3>
          <pre class="code-block">
  const count = (a, b) => {
    // Представим, что это сложное вычисление
    return a + b;
  };
  
  const memoCount = memo(count);
  
  console.log(memoCount(1, 2)); // 3 (вызов count)
  console.log(memoCount(3, 1)); // 4 (вызов count)
  console.log(memoCount(1, 2)); // 3 (обращение к cache)</pre>
        </div>
      </div>
  
      <!-- Вкладка "Визуализация" -->
      <div v-if="activeTab === 1" class="tab-content visualization">
        <h2>Визуализация работы</h2>
        
        <div class="visualization-container">
          <div class="input-section">
            <div class="input-form">
              <div class="form-field">
                <label for="param1">Первый параметр:</label>
                <input v-model.number="param1" type="number" id="param1" />
              </div>
              <div class="form-field">
                <label for="param2">Второй параметр:</label>
                <input v-model.number="param2" type="number" id="param2" />
              </div>
              <button @click="executeFunction" :disabled="isAnimating">Выполнить функцию</button>
            </div>
          </div>
          
          <div class="animation-container">
            <div class="function-representation">
              <div class="function-name">
                memoCount({{ param1 }}, {{ param2 }})
              </div>
              
              <div class="function-process" :class="{ active: isAnimating }">
                <div class="cache-check" :class="{ active: animationStep >= 1 }">
                  <div class="step-label">Шаг 1: Проверка кэша</div>
                  <div class="cache-key">key = JSON.stringify([{{ param1 }}, {{ param2 }}])</div>
                  <div v-if="animationStep >= 2" class="cache-result" :class="{ 'found': isCached, 'not-found': !isCached }">
                    {{ isCached ? 'Найдено в кэше!' : 'Не найдено в кэше' }}
                  </div>
                </div>
                
                <div v-if="animationStep >= 3 && !isCached" class="calculation">
                  <div class="step-label">Шаг 2: Вычисление</div>
                  <div class="calculation-process">
                    {{ param1 }} + {{ param2 }} = {{ result }}
                  </div>
                </div>
                
                <div v-if="animationStep >= 4 && !isCached" class="cache-save">
                  <div class="step-label">Шаг 3: Сохранение в кэш</div>
                  <div class="cache-entry">
                    cache['[{{ param1 }},{{ param2 }}]'] = {{ result }}
                  </div>
                </div>
                
                <div v-if="(animationStep >= 3 && isCached) || animationStep >= 5" class="function-result">
                  <div class="step-label">{{ isCached ? 'Шаг 2: Возврат из кэша' : 'Шаг 4: Возврат результата' }}</div>
                  <div class="result-value">Результат: {{ result }}</div>
                </div>
              </div>
            </div>
            
            <div class="cache-visualization">
              <div class="cache-title">Текущее состояние кэша:</div>
              <div class="cache-content">
                <div v-if="Object.keys(visualCache).length === 0" class="empty-cache">
                  Кэш пуст
                </div>
                <div v-else class="cache-entries">
                  <div 
                    v-for="(value, key) in visualCache" 
                    :key="key" 
                    class="cache-entry-item"
                    :class="{ 'highlight': lastAccessedKey === key }"
                  >
                    <div class="cache-key-visual">{{ key }}</div>
                    <div class="cache-arrow">→</div>
                    <div class="cache-value">{{ value }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Вкладка "Продвинутые техники" -->
      <div v-if="activeTab === 2" class="tab-content advanced">
        <h2>Продвинутые техники и подводные камни</h2>
        
        <div class="advanced-section">
          <h3>Улучшенная реализация</h3>
          <pre class="code-block">
  const memo = (fn, options = {}) => {
    const {
      maxSize = Infinity,
      hashFunction = JSON.stringify,
      ttl = null // time-to-live в миллисекундах
    } = options;
    
    const cache = new Map();
    const keys = []; // для отслеживания порядка использования (LRU)
    const timestamps = ttl ? new Map() : null; // для TTL
    
    return function(...args) {
      const key = hashFunction(args);
      
      // Проверка TTL
      if (ttl && timestamps.has(key)) {
        const timestamp = timestamps.get(key);
        if (Date.now() - timestamp > ttl) {
          // Запись устарела
          cache.delete(key);
          timestamps.delete(key);
          const index = keys.indexOf(key);
          if (index > -1) keys.splice(index, 1);
        }
      }
      
      if (cache.has(key)) {
        // Обновляем "свежесть" ключа (LRU)
        if (maxSize &lt; Infinity) {
          const keyIndex = keys.indexOf(key);
          keys.splice(keyIndex, 1);
          keys.push(key);
        }
        
        // Обновляем временную метку, если используется TTL
        if (ttl) timestamps.set(key, Date.now());
        
        return cache.get(key);
      }
      
      // Вычисляем результат
      const result = fn.apply(this, args);
      
      // Если достигли максимального размера, удаляем старые элементы
      if (maxSize &lt; Infinity && cache.size >= maxSize) {
        const oldestKey = keys.shift();
        cache.delete(oldestKey);
        if (ttl) timestamps.delete(oldestKey);
      }
      
      // Сохраняем результат
      cache.set(key, result);
      keys.push(key);
      if (ttl) timestamps.set(key, Date.now());
      
      return result;
    };
  };</pre>
        </div>
        
        <div class="pitfalls">
          <h3>Подводные камни мемоизации</h3>
          <div class="pitfalls-grid">
            <div class="pitfall-card">
              <h4>1. Проблемы с сериализацией</h4>
              <p>
                <code>JSON.stringify</code> не может сериализовать функции, циклические структуры, и 
                не сохраняет порядок ключей в объектах.
              </p>
              <pre class="code-block">
  // Проблема
  memo((func) => func()) // Ошибка при JSON.stringify(func)
  
  // Решение: кастомная функция хеширования
  memo(fn, { 
    hashFunction: args => args[0].id // для объектов
  })</pre>
            </div>
            
            <div class="pitfall-card">
              <h4>2. Рост кэша</h4>
              <p>
                Без ограничений кэш будет расти бесконечно, что может привести к утечкам памяти.
              </p>
              <pre class="code-block">
  // Ограничение кэша (LRU стратегия)
  memo(fn, { maxSize: 100 }) // хранит макс. 100 результатов</pre>
            </div>
            
            <div class="pitfall-card">
              <h4>3. Потеря контекста <code>this</code></h4>
              <p>
                Если функция использует <code>this</code>, нужно сохранить контекст при вызове.
              </p>
              <pre class="code-block">
  // Проблема в базовой реализации
  obj.method = memo(obj.method); // this будет потерян
  
  // Решение - использовать bind или apply/call
  const result = fn.apply(this, args);</pre>
            </div>
            
            <div class="pitfall-card">
              <h4>4. Устаревание данных</h4>
              <p>
                Кэшированные данные могут устареть, если источник данных изменился.
              </p>
              <pre class="code-block">
  // Решение: Time-to-Live (TTL)
  memo(fetchUserData, { ttl: 60000 }) // 1 минута</pre>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Вкладка "Примеры применения" -->
      <div v-if="activeTab === 3" class="tab-content use-cases">
        <h2>Примеры применения</h2>
        
        <div class="fibonacci-example">
          <h3>1. Рекурсивная функция Фибоначчи</h3>
          <div class="example-description">
            <p>
              Классический пример - это вычисление чисел Фибоначчи. Без мемоизации сложность экспоненциальная, 
              с мемоизацией - линейная.
            </p>
          </div>
          
          <div class="code-measurement">
            <div class="code-part">
              <h4>Без мемоизации (медленно)</h4>
              <pre class="code-block">
  function fib(n) {
    if (n &lt;= 1) return n;
    return fib(n - 1) + fib(n - 2);
  }
  
  console.time('Без мемоизации');
  fib(40); // займет много времени!
  console.timeEnd('Без мемоизации');</pre>
            </div>
            
            <div class="code-part">
              <h4>С мемоизацией (быстро)</h4>
              <pre class="code-block">
  const memoFib = memo((n) => {
    if (n &lt;= 1) return n;
    return memoFib(n - 1) + memoFib(n - 2);
  });
  
  console.time('С мемоизацией');
  memoFib(40); // очень быстро!
  console.timeEnd('С мемоизацией');</pre>
            </div>
          </div>
          
          <div class="fibonacci-demo">
            <div class="demo-controls">
              <div class="form-field">
                <label for="fibN">Число Фибоначчи (n):</label>
                <input v-model.number="fibN" type="number" id="fibN" min="1" max="45" />
              </div>
              <div class="buttons-row">
                <button @click="calculateFibRegular" :disabled="calculating">Без мемоизации</button>
                <button @click="calculateFibMemo" :disabled="calculating">С мемоизацией</button>
              </div>
            </div>
            
            <div class="demo-result">
              <div v-if="calculating" class="calculating">
                Вычисление...
              </div>
              <div v-else class="result-display">
                <div v-if="fibResult !== null" class="fib-result">
                  <div class="result-label">Результат:</div>
                  <div class="result-value">{{ fibResult }}</div>
                </div>
                <div v-if="fibTime !== null" class="time-result">
                  <div class="result-label">Время выполнения:</div>
                  <div class="result-value">{{ fibTime }} мс</div>
                </div>
                <div v-if="fibCalls !== null" class="calls-count">
                  <div class="result-label">Количество вызовов:</div>
                  <div class="result-value">{{ fibCalls }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="practical-examples">
          <h3>2. Другие практические примеры</h3>
          
          <div class="examples-grid">
            <div class="example-card">
              <h4>Кэширование API-запросов</h4>
              <p>
                Мемоизация HTTP-запросов с одинаковыми параметрами для уменьшения нагрузки на сервер.
              </p>
              <pre class="code-block">
  const fetchUserData = memo(async (userId) => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }, { ttl: 60000 }); // кэш на 1 минуту
  
  // Повторные вызовы с тем же userId не вызовут запрос
  fetchUserData(123);
  fetchUserData(123); // из кэша</pre>
            </div>
            
            <div class="example-card">
              <h4>Кэширование вычислений в UI</h4>
              <p>
                В React/Vue можно мемоизировать тяжелые вычисления для улучшения производительности.
              </p>
              <pre class="code-block">
  // Vue.js пример
  const getFilteredItems = memo((items, filter) => {
    return items.filter(item => 
      item.name.includes(filter)
    );
  });
  
  // В компоненте
  computed: {
    filteredItems() {
      return getFilteredItems(this.items, this.filter);
    }
  }</pre>
            </div>
            
            <div class="example-card">
              <h4>Обработка изображений</h4>
              <p>
                Мемоизация функций обработки изображений для избежания повторных вычислений.
              </p>
              <pre class="code-block">
  const resizeImage = memo((image, width, height) => {
    // Тяжелое вычисление по изменению размера
    return processedImage;
  }, {
    // Хеширование по имени файла и размерам
    hashFunction: args => 
      `${args[0].name}_${args[1]}_${args[2]}`
  });</pre>
            </div>
            
            <div class="example-card">
              <h4>Парсинг и валидация данных</h4>
              <p>
                Кэширование результатов парсинга однотипных данных для экономии ресурсов.
              </p>
              <pre class="code-block">
  const parseCSV = memo((csvData, options) => {
    // Ресурсоемкий парсинг CSV
    return parsedData;
  }, {
    // Максимальный размер кэша
    maxSize: 50
  });</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MemoizationDemo',
    data() {
      return {
        // Для навигации по вкладкам
        tabs: [
          { id: 'implementation', title: 'Реализация' },
          { id: 'visualization', title: 'Визуализация' },
          { id: 'advanced', title: 'Продвинутые техники' },
          { id: 'use-cases', title: 'Примеры применения' }
        ],
        activeTab: 0,
        
        // Для визуализации
        param1: 1,
        param2: 2,
        isAnimating: false,
        animationStep: 0,
        visualCache: {},
        result: null,
        isCached: false,
        lastAccessedKey: null,
        
        // Для примера с Фибоначчи
        fibN: 30,
        fibResult: null,
        fibTime: null,
        fibCalls: null,
        calculating: false,
        
        // Мемоизированная функция для демонстрации
        memoCount: null
      };
    },
    created() {
      // Создаем мемоизированную функцию
      this.memoCount = this.memo((a, b) => a + b);
    },
    methods: {
      // Реализация мемоизации
      memo(fn) {
        const cache = {};
        
        return (...args) => {
          const key = JSON.stringify(args);
          
          if (key in cache) {
            return cache[key];
          }
          
          const result = fn(...args);
          cache[key] = result;
          return result;
        };
      },
      
      // Анимированная визуализация процесса
      async executeFunction() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.animationStep = 0;
        
        const key = JSON.stringify([this.param1, this.param2]);
        this.lastAccessedKey = key;
        
        // Шаг 1: Проверка кэша
        this.animationStep = 1;
        await this.delay(700);
        
        // Шаг 2: Результат проверки кэша
        this.isCached = key in this.visualCache;
        this.animationStep = 2;
        await this.delay(700);
        
        if (this.isCached) {
          // Шаг 3: Возврат из кэша (если найдено)
          this.result = this.visualCache[key];
          this.animationStep = 3;
          await this.delay(700);
        } else {
          // Шаг 3: Вычисление (если не найдено)
          this.animationStep = 3;
          await this.delay(700);
          
          this.result = this.param1 + this.param2;
          
          // Шаг 4: Сохранение в кэш
          this.animationStep = 4;
        //   this.$set(this.visualCache, key, this.result);
          await this.delay(700);
          
          // Шаг 5: Возврат результата
          this.animationStep = 5;
          await this.delay(700);
        }
        
        this.isAnimating = false;
      },
      
      // Вспомогательная функция для задержки
      delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
      
      // Функции для демонстрации Фибоначчи
      async calculateFibRegular() {
        this.calculating = true;
        this.fibResult = null;
        this.fibTime = null;
        this.fibCalls = 0;
        
        // Делаем небольшую задержку для обновления UI
        await this.delay(100);
        
        const start = performance.now();
        
        // Обычная функция Фибоначчи без мемоизации
        const fib = (n) => {
          this.fibCalls++;
          if (n <= 1) return n;
          return fib(n - 1) + fib(n - 2);
        };
        
        this.fibResult = fib(this.fibN);
        this.fibTime = (performance.now() - start).toFixed(2);
        
        this.calculating = false;
      },
      
      async calculateFibMemo() {
        this.calculating = true;
        this.fibResult = null;
        this.fibTime = null;
        this.fibCalls = 0;
        
        // Делаем небольшую задержку для обновления UI
        await this.delay(100);
        
        const start = performance.now();
        
        // Функция с подсчетом вызовов
        const fibCounter = (n) => {
          this.fibCalls++;
          if (n <= 1) return n;
          return memoFib(n - 1) + memoFib(n - 2);
        };
        
        // Мемоизированная функция
        const memoFib = this.memo(fibCounter);
        
        this.fibResult = memoFib(this.fibN);
        this.fibTime = (performance.now() - start).toFixed(2);
        
        this.calculating = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .memoization-demo {
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
  }
  
  h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 30px;
  }
  
  h2 {
    color: #3498db;
    border-bottom: 2px solid #3498db;
    padding-bottom: 8px;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  
  h3 {
    color: #2c3e50;
    margin-top: 25px;
  }
  
  h4 {
    color: #3498db;
  }
  
  p {
    line-height: 1.6;
  }
  
  .intro-section {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* Вкладки */
  .tabs {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    overflow-x: auto;
  }
  
  .tab {
    padding: 12px 24px;
    cursor: pointer;
    margin-right: 5px;
    border-radius: 5px 5px 0 0;
    background-color: #f8f9fa;
    transition: all 0.3s ease;
  }
  
  .tab:hover {
    background-color: #e9ecef;
  }
  
  .tab.active {
    background-color: #3498db;
    color: white;
    font-weight: bold;
  }
  
  .tab-content {
    background-color: white;
    border-radius: 0 5px 5px 5px;
    padding: 20px;
    border: 1px solid #ddd;
    border-top: none;
    animation: fadeIn 0.5s;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Коды и примеры */
  .code-block {
    background-color: #282c34;
    padding: 15px;
    color: #abb2bf;
    border-radius: 8px;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    line-height: 1.5;
    margin: 15px 0;
  }
  
  .code-section, .explanation, .code-examples {
    margin-bottom: 30px;
  }
  
  .step {
    display: inline-block;
    padding: 2px 6px;
    background-color: #3498db;
    color: white;
    border-radius: 4px;
    margin-right: 5px;
  }
  
  code {
    background-color: #f8f9fa;
    padding: 2px 5px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    color: #e74c3c;
  }
  
  /* Визуализация */
  .visualization-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .input-section {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
  }
  
  .input-form {
    display: flex;
    align-items: flex-end;
    gap: 15px;
    flex-wrap: wrap;
  }
  
  .form-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .form-field label {
    font-weight: bold;
    font-size: 14px;
    color: #495057;
  }
  
  .form-field input {
    padding: 8px 12px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 16px;
    width: 100px;
  }
  
  button {
    padding: 8px 16px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  
  button:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
  
  .animation-container {
    display: flex;
    gap: 30px;
    margin-top: 20px;
  }
  
  .function-representation {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: #f8f9fa;
  }
  
  .function-name {
    font-weight: bold;
    padding: 10px;
    background-color: #3498db;
    color: white;
    border-radius: 4px 4px 0 0;
    text-align: center;
  }
  
  .function-process {
    padding: 20px;
    border: 1px solid #ddd;
    border-top: none;
    border-radius: 0 0 4px 4px;
    background-color: white;
    min-height: 300px;
  }
  
  .function-process.active {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(52, 152, 219, 0); }
    100% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0); }
  }
  
  .cache-check, .calculation, .cache-save, .function-result {
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 6px;
    background-color: #f8f9fa;
    transition: all 0.5s ease;
    opacity: 0.7;
  }
  
  .cache-check.active, .calculation.active, .cache-save.active, .function-result.active {
    opacity: 1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .step-label {
    font-weight: bold;
    margin-bottom: 10px;
    color: #3498db;
  }
  
  .cache-key, .calculation-process, .cache-entry, .result-value {
    font-family: 'Courier New', monospace;
    padding: 8px;
    background-color: #e9ecef;
    border-radius: 4px;
  }
  
  .cache-result {
    margin-top: 10px;
    padding: 8px;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
  }
  
  .cache-result.found {
    background-color: #d4edda;
    color: #155724;
  }
  
  .cache-result.not-found {
    background-color: #f8d7da;
    color: #721c24;
  }
  
  .cache-visualization {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: #f8f9fa;
  }
  
  .cache-title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .cache-content {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    min-height: 300px;
  }
  
  .empty-cache {
    color: #6c757d;
    font-style: italic;
    text-align: center;
    padding: 20px;
  }
  
  .cache-entry-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 4px;
    background-color: #f8f9fa;
    transition: all 0.3s ease;
  }
  
  .cache-entry-item.highlight {
    background-color: #fffacd;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .cache-key-visual {
    flex: 1;
    font-family: 'Courier New', monospace;
  }
  
  .cache-arrow {
    margin: 0 10px;
    color: #6c757d;
  }
  
  .cache-value {
    flex: 1;
    font-family: 'Courier New', monospace;
    color: #e74c3c;
  }
  
  /* Продвинутые техники */
  .pitfalls-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .pitfall-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    background-color: #f8f9fa;
    transition: all 0.3s ease;
  }
  
  .pitfall-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  
  .pitfall-card h4 {
    color: #e74c3c;
    margin-top: 0;
  }
  
  /* Примеры применения */
  .code-measurement {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
  }
  
  .code-part {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    background-color: #f8f9fa;
  }
  
  .fibonacci-demo {
    margin-top: 30px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: #f8f9fa;
  }
  
  .demo-controls {
    margin-bottom: 20px;
  }
  
  .buttons-row {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  
  .demo-result {
    min-height: 150px;
    background-color: white;
    border-radius: 6px;
    padding: 15px;
  }
  
  .calculating {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    font-style: italic;
    color: #6c757d;
  }
  
  .result-display {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .fib-result, .time-result, .calls-count {
    display: flex;
    gap: 10px;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 4px;
  }
  
  .result-label {
    font-weight: bold;
    min-width: 150px;
  }
  
  .examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .example-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    background-color: #f8f9fa;
    transition: all 0.3s ease;
  }
  
  .example-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .animation-container {
      flex-direction: column;
    }
    
    .pitfalls-grid, .examples-grid {
      grid-template-columns: 1fr;
    }
    
    .code-measurement {
      grid-template-columns: 1fr;
    }
  }
  </style>