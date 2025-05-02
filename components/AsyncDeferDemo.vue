<template>
    <div class="async-defer-demo">
      <h1>Атрибуты async и defer при загрузке скриптов</h1>
      <p class="intro">Визуальное объяснение разницы между обычной загрузкой скриптов и использованием атрибутов async и defer</p>
      
      <div class="mode-selector">
        <button 
          v-for="(mode, index) in modes" 
          :key="mode.id"
          :class="{ active: currentMode === index }"
          @click="selectMode(index)"
        >
          {{ mode.name }}
        </button>
      </div>
      
      <div class="animation-container">
        <div class="process-timeline">
          <div class="html-parse">
            <div class="process-title">Парсинг HTML</div>
            <div class="process-bar">
              <div 
                class="parse-progress" 
                :style="{ width: parseProgress + '%' }"
                :class="{ 'paused': isParsePaused }"
              ></div>
            </div>
          </div>
          
          <div class="scripts-container">
            <div v-for="(script, index) in currentScripts" :key="index" class="script-item">
              <div class="script-label">{{ script.name }}</div>
              <div class="script-timeline">
                <div 
                  class="script-download"
                  :style="{ 
                    width: script.downloadProgress + '%',
                    left: script.downloadStart + '%'
                  }"
                  :class="{ 'downloading': script.isDownloading }"
                ></div>
                <div 
                  class="script-execution"
                  :style="{ 
                    width: script.executeProgress + '%',
                    left: script.executeStart + '%'
                  }"
                  :class="{ 'executing': script.isExecuting }"
                ></div>
              </div>
            </div>
          </div>
          
          <div class="dom-ready">
            <div 
              class="dom-marker"
              :style="{ left: domReadyPosition + '%' }"
              :class="{ 'reached': isDomReady }"
            >
              DOM готов
            </div>
          </div>
          
          <div v-if="loadCompleted" class="load-completed">
            <div class="completion-message">Загрузка страницы завершена!</div>
            <div class="completion-time">Время загрузки: {{ loadTime }} мс</div>
          </div>
        </div>
        
        <div class="controls">
          <button @click="runAnimation" :disabled="isAnimating">
            {{ isAnimating ? 'Выполняется...' : 'Запустить анимацию' }}
          </button>
          <button @click="resetAnimation" :disabled="!animationRan">Сбросить</button>
        </div>
      </div>
      
      <div class="explanation-container">
        <div class="current-explanation">
          <h2>{{ modes[currentMode].name }}</h2>
          <div class="explanation-content" v-html="modes[currentMode].explanation"></div>
        </div>
        
        <div class="code-example">
          <h3>Пример кода:</h3>
          <pre><code>{{ modes[currentMode].code }}</code></pre>
        </div>
        
        <div class="key-points">
          <h3>Ключевые особенности:</h3>
          <ul>
            <li v-for="(point, index) in modes[currentMode].keyPoints" :key="index">
              {{ point }}
            </li>
          </ul>
        </div>
      </div>
      
      <div class="comparison-table">
        <h2>Сравнение методов загрузки скриптов</h2>
        <table>
          <thead>
            <tr>
              <th>Метод</th>
              <th>Блокирует парсинг HTML</th>
              <th>Гарантирует порядок выполнения</th>
              <th>Ждёт DOM перед выполнением</th>
              <th>Лучшее применение</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mode in modes" :key="mode.id">
              <td>{{ mode.name }}</td>
              <td class="text-center">{{ mode.comparison.blocksHtml }}</td>
              <td class="text-center">{{ mode.comparison.preservesOrder }}</td>
              <td class="text-center">{{ mode.comparison.waitsDom }}</td>
              <td>{{ mode.comparison.bestFor }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="browser-support">
        <h2>Поддержка браузерами</h2>
        <p>Атрибуты <code>async</code> и <code>defer</code> поддерживаются всеми современными браузерами:</p>
        <ul class="browser-list">
          <li>
            <div class="browser-icon chrome"></div>
            <div class="browser-name">Chrome</div>
            <div class="support-status">Полная поддержка</div>
          </li>
          <li>
            <div class="browser-icon firefox"></div>
            <div class="browser-name">Firefox</div>
            <div class="support-status">Полная поддержка</div>
          </li>
          <li>
            <div class="browser-icon safari"></div>
            <div class="browser-name">Safari</div>
            <div class="support-status">Полная поддержка</div>
          </li>
          <li>
            <div class="browser-icon edge"></div>
            <div class="browser-name">Edge</div>
            <div class="support-status">Полная поддержка</div>
          </li>
          <li>
            <div class="browser-icon explorer"></div>
            <div class="browser-name">IE</div>
            <div class="support-status">IE 10+ (defer), IE 10+ (async)</div>
          </li>
        </ul>
      </div>
      
      <div class="real-world-tips">
        <h2>Советы по применению в реальных проектах</h2>
        <div class="tip-item">
          <div class="tip-icon">💡</div>
          <div class="tip-content">
            <h3>Когда использовать defer</h3>
            <p>Используйте <code>defer</code> для скриптов, которые:</p>
            <ul>
              <li>Нужны для основной функциональности страницы</li>
              <li>Взаимодействуют с DOM и должны выполняться после его построения</li>
              <li>Зависят от порядка выполнения (например, сначала jQuery, затем плагины jQuery)</li>
            </ul>
          </div>
        </div>
        
        <div class="tip-item">
          <div class="tip-icon">💡</div>
          <div class="tip-content">
            <h3>Когда использовать async</h3>
            <p>Используйте <code>async</code> для скриптов, которые:</p>
            <ul>
              <li>Независимы от других скриптов</li>
              <li>Не критичны для первоначального отображения страницы</li>
              <li>Подходят для аналитики, трекеров, социальных виджетов</li>
            </ul>
          </div>
        </div>
        
        <div class="tip-item">
          <div class="tip-icon">⚠️</div>
          <div class="tip-content">
            <h3>Внимание при использовании в Nuxt</h3>
            <p>В Nuxt 3 лучше использовать встроенные механизмы управления скриптами:</p>
            <ul>
              <li>Используйте хук <code>useHead()</code> для добавления скриптов</li>
              <li>Укажите <code>defer: true</code> или <code>async: true</code> в конфигурации</li>
              <li>Для сторонних скриптов используйте плагины или модули Nuxt</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="resource-links">
        <h2>Полезные ресурсы</h2>
        <ul>
          <li>
            <a href="https://developer.mozilla.org/ru/docs/Web/HTML/Element/script" target="_blank">
              MDN Web Docs: Element script
            </a>
          </li>
          <li>
            <a href="https://v3.nuxtjs.org/docs/directory-structure/plugins" target="_blank">
              Nuxt 3: Плагины и управление скриптами
            </a>
          </li>
          <li>
            <a href="https://web.dev/articles/efficiently-load-third-party-javascript" target="_blank">
              Web.dev: Эффективная загрузка сторонних скриптов
            </a>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Режимы анимации
  const modes = [
    {
      id: 'normal',
      name: 'Обычная загрузка',
      explanation: `<p>При обычной загрузке скриптов (без атрибутов <code>async</code> или <code>defer</code>), браузер останавливает парсинг HTML-документа, как только встречает тег <code>&lt;script&gt;</code>.</p>
      <p>Парсинг HTML блокируется до тех пор, пока скрипт не будет загружен и выполнен полностью. Только после этого браузер продолжает обрабатывать оставшуюся часть документа.</p>
      <p>Этот подход замедляет отображение страницы, особенно если скрипты большие или сервер медленно отвечает.</p>`,
      code: `<!-- Обычная загрузка скрипта -->
     
  
  <!-- Парсинг HTML остановится здесь -->
  <!-- Ожидание загрузки скрипта -->
  <!-- Выполнение скрипта -->
  <!-- Только после этого продолжится парсинг HTML -->
  
  <div id="content">
    <!-- Этот контент будет обработан с задержкой -->
  </div>`,
      keyPoints: [
        'Блокирует парсинг HTML во время загрузки и выполнения',
        'Скрипты выполняются в том порядке, в котором они объявлены',
        'Увеличивает время до отображения страницы (Largest Contentful Paint)',
        'Подходит только для критически важных скриптов, без которых страница не может функционировать'
      ],
      comparison: {
        blocksHtml: 'Да',
        preservesOrder: 'Да',
        waitsDom: 'Нет',
        bestFor: 'Критические скрипты, от которых зависит отображение страницы'
      }
    },
    {
      id: 'async',
      name: 'Атрибут async',
      explanation: `<p>При использовании атрибута <code>async</code>, скрипт загружается асинхронно, параллельно с парсингом HTML. Парсинг HTML не блокируется во время загрузки скрипта.</p>
      <p>Однако, как только скрипт загружен, парсинг HTML приостанавливается, и скрипт немедленно выполняется.</p>
      <p>Важно понимать, что порядок выполнения <code>async</code>-скриптов не гарантирован — скрипты выполняются сразу после загрузки, независимо от порядка их объявления в документе.</p>`,
      code: `<!-- Асинхронная загрузка скрипта -->

  
  <!-- Парсинг HTML продолжается -->
  <!-- Когда скрипт загрузится, парсинг приостановится -->
  <!-- После выполнения скрипта парсинг продолжится -->
  
  <div id="content">
    <!-- Этот контент обрабатывается параллельно с загрузкой скрипта -->
  </div>`,
      keyPoints: [
        'Загружается параллельно с парсингом HTML',
        'Блокирует парсинг HTML только на время выполнения',
        'Выполняется сразу после загрузки, порядок не гарантирован',
        'Может выполниться до того, как DOM будет полностью построен',
        'Подходит для скриптов, которые не зависят от DOM и других скриптов'
      ],
      comparison: {
        blocksHtml: 'Только при выполнении',
        preservesOrder: 'Нет',
        waitsDom: 'Нет',
        bestFor: 'Независимые скрипты (аналитика, трекеры, виджеты)'
      }
    },
    {
      id: 'defer',
      name: 'Атрибут defer',
      explanation: `<p>Атрибут <code>defer</code> указывает браузеру загружать скрипт параллельно с парсингом HTML, но откладывает выполнение скрипта до тех пор, пока весь HTML-документ не будет обработан.</p>
      <p>Это означает, что парсинг HTML не блокируется ни во время загрузки, ни на момент выполнения. Все <code>defer</code>-скрипты выполняются строго в том порядке, в котором они объявлены, и только после того, как DOM будет полностью построен, но до события <code>DOMContentLoaded</code>.</p>
      <p>Этот подход обеспечивает быстрое отображение страницы и гарантирует, что скрипты будут иметь доступ к полностью построенному DOM.</p>`,
      code: `<!-- Отложенная загрузка скриптов -->

  
  <!-- Парсинг HTML продолжается без блокировки -->
  <!-- Скрипты загружаются параллельно -->
  <!-- После завершения парсинга HTML -->
  <!-- Скрипты выполняются в порядке объявления -->
  
  <div id="content">
    <!-- Весь контент будет обработан до выполнения скриптов -->
  </div>`,
      keyPoints: [
        'Загружается параллельно с парсингом HTML',
        'Не блокирует парсинг HTML вообще',
        'Выполняется после завершения парсинга HTML, но до DOMContentLoaded',
        'Сохраняет порядок выполнения скриптов',
        'Гарантирует, что DOM будет доступен при выполнении скрипта',
        'Идеально для большинства скриптов на странице'
      ],
      comparison: {
        blocksHtml: 'Нет',
        preservesOrder: 'Да',
        waitsDom: 'Да',
        bestFor: 'Основные скрипты приложения, зависящие от DOM'
      }
    }
  ];
  
  // Текущий выбранный режим
  const currentMode = ref(0);
  
  // Состояние анимации
  const isAnimating = ref(false);
  const animationRan = ref(false);
  const parseProgress = ref(0);
  const isParsePaused = ref(false);
  const domReadyPosition = ref(80);
  const isDomReady = ref(false);
  const loadCompleted = ref(false);
  const loadTime = ref(0);
  
  // Скрипты для анимации
  const scriptsData = {
    normal: [
      { 
        name: 'script.js', 
        downloadStart: 20, 
        downloadDuration: 10, 
        executePosition: 30, 
        executeDuration: 10 
      },
      { 
        name: 'analytics.js', 
        downloadStart: 50, 
        downloadDuration: 15, 
        executePosition: 65, 
        executeDuration: 8 
      }
    ],
    async: [
      { 
        name: 'script.js', 
        downloadStart: 20, 
        downloadDuration: 10, 
        executePosition: 30, 
        executeDuration: 10 
      },
      { 
        name: 'analytics.js (async)', 
        downloadStart: 25, 
        downloadDuration: 20, 
        executePosition: 45, 
        executeDuration: 8 
      }
    ],
    defer: [
      { 
        name: 'script.js (defer)', 
        downloadStart: 20, 
        downloadDuration: 10, 
        executePosition: 82, 
        executeDuration: 8 
      },
      { 
        name: 'analytics.js (defer)', 
        downloadStart: 30, 
        downloadDuration: 20, 
        executePosition: 90, 
        executeDuration: 5 
      }
    ]
  };
  
  // Инициализация текущих скриптов в зависимости от режима
  const currentScripts = ref([]);
  
  // Выбор режима
  function selectMode(index) {
    currentMode.value = index;
    resetAnimation();
  }
  
  // Получение данных скриптов в зависимости от текущего режима
  function getScriptsForMode() {
    const modeId = modes[currentMode.value].id;
    return scriptsData[modeId].map(script => ({
      name: script.name,
      downloadStart: script.downloadStart,
      downloadDuration: script.downloadDuration,
      executePosition: script.executePosition,
      executeDuration: script.executeDuration,
      downloadProgress: 0,
      executeProgress: 0,
      isDownloading: false,
      isExecuting: false
    }));
  }
  
  // Запуск анимации
  function runAnimation() {
    if (isAnimating.value) return;
    
    isAnimating.value = true;
    animationRan.value = true;
    loadCompleted.value = false;
    
    // Получаем скрипты для текущего режима
    currentScripts.value = getScriptsForMode();
    
    // Старт анимации
    const startTime = Date.now();
    const animationDuration = 5000; // 5 секунд для всей анимации
    const modeId = modes[currentMode.value].id;
    
    const animationInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = (elapsedTime / animationDuration) * 100;
      
      if (progress >= 100) {
        parseProgress.value = 100;
        isDomReady.value = true;
        loadCompleted.value = true;
        loadTime.value = animationDuration;
        isAnimating.value = false;
        clearInterval(animationInterval);
        return;
      }
      
      // Обновляем прогресс парсинга HTML
      updateParsingProgress(progress, modeId);
      
      // Обновляем состояние скриптов
      updateScriptsState(progress);
      
      // Проверяем, достигли ли мы позиции DOM ready
      if (progress >= domReadyPosition.value) {
        isDomReady.value = true;
      }
    }, 50);
  }
  
  // Обновление прогресса парсинга HTML в зависимости от режима
  function updateParsingProgress(progress, modeId) {
    if (modeId === 'normal') {
      // Для обычной загрузки парсинг останавливается при загрузке скриптов
      const scripts = currentScripts.value;
      
      for (const script of scripts) {
        const downloadEnd = script.downloadStart + script.downloadDuration;
        const executeEnd = script.executePosition + script.executeDuration;
        
        // Если скрипт загружается или выполняется, парсинг останавливается
        if ((progress >= script.downloadStart && progress < downloadEnd) ||
            (progress >= script.executePosition && progress < executeEnd)) {
          isParsePaused.value = true;
          return;
        }
      }
      
      isParsePaused.value = false;
      parseProgress.value = progress;
    } else if (modeId === 'async') {
      // Для async парсинг останавливается только при выполнении скриптов
      const scripts = currentScripts.value;
      
      for (const script of scripts) {
        const executeEnd = script.executePosition + script.executeDuration;
        
        // Если скрипт выполняется, парсинг останавливается
        if (progress >= script.executePosition && progress < executeEnd) {
          isParsePaused.value = true;
          return;
        }
      }
      
      isParsePaused.value = false;
      parseProgress.value = progress;
    } else {
      // Для defer парсинг не останавливается
      parseProgress.value = progress;
    }
  }
  
  // Обновление состояния скриптов
  function updateScriptsState(progress) {
    for (let i = 0; i < currentScripts.value.length; i++) {
      const script = currentScripts.value[i];
      const downloadEnd = script.downloadStart + script.downloadDuration;
      const executeEnd = script.executePosition + script.executeDuration;
      
      // Обновляем статус загрузки
      if (progress >= script.downloadStart && progress < downloadEnd) {
        script.isDownloading = true;
        script.downloadProgress = ((progress - script.downloadStart) / script.downloadDuration) * script.downloadDuration;
      } else if (progress >= downloadEnd) {
        script.isDownloading = false;
        script.downloadProgress = script.downloadDuration;
      }
      
      // Обновляем статус выполнения
      if (progress >= script.executePosition && progress < executeEnd) {
        script.isExecuting = true;
        script.executeProgress = ((progress - script.executePosition) / script.executeDuration) * script.executeDuration;
      } else if (progress >= executeEnd) {
        script.isExecuting = false;
        script.executeProgress = script.executeDuration;
      }
    }
  }
  
  // Сброс анимации
  function resetAnimation() {
    isAnimating.value = false;
    parseProgress.value = 0;
    isParsePaused.value = false;
    isDomReady.value = false;
    loadCompleted.value = false;
    currentScripts.value = getScriptsForMode();
  }
  
  // Инициализация
  resetAnimation();
  </script>
  
  <style scoped>
  .async-defer-demo {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #333;
  }
  
  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  h2 {
    color: #2c3e50;
    margin-top: 30px;
    margin-bottom: 15px;
    border-bottom: 2px solid #ecf0f1;
    padding-bottom: 8px;
  }
  
  h3 {
    color: #2c3e50;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  .intro {
    text-align: center;
    color: #7f8c8d;
    margin-bottom: 30px;
  }
  
  /* Селектор режима */
  .mode-selector {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;
  }
  
  .mode-selector button {
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    background-color: #ecf0f1;
    color: #2c3e50;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .mode-selector button:hover {
    background-color: #d6dbdf;
  }
  
  .mode-selector button.active {
    background-color: #3498db;
    color: white;
  }
  
  /* Контейнер анимации */
  .animation-container {
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
  }
  
  .process-timeline {
    position: relative;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
    min-height: 300px;
  }
  
  /* Парсинг HTML */
  .html-parse {
    margin-bottom: 40px;
  }
  
  .process-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #34495e;
  }
  
  .process-bar {
    height: 20px;
    background-color: #ecf0f1;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }
  
  .parse-progress {
    height: 100%;
    background-color: #27ae60;
    border-radius: 10px;
    transition: width 0.05s linear;
  }
  
  .parse-progress.paused {
    background-color: #e74c3c;
    animation: pulse 1s infinite;
  }
  
  @keyframes pulse {
    0% { opacity: 0.8; }
    50% { opacity: 1; }
    100% { opacity: 0.8; }
  }
  
  /* Скрипты */
  .scripts-container {
    margin-top: 30px;
    margin-bottom: 40px;
  }
  
  .script-item {
    margin-bottom: 15px;
  }
  
  .script-label {
    font-size: 14px;
    margin-bottom: 5px;
    color: #34495e;
  }
  
  .script-timeline {
    height: 15px;
    background-color: #ecf0f1;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
  }
  
  .script-download {
    height: 100%;
    background-color: #3498db;
    border-radius: 8px;
    position: absolute;
    top: 0;
    transition: width 0.05s linear;
  }
  
  .script-download.downloading {
    animation: downloadPulse 1s infinite;
  }
  
  @keyframes downloadPulse {
    0% { opacity: 0.7; }
    50% { opacity: 1; }
    100% { opacity: 0.7; }
  }
  
  .script-execution {
    height: 100%;
    background-color: #9b59b6;
    border-radius: 8px;
    position: absolute;
    top: 0;
    transition: width 0.05s linear;
  }
  
  .script-execution.executing {
    animation: executePulse 1s infinite;
  }
  
  @keyframes executePulse {
    0% { opacity: 0.7; }
    50% { opacity: 1; }
    100% { opacity: 0.7; }
  }
  
  /* DOM Ready маркер */
  .dom-ready {
    position: relative;
    height: 40px;
    margin-bottom: 20px;
  }
  
  .dom-marker {
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    background-color: #f39c12;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    transition: all 0.3s ease;
    opacity: 0.7;
  }
  
  .dom-marker.reached {
    background-color: #f1c40f;
    font-weight: bold;
    opacity: 1;
    animation: markerPulse 1s;
  }
  
  @keyframes markerPulse {
    0% { transform: translateX(-50%) scale(1); }
    50% { transform: translateX(-50%) scale(1.2); }
    100% { transform: translateX(-50%) scale(1); }
  }
  
  /* Сообщение о завершении */
  .load-completed {
    text-align: center;
    margin-top: 20px;
    padding: 20px;
    background-color: #e8f5e9;
    border-radius: 8px;
    animation: fadeIn 0.5s;
  }
  
  @keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.completion-message {
  font-weight: bold;
  color: #27ae60;
  font-size: 18px;
  margin-bottom: 10px;
}

.completion-time {
  font-size: 16px;
  color: #7f8c8d;
}

/* Кнопки управления */
.controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.controls button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  min-width: 180px;
}

