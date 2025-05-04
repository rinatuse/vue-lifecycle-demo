<template>
    <div class="string-deduplicator">
      <h1>Удаление повторяющихся символов 🔍</h1>
      
      <div class="task-description">
        <h2>Задача</h2>
        <p>Написать функцию, которая убирает повторяющиеся символы из строки, оставляя только один экземпляр каждого символа из последовательности одинаковых символов.</p>
        
        <div class="example-box">
          <div class="input-string">
            <div class="label">Исходная строка:</div>
            <div class="value">{{ originalString }}</div>
          </div>
          <div class="output-string">
            <div class="label">Ожидаемый результат:</div> 
            <div class="value">{{ expectedResult }}</div>
          </div>
        </div>
      </div>
  
      <div class="algorithm-section">
        <h2>Алгоритм решения</h2>
        
        <div class="approach-tabs">
          <button 
            v-for="(approach, index) in approaches" 
            :key="approach.id"
            :class="['tab-btn', { active: currentApproach === index }]"
            @click="setApproach(index)"
          >
            {{ approach.title }}
          </button>
        </div>
        
        <div class="approach-content">
          <h3>{{ approaches[currentApproach].title }}</h3>
          <p>{{ approaches[currentApproach].description }}</p>
          
          <div class="code-block">
            <pre><code>{{ approaches[currentApproach].code }}</code></pre>
          </div>
  
          <div class="algorithm-explanation">
            <h4>Как это работает:</h4>
            <p>{{ approaches[currentApproach].explanation }}</p>
            
            <div class="complexity">
              <div class="time">
                <span class="label">Временная сложность:</span>
                <span class="value">{{ approaches[currentApproach].timeComplexity }}</span>
              </div>
              <div class="space">
                <span class="label">Пространственная сложность:</span>
                <span class="value">{{ approaches[currentApproach].spaceComplexity }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="visualization-section">
        <h2>Визуализация</h2>
        <p>Давайте посмотрим, как работает алгоритм, шаг за шагом 👇</p>
        
        <div class="visualization-controls">
          <button @click="startVisualization" :disabled="isVisualizing">Запустить</button>
          <button @click="resetVisualization" :disabled="!canReset">Сбросить</button>
          <div class="speed-control">
            <label for="speed">Скорость:</label>
            <input 
              type="range" 
              id="speed" 
              v-model="visualizationSpeed" 
              min="1" 
              max="10" 
              :disabled="isVisualizing"
            >
          </div>
        </div>
        
        <div class="visualization-container">
          <div class="chars-container">
            <div 
              v-for="(charObj, index) in visualizationChars" 
              :key="index" 
              class="char-box" 
              :class="{
                'current': charObj.isCurrent,
                'processed': charObj.isProcessed,
                'skipped': charObj.isSkipped,
                'result-char': charObj.inResult
              }"
            >
              {{ charObj.char }}
            </div>
          </div>
          
          <div class="result-string">
            <div class="label">Результат:</div>
            <div class="value">{{ visualizationResult }}</div>
          </div>
          
          <div class="explanation-box" v-if="currentStepExplanation">
            <div class="step-number">Шаг {{ currentStep + 1 }}</div>
            <div class="step-explanation">{{ currentStepExplanation }}</div>
          </div>
        </div>
      </div>
      
      <div class="interactive-section">
        <h2>Попробуйте сами!</h2>
        <div class="input-container">
          <label for="custom-input">Введите строку с повторяющимися символами:</label>
          <input 
            type="text" 
            id="custom-input" 
            v-model="userInput" 
            placeholder="Например: Пррриииветтт!!!"
          >
        </div>
        
        <div class="output-container" v-if="userInput">
          <div class="original">
            <span class="label">Исходная строка:</span>
            <span class="value">{{ userInput }}</span>
          </div>
          <div class="processed">
            <span class="label">Результат:</span>
            <span class="value">{{ processUserInput() }}</span>
          </div>
        </div>
      </div>
  
      <div class="real-world-section">
        <h2>Практическое применение</h2>
        <p>Эта задача может выглядеть простой, но алгоритм удаления повторяющихся символов имеет множество практических применений:</p>
        
        <div class="use-cases">
          <div class="use-case" v-for="(useCase, index) in useCases" :key="index">
            <div class="use-case-icon">{{ useCase.icon }}</div>
            <div class="use-case-content">
              <h4>{{ useCase.title }}</h4>
              <p>{{ useCase.description }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="edge-cases-section">
        <h2>Особые случаи и подводные камни</h2>
        
        <div class="edge-cases">
          <div class="edge-case" v-for="(edgeCase, index) in edgeCases" :key="index">
            <div class="edge-case-title">{{ edgeCase.title }}</div>
            <div class="edge-case-example">
              <div class="input">Вход: <code>{{ edgeCase.input }}</code></div>
              <div class="output">Выход: <code>{{ edgeCase.output }}</code></div>
            </div>
            <div class="edge-case-explanation">{{ edgeCase.explanation }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StringDeduplicator',
    data() {
      return {
        originalString: "Кккоооот Бааарссиккк зззапрыыгнннул   наааа зааабоооррррр",
        expectedResult: "Кот Барсик запрыгнул на забор",
        currentApproach: 0,
        userInput: "",
        
        // Визуализация
        isVisualizing: false,
        visualizationSpeed: 5,
        visualizationResult: "",
        visualizationChars: [],
        currentStep: 0,
        stepTimer: null,
        canReset: false,
        
        approaches: [
          {
            id: "simple-loop",
            title: "Итеративный подход",
            description: "Самый прямолинейный способ решения — проходить по строке и добавлять символ в результат, только если он отличается от предыдущего.",
            code: 
  `function removeRepeats(str) {
    if (!str) return "";
    
    let result = str[0]; // Берем первый символ
    
    for (let i = 1; i < str.length; i++) {
      // Если текущий символ отличается от предыдущего, добавляем его
      if (str[i] !== str[i-1]) {
        result += str[i];
      }
    }
    
    return result;
  }`,
            explanation: "Мы начинаем с первого символа строки, затем проходим по остальным символам. На каждом шаге сравниваем текущий символ с предыдущим. Если они различаются, добавляем текущий символ к результату. Этот подход очень эффективен, так как мы делаем только один проход по строке.",
            timeComplexity: "O(n), где n — длина строки",
            spaceComplexity: "O(n) в худшем случае для результирующей строки"
          },
          {
            id: "regex",
            title: "Регулярные выражения",
            description: "Можно использовать регулярные выражения для поиска и замены повторяющихся символов.",
            code: 
  `function removeRepeats(str) {
    // Регулярное выражение ищет один или более одинаковых символов
    // и заменяет всю группу на первый символ из группы
    return str.replace(/(.)\\1+/g, '$1');
  }`,
            explanation: "Регулярное выражение /(.)\\1+/g ищет любой символ (.), за которым следует один или более таких же символов (\\1+), и заменяет всю эту последовательность на первый найденный символ ($1). Флаг g означает, что мы ищем все такие последовательности в строке, а не только первую.",
            timeComplexity: "O(n), где n — длина строки, но с большим константным множителем из-за работы движка регулярных выражений",
            spaceComplexity: "O(n) для результирующей строки"
          },
          {
            id: "functional",
            title: "Функциональный подход",
            description: "Используя функциональное программирование, мы можем решить задачу с помощью методов массивов, что делает код более декларативным.",
            code:
  `function removeRepeats(str) {
    return str.split('').reduce((result, char, index, array) => {
      // Добавляем символ, если он первый или отличается от предыдущего
      if (index === 0 || char !== array[index-1]) {
        return result + char;
      }
      return result;
    }, '');
  }`,
            explanation: "Мы преобразуем строку в массив символов с помощью split(''), затем используем reduce для построения результата. На каждой итерации мы добавляем текущий символ к результату только если он первый или отличается от предыдущего. Этот подход более декларативный и может быть легче для понимания программистам, привыкшим к функциональному стилю.",
            timeComplexity: "O(n), где n — длина строки",
            spaceComplexity: "O(n) для массива символов и результирующей строки"
          },
          {
            id: "two-pointers",
            title: "Два указателя",
            description: "Используя технику двух указателей, мы можем решить задачу без создания дополнительной строки для результата.",
            code:
  `function removeRepeats(str) {
    // Преобразуем строку в массив символов для работы
    const chars = str.split('');
    
    // Указатель для новой позиции символов (без повторов)
    let writeIndex = 1;
    
    // Проходим по массиву с индекса 1
    for (let readIndex = 1; readIndex < chars.length; readIndex++) {
      // Если текущий символ отличается от предыдущего
      if (chars[readIndex] !== chars[readIndex - 1]) {
        // Записываем его на позицию writeIndex
        chars[writeIndex] = chars[readIndex];
        writeIndex++;
      }
    }
    
    // Возвращаем обрезанный массив, преобразованный в строку
    return chars.slice(0, writeIndex).join('');
  }`,
            explanation: "Этот метод использует технику двух указателей: readIndex для чтения исходного массива и writeIndex для записи уникальных символов. Мы проходим по массиву символов и записываем символ только если он отличается от предыдущего. В конце возвращаем подмассив с уникальными символами. Этот алгоритм особенно эффективен при работе с массивами символов или когда нужно модифицировать массив на месте.",
            timeComplexity: "O(n), где n — длина строки",
            spaceComplexity: "O(n) для массива символов"
          }
        ],
        
        useCases: [
          {
            icon: "⌨️",
            title: "Исправление ошибок ввода",
            description: "Когда пользователь случайно зажимает клавишу слишком долго, появляются лишние символы. Этот алгоритм помогает исправить такие ошибки."
          },
          {
            icon: "📝",
            title: "Обработка текста после OCR",
            description: "При распознавании текста с изображений или сканов часто возникают повторяющиеся символы из-за шума или некачественного изображения."
          },
          {
            icon: "🗜️",
            title: "Предварительная обработка для сжатия данных",
            description: "Некоторые алгоритмы сжатия, например RLE (Run-Length Encoding), работают лучше, если предварительно удалить лишние повторения."
          },
          {
            icon: "🤖",
            title: "Нормализация текстовых данных",
            description: "При анализе естественного языка или обработке текстовых данных иногда требуется удалить случайное дублирование символов."
          },
          {
            icon: "💬",
            title: "Обработка сообщений в чатах",
            description: "Фильтрация сообщений, где пользователи специально растягивают слова для выражения эмоций: 'Круууутоооо!!!' → 'Круто!'"
          }
        ],
        
        edgeCases: [
          {
            title: "Пустая строка",
            input: "",
            output: "",
            explanation: "Важно обрабатывать пустую строку как особый случай. В нашем решении мы проверяем, не пуста ли строка, и если пуста, возвращаем пустую строку."
          },
          {
            title: "Строка из одного символа",
            input: "A",
            output: "A",
            explanation: "В этом случае нет повторений для удаления, так что результат будет тем же самым."
          },
          {
            title: "Последовательности пробелов",
            input: "Привет   мир",
            output: "Привет мир",
            explanation: "Не забывайте, что пробелы тоже символы, и алгоритм должен удалять повторяющиеся пробелы так же, как и любые другие символы."
          },
          {
            title: "Разные регистры",
            input: "ПРИИИвееЕЕт",
            output: "ПРИвеЕт",
            explanation: "В нашем решении 'а' и 'А' — это разные символы. Если нужно игнорировать регистр, необходимо добавить дополнительную логику."
          },
          {
            title: "Символы Unicode",
            input: "😀😀😍😍👍👍",
            output: "😀😍👍",
            explanation: "Наш алгоритм должен корректно работать и с символами Unicode, такими как эмодзи, не только с простыми ASCII-символами."
          }
        ]
      };
    },
    methods: {
      setApproach(index) {
        this.currentApproach = index;
        this.resetVisualization();
      },
      
      processUserInput() {
        if (!this.userInput) return "";
        
        // Используем итеративный подход для обработки пользовательского ввода
        let result = this.userInput[0];
        
        for (let i = 1; i < this.userInput.length; i++) {
          if (this.userInput[i] !== this.userInput[i-1]) {
            result += this.userInput[i];
          }
        }
        
        return result;
      },
      
      // Методы для визуализации
      startVisualization() {
        if (this.isVisualizing) return;
        
        this.isVisualizing = true;
        this.canReset = false;
        this.currentStep = 0;
        this.visualizationResult = this.originalString[0]; // Начинаем с первого символа
        
        // Подготавливаем массив символов для визуализации
        this.visualizationChars = this.originalString.split('').map((char, index) => {
          return {
            char,
            isCurrent: index === 0,
            isProcessed: index === 0,
            isSkipped: false,
            inResult: index === 0
          };
        });
        
        this.runStep();
      },
      
      runStep() {
        if (this.currentStep >= this.originalString.length - 1) {
          this.isVisualizing = false;
          this.canReset = true;
          return;
        }
        
        this.currentStep++;
        
        // Обновляем текущий символ
        this.visualizationChars = this.visualizationChars.map((charObj, index) => {
          return {
            ...charObj,
            isCurrent: index === this.currentStep,
            isProcessed: index <= this.currentStep
          };
        });
        
        // Проверяем, нужно ли добавлять текущий символ в результат
        const currentChar = this.originalString[this.currentStep];
        const prevChar = this.originalString[this.currentStep - 1];
        
        if (currentChar !== prevChar) {
          this.visualizationResult += currentChar;
          // Отмечаем символ как добавленный в результат
          this.visualizationChars[this.currentStep].inResult = true;
        } else {
          // Отмечаем символ как пропущенный
          this.visualizationChars[this.currentStep].isSkipped = true;
        }
        
        // Вычисляем задержку на основе выбранной скорости (от 100мс до 1000мс)
        const delay = 1100 - (this.visualizationSpeed * 100);
        
        // Планируем следующий шаг
        this.stepTimer = setTimeout(() => {
          this.runStep();
        }, delay);
      },
      
      resetVisualization() {
        if (this.stepTimer) {
          clearTimeout(this.stepTimer);
        }
        
        this.isVisualizing = false;
        this.canReset = false;
        this.currentStep = 0;
        this.visualizationResult = "";
        this.visualizationChars = [];
      }
    },
    computed: {
      currentStepExplanation() {
        if (!this.isVisualizing && !this.canReset) return "";
        if (this.currentStep === 0) {
          return "Начинаем с первого символа и добавляем его в результат.";
        }
        
        const currentChar = this.originalString[this.currentStep];
        const prevChar = this.originalString[this.currentStep - 1];
        
        if (currentChar === prevChar) {
          return `Символ '${currentChar}' такой же, как предыдущий '${prevChar}', поэтому пропускаем его.`;
        } else {
          return `Символ '${currentChar}' отличается от предыдущего '${prevChar}', поэтому добавляем его в результат.`;
        }
      }
    },
    _beforeDestroy() {
      if (this.stepTimer) {
        clearTimeout(this.stepTimer);
      }
    }
  };
  </script>
  
  <style scoped>
  .string-deduplicator {
    font-family: Arial, sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    color: #000;
  }
  
  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
    font-size: 2rem;
  }
  
  h2 {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 8px;
    margin: 30px 0 20px;
  }
  
  h3 {
    color: #2c3e50;
    margin: 15px 0;
  }
  
  h4 {
    margin: 15px 0 10px;
  }
  
  .task-description {
    margin-bottom: 30px;
  }
  
  .example-box {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    margin: 15px 0;
  }
  
  .input-string, .output-string {
    margin: 10px 0;
  }
  
  .label {
    font-weight: bold;
    color: #555;
    margin-right: 5px;
  }
  
  .value {
    font-family: monospace;
    background-color: #f5f5f5;
    padding: 8px;
    border-radius: 4px;
    overflow-wrap: break-word;
  }
  
  /* Tabs для алгоритмов */
  .approach-tabs {
    display: flex;
    gap: 10px;
    margin: 20px 0;
    flex-wrap: wrap;
  }
  
  .tab-btn {
    padding: 10px 15px;
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .tab-btn:hover {
    background-color: #e9ecef;
  }
  
  .tab-btn.active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }
  
  .approach-content {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
  }
  
  /* Блок кода */
  .code-block {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    margin: 20px 0;
  }
  
  .code-block pre {
    margin: 0;
    font-family: 'Courier New', Courier, monospace;
  }
  
  .complexity {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .time, .space {
    background-color: #e9ecef;
    padding: 8px 12px;
    border-radius: 4px;
  }
  
  /* Визуализация */
  .visualization-section {
    margin: 30px 0;
  }
  
  .visualization-controls {
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 15px 0;
  }
  
  .visualization-controls button {
    padding: 8px 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .visualization-controls button:hover {
    background-color: #2980b9;
  }
  
  .visualization-controls button:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
  
  .speed-control {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .visualization-container {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
  }
  
  .chars-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 20px;
  }
  
  .char-box {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
    font-family: monospace;
    font-size: 1.2rem;
    position: relative;
  }
  
  .char-box.current {
    border-color: #3498db;
    box-shadow: 0 0 0 2px #3498db;
    z-index: 1;
  }
  
  .char-box.processed {
    background-color: #f5f5f5;
  }
  
  .char-box.skipped {
    background-color: #ffe6e6;
    text-decoration: line-through;
    opacity: 0.7;
  }
  
  .char-box.result-char {
    background-color: #d4edda;
    border-color: #28a745;
  }
  
  .result-string {
    margin: 20px 0;
    padding: 10px;
    background-color: #e9ecef;
    border-radius: 4px;
  }
  
  .explanation-box {
    margin-top: 20px;
    padding: 15px;
    background-color: #d1ecf1;
    border-left: 4px solid #17a2b8;
    border-radius: 4px;
  }
  
  .step-number {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  /* Интерактивный раздел */
  .interactive-section {
    margin: 30px 0;
  }
  
  .input-container {
    margin-bottom: 20px;
  }
  
  .input-container label {
    display: block;
    margin-bottom: 8px;
  }
  
  .input-container input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .output-container {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
  }
  
  .original, .processed {
    margin: 10px 0;
  }
  
  /* Реальные примеры */
  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .use-case {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    align-items: flex-start;
    gap: 15px;
  }
  
  .use-case-icon {
    font-size: 2rem;
  }
  
  .use-case-content h4 {
    margin-top: 0;
    margin-bottom: 8px;
    color: #2c3e50;
  }
  
  .use-case-content p {
    margin: 0;
    color: #555;
  }
  
  /* Особые случаи */
  .edge-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .edge-case {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
  }
  
  .edge-case-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  
  .edge-case-example {
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    font-family: monospace;
  }
  
  .edge-case-explanation {
    color: #555;
    font-size: 0.95rem;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .approach-tabs,
    .visualization-controls {
      flex-direction: column;
      align-items: stretch;
    }
    
    .complexity {
      flex-direction: column;
    }
    
    .use-cases,
    .edge-cases {
      grid-template-columns: 1fr;
    }
  }
  </style>