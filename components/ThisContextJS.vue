<template>
    <div class="this-explorer">
      <h1>Исследование контекста <code>this</code> в JavaScript</h1>
      
      <div class="problem-statement">
        <h2>Задача</h2>
        <p>Определите, что будет выведено в консоль при выполнении следующего кода:</p>
        <pre class="code-block">function foo() {
    const x = 10;
  
    return {
      x: 20,
  
      bar() {
        console.log(this.x);
      },
  
      baz: () => {
        console.log(this.x);
      },
    };
  }
  
  const obj1 = foo();
  obj1.bar(); // ?
  obj1.baz(); // ?
  
  const obj2 = foo.call({ x: 30 });
  let y = obj2.bar;
  let x = obj2.baz;
  
  y(); // ?
  x(); // ?
  
  obj2.bar(); // ?
  obj2.baz(); // ?</pre>
      </div>
  
      <div class="theory-section">
        <h2>Основные принципы работы this в JavaScript</h2>
        <div class="principles">
          <div class="principle">
            <h3>1. Контекст вызова</h3>
            <p>Значение <code>this</code> определяется <strong>способом вызова</strong> функции, а не местом её определения.</p>
          </div>
          <div class="principle">
            <h3>2. Обычные функции vs стрелочные</h3>
            <p>Обычные функции имеют свой контекст <code>this</code>, который определяется при вызове. Стрелочные функции <strong>не имеют собственного</strong> <code>this</code> и используют <code>this</code> из лексического окружения, где они были определены.</p>
          </div>
          <div class="principle">
            <h3>3. Методы объектов</h3>
            <p>При вызове функции как метода объекта (<code>obj.method()</code>), <code>this</code> указывает на этот объект.</p>
          </div>
          <div class="principle">
            <h3>4. Простой вызов</h3>
            <p>При простом вызове функции (<code>func()</code>) в нестрогом режиме <code>this</code> ссылается на глобальный объект (window), в строгом режиме — <code>undefined</code>.</p>
          </div>
        </div>
      </div>
  
      <div class="solution-section">
        <h2>Пошаговое решение</h2>
        <div class="step-controls">
          <button @click="prevStep" :disabled="currentStep <= 0">← Назад</button>
          <span class="step-indicator">Шаг {{ currentStep + 1 }} из {{ steps.length }}</span>
          <button @click="nextStep" :disabled="currentStep >= steps.length - 1">Далее →</button>
        </div>
  
        <div class="execution-steps">
          <div class="execution-step" v-for="(step, index) in steps" :key="index" v-show="currentStep === index">
            <div class="step-header">
              <div class="step-title">{{ step.title }}</div>
              <div class="step-code">{{ step.code }}</div>
            </div>
            
            <div class="execution-visualization">
              <div class="memory-model">
                <div class="memory-section" v-if="step.memory.global">
                  <div class="section-title">Глобальная область</div>
                  <div class="memory-object">
                    <div class="object-property" v-for="(value, key) in step.memory.global" :key="key">
                      <span class="property-name">{{ key }}:</span>
                      <span class="property-value">{{ value }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="memory-section" v-if="step.memory.function">
                  <div class="section-title">Функция foo</div>
                  <div class="memory-object">
                    <div class="object-property" v-for="(value, key) in step.memory.function" :key="key">
                      <span class="property-name">{{ key }}:</span>
                      <span class="property-value">{{ value }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="memory-section" v-if="step.memory.returnObject">
                  <div class="section-title">Возвращаемый объект</div>
                  <div class="memory-object">
                    <div class="object-property" v-for="(value, key) in step.memory.returnObject" :key="key">
                      <span class="property-name">{{ key }}:</span>
                      <span class="property-value" v-if="typeof value !== 'object'">{{ value }}</span>
                      <span class="property-value method" v-else>{{ value.type }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="memory-section" v-if="step.memory.obj1">
                  <div class="section-title">obj1</div>
                  <div class="memory-object">
                    <div class="object-property" v-for="(value, key) in step.memory.obj1" :key="key">
                      <span class="property-name">{{ key }}:</span>
                      <span class="property-value" v-if="typeof value !== 'object'">{{ value }}</span>
                      <span class="property-value method" v-else>{{ value.type }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="memory-section" v-if="step.memory.obj2">
                  <div class="section-title">obj2</div>
                  <div class="memory-object">
                    <div class="object-property" v-for="(value, key) in step.memory.obj2" :key="key">
                      <span class="property-name">{{ key }}:</span>
                      <span class="property-value" v-if="typeof value !== 'object'">{{ value }}</span>
                      <span class="property-value method" v-else>{{ value.type }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="this-context" v-if="step.thisContext">
                <div class="context-title">Контекст this при выполнении</div>
                <div class="context-value" :class="{ 'highlight': step.highlight === 'this' }">
                  {{ step.thisContext }}
                </div>
                <div class="context-arrow" v-if="step.thisTarget"></div>
                <div class="context-target" v-if="step.thisTarget">
                  {{ step.thisTarget }}
                </div>
              </div>
              
              <div class="console-output" v-if="step.output !== undefined">
                <div class="output-title">Вывод в консоль</div>
                <div class="output-value" :class="{ 'highlight': step.highlight === 'output' }">
                  {{ step.output }}
                </div>
              </div>
            </div>
            
            <div class="step-explanation">
              <h3>Объяснение</h3>
              <p v-html="step.explanation"></p>
            </div>
          </div>
        </div>
      </div>
  
      <div class="algorithm-section">
        <h2>Алгоритм определения значения this</h2>
        <div class="algorithm-steps">
          <div class="algorithm-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Стрелочная функция?</h3>
              <p>Если функция стрелочная (<code>() => {}</code>), то <code>this</code> берётся из лексического окружения, где функция была создана.</p>
            </div>
          </div>
          <div class="algorithm-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Использование call/apply/bind?</h3>
              <p>Если функция вызывается через <code>call</code>, <code>apply</code> или создана через <code>bind</code>, то <code>this</code> равен первому аргументу этих методов.</p>
            </div>
          </div>
          <div class="algorithm-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Вызов как метод объекта?</h3>
              <p>Если функция вызывается как метод объекта (<code>obj.method()</code>), то <code>this</code> указывает на этот объект.</p>
            </div>
          </div>
          <div class="algorithm-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>Простой вызов функции</h3>
              <p>При обычном вызове (<code>func()</code>) в строгом режиме <code>this</code> будет <code>undefined</code>, в нестрогом — глобальный объект.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="results-section">
        <h2>Итоговые ответы</h2>
        <div class="results-table">
          <table>
            <thead>
              <tr>
                <th>Вызов</th>
                <th>Вывод</th>
                <th>Объяснение</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>obj1.bar();</code></td>
                <td>20</td>
                <td>Обычный метод, <code>this</code> указывает на <code>obj1</code>, где <code>x</code> равно 20</td>
              </tr>
              <tr>
                <td><code>obj1.baz();</code></td>
                <td>undefined</td>
                <td>Стрелочная функция, <code>this</code> берется из контекста создания (глобальная область)</td>
              </tr>
              <tr>
                <td><code>y();</code></td>
                <td>undefined</td>
                <td>Потеря контекста при присваивании метода переменной, <code>this</code> указывает на глобальный объект</td>
              </tr>
              <tr>
                <td><code>x();</code></td>
                <td>undefined</td>
                <td>Стрелочная функция сохраняет <code>this</code> из места создания независимо от вызова</td>
              </tr>
              <tr>
                <td><code>obj2.bar();</code></td>
                <td>20</td>
                <td>Обычный метод, <code>this</code> указывает на <code>obj2</code>, где <code>x</code> равно 20</td>
              </tr>
              <tr>
                <td><code>obj2.baz();</code></td>
                <td>undefined</td>
                <td>Стрелочная функция, <code>this</code> берется из контекста создания (глобальная область)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="realworld-section">
        <h2>Применение в реальных проектах</h2>
        <div class="application-cases">
          <div class="case">
            <h3>1. Обработчики событий</h3>
            <p>Стрелочные функции часто используются в обработчиках событий для сохранения контекста компонента:</p>
            <pre class="code-example">// Vue компонент
  methods: {
    saveData() {
      // Используем стрелочную функцию, чтобы сохранить this
      apiService.post('/api/data', this.formData)
        .then(() => {
          this.showNotification('Сохранено!'); // this указывает на компонент
        });
    }
  }</pre>
          </div>
          
          <div class="case">
            <h3>2. Конструкторы классов</h3>
            <p>В классах важно понимать разницу между обычными и стрелочными методами:</p>
            <pre class="code-example">class Button {
    constructor(text) {
      this.text = text;
      this.element = document.createElement('button');
      this.element.textContent = text;
      
      // Потеря контекста при передаче метода как колбэка
      this.element.addEventListener('click', this.onClick); // Не сработает
      
      // Правильное решение - использовать bind или стрелочную функцию
      this.element.addEventListener('click', this.onClick.bind(this));
      // или
      this.element.addEventListener('click', () => this.onClick());
    }
    
    onClick() {
      console.log(`Кнопка "${this.text}" нажата`);
    }
  }</pre>
          </div>
          
          <div class="case">
            <h3>3. Функциональное программирование</h3>
            <p>При работе с методами массивов важно не потерять контекст:</p>
            <pre class="code-example">const users = [
    { name: 'Иван', age: 28 },
    { name: 'Мария', age: 32 }
  ];
  
  // UserService в реальном приложении
  const UserService = {
    minAge: 18,
    
    getAdults(users) {
      // this будет указывать на UserService
      return users.filter(function(user) {
        return user.age >= this.minAge;  // Ошибка - this не указывает на UserService!
      });
    },
    
    // Исправленная версия
    getAdultsFixed(users) {
      // Используем стрелочную функцию
      return users.filter(user => user.age >= this.minAge);
    }
  };</pre>
          </div>
        </div>
      </div>
  
      <div class="summary-section">
        <h2>Ключевые правила для запоминания</h2>
        <div class="key-rules">
          <div class="rule">
            <div class="rule-icon">📌</div>
            <div class="rule-content">
              <h3>Способ вызова определяет this</h3>
              <p>Значение <code>this</code> зависит от того, <strong>как</strong> вызывается функция, а не от того, где она определена.</p>
            </div>
          </div>
          <div class="rule">
            <div class="rule-icon">📌</div>
            <div class="rule-content">
              <h3>Стрелочные функции "замораживают" this</h3>
              <p>Стрелочные функции захватывают <code>this</code> из окружения, где они были созданы, и никогда его не меняют.</p>
            </div>
          </div>
          <div class="rule">
            <div class="rule-icon">📌</div>
            <div class="rule-content">
              <h3>Методы теряют контекст при присваивании</h3>
              <p>Когда метод объекта сохраняется в переменную (<code>const func = obj.method</code>) и вызывается как обычная функция, он теряет контекст.</p>
            </div>
          </div>
          <div class="rule">
            <div class="rule-icon">📌</div>
            <div class="rule-content">
              <h3>call/apply/bind изменяют this</h3>
              <p>Эти методы позволяют явно указать, чему должен быть равен <code>this</code> при вызове функции.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const currentStep = ref(0);
  
  const steps = [
    {
      title: "Определение функции foo",
      code: "function foo() { ... }",
      memory: {
        function: {
          "x": 10
        },
        returnObject: {
          "x": 20,
          "bar": { type: "function() { console.log(this.x); }" },
          "baz": { type: "() => { console.log(this.x); }" }
        }
      },
      explanation: "Функция <code>foo</code> определяет локальную переменную <code>x = 10</code> и возвращает объект с тремя свойствами: <code>x = 20</code>, метод <code>bar</code> (обычная функция) и метод <code>baz</code> (стрелочная функция). Локальная переменная <code>x = 10</code> нигде не используется."
    },
    {
      title: "Создание объекта obj1",
      code: "const obj1 = foo();",
      memory: {
        function: {
          "x": 10
        },
        obj1: {
          "x": 20,
          "bar": { type: "function() { console.log(this.x); }" },
          "baz": { type: "() => { console.log(this.x); }" }
        }
      },
      explanation: "Вызываем функцию <code>foo</code> и сохраняем возвращаемый объект в переменную <code>obj1</code>. Объект содержит свойство <code>x</code> со значением 20 и два метода."
    },
    {
      title: "Вызов метода obj1.bar()",
      code: "obj1.bar();",
      memory: {
        obj1: {
          "x": 20,
          "bar": { type: "function() { console.log(this.x); }" },
          "baz": { type: "() => { console.log(this.x); }" }
        }
      },
      thisContext: "{ x: 20, bar: function(), baz: () => {} }",
      thisTarget: "obj1",
      output: 20,
      highlight: "output",
      explanation: "Вызываем метод <code>bar</code> объекта <code>obj1</code>. Так как это обычная функция, вызванная как метод объекта, <code>this</code> внутри неё указывает на <code>obj1</code>. Поэтому <code>this.x</code> равно 20, и в консоль выводится 20."
    },
    {
      title: "Вызов метода obj1.baz()",
      code: "obj1.baz();",
      memory: {
        global: {
          "x": undefined
        },
        obj1: {
          "x": 20,
          "bar": { type: "function() { console.log(this.x); }" },
          "baz": { type: "() => { console.log(this.x); }" }
        }
      },
      thisContext: "window (глобальный объект)",
      thisTarget: "global",
      output: "undefined",
      highlight: "output",
      explanation: "Вызываем метод <code>baz</code> объекта <code>obj1</code>. Так как это <strong>стрелочная функция</strong>, она не имеет собственного <code>this</code> и использует <code>this</code> из лексического окружения, где была создана. В данном случае функция <code>baz</code> была создана внутри функции <code>foo</code>, где <code>this</code> указывает на глобальный объект (window). В глобальном объекте нет свойства <code>x</code>, поэтому <code>this.x</code> равно <code>undefined</code>, и в консоль выводится <code>undefined</code>."
    },
    {
      title: "Вызов функции foo.call({ x: 30 })",
      code: "const obj2 = foo.call({ x: 30 });",
      memory: {
        global: {
          "x": undefined
        },
        function: {
          "x": 10
        },
        obj2: {
          "x": 20,
          "bar": { type: "function() { console.log(this.x); }" },
          "baz": { type: "() => { console.log(this.x); }" }
        }
      },
      thisContext: "{ x: 30 }",
      explanation: "Вызываем функцию <code>foo</code> с помощью метода <code>call</code>, передавая объект <code>{ x: 30 }</code> в качестве контекста <code>this</code>. Однако внутри функции <code>foo</code> мы не используем <code>this</code> напрямую, поэтому этот вызов не влияет на возвращаемый объект. <code>obj2</code> будет иметь такую же структуру, как и <code>obj1</code>."
    },
    {
      title: "Сохранение методов в переменные",
      code: "let y = obj2.bar;\nlet x = obj2.baz;",
      memory: {
        global: {
          "x": "функция baz из obj2",
          "y": "функция bar из obj2"
        },
        obj2: {
          "x": 20,
          "bar": { type: "function() { console.log(this.x); }" },
          "baz": { type: "() => { console.log(this.x); }" }
        }
      },
      explanation: "Сохраняем ссылки на методы <code>obj2.bar</code> и <code>obj2.baz</code> в переменные <code>y</code> и <code>x</code> соответственно. Важно понимать, что мы сохраняем только ссылки на функции, отделяя их от объекта <code>obj2</code>."
    },
    {
      title: "Вызов функции y()",
      code: "y();",
      memory: {
        global: {
          "x": "функция baz из obj2",
          "y": "функция bar из obj2"
        },
        obj2: {
          "x": 20,
          "bar": { type: "function() { console.log(this.x); }" },
          "baz": { type: "() => { console.log(this.x); }" }
        }
      },
      thisContext: "window (глобальный объект)",
      thisTarget: "global",
      output: "undefined",
      highlight: "output",
      explanation: "Вызываем функцию <code>y</code>, которая ссылается на метод <code>bar</code> объекта <code>obj2</code>. Но так как мы вызываем её как обычную функцию (не как метод объекта), <code>this</code> внутри неё указывает на глобальный объект. В глобальном объекте нет свойства <code>x</code> (или оно равно <code>undefined</code>), поэтому <code>this.x</code> равно <code>undefined</code>, и в консоль выводится <code>undefined</code>."
    },
    {
      title: "Вызов функции x()",
      code: "x();",
      memory: {
        global: {
          "x": "функция baz из obj2",
          "y": "функция bar из obj2"
        },
        obj2: {
          "x": 20,
          "bar": { type: "function() { console.log(this.x); }" },
          "baz": { type: "() => { console.log(this.x); }" }
        }
      },
      thisContext: "window (глобальный объект)",
      thisTarget: "global",
      output: "undefined",
      highlight: "output",
      explanation: "Вызываем функцию <code>x</code>, которая ссылается на метод <code>baz</code> объекта <code>obj2</code>. Так как <code>baz</code> - это стрелочная функция, она сохраняет <code>this</code> из места, где была создана (внутри <code>foo</code>), независимо от способа вызова. <code>this</code> в этом случае указывает на глобальный объект, и <code>this.x</code> равно <code>undefined</code>."
    },
    {
      title: "Вызов метода obj2.bar()",
      code: "obj2.bar();",
      memory: {
        obj2: {
          "x": 20,
          "bar": { type: "function() { console.log(this.x); }" },
          "baz": { type: "() => { console.log(this.x); }" }
        }
      },
      thisContext: "{ x: 20, bar: function(), baz: () => {} }",
      thisTarget: "obj2",
      output: 20,
      highlight: "output",
      explanation: "Вызываем метод <code>bar</code> объекта <code>obj2</code>. Так как это обычная функция, вызванная как метод объекта, <code>this</code> внутри неё указывает на <code>obj2</code>. Поэтому <code>this.x</code> равно 20, и в консоль выводится 20."
    },
    {
      title: "Вызов метода obj2.baz()",
      code: "obj2.baz();",
      memory: {
        global: {
          "x": "функция baz из obj2"
        },
        obj2: {
          "x": 20,
          "bar": { type: "function() { console.log(this.x); }" },
          "baz": { type: "() => { console.log(this.x); }" }
        }
      },
      thisContext: "window (глобальный объект)",
      thisTarget: "global",
      output: "undefined",
      highlight: "output",
      explanation: "Вызываем метод <code>baz</code> объекта <code>obj2</code>. Хоть мы и вызываем его как метод объекта, но так как это стрелочная функция, она сохраняет <code>this</code> из места, где была создана (внутри <code>foo</code>). <code>this</code> внутри <code>foo</code> указывает на глобальный объект, поэтому <code>this.x</code> равно <code>undefined</code>, и в консоль выводится <code>undefined</code>."
    }
  ];
  
  function nextStep() {
    if (currentStep.value < steps.length - 1) {
      currentStep.value++;
    }
  }
  
  function prevStep() {
    if (currentStep.value > 0) {
      currentStep.value--;
    }
  }
  </script>
  
  <style scoped>
  .this-explorer {
    font-family: Arial, Helvetica, sans-serif;
    max-width: 100%;
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
    font-size: 1.8rem;
    margin-bottom: 30px;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-top: 40px;
    margin-bottom: 20px;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
  }
  
  h3 {
    font-size: 1.2rem;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 15px;
  }
  
  code {
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    background-color: #f5f5f5;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 0.9em;
  }
  
  .problem-statement {
    margin-bottom: 30px;
  }
  
  .code-block {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    overflow-x: auto;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 14px;
    line-height: 1.5;
    margin: 15px 0;
    white-space: pre;
  }
  
  .principles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .principle {
    background-color: #f9f9f9;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 15px;
  }
  
  .principle h3 {
    margin-top: 0;
    color: #333;
  }
  
  .step-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .step-controls button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .step-controls button:hover {
    background-color: #45a049;
  }
  
  .step-controls button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .step-indicator {
    font-weight: bold;
  }
  
  .execution-step {
    margin-bottom: 30px;
    animation: fadeIn 0.5s;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .step-header {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  .step-title {
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
  
  .step-code {
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 10px;
    border-radius: 3px;
  }
  
  .execution-visualization {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .memory-model {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
  
  .memory-section {
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
  }
  
  .section-title {
    background-color: #4CAF50;
    color: white;
    padding: 8px 12px;
    font-weight: bold;
  }
  
  .memory-object {
    padding: 15px;
  }
  
  .object-property {
    margin-bottom: 8px;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
  }
  
  .property-name {
    font-weight: bold;
    color: #333;
  }
  
  .property-value {
    margin-left: 5px;
    color: #2c3e50;
  }
  
  .property-value.method {
    color: #e74c3c;
    font-size: 0.9em;
  }
  
  .this-context {
    background-color: #e8f4f8;
    border: 1px solid #b8daff;
    border-radius: 5px;
    padding: 15px;
    position: relative;
  }
  
  .context-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #0c5460;
  }
  
  .context-value {
    padding: 8px 12px;
    background-color: #d1ecf1;
    border-radius: 3px;
    margin-bottom: 10px;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    transition: all 0.3s;
  }
  
  .context-value.highlight {
    background-color: #c3e6cb;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  
  .context-arrow {
    height: 20px;
    border-left: 2px dashed #4CAF50;
    margin-left: 50%;
  }
  
  .context-target {
    padding: 8px 12px;
    background-color: #d4edda;
    border-radius: 3px;
    text-align: center;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
  }
  
  .console-output {
    background-color: #2d2d2d;
    color: #f8f8f2;
    border-radius: 5px;
    padding: 15px;
  }
  
  .output-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #adb5bd;
  }
  
  .output-value {
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    padding: 8px 12px;
    background-color: #343a40;
    border-radius: 3px;
    transition: all 0.3s;
  }
  
  .output-value.highlight {
    background-color: #495057;
    color: #20c997;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    font-weight: bold;
  }
  
  .step-explanation {
    background-color: #f8f9fa;
    border-left: 4px solid #4CAF50;
    padding: 15px;
    margin-top: 20px;
  }
  
  .algorithm-steps {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  }
  
  .algorithm-step {
    display: flex;
    gap: 15px;
    background-color: #f9f9f9;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 15px;
  }
  
  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: #4CAF50;
    color: white;
    border-radius: 50%;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  .step-content {
    flex: 1;
  }
  
  .step-content h3 {
    margin-top: 0;
  }
  
  .results-table {
    overflow-x: auto;
    margin-top: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  
  th {
    background-color: #4CAF50;
    color: white;
  }
  
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  .application-cases {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
  }
  
  .case {
    background-color: #f9f9f9;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 15px;
  }
  
  .code-example {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    overflow-x: auto;
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 14px;
    line-height: 1.5;
    margin: 15px 0;
    white-space: pre;
  }
  
  .key-rules {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .rule {
    display: flex;
    gap: 15px;
    background-color: #f9f9f9;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 15px;
  }
  
  .rule-icon {
    font-size: 1.5rem;
    color: #4CAF50;
  }
  
  .rule-content {
    flex: 1;
  }
  
  .rule-content h3 {
    margin-top: 0;
    color: #333;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .principles {
      grid-template-columns: 1fr;
    }
    
    .memory-model {
      grid-template-columns: 1fr;
    }
    
    .key-rules {
      grid-template-columns: 1fr;
    }
  }
  </style>