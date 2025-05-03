<template>
    <div class="debounce-explorer">
      <h1 class="title">Функция Debounce: детальное изучение</h1>
      
      <div class="introduction">
        <p>
          Функция <code>debounce</code> — это важная техника оптимизации в JavaScript, которая позволяет 
          контролировать частоту выполнения функций. Особенно полезна при обработке событий, которые могут 
          происходить очень часто (например, ввод пользователя, скролл, ресайз).
        </p>
      </div>
      
      <div class="sections-navigation">
        <button 
          v-for="(section, index) in sections" 
          :key="section.id"
          :class="{ active: activeSection === index }"
          @click="activeSection = index"
        >
          {{ section.title }}
        </button>
      </div>
      
      <!-- Раздел с определением -->
      <div v-if="activeSection === 0" class="section definition-section">
        <h2>Что такое Debounce</h2>
        
        <div class="definition-block">
          <p>
            <strong>Debounce</strong> — это функция-обёртка, которая откладывает вызов переданной функции до тех пор, 
            пока не пройдёт определённое количество времени с момента последнего вызова.
          </p>
          
          <div class="key-points">
            <div class="key-point">
              <div class="icon">🔄</div>
              <div class="text">
                <strong>Откладывает выполнение</strong> функции до тех пор, пока не наступит пауза в вызовах
              </div>
            </div>
            
            <div class="key-point">
              <div class="icon">⏱️</div>
              <div class="text">
                <strong>Сбрасывает таймер</strong> при каждом новом вызове
              </div>
            </div>
            
            <div class="key-point">
              <div class="icon">✅</div>
              <div class="text">
                <strong>Выполняет функцию только один раз</strong> после указанной задержки бездействия
              </div>
            </div>
          </div>
        </div>
        
        <div class="real-world-example">
          <h3>Аналогия из реальной жизни</h3>
          <p>
            Представьте, что вы в лифте, и хотите нажать кнопку закрытия дверей. Но каждый раз, 
            когда кто-то заходит в лифт, двери остаются открытыми. Только когда пройдёт определённое 
            время без новых пассажиров, двери наконец закроются.
          </p>
          <p>
            Это и есть <code>debounce</code>: функция не выполняется, пока не пройдёт указанный 
            период времени без новых вызовов.
          </p>
        </div>
      </div>
      
      <!-- Раздел с реализацией -->
      <div v-if="activeSection === 1" class="section implementation-section">
        <h2>Реализация Debounce</h2>
        
        <div class="code-explanation">
          <p>Вот полная реализация функции <code>debounce</code>:</p>
          
          <div class="code-container">
            <pre><code class="javascript">const debounce = (cb, ms) => {
    let timeout; // Хранит ID таймера
    
    return function(...args) {
      clearTimeout(timeout); // Очищаем предыдущий таймер при каждом вызове
      
      // Устанавливаем новый таймер
      timeout = setTimeout(() => {
        cb.apply(this, args); // Вызываем оригинальную функцию с правильным контекстом и аргументами
      }, ms);
    };
  };</code></pre>
          </div>
          
          <h3>Пошаговое объяснение алгоритма:</h3>
          
          <div class="algorithm-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <p>
                  <strong>Создаём замыкание</strong> — функция debounce возвращает новую функцию,
                  которая замыкает в себе переменную <code>timeout</code>.
                </p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <p>
                  <strong>Очищаем предыдущий таймер</strong> — при каждом вызове функции 
                  мы сбрасываем предыдущий таймер с помощью <code>clearTimeout</code>.
                </p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <p>
                  <strong>Устанавливаем новый таймер</strong> — создаём новый таймер,
                  который вызовет оригинальную функцию через указанное время.
                </p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <p>
                  <strong>Сохраняем контекст и аргументы</strong> — используем <code>apply</code>,
                  чтобы передать контекст <code>this</code> и все аргументы в оригинальную функцию.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="usage-example">
          <h3>Пример использования:</h3>
          
          <div class="code-container">
            <pre><code class="javascript">// Создаём функцию с задержкой 500 мс
  const debouncedLog = debounce((value) => console.log(value), 500);
  
  // Выполняем несколько вызовов подряд
  debouncedLog(1);     // Не выполнится
  debouncedLog(2);     // Не выполнится
  debouncedLog(777999); // Выполнится только этот вызов через 500 мс
  
  // В консоли будет только одно значение: 777999</code></pre>
          </div>
        </div>
      </div>
      
      <!-- Раздел с демонстрацией -->
      <div v-if="activeSection === 2" class="section demo-section">
        <h2>Интерактивная демонстрация</h2>
        
        <div class="visualization">
          <div class="control-panel">
            <div class="input-group">
              <label for="debounce-delay">Задержка (мс):</label>
              <input 
                id="debounce-delay"
                type="number" 
                v-model.number="debounceDelay" 
                min="100" 
                max="2000"
                step="100"
              >
            </div>
            
            <div class="button-group">
              <button 
                class="trigger-button"
                @click="triggerDebounce"
                :disabled="isAnimating"
              >
                Вызвать функцию
              </button>
              
              <button 
                class="reset-button"
                @click="resetDemo"
                :disabled="isAnimating || callLog.length === 0"
              >
                Сбросить
              </button>
            </div>
          </div>
          
          <div class="visualization-container">
            <div class="timeline">
              <div class="axis">
                <div class="tick" v-for="i in 10" :key="i">
                  <div class="tick-line"></div>
                  <div class="tick-label">{{ i * 100 }}мс</div>
                </div>
              </div>
              
              <div class="events">
                <div 
                  v-for="(call, index) in callLog" 
                  :key="index"
                  class="event"
                  :class="{ 'executed': call.executed }"
                  :style="{ left: `${call.time * 100 / maxTime}%` }"
                >
                  <div class="event-marker"></div>
                  <div class="event-label">{{ call.value }}</div>
                  <div 
                    v-if="call.timeoutId && !call.executed && !call.cancelled"
                    class="timeout-indicator"
                    :style="{ width: `${Math.min(100, (debounceDelay / 10))}px` }"
                  ></div>
                  <div v-if="call.cancelled" class="cancel-indicator">✕</div>
                  <div v-if="call.executed" class="execute-indicator">✓</div>
                </div>
                
                <div 
                  v-if="activeTimeout"
                  class="active-timeout"
                  :style="{ 
                    left: `${lastCallTime * 100 / maxTime}%`, 
                    width: `${Math.min(100, ((debounceDelay / 10) * (1 - timeoutProgress)))}px` 
                  }"
                ></div>
              </div>
            </div>
            
            <div class="execution-log">
              <h3>Результат выполнения:</h3>
              <div class="log-container">
                <div 
                  v-for="(result, index) in executionResults" 
                  :key="index"
                  class="log-item"
                >
                  console.log({{ result.value }}) в {{ result.time }}мс
                </div>
                <div v-if="executionResults.length === 0" class="empty-log">
                  Пока нет выполненных функций
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="explanation-text">
          <p>
            <strong>Как работает эта демонстрация:</strong>
          </p>
          <ul>
            <li>Каждый раз, когда вы нажимаете кнопку "Вызвать функцию", мы добавляем новый вызов на временную шкалу</li>
            <li>Синяя полоса представляет текущий активный таймер debounce</li>
            <li>Когда мы вызываем функцию снова до истечения таймера, предыдущий таймер отменяется (красный крестик)</li>
            <li>Только последний вызов фактически выполняется (зеленая галочка) после истечения времени ожидания</li>
          </ul>
        </div>
      </div>
      
      <!-- Раздел с применением -->
      <div v-if="activeSection === 3" class="section applications-section">
        <h2>Применение в реальных проектах</h2>
        
        <div class="applications-grid">
          <div class="application-card">
            <div class="card-header">
              <div class="card-icon">🔍</div>
              <h3>Поиск по мере ввода</h3>
            </div>
            <div class="card-content">
              <p>
                Отправка запроса на сервер только после того, как пользователь перестал печатать
                на несколько миллисекунд, а не при каждом нажатии клавиши.
              </p>
              <div class="code-snippet">
                <pre><code class="javascript">const searchInput = document.getElementById('search');
  const debouncedSearch = debounce((value) => {
    // Запрос к API только после паузы
    fetch(`/api/search?q=${value}`);
  }, 300);
  
  searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
  });</code></pre>
              </div>
            </div>
          </div>
          
          <div class="application-card">
            <div class="card-header">
              <div class="card-icon">📱</div>
              <h3>Обработка resize событий</h3>
            </div>
            <div class="card-content">
              <p>
                Перерасчёт макета или перерисовка компонентов только после того,
                как пользователь закончил изменять размер окна.
              </p>
              <div class="code-snippet">
                <pre><code class="javascript">const handleResize = debounce(() => {
    // Тяжёлая операция перерасчёта макета
    recalculateLayout();
  }, 200);
  
  window.addEventListener('resize', handleResize);</code></pre>
              </div>
            </div>
          </div>
          
          <div class="application-card">
            <div class="card-header">
              <div class="card-icon">📜</div>
              <h3>Обработка скролла</h3>
            </div>
            <div class="card-content">
              <p>
                Выполнение действий только когда пользователь временно прекратил прокрутку,
                например, для загрузки контента "бесконечного скролла".
              </p>
              <div class="code-snippet">
                <pre><code class="javascript">const handleScroll = debounce(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    // Если прокрутили до конца - загрузить ещё контент
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      loadMoreContent();
    }
  }, 150);
  
  window.addEventListener('scroll', handleScroll);</code></pre>
              </div>
            </div>
          </div>
          
          <div class="application-card">
            <div class="card-header">
              <div class="card-icon">💾</div>
              <h3>Автосохранение форм</h3>
            </div>
            <div class="card-content">
              <p>
                Сохранение формы или документа только после того, как пользователь
                перестал вносить изменения на некоторое время.
              </p>
              <div class="code-snippet">
                <pre><code class="javascript">const editor = document.getElementById('editor');
  const debouncedSave = debounce((content) => {
    localStorage.setItem('draft', content);
    showSavedIndicator();
  }, 500);
  
  editor.addEventListener('input', (e) => {
    debouncedSave(e.target.value);
  });</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Раздел с подводными камнями -->
      <div v-if="activeSection === 4" class="section pitfalls-section">
        <h2>Подводные камни</h2>
        
        <div class="pitfalls-list">
          <div class="pitfall">
            <h3><span class="pitfall-icon">⚠️</span> Потеря контекста this</h3>
            <div class="pitfall-content">
              <p>Если debounce используется с методами объекта, важно сохранить контекст <code>this</code>.</p>
              
              <div class="wrong-right">
                <div class="wrong">
                  <h4>❌ Неправильно</h4>
                  <pre><code class="javascript">class SearchComponent {
    constructor() {
      this.results = [];
      // Потеря контекста this
      this.debouncedSearch = debounce(this.search, 300);
    }
    
    search(query) {
      // this не указывает на экземпляр SearchComponent
      // this.results будет undefined
      this.results = performSearch(query);
    }
  }</code></pre>
                </div>
                
                <div class="right">
                  <h4>✅ Правильно</h4>
                  <pre><code class="javascript">class SearchComponent {
    constructor() {
      this.results = [];
      // Сохраняем контекст this
      this.debouncedSearch = debounce(
        (query) => this.search(query), 300
      );
      // или
      this.debouncedSearch = debounce(
        this.search.bind(this), 300
      );
    }
    
    search(query) {
      this.results = performSearch(query);
    }
  }</code></pre>
                </div>
              </div>
            </div>
          </div>
          
          <div class="pitfall">
            <h3><span class="pitfall-icon">⚠️</span> Игнорирование возвращаемого значения</h3>
            <div class="pitfall-content">
              <p>
                Функция, обёрнутая в debounce, выполняется асинхронно, поэтому нельзя напрямую 
                использовать её возвращаемое значение.
              </p>
              
              <div class="wrong-right">
                <div class="wrong">
                  <h4>❌ Неправильно</h4>
                  <pre><code class="javascript">const calculate = (a, b) => a + b;
  const debouncedCalc = debounce(calculate, 300);
  
  // ❌ Всегда будет undefined
  const result = debouncedCalc(5, 10);</code></pre>
                </div>
                
                <div class="right">
                  <h4>✅ Правильно</h4>
                  <pre><code class="javascript">const calculate = (a, b) => a + b;
  const debouncedCalc = debounce((a, b) => {
    const result = calculate(a, b);
    console.log(result); // Или другая обработка
  }, 300);
  
  debouncedCalc(5, 10); // Выведет 15 через 300 мс</code></pre>
                </div>
              </div>
            </div>
          </div>
          
          <div class="pitfall">
            <h3><span class="pitfall-icon">⚠️</span> Отсутствие immediate вызова</h3>
            <div class="pitfall-content">
              <p>
                Стандартная реализация debounce всегда откладывает выполнение функции, что не всегда удобно.
                Иногда полезно добавить опцию для немедленного выполнения при первом вызове.
              </p>
              
              <div class="code-container">
                <pre><code class="javascript">const debounce = (cb, ms, immediate = false) => {
    let timeout;
    
    return function(...args) {
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      
      timeout = setTimeout(() => {
        timeout = null;
        if (!immediate) cb.apply(this, args);
      }, ms);
      
      if (callNow) cb.apply(this, args);
    };
  };</code></pre>
              </div>
            </div>
          </div>
          
          <div class="pitfall">
            <h3><span class="pitfall-icon">⚠️</span> Отмена последнего вызова</h3>
            <div class="pitfall-content">
              <p>
                Если нужно отменить отложенный вызов (например, при размонтировании компонента),
                стандартная реализация debounce не предоставляет такой возможности.
              </p>
              
              <div class="code-container">
                <pre><code class="javascript">const debounce = (cb, ms) => {
    let timeout;
    
    const debouncedFn = function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb.apply(this, args);
      }, ms);
    };
    
    // Добавляем метод для отмены
    debouncedFn.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };
    
    return debouncedFn;
  };</code></pre>
              </div>
              
              <p>
                Использование:
              </p>
              
              <div class="code-snippet">
                <pre><code class="javascript">const debouncedSearch = debounce(search, 300);
  
  // В Vue компоненте
  onUnmounted(() => {
    debouncedSearch.cancel(); // Отменяем отложенный поиск при размонтировании
  });</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Раздел с сравнением Debounce и Throttle -->
      <div v-if="activeSection === 5" class="section vs-throttle-section">
        <h2>Debounce vs Throttle</h2>
        
        <div class="comparison">
          <p>
            <code>Debounce</code> и <code>Throttle</code> — это две схожие техники оптимизации, но с разными
            подходами к ограничению частоты вызовов функции:
          </p>
          
          <div class="comparison-table">
            <div class="table-header">
              <div class="cell feature">Характеристика</div>
              <div class="cell debounce">Debounce</div>
              <div class="cell throttle">Throttle</div>
            </div>
            
            <div class="table-row">
              <div class="cell feature">Принцип работы</div>
              <div class="cell debounce">Откладывает выполнение до паузы в вызовах</div>
              <div class="cell throttle">Ограничивает частоту вызовов до X раз в Y миллисекунд</div>
            </div>
            
            <div class="table-row">
              <div class="cell feature">Когда срабатывает</div>
              <div class="cell debounce">После последнего вызова + задержка</div>
              <div class="cell throttle">Регулярно во время последовательности вызовов</div>
            </div>
            
            <div class="table-row">
              <div class="cell feature">Примеры использования</div>
              <div class="cell debounce">Поиск по мере ввода, автосохранение, изменение размера окна</div>
              <div class="cell throttle">Отслеживание скролла, обработка движения мыши, игровые механики</div>
            </div>
            
            <div class="table-row">
              <div class="cell feature">Лучше всего подходит для</div>
              <div class="cell debounce">Ситуаций, когда нужно реагировать только на конечный результат</div>
              <div class="cell throttle">Ситуаций, где нужно регулярно реагировать, но не на каждое событие</div>
            </div>
          </div>
          
          <div class="comparison-visualization">
            <div class="visualization-info">
              <div class="calls">
                <div class="call-marker"></div>
                <span>Вызовы функции</span>
              </div>
              <div class="executions">
                <div class="execution-marker debounce"></div>
                <span>Выполнение с debounce</span>
              </div>
              <div class="executions">
                <div class="execution-marker throttle"></div>
                <span>Выполнение с throttle</span>
              </div>
            </div>
            
            <div class="visualization-timeline">
              <div class="timeline-calls">
                <div class="timeline-call" v-for="pos in [10, 20, 30, 35, 50, 55, 85, 90]" :key="pos" :style="{ left: `${pos}%` }"></div>
              </div>
              <div class="timeline-executions debounce">
                <div class="timeline-execution" style="left: 65%"></div>
              </div>
              <div class="timeline-executions throttle">
                <div class="timeline-execution" v-for="pos in [10, 40, 70]" :key="pos" :style="{ left: `${pos}%` }"></div>
              </div>
            </div>
          </div>
          
          <div class="throttle-implementation">
            <h3>Реализация Throttle для сравнения:</h3>
            
            <div class="code-container">
              <pre><code class="javascript">const throttle = (cb, ms) => {
    let isThrottled = false;
    let savedArgs = null;
    let savedThis = null;
    
    function wrapper(...args) {
      if (isThrottled) {
        // Сохраняем аргументы и контекст последнего вызова
        savedArgs = args;
        savedThis = this;
        return;
      }
      
      // Вызываем функцию сразу
      cb.apply(this, args);
      
      // Устанавливаем флаг throttle
      isThrottled = true;
      
      // Через указанное время снимаем флаг
      setTimeout(() => {
        isThrottled = false;
        
        // Если были сохранённые вызовы, выполняем последний
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }
    
    return wrapper;
  };</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount} from 'vue';
  
  // Реализация функции debounce для демонстрации
  const _debounce = (cb, ms) => {
    let timeout;
    
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb.apply(this, args);
      }, ms);
    };
  };
  
  // Секции
  const sections = [
    { id: 'definition', title: 'Определение' },
    { id: 'implementation', title: 'Реализация' },
    { id: 'demo', title: 'Демонстрация' },
    { id: 'applications', title: 'Применение' },
    { id: 'pitfalls', title: 'Подводные камни' },
    { id: 'vs-throttle', title: 'Сравнение с Throttle' }
  ];
  
  // Состояние компонента
  const activeSection = ref(0);
  const debounceDelay = ref(500);
  const callLog = ref([]);
  const executionResults = ref([]);
  const isAnimating = ref(false);
  const activeTimeout = ref(null);
  const lastCallTime = ref(0);
  const timeoutProgress = ref(0);
  const maxTime = ref(1000); // Максимальное время для шкалы в мс
  let animationFrameId = null;
  let startTime = 0;
  
  // Счетчик для генерации уникальных значений
  let callCounter = 1;
  
  // Функция для вызова debounce в демонстрации
  const triggerDebounce = () => {
    const currentTime = Date.now() - startTime;
    const callValue = callCounter++;
    
    // Добавляем новый вызов в лог
    const newCall = { 
      value: callValue, 
      time: currentTime,
      executed: false,
      cancelled: false,
      timeoutId: callCounter
    };
    
    callLog.value.push(newCall);
    lastCallTime.value = currentTime;
    
    // Отменяем предыдущие вызовы, если они есть
    callLog.value.forEach(call => {
      if (!call.executed && !call.cancelled && call.timeoutId !== newCall.timeoutId) {
        call.cancelled = true;
      }
    });
    
    // Устанавливаем активный таймер
    isAnimating.value = true;
    activeTimeout.value = true;
    timeoutProgress.value = 0;
    
    // Запускаем анимацию
    const animate = () => {
      const now = Date.now() - startTime;
      const elapsed = now - currentTime;
      
      if (elapsed < debounceDelay.value) {
        timeoutProgress.value = elapsed / debounceDelay.value;
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Выполняем функцию после задержки
        executeCall(newCall, now);
        activeTimeout.value = false;
        isAnimating.value = false;
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    // Обновляем максимальное время для шкалы
    maxTime.value = Math.max(maxTime.value, currentTime + debounceDelay.value + 200);
  };
  
  // Функция для фактического выполнения вызова
  const executeCall = (call, executeTime) => {
    // Обновляем статус вызова
    call.executed = true;
    
    // Добавляем результат выполнения
    executionResults.value.push({
      value: call.value,
      time: executeTime
    });
  };
  
  // Сброс демонстрации
  const resetDemo = () => {
    callCounter = 1;
    callLog.value = [];
    executionResults.value = [];
    activeTimeout.value = false;
    timeoutProgress.value = 0;
    lastCallTime.value = 0;
    maxTime.value = 1000;
    startTime = Date.now();
    
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };
  
  // Инициализация
  onMounted(() => {
    startTime = Date.now();
  });
  
  // Очистка
  onBeforeUnmount(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });
  </script>
  
  <style scoped>
  .debounce-explorer {
    font-family: Arial, sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    color: #000000;
  }
  
  .title {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
    font-size: 2rem;
  }
  
  .introduction {
    margin-bottom: 30px;
    line-height: 1.6;
  }
  
  .sections-navigation {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 30px;
    justify-content: center;
  }
  
  .sections-navigation button {
    padding: 10px 20px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .sections-navigation button:hover {
    background-color: #e0e0e0;
  }
  
  .sections-navigation button.active {
    background-color: #3498db;
    color: white;
  }
  
  .section {
    margin-bottom: 40px;
    animation: fadeIn 0.4s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .section h2 {
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-bottom: 20px;
    color: #2c3e50;
  }
  
  /* Стили для секции определения */
  .definition-block {
    background-color: #f9f9f9;
    padding: 20px;
    border-left: 4px solid #3498db;
    margin-bottom: 20px;
    border-radius: 5px;
  }
  
  .key-points {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  }
  
  .key-point {
    display: flex;
    align-items: flex-start;
    gap: 15px;
  }
  
  .key-point .icon {
    font-size: 24px;
  }
  
  .real-world-example {
    background-color: #f2f9f4;
    padding: 20px;
    border-radius: 5px;
    border-left: 4px solid #2ecc71;
  }
  
  /* Стили для секции реализации */
  .code-container {
    background-color: #2d2d2d;
    border-radius: 5px;
    padding: 15px;
    margin: 15px 0;
    overflow-x: auto;
  }
  
  .code-container pre {
    margin: 0;
  }
  
  .code-container code {
    font-family: 'Courier New', monospace;
    color: #f8f8f2;
    line-height: 1.5;
  }
  
  .algorithm-steps {
    margin: 20px 0;
  }
  
  .step {
    display: flex;
    margin-bottom: 15px;
    align-items: flex-start;
  }
  
  .step-number {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: #3498db;
    color: white;
    border-radius: 50%;
    font-weight: bold;
    margin-right: 15px;
    flex-shrink: 0;
  }
  
  .usage-example {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 5px;
    margin-top: 30px;
    border-left: 4px solid #f39c12;
  }
  
  /* Стили для демонстрации */
  .visualization {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  .control-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .input-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .input-group label {
    font-weight: bold;
  }
  
  .input-group input {
    padding: 8px;
    width: 100px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
  }
  
  .trigger-button, .reset-button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .trigger-button {
    background-color: #3498db;
    color: white;
  }
  
  .reset-button {
    background-color: #e74c3c;
    color: white;
  }
  
  .trigger-button:hover {
    background-color: #2980b9;
  }
  
  .reset-button:hover {
    background-color: #c0392b;
  }
  
  .trigger-button:disabled, .reset-button:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
  
  .visualization-container {
    margin-top: 40px;
  }
  
  .timeline {
    position: relative;
    height: 150px;
    margin-bottom: 30px;
  }
  
  .axis {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
  }
  
  .tick {
    flex: 1;
    position: relative;
    height: 100%;
  }
  
  .tick-line {
    position: absolute;
    top: 0;
    bottom: 30px;
    width: 1px;
    background-color: #ddd;
    left: 0;
  }
  
  .tick-label {
    position: absolute;
    bottom: 0;
    left: -20px;
    font-size: 12px;
    color: #777;
  }
  
  .events {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
  }
  
  .event {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .event-marker {
    width: 12px;
    height: 12px;
    background-color: #3498db;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }
  
  .event-label {
    position: absolute;
    top: -30px;
    left: 0;
    transform: translateX(-50%);
    font-size: 12px;
    background-color: #3498db;
    color: white;
    padding: 3px 6px;
    border-radius: 3px;
  }
  
  .timeout-indicator {
    position: absolute;
    top: 0;
    left: 0;
    height: 4px;
    background-color: #3498db;
    transform: translateX(-1px);
  }
  
  .active-timeout {
    position: absolute;
    top: 50%;
    height: 4px;
    background-color: #3498db;
    transition: width 0.1s linear;
  }
  
  .cancel-indicator {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 14px;
    color: #e74c3c;
    transform: translate(-50%, -50%);
  }
  
  .execute-indicator {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 14px;
    color: #2ecc71;
    transform: translate(-50%, -50%);
  }
  
  .execution-log {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    margin-top: 20px;
  }
  
  .log-container {
    min-height: 100px;
    max-height: 200px;
    overflow-y: auto;
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 3px;
  }
  
  .log-item {
    padding: 5px 10px;
    border-bottom: 1px solid #eee;
    font-family: monospace;
  }
  
  .empty-log {
    color: #999;
    text-align: center;
    padding: 20px;
  }
  
  .explanation-text {
    margin-top: 30px;
  }
  
  .explanation-text ul {
    padding-left: 20px;
  }
  
  .explanation-text li {
    margin-bottom: 8px;
  }
  
  /* Стили для секции применения */
  .applications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .application-card {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .card-header {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #eee;
  }
  
  .card-icon {
    font-size: 24px;
  }
  
  .card-header h3 {
    margin: 0;
    color: #333;
  }
  
  .card-content {
    padding: 15px;
  }
  
  .code-snippet {
    background-color: #f8f9fa;
    padding: 10px;
    border-radius: 5px;
    border-left: 3px solid #3498db;
    margin-top: 10px;
    overflow-x: auto;
  }
  
  .code-snippet pre {
    margin: 0;
  }
  
  .code-snippet code {
    font-family: 'Courier New', monospace;
    color: #333;
    line-height: 1.4;
  }
  
  /* Стили для секции с подводными камнями */
  .pitfalls-list {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .pitfall {
    background-color: #f8f9fa;
    border-radius: 5px;
    padding: 20px;
    border-left: 4px solid #e74c3c;
  }
  
  .pitfall h3 {
    margin-top: 0;
    color: #e74c3c;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .pitfall-icon {
    font-size: 24px;
  }
  
  .wrong-right {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
  }
  
  @media (max-width: 768px) {
    .wrong-right {
      grid-template-columns: 1fr;
    }
  }
  
  .wrong, .right {
    padding: 15px;
    border-radius: 5px;
  }
  
  .wrong {
    background-color: #fff5f5;
    border-left: 3px solid #e74c3c;
  }
  
  .right {
    background-color: #f0fff4;
    border-left: 3px solid #2ecc71;
  }
  
  .wrong h4, .right h4 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  /* Стили для сравнения с throttle */
  .comparison {
    margin-top: 20px;
  }
  
  .comparison-table {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 1px;
    background-color: #ddd;
    margin: 20px 0;
    border-radius: 5px;
    overflow: hidden;
  }
  
  .cell {
    padding: 12px 15px;
    background-color: #fff;
  }
  
  .table-header .cell {
    font-weight: bold;
    background-color: #f5f5f5;
  }
  
  .cell.feature {
    font-weight: bold;
  }
  
  .cell.debounce {
    background-color: #ebf8ff;
  }
  
  .cell.throttle {
    background-color: #fff5f7;
  }
  
  .comparison-visualization {
    margin: 30px 0;
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 5px;
  }
  
  .visualization-info {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
  }
  
  .calls, .executions {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .call-marker {
    width: 10px;
    height: 10px;
    background-color: #666;
    border-radius: 50%;
  }
  
  .execution-marker {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  
  .execution-marker.debounce {
    background-color: #3498db;
  }
  
  .execution-marker.throttle {
    background-color: #e91e63;
  }
  
  .visualization-timeline {
    position: relative;
    height: 150px;
    background-color: #f0f0f0;
    border-radius: 5px;
    margin-top: 20px;
  }
  
  .timeline-calls {
    position: absolute;
    top: 30px;
    left: 0;
    width: 100%;
    height: 30px;
  }
  
  .timeline-call {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #666;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
  
  .timeline-executions {
    position: absolute;
    width: 100%;
    height: 30px;
  }
  
  .timeline-executions.debounce {
    top: 70px;
  }
  
  .timeline-executions.throttle {
    top: 110px;
  }
  
  .timeline-execution {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
  
  .timeline-executions.debounce .timeline-execution {
    background-color: #3498db;
  }
  
  .timeline-executions.throttle .timeline-execution {
    background-color: #e91e63;
  }
  
  .throttle-implementation {
    margin-top: 30px;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .applications-grid {
      grid-template-columns: 1fr;
    }
    
    .comparison-table {
      grid-template-columns: 1fr;
    }
    
    .table-header {
      display: none;
    }
    
    .cell {
      padding: 10px;
    }
    
    .cell.feature {
      background-color: #f5f5f5;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    
    .cell.feature::before {
      content: attr(data-label);
      font-weight: bold;
      display: block;
      margin-bottom: 5px;
    }
  }
  </style>