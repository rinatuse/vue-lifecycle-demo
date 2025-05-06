<template>
    <div class="promise-any-explainer">
      <h1 class="main-title">Разбираем реализацию Promise.any()</h1>
      
      <div class="intro-section">
        <div class="intro-description">
          <h2>Что такое Promise.any()?</h2>
          <p>
            <code>Promise.any()</code> - это один из статических методов объекта Promise в JavaScript, который принимает 
            массив промисов и возвращает новый промис. Этот промис выполняется, когда <strong>хотя бы один</strong> из 
            переданных промисов выполняется успешно, со значением первого успешно выполненного промиса.
          </p>
          <p>
            Если <strong>все</strong> промисы отклоняются, возвращенный промис отклоняется с ошибкой <code>AggregateError</code>, 
            содержащей массив всех ошибок.
          </p>
        </div>
        <div class="use-cases">
          <h3>Где это используется в реальной жизни:</h3>
          <ul>
            <li>
              <strong>Запросы к нескольким API:</strong> когда вам нужен ответ от первого доступного сервера 
              (отказоустойчивость)
            </li>
            <li>
              <strong>Параллельная загрузка ресурсов:</strong> использование первого успешно загруженного ресурса из 
              нескольких альтернатив
            </li>
            <li>
              <strong>Race condition с успехом:</strong> когда нужно получить первый успешный результат среди 
              нескольких параллельных задач
            </li>
            <li>
              <strong>Стратегия резервного копирования:</strong> попытка сохранить данные в нескольких хранилищах, 
              продолжаем работу, если хотя бы одно сработало
            </li>
          </ul>
        </div>
      </div>
  
      <div class="example-section">
        <h2>Пример использования Promise.any()</h2>
        <div class="code-block">
          <pre><code>// Пример использования стандартного Promise.any()
  Promise.any([
    new Promise((res, rej) => setTimeout(() => rej("Ошибка 1"), 1000)),
    new Promise((res) => setTimeout(() => res("Результат 2"), 2000)),
    new Promise((res) => setTimeout(() => res("Результат 3"), 500))
  ])
  .then(result => console.log(result))  // "Результат 3" - самый быстрый успешный промис
  .catch(error => console.error(error)); // Не сработает, т.к. есть успешные промисы</code></pre>
        </div>
        
        <div class="task-description">
          <h3>Наша задача:</h3>
          <p>Реализовать собственную функцию <code>customPromiseAny</code>, которая ведет себя так же, как стандартный <code>Promise.any()</code>.</p>
        </div>
        
        <div class="code-block">
          <pre><code>function customPromiseAny(promises) {
    // Здесь наша реализация
  }
  
  // Должно работать так:
  customPromiseAny([
    new Promise((res, rej) => rej("Ошибка из promise1")),
    new Promise((res) => res("Результат из promise2")),
    new Promise((res) => res("Результат из promise3"))
  ]).then(result => console.log(result)); // "Результат из promise2"</code></pre>
        </div>
      </div>
  
      <div class="solution-section">
        <h2>Решение проблемы</h2>
        
        <div class="algorithm-description">
          <h3>Алгоритм работы Promise.any():</h3>
          <ol>
            <li>Принимаем массив промисов</li>
            <li>Возвращаем новый промис</li>
            <li>Отслеживаем каждый промис в массиве</li>
            <li>Если хотя бы один промис успешен - резолвим с его значением</li>
            <li>Если все промисы отклонены - отклоняем с AggregateError</li>
          </ol>
        </div>
        
        <div class="implementation-steps">
          <h3>Пошаговое решение:</h3>
          
          <div class="step" :class="{ active: currentStep >= 1 }">
            <div class="step-number">1</div>
            <div class="step-content">
              <p>Начнем с создания функции, которая принимает массив промисов:</p>
              <div class="code-block">
                <pre><code>function customPromiseAny(promises) {
    // Проверяем на пустой массив
    if (promises.length === 0) {
      return Promise.reject(new AggregateError([], 'Все промисы были отклонены'));
    }
    
    // Продолжение будет дальше...
  }</code></pre>
              </div>
            </div>
          </div>
          
          <div class="step" :class="{ active: currentStep >= 2 }">
            <div class="step-number">2</div>
            <div class="step-content">
              <p>Создаем новый промис и подготавливаем переменные для отслеживания ошибок:</p>
              <div class="code-block">
                <pre><code>function customPromiseAny(promises) {
    if (promises.length === 0) {
      return Promise.reject(new AggregateError([], 'Все промисы были отклонены'));
    }
    
    // Создаём счётчик отклоненных промисов
    let errorCount = 0;
    // Создаём массив для хранения ошибок
    const errors = new Array(promises.length);
    
    // Возвращаем новый промис
    return new Promise((resolve, reject) => {
      // Продолжение будет дальше...
    });
  }</code></pre>
              </div>
            </div>
          </div>
          
          <div class="step" :class="{ active: currentStep >= 3 }">
            <div class="step-number">3</div>
            <div class="step-content">
              <p>Проходим по каждому промису и обрабатываем их результаты:</p>
              <div class="code-block">
                <pre><code>function customPromiseAny(promises) {
    if (promises.length === 0) {
      return Promise.reject(new AggregateError([], 'Все промисы были отклонены'));
    }
    
    let errorCount = 0;
    const errors = new Array(promises.length);
    
    return new Promise((resolve, reject) => {
      // Проходим по каждому промису в массиве
      for (let i = 0; i &lt; promises.length; i++) {
        // Оборачиваем каждый элемент в Promise.resolve для поддержки не-промисов
        Promise.resolve(promises[i])
          .then(value => {
            // При первом успешном промисе резолвим основной промис
            resolve(value);
          })
          .catch(error => {
            // Если промис отклонен, сохраняем ошибку
            errors[i] = error;
            errorCount++;
            
            // Если все промисы отклонены, отклоняем основной промис
            if (errorCount === promises.length) {
              reject(new AggregateError(errors, 'Все промисы были отклонены'));
            }
          });
      }
    });
  }</code></pre>
              </div>
            </div>
          </div>
          
          <div class="step" :class="{ active: currentStep >= 4 }">
            <div class="step-number">4</div>
            <div class="step-content">
              <p>Давайте проверим наше решение с примером из задачи:</p>
              <div class="code-block">
                <pre><code>customPromiseAny([
    new Promise((res, rej) => rej("Ошибка из promise1")),
    new Promise((res) => res("Результат из promise2")),
    new Promise((res) => res("Результат из promise3"))
  ]).then(result => console.log(result)); // "Результат из promise2"</code></pre>
              </div>
              <p>Результат: <strong>Результат из promise2</strong></p>
            </div>
          </div>
        </div>
  
        <div class="animation-section" :class="{ active: currentStep >= 5 }">
          <h3>Визуализация работы Promise.any</h3>
          <div class="animation-container">
            <div class="promises-container">
              <div class="promise promise-error" :class="{ animated: animationStarted }">
                <div class="promise-bar"></div>
                <div class="promise-label">Promise 1 (reject)</div>
              </div>
              <div class="promise promise-success" :class="{ animated: animationStarted, selected: animationComplete }">
                <div class="promise-bar"></div>
                <div class="promise-label">Promise 2 (resolve)</div>
              </div>
              <div class="promise promise-success" :class="{ animated: animationStarted }">
                <div class="promise-bar"></div>
                <div class="promise-label">Promise 3 (resolve)</div>
              </div>
            </div>
            <div class="result-container" :class="{ show: animationComplete }">
              <div class="result-arrow"></div>
              <div class="result-box">
                <div class="result-label">Promise.any результат:</div>
                <div class="result-value">"Результат из promise2"</div>
              </div>
            </div>
          </div>
          <button @click="runAnimation" class="run-button" :disabled="animationStarted">
            {{ animationComplete ? 'Перезапустить анимацию' : 'Запустить анимацию'  }} 
          </button>
        </div>
      </div>
  
      <div class="error-analysis" :class="{ active: currentStep >= 6 }">
        <h2>Анализ ошибок в предложенном решении</h2>
        <p>В коде из задания есть несколько ошибок:</p>
        
        <div class="code-block code-with-errors">
          <pre><code>function customPromiseAny(promises) {
    // Создаём счётчик промисов
    let errorPromises = 0;
    // Создаём пустой массив с длиной равной кол-ву промисов
    const errors = new Array(promises.length);
  
    return new Promise((resolve, reject) => {
      // Создаём новый промис, в нём бежим по каждому промису
      for (let i = 0; i &lt; promises.length; i++) {
        promises[i]
          .then(resolve) // Резолвим главный промис при первом успешном
          .catch((error) => {
            errors[index] = error; // ОШИБКА: использование неопределенной переменной index
            errorPromises += 1;
  
            if (errorPromises === promises.length) {
              // Реджектим главный промис если все промисы зареджектились
              reject(promiseErrors); // ОШИБКА: использование неопределенной переменной promiseErrors
            }
          });
      }
    });
  }</code></pre>
        </div>
        
        <div class="errors-list">
          <h3>Обнаруженные ошибки:</h3>
          <ol>
            <li>
              <strong>Ошибка 1:</strong> Использование несуществующей переменной <code>index</code> в строке 
              <code>errors[index] = error;</code>. Должно быть <code>errors[i] = error;</code>
            </li>
            <li>
              <strong>Ошибка 2:</strong> Использование несуществующей переменной <code>promiseErrors</code> в строке 
              <code>reject(promiseErrors);</code>. Должно быть <code>reject(errors);</code>
            </li>
            <li>
              <strong>Ошибка 3:</strong> Отсутствует обертка <code>Promise.resolve</code> для входных значений, 
              что может вызвать ошибку, если входной массив содержит не-промисы
            </li>
            <li>
              <strong>Ошибка 4:</strong> Не создается объект <code>AggregateError</code> при отклонении промиса
            </li>
            <li>
              <strong>Ошибка 5:</strong> Нет проверки на пустой массив промисов
            </li>
          </ol>
        </div>
        
        <div class="corrected-solution">
          <h3>Исправленное решение:</h3>
          <div class="code-block">
            <pre><code>function customPromiseAny(promises) {
    // Создаём счётчик отклоненных промисов
    let errorCount = 0;
    // Создаём массив для хранения ошибок
    const errors = new Array(promises.length);
    
    // Проверка на пустой массив
    if (promises.length === 0) {
      return Promise.reject(new AggregateError([], 'Все промисы были отклонены'));
    }
  
    return new Promise((resolve, reject) => {
      // Проходим по каждому промису в массиве
      for (let i = 0; i &lt; promises.length; i++) {
        // Оборачиваем в Promise.resolve для поддержки не-промисов
        Promise.resolve(promises[i])
          .then(value => {
            // Резолвим главный промис при первом успешном
            resolve(value);
          })
          .catch(error => {
            // Сохраняем ошибку по правильному индексу
            errors[i] = error;
            errorCount += 1;
  
            // Проверяем, все ли промисы отклонены
            if (errorCount === promises.length) {
              // Правильно отклоняем главный промис с AggregateError
              reject(new AggregateError(errors, 'Все промисы были отклонены'));
            }
          });
      }
    });
  }</code></pre>
          </div>
        </div>
      </div>
  
      <div class="edge-cases" :class="{ active: currentStep >= 7 }">
        <h2>Подводные камни и особые случаи</h2>
        
        <div class="edge-case">
          <h3>1. Пустой массив промисов</h3>
          <p>Если передан пустой массив, то стандартный <code>Promise.any()</code> отклоняет промис с <code>AggregateError</code>.</p>
          <div class="code-block">
            <pre><code>Promise.any([])
    .then(result => console.log(result))
    .catch(error => console.error(error)); // AggregateError: All promises were rejected</code></pre>
          </div>
        </div>
        
        <div class="edge-case">
          <h3>2. Передача не-промисов</h3>
          <p>Если в массиве содержатся не-промисы, они автоматически оборачиваются в промисы (как с <code>Promise.resolve</code>).</p>
          <div class="code-block">
            <pre><code>Promise.any([123, "строка", Promise.resolve("промис")])
    .then(result => console.log(result)); // 123 (первое значение обернется в Promise и сразу выполнится)</code></pre>
          </div>
        </div>
        
        <div class="edge-case">
          <h3>3. Race Condition и порядок выполнения</h3>
          <p>В отличие от <code>Promise.all()</code>, который сохраняет порядок результатов, <code>Promise.any()</code> возвращает результат первого успешно выполненного промиса, независимо от порядка в массиве.</p>
          <div class="code-block">
            <pre><code>Promise.any([
    new Promise(resolve => setTimeout(() => resolve("slow"), 500)),
    new Promise(resolve => setTimeout(() => resolve("fast"), 100))
  ]).then(result => console.log(result)); // "fast" - несмотря на порядок в массиве</code></pre>
          </div>
        </div>
        
        <div class="edge-case">
          <h3>4. Все промисы отклонены</h3>
          <p>Если все промисы отклонены, <code>Promise.any()</code> отклоняется с ошибкой <code>AggregateError</code>, которая содержит массив всех ошибок.</p>
          <div class="code-block">
            <pre><code>Promise.any([
    Promise.reject("Ошибка 1"),
    Promise.reject("Ошибка 2")
  ]).catch(error => {
    console.log(error instanceof AggregateError); // true
    console.log(error.errors); // ["Ошибка 1", "Ошибка 2"]
  });</code></pre>
          </div>
        </div>
      </div>
  
      <div class="comparison-section" :class="{ active: currentStep >= 8 }">
        <h2>Сравнение с другими методами Promise</h2>
        
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Метод</th>
              <th>Успешное выполнение</th>
              <th>Отклонение</th>
              <th>Основное применение</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Promise.any()</code></td>
              <td>Когда успешно выполнится <strong>хотя бы один</strong> промис</td>
              <td>Когда <strong>все</strong> промисы отклонены</td>
              <td>Получение первого успешного результата</td>
            </tr>
            <tr>
              <td><code>Promise.race()</code></td>
              <td>Когда первый промис выполнится успешно</td>
              <td>Когда первый промис отклонен</td>
              <td>Получение результата от самого быстрого промиса (успех или ошибка)</td>
            </tr>
            <tr>
              <td><code>Promise.all()</code></td>
              <td>Когда <strong>все</strong> промисы выполнятся успешно</td>
              <td>Когда <strong>хотя бы один</strong> промис отклонен</td>
              <td>Ожидание завершения всех асинхронных операций</td>
            </tr>
            <tr>
              <td><code>Promise.allSettled()</code></td>
              <td>Всегда успешно выполняется, когда все промисы завершены</td>
              <td>Никогда не отклоняется</td>
              <td>Получение результатов всех промисов, независимо от их статуса</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="practical-examples" :class="{ active: currentStep >= 9 }">
        <h2>Практические примеры использования</h2>
        
        <div class="example">
          <h3>1. Запрос к нескольким API</h3>
          <p>Получение данных от первого доступного сервера:</p>
          <div class="code-block">
            <pre><code>// Запрос к разным источникам данных
  function fetchFromMultipleAPIs() {
    const apis = [
      'https://api1.example.com/data',
      'https://api2.example.com/data',
      'https://api3.example.com/data'
    ];
    
    const requests = apis.map(url => 
      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error(`Ошибка API ${url}`);
          return response.json();
        })
    );
    
    return Promise.any(requests)
      .then(data => {
        console.log('Данные получены от первого доступного API:', data);
        return data;
      })
      .catch(errors => {
        console.error('Все API недоступны:', errors);
        throw new Error('Не удалось получить данные');
      });
  }</code></pre>
          </div>
        </div>
        
        <div class="example">
          <h3>2. Загрузка ресурсов с резервными источниками</h3>
          <p>Загрузка изображения из разных источников:</p>
          <div class="code-block">
            <pre><code>function loadImageFromMultipleSources(sources) {
    const imagePromises = sources.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Не удалось загрузить ${src}`);
        img.src = src;
      });
    });
    
    return Promise.any(imagePromises)
      .then(img => {
        document.body.appendChild(img);
        return img;
      })
      .catch(errors => {
        console.error('Ни одно изображение не загрузилось:', errors);
        // Показать запасное изображение или сообщение об ошибке
      });
  }</code></pre>
          </div>
        </div>
        
        <div class="example">
          <h3>3. Тайм-аут с успешным результатом</h3>
          <p>Установка таймаута для операции, но с приоритетом для успешного результата:</p>
          <div class="code-block">
            <pre><code>function operationWithTimeout(operation, timeoutMs) {
    // Основная операция
    const operationPromise = operation();
    
    // Промис таймаута, который отклоняется
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout')), timeoutMs);
    });
    
    // Promise.any предпочтет успешный результат операции
    // Таймаут сработает только если основная операция не успеет выполниться
    return Promise.any([
      operationPromise,
      // Оборачиваем таймаут, чтобы он успешно выполнился и стал предпочтительным
      timeoutPromise.catch(error => {
        throw new Error('Операция заняла слишком много времени');
      })
    ]);
  }</code></pre>
          </div>
        </div>
      </div>
  
      <div class="conclusion" :class="{ active: currentStep >= 10 }">
        <h2>Заключение</h2>
        <p>
          Метод <code>Promise.any()</code> - мощный инструмент для управления асинхронными операциями, особенно в 
          сценариях, где нужен "первый успешный" результат. Наша реализация <code>customPromiseAny</code> позволяет 
          понять, как он работает под капотом.
        </p>
        <p>
          Ключевые моменты, которые следует запомнить:
        </p>
        <ul>
          <li>Promise.any() возвращает первый успешно выполненный промис</li>
          <li>Отклоняется только если все промисы отклонены (с AggregateError)</li>
          <li>Обрабатывает не-промисы, автоматически оборачивая их в Promise.resolve()</li>
          <li>Порядок результатов зависит от времени выполнения, а не от порядка в массиве</li>
        </ul>
        <p>
          Эта функция дополняет другие методы группового управления промисами (Promise.all, Promise.race, Promise.allSettled),
          предоставляя разработчику полный набор инструментов для эффективной работы с асинхронным кодом.
        </p>
      </div>
      
      <div class="navigation">
        <button @click="prevStep" :disabled="currentStep <= 1" class="nav-button prev">Назад</button>
        <div class="step-indicator">
          Шаг {{ currentStep }} из {{ totalSteps }}
        </div>
        <button @click="nextStep" :disabled="currentStep >= totalSteps" class="nav-button next">Вперед</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentStep: 1,
        totalSteps: 10,
        animationStarted: false,
        animationComplete: false,
        animationTimeout: null
      }
    },
    methods: {
      nextStep() {
        if (this.currentStep < this.totalSteps) {
          this.currentStep++;
        }
      },
      prevStep() {
        if (this.currentStep > 1) {
          this.currentStep--;
        }
      },
      runAnimation() {
        if (this.animationStarted && this.animationComplete) {
          // Перезапуск анимации
          this.animationStarted = false;
          this.animationComplete = false;
          
          // Небольшая задержка перед перезапуском
          setTimeout(() => {
            this.startAnimation();
          }, 100);
        } else {
          this.startAnimation();
        }
      },
      startAnimation() {
        this.animationStarted = true;
        this.animationComplete = false;
        
        // Очистка предыдущего таймаута, если он есть
        if (this.animationTimeout) {
          clearTimeout(this.animationTimeout);
        }
        
        // Показываем результат после завершения анимации
        this.animationTimeout = setTimeout(() => {
          this.animationComplete = true;
        }, 3000);
      }
    }
  }
  </script>
  
  <style scoped>
  .promise-any-explainer {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    color: #333;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
  }
  
  .main-title {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
    font-size: 2.2rem;
  }
  
  h2 {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 8px;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  
  h3 {
    color: #2c3e50;
    margin-top: 25px;
    margin-bottom: 15px;
  }
  
  p, li {
    line-height: 1.6;
    margin-bottom: 15px;
  }
  
  code {
    background-color: #f5f5f5;
    color: #e74c3c;
    padding: 2px 4px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }
  
  .intro-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 40px;
  }
  
  .use-cases ul {
    padding-left: 20px;
  }
  
  .use-cases li {
    margin-bottom: 10px;
  }
  
  .code-block {
    background-color: #282c34;
    border-radius: 6px;
    padding: 15px;
    margin: 15px 0;
    overflow-x: auto;
  }
  
  .code-block pre {
    margin: 0;
    white-space: pre-wrap;
  }
  
  .code-block code {
    background-color: transparent;
    color: #abb2bf;
    font-family: 'Courier New', Consolas, monospace;
    font-size: 14px;
    line-height: 1.5;
    display: block;
  }
  
  .code-with-errors {
    border-left: 4px solid #e74c3c;
  }
  
  .step {
    display: flex;
    margin-bottom: 30px;
    opacity: 0.4;
    transition: opacity 0.5s ease;
  }
  
  .step.active {
    opacity: 1;
  }
  
  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: #3498db;
    color: white;
    font-weight: bold;
    border-radius: 50%;
    margin-right: 15px;
    flex-shrink: 0;
  }
  
  .step-content {
    flex: 1;
  }
  
  .animation-section, .error-analysis, .edge-cases, .comparison-section, 
  .practical-examples, .conclusion {
    opacity: 0.4;
    transition: opacity 0.5s ease;
    padding: 10px;
    border-radius: 8px;
  }
  
  .animation-section.active, .error-analysis.active, .edge-cases.active, 
  .comparison-section.active, .practical-examples.active, .conclusion.active {
    opacity: 1;
    background-color: #f9f9f9;
  }
  
  .animation-container {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    position: relative;
  }
  
  .promises-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .promise {
    display: flex;
    align-items: center;
    height: 40px;
    position: relative;
  }
  
  .promise-bar {
    width: 0%;
    height: 15px;
    background-color: #ddd;
    border-radius: 10px;
    transition: width 3s ease;
  }
  
  .promise.animated .promise-bar {
    width: 100%;
  }
  
  .promise-success .promise-bar {
    background-color: #2ecc71;
  }
  
  .promise-error .promise-bar {
    background-color: #e74c3c;
  }
  
  .promise-label {
    position: absolute;
    left: 10px;
    color: #333;
    font-size: 14px;
    font-weight: bold;
  }
  
  .promise.selected::after {
    content: "✓";
    position: absolute;
    right: 10px;
    color: #2ecc71;
    font-size: 18px;
    font-weight: bold;
  }
  
  .result-container {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .result-container.show {
    opacity: 1;
    transform: translateY(0);
  }
  
  .result-arrow {
    width: 2px;
    height: 40px;
    background-color: #3498db;
    position: relative;
  }
  
  .result-arrow::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: -4px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 8px solid #3498db;
  }
  
  .result-box {
    background-color: #3498db;
    color: white;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    min-width: 300px;
  }
  
  .result-label {
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  .result-value {
    font-family: monospace;
    font-size: 18px;
  }
  
  .run-button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  
  .run-button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .run-button:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
  
  .errors-list ol {
    padding-left: 20px;
  }
  
  .errors-list li {
    margin-bottom: 10px;
  }
  
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  .comparison-table th, .comparison-table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  
  .comparison-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  .comparison-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .example {
    margin-bottom: 30px;
  }
  
  .navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #eee;
  }
  
  .nav-button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  
  .nav-button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .nav-button:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
  
  .step-indicator {
    background-color: #f5f5f5;
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 14px;
  }
  
  /* Медиа-запросы для адаптивности */
  @media (max-width: 768px) {
    .intro-section {
      grid-template-columns: 1fr;
    }
  }
  </style>