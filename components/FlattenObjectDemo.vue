<template>
    <div class="flatten-object-demo">
      <h1>Преобразование вложенных объектов в flat-структуру</h1>
      
      <div class="intro-section">
        <p>Часто в разработке приходится работать с глубоко вложенными объектами, которые удобно преобразовать в плоскую структуру. Это особенно полезно для хранения настроек, работы с формами и хранилищами данных.</p>
      </div>
      
      <div class="tabs">
        <button 
          v-for="(tab, index) in tabs" 
          :key="tab.id"
          :class="['tab-button', { active: activeTab === index }]"
          @click="activeTab = index"
        >
          {{ tab.name }}
        </button>
      </div>
      
      <div class="tab-content">
        <!-- Вкладка с алгоритмом -->
        <div v-if="activeTab === 0" class="algorithm-section">
          <h2>Алгоритм решения</h2>
          
          <div class="algorithm-explanation">
            <p>Чтобы преобразовать вложенный объект в плоскую структуру, нам нужно пройти по всем его свойствам и создать новые ключи с использованием пути к каждому значению.</p>
            
            <div class="algorithm-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-description">
                  <h3>Инициализация</h3>
                  <p>Создаем пустой объект для результатов</p>
                </div>
              </div>
              
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-description">
                  <h3>Рекурсивный обход</h3>
                  <p>Проходим по всем свойствам объекта с помощью рекурсии</p>
                </div>
              </div>
              
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-description">
                  <h3>Ветвление</h3>
                  <p>Если значение - объект, вызываем функцию рекурсивно с новым префиксом</p>
                  <p>Если значение - примитив, добавляем его в результат с полным путем в качестве ключа</p>
                </div>
              </div>
              
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-description">
                  <h3>Объединение результатов</h3>
                  <p>Объединяем результаты всех рекурсивных вызовов в один объект</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="code-block">
            <h3>Реализация алгоритма</h3>
            <pre class="code">
  const flatten = (obj, prefix = '') => {
    let result = {};
    
    for (let key in obj) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // Если значение - объект, рекурсивно вызываем функцию
        const temp = flatten(obj[key], newKey);
        result = { ...result, ...temp };
      } else {
        // Если значение - примитив, добавляем в результат
        result[newKey] = obj[key];
      }
    }
    
    return result;
  };
            </pre>
          </div>
        </div>
        
        <!-- Вкладка с визуализацией -->
        <div v-if="activeTab === 1" class="visualization-section">
          <h2>Визуализация процесса</h2>
          
          <div class="controls">
            <button @click="resetAnimation" :disabled="isAnimating">Сбросить</button>
            <button @click="startAnimation" :disabled="isAnimating || animationCompleted">
              {{ animationCompleted ? 'Завершено' : 'Запустить анимацию' }}
            </button>
            <button @click="nextStep" :disabled="isAnimating || animationCompleted">Следующий шаг</button>
          </div>
          
          <div class="visualization-container">
            <div class="object-tree">
              <h3>Исходный объект</h3>
              <div class="tree-visualization">
                <div class="tree-node root" :class="{ active: animationStep >= 1 }">
                  <div class="node-key">tree</div>
                  <div class="node-value">{ }</div>
                  <div class="tree-children">
                    <div class="tree-node" :class="{ active: animationStep >= 2 }">
                      <div class="node-key">a</div>
                      <div class="node-value">{ }</div>
                      <div class="tree-children">
                        <div class="tree-node" :class="{ active: animationStep >= 3, visited: animationStep >= 5 }">
                          <div class="node-key">b</div>
                          <div class="node-value">"two"</div>
                        </div>
                        <div class="tree-node" :class="{ active: animationStep >= 6 }">
                          <div class="node-key">c</div>
                          <div class="node-value">{ }</div>
                          <div class="tree-children">
                            <div class="tree-node" :class="{ active: animationStep >= 7, visited: animationStep >= 8 }">
                              <div class="node-key">d</div>
                              <div class="node-value">"one"</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="transformation-process">
              <div class="process-step" :class="{ active: animationStep >= 1 }">
                <div class="process-arrow">→</div>
                <div class="process-description">
                  Начинаем с корня объекта
                </div>
              </div>
              <div class="process-step" :class="{ active: animationStep >= 2 }">
                <div class="process-arrow">→</div>
                <div class="process-description">
                  Находим свойство "a" (объект)
                </div>
              </div>
              <div class="process-step" :class="{ active: animationStep >= 3 }">
                <div class="process-arrow">→</div>
                <div class="process-description">
                  Находим свойство "a.b" (примитив)
                </div>
              </div>
              <div class="process-step" :class="{ active: animationStep >= 4 }">
                <div class="process-arrow">→</div>
                <div class="process-description">
                  Добавляем "a.b" в результат
                </div>
              </div>
              <div class="process-step" :class="{ active: animationStep >= 6 }">
                <div class="process-arrow">→</div>
                <div class="process-description">
                  Находим свойство "a.c" (объект)
                </div>
              </div>
              <div class="process-step" :class="{ active: animationStep >= 7 }">
                <div class="process-arrow">→</div>
                <div class="process-description">
                  Находим свойство "a.c.d" (примитив)
                </div>
              </div>
              <div class="process-step" :class="{ active: animationStep >= 8 }">
                <div class="process-arrow">→</div>
                <div class="process-description">
                  Добавляем "a.c.d" в результат
                </div>
              </div>
            </div>
            
            <div class="result-object">
              <h3>Результат</h3>
              <div class="result-visualization">
                <div class="result-node" :class="{ active: animationStep >= 1 }">
                  <div class="node-text">{ }</div>
                </div>
                <div class="result-node" :class="{ active: animationStep >= 5 }">
                  <div class="node-text">{<br>&nbsp;&nbsp;"a.b": "two"<br>}</div>
                </div>
                <div class="result-node" :class="{ active: animationStep >= 9 }">
                  <div class="node-text">{<br>&nbsp;&nbsp;"a.b": "two",<br>&nbsp;&nbsp;"a.c.d": "one"<br>}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="callstack-visualization" v-if="animationStep > 0">
            <h3>Стек вызовов</h3>
            <div class="callstack">
              <div class="callstack-item" :class="{ active: animationStep >= 1 }">
                <div class="callstack-name">flatten(tree, '')</div>
                <div class="callstack-context">prefix: '', key: 'a'</div>
              </div>
              <div class="callstack-item" :class="{ active: animationStep >= 2 }">
                <div class="callstack-name">flatten(tree.a, 'a')</div>
                <div class="callstack-context">prefix: 'a', key: 'b'</div>
              </div>
              <div class="callstack-item" v-if="animationStep >= 6">
                <div class="callstack-name">flatten(tree.a, 'a')</div>
                <div class="callstack-context">prefix: 'a', key: 'c'</div>
              </div>
              <div class="callstack-item" v-if="animationStep >= 7">
                <div class="callstack-name">flatten(tree.a.c, 'a.c')</div>
                <div class="callstack-context">prefix: 'a.c', key: 'd'</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Вкладка с практическими примерами -->
        <div v-if="activeTab === 2" class="examples-section">
          <h2>Практические примеры</h2>
          
          <div class="example-tabs">
            <button 
              v-for="(example, index) in examples" 
              :key="example.id"
              :class="['example-tab', { active: activeExample === index }]"
              @click="activeExample = index"
            >
              {{ example.name }}
            </button>
          </div>
          
          <div class="example-content">
            <h3>{{ examples[activeExample].name }}</h3>
            <p>{{ examples[activeExample].description }}</p>
            
            <div class="example-code">
              <div class="code-column">
                <h4>Исходный объект</h4>
                <pre class="code">{{ examples[activeExample].input }}</pre>
              </div>
              
              <div class="code-column">
                <h4>Результат</h4>
                <pre class="code">{{ examples[activeExample].output }}</pre>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Вкладка с подводными камнями -->
        <div v-if="activeTab === 3" class="pitfalls-section">
          <h2>Подводные камни</h2>
          
          <div class="pitfall-card">
            <div class="pitfall-icon">⚠️</div>
            <div class="pitfall-content">
              <h3>Циклические ссылки</h3>
              <p>Если в объекте есть циклические ссылки, алгоритм может войти в бесконечную рекурсию</p>
              
              <div class="solution">
                <h4>Решение:</h4>
                <p>Использовать отслеживание уже обработанных объектов с помощью WeakMap или Set</p>
                <pre class="code">
  const flatten = (obj, prefix = '', seen = new WeakMap()) => {
    // Проверяем, не обрабатывали ли мы этот объект раньше
    if (seen.has(obj)) {
      return {};
    }
    
    // Добавляем объект в отслеживаемые
    if (typeof obj === 'object' && obj !== null) {
      seen.set(obj, true);
    }
    
    let result = {};
    
    for (let key in obj) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        const temp = flatten(obj[key], newKey, seen);
        result = { ...result, ...temp };
      } else {
        result[newKey] = obj[key];
      }
    }
    
    return result;
  };</pre>
              </div>
            </div>
          </div>
          
          <div class="pitfall-card">
            <div class="pitfall-icon">⚠️</div>
            <div class="pitfall-content">
              <h3>Массивы преобразуются некорректно</h3>
              <p>Стандартная реализация преобразует массивы в объекты с числовыми ключами</p>
              
              <div class="solution">
                <h4>Решение:</h4>
                <p>Особая обработка массивов с указанием индексов в квадратных скобках</p>
                <pre class="code">
  const flatten = (obj, prefix = '') => {
    let result = {};
    
    for (let key in obj) {
      const newKey = prefix 
        ? Array.isArray(obj) 
          ? `${prefix}[${key}]` 
          : `${prefix}.${key}`
        : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        const temp = flatten(obj[key], newKey);
        result = { ...result, ...temp };
      } else {
        result[newKey] = obj[key];
      }
    }
    
    return result;
  };</pre>
              </div>
            </div>
          </div>
          
          <div class="pitfall-card">
            <div class="pitfall-icon">⚠️</div>
            <div class="pitfall-content">
              <h3>Производительность при больших объектах</h3>
              <p>При обработке больших вложенных объектов может возникнуть проблема производительности</p>
              
              <div class="solution">
                <h4>Решение:</h4>
                <p>Использовать итеративный подход вместо рекурсивного или обрабатывать объект по частям</p>
              </div>
            </div>
          </div>
          
          <div class="pitfall-card">
            <div class="pitfall-icon">⚠️</div>
            <div class="pitfall-content">
              <h3>Специальные символы в ключах</h3>
              <p>Если ключи объекта содержат точки, они могут привести к некорректному разбору при дефлаттенинге</p>
              
              <div class="solution">
                <h4>Решение:</h4>
                <p>Использовать другой разделитель или экранировать специальные символы</p>
                <pre class="code">
  // Использование другого разделителя
  const flatten = (obj, prefix = '', separator = '/') => {
    let result = {};
    
    for (let key in obj) {
      const newKey = prefix ? `${prefix}${separator}${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        const temp = flatten(obj[key], newKey, separator);
        result = { ...result, ...temp };
      } else {
        result[newKey] = obj[key];
      }
    }
    
    return result;
  };</pre>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Вкладка с применением в реальной жизни -->
        <div v-if="activeTab === 4" class="real-usage-section">
          <h2>Применение в реальной разработке</h2>
          
          <div class="usage-card">
            <h3>1. Работа с формами</h3>
            <p>Преобразование вложенных объектов данных формы в плоскую структуру для удобной валидации и отправки на сервер</p>
            <div class="usage-example">
              <pre class="code">
  // Вложенная структура данных формы
  const formData = {
    user: {
      name: "Иван",
      contacts: {
        email: "ivan@example.com",
        phone: "+7 (123) 456-78-90"
      }
    },
    preferences: {
      theme: "dark",
      notifications: true
    }
  };
  
  // Плоская структура для отправки на сервер
  const flatFormData = flatten(formData);
  // Результат:
  // {
  //   'user.name': 'Иван',
  //   'user.contacts.email': 'ivan@example.com',
  //   'user.contacts.phone': '+7 (123) 456-78-90',
  //   'preferences.theme': 'dark',
  //   'preferences.notifications': true
  // }
              </pre>
            </div>
          </div>
          
          <div class="usage-card">
            <h3>2. Локализация и переводы</h3>
            <p>Хранение и использование многоязычных строк в плоской структуре</p>
            <div class="usage-example">
              <pre class="code">
  // Вложенная структура переводов
  const translations = {
    ru: {
      common: {
        yes: "Да",
        no: "Нет",
        cancel: "Отмена"
      },
      auth: {
        login: "Войти",
        register: "Зарегистрироваться"
      }
    },
    en: {
      common: {
        yes: "Yes",
        no: "No",
        cancel: "Cancel"
      },
      auth: {
        login: "Login",
        register: "Register"
      }
    }
  };
  
  // Плоские переводы для конкретного языка
  const flatRuTranslations = flatten(translations.ru);
  // Результат:
  // {
  //   'common.yes': 'Да',
  //   'common.no': 'Нет',
  //   'common.cancel': 'Отмена',
  //   'auth.login': 'Войти',
  //   'auth.register': 'Зарегистрироваться'
  // }
  
  // Использование в приложении
  const t = (key) => flatRuTranslations[key] || key;
  console.log(t('common.yes')); // "Да"
              </pre>
            </div>
          </div>
          
          <div class="usage-card">
            <h3>3. Хранение настроек и конфигураций</h3>
            <p>Удобное сохранение и доступ к вложенным настройкам</p>
            <div class="usage-example">
              <pre class="code">
  // Вложенная структура настроек
  const config = {
    app: {
      theme: {
        primary: "#3498db",
        secondary: "#2ecc71",
        dark: {
          background: "#2c3e50",
          text: "#ecf0f1"
        }
      },
      performance: {
        animations: true,
        caching: {
          enabled: true,
          duration: 3600
        }
      }
    }
  };
  
  // Преобразование в плоскую структуру для хранения
  const flatConfig = flatten(config);
  // Результат:
  // {
  //   'app.theme.primary': '#3498db',
  //   'app.theme.secondary': '#2ecc71',
  //   'app.theme.dark.background': '#2c3e50',
  //   'app.theme.dark.text': '#ecf0f1',
  //   'app.performance.animations': true,
  //   'app.performance.caching.enabled': true,
  //   'app.performance.caching.duration': 3600
  // }
  
  // Легкий доступ к любой вложенной настройке
  console.log(flatConfig['app.theme.dark.background']); // "#2c3e50"
              </pre>
            </div>
          </div>
          
          <div class="usage-card">
            <h3>4. Работа с NoSQL базами данных</h3>
            <p>Преобразование данных в формат, подходящий для некоторых NoSQL хранилищ</p>
          </div>
          
          <div class="usage-card">
            <h3>5. Обработка данных в аналитике</h3>
            <p>Подготовка вложенных данных для аналитических инструментов, требующих плоскую структуру</p>
          </div>
        </div>
        
        <!-- Вкладка с интерактивным примером -->
        <div v-if="activeTab === 5" class="interactive-section">
          <h2>Интерактивный пример</h2>
          
          <div class="interactive-demo">
            <div class="input-side">
              <h3>Введите JSON-объект</h3>
              <div class="textarea-wrapper">
                <textarea
                  v-model="inputJson"
                  placeholder="Введите объект в формате JSON..."
                  rows="15"
                ></textarea>
              </div>
              <div class="interactive-controls">
                <button @click="processJson">Выполнить преобразование</button>
                <button @click="loadExample">Загрузить пример</button>
              </div>
              <div class="error-message" v-if="errorMessage">
                {{ errorMessage }}
              </div>
            </div>
            
            <div class="output-side">
              <h3>Результат</h3>
              <div class="output-wrapper">
                <pre class="code">{{ outputJson }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  // Вкладки
  const tabs = [
    { id: 'algorithm', name: 'Алгоритм' },
    { id: 'visualization', name: 'Визуализация' },
    { id: 'examples', name: 'Примеры' },
    { id: 'pitfalls', name: 'Подводные камни' },
    { id: 'real-usage', name: 'Применение' },
    { id: 'interactive', name: 'Интерактив' }
  ];
  
  const activeTab = ref(0);
  
  // Состояние для анимации
  const animationStep = ref(0);
  const isAnimating = ref(false);
  const animationCompleted = ref(false);
  
  // Функция для запуска анимации
  function startAnimation() {
    if (isAnimating.value || animationCompleted.value) return;
    
    isAnimating.value = true;
    animationStep.value = 0;
    
    const totalSteps = 9;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      animationStep.value = currentStep;
      
      if (currentStep >= totalSteps) {
        clearInterval(interval);
        isAnimating.value = false;
        animationCompleted.value = true;
      }
    }, 1000);
  }
  
  // Функция для ручного перехода к следующему шагу
  function nextStep() {
    if (isAnimating.value || animationCompleted.value) return;
    
    if (animationStep.value < 9) {
      animationStep.value++;
    }
    
    if (animationStep.value >= 9) {
      animationCompleted.value = true;
    }
  }
  
  // Функция для сброса анимации
  function resetAnimation() {
    animationStep.value = 0;
    isAnimating.value = false;
    animationCompleted.value = false;
  }
  
  // Примеры использования
  const examples = [
    {
      id: 'simple',
      name: 'Простой пример',
      description: 'Базовый пример преобразования вложенного объекта в плоскую структуру',
      input: `const tree = {
    a: {
      b: "two",
      c: {
        d: "one",
      },
    },
  };`,
      output: `{
    'a.b': 'two',
    'a.c.d': 'one'
  }`
    },
    {
      id: 'arrays',
      name: 'Объект с массивами',
      description: 'Пример обработки массивов внутри объекта',
      input: `const data = {
    users: [
      { id: 1, name: "Иван" },
      { id: 2, name: "Мария" }
    ],
    settings: {
      theme: "dark",
      notifications: {
        email: true,
        push: false
      }
    }
  };`,
      output: `{
    'users[0].id': 1,
    'users[0].name': 'Иван',
    'users[1].id': 2,
    'users[1].name': 'Мария',
    'settings.theme': 'dark',
    'settings.notifications.email': true,
    'settings.notifications.push': false
  }`
    },
    {
      id: 'complex',
      name: 'Сложная структура',
      description: 'Пример с глубоко вложенной структурой данных',
      input: `const config = {
    app: {
      theme: {
        colors: {
          primary: "#3498db",
          secondary: "#2ecc71",
          accent: {
            light: "#f39c12",
            dark: "#e67e22"
          }
        },
        fonts: {
          main: "Roboto",
          headings: "Montserrat"
        }
      },
      features: {
        cache: {
          enabled: true,
          duration: 3600,
          strategies: ["memory", "localStorage"]
        }
      }
    },
    api: {
      endpoints: {
        users: "/api/users",
        posts: "/api/posts"
      },
      version: "v1"
    }
  };`,
      output: `{
    'app.theme.colors.primary': '#3498db',
    'app.theme.colors.secondary': '#2ecc71',
    'app.theme.colors.accent.light': '#f39c12',
    'app.theme.colors.accent.dark': '#e67e22',
    'app.theme.fonts.main': 'Roboto',
    'app.theme.fonts.headings': 'Montserrat',
    'app.features.cache.enabled': true,
    'app.features.cache.duration': 3600,
    'app.features.cache.strategies[0]': 'memory',
    'app.features.cache.strategies[1]': 'localStorage',
    'api.endpoints.users': '/api/users',
    'api.endpoints.posts': '/api/posts',
    'api.version': 'v1'
  }`
    },
    {
      id: 'custom-separator',
      name: 'Пользовательский разделитель',
      description: 'Пример с использованием собственного разделителя вместо точки',
      input: `const tree = {
    a: {
      b: "two",
      c: {
        d: "one",
      },
    },
  };
  
  // С пользовательским разделителем
  const flatten = (obj, prefix = '', separator = '/') => {
    let result = {};
    
    for (let key in obj) {
      const newKey = prefix ? \`\${prefix}\${separator}\${key}\` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        const temp = flatten(obj[key], newKey, separator);
        result = { ...result, ...temp };
      } else {
        result[newKey] = obj[key];
      }
    }
    
    return result;
  };`,
      output: `{
    'a/b': 'two',
    'a/c/d': 'one'
  }`
    }
  ];
  
  const activeExample = ref(0);
  
  // Интерактивный пример
  const inputJson = ref('');
  const outputJson = ref('');
  const errorMessage = ref('');
  
  // Функция flattenObject для интерактивного примера
  function flattenObject(obj, prefix = '') {
    let result = {};
    
    for (const key in obj) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        const temp = flattenObject(obj[key], newKey);
        result = { ...result, ...temp };
      } else if (Array.isArray(obj[key])) {
        // Особая обработка массивов
        obj[key].forEach((item, index) => {
          if (typeof item === 'object' && item !== null) {
            const temp = flattenObject(item, `${newKey}[${index}]`);
            result = { ...result, ...temp };
          } else {
            result[`${newKey}[${index}]`] = item;
          }
        });
      } else {
        result[newKey] = obj[key];
      }
    }
    
    return result;
  }
  
  function processJson() {
    try {
      errorMessage.value = '';
      
      // Попытка разобрать JSON из ввода
      const inputObj = JSON.parse(inputJson.value);
      
      // Выполнение преобразования
      const result = flattenObject(inputObj);
      
      // Форматирование результата
      outputJson.value = JSON.stringify(result, null, 2);
    } catch (error) {
      errorMessage.value = `Ошибка: ${error.message}`;
      outputJson.value = '';
    }
  }
  
  function loadExample() {
    inputJson.value = JSON.stringify({
      user: {
        name: "Иван Петров",
        age: 30,
        contacts: {
          email: "ivan@example.com",
          phone: "+7 (123) 456-78-90"
        }
      },
      orders: [
        {
          id: 1001,
          items: ["Ноутбук", "Мышь"],
          total: 75000
        },
        {
          id: 1002,
          items: ["Клавиатура"],
          total: 5000
        }
      ],
      settings: {
        notifications: true,
        theme: "dark"
      }
    }, null, 2);
    
    errorMessage.value = '';
    outputJson.value = '';
  }
  
  // Сброс при переключении на вкладку интерактива
  watch(activeTab, (newValue) => {
    if (newValue === 5 && !inputJson.value) {
      loadExample();
    }
  });
  </script>
  
  <style scoped>
  .flatten-object-demo {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    background-color: #ffffff;
    color: #333333;
  }
  
  h1, h2, h3, h4 {
    color: #000000;
    margin-bottom: 20px;
  }
  
  h1 {
    font-size: 2.2rem;
    text-align: center;
    margin-bottom: 30px;
  }
  
  h2 {
    font-size: 1.8rem;
    border-bottom: 2px solid #eaeaea;
    padding-bottom: 10px;
  }
  
  h3 {
    font-size: 1.4rem;
  }
  
  h4 {
    font-size: 1.2rem;
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 15px;
  }
  
  /* Общие стили для вкладок */
  .tabs {
    display: flex;
    gap: 5px;
    margin-bottom: 20px;
    overflow-x: auto;
    padding-bottom: 5px;
  }
  
  .tab-button {
    padding: 10px 20px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 100px;
    text-align: center;
    white-space: nowrap;
  }
  
  .tab-button:hover {
    background-color: #e9e9e9;
  }
  
  .tab-button.active {
    background-color: #4a6ee0;
    color: white;
    border-color: #4a6ee0;
  }
  
  .tab-content {
    background-color: #ffffff;
    border-radius: 5px;
    padding: 20px;
    border: 1px solid #eaeaea;
    min-height: 400px;
  }
  
  /* Стили для блока кода */
  .code-block {
    margin: 20px 0;
    background-color: #f8f8f8;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }
  
  .code {
    background-color: #282c34;
    color: #abb2bf;
    padding: 15px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    overflow-x: auto;
    white-space: pre;
    margin: 0;
  }
  
  /* Стили для алгоритма */
  .algorithm-explanation {
    margin-bottom: 30px;
  }
  
  .algorithm-steps {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 20px 0;
  }
  
  .step {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 5px;
    border-left: 4px solid #4a6ee0;
  }
  
  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: #4a6ee0;
    color: white;
    border-radius: 50%;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  .step-description {
    flex: 1;
  }
  
  .step-description h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.2rem;
  }
  
  .step-description p {
    margin: 5px 0;
  }
  
  /* Стили для визуализации */
  .visualization-section {
    position: relative;
  }
  
  .controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .controls button {
    padding: 8px 15px;
    background-color: #4a6ee0;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .controls button:hover:not(:disabled) {
    background-color: #3a5dcc;
  }
  
  .controls button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .visualization-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .object-tree, .result-object, .transformation-process {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 5px;
    height: 100%;
  }
  
  .object-tree h3, .result-object h3 {
    text-align: center;
    margin-bottom: 15px;
  }
  
  .tree-visualization {
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .tree-node {
    background-color: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 5px;
    padding: 10px;
    margin: 5px 0;
    min-width: 100px;
    text-align: center;
    position: relative;
    transition: all 0.3s ease;
  }
  
  .tree-node.active {
    border-color: #4a6ee0;
    box-shadow: 0 0 10px rgba(74, 110, 224, 0.3);
  }
  
  .tree-node.visited {
    background-color: #e8f1ff;
  }
  
  .tree-node.root {
    margin-bottom: 20px;
  }
  
  .node-key {
    font-weight: bold;
  }
  
  .node-value {
    color: #e74c3c;
    font-family: monospace;
  }
  
  .tree-children {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
    position: relative;
  }
  
  .tree-children:before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    height: 10px;
    width: 1px;
    background-color: #dddddd;
  }
  
  .transformation-process {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
  }
  
  .process-step {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 5px;
    opacity: 0.3;
    transition: all 0.3s ease;
  }
  
  .process-step.active {
    opacity: 1;
    background-color: #e8f1ff;
  }
  
  .process-arrow {
    font-size: 1.5rem;
    color: #4a6ee0;
  }
  
  .result-visualization {
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
  }
  
  .result-node {
    background-color: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 5px;
    padding: 15px;
    min-width: 200px;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
    position: absolute;
  }
  
  .result-node.active {
    opacity: 1;
    transform: translateY(0);
    position: relative;
  }
  
  .node-text {
    font-family: monospace;
    white-space: pre;
  }
  
  .callstack-visualization {
    margin-top: 30px;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 5px;
  }
  
  .callstack {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .callstack-item {
    background-color: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 5px;
    padding: 10px 15px;
    opacity: 0.3;
    transition: all 0.3s ease;
  }
  
  .callstack-item.active {
    opacity: 1;
    border-color: #4a6ee0;
    box-shadow: 0 0 5px rgba(74, 110, 224, 0.2);
  }
  
  .callstack-name {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .callstack-context {
    color: #777777;
    font-family: monospace;
    font-size: 0.9rem;
  }
  
  /* Стили для примеров */
  .example-tabs {
    display: flex;
    gap: 5px;
    margin-bottom: 20px;
    overflow-x: auto;
    padding-bottom: 5px;
  }
  
  .example-tab {
    padding: 8px 15px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 80px;
    text-align: center;
    white-space: nowrap;
  }
  
  .example-tab:hover {
    background-color: #e9e9e9;
  }
  
  .example-tab.active {
    background-color: #4a6ee0;
    color: white;
    border-color: #4a6ee0;
  }
  
  .example-content {
    background-color: #ffffff;
    padding: 20px;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    margin-top: 20px;
  }
  
  .example-code {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
  }
  
  .code-column {
    background-color: #f9f9f9;
    border-radius: 5px;
    padding: 15px;
  }
  
  .code-column h4 {
    margin-top: 0;
    margin-bottom: 15px;
  }
  
  /* Стили для подводных камней */
  .pitfalls-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .pitfall-card {
    display: flex;
    gap: 15px;
    background-color: #fff8e1;
    padding: 20px;
    border-radius: 5px;
    border-left: 4px solid #ffc107;
  }
  
  .pitfall-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }
  
  .pitfall-content {
    flex: 1;
  }
  
  .pitfall-content h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #d97706;
  }
  
  .solution {
    margin-top: 15px;
    background-color: #f3f4f6;
    padding: 15px;
    border-radius: 5px;
  }
  
  .solution h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #4a6ee0;
  }
  
  /* Стили для примеров использования */
  .real-usage-section {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .usage-card {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
    border-left: 4px solid #4a6ee0;
  }
  
  .usage-card h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #4a6ee0;
  }
  
  .usage-example {
    margin-top: 15px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }
  
  /* Стили для интерактивного примера */
  .interactive-demo {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .input-side, .output-side {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
  }
  
  .textarea-wrapper, .output-wrapper {
    margin-bottom: 15px;
  }
  
  textarea {
    width: 100%;
    padding: 10px;
    font-family: monospace;
    border: 1px solid #dddddd;
    border-radius: 5px;
    resize: vertical;
  }
  
  .interactive-controls {
    display: flex;
    gap: 10px;
  }
  
  .interactive-controls button {
    padding: 8px 15px;
    background-color: #4a6ee0;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .interactive-controls button:hover {
    background-color: #3a5dcc;
  }
  
  .error-message {
    margin-top: 15px;
    color: #e74c3c;
    font-weight: bold;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .visualization-container {
      grid-template-columns: 1fr;
    }
    
    .example-code {
      grid-template-columns: 1fr;
    }
    
    .interactive-demo {
      grid-template-columns: 1fr;
    }
  }
  </style>