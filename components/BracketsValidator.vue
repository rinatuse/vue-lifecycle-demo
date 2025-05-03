<template>
    <div class="brackets-validator">
      <h1>Проверка корректности скобок</h1>
      
      <div class="problem-container">
        <h2>Задача:</h2>
        <div class="problem-statement">
          <p>Напишите функцию <code>checkBrackets(str)</code>, которая принимает строку, содержащую скобки трех видов: <code>()</code>, <code>{}</code>, <code>[]</code>. 
             Функция должна вернуть <code>true</code>, если скобки в строке закрыты и вложены корректно, и <code>false</code> в противном случае.</p>
        </div>
        
        <div class="examples">
          <h3>Примеры:</h3>
          <div class="example" v-for="(example, index) in examples" :key="index">
            <div class="example-input">checkBrackets("<span v-html="highlightBrackets(example.input)"></span>")</div>
            <div class="example-output">→ {{ example.output }}</div>
            <div class="example-explanation" v-if="example.explanation">{{ example.explanation }}</div>
          </div>
        </div>
      </div>
      
      <div class="algorithm-explanation">
        <h2>Алгоритм решения:</h2>
        <p>Для решения этой задачи мы используем структуру данных <strong>стек</strong>, которая идеально подходит для проверки корректности скобок.</p>
        
        <div class="algorithm-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <p>Создаем пустой стек для хранения открывающих скобок.</p>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <p>Перебираем каждый символ в строке:</p>
              <ul>
                <li>Если символ - <strong>открывающая скобка</strong> (<code>(</code>, <code>{</code>, <code>[</code>), добавляем его в стек.</li>
                <li>Если символ - <strong>закрывающая скобка</strong> (<code>)</code>, <code>}</code>, <code>]</code>):</li>
                <ul>
                  <li>Если стек пуст, возвращаем <code>false</code> (нет соответствующей открывающей скобки).</li>
                  <li>Извлекаем последнюю открывающую скобку из стека.</li>
                  <li>Проверяем, соответствует ли извлеченная открывающая скобка текущей закрывающей. Если нет, возвращаем <code>false</code>.</li>
                </ul>
                <li>Все остальные символы (не скобки) игнорируем.</li>
              </ul>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <p>После обработки всей строки:</p>
              <ul>
                <li>Если стек пуст (все открывающие скобки были закрыты), возвращаем <code>true</code>.</li>
                <li>Если в стеке остались скобки, возвращаем <code>false</code> (есть незакрытые скобки).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="visualization-container">
        <h2>Интерактивная визуализация</h2>
        
        <div class="input-controls">
          <input 
            v-model="inputString" 
            placeholder="Введите строку со скобками" 
            class="input-field"
            @input="resetAnimation"
          />
          <button @click="runAnimation" class="run-button" :disabled="isAnimating">
            {{ isAnimating ? 'Анимация...' : 'Проверить' }}
          </button>
        </div>
        
        <div class="visualization">
          <div class="input-string-container">
            <div class="string-chars">
              <div 
                v-for="(char, index) in inputString" 
                :key="index" 
                class="char" 
                :class="{ 
                  'current-char': currentIndex === index,
                  'bracket-open': isBracketOpen(char),
                  'bracket-close': isBracketClose(char)
                }"
              >{{ char }}</div>
            </div>
            <div class="pointer" :style="{ left: pointerPosition + 'px' }">↑</div>
          </div>
          
          <div class="stack-container">
            <div class="stack-label">Стек:</div>
            <div class="stack">
              <div 
                v-for="(item, index) in stackItems" 
                :key="index" 
                class="stack-item"
                :class="{ 
                  'pop-animation': index === stackItems.length - 1 && isPoppingItem,
                  'push-animation': index === stackItems.length - 1 && isPushingItem
                }"
              >{{ item }}</div>
              <div class="stack-bottom" v-if="stackItems.length === 0">Пусто</div>
            </div>
          </div>
          
          <div class="status-container" v-if="animationComplete">
            <div class="status" :class="{ 'status-valid': isValid, 'status-invalid': !isValid }">
              <div class="status-icon">{{ isValid ? '✓' : '✗' }}</div>
              <div class="status-message">{{ statusMessage }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="implementation-container">
        <h2>Реализация</h2>
        <div class="code-container">
          <pre><code>function checkBrackets(str) {
    const stack = [];
    const brackets = {
      ')': '(',
      '}': '{',
      ']': '['
    };
  
    for (let i = 0; i &gt; str.length; i++) {
      const char = str[i];
      
      // Если символ - открывающая скобка, добавляем в стек
      if (char === '(' || char === '{' || char === '[') {
        stack.push(char);
      } 
      // Если символ - закрывающая скобка
      else if (char === ')' || char === '}' || char === ']') {
        // Если стек пуст, нет соответствующей открывающей скобки
        if (stack.length === 0) {
          return false;
        }
        
        // Извлекаем последнюю открывающую скобку
        const lastOpenBracket = stack.pop();
        
        // Проверяем соответствие открывающей и закрывающей скобок
        if (brackets[char] !== lastOpenBracket) {
          return false;
        }
      }
      // Игнорируем все остальные символы
    }
    
    // Если стек пуст, все скобки закрыты корректно
    return stack.length === 0;
  }</code></pre>
        </div>
      </div>
      
      <div class="time-complexity">
        <h2>Анализ сложности</h2>
        <div class="complexity-container">
          <div class="complexity-item">
            <div class="complexity-title">Временная сложность:</div>
            <div class="complexity-value">O(n)</div>
            <div class="complexity-explanation">Где n - длина строки. Мы перебираем каждый символ строки только один раз.</div>
          </div>
          
          <div class="complexity-item">
            <div class="complexity-title">Пространственная сложность:</div>
            <div class="complexity-value">O(n)</div>
            <div class="complexity-explanation">В худшем случае (когда все символы - открывающие скобки) размер стека может быть равен длине строки.</div>
          </div>
        </div>
      </div>
      
      <div class="pitfalls-container">
        <h2>Подводные камни и важные моменты</h2>
        <div class="pitfalls">
          <div class="pitfall" v-for="(pitfall, index) in pitfalls" :key="index">
            <div class="pitfall-icon">⚠️</div>
            <div class="pitfall-content">
              <div class="pitfall-title">{{ pitfall.title }}</div>
              <div class="pitfall-explanation">{{ pitfall.explanation }}</div>
              <div class="pitfall-example" v-if="pitfall.example">
                <strong>Пример:</strong> <code>{{ pitfall.example }}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="variations-container">
        <h2>Вариации задачи</h2>
        <div class="variations">
          <div class="variation" v-for="(variation, index) in variations" :key="index">
            <div class="variation-icon">🔄</div>
            <div class="variation-content">
              <div class="variation-title">{{ variation.title }}</div>
              <div class="variation-explanation">{{ variation.explanation }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed} from 'vue';
  
  // Примеры использования функции
  const examples = [
    { input: "{Hi(good day)!}", output: "true", explanation: "Все скобки корректно закрыты в правильном порядке" },
    { input: "{nice[day}", output: "false", explanation: "Нет закрывающей скобки для [" },
    { input: "(delicious[food])", output: "true", explanation: "Вложенные скобки корректно закрыты" },
    { input: "([)]", output: "false", explanation: "Неверный порядок закрытия скобок" },
    { input: "Hello World!", output: "true", explanation: "Нет скобок - возвращаем true" }
  ];
  
  // Подводные камни
  const pitfalls = [
    { 
      title: "Пустой стек при закрывающей скобке", 
      explanation: "Если встречаем закрывающую скобку, а стек пуст, значит нет соответствующей открывающей скобки - сразу возвращаем false.",
      example: "}text{" 
    },
    { 
      title: "Неправильный порядок закрытия скобок", 
      explanation: "Скобки должны закрываться в обратном порядке их открытия. Например, выражение ([)] неверно, хотя количество скобок сбалансировано.",
      example: "([)]" 
    },
    { 
      title: "Непустой стек в конце", 
      explanation: "Если после обработки всей строки в стеке остались открывающие скобки, значит некоторые скобки не были закрыты - возвращаем false.",
      example: "({text" 
    },
    { 
      title: "Игнорирование не-скобочных символов", 
      explanation: "В задаче нас интересуют только скобки. Все остальные символы нужно игнорировать.",
      example: "текст(и[символы]){123}" 
    }
  ];
  
  // Вариации задачи
  const variations = [
    { 
      title: "Подсчёт максимальной глубины вложенности", 
      explanation: "Модификация: найти максимальную глубину вложенности скобок в валидном выражении." 
    },
    { 
      title: "Поиск минимального количества изменений", 
      explanation: "Найти минимальное количество вставок или удалений скобок, чтобы сделать строку валидной." 
    },
    { 
      title: "Добавление других типов скобок", 
      explanation: "Добавление более сложных правил с другими типами скобок или операторов." 
    },
    { 
      title: "Нахождение самого длинного валидного подвыражения", 
      explanation: "Найти длину самой длинной подстроки с правильной последовательностью скобок." 
    },
  ];
  
  // Состояние для интерактивной визуализации
  const inputString = ref("{Hi(good day)!}");
  const stackItems = ref([]);
  const currentIndex = ref(-1);
  const isAnimating = ref(false);
  const isPoppingItem = ref(false);
  const isPushingItem = ref(false);
  const animationComplete = ref(false);
  const isValid = ref(false);
  const statusMessage = ref('');
  
  // Вычисление позиции указателя
  const pointerPosition = computed(() => {
    return currentIndex.value * 20 + 10; // 20px - ширина символа, 10px - начальное смещение
  });
  
  // Функции для проверки типа скобки
  function isBracketOpen(char) {
    return char === '(' || char === '{' || char === '[';
  }
  
  function isBracketClose(char) {
    return char === ')' || char === '}' || char === ']';
  }
  
  // Функция для подсветки скобок в примерах
  function highlightBrackets(text) {
    return text.replace(/[(){}[\]]/g, '<span class="bracket-highlight">$&</span>');
  }
  
  // Проверка соответствия скобок
  function bracketsMatch(open, close) {
    return (open === '(' && close === ')') || 
           (open === '{' && close === '}') || 
           (open === '[' && close === ']');
  }
  
  // Сброс анимации
  function resetAnimation() {
    stackItems.value = [];
    currentIndex.value = -1;
    isAnimating.value = false;
    isPoppingItem.value = false;
    isPushingItem.value = false;
    animationComplete.value = false;
  }
  
  // Запуск анимации
  async function runAnimation() {
    resetAnimation();
    isAnimating.value = true;
    
    const str = inputString.value;
    let valid = true;
    let failReason = '';
    
    // Анимация перебора символов
    for (let i = 0; i < str.length; i++) {
      currentIndex.value = i;
      const char = str[i];
      
      await sleep(800); // Задержка для наглядности
      
      if (isBracketOpen(char)) {
        isPushingItem.value = true;
        await sleep(400);
        stackItems.value.push(char);
        isPushingItem.value = false;
      } 
      else if (isBracketClose(char)) {
        if (stackItems.value.length === 0) {
          valid = false;
          failReason = `Закрывающая скобка ${char} не имеет соответствующей открывающей скобки`;
          break;
        }
        
        isPoppingItem.value = true;
        await sleep(400);
        const lastOpenBracket = stackItems.value.pop();
        isPoppingItem.value = false;
        
        if (!bracketsMatch(lastOpenBracket, char)) {
          valid = false;
          failReason = `Несоответствие скобок: ${lastOpenBracket} и ${char}`;
          break;
        }
      }
      // Игнорируем не-скобки
    }
    
    await sleep(500);
    
    // Проверка оставшихся скобок в стеке
    if (valid && stackItems.value.length > 0) {
      valid = false;
      failReason = 'Остались незакрытые скобки: ' + stackItems.value.join(', ');
    }
    
    isValid.value = valid;
    statusMessage.value = valid 
      ? 'Все скобки корректно закрыты!'
      : failReason;
    animationComplete.value = true;
    isAnimating.value = false;
  }
  
  // Вспомогательная функция для задержки
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  </script>
  
  <style scoped>
  .brackets-validator {
    font-family: Arial, sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
  }
  
  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
  }
  
  h2 {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  
  h3 {
    color: #2c3e50;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  
  .problem-statement {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .problem-statement p {
    line-height: 1.6;
    margin: 0;
  }
  
  code {
    background-color: #f1f1f1;
    padding: 2px 5px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
  }
  
  .examples {
    margin-bottom: 30px;
  }
  
  .example {
    background-color: #f8f9fa;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 8px;
    border-left: 4px solid #3498db;
  }
  
  .example-input {
    font-family: 'Courier New', monospace;
    margin-bottom: 8px;
  }
  
  .example-output {
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 8px;
  }
  
  .example-explanation {
    font-size: 0.9rem;
    color: #666;
  }
  
  .bracket-highlight {
    color: #e74c3c;
    font-weight: bold;
  }
  
  .algorithm-steps {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;
  }
  
  .step {
    display: flex;
    margin-bottom: 20px;
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
  
  .step-content {
    flex: 1;
  }
  
  .step-content p {
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .step-content ul {
    padding-left: 20px;
  }
  
  .step-content li {
    margin-bottom: 8px;
  }
  
  .visualization-container {
    margin-top: 40px;
    margin-bottom: 40px;
  }
  
  .input-controls {
    display: flex;
    margin-bottom: 20px;
    gap: 10px;
  }
  
  .input-field {
    flex: 1;
    padding: 10px 15px;
    font-size: 16px;
    border: 2px solid #ddd;
    border-radius: 4px;
  }
  
  .run-button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .run-button:hover {
    background-color: #2980b9;
  }
  
  .run-button:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
  
  .visualization {
    background-color: #f8f9fa;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    min-height: 300px;
  }
  
  .input-string-container {
    position: relative;
    margin-bottom: 40px;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .string-chars {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
  
  .char {
    width: 20px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Courier New', monospace;
    font-size: 18px;
    border-bottom: 1px solid #ddd;
  }
  
  .current-char {
    background-color: #ffeb3b;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
  }
  
  .bracket-open {
    color: #4caf50;
    font-weight: bold;
  }
  
  .bracket-close {
    color: #f44336;
    font-weight: bold;
  }
  
  .pointer {
    position: absolute;
    bottom: 0;
    font-size: 20px;
    color: #e74c3c;
    transition: left 0.5s ease;
  }
  
  .stack-container {
    display: flex;
    margin-bottom: 30px;
  }
  
  .stack-label {
    font-weight: bold;
    margin-right: 20px;
    padding-top: 10px;
  }
  
  .stack {
    display: flex;
    flex-direction: column-reverse;
    min-height: 100px;
    min-width: 60px;
    border: 2px solid #3498db;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }
  
  .stack-item {
    padding: 10px;
    background-color: #d1ecf1;
    border-bottom: 1px solid #bee5eb;
    text-align: center;
    font-family: 'Courier New', monospace;
    font-weight: bold;
  }
  
  .push-animation {
    animation: pushItem 0.5s ease;
  }
  
  .pop-animation {
    animation: popItem 0.5s ease;
  }
  
  @keyframes pushItem {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes popItem {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(30px);
      opacity: 0;
    }
  }
  
  .stack-bottom {
    padding: 10px;
    color: #6c757d;
    text-align: center;
    font-style: italic;
  }
  
  .status-container {
    margin-top: 20px;
    animation: fadeIn 0.5s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .status {
    padding: 15px;
    border-radius: 8px;
    display: flex;
    align-items: center;
  }
  
  .status-valid {
    background-color: #d4edda;
    border-left: 4px solid #28a745;
  }
  
  .status-invalid {
    background-color: #f8d7da;
    border-left: 4px solid #dc3545;
  }
  
  .status-icon {
    font-size: 24px;
    margin-right: 15px;
  }
  
  .status-valid .status-icon {
    color: #28a745;
  }
  
  .status-invalid .status-icon {
    color: #dc3545;
  }
  
  .status-message {
    font-weight: bold;
  }
  
  .code-container {
    background-color: #2d2d2d;
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;
  }
  
  pre {
    margin: 0;
    padding: 0;
  }
  
  pre code {
    font-family: 'Courier New', monospace;
    color: #f8f8f2;
    background-color: transparent;
    padding: 0;
  }
  
  .complexity-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
  }
  
  .complexity-item {
    flex: 1;
    min-width: 300px;
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .complexity-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  
  .complexity-value {
    font-size: 24px;
    color: #e74c3c;
    margin-bottom: 10px;
    font-family: 'Courier New', monospace;
  }
  
  .complexity-explanation {
    color: #666;
  }
  
  .pitfalls {
    margin-top: 20px;
  }
  
  .pitfall {
    display: flex;
    margin-bottom: 20px;
    background-color: #fff8e1;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #ffc107;
  }
  
  .pitfall-icon {
    margin-right: 15px;
    font-size: 24px;
  }
  
  .pitfall-content {
    flex: 1;
  }
  
  .pitfall-title {
    font-weight: bold;
    margin-bottom: 8px;
    color: #2c3e50;
  }
  
  .pitfall-explanation {
    margin-bottom: 8px;
  }
  
  .pitfall-example {
    font-size: 0.9rem;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 8px;
    border-radius: 4px;
  }
  
  .variations {
    margin-top: 20px;
  }
  
  .variation {
    display: flex;
    margin-bottom: 20px;
    background-color: #e8f4fd;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #2196f3;
  }
  
  .variation-icon {
    margin-right: 15px;
    font-size: 24px;
  }
  
  .variation-content {
    flex: 1;
  }
  
  .variation-title {
    font-weight: bold;
    margin-bottom: 8px;
    color: #2c3e50;
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    .complexity-container {
      flex-direction: column;
    }
    
    .input-controls {
      flex-direction: column;
    }
    
    .input-field, .run-button {
      width: 100%;
    }
    
    .stack-container {
      flex-direction: column;
    }
    
    .stack-label {
      margin-bottom: 10px;
    }
    
    .stack {
      width: 100%;
    }
  }
  </style>