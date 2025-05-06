<template>
    <div class="promise-explorer">
      <h1 class="main-title">Погружение в JavaScript Promise</h1>
      <p class="subtitle">Интерактивное руководство с анимациями и примерами</p>
      
      <!-- Навигационное меню -->
      <div class="navigation-tabs">
        <button 
          v-for="(tab, index) in tabs" 
          :key="index"
          :class="['tab-button', { active: currentTab === index }]"
          @click="setCurrentTab(index)"
        >
          {{ tab.title }}
        </button>
      </div>
      
      <!-- Основной контент -->
      <div class="content-container">
        <!-- 1. Введение в Promise -->
        <div v-if="currentTab === 0" class="tab-content">
          <h2>Что такое Promise?</h2>
          
          <div class="concept-explanation">
            <p><strong>Promise</strong> (промис) — это объект, представляющий результат асинхронной операции. Promise может находиться в одном из трёх состояний:</p>
            
            <div class="promise-states">
              <div class="state-card">
                <div class="state-header pending">Ожидание (pending)</div>
                <div class="state-content">
                  Начальное состояние. Операция ещё выполняется.
                </div>
              </div>
              
              <div class="state-card">
                <div class="state-header fulfilled">Выполнено (fulfilled)</div>
                <div class="state-content">
                  Операция успешно завершена, промис вернул результат.
                </div>
              </div>
              
              <div class="state-card">
                <div class="state-header rejected">Отклонено (rejected)</div>
                <div class="state-content">
                  Операция завершилась с ошибкой.
                </div>
              </div>
            </div>
            
            <p>Promise — это способ работы с асинхронными операциями в более удобном стиле, чем использование колбэков, избегая "колбэк-ада".</p>
          </div>
          
          <div class="code-demo">
            <h3>Создание Promise с конструктором new Promise()</h3>
            
            <div class="code-example">
              <pre class="code">
  const myPromise = new Promise((resolve, reject) => {
    // Асинхронная операция
    setTimeout(() => {
      const success = true; // Имитация успешного результата
      
      if (success) {
        // Если операция успешна
        resolve('Операция выполнена успешно!');
      } else {
        // Если произошла ошибка
        reject(new Error('Что-то пошло не так'));
      }
    }, 2000); // Задержка 2 секунды
  });
  
  // Обработка результата
  myPromise
    .then(result => {
      console.log('Успех:', result);
    })
    .catch(error => {
      console.error('Ошибка:', error.message);
    });</pre>
            </div>
            
            <div class="explanation">
              <h4>Что происходит в этом коде:</h4>
              <ol>
                <li>Мы создаем новый Promise с помощью конструктора <code>new Promise()</code>.</li>
                <li>Конструктор принимает функцию-исполнитель (executor) с двумя аргументами: <code>resolve</code> и <code>reject</code>.</li>
                <li>Внутри функции-исполнителя мы запускаем асинхронную операцию (в данном случае, setTimeout).</li>
                <li>Когда операция завершается успешно, мы вызываем <code>resolve()</code> с результатом.</li>
                <li>Если операция завершается с ошибкой, мы вызываем <code>reject()</code> с объектом ошибки.</li>
                <li>Метод <code>.then()</code> позволяет обработать успешный результат.</li>
                <li>Метод <code>.catch()</code> позволяет обработать ошибку.</li>
              </ol>
            </div>
          </div>
          
          <div class="run-animation">
            <h3>Визуализация работы Promise</h3>
            <p>Нажмите на кнопку, чтобы запустить анимацию и увидеть, как Promise переходит между состояниями</p>
            
            <div class="animation-controls">
              <button @click="runPromiseAnimation('success')" class="success-button">Запустить с успешным результатом</button>
              <button @click="runPromiseAnimation('error')" class="error-button">Запустить с ошибкой</button>
            </div>
            
            <div class="animation-container">
              <div class="animation-timeline">
                <div class="timeline-line"></div>
                <div class="timeline-marker" :style="{ left: timelinePosition + '%' }"></div>
              </div>
              
              <div class="animation-stages">
                <div class="stage" :class="{ active: animationStage >= 1 }">
                  <div class="stage-title">Создание Promise</div>
                  <div class="stage-visual">
                    <div class="promise-box pending">
                      <div class="promise-state">Ожидание (pending)</div>
                      <div class="promise-icon">⏳</div>
                    </div>
                  </div>
                  <div class="stage-code">
                    <pre>new Promise((resolve, reject) => { ... });</pre>
                  </div>
                </div>
                
                <div class="stage" :class="{ active: animationStage >= 2 }">
                  <div class="stage-title">Асинхронная операция выполняется</div>
                  <div class="stage-visual">
                    <div class="promise-box pending">
                      <div class="promise-state">Ожидание (pending)</div>
                      <div class="promise-icon">⏳</div>
                      <div class="processing-indicator" v-if="animationStage === 2"></div>
                    </div>
                  </div>
                  <div class="stage-code">
                    <pre>setTimeout(() => { ... }, 2000);</pre>
                  </div>
                </div>
                
                <div class="stage" :class="{ active: animationStage >= 3 && !isErrorAnimation }">
                  <div class="stage-title">Успешное выполнение</div>
                  <div class="stage-visual">
                    <div class="promise-box fulfilled">
                      <div class="promise-state">Выполнено (fulfilled)</div>
                      <div class="promise-icon">✓</div>
                      <div class="promise-result">'Операция выполнена успешно!'</div>
                    </div>
                  </div>
                  <div class="stage-code">
                    <pre>resolve('Операция выполнена успешно!');</pre>
                  </div>
                </div>
                
                <div class="stage" :class="{ active: animationStage >= 3 && isErrorAnimation }">
                  <div class="stage-title">Выполнение с ошибкой</div>
                  <div class="stage-visual">
                    <div class="promise-box rejected">
                      <div class="promise-state">Отклонено (rejected)</div>
                      <div class="promise-icon">✗</div>
                      <div class="promise-result error">'Что-то пошло не так'</div>
                    </div>
                  </div>
                  <div class="stage-code">
                    <pre>reject(new Error('Что-то пошло не так'));</pre>
                  </div>
                </div>
                
                <div class="stage" :class="{ active: animationStage >= 4 && !isErrorAnimation }">
                  <div class="stage-title">Обработка успешного результата</div>
                  <div class="stage-visual">
                    <div class="handler-box then">
                      <div class="handler-title">.then()</div>
                      <div class="handler-code">result => console.log('Успех:', result);</div>
                    </div>
                    <div class="console-output">
                      <div class="console-line">Успех: Операция выполнена успешно!</div>
                    </div>
                  </div>
                </div>
                
                <div class="stage" :class="{ active: animationStage >= 4 && isErrorAnimation }">
                  <div class="stage-title">Обработка ошибки</div>
                  <div class="stage-visual">
                    <div class="handler-box catch">
                      <div class="handler-title">.catch()</div>
                      <div class="handler-code">error => console.error('Ошибка:', error.message);</div>
                    </div>
                    <div class="console-output error">
                      <div class="console-line">Ошибка: Что-то пошло не так</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="animation-explanation" v-if="animationStage > 0">
              <h4>Объяснение происходящего:</h4>
              <div v-if="animationStage === 1">
                <p>Создаётся новый Promise с помощью конструктора <code>new Promise()</code>. Promise находится в состоянии <strong>pending</strong> (ожидание).</p>
              </div>
              <div v-if="animationStage === 2">
                <p>Внутри Promise запускается асинхронная операция (setTimeout). Промис всё ещё находится в состоянии <strong>pending</strong> (ожидание).</p>
              </div>
              <div v-if="animationStage === 3 && !isErrorAnimation">
                <p>Асинхронная операция завершена успешно. Вызвана функция <code>resolve()</code> с результатом. Promise переходит в состояние <strong>fulfilled</strong> (выполнено).</p>
              </div>
              <div v-if="animationStage === 3 && isErrorAnimation">
                <p>Асинхронная операция завершена с ошибкой. Вызвана функция <code>reject()</code> с объектом ошибки. Promise переходит в состояние <strong>rejected</strong> (отклонено).</p>
              </div>
              <div v-if="animationStage === 4 && !isErrorAnimation">
                <p>Результат обрабатывается в методе <code>.then()</code>. В консоль выводится сообщение об успешном выполнении.</p>
              </div>
              <div v-if="animationStage === 4 && isErrorAnimation">
                <p>Ошибка обрабатывается в методе <code>.catch()</code>. В консоль выводится сообщение об ошибке.</p>
              </div>
            </div>
          </div>
          
          <div class="key-concepts">
            <h3>Ключевые особенности Promise</h3>
            <ul>
              <li><strong>Состояния неизменны</strong> — как только Promise переходит в состояние fulfilled или rejected, его состояние и результат не могут измениться.</li>
              <li><strong>Гарантированная асинхронность</strong> — обработчики .then() и .catch() всегда вызываются асинхронно, даже если Promise разрешается немедленно.</li>
              <li><strong>Цепочки</strong> — Promise можно объединять в цепочки, что делает код более читаемым и управляемым.</li>
              <li><strong>Обработка ошибок</strong> — Promise предоставляет удобный механизм для централизованной обработки ошибок через .catch().</li>
            </ul>
          </div>
        </div>
        
        <!-- 2. Методы Promise -->
        <div v-if="currentTab === 1" class="tab-content">
          <h2>Методы Promise</h2>
          
          <div class="methods-container">
            <div class="method-card">
              <h3>.then()</h3>
              <div class="method-description">
                <p>Метод <code>.then()</code> регистрирует обработчики для состояния выполнено (fulfilled) и, опционально, для состояния отклонено (rejected).</p>
                <pre class="code">
  myPromise.then(
    result => console.log('Успех:', result),
    error => console.error('Ошибка:', error) // опционально
  );</pre>
                <p><strong>Возвращает:</strong> Новый Promise, что позволяет создавать цепочки промисов.</p>
              </div>
            </div>
            
            <div class="method-card">
              <h3>.catch()</h3>
              <div class="method-description">
                <p>Метод <code>.catch()</code> регистрирует обработчик для состояния отклонено (rejected).</p>
                <pre class="code">
  myPromise.catch(error => {
    console.error('Ошибка:', error);
  });</pre>
                <p><strong>Эквивалентно:</strong> <code>.then(null, errorHandler)</code></p>
                <p><strong>Возвращает:</strong> Новый Promise, что позволяет продолжить цепочку.</p>
              </div>
            </div>
            
            <div class="method-card">
              <h3>.finally()</h3>
              <div class="method-description">
                <p>Метод <code>.finally()</code> регистрирует обработчик, который будет вызван независимо от результата промиса (успех или ошибка).</p>
                <pre class="code">
  myPromise
    .then(result => console.log('Успех:', result))
    .catch(error => console.error('Ошибка:', error))
    .finally(() => {
      console.log('Операция завершена (успешно или с ошибкой)');
      // Здесь обычно очищают ресурсы,
      // например, убирают индикатор загрузки
    });</pre>
                <p><strong>Возвращает:</strong> Новый Promise, что позволяет продолжить цепочку.</p>
              </div>
            </div>
            
            <div class="method-card">
              <h3>Promise.resolve()</h3>
              <div class="method-description">
                <p>Метод <code>Promise.resolve()</code> создаёт Promise, который немедленно переходит в состояние выполнено (fulfilled) с указанным значением.</p>
                <pre class="code">
  // Эти строки эквивалентны
  const p1 = Promise.resolve('Готово');
  const p2 = new Promise(resolve => resolve('Готово'));</pre>
                <p>Метод также преобразует thenable объекты (с методом .then) в настоящие промисы.</p>
              </div>
            </div>
            
            <div class="method-card">
              <h3>Promise.reject()</h3>
              <div class="method-description">
                <p>Метод <code>Promise.reject()</code> создаёт Promise, который немедленно переходит в состояние отклонено (rejected) с указанной причиной.</p>
                <pre class="code">
  // Эти строки эквивалентны
  const p1 = Promise.reject(new Error('Ошибка'));
  const p2 = new Promise((resolve, reject) => 
    reject(new Error('Ошибка')));</pre>
              </div>
            </div>
            
            <div class="method-card">
              <h3>Promise.all()</h3>
              <div class="method-description">
                <p>Метод <code>Promise.all()</code> принимает массив промисов и возвращает новый Promise, который выполняется, когда все промисы в массиве выполнены, или отклоняется, если хотя бы один из промисов отклонен.</p>
                <pre class="code">
  const promise1 = fetch('/api/users');
  const promise2 = fetch('/api/posts');
  const promise3 = fetch('/api/comments');
  
  Promise.all([promise1, promise2, promise3])
    .then(([usersResponse, postsResponse, commentsResponse]) => {
      // Все запросы выполнены успешно
      // Обработка результатов
    })
    .catch(error => {
      // Хотя бы один запрос завершился с ошибкой
      console.error('Ошибка при загрузке данных:', error);
    });</pre>
                <p><strong>Результат:</strong> Массив результатов всех промисов в том же порядке.</p>
              </div>
            </div>
            
            <div class="method-card">
              <h3>Promise.race()</h3>
              <div class="method-description">
                <p>Метод <code>Promise.race()</code> принимает массив промисов и возвращает новый Promise, который выполняется или отклоняется в зависимости от результата самого быстрого промиса в массиве.</p>
                <pre class="code">
  // Запрос с таймаутом
  function fetchWithTimeout(url, timeout) {
    const fetchPromise = fetch(url);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout')), timeout);
    });
    
    return Promise.race([fetchPromise, timeoutPromise]);
  }
  
  fetchWithTimeout('/api/data', 5000)
    .then(response => response.json())
    .then(data => console.log('Данные:', data))
    .catch(error => console.error('Ошибка:', error));</pre>
                <p><strong>Результат:</strong> Значение или ошибка самого быстрого промиса.</p>
              </div>
            </div>
            
            <div class="method-card">
              <h3>Promise.allSettled()</h3>
              <div class="method-description">
                <p>Метод <code>Promise.allSettled()</code> принимает массив промисов и возвращает новый Promise, который выполняется, когда все промисы завершены (успешно или с ошибкой).</p>
                <pre class="code">
  const promises = [
    fetch('/api/endpoint1'),
    fetch('/api/endpoint2'),
    fetch('/api/non-existent') // Этот запрос завершится с ошибкой
  ];
  
  Promise.allSettled(promises)
    .then(results => {
      // results - массив объектов с информацией о результате каждого промиса
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          console.log(`Промис ${index} выполнен:`, result.value);
        } else {
          console.log(`Промис ${index} отклонен:`, result.reason);
        }
      });
    });</pre>
                <p><strong>Результат:</strong> Массив объектов с информацией о результате каждого промиса (status, value/reason).</p>
              </div>
            </div>
            
            <div class="method-card">
              <h3>Promise.any()</h3>
              <div class="method-description">
                <p>Метод <code>Promise.any()</code> принимает массив промисов и возвращает новый Promise, который выполняется, как только один из промисов выполняется успешно.</p>
                <pre class="code">
  // Попытка загрузить изображение из разных источников
  const imageUrls = [
    'https://example.com/image.jpg',
    'https://backup1.example.com/image.jpg',
    'https://backup2.example.com/image.jpg'
  ];
  
  const imagePromises = imageUrls.map(url => {
    return fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Image not found');
        return response.blob();
      });
  });
  
  Promise.any(imagePromises)
    .then(imageBlob => {
      // Используем первое успешно загруженное изображение
      const imageUrl = URL.createObjectURL(imageBlob);
      document.querySelector('img').src = imageUrl;
    })
    .catch(error => {
      // Все промисы отклонены
      console.error('Все изображения недоступны:', error);
    });</pre>
                <p><strong>Результат:</strong> Значение первого успешно выполненного промиса.</p>
                <p><strong>Ошибка:</strong> AggregateError, если все промисы отклонены.</p>
              </div>
            </div>
          </div>
          
          <div class="methods-animation">
            <h3>Визуализация работы методов Promise</h3>
            
            <div class="methods-tabs">
              <button
                v-for="(tab, index) in methodTabs"
                :key="index"
                :class="['method-tab', { active: currentMethodTab === index }]"
                @click="setCurrentMethodTab(index)"
              >
                {{ tab.title }}
              </button>
            </div>
            
            <div class="method-animation-container">
              <!-- Promise.all анимация -->
              <div v-if="currentMethodTab === 0" class="method-animation">
                <div class="animation-description">
                  <p><code>Promise.all()</code> принимает массив промисов и ждёт выполнения <strong>всех</strong> промисов. Если все промисы выполнены успешно, возвращает массив результатов. Если хотя бы один промис отклонён, возвращает ошибку первого отклонённого промиса.</p>
                </div>
                
                <div class="animation-controls">
                  <button @click="runMethodAnimation('all', 'success')" class="success-button">Все успешно</button>
                  <button @click="runMethodAnimation('all', 'error')" class="error-button">С ошибкой</button>
                </div>
                
                <div class="animation-visual all-animation">
                  <div class="promise-row">
                    <div class="promise-label">Promise 1:</div>
                    <div class="progress-container">
                      <div 
                        class="progress-bar" 
                        :class="getPromiseStateClass(methodAnimationStage, 0, methodAnimationType)" 
                        :style="{ width: getProgressWidth(methodAnimationStage, 0) + '%' }"
                      ></div>
                    </div>
                    <div class="promise-result" :class="getPromiseStateClass(methodAnimationStage, 0, methodAnimationType)">
                      {{ getPromiseResult(methodAnimationStage, 0, methodAnimationType) }}
                    </div>
                  </div>
                  
                  <div class="promise-row">
                    <div class="promise-label">Promise 2:</div>
                    <div class="progress-container">
                      <div 
                        class="progress-bar" 
                        :class="getPromiseStateClass(methodAnimationStage, 1, methodAnimationType)" 
                        :style="{ width: getProgressWidth(methodAnimationStage, 1) + '%' }"
                      ></div>
                    </div>
                    <div class="promise-result" :class="getPromiseStateClass(methodAnimationStage, 1, methodAnimationType)">
                      {{ getPromiseResult(methodAnimationStage, 1, methodAnimationType) }}
                    </div>
                  </div>
                  
                  <div class="promise-row">
                    <div class="promise-label">Promise 3:</div>
                    <div class="progress-container">
                      <div 
                        class="progress-bar" 
                        :class="getPromiseStateClass(methodAnimationStage, 2, methodAnimationType)" 
                        :style="{ width: getProgressWidth(methodAnimationStage, 2) + '%' }"
                      ></div>
                    </div>
                    <div class="promise-result" :class="getPromiseStateClass(methodAnimationStage, 2, methodAnimationType)">
                      {{ getPromiseResult(methodAnimationStage, 2, methodAnimationType) }}
                    </div>
                  </div>
                  
                  <div class="promise-all-result" v-if="methodAnimationStage >= 3">
                    <div class="result-label">Promise.all результат:</div>
                    <div class="result-value" :class="{ 'rejected': methodAnimationType === 'error' }">
                      {{ methodAnimationType === 'success' 
                        ? '[ "Результат 1", "Результат 2", "Результат 3" ]' 
                        : 'Error: Ошибка в Promise 2' }}
                    </div>
                  </div>
                </div>
                
                <div class="animation-explanation">
                  <div v-if="methodAnimationStage === 0">
                    <p>Запуск Promise.all с массивом из трёх промисов.</p>
                  </div>
                  <div v-else-if="methodAnimationStage === 1">
                    <p>Первый промис завершается.</p>
                  </div>
                  <div v-else-if="methodAnimationStage === 2">
                    <p v-if="methodAnimationType === 'success'">Второй промис завершается.</p>
                    <p v-else>Второй промис завершается с ошибкой. Promise.all сразу же отклоняется!</p>
                  </div>
                  <div v-else-if="methodAnimationStage === 3">
                    <p v-if="methodAnimationType === 'success'">Третий промис завершается. Теперь Promise.all возвращает массив всех результатов.</p>
                    <p v-else>Promise.all отклонён с ошибкой из второго промиса, даже если другие промисы успешны.</p>
                  </div>
                </div>
              </div>
              
              <!-- Promise.race анимация -->
              <div v-if="currentMethodTab === 1" class="method-animation">
                <div class="animation-description">
                  <p><code>Promise.race()</code> принимает массив промисов и возвращает результат <strong>самого быстрого</strong> промиса (успешного или с ошибкой).</p>
                </div>
                
                <div class="animation-controls">
                  <button @click="runMethodAnimation('race', 'success')" class="success-button">Первый успешно</button>
                  <button @click="runMethodAnimation('race', 'error')" class="error-button">Первый с ошибкой</button>
                </div>
                
                <div class="animation-visual race-animation">
                  <div class="promise-row">
                    <div class="promise-label">Promise 1 (быстрый):</div>
                    <div class="progress-container">
                      <div 
                        class="progress-bar" 
                        :class="getPromiseStateClass(methodAnimationStage, 0, methodAnimationType)" 
                        :style="{ width: getProgressWidth(methodAnimationStage, 0, true) + '%' }"
                      ></div>
                    </div>
                    <div class="promise-result" :class="getPromiseStateClass(methodAnimationStage, 0, methodAnimationType)">
                      {{ methodAnimationStage >= 1 ? (methodAnimationType === 'success' ? '"Быстрый результат"' : 'Error: Быстрая ошибка') : '' }}
                    </div>
                  </div>
                  
                  <div class="promise-row">
                    <div class="promise-label">Promise 2 (медленный):</div>
                    <div class="progress-container">
                      <div 
                        class="progress-bar" 
                        :class="{'pending': true, 'inactive': methodAnimationStage >= 2}" 
                        :style="{ width: Math.min(methodAnimationStage * 20, 60) + '%' }"
                      ></div>
                    </div>
                    <div class="promise-result inactive" v-if="methodAnimationStage >= 2">
                      Игнорируется
                    </div>
                  </div>
                  
                  <div class="promise-row">
                    <div class="promise-label">Promise 3 (медленный):</div>
                    <div class="progress-container">
                      <div 
                        class="progress-bar" 
                        :class="{'pending': true, 'inactive': methodAnimationStage >= 2}" 
                        :style="{ width: Math.min(methodAnimationStage * 10, 40) + '%' }"
                      ></div>
                    </div>
                    <div class="promise-result inactive" v-if="methodAnimationStage >= 2">
                      Игнорируется
                    </div>
                  </div>
                  
                  <div class="promise-race-result" v-if="methodAnimationStage >= 2">
                    <div class="result-label">Promise.race результат:</div>
                    <div class="result-value" :class="{ 'rejected': methodAnimationType === 'error' }">
                      {{ methodAnimationType === 'success' ? '"Быстрый результат"' : 'Error: Быстрая ошибка' }}
                    </div>
                  </div>
                </div>
                
                <div class="animation-explanation">
                  <div v-if="methodAnimationStage === 0">
                    <p>Запуск Promise.race с массивом из трёх промисов. Каждый выполняется со своей скоростью.</p>
                  </div>
                  <div v-else-if="methodAnimationStage === 1">
                    <p>Первый промис завершается быстрее всех.</p>
                  </div>
                  <div v-else-if="methodAnimationStage >= 2">
                    <p v-if="methodAnimationType === 'success'">Promise.race немедленно разрешается со значением самого быстрого промиса. Остальные промисы игнорируются.</p>
                    <p v-else>Promise.race немедленно отклоняется с ошибкой самого быстрого промиса. Остальные промисы игнорируются.</p>
                  </div>
                </div>
              </div>
              
              <!-- Promise.allSettled анимация -->
              <div v-if="currentMethodTab === 2" class="method-animation">
                <div class="animation-description">
                  <p><code>Promise.allSettled()</code> ждёт завершения <strong>всех</strong> промисов, независимо от их результата, и возвращает массив объектов с информацией о статусе и результате каждого промиса.</p>
                </div>
                
                <div class="animation-controls">
                  <button @click="runMethodAnimation('allSettled', 'mixed')" class="mixed-button">Запустить анимацию</button>
                </div>
                
                <div class="animation-visual allsettled-animation">
                  <div class="promise-row">
                    <div class="promise-label">Promise 1:</div>
                    <div class="progress-container">
                      <div 
                        class="progress-bar" 
                        :class="getPromiseStateClass(methodAnimationStage, 0, 'success')" 
                        :style="{ width: getProgressWidth(methodAnimationStage, 0) + '%' }"
                      ></div>
                    </div>
                    <div class="promise-result" :class="getPromiseStateClass(methodAnimationStage, 0, 'success')">
                      {{ getPromiseResult(methodAnimationStage, 0, 'success') }}
                    </div>
                  </div>
                  
                  <div class="promise-row">
                    <div class="promise-label">Promise 2:</div>
                    <div class="progress-container">
                      <div 
                        class="progress-bar" 
                        :class="getPromiseStateClass(methodAnimationStage, 1, 'error')" 
                        :style="{ width: getProgressWidth(methodAnimationStage, 1) + '%' }"
                      ></div>
                    </div>
                    <div class="promise-result" :class="getPromiseStateClass(methodAnimationStage, 1, 'error')">
                      {{ getPromiseResult(methodAnimationStage, 1, 'error') }}
                    </div>
                  </div>
                  
                  <div class="promise-row">
                    <div class="promise-label">Promise 3:</div>
                    <div class="progress-container">
                      <div 
                        class="progress-bar" 
                        :class="getPromiseStateClass(methodAnimationStage, 2, 'success')" 
                        :style="{ width: getProgressWidth(methodAnimationStage, 2) + '%' }"
                      ></div>
                    </div>
                    <div class="promise-result" :class="getPromiseStateClass(methodAnimationStage, 2, 'success')">
                      {{ getPromiseResult(methodAnimationStage, 2, 'success') }}
                    </div>
                  </div>
                  
                  <div class="promise-allsettled-result" v-if="methodAnimationStage >= 4">
                    <div class="result-label">Promise.allSettled результат:</div>
                    <div class="result-value">
                      <pre>[
    { status: "fulfilled", value: "Результат 1" },
    { status: "rejected", reason: "Ошибка в Promise 2" },
    { status: "fulfilled", value: "Результат 3" }
  ]</pre>
                    </div>
                  </div>
                </div>
                
                <div class="animation-explanation">
                  <div v-if="methodAnimationStage === 0">
                    <p>Запуск Promise.allSettled с массивом из трёх промисов.</p>
                  </div>
                  <div v-else-if="methodAnimationStage === 1">
                    <p>Первый промис завершается успешно.</p>
                  </div>
                  <div v-else-if="methodAnimationStage === 2">
                    <p>Второй промис завершается с ошибкой. Но Promise.allSettled продолжает ждать остальные промисы!</p>
                  </div>
                  <div v-else-if="methodAnimationStage === 3">
                    <p>Третий промис завершается успешно.</p>
                  </div>
                  <div v-else-if="methodAnimationStage >= 4">
                    <p>Promise.allSettled возвращает массив, содержащий результаты всех промисов с их статусом — fulfilled или rejected.</p>
                  </div>
                </div>
              </div>
              
              <!-- Promise.any анимация -->
              <div v-if="currentMethodTab === 3" class="method-animation">
                <div class="animation-description">
                  <p><code>Promise.any()</code> возвращает результат <strong>первого успешно выполненного</strong> промиса. Если все промисы завершаются с ошибкой, возвращает AggregateError.</p>
                </div>
                
                <div class="animation-controls">
                  <button @click="runMethodAnimation('any', 'success')" class="success-button">Один успешно</button>
                  <button @click="runMethodAnimation('any', 'allfail')" class="error-button">Все с ошибкой</button>
                </div>
                
                <div class="animation-visual any-animation">
                  <div class="promise-row">
                    <div class="promise-label">Promise 1:</div>
                    <div class="progress-container">
                      <div 
                        class="progress-bar" 
                        :class="getPromiseStateClass(methodAnimationStage, 0, methodAnimationType === 'allfail' ? 'error' : 'error')" 
                        :style="{ width: getProgressWidth(methodAnimationStage, 0) + '%' }"
                      ></div>
                    </div>
                    <div class="promise-result" :class="getPromiseStateClass(methodAnimationStage, 0, methodAnimationType === 'allfail' ? 'error' : 'error')">
                      {{ methodAnimationStage >= 1 ? 'Error: Ошибка 1' : '' }}
                    </div>
                  </div>
                  
                  <div class="promise-row">
                    <div class="promise-label">Promise 2:</div>
                    <div class="progress-container">
                      <div 
                        class="progress-bar" 
                        :class="getPromiseStateClass(methodAnimationStage, 1, methodAnimationType === 'allfail' ? 'error' : 'success')" 
                        :style="{ width: getProgressWidth(methodAnimationStage, 1) + '%' }"
                      ></div>
                    </div>
                    <div class="promise-result" :class="getPromiseStateClass(methodAnimationStage, 1, methodAnimationType === 'allfail' ? 'error' : 'success')">
                      {{ methodAnimationStage >= 2 ? (methodAnimationType === 'allfail' ? 'Error: Ошибка 2' : '"Успешный результат 2"') : '' }}
                    </div>
                  </div>
                  
                  <div class="promise-row">
                    <div class="promise-label">Promise 3:</div>
                    <div class="progress-container">
                      <div 
                        class="progress-bar" 
                        :class="{'pending': methodAnimationStage < 3, 'rejected': methodAnimationType === 'allfail' && methodAnimationStage >= 3, 'inactive': methodAnimationType === 'success' && methodAnimationStage >= 3}" 
                        :style="{ width: methodAnimationStage < 3 ? Math.min(methodAnimationStage * 15, 45) + '%' : (methodAnimationType === 'allfail' ? '100%' : '45%') }"
                      ></div>
                    </div>
                    <div 
                      class="promise-result" 
                      :class="{'rejected': methodAnimationType === 'allfail' && methodAnimationStage >= 3, 'inactive': methodAnimationType === 'success' && methodAnimationStage >= 3}"
                    >
                      {{ methodAnimationStage >= 3 && methodAnimationType === 'allfail' ? 'Error: Ошибка 3' : (methodAnimationStage >= 3 ? 'Игнорируется' : '') }}
                    </div>
                  </div>
                  
                  <div class="promise-any-result" v-if="methodAnimationStage >= 3">
                    <div class="result-label">Promise.any результат:</div>
                    <div class="result-value" :class="{ 'rejected': methodAnimationType === 'allfail' }">
                      {{ methodAnimationType === 'success' 
                        ? '"Успешный результат 2"' 
                        : 'AggregateError: All promises were rejected' }}
                    </div>
                  </div>
                </div>
                
                <div class="animation-explanation">
                  <div v-if="methodAnimationStage === 0">
                    <p>Запуск Promise.any с массивом из трёх промисов.</p>
                  </div>
                  <div v-else-if="methodAnimationStage === 1">
                    <p>Первый промис завершается с ошибкой. Promise.any продолжает ждать другие промисы.</p>
                  </div>
                  <div v-else-if="methodAnimationStage === 2">
                    <p v-if="methodAnimationType === 'success'">Второй промис завершается успешно! Promise.any немедленно возвращает этот результат.</p>
                    <p v-else>Второй промис также завершается с ошибкой. Promise.any продолжает ждать последний промис.</p>
                  </div>
                  <div v-else-if="methodAnimationStage >= 3">
                    <p v-if="methodAnimationType === 'success'">Promise.any возвращает результат первого успешного промиса. Остальные промисы игнорируются.</p>
                    <p v-else>Все промисы завершились с ошибкой! Promise.any возвращает AggregateError, содержащий все ошибки.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 3. Цепочки промисов -->
        <div v-if="currentTab === 2" class="tab-content">
          <h2>Цепочки Promise</h2>
          
          <div class="concept-explanation">
            <p>Одно из главных преимуществ Promise — возможность создавать цепочки асинхронных операций. Каждый вызов <code>.then()</code> или <code>.catch()</code> возвращает новый Promise, что позволяет строить последовательности операций.</p>
          </div>
          
          <div class="chaining-example">
            <h3>Пример простой цепочки промисов</h3>
            
            <div class="code-example">
              <pre class="code">
  fetchUserData(userId)
    .then(userData => {
      // Обработка данных пользователя
      console.log('Пользователь:', userData.name);
      // Возвращаем промис для следующего шага
      return fetchUserPosts(userData.id);
    })
    .then(posts => {
      // Обработка постов пользователя
      console.log('Количество постов:', posts.length);
      // Возвращаем промис для следующего шага
      return fetchPostComments(posts[0].id);
    })
    .then(comments => {
      // Обработка комментариев
      console.log('Количество комментариев:', comments.length);
    })
    .catch(error => {
      // Обработка всех возможных ошибок в цепочке
      console.error('Произошла ошибка:', error);
    });</pre>
            </div>
            
            <div class="explanation">
              <h4>Как работают цепочки промисов:</h4>
              <ol>
                <li>Каждый <code>.then()</code> возвращает <strong>новый Promise</strong>.</li>
                <li>Значение, возвращаемое из обработчика <code>.then()</code>, автоматически оборачивается в Promise.</li>
                <li>Если обработчик возвращает Promise, следующий <code>.then()</code> ждёт его выполнения.</li>
                <li>Если в цепочке возникает ошибка, выполнение переходит к ближайшему <code>.catch()</code>.</li>
                <li>После <code>.catch()</code> выполнение может продолжиться, если вы возвращаете значение.</li>
              </ol>
            </div>
          </div>
          
          <div class="chaining-visualization">
            <h3>Визуализация цепочки промисов</h3>
            
            <div class="animation-controls">
              <button @click="runChainingAnimation('success')" class="success-button">Успешное выполнение</button>
              <button @click="runChainingAnimation('error')" class="error-button">С ошибкой в середине</button>
            </div>
            
            <div class="chain-animation-container">
              <div class="chain-visual">
                <div class="chain-step" :class="{ active: chainingStage >= 1, error: chainingStage >= 3 && chainingAnimationType === 'error' }">
                  <div class="step-title">fetchUserData()</div>
                  <div class="step-arrow" v-if="chainingStage >= 2 && !(chainingStage >= 3 && chainingAnimationType === 'error')"></div>
                  <div class="step-error-arrow" v-if="chainingStage >= 3 && chainingAnimationType === 'error'"></div>
                </div>
                
                <div class="chain-step" :class="{ active: chainingStage >= 2, skipped: chainingStage >= 3 && chainingAnimationType === 'error' }">
                  <div class="step-title">.then(userData => { ... })</div>
                  <div class="step-content" v-if="chainingStage >= 2 && !(chainingStage >= 3 && chainingAnimationType === 'error')">
                    <div class="code-snippet">return fetchUserPosts(userData.id);</div>
                  </div>
                  <div class="step-arrow" v-if="chainingStage >= 3 && chainingAnimationType !== 'error'"></div>
                </div>
                
                <div class="chain-step" :class="{ active: chainingStage >= 3 && chainingAnimationType !== 'error', skipped: chainingStage >= 3 && chainingAnimationType === 'error' }">
                  <div class="step-title">.then(posts => { ... })</div>
                  <div class="step-content" v-if="chainingStage >= 3 && chainingAnimationType !== 'error'">
                    <div class="code-snippet">return fetchPostComments(posts[0].id);</div>
                  </div>
                  <div class="step-arrow" v-if="chainingStage >= 4 && chainingAnimationType !== 'error'"></div>
                </div>
                
                <div class="chain-step" :class="{ active: chainingStage >= 4 && chainingAnimationType !== 'error', skipped: chainingStage >= 3 && chainingAnimationType === 'error' }">
                  <div class="step-title">.then(comments => { ... })</div>
                  <div class="step-content" v-if="chainingStage >= 4 && chainingAnimationType !== 'error'">
                    <div class="console-output">Количество комментариев: 5</div>
                  </div>
                </div>
                
                <div class="chain-step catch-block" :class="{ active: chainingStage >= 3 && chainingAnimationType === 'error' }">
                  <div class="step-title">.catch(error => { ... })</div>
                  <div class="step-content" v-if="chainingStage >= 3 && chainingAnimationType === 'error'">
                    <div class="console-output error">Произошла ошибка: Could not fetch posts</div>
                  </div>
                </div>
              </div>
              
              <div class="chain-explanation">
                <div v-if="chainingStage === 0">
                  <p>Нажмите кнопку "Запустить", чтобы увидеть, как работает цепочка промисов.</p>
                </div>
                <div v-else-if="chainingStage === 1">
                  <p>Начало выполнения. Вызываем <code>fetchUserData(userId)</code>, который возвращает Promise.</p>
                </div>
                <div v-else-if="chainingStage === 2 && chainingAnimationType !== 'error'">
                  <p>Promise выполнен успешно. Запускается первый обработчик <code>.then()</code>. Он обрабатывает данные пользователя и возвращает новый Promise <code>fetchUserPosts()</code>.</p>
                </div>
                <div v-else-if="chainingStage === 3 && chainingAnimationType !== 'error'">
                  <p>Promise <code>fetchUserPosts()</code> выполнен успешно. Запускается второй обработчик <code>.then()</code>. Он обрабатывает посты и возвращает Promise <code>fetchPostComments()</code>.</p>
                </div>
                <div v-else-if="chainingStage >= 4 && chainingAnimationType !== 'error'">
                  <p>Promise <code>fetchPostComments()</code> выполнен успешно. Запускается третий обработчик <code>.then()</code>, который выводит информацию о комментариях в консоль.</p>
                </div>
                <div v-else-if="chainingStage >= 3 && chainingAnimationType === 'error'">
                  <p>При выполнении Promise <code>fetchUserPosts()</code> произошла ошибка. Управление сразу переходит к ближайшему <code>.catch()</code>, пропуская все промежуточные <code>.then()</code>.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="chaining-tips">
            <h3>Важные моменты при работе с цепочками Promise</h3>
            
            <div class="tip-card">
              <h4>Возвращайте значения из обработчиков</h4>
              <div class="tip-content">
                <p>Всегда возвращайте значения или промисы из обработчиков <code>.then()</code>, чтобы передавать данные по цепочке:</p>
                <div class="code-comparison">
                  <div class="code-block bad">
                    <h5>❌ Неправильно</h5>
                    <pre class="code">
  getData()
    .then(data => {
      // Нет return - следующий then не получит данные
      processData(data);
    })
    .then(processedData => {
      // processedData будет undefined!
      displayData(processedData);
    });</pre>
                  </div>
                  <div class="code-block good">
                    <h5>✅ Правильно</h5>
                    <pre class="code">
  getData()
    .then(data => {
      // Возвращаем результат для следующего then
      return processData(data);
    })
    .then(processedData => {
      // processedData содержит результат
      displayData(processedData);
    });</pre>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="tip-card">
              <h4>Обработка ошибок</h4>
              <div class="tip-content">
                <p>У вас есть несколько стратегий для обработки ошибок в цепочках:</p>
                <div class="code-comparison">
                  <div class="code-block">
                    <h5>1. Один catch в конце</h5>
                    <pre class="code">
  fetchData()
    .then(step1)
    .then(step2)
    .then(step3)
    .catch(error => {
      // Ловит ошибки из всех предыдущих шагов
      console.error('Ошибка в цепочке:', error);
    });</pre>
                  </div>
                  <div class="code-block">
                    <h5>2. Несколько catch для разных секций</h5>
                    <pre class="code">
  fetchData()
    .then(step1)
    .then(step2)
    .catch(error => {
      // Ловит ошибки только из fetchData, step1 и step2
      console.error('Ошибка в первой части:', error);
      // Возвращаем запасные данные для продолжения цепочки
      return backupData;
    })
    .then(step3)
    .catch(error => {
      // Ловит ошибки только из step3
      console.error('Ошибка в step3:', error);
    });</pre>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="tip-card">
              <h4>Распространенные ошибки</h4>
              <div class="tip-content">
                <div class="common-mistake">
                  <h5>1. Забывать обрабатывать ошибки</h5>
                  <p>Необработанные отклонённые промисы могут привести к "Unhandled Promise Rejection" и сделать отладку сложнее.</p>
                </div>
                <div class="common-mistake">
                  <h5>2. Вложенность вместо цепочек</h5>
                  <div class="code-comparison">
                    <div class="code-block bad">
                      <h5>❌ Promise Hell (как колбэк-ад)</h5>
                      <pre class="code">
  fetchUser().then(user => {
    fetchPosts(user.id).then(posts => {
      fetchComments(posts[0].id).then(comments => {
        // Глубокая вложенность
      }).catch(error => {
        // Обрабатывает только ошибки fetchComments
      });
    }).catch(error => {
      // Обрабатывает только ошибки fetchPosts
    });
  }).catch(error => {
    // Обрабатывает только ошибки fetchUser
  });</pre>
                    </div>
                    <div class="code-block good">
                      <h5>✅ Правильно (цепочка)</h5>
                      <pre class="code">
  fetchUser()
    .then(user => fetchPosts(user.id))
    .then(posts => fetchComments(posts[0].id))
    .then(comments => {
      // Обработка комментариев
    })
    .catch(error => {
      // Ловит все ошибки в цепочке
    });</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 4. Async/Await -->
        <div v-if="currentTab === 3" class="tab-content">
          <h2>Async/Await - современный способ работы с промисами</h2>
          
          <div class="concept-explanation">
            <p><code>async/await</code> — это синтаксический сахар поверх промисов, который делает асинхронный код похожим на синхронный, сохраняя при этом неблокирующее выполнение.</p>
            
            <div class="syntax-comparison">
              <div class="comparison-column">
                <h3>С использованием Promise цепочек</h3>
                <pre class="code">
  function fetchUserData(userId) {
    return fetch(`/api/users/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке пользователя');
        }
        return response.json();
      })
      .then(userData => {
        return fetch(`/api/posts?userId=${userData.id}`);
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке постов');
        }
        return response.json();
      })
      .then(posts => {
        console.log(`У пользователя ${posts.length} постов`);
        return posts;
      })
      .catch(error => {
        console.error('Ошибка:', error);
        throw error;
      });
  }</pre>
              </div>
              <div class="comparison-column">
                <h3>С использованием async/await</h3>
                <pre class="code">
  async function fetchUserData(userId) {
    try {
      // Ждём завершения первого запроса
      const userResponse = await fetch(`/api/users/${userId}`);
      if (!userResponse.ok) {
        throw new Error('Ошибка при загрузке пользователя');
      }
      
      // Ждём парсинга JSON
      const userData = await userResponse.json();
      
      // Ждём завершения второго запроса
      const postsResponse = await fetch(`/api/posts?userId=${userData.id}`);
      if (!postsResponse.ok) {
        throw new Error('Ошибка при загрузке постов');
      }
      
      // Ждём парсинга JSON
      const posts = await postsResponse.json();
      
      console.log(`У пользователя ${posts.length} постов`);
      return posts;
    } catch (error) {
      console.error('Ошибка:', error);
      throw error;
    }
  }</pre>
              </div>
            </div>
            
            <div class="async-await-explanation">
              <h3>Основные принципы async/await</h3>
              <ol>
                <li><strong>async</strong> — ключевое слово, которое превращает функцию в асинхронную. Функция, объявленная с <code>async</code>, всегда возвращает Promise.</li>
                <li><strong>await</strong> — ключевое слово, которое приостанавливает выполнение асинхронной функции до тех пор, пока промис не выполнится.</li>
                <li>Выражение <code>await</code> возвращает результат выполненного промиса.</li>
                <li>Если промис отклоняется, <code>await</code> выбрасывает исключение, которое можно обработать с помощью <code>try/catch</code>.</li>
                <li><code>await</code> можно использовать только внутри функций, объявленных с <code>async</code>.</li>
              </ol>
            </div>
          </div>
          
          <div class="async-await-demo">
            <h3>Демонстрация работы async/await</h3>
            
            <div class="animation-controls">
              <button @click="runAsyncAwaitAnimation('success')" class="success-button">С успешным выполнением</button>
              <button @click="runAsyncAwaitAnimation('error')" class="error-button">С ошибкой</button>
            </div>
            
            <div class="async-await-animation">
              <div class="code-execution">
                <pre class="code async-code" ref="asyncCodeBlock">
  async function fetchUserData(userId) {
    try {
      <span class="highlight-line" :class="{ active: asyncAwaitStage === 1 }">const userResponse = await fetch(`/api/users/${userId}`);</span>
      <span class="highlight-line" :class="{ active: asyncAwaitStage === 2 }">if (!userResponse.ok) {
        throw new Error('Ошибка при загрузке пользователя');
      }</span>
      
      <span class="highlight-line" :class="{ active: asyncAwaitStage === 3 }">const userData = await userResponse.json();</span>
      
      <span class="highlight-line" :class="{ active: asyncAwaitStage === 4, error: asyncAwaitAnimationType === 'error' }">const postsResponse = await fetch(`/api/posts?userId=${userData.id}`);</span>
      <span class="highlight-line" :class="{ active: asyncAwaitStage === 5 && asyncAwaitAnimationType !== 'error' }">if (!postsResponse.ok) {
        throw new Error('Ошибка при загрузке постов');
      }</span>
      
      <span class="highlight-line" :class="{ active: asyncAwaitStage === 6 && asyncAwaitAnimationType !== 'error' }">const posts = await postsResponse.json();</span>
      
      <span class="highlight-line" :class="{ active: asyncAwaitStage === 7 && asyncAwaitAnimationType !== 'error' }">console.log(`У пользователя ${posts.length} постов`);
      return posts;</span>
    } catch (error) {
      <span class="highlight-line" :class="{ active: asyncAwaitStage === 5 && asyncAwaitAnimationType === 'error' }">console.error('Ошибка:', error);
      throw error;</span>
    }
  }
                </pre>
              </div>
              
              <div class="execution-flow">
                <div class="flow-stage" :class="{ active: asyncAwaitStage >= 1 }">
                  <div class="stage-label">1. Вызов fetch и ожидание ответа</div>
                  <div class="promise-state pending" :class="{ fulfilled: asyncAwaitStage >= 2 }">
                    <div v-if="asyncAwaitStage < 2">⏳ Ожидание...</div>
                    <div v-else>✓ Получен ответ</div>
                  </div>
                </div>
                
                <div class="flow-stage" :class="{ active: asyncAwaitStage >= 2 }">
                  <div class="stage-label">2. Проверка ответа</div>
                  <div class="promise-check">
                    <div>response.ok === true</div>
                  </div>
                </div>
                
                <div class="flow-stage" :class="{ active: asyncAwaitStage >= 3 }">
                  <div class="stage-label">3. Парсинг JSON</div>
                  <div class="promise-state pending" :class="{ fulfilled: asyncAwaitStage >= 4 }">
                    <div v-if="asyncAwaitStage < 4">⏳ Парсинг...</div>
                    <div v-else>✓ Данные получены</div>
                  </div>
                </div>
                
                <div class="flow-stage" :class="{ active: asyncAwaitStage >= 4 }">
                  <div class="stage-label">4. Второй запрос fetch</div>
                  <div class="promise-state pending" :class="{ fulfilled: asyncAwaitStage >= 5 && asyncAwaitAnimationType !== 'error', rejected: asyncAwaitStage >= 5 && asyncAwaitAnimationType === 'error' }">
                    <div v-if="asyncAwaitStage < 5">⏳ Ожидание...</div>
                    <div v-else-if="asyncAwaitAnimationType !== 'error'">✓ Получен ответ</div>
                    <div v-else>✗ Ошибка запроса</div>
                  </div>
                </div>
                
                <div v-if="asyncAwaitAnimationType === 'error' && asyncAwaitStage >= 5" class="flow-stage error active">
                  <div class="stage-label">5. Обработка ошибки в catch блоке</div>
                  <div class="promise-state rejected">
                    <div>✗ Ошибка перехвачена</div>
                  </div>
                  <div class="console-output error">
                    <div class="console-line">Ошибка: Ошибка при загрузке постов</div>
                  </div>
                </div>
                
                <div v-if="asyncAwaitAnimationType !== 'error'" class="flow-stages-success">
                  <div class="flow-stage" :class="{ active: asyncAwaitStage >= 5 }">
                    <div class="stage-label">5. Проверка второго ответа</div>
                    <div class="promise-check">
                      <div>response.ok === true</div>
                    </div>
                  </div>
                  
                  <div class="flow-stage" :class="{ active: asyncAwaitStage >= 6 }">
                    <div class="stage-label">6. Парсинг JSON постов</div>
                    <div class="promise-state pending" :class="{ fulfilled: asyncAwaitStage >= 7 }">
                      <div v-if="asyncAwaitStage < 7">⏳ Парсинг...</div>
                      <div v-else>✓ Посты получены</div>
                    </div>
                  </div>
                  
                  <div class="flow-stage" :class="{ active: asyncAwaitStage >= 7 }">
                    <div class="stage-label">7. Завершение</div>
                    <div class="console-output">
                      <div class="console-line">У пользователя 5 постов</div>
                    </div>
                    <div class="return-value">
                      <div>return: [...массив постов...]</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="async-await-explanation" v-if="asyncAwaitStage > 0">
              <h4>Объяснение:</h4>
              <div v-if="asyncAwaitStage === 1">
                <p>Выполнение функции приостанавливается на <code>await fetch()</code>. Функция fetch() возвращает Promise, и JavaScript "ждёт" результата, но не блокирует основной поток.</p>
              </div>
              <div v-else-if="asyncAwaitStage === 2">
                <p>Промис от fetch выполнен. Теперь проверяем успешность запроса через <code>userResponse.ok</code>.</p>
              </div>
              <div v-else-if="asyncAwaitStage === 3">
                <p>Выполнение снова приостанавливается на <code>await userResponse.json()</code>. Метод json() также возвращает Promise, который резрешается в данные JSON.</p>
              </div>
              <div v-else-if="asyncAwaitStage === 4">
                <p>Получены данные пользователя. Теперь выполнение приостанавливается на втором <code>await fetch()</code> для получения постов пользователя.</p>
              </div>
              <div v-else-if="asyncAwaitStage === 5 && asyncAwaitAnimationType === 'error'">
                <p>Произошла ошибка при втором запросе! Управление переходит в блок <code>catch</code>, где ошибка логируется и пробрасывается дальше.</p>
              </div>
              <div v-else-if="asyncAwaitStage === 5 && asyncAwaitAnimationType !== 'error'">
                <p>Второй запрос успешно выполнен. Проверяем его успешность через <code>postsResponse.ok</code>.</p>
              </div>
              <div v-else-if="asyncAwaitStage === 6">
                <p>Выполнение приостанавливается на <code>await postsResponse.json()</code> для парсинга ответа в JSON.</p>
              </div>
              <div v-else-if="asyncAwaitStage === 7">
                <p>Все данные получены! Выводим информацию в консоль и возвращаем результат. Хотя мы просто используем <code>return posts</code>, асинхронная функция автоматически оборачивает результат в выполненный Promise.</p>
              </div>
            </div>
          </div>
          
          <div class="async-await-tips">
            <h3>Советы по использованию async/await</h3>
            
            <div class="tip-grid">
              <div class="tip-card">
                <h4>Обработка ошибок</h4>
                <p>С async/await вы можете использовать стандартный блок try/catch для обработки ошибок, что делает код более понятным.</p>
                <pre class="code">
  async function fetchData() {
    try {
      const data = await riskyOperation();
      return process(data);
    } catch (error) {
      console.error('Произошла ошибка:', error);
      // Можно вернуть запасное значение
      return defaultValue;
    }
  }</pre>
              </div>
              
              <div class="tip-card">
                <h4>Параллельное выполнение</h4>
                <p>Если вам не нужно дожидаться выполнения одного запроса перед другим, запускайте их параллельно:</p>
                <div class="code-comparison">
                  <div class="code-block bad">
                    <h5>❌ Последовательно (медленно)</h5>
                    <pre class="code">
  async function fetchAll() {
    const users = await fetchUsers();
    const posts = await fetchPosts();
    const comments = await fetchComments();
    return { users, posts, comments };
  }</pre>
                  </div>
                  <div class="code-block good">
                    <h5>✅ Параллельно (быстрее)</h5>
                    <pre class="code">
  async function fetchAll() {
    // Запускаем все запросы одновременно
    const usersPromise = fetchUsers();
    const postsPromise = fetchPosts();
    const commentsPromise = fetchComments();
    
    // Дожидаемся выполнения всех
    const users = await usersPromise;
    const posts = await postsPromise;
    const comments = await commentsPromise;
    
    return { users, posts, comments };
  }
  
  // Или ещё проще:
  async function fetchAll() {
    // Promise.all запускает все промисы параллельно
    const [users, posts, comments] = await Promise.all([
      fetchUsers(),
      fetchPosts(),
      fetchComments()
    ]);
    
    return { users, posts, comments };
  }</pre>
                  </div>
                </div>
              </div>
              
              <div class="tip-card">
                <h4>Циклы и await</h4>
                <p>Будьте внимательны с циклами и await. В зависимости от задачи, вам может понадобиться последовательное или параллельное выполнение:</p>
                <div class="code-comparison">
                  <div class="code-block">
                    <h5>Последовательная обработка</h5>
                    <pre class="code">
  // Каждая итерация ждёт завершения предыдущей
  async function processSequentially(items) {
    const results = [];
    
    for (const item of items) {
      // Ждём завершения каждой операции
      const result = await processItem(item);
      results.push(result);
    }
    
    return results;
  }</pre>
                  </div>
                  <div class="code-block">
                    <h5>Параллельная обработка</h5>
                    <pre class="code">
  // Все итерации запускаются одновременно
  async function processInParallel(items) {
    // Создаём массив промисов
    const promises = items.map(item => processItem(item));
    
    // Ждём завершения всех параллельных операций
    const results = await Promise.all(promises);
    
    return results;
  }</pre>
                  </div>
                </div>
              </div>
              
              <div class="tip-card">
                <h4>Подводные камни</h4>
                <ol class="pitfalls-list">
                  <li>
                    <strong>Забыть async</strong>: Нельзя использовать await вне async-функции:
                    <pre class="code error-code">
  // Ошибка синтаксиса!
  function fetchData() {
    const data = await fetch('/api/data'); // SyntaxError
    return data;
  }</pre>
                  </li>
                  <li>
                    <strong>Забыть await</strong>: Если вы забудете await, ваша функция вернет Promise, а не результат:
                    <pre class="code error-code">
  async function getUserName() {
    const response = await fetch('/api/user');
    const user = response.json(); // Забыли await!
    return user.name; // undefined, т.к. user - это Promise
  }</pre>
                  </li>
                  <li>
                    <strong>Игнорирование ошибок</strong>: Не забывайте использовать try/catch или обрабатывать ошибки при использовании await.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 5. Реальные примеры -->
        <div v-if="currentTab === 4" class="tab-content">
          <h2>Практические примеры использования Promise</h2>
          
          <div class="real-world-examples">
            <div class="example-card">
              <h3>Пример 1: Загрузка данных с индикатором загрузки</h3>
              <div class="code-example">
                <pre class="code">
  async function loadUserData(userId) {
    try {
      // Показываем индикатор загрузки
      showLoadingIndicator();
      
      // Выполняем запрос
      const response = await fetch(`/api/users/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const userData = await response.json();
      
      // Отображаем данные пользователя
      displayUserProfile(userData);
      
      return userData;
    } catch (error) {
      // Обрабатываем ошибку
      showErrorMessage(`Не удалось загрузить данные пользователя: ${error.message}`);
      return null;
    } finally {
      // Скрываем индикатор загрузки в любом случае
      hideLoadingIndicator();
    }
  }</pre>
              </div>
              <div class="example-explanation">
                <p>Этот пример демонстрирует типичный сценарий загрузки данных с отображением индикатора загрузки и обработкой ошибок. Метод <code>finally</code> гарантирует, что индикатор загрузки будет скрыт независимо от результата запроса.</p>
              </div>
            </div>
            
            <div class="example-card">
              <h3>Пример 2: Отмена запроса по таймауту</h3>
              <div class="code-example">
                <pre class="code">
  function fetchWithTimeout(url, options = {}, timeout = 5000) {
    // Создаём промис для запроса
    const fetchPromise = fetch(url, options);
    
    // Создаём промис для таймаута
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Запрос превысил время ожидания ${timeout}ms`));
      }, timeout);
    });
    
    // Используем Promise.race для соревнования между запросом и таймаутом
    return Promise.race([fetchPromise, timeoutPromise]);
  }
  
  // Использование
  fetchWithTimeout('/api/data', {}, 3000)
    .then(response => response.json())
    .then(data => console.log('Данные получены:', data))
    .catch(error => console.error('Ошибка:', error.message));</pre>
              </div>
              <div class="example-explanation">
                <p>Этот пример показывает, как можно реализовать таймаут для запроса fetch с помощью <code>Promise.race</code>. Если запрос занимает слишком много времени, пользователь получит сообщение об ошибке вместо бесконечного ожидания.</p>
              </div>
            </div>
            
            <div class="example-card">
              <h3>Пример 3: Последовательное выполнение с зависимостями</h3>
              <div class="code-example">
                <pre class="code">
  async function publishArticle(articleData) {
    try {
      // Шаг 1: Загрузка изображений
      const uploadedImages = await Promise.all(
        articleData.images.map(img => uploadImage(img))
      );
      
      // Шаг 2: Создание статьи с URL загруженных изображений
      const articleWithImages = {
        ...articleData,
        imageUrls: uploadedImages.map(img => img.url)
      };
      
      const article = await createArticle(articleWithImages);
      
      // Шаг 3: Отправка уведомлений подписчикам
      await notifySubscribers(article.id);
      
      // Шаг 4: Обновление статистики
      await updateAuthorStats(article.authorId);
      
      // Показываем сообщение об успехе
      showSuccess('Статья успешно опубликована!');
      
      return article;
    } catch (error) {
      // Обрабатываем ошибку
      showError(`Не удалось опубликовать статью: ${error.message}`);
      throw error;
    }
  }</pre>
              </div>
              <div class="example-explanation">
                <p>Этот пример демонстрирует сложный процесс с несколькими последовательными шагами, где каждый шаг зависит от результата предыдущего. Асинхронные операции выполняются как последовательно (создание статьи после загрузки изображений), так и параллельно (загрузка всех изображений одновременно).</p>
              </div>
            </div>
            
            <div class="example-card">
              <h3>Пример 4: Повтор запроса при ошибке</h3>
              <div class="code-example">
                <pre class="code">
  async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
    let lastError;
    
    for (let attempt = 0; attempt &lt; retries; attempt++) {
      try {
        // Попытка запроса
        return await fetch(url, options);
      } catch (error) {
        console.warn(`Попытка ${attempt + 1} не удалась:`, error.message);
        lastError = error;
        
        // Если это последняя попытка, не ждём
        if (attempt &lt; retries - 1) {
          // Ждём перед следующей попыткой
          // Можно использовать экспоненциальную задержку: delay * (2 ** attempt)
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    // Если все попытки неудачны, выбрасываем последнюю ошибку
    throw new Error(`Все ${retries} попытки запроса не удались: ${lastError.message}`);
  }
  
  // Использование
  fetchWithRetry('/api/unstable-endpoint', {}, 3, 1000)
    .then(response => response.json())
    .then(data => console.log('Данные получены:', data))
    .catch(error => console.error('Ошибка:', error.message));</pre>
              </div>
              <div class="example-explanation">
                <p>Этот пример показывает реализацию механизма повторных попыток для ненадежных API. Если запрос не удаётся, функция ждёт указанное время и пробует снова, до достижения максимального числа попыток.</p>
              </div>
            </div>
            
            <div class="example-card">
              <h3>Пример 5: Кэширование результатов запросов</h3>
              <div class="code-example">
                <pre class="code">
  // Простая реализация кэша
  const cache = new Map();
  
  async function fetchWithCache(url, options = {}, cacheTime = 60000) {
    const cacheKey = url + JSON.stringify(options);
    
    // Проверяем кэш
    if (cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey);
      
      // Проверяем, не истекло ли время кэша
      if (Date.now() - cachedData.timestamp &lt; cacheTime) {
        console.log(`Используем кэшированные данные для ${url}`);
        return cachedData.data;
      } else {
        // Кэш устарел, удаляем его
        cache.delete(cacheKey);
      }
    }
    
    // Если нет в кэше или кэш устарел, выполняем запрос
    try {
      console.log(`Выполняем запрос к ${url}`);
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Сохраняем в кэш
      cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      
      return data;
    } catch (error) {
      console.error('Ошибка запроса:', error);
      throw error;
    }
  }
  
  // Использование
  async function getUserProfile(userId) {
    // Кэшируем данные на 5 минут
    return fetchWithCache(`/api/users/${userId}`, {}, 5 * 60 * 1000);
  }</pre>
              </div>
              <div class="example-explanation">
                <p>Этот пример демонстрирует, как можно реализовать кэширование результатов запросов для оптимизации производительности. Если данные запрашивались недавно, они берутся из кэша, что экономит время и трафик.</p>
              </div>
            </div>
          </div>
          
          <div class="real-world-applications">
            <h3>Где промисы используются в реальной жизни</h3>
            
            <div class="applications-grid">
              <div class="application-item">
                <div class="application-icon">🌐</div>
                <div class="application-title">API-запросы</div>
                <div class="application-description">
                  <p>Fetch API, XMLHttpRequest, Axios и другие библиотеки для HTTP-запросов используют промисы для работы с асинхронными сетевыми запросами.</p>
                </div>
              </div>
              
              <div class="application-item">
                <div class="application-icon">💾</div>
                <div class="application-title">Работа с файлами</div>
                <div class="application-description">
                  <p>File API, FileReader, IndexedDB и другие API для работы с файлами и базами данных в браузере возвращают промисы.</p>
                </div>
              </div>
              
              <div class="application-item">
                <div class="application-icon">⏱️</div>
                <div class="application-title">Анимации и таймеры</div>
                <div class="application-description">
                  <p>Управление сложными анимациями, задержками и таймерами с помощью промис-обёрток над setTimeout и requestAnimationFrame.</p>
                </div>
              </div>
              
              <div class="application-item">
                <div class="application-icon">🔄</div>
                <div class="application-title">Загрузка ресурсов</div>
                <div class="application-description">
                  <p>Динамическая загрузка скриптов, стилей, изображений и других ресурсов с отслеживанием прогресса и обработкой ошибок.</p>
                </div>
              </div>
              
              <div class="application-item">
                <div class="application-icon">📱</div>
                <div class="application-title">Мобильные API</div>
                <div class="application-description">
                  <p>Геолокация, камера, микрофон, вибрация и другие API устройств, которые требуют разрешений и асинхронного доступа.</p>
                </div>
              </div>
              
              <div class="application-item">
                <div class="application-icon">🔐</div>
                <div class="application-title">Аутентификация</div>
                <div class="application-description">
                  <p>OAuth, JWT, механизмы входа в систему и обновления токенов — всё это обычно реализуется с помощью промисов.</p>
                </div>
              </div>
              
              <div class="application-item">
                <div class="application-icon">🧠</div>
                <div class="application-title">Машинное обучение</div>
                <div class="application-description">
                  <p>Загрузка моделей, распознавание изображений, обработка естественного языка и другие задачи ML в браузере с TensorFlow.js.</p>
                </div>
              </div>
              
              <div class="application-item">
                <div class="application-icon">🎮</div>
                <div class="application-title">Игры и WebGL</div>
                <div class="application-description">
                  <p>Загрузка текстур, 3D-моделей и других ресурсов для игр и интерактивных приложений на WebGL.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 6. Подводные камни и лучшие практики -->
        <div v-if="currentTab === 5" class="tab-content">
          <h2>Подводные камни и лучшие практики</h2>
          
          <div class="common-mistakes">
            <h3>Распространённые ошибки при работе с Promise</h3>
            
            <div class="mistake-card">
              <h4>Ошибка #1: Забыть обработать ошибки</h4>
              <div class="code-comparison">
                <div class="code-block bad">
                  <h5>❌ Игнорирование ошибок</h5>
                  <pre class="code">
  fetch('/api/data')
    .then(response => response.json())
    .then(data => {
      // Обрабатываем данные
    });
  // Нет .catch() - ошибки будут проигнорированы!</pre>
                </div>
                <div class="code-block good">
                  <h5>✅ Правильная обработка ошибок</h5>
                  <pre class="code">
  fetch('/api/data')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Обрабатываем данные
    })
    .catch(error => {
  console.error('Произошла ошибка:', error);
  // Показываем пользователю сообщение об ошибке
  showErrorMessage(`Не удалось загрузить данные: ${error.message}`);
});</pre>
              </div>
            </div>
            <div class="mistake-explanation">
              <p>Необработанные ошибки промисов могут привести к падению приложения или к трудно отлаживаемым проблемам. Всегда добавляйте обработчик <code>.catch()</code> или используйте <code>try/catch</code> с <code>async/await</code>.</p>
            </div>
          </div>
          
          <div class="mistake-card">
            <h4>Ошибка #2: Потеря возвращаемого значения</h4>
            <div class="code-comparison">
              <div class="code-block bad">
                <h5>❌ Потеря цепочки</h5>
                <pre class="code">
function fetchUserData(userId) {
  // Нет return!
  fetch(`/api/users/${userId}`)
    .then(response => response.json())
    .then(data => {
      return data; // Этот return не возвращается из fetchUserData
    });
}

// Результат будет undefined!
fetchUserData(123).then(data => console.log(data));</pre>
              </div>
              <div class="code-block good">
                <h5>✅ Правильное возвращение промиса</h5>
                <pre class="code">
function fetchUserData(userId) {
  // Возвращаем весь промис
  return fetch(`/api/users/${userId}`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

// Теперь всё работает как ожидается
fetchUserData(123).then(data => console.log(data));</pre>
              </div>
            </div>
            <div class="mistake-explanation">
              <p>Забыв вернуть промис из функции, вы прерываете цепочку промисов. Всегда используйте <code>return</code> при работе с промисами внутри функций.</p>
            </div>
          </div>
          
          <div class="mistake-card">
            <h4>Ошибка #3: Pyramid of Doom (Промис-ад)</h4>
            <div class="code-comparison">
              <div class="code-block bad">
                <h5>❌ Вложенность промисов</h5>
                <pre class="code">
fetchUser(userId)
  .then(user => {
    fetchPosts(user.id)
      .then(posts => {
        fetchComments(posts[0].id)
          .then(comments => {
            // Глубокая вложенность, сложно отследить поток
            console.log('Пользователь:', user.name);
            console.log('Первый пост:', posts[0].title);
            console.log('Комментарии:', comments.length);
          })
          .catch(error => {
            console.error('Ошибка при загрузке комментариев:', error);
          });
      })
      .catch(error => {
        console.error('Ошибка при загрузке постов:', error);
      });
  })
  .catch(error => {
    console.error('Ошибка при загрузке пользователя:', error);
  });</pre>
              </div>
              <div class="code-block good">
                <h5>✅ Правильное использование цепочки</h5>
                <pre class="code">
fetchUser(userId)
  .then(user => {
    console.log('Пользователь:', user.name);
    return fetchPosts(user.id);
  })
  .then(posts => {
    console.log('Первый пост:', posts[0].title);
    return fetchComments(posts[0].id);
  })
  .then(comments => {
    console.log('Комментарии:', comments.length);
  })
  .catch(error => {
    // Один обработчик для всех ошибок
    console.error('Произошла ошибка:', error);
  });</pre>
              </div>
            </div>
            <div class="mistake-explanation">
              <p>Вложенные промисы создают те же проблемы, что и "колбэк-ад" - сложный для понимания и отладки код. Используйте цепочки промисов или async/await для более чистого кода.</p>
            </div>
          </div>
          
          <div class="mistake-card">
            <h4>Ошибка #4: Неправильная обработка параллельных запросов</h4>
            <div class="code-comparison">
              <div class="code-block bad">
                <h5>❌ Последовательное выполнение вместо параллельного</h5>
                <pre class="code">
// Запросы выполняются последовательно (медленно)
async function loadAllData() {
  const users = await fetchUsers();
  const posts = await fetchPosts();
  const comments = await fetchComments();
  
  return { users, posts, comments };
}</pre>
              </div>
              <div class="code-block good">
                <h5>✅ Правильное параллельное выполнение</h5>
                <pre class="code">
// Запросы выполняются параллельно (быстрее)
async function loadAllData() {
  const [users, posts, comments] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchComments()
  ]);
  
  return { users, posts, comments };
}</pre>
              </div>
            </div>
            <div class="mistake-explanation">
              <p>Если запросы не зависят друг от друга, выполняйте их параллельно с помощью <code>Promise.all()</code>, а не последовательно. Это значительно ускоряет загрузку данных.</p>
            </div>
          </div>
          
          <div class="mistake-card">
            <h4>Ошибка #5: Промисификация промисов</h4>
            <div class="code-comparison">
              <div class="code-block bad">
                <h5>❌ Избыточное создание промисов</h5>
                <pre class="code">
// Функция уже возвращает промис!
function fetchData() {
  // Ненужное оборачивание в Promise
  return new Promise((resolve, reject) => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}</pre>
              </div>
              <div class="code-block good">
                <h5>✅ Правильное использование существующих промисов</h5>
                <pre class="code">
// Просто возвращаем существующий промис
function fetchData() {
  return fetch('/api/data')
    .then(response => response.json());
}</pre>
              </div>
            </div>
            <div class="mistake-explanation">
              <p>Не оборачивайте существующие промисы в новые без необходимости. Это усложняет код и может привести к ошибкам при обработке исключений.</p>
            </div>
          </div>
        </div>
        
        <div class="best-practices">
          <h3>Лучшие практики работы с Promise</h3>
          
          <div class="practices-grid">
            <div class="practice-item">
              <h4>1. Всегда обрабатывайте ошибки</h4>
              <p>Добавляйте <code>.catch()</code> в конце каждой цепочки промисов или используйте <code>try/catch</code> с <code>async/await</code>, чтобы избежать необработанных исключений.</p>
            </div>
            
            <div class="practice-item">
              <h4>2. Возвращайте промисы из функций</h4>
              <p>Если ваша функция выполняет асинхронные операции, она должна возвращать промис, чтобы вызывающий код мог обработать результат или ошибку.</p>
            </div>
            
            <div class="practice-item">
              <h4>3. Используйте цепочки промисов</h4>
              <p>Предпочитайте цепочки промисов вместо вложенных колбэков для повышения читаемости кода.</p>
            </div>
            
            <div class="practice-item">
              <h4>4. Не забывайте о finally</h4>
              <p>Используйте <code>.finally()</code> для кода, который должен выполняться независимо от результата промиса (например, скрытие индикатора загрузки).</p>
            </div>
            
            <div class="practice-item">
              <h4>5. Параллельные запросы при возможности</h4>
              <p>Используйте <code>Promise.all()</code> для параллельного выполнения независимых запросов, чтобы ускорить загрузку данных.</p>
            </div>
            
            <div class="practice-item">
              <h4>6. Трансформируйте данные в цепочке</h4>
              <p>Используйте преимущества цепочек промисов для последовательной трансформации данных, возвращая новые значения из каждого <code>.then()</code>.</p>
              <pre class="code">
fetch('/api/users')
  .then(response => response.json())
  .then(users => users.filter(user => user.active))
  .then(activeUsers => activeUsers.map(user => user.name))
  .then(names => console.log('Активные пользователи:', names));</pre>
            </div>
            
            <div class="practice-item">
              <h4>7. Используйте async/await для читаемости</h4>
              <p>Для сложной логики с множеством зависимостей используйте <code>async/await</code> вместо длинных цепочек промисов - это делает код более понятным.</p>
            </div>
            
            <div class="practice-item">
              <h4>8. Создавайте функции-обёртки</h4>
              <p>Для часто используемых асинхронных операций создавайте функции-обёртки, которые инкапсулируют логику обработки ошибок и повторных попыток.</p>
              <pre class="code">
// Переиспользуемая функция для запросов API
async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Ошибка запроса к ${url}:`, error);
    throw error; // Пробрасываем ошибку дальше
  }
}</pre>
            </div>
          </div>
        </div>
        
        <div class="advanced-patterns">
          <h3>Продвинутые паттерны с Promise</h3>
          
          <div class="pattern-card">
            <h4>Паттерн: Отмена запросов с AbortController</h4>
            <div class="code-example">
              <pre class="code">
