<template>
  <div class="capitalize-tutorial">
    <h1>Функция capitalize: превращаем первые буквы слов в заглавные</h1>
    
    <div class="task-description">
      <div class="task-header">
        <h2>Задача:</h2>
      </div>
      <div class="task-content">
        <p>Написать функцию <code>capitalize(input)</code>, которая возвращает копию строки <code>input</code>, где каждое слово начинается с заглавной буквы.</p>
        <p>"Слово" - это последовательность символов, разделенных пробелами.</p>
        <p class="example">Пример: <code>capitalize('А роза упала на лапу Азора') === 'А Роза Упала На Лапу Азора'</code></p>
      </div>
    </div>
    
    <!-- Навигация по разделам -->
    <div class="navigation">
      <button 
        v-for="(section, index) in sections" 
        :key="section.id"
        :class="{ active: currentSection === index }"
        @click="currentSection = index"
      >
        {{ section.title }}
      </button>
    </div>
    
    <!-- Содержимое текущего раздела -->
    <div class="section-content">
      <!-- Раздел 1: Анализ задачи -->
      <div v-if="currentSection === 0" class="section">
        <h2>Анализ задачи</h2>
        
        <div class="analysis">
          <div class="analysis-step">
            <h3>Шаг 1: Понимание требований</h3>
            <p>Нам нужно написать функцию, которая:</p>
            <ul>
              <li>Принимает строку <code>input</code></li>
              <li>Возвращает новую строку, где первая буква каждого слова заглавная</li>
              <li>Остальные буквы в слове должны остаться без изменений</li>
            </ul>
          </div>
          
          <div class="analysis-step">
            <h3>Шаг 2: Определение "слова"</h3>
            <p>В нашем решении "слово" - это последовательность символов, разделенных пробелами.</p>
            <div class="examples">
              <p><strong>Примеры слов:</strong> "роза", "Азора", "что-то"</p>
              <p><strong>Разделитель слов:</strong> пробел</p>
            </div>
          </div>
          
          <div class="analysis-step">
            <h3>Шаг 3: Стратегия решения</h3>
            <p>Мы будем использовать следующий подход:</p>
            <ol>
              <li>Разделить строку на отдельные слова (по пробелам)</li>
              <li>Для каждого слова сделать первую букву заглавной</li>
              <li>Соединить обработанные слова обратно в строку</li>
            </ol>
          </div>
        </div>
      </div>
      
      <!-- Раздел 2: Реализация функции -->
      <div v-if="currentSection === 1" class="section">
        <h2>Реализация функции</h2>
        
        <div class="solution">
          <h3>Реализация с использованием split, map и join</h3>
          <p>Мы реализуем функцию capitalize, используя разбиение строки на слова и обработку каждого слова отдельно:</p>
          
          <div class="code-example">
            <pre class="code"><code>function capitalize(input) {
  return input 
    .split(" ")
    .map((word) => {
      const [first, ...rest] = word.split("");
      return first.toUpperCase() + rest.join("");
    })
    .join(" ");
}</code></pre>
          </div>
          
          <div class="algorithm-steps">
            <h3>Разбор алгоритма по шагам:</h3>
            
            <div class="algorithm-step">
              <h4>Шаг 1: Разделение строки на слова</h4>
              <p>Используем <code>input.split(" ")</code> для разделения строки на массив слов по пробелам.</p>
              <div class="code-example">
                <pre class="code"><code>// Пример: "А роза упала" -> ["А", "роза", "упала"]</code></pre>
              </div>
            </div>
            
            <div class="algorithm-step">
              <h4>Шаг 2: Обработка каждого слова</h4>
              <p>Используем метод <code>map()</code> для преобразования каждого слова в массиве.</p>
              <div class="code-example">
                <pre class="code"><code>.map((word) => {
  const [first, ...rest] = word.split("");
  return first.toUpperCase() + rest.join("");
})</code></pre>
              </div>
              <p>Для каждого слова:</p>
              <ul>
                <li><code>word.split("")</code> - разбиваем слово на массив символов</li>
                <li><code>[first, ...rest]</code> - выделяем первый символ и остальные символы</li>
                <li><code>first.toUpperCase()</code> - преобразуем первый символ в верхний регистр</li>
                <li><code>rest.join("")</code> - объединяем остальные символы обратно в строку</li>
                <li>Соединяем заглавную первую букву с остальной частью слова</li>
              </ul>
            </div>
            
            <div class="algorithm-step">
              <h4>Шаг 3: Объединение результатов</h4>
              <p>Используем <code>join(" ")</code> для объединения преобразованных слов обратно в строку, разделяя их пробелами.</p>
              <div class="code-example">
                <pre class="code"><code>// Пример: ["А", "Роза", "Упала"] -> "А Роза Упала"</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Раздел 3: Анимация работы алгоритма -->
      <div v-if="currentSection === 2" class="section">
        <h2>Анимация работы алгоритма</h2>
        
        <div class="animation-container">
          <div class="animation-controls">
            <input 
              v-model="animationInput" 
              placeholder="Введите текст для обработки"
              class="animation-input"
            />
            <button @click="runAnimation" :disabled="isAnimating" class="animation-button">
              {{ isAnimating ? 'Обработка...' : 'Запустить анимацию' }}
            </button>
          </div>
          
          <div class="animation-display">
            <div class="animation-stages">
              <div class="animation-stage">
                <h3>Исходная строка:</h3>
                <div class="stage-content" ref="originalString">{{ animationInput }}</div>
              </div>
              
              <div class="animation-stage">
                <h3>Разделение на слова:</h3>
                <div class="stage-content">
                  <span 
                    v-for="(word, index) in animationWords" 
                    :key="index" 
                    class="word-item"
                    :class="{ 'highlight-word': animationStep >= 2 }">
                    {{ word }}
                  </span>
                </div>
              </div>
              
              <div class="animation-stage">
                <h3>Обработка каждого слова:</h3>
                <div class="stage-content">
                  <span 
                    v-for="(word, index) in animationCapitalizedWords" 
                    :key="index" 
                    class="word-item"
                    :class="{ 'highlight-capitalized': animationStep >= 3 }">
                    {{ word }}
                  </span>
                </div>
              </div>
              
              <div class="animation-stage">
                <h3>Результат:</h3>
                <div class="stage-content">{{ animationResult }}</div>
              </div>
            </div>
            
            <div class="animation-explanation">
              <div v-if="animationStep === 0" class="explanation-step">
                <p>Введите текст и нажмите "Запустить анимацию" для демонстрации работы алгоритма.</p>
              </div>
              <div v-if="animationStep === 1" class="explanation-step">
                <p>Шаг 1: Анализируем исходную строку.</p>
              </div>
              <div v-if="animationStep === 2" class="explanation-step">
                <p>Шаг 2: Разделяем строку на отдельные слова с помощью <code>split(" ")</code>.</p>
                <pre class="code"><code>input.split(" ")</code></pre>
              </div>
              <div v-if="animationStep === 3" class="explanation-step">
                <p>Шаг 3: Обрабатываем каждое слово с помощью <code>map()</code>, делая первую букву заглавной.</p>
                <pre class="code"><code>word => first.toUpperCase() + rest.join("")</code></pre>
              </div>
              <div v-if="animationStep === 4" class="explanation-step">
                <p>Шаг 4: Объединяем преобразованные слова обратно в строку с помощью <code>join(" ")</code>.</p>
                <pre class="code"><code>capitalizedWords.join(" ")</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Раздел 4: Примеры использования -->
      <div v-if="currentSection === 3" class="section">
        <h2>Примеры использования</h2>
        
        <div class="examples-container">
          <div class="example-item">
            <h3>Пример 1: Простое предложение</h3>
            <div class="example-code">
              <pre class="code"><code>capitalize("привет, мир! как дела?");</code></pre>
            </div>
            <div class="example-result">
              <p>Результат: <span class="result-text">{{ capitalizeText("привет, мир! как дела?") }}</span></p>
            </div>
          </div>
          
          <div class="example-item">
            <h3>Пример 2: Слова с дефисами</h3>
            <div class="example-code">
              <pre class="code"><code>capitalize("что-то кто-либо где-нибудь");</code></pre>
            </div>
            <div class="example-result">
              <p>Результат: <span class="result-text">{{ capitalizeText("что-то кто-либо где-нибудь") }}</span></p>
            </div>
          </div>
          
          <div class="example-item">
            <h3>Пример 3: Несколько пробелов между словами</h3>
            <div class="example-code">
              <pre class="code"><code>capitalize("один  два   три");</code></pre>
            </div>
            <div class="example-result">
              <p>Результат: <span class="result-text">{{ capitalizeText("один  два   три") }}</span></p>
              <p class="note">Обратите внимание: множественные пробелы сохраняются, но могут обрабатываться как отдельные слова.</p>
            </div>
          </div>
          
          <div class="example-item">
            <h3>Пример 4: Тестовый пример из задачи</h3>
            <div class="example-code">
              <pre class="code"><code>capitalize("А роза упала на лапу Азора") === "А Роза Упала На Лапу Азора"</code></pre>
            </div>
            <div class="example-result">
              <p>Результат: <span class="result-text">{{ capitalizeText("А роза упала на лапу Азора") === "А Роза Упала На Лапу Азора" ? "true" : "false" }}</span></p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Раздел 5: Ограничения решения -->
      <div v-if="currentSection === 4" class="section">
        <h2>Ограничения решения</h2>
        
        <div class="limitations">
          <div class="limitation-item">
            <h3>1. Обработка пробелов</h3>
            <p>Текущая реализация разделяет строку только по пробелам, что может привести к следующим проблемам:</p>
            <ul>
              <li>Несколько пробелов подряд будут приводить к пустым элементам в массиве слов</li>
              <li>Другие пробельные символы (табуляция, перевод строки) не будут восприняты как разделители</li>
            </ul>
            <div class="limitation-example">
              <pre class="code"><code>capitalize("пример\tс табуляцией");</code></pre>
              <p>Результат: <span class="result-text">{{ capitalizeText("пример\tс табуляцией") }}</span></p>
            </div>
          </div>
          
          <div class="limitation-item">
            <h3>2. Пустые строки</h3>
            <p>Если в строке есть пустые элементы (например, из-за нескольких пробелов), функция может пытаться сделать заглавной первую букву пустой строки, что может вызвать ошибки.</p>
            <div class="limitation-example">
              <pre class="code"><code>// Попытка получить первый символ пустой строки
