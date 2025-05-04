<template>
    <div class="closure-explainer">
      <h1>Замыкания в циклах JavaScript</h1>
      <p class="intro">Давайте разберемся с классической ошибкой замыканий в циклах и способами её решения</p>
  
      <div class="problem-section">
        <h2>Проблема</h2>
        <div class="code-container">
          <pre class="code">const button = document.getElementById("button");
  
  for (var i = 0; i &lt; 3; i++) {
    button.addEventListener("click", function (e) {
      console.log(i);
    });
  }
  
  button.click();</pre>
        </div>
  
        <div class="question-block">
          <h3>Что выведется в консоль?</h3>
          <div class="answer" :class="{ 'revealed': showAnswer }">
            <div @click="showAnswer = !showAnswer" class="reveal-btn">
              {{ showAnswer ? 'Скрыть ответ' : 'Показать ответ' }}
            </div>
            <div v-if="showAnswer" class="answer-content">
              <p>В консоль выведется:</p>
              <div class="console-output">
                <div>3</div>
                <div>3</div>
                <div>3</div>
              </div>
              <p>Но почему не 0, 1, 2?</p>
            </div>
          </div>
        </div>
      </div>
  
      <div class="explanation-section">
        <h2>Объяснение</h2>
        <p>Проблема в том, как работают замыкания и область видимости переменной <code>var</code> в JavaScript:</p>
  
        <div class="visualization">
          <div class="visualization-container">
            <div class="memory-model">
              <div class="memory-title">Память после выполнения цикла</div>
              <div class="memory-area">
                <div class="variable">
                  <div class="var-name">i (var)</div>
                  <div class="var-value">3</div>
                </div>
                <div class="closures">
                  <div class="closure-title">Замыкания функций-обработчиков</div>
                  <div class="closure" v-for="index in 3" :key="index">
                    <div class="closure-name">Обработчик {{ index }}</div>
                    <div class="closure-scope">
                      <div class="scope-arrow" :style="{ animationDelay: (index * 0.2) + 's' }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <button @click="simulateClick" class="demo-button" :disabled="isAnimating">
              {{ isAnimating ? 'Выполняется...' : 'Симулировать клик' }}
            </button>
  
            <div class="console-visualization" :class="{ 'logging': isAnimating }">
              <div class="console-title">Console</div>
              <div class="console-content">
                <div class="log-line" v-for="(log, index) in logs" :key="index">
                  {{ log }}
                </div>
              </div>
            </div>
          </div>
  
          <div class="explanation-points">
            <div class="point">
              <div class="point-number">1</div>
              <div class="point-content">
                <p><strong>Проблема области видимости:</strong> Переменная <code>i</code>, объявленная с помощью <code>var</code>, имеет <strong>функциональную</strong> область видимости, а не блочную.</p>
              </div>
            </div>
            <div class="point">
              <div class="point-number">2</div>
              <div class="point-content">
                <p><strong>Замыкание:</strong> Каждая функция-обработчик создает замыкание, которое "запоминает" окружение, где она была создана.</p>
              </div>
            </div>
            <div class="point">
              <div class="point-number">3</div>
              <div class="point-content">
                <p><strong>Общая ссылка:</strong> Все три функции ссылаются на одну и ту же переменную <code>i</code>.</p>
              </div>
            </div>
            <div class="point">
              <div class="point-number">4</div>
              <div class="point-content">
                <p><strong>Отложенное выполнение:</strong> К моменту клика по кнопке цикл уже завершился, и <code>i</code> стало равным 3 (условие выхода из цикла <code>i &lt; 3</code>).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="solutions-section">
        <h2>Решения</h2>
        <div class="tabs">
          <div
            v-for="(solution, index) in solutions"
            :key="solution.id"
            :class="['tab', { active: activeTab === index }]"
            @click="activeTab = index"
          >
            {{ solution.title }}
          </div>
        </div>
  
        <div class="solution-content">
          <h3>{{ solutions[activeTab].title }}</h3>
          <div class="code-container">
            <pre class="code">{{ solutions[activeTab].code }}</pre>
          </div>
          <div class="solution-explanation">
            <p v-html="solutions[activeTab].explanation"></p>
            <div class="solution-animation">
              <div class="animation-container">
                <div class="memory-model">
                  <div class="memory-title">Память с использованием {{ solutions[activeTab].shortTitle }}</div>
                  <div class="memory-area">
                    <template v-if="activeTab === 0">
                      <!-- let -->
                      <div class="variables-array">
                        <div class="variable-in-iteration" v-for="j in 3" :key="j">
                          <div class="var-name">i (блок итерации {{ j-1 }})</div>
                          <div class="var-value">{{ j-1 }}</div>
                        </div>
                      </div>
                      <div class="closures">
                        <div class="closure-title">Замыкания функций-обработчиков</div>
                        <div class="closure" v-for="j in 3" :key="j">
                          <div class="closure-name">Обработчик {{ j }}</div>
                          <div class="closure-scope">
                            <div class="scope-arrow-correct" :style="{ top: ((j-1) * 40) + 'px' }"></div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-else-if="activeTab === 1">
                      <!-- IIFE -->
                      <div class="variables-array">
                        <div class="variable-in-iteration" v-for="j in 3" :key="j">
                          <div class="var-name">localI (функция {{ j }})</div>
                          <div class="var-value">{{ j-1 }}</div>
                        </div>
                      </div>
                      <div class="closures">
                        <div class="closure-title">Замыкания функций-обработчиков</div>
                        <div class="closure" v-for="j in 3" :key="j">
                          <div class="closure-name">Обработчик {{ j }}</div>
                          <div class="closure-scope">
                            <div class="scope-arrow-correct" :style="{ top: ((j-1) * 40) + 'px' }"></div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-else-if="activeTab === 2">
                      <!-- bind -->
                      <div class="variable">
                        <div class="var-name">i (var)</div>
                        <div class="var-value">3</div>
                      </div>
                      <div class="closures">
                        <div class="closure-title">Функции с привязанными аргументами</div>
                        <div class="closure" v-for="j in 3" :key="j">
                          <div class="closure-name">Обработчик {{ j }}</div>
                          <div class="closure-bound-args">
                            <div class="bound-arg">
                              <div class="arg-name">привязанное значение</div>
                              <div class="arg-value">{{ j-1 }}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <!-- data-attribute -->
                      <div class="variable">
                        <div class="var-name">i (var)</div>
                        <div class="var-value">3</div>
                      </div>
                      <div class="closures">
                        <div class="closure-title">DOM элементы с data-атрибутами</div>
                        <div class="dom-element" v-for="j in 3" :key="j">
                          <div class="element-name">button</div>
                          <div class="element-attrs">
                            <div class="attr-name">data-index</div>
                            <div class="attr-value">{{ j-1 }}</div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
  
                <button @click="simulateCorrectClick" class="demo-button" :disabled="isCorrectAnimating">
                  {{ isCorrectAnimating ? 'Выполняется...' : 'Симулировать клик' }}
                </button>
  
                <div class="console-visualization" :class="{ 'logging': isCorrectAnimating }">
                  <div class="console-title">Console</div>
                  <div class="console-content">
                    <div class="log-line" v-for="(log, index) in correctLogs" :key="index">
                      {{ log }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="real-world-section">
        <h2>Применение в реальной разработке</h2>
        <div class="real-world-examples">
          <div class="example-card">
            <div class="example-title">Работа с таблицами данных</div>
            <div class="example-content">
              <p>При создании обработчиков событий для строк таблицы данных, где нужно знать индекс или ID элемента.</p>
              <div class="example-snippet">
                <pre class="code">// Без let или замыканий - ПРОБЛЕМА
  rows.forEach(function(row, index) {
    row.onclick = function() {
      console.log('Нажата строка:', index);
    };
  });</pre>
              </div>
            </div>
          </div>
          <div class="example-card">
            <div class="example-title">Динамическое создание виджетов</div>
            <div class="example-content">
              <p>При создании множества элементов UI (например, кнопок в панели инструментов), каждый из которых должен выполнять операции со своим индексом.</p>
              <div class="example-snippet">
                <pre class="code">// Правильное решение с let
  for (let i = 0; i &lt; 5; i++) {
    const button = document.createElement('button');
    button.textContent = `Опция ${i}`;
    button.addEventListener('click', () => {
      applyOption(i);
    });
    toolbar.appendChild(button);
  }</pre>
              </div>
            </div>
          </div>
          <div class="example-card">
            <div class="example-title">Асинхронные операции в цикле</div>
            <div class="example-content">
              <p>При работе с <code>setTimeout</code>, AJAX-запросами или другими асинхронными операциями внутри цикла.</p>
              <div class="example-snippet">
                <pre class="code">// Загрузка данных с задержкой - с помощью IIFE
  for (var i = 0; i &lt; urls.length; i++) {
    (function(index) {
      setTimeout(() => {
        fetch(urls[index])
          .then(resp => resp.json())
          .then(data => {
            console.log(`Данные ${index}:`, data);
          });
      }, index * 1000);
    })(i);
  }</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="summary-section">
        <h2>Ключевые выводы</h2>
        <div class="summary-points">
          <div class="summary-point">
            <div class="point-icon">💡</div>
            <div class="point-text">
              <strong>Понимайте область видимости</strong>: <code>var</code> имеет функциональную область видимости, <code>let</code> и <code>const</code> — блочную.
            </div>
          </div>
          <div class="summary-point">
            <div class="point-icon">🔄</div>
            <div class="point-text">
              <strong>Замыкания "захватывают" переменные, а не их значения</strong>: они сохраняют ссылку на переменную, а не её значение в момент создания.
            </div>
          </div>
          <div class="summary-point">
            <div class="point-icon">⏲️</div>
            <div class="point-text">
              <strong>Обработчики событий выполняются позже</strong>: к моменту их вызова переменные цикла уже могут иметь другие значения.
            </div>
          </div>
          <div class="summary-point">
            <div class="point-icon">✅</div>
            <div class="point-text">
              <strong>Современное решение</strong>: В большинстве случаев, самый простой и чистый способ — использовать <code>let</code> вместо <code>var</code>.
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ClosureLoopExplainer',
    data() {
      return {
        showAnswer: false,
        activeTab: 0,
        isAnimating: false,
        isCorrectAnimating: false,
        logs: [],
        correctLogs: [],
        solutions: [
          {
            id: 'let',
            title: 'Использовать let вместо var',
            shortTitle: 'let',
            code: `const button = document.getElementById("button");
  
  for (let i = 0; i < 3; i++) {
    button.addEventListener("click", function (e) {
      console.log(i);
    });
  }
  
  button.click();`,
            explanation: '<strong>Решение с использованием <code>let</code></strong>: В отличие от <code>var</code>, переменная <code>let</code> имеет блочную область видимости. Это означает, что для каждой итерации цикла создается <em>новая</em> переменная <code>i</code>. Каждое замыкание захватывает свою собственную переменную <code>i</code> со значением из соответствующей итерации.'
          },
          {
            id: 'iife',
            title: 'Использовать IIFE',
            shortTitle: 'IIFE',
            code: `const button = document.getElementById("button");
  
  for (var i = 0; i < 3; i++) {
    (function(localI) {
      button.addEventListener("click", function (e) {
        console.log(localI);
      });
    })(i);
  }
  
  button.click();`,
            explanation: '<strong>Решение с использованием IIFE</strong> (Immediately Invoked Function Expression): Мы создаем и сразу же вызываем функцию, передавая текущее значение <code>i</code> как аргумент. Это создает новую область видимости с локальной переменной <code>localI</code>, которая сохраняет значение <code>i</code> на момент вызова функции.'
          },
          {
            id: 'bind',
            title: 'Использовать bind()',
            shortTitle: 'bind()',
            code: `const button = document.getElementById("button");
  
  for (var i = 0; i < 3; i++) {
    button.addEventListener("click", function (index, e) {
      console.log(index);
    }.bind(null, i));
  }
  
  button.click();`,
            explanation: '<strong>Решение с использованием <code>bind()</code></strong>: Метод <code>bind()</code> создает новую функцию с привязанными аргументами. Мы передаем текущее значение <code>i</code> как аргумент, который будет зафиксирован в новой функции. Первый параметр <code>null</code> — это значение <code>this</code>, которое в данном случае не важно.'
          },
          {
            id: 'data-attr',
            title: 'Использовать data-атрибуты',
            shortTitle: 'data-атрибуты',
            code: `const button = document.getElementById("button");
  
  for (var i = 0; i < 3; i++) {
    const btn = button.cloneNode(true);
    btn.setAttribute('data-index', i);
    btn.addEventListener("click", function (e) {
      const index = parseInt(e.target.getAttribute('data-index'));
      console.log(index);
    });
    button.parentNode.appendChild(btn);
  }
  
  // Примечание: этот код создаст клоны кнопки
  // В реальном сценарии вы бы работали с разными кнопками`,
            explanation: '<strong>Решение с использованием data-атрибутов</strong>: Мы сохраняем значение <code>i</code> как атрибут DOM-элемента (<code>data-index</code>), а затем получаем его из события. Это особенно полезно, когда вы работаете с динамически созданными элементами и хотите связать с ними какие-то данные.'
          }
        ]
      };
    },
    methods: {
      simulateClick() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.logs = [];
        
        // Симулируем вывод в консоль с задержкой
        setTimeout(() => {
          this.logs.push('3');
          
          setTimeout(() => {
            this.logs.push('3');
            
            setTimeout(() => {
              this.logs.push('3');
              
              setTimeout(() => {
                this.isAnimating = false;
              }, 500);
            }, 300);
          }, 300);
        }, 500);
      },
      simulateCorrectClick() {
        if (this.isCorrectAnimating) return;
        
        this.isCorrectAnimating = true;
        this.correctLogs = [];
        
        // Симулируем правильный вывод (0, 1, 2)
        setTimeout(() => {
          this.correctLogs.push('0');
          
          setTimeout(() => {
            this.correctLogs.push('1');
            
            setTimeout(() => {
              this.correctLogs.push('2');
              
              setTimeout(() => {
                this.isCorrectAnimating = false;
              }, 500);
            }, 300);
          }, 300);
        }, 500);
      }
    }
  };
  </script>
  
  <style scoped>
  .closure-explainer {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    color: #333;
    background-color: #fff;
    line-height: 1.6;
  }
  
  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 10px;
    font-size: 2.2rem;
  }
  
  .intro {
    text-align: center;
    color: #666;
    margin-bottom: 30px;
    font-size: 1.1rem;
  }
  
  h2 {
    color: #333;
    border-bottom: 2px solid #4F46E5;
    padding-bottom: 8px;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  
  h3 {
    color: #333;
    margin-top: 25px;
    margin-bottom: 15px;
  }
  
  code {
    background-color: #f0f0f0;
    padding: 2px 5px;
    border-radius: 3px;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    color: #d32f2f;
  }
  
  .code-container {
    background-color: #282c34;
    border-radius: 8px;
    margin: 15px 0;
    overflow: hidden;
  }
  
  .code {
    padding: 15px;
    color: #abb2bf;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
    white-space: pre;
    overflow-x: auto;
  }
  
  .question-block {
    background-color: #f5f5f5;
    border-left: 4px solid #4F46E5;
    padding: 15px;
    border-radius: 0 8px 8px 0;
    margin: 20px 0;
  }
  
  .answer {
    margin-top: 10px;
  }
  
  .reveal-btn {
    display: inline-block;
    background-color: #4F46E5;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
  }
  
  .reveal-btn:hover {
    background-color: #3c35b5;
  }
  
  .answer-content {
    margin-top: 15px;
    animation: fadeIn 0.5s;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .console-output {
    background-color: #282c34;
    color: #abb2bf;
    padding: 10px 15px;
    border-radius: 4px;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    margin: 10px 0;
  }
  
  /* Visualization styles */
  .visualization {
    margin: 30px 0;
  }
  
  .visualization-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .memory-model {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background-color: white;
  }
  
  .memory-title {
    background-color: #4F46E5;
    color: white;
    padding: 10px;
    font-weight: 500;
  }
  
  .memory-area {
    padding: 20px;
    display: flex;
    align-items: flex-start;
    gap: 40px;
  }
  
  .variable {
    border: 1px solid #ddd;
    border-radius: 6px;
    overflow: hidden;
    width: 150px;
  }
  
  .var-name {
    background-color: #f0f0f0;
    padding: 8px 10px;
    font-weight: 500;
    font-family: Consolas, Monaco, monospace;
    font-size: 14px;
    border-bottom: 1px solid #ddd;
  }
  
  .var-value {
    padding: 8px 10px;
    font-family: Consolas, Monaco, monospace;
    font-size: 16px;
    color: #d32f2f;
    text-align: center;
  }
  
  .closures {
    flex: 1;
  }
  
  .closure-title {
    margin-bottom: 10px;
    font-weight: 500;
  }
  
  .closure {
    border: 1px solid #ddd;
    border-radius: 6px;
    margin-bottom: 10px;
    overflow: hidden;
    display: flex;
    height: 40px;
  }
  
  .closure-name {
    background-color: #f0f0f0;
    padding: 8px 10px;
    font-weight: 500;
    width: 150px;
    border-right: 1px solid #ddd;
  }
  
  .closure-scope {
    flex: 1;
    position: relative;
  }
  
  .scope-arrow {
    position: absolute;
    left: 0;
    top: 50%;
    width: 80%;
    height: 2px;
    background-color: #d32f2f;
    transform: translateY(-50%);
  }
  
  .scope-arrow::after {
    content: '';
    position: absolute;
    right: 0;
    top: -4px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 8px solid #d32f2f;
  }
  
  .scope-arrow {
    animation: arrowPulse 2s infinite;
  }
  
  @keyframes arrowPulse {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
  }
  
  /* ПРАВИЛЬНЫЕ РЕШЕНИЯ */
  .variables-array {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 200px;
  }
  
  .variable-in-iteration {
    border: 1px solid #ddd;
    border-radius: 6px;
    overflow: hidden;
  }
  
  .scope-arrow-correct {
    position: absolute;
    left: 0;
    width: 80%;
    height: 2px;
    background-color: #4caf50;
    transform: translateY(-50%);
  }
  
  .scope-arrow-correct::after {
    content: '';
    position: absolute;
    right: 0;
    top: -4px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 8px solid #4caf50;
  }
  
  .closure-bound-args {
    flex: 1;
    padding: 8px 10px;
    display: flex;
    align-items: center;
  }
  
  .bound-arg {
    border: 1px solid #4caf50;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  
  .arg-name {
    background-color: #e8f5e9;
    padding: 2px 6px;
    font-size: 12px;
    border-right: 1px solid #4caf50;
  }
  
  .arg-value {
    padding: 2px 8px;
    color: #4caf50;
    font-weight: 500;
  }
  
  .dom-element {
    border: 1px solid #ff9800;
    border-radius: 6px;
    margin-bottom: 10px;
    overflow: hidden;
    display: flex;
    height: 40px;
  }
  
  .element-name {
    background-color: #fff3e0;
    padding: 8px 10px;
    font-weight: 500;
    width: 120px;
    border-right: 1px solid #ffcc80;
  }
  
  .element-attrs {
    display: flex;
    flex: 1;
    align-items: center;
  }
  
  .attr-name {
    background-color: #fff8e1;
    padding: 2px 8px;
    margin-left: 10px;
    font-family: Consolas, Monaco, monospace;
    font-size: 12px;
    border-radius: 4px 0 0 4px;
    border: 1px solid #ffcc80;
    border-right: none;
  }
  
  .attr-value {
    background-color: white;
    padding: 2px 8px;
    font-family: Consolas, Monaco, monospace;
    font-size: 12px;
    color: #e65100;
    border-radius: 0 4px 4px 0;
    border: 1px solid #ffcc80;
    border-left: none;
  }
  
  .demo-button {
    background-color: #4F46E5;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    font-size: 16px;
    align-self: center;
    transition: background-color 0.3s;
  }
  
  .demo-button:hover:not(:disabled) {
    background-color: #3c35b5;
  }
  
  .demo-button:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
  
  .console-visualization {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background-color: white;
  }
  
  .console-title {
    background-color: #282c34;
    color: white;
    padding: 8px 10px;
    font-family: Consolas, Monaco, monospace;
  }
  
  .console-content {
    background-color: #282c34;
    color: #abb2bf;
    padding: 10px;
    min-height: 100px;
    font-family: Consolas, Monaco, monospace;
  }
  
  .console-visualization.logging .console-content {
    animation: blinkConsole 1s;
  }
  
  @keyframes blinkConsole {
    0% { background-color: #282c34; }
    50% { background-color: #3e4451; }
    100% { background-color: #282c34; }
  }
  
  .log-line {
    margin-bottom: 5px;
    animation: slideFadeIn 0.3s;
  }
  
  @keyframes slideFadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Explanation points */
  .explanation-points {
    margin-top: 30px;
  }
  
  .point {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
  }
  
  .point-number {
    width: 28px;
    height: 28px;
    background-color: #4F46E5;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin-right: 15px;
    flex-shrink: 0;
  }
  
  .point-content {
    flex: 1;
  }
  
  .point-content p {
    margin: 0;
  }
  
  /* Solutions tabs */
  .tabs {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid #e5e7eb;
    gap: 10px;
  }
  
  .tab {
    padding: 10px 15px;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: all 0.3s;
  }
  
  .tab:hover {
    background-color: #f9fafb;
  }
  
  .tab.active {
    border-bottom-color: #4F46E5;
    color: #4F46E5;
    font-weight: 500;
  }
  
  .solution-content {
    animation: fadeIn 0.5s;
  }
  
  .solution-explanation {
    margin: 20px 0;
    line-height: 1.7;
  }
  
  .solution-animation {
    margin-top: 30px;
  }
  
  .animation-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
  }
  
  /* Real world examples */
  .real-world-examples {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .example-card {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .example-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
  
  .example-title {
    background-color: #4F46E5;
    color: white;
    padding: 12px 15px;
    font-weight: 500;
    font-size: 1.1rem;
  }
  
  .example-content {
    padding: 15px;
  }
  
  .example-snippet {
    margin-top: 10px;
  }
  
  .example-snippet .code {
    font-size: 12px;
    max-height: 150px;
    overflow-y: auto;
  }
  
  /* Summary section */
  .summary-points {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .summary-point {
    display: flex;
    align-items: flex-start;
    background-color: #f8fafc;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
  }
  
  .point-icon {
    font-size: 24px;
    margin-right: 15px;
  }
  
  .point-text {
    flex: 1;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .memory-area {
      flex-direction: column;
      align-items: center;
    }
    
    .real-world-examples,
    .summary-points {
      grid-template-columns: 1fr;
    }
    
    .solution-animation .memory-area {
      flex-direction: column;
      align-items: center;
    }
    
    .variables-array {
      width: 100%;
      max-width: 300px;
    }
    
    .point {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .point-number {
      margin-bottom: 10px;
    }
  }
  </style>