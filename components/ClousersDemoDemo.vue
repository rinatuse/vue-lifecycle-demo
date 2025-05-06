<template>
    <div class="closures-explorer">
      <h1 class="main-title">Понимание замыканий в JavaScript</h1>
      <p class="main-description">
        Исследуем, как замыкания захватывают <strong>переменные</strong>, а не их значения
      </p>
  
      <div class="tabs">
        <button 
          v-for="(tab, index) in tabs" 
          :key="tab.id"
          :class="['tab-button', { active: currentTab === index }]"
          @click="currentTab = index"
        >
          {{ tab.title }}
        </button>
      </div>
  
      <!-- 1. ЧТО ТАКОЕ ЗАМЫКАНИЕ -->
      <div v-if="currentTab === 0" class="tab-content">
        <h2>Что такое замыкание?</h2>
        
        <div class="concept-block">
          <div class="definition">
            <h3>Определение</h3>
            <p>
              <strong>Замыкание</strong> — это комбинация функции и её лексического окружения (области видимости), 
              в котором эта функция была создана.
            </p>
            <p>
              Благодаря этому, функция имеет доступ к переменным из внешней области видимости даже после того, 
              как эта внешняя функция завершила выполнение.
            </p>
          </div>
          
          <div class="key-insight">
            <h3>Ключевая идея</h3>
            <p>Замыкания захватывают <strong>ссылки на переменные</strong>, а не копии их значений в момент создания замыкания!</p>
          </div>
        </div>
  
        <div class="code-example">
          <h3>Простой пример замыкания</h3>
          <pre class="code"><code>function createCounter() {
    let count = 0;  // Переменная в лексическом окружении
    
    return function() {  // Возвращаемая функция образует замыкание
      count += 1;        // Имеет доступ к переменной count
      return count;
    };
  }
  
  const counter = createCounter();
  console.log(counter()); // 1
  console.log(counter()); // 2
  console.log(counter()); // 3</code></pre>
  
          <div class="example-explanation">
            <p>
              В этом примере функция <code>createCounter</code> создаёт переменную <code>count</code> и 
              возвращает функцию, которая имеет доступ к этой переменной.
            </p>
            <p>
              Важно: Каждый вызов <code>createCounter()</code> создаёт новое независимое замыкание со своей переменной <code>count</code>.
            </p>
          </div>
  
          <div class="visual">
            <div class="visualization">
              <div class="outer-func">
                <div class="func-name">createCounter()</div>
                <div class="lexical-env">
                  <div class="variable">count: <span class="value">0</span></div>
                </div>
                <div class="inner-func">
                  <div class="func-name">return function()</div>
                  <div class="closure-arrow">
                    <svg width="30" height="50">
                      <path d="M15,0 Q-20,25 15,50" fill="none" stroke="#333" stroke-width="2" />
                      <polygon points="15,50 10,40 20,40" fill="#333" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="explanation">
              <p>
                Замыкание образуется, когда внутренняя функция сохраняет ссылку на лексическое 
                окружение, в котором она была создана.
              </p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 2. ПЕРЕМЕННЫЕ VS ЗНАЧЕНИЯ -->
      <div v-if="currentTab === 1" class="tab-content">
        <h2>Захват переменных, а не значений</h2>
        
        <div class="concept-block">
          <div class="comparison">
            <div class="column">
              <h3>Распространённое заблуждение</h3>
              <p>
                Многие программисты ошибочно полагают, что замыкания запоминают <strong>значения</strong> переменных 
                в момент создания замыкания.
              </p>
            </div>
            <div class="column">
              <h3>Реальность</h3>
              <p>
                Замыкания сохраняют <strong>ссылки на переменные</strong> из внешнего лексического окружения, 
                а не их текущие значения.
              </p>
            </div>
          </div>
        </div>
  
        <div class="code-example">
          <h3>Демонстрация захвата переменных</h3>
          <pre class="code"><code>function createFunctions() {
    let funcs = [];
    
    for (var i = 0; i &lt; 3; i++) {
      funcs.push(function() {
        console.log(i);
      });
    }
    
    return funcs;
  }
  
  const functions = createFunctions();
  functions[0](); // 3, а не 0!
  functions[1](); // 3, а не 1!
  functions[2](); // 3, а не 2!</code></pre>
  
          <div class="example-explanation">
            <p>
              В этом примере все функции выводят <code>3</code>, а не 0, 1 и 2, как можно было бы ожидать.
            </p>
            <p>
              Причина: все функции захватывают <em>одну и ту же переменную</em> <code>i</code>, а не её значение в момент создания функции.
              К моменту вызова, переменная <code>i</code> уже равна <code>3</code> (после выхода из цикла).
            </p>
          </div>
  
          <div class="interactive-demo">
            <h3>Интерактивная демонстрация</h3>
            <div class="demo-container">
              <div class="demo-controls">
                <button @click="runWrongClosureDemo" class="demo-button">Запустить демонстрацию</button>
                <button @click="resetDemo" class="demo-button">Сбросить</button>
              </div>
              <div class="demo-visualization">
                <div class="execution-context">
                  <div class="context-title">Глобальная область</div>
                  <div class="context-content">
                    <div class="variable-container">
                      <div class="variable-name">functions: </div>
                      <div class="variable-value">[функция, функция, функция]</div>
                    </div>
                  </div>
                </div>
                <div class="lexical-scope">
                  <div class="scope-title">Лексическое окружение createFunctions</div>
                  <div class="scope-content">
                    <div class="variable-container">
                      <div class="variable-name">i: </div>
                      <div class="variable-value">{{ demoI }}</div>
                    </div>
                  </div>
                </div>
                <div class="function-calls">
                  <div 
                    v-for="(call, index) in functionCalls" 
                    :key="index" 
                    class="function-call"
                    :class="{ 'active-call': call.active }"
                  >
                    <div class="call-code">functions[{{ index }}]()</div>
                    <div class="call-result">{{ call.result !== null ? 'Результат: ' + call.result : '' }}</div>
                    <div class="call-arrow" v-if="call.active">
                      <svg width="20" height="20">
                        <path d="M0,10 L15,10" stroke="#e74c3c" stroke-width="2" />
                        <polygon points="15,10 10,5 10,15" fill="#e74c3c" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="demo-explanation">
                <div v-if="demoStep === 0">
                  <p>Нажмите "Запустить демонстрацию", чтобы увидеть, как работает захват переменных в замыканиях</p>
                </div>
                <div v-else-if="demoStep === 1">
                  <p>Функция <code>createFunctions</code> создала 3 функции и все они захватили <strong>одну и ту же переменную</strong> <code>i</code></p>
                </div>
                <div v-else-if="demoStep === 2">
                  <p>После завершения цикла <code>for</code> значение переменной <code>i</code> стало равно <code>3</code></p>
                </div>
                <div v-else-if="demoStep === 3">
                  <p>Вызываем первую функцию, она обращается к переменной <code>i</code>, которая сейчас равна <code>3</code></p>
                </div>
                <div v-else-if="demoStep === 4">
                  <p>Вызываем вторую функцию, она также обращается к той же переменной <code>i</code>, равной <code>3</code></p>
                </div>
                <div v-else-if="demoStep === 5">
                  <p>Вызываем третью функцию, результат тот же: <code>3</code></p>
                </div>
                <div v-else-if="demoStep === 6">
                  <p>Все три функции вывели одинаковое значение <code>3</code>, потому что все они захватили <strong>одну и ту же переменную</strong> <code>i</code>, а не её значения в момент создания функций</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 3. РЕШЕНИЕ ПРОБЛЕМЫ -->
      <div v-if="currentTab === 2" class="tab-content">
        <h2>Решение проблемы захвата общей переменной</h2>
        
        <div class="concept-block">
          <div class="solution-approaches">
            <h3>Подходы к решению</h3>
            <div class="approach">
              <h4>1. Использование let вместо var</h4>
              <p>Блочная область видимости <code>let</code> создаёт новую переменную для каждой итерации цикла</p>
            </div>
            <div class="approach">
              <h4>2. Создание дополнительного замыкания (IIFE)</h4>
              <p>Создание функции для каждой итерации, каждая со своим параметром</p>
            </div>
            <div class="approach">
              <h4>3. Привязка аргументов (bind)</h4>
              <p>Использование метода <code>bind</code> для создания новой функции с привязанным значением</p>
            </div>
          </div>
        </div>
  
        <div class="code-example">
          <h3>Решение с использованием let</h3>
          <pre class="code"><code>function createFunctions() {
    let funcs = [];
    
    for (let i = 0; i &lt; 3; i++) {
      // 'let' создаёт новую переменную i для каждой итерации
      funcs.push(function() {
        console.log(i);
      });
    }
    
    return funcs;
  }
  
  const functions = createFunctions();
  functions[0](); // 0 - правильно!
  functions[1](); // 1 - правильно!
  functions[2](); // 2 - правильно!</code></pre>
  
          <div class="example-explanation">
            <p>
              В этом решении мы используем <code>let</code> вместо <code>var</code> в цикле <code>for</code>.
            </p>
            <p>
              Ключевое отличие: в каждой итерации цикла <code>for</code> с <code>let</code> создаётся <strong>новая переменная</strong> <code>i</code>,
              а не изменяется одна и та же. Поэтому каждое замыкание захватывает <strong>свою собственную переменную</strong> <code>i</code>.
            </p>
          </div>
  
          <div class="interactive-demo">
            <h3>Интерактивная демонстрация с let</h3>
            <div class="demo-container">
              <div class="demo-controls">
                <button @click="runCorrectClosureDemo" class="demo-button">Запустить демонстрацию</button>
                <button @click="resetDemo" class="demo-button">Сбросить</button>
              </div>
              <div class="demo-visualization">
                <div class="execution-context">
                  <div class="context-title">Глобальная область</div>
                  <div class="context-content">
                    <div class="variable-container">
                      <div class="variable-name">functions: </div>
                      <div class="variable-value">[функция, функция, функция]</div>
                    </div>
                  </div>
                </div>
                <div class="lexical-scopes">
                  <div class="scope-row">
                    <div v-for="(scope, index) in letScopes" :key="index" 
                         class="scope-block" 
                         :class="{ 'active-scope': scope.active }">
                      <div class="scope-title">Лексическое окружение итерации {{ index }}</div>
                      <div class="scope-content">
                        <div class="variable-container">
                          <div class="variable-name">i: </div>
                          <div class="variable-value">{{ index }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="function-calls">
                  <div 
                    v-for="(call, index) in correctFunctionCalls" 
                    :key="index" 
                    class="function-call"
                    :class="{ 'active-call': call.active }"
                  >
                    <div class="call-code">functions[{{ index }}]()</div>
                    <div class="call-result">{{ call.result !== null ? 'Результат: ' + call.result : '' }}</div>
                    <div class="call-arrow" v-if="call.active">
                      <svg width="20" height="40">
                        <path d="M0,20 L30,20" stroke="#2ecc71" stroke-width="2" />
                        <path d="M30,20 L60,20" stroke="#2ecc71" stroke-width="2" stroke-dasharray="4,2" />
                        <polygon points="60,20 50,15 50,25" fill="#2ecc71" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="demo-explanation">
                <div v-if="correctDemoStep === 0">
                  <p>Нажмите "Запустить демонстрацию", чтобы увидеть, как работает захват переменных с использованием <code>let</code></p>
                </div>
                <div v-else-if="correctDemoStep === 1">
                  <p>Функция <code>createFunctions</code> создала 3 функции, но теперь каждая из них захватила <strong>свою собственную переменную</strong> <code>i</code> благодаря блочной области видимости <code>let</code></p>
                </div>
                <div v-else-if="correctDemoStep === 2">
                  <p>Вызываем первую функцию. Она обращается к переменной <code>i</code> из первой итерации цикла, равной <code>0</code></p>
                </div>
                <div v-else-if="correctDemoStep === 3">
                  <p>Вызываем вторую функцию. Она обращается к переменной <code>i</code> из второй итерации цикла, равной <code>1</code></p>
                </div>
                <div v-else-if="correctDemoStep === 4">
                  <p>Вызываем третью функцию. Она обращается к переменной <code>i</code> из третьей итерации цикла, равной <code>2</code></p>
                </div>
                <div v-else-if="correctDemoStep === 5">
                  <p>Результаты соответствуют ожиданиям: <code>0</code>, <code>1</code>, <code>2</code>. Каждая функция захватила <strong>свою копию переменной</strong> <code>i</code> благодаря использованию <code>let</code> в цикле</p>
                </div>
              </div>
            </div>
          </div>
  
          <div class="code-example">
            <h3>Альтернативное решение с IIFE</h3>
            <pre class="code"><code>function createFunctions() {
    let funcs = [];
    
    for (var i = 0; i &lt; 3; i++) {
      // Создаём немедленно вызываемое функциональное выражение (IIFE)
      funcs.push((function(capturedI) {
        return function() {
          console.log(capturedI);
        };
      })(i)); // Передаём текущее значение i как аргумент
    }
    
    return funcs;
  }
  
  const functions = createFunctions();
  functions[0](); // 0
  functions[1](); // 1
  functions[2](); // 2</code></pre>
  
            <div class="example-explanation">
              <p>
                В этом решении мы используем IIFE (Immediately Invoked Function Expression), 
                которое создаёт новое лексическое окружение для каждой итерации.
              </p>
              <p>
                <strong>Принцип:</strong> параметр <code>capturedI</code> получает текущее значение <code>i</code>. 
                Внутри IIFE возвращается новая функция, которая захватывает параметр <code>capturedI</code>, а не переменную <code>i</code> из цикла.
              </p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 4. ПРИМЕРЫ ИЗ РЕАЛЬНОЙ ЖИЗНИ -->
      <div v-if="currentTab === 3" class="tab-content">
        <h2>Применение замыканий на практике</h2>
        
        <div class="concept-block">
          <div class="practical-uses">
            <h3>Распространённые сценарии использования</h3>
            <ul class="use-cases">
              <li>
                <strong>Инкапсуляция данных</strong> — для создания приватных переменных и методов
              </li>
              <li>
                <strong>Фабричные функции</strong> — создание объектов с предустановленными настройками
              </li>
              <li>
                <strong>Функциональное программирование</strong> — каррирование, частичное применение функций
              </li>
              <li>
                <strong>Обработчики событий</strong> — сохранение данных для callback-функций
              </li>
              <li>
                <strong>Модульный паттерн</strong> — создание модулей с приватным состоянием
              </li>
            </ul>
          </div>
        </div>
  
        <div class="code-example">
          <h3>Пример: Модуль с приватными данными</h3>
          <pre class="code"><code>// Модуль для управления корзиной покупок
  const ShoppingCart = (function() {
    // Приватные переменные (недоступны извне)
    let items = [];
    let total = 0;
    
    // Приватная функция для пересчёта суммы
    function recalculateTotal() {
      total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
    
    // Публичный API
    return {
      addItem(name, price, quantity = 1) {
        items.push({ name, price, quantity });
        recalculateTotal();
        return this; // для цепочки вызовов
      },
      
      removeItem(name) {
        const index = items.findIndex(item => item.name === name);
        if (index !== -1) {
          items.splice(index, 1);
          recalculateTotal();
        }
        return this;
      },
      
      getTotal() {
        return total;
      },
      
      getItems() {
        // Возвращаем копию массива, чтобы предотвратить его изменение извне
        return [...items];
      }
    };
  })();</code></pre>
  
          <div class="example-explanation">
            <p>
              Это пример модульного паттерна IIFE с замыканием. Он создаёт модуль <code>ShoppingCart</code> с приватными переменными <code>items</code> и <code>total</code>.
            </p>
            <p>
              <strong>Преимущества:</strong>
            </p>
            <ul>
              <li>Переменные <code>items</code> и <code>total</code> недоступны извне модуля</li>
              <li>Публичный API модуля имеет доступ к этим переменным благодаря замыканию</li>
              <li>Состояние сохраняется между вызовами методов</li>
            </ul>
          </div>
  
          <div class="interactive-example">
            <h3>Демонстрация работы модуля</h3>
            <div class="shopping-cart-demo">
              <div class="cart-actions">
                <div class="cart-form">
                  <input v-model="newItem.name" placeholder="Название товара" />
                  <input v-model.number="newItem.price" type="number" placeholder="Цена" min="0" />
                  <input v-model.number="newItem.quantity" type="number" placeholder="Количество" min="1" />
                  <button @click="addToCart" class="cart-button add">Добавить в корзину</button>
                </div>
                <div class="cart-control">
                  <button @click="showCart" class="cart-button view">Показать содержимое корзины</button>
                  <button @click="resetCart" class="cart-button reset">Очистить корзину</button>
                </div>
              </div>
              <div class="cart-display">
                <div class="cart-header">
                  <h4>Корзина</h4>
                  <div class="cart-total">Итого: {{ cartTotal }} руб.</div>
                </div>
                <div class="cart-items">
                  <div v-if="cartItems.length === 0" class="empty-cart">
                    Корзина пуста
                  </div>
                  <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
                    <div class="item-name">{{ item.name }}</div>
                    <div class="item-details">
                      <span>{{ item.price }} руб. × {{ item.quantity }}</span>
                      <button @click="removeFromCart(item.name)" class="remove-button">Удалить</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cart-explanation">
              <p>
                Это интерактивная демонстрация модуля корзины покупок. Обратите внимание, что при каждом действии с корзиной, 
                данные сохраняются благодаря замыканию.
              </p>
              <p>
                <strong>Важно:</strong> Внутренние данные <code>items</code> и <code>total</code> инкапсулированы
                и не доступны напрямую - можно получить к ним доступ только через предоставляемые методы.
              </p>
            </div>
          </div>
        </div>
  
        <div class="code-example">
          <h3>Пример: Функция-генератор для создания функций-валидаторов</h3>
          <pre class="code"><code>// Функция-фабрика для создания валидаторов
  function createValidator(validationRules) {
    // Замыкание захватывает переменную validationRules
    return function validator(data) {
      const errors = {};
      
      // Проходим по всем правилам валидации
      for (const field in validationRules) {
        if (validationRules.hasOwnProperty(field)) {
          const rules = validationRules[field];
          
          for (const rule of rules) {
            const error = rule(data[field], data);
            if (error) {
              if (!errors[field]) {
                errors[field] = [];
              }
              errors[field].push(error);
              break; // Останавливаемся на первой ошибке для поля
            }
          }
        }
      }
      
      return {
        isValid: Object.keys(errors).length === 0,
        errors
      };
    };
  }
  
  // Примеры правил валидации
  const required = field => value => {
    if (!value) return `Поле ${field} обязательно`;
    return null;
  };
  
  const minLength = (field, length) => value => {
    if (!value || value.length &lt; length) {
      return `Поле ${field} должно быть не короче ${length} символов`;
    }
    return null;
  };
  
  // Создание валидатора формы
  const userFormValidator = createValidator({
    username: [
      required('Имя пользователя'),
      minLength('Имя пользователя', 3)
    ],
    password: [
      required('Пароль'),
      minLength('Пароль', 6)
    ]
  });
  
  // Использование валидатора
  const validationResult = userFormValidator({
    username: 'user',
    password: '123'
  });
  
  console.log(validationResult.isValid); // false
  console.log(validationResult.errors); // { password: ['Поле Пароль должно быть не короче 6 символов'] }</code></pre>
  
          <div class="example-explanation">
            <p>
              Этот пример демонстрирует использование замыканий для создания функций-валидаторов.
            </p>
            <p>
              <strong>Ключевые моменты:</strong>
            </p>
            <ul>
              <li>Функция <code>createValidator</code> создаёт замыкание, захватывающее правила валидации</li>
              <li>Функции <code>required</code> и <code>minLength</code> используют каррирование (еще один приём с замыканиями)</li>
              <li>Валидатор можно настроить под разные формы с разными правилами</li>
            </ul>
          </div>
        </div>
      </div>
  
      <!-- 5. ПОДВОДНЫЕ КАМНИ -->
      <div v-if="currentTab === 4" class="tab-content">
        <h2>Подводные камни и оптимизация</h2>
        
        <div class="concept-block">
          <div class="pitfalls">
            <h3>Распространённые ошибки при работе с замыканиями</h3>
            <ul class="pitfalls-list">
              <li>
                <strong>Утечки памяти</strong> — замыкания могут предотвратить сборку мусора
              </li>
              <li>
                <strong>Неожиданный захват общей переменной</strong> — как в примере с циклом for и var
              </li>
              <li>
                <strong>Изменение захваченных переменных</strong> — может привести к неожиданным побочным эффектам
              </li>
              <li>
                <strong>Излишние замыкания</strong> — создание ненужных замыканий влияет на производительность
              </li>
            </ul>
          </div>
        </div>
  
        <div class="code-example">
          <h3>Подводный камень: Утечка памяти</h3>
          <pre class="code"><code>function potentialMemoryLeak() {
    const largeData = new Array(1000000).fill('много данных');
    
    const smallFunction = function() {
      // Использует только одно значение из largeData
      console.log(largeData[0]);
    };
    
    return smallFunction;
  }
  
  // Создаём функцию, которая захватывает весь массив largeData
  const leakyFunction = potentialMemoryLeak();
  
  // Позже вызываем функцию
  leakyFunction(); // 'много данных'
  
  // Проблема: весь массив largeData остаётся в памяти, 
  // хотя функция использует только один его элемент!</code></pre>
  
          <div class="example-explanation">
            <p>
              В этом примере функция <code>smallFunction</code> захватывает весь массив <code>largeData</code>, 
              хотя использует только первый его элемент.
            </p>
            <p>
              <strong>Решение:</strong>
            </p>
            <pre class="code"><code>function preventMemoryLeak() {
    const largeData = new Array(1000000).fill('много данных');
    const firstItem = largeData[0]; // Сохраняем только нужное значение
    
    const efficientFunction = function() {
      // Использует только сохранённое значение
      console.log(firstItem);
    };
    
    return efficientFunction;
    // largeData выходит из области видимости и может быть собран сборщиком мусора
  }</code></pre>
          </div>
  
          <div class="optimization-techniques">
            <h3>Техники оптимизации замыканий</h3>
            <ul class="techniques-list">
              <li>
                <strong>Захватывайте только необходимые переменные</strong> — сохраняйте только те данные, которые действительно нужны
              </li>
              <li>
                <strong>Используйте WeakMap для кеширования</strong> — позволяет избежать утечек памяти при кешировании
              </li>
              <li>
                <strong>Освобождайте ссылки</strong> — присваивайте <code>null</code> ненужным больше переменным
              </li>
              <li>
                <strong>Будьте внимательны с DOM-элементами</strong> — замыкания, захватывающие DOM-элементы, часто создают утечки памяти
              </li>
            </ul>
          </div>
        </div>
  
        <div class="code-example">
          <h3>Подводный камень: this в замыканиях</h3>
          <pre class="code"><code>const user = {
    name: 'Иван',
    greetLater: function() {
      // setTimeout создаёт замыкание
      setTimeout(function() {
        console.log(`Привет, меня зовут ${this.name}`);
      }, 1000);
    }
  };
  
  user.greetLater(); // "Привет, меня зовут undefined" - this равен window!</code></pre>
  
          <div class="example-explanation">
            <p>
              В функции обратного вызова <code>this</code> не указывает на объект <code>user</code>, так как контекст теряется.
            </p>
            <p>
              <strong>Решения:</strong>
            </p>
            <ol>
              <li>
                <strong>Использование стрелочной функции:</strong>
                <pre class="code"><code>const user = {
    name: 'Иван',
    greetLater: function() {
      // Стрелочная функция сохраняет значение this из внешней области
      setTimeout(() => {
        console.log(`Привет, меня зовут ${this.name}`);
      }, 1000);
    }
  };</code></pre>
              </li>
              <li>
                <strong>Сохранение this в переменную:</strong>
                <pre class="code"><code>const user = {
    name: 'Иван',
    greetLater: function() {
      const self = this; // Сохраняем ссылку на this
      setTimeout(function() {
        console.log(`Привет, меня зовут ${self.name}`);
      }, 1000);
    }
  };</code></pre>
              </li>
              <li>
                <strong>Использование bind:</strong>
                <pre class="code"><code>const user = {
    name: 'Иван',
    greetLater: function() {
      setTimeout(function() {
        console.log(`Привет, меня зовут ${this.name}`);
      }.bind(this), 1000);
    }
  };</code></pre>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  
  // Вкладки
  const tabs = [
    { id: 'basics', title: 'Основы замыканий' },
    { id: 'variables-vs-values', title: 'Переменные vs Значения' },
    { id: 'solutions', title: 'Решение проблемы' },
    { id: 'real-world', title: 'Практические примеры' },
    { id: 'pitfalls', title: 'Подводные камни' }
  ];
  const currentTab = ref(0);
  
  // Демонстрация проблемы с замыканием (var)
  const demoI = ref(0);
  const demoStep = ref(0);
  const functionCalls = reactive([
    { active: false, result: null },
    { active: false, result: null },
    { active: false, result: null }
  ]);
  
  // Демонстрация решения с let
  const correctDemoStep = ref(0);
  const letScopes = reactive([
    { active: false },
    { active: false },
    { active: false }
  ]);
  const correctFunctionCalls = reactive([
    { active: false, result: null },
    { active: false, result: null },
    { active: false, result: null }
  ]);
  
  // Функция для запуска демонстрации проблемы
  function runWrongClosureDemo() {
    resetDemo();
    
    // Шаг 1: Создание функций
    setTimeout(() => {
      demoStep.value = 1;
    }, 500);
    
    // Шаг 2: После выполнения цикла i = 3
    setTimeout(() => {
      demoStep.value = 2;
      demoI.value = 3;
    }, 1500);
    
    // Шаг 3: Вызов первой функции
    setTimeout(() => {
      demoStep.value = 3;
      functionCalls[0].active = true;
      functionCalls[0].result = demoI.value;
    }, 2500);
    
    // Шаг 4: Вызов второй функции
    setTimeout(() => {
      demoStep.value = 4;
      functionCalls[0].active = false;
      functionCalls[1].active = true;
      functionCalls[1].result = demoI.value;
    }, 3500);
    
    // Шаг 5: Вызов третьей функции
    setTimeout(() => {
      demoStep.value = 5;
      functionCalls[1].active = false;
      functionCalls[2].active = true;
      functionCalls[2].result = demoI.value;
    }, 4500);
    
    // Шаг 6: Итог
    setTimeout(() => {
      demoStep.value = 6;
      functionCalls[2].active = false;
    }, 5500);
  }
  
  // Функция для запуска демонстрации решения
  function runCorrectClosureDemo() {
    resetDemo();
    
    // Шаг 1: Создание функций с отдельными лексическими окружениями
    setTimeout(() => {
      correctDemoStep.value = 1;
      letScopes[0].active = true;
      letScopes[1].active = true;
      letScopes[2].active = true;
    }, 500);
    
    // Шаг 2: Вызов первой функции
    setTimeout(() => {
      correctDemoStep.value = 2;
      correctFunctionCalls[0].active = true;
      letScopes[0].active = true;
      letScopes[1].active = false;
      letScopes[2].active = false;
      correctFunctionCalls[0].result = 0;
    }, 2000);
    
    // Шаг 3: Вызов второй функции
    setTimeout(() => {
      correctDemoStep.value = 3;
      correctFunctionCalls[0].active = false;
      correctFunctionCalls[1].active = true;
      letScopes[0].active = false;
      letScopes[1].active = true;
      letScopes[2].active = false;
      correctFunctionCalls[1].result = 1;
    }, 3500);
    
    // Шаг 4: Вызов третьей функции
    setTimeout(() => {
      correctDemoStep.value = 4;
      correctFunctionCalls[1].active = false;
      correctFunctionCalls[2].active = true;
      letScopes[0].active = false;
      letScopes[1].active = false;
      letScopes[2].active = true;
      correctFunctionCalls[2].result = 2;
    }, 5000);
    
    // Шаг 5: Итог
    setTimeout(() => {
      correctDemoStep.value = 5;
      correctFunctionCalls[2].active = false;
      letScopes[0].active = true;
      letScopes[1].active = true;
      letScopes[2].active = true;
    }, 6500);
  }
  
  // Сброс демонстрации
  function resetDemo() {
    demoI.value = 0;
    demoStep.value = 0;
    correctDemoStep.value = 0;
    
    functionCalls.forEach(call => {
      call.active = false;
      call.result = null;
    });
    
    correctFunctionCalls.forEach(call => {
      call.active = false;
      call.result = null;
    });
    
    letScopes.forEach(scope => {
      scope.active = false;
    });
  }
  
  // Интерактивная демонстрация корзины покупок
  const newItem = reactive({
    name: '',
    price: 0,
    quantity: 1
  });
  
  const cartItems = ref([]);
  const cartTotal = ref(0);
  
  function addToCart() {
    if (!newItem.name || newItem.price <= 0 || newItem.quantity <= 0) {
      return;
    }
    
    cartItems.value.push({
      name: newItem.name,
      price: newItem.price,
      quantity: newItem.quantity
    });
    
    recalculateTotal();
    
    // Сброс формы
    newItem.name = '';
    newItem.price = 0;
    newItem.quantity = 1;
  }
  
  function removeFromCart(name) {
    const index = cartItems.value.findIndex(item => item.name === name);
    if (index !== -1) {
      cartItems.value.splice(index, 1);
      recalculateTotal();
    }
  }
  
  function recalculateTotal() {
    cartTotal.value = cartItems.value.reduce(
      (sum, item) => sum + item.price * item.quantity, 
      0
    );
  }
  
  function showCart() {
    console.log('Содержимое корзины:', cartItems.value);
    console.log('Итого:', cartTotal.value);
  }
  
  function resetCart() {
    cartItems.value = [];
    cartTotal.value = 0;
  }
  </script>
  
  <style scoped>
  .closures-explorer {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    color: #000;
    background-color: #fff;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    line-height: 1.6;
  }
  
  .main-title {
    text-align: center;
    color: #333;
    font-size: 2.2em;
    margin-bottom: 10px;
  }
  
  .main-description {
    text-align: center;
    color: #666;
    font-size: 1.2em;
    margin-bottom: 30px;
  }
  
  /* Вкладки */
  .tabs {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 30px;
  }
  
  .tab-button {
    padding: 12px 20px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
    transition: all 0.3s ease;
  }
  
  .tab-button:hover {
    background-color: #e0e0e0;
  }
  
  .tab-button.active {
    background-color: #4a6fa5;
    color: white;
  }
  
  .tab-content {
    animation: fadeIn 0.5s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Блоки концепций */
  .concept-block {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .definition, .key-insight {
    margin-bottom: 20px;
  }
  
  .key-insight {
    background-color: #e6f7ff;
    border-left: 4px solid #1890ff;
    padding: 15px;
    border-radius: 0 8px 8px 0;
  }
  
  h2 {
    color: #333;
    border-bottom: 2px solid #4a6fa5;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  
  h3 {
    color: #444;
    margin-top: 25px;
    margin-bottom: 15px;
  }
  
  /* Примеры кода */
  .code-example {
    margin-bottom: 40px;
  }
  
  .code {
    background-color: #f8f8f8;
    border-radius: 6px;
    padding: 15px;
    overflow-x: auto;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 14px;
    line-height: 1.5;
    border: 1px solid #e0e0e0;
    color: #000;
  }
  
  .example-explanation {
    margin-top: 15px;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 6px;
    border-left: 4px solid #4a6fa5;
  }
  
  /* Визуализация */
  .visual {
    margin: 30px 0;
  }
  
  .visualization {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .outer-func {
    position: relative;
    width: 300px;
    border: 2px solid #4a6fa5;
    border-radius: 8px;
    padding: 15px;
    background-color: #f0f7ff;
  }
  
  .func-name {
    font-weight: bold;
    margin-bottom: 10px;
    font-family: monospace;
  }
  
  .lexical-env {
    background-color: #fff;
    border: 1px dashed #4a6fa5;
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 15px;
  }
  
  .variable {
    font-family: monospace;
  }
  
  .value {
    color: #d32f2f;
  }
  
  .inner-func {
    border: 2px solid #f57c00;
    border-radius: 8px;
    padding: 15px;
    background-color: #fff8e1;
    position: relative;
  }
  
  .closure-arrow {
    position: absolute;
    right: -40px;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .explanation {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  
  /* Сравнение */
  .comparison {
    display: flex;
    gap: 20px;
  }
  
  .column {
    flex: 1;
  }
  
  /* Интерактивная демонстрация */
  .interactive-demo {
    margin-top: 30px;
  }
  
  .demo-container {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .demo-controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .demo-button {
    padding: 8px 16px;
    background-color: #4a6fa5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .demo-button:hover {
    background-color: #3d5c8c;
  }
  
  .demo-visualization {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .execution-context {
    background-color: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 15px;
  }
  
  .context-title, .scope-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }
  
  .context-content, .scope-content {
    padding: 10px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #e0e0e0;
  }
  
  .variable-container {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-family: monospace;
  }
  
  .variable-name {
    font-weight: bold;
    margin-right: 10px;
  }
  
  .lexical-scope {
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
    border-radius: 6px;
    padding: 15px;
  }
  
  .lexical-scopes {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .scope-row {
    display: flex;
    gap: 15px;
    overflow-x: auto;
    padding-bottom: 10px;
  }
  
  .scope-block {
    background-color: #f0f7ff;
    border: 1px solid #bae7ff;
    border-radius: 6px;
    padding: 10px;
    min-width: 200px;
    opacity: 0.7;
    transition: all 0.3s ease;
  }
  
  .scope-block.active-scope {
    border-color: #40a9ff;
    box-shadow: 0 0 5px rgba(64, 169, 255, 0.5);
    opacity: 1;
  }
  
  .function-calls {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .function-call {
    background-color: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 10px;
    display: flex;
    align-items: center;
    position: relative;
  }
  
  .function-call.active-call {
    background-color: #f0f7ff;
    border-color: #91d5ff;
  }
  
  .call-code {
    font-family: monospace;
    margin-right: 10px;
  }
  
  .call-result {
    color: #389e0d;
    font-family: monospace;
  }
  
  .call-arrow {
    position: absolute;
    right: 10px;
  }
  
  .demo-explanation {
    background-color: #f9f9f9;
    border-radius: 6px;
    padding: 15px;
    border-left: 4px solid #4a6fa5;
    min-height: 80px;
  }
  
  /* Решения проблемы */
  .solution-approaches {
    margin-bottom: 20px;
  }
  
  .approach {
    margin-bottom: 15px;
  }
  
  .approach h4 {
    color: #4a6fa5;
    margin-bottom: 5px;
  }
  
  /* Примеры из реальной жизни */
  .use-cases {
    list-style-type: none;
    padding: 0;
  }
  
  .use-cases li {
    margin-bottom: 10px;
    padding-left: 20px;
    position: relative;
  }
  
  .use-cases li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #4a6fa5;
  }
  
  /* Корзина покупок демо */
  .shopping-cart-demo {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
  }
  
  .cart-actions {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .cart-form {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }
  
  .cart-form input {
    padding: 8px 12px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    flex: 1;
    min-width: 100px;
  }
  
  .cart-button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .cart-button.add {
    background-color: #52c41a;
    color: white;
  }
  
  .cart-button.view {
    background-color: #1890ff;
    color: white;
  }
  
  .cart-button.reset {
    background-color: #f5222d;
    color: white;
  }
  
  .cart-display {
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    overflow: hidden;
  }
  
  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .cart-header h4 {
    margin: 0;
  }
  
  .cart-total {
    font-weight: bold;
    color: #52c41a;
  }
  
  .cart-items {
    padding: 15px;
    max-height: 300px;
    overflow-y: auto;
  }
  
  .empty-cart {
    text-align: center;
    color: #999;
    padding: 20px 0;
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  
  .item-name {
    font-weight: bold;
  }
  
  .item-details {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .remove-button {
    padding: 4px 8px;
    background-color: #ff4d4f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8em;
  }
  
  .cart-explanation {
    margin-top: 20px;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 6px;
    border-left: 4px solid #4a6fa5;
  }
  
  /* Подводные камни */
  .pitfalls-list, .techniques-list {
    list-style-type: none;
    padding: 0;
  }
  
  .pitfalls-list li, .techniques-list li {
    margin-bottom: 10px;
    padding-left: 25px;
    position: relative;
  }
  
  .pitfalls-list li::before {
    content: "⚠️";
    position: absolute;
    left: 0;
  }
  
  .techniques-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #52c41a;
  }
  
  .optimization-techniques {
    margin-top: 30px;
    border-top: 1px solid #e0e0e0;
    padding-top: 20px;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .comparison {
      flex-direction: column;
    }
    
    .cart-form {
      flex-direction: column;
      align-items: stretch;
    }
    
    .cart-form input {
      width: 100%;
    }
    
    .cart-item {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .item-details {
      width: 100%;
      justify-content: space-between;
      margin-top: 10px;
    }
    
    .scope-row {
      flex-direction: column;
    }
  }
  </style>