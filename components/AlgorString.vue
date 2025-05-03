<template>
    <div class="algorithm-explainer">
      <h1>Решение задачи обработки массива строк</h1>
      
      <div class="task-description">
        <h2>Описание задачи</h2>
        <pre class="code">
  // Результат - строка из сконкотенированных value элементов, 
  // расположенных в обратном порядке букв, 
  // в порядке возрастания order, 
  // не содержит одинаковых букв, 
  // не содержит expired элементов
  const input = [
    { value: "abcd", order: 4, expired: false },
    { value: "qwer", order: 2, expired: true },
    { value: "xyz1", order: 1, expired: false },
    { value: "abx2", order: 3, expired: false },
  ];
  
  const getConcated = (arr) => {};
  
  console.log(getConcated(input)); // 1zyx2badc
        </pre>
      </div>
      
      <div class="algorithm-steps">
        <h2>Шаги алгоритма</h2>
        
        <div class="step-buttons">
          <button 
            v-for="(step, index) in steps" 
            :key="index"
            :class="{ active: currentStep === index }"
            @click="setStep(index)"
          >
            Шаг {{ index + 1 }}
          </button>
        </div>
        
        <div class="step-display">
          <h3>{{ steps[currentStep].title }}</h3>
          <p>{{ steps[currentStep].description }}</p>
          
          <!-- Визуализация шага -->
          <div class="visualization">
            <div v-if="currentStep === 0" class="initial-data">
              <div class="array-items">
                <div 
                  v-for="(item, index) in initialData" 
                  :key="index"
                  class="array-item"
                  :class="{ expired: item.expired }"
                >
                  <div class="item-property">
                    <span class="property-name">value:</span>
                    <span class="property-value">"{{ item.value }}"</span>
                  </div>
                  <div class="item-property">
                    <span class="property-name">order:</span>
                    <span class="property-value">{{ item.order }}</span>
                  </div>
                  <div class="item-property">
                    <span class="property-name">expired:</span>
                    <span class="property-value">{{ item.expired }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="currentStep === 1" class="filtered-data">
              <div class="array-items">
                <div 
                  v-for="(item, index) in filteredData" 
                  :key="index"
                  class="array-item"
                >
                  <div class="item-property">
                    <span class="property-name">value:</span>
                    <span class="property-value">"{{ item.value }}"</span>
                  </div>
                  <div class="item-property">
                    <span class="property-name">order:</span>
                    <span class="property-value">{{ item.order }}</span>
                  </div>
                  <div class="item-property">
                    <span class="property-name">expired:</span>
                    <span class="property-value">{{ item.expired }}</span>
                  </div>
                </div>
              </div>
              <div class="code-snippet">
                <pre>const notExpiredItems = arr.filter((item) => !item.expired);</pre>
              </div>
            </div>
            
            <div v-if="currentStep === 2" class="sorted-data">
              <div class="array-items">
                <div 
                  v-for="(item, index) in sortedData" 
                  :key="index"
                  class="array-item sorted"
                >
                  <div class="item-property">
                    <span class="property-name">value:</span>
                    <span class="property-value">"{{ item.value }}"</span>
                  </div>
                  <div class="item-property">
                    <span class="property-name">order:</span>
                    <span class="property-value highlighted">{{ item.order }}</span>
                  </div>
                </div>
              </div>
              <div class="code-snippet">
                <pre>const sortedItems = notExpiredItems.sort((a, b) => a.order - b.order);</pre>
              </div>
            </div>
            
            <div v-if="currentStep === 3" class="reversed-data">
              <div class="string-items">
                <div 
                  v-for="(item, index) in sortedData" 
                  :key="index"
                  class="string-transformation"
                >
                  <div class="original-string">
                    {{ item.value }}
                  </div>
                  <div class="transform-arrow">
                    →
                  </div>
                  <div class="reversed-string">
                    {{ reverseString(item.value) }}
                  </div>
                </div>
              </div>
              <div class="code-snippet">
                <pre>
  const reversedValues = sortedItems.map((item) => {
    return item.value.split('').reverse().join('');
  });</pre>
              </div>
            </div>
            
            <div v-if="currentStep === 4" class="concatenated-data">
              <div class="concat-process">
                <div 
                  v-for="(item, index) in sortedData" 
                  :key="index"
                  class="string-item"
                >
                  {{ reverseString(item.value) }}
                  <span v-if="index < sortedData.length - 1" class="concat-symbol">+</span>
                </div>
              </div>
              <div class="concat-result">
                <div class="concat-title">Результат конкатенации:</div>
                <div class="concat-value">{{ concatenatedString }}</div>
              </div>
              <div class="code-snippet">
                <pre>const concatenated = reversedValues.join('');</pre>
              </div>
            </div>
            
            <div v-if="currentStep === 5" class="unique-chars">
              <div class="char-processing">
                <div 
                  v-for="(char, index) in concatenatedChars" 
                  :key="index"
                  class="char-item"
                  :class="{
                    'duplicate': isDuplicate(char, index),
                    'is-kept': !isDuplicate(char, index)
                  }"
                >
                  {{ char }}
                </div>
              </div>
              <div class="chars-result">
                <div class="result-title">Результат (только уникальные символы):</div>
                <div class="result-value">{{ uniqueCharsString }}</div>
              </div>
              <div class="code-snippet">
                <pre>
  // Удаление дубликатов символов
  const uniqueChars = new Set();
  let result = '';
  
  for (const char of concatenated) {
    if (!uniqueChars.has(char)) {
      uniqueChars.add(char);
      result += char;
    }
  }</pre>
              </div>
            </div>
            
            <div v-if="currentStep === 6" class="final-solution">
              <div class="solution-code">
                <h3>Полное решение</h3>
                <pre class="code">
  const getConcated = (arr) => {
    // 1. Фильтрация по expired
    const notExpiredItems = arr.filter((item) => !item.expired);
    
    // 2. Сортировка по order
    const sortedItems = notExpiredItems.sort((a, b) => a.order - b.order);
    
    // 3. Обратный порядок букв и конкатенация
    const reversedValues = sortedItems.map((item) => {
      return item.value.split('').reverse().join('');
    });
    
    const concatenated = reversedValues.join('');
    
    // 4. Удаление дубликатов символов с использованием Set
    const uniqueChars = new Set();
    let result = '';
    
    for (const char of concatenated) {
      if (!uniqueChars.has(char)) {
        uniqueChars.add(char);
        result += char;
      }
    }
    
    return result;
  };</pre>
              </div>
              <div class="result-output">
                <div class="output-title">Вывод функции:</div>
                <div class="output-value">getConcated(input) → {{ uniqueCharsString }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="algorithm-analysis">
        <h2>Анализ алгоритма</h2>
        
        <div class="complexity">
          <h3>Временная сложность</h3>
          <ul>
            <li><strong>Фильтрация:</strong> O(n), где n - количество элементов в массиве</li>
            <li><strong>Сортировка:</strong> O(n log n) - стандартная сложность сортировки</li>
            <li><strong>Обращение строк:</strong> O(m), где m - общее количество символов во всех строках</li>
            <li><strong>Удаление дубликатов:</strong> O(m) с использованием Set</li>
            <li><strong>Общая сложность:</strong> O(n log n + m) - доминирует сортировка и обработка символов</li>
          </ul>
        </div>
        
        <div class="edge-cases">
          <h3>Подводные камни и особые случаи</h3>
          <ul>
            <li>
              <strong>Пустой массив:</strong> Если входной массив пуст, функция вернет пустую строку, что является корректным поведением.
            </li>
            <li>
              <strong>Все элементы expired:</strong> Если все элементы имеют expired: true, функция также вернет пустую строку.
            </li>
            <li>
              <strong>Одинаковые значения order:</strong> При одинаковых order может возникнуть неопределенное поведение сортировки. 
              В нашем решении порядок между элементами с одинаковым order может быть непредсказуемым.
            </li>
            <li>
              <strong>Отрицательные order:</strong> Алгоритм корректно обрабатывает отрицательные значения order.
            </li>
            <li>
              <strong>Чувствительность к регистру:</strong> Алгоритм считает 'a' и 'A' разными символами, что может быть неожиданным.
            </li>
            <li>
              <strong>Обработка пробелов и спецсимволов:</strong> Все символы обрабатываются одинаково, включая пробелы и спецсимволы.
            </li>
          </ul>
        </div>
        
        <div class="optimization">
          <h3>Возможные оптимизации</h3>
          <ul>
            <li>
              <strong>Использование Set вместо includes:</strong> Проверка наличия символа через Set имеет сложность O(1), 
              в то время как использование метода string.includes() имеет сложность O(n).
            </li>
            <li>
              <strong>Раннее удаление дубликатов:</strong> Можно удалять дубликаты в процессе реверсирования строк, 
              но это может усложнить код и затруднить понимание алгоритма.
            </li>
            <li>
              <strong>Объединение операций:</strong> Можно объединить фильтрацию, сортировку и реверсирование в один проход, 
              но это также снизит читаемость кода.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Исходные данные
  const initialData = [
    { value: "abcd", order: 4, expired: false },
    { value: "qwer", order: 2, expired: true },
    { value: "xyz1", order: 1, expired: false },
    { value: "abx2", order: 3, expired: false },
  ];
  
  // Текущий шаг алгоритма
  const currentStep = ref(0);
  
  // Шаги алгоритма
  const steps = [
    {
      title: "Исходные данные",
      description: "Мы начинаем с массива объектов, каждый из которых содержит строку value, числовой порядок order и флаг expired, указывающий, нужно ли включать этот элемент в результат."
    },
    {
      title: "Фильтрация expired элементов",
      description: "Сначала отфильтруем элементы с expired: true, так как они не должны быть включены в результат."
    },
    {
      title: "Сортировка по order",
      description: "Теперь отсортируем отфильтрованные элементы по возрастанию их свойства order."
    },
    {
      title: "Обратный порядок букв",
      description: "Для каждого элемента массива переворачиваем символы в строке value."
    },
    {
      title: "Конкатенация строк",
      description: "Соединяем все перевернутые строки в одну длинную строку."
    },
    {
      title: "Удаление дубликатов символов",
      description: "Проходим по конкатенированной строке и удаляем повторяющиеся символы, оставляя только первое вхождение каждого символа."
    },
    {
      title: "Итоговое решение",
      description: "Полная реализация функции getConcated с объяснением ключевых частей алгоритма."
    }
  ];
  
  // Функция для установки текущего шага
  const setStep = (step) => {
    currentStep.value = step;
  };
  
  // Вычисляемые свойства для визуализации
  const filteredData = computed(() => {
    return initialData.filter(item => !item.expired);
  });
  
  const sortedData = computed(() => {
    return [...filteredData.value].sort((a, b) => a.order - b.order);
  });
  
  // Функция для обращения символов в строке
  const reverseString = (str) => {
    return str.split('').reverse().join('');
  };
  
  // Конкатенированная строка
  const concatenatedString = computed(() => {
    return sortedData.value.map(item => reverseString(item.value)).join('');
  });
  
  // Массив символов для визуализации обработки дубликатов
  const concatenatedChars = computed(() => {
    return concatenatedString.value.split('');
  });
  
  // Проверка, является ли символ дубликатом
  const isDuplicate = (char, index) => {
    return concatenatedString.value.indexOf(char) < index;
  };
  
  // Строка с уникальными символами
  const uniqueCharsString = computed(() => {
    const uniqueChars = new Set();
    let result = '';
    
    for (const char of concatenatedString.value) {
      if (!uniqueChars.has(char)) {
        uniqueChars.add(char);
        result += char;
      }
    }
    
    return result;
  });
  </script>
  
  <style scoped>
  .algorithm-explainer {
    font-family: 'Arial', sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    color: #333;
  }
  
  h1, h2, h3 {
    color: #2c3e50;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 30px;
  }
  
  h2 {
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-top: 40px;
  }
  
  .task-description {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.05);
    margin-bottom: 30px;
  }
  
  .code {
    background-color: #282c34;
    color: #abb2bf;
    padding: 15px;
    border-radius: 5px;
    font-family: 'Courier New', monospace;
    overflow-x: auto;
    font-size: 14px;
    line-height: 1.5;
  }
  
  .step-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .step-buttons button {
    padding: 10px 15px;
    background-color: #f1f1f1;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .step-buttons button:hover {
    background-color: #e9e9e9;
  }
  
  .step-buttons button.active {
    background-color: #3498db;
    color: white;
    border-color: #2980b9;
  }
  
  .step-display {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.05);
    margin-bottom: 30px;
  }
  
  .visualization {
    margin-top: 20px;
    min-height: 300px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 5px;
    border: 1px solid #e9ecef;
  }
  
  .array-items {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .array-item {
    padding: 15px;
    background-color: #e3f2fd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    flex: 1;
    min-width: 150px;
    transition: all 0.3s;
  }
  
  .array-item.expired {
    background-color: #ffebee;
    opacity: 0.7;
  }
  
  .array-item.sorted {
    background-color: #e8f5e9;
  }
  
  .item-property {
    margin-bottom: 8px;
  }
  
  .property-name {
    font-weight: bold;
    margin-right: 5px;
  }
  
  .property-value {
    color: #e91e63;
  }
  
  .property-value.highlighted {
    background-color: yellow;
    padding: 2px 5px;
    border-radius: 3px;
  }
  
  .code-snippet {
    margin-top: 20px;
    background-color: #282c34;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
  }
  
  .code-snippet pre {
    color: #abb2bf;
    font-family: 'Courier New', monospace;
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
  }
  
  .string-items {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .string-transformation {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .original-string, .reversed-string {
    padding: 8px 15px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    flex: 1;
    text-align: center;
  }
  
  .original-string {
    background-color: #ffebee;
  }
  
  .reversed-string {
    background-color: #e8f5e9;
  }
  
  .transform-arrow {
    margin: 0 20px;
    font-size: 24px;
    color: #3498db;
  }
  
  .concat-process {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 30px;
  }
  
  .string-item {
    padding: 10px 15px;
    background-color: #e3f2fd;
    border-radius: 5px;
    font-family: 'Courier New', monospace;
  }
  
  .concat-symbol {
    font-size: 20px;
    font-weight: bold;
    color: #3498db;
  }
  
  .concat-result, .chars-result, .result-output {
    margin-top: 20px;
    padding: 15px;
    background-color: #f1f8e9;
    border-radius: 5px;
    border-left: 4px solid #8bc34a;
  }
  
  .concat-title, .result-title, .output-title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .concat-value, .result-value, .output-value {
    font-family: 'Courier New', monospace;
    padding: 10px;
    background-color: #fff;
    border-radius: 4px;
    word-break: break-all;
  }
  
  .char-processing {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 30px;
  }
  
  .char-item {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e3f2fd;
    border-radius: 5px;
    font-family: 'Courier New', monospace;
    font-size: 18px;
    transition: all 0.3s;
  }
  
  .char-item.duplicate {
    background-color: #ffebee;
    text-decoration: line-through;
    opacity: 0.7;
  }
  
  .char-item.is-kept {
    background-color: #e8f5e9;
    font-weight: bold;
  }
  
  .solution-code {
    margin-bottom: 30px;
  }
  
  .solution-code h3 {
    margin-top: 0;
  }
  
  .algorithm-analysis ul {
    padding-left: 20px;
  }
  
  .algorithm-analysis li {
    margin-bottom: 10px;
    line-height: 1.6;
  }
  
  .complexity, .edge-cases, .optimization {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.05);
    margin-bottom: 30px;
  }
  
  .complexity h3, .edge-cases h3, .optimization h3 {
    margin-top: 0;
    color: #3498db;
  }
  
  @media (max-width: 768px) {
    .array-items, .char-processing {
      flex-direction: column;
    }
    
    .array-item {
      min-width: auto;
    }
    
    .string-transformation {
      flex-direction: column;
      gap: 10px;
    }
    
    .transform-arrow {
      transform: rotate(90deg);
      margin: 10px 0;
    }
  }
  </style>