<template>
    <div class="object-path-explorer">
      <h1>Решение задачи доступа к вложенным свойствам объекта</h1>
      
      <div class="problem-statement">
        <h2>Условие задачи</h2>
        <div class="code-block">
          <pre><code>/**  
    Напишите функцию get(obj, path), которая возвращает значение 
    по указанному пути в объекте. 
    Если путь не существует, функция должна возвращать undefined.
  */
  
  function get(obj, path) {
    // Ваш код здесь
  }
  
  const obj = {
    a: {
      b: {
        c: "d",
      },
    },
  };
  
  console.log(get(obj, "a.b.c")); // Ожидаемый вывод: d</code></pre>
        </div>
      </div>
      
      <div class="solution-container">
        <h2>Подходы к решению</h2>
        
        <div class="approach-tabs">
          <button 
            v-for="(approach, index) in approaches" 
            :key="index"
            :class="{ active: currentApproach === index }"
            @click="currentApproach = index"
          >
            {{ approach.name }}
          </button>
        </div>
        
        <div class="approach-content">
          <div v-if="currentApproach === 0">
            <h3>Итеративное решение</h3>
            <p>Итеративный подход использует цикл для обхода объекта по указанному пути:</p>
            
            <div class="code-block">
              <pre><code>function get(obj, path) {
    // Преобразуем путь в массив ключей
    const keys = path.split('.');
    
    // Начинаем с исходного объекта
    let current = obj;
    
    // Проходим по каждому ключу
    for (const key of keys) {
      // Проверяем, существует ли current и имеет ли он свойство key
      if (current === undefined || current === null) {
        return undefined;
      }
      
      // Переходим к следующему уровню
      current = current[key];
    }
    
    // Возвращаем конечное значение
    return current;
  }</code></pre>
            </div>
            
            <div class="algorithm-explanation">
              <h4>Алгоритм работы:</h4>
              <ol>
                <li>Разбиваем строку пути на массив ключей по разделителю '.'</li>
                <li>Начинаем обход с корня объекта</li>
                <li>Для каждого ключа проверяем, существует ли текущий объект</li>
                <li>Если текущий объект существует, переходим к следующему уровню</li>
                <li>После обхода всех ключей возвращаем значение</li>
              </ol>
            </div>
          </div>
          
          <div v-if="currentApproach === 1">
            <h3>Рекурсивное решение</h3>
            <p>Рекурсивный подход разбивает задачу на более мелкие подзадачи:</p>
            
            <div class="code-block">
              <pre><code>function get(obj, path) {
    // Разбиваем путь на первый ключ и остаток
    const [firstKey, ...rest] = path.split('.');
    
    // Если ключей больше нет, возвращаем значение
    if (rest.length === 0) {
      return obj === undefined || obj === null ? undefined : obj[firstKey];
    }
    
    // Если объект undefined или null, или первый ключ не существует, возвращаем undefined
    if (obj === undefined || obj === null) {
      return undefined;
    }
    
    // Рекурсивно вызываем функцию для следующего уровня
    return get(obj[firstKey], rest.join('.'));
  }</code></pre>
            </div>
            
            <div class="algorithm-explanation">
              <h4>Алгоритм работы:</h4>
              <ol>
                <li>Разделяем путь на первый ключ и остальные ключи</li>
                <li>Если остальных ключей нет, возвращаем значение по первому ключу</li>
                <li>Если объект не существует, возвращаем undefined</li>
                <li>Рекурсивно вызываем функцию для объекта по первому ключу и оставшегося пути</li>
              </ol>
            </div>
          </div>
          
          <div v-if="currentApproach === 2">
            <h3>Улучшенное итеративное решение</h3>
            <p>Это решение учитывает больше краевых случаев и поддерживает различные форматы путей:</p>
            
            <div class="code-block">
              <pre><code>function get(obj, path) {
    // Если path не задан или пустой, возвращаем исходный объект
    if (!path) return obj;
    
    // Если path уже массив, используем его
    // Иначе преобразуем строку с путем в массив ключей
    const keys = Array.isArray(path) ? path : parsePath(path);
    
    // Функция для разбора пути с поддержкой квадратных скобок
    function parsePath(pathStr) {
      // Заменяем квадратные скобки с индексами на точку и индекс
      // Например, "arr[0]" -> "arr.0"
      const normalized = pathStr.replace(/\[(\w+)\]/g, '.$1');
      // Разбиваем по точкам
      return normalized.split('.');
    }
    
    // Начинаем с исходного объекта
    let current = obj;
    
    // Проходим по каждому ключу
    for (const key of keys) {
      // Пропускаем пустые ключи (например, при двойных точках "a..b")
      if (key === '') continue;
      
      // Проверяем, существует ли current и имеет ли он свойство key
      if (current === undefined || current === null) {
        return undefined;
      }
      
      // Переходим к следующему уровню
      current = current[key];
    }
    
    // Возвращаем конечное значение
    return current;
  }</code></pre>
            </div>
            
            <div class="algorithm-explanation">
              <h4>Улучшения:</h4>
              <ul>
                <li>Поддержка массивов в качестве пути</li>
                <li>Поддержка синтаксиса с квадратными скобками (например, "users[0].name")</li>
                <li>Обработка пустых ключей и некорректных путей</li>
                <li>Более надежная обработка краевых случаев</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="visualization-container">
        <h2>Визуализация работы функции</h2>
        
        <div class="object-display">
          <div class="object-structure">
            <pre><code>const obj = {
    a: {
      b: {
        c: "d",
      },
    },
  };</code></pre>
          </div>
          
          <div class="path-input">
            <input 
              v-model="pathInput" 
              placeholder="Введите путь (например: a.b.c)"
              @keyup.enter="animatePath"
            />
            <button @click="animatePath">Получить значение</button>
          </div>
          
          <div class="visual-representation">
            <div class="object-node root-node" :class="{ highlighted: animationStep === 0 }">
              <div class="node-content">obj</div>
              <div class="node-arrow" v-if="pathArray.length > 0"></div>
            </div>
            
            <div 
              v-for="(key, index) in pathArray" 
              :key="index" 
              class="object-node" 
              :class="{ highlighted: animationStep === index + 1, 'not-found': notFoundIndex === index }"
            >
              <div class="node-key">{{ key }}</div>
              <div class="node-content" v-if="notFoundIndex === null || notFoundIndex > index">
                {{ getNodeContent(index) }}
              </div>
              <div class="node-error" v-else-if="notFoundIndex === index">
                Свойство не существует
              </div>
              <div class="node-arrow" v-if="index < pathArray.length - 1 && notFoundIndex === null"></div>
            </div>
            
            <div class="result-display" v-if="showResult">
              <div class="result-label">Результат:</div>
              <div class="result-value">{{ resultValue }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="practical-applications">
        <h2>Практическое применение</h2>
        
        <div class="use-case">
          <h3>1. Безопасный доступ к данным API</h3>
          <p>Часто при работе с API мы не уверены, что вложенные свойства существуют:</p>
          <div class="code-block">
            <pre><code>// Без безопасного доступа - можно получить ошибку
  try {
    const userName = response.data.user.profile.name;
  } catch (error) {
    console.error('Свойство не существует');
  }
  
  // С безопасным доступом - всегда безопасно
  const userName = get(response, 'data.user.profile.name') || 'Гость';</code></pre>
          </div>
        </div>
        
        <div class="use-case">
          <h3>2. Обработка конфигурационных файлов</h3>
          <p>При работе с конфигурационными объектами часто нужен доступ к вложенным настройкам:</p>
          <div class="code-block">
            <pre><code>// Чтение настроек с установкой значений по умолчанию
  const dbHost = get(config, 'database.connection.host') || 'localhost';
  const dbPort = get(config, 'database.connection.port') || 5432;</code></pre>
          </div>
        </div>
        
        <div class="use-case">
          <h3>3. Локализация и интернационализация</h3>
          <p>При работе с многоуровневыми объектами локализации:</p>
          <div class="code-block">
            <pre><code>const translations = {
    ru: {
      common: {
        buttons: {
          save: 'Сохранить',
          cancel: 'Отмена'
        }
      }
    }
  };
  
  // Получение текста по ключу
  const saveButtonText = get(translations, `${currentLocale}.common.buttons.save`);</code></pre>
          </div>
        </div>
        
        <div class="use-case">
          <h3>4. Работа с данными состояния в Redux/Vuex</h3>
          <p>Для безопасного доступа к вложенным состояниям:</p>
          <div class="code-block">
            <pre><code>// Безопасное получение данных из хранилища
  const userName = get(store.state, 'user.profile.name');
  const cartItems = get(store.state, 'shop.cart.items') || [];</code></pre>
          </div>
        </div>
      </div>
      
      <div class="pitfalls-section">
        <h2>Подводные камни</h2>
        
        <div class="pitfall">
          <h3>1. Свойства с точками в именах</h3>
          <p>Если в объекте есть свойство, в имени которого содержится точка, функция может работать некорректно:</p>
          <div class="code-block">
            <pre><code>const obj = {
    "user.name": "Иван" // Свойство с точкой в имени
  };
  
  get(obj, "user.name"); // Вернет undefined, а не "Иван", 
  // так как функция будет искать свойство "name" внутри свойства "user"</code></pre>
          </div>
          <p><strong>Решение:</strong> Для поддержки таких случаев нужно реализовать специальный синтаксис, например, использовать экранирование или квадратные скобки.</p>
        </div>
        
        <div class="pitfall">
          <h3>2. Производительность при рекурсии</h3>
          <p>Рекурсивный подход может вызвать переполнение стека для очень глубоких объектов:</p>
          <div class="code-block">
            <pre><code>// Создание очень глубокого объекта
  let deepObj = {};
  let current = deepObj;
  for (let i = 0; i &lt; 10000; i++) {
    current.next = {};
    current = current.next;
  }
  
  // Это может вызвать переполнение стека при рекурсивном подходе
  let path = Array(10000).fill("next").join(".");
  get(deepObj, path); // RangeError: Maximum call stack size exceeded</code></pre>
          </div>
          <p><strong>Решение:</strong> Использовать итеративный подход для обработки очень глубоких объектов.</p>
        </div>
        
        <div class="pitfall">
          <h3>3. Символы в качестве ключей</h3>
          <p>Объекты в JavaScript могут использовать символы в качестве ключей, но строковое представление пути не позволит обратиться к таким свойствам:</p>
          <div class="code-block">
            <pre><code>const symbolKey = Symbol('key');
  const obj = {
    [symbolKey]: 'value'
  };
  
  get(obj, symbolKey.toString()); // Не найдет значение, так как toString() 
  // не даст настоящий ключ-символ</code></pre>
          </div>
          <p><strong>Решение:</strong> Поддержка передачи массива ключей вместо строки с путем.</p>
        </div>
        
        <div class="pitfall">
          <h3>4. Путь к прототипным свойствам</h3>
          <p>Функция может обращаться к свойствам из прототипа, что не всегда желательно:</p>
          <div class="code-block">
            <pre><code>const obj = {};
  get(obj, 'toString'); // Вернет [Function: toString], 
  // что может быть неожиданно</code></pre>
          </div>
          <p><strong>Решение:</strong> Использовать метод hasOwnProperty для проверки наличия собственных свойств объекта.</p>
        </div>
      </div>
      
      <div class="optimization-section">
        <h2>Оптимизация решения</h2>
        
        <div class="optimization">
          <h3>1. Мемоизация результатов</h3>
          <p>Для часто используемых путей можно сохранять результаты в кеше:</p>
          <div class="code-block">
            <pre><code>// Создаем кеш для хранения результатов
  const cache = new Map();
  
  function getCached(obj, path) {
    const cacheKey = JSON.stringify(obj) + ':' + path;
    
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }
    
    const result = get(obj, path);
    cache.set(cacheKey, result);
    
    return result;
  }</code></pre>
          </div>
          <p>Это может значительно ускорить работу при многократном обращении к одним и тем же путям.</p>
        </div>
        
        <div class="optimization">
          <h3>2. Компиляция пути</h3>
          <p>Для часто используемых путей можно предварительно компилировать их в функцию:</p>
          <div class="code-block">
            <pre><code>function compilePath(path) {
    const keys = Array.isArray(path) ? path : path.split('.');
    
    return function(obj) {
      let current = obj;
      
      for (const key of keys) {
        if (current === undefined || current === null) {
          return undefined;
        }
        current = current[key];
      }
      
      return current;
    };
  }
  
  // Создаем функцию для конкретного пути
  const getUserName = compilePath('user.profile.name');
  
  // Используем для разных объектов
  getUserName(obj1);
  getUserName(obj2);</code></pre>
          </div>
          <p>Этот подход особенно эффективен, когда один и тот же путь используется для разных объектов.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed  } from 'vue';
  
  // Подходы к решению
  const approaches = [
    { name: 'Итеративный подход' },
    { name: 'Рекурсивный подход' },
    { name: 'Улучшенное решение' }
  ];
  const currentApproach = ref(0);
  
  // Состояние для визуализации
  const pathInput = ref('a.b.c');
  const animationStep = ref(-1);
  const showResult = ref(false);
  const resultValue = ref(null);
  const notFoundIndex = ref(null);
  
  // Массив ключей из введенного пути
  const pathArray = computed(() => {
    if (!pathInput.value) return [];
    return pathInput.value.split('.');
  });
  
  // Объект для визуализации
  const obj = {
    a: {
      b: {
        c: "d",
      },
    },
  };
  
  // Функция для получения содержимого узла на определенном уровне
  function getNodeContent(index) {
    let current = obj;
    for (let i = 0; i <= index; i++) {
      if (current === undefined || current === null) {
        return 'undefined';
      }
      
      const key = pathArray.value[i];
      if (i === index) {
        // Если это последний уровень, отображаем текущий объект
        if (typeof current[key] === 'object' && current[key] !== null) {
          return '{...}';
        } else {
          return JSON.stringify(current[key]);
        }
      } else {
        // Если это промежуточный уровень, переходим глубже
        current = current[key];
      }
    }
    return 'undefined';
  }
  
  // Функция для анимации обхода пути
  function animatePath() {
    // Сбрасываем состояние
    animationStep.value = -1;
    showResult.value = false;
    resultValue.value = null;
    notFoundIndex.value = null;
    
    // Запускаем анимацию
    let step = 0;
    const intervalId = setInterval(() => {
      animationStep.value = step;
      
      // Проверяем, существует ли путь на текущем шаге
      let current = obj;
      for (let i = 0; i <= step; i++) {
        if (i > 0) { // Пропускаем корневой объект
          if (current === undefined || current === null || !(pathArray.value[i-1] in current)) {
            notFoundIndex.value = i-1;
            clearInterval(intervalId);
            showResult.value = true;
            resultValue.value = 'undefined';
            return;
          }
          current = current[pathArray.value[i-1]];
        }
      }
      
      // Если дошли до конца пути
      if (step === pathArray.value.length) {
        clearInterval(intervalId);
        showResult.value = true;
        resultValue.value = JSON.stringify(get(obj, pathInput.value));
        return;
      }
      
      step++;
    }, 800);
  }
  
  // Реализация функции get для демонстрации
  function get(obj, path) {
    const keys = path.split('.');
    let current = obj;
    
    for (const key of keys) {
      if (current === undefined || current === null) {
        return undefined;
      }
      
      current = current[key];
    }
    
    return current;
  }
  </script>
  
  <style>
  .object-path-explorer {
    font-family: Arial, sans-serif;
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
    background-color: #fff;
  }
  
  h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 30px;
  }
  
  h2 {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-top: 40px;
  }
  
  h3 {
    color: #2c3e50;
    margin-top: 25px;
  }
  
  h4 {
    color: #2c3e50;
    margin-top: 20px;
  }
  
  .problem-statement {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
  }
  
  .code-block {
    background-color: #f5f5f5;
    border-radius: 5px;
    padding: 15px;
    overflow-x: auto;
    margin: 15px 0;
  }
  
  .code-block pre {
    margin: 0;
  }
  
  .code-block code {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
    font-size: 14px;
    color: #333;
  }
  
  .approach-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .approach-tabs button {
    padding: 10px 15px;
    background-color: #f5f5f5;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .approach-tabs button:hover {
    background-color: #e5e5e5;
  }
  
  .approach-tabs button.active {
    background-color: #3498db;
    color: white;
  }
  
  .approach-content {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    animation: fadeIn 0.5s ease;
  }
  
  .algorithm-explanation {
    background-color: #eaf7ff;
    padding: 15px;
    border-radius: 5px;
    margin-top: 20px;
  }
  
  .algorithm-explanation ol, .algorithm-explanation ul {
    padding-left: 25px;
  }
  
  .algorithm-explanation li {
    margin-bottom: 8px;
    line-height: 1.5;
  }
  
  .visualization-container {
    margin-top: 40px;
  }
  
  .object-display {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
  }
  
  .object-structure {
    margin-bottom: 20px;
  }
  
  .path-input {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .path-input input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
  }
  
  .path-input button {
    padding: 10px 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .path-input button:hover {
    background-color: #2980b9;
  }
  
  .visual-representation {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    min-height: 200px;
    position: relative;
  }
  
  .object-node {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin: 0 10px;
    transition: all 0.3s ease;
  }
  
  .root-node {
    background-color: #eaf7ff;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 30px;
  }
  
  .node-content {
    background-color: #f5f5f5;
    padding: 8px 12px;
    border-radius: 5px;
    border: 1px solid #ddd;
    min-width: 50px;
    text-align: center;
  }
  
  .node-key {
    margin-bottom: 5px;
    font-weight: bold;
    color: #2c3e50;
  }
  
  .node-arrow {
    position: absolute;
    top: 50%;
    right: -25px;
    width: 20px;
    height: 2px;
    background-color: #999;
  }
  
  .node-arrow:after {
    content: '';
    position: absolute;
    right: 0;
    top: -3px;
    width: 0;
    height: 0;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 6px solid #999;
  }
  
  .object-node.highlighted .node-content {
    background-color: #3498db;
    color: white;
    border-color: #2980b9;
    box-shadow: 0 0 10px rgba(52, 152, 219, 0.5);
  }
  
  .object-node.highlighted .node-key {
    color: #3498db;
  }
  
  .object-node.not-found .node-content {
    background-color: #e74c3c;
    color: white;
    border-color: #c0392b;
  }
  
  .node-error {
    color: #e74c3c;
    font-size: 12px;
    margin-top: 5px;
  }
  
  .result-display {
    margin-top: 30px;
    text-align: center;
    animation: fadeIn 0.5s ease;
  }
  
  .result-label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .result-value {
    display: inline-block;
    padding: 10px 15px;
    background-color: #e8f5e9;
    border-radius: 5px;
    font-family: monospace;
    font-size: 16px;
  }
  
  .use-case {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .pitfall {
    background-color: #fff3e0;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    border-left: 4px solid #ff9800;
  }
  
  .optimization {
    background-color: #e8f5e9;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    border-left: 4px solid #4caf50;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @media (max-width: 768px) {
    .approach-tabs {
      flex-direction: column;
    }
    
    .path-input {
      flex-direction: column;
    }
    
    .visual-representation {
      padding: 10px;
    }
    
    .object-node {
      margin-bottom: 20px;
    }
    
    .node-arrow {
      transform: rotate(90deg);
      top: unset;
      bottom: -15px;
      right: 50%;
      width: 10px;
    }
  }
  </style>