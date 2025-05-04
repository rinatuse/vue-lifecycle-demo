<template>
    <div class="reference-vs-value">
      <h1>Объекты в JavaScript: передача по ссылке</h1>
      
      <div class="original-code">
        <h2>Исходный код</h2>
        <pre class="code-block">
  const person = { name: "Vasya", age: 22 };
  const position = { title: "Software Engineer" };
  
  person.position = position;
  person.position.salary = 120;
  
  console.log(person.position);
  console.log(position);
        </pre>
      </div>
      
      <div class="task-explanation">
        <h2>Объяснение</h2>
        <p>Этот код демонстрирует, как в JavaScript объекты передаются <strong>по ссылке</strong>, а не по значению. Давайте разберемся, что происходит:</p>
      </div>
      
      <div class="visualization-container">
        <h2>Визуализация процесса</h2>
        
        <div class="memory-model">
          <div class="step" :class="{ active: step >= 1 }">
            <h3>Шаг 1: Создание объектов</h3>
            <div class="objects-container">
              <div class="object-box">
                <div class="object-title">person</div>
                <div class="object-content">
                  <div class="property">name: "Vasya"</div>
                  <div class="property">age: 22</div>
                </div>
              </div>
              
              <div class="object-box">
                <div class="object-title">position</div>
                <div class="object-content">
                  <div class="property">title: "Software Engineer"</div>
                </div>
              </div>
            </div>
            <p class="step-explanation">Создаются два независимых объекта в памяти. У каждого свой набор свойств.</p>
          </div>
          
          <div class="step" :class="{ active: step >= 2 }">
            <h3>Шаг 2: Присваивание position как свойства person</h3>
            <div class="objects-container with-arrow">
              <div class="object-box">
                <div class="object-title">person</div>
                <div class="object-content">
                  <div class="property">name: "Vasya"</div>
                  <div class="property">age: 22</div>
                  <div class="property reference">position: <span class="arrow">→</span></div>
                </div>
              </div>
              
              <div class="reference-arrow" :class="{ animated: step === 2 }"></div>
              
              <div class="object-box">
                <div class="object-title">position</div>
                <div class="object-content">
                  <div class="property">title: "Software Engineer"</div>
                </div>
              </div>
            </div>
            <p class="step-explanation">
              Выполняется <code>person.position = position</code>. Важно понимать, что объект не копируется! 
              Создается только <strong>ссылка</strong> на существующий объект position.
            </p>
          </div>
          
          <div class="step" :class="{ active: step >= 3 }">
            <h3>Шаг 3: Изменение свойства через ссылку</h3>
            <div class="objects-container with-arrow">
              <div class="object-box">
                <div class="object-title">person</div>
                <div class="object-content">
                  <div class="property">name: "Vasya"</div>
                  <div class="property">age: 22</div>
                  <div class="property reference">position: <span class="arrow">→</span></div>
                </div>
              </div>
              
              <div class="reference-arrow"></div>
              
              <div class="object-box highlight-change">
                <div class="object-title">position</div>
                <div class="object-content">
                  <div class="property">title: "Software Engineer"</div>
                  <div class="property new-property" :class="{ appear: step === 3 }">salary: 120</div>
                </div>
              </div>
            </div>
            <p class="step-explanation">
              Выполняется <code>person.position.salary = 120</code>. Мы добавляем свойство <code>salary</code> 
              к объекту, на который указывает ссылка <code>person.position</code>. Но поскольку 
              <code>person.position</code> и <code>position</code> указывают на один и тот же объект, 
              изменение отражается в обоих случаях.
            </p>
          </div>
          
          <div class="step" :class="{ active: step >= 4 }">
            <h3>Шаг 4: Результат в консоли</h3>
            <div class="console-output">
              <div class="console-line">
                <span class="console-prompt">console.log(person.position);</span>
                <span class="console-result">{ title: "Software Engineer", salary: 120 }</span>
              </div>
              <div class="console-line">
                <span class="console-prompt">console.log(position);</span>
                <span class="console-result">{ title: "Software Engineer", salary: 120 }</span>
              </div>
            </div>
            <p class="step-explanation">
              Обратите внимание: вывод одинаковый! Это потому, что <code>person.position</code> и <code>position</code> 
              — это одно и то же, ссылки на один объект в памяти.
            </p>
          </div>
        </div>
        
        <div class="controls">
          <button @click="prevStep" :disabled="step <= 1">Назад</button>
          <span class="step-indicator">{{ step }} из 4</span>
          <button @click="nextStep" :disabled="step >= 4">Вперед</button>
        </div>
      </div>
      
      <div class="potential-problems">
        <h2>Подводные камни</h2>
        <ul>
          <li>
            <strong>Неожиданные мутации:</strong> Изменение объекта через одну ссылку изменяет его для всех ссылок.
            Это может приводить к трудноотслеживаемым багам в больших приложениях.
          </li>
          <li>
            <strong>Проблемы с отладкой:</strong> Когда объект изменяется в неожиданном месте, может быть трудно 
            найти источник изменения.
          </li>
          <li>
            <strong>Проблемы с кешированием и сравнением:</strong> Если вы ожидаете получить новый объект,
            а получаете измененную ссылку на существующий, это может нарушить логику сравнения.
          </li>
        </ul>
      </div>
      
      <div class="solutions">
        <h2>Как решать такие проблемы</h2>
        
        <div class="solution-method">
          <h3>1. Поверхностное копирование (Shallow Copy)</h3>
          <pre class="code-block">
  // Используем spread оператор
  const positionCopy = { ...position };
  
  // Или Object.assign
  const anotherCopy = Object.assign({}, position);
  
  // Теперь изменение копии не затронет оригинал
  positionCopy.salary = 150;
  console.log(position.salary); // 120, а не 150
          </pre>
          <p class="solution-explanation">
            Этот метод создает новый объект и копирует свойства первого уровня. 
            Подходит для простых объектов без вложенных объектов.
          </p>
        </div>
        
        <div class="solution-method">
          <h3>2. Глубокое копирование (Deep Copy)</h3>
          <pre class="code-block">
  // Простой способ через JSON (с ограничениями)
  const deepCopy = JSON.parse(JSON.stringify(position));
  
  // Или использование библиотек (lodash)
  // const deepCopy = _.cloneDeep(position);
  
  // Современный способ (только в новых браузерах)
  // const deepCopy = structuredClone(position);
          </pre>
          <p class="solution-explanation">
            Глубокое копирование создает полную копию объекта, включая все вложенные объекты.
            Но у каждого метода есть свои ограничения (например, JSON не поддерживает функции, даты преобразуются в строки).
          </p>
        </div>
        
        <div class="solution-method">
          <h3>3. Иммутабельный подход</h3>
          <pre class="code-block">
  // Вместо изменения объекта, создаем новый с нужными изменениями
  const updatedPosition = { 
    ...position, 
    salary: 120 
  };
  
  // person получает новый объект, а не ссылку на прежний
  const updatedPerson = {
    ...person,
    position: updatedPosition
  };
          </pre>
          <p class="solution-explanation">
            В функциональном программировании предпочитают не мутировать объекты, 
            а создавать новые с нужными изменениями. Это делает код более предсказуемым.
          </p>
        </div>
      </div>
      
      <div class="real-life-applications">
        <h2>Применение в реальной разработке</h2>
        
        <div class="application">
          <h3>1. Управление состоянием в приложениях</h3>
          <p>
            Понимание передачи по ссылке критически важно при работе с состоянием в React, Vue 
            или других фреймворках. Неправильное управление ссылками может привести к:
          </p>
          <ul>
            <li>Компоненты не обновляются, когда изменяются данные</li>
            <li>Неконтролируемые мутации состояния приложения</li>
            <li>Проблемы с оптимизацией производительности</li>
          </ul>
        </div>
        
        <div class="application">
          <h3>2. Кеширование и мемоизация</h3>
          <p>
            Когда вы используете кеширование или мемоизацию функций, понимание передачи объектов по ссылке
            помогает избежать неожиданного поведения и ошибок. Например, Vue.js использует анализ зависимостей
            для реактивности, который сильно зависит от ссылок на объекты.
          </p>
        </div>
        
        <div class="application">
          <h3>3. Работа с API и данными</h3>
          <p>
            При получении данных с сервера и их обработке, важно понимать когда нужно копировать объекты,
            а когда можно использовать ссылки:
          </p>
          <ul>
            <li>Cохранение исходных данных для возможности отката изменений</li>
            <li>Оптимизация передачи больших объектов между функциями</li>
            <li>Обработка нормализованных данных (например, в Redux)</li>
          </ul>
        </div>
      </div>
      
      <div class="algorithms-techniques">
        <h2>Алгоритмы и техники для решения</h2>
        
        <div class="algorithm">
          <h3>Защитное копирование (Defensive Copying)</h3>
          <p>
            Создавайте копии объектов в функциях, которые могут их изменять, чтобы не затронуть оригинал.
            Это особенно важно в публичных API.
          </p>
          <pre class="code-block">
  function processUserData(user) {
    // Создаем копию, чтобы не менять оригинал
    const userCopy = { ...user };
    userCopy.processed = true;
    return userCopy;
  }
          </pre>
        </div>
        
        <div class="algorithm">
          <h3>Иммутабельные обновления (Immutable Updates)</h3>
          <p>
            Всегда создавайте новые объекты при обновлении, вместо мутации существующих.
            Это помогает отслеживать изменения и избежать непредсказуемого состояния.
          </p>
          <pre class="code-block">
  // Плохо: мутация
  user.name = "New Name";
  
  // Хорошо: новый объект
  const updatedUser = { ...user, name: "New Name" };
          </pre>
        </div>
        
        <div class="algorithm">
          <h3>Техника глубокого слияния (Deep Merge)</h3>
          <p>
            Для комбинирования объектов с сохранением вложенных структур используйте 
            рекурсивное слияние или специальные функции из библиотек.
          </p>
          <pre class="code-block">
  // Базовая реализация глубокого слияния
  function deepMerge(target, source) {
    const output = { ...target };
    
    for (const key in source) {
      if (source[key] instanceof Object) {
        if (target[key] instanceof Object) {
          output[key] = deepMerge(target[key], source[key]);
        } else {
          output[key] = { ...source[key] };
        }
      } else {
        output[key] = source[key];
      }
    }
    
    return output;
  }
          </pre>
        </div>
      </div>
      
      <div class="conclusion">
        <h2>Ключевые выводы</h2>
        <ol>
          <li>В JavaScript объекты всегда передаются по ссылке, а не по значению</li>
          <li>Изменение объекта через одну ссылку влияет на все другие ссылки на этот объект</li>
          <li>Для создания независимых копий используйте поверхностное или глубокое копирование</li>
          <li>Иммутабельный подход (создание новых объектов вместо изменения существующих) делает код более предсказуемым</li>
          <li>Понимание этих принципов критически важно для избежания трудноотслеживаемых багов в больших приложениях</li>
        </ol>
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
  </script>
  
  <style scoped>
  .reference-vs-value {
    font-family: Arial, sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    color: black;
  }
  
  h1, h2, h3 {
    color: #333;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 28px;
  }
  
  h2 {
    margin-top: 40px;
    margin-bottom: 20px;
    font-size: 22px;
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 10px;
  }
  
  h3 {
    font-size: 18px;
    margin-bottom: 15px;
  }
  
  .code-block {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    overflow-x: auto;
    white-space: pre;
    margin: 15px 0;
  }
  
  .visualization-container {
    background-color: #fafafa;
    border-radius: 8px;
    padding: 20px;
    margin: 30px 0;
  }
  
  .memory-model {
    position: relative;
  }
  
  .step {
    opacity: 0.3;
    transition: opacity 0.5s ease;
    margin-bottom: 30px;
    padding: 15px;
    border-radius: 8px;
    background-color: white;
  }
  
  .step.active {
    opacity: 1;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .objects-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 40px;
    margin: 20px 0;
    position: relative;
  }
  
  .with-arrow {
    padding: 20px 0;
  }
  
  .object-box {
    width: 250px;
    border: 2px solid #2c3e50;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .object-title {
    background-color: #2c3e50;
    color: white;
    padding: 8px 12px;
    font-weight: bold;
    font-family: monospace;
  }
  
  .object-content {
    padding: 15px;
    background-color: white;
  }
  
  .property {
    font-family: monospace;
    margin-bottom: 8px;
    padding: 5px;
    border-radius: 4px;
  }
  
  .property.reference {
    color: #e74c3c;
    font-weight: bold;
  }
  
  .arrow {
    color: #e74c3c;
    font-weight: bold;
  }
  
  .reference-arrow {
    position: absolute;
    top: 50%;
    left: 42%;
    width: 15%;
    height: 2px;
    background-color: #e74c3c;
    transform: translateY(-50%);
  }
  
  .reference-arrow:after {
    content: '';
    position: absolute;
    right: -5px;
    top: -4px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 10px solid #e74c3c;
  }
  
  .reference-arrow.animated {
    animation: arrowGrow 1s ease-out;
  }
  
  @keyframes arrowGrow {
    0% {
      width: 0;
      opacity: 0;
    }
    100% {
      width: 15%;
      opacity: 1;
    }
  }
  
  .highlight-change {
    transition: all 0.3s ease;
  }
  
  .step.active .highlight-change {
    box-shadow: 0 0 15px rgba(231, 76, 60, 0.5);
  }
  
  .new-property {
    background-color: #fadbd8;
    border-left: 3px solid #e74c3c;
    opacity: 0;
    transform: translateX(-10px);
  }
  
  .new-property.appear {
    animation: propertyAppear 0.5s ease forwards;
  }
  
  @keyframes propertyAppear {
    0% {
      opacity: 0;
      transform: translateX(-10px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .console-output {
    background-color: #343a40;
    color: white;
    border-radius: 5px;
    padding: 15px;
    font-family: monospace;
    margin: 20px 0;
  }
  
  .console-line {
    margin-bottom: 10px;
  }
  
  .console-prompt {
    color: #ced4da;
  }
  
  .console-result {
    color: #4caf50;
    margin-left: 15px;
    display: block;
    padding-left: 20px;
  }
  
  .step-explanation {
    background-color: #f8f9fa;
    border-left: 4px solid #17a2b8;
    padding: 10px 15px;
    margin-top: 15px;
    font-size: 15px;
    line-height: 1.5;
  }
  
  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-top: 30px;
  }
  
  .controls button {
    padding: 8px 20px;
    background-color: #2c3e50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
  }
  
  .controls button:hover:not(:disabled) {
    background-color: #1a252f;
  }
  
  .controls button:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
  
  .step-indicator {
    font-size: 14px;
    color: #7f8c8d;
  }
  
  .potential-problems, .solutions, .real-life-applications, .algorithms-techniques {
    margin: 30px 0;
  }
  
  .solution-method, .application, .algorithm {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .solution-explanation {
    color: #495057;
    margin-top: 10px;
    font-size: 15px;
    line-height: 1.5;
  }
  
  ul, ol {
    padding-left: 20px;
    line-height: 1.6;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  .conclusion li {
    font-weight: bold;
  }
  
  /* Анимации для плавности интерфейса */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @media (max-width: 768px) {
    .objects-container {
      flex-direction: column;
      align-items: center;
    }
    
    .reference-arrow {
      transform: rotate(90deg);
      left: 50%;
      top: 175px;
      width: 50px;
    }
    
    .reference-arrow.animated {
      animation: arrowGrowVertical 1s ease-out;
    }
    
    @keyframes arrowGrowVertical {
      0% {
        height: 0;
        opacity: 0;
      }
      100% {
        height: 2px;
        opacity: 1;
      }
    }
  }
  </style>