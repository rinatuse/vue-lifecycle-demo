<template>
    <div class="promise-all-tutorial">
      <h1>Реализация customPromiseAll()</h1>
      <p class="intro">Разбираемся, как работает Promise.all() и создаём свою реализацию с нуля</p>
      
      <div class="content-wrapper">
        <!-- Секция с описанием задачи -->
        <section class="task-description">
          <h2>Задача</h2>
          <div class="task-card">
            <p>Реализуйте функцию <code>customPromiseAll(promises)</code>, которая работает подобно <code>Promise.all()</code>.</p>
            <p>Функция должна принимать массив промисов и возвращать промис, который разрешается массивом результатов исходных промисов.</p>
            
            <div class="code-example">
              <pre><code>// Пример использования
  const promise1 = Promise.resolve(1);
  const promise2 = Promise.resolve(2);
  const promise3 = Promise.resolve(3);
  
  customPromiseAll([promise1, promise2, promise3])
    .then((results) => console.log(results)) // [1, 2, 3]
    .catch((error) => console.error(error));</code></pre>
            </div>
          </div>
        </section>
        
        <!-- Навигация по разделам -->
        <div class="section-nav">
          <button 
            v-for="(section, index) in sections" 
            :key="section.id"
            @click="currentSection = index"
            :class="{ active: currentSection === index }"
          >
            {{ section.title }}
          </button>
        </div>
        
        <!-- Основное содержимое -->
        <div class="main-content">
          <!-- Что такое Promise.all -->
          <section v-if="currentSection === 0" class="fade-in">
            <h2>Что такое Promise.all()?</h2>
            <p>Promise.all() — это статический метод класса Promise, который принимает итерируемый объект промисов и возвращает новый промис.</p>
            
            <div class="info-block">
              <p><strong>Основные особенности Promise.all():</strong></p>
              <ul>
                <li>Возвращает промис, который выполняется, когда все промисы в исходном массиве выполнены</li>
                <li>Результатом является массив значений всех промисов в том же порядке, что и исходные промисы</li>
                <li>Если хотя бы один промис отклоняется, весь Promise.all() немедленно отклоняется с ошибкой этого промиса</li>
                <li>Если передан пустой массив, немедленно возвращается выполненный промис с пустым массивом</li>
              </ul>
            </div>
            
            <div class="visualization-block">
              <h3>Визуализация работы Promise.all()</h3>
              <div class="promise-visualization">
                <div class="promises-container">
                  <div class="promise-block" 
                    v-for="(promise, i) in visualPromises" 
                    :key="i"
                    :class="{'completed': promise.status === 'fulfilled', 'rejected': promise.status === 'rejected', 'pending': promise.status === 'pending'}"
                  >
                    <div class="promise-header">Promise {{ i + 1 }}</div>
                    <div class="promise-body">
                      <div class="promise-value">{{ promise.status === 'pending' ? '...' : promise.value }}</div>
                      <div class="promise-status">{{ promise.status }}</div>
                    </div>
                  </div>
                </div>
                
                <div class="promise-all-block" :class="{'completed': allStatus === 'fulfilled', 'rejected': allStatus === 'rejected', 'pending': allStatus === 'pending'}">
                  <div class="promise-header">Promise.all()</div>
                  <div class="promise-body">
                    <div class="promise-value">{{ allStatus === 'fulfilled' ? JSON.stringify(allResults) : allStatus === 'rejected' ? 'Error: ' + allError : '...' }}</div>
                    <div class="promise-status">{{ allStatus }}</div>
                  </div>
                </div>
              </div>
              
              <div class="controls">
                <button @click="resetVisualization">Сбросить</button>
                <button @click="runVisualization">Запустить</button>
                <button @click="addRejected" :disabled="isRunning">Добавить отклонённый промис</button>
              </div>
            </div>
          </section>
          
          <!-- Алгоритм решения -->
          <section v-if="currentSection === 1" class="fade-in">
            <h2>Алгоритм решения</h2>
            <p>Для реализации customPromiseAll() необходимо выполнить следующие шаги:</p>
            
            <div class="algorithm-steps">
              <div class="step" :class="{ active: currentAlgoStep >= 1 }">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h3>Создание нового промиса</h3>
                  <p>Функция должна возвращать новый промис, который будет разрешен, когда все промисы в массиве будут выполнены.</p>
                  <div class="code-block">
                    <pre><code>function customPromiseAll(promises) {
    return new Promise((resolve, reject) => {
      // Дальнейшая логика
    });
  }</code></pre>
                  </div>
                </div>
              </div>
              
              <div class="step" :class="{ active: currentAlgoStep >= 2 }">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h3>Проверка пустого массива</h3>
                  <p>Если передан пустой массив, сразу возвращаем разрешенный промис с пустым массивом.</p>
                  <div class="code-block">
                    <pre><code>if (promises.length === 0) {
    resolve([]);
    return;
  }</code></pre>
                  </div>
                </div>
              </div>
              
              <div class="step" :class="{ active: currentAlgoStep >= 3 }">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h3>Подготовка для отслеживания результатов</h3>
                  <p>Создаем массив для хранения результатов и счетчик завершенных промисов.</p>
                  <div class="code-block">
                    <pre><code>const results = new Array(promises.length);
  let completedPromises = 0;</code></pre>
                  </div>
                </div>
              </div>
              
              <div class="step" :class="{ active: currentAlgoStep >= 4 }">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h3>Обработка каждого промиса</h3>
                  <p>Перебираем массив промисов и обрабатываем каждый из них.</p>
                  <div class="code-block">
                    <pre><code>promises.forEach((promise, index) => {
    Promise.resolve(promise) // Обрабатываем даже не-промисы
      .then(result => {
        // Обработка успешного выполнения
      })
      .catch(error => {
        // Обработка ошибки
      });
  });</code></pre>
                  </div>
                </div>
              </div>
              
              <div class="step" :class="{ active: currentAlgoStep >= 5 }">
                <div class="step-number">5</div>
                <div class="step-content">
                  <h3>Сохранение результатов</h3>
                  <p>При успешном выполнении промиса сохраняем его результат в соответствующей позиции массива.</p>
                  <div class="code-block">
                    <pre><code>.then(result => {
    // Сохраняем результат в нужной позиции
    results[index] = result;
    completedPromises++;
    
    // Если все промисы выполнены, возвращаем результаты
    if (completedPromises === promises.length) {
      resolve(results);
    }
  })</code></pre>
                  </div>
                </div>
              </div>
              
              <div class="step" :class="{ active: currentAlgoStep >= 6 }">
                <div class="step-number">6</div>
                <div class="step-content">
                  <h3>Обработка ошибок</h3>
                  <p>Если любой из промисов отклоняется, немедленно отклоняем весь промис с той же ошибкой.</p>
                  <div class="code-block">
                    <pre><code>.catch(error => {
    // При первой же ошибке отклоняем весь промис
    reject(error);
  });</code></pre>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="algo-controls">
              <button @click="prevAlgoStep" :disabled="currentAlgoStep <= 0">Предыдущий шаг</button>
              <button @click="nextAlgoStep" :disabled="currentAlgoStep >= 6">Следующий шаг</button>
              <button @click="resetAlgoSteps">Сбросить</button>
            </div>
            
            <div class="final-solution">
              <h3>Полное решение</h3>
              <div class="code-block solution">
                <pre><code>function customPromiseAll(promises) {
    return new Promise((resolve, reject) => {
      // Если передан пустой массив, сразу возвращаем пустой массив результатов
      if (promises.length === 0) {
        resolve([]);
        return;
      }
      
      const results = new Array(promises.length);
      let completedPromises = 0;
      
      // Обрабатываем каждый промис
      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then(result => {
            // Сохраняем результат в соответствующей позиции
            results[index] = result;
            completedPromises++;
            
            // Если все промисы завершены, разрешаем наш промис с массивом результатов
            if (completedPromises === promises.length) {
              resolve(results);
            }
          })
          .catch(error => {
            // Если хотя бы один промис отклонён, отклоняем весь промис
            reject(error);
          });
      });
    });
  }</code></pre>
              </div>
            </div>
          </section>
          
          <!-- Практическое применение -->
          <section v-if="currentSection === 2" class="fade-in">
            <h2>Практическое применение</h2>
            <p>Promise.all() и его кастомная реализация имеют множество практических применений в реальной разработке.</p>
            
            <div class="use-cases">
              <div class="use-case">
                <h3>1. Параллельная загрузка данных</h3>
                <div class="use-case-content">
                  <p>Одновременная загрузка данных из нескольких источников и их обработка только после загрузки всех данных.</p>
                  <div class="code-example">
                    <pre><code>// Получение данных пользователя, его заказов и корзины
  async function loadUserData(userId) {
    const [userData, orders, cart] = await customPromiseAll([
      fetch(`/api/users/${userId}`).then(r => r.json()),
      fetch(`/api/users/${userId}/orders`).then(r => r.json()),
      fetch(`/api/users/${userId}/cart`).then(r => r.json())
    ]);
    
    // Теперь у нас есть все данные для отображения профиля
    renderUserProfile(userData, orders, cart);
  }</code></pre>
                  </div>
                </div>
              </div>
              
              <div class="use-case">
                <h3>2. Обработка массива данных параллельно</h3>
                <div class="use-case-content">
                  <p>Применение асинхронной функции к каждому элементу массива и ожидание завершения всех операций.</p>
                  <div class="code-example">
                    <pre><code>// Загрузка изображений для галереи
  async function loadGalleryImages(imageUrls) {
    const imagePromises = imageUrls.map(url => 
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = url;
      })
    );
    
    const loadedImages = await customPromiseAll(imagePromises);
    return loadedImages;
  }</code></pre>
                  </div>
                </div>
              </div>
              
              <div class="use-case">
                <h3>3. Асинхронная инициализация приложения</h3>
                <div class="use-case-content">
                  <p>Запуск приложения только после завершения всех необходимых асинхронных операций.</p>
                  <div class="code-example">
                    <pre><code>// Инициализация приложения
  async function initApp() {
    try {
      const [config, userSession, translations] = await customPromiseAll([
        loadAppConfig(),
        checkUserAuthentication(),
        loadTranslations(userLocale)
      ]);
      
      startApplication(config, userSession, translations);
    } catch (error) {
      showErrorScreen(error);
    }
  }</code></pre>
                  </div>
                </div>
              </div>
              
              <div class="use-case">
                <h3>4. Валидация данных формы</h3>
                <div class="use-case-content">
                  <p>Асинхронная проверка различных полей формы и возврат всех ошибок.</p>
                  <div class="code-example">
                    <pre><code>// Валидация формы регистрации
  async function validateForm(formData) {
    const validations = [
      validateUsername(formData.username),
      validateEmail(formData.email),
      checkPasswordStrength(formData.password),
      checkEmailNotRegistered(formData.email)
    ];
    
    const results = await customPromiseAll(validations);
    return results.every(isValid => isValid);
  }</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <!-- Подводные камни -->
          <section v-if="currentSection === 3" class="fade-in">
            <h2>Подводные камни</h2>
            <p>При использовании Promise.all() и нашей реализации customPromiseAll() важно учитывать несколько особенностей:</p>
            
            <div class="pitfalls">
              <div class="pitfall">
                <h3>1. Одна ошибка отклоняет весь Promise.all()</h3>
                <div class="pitfall-content">
                  <p>Если хотя бы один промис из массива отклоняется, то весь Promise.all() немедленно отклоняется с этой ошибкой, даже если другие промисы еще выполняются или уже выполнились.</p>
                  <div class="solution-tip">
                    <h4>Решение:</h4>
                    <p>Используйте Promise.allSettled(), чтобы получить результаты всех промисов, независимо от их статуса.</p>
                    <div class="code-example">
                      <pre><code>// Получаем результаты всех промисов
  const results = await Promise.allSettled([
    fetch('/api/data1').then(r => r.json()),
    fetch('/api/data2').then(r => r.json()),
    fetch('/api/data3').then(r => r.json())
  ]);
  
  // Обрабатываем результаты
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Промис ${index} выполнен:`, result.value);
    } else {
      console.log(`Промис ${index} отклонен:`, result.reason);
    }
  });</code></pre>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="pitfall">
                <h3>2. Порядок выполнения vs. порядок результатов</h3>
                <div class="pitfall-content">
                  <p>Промисы могут завершаться в любом порядке, не обязательно в том, в котором они были переданы. Однако результаты в массиве всегда соответствуют порядку исходных промисов.</p>
                  <div class="visualization-block">
                    <div class="order-visualization">
                      <div class="promises-timing">
                        <div class="promise-time-block">
                          <div class="promise-label">Promise 1 (200ms)</div>
                          <div class="promise-time-bar" :style="{ width: `${promise1Progress}%` }"></div>
                        </div>
                        <div class="promise-time-block">
                          <div class="promise-label">Promise 2 (500ms)</div>
                          <div class="promise-time-bar" :style="{ width: `${promise2Progress}%` }"></div>
                        </div>
                        <div class="promise-time-block">
                          <div class="promise-label">Promise 3 (100ms)</div>
                          <div class="promise-time-bar" :style="{ width: `${promise3Progress}%` }"></div>
                        </div>
                      </div>
                      <div class="result-order" v-if="showResultOrder">
                        <div class="result-header">Порядок выполнения: Promise 3 → Promise 1 → Promise 2</div>
                        <div class="result-header">Порядок в массиве результатов: [результат1, результат2, результат3]</div>
                      </div>
                      <button @click="demonstrateTiming" :disabled="isTimingDemo">Запустить демонстрацию</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="pitfall">
                <h3>3. Обработка не-промисов</h3>
                <div class="pitfall-content">
                  <p>Promise.all() обрабатывает не только промисы, но и обычные значения в массиве, оборачивая их в Promise.resolve().</p>
                  <div class="code-example">
                    <pre><code>// Смесь промисов и обычных значений
  const mixedValues = [
    Promise.resolve('промис'),
    'обычная строка',
    42,
    Promise.resolve(true)
  ];
  
  // Все значения будут обработаны
  customPromiseAll(mixedValues)
    .then(results => console.log(results)); // ['промис', 'обычная строка', 42, true]</code></pre>
                  </div>
                  <p class="note">Поэтому в реализации customPromiseAll мы используем Promise.resolve(promise) для обработки любых значений.</p>
                </div>
              </div>
              
              <div class="pitfall">
                <h3>4. Потенциальная утечка памяти</h3>
                <div class="pitfall-content">
                  <p>При работе с большим количеством промисов в Promise.all() есть риск утечки памяти, если некоторые промисы зависают или выполняются очень долго.</p>
                  <div class="solution-tip">
                    <h4>Решение:</h4>
                    <p>Используйте таймауты для промисов, чтобы гарантировать их завершение.</p>
                    <div class="code-example">
                      <pre><code>// Функция для создания промиса с таймаутом
  function promiseWithTimeout(promise, timeout) {
    return Promise.race([
      promise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), timeout)
      )
    ]);
  }
  
  // Использование с Promise.all
  customPromiseAll([
    promiseWithTimeout(fetch('/api/data1'), 5000),
    promiseWithTimeout(fetch('/api/data2'), 5000),
    promiseWithTimeout(fetch('/api/data3'), 5000)
  ])
    .then(results => console.log(results))
    .catch(error => console.error(error));</code></pre>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="pitfall">
                <h3>5. Последовательное vs. параллельное выполнение</h3>
                <div class="pitfall-content">
                  <p>Promise.all() запускает все промисы параллельно, что не всегда оптимально с точки зрения нагрузки на сервер или клиент.</p>
                  <div class="solution-tip">
                    <h4>Решение:</h4>
                    <p>Для последовательного выполнения промисов используйте цепочку .then() или async/await в цикле.</p>
                    <div class="code-example">
                      <pre><code>// Последовательное выполнение промисов
  async function sequentialExecution(tasks) {
    const results = [];
    
    for (const task of tasks) {
      const result = await task();
      results.push(result);
    }
    
    return results;
  }
  
  // Использование
  sequentialExecution([
    () => fetchData('/api/step1'),
    () => fetchData('/api/step2'),
    () => fetchData('/api/step3')
  ]).then(results => console.log(results));</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <!-- Тестирование решения -->
          <section v-if="currentSection === 4" class="fade-in">
            <h2>Тестирование решения</h2>
            <p>Давайте протестируем нашу реализацию customPromiseAll() на различных сценариях:</p>
            
            <div class="test-cases">
              <div class="test-case" v-for="(test, index) in testCases" :key="index">
                <div class="test-header">
                  <h3>Тест {{ index + 1 }}: {{ test.name }}</h3>
                  <button @click="runTest(index)" :disabled="test.isRunning">Запустить тест</button>
                </div>
                <div class="test-description">{{ test.description }}</div>
                <div class="code-example">
                  <pre><code>{{ test.code }}</code></pre>
                </div>
                <div class="test-result" v-if="test.hasRun">
                  <div class="result-header" :class="test.success ? 'success' : 'error'">
                    {{ test.success ? 'Успех ✓' : 'Ошибка ✗' }}
                  </div>
                  <div class="result-content">
                    <pre>{{ test.result }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive,  onMounted } from 'vue';
  
  // Разделы компонента
  const sections = [
    { id: 'what-is', title: 'Что такое Promise.all()' },
    { id: 'algorithm', title: 'Алгоритм решения' },
    { id: 'applications', title: 'Практическое применение' },
    { id: 'pitfalls', title: 'Подводные камни' },
    { id: 'testing', title: 'Тестирование решения' }
  ];
  const currentSection = ref(0);
  
  // Для визуализации Promise.all()
  const visualPromises = reactive([
    { status: 'pending', value: null, delay: 1000 },
    { status: 'pending', value: null, delay: 2000 },
    { status: 'pending', value: null, delay: 1500 }
  ]);
  const allStatus = ref('pending');
  const allResults = ref([]);
  const allError = ref('');
  const isRunning = ref(false);
  
  // Запуск визуализации Promise.all()
  function runVisualization() {
    if (isRunning.value) return;
    
    isRunning.value = true;
    allStatus.value = 'pending';
    allResults.value = [];
    allError.value = '';
    
    // Устанавливаем начальные значения
    visualPromises.forEach((p, index) => {
      p.status = 'pending';
      p.value = `Значение ${index + 1}`;
    });
    
    // Запускаем таймеры для симуляции выполнения промисов
    const promises = visualPromises.map((promise, index) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (promise.status === 'rejected') {
            reject(new Error(`Ошибка в промисе ${index + 1}`));
          } else {
            promise.status = 'fulfilled';
            resolve(promise.value);
          }
        }, promise.delay);
      });
    });
    
    // Обрабатываем промисы через Promise.all()
    Promise.all(promises)
      .then((results) => {
        allStatus.value = 'fulfilled';
        allResults.value = results;
        isRunning.value = false;
      })
      .catch((error) => {
        allStatus.value = 'rejected';
        allError.value = error.message;
        isRunning.value = false;
      });
  }
  
  // Сброс визуализации
  function resetVisualization() {
    isRunning.value = false;
    allStatus.value = 'pending';
    allResults.value = [];
    allError.value = '';
    
    visualPromises.forEach((p, index) => {
      p.status = 'pending';
      p.value = null;
      p.delay = 1000 + (index * 500);
    });
  }
  
  // Добавление отклоненного промиса
  function addRejected() {
    if (isRunning.value) return;
    
    // Ищем первый не отклоненный промис
    const index = visualPromises.findIndex(p => p.status !== 'rejected');
    if (index >= 0) {
      visualPromises[index].status = 'rejected';
    }
  }
  
  // Для пошагового объяснения алгоритма
  const currentAlgoStep = ref(0);
  
  function nextAlgoStep() {
    if (currentAlgoStep.value < 6) {
      currentAlgoStep.value++;
    }
  }
  
  function prevAlgoStep() {
    if (currentAlgoStep.value > 0) {
      currentAlgoStep.value--;
    }
  }
  
  function resetAlgoSteps() {
    currentAlgoStep.value = 0;
  }
  
  // Для демонстрации порядка выполнения
  const promise1Progress = ref(0);
  const promise2Progress = ref(0);
  const promise3Progress = ref(0);
  const showResultOrder = ref(false);
  const isTimingDemo = ref(false);
  
  function demonstrateTiming() {
    if (isTimingDemo.value) return;
    
    isTimingDemo.value = true;
    showResultOrder.value = false;
    promise1Progress.value = 0;
    promise2Progress.value = 0;
    promise3Progress.value = 0;
    
    // Анимация выполнения первого промиса (200ms)
    const animate1 = setInterval(() => {
      promise1Progress.value += 5;
      if (promise1Progress.value >= 100) {
        clearInterval(animate1);
      }
    }, 10); // 200ms / 5% = 10ms per step
    
    // Анимация выполнения второго промиса (500ms)
    const animate2 = setInterval(() => {
      promise2Progress.value += 2;
      if (promise2Progress.value >= 100) {
        clearInterval(animate2);
      }
    }, 10); // 500ms / 2% = 10ms per step
    
    // Анимация выполнения третьего промиса (100ms)
    const animate3 = setInterval(() => {
      promise3Progress.value += 10;
      if (promise3Progress.value >= 100) {
        clearInterval(animate3);
      }
    }, 10); // 100ms / 10% = 10ms per step
    
    // Показываем результат после завершения анимации
    setTimeout(() => {
      showResultOrder.value = true;
      isTimingDemo.value = false;
    }, 600);
  }
  
  // Для тестирования решения
  const testCases = reactive([
    {
      name: "Базовый сценарий с обычными промисами",
      description: "Проверка работы с массивом промисов, которые успешно разрешаются.",
      code: `const promise1 = Promise.resolve(1);
  const promise2 = Promise.resolve(2);
  const promise3 = Promise.resolve(3);
  
  customPromiseAll([promise1, promise2, promise3])
    .then(results => console.log(results))
    .catch(error => console.error(error));`,
      isRunning: false,
      hasRun: false,
      success: false,
      result: null
    },
    {
      name: "Обработка пустого массива",
      description: "Проверка корректной обработки пустого массива промисов.",
      code: `customPromiseAll([])
    .then(results => console.log(results))
    .catch(error => console.error(error));`,
      isRunning: false,
      hasRun: false,
      success: false,
      result: null
    },
    {
      name: "Смешанные значения и промисы",
      description: "Проверка работы с массивом, содержащим как промисы, так и обычные значения.",
      code: `customPromiseAll([Promise.resolve(1), 2, 'строка', Promise.resolve(true)])
    .then(results => console.log(results))
    .catch(error => console.error(error));`,
      isRunning: false,
      hasRun: false,
      success: false,
      result: null
    },
    {
      name: "Обработка отклоненных промисов",
      description: "Проверка поведения при наличии отклоненных промисов.",
      code: `const promise1 = Promise.resolve(1);
  const promise2 = Promise.reject(new Error('Что-то пошло не так'));
  const promise3 = Promise.resolve(3);
  
  customPromiseAll([promise1, promise2, promise3])
    .then(results => console.log(results))
    .catch(error => console.error(error));`,
      isRunning: false,
      hasRun: false,
      success: false,
      result: null
    },
    {
      name: "Асинхронные промисы",
      description: "Проверка работы с промисами, которые разрешаются в разное время.",
      code: `const promise1 = new Promise(resolve => setTimeout(() => resolve(1), 300));
  const promise2 = new Promise(resolve => setTimeout(() => resolve(2), 100));
  const promise3 = new Promise(resolve => setTimeout(() => resolve(3), 200));
  
  customPromiseAll([promise1, promise2, promise3])
    .then(results => console.log(results))
    .catch(error => console.error(error));`,
      isRunning: false,
      hasRun: false,
      success: false,
      result: null
    }
  ]);
  
  // Реализация функции customPromiseAll
  function _customPromiseAll(promises) {
    return new Promise((resolve, reject) => {
      // Если передан пустой массив, сразу возвращаем пустой массив результатов
      if (promises.length === A) {
        resolve([]);
        return;
      }
      
      const results = new Array(promises.length);
      let completedPromises = 0;
      
      // Обрабатываем каждый промис
      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then(result => {
            // Сохраняем результат в соответствующей позиции
            results[index] = result;
            completedPromises++;
            
            // Если все промисы завершены, разрешаем наш промис с массивом результатов
            if (completedPromises === promises.length) {
              resolve(results);
            }
          })
          .catch(error => {
            // Если хотя бы один промис отклонён, отклоняем весь промис
            reject(error);
          });
      });
    });
  }
  
  // Исправленная версия для тестов
  function fixedCustomPromiseAll(promises) {
    return new Promise((resolve, reject) => {
      if (promises.length === 0) {
        resolve([]);
        return;
      }
      
      const results = new Array(promises.length);
      let completedPromises = 0;
      
      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then(result => {
            results[index] = result;
            completedPromises++;
            
            if (completedPromises === promises.length) {
              resolve(results);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  }
  
  // Запуск тестового примера
  function runTest(index) {
    const test = testCases[index];
    if (test.isRunning) return;
    
    test.isRunning = true;
    test.hasRun = false;
    test.result = 'Выполняется...';
    
    // Создаем логи в отдельную переменную
    const logs = [];
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    
    console.log = (...args) => {
      logs.push(`log: ${args.map(arg => JSON.stringify(arg)).join(', ')}`);
    };
    
    console.error = (...args) => {
      logs.push(`error: ${args.map(arg => arg instanceof Error ? arg.message : JSON.stringify(arg)).join(', ')}`);
    };
    
    // Оборачиваем в try-catch для отлова ошибок синтаксиса
    try {
      // Создаем новую функцию для выполнения теста
      const testFunction = new Function('customPromiseAll', `
        ${test.code.replace('customPromiseAll', 'return customPromiseAll')}
      `);
      
      // Запускаем с исправленной версией функции
      const result = testFunction(fixedCustomPromiseAll);
      
      // Обрабатываем результат промиса
      if (result instanceof Promise) {
        result
          .then(() => {
            setTimeout(() => {
              test.result = logs.join('\n');
              test.success = !logs.some(log => log.startsWith('error:'));
              test.isRunning = false;
              test.hasRun = true;
              
              // Восстанавливаем консоль
              console.log = originalConsoleLog;
              console.error = originalConsoleError;
            }, 500);
          })
          .catch((error) => {
            logs.push(`Неожиданная ошибка: ${error.message}`);
            test.result = logs.join('\n');
            test.success = false;
            test.isRunning = false;
            test.hasRun = true;
            
            // Восстанавливаем консоль
            console.log = originalConsoleLog;
            console.error = originalConsoleError;
          });
      } else {
        logs.push('Ошибка: тест не вернул промис');
        test.result = logs.join('\n');
        test.success = false;
        test.isRunning = false;
        test.hasRun = true;
        
        // Восстанавливаем консоль
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
      }
      
    } catch (error) {
      logs.push(`Ошибка выполнения: ${error.message}`);
      test.result = logs.join('\n');
      test.success = false;
      test.isRunning = false;
      test.hasRun = true;
      
      // Восстанавливаем консоль
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
    }
  }
  
  onMounted(() => {
    // Инициализация компонента
    setTimeout(() => {
      currentAlgoStep.value = 1;
    }, 500);
  });
  </script>
  
  <style scoped>
  .promise-all-tutorial {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    color: #333;
  }
  
  h1 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  
  h2 {
    font-size: 1.75rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 0.5rem;
  }
  
  h3 {
    font-size: 1.4rem;
    margin-top: 1.2rem;
    margin-bottom: 0.8rem;
    color: #2c3e50;
  }
  
  h4 {
    font-size: 1.1rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: #2c3e50;
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .intro {
    text-align: center;
    font-size: 1.2rem;
    color: #7f8c8d;
    margin-bottom: 2rem;
  }
  
  .content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  /* Стили для карточки задачи */
  .task-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }
  
  /* Стили для кода */
  .code-block, .code-example {
    background-color: #282c34;
    border-radius: 6px;
    padding: 15px;
    overflow-x: auto;
    margin: 15px 0;
  }
  
  .code-block pre, .code-example pre {
    margin: 0;
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    color: #abb2bf;
  }
  
  .code-block.solution {
    background-color: #2e3440;
    border-left: 4px solid #81a1c1;
  }
  
  code {
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    background-color: #f1f1f1;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 0.9em;
    color: #e74c3c;
  }
  
  /* Стили для разделов навигации */
  .section-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .section-nav button {
    padding: 10px 15px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
    color: #495057;
  }
  
  .section-nav button:hover {
    background-color: #e9ecef;
  }
  
  .section-nav button.active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }
  
  /* Стили для основного содержимого */
  .main-content {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 25px;
  }
  
  /* Анимация перехода между разделами */
  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Стили для информационных блоков */
  .info-block {
    background-color: #e8f4f8;
    border-left: 4px solid #3498db;
    padding: 15px;
    border-radius: 0 6px 6px 0;
    margin: 20px 0;
  }
  
  .info-block ul {
    padding-left: 20px;
    margin: 10px 0;
  }
  
  .info-block li {
    margin-bottom: 8px;
    line-height: 1.5;
  }
  
  /* Стили для визуализации промисов */
  .visualization-block {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .promise-visualization {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    margin: 20px 0;
  }
  
  .promises-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .promise-block {
    width: 180px;
    background-color: #fff;
    border: 2px solid #f1c40f;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .promise-block.completed {
    border-color: #2ecc71;
  }
  
  .promise-block.rejected {
    border-color: #e74c3c;
  }
  
  .promise-header {
    background-color: #f1c40f;
    color: white;
    padding: 8px 12px;
    font-weight: bold;
    text-align: center;
  }
  
  .promise-block.completed .promise-header {
    background-color: #2ecc71;
  }
  
  .promise-block.rejected .promise-header {
    background-color: #e74c3c;
  }
  
  .promise-body {
    padding: 15px;
    text-align: center;
  }
  
  .promise-value {
    font-family: monospace;
    margin-bottom: 10px;
    min-height: 20px;
  }
  
  .promise-status {
    font-size: 0.9rem;
    font-weight: bold;
    color: #f1c40f;
  }
  
  .promise-block.completed .promise-status {
    color: #2ecc71;
  }
  
  .promise-block.rejected .promise-status {
    color: #e74c3c;
  }
  
  .promise-all-block {
    width: 240px;
    background-color: #fff;
    border: 2px solid #3498db;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .promise-all-block .promise-header {
    background-color: #3498db;
  }
  
  .promise-all-block.completed {
    border-color: #2ecc71;
  }
  
  .promise-all-block.completed .promise-header {
    background-color: #2ecc71;
  }
  
  .promise-all-block.rejected {
    border-color: #e74c3c;
  }
  
  .promise-all-block.rejected .promise-header {
    background-color: #e74c3c;
  }
  
  .controls {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
  }
  
  .controls button {
    padding: 8px 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .controls button:hover {
    background-color: #2980b9;
  }
  
  .controls button:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
  
  /* Стили для шагов алгоритма */
  .algorithm-steps {
    margin: 20px 0;
  }
  
  .step {
    display: flex;
    margin-bottom: 25px;
    opacity: 0.5;
    transform: translateX(-10px);
    transition: all 0.5s ease;
  }
  
  .step.active {
    opacity: 1;
    transform: translateX(0);
  }
  
  .step-number {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    background-color: #3498db;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-weight: bold;
    margin-right: 15px;
    font-size: 1.1rem;
  }
  
  .step-content {
    flex: 1;
  }
  
  .step-content h3 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .algo-controls {
    display: flex;
    gap: 10px;
    margin: 20px 0;
  }
  
  .algo-controls button {
    padding: 8px 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .algo-controls button:hover {
    background-color: #2980b9;
  }
  
  .algo-controls button:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
  
  /* Стили для практических применений */
  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin: 20px 0;
  }
  
  .use-case {
    background-color: #f8f9fa;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .use-case h3 {
    background-color: #3498db;
    color: white;
    margin: 0;
    padding: 15px;
    font-size: 1.1rem;
  }
  
  .use-case-content {
    padding: 15px;
  }
  
  /* Стили для подводных камней */
  .pitfalls {
    margin: 20px 0;
  }
  
  .pitfall {
    background-color: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 25px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .pitfall h3 {
    background-color: #e74c3c;
    color: white;
    margin: 0;
    padding: 15px;
    font-size: 1.1rem;
  }
  
  .pitfall-content {
    padding: 15px;
  }
  
  .solution-tip {
    background-color: #e8f8f5;
    border-left: 4px solid #2ecc71;
    padding: 15px;
    border-radius: 0 6px 6px 0;
    margin: 15px 0;
  }
  
  .note {
    font-style: italic;
    color: #7f8c8d;
  }
  
  /* Стили для демонстрации порядка выполнения */
  .order-visualization {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .promises-timing {
    margin: 20px 0;
  }
  
  .promise-time-block {
    margin-bottom: 15px;
  }
  
  .promise-label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .promise-time-bar {
    height: 20px;
    background-color: #3498db;
    border-radius: 4px;
    transition: width 0.5s linear;
  }
  
  .result-order {
    margin: 20px 0;
    padding: 15px;
    background-color: #e8f4f8;
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    animation: fadeIn 0.5s ease;
  }
  
  .result-header {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  /* Стили для тестирования */
  .test-cases {
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin: 20px 0;
  }
  
  .test-case {
    background-color: #f8f9fa;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .test-header {
    background-color: #3498db;
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .test-header h3 {
    margin: 0;
    color: white;
    font-size: 1.1rem;
  }
  
  .test-header button {
    padding: 6px 12px;
    background-color: white;
    color: #3498db;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
  }
  
  .test-header button:hover {
    background-color: #f1f1f1;
  }
  
  .test-header button:disabled {
    background-color: #d1d1d1;
    cursor: not-allowed;
  }
  
  .test-description {
    padding: 15px;
    background-color: #e8f4f8;
    font-style: italic;
  }
  
  .test-result {
    padding: 15px;
    background-color: #f8f9fa;
    border-top: 1px solid #dee2e6;
    animation: fadeIn 0.5s ease;
  }
  
  .result-header {
    font-weight: bold;
    margin-bottom: 10px;
    padding: 8px 12px;
    border-radius: 4px;
  }
  
  .result-header.success {
    background-color: #d4edda;
    color: #155724;
  }
  
  .result-header.error {
    background-color: #f8d7da;
    color: #721c24;
  }
  
  .result-content {
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 4px;
    font-family: monospace;
    white-space: pre-wrap;
    max-height: 200px;
    overflow-y: auto;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .promises-container {
      flex-direction: column;
      align-items: center;
    }
    
    .promise-block, .promise-all-block {
      width: 100%;
      max-width: 300px;
    }
    
    .use-cases {
      grid-template-columns: 1fr;
    }
    
    .section-nav button {
      flex: 1 0 calc(50% - 10px);
    }
  }
  
  @media (max-width: 480px) {
    .step {
      flex-direction: column;
    }
    
    .step-number {
      margin-bottom: 10px;
    }
    
    .section-nav button {
      flex: 1 0 100%;
    }
  }
  </style>