const [first, ...rest] = "".split("");
// first будет undefined</code></pre>
            </div>
          </div>
          
          <div class="limitation-item">
            <h3>3. Работа с пунктуацией</h3>
            <p>Функция не отделяет знаки препинания от слов, поэтому они остаются частью слова:</p>
            <div class="limitation-example">
              <pre class="code"><code>capitalize("привет, мир!");</code></pre>
              <p>Результат: <span class="result-text">{{ capitalizeText("привет, мир!") }}</span></p>
              <p>Знаки препинания остаются частью слова, но не влияют на капитализацию.</p>
            </div>
          </div>
          
          <div class="limitation-item">
            <h3>4. Улучшения</h3>
            <p>Для более надежной работы можно добавить проверки и улучшения:</p>
            <div class="limitation-example">
              <pre class="code"><code>function improvedCapitalize(input) {
  if (!input) return input;
  
  return input
    .split(" ")
    .map((word) => {
      if (!word) return word;
      if (word.length === 1) return word.toUpperCase();
      
      const [first, ...rest] = word.split("");
      return first.toUpperCase() + rest.join("");
    })
    .join(" ");
}</code></pre>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Раздел 6: Итоговое решение -->
      <div v-if="currentSection === 5" class="section">
        <h2>Итоговое решение</h2>
        
        <div class="final-solution">
          <h3>Базовая функция capitalize</h3>
          <div class="code-example">
            <pre class="code"><code>/**
 * Функция capitalize возвращает копию строки input,
 * в которой каждое слово начинается с заглавной буквы.
 *
 * @param {string} input - строка с произвольным предложением
 * @return {string} - строка с заглавной буквой в каждом слове
 */
