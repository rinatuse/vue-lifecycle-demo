<template>
    <div class="lifecycle-container">
      <h1>Жизненный цикл Vue-компонента</h1>
      
      <div class="modes">
        <button @click="isAutoMode = !isAutoMode" :class="{ active: isAutoMode }">
          {{ isAutoMode ? 'Остановить автоматический режим' : 'Запустить автоматический режим' }}
        </button>
        <button @click="resetDemo" :disabled="isAutoMode">Сбросить демонстрацию</button>
      </div>
      
      <div class="lifecycle-flow">
        <div 
          v-for="(stage, index) in lifecycleStages" 
          :key="stage.id"
          class="lifecycle-stage"
          :class="{ 
            active: currentStage === stage.id,
            completed: stageIndex > index,
            'can-progress': stageIndex === index && !isAutoMode
          }"
          @click="!isAutoMode && stageIndex === index && progressStage()"
        >
          <div class="stage-number">{{ index + 1 }}</div>
          <div class="stage-name">{{ stage.name }}</div>
        </div>
      </div>
      
      <div class="stage-container">
        <div class="visualization">
          <div class="component" :class="currentStage">
            <div class="component-inner">
              <div class="component-state">
                <template v-if="hasData">
                  <div class="data-label">Data:</div>
                  <div class="data-value" :class="{ updating: isUpdating }">{{ counter }}</div>
                </template>
                <template v-else>
                  <div class="data-placeholder">Данные недоступны</div>
                </template>
              </div>
              
              <div class="dom-representation" :class="{ rendered: isMounted }">
                <div class="dom-label">DOM:</div>
                <div class="dom-content">
                  <div v-if="isMounted" class="dom-element">
                    <span class="dom-counter">{{ counter }}</span>
                  </div>
                  <div v-else class="dom-placeholder">
                    DOM еще не подключен
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="controls" v-if="['mounted', 'beforeUpdate', 'updated'].includes(currentStage)">
            <button @click="updateData" :disabled="isAutoMode">Обновить данные</button>
          </div>
        </div>
        
        <div class="explanation">
          <h3>{{ currentStageInfo.title }}</h3>
          <p>{{ currentStageInfo.description }}</p>
          
          <div class="api-section">
            <h4>Доступные API:</h4>
            <ul>
              <li v-for="(available, api) in currentStageInfo.availableApi" :key="api"
                  :class="{ available }">
                {{ api }}
              </li>
            </ul>
          </div>
          
          <div class="code-sample">
            <h4>Пример кода:</h4>
            <pre><code>{{ currentStageInfo.code }}</code></pre>
          </div>
          
          <div class="practical-use">
            <h4>Практическое применение:</h4>
            <p>{{ currentStageInfo.practicalUse }}</p>
          </div>
        </div>
      </div>
      
      <div class="navigation">
        <button 
          @click="prevStage" 
          :disabled="stageIndex === 0 || isAutoMode"
        >
          Предыдущий этап
        </button>
        <button 
          @click="progressStage" 
          :disabled="stageIndex === lifecycleStages.length - 1 || isAutoMode"
        >
          Следующий этап
        </button>
      </div>
      
      <div class="logs">
        <h3>Журнал событий:</h3>
        <div class="log-entries">
          <div v-for="(log, index) in logs" :key="index" class="log-entry">
            <span class="log-time">{{ log.time }}</span>
            <span class="log-stage">{{ log.stage }}</span>
            <span class="log-message">{{ log.message }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
  
  // Данные для демонстрации
  const counter = ref(0);
  const isUpdating = ref(false);
  const logs = ref([]);
  const isAutoMode = ref(false);
  let autoModeTimer = null;
  
  // Определяем все этапы жизненного цикла
  const lifecycleStages = [
    {
      id: 'beforeCreate',
      name: 'beforeCreate',
      title: 'beforeCreate',
      description: 'Это самый ранний этап жизненного цикла. Компонент только начинает инициализироваться. Реактивные данные еще не созданы, и методы компонента недоступны.',
      availableApi: {
        'data': false,
        'methods': false,
        'computed': false,
        'props': false,
        'DOM': false,
        '$el': false,
        '$refs': false,
      },
      code: `export default {
    beforeCreate() {
      console.log("Компонент начинает инициализироваться");
      // this.counter еще недоступен
      // методы компонента тоже недоступны
    }
  }`,
      practicalUse: 'Редко используется. Можно настроить сторонние библиотеки или инициализировать глобальные переменные.'
    },
    {
      id: 'created',
      name: 'created',
      title: 'created',
      description: 'Компонент создан! Реактивные данные инициализированы и доступны. Методы, вычисляемые свойства и наблюдатели тоже работают. Но компонент еще не встроен в DOM.',
      availableApi: {
        'data': true,
        'methods': true,
        'computed': true,
        'props': true,
        'DOM': false,
        '$el': false,
        '$refs': false,
      },
      code: `export default {
    created() {
      console.log("Данные доступны:", this.counter);
      // Хорошее место для API-запросов
      // this.fetchData();
    }
  }`,
      practicalUse: 'Идеальное место для выполнения API-запросов, инициализации данных и подготовки компонента к рендерингу.'
    },
    {
      id: 'beforeMount',
      name: 'beforeMount',
      title: 'beforeMount',
      description: 'Компонент готовится к монтированию в DOM. Виртуальный DOM создан, но еще не отрендерен в реальный DOM страницы.',
      availableApi: {
        'data': true,
        'methods': true,
        'computed': true,
        'props': true,
        'DOM': false,
        '$el': false,
        '$refs': false,
      },
      code: `export default {
    beforeMount() {
      console.log("Подготовка к рендерингу");
      // DOM еще не доступен
    }
  }`,
      practicalUse: 'Не очень распространен. Можно использовать для последних приготовлений перед рендерингом DOM.'
    },
    {
      id: 'mounted',
      name: 'mounted',
      title: 'mounted',
      description: 'Компонент смонтирован в DOM! Теперь можно работать с DOM-элементами, добавлять слушатели событий и взаимодействовать с другими компонентами.',
      availableApi: {
        'data': true,
        'methods': true,
        'computed': true,
        'props': true,
        'DOM': true,
        '$el': true,
        '$refs': true,
      },
      code: `export default {
    mounted() {
      console.log("Компонент в DOM:", this.$el);
      // Можно работать с DOM
      // Доступ к дочерним компонентам через this.$refs
      // Инициализация сторонних библиотек UI
    }
  }`,
      practicalUse: 'Идеальное место для интеграции с DOM-библиотеками, создания графиков, инициализации карт и других UI-компонентов, требующих доступа к DOM.'
    },
    {
      id: 'beforeUpdate',
      name: 'beforeUpdate',
      title: 'beforeUpdate',
      description: 'Данные компонента изменились, и Vue готовится обновить DOM. Этот этап происходит перед обновлением DOM.',
      availableApi: {
        'data': true,
        'methods': true,
        'computed': true,
        'props': true,
        'DOM': true,
        '$el': true,
        '$refs': true,
      },
      code: `export default {
    beforeUpdate() {
      console.log("Данные изменились:", this.counter);
      console.log("DOM будет обновлен");
      // Доступ к DOM до обновления
      // Можно сохранить состояние DOM перед обновлением
    }
  }`,
      practicalUse: 'Можно получить доступ к DOM перед его обновлением. Полезно, если нужно сохранить состояние DOM-элементов (например, позицию прокрутки) перед их изменением.'
    },
    {
      id: 'updated',
      name: 'updated',
      title: 'updated',
      description: 'DOM обновлен в соответствии с новыми данными. Теперь DOM синхронизирован с текущим состоянием компонента.',
      availableApi: {
        'data': true,
        'methods': true,
        'computed': true,
        'props': true,
        'DOM': true,
        '$el': true,
        '$refs': true,
      },
      code: `export default {
    updated() {
      console.log("DOM обновлен");
      // DOM теперь отражает текущее состояние данных
      // Осторожно с изменением данных здесь,
      // можно вызвать бесконечный цикл обновлений
    }
  }`,
      practicalUse: 'Можно выполнять действия после обновления DOM, например, обновление сторонних UI-библиотек или выполнение измерений DOM-элементов.'
    },
    {
      id: 'beforeUnmount',
      name: 'beforeUnmount',
      title: 'beforeUnmount',
      description: 'Компонент готовится к удалению из DOM. Все еще полностью функционален, все API доступны. Идеальное время для очистки ресурсов.',
      availableApi: {
        'data': true,
        'methods': true,
        'computed': true,
        'props': true,
        'DOM': true,
        '$el': true,
        '$refs': true,
      },
      code: `export default {
    beforeUnmount() {
      console.log("Подготовка к удалению компонента");
      // Отключение слушателей событий
      // Отмена таймеров
      // Отписка от внешних событий
    }
  }`,
      practicalUse: 'Важный этап для очистки ресурсов: отмена подписок, отключение слушателей событий, освобождение памяти, отмена таймеров и интервалов.'
    },
    {
      id: 'unmounted',
      name: 'unmounted',
      title: 'unmounted',
      description: 'Компонент удален из DOM. Все связи с родительскими и дочерними компонентами разорваны. Компонент деактивирован.',
      availableApi: {
        'data': true,
        'methods': true,
        'computed': true,
        'props': true,
        'DOM': false,
        '$el': false,
        '$refs': false,
      },
      code: `export default {
    unmounted() {
      console.log("Компонент удален из DOM");
      // Здесь редко что-то делают
      // Основная очистка уже произведена в beforeUnmount
    }
  }`,
      practicalUse: 'Редко используется на практике, так как большинство задач по очистке выполняются в beforeUnmount.'
    }
  ];
  
  // Текущий этап жизненного цикла
  const stageIndex = ref(0);
  const currentStage = computed(() => lifecycleStages[stageIndex.value].id);
  const currentStageInfo = computed(() => lifecycleStages[stageIndex.value]);
  
  // Компьютед свойства для определения состояния
  const hasData = computed(() => {
    return ['created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeUnmount', 'unmounted'].includes(currentStage.value);
  });
  
  const isMounted = computed(() => {
    return ['mounted', 'beforeUpdate', 'updated', 'beforeUnmount'].includes(currentStage.value);
  });
  
  // Функции для управления демонстрацией
  function addLog(stage, message) {
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    logs.value.unshift({ time, stage, message });
    
    // Ограничим количество логов
    if (logs.value.length > 10) {
      logs.value = logs.value.slice(0, 10);
    }
  }
  
  function progressStage() {
    if (stageIndex.value < lifecycleStages.length - 1) {
      stageIndex.value++;
      const stage = lifecycleStages[stageIndex.value];
      addLog(stage.name, `Переход к этапу ${stage.name}`);
      
      // Специальные эффекты для определенных этапов
      if (stage.id === 'created') {
        addLog('created', 'Данные инициализированы');
      }
      if (stage.id === 'mounted') {
        addLog('mounted', 'Компонент отрендерен в DOM');
      }
    }
  }
  
  function prevStage() {
    if (stageIndex.value > 0) {
      stageIndex.value--;
      const stage = lifecycleStages[stageIndex.value];
      addLog(stage.name, `Возврат к этапу ${stage.name}`);
    }
  }
  
  function resetDemo() {
    stageIndex.value = 0;
    counter.value = 0;
    logs.value = [];
    addLog('reset', 'Демонстрация сброшена');
  }
  
  function updateData() {
    if (isMounted.value) {
      isUpdating.value = true;
      counter.value++;
      
      // Если мы на этапе mounted, переходим к beforeUpdate
      if (currentStage.value === 'mounted') {
        stageIndex.value = 4; // beforeUpdate
        addLog('beforeUpdate', `Данные изменились, counter = ${counter.value}`);
        
        // Затем через небольшую задержку к updated
        setTimeout(() => {
          stageIndex.value = 5; // updated
          isUpdating.value = false;
          addLog('updated', 'DOM обновлен');
        }, 1500);
      }
    }
  }
  
  // Автоматический режим демонстрации
  watch(isAutoMode, (newValue) => {
    if (newValue) {
      startAutoMode();
    } else {
      stopAutoMode();
    }
  });
  
  function startAutoMode() {
    resetDemo();
    addLog('auto', 'Запущен автоматический режим');
    
    // Запускаем автоматический прогресс
    progressAutoMode();
  }
  
  function progressAutoMode() {
    // Если достигли конца или режим выключен, останавливаемся
    if (stageIndex.value >= lifecycleStages.length - 1 || !isAutoMode.value) {
      isAutoMode.value = false;
      return;
    }
    
    // Переходим к следующему этапу
    progressStage();
    
    // Для этапа mounted выполним обновление данных
    if (currentStage.value === 'mounted') {
      setTimeout(() => {
        updateData();
        
        // Продолжаем через дополнительное время
        autoModeTimer = setTimeout(progressAutoMode, 4000);
      }, 2000);
    } else {
      // Планируем следующий переход
      autoModeTimer = setTimeout(progressAutoMode, 3000);
    }
  }
  
  function stopAutoMode() {
    if (autoModeTimer) {
      clearTimeout(autoModeTimer);
      autoModeTimer = null;
    }
    addLog('auto', 'Автоматический режим остановлен');
  }
  
  // Очистка при размонтировании
  onUnmounted(() => {
    if (autoModeTimer) {
      clearTimeout(autoModeTimer);
    }
  });
  
  // Инициализация
  onMounted(() => {
    addLog('init', 'Демонстрация инициализирована');
    addLog('beforeCreate', 'Начальный этап жизненного цикла');
  });
  </script>
  
  <style scoped>
  .lifecycle-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #2c3e50;
  }
  
  h1 {
    text-align: center;
    color: #42b883;
    margin-bottom: 30px;
  }
  
  .modes {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .modes button {
    padding: 10px 15px;
    background: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .modes button.active {
    background: #42b883;
    color: white;
    border-color: #42b883;
  }
  
  .modes button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .lifecycle-flow {
    display: flex;
    overflow-x: auto;
    padding: 10px 0;
    margin-bottom: 30px;
    position: relative;
  }
  
  .lifecycle-flow::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: #e0e0e0;
    z-index: 0;
  }
  
  .lifecycle-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    min-width: 100px;
    position: relative;
    z-index: 1;
    cursor: default;
  }
  
  .stage-number {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #f8f8f8;
    border: 2px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    font-weight: bold;
    transition: all 0.3s;
  }
  
  .stage-name {
    font-size: 0.8rem;
    text-align: center;
    transition: all 0.3s;
  }
  
  .lifecycle-stage.active .stage-number {
    background: #42b883;
    color: white;
    border-color: #42b883;
    transform: scale(1.2);
  }
  
  .lifecycle-stage.active .stage-name {
    font-weight: bold;
    color: #42b883;
  }
  
  .lifecycle-stage.completed .stage-number {
    background: #34495e;
    color: white;
    border-color: #34495e;
  }
  
  .lifecycle-stage.can-progress {
    cursor: pointer;
  }
  
  .lifecycle-stage.can-progress:hover .stage-number {
    transform: scale(1.1);
    background: #42b883;
    color: white;
    border-color: #42b883;
  }
  
  .stage-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    min-height: 400px;
  }
  
  .visualization {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  
  .component {
    width: 100%;
    height: 300px;
    border: 2px solid #ddd;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    transition: all 0.5s;
    position: relative;
  }
  
  .component-inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .component-state {
    border: 1px dashed #ccc;
    padding: 15px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .data-label, .dom-label {
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 5px;
  }
  
  .data-value {
    font-size: 2rem;
    font-weight: bold;
    color: #42b883;
    transition: all 0.3s;
  }
  
  .data-value.updating {
    animation: pulse 1s infinite;
  }
  
  .data-placeholder {
    font-size: 0.9rem;
    color: #999;
    font-style: italic;
  }
  
  .dom-representation {
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 15px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f8f8f8;
    transition: all 0.5s;
    opacity: 0.6;
  }
  
  .dom-representation.rendered {
    background: white;
    opacity: 1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .dom-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .dom-element {
    border: 2px solid #42b883;
    border-radius: 4px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .dom-counter {
    font-size: 1.8rem;
    font-weight: bold;
    color: #42b883;
  }
  
  .dom-placeholder {
    font-size: 0.9rem;
    color: #999;
    font-style: italic;
    text-align: center;
  }
  
  .component.beforeCreate {
    background-color: #f5f5f5;
    opacity: 0.7;
    transform: scale(0.95);
  }
  
  .component.created {
    background-color: #f0f8ff;
    border-color: #42b883;
    opacity: 0.85;
    transform: scale(0.97);
  }
  
  .component.beforeMount {
    background-color: #f0f8ff;
    border-color: #42b883;
    opacity: 0.9;
    transform: scale(0.98);
  }
  
  .component.mounted {
    background-color: white;
    border-color: #42b883;
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
  
  .component.beforeUpdate, 
  .component.updated {
    background-color: white;
    border-color: #ff9800;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
  
  .component.beforeUnmount {
    background-color: #fff8f0;
    border-color: #e74c3c;
    opacity: 0.9;
    transform: scale(0.98);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .component.unmounted {
    background-color: #f5f5f5;
    border-color: #ccc;
    opacity: 0.7;
    transform: scale(0.95);
  }
  
  .controls {
    margin-top: 20px;
  }
  
  .controls button {
    padding: 8px 15px;
    background: #42b883;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .controls button:hover {
    background: #2a9761;
  }
  
  .controls button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  .explanation {
    padding: 0 10px;
  }
  
  .explanation h3 {
    color: #42b883;
    margin-top: 0;
    border-bottom: 2px solid #42b883;
    padding-bottom: 5px;
  }
  
  .api-section {
    margin: 15px 0;
  }
  
  .api-section ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
    padding: 0;
    list-style: none;
  }
  
  .api-section li {
    padding: 5px 10px;
    border-radius: 3px;
    text-align: center;
    font-size: 0.9rem;
    background: #f0f0f0;
    color: #999;
    position: relative;
  }
  
  .api-section li.available {
    background: #42b883;
    color: white;
  }
  
  .code-sample {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 10px;
    border-radius: 4px;
    margin: 15px 0;
    overflow: auto;
    font-size: 0.85rem;
  }
  
  .code-sample pre {
    margin: 0;
  }
  
  .practical-use {
    margin: 15px 0;
    font-size: 0.9rem;
  }
  
  .navigation {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .navigation button {
    padding: 10px 15px;
    background: #42b883;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .navigation button:hover {
    background: #2a9761;
  }
  
  .navigation button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  .logs {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin-top: 20px;
  }
  
  .logs h3 {
    margin-top: 0;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }
  
  .log-entries {
    max-height: 200px;
    overflow-y: auto;
  }
  
  .log-entry {
    padding: 5px 0;
    border-bottom: 1px solid #f0f0f0;
    display: grid;
    grid-template-columns: 80px 120px 1fr;
    gap: 10px;
    font-size: 0.85rem;
  }
  
  .log-time {
    color: #999;
  }
  
  .log-stage {
    font-weight: bold;
    color: #42b883;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  </style>