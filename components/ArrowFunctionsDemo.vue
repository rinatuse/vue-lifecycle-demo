<template>
    <div class="arrow-functions-demo">
      <h1 class="title">Стрелочные функции vs обычные функции в JavaScript</h1>
      <p class="subtitle">Интерактивное исследование ключевых отличий</p>
      
      <div class="features-tabs">
        <button 
          v-for="(feature, index) in features" 
          :key="feature.id"
          :class="{ active: currentFeatureIndex === index }"
          @click="currentFeatureIndex = index"
          class="feature-tab"
        >
          {{ feature.title }}
        </button>
      </div>
      
      <transition name="fade" mode="out-in">
        <div :key="currentFeatureIndex" class="feature-content">
          <h2>{{ currentFeature.title }}</h2>
          <div class="feature-description" v-html="currentFeature.description"></div>
          
          <div class="code-comparison">
            <div class="code-block regular-function">
              <h3>Обычная функция</h3>
              <pre><code>{{ currentFeature.regularCode }}</code></pre>
            </div>
            <div class="comparison-arrow">
              <div class="arrow-icon">⟶</div>
            </div>
            <div class="code-block arrow-function">
              <h3>Стрелочная функция</h3>
              <pre><code>{{ currentFeature.arrowCode }}</code></pre>
            </div>
          </div>
          
          <div class="demo-area">
            <h3>Демонстрация</h3>
            <div class="demo-controls">
              <button @click="runDemo" class="run-button" :disabled="isDemoRunning">
                {{ isDemoRunning ? 'Выполняется...' : 'Запустить демонстрацию' }}
              </button>
            </div>
            
            <div class="demo-visualization">
              <!-- Визуализация для "this" -->
              <div v-if="currentFeature.id === 'this'" class="this-demo" :class="{ active: isDemoRunning }">
                <div class="objects-container">
                  <div class="object-box">
                    <div class="object-title">Внешний объект</div>
                    <div class="object-content">
                      <div class="property">name: "Объект"</div>
                      <div class="functions">
                        <div class="function regular" :class="{ active: demoStep === 1 }">
                          regularMethod() { ... }
                        </div>
                        <div class="function arrow" :class="{ active: demoStep === 3 }">
                          arrowMethod: () => { ... }
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="execution-context">
                    <div class="context-title">Контекст выполнения</div>
                    <div class="this-binding">
                      <div class="binding-label">this =</div>
                      <div class="binding-value" :class="{ 
                        'global': demoStep === 2,
                        'object': demoStep === 1 || demoStep === 3 || demoStep === 4
                      }">
                        <template v-if="demoStep === 0">?</template>
                        <template v-else-if="demoStep === 1 || demoStep === 3 || demoStep === 4">Объект</template>
                        <template v-else-if="demoStep === 2">window / undefined</template>
                      </div>
                    </div>
                    <div class="execution-result">
                      <div v-if="demoStep === 1" class="result success">
                        obj.regularMethod() → "Метод объекта"
                      </div>
                      <div v-if="demoStep === 2" class="result error">
                        const fn = obj.regularMethod;<br>
                        fn() → this потерян!
                      </div>
                      <div v-if="demoStep === 3" class="result success">
                        obj.arrowMethod() → "Метод объекта"
                      </div>
                      <div v-if="demoStep === 4" class="result success">
                        const fn = obj.arrowMethod;<br>
                        fn() → this сохранён!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Визуализация для синтаксиса -->
              <div v-if="currentFeature.id === 'syntax'" class="syntax-demo" :class="{ active: isDemoRunning }">
                <div class="syntax-animation">
                  <div class="syntax-step" :class="{ active: demoStep >= 1 }">
                    <div class="function-declaration">function add(a, b) { return a + b; }</div>
                  </div>
                  <div class="syntax-arrow" :class="{ active: demoStep >= 2 }">⟶</div>
                  <div class="syntax-step" :class="{ active: demoStep >= 3 }">
                    <div class="arrow-declaration">(a, b) => { return a + b; }</div>
                  </div>
                  <div class="syntax-arrow" :class="{ active: demoStep >= 4 }">⟶</div>
                  <div class="syntax-step" :class="{ active: demoStep >= 5 }">
                    <div class="arrow-short">(a, b) => a + b</div>
                  </div>
                  <div class="syntax-note" :class="{ active: demoStep >= 5 }">
                    Без фигурных скобок возврат значения происходит автоматически
                  </div>
                </div>
              </div>
              
              <!-- Визуализация для arguments -->
              <div v-if="currentFeature.id === 'arguments'" class="arguments-demo" :class="{ active: isDemoRunning }">
                <div class="execution-simulation">
                  <div class="function-call">sum(1, 2, 3, 4, 5)</div>
                  <div class="function-execution">
                    <div class="execution-box">
                      <div class="execution-title">
                        <span v-if="demoStep < 3">Обычная функция</span>
                        <span v-else>Стрелочная функция</span>
                      </div>
                      <div class="execution-content">
                        <div class="variable-row" :class="{ active: demoStep >= 1 && demoStep < 3 }">
                          <span class="variable-name">arguments</span>
                          <span class="variable-value">[1, 2, 3, 4, 5]</span>
                        </div>
                        <div class="variable-row" :class="{ active: demoStep >= 2 && demoStep < 3 }">
                          <span class="variable-name">sum</span>
                          <span class="variable-value">15</span>
                        </div>
                        <div class="variable-row error" :class="{ active: demoStep >= 3 && demoStep < 5 }">
                          <span class="variable-name">arguments</span>
                          <span class="variable-value">Ошибка: arguments не существует!</span>
                        </div>
                        <div class="variable-row" :class="{ active: demoStep >= 4 }">
                          <span class="variable-name">rest</span>
                          <span class="variable-value">[1, 2, 3, 4, 5]</span>
                        </div>
                        <div class="variable-row" :class="{ active: demoStep >= 5 }">
                          <span class="variable-name">sum</span>
                          <span class="variable-value">15</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Визуализация для конструктора -->
              <div v-if="currentFeature.id === 'constructor'" class="constructor-demo" :class="{ active: isDemoRunning }">
                <div class="constructor-animation">
                  <div class="constructor-row">
                    <div class="code-snippet">new RegularFunction()</div>
                    <div class="result-box" :class="{ active: demoStep >= 1 }">
                      <div class="result-icon success">✓</div>
                      <div class="result-text">Создан новый объект: { }</div>
                    </div>
                  </div>
                  <div class="constructor-row">
                    <div class="code-snippet">new ArrowFunction()</div>
                    <div class="result-box" :class="{ active: demoStep >= 2 }">
                      <div class="result-icon error">✗</div>
                      <div class="result-text">TypeError: ArrowFunction is not a constructor</div>
                    </div>
                  </div>
                  <div class="constructor-explanation" :class="{ active: demoStep >= 3 }">
                    <p>Стрелочные функции не могут быть использованы как конструкторы и не имеют прототипа.</p>
                    <p>Они не обладают собственным свойством <code>prototype</code> и не создают прототип для new.</p>
                  </div>
                </div>
              </div>
              
              <!-- Визуализация для hoisting -->
              <div v-if="currentFeature.id === 'hoisting'" class="hoisting-demo" :class="{ active: isDemoRunning }">
                <div class="execution-timeline">
                  <div class="timeline-phase" :class="{ active: demoStep >= 1 }">
                    <div class="phase-title">Фаза создания</div>
                    <div class="phase-content">
                      <div class="hoisting-item success" v-if="demoStep >= 1">
                        <div class="item-name">regularFunc</div>
                        <div class="item-value">Function { ... }</div>
                      </div>
                      <div class="hoisting-item warning" v-if="demoStep >= 2">
                        <div class="item-name">funcExpr</div>
                        <div class="item-value">undefined</div>
                      </div>
                      <div class="hoisting-item warning" v-if="demoStep >= 2">
                        <div class="item-name">arrowFunc</div>
                        <div class="item-value">undefined</div>
                      </div>
                    </div>
                  </div>
                  <div class="timeline-phase" :class="{ active: demoStep >= 3 }">
                    <div class="phase-title">Фаза выполнения</div>
                    <div class="phase-content">
                      <div class="code-line" :class="{ active: demoStep === 3 }">
                        regularFunc(); // Успешно вызвана
                      </div>
                      <div class="code-line" :class="{ active: demoStep === 4 }">
                        funcExpr(); // TypeError: funcExpr is not a function
                      </div>
                      <div class="code-line" :class="{ active: demoStep === 5 }">
                        arrowFunc(); // TypeError: arrowFunc is not a function
                      </div>
                      <div class="code-line" :class="{ active: demoStep === 6 }">
                        // Инициализация переменных
                      </div>
                      <div class="code-line" :class="{ active: demoStep === 7 }">
                        funcExpr(); // Успешно вызвана
                      </div>
                      <div class="code-line" :class="{ active: demoStep === 8 }">
                        arrowFunc(); // Успешно вызвана
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="feature-summary">
            <div class="summary-title">Ключевые моменты:</div>
            <ul class="summary-points">
              <li v-for="(point, index) in currentFeature.keyPoints" :key="index">
                {{ point }}
              </li>
            </ul>
          </div>
        </div>
      </transition>
      
      <div class="progress-bar">
        <div 
          class="progress-indicator" 
          :style="{ width: `${(currentFeatureIndex + 1) * (100 / features.length)}%` }"
        ></div>
      </div>
      
      <div class="navigation-buttons">
        <button 
          @click="prevFeature" 
          class="nav-button prev" 
          :disabled="currentFeatureIndex === 0"
        >
          ← Предыдущий
        </button>
        <button 
          @click="nextFeature" 
          class="nav-button next"
          :disabled="currentFeatureIndex === features.length - 1"
        >
          Следующий →
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onBeforeUnmount } from 'vue';
  
  // Основные особенности стрелочных функций
  const features = [
    {
      id: 'syntax',
      title: 'Лаконичный синтаксис',
      description: `<p>Стрелочные функции обеспечивают более краткий и выразительный синтаксис по сравнению с обычными функциями. Особенно это заметно для коротких функций, где используется неявный возврат значения.</p>`,
      regularCode: `function add(a, b) {
    return a + b;
  }
  
  // Выражение функции
  const multiply = function(a, b) {
    return a * b;
  };
  
  // Несколько выражений требуют блока и return
  function greet(name) {
    const message = "Привет, " + name;
    return message;
  }`,
      arrowCode: `const add = (a, b) => {
    return a + b;
  };
  
  // Короткая форма с неявным возвратом
  const multiply = (a, b) => a * b;
  
  // Одиночный параметр можно писать без скобок
  const square = x => x * x;
  
  // Несколько выражений требуют блока и return
  const greet = name => {
    const message = "Привет, " + name;
    return message;
  };`,
      keyPoints: [
        'Стрелочные функции имеют более короткий синтаксис',
        'Если тело функции — одно выражение, фигурные скобки и return можно опустить',
        'Если параметр только один, можно опустить скобки вокруг параметра',
        'Стрелочные функции всегда являются анонимными, но можно сохранить их в переменную'
      ]
    },
    {
      id: 'this',
      title: 'Лексический this',
      description: `<p>Одно из главных отличий стрелочных функций — они не создают собственного контекста <code>this</code>. Вместо этого они используют значение <code>this</code> из окружающего лексического контекста.</p>`,
      regularCode: `const obj = {
    name: "Объект",
    regularMethod: function() {
      console.log(this.name); // "Объект"
      
      // Потеря контекста при передаче функции
      setTimeout(function() {
        console.log(this.name); // undefined
      }, 100);
      
      // Рабочее решение - сохранение this
      const self = this;
      setTimeout(function() {
        console.log(self.name); // "Объект"
      }, 100);
    }
  };
  
  // При вызове как метод - this указывает на объект
  obj.regularMethod();
  
  // При сохранении в переменную - this теряется
  const method = obj.regularMethod;
  method(); // this будет window или undefined`,
      arrowCode: `const obj = {
    name: "Объект",
    arrowMethod: function() {
      console.log(this.name); // "Объект"
      
      // Стрелочная функция сохраняет this
      setTimeout(() => {
        console.log(this.name); // "Объект"
      }, 100);
    }
  };
  
  // При вызове как метод - this указывает на объект
  obj.arrowMethod();
  
  // Даже при сохранении в переменную - this сохраняется
  const method = obj.arrowMethod;
  method(); // this всё равно указывает на obj!
  
  // НО! Не используйте стрелочные функции как методы объекта
  const badObj = {
    name: "Плохой пример",
    // this здесь не будет указывать на badObj!
    badMethod: () => {
      console.log(this.name); // undefined
    }
  };`,
      keyPoints: [
        'Стрелочные функции не имеют собственного this',
        'Они наследуют this из родительской области видимости',
        'Это решает проблему потери контекста в колбэках и обработчиках событий',
        'Стрелочные функции не рекомендуется использовать в качестве методов объекта',
        'Значение this в стрелочных функциях не может быть изменено методами call(), apply() и bind()'
      ]
    },
    {
      id: 'arguments',
      title: 'Отсутствие arguments',
      description: `<p>Стрелочные функции не имеют собственного объекта <code>arguments</code>, который содержит все аргументы функции. Вместо этого они наследуют <code>arguments</code> из внешней функции или используют rest-параметры.</p>`,
      regularCode: `function sum() {
    // arguments доступен внутри обычной функции
    console.log(arguments); // { 0: 1, 1: 2, ... }
    
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
      total += arguments[i];
    }
    return total;
  }
  
  sum(1, 2, 3, 4, 5); // 15`,
      arrowCode: `const sum = (...numbers) => {
    // arguments недоступен в стрелочной функции
    // console.log(arguments); // ReferenceError
    
    // Вместо этого используем rest-параметр
    console.log(numbers); // [1, 2, 3, 4, 5]
    
    let total = 0;
    for (let num of numbers) {
      total += num;
    }
    return total;
  };
  
  sum(1, 2, 3, 4, 5); // 15`,
      keyPoints: [
        'Стрелочные функции не имеют собственного объекта arguments',
        'Для доступа к аргументам используйте rest-параметры (...args)',
        'Rest-параметры собирают все аргументы в настоящий массив, с которым удобнее работать',
        'В отличие от arguments, rest-параметры можно деструктурировать'
      ]
    },
    {
      id: 'constructor',
      title: 'Не используются с new',
      description: `<p>Стрелочные функции нельзя использовать как конструкторы. Они не могут быть вызваны с оператором <code>new</code> и не имеют прототипа.</p>`,
      regularCode: `function Person(name) {
    this.name = name;
  }
  
  Person.prototype.sayHello = function() {
    return "Привет, я " + this.name;
  };
  
  // Создание экземпляра
  const john = new Person("Иван");
  console.log(john.sayHello()); // "Привет, я Иван"
  
  // Проверка прототипа
  console.log(Person.prototype); // {sayHello: ƒ}
  console.log(john instanceof Person); // true`,
      arrowCode: `const Person = (name) => {
    this.name = name;
  };
  
  // Ошибка: стрелочные функции не имеют prototype
  console.log(Person.prototype); // undefined
  
  // Создание экземпляра невозможно
  try {
    const john = new Person("Иван");
  } catch (e) {
    console.log(e); // TypeError: Person is not a constructor
  }`,
      keyPoints: [
        'Стрелочные функции не могут быть использованы с оператором new',
        'У них нет собственного прототипа (свойство prototype)',
        'Они не создают объект this при вызове',
        'Используйте обычные функции или классы для создания конструкторов'
      ]
    },
    {
      id: 'hoisting',
      title: 'Особенности поднятия (hoisting)',
      description: `<p>Функции, объявленные с помощью ключевого слова <code>function</code>, поднимаются вместе с их определением. Стрелочные функции, как и функциональные выражения, поднимаются как переменные — без инициализации.</p>`,
      regularCode: `// Можно вызвать до объявления
  console.log(regularFunc()); // "Привет из обычной функции"
  
  // Объявление обычной функции
  function regularFunc() {
    return "Привет из обычной функции";
  }
  
  // Нельзя вызвать до объявления
  console.log(funcExpr()); // TypeError: funcExpr is not a function
  
  // Функциональное выражение
  var funcExpr = function() {
    return "Привет из функционального выражения";
  };
  
  // После объявления можно вызвать
  console.log(funcExpr()); // "Привет из функционального выражения"`,
      arrowCode: `// Нельзя вызвать до объявления
  console.log(arrowFunc()); // TypeError: arrowFunc is not a function
  
  // Стрелочная функция
  var arrowFunc = () => {
    return "Привет из стрелочной функции";
  };
  
  // После объявления можно вызвать
  console.log(arrowFunc()); // "Привет из стрелочной функции"
  
  // С let и const ещё строже — будет ReferenceError
  // console.log(arrowFunc2()); // ReferenceError
  const arrowFunc2 = () => "Нельзя использовать до объявления";`,
      keyPoints: [
        'Обычные функции поднимаются вместе с их телом и могут быть вызваны до объявления',
        'Стрелочные функции, как и функциональные выражения, поднимаются без инициализации',
        'При использовании var стрелочные функции инициализируются как undefined',
        'При использовании let/const стрелочные функции попадают во временную мёртвую зону (TDZ)'
      ]
    }
  ];
  
  // Состояние компонента
  const currentFeatureIndex = ref(0);
  const currentFeature = computed(() => features[currentFeatureIndex.value]);
  const isDemoRunning = ref(false);
  const demoStep = ref(0);
  
  // Таймеры для анимаций
  let demoTimers = [];
  
  // Функции навигации
  function nextFeature() {
    if (currentFeatureIndex.value < features.length - 1) {
      resetDemo();
      currentFeatureIndex.value++;
    }
  }
  
  function prevFeature() {
    if (currentFeatureIndex.value > 0) {
      resetDemo();
      currentFeatureIndex.value--;
    }
  }
  
  // Очистка таймеров при размонтировании компонента или переключении примера
  function resetDemo() {
    isDemoRunning.value = false;
    demoStep.value = 0;
    demoTimers.forEach(timer => clearTimeout(timer));
    demoTimers = [];
  }
  
  // Запуск демонстрации в зависимости от текущей функции
  function runDemo() {
    resetDemo();
    isDemoRunning.value = true;
    
    const featureId = currentFeature.value.id;
    
    // Разные сценарии для разных особенностей
    if (featureId === 'this') {
      runThisDemo();
    } else if (featureId === 'syntax') {
      runSyntaxDemo();
    } else if (featureId === 'arguments') {
      runArgumentsDemo();
    } else if (featureId === 'constructor') {
      runConstructorDemo();
    } else if (featureId === 'hoisting') {
      runHoistingDemo();
    }
  }
  
  // Демонстрация работы this
  function runThisDemo() {
    const steps = [1, 2, 3, 4];
    
    steps.forEach((step, index) => {
      const timer = setTimeout(() => {
        demoStep.value = step;
        
        // Завершение демонстрации
        if (index === steps.length - 1) {
          setTimeout(() => {
            isDemoRunning.value = false;
          }, 2000);
        }
      }, 1500 * (index + 1));
      
      demoTimers.push(timer);
    });
  }
  
  // Демонстрация синтаксиса
  function runSyntaxDemo() {
    const totalSteps = 5;
    
    for (let i = 1; i <= totalSteps; i++) {
      const timer = setTimeout(() => {
        demoStep.value = i;
        
        if (i === totalSteps) {
          setTimeout(() => {
            isDemoRunning.value = false;
          }, 2000);
        }
      }, 1000 * i);
      
      demoTimers.push(timer);
    }
  }
  
  // Демонстрация arguments
  function runArgumentsDemo() {
    const totalSteps = 5;
    
    for (let i = 1; i <= totalSteps; i++) {
      const timer = setTimeout(() => {
        demoStep.value = i;
        
        if (i === totalSteps) {
          setTimeout(() => {
            isDemoRunning.value = false;
          }, 2000);
        }
      }, 1500 * i);
      
      demoTimers.push(timer);
    }
  }
  
  // Демонстрация конструктора
  function runConstructorDemo() {
    const totalSteps = 3;
    
    for (let i = 1; i <= totalSteps; i++) {
      const timer = setTimeout(() => {
        demoStep.value = i;
        
        if (i === totalSteps) {
          setTimeout(() => {
            isDemoRunning.value = false;
          }, 2000);
        }
      }, 1500 * i);
      
      demoTimers.push(timer);
    }
  }
  
  // Демонстрация hoisting
  function runHoistingDemo() {
    const totalSteps = 8;
    
    for (let i = 1; i <= totalSteps; i++) {
      const timer = setTimeout(() => {
        demoStep.value = i;
        
        if (i === totalSteps) {
          setTimeout(() => {
            isDemoRunning.value = false;
          }, 1500);
        }
      }, 1000 * i);
      
      demoTimers.push(timer);
    }
  }
  
  // Очистка таймеров при размонтировании
  onBeforeUnmount(() => {
    resetDemo();
  });
  
  // Сброс демонстрации при изменении текущей функции
  watch(currentFeatureIndex, () => {
    resetDemo();
  });
  </script>
  
  <style scoped>
  .arrow-functions-demo {
    font-family: 'Roboto', 'Arial', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
    background: #f9f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  
  .subtitle {
    text-align: center;
    color: #7f8c8d;
    margin-bottom: 30px;
  }
  
  /* Вкладки */
  .features-tabs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 30px;
  }
  
  .feature-tab {
    padding: 12px 20px;
    background: #ecf0f1;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .feature-tab:hover {
    background: #e0e6e8;
    transform: translateY(-2px);
  }
  
  .feature-tab.active {
    background: #3498db;
    color: white;
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
  }
  
  /* Содержимое вкладки */
  .feature-content {
    background: white;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
  }
  
  .feature-content h2 {
    color: #2c3e50;
    margin-bottom: 15px;
    font-size: 1.7rem;
    border-bottom: 2px solid #3498db;
    padding-bottom: 8px;
  }
  
  .feature-description {
    margin-bottom: 20px;
    line-height: 1.6;
  }
  
  .feature-description code {
    background: #f0f2f5;
    padding: 2px 5px;
    border-radius: 3px;
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    font-size: 0.9em;
    color: #e74c3c;
  }
  
  /* Сравнение кода */
  .code-comparison {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 15px;
    margin-bottom: 30px;
    align-items: start;
  }
  
  .code-block {
    background: #2d2d2d;
    color: #f8f8f2;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .code-block h3 {
    background: #1a1a1a;
    color: white;
    margin: 0;
    padding: 10px 15px;
    font-size: 1rem;
  }
  
  .regular-function h3 {
    background: #4a6bab;
  }
  
  .arrow-function h3 {
    background: #d35400;
  }
  
  .code-block pre {
    margin: 0;
    padding: 15px;
    overflow-x: auto;
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .comparison-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .arrow-icon {
    font-size: 2rem;
    color: #95a5a6;
  }
  
  /* Демонстрация */
  .demo-area {
    background: #f5f7fa;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    border: 1px solid #e6eaef;
  }
  
  .demo-area h3 {
    margin-top: 0;
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  .demo-controls {
    margin-bottom: 20px;
  }
  
  .run-button {
    background: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .run-button:hover:not(:disabled) {
    background: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .run-button:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }
  
  .demo-visualization {
    min-height: 300px;
    position: relative;
  }
  
  /* Общие стили для визуализаций */
  .this-demo, .syntax-demo, .arguments-demo, .constructor-demo, .hoisting-demo {
    opacity: 0;
    transition: opacity 0.5s ease;
    min-height: 300px;
  }
  
  .this-demo.active, .syntax-demo.active, .arguments-demo.active, .constructor-demo.active, .hoisting-demo.active {
    opacity: 1;
  }
  
  /* Визуализация для this */
  .objects-container {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .object-box {
    background: #fff;
    border: 2px solid #3498db;
    border-radius: 8px;
    overflow: hidden;
    width: 300px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .object-title {
    background: #3498db;
    color: white;
    padding: 8px 15px;
    font-weight: bold;
  }
  
  .object-content {
    padding: 15px;
  }
  
  .property {
    font-family: monospace;
    margin-bottom: 8px;
  }
  
  .functions {
    margin-top: 15px;
  }
  
  .function {
    padding: 8px 12px;
    background: #f0f2f5;
    border-radius: 4px;
    margin-bottom: 8px;
    font-family: monospace;
    transition: all 0.3s ease;
  }
  
  .function.active {
    background: #d6eaf8;
    border-left: 3px solid #3498db;
  }
  
  .function.arrow.active {
    background: #fdebd0;
    border-left: 3px solid #d35400;
  }
  
  .execution-context {
    background: #fff;
    border: 2px solid #9b59b6;
    border-radius: 8px;
    overflow: hidden;
    width: 400px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .context-title {
    background: #9b59b6;
    color: white;
    padding: 8px 15px;
    font-weight: bold;
  }
  
  .this-binding {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px;
  }
  
  .binding-label {
    font-weight: bold;
  }
  
  .binding-value {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 4px;
    font-family: monospace;
    background: #f0f2f5;
    transition: all 0.3s ease;
  }
  
  .binding-value.object {
    background: #d6eaf8;
    color: #2980b9;
  }
  
  .binding-value.global {
    background: #f9e6e7;
    color: #c0392b;
  }
  
  .execution-result {
    padding: 0 15px 15px;
  }
  
  .result {
    padding: 10px;
    border-radius: 4px;
    font-family: monospace;
    margin-top: 10px;
    line-height: 1.5;
    animation: fadeIn 0.5s ease;
  }
  
  .result.success {
    background: #e8f8f5;
    border-left: 3px solid #2ecc71;
  }
  
  .result.error {
    background: #f9e6e7;
    border-left: 3px solid #e74c3c;
  }
  
  /* Визуализация для синтаксиса */
  .syntax-animation {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  .syntax-step {
    width: 80%;
    padding: 15px;
    background: #f0f2f5;
    border-radius: 6px;
    opacity: 0.5;
    transform: translateY(10px);
    transition: all 0.5s ease;
  }
  
  .syntax-step.active {
    opacity: 1;
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .function-declaration, .arrow-declaration, .arrow-short {
    font-family: monospace;
    font-size: 1.1rem;
    color: #2c3e50;
  }
  
  .arrow-declaration {
    color: #d35400;
  }
  
  .arrow-short {
    color: #27ae60;
    font-weight: bold;
  }
  
  .syntax-arrow {
    font-size: 2rem;
    color: #95a5a6;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.5s ease;
  }
  
  .syntax-arrow.active {
    opacity: 1;
    transform: scale(1);
  }
  
  .syntax-note {
    margin-top: 15px;
    background: #fdebd0;
    padding: 10px 15px;
    border-radius: 4px;
    border-left: 4px solid #f39c12;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.5s ease;
  }
  
  .syntax-note.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Визуализация для arguments */
  .execution-simulation {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .function-call {
    padding: 10px 15px;
    background: #dfe6e9;
    border-radius: 6px;
    font-family: monospace;
    margin-bottom: 15px;
    text-align: center;
    font-size: 1.1rem;
  }
  
  .function-execution {
    padding: 15px;
  }
  
  .execution-box {
    border: 2px solid #3498db;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .execution-title {
    background: #3498db;
    color: white;
    padding: 8px 15px;
    font-weight: bold;
  }
  
  .execution-content {
    padding: 15px;
  }
  
  .variable-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 12px;
    margin-bottom: 8px;
    background: #f0f2f5;
    border-radius: 4px;
    font-family: monospace;
    opacity: 0.5;
    transform: translateX(-10px);
    transition: all 0.5s ease;
  }
  
  .variable-row.active {
    opacity: 1;
    transform: translateX(0);
    background: #d6eaf8;
    border-left: 3px solid #3498db;
  }
  
  .variable-row.error {
    background: #f9e6e7;
    border-left: 3px solid #e74c3c;
  }
  
  .variable-name {
    font-weight: bold;
    color: #2c3e50;
  }
  
  .variable-value {
    color: #e74c3c;
  }
  
  /* Визуализация для конструктора */
  .constructor-animation {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .constructor-row {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .code-snippet {
    width: 250px;
    padding: 10px 15px;
    background: #dfe6e9;
    border-radius: 6px;
    font-family: monospace;
  }
  
  .result-box {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    background: #f0f2f5;
    border-radius: 6px;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.5s ease;
  }
  
  .result-box.active {
    opacity: 1;
    transform: translateX(0);
  }
  
  .result-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  .result-icon.success {
    background: #e8f8f5;
    color: #2ecc71;
  }
  
  .result-icon.error {
    background: #f9e6e7;
    color: #e74c3c;
  }
  
  .result-text {
    font-family: monospace;
  }
  
  .constructor-explanation {
    background: #fdebd0;
    padding: 15px;
    border-radius: 6px;
    border-left: 4px solid #f39c12;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.5s ease;
  }
  
  .constructor-explanation.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Визуализация для hoisting */
  .execution-timeline {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .timeline-phase {
    background: #fff;
    border: 2px solid #3498db;
    border-radius: 8px;
    overflow: hidden;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
  }
  
  .timeline-phase.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .phase-title {
    background: #3498db;
    color: white;
    padding: 8px 15px;
    font-weight: bold;
  }
  
  .phase-content {
    padding: 15px;
  }
  
  .hoisting-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 12px;
    margin-bottom: 8px;
    background: #f0f2f5;
    border-radius: 4px;
    font-family: monospace;
    animation: fadeIn 0.5s ease;
  }
  
  .hoisting-item.success {
    background: #e8f8f5;
    border-left: 3px solid #2ecc71;
  }
  
  .hoisting-item.warning {
    background: #fef9e7;
    border-left: 3px solid #f1c40f;
  }
  
  .item-name {
    font-weight: bold;
    color: #2c3e50;
  }
  
  .item-value {
    color: #e74c3c;
  }
  
  .code-line {
    padding: 8px 12px;
    margin-bottom: 8px;
    background: #f0f2f5;
    border-radius: 4px;
    font-family: monospace;
    opacity: 0.5;
    transition: all 0.3s ease;
  }
  
  .code-line.active {
    opacity: 1;
    background: #d6eaf8;
    border-left: 3px solid #3498db;
  }
  
  /* Итоговые моменты */
  .feature-summary {
    background: #f0f7fb;
    border-radius: 8px;
    padding: 20px;
    border-left: 4px solid #3498db;
  }
  
  .summary-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  
  .summary-points {
    margin: 0;
    padding-left: 20px;
  }
  
  .summary-points li {
    margin-bottom: 8px;
    line-height: 1.6;
  }
  
  /* Индикатор прогресса */
  .progress-bar {
    height: 6px;
    background: #ecf0f1;
    border-radius: 3px;
    margin: 20px 0;
    overflow: hidden;
  }
  
  .progress-indicator {
    height: 100%;
    background: #3498db;
    transition: width 0.5s ease;
  }
  
  /* Кнопки навигации */
  .navigation-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .nav-button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .nav-button.prev {
    background: #ecf0f1;
    color: #7f8c8d;
  }
  
  .nav-button.next {
    background: #3498db;
    color: white;
  }
  
  .nav-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .nav-button:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .nav-button.prev:not(:disabled):hover {
    background: #dfe6e9;
  }
  
  .nav-button.next:not(:disabled):hover {
    background: #2980b9;
  }
  
  /* Анимации */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  
  /* Адаптивность */
  @media (max-width: 1024px) {
    .code-comparison {
      grid-template-columns: 1fr;
      gap: 10px;
    }
    
    .comparison-arrow {
      display: none;
    }
    
    .objects-container {
      flex-direction: column;
      align-items: center;
    }
    
    .object-box, .execution-context {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    .features-tabs {
      flex-direction: column;
    }
    
    .constructor-row {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .code-snippet {
      width: 100%;
    }
  }
  
  /* Стили для мобильных устройств */
  @media (max-width: 480px) {
    .title {
      font-size: 1.5rem;
    }
    
    .feature-content {
      padding: 15px;
    }
    
    .feature-content h2 {
      font-size: 1.3rem;
    }
    
    .nav-button {
      padding: 8px 12px;
      font-size: 0.9rem;
    }
  }

</style>