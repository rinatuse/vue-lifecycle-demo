<template>
    <div class="bind-demo">
      <h1>Множественные привязки через метод <code>bind()</code> в JavaScript</h1>
      
      <div class="task-container">
        <h2>Задача:</h2>
        <pre class="code-block">
  let obj1 = {
    name: "User 1",
    getName() {
      console.log(`name is: ${this.name}`);
    },
  };
  
  let obj2 = {
    name: "User 2",
    getName() {
      console.log(`name is: ${this.name}`);
    },
  };
  
  let fn = obj1.getName.bind(obj2).bind(obj1);
  
  fn(); // Что будет выведено?</pre>
      </div>
  
      <div class="explanation">
        <h2>Объяснение решения</h2>
        <p>В данной задаче ключевым моментом является понимание принципа работы метода <code>bind()</code> и как он взаимодействует с контекстом <code>this</code>.</p>
      </div>
  
      <div class="visualization">
        <h3>Визуализация процесса</h3>
        <div class="animation-container">
          <div class="step-container" :class="{ active: step >= 1 }">
            <div class="step-number">1</div>
            <div class="step-content">
              <div class="objects-container">
                <div class="object obj1">
                  <div class="object-title">obj1</div>
                  <div class="object-content">
                    <div class="property">name: "User 1"</div>
                    <div class="method">getName() { ... }</div>
                  </div>
                </div>
                <div class="object obj2">
                  <div class="object-title">obj2</div>
                  <div class="object-content">
                    <div class="property">name: "User 2"</div>
                    <div class="method">getName() { ... }</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div class="step-container" :class="{ active: step >= 2 }">
            <div class="step-number">2</div>
            <div class="step-content">
              <div class="bind-expression">
                <div class="code-line">obj1.getName<span class="highlight">.bind(obj2)</span></div>
                <div class="arrow-down"></div>
                <div class="function-box">
                  <div class="function-title">Новая функция</div>
                  <div class="function-body">
                    <div>this = obj2</div>
                    <div>console.log(`name is: ${this.name}`);</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div class="step-container" :class="{ active: step >= 3 }">
            <div class="step-number">3</div>
            <div class="step-content">
              <div class="bind-expression second-bind">
                <div class="code-line">obj1.getName.bind(obj2)<span class="highlight">.bind(obj1)</span></div>
                <div class="important-note">Важно: повторный bind() не изменяет уже привязанный контекст!</div>
                <div class="arrow-down"></div>
                <div class="function-box">
                  <div class="function-title">Новая функция (fn)</div>
                  <div class="function-body">
                    <div>this = obj2 <span class="unchanged">(осталось неизменным!)</span></div>
                    <div>console.log(`name is: ${this.name}`);</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div class="step-container" :class="{ active: step >= 4 }">
            <div class="step-number">4</div>
            <div class="step-content">
              <div class="function-call">
                <div class="code-line">fn();</div>
                <div class="result-box">
                  <div class="result-title">Результат выполнения</div>
                  <div class="result-content">name is: User 2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="controls">
          <button @click="prevStep" :disabled="step <= 1">Назад</button>
          <button @click="nextStep" :disabled="step >= 4">Далее</button>
          <button @click="resetDemo">Сначала</button>
        </div>
      </div>
  
      <div class="detailed-explanation">
        <h2>Детальное объяснение механизма <code>bind()</code></h2>
        
        <h3>Как работает метод <code>bind()</code>?</h3>
        <p>Метод <code>bind()</code> создаёт новую функцию, которая при вызове устанавливает в качестве контекста <code>this</code> предоставленное значение. У этого метода есть несколько важных особенностей:</p>
        
        <ol>
          <li><strong>Создание новой функции</strong>: <code>bind()</code> не вызывает функцию, а возвращает новую функцию с привязанным контекстом.</li>
          <li><strong>Неизменность привязки</strong>: Однажды привязанный контекст <code>this</code> не может быть изменён повторными вызовами <code>bind()</code>.</li>
          <li><strong>Частичное применение аргументов</strong>: <code>bind()</code> позволяет предустановить аргументы для будущего вызова функции.</li>
        </ol>
  
        <div class="important-box">
          <h4>Ключевой момент в решении задачи:</h4>
          <p>Повторные вызовы <code>bind()</code> не меняют уже установленный контекст. Если функция уже была привязана к какому-то объекту, последующие привязки не имеют эффекта на контекст <code>this</code>.</p>
        </div>
  
        <h3>Алгоритм решения подобных задач:</h3>
        <ol>
          <li>Определите все объекты и их свойства/методы.</li>
          <li>Проследите цепочку вызовов <code>bind()</code> с учётом порядка привязки.</li>
          <li>Помните, что первый вызов <code>bind()</code> устанавливает контекст <code>this</code>, а последующие — не изменяют его.</li>
          <li>Определите, к какому объекту будет обращаться <code>this</code> внутри функции при её вызове.</li>
        </ol>
  
        <h3>Подводные камни при работе с <code>bind()</code>:</h3>
        <ul>
          <li><strong>Игнорирование повторных привязок</strong>: Как было показано, повторные вызовы <code>bind()</code> не перезаписывают контекст.</li>
          <li><strong>Потеря контекста</strong>: Когда методы объекта передаются как обработчики событий без привязки, они теряют связь с исходным объектом.</li>
          <li><strong>Избыточное использование</strong>: Иногда вместо <code>bind()</code> эффективнее использовать стрелочные функции, которые сохраняют лексический контекст.</li>
        </ul>
  
        <h3>Практическое применение этих знаний:</h3>
        <ul>
          <li><strong>Обработчики событий</strong>: Привязка контекста для обработчиков событий, чтобы они имели доступ к нужным данным.</li>
          <li><strong>Частичное применение</strong>: Создание специализированных функций с предустановленными параметрами.</li>
          <li><strong>Заимствование методов</strong>: Использование методов одного объекта в контексте другого объекта.</li>
          <li><strong>Асинхронное программирование</strong>: Сохранение контекста в колбэках и промисах.</li>
        </ul>
  
        <h3>Аналогичные примеры для закрепления:</h3>
        <div class="example">
          <h4>Пример 1: Частичное применение с bind</h4>
          <pre class="code-block">
  function multiply(a, b) {
    return a * b;
  }
  
  // Создаём функцию, умножающую на 2
  const double = multiply.bind(null, 2);
  console.log(double(5)); // Выведет 10</pre>
        </div>
  
        <div class="example">
          <h4>Пример 2: Сохранение контекста в таймере</h4>
          <pre class="code-block">
  const user = {
    name: "Алексей",
    sayHello() {
      console.log(`Привет, я ${this.name}`);
    }
  };
  
  // Без bind потеряли бы контекст
  setTimeout(user.sayHello.bind(user), 1000); // Через 1 сек выведет "Привет, я Алексей"</pre>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const step = ref(1);
  
  function nextStep() {
    if (step.value < 4) {
      step.value++;
    }
  }
  
  function prevStep() {
    if (step.value > 1) {
      step.value--;
    }
  }
  
  function resetDemo() {
    step.value = 1;
  }
  </script>
  
  <style scoped>
  .bind-demo {
    font-family: Arial, sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    color: #000000;
    line-height: 1.6;
  }
  
  h1, h2, h3, h4 {
    color: #000000;
  }
  
  h1 {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-top: 2rem;
    border-bottom: 2px solid #3498db;
    padding-bottom: 0.5rem;
  }
  
  h3 {
    font-size: 1.3rem;
    margin-top: 1.5rem;
  }
  
  h4 {
    font-size: 1.1rem;
    margin-top: 1rem;
  }
  
  code {
    background-color: #f4f4f4;
    padding: 2px 5px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
  }
  
  .task-container {
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  .code-block {
    background-color: #f4f4f4;
    padding: 15px;
    border-radius: 5px;
    font-family: 'Courier New', monospace;
    overflow-x: auto;
    white-space: pre;
    line-height: 1.4;
    margin: 1rem 0;
  }
  
  .explanation {
    margin-bottom: 2rem;
  }
  
  .visualization {
    background-color: #f0f7ff;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  .animation-container {
    margin: 2rem 0;
  }
  
  .step-container {
    display: flex;
    margin-bottom: 1.5rem;
    opacity: 0.3;
    transition: opacity 0.5s;
  }
  
  .step-container.active {
    opacity: 1;
  }
  
  .step-number {
    background-color: #3498db;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 15px;
    flex-shrink: 0;
  }
  
  .step-content {
    flex-grow: 1;
  }
  
  .objects-container {
    display: flex;
    justify-content: space-around;
    gap: 20px;
    margin-bottom: 1rem;
  }
  
  .object {
    width: 200px;
    border: 2px solid;
    border-radius: 6px;
    overflow: hidden;
  }
  
  .obj1 {
    border-color: #e74c3c;
  }
  
  .obj2 {
    border-color: #2ecc71;
  }
  
  .object-title {
    padding: 0.5rem;
    font-weight: bold;
    text-align: center;
    color: white;
  }
  
  .obj1 .object-title {
    background-color: #e74c3c;
  }
  
  .obj2 .object-title {
    background-color: #2ecc71;
  }
  
  .object-content {
    padding: 0.8rem;
  }
  
  .property, .method {
    margin-bottom: 0.5rem;
    font-family: 'Courier New', monospace;
  }
  
  .bind-expression {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .code-line {
    font-family: 'Courier New', monospace;
    background-color: #f4f4f4;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  
  .highlight {
    background-color: #fff176;
    padding: 2px;
    border-radius: 3px;
  }
  
  .arrow-down {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #3498db;
    margin-bottom: 1rem;
  }
  
  .function-box {
    width: 300px;
    border: 2px solid #3498db;
    border-radius: 6px;
    overflow: hidden;
  }
  
  .function-title {
    background-color: #3498db;
    color: white;
    padding: 0.5rem;
    text-align: center;
    font-weight: bold;
  }
  
  .function-body {
    padding: 1rem;
    font-family: 'Courier New', monospace;
  }
  
  .second-bind .function-box {
    border-color: #9b59b6;
  }
  
  .second-bind .function-title {
    background-color: #9b59b6;
  }
  
  .unchanged {
    color: #e74c3c;
    font-weight: bold;
    font-style: italic;
  }
  
  .important-note {
    color: #e74c3c;
    font-weight: bold;
    text-align: center;
    margin: 0.5rem 0;
    padding: 0.5rem;
    background-color: #ffeceb;
    border-radius: 4px;
  }
  
  .function-call {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .result-box {
    width: 300px;
    border: 2px solid #f39c12;
    border-radius: 6px;
    overflow: hidden;
    margin-top: 1rem;
  }
  
  .result-title {
    background-color: #f39c12;
    color: white;
    padding: 0.5rem;
    text-align: center;
    font-weight: bold;
  }
  
  .result-content {
    padding: 1rem;
    text-align: center;
    font-family: 'Courier New', monospace;
    font-weight: bold;
  }
  
  .controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .controls button {
    padding: 0.5rem 1rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .controls button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .controls button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .important-box {
    background-color: #ffeceb;
    border-left: 4px solid #e74c3c;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 4px;
  }
  
  .example {
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 6px;
    margin: 1rem 0;
  }
  
  .example h4 {
    margin-top: 0;
  }
  
  @media (max-width: 768px) {
    .objects-container {
      flex-direction: column;
      align-items: center;
    }
    
    .function-box, .result-box {
      width: 100%;
    }
    
    .step-container {
      flex-direction: column;
    }
    
    .step-number {
      margin-bottom: 1rem;
    }
  }
  </style>