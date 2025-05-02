<template>
    <div class="emit-demo">
      <h1>Пользовательские события (emit) в Composition API</h1>
      <p class="intro">Узнайте, как работают пользовательские события в Vue 3 с использованием Composition API</p>
      
      <div class="tab-container">
        <div class="tabs">
          <button 
            v-for="(tab, index) in tabs" 
            :key="tab.id"
            :class="{ active: activeTab === index }"
            @click="setActiveTab(index)"
          >
            {{ tab.title }}
          </button>
        </div>
        
        <!-- Основная теория -->
        <div v-if="activeTab === 0" class="tab-content theory-tab">
          <div class="theory-section">
            <h2>Что такое emit в Composition API?</h2>
            <p>Во Vue 3 с Composition API, дочерние компоненты могут отправлять события (emit) родительским компонентам, что позволяет им взаимодействовать друг с другом.</p>
            
            <div class="info-box">
              <h3>Основные шаги для работы с emit:</h3>
              <ol>
                <li>В дочернем компоненте используйте <code>defineEmits()</code> для определения событий</li>
                <li>Вызывайте функцию emit для активации события</li>
                <li>В родительском компоненте прослушивайте события, используя <code>@имя-события</code></li>
              </ol>
            </div>
            
            <div class="comparison-table">
              <h3>Сравнение Options API и Composition API</h3>
              <table>
                <thead>
                  <tr>
                    <th>Options API</th>
                    <th>Composition API</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
  <pre>export default {
    emits: ['update', 'delete'],
    methods: {
      sendUpdate() {
        this.$emit('update', data)
      }
    }
  }</pre>
                    </td>
                    <td>
  <pre>export default {
    setup(props, { emit }) {
      // Вариант 1: через контекст
      const sendUpdate = () => {
        emit('update', data)
      }
      return { sendUpdate }
    }
  }
  
  // Вариант 2: defineEmits
  export default {
    setup() {
      const emit = defineEmits(['update', 'delete'])
      
      const sendUpdate = () => {
        emit('update', data)
      }
      return { sendUpdate }
    }
  }</pre>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="advantages">
              <h3>Преимущества emit в Composition API:</h3>
              <ul>
                <li>Типизация событий с TypeScript</li>
                <li>Явное определение в одном месте</li>
                <li>Более тесная интеграция с другими частями логики компонента</li>
                <li>Лучшая поддержка со стороны IDE</li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Демонстрация компонентов -->
        <div v-if="activeTab === 1" class="tab-content demo-tab">
          <h2>Демонстрация работы emit</h2>
          
          <div class="components-demo">
            <div class="parent-component">
              <div class="component-header">
                <h3>Родительский компонент</h3>
                <div class="component-badge">Parent.vue</div>
              </div>
              
              <div class="component-content">
                <p>Текущее состояние счетчика: <span class="counter-value">{{ counter }}</span></p>
                
                <div class="child-container" ref="childContainer">
                  <div class="child-component" :class="{ 'emitting': isEmitting }">
                    <div class="component-header">
                      <h3>Дочерний компонент</h3>
                      <div class="component-badge">Child.vue</div>
                    </div>
                    
                    <div class="component-content">
                      <p>Кнопки генерируют событие increment:</p>
                      <div class="button-group">
                        <button @click="emitIncrement(1)" class="emit-button">+1</button>
                        <button @click="emitIncrement(5)" class="emit-button">+5</button>
                        <button @click="emitIncrement(10)" class="emit-button">+10</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-if="isEmitting" class="emit-animation" ref="emitAnimation">
                  <div class="emit-message">
                    emit('increment', {{ lastEmitValue }})
                  </div>
                </div>
                
                <div class="event-log">
                  <h4>Журнал событий:</h4>
                  <div class="event-log-container">
                    <div v-for="(event, index) in eventLog" :key="index" class="event-item" :class="{ 'new-event': index === 0 }">
                      <span class="event-time">{{ event.time }}</span>
                      <span class="event-message">{{ event.message }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="code-view">
              <div class="code-selector">
                <button 
                  v-for="(code, index) in codeExamples" 
                  :key="code.id"
                  :class="{ active: activeCode === index }"
                  @click="activeCode = index"
                >
                  {{ code.title }}
                </button>
              </div>
              
              <div class="code-display">
                <pre><code>{{ codeExamples[activeCode].code }}</code></pre>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Пошаговое руководство -->
        <div v-if="activeTab === 2" class="tab-content guide-tab">
          <div class="guide-section">
            <h2>Пошаговое руководство</h2>
            
            <div v-for="(step, index) in tutorialSteps" 
                 :key="step.id" 
                 class="tutorial-step"
                 :class="{ 'active-step': activeStep === index }">
              <div class="step-header" @click="toggleStep(index)">
                <div class="step-number">{{ index + 1 }}</div>
                <h3 class="step-title">{{ step.title }}</h3>
                <div class="step-toggle">{{ activeStep === index ? '▼' : '▶' }}</div>
              </div>
              
              <div v-if="activeStep === index" class="step-content">
                <p v-html="step.description"></p>
                <pre><code>{{ step.code }}</code></pre>
                
                <div v-if="step.tips" class="step-tips">
                  <h4>Советы:</h4>
                  <ul>
                    <li v-for="(tip, i) in step.tips" :key="i">{{ tip }}</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="practical-examples">
              <h3>Практические сценарии использования emit</h3>
              <div class="examples-grid">
                <div class="example-card" v-for="(example, index) in practicalExamples" :key="index">
                  <div class="example-icon">{{ example.icon }}</div>
                  <h4>{{ example.title }}</h4>
                  <p>{{ example.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- TypeScript интеграция -->
        <div v-if="activeTab === 3" class="tab-content typescript-tab">
          <div class="typescript-section">
            <h2>Интеграция с TypeScript</h2>
            
            <p>TypeScript делает работу с emit в Composition API более безопасной и предсказуемой благодаря строгой типизации.</p>
            
            <div class="typescript-example">
              <h3>Базовый пример с типизацией</h3>
              <pre><code>// Дочерний компонент
  const emit = defineEmits&lt;{
    (e: 'increment', value: number): void
    (e: 'reset'): void
    (e: 'update', id: string, data: { name: string, value: number }): void
  }&gt;()
  
  // Теперь TypeScript будет проверять:
  // - Имена событий
  // - Количество аргументов
  // - Типы аргументов
  
  function handleClick() {
    emit('increment', 5) // ✓ Правильно
    emit('increment')    // ✗ Ошибка: отсутствует аргумент
    emit('increment', '5') // ✗ Ошибка: неверный тип аргумента
  }</code></pre>
            </div>
            
            <div class="typescript-benefits">
              <h3>Преимущества использования TypeScript с emit:</h3>
              <ul>
                <li>Автодополнение имен событий в IDE</li>
                <li>Проверка типов аргументов</li>
                <li>Проверка количества аргументов</li>
                <li>Лучшая документация компонентов</li>
                <li>Раннее обнаружение ошибок</li>
              </ul>
            </div>
            
            <div class="advanced-typescript">
              <h3>Продвинутый пример с типизацией</h3>
              <pre><code>// Описание интерфейсов для событий
  interface FormEvents {
    (e: 'submit', formData: FormData): void
    (e: 'validate', fieldName: string, isValid: boolean): void
    (e: 'change', fieldName: string, value: string | number | boolean): void
    (e: 'focus', fieldName: string): void
    (e: 'blur', fieldName: string): void
  }
  
  // Использование в компоненте
  const emit = defineEmits&lt;FormEvents&gt;()
  
  // В родительском компоненте (с правильной типизацией)
  &lt;FormComponent
    @submit="handleSubmit"  
    @validate="handleValidation"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
  /&gt;</code></pre>
            </div>
            
            <div class="typescript-tips">
              <h3>Советы по работе с TypeScript и emit:</h3>
              <ol>
                <li>Выносите интерфейсы событий в отдельные файлы для переиспользования</li>
                <li>Используйте более строгие типы вместо any</li>
                <li>Определите все возможные события заранее</li>
                <li>Комбинируйте с типизацией props для полной типобезопасности компонентов</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onBeforeUnmount } from 'vue';
  
  // Состояние вкладок
  const tabs = [
    { id: 'theory', title: 'Теория' },
    { id: 'demo', title: 'Демонстрация' },
    { id: 'guide', title: 'Руководство' },
    { id: 'typescript', title: 'TypeScript' }
  ];
  const activeTab = ref(0);
  
  const setActiveTab = (index) => {
    activeTab.value = index;
  };
  
  // Состояние счетчика для демонстрации
  const counter = ref(0);
  const isEmitting = ref(false);
  const lastEmitValue = ref(0);
  const childContainer = ref(null);
  const emitAnimation = ref(null);
  
  // Журнал событий
  const eventLog = ref([]);
  
  // Функция для имитации emit события
  const emitIncrement = (value) => {
    // Запускаем анимацию
    lastEmitValue.value = value;
    isEmitting.value = true;
    
    // Добавляем в журнал
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    eventLog.value.unshift({
      time: timeString,
      message: `Сгенерировано событие: increment(${value})`
    });
    
    // Ограничиваем журнал до 5 событий
    if (eventLog.value.length > 5) {
      eventLog.value.pop();
    }
    
    // Имитируем реакцию родительского компонента через 1 секунду
    setTimeout(() => {
      counter.value += value;
      
      eventLog.value.unshift({
        time: timeString,
        message: `Обработано родителем: счетчик увеличен на ${value}`
      });
      
      if (eventLog.value.length > 5) {
        eventLog.value.pop();
      }
      
      // Завершаем анимацию
      isEmitting.value = false;
    }, 1000);
  };
  
  // Код примеров
  const codeExamples = [
    {
      id: 'child',
      title: 'Child.vue',
      code: `<template>
    <div class="child-component">
      <h3>Дочерний компонент</h3>
      <p>Кнопки генерируют событие increment:</p>
      <div class="button-group">
        <button @click="handleIncrement(1)">+1</button>
        <button @click="handleIncrement(5)">+5</button>
        <button @click="handleIncrement(10)">+10</button>
      </div>
    </div>
  </template>
  
  <script setup>
  // Определяем emit с помощью макроса defineEmits
  const emit = defineEmits(['increment']);
  
  // Функция для генерации события
  const handleIncrement = (value) => {
    emit('increment', value);
  };
 `
    },
    {
      id: 'parent',
      title: 'Parent.vue',
      code: `<template>
    <div class="parent-component">
      <h3>Родительский компонент</h3>
      <p>Текущее состояние счетчика: {{ counter }}</p>
      
      <!-- Обрабатываем событие increment от дочернего компонента -->
      <ChildComponent @increment="handleIncrement" />
      
      <div class="event-log">
        <h4>Журнал событий:</h4>
        <div v-for="(event, index) in eventLog" :key="index">
          {{ event.time }} - {{ event.message }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import ChildComponent from './Child.vue';
  
  // Состояние счетчика
  const counter = ref(0);
  const eventLog = ref([]);
  
  // Обработчик события increment
  const handleIncrement = (value) => {
    counter.value += value;
    
    // Добавляем событие в журнал
    const now = new Date();
    const timeString = \`\${now.getHours()}:\${now.getMinutes()}:\${now.getSeconds()}\`;
    
    eventLog.value.unshift({
      time: timeString,
      message: \`Обработано родителем: счетчик увеличен на \${value}\`
    });
  };
 `
    },
    {
      id: 'typescript',
      title: 'С TypeScript',
      code: `<template>
    <div class="child-component">
      <!-- Шаблон как обычно -->
      <button @click="handleIncrement(1)">+1</button>
    </div>
  </template>
  
  <script setup lang="ts">
  // Типизированный emit
  const emit = defineEmits<{
    (e: 'increment', value: number): void
    (e: 'reset'): void
  }>()
  
  // TypeScript проверит правильность аргументов
  const handleIncrement = (value: number) => {
    emit('increment', value); // ✓ Правильно
    
    // Следующие строки вызовут ошибку TypeScript:
    // emit('nonexistent', 5); // ✗ Неизвестное событие
    // emit('increment', 'hello'); // ✗ Неверный тип
    // emit('reset', 42); // ✗ Лишний аргумент
  };
 `
    }
  ];
  const activeCode = ref(0);
  
  // Шаги руководства
  const tutorialSteps = [
    {
      id: 'step1',
      title: 'Определение emit в дочернем компоненте',
      description: 'Первым шагом необходимо определить, какие события будет генерировать компонент.',
      code: `<script setup>
  // Вариант 1: Использование defineEmits
  const emit = defineEmits(['increment', 'decrement', 'reset'])
  
  // Вариант 2: Через контекст setup (устаревший способ)
  export default {
    setup(props, { emit }) {
      // ...использование emit
    }
  }
 `,
      tips: [
        'Указывайте все возможные события в массиве defineEmits',
        'Придерживайтесь kebab-case для названия событий (например, "update-value" вместо "updateValue")',
        'Используйте глаголы или конструкции "on-что-то" в названиях событий'
      ]
    },
    {
      id: 'step2',
      title: 'Генерация событий в дочернем компоненте',
      description: 'После определения emit вы можете генерировать события в ответ на действия пользователя или другие изменения.',
      code: `<template>
    <button @click="sendIncrement">Увеличить счетчик</button>
    <button @click="resetCounter">Сбросить</button>
  </template>
  
  <script setup>
  const emit = defineEmits(['increment', 'reset'])
  
  // Функции, которые генерируют события
  const sendIncrement = () => {
    // Можно передавать данные как дополнительные аргументы
    emit('increment', 1)
  }
  
  const resetCounter = () => {
    // Событие может быть без данных
    emit('reset')
  }
  `,
      tips: [
        'Можно передавать несколько аргументов: emit("update", id, name, value)',
        'Используйте объекты для передачи сложных данных',
        'Генерируйте события только когда это действительно необходимо'
      ]
    },
    {
      id: 'step3',
      title: 'Прослушивание событий в родительском компоненте',
      description: 'Родительский компонент должен прослушивать события, генерируемые дочерним компонентом.',
      code: `<template>
    <!-- Обрабатываем события от дочернего компонента -->
    <ChildComponent 
      @increment="handleIncrement"
      @reset="resetCounter"
    />
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ChildComponent from './ChildComponent.vue'
  
  const counter = ref(0)
  
  // Обработчики событий
  const handleIncrement = (value) => {
    counter.value += value
  }
  
  const resetCounter = () => {
    counter.value = 0
  }
  `,
      tips: [
        'Используйте v-on или @ для прослушивания событий',
        'Обработчики могут быть как встроенными выражениями, так и методами',
        'Данные из emit доступны как аргументы обработчика'
      ]
    },
    {
      id: 'step4',
      title: 'Валидация событий',
      description: 'Vue позволяет валидировать данные событий, что делает компоненты более надежными.',
      code: `<script setup>
  // Определение событий с валидацией
  const emit = defineEmits({
    // Базовая валидация - событие может быть вызвано с любыми аргументами
    'reset': null,
    
    // Сложная валидация с функцией проверки
    'increment': (value) => {
      // Возвращаем true если аргумент валидный
      if (typeof value !== 'number') {
        console.warn('increment event should receive a number')
        return false
      }
      
      if (value <= 0) {
        console.warn('increment value should be positive')
        return false
      }
      
      return true
    }
  })
  `,
      tips: [
        'Валидация помогает найти ошибки на ранней стадии',
        'В функциях валидации можно также изменять данные перед проверкой',
        'Возвращайте false чтобы указать на ошибку валидации'
      ]
    },
    {
      id: 'step5',
      title: 'Типизация emit с TypeScript',
      description: 'TypeScript позволяет строго типизировать события, что делает код более надежным.',
      code: `<script setup lang="ts">
  // Типизированное определение emit
  const emit = defineEmits<{
    (e: 'increment', value: number): void
    (e: 'update', id: string, newValue: string): void
    (e: 'select', items: Array<{ id: string, name: string }>): void
    (e: 'reset'): void
  }>()
  
  // TypeScript будет проверять правильность аргументов
  const handleClick = () => {
    emit('increment', 5) // ✓ Правильно
    // emit('increment', '5') // ✗ Ошибка типа
    // emit('unknown') // ✗ Неизвестное событие
  }
  `,
      tips: [
        'Используйте интерфейсы для повторного использования типов событий',
        'TypeScript поможет избежать ошибок в именах событий и типах данных',
        'IDE будет предлагать автодополнение для событий и их аргументов'
      ]
    }
  ];
  const activeStep = ref(0);
  
  const toggleStep = (index) => {
    if (activeStep.value === index) {
      activeStep.value = -1;
    } else {
      activeStep.value = index;
    }
  };
  
  // Практические примеры
  const practicalExamples = [
    {
      icon: '📝',
      title: 'Формы и валидация',
      description: 'Дочерние компоненты полей формы генерируют события при вводе, изменении, фокусе и валидации.'
    },
    {
      icon: '🔄',
      title: 'Пагинация',
      description: 'Компонент пагинации генерирует события при смене страницы, изменении размера страницы и т.д.'
    },
    {
      icon: '🔍',
      title: 'Фильтрация данных',
      description: 'Компоненты фильтров уведомляют родителя о выбранных фильтрах через события.'
    },
    {
      icon: '📊',
      title: 'Графики и диаграммы',
      description: 'Компоненты визуализации генерируют события при взаимодействии с элементами графика.'
    },
    {
      icon: '🎭',
      title: 'Модальные окна',
      description: 'Модальные окна генерируют события закрытия, подтверждения, отмены действий.'
    },
    {
      icon: '🗂️',
      title: 'Древовидные структуры',
      description: 'Компоненты деревьев генерируют события при раскрытии, закрытии, выборе узлов.'
    }
  ];
  
  // Автоматическое закрытие анимации emit при демонтировании
  const animationTimeout = null;
  onBeforeUnmount(() => {
    if (animationTimeout) {
      clearTimeout(animationTimeout);
    }
  });
  </script>
  
  <style scoped>
  .emit-demo {
    font-family: 'Arial', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
  }
  
  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  .intro {
    text-align: center;
    color: #666;
    margin-bottom: 30px;
  }
  
  /* Стили для табов */
  .tab-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .tabs {
    display: flex;
    background-color: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
    overflow-x: auto;
  }
  
  .tabs button {
    padding: 12px 20px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #606266;
    transition: all 0.3s;
    white-space: nowrap;
  }
  
  .tabs button:hover {
    color: #409eff;
  }
  
  .tabs button.active {
    color: #409eff;
    border-bottom: 2px solid #409eff;
  }
  
  .tab-content {
    padding: 25px;
    animation: fadeIn 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Стили для теоретической части */
  .theory-section {
    line-height: 1.6;
  }
  
  .info-box {
    background-color: #f2f6fc;
    border-left: 4px solid #409eff;
    padding: 15px;
    margin: 20px 0;
    border-radius: 4px;
  }
  
  .comparison-table {
    margin: 25px 0;
    overflow-x: auto;
  }
  
  .comparison-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .comparison-table th {
    background-color: #f5f7fa;
    padding: 12px;
    text-align: left;
    border-bottom: 2px solid #ebeef5;
  }
  
  .comparison-table td {
    padding: 12px;
    border-bottom: 1px solid #ebeef5;
    vertical-align: top;
  }
  
  .comparison-table pre {
    margin: 0;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
    overflow-x: auto;
  }
  
  .advantages {
    background-color: #f0f9eb;
    border-left: 4px solid #67c23a;
    padding: 15px;
    margin: 20px 0;
    border-radius: 4px;
  }
  
  .advantages ul {
    padding-left: 20px;
  }
  
  .advantages li {
    margin-bottom: 8px;
  }
  
  /* Стили для демонстрации */
  .components-demo {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .parent-component {
    border: 2px solid #409eff;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }
  
  .component-header {
    background-color: #ecf5ff;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d9ecff;
  }
  
  .component-header h3 {
    margin: 0;
    color: #409eff;
  }
  
  .component-badge {
    background-color: #409eff;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
  }
  
  .component-content {
    padding: 15px;
  }
  
  .child-container {
    position: relative;
    margin: 20px 0;
  }
  
  .child-component {
    border: 2px solid #67c23a;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .child-component.emitting {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(103, 194, 58, 0.2);
  }
  
  .child-component .component-header {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
  }
  
  .child-component .component-header h3 {
    color: #67c23a;
  }
  
  .child-component .component-badge {
    background-color: #67c23a;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  
  .emit-button {
    padding: 8px 16px;
    background-color: #67c23a;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .emit-button:hover {
    background-color: #85ce61;
  }
  
  .emit-animation {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
    pointer-events: none;
  }
  
  .emit-message {
    display: inline-block;
    background-color: #67c23a;
    color: white;
    padding: 8px 15px;
    border-radius: 20px;
    font-family: monospace;
    animation: moveUp 1s forwards;
  }
  
  @keyframes moveUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
      transform: translateY(-20px);
    }
    100% {
      opacity: 0;
      transform: translateY(-40px);
    }
  }
  
  .event-log {
    margin-top: 20px;
    border-top: 1px solid #ebeef5;
    padding-top: 15px;
  }
  
  .event-log h4 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .event-log-container {
    height: 150px;
    overflow-y: auto;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    padding: 10px;
    background-color: #f9f9f9;
  }
  
  .event-item {
    padding: 6px 0;
    border-bottom: 1px solid #ebeef5;
    display: flex;
    align-items: center;
    transition: background-color 0.3s;
  }
  
  .event-item:last-child {
    border-bottom: none;
  }
  
  .event-item.new-event {
    background-color: #f0f9eb;
  }
  
  .event-time {
    font-family: monospace;
    color: #909399;
    margin-right: 10px;
  }
  
  .event-message {
    flex: 1;
  }
  
  .counter-value {
    font-weight: bold;
    color: #409eff;
    font-size: 1.2rem;
  }
  
  .code-view {
    border: 1px solid #dcdfe6;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .code-selector {
    display: flex;
    background-color: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
  }
  
  .code-selector button {
    padding: 10px 15px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: #606266;
    transition: all 0.3s;
  }
  
  .code-selector button:hover {
    color: #409eff;
  }
  
  .code-selector button.active {
    color: #409eff;
    border-bottom: 2px solid #409eff;
  }
  
  .code-display {
    padding: 15px;
    max-height: 600px;
    overflow-y: auto;
  }
  
  .code-display pre {
    margin: 0;
    font-family: 'Courier New', monospace;
    line-height: 1.5;
    white-space: pre-wrap;
    background-color: #f8f8f8;
    padding: 10px;
    border-radius: 4px;
  }
  
  /* Стили для руководства */
  .guide-section {
    line-height: 1.6;
  }
  
  .tutorial-step {
    margin-bottom: 15px;
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    overflow: hidden;
  }
  
  .step-header {
    display: flex;
    align-items: center;
    padding: 12px 15px;
    background-color: #f5f7fa;
    cursor: pointer;
  }
  
  .step-number {
    width: 28px;
    height: 28px;
    background-color: #409eff;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 15px;
  }
  
  .step-title {
    flex: 1;
    margin: 0;
    font-size: 16px;
  }
  
  .step-toggle {
    font-size: 12px;
    color: #909399;
  }
  
  .active-step .step-header {
    background-color: #ecf5ff;
  }
  
  .step-content {
    padding: 15px;
    animation: fadeIn 0.3s ease;
  }
  
  .step-content pre {
    margin: 15px 0;
    background-color: #f8f8f8;
    padding: 10px;
    border-radius: 4px;
    overflow-x: auto;
  }
  
  .step-tips {
    background-color: #fff6f7;
    padding: 10px 15px;
    border-radius: 4px;
    border-left: 3px solid #f56c6c;
    margin-top: 15px;
  }
  
  .step-tips h4 {
    margin-top: 0;
    color: #f56c6c;
  }
  
  .practical-examples {
    margin-top: 30px;
  }
  
  .examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .example-card {
    background-color: #f5f7fa;
    border-radius: 8px;
    padding: 20px;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .example-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .example-icon {
    font-size: 24px;
    margin-bottom: 15px;
  }
  
  .example-card h4 {
    margin: 0 0 10px 0;
    color: #303133;
  }
  
  .example-card p {
    margin: 0;
    color: #606266;
    font-size: 14px;
  }
  
  /* Стили для TypeScript интеграции */
  .typescript-section {
    line-height: 1.6;
  }
  
  .typescript-example {
    margin: 25px 0;
  }
  
  .typescript-example pre {
    background-color: #f8f8f8;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    line-height: 1.5;
  }
  
  .typescript-benefits {
    background-color: #f0f9eb;
    border-left: 4px solid #67c23a;
    padding: 15px;
    margin: 25px 0;
    border-radius: 4px;
  }
  
  .typescript-benefits ul {
    padding-left: 20px;
  }
  
  .typescript-benefits li {
    margin-bottom: 8px;
  }
  
  .advanced-typescript {
    margin: 25px 0;
  }
  
  .typescript-tips {
    background-color: #fdf6ec;
    border-left: 4px solid #e6a23c;
    padding: 15px;
    margin: 25px 0;
    border-radius: 4px;
  }
  
  .typescript-tips ol {
    padding-left: 20px;
  }
  
  .typescript-tips li {
    margin-bottom: 8px;
  }
  
  /* Медиа-запросы для адаптивности */
  @media (max-width: 992px) {
    .components-demo {
      grid-template-columns: 1fr;
    }
    
    .parent-component {
      margin-bottom: 20px;
    }
  }
  
  @media (max-width: 768px) {
    .tabs {
      flex-wrap: wrap;
    }
    
    .tabs button {
      flex: 1;
      min-width: 120px;
    }
    
    .examples-grid {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    }
  }
  
  @media (max-width: 576px) {
    .tab-content {
      padding: 15px 10px;
    }
    
    .examples-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>