function fetchWithCancel(url, options = {}) {
  // Создаём контроллер для отмены
  const controller = new AbortController();
  const { signal } = controller;
  
  // Функция для отмены запроса
  const cancel = () => controller.abort();
  
  // Выполняем запрос с сигналом
  const promise = fetch(url, { ...options, signal })
    .then(response => response.json());
  
  // Возвращаем и промис, и функцию отмены
  return { promise, cancel };
}

// Использование
const { promise, cancel } = fetchWithCancel('/api/large-data');

// Запускаем таймер для автоматической отмены
const timeoutId = setTimeout(() => {
  console.log('Запрос отменён по таймауту');
  cancel();
}, 5000);

promise
  .then(data => {
    clearTimeout(timeoutId); // Отменяем таймер
    console.log('Данные получены:', data);
  })
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Запрос был отменён');
    } else {
      console.error('Ошибка запроса:', error);
    }
  });</pre>
            </div>
            <div class="pattern-explanation">
              <p>Этот паттерн позволяет отменять запросы fetch, когда они больше не нужны (например, при переходе на другую страницу или при выборе другого варианта в списке).</p>
            </div>
          </div>
          
          <div class="pattern-card">
            <h4>Паттерн: Очередь промисов с ограничением параллелизма</h4>
            <div class="code-example">
              <pre class="code">