function capitalize(input) {
  return input 
    .split(" ")
    .map((word) => {
      const [first, ...rest] = word.split("");
      return first.toUpperCase() + rest.join("");
    })
    .join(" ");
}

// Пример использования
console.log(capitalize("А роза упала на лапу Азора"));
// "А Роза Упала На Лапу Азора"</code></pre>
          </div>
          
          <h3>Улучшенная версия с проверками</h3>
          <div class="code-example">
            <pre class="code"><code>/**
 * Улучшенная функция capitalize с проверками на краевые случаи.
 *
 * @param {string} input - строка с произвольным предложением
 * @return {string} - строка с заглавной буквой в каждом слове
 */
function improvedCapitalize(input) {
  // Проверка на null или undefined
  if (input == null) return input;
  
  // Преобразование к строке (на случай если передано число и т.п.)
  const str = String(input);
  
  return str
    .split(" ")
    .map((word) => {
      // Проверка на пустое слово
      if (!word) return word;
      
      // Особые случаи для слов из одного символа
      if (word.length === 1) return word.toUpperCase();
      
      // Стандартная обработка слова
      const [first, ...rest] = word.split("");
      return first.toUpperCase() + rest.join("");
    })
    .join(" ");
}</code></pre>
          </div>
          
          <div class="test-runner">
            <h3>Хотите протестировать функцию?</h3>
            <div class="test-input">
              <input 
                v-model="testInput" 
                placeholder="Введите текст для капитализации"
                class="test-text-input"
              />
              <button @click="runTest" class="test-button">Капитализировать</button>
            </div>
            <div class="test-result" v-if="testResult">
              <h4>Результат:</h4>
              <p class="result-text">{{ testResult }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sections: [
        { id: 'analysis', title: 'Анализ задачи' },
        { id: 'implementation', title: 'Реализация' },
        { id: 'animation', title: 'Анимация' },
        { id: 'examples', title: 'Примеры' },
        { id: 'limitations', title: 'Ограничения' },
        { id: 'solution', title: 'Итоговое решение' }
      ],
      currentSection: 0,
      animationInput: 'привет, мир! как дела?',
      animationWords: [],
      animationCapitalizedWords: [],
      animationResult: '',
      isAnimating: false,
      animationStep: 0,
      animationTimeout: null,
      testInput: '',
      testResult: ''
    };
  },
  methods: {
    // Основная функция капитализации
    capitalizeText(text) {
      return text
        .split(" ")
        .map((word) => {
          if (!word) return word;
          
          const [first, ...rest] = word.split("");
          if (!first) return word;
          
          return first.toUpperCase() + rest.join("");
        })
        .join(" ");
    },
    
    // Запуск анимации алгоритма
    runAnimation() {
      if (this.isAnimating) return;
      
      this.isAnimating = true;
      this.animationStep = 0;
      
      // Сбрасываем предыдущую анимацию
      if (this.animationTimeout) {
        clearTimeout(this.animationTimeout);
      }
      
      this.animationResult = '';
      this.animationWords = [];
      this.animationCapitalizedWords = [];
      
      // Шаг 1: Анализ исходной строки
      this.animationStep = 1;
      
      // Шаг 2: Разделение на слова
      this.animationTimeout = setTimeout(() => {
        this.animationStep = 2;
        this.animationWords = this.animationInput.split(" ");
        
        // Шаг 3: Капитализация каждого слова
        this.animationTimeout = setTimeout(() => {
          this.animationStep = 3;
          
          this.animationCapitalizedWords = this.animationWords.map(word => {
            if (!word) return word;
            
            const [first, ...rest] = word.split("");
            if (!first) return word;
            
            return first.toUpperCase() + rest.join("");
          });
          
          // Шаг 4: Объединение результатов
          this.animationTimeout = setTimeout(() => {
            this.animationStep = 4;
            this.animationResult = this.animationCapitalizedWords.join(" ");
            
            // Завершение анимации
            this.animationTimeout = setTimeout(() => {
              this.isAnimating = false;
            }, 1000);
          }, 1500);
        }, 1500);
      }, 1500);
    },
    
    // Тестирование функции
    runTest() {
      if (!this.testInput) {
        this.testResult = "Пожалуйста, введите текст для капитализации";
        return;
      }
      
      this.testResult = this.capitalizeText(this.testInput);
    }
  }
};
</script>

