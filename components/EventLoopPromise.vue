<template>
    <div class="promise-visualizer">
      <h1 class="main-title">Понимание цепочек промисов: поток выполнения then/catch</h1>
      
      <div class="tabs">
        <button 
          :class="['tab-button', { active: activeTab === 'example1' }]" 
          @click="setActiveTab('example1')"
        >
          Пример 1: Обработка ошибки
        </button>
        <button 
          :class="['tab-button', { active: activeTab === 'example2' }]" 
          @click="setActiveTab('example2')"
        >
          Пример 2: Многоуровневые ошибки
        </button>
        <button 
          :class="['tab-button', { active: activeTab === 'theory' }]" 
          @click="setActiveTab('theory')"
        >
          Теория и применение
        </button>
      </div>
      
      <div class="tab-content">
        <!-- Пример 1 -->
        <div v-if="activeTab === 'example1'" class="tab-panel">
          <div class="code-section">
            <h2>Цепочка промисов: базовый пример</h2>
            <pre class="code-block">
  Promise.reject("a")
    .catch((p) => p + "b")
    .catch((p) => p + "c")
    .then((p) => p + "d")
    .then((p) => console.log(p));
            </pre>
            <div class="controls">
              <button class="control-button" @click="runExample1Animation">{{ isAnimating ? 'Сбросить' : 'Запустить анимацию' }}</button>
              <button class="control-button" @click="nextStep" :disabled="!isAnimating || currentStep === maxSteps">Следующий шаг</button>
            </div>
          </div>
          
          <div class="visualization-section">
            <div class="visualization-container">
              <!-- Анимированная цепочка промисов -->
              <div class="promise-chain">
                <div 
                  :class="['promise-box', 'reject', { active: currentStep >= 1, completed: currentStep > 1 }]"
                >
                  <div class="promise-title">Promise.reject("a")</div>
                  <div class="promise-value">
                    <span v-if="currentStep >= 1">Значение: "a" (отклонён)</span>
                  </div>
                </div>
                
                <div class="promise-arrow"></div>
                
                <div 
                  :class="['promise-box', 'catch', { active: currentStep >= 2, completed: currentStep > 2 }]"
                >
                  <div class="promise-title">.catch((p) => p + "b")</div>
                  <div class="promise-value">
                    <span v-if="currentStep >= 2">Получено: "a"</span>
                    <span v-if="currentStep >= 2">Возвращено: "ab" (выполнен)</span>
                  </div>
                </div>
                
                <div class="promise-arrow"></div>
                
                <div 
                  :class="['promise-box', 'catch', { active: currentStep >= 3, completed: currentStep > 3, skipped: currentStep >= 3 }]"
                >
                  <div class="promise-title">.catch((p) => p + "c")</div>
                  <div class="promise-value">
                    <span v-if="currentStep >= 3">Пропущен: предыдущий catch обработал ошибку</span>
                  </div>
                </div>
                
                <div class="promise-arrow"></div>
                
                <div 
                  :class="['promise-box', 'then', { active: currentStep >= 4, completed: currentStep > 4 }]"
                >
                  <div class="promise-title">.then((p) => p + "d")</div>
                  <div class="promise-value">
                    <span v-if="currentStep >= 4">Получено: "ab"</span>
                    <span v-if="currentStep >= 4">Возвращено: "abd" (выполнен)</span>
                  </div>
                </div>
                
                <div class="promise-arrow"></div>
                
                <div 
                  :class="['promise-box', 'then', { active: currentStep >= 5, completed: currentStep > 5 }]"
                >
                  <div class="promise-title">.then((p) => console.log(p))</div>
                  <div class="promise-value">
                    <span v-if="currentStep >= 5">Получено: "abd"</span>
                    <span v-if="currentStep >= 5">Вывод в консоль</span>
                  </div>
                </div>
              </div>
              
              <!-- Консоль -->
              <div class="console-output">
                <div class="console-header">
                  <span>Console</span>
                </div>
                <div class="console-content">
                  <div v-if="currentStep >= 5" class="console-line">"abd"</div>
                </div>
              </div>
            </div>
            
            <!-- Объяснение текущего шага -->
            <div class="explanation-box">
              <h3>Объяснение:</h3>
              <div v-if="currentStep === 0">
                <p>Нажмите "Запустить анимацию", чтобы увидеть пошаговое выполнение цепочки промисов.</p>
              </div>
              <div v-else-if="currentStep === 1">
                <p><strong>Шаг 1:</strong> Создаем промис, который сразу переходит в состояние <span class="rejected-text">rejected</span> со значением "a".</p>
                <p>Когда мы используем <code>Promise.reject("a")</code>, мы создаем промис, который находится в состоянии отклонено (<span class="rejected-text">rejected</span>) с причиной "a".</p>
                <p>Такой промис нужно обработать с помощью метода <code>catch</code>.</p>
              </div>
              <div v-else-if="currentStep === 2">
                <p><strong>Шаг 2:</strong> Первый <code>catch</code> обрабатывает ошибку "a" и возвращает новое значение "ab".</p>
                <p>Метод <code>catch</code> получает причину отклонения ("a") и выполняет с ней операцию <code>p + "b"</code>, что дает "ab".</p>
                <p>Поскольку обработчик <code>catch</code> возвращает значение, а не выбрасывает ошибку, цепочка продолжается с промисом в состоянии <span class="resolved-text">resolved</span> со значением "ab".</p>
              </div>
              <div v-else-if="currentStep === 3">
                <p><strong>Шаг 3:</strong> Второй <code>catch</code> пропускается.</p>
                <p>После первого <code>catch</code> промис находится в состоянии <span class="resolved-text">resolved</span> (выполнен). Метод <code>catch</code> вызывается только для промисов в состоянии <span class="rejected-text">rejected</span> (отклонен).</p>
                <p>Поэтому этот <code>catch</code> пропускается, и значение "ab" передается дальше по цепочке.</p>
              </div>
              <div v-else-if="currentStep === 4">
                <p><strong>Шаг 4:</strong> Метод <code>then</code> получает значение "ab" и возвращает "abd".</p>
                <p>Так как промис находится в состоянии <span class="resolved-text">resolved</span>, вызывается обработчик <code>then</code>.</p>
                <p>Он получает значение "ab" и выполняет операцию <code>p + "d"</code>, что дает "abd".</p>
              </div>
              <div v-else-if="currentStep === 5">
                <p><strong>Шаг 5:</strong> Последний <code>then</code> получает значение "abd" и выводит его в консоль.</p>
                <p>Обработчик <code>then</code> получает значение "abd" и передает его функции <code>console.log</code>.</p>
                <p>В результате в консоли появляется строка "abd".</p>
              </div>
            </div>
          </div>
          
          <div class="summary-box">
            <h3>Ключевые выводы:</h3>
            <ul>
              <li><code>Promise.reject("a")</code> создает промис в состоянии <span class="rejected-text">rejected</span>.</li>
              <li>Первый <code>catch</code> обрабатывает ошибку и возвращает новое значение, переводя промис в состояние <span class="resolved-text">resolved</span>.</li>
              <li>Последующие <code>catch</code> пропускаются, если промис уже в состоянии <span class="resolved-text">resolved</span>.</li>
              <li>Методы <code>then</code> вызываются для промисов в состоянии <span class="resolved-text">resolved</span> и пропускаются для <span class="rejected-text">rejected</span>.</li>
            </ul>
          </div>
        </div>
        
        <!-- Пример 2 -->
        <div v-if="activeTab === 'example2'" class="tab-panel">
          <div class="code-section">
            <h2>Цепочка промисов: сложный пример</h2>
            <pre class="code-block">
  Promise.reject("a")
    .then((p) => p + "2")
    .then((p) => p + "3")
    .catch((p) => {
      throw "4";
    })
    .catch((p) => p + "5")
    .catch((p) => p + "7")
    .then((p) => p + "8")
    .catch((p) => p + "9")
    .then(console.log);
            </pre>
            <div class="controls">
              <button class="control-button" @click="runExample2Animation">{{ isAnimating2 ? 'Сбросить' : 'Запустить анимацию' }}</button>
              <button class="control-button" @click="nextStep2" :disabled="!isAnimating2 || currentStep2 === maxSteps2">Следующий шаг</button>
            </div>
          </div>
          
          <div class="visualization-section">
            <div class="visualization-container">
              <!-- Анимированная цепочка промисов -->
              <div class="promise-chain">
                <div 
                  :class="['promise-box', 'reject', { active: currentStep2 >= 1, completed: currentStep2 > 1 }]"
                >
                  <div class="promise-title">Promise.reject("a")</div>
                  <div class="promise-value">
                    <span v-if="currentStep2 >= 1">Значение: "a" (отклонён)</span>
                  </div>
                </div>
                
                <div class="promise-arrow"></div>
                
                <div 
                  :class="['promise-box', 'then', { active: currentStep2 >= 2, completed: currentStep2 > 2, skipped: currentStep2 >= 2 }]"
                >
                  <div class="promise-title">.then((p) => p + "2")</div>
                  <div class="promise-value">
                    <span v-if="currentStep2 >= 2">Пропущен: промис отклонен</span>
                  </div>
                </div>
                
                <div class="promise-arrow"></div>
                
                <div 
                  :class="['promise-box', 'then', { active: currentStep2 >= 3, completed: currentStep2 > 3, skipped: currentStep2 >= 3 }]"
                >
                  <div class="promise-title">.then((p) => p + "3")</div>
                  <div class="promise-value">
                    <span v-if="currentStep2 >= 3">Пропущен: промис отклонен</span>
                  </div>
                </div>
                
                <div class="promise-arrow"></div>
                
                <div 
                  :class="['promise-box', 'catch', { active: currentStep2 >= 4, completed: currentStep2 > 4 }]"
                >
                  <div class="promise-title">.catch((p) => { throw "4"; })</div>
                  <div class="promise-value">
                    <span v-if="currentStep2 >= 4">Получено: "a"</span>
                    <span v-if="currentStep2 >= 4">Выброшена новая ошибка: "4" (отклонён)</span>
                  </div>
                </div>
                
                <div class="promise-arrow"></div>
                
                <div 
                  :class="['promise-box', 'catch', { active: currentStep2 >= 5, completed: currentStep2 > 5 }]"
                >
                  <div class="promise-title">.catch((p) => p + "5")</div>
                  <div class="promise-value">
                    <span v-if="currentStep2 >= 5">Получено: "4"</span>
                    <span v-if="currentStep2 >= 5">Возвращено: "45" (выполнен)</span>
                  </div>
                </div>
                
                <div class="promise-arrow"></div>
                
                <div 
                  :class="['promise-box', 'catch', { active: currentStep2 >= 6, completed: currentStep2 > 6, skipped: currentStep2 >= 6 }]"
                >
                  <div class="promise-title">.catch((p) => p + "7")</div>
                  <div class="promise-value">
                    <span v-if="currentStep2 >= 6">Пропущен: предыдущий catch обработал ошибку</span>
                  </div>
                </div>
                
                <div class="promise-arrow"></div>
                
                <div 
                  :class="['promise-box', 'then', { active: currentStep2 >= 7, completed: currentStep2 > 7 }]"
                >
                  <div class="promise-title">.then((p) => p + "8")</div>
                  <div class="promise-value">
                    <span v-if="currentStep2 >= 7">Получено: "45"</span>
                    <span v-if="currentStep2 >= 7">Возвращено: "458" (выполнен)</span>
                  </div>
                </div>
                
                <div class="promise-arrow"></div>
                
                <div 
                  :class="['promise-box', 'catch', { active: currentStep2 >= 8, completed: currentStep2 > 8, skipped: currentStep2 >= 8 }]"
                >
                  <div class="promise-title">.catch((p) => p + "9")</div>
                  <div class="promise-value">
                    <span v-if="currentStep2 >= 8">Пропущен: промис выполнен</span>
                  </div>
                </div>
                
                <div class="promise-arrow"></div>
                
                <div 
                  :class="['promise-box', 'then', { active: currentStep2 >= 9, completed: currentStep2 > 9 }]"
                >
                  <div class="promise-title">.then(console.log)</div>
                  <div class="promise-value">
                    <span v-if="currentStep2 >= 9">Получено: "458"</span>
                    <span v-if="currentStep2 >= 9">Вывод в консоль</span>
                  </div>
                </div>
              </div>
              
              <!-- Консоль -->
              <div class="console-output">
                <div class="console-header">
                  <span>Console</span>
                </div>
                <div class="console-content">
                  <div v-if="currentStep2 >= 9" class="console-line">"458"</div>
                </div>
              </div>
            </div>
            
            <!-- Объяснение текущего шага -->
            <div class="explanation-box">
              <h3>Объяснение:</h3>
              <div v-if="currentStep2 === 0">
                <p>Нажмите "Запустить анимацию", чтобы увидеть пошаговое выполнение цепочки промисов.</p>
              </div>
              <div v-else-if="currentStep2 === 1">
                <p><strong>Шаг 1:</strong> Создаем промис, который сразу переходит в состояние <span class="rejected-text">rejected</span> со значением "a".</p>
                <p>Когда мы используем <code>Promise.reject("a")</code>, мы создаем промис, который находится в состоянии отклонено с причиной "a".</p>
              </div>
              <div v-else-if="currentStep2 === 2">
                <p><strong>Шаг 2:</strong> Первый <code>then</code> пропускается.</p>
                <p>Метод <code>then</code> вызывается только для промисов в состоянии <span class="resolved-text">resolved</span>. Так как наш промис отклонен (<span class="rejected-text">rejected</span>), этот обработчик пропускается.</p>
                <p>Ошибка "a" продолжает распространяться дальше по цепочке.</p>
              </div>
              <div v-else-if="currentStep2 === 3">
                <p><strong>Шаг 3:</strong> Второй <code>then</code> также пропускается.</p>
                <p>По той же причине – промис все еще находится в состоянии <span class="rejected-text">rejected</span>. Обработчики <code>then</code> не вызываются для отклоненных промисов.</p>
                <p>Ошибка "a" продолжает распространяться по цепочке, пока не будет обработана.</p>
              </div>
              <div v-else-if="currentStep2 === 4">
                <p><strong>Шаг 4:</strong> Первый <code>catch</code> обрабатывает ошибку "a", но выбрасывает новую ошибку "4".</p>
                <p>Метод <code>catch</code> получает причину отклонения ("a"), но вместо возврата значения выбрасывает новую ошибку с помощью <code>throw "4"</code>.</p>
                <p>Это создает новый отклоненный промис с причиной "4".</p>
              </div>
              <div v-else-if="currentStep2 === 5">
                <p><strong>Шаг 5:</strong> Второй <code>catch</code> обрабатывает ошибку "4" и возвращает "45".</p>
                <p>Этот <code>catch</code> получает новую причину отклонения ("4") и выполняет операцию <code>p + "5"</code>, что дает "45".</p>
                <p>Поскольку обработчик <code>catch</code> возвращает значение, промис переходит в состояние <span class="resolved-text">resolved</span> со значением "45".</p>
              </div>
              <div v-else-if="currentStep2 === 6">
                <p><strong>Шаг 6:</strong> Третий <code>catch</code> пропускается.</p>
                <p>После обработки ошибки вторым <code>catch</code> промис находится в состоянии <span class="resolved-text">resolved</span>.</p>
                <p>Метод <code>catch</code> вызывается только для <span class="rejected-text">rejected</span> промисов, поэтому этот обработчик пропускается.</p>
              </div>
              <div v-else-if="currentStep2 === 7">
                <p><strong>Шаг 7:</strong> Метод <code>then</code> получает значение "45" и возвращает "458".</p>
                <p>Так как промис теперь в состоянии <span class="resolved-text">resolved</span>, вызывается обработчик <code>then</code>.</p>
                <p>Он получает значение "45" и выполняет операцию <code>p + "8"</code>, что дает "458".</p>
              </div>
              <div v-else-if="currentStep2 === 8">
                <p><strong>Шаг 8:</strong> <code>catch</code> пропускается, так как промис выполнен.</p>
                <p>Промис находится в состоянии <span class="resolved-text">resolved</span> со значением "458", поэтому обработчик <code>catch</code> пропускается.</p>
                <p>Значение "458" передается дальше по цепочке.</p>
              </div>
              <div v-else-if="currentStep2 === 9">
                <p><strong>Шаг 9:</strong> Последний <code>then</code> получает значение "458" и выводит его в консоль.</p>
                <p>Обработчик <code>then</code> получает значение "458" и передает его функции <code>console.log</code>.</p>
                <p>В результате в консоли появляется строка "458".</p>
              </div>
            </div>
          </div>
          
          <div class="summary-box">
            <h3>Ключевые выводы:</h3>
            <ul>
              <li>Методы <code>then</code> вызываются только для промисов в состоянии <span class="resolved-text">resolved</span> и пропускаются для <span class="rejected-text">rejected</span>.</li>
              <li>Методы <code>catch</code> вызываются только для промисов в состоянии <span class="rejected-text">rejected</span> и пропускаются для <span class="resolved-text">resolved</span>.</li>
              <li>Если в <code>catch</code> выбрасывается новая ошибка, промис остается в состоянии <span class="rejected-text">rejected</span> с новой причиной.</li>
              <li>Обработка ошибок в цепочке промисов может происходить в несколько этапов.</li>
            </ul>
          </div>
        </div>
        
        <!-- Теория и применение -->
        <div v-if="activeTab === 'theory'" class="tab-panel">
          <h2>Теория промисов и их применение</h2>
          
          <div class="theory-section">
            <h3>Основные правила работы с промисами:</h3>
            <ol>
              <li>
                <strong>Состояния промиса:</strong>
                <ul>
                  <li><span class="pending-text">Pending</span> (ожидание) - начальное состояние</li>
                  <li><span class="resolved-text">Fulfilled/Resolved</span> (выполнен) - операция завершена успешно</li>
                  <li><span class="rejected-text">Rejected</span> (отклонен) - произошла ошибка</li>
                </ul>
              </li>
              <li>
                <strong>Обработка состояний:</strong>
                <ul>
                  <li><code>then</code> вызывается только для промисов в состоянии <span class="resolved-text">resolved</span></li>
                  <li><code>catch</code> вызывается только для промисов в состоянии <span class="rejected-text">rejected</span></li>
                </ul>
              </li>
              <li>
                <strong>Переход между состояниями:</strong>
                <ul>
                  <li>Если <code>then</code> возвращает значение, промис остается в состоянии <span class="resolved-text">resolved</span></li>
                  <li>Если <code>then</code> выбрасывает ошибку, промис переходит в состояние <span class="rejected-text">rejected</span></li>
                  <li>Если <code>catch</code> возвращает значение, промис переходит в состояние <span class="resolved-text">resolved</span></li>
                  <li>Если <code>catch</code> выбрасывает ошибку, промис остается в состоянии <span class="rejected-text">rejected</span></li>
                </ul>
              </li>
            </ol>
          </div>
          
          <div class="theory-section">
            <h3>Алгоритм решения задач по промисам:</h3>
            <ol>
              <li><strong>Определите начальное состояние промиса</strong> (resolved или rejected)</li>
              <li><strong>Последовательно двигайтесь по цепочке</strong>, учитывая текущее состояние промиса</li>
              <li><strong>Для каждого метода определите, будет ли он вызван</strong> (then вызывается для resolved, catch для rejected)</li>
              <li><strong>Если метод вызывается, определите его результат</strong> (возвращает значение или выбрасывает ошибку)</li>
              <li><strong>Обновите состояние промиса</strong> и продолжайте движение по цепочке</li>
            </ol>
          </div>
          
          <div class="theory-section">
            <h3>Примеры использования промисов в реальных проектах:</h3>
            
            <div class="use-case">
              <h4>1. Обработка запросов к API</h4>
              <pre class="code-block">
  // Запрос к API с обработкой различных ошибок
  fetch('https://api.example.com/data')
    .then(response => {
      if (!response.ok) {
        // Обработка HTTP-ошибок (4xx, 5xx)
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Обработка успешно полученных данных
      console.log('Данные получены:', data);
      return data;
    })
    .catch(error => {
      if (error.name === 'TypeError') {
        // Обработка сетевых ошибок
        console.error('Проблема с сетью:', error.message);
      } else {
        // Обработка других ошибок
        console.error('Ошибка при получении данных:', error.message);
      }
      // Возвращаем пустой объект, чтобы продолжить цепочку
      return {};
    })
    .finally(() => {
      // Код, который выполняется всегда, независимо от результата
      console.log('Запрос завершен');
    });
              </pre>
            </div>
            
            <div class="use-case">
              <h4>2. Последовательные асинхронные операции</h4>
              <pre class="code-block">
  // Функция задержки
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  // Последовательное выполнение асинхронных операций
  async function processTasks() {
    try {
      console.log('Начало обработки...');
      
      // Шаг 1
      await delay(1000);
      console.log('Шаг 1 завершен');
      
      // Шаг 2
      await delay(1000);
      console.log('Шаг 2 завершен');
      
      // Шаг 3 с возможной ошибкой
      const result = await someAsyncOperation();
      console.log('Шаг 3 завершен:', result);
      
      console.log('Все задачи успешно выполнены!');
    } catch (error) {
      console.error('Произошла ошибка:', error);
      // Выполняем альтернативное действие при ошибке
      await fallbackOperation();
    }
  }
              </pre>
            </div>
            
            <div class="use-case">
              <h4>3. Параллельные запросы с обработкой всех результатов</h4>
              <pre class="code-block">
  // Загрузка данных из нескольких источников одновременно
  Promise.all([
    fetch('/api/users').then(res => res.json()),
    fetch('/api/products').then(res => res.json()),
    fetch('/api/orders').then(res => res.json())
  ])
  .then(([users, products, orders]) => {
    // Все запросы успешно выполнены
    console.log('Пользователи:', users);
    console.log('Продукты:', products);
    console.log('Заказы:', orders);
    
    // Объединение данных
    return processData(users, products, orders);
  })
  .catch(error => {
    // Если хотя бы один запрос завершился с ошибкой
    console.error('Ошибка при загрузке данных:', error);
    return loadCachedData(); // Загрузка кешированных данных
  });
  
  // Обработка результатов независимо от того, были ли ошибки
  Promise.allSettled([
    fetch('/api/critical').then(res => res.json()),
    fetch('/api/optional').then(res => res.json())
  ])
  .then(results => {
    // Проверяем статус каждого результата
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Запрос ${index} успешен:`, result.value);
      } else {
        console.error(`Запрос ${index} не удался:`, result.reason);
      }
    });
  });
              </pre>
            </div>
          </div>
          
          <div class="theory-section">
            <h3>Подводные камни при работе с промисами:</h3>
            <ul>
              <li>
                <strong>Проглатывание ошибок</strong> - если вы не добавите <code>catch</code> в цепочку, ошибки могут быть проигнорированы:
                <pre class="code-block small">
  // Ошибка будет проигнорирована и не появится в консоли!
  Promise.reject(new Error('Ошибка'))
    .then(() => console.log('Этот код не выполнится'));
  
  // Правильно: всегда обрабатывайте ошибки
  Promise.reject(new Error('Ошибка'))
    .then(() => console.log('Этот код не выполнится'))
    .catch(error => console.error('Перехвачена ошибка:', error));
                </pre>
              </li>
              <li>
                <strong>Забытый return</strong> - если вы забудете вернуть значение из <code>then</code>, следующий обработчик получит <code>undefined</code>:
                <pre class="code-block small">
  // Неправильно:
  fetchData()
    .then(data => {
      process(data); // Нет return!
    })
    .then(result => {
      // result будет undefined, а не результат process(data)
      console.log(result);
    });
  
  // Правильно:
  fetchData()
    .then(data => {
      return process(data); // Возвращаем результат
    })
    .then(result => {
      console.log(result); // Получаем правильный результат
    });
                </pre>
              </li>
              <li>
                <strong>Слишком глубокая вложенность</strong> - избегайте вложенных <code>then</code>, используйте цепочки:
                <pre class="code-block small">
  // Плохо - "callback hell" с промисами
  fetchUser()
    .then(user => {
      fetchOrders(user.id)
        .then(orders => {
          fetchProducts(orders)
            .then(products => {
              // Трудно читаемый код
            });
        });
    });
  
  // Хорошо - плоская цепочка промисов
  fetchUser()
    .then(user => {
      return fetchOrders(user.id);
    })
    .then(orders => {
      return fetchProducts(orders);
    })
    .then(products => {
      // Более читаемый код
    });
                </pre>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Состояние интерфейса
  const activeTab = ref('example1');
  const isAnimating = ref(false);
  const isAnimating2 = ref(false);
  const currentStep = ref(0);
  const currentStep2 = ref(0);
  const maxSteps = 5;
  const maxSteps2 = 9;
  
  // Переключение между вкладками
  function setActiveTab(tab) {
    activeTab.value = tab;
    resetAnimations();
  }
  
  // Сброс анимаций
  function resetAnimations() {
    isAnimating.value = false;
    isAnimating2.value = false;
    currentStep.value = 0;
    currentStep2.value = 0;
  }
  
  // Запуск анимации для примера 1
  function runExample1Animation() {
    if (isAnimating.value) {
      // Сброс анимации
      isAnimating.value = false;
      currentStep.value = 0;
    } else {
      // Запуск анимации
      isAnimating.value = true;
      currentStep.value = 1;
    }
  }
  
  // Запуск анимации для примера 2
  function runExample2Animation() {
    if (isAnimating2.value) {
      // Сброс анимации
      isAnimating2.value = false;
      currentStep2.value = 0;
    } else {
      // Запуск анимации
      isAnimating2.value = true;
      currentStep2.value = 1;
    }
  }
  
  // Переход к следующему шагу анимации для примера 1
  function nextStep() {
    if (isAnimating.value && currentStep.value < maxSteps) {
      currentStep.value++;
    }
  }
  
  // Переход к следующему шагу анимации для примера 2
  function nextStep2() {
    if (isAnimating2.value && currentStep2.value < maxSteps2) {
      currentStep2.value++;
    }
  }
  
  // Автоматическая анимация (опционально)
  // watch(isAnimating, (newValue) => {
  //   if (newValue && currentStep.value === 1) {
  //     // Запускаем автоматическую анимацию
  //     const interval = setInterval(() => {
  //       if (currentStep.value < maxSteps) {
  //         currentStep.value++;
  //       } else {
  //         clearInterval(interval);
  //       }
  //     }, 2000);
  //   }
  // });
  
  // watch(isAnimating2, (newValue) => {
  //   if (newValue && currentStep2.value === 1) {
  //     // Запускаем автоматическую анимацию
  //     const interval = setInterval(() => {
  //       if (currentStep2.value < maxSteps2) {
  //         currentStep2.value++;
  //       } else {
  //         clearInterval(interval);
  //       }
  //     }, 1500);
  //   }
  // });
  </script>
  
  <style scoped>
  /* Общие стили */
  .promise-visualizer {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    color: #333;
  }
  
  .main-title {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
  }
  
  /* Стили для вкладок */
  .tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    gap: 10px;
  }
  
  .tab-button {
    padding: 10px 20px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
  }
  
  .tab-button:hover {
    background-color: #e9e9e9;
  }
  
  .tab-button.active {
    background-color: #4a6fa5;
    color: white;
    border-color: #4a6fa5;
  }
  
  /* Стили для содержимого вкладок */
  .tab-panel {
    animation: fadeIn 0.5s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Стили для секции с кодом */
  .code-section {
    margin-bottom: 30px;
  }
  
  .code-block {
    background-color: #1e1e1e;
    color: #d4d4d4;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', monospace;
    line-height: 1.5;
    white-space: pre;
  }
  
  .code-block.small {
    font-size: 14px;
  }
  
  .controls {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }
  
  .control-button {
    padding: 8px 16px;
    background-color: #4a6fa5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .control-button:hover {
    background-color: #3a5a8a;
  }
  
  .control-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  /* Стили для визуализации */
  .visualization-section {
    margin-bottom: 30px;
  }
  
  .visualization-container {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .promise-chain {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 30px;
  }
  
  .promise-box {
    border: 2px solid #ddd;
    border-radius: 6px;
    padding: 10px;
    background-color: white;
    transition: all 0.5s ease;
    opacity: 0.7;
  }
  
  .promise-box.active {
    opacity: 1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .promise-box.completed {
    border-color: #4CAF50;
  }
  
  .promise-box.skipped {
    background-color: #f5f5f5;
    border-color: #ddd;
    opacity: 0.6;
  }
  
  .promise-box.then {
    border-left: 5px solid #2196F3;
  }
  
  .promise-box.catch {
    border-left: 5px solid #FF5722;
  }
  
  .promise-box.reject {
    border-left: 5px solid #F44336;
  }
  
  .promise-box.resolve {
    border-left: 5px solid #4CAF50;
  }
  
  .promise-title {
    font-weight: bold;
    margin-bottom: 8px;
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', monospace;
  }
  
  .promise-value {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 14px;
    color: #666;
  }
  
  .promise-arrow {
    width: 2px;
    height: 20px;
    background-color: #ddd;
    margin: 0 auto;
  }
  
  /* Стили для консоли */
  .console-output {
    margin-top: 20px;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .console-header {
    background-color: #2d2d2d;
    color: white;
    padding: 8px 12px;
    font-size: 14px;
  }
  
  .console-content {
    background-color: #1e1e1e;
    color: #d4d4d4;
    min-height: 50px;
    padding: 12px;
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', monospace;
  }
  
  .console-line {
    color: #9CDCFE;
  }
  
  /* Стили для объяснений и выводов */
  .explanation-box {
    background-color: #f0f4f8;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
  }
  
  .explanation-box h3 {
    margin-top: 0;
    color: #2c3e50;
  }
  
  .summary-box {
    background-color: #e8f5e9;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
    border-left: 5px solid #4CAF50;
  }
  
  .summary-box h3 {
    margin-top: 0;
    color: #2c3e50;
  }
  
  .summary-box ul {
    margin-bottom: 0;
  }
  
  .summary-box li {
    margin-bottom: 8px;
  }
  
  /* Стили для секции теории */
  .theory-section {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .theory-section h3 {
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 15px;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
  }
  
  .theory-section ol, .theory-section ul {
    padding-left: 20px;
  }
  
  .theory-section li {
    margin-bottom: 10px;
  }
  
  .use-case {
    margin-bottom: 25px;
  }
  
  .use-case h4 {
    margin-bottom: 10px;
    color: #455a64;
  }
  
  /* Цветовые обозначения состояний */
  .pending-text {
    color: #ff9800;
    font-weight: bold;
  }
  
  .resolved-text {
    color: #4CAF50;
    font-weight: bold;
  }
  
  .rejected-text {
    color: #F44336;
    font-weight: bold;
  }
  
  /* Адаптивный дизайн */
  @media (max-width: 768px) {
    .tabs {
      flex-direction: column;
    }
    
    .tab-button {
      width: 100%;
      margin-bottom: 5px;
    }
    
    .controls {
      flex-direction: column;
    }
    
    .control-button {
      width: 100%;
    }
  }
  </style>