<template>
    <div class="js-concept-explorer">
      <h1 class="title">Интерактивный учебник по JavaScript</h1>
      <p class="subtitle">Изучайте ключевые концепции веб-разработки с интерактивными примерами</p>
      
      <!-- Навигационная панель -->
      <div class="nav-container">
        <div class="nav-tabs">
          <button 
            v-for="(topic, index) in topics" 
            :key="topic.id"
            :class="['nav-tab', { active: currentTopicIndex === index }]"
            @click="selectTopic(index)"
          >
            {{ topic.title }}
          </button>
        </div>
      </div>
      
      <!-- Контент текущей темы -->
      <div class="topic-content">
        <transition name="fade" mode="out-in">
          <div v-if="currentTopic.id === 'object-copy'" class="topic-container">
            <h2>5 способов копирования объектов в JavaScript</h2>
            
            <div class="intro-section">
              <p>Копирование объектов — одна из часто встречающихся задач, и в JavaScript есть несколько способов это делать. Важно понимать разницу между поверхностным и глубоким копированием.</p>
              <div class="concept-illustration">
                <div class="original-object">
                  <div class="object-title">Оригинальный объект</div>
                  <div class="object-content">
                    <div class="prop">id: 1</div>
                    <div class="prop">name: "Объект"</div>
                    <div class="nested">
                      <div class="nested-title">metadata</div>
                      <div class="nested-content">
                        <div class="prop">created: "2023-12-01"</div>
                        <div class="nested">
                          <div class="nested-title">author</div>
                          <div class="nested-content">
                            <div class="prop">name: "User"</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="copy-types">
                  <div class="copy-type shallow">
                    <div class="copy-title">Поверхностная копия</div>
                    <div class="copy-icon">
                      <span class="material-icons">content_copy</span>
                    </div>
                    <div class="copy-description">
                      Копирует только свойства первого уровня. Вложенные объекты копируются по ссылке.
                    </div>
                  </div>
                  
                  <div class="copy-type deep">
                    <div class="copy-title">Глубокая копия</div>
                    <div class="copy-icon">
                      <span class="material-icons">layers</span>
                    </div>
                    <div class="copy-description">
                      Копирует всю структуру объекта, включая вложенные объекты.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Селектор метода копирования -->
            <div class="method-selector">
              <button 
                v-for="(method, index) in copyMethods" 
                :key="method.id"
                :class="{ active: currentMethodIndex === index }"
                @click="selectMethod(index)"
              >
                {{ method.name }}
              </button>
            </div>
            
            <!-- Отображение выбранного метода -->
            <div class="method-content">
              <h3>{{ currentMethod.name }}</h3>
              <div class="method-description" v-html="currentMethod.description"></div>
              
              <!-- Визуализация процесса копирования -->
              <div class="visualization">
                <div class="objects-container">
                  <!-- Исходный объект -->
                  <div class="object-box source">
                    <div class="object-title">Исходный объект</div>
                    <div class="object-content">
                      <pre>{{ JSON.stringify(sourceObject, null, 2) }}</pre>
                    </div>
                  </div>
                  
                  <!-- Анимация процесса копирования -->
                  <div class="copy-process">
                    <div class="copy-animation" :class="{ active: isAnimating }">
                      <div class="copy-arrow"></div>
                      <div class="method-name">{{ currentMethod.shortName || currentMethod.name }}</div>
                    </div>
                    <button class="run-button" @click="runCopyDemo">
                      {{ isAnimating ? 'Копирование...' : 'Выполнить копирование' }}
                    </button>
                  </div>
                  
                  <!-- Копия объекта -->
                  <div class="object-box result" :class="{ 'has-result': hasResult }">
                    <div class="object-title">Результат копирования</div>
                    <div class="object-content">
                      <pre>{{ resultObjectString }}</pre>
                    </div>
                  </div>
                </div>
                
                <!-- Результат проверки -->
                <div class="verification-result" v-if="hasResult">
                  <div class="verification-item" :class="isDeepCopy ? 'success' : 'partial'">
                    <div class="verification-icon">{{ isDeepCopy ? '✓' : '△' }}</div>
                    <div class="verification-text">
                      <strong>{{ isDeepCopy ? 'Глубокая копия' : 'Поверхностная копия' }}</strong>
                      <div v-if="!isDeepCopy" class="verification-details">
                        Вложенные объекты ссылаются на оригиналы
                      </div>
                    </div>
                  </div>
                  
                  <div class="verification-item mutations">
                    <div class="mutation-title">Проверка мутации:</div>
                    <div class="mutation-test">
                      <button @click="mutateSource" :disabled="isAnimating">
                        Изменить исходный объект
                      </button>
                      <button @click="mutateResult" :disabled="isAnimating">
                        Изменить скопированный объект
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Пример кода -->
              <div class="code-example">
                <h4>Пример кода:</h4>
                <pre class="code-block"><code>{{ currentMethod.code }}</code></pre>
              </div>
              
              <!-- Преимущества и недостатки -->
              <div class="pros-cons">
                <div class="pros">
                  <h4>Преимущества:</h4>
                  <ul>
                    <li v-for="(pro, index) in currentMethod.pros" :key="`pro-${index}`">
                      {{ pro }}
                    </li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>Недостатки:</h4>
                  <ul>
                    <li v-for="(con, index) in currentMethod.cons" :key="`con-${index}`">
                      {{ con }}
                    </li>
                  </ul>
                </div>
              </div>
              
              <!-- Когда использовать -->
              <div class="when-to-use">
                <h4>Когда использовать:</h4>
                <p>{{ currentMethod.whenToUse }}</p>
              </div>
              
              <!-- Практическое применение -->
              <div class="practical-application">
                <h4>Где применяется в реальной разработке:</h4>
                <ul>
                  <li v-for="(app, index) in currentMethod.applications" :key="`app-${index}`">
                    {{ app }}
                  </li>
                </ul>
              </div>
            </div>
            
            <!-- Сравнительная таблица -->
            <div class="comparison-section">
              <h3>Сравнение методов копирования</h3>
              <div class="table-container">
                <table class="comparison-table">
                  <thead>
                    <tr>
                      <th>Метод</th>
                      <th>Тип копии</th>
                      <th>Производительность</th>
                      <th>Поддержка</th>
                      <th>Ограничения</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="method in copyMethods" :key="`table-${method.id}`">
                      <td>{{ method.name }}</td>
                      <td>{{ method.copyType }}</td>
                      <td>
                        <div class="performance-bar">
                          <div class="performance-fill" :style="{ width: method.performance + '%' }"></div>
                        </div>
                        {{ method.performanceText }}
                      </td>
                      <td>{{ method.support }}</td>
                      <td>{{ method.limitations }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <!-- Алгоритм принятия решения -->
            <div class="decision-algorithm">
              <h3>Алгоритм выбора метода копирования</h3>
              <div class="flowchart">
                <div class="flowchart-node start">
                  <div class="node-content">Нужно скопировать объект</div>
                </div>
                <div class="flowchart-arrow"></div>
                <div class="flowchart-decision">
                  <div class="decision-content">Нужна глубокая копия?</div>
                  <div class="decision-paths">
                    <div class="path">
                      <div class="path-label">Да</div>
                      <div class="path-arrow right"></div>
                      <div class="flowchart-node">
                        <div class="node-content">Есть вложенные функции, классы или циклические ссылки?</div>
                      </div>
                      <div class="decision-paths">
                        <div class="path">
                          <div class="path-label">Да</div>
                          <div class="path-arrow right"></div>
                          <div class="flowchart-node solution">
                            <div class="node-content">Используйте lodash _.cloneDeep()</div>
                          </div>
                        </div>
                        <div class="path">
                          <div class="path-label">Нет</div>
                          <div class="path-arrow right"></div>
                          <div class="flowchart-node solution">
                            <div class="node-content">Используйте structuredClone() или JSON.parse(JSON.stringify())</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="path">
                      <div class="path-label">Нет</div>
                      <div class="path-arrow right"></div>
                      <div class="flowchart-node">
                        <div class="node-content">Нужна высокая производительность?</div>
                      </div>
                      <div class="decision-paths">
                        <div class="path">
                          <div class="path-label">Да</div>
                          <div class="path-arrow right"></div>
                          <div class="flowchart-node solution">
                            <div class="node-content">Используйте spread оператор {...obj}</div>
                          </div>
                        </div>
                        <div class="path">
                          <div class="path-label">Нет</div>
                          <div class="path-arrow right"></div>
                          <div class="flowchart-node solution">
                            <div class="node-content">Используйте Object.assign()</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else-if="currentTopic.id === 'arrow-functions'" class="topic-container">
            <h2>Стрелочные функции: 5 ключевых отличий</h2>
            
            <div class="intro-section">
              <p>Стрелочные функции (arrow functions) — это компактный синтаксис для определения функций, появившийся в ES6. Они не просто краткая запись, а имеют важные отличия от обычных функций.</p>
            </div>
            
            <!-- Селектор отличия -->
            <div class="method-selector">
              <button 
                v-for="(difference, index) in arrowDifferences" 
                :key="difference.id"
                :class="{ active: currentDifferenceIndex === index }"
                @click="selectDifference(index)"
              >
                {{ difference.title }}
              </button>
            </div>
            
            <!-- Отображение выбранного отличия -->
            <div class="method-content">
              <h3>{{ currentDifference.title }}</h3>
              <div class="method-description" v-html="currentDifference.description"></div>
              
              <!-- Пример кода -->
              <div class="code-comparison">
                <div class="code-column">
                  <h4>Обычная функция</h4>
                  <pre class="code-block"><code>{{ currentDifference.regularCode }}</code></pre>
                </div>
                <div class="code-column">
                  <h4>Стрелочная функция</h4>
                  <pre class="code-block"><code>{{ currentDifference.arrowCode }}</code></pre>
                </div>
              </div>
              
              <!-- Визуализация отличия -->
              <div class="visualization" v-if="currentDifference.id === 'this-binding'">
                <div class="this-visualization">
                  <div class="execution-contexts">
                    <div class="context regular-context">
                      <div class="context-title">Контекст обычной функции</div>
                      <div class="context-content">
                        <div class="context-code">
                          <pre>function regularFn() { 
    console.log(this); 
  }</pre>
                        </div>
                        <div class="context-arrow" :class="{ animated: animateRegularThis }"></div>
                        <div class="context-binding">
                          <div class="binding-title">this определяется при вызове:</div>
                          <div class="binding-examples">
                            <div class="binding-example" :class="{ active: regularThisExample === 'global' }">
                              <code>regularFn();</code> → <span>глобальный объект (window)</span>
                            </div>
                            <div class="binding-example" :class="{ active: regularThisExample === 'method' }">
                              <code>obj.method();</code> → <span>объект obj</span>
                            </div>
                            <div class="binding-example" :class="{ active: regularThisExample === 'call' }">
                              <code>regularFn.call(obj);</code> → <span>объект obj</span>
                            </div>
                            <div class="binding-example" :class="{ active: regularThisExample === 'new' }">
                              <code>new regularFn();</code> → <span>новый объект</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="context arrow-context">
                      <div class="context-title">Контекст стрелочной функции</div>
                      <div class="context-content">
                        <div class="context-code">
                          <pre>const arrowFn = () => { 
    console.log(this); 
  }</pre>
                        </div>
                        <div class="context-arrow" :class="{ animated: animateArrowThis }"></div>
                        <div class="context-binding">
                          <div class="binding-title">this всегда берется из окружения:</div>
                          <div class="binding-examples">
                            <div class="binding-example active">
                              <code>const arrowFn = () => { this }</code> → <span>this из внешней области видимости</span>
                            </div>
                            <div class="binding-example">
                              <code>obj.method = () => { this }</code> → <span>НЕ объект obj!</span>
                            </div>
                            <div class="binding-example">
                              <code>arrowFn.call(obj)</code> → <span>this НЕ меняется</span>
                            </div>
                            <div class="binding-example">
                              <code>new arrowFn()</code> → <span>Ошибка! Нельзя использовать с new</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="visualization-controls">
                    <button @click="demonstrateThisBinding('global')">Показать this в глобальном вызове</button>
                    <button @click="demonstrateThisBinding('method')">Показать this в методе объекта</button>
                    <button @click="demonstrateThisBinding('call')">Показать this с call/apply</button>
                    <button @click="demonstrateThisBinding('new')">Показать this с new</button>
                  </div>
                </div>
              </div>
              
              <div class="visualization" v-else-if="currentDifference.id === 'arguments'">
                <div class="arguments-visualization">
                  <div class="function-call">
                    <div class="call-code">myFunction(1, 2, 3, 4, 5);</div>
                    <div class="call-arguments">
                      <div class="arg">1</div>
                      <div class="arg">2</div>
                      <div class="arg">3</div>
                      <div class="arg">4</div>
                      <div class="arg">5</div>
                    </div>
                  </div>
                  
                  <div class="functions-comparison">
                    <div class="function-block regular">
                      <div class="function-title">Обычная функция</div>
                      <div class="function-body">
                        <pre>function myFunction() {
    console.log(arguments);
  }</pre>
                      </div>
                      <div class="arguments-object" :class="{ show: showArgumentsObject }">
                        <div class="arguments-title">arguments</div>
                        <div class="arguments-content">
                          <div class="arguments-items">
                            <div class="arg-item">0: 1</div>
                            <div class="arg-item">1: 2</div>
                            <div class="arg-item">2: 3</div>
                            <div class="arg-item">3: 4</div>
                            <div class="arg-item">4: 5</div>
                            <div class="arg-item">length: 5</div>
                          </div>
                          <div class="arguments-info">
                            Array-like объект, но не массив
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="function-block arrow">
                      <div class="function-title">Стрелочная функция</div>
                      <div class="function-body">
                        <pre>const myFunction = () => {
    console.log(arguments); // undefined или ошибка
  }</pre>
                      </div>
                      <div class="arguments-object error" :class="{ show: showArgumentsObject }">
                        <div class="error-message">
                          ReferenceError: arguments is not defined
                        </div>
                        <div class="arguments-info">
                          Стрелочные функции не имеют своего arguments!
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="rest-params-example" :class="{ show: showRestParams }">
                    <div class="example-title">Решение: использовать rest-параметры</div>
                    <div class="example-code">
                      <pre>const myFunction = (...args) => {
    console.log(args); // [1, 2, 3, 4, 5]
  };</pre>
                    </div>
                    <div class="example-result">
                      <div class="result-arrow"></div>
                      <div class="result-array">
                        <div class="array-title">args</div>
                        <div class="array-items">
                          <div class="array-item">0: 1</div>
                          <div class="array-item">1: 2</div>
                          <div class="array-item">2: 3</div>
                          <div class="array-item">3: 4</div>
                          <div class="array-item">4: 5</div>
                          <div class="array-item">length: 5</div>
                        </div>
                        <div class="array-info">
                          Настоящий массив со всеми методами Array.prototype
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="visualization-controls">
                    <button @click="demonstrateArguments">Показать работу arguments</button>
                    <button @click="demonstrateRestParams">Показать rest-параметры</button>
                  </div>
                </div>
              </div>
              
              <div class="visualization" v-else-if="currentDifference.id === 'constructor'">
                <!-- Визуализация для невозможности использования как конструктор -->
                <div class="constructor-visualization">
                  <div class="construction-demo">
                    <div class="code-execution">
                      <div class="function-declaration">
                        <pre>function RegularFunction() {
    this.value = 42;
  }</pre>
                      </div>
                      <div class="function-invocation">
                        <pre>const instance = new RegularFunction();</pre>
                      </div>
                      <div class="object-creation" :class="{ show: showConstructorDemo }">
                        <div class="arrow-steps">
                          <div class="step" :class="{ active: constructorStep >= 1 }">Создается пустой объект</div>
                          <div class="step" :class="{ active: constructorStep >= 2 }">this связывается с объектом</div>
                          <div class="step" :class="{ active: constructorStep >= 3 }">Выполняется код функции</div>
                          <div class="step" :class="{ active: constructorStep >= 4 }">Функция возвращает объект</div>
                        </div>
                        <div class="object-result">
                          <div class="object-title">instance</div>
                          <div class="object-props" :class="{ show: constructorStep >= 3 }">
                            <div class="prop">value: 42</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="code-execution arrow-error">
                      <div class="function-declaration">
                        <pre>const ArrowFunction = () => {
    this.value = 42;
  }</pre>
                      </div>
                      <div class="function-invocation">
                        <pre>const instance = new ArrowFunction(); // TypeError</pre>
                      </div>
                      <div class="error-message" :class="{ show: showArrowError }">
                        <div class="error-content">
                          TypeError: ArrowFunction is not a constructor
                        </div>
                        <div class="error-explanation">
                          Стрелочные функции нельзя использовать с оператором new
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="visualization-controls">
                    <button @click="demonstrateConstructor">Показать работу конструктора</button>
                    <button @click="demonstrateArrowError">Показать ошибку со стрелочной функцией</button>
                  </div>
                </div>
              </div>
              
              <div class="visualization" v-else-if="currentDifference.id === 'syntax'">
                <!-- Визуализация различий в синтаксисе -->
                <div class="syntax-visualization">
                  <div class="syntax-cases">
                    <div class="case-title">Варианты синтаксиса стрелочных функций</div>
                    
                    <div class="syntax-case">
                      <div class="case-description">
                        <strong>Одно выражение без фигурных скобок</strong> - неявный возврат
                      </div>
                      <div class="syntax-example">
                        <pre>const sum = (a, b) => a + b;</pre>
                      </div>
                      <div class="translation-arrow"></div>
                      <div class="equivalent">
                        <pre>const sum = function(a, b) {
    return a + b;
  };</pre>
                      </div>
                    </div>
                    
                    <div class="syntax-case">
                      <div class="case-description">
                        <strong>С фигурными скобками</strong> - требуется явный return
                      </div>
                      <div class="syntax-example">
                        <pre>const sum = (a, b) => {
    return a + b;
  };</pre>
                      </div>
                      <div class="translation-arrow"></div>
                      <div class="equivalent">
                        <pre>const sum = function(a, b) {
    return a + b;
  };</pre>
                      </div>
                    </div>
                    
                    <div class="syntax-case">
                      <div class="case-description">
                        <strong>Один параметр</strong> - скобки необязательны
                      </div>
                      <div class="syntax-example">
                        <pre>const double = x => x * 2;</pre>
                      </div>
                      <div class="translation-arrow"></div>
                      <div class="equivalent">
                        <pre>const double = function(x) {
    return x * 2;
  };</pre>
                      </div>
                    </div>
                    
                    <div class="syntax-case">
                      <div class="case-description">
                        <strong>Нет параметров</strong> - обязательны пустые скобки
                      </div>
                      <div class="syntax-example">
                        <pre>const getRandomNumber = () => Math.random();</pre>
                      </div>
                      <div class="translation-arrow"></div>
                      <div class="equivalent">
                        <pre>const getRandomNumber = function() {
    return Math.random();
  };</pre>
                      </div>
                    </div>
                    
                    <div class="syntax-case">
                      <div class="case-description">
                        <strong>Возврат объекта</strong> - требуются круглые скобки
                      </div>
                      <div class="syntax-example">
                        <pre>const createUser = (name, age) => ({ name, age });</pre>
                      </div>
                      <div class="translation-arrow"></div>
                      <div class="equivalent">
                        <pre>const createUser = function(name, age) {
    return { name, age };
  };</pre>
                      </div>
                    </div>
                  </div>
                  
                  <div class="syntax-animation">
                    <div class="animation-container">
                      <div class="slide" :class="{ active: syntaxSlide === 0 }">
                        <div class="slide-title">Преобразование обычной функции в стрелочную</div>
                        <div class="transformation">
                          <div class="original">
                            <pre>function calculate(a, b) {
    const result = a * b;
    return result;
  }</pre>
                          </div>
                          <div class="steps">
                            <div class="step" :class="{ highlight: syntaxStep === 1 }">
                              1. Заменить ключевое слово function на =>
                            </div>
                            <div class="step" :class="{ highlight: syntaxStep === 2 }">
                              2. Переместить => после параметров
                            </div>
                            <div class="step" :class="{ highlight: syntaxStep === 3 }">
                              3. Если функция в одну строку, можно убрать { } и return
                            </div>
                          </div>
                          <div class="result">
                            <pre v-if="syntaxStep === 0">function calculate(a, b) {
    const result = a * b;
    return result;
  }</pre>
                            <pre v-else-if="syntaxStep === 1">calculate(a, b) => {
    const result = a * b;
    return result;
  }</pre>
                            <pre v-else-if="syntaxStep === 2">const calculate = (a, b) => {
    const result = a * b;
    return result;
  }</pre>
                            <pre v-else-if="syntaxStep === 3">const calculate = (a, b) => a * b;</pre>
                          </div>
                        </div>
                      </div>
                      
                      <div class="slide" :class="{ active: syntaxSlide === 1 }">
                        <div class="slide-title">Неявный возврат объекта</div>
                        <div class="common-mistake">
                          <div class="mistake-code">
                            <pre>// Будет возвращен undefined!
  const createPerson = (name, age) => { name, age };</pre>
                          </div>
                          <div class="correction">
                            <div class="correction-title">Правильно:</div>
                            <pre>// Оборачиваем объект в круглые скобки
  const createPerson = (name, age) => ({ name, age });</pre>
                          </div>
                          <div class="explanation">
                            Без скобок { name, age } интерпретируется как блок кода, а не как объект!
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="animation-controls">
                      <button @click="previousSyntaxSlide">Предыдущий</button>
                      <button @click="nextSyntaxStep">Следующий шаг</button>
                      <button @click="nextSyntaxSlide">Следующий слайд</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="visualization" v-else-if="currentDifference.id === 'scope'">
                <!-- Визуализация лексического связывания для стрелочных функций -->
                <div class="scope-visualization">
                  <div class="scope-example">
                    <div class="code-sample">
                      <pre><code>const counter = {
    count: 0,
    
    // Обычная функция
    incrementRegular: function() {
      setTimeout(function() {
        this.count++; // 'this' здесь - window!
        console.log(this.count); // NaN
      }, 1000);
    },
    
    // Стрелочная функция
    incrementArrow: function() {
      setTimeout(() => {
        this.count++; // 'this' здесь - объект counter!
        console.log(this.count); // 1
      }, 1000);
    }
  };</code></pre>
                    </div>
                    
                    <div class="example-explanation">
                      <div class="explanation-title">Что происходит?</div>
                      <ul>
                        <li>В setTimeout с обычной функцией, this теряет привязку к объекту counter</li>
                        <li>Стрелочная функция сохраняет this из внешнего контекста (метода incrementArrow)</li>
                        <li>Это особенно полезно для колбэков, таймеров и обработчиков событий</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div class="scope-animation">
                    <div class="animation-title">Визуализация выполнения</div>
                    
                    <div class="animation-toggle">
                      <button 
                        :class="{ active: currentFunctionType === 'regular' }"
                        @click="setFunctionType('regular')"
                      >
                        Обычная функция
                      </button>
                      <button 
                        :class="{ active: currentFunctionType === 'arrow' }"
                        @click="setFunctionType('arrow')"
                      >
                        Стрелочная функция
                      </button>
                    </div>
                    
                    <div class="execution-animation">
                      <div class="animation-stage" :class="{ 'regular-function': currentFunctionType === 'regular', 'arrow-function': currentFunctionType === 'arrow' }">
                        <div class="object-counter">
                          <div class="object-title">counter</div>
                          <div class="object-props">
                            <div class="prop">
                              count: <span class="count-value">{{ animationCountValue }}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div class="execution-flow">
                          <div class="execution-step" :class="{ active: animationStep >= 1 }">
                            <div class="step-number">1</div>
                            <div class="step-description">
                              <span v-if="currentFunctionType === 'regular'">counter.incrementRegular()</span>
                              <span v-else>counter.incrementArrow()</span>
                            </div>
                          </div>
                          
                          <div class="execution-step" :class="{ active: animationStep >= 2 }">
                            <div class="step-number">2</div>
                            <div class="step-description">setTimeout регистрирует колбэк</div>
                          </div>
                          
                          <div class="execution-step" :class="{ active: animationStep >= 3 }">
                            <div class="step-number">3</div>
                            <div class="step-description">Через 1000мс колбэк выполняется</div>
                          </div>
                          
                          <div class="this-binding" :class="{ active: animationStep >= 4 }">
                            <div class="binding-title">Значение this в колбэке:</div>
                            <div class="binding-value" :class="{ 
                              'regular-this': currentFunctionType === 'regular',
                              'arrow-this': currentFunctionType === 'arrow'
                            }">
                              <span v-if="currentFunctionType === 'regular'">window (глобальный объект)</span>
                              <span v-else>counter (из лексического окружения)</span>
                            </div>
                          </div>
                          
                          <div class="execution-result" :class="{ active: animationStep >= 5 }">
                            <div class="result-title">Результат:</div>
                            <div class="result-content" :class="{
                              'error-result': currentFunctionType === 'regular',
                              'success-result': currentFunctionType === 'arrow'
                            }">
                              <span v-if="currentFunctionType === 'regular'">NaN (window.count не определен)</span>
                              <span v-else>1 (counter.count успешно увеличен)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="animation-controls">
                      <button @click="runScopeAnimation">Запустить анимацию</button>
                      <button @click="resetScopeAnimation">Сбросить</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Ключевые выводы -->
              <div class="key-takeaways">
                <h4>Ключевые выводы:</h4>
                <ul>
                  <li>{{ currentDifference.keyPoints[0] }}</li>
                  <li>{{ currentDifference.keyPoints[1] }}</li>
                  <li v-if="currentDifference.keyPoints[2]">{{ currentDifference.keyPoints[2] }}</li>
                </ul>
              </div>
              
              <!-- Практическое применение -->
              <div class="practical-application">
                <h4>Где применяется в реальной разработке:</h4>
                <ul>
                  <li v-for="(app, index) in currentDifference.applications" :key="`app-${index}`">
                    {{ app }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <!-- Заглушка для других тем -->
          <div v-else class="topic-container">
            <h2>{{ currentTopic.title }}</h2>
            <p>Этот раздел находится в разработке. Вскоре здесь появится интерактивное объяснение данной темы.</p>
            
            <div class="topic-description">
              <p>Тема будет включать:</p>
              <ul>
                <li>Подробное объяснение концепции</li>
                <li>Интерактивные иллюстрации</li>
                <li>Примеры применения в реальной разработке</li>
                <li>Практические кейсы</li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Темы учебника
  const topics = [
    { id: 'object-copy', title: 'Копирование объектов' },
    { id: 'arrow-functions', title: 'Стрелочные функции' },
    { id: 'event-loop', title: 'Event Loop' },
    { id: 'promises', title: 'Promises' },
    { id: 'promise-methods', title: 'Promise.any vs Promise.race' },
    { id: 'hasown-vs-in', title: 'hasOwn vs in' },
    { id: 'map-foreach', title: 'map vs forEach' },
    { id: 'object-freeze', title: 'Object.freeze и дескрипторы' },
    { id: 'abort-controller', title: 'AbortController' },
    { id: 'garbage-collection', title: 'Сборщик мусора' },
    { id: 'generic-ts', title: 'Generic в TypeScript' },
    { id: 'utility-types', title: 'Utility Types (Pick, Omit)' },
    { id: 'typeguards', title: 'Typeguards и оператор is' },
    { id: 'never-type', title: 'Тип never в TypeScript' },
    { id: 'browser-url', title: 'Процесс загрузки URL' },
    { id: 'rendering-cycle', title: 'Layout, Painting, Composition' },
    { id: 'cookies', title: 'Cookie флаги' },
    { id: 'jwt-storage', title: 'Хранение JWT токенов' },
    { id: 'get-vs-post', title: 'GET vs POST' },
    { id: 'websockets', title: 'WebSockets, Polling, SSE' },
    { id: 'debounce-throttle', title: 'Debounce vs Throttle' },
    { id: 'vue-benefits', title: 'Преимущества Vue' },
    { id: 'vue-key', title: 'Атрибут key во Vue' }
  ];
  
  // Текущая выбранная тема
  const currentTopicIndex = ref(0);
  const currentTopic = computed(() => topics[currentTopicIndex.value]);
  
  // Функция для выбора темы
  function selectTopic(index) {
    currentTopicIndex.value = index;
    
    // Сброс индексов для подтем
    currentMethodIndex.value = 0;
    currentDifferenceIndex.value = 0;
    
    // Сброс состояний
    resetDemoStates();
  }
  
  // Функция для сброса всех состояний демо
  function resetDemoStates() {
    // Сброс состояния для копирования объектов
    isAnimating.value = false;
    hasResult.value = false;
    resultObject.value = null;
    
    // Сброс состояния для стрелочных функций
    animateRegularThis.value = false;
    animateArrowThis.value = false;
    regularThisExample.value = '';
    showArgumentsObject.value = false;
    showRestParams.value = false;
    showConstructorDemo.value = false;
    showArrowError.value = false;
    constructorStep.value = 0;
    syntaxStep.value = 0;
    syntaxSlide.value = 0;
    animationStep.value = 0;
    animationCountValue.value = 0;
    currentFunctionType.value = 'regular';
  }
  
  // ===================== КОПИРОВАНИЕ ОБЪЕКТОВ =====================
  
  // Пример объекта для копирования
  const sourceObject = ref({
    id: 1,
    name: "Объект для копирования",
    isActive: true,
    tags: ["javascript", "копирование", "объекты"],
    metadata: {
      created: "2023-12-01",
      author: {
        name: "Разработчик",
        level: "Middle"
      }
    }
  });
  
  // Копия исходного объекта для сброса
  const originalSource = JSON.parse(JSON.stringify(sourceObject.value));
  
  // Результат копирования
  const resultObject = ref(null);
  const hasResult = ref(false);
  const isDeepCopy = ref(false);
  const isAnimating = ref(false);
  
  // Результат в виде строки
  const resultObjectString = computed(() => {
    if (!resultObject.value) return '';
    return JSON.stringify(resultObject.value, null, 2);
  });
  
  // Методы копирования объектов
  const copyMethods = [
    {
      id: "spread",
      name: "Оператор spread {...}",
      shortName: "{ ...obj }",
      description: `<p>Оператор распространения (spread operator) <code>{...obj}</code> создаёт новый объект и копирует все свойства исходного объекта на верхнем уровне.</p>
      <p>Это <strong>поверхностное копирование</strong> — вложенные объекты и массивы копируются по ссылке, а не по значению.</p>`,
      code: `// Создание копии объекта с помощью spread оператора
  const original = {
    id: 1,
    name: "Исходный объект",
    metadata: {
      created: "2023-12-01",
      author: { name: "Разработчик" }
    }
  };
  
  // Создаём поверхностную копию
  const copy = { ...original };
  
  // Проверка: изменение вложенного свойства
  original.metadata.author.name = "Новое имя";
  console.log(copy.metadata.author.name); // "Новое имя" - изменилось!
  
  // Объекты ссылаются на одну и ту же область памяти
  console.log(original.metadata === copy.metadata); // true`,
      pros: [
        "Простой и понятный синтаксис",
        "Хорошая производительность",
        "Можно объединять несколько объектов",
        "Поддерживается во всех современных браузерах"
      ],
      cons: [
        "Создаёт только поверхностную копию",
        "Вложенные объекты остаются связанными с оригиналом",
        "Требует дополнительной обработки для глубокого копирования"
      ],
      whenToUse: "Используйте, когда нужно быстро создать независимую копию простого объекта без вложенных структур или когда связь вложенных объектов не является проблемой.",
      applications: [
        "Создание новых объектов состояния в Redux/Vuex, не мутируя исходные",
        "Обновление объектов конфигурации, сохраняя исходные настройки",
        "Объединение данных из нескольких источников (объектов)"
      ],
      copyType: "Поверхностная",
      performance: 90,
      performanceText: "Высокая",
      support: "ES6+",
      limitations: "Только поверхностная копия"
    },
    {
      id: "assign",
      name: "Object.assign()",
      description: `<p><code>Object.assign()</code> копирует перечисляемые свойства из одного или нескольких исходных объектов в целевой объект и возвращает его.</p>
      <p>Как и spread-оператор, <code>Object.assign()</code> выполняет <strong>поверхностное копирование</strong>. Вложенные объекты просто передаются по ссылке.</p>`,
      code: `// Копирование объекта через Object.assign()
  const original = {
    id: 1,
    name: "Исходный объект",
    metadata: {
      created: "2023-12-01",
      author: { name: "Разработчик" }
    }
  };
  
  // Создаём поверхностную копию
  const copy = Object.assign({}, original);
  
  // Можно также объединять несколько объектов
  const extended = Object.assign({}, original, { extraProp: "Новое свойство" });
  
  // Проверка: изменение вложенного свойства
  original.metadata.created = "2023-12-02";
  console.log(copy.metadata.created); // "2023-12-02" - изменилось!`,
      pros: [
        "Поддерживает объединение нескольких исходных объектов",
        "Лучше поддерживается в старых браузерах",
        "Можно использовать для расширения объектов",
        "Возвращает целевой объект (удобно для цепочек)"
      ],
      cons: [
        "Создаёт только поверхностную копию",
        "Вложенные объекты остаются связанными",
        "Менее наглядный синтаксис, чем у spread-оператора"
      ],
      whenToUse: "Подходит, когда необходимо объединить несколько объектов в один или когда требуется поддержка старых браузеров без транспиляции.",
      applications: [
        "Слияние конфигураций с дефолтными значениями",
        "Создание новых версий объектов в функциональном программировании",
        "Копирование свойств из нескольких объектов-прототипов"
      ],
      copyType: "Поверхностная",
      performance: 85,
      performanceText: "Высокая",
      support: "ES6+, IE11+",
      limitations: "Только поверхностная копия"
    },
    {
      id: "json",
      name: "JSON.parse + JSON.stringify",
      description: `<p>Этот метод преобразует объект в JSON-строку, а затем преобразует эту строку обратно в новый объект.</p>
      <p>Это создаёт <strong>глубокую копию</strong> объекта, то есть все вложенные объекты и массивы также копируются.</p>
      <p>Однако этот метод имеет существенные ограничения: не копирует функции, объекты Date преобразуются в строки, и могут быть проблемы с циклическими ссылками.</p>`,
      code: `// Глубокое копирование через JSON
  const original = {
    id: 1,
    name: "Исходный объект",
    metadata: {
      created: "2023-12-01",
      author: { name: "Разработчик" }
    }
  };
  
  // Создаём глубокую копию
  const copy = JSON.parse(JSON.stringify(original));
  
  // Проверка: изменение вложенного свойства
  original.metadata.author.name = "Новое имя";
  console.log(copy.metadata.author.name); // "Разработчик" - не изменилось!
  
  // Объекты независимы друг от друга
  console.log(original.metadata === copy.metadata); // false
  
  // ОГРАНИЧЕНИЯ:
  const objWithFunction = {
    name: "Тест",
    method: function() { return "Привет"; },
    date: new Date(),
    regExp: /test/
  };
  
  const badCopy = JSON.parse(JSON.stringify(objWithFunction));
  console.log(badCopy.method); // undefined - функция потеряна!
  console.log(badCopy.date); // строка, а не объект Date
  console.log(badCopy.regExp); // пустой объект {}`,
      pros: [
        "Создаёт полную глубокую копию объекта",
        "Встроенный в JavaScript метод, не требует библиотек",
        "Простой для понимания подход"
      ],
      cons: [
        "Не копирует функции, методы и прототипы",
        "Преобразует Date, RegExp, Map, Set и другие объекты некорректно",
        "Выбрасывает ошибку на циклических объектах",
        "Более низкая производительность для больших объектов"
      ],
      whenToUse: "Используйте для быстрого глубокого копирования объектов с простой структурой, содержащих только данные (без функций, специальных объектов или циклических ссылок).",
      applications: [
        "Сериализация данных для отправки по сети",
        "Создание снимков состояния для отладки или логирования",
        "Клонирование данных из API перед обработкой"
      ],
      copyType: "Глубокая",
      performance: 60,
      performanceText: "Средняя",
      support: "Все браузеры",
      limitations: "Не работает с функциями, Date, циклическими ссылками"
    },
    {
      id: "structuredClone",
      name: "structuredClone()",
      description: `<p><code>structuredClone()</code> — это встроенный в JavaScript метод, специально созданный для глубокого клонирования объектов.</p>
      <p>Он создаёт <strong>глубокую копию</strong> объектов и поддерживает циклические ссылки, а также многие встроенные типы данных, такие как Date, Map, Set, и типизированные массивы.</p>
      <p>Однако он не может клонировать функции, DOM-узлы и некоторые другие объекты.</p>`,
      code: `// Глубокое клонирование с помощью structuredClone()
  const original = {
    id: 1,
    name: "Исходный объект",
    metadata: {
      created: new Date(), // Объект Date
      map: new Map([["key", "value"]]), // Map
      set: new Set([1, 2, 3]) // Set
    }
  };
  
  // Создаём глубокую копию
  const copy = structuredClone(original);
  
  // Проверка: изменение вложенного свойства
  original.metadata.map.set("key", "новое значение");
  console.log(copy.metadata.map.get("key")); // "value" - не изменилось!
  
  // Date, Map и Set скопированы правильно
  console.log(copy.metadata.created instanceof Date); // true
  console.log(copy.metadata.map instanceof Map); // true
  console.log(copy.metadata.set instanceof Set); // true
  
  // Проверка циклической ссылки
  const cyclical = { name: "цикл" };
  cyclical.self = cyclical; // Циклическая ссылка
  
  const cycleCopy = structuredClone(cyclical);
  console.log(cycleCopy.self === cycleCopy); // true - копия тоже циклическая
  console.log(cycleCopy !== cyclical); // true - это разные объекты`,
      pros: [
        "Создаёт настоящую глубокую копию объекта",
        "Поддерживает циклические ссылки и большинство встроенных типов данных",
        "Правильно копирует Date, RegExp, Map, Set, ArrayBuffer и другие специальные объекты",
        "Встроенный API, не требует внешних библиотек"
      ],
      cons: [
        "Не копирует функции и методы",
        "Не работает с DOM-узлами и другими платформенными объектами",
        "Относительно новая функция, отсутствует в старых браузерах",
        "Может быть медленнее других методов на очень больших объектах"
      ],
      whenToUse: "Оптимально для глубокого копирования сложных объектов с вложенными структурами, включая циклические ссылки и специальные типы данных, но без функций или DOM-узлов.",
      applications: [
        "Создание независимых копий состояний в приложениях",
        "Глубокое клонирование для операций undo/redo",
        "Копирование сложных объектов конфигураций или данных"
      ],
      copyType: "Глубокая",
      performance: 70,
      performanceText: "Хорошая",
      support: "Современные браузеры",
      limitations: "Не копирует функции и DOM-узлы"
    },
    {
      id: "lodash",
      name: "Lodash _.cloneDeep()",
      description: `<p>Метод <code>_.cloneDeep()</code> из библиотеки Lodash создаёт полную глубокую копию объекта, включая все вложенные структуры.</p>
      <p>Это один из самых надёжных способов копирования, который правильно обрабатывает большинство случаев, включая функции, специальные объекты и циклические ссылки.</p>`,
      code: `// Подключение Lodash
  import _ from 'lodash';
  // или для использования только нужной функции:
  // import cloneDeep from 'lodash/cloneDeep';
  
  const original = {
    id: 1,
    name: "Исходный объект",
    metadata: {
      created: new Date(),
      calculate: function(x) { return x * 2; },
      regexp: /test/g
    }
  };
  
  // Создаём глубокую копию
  const copy = _.cloneDeep(original);
  
  // Проверка: изменение вложенного свойства
  original.metadata.created.setFullYear(2025);
  console.log(copy.metadata.created.getFullYear()); // Не 2025, а исходный год
  
  // Проверка копирования функции
  console.log(copy.metadata.calculate(5)); // 10 - функция работает
  console.log(copy.metadata.calculate !== original.metadata.calculate); // true - разные функции
  
  // Проверка регулярного выражения
  console.log(copy.metadata.regexp instanceof RegExp); // true
  console.log(copy.metadata.regexp.source); // "test"
  
  // Циклические ссылки тоже обрабатываются корректно
  const cyclical = { name: "цикл" };
  cyclical.self = cyclical;
  const cycleCopy = _.cloneDeep(cyclical);
  console.log(cycleCopy.self === cycleCopy); // true - структура сохранена`,
      pros: [
        "Создаёт наиболее полную глубокую копию объекта",
        "Корректно обрабатывает функции, прототипы и специальные объекты",
        "Поддерживает циклические ссылки и сложные структуры данных",
        "Хорошо протестирован и поддерживается в различных окружениях"
      ],
      cons: [
        "Требует подключения внешней библиотеки (увеличивает размер бандла)",
        "Может быть избыточным для простых случаев",
        "Немного ниже производительность по сравнению с нативными методами"
      ],
      whenToUse: "Идеальный выбор для глубокого копирования сложных объектов в промышленной разработке, особенно когда требуется копирование функций и обработка сложных структур данных.",
      applications: [
        "Копирование сложных структур данных с функциями в приложениях",
        "Создание независимых копий объектов конфигурации",
        "Клонирование состояний для иммутабельных операций в крупных проектах"
      ],
      copyType: "Глубокая",
      performance: 65,
      performanceText: "Хорошая",
      support: "Все браузеры (через npm)",
      limitations: "Требуется подключение библиотеки"
    }
  ];
  
  // Текущий метод копирования
  const currentMethodIndex = ref(0);
  const currentMethod = computed(() => copyMethods[currentMethodIndex.value]);
  
  // Функция для выбора метода копирования
  function selectMethod(index) {
    currentMethodIndex.value = index;
    
    // Сброс результатов
    hasResult.value = false;
    resultObject.value = null;
    isAnimating.value = false;
    

    
    Object.keys(originalSource).forEach(key => {
      sourceObject.value[key] = JSON.parse(JSON.stringify(originalSource[key]));
    });
  }
  
  // Функция для запуска демонстрации копирования
  async function runCopyDemo() {
    if (isAnimating.value) return;
    
    isAnimating.value = true;
    
    // Задержка для анимации
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Копирование объекта в зависимости от выбранного метода
    const methodId = currentMethod.value.id;
    
    switch (methodId) {
      case 'spread':
        resultObject.value = { ...sourceObject.value };
        isDeepCopy.value = false;
        break;
      case 'assign':
        resultObject.value = Object.assign({}, sourceObject.value);
        isDeepCopy.value = false;
        break;
      case 'json':
        resultObject.value = JSON.parse(JSON.stringify(sourceObject.value));
        isDeepCopy.value = true;
        break;
      case 'structuredClone':
        // Имитация structuredClone
        resultObject.value = JSON.parse(JSON.stringify(sourceObject.value));
        isDeepCopy.value = true;
        break;
      case 'lodash':
        // Имитация lodash cloneDeep
        resultObject.value = JSON.parse(JSON.stringify(sourceObject.value));
        isDeepCopy.value = true;
        break;
    }
    
    // Завершение анимации
    hasResult.value = true;
    isAnimating.value = false;
  }
  
  // Мутация исходного объекта для демонстрации связи/независимости
  function mutateSource() {
    // Изменяем вложенное свойство
    if (sourceObject.value.metadata && sourceObject.value.metadata.author) {
      sourceObject.value.metadata.author.name = "Изменённое имя";
    }
    
    // Также добавляем метку для наглядности
    sourceObject.value.mutated = "Исходный объект был изменён";
  }
  
  // Мутация результата для демонстрации связи/независимости
  function mutateResult() {
    if (resultObject.value && resultObject.value.metadata && resultObject.value.metadata.author) {
      resultObject.value.metadata.author.level = "Senior";
    }
    
    // Добавляем метку
    resultObject.value.mutated = "Копия была изменена";
  }
  
  // ===================== СТРЕЛОЧНЫЕ ФУНКЦИИ =====================
  
  // Отличия стрелочных функций
  const arrowDifferences = [
    {
      id: "this-binding",
      title: "Лексический this",
      description: `<p>Одно из самых важных отличий стрелочных функций — отсутствие собственного значения <code>this</code>. Вместо этого они используют значение <code>this</code> из окружающего лексического контекста.</p>
      <p>В обычных функциях <code>this</code> определяется во время выполнения, в зависимости от способа вызова. В стрелочных функциях <code>this</code> "захватывается" из внешнего окружения, где была определена функция.</p>`,
      regularCode: `const obj = {
    name: "Объект",
    regularMethod: function() {
      console.log(this.name); // "Объект"
      
      function innerFunction() {
        // this теряется и указывает на глобальный объект
        console.log(this.name); // undefined
      }
      
      innerFunction();
    }
  };
  
  obj.regularMethod();`,
      arrowCode: `const obj = {
    name: "Объект",
    arrowMethod: function() {
      console.log(this.name); // "Объект"
      
      // Стрелочная функция наследует this
      const innerArrow = () => {
        console.log(this.name); // "Объект"
      }
      
      innerArrow();
    }
  };
  
  obj.arrowMethod();`,
      keyPoints: [
        "Стрелочная функция не имеет своего this, она использует this из внешней области видимости",
        "В отличие от обычной функции, this в стрелочной функции не может быть изменен даже через bind(), call() или apply()",
        "Это делает стрелочные функции идеальными для колбэков, обработчиков событий и таймеров"
      ],
      applications: [
        "Обработчики событий, где важно сохранить контекст компонента/класса",
        "Асинхронные функции (колбэки Promise, setTimeout) внутри методов объектов",
        "Методы в классах React для обеспечения правильного привязывания контекста к обработчикам"
      ]
    },
    {
      id: "arguments",
      title: "Отсутствие arguments",
      description: `<p>Стрелочные функции не имеют собственного объекта <code>arguments</code>, который содержит все аргументы, переданные функции.</p>
      <p>Если необходимо получить список всех аргументов в стрелочной функции, нужно использовать rest-параметры (<code>...args</code>).</p>`,
      regularCode: `function sum() {
    console.log(arguments); // объект arguments
    
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
      total += arguments[i];
    }
    
    return total;
  }
  
  sum(1, 2, 3, 4); // 10`,
      arrowCode: `const sum = (...args) => {
    console.log(arguments); // ReferenceError!
    
    // Используем rest-параметр вместо arguments
    return args.reduce((total, num) => total + num, 0);
  };
  
  const sumCorrect = (...args) => {
    // args это настоящий массив
    return args.reduce((total, num) => total + num, 0);
  };
  
  sumCorrect(1, 2, 3, 4); // 10`,
      keyPoints: [
        "Стрелочные функции не имеют собственного объекта arguments",
        "Для доступа к аргументам функции нужно использовать rest-параметры (...args)"
      ],
      applications: [
        "Функциональное программирование с методами массивов (reduce, map, filter)",
        "Короткий синтаксис для функций-утилит с переменным числом аргументов",
        "Обертки функций с чистым списком аргументов вместо псевдомассива arguments"
      ]
    },
    {
      id: "constructor",
      title: "Нельзя использовать как конструктор",
      description: `<p>Стрелочные функции нельзя использовать с оператором <code>new</code>, то есть они не могут выступать в роли конструкторов.</p>
      <p>При попытке создать экземпляр класса с помощью стрелочной функции будет выброшено исключение <code>TypeError</code>.</p>`,
      regularCode: `function Person(name) {
    this.name = name;
  }
  
  const john = new Person('John');
  console.log(john.name); // "John"`,
      arrowCode: `const Person = (name) => {
    this.name = name;
  };
  
  try {
    const john = new Person('John');
  } catch (error) {
    console.error(error);
    // TypeError: Person is not a constructor
  }`,
      keyPoints: [
        "Стрелочные функции нельзя использовать с оператором new",
        "Попытка вызвать стрелочную функцию как конструктор приводит к TypeError"
      ],
      applications: [
        "Применяется как ограничение, чтобы функция не могла быть случайно использована как конструктор",
        "Обычно не является проблемой, т.к. для создания классов используется синтаксис class"
      ]
    },
    {
      id: "syntax",
      title: "Более компактный синтаксис",
      description: `<p>Стрелочные функции имеют более компактный синтаксис по сравнению с обычными функциями. Особенно это заметно для простых функций, которые делают одну операцию.</p>
      <p>При использовании выражения (без фигурных скобок), стрелочная функция автоматически возвращает результат этого выражения без необходимости писать <code>return</code>.</p>`,
      regularCode: `// Обычная функция с одним выражением
  function double(x) {
    return x * 2;
  }
  
  // Функция с несколькими параметрами
  function add(a, b) {
    return a + b;
  }
  
  // Сортировка массива
  const numbers = [5, 3, 8, 1];
  numbers.sort(function(a, b) {
    return a - b;
  });`,
      arrowCode: `// Компактная стрелочная функция
  const double = x => x * 2;
  
  // С несколькими параметрами
  const add = (a, b) => a + b;
  
  // Сортировка массива
  const numbers = [5, 3, 8, 1];
  numbers.sort((a, b) => a - b);
  
  // Функция, возвращающая объект
  const createUser = (name, age) => ({ name, age });`,
      keyPoints: [
        "Стрелочные функции позволяют писать более компактный код",
        "Функции без блока кода автоматически возвращают результат выражения"
      ],
      applications: [
        "Колбэки методов массивов (map, filter, reduce), где экономия места важна",
        "Однострочные функции-обработчики, которые становятся более читаемыми",
        "Цепочки Promise, где много небольших функций-обработчиков"
      ]
    },
    {
      id: "scope",
      title: "Не создают собственный scope",
      description: `<p>Стрелочные функции не создают собственную область видимости, а используют область видимости из контекста, в котором они определены.</p>
      <p>Это делает их идеальными для использования в качестве колбэков внутри методов, так как они сохраняют доступ к <code>this</code> родительской функции.</p>`,
      regularCode: `class Counter {
    constructor() {
      this.count = 0;
      this.button = document.getElementById('button');
      
      // С обычной функцией this теряется
      this.button.addEventListener('click', function() {
        this.count++; // this указывает на button, а не Counter
        console.log(this.count); // undefined
      });
    }
  }
  
  // Решение с сохранением this
  class CounterFixed {
    constructor() {
      this.count = 0;
      this.button = document.getElementById('button');
      
      const self = this; // Сохраняем this
      this.button.addEventListener('click', function() {
        self.count++; // используем сохраненный this
        console.log(self.count); // работает правильно
      });
    }
  }`,
      arrowCode: `class Counter {
    constructor() {
      this.count = 0;
      this.button = document.getElementById('button');
      
      // Стрелочная функция сохраняет this из конструктора
      this.button.addEventListener('click', () => {
        this.count++; // this указывает на экземпляр Counter
        console.log(this.count); // работает как ожидается
      });
    }
  }`,
      keyPoints: [
        "Стрелочные функции сохраняют значение this из окружающего контекста",
        "Это упрощает использование колбэков внутри методов классов/объектов",
        "Устраняет необходимость использовать bind() или сохранять this в переменной"
      ],
      applications: [
        "Обработчики событий в классах и компонентах",
        "Асинхронные операции, где нужно сохранить контекст (fetch, setTimeout)",
        "Методы массивов внутри объектных методов, где важен доступ к this объекта"
      ]
    }
  ];
  
  // Текущее отличие стрелочных функций
  const currentDifferenceIndex = ref(0);
  const currentDifference = computed(() => arrowDifferences[currentDifferenceIndex.value]);
  
  // Функция для выбора отличия
  function selectDifference(index) {
    currentDifferenceIndex.value = index;
    
    // Сброс состояний визуализации
    animateRegularThis.value = false;
    animateArrowThis.value = false;
    regularThisExample.value = '';
    showArgumentsObject.value = false;
    showRestParams.value = false;
    showConstructorDemo.value = false;
    showArrowError.value = false;
    constructorStep.value = 0;
    syntaxStep.value = 0;
    syntaxSlide.value = 0;
    animationStep.value = 0;
    animationCountValue.value = 0;
  }
  
  // Состояния для анимации this-binding
  const animateRegularThis = ref(false);
  const animateArrowThis = ref(false);
  const regularThisExample = ref('');
  
  // Функция для демонстрации привязки this
  function demonstrateThisBinding(type) {
    regularThisExample.value = type;
    
    // Сначала покажем поведение обычной функции
    animateRegularThis.value = true;
    
    // Затем покажем поведение стрелочной функции
    setTimeout(() => {
      animateArrowThis.value = true;
      
      // Сбросим анимацию через 3 секунды
      setTimeout(() => {
        animateRegularThis.value = false;
        animateArrowThis.value = false;
      }, 3000);
    }, 1500);
  }
  
  // Состояния для анимации arguments
  const showArgumentsObject = ref(false);
  const showRestParams = ref(false);
  
  // Функция для демонстрации arguments
  function demonstrateArguments() {
    showArgumentsObject.value = true;
    showRestParams.value = false;
  }
  
  // Функция для демонстрации rest-параметров
  function demonstrateRestParams() {
    showRestParams.value = true;
  }
  
  // Состояния для анимации конструктора
  const showConstructorDemo = ref(false);
  const showArrowError = ref(false);
  const constructorStep = ref(0);
  
  // Функция для демонстрации конструктора
  function demonstrateConstructor() {
    showConstructorDemo.value = true;
    showArrowError.value = false;
    constructorStep.value = 0;
    
    // Пошаговая анимация создания объекта
    const steps = [1, 2, 3, 4];
    steps.forEach((step, index) => {
      setTimeout(() => {
        constructorStep.value = step;
      }, (index + 1) * 1000);
    });
  }
  
  // Функция для демонстрации ошибки со стрелочной функцией
  function demonstrateArrowError() {
    showArrowError.value = true;
    showConstructorDemo.value = false;
  }
  
  // Состояния для анимации синтаксиса
  const syntaxStep = ref(0);
  const syntaxSlide = ref(0);
  
  // Функция для перехода к следующему шагу анимации синтаксиса
  function nextSyntaxStep() {
    syntaxStep.value = (syntaxStep.value + 1) % 4;
  }
  
  // Функция для перехода к следующему слайду анимации синтаксиса
  function nextSyntaxSlide() {
    syntaxSlide.value = (syntaxSlide.value + 1) % 2;
    syntaxStep.value = 0;
  }
  
  // Функция для перехода к предыдущему слайду анимации синтаксиса
  function previousSyntaxSlide() {
    syntaxSlide.value = syntaxSlide.value === 0 ? 1 : 0;
    syntaxStep.value = 0;
  }
  
  // Состояния для анимации области видимости
  const animationStep = ref(0);
  const animationCountValue = ref(0);
  const currentFunctionType = ref('regular');
  
  // Функция для установки типа функции в анимации
  function setFunctionType(type) {
    currentFunctionType.value = type;
    animationStep.value = 0;
    animationCountValue.value = 0;
  }
  
  // Функция для запуска анимации области видимости
  function runScopeAnimation() {
    animationStep.value = 0;
    animationCountValue.value = 0;
    
    // Пошаговая анимация
    for (let i = 1; i <= 5; i++) {
      setTimeout(() => {
        animationStep.value = i;
        
        // На последнем шаге обновим значение счетчика
        if (i === 5 && currentFunctionType.value === 'arrow') {
          animationCountValue.value = 1;
        }
      }, i * 1000);
    }
  }
  
  // Функция для сброса анимации области видимости
  function resetScopeAnimation() {
    animationStep.value = 0;
    animationCountValue.value = 0;
  }
  </script>
  
  <style>
  .js-concept-explorer {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
    background-color: #fff;
  }
  
  .title {
    text-align: center;
    color: #333;
    margin-bottom: 10px;
    font-size: 2.2rem;
  }
  
  .subtitle {
    text-align: center;
    color: #666;
    margin-bottom: 30px;
    font-size: 1.2rem;
  }
  
  /* Навигация */
  .nav-container {
    margin-bottom: 30px;
    border-bottom: 1px solid #eee;
  }
  
  .nav-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 10px;
  }
  
  .nav-tab {
    padding: 8px 16px;
    background-color: #f5f5f5;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9rem;
    white-space: nowrap;
    transition: all 0.3s;
  }
  
  .nav-tab:hover {
    background-color: #e9e9e9;
  }
  
  .nav-tab.active {
    background-color: #333;
    color: #fff;
  }
  
  /* Контент темы */
  .topic-content {
    background-color: #fff;
    border-radius: 8px;
    min-height: 300px;
  }
  
  .topic-container {
    padding: 0 10px;
  }
  
  .intro-section {
    margin-bottom: 30px;
  }
  
  .concept-illustration {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    margin: 20px 0;
    align-items: center;
  }
  
  .original-object {
    flex: 1;
    min-width: 300px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .object-title {
    background-color: #f5f5f5;
    padding: 8px 12px;
    font-weight: bold;
    color: #333;
    border-bottom: 1px solid #ddd;
  }
  
  .object-content {
    padding: 12px;
  }
  
  .prop {
    margin-bottom: 8px;
    padding: 4px;
    font-family: monospace;
  }
  
  .nested {
    border-left: 2px solid #ddd;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  
  .nested-title {
    font-weight: bold;
    margin-bottom: 6px;
    font-family: monospace;
  }
  
  .nested-content {
    padding-left: 10px;
  }
  
  .copy-types {
    flex: 1;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .copy-type {
    padding: 15px;
    border-radius: 8px;
  }
  
  .copy-type.shallow {
    background-color: #fff8dc;
    border: 1px solid #f0e68c;
  }
  
  .copy-type.deep {
    background-color: #e0ffff;
    border: 1px solid #add8e6;
  }
  
  .copy-title {
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
    font-size: 1.1rem;
  }
  
  .copy-icon {
    text-align: center;
    margin-bottom: 10px;
    font-size: 1.5rem;
  }
  
  .copy-description {
    text-align: center;
    line-height: 1.4;
  }
  
  /* Селектор метода */
  .method-selector {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .method-selector button {
    padding: 10px 16px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s;
  }
  
  .method-selector button:hover {
    background-color: #e9e9e9;
  }
  
  .method-selector button.active {
    background-color: #333;
    color: #fff;
    border-color: #333;
  }
  
  /* Контент метода */
  .method-content {
    margin-bottom: 30px;
  }
  
  .method-description {
    margin-bottom: 20px;
    line-height: 1.5;
  }
  
  .method-description code {
    background-color: #f5f5f5;
    padding: 2px 5px;
    border-radius: 3px;
    font-family: monospace;
  }
  
  /* Визуализация */
  .visualization {
    margin: 30px 0;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #eee;
  }
  
  .objects-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
    justify-content: center;
    align-items: stretch;
  }
  
  .object-box {
    flex: 1;
    min-width: 300px;
    max-width: 400px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
  }
  
  .object-box pre {
    margin: 0;
    padding: 10px;
    font-family: monospace;
    white-space: pre-wrap;
    word-break: break-word;
  }
  
  .copy-process {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
  }
  
  .copy-animation {
    margin-bottom: 15px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .copy-arrow {
    width: 100%;
    height: 6px;
    background-color: #ddd;
    position: relative;
    margin-bottom: 10px;
  }
  
  .copy-arrow:after {
    content: '';
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 10px solid #ddd;
  }
  
  .copy-animation.active .copy-arrow {
    background-color: #4caf50;
    animation: pulse 1.5s infinite;
  }
  
  .copy-animation.active .copy-arrow:after {
    border-left-color: #4caf50;
  }
  
  @keyframes pulse {
    0% { opacity: 0.7; }
    50% { opacity: 1; }
    100% { opacity: 0.7; }
  }
  
  .method-name {
    font-size: 14px;
    color: #666;
  }
  
  .run-button {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .run-button:hover {
    background-color: #45a049;
  }
  
  .object-box.result {
    opacity: 0.5;
  }
  
  .object-box.result.has-result {
    opacity: 1;
  }
  
  /* Верификация результата */
  .verification-result {
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
    margin-top: 20px;
    border: 1px solid #ddd;
  }
  
  .verification-item {
    display: flex;
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 15px;
    align-items: flex-start;
  }
  
  .verification-item.success {
    background-color: #e8f5e9;
  }
  
  .verification-item.partial {
    background-color: #fff8e5;
    border-left: 3px solid #ffc107;
  }
  
  .verification-icon {
    font-size: 1.5rem;
    margin-right: 10px;
    font-weight: bold;
  }
  
  .verification-text {
    flex: 1;
  }
  
  .verification-details {
    font-size: 0.9em;
    margin-top: 5px;
    color: #666;
  }
  
  .verification-item.mutations {
    background-color: #f0f8ff;
    border-left: 3px solid #4285f4;
  }
  
  .mutation-title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .mutation-test {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .mutation-test button {
    padding: 8px 12px;
    background-color: #4285f4;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .mutation-test button:hover {
    background-color: #3367d6;
    transform: translateY(-2px);
  }
  
  .mutation-test button:disabled {
    background-color: #a9a9a9;
    cursor: not-allowed;
    transform: none;
  }
  
  /* Пример кода */
  .code-example {
    margin: 30px 0;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .code-example h4 {
    margin: 0;
    padding: 12px 15px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
  }
  
  .code-block {
    margin: 0;
    padding: 15px;
    background-color: #1e1e1e;
    color: #d4d4d4;
    overflow-x: auto;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  /* Преимущества и недостатки */
  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 30px 0;
  }
  
  .pros, .cons {
    padding: 15px;
    border-radius: 8px;
  }
  
  .pros {
    background-color: #f0fff0;
    border-left: 3px solid #4caf50;
  }
  
  .cons {
    background-color: #fff0f0;
    border-left: 3px solid #f44336;
  }
  
  .pros h4, .cons h4 {
    margin-top: 0;
    color: #333;
  }
  
  /* Когда использовать */
  .when-to-use {
    margin: 30px 0;
    padding: 15px;
    background-color: #f0f8ff;
    border-radius: 8px;
    border-left: 3px solid #2196f3;
  }
  
  .when-to-use h4 {
    margin-top: 0;
    color: #333;
  }
  
  /* Практическое применение */
  .practical-application {
    margin: 30px 0;
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 8px;
  }
  
  .practical-application h4 {
    margin-top: 0;
    color: #333;
  }
  
  .practical-application ul {
    margin: 0;
    padding-left: 20px;
  }
  
  .practical-application li {
    margin-bottom: 8px;
  }
  
  /* Сравнительная таблица */
  .comparison-section {
    margin: 40px 0;
  }
  
  .table-container {
    overflow-x: auto;
  }
  
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
  }
  
  .comparison-table th, .comparison-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .comparison-table th {
    background-color: #f5f5f5;
    font-weight: bold;
    color: #333;
  }
  
  .comparison-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .performance-bar {
    width: 100px;
    height: 8px;
    background-color: #ddd;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 5px;
  }
  
  .performance-fill {
    height: 100%;
    background-color: #4caf50;
    border-radius: 4px;
  }
  
  /* Алгоритм принятия решения */
  .decision-algorithm {
    margin: 40px 0;
  }
  
  .flowchart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    border: 1px solid #ddd;
  }
  
  .flowchart-node {
    padding: 12px;
    background-color: #fff;
    border: 1px solid #4285f4;
    border-radius: 8px;
    margin-bottom: 15px;
    text-align: center;
    width: 80%;
    max-width: 400px;
  }
  
  .flowchart-node.start {
    background-color: #e3f2fd;
    border-color: #2196f3;
    font-weight: bold;
  }
  
  .flowchart-node.solution {
    background-color: #e8f5e9;
    border-color: #4caf50;
    font-weight: bold;
  }
  
  .flowchart-arrow {
    width: 2px;
    height: 30px;
    background-color: #666;
    margin-bottom: 15px;
  }
  
  .flowchart-decision {
    width: 80%;
    max-width: 400px;
    margin-bottom: 20px;
  }
  
  .decision-content {
    padding: 12px;
    background-color: #fff3e0;
    border: 1px solid #ff9800;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 15px;
    font-weight: bold;
  }
  
  .decision-paths {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .path {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    min-width: 250px;
  }
  
  .path-label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .path-arrow {
    width: 2px;
    height: 30px;
    background-color: #666;
    margin-bottom: 15px;
  }
  
  .path-arrow.right {
    width: 30px;
    height: 2px;
    margin-bottom: 15px;
    margin-left: -15px;
    position: relative;
  }
  
  .path-arrow.right:after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid #666;
  }
  
  /* Анимации */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .pros-cons {
      grid-template-columns: 1fr;
    }
    
    .objects-container {
      flex-direction: column;
      align-items: center;
    }
    
    .object-box {
      width: 100%;
    }
    
    .decision-paths {
      flex-direction: column;
    }
  }
  
  /* Стили для раздела стрелочных функций */
  .code-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 30px 0;
  }
  
  .code-column {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .code-column h4 {
    margin: 0;
    padding: 12px 15px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }
  
  /* Визуализация this-binding */
  .this-visualization {
    margin: 30px 0;
  }
  
  .execution-contexts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .context {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .context-title {
    padding: 12px 15px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    font-weight: bold;
    text-align: center;
  }
  
  .context-content {
    padding: 15px;
  }
  
  .context-code {
    background-color: #1e1e1e;
    color: #d4d4d4;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 15px;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 0.9rem;
  }
  
  .context-arrow {
    width: 2px;
    height: 30px;
    background-color: #666;
    margin: 0 auto;
    opacity: 0.3;
  }
  
  .context-arrow.animated {
    opacity: 1;
    animation: pulse 1s infinite;
  }
  
  .context-binding {
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 8px;
    margin-top: 15px;
  }
  
  .binding-title {
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  }
  
  .binding-examples {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .binding-example {
    padding: 8px 12px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    opacity: 0.7;
    transition: all 0.3s;
  }
  
  .binding-example.active {
    opacity: 1;
    border-color: #4285f4;
    background-color: #e3f2fd;
  }
  
  .binding-example code {
    background-color: #f5f5f5;
    padding: 2px 5px;
    border-radius: 3px;
    font-family: monospace;
  }
  
  .visualization-controls {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
  }
  
  .visualization-controls button {
    padding: 8px 16px;
    background-color: #4285f4;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .visualization-controls button:hover {
    background-color: #3367d6;
  }
  
  /* Визуализация для arguments */
  .arguments-visualization {
    margin: 30px 0;
  }
  
  .function-call {
    margin-bottom: 20px;
    text-align: center;
  }
  
  .call-code {
    display: inline-block;
    padding: 8px 12px;
    background-color: #f5f5f5;
    border-radius: 4px;
    margin-bottom: 10px;
    font-family: monospace;
  }
  
  .call-arguments {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }
  
  .arg {
    width: 30px;
    height: 30px;
    background-color: #4285f4;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  
  .functions-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .function-block {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .function-title {
    padding: 12px 15px;
    font-weight: bold;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
  
  .function-block.regular .function-title {
    background-color: #e8eaf6;
    color: #3f51b5;
  }
  
  .function-block.arrow .function-title {
    background-color: #e3f2fd;
    color: #2196f3;
  }
  
  .function-body {
    padding: 15px;
  }
  
  .arguments-object {
    margin-top: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    display: none;
  }
  
  .arguments-object.show {
    display: block;
    animation: fadeIn 0.5s;
  }
  
  .arguments-title {
    padding: 8px 12px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    font-weight: bold;
  }
  
  .arguments-content {
    padding: 12px;
  }
  
  .arguments-items {
    margin-bottom: 10px;
    font-family: monospace;
  }
  
  .arg-item {
    margin-bottom: 4px;
  }
  
  .arguments-info {
    padding: 8px;
    background-color: #f5f5f5;
    border-radius: 4px;
    font-size: 0.9em;
    color: #666;
  }
  
  .arguments-object.error {
    border-color: #f44336;
  }
  
  .error-message {
    padding: 8px 12px;
    background-color: #ffebee;
    color: #f44336;
    font-family: monospace;
    margin-bottom: 10px;
  }
  
  .rest-params-example {
    margin-top: 30px;
    display: none;
  }
  
  .rest-params-example.show {
    display: block;
    animation: fadeIn 0.5s;
  }
  
  .example-title {
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
  }
  
  .example-code {
    background-color: #1e1e1e;
    color: #d4d4d4;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 15px;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 0.9rem;
  }
  
  .example-result {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .result-arrow {
    width: 2px;
    height: 30px;
    background-color: #666;
  }
  
  .result-array {
    width: 300px;
    border: 1px solid #4caf50;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .array-title {
    padding: 8px 12px;
    background-color: #e8f5e9;
    border-bottom: 1px solid #4caf50;
    font-weight: bold;
    text-align: center;
    color: #4caf50;
  }
  
  .array-items {
    padding: 12px;
    font-family: monospace;
  }
  
  .array-item {
    margin-bottom: 4px;
  }
  
  .array-info {
    padding: 8px;
    background-color: #f5f5f5;
    border-radius: 4px;
    font-size: 0.9em;
    color: #666;
    margin-top: 10px;
  }
  
  /* Визуализация для конструктора */
  .constructor-visualization {
    margin: 30px 0;
  }
  
  .construction-demo {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .code-execution {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .function-declaration {
    padding: 12px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
  }
  
  .function-invocation {
    padding: 12px;
    border-bottom: 1px solid #ddd;
  }
  
  .object-creation {
    padding: 12px;
    display: none;
  }
  
  .object-creation.show {
    display: block;
    animation: fadeIn 0.5s;
  }
  
  .arrow-steps {
    margin-bottom: 15px;
  }
  
  .step {
    padding: 8px;
    margin-bottom: 4px;
    background-color: #f5f5f5;
    border-radius: 4px;
    opacity: 0.5;
    transition: all 0.3s;
  }
  
  .step.active {
    opacity: 1;
    background-color: #e3f2fd;
    font-weight: bold;
  }
  
  .object-result {
    margin-top: 15px;
    border: 1px solid #4caf50;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .object-props {
    padding: 12px;
    display: none;
  }
  
  .object-props.show {
    display: block;
    animation: fadeIn 0.5s;
  }
  
  .code-execution.arrow-error .function-declaration {
    background-color: #ffebee;
  }
  
  .error-explanation {
    margin-top: 8px;
    font-size: 0.9em;
    color: #666;
  }
  
  /* Визуализация для синтаксиса */
  .syntax-visualization {
    margin: 30px 0;
  }
  
  .syntax-cases {
    margin-bottom: 30px;
  }
  
  .case-title {
    font-weight: bold;
    margin-bottom: 15px;
    text-align: center;
  }
  
  .syntax-case {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 15px;
    margin-bottom: 20px;
    align-items: center;
  }
  
  .case-description {
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 8px;
  }
  
  .syntax-example {
    background-color: #1e1e1e;
    color: #d4d4d4;
    padding: 12px;
    border-radius: 8px;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 0.9rem;
  }
  
  .translation-arrow {
    width: 30px;
    height: 2px;
    background-color: #4285f4;
    position: relative;
  }
  
  .translation-arrow:after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid #4285f4;
  }
  
  .equivalent {
    background-color: #1e1e1e;
    color: #d4d4d4;
    padding: 12px;
    border-radius: 8px;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 0.9rem;
  }
  
  .syntax-animation {
    margin-top: 30px;
  }
  
  .animation-container {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  
  .slide {
    padding: 20px;
    display: none;
  }
  
  .slide.active {
    display: block;
    animation: fadeIn 0.5s;
  }
  
  .slide-title {
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .transformation {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 20px;
  }
  
  .original, .result {
    background-color: #1e1e1e;
    color: #d4d4d4;
    padding: 12px;
    border-radius: 8px;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 0.9rem;
  }
  
  .steps {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .steps .step {
    opacity: 1;
    border-left: 3px solid transparent;
  }
  
  .steps .step.highlight {
    border-left-color: #4285f4;
    background-color: #e3f2fd;
    font-weight: bold;
  }
  
  .common-mistake {
    background-color: #fff4e5;
    border-radius: 8px;
    padding: 20px;
  }
  
  .mistake-code {
    background-color: #1e1e1e;
    color: #d4d4d4;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 15px;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 0.9rem;
  }
  
  .correction {
    margin-top: 20px;
  }
  
  .correction-title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .explanation {
    margin-top: 15px;
    font-style: italic;
    color: #666;
  }
  
  .animation-controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  /* Визуализация для области видимости */
  .scope-visualization {
    margin: 30px 0;
  }
  
  .scope-example {
    margin-bottom: 30px;
  }
  
  .code-sample {
    background-color: #1e1e1e;
    color: #d4d4d4;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 0.9rem;
    overflow-x: auto;
  }
  
  .example-explanation {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 15px;
  }
  
  .explanation-title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .scope-animation {
    margin-top: 30px;
  }
  
  .animation-title {
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
  }
  
  .animation-toggle {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .animation-toggle button {
    padding: 8px 16px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .animation-toggle button:hover {
    background-color: #e9e9e9;
  }
  
  .animation-toggle button.active {
    background-color: #4285f4;
    color: #fff;
    border-color: #4285f4;
  }
  
  .execution-animation {
    margin-top: 20px;
  }
  
  .animation-stage {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
  }
  
  .object-counter {
    border: 1px solid #4caf50;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .object-props {
    padding: 12px;
  }
  
  .count-value {
    font-weight: bold;
  }
  
  .execution-flow {
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #ddd;
  }
  
  .execution-step {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    margin-bottom: 8px;
    opacity: 0.5;
    transition: all 0.3s;
  }
  
  .execution-step.active {
    opacity: 1;
    background-color: #f5f5f5;
    border-radius: 4px;
  }
  
  .step-number {
    width: 25px;
    height: 25px;
    background-color: #4285f4;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  
  .this-binding {
    margin-top: 15px;
    padding: 12px;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #ddd;
    display: none;
  }
  
  .this-binding.active {
    display: block;
    animation: fadeIn 0.5s;
  }
  
  .binding-title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .binding-value {
    padding: 8px 12px;
    border-radius: 4px;
    font-weight: bold;
  }
  
  .binding-value.regular-this {
    background-color: #ffebee;
    color: #f44336;
  }
  
  .binding-value.arrow-this {
    background-color: #e8f5e9;
    color: #4caf50;
  }
  
  .execution-result {
    margin-top: 15px;
    padding: 12px;
    border-radius: 8px;
    display: none;
  }
  
  .execution-result.active {
    display: block;
    animation: fadeIn 0.5s;
  }
  
  .result-title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .result-content {
    padding: 8px 12px;
    border-radius: 4px;
    font-weight: bold;
  }
  
  .result-content.error-result {
    background-color: #ffebee;
    color: #f44336;
  }
  
  .result-content.success-result {
    background-color: #e8f5e9;
    color: #4caf50;
  }
  
  /* Ключевые выводы */
  .key-takeaways {
    margin: 30px 0;
    padding: 15px;
    background-color: #e8f5e9;
    border-radius: 8px;
    border-left: 3px solid #4caf50;
  }
  
  .key-takeaways h4 {
    margin-top: 0;
    color: #333;
  }
  
  .key-takeaways ul {
    margin-bottom: 0;
  }
  
  .key-takeaways li {
    margin-bottom: 8px;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes pulse {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
  }
  
  /* Адаптивные стили */
  @media (max-width: 768px) {
    .code-comparison,
    .execution-contexts,
    .functions-comparison,
    .construction-demo,
    .syntax-case {
      grid-template-columns: 1fr;
    }
  }
</style>