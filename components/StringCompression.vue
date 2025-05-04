<template>
    <div class="string-compression">
      <h1 class="main-title">Алгоритм сжатия строки (Run-Length Encoding)</h1>
      
      <div class="description">
        <p>Алгоритм сжатия строки заменяет повторяющиеся символы на символ и количество его повторений. Например, "AAAABBBCCF" превращается в "A4B3C2F".</p>
        <p>Этот метод является одним из самых простых алгоритмов сжатия данных и называется <strong>Run-Length Encoding (RLE)</strong>.</p>
      </div>
      
      <div class="interactive-demo">
        <h2>Интерактивная демонстрация</h2>
        
        <div class="input-section">
          <div class="input-group">
            <label for="input-string">Введите строку для сжатия:</label>
            <input 
              id="input-string" 
              type="text" 
              v-model="inputString" 
              placeholder="Например: AAAABBBCCF" 
              @input="resetAnimation"
            />
          </div>
          
          <div class="buttons">
            <button @click="compressWithAnimation" :disabled="isAnimating || !inputString">
              {{ isAnimating ? 'Сжатие...' : 'Сжать строку' }}
            </button>
            <button @click="resetAnimation" :disabled="!animationState.started">
              Сбросить
            </button>
          </div>
        </div>
        
        <div class="animation-container" v-if="inputString">
          <div class="original-string">
            <div 
              v-for="(char, index) in inputString" 
              :key="index" 
              class="char-box"
              :class="{
                'current': animationState.currentIndex === index,
                'processed': animationState.currentIndex > index,
                'current-group': animationState.currentIndex >= index && isInCurrentGroup(index)
              }"
            >
              {{ char }}
            </div>
          </div>
          
          <div class="compression-visual">
            <div class="arrow-container">
              <div class="arrow" :class="{ active: animationState.showArrow }">
                <div class="arrow-shaft"></div>
                <div class="arrow-head"></div>
              </div>
            </div>
            
            <div class="counter-display" v-if="animationState.showCounter">
              <div class="counter-label">Счетчик</div>
              <div class="counter-value">{{ animationState.currentCount }}</div>
            </div>
          </div>
          
          <div class="result-string">
            <div class="result-label">Результат:</div>
            <div class="result-content">
              <template v-for="(item, index) in resultCharacters" :key="index">
                <div class="result-char">{{ item.char }}</div>
                <div class="result-count" v-if="item.count > 1">
                  {{ item.count }}
                </div>
              </template>
            </div>
          </div>
        </div>
        
        <div class="final-result" v-if="animationState.completed">
          <div class="result-box">
            <div class="result-title">Сжатая строка:</div>
            <div class="result-value">{{ compressedString }}</div>
          </div>
          <div class="stats-box">
            <div class="stat-item">
              <span class="stat-label">Исходная длина:</span>
              <span class="stat-value">{{ inputString.length }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Сжатая длина:</span>
              <span class="stat-value">{{ compressedString.length }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Коэффициент сжатия:</span>
              <span class="stat-value">{{ compressionRatio }}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="algorithm-explanation">
        <h2>Объяснение алгоритма</h2>
        
        <div class="step-by-step">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-description">
              Инициализируем пустую строку для результата и устанавливаем счетчик повторений в 1.
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-description">
              Проходим по каждому символу входной строки слева направо.
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-description">
              Для текущего символа проверяем: совпадает ли он со следующим символом?
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-description">
              Если символы совпадают, увеличиваем счетчик на 1 и переходим к следующему символу.
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">5</div>
            <div class="step-description">
              Если символы не совпадают (или это последний символ), добавляем в результат текущий символ и счетчик (если счетчик > 1).
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">6</div>
            <div class="step-description">
              Сбрасываем счетчик в 1 и продолжаем со следующего символа, повторяя шаги 3-6.
            </div>
          </div>
        </div>
      </div>
      
      <div class="code-implementation">
        <h2>Реализация алгоритма</h2>
        
        <div class="code-block">
          <pre>
  <code>/**
   * Функция для сжатия строки методом RLE
   * @param {string} str - Исходная строка для сжатия
   * @return {string} - Сжатая строка
   */
  const compressString = (str) => {
    // Проверка на пустую строку
    if (!str || str.length === 0) return '';
    
    let result = '';  // Инициализируем пустую строку для результата
    let count = 1;    // Устанавливаем начальный счетчик повторений
    
    for (let i = 0; i &lt; str.length; i++) {
      // Если текущий символ совпадает со следующим
      if (str[i] === str[i + 1]) {
        count++;  // Увеличиваем счетчик повторений
      } else {
        // Добавляем символ и количество (если > 1) к результату
        result += str[i] + (count > 1 ? count : '');
        count = 1;  // Сбрасываем счетчик для следующего символа
      }
    }
    
    return result;
  };</code>
          </pre>
        </div>
      </div>
      
      <div class="edge-cases">
        <h2>Подводные камни и особые случаи</h2>
        
        <div class="cases-container">
          <div class="case-item">
            <div class="case-title">Пустая строка</div>
            <div class="case-explanation">
              Алгоритм должен корректно обрабатывать пустую строку, возвращая пустую строку.
            </div>
            <div class="case-example">
              <code>compressString("") // результат: ""</code>
            </div>
          </div>
          
          <div class="case-item">
            <div class="case-title">Одиночные символы</div>
            <div class="case-explanation">
              Для символов, которые не повторяются, не нужно добавлять цифру 1 к результату.
            </div>
            <div class="case-example">
              <code>compressString("ABC") // результат: "ABC", а не "A1B1C1"</code>
            </div>
          </div>
          
          <div class="case-item">
            <div class="case-title">Увеличение длины</div>
            <div class="case-explanation">
              В некоторых случаях сжатая строка может быть длиннее оригинальной. Например, строка "ABC" после "сжатия" даст "ABC" (та же длина).
            </div>
            <div class="case-example">
              <code>compressString("AABBCC") // результат: "A2B2C2" (длиннее)</code>
            </div>
          </div>
          
          <div class="case-item">
            <div class="case-title">Чувствительность к регистру</div>
            <div class="case-explanation">
              Алгоритм должен учитывать регистр символов. 'a' и 'A' считаются разными символами.
            </div>
            <div class="case-example">
              <code>compressString("aAAA") // результат: "aA3"</code>
            </div>
          </div>
          
          <div class="case-item">
            <div class="case-title">Специальные символы</div>
            <div class="case-explanation">
              Алгоритм должен корректно работать с цифрами и специальными символами.
            </div>
            <div class="case-example">
              <code>compressString("111###") // результат: "132#3"</code>
            </div>
          </div>
          
          <div class="case-item">
            <div class="case-title">Повторное сжатие</div>
            <div class="case-explanation">
              Сжатие уже сжатой строки может дать неожиданный результат, так как цифры обрабатываются как обычные символы.
            </div>
            <div class="case-example">
              <code>compressString("A3B2") // результат: "A3B2" (без изменений)</code>
            </div>
          </div>
        </div>
      </div>
      
      <div class="real-applications">
        <h2>Применение в реальной жизни</h2>
        
        <div class="applications-container">
          <div class="application-item">
            <div class="application-icon">🖼️</div>
            <div class="application-content">
              <div class="application-title">Обработка изображений</div>
              <div class="application-description">
                <p>Run-Length Encoding активно применяется для сжатия изображений, особенно для тех, где есть большие области одного цвета (например, факсимильные изображения, скриншоты с текстом, простая графика).</p>
                <p>Именно этот алгоритм используется в формате PCX, некоторых версиях формата TIFF и BMP.</p>
              </div>
            </div>
          </div>
          
          <div class="application-item">
            <div class="application-icon">💾</div>
            <div class="application-content">
              <div class="application-title">Архивация данных</div>
              <div class="application-description">
                <p>RLE используется как простой метод сжатия в архиваторах, особенно для данных с повторяющимися последовательностями.</p>
                <p>Многие современные алгоритмы сжатия, такие как DEFLATE (используется в ZIP, PNG), включают RLE как один из этапов сжатия.</p>
              </div>
            </div>
          </div>
          
          <div class="application-item">
            <div class="application-icon">📊</div>
            <div class="application-content">
              <div class="application-title">Телеметрия и датчики</div>
              <div class="application-description">
                <p>В системах, где данные изменяются редко, например, телеметрия от датчиков или медицинское оборудование, RLE может существенно сократить объем передаваемых данных.</p>
              </div>
            </div>
          </div>
          
          <div class="application-item">
            <div class="application-icon">🧬</div>
            <div class="application-content">
              <div class="application-title">Биоинформатика</div>
              <div class="application-description">
                <p>При анализе ДНК и белковых последовательностей, где часто встречаются повторяющиеся участки, RLE может использоваться для сжатия и упрощения представления данных.</p>
              </div>
            </div>
          </div>
          
          <div class="application-item">
            <div class="application-icon">📱</div>
            <div class="application-content">
              <div class="application-title">Мобильные коммуникации</div>
              <div class="application-description">
                <p>В условиях ограниченной пропускной способности мобильных сетей, RLE может применяться для сжатия текстовых сообщений и бинарных данных.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="further-improvements">
        <h2>Возможные улучшения алгоритма</h2>
        
        <div class="improvements-container">
          <div class="improvement-item">
            <div class="improvement-title">Оптимизация для коротких строк</div>
            <div class="improvement-description">
              <p>Для коротких строк с малым количеством повторений можно добавить проверку: если сжатая строка длиннее или равна оригинальной, возвращать оригинальную строку.</p>
              <pre><code>const compressStringOptimized = (str) => {
    const compressed = compressString(str);
    return compressed.length &lt; str.length ? compressed : str;
  };</code></pre>
            </div>
          </div>
          
          <div class="improvement-item">
            <div class="improvement-title">Использование разных разделителей</div>
            <div class="improvement-description">
              <p>Чтобы избежать проблем с цифрами в исходной строке, можно использовать специальные разделители между символом и количеством.</p>
              <pre><code>const compressStringWithSeparator = (str) => {
    // Аналогично базовому алгоритму, но с добавлением разделителя
    // Например: "AAAABBBCCF" -> "A:4B:3C:2F"
  };</code></pre>
            </div>
          </div>
          
          <div class="improvement-item">
            <div class="improvement-title">Декомпрессия</div>
            <div class="improvement-description">
              <p>Для полноты решения можно реализовать функцию декомпрессии, которая восстанавливает исходную строку:</p>
              <pre><code>const decompressString = (str) => {
    let result = '';
    let i = 0;
    
    while (i &lt; str.length) {
      // Получаем символ
      const char = str[i++];
      
      // Пытаемся получить число повторений
      let count = '';
      while (i &lt; str.length && !isNaN(parseInt(str[i]))) {
        count += str[i++];
      }
      
      // Если число найдено, используем его, иначе считаем, что повторений 1
      const repeatCount = count ? parseInt(count) : 1;
      
      // Добавляем символ нужное количество раз
      result += char.repeat(repeatCount);
    }
    
    return result;
  };</code></pre>
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
        inputString: 'AAAABBBCCF',
        isAnimating: false,
        animationState: {
          started: false,
          completed: false,
          currentIndex: -1,
          currentCount: 0,
          showArrow: false,
          showCounter: false
        },
        resultCharacters: [],
        compressedString: '',
        animationSpeed: 800 // миллисекунды на шаг
      };
    },
    computed: {
      compressionRatio() {
        if (!this.inputString || !this.compressedString) return 0;
        const ratio = (1 - this.compressedString.length / this.inputString.length) * 100;
        return Math.round(ratio * 10) / 10; // округляем до 1 десятичного знака
      }
    },
    methods: {
      resetAnimation() {
        this.isAnimating = false;
        this.animationState = {
          started: false,
          completed: false,
          currentIndex: -1,
          currentCount: 0,
          showArrow: false,
          showCounter: false
        };
        this.resultCharacters = [];
        this.compressedString = '';
      },
      
      compressWithAnimation() {
        if (this.isAnimating || !this.inputString) return;
        
        this.isAnimating = true;
        this.animationState.started = true;
        this.resultCharacters = [];
        this.compressedString = '';
        
        let currentIndex = 0;
        let currentChar = this.inputString[0];
        let count = 1;
        
        // Запускаем первый шаг анимации
        this.animationState.currentIndex = currentIndex;
        this.animationState.currentCount = count;
        this.animationState.showCounter = true;
        this.animationState.showArrow = true;
        
        const animateNext = () => {
          currentIndex++;
          
          // Если мы дошли до конца строки или следующего другого символа
          if (currentIndex >= this.inputString.length || this.inputString[currentIndex] !== currentChar) {
            // Добавляем текущий символ и счетчик в результат
            this.resultCharacters.push({
              char: currentChar,
              count: count
            });
            
            // Обновляем сжатую строку
            this.compressedString += currentChar + (count > 1 ? count : '');
            
            // Если это конец строки, завершаем анимацию
            if (currentIndex >= this.inputString.length) {
              this.animationState.completed = true;
              this.isAnimating = false;
              return;
            }
            
            // Иначе начинаем новую группу
            currentChar = this.inputString[currentIndex];
            count = 1;
          } else {
            // Продолжаем считать текущий символ
            count++;
          }
          
          // Обновляем состояние анимации
          this.animationState.currentIndex = currentIndex;
          this.animationState.currentCount = count;
          
          // Планируем следующий шаг анимации
          setTimeout(animateNext, this.animationSpeed);
        };
        
        // Запускаем анимацию с задержкой
        setTimeout(animateNext, this.animationSpeed);
      },
      
      isInCurrentGroup(index) {
        if (index > this.animationState.currentIndex) return false;
        
        let i = this.animationState.currentIndex;
        while (i >= 0 && this.inputString[i] === this.inputString[this.animationState.currentIndex]) {
          if (i === index) return true;
          i--;
        }
        
        return false;
      }
    }
  };
  </script>
  
  <style>
  .string-compression {
    font-family: Arial, sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    color: black;
  }
  
  .main-title {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
  }
  
  .description {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  .description p {
    margin: 10px 0;
    line-height: 1.6;
  }
  
  h2 {
    margin: 30px 0 20px;
    color: #333;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
  }
  
  /* Стили для интерактивной демонстрации */
  .interactive-demo {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  .input-section {
    margin-bottom: 20px;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  .input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .input-group input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .buttons {
    display: flex;
    gap: 10px;
  }
  
  .buttons button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .buttons button:hover {
    background-color: #45a049;
  }
  
  .buttons button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .animation-container {
    margin-top: 30px;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .original-string {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 30px;
  }
  
  .char-box {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 18px;
    transition: all 0.3s;
  }
  
  .char-box.current {
    background-color: #ffeb3b;
    border-color: #ffc107;
    transform: scale(1.1);
    z-index: 1;
  }
  
  .char-box.processed {
    background-color: #e8f5e9;
    border-color: #a5d6a7;
  }
  
  .char-box.current-group {
    background-color: #fff9c4;
    border-color: #fff176;
  }
  
  .compression-visual {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    position: relative;
  }
  
  .arrow-container {
    width: 100%;
    position: relative;
    height: 30px;
  }
  
  .arrow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    opacity: 0;
    transition: opacity 0.5s;
  }
  
  .arrow.active {
    opacity: 1;
  }
  
  .arrow-shaft {
    height: 4px;
    background-color: #2196F3;
    width: 100%;
  }
  
  .arrow-head {
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #2196F3;
  }
  
  .counter-display {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #e3f2fd;
    border: 2px solid #2196F3;
    border-radius: 8px;
    padding: 10px 15px;
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0% { transform: translateY(-50%) scale(1); }
    50% { transform: translateY(-50%) scale(1.05); }
    100% { transform: translateY(-50%) scale(1); }
  }
  
  .counter-label {
    font-size: 14px;
    margin-bottom: 5px;
    color: #555;
  }
  
  .counter-value {
    font-size: 24px;
    font-weight: bold;
    color: #2196F3;
    text-align: center;
  }
  
  .result-string {
    display: flex;
    align-items: center;
    margin-top: 30px;
  }
  
  .result-label {
    font-weight: bold;
    margin-right: 15px;
    min-width: 80px;
  }
  
  .result-content {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
  }
  
  .result-char {
    padding: 5px 8px;
    background-color: #e3f2fd;
    border: 1px solid #bbdefb;
    border-radius: 4px;
    font-weight: bold;
  }
  
  .result-count {
    padding: 5px 8px;
    background-color: #e8f5e9;
    border: 1px solid #c8e6c9;
    border-radius: 4px;
    color: #4CAF50;
    margin-right: 5px;
  }
  
  .final-result {
    margin-top: 30px;
    padding: 20px;
    background-color: #e8f5e9;
    border-radius: 8px;
    border-left: 4px solid #4CAF50;
  }
  
  .result-box {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .result-title {
    font-weight: bold;
    margin-right: 15px;
    min-width: 120px;
  }
  
  .result-value {
    font-size: 20px;
    background-color: white;
    padding: 10px 15px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .stats-box {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .stat-item {
    background-color: white;
    padding: 10px 15px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    flex: 1;
    min-width: 150px;
  }
  
  .stat-label {
    font-size: 14px;
    color: #555;
    margin-right: 10px;
  }
  
  .stat-value {
    font-weight: bold;
  }
  
  /* Стили для объяснения алгоритма */
  .algorithm-explanation {
    margin-bottom: 30px;
  }
  
  .step-by-step {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .step {
    display: flex;
    padding: 15px;
    border-bottom: 1px solid #eee;
  }
  
  .step:last-child {
    border-bottom: none;
  }
  
  .step-number {
    width: 30px;
    height: 30px;
    background-color: #2196F3;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: 15px;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  .step-description {
    line-height: 1.6;
    display: flex;
    align-items: center;
  }
  
  /* Стили для кода */
  .code-implementation {
    margin-bottom: 30px;
  }
  
  .code-block {
    background-color: #282c34;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
  
  .code-block pre {
    margin: 0;
    padding: 20px;
    overflow-x: auto;
  }
  
  .code-block code {
    color: white;
    font-family: 'Courier New', monospace;
    line-height: 1.5;
  }
  
  /* Стили для подводных камней */
  .edge-cases {
    margin-bottom: 30px;
  }
  
  .cases-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .case-item {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border-top: 3px solid #ff9800;
  }
  
  .case-title {
    padding: 15px;
    font-weight: bold;
    background-color: #fff3e0;
    color: #e65100;
  }
  
  .case-explanation {
    padding: 15px;
    border-bottom: 1px solid #eee;
    line-height: 1.6;
  }
  
  .case-example {
    padding: 15px;
    background-color: #f5f5f5;
  }
  
  .case-example code {
    background-color: #f0f0f0;
    padding: 2px 5px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
  }
  
  /* Стили для применений в жизни */
  .real-applications {
    margin-bottom: 30px;
  }
  
  .applications-container {
    display: grid;
    gap: 20px;
  }
  
  .application-item {
    display: flex;
    align-items: flex-start;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding: 20px;
  }
  
  .application-icon {
    font-size: 36px;
    margin-right: 20px;
    flex-shrink: 0;
  }
  
  .application-content {
    flex: 1;
  }
  
  .application-title {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
  }
  
  .application-description p {
    margin: 10px 0;
    line-height: 1.6;
  }
  
  /* Стили для возможных улучшений */
  .further-improvements {
    margin-bottom: 30px;
  }
  
  .improvements-container {
    display: grid;
    gap: 20px;
  }
  
  .improvement-item {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border-left: 4px solid #673AB7;
  }
  
  .improvement-title {
    padding: 15px;
    font-weight: bold;
    background-color: #ede7f6;
    color: #4527A0;
  }
  
  .improvement-description {
    padding: 15px;
    line-height: 1.6;
  }
  
  .improvement-description p {
    margin: 0 0 15px 0;
  }
  
  .improvement-description pre {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 4px;
    margin: 15px 0 0;
    overflow-x: auto;
  }
  
  .improvement-description pre code {
    font-family: 'Courier New', monospace;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .cases-container {
      grid-template-columns: 1fr;
    }
    
    .buttons {
      flex-direction: column;
    }
    
    .application-item {
      flex-direction: column;
    }
    
    .application-icon {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }
  </style>