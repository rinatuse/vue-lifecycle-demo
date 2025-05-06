<template>
    <div class="property-explainer">
      <h1>Разница между <code>hasOwnProperty</code> и оператором <code>in</code></h1>
      <p class="intro">
        Разберёмся, как работают методы проверки свойств и какая между ними разница
      </p>
  
      <!-- Секция с примером кода -->
      <div class="code-example">
        <h2>Исходный код</h2>
        <pre><code class="javascript">class Animal {
    constructor(name) {
      this.name = name;
    }
  
    sound() {
      console.log("Some sound");
    }
  }
  
  class Dog extends Animal {
    constructor(name, breed) {
      super(name);
      this.breed = breed;
    }
  
    bark() {
      console.log("Woof woof!");
    }
  }
  
  let myDog = new Dog("Buddy", "Labrador");
  
  console.log(myDog.hasOwnProperty("name")); // ?
  console.log(myDog.hasOwnProperty("sound")); // ?
  
  console.log("name" in myDog); // ?
  console.log("sound" in myDog); // ?</code></pre>
      </div>
  
      <!-- Секция с визуализацией -->
      <div class="visualization-container">
        <h2>Объектная модель и цепочка прототипов</h2>
        <div class="objects-visualization">
          <div class="object dog-object" :class="{ active: activeObject === 'dog' }" @click="setActiveObject('dog')">
            <div class="object-header">myDog (экземпляр Dog)</div>
            <div class="object-properties">
              <div class="property own-property" @click="checkProperty('name')">
                name: "Buddy" 
                <div class="property-tag">собственное</div>
              </div>
              <div class="property own-property" @click="checkProperty('breed')">
                breed: "Labrador"
                <div class="property-tag">собственное</div>
              </div>
              <div class="object-proto-link">__proto__</div>
            </div>
          </div>
          
          <div class="proto-arrow">
            <svg width="50" height="80">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" />
                </marker>
              </defs>
              <line x1="10" y1="40" x2="40" y2="40" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)" />
            </svg>
          </div>
          
          <div class="object dog-prototype" :class="{ active: activeObject === 'dogProto' }" @click="setActiveObject('dogProto')">
            <div class="object-header">Dog.prototype</div>
            <div class="object-properties">
              <div class="property proto-property" @click="checkProperty('bark')">
                bark: function() {...}
                <div class="property-tag">в прототипе</div>
              </div>
              <div class="object-proto-link">__proto__</div>
            </div>
          </div>
          
          <div class="proto-arrow">
            <svg width="50" height="80">
              <line x1="10" y1="40" x2="40" y2="40" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)" />
            </svg>
          </div>
          
          <div class="object animal-prototype" :class="{ active: activeObject === 'animalProto' }" @click="setActiveObject('animalProto')">
            <div class="object-header">Animal.prototype</div>
            <div class="object-properties">
              <div class="property proto-property" @click="checkProperty('sound')">
                sound: function() {...}
                <div class="property-tag">в прототипе</div>
              </div>
              <div class="object-proto-link">__proto__</div>
            </div>
          </div>
          
          <div class="proto-arrow last-arrow">
            <svg width="50" height="80">
              <line x1="10" y1="40" x2="40" y2="40" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)" />
            </svg>
          </div>
          
          <div class="object object-prototype">
            <div class="object-header">Object.prototype</div>
            <div class="object-properties">
              <div class="property proto-property">
                hasOwnProperty: function() {...}
                <div class="property-tag">встроенный метод</div>
              </div>
              <div class="property proto-property">
                toString: function() {...}
                <div class="property-tag">встроенный метод</div>
              </div>
              <!-- и другие встроенные методы -->
            </div>
          </div>
        </div>
        
        <!-- Секция с проверкой свойств -->
        <div class="property-check-section">
          <h3>Проверка свойств</h3>
          <div class="property-inputs">
            <div class="input-group">
              <label>Проверяемое свойство:</label>
              <select v-model="currentProperty">
                <option value="name">name</option>
                <option value="breed">breed</option>
                <option value="bark">bark</option>
                <option value="sound">sound</option>
              </select>
            </div>
            <div class="input-group">
              <label>Метод проверки:</label>
              <select v-model="checkMethod">
                <option value="hasOwnProperty">hasOwnProperty</option>
                <option value="in">in оператор</option>
              </select>
            </div>
            <button class="check-button" @click="animateCheck">Проверить</button>
          </div>
          
          <div class="check-animation" v-if="checkStarted">
            <div class="search-path">
              <div class="search-step" :class="{ active: searchStep >= 1, found: foundAtStep === 1 }">
                1. Поиск в собственных свойствах myDog
                <div class="check-result" v-if="searchStep >= 1">
                  {{ getSearchStepResult(1) }}
                </div>
              </div>
              <div class="search-step" :class="{ active: searchStep >= 2 && checkMethod === 'in', found: foundAtStep === 2 }" v-if="checkMethod === 'in'">
                2. Поиск в Dog.prototype
                <div class="check-result" v-if="searchStep >= 2">
                  {{ getSearchStepResult(2) }}
                </div>
              </div>
              <div class="search-step" :class="{ active: searchStep >= 3 && checkMethod === 'in', found: foundAtStep === 3 }" v-if="checkMethod === 'in'">
                3. Поиск в Animal.prototype
                <div class="check-result" v-if="searchStep >= 3">
                  {{ getSearchStepResult(3) }}
                </div>
              </div>
              <div class="search-step" :class="{ active: searchStep >= 4 && checkMethod === 'in', found: foundAtStep === 4 }" v-if="checkMethod === 'in'">
                4. Поиск в Object.prototype
                <div class="check-result" v-if="searchStep >= 4">
                  {{ getSearchStepResult(4) }}
                </div>
              </div>
            </div>
            
            <div class="final-result" v-if="showFinalResult">
              <h4>Результат:</h4>
              <div class="result" :class="{ 'result-true': checkResult, 'result-false': !checkResult }">
                {{ getCheckCode() }} → {{ checkResult ? 'true' : 'false' }}
              </div>
              <div class="result-explanation">
                {{ getResultExplanation() }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Сравнительная таблица -->
      <div class="comparison-table-section">
        <h2>Сравнение hasOwnProperty и оператора in</h2>
        <div class="table-container">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Характеристика</th>
                <th>hasOwnProperty()</th>
                <th>Оператор in</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Проверяет собственные свойства</td>
                <td class="yes">Да</td>
                <td class="yes">Да</td>
              </tr>
              <tr>
                <td>Проверяет унаследованные свойства</td>
                <td class="no">Нет</td>
                <td class="yes">Да</td>
              </tr>
              <tr>
                <td>Проверяет непересчитываемые свойства</td>
                <td class="yes">Да</td>
                <td class="yes">Да</td>
              </tr>
              <tr>
                <td>Проверяет методы</td>
                <td class="partial">Только собственные</td>
                <td class="yes">Все (включая унаследованные)</td>
              </tr>
              <tr>
                <td>Синтаксис</td>
                <td>obj.hasOwnProperty("prop")</td>
                <td>"prop" in obj</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Результаты примера из условия -->
      <div class="example-results">
        <h2>Результаты примера кода</h2>
        <div class="results-list">
          <div class="result-item">
            <div class="code">myDog.hasOwnProperty("name")</div>
            <div class="result result-true">true</div>
            <div class="explanation">
              <p>Свойство <code>name</code> является <strong>собственным</strong> свойством объекта <code>myDog</code>, 
              так как оно было создано в конструкторе с помощью <code>this.name = name</code>.</p>
            </div>
          </div>
          
          <div class="result-item">
            <div class="code">myDog.hasOwnProperty("sound")</div>
            <div class="result result-false">false</div>
            <div class="explanation">
              <p><code>sound</code> - это метод, определенный в прототипе <code>Animal.prototype</code>.
              Метод <code>hasOwnProperty</code> проверяет только собственные свойства, поэтому возвращает <code>false</code>.</p>
            </div>
          </div>
          
          <div class="result-item">
            <div class="code">"name" in myDog</div>
            <div class="result result-true">true</div>
            <div class="explanation">
              <p>Оператор <code>in</code> проверяет наличие свойства как в самом объекте, так и в его прототипах. 
              Поскольку <code>name</code> есть в объекте <code>myDog</code>, результат - <code>true</code>.</p>
            </div>
          </div>
          
          <div class="result-item">
            <div class="code">"sound" in myDog</div>
            <div class="result result-true">true</div>
            <div class="explanation">
              <p>Хотя <code>sound</code> не является собственным свойством объекта <code>myDog</code>,
              оно доступно через цепочку прототипов (находится в <code>Animal.prototype</code>).
              Оператор <code>in</code> проверяет всю цепочку прототипов, поэтому возвращает <code>true</code>.</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Применение на практике -->
      <div class="practical-applications">
        <h2>Практическое применение</h2>
        
        <div class="application-card">
          <h3>Проверка собственных данных объекта</h3>
          <p>
            Используйте <code>hasOwnProperty</code>, когда вам нужно проверить, содержит ли объект 
            конкретное свойство, игнорируя унаследованные. Это полезно при итерации по объектам, 
            чтобы обрабатывать только собственные свойства.
          </p>
          <div class="code-example-mini">
            <pre><code>function processUserData(userData) {
    // Обрабатываем только свойства, которые были явно установлены для этого пользователя
    for (let key in userData) {
      if (userData.hasOwnProperty(key)) {
        // Обработка собственных свойств
        processProperty(key, userData[key]);
      }
    }
  }</code></pre>
          </div>
        </div>
        
        <div class="application-card">
          <h3>Проверка доступности метода или функциональности</h3>
          <p>
            Оператор <code>in</code> подходит, когда вам нужно узнать, доступно ли свойство или метод
            для объекта вообще, независимо от того, где оно определено (в самом объекте или в прототипе).
          </p>
          <div class="code-example-mini">
            <pre><code>function canAnimalMakeSound(animal) {
    // Проверяем, есть ли метод sound в объекте или в его прототипе
    if ('sound' in animal) {
      animal.sound();
    } else {
      console.log("This animal can't make any sound");
    }
  }</code></pre>
          </div>
        </div>
        
        <div class="application-card">
          <h3>Безопасный доступ к свойствам</h3>
          <p>
            Оба метода можно использовать для защиты от ошибок при доступе к несуществующим свойствам.
          </p>
          <div class="code-example-mini">
            <pre><code>function safeGetProperty(obj, prop) {
    // Проверяем наличие свойства перед доступом к нему
    if (prop in obj) {
      return obj[prop];
    }
    return null; // Или значение по умолчанию
  }</code></pre>
          </div>
        </div>
        
        <div class="application-card">
          <h3>Реализация полиморфизма</h3>
          <p>
            Можно использовать оператор <code>in</code> для проверки, поддерживает ли объект
            определенный интерфейс или метод, перед его вызовом.
          </p>
          <div class="code-example-mini">
            <pre><code>function makeNoise(entity) {
    if ('bark' in entity) {
      entity.bark();
    } else if ('sound' in entity) {
      entity.sound();
    } else if ('speak' in entity) {
      entity.speak();
    } else {
      console.log("This entity doesn't make sounds");
    }
  }</code></pre>
          </div>
        </div>
      </div>
      
      <!-- Подводные камни -->
      <div class="pitfalls-section">
        <h2>Подводные камни и распространенные ошибки</h2>
        
        <div class="pitfall-card">
          <h3>Перезапись hasOwnProperty</h3>
          <p>
            Если объект имеет собственное свойство с именем "hasOwnProperty", вызов метода напрямую приведет к ошибке.
          </p>
          <div class="code-example-mini">
            <pre><code>const obj = {
    hasOwnProperty: function() {
      return 'Not what you expected!';
    },
    prop: 'value'
  };
  
  // Ошибка! Вызывает переопределенный метод
  console.log(obj.hasOwnProperty('prop')); // "Not what you expected!"
  
  // Безопасный способ
  console.log(Object.prototype.hasOwnProperty.call(obj, 'prop')); // true</code></pre>
          </div>
        </div>
        
        <div class="pitfall-card">
          <h3>Свойства, унаследованные не через прототип</h3>
          <p>
            JavaScript имеет и другие механизмы наследования, кроме прототипного. Например, геттеры и сеттеры 
            из Object.defineProperty() или свойства из Object.create().
          </p>
          <div class="code-example-mini">
            <pre><code>const baseObj = {};
  Object.defineProperty(baseObj, 'hidden', {
    enumerable: false,
    value: 'I am hidden'
  });
  
  const childObj = Object.create(baseObj);
  
  // Свойство существует, но не перечисляемо
  console.log('hidden' in childObj); // true
  console.log(childObj.hasOwnProperty('hidden')); // false
  
  // Не появляется в for...in циклах
  for (let key in childObj) {
    console.log(key); // Ничего не выведет
  }</code></pre>
          </div>
        </div>
        
        <div class="pitfall-card">
          <h3>Путаница с for...in циклами</h3>
          <p>
            Цикл <code>for...in</code> перебирает все перечисляемые свойства объекта, включая унаследованные.
            Часто это не то, что вам нужно.
          </p>
          <div class="code-example-mini">
            <pre><code>// Неправильно - перебирает и собственные, и унаследованные свойства
  for (let key in myDog) {
    console.log(key); // name, breed, bark, sound, toString, ...
  }
  
  // Правильно - только собственные свойства
  for (let key in myDog) {
    if (myDog.hasOwnProperty(key)) {
      console.log(key); // только name, breed
    }
  }
  
  // Современный способ - только собственные свойства
  Object.keys(myDog).forEach(key => {
    console.log(key); // только name, breed
  });</code></pre>
          </div>
        </div>
        
        <div class="pitfall-card">
          <h3>Null и Undefined</h3>
          <p>
            Будьте осторожны при проверке свойств у null или undefined - вы получите ошибку.
          </p>
          <div class="code-example-mini">
            <pre><code>let obj = null;
  
  // Ошибка: Cannot read property 'hasOwnProperty' of null
  obj.hasOwnProperty('prop');
  
  // Ошибка: Cannot convert undefined or null to object
  'prop' in obj;
  
  // Безопасный способ - добавить проверку перед использованием
  if (obj && typeof obj === 'object') {
    if (obj.hasOwnProperty('prop')) {
      // Безопасно использовать свойство
    }
  }</code></pre>
          </div>
        </div>
      </div>
      
      <!-- Алгоритм проверки свойств -->
      <div class="algorithm-section">
        <h2>Алгоритм проверки свойств в JavaScript</h2>
        
        <div class="algorithm-description">
          <h3>Как JavaScript находит свойства?</h3>
          <ol class="algorithm-steps">
            <li>
              <strong>Шаг 1:</strong> JavaScript сначала проверяет, существует ли свойство непосредственно в объекте (собственные свойства).
            </li>
            <li>
              <strong>Шаг 2:</strong> Если свойство не найдено, JavaScript ищет его в прототипе объекта (__proto__).
            </li>
            <li>
              <strong>Шаг 3:</strong> Если свойство всё еще не найдено, поиск продолжается вверх по цепочке прототипов.
            </li>
            <li>
              <strong>Шаг 4:</strong> Поиск продолжается до тех пор, пока свойство не будет найдено или не будет достигнут конец цепочки (Object.prototype.__proto__ === null).
            </li>
          </ol>
          
          <h3>Различия методов проверки:</h3>
          <ul class="algorithm-differences">
            <li>
              <strong>hasOwnProperty</strong> останавливается на <strong>Шаге 1</strong> и возвращает результат.
              Он проверяет только собственные свойства объекта.
            </li>
            <li>
              <strong>Оператор in</strong> проходит все шаги алгоритма до самого конца цепочки прототипов,
              возвращая true, если свойство найдено на любом из шагов.
            </li>
          </ul>
        </div>
        
        <div class="algorithm-visualization">
          <div class="algorithm-flow">
            <div class="flow-step">
              <div class="step-content">
                <div class="step-title">Начало</div>
                <div class="step-description">Поиск свойства prop в объекте obj</div>
              </div>
              <div class="flow-arrow">↓</div>
            </div>
            
            <div class="flow-step">
              <div class="step-content">
                <div class="step-title">Шаг 1</div>
                <div class="step-description">Проверка собственных свойств объекта</div>
                <div class="step-question">prop в obj?</div>
              </div>
              <div class="flow-branches">
                <div class="branch">
                  <div class="branch-label">Да</div>
                  <div class="branch-arrow branch-right">→</div>
                  <div class="branch-result">
                    <div class="result-box">
                      <div>hasOwnProperty ✓</div>
                      <div>in ✓</div>
                    </div>
                  </div>
                </div>
                <div class="branch">
                  <div class="branch-label">Нет</div>
                  <div class="branch-arrow">↓</div>
                </div>
              </div>
            </div>
            
            <div class="flow-step">
              <div class="step-content">
                <div class="step-title">Шаг 2</div>
                <div class="step-description">Проверка прототипа объекта</div>
                <div class="step-question">prop в obj.__proto__?</div>
              </div>
              <div class="flow-branches">
                <div class="branch">
                  <div class="branch-label">Да</div>
                  <div class="branch-arrow branch-right">→</div>
                  <div class="branch-result">
                    <div class="result-box">
                      <div>hasOwnProperty ✗</div>
                      <div>in ✓</div>
                    </div>
                  </div>
                </div>
                <div class="branch">
                  <div class="branch-label">Нет</div>
                  <div class="branch-arrow">↓</div>
                </div>
              </div>
            </div>
            
            <div class="flow-step">
              <div class="step-content">
                <div class="step-title">Шаг 3</div>
                <div class="step-description">Проверка вверх по цепочке прототипов</div>
                <div class="step-question">prop в любом прототипе?</div>
              </div>
              <div class="flow-branches">
                <div class="branch">
                  <div class="branch-label">Да</div>
                  <div class="branch-arrow branch-right">→</div>
                  <div class="branch-result">
                    <div class="result-box">
                      <div>hasOwnProperty ✗</div>
                      <div>in ✓</div>
                    </div>
                  </div>
                </div>
                <div class="branch">
                  <div class="branch-label">Нет</div>
                  <div class="branch-arrow">↓</div>
                </div>
              </div>
            </div>
            
            <div class="flow-step">
              <div class="step-content">
                <div class="step-title">Конец</div>
                <div class="step-description">Свойство не найдено нигде</div>
                <div class="final-result">
                  <div class="result-box">
                    <div>hasOwnProperty ✗</div>
                    <div>in ✗</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Заключение -->
      <div class="conclusion">
        <h2>Заключение</h2>
        <div class="conclusion-content">
          <p>
            <strong>hasOwnProperty</strong> и оператор <strong>in</strong> – это два разных инструмента в JavaScript 
            для проверки наличия свойств, каждый со своим назначением:
          </p>
          
          <ul>
            <li>
              <strong>hasOwnProperty</strong> проверяет только собственные свойства объекта, игнорируя унаследованные.
              Используйте его, когда важно знать, определено ли свойство непосредственно в самом объекте.
            </li>
            <li>
              <strong>Оператор in</strong> проверяет наличие свойства во всей цепочке прототипов.
              Используйте его, когда вам нужно знать, доступно ли свойство для объекта в целом, 
              независимо от того, где оно определено.
            </li>
          </ul>
          
          <p>
            Правильный выбор метода проверки свойств помогает писать более безопасный и надежный код,
            особенно когда вы работаете с объектно-ориентированным программированием в JavaScript.
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeObject: 'dog',
        currentProperty: 'name',
        checkMethod: 'hasOwnProperty',
        checkStarted: false,
        searchStep: 0,
        foundAtStep: null,
        showFinalResult: false,
        checkResult: false,
        propertyLocations: {
          // Свойство: [объект, шаг]
          'name': ['dog', 1],
          'breed': ['dog', 1],
          'bark': ['dogProto', 2],
          'sound': ['animalProto', 3]
        }
      }
    },
    methods: {
      // Устанавливает активный объект при клике
      setActiveObject(obj) {
        this.activeObject = obj;
      },
      
      // Автоматически выбирает свойство при клике на него
      checkProperty(prop) {
        this.currentProperty = prop;
      },
      
      // Анимирует процесс проверки свойства
      animateCheck() {
        // Сбрасываем предыдущие результаты
        this.checkStarted = true;
        this.searchStep = 0;
        this.foundAtStep = null;
        this.showFinalResult = false;
        
        // Получаем информацию о расположении свойства
        const [_objType, step] = this.propertyLocations[this.currentProperty];
        
        // Определяем, будет ли найдено свойство
        if (this.checkMethod === 'hasOwnProperty') {
          // hasOwnProperty ищет только в собственных свойствах (шаг 1)
          this.checkResult = step === 1;
          if (step === 1) {
            this.foundAtStep = 1;
          }
        } else {
          // оператор in ищет во всей цепочке прототипов
          this.checkResult = true;
          this.foundAtStep = step;
        }
        
        // Анимируем шаги поиска
        this.animateSearchSteps();
      },
      
      // Анимация шагов поиска с таймерами
      animateSearchSteps() {
        const maxSteps = this.checkMethod === 'hasOwnProperty' ? 1 : 4;
        const delay = 700; // миллисекунды между шагами
        
        // Функция для обновления шага
        const updateStep = (step) => {
          this.searchStep = step;
          
          // Если это последний шаг или мы нашли свойство, показать результат
          if (step === maxSteps || step === this.foundAtStep) {
            setTimeout(() => {
              this.showFinalResult = true;
            }, delay);
          }
        };
        
        // Запускаем таймеры для каждого шага
        for (let i = 1; i <= maxSteps; i++) {
          setTimeout(() => {
            updateStep(i);
          }, i * delay);
        }
      },
      
      // Получает результат для каждого шага поиска
      getSearchStepResult(step) {
        if (this.foundAtStep === step) {
          return 'Найдено!';
        }
        
        const [_objType, propStep] = this.propertyLocations[this.currentProperty];
        
        if (step < propStep) {
          return 'Не найдено здесь';
        }
        
        if (step > propStep) {
          return 'Поиск пропущен (уже найдено)';
        }
        
        return 'Не найдено';
      },
      
      // Генерирует код проверки для отображения
      getCheckCode() {
        if (this.checkMethod === 'hasOwnProperty') {
          return `myDog.hasOwnProperty("${this.currentProperty}")`;
        } else {
          return `"${this.currentProperty}" in myDog`;
        }
      },
      
      // Генерирует объяснение результата
      getResultExplanation() {
        if (this.checkMethod === 'hasOwnProperty') {
          if (this.checkResult) {
            return `Свойство "${this.currentProperty}" является собственным свойством объекта myDog.`;
          } else {
            const [objType, _step] = this.propertyLocations[this.currentProperty];
            let location = '';
            
            if (objType === 'dogProto') {
              location = 'Dog.prototype';
            } else if (objType === 'animalProto') {
              location = 'Animal.prototype';
            }
            
            return `Свойство "${this.currentProperty}" не является собственным свойством myDog, оно находится в ${location}.`;
          }
        } else {
          const [objType, _step] = this.propertyLocations[this.currentProperty];
          let location = '';
          
          if (objType === 'dog') {
            location = 'в самом объекте myDog';
          } else if (objType === 'dogProto') {
            location = 'в прототипе Dog.prototype';
          } else if (objType === 'animalProto') {
            location = 'в прототипе Animal.prototype';
          }
          
          return `Свойство "${this.currentProperty}" доступно для объекта myDog, так как оно найдено ${location}.`;
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Общие стили */
  .property-explainer {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: white;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1, h2, h3, h4 {
    color: #2c3e50;
    margin-top: 1.5em;
    margin-bottom: 0.8em;
  }
  
  h1 {
    font-size: 2.2em;
    text-align: center;
    border-bottom: 2px solid #e5e5e5;
    padding-bottom: 0.5em;
  }
  
  h2 {
    font-size: 1.8em;
    border-left: 5px solid #3498db;
    padding-left: 15px;
  }
  
  h3 {
    font-size: 1.5em;
    color: #2980b9;
  }
  
  code {
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', monospace;
    background-color: #f0f0f0;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 0.9em;
  }
  
  .intro {
    font-size: 1.2em;
    text-align: center;
    color: #555;
    margin-bottom: 2em;
  }
  
  /* Стили для примера кода */
  .code-example {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin: 2em 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .code-example pre {
    background-color: #282c34;
    color: #abb2bf;
    padding: 20px;
    border-radius: 5px;
    overflow-x: auto;
    margin: 0;
  }
  
  .code-example-mini {
    margin: 1em 0;
  }
  
  .code-example-mini pre {
    background-color: #282c34;
    color: #abb2bf;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
    margin: 0;
    font-size: 0.9em;
  }
  
  /* Стили для визуализации объектов */
  .visualization-container {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    margin: 2em 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  
  .objects-visualization {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 2em 0;
  }
  
  .object {
    background-color: white;
    border: 2px solid #3498db;
    border-radius: 8px;
    width: 220px;
    margin-bottom: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  }
  
  .object:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  
  .object.active {
    border-color: #e74c3c;
    box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.3);
  }
  
  .object-header {
    background-color: #3498db;
    color: white;
    padding: 8px 10px;
    font-weight: bold;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  
  .dog-object .object-header {
    background-color: #e74c3c;
  }
  
  .dog-prototype .object-header {
    background-color: #3498db;
  }
  
  .animal-prototype .object-header {
    background-color: #2ecc71;
  }
  
  .object-prototype .object-header {
    background-color: #9b59b6;
  }
  
  .object-properties {
    padding: 10px;
  }
  
  .property {
    margin: 8px 0;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    position: relative;
  }
  
  .property:hover {
    background-color: #f5f5f5;
  }
  
  .own-property {
    background-color: #ffecb3;
  }
  
  .proto-property {
    background-color: #e3f2fd;
  }
  
  .property-tag {
    position: absolute;
    right: 5px;
    top: 5px;
    background-color: rgba(0,0,0,0.1);
    font-size: 0.7em;
    padding: 2px 5px;
    border-radius: 3px;
  }
  
  .object-proto-link {
    color: #777;
    text-align: center;
    font-style: italic;
    margin-top: 8px;
    border-top: 1px dashed #ccc;
    padding-top: 8px;
  }
  
  .proto-arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 30px;
    height: 80px;
  }
  
  .last-arrow {
    opacity: 0.5;
  }
  
  /* Стили для секции проверки свойств */
  .property-check-section {
    margin: 2em 0;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .property-inputs {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 1.5em;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  label {
    font-weight: bold;
    font-size: 0.9em;
    color: #555;
  }
  
  select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f8f9fa;
    font-size: 1em;
  }
  
  .check-button {
    padding: 8px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
    align-self: flex-end;
  }
  
  .check-button:hover {
    background-color: #2980b9;
  }
  
  .check-animation {
    margin-top: 20px;
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 8px;
    animation: fadeIn 0.5s;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .search-path {
    margin-bottom: 1.5em;
  }
  
  .search-step {
    padding: 10px 15px;
    margin: 8px 0;
    background-color: #eee;
    border-radius: 4px;
    opacity: 0.6;
    transition: all 0.3s ease;
  }
  
  .search-step.active {
    opacity: 1;
    background-color: #e3f2fd;
    border-left: 3px solid #2196f3;
  }
  
  .search-step.found {
    background-color: #e8f5e9;
    border-left: 3px solid #4caf50;
  }
  
  .check-result {
    margin-top: 5px;
    font-weight: bold;
    font-size: 0.9em;
  }
  
  .final-result {
    margin-top: 1.5em;
    padding: 15px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    animation: slideUp 0.5s;
  }
  
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .result {
    font-size: 1.3em;
    font-weight: bold;
    padding: 10px;
    border-radius: 4px;
    margin: 10px 0;
    text-align: center;
  }
  
  .result-true {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
  
  .result-false {
    background-color: #ffebee;
    color: #c62828;
  }
  
  .result-explanation {
    margin-top: 10px;
    color: #555;
  }
  
  /* Таблица сравнения */
  .comparison-table-section {
    margin: 2em 0;
  }
  
  .table-container {
    overflow-x: auto;
  }
  
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .comparison-table th, .comparison-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .comparison-table th {
    background-color: #f2f2f2;
    font-weight: bold;
    color: #333;
  }
  
  .comparison-table tr:hover {
    background-color: #f9f9f9;
  }
  
  .comparison-table .yes {
    color: #27ae60;
    font-weight: bold;
  }
  
  .comparison-table .no {
    color: #e74c3c;
    font-weight: bold;
  }
  
  .comparison-table .partial {
    color: #f39c12;
    font-weight: bold;
  }
  
  /* Результаты примера */
  .example-results {
    margin: 2em 0;
  }
  
  .results-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .result-item {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .result-item .code {
    font-family: monospace;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  .result-item .explanation {
    margin-top: 10px;
    color: #555;
  }
  
  /* Практические применения */
  .practical-applications {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
    margin: 2em 0;
  }
  
  .application-card {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }
  
  .application-card:hover {
    transform: translateY(-5px);
  }
  
  .application-card h3 {
    color: #2c3e50;
    margin-top: 0;
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 10px;
  }
  
  /* Подводные камни */
  .pitfalls-section {
    margin: 2em 0;
  }
  
  .pitfall-card {
    background-color: #fff3cd;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #ffc107;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  
  .pitfall-card h3 {
    color: #856404;
    margin-top: 0;
  }
  
  /* Алгоритм проверки */
  .algorithm-section {
    margin: 2em 0;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
  }
  
  .algorithm-steps {
    padding-left: 20px;
  }
  
  .algorithm-steps li {
    margin-bottom: 10px;
  }
  
  .algorithm-differences {
    margin-top: 15px;
    padding-left: 20px;
  }
  
  .algorithm-visualization {
    margin-top: 2em;
    display: flex;
    justify-content: center;
  }
  
  .algorithm-flow {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    max-width: 500px;
  }
  
  .flow-step {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .step-content {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    width: 100%;
    text-align: center;
  }
  
  .step-title {
    font-weight: bold;
    font-size: 1.1em;
    color: #2c3e50;
  }
  
  .step-question {
    margin-top: 10px;
    font-weight: bold;
    color: #3498db;
  }
  
  .flow-arrow {
    font-size: 1.5em;
    color: #777;
    margin: 5px 0;
  }
  
  .flow-branches {
    display: flex;
    width: 100%;
    justify-content: center;
    position: relative;
  }
  
  .branch {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 20px;
  }
  
  .branch-label {
    padding: 5px 10px;
    background-color: #e5e5e5;
    border-radius: 15px;
    font-size: 0.9em;
    margin-bottom: 5px;
  }
  
  .branch-arrow {
    font-size: 1.5em;
    color: #777;
    margin: 5px 0;
  }
  
  .branch-right {
    transform: rotate(90deg);
  }
  
  .branch-result {
    margin-left: 20px;
  }
  
  .result-box {
    background-color: #f8f9fa;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    min-width: 150px;
    text-align: center;
  }
  
  .final-result {
    margin-top: 10px;
  }
  
  /* Заключение */
  .conclusion {
    margin: 2em 0;
    background-color: #e8f5e9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .conclusion-content {
    font-size: 1.1em;
    line-height: 1.7;
  }
  
  .conclusion-content ul {
    padding-left: 20px;
  }
  
  .conclusion-content li {
    margin-bottom: 10px;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .objects-visualization {
      flex-direction: column;
    }
    
    .proto-arrow {
      transform: rotate(90deg);
      height: 50px;
    }
    
    .practical-applications {
      grid-template-columns: 1fr;
    }
    
    .algorithm-flow {
      max-width: 100%;
    }
  }
  </style>