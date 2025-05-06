<template>
    <div class="grouping-example">
      <h1>Группировка элементов по типу</h1>
      
      <div class="explanation">
        <h2>Как работает группировка</h2>
        <p>Этот компонент демонстрирует, как работает группировка элементов по типу с помощью следующего кода:</p>
        <pre class="code-block">
  if (!result[item.type]) {
      result[item.type] = [];
  }
  result[item.type].push(item);
        </pre>
        <p>Данный код выполняет следующие действия:</p>
        <ol>
          <li><strong>Проверяет существование массива</strong>: Если в объекте <code>result</code> еще нет свойства с именем <code>item.type</code>, создает его как пустой массив</li>
          <li><strong>Добавляет элемент</strong>: Добавляет текущий элемент <code>item</code> в соответствующий массив по его типу</li>
        </ol>
      </div>
      
      <div class="demo">
        <h2>Демонстрация</h2>
        
        <!-- Исходные данные -->
        <div class="data-section">
          <h3>Исходные элементы</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Тип</th>
                <th>Название</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Поэтапная визуализация -->
        <div class="visualization">
          <h3>Поэтапная визуализация</h3>
          <div class="steps">
            <div 
              v-for="(step, index) in visualizationSteps" 
              :key="index"
              class="step"
              :class="{ active: currentStep === index }"
            >
              <div class="step-number">Шаг {{ index + 1 }}</div>
              <div class="step-info">
                <div class="item-info">
                  <strong>Текущий элемент:</strong> 
                  <span class="item-details">
                    { id: {{ step.item.id }}, type: "{{ step.item.type }}", name: "{{ step.item.name }}" }
                  </span>
                </div>
                <div class="code-execution">
                  <div class="code-line" :class="{ 'highlight': step.highlightCondition }">
                    if (!result[item.type]) { // Проверяем, существует ли массив для типа "{{ step.item.type }}"
                  </div>
                  <div class="code-line indented" :class="{ 'highlight': step.highlightArrayCreation }">
                    result[item.type] = []; // {{ step.conditionResult ? 'Создаем новый массив' : 'Массив уже существует, пропускаем' }}
                  </div>
                  <div class="code-line">}</div>
                  <div class="code-line" :class="{ 'highlight': step.highlightPush }">
                    result[item.type].push(item); // Добавляем элемент в массив
                  </div>
                </div>
              </div>
              <div class="result-state">
                <div class="result-header">Состояние объекта <code>result</code> после шага:</div>
                <pre class="result-code">{{ formatResult(step.resultState) }}</pre>
              </div>
            </div>
          </div>
          
          <div class="controls">
            <button @click="prevStep" :disabled="currentStep === 0">Назад</button>
            <span class="step-indicator">{{ currentStep + 1 }} / {{ visualizationSteps.length }}</span>
            <button @click="nextStep" :disabled="currentStep === visualizationSteps.length - 1">Вперед</button>
          </div>
        </div>
        
        <!-- Итоговый результат -->
        <div class="final-result">
          <h3>Итоговый сгруппированный результат</h3>
          <div class="grouped-data">
            <div v-for="(group, type) in groupedItems" :key="type" class="group">
              <h4>Тип: {{ type }}</h4>
              <ul>
                <li v-for="item in group" :key="item.id">
                  ID: {{ item.id }}, Название: {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="code-explanation">
        <h2>Эквивалентные решения</h2>
        
        <div class="alternative">
          <h3>1. Использование тернарного оператора</h3>
          <pre class="code-block">
  result[item.type] = result[item.type] || [];
  result[item.type].push(item);
          </pre>
          <p>Более краткая, но менее очевидная запись. Если <code>result[item.type]</code> уже существует, используется этот массив, иначе создается новый.</p>
        </div>
        
        <div class="alternative">
          <h3>2. Использование оператора ?. (optional chaining) и ?? (nullish coalescing)</h3>
          <pre class="code-block">
  (result[item.type] ??= []).push(item);
          </pre>
          <p>Современная ES2020+ запись: если <code>result[item.type]</code> не определено, создается пустой массив, затем добавляется элемент.</p>
        </div>
        
        <div class="alternative">
          <h3>3. Использование Map в JavaScript</h3>
          <pre class="code-block">
  // Инициализация
  const result = new Map();
  
  // Группировка
  if (!result.has(item.type)) {
      result.set(item.type, []);
  }
  result.get(item.type).push(item);
  
  // Или более компактная запись
  result.set(item.type, [...(result.get(item.type) || []), item]);
          </pre>
          <p>Использование Map может быть лучшим решением, если типы элементов не являются простыми строками или если порядок имеет значение.</p>
        </div>
        
        <div class="alternative">
          <h3>4. Использование Array.reduce</h3>
          <pre class="code-block">
  const groupedItems = items.reduce((result, item) => {
      if (!result[item.type]) {
          result[item.type] = [];
      }
      result[item.type].push(item);
      return result;
  }, {});
          </pre>
          <p>Функциональный подход, который группирует весь массив за один проход.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // Пример данных
  const items = [
    { id: 1, type: 'fruit', name: 'Яблоко' },
    { id: 2, type: 'vegetable', name: 'Морковь' },
    { id: 3, type: 'fruit', name: 'Банан' },
    { id: 4, type: 'dairy', name: 'Молоко' },
    { id: 5, type: 'vegetable', name: 'Огурец' },
    { id: 6, type: 'fruit', name: 'Апельсин' },
    { id: 7, type: 'dairy', name: 'Сыр' }
  ];
  
  // Текущий шаг визуализации
  const currentStep = ref(0);
  
  // Функция группировки элементов
  function groupItems(items) {
    const result = {};
    
    items.forEach((item) => {
      if (!result[item.type]) {
        result[item.type] = [];
      }
      result[item.type].push(item);
    });
    
    return result;
  }
  
  // Группировка элементов
  const groupedItems = groupItems(items);
  
  // Создание шагов визуализации для пошагового отображения
  const visualizationSteps = items.map((item, index) => {
    // Создание копии состояния результата на данном шаге
    const resultStateCopy = {};
    
    // Добавляем элементы, которые уже были обработаны на предыдущих шагах
    for (let i = 0; i <= index; i++) {
      const currentItem = items[i];
      
      if (!resultStateCopy[currentItem.type]) {
        resultStateCopy[currentItem.type] = [];
      }
      
      // Если это текущий шаг, то не добавляем сам элемент (он будет добавлен "визуально")
      if (i < index) {
        resultStateCopy[currentItem.type].push({ ...currentItem });
      }
    }
    
    // Определяем, существует ли уже массив для данного типа
    const conditionResult = !resultStateCopy[item.type] || resultStateCopy[item.type].length === 0;
    
    // Если элемент является первым в своем типе, обновляем результат
    if (conditionResult) {
      resultStateCopy[item.type] = [];
    }
    
    // Добавляем текущий элемент
    resultStateCopy[item.type].push({ ...item });
    
    return {
      item: { ...item },
      conditionResult,
      highlightCondition: true,
      highlightArrayCreation: conditionResult,
      highlightPush: true,
      resultState: JSON.parse(JSON.stringify(resultStateCopy))
    };
  });
  
  // Функция форматирования результата для лучшей читаемости
  function formatResult(result) {
    return JSON.stringify(result, null, 2);
  }
  
  // Функции навигации по шагам
  function nextStep() {
    if (currentStep.value < visualizationSteps.length - 1) {
      currentStep.value++;
    }
  }
  
  function prevStep() {
    if (currentStep.value > 0) {
      currentStep.value--;
    }
  }
  
  // Начнем автоматическое воспроизведение анимации при загрузке компонента
  let autoplayInterval;
  
  onMounted(() => {
    autoplayInterval = setInterval(() => {
      if (currentStep.value < visualizationSteps.length - 1) {
        currentStep.value++;
      } else {
        clearInterval(autoplayInterval);
      }
    }, 2000);
  });
  </script>
  
  <style scoped>
  .grouping-example {
    font-family: 'Arial', sans-serif;
    max-width: 900px;
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
    margin-top: 40px;
    margin-bottom: 20px;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
  }
  
  h3 {
    color: #2c3e50;
    margin-top: 25px;
    margin-bottom: 15px;
  }
  
  h4 {
    color: #16a085;
    margin-top: 15px;
    margin-bottom: 10px;
  }
  
  .explanation {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .code-block {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 5px;
    font-family: 'Courier New', monospace;
    overflow-x: auto;
    white-space: pre;
    margin: 15px 0;
  }
  
  ol {
    padding-left: 20px;
  }
  
  ol li {
    margin-bottom: 10px;
    line-height: 1.5;
  }
  
  .data-section {
    margin-bottom: 30px;
  }
  
  .data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
  }
  
  .data-table th, .data-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  
  .data-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  .data-table tr:nth-child(even) {
    background-color: #f8f8f8;
  }
  
  .visualization {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .step {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    background-color: white;
    display: none;
  }
  
  .step.active {
    display: block;
    animation: fadeIn 0.5s;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .step-number {
    background-color: #3498db;
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    display: inline-block;
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  .item-info {
    background-color: #f1f8ff;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
  
  .item-details {
    font-family: 'Courier New', monospace;
    background-color: #eee;
    padding: 2px 5px;
    border-radius: 3px;
  }
  
  .code-execution {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 15px;
    font-family: 'Courier New', monospace;
  }
  
  .code-line {
    margin-bottom: 5px;
  }
  
  .code-line.highlight {
    background-color: rgba(255, 255, 0, 0.2);
    font-weight: bold;
  }
  
  .indented {
    margin-left: 20px;
  }
  
  .result-state {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 5px;
  }
  
  .result-header {
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  .result-code {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 10px;
    border-radius: 5px;
    max-height: 200px;
    overflow-y: auto;
    margin: 0;
  }
  
  .controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    align-items: center;
    margin-top: 20px;
  }
  
  .controls button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .controls button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .controls button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .step-indicator {
    font-weight: bold;
  }
  
  .final-result {
    background-color: #e8f7f5;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .grouped-data {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .group {
    flex: 1;
    min-width: 250px;
    background-color: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .group h4 {
    margin-top: 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  
  .group ul {
    padding-left: 20px;
  }
  
  .group li {
    margin-bottom: 5px;
  }
  
  .code-explanation {
    margin-top: 40px;
  }
  
  .alternative {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .alternative h3 {
    margin-top: 0;
    color: #3498db;
  }
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    .grouped-data {
      flex-direction: column;
    }
    
    .group {
      min-width: auto;
    }
    
    .code-block {
      font-size: 14px;
    }
    
    .data-table {
      font-size: 14px;
    }
  }
  </style>