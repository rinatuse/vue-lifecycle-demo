<template>
    <div class="event-loop-explorer">
      <h1 class="main-title">JavaScript Event Loop: Подробное исследование</h1>
      
      <div class="tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="{ active: currentTab === tab.id }"
          @click="setCurrentTab(tab.id)"
        >
          {{ tab.name }}
        </button>
      </div>
  
      <!-- Введение в Event Loop -->
      <div v-if="currentTab === 'intro'" class="tab-content">
        <h2>Что такое Event Loop?</h2>
        <p>Event Loop (цикл событий) — это фундаментальный механизм, который позволяет JavaScript выполнять операции ввода-вывода, сетевые запросы и другие асинхронные операции без блокировки основного потока выполнения.</p>
        
        <div class="intro-visualization">
          <div class="event-loop-diagram">
            <div class="call-stack">
              <div class="stack-title">Call Stack</div>
              <div class="stack-items">
                <div v-for="(item, index) in callStackItems" :key="index" class="stack-item">
                  {{ item }}
                </div>
              </div>
            </div>
            
            <div class="event-loop-core">
              <div class="loop" :class="{ looping: isLooping }"></div>
            </div>
            
            <div class="event-queues">
              <div class="queue">
                <div class="queue-title">Task Queue (Macrotasks)</div>
                <div class="queue-items">
                  <div v-for="(item, index) in taskQueueItems" :key="index" class="queue-item">
                    {{ item }}
                  </div>
                </div>
              </div>
              
              <div class="queue">
                <div class="queue-title">Microtask Queue</div>
                <div class="queue-items">
                  <div v-for="(item, index) in microtaskQueueItems" :key="index" class="queue-item micro">
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="controls">
            <button @click="startEventLoopAnimation" :disabled="isLooping">Запустить симуляцию Event Loop</button>
            <button @click="stopEventLoopAnimation" :disabled="!isLooping">Остановить</button>
            <button @click="resetEventLoopAnimation">Сбросить</button>
          </div>
        </div>
        
        <div class="explanation">
          <h3>Основные компоненты Event Loop:</h3>
          <ul>
            <li>
              <strong>Call Stack (Стек вызовов)</strong> — LIFO-структура, которая отслеживает текущие выполняемые функции. 
              JavaScript — однопоточный язык, и в любой момент времени может выполняться только одна функция.
            </li>
            <li>
              <strong>Task Queue (Очередь задач, Macrotasks)</strong> — содержит задачи, которые должны быть выполнены, 
              такие как обработчики событий, таймеры (setTimeout), операции ввода-вывода. 
              Задачи из этой очереди берутся только после очистки стека вызовов.
            </li>
            <li>
              <strong>Microtask Queue (Очередь микрозадач)</strong> — содержит высокоприоритетные задачи, 
              такие как Promise-колбэки, queueMicrotask(), process.nextTick() (в Node.js). 
              Все микрозадачи обрабатываются до взятия следующей задачи из Task Queue.
            </li>
            <li>
              <strong>Event Loop (Цикл событий)</strong> — механизм, который постоянно проверяет, 
              пуст ли стек вызовов, и если да, берет задачу из соответствующей очереди.
            </li>
          </ul>
        </div>
        
        <div class="explanation">
          <h3>Порядок выполнения Event Loop:</h3>
          <ol>
            <li>Выполнить весь синхронный код (опустошить стек вызовов).</li>
            <li>Проверить очередь микрозадач, если она не пуста, выполнить все задачи по очереди до полного опустошения.</li>
            <li>Выполнить одну задачу из очереди задач (macrotasks).</li>
            <li>Повторить цикл сначала.</li>
          </ol>
        </div>
      </div>
  
      <!-- Базовые концепции -->
      <div v-if="currentTab === 'basics'" class="tab-content">
        <h2>Базовые концепции асинхронности в JavaScript</h2>
        
        <div class="concept">
          <h3>1. Синхронное vs Асинхронное выполнение</h3>
          <div class="concept-content">
            <div class="concept-explanation">
              <p>
                <strong>Синхронный код</strong> блокирует выполнение до завершения операции.
                <strong>Асинхронный код</strong> позволяет продолжать выполнение, не дожидаясь завершения операции.
              </p>
              <p>Примеры асинхронных операций:</p>
              <ul>
                <li>Таймеры: setTimeout(), setInterval()</li>
                <li>Сетевые запросы: fetch(), XMLHttpRequest</li>
                <li>Операции ввода-вывода (в Node.js)</li>
                <li>События DOM: addEventListener()</li>
                <li>Promises, async/await</li>
              </ul>
            </div>
            <div class="code-example">
              <pre><code>// Синхронный код
  console.log('1');
  console.log('2');
  console.log('3');
  // Вывод: 1, 2, 3 (по порядку)
  
  // Асинхронный код
  console.log('1');
  setTimeout(() => {
    console.log('2');
  }, 0);
  console.log('3');
  // Вывод: 1, 3, 2 (setTimeout откладывается)</code></pre>
            </div>
          </div>
        </div>
        
        <div class="concept">
          <h3>2. Блокирующие vs Неблокирующие операции</h3>
          <div class="concept-content">
            <div class="concept-explanation">
              <p>
                <strong>Блокирующие операции</strong> приостанавливают выполнение JavaScript до завершения операции.
                <strong>Неблокирующие операции</strong> позволяют выполнить другой код, пока операция выполняется в фоне.
              </p>
              <p>JavaScript использует неблокирующую модель с колбэками для обработки асинхронных операций.</p>
            </div>
           
          </div>
        </div>
        
        <div class="concept">
          <h3>3. Callback Hell и его решения</h3>
          <div class="concept-content">
            <div class="concept-explanation">
              <p>
                <strong>Callback Hell</strong> (ад колбэков) — проблема с вложенными колбэк-функциями, 
                которая делает код сложным для чтения и поддержки.
              </p>
              <p>Решения:</p>
              <ul>
                <li>Именованные функции вместо анонимных</li>
                <li>Promises</li>
                <li>async/await</li>
                <li>Функциональные библиотеки (например, async.js)</li>
              </ul>
            </div>
            <div class="code-example">
              <pre><code>// Callback Hell
  fetchData(function(data) {
    processData(data, function(processedData) {
      saveData(processedData, function(result) {
        displayData(result, function() {
          // И так далее...
        });
      });
    });
  });
  
  // С Promises
  fetchData()
    .then(data => processData(data))
    .then(processedData => saveData(processedData))
    .then(result => displayData(result))
    .catch(error => console.error(error));
  
  // С async/await
  async function handleData() {
    try {
      const data = await fetchData();
      const processedData = await processData(data);
      const result = await saveData(processedData);
      await displayData(result);
    } catch (error) {
      console.error(error);
    }
  }</code></pre>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Стек вызовов и очереди -->
      <div v-if="currentTab === 'queues'" class="tab-content">
        <h2>Стек вызовов и очереди задач</h2>
        
        <div class="concept">
          <h3>Call Stack (Стек вызовов)</h3>
          <div class="concept-content">
            <div class="concept-explanation">
              <p>
                Стек вызовов — это структура данных, которая отслеживает, на каком этапе выполнения мы находимся.
                Когда мы вызываем функцию, она добавляется в стек вызовов. Когда функция завершает выполнение, она удаляется из стека.
              </p>
              <p><strong>Ключевые особенности:</strong></p>
              <ul>
                <li>Структура данных LIFO (Last In, First Out)</li>
                <li>Отслеживает текущую позицию выполнения в программе</li>
                <li>При переполнении стека происходит ошибка "Maximum call stack size exceeded" (например, при бесконечной рекурсии)</li>
                <li>Имеет ограниченный размер (зависит от движка JavaScript и платформы)</li>
              </ul>
            </div>
            <div class="interactive-demo">
              <div class="stack-visualization">
                <div class="stack-container">
                  <div class="stack-label">Стек вызовов</div>
                  <div class="stack">
                    <div v-for="(item, index) in stackDemo" 
                      :key="index" 
                      class="stack-frame"
                      :style="{ backgroundColor: getFrameColor(item) }">
                      {{ item }}
                    </div>
                  </div>
                </div>
                <div class="stack-controls">
                  <button @click="callFunction('main()')">Вызвать main()</button>
                  <button @click="callFunction('foo()')" :disabled="!canCallFoo">Вызвать foo()</button>
                  <button @click="callFunction('bar()')" :disabled="!canCallBar">Вызвать bar()</button>
                  <button @click="returnFunction()" :disabled="stackDemo.length <= 1">Возврат функции</button>
                  <button @click="resetStack()">Сбросить</button>
                </div>
              </div>
              <div class="code-context">
                <pre><code>function main() {
    console.log("Начало main");
    foo();
    console.log("Конец main");
  }
  
  function foo() {
    console.log("Начало foo");
    bar();
    console.log("Конец foo");
  }
  
  function bar() {
    console.log("Выполнение bar");
  }</code></pre>
              </div>
            </div>
          </div>
        </div>
        
        <div class="concept">
          <h3>Task Queue (Очередь задач) vs Microtask Queue (Очередь микрозадач)</h3>
          <div class="concept-content">
            <div class="tables-container">
              <div class="table">
                <h4>Task Queue (Macrotasks)</h4>
                <ul>
                  <li>setTimeout()</li>
                  <li>setInterval()</li>
                  <li>setImmediate() (Node.js)</li>
                  <li>requestAnimationFrame() (браузер)</li>
                  <li>I/O операции</li>
                  <li>UI рендеринг (браузер)</li>
                  <li>Обработчики событий DOM</li>
                </ul>
              </div>
              <div class="table">
                <h4>Microtask Queue</h4>
                <ul>
                  <li>Promise.then()/catch()/finally()</li>
                  <li>queueMicrotask()</li>
                  <li>process.nextTick() (Node.js, высший приоритет)</li>
                  <li>MutationObserver (браузер)</li>
                  <li>Object.observe (устаревший)</li>
                </ul>
              </div>
            </div>
            
            <div class="key-differences">
              <h4>Ключевые различия:</h4>
              <ol>
                <li>Микрозадачи выполняются <strong>до</strong> взятия следующей задачи из очереди задач.</li>
                <li>Все микрозадачи обрабатываются за один раз, в то время как задачи из Task Queue обрабатываются по одной.</li>
                <li>Микрозадачи могут добавлять новые микрозадачи, и все они будут выполнены перед следующей задачей.</li>
                <li>Порядок приоритета: 1) Call Stack → 2) Microtask Queue → 3) Task Queue</li>
              </ol>
            </div>
            
            <div class="interactive-demo">
              <div class="queue-demo">
                <div class="console-output">
                  <div class="console-header">
                    Вывод консоли:
                  </div>
                  <pre><code>{{ consoleOutput.join('\n') }}</code></pre>
                </div>
                <div class="queue-demo-controls">
                  <button @click="runQueueDemo()" :disabled="demoRunning">Запустить демонстрацию</button>
                  <button @click="resetQueueDemo()">Сбросить</button>
                </div>
              </div>
              <div class="code-context">
                <pre><code>console.log('1 - Начало скрипта');
  
  setTimeout(() => {
    console.log('2 - setTimeout callback (macrotask)');
  }, 0);
  
  Promise.resolve()
    .then(() => {
      console.log('3 - Promise.then (microtask)');
    })
    .then(() => {
      console.log('4 - Вторая Promise.then (microtask)');
    });
  
  queueMicrotask(() => {
    console.log('5 - queueMicrotask (microtask)');
  });
  
  Promise.resolve().then(() => {
    setTimeout(() => {
      console.log('6 - setTimeout из Promise (macrotask)');
    }, 0);
  });
  
  console.log('7 - Конец скрипта');</code></pre>
                <div class="explanation-note">
                  <strong>Порядок вывода: 1, 7, 3, 4, 5, 2, 6</strong><br>
                  Сначала выполняется синхронный код (1, 7), затем все микрозадачи (3, 4, 5), 
                  и только потом задачи из Task Queue (2, 6).
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Node.js vs Browser -->
      <div v-if="currentTab === 'node-vs-browser'" class="tab-content">
        <h2>Event Loop в Node.js vs браузере</h2>
        
        <div class="environment-comparison">
          <div class="environment">
            <h3>Event Loop в браузере</h3>
            <div class="environment-diagram">
              <img src="https://i.imgur.com/FXtEP5p.png" alt="Browser Event Loop" class="diagram-image">
            </div>
            <div class="environment-explanation">
              <h4>Особенности:</h4>
              <ul>
                <li>Один главный Event Loop для всех операций</li>
                <li>Обработка задач рендеринга и взаимодействия с DOM</li>
                <li>requestAnimationFrame() выполняется перед рендерингом</li>
                <li>requestIdleCallback() выполняется в периоды простоя</li>
                <li>Реализации Event Loop могут различаться в разных браузерах</li>
              </ul>
              <h4>Порядок выполнения цикла:</h4>
              <ol>
                <li>Выполнить все задачи из стека вызовов</li>
                <li>Выполнить все microtasks</li>
                <li>Выполнить requestAnimationFrame если необходимо</li>
                <li>Отрисовать изменения на экране, если необходимо</li>
                <li>Выполнить одну задачу (macrotask) из очереди</li>
                <li>Выполнить requestIdleCallback, если есть свободное время</li>
                <li>Повторить цикл</li>
              </ol>
            </div>
          </div>
          
          <div class="environment">
            <h3>Event Loop в Node.js</h3>
            <div class="environment-diagram">
              <img src="https://i.imgur.com/wl9XZIx.png" alt="Node.js Event Loop" class="diagram-image">
            </div>
            <div class="environment-explanation">
              <h4>Особенности:</h4>
              <ul>
                <li>Основан на libuv</li>
                <li>Несколько фаз в цикле событий</li>
                <li>process.nextTick() имеет высший приоритет (выполняется перед другими микрозадачами)</li>
                <li>Оптимизирован для операций ввода-вывода</li>
              </ul>
              <h4>Фазы Event Loop в Node.js:</h4>
              <ol>
                <li><strong>timers</strong>: callbacks из setTimeout() и setInterval()</li>
                <li><strong>pending callbacks</strong>: отложенные I/O callbacks</li>
                <li><strong>idle, prepare</strong>: внутренние фазы</li>
                <li><strong>poll</strong>: получение новых I/O событий, выполнение I/O callbacks</li>
                <li><strong>check</strong>: callbacks из setImmediate()</li>
                <li><strong>close callbacks</strong>: например, socket.on('close', ...)</li>
              </ol>
              <p>На каждой фазе Node.js проверяет process.nextTick() и Promise callbacks.</p>
            </div>
          </div>
        </div>
        
        <div class="practical-differences">
          <h3>Практические различия</h3>
          <div class="concept-content">
            <table class="comparison-table">
              <tr>
                <th>Аспект</th>
                <th>Браузер</th>
                <th>Node.js</th>
              </tr>
              <tr>
                <td>Приоритетные API</td>
                <td>requestAnimationFrame, WebWorkers</td>
                <td>process.nextTick(), setImmediate()</td>
              </tr>
              <tr>
                <td>Обработка ввода-вывода</td>
                <td>XMLHttpRequest, fetch, WebSockets</td>
                <td>fs, net, http модули через libuv</td>
              </tr>
              <tr>
                <td>Блокировка UI</td>
                <td>Длительные операции блокируют UI</td>
                <td>Нет UI, но длительные операции блокируют другие задачи</td>
              </tr>
              <tr>
                <td>Многопоточность</td>
                <td>WebWorkers для параллельных вычислений</td>
                <td>Worker threads, child_process модуль</td>
              </tr>
              <tr>
                <td>Глобальный контекст</td>
                <td>window</td>
                <td>global</td>
              </tr>
            </table>
            
            <div class="code-examples">
              <div class="code-example">
                <h4>Пример поведения setTimeout и setImmediate в Node.js</h4>
                <pre><code>// Порядок выполнения может быть непредсказуемым
  setTimeout(() => {
    console.log('setTimeout');
  }, 0);
  
  setImmediate(() => {
    console.log('setImmediate');
  });
  
  // Но в контексте I/O цикла, setImmediate
  // всегда выполняется перед setTimeout
  fs.readFile('file.txt', () => {
    setTimeout(() => {
      console.log('setTimeout в I/O callback');
    }, 0);
    
    setImmediate(() => {
      console.log('setImmediate в I/O callback');
    });
  });</code></pre>
              </div>
              
              <div class="code-example">
                <h4>process.nextTick() vs Promise</h4>
                <pre><code>// process.nextTick имеет приоритет над Promise
  Promise.resolve().then(() => {
    console.log('Promise resolved');
  });
  
  process.nextTick(() => {
    console.log('nextTick callback');
  });
  
  // Вывод:
  // nextTick callback
  // Promise resolved</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Advanced Topics -->
      <div v-if="currentTab === 'advanced'" class="tab-content">
        <h2>Продвинутые концепции и подводные камни</h2>
        
        <div class="concept">
          <h3>1. Порядок выполнения таймеров</h3>
          <div class="concept-content">
            <div class="concept-explanation">
              <p>
                Функции setTimeout() и setInterval() не гарантируют точное время выполнения. 
                Они лишь гарантируют, что колбэк будет выполнен не раньше указанного времени.
              </p>
              <p><strong>Факторы, влияющие на задержку:</strong></p>
              <ul>
                <li>Загруженность стека вызовов</li>
                <li>Наличие других таймеров с более ранним временем выполнения</li>
                <li>Выполнение микрозадач</li>
                <li>Ограничения браузера (например, throttling для неактивных вкладок)</li>
                <li>Минимальное время задержки (обычно 4мс для вложенных таймеров)</li>
              </ul>
            </div>
            <div class="code-example">
              <pre><code>console.log('Начало');
  setTimeout(() => {
    console.log('setTimeout 0мс');
  }, 0);
  
  setTimeout(() => {
    console.log('setTimeout 0мс (второй)');
  }, 0);
  
 
  
  console.log('Конец');
  
  // Вывод:
  // Начало
  // Конец
  // setTimeout 0мс
  // setTimeout 0мс (второй)
  // Таймеры выполняются не раньше, чем освободится стек</code></pre>
            </div>
          </div>
        </div>
        
        <div class="concept">
          <h3>2. Проблемы с setInterval</h3>
          <div class="concept-content">
            <div class="concept-explanation">
              <p>
                setInterval() имеет несколько особенностей, которые могут привести к проблемам:
              </p>
              <ul>
                <li>Колбэки могут накапливаться, если выполнение предыдущего колбэка занимает больше времени, чем интервал</li>
                <li>Не учитывает время выполнения колбэка при планировании следующего вызова</li>
                <li>Может привести к перегрузке браузера, если колбэк выполняется слишком долго</li>
                <li>Трудно гарантировать точность интервала из-за особенностей работы Event Loop</li>
              </ul>
              <p><strong>Рекомендация:</strong> для точного соблюдения интервала между выполнениями лучше использовать рекурсивный setTimeout.</p>
            </div>
            <div class="code-example">
              <pre><code>// Проблема с setInterval
  // Если someAsyncOperation занимает больше 1000мс,
  // колбэки начнут накапливаться
  setInterval(() => {
    someAsyncOperation();
  }, 1000);
  
  // Более надежный подход с рекурсивным setTimeout
  function betterInterval() {
    someAsyncOperation().then(() => {
      setTimeout(betterInterval, 1000);
    });
  }
  
  betterInterval();</code></pre>
            </div>
          </div>
        </div>
        
        <div class="concept">
          <h3>3. Микрозадачи и бесконечные циклы</h3>
          <div class="concept-content">
            <div class="concept-explanation">
              <p>
                Если микрозадачи постоянно добавляют новые микрозадачи, можно получить бесконечный цикл, 
                который никогда не позволит выполниться задачам из Task Queue.
              </p>
              <p>
                Это может привести к блокировке UI в браузере или полной остановке выполнения программы в Node.js.
              </p>
            </div>
            <div class="code-example">
              <pre><code>// Опасно! Бесконечный цикл микрозадач
  function infiniteLoop() {
    Promise.resolve().then(() => {
      console.log('Это будет выполняться бесконечно');
      infiniteLoop();
    });
  }
  
  infiniteLoop();
  
  // Следующий setTimeout никогда не выполнится,
  // т.к. очередь микрозадач никогда не опустошается
  setTimeout(() => {
    console.log('Это сообщение никогда не появится');
  }, 0);</code></pre>
            </div>
          </div>
        </div>
        
        <div class="concept">
          <h3>4. Блокировка Event Loop</h3>
          <div class="concept-content">
            <div class="concept-explanation">
              <p>
                Длительные синхронные операции блокируют Event Loop, препятствуя обработке других задач.
              </p>
              <p><strong>Последствия блокировки:</strong></p>
              <ul>
                <li>Зависания UI и невозможность взаимодействия с пользователем (в браузере)</li>
                <li>Задержка обработки запросов и всех других операций (в Node.js)</li>
                <li>Таймеры и другие асинхронные операции не могут выполняться вовремя</li>
              </ul>
              <p><strong>Решения:</strong></p>
              <ul>
                <li>Разбиение тяжелых вычислений на части с использованием setTimeout или requestAnimationFrame</li>
                <li>Использование Web Workers (в браузере) или Worker Threads (в Node.js)</li>
                <li>Асинхронная обработка данных с помощью генераторов или async iterators</li>
              </ul>
            </div>
            <div class="code-example">
             
            </div>
          </div>
        </div>
        
        <div class="concept">
          <h3>5. Особенности async/await и Promise</h3>
          <div class="concept-content">
            <div class="concept-explanation">
              <p>
                async/await — синтаксический сахар над Promise, который делает асинхронный код похожим на синхронный.
                Однако, есть несколько подводных камней:
              </p>
              <ul>
                <li>await приостанавливает выполнение только текущей асинхронной функции, а не всего скрипта</li>
                <li>Неправильная обработка ошибок может привести к "проглатыванию" исключений</li>
                <li>Последовательное выполнение await может быть неоптимальным, когда операции можно выполнить параллельно</li>
                <li>async функции всегда возвращают Promise, даже если внутри нет await</li>
                <li>Ошибка, брошенная в async функции, становится rejected promise</li>
              </ul>
            </div>
            <div class="code-example">
              <pre><code>// Последовательное vs параллельное выполнение
  async function sequential() {
    console.time('sequential');
    
    // Последовательное выполнение
    const result1 = await fetchData('/api/data1');
    const result2 = await fetchData('/api/data2');
    
    console.timeEnd('sequential');
    return [result1, result2];
  }
  
  async function parallel() {
    console.time('parallel');
    
    // Параллельное выполнение
    const [result1, result2] = await Promise.all([
      fetchData('/api/data1'),
      fetchData('/api/data2')
    ]);
    
    console.timeEnd('parallel');
    return [result1, result2];
  }
  
  // Проглатывание ошибок
  async function potentialProblem() {
    try {
      return await riskyOperation();
    } catch (error) {
      console.log('Поймали ошибку:', error);
      // Забыли вернуть или пробросить ошибку
    }
    // Функция вернет Promise, а не отклоненный Promise
  }
  
  // Правильная обработка
  async function betterErrorHandling() {
    try {
      return await riskyOperation();
    } catch (error) {
      console.log('Поймали ошибку:', error);
      throw error; // Пробрасываем ошибку дальше
      // или можно вернуть запасное значение
      // return fallbackValue;
    }
  }</code></pre>
            </div>
          </div>
        </div>
        
        <div class="concept">
          <h3>6. Гонки условий (Race Conditions)</h3>
          <div class="concept-content">
            <div class="concept-explanation">
              <p>
                Гонки условий возникают, когда результат операции зависит от последовательности или времени выполнения асинхронных событий.
              </p>
              <p>Распространенные причины:</p>
              <ul>
                <li>Несколько асинхронных операций изменяют одно и то же состояние</li>
                <li>Пользовательские действия во время асинхронных операций</li>
                <li>Отмена операций без правильной очистки</li>
              </ul>
              <p><strong>Решения:</strong></p>
              <ul>
                <li>Использование флагов для отслеживания актуальности данных</li>
                <li>Отмена предыдущих операций (AbortController)</li>
                <li>Использование мьютексов или блокировок в многопоточной среде</li>
                <li>Атомарные операции для критических участков кода</li>
              </ul>
            </div>
            <div class="code-example">
              <pre><code>// Пример гонки условий
  let data = null;
  
  // Две асинхронные операции
  fetchData('/api/data1').then(result => {
    // Эта операция может завершиться позже,
    // но перезапишет более свежие данные
    data = result;
  });
  
  fetchData('/api/data2').then(result => {
    // Эта операция может завершиться раньше
    data = result;
  });
  
  // Решение с использованием AbortController
  let currentRequest = null;
  
  async function fetchLatestData(url) {
    // Отменяем предыдущий запрос, если он еще выполняется
    if (currentRequest) {
      currentRequest.abort();
    }
    
    // Создаем новый контроллер для этого запроса
    currentRequest = new AbortController();
    const { signal } = currentRequest;
    
    try {
      const response = await fetch(url, { signal });
      const data = await response.json();
      
      // Сбрасываем контроллер только если запрос выполнился
      currentRequest = null;
      
      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Запрос был отменен');
      } else {
        throw error;
      }
    }
  }</code></pre>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Event Loop in Nuxt -->
      <div v-if="currentTab === 'nuxt'" class="tab-content">
        <h2>Event Loop в контексте Nuxt.js</h2>
        
        <div class="concept">
          <h3>1. Особенности работы в Nuxt.js</h3>
          <div class="concept-content">
            <div class="concept-explanation">
              <p>
                Nuxt.js — фреймворк для Vue.js, который добавляет SSR (серверный рендеринг), статическую генерацию и другие возможности.
                Это создает дополнительную сложность в работе с Event Loop:
              </p>
              <ul>
                <li>Код может выполняться как на клиенте, так и на сервере (Node.js)</li>
                <li>Разные окружения имеют разные реализации Event Loop</li>
                <li>Серверный рендеринг требует особого внимания к асинхронным операциям</li>
                <li>Хуки жизненного цикла компонентов и их взаимодействие с Event Loop</li>
              </ul>
            </div>
            <div class="scenario-tabs">
              <div class="scenario-tab" :class="{ active: currentScenario === 'ssr' }" @click="currentScenario = 'ssr'">
                SSR (Server-Side Rendering)
              </div>
              <div class="scenario-tab" :class="{ active: currentScenario === 'spa' }" @click="currentScenario = 'spa'">
                SPA (Single-Page Application)
              </div>
              <div class="scenario-tab" :class="{ active: currentScenario === 'static' }" @click="currentScenario = 'static'">
                Static Generation
              </div>
            </div>
            
            <div class="scenario-content" v-if="currentScenario === 'ssr'">
              <h4>SSR (Server-Side Rendering)</h4>
              <p>
                В режиме SSR, Event Loop играет критическую роль дважды: сначала на сервере, затем на клиенте.
              </p>
              <ol>
                <li>
                  <strong>На сервере (Node.js):</strong>
                  <ul>
                    <li>Код в хуках <code>setup()</code>, <code>asyncData()</code>, <code>fetch()</code> выполняется на сервере</li>
                    <li>Nuxt ждет завершения всех асинхронных операций перед отправкой HTML</li>
                    <li>Блокировка Event Loop на сервере влияет на все запросы</li>
                  </ul>
                </li>
                <li>
                  <strong>На клиенте (браузер):</strong>
                  <ul>
                    <li>Гидратация: Vue подключается к отрендеренному HTML</li>
                    <li>Дальнейшие обновления происходят в клиентском режиме</li>
                    <li>Event Loop в браузере управляет интерактивностью</li>
                  </ul>
                </li>
              </ol>
              <div class="code-example">
                <pre><code>// Пример асинхронных операций в SSR Nuxt
  export default {
    async asyncData({ $axios }) {
      // Выполняется на сервере перед рендерингом
      // Nuxt ждет завершения этого Promise
      const data = await $axios.$get('/api/data');
      return { data };
    },
    
    async mounted() {
      // Выполняется только на клиенте после гидратации
      console.log('Компонент смонтирован в браузере');
      await this.clientSideOnlyOperation();
    },
    
    methods: {
      async serverAndClientMethod() {
        // Может выполняться и на сервере, и на клиенте!
        // Будьте осторожны с API, которые доступны только в браузере
        if (process.client) {
          window.localStorage.setItem('key', 'value');
        }
      }
    }
  }</code></pre>
              </div>
            </div>
            
            <div class="scenario-content" v-if="currentScenario === 'spa'">
              <h4>SPA (Single-Page Application)</h4>
              <p>
                В режиме SPA Nuxt работает как обычное Vue.js приложение, весь код выполняется только в браузере.
              </p>
              <ul>
                <li>Весь JavaScript загружается и выполняется на клиенте</li>
                <li>Отрисовка происходит только в браузере</li>
                <li>Event Loop полностью контролируется браузером</li>
                <li>Маршрутизация и переходы между страницами не перезагружают страницу</li>
                <li>Первоначальная загрузка может быть дольше, чем в SSR</li>
              </ul>
              <div class="code-example">
                <pre><code>// Настройка режима SPA в nuxt.config.js
  export default {
    ssr: false, // Отключаем серверный рендеринг
    
    // Остальная конфигурация...
  }
  
  // Пример компонента в SPA
  export default {
    async fetch() {
      // В SPA этот хук выполняется только на клиенте
      // после создания компонента
      this.data = await this.$axios.$get('/api/data');
    },
    
    mounted() {
      // Как и в обычном Vue, выполняется после монтирования DOM
      console.log('Компонент смонтирован');
      this.setupEventListeners();
    },
    
    methods: {
      setupEventListeners() {
        // В SPA можно безопасно использовать браузерные API
        window.addEventListener('resize', this.handleResize);
      }
    },
    
    beforeDestroy() {
      // Важно очищать ресурсы
      window.removeEventListener('resize', this.handleResize);
    }
  }</code></pre>
              </div>
            </div>
            
            <div class="scenario-content" v-if="currentScenario === 'static'">
              <h4>Static Generation</h4>
              <p>
                При статической генерации Nuxt предварительно рендерит все страницы в HTML во время сборки.
              </p>
              <ul>
                <li>Асинхронные операции выполняются один раз при сборке</li>
                <li>Event Loop Node.js используется только во время генерации</li>
                <li>Результат — статические HTML файлы без серверной части</li>
                <li>После загрузки страницы, Vue выполняет гидратацию и приложение работает как SPA</li>
              </ul>
              <div class="code-example">
                <pre><code>// Настройка статической генерации в nuxt.config.js
  export default {
    target: 'static',
    
    // Определение динамических маршрутов для генерации
    generate: {
      async routes() {
        // Этот код выполняется только при сборке
        const { data } = await axios.get('https://api.example.com/posts')
        return data.map(post => `/posts/${post.id}`)
      }
    }
  }
  
  // Компонент со статическими пропсами
  export default {
    async asyncData({ params, $content }) {
      // Выполняется при сборке для каждого маршрута
      const article = await $content('articles', params.id).fetch()
      return { article }
    },
    
    mounted() {
      // Выполняется в браузере после гидратации
      console.log('Компонент гидратирован');
      
      // Можно выполнять динамические запросы для обновления данных
      this.checkForUpdates();
    }
  }</code></pre>
              </div>
            </div>
          </div>
        </div>
        
        <div class="concept">
          <h3>2. Жизненный цикл Nuxt и Event Loop</h3>
          <div class="concept-content">
            <div class="nuxt-lifecycle-diagram">
              <img src="https://i.imgur.com/8T0Vz8d.png" alt="Nuxt Lifecycle" class="lifecycle-image">
            </div>
            <div class="concept-explanation">
              <p>
                Nuxt добавляет свои хуки жизненного цикла поверх Vue. Понимание их взаимодействия с Event Loop критически важно:
              </p>
              <h4>Серверная часть (или время сборки для статики):</h4>
              <ol>
                <li><strong>nuxtServerInit</strong> — выполняется на сервере в хранилище Vuex</li>
                <li><strong>middleware</strong> — выполняется до загрузки страницы</li>
                <li><strong>asyncData / fetch (сервер)</strong> — загрузка данных до рендеринга</li>
                <li><strong>beforeCreate / created</strong> — хуки Vue, выполняемые на сервере</li>
              </ol>
              <h4>Клиентская часть:</h4>
              <ol>
                <li><strong>beforeCreate / created</strong> — выполняются заново на клиенте</li>
                <li><strong>beforeMount / mounted</strong> — только на клиенте</li>
                <li><strong>fetch (клиент)</strong> — может перезагрузить данные на клиенте</li>
                <li>Далее стандартные хуки Vue (beforeUpdate, updated, etc.)</li>
              </ol>
              <p>
                <strong>Важно:</strong> Асинхронные операции в серверных хуках блокируют рендеринг пока не завершатся. 
                В клиентских хуках они работают как обычно через Event Loop браузера.
              </p>
            </div>
          </div>
        </div>
        
        <div class="concept">
          <h3>3. Распространенные проблемы и решения</h3>
          <div class="concept-content">
            <div class="problems-grid">
              <div class="problem-card">
                <h4>Проблема: Использование браузерных API на сервере</h4>
                <p>
                  Вызов Window, document или других браузерных API в коде, который выполняется на сервере, 
                  приводит к ошибкам.
                </p>
                <div class="solution">
                  <h5>Решение:</h5>
                  <pre><code>// Проверяйте окружение перед использованием API
  if (process.client) {
    // Только для браузера
    window.addEventListener('scroll', handleScroll);
  }
  
  // Или используйте onMounted хук
  onMounted(() => {
    // Гарантированно выполняется только в браузере
    document.title = 'Новый заголовок';
  });</code></pre>
                </div>
              </div>
              
              <div class="problem-card">
                <h4>Проблема: Блокировка SSR длительными операциями</h4>
                <p>
                  Тяжелые вычисления в asyncData или fetch блокируют рендеринг страницы на сервере.
                </p>
                <div class="solution">
                  <h5>Решение:</h5>
                  <pre><code>// Перенесите тяжелые вычисления на клиент
  export default {
    data() {
      return {
        items: [],
        processedItems: []
      }
    },
    
    async asyncData({ $axios }) {
      // На сервере только получаем данные
      const items = await $axios.$get('/api/items');
      return { items };
    },
    
    mounted() {
      // Тяжелые вычисления выполняем на клиенте
      this.processedItems = this.processHeavyData(this.items);
    }
  }</code></pre>
                </div>
              </div>
              
              <div class="problem-card">
                <h4>Проблема: Несогласованность данных между сервером и клиентом</h4>
                <p>
                  Данные, полученные на сервере, могут отличаться от данных на клиенте после гидратации.
                </p>
                <div class="solution">
                  <h5>Решение:</h5>
                  <pre><code>// Используйте хук fetch с опцией server: false
  export default {
    // Для критических начальных данных
    async asyncData({ $axios }) {
      const initialData = await $axios.$get('/api/critical-data');
      return { initialData };
    },
    
    // Для данных, которые могут обновляться
    fetch() {
      // В SSR выполняется на сервере и клиенте
      // В статической генерации только на клиенте
      return this.$axios.$get('/api/dynamic-data')
        .then(data => {
          this.dynamicData = data;
        });
    },
    
    // Настройка fetch для выполнения только на клиенте
    fetchOnServer: false
  }</code></pre>
                </div>
              </div>
              
              <div class="problem-card">
                <h4>Проблема: Утечки памяти и ресурсов</h4>
                <p>
                  Неправильная очистка таймеров, обработчиков событий и подписок может привести к утечкам.
                </p>
                <div class="solution">
                  <h5>Решение:</h5>
                  <pre><code>export default {
    data() {
      return {
        timerId: null,
        eventCallback: null
      }
    },
    
    mounted() {
      // Сохраняем ссылки на обработчики
      this.eventCallback = () => {
        console.log('Событие произошло');
      };
      
      window.addEventListener('resize', this.eventCallback);
      
      this.timerId = setInterval(() => {
        this.checkUpdates();
      }, 10000);
    },
    
    beforeDestroy() {
      // Очищаем все ресурсы
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      
      if (this.eventCallback) {
        window.removeEventListener('resize', this.eventCallback);
      }
    }
  }</code></pre>
                </div>
              </div>
              
              <div class="problem-card">
                <h4>Проблема: Гонки условий в Navigation Guards</h4>
                <p>
                  Асинхронные операции в middleware или navigation guards могут создавать гонки условий.
                </p>
                <div class="solution">
                  <h5>Решение:</h5>
                  <pre><code>// middleware/auth.js
  export default async function ({ store, redirect, route }) {
    // Не продолжать навигацию до завершения проверки
    if (!store.state.auth.checked) {
      await store.dispatch('auth/checkAuth');
    }
    
    // После разрешения Promise проверяем результат
    if (!store.state.auth.loggedIn && route.meta.requiresAuth) {
      return redirect('/login');
    }
  }
  
  // Использование AbortController для отмены запросов
  export default {
    data() {
      return {
        controller: null
      }
    },
    
    methods: {
      async fetchData() {
        // Отменяем предыдущий запрос
        if (this.controller) {
          this.controller.abort();
        }
        
        // Создаем новый контроллер
        this.controller = new AbortController();
        
        try {
          const response = await fetch('/api/data', {
            signal: this.controller.signal
          });
          
          this.data = await response.json();
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.error(err);
          }
        }
      }
    },
    
    beforeRouteLeave(to, from, next) {
      // Отменяем запросы при уходе со страницы
      if (this.controller) {
        this.controller.abort();
      }
      next();
    }
  }</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Interview Questions -->
      <div v-if="currentTab === 'interview'" class="tab-content">
        <h2>Вопросы для собеседования по Event Loop</h2>
        
        <div class="questions-container">
          <div class="difficulty-filters">
            <button 
              v-for="level in difficultyLevels" 
              :key="level"
              :class="{ active: currentDifficulty === level || currentDifficulty === 'all' }"
              @click="filterQuestions(level)"
            >
              {{ level }}
            </button>
          </div>
          
          <div class="questions-list">
            <div 
              v-for="(question, index) in filteredQuestions" 
              :key="index"
              class="question-card"
              :class="question.difficulty"
            >
              <div class="question-header" @click="toggleQuestion(index)">
                <div class="question-title">{{ question.question }}</div>
                <div class="difficulty-badge">{{ question.difficulty }}</div>
                <div class="question-toggle">{{ expandedQuestions.includes(index) ? '−' : '+' }}</div>
              </div>
              
              <div v-if="expandedQuestions.includes(index)" class="question-content">
                <div class="question-answer">
                  <h4>Ответ:</h4>
                  <div v-html="question.answer"></div>
                </div>
                
                <div v-if="question.code" class="question-code">
                  <h4>Код для примера:</h4>
                  <pre><code>{{ question.code }}</code></pre>
                </div>
                
                <div v-if="question.followUp" class="follow-up-questions">
                  <h4>Дополнительные вопросы:</h4>
                  <ul>
                    <li v-for="(followUp, idx) in question.followUp" :key="idx">
                      {{ followUp }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onUnmounted } from 'vue';
  
  // Текущая вкладка
  const tabs = [
    { id: 'intro', name: 'Введение' },
    { id: 'basics', name: 'Основы асинхронности' },
    { id: 'queues', name: 'Стек и очереди' },
    { id: 'node-vs-browser', name: 'Node.js vs браузер' },
    { id: 'advanced', name: 'Продвинутые концепции' },
    { id: 'nuxt', name: 'Event Loop в Nuxt' },
    { id: 'interview', name: 'Вопросы для собеседования' }
  ];
  
  const currentTab = ref('intro');
  const currentScenario = ref('ssr');
  
  // Анимация Event Loop
  const isLooping = ref(false);
  const callStackItems = ref([]);
  const taskQueueItems = ref([]);
  const microtaskQueueItems = ref([]);
  
  let eventLoopInterval = null;
  
  function startEventLoopAnimation() {
    if (isLooping.value) return;
    
    isLooping.value = true;
    
    // Исходные данные для анимации
    callStackItems.value = ['main()'];
    taskQueueItems.value = ['setTimeout callback', 'xhr callback', 'UI event'];
    microtaskQueueItems.value = ['Promise.then', 'queueMicrotask'];
    
    let step = 0;
    
    eventLoopInterval = setInterval(() => {
      step = (step + 1) % 10;
      
      switch(step) {
        case 1: // Выполнение синхронного кода
          callStackItems.value.push('function1()');
          break;
        case 2:
          callStackItems.value.push('function2()');
          break;
        case 3:
          callStackItems.value.pop(); // function2 завершается
          break;
        case 4:
          callStackItems.value.pop(); // function1 завершается
          break;
        case 5: // Обработка микрозадач
          if (microtaskQueueItems.value.length > 0) {
            const micro = microtaskQueueItems.value.shift();
            callStackItems.value.push(micro);
          }
          break;
        case 6:
          if (callStackItems.value.length > 1) {
            callStackItems.value.pop(); // Завершение микрозадачи
          }
          if (microtaskQueueItems.value.length > 0) {
            step = 4; // Повторяем обработку микрозадач
          }
          break;
        case 7: // Обработка одной задачи
          if (taskQueueItems.value.length > 0) {
            const task = taskQueueItems.value.shift();
            callStackItems.value.push(task);
            // Добавляем новую микрозадачу при выполнении задачи
            if (step === 7 && Math.random() > 0.5) {
              microtaskQueueItems.value.push('new Promise.then');
            }
          }
          break;
        case 8:
          if (callStackItems.value.length > 1) {
            callStackItems.value.pop(); // Завершение задачи
          }
          break;
        case 9: // Завершение цикла и добавление новых задач случайным образом
          if (Math.random() > 0.7) {
            taskQueueItems.value.push('new setTimeout callback');
          }
          if (Math.random() > 0.8) {
            microtaskQueueItems.value.push('new Promise.then');
          }
          break;
      }
      
    }, 1000);
  }
  
  function stopEventLoopAnimation() {
    if (eventLoopInterval) {
      clearInterval(eventLoopInterval);
      eventLoopInterval = null;
      isLooping.value = false;
    }
  }
  
  function resetEventLoopAnimation() {
    stopEventLoopAnimation();
    callStackItems.value = ['main()'];
    taskQueueItems.value = [];
    microtaskQueueItems.value = [];
  }
  
  // Очистка ресурсов при размонтировании компонента
  onUnmounted(() => {
    stopEventLoopAnimation();
  });
  
  // Стек вызовов для интерактивной демонстрации
  const stackDemo = ref(['Global Execution Context']);
  const canCallFoo = computed(() => stackDemo.value.includes('main()'));
  const canCallBar = computed(() => stackDemo.value.includes('foo()'));
  
  function callFunction(funcName) {
    stackDemo.value.push(funcName);
  }
  
  function returnFunction() {
    if (stackDemo.value.length > 1) {
      stackDemo.value.pop();
    }
  }
  
  function resetStack() {
    stackDemo.value = ['Global Execution Context'];
  }
  
  function getFrameColor(frame) {
    if (frame.includes('Global')) return '#e9ecef';
    if (frame.includes('main')) return '#4263eb';
    if (frame.includes('foo')) return '#f03e3e';
    if (frame.includes('bar')) return '#40c057';
    return '#1098ad';
  }
  
  // Демонстрация очередей задач и микрозадач
  const consoleOutput = ref([]);
  const demoRunning = ref(false);
  
  function runQueueDemo() {
    if (demoRunning.value) return;
    demoRunning.value = true;
    consoleOutput.value = [];
    
    // Симуляция выполнения кода из примера
    consoleOutput.value.push('1 - Начало скрипта');
    
    setTimeout(() => {
      consoleOutput.value.push('2 - setTimeout callback (macrotask)');
      demoRunning.value = false;
    }, 0);
    
    Promise.resolve()
      .then(() => {
        consoleOutput.value.push('3 - Promise.then (microtask)');
        return Promise.resolve();
      })
      .then(() => {
        consoleOutput.value.push('4 - Вторая Promise.then (microtask)');
      });
    
    queueMicrotask(() => {
      consoleOutput.value.push('5 - queueMicrotask (microtask)');
    });
    
    Promise.resolve().then(() => {
      setTimeout(() => {
        consoleOutput.value.push('6 - setTimeout из Promise (macrotask)');
      }, 0);
    });
    
    consoleOutput.value.push('7 - Конец скрипта');
  }
  
  function resetQueueDemo() {
    demoRunning.value = false;
    consoleOutput.value = [];
  }
  
  // Вопросы для собеседования
  const interviewQuestions = [
    {
      question: "Что такое Event Loop в JavaScript и почему он важен?",
      answer: `Event Loop (цикл событий) — это механизм, который позволяет JavaScript выполнять асинхронные операции, несмотря на то, что JS однопоточен. Его основная задача — координировать выполнение кода, обработку событий и колбэков.<br><br>
      Event Loop постоянно проверяет, пуст ли стек вызовов, и если да, берет задачи из очереди задач и помещает их в стек для выполнения.<br><br>
      Event Loop важен, потому что он позволяет JavaScript быть асинхронным и неблокирующим, что критично для создания отзывчивых веб-приложений. Без него JS был бы ограничен синхронным выполнением, и такие операции как загрузка данных, обработка пользовательских событий или таймеры заставляли бы интерфейс "зависать".`,
      difficulty: "easy",
      followUp: [
        "Как бы вы объяснили Event Loop нетехническому специалисту?",
        "Что произошло бы, если бы в JavaScript не было Event Loop?"
      ]
    },
    {
      question: "Объясните разницу между стеком вызовов (Call Stack) и очередью задач (Task Queue)",
      answer: `<strong>Стек вызовов (Call Stack)</strong> — это структура данных типа LIFO (Last In, First Out), которая отслеживает текущие вызовы функций в программе. Когда вызывается функция, она добавляется в стек; когда функция завершается, она удаляется из стека. JavaScript в каждый момент времени может выполнять только одну функцию из стека вызовов.<br><br>
      <strong>Очередь задач (Task Queue или Callback Queue)</strong> — это структура данных типа FIFO (First In, First Out), содержащая колбэки, которые ожидают выполнения. Это могут быть обработчики событий, таймеры, промисы и другие асинхронные операции. Event Loop проверяет, пуст ли стек вызовов, и если да, берет первую задачу из очереди и помещает её в стек.`,
      difficulty: "easy",
      code: `function main() {
    console.log('Начало main');
    setTimeout(function timeout() {
      console.log('Таймер сработал');
    }, 0);
    console.log('Конец main');
  }
  
  main();
  
  // Вывод:
  // Начало main
  // Конец main
  // Таймер сработал`
    },
    {
      question: "Что такое микрозадачи (microtasks) и как они отличаются от обычных задач (macrotasks)?",
      answer: `<strong>Микрозадачи (microtasks)</strong> — это задачи, которые должны быть выполнены сразу после текущей задачи, до того, как Event Loop перейдет к следующей обычной задаче (macrotask). Они имеют более высокий приоритет.<br><br>
      <strong>Примеры микрозадач:</strong>
      <ul>
        <li>Promise.then/catch/finally</li>
        <li>queueMicrotask()</li>
        <li>process.nextTick() (в Node.js)</li>
        <li>MutationObserver (в браузере)</li>
      </ul>
      
      <strong>Примеры обычных задач (macrotasks):</strong>
      <ul>
        <li>setTimeout/setInterval</li>
        <li>requestAnimationFrame</li>
        <li>I/O операции</li>
        <li>UI рендеринг</li>
        <li>setImmediate (в Node.js)</li>
      </ul>
      
      <strong>Ключевые отличия:</strong>
      <ul>
        <li>Микрозадачи выполняются до следующей macrotask, после каждой macrotask Event Loop проверяет и опустошает очередь микрозадач</li>
        <li>Новые микрозадачи, добавленные во время выполнения микрозадач, также выполняются до перехода к следующей macrotask</li>
        <li>Это позволяет промисам выполняться последовательно, даже если они создаются динамически</li>
      </ul>`,
      difficulty: "medium",
      code: `console.log('Скрипт начался');
  
  setTimeout(() => {
    console.log('setTimeout 1');
  }, 0);
  
  Promise.resolve()
    .then(() => console.log('Promise 1'))
    .then(() => console.log('Promise 2'));
  
  setTimeout(() => {
    console.log('setTimeout 2');
  }, 0);
  
  console.log('Скрипт завершился');
  
  // Вывод:
  // Скрипт начался
  // Скрипт завершился
  // Promise 1
  // Promise 2
  // setTimeout 1
  // setTimeout 2`
    },
    {
      question: "Каков порядок выполнения в следующем примере и почему?",
      answer: `Порядок вывода будет таким:<br>
      1. "Start"<br>
      2. "End"<br>
      3. "Promise 1"<br>
      4. "Promise 2"<br>
      5. "setTimeout 1"<br>
      6. "setTimeout 2"<br><br>
      
      <strong>Объяснение:</strong><br>
      1. Сначала выполняется синхронный код: выводятся "Start" и "End"<br>
      2. Когда стек вызовов освобождается, Event Loop проверяет очередь микрозадач. Там находятся колбэки Promise.then, которые выполняются последовательно<br>
      3. После выполнения всех микрозадач Event Loop переходит к очереди задач (Task Queue) и выполняет колбэки setTimeout по порядку<br><br>
      
      Главное здесь: промисы (микрозадачи) всегда выполняются до таймеров (задач), даже если таймеры установлены на 0 мс.`,
      difficulty: "medium",
      code: `console.log('Start');
  
  setTimeout(() => {
    console.log('setTimeout 1');
  }, 0);
  
  Promise.resolve()
    .then(() => {
      console.log('Promise 1');
    })
    .then(() => {
      console.log('Promise 2');
    });
  
  setTimeout(() => {
    console.log('setTimeout 2');
  }, 0);
  
  console.log('End');`
    },
    {
      question: "Чем отличается реализация Event Loop в браузере и Node.js?",
      answer: `Хотя концептуально Event Loop и в браузере, и в Node.js работает схожим образом, есть важные отличия:<br><br>
      
      <strong>Браузер:</strong>
      <ul>
        <li>Один основной Event Loop для всех операций</li>
        <li>Включает специфичные для UI задачи (рендеринг, обработка пользовательских событий)</li>
        <li>Имеет API как requestAnimationFrame, которое синхронизируется с обновлением экрана</li>
        <li>Выполняет микрозадачи после каждой задачи, перед рендерингом</li>
      </ul>
      
      <strong>Node.js:</strong>
      <ul>
        <li>Основан на библиотеке libuv</li>
        <li>Имеет несколько фаз в цикле событий (timers, pending callbacks, poll, check и др.)</li>
        <li>Включает уникальные API: process.nextTick() (имеет приоритет над Promise), setImmediate()</li>
        <li>Оптимизирован для I/O-операций, сетевых запросов</li>
        <li>Имеет возможность распределять нагрузку через worker threads и кластеризацию</li>
      </ul>`,
      difficulty: "medium",
      code: `// Node.js специфичный код
  console.log('Start');
  
  process.nextTick(() => {
    console.log('nextTick callback');
  });
  
  Promise.resolve().then(() => {
    console.log('Promise callback');
  });
  
  // Выполняется в фазе check
  setImmediate(() => {
    console.log('setImmediate callback');
  });
  
  // Выполняется в фазе timers
  setTimeout(() => {
    console.log('setTimeout callback');
  }, 0);
  
  console.log('End');
  
  // Вывод (обычно):
  // Start
  // End
  // nextTick callback
  // Promise callback
  // setTimeout callback
  // setImmediate callback
  // (порядок setTimeout и setImmediate может меняться)`
    },
    {
      question: "Объясните, как работают промисы в контексте Event Loop",
      answer: `Промисы (Promises) — это механизм для работы с асинхронными операциями, и вот как они взаимодействуют с Event Loop:<br><br>
      
      1. Когда создается промис, выполняется его executor-функция синхронно<br>
      2. Методы <code>.then()</code>, <code>.catch()</code> и <code>.finally()</code> регистрируют колбэки, которые будут выполнены асинхронно<br>
      3. Когда промис разрешается (resolve) или отклоняется (reject), соответствующие колбэки добавляются в очередь микрозадач (Microtask Queue)<br>
      4. После завершения текущей задачи, Event Loop проверяет и выполняет все микрозадачи в очереди, включая колбэки промисов<br>
      5. Важно: очередь микрозадач полностью опустошается перед тем, как будет выполнена следующая задача из Task Queue<br>
      6. Когда колбэк <code>.then()</code> возвращает промис, следующий <code>.then()</code> в цепочке ждет разрешения этого промиса<br><br>
      
      Это позволяет промисам выполняться последовательно и предсказуемо, создавая иллюзию синхронного выполнения асинхронного кода.`,
      difficulty: "medium",
      code: `console.log('Начало');
  
  // Пример 1: Простой промис
  Promise.resolve('Простой промис')
    .then(value => {
      console.log(value);
      return 'Возвращаемое значение';
    })
    .then(value => {
      console.log(value);
    });
  
  // Пример 2: Вложенные промисы
  Promise.resolve('Внешний промис')
    .then(value => {
      console.log(value);
      // Возвращаем новый промис
      return Promise.resolve('Вложенный промис');
    })
    .then(value => {
      console.log(value);
    });
  
  console.log('Конец');
  
  // Вывод:
  // Начало
  // Конец
  // Простой промис
  // Возвращаемое значение
  // Внешний промис
  // Вложенный промис`
    },
    {
      question: "Что произойдет, если бесконечно создавать микрозадачи? Как это может повлиять на производительность?",
      answer: `Если постоянно создавать новые микрозадачи (например, через <code>Promise.resolve().then()</code> или <code>process.nextTick()</code>), это может привести к "голоданию" задач из Task Queue, включая UI-рендеринг и обработку пользовательских событий.<br><br>
      
      <strong>Последствия:</strong>
      <ul>
        <li>Блокировка UI в браузере — интерфейс перестает отвечать на действия пользователя</li>
        <li>Задержка выполнения таймеров, сетевых запросов и других макрозадач</li>
        <li>В тяжелых случаях — полное "зависание" приложения, вплоть до сообщения браузера о "Зависшем скрипте"</li>
        <li>В Node.js — блокировка всех запросов и других операций</li>
      </ul>
      
      <strong>Решения:</strong>
      <ul>
        <li>Использование setTimeout(0) для принудительного перехода в Task Queue</li>
        <li>Разбиение тяжелых вычислений на порции</li>
        <li>Осторожное использование рекурсивных промисов</li>
        <li>Для больших объемов данных — Web Workers в браузере или Worker Threads в Node.js</li>
      </ul>`,
      difficulty: "hard",
      code: `// Опасный пример - бесконечный цикл микрозадач
  function dangerousRecursion() {
    Promise.resolve().then(() => {
      console.log('Бесконечная микрозадача');
      dangerousRecursion(); // Создает новую микрозадачу рекурсивно
    });
  }
  
  // Это заблокирует Event Loop
  dangerousRecursion();
  
  // Этот код никогда не выполнится
  setTimeout(() => {
    console.log('Этот текст не появится в консоли');
  }, 0);
  
  // Безопасный вариант с ограничениями
  function safeRecursion(count = 0, max = 100) {
    if (count >= max) {
      console.log('Достигнут предел рекурсии');
      return;
    }
    
    Promise.resolve().then(() => {
      console.log('Итерация', count);
      safeRecursion(count + 1, max);
    });
  }`
    },
    {
      question: "Как работает async/await в контексте Event Loop и как это соотносится с промисами?",
      answer: `async/await — это синтаксический сахар поверх промисов, который делает асинхронный код похожим на синхронный.<br><br>
      
      В контексте Event Loop:<br>
      1. <code>async</code>-функция всегда возвращает промис<br>
      2. Когда выполнение доходит до <code>await</code>, интерпретатор приостанавливает выполнение функции и "запоминает" точку возврата<br>
      3. Код после <code>await</code> неявно оборачивается в <code>.then()</code> колбэк промиса<br>
      4. Это означает, что код после <code>await</code> попадает в очередь микрозадач<br>
      5. Выполнение функции возобновляется из очереди микрозадач, когда промис разрешается<br>
      6. Если промис отклоняется, исключение возникает в месте <code>await</code><br><br>
      
      <strong>Ключевой момент:</strong> await приостанавливает выполнение только текущей async-функции, а не весь JavaScript. Остальной код продолжает выполняться.`,
      difficulty: "hard",
      code: `console.log('Начало');
  
  async function example() {
    console.log('1. Начало async функции');
    
    // Эта строка приостанавливает выполнение example(),
    // но не блокирует Event Loop
    const result = await Promise.resolve('2. Результат промиса');
    
    // Этот код будет выполнен как микрозадача
    console.log(result);
    console.log('3. После await');
    
    return 'Готово';
  }
  
  // Вызов async функции
  example().then(msg => {
    console.log('4. ' + msg);
  });
  
  // Этот код выполнится до кода после await
  console.log('5. Конец основного скрипта');
  
  // Вывод:
  // Начало
  // 1. Начало async функции
  // 5. Конец основного скрипта
  // 2. Результат промиса
  // 3. После await
  // 4. Готово`
    },
    {
      question: "Объясните, как работают таймеры (setTimeout, setInterval) в JavaScript и почему они могут быть неточными",
      answer: `Таймеры (setTimeout, setInterval) в JavaScript не гарантируют точное время выполнения, они лишь откладывают выполнение колбэка на минимальное указанное время.<br><br>
      
      <strong>Как работают таймеры:</strong>
      <ol>
        <li>Когда вызывается setTimeout/setInterval, задача добавляется в "очередь таймеров"</li>
        <li>Когда указанное время истекает, колбэк добавляется в Task Queue</li>
        <li>Event Loop выполнит этот колбэк только после того, как стек вызовов опустеет и все микрозадачи будут обработаны</li>
      </ol>
      
      <strong>Причины неточности:</strong>
      <ul>
        <li>JavaScript однопоточен — длительные операции в стеке вызовов блокируют выполнение таймеров</li>
        <li>Приоритет микрозадач — промисы выполняются перед таймерами</li>
        <li>Минимальная задержка для вложенных таймеров (обычно 4мс)</li>
        <li>Троттлинг в фоновых вкладках (браузеры ограничивают таймеры до 1 раза в секунду)</li>
        <li>В Node.js — загруженность цикла событий другими операциями ввода-вывода</li>
      </ul>`,
      difficulty: "medium",
      code: `// Демонстрация неточности таймеров
  console.log('Запуск', performance.now());
  
  setTimeout(() => {
    console.log('Таймер на 100мс', performance.now());
  }, 100);
  
  // Блокируем основной поток на ~200мс
  const startTime = performance.now();
  while (performance.now() - startTime < 200) {
    // Интенсивные вычисления
  }
  
  console.log('Завершение блокировки', performance.now());
  
  // Вывод (примерно):
  // Запуск 0
  // Завершение блокировки 200
  // Таймер на 100мс 205 (сработал с задержкой)
  
  // Пример с setInterval
  let count = 0;
  const intervalId = setInterval(() => {
    count++;
    console.log('Интервал', count, performance.now());
    
    // Блокировка потока внутри колбэка
    if (count === 3) {
      const blockStart = performance.now();
      while (performance.now() - blockStart < 300) {}
      console.log('Блокировка завершена');
    }
    
    if (count >= 5) {
      clearInterval(intervalId);
    }
  }, 100);`
    },
    {
      question: "В чем отличие между process.nextTick() и setImmediate() в Node.js?",
      answer: `<strong>process.nextTick()</strong> и <strong>setImmediate()</strong> — это два механизма для планирования асинхронного выполнения в Node.js, но они работают по-разному в контексте Event Loop:<br><br>
      
      <strong>process.nextTick():</strong>
      <ul>
        <li>Выполняется <em>до</em> возвращения к Event Loop — в так называемой "nextTickQueue"</li>
        <li>Имеет приоритет над всеми другими асинхронными операциями, включая микрозадачи (Promise.then)</li>
        <li>Колбэки nextTick выполняются сразу после текущей операции, до обработки I/O</li>
        <li>Может блокировать I/O, если используется рекурсивно</li>
      </ul>
      
      <strong>setImmediate():</strong>
      <ul>
        <li>Выполняется в фазе "check" Event Loop, после фазы "poll" (I/O callbacks)</li>
        <li>Имеет меньший приоритет, чем nextTick и промисы</li>
        <li>Позволяет I/O операциям выполниться перед его колбэком</li>
        <li>В контексте I/O колбэков (например, в колбэке fs.readFile) гарантированно выполняется перед таймерами</li>
      </ul>
      
      <strong>Порядок приоритета в Node.js:</strong> nextTick → промисы → таймеры/I/O/setImmediate (зависит от фазы)`,
      difficulty: "hard",
      code: `console.log('Начало');
  
  // nextTick имеет наивысший приоритет
  process.nextTick(() => {
    console.log('nextTick 1');
  });
  
  // Промисы выполняются после nextTick
  Promise.resolve().then(() => {
    console.log('Promise 1');
  });
  
  // setTimeout в фазе timers
  setTimeout(() => {
    console.log('setTimeout');
  }, 0);
  
  // setImmediate в фазе check
  setImmediate(() => {
    console.log('setImmediate');
  });
  
  process.nextTick(() => {
    console.log('nextTick 2');
  });
  
  console.log('Конец');
  
  // Вывод:
  // Начало
  // Конец
  // nextTick 1
  // nextTick 2
  // Promise 1
  // setTimeout (или setImmediate, может меняться)
  // setImmediate (или setTimeout, может меняться)`
    },
    {
      question: "Как Event Loop взаимодействует с рендерингом в браузере? Что такое requestAnimationFrame?",
      answer: `Event Loop в браузере отвечает за координацию выполнения JavaScript, обработку пользовательских событий и обновление UI. Рендеринг UI происходит между итерациями Event Loop.<br><br>
      
      <strong>Типичный порядок работы:</strong>
      <ol>
        <li>Выполнение задач из стека вызовов</li>
        <li>Выполнение всех микрозадач (Promise.then и т.д.)</li>
        <li>Выполнение колбэков requestAnimationFrame</li>
        <li>Рендеринг UI (если необходимо)</li>
        <li>Выполнение одной задачи из Task Queue</li>
        <li>И снова с начала</li>
      </ol>
      
      <strong>requestAnimationFrame</strong> — это API для планирования анимаций. Его особенности:
      <ul>
        <li>Колбэки выполняются непосредственно перед рендерингом, обеспечивая плавную анимацию</li>
        <li>Синхронизируется с частотой обновления экрана (обычно 60fps)</li>
        <li>Не выполняется в фоновых вкладках</li>
        <li>Предоставляет временную метку для точной анимации</li>
        <li>Более эффективен, чем setInterval для анимаций</li>
      </ul>`,
      difficulty: "hard",
      code: `// Пример простой анимации с requestAnimationFrame
  const element = document.getElementById('animated-box');
  let start = null;
  const duration = 2000; // 2 секунды
  
  function animate(timestamp) {
    if (!start) start = timestamp;
    
    // Вычисляем прогресс анимации (от 0 до 1)
    const progress = Math.min((timestamp - start) / duration, 1);
    
    // Перемещаем элемент
    const distance = progress * 300; // 300px
    element.style.transform = \`translateX(\${distance}px)\`;
    
    // Продолжаем анимацию, если не завершена
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  // Запускаем анимацию
  requestAnimationFrame(animate);
  
  // Пример блокировки рендеринга длительной операцией
  function blockRenderingBadPractice() {
    const startTime = performance.now();
    while (performance.now() - startTime < 200) {
      // Блокирует Event Loop на 200мс
      // Анимации будут дергаться!
    }
  }
  
  // Лучший подход - разбить работу на части
  function nonBlockingProcessing(data, chunkIndex = 0, chunkSize = 1000) {
    const chunk = data.slice(chunkIndex, chunkIndex + chunkSize);
    processChunk(chunk);
    
    if (chunkIndex + chunkSize < data.length) {
      // Планируем обработку следующей части на следующий фрейм
      requestAnimationFrame(() => {
        nonBlockingProcessing(data, chunkIndex + chunkSize, chunkSize);
      });
    }
  }`
    },
    {
      question: "В чем особенности работы Event Loop в Nuxt.js?",
      answer: `В Nuxt.js взаимодействие с Event Loop имеет свои особенности, связанные с SSR (серверным рендерингом) и универсальным (isomorphic) кодом:<br><br>
      
      <strong>Основные особенности:</strong>
      <ul>
        <li>Код выполняется как на сервере (Node.js Event Loop), так и на клиенте (браузерный Event Loop)</li>
        <li>Хуки жизненного цикла выполняются в разных средах и по-разному взаимодействуют с Event Loop</li>
        <li>Асинхронная загрузка данных на сервере блокирует отправку HTML клиенту</li>
        <li>Асинхронные операции запланированные на сервере не переносятся на клиент</li>
      <li>Асинхронные операции, запланированные на сервере, не переносятся на клиент</li>
        <li>Хуки asyncData и fetch блокируют рендеринг на сервере до их завершения</li>
        <li>В режиме SPA весь Event Loop контролируется только браузером</li>
        <li>При статической генерации асинхронные операции выполняются один раз при сборке</li>
      </ul>
      
      <strong>Порядок выполнения:</strong>
      <ol>
        <li>Серверный Event Loop (Node.js): nuxtServerInit, middleware, asyncData, fetch, beforeCreate, created</li>
        <li>Генерация и отправка HTML</li>
        <li>Клиентский Event Loop (браузер): beforeCreate, created, beforeMount, mounted</li>
        <li>Клиентская навигация: снова middleware, asyncData, fetch, и т.д.</li>
      </ol>
      
      <strong>Сложности и возможные проблемы:</strong>
      <ul>
        <li>Окружение исполнения (process.client/process.server) нужно проверять перед использованием API</li>
        <li>Таймеры и интервалы, установленные на сервере, не имеют смысла для клиента</li>
        <li>Тяжелые вычисления в серверных хуках могут замедлить рендеринг для всех посетителей</li>
        <li>Асинхронные операции должны завершаться правильно для избежания утечек памяти</li>
      </ul>`,
      difficulty: "hard",
      code: `// Пример компонента Nuxt с учетом Event Loop
  export default {
    // Будет блокировать рендеринг на сервере до завершения
    async asyncData({ $axios, params }) {
      const data = await $axios.$get(\`/api/posts/\${params.id}\`);
      return { post: data };
    },
    
    data() {
      return {
        clientSideData: null,
        intervalId: null
      };
    },
    
    // Выполняется и на сервере, и на клиенте
    created() {
      console.log(\`Выполняется на \${process.client ? 'клиенте' : 'сервере'}\`);
      
      // Безопасное использование API специфичных для окружения
      if (process.client) {
        this.loadClientSideData();
      }
    },
    
    // Только на клиенте
    mounted() {
      // Безопасно использовать браузерные API и таймеры
      this.intervalId = setInterval(() => {
        this.checkForUpdates();
      }, 30000);
    },
    
    beforeDestroy() {
      // Очистка ресурсов
      if (process.client && this.intervalId) {
        clearInterval(this.intervalId);
      }
    },
    
    methods: {
      async loadClientSideData() {
        // Выполняется только на клиенте
        try {
          const response = await fetch('/api/client-data');
          this.clientSideData = await response.json();
        } catch (error) {
          console.error(error);
        }
      }
    }
  }`
    },
    {
      question: "Как предотвратить блокировку Event Loop длительными операциями?",
      answer: `Блокировка Event Loop длительными операциями может привести к "зависанию" интерфейса или задержке обработки запросов. Вот методы предотвращения:<br><br>
      
      <strong>В браузере:</strong>
      <ul>
        <li><strong>Разбиение задач:</strong> разделите тяжелые вычисления на небольшие части и используйте setTimeout или requestAnimationFrame для планирования каждой части</li>
        <li><strong>Web Workers:</strong> выполняйте тяжелые вычисления в отдельном потоке, не блокируя основной поток UI</li>
        <li><strong>Асинхронные методы:</strong> используйте асинхронные API как fetch вместо синхронных аналогов</li>
        <li><strong>Виртуализация списков:</strong> рендерите только видимые элементы больших списков</li>
        <li><strong>Отложенная загрузка:</strong> загружайте тяжелые компоненты по мере необходимости</li>
      </ul>
      
      <strong>В Node.js:</strong>
      <ul>
        <li><strong>Асинхронные API:</strong> используйте асинхронные версии вместо синхронных (fs.readFile вместо fs.readFileSync)</li>
        <li><strong>Worker Threads:</strong> выполняйте CPU-интенсивные операции в отдельных потоках</li>
        <li><strong>Группировка задач:</strong> используйте setImmediate для планирования работы без блокировки Event Loop</li>
        <li><strong>Потоковая обработка (Streams):</strong> обрабатывайте большие объемы данных кусками</li>
        <li><strong>Кластеризация:</strong> распределяйте нагрузку между несколькими процессами Node.js</li>
      </ul>`,
      difficulty: "medium",
      code: `// Пример разбиения тяжелых вычислений в браузере
  function processLargeArray(array, batchSize = 1000) {
    let index = 0;
    
    function processNextBatch() {
      // Обрабатываем часть массива
      const end = Math.min(index + batchSize, array.length);
      
      for (let i = index; i < end; i++) {
        // Выполняем работу над элементом
        array[i] = heavyTransformation(array[i]);
      }
      
      index = end;
      
      // Показываем прогресс
      updateProgressUI(index / array.length);
      
      // Если обработка не закончена, планируем следующую часть
      if (index < array.length) {
        setTimeout(processNextBatch, 0);
      } else {
        finishProcessing(array);
      }
    }
    
    // Начинаем обработку
    processNextBatch();
  }
  
  // Пример использования Web Worker
  // main.js
  const worker = new Worker('worker.js');
  
  worker.addEventListener('message', (event) => {
    console.log('Получен результат от Worker:', event.data);
    updateUI(event.data);
  });
  
  // Отправляем тяжелую задачу в Worker
  worker.postMessage({
    data: largeDataset,
    operation: 'process'
  });
  
  // worker.js
  self.addEventListener('message', (event) => {
    const { data, operation } = event.data;
    
    if (operation === 'process') {
      // Выполняем тяжелые вычисления
      const result = processLargeDataset(data);
      
      // Отправляем результат обратно
      self.postMessage(result);
    }
  });
  
  // Node.js Worker Threads пример
  const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
  
  if (isMainThread) {
    // Главный поток
    const worker = new Worker(__filename, {
      workerData: { data: largeDataset }
    });
    
    worker.on('message', (result) => {
      console.log('Результат от Worker:', result);
    });
  } else {
    // Worker поток
    const { data } = workerData;
    
    // Выполняем тяжелые вычисления
    const result = processData(data);
    
    // Отправляем результат в главный поток
    parentPort.postMessage(result);
  }`
    }
  ];
  
  const difficultyLevels = ['all', 'easy', 'medium', 'hard'];
  const currentDifficulty = ref('all');
  const expandedQuestions = ref([]);
  
  // Отфильтровать вопросы по сложности
  function filterQuestions(difficulty) {
    currentDifficulty.value = difficulty;
  }
  
  // Фильтрованные вопросы для отображения
  const filteredQuestions = computed(() => {
    if (currentDifficulty.value === 'all') {
      return interviewQuestions;
    }
    return interviewQuestions.filter(q => q.difficulty === currentDifficulty.value);
  });
  
  // Переключение отображения ответа на вопрос
  function toggleQuestion(index) {
    const idx = expandedQuestions.value.indexOf(index);
    if (idx !== -1) {
      expandedQuestions.value.splice(idx, 1);
    } else {
      expandedQuestions.value.push(index);
    }
  }
  
  // Переключение текущей вкладки
  function setCurrentTab(tabId) {
    currentTab.value = tabId;
  }
  </script>

