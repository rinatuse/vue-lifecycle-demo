<template>
    <div class="has-own-in-explorer">
      <h1>Исследование <span class="method-highlight">hasOwn</span> vs <span class="operator-highlight">in</span> в JavaScript</h1>
      <p class="intro">Интерактивное сравнение методов проверки свойств в объектах</p>
      
      <div class="tabs">
        <button 
          v-for="(tab, index) in tabs" 
          :key="index"
          :class="{ active: currentTab === index }"
          @click="switchTab(index)"
          class="tab-button"
        >
          {{ tab.title }}
        </button>
      </div>
      
      <div class="content-container">
        <!-- 1. Обзор методов -->
        <div v-if="currentTab === 0" class="tab-content">
          <h2>Что такое <span class="method-highlight">hasOwn</span> и <span class="operator-highlight">in</span>?</h2>
          
          <div class="explanation">
            <p>В JavaScript существуют различные способы проверки наличия свойства в объекте. Два основных метода:</p>
            
            <div class="methods-comparison">
              <div class="method-card">
                <h3><span class="method-highlight">Object.hasOwn(obj, prop)</span></h3>
                <p>Современный метод, заменяющий <code>obj.hasOwnProperty(prop)</code>, проверяет, есть ли у объекта <strong>собственное</strong> свойство (не унаследованное).</p>
                <div class="method-example">
                  <pre><code>const obj = { a: 1 };
  Object.hasOwn(obj, 'a'); // true
  Object.hasOwn(obj, 'toString'); // false</code></pre>
                </div>
              </div>
              
              <div class="method-card">
                <h3><span class="operator-highlight">prop in obj</span></h3>
                <p>Оператор <code>in</code> проверяет наличие свойства в объекте, включая свойства, <strong>унаследованные</strong> по цепочке прототипов.</p>
                <div class="method-example">
                  <pre><code>const obj = { a: 1 };
  'a' in obj; // true
  'toString' in obj; // true</code></pre>
                </div>
              </div>
            </div>
            
            <div class="key-difference">
              <h3>Ключевое отличие:</h3>
              <p><code>Object.hasOwn()</code> проверяет только собственные свойства объекта, в то время как оператор <code>in</code> также проверяет унаследованные свойства по цепочке прототипов.</p>
            </div>
          </div>
        </div>
        
        <!-- 2. Визуализация -->
        <div v-if="currentTab === 1" class="tab-content">
          <h2>Визуальное сравнение</h2>
          
          <div class="visualization-container">
            <div class="object-hierarchy">
              <div class="object-card" :class="{ 'highlight-object': highlightedObject === 'userObject' }">
                <div class="object-title">
                  <span>userObject</span>
                  <div class="object-badge">Текущий объект</div>
                </div>
                <div class="object-properties">
                  <div 
                    v-for="(value, key) in userObject" 
                    :key="key"
                    class="property-item"
                    :class="{ 'highlight-property': highlightedProperty === key }"
                  >
                    <span class="property-name">{{ key }}:</span>
                    <span class="property-value">{{ typeof value === 'function' ? 'function(){}' : value }}</span>
                  </div>
                </div>
                <div class="prototype-arrow">
                  <div class="arrow-line"></div>
                  <div class="arrow-text">[[Prototype]]</div>
                </div>
              </div>
              
              <div class="object-card" :class="{ 'highlight-object': highlightedObject === 'objectPrototype' }">
                <div class="object-title">
                  <span>Object.prototype</span>
                  <div class="object-badge">Прототип</div>
                </div>
                <div class="object-properties">
                  <div 
                    v-for="(prop, index) in prototypeProperties" 
                    :key="index"
                    class="property-item"
                    :class="{ 'highlight-property': highlightedProperty === prop }"
                  >
                    <span class="property-name">{{ prop }}:</span>
                    <span class="property-value">function(){}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="check-controls">
              <div class="property-input">
                <label for="property-name">Введите имя свойства:</label>
                <div class="input-with-buttons">
                  <input 
                    type="text" 
                    id="property-name" 
                    v-model="propertyToCheck"
                    @keyup.enter="checkProperty" 
                    placeholder="Например: name, age, toString..."
                  />
                  <button @click="checkProperty" class="check-button">Проверить</button>
                </div>
                <div class="predefined-props">
                  <span>Попробуйте:</span>
                  <button 
                    v-for="prop in suggestedProps" 
                    :key="prop"
                    @click="propertyToCheck = prop; checkProperty()"
                    class="prop-button"
                  >
                    {{ prop }}
                  </button>
                </div>
              </div>
              
              <div v-if="checkPerformed" class="check-results">
                <h3>Результат проверки для свойства "{{ propertyToCheck }}"</h3>
                
                <div class="result-cards">
                  <div class="result-card" :class="{ 'result-true': hasOwnResult, 'result-false': !hasOwnResult }">
                    <div class="result-title">Object.hasOwn()</div>
                    <div class="result-value">{{ hasOwnResult ? 'true' : 'false' }}</div>
                    <div class="result-explanation">
                      <template v-if="hasOwnResult">
                        <p>Свойство <strong>"{{ propertyToCheck }}"</strong> является собственным свойством объекта.</p>
                      </template>
                      <template v-else>
                        <p>Свойство <strong>"{{ propertyToCheck }}"</strong> не является собственным свойством объекта.</p>
                      </template>
                    </div>
                  </div>
                  
                  <div class="result-card" :class="{ 'result-true': inResult, 'result-false': !inResult }">
                    <div class="result-title">in оператор</div>
                    <div class="result-value">{{ inResult ? 'true' : 'false' }}</div>
                    <div class="result-explanation">
                      <template v-if="inResult">
                        <p v-if="hasOwnResult">
                          Свойство <strong>"{{ propertyToCheck }}"</strong> найдено в объекте как собственное свойство.
                        </p>
                        <p v-else>
                          Свойство <strong>"{{ propertyToCheck }}"</strong> найдено в цепочке прототипов объекта.
                        </p>
                      </template>
                      <template v-else>
                        <p>Свойство <strong>"{{ propertyToCheck }}"</strong> не найдено ни в объекте, ни в его цепочке прототипов.</p>
                      </template>
                    </div>
                  </div>
                </div>
                
                <div class="visual-explanation" v-if="checkPerformed">
                  <div class="search-path">
                    <div class="search-title">Процесс поиска свойства "{{ propertyToCheck }}":</div>
                    <div class="search-steps">
                      <div class="search-step" :class="{ 'search-found': hasOwnResult }">
                        <div class="step-number">1</div>
                        <div class="step-description">
                          <p>Проверка <strong>собственных</strong> свойств объекта <code>userObject</code></p>
                          <p v-if="hasOwnResult" class="step-result">Найдено! <code>Object.hasOwn()</code> возвращает <strong>true</strong></p>
                          <p v-else class="step-result">Не найдено в собственных свойствах. <code>Object.hasOwn()</code> возвращает <strong>false</strong></p>
                        </div>
                      </div>
                      
                      <div class="search-step" v-if="!hasOwnResult" :class="{ 'search-found': !hasOwnResult && inResult }">
                        <div class="step-number">2</div>
                        <div class="step-description">
                          <p>Оператор <code>in</code> продолжает поиск в <strong>прототипе</strong> объекта</p>
                          <p v-if="!hasOwnResult && inResult" class="step-result">Найдено в прототипе! Оператор <code>in</code> возвращает <strong>true</strong></p>
                          <p v-else class="step-result">Не найдено в прототипе. Оператор <code>in</code> возвращает <strong>false</strong></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 3. Интерактивные примеры -->
        <div v-if="currentTab === 2" class="tab-content">
          <h2>Практические примеры</h2>
          
          <div class="examples-section">
            <div class="example-tabs">
              <button 
                v-for="(example, index) in examples" 
                :key="index"
                :class="{ active: currentExample === index }"
                @click="currentExample = index"
                class="example-tab"
              >
                {{ example.title }}
              </button>
            </div>
            
            <div class="example-content">
              <h3>{{ examples[currentExample].title }}</h3>
              <p>{{ examples[currentExample].description }}</p>
              
              <div class="code-playground">
                <div class="code-container">
                  <pre><code>{{ examples[currentExample].code }}</code></pre>
                </div>
                
                <div class="playground-controls">
                  <button @click="runExample" class="run-button">Запустить пример</button>
                </div>
                
                <div v-if="exampleResult" class="example-result">
                  <h4>Результат выполнения:</h4>
                  <div class="result-output" v-html="exampleResult"></div>
                </div>
              </div>
              
              <div class="example-explanation">
                <h4>Объяснение:</h4>
                <p v-html="examples[currentExample].explanation"></p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 4. Практическое применение -->
        <div v-if="currentTab === 3" class="tab-content">
          <h2>Когда что использовать?</h2>
          
          <div class="use-cases">
            <div class="use-case-card">
              <div class="use-case-header">
                <div class="use-case-icon method-icon">
                  <span>hasOwn</span>
                </div>
                <h3>Когда использовать Object.hasOwn()</h3>
              </div>
              <div class="use-case-content">
                <ul>
                  <li>
                    <strong>Проверка данных пользователя:</strong> Когда нужно проверить, содержит ли объект определенное свойство, которое было установлено напрямую.
                  </li>
                  <li>
                    <strong>Перебор только собственных свойств:</strong> При итерации по свойствам объекта, когда нужно исключить унаследованные свойства.
                  </li>
                  <li>
                    <strong>Защита от конфликтов имен:</strong> Чтобы убедиться, что свойство не было унаследовано или переопределено.
                  </li>
                  <li>
                    <strong>Работа с данными JSON:</strong> При обработке данных, полученных через JSON, где важны только прямые свойства.
                  </li>
                </ul>
                
                <div class="code-example">
                  <pre><code>// Безопасный перебор собственных свойств объекта
  const userData = JSON.parse(jsonString);
  
  for (const key in userData) {
    if (Object.hasOwn(userData, key)) {
      // Работаем только с собственными свойствами
      processUserData(key, userData[key]);
    }
  }</code></pre>
                </div>
              </div>
            </div>
            
            <div class="use-case-card">
              <div class="use-case-header">
                <div class="use-case-icon operator-icon">
                  <span>in</span>
                </div>
                <h3>Когда использовать оператор in</h3>
              </div>
              <div class="use-case-content">
                <ul>
                  <li>
                    <strong>Проверка функциональности:</strong> Когда нужно узнать, есть ли у объекта определенный метод, даже если он унаследован.
                  </li>
                  <li>
                    <strong>Проверка поддержки в API:</strong> Для определения, поддерживает ли объект определенные возможности.
                  </li>
                  <li>
                    <strong>Работа с прототипами:</strong> Когда важно учитывать всю цепочку прототипов объекта.
                  </li>
                  <li>
                    <strong>Проверка доступности:</strong> Для проверки, можно ли обратиться к свойству или методу объекта.
                  </li>
                </ul>
                
                <div class="code-example">
                  <pre><code>// Проверка поддержки возможностей в браузере
  function checkBrowserSupport() {
    if ('IntersectionObserver' in window) {
      // Браузер поддерживает IntersectionObserver
      setupLazyLoading();
    } else {
      // Использовать fallback
      setupSimpleLoading();
    }
  }</code></pre>
                </div>
              </div>
            </div>
          </div>
          
          <div class="best-practices">
            <h3>Лучшие практики</h3>
            
            <div class="practice-cards">
              <div class="practice-card">
                <div class="practice-title">
                  <span class="practice-icon">✓</span>
                  <h4>Используйте Object.hasOwn() вместо obj.hasOwnProperty()</h4>
                </div>
                <div class="practice-content">
                  <p>Метод <code>Object.hasOwn()</code> является более современной и безопасной альтернативой метода <code>hasOwnProperty</code>:</p>
                  <ul>
                    <li>Он не зависит от того, было ли свойство <code>hasOwnProperty</code> переопределено в объекте.</li>
                    <li>Работает с объектами, созданными через <code>Object.create(null)</code>, у которых нет прототипа.</li>
                    <li>Имеет более понятный синтаксис для чтения кода.</li>
                  </ul>
                </div>
              </div>
              
              <div class="practice-card">
                <div class="practice-title">
                  <span class="practice-icon">✓</span>
                  <h4>Для итерации используйте for...in вместе с hasOwn</h4>
                </div>
                <div class="practice-content">
                  <p>При переборе свойств объекта с помощью <code>for...in</code> комбинируйте его с проверкой <code>Object.hasOwn()</code>:</p>
                  <pre><code>for (const key in object) {
    if (Object.hasOwn(object, key)) {
      // Обрабатываем только собственные свойства
    }
  }</code></pre>
                </div>
              </div>
              
              <div class="practice-card">
                <div class="practice-title">
                  <span class="practice-icon">✓</span>
                  <h4>Используйте Object.keys() для итерации по собственным свойствам</h4>
                </div>
                <div class="practice-content">
                  <p>Если вам нужно работать только с собственными свойствами, используйте <code>Object.keys()</code>, <code>Object.values()</code> или <code>Object.entries()</code>:</p>
                  <pre><code>// Перебор только собственных перечисляемых свойств
  Object.keys(object).forEach(key => {
    // Работаем с ключами
  });
  
  // Или с деструктуризацией
  for (const [key, value] of Object.entries(object)) {
    // Работаем с ключами и значениями
  }</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  
  // Состояние вкладок
  const tabs = [
    { title: "Обзор" },
    { title: "Визуализация" },
    { title: "Примеры" },
    { title: "Практика" }
  ];
  const currentTab = ref(0);
  
  // Пользовательский объект для демонстрации
  const userObject = reactive({
    name: "Иван",
    age: 30,
    email: "ivan@example.com",
    greet() {
      return `Привет, меня зовут ${this.name}!`;
    }
  });
  
  // Свойства прототипа для демонстрации
  const prototypeProperties = [
    "toString",
    "valueOf",
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "constructor"
  ];
  
  // Состояние для визуализации
  const propertyToCheck = ref("");
  const checkPerformed = ref(false);
  const hasOwnResult = ref(false);
  const inResult = ref(false);
  const highlightedObject = ref(null);
  const highlightedProperty = ref(null);
  
  // Предлагаемые свойства для проверки
  const suggestedProps = [
    "name",
    "toString",
    "nonExistent",
    "valueOf",
    "greet"
  ];
  
  // Функция проверки свойства
  function checkProperty() {
    if (!propertyToCheck.value) return;
    
    const property = propertyToCheck.value;
    
    // Сбрасываем подсветку
    highlightedObject.value = null;
    highlightedProperty.value = null;
    
    // Анимация проверки hasOwn
    setTimeout(() => {
      highlightedObject.value = 'userObject';
      highlightedProperty.value = property;
      
      // Проверяем с помощью Object.hasOwn
      hasOwnResult.value = Object.hasOwn(userObject, property);
      
      // Если свойство не найдено, продолжаем поиск в прототипе
      if (!hasOwnResult.value) {
        setTimeout(() => {
          highlightedObject.value = 'objectPrototype';
          highlightedProperty.value = property;
          
          // Проверяем с помощью оператора in
          inResult.value = property in userObject;
          
          checkPerformed.value = true;
        }, 1000);
      } else {
        // Если свойство найдено среди собственных, проверяем и in
        inResult.value = property in userObject;
        checkPerformed.value = true;
      }
    }, 500);
  }
  
  // Примеры для интерактивного раздела
  const examples = [
    {
      title: "Проверка собственных свойств",
      description: "В этом примере мы создаем объект и проверяем различные свойства с помощью Object.hasOwn() и оператора in.",
      code: `const person = {
    name: 'Анна',
    age: 28
  };
  
  // Проверка собственных свойств
  console.log("Object.hasOwn(person, 'name'):", Object.hasOwn(person, 'name'));
  console.log("Object.hasOwn(person, 'toString'):", Object.hasOwn(person, 'toString'));
  
  // Проверка с оператором in
  console.log("'name' in person:", 'name' in person);
  console.log("'toString' in person:", 'toString' in person);`,
      explanation: "В данном примере <code>name</code> и <code>age</code> являются собственными свойствами объекта <code>person</code>, поэтому <code>Object.hasOwn()</code> возвращает <code>true</code> для них. Метод <code>toString</code> наследуется от <code>Object.prototype</code>, поэтому <code>Object.hasOwn()</code> возвращает <code>false</code>, но оператор <code>in</code> возвращает <code>true</code>, так как проверяет всю цепочку прототипов."
    },
    {
      title: "Объекты без прототипа",
      description: "Объекты, созданные с помощью Object.create(null), не имеют прототипа и требуют особого подхода при проверке свойств.",
      code: `// Создаем объект без прототипа
  const obj = Object.create(null);
  obj.name = 'Специальный объект';
  
  // Обычный объект для сравнения
  const normalObj = { name: 'Обычный объект' };
  
  console.log("Обычный объект - 'toString' in normalObj:", 'toString' in normalObj);
  console.log("Объект без прототипа - 'toString' in obj:", 'toString' in obj);
  
  // В объекте без прототипа нет метода hasOwnProperty
  // console.log(obj.hasOwnProperty('name')); // Вызовет ошибку!
  
  // Object.hasOwn работает корректно с любыми объектами
  console.log("Object.hasOwn(obj, 'name'):", Object.hasOwn(obj, 'name'));`,
      explanation: "Объекты, созданные через <code>Object.create(null)</code>, не имеют цепочки прототипов, поэтому у них отсутствуют стандартные методы, такие как <code>toString</code> или <code>hasOwnProperty</code>. Вызов <code>obj.hasOwnProperty()</code> приведет к ошибке, так как этого метода нет. <code>Object.hasOwn()</code> решает эту проблему, так как не зависит от прототипа объекта."
    },
    {
      title: "Переопределение hasOwnProperty",
      description: "Что происходит, когда метод hasOwnProperty переопределен в объекте?",
      code: `// Объект с переопределенным методом hasOwnProperty
  const badObject = {
    hasOwnProperty: function() {
      return false; // Всегда возвращает false
    },
    name: 'Проблемный объект'
  };
  
  // Попытка использовать переопределенный метод
  console.log("badObject.hasOwnProperty('name'):", badObject.hasOwnProperty('name'));
  
  // Object.hasOwn работает корректно
  console.log("Object.hasOwn(badObject, 'name'):", Object.hasOwn(badObject, 'name'));`,
      explanation: "В этом примере метод <code>hasOwnProperty</code> был переопределен в объекте <code>badObject</code>, что приводит к некорректным результатам при вызове <code>badObject.hasOwnProperty('name')</code>. <code>Object.hasOwn()</code> не подвержен этой проблеме, так как берет оригинальный метод напрямую из <code>Object.prototype.hasOwnProperty</code> и применяет его к объекту."
    },
    {
      title: "Безопасная итерация по объекту",
      description: "Использование Object.hasOwn() для безопасного перебора свойств объекта.",
      code: `const user = {
    name: 'Мария',
    email: 'maria@example.com',
    role: 'admin'
  };
  
  console.log("Перебор с for...in без проверки:");
  for (const key in user) {
    console.log(key + ": " + user[key]);
  }
  
  console.log("\\nПеребор только собственных свойств:");
  for (const key in user) {
    if (Object.hasOwn(user, key)) {
      console.log(key + ": " + user[key]);
    }
  }
  
  console.log("\\nАльтернативный способ с Object.keys():");
  Object.keys(user).forEach(key => {
    console.log(key + ": " + user[key]);
  });`,
      explanation: "При использовании цикла <code>for...in</code> перебираются все свойства объекта, включая унаследованные. Добавление проверки <code>Object.hasOwn()</code> позволяет отфильтровать только собственные свойства. Альтернативой является использование <code>Object.keys()</code>, <code>Object.values()</code> или <code>Object.entries()</code>, которые изначально работают только с собственными перечисляемыми свойствами."
    }
  ];
  
  const currentExample = ref(0);
  const exampleResult = ref(null);
  
  // Функция для запуска примера
  function runExample() {
    // Создаем элемент для вывода результатов
    const output = [];
    
    // Сохраняем оригинальный console.log
    const originalLog = console.log;
    
    // Перехватываем вызовы console.log в примере
    console.log = function(...args) {
      originalLog(...args);
      output.push(args.map(arg => 
        typeof arg === 'object' 
          ? JSON.stringify(arg) 
          : String(arg)
      ).join(' '));
    };
    
    try {
      // Выполняем код примера
      const code = examples[currentExample.value].code;
      eval(code);
      
      // Форматируем вывод
      exampleResult.value = output.map(line => 
        line.replace(/true/g, '<span class="true-value">true</span>')
             .replace(/false/g, '<span class="false-value">false</span>')
      ).join('<br>');
    } catch (error) {
      exampleResult.value = `<span class="error">Ошибка: ${error.message}</span>`;
    } finally {
      // Восстанавливаем оригинальный console.log
      console.log = originalLog;
    }
  }
  
  // Переключение вкладок
  function switchTab(index) {
    currentTab.value = index;
    
    // Сбрасываем состояние визуализации при переключении вкладок
    if (index === 1) {
      checkPerformed.value = false;
      highlightedObject.value = null;
      highlightedProperty.value = null;
      propertyToCheck.value = "";
    }
    
    // Сбрасываем результат примера при переключении вкладок
    if (index === 2) {
      exampleResult.value = null;
    }
  }
  </script>
  
  <style scoped>
  .has-own-in-explorer {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
    background-color: #f9f9fa;
    border-radius: 8px;
  }
  
  h1, h2, h3, h4 {
    color: #2c3e50;
  }
  
  h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 10px;
  }
  
  .intro {
    text-align: center;
    color: #6c757d;
    margin-bottom: 30px;
    font-size: 1.1rem;
  }
  
  .method-highlight {
    color: #3498db;
    font-weight: bold;
  }
  
  .operator-highlight {
    color: #e74c3c;
    font-weight: bold;
  }
  
  /* Стили для вкладок */
  .tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .tab-button {
    padding: 10px 20px;
    background-color: #e9ecef;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .tab-button:hover {
    background-color: #dee2e6;
  }
  
  .tab-button.active {
    background-color: #3498db;
    color: white;
  }
  
  .content-container {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
  }
  
  .tab-content {
    animation: fadeIn 0.5s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Стили для обзора методов */
  .explanation {
    line-height: 1.6;
  }
  
  .methods-comparison {
    display: flex;
    gap: 20px;
    margin: 30px 0;
    flex-wrap: wrap;
  }
  
  .method-card {
    flex: 1;
    min-width: 300px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #dee2e6;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .method-card h3 {
    margin-top: 0;
    border-bottom: 1px solid #dee2e6;
    padding-bottom: 10px;
  }
  
  .method-example {
    background-color: #f1f3f5;
    border-radius: 6px;
    padding: 15px;
    margin-top: 15px;
  }
  
  .method-example pre {
    margin: 0;
    overflow-x: auto;
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 0.9rem;
  }
  
  .key-difference {
    margin-top: 30px;
    padding: 20px;
    background-color: #e3f2fd;
    border-radius: 8px;
    border-left: 4px solid #2196f3;
  }
  
  .key-difference h3 {
    margin-top: 0;
    color: #0d47a1;
  }
  
  /* Стили для визуализации */
  .visualization-container {
    margin: 20px 0;
  }
  
  .object-hierarchy {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    margin-bottom: 40px;
  }
  
  .object-card {
    width: 100%;
    max-width: 500px;
    border: 2px solid #3498db;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f8f9fa;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .object-card.highlight-object {
    border-color: #f39c12;
    box-shadow: 0 0 15px rgba(243, 156, 18, 0.4);
  }
  
  .object-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #3498db;
    color: white;
    padding: 10px 15px;
    font-weight: bold;
  }
  
  .highlight-object .object-title {
    background-color: #f39c12;
  }
  
  .object-badge {
    background-color: rgba(255, 255, 255, 0.3);
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
  }
  
  .object-properties {
    padding: 15px;
  }
  
  .property-item {
    display: flex;
    gap: 10px;
    margin-bottom: 8px;
    padding: 8px;
    border-radius: 4px;
    background-color: white;
    border: 1px solid #dee2e6;
    transition: all 0.3s ease;
  }
  
  .property-item.highlight-property {
    background-color: #fff3e0;
    border-color: #ff9800;
    box-shadow: 0 0 10px rgba(255, 152, 0, 0.3);
  }
  
  .property-name {
    font-weight: bold;
    color: #2c3e50;
  }
  
  .property-value {
    color: #e74c3c;
  }
  
  .prototype-arrow {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 40px;
    margin-bottom: -20px;
    position: relative;
    z-index: 1;
  }
  
  .arrow-line {
    height: 30px;
    width: 2px;
    background-color: #3498db;
  }
  
  .arrow-text {
    background-color: #f8f9fa;
    padding: 3px 8px;
    border-radius: 10px;
    font-size: 0.8rem;
    color: #6c757d;
    margin-top: -5px;
  }
  
  /* Стили для контролов проверки */
  .check-controls {
    margin-top: 30px;
  }
  
  .property-input {
    margin-bottom: 20px;
  }
  
  .property-input label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }
  
  .input-with-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .property-input input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .property-input input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.25);
  }
  
  .check-button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .check-button:hover {
    background-color: #2980b9;
  }
  
  .predefined-props {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    margin-top: 10px;
  }
  
  .predefined-props span {
    color: #6c757d;
  }
  
  .prop-button {
    padding: 5px 10px;
    background-color: #f1f3f5;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .prop-button:hover {
    background-color: #e9ecef;
    border-color: #ced4da;
  }
  
  /* Стили для результатов проверки */
  .check-results {
    margin-top: 30px;
    animation: fadeIn 0.5s ease;
  }
  
  .result-cards {
    display: flex;
    gap: 20px;
    margin: 20px 0;
    flex-wrap: wrap;
  }
  
  .result-card {
    flex: 1;
    min-width: 250px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .result-card.result-true {
    border: 2px solid #2ecc71;
  }
  
  .result-card.result-false {
    border: 2px solid #e74c3c;
  }
  
  .result-title {
    padding: 10px 15px;
    font-weight: bold;
    color: white;
  }
  
  .result-true .result-title {
    background-color: #2ecc71;
  }
  
  .result-false .result-title {
    background-color: #e74c3c;
  }
  
  .result-value {
    font-size: 2rem;
    text-align: center;
    padding: 15px;
    font-weight: bold;
  }
  
  .result-true .result-value {
    color: #2ecc71;
  }
  
  .result-false .result-value {
    color: #e74c3c;
  }
  
  .result-explanation {
    padding: 15px;
    background-color: #f8f9fa;
    border-top: 1px solid #dee2e6;
  }
  
  /* Стили для визуального объяснения */
  .visual-explanation {
    margin-top: 30px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #dee2e6;
  }
  
  .search-path {
    margin-top: 15px;
  }
  
  .search-title {
    font-weight: bold;
    margin-bottom: 15px;
  }
  
  .search-steps {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .search-step {
    display: flex;
    gap: 15px;
    padding: 15px;
    border-radius: 8px;
    background-color: white;
    border: 1px solid #dee2e6;
    transition: all 0.3s ease;
  }
  
  .search-step.search-found {
    background-color: #e8f5e9;
    border-color: #4caf50;
  }
  
  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: #3498db;
    color: white;
    border-radius: 50%;
    font-weight: bold;
  }
  
  .search-found .step-number {
    background-color: #4caf50;
  }
  
  .step-description {
    flex: 1;
  }
  
  .step-description p {
    margin: 0 0 5px 0;
  }
  
  .step-result {
    margin-top: 10px;
    font-weight: bold;
  }
  
  .search-found .step-result {
    color: #4caf50;
  }
  
  /* Стили для примеров */
  .examples-section {
    margin-top: 20px;
  }
  
  .example-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .example-tab {
    padding: 8px 15px;
    background-color: #f1f3f5;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .example-tab:hover {
    background-color: #e9ecef;
  }
  
  .example-tab.active {
    background-color: #4caf50;
    color: white;
    border-color: #4caf50;
  }
  
  .example-content {
    animation: fadeIn 0.5s ease;
  }
  
  .code-playground {
    margin: 20px 0;
  }
  
  .code-container {
    background-color: #282c34;
    color: #abb2bf;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    margin-bottom: 15px;
  }
  
  .code-container pre {
    margin: 0;
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .playground-controls {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
  }
  
  .run-button {
    padding: 8px 15px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .run-button:hover {
    background-color: #388e3c;
  }
  
  .example-result {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    padding: 15px;
    margin-bottom: 15px;
    animation: fadeIn 0.5s ease;
  }
  
  .example-result h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #495057;
  }
  
  .result-output {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 4px;
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 0.9rem;
    white-space: pre-wrap;
    line-height: 1.5;
    max-height: 300px;
    overflow-y: auto;
  }
  
  .true-value {
    color: #4caf50;
    font-weight: bold;
  }
  
  .false-value {
    color: #f44336;
    font-weight: bold;
  }
  
  .error {
    color: #f44336;
  }
  
  .example-explanation {
    margin-top: 20px;
  }
  
  .example-explanation h4 {
    margin-bottom: 10px;
    color: #495057;
  }
  
  /* Стили для практического применения */
  .use-cases {
    display: flex;
    gap: 30px;
    margin: 30px 0;
    flex-wrap: wrap;
  }
  
  .use-case-card {
    flex: 1;
    min-width: 300px;
    background-color: #f8f9fa;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .use-case-header {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    background-color: #f1f3f5;
    border-bottom: 1px solid #dee2e6;
  }
  
  .use-case-icon {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: white;
    font-weight: bold;
    font-size: 0.9rem;
  }
  
  .method-icon {
    background-color: #3498db;
  }
  
  .operator-icon {
    background-color: #e74c3c;
  }
  
  .use-case-content {
    padding: 20px;
  }
  
  .use-case-content ul {
    padding-left: 20px;
    margin-bottom: 20px;
  }
  
  .use-case-content li {
    margin-bottom: 10px;
    line-height: 1.6;
  }
  
  .code-example {
    background-color: #f1f3f5;
    border-radius: 6px;
    padding: 15px;
    margin-top: 20px;
  }
  
  .code-example pre {
    margin: 0;
    overflow-x: auto;
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .best-practices {
    margin-top: 40px;
  }
  
  .practice-cards {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
  }
  
  .practice-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .practice-title {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
  }
  
  .practice-icon {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #4caf50;
    color: white;
    font-weight: bold;
  }
  
  .practice-title h4 {
    margin: 0;
    color: #2c3e50;
  }
  
  .practice-content {
    padding-left: 45px;
  }
  
  .practice-content p {
    margin-top: 0;
    line-height: 1.6;
  }
  
  /* Адаптивные стили */
  @media (max-width: 768px) {
    .methods-comparison,
    .result-cards,
    .use-cases {
      flex-direction: column;
    }
    
    .object-card {
      max-width: 100%;
    }
    
    .input-with-buttons {
      flex-direction: column;
    }
    
    .check-button {
      width: 100%;
    }
  }
  
  @media (max-width: 576px) {
    .tabs,
    .example-tabs {
      flex-direction: column;
    }
    
    .tab-button,
    .example-tab {
      width: 100%;
    }
    
    .object-title {
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;
    }
    
    .object-badge {
      align-self: flex-start;
    }
  }

  </style>