<template>
    <div class="promise-methods-container">
      <h1 class="main-title">Реализация Promise.all и Promise.allSettled</h1>
      
      <section class="intro-section">
        <h2>Введение в Promise API</h2>
        <p>В JavaScript асинхронный код часто работает с промисами. Встроенные методы <code>Promise.all</code> и <code>Promise.allSettled</code> помогают управлять множеством промисов одновременно, но как они устроены внутри?</p>
        <p>Сегодня мы реализуем собственные версии этих методов и наглядно продемонстрируем, как они работают.</p>
      </section>
      
      <div class="tabs">
        <div 
          v-for="(tab, index) in tabs" 
          :key="tab.id"
          :class="['tab', { active: activeTab === index }]"
          @click="activeTab = index"
        >
          {{ tab.name }}
        </div>
      </div>
      
      <!-- Tab 1: Promise.all -->
      <div v-if="activeTab === 0" class="tab-content">
        <section class="theory-section">
          <h2>Promise.all - Что это такое?</h2>
          <div class="description">
            <p><code>Promise.all</code> принимает массив промисов и возвращает новый промис, который:</p>
            <ul>
              <li>Разрешается, когда <strong>все</strong> промисы в массиве разрешены</li>
              <li>Возвращает массив результатов всех промисов <strong>в том же порядке</strong></li>
              <li>Отклоняется, если <strong>хотя бы один</strong> из промисов отклоняется</li>
            </ul>
            <div class="theory-illustration">
              <div class="promise-schema">
                <div class="input-promises">
                  <div class="promise promise-1">Promise 1</div>
                  <div class="promise promise-2">Promise 2</div>
                  <div class="promise promise-3">Promise 3</div>
                </div>
                <div class="promise-processor">
                  <div class="processor-label">Promise.all</div>
                  <div class="processor-arrow">⟹</div>
                </div>
                <div class="output-promise">
                  <div class="output-label">Результат</div>
                  <div class="output-content">[результат1, результат2, результат3]</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section class="code-section">
          <h2>Реализация Promise.all</h2>
          <div class="code-container">
            <pre class="code"><code>const promiseAll = (promises) => {
    const results = [];
    let resolvedCount = 0;
    
    return new Promise((resolve, reject) => {
      // Если массив пустой, возвращаем пустой массив результатов
      if (promises.length === 0) {
        resolve(results);
        return;
      }
      
      // Перебираем все промисы
      promises.forEach((promise, index) => {
        // Обрабатываем каждый промис
        Promise.resolve(promise)
          .then((result) => {
            // Сохраняем результат в том же индексе
            results[index] = result;
            resolvedCount++;
            
            // Если все промисы разрешены, возвращаем результат
            if (resolvedCount === promises.length) {
              resolve(results);
            }
          })
          .catch((error) => {
            // Если хотя бы один промис отклонён, отклоняем весь Promise.all
            reject(error);
          });
      });
    });
  };</code></pre>
          </div>
          
          <div class="explanation">
            <h3>Разбор реализации:</h3>
            <ol>
              <li>
                <strong>Создаём структуру данных</strong>: Массив <code>results</code> для хранения результатов и счетчик <code>resolvedCount</code>.
              </li>
              <li>
                <strong>Возвращаем новый Promise</strong>: Ключевая часть — мы создаем новый промис, который будет содержать финальный результат.
              </li>
              <li>
                <strong>Обрабатываем пустой массив</strong>: Если массив промисов пуст, сразу возвращаем пустой массив результатов.
              </li>
              <li>
                <strong>Итерация по промисам</strong>: Перебираем каждый промис из входного массива.
              </li>
              <li>
                <strong>Создаём обработчики</strong>: Для каждого промиса устанавливаем обработчики через <code>.then()</code> и <code>.catch()</code>.
              </li>
              <li>
                <strong>Сохраняем результат</strong>: При успешном разрешении промиса, сохраняем результат в массив <code>results</code> под тем же индексом.
              </li>
              <li>
                <strong>Проверяем завершение</strong>: Увеличиваем счётчик и проверяем, все ли промисы разрешены.
              </li>
              <li>
                <strong>Отклоняем при ошибке</strong>: Если хотя бы один промис отклонён, вся цепочка отклоняется.
              </li>
            </ol>
          </div>
        </section>
        
        <section class="animation-section">
          <h2>Визуализация работы Promise.all</h2>
          <div class="animation-container">
            <div class="animation-controls">
              <button @click="startPromiseAllAnimation" :disabled="animationRunning">Запустить</button>
              <button @click="resetAnimation" :disabled="!animationComplete && !animationRunning">Сбросить</button>
            </div>
            
            <div class="animation-stage">
              <div class="promises-list">
                <div 
                  v-for="(promise, index) in allPromises" 
                  :key="'all-' + index"
                  :class="['promise-item', { 
                    'resolved': promise.state === 'resolved',
                    'rejected': promise.state === 'rejected',
                    'pending': promise.state === 'pending'
                  }]"
                >
                  <div class="promise-header">Promise {{ index + 1 }} ({{ promise.time }}ms)</div>
                  <div class="promise-state">{{ getStateText(promise.state) }}</div>
                  <div v-if="promise.state !== 'pending'" class="promise-value">{{ promise.value }}</div>
                  <div class="promise-timer" v-if="promise.state === 'pending' && animationRunning">
                    <div class="timer-fill" :style="{ width: promise.progress + '%' }"></div>
                  </div>
                </div>
              </div>
              
              <div class="animation-result">
                <div class="all-processor" :class="{ 'active': animationRunning }">Promise.all</div>
                <div class="all-status" :class="{ 
                  'resolved': allResult.state === 'resolved',
                  'rejected': allResult.state === 'rejected',
                  'pending': allResult.state === 'pending' && animationRunning
                }">
                  <div v-if="allResult.state === 'pending' && animationRunning">Ожидание...</div>
                  <div v-else-if="allResult.state === 'resolved'">
                    Результат: {{ JSON.stringify(allResult.value) }}
                  </div>
                  <div v-else-if="allResult.state === 'rejected'">
                    Ошибка: {{ allResult.error }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="animation-explanation">
            <h3>Как работает Promise.all</h3>
            <p>1. Все промисы запускаются параллельно</p>
            <p>2. Promise.all отслеживает завершение каждого промиса</p>
            <p>3. Результаты сохраняются в массив в порядке исходного массива промисов <strong>(не в порядке завершения!)</strong></p>
            <p>4. Если все промисы выполнены успешно, Promise.all возвращает массив результатов</p>
            <p>5. Если хотя бы один промис завершается с ошибкой, Promise.all немедленно отклоняется с этой ошибкой</p>
          </div>
        </section>
        
        <section class="pitfalls-section">
          <h2>Подводные камни Promise.all</h2>
          <div class="pitfall-card">
            <div class="pitfall-header">
              <div class="pitfall-icon">⚠️</div>
              <h3>Обработка ошибок</h3>
            </div>
            <p>
              <strong>Подводный камень</strong>: Если хотя бы один промис отклоняется, Promise.all немедленно отклоняется, 
              игнорируя результаты остальных промисов – даже тех, которые уже были успешно выполнены.
            </p>
            <div class="pitfall-example">
              <pre><code>const promises = [
    Promise.resolve(1), // этот выполнится успешно 
    Promise.reject('Ошибка!'), // эта ошибка прервет Promise.all
    new Promise(resolve => setTimeout(() => resolve(3), 1000)) // этот не дождется выполнения
  ];
  
  promiseAll(promises)
    .then(results => console.log('Результаты:', results)) // Не выполнится
    .catch(error => console.error('Поймали ошибку:', error)); // Выведет "Поймали ошибку: Ошибка!"</code></pre>
            </div>
            <p>
              <strong>Решение</strong>: Если вам нужно получить результаты всех промисов, независимо от их статуса,
              используйте <code>Promise.allSettled</code>, который мы рассмотрим далее.
            </p>
          </div>
          
          <div class="pitfall-card">
            <div class="pitfall-header">
              <div class="pitfall-icon">⚠️</div>
              <h3>Порядок результатов</h3>
            </div>
            <p>
              <strong>Подводный камень</strong>: Несмотря на то, что промисы могут завершаться в произвольном порядке,
              результаты в массиве всегда соответствуют порядку входных промисов.
            </p>
            <div class="pitfall-example">
              <pre><code>const fast = new Promise(resolve => setTimeout(() => resolve('Быстрый'), 100));
  const slow = new Promise(resolve => setTimeout(() => resolve('Медленный'), 1000));
  
  promiseAll([slow, fast]).then(results => {
    console.log(results); // ['Медленный', 'Быстрый'] - порядок соответствует входному массиву
    // НЕ ['Быстрый', 'Медленный'], хотя fast завершится раньше
  });</code></pre>
            </div>
            <p>
              <strong>Важно</strong>: Это поведение нужно учитывать при проектировании кода и не предполагать, 
              что результаты будут в порядке завершения промисов.
            </p>
          </div>
        </section>
        
        <section class="real-world-section">
          <h2>Применение Promise.all в реальных задачах</h2>
          <div class="use-cases">
            <div class="use-case">
              <h3>Загрузка данных из нескольких API</h3>
              <p>Одно из самых распространённых применений - параллельная загрузка данных из разных источников:</p>
              <pre><code>// Загрузка информации о пользователе, его заказов и избранных товаров
  async function getUserFullInfo(userId) {
    const [user, orders, favorites] = await Promise.all([
      fetchUserProfile(userId),
      fetchUserOrders(userId),
      fetchUserFavorites(userId)
    ]);
    
    return { user, orders, favorites };
  }</code></pre>
            </div>
            
            <div class="use-case">
              <h3>Обработка коллекций данных</h3>
              <p>Выполнение однотипных операций для коллекции элементов:</p>
              <pre><code>// Загрузка информации о каждом посте
  async function fetchPostsWithComments(postIds) {
    const postsWithComments = await Promise.all(
      postIds.map(async (id) => {
        const post = await fetchPost(id);
        const comments = await fetchComments(id);
        return { ...post, comments };
      })
    );
    
    return postsWithComments;
  }</code></pre>
            </div>
            
            <div class="use-case">
              <h3>Предварительная загрузка ресурсов</h3>
              <p>Одновременная загрузка всех необходимых ресурсов перед отображением интерфейса:</p>
              <pre><code>// Загрузка всех необходимых ресурсов для страницы
  async function preloadPageResources() {
    const [translations, userData, siteConfig] = await Promise.all([
      loadTranslations(),
      fetchUserData(),
      fetchSiteConfig()
    ]);
    
    initializeApp({ translations, userData, siteConfig });
  }</code></pre>
            </div>
          </div>
        </section>
      </div>
      
      <!-- Tab 2: Promise.allSettled -->
      <div v-if="activeTab === 1" class="tab-content">
        <section class="theory-section">
          <h2>Promise.allSettled - Что это такое?</h2>
          <div class="description">
            <p><code>Promise.allSettled</code> похож на <code>Promise.all</code>, но имеет ключевое отличие:</p>
            <ul>
              <li>Ожидает завершения <strong>всех</strong> промисов, независимо от их результата</li>
              <li>Возвращает массив объектов, описывающих результат каждого промиса</li>
              <li>Для успешных промисов: <code>{ status: 'fulfilled', value: результат }</code></li>
              <li>Для отклонённых промисов: <code>{ status: 'rejected', reason: ошибка }</code></li>
              <li><strong>Никогда не отклоняется</strong>, даже если все промисы отклонены</li>
            </ul>
            <div class="theory-illustration">
              <div class="promise-schema">
                <div class="input-promises">
                  <div class="promise promise-success">Promise 1 ✓</div>
                  <div class="promise promise-error">Promise 2 ✗</div>
                  <div class="promise promise-success">Promise 3 ✓</div>
                </div>
                <div class="promise-processor">
                  <div class="processor-label">Promise.allSettled</div>
                  <div class="processor-arrow">⟹</div>
                </div>
                <div class="output-promise settled-output">
                  <div class="output-label">Результат</div>
                  <div class="output-content">[
                    {status: 'fulfilled', value: результат1},
                    {status: 'rejected', reason: ошибка2},
                    {status: 'fulfilled', value: результат3}
                  ]</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section class="code-section">
          <h2>Реализация Promise.allSettled</h2>
          <div class="code-container">
            <pre class="code"><code>const promiseAllSettled = (promises) => {
    const results = [];
    let completedCount = 0;
    
    return new Promise((resolve) => {
      // Если массив пустой, возвращаем пустой массив результатов
      if (promises.length === 0) {
        resolve(results);
        return;
      }
      
      // Перебираем все промисы
      promises.forEach((promise, index) => {
        // Обрабатываем каждый промис
        Promise.resolve(promise)
          .then((value) => {
            // Сохраняем успешный результат
            results[index] = { status: 'fulfilled', value };
            completedCount++;
            
            // Если все промисы завершены, возвращаем результат
            if (completedCount === promises.length) {
              resolve(results);
            }
          })
          .catch((reason) => {
            // Сохраняем отклоненный результат
            results[index] = { status: 'rejected', reason };
            completedCount++;
            
            // Если все промисы завершены, возвращаем результат
            if (completedCount === promises.length) {
              resolve(results);
            }
          });
      });
    });
  };</code></pre>
          </div>
          
          <div class="explanation">
            <h3>Разбор реализации:</h3>
            <ol>
              <li>
                <strong>Структура данных</strong>: Массив <code>results</code> для хранения результатов и счетчик <code>completedCount</code>.
              </li>
              <li>
                <strong>Возвращаем новый Promise</strong>: В отличие от Promise.all, здесь нет reject-обработчика в основном промисе.
              </li>
              <li>
                <strong>Обработка пустого массива</strong>: Если массив промисов пуст, сразу возвращаем пустой массив.
              </li>
              <li>
                <strong>Итерация по промисам</strong>: Перебираем каждый промис из входного массива.
              </li>
              <li>
                <strong>Обработка успешного выполнения</strong>: Сохраняем объект со статусом 'fulfilled' и значением.
              </li>
              <li>
                <strong>Обработка ошибок</strong>: Важное отличие - при ошибке мы не отклоняем весь промис, а сохраняем объект со статусом 'rejected' и причиной.
              </li>
              <li>
                <strong>Подсчёт завершённых промисов</strong>: Увеличиваем счётчик как при успехе, так и при ошибке.
              </li>
              <li>
                <strong>Разрешение общего промиса</strong>: Когда все промисы завершены (успешно или с ошибкой), разрешаем общий промис.
              </li>
            </ol>
            
            <div class="key-difference">
              <h3>Ключевое отличие от Promise.all:</h3>
              <p>В <code>Promise.allSettled</code> ошибки в отдельных промисах <strong>не отклоняют</strong> весь результат. 
              Вместо этого, информация о каждом промисе, будь то успех или ошибка, сохраняется в массиве результатов.</p>
            </div>
          </div>
        </section>
        
        <section class="animation-section">
          <h2>Визуализация работы Promise.allSettled</h2>
          <div class="animation-container">
            <div class="animation-controls">
              <button @click="startPromiseSettledAnimation" :disabled="animationRunning">Запустить</button>
              <button @click="resetAnimation" :disabled="!animationComplete && !animationRunning">Сбросить</button>
            </div>
            
            <div class="animation-stage">
              <div class="promises-list">
                <div 
                  v-for="(promise, index) in settledPromises" 
                  :key="'settled-' + index"
                  :class="['promise-item', { 
                    'resolved': promise.state === 'resolved',
                    'rejected': promise.state === 'rejected',
                    'pending': promise.state === 'pending'
                  }]"
                >
                  <div class="promise-header">Promise {{ index + 1 }} ({{ promise.time }}ms)</div>
                  <div class="promise-state">{{ getStateText(promise.state) }}</div>
                  <div v-if="promise.state !== 'pending'" class="promise-value">{{ promise.value }}</div>
                  <div class="promise-timer" v-if="promise.state === 'pending' && animationRunning">
                    <div class="timer-fill" :style="{ width: promise.progress + '%' }"></div>
                  </div>
                </div>
              </div>
              
              <div class="animation-result">
                <div class="settled-processor" :class="{ 'active': animationRunning }">Promise.allSettled</div>
                <div class="settled-status" :class="{ 
                  'resolved': settledResult.state === 'resolved',
                  'pending': settledResult.state === 'pending' && animationRunning
                }">
                  <div v-if="settledResult.state === 'pending' && animationRunning">Ожидание...</div>
                  <div v-else-if="settledResult.state === 'resolved'">
                    Результат: {{ JSON.stringify(settledResult.value) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="animation-explanation">
            <h3>Как работает Promise.allSettled</h3>
            <p>1. Все промисы запускаются параллельно, как и в Promise.all</p>
            <p>2. Promise.allSettled отслеживает завершение каждого промиса</p>
            <p>3. Для каждого промиса сохраняется его статус (fulfilled/rejected) и результат/причина</p>
            <p>4. Результаты сохраняются в массив в порядке исходного массива промисов</p>
            <p>5. После завершения <strong>всех</strong> промисов, Promise.allSettled возвращает массив результатов</p>
            <p>6. <strong>Promise.allSettled всегда завершается успешно!</strong></p>
          </div>
        </section>
        
        <section class="pitfalls-section">
          <h2>Подводные камни Promise.allSettled</h2>
          <div class="pitfall-card">
            <div class="pitfall-header">
              <div class="pitfall-icon">⚠️</div>
              <h3>Структура результата</h3>
            </div>
            <p>
              <strong>Подводный камень</strong>: Формат результата отличается от Promise.all, что требует дополнительной обработки результатов.
            </p>
            <div class="pitfall-example">
              <pre><code>// Предположим, у нас есть массив промисов
  const promises = [Promise.resolve(1), Promise.reject('Error'), Promise.resolve(3)];
  
  // С Promise.all мы получили бы ошибку
  promiseAll(promises).catch(error => console.log('Ошибка:', error)); // 'Ошибка: Error'
  
  // С Promise.allSettled мы получаем массив результатов
  promiseAllSettled(promises).then(results => {
    // Требуется дополнительная обработка для извлечения значений или ошибок
    const values = results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value);
    
    const errors = results
      .filter(result => result.status === 'rejected')
      .map(result => result.reason);
    
    console.log('Успешные значения:', values); // [1, 3]
    console.log('Ошибки:', errors); // ['Error']
  });</code></pre>
            </div>
          </div>
          
          <div class="pitfall-card">
            <div class="pitfall-header">
              <div class="pitfall-icon">⚠️</div>
              <h3>Эффективность</h3>
            </div>
            <p>
              <strong>Подводный камень</strong>: Если вам важно быстро среагировать на первую ошибку, 
              Promise.allSettled менее эффективен, так как всегда ожидает завершения всех промисов.
            </p>
            <div class="pitfall-example">
              <pre><code>// Сценарий: несколько медленных запросов, один из которых быстро завершается с ошибкой
  
  // Promise.all быстро отклонится при первой ошибке:
  Promise.all([
    slowRequest1(), // 5 секунд
    fastErrorRequest(), // 0.5 секунды, завершается с ошибкой
    slowRequest2() // 10 секунд
  ]).catch(error => {
    // Этот код выполнится примерно через 0.5 секунды
    console.log('Быстрое обнаружение ошибки:', error);
  });
  
  // Promise.allSettled ждет завершения всех запросов:
  Promise.allSettled([
    slowRequest1(), // 5 секунд
    fastErrorRequest(), // 0.5 секунды, завершается с ошибкой
    slowRequest2() // 10 секунд
  ]).then(results => {
    // Этот код выполнится только через 10 секунд!
    const errors = results.filter(r => r.status === 'rejected');
    console.log('Медленное обнаружение ошибок:', errors);
  });</code></pre>
            </div>
            <p>
              <strong>Решение</strong>: Используйте Promise.all, если необходимо быстро реагировать на ошибки, 
              и Promise.allSettled, если нужно собрать все результаты независимо от успеха или неудачи.
            </p>
          </div>
        </section>
        
        <section class="real-world-section">
          <h2>Применение Promise.allSettled в реальных задачах</h2>
          <div class="use-cases">
            <div class="use-case">
              <h3>Обработка частично успешных операций</h3>
              <p>Когда нужно выполнить несколько независимых операций и продолжить работу даже при частичном успехе:</p>
              <pre><code>// Загрузка множества файлов с обработкой частичных ошибок
  async function uploadMultipleFiles(files) {
    const uploadResults = await Promise.allSettled(
      files.map(file => uploadFile(file))
    );
    
    // Показать статистику успешных и неудачных загрузок
    const successful = uploadResults.filter(r => r.status === 'fulfilled').length;
    const failed = uploadResults.filter(r => r.status === 'rejected').length;
    
    return { 
      message: `Загружено ${successful} из ${files.length} файлов`,
      successful,
      failed,
      results: uploadResults
    };
  }</code></pre>
            </div>
            
            <div class="use-case">
              <h3>Обработка данных с разных сервисов</h3>
              <p>При работе с несколькими внешними API, где некоторые могут быть недоступны:</p>
              <pre><code>// Сбор данных из нескольких источников с возможными ошибками
  async function aggregateUserData(userId) {
    const dataSources = [
      fetchUserProfile(userId),
      fetchUserOrders(userId), 
      fetchRecommendations(userId),
      fetchNotifications(userId)
    ];
    
    const results = await Promise.allSettled(dataSources);
    
    // Формируем объект данных, игнорируя неудачные запросы
    const userData = {};
    
    if (results[0].status === 'fulfilled') {
      userData.profile = results[0].value;
    }
    
    if (results[1].status === 'fulfilled') {
      userData.orders = results[1].value;
    }
    
    // И так далее...
    
    return userData;
  }</code></pre>
            </div>
            
            <div class="use-case">
              <h3>Показ ошибок в пользовательском интерфейсе</h3>
              <p>Для отображения детальной информации о статусе каждой операции:</p>
              <pre><code>// Создание отчета о результатах пакетной операции
  async function processBatch(items) {
    const results = await Promise.allSettled(
      items.map(item => processItem(item))
    );
    
    // Преобразуем результаты в формат для UI
    return items.map((item, index) => {
      const result = results[index];
      return {
        item,
        success: result.status === 'fulfilled',
        result: result.status === 'fulfilled' ? result.value : null,
        error: result.status === 'rejected' ? result.reason : null
      };
    });
  }</code></pre>
            </div>
          </div>
        </section>
      </div>
      
      <!-- Tab 3: Сравнение методов -->
      <div v-if="activeTab === 2" class="tab-content">
        <section class="comparison-section">
          <h2>Сравнение Promise.all и Promise.allSettled</h2>
          
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Характеристика</th>
                  <th>Promise.all</th>
                  <th>Promise.allSettled</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Обработка ошибок</td>
                  <td>Отклоняется при первой ошибке</td>
                  <td>Никогда не отклоняется</td>
                </tr>
                <tr>
                  <td>Результат</td>
                  <td>Массив значений успешных промисов</td>
                  <td>Массив объектов со статусом и значением/ошибкой</td>
                </tr>
                <tr>
                  <td>Ожидание завершения</td>
                  <td>Прерывается при первой ошибке</td>
                  <td>Всегда ждет завершения всех промисов</td>
                </tr>
                <tr>
                  <td>Порядок результатов</td>
                  <td>Соответствует порядку входных промисов</td>
                  <td>Соответствует порядку входных промисов</td>
                </tr>
                <tr>
                  <td>Типичное применение</td>
                  <td>Когда все операции должны быть успешными</td>
                  <td>Когда нужно обработать все результаты независимо от успеха</td>
                </tr>
                <tr>
                  <td>Поддержка в браузерах</td>
                  <td>ES2015 (ES6), широкая поддержка</td>
                  <td>ES2020, более новый метод</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="comparison-visualization">
            <h3>Визуальное сравнение поведения</h3>
            
            <div class="comparison-diagram">
              <div class="scenario-container">
                <h4>Сценарий 1: Все промисы успешные</h4>
                <div class="scenario">
                  <div class="input-promises">
                    <div class="promise promise-success">Promise 1 ✓</div>
                    <div class="promise promise-success">Promise 2 ✓</div>
                    <div class="promise promise-success">Promise 3 ✓</div>
                  </div>
                  
                  <div class="comparison-results">
                    <div class="method-result">
                      <div class="method-name">Promise.all</div>
                      <div class="result-value success-result">[result1, result2, result3]</div>
                    </div>
                    
                    <div class="method-result">
                      <div class="method-name">Promise.allSettled</div>
                      <div class="result-value success-result">[
                        {status: 'fulfilled', value: result1},
                        {status: 'fulfilled', value: result2},
                        {status: 'fulfilled', value: result3}
                      ]</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="scenario-container">
                <h4>Сценарий 2: Один промис отклонен</h4>
                <div class="scenario">
                  <div class="input-promises">
                    <div class="promise promise-success">Promise 1 ✓</div>
                    <div class="promise promise-error">Promise 2 ✗</div>
                    <div class="promise promise-success">Promise 3 ✓</div>
                  </div>
                  
                  <div class="comparison-results">
                    <div class="method-result">
                      <div class="method-name">Promise.all</div>
                      <div class="result-value error-result">Error: rejected reason from Promise 2</div>
                    </div>
                    
                    <div class="method-result">
                      <div class="method-name">Promise.allSettled</div>
                      <div class="result-value partial-result">[
                        {status: 'fulfilled', value: result1},
                        {status: 'rejected', reason: error2},
                        {status: 'fulfilled', value: result3}
                      ]</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="scenario-container">
                <h4>Сценарий 3: Все промисы отклонены</h4>
                <div class="scenario">
                  <div class="input-promises">
                    <div class="promise promise-error">Promise 1 ✗</div>
                    <div class="promise promise-error">Promise 2 ✗</div>
                    <div class="promise promise-error">Promise 3 ✗</div>
                  </div>
                  
                  <div class="comparison-results">
                    <div class="method-result">
                      <div class="method-name">Promise.all</div>
                      <div class="result-value error-result">Error: rejected reason from Promise 1</div>
                    </div>
                    
                    <div class="method-result">
                      <div class="method-name">Promise.allSettled</div>
                      <div class="result-value error-result">[
                        {status: 'rejected', reason: error1},
                        {status: 'rejected', reason: error2},
                        {status: 'rejected', reason: error3}
                      ]</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section class="when-to-use-section">
          <h2>Когда использовать каждый метод</h2>
          
          <div class="choice-cards">
            <div class="choice-card">
              <h3>Используйте Promise.all, когда:</h3>
              <ul>
                <li>Все операции должны быть успешными для продолжения работы</li>
                <li>Вам нужно быстро обнаружить и обработать первую ошибку</li>
                <li>Вы ожидаете простой массив результатов без дополнительной обработки</li>
                <li>У вас есть зависимые операции, которые требуют успешного выполнения всех предыдущих</li>
              </ul>
              <div class="example-scenario">
                <strong>Пример:</strong> Загрузка необходимых ресурсов перед запуском приложения, 
                когда отсутствие любого ресурса делает невозможным корректную работу.
              </div>
            </div>
            
            <div class="choice-card">
              <h3>Используйте Promise.allSettled, когда:</h3>
              <ul>
                <li>Вам нужно выполнить несколько независимых операций</li>
                <li>Приложение должно продолжить работу даже при частичных ошибках</li>
                <li>Необходимо собрать статистику по успешным и неудачным операциям</li>
                <li>Вы хотите показать пользователю подробные результаты каждой операции</li>
              </ul>
              <div class="example-scenario">
                <strong>Пример:</strong> Загрузка и отображение ленты новостей из нескольких источников,
                где недоступность одного источника не должна блокировать отображение остальных данных.
              </div>
            </div>
          </div>
        </section>
        
        <section class="common-errors-section">
          <h2>Распространенные ошибки и проблемы</h2>
          
          <div class="error-example">
            <h3>Проблема в исходном коде задачи</h3>
            <p>
              В исходном коде вызывается функция <code>promiseSettled()</code>, но определена функция <code>promiseAllSettled()</code>:
            </p>
            <div class="code-diff">
              <pre><code>// Оригинальный код
  promiseAll(requests).then(console.log).catch(console.error);
  promiseSettled(requests).then(console.log).catch(console.error);
  
  // Исправленный код
  promiseAll(requests).then(console.log).catch(console.error);
  promiseAllSettled(requests).then(console.log).catch(console.error);</code></pre>
            </div>
            <p>
              <strong>Решение:</strong> Нужно изменить название функции на <code>promiseSettled</code> 
              или поменять вызов на <code>promiseAllSettled</code> для согласованности.
            </p>
          </div>
          
          <div class="error-example">
            <h3>Неправильная обработка пустого массива</h3>
            <p>
              Распространенная ошибка - забыть обработать случай с пустым массивом промисов:
            </p>
            <div class="code-diff">
              <pre><code>// Неправильная реализация
  const promiseAll = (promises) => {
    const results = [];
    let resolvedCount = 0;
    
    return new Promise((resolve, reject) => {
      // Отсутствует проверка на пустой массив!
      
      promises.forEach((promise, index) => {
        // Если массив promises пуст, этот код не выполнится
        // и промис никогда не разрешится!
        Promise.resolve(promise)
          .then((result) => {
            results[index] = result;
            resolvedCount++;
            
            if (resolvedCount === promises.length) {
              resolve(results);
            }
          })
          .catch(reject);
      });
    });
  };</code></pre>
            </div>
            <p>
              <strong>Решение:</strong> Всегда добавляйте проверку на пустой массив в начале функции.
            </p>
          </div>
          
          <div class="error-example">
            <h3>Игнорирование не-Promise значений</h3>
            <p>
              Забыть обернуть входные значения в Promise.resolve() может привести к неожиданному поведению:
            </p>
            <div class="code-diff">
              <pre><code>// Неправильно - не учитываем, что элементы могут быть не промисами
  const promiseAll = (promises) => {
    // ...
    promises.forEach((promise, index) => {
      // Если promise - это просто значение, а не промис,
      // это вызовет ошибку при вызове .then()
      promise.then(/* ... */);
    });
    // ...
  };
  
  // Правильная реализация - оборачиваем в Promise.resolve()
  const promiseAll = (promises) => {
    // ...
    promises.forEach((promise, index) => {
      // Promise.resolve превращает любое значение в промис
      Promise.resolve(promise).then(/* ... */);
    });
    // ...
  };</code></pre>
            </div>
            <p>
              <strong>Соответствие стандарту:</strong> Официальные методы Promise.all и Promise.allSettled 
              автоматически оборачивают не-Promise значения в Promise, и ваша реализация должна делать то же самое.
            </p>
          </div>
        </section>
      </div>
      
      <!-- Tab 4: Дополнительно -->
      <div v-if="activeTab === 3" class="tab-content">
        <section class="alternatives-section">
          <h2>Другие методы для работы с множеством промисов</h2>
          
          <div class="alternative-methods">
            <div class="method-card">
              <h3>Promise.race</h3>
              <p>
                <code>Promise.race</code> возвращает промис, который завершается с результатом или ошибкой 
                <strong>самого быстрого</strong> из переданных промисов.
              </p>
              <div class="method-illustration">
                <div class="promise-schema">
                  <div class="input-promises race-promises">
                    <div class="promise promise-fast">Fast Promise ⚡</div>
                    <div class="promise promise-slow">Slow Promise</div>
                    <div class="promise promise-slow">Slow Promise</div>
                  </div>
                  <div class="promise-processor">
                    <div class="processor-label">Promise.race</div>
                    <div class="processor-arrow">⟹</div>
                  </div>
                  <div class="output-promise">
                    <div class="output-label">Результат</div>
                    <div class="output-content">Результат быстрого промиса</div>
                  </div>
                </div>
              </div>
              <div class="method-code">
                <pre><code>// Базовая реализация Promise.race
  const promiseRace = (promises) => {
    return new Promise((resolve, reject) => {
      promises.forEach(promise => {
        Promise.resolve(promise).then(resolve).catch(reject);
      });
    });
  };</code></pre>
              </div>
              <div class="method-use-case">
                <strong>Применение:</strong> Таймауты для API-запросов, выбор самого быстрого источника данных.
              </div>
            </div>
            
            <div class="method-card">
              <h3>Promise.any</h3>
              <p>
                <code>Promise.any</code> возвращает первый успешно выполненный промис из списка. 
                Отклоняется только если все промисы были отклонены.
              </p>
              <div class="method-illustration">
                <div class="promise-schema">
                  <div class="input-promises any-promises">
                    <div class="promise promise-error">Promise 1 ✗</div>
                    <div class="promise promise-success">Promise 2 ✓</div>
                    <div class="promise promise-slow">Promise 3</div>
                  </div>
                  <div class="promise-processor">
                    <div class="processor-label">Promise.any</div>
                    <div class="processor-arrow">⟹</div>
                  </div>
                  <div class="output-promise">
                    <div class="output-label">Результат</div>
                    <div class="output-content">Результат Promise 2 (первый успешный)</div>
                  </div>
                </div>
              </div>
              <div class="method-code">
                <pre><code>// Базовая реализация Promise.any
  const promiseAny = (promises) => {
    return new Promise((resolve, reject) => {
      let rejectedCount = 0;
      const errors = new Array(promises.length);
      
      if (promises.length === 0) {
        reject(new AggregateError([], 'All promises were rejected'));
        return;
      }
      
      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then(resolve)
          .catch(error => {
            errors[index] = error;
            rejectedCount++;
            
            if (rejectedCount === promises.length) {
              reject(new AggregateError(errors, 'All promises were rejected'));
            }
          });
      });
    });
  };</code></pre>
              </div>
              <div class="method-use-case">
                <strong>Применение:</strong> Выбор первого доступного сервера из нескольких, 
                запрос данных из разных источников с возвратом первого успешного.
              </div>
            </div>
          </div>
        </section>
        
        <section class="patterns-section">
          <h2>Полезные паттерны для работы с промисами</h2>
          
          <div class="pattern-cards">
            <div class="pattern-card">
              <h3>Параллельное выполнение с ограничением</h3>
              <p>
                Часто нужно выполнить много промисов, но ограничить количество одновременных операций:
              </p>
              <div class="pattern-code">
                <pre><code>// Параллельное выполнение с ограничением
  async function processWithConcurrencyLimit(items, concurrency, processItem) {
    const results = [];
    const inProgress = new Set();
    const queue = [...items];
    
    async function runTask(item, index) {
      inProgress.add(index);
      try {
        const result = await processItem(item);
        results[index] = result;
      } catch (error) {
        results[index] = { error };
      } finally {
        inProgress.delete(index);
      }
    }
    
    async function processQueue() {
      // Берем элементы из очереди, пока не достигнем лимита параллельных задач
      while (queue.length > 0 && inProgress.size &lt; concurrency) {
        const item = queue.shift();
        const index = items.indexOf(item);
        
        // Запускаем обработку элемента, не дожидаясь завершения
        runTask(item, index).then(() => {
          // Если в очереди еще есть элементы, запускаем следующий
          if (queue.length > 0) {
            processQueue();
          }
        });
      }
    }
    
    // Стартуем обработку
    await processQueue();
    
    // Ожидаем завершения всех запущенных задач
    while (inProgress.size > 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return results;
  }</code></pre>
              </div>
              <div class="pattern-use-case">
                <strong>Применение:</strong> Загрузка большого количества файлов, обработка большого массива данных без перегрузки системы.
              </div>
            </div>
            
            <div class="pattern-card">
              <h3>Последовательное выполнение промисов</h3>
              <p>
                Иногда нужно выполнить промисы строго последовательно, один за другим:
              </p>
              <div class="pattern-code">
                <pre><code>// Последовательное выполнение промисов
  async function sequentialExecution(tasks) {
    const results = [];
    
    for (const task of tasks) {
      try {
        const result = await task();
        results.push({ status: 'fulfilled', value: result });
      } catch (error) {
        results.push({ status: 'rejected', reason: error });
      }
    }
    
    return results;
  }</code></pre>
              </div>
              <div class="pattern-use-case">
                <strong>Применение:</strong> Выполнение этапов транзакции, когда каждый следующий шаг зависит от результата предыдущего.
              </div>
            </div>
            
            <div class="pattern-card">
              <h3>Повторные попытки с задержкой</h3>
              <p>
                Для ненадежных операций полезно реализовать механизм повторных попыток:
              </p>
              <div class="pattern-code">
                <pre><code>// Функция с повторными попытками и экспоненциальной задержкой
  async function retry(fn, options = {}) {
    const {
      maxRetries = 3,
      initialDelay = 1000,
      maxDelay = 30000,
      factor = 2,
      onRetry = () => {}
    } = options;
    
    let retries = 0;
    let delay = initialDelay;
    
    while (true) {
      try {
        return await fn();
      } catch (error) {
        retries++;
        
        if (retries > maxRetries) {
          throw error;
        }
        
        // Уведомление о повторной попытке
        onRetry({
          error,
          retryCount: retries,
          delay
        });
        
        // Ожидание перед следующей попыткой
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Увеличение задержки для следующей попытки (экспоненциальная задержка)
        delay = Math.min(delay * factor, maxDelay);
      }
    }
  }</code></pre>
              </div>
              <div class="pattern-use-case">
                <strong>Применение:</strong> Повторные попытки HTTP-запросов при временных сбоях сети, 
                обработка случаев с ограничением запросов (rate limiting).
              </div>
            </div>
          </div>
        </section>
        
        <section class="optimization-section">
          <h2>Оптимизация и лучшие практики</h2>
          
          <div class="optimization-tips">
            <div class="tip">
              <h3>Избегайте лишних промисов</h3>
              <p>
                Создание новых промисов требует ресурсов. Используйте существующие API, когда это возможно:
              </p>
              <div class="tip-example">
                <pre><code>// Плохо: создание лишнего промиса
  const getData = () => {
    return new Promise((resolve, reject) => {
      fetch('/api/data')
        .then(response => response.json())
        .then(resolve)
        .catch(reject);
    });
  };
  
  // Хорошо: возврат существующего промиса
  const getData = () => {
    return fetch('/api/data')
      .then(response => response.json());
  };</code></pre>
              </div>
            </div>
            
            <div class="tip">
              <h3>Обработка ошибок</h3>
              <p>
                Всегда добавляйте обработку ошибок к промисам, чтобы избежать необработанных отклонений:
              </p>
              <div class="tip-example">
                <pre><code>// Плохо: необработанные ошибки
  function processData() {
    return Promise.all([
      fetchUser(),
      fetchItems()
    ]).then(([user, items]) => {
      // Обработка данных
    });
    // Отсутствует .catch()!
  }
  
  // Хорошо: обработка всех ошибок
  function processData() {
    return Promise.all([
      fetchUser(),
      fetchItems()
    ])
    .then(([user, items]) => {
      // Обработка данных
    })
    .catch(error => {
      console.error('Ошибка при загрузке данных:', error);
      // Обработка ошибки или повторная попытка
    });
  }</code></pre>
              </div>
            </div>
            
            <div class="tip">
              <h3>Memory Leaks и освобождение ресурсов</h3>
              <p>
                Будьте осторожны с долго выполняющимися промисами, которые могут удерживать ресурсы:
              </p>
              <div class="tip-example">
                <pre><code>// Создание отменяемого промиса
  function createCancellablePromise(promise) {
    let isCancelled = false;
    
    const wrappedPromise = new Promise((resolve, reject) => {
      promise
        .then(value => {
          if (!isCancelled) resolve(value);
        })
        .catch(error => {
          if (!isCancelled) reject(error);
        });
    });
    
    return {
      promise: wrappedPromise,
      cancel: () => {
        isCancelled = true;
      }
    };
  }
  
  // Использование
  const { promise, cancel } = createCancellablePromise(
    fetch('/api/large-data')
  );
  
  // Отмена запроса при необходимости
  setTimeout(cancel, 5000); // Отмена через 5 секунд</code></pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref  } from 'vue';
  
  // Состояние табов
  const tabs = [
    { id: 'promise-all', name: 'Promise.all' },
    { id: 'promise-allSettled', name: 'Promise.allSettled' },
    { id: 'comparison', name: 'Сравнение методов' },
    { id: 'advanced', name: 'Дополнительно' }
  ];
  const activeTab = ref(0);
  
  // Состояние анимации
  const animationRunning = ref(false);
  const animationComplete = ref(false);
  
  // Данные для Promise.all анимации
  const allPromises = ref([
    { id: 1, time: 300, value: 1, state: 'pending', progress: 0 },
    { id: 2, time: 900, value: 2, state: 'pending', progress: 0 },
    { id: 3, time: 500, value: 3, state: 'pending', progress: 0 },
    { id: 4, time: 1500, value: 4, state: 'pending', progress: 0 }
  ]);
  
  const allResult = ref({
    state: 'pending',
    value: null,
    error: null
  });
  
  // Данные для Promise.allSettled анимации
  const settledPromises = ref([
    { id: 1, time: 300, value: 1, state: 'pending', progress: 0 },
    { id: 2, time: 750, value: 'Отклонено!', state: 'pending', progress: 0, willReject: true },
    { id: 3, time: 500, value: 3, state: 'pending', progress: 0 },
    { id: 4, time: 1200, value: 4, state: 'pending', progress: 0 }
  ]);
  
  const settledResult = ref({
    state: 'pending',
    value: null
  });
  
  // Вспомогательные функции
  function getStateText(state) {
    switch (state) {
      case 'pending': return 'Ожидание...';
      case 'resolved': return 'Выполнено';
      case 'rejected': return 'Отклонено';
      default: return state;
    }
  }
  
  // Перезагрузка анимации
  function resetAnimation() {
    animationRunning.value = false;
    animationComplete.value = false;
    
    // Сброс Promise.all
    allPromises.value.forEach(p => {
      p.state = 'pending';
      p.progress = 0;
    });
    allResult.value = {
      state: 'pending',
      value: null,
      error: null
    };
    
    // Сброс Promise.allSettled
    settledPromises.value.forEach(p => {
      p.state = 'pending';
      p.progress = 0;
    });
    settledResult.value = {
      state: 'pending',
      value: null
    };
  }
  
  // Анимация Promise.all
  function startPromiseAllAnimation() {
    if (animationRunning.value) return;
    resetAnimation();
    animationRunning.value = true;
    
    // Начинаем выполнение промисов
    allPromises.value.forEach((promise ) => {
      // Обновляем прогресс каждые 50мс
      const progressInterval = setInterval(() => {
        if (promise.progress < 100) {
          promise.progress += (100 / (promise.time / 50));
        }
      }, 50);
      
      // Завершаем промис через указанное время
      setTimeout(() => {
        clearInterval(progressInterval);
        promise.progress = 100;
        promise.state = 'resolved';
        
        // Проверяем, все ли промисы завершены
        const allDone = allPromises.value.every(p => p.state === 'resolved');
        if (allDone) {
          allResult.value.state = 'resolved';
          allResult.value.value = allPromises.value.map(p => p.value);
          animationRunning.value = false;
          animationComplete.value = true;
        }
      }, promise.time);
    });
  }
  
  // Анимация Promise.allSettled
  function startPromiseSettledAnimation() {
    if (animationRunning.value) return;
    resetAnimation();
    animationRunning.value = true;
    
    // Массив для сбора результатов
    const results = [];
    
    // Начинаем выполнение промисов
    settledPromises.value.forEach((promise, index) => {
      // Обновляем прогресс каждые 50мс
      const progressInterval = setInterval(() => {
        if (promise.progress < 100) {
          promise.progress += (100 / (promise.time / 50));
        }
      }, 50);
      
      // Завершаем промис через указанное время
      setTimeout(() => {
        clearInterval(progressInterval);
        promise.progress = 100;
        
        if (promise.willReject) {
          promise.state = 'rejected';
          results[index] = { status: 'rejected', reason: promise.value };
        } else {
          promise.state = 'resolved';
          results[index] = { status: 'fulfilled', value: promise.value };
        }
        
        // Проверяем, все ли промисы завершены
        const allSettled = settledPromises.value.every(p => 
          p.state === 'resolved' || p.state === 'rejected'
        );
        
        if (allSettled) {
          settledResult.value.state = 'resolved';
          settledResult.value.value = results;
          animationRunning.value = false;
          animationComplete.value = true;
        }
      }, promise.time);
    });
  }
  </script>
  
  <style scoped>
  .promise-methods-container {
    color: #333;
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
  }
  
  .main-title {
    text-align: center;
    margin-bottom: 30px;
    color: #2c3e50;
  }
  
  .intro-section {
    margin-bottom: 30px;
    text-align: center;
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
  }
  
  .intro-section p {
    margin: 10px 0;
    line-height: 1.6;
  }
  
  /* Табы */
  .tabs {
    display: flex;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    overflow-x: auto;
  }
  
  .tab {
    padding: 12px 20px;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    font-weight: bold;
    color: #666;
    transition: all 0.3s;
  }
  
  .tab:hover {
    color: #333;
    background-color: #f5f5f5;
  }
  
  .tab.active {
    color: #3498db;
    border-bottom: 3px solid #3498db;
  }
  
  .tab-content {
    padding: 10px;
    animation: fadeIn 0.5s;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Теоретический раздел */
  .theory-section {
    margin-bottom: 30px;
  }
  
  .description {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    line-height: 1.6;
  }
  
  .description ul {
    padding-left: 20px;
  }
  
  .description li {
    margin-bottom: 8px;
  }
  
  .theory-illustration {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  
  .promise-schema {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 700px;
  }
  
  .input-promises {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .promise {
    padding: 10px 15px;
    background-color: #e3f2fd;
    border: 1px solid #90caf9;
    border-radius: 6px;
    font-weight: bold;
    color: #1565c0;
    min-width: 100px;
    text-align: center;
  }
  
  .promise-processor {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  .processor-label {
    background-color: #2196f3;
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: bold;
  }
  
  .processor-arrow {
    font-size: 24px;
    color: #2196f3;
  }
  
  .output-promise {
    border: 2px solid #2196f3;
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
    max-width: 500px;
  }
  
  .output-label {
    background-color: #2196f3;
    color: white;
    padding: 8px 12px;
    font-weight: bold;
    text-align: center;
  }
  
  .output-content {
    padding: 12px;
    background-color: #e3f2fd;
    font-family: monospace;
  }
  
  .settled-output .output-content {
    font-size: 0.9em;
  }
  
  /* Секция с кодом */
  .code-section {
    margin-bottom: 30px;
  }
  
  .code-container {
    overflow: auto;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .code {
    margin: 0;
    padding: 20px;
    background-color: #282c34;
    color: #abb2bf;
    font-family: 'Courier New', monospace;
    line-height: 1.5;
    font-size: 14px;
    overflow-x: auto;
  }
  
  .explanation {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;
  }
  
  .explanation h3 {
    margin-top: 0;
    color: #2c3e50;
  }
  
  .explanation ol {
    padding-left: 20px;
  }
  
  .explanation li {
    margin-bottom: 8px;
    line-height: 1.6;
  }
  
  .key-difference {
    margin-top: 20px;
    padding: 15px;
    background-color: #e8f4fd;
    border-left: 4px solid #2196f3;
    border-radius: 4px;
  }
  
  .key-difference h3 {
    margin-top: 0;
    color: #1565c0;
  }
  
  /* Секция с анимацией */
  .animation-section {
    margin-bottom: 30px;
  }
  
  .animation-container {
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .animation-controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .animation-controls button {
    padding: 10px 20px;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .animation-controls button:hover:not(:disabled) {
    background-color: #1976d2;
  }
  
  .animation-controls button:disabled {
    background-color: #bdbdbd;
    cursor: not-allowed;
  }
  
  .animation-stage {
    margin-bottom: 20px;
  }
  
  .promises-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
    margin-bottom: 30px;
  }
  
  .promise-item {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    background-color: white;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;
  }
  
  .promise-header {
    padding: 10px;
    background-color: #f5f5f5;
    font-weight: bold;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .promise-state {
    padding: 10px;
    text-align: center;
    font-weight: bold;
  }
  
  .promise-value {
    padding: 10px;
    text-align: center;
    background-color: #f5f5f5;
    font-family: monospace;
  }
  
  .promise-timer {
    height: 5px;
    background-color: #e0e0e0;
    margin: 0 10px 10px 10px;
    border-radius: 2px;
    overflow: hidden;
  }
  
  .timer-fill {
    height: 100%;
    background-color: #4caf50;
    width: 0;
    transition: width 0.1s linear;
  }
  
  .promise-item.resolved {
    border-color: #4caf50;
  }
  
  .promise-item.resolved .promise-header {
    background-color: #e8f5e9;
    color: #2e7d32;
    border-color: #a5d6a7;
  }
  
  .promise-item.resolved .promise-state {
    color: #2e7d32;
  }
  
  .promise-item.rejected {
    border-color: #f44336;
  }
  
  .promise-item.rejected .promise-header {
    background-color: #ffebee;
    color: #c62828;
    border-color: #ef9a9a;
  }
  
  .promise-item.rejected .promise-state {
    color: #c62828;
  }
  
  .animation-result {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .all-processor, .settled-processor {
    padding: 12px 25px;
    background-color: #9e9e9e;
    color: white;
    border-radius: 30px;
    font-weight: bold;
    transition: all 0.5s;
  }
  
  .all-processor.active, .settled-processor.active {
    background-color: #2196f3;
    box-shadow: 0 2px 10px rgba(33, 150, 243, 0.3);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(33, 150, 243, 0); }
    100% { box-shadow: 0 0 0 0 rgba(33, 150, 243, 0); }
  }
  
  .all-status, .settled-status {
    padding: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 100%;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: monospace;
  }
  
  .all-status.pending, .settled-status.pending {
    background-color: #e3f2fd;
    border-color: #90caf9;
    color: #1565c0;
    animation: blink 1.5s infinite;
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  .all-status.resolved, .settled-status.resolved {
    background-color: #e8f5e9;
    border-color: #a5d6a7;
    color: #2e7d32;
  }
  
  .all-status.rejected {
    background-color: #ffebee;
    border-color: #ef9a9a;
    color: #c62828;
  }
  
  .animation-explanation {
    margin-top: 20px;
    padding: 15px;
    background-color: #e8f5e9;
    border-radius: 8px;
    border-left: 4px solid #4caf50;
  }
  
  .animation-explanation h3 {
    margin-top: 0;
    color: #2e7d32;
  }
  
  .animation-explanation p {
    margin: 8px 0;
    line-height: 1.6;
  }
  
  /* Секция с подводными камнями */
  .pitfalls-section {
    margin-bottom: 30px;
  }
  
  .pitfall-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    overflow: hidden;
  }
  
  .pitfall-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px;
    background-color: #fff8e1;
    border-bottom: 1px solid #ffe082;
  }
  
  .pitfall-icon {
    font-size: 24px;
  }
  
  .pitfall-header h3 {
    margin: 0;
    color: #f57f17;
  }
  
  .pitfall-card p {
    padding: 15px;
    margin: 0;
    line-height: 1.6;
  }
  
  .pitfall-example {
    padding: 0 15px 15px 15px;
  }
  
  .pitfall-example pre {
    margin: 0;
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
  }
  
  /* Секция с реальными задачами */
  .real-world-section {
    margin-bottom: 30px;
  }
  
  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .use-case {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .use-case h3 {
    margin-top: 0;
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  .use-case p {
    margin-top: 0;
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  .use-case pre {
    margin: 0;
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
  }
  
  /* Секция сравнения */
  .comparison-table {
    overflow-x: auto;
    margin-bottom: 30px;
  }
  
  .comparison-table table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }
  
  .comparison-table th, .comparison-table td {
    padding: 12px 15px;
    text-align: left;
    border: 1px solid #e0e0e0;
  }
  
  .comparison-table th {
    background-color: #f5f5f5;
    font-weight: bold;
    color: #2c3e50;
  }
  
  .comparison-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .comparison-visualization {
    margin-bottom: 30px;
  }
  
  .comparison-diagram {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
  }
  
  .scenario-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .scenario-container h4 {
    margin: 0;
    padding: 15px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
    color: #2c3e50;
  }
  
  .scenario {
    padding: 15px;
  }
  
  .comparison-results {
    margin-top: 20px;
  }
  
  .method-result {
    margin-bottom: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    overflow: hidden;
  }
  
  .method-name {
    padding: 8px 12px;
    background-color: #f5f5f5;
    font-weight: bold;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .result-value {
    padding: 12px;
    font-family: monospace;
    font-size: 13px;
  }
  
  .success-result {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
  
  .error-result {
    background-color: #ffebee;
    color: #c62828;
  }
  
  .partial-result {
    background-color: #fff8e1;
    color: #f57f17;
  }
  
  .promise-success {
    background-color: #e8f5e9;
    border-color: #a5d6a7;
    color: #2e7d32;
  }
  
  .promise-error {
    background-color: #ffebee;
    border-color: #ef9a9a;
    color: #c62828;
  }
  
  .promise-fast {
    border: 2px solid #ff9800;
    background-color: #fff3e0;
    color: #e65100;
    animation: flash 2s infinite;
  }
  
  @keyframes flash {
    0%, 50%, 100% { opacity: 1; }
    25%, 75% { opacity: 0.7; }
  }
  
  .promise-slow {
    opacity: 0.7;
  }
  
  /* Секция "Когда использовать" */
  .choice-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
  }
  
  .choice-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .choice-card h3 {
    margin-top: 0;
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  .choice-card ul {
    padding-left: 20px;
  }
  
  .choice-card li {
    margin-bottom: 10px;
    line-height: 1.6;
  }
  
  .example-scenario {
    margin-top: 15px;
    padding: 12px;
    background-color: #f5f5f5;
    border-radius: 6px;
    line-height: 1.6;
  }
  
  /* Секция "Распространенные ошибки" */
  .common-errors-section {
    margin-bottom: 30px;
  }
  
  .error-example {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    padding: 20px;
  }
  
  .error-example h3 {
    margin-top: 0;
    color: #c62828;
    margin-bottom: 15px;
  }
  
  .code-diff {
    background-color: #f5f5f5;
    border-radius: 6px;
    padding: 15px;
    margin: 15px 0;
    overflow-x: auto;
  }
  
  .code-diff pre {
    margin: 0;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
  }
  
  /* Альтернативные методы */
  .alternative-methods {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 20px;
  }
  
  .method-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    overflow: hidden;
  }
  
  .method-card h3 {
    margin-top: 0;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  .method-card p {
    margin-top: 0;
    line-height: 1.6;
  }
  
  .method-illustration {
    margin: 15px 0;
    display: flex;
    justify-content: center;
  }
  
  .method-code {
    background-color: #f5f5f5;
    border-radius: 6px;
    padding: 15px;
    margin: 15px 0;
    overflow-x: auto;
  }
  
  .method-code pre {
    margin: 0;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
  }
  
  .method-use-case {
    margin-top: 15px;
    padding: 12px;
    background-color: #e8f5e9;
    border-radius: 6px;
    line-height: 1.6;
  }
  
  /* Паттерны */
  .pattern-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 20px;
  }
  
  .pattern-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .pattern-card h3 {
    margin-top: 0;
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  .pattern-code {
    background-color: #f5f5f5;
    border-radius: 6px;
    padding: 15px;
    margin: 15px 0;
    overflow-x: auto;
  }
  
  .pattern-code pre {
    margin: 0;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
  }
  
  .pattern-use-case {
    margin-top: 15px;
    padding: 12px;
    background-color: #e3f2fd;
    border-radius: 6px;
    line-height: 1.6;
  }
  
  /* Оптимизация */
  .optimization-tips {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
  }
  
  .tip {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .tip h3 {
    margin-top: 0;
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  .tip p {
    margin-top: 0;
    line-height: 1.6;
  }
  
  .tip-example {
    background-color: #f5f5f5;
    border-radius: 6px;
    padding: 15px;
    margin: 15px 0;
    overflow-x: auto;
  }
  
  .tip-example pre {
    margin: 0;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
  }
  
  /* Медиа-запросы для адаптивности */
  @media (max-width: 768px) {
    .promises-list {
      grid-template-columns: 1fr;
    }
    
    .use-cases {
      grid-template-columns: 1fr;
    }
    
    .comparison-diagram {
      grid-template-columns: 1fr;
    }
    
    .choice-cards {
      grid-template-columns: 1fr;
    }
    
    .alternative-methods {
      grid-template-columns: 1fr;
    }
    
    .pattern-cards {
      grid-template-columns: 1fr;
    }
    
    .optimization-tips {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 576px) {
    .tab {
      padding: 10px 15px;
      font-size: 14px;
    }
    
    .method-card {
      padding: 15px;
    }
    
    .code {
      font-size: 12px;
    }
  }
  </style>