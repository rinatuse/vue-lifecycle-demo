<template>
    <div class="event-loop-container">
      <h1 class="main-title">Event Loop, Полифилы и queueMicrotask</h1>
      
      <div class="tabs">
        <button 
          v-for="(tab, index) in tabs" 
          :key="index"
          :class="{ 'active-tab': currentTab === index }"
          @click="setTab(index)"
        >
          {{ tab.title }}
        </button>
      </div>
      
      <div class="tab-content">
        <!-- Первая вкладка: Вступление -->
        <div v-if="currentTab === 0" class="tab-pane intro">
          <h2>Введение в Event Loop и микрозадачи</h2>
          <p class="section-description">
            Event Loop (цикл событий) - фундаментальный механизм JavaScript, который управляет выполнением кода,
            обработкой событий, колбэков и операций ввода-вывода. Понимание его работы критически важно для написания эффективного кода.
          </p>
          
          <div class="concept-box">
            <h3>Ключевые структуры данных Event Loop:</h3>
            <div class="structures">
              <div class="structure-item">
                <div class="structure-title">Call Stack</div>
                <div class="structure-desc">Стек вызовов - отслеживает текущее выполнение функций</div>
              </div>
              <div class="structure-item">
                <div class="structure-title">Callback Queue</div>
                <div class="structure-desc">Очередь колбэков - хранит функции, готовые к выполнению</div>
              </div>
              <div class="structure-item highlight">
                <div class="structure-title">Microtask Queue</div>
                <div class="structure-desc">Очередь микрозадач - высокоприоритетные задачи, выполняющиеся перед следующим рендером или задачей</div>
              </div>
            </div>
          </div>
          
          <div class="animation-container">
            <h3>Как работает Event Loop?</h3>
            <div class="animation-stage">
              <div class="animation-element call-stack" ref="callStack">
                <div class="element-title">Call Stack</div>
                <div class="stack-items">
                  <transition-group name="stack">
                    <div 
                      v-for="item in callStackItems" 
                      :key="item.id" 
                      class="stack-item"
                    >
                      {{ item.name }}
                    </div>
                  </transition-group>
                </div>
              </div>
              
              <div class="animation-flow">
                <div class="event-loop-circle" :class="{ 'event-loop-active': loopActive }">
                  <div class="event-loop-arrow"></div>
                  <div class="event-loop-text">Event Loop</div>
                </div>
              </div>
              
              <div class="queues-container">
                <div class="animation-element task-queue">
                  <div class="element-title">Task Queue</div>
                  <div class="queue-items">
                    <transition-group name="queue">
                      <div 
                        v-for="item in taskQueueItems" 
                        :key="item.id" 
                        class="queue-item task"
                      >
                        {{ item.name }}
                      </div>
                    </transition-group>
                  </div>
                </div>
                
                <div class="animation-element microtask-queue">
                  <div class="element-title highlight">Microtask Queue</div>
                  <div class="queue-items">
                    <transition-group name="queue">
                      <div 
                        v-for="item in microtaskQueueItems" 
                        :key="item.id" 
                        class="queue-item microtask"
                      >
                        {{ item.name }}
                      </div>
                    </transition-group>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="animation-controls">
              <button @click="startBasicDemo" :disabled="animationRunning" class="btn btn-primary">
                Запустить демонстрацию
              </button>
              <button @click="resetAnimation" :disabled="!animationRunning" class="btn btn-secondary">
                Сбросить
              </button>
            </div>
            
            <div class="animation-log">
              <div class="log-title">Лог выполнения:</div>
              <div class="log-content">
                <div v-for="(entry, index) in animationLog" :key="index" class="log-entry">
                  <span :class="'log-' + entry.type">{{ entry.message }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Вторая вкладка: queueMicrotask -->
        <div v-if="currentTab === 1" class="tab-pane">
          <h2>queueMicrotask - когда и зачем использовать?</h2>
          <p class="section-description">
            <code>queueMicrotask()</code> - это современный API, позволяющий напрямую добавлять функции
            в очередь микрозадач. Это позволяет гарантировать выполнение кода до следующего рендера или
            следующей задачи из очереди задач.
          </p>
          
          <div class="info-columns">
            <div class="info-column">
              <h3>Когда использовать queueMicrotask?</h3>
              <ul class="feature-list">
                <li>
                  <strong>Немедленная асинхронность</strong> - когда нужно выполнить код асинхронно, но раньше, чем setTimeout
                </li>
                <li>
                  <strong>Пакетная обработка</strong> - для группировки нескольких операций перед обновлением UI
                </li>
                <li>
                  <strong>Избежание блокировки стека</strong> - разбиение тяжелых вычислений
                </li>
                <li>
                  <strong>Контроль побочных эффектов</strong> - отложенное выполнение после основного кода функции
                </li>
                <li>
                  <strong>Соблюдение очередности</strong> - гарантирует выполнение перед следующим рендерингом
                </li>
              </ul>
            </div>
            
            <div class="info-column">
              <h3>Пример использования queueMicrotask</h3>
              <div class="code-example">
                <pre><code>// Измерение времени выполнения функции с учетом микрозадач
  function measureTaskTime(taskFn) {
    const start = performance.now();
    
    // Выполняем основную функцию
    taskFn();
    
    // Используем queueMicrotask для финального подсчета
    // после завершения всех порожденных микрозадач
    queueMicrotask(() => {
      const end = performance.now();
      console.log(`Task took ${end - start}ms to complete`);
    });
  }
  
  // Пример использования
  measureTaskTime(() => {
    // Эта функция создает несколько промисов
    Promise.resolve().then(() => {
      console.log("Promise 1 resolved");
    });
    
    Promise.resolve().then(() => {
      console.log("Promise 2 resolved");
    });
  });</code></pre>
              </div>
            </div>
          </div>
          
          <div class="comparison-container">
            <h3>Сравнение методов асинхронного выполнения</h3>
            <div class="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Метод</th>
                    <th>Приоритет</th>
                    <th>Таймер</th>
                    <th>Применение</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>queueMicrotask()</code></td>
                    <td>Высокий</td>
                    <td>Нет</td>
                    <td>Когда нужно выполнить что-то прямо перед рендерингом</td>
                  </tr>
                  <tr>
                    <td><code>Promise.resolve().then()</code></td>
                    <td>Высокий</td>
                    <td>Нет</td>
                    <td>Тот же приоритет, но может быть менее очевиден по намерениям</td>
                  </tr>
                  <tr>
                    <td><code>setTimeout(fn, 0)</code></td>
                    <td>Низкий</td>
                    <td>Мин. ~4мс</td>
                    <td>Когда требуется отложить выполнение после рендеринга</td>
                  </tr>
                  <tr>
                    <td><code>requestAnimationFrame()</code></td>
                    <td>Средний</td>
                    <td>До следующего кадра</td>
                    <td>Анимации и визуальные обновления</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div class="interaction-demo">
            <h3>Интерактивная демонстрация queueMicrotask</h3>
            <div class="demo-controls">
              <button @click="runQueueMicrotaskDemo" :disabled="interactionRunning" class="btn btn-primary">
                Запустить демонстрацию
              </button>
            </div>
            
            <div class="demo-visualization">
              <div class="execution-order">
                <div class="execution-title">Порядок выполнения:</div>
                <div class="execution-items">
                  <div 
                    v-for="(item, index) in executionItems" 
                    :key="index" 
                    class="execution-item"
                    :class="{ 
                      'execution-active': index === activeExecutionIndex,
                      'execution-completed': index < activeExecutionIndex
                    }"
                  >
                    <div class="execution-number">{{ index + 1 }}</div>
                    <div class="execution-content">
                      <div class="execution-type" :class="'type-' + item.type">{{ item.type }}</div>
                      <div class="execution-code">{{ item.code }}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="demo-console">
                <div class="console-title">Консоль:</div>
                <div class="console-content" ref="consoleContent">
                  <div 
                    v-for="(entry, index) in consoleOutput" 
                    :key="index" 
                    class="console-entry"
                    :class="{ 'console-new': entry.isNew }"
                  >
                    <span class="console-time">{{ entry.time }}:</span>
                    <span class="console-text">{{ entry.text }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Третья вкладка: Полифилы -->
        <div v-if="currentTab === 2" class="tab-pane">
          <h2>Полифилы - что это и как создавать?</h2>
          <p class="section-description">
            <strong>Полифил (Polyfill)</strong> - это код, который обеспечивает функциональность, ожидаемую от современных браузеров,
            в старых браузерах, которые не поддерживают определенные возможности. Название происходит от бренда шпаклевки "Polyfilla",
            которая заполняет отверстия в стенах.
          </p>
          
          <div class="polyfill-schema">
            <h3>Как работают полифилы</h3>
            <div class="schema-container">
              <div class="schema-item browser-box old">
                <div class="browser-title">Старый браузер</div>
                <div class="browser-content">
                  <div class="missing-feature">✘ queueMicrotask отсутствует</div>
                </div>
              </div>
              
              <div class="schema-arrow">
                <div class="arrow-line"></div>
                <div class="arrow-step polyfill-box">
                  <div class="polyfill-title">Полифил добавляет</div>
                  <div class="polyfill-code">if (!window.queueMicrotask) { ... }</div>
                </div>
              </div>
              
              <div class="schema-item browser-box new">
                <div class="browser-title">Результат</div>
                <div class="browser-content">
                  <div class="added-feature">✓ queueMicrotask работает</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="polyfill-example">
            <h3>Полифил для queueMicrotask</h3>
            <p>Рассмотрим полный пример создания полифила для API queueMicrotask:</p>
            
            <div class="code-example">
              <pre><code>// Проверяем наличие нативной поддержки queueMicrotask
  if (!window.queueMicrotask) {
    // Определяем полифил для queueMicrotask
    window.queueMicrotask = function(callback) {
      // Используем Promise для создания микрозадачи
      Promise.resolve()
        .then(callback)
        .catch(error => {
          // Обрабатываем ошибки, чтобы они не были проглочены
          setTimeout(() => {
            throw error;
          });
        });
    };
  }</code></pre>
            </div>
            
            <div class="polyfill-stages">
              <h4>Алгоритм создания полифила:</h4>
              <div class="stages-container">
                <div class="stage">
                  <div class="stage-number">1</div>
                  <div class="stage-content">
                    <strong>Проверка поддержки функциональности</strong>
                    <p>Убедитесь, что нативная функция действительно отсутствует</p>
                  </div>
                </div>
                <div class="stage">
                  <div class="stage-number">2</div>
                  <div class="stage-content">
                    <strong>Выбор подходящей замены</strong>
                    <p>Найдите способ имитировать поведение с помощью доступных API</p>
                  </div>
                </div>
                <div class="stage">
                  <div class="stage-number">3</div>
                  <div class="stage-content">
                    <strong>Определение глобальной функции/объекта</strong>
                    <p>Создайте глобальную переменную с тем же именем и API</p>
                  </div>
                </div>
                <div class="stage">
                  <div class="stage-number">4</div>
                  <div class="stage-content">
                    <strong>Обработка ошибок</strong>
                    <p>Убедитесь, что ваша реализация правильно обрабатывает все случаи</p>
                  </div>
                </div>
                <div class="stage">
                  <div class="stage-number">5</div>
                  <div class="stage-content">
                    <strong>Тестирование</strong>
                    <p>Проверьте полифил в различных браузерах</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="real-world-examples">
            <h3>Применение полифилов в реальных проектах</h3>
            <div class="example-cards">
              <div class="example-card">
                <div class="card-title">Веб-приложения</div>
                <div class="card-content">
                  <p>
                    Современные фреймворки, такие как Vue и React, часто используют полифилы для обеспечения
                    совместимости. Например, Vue CLI предлагает автоматическую интеграцию с Babel и core-js для добавления
                    необходимых полифилов.
                  </p>
                  <div class="card-code">
                    <pre><code>// babel.config.js
  module.exports = {
    presets: [
      ['@vue/app', {
        useBuiltIns: 'usage',
        corejs: 3
      }]
    ]
  }</code></pre>
                  </div>
                </div>
              </div>
              
              <div class="example-card">
                <div class="card-title">Библиотеки и фреймворки</div>
                <div class="card-content">
                  <p>
                    Разработчики библиотек используют полифилы для обеспечения
                    широкой совместимости, не требуя от пользователей дополнительных шагов.
                  </p>
                  <div class="card-code">
                    <pre><code>// Часть библиотеки
  import './polyfills'; // Импортируем полифилы перед основным кодом
  
  // В файле polyfills.js
  if (!Object.entries) {
    Object.entries = function(obj) {/* полифил */};
  }
  
  if (!Array.prototype.includes) {
    Array.prototype.includes = function(item) {/* полифил */};
  }</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Четвертая вкладка: Практическое применение -->
        <div v-if="currentTab === 3" class="tab-pane">
          <h2>Практические задачи и решения</h2>
          
          <div class="task-container">
            <h3>Задача 1: Пакетная обработка UI-обновлений</h3>
            <p class="task-description">
              Представьте, что у вас есть компонент, который должен обрабатывать множественные обновления данных,
              но вы хотите обновлять DOM только один раз после всех изменений для оптимизации производительности.
            </p>
            
            <div class="solution-wrapper">
              <div class="solution-title" @click="toggleSolution(1)">
                <div class="solution-icon">{{ showSolution1 ? '▼' : '▶' }}</div>
                <h4>Решение с использованием queueMicrotask</h4>
              </div>
              
              <div class="solution-content" v-if="showSolution1">
                <div class="code-example">
                  <pre><code>class UIUpdater {
    constructor() {
      this.pendingUpdates = {};
      this.updateScheduled = false;
    }
    
    // Метод для добавления обновления
    scheduleUpdate(id, updateFn) {
      // Сохраняем обновление с указанным ID
      this.pendingUpdates[id] = updateFn;
      
      // Если обновление еще не запланировано, планируем его
      if (!this.updateScheduled) {
        this.updateScheduled = true;
        
        // Используем queueMicrotask чтобы применить изменения
        // сразу после текущего выполнения, но до рендеринга
        queueMicrotask(() => this.applyUpdates());
      }
    }
    
    // Применяем все накопившиеся обновления за один раз
    applyUpdates() {
      const updatesToApply = this.pendingUpdates;
      
      // Сбрасываем состояние
      this.pendingUpdates = {};
      this.updateScheduled = false;
      
      // Применяем все обновления
      Object.values(updatesToApply).forEach(updateFn => {
        try {
          updateFn();
        } catch (error) {
          console.error('Error applying update:', error);
        }
      });
      
      console.log('UI updates applied!');
    }
  }
  
  // Использование
  const updater = new UIUpdater();
  
  // Эти вызовы произойдут последовательно в одном фрейме
  updater.scheduleUpdate('header', () => {
    document.querySelector('header').textContent = 'Новый заголовок';
  });
  
  updater.scheduleUpdate('content', () => {
    document.querySelector('.content').innerHTML = 'Новый контент';
  });
  
  updater.scheduleUpdate('footer', () => {
    document.querySelector('footer').style.backgroundColor = 'blue';
  });</code></pre>
                </div>
                
                <div class="solution-explanation">
                  <h5>Почему это работает?</h5>
                  <p>
                    Используя <code>queueMicrotask</code>, мы откладываем фактическое применение обновлений до
                    конца текущего цикла выполнения, но гарантируем, что все изменения будут применены до того,
                    как браузер начнет рендеринг. Это позволяет нам:
                  </p>
                  <ul>
                    <li>Объединить несколько вызовов в пакет (батчинг)</li>
                    <li>Избежать промежуточных рендеров</li>
                    <li>Выполнить операции атомарно, в одном цикле микрозадач</li>
                  </ul>
                  <p>
                    Такой подход похож на то, как работает <code>nextTick</code> во Vue или
                    <code>setState</code> в React.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="task-container">
            <h3>Задача 2: Создание полифила для метода Array.prototype.groupBy</h3>
            <p class="task-description">
              Метод <code>Array.prototype.groupBy</code> - относительно новая возможность, которая позволяет
              группировать элементы массива по ключу. Создадим полифил для браузеров, которые его не поддерживают.
            </p>
            
            <div class="solution-wrapper">
              <div class="solution-title" @click="toggleSolution(2)">
                <div class="solution-icon">{{ showSolution2 ? '▼' : '▶' }}</div>
                <h4>Решение</h4>
              </div>
              
              <div class="solution-content" v-if="showSolution2">
                <div class="code-example">
                  <pre><code>// Полифил для Array.prototype.groupBy
  if (!Array.prototype.groupBy) {
    Array.prototype.groupBy = function(callbackFn, thisArg) {
      // Проверка аргументов
      if (this == null) {
        throw new TypeError('Cannot call groupBy on null or undefined');
      }
      
      if (typeof callbackFn !== 'function') {
        throw new TypeError('Callback must be a function');
      }
      
      // Преобразуем объект в массив (для объектов array-like)
      const O = Object(this);
      
      // Создаем объект для результатов группировки
      const result = Object.create(null);
      
      // Обходим все элементы массива
      for (let i = 0; i &lt; O.length; i++) {
        // Пропускаем пустые слоты в разреженных массивах
        if (i in O) {
          // Получаем текущий элемент
          const element = O[i];
          
          // Вызываем callback для определения ключа группировки
          const key = callbackFn.call(thisArg, element, i, O);
          
          // Проверяем, что ключ может быть использован как свойство объекта
          const propertyKey = String(key);
          
          // Если группа еще не существует, создаем ее
          if (!result[propertyKey]) {
            result[propertyKey] = [];
          }
          
          // Добавляем элемент в соответствующую группу
          result[propertyKey].push(element);
        }
      }
      
      return result;
    };
  }
  
  // Пример использования
  const inventory = [
    { name: "apple", type: "fruit", quantity: 5 },
    { name: "banana", type: "fruit", quantity: 10 },
    { name: "carrot", type: "vegetable", quantity: 8 },
    { name: "potato", type: "vegetable", quantity: 12 },
  ];
  
  // Группируем по типу
  const groupedByType = inventory.groupBy(item => item.type);
  console.log(groupedByType);
  /* Результат:
  {
    fruit: [
      { name: "apple", type: "fruit", quantity: 5 },
      { name: "banana", type: "fruit", quantity: 10 }
    ],
    vegetable: [
      { name: "carrot", type: "vegetable", quantity: 8 },
      { name: "potato", type: "vegetable", quantity: 12 }
    ]
  }
  */</code></pre>
                </div>
                
                <div class="solution-explanation">
                  <h5>Основные принципы создания полифила</h5>
                  <ol>
                    <li><strong>Проверка существования</strong> - проверяем, есть ли уже метод, чтобы не перезаписать нативную реализацию</li>
                    <li><strong>Спецификация</strong> - следуем спецификации метода как можно точнее</li>
                    <li><strong>Проверка параметров</strong> - валидируем входные параметры аналогично нативным методам</li>
                    <li><strong>Обработка особых случаев</strong> - учитываем разреженные массивы, различные типы данных и т.д.</li>
                    <li><strong>Оптимизация</strong> - стремимся к эффективной реализации</li>
                  </ol>
                  <p>
                    Этот полифил можно включить в сборку проекта или загрузить перед основным JavaScript-кодом,
                    чтобы обеспечить доступность API в любом браузере.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="practical-advice">
            <h3>Советы по работе с микрозадачами и полифилами</h3>
            <div class="advice-grid">
              <div class="advice-item">
                <div class="advice-icon">🎯</div>
                <div class="advice-content">
                  <h4>Используйте инструменты</h4>
                  <p>
                    Такие инструменты как Babel, core-js и polyfill.io могут автоматически добавлять
                    необходимые полифилы в зависимости от целевых браузеров.
                  </p>
                </div>
              </div>
              
              <div class="advice-item">
                <div class="advice-icon">⚠️</div>
                <div class="advice-content">
                  <h4>Осторожно с микрозадачами</h4>
                  <p>
                    Не переполняйте очередь микрозадач - это может привести к блокировке рендеринга
                    и "голоданию" других операций.
                  </p>
                </div>
              </div>
              
              <div class="advice-item">
                <div class="advice-icon">📚</div>
                <div class="advice-content">
                  <h4>Проверяйте поддержку</h4>
                  <p>
                    Перед использованием современных API проверьте их поддержку на <a href="https://caniuse.com" target="_blank">caniuse.com</a> и подготовьте полифилы при необходимости.
                  </p>
                </div>
              </div>
              
              <div class="advice-item">
                <div class="advice-icon">🧪</div>
                <div class="advice-content">
                  <h4>Тестируйте в разных средах</h4>
                  <p>
                    Поведение Event Loop может немного отличаться в разных браузерах и Node.js,
                    поэтому важно тестировать в разных средах.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EventLoopPolyfills',
    data() {
      return {
        // Состояние вкладок
        tabs: [
          { title: 'Event Loop и микрозадачи' },
          { title: 'queueMicrotask' },
          { title: 'Полифилы' },
          { title: 'Практическое применение' }
        ],
        currentTab: 0,
        
        // Состояние основной анимации
        callStackItems: [],
        taskQueueItems: [],
        microtaskQueueItems: [],
        animationLog: [],
        loopActive: false,
        animationRunning: false,
        
        // Счетчики для ID элементов
        stackCounter: 0,
        taskCounter: 0,
        microCounter: 0,
        
        // Таймеры для анимации
        animationTimers: [],
        
        // Состояние демонстрации queueMicrotask
        interactionRunning: false,
        executionItems: [
          { type: 'sync', code: 'console.log("Синхронный код")' },
          { type: 'microtask', code: 'queueMicrotask(() => console.log("Микрозадача 1"))' },
          { type: 'task', code: 'setTimeout(() => console.log("Задача"), 0)' },
          { type: 'microtask', code: 'Promise.resolve().then(() => console.log("Микрозадача 2"))' },
          { type: 'sync', code: 'console.log("Синхронный код 2")' }
        ],
        activeExecutionIndex: -1,
        consoleOutput: [],
        
        // Состояние показа решений
        showSolution1: false,
        showSolution2: false
      }
    },
    methods: {
      // Переключение вкладок
      setTab(index) {
        this.currentTab = index;
        this.resetAnimation();
      },
      
      // Анимация Event Loop
      startBasicDemo() {
        this.resetAnimation();
        this.animationRunning = true;
        
        // Добавляем исходный код
        this.animationLog.push({ type: 'info', message: 'Запуск демонстрации Event Loop...' });
        
        // Шаг 1: Добавляем главную функцию в стек
        setTimeout(() => {
          this.pushToCallStack('main()');
          this.animationLog.push({ type: 'stack', message: 'Вызов main() добавлен в стек вызовов' });
          
          // Шаг 2: Добавляем синхронную функцию
          setTimeout(() => {
            this.pushToCallStack('syncFunction()');
            this.animationLog.push({ type: 'stack', message: 'Вызов syncFunction() добавлен в стек' });
            
            // Шаг 3: Завершаем синхронную функцию
            setTimeout(() => {
              this.popFromCallStack();
              this.animationLog.push({ type: 'stack', message: 'syncFunction() завершила выполнение' });
              
              // Шаг 4: Добавляем асинхронную операцию в очередь задач
              setTimeout(() => {
                this.pushToTaskQueue('setTimeout callback');
                this.animationLog.push({ type: 'task', message: 'setTimeout добавлен в очередь задач' });
                
                // Шаг 5: Добавляем микрозадачу
                setTimeout(() => {
                  this.pushToMicrotaskQueue('Promise.then()');
                  this.animationLog.push({ type: 'microtask', message: 'Promise.then() добавлен в очередь микрозадач' });
                  
                  // Шаг 6: Завершаем main
                  setTimeout(() => {
                    this.popFromCallStack();
                    this.animationLog.push({ type: 'stack', message: 'main() завершила выполнение' });
                    
                    // Шаг 7: Event Loop проверяет очереди
                    setTimeout(() => {
                      this.loopActive = true;
                      this.animationLog.push({ type: 'loop', message: 'Event Loop ищет задачи для выполнения' });
                      
                      // Шаг 8: Сначала обрабатываются микрозадачи
                      setTimeout(() => {
                        this.pushToCallStack(this.microtaskQueueItems[0].name);
                        this.animationLog.push({ type: 'microtask', message: 'Микрозадача добавлена в стек вызовов' });
                        
                        // Удаляем микрозадачу из очереди
                        setTimeout(() => {
                          this.microtaskQueueItems.shift();
                          
                          // Шаг 9: Выполняем микрозадачу
                          setTimeout(() => {
                            this.popFromCallStack();
                            this.animationLog.push({ type: 'microtask', message: 'Микрозадача выполнена' });
                            
                            // Шаг 10: Далее обрабатываются задачи
                            setTimeout(() => {
                              this.pushToCallStack(this.taskQueueItems[0].name);
                              this.animationLog.push({ type: 'task', message: 'Задача добавлена в стек вызовов' });
                              
                              // Удаляем задачу из очереди
                              setTimeout(() => {
                                this.taskQueueItems.shift();
                                
                                // Шаг 11: Выполняем задачу
                                setTimeout(() => {
                                  this.popFromCallStack();
                                  this.animationLog.push({ type: 'task', message: 'Задача выполнена' });
                                  
                                  // Шаг 12: Event Loop завершает итерацию
                                  setTimeout(() => {
                                    this.loopActive = false;
                                    this.animationLog.push({ type: 'info', message: 'Демонстрация Event Loop завершена' });
                                    this.animationRunning = false;
                                  }, 1000);
                                }, 1000);
                              }, 500);
                            }, 1000);
                          }, 1000);
                        }, 500);
                      }, 1000);
                    }, 1000);
                  }, 1000);
                }, 1000);
              }, 1000);
            }, 1000);
          }, 1000);
        }, 500);
      },
      
      // Управление стеком вызовов
      pushToCallStack(name) {
        this.callStackItems.unshift({ id: 'stack-' + (++this.stackCounter), name });
      },
      
      popFromCallStack() {
        if (this.callStackItems.length > 0) {
          this.callStackItems.shift();
        }
      },
      
      // Управление очередью задач
      pushToTaskQueue(name) {
        this.taskQueueItems.push({ id: 'task-' + (++this.taskCounter), name });
      },
      
      // Управление очередью микрозадач
      pushToMicrotaskQueue(name) {
        this.microtaskQueueItems.push({ id: 'micro-' + (++this.microCounter), name });
      },
      
      // Сброс анимации
      resetAnimation() {
        // Очищаем все таймеры
        this.animationTimers.forEach(timer => clearTimeout(timer));
        this.animationTimers = [];
        
        // Сбрасываем состояние
        this.callStackItems = [];
        this.taskQueueItems = [];
        this.microtaskQueueItems = [];
        this.animationLog = [];
        this.loopActive = false;
        this.animationRunning = false;
        
        // Сбрасываем счетчики
        this.stackCounter = 0;
        this.taskCounter = 0;
        this.microCounter = 0;
        
        // Сбрасываем демонстрацию queueMicrotask
        this.activeExecutionIndex = -1;
        this.consoleOutput = [];
        this.interactionRunning = false;
      },
      
      // Демонстрация queueMicrotask
      runQueueMicrotaskDemo() {
        if (this.interactionRunning) return;
        this.interactionRunning = true;
        
        this.activeExecutionIndex = -1;
        this.consoleOutput = [];
        
        // Начинаем последовательное выполнение
        const executeStep = (index) => {
          if (index >= this.executionItems.length) {
            this.interactionRunning = false;
            return;
          }
          
          this.activeExecutionIndex = index;
          const item = this.executionItems[index];
          
          // Добавляем вывод в консоль в зависимости от типа операции
          if (item.type === 'sync') {
            // Синхронный код выполняется немедленно
            setTimeout(() => {
              this.addConsoleOutput(`Выполнение: ${item.code}`);
              setTimeout(() => executeStep(index + 1), 1000);
            }, 1000);
          } 
          else if (item.type === 'microtask') {
            // Микрозадачи добавляются в очередь микрозадач и выполняются до следующей задачи
            setTimeout(() => {
              this.addConsoleOutput(`Планирование микрозадачи: ${item.code}`);
              
              // Продолжаем выполнение
              setTimeout(() => {
                executeStep(index + 1);
              }, 1000);
            }, 1000);
          }
          else if (item.type === 'task') {
            // Задачи добавляются в очередь задач
            setTimeout(() => {
              this.addConsoleOutput(`Планирование задачи: ${item.code}`);
              
              // Продолжаем выполнение
              setTimeout(() => {
                executeStep(index + 1);
              }, 1000);
            }, 1000);
          }
        };
        
        // Запускаем первый шаг
        setTimeout(() => {
          this.addConsoleOutput('Начало выполнения скрипта');
          executeStep(0);
          
          // После выполнения всего синхронного кода и добавления задач
          // выполняем микрозадачи
          setTimeout(() => {
            this.addConsoleOutput('--- Начало обработки микрозадач ---');
            this.addConsoleOutput('Выполнение: console.log("Микрозадача 1")');
            this.addConsoleOutput('Выполнение: console.log("Микрозадача 2")');
            
            // Затем выполняем задачи
            setTimeout(() => {
              this.addConsoleOutput('--- Начало обработки задач ---');
              this.addConsoleOutput('Выполнение: console.log("Задача")');
              
              setTimeout(() => {
                this.addConsoleOutput('Выполнение скрипта завершено');
                this.interactionRunning = false;
              }, 1000);
            }, 2000);
          }, 5000);
        }, 500);
      },
      
      // Добавление сообщения в консоль
      addConsoleOutput(text) {
        const now = new Date();
        const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
        
        // Добавляем новое сообщение с пометкой, что оно новое
        this.consoleOutput.push({ time, text, isNew: true });
        
        // Прокручиваем консоль вниз
        this.$nextTick(() => {
          if (this.$refs.consoleContent) {
            this.$refs.consoleContent.scrollTop = this.$refs.consoleContent.scrollHeight;
          }
          
          // Убираем пометку "новое" через небольшую задержку
          setTimeout(() => {
            if (this.consoleOutput.length > 0) {
              this.consoleOutput[this.consoleOutput.length - 1].isNew = false;
            }
          }, 500);
        });
      },
      
      // Показ/скрытие решений
      toggleSolution(num) {
        if (num === 1) {
          this.showSolution1 = !this.showSolution1;
        } else if (num === 2) {
          this.showSolution2 = !this.showSolution2;
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .event-loop-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #000;
    background-color: #fff;
    line-height: 1.6;
  }
  
  .main-title {
    text-align: center;
    margin-bottom: 30px;
    color: #000;
    font-size: 2.5rem;
  }
  
  /* Стили для вкладок */
  .tabs {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }
  
  .tabs button {
    padding: 12px 20px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
    color: #000;
    font-weight: 500;
  }
  
  .tabs button:hover {
    background-color: #e0e0e0;
  }
  
  .tabs button.active-tab {
    background-color: #3498db;
    color: #fff;
  }
  
  .tab-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .tab-pane {
    animation: fadeIn 0.5s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .section-description {
    font-size: 1.1rem;
    margin-bottom: 25px;
    color: #333;
  }
  
  /* Анимация Event Loop */
  .animation-container {
    margin: 30px 0;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  }
  
  .animation-stage {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 20px;
    margin: 20px 0;
    align-items: center;
  }
  
  .animation-element {
    border: 2px solid #333;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
    min-height: 200px;
    display: flex;
    flex-direction: column;
  }
  
  .element-title {
    background-color: #333;
    color: #fff;
    padding: 10px;
    text-align: center;
    font-weight: bold;
  }
  
  .highlight {
    color: #e74c3c;
    font-weight: bold;
  }
  
  .element-title.highlight {
    background-color: #e74c3c;
  }
  
  .call-stack {
    border-color: #3498db;
  }
  
  .call-stack .element-title {
    background-color: #3498db;
  }
  
  .task-queue {
    border-color: #2ecc71;
  }
  
  .task-queue .element-title {
    background-color: #2ecc71;
  }
  
  .microtask-queue {
    border-color: #e74c3c;
  }
  
  .microtask-queue .element-title {
    background-color: #e74c3c;
  }
  
  .stack-items, .queue-items {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  
  .stack-items {
    align-items: stretch;
  }
  
  .queue-items {
    align-items: flex-start;
  }
  
  .stack-item, .queue-item {
    margin: 5px;
    padding: 10px;
    border-radius: 4px;
    background-color: #f0f0f0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .stack-item {
    text-align: center;
    border-left: 4px solid #3498db;
  }
  
  .queue-item.task {
    border-left: 4px solid #2ecc71;
  }
  
  .queue-item.microtask {
    border-left: 4px solid #e74c3c;
  }
  
  /* Анимации для стека и очередей */
  .stack-enter-active, .stack-leave-active,
  .queue-enter-active, .queue-leave-active {
    transition: all 0.5s ease;
  }
  
  .stack-enter-from {
    opacity: 0;
    transform: translateY(-20px);
  }
  
  .stack-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
  
  .queue-enter-from {
    opacity: 0;
    transform: translateX(-20px);
  }
  
  .queue-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }
  
  /* Event Loop круг */
  .animation-flow {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .event-loop-circle {
    width: 100px;
    height: 100px;
    border: 3px solid #9b59b6;
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }
  
  .event-loop-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 20px solid #9b59b6;
    transform-origin: center 70%;
    transform: rotate(0deg);
    top: -10px;
    transition: transform 1s linear;
  }
  
  .event-loop-text {
    font-size: 12px;
    color: #9b59b6;
    text-align: center;
    padding-top: 20px;
    font-weight: bold;
  }
  
  .event-loop-active {
    box-shadow: 0 0 15px rgba(155, 89, 182, 0.5);
  }
  
  .event-loop-active .event-loop-arrow {
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  /* Контроли для анимации */
  .animation-controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 20px 0;
  }
  
  .btn {
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
    font-weight: 500;
  }
  
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .btn-primary {
    background-color: #3498db;
    color: #fff;
  }
  
  .btn-primary:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .btn-secondary {
    background-color: #95a5a6;
    color: #fff;
  }
  
  .btn-secondary:hover:not(:disabled) {
    background-color: #7f8c8d;
  }
  
  /* Лог анимации */
  .animation-log {
    background-color: #2c3e50;
    color: #ecf0f1;
    border-radius: 6px;
    padding: 15px;
    margin-top: 20px;
    max-height: 250px;
    overflow-y: auto;
  }
  
  .log-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #f39c12;
  }
  
  .log-entry {
    padding: 5px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .log-info {
    color: #bdc3c7;
  }
  
  .log-stack {
    color: #3498db;
  }
  
  .log-task {
    color: #2ecc71;
  }
  
  .log-microtask {
    color: #e74c3c;
  }
  
  .log-loop {
    color: #9b59b6;
  }
  
  /* Стили для вкладки queueMicrotask */
  .info-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 30px 0;
  }
  
  .info-column {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  }
  
  .feature-list {
    padding-left: 20px;
  }
  
  .feature-list li {
    margin-bottom: 12px;
  }
  
  .code-example {
    background-color: #2c3e50;
    border-radius: 6px;
    overflow: hidden;
  }
  
  .code-example pre {
    margin: 0;
    padding: 15px;
    overflow-x: auto;
    color: #f8f8f2;
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .code-example code {
    background: transparent;
    padding: 0;
    white-space: pre;
  }
  
  /* Таблица сравнения */
  .comparison-container {
    margin: 30px 0;
  }
  
  .comparison-table {
    overflow-x: auto;
  }
  
  .comparison-table table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
  }
  
  .comparison-table th, .comparison-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .comparison-table th {
    background-color: #f0f0f0;
    font-weight: bold;
  }
  
  .comparison-table tr:hover {
    background-color: #f9f9f9;
  }
  
  .comparison-table code {
    background-color: #f0f0f0;
    padding: 3px 5px;
    border-radius: 3px;
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 0.9em;
  }
  
  /* Интерактивная демонстрация */
  .interaction-demo {
    margin: 30px 0;
  }
  
  .demo-controls {
    margin-bottom: 20px;
  }
  
  .demo-visualization {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .execution-order {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  }
  
  .execution-title {
    font-weight: bold;
    margin-bottom: 15px;
    color: #2c3e50;
  }
  
  .execution-items {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .execution-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px;
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid #ddd;
    transition: all 0.3s ease;
  }
  
  .execution-active {
    border-color: #3498db;
    box-shadow: 0 0 10px rgba(52, 152, 219, 0.3);
    transform: scale(1.02);
  }
  
  .execution-completed {
    opacity: 0.7;
    background-color: #f0f0f0;
  }
  
  .execution-number {
    width: 25px;
    height: 25px;
    background-color: #3498db;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  .execution-content {
    flex: 1;
  }
  
  .execution-type {
    font-size: 0.8rem;
    padding: 2px 6px;
    border-radius: 3px;
    display: inline-block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .type-sync {
    background-color: #3498db;
    color: #fff;
  }
  
  .type-microtask {
    background-color: #e74c3c;
    color: #fff;
  }
  
  .type-task {
    background-color: #2ecc71;
    color: #fff;
  }
  
  .execution-code {
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 0.9rem;
  }
  
  .demo-console {
    background-color: #2c3e50;
    color: #ecf0f1;
    border-radius: 8px;
    padding: 15px;
    height: 400px;
    display: flex;
    flex-direction: column;
  }
  
  .console-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #f39c12;
  }
  
  .console-content {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    background-color: #1a2530;
    border-radius: 4px;
  }
  
  .console-entry {
    padding: 5px 0;
    line-height: 1.5;
    transition: all 0.3s ease;
  }
  
  .console-time {
    color: #95a5a6;
    margin-right: 10px;
    font-size: 0.9em;
  }
  
  .console-text {
    color: #ecf0f1;
  }
  
  .console-new {
    background-color: rgba(255, 255, 255, 0.1);
    border-left: 3px solid #f39c12;
    padding-left: 5px;
  }
  
  /* Стили для вкладки Полифилы */
  .polyfill-schema {
    margin: 30px 0;
  }
  
  .schema-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
  }
  
  .browser-box {
    width: 200px;
    border: 2px solid #3498db;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
  }
  
  .browser-box.old {
    border-color: #e74c3c;
  }
  
  .browser-box.new {
    border-color: #2ecc71;
  }
  
  .browser-title {
    background-color: #3498db;
    color: #fff;
    padding: 10px;
    text-align: center;
    font-weight: bold;
  }
  
  .browser-box.old .browser-title {
    background-color: #e74c3c;
  }
  
  .browser-box.new .browser-title {
    background-color: #2ecc71;
  }
  
  .browser-content {
    padding: 15px;
    text-align: center;
  }
  
  .missing-feature {
    color: #e74c3c;
    font-weight: bold;
  }
  
  .added-feature {
    color: #2ecc71;
    font-weight: bold;
  }
  
  .schema-arrow {
    position: relative;
    width: 150px;
    height: 100px;
  }
  
  .arrow-line {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #3498db;
    transform: translateY(-50%);
  }
  
  .arrow-line:after {
    content: '';
    position: absolute;
    right: -10px;
    top: -5px;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-left: 12px solid #3498db;
    border-bottom: 6px solid transparent;
  }
  
  .arrow-step {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    text-align: center;
  }
  
  .polyfill-box {
    background-color: #f39c12;
    border-radius: 6px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .polyfill-title {
    color: #fff;
    font-size: 0.9rem;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .polyfill-code {
    background-color: #fff;
    border-radius: 4px;
    padding: 5px;
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 0.8rem;
    color: #2c3e50;
  }
  
  /* Стили для этапов создания полифила */
  .polyfill-stages {
    margin: 30px 0;
  }
  
  .stages-container {
    margin-top: 15px;
  }
  
  .stage {
    display: flex;
    margin-bottom: 15px;
    align-items: flex-start;
  }
  
  .stage-number {
    width: 30px;
    height: 30px;
    background-color: #3498db;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 15px;
    flex-shrink: 0;
  }
  
  .stage-content {
    flex: 1;
  }
  
  .stage-content p {
    margin: 5px 0 0;
    color: #555;
  }
  
  /* Примеры из реальной жизни */
  .example-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
  }
  
  .example-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .card-title {
    background-color: #3498db;
    color: #fff;
    padding: 12px 15px;
    font-weight: bold;
    font-size: 1.1rem;
  }
  
  .card-content {
    padding: 15px;
  }
  
  .card-code {
    margin-top: 15px;
  }
  
  /* Стили для практических задач */
  .task-container {
    margin: 30px 0;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  }
  
  .task-description {
    color: #333;
    margin-bottom: 20px;
  }
  
  .solution-wrapper {
    margin-top: 15px;
  }
  
  .solution-title {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    background-color: #3498db;
    color: #fff;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .solution-title:hover {
    background-color: #2980b9;
  }
  
  .solution-icon {
    margin-right: 10px;
  }
  
  .solution-title h4 {
    margin: 0;
    font-size: 1.1rem;
  }
  
  .solution-content {
    margin-top: 15px;
    animation: fadeIn 0.5s ease;
  }
  
  .solution-explanation {
    margin-top: 20px;
    padding: 15px;
    background-color: #f0f0f0;
    border-radius: 6px;
    border-left: 4px solid #3498db;
  }
  
  .solution-explanation h5 {
    margin-top: 0;
    color: #2c3e50;
  }
  
  /* Советы и рекомендации */
  .practical-advice {
    margin: 30px 0;
  }
  
  .advice-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .advice-item {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    align-items: flex-start;
    gap: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .advice-icon {
    font-size: 1.5rem;
  }
  
  .advice-content {
    flex: 1;
  }
  
  .advice-content h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  
  .advice-content p {
    margin: 0;
    color: #333;
  }
  
  /* Концепт-боксы */
  .concept-box {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    margin: 30px 0;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  }
  
  .structures {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 20px;
  }
  
  .structure-item {
    padding: 15px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border-left: 4px solid #3498db;
  }
  
  .structure-item.highlight {
    border-left-color: #e74c3c;
  }
  
  .structure-title {
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 5px;
    color: #2c3e50;
  }
  
  .structure-desc {
    color: #555;
    font-size: 0.95rem;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .animation-stage {
      grid-template-columns: 1fr;
    }
    
    .info-columns {
      grid-template-columns: 1fr;
    }
    
    .demo-visualization {
      grid-template-columns: 1fr;
    }
    
    .example-cards {
      grid-template-columns: 1fr;
    }
    
    .schema-container {
      flex-direction: column;
    }
    
    .arrow-line {
      height: 50px;
      width: 2px;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
    }
    
    .arrow-line:after {
      top: auto;
      right: auto;
      bottom: -10px;
      left: -5px;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 12px solid #3498db;
    }
    
    .arrow-step {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
    .queues-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
  
  @media (max-width: 480px) {
    .tabs button {
      padding: 8px 12px;
      font-size: 0.9rem;
    }
    
    .advice-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>