// Функция для выполнения промисов с ограничением параллелизма
async function promiseQueue(tasks, concurrency = 2) {
  const results = [];
  const runningTasks = [];
  
  // Добавляем результаты в том же порядке, что и задачи
  const addResult = (task, index) => {
    return task().then(result => {
      results[index] = result;
      return result;
    });
  };
  
  // Обрабатываем задачи последовательно
  for (let i = 0; i &lt; tasks.length; i++) {
    // Создаём промис, который выполнит задачу и сохранит результат
    const task = addResult(tasks[i], i);
    
    // Добавляем задачу в список выполняющихся
    runningTasks.push(task);
    
    // Если достигли лимита параллелизма, ждём завершения самой быстрой задачи
    if (runningTasks.length >= concurrency) {
      await Promise.race(runningTasks.map(p => p.catch(() => {})));
      
      // Удаляем завершённые задачи из списка
      for (let j = 0; j &lt; runningTasks.length; j++) {
        if (runningTasks[j].status === 'fulfilled' || runningTasks[j].status === 'rejected') {
          runningTasks.splice(j, 1);
          j--;
        }
      }
    }
  }
  
  // Ждём завершения всех оставшихся задач
  await Promise.allSettled(runningTasks);
  
  return results;
}

// Использование
const urls = [
  '/api/resource1',
  '/api/resource2',
  '/api/resource3',
  '/api/resource4',
  '/api/resource5'
];

