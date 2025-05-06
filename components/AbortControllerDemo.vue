/* Убираем все цветные обозначения для кода */
.controller-color, .signal-color, .abort-color, .error-color {
  color: #000;
}

/* Все ключевые слова делаем черными */
.code-block .keyword, 
.code-block .string, 
.code-block .number, 
.code-block .comment,
.code-block .function,
.code-block .operator {
  color: #000;
}/* Обязательно делаем все текстовые элементы черными */
.abort-controller-demo * {
  color: #000;
}

/* Исключения только для фона кнопок, где белый текст нужен для контраста */
.animation-controls button {
  color: #ffffff;
}

/* Задаем черный цвет всем кодовым элементам */
code, pre, .code, .code-block, .code-line {
  color: #000 !important;
}.explanation h4 {
  color: #000;
  margin-top: 0;
  margin-bottom: 10px;
}

.explanation strong, .explanation em, .explanation b, .explanation i {
  color: #000;
}<template>
  <div class="abort-controller-demo">
    <h1>Отмена запросов с AbortController</h1>
    
    <div class="intro-section">
      <h2>Что такое AbortController?</h2>
      <p>
        <strong>AbortController</strong> — это интерфейс браузерного API, который позволяет отменять асинхронные операции, 
        такие как fetch-запросы, перед их завершением. Это особенно полезно, когда пользователь переходит на другую 
        страницу или когда запрос больше не нужен из-за изменения состояния приложения.
      </p>
    </div>
    
    <div class="tabs-container">
      <div class="tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id" 
          :class="['tab-button', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.title }}
        </button>
      </div>
      
      <!-- Содержимое вкладок -->
      <div class="tab-content">
        <!-- Основы работы -->
        <div v-if="activeTab === 'basics'" class="tab-pane">
          <h3>Основы работы с AbortController</h3>
          
          <div class="code-explanation">
            <div class="code-block">
              <pre style="color: black; margin: 0;">
// Создаем экземпляр AbortController
const controller = new AbortController();

// Получаем специальный сигнал
const signal = controller.signal;

// Используем сигнал в fetch-запросе
fetch('https://api.example.com/data', { signal })
  .then(response => response.json())
  .then(data => console.log('Данные получены:', data))
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Запрос был отменен');
    } else {
      console.error('Произошла ошибка:', err);
    }
  });

