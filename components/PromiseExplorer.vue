<template>
    <div class="promise-explorer">
      <h1>JavaScript Promise: Интерактивное исследование</h1>
      
      <div class="tabs">
        <button 
          v-for="(tab, index) in tabs" 
          :key="index"
          :class="{ active: currentTab === index }"
          @click="switchTab(index)"
          class="tab-button"
        >
          {{ tab.title }}
        </button>
      </div>
      
      <div class="content-container">
        <!-- 1. Что такое Promise -->
        <div v-if="currentTab === 0" class="tab-content">
          <h2>Что такое <span class="highlight">Promise</span>?</h2>
          
          <div class="explanation">
            <p>Promise в JavaScript — это объект, представляющий результат асинхронной операции, который может быть доступен сейчас, в будущем или никогда.</p>
            <p>Promise может находиться в одном из трех состояний:</p>
            <ul>
              <li><strong>Ожидание (pending)</strong>: начальное состояние, операция не завершена.</li>
              <li><strong>Выполнено (fulfilled)</strong>: операция завершена успешно.</li>
              <li><strong>Отклонено (rejected)</strong>: операция завершена с ошибкой.</li>
            </ul>
          </div>
          
          <div class="promise-animation">
            <h3>Жизненный цикл Promise</h3>
            <div class="animation-container">
              <div class="promise-state-wrapper">
                <div class="promise-state" :class="currentState">
                  <div class="state-icon pending" v-if="currentState === 'pending'">⏳</div>
                  <div class="state-icon fulfilled" v-if="currentState === 'fulfilled'">✅</div>
                  <div class="state-icon rejected" v-if="currentState === 'rejected'">❌</div>
                  <div class="state-label">{{ stateLabels[currentState] }}</div>
                </div>
              </div>
              
              <div class="control-buttons">
                <button @click="setState('pending')" :disabled="currentState === 'pending'" class="control-button pending">Ожидание</button>
                <button @click="setState('fulfilled')" :disabled="currentState === 'fulfilled'" class="control-button fulfilled">Выполнено</button>
                <button @click="setState('rejected')" :disabled="currentState === 'rejected'" class="control-button rejected">Отклонено</button>
                <button @click="animateStates" class="control-button animate">Анимировать цикл</button>
              </div>
            </div>
          </div>
          
          <div class="code-container">
            <h3>Пример кода</h3>
            <pre class="code javascript">
  // Создание Promise
  const myPromise = new Promise((resolve, reject) => {
    // Выполнение асинхронной операции
    setTimeout(() => {
      const success = Math.random() > 0.5;
      
      if (success) {
        resolve('Операция выполнена успешно!');  // Переход в состояние fulfilled
      } else {
        reject('Произошла ошибка!');  // Переход в состояние rejected
      }
    }, 2000);
  });
  
  // Использование Promise
  myPromise
    .then(result => {
      console.log('Успех:', result);
    })
    .catch(error => {
      console.log('Ошибка:', error);
    })
    .finally(() => {
      console.log('Завершено (в любом случае)');
    });
            </pre>
            <button @click="runPromiseExample" class="run-button">Запустить</button>
          </div>
          
          <div v-if="showExampleResult" class="result-container">
            <h3>Результат выполнения</h3>
            <div class="console-output">
              <div v-for="(log, index) in exampleLogs" :key="index" class="log-item" :class="log.type">
                {{ log.message }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- 2. Методы Promise -->
        <div v-if="currentTab === 1" class="tab-content">
          <h2>Методы <span class="highlight">Promise</span></h2>
          
          <div class="subtabs">
            <button 
              v-for="(subtab, index) in promiseMethods" 
              :key="index"
              :class="{ active: currentMethod === index }"
              @click="switchMethod(index)"
              class="subtab-button"
            >
              {{ subtab.name }}
            </button>
          </div>
          
          <div class="method-container">
            <h3>{{ promiseMethods[currentMethod].name }}</h3>
            <div class="method-description" v-html="promiseMethods[currentMethod].description"></div>
            
            <pre class="code javascript">{{ promiseMethods[currentMethod].code }}</pre>
            
            <div class="method-animation">
              <component :is="promiseMethods[currentMethod].component" />
            </div>
            
            <div class="method-notes">
              <h4>Важно помнить:</h4>
              <ul>
                <li v-for="(note, index) in promiseMethods[currentMethod].notes" :key="index">
                  {{ note }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- 3. Цепочки Promise -->
        <div v-if="currentTab === 2" class="tab-content">
          <h2>Цепочки <span class="highlight">Promise</span></h2>
          
          <div class="explanation">
            <p>Одно из главных преимуществ Promise — возможность создавать цепочки асинхронных операций, избегая "ада колбэков".</p>
          </div>
          
          <div class="chain-animation">
            <h3>Визуализация цепочки Promise</h3>
            <div class="chain-container">
              <div class="promise-chain">
                <div 
                  v-for="(block, index) in chainBlocks" 
                  :key="index" 
                  class="chain-block"
                  :class="{ active: currentChainBlock >= index, completed: currentChainBlock > index }"
                >
                  <div class="block-content">
                    <div class="block-title">{{ block.title }}</div>
                    <div class="block-code">{{ block.code }}</div>
                  </div>
                  <div class="chain-connector" v-if="index < chainBlocks.length - 1">
                    <div class="connector-line"></div>
                    <div class="connector-arrow"></div>
                  </div>
                </div>
              </div>
              
              <div class="chain-controls">
                <button @click="resetChain" class="control-button">Сбросить</button>
                <button @click="nextChainStep" :disabled="currentChainBlock >= chainBlocks.length" class="control-button">Следующий шаг</button>
                <button @click="animateChain" class="control-button animate">Анимировать цепочку</button>
              </div>
            </div>
          </div>
          
          <div class="comparison-container">
            <h3>Сравнение: колбэки vs. цепочки Promise</h3>
            <div class="code-comparison">
              <div class="callback-hell">
                <h4>Вложенные колбэки ("ад колбэков")</h4>
                <pre class="code javascript">
  // Представим, что у нас есть несколько асинхронных операций
  function getUserData(userId, callback) {
    setTimeout(() => {
      console.log('Получены данные пользователя');
      callback({ id: userId, name: 'Пользователь ' + userId });
    }, 1000);
  }
  
  function getUserPosts(user, callback) {
    setTimeout(() => {
      console.log('Получены посты пользователя');
      callback([
        { title: 'Пост 1', content: 'Содержимое поста 1' },
        { title: 'Пост 2', content: 'Содержимое поста 2' }
      ]);
    }, 1000);
  }
  
  function getPostComments(post, callback) {
    setTimeout(() => {
      console.log('Получены комментарии к посту');
      callback([
        { author: 'Комментатор 1', text: 'Отличный пост!' },
        { author: 'Комментатор 2', text: 'Интересно!' }
      ]);
    }, 1000);
  }
  
  // Ад колбэков
  getUserData(123, function(user) {
    console.log('Пользователь:', user);
    
    getUserPosts(user, function(posts) {
      console.log('Посты пользователя:', posts);
      
      getPostComments(posts[0], function(comments) {
        console.log('Комментарии к посту:', comments);
        
        // Здесь может быть еще много уровней вложенности
      });
    });
  });
                </pre>
              </div>
              
              <div class="promise-chain-code">
                <h4>Цепочка Promise</h4>
                <pre class="code javascript">
  // Те же операции, но с Promise
  function getUserData(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Получены данные пользователя');
        resolve({ id: userId, name: 'Пользователь ' + userId });
      }, 1000);
    });
  }
  
  function getUserPosts(user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Получены посты пользователя');
        resolve([
          { title: 'Пост 1', content: 'Содержимое поста 1' },
          { title: 'Пост 2', content: 'Содержимое поста 2' }
        ]);
      }, 1000);
    });
  }
  
  function getPostComments(post) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Получены комментарии к посту');
        resolve([
          { author: 'Комментатор 1', text: 'Отличный пост!' },
          { author: 'Комментатор 2', text: 'Интересно!' }
        ]);
      }, 1000);
    });
  }
  
  // Цепочка Promise - плоская структура без вложенности
  getUserData(123)
    .then(user => {
      console.log('Пользователь:', user);
      return getUserPosts(user);
    })
    .then(posts => {
      console.log('Посты пользователя:', posts);
      return getPostComments(posts[0]);
    })
    .then(comments => {
      console.log('Комментарии к посту:', comments);
      // Легко добавлять новые шаги в цепочку
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
                </pre>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 4. Async/Await -->
        <div v-if="currentTab === 3" class="tab-content">
          <h2><span class="highlight">Async/Await</span> — синтаксический сахар для Promise</h2>
          
          <div class="explanation">
            <p><code>async/await</code> — это синтаксический сахар, построенный поверх Promise, который делает асинхронный код более читабельным и похожим на синхронный.</p>
          </div>
          
          <div class="async-animation">
            <h3>Преобразование Promise в async/await</h3>
            <div class="transform-container">
              <div class="transform-steps">
                <div 
                  v-for="(step, index) in transformSteps" 
                  :key="index" 
                  class="transform-step"
                  :class="{ active: currentTransformStep >= index, complete: currentTransformStep > index }"
                >
                  <div class="step-number">{{ index + 1 }}</div>
                  <div class="step-content">
                    <div class="step-title">{{ step.title }}</div>
                    <div class="step-description">{{ step.description }}</div>
                  </div>
                </div>
              </div>
              
              <div class="transform-code-container">
                <div class="code-transition">
                  <div class="transition-code" :style="{ transform: `translateY(-${currentTransformStep * 100}%)` }">
                    <div class="code-step" v-for="(step, index) in transformSteps" :key="index">
                      <pre class="code javascript">{{ step.code }}</pre>
                    </div>
                  </div>
                </div>
                
                <div class="transform-controls">
                  <button @click="prevTransformStep" :disabled="currentTransformStep <= 0" class="control-button">Назад</button>
                  <button @click="nextTransformStep" :disabled="currentTransformStep >= transformSteps.length - 1" class="control-button">Вперед</button>
                  <button @click="animateTransform" class="control-button animate">Анимировать все шаги</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="key-points">
            <h3>Ключевые моменты async/await</h3>
            <ul>
              <li><strong>async</strong> — функция всегда возвращает Promise, даже если внутри нет await.</li>
              <li><strong>await</strong> — приостанавливает выполнение функции до разрешения Promise.</li>
              <li>Код с <code>await</code> выглядит синхронным, но выполняется асинхронно.</li>
              <li>Обработка ошибок выполняется через <code>try/catch</code>, как в синхронном коде.</li>
              <li>Можно использовать <code>await</code> только внутри <code>async</code> функций.</li>
            </ul>
          </div>
          
          <div class="code-example">
            <h3>Полный пример с async/await</h3>
            <pre class="code javascript">
  // Функции возвращающие Promise
  function fetchUser(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id > 0) {
          resolve({ id, name: `Пользователь ${id}` });
        } else {
          reject(new Error('Некорректный ID пользователя'));
        }
      }, 1000);
    });
  }
  
  function fetchUserPosts(user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: 'Первый пост' },
          { id: 2, title: 'Второй пост' }
        ]);
      }, 1000);
    });
  }
  
  // Использование async/await
  async function loadUserData(userId) {
    try {
      console.log('Начало загрузки данных пользователя...');
      
      // Await приостанавливает выполнение, пока Promise не разрешится
      const user = await fetchUser(userId);
      console.log('Загружен пользователь:', user);
      
      const posts = await fetchUserPosts(user);
      console.log('Загружены посты пользователя:', posts);
      
      return { user, posts }; // Возвращает Promise с результатом
    } catch (error) {
      // Обработка ошибок из любого из Promise
      console.error('Ошибка при загрузке данных:', error.message);
      throw error; // Можно пробросить ошибку дальше
    }
  }
  
  // Вызов async функции
  loadUserData(1)
    .then(data => console.log('Все данные загружены:', data))
    .catch(error => console.error('Ошибка:', error));
  
  // Можно также использовать await в другой async функции
  async function init() {
    try {
      const data = await loadUserData(1);
      console.log('Инициализация с данными:', data);
    } catch (error) {
      console.error('Ошибка инициализации:', error);
    }
  }
  
  init();
            </pre>
            <button @click="runAsyncExample" class="run-button">Запустить</button>
          </div>
          
          <div v-if="showAsyncResult" class="result-container">
            <h3>Результат выполнения</h3>
            <div class="console-output">
              <div v-for="(log, index) in asyncLogs" :key="index" class="log-item" :class="log.type">
                {{ log.message }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- 5. Практические примеры -->
        <div v-if="currentTab === 4" class="tab-content">
          <h2>Практические примеры использования <span class="highlight">Promise</span></h2>
          
          <div class="subtabs">
            <button 
              v-for="(subtab, index) in practicalExamples" 
              :key="index"
              :class="{ active: currentExample === index }"
              @click="switchExample(index)"
              class="subtab-button"
            >
              {{ subtab.title }}
            </button>
          </div>
          
          <div class="example-container">
            <h3>{{ practicalExamples[currentExample].title }}</h3>
            <div class="example-description" v-html="practicalExamples[currentExample].description"></div>
            
            <pre class="code javascript">{{ practicalExamples[currentExample].code }}</pre>
            
            <div class="example-visualization">
              <component :is="practicalExamples[currentExample].component" />
            </div>
            
            <div class="example-tips">
              <h4>Советы:</h4>
              <ul>
                <li v-for="(tip, index) in practicalExamples[currentExample].tips" :key="index">
                  {{ tip }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref, onBeforeUnmount, defineComponent } from 'vue';

// Компоненты для визуализации методов Promise
const ThenCatchComponent = defineComponent({
  template: `
    <div class="then-catch-visualization">
      <div class="promise-flow">
        <div class="promise-box" :class="state">
          <div class="promise-title">Promise</div>
          <div class="promise-value">{{ value }}</div>
          <div class="promise-state">{{ stateLabel }}</div>
        </div>
        
        <div class="handlers-container">
          <div class="handler then-handler" :class="{ active: showThen }">
            <div class="handler-title">.then()</div>
            <div class="handler-content">{{ thenResult }}</div>
          </div>
          
          <div class="handler catch-handler" :class="{ active: showCatch }">
            <div class="handler-title">.catch()</div>
            <div class="handler-content">{{ catchResult }}</div>
          </div>
        </div>
      </div>
      
      <div class="visualization-controls">
        <button @click="resolvePromise" :disabled="state !== 'pending'" class="control-button success">Выполнить Promise</button>
        <button @click="rejectPromise" :disabled="state !== 'pending'" class="control-button danger">Отклонить Promise</button>
        <button @click="reset" :disabled="state === 'pending'" class="control-button">Сбросить</button>
      </div>
    </div>
  `,
  setup() {
    const state = ref('pending');
    const value = ref('...');
    const stateLabel = ref('В ожидании');
    const showThen = ref(false);
    const showCatch = ref(false);
    const thenResult = ref('');
    const catchResult = ref('');
    
    function resolvePromise() {
      state.value = 'fulfilled';
      value.value = '"Данные получены"';
      stateLabel.value = 'Выполнено';
      
      setTimeout(() => {
        showThen.value = true;
        thenResult.value = 'Обработка успешного результата';
      }, 1000);
    }
    
    function rejectPromise() {
      state.value = 'rejected';
      value.value = '"Ошибка!"';
      stateLabel.value = 'Отклонено';
      
      setTimeout(() => {
        showCatch.value = true;
        catchResult.value = 'Обработка ошибки';
      }, 1000);
    }
    
    function reset() {
      state.value = 'pending';
      value.value = '...';
      stateLabel.value = 'В ожидании';
      showThen.value = false;
      showCatch.value = false;
      thenResult.value = '';
      catchResult.value = '';
    }
    
    return {
      state,
      value,
      stateLabel,
      showThen,
      showCatch,
      thenResult,
      catchResult,
      resolvePromise,
      rejectPromise,
      reset
    };
  }
});

const AllMethodsComponent = defineComponent({
  template: `
    <div class="all-methods-visualization">
      <div class="promises-container">
        <div 
          v-for="(promise, index) in promises" 
          :key="index" 
          class="promise-item"
          :class="promise.state"
        >
          <div class="promise-title">Promise {{ index + 1 }}</div>
          <div class="promise-value">{{ promise.value }}</div>
          <div class="promise-state">{{ promise.stateLabel }}</div>
        </div>
      </div>
      
      <div class="method-result" :class="{ active: showResult }">
        <div class="result-title">{{ resultTitle }}</div>
        <div class="result-value">{{ resultValue }}</div>
      </div>
      
      <div class="visualization-controls">
        <button @click="resolveP1" :disabled="promises[0].state !== 'pending'" class="control-button small">Выполнить P1</button>
        <button @click="rejectP1" :disabled="promises[0].state !== 'pending'" class="control-button small danger">Отклонить P1</button>
        <button @click="resolveP2" :disabled="promises[1].state !== 'pending'" class="control-button small">Выполнить P2</button>
        <button @click="rejectP2" :disabled="promises[1].state !== 'pending'" class="control-button small danger">Отклонить P2</button>
        <button @click="resolveP3" :disabled="promises[2].state !== 'pending'" class="control-button small">Выполнить P3</button>
        <button @click="rejectP3" :disabled="promises[2].state !== 'pending'" class="control-button small danger">Отклонить P3</button>
        <button @click="reset" class="control-button">Сбросить</button>
      </div>
    </div>
  `,
  props: {
    method: {
      type: String,
      default: 'all'
    }
  },
  setup(props) {
    const promises = ref([
      { state: 'pending', value: '...', stateLabel: 'В ожидании' },
      { state: 'pending', value: '...', stateLabel: 'В ожидании' },
      { state: 'pending', value: '...', stateLabel: 'В ожидании' }
    ]);
    
    const showResult = ref(false);
    const resultTitle = ref('');
    const resultValue = ref('');
    
    function resolveP1() {
      updatePromise(0, 'fulfilled', '"Данные 1"', 'Выполнено');
      checkMethod();
    }
    
    function rejectP1() {
      updatePromise(0, 'rejected', '"Ошибка 1!"', 'Отклонено');
      checkMethod();
    }
    
    function resolveP2() {
      updatePromise(1, 'fulfilled', '"Данные 2"', 'Выполнено');
      checkMethod();
    }
    
    function rejectP2() {
      updatePromise(1, 'rejected', '"Ошибка 2!"', 'Отклонено');
      checkMethod();
    }
    
    function resolveP3() {
      updatePromise(2, 'fulfilled', '"Данные 3"', 'Выполнено');
      checkMethod();
    }
    
    function rejectP3() {
      updatePromise(2, 'rejected', '"Ошибка 3!"', 'Отклонено');
      checkMethod();
    }
    
    function updatePromise(index, state, value, stateLabel) {
      promises.value[index] = { state, value, stateLabel };
    }
    
    function checkMethod() {
      // Проверяем условия для разных методов
      const allSettled = promises.value.every(p => p.state !== 'pending');
      const allResolved = promises.value.every(p => p.state === 'fulfilled');
      const anyRejected = promises.value.some(p => p.state === 'rejected');
      const anyResolved = promises.value.some(p => p.state === 'fulfilled');
      
      if (props.method === 'all' && allResolved) {
        showResult.value = true;
        resultTitle.value = 'Promise.all()';
        resultValue.value = '[Данные 1, Данные 2, Данные 3]';
      } else if (props.method === 'all' && anyRejected) {
        showResult.value = true;
        resultTitle.value = 'Promise.all()';
        
        const firstRejectedIndex = promises.value.findIndex(p => p.state === 'rejected');
        resultValue.value = promises.value[firstRejectedIndex].value;
      } else if (props.method === 'allSettled' && allSettled) {
        showResult.value = true;
        resultTitle.value = 'Promise.allSettled()';
        
        const results = promises.value.map((p, i) => {
          if (p.state === 'fulfilled') {
            return `{status: "fulfilled", value: Данные ${i+1}}`;
          } else {
            return `{status: "rejected", reason: Ошибка ${i+1}!}`;
          }
        });
        
        resultValue.value = `[${results.join(', ')}]`;
      } else if (props.method === 'race' && (anyResolved || anyRejected)) {
        showResult.value = true;
        resultTitle.value = 'Promise.race()';
        
        const firstSettledIndex = promises.value.findIndex(p => p.state !== 'pending');
        resultValue.value = promises.value[firstSettledIndex].value;
      } else if (props.method === 'any' && anyResolved) {
        showResult.value = true;
        resultTitle.value = 'Promise.any()';
        
        const firstResolvedIndex = promises.value.findIndex(p => p.state === 'fulfilled');
        resultValue.value = promises.value[firstResolvedIndex].value;
      } else if (props.method === 'any' && allSettled && !anyResolved) {
        showResult.value = true;
        resultTitle.value = 'Promise.any()';
        resultValue.value = 'AggregateError: All promises were rejected';
      }
    }
    
    function reset() {
      promises.value = [
        { state: 'pending', value: '...', stateLabel: 'В ожидании' },
        { state: 'pending', value: '...', stateLabel: 'В ожидании' },
        { state: 'pending', value: '...', stateLabel: 'В ожидании' }
      ];
      showResult.value = false;
      resultTitle.value = '';
      resultValue.value = '';
    }
    
    return {
      promises,
      showResult,
      resultTitle,
      resultValue,
      resolveP1,
      rejectP1,
      resolveP2,
      rejectP2,
      resolveP3,
      rejectP3,
      reset
    };
  }
});

const FetchVisualComponent = defineComponent({
  template: `
    <div class="fetch-visualization">
      <div class="server-client-container">
        <div class="server-side">
          <div class="server-icon">🖥️</div>
          <div class="server-label">Сервер</div>
          <div class="server-state">{{ serverState }}</div>
        </div>
        
        <div class="connection" :class="connectionState">
          <div class="connection-line"></div>
          <div class="data-packet" :class="{ 'packet-error': isError, 'packet-success': isSuccess && showResponse }">
            <span v-if="showRequest">📤</span>
            <span v-if="showResponse">📥</span>
            <span v-if="showError">❌</span>
          </div>
        </div>
        
        <div class="client-side">
          <div class="client-icon">💻</div>
          <div class="client-label">Клиент</div>
          <div class="client-code">fetch(url)</div>
          <div class="client-promise" :class="{ 'promise-pending': isPending, 'promise-fulfilled': isSuccess, 'promise-rejected': isError }">
            {{ promiseState }}
          </div>
        </div>
      </div>
      
      <div class="response-container" v-if="showResponse || showError">
        <pre class="response-data">{{ responseData }}</pre>
      </div>
      
      <div class="visualization-controls">
        <button @click="sendRequest" :disabled="!isIdle" class="control-button">Отправить запрос</button>
        <button @click="simulateSuccess" :disabled="!isRequesting" class="control-button success">Успешный ответ</button>
        <button @click="simulateError" :disabled="!isRequesting" class="control-button danger">Ошибка сети</button>
        <button @click="reset" :disabled="isIdle" class="control-button">Сбросить</button>
      </div>
    </div>
  `,
  setup() {
    const state = ref('idle');
    
    const serverState = ref('Ожидание запроса');
    const connectionState = ref('idle');
    const promiseState = ref('Нет активного Promise');
    const responseData = ref('');
    
    const showRequest = ref(false);
    const showResponse = ref(false);
    const showError = ref(false);
    
    const isIdle = ref(true);
    const isRequesting = ref(false);
    const isPending = ref(false);
    const isSuccess = ref(false);
    const isError = ref(false);
    
    function sendRequest() {
      state.value = 'requesting';
      isIdle.value = false;
      isRequesting.value = true;
      isPending.value = true;
      
      serverState.value = 'Обработка запроса...';
      connectionState.value = 'active';
      promiseState.value = 'Promise в состоянии pending';
      
      showRequest.value = true;
    }
    
    function simulateSuccess() {
      isRequesting.value = false;
      isPending.value = false;
      isSuccess.value = true;
      
      serverState.value = 'Ответ отправлен';
      
      // Имитация задержки ответа
      setTimeout(() => {
        showResponse.value = true;
        promiseState.value = 'Promise в состоянии fulfilled';
        responseData.value = JSON.stringify({
          status: 'success',
          data: {
            id: 1,
            name: 'Пример данных',
            timestamp: new Date().toISOString()
          }
        }, null, 2);
      }, 1000);
    }
    
    function simulateError() {
      isRequesting.value = false;
      isPending.value = false;
      isError.value = true;
      
      serverState.value = 'Произошла ошибка';
      
      // Имитация задержки ответа
      setTimeout(() => {
        showError.value = true;
        promiseState.value = 'Promise в состоянии rejected';
        responseData.value = JSON.stringify({
          status: 'error',
          message: 'Network Error: Failed to fetch',
          code: 500
        }, null, 2);
      }, 1000);
    }
    
    function reset() {
      state.value = 'idle';
      isIdle.value = true;
      isRequesting.value = false;
      isPending.value = false;
      isSuccess.value = false;
      isError.value = false;
      
      serverState.value = 'Ожидание запроса';
      connectionState.value = 'idle';
      promiseState.value = 'Нет активного Promise';
      
      showRequest.value = false;
      showResponse.value = false;
      showError.value = false;
      
      responseData.value = '';
    }
    
    return {
      serverState,
      connectionState,
      promiseState,
      responseData,
      
      showRequest,
      showResponse,
      showError,
      
      isIdle,
      isRequesting,
      isPending,
      isSuccess,
      isError,
      
      sendRequest,
      simulateSuccess,
      simulateError,
      reset
    };
  }
});

// Основное состояние компонента
const tabs = [
  { title: "Что такое Promise" },
  { title: "Методы Promise" },
  { title: "Цепочки Promise" },
  { title: "Async/Await" },
  { title: "Практические примеры" }
];

const currentTab = ref(0);

// ----- Состояние вкладки "Что такое Promise" -----
const currentState = ref('pending');
const stateLabels = {
  pending: 'Ожидание (pending)',
  fulfilled: 'Выполнено (fulfilled)',
  rejected: 'Отклонено (rejected)'
};

const exampleLogs = ref([]);
const showExampleResult = ref(false);

function setState(state) {
  currentState.value = state;
}

function animateStates() {
  // Анимируем последовательно все состояния
  setState('pending');
  
  setTimeout(() => {
    setState('fulfilled');
    
    setTimeout(() => {
      setState('rejected');
      
      setTimeout(() => {
        setState('pending');
      }, 2000);
    }, 2000);
  }, 2000);
}

function runPromiseExample() {
  showExampleResult.value = true;
  exampleLogs.value = [];
  
  exampleLogs.value.push({ type: 'info', message: 'Создание Promise...' });
  
  // Имитация выполнения Promise
  setTimeout(() => {
    const success = Math.random() > 0.5;
    
    if (success) {
      exampleLogs.value.push({ type: 'success', message: 'Успех: Операция выполнена успешно!' });
      setState('fulfilled');
    } else {
      exampleLogs.value.push({ type: 'error', message: 'Ошибка: Произошла ошибка!' });
      setState('rejected');
    }
    
    setTimeout(() => {
      exampleLogs.value.push({ type: 'info', message: 'Завершено (в любом случае)' });
    }, 500);
  }, 2000);
}

// ----- Состояние вкладки "Методы Promise" -----
const currentMethod = ref(0);

const promiseMethods = [
  {
    name: "Promise.then() и Promise.catch()",
    description: `<p><code>then()</code> позволяет обрабатывать успешное выполнение Promise, а <code>catch()</code> обрабатывает ошибки.</p>
    <p>Оба метода возвращают новый Promise, что позволяет их цепочкой вызывать.</p>`,
    code: `const myPromise = new Promise((resolve, reject) => {
  // Асинхронная операция
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) {
      resolve('Данные получены');
    } else {
      reject('Ошибка!');
    }
  }, 2000);
});

myPromise
  .then(result => {
    console.log('Успех:', result);
    return result.toUpperCase();
  })
  .then(transformed => {
    console.log('Трансформированный результат:', transformed);
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });`,
    component: ThenCatchComponent,
    notes: [
      "Метод then() принимает два аргумента: onFulfilled и onRejected (необязательный).",
      "catch(onRejected) эквивалентен then(null, onRejected).",
      "Если колбэк then() или catch() возвращает значение, следующий then() получит это значение.",
      "Если колбэк выбрасывает исключение, следующий (или первый) catch() обработает это исключение."
    ]
  },
  {
    name: "Promise.all()",
    description: `<p><code>Promise.all()</code> принимает массив Promise и возвращает новый Promise, который:</p>
    <ul>
      <li>выполняется, когда все Promise в массиве выполнены, возвращая массив их результатов</li>
      <li>отклоняется, если любой из Promise отклоняется, возвращая причину первого отклоненного Promise</li>
    </ul>`,
    code: `// Несколько независимых операций
const promise1 = fetch('/api/users');
const promise2 = fetch('/api/posts');
const promise3 = fetch('/api/comments');

Promise.all([promise1, promise2, promise3])
  .then(([usersResponse, postsResponse, commentsResponse]) => {
    // Все запросы успешно завершены
    // Результат - массив ответов в том же порядке
    return Promise.all([
      usersResponse.json(),
      postsResponse.json(),
      commentsResponse.json()
    ]);
  })
  .then(([users, posts, comments]) => {
    // Обработка всех данных
    console.log('Все данные получены', { users, posts, comments });
  })
  .catch(error => {
    // Будет вызван, если любой из Promise завершится с ошибкой
    console.error('Ошибка в одном из запросов:', error);
  });`,
    component: defineComponent({
      template: `<AllMethodsComponent method="all" />`,
      components: { AllMethodsComponent }
    }),
    notes: [
      "Идеален для параллельного выполнения независимых задач, когда нужны все результаты.",
      "Если один Promise отклоняется, весь Promise.all отклоняется немедленно, не дожидаясь остальных.",
      "Если массив пуст, Promise.all() немедленно выполняется с пустым массивом.",
      "Порядок результатов в массиве соответствует порядку Promise, независимо от времени выполнения."
    ]
  },
  {
    name: "Promise.allSettled()",
    description: `<p><code>Promise.allSettled()</code> принимает массив Promise и возвращает новый Promise, который:</p>
    <ul>
      <li>всегда выполняется (никогда не отклоняется)</li>
      <li>результат - массив объектов с информацией о статусе и результате/причине каждого Promise</li>
    </ul>`,
    code: `const promises = [
  fetch('/api/data1').then(res => res.json()),
  fetch('/api/nonexistent').then(res => res.json()),
  Promise.resolve('direct value')
];

Promise.allSettled(promises)
  .then(results => {
    // results - массив объектов со статусом и значением/причиной
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(\`Promise \${index}: выполнен с значением \${result.value}\`);
      } else {
        console.log(\`Promise \${index}: отклонен с причиной \${result.reason}\`);
      }
    });
  });
  
// Пример результата:
// [
//   { status: "fulfilled", value: {...} },
//   { status: "rejected", reason: Error },
//   { status: "fulfilled", value: "direct value" }
// ]`,
    component: defineComponent({
      template: `<AllMethodsComponent method="allSettled" />`,
      components: { AllMethodsComponent }
    }),
    notes: [
      "Более новый метод, чем Promise.all() (ES2020).",
      "Идеален для случаев, когда нужно дождаться завершения всех операций, независимо от их успешности.",
      "Отлично подходит для сбора статистики, логирования или выполнения независимых операций, часть из которых может завершиться с ошибкой.",
      "В отличие от Promise.all(), никогда не отклоняется."
    ]
  },
  {
    name: "Promise.race()",
    description: `<p><code>Promise.race()</code> принимает массив Promise и возвращает новый Promise, который:</p>
    <ul>
      <li>выполняется или отклоняется с результатом первого разрешенного Promise (независимо от успеха или ошибки)</li>
      <li>игнорирует результаты всех остальных Promise</li>
    </ul>`,
    code: `// Запрос с таймаутом
function fetchWithTimeout(url, timeout = 5000) {
  const dataPromise = fetch(url);
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeout);
  });

  return Promise.race([dataPromise, timeoutPromise]);
}

fetchWithTimeout('/api/data', 3000)
  .then(response => response.json())
  .then(data => console.log('Данные получены вовремя:', data))
  .catch(error => {
    if (error.message === 'Timeout') {
      console.error('Запрос превысил таймаут!');
    } else {
      console.error('Другая ошибка:', error);
    }
  });`,
    component: defineComponent({
      template: `<AllMethodsComponent method="race" />`,
      components: { AllMethodsComponent }
    }),
    notes: [
      "Идеален для реализации таймаутов и случаев, когда нужен только самый быстрый ответ.",
      "Как только один Promise завершается (успешно или с ошибкой), результат Promise.race() определен.",
      "Остальные Promise продолжают выполняться, но их результаты игнорируются.",
      "Если массив пуст, возвращаемый Promise остается в состоянии ожидания вечно."
    ]
  },
  {
    name: "Promise.any()",
    description: `<p><code>Promise.any()</code> принимает массив Promise и возвращает новый Promise, который:</p>
    <ul>
      <li>выполняется, как только один из Promise выполняется успешно, с его результатом</li>
      <li>отклоняется только если все Promise отклоняются, с AggregateError</li>
    </ul>`,
    code: `// Параллельная загрузка из нескольких источников
const mirrors = [
  'https://mirror1.example.com/file',
  'https://mirror2.example.com/file',
  'https://mirror3.example.com/file'
];

const downloadPromises = mirrors.map(url => fetch(url));

Promise.any(downloadPromises)
  .then(firstResponse => {
    console.log('Файл получен из первого доступного зеркала');
    return firstResponse.blob();
  })
  .then(blob => {
    // Обработка файла
  })
  .catch(error => {
    // AggregateError содержит все ошибки
    console.error('Все зеркала недоступны:', error);
    console.error('Причины:', error.errors);
  });`,
    component: defineComponent({
      template: `<AllMethodsComponent method="any" />`,
      components: { AllMethodsComponent }
    }),
    notes: [
      "Самый новый метод из всех (ES2021).",
      "Противоположность Promise.all() - нужен хотя бы один успешный результат, а не все.",
      "Идеален для случаев, когда есть несколько источников данных и нужен любой рабочий.",
      "Отклоняется с специальным типом ошибки AggregateError, который содержит массив всех ошибок."
    ]
  },
  {
    name: "Promise.finally()",
    description: `<p><code>finally()</code> позволяет выполнить код независимо от того, был ли Promise выполнен или отклонен.</p>
    <p>Этот метод полезен для очистки ресурсов или выполнения кода, который должен выполняться в любом случае.</p>`,
    code: `function loadData() {
  showLoadingIndicator();
  
  fetch('/api/data')
    .then(response => {
      if (!response.ok) {
        throw new Error('Ошибка сети');
      }
      return response.json();
    })
    .then(data => {
      displayData(data);
    })
    .catch(error => {
      showErrorMessage(error);
    })
    .finally(() => {
      // Выполняется всегда, независимо от успеха или ошибки
      hideLoadingIndicator();
    });
}`,
    component: defineComponent({
      template: `
        <div class="finally-visualization">
          <div class="promise-flow">
            <div class="promise-box" :class="state">
              <div class="promise-title">Promise</div>
              <div class="promise-value">{{ value }}</div>
              <div class="promise-state">{{ stateLabel }}</div>
            </div>
            
            <div class="handlers-container">
              <div class="handler then-handler" :class="{ active: showThen && !showError }">
                <div class="handler-title">.then()</div>
              </div>
              
              <div class="handler catch-handler" :class="{ active: showError }">
                <div class="handler-title">.catch()</div>
              </div>
              
              <div class="handler finally-handler" :class="{ active: showFinally }">
                <div class="handler-title">.finally()</div>
                <div class="handler-content">Выполняется всегда!</div>
              </div>
            </div>
          </div>
          
          <div class="visualization-controls">
            <button @click="resolvePromise" :disabled="state !== 'pending'" class="control-button success">Выполнить Promise</button>
            <button @click="rejectPromise" :disabled="state !== 'pending'" class="control-button danger">Отклонить Promise</button>
            <button @click="reset" :disabled="state === 'pending'" class="control-button">Сбросить</div>
        </div>
      `,
      setup() {
        const state = ref('pending');
        const value = ref('...');
        const stateLabel = ref('В ожидании');
        const showThen = ref(false);
        const showError = ref(false);
        const showFinally = ref(false);
        
        function resolvePromise() {
          state.value = 'fulfilled';
          value.value = '"Данные получены"';
          stateLabel.value = 'Выполнено';
          
          showThen.value = true;
          
          setTimeout(() => {
            showFinally.value = true;
          }, 1000);
        }
        
        function rejectPromise() {
          state.value = 'rejected';
          value.value = '"Ошибка!"';
          stateLabel.value = 'Отклонено';
          
          showError.value = true;
          
          setTimeout(() => {
            showFinally.value = true;
          }, 1000);
        }
        
        function reset() {
          state.value = 'pending';
          value.value = '...';
          stateLabel.value = 'В ожидании';
          showThen.value = false;
          showError.value = false;
          showFinally.value = false;
        }
        
        return {
          state,
          value,
          stateLabel,
          showThen,
          showError,
          showFinally,
          resolvePromise,
          rejectPromise,
          reset
        };
      }
    }),
    notes: [
      "Метод finally() принимает колбэк, который выполняется независимо от результата Promise.",
      "Колбэк в finally() не получает никаких аргументов, так как не важно, был ли Promise выполнен или отклонен.",
      "Promise, возвращаемый finally(), принимает значение предыдущего Promise, если колбэк finally() не вызывает ошибку.",
      "Обычно используется для операций очистки, например, закрытия соединений, скрытия индикаторов загрузки и т.д."
    ]
  }
];

// ----- Состояние вкладки "Цепочки Promise" -----
const chainBlocks = [
  {
    title: 'Исходный Promise',
    code: 'getUserData(123)'
  },
  {
    title: 'Обработка и возврат нового Promise',
    code: '.then(user => {\n  console.log(\'Пользователь:\', user);\n  return getUserPosts(user);\n})'
  },
  {
    title: 'Обработка результата предыдущего Promise',
    code: '.then(posts => {\n  console.log(\'Посты пользователя:\', posts);\n  return getPostComments(posts[0]);\n})'
  },
  {
    title: 'Обработка финального результата',
    code: '.then(comments => {\n  console.log(\'Комментарии к посту:\', comments);\n  // Готово!\n})'
  },
  {
    title: 'Обработка ошибок',
    code: '.catch(error => {\n  console.error(\'Ошибка:\', error);\n})'
  }
];

const currentChainBlock = ref(0);

function resetChain() {
  currentChainBlock.value = 0;
}

function nextChainStep() {
  if (currentChainBlock.value < chainBlocks.length) {
    currentChainBlock.value++;
  }
}

function animateChain() {
  resetChain();
  
  // Анимируем каждый шаг с задержкой
  let step = 0;
  const intervalId = setInterval(() => {
    if (step < chainBlocks.length) {
      currentChainBlock.value = step + 1;
      step++;
    } else {
      clearInterval(intervalId);
    }
  }, 1500);
}

// ----- Состояние вкладки "Async/Await" -----
const transformSteps = [
  {
    title: "Исходный код с цепочкой Promise",
    description: "Классическая цепочка Promise с несколькими .then() и .catch()",
    code: `// Функции, возвращающие Promise
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    if (id <= 0) reject(new Error('Некорректный ID'));
    setTimeout(() => resolve({ id, name: 'Пользователь ' + id }), 1000);
  });
}

function fetchUserPosts(user) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, title: 'Первый пост' },
      { id: 2, title: 'Второй пост' }
    ]), 1000);
  });
}

// Использование через цепочку Promise
function loadUserData(userId) {
  return fetchUser(userId)
    .then(user => {
      console.log('Загружен пользователь:', user);
      return fetchUserPosts(user);
    })
    .then(posts => {
      console.log('Загружены посты пользователя:', posts);
      return { user: { id: userId, name: 'Пользователь ' + userId }, posts };
    })
    .catch(error => {
      console.error('Ошибка при загрузке данных:', error.message);
      throw error;
    });
}

// Вызов функции
loadUserData(1)
  .then(data => console.log('Все данные загружены:', data))
  .catch(error => console.error('Ошибка:', error));`
  },
  {
    title: "Добавление ключевого слова async",
    description: "Помечаем функцию как асинхронную с помощью async",
    code: `// Функции, возвращающие Promise
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    if (id <= 0) reject(new Error('Некорректный ID'));
    setTimeout(() => resolve({ id, name: 'Пользователь ' + id }), 1000);
  });
}

function fetchUserPosts(user) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, title: 'Первый пост' },
      { id: 2, title: 'Второй пост' }
    ]), 1000);
  });
}

// Добавляем async к функции
async function loadUserData(userId) {
  return fetchUser(userId)
    .then(user => {
      console.log('Загружен пользователь:', user);
      return fetchUserPosts(user);
    })
    .then(posts => {
      console.log('Загружены посты пользователя:', posts);
      return { user: { id: userId, name: 'Пользователь ' + userId }, posts };
    })
    .catch(error => {
      console.error('Ошибка при загрузке данных:', error.message);
      throw error;
    });
}

// Вызов функции
loadUserData(1)
  .then(data => console.log('Все данные загружены:', data))
  .catch(error => console.error('Ошибка:', error));`
  },
  {
    title: "Замена первого .then() на await",
    description: "Заменяем первый .then() на выражение с await",
    code: `// Функции, возвращающие Promise
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    if (id <= 0) reject(new Error('Некорректный ID'));
    setTimeout(() => resolve({ id, name: 'Пользователь ' + id }), 1000);
  });
}

function fetchUserPosts(user) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, title: 'Первый пост' },
      { id: 2, title: 'Второй пост' }
    ]), 1000);
  });
}

// Заменяем первый then на await
async function loadUserData(userId) {
  // Ждем выполнения Promise и сохраняем результат
  const user = await fetchUser(userId);
  console.log('Загружен пользователь:', user);
  
  // Продолжаем использовать цепочку для оставшихся операций
  return fetchUserPosts(user)
    .then(posts => {
      console.log('Загружены посты пользователя:', posts);
      return { user, posts };
    })
    .catch(error => {
      console.error('Ошибка при загрузке данных:', error.message);
      throw error;
    });
}

// Вызов функции
loadUserData(1)
  .then(data => console.log('Все данные загружены:', data))
  .catch(error => console.error('Ошибка:', error));`
  },
  {
    title: "Замена всех .then() на await",
    description: "Заменяем все оставшиеся .then() на выражения с await",
    code: `// Функции, возвращающие Promise
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    if (id <= 0) reject(new Error('Некорректный ID'));
    setTimeout(() => resolve({ id, name: 'Пользователь ' + id }), 1000);
  });
}

function fetchUserPosts(user) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, title: 'Первый пост' },
      { id: 2, title: 'Второй пост' }
    ]), 1000);
  });
}

// Заменяем все then на await
async function loadUserData(userId) {
  // Ждем выполнения Promise и сохраняем результат
  const user = await fetchUser(userId);
  console.log('Загружен пользователь:', user);
  
  // Ждем выполнения второго Promise
  const posts = await fetchUserPosts(user);
  console.log('Загружены посты пользователя:', posts);
  
  // Возвращаем результат (автоматически оборачивается в Promise)
  return { user, posts };
}

// Вызов функции
loadUserData(1)
  .then(data => console.log('Все данные загружены:', data))
  .catch(error => console.error('Ошибка:', error));`
  },
  {
    title: "Добавление обработки ошибок с try/catch",
    description: "Заменяем .catch() на блок try/catch для обработки ошибок",
    code: `// Функции, возвращающие Promise
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    if (id <= 0) reject(new Error('Некорректный ID'));
    setTimeout(() => resolve({ id, name: 'Пользователь ' + id }), 1000);
  });
}

function fetchUserPosts(user) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, title: 'Первый пост' },
      { id: 2, title: 'Второй пост' }
    ]), 1000);
  });
}

// Добавляем try/catch для обработки ошибок
async function loadUserData(userId) {
  try {
    // Ждем выполнения Promise и сохраняем результат
    const user = await fetchUser(userId);
    console.log('Загружен пользователь:', user);
    
    // Ждем выполнения второго Promise
    const posts = await fetchUserPosts(user);
    console.log('Загружены посты пользователя:', posts);
    
    // Возвращаем результат (автоматически оборачивается в Promise)
    return { user, posts };
  } catch (error) {
    // Обработка любых ошибок из любого из await выражений
    console.error('Ошибка при загрузке данных:', error.message);
    throw error; // Пробрасываем ошибку дальше
  }
}

// Вызов функции
loadUserData(1)
  .then(data => console.log('Все данные загружены:', data))
  .catch(error => console.error('Ошибка:', error));`
  },
  {
    title: "Окончательный код с async/await",
    description: "Полный преобразованный код, использующий async/await и try/catch",
    code: `// Функции, возвращающие Promise
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    if (id <= 0) reject(new Error('Некорректный ID'));
    setTimeout(() => resolve({ id, name: 'Пользователь ' + id }), 1000);
  });
}

function fetchUserPosts(user) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, title: 'Первый пост' },
      { id: 2, title: 'Второй пост' }
    ]), 1000);
  });
}

// Полный код с async/await
async function loadUserData(userId) {
  try {
    console.log('Начало загрузки данных пользователя...');
    
    const user = await fetchUser(userId);
    console.log('Загружен пользователь:', user);
    
    const posts = await fetchUserPosts(user);
    console.log('Загружены посты пользователя:', posts);
    
    return { user, posts }; // Автоматически оборачивается в Promise
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error.message);
    throw error;
  }
}

// Мы можем продолжать использовать .then() и .catch()
loadUserData(1)
  .then(data => console.log('Все данные загружены:', data))
  .catch(error => console.error('Ошибка:', error));

// Или использовать async/await для вызова
async function init() {
  try {
    const data = await loadUserData(1);
    console.log('Инициализация с данными:', data);
  } catch (error) {
    console.error('Ошибка инициализации:', error);
  }
}

init();`
  }
];

const currentTransformStep = ref(0);
const asyncLogs = ref([]);
const showAsyncResult = ref(false);

function nextTransformStep() {
  if (currentTransformStep.value < transformSteps.length - 1) {
    currentTransformStep.value++;
  }
}

function prevTransformStep() {
  if (currentTransformStep.value > 0) {
    currentTransformStep.value--;
  }
}

function animateTransform() {
  currentTransformStep.value = 0;
  
  // Анимируем каждый шаг с задержкой
  let step = 0;
  const intervalId = setInterval(() => {
    if (step < transformSteps.length - 1) {
      currentTransformStep.value = step + 1;
      step++;
    } else {
      clearInterval(intervalId);
    }
  }, 3000);
}

function runAsyncExample() {
  showAsyncResult.value = true;
  asyncLogs.value = [];
  
  asyncLogs.value.push({ type: 'info', message: 'Начало загрузки данных пользователя...' });
  
  // Имитация выполнения асинхронного кода
  setTimeout(() => {
    asyncLogs.value.push({ type: 'success', message: 'Загружен пользователь: { id: 1, name: "Пользователь 1" }' });
    
    setTimeout(() => {
      asyncLogs.value.push({ type: 'success', message: 'Загружены посты пользователя: [{ id: 1, title: "Первый пост" }, { id: 2, title: "Второй пост" }]' });
      
      setTimeout(() => {
        asyncLogs.value.push({ type: 'info', message: 'Все данные загружены: { user: { id: 1, name: "Пользователь 1" }, posts: [...] }' });
        
        setTimeout(() => {
          asyncLogs.value.push({ type: 'info', message: 'Инициализация с данными: { user: { id: 1, name: "Пользователь 1" }, posts: [...] }' });
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}

// ----- Состояние вкладки "Практические примеры" -----
const currentExample = ref(0);
const practicalExamples = [
  {
    title: "Запросы к API с fetch()",
    description: `<p>Функция <code>fetch()</code> возвращает Promise, что делает её идеальной для работы с асинхронными запросами к API.</p>
    <p>Это один из самых распространенных случаев использования Promise в веб-разработке.</p>`,
    code: `// Базовый запрос с использованием fetch
fetch('https://api.example.com/data')
  .then(response => {
    // Проверка статуса ответа
    if (!response.ok) {
      throw new Error(\`Ошибка HTTP: статус \${response.status}\`);
    }
    // Парсинг JSON
    return response.json();
  })
  .then(data => {
    // Обработка данных
    console.log('Полученные данные:', data);
    displayData(data);
  })
  .catch(error => {
    // Обработка ошибок сети или парсинга
    console.error('Ошибка при запросе:', error);
    showErrorToUser(error.message);
  });

// Тот же запрос с использованием async/await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    
    if (!response.ok) {
      throw new Error(\`Ошибка HTTP: статус \${response.status}\`);
    }
    
    const data = await response.json();
    console.log('Полученные данные:', data);
    displayData(data);
  } catch (error) {
    console.error('Ошибка при запросе:', error);
    showErrorToUser(error.message);
  }
}`,
    component: FetchVisualComponent,
    tips: [
      "Всегда проверяйте статус ответа (response.ok или response.status), прежде чем обрабатывать данные.",
      "Используйте .catch() или try/catch для обработки ошибок сети и других проблем.",
      "Помните, что .json() также возвращает Promise, который может быть отклонен при некорректном JSON.",
      "Для отправки данных на сервер, используйте второй параметр fetch() с методом, заголовками и телом запроса."
    ]
  },
  {
    title: "Загрузка нескольких ресурсов параллельно",
    description: `<p>Promise позволяют эффективно загружать несколько ресурсов параллельно, что существенно ускоряет загрузку.</p>
    <p>Методы <code>Promise.all()</code>, <code>Promise.allSettled()</code> и <code>Promise.any()</code> особенно полезны в этих сценариях.</p>`,
    code: `// Загрузка нескольких ресурсов параллельно
async function loadDashboardData() {
  const urls = [
    '/api/user-profile',
    '/api/notifications',
    '/api/recent-activity',
    '/api/statistics'
  ];
  
  try {
    // Запускаем все запросы одновременно
    const promises = urls.map(url => 
      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error(\`Ошибка загрузки \${url}\`);
          return response.json();
        })
    );
    
    // Ждем выполнения всех запросов
    const [profile, notifications, activity, statistics] = await Promise.all(promises);
    
    // Все данные доступны одновременно
    renderDashboard({
      profile,
      notifications,
      activity,
      statistics
    });
    
    return true;
  } catch (error) {
    // Если хотя бы один запрос завершился с ошибкой
    console.error('Ошибка загрузки данных:', error);
    showError('Не удалось загрузить все данные для панели управления');
    return false;
  }
}

// Вариант с продолжением работы даже при некоторых ошибках
async function loadDashboardDataWithFallbacks() {
  const urls = [
    '/api/user-profile',
    '/api/notifications',
    '/api/recent-activity',
    '/api/statistics'
  ];
  
  // Запускаем все запросы одновременно
  const promises = urls.map((url, index) => 
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(\`Ошибка загрузки \${url}\`);
        return response.json();
      })
      .catch(error => {
        console.warn(\`Ошибка загрузки модуля \${index}\`, error);
        // Возвращаем данные по умолчанию при ошибке
        return { error: true, module: index };
      })
  );
  
  // Все промисы будут выполнены, даже если некоторые с ошибками
  const results = await Promise.all(promises);
  
  // Проверяем, есть ли хотя бы один успешный результат
  const hasAnyData = results.some(result => !result.error);
  
  if (hasAnyData) {
    renderDashboardWithPartialData(results);
    return true;
  } else {
    showError('Не удалось загрузить данные для панели управления');
    return false;
  }
}`,
    component: defineComponent({
      template: `
        <div class="parallel-loading-visualization">
          <div class="resources-container">
            <div 
              v-for="(resource, index) in resources" 
              :key="index" 
              class="resource-item"
              :class="{ loading: resource.status === 'loading', success: resource.status === 'success', error: resource.status === 'error' }"
            >
              <div class="resource-title">{{ resource.title }}</div>
              <div class="resource-status">{{ getStatusText(resource.status) }}</div>
              <div class="resource-progress" v-if="resource.status === 'loading'">
                <div class="progress-bar" :style="{ width: resource.progress + '%' }"></div>
              </div>
            </div>
          </div>
          
          <div class="dashboard-container" :class="{ active: showDashboard }">
            <div class="dashboard-label">Панель управления</div>
            <div class="dashboard-status">{{ dashboardStatus }}</div>
          </div>
          
          <div class="visualization-controls">
            <button @click="startLoading" :disabled="isLoading" class="control-button">Начать загрузку</button>
            <button @click="resetLoading" :disabled="!isComplete" class="control-button">Сбросить</button>
            <div class="loading-options">
              <label>
                <input type="checkbox" v-model="simulateErrors"> Симулировать некоторые ошибки
              </label>
              <label>
                <input type="checkbox" v-model="useFallbacks"> Использовать запасные данные при ошибках
              </label>
            </div>
          </div>
        </div>
      `,
      setup() {
        const resources = ref([
          { title: 'Профиль пользователя', status: 'idle', progress: 0 },
          { title: 'Уведомления', status: 'idle', progress: 0 },
          { title: 'Последние действия', status: 'idle', progress: 0 },
          { title: 'Статистика', status: 'idle', progress: 0 }
        ]);
        
        const isLoading = ref(false);
        const isComplete = ref(false);
        const showDashboard = ref(false);
        const dashboardStatus = ref('');
        
        const simulateErrors = ref(false);
        const useFallbacks = ref(false);
        
        function getStatusText(status) {
          switch(status) {
            case 'idle': return 'Ожидание';
            case 'loading': return 'Загрузка...';
            case 'success': return 'Загружено';
            case 'error': return 'Ошибка';
            default: return status;
          }
        }
        
        function startLoading() {
          isLoading.value = true;
          showDashboard.value = false;
          
          resources.value.forEach(resource => {
            resource.status = 'loading';
            resource.progress = 0;
          });
          
          // Симулируем загрузку каждого ресурса с разным временем
          resources.value.forEach((resource) => {
            const duration = 1000 + Math.random() * 2000;
            const shouldFail = simulateErrors.value && Math.random() < 0.3;
            
            // Анимация прогресса
            const startTime = Date.now();
            const interval = setInterval(() => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(100, Math.round((elapsed / duration) * 100));
              resource.progress = progress;
              
              if (progress >= 100) {
                clearInterval(interval);
                
                if (shouldFail && !useFallbacks.value) {
                  resource.status = 'error';
                } else {
                  resource.status = 'success';
                }
                
                checkCompletion();
              }
            }, 50);
          });
        }
        
        function checkCompletion() {
          const allComplete = resources.value.every(r => r.status === 'success' || r.status === 'error');
          
          if (allComplete) {
            isLoading.value = false;
            isComplete.value = true;
            
            const hasErrors = resources.value.some(r => r.status === 'error');
            
            setTimeout(() => {
              showDashboard.value = true;
              
              if (!hasErrors) {
                dashboardStatus.value = 'Все данные загружены успешно';
              } else if (useFallbacks.value) {
                dashboardStatus.value = 'Загружено с некоторыми запасными данными';
              } else {
                dashboardStatus.value = 'Не удалось загрузить все данные';
              }
            }, 500);
          }
        }
        
        function resetLoading() {
          resources.value.forEach(resource => {
            resource.status = 'idle';
            resource.progress = 0;
          });
          
          isLoading.value = false;
          isComplete.value = false;
          showDashboard.value = false;
          dashboardStatus.value = '';
        }
        
        return {
          resources,
          isLoading,
          isComplete,
          showDashboard,
          dashboardStatus,
          simulateErrors,
          useFallbacks,
          getStatusText,
          startLoading,
          resetLoading
        };
      }
    }),
    tips: [
      "Запускайте все запросы одновременно, а не последовательно, чтобы сэкономить время загрузки.",
      "Используйте Promise.all() для ожидания выполнения всех запросов, когда все ресурсы критически важны.",
      "Используйте Promise.allSettled() или собственную обработку ошибок, если вы хотите продолжать работу даже при частичной загрузке.",
      "Для ресурсов, которые могут быть недоступны, подготовьте запасные данные или информативные сообщения об ошибках."
    ]
  },
  {
    title: "Таймауты и отмена операций",
    description: `<p>Promise могут использоваться для реализации таймаутов и отмены длительных операций, что повышает отзывчивость приложения.</p>
    <p>AbortController API в сочетании с Promise дает возможность отменять запросы.</p>`,
    code: `// Функция с таймаутом для любого Promise
function withTimeout(promise, timeoutMs) {
  // Создаем Promise, который отклоняется по истечении времени
  const timeoutPromise = new Promise((_, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(\`Операция не завершена за \${timeoutMs}мс\`));
    }, timeoutMs);
  });
  
  // Используем Promise.race для выполнения самого быстрого
  return Promise.race([promise, timeoutPromise]);
}

// Пример использования таймаута
async function fetchWithTimeout(url, timeout = 5000) {
  try {
    const result = await withTimeout(fetch(url), timeout);
    return await result.json();
  } catch (error) {
    console.error('Ошибка запроса:', error);
    throw error; // Перебрасываем ошибку дальше
  }
}

// Отмена запроса с AbortController
function fetchWithAbort(url) {
  // Создаем контроллер отмены
  const controller = new AbortController();
  const { signal } = controller;
  
  // Возвращаем объект с Promise и функцией отмены
  return {
    promise: fetch(url, { signal })
      .then(response => {
        if (!response.ok) {
          throw new Error(Ошибка HTTP:);
        }
        return response.json();
      }),
    
    // Функция для отмены запроса
    abort: () => controller.abort()
  };
}

// Пример использования отмены
let request;

document.querySelector('#startButton').addEventListener('click', async () => {
  // Отменяем предыдущий запрос, если он есть
  if (request) {
    request.abort();
  }
  
  try {
    request = fetchWithAbort('https://api.example.com/data');
    
    // Запускаем индикатор загрузки
    showLoader();
    
    // Ожидаем выполнения запроса
    const data = await request.promise;
    hideLoader();
    displayData(data);
  } catch (error) {
    hideLoader();
    
    // Проверяем, была ли операция отменена
    if (error.name === 'AbortError') {
      console.log('Запрос был отменен');
    } else {
      console.error('Ошибка запроса:', error);
      showError(error.message);
    }
  }
});

document.querySelector('#cancelButton').addEventListener('click', () => {
  if (request) {
    request.abort();
    console.log('Запрос отменен пользователем');
  }
});`,
    component: defineComponent({
      template: `
        <div class="abort-visualization">
          <div class="server-client-container">
            <div class="server-side">
              <div class="server-icon">🖥️</div>
              <div class="server-label">Сервер</div>
              <div class="server-state">{{ serverState }}</div>
            </div>
            
            <div class="connection" :class="{ active: isRequesting, aborted: isAborted }">
              <div class="connection-line"></div>
              <div class="abort-marker" v-if="isAborted">⛔</div>
            </div>
            
            <div class="client-side">
              <div class="client-icon">💻</div>
              <div class="client-label">Клиент</div>
              <div class="client-code">fetch(url, { signal })</div>
              <div class="client-promise" :class="{ 'promise-pending': isPending, 'promise-fulfilled': isSuccess, 'promise-rejected': isError || isAborted }">
                {{ promiseState }}
              </div>
            </div>
          </div>
          
          <div class="loading-indicator" v-if="isRequesting && !isAborted">
            <div class="loading-spinner"></div>
            <div class="loading-text">Загрузка... {{ elapsedTime }}с</div>
          </div>
          
          <div class="abort-controls">
            <button @click="startRequest" :disabled="isRequesting || isCompleted" class="control-button">Начать запрос</button>
            <button @click="abortRequest" :disabled="!isRequesting || isAborted" class="control-button danger">Отменить запрос</button>
            <button @click="reset" :disabled="!isCompleted && !isAborted" class="control-button">Сбросить</button>
          </div>
          
          <div class="request-info" v-if="isCompleted || isAborted">
            <div class="info-status" :class="{ error: isError || isAborted, success: isSuccess }">
              {{ isAborted ? 'Запрос отменен' : (isSuccess ? 'Запрос выполнен' : 'Ошибка запроса') }}
            </div>
            <div class="info-message">
              {{ infoMessage }}
            </div>
          </div>
        </div>
      `,
      setup() {
        const serverState = ref('Ожидание запроса');
        const isRequesting = ref(false);
        const isPending = ref(false);
        const isSuccess = ref(false);
        const isError = ref(false);
        const isAborted = ref(false);
        const isCompleted = ref(false);
        const promiseState = ref('Нет активного Promise');
        const infoMessage = ref('');
        const elapsedTime = ref(0);
        
        let timerInterval = null;
        
        function startRequest() {
          isRequesting.value = true;
          isPending.value = true;
          isSuccess.value = false;
          isError.value = false;
          isAborted.value = false;
          isCompleted.value = false;
          
          serverState.value = 'Обработка запроса...';
          promiseState.value = 'Promise в состоянии pending';
          infoMessage.value = '';
          elapsedTime.value = 0;
          
          // Старт таймера
          timerInterval = setInterval(() => {
            elapsedTime.value += 0.1;
            elapsedTime.value = Math.round(elapsedTime.value * 10) / 10;
          }, 100);
        }
        
        function abortRequest() {
          clearInterval(timerInterval);
          
          isRequesting.value = false;
          isPending.value = false;
          isAborted.value = true;
          
          serverState.value = 'Запрос отменен';
          promiseState.value = 'Promise в состоянии rejected (AbortError)';
          infoMessage.value = `Запрос был отменен после ${elapsedTime.value} секунд`;
        }
        
        function completeRequest(success = true) {
          clearInterval(timerInterval);
          
          isRequesting.value = false;
          isPending.value = false;
          isSuccess.value = success;
          isError.value = !success;
          isCompleted.value = true;
          
          serverState.value = success ? 'Ответ отправлен' : 'Ошибка обработки';
          promiseState.value = success ? 'Promise в состоянии fulfilled' : 'Promise в состоянии rejected';
          infoMessage.value = success 
            ? `Запрос успешно выполнен за ${elapsedTime.value} секунд` 
            : `Ошибка при выполнении запроса: Timeout`;
        }
        
        function reset() {
          clearInterval(timerInterval);
          
          serverState.value = 'Ожидание запроса';
          isRequesting.value = false;
          isPending.value = false;
          isSuccess.value = false;
          isError.value = false;
          isAborted.value = false;
          isCompleted.value = false;
          promiseState.value = 'Нет активного Promise';
          infoMessage.value = '';
          elapsedTime.value = 0;
        }
        
        // Освобождение ресурсов при размонтировании компонента
        onBeforeUnmount(() => {
          if (timerInterval) {
            clearInterval(timerInterval);
          }
        });
        
        return {
          serverState,
          isRequesting,
          isPending,
          isSuccess,
          isError,
          isAborted,
          isCompleted,
          promiseState,
          infoMessage,
          elapsedTime,
          startRequest,
          abortRequest,
          completeRequest,
          reset
        };
      }
    }),
    tips: [
      "Всегда добавляйте таймауты для запросов, чтобы избежать бесконечного ожидания при проблемах с сетью.",
      "Используйте AbortController для отмены запросов, которые больше не нужны, например, при быстрой навигации пользователя.",
      "Не забывайте очищать таймауты для предотвращения утечек памяти, особенно в React или Vue компонентах.",
      "При отмене запроса убедитесь, что вы корректно обрабатываете исключение AbortError."
    ]
  },
  {
    title: "Последовательное выполнение асинхронных операций",
    description: `<p>В некоторых случаях асинхронные операции должны выполняться строго последовательно, одна за другой.</p>
    <p>Promise позволяют организовать такую последовательность без вложенных колбэков.</p>`,
    code: `// Пример последовательного выполнения с использованием reduce
async function processFilesSequentially(fileUrls) {
  console.log(\`Начало обработки \${fileUrls.length} файлов...\`);
  
  // Исходное значение - разрешенный Promise с пустым массивом результатов
  const initialPromise = Promise.resolve([]);
  
  // Последовательно обрабатываем каждый файл
  const results = await fileUrls.reduce(
    async (previousPromise, fileUrl, index) => {
      // Ждем завершения предыдущих операций
      const results = await previousPromise;
      
      console.log(\`Обработка файла \${index + 1}/\${fileUrls.length}: \${fileUrl}\`);
      
      try {
        // Загрузка файла
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error(\`Ошибка загрузки: \${response.status}\`);
        
        // Обработка файла
        const fileData = await response.json();
        const processedData = await processFile(fileData);
        
        // Добавляем результат к массиву
        results.push({
          url: fileUrl,
          success: true,
          data: processedData
        });
      } catch (error) {
        console.error(\`Ошибка при обработке \${fileUrl}:\`, error);
        
        results.push({
          url: fileUrl,
          success: false,
          error: error.message
        });
      }
      
      // Возвращаем обновленные результаты для следующей итерации
      return results;
    },
    initialPromise
  );
  
  console.log('Все файлы обработаны:', results);
  return results;
}

// Пример последовательного выполнения с помощью for...of в async функции
async function processFilesWithLoop(fileUrls) {
  const results = [];
  
  console.log(\`Начало обработки \${fileUrls.length} файлов...\`);
  
  // for...of работает с await внутри async функции
  for (const [index, fileUrl] of fileUrls.entries()) {
    console.log(\`Обработка файла \${index + 1}/\${fileUrls.length}: \${fileUrl}\`);
    
    try {
      // Загрузка файла
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error(\`Ошибка загрузки: \${response.status}\`);
      
      // Обработка файла
      const fileData = await response.json();
      const processedData = await processFile(fileData);
      
      results.push({
        url: fileUrl,
        success: true,
        data: processedData
      });
    } catch (error) {
      console.error(\`Ошибка при обработке \${fileUrl}:\`, error);
      
      results.push({
        url: fileUrl,
        success: false,
        error: error.message
      });
    }
    
    // Здесь можно добавить задержку между запросами
    // await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('Все файлы обработаны:', results);
  return results;
}`,
    component: defineComponent({
      template: `
        <div class="sequential-visualization">
          <div class="files-pipeline">
            <div 
              v-for="(file, index) in files" 
              :key="index" 
              class="file-item"
              :class="{ 
                active: currentFileIndex === index, 
                pending: currentFileIndex < index,
                completed: currentFileIndex > index,
                error: fileStatuses[index] === 'error',
                success: fileStatuses[index] === 'success'
              }"
            >
              <div class="file-icon">📄</div>
              <div class="file-name">{{ file.name }}</div>
              <div class="file-status">{{ getFileStatusText(index) }}</div>
              <div 
                v-if="currentFileIndex === index && processingStatus !== 'idle'"
                class="processing-indicator"
              >
                <div v-if="processingStatus === 'downloading'" class="processing-stage">
                  ⬇️ Загрузка...
                </div>
                <div v-else-if="processingStatus === 'processing'" class="processing-stage">
                  ⚙️ Обработка...
                </div>
                <div v-else-if="processingStatus === 'saving'" class="processing-stage">
                  💾 Сохранение...
                </div>
              </div>
            </div>
          </div>
          
          <div class="progress-overview">
            <div class="progress-bar-container">
              <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
            </div>
            <div class="progress-text">
              {{ progressText }}
            </div>
          </div>
          
          <div class="visualization-controls">
            <button @click="startProcessing" :disabled="isProcessing || isCompleted" class="control-button">Начать обработку</button>
            <button @click="reset" :disabled="!isCompleted" class="control-button">Сбросить</button>
            <div class="processing-options">
              <label>
                <input type="checkbox" v-model="simulateErrors"> Симулировать случайные ошибки
              </label>
            </div>
          </div>
        </div>
      `,
      setup() {
        const files = ref([
          { name: 'document1.json', size: 125 },
          { name: 'document2.json', size: 312 },
          { name: 'document3.json', size: 208 },
          { name: 'document4.json', size: 564 },
          { name: 'document5.json', size: 183 }
        ]);
        
        const currentFileIndex = ref(-1);
        const fileStatuses = ref(Array(files.value.length).fill('pending'));
        const processingStatus = ref('idle');
        const isProcessing = ref(false);
        const isCompleted = ref(false);
        const simulateErrors = ref(false);
        
        const progressPercentage = computed(() => {
          const totalFiles = files.value.length;
          const completedFiles = fileStatuses.value.filter(s => s === 'success' || s === 'error').length;
          
          if (completedFiles === 0) return 0;
          
          // Учитываем также текущую стадию обработки
          let currentProgress = 0;
          if (currentFileIndex.value >= 0 && currentFileIndex.value < totalFiles) {
            if (processingStatus.value === 'downloading') {
              currentProgress = 0.3;
            } else if (processingStatus.value === 'processing') {
              currentProgress = 0.7;
            } else if (processingStatus.value === 'saving') {
              currentProgress = 0.9;
            }
          }
          
          return Math.round((completedFiles + currentProgress) / totalFiles * 100);
        });
        
        const progressText = computed(() => {
          const totalFiles = files.value.length;
          const completedFiles = fileStatuses.value.filter(s => s === 'success' || s === 'error').length;
          const successFiles = fileStatuses.value.filter(s => s === 'success').length;
          const errorFiles = fileStatuses.value.filter(s => s === 'error').length;
          
          if (completedFiles === 0) {
            return 'Ожидание начала обработки';
          } else if (completedFiles < totalFiles) {
            return `Обработано ${completedFiles} из ${totalFiles} файлов (${successFiles} успешно, ${errorFiles} с ошибками)`;
          } else {
            return `Обработка завершена. Успешно: ${successFiles}, с ошибками: ${errorFiles}`;
          }
        });
        
        function getFileStatusText(index) {
          if (currentFileIndex.value > index) {
            return fileStatuses.value[index] === 'success' ? 'Обработан' : 'Ошибка';
          } else if (currentFileIndex.value === index) {
            return 'Обрабатывается...';
          } else {
            return 'В очереди';
          }
        }
        
        async function startProcessing() {
          isProcessing.value = true;
          currentFileIndex.value = 0;
          
          for (let i = 0; i < files.value.length; i++) {
            currentFileIndex.value = i;
            
            // Симуляция загрузки файла
            processingStatus.value = 'downloading';
            await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 500));
            
            // Симуляция обработки файла
            processingStatus.value = 'processing';
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 800));
            
            // Симуляция сохранения файла
            processingStatus.value = 'saving';
            await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));
            
            // Определяем результат
            const success = !simulateErrors.value || Math.random() > 0.3;
            fileStatuses.value[i] = success ? 'success' : 'error';
          }
          
          currentFileIndex.value = files.value.length;
          processingStatus.value = 'idle';
          isProcessing.value = false;
          isCompleted.value = true;
        }
        
        function reset() {
          currentFileIndex.value = -1;
          fileStatuses.value = Array(files.value.length).fill('pending');
          processingStatus.value = 'idle';
          isProcessing.value = false;
          isCompleted.value = false;
        }
        
        return {
          files,
          currentFileIndex,
          fileStatuses,
          processingStatus,
          isProcessing,
          isCompleted,
          simulateErrors,
          progressPercentage,
          progressText,
          getFileStatusText,
          startProcessing,
          reset
        };
      }
    }),
    tips: [
      "Используйте reduce с async/await для элегантной последовательной обработки массива данных.",
      "Если вы используете async/await, цикл for...of обычно более читабельный вариант для последовательной обработки.",
      "Не используйте forEach или map с await - они не будут работать последовательно как ожидается.",
      "Добавляйте обработку ошибок для каждого шага, чтобы ошибка в одном элементе не останавливала всю цепочку."
    ]
  }
];

// Функция для переключения между вкладками
function switchTab(index) {
  currentTab.value = index;
  
  // Сброс состояния для текущей вкладки
  if (index === 0) {
    // Что такое Promise
    currentState.value = 'pending';
    showExampleResult.value = false;
    exampleLogs.value = [];
  } else if (index === 1) {
    // Методы Promise
    currentMethod.value = 0;
  } else if (index === 2) {
    // Цепочки Promise
    resetChain();
  } else if (index === 3) {
    // Async/Await
    currentTransformStep.value = 0;
    showAsyncResult.value = false;
    asyncLogs.value = [];
  } else if (index === 4) {
    // Практические примеры
    currentExample.value = 0;
  }
}

// Функция для переключения между методами Promise
function switchMethod(index) {
  currentMethod.value = index;
}

// Функция для переключения между практическими примерами
function switchExample(index) {
  currentExample.value = index;
}
</script>

<style scoped>
.promise-explorer {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #333;
  background-color: #f8f9fa;
  border-radius: 8px;
}

h1, h2, h3, h4 {
  color: #2c3e50;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
}

h2 {
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 1.6rem;
}

h3 {
  font-size: 1.3rem;
  margin-top: 25px;
  margin-bottom: 15px;
}

.highlight {
  color: #e74c3c;
  font-weight: bold;
}

/* Стили для табов */
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tab-button {
  padding: 10px 20px;
  background-color: #e9ecef;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-button:hover {
  background-color: #dee2e6;
}

.tab-button.active {
  background-color: #3498db;
  color: white;
}

.content-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tab-content {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Стили для подвкладок */
.subtabs {
  display: flex;
  gap: 10px;
  margin: 20px 0;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 10px;
  overflow-x: auto;
}

.subtab-button {
  padding: 8px 15px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.subtab-button:hover {
  background-color: #e9ecef;
}

.subtab-button.active {
  background-color: #4caf50;
  color: white;
  border-color: #4caf50;
}

/* Стили для объяснения */
.explanation {
  margin-bottom: 20px;
  line-height: 1.6;
}

.explanation p {
  margin-bottom: 15px;
}

.explanation ul {
  margin-left: 20px;
  margin-bottom: 15px;
}

.explanation li {
  margin-bottom: 5px;
}

/* Стили для анимации Promise */
.promise-animation {
  margin: 30px 0;
}

.animation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 20px;
}

.promise-state-wrapper {
  position: relative;
  width: 200px;
  height: 200px;
}

.promise-state {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.5s ease;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.promise-state.pending {
  background-color: #e9ecef;
  border: 5px solid #6c757d;
}

.promise-state.fulfilled {
  background-color: #d4edda;
  border: 5px solid #28a745;
}

.promise-state.rejected {
  background-color: #f8d7da;
  border: 5px solid #dc3545;
}

.state-icon {
  font-size: 3rem;
  margin-bottom: 10px;
}

.state-label {
  font-weight: bold;
  text-align: center;
}

.control-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.control-button {
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-button:hover:not(:disabled) {
  background-color: #5a6268;
  transform: translateY(-2px);
}

.control-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.control-button.pending {
  background-color: #6c757d;
}

.control-button.fulfilled {
  background-color: #28a745;
}

.control-button.rejected {
  background-color: #dc3545;
}

.control-button.animate {
  background-color: #17a2b8;
}

.control-button.success {
  background-color: #28a745;
}

.control-button.danger {
  background-color: #dc3545;
}

.control-button.small {
  padding: 6px 12px;
  font-size: 0.9rem;
}

/* Стили для кода */
.code-container {
  margin-bottom: 30px;
}

.code {
  margin: 0;
  padding: 15px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre;
  background-color: #2d2d2d;
  color: #f8f8f2;
  border-radius: 6px;
}

.run-button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.run-button:hover {
  background-color: #2980b9;
}

/* Стили для результатов выполнения */
.result-container {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border-left: 3px solid #3498db;
}

.console-output {
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
  margin-top: 10px;
}

.log-item {
  margin-bottom: 5px;
  line-height: 1.5;
}

.log-item.info {
  color: #17a2b8;
}

.log-item.success {
  color: #28a745;
}

.log-item.error {
  color: #dc3545;
}

/* Стили для методов Promise */
.method-container {
  animation: fadeIn 0.5s ease;
}

.method-description {
  margin-bottom: 20px;
  line-height: 1.6;
}

.method-animation {
  margin: 20px 0;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.method-notes {
  margin-top: 20px;
  padding: 15px;
  background-color: #e8f5e9;
  border-radius: 6px;
  border-left: 3px solid #4caf50;
}

.method-notes h4 {
  margin-top: 0;
  color: #2e7d32;
  margin-bottom: 10px;
}

.method-notes ul {
  margin-left: 20px;
  margin-bottom: 0;
}

.method-notes li {
  margin-bottom: 8px;
  line-height: 1.5;
}

/* Стили для визуализации then/catch */
.then-catch-visualization {
  padding: 20px;
}

.promise-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.promise-box {
  width: 200px;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  transition: all 0.5s ease;
}

.promise-box.pending {
  background-color: #e9ecef;
  border: 2px solid #6c757d;
}

.promise-box.fulfilled {
  background-color: #d4edda;
  border: 2px solid #28a745;
}

.promise-box.rejected {
  background-color: #f8d7da;
  border: 2px solid #dc3545;
}

.promise-title {
  font-weight: bold;
  margin-bottom: 8px;
}

.promise-value {
  font-family: monospace;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 8px;
}

.promise-state {
  font-size: 0.9rem;
  color: #6c757d;
}

.handlers-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.handler {
  width: 180px;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  opacity: 0.5;
  transform: translateY(10px);
  transition: all 0.5s ease;
}

.handler.active {
  opacity: 1;
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.then-handler.active {
  background-color: #d4edda;
  border-color: #28a745;
}

.catch-handler.active {
  background-color: #f8d7da;
  border-color: #dc3545;
}

.finally-handler.active {
  background-color: #e6f3f8;
  border-color: #17a2b8;
}

.handler-title {
  font-weight: bold;
  margin-bottom: 8px;
}

.handler-content {
  font-size: 0.9rem;
  color: #495057;
}

.visualization-controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

/* Стили для all, allSettled, race, any */
.all-methods-visualization {
  padding: 20px;
}

.promises-container {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
}

.promise-item {
  width: 150px;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  transition: all 0.5s ease;
}

.promise-item.pending {
  background-color: #e9ecef;
  border: 2px solid #6c757d;
}

.promise-item.fulfilled {
  background-color: #d4edda;
  border: 2px solid #28a745;
}

.promise-item.rejected {
  background-color: #f8d7da;
  border: 2px solid #dc3545;
}

.method-result {
  max-width: 500px;
  margin: 0 auto 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #dee2e6;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
  text-align: center;
}

.method-result.active {
  opacity: 1;
  transform: translateY(0);
}

.result-title {
  font-weight: bold;
  margin-bottom: 10px;
  color: #3498db;
}

.result-value {
  font-family: monospace;
  padding: 10px;
  background-color: #2d2d2d;
  color: #f8f8f2;
  border-radius: 4px;
  text-align: left;
  white-space: pre-wrap;
  word-break: break-word;
}

/* Стили для визуализации цепочки Promise */
.chain-animation {
  margin: 30px 0;
}

.chain-container {
  margin-top: 20px;
}

.promise-chain {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 30px;
  position: relative;
}

.chain-block {
  max-width: 500px;
  margin: 0 auto;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 2px solid #dee2e6;
  opacity: 0.5;
  transition: all 0.5s ease;
  position: relative;
}

.chain-block.active {
  opacity: 1;
  border-color: #3498db;
  background-color: #ebf5fb;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chain-block.completed {
  opacity: 1;
  border-color: #28a745;
  background-color: #d4edda;
}

.block-content {
  text-align: left;
}

.block-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.block-code {
  font-family: monospace;
  padding: 10px;
  background-color: #2d2d2d;
  color: #f8f8f2;
  border-radius: 4px;
  white-space: pre-wrap;
}

.chain-connector {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  height: 30px;
  width: 2px;
  background-color: #3498db;
}

.connector-line {
  height: 20px;
  width: 2px;
  background-color: #3498db;
  margin: 0 auto;
}

.connector-arrow {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #3498db;
  margin: 0 auto;
}

.chain-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

/* Стили для сравнения колбэков vs Promise */
.comparison-container {
  margin-top: 40px;
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.callback-hell, .promise-chain-code {
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.callback-hell h4, .promise-chain-code h4 {
  margin-top: 0;
  margin-bottom: 15px;
  text-align: center;
}

.callback-hell .code, .promise-chain-code .code {
  height: 400px;
  overflow-y: auto;
}

/* Стили для раздела Async/Await */
.async-animation {
  margin: 30px 0;
}

.transform-container {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  margin-top: 20px;
}

.transform-steps {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.transform-step {
  display: flex;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.transform-step.active {
  opacity: 1;
  border-color: #3498db;
  background-color: #ebf5fb;
}

.transform-step.complete {
  opacity: 1;
  border-color: #28a745;
  background-color: #d4edda;
}

.step-number {
  width: 30px;
  height: 30px;
  background-color: #3498db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.step-description {
  font-size: 0.9rem;
  color: #6c757d;
}

.transform-code-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.code-transition {
  height: 400px;
  overflow: hidden;
}

.transition-code {
  transition: transform 0.5s ease;
}

.code-step {
  height: 400px;
  overflow-y: auto;
}

.transform-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.key-points {
  margin-top: 30px;
  padding: 20px;
  background-color: #e8f5e9;
  border-radius: 8px;
  border-left: 4px solid #4caf50;
}

.key-points h3 {
  margin-top: 0;
  color: #2e7d32;
}

.key-points ul {
  margin-left: 20px;
  margin-bottom: 0;
}

.key-points li {
  margin-bottom: 10px;
  line-height: 1.6;
}

.code-example {
  margin-top: 30px;
}

/* Стили для практических примеров */
.example-container {
  animation: fadeIn 0.5s ease;
}

.example-description {
  margin-bottom: 20px;
  line-height: 1.6;
}

.example-visualization {
  margin: 20px 0;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.example-tips {
  margin-top: 20px;
  padding: 15px;
  background-color: #ffebee;
  border-radius: 6px;
  border-left: 3px solid #f44336;
}

.example-tips h4 {
  margin-top: 0;
  color: #c62828;
  margin-bottom: 10px;
}

.example-tips ul {
  margin-left: 20px;
  margin-bottom: 0;
}

.example-tips li {
  margin-bottom: 8px;
  line-height: 1.5;
}

/* Стили для визуализации fetch */
.fetch-visualization {
  padding: 20px;
}

.server-client-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-bottom: 30px;
}

.server-side, .client-side {
  width: 200px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  text-align: center;
}

.server-icon, .client-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.server-label, .client-label {
  font-weight: bold;
  margin-bottom: 10px;
}

.server-state {
  font-size: 0.9rem;
  color: #6c757d;
}

.client-code {
  font-family: monospace;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin: 10px 0;
}

.client-promise {
  font-size: 0.9rem;
  padding: 5px;
  border-radius: 4px;
  transition: all 0.5s ease;
}

.promise-pending {
  background-color: #e9ecef;
  color: #6c757d;
}

.promise-fulfilled {
  background-color: #d4edda;
  color: #28a745;
}

.promise-rejected {
  background-color: #f8d7da;
  color: #dc3545;
}

.connection {
  position: relative;
  height: 10px;
  flex: 1;
  max-width: 200px;
}

.connection-line {
  height: 2px;
  background-color: #dee2e6;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: background-color 0.5s ease;
}

.connection.active .connection-line {
  background-color: #3498db;
}

.connection.aborted .connection-line {
  background-color: #dc3545;
}

.data-packet {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  animation: movePacket 2s infinite;
}

.data-packet.packet-error {
  color: #dc3545;
}

.data-packet.packet-success {
  color: #28a745;
}

@keyframes movePacket {
  0%, 100% { transform: translate(-50%, -50%); }
  50% { transform: translate(-50%, -150%); }
}

.response-container {
  margin-top: 20px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.response-data {
  font-family: monospace;
  padding: 15px;
  background-color: #2d2d2d;
  color: #f8f8f2;
  border-radius: 6px;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
}

.loading-indicator {
  text-align: center;
  margin: 20px 0;
}

.loading-spinner {
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

.loading-text {
  display: inline-block;
  vertical-align: middle;
  font-size: 0.9rem;
  color: #6c757d;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.abort-marker {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: #dc3545;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.2); }
  100% { transform: translate(-50%, -50%) scale(1); }
}

.abort-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

.request-info {
  margin-top: 20px;
  padding: 15px;
  border-radius: 6px;
  background-color: #f8f9fa;
  text-align: center;
}

.info-status {
  font-weight: bold;
  margin-bottom: 10px;
}

.info-status.error {
  color: #dc3545;
}

.info-status.success {
  color: #28a745;
}

.info-message {
  font-size: 0.9rem;
  color: #6c757d;
}

/* Стили для параллельной загрузки */
.parallel-loading-visualization {
  padding: 20px;
}

.resources-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

.resource-item {
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #dee2e6;
  transition: all 0.3s ease;
}

.resource-item.loading {
  border-color: #3498db;
  background-color: #ebf5fb;
}

.resource-item.success {
  border-color: #28a745;
  background-color: #d4edda;
}

.resource-item.error {
  border-color: #dc3545;
  background-color: #f8d7da;
}

.resource-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.resource-status {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 10px;
}

.resource-progress {
  height: 5px;
  background-color: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #3498db;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.dashboard-container {
  max-width: 600px;
  margin: 0 auto 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.dashboard-container.active {
  opacity: 1;
  transform: translateY(0);
}

.dashboard-label {
  font-weight: bold;
  margin-bottom: 10px;
}

.dashboard-status {
  font-size: 0.9rem;
  color: #6c757d;
}

.loading-options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  gap: 5px;
}

.loading-options label {
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}

.loading-options input[type="checkbox"] {
  margin-right: 5px;
}

.progress-bar-container {
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-text {
  font-size: 0.9rem;
  color: #6c757d;
  text-align: center;
}

/* Стили для последовательного выполнения */
.sequential-visualization {
  padding: 20px;
}

.files-pipeline {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #dee2e6;
  transition: all 0.3s ease;
}

.file-item.active {
  border-color: #3498db;
  background-color: #ebf5fb;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.file-item.completed.success {
  border-color: #28a745;
  background-color: #d4edda;
}

.file-item.completed.error {
  border-color: #dc3545;
  background-color: #f8d7da;
}

.file-item.pending {
  opacity: 0.6;
}

.file-icon {
  font-size: 1.5rem;
  margin-right: 15px;
}

.file-name {
  font-weight: bold;
  flex: 1;
}

.file-status {
  font-size: 0.9rem;
  color: #6c757d;
  margin-right: 15px;
}

.processing-indicator {
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  font-size: 0.9rem;
}

.processing-stage {
  display: flex;
  align-items: center;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
  .code-comparison {
    grid-template-columns: 1fr;
  }
  
  .transform-container {
    grid-template-columns: 1fr;
  }
  
  .server-client-container {
    flex-direction: column;
  }
  
  .connection {
    width: 10px;
    height: 40px;
    max-width: none;
  }
  
  .connection-line {
    width: 2px;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
  
  .data-packet {
    animation: movePacketVertical 2s infinite;
  }
  
  @keyframes movePacketVertical {
    0%, 100% { transform: translate(-50%, -50%); }
    50% { transform: translate(-150%, -50%); }
  }
}

@media (max-width: 576px) {
  .tabs {
    flex-direction: column;
  }
  
  .promise-state-wrapper {
    width: 150px;
    height: 150px;
  }
  
  .state-icon {
    font-size: 2rem;
  }
  
  .state-label {
    font-size: 0.9rem;
  }
  
  .handlers-container {
    flex-direction: column;
  }
  
  .promises-container {
    flex-direction: column;
    align-items: center;
  }
  
  .promise-item {
    width: 100%;
    max-width: 250px;
  }
}
</style>