const tasks = urls.map(url => () => fetch(url).then(res => res.json()));

// Выполняем максимум 2 запроса одновременно
promiseQueue(tasks, 2)
  .then(results => console.log('Все результаты:', results))
  .catch(error => console.error('Ошибка:', error));</pre>
            </div>
            <div class="pattern-explanation">
              <p>Этот паттерн позволяет ограничить количество одновременно выполняемых промисов, что полезно при большом количестве запросов, чтобы не перегружать сервер или браузер.</p>
            </div>
          </div>
          
          <div class="pattern-card">
            <h4>Паттерн: Мемоизация результатов асинхронных функций</h4>
            <div class="code-example">
              <pre class="code">
// Функция для мемоизации асинхронных функций
function memoizeAsync(fn, getKey = (...args) => JSON.stringify(args)) {
  const cache = new Map();
  
  return async function(...args) {
    const key = getKey(...args);
    
    // Проверяем, есть ли результат в кэше
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    try {
      // Выполняем функцию и сохраняем результат
      const result = await fn(...args);
      cache.set(key, result);
      return result;
    } catch (error) {
      // Не кэшируем ошибки
      throw error;
    }
  };
}

// Использование
const fetchUserMemo = memoizeAsync(async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) throw new Error('User not found');
  return response.json();
});