// В любой момент можем отменить запрос
// например, по клику на кнопку или при размонтировании компонента
controller.abort();
              </pre>
            </div>
            
            <div class="explanation">
              <h4>Как это работает:</h4>
              <ol>
                <li>Создаем экземпляр <code>AbortController</code></li>
                <li>Получаем <code>signal</code> из контроллера</li>
                <li>Передаем <code>signal</code> в опции fetch-запроса</li>
                <li>Вызываем <code>controller.abort()</code> для отмены запроса</li>
                <li>Обрабатываем ошибку <code>AbortError</code> в блоке catch</li>
              </ol>
            </div>
          </div>
          
          <div class="animation-container">
            <div class="animation-title">Визуализация работы AbortController</div>
            <div class="animation-wrapper">
              <div class="animation-controls">
                <button @click="startAnimation" :disabled="isAnimating">Запустить</button>
                <button @click="abortRequest" :disabled="!isAnimating || isAborted">Отменить запрос</button>
                <button @click="resetAnimation">Сбросить</button>
              </div>
              
              <div class="animation-scene">
                <div class="client-side">
                  <div class="title">Клиент</div>
                  <div 
                    class="controller-object" 
                    :class="{ active: animationStep >= 1 }"
                  >
                    AbortController
                    <div 
                      class="signal-object" 
                      :class="{ active: animationStep >= 2 }"
                    >
                      signal
                    </div>
                  </div>
                </div>
                
                <div class="network">
                  <div 
                    class="request" 
                    :class="{ 
                      active: animationStep >= 3, 
                      aborted: isAborted 
                    }"
                  >
                    <div class="request-text">
                      <span v-if="animationStep >= 3 && !isAborted && !isCompleted">
                        Выполняется запрос...
                      </span>
                      <span v-if="isAborted">
                        Запрос отменен
                      </span>
                      <span v-if="isCompleted">
                        Запрос завершен
                      </span>
                    </div>
                  </div>
                  
                  <div 
                    class="abort-action" 
                    :class="{ active: isAborted }"
                  >
                    controller.abort()
                  </div>
                </div>
                
                <div class="server-side">
                  <div class="title">Сервер</div>
                  <div 
                    class="server-object" 
                    :class="{ 
                      active: animationStep >= 3 && !isAborted,
                      processing: animationStep >= 3 && !isAborted && !isCompleted,
                      completed: isCompleted
                    }"
                  >
                    API
                    <div v-if="isCompleted" class="response">
                      Ответ
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="animation-log">
                <div class="log-title">Журнал событий:</div>
                <div class="log-content">
                  <div v-for="(log, index) in animationLogs" :key="index" class="log-item" style="color: black; margin: 0;">
                    {{ log }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Практическое применение -->
        <div v-if="activeTab === 'practice'" class="tab-pane">
          <h3>Практическое применение</h3>
          
          <div class="code-example">
            <h4>Пример 1: Отмена запроса при размонтировании компонента Vue</h4>
            <div class="code-block">
              <pre>
export default {
  data() {
    return {
      controller: null,
      data: null,
      loading: false,
      error: null
    }
  },
  
  mounted() {
    this.fetchData();
  },
  
  beforeUnmount() {
    // Отменяем запрос перед размонтированием компонента
    if (this.controller) {
      this.controller.abort();
    }
  },
  
  methods: {
    async fetchData() {
      // Отменяем предыдущий запрос, если он существует
      if (this.controller) {
        this.controller.abort();
      }
      
      // Создаем новый контроллер для этого запроса
      this.controller = new AbortController();
      const { signal } = this.controller;
      
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch('https://api.example.com/data', { signal });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        this.data = await response.json();
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Запрос был отменен');
          // Не устанавливаем ошибку, так как отмена - нормальное поведение
        } else {
          this.error = err.message;
        }
      } finally {
        this.loading = false;
      }
    }
  }
}
              </pre>
            </div>
            
            <h4>Пример 2: Отмена запроса при быстрой смене поиска</h4>
            <div class="code-block">
              <pre>
export default {
  data() {
    return {
      searchQuery: '',
      results: [],
      loading: false,
      controller: null,
      debounceTimeout: null
    }
  },
  
  watch: {
    searchQuery(newQuery) {
      // Отменяем предыдущий таймер debounce
      clearTimeout(this.debounceTimeout);
      
      // Устанавливаем новый таймер
      this.debounceTimeout = setTimeout(() => {
        this.searchProducts(newQuery);
      }, 300); // Ждем 300мс перед запросом
    }
  },
  
  methods: {
    async searchProducts(query) {
      // Отменяем предыдущий запрос
      if (this.controller) {
        this.controller.abort();
      }
      
      if (!query.trim()) {
        this.results = [];
        return;
      }
      
      // Создаем новый контроллер
      this.controller = new AbortController();
      const { signal } = this.controller;
      
      this.loading = true;
      
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal });
        this.results = await response.json();
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Ошибка поиска:', err);
        }
      } finally {
        this.loading = false;
      }
    }
  }
}
              </pre>
            </div>
          </div>
        </div>
        
        <!-- Подводные камни -->
        <div v-if="activeTab === 'pitfalls'" class="tab-pane">
          <h3>Подводные камни и лучшие практики</h3>
          
          <div class="pitfalls-list">
            <div class="pitfall">
              <h4>1. Повторное использование AbortController</h4>
              <div class="pitfall-content">
                <div class="wrong-way">
                  <div class="title">❌ Неправильно</div>
                  <pre>
// Создаем контроллер один раз
const controller = new AbortController();

