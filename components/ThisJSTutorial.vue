<template>
    <div class="this-tutorial">
      <h1 class="title">JavaScript и this: Разбираемся до основ</h1>
      
      <div class="navigation-tabs">
        <button 
          v-for="(section, index) in sections" 
          :key="section.id"
          :class="['tab-button', { active: currentSection === index }]"
          @click="setCurrentSection(index)"
        >
          {{ section.title }}
        </button>
      </div>
      
      <transition name="fade" mode="out-in">
        <div :key="currentSection" class="tutorial-container">
          <!-- Секция "Что такое this?" -->
          <div v-if="currentSection === 0" class="section what-is-this">
            <h2>{{ sections[currentSection].title }}</h2>
            <div class="theory-block">
              <p>this - это выражение языка JavaScript, поведение которого очень похоже на поведение идентификатора, с той лишь разницей, что связать значение с this мы можем только особой формой вызова normal function.</p>
              
              <div class="cat-explains">
               
                <div class="cat-speech-bubble">
                  <p>this - это НЕ контекст. И никогда им не был!</p>
                  <p>this - это особый идентификатор, который определён локально для всех normal function.</p>
                </div>
              </div>
              
              <div class="code-example">
                <pre><code>"use strict";
  console.log("this is: ", this); // в глобальной области - undefined (strict mode)</code></pre>
              </div>
              
              <div class="question-block">
                <h3>Что такое normal function?</h3>
                <p>Normal function - это любая функция, которая НЕ является arrow function.</p>
                <p>То есть все функции, у которых между аргументами и телом отсутствует символьная пара =></p>
                
                <div class="code-comparison">
                  <div class="code-normal">
                    <h4>Normal function</h4>
                    <pre><code>function doSomething() {
    // Тело функции
  }
  
  // или
  
  const doSomething = function() {
    // Тело функции
  }</code></pre>
                  </div>
                  <div class="code-arrow">
                    <h4>Arrow function</h4>
                    <pre><code>const doSomething = () => {
    // Тело функции  
  }</code></pre>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="demo-block">
              <h3>Исследуй this в разных местах кода</h3>
              <div class="interactive-demo">
                <div class="demo-tabs">
                  <button 
                    v-for="(example, i) in thisExamples"
                    :key="i"
                    :class="['demo-tab', { active: currentExample === i }]"
                    @click="currentExample = i"
                  >
                    {{ example.title }}
                  </button>
                </div>
                <div class="code-and-result">
                  <div class="code-editor">
                    <pre><code>{{ thisExamples[currentExample].code }}</code></pre>
                  </div>
                  <div class="result-area">
                    <h4>Результат:</h4>
                    <div class="result">
                      <p v-html="thisExamples[currentExample].result"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="next-button-container">
              <button class="next-button" @click="nextSection">
                Далее <span class="arrow">→</span>
              </button>
            </div>
          </div>
          
          <!-- Секция "Как определяется this?" -->
          <div v-if="currentSection === 1" class="section this-definition">
            <h2>{{ sections[currentSection].title }}</h2>
            
            <div class="decision-tree">
              <div class="tree-node root">
                <div class="node-content">
                  <h3>Как определяется this?</h3>
                  <p>Значение this зависит от того, где и как вызывается функция</p>
                </div>
                <div class="node-connections">
                  <div class="connector"></div>
                </div>
              </div>
              
              <div class="tree-branches">
                <div class="branch" v-for="(branch, index) in thisDecisionTree.branches" :key="`branch-${index}`">
                  <div class="branch-line"></div>
                  <div class="branch-node" @click="activeBranch = activeBranch === index ? null : index">
                    <div class="node-content" :class="{ active: activeBranch === index }">
                      <h4>{{ branch.title }}</h4>
                      <div class="branch-details" v-if="activeBranch === index">
                        <p>{{ branch.description }}</p>
                        <div class="branch-code">
                          <pre><code>{{ branch.code }}</code></pre>
                        </div>
                        <div class="branch-result">
                          <p>Результат: <span>{{ branch.result }}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="cat-explains">
      
              <div class="cat-speech-bubble">
                <p>Запомни, значение this может быть изменено только в момент вызова функции!</p>
                <p>И зависит только от формы/способа её вызова.</p>
              </div>
            </div>
            
            <div class="navigation-buttons">
              <button class="prev-button" @click="prevSection">
                <span class="arrow">←</span> Назад
              </button>
              <button class="next-button" @click="nextSection">
                Далее <span class="arrow">→</span>
              </button>
            </div>
          </div>
          
          <!-- Секция "this в разных окружениях" -->
          <div v-if="currentSection === 2" class="section this-environments">
            <h2>{{ sections[currentSection].title }}</h2>
            
            <div class="env-selector">
              <button 
                v-for="(env, index) in environments" 
                :key="env.id"
                :class="['env-button', { active: currentEnv === index }]"
                @click="currentEnv = index"
              >
                {{ env.title }}
              </button>
            </div>
            
            <div class="environment-diagram">
              <h3>{{ environments[currentEnv].title }}</h3>
              <div class="diagram">
                <div class="diagram-code">
                  <pre><code>{{ environments[currentEnv].code }}</code></pre>
                </div>
                <div class="diagram-visual">
                  <div class="flow-diagram">
                    <img :src="environments[currentEnv].diagram" alt="Диаграмма работы this" />
                  </div>
                  <div class="diagram-explanation">
                    <p v-html="environments[currentEnv].explanation"></p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="cat-explains">
             
              <div class="cat-speech-bubble">
                <p>{{ environments[currentEnv].catTip }}</p>
              </div>
            </div>
            
            <div class="navigation-buttons">
              <button class="prev-button" @click="prevSection">
                <span class="arrow">←</span> Назад
              </button>
              <button class="next-button" @click="nextSection">
                Далее <span class="arrow">→</span>
              </button>
            </div>
          </div>
          
          <!-- Секция "Практика с this" -->
          <div v-if="currentSection === 3" class="section this-practice">
            <div>В разработке</div>
          </div>
          
          <!-- Секция "Итоги" -->
          <div v-if="currentSection === 4" class="section this-summary">
            <h2>{{ sections[currentSection].title }}</h2>
            
            <div class="summary-content">
              <h3>Основные правила для this в JavaScript:</h3>
              <div class="summary-rules">
                <div class="rule" v-for="(rule, index) in summaryRules" :key="index">
                  <div class="rule-number">{{ index + 1 }}</div>
                  <div class="rule-content">
                    <p>{{ rule }}</p>
                  </div>
                </div>
              </div>
              
              <div class="final-cat">
              
                <div class="cat-speech-bubble final-speech">
                  <h3>Поздравляю!</h3>
                  <p>Теперь ты знаешь основные принципы работы this в JavaScript и сможешь избежать типичных ошибок, связанных с ним!</p>
                  <p>Помни, что this - это не контекст, а просто значение, которое по-разному устанавливается в зависимости от способа вызова функции.</p>
                </div>
              </div>
              
              <div class="additional-resources">
                <h3>Дополнительные ресурсы:</h3>
                <ul>
                  <li>
                    <a href="https://tc39.es/ecma262/#sec-property-accessors" target="_blank">
                      Спецификация ECMAScript - Property Accessors
                    </a>
                  </li>
                  <li>
                    <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/this" target="_blank">
                      MDN Web Docs - this
                    </a>
                  </li>
                  <li>
                    <a href="https://t.me/AsForJavaScript" target="_blank">
                      Telegram канал asForJs
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div class="restart-button-container">
              <button class="restart-button" @click="restart">
                <span class="restart-icon">↺</span> Начать заново
              </button>
            </div>
          </div>
        </div>
      </transition>
      
      <div class="progress-bar">
        <div 
          class="progress-indicator" 
          :style="{ width: `${(currentSection + 1) * (100 / sections.length)}%` }"
        >
      </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Основные секции обучения
  const sections = [
    { 
      id: 'what-is-this', 
      title: 'Что такое this?' 
    },
    { 
      id: 'this-definition', 
      title: 'Как определяется this?' 
    },
    { 
      id: 'this-environments', 
      title: 'this в разных окружениях' 
    },
    { 
      id: 'this-practice', 
      title: 'Практика с this' 
    },
    { 
      id: 'summary', 
      title: 'Итоги' 
    }
  ];
  
  // Текущая секция
  const currentSection = ref(0);
  
  // Переход между секциями
  const nextSection = () => {
    if (currentSection.value < sections.length - 1) {
      currentSection.value++;
    }
  };
  
  const prevSection = () => {
    if (currentSection.value > 0) {
      currentSection.value--;
    }
  };
  
  const setCurrentSection = (index) => {
    currentSection.value = index;
  };
  
  const restart = () => {
    currentSection.value = 0;
    currentExample.value = 0;
    currentEnv.value = 0;
    currentChallenge.value = 0;
    activeBranch.value = null;
    selectedOption.value = null;
    checkResultShown.value = false;
    challengeCompleted.value = Array(challenges.length).fill(false);
  };
  
  // Примеры для первой секции
  const thisExamples = [
    {
      title: 'Глобальная область',
      code: '"use strict";\nconsole.log("this is: ", this);',
      result: 'this is: <span class="highlight">undefined</span> <small>(в strict mode)</small>'
    },
    {
      title: 'Обычная функция',
      code: '"use strict";\n\nfunction logThis() {\n  console.log("this is: ", this);\n}\n\nlogThis();',
      result: 'this is: <span class="highlight">undefined</span>'
    },
    {
      title: 'Стрелочная функция',
      code: '"use strict";\n\nconst outerThis = this;\n\nconst logThis = () => {\n  console.log("this is: ", this);\n  console.log("outerThis is: ", outerThis);\n  console.log("this === outerThis: ", this === outerThis);\n};\n\nlogThis();',
      result: 'this is: <span class="highlight">undefined</span><br>outerThis is: <span class="highlight">undefined</span><br>this === outerThis: <span class="highlight">true</span>'
    },
    {
      title: 'Метод объекта',
      code: '"use strict";\n\nconst obj = {\n  name: "myObject",\n  logThis: function() {\n    console.log("this is: ", this);\n  }\n};\n\nobj.logThis();',
      result: 'this is: <span class="highlight">{ name: "myObject", logThis: [Function] }</span>'
    }
  ];
  
  // Текущий пример
  const currentExample = ref(0);
  
  // Древо принятия решений для определения this
  const thisDecisionTree = {
    branches: [
      {
        title: 'Вызов с new',
        description: 'Если функция вызывается с ключевым словом new, то this будет указывать на новый созданный объект.',
        code: 'function Person(name) {\n  this.name = name;\n  console.log("this is: ", this);\n}\n\nnew Person("John");',
        result: 'this is: { name: "John" }'
      },
      {
        title: 'Вызов с call/apply/bind',
        description: 'Методы call, apply и bind позволяют явно указать значение this при вызове функции.',
        code: 'function showThis() {\n  console.log("this is: ", this);\n}\n\nconst obj = { name: "myObject" };\n\nshowThis.call(obj);',
        result: 'this is: { name: "myObject" }'
      },
      {
        title: 'Метод объекта (dot notation)',
        description: 'Если функция вызывается как метод объекта (через точку), то this будет ссылаться на этот объект.',
        code: 'const obj = {\n  name: "myObject",\n  showThis() {\n    console.log("this is: ", this);\n  }\n};\n\nobj.showThis();',
        result: 'this is: { name: "myObject", showThis: [Function] }'
      },
      {
        title: 'Стрелочная функция',
        description: 'Стрелочные функции не имеют своего this. Они наследуют его из родительской области видимости.',
        code: 'const obj = {\n  name: "myObject",\n  regularFn() {\n    console.log("regularFn this: ", this);\n    \n    const arrowFn = () => {\n      console.log("arrowFn this: ", this);\n    };\n    \n    arrowFn();\n  }\n};\n\nobj.regularFn();',
        result: 'regularFn this: { name: "myObject", regularFn: [Function] }\narrowFn this: { name: "myObject", regularFn: [Function] }'
      },
      {
        title: 'Обычный вызов функции',
        description: 'При обычном вызове функции в строгом режиме this равен undefined. В нестрогом режиме - глобальному объекту.',
        code: '"use strict";\n\nfunction showThis() {\n  console.log("this is: ", this);\n}\n\nshowThis();',
        result: 'this is: undefined'
      }
    ]
  };
  
  // Активная ветка
  const activeBranch = ref(null);
  
  // Окружения для this
  const environments = [
    {
      id: 'global',
      title: 'Глобальная область (strict mode)',
      code: '"use strict";\nconsole.log("this is: ", this);',
      diagram: '/diagrams/this-global-strict.svg',
      explanation: 'В глобальной области в <strong>strict mode</strong> значение this равно <strong>undefined</strong>. В нестрогом режиме this равен глобальному объекту (window в браузере).',
      catTip: 'В strict mode this в глобальной области (вне функций) равен undefined, а не глобальному объекту!'
    },
    {
      id: 'function',
      title: 'Обычная функция',
      code: '"use strict";\n\nfunction doLogThis() {\n  console.log("this is: ", this);\n}\n\ndoLogThis();',
      diagram: '/diagrams/this-function.svg',
      explanation: 'При обычном вызове функции в <strong>strict mode</strong> значение this равно <strong>undefined</strong>. В нестрогом режиме this будет ссылаться на глобальный объект.',
      catTip: 'При простом вызове функции без привязки this всегда равен undefined в strict mode!'
    },
    {
      id: 'object-method',
      title: 'Метод объекта',
      code: 'const theObj = {\n  name: "Murych",\n  doLogThis: function() {\n    console.log("this is: ", this);\n  }\n};\n\ntheObj.doLogThis();',
      diagram: '/diagrams/this-method.svg',
      explanation: 'При вызове функции как метода объекта (через точку, dot notation), this будет указывать на <strong>сам объект</strong> слева от точки.',
      catTip: 'При вызове функции через dot notation (объект.метод()), this всегда равен объекту перед точкой.'
    },
    {
      id: 'arrow',
      title: 'Стрелочная функция',
      code: 'function doLogThis() {\n  var doArrowThing = () => {\n    console.log("this is: ", this);\n  };\n  \n  doArrowThing();\n}\n\ndoLogThis();',
      diagram: '/diagrams/this-arrow.svg',
      explanation: 'Стрелочные функции <strong>не имеют своего this</strong>. Они наследуют его из родительской области видимости (лексическое this). В этом примере this будет такой же, как в функции doLogThis.',
      catTip: 'Стрелочные функции не имеют своего this! Они берут его из окружения, где были созданы.'
    },
    {
      id: 'call-apply-bind',
      title: 'call, apply, bind',
      code: 'function doLogThis() {\n  console.log("this is: ", this);\n}\n\nvar thisArg = { name: "thisArg" };\n\ndoLogThis.call(thisArg);\ndoLogThis.apply(thisArg);\ndoLogThis.bind(thisArg)();',
      diagram: '/diagrams/this-call-apply-bind.svg',
      explanation: 'Методы <strong>call</strong>, <strong>apply</strong> и <strong>bind</strong> позволяют явно указать значение this при вызове функции. В этом случае this будет равен переданному объекту thisArg.',
      catTip: 'С помощью call, apply и bind можно явно задать this для функции при её вызове.'
    },
    {
      id: 'new',
      title: 'Оператор new',
      code: 'function doLogThis() {\n  console.log("this is: ", this);\n}\n\nnew doLogThis();',
      diagram: '/diagrams/this-new.svg',
      explanation: 'При вызове функции с ключевым словом <strong>new</strong>, создаётся новый пустой объект, и this внутри функции указывает на этот объект.',
      catTip: 'При вызове функции с new this всегда указывает на новый созданный объект.'
    },
  ];
  
  // Текущее окружение
  const currentEnv = ref(0);
  
  // Тестовые задания
  const challenges = [
    {
      id: 'challenge-1',
      title: 'Простой вызов функции',
      description: 'Рассмотрите следующий код:',
      code: '"use strict";\n\nfunction checkThis() {\n  console.log(this);\n}\n\ncheckThis();',
            question: 'Что будет выведено в консоль?',
      options: [
        'Иван',
        'Админ',
        'undefined',
        'Ошибка'
      ],
      correctOption: 0,
      explanation: 'Метод bind создаёт новую функцию с жёстко привязанным значением this. Дальнейшие попытки изменить this с помощью call или apply игнорируются. Поэтому в данном случае будет выведено "Иван", несмотря на использование call с объектом admin.'
    }
  ];
  
  // Текущее задание
  const currentChallenge = ref(0);
  const selectedOption = ref(null);
  const checkResultShown = ref(false);
  const challengeCompleted = ref(Array(challenges.length).fill(false));
  
  // Основные правила для итогов
  const summaryRules = [
    'this в JavaScript это НЕ контекст, а особый идентификатор, значение которого определяется при вызове функции.',
    'При обычном вызове функции в strict mode this будет undefined, в нестрогом режиме — глобальный объект.',
    'При вызове метода объекта (obj.method()) this указывает на этот объект.',
    'Стрелочные функции не имеют своего this, они наследуют его из окружения, где были созданы.',
    'Методы call(), apply() и bind() позволяют явно задать значение this для функции.',
    'При использовании new this указывает на новый созданный объект.',
    'Внешние API могут устанавливать свои правила для this (например, addEventListener).'
  ];
  </script>
  
  <style scoped>
  .this-tutorial {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #333;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
    font-size: 2.2rem;
  }
  
  /* Навигация */
  .navigation-tabs {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }
  
  .tab-button {
    padding: 10px 16px;
    background-color: #e8e8e8;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    color: #555;
  }
  
  .tab-button:hover {
    background-color: #d0d0d0;
  }
  
  .tab-button.active {
    background-color: #3498db;
    color: white;
    font-weight: 500;
  }
  
  /* Общие стили для секций */
  .section {
    margin-bottom: 40px;
  }
  
  .section h2 {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 8px;
    margin-bottom: 20px;
  }
  
  /* Стили для блока теории */
  .theory-block {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
  }
  
  .theory-block p {
    line-height: 1.6;
    margin-bottom: 15px;
  }
  
  .cat-explains {
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 25px 0;
    animation: fadeIn 0.5s ease-in-out;
  }
  
  .cat-image {
    width: 120px;
    height: 120px;
    flex-shrink: 0;
  }
  
  .cat-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .cat-speech-bubble {
    position: relative;
    background-color: #f4f8fb;
    border: 2px solid #3498db;
    border-radius: 15px;
    padding: 15px;
    flex: 1;
  }
  
  .cat-speech-bubble:before {
    content: '';
    position: absolute;
    top: 50%;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #3498db;
    transform: translateY(-50%);
  }
  
  .cat-speech-bubble p {
    margin: 8px 0;
    font-weight: 500;
  }
  
  .cat-image.cat-right {
    order: 2;
  }
  
  .cat-image.cat-right + .cat-speech-bubble:before {
    left: auto;
    right: -10px;
    border-right: none;
    border-left: 10px solid #3498db;
  }
  
  .code-example {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 6px;
    margin: 15px 0;
    overflow-x: auto;
  }
  
  .code-example pre {
    margin: 0;
    font-family: 'Courier New', Courier, monospace;
  }
  
  /* Стили для блока сравнения кода */
  .code-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 20px 0;
  }
  
  .code-normal, .code-arrow {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
  }
  
  .code-normal h4, .code-arrow h4 {
    color: #e74c3c;
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 0.9rem;
  }
  
  /* Стили для интерактивной демонстрации */
  .interactive-demo {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    margin: 20px 0;
  }
  
  .demo-tabs {
    display: flex;
    border-bottom: 1px solid #ddd;
    overflow-x: auto;
  }
  
  .demo-tab {
    padding: 12px 16px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    white-space: nowrap;
  }
  
  .demo-tab.active {
    border-bottom: 3px solid #3498db;
    color: #3498db;
    font-weight: bold;
  }
  
  .code-and-result {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  
  .code-editor {
    padding: 15px;
    background-color: #2d2d2d;
    color: #f8f8f2;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.95rem;
    line-height: 1.4;
    overflow-x: auto;
  }
  
  .code-editor pre {
    margin: 0;
  }
  
  .result-area {
    padding: 15px;
    background-color: #f8f8f8;
    border-left: 1px solid #ddd;
  }
  
  .result-area h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #555;
    font-size: 0.9rem;
  }
  
  .result {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 6px;
    font-family: 'Courier New', Courier, monospace;
    min-height: 50px;
  }
  
  .highlight {
    color: #2ecc71;
    font-weight: bold;
  }
  
  /* Кнопки навигации */
  .next-button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
  }
  
  .navigation-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  
  .next-button, .prev-button, .summary-button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }
  
  .next-button:hover, .prev-button:hover, .summary-button:hover {
    background-color: #2980b9;
  }
  
  .prev-button {
    background-color: #95a5a6;
  }
  
  .prev-button:hover {
    background-color: #7f8c8d;
  }
  
  .summary-button {
    background-color: #2ecc71;
  }
  
  .summary-button:hover {
    background-color: #27ae60;
  }
  
  .arrow {
    display: inline-block;
    margin: 0 5px;
  }
  
  /* Стили для дерева решений */
  .decision-tree {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    margin: 20px 0;
  }
  
  .tree-node {
    background-color: #f4f8fb;
    border: 2px solid #3498db;
    border-radius: 8px;
    padding: 15px;
    max-width: 400px;
    margin: 0 auto 30px;
    text-align: center;
  }
  
  .node-content h3, .node-content h4 {
    margin-top: 0;
    color: #2c3e50;
  }
  
  .node-connections {
    position: relative;
    height: 20px;
  }
  
  .connector {
    position: absolute;
    top: 0;
    left: 50%;
    width: 2px;
    height: 20px;
    background-color: #3498db;
  }
  
  .tree-branches {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  
  .branch {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(20% - 20px);
    min-width: 170px;
  }
  
  .branch-line {
    width: 2px;
    height: 30px;
    background-color: #3498db;
    margin-bottom: 5px;
  }
  
  .branch-node {
    width: 100%;
    cursor: pointer;
  }
  
  .branch-node .node-content {
    background-color: #f4f8fb;
    border: 2px solid #3498db;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    transition: all 0.3s ease;
  }
  
  .branch-node .node-content.active {
    background-color: #d6eaf8;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .branch-node .node-content h4 {
    margin: 0;
    font-size: 0.95rem;
  }
  
  .branch-details {
    margin-top: 15px;
    text-align: left;
    animation: fadeIn 0.4s;
  }
  
  .branch-code {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 10px;
    border-radius: 4px;
    margin: 10px 0;
    font-size: 0.85rem;
    overflow-x: auto;
  }
  
  .branch-code pre {
    margin: 0;
    font-family: 'Courier New', Courier, monospace;
  }
  
  .branch-result {
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .branch-result span {
    color: #2ecc71;
  }
  
  /* Стили для окружений this */
  .env-selector {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .env-button {
    padding: 8px 16px;
    background-color: #e8e8e8;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }
  
  .env-button:hover {
    background-color: #d0d0d0;
  }
  
  .env-button.active {
    background-color: #3498db;
    color: white;
  }
  
  .environment-diagram {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }
  
  .diagram {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
    align-items: start;
  }
  
  .diagram-code {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 6px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.95rem;
    line-height: 1.4;
    overflow-x: auto;
  }
  
  .diagram-visual {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .flow-diagram {
    background-color: #f8f8f8;
    padding: 15px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
  }
  
  .flow-diagram img {
    max-width: 100%;
    height: auto;
  }
  
  .diagram-explanation {
    background-color: #fff4e5;
    padding: 15px;
    border-radius: 6px;
    border-left: 4px solid #f39c12;
  }
  
  /* Стили для практических заданий */
  .practice-area {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }
  
  .challenge-selector {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    overflow-x: auto;
    padding-bottom: 5px;
  }
  
  .challenge-button {
    padding: 8px 16px;
    background-color: #e8e8e8;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    white-space: nowrap;
    transition: all 0.3s ease;
    position: relative;
  }
  
  .challenge-button:hover {
    background-color: #d0d0d0;
  }
  
  .challenge-button.active {
    background-color: #3498db;
    color: white;
  }
  
  .challenge-button.completed {
    background-color: #2ecc71;
    color: white;
  }
  
  .check-mark {
    margin-left: 5px;
  }
  
  .challenge-container {
    background-color: #f8f8f8;
    border-radius: 6px;
    padding: 20px;
  }
  
  .challenge-editor {
    height: 180px;
    margin-bottom: 20px;
  }
  
  .challenge-question {
    margin-bottom: 20px;
  }
  
  .challenge-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    margin-top: 15px;
  }
  
  .option-button {
    padding: 10px;
    background-color: white;
    border: 2px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    text-align: left;
    transition: all 0.3s ease;
  }
  
  .option-button:hover {
    border-color: #3498db;
  }
  
  .option-button.selected {
    border-color: #3498db;
    background-color: #ebf5fb;
  }
  
  .option-button.correct {
    border-color: #2ecc71;
    background-color: #d5f5e3;
  }
  
  .option-button.incorrect {
    border-color: #e74c3c;
    background-color: #fadbd8;
  }
  
  .challenge-controls {
    display: flex;
    gap: 15px;
    margin-top: 20px;
  }
  
  .check-button, .next-challenge-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.95rem;
    transition: all 0.3s ease;
  }
  
  .check-button {
    background-color: #3498db;
    color: white;
  }
  
  .check-button:hover {
    background-color: #2980b9;
  }
  
  .next-challenge-button {
    background-color: #2ecc71;
    color: white;
  }
  
  .next-challenge-button:hover {
    background-color: #27ae60;
  }
  
  .check-button:disabled, .next-challenge-button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .challenge-feedback {
    margin-top: 20px;
    border-radius: 6px;
    overflow: hidden;
    animation: slideUp 0.4s ease-out;
  }
  
  .feedback-message {
    padding: 15px;
  }
  
  .feedback-message.correct {
    background-color: #d5f5e3;
    border-left: 4px solid #2ecc71;
  }
  
  .feedback-message.incorrect {
    background-color: #fadbd8;
    border-left: 4px solid #e74c3c;
  }
  
  .feedback-message h4 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  /* Стили для итогов */
  .summary-content {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }
  
  .summary-rules {
    margin: 20px 0;
  }
  
  .rule {
    display: flex;
    margin-bottom: 15px;
    align-items: flex-start;
  }
  
  .rule-number {
    background-color: #3498db;
    color: white;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 15px;
    flex-shrink: 0;
  }
  
  .rule-content {
    flex: 1;
  }
  
  .rule-content p {
    margin: 4px 0;
    line-height: 1.5;
  }
  
  .final-cat {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 30px 0;
  }
  
  .cat-image.cat-big {
    width: 180px;
    height: 180px;
  }
  
  .cat-speech-bubble.final-speech {
    padding: 20px;
  }
  
  .cat-speech-bubble.final-speech h3 {
    margin-top: 0;
    color: #3498db;
  }
  
  .additional-resources {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #ddd;
  }
  
  .additional-resources ul {
    padding-left: 20px;
  }
  
  .additional-resources li {
    margin-bottom: 10px;
  }
  
  .additional-resources a {
    color: #3498db;
    text-decoration: none;
  }
  
  .additional-resources a:hover {
    text-decoration: underline;
  }
  
  .restart-button-container {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  
  .restart-button {
    padding: 12px 24px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
  }
  
  .restart-button:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }
  
  .restart-icon {
    font-size: 1.2rem;
  }
  
  /* Прогресс-бар */
  .progress-bar {
    height: 6px;
    background-color: #e8e8e8;
    border-radius: 3px;
    margin-top: 30px;
    overflow: hidden;
  }
  
  .progress-indicator {
    height: 100%;
    background-color: #3498db;
    transition: width 0.5s ease;
  }
  
  /* Анимации */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
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
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .code-comparison {
      grid-template-columns: 1fr;
    }
    
    .diagram {
      grid-template-columns: 1fr;
    }
    
    .cat-explains {
      flex-direction: column;
      text-align: center;
    }
    
    .cat-image.cat-right {
      order: 0;
    }
    
    .cat-speech-bubble:before {
      display: none;
    }
    
    .code-and-result {
      grid-template-columns: 1fr;
    }
    
    .branch {
      width: calc(33.33% - 20px);
    }
  }
  
  @media (max-width: 576px) {
    .branch {
      width: calc(50% - 20px);
    }
    
    .challenge-options {
      grid-template-columns: 1fr;
    }
    
    .final-cat {
      flex-direction: column;
      text-align: center;
    }
  }
  </style>
      