<style scoped>
/* Основные стили компонента */
.event-loop-explorer {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', Arial, sans-serif;
  color: #333;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
}

.main-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2.2rem;
}

/* Навигация по вкладкам */
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
  justify-content: center;
  position: sticky;
  top: 0;
  background-color: #f8f9fa;
  padding: 10px 0;
  z-index: 100;
  border-bottom: 1px solid #e9ecef;
}

.tabs button {
  padding: 12px 20px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
  color: #495057;
}

.tabs button:hover {
  background-color: #e9ecef;
  transform: translateY(-2px);
}

.tabs button.active {
  background-color: #3498db;
  color: white;
  border-color: #3498db;
  box-shadow: 0 4px 10px rgba(52, 152, 219, 0.2);
}

/* Содержимое вкладок */
.tab-content {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.5s ease;
}

.tab-content h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.8rem;
  border-bottom: 2px solid #f8f9fa;
  padding-bottom: 10px;
}

/* Стили для анимации Event Loop */
.intro-visualization {
  margin: 30px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
}

.event-loop-diagram {
  display: grid;
  grid-template-columns: 1fr 200px 1fr;
  gap: 15px;
  margin-bottom: 20px;
  min-height: 300px;
}

.call-stack {
  border: 2px solid #3498db;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  display: flex;
  flex-direction: column;
}

