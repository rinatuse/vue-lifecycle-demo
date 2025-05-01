<template>
    <div class="this-explorer">
      <h1>Контекст <span class="highlight">this</span> в JavaScript: Интерактивное исследование</h1>
      
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
        <!-- 1. Глобальный контекст -->
        <div v-if="currentTab === 0" class="tab-content">
          <h2>Что такое <span class="highlight">this</span> в глобальном контексте</h2>
          
          <div class="explanation">
            <p>В глобальном контексте (вне любой функции) <code>this</code> всегда ссылается на глобальный объект. В браузере это объект <code>window</code>, в Node.js это <code>global</code>.</p>
          </div>
          
          <div class="code-container">
            <div class="code-panel">
              <h3>Пример кода</h3>
              <pre class="code javascript">
  // В глобальном контексте (браузер)
  console.log(this); // window
  
  // Определение глобальной переменной
  var globalVar = "Я глобальная переменная";
  console.log(this.globalVar); // "Я глобальная переменная"
  
  // Замечание: let и const не создают свойства глобального объекта!
  let localVar = "Я не в глобальном объекте";
  console.log(this.localVar); // undefined
              </pre>
              <button @click="runGlobalExample" class="run-button">Запустить</button>
            </div>
          </div>
          
          <div v-if="showResult" class="result-container">
            <h3>Результат выполнения</h3>
            <div class="runtime-visualization">
              <div class="global-object">
                <div class="object-title">Глобальный объект (window)</div>
                <div class="object-content">
                  <div class="property-item" :class="{ highlight: animationStep >= 1 }">
                    <div class="property-name">globalVar:</div>
                    <div class="property-value">"Я глобальная переменная"</div>
                  </div>
                  <div class="property-item" :class="{ 'not-found': animationStep >= 2 }">
                    <div class="property-name">localVar:</div>
                    <div class="property-value">undefined</div>
                  </div>
                </div>
              </div>
              
              <div class="this-reference">
                <div class="this-title">this в глобальном контексте</div>
                <div class="this-arrow"></div>
              </div>
            </div>
            
            <div class="explanation-steps">
              <div class="step" :class="{ active: animationStep >= 1 }">
                <div class="step-number">1</div>
                <div class="step-content">
                  <p>В глобальном контексте <code>this</code> указывает на глобальный объект (<code>window</code> в браузере).</p>
                </div>
              </div>
              
              <div class="step" :class="{ active: animationStep >= 2 }">
                <div class="step-number">2</div>
                <div class="step-content">
                  <p>Переменные, объявленные с <code>var</code>, становятся свойствами глобального объекта.</p>
                </div>
              </div>
              
              <div class="step" :class="{ active: animationStep >= 3 }">
                <div class="step-number">3</div>
                <div class="step-content">
                  <p>Переменные, объявленные с <code>let</code> и <code>const</code>, НЕ становятся свойствами глобального объекта.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 2. Контекст функции -->
        <div v-if="currentTab === 1" class="tab-content">
          <h2>Контекст <span class="highlight">this</span> в функциях</h2>
          
          <div class="explanation">
            <p>Значение <code>this</code> в функции зависит от того, как функция вызывается, а не от того, как она определена.</p>
          </div>
          
          <div class="subtabs">
            <button 
              v-for="(subtab, index) in functionSubtabs" 
              :key="index"
              :class="{ active: currentFunctionTab === index }"
              @click="switchFunctionTab(index)"
              class="subtab-button"
            >
              {{ subtab.title }}
            </button>
          </div>
          
          <!-- Простой вызов функции -->
          <div v-if="currentFunctionTab === 0" class="subtab-content">
            <div class="code-container">
              <div class="code-panel">
                <h3>Простой вызов функции</h3>
                <pre class="code javascript">
  function checkThis() {
    console.log(this);
  }
  
  // Простой вызов функции
  checkThis(); // В строгом режиме: undefined, в нестрогом: глобальный объект
  
  // Строгий режим
  function strictFunction() {
    'use strict';
    console.log(this);
  }
  
  strictFunction(); // undefined
                </pre>
                <button @click="runSimpleFunctionExample" class="run-button">Запустить</button>
              </div>
            </div>
            
            <div v-if="showResult" class="result-container">
              <h3>Результат выполнения</h3>
              <div class="runtime-visualization">
                <div class="function-call">
                  <div class="function-title">checkThis()</div>
                  <div class="function-body">
                    <div class="code-line">console.log(this);</div>
                  </div>
                </div>
                
                <div class="this-reference" :class="{ 'strict-mode': animationStep >= 2 }">
                  <div class="this-title">
                    <span v-if="animationStep < 2">this = window (нестрогий режим)</span>
                    <span v-else>this = undefined (строгий режим)</span>
                  </div>
                  <div class="this-arrow"></div>
                </div>
              </div>
              
              <div class="explanation-steps">
                <div class="step" :class="{ active: animationStep >= 1 }">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <p>При простом вызове функции в нестрогом режиме <code>this</code> указывает на глобальный объект.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: animationStep >= 2 }">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <p>В строгом режиме (<code>'use strict'</code>) при простом вызове функции <code>this</code> будет <code>undefined</code>.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: animationStep >= 3 }">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <p>Это поведение независимо от того, где функция была определена — важен только способ вызова.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Метод объекта -->
          <div v-if="currentFunctionTab === 1" class="subtab-content">
            <div class="code-container">
              <div class="code-panel">
                <h3>Вызов функции как метода объекта</h3>
                <pre class="code javascript">
  const user = {
    name: "Иван",
    greet: function() {
      console.log(`Привет, меня зовут ${this.name}!`);
      console.log(this);
    }
  };
  
  // Вызов как метод объекта
  user.greet(); // this указывает на объект user
  
  // Сохранение ссылки на метод и вызов как обычной функции
  const greetFunction = user.greet;
  greetFunction(); // this указывает на глобальный объект (или undefined в строгом режиме)
                </pre>
                <button @click="runMethodExample" class="run-button">Запустить</button>
              </div>
            </div>
            
            <div v-if="showResult" class="result-container">
              <h3>Результат выполнения</h3>
              <div class="runtime-visualization">
                <div class="user-object">
                  <div class="object-title">user</div>
                  <div class="object-content">
                    <div class="property-item">
                      <div class="property-name">name:</div>
                      <div class="property-value">"Иван"</div>
                    </div>
                    <div class="property-item">
                      <div class="property-name">greet:</div>
                      <div class="property-value">function() { ... }</div>
                    </div>
                  </div>
                </div>
                
                <div class="call-sequence">
                  <div class="call-item" :class="{ active: animationStep >= 1, inactive: animationStep >= 3 }">
                    <div class="code-line">user.greet()</div>
                    <div class="arrow-right"></div>
                  </div>
                  <div class="call-item" :class="{ active: animationStep >= 3 }">
                    <div class="code-line">greetFunction()</div>
                    <div class="arrow-right"></div>
                  </div>
                </div>
                
                <div class="this-reference" :class="{ 'global-this': animationStep >= 3 }">
                  <div class="this-title">
                    <span v-if="animationStep < 3">this = user</span>
                    <span v-else>this = window</span>
                  </div>
                  <div class="this-arrow"></div>
                </div>
              </div>
              
              <div class="explanation-steps">
                <div class="step" :class="{ active: animationStep >= 1 }">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <p>При вызове функции как метода объекта (<code>user.greet()</code>), <code>this</code> указывает на объект перед точкой.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: animationStep >= 2 }">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <p>Объект-владелец (<code>user</code>) становится контекстом для <code>this</code> внутри функции.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: animationStep >= 3 }">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <p>Если же метод сохранить в переменную и вызвать как обычную функцию, контекст теряется.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: animationStep >= 4 }">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <p>При вызове через переменную <code>greetFunction()</code>, <code>this</code> указывает на глобальный объект.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Конструктор -->
          <div v-if="currentFunctionTab === 2" class="subtab-content">
            <div class="code-container">
              <div class="code-panel">
                <h3>Функция-конструктор и оператор new</h3>
                <pre class="code javascript">
  function Person(name) {
    // При вызове через new, this указывает на новый объект
    this.name = name;
    this.sayHello = function() {
      console.log(`Привет, меня зовут ${this.name}`);
    };
    
    console.log(this);
  }
  
  // Вызов функции через new
  const ivan = new Person("Иван");
  ivan.sayHello(); // "Привет, меня зовут Иван"
  
  // Вызов без new (не рекомендуется!)
  Person("Ольга"); // this указывает на глобальный объект!
  console.log(window.name); // "Ольга" в браузере, свойство добавилось к window
                </pre>
                <button @click="runConstructorExample" class="run-button">Запустить</button>
              </div>
            </div>
            
            <div v-if="showResult" class="result-container">
              <h3>Результат выполнения</h3>
              <div class="runtime-visualization">
                <div class="constructor-calls">
                  <div class="call-with-new" :class="{ active: animationStep >= 1, inactive: animationStep >= 3 }">
                    <div class="code-line">new Person("Иван")</div>
                    <div class="arrow-right"></div>
                  </div>
                  <div class="call-without-new" :class="{ active: animationStep >= 3 }">
                    <div class="code-line">Person("Ольга")</div>
                    <div class="arrow-right"></div>
                  </div>
                </div>
                
                <div class="objects-container">
                  <div class="person-object" :class="{ active: animationStep >= 1, inactive: animationStep >= 3 }">
                    <div class="object-title">ivan (new Object)</div>
                    <div class="object-content">
                      <div class="property-item">
                        <div class="property-name">name:</div>
                        <div class="property-value">"Иван"</div>
                      </div>
                      <div class="property-item">
                        <div class="property-name">sayHello:</div>
                        <div class="property-value">function() { ... }</div>
                      </div>
                      <div class="property-item">
                        <div class="property-name">__proto__:</div>
                        <div class="property-value">Person.prototype</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="global-object" :class="{ active: animationStep >= 3 }">
                    <div class="object-title">window (глобальный объект)</div>
                    <div class="object-content">
                      <div class="property-item">
                        <div class="property-name">name:</div>
                        <div class="property-value">"Ольга"</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="this-reference" :class="{ 'global-this': animationStep >= 3 }">
                  <div class="this-title">
                    <span v-if="animationStep < 3">this = новый объект</span>
                    <span v-else>this = window</span>
                  </div>
                  <div class="this-arrow"></div>
                </div>
              </div>
              
              <div class="explanation-steps">
                <div class="step" :class="{ active: animationStep >= 1 }">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <p>При вызове функции с оператором <code>new</code> создаётся новый пустой объект.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: animationStep >= 2 }">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <p>Этот новый объект становится значением <code>this</code> внутри функции-конструктора.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: animationStep >= 3 }">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <p>Если вызвать функцию-конструктор без <code>new</code>, то <code>this</code> будет указывать на глобальный объект.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: animationStep >= 4 }">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <p>Это может привести к загрязнению глобального объекта, что является потенциальной ошибкой.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 3. Явное указание контекста -->
        <div v-if="currentTab === 2" class="tab-content">
          <h2>Явное указание контекста <span class="highlight">this</span></h2>
          
          <div class="explanation">
            <p>JavaScript предоставляет методы для явного указания значения <code>this</code> при вызове функции: <code>call</code>, <code>apply</code> и <code>bind</code>.</p>
          </div>
          
          <div class="subtabs">
            <button 
              v-for="(subtab, index) in explicitSubtabs" 
              :key="index"
              :class="{ active: currentExplicitTab === index }"
              @click="switchExplicitTab(index)"
              class="subtab-button"
            >
              {{ subtab.title }}
            </button>
          </div>
          
          <!-- Call и Apply -->
          <div v-if="currentExplicitTab === 0" class="subtab-content">
            <div class="code-container">
              <div class="code-panel">
                <h3>Методы call() и apply()</h3>
                <pre class="code javascript">
  function greet(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation}`);
  }
  
  const person1 = { name: "Иван" };
  const person2 = { name: "Мария" };
  
  // Использование call(context, arg1, arg2, ...)
  greet.call(person1, "Привет", "!"); // "Привет, Иван!"
  greet.call(person2, "Здравствуйте", "."); // "Здравствуйте, Мария."
  
  // Использование apply(context, [argumentsArray])
  greet.apply(person1, ["Добрый день", "!"]); // "Добрый день, Иван!"
  greet.apply(person2, ["Добрый вечер", "..."]); // "Добрый вечер, Мария..."
  
  // Сравнение
  // call: аргументы по отдельности
  // apply: аргументы в массиве
                </pre>
                <button @click="runCallApplyExample" class="run-button">Запустить</button>
              </div>
            </div>
            
            <div v-if="showResult" class="result-container">
              <h3>Результат выполнения</h3>
              <div class="runtime-visualization">
                <div class="persons-container">
                  <div class="person-object">
                    <div class="object-title">person1</div>
                    <div class="object-content">
                      <div class="property-item">
                        <div class="property-name">name:</div>
                        <div class="property-value">"Иван"</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="person-object">
                    <div class="object-title">person2</div>
                    <div class="object-content">
                      <div class="property-item">
                        <div class="property-name">name:</div>
                        <div class="property-value">"Мария"</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="calls-container">
                  <div class="call-item" :class="{ active: animationStep === 1 }">
                    <div class="code-line">greet.call(person1, "Привет", "!")</div>
                    <div class="arrow-right"></div>
                  </div>
                  <div class="call-item" :class="{ active: animationStep === 2 }">
                    <div class="code-line">greet.call(person2, "Здравствуйте", ".")</div>
                    <div class="arrow-right"></div>
                  </div>
                  <div class="call-item" :class="{ active: animationStep === 3 }">
                    <div class="code-line">greet.apply(person1, ["Добрый день", "!"])</div>
                    <div class="arrow-right"></div>
                  </div>
                  <div class="call-item" :class="{ active: animationStep === 4 }">
                    <div class="code-line">greet.apply(person2, ["Добрый вечер", "..."])</div>
                    <div class="arrow-right"></div>
                  </div>
                </div>
                
                <div class="this-reference" :class="{ 
                  'person1': animationStep === 1 || animationStep === 3,
                  'person2': animationStep === 2 || animationStep === 4
                }">
                  <div class="this-title">
                    <span v-if="animationStep === 1 || animationStep === 3">this = person1</span>
                    <span v-else-if="animationStep === 2 || animationStep === 4">this = person2</span>
                    <span v-else>this = ?</span>
                  </div>
                  <div class="this-arrow"></div>
                </div>
              </div>
              
              <div class="explanation-steps">
                <div class="step" :class="{ active: animationStep >= 1 }">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <p>Методы <code>call()</code> и <code>apply()</code> позволяют явно указать, что будет <code>this</code> при вызове функции.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: animationStep >= 2 }">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <p>Первый аргумент — объект, который станет <code>this</code> внутри функции.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: animationStep >= 3 }">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <p><code>call()</code> принимает аргументы функции через запятую.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: animationStep >= 4 }">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <p><code>apply()</code> принимает аргументы функции как массив.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Bind -->
          <div v-if="currentExplicitTab === 1" class="subtab-content">
            <div class="code-container">
              <div class="code-panel">
                <h3>Метод bind()</h3>
                <pre class="code javascript">
  function greet(greeting) {
    console.log(`${greeting}, ${this.name}!`);
  }
  
  const person = { name: "Иван" };
  
  // bind() создаёт новую функцию с привязанным контекстом
  const greetIvan = greet.bind(person);
  
  // Вызываем новую функцию - this уже привязан
  greetIvan("Привет"); // "Привет, Иван!"
  
  // bind() не изменяет оригинальную функцию
  greet("Привет"); // "Привет, undefined!" - this здесь глобальный объект
  
  // Можно также частично применить аргументы
  const sayHelloToIvan = greet.bind(person, "Привет");
  sayHelloToIvan(); // "Привет, Иван!" - все аргументы уже предустановлены
                </pre>
                <button @click="runBindExample" class="run-button">Запустить</button>
              </div>
            </div>
            
            <div v-if="showResult" class="result-container">
              <h3>Результат выполнения</h3>
              <div class="runtime-visualization">
                <div class="bind-visualization">
                  <div class="original-function" :class="{ active: animationStep >= 1 }">
                    <div class="function-title">greet(greeting)</div>
                    <div class="function-body">
                      <div class="code-line">console.log(`${greeting}, ${this.name}!`);</div>
                    </div>
                  </div>
                  
                  <div class="bind-process" :class="{ active: animationStep >= 2 }">
                    <div class="code-line">greet.bind(person)</div>
                    <div class="arrow-down"></div>
                  </div>
                  
                  <div class="bound-function" :class="{ active: animationStep >= 3 }">
                    <div class="function-title">greetIvan(greeting)</div>
                    <div class="bound-indicator">Bound: this = person</div>
                    <div class="function-body">
                      <div class="code-line">console.log(`${greeting}, ${this.name}!`);</div>
                    </div>
                  </div>
                </div>
                
                <div class="person-object" :class="{ active: animationStep >= 2 }">
                  <div class="object-title">person</div>
                  <div class="object-content">
                    <div class="property-item">
                      <div class="property-name">name:</div>
                      <div class="property-value">"Иван"</div>
                    </div>
                  </div>
                </div>
                
                <div class="calls-container" :class="{ active: animationStep >= 4 }">
                  <div class="call-item" :class="{ active: animationStep === 4 }">
                    <div class="code-line">greetIvan("Привет")</div>
                    <div class="result-line">"Привет, Иван!"</div>
                  </div>
                  <div class="call-item" :class="{ active: animationStep === 5 }">
                    <div class="code-line">greet("Привет")</div>
                    <div class="result-line">"Привет, undefined!"</div>
                  </div>
                  <div class="call-item" :class="{ active: animationStep === 6 }">
                    <div class="code-line">sayHelloToIvan()</div>
                    <div class="result-line">"Привет, Иван!"</div>
                  </div>
                </div>
              </div>
              
              <div class="explanation-steps">
                <div class="step" :class="{ active: animationStep >= 1 }">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <p>Метод <code>bind()</code> создает новую функцию, у которой значение <code>this</code> привязано к указанному объекту.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: animationStep >= 2 }">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <p>В отличие от <code>call()</code> и <code>apply()</code>, <code>bind()</code> не вызывает функцию немедленно.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: animationStep >= 3 }">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <p>Новая функция запоминает контекст <code>this</code> и его нельзя изменить даже с помощью <code>call()</code> или <code>apply()</code>.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: animationStep >= 4 }">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <p><code>bind()</code> также позволяет частично применять аргументы, предустанавливая их для будущих вызовов (частичное применение функций).</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: animationStep >= 5 }">
                  <div class="step-number">5</div>
                  <div class="step-content">
                    <p>Оригинальная функция остаётся неизменной и при вызове её напрямую <code>this</code> определяется обычным способом.</p>
                  </div>
                </div>
                
                <div class="step" :class="{ active: animationStep >= 6 }">
                  <div class="step-number">6</div>
                  <div class="step-content">
                    <p><code>bind()</code> особенно полезен при передаче методов объекта как обработчиков событий, для сохранения контекста.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 4. Стрелочные функции -->
        <div v-if="currentTab === 3" class="tab-content">
          <h2>Стрелочные функции и <span class="highlight">this</span></h2>
          
          <div class="explanation">
            <p>Стрелочные функции в JavaScript имеют важное отличие от обычных функций — у них нет собственного <code>this</code>. Вместо этого они используют значение <code>this</code> из окружающего лексического контекста.</p>
          </div>
          
          <div class="code-container">
            <div class="code-panel">
              <h3>Стрелочные функции vs обычные функции</h3>
              <pre class="code javascript">
  const user = {
    name: "Иван",
    
    // Метод с обычной функцией
    greetRegular: function() {
      console.log(`Привет, меня зовут ${this.name}`);
      
      // Функция внутри метода
      function innerFunction() {
        console.log("innerFunction this:", this); // в строгом режиме: undefined
        console.log(`Внутренняя функция: ${this.name}`); // this.name будет undefined
      }
      
      innerFunction();
    },
    
    // Метод со стрелочной функцией
    greetArrow: function() {
      console.log(`Привет, меня зовут ${this.name}`);
      
      // Стрелочная функция внутри метода
      const innerArrow = () => {
        console.log("innerArrow this:", this); // this из внешнего контекста (user)
        console.log(`Внутренняя стрелочная: ${this.name}`); // "Иван"
      }
      
      innerArrow();
    }
  };
  
  user.greetRegular();
  user.greetArrow();
              </pre>
              <button @click="runArrowExample" class="run-button">Запустить</button>
            </div>
          </div>
          
          <div v-if="showResult" class="result-container">
            <h3>Результат выполнения</h3>
            <div class="runtime-visualization">
              <div class="user-object">
                <div class="object-title">user</div>
                <div class="object-content">
                  <div class="property-item">
                    <div class="property-name">name:</div>
                    <div class="property-value">"Иван"</div>
                  </div>
                  <div class="property-item">
                    <div class="property-name">greetRegular:</div>
                    <div class="property-value">function() { ... }</div>
                  </div>
                  <div class="property-item">
                    <div class="property-name">greetArrow:</div>
                    <div class="property-value">function() { ... }</div>
                  </div>
                </div>
              </div>
              
              <div class="execution-context" :class="{ active: animationStep >= 1 }">
                <div class="context-title">
                  <span v-if="animationStep >= 1 && animationStep < 4">user.greetRegular()</span>
                  <span v-else-if="animationStep >= 4">user.greetArrow()</span>
                </div>
                <div class="context-this">
                  <div class="this-binding">this = user</div>
                </div>
                <div class="inner-execution-context" :class="{ active: animationStep === 2 || animationStep === 3 || animationStep === 5 || animationStep === 6 }">
                  <div class="context-title">
                    <span v-if="animationStep === 2 || animationStep === 3">innerFunction()</span>
                    <span v-else-if="animationStep === 5 || animationStep === 6">innerArrow()</span>
                  </div>
                  <div class="context-this">
                    <div class="this-binding" :class="{ 'lost-context': animationStep === 2 || animationStep === 3, 'lexical-context': animationStep === 5 || animationStep === 6 }">
                      <span v-if="animationStep === 2 || animationStep === 3">this = undefined</span>
                      <span v-else-if="animationStep === 5 || animationStep === 6">this = user (лексический this)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="explanation-steps">
              <div class="step" :class="{ active: animationStep >= 1 }">
                <div class="step-number">1</div>
                <div class="step-content">
                  <p>При вызове <code>user.greetRegular()</code>, <code>this</code> внутри метода указывает на объект <code>user</code>.</p>
                </div>
              </div>
              
              <div class="step" :class="{ active: animationStep >= 2 }">
                <div class="step-number">2</div>
                <div class="step-content">
                  <p>Внутри обычной функции <code>innerFunction()</code> значение <code>this</code> не наследуется от внешней функции.</p>
                </div>
              </div>
              
              <div class="step" :class="{ active: animationStep >= 3 }">
                <div class="step-number">3</div>
                <div class="step-content">
                  <p>При простом вызове <code>innerFunction()</code>, <code>this</code> будет <code>undefined</code> в строгом режиме или глобальный объект в нестрогом.</p>
                </div>
              </div>
              
              <div class="step" :class="{ active: animationStep >= 4 }">
                <div class="step-number">4</div>
                <div class="step-content">
                  <p>При вызове <code>user.greetArrow()</code>, <code>this</code> внутри метода также указывает на объект <code>user</code>.</p>
                </div>
              </div>
              
              <div class="step" :class="{ active: animationStep >= 5 }">
                <div class="step-number">5</div>
                <div class="step-content">
                  <p>Стрелочная функция <code>innerArrow</code> не имеет собственного <code>this</code> и использует <code>this</code> из лексического окружения.</p>
                </div>
              </div>
              
              <div class="step" :class="{ active: animationStep >= 6 }">
                <div class="step-number">6</div>
                <div class="step-content">
                  <p>Внутри <code>innerArrow</code>, <code>this</code> продолжает указывать на объект <code>user</code>, как и в родительской функции.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="key-points">
            <h3>Ключевые особенности стрелочных функций и this:</h3>
            <ul>
              <li>Стрелочные функции не имеют собственного <code>this</code> — они используют значение <code>this</code> из внешнего лексического окружения.</li>
              <li>Это делает их идеальными для функций обратного вызова внутри методов объекта, где нужно сохранить контекст.</li>
              <li>Значение <code>this</code> в стрелочных функциях нельзя изменить даже с помощью <code>call()</code>, <code>apply()</code> или <code>bind()</code>.</li>
              <li>Стрелочные функции нельзя использовать как конструкторы (с оператором <code>new</code>).</li>
              <li>Стрелочные функции не имеют собственного объекта <code>arguments</code> и <code>super</code>.</li>
            </ul>
          </div>
        </div>
        
        <!-- 5. Практические примеры -->
        <div v-if="currentTab === 4" class="tab-content">
          <h2>Практические примеры и ошибки с <span class="highlight">this</span></h2>
          
          <div class="explanation">
            <p>Понимание контекста <code>this</code> особенно важно при работе с асинхронным кодом, обработчиками событий и колбэками. Рассмотрим несколько практических примеров и распространённых ошибок.</p>
          </div>
          
          <div class="subtabs">
            <button 
              v-for="(subtab, index) in practicalSubtabs" 
              :key="index"
              :class="{ active: currentPracticalTab === index }"
              @click="switchPracticalTab(index)"
              class="subtab-button"
            >
              {{ subtab.title }}
            </button>
          </div>
          
          <!-- Проблема с обработчиками событий -->
          <div v-if="currentPracticalTab === 0" class="subtab-content">
            <div class="code-container">
              <div class="code-panel">
                <h3>Проблема с обработчиками событий</h3>
                <pre class="code javascript">
  class Counter {
    constructor() {
      this.count = 0;
      this.button = document.getElementById('counterButton');
      
      // Проблема: потеря контекста this
      this.button.addEventListener('click', function() {
        // this здесь указывает на button, а не на экземпляр Counter
        this.count += 1;
        console.log('Счетчик:', this.count); // this.count будет undefined
      });
    }
  }
  
  // Решение 1: сохранение this в переменную
  class CounterFixed1 {
    constructor() {
      this.count = 0;
      this.button = document.getElementById('counterButton');
      
      const self = this; // Сохраняем ссылку на this
      this.button.addEventListener('click', function() {
        self.count += 1; // Используем self вместо this
        console.log('Счетчик (fixed1):', self.count);
      });
    }
  }
  
  // Решение 2: использование bind
  class CounterFixed2 {
    constructor() {
      this.count = 0;
      this.button = document.getElementById('counterButton');
      
      this.button.addEventListener('click', function() {
        this.count += 1;
        console.log('Счетчик (fixed2):', this.count);
      }.bind(this)); // Привязываем this к обработчику
    }
  }
  
  // Решение 3: использование стрелочной функции
  class CounterFixed3 {
    constructor() {
      this.count = 0;
      this.button = document.getElementById('counterButton');
      
      this.button.addEventListener('click', () => {
        // Стрелочная функция использует this из внешнего контекста
        this.count += 1;
        console.log('Счетчик (fixed3):', this.count);
      });
    }
  }
                </pre>
                <div class="scenario-note">
                  <p>* Примечание: Этот код предназначен для работы в браузере с элементом <code>button</code> с id="counterButton".</p>
                </div>
              </div>
            </div>
            
            <div class="scenario-visualization">
              <h3>Иллюстрация проблемы</h3>
              <div class="event-handler-viz">
                <div class="button-element">
                  <div class="element-title">button</div>
                  <div class="element-content">
                    <button class="demo-button" @click="simulateButtonClick">Кликни меня</button>
                  </div>
                </div>
                
                <div class="counter-instance">
                  <div class="instance-title">Counter {}</div>
                  <div class="instance-property">
                    <div class="property-name">count:</div>
                    <div class="property-value">{{ counterValue }}</div>
                  </div>
                </div>
                
                <div class="event-flow" :class="{ active: clickAnimating }">
                  <div class="click-event">Click!</div>
                  <div class="callback-execution">
                    <div class="callback-code">function() { this.count += 1; }</div>
                    <div class="callback-context" :class="{ 'wrong-context': showWrongContext, 'right-context': showRightContext }">
                      <span v-if="showWrongContext">this = button</span>
                      <span v-else-if="showRightContext">this = Counter</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="example-explanation">
                <h4>Объяснение проблемы и решений:</h4>
                <ol>
                  <li>
                    <strong>Проблема:</strong> При использовании обычной функции в качестве обработчика события, <code>this</code> внутри функции указывает на элемент, инициировавший событие (кнопка), а не на экземпляр класса.
                  </li>
                  <li>
                    <strong>Решение 1:</strong> Сохранение <code>this</code> в переменную (например, <code>self</code> или <code>that</code>) перед определением обработчика. Это старый подход, который работал до появления стрелочных функций.
                  </li>
                  <li>
                    <strong>Решение 2:</strong> Использование метода <code>bind()</code> для явной привязки контекста <code>this</code> к функции-обработчику.
                  </li>
                  <li>
                    <strong>Решение 3:</strong> Использование стрелочной функции, которая не имеет собственного <code>this</code> и использует <code>this</code> из внешнего лексического контекста (из конструктора класса).
                  </li>
                </ol>
                <p>Третий вариант (стрелочная функция) является наиболее современным и предпочтительным способом решения этой проблемы.</p>
              </div>
            </div>
          </div>
          
          <!-- Потеря контекста в колбэках -->
          <div v-if="currentPracticalTab === 1" class="subtab-content">
            <div class="code-container">
              <div class="code-panel">
                <h3>Потеря контекста в колбэках</h3>
                <pre class="code javascript">
  class UserService {
    constructor() {
      this.users = [];
      this.isLoggedIn = false;
    }
    
    // Метод для загрузки пользователей с сервера
    loadUsers() {
      // Имитация асинхронного запроса
      setTimeout(function() {
        // Проблема: this не указывает на экземпляр UserService!
        this.users = ["Пользователь 1", "Пользователь 2"];
        console.log("Пользователи загружены:", this.users); // this.users будет undefined
      }, 1000);
    }
    
    // Решение с использованием стрелочной функции
    loadUsersFixed() {
      setTimeout(() => {
        // Стрелочная функция использует this из внешнего контекста
        this.users = ["Пользователь 1", "Пользователь 2"];
        console.log("Пользователи загружены (fixed):", this.users);
      }, 1000);
    }
    
    // Решение с использованием bind
    loadUsersFixedBind() {
      setTimeout(function() {
        this.users = ["Пользователь 1", "Пользователь 2"];
        console.log("Пользователи загружены (bind):", this.users);
      }.bind(this), 1000);
    }
  }
  
  const service = new UserService();
  service.loadUsers(); // Проблема
  service.loadUsersFixed(); // ОК
  service.loadUsersFixedBind(); // ОК
                </pre>
              </div>
            </div>
            
            <div class="scenario-visualization">
              <h3>Иллюстрация проблемы в асинхронном коде</h3>
              <div class="async-viz">
                <div class="service-instance">
                  <div class="instance-title">UserService {}</div>
                  <div class="instance-properties">
                    <div class="property-item">
                      <div class="property-name">users:</div>
                      <div class="property-value">{{ serviceUsers }}</div>
                    </div>
                    <div class="property-item">
                      <div class="property-name">isLoggedIn:</div>
                      <div class="property-value">{{ serviceLoggedIn }}</div>
                    </div>
                  </div>
                </div>
                
                <div class="async-flow" :class="{ active: asyncAnimating }">
                  <div class="method-call">
                    <div class="call-label">Вызов метода:</div>
                    <div class="call-name">{{ asyncMethod }}</div>
                  </div>
                  
                  <div class="timeout-container">
                    <div class="timeout-label">setTimeout()</div>
                    <div class="time-passing">
                      <div class="time-indicator" v-if="asyncAnimating">1000ms</div>
                    </div>
                    <div class="callback-execution">
                      <div class="callback-label">Callback:</div>
                      <div class="callback-code">
                        <span v-if="asyncMethod === 'loadUsers'">function() { this.users = [...]; }</span>
                        <span v-else-if="asyncMethod === 'loadUsersFixed'">() => { this.users = [...]; }</span>
                        <span v-else>function() { this.users = [...]; }.bind(this)</span>
                      </div>
                      <div class="context-indicator" :class="{ 'wrong-context': showAsyncWrongContext, 'right-context': showAsyncRightContext }">
                        <span v-if="showAsyncWrongContext">this = window</span>
                        <span v-else-if="showAsyncRightContext">this = UserService</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="example-explanation">
                <h4>Объяснение проблемы с асинхронными колбэками:</h4>
                <ol>
                  <li>
                    <strong>Проблема:</strong> В асинхронных колбэках (например, в <code>setTimeout</code>, AJAX-запросах, промисах) обычная функция теряет контекст <code>this</code>, и он указывает на глобальный объект.
                  </li>
                  <li>
                    <strong>Почему это происходит:</strong> Когда функция вызывается как колбэк, она вызывается как обычная функция, а не как метод объекта, поэтому <code>this</code> не привязан к объекту.
                  </li>
                  <li>
                    <strong>Решение со стрелочной функцией:</strong> Стрелочная функция наследует <code>this</code> из лексического окружения, где она была определена.
                  </li>
                  <li>
                    <strong>Решение с <code>bind</code>:</strong> Явная привязка <code>this</code> к колбэку с помощью метода <code>bind</code> гарантирует, что <code>this</code> внутри функции будет указывать на нужный объект.
                  </li>
                </ol>
                <p>В современном JavaScript стрелочные функции обычно предпочтительнее для колбэков, так как они более компактны и наглядны, чем использование <code>bind</code>.</p>
              </div>
            </div>
          </div>
          
          <!-- Методы как значения -->
          <div v-if="currentPracticalTab === 2" class="subtab-content">
            <div class="code-container">
              <div class="code-panel">
                <h3>Передача методов как значений</h3>
                <pre class="code javascript">
  const user = {
    name: "Иван",
    greet() {
      console.log(`Привет, меня зовут ${this.name}!`);
    },
    greetArrow: () => {
      // Неправильное использование стрелочной функции как метода!
      console.log(`Привет, меня зовут ${this.name}!`);
    }
  };
  
  // Прямой вызов работает как ожидается
  user.greet(); // "Привет, меня зовут Иван!"
  
  // Проблема: потеря контекста при передаче метода как значения
  const greetFunction = user.greet;
  greetFunction(); // "Привет, меня зовут undefined!"
  
  // Решение 1: использование bind
  const boundGreet = user.greet.bind(user);
  boundGreet(); // "Привет, меня зовут Иван!"
  
  // Решение 2: использовать вызов через объект
  function executeMethod(obj, method) {
    obj[method]();
  }
  executeMethod(user, 'greet'); // "Привет, меня зовут Иван!"
  
  // Проблема со стрелочной функцией как методом объекта
  user.greetArrow(); // "Привет, меня зовут undefined!"
  // Контекст стрелочной функции - это лексическое окружение, где она была определена,
  // а не объект, через который она вызывается!
                </pre>
              </div>
            </div>
            
            <div class="scenario-visualization">
              <h3>Иллюстрация проблемы при передаче методов</h3>
              <div class="method-value-viz">
                <div class="user-object">
                  <div class="object-title">user</div>
                  <div class="object-properties">
                    <div class="property-item">
                      <div class="property-name">name:</div>
                      <div class="property-value">"Иван"</div>
                    </div>
                    <div class="property-item method">
                      <div class="property-name">greet:</div>
                      <div class="property-value">function() { ... }</div>
                    </div>
                  </div>
                </div>
                
                <div class="method-calls">
                  <div class="call-sequence">
                    <div class="call-item" :class="{ active: methodCallStep === 1 }">
                      <div class="code-line">user.greet()</div>
                      <div class="result-line">"Привет, меня зовут Иван!"</div>
                    </div>
                    <div class="call-item" :class="{ active: methodCallStep === 2 }">
                      <div class="code-line">greetFunction = user.greet</div>
                      <div class="code-line">greetFunction()</div>
                      <div class="result-line">"Привет, меня зовут undefined!"</div>
                    </div>
                    <div class="call-item" :class="{ active: methodCallStep === 3 }">
                      <div class="code-line">boundGreet = user.greet.bind(user)</div>
                      <div class="code-line">boundGreet()</div>
                      <div class="result-line">"Привет, меня зовут Иван!"</div>
                    </div>
                  </div>
                  
                  <div class="context-explanation">
                    <div v-if="methodCallStep === 1">
                      <strong>Прямой вызов метода:</strong> При вызове <code>user.greet()</code>, <code>this</code> внутри функции указывает на объект <code>user</code>.
                    </div>
                    <div v-else-if="methodCallStep === 2">
                      <strong>Присвоение и вызов:</strong> При присвоении метода переменной и вызове как функции (<code>greetFunction()</code>), контекст <code>this</code> теряется и становится <code>undefined</code> или глобальным объектом.
                    </div>
                    <div v-else-if="methodCallStep === 3">
                      <strong>Использование bind:</strong> <code>bind</code> создает новую функцию с привязанным контекстом <code>this</code>, поэтому <code>boundGreet()</code> работает корректно.
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="method-arrow-warning" :class="{ active: methodCallStep === 4 }">
                <h4>Предупреждение: Стрелочные функции как методы объектов</h4>
                <div class="warning-content">
                  <p>Не используйте стрелочные функции как методы объектов, если вам нужен доступ к объекту через <code>this</code>:</p>
                  <pre class="code-snippet">
  const obj = {
    name: "Объект",
    // Плохо! Стрелочная функция не имеет доступа к объекту через this
    badMethod: () => {
      console.log(this.name); // this не указывает на obj!
    },
    // Хорошо! Обычный метод имеет this, указывающий на объект
    goodMethod() {
      console.log(this.name); // "Объект"
    }
  };
                  </pre>
                  <p>Стрелочная функция всегда сохраняет значение <code>this</code> из окружения, где она была определена, а не из контекста вызова.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 6. Quiz -->
        <div v-if="currentTab === 5" class="tab-content">
          <h2>Проверь себя: тест по <span class="highlight">this</span></h2>
          
          <div class="explanation">
            <p>Проверьте свое понимание контекста <code>this</code> в JavaScript с помощью этого теста. Попробуйте определить, на что указывает <code>this</code> в каждом примере.</p>
          </div>
          
          <div class="quiz-container">
            <div v-if="!quizStarted && !quizFinished">
              <button @click="startQuiz" class="start-quiz-button">Начать тест</button>
            </div>
            
            <div v-if="quizStarted && !quizFinished" class="quiz-question">
              <div class="question-number">Вопрос {{ currentQuestion + 1 }} из {{ quizQuestions.length }}</div>
              <div class="question-text">{{ quizQuestions[currentQuestion].question }}</div>
              
              <pre class="code javascript">{{ quizQuestions[currentQuestion].code }}</pre>
              
              <div class="answer-options">
                <div 
                  v-for="(option, index) in quizQuestions[currentQuestion].options" 
                  :key="index"
                  class="answer-option"
                  :class="{ 
                    selected: selectedAnswer === index,
                    correct: showAnswer && index === quizQuestions[currentQuestion].correctAnswer,
                    incorrect: showAnswer && selectedAnswer === index && index !== quizQuestions[currentQuestion].correctAnswer
                  }"
                  @click="selectAnswer(index)"
                >
                  {{ option }}
                </div>
              </div>
              
              <div v-if="showAnswer" class="answer-explanation">
                <div class="explanation-title" :class="{ 'correct-answer': isAnswerCorrect, 'incorrect-answer': !isAnswerCorrect }">
                  {{ isAnswerCorrect ? 'Верно!' : 'Неверно!' }}
                </div>
                <div class="explanation-content">
                  {{ quizQuestions[currentQuestion].explanation }}
                </div>
              </div>
              
              <div class="quiz-navigation">
                <button v-if="!showAnswer" @click="checkAnswer" class="check-answer-button">Проверить</button>
                <button v-else @click="nextQuestion" class="next-question-button">
                  {{ currentQuestion < quizQuestions.length - 1 ? 'Следующий вопрос' : 'Завершить тест' }}
                </button>
              </div>
            </div>
            
            <div v-if="quizFinished" class="quiz-results">
              <h3>Результаты теста</h3>
              <div class="score-display">
                <div class="score-value">{{ correctAnswers }} / {{ quizQuestions.length }}</div>
                <div class="score-label">правильных ответов</div>
              </div>
              
              <div class="score-message">
                <div v-if="correctAnswers === quizQuestions.length">
                  Отлично! Вы полностью освоили контекст <code>this</code> в JavaScript!
                </div>
                <div v-else-if="correctAnswers >= Math.floor(quizQuestions.length * 0.7)">
                  Хороший результат! Вы хорошо понимаете контекст <code>this</code>, но есть некоторые аспекты, которые стоит повторить.
                </div>
                <div v-else>
                  Продолжайте изучение! Контекст <code>this</code> в JavaScript — одна из самых сложных тем, требующая практики.
                </div>
              </div>
              
              <button @click="restartQuiz" class="restart-quiz-button">Пройти тест заново</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  
  // Состояние вкладок
  const tabs = [
    { title: "Глобальный контекст" },
    { title: "Контекст функции" },
    { title: "Явное указание this" },
    { title: "Стрелочные функции" },
    { title: "Практические примеры" },
    { title: "Проверь себя" }
  ];
  const currentTab = ref(0);
  
  // Подвкладки для раздела "Контекст функции"
  const functionSubtabs = [
    { title: "Простой вызов" },
    { title: "Метод объекта" },
    { title: "Конструктор" }
  ];
  const currentFunctionTab = ref(0);
  
  // Подвкладки для раздела "Явное указание this"
  const explicitSubtabs = [
    { title: "call и apply" },
    { title: "bind" }
  ];
  const currentExplicitTab = ref(0);
  
  // Подвкладки для раздела "Практические примеры"
  const practicalSubtabs = [
    { title: "Обработчики событий" },
    { title: "Асинхронные колбэки" },
    { title: "Методы как значения" }
  ];
  const currentPracticalTab = ref(0);
  
  // Состояние результатов и анимации
  const showResult = ref(false);
  const animationStep = ref(0);
  
  // Таймеры для анимации
  let animationTimers = [];
  
  // Функции для переключения вкладок
  function switchTab(index) {
    currentTab.value = index;
    resetState();
  }
  
  function switchFunctionTab(index) {
    currentFunctionTab.value = index;
    resetState();
  }
  
  function switchExplicitTab(index) {
    currentExplicitTab.value = index;
    resetState();
  }
  
  function switchPracticalTab(index) {
    currentPracticalTab.value = index;
    resetState();
    
    // Сбрасываем состояние для практических примеров
    counterValue.value = 0;
    serviceUsers.value = [];
    serviceLoggedIn.value = false;
    methodCallStep.value = 0;
  }
  
  // Функция сброса состояния при переключении вкладок
  function resetState() {
    clearAllTimers();
    showResult.value = false;
    animationStep.value = 0;
    
    // Сбрасываем состояние для практических примеров
    clickAnimating.value = false;
    showWrongContext.value = false;
    showRightContext.value = false;
    
    asyncAnimating.value = false;
    showAsyncWrongContext.value = false;
    showAsyncRightContext.value = false;
    
    // Сбрасываем состояние теста
    quizStarted.value = false;
    quizFinished.value = false;
    currentQuestion.value = 0;
    correctAnswers.value = 0;
    showAnswer.value = false;
    selectedAnswer.value = null;
  }
  
  function clearAllTimers() {
    animationTimers.forEach(timer => clearTimeout(timer));
    animationTimers = [];
  }
  
  // Функции для анимации примеров
  function runGlobalExample() {
    clearAllTimers();
    showResult.value = true;
    animationStep.value = 0;
    
    // Запускаем пошаговую анимацию
    for (let i = 1; i <= 3; i++) {
      const timer = setTimeout(() => {
        animationStep.value = i;
      }, i * 1500);
      animationTimers.push(timer);
    }
  }
  
  function runSimpleFunctionExample() {
    clearAllTimers();
    showResult.value = true;
    animationStep.value = 0;
    
    // Запускаем пошаговую анимацию
    for (let i = 1; i <= 3; i++) {
      const timer = setTimeout(() => {
        animationStep.value = i;
      }, i * 1500);
      animationTimers.push(timer);
    }
  }
  
  function runMethodExample() {
    clearAllTimers();
    showResult.value = true;
    animationStep.value = 0;
    
    // Запускаем пошаговую анимацию
    for (let i = 1; i <= 4; i++) {
      const timer = setTimeout(() => {
        animationStep.value = i;
      }, i * 1500);
      animationTimers.push(timer);
    }
  }
  
  function runConstructorExample() {
    clearAllTimers();
    showResult.value = true;
    animationStep.value = 0;
    
    // Запускаем пошаговую анимацию
    for (let i = 1; i <= 4; i++) {
      const timer = setTimeout(() => {
        animationStep.value = i;
      }, i * 1500);
      animationTimers.push(timer);
    }
  }
  
  function runCallApplyExample() {
    clearAllTimers();
    showResult.value = true;
    animationStep.value = 0;
    
    // Запускаем пошаговую анимацию последовательного вызова
    // В этом примере просто циклически меняем активный шаг
    const steps = [1, 2, 3, 4];
    
    function animateSteps(index = 0) {
      if (index >= steps.length) return;
      
      animationStep.value = steps[index];
      
      const timer = setTimeout(() => {
        animateSteps(index + 1);
      }, 2000);
      
      animationTimers.push(timer);
    }
    
    animateSteps();
  }
  
  function runBindExample() {
    clearAllTimers();
    showResult.value = true;
    animationStep.value = 0;
    
    // Запускаем пошаговую анимацию
    for (let i = 1; i <= 6; i++) {
      const timer = setTimeout(() => {
        animationStep.value = i;
      }, i * 1500);
      animationTimers.push(timer);
    }
  }
  
  function runArrowExample() {
    clearAllTimers();
    showResult.value = true;
    animationStep.value = 0;
    
    // Запускаем пошаговую анимацию
    for (let i = 1; i <= 6; i++) {
      const timer = setTimeout(() => {
        animationStep.value = i;
      }, i * 1500);
      animationTimers.push(timer);
    }
  }
  
  // Переменные для практического примера с обработчиками событий
  const counterValue = ref(0);
  const clickAnimating = ref(false);
  const showWrongContext = ref(false);
  const showRightContext = ref(false);
  
  // Симуляция клика по кнопке
  function simulateButtonClick() {
    clickAnimating.value = true;
    showWrongContext.value = true;
    
    setTimeout(() => {
      clickAnimating.value = false;
      showWrongContext.value = false;
      
      // Через небольшую паузу показываем правильный вариант
      setTimeout(() => {
        clickAnimating.value = true;
        showRightContext.value = true;
        
        // Увеличиваем счетчик
        counterValue.value++;
        
        setTimeout(() => {
          clickAnimating.value = false;
          showRightContext.value = false;
        }, 2000);
      }, 1000);
    }, 2000);
  }
  
  // Переменные для примера с асинхронными колбэками
  const serviceUsers = ref([]);
  const serviceLoggedIn = ref(false);
  const asyncAnimating = ref(false);
  const asyncMethod = ref('');
  const showAsyncWrongContext = ref(false);
  const showAsyncRightContext = ref(false);
  
  watch(currentPracticalTab, (newValue) => {
    if (newValue === 1) {
      // Демонстрируем последовательно различные варианты
      setTimeout(() => {
        simulateAsyncMethod('loadUsers');
        
        setTimeout(() => {
          simulateAsyncMethod('loadUsersFixed');
          
          setTimeout(() => {
            simulateAsyncMethod('loadUsersFixedBind');
          }, 5000);
        }, 5000);
      }, 1000);
    }
  });
  
  // Симуляция вызова асинхронного метода
  function simulateAsyncMethod(method) {
    asyncMethod.value = method;
    asyncAnimating.value = true;
    
    if (method === 'loadUsers') {
      // Показываем неправильный контекст в setTimeout
      setTimeout(() => {
        showAsyncWrongContext.value = true;
        
        setTimeout(() => {
          asyncAnimating.value = false;
          showAsyncWrongContext.value = false;
        }, 2000);
      }, 2000);
    } else {
      // Показываем правильный контекст в setTimeout
      setTimeout(() => {
        showAsyncRightContext.value = true;
        serviceUsers.value = ["Пользователь 1", "Пользователь 2"];
        
        setTimeout(() => {
          asyncAnimating.value = false;
          showAsyncRightContext.value = false;
        }, 2000);
      }, 2000);
    }
  }
  
  // Переменные для примера с методами как значениями
  const methodCallStep = ref(0);
  
  watch(currentPracticalTab, (newValue) => {
    if (newValue === 2) {
      // Демонстрируем последовательно различные вызовы
      let step = 0;
      
      function showNextMethodCall() {
        step++;
        if (step > 4) return;
        
        methodCallStep.value = step;
        
        setTimeout(() => {
          showNextMethodCall();
        }, 3000);
      }
      
      setTimeout(() => {
        showNextMethodCall();
      }, 1000);
    }
  });
  
  // Переменные для теста
  const quizStarted = ref(false);
  const quizFinished = ref(false);
  const currentQuestion = ref(0);
  const correctAnswers = ref(0);
  const showAnswer = ref(false);
  const selectedAnswer = ref(null);
  const isAnswerCorrect = computed(() => {
    if (selectedAnswer.value === null) return false;
    return selectedAnswer.value === quizQuestions[currentQuestion.value].correctAnswer;
  });
  
  // Вопросы для теста
  const quizQuestions = [
    {
      question: "Что будет выведено в консоль?",
      code: `const obj = {
    value: 42,
    getValue: function() {
      return this.value;
    }
  };
  
  const getValue = obj.getValue;
  console.log(getValue());`,
      options: [
        "42",
        "undefined",
        "null",
        "Ошибка"
      ],
      correctAnswer: 1,
      explanation: "Когда метод obj.getValue сохраняется в переменную getValue и вызывается как обычная функция, this внутри функции указывает на глобальный объект (или undefined в строгом режиме), а не на объект obj. Поэтому this.value равен undefined."
    },
    {
      question: "Что будет выведено в консоль?",
      code: `function Person(name) {
    this.name = name;
  }
  
  const person = Person("Алексей");
  console.log(window.name);`,
      options: [
        "Алексей",
        "undefined",
        "person",
        "Ошибка"
      ],
      correctAnswer: 0,
      explanation: "Функция Person вызывается без оператора new, поэтому this внутри функции указывает на глобальный объект (window). В результате свойство name добавляется к глобальному объекту и window.name становится равным 'Алексей'."
    },
    {
      question: "Что будет выведено в консоль?",
      code: `const user = {
    name: "Анна",
    greet() {
      const innerFunction = () => {
        console.log(this.name);
      };
      innerFunction();
    }
  };
  
  user.greet();`,
      options: [
        "Анна",
        "undefined",
        "user",
        "Ошибка"
      ],
      correctAnswer: 0,
      explanation: "Стрелочная функция не имеет собственного this, она наследует this из внешнего лексического окружения. В данном случае, innerFunction получает this из метода greet, где this указывает на объект user. Поэтому this.name внутри стрелочной функции равен 'Анна'."
    },
    {
      question: "Что будет выведено в консоль?",
      code: `const counter = {
    count: 0,
    increment() {
      this.count++;
      console.log(this.count);
    }
  };
  
  const incrementFn = counter.increment;
  incrementFn.call(counter);`,
      options: [
        "0",
        "1",
        "undefined",
        "Ошибка"
      ],
      correctAnswer: 1,
      explanation: "Метод call() явно указывает, что будет использоваться в качестве this при вызове функции. В данном случае, мы передаем объект counter как контекст для функции incrementFn, поэтому this внутри функции указывает на counter. Функция увеличивает счетчик на 1 и выводит значение 1."
    },
    {
      question: "Что будет выведено в консоль?",
      code: `class Button {
    constructor(text) {
      this.text = text;
    }
    
    click = () => {
      console.log(\`Нажата кнопка: \${this.text}\`);
    }
  }
  
  const button = new Button("Отправить");
  const clickHandler = button.click;
  clickHandler();`,
      options: [
        "Нажата кнопка: Отправить",
        "Нажата кнопка: undefined",
        "undefined",
        "Ошибка"
      ],
      correctAnswer: 0,
      explanation: "В классе Button свойство click определено как стрелочная функция, которая захватывает this из контекста, где она была создана, то есть из экземпляра класса Button. Поэтому даже при вызове функции через переменную clickHandler, this внутри функции все равно указывает на объект button, а this.text равен 'Отправить'."
    }
  ];
  
  // Функции для теста
  function startQuiz() {
    quizStarted.value = true;
    quizFinished.value = false;
    currentQuestion.value = 0;
    correctAnswers.value = 0;
  }
  
  function selectAnswer(index) {
    if (showAnswer.value) return;
    selectedAnswer.value = index;
  }
  
  function checkAnswer() {
    showAnswer.value = true;
    if (isAnswerCorrect.value) {
      correctAnswers.value++;
    }
  }
  
  function nextQuestion() {
    showAnswer.value = false;
    selectedAnswer.value = null;
    
    if (currentQuestion.value < quizQuestions.length - 1) {
      currentQuestion.value++;
    } else {
      quizFinished.value = true;
    }
  }
  
  function restartQuiz() {
    quizStarted.value = false;
    quizFinished.value = false;
    currentQuestion.value = 0;
    correctAnswers.value = 0;
    showAnswer.value = false;
    selectedAnswer.value = null;
  }
  </script>
  
  <style>
  .this-explorer {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
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
  }
  
  .subtab-button {
    padding: 8px 15px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .subtab-button:hover {
    background-color: #e9ecef;
  }
  
  .subtab-button.active {
    background-color: #4caf50;
    color: white;
    border-color: #4caf50;
  }
  
  .subtab-content {
    animation: fadeIn 0.5s ease;
  }
  
  /* Стили для объяснения */
  .explanation {
    margin-bottom: 20px;
    line-height: 1.6;
  }
  
  /* Стили для кода */
  .code-container {
    margin-bottom: 30px;
  }
  
  .code-panel {
    background-color: #f8f9fa;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }
  
  .code-panel h3 {
    background-color: #e9ecef;
    margin: 0;
    padding: 10px 15px;
    font-size: 1rem;
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
  }
  
  .run-button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .run-button:hover {
    background-color: #2980b9;
  }
  
  /* Стили для результатов выполнения */
  .result-container {
    margin-top: 30px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.5s ease;
  }
  
  .runtime-visualization {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
    min-height: 200px;
    position: relative;
  }
  
  /* Стили для объяснения шагов */
  .explanation-steps {
    margin-top: 30px;
  }
  
  .step {
    display: flex;
    margin-bottom: 15px;
    opacity: 0.5;
    transition: all 0.5s ease;
  }
  
  .step.active {
    opacity: 1;
  }
  
  .step-number {
    width: 30px;
    height: 30px;
    background-color: #3498db;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: 15px;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  .step-content {
    flex: 1;
  }
  
  .step-content p {
    margin: 0;
    line-height: 1.6;
  }
  
  /* Стили для глобального контекста */
  .global-object {
    width: 300px;
    border: 2px solid #3498db;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f8f9fa;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease;
  }
  
  .object-title {
    background-color: #3498db;
    color: white;
    padding: 8px 12px;
    font-weight: bold;
  }
  
  .object-content {
    padding: 15px;
  }
  
  .property-item {
    display: flex;
    margin-bottom: 8px;
    padding: 5px;
    border-radius: 4px;
    transition: all 0.5s ease;
  }
  
  .property-item.highlight {
    background-color: #e8f5e9;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .property-item.not-found {
    background-color: #ffebee;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .property-name {
    font-weight: bold;
    margin-right: 10px;
    color: #2c3e50;
  }
  
  .property-value {
    color: #e74c3c;
  }
  
  .this-reference {
    margin-top: 30px;
    text-align: center;
    position: relative;
  }
  
  .this-title {
    display: inline-block;
    background-color: #9c27b0;
    color: white;
    padding: 8px 15px;
    border-radius: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .this-arrow {
    height: 40px;
    border-left: 2px dashed #9c27b0;
    margin: 0 auto;
  }
  
  .this-reference.strict-mode .this-title {
    background-color: #f44336;
  }
  
  .this-reference.strict-mode .this-arrow {
    border-left-color: #f44336;
  }
  
  /* Стили для функционального контекста */
  .function-call {
    width: 300px;
    border: 2px solid #ff9800;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff3e0;
    margin-bottom: 20px;
  }
  
  .function-title {
    background-color: #ff9800;
    color: white;
    padding: 8px 12px;
    font-weight: bold;
  }
  
  .function-body {
    padding: 15px;
    font-family: monospace;
  }
  
  .code-line {
    margin-bottom: 5px;
  }
  
  .this-reference.global-this .this-title {
    background-color: #607d8b;
  }
  
  .this-reference.global-this .this-arrow {
    border-left-color: #607d8b;
  }
  
  /* Стили для методов объекта */
  .user-object {
    width: 300px;
    border: 2px solid #4caf50;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f1f8e9;
    margin-bottom: 20px;
  }
  
  .user-object .object-title {
    background-color: #4caf50;
  }
  
  .call-sequence {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 20px 0;
  }
  
  .call-item {
    padding: 10px 15px;
    background-color: #f5f5f5;
    border-radius: 6px;
    opacity: 0.6;
    transition: all 0.5s ease;
    position: relative;
  }
  
  .call-item.active {
    opacity: 1;
    background-color: #e8f5e9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .call-item.inactive {
    opacity: 0.3;
  }
  
  .arrow-right {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
    color: #4caf50;
  }
  
  .this-reference.person1 .this-title,
  .this-reference.person2 .this-title {
    background-color: #795548;
  }
  
  .this-reference.person1 .this-arrow,
  .this-reference.person2 .this-arrow {
    border-left-color: #795548;
  }
  
  /* Стили для конструкторов */
  .constructor-calls {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .call-with-new, .call-without-new {
    padding: 10px 15px;
    background-color: #f5f5f5;
    border-radius: 6px;
    opacity: 0.6;
    transition: all 0.5s ease;
    position: relative;
  }
  
  .call-with-new.active, .call-without-new.active {
    opacity: 1;
    background-color: #e8f5e9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .call-with-new.inactive, .call-without-new.inactive {
    opacity: 0.3;
  }
  
  .objects-container {
    display: flex;
    gap: 20px;
    margin: 20px 0;
  }
  
  .person-object {
    width: 250px;
    border: 2px solid #673ab7;
    border-radius: 8px;
    overflow: hidden;
    background-color: #ede7f6;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
  }
  
  .person-object.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .person-object .object-title {
    background-color: #673ab7;
  }
  
  .global-object.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Стили для раздела call и apply */
  .persons-container {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .calls-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 20px 0;
  }
  
  .call-item {
    padding: 12px 15px;
    background-color: #f8f9fa;
    border-radius: 6px;
    border-left: 3px solid #3498db;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    opacity: 0.6;
  }
  
  .call-item.active {
    opacity: 1;
    background-color: #e3f2fd;
    border-left-color: #2196f3;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
  
  /* Стили для раздела bind */
  .bind-visualization {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .original-function {
    width: 300px;
    border: 2px solid #ff9800;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff3e0;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
  }
  
  .original-function.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .bind-process {
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.5s ease;
    text-align: center;
    position: relative;
  }
  
  .bind-process.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .arrow-down {
    font-size: 2rem;
    color: #673ab7;
    margin: 10px 0;
  }
  
  .bound-function {
    width: 300px;
    border: 2px solid #673ab7;
    border-radius: 8px;
    overflow: hidden;
    background-color: #ede7f6;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
  }
  
  .bound-function.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .bound-indicator {
    background-color: #4caf50;
    color: white;
    padding: 5px 10px;
    font-size: 0.8rem;
    text-align: center;
  }
  
  /* Стили для раздела стрелочных функций */
  .execution-context {
    width: 400px;
    border: 2px solid #ff9800;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff3e0;
    margin: 20px 0;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
    position: relative;
  }
  
  .execution-context.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .context-title {
    background-color: #ff9800;
    color: white;
    padding: 8px 12px;
    font-weight: bold;
  }
  
  .context-this {
    padding: 15px;
    position: relative;
  }
  
  .this-binding {
    display: inline-block;
    background-color: #9c27b0;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-weight: bold;
  }
  
  .inner-execution-context {
    width: 90%;
    border: 2px solid #e57373;
    border-radius: 8px;
    overflow: hidden;
    background-color: #ffebee;
    margin: 15px auto;
    opacity: 0;
    transform: scale(0.9);
    transition: all 0.5s ease;
  }
  
  .inner-execution-context.active {
    opacity: 1;
    transform: scale(1);
  }
  
  .this-binding.lost-context {
    background-color: #f44336;
  }
  
  .this-binding.lexical-context {
    background-color: #4caf50;
  }
  
  /* Ключевые точки про стрелочные функции */
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
    padding-left: 20px;
  }
  
  .key-points li {
    margin-bottom: 10px;
    line-height: 1.6;
  }
  
  /* Стили для практических примеров */
  .scenario-note {
    margin: 10px 15px;
    font-style: italic;
    color: #757575;
    font-size: 0.9rem;
  }
  
  .scenario-visualization {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    margin-top: 20px;
  }
  
  /* Обработчики событий */
  .event-handler-viz {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 20px 0;
    position: relative;
  }
  
  .button-element {
    width: 150px;
    border: 2px solid #2196f3;
    border-radius: 8px;
    overflow: hidden;
    background-color: #e3f2fd;
  }
  
  .element-title {
    background-color: #2196f3;
    color: white;
    padding: 5px 10px;
    font-size: 0.9rem;
    font-weight: bold;
  }
  
  .element-content {
    padding: 15px;
    display: flex;
    justify-content: center;
  }
  
  .demo-button {
    padding: 8px 15px;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .demo-button:hover {
    background-color: #1976d2;
  }
  
  .counter-instance {
    width: 150px;
    border: 2px solid #673ab7;
    border-radius: 8px;
    overflow: hidden;
    background-color: #ede7f6;
  }
  
  .instance-title {
    background-color: #673ab7;
    color: white;
    padding: 5px 10px;
    font-size: 0.9rem;
    font-weight: bold;
  }
  
  .instance-property {
    padding: 15px;
    display: flex;
    gap: 5px;
  }
  
  .event-flow {
    flex: 1;
    padding: 15px;
    border: 2px dashed #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    opacity: 0;
    transition: all 0.5s ease;
    min-height: 150px;
    position: relative;
  }
  
  .event-flow.active {
    opacity: 1;
    border-color: #ff9800;
    background-color: #fff8e1;
  }
  
  .click-event {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #ff9800;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-weight: bold;
    animation: moveDown 1s forwards;
  }
  
  @keyframes moveDown {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(50px); opacity: 0; }
  }
  
  .callback-execution {
    margin-top: 50px;
    text-align: center;
  }
  
  .callback-code {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 10px;
    border-radius: 4px;
    font-family: monospace;
    margin-bottom: 10px;
  }
  
  .callback-context {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 4px;
    font-weight: bold;
    opacity: 0;
    transition: all 0.5s ease;
  }
  
  .callback-context.wrong-context {
    opacity: 1;
    background-color: #f44336;
    color: white;
  }
  
  .callback-context.right-context {
    opacity: 1;
    background-color: #4caf50;
    color: white;
  }
  
  .example-explanation {
    margin-top: 30px;
    padding: 15px;
    background-color: #e8f5e9;
    border-radius: 6px;
  }
  
  .example-explanation h4 {
    margin-top: 0;
    color: #2e7d32;
  }
  
  .example-explanation ol {
    padding-left: 20px;
  }
  
  .example-explanation li {
    margin-bottom: 10px;
    line-height: 1.6;
  }
  
  /* Асинхронные колбэки */
  .async-viz {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px 0;
  }
  
  .service-instance {
    width: 300px;
    border: 2px solid #9c27b0;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f3e5f5;
    margin: 0 auto;
  }
  
  .service-instance .instance-title {
    background-color: #9c27b0;
  }
  
  .instance-properties {
    padding: 15px;
  }
  
  .async-flow {
    width: 100%;
    border: 2px dashed #ccc;
    border-radius: 8px;
    padding: 20px;
    background-color: #f9f9f9;
    opacity: 0;
    transition: all 0.5s ease;
  }
  
  .async-flow.active {
    opacity: 1;
    border-color: #ff9800;
    background-color: #fff8e1;
  }
  
  .method-call {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .call-label {
    font-weight: bold;
  }
  
  .call-name {
    display: inline-block;
    background-color: #3f51b5;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-family: monospace;
  }
  
  .timeout-container {
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 15px;
    background-color: white;
  }
  
  .timeout-label {
    font-weight: bold;
    margin-bottom: 10px;
    color: #ff5722;
  }
  
  .time-passing {
    height: 30px;
    position: relative;
  }
  
  .time-indicator {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ff5722;
    color: white;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    animation: fadeInOut 2s ease-in-out;
  }
  
  @keyframes fadeInOut {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
  
  .callback-label {
    font-weight: bold;
    margin-top: 10px;
    color: #4caf50;
  }
  
  .context-indicator {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 4px;
    font-weight: bold;
    margin-top: 10px;
    opacity: 0;
    transition: all 0.5s ease;
  }
  
  .context-indicator.wrong-context {
    opacity: 1;
    background-color: #f44336;
    color: white;
  }
  
  .context-indicator.right-context {
    opacity: 1;
    background-color: #4caf50;
    color: white;
  }
  
  /* Методы как значения */
  .method-value-viz {
    display: flex;
    gap: 30px;
    margin: 20px 0;
  }
  
  .user-object {
    width: 250px;
    border: 2px solid #4caf50;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f1f8e9;
  }
  
  .object-properties {
    padding: 15px;
  }
  
  .property-item.method {
    background-color: #e8f5e9;
    border-radius: 4px;
    padding: 5px;
  }
  
  .method-calls {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    background-color: #f9f9f9;
  }
  
  .call-sequence {
    margin-bottom: 20px;
  }
  
  .result-line {
    color: #4caf50;
    font-family: monospace;
    margin-top: 5px;
  }
  
  .context-explanation {
    padding: 15px;
    background-color: #e8f5e9;
    border-radius: 6px;
    transition: all 0.3s ease;
  }
  
  .method-arrow-warning {
    margin-top: 30px;
    padding: 15px;
    background-color: #fff8e1;
    border-radius: 8px;
    border-left: 4px solid #ffc107;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
  }
  
  .method-arrow-warning.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .method-arrow-warning h4 {
    margin-top: 0;
    color: #f57f17;
  }
  
  .code-snippet {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 10px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9rem;
    margin: 10px 0;
    white-space: pre;
  }
  
  /* Стили для теста */
  .quiz-container {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    margin-top: 20px;
  }
  
  .start-quiz-button {
    display: block;
    margin: 20px auto;
    padding: 12px 30px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .start-quiz-button:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .quiz-question {
    animation: fadeIn 0.5s ease;
  }
  
  .question-number {
    font-size: 0.9rem;
    color: #757575;
    margin-bottom: 10px;
  }
  
  .question-text {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .answer-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px 0;
  }
  
  .answer-option {
    padding: 12px 15px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .answer-option:hover {
    background-color: #e9ecef;
  }
  
  .answer-option.selected {
    background-color: #e3f2fd;
    border-color: #2196f3;
  }
  
  .answer-option.correct {
    background-color: #e8f5e9;
    border-color: #4caf50;
  }
  
  .answer-option.incorrect {
    background-color: #ffebee;
    border-color: #f44336;
  }
  
  .answer-explanation {
    margin: 20px 0;
    padding: 15px;
    border-radius: 8px;
    background-color: #f8f9fa;
    border-left: 4px solid #9e9e9e;
    animation: fadeIn 0.5s ease;
  }
  
  .explanation-title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .explanation-title.correct-answer {
    color: #4caf50;
  }
  
  .explanation-title.incorrect-answer {
    color: #f44336;
  }
  
  .quiz-navigation {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .check-answer-button, .next-question-button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .check-answer-button:hover, .next-question-button:hover {
    background-color: #2980b9;
  }
  
  .quiz-results {
    text-align: center;
    animation: fadeIn 0.5s ease;
  }
  
  .score-display {
    margin: 30px 0;
  }
  
  .score-value {
    font-size: 3rem;
    font-weight: bold;
    color: #3498db;
  }
  
  .score-label {
    font-size: 1.2rem;
    color: #757575;
  }
  
  .score-message {
    margin: 20px 0;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .restart-quiz-button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 20px;
  }
  
  .restart-quiz-button:hover {
    background-color: #2980b9;
  }
  
  /* Медиа-запросы для адаптивности */
  @media (max-width: 768px) {
    .event-handler-viz, .method-value-viz {
      flex-direction: column;
    }
    
    .user-object, .counter-instance, .button-element, .service-instance {
      width: 100%;
      max-width: 300px;
      margin: 0 auto 15px;
    }
    
    .objects-container {
      flex-direction: column;
      align-items: center;
    }
    
    .persons-container {
      flex-direction: column;
      align-items: center;
    }
    
    .bound-function, .original-function {
      width: 100%;
      max-width: 300px;
    }
    
    .execution-context {
      width: 100%;
    }
  }
  
  @media (max-width: 480px) {
    .tabs {
      flex-direction: column;
    }
    
    .subtabs {
      flex-wrap: wrap;
    }
    
    .code {
      font-size: 0.8rem;
    }
  }
  </style>