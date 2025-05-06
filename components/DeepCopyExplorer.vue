<template>
    <div class="deep-copy-explorer">
      <h1>Глубокое копирование объектов в JavaScript</h1>
      <p class="intro">
        Исследуем методы создания глубоких копий объектов и решаем проблему вложенных ссылок
      </p>
  
      <div class="tabs">
        <button 
          v-for="(tab, index) in tabs" 
          :key="index"
          :class="{ active: currentTab === index }"
          @click="changeTab(index)"
        >
          {{ tab.name }}
        </button>
      </div>
  
      <!-- 1. Проблема копирования объектов -->
      <div v-if="currentTab === 0" class="tab-content">
        <h2>Проблема копирования объектов</h2>
        
        <div class="explanation-card">
          <p>
            В JavaScript объекты и массивы копируются <strong>по ссылке</strong>, а не по значению. 
            Это значит, что при простом присваивании <code>b = a</code> вы получаете не копию объекта, 
            а ссылку на тот же объект в памяти.
          </p>
        </div>
  
        <div class="code-demo">
          <div class="code-section">
            <h3>Пример проблемы:</h3>
            <pre><code>const original = {
    name: "Оригинал",
    nested: { 
      value: 42 
    }
  };
  
  // Попытка копирования
  const copy = original;
  
  // Изменение копии
  copy.nested.value = 100;
  
  // Проверка оригинала
  console.log(original.nested.value); // 100 😱</code></pre>
          </div>
  
          <div class="visualization">
            <div class="memory-model">
              <div class="obj-container" :class="{ highlight: shallowCopyStep === 1 }">
                <div class="obj-title">original</div>
                <div class="obj-content">
                  <div class="obj-prop">name: "Оригинал"</div>
                  <div class="obj-prop nested">
                    <span>nested:</span>
                    <div class="nested-obj" :class="{ modified: shallowCopyStep >= 3 }">
                      <div class="obj-prop">value: {{ shallowCopyStep >= 3 ? '100' : '42' }}</div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div class="copy-arrow" :class="{ active: shallowCopyStep >= 2 }">
                <div class="arrow-line"></div>
                <div class="arrow-text">Копирование по ссылке</div>
              </div>
  
              <div class="obj-container copy" :class="{ active: shallowCopyStep >= 2, highlight: shallowCopyStep === 3 }">
                <div class="obj-title">copy</div>
                <div class="obj-content">
                  <div class="obj-prop">name: "Оригинал"</div>
                  <div class="obj-prop nested">
                    <span>nested:</span>
                    <div class="nested-obj" :class="{ modified: shallowCopyStep >= 3 }">
                      <div class="obj-prop">value: {{ shallowCopyStep >= 3 ? '100' : '42' }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <div class="controls">
              <button @click="runShallowCopyDemo" :disabled="shallowCopyAnimating">
                {{ shallowCopyStep === 0 ? 'Запустить демонстрацию' : 'Перезапустить' }}
              </button>
            </div>
  
            <div class="explanation-steps">
              <div class="step" :class="{ active: shallowCopyStep >= 1 }">
                <div class="step-num">1</div>
                <div class="step-content">Создаём исходный объект с вложенной структурой</div>
              </div>
              <div class="step" :class="{ active: shallowCopyStep >= 2 }">
                <div class="step-num">2</div>
                <div class="step-content">При присваивании <code>copy = original</code> создаётся ссылка на тот же объект</div>
              </div>
              <div class="step" :class="{ active: shallowCopyStep >= 3 }">
                <div class="step-num">3</div>
                <div class="step-content">Изменение свойства в копии меняет и оригинал, так как это один и тот же объект</div>
              </div>
              <div class="step" :class="{ active: shallowCopyStep >= 4 }">
                <div class="step-num">4</div>
                <div class="step-content">Нам нужен способ создания независимой глубокой копии со своими значениями</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 2. Методы копирования -->
      <div v-if="currentTab === 1" class="tab-content">
        <h2>Методы копирования объектов</h2>
  
        <div class="method-tabs">
          <button 
            v-for="(method, index) in copyMethods" 
            :key="index"
            :class="{ active: currentMethod === index }"
            @click="changeMethod(index)"
          >
            {{ method.name }}
          </button>
        </div>
  
        <div class="method-content">
          <h3>{{ copyMethods[currentMethod].name }}</h3>
          <div class="explanation-card" v-html="copyMethods[currentMethod].description"></div>
  
          <div class="code-demo">
            <div class="code-section">
              <h4>Пример:</h4>
              <pre><code>{{ copyMethods[currentMethod].code }}</code></pre>
            </div>
  
            <div class="method-details">
              <div class="pros-cons">
                <div class="pros">
                  <h4>Преимущества:</h4>
                  <ul>
                    <li v-for="(pro, i) in copyMethods[currentMethod].pros" :key="i">{{ pro }}</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>Недостатки:</h4>
                  <ul>
                    <li v-for="(con, i) in copyMethods[currentMethod].cons" :key="i">{{ con }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 3. Глубокое копирование: рекурсивный алгоритм -->
      <div v-if="currentTab === 2" class="tab-content">
        <h2>Рекурсивный алгоритм глубокого копирования</h2>
  
        <div class="explanation-card">
          <p>
            Давайте разберём пошагово, как создать универсальную функцию глубокого копирования с помощью рекурсии.
            Это самый гибкий подход, который позволяет понять суть процесса копирования.
          </p>
        </div>
  
        <div class="algorithm-steps">
          <div class="step-card" :class="{ active: algorithmStep >= 1 }">
            <div class="step-header">
              <div class="step-num">1</div>
              <h3>Проверка типа входных данных</h3>
            </div>
            <div class="step-content">
              <p>Проверяем тип входного значения и определяем, как его обрабатывать:</p>
              <pre><code>function deepCopy(value) {
    // Проверка на null или примитивное значение
    if (value === null || typeof value !== 'object') {
      return value;
    }
    
    // Дальнейшая логика...
  }</code></pre>
            </div>
          </div>
  
          <div class="step-card" :class="{ active: algorithmStep >= 2 }">
            <div class="step-header">
              <div class="step-num">2</div>
              <h3>Создание новой структуры данных</h3>
            </div>
            <div class="step-content">
              <p>Создаём новый массив или объект в зависимости от типа входных данных:</p>
              <pre><code>function deepCopy(value) {
    if (value === null || typeof value !== 'object') {
      return value;
    }
    
    // Создаём новый контейнер в зависимости от типа
    const result = Array.isArray(value) ? [] : {};
    
    // Дальнейшая логика...
  }</code></pre>
            </div>
          </div>
  
          <div class="step-card" :class="{ active: algorithmStep >= 3 }">
            <div class="step-header">
              <div class="step-num">3</div>
              <h3>Рекурсивное копирование свойств</h3>
            </div>
            <div class="step-content">
              <p>Обходим все свойства объекта и рекурсивно копируем их значения:</p>
              <pre><code>function deepCopy(value) {
    if (value === null || typeof value !== 'object') {
      return value;
    }
    
    const result = Array.isArray(value) ? [] : {};
    
    // Обходим все свойства и рекурсивно копируем значения
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = deepCopy(value[key]);
      }
    }
    
    return result;
  }</code></pre>
            </div>
          </div>
  
          <div class="step-card" :class="{ active: algorithmStep >= 4 }">
            <div class="step-header">
              <div class="step-num">4</div>
              <h3>Улучшения и обработка особых случаев</h3>
            </div>
            <div class="step-content">
              <p>Обработка особых типов данных (Date, RegExp и т.д.) и предотвращение зацикливания:</p>
              <pre><code>function deepCopy(value, visited = new WeakMap()) {
    // Примитивы и null
    if (value === null || typeof value !== 'object') {
      return value;
    }
    
    // Обработка встроенных объектов
    if (value instanceof Date) return new Date(value);
    if (value instanceof RegExp) return new RegExp(value.source, value.flags);
    
    // Защита от циклических ссылок
    if (visited.has(value)) {
      return visited.get(value);
    }
    
    const result = Array.isArray(value) ? [] : {};
    
    // Сохраняем соответствие оригинального и нового объектов
    visited.set(value, result);
    
    // Рекурсивное копирование свойств
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = deepCopy(value[key], visited);
      }
    }
    
    return result;
  }</code></pre>
            </div>
          </div>
        </div>
  
        <div class="controls algorithm-controls">
          <button 
            v-for="step in 4" 
            :key="'step-' + step" 
            @click="algorithmStep = step"
            :class="{ active: algorithmStep === step }"
          >
            Шаг {{ step }}
          </button>
          <button @click="algorithmStep = 0" :class="{ active: algorithmStep === 0 }">Сбросить</button>
        </div>
      </div>
  
      <!-- 4. Интерактивная демонстрация -->
      <div v-if="currentTab === 3" class="tab-content">
        <h2>Интерактивная демонстрация</h2>
  
        <div class="interactive-demo">
          <div class="demo-container">
            <div class="source-container">
              <h3>Исходный объект</h3>
              <pre class="object-viewer"><code>{{ JSON.stringify(demoSource, null, 2) }}</code></pre>
            </div>
  
            <div class="copy-process">
              <div class="copy-animation" :class="{ active: demoStep > 0 }">
                <div class="animation-objects">
                  <div class="object-node" v-for="(node, index) in animationNodes" :key="index"
                    :class="{ active: demoStep >= node.step, processed: demoStep > node.step }">
                    {{ node.label }}
                  </div>
                </div>
                <div class="animation-links">
                  <svg width="100%" height="100%" class="links-svg">
                    <path v-for="(link, index) in animationLinks" :key="index"
                      :d="link.path"
                      :class="{ active: demoStep >= link.step }"
                      fill="none" stroke="#3498db" stroke-width="2"></path>
                  </svg>
                </div>
              </div>
              <div class="copy-controls">
                <button @click="startDemo" :disabled="demoAnimating">Запустить копирование</button>
                <button @click="resetDemo" :disabled="demoAnimating || demoStep === 0">Сбросить</button>
              </div>
            </div>
  
            <div class="result-container">
              <h3>Результат копирования</h3>
              <pre class="object-viewer"><code>{{ demoStep > 0 ? JSON.stringify(demoResult, null, 2) : 'Ожидаем копирования...' }}</code></pre>
            </div>
          </div>
  
          <div class="demo-explanation">
            <h3>Процесс копирования</h3>
            <div class="demo-steps">
              <div v-for="step in demoExplanationSteps" :key="step.step"
                class="demo-step" :class="{ active: demoStep >= step.step }">
                <div class="step-num">{{ step.step }}</div>
                <div class="step-content">{{ step.text }}</div>
              </div>
            </div>
            <div class="verification-result" v-if="demoStep >= demoExplanationSteps.length">
              <h4>Проверка независимости копии</h4>
              <button @click="modifyOriginal" class="modify-button">Изменить оригинал</button>
              <button @click="modifyCopy" class="modify-button">Изменить копию</button>
              <div class="verification-message" v-if="verificationMessage">
                {{ verificationMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 5. Практическое применение -->
      <div v-if="currentTab === 4" class="tab-content">
        <h2>Практическое применение</h2>
  
        <div class="use-cases">
          <div class="use-case-card">
            <h3>1. Сохранение состояния в Redux/Vuex</h3>
            <p>
              Библиотеки управления состоянием требуют иммутабельного обновления данных.
              Глубокое копирование позволяет создать новую версию состояния для безопасного изменения.
            </p>
            <pre><code>// В reducer'е Redux
  function userReducer(state = initialState, action) {
    switch(action.type) {
      case 'UPDATE_USER_PROFILE':
        // Глубокое копирование и обновление
        const newState = deepCopy(state);
        newState.profile = {...newState.profile, ...action.payload};
        return newState;
      default:
        return state;
    }
  }</code></pre>
          </div>
  
          <div class="use-case-card">
            <h3>2. Отмена/повтор действий (Undo/Redo)</h3>
            <p>
              При реализации функциональности отмены/повтора действий необходимо
              сохранять независимые копии состояний для истории изменений.
            </p>
            <pre><code>class History {
    constructor() {
      this.states = [];
      this.currentIndex = -1;
    }
  
    saveState(state) {
      // Отсекаем все будущие состояния
      this.states = this.states.slice(0, this.currentIndex + 1);
      // Сохраняем глубокую копию текущего состояния
      this.states.push(deepCopy(state));
      this.currentIndex++;
    }
  
    undo() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        return deepCopy(this.states[this.currentIndex]);
      }
      return null;
    }
  
    redo() {
      if (this.currentIndex &lt; this.states.length - 1) {
        this.currentIndex++;
        return deepCopy(this.states[this.currentIndex]);
      }
      return null;
    }
  }</code></pre>
          </div>
  
          <div class="use-case-card">
            <h3>3. Кэширование данных</h3>
            <p>
              При кэшировании результатов API запросов важно создавать независимые копии данных,
              чтобы изменения в одной части приложения не влияли на данные в другой.
            </p>
            <pre><code>class DataCache {
    constructor() {
      this.cache = new Map();
    }
  
    set(key, data) {
      // Сохраняем копию данных, а не оригинал
      this.cache.set(key, deepCopy(data));
    }
  
    get(key) {
      const data = this.cache.get(key);
      // Возвращаем копию кэшированных данных
      return data ? deepCopy(data) : null;
    }
  }</code></pre>
          </div>
  
          <div class="use-case-card">
            <h3>4. Создание начальных данных для форм</h3>
            <p>
              При редактировании данных в формах часто требуется возможность сброса
              к начальным значениям. Глубокое копирование позволяет хранить независимую копию исходных данных.
            </p>
            <pre><code>class FormEditor {
    constructor(initialData) {
      // Сохраняем глубокую копию начальных данных
      this.initialData = deepCopy(initialData);
      // Создаём копию для редактирования
      this.formData = deepCopy(initialData);
    }
  
    updateField(path, value) {
      // Обновляем поле в редактируемой копии
      setNestedValue(this.formData, path, value);
    }
  
    reset() {
      // Сбрасываем к начальным данным (создаём новую копию)
      this.formData = deepCopy(this.initialData);
    }
  
    save() {
      // Возвращаем копию измененных данных
      return deepCopy(this.formData);
    }
  }</code></pre>
          </div>
        </div>
      </div>
  
      <!-- 6. Подводные камни и оптимизации -->
      <div v-if="currentTab === 5" class="tab-content">
        <h2>Подводные камни и оптимизации</h2>
  
        <div class="pitfalls-section">
          <div class="pitfall-card">
            <h3>Циклические ссылки</h3>
            <div class="pitfall-content">
              <p>
                Объекты в JavaScript могут содержать циклические ссылки, когда свойство объекта
                прямо или косвенно ссылается на сам объект. Наивное рекурсивное копирование
                вызовет бесконечную рекурсию.
              </p>
              <div class="pitfall-example">
                <pre><code>// Объект с циклической ссылкой
  const cyclical = { name: "Цикл" };
  cyclical.self = cyclical; // Ссылка на себя
  
  // Наивное копирование вызовет ошибку:
  // Uncaught RangeError: Maximum call stack size exceeded</code></pre>
                <div class="solution">
                  <h4>Решение:</h4>
                  <p>
                    Использовать <code>WeakMap</code> для отслеживания уже скопированных объектов
                    и предотвращения повторного копирования.
                  </p>
                  <pre><code>function deepCopy(value, visited = new WeakMap()) {
    if (value === null || typeof value !== 'object') {
      return value;
    }
    
    // Если объект уже копировался, возвращаем копию
    if (visited.has(value)) {
      return visited.get(value);
    }
    
    const result = Array.isArray(value) ? [] : {};
    
    // Сохраняем текущий объект и его копию
    visited.set(value, result);
    
    // ... копирование свойств
    
    return result;
  }</code></pre>
                </div>
              </div>
            </div>
          </div>
  
          <div class="pitfall-card">
            <h3>Специальные типы объектов</h3>
            <div class="pitfall-content">
              <p>
                JavaScript содержит множество встроенных типов, таких как Date, RegExp, Map, Set, 
                которые требуют специального подхода при копировании.
              </p>
              <div class="pitfall-example">
                <pre><code>// Проблема с копированием Date
  const originalDate = new Date();
  const badCopy = { ...originalDate }; // Теряем методы Date
  const badCopy2 = JSON.parse(JSON.stringify({ date: originalDate })); 
  // ^ превращается в строку!</code></pre>
                <div class="solution">
                  <h4>Решение:</h4>
                  <p>
                    Добавить проверки на специальные типы данных и использовать
                    соответствующие конструкторы.
                  </p>
                  <pre><code>function deepCopy(value, visited = new WeakMap()) {
    // Обработка простых значений
    if (value === null || typeof value !== 'object') {
      return value;
    }
    
    // Обработка встроенных типов
    if (value instanceof Date) return new Date(value);
    if (value instanceof RegExp) return new RegExp(value.source, value.flags);
    if (value instanceof Map) {
      const mapCopy = new Map();
      visited.set(value, mapCopy);
      value.forEach((val, key) => {
        mapCopy.set(deepCopy(key, visited), deepCopy(val, visited));
      });
      return mapCopy;
    }
    if (value instanceof Set) {
      const setCopy = new Set();
      visited.set(value, setCopy);
      value.forEach(val => {
        setCopy.add(deepCopy(val, visited));
      });
      return setCopy;
    }
    
    // Обычные объекты и массивы...
  }</code></pre>
                </div>
              </div>
            </div>
          </div>
  
          <div class="pitfall-card">
            <h3>Производительность</h3>
            <div class="pitfall-content">
              <p>
                Глубокое копирование может быть ресурсоёмкой операцией для больших 
                и сложных объектов. Иногда можно оптимизировать процесс.
              </p>
              <div class="solution">
                <h4>Оптимизации:</h4>
                <ul>
                  <li>
                    <strong>Избирательное копирование:</strong> Копировать только необходимые свойства.
                  </li>
                  <li>
                    <strong>Иммутабельные структуры данных:</strong> Использовать библиотеки типа Immutable.js.
                  </li>
                  <li>
                    <strong>Мемоизация:</strong> Кэшировать результаты копирования для повторного использования.
                  </li>
                  <li>
                    <strong>Многоуровневое копирование:</strong> Копировать глубоко только части объекта, которые могут изменяться.
                  </li>
                  <li>
                    <strong>Использование структурного обмена:</strong> structuredClone() более оптимизирован для глубокого копирования.
                  </li>
                </ul>
              </div>
            </div>
          </div>
  
          <div class="pitfall-card">
            <h3>Проблемы с функциями и DOM-элементами</h3>
            <div class="pitfall-content">
              <p>
                Функции и DOM-элементы не могут быть корректно скопированы большинством методов глубокого копирования.
              </p>
              <div class="pitfall-example">
                <pre><code>const obj = {
    method: function() { return this.value; },
    domElement: document.createElement('div'),
    value: 42
  };
  
  // Проблемы:
  // 1. JSON.stringify/parse не сохранит функцию и DOM-элемент
  // 2. structuredClone не поддерживает функции
  // 3. Даже рекурсивное копирование не даст корректного результата</code></pre>
                <div class="solution">
                  <h4>Возможные подходы:</h4>
                  <ul>
                    <li>
                      <strong>Явное управление:</strong> Не копировать функции и DOM-элементы, 
                      а добавлять их вручную после копирования остальной структуры.
                    </li>
                    <li>
                      <strong>Сериализуемые альтернативы:</strong> Хранить информацию о функциях/элементах
                      в сериализуемом формате, который можно восстановить.
                    </li>
                    <li>
                      <strong>Библиотеки:</strong> Использовать специализированные библиотеки, которые
                      могут лучше обрабатывать эти случаи.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 7. Финальное решение -->
      <div v-if="currentTab === 6" class="tab-content">
        <h2>Финальное решение задачи</h2>
  
        <div class="final-solution">
          <div class="task-description">
            <h3>Задача:</h3>
            <pre><code>// исходный объект, который нужно скопировать
  // значение "a" может быть массивом, объектом или примитивом
  // вложенность "а" может быть бесконечной
  const a = [
    {
      name: "6x45",
      draw: {
        cost: 50,
        multiDraws: [1, 2, 3],
      },
      count: null,
    },
    {
      name: "7x49",
      draw: {
        cost: 75,
        multiDraws: [{ c: 13 }, 5, 6],
      },
      count: 10,
    },
  ];
  
  const b = copy(a);
  
  function copy() {
    //написать функцию copy
  }
  
  // ниже проверка, что объект "а" действительно был скопирован в новый объект
  if (b) b[1].draw.multiDraws[0].c = "369";
  console.log(" ORIG: ", JSON.stringify(a), "\n\n", "COPY: ", JSON.stringify(b));</code></pre>
          </div>
  
          <div class="solution-implementation">
            <h3>Решение:</h3>
            <p>Исходя из требований задачи, мы реализуем функцию глубокого копирования, которая:</p>
            <ul>
              <li>Корректно обрабатывает массивы, объекты и примитивы</li>
              <li>Справляется с неограниченной вложенностью</li>
              <li>Создаёт настоящую глубокую копию (b[1].draw.multiDraws[0].c = "369" не должен влиять на a)</li>
            </ul>
  
            <pre><code>function copy(value, visited = new WeakMap()) {
    // Обработка null и примитивных значений
    if (value === null || typeof value !== 'object') {
      return value;
    }
    
    // Защита от циклических ссылок
    if (visited.has(value)) {
      return visited.get(value);
    }
    
    // Определяем тип и создаём соответствующий контейнер
    const result = Array.isArray(value) ? [] : {};
    
    // Сохраняем соответствие между оригиналом и копией
    visited.set(value, result);
    
    // Копируем все свойства рекурсивно
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = copy(value[key], visited);
      }
    }
    
    return result;
  }</code></pre>
  
            <div class="solution-test">
              <h3>Проверка решения:</h3>
              <div class="test-result">
                <pre><code>// Создаём тестовые данные из условия задачи
  const a = [
    {
      name: "6x45",
      draw: {
        cost: 50,
        multiDraws: [1, 2, 3],
      },
      count: null,
    },
    {
      name: "7x49",
      draw: {
        cost: 75,
        multiDraws: [{ c: 13 }, 5, 6],
      },
      count: 10,
    },
  ];
  
  // Применяем нашу функцию копирования
  const b = copy(a);
  
  // Модифицируем копию
  if (b) b[1].draw.multiDraws[0].c = "369";
  
  // Результат:
  // ORIG: [{"name":"6x45","draw":{"cost":50,"multiDraws":[1,2,3]},"count":null},{"name":"7x49","draw":{"cost":75,"multiDraws":[{"c":13},5,6]},"count":10}]
  // 
  // COPY: [{"name":"6x45","draw":{"cost":50,"multiDraws":[1,2,3]},"count":null},{"name":"7x49","draw":{"cost":75,"multiDraws":[{"c":"369"},5,6]},"count":10}]
  
  // Изменение в b не повлияло на a - задача решена!</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue';
  
  // Основные разделы (табы)
  const tabs = [
    { name: "Проблема" },
    { name: "Методы копирования" },
    { name: "Алгоритм" },
    { name: "Демонстрация" },
    { name: "Применение" },
    { name: "Подводные камни" },
    { name: "Решение" }
  ];
  const currentTab = ref(0);
  
  // Демонстрация проблемы с копированием по ссылке
  const shallowCopyStep = ref(0);
  const shallowCopyAnimating = ref(false);
  
  function runShallowCopyDemo() {
    if (shallowCopyAnimating.value) return;
    
    shallowCopyAnimating.value = true;
    shallowCopyStep.value = 0;
    
    // Последовательно показываем шаги с задержкой
    setTimeout(() => { shallowCopyStep.value = 1; }, 500);
    setTimeout(() => { shallowCopyStep.value = 2; }, 1500);
    setTimeout(() => { shallowCopyStep.value = 3; }, 2500);
    setTimeout(() => { shallowCopyStep.value = 4; }, 3500);
    setTimeout(() => { shallowCopyAnimating.value = false; }, 4000);
  }
  
  // Методы копирования
  const copyMethods = [
    {
      name: "Поверхностное копирование (Object.assign)",
      description: `
        <p>Метод <code>Object.assign()</code> создаёт неглубокую (поверхностную) копию объекта - 
        копируются только свойства верхнего уровня, а вложенные объекты передаются по ссылке.</p>
        <p>Это решает проблему лишь частично: изменения во вложенных объектах всё равно будут влиять на оригинал.</p>
      `,
      code: `const original = {
    name: "Оригинал",
    nested: { value: 42 }
  };
  
  // Создание поверхностной копии
  const shallowCopy = Object.assign({}, original);
  
  // Изменение свойства верхнего уровня
  shallowCopy.name = "Копия"; // Не влияет на оригинал
  
  // Изменение вложенного свойства
  shallowCopy.nested.value = 100; // Влияет на оригинал!
  
  console.log(original.name); // "Оригинал"
  console.log(original.nested.value); // 100 (изменилось!)`,
      pros: [
        "Простой синтаксис",
        "Быстрая работа",
        "Встроенная функция JavaScript"
      ],
      cons: [
        "Копирует только первый уровень свойств",
        "Вложенные объекты остаются связанными с оригиналом",
        "Не решает проблему глубокого копирования"
      ]
    },
    {
      name: "Оператор spread {...}",
      description: `
        <p>Оператор spread <code>{...obj}</code> также создаёт поверхностную копию объекта.
        Он эквивалентен <code>Object.assign()</code>, но имеет более краткий синтаксис.</p>
        <p>Имеет те же ограничения: вложенные объекты копируются по ссылке.</p>
      `,
      code: `const original = {
    name: "Оригинал",
    nested: { value: 42 }
  };
  
  // Создание поверхностной копии через spread
  const shallowCopy = { ...original };
  
  // Изменение свойства верхнего уровня
  shallowCopy.name = "Копия"; // Не влияет на оригинал
  
  // Изменение вложенного свойства
  shallowCopy.nested.value = 100; // Влияет на оригинал!
  
  console.log(original.name); // "Оригинал"
  console.log(original.nested.value); // 100 (изменилось!)`,
      pros: [
        "Современный и компактный синтаксис",
        "Более читаемый код",
        "Быстрая работа",
        "Хорошо подходит для простых объектов"
      ],
      cons: [
        "Создаёт только поверхностную копию",
        "Вложенные объекты сохраняют связь с оригиналом",
        "Не работает со сложными структурами данных"
      ]
    },
    {
      name: "JSON.parse + JSON.stringify",
      description: `
        <p>Один из популярных способов глубокого копирования - преобразовать объект в JSON-строку, а затем обратно в объект.
        Этот метод создаёт полностью независимую копию всей структуры данных.</p>
        <p>Однако у него есть существенные ограничения: не копируются функции, undefined значения, циклические ссылки и специальные объекты.</p>
      `,
      code: `const original = {
    name: "Оригинал",
    nested: { value: 42 },
    date: new Date(),        // Станет строкой!
    method: function() {},   // Будет потеряна!
    undef: undefined         // Будет потеряна!
  };
  
  // Преобразование в JSON и обратно
  const deepCopy = JSON.parse(JSON.stringify(original));
  
  // Изменение вложенного свойства
  deepCopy.nested.value = 100; // Не влияет на оригинал
  
  console.log(original.nested.value); // 42 (не изменилось)
  console.log(typeof deepCopy.method); // undefined (функция потеряна)
  console.log(deepCopy.date instanceof Date); // false (стала строкой)`,
      pros: [
        "Простой способ глубокого копирования",
        "Не требует дополнительных библиотек",
        "Работает для большинства данных",
        "Один из самых быстрых методов для сложных объектов"
      ],
      cons: [
        "Не копирует функции",
        "Не сохраняет undefined значения",
        "Не работает с циклическими ссылками",
        "Преобразует Date в строку",
        "Не сохраняет Map, Set, RegExp и другие специальные объекты"
      ]
    },
    {
      name: "structuredClone()",
      description: `
        <p>Современный встроенный метод для глубокого копирования объектов. 
        Появился в стандарте JavaScript относительно недавно (2022).</p>
        <p>Поддерживает циклические ссылки и большинство встроенных объектов, но не может копировать функции.</p>
      `,
      code: `const original = {
    name: "Оригинал",
    nested: { value: 42 },
    date: new Date(),        // Корректно копируется!
    regex: /test/g,          // Корректно копируется!
    cyclical: null,          // Циклическая ссылка
    method: function() {}    // Не будет скопирована!
  };
  
  // Создаём циклическую ссылку
  original.cyclical = original;
  
  try {
    // Глубокое клонирование
    const deepCopy = structuredClone(original);
    
    // Проверка циклической ссылки
    console.log(deepCopy.cyclical === deepCopy); // true (сохранена структура)
    
    // Проверка вложенного свойства
    deepCopy.nested.value = 100;
    console.log(original.nested.value); // 42 (не изменилось)
    
    console.log(typeof deepCopy.method); // undefined (функция потеряна)
  } catch (e) {
    console.error("Ошибка при копировании:", e.message);
  }`,
      pros: [
        "Встроенный метод современного JavaScript",
        "Поддерживает циклические ссылки",
        "Корректно копирует встроенные типы (Date, RegExp и др.)",
        "Высокая производительность"
      ],
      cons: [
        "Не копирует функции",
        "Не копирует DOM-элементы",
        "Относительно новый метод (может не поддерживаться старыми браузерами)",
        "Может вызвать ошибку на слишком больших объектах"
      ]
    },
    {
      name: "Рекурсивное копирование",
      description: `
        <p>Ручная реализация глубокого копирования с помощью рекурсии.
        Этот подход даёт максимальный контроль над процессом копирования.</p>
        <p>Позволяет обрабатывать специальные случаи и типы данных по необходимости.</p>
      `,
      code: `function deepCopy(value, visited = new WeakMap()) {
    // Примитивные значения и null
    if (value === null || typeof value !== 'object') {
      return value;
    }
    
    // Обработка циклических ссылок
    if (visited.has(value)) {
      return visited.get(value);
    }
    
    // Обработка специальных типов
    if (value instanceof Date) return new Date(value);
    if (value instanceof RegExp) return new RegExp(value.source, value.flags);
    if (value instanceof Map) {
      const mapCopy = new Map();
      visited.set(value, mapCopy);
      value.forEach((val, key) => {
        mapCopy.set(deepCopy(key, visited), deepCopy(val, visited));
      });
      return mapCopy;
    }
    if (value instanceof Set) {
      const setCopy = new Set();
      visited.set(value, setCopy);
      value.forEach(val => {
        setCopy.add(deepCopy(val, visited));
      });
      return setCopy;
    }
    
    // Массивы и обычные объекты
    const result = Array.isArray(value) ? [] : {};
    visited.set(value, result);
    
    // Рекурсивное копирование свойств
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = deepCopy(value[key], visited);
      }
    }
    
    return result;
  }
  
  const original = {
    name: "Оригинал",
    nested: { value: 42 },
    date: new Date(),
    array: [1, { x: 10 }],
    cyclical: null
  };
  
  // Создаём циклическую ссылку
  original.cyclical = original;
  
  // Глубокое копирование
  const deepCopy = deepCopy(original);
  
  // Проверка
  deepCopy.nested.value = 100;
  deepCopy.array[1].x = 20;
  
  console.log(original.nested.value); // 42 (не изменилось)
  console.log(original.array[1].x); // 10 (не изменилось)`,
      pros: [
        "Полный контроль над процессом копирования",
        "Возможность обрабатывать любые типы данных",
        "Защита от циклических ссылок",
        "Гибкость и расширяемость",
        "Можно настроить под конкретные нужды проекта"
      ],
      cons: [
        "Требует больше кода",
        "Нужно самостоятельно обрабатывать разные типы данных",
        "Сложнее поддерживать",
        "Может быть медленнее встроенных методов на больших объектах"
      ]
    },
    {
      name: "Библиотеки (lodash, Immutable.js)",
      description: `
        <p>Для глубокого копирования можно использовать готовые библиотеки, которые предлагают
        оптимизированные и хорошо протестированные решения.</p>
        <p>Lodash предоставляет функцию <code>_.cloneDeep()</code>, которая выполняет полное глубокое копирование.
        Immutable.js предлагает полностью иммутабельные структуры данных.</p>
      `,
      code: `// Пример с использованием Lodash
  import _ from 'lodash';
  
  const original = {
    name: "Оригинал",
    nested: { value: 42 },
    date: new Date(),
    function: function() { return 'test'; },
    cyclical: null
  };
  
  // Создаём циклическую ссылку
  original.cyclical = original;
  
  // Глубокое копирование с Lodash
  const deepCopy = _.cloneDeep(original);
  
  // Проверка
  deepCopy.nested.value = 100;
  console.log(original.nested.value); // 42 (не изменилось)
  
  // Функция корректно скопирована
  console.log(deepCopy.function()); // 'test'
  
  // Циклическая ссылка сохранена
  console.log(deepCopy.cyclical === deepCopy); // true
  
  // Пример с Immutable.js
  import { fromJS } from 'immutable';
  
  // Создание иммутабельной структуры
  const immutableObj = fromJS(original);
  
  // Создание измененной версии (оригинал не меняется)
  const updatedObj = immutableObj.setIn(['nested', 'value'], 100);
  
  // Проверка
  console.log(immutableObj.getIn(['nested', 'value'])); // 42
  console.log(updatedObj.getIn(['nested', 'value'])); // 100`,
      pros: [
        "Оптимизированные решения",
        "Хорошо протестированы и поддерживаются",
        "Обрабатывают большинство краевых случаев",
        "Часто включают дополнительные возможности",
        "Иммутабельные структуры обеспечивают повышенную безопасность"
      ],
      cons: [
        "Увеличивают размер проекта",
        "Зависимость от внешнего кода",
        "Могут быть избыточными для простых случаев",
        "Нужно изучать API библиотеки"
      ]
    }
  ];
  const currentMethod = ref(0);
  
  // Шаги алгоритма
  const algorithmStep = ref(0);
  
  // Интерактивная демонстрация
  const demoSource = reactive([
    {
      name: "6x45",
      draw: {
        cost: 50,
        multiDraws: [1, 2, 3],
      },
      count: null,
    },
    {
      name: "7x49",
      draw: {
        cost: 75,
        multiDraws: [{ c: 13 }, 5, 6],
      },
      count: 10,
    },
  ]);
  
  const demoResult = reactive(null);
  const demoStep = ref(0);
  const demoAnimating = ref(false);
  const verificationMessage = ref('');
  
  // Шаги для объяснения демо
  const demoExplanationSteps = [
    { step: 1, text: "Анализ исходного объекта: определяем, что это массив с вложенными объектами" },
    { step: 2, text: "Создаём новый массив для копии" },
    { step: 3, text: "Обрабатываем первый элемент массива (объект)" },
    { step: 4, text: "Копируем свойства первого элемента" },
    { step: 5, text: "Обрабатываем вложенный объект 'draw'" },
    { step: 6, text: "Копируем вложенный массив 'multiDraws'" },
    { step: 7, text: "Обрабатываем второй элемент массива (объект)" },
    { step: 8, text: "Копируем свойства второго элемента" },
    { step: 9, text: "Обрабатываем вложенный объект 'draw'" },
    { step: 10, text: "Копируем вложенный массив 'multiDraws' с объектом внутри" },
    { step: 11, text: "Завершаем копирование — все структуры скопированы" }
  ];
  
  // Создаём анимационные узлы для визуализации
  const animationNodes = [
    { id: 'root', x: 200, y: 50, label: 'Array', step: 1 },
    { id: 'obj1', x: 100, y: 120, label: 'Object 1', step: 3 },
    { id: 'obj2', x: 300, y: 120, label: 'Object 2', step: 7 },
    { id: 'draw1', x: 100, y: 190, label: 'draw', step: 5 },
    { id: 'draw2', x: 300, y: 190, label: 'draw', step: 9 },
    { id: 'multi1', x: 100, y: 260, label: 'multiDraws', step: 6 },
    { id: 'multi2', x: 300, y: 260, label: 'multiDraws', step: 10 }
  ];
  
  // Создаём связи для анимации
  const animationLinks = [
    { from: 'root', to: 'obj1', path: 'M 200,65 L 120,110', step: 3 },
    { from: 'root', to: 'obj2', path: 'M 200,65 L 280,110', step: 7 },
    { from: 'obj1', to: 'draw1', path: 'M 100,135 L 100,175', step: 5 },
    { from: 'obj2', to: 'draw2', path: 'M 300,135 L 300,175', step: 9 },
    { from: 'draw1', to: 'multi1', path: 'M 100,205 L 100,245', step: 6 },
    { from: 'draw2', to: 'multi2', path: 'M 300,205 L 300,245', step: 10 }
  ];
  
  // Функция глубокого копирования для демонстрации
  function deepCopy(value, visited = new WeakMap()) {
    // Базовый случай: null или примитив
    if (value === null || typeof value !== 'object') {
      return value;
    }
    
    // Защита от циклических ссылок
    if (visited.has(value)) {
      return visited.get(value);
    }
    
    // Создаём новый массив или объект
    const result = Array.isArray(value) ? [] : {};
    
    // Сохраняем отношение между оригиналом и копией
    visited.set(value, result);
    
    // Рекурсивно копируем все свойства
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = deepCopy(value[key], visited);
      }
    }
    
    return result;
  }
  
  // Запуск демонстрации
  function startDemo() {
    if (demoAnimating.value) return;
    
    demoAnimating.value = true;
    demoStep.value = 0;
    verificationMessage.value = '';
    
    // Инициализируем пустой результат
    demoResult.value = null;
    
    // Последовательно показываем шаги процесса копирования
    const totalSteps = demoExplanationSteps.length;
    
    for (let i = 1; i <= totalSteps; i++) {
      setTimeout(() => {
        demoStep.value = i;
        
        // На последнем шаге выполняем реальное копирование
        if (i === totalSteps) {
          demoResult.value = deepCopy(demoSource);
          demoAnimating.value = false;
        }
      }, i * 1000);
    }
  }
  
  function resetDemo() {
    demoStep.value = 0;
    demoResult.value = null;
    verificationMessage.value = '';
  }
  
  // Функции для проверки независимости копии
  function modifyOriginal() {
    if (!demoResult.value) return;
    
    // Меняем значение в оригинале
    demoSource[0].draw.cost = 999;
    
    // Проверяем, что копия не изменилась
    if (demoResult.value[0].draw.cost !== 999) {
      verificationMessage.value = '✅ Копия не изменилась при модификации оригинала. Это настоящая глубокая копия!';
    } else {
      verificationMessage.value = '❌ Копия изменилась при модификации оригинала. Копирование работает неверно!';
    }
  }
  
  function modifyCopy() {
    if (!demoResult.value) return;
    
    // Меняем значение в копии
    demoResult.value[1].draw.multiDraws[0].c = 999;
    
    // Проверяем, что оригинал не изменился
    if (demoSource[1].draw.multiDraws[0].c !== 999) {
      verificationMessage.value = '✅ Оригинал не изменился при модификации копии. Это настоящая глубокая копия!';
    } else {
      verificationMessage.value = '❌ Оригинал изменился при модификации копии. Копирование работает неверно!';
    }
  }
  
  // Функции переключения
  function changeTab(index) {
    currentTab.value = index;
  }
  
  function changeMethod(index) {
    currentMethod.value = index;
  }
  
  onMounted(() => {
    // При необходимости, запускаем первую демонстрацию автоматически
    setTimeout(() => {
      runShallowCopyDemo();
    }, 1000);
  });
  </script>
  
  <style scoped>
  .deep-copy-explorer {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #333;
    background-color: #fff;
  }
  
  h1, h2, h3, h4 {
    color: #000;
    margin-top: 1.5em;
    margin-bottom: 0.8em;
  }
  
  h1 {
    font-size: 2.2rem;
    text-align: center;
    margin-top: 0.5em;
  }
  
  h2 {
    font-size: 1.8rem;
    border-bottom: 2px solid #3498db;
    padding-bottom: 0.3em;
  }
  
  h3 {
    font-size: 1.4rem;
    color: #2c3e50;
  }
  
  h4 {
    font-size: 1.1rem;
    color: #34495e;
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 1em;
  }
  
  .intro {
    font-size: 1.1rem;
    text-align: center;
    color: #666;
    margin-bottom: 30px;
  }
  
  /* Табы */
  .tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 30px;
  }
  
  .tabs button, .method-tabs button {
    padding: 10px 16px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .tabs button:hover, .method-tabs button:hover {
    background-color: #e9ecef;
  }
  
  .tabs button.active, .method-tabs button.active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }
  
  .tab-content {
    animation: fadeIn 0.5s ease;
  }
  
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  /* Карточки с объяснениями */
  .explanation-card {
    background-color: #f8f9fa;
    border-left: 4px solid #3498db;
    padding: 15px 20px;
    margin-bottom: 25px;
    border-radius: 4px;
  }
  
  /* Демонстрация кода */
  .code-demo {
    margin-bottom: 30px;
  }
  
  .code-section {
    background-color: #f8f9fa;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  
  .code-section h3, .code-section h4 {
    background-color: #343a40;
    color: white;
    margin: 0;
    padding: 10px 15px;
    font-size: 1rem;
  }
  
  .code-section pre {
    margin: 0;
    padding: 15px;
    background-color: #000;
    color: #f8f8f2;
    overflow-x: auto;
    border-radius: 0 0 8px 8px;
  }
  
  .code-section code {
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  /* Визуализация памяти */
  .visualization {
    margin-top: 25px;
  }
  
  .memory-model {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin-bottom: 20px;
    position: relative;
    min-height: 200px;
  }
  
  .obj-container {
    width: 180px;
    border: 2px solid #3498db;
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.5s ease;
  }
  
  .obj-container.copy {
    opacity: 0;
    transform: translateX(30px);
    border-color: #2ecc71;
  }
  
  .obj-container.copy.active {
    opacity: 1;
    transform: translateX(0);
  }
  
  .obj-title {
    background-color: #3498db;
    color: white;
    padding: 6px 10px;
    font-weight: bold;
  }
  
  .obj-container.copy .obj-title {
    background-color: #2ecc71;
  }
  
  .obj-content {
    padding: 10px;
  }
  
  .obj-prop {
    margin-bottom: 6px;
    font-family: monospace;
  }
  
  .obj-prop.nested {
    display: flex;
    flex-direction: column;
  }
  
  .nested-obj {
    margin-left: 15px;
    padding: 5px;
    border: 1px dashed #3498db;
    border-radius: 4px;
    margin-top: 3px;
    transition: all 0.3s ease;
  }
  
  .nested-obj.modified {
    background-color: #ffe6e6;
    border-color: #e74c3c;
  }
  
  .obj-container.highlight {
    box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.3);
  }
  
  .copy-arrow {
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  .copy-arrow.active {
    opacity: 1;
  }
  
  .arrow-line {
    width: 80px;
    height: 2px;
    background-color: #95a5a6;
    position: relative;
  }
  
  .arrow-line:after {
    content: '';
    position: absolute;
    right: 0;
    top: -4px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 8px solid #95a5a6;
  }
  
  .arrow-text {
    margin-top: 5px;
    font-size: 0.8rem;
    color: #7f8c8d;
    text-align: center;
    max-width: 100px;
  }
  
  .controls {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
  
  .controls button {
    padding: 8px 16px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }
  
  .controls button:hover {
    background-color: #2980b9;
  }
  
  .controls button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  /* Шаги объяснения */
  .explanation-steps {
    margin-top: 30px;
  }
  
  .step {
    display: flex;
    align-items: flex-start;
    margin-bottom: 12px;
    opacity: 0.5;
    transition: all 0.5s ease;
  }
  
  .step.active {
    opacity: 1;
  }
  
  .step-num {
    width: 30px;
    height: 30px;
    background-color: #3498db;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  .step-content {
    flex: 1;
    padding-top: 5px;
  }
  
  /* Методы копирования */
  .method-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
  }
  
  .method-content {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
  }
  
  .pros, .cons {
    padding: 15px;
    border-radius: 8px;
  }
  
  .pros {
    background-color: #e8f7f3;
    border-left: 4px solid #2ecc71;
  }
  
  .cons {
    background-color: #fdedec;
    border-left: 4px solid #e74c3c;
  }
  
  .pros h4, .cons h4 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .pros h4 {
    color: #27ae60;
  }
  
  .cons h4 {
    color: #c0392b;
  }
  
  .pros ul, .cons ul {
    margin: 0;
    padding-left: 20px;
  }
  
  .pros li, .cons li {
    margin-bottom: 5px;
  }
  
  /* Алгоритм */
  .algorithm-steps {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .step-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    opacity: 0.5;
    transform: translateY(10px);
    transition: all 0.5s ease;
  }
  
  .step-card.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .step-header {
    background-color: #3498db;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .step-header h3 {
    margin: 0;
    color: white;
    font-size: 1.1rem;
  }
  
  .step-header .step-num {
    background-color: white;
    color: #3498db;
    margin-right: 0;
  }
  
  .step-card .step-content {
    padding: 15px;
  }
  
  .algorithm-controls {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    flex-wrap: wrap;
  }
  
  .algorithm-controls button {
    flex: 1;
    min-width: 100px;
  }
  
  .algorithm-controls button.active {
    background-color: #2ecc71;
  }
  
  /* Интерактивная демонстрация */
  .interactive-demo {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .demo-container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .source-container, .result-container {
    background-color: white;
    border-radius: 6px;
    border: 1px solid #ddd;
    overflow: hidden;
  }
  
  .source-container h3, .result-container h3 {
    background-color: #343a40;
    color: white;
    margin: 0;
    padding: 10px 15px;
    font-size: 1rem;
  }
  
  .object-viewer {
    padding: 15px;
    margin: 0;
    background-color: #000;
    color: #f8f8f2;
    min-height: 200px;
    max-height: 400px;
    overflow: auto;
  }
  
  .copy-process {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .copy-animation {
    width: 400px;
    height: 300px;
    position: relative;
    margin-bottom: 20px;
  }
  
  .animation-objects {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .animation-links {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  
  .object-node {
    position: absolute;
    width: 80px;
    height: 30px;
    background-color: #bdc3c7;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    opacity: 0.5;
    transition: all 0.5s ease;
    font-size: 0.8rem;
  }
  
  .object-node.active {
    background-color: #3498db;
    opacity: 1;
  }
  
  .object-node.processed {
    background-color: #2ecc71;
  }
  
  .copy-controls {
    display: flex;
    gap: 10px;
  }
  
  .links-svg path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    transition: stroke-dashoffset 1s ease, stroke 0.5s ease;
  }
  
  .links-svg path.active {
    stroke-dashoffset: 0;
  }
  
  .demo-explanation {
    margin-top: 20px;
  }
  
  .demo-steps {
    margin-top: 15px;
  }
  
  .demo-step {
    display: flex;
    gap: 15px;
    margin-bottom: 10px;
    padding: 8px 12px;
    background-color: white;
    border-radius: 4px;
    opacity: 0.5;
    transition: all 0.5s ease;
  }
  
  .demo-step.active {
    opacity: 1;
    background-color: #e8f7f3;
  }
  
  .verification-result {
    margin-top: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 6px;
  }
  
  .verification-result h4 {
    margin-top: 0;
  }
  
  .modify-button {
    padding: 8px 12px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .verification-message {
    margin-top: 15px;
    padding: 10px;
    background-color: #fff;
    border-radius: 4px;
    border-left: 4px solid #3498db;
  }
  
  /* Практическое применение */
  .use-cases {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .use-case-card {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .use-case-card h3 {
    color: #3498db;
    margin-top: 0;
  }
  
  .use-case-card pre {
    margin: 15px 0;
    padding: 10px;
    background-color: #000;
    color: #f8f8f2;
    border-radius: 4px;
    overflow-x: auto;
  }
  
  /* Подводные камни */
  .pitfalls-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .pitfall-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .pitfall-card h3 {
    background-color: #e74c3c;
    color: white;
    margin: 0;
    padding: 12px 15px;
    font-size: 1.1rem;
  }
  
  .pitfall-content {
    padding: 15px;
  }
  
  .pitfall-example {
    margin-top: 15px;
    background-color: #fff;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid #eee;
  }
  
  .pitfall-example pre {
    margin: 0;
    padding: 15px;
    background-color: #000;
    color: #f8f8f2;
    overflow-x: auto;
  }
  
  .solution {
    padding: 15px;
    background-color: #e8f7f3;
    border-top: 1px solid #eee;
  }
  
  .solution h4 {
    margin-top: 0;
    color: #27ae60;
  }
  
  /* Финальное решение */
  .final-solution {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .task-description {
    margin-bottom: 30px;
  }
  
  .task-description h3 {
    color: #e74c3c;
  }
  
  .solution-implementation h3 {
    color: #27ae60;
  }
  
  .solution-test {
    margin-top: 30px;
  }
  
  .test-result {
    background-color: #e8f7f3;
    border-radius: 6px;
    overflow: hidden;
  }
  
  .test-result pre {
    margin: 0;
    padding: 15px;
    background-color: #000;
    color: #f8f8f2;
    overflow-x: auto;
  }
  
  /* Медиа-запросы для адаптивности */
  @media (max-width: 992px) {
    .use-cases, .pitfalls-section {
      grid-template-columns: 1fr;
    }
    
    .pros-cons {
      grid-template-columns: 1fr;
    }
    
    .demo-container {
      grid-template-columns: 1fr;
    }
    
    .copy-animation {
      width: 100%;
    }
  }
  
  @media (max-width: 576px) {
    h1 {
      font-size: 1.8rem;
    }
    
    h2 {
      font-size: 1.5rem;
    }
    
    .tabs button, .method-tabs button {
      font-size: 0.9rem;
      padding: 8px 12px;
    }
  }
  </style>