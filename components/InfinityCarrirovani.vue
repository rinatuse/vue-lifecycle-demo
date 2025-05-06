<template>
    <div class="curry-demo">
      <h1>Бесконечное каррирование в JavaScript</h1>
      
      <div class="section">
        <h2>Что такое каррирование?</h2>
        <p>Каррирование (currying) - это техника в функциональном программировании, которая преобразует функцию с несколькими аргументами в последовательность функций, каждая из которых принимает по одному аргументу.</p>
        <p>Бесконечное каррирование позволяет вызывать функцию неограниченное число раз, накапливая аргументы, пока не будет вызвана завершающая операция.</p>
      </div>
      
      <div class="section">
        <h2>Задача: реализовать функцию sum</h2>
        <div class="code-block">
          <pre>
  const sum = () => {};
  
  sum(1)(); // 1
  sum(1)(2)(3)(); // 6
          </pre>
        </div>
        <p>Нам нужно реализовать функцию <code>sum</code>, которая:</p>
        <ul>
          <li>Принимает число и возвращает функцию</li>
          <li>Каждый последующий вызов добавляет число к сумме и возвращает функцию</li>
          <li>Вызов без аргументов возвращает накопленную сумму</li>
        </ul>
      </div>
      
      <div class="section">
        <h2>Решение шаг за шагом</h2>
        <div class="solution-steps">
          <div 
            v-for="(step, index) in solutionSteps" 
            :key="index"
            class="step"
            :class="{ active: currentStep === index }"
          >
            <div class="step-header" @click="currentStep = index">
              <div class="step-number">{{ index + 1 }}</div>
              <h3>{{ step.title }}</h3>
            </div>
            <div class="step-content" v-if="currentStep === index">
              <p>{{ step.description }}</p>
              <div class="code-block">
                <pre>{{ step.code }}</pre>
              </div>
              <p v-if="step.explanation">{{ step.explanation }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2>Анимация работы алгоритма</h2>
        <div class="animation-container">
          <div class="animation-controls">
            <button @click="startAnimation" :disabled="isAnimating">Запустить анимацию</button>
            <select v-model="selectedExample">
              <option v-for="(example, index) in examples" :key="index" :value="index">
                {{ example.expression }}
              </option>
            </select>
          </div>
          
          <div class="animation-stage">
            <div class="animation-function-calls">
              <div 
                v-for="(call, index) in animationCalls" 
                :key="index"
                class="function-call"
                :class="{ 
                  active: animationStep === index,
                  completed: animationStep > index
                }"
              >
                <div class="call-expression">{{ call.expression }}</div>
                <div class="call-return">{{ call.returnValue }}</div>
                <div class="call-arrow" v-if="index < animationCalls.length - 1"></div>
              </div>
            </div>
            
            <div class="animation-explanation">
              <p v-if="animationStep < animationCalls.length">
                {{ animationCalls[animationStep].explanation }}
              </p>
              <p v-else>
                Анимация завершена! Посмотрите, как каждый вызов возвращает новую функцию, 
                которая запоминает предыдущую сумму, а последний вызов без аргументов возвращает результат.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2>Подводные камни</h2>
        <div class="pitfalls">
          <div class="pitfall" v-for="(pitfall, index) in pitfalls" :key="index">
            <h3>{{ pitfall.title }}</h3>
            <p>{{ pitfall.description }}</p>
            <div class="code-example">
              <div class="code-block">
                <pre>{{ pitfall.code }}</pre>
              </div>
              <p>{{ pitfall.solution }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2>Применение в реальной жизни</h2>
        <div class="use-cases">
          <div class="use-case" v-for="(useCase, index) in useCases" :key="index">
            <h3>{{ useCase.title }}</h3>
            <p>{{ useCase.description }}</p>
            <div class="code-block">
              <pre>{{ useCase.code }}</pre>
            </div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2>Финальное решение</h2>
        <div class="final-solution">
          <div class="code-block">
            <pre>{{ finalSolution }}</pre>
          </div>
          <div class="test-cases">
            <h3>Тестовые примеры:</h3>
            <div class="test-case" v-for="(test, index) in testCases" :key="index">
              <div class="test-expression">{{ test.expression }}</div>
              <div class="test-result">{{ test.result }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentStep: 0,
        isAnimating: false,
        animationStep: 0,
        selectedExample: 0,
        animationTimer: null,
        
        solutionSteps: [
          {
            title: "Понимание требований",
            description: "Прежде чем начать кодировать, давайте разберемся, что именно должна делать наша функция sum.",
            code: `sum(1)(); // 1
  sum(1)(2)(3)(); // 6`,
            explanation: "Функция sum должна принимать число, возвращать новую функцию, которая также принимает число и так далее. Когда функция вызывается без аргументов, она должна вернуть накопленную сумму всех предыдущих аргументов."
          },
          {
            title: "Создание базовой структуры",
            description: "Начнем с создания функции, которая возвращает другую функцию.",
            code: `const sum = function(a) {
    // Возвращаем новую функцию
    return function(b) {
      // Здесь будет логика
    };
  };`,
            explanation: "Функция sum принимает первый аргумент a и возвращает новую функцию, которая принимает следующий аргумент b. Это основа каррирования."
          },
          {
            title: "Обработка пустого вызова",
            description: "Когда функция вызывается без аргументов, она должна вернуть накопленную сумму.",
            code: `const sum = function(a) {
    return function(b) {
      // Если вызов без аргументов, возвращаем сумму
      if (b === undefined) {
        return a;
      }
      // Иначе продолжаем накапливать
    };
  };`,
            explanation: "Если второй аргумент не передан (undefined), это означает, что мы хотим завершить накопление и получить результат. В этом случае возвращаем текущую сумму a."
          },
          {
            title: "Добавление рекурсии",
            description: "Чтобы обеспечить бесконечное каррирование, используем рекурсию.",
            code: `const sum = function(a) {
    return function(b) {
      if (b === undefined) {
        return a;
      }
      // Возвращаем новую функцию sum с обновленной суммой
      return sum(a + b);
    };
  };`,
            explanation: "Если аргумент есть, создаем новый вызов sum с обновленной суммой (a + b). Это позволяет продолжить цепочку вызовов и накапливать сумму."
          },
          {
            title: "Обработка отсутствия первого аргумента",
            description: "Что если мы вызовем sum() без аргументов? Давайте обработаем этот случай.",
            code: `const sum = function(a = 0) {
    return function(b) {
      if (b === undefined) {
        return a;
      }
      return sum(a + b);
    };
  };`,
            explanation: "Мы добавили значение по умолчанию для первого аргумента (a = 0). Теперь, если sum() вызывается без аргументов, a будет равно 0, и дальнейшие вызовы будут работать корректно."
          },
          {
            title: "Финальное решение",
            description: "Давайте посмотрим на окончательное решение задачи.",
            code: `const sum = function(a = 0) {
    return function(b) {
      // Если аргумент не передан, возвращаем накопленную сумму
      if (b === undefined) {
        return a;
      }
      // Иначе создаем новую функцию с обновленной суммой
      return sum(a + b);
    };
  };`,
            explanation: "Эта реализация полностью соответствует требованиям. Она принимает произвольное количество аргументов через последовательные вызовы и возвращает сумму, когда вызывается без аргументов."
          }
        ],
        
        examples: [
          {
            expression: "sum(1)()",
            calls: [
              {
                expression: "sum(1)",
                returnValue: "function(b)",
                explanation: "Вызываем sum(1). Создается функция, которая запоминает a = 1 и ожидает следующий аргумент."
              },
              {
                expression: "sum(1)()",
                returnValue: "1",
                explanation: "Вызываем результат sum(1) без аргументов. Поскольку b === undefined, возвращается накопленная сумма a = 1."
              }
            ]
          },
          {
            expression: "sum(1)(2)(3)()",
            calls: [
              {
                expression: "sum(1)",
                returnValue: "function(b)",
                explanation: "Вызываем sum(1). Функция запоминает a = 1 и возвращает новую функцию."
              },
              {
                expression: "sum(1)(2)",
                returnValue: "function(b)",
                explanation: "Вызываем результат sum(1) с аргументом 2. Создается новый вызов sum(1 + 2) = sum(3)."
              },
              {
                expression: "sum(1)(2)(3)",
                returnValue: "function(b)",
                explanation: "Вызываем результат sum(3) с аргументом 3. Создается новый вызов sum(3 + 3) = sum(6)."
              },
              {
                expression: "sum(1)(2)(3)()",
                returnValue: "6",
                explanation: "Вызываем результат без аргументов. Поскольку b === undefined, возвращается накопленная сумма a = 6."
              }
            ]
          }
        ],
        
        pitfalls: [
          {
            title: "Потеря контекста this",
            description: "Если вы используете каррирование с методами объектов, можете столкнуться с проблемой потери контекста this.",
            code: `const obj = {
    value: 10,
    sumWithValue: function(a) {
      return function(b) {
        // this здесь не ссылается на obj!
        if (b === undefined) {
          return a + this.value;
        }
        return this.sumWithValue(a + b);
      };
    }
  };
  
  // Ошибка: this.value - undefined
  obj.sumWithValue(5)();`,
            solution: "Решение: используйте стрелочные функции, которые не имеют своего this, или явно привязывайте контекст с помощью bind()."
          },
          {
            title: "Утечка памяти при длинных цепочках",
            description: "При создании длинных цепочек вызовов может возникнуть проблема с памятью из-за накопления замыканий.",
            code: `// Очень длинная цепочка вызовов
  let result = sum(1);
  for (let i = 2; i <= 10000; i++) {
    result = result(i);
  }
  result(); // Может вызвать переполнение стека`,
            solution: "Решение: для очень длинных цепочек лучше использовать итеративный подход или мемоизацию, чтобы избежать глубокой рекурсии."
          },
          {
            title: "Неочевидное поведение при приведении типов",
            description: "JavaScript может неявно приводить типы, что приведет к неожиданным результатам при каррировании.",
            code: `// Что вернут эти вызовы?
  sum('1')(2)();
  sum(1)(true)();
  sum(null)(undefined)();`,
            solution: "Решение: всегда проверяйте типы аргументов или явно преобразуйте их к нужному типу внутри функции."
          }
        ],
        
        useCases: [
          {
            title: "Конфигурирование функций",
            description: "Каррирование полезно для создания конфигурируемых функций, где часть параметров фиксируется заранее.",
            code: `// Функция для форматирования цены
  const formatPrice = (currency) => (amount) => {
    return \`\${amount.toFixed(2)} \${currency}\`;
  };
  
  // Создаем специализированные форматтеры
  const formatUSD = formatPrice('USD');
  const formatEUR = formatPrice('EUR');
  
  formatUSD(9.99); // "9.99 USD"
  formatEUR(9.99); // "9.99 EUR"`
          },
          {
            title: "Композиция функций",
            description: "Каррирование упрощает композицию функций, позволяя создавать новые функции из существующих.",
            code: `// Простые функции для обработки данных
  const add10 = (x) => x + 10;
  const multiply2 = (x) => x * 2;
  const subtract5 = (x) => x - 5;
  
  // Функция композиции
  const compose = (f, g) => (x) => f(g(x));
  
  // Создаем новую функцию из композиции существующих
  const transformValue = compose(
    subtract5, 
    compose(multiply2, add10)
  );
  
  transformValue(5); // ((5 + 10) * 2) - 5 = 25`
          },
          {
            title: "Частичное применение в обработчиках событий",
            description: "Каррирование позволяет создавать гибкие обработчики событий с предустановленными параметрами.",
            code: `// Обработчик события с дополнительным параметром
  const handleClick = (id) => (event) => {
    event.preventDefault();
    console.log(\`Кнопка \${id} была нажата\`);
    // Дополнительная логика...
  };
  
  // Использование в разных элементах
  document.getElementById('btn1').addEventListener('click', handleClick('button-1'));
  document.getElementById('btn2').addEventListener('click', handleClick('button-2'));`
          }
        ],
        
        finalSolution: `const sum = function(a = 0) {
    return function(b) {
      // Если аргумент не передан, возвращаем накопленную сумму
      if (b === undefined) {
        return a;
      }
      // Иначе создаем новую функцию с обновленной суммой
      return sum(a + b);
    };
  };`,
        
        testCases: [
          {
            expression: "sum(1)()",
            result: "1"
          },
          {
            expression: "sum(1)(2)(3)()",
            result: "6"
          },
          {
            expression: "sum()()",
            result: "0"
          },
          {
            expression: "sum(5)(-3)(10)()",
            result: "12"
          }
        ]
      };
    },
    
    computed: {
      animationCalls() {
        return this.examples[this.selectedExample].calls;
      }
    },
    
    methods: {
      startAnimation() {
        this.isAnimating = true;
        this.animationStep = 0;
        
        const animate = () => {
          if (this.animationStep < this.animationCalls.length) {
            this.animationTimer = setTimeout(() => {
              this.animationStep++;
              animate();
            }, 2000);
          } else {
            this.isAnimating = false;
          }
        };
        
        animate();
      }
    },
    
    beforeUnmount() {
      if (this.animationTimer) {
        clearTimeout(this.animationTimer);
      }
    }
  };
  </script>
  
  <style scoped>
  .curry-demo {
    font-family: Arial, sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    color: #000000;
  }
  
  h1, h2, h3 {
    color: #000000;
  }
  
  h1 {
    font-size: 2.4rem;
    text-align: center;
    margin-bottom: 30px;
  }
  
  h2 {
    font-size: 1.8rem;
    margin-top: 40px;
    margin-bottom: 20px;
    border-bottom: 2px solid #444;
    padding-bottom: 10px;
  }
  
  .section {
    margin-bottom: 40px;
  }
  
  p, li {
    line-height: 1.6;
    font-size: 1.1rem;
  }
  
  .code-block {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    margin: 15px 0;
    overflow-x: auto;
  }
  
  .code-block pre {
    margin: 0;
    font-family: 'Courier New', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #000000;
  }
  
  /* Стили для шагов решения */
  .solution-steps {
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 20px;
  }
  
  .step {
    border-bottom: 1px solid #ddd;
  }
  
  .step:last-child {
    border-bottom: none;
  }
  
  .step-header {
    display: flex;
    align-items: center;
    padding: 15px;
    cursor: pointer;
    background-color: #f9f9f9;
    transition: background-color 0.3s;
  }
  
  .step-header:hover {
    background-color: #f0f0f0;
  }
  
  .step.active .step-header {
    background-color: #e0e0e0;
    font-weight: bold;
  }
  
  .step-number {
    width: 30px;
    height: 30px;
    background-color: #444;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    font-weight: bold;
  }
  
  .step-content {
    padding: 20px;
    background-color: #ffffff;
    animation: fadeIn 0.5s;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Стили для анимации */
  .animation-container {
    margin-top: 30px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  .animation-controls {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .animation-controls button {
    padding: 10px 15px;
    background-color: #444;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .animation-controls button:hover:not(:disabled) {
    background-color: #333;
  }
  
  .animation-controls button:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
  
  .animation-controls select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  
  .animation-stage {
    min-height: 300px;
    position: relative;
  }
  
  .animation-function-calls {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 30px;
  }
  
  .function-call {
    background-color: #ffffff;
    border: 2px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    width: 160px;
    text-align: center;
    position: relative;
    opacity: 0.7;
    transition: all 0.3s;
  }
  
  .function-call.active {
    border-color: #f44336;
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    opacity: 1;
  }
  
  .function-call.completed {
    border-color: #4caf50;
    opacity: 1;
  }
  
  .call-expression {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .call-return {
    color: #f44336;
    font-family: 'Courier New', monospace;
  }
  
  .call-arrow {
    position: absolute;
    top: 50%;
    right: -20px;
    width: 20px;
    height: 2px;
    background-color: #444;
    transform: translateY(-50%);
  }
  
  .call-arrow::after {
    content: '';
    position: absolute;
    right: 0;
    top: -4px;
    width: 0;
    height: 0;
    border-left: 8px solid #444;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }
  
  .animation-explanation {
    margin-top: 30px;
    padding: 15px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-height: 80px;
  }
  
  /* Стили для подводных камней */
  .pitfalls {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .pitfall {
    background-color: #fff8e1;
    border: 1px solid #ffecb3;
    border-radius: 4px;
    padding: 15px;
  }
  
  .pitfall h3 {
    color: #ff8f00;
    margin-top: 0;
  }
  
  .code-example {
    margin-top: 15px;
  }
  
  /* Стили для применения в реальной жизни */
  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .use-case {
    background-color: #e8f5e9;
    border: 1px solid #c8e6c9;
    border-radius: 4px;
    padding: 15px;
  }
  
  .use-case h3 {
    color: #2e7d32;
    margin-top: 0;
  }
  
  /* Стили для финального решения */
  .final-solution {
    background-color: #e3f2fd;
    border: 1px solid #bbdefb;
    border-radius: 4px;
    padding: 20px;
  }
  
  .test-cases {
    margin-top: 20px;
  }
  
  .test-case {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .test-case:last-child {
    border-bottom: none;
  }
  
  .test-expression {
    font-family: 'Courier New', monospace;
    font-weight: bold;
  }
  
  .test-result {
    font-family: 'Courier New', monospace;
    color: #4caf50;
  }
  
  /* Адаптивный дизайн */
  @media (max-width: 768px) {
    .curry-demo {
      padding: 15px;
    }
    
    h1 {
      font-size: 2rem;
    }
    
    .pitfalls, .use-cases {
      grid-template-columns: 1fr;
    }
    
    .animation-function-calls {
      flex-direction: column;
      align-items: center;
    }
    
    .function-call {
      width: 80%;
    }
    
    .call-arrow {
      right: 50%;
      bottom: -20px;
      top: auto;
      width: 2px;
      height: 20px;
      transform: translateX(50%);
    }
    
    .call-arrow::after {
      top: auto;
      right: -4px;
      bottom: 0;
      transform: rotate(90deg);
    }
  }
  </style>