function fetchData() {
  // Постоянно используем один и тот же контроллер
  fetch('/api/data', { signal: controller.signal })
    .then(/* ... */)
    .catch(/* ... */);
}

// Проблема: повторный вызов abort() не сработает для нового запроса
                  </pre>
                </div>
                
                <div class="right-way">
                  <div class="title">✅ Правильно</div>
                  <pre>
let controller = null;

function fetchData() {
  // Отменяем предыдущий запрос
  if (controller) {
    controller.abort();
  }
  
  // Создаем новый контроллер для каждого запроса
  controller = new AbortController();
  
  fetch('/api/data', { signal: controller.signal })
    .then(/* ... */)
    .catch(/* ... */);
}
                  </pre>
                </div>
              </div>
            </div>
            
            <div class="pitfall">
              <h4>2. Обработка ошибок AbortError</h4>
              <div class="pitfall-content">
                <div class="wrong-way">
                  <div class="title">❌ Неправильно</div>
                  <pre>
fetch('/api/data', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => {
    // Отображаем ошибку пользователю при любой ошибке
    this.error = 'Произошла ошибка при загрузке данных';
    console.error(err);
  });
                  </pre>
                </div>
                
                <div class="right-way">
                  <div class="title">✅ Правильно</div>
                  <pre>
fetch('/api/data', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => {
    // Проверяем, является ли ошибка результатом отмены
    if (err.name === 'AbortError') {
      console.log('Запрос был отменен');
      // Не показываем ошибку пользователю
    } else {
      // Обрабатываем реальные ошибки
      this.error = 'Произошла ошибка при загрузке данных';
      console.error(err);
    }
  });
                  </pre>
                </div>
              </div>
            </div>
            
            <div class="pitfall">
              <h4>3. Забытая очистка при размонтировании</h4>
              <div class="pitfall-content">
                <div class="wrong-way">
                  <div class="title">❌ Неправильно</div>
                  <pre>
export default {
  mounted() {
    this.fetchData();
  },
  // Компонент размонтируется, но запрос продолжает выполняться
  methods: {
    fetchData() {
      const controller = new AbortController();
      fetch('/api/data', { signal: controller.signal })
        .then(/* ... */)
        .catch(/* ... */);
    }
  }
}
                  </pre>
                </div>
                
                <div class="right-way">
                  <div class="title">✅ Правильно</div>
                  <pre>
export default {
  data() {
    return {
      controller: null
    }
  },
  mounted() {
    this.fetchData();
  },
  beforeUnmount() {
    // Отменяем запрос при размонтировании
    if (this.controller) {
      this.controller.abort();
    }
  },
  methods: {
    fetchData() {
      this.controller = new AbortController();
      fetch('/api/data', { signal: this.controller.signal })
        .then(/* ... */)
        .catch(/* ... */);
    }
  }
}
                  </pre>
                </div>
              </div>
            </div>
            
            <div class="pitfall">
              <h4>4. Работа с Axios</h4>
              <div class="pitfall-content">
                <div class="wrong-way">
                  <div class="title">❌ Неправильно</div>
                  <pre>
// Нельзя просто передать signal в axios
axios.get('/api/data', { signal: controller.signal })
                  </pre>
                </div>
                
                <div class="right-way">
                  <div class="title">✅ Правильно</div>
                  <pre>
// Для axios нужно использовать CancelToken или с версии 0.22.0 параметр signal
import axios from 'axios';

// Axios 0.22.0+
const controller = new AbortController();
axios.get('/api/data', {
  signal: controller.signal
});

// Более старые версии axios
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/api/data', {
  cancelToken: source.token
});

