<template>
    <div class="proto-inheritance-explainer">
      <h1>Прототипное наследование в JavaScript: интерактивное объяснение</h1>
      <div class="intro-section">
        <p>Давайте разберем, почему этот код работает не так, как ожидается, и как правильно использовать прототипы в JavaScript:</p>
        <pre class="code-block">function Person(name) {
    this.name = name;
  }
  
  const juan = new Person("Juan");
  
  Person.prototype = {
    getName: function () {
      return this.name;
    },
  };
  
  const pedro = new Person("Pedro");
  
  console.log(pedro.getName()); // "Pedro"
  console.log(juan.getName()); // TypeError: juan.getName is not a function</pre>
      </div>
  
      <div class="explanation-container">
        <div class="execution-controls">
          <div class="step-counter">Шаг {{ currentStep }} из {{ totalSteps }}</div>
          <div class="navigation-buttons">
            <button 
              @click="prevStep" 
              :disabled="currentStep === 1" 
              class="nav-button prev-button"
            >
              Назад
            </button>
            <button 
              @click="nextStep" 
              :disabled="currentStep === totalSteps" 
              class="nav-button next-button"
            >
              Вперед
            </button>
            <button 
              v-if="currentStep === totalSteps" 
              @click="resetAnimation" 
              class="nav-button reset-button"
            >
              Начать сначала
            </button>
          </div>
        </div>
  
        <div class="visualization-area">
          <!-- Пошаговая визуализация -->
          <div class="memory-model">
            <div class="memory-objects">
              <!-- Конструктор Person -->
              <div class="object constructor" :class="{ 'highlight': highlightConstructor }">
                <div class="object-title">Person (конструктор)</div>
                <div class="object-content">
                  <div class="property">
                    <span class="property-name">prototype</span>
                    <span class="property-arrow" :class="{ 'changed': prototypeChanged }"></span>
                  </div>
                </div>
              </div>
  
              <!-- Первоначальный прототип Person -->
              <div v-if="currentStep < 3" class="object prototype" :class="{ 'highlight': highlightInitialPrototype }">
                <div class="object-title">Person.prototype (изначальный)</div>
                <div class="object-content">
                  <div class="property">
                    <span class="property-name">constructor</span>
                    <span class="property-arrow back-reference"></span>
                  </div>
                </div>
              </div>
  
              <!-- Новый прототип Person -->
              <div v-if="currentStep >= 3" class="object prototype" :class="{ 'highlight': highlightNewPrototype }">
                <div class="object-title">Person.prototype (новый)</div>
                <div class="object-content">
                  <div class="property">
                    <span class="property-name">getName</span>
                    <span class="property-value">function() { return this.name; }</span>
                  </div>
                  <div class="property warning">
                    <span class="property-name">constructor</span>
                    <span class="property-value">отсутствует!</span>
                  </div>
                </div>
              </div>
  
              <!-- Объект juan -->
              <div v-if="currentStep >= 2" class="object instance juan" :class="{ 'highlight': highlightJuan }">
                <div class="object-title">juan</div>
                <div class="object-content">
                  <div class="property">
                    <span class="property-name">name</span>
                    <span class="property-value">"Juan"</span>
                  </div>
                  <div class="property">
                    <span class="property-name">[[Prototype]]</span>
                    <span class="property-arrow" :class="{ 'orphaned': currentStep >= 3 && currentStep < 8 }"></span>
                  </div>
                </div>
                <div v-if="currentStep === 8" class="error-message">
                  TypeError: juan.getName is not a function
                </div>
              </div>
  
              <!-- Объект pedro -->
              <div v-if="currentStep >= 4" class="object instance pedro" :class="{ 'highlight': highlightPedro }">
                <div class="object-title">pedro</div>
                <div class="object-content">
                  <div class="property">
                    <span class="property-name">name</span>
                    <span class="property-value">"Pedro"</span>
                  </div>
                  <div class="property">
                    <span class="property-name">[[Prototype]]</span>
                    <span class="property-arrow"></span>
                  </div>
                </div>
                <div v-if="currentStep === 7" class="success-message">
                  pedro.getName() → "Pedro"
                </div>
              </div>
            </div>
          </div>
  
          <!-- Объяснение текущего шага -->
          <div class="step-explanation">
            <h3>{{ stepExplanations[currentStep - 1].title }}</h3>
            <p v-html="stepExplanations[currentStep - 1].description"></p>
            <div v-if="stepExplanations[currentStep - 1].code" class="step-code">
              <pre>{{ stepExplanations[currentStep - 1].code }}</pre>
            </div>
          </div>
        </div>
      </div>
  
      <div class="solutions-section" v-if="currentStep === totalSteps">
        <h2>Как решить проблему?</h2>
        
        <div class="solution-tabs">
          <button 
            v-for="(solution, index) in solutions" 
            :key="index" 
            :class="['tab-button', { active: activeSolution === index }]" 
            @click="activeSolution = index"
          >
            {{ solution.title }}
          </button>
        </div>
        
        <div class="solution-content">
          <h3>{{ solutions[activeSolution].title }}</h3>
          <p v-html="solutions[activeSolution].description"></p>
          <pre class="code-block">{{ solutions[activeSolution].code }}</pre>
        </div>
      </div>
  
      <div class="algorithm-section">
        <h2>Алгоритм поиска свойств в цепочке прототипов</h2>
        
        <div class="algorithm-explanation">
          <p>Когда вы обращаетесь к свойству или методу объекта в JavaScript, происходит следующее:</p>
          
          <ol class="algorithm-steps">
            <li>
              <strong>Проверка собственных свойств:</strong> JavaScript сначала проверяет, есть ли запрашиваемое свойство непосредственно у самого объекта
            </li>
            <li>
              <strong>Проверка прототипа:</strong> Если свойство не найдено, JavaScript ищет его в прототипе объекта ([[Prototype]])
            </li>
            <li>
              <strong>Движение по цепочке прототипов:</strong> Если свойство не найдено в прототипе, поиск продолжается в прототипе прототипа и так далее
            </li>
            <li>
              <strong>Завершение поиска:</strong> Поиск завершается, когда свойство найдено или достигнут конец цепочки прототипов (null)
            </li>
          </ol>
          
          <div class="note">
            <strong>Важно:</strong> Объект получает доступ только к тому прототипу, который был у конструктора на момент создания объекта. Последующие изменения прототипа конструктора не влияют на уже созданные объекты!
          </div>
        </div>
      </div>
  
      <div class="practical-section">
        <h2>Практическое применение прототипного наследования</h2>
        
        <div class="use-cases">
          <div class="use-case">
            <h3>1. Оптимизация памяти</h3>
            <p>
              Методы, определенные в прототипе, существуют в единственном экземпляре и используются всеми экземплярами класса, 
              что экономит память по сравнению с определением методов в каждом объекте.
            </p>
            <pre class="code-block">// Неэффективно: каждый объект имеет свою копию метода
  const user1 = {
    name: "Алиса",
    greet() { console.log(`Привет, я ${this.name}`); }
  };
  
  const user2 = {
    name: "Боб",
    greet() { console.log(`Привет, я ${this.name}`); }
  };
  
  // Эффективно: метод существует в одном экземпляре
  function User(name) {
    this.name = name;
  }
  
  User.prototype.greet = function() {
    console.log(`Привет, я ${this.name}`);
  };
  
  const user1 = new User("Алиса");
  const user2 = new User("Боб");</pre>
          </div>
          
          <div class="use-case">
            <h3>2. Расширение встроенных объектов</h3>
            <p>
              Прототипы позволяют расширять функциональность встроенных объектов JavaScript, 
              хотя это считается спорной практикой и требует осторожности.
            </p>
            <pre class="code-block">// Добавление метода к прототипу String
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
  
  console.log("hello".capitalize()); // "Hello"</pre>
          </div>
          
          <div class="use-case">
            <h3>3. Создание иерархий классов</h3>
            <p>
              До появления классов ES6, прототипы использовались для создания иерархий наследования.
            </p>
            <pre class="code-block">// Базовый "класс"
  function Animal(name) {
    this.name = name;
  }
  
  Animal.prototype.makeSound = function() {
    console.log("Какой-то звук");
  };
  
  // "Подкласс"
  function Dog(name, breed) {
    // Вызов конструктора родителя
    Animal.call(this, name);
    this.breed = breed;
  }
  
  // Настройка прототипного наследования
  Dog.prototype = Object.create(Animal.prototype);
  Dog.prototype.constructor = Dog;
  
  // Переопределение метода
  Dog.prototype.makeSound = function() {
    console.log("Гав-гав!");
  };</pre>
          </div>
        </div>
      </div>
  
      <div class="tips-section">
        <h2>Советы и лучшие практики</h2>
        
        <div class="tips">
          <div class="tip">
            <h3>✓ Используйте Object.create() для установки прототипа</h3>
            <p>
              Вместо прямой замены прототипа, используйте Object.create() для создания нового объекта 
              с правильной цепочкой прототипов.
            </p>
          </div>
          
          <div class="tip">
            <h3>✓ Сохраняйте свойство constructor</h3>
            <p>
              При изменении прототипа не забывайте восстанавливать свойство constructor, 
              чтобы обеспечить корректную работу instanceof и других операций.
            </p>
          </div>
          
          <div class="tip">
            <h3>✓ Предпочитайте классы ES6+ для новых проектов</h3>
            <p>
              В современном JavaScript лучше использовать синтаксис классов, который внутри использует 
              систему прототипов, но имеет более понятный синтаксис и меньше подводных камней.
            </p>
          </div>
          
          <div class="tip">
            <h3>✓ Изменяйте прототипы до создания экземпляров</h3>
            <p>
              Всегда модифицируйте прототипы конструкторов до создания экземпляров объектов, 
              чтобы избежать несогласованности в поведении объектов.
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Данные для пошаговой визуализации
  const currentStep = ref(1);
  const totalSteps = 8;
  
  // Активная вкладка с решением
  const activeSolution = ref(0);
  
  // Вычисляемые свойства для выделения элементов визуализации
  const highlightConstructor = computed(() => {
    return [1, 3].includes(currentStep.value);
  });
  
  const highlightInitialPrototype = computed(() => {
    return [1].includes(currentStep.value);
  });
  
  const highlightNewPrototype = computed(() => {
    return [3].includes(currentStep.value);
  });
  
  const highlightJuan = computed(() => {
    return [2, 8].includes(currentStep.value);
  });
  
  const highlightPedro = computed(() => {
    return [4, 7].includes(currentStep.value);
  });
  
  const prototypeChanged = computed(() => {
    return currentStep.value >= 3;
  });
  
  // Объяснения для каждого шага
  const stepExplanations = [
    {
      title: "Начальное состояние",
      description: "В начале у нас есть конструктор <code>Person</code> с методом для создания объектов. Каждый конструктор имеет свойство <code>prototype</code>, которое является объектом. Изначально этот объект содержит только свойство <code>constructor</code>, указывающее обратно на функцию-конструктор.",
      code: "function Person(name) {\n  this.name = name;\n}"
    },
    {
      title: "Создание объекта juan",
      description: "Создаётся первый экземпляр с именем 'Juan'. При использовании оператора <code>new</code>, новый объект получает внутреннюю ссылку <code>[[Prototype]]</code>, которая указывает на объект <code>Person.prototype</code>, существующий на момент создания объекта.",
      code: "const juan = new Person('Juan');"
    },
    {
      title: "Изменение Person.prototype",
      description: "После создания объекта <code>juan</code>, прототип конструктора <code>Person</code> полностью заменяется новым объектом, содержащим метод <code>getName()</code>. Важно отметить, что при такой замене теряется свойство <code>constructor</code>, и объекты, созданные ранее (например, <code>juan</code>), остаются связанными со старым прототипом, который больше не связан с конструктором!",
      code: "Person.prototype = {\n  getName: function() {\n    return this.name;\n  }\n};"
    },
    {
      title: "Создание объекта pedro",
      description: "Создаётся второй экземпляр с именем 'Pedro'. Этот новый объект получает ссылку <code>[[Prototype]]</code> на текущий объект <code>Person.prototype</code>, который содержит метод <code>getName()</code>.",
      code: "const pedro = new Person('Pedro');"
    },
    {
      title: "Текущее состояние объектов",
      description: "Теперь у нас есть два объекта: <code>juan</code> и <code>pedro</code>. Их внутренние прототипы <code>[[Prototype]]</code> указывают на разные объекты! Прототип <code>pedro</code> содержит метод <code>getName()</code>, а прототип <code>juan</code> - нет.",
      code: ""
    },
    {
      title: "Алгоритм поиска свойств",
      description: "При обращении к свойству объекта, JavaScript сначала проверяет, есть ли это свойство у самого объекта. Если свойство не найдено, JavaScript ищет его в прототипе объекта, затем в прототипе прототипа и так далее, пока не достигнет конца цепочки прототипов (null) или не найдет свойство.",
      code: ""
    },
    {
      title: "Вызов getName() для pedro",
      description: "При вызове <code>pedro.getName()</code>, JavaScript не находит метод <code>getName</code> в самом объекте <code>pedro</code>, но находит его в прототипе объекта. Метод вызывается с <code>this</code>, указывающим на <code>pedro</code>, и возвращает строку 'Pedro'.",
      code: "console.log(pedro.getName()); // 'Pedro'"
    },
    {
      title: "Вызов getName() для juan",
      description: "При вызове <code>juan.getName()</code>, JavaScript не находит метод <code>getName</code> ни в самом объекте <code>juan</code>, ни в его прототипе (который был установлен до того, как метод был добавлен в <code>Person.prototype</code>). Поэтому возникает ошибка <code>TypeError: juan.getName is not a function</code>.",
      code: "console.log(juan.getName()); // TypeError: juan.getName is not a function"
    }
  ];
  
  // Данные для решений проблемы
  const solutions = [
    {
      title: "Решение 1: Модификация прототипа вместо замены",
      description: "Вместо замены всего объекта прототипа, добавляйте методы к существующему прототипу. Это сохранит связь со всеми созданными объектами.",
      code: "function Person(name) {\n  this.name = name;\n}\n\nconst juan = new Person('Juan');\n\n// Добавляем метод к существующему прототипу\nPerson.prototype.getName = function() {\n  return this.name;\n};\n\nconst pedro = new Person('Pedro');\n\nconsole.log(pedro.getName()); // 'Pedro'\nconsole.log(juan.getName()); // 'Juan'"
    },
    {
      title: "Решение 2: Изменение прототипа до создания объектов",
      description: "Всегда устанавливайте прототип конструктора до создания экземпляров объектов.",
      code: "function Person(name) {\n  this.name = name;\n}\n\n// Устанавливаем прототип до создания объектов\nPerson.prototype = {\n  constructor: Person, // Сохраняем ссылку на конструктор\n  getName: function() {\n    return this.name;\n  }\n};\n\nconst juan = new Person('Juan');\nconst pedro = new Person('Pedro');\n\nconsole.log(pedro.getName()); // 'Pedro'\nconsole.log(juan.getName()); // 'Juan'"
    },
    {
      title: "Решение 3: Использование Object.create()",
      description: "Используйте метод <code>Object.create()</code> для установки прототипа, и не забывайте восстанавливать свойство <code>constructor</code>.",
      code: "function Person(name) {\n  this.name = name;\n}\n\nconst juan = new Person('Juan');\n\n// Создаем новый прототип, используя Object.create\nPerson.prototype = Object.create(Object.prototype, {\n  constructor: {\n    value: Person,\n    enumerable: false,\n    writable: true,\n    configurable: true\n  },\n  getName: {\n    value: function() { return this.name; },\n    enumerable: false,\n    writable: true,\n    configurable: true\n  }\n});\n\nconst pedro = new Person('Pedro');\n\n// Для juan все равно будет ошибка, т.к. его прототип остался старым\nconsole.log(pedro.getName()); // 'Pedro'\n// Чтобы исправить juan, нужно вручную обновить его прототип\nObject.setPrototypeOf(juan, Person.prototype);\nconsole.log(juan.getName()); // 'Juan'"
    },
    {
      title: "Решение 4: Использование классов ES6+",
      description: "В современном JavaScript лучше использовать синтаксис классов, который внутренне использует прототипы, но с более понятным синтаксисом.",
      code: "class Person {\n  constructor(name) {\n    this.name = name;\n  }\n  \n  getName() {\n    return this.name;\n  }\n}\n\nconst juan = new Person('Juan');\nconst pedro = new Person('Pedro');\n\nconsole.log(pedro.getName()); // 'Pedro'\nconsole.log(juan.getName()); // 'Juan'"
    }
  ];
  
  // Методы для навигации
  function nextStep() {
    if (currentStep.value < totalSteps) {
      currentStep.value++;
    }
  }
  
  function prevStep() {
    if (currentStep.value > 1) {
      currentStep.value--;
    }
  }
  
  function resetAnimation() {
    currentStep.value = 1;
  }
  </script>
  
  <style scoped>
  .proto-inheritance-explainer {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    color: #333;
    line-height: 1.6;
  }
  
  h1, h2, h3 {
    color: #2c3e50;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-top: 40px;
    margin-bottom: 20px;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
  }
  
  h3 {
    font-size: 1.2rem;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  .intro-section {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
  }
  
  .code-block {
    background-color: #f6f8fa;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    font-size: 14px;
    line-height: 1.5;
    overflow-x: auto;
    padding: 16px;
    margin: 16px 0;
    white-space: pre;
  }
  
  .explanation-container {
    background-color: white;
    border: 1px solid #e1e4e8;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 30px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .execution-controls {
    background-color: #f1f1f1;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e4e8;
  }
  
  .step-counter {
    font-weight: bold;
  }
  
  .navigation-buttons {
    display: flex;
    gap: 10px;
  }
  
  .nav-button {
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
  }
  
  .prev-button {
    background-color: #f8f9fa;
    color: #333;
  }
  
  .next-button {
    background-color: #3498db;
    color: white;
  }
  
  .reset-button {
    background-color: #2ecc71;
    color: white;
  }
  
  .nav-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .visualization-area {
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .memory-model {
    min-height: 400px;
    position: relative;
  }
  
  .memory-objects {
    position: relative;
    height: 100%;
  }
  
  .object {
    background-color: #f8f9fa;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    margin-bottom: 15px;
    overflow: hidden;
    transition: all 0.3s ease;
    position: relative;
  }
  
  .object.highlight {
    box-shadow: 0 0 0 2px #3498db;
    transform: scale(1.02);
    z-index: 10;
  }
  
  .object-title {
    background-color: #e1e4e8;
    padding: 8px 12px;
    font-weight: bold;
    font-size: 14px;
  }
  
  .object-content {
    padding: 10px;
  }
  
  .property {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
  }
  
  .property-name {
    font-weight: bold;
    margin-right: 10px;
    color: #6c5ce7;
  }
  
  .property-value {
    color: #e17055;
    font-family: monospace;
  }
  
  .property-arrow {
    width: 100px;
    height: 2px;
    background-color: #3498db;
    position: relative;
    display: inline-block;
    margin: 0 10px;
  }
  
  .property-arrow:after {
    content: '';
    position: absolute;
    right: 0;
    top: -3px;
    width: 0;
    height: 0;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 8px solid #3498db;
  }
  
  .property-arrow.changed {
    background-color: #e74c3c;
  }
  
  .property-arrow.changed:after {
    border-left-color: #e74c3c;
  }
  
  .property-arrow.orphaned {
    background-color: #95a5a6;
    border-style: dashed;
  }
  
  .property-arrow.orphaned:after {
    border-left-color: #95a5a6;
  }
  
  .property-arrow.back-reference {
    background-color: #2ecc71;
    transform: rotate(135deg);
    transform-origin: left;
    width: 50px;
    position: relative;
    top: -10px;
    left: 10px;
  }
  
  .property-arrow.back-reference:after {
    border-left-color: #2ecc71;
  }
  
  .constructor {
    position: absolute;
    top: 0;
    left: 0;
    width: 240px;
  }
  
  .prototype {
    position: absolute;
    top: 100px;
    left: 40px;
    width: 280px;
  }
  
  .instance {
    width: 240px;
  }
  
  .juan {
    position: absolute;
    top: 240px;
    left: 0;
  }
  
  .pedro {
    position: absolute;
    top: 240px;
    left: 260px;
  }
  
  .error-message, .success-message {
    margin-top: 10px;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 14px;
    font-family: monospace;
  }
  
  .error-message {
    background-color: #ffebee;
    color: #c62828;
    border-left: 3px solid #c62828;
  }
  
  .success-message {
    background-color: #e8f5e9;
    color: #2e7d32;
    border-left: 3px solid #2e7d32;
  }
  
  .property.warning .property-value {
    color: #c62828;
    font-style: italic;
  }
  
  .step-explanation {
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 6px;
    border-left: 3px solid #3498db;
  }
  
  .step-explanation h3 {
    margin-top: 0;
    color: #3498db;
  }
  
  .step-code {
    background-color: #f6f8fa;
    border: 1px solid #e1e4e8;
    border-radius: 4px;
    font-family: monospace;
    padding: 10px;
    margin-top: 10px;
  }
  
  .solution-tabs {
    display: flex;
    overflow-x: auto;
    margin-bottom: 20px;
    border-bottom: 1px solid #e1e4e8;
  }
  
  .tab-button {
    padding: 10px 15px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 14px;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
    white-space: nowrap;
  }
  
  .tab-button.active {
    border-bottom-color: #3498db;
    color: #3498db;
    font-weight: bold;
  }
  
  .solution-content {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 6px;
    animation: fadeIn 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .algorithm-explanation {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
  }
  
  .algorithm-steps {
    margin-top: 15px;
    padding-left: 20px;
  }
  
  .algorithm-steps li {
    margin-bottom: 12px;
    position: relative;
  }
  
  .note {
    background-color: #fff8e1;
    border-left: 3px solid #ffc107;
    padding: 15px;
    margin-top: 20px;
    border-radius: 4px;
  }
  
  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .use-case {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    border: 1px solid #e1e4e8;
  }
  
  .use-case h3 {
    margin-top: 0;
    color: #3498db;
  }
  
  .tips {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .tip {
    background-color: #e8f5e9;
    border-radius: 8px;
    padding: 20px;
    border: 1px solid #c8e6c9;
  }
  
  .tip h3 {
    margin-top: 0;
    color: #2e7d32;
  }
  
  @media (max-width: 768px) {
    .visualization-area {
      grid-template-columns: 1fr;
    }
    
    .memory-model {
      min-height: 500px;
    }
    
    .use-cases, .tips {
      grid-template-columns: 1fr;
    }
    
    .object {
      position: relative !important;
      top: auto !important;
      left: auto !important;
      width: auto !important;
    }
  }
  </style>