.stack-title, .queue-title {
  background: #3498db;
  color: white;
  padding: 10px;
  text-align: center;
  font-weight: bold;
}

.stack-items, .queue-items {
  flex: 1;
  padding: 10px;
  min-height: 200px;
  display: flex;
  flex-direction: column-reverse;
}

.stack-item, .queue-item {
  padding: 8px;
  margin: 5px 0;
  background: #e1f5fe;
  border-radius: 4px;
  text-align: center;
  transition: all 0.3s;
}

.stack-item {
  animation: slideInDown 0.3s ease;
}

.queue-item {
  animation: slideInLeft 0.3s ease;
}

.queue-item.micro {
  background: #f8bbd0;
}

.event-loop-core {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loop {
  width: 100px;
  height: 100px;
  border: 10px solid #e9ecef;
  border-top: 10px solid #3498db;
  border-radius: 50%;
  transition: all 0.5s;
}

.loop.looping {
  animation: rotate 2s linear infinite;
}

.event-queues {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.queue {
  border: 2px solid #9c27b0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.queue:first-child {
  border-color: #ff9800;
}

.queue:first-child .queue-title {
  background: #ff9800;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.controls button {
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.controls button:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.controls button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

/* Секции с объяснениями */
.explanation {
  margin: 30px 0;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.explanation h3 {
  color: #3498db;
  margin-bottom: 15px;
  font-size: 1.4rem;
}

.explanation ul, .explanation ol {
  padding-left: 25px;
  margin-bottom: 15px;
}

.explanation li {
  margin-bottom: 10px;
  line-height: 1.6;
}

/* Концепции и примеры кода */
.concept {
  margin: 40px 0;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
}

.concept h3 {
  padding: 15px 20px;
  margin: 0;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  font-size: 1.4rem;
  color: #2c3e50;
}

.concept-content {
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.concept-explanation p {
  margin-bottom: 15px;
  line-height: 1.6;
}

.concept-explanation ul {
  padding-left: 20px;
}

.concept-explanation li {
  margin-bottom: 8px;
  line-height: 1.5;
}

.code-example {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
}

.code-example pre {
  margin: 0;
  padding: 15px;
  background: #2d2d2d;
  color: #f8f8f2;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.5;
}

/* Демонстрация стека вызовов */
.interactive-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}

.stack-visualization {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.stack-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stack-label {
  font-weight: bold;
  color: #3498db;
}

.stack {
  border: 2px solid #3498db;
  border-radius: 8px;
  min-height: 250px;
  padding: 10px;
  display: flex;
  flex-direction: column-reverse;
  background: white;
}

.stack-frame {
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  text-align: center;
  font-family: monospace;
  color: white;
  font-weight: bold;
  transition: all 0.3s;
}

.stack-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.stack-controls button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background: #3498db;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.stack-controls button:hover {
  background: #2980b9;
}

.stack-controls button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.code-context {
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

/* Демонстрация очередей */
.tables-container {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.table {
  flex: 1;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.table h4 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #2c3e50;
  text-align: center;
}

.key-differences {
  padding: 15px;
  background: #e8f4f8;
  border-radius: 8px;
  margin: 20px 0;
}

.key-differences h4 {
  margin-top: 0;
  color: #2c3e50;
}

.queue-demo {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.console-output {
  background: #2d2d2d;
  padding: 15px;
  border-radius: 8px;
  color: #f8f8f2;
}

.console-header {
  color: #9e9e9e;
  margin-bottom: 10px;
  font-family: monospace;
}

.console-output pre {
  margin: 0;
  font-family: monospace;
  line-height: 1.5;
}

.queue-demo-controls {
  display: flex;
  gap: 10px;
}

.queue-demo-controls button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background: #3498db;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.queue-demo-controls button:hover {
  background: #2980b9;
}

.queue-demo-controls button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.explanation-note {
  margin-top: 15px;
  padding: 10px;
  background: #e8f4f8;
  border-radius: 4px;
  font-size: 0.9rem;
}

/* Сравнение Node.js и браузера */
.environment-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

.environment {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
}

.environment h3 {
  text-align: center;
  margin-top: 0;
  color: #2c3e50;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 10px;
}

.environment-diagram {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.diagram-image {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.environment-explanation h4 {
  color: #3498db;
  margin-bottom: 10px;
}

.practical-differences {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.comparison-table th, .comparison-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #e9ecef;
}

.comparison-table th {
  background: #f8f9fa;
  color: #2c3e50;
  font-weight: bold;
}

.comparison-table tr:nth-child(even) {
  background: #f8f9fa;
}

.code-examples {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

/* Nuxt-специфичные стили */
.scenario-tabs {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.scenario-tab {
  padding: 10px 15px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.scenario-tab:hover {
  background: #e9ecef;
}

.scenario-tab.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.scenario-content {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 20px;
  animation: fadeIn 0.5s;
}

.scenario-content h4 {
  margin-top: 0;
  color: #2c3e50;
  margin-bottom: 15px;
}

.nuxt-lifecycle-diagram {
  text-align: center;
  margin: 20px 0;
}

.lifecycle-image {
  max-width: 90%;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.problems-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.problem-card {
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.problem-card h4 {
  color: #e74c3c;
  margin-top: 0;
  margin-bottom: 10px;
}

.solution {
  margin-top: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #3498db;
}

.solution h5 {
  color: #3498db;
  margin-top: 0;
  margin-bottom: 10px;
}

/* Вопросы для собеседования */
.questions-container {
  padding: 20px;
}

.difficulty-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.difficulty-filters button {
  padding: 8px 15px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.difficulty-filters button:hover {
  background: #e9ecef;
}

.difficulty-filters button.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.question-card {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.question-card.easy {
  border-left: 5px solid #2ecc71;
}

.question-card.medium {
  border-left: 5px solid #f39c12;
}

.question-card.hard {
  border-left: 5px solid #e74c3c;
}

.question-header {
  padding: 15px 20px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s;
}

.question-header:hover {
  background: #e9ecef;
}

.question-title {
  flex: 1;
  font-weight: 500;
}

.difficulty-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-right: 15px;
  font-weight: bold;
  color: white;
}

.easy .difficulty-badge {
  background: #2ecc71;
}

.medium .difficulty-badge {
  background: #f39c12;
}

.hard .difficulty-badge {
  background: #e74c3c;
}

.question-toggle {
  font-size: 1.5rem;
  color: #7f8c8d;
  width: 24px;
  text-align: center;
}

.question-content {
  padding: 20px;
  animation: fadeIn 0.5s;
}

.question-answer h4, .question-code h4, .follow-up-questions h4 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 15px;
}

.question-code {
  margin: 20px 0;
}

.follow-up-questions ul {
  padding-left: 20px;
}

.follow-up-questions li {
  margin-bottom: 8px;
}

/* Анимации */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInDown {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideInLeft {
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Медиа-запросы для адаптивности */
@media (max-width: 992px) {
  .concept-content {
    grid-template-columns: 1fr;
  }
  
  .environment-comparison {
    grid-template-columns: 1fr;
  }
  
  .event-loop-diagram {
    grid-template-columns: 1fr;
  }
  
  .code-examples {
    grid-template-columns: 1fr;
  }
  
  .interactive-demo {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .problems-grid {
    grid-template-columns: 1fr;
  }
  
  .tables-container {
    flex-direction: column;
  }
}

@media (max-width: 576px) {
  .tabs button {
    font-size: 0.8rem;
    padding: 8px 12px;
  }
  
  .main-title {
    font-size: 1.8rem;
  }
  
  .controls {
    flex-direction: column;
  }
  
  .stack-controls button {
    font-size: 0.8rem;
  }
}
</style>