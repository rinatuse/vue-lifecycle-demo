<template>
    <div class="object-copy-demo">
      <h1>5 способов копирования объектов в JavaScript</h1>
      <p class="intro">Узнайте, как работают различные методы копирования и когда их использовать</p>
      
      <div class="demo-container">
        <!-- Селектор метода копирования -->
        <div class="method-selector">
          <button 
            v-for="(method, index) in copyMethods" 
            :key="method.id"
            :class="{ active: currentMethodIndex === index }"
            @click="selectMethod(index)"
          >
            {{ method.name }}
          </button>
        </div>
        
        <!-- Отображение текущего метода -->
        <div class="method-content">
          <div class="method-description">
            <h2>{{ currentMethod.name }}</h2>
            <div v-html="currentMethod.description"></div>
          </div>
          
          <!-- Визуализация процесса копирования -->
          <div class="visualization">
            <div class="objects-container">
              <!-- Исходный объект -->
              <div class="object-box source">
                <div class="object-title">Исходный объект</div>
                <div class="object-content">
                  <pre ref="sourceObj">{{ JSON.stringify(sourceObject, null, 2) }}</pre>
                </div>
              </div>
              
              <!-- Анимация процесса копирования -->
              <div class="copy-process">
                <div class="copy-animation" :class="{ active: isAnimating }">
                  <div class="copy-arrow"></div>
                  <div class="method-name">{{ currentMethod.shortName || currentMethod.name }}</div>
                </div>
                <button class="run-button" @click="runCopyDemo">
                  {{ isAnimating ? 'Копирование...' : 'Выполнить копирование' }}
                </button>
              </div>
              
              <!-- Копия объекта -->
              <div class="object-box result" :class="{ 'has-result': hasResult }">
                <div class="object-title">Результат копирования</div>
                <div class="object-content">
                  <pre ref="resultObj">{{ resultObjectString }}</pre>
                </div>
              </div>
            </div>
            
            <!-- Результат проверки -->
            <div class="verification-result" v-if="hasResult">
              <div class="verification-item" :class="isDeepCopy ? 'success' : 'partial'">
                <div class="verification-icon">{{ isDeepCopy ? '✓' : '△' }}</div>
                <div class="verification-text">
                  <strong>{{ isDeepCopy ? 'Глубокая копия' : 'Поверхностная копия' }}</strong>
                  <div v-if="!isDeepCopy" class="verification-details">
                    Вложенные объекты ссылаются на оригиналы
                  </div>
                </div>
              </div>
              
              <div class="verification-item mutations">
                <div class="mutation-title">Проверим результат мутации:</div>
                <div class="mutation-test">
                  <button @click="mutateSource" :disabled="isAnimating">
                    Изменить исходный объект
                  </button>
                  <button @click="mutateResult" :disabled="isAnimating">
                    Изменить скопированный объект
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Код примера -->
          <div class="code-example">
            <h3>Пример кода:</h3>
            <pre><code>{{ currentMethod.code }}</code></pre>
            <div class="copy-code">
              <button @click="copyCode">
                <span class="copy-icon">⎘</span> Копировать код
              </button>
            </div>
          </div>
          
          <!-- Преимущества и недостатки -->
          <div class="pros-cons">
            <div class="pros">
              <h3>Преимущества:</h3>
              <ul>
                <li v-for="(pro, index) in currentMethod.pros" :key="`pro-${index}`">
                  {{ pro }}
                </li>
              </ul>
            </div>
            <div class="cons">
              <h3>Недостатки:</h3>
              <ul>
                <li v-for="(con, index) in currentMethod.cons" :key="`con-${index}`">
                  {{ con }}
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Когда использовать -->
          <div class="when-to-use">
            <h3>Когда использовать:</h3>
            <p>{{ currentMethod.whenToUse }}</p>
          </div>
        </div>
      </div>
      
      <!-- Сравнительная таблица -->
      <div class="comparison-table-container">
        <h2>Сравнение методов копирования</h2>
        <div class="table-scroll">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Метод</th>
                <th>Тип копии</th>
                <th>Производительность</th>
                <th>Поддержка</th>
                <th>Ограничения</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="method in copyMethods" :key="`table-${method.id}`">
                <td>{{ method.name }}</td>
                <td>{{ method.copyType }}</td>
                <td>
                  <div class="performance-bar">
                    <div class="performance-fill" :style="{ width: method.performance + '%' }"></div>
                  </div>
                  {{ method.performanceText }}
                </td>
                <td>{{ method.support }}</td>
                <td>{{ method.limitations }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed, onMounted } from 'vue';
  
  // Источник и результат
  const sourceObject = reactive({
    id: 1,
    name: "Объект для копирования",
    isActive: true,
    tags: ["javascript", "копирование", "объекты"],
    metadata: {
      created: "2024-01-15",
      author: {
        name: "Разработчик",
        level: "Middle"
      }
    }
  });
  
  const originalSource = JSON.parse(JSON.stringify(sourceObject));
  const resultObject = ref(null);
  const hasResult = ref(false);
  const isDeepCopy = ref(false);
  const isAnimating = ref(false);
  
  // Элементы для анимации
  const sourceObj = ref(null);
  const resultObj = ref(null);
  
  // Методы копирования
  const copyMethods = [
    {
      id: "spread",
      name: "Оператор spread {...}",
      shortName: "{ ...obj }",
      description: `<p>Оператор распространения (spread operator) <code>{...obj}</code> создаёт новый объект и копирует все свойства исходного объекта на верхнем уровне.</p>
      <p>Это <strong>поверхностное копирование</strong> — вложенные объекты и массивы копируются по ссылке, а не по значению.</p>`,
      code: `// Создание копии объекта с помощью spread оператора
  const original = {
    id: 1,
    name: "Исходный объект",
    metadata: {
      created: "2024-01-15",
      author: { name: "Разработчик" }
    }
  };
  
  // Создаём поверхностную копию
  const copy = { ...original };
  
  // Проверка: изменение вложенного свойства
  original.metadata.author.name = "Новое имя";
  console.log(copy.metadata.author.name); // "Новое имя" - изменилось!
  
  // Объекты ссылаются на одну и ту же область памяти
  console.log(original.metadata === copy.metadata); // true`,
      pros: [
        "Простой и понятный синтаксис",
        "Хорошая производительность",
        "Можно объединять несколько объектов",
        "Поддерживается во всех современных браузерах"
      ],
      cons: [
        "Создаёт только поверхностную копию",
        "Вложенные объекты остаются связанными с оригиналом",
        "Требует дополнительной обработки для глубокого копирования"
      ],
      whenToUse: "Используйте, когда нужно быстро создать независимую копию простого объекта без вложенных структур или когда связь вложенных объектов не является проблемой.",
      copyType: "Поверхностная",
      performance: 90,
      performanceText: "Высокая",
      support: "ES6+",
      limitations: "Только поверхностная копия"
    },
    {
      id: "assign",
      name: "Object.assign()",
      description: `<p><code>Object.assign()</code> копирует перечисляемые свойства из одного или нескольких исходных объектов в целевой объект и возвращает его.</p>
      <p>Как и spread-оператор, <code>Object.assign()</code> выполняет <strong>поверхностное копирование</strong>. Вложенные объекты просто передаются по ссылке.</p>`,
      code: `// Копирование объекта через Object.assign()
  const original = {
    id: 1,
    name: "Исходный объект",
    metadata: {
      created: "2024-01-15",
      author: { name: "Разработчик" }
    }
  };
  
  // Создаём поверхностную копию
  const copy = Object.assign({}, original);
  
  // Можно также объединять несколько объектов
  const extended = Object.assign({}, original, { extraProp: "Новое свойство" });
  
  // Проверка: изменение вложенного свойства
  original.metadata.created = "2024-01-16";
  console.log(copy.metadata.created); // "2024-01-16" - изменилось!`,
      pros: [
        "Поддерживает объединение нескольких исходных объектов",
        "Хорошо поддерживается даже в старых браузерах",
        "Можно использовать для расширения объектов",
        "Возвращает целевой объект (удобно для цепочек)"
      ],
      cons: [
        "Создаёт только поверхностную копию",
        "Вложенные объекты остаются связанными",
        "Менее наглядный синтаксис, чем у spread-оператора"
      ],
      whenToUse: "Подходит, когда необходимо объединить несколько объектов в один или когда требуется поддержка старых браузеров без транспиляции.",
      copyType: "Поверхностная",
      performance: 85,
      performanceText: "Высокая",
      support: "ES6+, IE11+",
      limitations: "Только поверхностная копия"
    },
    {
      id: "json",
      name: "JSON.parse + JSON.stringify",
      description: `<p>Этот метод преобразует объект в JSON-строку, а затем преобразует эту строку обратно в новый объект.</p>
      <p>Это создаёт <strong>глубокую копию</strong> объекта, то есть все вложенные объекты и массивы также копируются.</p>
      <p>Однако этот метод имеет существенные ограничения: не копирует функции, объекты Date преобразуются в строки, и могут быть проблемы с циклическими ссылками.</p>`,
      code: `// Глубокое копирование через JSON
  const original = {
    id: 1,
    name: "Исходный объект",
    metadata: {
      created: "2024-01-15",
      author: { name: "Разработчик" }
    }
  };
  
  // Создаём глубокую копию
  const copy = JSON.parse(JSON.stringify(original));
  
  // Проверка: изменение вложенного свойства
  original.metadata.author.name = "Новое имя";
  console.log(copy.metadata.author.name); // "Разработчик" - не изменилось!
  
  // Объекты независимы друг от друга
  console.log(original.metadata === copy.metadata); // false
  
  // ОГРАНИЧЕНИЯ:
  const objWithFunction = {
    name: "Тест",
    method: function() { return "Привет"; },
    date: new Date(),
    regExp: /test/
  };
  
  const badCopy = JSON.parse(JSON.stringify(objWithFunction));
  console.log(badCopy.method); // undefined - функция потеряна!
  console.log(badCopy.date); // строка, а не объект Date
  console.log(badCopy.regExp); // пустой объект {}`,
      pros: [
        "Создаёт полную глубокую копию объекта",
        "Встроенный в JavaScript метод, не требует библиотек",
        "Простой для понимания подход"
      ],
      cons: [
        "Не копирует функции, методы и прототипы",
        "Преобразует Date, RegExp, Map, Set и другие объекты некорректно",
        "Выбрасывает ошибку на циклических объектах",
        "Более низкая производительность для больших объектов"
      ],
      whenToUse: "Используйте для быстрого глубокого копирования объектов с простой структурой, содержащих только данные (без функций, специальных объектов или циклических ссылок).",
      copyType: "Глубокая",
      performance: 60,
      performanceText: "Средняя",
      support: "Все браузеры",
      limitations: "Не работает с функциями, Date, циклическими ссылками"
    },
    {
      id: "structuredClone",
      name: "structuredClone()",
      description: `<p><code>structuredClone()</code> — это встроенный в JavaScript метод, специально созданный для глубокого клонирования объектов.</p>
      <p>Он создаёт <strong>глубокую копию</strong> объектов и поддерживает циклические ссылки, а также многие встроенные типы данных, такие как Date, Map, Set, и типизированные массивы.</p>
      <p>Однако он не может клонировать функции, DOM-узлы и некоторые другие объекты.</p>`,
      code: `// Глубокое клонирование с помощью structuredClone()
  const original = {
    id: 1,
    name: "Исходный объект",
    metadata: {
      created: new Date(), // Объект Date
      map: new Map([["key", "value"]]), // Map
      set: new Set([1, 2, 3]) // Set
    }
  };
  
  // Создаём глубокую копию
  const copy = structuredClone(original);
  
  // Проверка: изменение вложенного свойства
  original.metadata.map.set("key", "новое значение");
  console.log(copy.metadata.map.get("key")); // "value" - не изменилось!
  
  // Date, Map и Set скопированы правильно
  console.log(copy.metadata.created instanceof Date); // true
  console.log(copy.metadata.map instanceof Map); // true
  console.log(copy.metadata.set instanceof Set); // true
  
  // Проверка циклической ссылки
  const cyclical = { name: "цикл" };
  cyclical.self = cyclical; // Циклическая ссылка
  
  const cycleCopy = structuredClone(cyclical);
  console.log(cycleCopy.self === cycleCopy); // true - копия тоже циклическая
  console.log(cycleCopy !== cyclical); // true - это разные объекты`,
      pros: [
        "Создаёт настоящую глубокую копию объекта",
        "Поддерживает циклические ссылки и большинство встроенных типов данных",
        "Правильно копирует Date, RegExp, Map, Set, ArrayBuffer и другие специальные объекты",
        "Встроенный API, не требует внешних библиотек"
      ],
      cons: [
        "Не копирует функции и методы",
        "Не работает с DOM-узлами и другими платформенными объектами",
        "Относительно новая функция, отсутствует в старых браузерах",
        "Может быть медленнее других методов на очень больших объектах"
      ],
      whenToUse: "Оптимально для глубокого копирования сложных объектов с вложенными структурами, включая циклические ссылки и специальные типы данных, но без функций или DOM-узлов.",
      copyType: "Глубокая",
      performance: 70,
      performanceText: "Хорошая",
      support: "Современные браузеры",
      limitations: "Не копирует функции и DOM-узлы"
    },
    {
      id: "lodash",
      name: "Lodash _.cloneDeep()",
      description: `<p>Метод <code>_.cloneDeep()</code> из библиотеки Lodash создаёт полную глубокую копию объекта, включая все вложенные структуры.</p>
      <p>Это один из самых надёжных способов копирования, который правильно обрабатывает большинство случаев, включая функции, специальные объекты и циклические ссылки.</p>`,
      code: `// Подключение Lodash
  import _ from 'lodash';
  // или для использования только нужной функции:
  // import cloneDeep from 'lodash/cloneDeep';
  
  const original = {
    id: 1,
    name: "Исходный объект",
    metadata: {
      created: new Date(),
      calculate: function(x) { return x * 2; },
      regexp: /test/g
    }
  };
  
  // Создаём глубокую копию
  const copy = _.cloneDeep(original);
  
  // Проверка: изменение вложенного свойства
  original.metadata.created.setFullYear(2025);
  console.log(copy.metadata.created.getFullYear()); // Не 2025, а исходный год
  
  // Проверка копирования функции
  console.log(copy.metadata.calculate(5)); // 10 - функция работает
  console.log(copy.metadata.calculate !== original.metadata.calculate); // true - разные функции
  
  // Проверка регулярного выражения
  console.log(copy.metadata.regexp instanceof RegExp); // true
  console.log(copy.metadata.regexp.source); // "test"
  
  // Циклические ссылки тоже обрабатываются корректно
  const cyclical = { name: "цикл" };
  cyclical.self = cyclical;
  const cycleCopy = _.cloneDeep(cyclical);
  console.log(cycleCopy.self === cycleCopy); // true - структура сохранена`,
      pros: [
        "Создаёт наиболее полную глубокую копию объекта",
        "Корректно обрабатывает функции, прототипы и специальные объекты",
        "Поддерживает циклические ссылки и сложные структуры данных",
        "Хорошо протестирован и поддерживается в различных окружениях"
      ],
      cons: [
        "Требует подключения внешней библиотеки (увеличивает размер бандла)",
        "Может быть избыточным для простых случаев",
        "Немного ниже производительность по сравнению с нативными методами"
      ],
      whenToUse: "Идеальный выбор для глубокого копирования сложных объектов в промышленной разработке, особенно когда требуется копирование функций и обработка сложных структур данных.",
      copyType: "Глубокая",
      performance: 65,
      performanceText: "Хорошая",
      support: "Все браузеры (через npm)",
      limitations: "Требуется подключение библиотеки"
    }
  ];
  
  // Текущий выбранный метод
  const currentMethodIndex = ref(0);
  const currentMethod = computed(() => copyMethods[currentMethodIndex.value]);
  
  // Результат копирования в виде строки
  const resultObjectString = computed(() => {
    if (!resultObject.value) return '';
    return JSON.stringify(resultObject.value, null, 2);
  });
  
  // Выбор метода копирования
  function selectMethod(index) {
    currentMethodIndex.value = index;
    hasResult.value = false;
    resultObject.value = null;
    
    // Сбрасываем исходный объект к первоначальному состоянию
    // Создаем пустой объект и затем копируем свойства из оригинала
    const keys = Object.keys(sourceObject);
    for (const key of keys) {
      sourceObject[key] = undefined;
    }
    
    // Заполняем исходный объект начальными данными
    Object.keys(originalSource).forEach(key => {
      sourceObject[key] = JSON.parse(JSON.stringify(originalSource[key]));
    });
  }
  
  // Запуск демонстрации
  async function runCopyDemo() {
    if (isAnimating.value) return;
    
    // Запуск анимации
    isAnimating.value = true;
    
    // Задержка для анимации
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Копирование объекта в зависимости от выбранного метода
    const methodId = currentMethod.value.id;
    
    switch (methodId) {
      case 'spread':
        resultObject.value = { ...sourceObject };
        isDeepCopy.value = false;
        break;
      case 'assign':
        resultObject.value = Object.assign({}, sourceObject);
        isDeepCopy.value = false;
        break;
      case 'json':
        resultObject.value = JSON.parse(JSON.stringify(sourceObject));
        isDeepCopy.value = true;
        break;
      case 'structuredClone':
        // В реальном приложении использовали бы настоящий structuredClone
        // В этом примере просто имитируем его через JSON для совместимости
        resultObject.value = JSON.parse(JSON.stringify(sourceObject));
        isDeepCopy.value = true;
        break;
      case 'lodash':
        // Имитация lodash cloneDeep
        resultObject.value = JSON.parse(JSON.stringify(sourceObject));
        isDeepCopy.value = true;
        break;
    }
    
    // Завершение анимации
    hasResult.value = true;
    isAnimating.value = false;
  }
  
  // Мутация исходного объекта для демонстрации связи/независимости
  function mutateSource() {
    // Изменяем вложенное свойство
    if (sourceObject.metadata && sourceObject.metadata.author) {
      sourceObject.metadata.author.name = "Изменённое имя";
    }
    
    // Также добавляем метку для наглядности
    sourceObject.mutated = "Исходный объект был изменён";
  }
  
  // Мутация результата для демонстрации связи/независимости
  function mutateResult() {
    if (resultObject.value && resultObject.value.metadata && resultObject.value.metadata.author) {
      resultObject.value.metadata.author.level = "Senior";
    }
    
    // Добавляем метку
    resultObject.value.mutated = "Копия была изменена";
  }
  
  // Копирование кода в буфер обмена
  function copyCode() {
    const codeToCopy = currentMethod.value.code;
    navigator.clipboard.writeText(codeToCopy)
      .then(() => {
        alert("Код скопирован в буфер обмена!");
      })
      .catch(err => {
        console.error("Не удалось скопировать код:", err);
      });
  }
  
  // Инициализация
  onMounted(() => {
    // Можно добавить дополнительную логику при монтировании компонента
  });
  </script>
  
  <style scoped>
  .object-copy-demo {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
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
    margin-bottom: 40px;
  }
  
  .demo-container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 40px;
  }
  
  .method-selector {
    display: flex;
    overflow-x: auto;
    background-color: #f5f7fa;
    padding: 10px;
    border-bottom: 1px solid #eaeaea;
  }
  
  .method-selector button {
    padding: 12px 20px;
    background: transparent;
    border: none;
    border-radius: 6px;
    margin-right: 10px;
    cursor: pointer;
    white-space: nowrap;
    color: #5d6778;
    transition: all 0.3s ease;
  }
  
  .method-selector button:hover {
    background-color: #e6e9ed;
  }
  
  .method-selector button.active {
    background-color: #3498db;
    color: white;
    font-weight: bold;
  }
  
  .method-content {
    padding: 30px;
  }
  
  .method-description {
    margin-bottom: 30px;
  }
  
  .method-description h2 {
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  .visualization {
    margin-bottom: 40px;
  }
  
  .objects-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .object-box {
    width: 40%;
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .object-title {
    font-weight: bold;
    color: #495057;
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid #e9ecef;
  }
  
  .object-content {
    min-height: 200px;
    overflow: auto;
    font-family: monospace;
  }
  
  .object-content pre {
    margin: 0;
    white-space: pre-wrap;
  }
  
  .copy-process {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .copy-animation {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
  }
  
  .copy-arrow {
    position: relative;
    width: 80%;
    height: 12px;
    background-color: #e1e1e1;
    border-radius: 6px;
    margin-bottom: 10px;
  }
  
  .copy-arrow:before {
    content: "";
    position: absolute;
    right: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 10px solid #e1e1e1;
  }
  
  .copy-animation.active .copy-arrow {
    background-color: #3498db;
    animation: pulse 1.5s infinite;
  }
  
  .copy-animation.active .copy-arrow:before {
    border-left-color: #3498db;
  }
  
  .method-name {
    font-size: 14px;
    color: #6c757d;
    text-align: center;
  }
  
  .run-button {
    padding: 10px 18px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    text-align: center;
  }
  
  .run-button:hover {
    background-color: #2980b9;
  }
  
  .run-button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .object-box.result {
    opacity: 0.5;
    transition: all 0.5s ease;
  }
  
  .object-box.result.has-result {
    opacity: 1;
  }
  
  .verification-result {
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 20px;
    border: 1px solid #e9ecef;
  }
  
  .verification-item {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
    padding: 12px;
    border-radius: 6px;
    background-color: #fff;
  }
  
  .verification-item.success {
    background-color: #e6f7ee;
    border-left: 4px solid #27ae60;
  }
  
  .verification-item.partial {
    background-color: #fff8e6;
    border-left: 4px solid #f39c12;
  }
  
  .verification-icon {
    font-size: 20px;
    font-weight: bold;
  }
  
  .verification-item.success .verification-icon {
    color: #27ae60;
  }
  
  .verification-item.partial .verification-icon {
    color: #f39c12;
  }
  
  .verification-text {
    flex: 1;
  }
  
  .verification-details {
    font-size: 0.9em;
    color: #7f8c8d;
    margin-top: 5px;
  }
  
  .mutations {
    background-color: #f0f7fb;
    border-left: 4px solid #3498db;
  }
  
  .mutation-title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .mutation-test {
    display: flex;
    gap: 10px;
  }
  
  .mutation-test button {
    padding: 8px 12px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
    transition: all 0.2s ease;
  }
  
  .mutation-test button:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
  
  .mutation-test button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
    transform: none;
  }
  
  .code-example {
    margin-bottom: 30px;
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
  }
  
  .code-example h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #2c3e50;
  }
  
  .code-example pre {
    background-color: #282c34;
    color: #abb2bf;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 15px;
  }
  
  .copy-code {
    display: flex;
    justify-content: flex-end;
  }
  
  .copy-code button {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px 12px;
    background-color: #e9ecef;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
    transition: all 0.2s ease;
  }
  
  .copy-code button:hover {
    background-color: #dee2e6;
  }
  
  .copy-icon {
    font-size: 1.2em;
  }
  
  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .pros, .cons {
    padding: 20px;
    border-radius: 8px;
  }
  
  .pros {
    background-color: #e6f7ee;
    border-left: 4px solid #27ae60;
  }
  
  .cons {
    background-color: #fdeded;
    border-left: 4px solid #e74c3c;
  }
  
  .pros h3, .cons h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #2c3e50;
  }
  
  .pros ul, .cons ul {
    margin: 0;
    padding-left: 20px;
  }
  
  .pros li, .cons li {
    margin-bottom: 8px;
  }
  
  .when-to-use {
    padding: 20px;
    background-color: #f0f7fb;
    border-radius: 8px;
    border-left: 4px solid #3498db;
    margin-bottom: 30px;
  }
  
  .when-to-use h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  
  .when-to-use p {
    margin: 0;
    line-height: 1.6;
  }
  
  .comparison-table-container {
    margin-bottom: 40px;
  }
  
  .comparison-table-container h2 {
    margin-bottom: 20px;
    text-align: center;
    color: #2c3e50;
  }
  
  .table-scroll {
    overflow-x: auto;
  }
  
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .comparison-table th, .comparison-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #e9ecef;
  }
  
  .comparison-table th {
    background-color: #f5f7fa;
    font-weight: bold;
    color: #2c3e50;
  }
  
  .comparison-table tr:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  .comparison-table tr:hover {
    background-color: #e9ecef;
  }
  
  .performance-bar {
    width: 100px;
    height: 10px;
    background-color: #e9ecef;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 5px;
  }
  
  .performance-fill {
    height: 100%;
    background-color: #3498db;
    border-radius: 5px;
  }
  
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    .objects-container {
      flex-direction: column;
    }
    
    .object-box {
      width: 100%;
      margin-bottom: 20px;
    }
    
    .copy-process {
      width: 100%;
      margin: 20px 0;
    }
    
    .copy-animation {
      flex-direction: row;
      align-items: center;
    }
    
    .copy-arrow {
      width: 30%;
      margin-right: 10px;
      margin-bottom: 0;
    }
    
    .pros-cons {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 576px) {
    .method-selector {
      flex-wrap: wrap;
    }
    
    .method-selector button {
      margin-bottom: 10px;
    }
    
    .mutation-test {
      flex-direction: column;
    }
  }
</style>