// Первый вызов выполнит запрос
fetchUserMemo(123).then(user => console.log('User:', user));

// Второй вызов с теми же параметрами использует кэш
fetchUserMemo(123).then(user => console.log('User (from cache):', user));</pre>
            </div>
            <div class="pattern-explanation">
              <p>Мемоизация помогает избежать повторных запросов за одними и теми же данными, что улучшает производительность приложения и уменьшает нагрузку на сервер.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: (currentTab + 1) * (100 / tabs.length) + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

// Основные вкладки
const tabs = [
  { title: "Введение" },
  { title: "Методы Promise" },
  { title: "Цепочки промисов" },
  { title: "Async/Await" },
  { title: "Практические примеры" },
  { title: "Лучшие практики" }
];

const currentTab = ref(0);

// Установка текущей вкладки
function setCurrentTab(index) {
  currentTab.value = index;
  // Сбрасываем анимацию при переключении вкладок
  resetAnimationState();
}

// Функция сброса состояния анимации
function resetAnimationState() {
  animationStage.value = 0;
  timelinePosition.value = 0;
  isErrorAnimation.value = false;
  
  methodAnimationStage.value = 0;
  methodAnimationType.value = 'success';
  
  chainingStage.value = 0;
  chainingAnimationType.value = 'success';
  
  asyncAwaitStage.value = 0;
  asyncAwaitAnimationType.value = 'success';
  
  // Очищаем все таймеры
  animationTimers.forEach(timer => clearTimeout(timer));
  animationTimers = [];
}

