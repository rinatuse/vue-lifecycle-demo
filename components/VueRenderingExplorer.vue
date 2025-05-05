<template>
    <div class="vue-rendering-explorer">
      <h1 class="title">Как работает рендеринг во Vue 3</h1>
      <p class="description">Подробное объяснение процесса рендеринга с визуализацией</p>
      
      <!-- Навигация по секциям -->
      <div class="section-tabs">
        <button 
          v-for="(section, index) in sections" 
          :key="section.id"
          :class="['tab-button', { active: currentSection === index }]" 
          @click="currentSection = index"
        >
          {{ section.title }}
        </button>
      </div>
      
      <div class="content-container">
        <!-- Секция 1: Основные концепции -->
        <div v-if="currentSection === 0" class="section">
          <h2>{{ sections[0].title }}</h2>
          <div class="intro-text">
            <p>Vue 3 использует <strong>реактивную модель</strong> и <strong>виртуальный DOM</strong> для эффективного обновления интерфейса.</p>
            <p>Процесс рендеринга состоит из нескольких ключевых этапов:</p>
          </div>
          
          <div class="concept-cards">
            <div class="concept-card" v-for="(concept, index) in renderingConcepts" :key="index">
              <div class="concept-icon">{{ concept.icon }}</div>
              <div class="concept-content">
                <h3>{{ concept.title }}</h3>
                <p>{{ concept.description }}</p>
              </div>
            </div>
          </div>
          
          <div class="vue-architecture">
            <h3>Архитектура рендеринга Vue 3</h3>
            <div class="architecture-diagram">
              <div class="box compiler">
                <div class="box-title">Компилятор</div>
                <div class="box-content">Преобразует шаблоны в render-функции</div>
              </div>
              <div class="arrow">→</div>
              <div class="box renderer">
                <div class="box-title">Рендерер</div>
                <div class="box-content">Создаёт и обновляет виртуальный DOM</div>
              </div>
              <div class="arrow">→</div>
              <div class="box reactivity">
                <div class="box-title">Реактивность</div>
                <div class="box-content">Отслеживает изменения данных</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Секция 2: Процесс рендеринга -->
        <div v-if="currentSection === 1" class="section">
          <h2>{{ sections[1].title }}</h2>
          <p>Давайте пошагово рассмотрим процесс рендеринга во Vue 3.</p>
          
          <div class="process-container">
            <div class="timeline">
              <div 
                v-for="(step, index) in renderSteps" 
                :key="index"
                :class="['timeline-step', { active: currentStep >= index }]"
                @click="setCurrentStep(index)"
              >
                <div class="step-number">{{ index + 1 }}</div>
                <div class="step-label">{{ step.title }}</div>
              </div>
            </div>
            
            <div class="step-content">
              <div class="step-title-container">
                <h3 class="step-title">{{ renderSteps[currentStep].title }}</h3>
                <div class="step-navigation">
                  <button 
                    class="nav-button" 
                    :disabled="currentStep === 0"
                    @click="currentStep--"
                  >
                    ← Назад
                  </button>
                  <button 
                    class="nav-button" 
                    :disabled="currentStep === renderSteps.length - 1"
                    @click="currentStep++"
                  >
                    Вперёд →
                  </button>
                </div>
              </div>
              
              <div class="step-description">
                <p>{{ renderSteps[currentStep].description }}</p>
              </div>
              
              <div class="visualization">
                <transition name="fade" mode="out-in">
                  <div :key="currentStep" class="visualization-container">
                    <!-- Визуализация создания компонента -->
                    <div v-if="currentStep === 0" class="component-creation">
                      <div class="code-block">
                        <pre>
  import { createApp } from 'vue'
  import App from './App.vue'
  
  const app = createApp(App)
  app.mount('#app')
                        </pre>
                      </div>
                      <div class="animation-box">
                        <div class="app-instance" :class="{ active: animationTrigger }">
                          <div class="code-label">createApp()</div>
                          <div class="instance-props">
                            <div class="prop">component: App</div>
                            <div class="prop">config: {...}</div>
                            <div class="prop">mount()</div>
                            <div class="prop">use()</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Визуализация компиляции шаблона -->
                    <div v-if="currentStep === 1" class="template-compilation">
                      <div class="split-view">
                        <div class="template-code">
                          <div class="code-title">Шаблон</div>
                          <pre>
  &lt;template&gt;
    &lt;div class="greeting"&gt;
      &lt;h1&gt;{{ message }}&lt;/h1&gt;
      &lt;button @click="count++"&gt;
        Нажатий: {{ count }}
      &lt;/button&gt;
    &lt;/div&gt;
  &lt;/template&gt;
                          </pre>
                        </div>
                        <div class="arrow">&rArr;</div>
                        <div class="render-function">
                          <div class="code-title">Функция рендеринга</div>
                          <pre>
  function render(_ctx, _cache) {
    return (_openBlock(), _createElementBlock("div", { class: "greeting" }, [
      _createElementVNode("h1", null, _toDisplayString(_ctx.message), 1),
      _createElementVNode("button", {
        onClick: _cache[0] || (_cache[0] = ($event) => (_ctx.count++))
      }, "Нажатий: " + _toDisplayString(_ctx.count), 1)
    ]))
  }
                          </pre>
                        </div>
                      </div>
                      <div class="code-explanation">
                        <p>Vue компилирует декларативный шаблон в императивную функцию рендеринга, которая знает, как создавать виртуальные узлы DOM.</p>
                      </div>
                    </div>
                    
                    <!-- Визуализация виртуального DOM -->
                    <div v-if="currentStep === 2" class="virtual-dom">
                      <h4>Создание виртуального DOM</h4>
                      <div class="virtual-dom-visualization" :class="{ 'animate-vdom': animationTrigger }">
                        <div class="vdom-node root">
                          <div class="node-title">VNode: div.greeting</div>
                          <div class="node-children">
                            <div class="vdom-node child">
                              <div class="node-title">VNode: h1</div>
                              <div class="node-content">{{ message }}</div>
                            </div>
                            <div class="vdom-node child">
                              <div class="node-title">VNode: button</div>
                              <div class="node-content">Нажатий: {{ count }}</div>
                              <div class="node-props">@click: count++</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p class="vdom-explanation">
                        Виртуальный DOM - это легковесное JavaScript-представление реального DOM. Это позволяет Vue выполнять операции сравнения и обновления в памяти, что гораздо быстрее прямых манипуляций с реальным DOM.
                      </p>
                    </div>
                    
                    <!-- Визуализация монтирования -->
                    <div v-if="currentStep === 3" class="mounting">
                      <div class="dom-tree">
                        <div class="dom-node html">
                          <div class="node-tag">&lt;html&gt;</div>
                          <div class="dom-node body">
                            <div class="node-tag">&lt;body&gt;</div>
                            <div class="dom-node app">
                              <div class="node-tag">&lt;div id="app"&gt;</div>
                              <div 
                                class="dom-node mounting-point"
                                :class="{ 'mounted': animationTrigger }"
                              >
                                <div class="mounting-label" v-if="!animationTrigger">app.mount('#app')</div>
                                <template v-if="animationTrigger">
                                  <div class="node-tag">&lt;div class="greeting"&gt;</div>
                                  <div class="dom-node">
                                    <div class="node-tag">&lt;h1&gt;{{ message }}&lt;/h1&gt;</div>
                                  </div>
                                  <div class="dom-node">
                                    <div class="node-tag">&lt;button&gt;Нажатий: {{ count }}&lt;/button&gt;</div>
                                  </div>
                                </template>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button class="trigger-button" @click="triggerAnimation">
                        {{ animationTrigger ? 'Сбросить анимацию' : 'Запустить монтирование' }}
                      </button>
                    </div>
                    
                    <!-- Визуализация реактивности -->
                    <div v-if="currentStep === 4" class="reactivity">
                      <h4>Реактивная система Vue 3 на основе Proxy</h4>
                      <div class="reactivity-visualization">
                        <div class="data-object">
                          <div class="object-title">Исходные данные</div>
                          <pre>
  const data = {
    message: "Привет, Vue!",
    count: 0
  }
                          </pre>
                        </div>
                        <div class="arrow">↓</div>
                        <div class="proxy-wrap">
                          <div class="object-title">Proxy-обёртка</div>
                          <pre>
  const proxy = new Proxy(data, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
      return true
    }
  })
                          </pre>
                          <div class="reactive-effects">
                            <div class="effect" :class="{ active: animationTrigger }">
                              <div class="effect-title">Эффект рендеринга</div>
                              <div class="effect-content">
                                <div>Зависит от:</div>
                                <div class="dependency">proxy.message</div>
                                <div class="dependency">proxy.count</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="reactivity-actions">
                        <button class="action-button" @click="triggerAnimation">
                          {{ animationTrigger ? 'Сбросить' : 'Изменить count' }}
                        </button>
                        <div class="action-result" v-if="animationTrigger">
                          <div class="action-code">proxy.count++</div>
                          <div class="action-flow">
                            <div>1. set -> count = {{ count }}</div>
                            <div>2. trigger(target, 'count')</div>
                            <div>3. Вызов эффекта рендеринга</div>
                            <div>4. Обновление DOM</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Визуализация патча DOM -->
                    <div v-if="currentStep === 5" class="patching">
                      <h4>Сравнение и обновление DOM (патчинг)</h4>
                      <div class="patching-visualization">
                        <div class="vdom-comparison">
                          <div class="vdom-before">
                            <div class="comparison-title">Старый виртуальный DOM</div>
                            <div class="vdom-node root">
                              <div class="node-title">div.greeting</div>
                              <div class="node-children">
                                <div class="vdom-node child">
                                  <div class="node-title">h1</div>
                                  <div class="node-content">{{ message }}</div>
                                </div>
                                <div class="vdom-node child">
                                  <div class="node-title">button</div>
                                  <div class="node-content">Нажатий: {{ animationTrigger ? count - 1 : count }}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="comparison-arrow">&rArr;</div>
                          <div class="vdom-after">
                            <div class="comparison-title">Новый виртуальный DOM</div>
                            <div class="vdom-node root">
                              <div class="node-title">div.greeting</div>
                              <div class="node-children">
                                <div class="vdom-node child">
                                  <div class="node-title">h1</div>
                                  <div class="node-content">{{ message }}</div>
                                </div>
                                <div class="vdom-node child highlight" :class="{ 'changed': animationTrigger }">
                                  <div class="node-title">button</div>
                                  <div class="node-content">Нажатий: {{ count }}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="patching-explanation">
                          <p>Vue использует алгоритм сравнения (diffing), чтобы найти минимальные изменения между старым и новым виртуальным DOM.</p>
                          <p>В этом примере изменился только текст кнопки, поэтому Vue обновит только этот конкретный узел DOM, а не перерисовывает весь компонент.</p>
                        </div>
                        <button class="trigger-button" @click="triggerAnimation">
                          {{ animationTrigger ? 'Сбросить' : 'Показать изменения' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Секция 3: Алгоритмы и оптимизации -->
        <div v-if="currentSection === 2" class="section">
          <h2>{{ sections[2].title }}</h2>
          <p>Vue 3 использует несколько ключевых алгоритмов и техник для оптимизации рендеринга.</p>
          
          <div class="algorithms-container">
            <div v-for="(algorithm, index) in algorithms" :key="index" class="algorithm-card">
              <h3>{{ algorithm.title }}</h3>
              <div class="algorithm-content">
                <div class="algorithm-description">
                  <p>{{ algorithm.description }}</p>
                </div>
                <div class="algorithm-code">
                  <pre><code>{{ algorithm.code }}</code></pre>
                </div>
              </div>
              <div class="algorithm-benefits">
                <h4>Преимущества:</h4>
                <ul>
                  <li v-for="(benefit, i) in algorithm.benefits" :key="i">{{ benefit }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Секция 4: Подводные камни -->
        <div v-if="currentSection === 3" class="section">
          <h2>{{ sections[3].title }}</h2>
          <p>При работе с системой рендеринга Vue 3 существует несколько важных нюансов, о которых следует знать.</p>
          
          <div class="pitfalls-grid">
            <div v-for="(pitfall, index) in pitfalls" :key="index" class="pitfall-card">
              <div class="pitfall-header">
                <div class="pitfall-icon">⚠️</div>
                <h3>{{ pitfall.title }}</h3>
              </div>
              <div class="pitfall-content">
                <p>{{ pitfall.description }}</p>
                <div class="code-comparison">
                  <div class="wrong-code">
                    <div class="code-label">Неправильно ❌</div>
                    <pre><code>{{ pitfall.wrongCode }}</code></pre>
                  </div>
                  <div class="right-code">
                    <div class="code-label">Правильно ✅</div>
                    <pre><code>{{ pitfall.rightCode }}</code></pre>
                  </div>
                </div>
                <div class="pitfall-solution">
                  <h4>Решение:</h4>
                  <p>{{ pitfall.solution }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Секция 5: Практическое применение -->
        <div v-if="currentSection === 4" class="section">
          <h2>{{ sections[4].title }}</h2>
          <p>Понимание процесса рендеринга Vue 3 поможет вам создавать более эффективные и производительные приложения.</p>
          
          <div class="application-cards">
            <div v-for="(application, index) in applications" :key="index" class="application-card">
              <div class="application-icon">{{ application.icon }}</div>
              <div class="application-content">
                <h3>{{ application.title }}</h3>
                <p>{{ application.description }}</p>
                <div class="application-example">
                  <div class="example-label">Пример:</div>
                  <pre><code>{{ application.example }}</code></pre>
                </div>
              </div>
            </div>
          </div>
          
          <div class="tips-container">
            <h3>Советы от опытных разработчиков</h3>
            <ul class="tips-list">
              <li v-for="(tip, index) in tips" :key="index" class="tip-item">
                <div class="tip-number">{{ index + 1 }}</div>
                <div class="tip-content">{{ tip }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // Разделы
  const sections = [
    { id: 'basics', title: 'Основные концепции' },
    { id: 'process', title: 'Процесс рендеринга' },
    { id: 'algorithms', title: 'Алгоритмы и оптимизации' },
    { id: 'pitfalls', title: 'Подводные камни' },
    { id: 'application', title: 'Практическое применение' }
  ];
  
  const currentSection = ref(0);
  
  // Основные концепции рендеринга
  const renderingConcepts = [
    {
      icon: '🧩',
      title: 'Компонентная архитектура',
      description: 'Vue 3 строит интерфейс из древовидной структуры компонентов, каждый из которых может иметь свой жизненный цикл и состояние.'
    },
    {
      icon: '🔄',
      title: 'Реактивность',
      description: 'Система реактивности Vue 3 автоматически отслеживает зависимости компонентов и перерисовывает только те части интерфейса, которые зависят от изменившихся данных.'
    },
    {
      icon: '🌳',
      title: 'Виртуальный DOM',
      description: 'Вместо прямого взаимодействия с браузерным DOM, Vue использует виртуальный DOM — легковесную копию DOM, с которой можно быстро работать в JavaScript.'
    },
    {
      icon: '🔍',
      title: 'Эффективное обновление',
      description: 'Vue 3 находит минимальные изменения между старым и новым состоянием виртуального DOM и применяет только необходимые обновления к реальному DOM.'
    }
  ];
  
  // Шаги рендеринга
  const renderSteps = [
    {
      title: 'Создание приложения',
      description: 'Процесс начинается с вызова createApp(), который создаёт экземпляр приложения Vue. Этот экземпляр является входной точкой и содержит глобальные настройки и компоненты.'
    },
    {
      title: 'Компиляция шаблона',
      description: 'Vue компилирует HTML-шаблоны в JavaScript-функции рендеринга. Это может происходить на этапе сборки (при использовании Single-File Components) или во время выполнения (при использовании строковых шаблонов).'
    },
    {
      title: 'Создание виртуального DOM',
      description: 'Функция рендеринга выполняется и создаёт древовидную структуру виртуальных узлов (VNodes), которая представляет нужную структуру DOM в памяти.'
    },
    {
      title: 'Монтирование в DOM',
      description: 'При первом рендеринге (монтировании), Vue преобразует виртуальный DOM в реальные DOM-элементы и вставляет их в указанный элемент-контейнер на странице.'
    },
    {
      title: 'Реактивное обновление',
      description: 'Когда данные компонента изменяются, Vue автоматически обнаруживает эти изменения благодаря системе реактивности на Proxy, и запускает новый рендер компонента.'
    },
    {
      title: 'Патчинг DOM',
      description: 'Vue сравнивает новый виртуальный DOM со старым (процесс называется "diffing"), находит минимальные изменения и эффективно обновляет только затронутые части реального DOM.'
    }
  ];
  
  // Текущий шаг визуализации
  const currentStep = ref(0);
  const animationTrigger = ref(false);
  
  // Данные для визуализации компонента
  const message = ref('Привет, Vue!');
  const count = ref(0);
  
  // Увеличивает счетчик при запуске анимации
  function triggerAnimation() {
    if (animationTrigger.value) {
      animationTrigger.value = false;
    } else {
      if (currentStep.value === 4 || currentStep.value === 5) {
        count.value++;
      }
      animationTrigger.value = true;
    }
  }
  
  // Переключение на указанный шаг
  function setCurrentStep(index) {
    currentStep.value = index;
    animationTrigger.value = false;
  }
  
  // Алгоритмы и оптимизации
  const algorithms = [
    {
      title: 'Алгоритм сравнения (diffing)',
      description: 'Vue 3 использует эффективный алгоритм сравнения виртуальных DOM-деревьев для нахождения минимальных изменений. Он работает сверху вниз и использует эвристики для ускорения процесса.',
      code: `// Упрощенная версия алгоритма patch
  function patch(oldVNode, newVNode, container) {
    // Разные типы узлов - полная замена
    if (oldVNode.type !== newVNode.type) {
      replaceNode(oldVNode, newVNode, container);
      return;
    }
    
    // Оба текстовые узлы - просто обновить текст
    if (typeof newVNode.children === 'string') {
      if (oldVNode.children !== newVNode.children) {
        container.textContent = newVNode.children;
      }
      return;
    }
  
    // Рекурсивное сравнение дочерних элементов
    patchChildren(oldVNode.children, newVNode.children, container);
  }`,
      benefits: [
        'Минимальное количество DOM-операций',
        'Повторное использование элементов DOM, где это возможно',
        'Эффективное обновление только изменившихся частей',
        'Приоритизация статических частей шаблона'
      ]
    },
    {
      title: 'Система реактивности на основе Proxy',
      description: 'Vue 3 использует JavaScript Proxy для перехвата доступа к свойствам объектов. Это позволяет точно отслеживать, какие данные используются в каждом компоненте.',
      code: `// Упрощенная версия реактивной системы Vue 3
  function reactive(target) {
    return new Proxy(target, {
      get(target, key, receiver) {
        // Отслеживание чтения свойства
        track(target, key);
        return Reflect.get(target, key, receiver);
      },
      set(target, key, value, receiver) {
        const oldValue = target[key];
        const result = Reflect.set(target, key, value, receiver);
        // Если значение изменилось, запустить обновление
        if (oldValue !== value) {
          trigger(target, key);
        }
        return result;
      }
    });
  }`,
      benefits: [
        'Более точное отслеживание зависимостей на уровне свойств',
        'Автоматическое обнаружение добавленных и удалённых свойств',
        'Лучшая производительность по сравнению с Object.defineProperty в Vue 2',
        'Возможность создания сложных реактивных структур данных'
      ]
    },
    {
      title: 'Компилятор с оптимизациями',
      description: 'Компилятор Vue 3 выполняет статический анализ шаблонов и применяет различные оптимизации во время компиляции, такие как hoisting и tree-shaking.',
      code: `<!-- Исходный шаблон -->
  <template>
    <div>
      <h1>{{ title }}</h1>
      <div class="static">Это статический контент</div>
      <button @click="count++">Счётчик: {{ count }}</button>
    </div>
  </template>
  
  // После компиляции с оптимизациями
  function render() {
    // Статические части помечены и кэшируются
    const _hoisted_1 = { class: "static" }
    const _hoisted_2 = createTextVNode("Это статический контент")
    
    return (_openBlock(), _createElementBlock("div", null, [
      _createElementVNode("h1", null, _toDisplayString(_ctx.title), 1 /* TEXT */),
      _createElementVNode("div", _hoisted_1, [_hoisted_2]),
      _createElementVNode("button", {
        onClick: _cache[0] || (_cache[0] = ($event) => (_ctx.count++))
      }, "Счётчик: " + _toDisplayString(_ctx.count), 1 /* TEXT */)
    ]))
  }`,
      benefits: [
        'Выделение статических частей шаблона для предотвращения ненужных перерисовок',
        'Генерация оптимизированного кода для быстрого выполнения',
        'Уменьшение размера сборки через "tree-shaking"',
        'Оптимизация списков с помощью key для эффективного обновления'
      ]
    }
  ];
  
  // Подводные камни
  const pitfalls = [
    {
      title: 'Потеря реактивности',
      description: 'Реактивность в Vue 3 может быть потеряна при деструктуризации реактивных объектов или при добавлении новых свойств после создания объекта.',
      wrongCode: `import { reactive } from 'vue'
  
  const state = reactive({ count: 0 })
  
  // Потеря реактивности при деструктуризации
  const { count } = state
  count++ // Изменение НЕ будет отслеживаться
  
  // Добавление нового свойства напрямую не реактивно
  state.newProp = 'value' // Не будет реактивным`,
      rightCode: `import { reactive, toRefs } from 'vue'
  
  const state = reactive({ count: 0 })
  
  // Использование toRefs для сохранения реактивности
  const { count } = toRefs(state)
  count.value++ // Изменение БУДЕТ отслеживаться
  
  // Для добавления новых свойств используйте
  import { reactive } from 'vue'
  const state = reactive({})
  // Вариант 1: Изначально определите все свойства
  const state = reactive({ count: 0, newProp: null })
  // Вариант 2: Используйте Object.assign с новым реактивным объектом
  Object.assign(state, reactive({ newProp: 'value' }))`,
      solution: 'Используйте toRefs для деструктуризации, не используйте деструктуризацию напрямую из реактивных объектов. Для новых свойств либо определите их заранее, либо используйте специальные методы для их добавления.'
    },
    {
      title: 'Проблемы с массивами и мутациями',
      description: 'Некоторые операции с массивами могут не вызвать реактивных обновлений, если они не изменяют оригинальный массив.',
      wrongCode: `const app = {
    data() {
      return {
        items: [1, 2, 3]
      }
    },
    methods: {
      // Не вызовет обновление UI
      filterItems() {
        const result = this.items.filter(item => item > 1)
        return result // Не изменяет исходный массив
      },
      // Не вызовет обновление UI
      findItem(id) {
        return this.items.find(item => item.id === id)
      }
    }
  }`,
      rightCode: `const app = {
    data() {
      return {
        items: [1, 2, 3],
        filteredItems: [] // Дополнительное свойство для хранения
      }
    },
    methods: {
      // Вариант 1: Сохранение результата в реактивное свойство
      filterItems() {
        this.filteredItems = this.items.filter(item => item > 1)
      },
      // Вариант 2: Изменение оригинального массива
      removeSmallItems() {
        const indexesToRemove = []
        this.items.forEach((item, index) => {
          if (item <= 1) indexesToRemove.push(index)
        })
        
        // Удаление с конца, чтобы индексы не сбивались
        for (let i = indexesToRemove.length - 1; i >= 0; i--) {
          this.items.splice(indexesToRemove[i], 1)
        }
      }
    }
  }`,
      solution: 'Для методов, не изменяющих массив, либо сохраняйте результат в реактивное свойство, либо присваивайте новый массив обратно в исходную переменную. Для методов добавления и удаления элементов используйте мутирующие методы массива (push, splice, etc).'
    },
    {
      title: 'Проблемы с асинхронным рендерингом',
      description: 'Vue выполняет обновления DOM асинхронно, и это может вызвать проблемы при работе с DOM сразу после изменения данных.',
      wrongCode: `const app = {
    data() {
      return {
        message: 'Привет'
      }
    },
    methods: {
      updateAndMeasure() {
        this.message = 'Обновлено'
        // Этот код выполнится ДО обновления DOM
        console.log(this.$el.textContent) // Все еще покажет "Привет"
        
        const height = this.$el.offsetHeight
        console.log('Высота:', height) // Может быть неверной
      }
    }
  }`,
      rightCode: `import { nextTick } from 'vue'
  
  const app = {
    data() {
      return {
        message: 'Привет'
      }
    },
    methods: {
      async updateAndMeasure() {
        this.message = 'Обновлено'
        
        // Ждем, пока DOM обновится
        await nextTick()
        // Или в виде промиса: 
        // nextTick().then(() => { ... })
        
        // Теперь DOM обновлен
        console.log(this.$el.textContent) // Покажет "Обновлено"
        
        const height = this.$el.offsetHeight
        console.log('Высота:', height) // Правильное значение
      }
    }
  }`,
      solution: 'Используйте метод nextTick(), чтобы выполнить код после того, как Vue обновит DOM. Это особенно важно, когда вам нужно работать с DOM-элементами, измерять их размеры или позицию после изменения данных.'
    }
  ];
  
  // Практическое применение
  const applications = [
    {
      icon: '🚀',
      title: 'Оптимизация производительности',
      description: 'Понимание алгоритма рендеринга позволяет оптимизировать компоненты и избегать ненужных перерисовок.',
      example: `<!-- Используйте v-once для контента, который никогда не меняется -->
  <header v-once>
    <h1>{{ siteTitle }}</h1>
  </header>
  
  <!-- Используйте v-memo для компонентов, которые редко меняются -->
  <expensive-component v-memo="[prop1, prop2]"></expensive-component>
  
  <!-- Выносите статические элементы -->
  <script setup>
  // Кэшировать тяжелые вычисления
  import { computed } from 'vue'
  
  const expensiveComputation = computed(() => {
    // Результат будет пересчитан только при изменении зависимостей
    return performExpensiveCalculation(props.data)
  })
`
    },
    {
      icon: '📊',
      title: 'Визуализация больших наборов данных',
      description: 'Для эффективной работы с большими списками данных необходимо понимать, как Vue обновляет DOM.',
      example: `<script setup>
  import { ref } from 'vue'
  
  // Для больших списков используйте виртуальный скроллинг
  import { RecycleScroller } from 'vue-virtual-scroller'
  
  const items = ref([/* тысячи элементов */])
  
  // Пример компонента с виртуальным скроллингом

  
  <template>
    <!-- Правильно используйте ключи в v-for для оптимизации -->
    <RecycleScroller
      class="scroller"
      :items="items"
      :item-size="50"
      key-field="id"
    >
      <template #item="{ item }">
        <div class="user-item">{{ item.name }}</div>
      </template>
    </RecycleScroller>
  </template>`
    },
    {
      icon: '⚙️',
      title: 'Адаптивная загрузка компонентов',
      description: 'Понимание жизненного цикла рендеринга помогает более эффективно организовать асинхронную загрузку контента.',
      example: `<script setup>
  import { defineAsyncComponent, ref, onMounted } from 'vue'
  
  // Асинхронная загрузка тяжелого компонента
  const HeavyComponent = defineAsyncComponent(() => 
    import('./HeavyComponent.vue')
  )
  
  const isVisible = ref(false)
  const isLoading = ref(false)
  const data = ref(null)
  
  // Загрузка данных только когда компонент попадает в область видимости
  async function loadDataWhenVisible(entries) {
    if (entries[0].isIntersecting) {
      isLoading.value = true
      data.value = await fetchData()
      isVisible.value = true
      isLoading.value = false
    }
  }
  
  // Наблюдение за видимостью элемента
  onMounted(() => {
    const observer = new IntersectionObserver(loadDataWhenVisible)
    observer.observe(document.querySelector('#lazy-section'))
  })

  
  <template>
    <div id="lazy-section">
      <div v-if="isLoading">Загрузка...</div>
      <HeavyComponent v-if="isVisible" :data="data" />
    </div>
  </template>`
    }
  ];
  
  // Советы для оптимизации производительности
  const tips = [
    'Используйте инструменты разработчика Vue.js DevTools для анализа перерисовок компонентов и выявления проблем производительности.',
    'Выносите дорогостоящие вычисления в вычисляемые свойства (computed) для использования кэширования.',
    'Внедрение компонентов с отложенной загрузкой (lazy-loading) через defineAsyncComponent помогает уменьшить время начальной загрузки.',
    'Используйте правильные ключи при рендеринге списков с v-for, предпочтительно уникальные идентификаторы, а не индексы массива.',
    'Не забывайте про инструменты оптимизации в шаблонах, такие как v-once для статичного контента и v-memo для оптимизации условного рендеринга.'
  ];
  
  // Заполнить начальные состояния при монтировании
  onMounted(() => {
    // В реальном приложении можно здесь инициализировать начальные значения
  });
  </script>
  
  <style scoped>
  .vue-rendering-explorer {
    font-family: Arial, sans-serif;
    color: #000;
    background-color: #fff;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .title {
    text-align: center;
    color: #34495e;
    margin-bottom: 10px;
  }
  
  .description {
    text-align: center;
    color: #7f8c8d;
    margin-bottom: 30px;
  }
  
  /* Стили для навигации по секциям */
  .section-tabs {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 30px;
  }
  
  .tab-button {
    padding: 10px 20px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .tab-button:hover {
    background-color: #e0e0e0;
  }
  
  .tab-button.active {
    background-color: #42b883;
    color: white;
    border-color: #42b883;
  }
  
  .content-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 30px;
  }
  
  /* Стили для первой секции - Основные концепции */
  .intro-text {
    margin-bottom: 30px;
    line-height: 1.6;
  }
  
  .concept-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
  }
  
  .concept-card {
    display: flex;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
  }
  
  .concept-card:hover {
    transform: translateY(-5px);
  }
  
  .concept-icon {
    font-size: 2rem;
    margin-right: 15px;
  }
  
  .concept-content h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  
  .concept-content p {
    margin: 0;
    line-height: 1.5;
  }
  
  .vue-architecture {
    margin-top: 40px;
  }
  
  .architecture-diagram {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    flex-wrap: wrap;
  }
  
  .box {
    width: 28%;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .compiler {
    background-color: #e3f2fd;
  }
  
  .renderer {
    background-color: #f3e5f5;
  }
  
  .reactivity {
    background-color: #e8f5e9;
  }
  
  .box-title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .arrow {
    font-size: 1.5rem;
    color: #7f8c8d;
  }
  
  /* Стили для второй секции - Процесс рендеринга */
  .process-container {
    display: flex;
    gap: 30px;
  }
  
  .timeline {
    width: 250px;
    flex-shrink: 0;
  }
  
  .timeline-step {
    display: flex;
    align-items: center;
    padding: 15px 10px;
    margin-bottom: 10px;
    background-color: #f5f5f5;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0.7;
  }
  
  .timeline-step:hover {
    background-color: #e0e0e0;
  }
  
  .timeline-step.active {
    background-color: #c8ebde;
    opacity: 1;
  }
  
  .step-number {
    width: 30px;
    height: 30px;
    background-color: #42b883;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 10px;
  }
  
  .step-content {
    flex: 1;
  }
  
  .step-title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .step-title {
    margin: 0;
  }
  
  .step-navigation {
    display: flex;
    gap: 10px;
  }
  
  .nav-button {
    padding: 5px 10px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .nav-button:hover:not(:disabled) {
    background-color: #e0e0e0;
  }
  
  .nav-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .step-description {
    margin-bottom: 20px;
    line-height: 1.6;
  }
  
  .visualization {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    min-height: 400px;
  }
  
  .visualization-container {
    min-height: 360px;
  }
  
  /* Стили для анимации */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  
  /* Стили для визуализации компонента */
  .component-creation {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .code-block {
    background-color: #2d2d2d;
    color: #fff;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
  }
  
  .code-block pre {
    margin: 0;
    white-space: pre-wrap;
    font-family: monospace;
  }
  
  .animation-box {
    display: flex;
    justify-content: center;
    padding: 20px;
  }
  
  .app-instance {
    width: 300px;
    padding: 20px;
    background-color: #e3f2fd;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
  }
  
  .app-instance.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .code-label {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .instance-props {
    margin-top: 15px;
    border-top: 1px solid #ccc;
    padding-top: 15px;
  }
  
  .prop {
    margin-bottom: 8px;
    font-family: monospace;
  }
  
  /* Стили для визуализации компиляции */
  .template-compilation {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .split-view {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .template-code, .render-function {
    flex: 1;
    background-color: #2d2d2d;
    color: #fff;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
  }
  
  .code-title {
    color: #42b883;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .code-explanation {
    background-color: #f0f0f0;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #42b883;
  }
  
  /* Стили для виртуального DOM */
  .virtual-dom-visualization {
    padding: 20px;
    border: 1px dashed #42b883;
    border-radius: 8px;
    margin: 20px 0;
    opacity: 0.7;
    transition: all 0.5s ease;
  }
  
  .virtual-dom-visualization.animate-vdom {
    opacity: 1;
    border-style: solid;
    background-color: #f0fff4;
  }
  
  .vdom-node {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 10px;
  }
  
  .root {
    margin-left: 0;
  }
  
  .node-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #34495e;
  }
  
  .node-children {
    margin-left: 30px;
  }
  
  .child {
    margin-top: 10px;
    background-color: #f9f9f9;
  }
  
  .node-content {
    margin-top: 5px;
    padding: 5px;
    background-color: #f0f0f0;
    border-radius: 4px;
    font-family: monospace;
  }
  
  .node-props {
    margin-top: 5px;
    color: #7f8c8d;
    font-size: 0.9rem;
    font-family: monospace;
  }
  
  .vdom-explanation {
    margin-top: 20px;
    line-height: 1.6;
  }
  
  /* Стили для монтирования */
  .dom-tree {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .dom-node {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    margin: 10px 0;
    background-color: white;
  }
  
  .html {
    border-color: #e74c3c;
  }
  
  .body {
    margin-left: 20px;
    border-color: #3498db;
  }
  
  .app {
    margin-left: 20px;
    border-color: #2ecc71;
  }
  
  .node-tag {
    font-family: monospace;
    color: #34495e;
  }
  
  .mounting-point {
    margin-left: 20px;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed #f39c12;
    background-color: #fffbeb;
    opacity: 0.7;
    transition: all 0.5s ease;
  }
  
  .mounting-point.mounted {
    opacity: 1;
    background-color: #f0fff4;
    border: 2px solid #42b883;
    display: block;
  }
  
  .mounting-label {
    font-weight: bold;
    color: #f39c12;
  }
  
  .trigger-button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .trigger-button:hover {
    background-color: #2c9a6b;
  }
  
  /* Стили для реактивности */
  .reactivity-visualization {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .data-object, .proxy-wrap {
    padding: 15px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .data-object {
    border: 1px solid #3498db;
  }
  
  .proxy-wrap {
    border: 1px solid #9b59b6;
  }
  
  .object-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #34495e;
  }
  
  .reactive-effects {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #ddd;
  }
  
  .effect {
    padding: 10px;
    border-radius: 4px;
    background-color: #f5f5f5;
    opacity: 0.7;
    transition: all 0.5s ease;
  }
  
  .effect.active {
    opacity: 1;
    background-color: #f0fff4;
  }
  
  .effect-title {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .effect-content {
    font-family: monospace;
    font-size: 0.9rem;
  }
  
  .dependency {
    margin-left: 10px;
    color: #e74c3c;
  }
  
  .reactivity-actions {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .action-button {
    padding: 8px 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .action-button:hover {
    background-color: #2980b9;
  }
  
  .action-result {
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 4px;
    border-left: 4px solid #3498db;
  }
  
  .action-code {
    font-family: monospace;
    margin-bottom: 10px;
    color: #e74c3c;
  }
  
  .action-flow div {
    margin-bottom: 5px;
  }
  
  /* Стили для патчинга DOM */
  .patching-visualization {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .vdom-comparison {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .vdom-before, .vdom-after {
    flex: 1;
    padding: 15px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .vdom-before {
    border: 1px solid #3498db;
  }
  
  .vdom-after {
    border: 1px solid #2ecc71;
  }
  
  .comparison-title {
    font-weight: bold;
    margin-bottom: 15px;
    text-align: center;
  }
  
  .comparison-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #7f8c8d;
  }
  
  .highlight {
    position: relative;
  }
  
  .highlight.changed {
    background-color: #f0fff4;
    border: 1px solid #2ecc71;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(46, 204, 113, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(46, 204, 113, 0);
    }
  }
  
  .patching-explanation {
    margin: 20px 0;
    line-height: 1.6;
  }
  
  /* Стили для третьей секции - Алгоритмы и оптимизации */
  .algorithms-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .algorithm-card {
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .algorithm-card h3 {
    color: #42b883;
    margin-top: 0;
    margin-bottom: 15px;
  }
  
  .algorithm-content {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .algorithm-description {
    flex: 1;
    line-height: 1.6;
  }
  
  .algorithm-code {
    flex: 1;
    background-color: #2d2d2d;
    color: #fff;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
  }
  
  .algorithm-code pre {
    margin: 0;
    font-family: monospace;
    font-size: 0.9rem;
  }
  
  .algorithm-benefits h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #34495e;
  }
  
  .algorithm-benefits ul {
    padding-left: 20px;
  }
  
  .algorithm-benefits li {
    margin-bottom: 5px;
  }
  
  /* Стили для четвертой секции - Подводные камни */
  .pitfalls-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 30px;
  }
  
  .pitfall-card {
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .pitfall-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px;
    background-color: #ffeecc;
    border-bottom: 1px solid #ffcc80;
  }
  
  .pitfall-icon {
    font-size: 1.5rem;
  }
  
  .pitfall-header h3 {
    margin: 0;
    color: #f39c12;
  }
  
  .pitfall-content {
    padding: 20px;
    background-color: white;
  }
  
  .pitfall-content p {
    margin-top: 0;
    line-height: 1.6;
  }
  
  .code-comparison {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 20px 0;
  }
  
  .wrong-code, .right-code {
    padding: 15px;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .wrong-code {
    background-color: #ffecec;
    border-left: 4px solid #e74c3c;
  }
  
  .right-code {
    background-color: #f0fff4;
    border-left: 4px solid #2ecc71;
  }
  
  .code-label {
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  .wrong-code .code-label {
    color: #e74c3c;
  }
  
  .right-code .code-label {
    color: #2ecc71;
  }
  
  .wrong-code pre, .right-code pre {
    margin: 0;
    white-space: pre-wrap;
    font-family: monospace;
    font-size: 0.9rem;
  }
  
  .pitfall-solution {
    margin-top: 20px;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .pitfall-solution h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #34495e;
  }
  
  .pitfall-solution p {
    margin: 0;
  }
  
  /* Стили для пятой секции - Практическое применение */
  .application-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
    margin-bottom: 40px;
  }
  
  .application-card {
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .application-icon {
    font-size: 2rem;
    margin-bottom: 15px;
  }
  
  .application-content h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #42b883;
  }
  
  .application-content p {
    margin-top: 0;
    line-height: 1.6;
  }
  
  .application-example {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #ddd;
  }
  
  .example-label {
    font-weight: bold;
    margin-bottom: 10px;
    color: #34495e;
  }
  
  .application-example pre {
    margin: 0;
    background-color: #2d2d2d;
    color: #fff;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
    font-family: monospace;
    font-size: 0.9rem;
  }
  
  .tips-container {
    margin-top: 40px;
    padding: 20px;
    background-color: #f0fff4;
    border-radius: 8px;
    border-left: 4px solid #42b883;
  }
  
  .tips-container h3 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #2c9a6b;
  }
  
  .tips-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .tip-item {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #dcdcdc;
  }
  
  .tip-item:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  
  .tip-number {
    width: 30px;
    height: 30px;
    background-color: #42b883;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  .tip-content {
    line-height: 1.6;
  }
  
  /* Медиа-запросы для адаптивной верстки */
  @media (max-width: 900px) {
    .process-container {
      flex-direction: column;
    }
    
    .timeline {
      width: 100%;
    }
    
    .algorithm-content {
      flex-direction: column;
    }
    
    .split-view {
      flex-direction: column;
    }
    
    .architecture-diagram {
      flex-direction: column;
      gap: 20px;
    }
    
    .box {
      width: 100%;
    }
    
    .arrow {
      transform: rotate(90deg);
    }
    
    .vdom-comparison {
      flex-direction: column;
    }
    
    .comparison-arrow {
      transform: rotate(90deg);
      margin: 10px 0;
    }
  }
  
  @media (max-width: 600px) {
    .pitfalls-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>