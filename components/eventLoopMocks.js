// eventLoopMocks.js - Данные для визуализации Event Loop

export const eventLoopDemos = [
    {
      name: 'Event Loop: Основы',
      code: `// Основы Event Loop
  console.log('Начало скрипта');
  
  // Задержка выполнения колбэка на 0мс
  setTimeout(() => {
    console.log('Таймер выполнен!');
  }, 0);
  
  console.log('Конец скрипта');
  
  // Результат:
  // Начало скрипта
  // Конец скрипта
  // Таймер выполнен!`,
      steps: [
        {
          title: 'Инициализация Event Loop',
          description: 'Event Loop - это механизм в JavaScript, который координирует выполнение кода, обработку событий, колбэков и других задач. Он состоит из стека вызовов (Call Stack), очередей задач и механизма Web API.',
          action: (state) => {
            state.callStack = [{id: 1, name: 'main()', executing: true}];
            state.isLoopActive = true;
          }
        },
        {
          title: 'Стек вызовов заполняется',
          description: 'JavaScript - однопоточный язык. Весь код выполняется в одном потоке, и стек вызовов отслеживает, где именно мы находимся в выполнении программы.',
          action: (state) => {
            state.isLoopActive = false;
            state.callStack = [
              {id: 1, name: 'main()', executing: true},
              {id: 2, name: 'console.log("Начало скрипта")', executing: false}
            ];
          }
        },
        {
          title: 'Выполнение log-функции',
          description: 'Первый вызов <code>console.log()</code> выполняется и выводит "Начало скрипта" в консоль.',
          action: (state) => {
            state.callStack = [
              {id: 1, name: 'main()', executing: false},
              {id: 2, name: 'console.log("Начало скрипта")', executing: true}
            ];
          }
        },
        {
          title: 'Вызов setTimeout()',
          description: 'Инструкция <code>setTimeout()</code> добавляется в стек вызовов. Эта функция - часть Web API, предоставляемого браузером.',
          action: (state) => {
            state.callStack = [
              {id: 1, name: 'main()', executing: false},
              {id: 3, name: 'setTimeout(..., 0)', executing: true, async: true}
            ];
          }
        },
        {
          title: 'setTimeout() регистрирует колбэк',
          description: 'Функция <code>setTimeout()</code> завершается мгновенно, но запускает таймер и регистрирует колбэк-функцию. Даже с временем 0мс, колбэк не будет выполнен немедленно!',
          action: (state) => {
            state.callStack = [{id: 1, name: 'main()', executing: true}];
            state.webAPIs = [{
              id: 1,
              name: 'setTimeout(callback, 0)',
              type: 'timer',
              processing: true,
              timer: true,
              timeRemaining: 0
            }];
          }
        },
        {
          title: 'Второй console.log()',
          description: 'Программа продолжает выполнение синхронного кода, и выполняется второй вызов <code>console.log()</code>.',
          action: (state) => {
            state.callStack = [
              {id: 1, name: 'main()', executing: false},
              {id: 4, name: 'console.log("Конец скрипта")', executing: true}
            ];
          }
        },
        {
          title: 'Таймер завершается',
          description: 'Таймер завершает свою работу, но его колбэк НЕ попадает сразу в стек вызовов! Вместо этого он помещается в очередь задач (Task Queue).',
          action: (state) => {
            state.callStack = [{id: 1, name: 'main()', executing: true}];
            state.webAPIs = [];
            state.taskQueue = [{
              id: 5,
              name: 'setTimeout callback',
              source: 'setTimeout',
              next: false
            }];
          }
        },
        {
          title: 'Завершение основного скрипта',
          description: 'Основной скрипт полностью завершается, и вызов <code>main()</code> удаляется из стека.',
          action: (state) => {
            state.callStack = [];
            state.isLoopActive = true;
          }
        },
        {
          title: 'Event Loop проверяет очереди',
          description: 'Стек вызовов пуст! Теперь Event Loop может проверить очереди на наличие колбэков для выполнения. Event Loop всегда сначала проверяет очередь микрозадач, а затем очередь задач.',
          action: (state) => {
            state.isLoopActive = true;
            state.taskQueue = [{
              id: 5,
              name: 'setTimeout callback',
              source: 'setTimeout',
              next: true
            }];
          }
        },
        {
          title: 'Event Loop берет колбэк из очереди',
          description: 'Event Loop берет первый колбэк из очереди задач и помещает его в стек вызовов для выполнения.',
          action: (state) => {
            state.callStack = [{
              id: 5, 
              name: 'setTimeout callback', 
              executing: true
            }];
            state.taskQueue = [];
            state.isLoopActive = false;
          }
        },
        {
          title: 'Выполнение колбэка setTimeout',
          description: 'Колбэк-функция <code>setTimeout</code> выполняется, и вызывается <code>console.log()</code> внутри нее.',
          action: (state) => {
            state.callStack = [
              {id: 5, name: 'setTimeout callback', executing: false},
              {id: 6, name: 'console.log("Таймер выполнен!")', executing: true}
            ];
          }
        },
        {
          title: 'Завершение колбэка',
          description: 'Колбэк-функция завершает свое выполнение и удаляется из стека. Выполнение программы завершено.',
          action: (state) => {
            state.callStack = [];
            state.isLoopActive = true;
          }
        },
        {
          title: 'Event Loop продолжает работу',
          description: 'Event Loop никогда не останавливается! Он постоянно проверяет, есть ли задачи в очередях или есть ли события, требующие обработки, пока страница открыта.',
          action: (state) => {
            state.isLoopActive = true;
          }
        },
      ]
    },
    {
      name: 'Макро vs Микрозадачи',
      code: `// Демонстрация приоритета микрозадач над макрозадачами
  console.log('🚀 Начало');
  
  // Макрозадача (setTimeout)
  setTimeout(() => {
    console.log('⏰ Макрозадача (setTimeout)');
  }, 0);
  
  // Микрозадача 1 (Promise)
  Promise.resolve().then(() => {
    console.log('🔵 Микрозадача 1 (Promise)');
    
    // Вложенная микрозадача
    Promise.resolve().then(() => {
      console.log('🔷 Вложенная микрозадача');
    });
  });
  
  // Микрозадача 2 (Promise)
  Promise.resolve().then(() => {
    console.log('🔵 Микрозадача 2 (Promise)');
  });
  
  console.log('🏁 Конец');
  
  // Результат:
  // 🚀 Начало
  // 🏁 Конец
  // 🔵 Микрозадача 1 (Promise)
  // 🔵 Микрозадача 2 (Promise)
  // 🔷 Вложенная микрозадача
  // ⏰ Макрозадача (setTimeout)`,
      steps: [
        {
          title: 'Микрозадачи vs Макрозадачи',
          description: 'В Event Loop существуют два типа задач: <br>• <b>Макрозадачи</b> (Tasks): setTimeout, setInterval, I/O, рендеринг<br>• <b>Микрозадачи</b> (Microtasks): Promise, queueMicrotask, MutationObserver',
          action: (state) => {
            state.callStack = [{id: 1, name: 'main()', executing: true}];
            state.isLoopActive = true;
          }
        },
        {
          title: 'Порядок выполнения',
          description: 'Event Loop всегда сначала обрабатывает <strong>все</strong> микрозадачи, и только потом берёт одну макрозадачу. После выполнения макрозадачи он снова проверяет микрозадачи.',
          action: (state) => {
            state.callStack = [{id: 1, name: 'main()', executing: true}];
            state.isLoopActive = true;
          }
        },
        // Дополнительные шаги для этой демонстрации...
      ]
    },
    {
      name: 'async/await в Event Loop',
      code: `// Демонстрация async/await в Event Loop
  console.log('🚀 Начало скрипта');
  
  // Асинхронная функция
  async function fetchData() {
    console.log('📥 Внутри async функции');
    
    // await приостанавливает выполнение функции
    // и неявно создает Promise
    const data = await new Promise(resolve => {
      setTimeout(() => {
        console.log('⏱️ Таймер завершился');
        resolve('Данные получены');
      }, 1000);
    });
    
    console.log('📋 Работа с данными:', data);
    
    return '✅ Готово!';
  }
  
  // Вызов async функции
  fetchData().then(result => {
    console.log('🏆 Результат:', result);
  });
  
  console.log('🏁 Конец скрипта');`,
      steps: [
        {
          title: 'async/await и Event Loop',
          description: '<code>async/await</code> - это синтаксический сахар над промисами, который делает асинхронный код более читаемым. Но как это работает под капотом?',
          action: (state) => {
            state.callStack = [{id: 1, name: 'main()', executing: true}];
            state.isLoopActive = true;
          }
        },
        // Дополнительные шаги для этой демонстрации...
      ]
    },
    {
      name: 'Рендеринг и Event Loop',
      code: `// Демонстрация взаимодействия Event Loop с рендерингом
  document.getElementById('button').addEventListener('click', () => {
    console.log('🖱️ Обработка клика');
    
    // Блокировка основного потока
    const start = Date.now();
    while (Date.now() - start < 2000) {
      // Тяжелые вычисления на 2 секунды
    }
    
    console.log('🔄 Вычисления завершены');
    
    // Изменение DOM
    document.getElementById('result').textContent = 'Готово!';
    
    // Задача, отложенная на следующий цикл рендеринга
    requestAnimationFrame(() => {
      console.log('🎨 Перед следующим рендерингом');
    });
  });
  
  // Наблюдаем за изменениями DOM
  new MutationObserver(() => {
    console.log('👁️ DOM изменен');
  }).observe(document.body, { 
    childList: true, 
    subtree: true 
  });`,
      steps: [
        {
          title: 'Рендеринг и Event Loop',
          description: 'Event Loop не только выполняет JavaScript, но и координирует процесс рендеринга страницы. Рендеринг происходит между обработкой макрозадач.',
          action: (state) => {
            state.callStack = [];
            state.isLoopActive = true;
          }
        },
        // Дополнительные шаги для этой демонстрации...
      ]
    }
  ];
  
  // Вспомогательные функции, которые можно переиспользовать
  export const getAPIIcon = (type) => {
    switch (type) {
      case 'timer': return 'far fa-clock';
      case 'network': return 'fas fa-globe';
      case 'dom': return 'fas fa-code';
      default: return 'fas fa-cog';
    }
  };