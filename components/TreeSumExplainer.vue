<template>
    <div class="tree-sum-explainer">
      <h1>Сумма всех значений в дереве объектов</h1>
      
      <section class="problem-description">
        <h2>Описание задачи</h2>
        <p>Дано дерево объектов, где каждый узел имеет значение <code>value</code> и может содержать
          массив дочерних узлов <code>children</code>. Нужно найти сумму всех значений <code>value</code>
          в дереве.</p>
        
        <div class="code-block">
          <pre><code>const tree = {
    value: 1,
    children: [
      {
        value: 2,
        children: [{ value: 4 }, { value: 5 }],
      },
      {
        value: 3,
        children: [{ value: 6 }, { value: 7 }],
      },
    ],
  };</code></pre>
        </div>
      </section>
      
      <section class="tree-visualization">
        <h2>Визуализация дерева</h2>
        <div class="tree-container">
          <div class="node root-node" :class="{ active: activeNode === 'root' }">
            <div class="node-value">1</div>
          </div>
          <div class="level">
            <div class="node" :class="{ active: activeNode === 'node1' }">
              <div class="node-value">2</div>
            </div>
            <div class="node" :class="{ active: activeNode === 'node2' }">
              <div class="node-value">3</div>
            </div>
          </div>
          <div class="level">
            <div class="node" :class="{ active: activeNode === 'node3' }">
              <div class="node-value">4</div>
            </div>
            <div class="node" :class="{ active: activeNode === 'node4' }">
              <div class="node-value">5</div>
            </div>
            <div class="node" :class="{ active: activeNode === 'node5' }">
              <div class="node-value">6</div>
            </div>
            <div class="node" :class="{ active: activeNode === 'node6' }">
              <div class="node-value">7</div>
            </div>
          </div>
        </div>
        
        <div class="animation-controls">
          <button @click="startAnimation" :disabled="isAnimating">Начать анимацию</button>
          <button @click="stopAnimation" :disabled="!isAnimating">Остановить</button>
          <button @click="resetAnimation">Сбросить</button>
        </div>
        
        <div class="current-sum-display">
          <p>Текущая сумма: <span class="sum">{{ currentSum }}</span></p>
          <p v-if="isAnimating || animationComplete">
            Узел: <span class="current-node">{{ currentNodeDescription }}</span>
          </p>
        </div>
      </section>
      
      <section class="solution-explanation">
        <h2>Объяснение решения</h2>
        
        <h3>Алгоритм обхода дерева</h3>
        <p>Для решения этой задачи используется <strong>рекурсивный обход дерева</strong> (Depth-First Search).
          Мы посещаем каждый узел дерева и суммируем его значение, затем рекурсивно обрабатываем
          всех его потомков.</p>
        
        <div class="solution-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-description">
              <p>Берем текущий узел и получаем его свойства с помощью <code>Object.entries(obj)</code></p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-description">
              <p>Используем метод <code>reduce</code> для обработки свойств и накопления суммы</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-description">
              <p>Если свойство - массив (children), рекурсивно обрабатываем каждый элемент</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-description">
              <p>Если свойство - значение (value), прибавляем его к общей сумме</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">5</div>
            <div class="step-description">
              <p>Возвращаем накопленную сумму</p>
            </div>
          </div>
        </div>
        
        <div class="code-execution-flow">
          <h3>Разбор работы функции</h3>
          <div class="code-block">
            <pre><code>const getTreeVal = (obj) => {
    return Object.entries(obj).reduce((acc, cur) => {
      const [key, val] = cur;
  
      if (Array.isArray(val)) {
        val.forEach((el) => (acc += getTreeVal(el)));
      } else {
        acc += val;
      }
  
      return acc;
    }, 0);
  };</code></pre>
          </div>
          
          <div class="execution-steps">
            <div class="execution-step" v-for="(step, index) in executionSteps" :key="index" :class="{ active: currentExecutionStep === index }">
              <div class="step-title">{{ step.title }}</div>
              <div class="step-code">{{ step.code }}</div>
              <div class="step-explanation">{{ step.explanation }}</div>
            </div>
          </div>
          
          <div class="execution-controls">
            <button @click="prevExecutionStep" :disabled="currentExecutionStep <= 0">Назад</button>
            <button @click="nextExecutionStep" :disabled="currentExecutionStep >= executionSteps.length - 1">Вперед</button>
          </div>
        </div>
      </section>
      
      <section class="pitfalls">
        <h2>Подводные камни</h2>
        <div class="pitfall-list">
          <div class="pitfall-item">
            <h3>1. Проблема с типом данных</h3>
            <p>Функция предполагает, что <code>val</code> всегда является либо числом, либо массивом. 
               Если в дереве встретится другой тип данных (например, строка или объект без value), 
               это может привести к неожиданным результатам.</p>
            <div class="code-block">
              <pre><code>// Проблемный пример
  const badTree = {
    value: 1,
    children: [
      { value: "2" }, // строка вместо числа
      { description: "без value" } // нет свойства value
    ]
  };
  
  // Результат: "12undefined"</code></pre>
            </div>
          </div>
          
          <div class="pitfall-item">
            <h3>2. Обработка всех свойств объекта</h3>
            <p>Функция суммирует <em>все</em> свойства объекта, не только <code>value</code>, что может привести 
               к неверным результатам, если в объекте есть другие числовые свойства.</p>
            <div class="code-block">
              <pre><code>// Проблемный пример
  const treeWithExtra = {
    value: 1,
    id: 100, // это тоже будет просуммировано
    children: [{ value: 2 }]
  };
  
  // Ожидаем: 3, Получаем: 103</code></pre>
            </div>
          </div>
          
          <div class="pitfall-item">
            <h3>3. Рекурсивное переполнение стека</h3>
            <p>При обработке очень глубоких деревьев может произойти переполнение стека вызовов. 
               В JavaScript есть ограничение на глубину рекурсии.</p>
            <div class="code-block">
              <pre><code>// Создание очень глубокого дерева
  let deepTree = { value: 1 };
  let current = deepTree;
  
  // Создаем цепочку из 10,000 узлов
  for (let i = 0; i &lt; 10000; i++) {
    current.children = [{ value: 1 }];
    current = current.children[0];
  }
  
  // RangeError: Maximum call stack size exceeded</code></pre>
            </div>
          </div>
        </div>
      </section>
      
      <section class="optimized-solution">
        <h2>Улучшенное решение</h2>
        <p>Давайте исправим некоторые подводные камни и оптимизируем нашу функцию:</p>
        
        <div class="code-block">
          <pre><code>const getTreeValueOptimized = (node) => {
    // Проверка на null или undefined
    if (!node) return 0;
    
    // Получаем значение текущего узла (или 0, если его нет)
    const nodeValue = typeof node.value === 'number' ? node.value : 0;
    
    // Если нет детей, возвращаем только значение текущего узла
    if (!node.children) return nodeValue;
    
    // Рекурсивно суммируем значения всех дочерних узлов
    const childrenSum = Array.isArray(node.children)
      ? node.children.reduce((sum, child) => sum + getTreeValueOptimized(child), 0)
      : 0;
    
    // Возвращаем сумму значения текущего узла и всех его потомков
    return nodeValue + childrenSum;
  };</code></pre>
        </div>
        
        <div class="improvements">
          <h3>Улучшения:</h3>
          <ul>
            <li>Проверка на null или undefined</li>
            <li>Проверка типа значения узла, учитываем только числа</li>
            <li>Явная обработка только свойств value и children</li>
            <li>Проверка, является ли children массивом</li>
          </ul>
        </div>
        
        <!-- Итеративное решение для избежания переполнения стека -->
        <div class="iterative-solution">
          <h3>Итеративное решение (без рекурсии)</h3>
          <p>Для очень глубоких деревьев можно использовать итеративное решение с помощью стека:</p>
          
          <div class="code-block">
            <pre><code>const getTreeValueIterative = (root) => {
    if (!root) return 0;
    
    let sum = 0;
    const stack = [root];
    
    while (stack.length > 0) {
      const node = stack.pop();
      
      // Добавляем значение текущего узла
      if (typeof node.value === 'number') {
        sum += node.value;
      }
      
      // Добавляем всех детей в стек
      if (Array.isArray(node.children)) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push(node.children[i]);
        }
      }
    }
    
    return sum;
  };</code></pre>
          </div>
        </div>
      </section>
      
      <section class="real-world-applications">
        <h2>Применение в реальной жизни</h2>
        
        <div class="applications-grid">
          <div class="application-card">
            <h3>Файловая система</h3>
            <p>Расчет размера папки, включая все вложенные файлы и подпапки</p>
            <div class="app-example">
              <pre><code>// Папка со вложенными папками и файлами
  const folder = {
    name: "Проект",
    size: 2, // MB
    contents: [
      { name: "docs", size: 5, contents: [/*...*/] },
      { name: "src", size: 1, contents: [/*...*/] }
    ]
  };
  
  // Получение общего размера</code></pre>
            </div>
          </div>
          
          <div class="application-card">
            <h3>DOM-структура</h3>
            <p>Подсчет количества элементов определенного типа во вложенной структуре DOM</p>
            <div class="app-example">
              <pre><code>// Подсчет всех input элементов в форме
  function countInputs(element) {
    let count = element.tagName === 'INPUT' ? 1 : 0;
    
    for (const child of element.children) {
      count += countInputs(child);
    }
    
    return count;
  }</code></pre>
            </div>
          </div>
          
          <div class="application-card">
            <h3>Организационная структура</h3>
            <p>Подсчет общего бюджета отделов в компании</p>
            <div class="app-example">
              <pre><code>const company = {
    name: "Корпорация",
    budget: 1000000,
    departments: [
      { name: "IT", budget: 500000, teams: [...] },
      { name: "Маркетинг", budget: 300000, teams: [...] }
    ]
  };</code></pre>
            </div>
          </div>
          
          <div class="application-card">
            <h3>Игровая механика</h3>
            <p>Расчет общего урона, наносимого сложным навыком с множеством эффектов</p>
            <div class="app-example">
              <pre><code>const fireball = {
    name: "Огненный шар",
    damage: 50,
    effects: [
      { name: "Ожог", damage: 10, effects: [...] },
      { name: "Взрыв", damage: 30, effects: [...] }
    ]
  };</code></pre>
            </div>
          </div>
        </div>
      </section>
      
      <section class="conclusion">
        <h2>Заключение</h2>
        <p>Рекурсивный обход дерева - это мощный алгоритмический паттерн, который позволяет эффективно 
           работать с вложенными структурами данных. В этом уроке мы рассмотрели, как:</p>
        <ul>
          <li>Обходить дерево объектов с произвольной глубиной вложенности</li>
          <li>Применять метод reduce для накопления результата</li>
          <li>Избегать распространенных ошибок при работе с деревьями</li>
          <li>Оптимизировать решение для различных сценариев</li>
        </ul>
        <p>Понимание этого алгоритма поможет вам при работе с различными иерархическими структурами данных,
           такими как DOM, JSON-структуры, файловые системы и многие другие.</p>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref,  onBeforeUnmount } from 'vue';
  
  // Состояние анимации обхода дерева
  const isAnimating = ref(false);
  const animationComplete = ref(false);
  const currentSum = ref(0);
  const activeNode = ref('');
  const currentNodeDescription = ref('');
  
  // Порядок обхода узлов для анимации
  const animationSequence = [
    { node: 'root', value: 1, description: 'Корневой узел (1)' },
    { node: 'node1', value: 2, description: 'Левый потомок корня (2)' },
    { node: 'node3', value: 4, description: 'Левый потомок узла 2 (4)' },
    { node: 'node4', value: 5, description: 'Правый потомок узла 2 (5)' },
    { node: 'node2', value: 3, description: 'Правый потомок корня (3)' },
    { node: 'node5', value: 6, description: 'Левый потомок узла 3 (6)' },
    { node: 'node6', value: 7, description: 'Правый потомок узла 3 (7)' },
  ];
  
  let animationTimer = null;
  let currentAnimationStep = 0;
  
  // Запуск анимации обхода дерева
  function startAnimation() {
    if (isAnimating.value) return;
    
    isAnimating.value = true;
    animationComplete.value = false;
    
    function nextStep() {
      if (currentAnimationStep >= animationSequence.length) {
        isAnimating.value = false;
        animationComplete.value = true;
        return;
      }
      
      const step = animationSequence[currentAnimationStep];
      activeNode.value = step.node;
      currentSum.value += step.value;
      currentNodeDescription.value = step.description;
      
      currentAnimationStep++;
      animationTimer = setTimeout(nextStep, 1000);
    }
    
    nextStep();
  }
  
  // Остановка анимации
  function stopAnimation() {
    if (animationTimer) {
      clearTimeout(animationTimer);
      animationTimer = null;
    }
    isAnimating.value = false;
  }
  
  // Сброс анимации
  function resetAnimation() {
    stopAnimation();
    currentAnimationStep = 0;
    currentSum.value = 0;
    activeNode.value = '';
    currentNodeDescription.value = '';
    animationComplete.value = false;
  }
  
  // Очистка таймера при размонтировании компонента
  onBeforeUnmount(() => {
    if (animationTimer) {
      clearTimeout(animationTimer);
    }
  });
  
  // Шаги выполнения кода с объяснениями
  const executionSteps = [
    {
      title: 'Шаг 1: Запуск функции для корневого узла',
      code: 'getTreeVal(tree)',
      explanation: 'Функция принимает корневой узел дерева и начинает обработку'
    },
    {
      title: 'Шаг 2: Получение свойств объекта',
      code: 'Object.entries(obj) => [["value", 1], ["children", [...]]]',
      explanation: 'Получаем все пары ключ-значение из объекта'
    },
    {
      title: 'Шаг 3: Обработка свойства value',
      code: 'acc += val (acc + 1 = 1)',
      explanation: 'Добавляем value корневого узла к аккумулятору'
    },
    {
      title: 'Шаг 4: Обработка свойства children',
      code: 'val.forEach((el) => (acc += getTreeVal(el)))',
      explanation: 'Запускаем рекурсивный обход для каждого дочернего узла'
    },
    {
      title: 'Шаг 5: Рекурсивный вызов для первого потомка',
      code: 'getTreeVal({ value: 2, children: [...] })',
      explanation: 'Обрабатываем левый дочерний узел и все его потомки'
    },
    {
      title: 'Шаг 6: Обработка значения левого потомка',
      code: 'acc += 2',
      explanation: 'Добавляем value левого потомка к аккумулятору (1 + 2 = 3)'
    },
    {
      title: 'Шаг 7: Рекурсия для потомков левого узла',
      code: 'getTreeVal({ value: 4 }) + getTreeVal({ value: 5 })',
      explanation: 'Рекурсивно обрабатываем потомков левого узла (4 + 5 = 9)'
    },
    {
      title: 'Шаг 8: Возврат суммы левой ветви',
      code: 'return 2 + 4 + 5 = 11',
      explanation: 'Возвращаем сумму для левого поддерева (2 + 4 + 5 = 11)'
    },
    {
      title: 'Шаг 9: Рекурсивный вызов для второго потомка',
      code: 'getTreeVal({ value: 3, children: [...] })',
      explanation: 'Обрабатываем правый дочерний узел и все его потомки'
    },
    {
      title: 'Шаг 10: Обработка значения правого потомка',
      code: 'acc += 3',
      explanation: 'Добавляем value правого потомка к аккумулятору (1 + 11 + 3 = 15)'
    },
    {
      title: 'Шаг 11: Рекурсия для потомков правого узла',
      code: 'getTreeVal({ value: 6 }) + getTreeVal({ value: 7 })',
      explanation: 'Рекурсивно обрабатываем потомков правого узла (6 + 7 = 13)'
    },
    {
      title: 'Шаг 12: Возврат суммы правой ветви',
      code: 'return 3 + 6 + 7 = 16',
      explanation: 'Возвращаем сумму для правого поддерева (3 + 6 + 7 = 16)'
    },
    {
      title: 'Шаг 13: Итоговый результат',
      code: 'return 1 + 11 + 16 = 28',
      explanation: 'Возвращаем общую сумму: корень + левое поддерево + правое поддерево (1 + 11 + 16 = 28)'
    }
  ];
  
  // Текущий шаг выполнения кода
  const currentExecutionStep = ref(0);
  
  // Переход к следующему шагу выполнения
  function nextExecutionStep() {
    if (currentExecutionStep.value < executionSteps.length - 1) {
      currentExecutionStep.value++;
    }
  }
  
  // Переход к предыдущему шагу выполнения
  function prevExecutionStep() {
    if (currentExecutionStep.value > 0) {
      currentExecutionStep.value--;
    }
  }
  </script>
  
  <style scoped>
  .tree-sum-explainer {
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    color: #000000;
  }
  
  h1, h2, h3 {
    color: #000000;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 32px;
  }
  
  h2 {
    border-bottom: 2px solid #4a90e2;
    padding-bottom: 10px;
    margin: 40px 0 20px;
    font-size: 24px;
  }
  
  h3 {
    font-size: 20px;
    margin: 25px 0 15px;
  }
  
  section {
    margin-bottom: 50px;
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 15px;
  }
  
  code {
    font-family: 'Courier New', monospace;
    background-color: #f5f5f5;
    padding: 2px 4px;
    border-radius: 3px;
    color: #e74c3c;
  }
  
  /* Блок с кодом */
  .code-block {
    background-color: #282c34;
    border-radius: 8px;
    margin: 15px 0;
    overflow: hidden;
  }
  
  .code-block pre {
    margin: 0;
    padding: 15px;
    overflow-x: auto;
  }
  
  .code-block code {
    font-family: 'Courier New', monospace;
    background-color: transparent;
    color: #ffffff;
    padding: 0;
  }
  
  /* Визуализация дерева */
  .tree-visualization {
    margin: 40px 0;
  }
  
  .tree-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    margin: 30px 0;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .level {
    display: flex;
    gap: 30px;
    justify-content: center;
    width: 100%;
    position: relative;
  }
  
  .node {
    width: 60px;
    height: 60px;
    background-color: #4a90e2;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    font-size: 20px;
    transition: all 0.3s ease;
    position: relative;
  }
  
  .node:before {
    content: '';
    position: absolute;
    top: -30px;
    left: 50%;
    width: 2px;
    height: 30px;
    background-color: #4a90e2;
    transform: translateX(-50%);
  }
  
  .level:first-child .node:before {
    display: none;
  }
  
  .node.active {
    background-color: #e74c3c;
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(231, 76, 60, 0.5);
  }
  
  .root-node {
    background-color: #f39c12;
  }
  
  .animation-controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 20px 0;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #3a7bc8;
  }
  
  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .current-sum-display {
    text-align: center;
    font-size: 20px;
    margin: 20px 0;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .sum {
    font-weight: bold;
    color: #e74c3c;
    font-size: 24px;
  }
  
  .current-node {
    font-weight: bold;
    color: #4a90e2;
  }
  
  /* Шаги решения */
  .solution-steps {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 25px 0;
  }
  
  .step {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .step-number {
    width: 30px;
    height: 30px;
    background-color: #4a90e2;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
  }
  
  .step-description {
    flex: 1;
  }
  
  /* Выполнение кода */
  .execution-steps {
    margin: 20px 0;
  }
  
  .execution-step {
    padding: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
    opacity: 0.7;
    transition: all 0.3s ease;
  }
  
  .execution-step.active {
    opacity: 1;
    border-color: #4a90e2;
    box-shadow: 0 2px 10px rgba(74, 144, 226, 0.1);
  }
  
  .step-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #4a90e2;
  }
  
  .step-code {
    font-family: 'Courier New', monospace;
    background-color: #282c34;
    color: #ffffff;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  
  .step-explanation {
    color: #555;
  }
  
  .execution-controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 20px 0;
  }
  
  /* Подводные камни */
  .pitfall-list {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 20px 0;
  }
  
  .pitfall-item {
    background-color: #fff8dc;
    border-left: 5px solid #f39c12;
    padding: 20px;
    border-radius: 0 8px 8px 0;
  }
  
  .pitfall-item h3 {
    color: #d35400;
    margin-top: 0;
  }
  
  /* Реальные применения */
  .applications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin: 20px 0;
  }
  
  .application-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    background-color: #f9f9f9;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .application-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .application-card h3 {
    color: #4a90e2;
    margin-top: 0;
  }
  
  .app-example {
    margin-top: 15px;
  }
  
  /* Заключение */
  .conclusion {
    background-color: #f5f9ff;
    padding: 30px;
    border-radius: 8px;
    border-top: 5px solid #4a90e2;
  }
  
  .conclusion ul {
    margin-left: 20px;
    line-height: 1.6;
  }
  
  .conclusion li {
    margin-bottom: 10px;
  }
  
  /* Улучшения */
  .improvements ul {
    margin-left: 20px;
    line-height: 1.6;
  }
  
  .improvements li {
    margin-bottom: 8px;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .applications-grid {
      grid-template-columns: 1fr;
    }
    
    .tree-container {
      padding: 10px;
    }
    
    .level {
      gap: 15px;
    }
    
    .node {
      width: 50px;
      height: 50px;
      font-size: 16px;
    }
  }
  </style>