// Состояние вкладки "Методы Promise"
const methodTabs = [
  { title: "Promise.all()" },
  { title: "Promise.race()" },
  { title: "Promise.allSettled()" },
  { title: "Promise.any()" }
];

const currentMethodTab = ref(0);

function setCurrentMethodTab(index) {
  currentMethodTab.value = index;
  methodAnimationStage.value = 0;
}

// Состояние анимации Promise
const animationStage = ref(0);
const timelinePosition = ref(0);
const isErrorAnimation = ref(false);
let animationTimers = [];

// Запуск анимации Promise
function runPromiseAnimation(type) {
  // Сбрасываем состояние
  animationStage.value = 0;
  timelinePosition.value = 0;
  isErrorAnimation.value = type === 'error';
  
  // Очищаем предыдущие таймеры
  animationTimers.forEach(timer => clearTimeout(timer));
  animationTimers = [];
  
  // Определяем временные интервалы для анимации
  const stages = [
    { stage: 1, time: 500, position: 0 },   // Создание Promise
    { stage: 2, time: 2000, position: 50 }, // Выполнение асинхронной операции
    { stage: 3, time: 1000, position: 75 }, // Успех/ошибка
    { stage: 4, time: 1000, position: 100 } // Обработка результата
  ];
  
  // Запускаем анимацию для каждой стадии
  stages.forEach(({ stage, time, position }) => {
    const timer = setTimeout(() => {
      animationStage.value = stage;
      timelinePosition.value = position;
    }, time);
    
    animationTimers.push(timer);
  });
}

