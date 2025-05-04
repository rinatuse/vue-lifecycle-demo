<template>
    <div class="event-loop-explainer">
      <h1>Объяснение работы Event Loop в JavaScript</h1>
      
      <div class="intro-section">
        <p>Этот компонент демонстрирует, как JavaScript обрабатывает синхронный и асинхронный код, используя Event Loop, Call Stack, Callback Queues и другие механизмы среды выполнения.</p>
        
        <div class="code-example">
          <h2>Рассмотрим следующий код:</h2>
          <pre class="code-block">
  console.log(1);
  
  setTimeout(() => console.log(2));
  
  Promise.resolve().then(() => console.log(3));
  
  Promise.resolve().then(() => setTimeout(() => console.log(4)));
  
  Promise.resolve().then(() => console.log(5));
  
  setTimeout(() => console.log(6));
  
  console.log(7);</pre>
          <p class="question">В каком порядке выведутся числа в консоль?</p>
        </div>
      </div>
  
      <div class="controls">
        <button @click="startExplanation" :disabled="isPlaying" class="control-btn start-btn">
          {{ hasStarted ? 'Перезапустить' : 'Начать объяснение' }}
        </button>
        <button @click="stepExplanation" :disabled="isPlaying || !hasStarted || currentStep >= totalSteps" class="control-btn step-btn">
          Следующий шаг
        </button>
        <div class="progress">
          <div class="progress-label">Прогресс: {{ currentStep }} / {{ totalSteps }}</div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${(currentStep / totalSteps) * 100}%` }"></div>
          </div>
        </div>
      </div>
  
      <div class="visualization">
        <div class="main-thread">
          <h3>Основной поток (Main Thread)</h3>
          <div class="call-stack">
            <h4>Call Stack</h4>
            <div class="stack-container">
              <div v-for="(item, index) in callStack" :key="`stack-${index}`" class="stack-item" :class="{ 'executing': item.executing }">
                {{ item.name }}
              </div>
              <div v-if="callStack.length === 0" class="empty-stack">Пусто</div>
            </div>
          </div>
          
          <div class="code-execution">
            <h4>Код</h4>
            <div class="code-lines">
              <div v-for="(line, index) in codeLines" :key="`line-${index}`" class="code-line" :class="{ 
                'executed': line.executed, 
                'current': line.current,
                'queued': line.queued,
                'microtask-queued': line.microtaskQueued,
                'macrotask-queued': line.macrotaskQueued
              }">
                <span class="line-number">{{ index + 1 }}</span>
                <span class="line-content">{{ line.content }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="event-loop-container">
          <div class="event-loop" :class="{ 'spinning': isLoopActive }">
            <div class="loop-circle"></div>
            <div class="loop-label">Event Loop</div>
          </div>
          <div class="loop-phase" v-if="loopPhase">{{ loopPhase }}</div>
        </div>
  
        <div class="queues">
          <div class="microtask-queue">
            <h4>Microtask Queue (Promise)</h4>
            <div class="queue-container">
              <div v-for="(task, index) in microtaskQueue" :key="`micro-${index}`" class="queue-item microtask">
                {{ task.name }}
              </div>
              <div v-if="microtaskQueue.length === 0" class="empty-queue">Пусто</div>
            </div>
          </div>
          
          <div class="macrotask-queue">
            <h4>Macrotask Queue (setTimeout)</h4>
            <div class="queue-container">
              <div v-for="(task, index) in macrotaskQueue" :key="`macro-${index}`" class="queue-item macrotask">
                {{ task.name }}
              </div>
              <div v-if="macrotaskQueue.length === 0" class="empty-queue">Пусто</div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="console-output">
        <h3>Консоль</h3>
        <div class="console-container">
          <div v-for="(log, index) in consoleOutput" :key="`log-${index}`" class="console-log" :class="{ 'new-log': log.new }">
            > {{ log.content }}
          </div>
          <div v-if="consoleOutput.length === 0" class="empty-console">Консоль пуста</div>
        </div>
      </div>
  
      <div class="explanation-panel">
        <h3>Объяснение</h3>
        <div class="explanation-container">
          <div class="explanation-text">{{ currentExplanation }}</div>
        </div>
      </div>
  
      <div class="summary-section" v-if="isCompleted">
        <h3>Итоговый порядок вывода: {{ finalOutput.join(', ') }}</h3>
        <div class="summary-content">
          <h4>Ключевые концепции Event Loop</h4>
          <ul>
            <li><strong>Call Stack</strong> — структура данных, которая отслеживает выполнение функций. Когда функция вызывается, она помещается в стек; когда функция завершается, она удаляется из стека.</li>
            <li><strong>Microtask Queue</strong> — очередь для микрозадач (promises, queueMicrotask, MutationObserver). Они выполняются после текущей задачи, но до рендеринга и до следующей макрозадачи.</li>
            <li><strong>Macrotask Queue</strong> — очередь для макрозадач (setTimeout, setInterval, events). Они выполняются после завершения всех микрозадач.</li>
            <li><strong>Event Loop</strong> — механизм, который постоянно проверяет Call Stack и очереди задач. Когда стек пуст, он берет задачи из очередей и помещает их в стек для выполнения.</li>
          </ul>
          
          <h4>Алгоритм работы Event Loop</h4>
          <ol>
            <li>Выполнить весь синхронный код (все, что находится в Call Stack)</li>
            <li>Проверить Microtask Queue. Если есть задачи, выполнить все до последней</li>
            <li>Выполнить одну задачу из Macrotask Queue</li>
            <li>Вернуться к шагу 2 (проверка microtasks)</li>
            <li>Повторять бесконечно</li>
          </ol>
          
          <h4>Практическое применение</h4>
          <ul>
            <li><strong>Оптимизация производительности</strong> — понимание Event Loop помогает писать код, который не блокирует UI</li>
            <li><strong>Отладка асинхронного кода</strong> — при непонятном поведении асинхронного кода знание Event Loop помогает выявить проблему</li>
            <li><strong>Правильное использование Promise.then() vs setTimeout</strong> — когда нужно выполнить что-то СРАЗУ после текущей операции, используйте Promise (microtask)</li>
            <li><strong>Управление порядком выполнения</strong> — используйте знание очередей задач для контроля порядка выполнения</li>
            <li><strong>Избегание Race Conditions</strong> — понимание Event Loop помогает предсказать и избежать гонок данных</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        hasStarted: false,
        isPlaying: false,
        isLoopActive: false,
        isCompleted: false,
        currentStep: 0,
        totalSteps: 36, // Увеличено для полного цикла
        callStack: [],
        microtaskQueue: [],
        macrotaskQueue: [],
        consoleOutput: [],
        finalOutput: [],
        loopPhase: '',
        currentExplanation: 'Нажмите "Начать объяснение", чтобы увидеть, как JavaScript Engine выполняет этот код.',
        
        codeLines: [
          { content: 'console.log(1);', executed: false, current: false, queued: false },
          { content: '', executed: false, current: false, queued: false },
          { content: 'setTimeout(() => console.log(2));', executed: false, current: false, queued: false },
          { content: '', executed: false, current: false, queued: false },
          { content: 'Promise.resolve().then(() => console.log(3));', executed: false, current: false, queued: false },
          { content: '', executed: false, current: false, queued: false },
          { content: 'Promise.resolve().then(() => setTimeout(() => console.log(4)));', executed: false, current: false, queued: false },
          { content: '', executed: false, current: false, queued: false },
          { content: 'Promise.resolve().then(() => console.log(5));', executed: false, current: false, queued: false },
          { content: '', executed: false, current: false, queued: false },
          { content: 'setTimeout(() => console.log(6));', executed: false, current: false, queued: false },
          { content: '', executed: false, current: false, queued: false },
          { content: 'console.log(7);', executed: false, current: false, queued: false }
        ],
        
        explanations: [
          // Синхронный код - первая фаза
          'Исполнение начинается. JavaScript выполняет синхронный код последовательно, сверху вниз.',
          
          'Встречаем console.log(1). Это синхронная операция, которая сразу выполняется.',
          'console.log(1) помещается в Call Stack и выполняется.',
          'В консоль выводится число 1. console.log(1) удаляется из Call Stack.',
          
          'Встречаем setTimeout(() => console.log(2)). setTimeout - это асинхронная операция.',
          'Функция setTimeout() помещается в Call Stack и выполняется.',
          'Web API регистрирует callback setTimeout. setTimeout() удаляется из Call Stack.',
          'Callback setTimeout (() => console.log(2)) помещается в Macrotask Queue (после таймера).',
          
          'Встречаем Promise.resolve().then(() => console.log(3)). Promise.resolve() создает завершенный Promise.',
          'Promise.resolve().then() помещается в Call Stack и выполняется.',
          'Callback Promise.then (() => console.log(3)) помещается в Microtask Queue.',
          
          'Встречаем Promise.resolve().then(() => setTimeout(() => console.log(4))).',
          'Promise.resolve().then() помещается в Call Stack и выполняется.',
          'Callback Promise.then (() => setTimeout(...)) помещается в Microtask Queue.',
          
          'Встречаем Promise.resolve().then(() => console.log(5)).',
          'Promise.resolve().then() помещается в Call Stack и выполняется.',
          'Callback Promise.then (() => console.log(5)) помещается в Microtask Queue.',
          
          'Встречаем setTimeout(() => console.log(6)). setTimeout - это асинхронная операция.',
          'Функция setTimeout() помещается в Call Stack и выполняется.',
          'Callback setTimeout (() => console.log(6)) помещается в Macrotask Queue.',
          
          'Встречаем console.log(7). Это синхронная операция, которая сразу выполняется.',
          'console.log(7) помещается в Call Stack и выполняется.',
          'В консоль выводится число 7. console.log(7) удаляется из Call Stack.',
          
          'Основной синхронный код выполнен. Call Stack пуст. Теперь Event Loop проверяет очереди задач.',
          
          // Микрозадачи - вторая фаза
          'Event Loop сначала проверяет Microtask Queue и видит там три задачи.',
          'Event Loop берет первую микрозадачу из очереди и помещает ее в Call Stack.',
          'Выполняется callback: console.log(3).',
          'В консоль выводится число 3. Задача удаляется из Call Stack.',
          
          'Event Loop берет следующую микрозадачу из очереди и помещает ее в Call Stack.',
          'Выполняется callback: setTimeout(() => console.log(4)).',
          'setTimeout() регистрирует новый callback, который добавляется в Macrotask Queue.',
          'Задача удаляется из Call Stack.',
          
          'Event Loop берет последнюю микрозадачу из очереди и помещает ее в Call Stack.',
          'Выполняется callback: console.log(5).',
          'В консоль выводится число 5. Задача удаляется из Call Stack.',
          
          // Макрозадачи - третья фаза
          'Все микрозадачи обработаны. Microtask Queue пуста. Event Loop переходит к Macrotask Queue.',
          'Event Loop берет первую макрозадачу из очереди и помещает ее в Call Stack.',
          'Выполняется callback: console.log(2).',
          'В консоль выводится число 2. Задача удаляется из Call Stack.',
          
          'Event Loop проверяет Microtask Queue - она пуста. Переходим к следующей макрозадаче.',
          'Event Loop берет следующую макрозадачу из очереди и помещает ее в Call Stack.',
          'Выполняется callback: console.log(6).',
          'В консоль выводится число 6. Задача удаляется из Call Stack.',
          
          'Event Loop проверяет Microtask Queue - она пуста. Переходим к следующей макрозадаче.',
          'Event Loop берет последнюю макрозадачу из очереди и помещает ее в Call Stack.',
          'Выполняется callback: console.log(4).',
          'В консоль выводится число 4. Задача удаляется из Call Stack.',
          
          'Все задачи выполнены. Итоговый порядок вывода: 1, 7, 3, 5, 2, 6, 4.'
        ]
      }
    },
    methods: {
      startExplanation() {
        this.resetState();
        this.hasStarted = true;
        this.stepExplanation();
      },
      
      resetState() {
        this.currentStep = 0;
        this.callStack = [];
        this.microtaskQueue = [];
        this.macrotaskQueue = [];
        this.consoleOutput = [];
        this.finalOutput = [];
        this.isPlaying = false;
        this.isLoopActive = false;
        this.isCompleted = false;
        this.loopPhase = '';
        
        // Сбрасываем состояние кода
        this.codeLines.forEach(line => {
          line.executed = false;
          line.current = false;
          line.queued = false;
          line.microtaskQueued = false;
          line.macrotaskQueued = false;
        });
        
        this.currentExplanation = 'Нажмите "Начать объяснение", чтобы увидеть, как JavaScript Engine выполняет этот код.';
      },
      
      stepExplanation() {
        if (this.currentStep >= this.totalSteps) {
          this.isCompleted = true;
          return;
        }
        
        this.isPlaying = true;
        
        // Обновляем текст объяснения
        this.currentExplanation = this.explanations[this.currentStep] || '';
        
        // Логика для каждого шага
        switch (this.currentStep) {
          case 0: // Начало исполнения
            {
              this.isLoopActive = true;
              this.loopPhase = 'Выполнение синхронного кода';
              this.codeLines[0].current = true;
            }
            break;
            
          case 1: // console.log(1)
            {
              this.codeLines[0].current = false;
              this.codeLines[0].executed = true;
              this.callStack.unshift({ name: 'console.log(1)', executing: true });
            }
            break;
            
          case 2: // Выполнение console.log(1)
            {
              this.callStack[0].executing = false;
            }
            break;
            
          case 3: // Вывод 1 в консоль
            {
              this.consoleOutput.push({ content: '1', new: true });
              this.finalOutput.push('1');
              this.callStack = [];
              this.codeLines[2].current = true;
              
              // Сбрасываем флаг new у предыдущих логов
              setTimeout(() => {
                this.consoleOutput.forEach(log => log.new = false);
              }, 1000);
            }
            break;
            
          case 4: // setTimeout(() => console.log(2))
            {
              this.codeLines[2].current = false;
              this.codeLines[2].executed = true;
              this.callStack.unshift({ name: 'setTimeout(() => console.log(2))', executing: true });
            }
            break;
            
          case 5: // Выполнение setTimeout
            {
              this.callStack[0].executing = false;
            }
            break;
            
          case 6: // Регистрация callback setTimeout
            {
              this.callStack = [];
              this.codeLines[2].macrotaskQueued = true;
              this.macrotaskQueue.push({ name: '() => console.log(2)' });
              this.codeLines[4].current = true;
            }
            break;
            
          case 7: // Promise.resolve().then(() => console.log(3))
            {
              this.codeLines[4].current = false;
              this.codeLines[4].executed = true;
              this.callStack.unshift({ name: 'Promise.resolve().then(...)', executing: true });
            }
            break;
            
          case 8: // Добавление callback Promise в Microtask Queue
            {
              this.callStack = [];
              this.codeLines[4].microtaskQueued = true;
              this.microtaskQueue.push({ name: '() => console.log(3)' });
              this.codeLines[6].current = true;
            }
            break;
            
          case 9: // Promise с setTimeout внутри
            {
              this.codeLines[6].current = false;
              this.codeLines[6].executed = true;
              this.callStack.unshift({ name: 'Promise.resolve().then(...)', executing: true });
            }
            break;
            
          case 10: // Добавление callback Promise с setTimeout в Microtask Queue
            {
              this.callStack = [];
              this.codeLines[6].microtaskQueued = true;
              this.microtaskQueue.push({ name: '() => setTimeout(() => console.log(4))' });
              this.codeLines[8].current = true;
            }
            break;
            
          case 11: // Еще один Promise.then
            {
              this.codeLines[8].current = false;
              this.codeLines[8].executed = true;
              this.callStack.unshift({ name: 'Promise.resolve().then(...)', executing: true });
            }
            break;
            
          case 12: // Добавление еще одного callback в Microtask Queue
            {
              this.callStack = [];
              this.codeLines[8].microtaskQueued = true;
              this.microtaskQueue.push({ name: '() => console.log(5)' });
              this.codeLines[10].current = true;
            }
            break;
            
          case 13: // setTimeout(() => console.log(6))
            {
              this.codeLines[10].current = false;
              this.codeLines[10].executed = true;
              this.callStack.unshift({ name: 'setTimeout(() => console.log(6))', executing: true });
            }
            break;
            
          case 14: // Добавление callback setTimeout в Macrotask Queue
            {
              this.callStack = [];
              this.codeLines[10].macrotaskQueued = true;
              this.macrotaskQueue.push({ name: '() => console.log(6)' });
              this.codeLines[12].current = true;
            }
            break;
            
          case 15: // console.log(7)
            {
              this.codeLines[12].current = false;
              this.codeLines[12].executed = true;
              this.callStack.unshift({ name: 'console.log(7)', executing: true });
            }
            break;
            
          case 16: // Вывод 7 в консоль
            {
              this.consoleOutput.push({ content: '7', new: true });
              this.finalOutput.push('7');
              this.callStack = [];
              
              // Сбрасываем флаг new у предыдущих логов
              setTimeout(() => {
                this.consoleOutput.forEach(log => log.new = false);
              }, 1000);
            }
            break;
            
          case 17: // Начало обработки очередей задач
            {
              this.loopPhase = 'Проверка Microtask Queue';
            }
            break;
          
          case 18: // Проверка микрозадач
            {
              // Этот шаг только для анимации проверки микрозадач
            }
            break;
            
          case 19: // Взятие первой микрозадачи
            {
              const firstMicrotask = this.microtaskQueue[0]; // Просто берем первую задачу без удаления
              this.callStack.unshift({ name: firstMicrotask.name, executing: true });
            }
            break;
            
          case 20: // Выполнение console.log(3)
            {
              this.microtaskQueue.shift(); // Теперь удаляем задачу из очереди
              this.consoleOutput.push({ content: '3', new: true });
              this.finalOutput.push('3');
              this.callStack = [];
              
              // Сбрасываем флаг new у предыдущих логов
              setTimeout(() => {
                this.consoleOutput.forEach(log => log.new = false);
              }, 1000);
            }
            break;
            
          case 21: // Взятие второй микрозадачи
            {
              const secondMicrotask = this.microtaskQueue[0];
              this.callStack.unshift({ name: secondMicrotask.name, executing: true });
            }
            break;
            
          case 22: // Выполнение setTimeout внутри Promise
            {
              this.microtaskQueue.shift();
              // Добавляем новую макрозадачу для console.log(4)
              this.macrotaskQueue.push({ name: '() => console.log(4)' });
              this.callStack = [];
            }
            break;
            
          case 23: // Взятие третьей микрозадачи
            {
              const thirdMicrotask = this.microtaskQueue[0];
              this.callStack.unshift({ name: thirdMicrotask.name, executing: true });
            }
            break;
            
          case 24: // Выполнение console.log(5)
            {
              this.microtaskQueue.shift();
              this.consoleOutput.push({ content: '5', new: true });
              this.finalOutput.push('5');
              this.callStack = [];
              
              // Сбрасываем флаг new у предыдущих логов
              setTimeout(() => {
                this.consoleOutput.forEach(log => log.new = false);
              }, 1000);
            }
            break;
            
          case 25: // Переход к макрозадачам
            {
              this.loopPhase = 'Проверка Macrotask Queue';
            }
            break;
            
          case 26: // Взятие первой макрозадачи
            {
              const firstMacrotask = this.macrotaskQueue[0];
              this.callStack.unshift({ name: firstMacrotask.name, executing: true });
            }
            break;
            
          case 27: // Выполнение console.log(2)
            {
              this.macrotaskQueue.shift();
              this.consoleOutput.push({ content: '2', new: true });
              this.finalOutput.push('2');
              this.callStack = [];
              
              // Сбрасываем флаг new у предыдущих логов
              setTimeout(() => {
                this.consoleOutput.forEach(log => log.new = false);
              }, 1000);
            }
            break;
            
          case 28: // Проверка микрозадач снова (пусто)
            {
              this.loopPhase = 'Проверка Microtask Queue - пусто';
            }
            break;
            
          case 29: // Возврат к макрозадачам
            {
              this.loopPhase = 'Проверка Macrotask Queue';
            }
            break;
            
          case 30: // Взятие второй макрозадачи
            {
              const secondMacrotask = this.macrotaskQueue[0];
              this.callStack.unshift({ name: secondMacrotask.name, executing: true });
            }
            break;
            
          case 31: // Выполнение console.log(6)
            {
              this.macrotaskQueue.shift();
              this.consoleOutput.push({ content: '6', new: true });
              this.finalOutput.push('6');
              this.callStack = [];
              
              // Сбрасываем флаг new у предыдущих логов
              setTimeout(() => {
                this.consoleOutput.forEach(log => log.new = false);
              }, 1000);
            }
            break;
            
          case 32: // Проверка микрозадач снова (пусто)
            {
              this.loopPhase = 'Проверка Microtask Queue - пусто';
            }
            break;
            
          case 33: // Возврат к макрозадачам
            {
              this.loopPhase = 'Проверка Macrotask Queue';
            }
            break;
            
          case 34: // Взятие третьей макрозадачи
            {
              const thirdMacrotask = this.macrotaskQueue[0];
              this.callStack.unshift({ name: thirdMacrotask.name, executing: true });
            }
            break;
            
          case 35: // Выполнение console.log(4)
            {
              this.macrotaskQueue.shift();
              this.consoleOutput.push({ content: '4', new: true });
              this.finalOutput.push('4');
              this.callStack = [];
              
              // Сбрасываем флаг new у предыдущих логов
              setTimeout(() => {
                this.consoleOutput.forEach(log => log.new = false);
              }, 1000);
            }
            break;
            
          case 36: // Завершение
            {
              this.loopPhase = 'Все задачи выполнены';
              this.isCompleted = true;
            }
            break;
        }
        
        // Увеличиваем счетчик шагов
        this.currentStep++;
        
        // Через небольшую задержку снимаем флаг isPlaying
        setTimeout(() => {
          this.isPlaying = false;
        }, 700);
      }
    }
  }
  </script>
  
  <style scoped>
  .event-loop-explainer {
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    color: #000000;
    line-height: 1.6;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  h1, h2, h3, h4 {
    color: #000000;
    margin-top: 0;
  }
  
  h1 {
    text-align: center;
    font-size: 28px;
    margin-bottom: 20px;
  }
  
  h2 {
    font-size: 24px;
    border-bottom: 2px solid #2c3e50;
    padding-bottom: 10px;
  }
  
  h3 {
    font-size: 20px;
  }
  
  h4 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .intro-section {
    margin-bottom: 30px;
  }
  
  .code-example {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .code-block {
    background-color: #2d2d2d;
    color: #ffffff;
    padding: 20px;
    border-radius: 5px;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    line-height: 1.5;
    margin: 15px 0;
  }
  
  .question {
    font-weight: bold;
    font-size: 18px;
    color: #e74c3c;
    margin-top: 20px;
  }
  
  .controls {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .control-btn {
    padding: 12px 20px;
    background-color: #3498db;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s;
  }
  
  .control-btn:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .control-btn:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .start-btn {
    background-color: #2ecc71;
  }
  
  .start-btn:hover:not(:disabled) {
    background-color: #27ae60;
  }
  
  .step-btn {
    background-color: #e67e22;
  }
  
  .step-btn:hover:not(:disabled) {
    background-color: #d35400;
  }
  
  .progress {
    flex: 1;
    min-width: 200px;
  }
  
  .progress-label {
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  .progress-bar {
    width: 100%;
    height: 10px;
    background-color: #ecf0f1;
    border-radius: 5px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background-color: #3498db;
    width: 0;
    transition: width 0.5s ease;
  }
  
  .visualization {
    display: grid;
    grid-template-columns: 1.5fr 0.5fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .main-thread {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .call-stack, .code-execution, .microtask-queue, .macrotask-queue, .console-output, .explanation-panel {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .stack-container, .queue-container {
    min-height: 150px;
    display: flex;
    flex-direction: column-reverse;
    gap: 10px;
    border: 1px dashed #bdc3c7;
    padding: 15px;
    border-radius: 5px;
    position: relative;
  }
  
  .queue-container {
    flex-direction: column;
  }
  
  .stack-item, .queue-item {
    padding: 10px 15px;
    background-color: #ecf0f1;
    border-left: 5px solid #3498db;
    border-radius: 5px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    transition: all 0.3s ease;
  }
  
  .stack-item.executing {
    background-color: #d5f5e3;
    border-left-color: #2ecc71;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }
  
  .queue-item.microtask {
    border-left-color: #9b59b6;
    background-color: #f5eef8;
  }
  
  .queue-item.macrotask {
    border-left-color: #e74c3c;
    background-color: #fdedec;
  }
  
  .empty-queue, .empty-stack, .empty-console {
    color: #95a5a6;
    font-style: italic;
    text-align: center;
    padding: 10px;
  }
  
  .code-lines {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
  }
  
  .code-line {
    display: flex;
    align-items: flex-start;
    padding: 5px 10px;
    border-radius: 3px;
    position: relative;
  }
  
  .line-number {
    min-width: 30px;
    color: #7f8c8d;
    text-align: right;
    margin-right: 10px;
    user-select: none;
  }
  
  .line-content {
    flex: 1;
    white-space: pre;
  }
  
  .code-line.executed {
    background-color: #eafaf1;
    color: #7f8c8d;
  }
  
  .code-line.current {
    background-color: #fff9c4;
    border-left: 3px solid #f1c40f;
    font-weight: bold;
  }
  
  .code-line.queued {
    color: #7f8c8d;
  }
  
  .code-line.microtask-queued::after {
    content: '→ Microtask Queue';
    color: #9b59b6;
    font-style: italic;
    margin-left: 15px;
    font-size: 12px;
  }
  
  .code-line.macrotask-queued::after {
    content: '→ Macrotask Queue';
    color: #e74c3c;
    font-style: italic;
    margin-left: 15px;
    font-size: 12px;
  }
  
  .event-loop-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  
  .event-loop {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  .loop-circle {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 15px solid #3498db;
    border-top-color: #f39c12;
    position: relative;
    transition: transform 1s linear;
  }
  
  .event-loop.spinning .loop-circle {
    animation: spin 2s linear infinite;
  }
  
  .loop-phase {
    text-align: center;
    font-weight: bold;
    color: #2c3e50;
    background-color: #f8f9fa;
    padding: 8px 12px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .loop-label {
    font-weight: bold;
    color: #2c3e50;
  }
  
  .console-container, .explanation-container {
    min-height: 150px;
    border: 1px solid #ecf0f1;
    padding: 15px;
    border-radius: 5px;
    background-color: #ffffff;
    font-family: 'Courier New', monospace;
    overflow-y: auto;
    color: #000000;
  }
  
  .console-log {
    margin-bottom: 10px;
    transition: opacity 0.5s ease;
    color: #000000;
  }
  
  .console-log.new-log {
    font-weight: bold;
    animation: highlightLog 1s ease;
    color: #000000;
  }
  
  @keyframes highlightLog {
    0% { background-color: #ffff99; }
    100% { background-color: transparent; }
  }
  
  .explanation-text {
    line-height: 1.6;
  }
  
  .summary-section {
    margin-top: 30px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .summary-section h3 {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  
  .summary-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .summary-content h4 {
    color: #3498db;
    margin-bottom: 10px;
  }
  
  .summary-content ul, .summary-content ol {
    padding-left: 20px;
  }
  
  .summary-content li {
    margin-bottom: 8px;
  }
  
  /* Медиа-запросы для адаптивности */
  @media (max-width: 1200px) {
    .visualization {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 768px) {
    .controls {
      flex-direction: column;
      align-items: stretch;
    }
    
    .code-block {
      font-size: 14px;
    }
  }
  </style>