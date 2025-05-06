<template>
    <div class="props-explorer">
      <h1 class="title">Свойства компонентов Vue.js (Props)</h1>
      <p class="intro">Изучите, как props передают данные от родительских компонентов к дочерним</p>
      
      <div class="navigation">
        <button 
          v-for="(section, index) in sections" 
          :key="section.id"
          :class="{ active: currentSection === index }"
          @click="changeSection(index)"
        >
          {{ section.title }}
        </button>
      </div>
      
      <!-- Основная секция что такое Props -->
      <div v-if="currentSection === 0" class="section basics">
        <h2>Что такое Props?</h2>
        
        <div class="definition-card">
          <div class="definition">
            <strong>Props</strong> (сокращение от "properties" - свойства) — это специальный механизм для <em>односторонней передачи данных</em> от родительского компонента к дочернему компоненту.
          </div>
        </div>
        
        <div class="key-points">
          <h3>Ключевые особенности Props:</h3>
          <ul>
            <li>
              <div class="point-icon">↓</div>
              <div class="point-text">Однонаправленный поток данных (сверху вниз)</div>
            </li>
            <li>
              <div class="point-icon">🔒</div>
              <div class="point-text">Props доступны только для чтения в дочернем компоненте</div>
            </li>
            <li>
              <div class="point-icon">📝</div>
              <div class="point-text">Изменяются только в родительском компоненте</div>
            </li>
            <li>
              <div class="point-icon">🔄</div>
              <div class="point-text">При изменении props автоматически обновляется дочерний компонент</div>
            </li>
          </ul>
        </div>
        
        <div class="animation-container">
          <div class="components-flow">
            <div class="parent-component">
              <div class="component-header">Родительский компонент</div>
              <div class="component-content">
                <div class="data-item">
                  <span class="property">message:</span>
                  <span class="value" contenteditable @blur="updateMessage">{{ parentMessage }}</span>
                </div>
                <div class="component-code">
                  <div class="code-line">&lt;ChildComponent :message="message" /&gt;</div>
                </div>
              </div>
            </div>
            
            <div class="data-flow" :class="{ active: animateFlow }">
              <div class="flow-line"></div>
              <div class="flow-arrow"></div>
              <div class="flow-label">props</div>
              <div class="data-packet">{{ parentMessage }}</div>
            </div>
            
            <div class="child-component">
              <div class="component-header">Дочерний компонент</div>
              <div class="component-content">
                <div class="props-definition">
                  <div class="code-line">defineProps(['message'])</div>
                </div>
                <div class="component-result">
                  <span>Получено: </span>
                  <span class="received-value">{{ parentMessage }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <button class="animate-button" @click="triggerAnimation">
            {{ animateFlow ? 'Анимация...' : 'Показать передачу данных' }}
          </button>
          <p class="hint">👆 Попробуйте изменить значение выше и нажать кнопку снова</p>
        </div>
      </div>
      
      <!-- Определение Props секция -->
      <div v-if="currentSection === 1" class="section defining">
        <h2>Определение Props</h2>
        
        <div class="tabs">
          <button 
            v-for="(tab, index) in definingTabs" 
            :key="tab.id"
            :class="{ active: currentDefiningTab === index }"
            @click="currentDefiningTab = index"
          >
            {{ tab.title }}
          </button>
        </div>
        
        <!-- Простой синтаксис определения props -->
        <div v-if="currentDefiningTab === 0" class="tab-content">
          <h3>Простой синтаксис (массив)</h3>
          <div class="code-example">
            <pre><code>// В теге script setup
  defineProps(['name', 'age', 'isActive'])
  
  // Использование в шаблоне
  &lt;div&gt;
    Имя: {{ name }}, Возраст: {{ age }}, Активен: {{ isActive ? 'Да' : 'Нет' }}
  &lt;/div&gt;</code></pre>
          </div>
          
          <div class="pros-cons">
            <div class="pros">
              <h4>Преимущества</h4>
              <ul>
                <li>Простота использования</li>
                <li>Минимальный код</li>
                <li>Удобно для быстрого прототипирования</li>
              </ul>
            </div>
            <div class="cons">
              <h4>Недостатки</h4>
              <ul>
                <li>Отсутствие типизации</li>
                <li>Нет валидации данных</li>
                <li>Нет значений по умолчанию</li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Продвинутый синтаксис определения props -->
        <div v-if="currentDefiningTab === 1" class="tab-content">
          <h3>Продвинутый синтаксис (с типизацией)</h3>
          <div class="code-example">
            <pre><code>// В теге script setup
  defineProps({
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      default: 18
    },
    isActive: {
      type: Boolean,
      default: false
    }
  })</code></pre>
          </div>
          
          <div class="props-options">
            <h4>Доступные опции свойств:</h4>
            <table>
              <thead>
                <tr>
                  <th>Опция</th>
                  <th>Описание</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>type</code></td>
                  <td>Тип данных (String, Number, Boolean, Array, Object, Function, Date, Symbol)</td>
                </tr>
                <tr>
                  <td><code>required</code></td>
                  <td>Является ли свойство обязательным (true/false)</td>
                </tr>
                <tr>
                  <td><code>default</code></td>
                  <td>Значение по умолчанию, если свойство не передано</td>
                </tr>
                <tr>
                  <td><code>validator</code></td>
                  <td>Функция для дополнительной валидации значения</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="example-card">
            <h4>Пример с валидацией:</h4>
            <pre><code>defineProps({
    status: {
      type: String,
      required: true,
      // Проверяем, что статус один из перечисленных
      validator: (value) => {
        return ['active', 'inactive', 'pending'].includes(value)
      }
    }
  })</code></pre>
          </div>
        </div>
        
        <!-- Синтаксис с TypeScript -->
        <div v-if="currentDefiningTab === 2" class="tab-content">
          <h3>TypeScript синтаксис</h3>
          <div class="code-example">
            <pre><code>// В теге script setup с TypeScript
  defineProps&lt;{
    name: string
    age?: number
    isActive?: boolean
    items: string[]
    user: {
      id: number
      email: string
    }
  }&gt;()</code></pre>
          </div>
          
          <div class="note-box">
            <p>Обратите внимание:</p>
            <ul>
              <li>Используется дженерик-синтаксис TypeScript <code>&lt;{ ... }&gt;</code></li>
              <li>Знак <code>?</code> означает необязательное свойство</li>
              <li>При использовании этого синтаксиса нельзя задать значения по умолчанию напрямую</li>
            </ul>
          </div>
          
          <div class="example-card">
            <h4>Решение с withDefaults:</h4>
            <pre><code>// Используя withDefaults для задания значений по умолчанию
  interface Props {
    name: string
    age?: number
    isActive?: boolean
  }
  
  const props = withDefaults(defineProps&lt;Props&gt;(), {
    age: 18,
    isActive: false
  })</code></pre>
          </div>
        </div>
      </div>
      
      <!-- Использование Props секция -->
      <div v-if="currentSection === 2" class="section usage">
        <h2>Использование Props</h2>
        
        <div class="usage-example">
          <h3>Полный пример</h3>
          
          <div class="components-example">
            <!-- Пример родительского компонента -->
            <div class="example-component parent">
              <div class="component-title">Родительский компонент (Parent.vue)</div>
              <div class="component-code">
                <pre><code>&lt;template&gt;
    &lt;div class="parent"&gt;
      &lt;h2&gt;Карточка пользователя&lt;/h2&gt;
      
      &lt;UserProfile
        :user="currentUser"
        :is-admin="isAdmin"
        :themes="availableThemes"
        :change-theme="changeUserTheme"
      /&gt;
    &lt;/div&gt;
  &lt;/template&gt;
  
  &lt;script setup&gt;
  import { ref } from 'vue'
  import UserProfile from './UserProfile.vue'
  
  const isAdmin = ref(true)
  
  const currentUser = ref({
    id: 1,
    name: 'Иван Петров',
    email: 'ivan@example.com',
    theme: 'light'
  })
  
  const availableThemes = ref(['light', 'dark', 'blue', 'green'])
  
  function changeUserTheme(newTheme) {
    currentUser.value.theme = newTheme
    console.log(`Тема изменена на: ${newTheme}`)
  }
  &lt;/script&gt;</code></pre>
              </div>
            </div>
            
            <!-- Пример дочернего компонента -->
            <div class="example-component child">
              <div class="component-title">Дочерний компонент (UserProfile.vue)</div>
              <div class="component-code">
                <pre><code>&lt;template&gt;
    &lt;div class="user-profile" :class="user.theme"&gt;
      &lt;h3&gt;{{ user.name }}&lt;/h3&gt;
      &lt;p&gt;Email: {{ user.email }}&lt;/p&gt;
      
      &lt;div v-if="isAdmin" class="theme-selector"&gt;
        &lt;p&gt;Выбрать тему:&lt;/p&gt;
        &lt;button 
          v-for="theme in themes" 
          :key="theme"
          @click="changeTheme(theme)"
        &gt;
          {{ theme }}
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/template&gt;
  
  &lt;script setup&gt;
  // Определение принимаемых свойств
  const props = defineProps({
    user: {
      type: Object,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    themes: {
      type: Array,
      default: () => ['light', 'dark']
    },
    changeTheme: {
      type: Function,
      required: true
    }
  })
  
  // Использование функции из props
  function changeTheme(theme) {
    props.changeTheme(theme)
  }
  &lt;/script&gt;</code></pre>
              </div>
            </div>
          </div>
          
          <div class="live-example">
            <h4>Интерактивная демонстрация</h4>
            
            <div class="demo-component">
              <div class="user-profile" :class="selectedTheme">
                <h3>{{ demoUser.name }}</h3>
                <p>Email: {{ demoUser.email }}</p>
                
                <div class="theme-selector">
                  <p>Выбрать тему:</p>
                  <button 
                    v-for="theme in demoThemes" 
                    :key="theme"
                    @click="selectedTheme = theme"
                    :class="{ active: selectedTheme === theme }"
                  >
                    {{ theme }}
                  </button>
                </div>
              </div>
            </div>
            
            <div class="data-flow-visualization">
              <div class="data-item">
                <div class="prop-name">user</div>
                <div class="prop-value">{{ JSON.stringify(demoUser) }}</div>
                <div class="flow-arrow"></div>
              </div>
              
              <div class="data-item">
                <div class="prop-name">themes</div>
                <div class="prop-value">{{ JSON.stringify(demoThemes) }}</div>
                <div class="flow-arrow"></div>
              </div>
              
              <div class="data-item">
                <div class="prop-name">selectedTheme</div>
                <div class="prop-value">{{ JSON.stringify(selectedTheme) }}</div>
                <div class="flow-arrow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Лучшие практики секция -->
      <div v-if="currentSection === 3" class="section best-practices">
        <h2>Лучшие практики работы с Props</h2>
        
        <div class="practices-grid">
          <div class="practice-card">
            <div class="practice-icon">✓</div>
            <div class="practice-content">
              <h3>Всегда используйте типизацию</h3>
              <p>Определяйте типы для всех props с помощью объектного синтаксиса или TypeScript для повышения надежности кода.</p>
              <div class="example">
                <pre><code>// Хорошо
  defineProps({
    count: { type: Number, required: true }
  })
  
  // Ещё лучше (TypeScript)
  defineProps&lt;{
    count: number
  }&gt;()</code></pre>
              </div>
            </div>
          </div>
          
          <div class="practice-card">
            <div class="practice-icon">✓</div>
            <div class="practice-content">
              <h3>Используйте kebab-case в шаблонах</h3>
              <p>При передаче props в компоненты всегда используйте kebab-case в HTML, даже если в JavaScript они определены в camelCase.</p>
              <div class="example">
                <pre><code>&lt;!-- В шаблоне родителя --&gt;
  &lt;UserProfile :user-name="name" :is-admin="isAdmin" /&gt;
  
  // В дочернем компоненте
  defineProps({
    userName: String, // доступен как props.userName
    isAdmin: Boolean
  })</code></pre>
              </div>
            </div>
          </div>
          
          <div class="practice-card warning">
            <div class="practice-icon">✗</div>
            <div class="practice-content">
              <h3>Никогда не изменяйте props напрямую</h3>
              <p>Props должны быть обработаны как иммутабельные данные в дочерних компонентах.</p>
              <div class="example">
                <pre><code>// Плохо - мутация props
  const props = defineProps(['user'])
  props.user.name = 'Новое имя' // Неправильно!
  
  // Хорошо - использование внутреннего состояния
  const props = defineProps(['initialCount'])
  const count = ref(props.initialCount) // Локальная копия</code></pre>
              </div>
            </div>
          </div>
          
          <div class="practice-card">
            <div class="practice-icon">✓</div>
            <div class="practice-content">
              <h3>Обеспечьте значения по умолчанию</h3>
              <p>Всегда предоставляйте разумные значения по умолчанию для необязательных props.</p>
              <div class="example">
                <pre><code>defineProps({
    size: {
      type: String,
      // Разумное значение по умолчанию
      default: 'medium' 
    },
    items: {
      type: Array,
      // Для объектов и массивов используйте фабричную функцию
      default: () => [] 
    }
  })</code></pre>
              </div>
            </div>
          </div>
          
          <div class="practice-card">
            <div class="practice-icon">✓</div>
            <div class="practice-content">
              <h3>Используйте валидацию</h3>
              <p>Добавляйте валидаторы для обеспечения корректности входных данных.</p>
              <div class="example">
                <pre><code>defineProps({
    status: {
      type: String,
      validator: (value) => {
        return ['active', 'inactive', 'pending'].includes(value)
      }
    },
    score: {
      type: Number,
      validator: (value) => value >= 0 && value &lt;= 100
    }
  })</code></pre>
              </div>
            </div>
          </div>
          
          <div class="practice-card warning">
            <div class="practice-icon">⚠</div>
            <div class="practice-content">
              <h3>Будьте осторожны с объектами и массивами</h3>
              <p>Помните, что массивы и объекты передаются по ссылке, поэтому изменения в родительском компоненте напрямую влияют на дочерний.</p>
              <div class="example">
                <pre><code>// Родительский компонент
  const items = ref([1, 2, 3])
  // &lt;ItemsList :items="items" /&gt;
  
  // Дочерний компонент
  // Изменение массива здесь может изменить родительские данные!
  // Лучше создать локальную копию, если нужна модификация
  const localItems = ref([...props.items])</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Модель родитель-потомок секция -->
      <div v-if="currentSection === 4" class="section communication">
        <h2>Двусторонняя коммуникация с v-model</h2>
        
        <div class="two-way-explanation">
          <p>Props обеспечивают передачу данных <strong>только от родителя к потомку</strong>. Но что, если потомок должен обновить данные в родителе?</p>
          
          <div class="communication-diagram">
            <div class="parent-box">
              <div class="box-title">Родитель</div>
              <div class="box-content">
                <div class="data-value">{{ twoWayValue }}</div>
                <div class="code-snippet">v-model="value"</div>
              </div>
            </div>
            
            <div class="communication-arrows">
              <div class="down-arrow">
                <span class="arrow">↓</span>
                <span class="label">props: modelValue</span>
              </div>
              <div class="up-arrow">
                <span class="arrow">↑</span>
                <span class="label">emit: update:modelValue</span>
              </div>
            </div>
            
            <div class="child-box">
              <div class="box-title">Дочерний</div>
              <div class="box-content">
                <div class="code-snippet">defineProps(['modelValue'])</div>
                <div class="code-snippet">defineEmits(['update:modelValue'])</div>
                <input 
                  type="text" 
                  :value="twoWayValue" 
                  @input="updateTwoWayValue($event.target.value)" 
                  class="demo-input"
                />
              </div>
            </div>
          </div>
          
          <div class="code-example-split">
            <div class="code-part">
              <h4>Родительский компонент</h4>
              <pre><code>&lt;template&gt;
    &lt;div&gt;
      &lt;p&gt;Значение: {{ value }}&lt;/p&gt;
      &lt;CustomInput v-model="value" /&gt;
    &lt;/div&gt;
  &lt;/template&gt;
  
  &lt;script setup&gt;
  import { ref } from 'vue'
  import CustomInput from './CustomInput.vue'
  
  const value = ref('Привет')
  &lt;/script&gt;</code></pre>
            </div>
            
            <div class="code-part">
              <h4>Дочерний компонент (CustomInput.vue)</h4>
              <pre><code>&lt;template&gt;
    &lt;input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    &gt;
  &lt;/template&gt;
  
  &lt;script setup&gt;
  defineProps(['modelValue'])
  defineEmits(['update:modelValue'])
  &lt;/script&gt;</code></pre>
            </div>
          </div>
          
          <div class="info-box">
            <h4>Важно понимать:</h4>
            <ul>
              <li>
                <strong>v-model</strong> — это просто синтаксический сахар для одновременной передачи props и прослушивания события
              </li>
              <li>
                По умолчанию v-model использует prop <code>modelValue</code> и событие <code>update:modelValue</code>
              </li>
              <li>
                Можно использовать несколько v-model с разными именами: <code>v-model:name</code>, <code>v-model:email</code> и т.д.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Секции навигации
  const sections = [
    { id: 'basics', title: 'Основы Props' },
    { id: 'defining', title: 'Определение Props' },
    { id: 'usage', title: 'Использование' },
    { id: 'best-practices', title: 'Лучшие практики' },
    { id: 'communication', title: 'Двусторонняя связь' }
  ]
  const currentSection = ref(0)
  
  // Переключение секций
  function changeSection(index) {
    currentSection.value = index
  }
  
  // Переменные для первой секции и анимации
  const parentMessage = ref('Привет из родителя')
  const animateFlow = ref(false)
  
  // Функция для запуска анимации
  function triggerAnimation() {
    if (animateFlow.value) return
    
    animateFlow.value = true
    setTimeout(() => {
      animateFlow.value = false
    }, 2000)
  }
  
  // Обновление сообщения при редактировании
  function updateMessage(event) {
    parentMessage.value = event.target.innerText
  }
  
  // Вкладки определения props
  const definingTabs = [
    { id: 'simple', title: 'Простой синтаксис' },
    { id: 'advanced', title: 'Продвинутый синтаксис' },
    { id: 'typescript', title: 'TypeScript' }
  ]
  const currentDefiningTab = ref(0)
  
  // Данные для демо-примера
  const demoUser = ref({
    name: 'Иван Петров',
    email: 'ivan@example.com'
  })
  const demoThemes = ['light', 'dark', 'blue', 'green']
  const selectedTheme = ref('light')
  
  // Для примера двусторонней связи
  const twoWayValue = ref('Изменить меня')
  
  function updateTwoWayValue(value) {
    twoWayValue.value = value
  }
  </script>
  
  <style scoped>
  .props-explorer {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
  }
  
  .title {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  .intro {
    text-align: center;
    color: #7f8c8d;
    margin-bottom: 40px;
  }
  
  /* Стили для навигации */
  .navigation {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }
  
  .navigation button {
    padding: 12px 20px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .navigation button:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
  }
  
  .navigation button.active {
    background-color: #4361ee;
    color: white;
    border-color: #4361ee;
    box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
  }
  
  /* Стили для секций */
  .section {
    background-color: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    animation: fadeIn 0.5s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .section h2 {
    font-size: 1.8rem;
    margin-bottom: 25px;
    color: #2c3e50;
    border-bottom: 2px solid #eaecef;
    padding-bottom: 10px;
  }
  
  /* Стили для первой секции "Основы" */
  .definition-card {
    background-color: #f8f9fa;
    border-left: 4px solid #4361ee;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 25px;
  }
  
  .definition {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .key-points {
    margin-bottom: 30px;
  }
  
  .key-points h3 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: #2c3e50;
  }
  
  .key-points ul {
    list-style: none;
    padding: 0;
  }
  
  .key-points li {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
  }
  
  .key-points li:hover {
    transform: translateX(5px);
  }
  
  .point-icon {
    width: 36px;
    height: 36px;
    background-color: #4361ee;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: 15px;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  
  .point-text {
    font-size: 1.1rem;
  }
  
  /* Стили для компонентов и анимации потока данных */
  .animation-container {
    margin-top: 40px;
  }
  
  .components-flow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  
  .parent-component, .child-component {
    width: 280px;
    background-color: #f8f9fa;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .component-header {
    background-color: #4361ee;
    color: white;
    padding: 10px;
    font-weight: bold;
    text-align: center;
  }
  
  .component-content {
    padding: 20px;
  }
  
  .data-item {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
  }
  
  .property {
    font-weight: bold;
    margin-right: 5px;
  }
  
  .value {
    color: #e74c3c;
    background-color: #f8f9fa;
    padding: 3px 6px;
    border-radius: 4px;
    outline: none;
    border: 1px dashed #ccc;
  }
  
  .value:focus {
    border-color: #4361ee;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.3);
  }
  
  .component-code {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 10px;
    border-radius: 6px;
    font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
    font-size: 0.9rem;
  }
  
  .code-line {
    white-space: nowrap;
    overflow-x: auto;
  }
  
  .props-definition {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 10px;
    border-radius: 6px;
    font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
    font-size: 0.9rem;
    margin-bottom: 15px;
  }
  
  .component-result {
    background-color: #e9ecef;
    padding: 10px;
    border-radius: 6px;
    font-size: 0.95rem;
  }
  
  .received-value {
    font-weight: bold;
    color: #e74c3c;
  }
  
  .data-flow {
    position: relative;
    width: 200px;
    height: 80px;
    margin: 0 20px;
  }
  
  .flow-line {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #ccc;
    transform: translateY(-50%);
  }
  
  .flow-arrow {
    position: absolute;
    top: 50%;
    right: 0;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 15px solid #ccc;
    transform: translateY(-50%);
  }
  
  .flow-label {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #6c757d;
    color: white;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
  }
  
  .data-packet {
    position: absolute;
    top: 50%;
    left: 10px;
    background-color: #4361ee;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.9rem;
    transform: translateY(-50%);
    opacity: 0;
    z-index: 1;
  }
  
  .data-flow.active .data-packet {
    animation: movePacket 2s ease;
  }
  
  @keyframes movePacket {
    0% {
      left: 10px;
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      left: 170px;
      opacity: 0;
    }
  }
  
  .data-flow.active .flow-line,
  .data-flow.active .flow-arrow {
    background-color: #4361ee;
    border-left-color: #4361ee;
  }
  
  .animate-button {
    display: block;
    margin: 0 auto;
    padding: 14px 25px;
    background-color: #4361ee;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .animate-button:hover {
    background-color: #3151cd;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
  }
  
  .animate-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  .hint {
    text-align: center;
    color: #6c757d;
    margin-top: 15px;
    font-size: 0.9rem;
  }
  
  /* Стили для вкладок во второй секции "Определение Props" */
  .tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid #dee2e6;
    padding-bottom: 10px;
  }
  
  .tabs button {
    padding: 10px 15px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 6px 6px 0 0;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .tabs button:hover {
    background-color: #e9ecef;
  }
  
  .tabs button.active {
    background-color: #4361ee;
    color: white;
    border-color: #4361ee;
  }
  
  .tab-content {
    animation: fadeIn 0.5s ease;
  }
  
  .tab-content h3 {
    margin-bottom: 20px;
    font-size: 1.3rem;
    color: #2c3e50;
  }
  
  .code-example {
    background-color: #f8f9fa;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  
  .code-example pre {
    margin: 0;
    padding: 15px;
    overflow-x: auto;
    background-color: #2d2d2d;
    color: #f8f8f2;
    font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .pros-cons {
    display: flex;
    gap: 20px;
    margin-top: 20px;
  }
  
  .pros, .cons {
    flex: 1;
    padding: 15px;
    border-radius: 8px;
  }
  
  .pros {
    background-color: #d4edda;
    border-left: 4px solid #28a745;
  }
  
  .cons {
    background-color: #f8d7da;
    border-left: 4px solid #dc3545;
  }
  
  .pros h4, .cons h4 {
    margin-top: 0;
    color: #2c3e50;
  }
  
  .props-options {
    margin-top: 20px;
  }
  
  .props-options h4 {
    margin-bottom: 15px;
    color: #2c3e50;
  }
  
  .props-options table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .props-options th, .props-options td {
    padding: 10px 15px;
    text-align: left;
    border: 1px solid #dee2e6;
  }
  
  .props-options th {
    background-color: #f8f9fa;
    font-weight: bold;
  }
  
  .props-options td code {
    background-color: #f1f1f1;
    padding: 2px 5px;
    border-radius: 3px;
    font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
    font-size: 0.85rem;
  }
  
  .example-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    margin-top: 20px;
  }
  
  .example-card h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #2c3e50;
  }
  
  .note-box {
    background-color: #fff3cd;
    border-left: 4px solid #ffc107;
    padding: 15px;
    border-radius: 8px;
    margin-top: 20px;
  }
  
  .note-box p {
    font-weight: bold;
    margin-top: 0;
  }
  
  .note-box ul {
    margin-bottom: 0;
    padding-left: 20px;
  }
  
  .note-box li {
    margin-bottom: 5px;
  }
  
  /* Стили для третьей секции "Использование Props" */
  .usage-example {
    margin-top: 20px;
  }
  
  .components-example {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }
  
  .example-component {
    flex: 1;
    min-width: 300px;
    background-color: #f8f9fa;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .component-title {
    background-color: #4361ee;
    color: white;
    padding: 10px 15px;
    font-weight: bold;
  }
  
  .component-code {
    max-height: 400px;
    overflow-y: auto;
  }
  
  .live-example {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin-top: 30px;
  }
  
  .live-example h4 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #2c3e50;
  }
  
  .demo-component {
    margin-bottom: 30px;
  }
  
  .user-profile {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .user-profile h3 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .user-profile p {
    margin-bottom: 20px;
  }
  
  .user-profile.light {
    background-color: #ffffff;
    color: #333;
  }
  
  .user-profile.dark {
    background-color: #2c3e50;
    color: #f8f9fa;
  }
  
  .user-profile.blue {
    background-color: #e3f2fd;
    color: #0d47a1;
  }
  
  .user-profile.green {
    background-color: #e8f5e9;
    color: #1b5e20;
  }
  
  .theme-selector {
    margin-top: 15px;
  }
  
  .theme-selector p {
    margin-bottom: 10px;
  }
  
  .theme-selector button {
    padding: 8px 12px;
    margin-right: 8px;
    margin-bottom: 8px;
    background-color: #e9ecef;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .theme-selector button:hover {
    background-color: #dee2e6;
  }
  
  .theme-selector button.active {
    background-color: #4361ee;
    color: white;
  }
  
  .data-flow-visualization {
    background-color: #f1f3f5;
    padding: 15px;
    border-radius: 8px;
    margin-top: 20px;
  }
  
  .data-flow-visualization .data-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    animation: fadeIn 0.5s ease;
  }
  
  .data-flow-visualization .prop-name {
    background-color: #4361ee;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-weight: bold;
    margin-right: 10px;
    min-width: 80px;
    text-align: center;
  }
  
  .data-flow-visualization .prop-value {
    background-color: #ffffff;
    padding: 5px 10px;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
    font-size: 0.85rem;
    color: #e74c3c;
    flex-grow: 1;
  }
  
  .data-flow-visualization .flow-arrow {
    position: static;
    margin-left: 15px;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 12px solid #4361ee;
    transform: none;
  }
  
  /* Стили для четвертой секции "Лучшие практики" */
  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .practice-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .practice-card:hover {
    transform: translateY(-5px);
  }
  
  .practice-card.warning {
    background-color: #fff3cd;
  }
  
  .practice-icon {
    margin-right: 15px;
    font-size: 1.5rem;
    color: #28a745;
    font-weight: bold;
  }
  
  .practice-card.warning .practice-icon {
    color: #dc3545;
  }
  
  .practice-content {
    flex: 1;
  }
  
  .practice-content h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.1rem;
    color: #2c3e50;
  }
  
  .practice-content p {
    margin-bottom: 15px;
    color: #6c757d;
  }
  
  .practice-content .example {
    background-color: #f1f3f5;
    border-radius: 6px;
    overflow: hidden;
  }
  
  .practice-content .example pre {
    margin: 0;
    padding: 12px;
    font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
    font-size: 0.85rem;
    line-height: 1.4;
    overflow-x: auto;
  }
  
  /* Стили для пятой секции "Двусторонняя коммуникация" */
  .two-way-explanation {
    margin-top: 20px;
  }
  
  .two-way-explanation p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 20px;
  }
  
  .communication-diagram {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 40px 0;
  }
  
  .parent-box, .child-box {
    width: 250px;
    background-color: #f8f9fa;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .box-title {
    background-color: #4361ee;
    color: white;
    padding: 10px;
    font-weight: bold;
    text-align: center;
  }
  
  .box-content {
    padding: 15px;
  }
  
  .data-value {
    background-color: #e9ecef;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    font-weight: bold;
    color: #e74c3c;
    text-align: center;
  }
  
  .code-snippet {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 8px;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
    font-size: 0.85rem;
    margin-bottom: 10px;
  }
  
  .demo-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    margin-top: 10px;
  }
  
  .communication-arrows {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .down-arrow, .up-arrow {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .arrow {
    font-size: 1.5rem;
    color: #4361ee;
  }
  
  .label {
    background-color: #e9ecef;
    padding: 5px 8px;
    border-radius: 4px;
    font-size: 0.85rem;
  }
  
  .code-example-split {
    display: flex;
    gap: 20px;
    margin-top: 40px;
    flex-wrap: wrap;
  }
  
  .code-part {
    flex: 1;
    min-width: 300px;
  }
  
  .code-part h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #2c3e50;
  }
  
  .info-box {
    background-color: #e3f2fd;
    border-left: 4px solid #2196f3;
    padding: 20px;
    border-radius: 8px;
    margin-top: 30px;
  }
  
  .info-box h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #0d47a1;
  }
  
  .info-box ul {
    margin-bottom: 0;
    padding-left: 20px;
  }
  
  .info-box li {
    margin-bottom: 10px;
  }
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    .props-explorer {
      padding: 15px;
    }
    
    .section {
      padding: 20px;
    }
    
    .components-flow {
      flex-direction: column;
      gap: 40px;
    }
    
    .parent-component, .child-component {
      width: 100%;
    }
    
    .data-flow {
      transform: rotate(90deg);
      margin: 0;
    }
    
    .pros-cons {
      flex-direction: column;
    }
    
    .communication-diagram {
      flex-direction: column;
      gap: 30px;
    }
    
    .parent-box, .child-box {
      width: 100%;
    }
    
    .communication-arrows {
      flex-direction: row;
      margin: 10px 0;
    }
    
    .down-arrow, .up-arrow {
      transform: rotate(90deg);
    }
  }
  </style>