// Состояние анимации методов Promise
const methodAnimationStage = ref(0);
const methodAnimationType = ref('success');

// Запуск анимации методов Promise
function runMethodAnimation(method, type) {
  // Сбрасываем состояние
  methodAnimationStage.value = 0;
  methodAnimationType.value = type;
  
  // Очищаем предыдущие таймеры
  animationTimers.forEach(timer => clearTimeout(timer));
  animationTimers = [];
  
  // Количество стадий зависит от метода
  const maxStages = method === 'allSettled' ? 4 : 3;
  
  // Запускаем анимацию для каждой стадии
  for (let i = 1; i <= maxStages; i++) {
    const timer = setTimeout(() => {
      methodAnimationStage.value = i;
    }, i * 1500);
    
    animationTimers.push(timer);
  }
}

// Вспомогательные функции для анимации методов
function getPromiseStateClass(stage, index, type) {
  if (stage <= index) return 'pending';
  
  if (type === 'success' || 
      (type === 'mixed' && (index === 0 || index === 2)) || 
      (type === 'error' && index !== 1) ||
      (type === 'allfail' && index === 1)) {
    return 'fulfilled';
  } else {
    return 'rejected';
  }
}

function getPromiseResult(stage, index, type) {
  if (stage <= index) return '';
  
  if (type === 'success' || 
      (type === 'mixed' && (index === 0 || index === 2)) || 
      (type === 'error' && index !== 1) ||
      (type === 'allfail' && index === 1)) {
    return `"Результат ${index + 1}"`;
  } else {
    return `Error: Ошибка в Promise ${index + 1}`;
  }
}

function getProgressWidth(stage, index, isRace = false) {
  if (isRace) {
    // Для Promise.race первый промис завершается быстрее
    if (index === 0) {
      return stage >= 1 ? 100 : Math.min(stage * 50, 100);
    }
    // Остальные медленнее
    return Math.min(stage * 30, 100);
  }
  
  // Задержка для визуального различия
  const delay = index * 0.5;
  
  if (stage <= index) {
    return Math.max(0, (stage - delay) * 30);
  }
  
  return 100;
}

// Состояние анимации цепочки промисов
const chainingStage = ref(0);
const chainingAnimationType = ref('success');

// Запуск анимации цепочки промисов
function runChainingAnimation(type) {
  // Сбрасываем состояние
  chainingStage.value = 0;
  chainingAnimationType.value = type;
  
  // Очищаем предыдущие таймеры
  animationTimers.forEach(timer => clearTimeout(timer));
  animationTimers = [];
  
  // Определяем максимальное количество стадий
  const maxStages = type === 'error' ? 3 : 4;
  
  // Запускаем анимацию для каждой стадии
  for (let i = 1; i <= maxStages; i++) {
    const timer = setTimeout(() => {
      chainingStage.value = i;
    }, i * 1500);
    
    animationTimers.push(timer);
  }
}

// Состояние анимации async/await
const asyncAwaitStage = ref(0);
const asyncAwaitAnimationType = ref('success');
const asyncCodeBlock = ref(null);

