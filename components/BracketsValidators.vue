<template>
    <div class="brackets-validator">
      <h1 class="title">Проверка валидности скобок</h1>
      <p class="description">
        Алгоритм проверки валидности скобок - классическая задача, которая показывает эффективность применения 
        <span class="highlight">стека</span> в программировании.
      </p>
  
      <div class="problem-definition">
        <h2>Описание задачи</h2>
        <div class="problem-card">
          <p>
            Дана строка, содержащая только символы <code>(</code>, <code>)</code>, <code>[</code>, <code>]</code>. 
            Нужно определить, является ли строка <span class="highlight">валидной</span>.
          </p>
          <p>Строка считается валидной если:</p>
          <ul>
            <li>Каждая открывающая скобка закрывается скобкой того же типа</li>
            <li>Открывающие скобки закрываются в правильном порядке</li>
            <li>Каждая закрывающая скобка имеет соответствующую открывающую скобку того же типа</li>
          </ul>
        </div>
      </div>
  
      <div class="algorithm-explanation">
        <h2>Алгоритм решения</h2>
        <div class="algorithm-card">
          <p>Для решения этой задачи идеально подходит структура данных <span class="highlight">стек</span>:</p>
          <ol>
            <li>Создаем пустой стек</li>
            <li>Итерируемся по каждому символу в строке:</li>
            <ul>
              <li>Если символ — открывающая скобка, помещаем её в стек</li>
              <li>Если символ — закрывающая скобка:
                <ul>
                  <li>Проверяем, что стек не пуст (иначе возвращаем <code>false</code>)</li>
                  <li>Извлекаем последнюю открывающую скобку из стека</li>
                  <li>Проверяем, что она соответствует текущей закрывающей скобке</li>
                  <li>Если не соответствует, возвращаем <code>false</code></li>
                </ul>
              </li>
            </ul>
            <li>После обработки всех символов проверяем, что стек пуст:</li>
            <ul>
              <li>Если стек пуст, все скобки правильно закрыты — возвращаем <code>true</code></li>
              <li>Если стек не пуст, остались незакрытые скобки — возвращаем <code>false</code></li>
            </ul>
          </ol>
        </div>
      </div>
  
      <div class="simulation-section">
        <h2>Интерактивная демонстрация</h2>
        <div class="input-section">
          <div class="input-form">
            <label for="bracket-input">Введите строку со скобками:</label>
            <div class="input-with-buttons">
              <input 
                id="bracket-input" 
                v-model="inputString" 
                type="text" 
                placeholder="Например: [()()]"
                @keyup.enter="runSimulation"
              />
              <button 
                class="run-button" 
                @click="runSimulation" 
                :disabled="isRunning"
              >
                Проверить
              </button>
            </div>
          </div>
          <div class="example-buttons">
            <button 
              v-for="(example, index) in examples" 
              :key="index" 
              @click="selectExample(example)"
              :disabled="isRunning"
            >
              Пример {{ index + 1 }}
            </button>
          </div>
        </div>
  
        <div v-if="showSimulation" class="simulation-container" :class="{ running: isRunning }">
          <div class="simulation-header">
            <div class="simulation-string">
              <div 
                v-for="(char, index) in inputString" 
                :key="index" 
                class="string-char"
                :class="{ 
                  current: currentIndex === index, 
                  processed: currentIndex > index
                }"
              >
                {{ char }}
              </div>
            </div>
          </div>
  
          <div class="simulation-body">
            <div class="stack-container">
              <h3>Стек</h3>
              <div class="stack">
                <div 
                  v-for="(item, index) in stack" 
                  :key="index" 
                  class="stack-item"
                  :class="{ 'new-item': index === stack.length - 1 && stackChanged }"
                >
                  {{ item }}
                </div>
                <div v-if="stack.length === 0" class="empty-stack">
                  Стек пуст
                </div>
              </div>
            </div>
  
            <div class="current-operation">
              <div v-if="!simulationCompleted">
                <p>{{ operationDescription }}</p>
              </div>
              <div v-else class="simulation-result">
                <p 
                  class="result" 
                  :class="{ valid: isValid, invalid: !isValid }"
                >
                  <span v-if="isValid">✓ Строка валидна</span>
                  <span v-else>✗ Строка невалидна: {{ errorMessage }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="code-section">
        <h2>Реализация алгоритма</h2>
        <div class="code-container">
          <pre class="code-block"><code>const checkBrackets = (str) => {
    const stack = [];
    
    for (let i = 0; i &lt; str.length; i++) {
      const char = str[i];
      
      if (char === '(' || char === '[') {
        // Открывающая скобка - добавляем в стек
        stack.push(char);
      } else if (char === ')' || char === ']') {
        // Закрывающая скобка - проверяем соответствие
        if (stack.length === 0) {
          // Нет соответствующей открывающей скобки
          return false;
        }
        
        const top = stack.pop();
        
        if ((char === ')' && top !== '(') || 
            (char === ']' && top !== '[')) {
          // Неправильное соответствие скобок
          return false;
        }
      }
    }
    
    // Проверяем, что все открывающие скобки имеют закрывающие
    return stack.length === 0;
  };</code></pre>
        </div>
      </div>
  
      <div class="pitfalls-section">
        <h2>Подводные камни</h2>
        <div class="pitfalls-container">
          <div class="pitfall">
            <h3>1. Несколько типов скобок</h3>
            <p>
              При проверке разных типов скобок важно правильно сопоставлять открывающие и закрывающие скобки.
              Например, <code>[)</code> - невалидная комбинация, даже если количество открывающих и закрывающих скобок совпадает.
            </p>
          </div>
          
          <div class="pitfall">
            <h3>2. Порядок закрытия скобок</h3>
            <p>
              Скобки должны закрываться в обратном порядке их открытия. Например, <code>([)]</code> - невалидная строка, 
              хотя для каждой открывающей скобки есть закрывающая.
            </p>
          </div>
          
          <div class="pitfall">
            <h3>3. Избыточные закрывающие скобки</h3>
            <p>
              Строки с закрывающими скобками в начале, как <code>)(</code>, невалидны, так как закрывающая скобка 
              не имеет соответствующей открывающей скобки слева от неё.
            </p>
          </div>
          
          <div class="pitfall">
            <h3>4. Незакрытые скобки</h3>
            <p>
              Не забудьте проверить, что стек пуст в конце. Наличие элементов в стеке означает, 
              что некоторые открывающие скобки не были закрыты.
            </p>
          </div>
        </div>
      </div>
  
      <div class="real-world-section">
        <h2>Применение в реальной жизни</h2>
        <div class="real-world-examples">
          <div class="example">
            <h3>1. Компиляторы и парсеры</h3>
            <p>
              Компиляторы используют проверку скобок при синтаксическом анализе кода. Это помогает выявлять ошибки в 
              структуре кода, например, незакрытые блоки функций или условные операторы.
            </p>
          </div>
          
          <div class="example">
            <h3>2. Проверка XML и HTML</h3>
            <p>
              Валидаторы XML и HTML используют подобные алгоритмы для проверки правильного вложения тегов.
              Например, <code>&lt;div&gt;&lt;span&gt;&lt;/div&gt;&lt;/span&gt;</code> содержит ошибку в порядке закрытия тегов.
            </p>
          </div>
          
          <div class="example">
            <h3>3. Редакторы кода</h3>
            <p>
              Функция подсветки парных скобок в IDE и автодополнение закрывающих скобок используют
              подобный алгоритм для отслеживания соответствия скобок.
            </p>
          </div>
          
          <div class="example">
            <h3>4. Математические выражения</h3>
            <p>
              Проверка корректности математических выражений включает в себя проверку скобок, 
              например в формулах: (2+3)*(4/(1+1)).
            </p>
          </div>
  
          <div class="example">
            <h3>5. Обработка JSON</h3>
            <p>
              Парсеры JSON используют проверку валидности скобок и круглых скобок для проверки структуры документа.
            </p>
          </div>
        </div>
      </div>
      
      <div class="time-complexity">
        <h2>Сложность алгоритма</h2>
        <div class="complexity-card">
          <div class="complexity-item">
            <h3>Временная сложность</h3>
            <p><strong>O(n)</strong>, где n — длина строки</p>
            <p>Мы обрабатываем каждый символ строки ровно один раз.</p>
          </div>
          
          <div class="complexity-item">
            <h3>Пространственная сложность</h3>
            <p><strong>O(n)</strong> в худшем случае</p>
            <p>В худшем случае (когда все символы — открывающие скобки) стек будет содержать n элементов.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed  } from 'vue';
  
  // Примеры строк для проверки
  const examples = [
    "[[((]]))",      // Невалидная строка
    "[)",            // Невалидная строка
    "))[[()()]]",    // Невалидная строка
    "[[]](((([[]]))))", // Валидная строка
    "[]"             // Валидная строка
  ];
  
  // Состояние компонента
  const inputString = ref("");
  const stack = ref([]);
  const currentIndex = ref(-1);
  const isRunning = ref(false);
  const showSimulation = ref(false);
  const simulationCompleted = ref(false);
  const stackChanged = ref(false);
  const isValid = ref(false);
  const errorMessage = ref("");
  
  // Выбор примера
  const selectExample = (example) => {
    inputString.value = example;
  };
  
  // Сброс состояния симуляции
  const resetSimulation = () => {
    stack.value = [];
    currentIndex.value = -1;
    simulationCompleted.value = false;
    stackChanged.value = false;
    isValid.value = false;
    errorMessage.value = "";
  };
  
  // Запуск симуляции
  const runSimulation = () => {
    if (isRunning.value || !inputString.value) return;
    
    resetSimulation();
    showSimulation.value = true;
    isRunning.value = true;
    
    // Запускаем пошаговую симуляцию
    simulateNextStep();
  };
  
  // Описание текущей операции
  const operationDescription = computed(() => {
    if (currentIndex.value < 0) {
      return "Начинаем проверку...";
    }
    
    const char = inputString.value[currentIndex.value];
    
    if (char === '(' || char === '[') {
      return `Символ '${char}' - это открывающая скобка. Помещаем её в стек.`;
    } else if (char === ')' || char === ']') {
      if (stack.value.length === 0) {
        return `Символ '${char}' - это закрывающая скобка, но стек пуст. Нет соответствующей открывающей скобки.`;
      }
      
      const top = stack.value[stack.value.length - 1];
      const isMatch = (char === ')' && top === '(') || (char === ']' && top === '[');
      
      if (isMatch) {
        return `Символ '${char}' соответствует открывающей скобке '${top}' в стеке. Удаляем '${top}' из стека.`;
      } else {
        return `Символ '${char}' не соответствует открывающей скобке '${top}' в стеке. Ошибка!`;
      }
    }
    
    return "Обрабатываем символ...";
  });
  
  // Пошаговая симуляция
  const simulateNextStep = () => {
    currentIndex.value++;
    stackChanged.value = false;
    
    // Если достигли конца строки
    if (currentIndex.value >= inputString.value.length) {
      // Проверяем, пуст ли стек
      isValid.value = stack.value.length === 0;
      
      if (!isValid.value) {
        errorMessage.value = "Остались незакрытые скобки";
      }
      
      simulationCompleted.value = true;
      isRunning.value = false;
      return;
    }
    
    const char = inputString.value[currentIndex.value];
    
    // Обработка открывающих скобок
    if (char === '(' || char === '[') {
      stack.value.push(char);
      stackChanged.value = true;
      
      // Переходим к следующему шагу через небольшую задержку
      setTimeout(simulateNextStep, 1000);
    } 
    // Обработка закрывающих скобок
    else if (char === ')' || char === ']') {
      if (stack.value.length === 0) {
        isValid.value = false;
        errorMessage.value = "Нет соответствующей открывающей скобки";
        simulationCompleted.value = true;
        isRunning.value = false;
        return;
      }
      
      const top = stack.value[stack.value.length - 1];
      const isMatch = (char === ')' && top === '(') || (char === ']' && top === '[');
      
      if (!isMatch) {
        isValid.value = false;
        errorMessage.value = `Скобка '${char}' не соответствует открывающей скобке '${top}'`;
        simulationCompleted.value = true;
        isRunning.value = false;
        return;
      }
      
      // Имитируем удаление из стека с небольшой задержкой
      setTimeout(() => {
        stack.value.pop();
        stackChanged.value = true;
        
        // Переходим к следующему шагу
        setTimeout(simulateNextStep, 1000);
      }, 800);
    } else {
      // Если символ не скобка, просто пропускаем его
      setTimeout(simulateNextStep, 500);
    }
  };
  
  // Функция проверки скобок для прямого вызова
  const _checkBrackets = (str) => {
    const bracketStack = [];
    
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      
      if (char === '(' || char === '[') {
        bracketStack.push(char);
      } else if (char === ')' || char === ']') {
        if (bracketStack.length === 0) {
          return false;
        }
        
        const top = bracketStack.pop();
        
        if ((char === ')' && top !== '(') || (char === ']' && top !== '[')) {
          return false;
        }
      }
    }
    
    return bracketStack.length === 0;
  };
  </script>
  
  <style scoped>
  .brackets-validator {
    font-family: 'Inter', Arial, sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    color: #333;
  }
  
  .title {
    text-align: center;
    color: #2c3e50;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .description {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: #555;
    line-height: 1.6;
  }
  
  .highlight {
    color: #e74c3c;
    font-weight: bold;
  }
  
  h2 {
    color: #2c3e50;
    font-size: 1.5rem;
    margin: 1.5rem 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #eee;
  }
  
  .problem-card, .algorithm-card {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
    line-height: 1.6;
  }
  
  ul, ol {
    padding-left: 1.5rem;
    margin: 1rem 0;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  code {
    background-color: transparent;
    padding: 0.1rem 0.3rem;
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9em;
    color: inherit;
  }
  
  .input-section {
    margin-bottom: 1.5rem;
  }
  
  .input-form {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .input-with-buttons {
    display: flex;
    gap: 10px;
  }
  
  input[type="text"] {
    flex: 1;
    padding: 0.75rem;
    font-size: 1rem;
    border: 2px solid #ddd;
    border-radius: 6px;
    font-family: 'Fira Code', monospace;
  }
  
  button {
    padding: 0.75rem 1.25rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  
  button:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
  
  .run-button {
    background-color: #2ecc71;
  }
  
  .run-button:hover {
    background-color: #27ae60;
  }
  
  .example-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .simulation-container {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
    transition: transform 0.3s;
  }
  
  .simulation-container.running {
    border: 2px solid #3498db;
  }
  
  .simulation-header {
    padding: 1rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #eee;
  }
  
  .simulation-string {
    display: flex;
    justify-content: center;
    font-family: 'Fira Code', monospace;
    font-size: 1.5rem;
    letter-spacing: 0.5rem;
  }
  
  .string-char {
    width: 2rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.25rem;
    transition: all 0.3s;
  }
  
  .string-char.current {
    background-color: #3498db;
    color: white;
    border-radius: 4px;
    transform: scale(1.2);
  }
  
  .string-char.processed {
    color: #7f8c8d;
  }
  
  .simulation-body {
    padding: 1.5rem;
    display: flex;
    gap: 2rem;
  }
  
  .stack-container {
    width: 30%;
  }
  
  .stack-container h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #2c3e50;
  }
  
  .stack {
    background-color: #f8f9fa;
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 1rem;
    min-height: 200px;
    display: flex;
    flex-direction: column-reverse;
    gap: 0.5rem;
  }
  
  .stack-item {
    background-color: #e74c3c;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-align: center;
    font-family: 'Fira Code', monospace;
    transition: all 0.3s;
  }
  
  .stack-item.new-item {
    animation: pulse 0.5s;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  .empty-stack {
    color: #95a5a6;
    text-align: center;
    padding: 1rem;
    font-style: italic;
  }
  
  .current-operation {
    flex: 1;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 6px;
    min-height: 100px;
  }
  
  .simulation-result {
    text-align: center;
    padding: 1rem;
  }
  
  .result {
    font-size: 1.5rem;
    font-weight: bold;
    padding: 1rem;
    border-radius: 6px;
  }
  
  .result.valid {
    background-color: #d5f5e3;
    color: #27ae60;
  }
  
  .result.invalid {
    background-color: #fadbd8;
    color: #e74c3c;
  }
  
  .code-container {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 2rem;
  }
  
  .code-block {
    padding: 1.5rem;
    margin: 0;
    font-family: 'Courier New', monospace;
    font-size: 1rem;
    line-height: 1.6;
    color: #000000;
    background-color: #f8f8f8;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: normal;
  }
  
  .pitfalls-container, .real-world-examples {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .pitfall, .example {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .pitfall h3, .example h3 {
    margin-top: 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }
  
  .complexity-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .complexity-item {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .complexity-item h3 {
    margin-top: 0;
    color: #2c3e50;
    margin-bottom: 1rem;
  }
  
  /* Адаптивный дизайн */
  @media (max-width: 768px) {
    .pitfalls-container, .real-world-examples {
      grid-template-columns: 1fr;
    }
    
    .complexity-card {
      grid-template-columns: 1fr;
    }
    
    .simulation-body {
      flex-direction: column;
    }
    
    .stack-container {
      width: 100%;
    }
    
    .input-with-buttons {
      flex-direction: column;
    }
  }
  </style>