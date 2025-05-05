<template>
    <div class="async-defer-explorer">
      <h1 class="title">Понимание атрибутов <span class="code-text">async</span> и <span class="code-text">defer</span> для скриптов</h1>
      
      <div class="intro-section">
        <p>
          Когда браузер загружает HTML и встречает тег <span class="code-text">&lt;script&gt;</span>, по умолчанию он 
          приостанавливает парсинг HTML, загружает и выполняет скрипт, а затем продолжает парсинг. 
          Атрибуты <span class="code-text">async</span> и <span class="code-text">defer</span> изменяют это поведение 
          и могут значительно улучшить производительность.
        </p>
      </div>
      
      <div class="tabs">
        <button 
          v-for="(tab) in tabs" 
          :key="tab.id"
          @click="selectTab(tab.id)"
          :class="{ 'active-tab': activeTab === tab.id }"
          class="tab-button"
        >
          {{ tab.name }}
        </button>
      </div>
      
      <div class="tab-content">
        <!-- Основные понятия -->
        <div v-if="activeTab === 'basics'" class="content-section basics-section">
          <h2>Что такое async и defer?</h2>
          
          <div class="comparison-table">
            <div class="table-header">
              <div class="table-cell">Атрибут</div>
              <div class="table-cell">Загрузка скрипта</div>
              <div class="table-cell">Выполнение</div>
              <div class="table-cell">Блокирует парсинг HTML</div>
            </div>
            <div class="table-row">
              <div class="table-cell"><span class="code-text">Обычный script</span></div>
              <div class="table-cell">Блокирует парсинг HTML</div>
              <div class="table-cell">Выполняется немедленно</div>
              <div class="table-cell">Да</div>
            </div>
            <div class="table-row">
              <div class="table-cell"><span class="code-text">async</span></div>
              <div class="table-cell">Асинхронно с парсингом HTML</div>
              <div class="table-cell">Как только скрипт загружен</div>
              <div class="table-cell">Только во время выполнения</div>
            </div>
            <div class="table-row">
              <div class="table-cell"><span class="code-text">defer</span></div>
              <div class="table-cell">Асинхронно с парсингом HTML</div>
              <div class="table-cell">После завершения парсинга HTML</div>
              <div class="table-cell">Нет</div>
            </div>
          </div>
          
          <div class="code-examples">
            <div class="code-block">
              <div class="code-title">Обычный скрипт</div>
              <pre class="code">
  &lt;script src="script.js"&gt;&lt;/script&gt;
              </pre>
            </div>
            
            <div class="code-block">
              <div class="code-title">Async скрипт</div>
              <pre class="code">
  &lt;script async src="script.js"&gt;&lt;/script&gt;
              </pre>
            </div>
            
            <div class="code-block">
              <div class="code-title">Defer скрипт</div>
              <pre class="code">
  &lt;script defer src="script.js"&gt;&lt;/script&gt;
              </pre>
            </div>
          </div>
        </div>
        
        <!-- Визуализация -->
        <div v-if="activeTab === 'visualization'" class="content-section visualization-section">
          <h2>Как работают async и defer</h2>
          
          <div class="controls">
            <button 
              v-for="(mode ) in loadingModes" 
              :key="mode.id"
              @click="selectMode(mode.id)"
              :class="{ 'active-button': activeMode === mode.id }"
              class="mode-button"
            >
              {{ mode.name }}
            </button>
            
            <button 
              @click="startAnimation"
              :disabled="isAnimating"
              class="start-button"
            >
              {{ isAnimating ? 'Загрузка...' : 'Запустить анимацию' }}
            </button>
          </div>
          
          <div class="visualization-container">
            <div class="browser-window">
              <div class="browser-header">
                <div class="browser-controls">
                  <div class="control red"></div>
                  <div class="control yellow"></div>
                  <div class="control green"></div>
                </div>
                <div class="browser-address">https://example.com</div>
              </div>
              <div class="browser-content">
                <div class="html-parsing">
                  <div class="parsing-bar-container">
                    <div class="parsing-bar-label">HTML Парсинг</div>
                    <div class="parsing-bar">
                      <div 
                        class="parsing-progress" 
                        :style="{ width: `${parsingProgress}%` }"
                        :class="{ 'parsing-paused': isParsingStopped }"
                      ></div>
                      <div 
                        v-if="scriptExecutionMarker > 0" 
                        class="script-execution-marker"
                        :style="{ left: `${scriptExecutionMarker}%` }"
                      ></div>
                    </div>
                  </div>
                  
                  <div class="script-loading-container">
                    <div class="script-loading-label">Загрузка Script.js</div>
                    <div class="script-loading-bar">
                      <div 
                        class="script-loading-progress"
                        :style="{ width: `${scriptLoadingProgress}%` }"
                      ></div>
                    </div>
                  </div>
                  
                  <div class="execution-info">
                    <div class="dom-ready" v-if="domIsReady">
                      DOM Готов! (DOMContentLoaded)
                    </div>
                    <div class="script-executed" v-if="scriptExecuted">
                      Скрипт выполнен!
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="timeline">
              <div class="timeline-markers">
                <div class="timeline-start">0ms</div>
                <div class="timeline-middle">500ms</div>
                <div class="timeline-end">1000ms</div>
              </div>
              <div class="timeline-events">
                <div 
                  v-for="event in timelineEvents" 
                  :key="event.id"
                  class="timeline-event"
                  :style="{ left: `${event.position}%` }"
                  :class="[event.type]"
                >
                  <div class="event-marker"></div>
                  <div class="event-label">{{ event.label }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="animation-explanation">
            <h3>Что происходит в анимации:</h3>
            <div v-if="activeMode === 'normal'">
              <p><strong>Обычный скрипт:</strong> Когда браузер встречает тег <span class="code-text">&lt;script&gt;</span>, он:</p>
              <ol>
                <li>Приостанавливает парсинг HTML</li>
                <li>Загружает скрипт (сетевой запрос)</li>
                <li>Выполняет скрипт сразу после загрузки</li>
                <li>Возобновляет парсинг HTML</li>
              </ol>
              <p>Это блокирует рендеринг страницы и может значительно замедлить загрузку.</p>
            </div>
            
            <div v-if="activeMode === 'async'">
              <p><strong>Async скрипт:</strong> С атрибутом <span class="code-text">async</span> браузер:</p>
              <ol>
                <li>Продолжает парсинг HTML параллельно с загрузкой скрипта</li>
                <li>Приостанавливает парсинг HTML только для выполнения скрипта, когда он загружен</li>
                <li>Возобновляет парсинг HTML после выполнения скрипта</li>
              </ol>
              <p>Скрипт выполняется, как только он загружен, вне зависимости от степени готовности HTML.</p>
            </div>
            
            <div v-if="activeMode === 'defer'">
              <p><strong>Defer скрипт:</strong> С атрибутом <span class="code-text">defer</span> браузер:</p>
              <ol>
                <li>Продолжает парсинг HTML параллельно с загрузкой скрипта</li>
                <li>Откладывает выполнение скрипта до завершения парсинга HTML</li>
                <li>Выполняет скрипт непосредственно перед событием DOMContentLoaded</li>
              </ol>
              <p>Скрипты <span class="code-text">defer</span> гарантированно выполняются в том порядке, в котором они появляются в HTML.</p>
            </div>
          </div>
        </div>
        
        <!-- Варианты использования -->
        <div v-if="activeTab === 'use-cases'" class="content-section use-cases-section">
          <h2>Когда использовать async и defer</h2>
          
          <div class="use-case-cards">
            <div class="use-case-card">
              <div class="card-icon normal-icon">
                <span class="material-icon">⚠️</span>
              </div>
              <div class="card-title">Обычный скрипт</div>
              <div class="card-content">
                <p><strong>Когда использовать:</strong></p>
                <ul>
                  <li>Скрипт критически важен для начального рендеринга страницы</li>
                  <li>Скрипт манипулирует DOM во время загрузки страницы</li>
                  <li>Скрипт должен выполниться до отображения контента</li>
                </ul>
                <p><strong>Примеры:</strong> Полифиллы, основные библиотеки для управления контентом страницы</p>
              </div>
            </div>
            
            <div class="use-case-card">
              <div class="card-icon async-icon">
                <span class="material-icon">🔄</span>
              </div>
              <div class="card-title">async</div>
              <div class="card-content">
                <p><strong>Когда использовать:</strong></p>
                <ul>
                  <li>Скрипт независим от других скриптов и DOM</li>
                  <li>Скрипт должен выполниться как можно скорее</li>
                  <li>Порядок выполнения не важен</li>
                </ul>
                <p><strong>Примеры:</strong> Аналитика, рекламные скрипты, виджеты социальных сетей</p>
              </div>
            </div>
            
            <div class="use-case-card">
              <div class="card-icon defer-icon">
                <span class="material-icon">⏱️</span>
              </div>
              <div class="card-title">defer</div>
              <div class="card-content">
                <p><strong>Когда использовать:</strong></p>
                <ul>
                  <li>Скрипт зависит от полностью построенного DOM</li>
                  <li>Скрипт не является критичным для начального рендеринга</li>
                  <li>Порядок выполнения скриптов важен</li>
                </ul>
                <p><strong>Примеры:</strong> Основной код приложения, обработчики событий, библиотеки UI</p>
              </div>
            </div>
          </div>
          
          <div class="real-world-examples">
            <h3>Примеры из реальной разработки</h3>
            
            <div class="example-scenario">
              <h4>Сценарий 1: Сайт электронной коммерции</h4>
              <div class="scenario-details">
                <p><strong>Требования:</strong> Быстрая загрузка контента, отслеживание аналитики, интерактивные элементы UI</p>
                <div class="code-block">
                  <pre class="code">
  &lt;!-- Критические стили для отображения товаров --&gt;
  &lt;link rel="stylesheet" href="critical.css"&gt;
  
  &lt;!-- Основные скрипты приложения, откладываем до построения DOM --&gt;
  &lt;script defer src="app.js"&gt;&lt;/script&gt;
  &lt;script defer src="product-gallery.js"&gt;&lt;/script&gt;
  
  &lt;!-- Аналитика, не зависящая от DOM --&gt;
  &lt;script async src="analytics.js"&gt;&lt;/script&gt;
  
  &lt;!-- Чат-бот, загружается независимо --&gt;
  &lt;script async src="chat-widget.js"&gt;&lt;/script&gt;
                  </pre>
                </div>
              </div>
            </div>
            
            <div class="example-scenario">
              <h4>Сценарий 2: Новостной сайт</h4>
              <div class="scenario-details">
                <p><strong>Требования:</strong> Быстрая загрузка контента, реклама, виджеты комментариев</p>
                <div class="code-block">
                  <pre class="code">
  &lt;!-- Полифиллы и критические библиотеки --&gt;
  &lt;script src="polyfills.js"&gt;&lt;/script&gt;
  
  &lt;!-- Основной код сайта, нужен после построения DOM --&gt;
  &lt;script defer src="main.js"&gt;&lt;/script&gt;
  
  &lt;!-- Системы комментариев, загружается после основного контента --&gt;
  &lt;script defer src="comments.js"&gt;&lt;/script&gt;
  
  &lt;!-- Рекламные модули, загружаются независимо --&gt;
  &lt;script async src="ads.js"&gt;&lt;/script&gt;
  
  &lt;!-- Аналитика --&gt;
  &lt;script async src="metrics.js"&gt;&lt;/script&gt;
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Подводные камни -->
        <div v-if="activeTab === 'pitfalls'" class="content-section pitfalls-section">
          <h2>Подводные камни и особенности</h2>
          
          <div class="pitfalls-list">
            <div class="pitfall-item">
              <div class="pitfall-title">
                <div class="pitfall-icon">⚠️</div>
                <h3>Порядок выполнения</h3>
              </div>
              <div class="pitfall-content">
                <p><strong>Проблема:</strong> <span class="code-text">async</span> скрипты выполняются в том порядке, в котором они загружаются, а не в том, в котором они указаны в HTML.</p>
                <div class="code-block">
                  <pre class="code">
  &lt;!-- Эти скрипты могут выполниться в любом порядке! --&gt;
  &lt;script async src="script1.js"&gt;&lt;/script&gt;
  &lt;script async src="script2.js"&gt;&lt;/script&gt;
                  </pre>
                </div>
                <p><strong>Решение:</strong> Если скрипты зависят друг от друга, используйте <span class="code-text">defer</span> или объедините их в один файл.</p>
              </div>
            </div>
            
            <div class="pitfall-item">
              <div class="pitfall-title">
                <div class="pitfall-icon">⚠️</div>
                <h3>document.write и блокировка парсинга</h3>
              </div>
              <div class="pitfall-content">
                <p><strong>Проблема:</strong> Использование <span class="code-text">document.write()</span> в <span class="code-text">async</span> или <span class="code-text">defer</span> скриптах может привести к неожиданным результатам.</p>
                <div class="code-block">
                  <pre class="code">
  // В async скрипте
  document.write('&lt;div&gt;Динамический контент&lt;/div&gt;');
  // Может вызвать перезапись всей страницы!
                  </pre>
                </div>
                <p><strong>Решение:</strong> Используйте современные методы DOM-манипуляций, такие как <span class="code-text">document.createElement()</span> и <span class="code-text">appendChild()</span>.</p>
              </div>
            </div>
            
            <div class="pitfall-item">
              <div class="pitfall-title">
                <div class="pitfall-icon">⚠️</div>
                <h3>Доступ к DOM в async скриптах</h3>
              </div>
              <div class="pitfall-content">
                <p><strong>Проблема:</strong> <span class="code-text">async</span> скрипты могут выполниться до того, как DOM будет полностью построен.</p>
                <div class="code-block">
                  <pre class="code">
  // В async скрипте
  const element = document.getElementById('my-element');
  // element может быть null, если DOM еще не построен до этого элемента
                  </pre>
                </div>
                <p><strong>Решение:</strong> Проверяйте наличие элементов перед использованием или используйте <span class="code-text">defer</span> для скриптов, которые взаимодействуют с DOM.</p>
              </div>
            </div>
            
            <div class="pitfall-item">
              <div class="pitfall-title">
                <div class="pitfall-icon">⚠️</div>
                <h3>Встроенные скрипты</h3>
              </div>
              <div class="pitfall-content">
                <p><strong>Проблема:</strong> Атрибуты <span class="code-text">async</span> и <span class="code-text">defer</span> работают только для внешних скриптов с атрибутом <span class="code-text">src</span>.</p>
                <div class="code-block">
                  <pre class="code">
  &lt;!-- Эти атрибуты будут проигнорированы --&gt;
  &lt;script async defer&gt;
    console.log('Этот скрипт выполнится синхронно');
  &lt;/script&gt;
                  </pre>
                </div>
                <p><strong>Решение:</strong> Выносите код во внешние файлы скриптов или используйте <span class="code-text">DOMContentLoaded</span> событие.</p>
              </div>
            </div>
            
            <div class="pitfall-item">
              <div class="pitfall-title">
                <div class="pitfall-icon">⚠️</div>
                <h3>Совместимость со старыми браузерами</h3>
              </div>
              <div class="pitfall-content">
                <p><strong>Проблема:</strong> Очень старые браузеры могут не поддерживать <span class="code-text">async</span> или <span class="code-text">defer</span>.</p>
                <p><strong>Решение:</strong> Для критических скриптов можно использовать динамическую загрузку или размещать их в конце <span class="code-text">&lt;body&gt;</span>:</p>
                <div class="code-block">
                  <pre class="code">
  &lt;!-- В конце body, перед закрывающим тегом --&gt;
  &lt;script src="script.js"&gt;&lt;/script&gt;
  &lt;/body&gt;
                  </pre>
                </div>
              </div>
            </div>
          </div>
          
          <div class="best-practices">
            <h3>Лучшие практики</h3>
            <ul class="practices-list">
              <li>
                <span class="practice-check">✓</span>
                <div class="practice-text">
                  <strong>Используйте <span class="code-text">defer</span> по умолчанию</strong> для большинства скриптов, особенно если они взаимодействуют с DOM.
                </div>
              </li>
              <li>
                <span class="practice-check">✓</span>
                <div class="practice-text">
                  <strong>Используйте <span class="code-text">async</span></strong> для независимых скриптов, которые не нуждаются в DOM или других скриптах.
                </div>
              </li>
              <li>
                <span class="practice-check">✓</span>
                <div class="practice-text">
                  <strong>Объединяйте скрипты</strong>, чтобы уменьшить количество сетевых запросов (но не в ущерб кэшированию).
                </div>
              </li>
              <li>
                <span class="practice-check">✓</span>
                <div class="practice-text">
                  <strong>Размещайте критические скрипты в <span class="code-text">&lt;head&gt;</span></strong>, а некритические перед закрывающим тегом <span class="code-text">&lt;/body&gt;</span>.
                </div>
              </li>
              <li>
                <span class="practice-check">✓</span>
                <div class="practice-text">
                  <strong>Используйте современные методы оптимизации</strong> — модули ES, разделение кода (code-splitting), предзагрузку ресурсов.
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Алгоритм принятия решений -->
        <div v-if="activeTab === 'algorithm'" class="content-section algorithm-section">
          <h2>Алгоритм выбора атрибута для скрипта</h2>
          
          <div class="decision-tree">
            <div class="tree-node root">
              <div class="node-content">
                <div class="node-title">Загрузка скрипта</div>
                <div class="node-question">Является ли скрипт критичным для начального рендеринга?</div>
              </div>
              <div class="tree-branches">
                <div class="branch">
                  <div class="branch-label">Да</div>
                  <div class="branch-path path-left"></div>
                  <div class="tree-node child">
                    <div class="node-content">
                      <div class="node-title">Зависит от других скриптов?</div>
                    </div>
                    <div class="tree-branches">
                      <div class="branch">
                        <div class="branch-label">Да</div>
                        <div class="branch-path path-left"></div>
                        <div class="tree-node grandchild">
                          <div class="node-content decision">
                            <div class="decision-label">Обычный скрипт</div>
                            <div class="code-text">&lt;script src="..."&gt;</div>
                            <div class="decision-note">Но поместите его в &lt;head&gt;</div>
                          </div>
                        </div>
                      </div>
                      <div class="branch">
                        <div class="branch-label">Нет</div>
                        <div class="branch-path path-right"></div>
                        <div class="tree-node grandchild">
                          <div class="node-content decision">
                            <div class="decision-label">Обычный скрипт</div>
                            <div class="code-text">&lt;script src="..."&gt;</div>
                            <div class="decision-note">Рассмотрите возможность использования modulepreload</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="branch">
                  <div class="branch-label">Нет</div>
                  <div class="branch-path path-right"></div>
                  <div class="tree-node child">
                    <div class="node-content">
                      <div class="node-title">Скрипт использует DOM?</div>
                    </div>
                    <div class="tree-branches">
                      <div class="branch">
                        <div class="branch-label">Да</div>
                        <div class="branch-path path-left"></div>
                        <div class="tree-node grandchild">
                          <div class="node-content">
                            <div class="node-title">Порядок выполнения важен?</div>
                          </div>
                          <div class="tree-branches">
                            <div class="branch">
                              <div class="branch-label">Да</div>
                              <div class="branch-path path-left"></div>
                              <div class="tree-node decision">
                                <div class="node-content decision">
                                  <div class="decision-label">defer</div>
                                  <div class="code-text">&lt;script defer src="..."&gt;</div>
                                </div>
                              </div>
                            </div>
                            <div class="branch">
                              <div class="branch-label">Нет</div>
                              <div class="branch-path path-right"></div>
                              <div class="tree-node decision">
                                <div class="node-content decision">
                                  <div class="decision-label">defer</div>
                                  <div class="code-text">&lt;script defer src="..."&gt;</div>
                                  <div class="decision-note">async тоже подойдет, но defer безопаснее</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="branch">
                        <div class="branch-label">Нет</div>
                        <div class="branch-path path-right"></div>
                        <div class="tree-node grandchild">
                          <div class="node-content decision">
                            <div class="decision-label">async</div>
                            <div class="code-text">&lt;script async src="..."&gt;</div>
                            <div class="decision-note">Идеально для аналитики, рекламы и т.д.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="algorithm-steps">
            <h3>Пошаговый алгоритм принятия решения</h3>
            <ol class="steps-list">
              <li>
                <strong>Определите критичность скрипта:</strong>
                <p>Нужен ли скрипт для первоначального рендеринга страницы? Блокирует ли он отображение важного контента?</p>
              </li>
              <li>
                <strong>Оцените зависимости:</strong>
                <p>Зависит ли скрипт от DOM или от других скриптов? Нужен ли определённый порядок выполнения?</p>
              </li>
              <li>
                <strong>Выберите атрибут:</strong>
                <ul>
                  <li><strong>Без атрибутов:</strong> Для критических, блокирующих скриптов (используйте редко)</li>
                  <li><strong>async:</strong> Для независимых скриптов, которые не взаимодействуют с DOM</li>
                  <li><strong>defer:</strong> Для большинства скриптов, особенно тех, которые взаимодействуют с DOM</li>
                </ul>
              </li>
              <li>
                <strong>Оптимизируйте размещение:</strong>
                <p>Размещайте скрипты в &lt;head&gt; с соответствующим атрибутом или в конце &lt;body&gt;</p>
              </li>
              <li>
                <strong>Тестируйте производительность:</strong>
                <p>Используйте инструменты вроде Lighthouse, WebPageTest для проверки влияния загрузки скриптов</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref,  onBeforeUnmount } from 'vue';
  
  // Состояние вкладок
  const tabs = [
    { id: 'basics', name: 'Основные понятия' },
    { id: 'visualization', name: 'Визуализация' },
    { id: 'use-cases', name: 'Варианты использования' },
    { id: 'pitfalls', name: 'Подводные камни' },
    { id: 'algorithm', name: 'Алгоритм выбора' }
  ];
  
  const activeTab = ref('basics');
  
  // Состояние для визуализации
  const loadingModes = [
    { id: 'normal', name: 'Обычный script' },
    { id: 'async', name: 'async' },
    { id: 'defer', name: 'defer' }
  ];
  
  const activeMode = ref('normal');
  const isAnimating = ref(false);
  const parsingProgress = ref(0);
  const scriptLoadingProgress = ref(0);
  const isParsingStopped = ref(false);
  const scriptExecutionMarker = ref(0);
  const domIsReady = ref(false);
  const scriptExecuted = ref(false);
  const timelineEvents = ref([]);
  
  // Интервалы для анимации
  let parsingInterval;
  let loadingInterval;
  
  // Переключение вкладок
  function selectTab(tabId) {
    activeTab.value = tabId;
    stopAnimation();
  }
  
  // Переключение режима загрузки
  function selectMode(modeId) {
    activeMode.value = modeId;
    stopAnimation();
  }
  
  // Запуск анимации
  function startAnimation() {
    // Сброс состояния
    stopAnimation();
    isAnimating.value = true;
    parsingProgress.value = 0;
    scriptLoadingProgress.value = 0;
    isParsingStopped.value = false;
    scriptExecutionMarker.value = 0;
    domIsReady.value = false;
    scriptExecuted.value = false;
    timelineEvents.value = [];
    
    // Разные сценарии анимации в зависимости от режима
    if (activeMode.value === 'normal') {
      // Обычный script - парсинг останавливается для загрузки и выполнения скрипта
      animateNormalScript();
    } else if (activeMode.value === 'async') {
      // Async - парсинг продолжается, скрипт выполняется как только загружен
      animateAsyncScript();
    } else if (activeMode.value === 'defer') {
      // Defer - парсинг продолжается, скрипт выполняется после парсинга
      animateDeferScript();
    }
  }
  
  // Анимация для обычного скрипта
  function animateNormalScript() {
    // Первая фаза: парсинг HTML до скрипта
    parsingInterval = setInterval(() => {
      parsingProgress.value += 2;
      if (parsingProgress.value >= 30) {
        clearInterval(parsingInterval);
        // Нашли тег скрипта, останавливаем парсинг
        isParsingStopped.value = true;
        
        // Добавляем событие в таймлайн
        timelineEvents.value.push({
          id: 'script-found',
          type: 'parsing',
          label: 'Тег скрипта найден',
          position: 30
        });
        
        // Начинаем загрузку скрипта
        loadingInterval = setInterval(() => {
          scriptLoadingProgress.value += 4;
          if (scriptLoadingProgress.value >= 100) {
            clearInterval(loadingInterval);
            
            // Добавляем событие в таймлайн
            timelineEvents.value.push({
              id: 'script-loaded',
              type: 'script',
              label: 'Скрипт загружен',
              position: 60
            });
            
            // Сразу выполняем скрипт
            setTimeout(() => {
              scriptExecuted.value = true;
              scriptExecutionMarker.value = 30;
              
              // Добавляем событие в таймлайн
              timelineEvents.value.push({
                id: 'script-executed',
                type: 'execution',
                label: 'Скрипт выполнен',
                position: 65
              });
              
              // Продолжаем парсинг после выполнения скрипта
              isParsingStopped.value = false;
              parsingInterval = setInterval(() => {
                parsingProgress.value += 2;
                if (parsingProgress.value >= 100) {
                  clearInterval(parsingInterval);
                  domIsReady.value = true;
                  
                  // Добавляем событие в таймлайн
                  timelineEvents.value.push({
                    id: 'dom-ready',
                    type: 'dom',
                    label: 'DOM готов',
                    position: 100
                  });
                  
                  isAnimating.value = false;
                }
              }, 40);
            }, 500);
          }
        }, 40);
      }
    }, 40);
  }
  
  // Анимация для async скрипта
  function animateAsyncScript() {
    // Парсинг и загрузка скрипта происходят параллельно
    parsingInterval = setInterval(() => {
      parsingProgress.value += 1;
      if (parsingProgress.value === 30) {
        // Добавляем событие в таймлайн
        timelineEvents.value.push({
          id: 'script-found',
          type: 'parsing',
          label: 'Тег скрипта найден',
          position: 30
        });
        
        // Начинаем загрузку скрипта параллельно
        loadingInterval = setInterval(() => {
          scriptLoadingProgress.value += 2;
          if (scriptLoadingProgress.value >= 100) {
            clearInterval(loadingInterval);
            
            // Добавляем событие в таймлайн
            timelineEvents.value.push({
              id: 'script-loaded',
              type: 'script',
              label: 'Скрипт загружен',
              position: 70
            });
            
            // Приостанавливаем парсинг для выполнения скрипта
            isParsingStopped.value = true;
            setTimeout(() => {
              scriptExecuted.value = true;
              scriptExecutionMarker.value = parsingProgress.value;
              
              // Добавляем событие в таймлайн
              timelineEvents.value.push({
                id: 'script-executed',
                type: 'execution',
                label: 'Скрипт выполнен',
                position: 75
              });
              
              // Возобновляем парсинг
              isParsingStopped.value = false;
            }, 500);
          }
        }, 40);
      }
      
      if (parsingProgress.value >= 100) {
        clearInterval(parsingInterval);
        domIsReady.value = true;
        
        // Добавляем событие в таймлайн
        timelineEvents.value.push({
          id: 'dom-ready',
          type: 'dom',
          label: 'DOM готов',
          position: 100
        });
        
        // Завершаем анимацию если загрузка скрипта тоже завершена
        if (scriptLoadingProgress.value >= 100 && scriptExecuted.value) {
          isAnimating.value = false;
        }
      }
    }, 30);
  }
  
  // Анимация для defer скрипта
  function animateDeferScript() {
    // Парсинг и загрузка скрипта происходят параллельно
    parsingInterval = setInterval(() => {
      parsingProgress.value += 1;
      if (parsingProgress.value === 30) {
        // Добавляем событие в таймлайн
        timelineEvents.value.push({
          id: 'script-found',
          type: 'parsing',
          label: 'Тег скрипта найден',
          position: 30
        });
        
        // Начинаем загрузку скрипта параллельно
        loadingInterval = setInterval(() => {
          scriptLoadingProgress.value += 2;
          if (scriptLoadingProgress.value >= 100) {
            clearInterval(loadingInterval);
            
            // Добавляем событие в таймлайн
            timelineEvents.value.push({
              id: 'script-loaded',
              type: 'script',
              label: 'Скрипт загружен',
              position: 70
            });
          }
        }, 40);
      }
      
      if (parsingProgress.value >= 100) {
        clearInterval(parsingInterval);
        
        // Добавляем событие в таймлайн
        timelineEvents.value.push({
          id: 'parsing-complete',
          type: 'parsing',
          label: 'Парсинг HTML завершен',
          position: 90
        });
        
        // Выполняем скрипт только после завершения парсинга HTML
        setTimeout(() => {
          scriptExecuted.value = true;
          scriptExecutionMarker.value = 100;
          
          // Добавляем событие в таймлайн
          timelineEvents.value.push({
            id: 'script-executed',
            type: 'execution',
            label: 'Скрипт выполнен',
            position: 95
          });
          
          // DOM готов после выполнения всех defer-скриптов
          setTimeout(() => {
            domIsReady.value = true;
            
            // Добавляем событие в таймлайн
            timelineEvents.value.push({
              id: 'dom-ready',
              type: 'dom',
              label: 'DOM готов',
              position: 100
            });
            
            isAnimating.value = false;
          }, 300);
        }, 500);
      }
    }, 30);
  }
  
  // Остановка анимации
  function stopAnimation() {
    clearInterval(parsingInterval);
    clearInterval(loadingInterval);
    isAnimating.value = false;
  }
  
  // Очистка при размонтировании компонента
  onBeforeUnmount(() => {
    stopAnimation();
  });
  </script>
  
  <style scoped>
  .async-defer-explorer {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: #000;
    background-color: #fff;
    line-height: 1.6;
  }
  
  .title {
    text-align: center;
    margin-bottom: 30px;
    font-size: 2.2rem;
    color: #000;
  }
  
  .code-text {
    font-family: monospace;
    background-color: #f6f8fa;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 0.9em;
    color: #000;
  }
  
  .intro-section {
    margin-bottom: 30px;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  /* Табы */
  .tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    overflow-x: auto;
    padding-bottom: 5px;
  }
  
  .tab-button {
    padding: 10px 20px;
    background-color: #f6f8fa;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    color: #000;
  }
  
  .tab-button:hover {
    background-color: #e9ecef;
  }
  
  .tab-button.active-tab {
    background-color: #4b6bfb;
    color: white;
    border-color: #4b6bfb;
  }
  
  .content-section {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    margin-bottom: 30px;
    animation: fadeIn 0.4s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Таблица сравнения */
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
    margin-bottom: 30px;
    background-color: #fff;
    color: #000;
  }
  
  .table-header, .table-row {
    display: flex;
    border-bottom: 1px solid #ddd;
  }
  
  .table-header {
    background-color: #f6f8fa;
    font-weight: bold;
  }
  
  .table-cell {
    flex: 1;
    padding: 12px 15px;
    border-right: 1px solid #ddd;
  }
  
  .table-cell:last-child {
    border-right: none;
  }
  
  /* Примеры кода */
  .code-examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .code-block {
    background-color: #f6f8fa;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid #ddd;
  }
  
  .code-title {
    background-color: #f0f0f0;
    padding: 10px 15px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    color: #000;
  }
  
  .code {
    padding: 15px;
    overflow-x: auto;
    margin: 0;
    font-family: monospace;
    white-space: pre;
    background-color: #fff;
    color: #000;
    line-height: 1.5;
  }
  
  /* Контролы визуализации */
  .controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .mode-button {
    padding: 8px 16px;
    background-color: #f6f8fa;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #000;
  }
  
  .mode-button:hover {
    background-color: #e9ecef;
  }
  
  .mode-button.active-button {
    background-color: #4b6bfb;
    color: white;
    border-color: #4b6bfb;
  }
  
  .start-button {
    margin-left: auto;
    padding: 8px 16px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .start-button:hover:not(:disabled) {
    background-color: #218838;
  }
  
  .start-button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  
  /* Визуализация */
  .visualization-container {
    margin-bottom: 30px;
  }
  
  .browser-window {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .browser-header {
    background-color: #f6f8fa;
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
  }
  
  .browser-controls {
    display: flex;
    gap: 6px;
    margin-right: 15px;
  }
  
  .control {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  
  .control.red { background-color: #ff605c; }
  .control.yellow { background-color: #ffbd44; }
  .control.green { background-color: #00ca4e; }
  
  .browser-address {
    flex: 1;
    padding: 5px 10px;
    background-color: #fff;
    border-radius: 3px;
    font-size: 0.9rem;
    color: #666;
  }
  
  .browser-content {
    padding: 20px;
    background-color: #fff;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .html-parsing {
    width: 100%;
    max-width: 600px;
  }
  
  .parsing-bar-container, .script-loading-container {
    margin-bottom: 20px;
  }
  
  .parsing-bar-label, .script-loading-label {
    margin-bottom: 8px;
    font-weight: bold;
    color: #000;
  }
  
  .parsing-bar, .script-loading-bar {
    height: 24px;
    background-color: #f0f0f0;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }
  
  .parsing-progress, .script-loading-progress {
    height: 100%;
    background-color: #4b6bfb;
    transition: width 0.3s ease;
    position: relative;
  }
  
  .parsing-progress.parsing-paused {
    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
    background-size: 28px 28px;
    animation: progress-stripe 1s linear infinite;
  }
  
  @keyframes progress-stripe {
    0% { background-position: 0 0; }
    100% { background-position: 28px 0; }
  }
  
  .script-execution-marker {
    position: absolute;
    top: 0;
    width: 4px;
    height: 100%;
    background-color: #fd7e14;
    z-index: 2;
  }
  
  .execution-info {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  
  .dom-ready, .script-executed {
    padding: 8px 16px;
    border-radius: 4px;
    animation: fadeIn 0.5s ease;
    font-weight: bold;
  }
  
  .dom-ready {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  
  .script-executed {
    background-color: #fff3cd;
    color: #856404;
    border: 1px solid #ffeeba;
  }
  
  /* Таймлайн */
  .timeline {
    margin-top: 30px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    position: relative;
  }
  
  .timeline-markers {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 0 10px;
    color: #6c757d;
    font-size: 0.85rem;
  }
  
  .timeline-events {
    height: 40px;
    background-color: #e9ecef;
    border-radius: 4px;
    position: relative;
  }
  
  .timeline-event {
    position: absolute;
    top: 0;
    transform: translateX(-50%);
  }
  
  .event-marker {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin: 0 auto 5px;
  }
  
  .timeline-event.parsing .event-marker { background-color: #4b6bfb; }
  .timeline-event.script .event-marker { background-color: #fd7e14; }
  .timeline-event.execution .event-marker { background-color: #e83e8c; }
  .timeline-event.dom .event-marker { background-color: #28a745; }
  
  .event-label {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 0.8rem;
    color: #000;
    background-color: #fff;
    padding: 2px 5px;
    border-radius: 3px;
    border: 1px solid #ddd;
  }
  
  /* Объяснение анимации */
  .animation-explanation {
    margin-top: 30px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #4b6bfb;
  }
  
  .animation-explanation h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #000;
  }
  
  .animation-explanation p, .animation-explanation li {
    color: #000;
  }
  
  /* Карточки с вариантами использования */
  .use-case-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .use-case-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }
  
  .use-case-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
  
  .card-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
  }
  
  .normal-icon { background-color: #ffc107; }
  .async-icon { background-color: #17a2b8; }
  .defer-icon { background-color: #28a745; }
  
  .material-icon {
    font-size: 1.8rem;
  }
  
  .card-title {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 15px;
    color: #000;
  }
  
  .card-content {
    color: #000;
  }
  
  .card-content ul {
    padding-left: 20px;
  }
  
  .card-content li {
    margin-bottom: 8px;
  }
  
  /* Примеры из реальной разработки */
  .real-world-examples {
    margin-top: 40px;
  }
  
  .example-scenario {
    margin-bottom: 30px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .example-scenario h4 {
    margin: 0;
    padding: 15px;
    background-color: #f6f8fa;
    border-bottom: 1px solid #ddd;
    color: #000;
  }
  
  .scenario-details {
    padding: 15px;
  }
  
  /* Подводные камни */
  .pitfalls-list {
    margin-bottom: 30px;
  }
  
  .pitfall-item {
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .pitfall-title {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 15px;
    background-color: #f6f8fa;
    border-bottom: 1px solid #ddd;
  }
  
  .pitfall-icon {
    font-size: 1.5rem;
  }
  
  .pitfall-title h3 {
    margin: 0;
    color: #000;
  }
  
  .pitfall-content {
    padding: 15px;
  }
  
  /* Лучшие практики */
  .best-practices {
    padding: 20px;
    background-color: #e8f4f8;
    border-radius: 8px;
    border-left: 4px solid #17a2b8;
  }
  
  .practices-list {
    list-style-type: none;
    padding: 0;
  }
  
  .practices-list li {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
    align-items: flex-start;
  }
  
  .practice-check {
    width: 24px;
    height: 24px;
    background-color: #28a745;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .practice-text {
    flex: 1;
  }
  
  /* Дерево принятия решений */
  .decision-tree {
    margin: 30px 0;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    overflow-x: auto;
  }
  
  .tree-node {
    margin-bottom: 30px;
    position: relative;
  }
  
  .node-content {
    max-width: 200px;
    margin: 0 auto;
    padding: 15px;
    background-color: #fff;
    border: 2px solid #4b6bfb;
    border-radius: 8px;
    text-align: center;
    position: relative;
    z-index: 2;
  }
  
  .node-title {
    font-weight: bold;
    margin-bottom: 8px;
    color: #000;
  }
  
  .node-question {
    font-size: 0.9rem;
    color: #000;
  }
  
  .tree-branches {
    display: flex;
    justify-content: space-around;
    position: relative;
  }
  
  .branch {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  
  .branch-label {
    padding: 5px 10px;
    background-color: #e9ecef;
    border-radius: 12px;
    margin: 10px 0;
    font-size: 0.85rem;
    color: #000;
  }
  
  .branch-path {
    width: 2px;
    height: 30px;
    background-color: #6c757d;
  }
  
  .path-left {
    position: relative;
  }
  
  .path-left:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: #6c757d;
    transform: translateX(-50%);
  }
  
  .path-right {
    position: relative;
  }
  
  .path-right:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: #6c757d;
    transform: translateX(-50%);
  }
  
  .node-content.decision {
    border-color: #28a745;
  }
  
  .decision-label {
    font-weight: bold;
    color: #28a745;
    margin-bottom: 8px;
  }
  
  .decision-note {
    font-size: 0.8rem;
    font-style: italic;
    margin-top: 8px;
    color: #6c757d;
  }
  
  /* Алгоритм принятия решения */
  .algorithm-steps {
    margin-top: 40px;
  }
  
  .steps-list {
    padding-left: 20px;
  }
  
  .steps-list li {
    margin-bottom: 15px;
  }
  
  .steps-list ul {
    margin-top: 10px;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .comparison-table {
      font-size: 0.9rem;
    }
    
    .use-case-cards, .code-examples {
      grid-template-columns: 1fr;
    }
    
    .table-header, .table-row {
      flex-direction: column;
    }
    
    .table-cell {
      border-right: none;
      border-bottom: 1px solid #ddd;
    }
    
    .table-cell:last-child {
      border-bottom: none;
    }
    
    .controls {
      flex-direction: column;
    }
    
    .start-button {
      margin: 0;
    }
  }
  
  @media (max-width: 480px) {
    .title {
      font-size: 1.8rem;
    }
    
    .tabs {
      flex-direction: column;
    }
    
    .code {
      font-size: 0.8rem;
    }
  }
  </style>