// Отмена
source.cancel('Операция отменена пользователем.');
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Реальные сценарии использования -->
        <div v-if="activeTab === 'scenarios'" class="tab-pane">
          <h3>Реальные сценарии использования</h3>
          
          <div class="scenarios-list" >
            <div class="scenario">
              <h4>1. Поисковые автоподсказки</h4>
              <div class="scenario-content" >
                <p >
                  Когда пользователь быстро вводит запрос в поисковое поле, каждое нажатие клавиши может 
                  вызывать новый запрос. AbortController позволяет отменять предыдущие запросы, когда 
                  пользователь продолжает печатать, оставляя только последний актуальный запрос.
                </p>
                <div class="scenario-illustration">
                  <div class="search-demo">
                    <input 
                      type="text" 
                      v-model="searchText" 
                      placeholder="Введите запрос..." 
                      class="search-input"
                    />
                    <div class="search-info">
                      <div v-if="searchActive">
                        <span class="search-status">
                          {{ searchAborted ? 'Запрос отменен' : 'Поиск...' }}
                        </span>
                      </div>
                      <div v-if="searchResults.length > 0" class="search-results">
                        <div v-for="(result, index) in searchResults" :key="index" class="search-result-item" >
                          {{ result }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="scenario">
              <h4>2. Переход между страницами</h4>
              <div class="scenario-content">
                <p>
                  Когда пользователь переходит с одной страницы на другую до завершения загрузки данных, 
                  можно отменить незавершенные запросы, чтобы избежать ненужной нагрузки на сервер и 
                  потенциальных конфликтов состояния в клиентском приложении.
                </p>
                <div class="code-block">
                  <pre>
// В родительском компоненте маршрутизатора
import { onBeforeRouteLeave } from 'vue-router';

export default {
  setup() {
    const controller = ref(null);
    
    const fetchData = async () => {
      controller.value = new AbortController();
      try {
        const response = await fetch('/api/data', { 
          signal: controller.value.signal 
        });
        // Обработка ответа...
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      }
    };
    
    // Хук Vue Router для отмены при смене маршрута
    onBeforeRouteLeave((to, from, next) => {
      if (controller.value) {
        controller.value.abort();
      }
      next();
    });
    
    return { fetchData };
  }
}
                  </pre>
                </div>
              </div>
            </div>
            
            <div class="scenario">
              <h4>3. Запросы с таймаутом</h4>
              <div class="scenario-content">
                <p>
                  AbortController можно использовать для реализации таймаута запроса, отменяя запрос, 
                  если он занимает слишком много времени.
                </p>
                <div class="code-block">
                  <pre>
function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const { signal } = controller;
  
  // Создаем таймер для отмены
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);
  
  // Объединяем пользовательский signal (если есть) с нашим
  const userSignal = options.signal;
  let combinedSignal = signal;
  
  if (userSignal) {
    // Если пользователь отменяет, тоже отменяем
    userSignal.addEventListener('abort', () => controller.abort());
    
    // Проверяем, не отменен ли уже пользовательский signal
    if (userSignal.aborted) {
      controller.abort();
    }
  }
  
  return fetch(url, { ...options, signal: combinedSignal })
    .finally(() => {
      clearTimeout(timeoutId);
    });
}

// Использование
try {
  const response = await fetchWithTimeout('/api/data', {}, 3000);
  const data = await response.json();
} catch (err) {
  if (err.name === 'AbortError') {
    console.log('Запрос отменен по таймауту или вручную');
  } else {
    console.error('Ошибка запроса:', err);
  }
}
                  </pre>
                </div>
              </div>
            </div>
            
            <div class="scenario">
              <h4>4. Долгие вычисления в Worker</h4>
              <div class="scenario-content">
                <p>
                  AbortController можно использовать не только с fetch, но и с другими API, 
                  которые поддерживают сигналы, например WebWorker API.
                </p>
                <div class="code-block">
                  <pre>
// В основном потоке
const controller = new AbortController();
const { signal } = controller;

// Передаем сигнал в Worker
worker.postMessage({ 
  type: 'START_CALCULATION', 
  data: largeArray,
  // Преобразуем сигнал в transferable объект
  // (в реальности нужно использовать MessageChannel)
  aborted: signal.aborted
});

// Подписываемся на событие abort
signal.addEventListener('abort', () => {
  worker.postMessage({ type: 'ABORT_CALCULATION' });
});

