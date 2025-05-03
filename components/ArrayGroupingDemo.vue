<template>
    <div class="array-grouping-demo">
      <h1>Группировка массива объектов по ключу</h1>
      
      <div class="task-description">
        <h2>Задача:</h2>
        <p>У нас есть массив объектов с ключами <code>type</code> и <code>weight</code>. Нам нужно реализовать функцию, которая сгруппирует элементы по <code>type</code> двумя способами:</p>
        <ol>
          <li>Вернуть объект с ключами <code>type</code>, где значение - массив элементов с таким типом</li>
          <li>Вернуть объект с ключами <code>type</code>, где значение - объект вида <code>{count: количество, weight: суммарный вес}</code></li>
        </ol>
      </div>
      
      <!-- Отображение исходного массива -->
      <div class="input-array">
        <h2>Исходный массив:</h2>
        <div class="array-display">
          <div v-for="(item, index) in inputArray" :key="index" class="array-item">
            <div class="item-type">{{ item.type }}</div>
            <div class="item-weight">{{ item.weight }}</div>
          </div>
        </div>
      </div>
      
      <!-- Выбор режима группировки -->
      <div class="grouping-mode">
        <h2>Выберите режим группировки:</h2>
        <div class="mode-selector">
          <button 
            :class="{ active: selectedMode === 'arrays' }"
            @click="selectedMode = 'arrays'"
          >
            Группировка в массивы
          </button>
          <button 
            :class="{ active: selectedMode === 'stats' }"
            @click="selectedMode = 'stats'"
          >
            Группировка со статистикой
          </button>
        </div>
      </div>
      
      <!-- Визуализация алгоритма -->
      <div class="algorithm-visualization">
        <h2>Визуализация алгоритма:</h2>
        
        <div class="control-panel">
          <button @click="startAnimation" :disabled="isAnimating">
            {{ isAnimating ? 'Анимация идет...' : 'Запустить анимацию' }}
          </button>
          <button @click="resetAnimation" :disabled="isAnimating || currentStep === 0">Сбросить</button>
          <div class="steps-counter">Шаг: {{ currentStep }} / {{ inputArray.length }}</div>
        </div>
        
        <div class="visualization-container">
          <!-- Текущий обрабатываемый элемент -->
          <div class="current-item" v-if="currentStep > 0 && currentStep <= inputArray.length">
            <h3>Текущий элемент (шаг {{ currentStep }}):</h3>
            <div class="array-item active">
              <div class="item-type">{{ inputArray[currentStep - 1].type }}</div>
              <div class="item-weight">{{ inputArray[currentStep - 1].weight }}</div>
            </div>
          </div>
          
          <!-- Результат -->
          <div class="result-container">
            <h3>Результат:</h3>
            <div class="result-object">
              <template v-if="selectedMode === 'arrays'">
                <div v-for="(group, type) in currentResultArrays" :key="type" class="result-group">
                  <div class="group-type">{{ type }}:</div>
                  <div class="group-value">
                    <div v-for="(item, index) in group" :key="index" class="group-item"
                         :class="{ highlight: isHighlighted(item) }">
                      { type: "{{ item.type }}", weight: {{ item.weight }} }
                    </div>
                  </div>
                </div>
              </template>
              
              <template v-else>
                <div v-for="(stats, type) in currentResultStats" :key="type" class="result-group">
                  <div class="group-type">{{ type }}:</div>
                  <div class="group-value">
                    { count: {{ stats.count }}, weight: {{ stats.weight }} }
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Объяснение алгоритма -->
      <div class="algorithm-explanation">
        <h2>Объяснение алгоритма:</h2>
        <div class="code-section">
          <h3>Реализация функции группировки в массивы:</h3>
          <pre><code>const groupByType = (arr) => {
    return arr.reduce((result, item) => {
      // Если ключа с текущим типом еще нет в результате, создаем массив
      if (!result[item.type]) {
        result[item.type] = [];
      }
      
      // Добавляем текущий элемент в массив соответствующего типа
      result[item.type].push(item);
      
      return result;
    }, {});
  };</code></pre>
        </div>
        
        <div class="code-section">
          <h3>Реализация функции группировки со статистикой:</h3>
          <pre><code>const groupByTypeWithStats = (arr) => {
    return arr.reduce((result, item) => {
      // Если ключа с текущим типом еще нет в результате, инициализируем
      if (!result[item.type]) {
        result[item.type] = { count: 0, weight: 0 };
      }
      
      // Увеличиваем счетчик и добавляем вес
      result[item.type].count++;
      result[item.type].weight += item.weight;
      
      return result;
    }, {});
  };</code></pre>
        </div>
        
        <div class="explanation-steps">
          <h3>Как работает алгоритм:</h3>
          <ol>
            <li>
              <strong>Мы используем метод reduce():</strong> Он позволяет нам преобразовать массив в другой тип данных (в нашем случае в объект).
            </li>
            <li>
              <strong>Начинаем с пустого объекта:</strong> Второй параметр reduce - пустой объект {}, который будет нашим аккумулятором.
            </li>
            <li>
              <strong>Для каждого элемента массива:</strong>
              <ul>
                <li>Проверяем, существует ли уже в результате ключ с типом текущего элемента</li>
                <li>Если нет - создаем его с начальным значением (пустой массив или объект с нулевыми счетчиками)</li>
                <li>Добавляем информацию о текущем элементе в соответствующую группу</li>
              </ul>
            </li>
            <li>
              <strong>Возвращаем аккумулятор:</strong> После обработки всех элементов массива, наш аккумулятор содержит все данные, сгруппированные нужным образом.
            </li>
          </ol>
        </div>
      </div>
      
      <!-- Подводные камни и альтернативные подходы -->
      <div class="pitfalls-and-alternatives">
        <h2>Подводные камни и альтернативные подходы:</h2>
        
        <div class="pitfalls">
          <h3>Возможные проблемы при реализации:</h3>
          <ul>
            <li>
              <strong>Мутация исходных данных:</strong> Наша функция не должна изменять исходный массив. В примере мы работаем с копиями объектов, но при более сложной логике нужно следить за неизменяемостью входных данных.
            </li>
            <li>
              <strong>Типы ключей объекта:</strong> Ключи объекта в JavaScript всегда преобразуются в строки. Если вы группируете по сложным ключам, это может привести к неожиданным результатам.
            </li>
            <li>
              <strong>Ссылки на объекты:</strong> При группировке объектов в массивы, вы сохраняете ссылки на исходные объекты. Изменение этих объектов после группировки изменит и результат.
            </li>
            <li>
              <strong>Числовые операции:</strong> При суммировании весов будьте внимательны к точности чисел с плавающей точкой в JavaScript.
            </li>
            <li>
              <strong>Производительность:</strong> Для очень больших массивов операция reduce может быть менее эффективной, чем простой цикл for.
            </li>
          </ul>
        </div>
        
        <div class="alternatives">
          <h3>Альтернативные подходы:</h3>
          
          <div class="alternative">
            <h4>1. Использование объекта Map вместо обычного объекта:</h4>
            <pre><code>const groupByTypeWithMap = (arr) => {
    const map = new Map();
    
    for (const item of arr) {
      if (!map.has(item.type)) {
        map.set(item.type, []);
      }
      
      map.get(item.type).push(item);
    }
    
    return map;
  };</code></pre>
            <p>Преимущество: Map может иметь ключи любого типа, а не только строки, как в обычном объекте.</p>
          </div>
          
          <div class="alternative">
            <h4>2. Использование forEach вместо reduce:</h4>
            <pre><code>const groupByTypeWithForEach = (arr) => {
    const result = {};
    
    arr.forEach(item => {
      if (!result[item.type]) {
        result[item.type] = [];
      }
      
      result[item.type].push(item);
    });
    
    return result;
  };</code></pre>
            <p>Более понятный подход для тех, кто не привык к функциональному программированию.</p>
          </div>
          
          <div class="alternative">
            <h4>3. Использование библиотеки lodash:</h4>
            <pre><code>// С использованием библиотеки lodash
  import _ from 'lodash';
  
  const groupByTypeWithLodash = (arr) => {
    return _.groupBy(arr, 'type');
  };</code></pre>
            <p>Самый лаконичный вариант, если в проекте уже используется lodash.</p>
          </div>
          
          <div class="alternative">
            <h4>4. Object.groupBy (новая экспериментальная функция):</h4>
            <pre><code>// Новая функция в JavaScript (Stage 3 proposal)
  const groupByTypeWithObjectGroupBy = (arr) => {
    return Object.groupBy(arr, item => item.type);
  };</code></pre>
            <p>Примечание: Эта функция пока не поддерживается во всех браузерах и средах.</p>
          </div>
        </div>
      </div>
      
      <!-- Практический раздел -->
      <div class="practice-section">
        <h2>Практика:</h2>
        <p>Попробуйте изменить исходный массив и увидеть результат группировки:</p>
        
        <div class="input-editor">
          <textarea 
            v-model="customInputJSON" 
            @input="updateCustomInput"
            placeholder="Введите массив в формате JSON"
            rows="8"
          ></textarea>
          <div v-if="jsonError" class="error-message">{{ jsonError }}</div>
        </div>
        
        <div class="result-preview" v-if="!jsonError && customInput.length > 0">
          <h3>Результат группировки:</h3>
          <div class="result-tabs">
            <button 
              :class="{ active: activeResultTab === 'arrays' }"
              @click="activeResultTab = 'arrays'"
            >
              В массивы
            </button>
            <button 
              :class="{ active: activeResultTab === 'stats' }"
              @click="activeResultTab = 'stats'"
            >
              Со статистикой
            </button>
          </div>
          
          <pre><code>{{ activeResultTab === 'arrays' ? 
            JSON.stringify(groupCustomArrays, null, 2) : 
            JSON.stringify(groupCustomStats, null, 2) }}</code></pre>
        </div>
      </div>
      
      <!-- Заключение -->
      <div class="conclusion">
        <h2>Заключение:</h2>
        <p>Группировка данных — это очень частая задача в программировании. Метод <code>reduce</code> в JavaScript предоставляет мощный и элегантный способ для трансформации массивов в другие структуры данных.</p>
        <p>Подход, описанный здесь, может быть адаптирован для группировки по нескольким ключам, вложенной группировки или более сложных агрегаций данных.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        inputArray: [
          { type: "banana", weight: 32 },
          { type: "apple", weight: 24 },
          { type: "kiwi", weight: 55 },
          { type: "banana", weight: 44 },
          { type: "orange", weight: 5 },
        ],
        selectedMode: 'arrays', // 'arrays' или 'stats'
        currentStep: 0,
        isAnimating: false,
        animationSpeed: 1500, // миллисекунды
        currentResultArrays: {},
        currentResultStats: {},
        lastAddedItem: null,
        customInputJSON: '',
        customInput: [],
        jsonError: null,
        activeResultTab: 'arrays'
      };
    },
    computed: {
      // Результат группировки пользовательского ввода в массивы
      groupCustomArrays() {
        return this.groupByType(this.customInput);
      },
      // Результат группировки пользовательского ввода со статистикой
      groupCustomStats() {
        return this.groupByTypeWithStats(this.customInput);
      }
    },
    methods: {
      // Запуск анимации алгоритма
      startAnimation() {
        if (this.isAnimating) return;
        
        this.resetAnimation();
        this.isAnimating = true;
        
        // Функция для анимации одного шага
        const animateStep = () => {
          if (this.currentStep >= this.inputArray.length) {
            this.isAnimating = false;
            return;
          }
          
          this.currentStep++;
          const currentItem = this.inputArray[this.currentStep - 1];
          this.lastAddedItem = currentItem;
          
          // Обновляем результат в зависимости от выбранного режима
          if (this.selectedMode === 'arrays') {
            this.updateResultArrays(currentItem);
          } else {
            this.updateResultStats(currentItem);
          }
          
          // Планируем следующий шаг
          setTimeout(() => {
            this.lastAddedItem = null;
            if (this.currentStep < this.inputArray.length) {
              setTimeout(animateStep, this.animationSpeed);
            } else {
              this.isAnimating = false;
            }
          }, this.animationSpeed / 2);
        };
        
        // Начинаем анимацию
        animateStep();
      },
      
      // Сброс анимации
      resetAnimation() {
        this.currentStep = 0;
        this.currentResultArrays = {};
        this.currentResultStats = {};
        this.lastAddedItem = null;
      },
      
      // Обновление результата группировки в массивы
      updateResultArrays(item) {
        // Создаем копию объекта, чтобы не мутировать состояние напрямую
        const newResult = { ...this.currentResultArrays };
        
        if (!newResult[item.type]) {
          newResult[item.type] = [];
        }
        
        newResult[item.type] = [...newResult[item.type], item];
        
        this.currentResultArrays = newResult;
      },
      
      // Обновление результата группировки со статистикой
      updateResultStats(item) {
        // Создаем копию объекта
        const newResult = JSON.parse(JSON.stringify(this.currentResultStats));
        
        if (!newResult[item.type]) {
          newResult[item.type] = { count: 0, weight: 0 };
        }
        
        newResult[item.type].count++;
        newResult[item.type].weight += item.weight;
        
        this.currentResultStats = newResult;
      },
      
      // Проверка, является ли элемент последним добавленным
      isHighlighted(item) {
        return this.lastAddedItem && 
          this.lastAddedItem.type === item.type && 
          this.lastAddedItem.weight === item.weight;
      },
      
      // Обновление пользовательского ввода
      updateCustomInput() {
        try {
          const parsed = JSON.parse(this.customInputJSON);
          if (Array.isArray(parsed)) {
            this.customInput = parsed;
            this.jsonError = null;
          } else {
            this.jsonError = "Введенные данные должны быть массивом";
          }
        } catch (e) {
          this.jsonError = "Некорректный JSON формат" + e.message;
        }
      },
      
      // Функция группировки в массивы
      groupByType(arr) {
        return arr.reduce((result, item) => {
          if (!result[item.type]) {
            result[item.type] = [];
          }
          
          result[item.type].push(item);
          
          return result;
        }, {});
      },
      
      // Функция группировки со статистикой
      groupByTypeWithStats(arr) {
        return arr.reduce((result, item) => {
          if (!result[item.type]) {
            result[item.type] = { count: 0, weight: 0 };
          }
          
          result[item.type].count++;
          result[item.type].weight += item.weight;
          
          return result;
        }, {});
      }
    },
    created() {
      // Инициализация пользовательского ввода
      this.customInputJSON = JSON.stringify(this.inputArray, null, 2);
      this.customInput = [...this.inputArray];
    }
  };
  </script>
  
  <style scoped>
  .array-grouping-demo {
    max-width: 1000px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
  }
  
  h2 {
    color: #3498db;
    border-bottom: 2px solid #3498db;
    padding-bottom: 5px;
    margin-top: 30px;
  }
  
  h3 {
    color: #2c3e50;
    margin-top: 20px;
  }
  
  h4 {
    color: #16a085;
  }
  
  /* Стили для отображения массива */
  .array-display {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin: 20px 0;
  }
  
  .array-item {
    display: flex;
    flex-direction: column;
    width: 120px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .array-item.active {
    background-color: #d4edda;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }
  
  .item-type {
    font-weight: bold;
    color: #e74c3c;
    font-size: 1.1em;
    margin-bottom: 8px;
  }
  
  .item-weight {
    font-size: 0.9em;
    color: #7f8c8d;
  }
  
  /* Стили для выбора режима */
  .mode-selector {
    display: flex;
    gap: 15px;
    margin: 20px 0;
  }
  
  .mode-selector button {
    padding: 10px 20px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .mode-selector button.active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }
  
  /* Стили для визуализации алгоритма */
  .control-panel {
    display: flex;
    gap: 15px;
    margin: 20px 0;
    align-items: center;
  }
  
  .control-panel button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .control-panel button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .steps-counter {
    margin-left: auto;
    font-weight: bold;
  }
  
  .visualization-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
    margin: 20px 0;
    min-height: 200px;
  }
  
  .result-container {
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 20px;
    background-color: #f8f9fa;
  }
  
  .result-group {
    margin-bottom: 15px;
  }
  
  .group-type {
    font-weight: bold;
    color: #3498db;
    margin-bottom: 5px;
  }
  
  .group-value {
    padding-left: 15px;
    font-family: monospace;
  }
  
  .group-item {
    margin-bottom: 5px;
    padding: 5px;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .group-item.highlight {
    background-color: #d4edda;
  }
  
  /* Стили для кода */
  .code-section {
    margin-bottom: 30px;
  }
  
  pre {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #3498db;
    overflow-x: auto;
  }
  
  code {
    font-family: 'Courier New', Courier, monospace;
  }
  
  /* Стили для редактора ввода */
  .input-editor {
    margin: 20px 0;
  }
  
  textarea {
    width: 100%;
    padding: 15px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    font-family: 'Courier New', Courier, monospace;
    resize: vertical;
  }
  
  .error-message {
    color: #e74c3c;
    margin-top: 10px;
  }
  
  /* Стили для превью результата */
  .result-preview {
    margin: 20px 0;
  }
  
  .result-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .result-tabs button {
    padding: 8px 15px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .result-tabs button.active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }
  
  /* Медиа-запросы для адаптивности */
  @media (max-width: 768px) {
    .visualization-container {
      grid-template-columns: 1fr;
    }
    
    .array-display {
      justify-content: center;
    }
  }
  </style>