<style>
.capitalize-tutorial {
  font-family: Arial, sans-serif;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  color: black;
  line-height: 1.6;
}

h1, h2, h3, h4, h5 {
  color: #333;
  margin-top: 1.5em;
  margin-bottom: 0.8em;
}

h1 {
  font-size: 28px;
  text-align: center;
  border-bottom: 2px solid #4a90e2;
  padding-bottom: 15px;
  margin-bottom: 30px;
}

h2 {
  font-size: 24px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

h3 {
  font-size: 20px;
}

h4 {
  font-size: 18px;
}

p {
  margin: 0 0 15px;
}

code {
  font-family: 'Courier New', monospace;
  background-color: #f5f5f5;
  padding: 2px 5px;
  border-radius: 3px;
  color: #d63031;
  font-size: 0.9em;
}

pre.code {
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
  margin: 15px 0;
  line-height: 1.5;
}

/* Задача */
.task-description {
  background-color: #f8f9fa;
  border-left: 5px solid #4a90e2;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 5px;
}

.task-header h2 {
  margin-top: 0;
  color: #4a90e2;
  border-bottom: none;
  padding-bottom: 0;
}

.example {
  font-weight: bold;
  margin-top: 15px;
}

/* Навигация */
.navigation {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.navigation button {
  padding: 10px 15px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
  white-space: nowrap;
  margin: 0 5px;
  transition: all 0.3s;
}

.navigation button:first-child {
  margin-left: 0;
}

.navigation button:last-child {
  margin-right: 0;
}

.navigation button:hover {
  background-color: #e9ecef;
}

.navigation button.active {
  background-color: #4a90e2;
  color: white;
  border-color: #4a90e2;
}

/* Анализ задачи */
.analysis {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.analysis-step {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #eee;
}

.analysis-step h3 {
  margin-top: 0;
  color: #4a90e2;
}

.examples {
  margin-top: 15px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

/* Реализация функции */
.solution {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
}

.algorithm-steps {
  margin-top: 30px;
}

.algorithm-step {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 5px;
  border-left: 3px solid #4a90e2;
}

.algorithm-step h4 {
  margin-top: 0;
  color: #4a90e2;
}

/* Анимация */
.animation-container {
  background-color: #f8f9fa;
  border-radius: 5px;
  padding: 20px;
  margin-top: 20px;
}

.animation-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.animation-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.animation-button {
  padding: 10px 20px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.animation-button:hover {
  background-color: #3a7bc8;
}

.animation-button:disabled {
  background-color: #a1c0ea;
  cursor: not-allowed;
}

.animation-stages {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.animation-stage {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
}

.animation-stage h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  color: #666;
}

.stage-content {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  min-height: 30px;
  font-family: 'Courier New', monospace;
}

.word-item {
  display: inline-block;
  margin-right: 10px;
  padding: 3px 5px;
  border-radius: 3px;
}

.highlight-word {
  background-color: #ffeb3b;
}

.highlight-capitalized {
  background-color: #a5d6a7;
}

.animation-explanation {
  background-color: #e3f2fd;
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
  min-height: 150px;
}

.explanation-step {
  animation: fadeIn 0.5s ease;
}

/* Примеры использования */
.examples-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.example-item {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #eee;
}

.example-item h3 {
  margin-top: 0;
  color: #4a90e2;
}

.example-result {
  margin-top: 15px;
  padding: 10px;
  background-color: #e8f5e9;
  border-radius: 5px;
}

.result-text {
  font-weight: bold;
  color: #2e7d32;
}

.note {
  font-style: italic;
  color: #757575;
  font-size: 0.9em;
  margin-top: 10px;
}

/* Ограничения */
.limitations {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.limitation-item {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #eee;
}

.limitation-item h3 {
  margin-top: 0;
  color: #e65100;
}

.limitation-example {
  margin-top: 15px;
  padding: 10px;
  background-color: #fff8e1;
  border-radius: 5px;
}

/* Итоговое решение */
.final-solution {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
}

.test-runner {
  margin-top: 30px;
  padding: 20px;
  background-color: #e3f2fd;
  border-radius: 5px;
}

.test-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.test-text-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.test-button {
  padding: 10px 20px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.test-button:hover {
  background-color: #3a7bc8;
}

.test-result {
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.test-result h4 {
  margin-top: 0;
  margin-bottom: 10px;
}

/* Анимации */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Медиа-запросы для мобильных устройств */
@media (max-width: 768px) {
  .navigation {
    flex-wrap: wrap;
  }
  
  .navigation button {
    flex: none;
    margin-bottom: 10px;
  }
  
  .animation-controls {
    flex-direction: column;
  }
  
  .test-input {
    flex-direction: column;
  }
}
</style>