// В Worker
self.addEventListener('message', (event) => {
  const { type, data, aborted } = event.data;
  
  if (type === 'START_CALCULATION') {
    // Проверяем, не отменено ли уже
    if (aborted) {
      self.postMessage({ type: 'CALCULATION_ABORTED' });
      return;
    }
    
    // Начинаем вычисления
    startHeavyCalculation(data);
  } else if (type === 'ABORT_CALCULATION') {
    // Прерываем выполнение вычислений
    abortCalculation();
  }
});
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Алгоритм использования -->
        <div v-if="activeTab === 'algorithm'" class="tab-pane">
          <h3>Алгоритм использования AbortController</h3>
          
          <div class="algorithm-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Создайте экземпляр AbortController</h4>
                <pre>const controller = new AbortController();</pre>
                <p>Создавайте новый экземпляр для каждого запроса или группы связанных запросов, которые должны быть отменены вместе.</p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Получите сигнал из контроллера</h4>
                <pre>const { signal } = controller;</pre>
                <p>Signal — это объект, который будет использоваться API для отслеживания состояния отмены.</p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Передайте сигнал в fetch или другой API</h4>
                <pre>fetch(url, { signal })</pre>
                <p>API будет отслеживать состояние этого сигнала и отменит операцию, когда сигнал сообщит об отмене.</p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>Определите момент для отмены</h4>
                <p>Решите, когда вы хотите отменить запрос:</p>
                <ul>
                  <li>При размонтировании компонента (в <code>beforeUnmount</code>)</li>
                  <li>При новом запросе, отменяя предыдущий</li>
                  <li>По таймауту</li>
                  <li>По действию пользователя (нажатие на кнопку "Отмена")</li>
                </ul>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">5</div>
              <div class="step-content">
                <h4>Вызовите метод abort()</h4>
                <pre>controller.abort();</pre>
                <p>Это отправит сигнал всем операциям, которые используют этот signal, что они должны быть отменены.</p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">6</div>
              <div class="step-content">
                <h4>Обработайте ошибку AbortError</h4>
                <pre>
try {
  const response = await fetch(url, { signal });
  const data = await response.json();
  // Обработка данных
} catch (err) {
  if (err.name === 'AbortError') {
    console.log('Запрос был отменен');
    // Не показываем ошибку пользователю
  } else {
    // Обрабатываем реальные ошибки
    console.error('Ошибка запроса:', err);
  }
}
                </pre>
                <p>При отмене запроса генерируется ошибка с именем <code>AbortError</code>, которую нужно корректно обработать.</p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">7</div>
              <div class="step-content">
                <h4>Очистите ресурсы</h4>
                <p>Убедитесь, что вы очищаете ссылки на контроллер после использования, особенно в компонентах с длительным временем жизни.</p>
                <pre>