.controls button:hover {
  background-color: #2980b9;
}

.controls button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

/* Контейнер с объяснениями */
.explanation-container {
  background-color: #fff;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.explanation-content {
  line-height: 1.6;
  margin-bottom: 20px;
}

.code-example {
  margin-top: 20px;
  margin-bottom: 20px;
}

.code-example pre {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 14px;
  line-height: 1.5;
}

.key-points {
  margin-top: 20px;
  background-color: #f1f8fe;
  padding: 15px 20px;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.key-points ul {
  padding-left: 20px;
  margin: 10px 0;
}

.key-points li {
  margin-bottom: 8px;
  line-height: 1.5;
}

/* Сравнительная таблица */
.comparison-table {
  margin: 30px 0;
  overflow-x: auto;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e0e0e0;
}

.comparison-table th,
.comparison-table td {
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  text-align: left;
}

.comparison-table th {
  background-color: #f5f7fa;
  font-weight: bold;
  color: #2c3e50;
}

.comparison-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.text-center {
  text-align: center;
}

/* Поддержка браузеров */
.browser-support {
  margin: 30px 0;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.browser-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.browser-list li {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  width: 120px;
}

.browser-icon {
  width: 50px;
  height: 50px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
}

.browser-icon.chrome {
  background-image: url('https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/googlechrome.svg');
}

.browser-icon.firefox {
  background-image: url('https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/firefoxbrowser.svg');
}

.browser-icon.safari {
  background-image: url('https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/safari.svg');
}

.browser-icon.edge {
  background-image: url('https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/microsoftedge.svg');
}

.browser-icon.explorer {
  background-image: url('https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/internetexplorer.svg');
}

.browser-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.support-status {
  font-size: 12px;
  color: #2ecc71;
  text-align: center;
}

/* Советы по применению */
.real-world-tips {
  margin: 30px 0;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tip-item {
  display: flex;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ecf0f1;
}

.tip-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.tip-icon {
  font-size: 24px;
  margin-right: 15px;
  min-width: 30px;
}

.tip-content {
  flex: 1;
}

.tip-content h3 {
  margin-top: 0;
}

.tip-content ul {
  padding-left: 20px;
}

.tip-content li {
  margin-bottom: 8px;
}

/* Полезные ссылки */
.resource-links {
  margin: 30px 0;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.resource-links ul {
  padding-left: 20px;
}

.resource-links li {
  margin-bottom: 10px;
}

.resource-links a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.resource-links a:hover {
  color: #2980b9;
  text-decoration: underline;
}

/* Адаптивность */
@media (max-width: 768px) {
  .mode-selector {
    flex-direction: column;
    gap: 10px;
  }
  
  .browser-list li {
    width: 80px;
  }
  
  .comparison-table {
    font-size: 14px;
  }
  
  .comparison-table th,
  .comparison-table td {
    padding: 8px 10px;
  }
  
  .tip-item {
    flex-direction: column;
  }
  
  .tip-icon {
    margin-bottom: 10px;
  }
}

@media (max-width: 480px) {
  .browser-list {
    flex-direction: column;
    align-items: center;
  }
  
  .browser-list li {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