// Запуск анимации async/await
function runAsyncAwaitAnimation(type) {
  // Сбрасываем состояние
  asyncAwaitStage.value = 0;
  asyncAwaitAnimationType.value = type;
  
  // Очищаем предыдущие таймеры
  animationTimers.forEach(timer => clearTimeout(timer));
  animationTimers = [];
  
  // Определяем максимальное количество стадий в зависимости от типа
  const maxStages = type === 'error' ? 5 : 7;
  
  // Запускаем анимацию для каждой стадии
  for (let i = 1; i <= maxStages; i++) {
    const timer = setTimeout(() => {
      asyncAwaitStage.value = i;
      
      // Прокручиваем к активной строке кода
      nextTick(() => {
        if (asyncCodeBlock.value) {
          const activeLines = asyncCodeBlock.value.querySelectorAll('.highlight-line.active');
          if (activeLines.length > 0) {
            activeLines[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    }, i * 1500);
    
    animationTimers.push(timer);
  }
}

// Обработка загрузки страницы
onMounted(() => {
  console.log('Компонент Promise Explorer загружен');
});
</script>

<style>
/* Основные стили */
.promise-explorer {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #000;
  background-color: #fff;
  line-height: 1.6;
}

/* Заголовки */
.main-title {
  text-align: center;
  color: #000;
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  color: #505050;
  font-size: 1.2rem;
  margin-bottom: 30px;
}

h2 {
  color: #000;
  font-size: 1.8rem;
  margin-bottom: 20px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

h3 {
  color: #000;
  font-size: 1.4rem;
  margin: 25px 0 15px;
}

h4 {
  color: #000;
  font-size: 1.2rem;
  margin: 20px 0 10px;
}

/* Навигационные вкладки */
.navigation-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
  justify-content: center;
}

.tab-button {
  padding: 10px 20px;
  border: none;
  background-color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.tab-button:hover {
  background-color: #e0e0e0;
}

.tab-button.active {
  background-color: #3498db;
  color: white;
  font-weight: 500;
}

/* Контейнер контента */
.content-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 25px;
  min-height: 400px;
}

.tab-content {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Стили для объяснения концепций */
.concept-explanation {
  margin-bottom: 30px;
  font-size: 1.05rem;
}

.promise-states {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
}

.state-card {
  flex: 1;
  min-width: 250px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.state-header {
  padding: 12px 15px;
  color: white;
  font-weight: 500;
}

.state-header.pending {
  background-color: #f39c12;
}

.state-header.fulfilled {
  background-color: #2ecc71;
}

.state-header.rejected {
  background-color: #e74c3c;
}

.state-content {
  padding: 15px;
}

/* Примеры кода */
.code-demo {
  margin: 30px 0;
}

.code-example {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.code {
  padding: 15px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  overflow-x: auto;
  background-color: #fafafa;
  color: #000;
  border: 1px solid #e0e0e0;
  white-space: pre;
}

.explanation {
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-top: none;
  border-radius: 0 0 8px 8px;
}

.explanation h4 {
  margin-top: 0;
  color: #000;
}

.explanation ol {
  margin: 10px 0;
  padding-left: 20px;
}

.explanation li {
  margin-bottom: 5px;
}

/* Анимация работы Promise */
.run-animation {
  margin: 30px 0;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.animation-controls {
  display: flex;
  gap: 15px;
  margin: 20px 0;
  justify-content: center;
}

.success-button, .error-button, .mixed-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.success-button {
  background-color: #2ecc71;
  color: white;
}

.success-button:hover {
  background-color: #27ae60;
}

.error-button {
  background-color: #e74c3c;
  color: white;
}

.error-button:hover {
  background-color: #c0392b;
}

.mixed-button {
  background-color: #3498db;
  color: white;
}

.mixed-button:hover {
  background-color: #2980b9;
}

.animation-container {
  margin: 20px 0;
}

.animation-timeline {
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  position: relative;
  margin-bottom: 30px;
}

.timeline-line {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  border-radius: 3px;
}

.timeline-marker {
  position: absolute;
  left: 0;
  top: 0;
  width: 12px;
  height: 12px;
  background-color: #3498db;
  border-radius: 50%;
  transform: translate(-50%, -25%);
  transition: left 0.5s ease;
}

.animation-stages {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stage {
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
  opacity: 0.6;
  transform: translateY(10px);
  transition: all 0.5s ease;
}

.stage.active {
  opacity: 1;
  transform: translateY(0);
  background-color: #e9f7fe;
  border-left: 4px solid #3498db;
}

.stage-title {
  font-weight: 500;
  margin-bottom: 10px;
  color: #000;
}

.stage-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
}

.promise-box {
  width: 300px;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 10px;
  transition: all 0.5s ease;
}

.promise-box.pending {
  background-color: #fff8e1;
  border: 1px solid #ffd54f;
}

.promise-box.fulfilled {
  background-color: #e8f5e9;
  border: 1px solid #81c784;
}

.promise-box.rejected {
  background-color: #ffebee;
  border: 1px solid #e57373;
}

.promise-state {
  font-weight: 500;
  margin-bottom: 10px;
}

.promise-icon {
  font-size: 2rem;
  margin: 10px 0;
}

.promise-result {
  font-family: 'Courier New', monospace;
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 4px;
}

.promise-result.error {
  color: #e74c3c;
}

.processing-indicator {
  height: 4px;
  background-color: #3498db;
  width: 100%;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
}

.processing-indicator::after {
  content: '';
  position: absolute;
  left: -50%;
  width: 50%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  animation: processing 1.5s infinite linear;
}

@keyframes processing {
  0% { left: -50%; }
  100% { left: 100%; }
}

.handler-box {
  width: 300px;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 10px;
}

.handler-box.then {
  background-color: #e8f5e9;
  border: 1px solid #81c784;
}

.handler-box.catch {
  background-color: #ffebee;
  border: 1px solid #e57373;
}

.handler-title {
  font-weight: 500;
  margin-bottom: 5px;
}

.handler-code {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 5px;
  border-radius: 4px;
}

.console-output {
  width: 300px;
  padding: 12px;
  background-color: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.console-output.error {
  border-color: #e57373;
  color: #e74c3c;
}

.stage-code {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  padding: 10px;
  background-color: #fafafa;
  border-radius: 4px;
  margin-top: 10px;
}

.animation-explanation {
  margin-top: 30px;
  padding: 15px;
  background-color: #f0f8ff;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.animation-explanation h4 {
  margin-top: 0;
  color: #000;
}

/* Ключевые концепции */
.key-concepts {
  margin: 30px 0;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.key-concepts ul {
  padding-left: 20px;
}

.key-concepts li {
  margin-bottom: 10px;
}

/* Методы Promise */
.methods-container {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 30px;
}

.method-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.method-card h3 {
  padding: 15px;
  margin: 0;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.method-description {
  padding: 15px;
}

.method-description p {
  margin-bottom: 15px;
}

/* Анимация методов Promise */
.methods-animation {
  margin: 30px 0;
}

.methods-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 5px;
}

.method-tab {
  padding: 8px 15px;
  border: none;
  border-radius: 20px;
  background-color: #f0f0f0;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.method-tab:hover {
  background-color: #e0e0e0;
}

.method-tab.active {
  background-color: #3498db;
  color: white;
}

.method-animation-container {
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  padding: 20px;
  min-height: 400px;
}

.method-animation {
  animation: fadeIn 0.4s ease;
}

.animation-description {
  margin-bottom: 20px;
}

.animation-visual {
  margin: 25px 0;
}

.promise-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.promise-label {
  width: 150px;
  font-weight: 500;
  flex-shrink: 0;
}

.progress-container {
  flex: 1;
  height: 24px;
  background-color: #f0f0f0;
  border-radius: 12px;
  margin: 0 20px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  background-color: #f39c12;
  width: 0;
  transition: width 0.5s ease;
  border-radius: 12px;
}

.progress-bar.fulfilled {
  background-color: #2ecc71;
}

.progress-bar.rejected {
  background-color: #e74c3c;
}

.progress-bar.inactive {
  opacity: 0.5;
  background-color: #95a5a6;
}

.promise-result {
  min-width: 150px;
  text-align: left;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.promise-result.fulfilled {
  color: #2ecc71;
}

.promise-result.rejected {
  color: #e74c3c;
}

.promise-result.inactive {
  opacity: 0.5;
  color: #95a5a6;
  text-decoration: line-through;
}

.promise-all-result, .promise-race-result, .promise-allsettled-result, .promise-any-result {
  margin-top: 30px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
  animation: fadeIn 0.5s ease;
}

.result-label {
  font-weight: 500;
  margin-bottom: 10px;
}

.result-value {
  font-family: 'Courier New', monospace;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  color: #2ecc71;
}

.result-value.rejected {
  color: #e74c3c;
}

.result-value pre {
  margin: 0;
  white-space: pre-wrap;
}

/* Цепочки промисов */
.chaining-example {
  margin-bottom: 30px;
}

.chaining-visualization {
  margin: 30px 0;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.chain-animation-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.chain-visual {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chain-step {
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
  opacity: 0.6;
  position: relative;
  transition: all 0.5s ease;
}

.chain-step.active {
  opacity: 1;
  background-color: #e9f7fe;
  border-left: 4px solid #3498db;
}

.chain-step.error {
  background-color: #ffebee;
  border-left: 4px solid #e74c3c;
}

.chain-step.skipped {
  background-color: #f5f5f5;
  opacity: 0.4;
  text-decoration: line-through;
}

.chain-step.catch-block {
  background-color: #fff8e1;
  border-left: 4px solid #f39c12;
}

.step-title {
  font-weight: 500;
  margin-bottom: 10px;
}

.step-content {
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 4px;
  margin-top: 10px;
}

.code-snippet {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.step-arrow {
  position: absolute;
  bottom: -10px;
  left: 50%;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px solid #3498db;
  transform: translateX(-50%);
  z-index: 1;
}

.step-error-arrow {
  position: absolute;
  bottom: -25px;
  left: 20%;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px solid #e74c3c;
  transform: translateX(-50%);
  z-index: 1;
}

.chain-explanation {
  padding: 15px;
  background-color: #f0f8ff;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.chaining-tips {
  margin: 30px 0;
}

.tip-card {
  margin-bottom: 25px;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e9ecef;
}

.tip-card h4 {
  padding: 15px;
  margin: 0;
  background-color: #f0f0f0;
  border-bottom: 1px solid #e0e0e0;
}

.tip-content {
  padding: 15px;
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin: 15px 0;
}

@media (min-width: 768px) {
  .code-comparison {
    grid-template-columns: 1fr 1fr;
  }
}

.code-block {
  background-color: #fafafa;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

.code-block h5 {
  padding: 8px 15px;
  margin: 0;
  font-size: 0.9rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #e0e0e0;
}

.code-block.bad h5 {
  background-color: #ffebee;
  color: #c0392b;
}

.code-block.good h5 {
  background-color: #e8f5e9;
  color: #27ae60;
}

.common-mistake {
  margin-bottom: 15px;
}

.common-mistake h5 {
  margin: 0 0 5px 0;
  color: #e74c3c;
}

/* Async/await секция */
.syntax-comparison {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin: 20px 0;
}

@media (min-width: 992px) {
  .syntax-comparison {
    grid-template-columns: 1fr 1fr;
  }
}

.comparison-column {
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e9ecef;
}

.comparison-column h3 {
  padding: 15px;
  margin: 0;
  background-color: #f0f0f0;
  border-bottom: 1px solid #e0e0e0;
  font-size: 1.1rem;
}

.async-await-explanation {
  margin: 20px 0;
  padding: 15px;
  background-color: #f0f8ff;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.async-await-explanation ol {
  padding-left: 20px;
}

.async-await-explanation li {
  margin-bottom: 10px;
}

.async-await-demo {
  margin: 30px 0;
}

.async-await-animation {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 20px;
}

@media (min-width: 992px) {
  .async-await-animation {
    grid-template-columns: 1fr 1fr;
  }
}

.code-execution {
  background-color: #fafafa;
  border-radius: 8px;
  overflow: auto;
  max-height: 500px;
  border: 1px solid #e0e0e0;
}

.async-code {
  padding: 15px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  white-space: pre;
  position: relative;
}

.highlight-line {
  display: block;
  margin: 5px 0;
  transition: all 0.3s ease;
}

.highlight-line.active {
  background-color: #e3f2fd;
  font-weight: bold;
}

.highlight-line.error {
  background-color: #ffebee;
  color: #e74c3c;
}

.execution-flow {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.flow-stage {
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.flow-stage.active {
  opacity: 1;
  background-color: #e9f7fe;
  border-left: 4px solid #3498db;
}

.flow-stage.error {
  background-color: #ffebee;
  border-left: 4px solid #e74c3c;
}

.stage-label {
  font-weight: 500;
  margin-bottom: 8px;
}

.promise-state {
  padding: 10px;
  border-radius: 4px;
  margin-top: 5px;
  text-align: center;
  font-weight: 500;
}

.promise-state.pending {
  background-color: #fff8e1;
  color: #f39c12;
}

.promise-state.fulfilled {
  background-color: #e8f5e9;
  color: #27ae60;
}

.promise-state.rejected {
  background-color: #ffebee;
  color: #e74c3c;
}

.promise-check {
  padding: 10px;
  background-color: #e8f5e9;
  border-radius: 4px;
  margin-top: 5px;
  text-align: center;
}

.return-value {
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin-top: 5px;
  text-align: center;
  font-family: 'Courier New', monospace;
}

.async-await-tips {
  margin: 30px 0;
}

.tip-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 768px) {
  .tip-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.error-code {
  border-left: 4px solid #e74c3c;
}

.pitfalls-list {
  padding-left: 20px;
}

.pitfalls-list li {
  margin-bottom: 15px;
}

/* Реальные примеры */
.real-world-examples {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 30px;
}

.example-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.example-card h3 {
  padding: 15px;
  margin: 0;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.example-explanation {
  padding: 15px;
  background-color: #f8f9fa;
  border-top: none;
}

.real-world-applications {
  margin: 30px 0;
}

.applications-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 20px;
}

@media (min-width: 576px) {
  .applications-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .applications-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.application-item {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.application-item:hover {
  background-color: #e9f7fe;
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.application-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.application-title {
  font-weight: 500;
  margin-bottom: 10px;
}

.application-description {
  font-size: 0.9rem;
}

/* Подводные камни и лучшие практики */
.common-mistakes {
  margin-bottom: 30px;
}

.mistake-card {
  margin-bottom: 25px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.mistake-card h4 {
  padding: 15px;
  margin: 0;
  background-color: #ffebee;
  border-bottom: 1px solid #e57373;
  color: #c0392b;
}

.mistake-explanation {
  padding: 15px;
  background-color: #f8f9fa;
}

.best-practices {
  margin: 30px 0;
}

.practices-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 20px;
}

@media (min-width: 768px) {
  .practices-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.practice-item {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  border-left: 4px solid #3498db;
}

.practice-item h4 {
  margin-top: 0;
  color: #000;
}

.advanced-patterns {
  margin: 30px 0;
}

.pattern-card {
  margin-bottom: 25px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.pattern-card h4 {
  padding: 15px;
  margin: 0;
  background-color: #e8f5e9;
  border-bottom: 1px solid #81c784;
  color: #27ae60;
}

.pattern-explanation {
  padding: 15px;
  background-color: #f8f9fa;
}

/* Прогресс бар */
.progress-container {
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  margin-top: 30px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #3498db;
  width: 0;
  transition: width 0.5s ease;
}

/* Адаптивность */
@media (max-width: 576px) {
  .promise-explorer {
    padding: 15px;
  }
  
  .main-title {
    font-size: 1.8rem;
  }
  
  .content-container {
    padding: 15px;
  }
  
  .promise-box, .handler-box, .console-output {
    width: 100%;
  }
  
  .chain-animation-container {
    grid-template-columns: 1fr;
  }
}
</style>