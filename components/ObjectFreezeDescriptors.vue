<template>
    <div class="js-objects-container">
      <h1 class="title">Управление объектами в JavaScript: Object.freeze и дескрипторы свойств</h1>
  
      <div class="tabs">
        <button 
          v-for="(tab, index) in tabs" 
          :key="tab.id"
          :class="['tab-button', { active: activeTab === index }]"
          @click="activeTab = index"
        >
          {{ tab.name }}
        </button>
      </div>
  
      <!-- Раздел Object.freeze -->
      <div v-if="activeTab === 0" class="tab-content">
        <div class="section-header">
          <h2>Object.freeze() - замораживание объектов</h2>
          <p class="description">
            Метод <code>Object.freeze()</code> превращает объект в неизменяемый (иммутабельный). 
            После замораживания невозможно добавить, удалить или изменить свойства объекта.
          </p>
        </div>
  
        <div class="interactive-demo">
          <div class="objects-container">
            <div class="object-box">
              <h3>Обычный объект</h3>
              <div class="object-visualization" :class="{ 'shake-animation': normalObjShake }">
                <div 
                  v-for="(value, key) in normalObject" 
                  :key="key" 
                  class="property"
                >
                  <span class="property-name">{{ key }}:</span>
                  <span class="property-value">{{ value }}</span>
                </div>
                <div 
                  v-if="showNewProperty" 
                  class="property new-property"
                  :class="{ 'fade-in': showNewProperty }"
                >
                  <span class="property-name">{{ newPropertyName }}:</span>
                  <span class="property-value">{{ newPropertyValue }}</span>
                </div>
              </div>
              <div class="controls">
                <div class="control-group">
                  <button @click="modifyNormalObject" class="action-button">Изменить свойство</button>
                  <button @click="addPropertyToNormal" class="action-button">Добавить свойство</button>
                  <button @click="deletePropertyFromNormal" class="action-button">Удалить свойство</button>
                </div>
              </div>
            </div>
  
            <div class="object-box">
              <h3>Замороженный объект</h3>
              <div class="object-visualization frozen" :class="{ 'shake-animation': frozenObjShake }">
                <div 
                  v-for="(value, key) in frozenObject" 
                  :key="key" 
                  class="property"
                >
                  <span class="property-name">{{ key }}:</span>
                  <span class="property-value">{{ value }}</span>
                  <span class="freeze-indicator">❄️</span>
                </div>
              </div>
              <div class="controls">
                <div class="control-group">
                  <button @click="modifyFrozenObject" class="action-button">Изменить свойство</button>
                  <button @click="addPropertyToFrozen" class="action-button">Добавить свойство</button>
                  <button @click="deletePropertyFromFrozen" class="action-button">Удалить свойство</button>
                </div>
                <div class="freeze-button-container">
                  <button v-if="!objectFrozen" @click="freezeObject" class="freeze-button">Заморозить объект</button>
                  <div v-else class="frozen-status">Объект заморожен! ❄️</div>
                </div>
              </div>
            </div>
          </div>
  
          <div class="console-log">
            <div class="console-header">
              <span>Консоль JavaScript</span>
              <button @click="clearConsole" class="clear-button">Очистить</button>
            </div>
            <div class="console-content">
              <div v-for="(log, index) in consoleLogs" :key="index" class="log-entry" :class="{ 'error-log': log.type === 'error', 'fade-in': true }">
                <span v-if="log.type === 'error'" class="log-prefix">Error: </span>
                <span>{{ log.message }}</span>
              </div>
            </div>
          </div>
        </div>
  
        <div class="code-sample">
          <h3>Пример кода</h3>
          <pre><code>// Создаем объект
  const user = {
    name: "Иван",
    age: 30,
    address: {
      city: "Москва",
      zipcode: "123456"
    }
  };
  
  // Замораживаем объект
  Object.freeze(user);
  
  // Попытка изменить свойство
  user.name = "Петр"; // Не сработает в строгом режиме 
                     // В нестрогом тихо проигнорирует
  
  // Попытка добавить свойство
  user.email = "ivan@example.com"; // Не сработает
  
  // Попытка удалить свойство
  delete user.age; // Не сработает
  
  // Проверка, заморожен ли объект
  console.log(Object.isFrozen(user)); // true
  
  // Важно: Object.freeze выполняет "поверхностную" заморозку
  // Вложенные объекты не замораживаются!
  user.address.city = "Санкт-Петербург"; // Это сработает!
  
  // Для полной "глубокой" заморозки нужно рекурсивно
  // применить Object.freeze ко всем вложенным объектам</code></pre>
        </div>
  
        <div class="info-section">
          <h3>Ключевые особенности Object.freeze</h3>
          <ul>
            <li><strong>Неизменяемость:</strong> Нельзя изменить, добавить или удалить свойства.</li>
            <li><strong>Поверхностная заморозка:</strong> Замораживаются только свойства первого уровня, вложенные объекты остаются изменяемыми.</li>
            <li><strong>Производительность:</strong> Замороженные объекты могут оптимизироваться движками JavaScript.</li>
            <li><strong>Ошибки в строгом режиме:</strong> В 'use strict' попытки изменить замороженный объект вызывают ошибку TypeError.</li>
            <li><strong>Проверка:</strong> Можно проверить, заморожен ли объект с помощью <code>Object.isFrozen(obj)</code>.</li>
          </ul>
        </div>
      </div>
  
      <!-- Раздел Дескрипторы свойств -->
      <div v-if="activeTab === 1" class="tab-content">
        <div class="section-header">
          <h2>Дескрипторы свойств объектов</h2>
          <p class="description">
            Дескрипторы свойств позволяют контролировать поведение отдельных свойств объекта.
            Используя <code>Object.defineProperty()</code> можно точно указать, как должно работать каждое свойство.
          </p>
        </div>
  
        <div class="descriptors-container">
          <div class="descriptors-visualization">
            <div class="object-with-descriptors">
              <h3>Объект с дескрипторами свойств</h3>
              <div class="object-body">
                <div 
                  v-for="prop in descriptorProperties" 
                  :key="prop.name" 
                  class="property-with-descriptor"
                  :class="{ 'highlight-property': highlightedProperty === prop.name }"
                >
                  <div class="property-header" @click="selectProperty(prop.name)">
                    <span class="property-name">{{ prop.name }}:</span>
                    <span class="property-value">{{ typeof prop.value === 'function' ? '() => {...}' : prop.value }}</span>
                  </div>
                  <div class="property-descriptors" v-if="highlightedProperty === prop.name">
                    <div class="descriptor" :class="{ 'descriptor-enabled': prop.writable }">
                      <span class="descriptor-name">writable:</span>
                      <span class="descriptor-value">{{ prop.writable.toString() }}</span>
                      <span class="descriptor-icon">{{ prop.writable ? '✏️' : '🔒' }}</span>
                    </div>
                    <div class="descriptor" :class="{ 'descriptor-enabled': prop.enumerable }">
                      <span class="descriptor-name">enumerable:</span>
                      <span class="descriptor-value">{{ prop.enumerable.toString() }}</span>
                      <span class="descriptor-icon">{{ prop.enumerable ? '🔍' : '🙈' }}</span>
                    </div>
                    <div class="descriptor" :class="{ 'descriptor-enabled': prop.configurable }">
                      <span class="descriptor-name">configurable:</span>
                      <span class="descriptor-value">{{ prop.configurable.toString() }}</span>
                      <span class="descriptor-icon">{{ prop.configurable ? '🔧' : '🔒' }}</span>
                    </div>
                    <div class="descriptor accessor" v-if="prop.hasGetterSetter">
                      <span class="descriptor-name">get:</span>
                      <span class="descriptor-value">function() {...}</span>
                      <span class="descriptor-icon">🔍</span>
                    </div>
                    <div class="descriptor accessor" v-if="prop.hasGetterSetter">
                      <span class="descriptor-name">set:</span>
                      <span class="descriptor-value">function(value) {...}</span>
                      <span class="descriptor-icon">📝</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <div class="descriptors-actions">
              <div class="action-panel">
                <h4>Изменить свойство "{{ selectedProperty.name }}"</h4>
                <div class="action-inputs">
                  <div class="input-group">
                    <label>
                      <input type="checkbox" v-model="selectedProperty.writable">
                      writable (можно изменять значение)
                    </label>
                  </div>
                  <div class="input-group">
                    <label>
                      <input type="checkbox" v-model="selectedProperty.enumerable">
                      enumerable (видимо при перечислении)
                    </label>
                  </div>
                  <div class="input-group">
                    <label>
                      <input type="checkbox" v-model="selectedProperty.configurable">
                      configurable (можно удалять и менять дескрипторы)
                    </label>
                  </div>
                  <div class="input-group">
                    <label>
                      <input type="checkbox" v-model="selectedProperty.hasGetterSetter">
                      использовать getter/setter
                    </label>
                  </div>
                </div>
                <button @click="applyDescriptorChanges" class="apply-button">Применить изменения</button>
              </div>
  
              <div class="test-actions">
                <h4>Проверить поведение свойства</h4>
                <div class="test-buttons">
                  <button @click="testModifyProperty" class="test-button">Изменить значение</button>
                  <button @click="testEnumerateProperties" class="test-button">Перечислить свойства</button>
                  <button @click="testDeleteProperty" class="test-button">Удалить свойство</button>
                  <button @click="testRedefineProperty" class="test-button">Переопределить дескриптор</button>
                </div>
              </div>
            </div>
          </div>
  
          <div class="console-log">
            <div class="console-header">
              <span>Консоль JavaScript</span>
              <button @click="clearConsole" class="clear-button">Очистить</button>
            </div>
            <div class="console-content">
              <div v-for="(log, index) in consoleLogs" :key="index" class="log-entry" :class="{ 'error-log': log.type === 'error', 'fade-in': true }">
                <span v-if="log.type === 'error'" class="log-prefix">Error: </span>
                <span>{{ log.message }}</span>
              </div>
            </div>
          </div>
        </div>
  
        <div class="code-sample">
          <h3>Пример кода с дескрипторами</h3>
          <pre><code>// Создаем объект
  const user = {};
  
  // Определяем свойство с дескрипторами
  Object.defineProperty(user, 'name', {
    value: 'Иван',
    writable: true,      // можно ли изменить значение
    enumerable: true,    // будет ли видно при перечислении (for...in, Object.keys)
    configurable: true   // можно ли удалить или изменить дескрипторы
  });
  
  // Определяем свойство только для чтения
  Object.defineProperty(user, 'role', {
    value: 'admin',
    writable: false,     // нельзя изменить
    enumerable: true,
    configurable: false  // нельзя удалить или переопределить
  });
  
  // Определяем свойство с геттером и сеттером
  let firstName = 'Иван';
  let lastName = 'Петров';
  
  Object.defineProperty(user, 'fullName', {
    get: function() {
      return `${firstName} ${lastName}`;
    },
    set: function(value) {
      const parts = value.split(' ');
      firstName = parts[0];
      lastName = parts[1];
    },
    enumerable: true,
    configurable: true
  });
  
  // Скрытое свойство (не перечисляемое)
  Object.defineProperty(user, 'secretKey', {
    value: '1234',
    writable: true,
    enumerable: false,   // не будет видно при перечислении
    configurable: true
  });
  
  // Использование
  user.name = 'Петр';    // можно изменить
  user.role = 'user';    // ошибка в строгом режиме (writable: false)
  user.fullName = 'Иван Сидоров';  // сработает сеттер
  console.log(user.fullName);      // "Иван Сидоров"
  
  // Перечисление свойств покажет name, role, fullName, но не secretKey
  console.log(Object.keys(user));  // ["name", "role", "fullName"]</code></pre>
        </div>
  
        <div class="info-section">
          <h3>Основные дескрипторы свойств</h3>
          <ul>
            <li>
              <strong>value</strong> - значение свойства
            </li>
            <li>
              <strong>writable</strong> - можно ли изменить значение свойства
              <ul>
                <li>true - значение можно изменить</li>
                <li>false - значение нельзя изменить (свойство только для чтения)</li>
              </ul>
            </li>
            <li>
              <strong>enumerable</strong> - будет ли свойство видно при перечислении
              <ul>
                <li>true - свойство будет видно в циклах for...in, Object.keys()</li>
                <li>false - свойство будет "скрытым" при перечислении</li>
              </ul>
            </li>
            <li>
              <strong>configurable</strong> - можно ли удалить свойство или изменить его дескрипторы
              <ul>
                <li>true - свойство можно удалить и изменить его дескрипторы</li>
                <li>false - свойство нельзя удалить и нельзя изменить его дескрипторы (кроме writable true → false)</li>
              </ul>
            </li>
            <li>
              <strong>get</strong> - функция, которая будет вызвана при обращении к свойству
            </li>
            <li>
              <strong>set</strong> - функция, которая будет вызвана при присваивании значения свойству
            </li>
          </ul>
  
          <div class="info-note">
            <strong>Примечание:</strong> при использовании get/set нельзя указывать value и writable
          </div>
        </div>
  
        <div class="info-section">
          <h3>Дополнительные методы работы с дескрипторами</h3>
          <ul>
            <li>
              <strong>Object.getOwnPropertyDescriptor(obj, prop)</strong> - получить дескрипторы свойства
            </li>
            <li>
              <strong>Object.getOwnPropertyDescriptors(obj)</strong> - получить дескрипторы всех свойств
            </li>
            <li>
              <strong>Object.defineProperties(obj, descriptors)</strong> - определить несколько свойств сразу
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Раздел Сравнение методов управления объектами -->
      <div v-if="activeTab === 2" class="tab-content">
        <div class="section-header">
          <h2>Сравнение методов управления объектами</h2>
          <p class="description">
            JavaScript предоставляет несколько методов для контроля изменяемости объектов. 
            Давайте сравним их возможности и особенности.
          </p>
        </div>
  
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Метод</th>
                <th>Добавление свойств</th>
                <th>Изменение свойств</th>
                <th>Удаление свойств</th>
                <th>Изменение дескрипторов</th>
                <th>Глубина действия</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Object.preventExtensions(obj)</strong>
                  <div class="method-description">Запрещает добавление новых свойств</div>
                </td>
                <td class="cell-no">❌ Нет</td>
                <td class="cell-yes">✅ Да</td>
                <td class="cell-yes">✅ Да</td>
                <td class="cell-yes">✅ Да</td>
                <td class="cell-no">❌ Поверхностная</td>
              </tr>
              <tr>
                <td>
                  <strong>Object.seal(obj)</strong>
                  <div class="method-description">Запечатывает объект (нельзя добавлять/удалять)</div>
                </td>
                <td class="cell-no">❌ Нет</td>
                <td class="cell-yes">✅ Да</td>
                <td class="cell-no">❌ Нет</td>
                <td class="cell-no">❌ Нет</td>
                <td class="cell-no">❌ Поверхностная</td>
              </tr>
              <tr>
                <td>
                  <strong>Object.freeze(obj)</strong>
                  <div class="method-description">Полностью замораживает объект</div>
                </td>
                <td class="cell-no">❌ Нет</td>
                <td class="cell-no">❌ Нет</td>
                <td class="cell-no">❌ Нет</td>
                <td class="cell-no">❌ Нет</td>
                <td class="cell-no">❌ Поверхностная</td>
              </tr>
              <tr>
                <td>
                  <strong>Object.defineProperty()</strong>
                  <div class="method-description">Точечный контроль свойств</div>
                </td>
                <td class="cell-custom">⚙️ Настраивается</td>
                <td class="cell-custom">⚙️ Настраивается</td>
                <td class="cell-custom">⚙️ Настраивается</td>
                <td class="cell-custom">⚙️ Настраивается</td>
                <td class="cell-no">❌ По свойствам</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div class="methods-details">
          <div class="method-card">
            <h3>Object.preventExtensions(obj)</h3>
            <p>Запрещает добавление новых свойств к объекту, но позволяет изменять и удалять существующие.</p>
            <pre><code>const user = { name: 'Иван' };
  Object.preventExtensions(user);
  
  user.age = 30; // Не сработает
  user.name = 'Петр'; // Сработает
  delete user.name; // Сработает
  
  // Проверка
  console.log(Object.isExtensible(user)); // false</code></pre>
          </div>
  
          <div class="method-card">
            <h3>Object.seal(obj)</h3>
            <p>Запечатывает объект: запрещает добавление новых свойств и удаление существующих, но позволяет изменять значения существующих свойств.</p>
            <pre><code>const user = { name: 'Иван' };
  Object.seal(user);
  
  user.age = 30; // Не сработает
  user.name = 'Петр'; // Сработает
  delete user.name; // Не сработает
  
  // Проверка
  console.log(Object.isSealed(user)); // true</code></pre>
          </div>
  
          <div class="method-card">
            <h3>Object.freeze(obj)</h3>
            <p>Полностью замораживает объект: запрещает добавление, изменение и удаление свойств.</p>
            <pre><code>const user = { name: 'Иван' };
  Object.freeze(user);
  
  user.age = 30; // Не сработает
  user.name = 'Петр'; // Не сработает
  delete user.name; // Не сработает
  
  // Проверка
  console.log(Object.isFrozen(user)); // true</code></pre>
          </div>
  
          <div class="method-card">
            <h3>Глубокая (рекурсивная) заморозка</h3>
            <p>Для полной заморозки вложенных объектов нужна рекурсивная функция:</p>
            <pre><code>function deepFreeze(obj) {
    // Получаем все свойства, включая неперечисляемые
    const propNames = Object.getOwnPropertyNames(obj);
    
    // Замораживаем вложенные объекты перед замораживанием основного
    propNames.forEach(name => {
      const prop = obj[name];
      
      // Рекурсивно замораживаем свойства-объекты
      if (prop !== null && typeof prop === 'object') {
        deepFreeze(prop);
      }
    });
    
    // Замораживаем сам объект
    return Object.freeze(obj);
  }
  
  const user = {
    name: 'Иван',
    address: {
      city: 'Москва'
    }
  };
  
  deepFreeze(user);
  
  // Теперь заморожены и вложенные объекты
  user.address.city = 'Санкт-Петербург'; // Не сработает</code></pre>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed  } from 'vue';
  
  // Вкладки
  const tabs = [
    { id: 'freeze', name: 'Object.freeze()' },
    { id: 'descriptors', name: 'Дескрипторы свойств' },
    { id: 'comparison', name: 'Сравнение методов' }
  ];
  const activeTab = ref(0);
  
  // Консоль логов
  const consoleLogs = ref([]);
  
  function addConsoleLog(message, type = 'info') {
    consoleLogs.value.push({ message, type });
  }
  
  function clearConsole() {
    consoleLogs.value = [];
  }
  
  // ===== Секция Object.freeze =====
  const normalObject = reactive({
    name: 'Иван',
    age: 30,
    position: 'Разработчик'
  });
  
  const frozenObject = reactive({
    name: 'Мария',
    age: 28,
    position: 'Дизайнер'
  });
  
  const objectFrozen = ref(false);
  const frozenObjShake = ref(false);
  const normalObjShake = ref(false);
  const showNewProperty = ref(false);
  const newPropertyName = ref('');
  const newPropertyValue = ref('');
  
  function freezeObject() {
    objectFrozen.value = true;
    addConsoleLog('Object.freeze(frozenObject) - объект заморожен');
  }
  
  function modifyNormalObject() {
    normalObject.age = normalObject.age + 1;
    addConsoleLog(`normalObject.age = ${normalObject.age} - свойство успешно изменено`);
  }
  
  function modifyFrozenObject() {
    if (!objectFrozen.value) {
      frozenObject.age = frozenObject.age + 1;
      addConsoleLog(`frozenObject.age = ${frozenObject.age} - свойство успешно изменено`);
    } else {
      frozenObjShake.value = true;
      setTimeout(() => {
        frozenObjShake.value = false;
      }, 500);
      addConsoleLog('Невозможно изменить свойство замороженного объекта', 'error');
    }
  }
  
  function addPropertyToNormal() {
    showNewProperty.value = true;
    newPropertyName.value = 'email';
    newPropertyValue.value = 'ivan@example.com';
    
    setTimeout(() => {
      normalObject[newPropertyName.value] = newPropertyValue.value;
      addConsoleLog(`normalObject.${newPropertyName.value} = '${newPropertyValue.value}' - свойство успешно добавлено`);
      showNewProperty.value = false;
    }, 1000);
  }
  
  function addPropertyToFrozen() {
    if (!objectFrozen.value) {
      showNewProperty.value = true;
      newPropertyName.value = 'email';
      newPropertyValue.value = 'maria@example.com';
      
      setTimeout(() => {
        frozenObject[newPropertyName.value] = newPropertyValue.value;
        addConsoleLog(`frozenObject.${newPropertyName.value} = '${newPropertyValue.value}' - свойство успешно добавлено`);
        showNewProperty.value = false;
      }, 1000);
    } else {
      frozenObjShake.value = true;
      setTimeout(() => {
        frozenObjShake.value = false;
      }, 500);
      addConsoleLog('Невозможно добавить свойство в замороженный объект', 'error');
    }
  }
  
  function deletePropertyFromNormal() {
    const keys = Object.keys(normalObject);
    if (keys.length > 0) {
      const keyToDelete = keys[keys.length - 1];

      addConsoleLog(`delete normalObject.${keyToDelete} - свойство успешно удалено`);
    } else {
      addConsoleLog('В объекте больше нет свойств для удаления');
    }
  }
  
  function deletePropertyFromFrozen() {
    if (!objectFrozen.value) {
      const keys = Object.keys(frozenObject);
      if (keys.length > 0) {
        const keyToDelete = keys[keys.length - 1];

        addConsoleLog(`delete frozenObject.${keyToDelete} - свойство успешно удалено`);
      } else {
        addConsoleLog('В объекте больше нет свойств для удаления');
      }
    } else {
      frozenObjShake.value = true;
      setTimeout(() => {
        frozenObjShake.value = false;
      }, 500);
      addConsoleLog('Невозможно удалить свойство из замороженного объекта', 'error');
    }
  }
  
  // ===== Секция дескрипторов свойств =====
  const descriptorProperties = reactive([
    {
      name: 'name',
      value: 'Иван',
      writable: true,
      enumerable: true,
      configurable: true,
      hasGetterSetter: false
    },
    {
      name: 'age',
      value: 30,
      writable: false,
      enumerable: true,
      configurable: true,
      hasGetterSetter: false
    },
    {
      name: 'role',
      value: 'admin',
      writable: true,
      enumerable: false,
      configurable: true,
      hasGetterSetter: false
    },
    {
      name: 'fullName',
      value: 'Иван Петров',
      writable: false,
      enumerable: true,
      configurable: true,
      hasGetterSetter: true
    }
  ]);
  
  const highlightedProperty = ref('name');
  
  const selectedProperty = computed(() => {
    const prop = descriptorProperties.find(p => p.name === highlightedProperty.value) || descriptorProperties[0];
    return {
      name: prop.name,
      writable: prop.writable,
      enumerable: prop.enumerable,
      configurable: prop.configurable,
      hasGetterSetter: prop.hasGetterSetter
    };
  });
  
  function selectProperty(propName) {
    highlightedProperty.value = propName;
  }
  
  function applyDescriptorChanges() {
    const prop = descriptorProperties.find(p => p.name === highlightedProperty.value);
    if (prop) {
      prop.writable = selectedProperty.value.writable;
      prop.enumerable = selectedProperty.value.enumerable;
      prop.configurable = selectedProperty.value.configurable;
      prop.hasGetterSetter = selectedProperty.value.hasGetterSetter;
      
      addConsoleLog(`Дескрипторы свойства "${prop.name}" успешно изменены:`);
      addConsoleLog(`  writable: ${prop.writable}, enumerable: ${prop.enumerable}, configurable: ${prop.configurable}`);
      if (prop.hasGetterSetter) {
        addConsoleLog(`  Добавлены getter и setter`);
      }
    }
  }
  
  function testModifyProperty() {
    const prop = descriptorProperties.find(p => p.name === highlightedProperty.value);
    if (prop) {
      if (prop.writable || prop.hasGetterSetter) {
        const newValue = prop.value === 'Иван' ? 'Петр' : 'Иван';
        if (typeof prop.value === 'number') {
          prop.value = prop.value + 1;
        } else {
          prop.value = newValue;
        }
        addConsoleLog(`Значение свойства "${prop.name}" изменено на "${prop.value}"`);
      } else {
        addConsoleLog(`Невозможно изменить свойство "${prop.name}" (writable: false)`, 'error');
      }
    }
  }
  
  function testEnumerateProperties() {
    const enumerableProps = descriptorProperties
      .filter(prop => prop.enumerable)
      .map(prop => prop.name);
    
    addConsoleLog(`Object.keys(obj): [${enumerableProps.join(', ')}]`);
    
    // Выделяем перечисляемые свойства
    descriptorProperties.forEach(prop => {
      if (prop.enumerable && prop.name !== highlightedProperty.value) {
        setTimeout(() => {
          highlightedProperty.value = prop.name;
        }, 300);
      }
    });
  }
  
  function testDeleteProperty() {
    const prop = descriptorProperties.find(p => p.name === highlightedProperty.value);
    if (prop) {
      if (prop.configurable) {
        const index = descriptorProperties.indexOf(prop);
        if (index !== -1) {
          descriptorProperties.splice(index, 1);
          addConsoleLog(`Свойство "${prop.name}" успешно удалено`);
          if (descriptorProperties.length > 0) {
            highlightedProperty.value = descriptorProperties[0].name;
          }
        }
      } else {
        addConsoleLog(`Невозможно удалить свойство "${prop.name}" (configurable: false)`, 'error');
      }
    }
  }
  
  function testRedefineProperty() {
    const prop = descriptorProperties.find(p => p.name === highlightedProperty.value);
    if (prop) {
      if (prop.configurable) {
        addConsoleLog(`Дескрипторы свойства "${prop.name}" успешно переопределены`);
      } else {
        addConsoleLog(`Невозможно переопределить дескрипторы свойства "${prop.name}" (configurable: false)`, 'error');
      }
    }
  }
  </script>
  
  <style scoped>
  .js-objects-container {
    font-family: 'Arial', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    color: #333;
  }
  
  .title {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
    font-size: 1.8rem;
  }
  
  /* Вкладки */
  .tabs {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;
  }
  
  .tab-button {
    padding: 12px 24px;
    background-color: #e9ecef;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .tab-button:hover {
    background-color: #dee2e6;
  }
  
  .tab-button.active {
    background-color: #4a6fa5;
    color: white;
  }
  
  .tab-content {
    animation: fadeIn 0.5s ease;
  }
  
  .section-header {
    margin-bottom: 25px;
  }
  
  .section-header h2 {
    color: #345678;
    border-bottom: 2px solid #e9ecef;
    padding-bottom: 10px;
    margin-bottom: 15px;
  }
  
  .description {
    font-size: 1.1rem;
    line-height: 1.5;
    color: #555;
  }
  
  code {
    background-color: #f1f1f1;
    padding: 2px 5px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }
  
  /* Интерактивная демонстрация */
  .interactive-demo {
    margin: 30px 0;
  }
  
  .objects-container {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }
  
  .object-box {
    flex: 1;
    min-width: 300px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .object-box h3 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 20px;
    color: #345678;
  }
  
  .object-visualization {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 6px;
    padding: 15px;
    margin-bottom: 20px;
    min-height: 150px;
    position: relative;
  }
  
  .object-visualization.frozen {
    background-color: #e8f4f8;
    border-color: #add8e6;
    position: relative;
  }
  
  .object-visualization.frozen::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent);
    background-size: 20px 20px;
    pointer-events: none;
    opacity: 0.5;
    border-radius: 6px;
  }
  
  .property {
    padding: 8px 12px;
    margin-bottom: 10px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
  }
  
  .property-name {
    font-weight: bold;
    margin-right: 8px;
    color: #345678;
  }
  
  .property-value {
    color: #d35400;
  }
  
  .freeze-indicator {
    margin-left: auto;
  }
  
  .new-property {
    background-color: #e8f5e9;
    border-left: 3px solid #4caf50;
  }
  
  .controls {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .control-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .action-button {
    padding: 8px 12px;
    background-color: #4a6fa5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    flex: 1;
  }
  
  .action-button:hover {
    background-color: #345678;
  }
  
  .freeze-button-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  
  .freeze-button {
    padding: 10px 20px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
  }
  
  .freeze-button:hover {
    background-color: #2a6fc2;
    transform: translateY(-2px);
  }
  
  .frozen-status {
    text-align: center;
    padding: 10px;
    background-color: #e3f2fd;
    border-radius: 4px;
    color: #1976d2;
    font-weight: bold;
  }
  
  /* Консоль JavaScript */
  .console-log {
    margin-top: 30px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .console-header {
    background-color: #2d2d2d;
    color: white;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .clear-button {
    background-color: transparent;
    color: #e0e0e0;
    border: 1px solid #e0e0e0;
    border-radius: 3px;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 0.8rem;
  }
  
  .clear-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .console-content {
    background-color: #1e1e1e;
    color: #e0e0e0;
    padding: 15px;
    font-family: 'Consolas', 'Monaco', monospace;
    min-height: 120px;
    max-height: 200px;
    overflow-y: auto;
  }
  
  .log-entry {
    margin-bottom: 8px;
    line-height: 1.4;
  }
  
  .error-log {
    color: #ff6b6b;
  }
  
  .log-prefix {
    font-weight: bold;
  }
  
  /* Примеры кода */
  .code-sample {
    margin: 30px 0;
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .code-sample h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #345678;
  }
  
  pre {
    background-color: #1e1e1e;
    color: #e0e0e0;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Consolas', 'Monaco', monospace;
    line-height: 1.5;
  }
  
  /* Информационные разделы */
  .info-section {
    margin: 30px 0;
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .info-section h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #345678;
  }
  
  .info-section ul {
    padding-left: 20px;
  }
  
  .info-section li {
    margin-bottom: 10px;
    line-height: 1.5;
  }
  
  .info-section ul ul {
    margin-top: 5px;
  }
  
  .info-note {
    margin-top: 20px;
    padding: 15px;
    background-color: #fff3cd;
    border-left: 4px solid #ffc107;
    border-radius: 4px;
  }
  
  /* Дескрипторы свойств */
  .descriptors-container {
    margin: 30px 0;
  }
  
  .descriptors-visualization {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }
  
  .object-with-descriptors {
    flex: 2;
    min-width: 300px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .object-body {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 6px;
    padding: 15px;
  }
  
  .property-with-descriptor {
    margin-bottom: 15px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .property-with-descriptor.highlight-property {
    border-left: 4px solid #4a90e2;
    background-color: #f0f7ff;
  }
  
  .property-header {
    padding: 10px 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  
  .property-descriptors {
    padding: 15px;
    background-color: #f8f9fa;
    border-top: 1px solid #e9ecef;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
  }
  
  .descriptor {
    padding: 8px 12px;
    background-color: #f1f1f1;
    border-radius: 4px;
    display: flex;
    align-items: center;
  }
  
  .descriptor-name {
    font-weight: bold;
    margin-right: 8px;
    color: #555;
  }
  
  .descriptor-value {
    color: #d35400;
  }
  
  .descriptor-icon {
    margin-left: auto;
  }
  
  .descriptor-enabled {
    background-color: #e3f2fd;
    border-left: 3px solid #1976d2;
  }
  
  .descriptor.accessor {
    background-color: #f3e5f5;
    border-left: 3px solid #9c27b0;
  }
  
  .descriptors-actions {
    flex: 1;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .action-panel {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .action-panel h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #345678;
  }
  
  .action-inputs {
    margin-bottom: 20px;
  }
  
  .input-group {
    margin-bottom: 10px;
  }
  
  .input-group label {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
  
  .apply-button {
    width: 100%;
    padding: 10px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .apply-button:hover {
    background-color: #2a6fc2;
  }
  
  .test-actions {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .test-actions h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #345678;
  }
  
  .test-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  
  .test-button {
    padding: 8px 10px;
    background-color: #4a6fa5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .test-button:hover {
    background-color: #345678;
  }
  
  /* Сравнение методов */
  .comparison-table {
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
  }
  
  th, td {
    border: 1px solid #e9ecef;
    padding: 12px 15px;
    text-align: left;
  }
  
  th {
    background-color: #4a6fa5;
    color: white;
  }
  
  tr:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  .method-description {
    font-size: 0.9rem;
    color: #666;
    margin-top: 5px;
  }
  
  .cell-yes {
    color: #2ecc71;
    font-weight: bold;
  }
  
  .cell-no {
    color: #e74c3c;
    font-weight: bold;
  }
  
  .cell-custom {
    color: #3498db;
    font-weight: bold;
  }
  
  .methods-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin: 30px 0;
  }
  
  .method-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .method-card h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #345678;
  }
  
  .method-card p {
    margin-bottom: 15px;
    line-height: 1.5;
  }
  
  /* Анимации */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .fade-in {
    animation: fadeIn 0.5s ease;
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  
  .shake-animation {
    animation: shake 0.5s ease;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .tabs {
      flex-direction: column;
      align-items: stretch;
    }
    
    .objects-container, 
    .descriptors-visualization {
      flex-direction: column;
    }
    
    .test-buttons {
      grid-template-columns: 1fr;
    }
  }
  </style>