// После завершения или отмены
controller = null;
                </pre>
              </div>
            </div>
          </div>
          
          <div class="algorithm-diagram">
            <h4>Схема работы AbortController</h4>
            <div class="diagram">
              <div class="diagram-step ds-create">
                <div class="ds-title">Создание</div>
                <div class="ds-content">new AbortController()</div>
              </div>
              <div class="diagram-arrow">→</div>
              <div class="diagram-step ds-signal">
                <div class="ds-title">Получение сигнала</div>
                <div class="ds-content">controller.signal</div>
              </div>
              <div class="diagram-arrow">→</div>
              <div class="diagram-step ds-fetch">
                <div class="ds-title">Использование</div>
                <div class="ds-content">fetch(url, { signal })</div>
              </div>
              <div class="diagram-arrow">→</div>
              <div class="diagram-fork">
                <div class="diagram-branch">
                  <div class="diagram-step ds-abort">
                    <div class="ds-title">Отмена</div>
                    <div class="ds-content">controller.abort()</div>
                  </div>
                  <div class="diagram-arrow">→</div>
                  <div class="diagram-step ds-error">
                    <div class="ds-title">Обработка ошибки</div>
                    <div class="ds-content">catch(AbortError)</div>
                  </div>
                </div>
                <div class="diagram-branch">
                  <div class="diagram-step ds-complete">
                    <div class="ds-title">Завершение</div>
                    <div class="ds-content">Запрос выполнен</div>
                  </div>
                  <div class="diagram-arrow">→</div>
                  <div class="diagram-step ds-process">
                    <div class="ds-title">Обработка ответа</div>
                    <div class="ds-content">response.json()</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="final-notes">
      <h2>Преимущества использования AbortController</h2>
      <ul>
        <li>Повышает отзывчивость интерфейса, отменяя ненужные запросы</li>
        <li>Экономит ресурсы сервера, предотвращая выполнение запросов, результаты которых не будут использованы</li>
        <li>Снижает риск состояния гонки, когда более старые запросы могут перезаписать результаты более новых</li>
        <li>Стандартизированный API, поддерживаемый всеми современными браузерами</li>
        <li>Может использоваться с различными API, не только с fetch</li>
      </ul>
      
      <h2>Поддержка браузерами</h2>
      <p>
        AbortController поддерживается всеми современными браузерами, включая Chrome, Firefox, Safari, Edge.
        Для старых браузеров можно использовать полифиллы или альтернативные подходы к отмене запросов.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// Состояние вкладок
const tabs = [
  { id: 'basics', title: 'Основы' },
  { id: 'practice', title: 'Практика' },
  { id: 'pitfalls', title: 'Подводные камни' },
  { id: 'scenarios', title: 'Реальные сценарии' },
  { id: 'algorithm', title: 'Алгоритм' }
];
const activeTab = ref('basics');

// Состояние для анимации
const isAnimating = ref(false);
const animationStep = ref(0);
const isAborted = ref(false);
const isCompleted = ref(false);
const animationLogs = ref([]);

let animationTimer = null;

function startAnimation() {
  resetAnimation();
  isAnimating.value = true;
  animationLogs.value.push('Создан AbortController');
  
  animationTimer = setTimeout(() => {
    animationStep.value = 1;
    animationLogs.value.push('Получен signal из controller');
    
    animationTimer = setTimeout(() => {
      animationStep.value = 2;
      animationLogs.value.push('Сигнал готов для использования');
      
      animationTimer = setTimeout(() => {
        animationStep.value = 3;
        animationLogs.value.push('Запрос отправлен на сервер с сигналом');
        
        // Если запрос не отменен, завершаем его через 5 секунд
        animationTimer = setTimeout(() => {
          if (!isAborted.value) {
            isCompleted.value = true;
            animationLogs.value.push('Запрос успешно завершен');
            isAnimating.value = false;
          }
        }, 5000);
      }, 1000);
    }, 1000);
  }, 1000);
}

function abortRequest() {
  if (!isAnimating.value || isAborted.value) return;
  
  isAborted.value = true;
  animationLogs.value.push('Вызван controller.abort()');
  animationLogs.value.push('Запрос отменен, генерируется AbortError');
  
  // Останавливаем анимацию через короткую задержку
  setTimeout(() => {
    isAnimating.value = false;
  }, 500);
}

function resetAnimation() {
  clearTimeout(animationTimer);
  animationStep.value = 0;
  isAnimating.value = false;
  isAborted.value = false;
  isCompleted.value = false;
  animationLogs.value = [];
}

// Демонстрация для реальных сценариев
const searchText = ref('');
const searchActive = ref(false);
const searchAborted = ref(false);
const searchResults = ref([]);
let searchController = null;
let searchTimeout = null;

watch(searchText, (newValue) => {
  // Отмена предыдущего таймера для debounce
  clearTimeout(searchTimeout);
  
  // Отмена предыдущего запроса
  if (searchController) {
    searchController.abort();
    searchAborted.value = true;
  }
  
  if (!newValue.trim()) {
    searchResults.value = [];
    searchActive.value = false;
    return;
  }
  
  // Задержка перед запросом для демонстрации debounce
  searchTimeout = setTimeout(() => {
    performSearch(newValue);
  }, 300);
});

