<template>
    <div class="browser-cycle-container">
      <h1>Что происходит, когда вы вводите URL в браузер?</h1>
      
      <div class="address-bar-container">
        <div class="address-bar">
          <input
            v-model="url"
            placeholder="Введите URL (например, https://example.com)"
            @keyup.enter="startDemo"
            :disabled="demoRunning"
          />
          <button @click="startDemo" :disabled="demoRunning || !url">Go!</button>
        </div>
      </div>
  
      <div class="cycle-timeline">
        <div 
          v-for="(step, index) in steps" 
          :key="index"
          class="timeline-step"
          :class="{ active: currentStepIndex >= index, completed: currentStepIndex > index }"
          @click="jumpToStep(index)"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-title">{{ step.title }}</div>
        </div>
      </div>
  
      <div class="visualization-container">
        <div class="visualization-area">
          <div class="devices">
            <!-- Браузер -->
            <div class="browser-device">
              <div class="browser-header">
                <div class="browser-url" :class="{ 'typing': isTyping }">{{ displayUrl }}</div>
              </div>
              <div class="browser-body">
                <div class="browser-content" :class="{ 'loading': isLoading, 'rendered': isRendered }">
                  <div v-if="isRendered" class="rendered-page">
                    <div class="page-header"></div>
                    <div class="page-content">
                      <div class="content-block"></div>
                      <div class="content-block"></div>
                      <div class="content-block"></div>
                    </div>
                  </div>
                  <div v-else-if="isLoading" class="loading-indicator">
                    <div class="spinner"></div>
                  </div>
                  <div v-else class="browser-placeholder">
                    <span>Введите URL и нажмите Go!</span>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Интернет -->
            <div class="network">
              <div class="packets" :class="{ 'dns-active': dnsActive, 'tcp-active': tcpActive, 'request-active': requestActive, 'response-active': responseActive }">
                <div class="dns-packet packet"></div>
                <div class="tcp-packet packet"></div>
                <div class="request-packet packet"></div>
                <div class="response-packet packet"></div>
              </div>
            </div>
  
            <!-- Сервер -->
            <div class="server-device">
              <div class="server-lights">
                <div class="server-light" :class="{ 'active': serverActive }"></div>
              </div>
              <div class="server-body">
                <div class="server-rack"></div>
                <div class="server-rack"></div>
                <div class="server-rack"></div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="explanation-area">
          <div class="current-step">
            <h2>{{ currentStep.title }}</h2>
            <div class="step-description" v-html="currentStep.description"></div>
            
            <div class="code-snippet" v-if="currentStep.code">
              <pre><code>{{ currentStep.code }}</code></pre>
            </div>
          </div>
  
          <div class="navigation-controls">
            <button 
              @click="prevStep" 
              :disabled="currentStepIndex === 0 || demoInProgress"
            >
              Назад
            </button>
            <button 
              @click="nextStep" 
              :disabled="currentStepIndex === steps.length - 1 || demoInProgress"
            >
              Вперед
            </button>
            <button 
              @click="resetDemo" 
              :disabled="demoInProgress"
            >
              Сбросить
            </button>
            <button 
              @click="runFullDemo" 
              :disabled="demoInProgress || !url"
            >
              Запустить полное демо
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Состояние компонента
  const url = ref('https://example.com');
  const displayUrl = ref('');
  const currentStepIndex = ref(0);
  const demoRunning = ref(false);
  const demoInProgress = ref(false);
  const isTyping = ref(false);
  const isLoading = ref(false);
  const isRendered = ref(false);
  const dnsActive = ref(false);
  const tcpActive = ref(false);
  const requestActive = ref(false);
  const responseActive = ref(false);
  const serverActive = ref(false);
  
  // Шаги процесса
  const steps = [
    {
      title: "Ввод URL",
      description: `
        <p>Процесс начинается с того, что пользователь вводит URL (Uniform Resource Locator) в адресную строку браузера.</p>
        <p>URL обычно имеет следующую структуру: <strong>protocol://domain:port/path?queryParams#fragment</strong></p>
        <p>Например: <code>https://example.com/products?id=123#details</code></p>
        <ul>
          <li><strong>https://</strong> - протокол (HTTP или HTTPS)</li>
          <li><strong>example.com</strong> - доменное имя</li>
          <li><strong>/products</strong> - путь</li>
          <li><strong>?id=123</strong> - параметры запроса</li>
          <li><strong>#details</strong> - фрагмент (якорь)</li>
        </ul>
        <p>Когда пользователь нажимает Enter, браузер начинает процесс загрузки страницы.</p>
      `
    },
    {
      title: "Проверка HSTS и кэша",
      description: `
        <p>Перед тем как отправить запрос, браузер выполняет несколько проверок:</p>
        <ol>
          <li><strong>Проверка HSTS (HTTP Strict Transport Security)</strong>: браузер проверяет, есть ли домен в списке HSTS, чтобы определить, нужно ли использовать HTTPS вместо HTTP</li>
          <li><strong>Проверка кэша браузера</strong>: если запрашиваемый ресурс уже есть в кэше и он не устарел, браузер может использовать кэшированную версию</li>
          <li><strong>Проверка Service Worker</strong>: если для данного сайта установлен Service Worker, он может перехватить запрос и обработать его</li>
        </ol>
        <p>Если ресурс не найден в кэше или Service Worker не обрабатывает запрос, браузер продолжает процесс и переходит к следующему шагу.</p>
      `
    },
    {
      title: "DNS-запрос",
      description: `
        <p>Браузер должен преобразовать доменное имя (например, example.com) в IP-адрес сервера.</p>
        <p>Для этого используется система DNS (Domain Name System). Вот как происходит DNS-запрос:</p>
        <ol>
          <li>Браузер проверяет свой локальный кэш DNS</li>
          <li>Если адрес не найден, запрос идет в кэш операционной системы</li>
          <li>Затем проверяется файл hosts на компьютере</li>
          <li>Запрос отправляется DNS-серверу, указанному в настройках сети (обычно это DNS провайдера)</li>
          <li>Если DNS-сервер провайдера не имеет информации, запрос идет к корневым DNS-серверам, затем к серверам TLD (.com, .org, и т.д.), и наконец к авторитетным DNS-серверам домена</li>
        </ol>
        <p>В результате браузер получает IP-адрес сервера, где размещен запрашиваемый сайт.</p>
      `,
      code: `
  // Пример DNS-запроса в Node.js
  const dns = require('dns');
  dns.lookup('example.com', (err, address, family) => {
    console.log('IP-адрес: %j, тип: IPv%s', address, family);
    // Вывод: IP-адрес: "93.184.216.34", тип: IPv4
  });`
    },
    {
      title: "Установление TCP-соединения",
      description: `
        <p>После получения IP-адреса браузер устанавливает соединение с сервером с помощью протокола TCP (Transmission Control Protocol).</p>
        <p>TCP обеспечивает надежную передачу данных между клиентом и сервером. Процесс установления TCP-соединения называется "трехстороннее рукопожатие" (Three-way handshake):</p>
        <ol>
          <li><strong>SYN</strong>: Клиент отправляет пакет SYN (synchronize) с случайным порядковым номером</li>
          <li><strong>SYN-ACK</strong>: Сервер отвечает пакетом SYN-ACK (synchronize-acknowledge) с подтверждением и своим случайным порядковым номером</li>
          <li><strong>ACK</strong>: Клиент отправляет пакет ACK (acknowledge), подтверждающий получение ответа от сервера</li>
        </ol>
        <p>После успешного завершения этого процесса TCP-соединение установлено и готово для передачи данных.</p>
      `
    },
    {
      title: "TLS-рукопожатие (для HTTPS)",
      description: `
        <p>Если используется HTTPS (протокол, обеспечивающий безопасность передачи данных), после установления TCP-соединения начинается процесс TLS-рукопожатия (Transport Layer Security handshake):</p>
        <ol>
          <li>Клиент отправляет сообщение ClientHello с поддерживаемыми версиями TLS, шифрами и случайным числом</li>
          <li>Сервер отвечает сообщением ServerHello, выбирая версию и шифр, затем отправляет свой сертификат и ключ, а также запрашивает клиентский сертификат (опционально)</li>
          <li>Клиент проверяет сертификат сервера, создает предварительный секретный ключ, шифрует его с помощью публичного ключа сервера и отправляет серверу</li>
          <li>На основе обмена информацией оба участника независимо создают симметричные ключи сессии</li>
          <li>Клиент и сервер обмениваются сообщениями Finished, подтверждая, что будущие сообщения будут зашифрованы с использованием ключей сессии</li>
        </ol>
        <p>После TLS-рукопожатия устанавливается безопасное соединение, и все данные между клиентом и сервером будут зашифрованы.</p>
      `
    },
    {
      title: "Отправка HTTP-запроса",
      description: `
        <p>После установления соединения браузер отправляет HTTP-запрос на сервер. HTTP-запрос включает в себя:</p>
        <ol>
          <li><strong>Метод запроса</strong> (GET, POST, PUT, DELETE и т.д.)</li>
          <li><strong>Путь к ресурсу</strong> (/index.html, /api/users и т.д.)</li>
          <li><strong>Версию HTTP</strong> (HTTP/1.1, HTTP/2, HTTP/3)</li>
          <li><strong>Заголовки</strong> (Host, User-Agent, Accept, Cookie, и т.д.)</li>
          <li><strong>Тело запроса</strong> (для методов POST и PUT, содержит отправляемые данные)</li>
        </ol>
        <p>Для обычного запроса страницы используется метод GET, который не имеет тела запроса.</p>
      `,
      code: `
  // Пример HTTP-запроса
  GET /index.html HTTP/1.1
  Host: example.com
  User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
  Accept: text/html,application/xhtml+xml,application/xml
  Accept-Language: ru-RU,ru;en-US,en
  Accept-Encoding: gzip, deflate, br
  Connection: keep-alive
  Cookie: sessionId=abc123; userId=456`
    },
    {
      title: "Обработка запроса на сервере",
      description: `
        <p>Когда сервер получает HTTP-запрос, он начинает его обработку. Этот процесс может включать несколько этапов:</p>
        <ol>
          <li><strong>Маршрутизация</strong>: сервер определяет, какой обработчик должен обрабатывать запрос на основе URL и метода</li>
          <li><strong>Аутентификация и авторизация</strong>: проверка учетных данных пользователя и прав доступа</li>
          <li><strong>Бизнес-логика</strong>: выполнение необходимых операций (например, чтение из базы данных, обработка данных)</li>
          <li><strong>Генерация ответа</strong>: создание HTML, JSON или другого контента в соответствии с запросом</li>
        </ol>
        <p>В зависимости от типа сервера и приложения, процесс может быть простым (например, отдача статического файла) или сложным (включающим множество микросервисов, запросы к базам данных и т.д.).</p>
      `,
      code: `
  // Пример обработки запроса на Node.js с Express
  app.get('/', (req, res) => {
    // Чтение данных из базы данных
    db.query('SELECT * FROM products', (err, products) => {
      if (err) {
        return res.status(500).send('Ошибка сервера');
      }
      
      // Рендеринг шаблона с данными
      res.render('index', { products });
    });
  });`
    },
    {
      title: "Формирование HTTP-ответа",
      description: `
        <p>После обработки запроса сервер формирует HTTP-ответ, который включает:</p>
        <ol>
          <li><strong>Статус-код</strong> (200 OK, 404 Not Found, 500 Internal Server Error и т.д.)</li>
          <li><strong>Заголовки ответа</strong> (Content-Type, Content-Length, Set-Cookie и т.д.)</li>
          <li><strong>Тело ответа</strong> (HTML-страница, JSON-данные, изображение и т.д.)</li>
        </ol>
        <p>Сервер может также включить заголовки для кэширования, сжатия данных, контроля доступа (CORS) и другие.</p>
      `,
      code: `
  // Пример HTTP-ответа
  HTTP/1.1 200 OK
  Date: Mon, 23 May 2023 22:38:34 GMT
  Content-Type: text/html; charset=UTF-8
  Content-Length: 138
  Connection: close
  Server: Apache/2.4.1
  Last-Modified: Wed, 08 Jan 2023 23:11:55 GMT
  ETag: "3f80f-1b6-3e1cb03b"
  Cache-Control: max-age=3600
  
  <!DOCTYPE html>
  <html>
  <head>
    <title>Пример страницы</title>
  </head>
  <body>
    <h1>Привет, мир!</h1>
  </body>
  </html>`
    },
    {
      title: "Получение и обработка ответа",
      description: `
        <p>Браузер получает HTTP-ответ от сервера и начинает его обработку:</p>
        <ol>
          <li>Проверяет статус-код ответа</li>
          <li>Обрабатывает заголовки (обновляет кэш, устанавливает cookies и т.д.)</li>
          <li>Декодирует тело ответа (если оно сжато)</li>
          <li>Определяет тип контента по заголовку Content-Type</li>
        </ol>
        <p>В зависимости от типа полученных данных, браузер выбирает соответствующий обработчик для дальнейшей обработки (HTML-парсер, JSON-парсер, обработчик изображений и т.д.).</p>
      `
    },
    {
      title: "Парсинг HTML и построение DOM",
      description: `
        <p>Для HTML-страниц браузер выполняет парсинг HTML-кода и построение DOM (Document Object Model) - объектной модели документа:</p>
        <ol>
          <li>Токенизация: преобразование HTML-текста в отдельные токены (теги, атрибуты, текст)</li>
          <li>Построение узлов: создание объектов для каждого токена</li>
          <li>Построение дерева: формирование иерархической структуры узлов</li>
        </ol>
        <p>DOM представляет собой дерево объектов, где каждый узел соответствует элементу HTML-страницы. DOM позволяет JavaScript взаимодействовать со структурой страницы.</p>
        <p>Во время парсинга HTML браузер также обнаруживает ссылки на внешние ресурсы (CSS, JavaScript, изображения) и начинает их загрузку.</p>
      `,
      code: `
  // Пример DOM-структуры
  document
    |- html
        |- head
        |   |- title
        |   |   |- текст: "Пример страницы"
        |   |- link (rel="stylesheet")
        |   |- script
        |
        |- body
            |- header
            |   |- h1
            |       |- текст: "Заголовок"
            |- main
            |   |- p
            |       |- текст: "Содержимое"
            |- footer
                |- текст: "© 2023"`
    },
    {
      title: "Загрузка и парсинг CSS (CSSOM)",
      description: `
        <p>Параллельно с построением DOM браузер загружает CSS-файлы, указанные в HTML, и создает CSSOM (CSS Object Model):</p>
        <ol>
          <li>Загрузка CSS-файлов (внешних и встроенных)</li>
          <li>Токенизация и парсинг CSS</li>
          <li>Построение CSSOM - структуры, описывающей стили для каждого элемента</li>
        </ol>
        <p>CSSOM, как и DOM, представляет собой дерево, но содержит информацию о стилях. Каждый узел CSSOM соответствует правилу CSS и содержит селектор и объявления.</p>
        <p>Построение CSSOM блокирует рендеринг, так как браузер должен знать все стили перед отображением страницы.</p>
      `
    },
    {
      title: "Загрузка и выполнение JavaScript",
      description: `
        <p>JavaScript может модифицировать как DOM, так и CSSOM, поэтому браузер должен обработать его правильно:</p>
        <ol>
          <li>Загрузка JavaScript-файлов в соответствии с атрибутами (async, defer, module)</li>
          <li>Парсинг и компиляция JavaScript</li>
          <li>Выполнение скриптов, которое может изменять DOM и CSSOM</li>
        </ol>
        <p>По умолчанию JavaScript блокирует парсинг HTML, но современные техники (async, defer) позволяют оптимизировать этот процесс.</p>
        <p>JavaScript может также загружать дополнительные ресурсы (AJAX-запросы, динамическая загрузка изображений и т.д.).</p>
      `,
      code: `
  // Пример JavaScript, модифицирующего DOM
  document.addEventListener('DOMContentLoaded', () => {
    // Создаем новый элемент
    const newElement = document.createElement('div');
    newElement.textContent = 'Динамически добавленный контент';
    newElement.className = 'dynamic-content';
    
    // Добавляем его в DOM
    document.body.appendChild(newElement);
    
    // Изменяем стили
    document.querySelector('h1').style.color = 'blue';
  });`
    },
    {
      title: "Построение Render Tree",
      description: `
        <p>После построения DOM и CSSOM браузер объединяет их в Render Tree (дерево рендеринга):</p>
        <ol>
          <li>Браузер проходит по DOM и для каждого видимого узла находит соответствующие стили в CSSOM</li>
          <li>Формируется дерево рендеринга, которое содержит только видимые элементы с их стилями</li>
          <li>Элементы с display: none, метаданные и скрипты не включаются в Render Tree</li>
        </ol>
        <p>Render Tree содержит всю информацию, необходимую для визуального представления страницы, и является основой для следующих этапов рендеринга.</p>
      `
    },
    {
      title: "Layout (расположение элементов)",
      description: `
        <p>На этапе Layout (также называемом Reflow) браузер вычисляет точные позиции и размеры всех элементов на странице:</p>
        <ol>
          <li>Определение размеров окна браузера</li>
          <li>Вычисление размеров и позиций всех элементов Render Tree</li>
          <li>Учет различных факторов: блочная или строчная модель, плавающие элементы, позиционирование, margin, padding и т.д.</li>
        </ol>
        <p>Результатом этого этапа является "box model" - модель, определяющая положение каждого элемента на странице с точностью до пикселя.</p>
        <p>Layout - ресурсоемкий процесс, и изменение размеров элементов может вызвать повторный Layout для части или всей страницы.</p>
      `
    },
    {
      title: "Paint (отрисовка)",
      description: `
        <p>После определения положения элементов браузер переходит к этапу Paint - фактической отрисовке пикселей на экране:</p>
        <ol>
          <li>Отрисовка каждого элемента с учетом его стилей (цвет, фон, границы, тени и т.д.)</li>
          <li>Рисование текста, изображений и других визуальных элементов</li>
          <li>Применение эффектов (тени, градиенты, фильтры)</li>
        </ol>
        <p>Браузер разделяет процесс отрисовки на слои, которые затем композитируются вместе.</p>
        <p>Современные браузеры используют GPU для ускорения отрисовки, особенно для анимаций и трансформаций.</p>
      `
    },
    {
      title: "Compositing (композиция)",
      description: `
        <p>На заключительном этапе рендеринга браузер выполняет композицию - объединение отрисованных слоев:</p>
        <ol>
          <li>Определение порядка наложения слоев (z-index)</li>
          <li>Обработка прозрачности и наложения</li>
          <li>Финальное объединение всех слоев в один кадр</li>
          <li>Отображение результата на экране</li>
        </ol>
        <p>Композиция позволяет оптимизировать производительность, так как при изменении только одного слоя (например, при анимации) не требуется перерисовывать всю страницу.</p>
        <p>После завершения всех этапов пользователь видит полностью загруженную и отрендеренную страницу, готовую к взаимодействию.</p>
      `
    },
    {
      title: "Взаимодействие пользователя",
      description: `
        <p>После загрузки страницы пользователь может взаимодействовать с ней различными способами:</p>
        <ol>
          <li>Клик на элементы</li>
          <li>Ввод текста</li>
          <li>Прокрутка страницы</li>
          <li>Изменение размера окна браузера</li>
        </ol>
        <p>Каждое взаимодействие вызывает соответствующие события, которые могут быть обработаны JavaScript-кодом.</p>
        <p>Некоторые взаимодействия могут вызвать повторение части процесса рендеринга, например:</p>
        <ul>
          <li>Изменение DOM с помощью JavaScript → повторная генерация Render Tree → Layout → Paint → Compositing</li>
          <li>Изменение только стилей, не влияющих на размеры → перепропуск Layout → Paint → Compositing</li>
          <li>Изменение только свойств, затрагивающих композицию → перепропуск Layout и Paint → только Compositing</li>
        </ul>
        <p>Оптимизация этих процессов критически важна для создания плавного и отзывчивого пользовательского интерфейса.</p>
      `
    }
  ];
  
  // Вычисляемые свойства
  const currentStep = computed(() => steps[currentStepIndex.value]);
  
  // Методы
  function startDemo() {
    if (!url.value || demoRunning.value) return;
    
    resetVisualState();
    demoRunning.value = true;
    
    // Симуляция ввода URL
    displayUrl.value = '';
    isTyping.value = true;
    
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < url.value.length) {
        displayUrl.value += url.value.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        isTyping.value = false;
        continueDemoAfterTyping();
      }
    }, 50);
  }
  
  function continueDemoAfterTyping() {
    currentStepIndex.value = 0;
    
    setTimeout(() => {
      // Переход к DNS-запросу
      currentStepIndex.value = 2;
      dnsActive.value = true;
      
      setTimeout(() => {
        // Переход к TCP-соединению
        currentStepIndex.value = 3;
        dnsActive.value = false;
        tcpActive.value = true;
        
        setTimeout(() => {
          // Переход к TLS-рукопожатию для HTTPS
          if (url.value.startsWith('https')) {
            currentStepIndex.value = 4;
            setTimeout(() => proceedToRequest(), 2000);
          } else {
            proceedToRequest();
          }
        }, 2000);
      }, 2000);
    }, 1000);
  }
  
  function proceedToRequest() {
    // Отправка HTTP-запроса
    currentStepIndex.value = 5;
    tcpActive.value = false;
    requestActive.value = true;
    
    setTimeout(() => {
      // Обработка на сервере
      currentStepIndex.value = 6;
      requestActive.value = false;
      serverActive.value = true;
      
      setTimeout(() => {
        // Формирование HTTP-ответа
        currentStepIndex.value = 7;
        
        setTimeout(() => {
          // Получение ответа
          currentStepIndex.value = 8;
          serverActive.value = false;
          responseActive.value = true;
          
          setTimeout(() => {
            // Загрузка и рендеринг
            responseActive.value = false;
            isLoading.value = true;
            
            // Последовательно проходим через все этапы рендеринга
            const renderSteps = [9, 10, 11, 12, 13, 14];
            let stepIndex = 0;
            
            const renderInterval = setInterval(() => {
              if (stepIndex < renderSteps.length) {
                currentStepIndex.value = renderSteps[stepIndex];
                stepIndex++;
              } else {
                clearInterval(renderInterval);
                finishRendering();
              }
            }, 2000);
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  }
  
  function finishRendering() {
    // Отрисовка страницы
    currentStepIndex.value = 15;
    isLoading.value = false;
    isRendered.value = true;
    
    setTimeout(() => {
      // Завершение демо
      currentStepIndex.value = 16;
      demoRunning.value = false;
    }, 2000);
  }
  
  function resetVisualState() {
    displayUrl.value = '';
    isTyping.value = false;
    isLoading.value = false;
    isRendered.value = false;
    dnsActive.value = false;
    tcpActive.value = false;
    requestActive.value = false;
    responseActive.value = false;
    serverActive.value = false;
  }
  
  function nextStep() {
    if (currentStepIndex.value < steps.length - 1 && !demoInProgress.value) {
      currentStepIndex.value++;
    }
  }
  
  function prevStep() {
    if (currentStepIndex.value > 0 && !demoInProgress.value) {
      currentStepIndex.value--;
    }
  }
  
  function jumpToStep(index) {
    if (!demoInProgress.value) {
      currentStepIndex.value = index;
    }
  }
  
  function resetDemo() {
    demoRunning.value = false;
    demoInProgress.value = false;
    currentStepIndex.value = 0;
    resetVisualState();
  }
  
  function runFullDemo() {
    demoInProgress.value = true;
    resetDemo();
    startDemo();
    
    // После завершения всех анимаций
    setTimeout(() => {
      demoInProgress.value = false;
    }, 30000); // Примерное время полного цикла демо
  }
  
  </script>
  
  <style scoped>
  .browser-cycle-container {
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
  }
  
  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
  }
  
  h2 {
    color: #3498db;
    margin-top: 0;
  }
  
  .address-bar-container {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
  
  .address-bar {
    display: flex;
    width: 80%;
    max-width: 800px;
    border: 2px solid #ddd;
    border-radius: 25px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .address-bar input {
    flex: 1;
    padding: 12px 20px;
    border: none;
    font-size: 16px;
    outline: none;
  }
  
  .address-bar button {
    padding: 12px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .address-bar button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .address-bar button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .cycle-timeline {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    overflow-x: auto;
    padding-bottom: 15px;
  }
  
  .timeline-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    min-width: 80px;
    cursor: pointer;
  }
  
  .timeline-step:not(:last-child)::after {
    content: '';
    position: absolute;
    right: -50%;
    top: 15px;
    width: 100%;
    height: 2px;
    background-color: #ddd;
    z-index: 0;
  }
  
  .timeline-step.active:not(:last-child)::after {
    background-color: #3498db;
  }
  
  .step-number {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ecf0f1;
    border: 2px solid #bdc3c7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-bottom: 5px;
    position: relative;
    z-index: 1;
    transition: all 0.3s;
  }
  
  .step-title {
    font-size: 12px;
    text-align: center;
    transition: all 0.3s;
  }
  
  .timeline-step.active .step-number {
    background-color: #3498db;
    border-color: #2980b9;
    color: white;
  }
  
  .timeline-step.completed .step-number {
    background-color: #2ecc71;
    border-color: #27ae60;
    color: white;
  }
  
  .timeline-step.active .step-title,
  .timeline-step.completed .step-title {
    color: #3498db;
    font-weight: bold;
  }
  
  .visualization-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    gap: 20px;
  }
  
  @media screen and (min-width: 992px) {
    .visualization-container {
      flex-direction: row;
    }
    
    .visualization-area {
      flex: 1;
    }
    
    .explanation-area {
      flex: 1;
    }
  }
  
  .visualization-area {
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .devices {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    gap: 20px;
  }
  
  @media screen and (min-width: 768px) {
    .devices {
      flex-direction: row;
      justify-content: space-between;
    }
  }
  
  .browser-device {
    width: 300px;
    height: 220px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }
  
  .browser-header {
    background-color: #f0f0f0;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
  }
  
  .browser-url {
    background-color: white;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 12px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .browser-url.typing::after {
    content: '|';
    animation: blink 1s infinite;
  }
  
  .browser-body {
    flex: 1;
    padding: 10px;
    overflow: hidden;
  }
  
  .browser-content {
    height: 100%;
    background-color: white;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .browser-placeholder {
    color: #aaa;
    font-size: 12px;
    text-align: center;
  }
  
  .loading-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .spinner {
    width: 30px;
    height: 30px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .rendered-page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .page-header {
    height: 30px;
    background-color: #3498db;
    margin-bottom: 10px;
  }
  
  .page-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .content-block {
    height: 15px;
    background-color: #ecf0f1;
    border-radius: 3px;
  }
  
  .content-block:nth-child(1) {
    width: 80%;
  }
  
  .content-block:nth-child(2) {
    width: 90%;
  }
  
  .content-block:nth-child(3) {
    width: 70%;
  }
  
  .network {
    flex: 1;
    height: 100px;
    position: relative;
  }
  
  .packets {
    width: 100%;
    height: 100%;
    position: relative;
  }
  
  .packet {
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    opacity: 0;
  }
  
  .dns-packet {
    background-color: #9b59b6;
  }
  
  .tcp-packet {
    background-color: #e74c3c;
  }
  
  .request-packet {
    background-color: #3498db;
  }
  
  .response-packet {
    background-color: #2ecc71;
  }
  
  .dns-active .dns-packet {
    animation: leftToRight 2s infinite;
  }
  
  .tcp-active .tcp-packet {
    animation: bidirectional 2s infinite;
  }
  
  .request-active .request-packet {
    animation: leftToRight 2s infinite;
  }
  
  .response-active .response-packet {
    animation: rightToLeft 2s infinite;
  }
  
  .server-device {
    width: 150px;
    height: 220px;
    background-color: #2c3e50;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
  }
  
  .server-lights {
    display: flex;
    gap: 10px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    background-color: #34495e;
  }
  
  .server-light {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #e74c3c;
  }
  
  .server-light.active {
    background-color: #2ecc71;
    animation: blink 1s infinite;
  }
  
  .server-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
  }
  
  .server-rack {
    flex: 1;
    background-color: #34495e;
    border-radius: 5px;
  }
  
  .explanation-area {
    background-color: white;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
  }
  
  .current-step {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 20px;
  }
  
  .step-description {
    line-height: 1.6;
    margin-bottom: 20px;
  }
  
  .step-description p {
    margin-bottom: 15px;
  }
  
  .step-description ul, .step-description ol {
    padding-left: 20px;
    margin-bottom: 15px;
  }
  
  .step-description li {
    margin-bottom: 5px;
  }
  
  .code-snippet {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
    margin-bottom: 20px;
    border: 1px solid #e9ecef;
  }
  
  .code-snippet pre {
    margin: 0;
    font-family: Monaco, Consolas, 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.5;
    color: #495057;
  }
  
  .navigation-controls {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }
  
  .navigation-controls button {
    padding: 10px 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    flex: 1;
  }
  
  .navigation-controls button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .navigation-controls button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  /* Анимации */
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes leftToRight {
    0% { left: 0; top: 50%; transform: translate(0, -50%); opacity: 1; }
    100% { left: 100%; top: 50%; transform: translate(-100%, -50%); opacity: 1; }
  }
  
  @keyframes rightToLeft {
    0% { right: 0; top: 50%; transform: translate(0, -50%); opacity: 1; }
    100% { right: 100%; top: 50%; transform: translate(100%, -50%); opacity: 1; }
  }
  
  @keyframes bidirectional {
    0% { left: 0; top: 40%; transform: translate(0, -50%); opacity: 1; }
    25% { left: 100%; top: 40%; transform: translate(-100%, -50%); opacity: 1; }
    50% { left: 100%; top: 60%; transform: translate(-100%, -50%); opacity: 1; }
    75% { left: 0; top: 60%; transform: translate(0, -50%); opacity: 1; }
    100% { left: 0; top: 40%; transform: translate(0, -50%); opacity: 1; }
  }
  
  /* Responsive adjustments */
  @media screen and (max-width: 768px) {
    .navigation-controls {
      flex-wrap: wrap;
    }
    
    .navigation-controls button {
      flex: 1 0 45%;
    }
    
    .cycle-timeline {
      justify-content: flex-start;
      gap: 30px;
      padding-left: 10px;
    }
    
    .timeline-step:not(:last-child)::after {
      width: 30px;
      right: -30px;
    }
  }
  </style>