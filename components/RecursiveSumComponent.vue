<template>
    <div class="recursive-sum">
      <h1 class="title">Рекурсивное суммирование чисел в объекте</h1>
      
      <div class="card problem-statement">
        <h2>Задача</h2>
        <p>Необходимо написать функцию, которая находит сумму всех числовых значений в объекте любой вложенности. Объект может содержать вложенные объекты на произвольной глубине.</p>
        
        <div class="example-object">
          <h3>Пример объекта:</h3>
          <pre><code>const obj = {
    a: 1,
    b: {
      c: 3,
      d: -10,
      e: {
        f: {
          g: 1,
        },
      },
    },
  };</code></pre>
          <p>Результат: <span class="result">-5</span> (1 + 3 + (-10) + 1 = -5)</p>
        </div>
      </div>
      
      <div class="card algorithm-section">
        <h2>Алгоритм решения</h2>
        
        <div class="algorithm-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <p>Создать функцию, которая принимает объект в качестве аргумента</p>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <p>Инициализировать переменную для хранения суммы (сумма = 0)</p>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <p>Обойти все свойства объекта с помощью цикла</p>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <p>Для каждого свойства проверить тип значения:</p>
              <ul>
                <li>Если значение - число, прибавить его к сумме</li>
                <li>Если значение - объект, рекурсивно вызвать функцию для этого объекта и прибавить результат к сумме</li>
                <li>Если значение имеет другой тип, пропустить его</li>
              </ul>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">5</div>
            <div class="step-content">
              <p>Вернуть итоговую сумму</p>
            </div>
          </div>
        </div>
        
        <div class="solution-code">
          <h3>Решение:</h3>
          <pre><code>function sumNumbersInObject(obj) {
    // Базовый случай: если аргумент не объект или null, возвращаем 0
    if (obj === null || typeof obj !== 'object') {
      return 0;
    }
    
    let sum = 0;
    
    // Обходим все свойства объекта
    for (const key in obj) {
      const value = obj[key];
      
      // Если значение - число, прибавляем к сумме
      if (typeof value === 'number') {
        sum += value;
      }
      // Если значение - объект, рекурсивно вызываем функцию
      else if (typeof value === 'object' && value !== null) {
        sum += sumNumbersInObject(value);
      }
    }
    
    return sum;
  }</code></pre>
        </div>
      </div>
      
      <div class="card animation-section">
        <h2>Визуализация работы алгоритма</h2>
        
        <div class="animation-controls">
          <button @click="startAnimation" :disabled="isAnimating" class="btn">
            {{ isAnimating ? 'Анимация запущена...' : 'Запустить анимацию' }}
          </button>
          <button @click="resetAnimation" :disabled="!animationStarted || isAnimating" class="btn reset-btn">
            Сбросить
          </button>
        </div>
        
        <div class="animation-container">
          <div class="object-tree">
            <div class="object-node root" :class="{ active: activeNodes.includes('root') }">
              <div class="node-header">
                <span class="node-name">obj</span>
                <span class="node-sum" v-if="nodeSums.root !== undefined">= {{ nodeSums.root }}</span>
              </div>
              <div class="node-children">
                <div class="object-node" :class="{ active: activeNodes.includes('a') }">
                  <div class="node-header">
                    <span class="node-name">a: 1</span>
                    <span class="node-type">число</span>
                  </div>
                </div>
                
                <div class="object-node" :class="{ active: activeNodes.includes('b') }">
                  <div class="node-header">
                    <span class="node-name">b: объект</span>
                    <span class="node-sum" v-if="nodeSums.b !== undefined">= {{ nodeSums.b }}</span>
                  </div>
                  <div class="node-children">
                    <div class="object-node" :class="{ active: activeNodes.includes('c') }">
                      <div class="node-header">
                        <span class="node-name">c: 3</span>
                        <span class="node-type">число</span>
                      </div>
                    </div>
                    
                    <div class="object-node" :class="{ active: activeNodes.includes('d') }">
                      <div class="node-header">
                        <span class="node-name">d: -10</span>
                        <span class="node-type">число</span>
                      </div>
                    </div>
                    
                    <div class="object-node" :class="{ active: activeNodes.includes('e') }">
                      <div class="node-header">
                        <span class="node-name">e: объект</span>
                        <span class="node-sum" v-if="nodeSums.e !== undefined">= {{ nodeSums.e }}</span>
                      </div>
                      <div class="node-children">
                        <div class="object-node" :class="{ active: activeNodes.includes('f') }">
                          <div class="node-header">
                            <span class="node-name">f: объект</span>
                            <span class="node-sum" v-if="nodeSums.f !== undefined">= {{ nodeSums.f }}</span>
                          </div>
                          <div class="node-children">
                            <div class="object-node" :class="{ active: activeNodes.includes('g') }">
                              <div class="node-header">
                                <span class="node-name">g: 1</span>
                                <span class="node-type">число</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="execution-stack">
            <h3>Стек вызовов:</h3>
            <div class="stack-container">
              <div v-for="(call, index) in callStack.slice().reverse()" :key="index" class="stack-frame">
                <div class="frame-content">
                  <div class="frame-function">sumNumbersInObject({{ call.name }})</div>
                  <div v-if="call.sum !== undefined" class="frame-result">sum = {{ call.sum }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="animation-explanation">
          <div v-if="!animationStarted">
            <p>Нажмите кнопку "Запустить анимацию", чтобы увидеть пошаговое выполнение алгоритма.</p>
          </div>
          <div v-else>
            <h3>Шаг {{ currentStep }} из {{ totalSteps }}:</h3>
            <p>{{ currentExplanation }}</p>
          </div>
        </div>
      </div>
      
      <div class="card pitfalls-section">
        <h2>Подводные камни</h2>
        
        <div class="pitfall">
          <h3>1. Циклические ссылки</h3>
          <p>Если объект содержит циклические ссылки (объект ссылается сам на себя или на родительский объект), наш алгоритм может попасть в бесконечную рекурсию.</p>
          
          <div class="example-code">
            <pre><code>const cyclic = { a: 1 };
  cyclic.self = cyclic; // Циклическая ссылка!
  
  // Это вызовет переполнение стека
  sumNumbersInObject(cyclic);</code></pre>
          </div>
          
          <div class="solution">
            <h4>Решение:</h4>
            <p>Использовать WeakSet или Map для отслеживания уже посещенных объектов:</p>
            
            <pre><code>function sumNumbersInObjectSafe(obj, visited = new WeakSet()) {
    if (obj === null || typeof obj !== 'object' || visited.has(obj)) {
      return 0;
    }
    
    visited.add(obj);
    let sum = 0;
    
    for (const key in obj) {
      const value = obj[key];
      
      if (typeof value === 'number') {
        sum += value;
      }
      else if (typeof value === 'object' && value !== null) {
        sum += sumNumbersInObjectSafe(value, visited);
      }
    }
    
    return sum;
  }</code></pre>
          </div>
        </div>
        
        <div class="pitfall">
          <h3>2. Специальные типы объектов</h3>
          <p>JavaScript имеет несколько типов, которые являются объектами, но должны обрабатываться особым образом:</p>
          
          <div class="example-code">
            <pre><code>const mixed = {
    arr: [1, 2, 3],           // Массив
    date: new Date(),         // Объект Date
    regex: /test/,            // Регулярное выражение
    num: new Number(5)        // Объект-обертка числа
  };</code></pre>
          </div>
          
          <div class="solution">
            <h4>Решение:</h4>
            <p>Добавить дополнительные проверки для специальных типов объектов:</p>
            
            <pre><code>function sumNumbersInObjectEnhanced(obj, visited = new WeakSet()) {
    // Проверки на null и циклические ссылки
    if (obj === null || visited.has(obj)) {
      return 0;
    }
    
    // Если это примитивное значение
    if (typeof obj !== 'object') {
      return typeof obj === 'number' ? obj : 0;
    }
    
    // Если это массив
    if (Array.isArray(obj)) {
      return obj.reduce((sum, item) => 
        sum + sumNumbersInObjectEnhanced(item, visited), 0);
    }
    
    // Если это объектная обертка для числа
    if (obj instanceof Number) {
      return Number(obj);
    }
    
    // Обработка обычных объектов
    visited.add(obj);
    let sum = 0;
    
    for (const key in obj) {
      const value = obj[key];
      sum += sumNumbersInObjectEnhanced(value, visited);
    }
    
    return sum;
  }</code></pre>
          </div>
        </div>
        
        <div class="pitfall">
          <h3>3. Производительность</h3>
          <p>Для очень больших и глубоких объектов рекурсивный алгоритм может столкнуться с ограничениями стека вызовов.</p>
          
          <div class="solution">
            <h4>Решение:</h4>
            <p>Использовать итеративный подход вместо рекурсивного:</p>
            
            <pre><code>function sumNumbersInObjectIterative(obj) {
    if (obj === null || typeof obj !== 'object') {
      return 0;
    }
    
    let sum = 0;
    const stack = [obj];
    const visited = new WeakSet();
    
    while (stack.length > 0) {
      const current = stack.pop();
      
      if (current === null || typeof current !== 'object' || visited.has(current)) {
        continue;
      }
      
      visited.add(current);
      
      for (const key in current) {
        const value = current[key];
        
        if (typeof value === 'number') {
          sum += value;
        }
        else if (typeof value === 'object' && value !== null) {
          stack.push(value);
        }
      }
    }
    
    return sum;
  }</code></pre>
          </div>
        </div>
      </div>
      
      <div class="card practical-section">
        <h2>Практическое применение</h2>
        
        <div class="use-case">
          <h3>1. Анализ данных из API</h3>
          <p>API часто возвращают вложенные JSON-объекты. Рекурсивный обход может использоваться для суммирования значений, подсчета элементов или извлечения конкретных данных.</p>
          
          <div class="example-code">
            <pre><code>// Пример: подсчет общей суммы заказа
  fetch('https://api.example.com/order/123')
    .then(response => response.json())
    .then(orderData => {
      const totalAmount = sumNumbersInObject(orderData.items);
      console.log(`Сумма заказа: ${totalAmount}`);
    });</code></pre>
          </div>
        </div>
        
        <div class="use-case">
          <h3>2. Обработка конфигурационных файлов</h3>
          <p>Конфигурационные файлы часто имеют сложную структуру с множеством вложенных объектов. Рекурсивные алгоритмы позволяют обрабатывать такие структуры.</p>
          
          <div class="example-code">
            <pre><code>// Пример: проверка конфигурации на превышение лимитов
  function checkConfigLimits(config) {
    const totalConnections = sumNumbersInObject(config.connections);
    if (totalConnections > 100) {
      console.warn('Превышен лимит подключений!');
    }
  }</code></pre>
          </div>
        </div>
        
        <div class="use-case">
          <h3>3. Обход DOM-дерева</h3>
          <p>DOM-структура веб-страницы представляет собой дерево элементов, которое можно обходить рекурсивно.</p>
          
          <div class="example-code">
            <pre><code>// Пример: подсчет всех числовых значений data-атрибутов
  function sumDataValues(element) {
    let sum = 0;
    
    // Проверяем data-атрибуты текущего элемента
    for (const key in element.dataset) {
      const value = Number(element.dataset[key]);
      if (!isNaN(value)) {
        sum += value;
      }
    }
    
    // Рекурсивно обходим все дочерние элементы
    for (const child of element.children) {
      sum += sumDataValues(child);
    }
    
    return sum;
  }
  
  const total = sumDataValues(document.body);</code></pre>
          </div>
        </div>
        
        <div class="use-case">
          <h3>4. Анализ файловой системы</h3>
          <p>Файловая система имеет древовидную структуру (папки и файлы), которую удобно обрабатывать рекурсивно.</p>
          
          <div class="example-code">
            <pre><code>// Пример: подсчет размера директории (Node.js)
  const fs = require('fs');
  const path = require('path');
  
  function calculateDirSize(dirPath) {
    let size = 0;
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        // Рекурсивно обрабатываем поддиректории
        size += calculateDirSize(fullPath);
      } else {
        // Получаем размер файла
        const stats = fs.statSync(fullPath);
        size += stats.size;
      }
    }
    
    return size;
  }</code></pre>
          </div>
        </div>
      </div>
      
      <div class="card conclusion-section">
        <h2>Выводы</h2>
        
        <p>Рекурсивный обход объектов — мощная техника программирования, которая позволяет эффективно работать со сложными вложенными структурами данных.</p>
        
        <div class="key-points">
          <h3>Ключевые моменты:</h3>
          <ul>
            <li>Всегда проверяйте базовые случаи (null, примитивные типы)</li>
            <li>Обрабатывайте циклические ссылки</li>
            <li>Учитывайте специальные типы объектов (массивы, Date, RegExp и т.д.)</li>
            <li>Для очень глубоких структур рассмотрите итеративный подход</li>
            <li>Оптимизируйте алгоритм с учетом конкретной задачи</li>
          </ul>
        </div>
        
        <p>Освоив рекурсивный обход объектов, вы получите мощный инструмент для решения широкого спектра задач в JavaScript и других языках программирования.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Состояние анимации
  const isAnimating = ref(false);
  const animationStarted = ref(false);
  const currentStep = ref(0);
  const totalSteps = ref(13);
  const activeNodes = ref([]);
  const nodeSums = ref({});
  const callStack = ref([]);
  
  // Объяснения для каждого шага
  const explanations = [
    "Начинаем вызов функции sumNumbersInObject с корневым объектом.",
    "Проверяем свойство 'a' объекта. Это число 1, добавляем его к сумме.",
    "Проверяем свойство 'b' объекта. Это вложенный объект, рекурсивно вызываем функцию.",
    "В объекте b проверяем свойство 'c'. Это число 3, добавляем его к сумме.",
    "В объекте b проверяем свойство 'd'. Это число -10, добавляем его к сумме.",
    "В объекте b проверяем свойство 'e'. Это вложенный объект, рекурсивно вызываем функцию.",
    "В объекте e проверяем свойство 'f'. Это вложенный объект, рекурсивно вызываем функцию.",
    "В объекте f проверяем свойство 'g'. Это число 1, добавляем его к сумме.",
    "Завершаем обработку объекта f. Его сумма равна 1.",
    "Завершаем обработку объекта e. Его сумма равна 1.",
    "Завершаем обработку объекта b. Его сумма равна 3 + (-10) + 1 = -6.",
    "Завершаем обработку корневого объекта. Общая сумма равна 1 + (-6) = -5.",
    "Алгоритм завершен! Итоговая сумма всех чисел в объекте равна -5."
  ];
  
  // Текущее объяснение
  const currentExplanation = computed(() => {
    return explanations[currentStep.value];
  });
  
  // Функция для запуска анимации
  const startAnimation = () => {
    isAnimating.value = true;
    animationStarted.value = true;
    currentStep.value = 0;
    activeNodes.value = [];
    nodeSums.value = {};
    callStack.value = [];
    
    // Добавляем корневой вызов в стек
    callStack.value.push({ name: 'obj', sum: undefined });
    activeNodes.value.push('root');
    
    // Запускаем анимацию
    runAnimationStep();
  };
  
  // Функция для выполнения одного шага анимации
  const runAnimationStep = () => {
    if (currentStep.value >= totalSteps.value) {
      isAnimating.value = false;
      return;
    }
    
    // Логика визуализации для каждого шага
    switch(currentStep.value) {
      case 0:
        // Начальный вызов
        break;
      case 1:
        // Обработка свойства 'a'
        activeNodes.value.push('a');
        callStack.value[0].sum = 1;
        break;
      case 2:
        // Начинаем обработку свойства 'b'
        activeNodes.value.push('b');
        callStack.value.push({ name: 'obj.b', sum: undefined });
        break;
      case 3:
        // Обработка свойства 'c'
        activeNodes.value.push('c');
        callStack.value[callStack.value.length - 1].sum = 3;
        break;
      case 4:
        // Обработка свойства 'd'
        activeNodes.value.push('d');
        callStack.value[callStack.value.length - 1].sum = 3 + (-10);
        break;
      case 5:
        // Начинаем обработку свойства 'e'
        activeNodes.value.push('e');
        callStack.value.push({ name: 'obj.b.e', sum: undefined });
        break;
      case 6:
        // Начинаем обработку свойства 'f'
        activeNodes.value.push('f');
        callStack.value.push({ name: 'obj.b.e.f', sum: undefined });
        break;
      case 7:
        // Обработка свойства 'g'
        activeNodes.value.push('g');
        callStack.value[callStack.value.length - 1].sum = 1;
        break;
      case 8:
        // Завершаем обработку объекта f
        nodeSums.value.f = 1;
        callStack.value.pop();
        break;
      case 9:
        // Завершаем обработку объекта e
        nodeSums.value.e = 1;
        callStack.value[callStack.value.length - 1].sum = 1;
        callStack.value.pop();
        break;
      case 10:
        // Завершаем обработку объекта b
        nodeSums.value.b = -6;
        callStack.value[callStack.value.length - 1].sum = -6;
        callStack.value.pop();
        break;
      case 11:
        // Завершаем обработку корневого объекта
        nodeSums.value.root = -5;
        callStack.value[0].sum = -5;
        break;
      case 12:
        // Завершение алгоритма
        break;
    }
    
    currentStep.value++;
    
    // Задержка перед следующим шагом
    setTimeout(() => {
      runAnimationStep();
    }, 2000);
  };
  
  // Функция для сброса анимации
  const resetAnimation = () => {
    currentStep.value = 0;
    activeNodes.value = [];
    nodeSums.value = {};
    callStack.value = [];
    animationStarted.value = false;
  };
  </script>
  
  <style scoped>
  .recursive-sum {
    font-family: 'Arial', sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    color: #333;
  }
  
  .title {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
    font-size: 28px;
  }
  
  .card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    padding: 25px;
  }
  
  h2 {
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 20px;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
  }
  
  h3 {
    color: #2c3e50;
    margin-top: 25px;
    margin-bottom: 15px;
  }
  
  h4 {
    color: #2c3e50;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  .problem-statement p {
    line-height: 1.6;
  }
  
  .example-object {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 6px;
    margin: 20px 0;
  }
  
  pre {
    background-color: #2d2d2d;
    color: white;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    margin: 15px 0;
  }
  
  code {
    font-family: 'Courier New', monospace;
  }
  
  .result {
    font-weight: bold;
    color: #e74c3c;
  }
  
  /* Стили для секции алгоритма */
  .algorithm-steps {
    margin-bottom: 25px;
  }
  
  .step {
    display: flex;
    margin-bottom: 15px;
    align-items: flex-start;
  }
  
  .step-number {
    background-color: #3498db;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
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
    margin-top: 5px;
  }
  
  .solution-code {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 6px;
    margin-top: 25px;
  }
  
  /* Стили для секции анимации */
  .animation-controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 25px;
  }
  
  .btn {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .btn:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .btn:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .reset-btn {
    background-color: #e74c3c;
  }
  
  .reset-btn:hover:not(:disabled) {
    background-color: #c0392b;
  }
  
  .animation-container {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 20px;
    margin-bottom: 25px;
  }
  
  .object-tree {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 6px;
    min-height: 300px;
  }
  
  .object-node {
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    background-color: white;
    transition: all 0.3s;
  }
  
  .object-node.active {
    border-color: #3498db;
    box-shadow: 0 0 8px rgba(52, 152, 219, 0.5);
  }
  
  .node-header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
  }
  
  .node-name {
    font-weight: bold;
  }
  
  .node-type {
    color: #7f8c8d;
    font-size: 14px;
  }
  
  .node-sum {
    color: #e74c3c;
    font-weight: bold;
  }
  
  .node-children {
    padding: 10px;
    padding-left: 25px;
    border-left: 2px solid #3498db;
    margin-left: 15px;
  }
  
  .execution-stack {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 6px;
  }
  
  .stack-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 15px;
  }
  
  .stack-frame {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    animation: addToStack 0.5s ease;
  }
  
  @keyframes addToStack {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .frame-function {
    font-family: 'Courier New', monospace;
    margin-bottom: 5px;
  }
  
  .frame-result {
    color: #e74c3c;
    font-weight: bold;
  }
  
  .animation-explanation {
    background-color: #f5f7fa;
    padding: 15px;
    border-radius: 6px;
    margin-top: 20px;
    min-height: 100px;
    border-left: 4px solid #3498db;
  }
  
  /* Стили для секции подводных камней */
  .pitfall {
    margin-bottom: 30px;
    border-left: 4px solid #e74c3c;
    padding-left: 20px;
  }
  
  .example-code {
    margin: 15px 0;
  }
  
  .solution {
    background-color: #f1f9f1;
    padding: 15px;
    border-radius: 6px;
    margin-top: 15px;
    border-left: 4px solid #2ecc71;
  }
  
  /* Стили для секции практического применения */
  .use-case {
    margin-bottom: 30px;
    border-left: 4px solid #f39c12;
    padding-left: 20px;
  }
  
  /* Стили для секции выводов */
  .key-points {
    background-color: #f0f7fc;
    padding: 15px;
    border-radius: 6px;
    margin: 20px 0;
  }
  
  .key-points ul {
    padding-left: 20px;
  }
  
  .key-points li {
    margin-bottom: 10px;
    line-height: 1.6;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .animation-container {
      grid-template-columns: 1fr;
    }
  }
  </style>