function performSearch(query) {
  searchController = new AbortController();
  searchActive.value = true;
  searchAborted.value = false;
  
  // Имитация запроса
  setTimeout(() => {
    if (!searchController.signal.aborted) {
      searchResults.value = [
        `Результат 1 для "${query}"`,
        `Результат 2 для "${query}"`,
        `Результат 3 для "${query}"`
      ];
      searchActive.value = false;
    }
  }, 1500);
}
</script>

<style>
.abort-controller-demo {
  font-family: Arial, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  color: #000;
  background-color: #fff;
}

h1, h2, h3, h4 {
  color: #000;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
}

h2 {
  font-size: 24px;
  margin-top: 30px;
  margin-bottom: 15px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

h3 {
  font-size: 20px;
  margin-top: 25px;
  margin-bottom: 15px;
}

h4 {
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
}

p {
  line-height: 1.6;
  margin-bottom: 15px;
}

code {
  background-color: #f5f5f5;
  padding: 2px 5px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.9em;
}

pre {
  background-color: #f8f8f8;
  color: #000;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  overflow-x: auto;
  font-family: monospace;
  line-height: 1.4;
  font-size: 14px;
  margin: 15px 0;
}

.intro-section {
  margin-bottom: 30px;
}

/* Стили для вкладок */
.tabs-container {
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 20px;
  overflow: hidden;
}

.tabs {
  display: flex;
  overflow-x: auto;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.tab-button {
  padding: 12px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  white-space: nowrap;
  transition: background-color 0.3s;
  color: #000;
}

.tab-button:hover {
  background-color: #e0e0e0;
  color: #000;
}

.tab-button.active {
  background-color: #fff;
  font-weight: bold;
  border-bottom: 3px solid #4285f4;
  color: #000;
}

.tab-content {
  padding: 20px;
  background-color: #fff;
}

.tab-pane {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Стили для анимации */
.animation-container {
  margin: 30px 0;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  border: 1px solid #eee;
}

.animation-title {
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 18px;
}

.animation-controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.animation-controls button {
  padding: 8px 15px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.animation-controls button:hover:not(:disabled) {
  background-color: #2b6ed9;
  color: white;
}

.animation-controls button:disabled {
  background-color: #b0c0d9;
  color: white;
  cursor: not-allowed;
}

.animation-scene {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0;
  min-height: 200px;
}

.client-side, .server-side {
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-weight: bold;
  margin-bottom: 10px;
}

.controller-object {
  width: 140px;
  height: 80px;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  transition: all 0.5s ease;
  position: relative;
}

.controller-object.active {
  opacity: 1;
  background-color: #e3f2fd;
  border-color: #2196f3;
}

.signal-object {
  position: absolute;
  bottom: -20px;
  width: 80px;
  height: 30px;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.5s ease;
}

.signal-object.active {
  opacity: 1;
  transform: translateY(0);
  background-color: #e8f5e9;
  border-color: #4caf50;
}

.network {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 120px;
}

.request {
  width: 80%;
  height: 6px;
  background-color: #ddd;
  border-radius: 3px;
  position: relative;
  opacity: 0;
  transition: all 0.5s ease;
}

.request.active {
  opacity: 1;
  background-color: #2196f3;
  animation: progressAnimation 5s linear forwards;
}

.request.aborted {
  animation-play-state: paused;
  background-color: #f44336;
}

@keyframes progressAnimation {
  0% { width: 0; }
  100% { width: 100%; }
}

.request-text {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  white-space: nowrap;
}

.abort-action {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f44336;
  color: black;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  opacity: 0;
  transition: all 0.5s ease;
}

.abort-action.active {
  opacity: 1;
}

.server-object {
  width: 140px;
  height: 80px;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  transition: all 0.5s ease;
  position: relative;
}

.server-object.active {
  opacity: 1;
  background-color: #fff3e0;
  border-color: #ff9800;
}

.server-object.processing {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.server-object.completed {
  background-color: #e8f5e9;
  border-color: #4caf50;
}

.response {
  position: absolute;
  bottom: -20px;
  width: 80px;
  height: 30px;
  background-color: #e8f5e9;
  border: 1px solid #4caf50;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  animation: fadeSlideUp 0.5s ease forwards;
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animation-log {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
  max-height: 150px;
  overflow-y: auto;
}

.log-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.log-item {
  padding: 5px;
  border-bottom: 1px solid #eee;
  font-family: monospace;
  animation: fadeIn 0.3s ease;
}

/* Стили для объяснений */
.code-explanation {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
}

.code-block {
  flex: 1;
  min-width: 300px;
}

.explanation {
  flex: 1;
  min-width: 300px;
}

.explanation ol {
  padding-left: 20px;
}

.explanation li {
  margin-bottom: 10px;
}

/* Стили для подводных камней */
.pitfalls-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 20px 0;
}

.pitfall {
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.pitfall h4 {
  background-color: #f5f5f5;
  margin: 0;
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

.pitfall-content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 15px;
}

.wrong-way, .right-way {
  flex: 1;
  min-width: 300px;
}

.wrong-way .title, .right-way .title {
  font-weight: bold;
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  display: inline-block;
}

.wrong-way .title {
  background-color: #ffebee;
  color: black;
}

.right-way .title {
  background-color: #e8f5e9;
  color: black;
}

/* Стили для реальных сценариев */
.scenarios-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 20px 0;
}

.scenario {
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.scenario h4 {
  background-color: #f5f5f5;
  margin: 0;
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

.scenario-content {
  padding: 15px;
}

.scenario-illustration {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.search-demo {
  max-width: 400px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}

.search-info {
  min-height: 100px;
  padding: 10px;
}

.search-status {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #e3f2fd;
  margin-bottom: 10px;
}

.search-results {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.search-result-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  animation: fadeIn 0.3s ease;
}

.search-result-item:last-child {
  border-bottom: none;
}

/* Стили для алгоритма */
.algorithm-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
}

.step {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #4285f4;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h4 {
  margin-top: 0;
  margin-bottom: 10px;
}

.step-content ul {
  padding-left: 20px;
}

.step-content li {
  margin-bottom: 5px;
}

.algorithm-diagram {
  margin: 30px 0;
}

.diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.diagram-step {
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.ds-title {
  background-color: #f5f5f5;
  padding: 5px 10px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.ds-content {
  padding: 10px;
  text-align: center;
  font-family: monospace;
}

.diagram-arrow {
  font-size: 20px;
  color: #757575;
}

.diagram-fork {
  display: flex;
  gap: 30px;
}

.diagram-branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.ds-create { background-color: #e3f2fd; }
.ds-signal { background-color: #e8f5e9; }
.ds-fetch { background-color: #fff3e0; }
.ds-abort { background-color: #ffebee; }
.ds-error { background-color: #fce4ec; }
.ds-complete { background-color: #e8f5e9; }
.ds-process { background-color: #f1f8e9; }

/* Итоговые заметки */
.final-notes {
  margin-top: 40px;
}

.final-notes ul {
  padding-left: 20px;
}

.final-notes li {
  margin-bottom: 10px;
  line-height: 1.6;
}

/* Медиа-запросы для адаптивности */
@media (max-width: 768px) {
  .code-explanation {
    flex-direction: column;
  }
  
  .pitfall-content {
    flex-direction: column;
  }
  
  .animation-scene {
    flex-direction: column;
    gap: 30px;
  }
  
  .animation-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .network {
    width: 100%;
    margin: 20px 0;
  }
  
  .diagram-fork {
    flex-direction: column;
    gap: 15px;
  }
}

@media (max-width: 576px) {
  .tabs {
    flex-wrap: wrap;
  }
  
  .tab-button {
    flex-grow: 1;
    text-align: center;
  }
}
</style>