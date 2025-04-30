<template>
    <div class="collections-container">
      <h1>JavaScript Collections</h1>
      
      <div class="topic-switcher">
        <button 
          v-for="topic in topics" 
          :key="topic.id"
          :class="{ active: currentTopic === topic.id }"
          @click="switchTopic(topic.id)"
        >
          {{ topic.title }}
        </button>
      </div>
      
      <div class="topic-content">
        <!-- Map Component -->
        <div v-if="currentTopic === 'map'" class="topic-section">
          <h2>Map <span class="subtitle">Коллекция пар ключ-значение</span></h2>
          
          <div class="visualization">
            <div class="collection-container">
              <div class="collection-title">Map</div>
              <div class="map-entries">
                <div 
                  v-for="(entry, index) in mapEntries" 
                  :key="index"
                  class="map-entry"
                  :class="{ highlight: entry.highlight }"
                >
                  <div class="key">{{ entry.key }}</div>
                  <div class="arrow">→</div>
                  <div class="value">{{ entry.value }}</div>
                </div>
                <div class="map-empty" v-if="mapEntries.length === 0">
                  Пустая Map
                </div>
              </div>
            </div>
            
            <div class="controls">
              <div class="control-group">
                <input v-model="mapKeyInput" placeholder="Ключ" />
                <input v-model="mapValueInput" placeholder="Значение" />
                <button @click="addToMap" :disabled="!mapKeyInput">Добавить</button>
              </div>
              <div class="control-group">
                <input v-model="mapLookupKey" placeholder="Найти по ключу" />
                <button @click="findInMap">Найти</button>
                <button @click="deleteFromMap" :disabled="!mapLookupKey">Удалить</button>
              </div>
              <div class="control-group">
                <button @click="clearMap">Очистить Map</button>
              </div>
            </div>
          </div>
          
          <div class="info-section">
            <div class="description">
              <h3>Что такое Map?</h3>
              <p>Map — это коллекция пар ключ-значение, где каждый ключ может быть любого типа, включая объекты, функции и примитивы.</p>
              <p>В отличие от объектов, ключи в Map упорядочены в порядке вставки и могут быть любого типа.</p>
            </div>
            
            <div class="features">
              <h3>Особенности Map:</h3>
              <ul>
                <li><strong>Ключи любого типа:</strong> В отличие от объектов, где ключи преобразуются в строки, Map позволяет использовать любые значения как ключи.</li>
                <li><strong>Порядок вставки:</strong> Map сохраняет порядок вставки элементов.</li>
                <li><strong>Прямой доступ к размеру:</strong> Свойство size показывает количество элементов.</li>
                <li><strong>Удобная работа:</strong> Имеет специальные методы для добавления (set), получения (get), проверки (has), удаления (delete) и других операций.</li>
                <li><strong>Итерируемость:</strong> Map является итерируемым объектом и может использоваться в цикле for...of.</li>
              </ul>
            </div>
            
            <div class="code-samples">
              <h3>Примеры использования:</h3>
              <div class="code-sample">
                <h4>Создание и заполнение Map</h4>
                <pre><code>// Создание пустой Map
  const map = new Map();
  
  // Добавление элементов
  map.set('key1', 'value1');
  map.set(42, 'числовой ключ');
  map.set(true, 'логический ключ');
  
  // Создание с начальными значениями
  const mapWithValues = new Map([
    ['key1', 'value1'],
    [42, 'числовой ключ'],
    [true, 'логический ключ']
  ]);</code></pre>
              </div>
              
              <div class="code-sample">
                <h4>Работа с Map</h4>
                <pre><code>// Получение значения
  const value = map.get('key1'); // 'value1'
  
  // Проверка наличия ключа
  if (map.has(42)) {
    console.log('Найден ключ 42');
  }
  
  // Удаление элемента
  map.delete(true);
  
  // Получение размера
  console.log(map.size); // 2
  
  // Очистка всей Map
  map.clear();</code></pre>
              </div>
              
              <div class="code-sample">
                <h4>Итерация по Map</h4>
                <pre><code>// Перебор пар ключ-значение
  for (const [key, value] of map) {
    console.log(`${key} = ${value}`);
  }
  
  // Перебор ключей
  for (const key of map.keys()) {
    console.log(key);
  }
  
  // Перебор значений
  for (const value of map.values()) {
    console.log(value);
  }
  
  // Перебор записей
  map.forEach((value, key) => {
    console.log(`${key} -> ${value}`);
  });</code></pre>
              </div>
            </div>
            
            <div class="pitfalls">
              <h3>Подводные камни:</h3>
              <ul>
                <li><strong>Сериализация:</strong> Map нельзя напрямую сериализовать в JSON. Нужно преобразовать в массив или объект.</li>
                <li><strong>Сравнение объектов:</strong> Объекты как ключи сравниваются по ссылке, а не по содержимому.</li>
                <li><strong>Память:</strong> Map хранит ссылки на объекты-ключи, что может препятствовать сборке мусора.</li>
              </ul>
            </div>
            
            <div class="use-cases">
              <h3>Когда использовать Map:</h3>
              <ul>
                <li>Когда нужно часто добавлять/удалять пары ключ-значение</li>
                <li>Когда важен порядок элементов</li>
                <li>Когда ключи могут быть не строками (объекты, функции и т.д.)</li>
                <li>Когда размер коллекции заранее неизвестен или часто меняется</li>
                <li>Когда требуется частая итерация по всей коллекции</li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Set Component -->
        <div v-if="currentTopic === 'set'" class="topic-section">
          <h2>Set <span class="subtitle">Коллекция уникальных значений</span></h2>
          
          <div class="visualization">
            <div class="collection-container">
              <div class="collection-title">Set</div>
              <div class="set-values">
                <div 
                  v-for="(entry, index) in setEntries" 
                  :key="index"
                  class="set-value"
                  :class="{ highlight: entry.highlight }"
                >
                  {{ entry.value }}
                </div>
                <div class="set-empty" v-if="setEntries.length === 0">
                  Пустой Set
                </div>
              </div>
            </div>
            
            <div class="controls">
              <div class="control-group">
                <input v-model="setValueInput" placeholder="Значение" />
                <button @click="addToSet" :disabled="!setValueInput">Добавить</button>
              </div>
              <div class="control-group">
                <input v-model="setLookupValue" placeholder="Значение для поиска" />
                <button @click="findInSet">Проверить</button>
                <button @click="deleteFromSet" :disabled="!setLookupValue">Удалить</button>
              </div>
              <div class="control-group">
                <button @click="clearSet">Очистить Set</button>
              </div>
            </div>
          </div>
          
          <div class="info-section">
            <div class="description">
              <h3>Что такое Set?</h3>
              <p>Set — это коллекция уникальных значений любого типа. Каждое значение может встречаться только один раз.</p>
              <p>Set полезен, когда нужно хранить только уникальные значения и быстро проверять их наличие.</p>
            </div>
            
            <div class="features">
              <h3>Особенности Set:</h3>
              <ul>
                <li><strong>Уникальность значений:</strong> Set хранит только уникальные значения. Повторные добавления игнорируются.</li>
                <li><strong>Порядок вставки:</strong> Set сохраняет порядок добавления элементов.</li>
                <li><strong>Быстрый поиск:</strong> Проверка наличия элемента происходит за O(1).</li>
                <li><strong>Любые типы данных:</strong> Set может содержать значения любых типов.</li>
                <li><strong>Прямой доступ к размеру:</strong> Свойство size показывает количество элементов.</li>
              </ul>
            </div>
            
            <div class="code-samples">
              <h3>Примеры использования:</h3>
              <div class="code-sample">
                <h4>Создание и заполнение Set</h4>
                <pre><code>// Создание пустого Set
  const set = new Set();
  
  // Добавление элементов
  set.add('значение1');
  set.add(42);
  set.add(true);
  
  // Попытка добавить дубликат (будет проигнорирована)
  set.add('значение1');
  
  // Создание Set из массива
  const setFromArray = new Set([1, 2, 3, 1, 2]); // {1, 2, 3}</code></pre>
              </div>
              
              <div class="code-sample">
                <h4>Работа с Set</h4>
                <pre><code>// Проверка наличия значения
  if (set.has(42)) {
    console.log('Найдено значение 42');
  }
  
  // Удаление элемента
  set.delete('значение1');
  
  // Получение размера
  console.log(set.size); // 2
  
  // Очистка всего Set
  set.clear();</code></pre>
              </div>
              
              <div class="code-sample">
                <h4>Итерация по Set</h4>
                <pre><code>// Перебор значений
  for (const value of set) {
    console.log(value);
  }
  
  // Перебор с помощью forEach
  set.forEach(value => {
    console.log(value);
  });
  
  // Преобразование в массив
  const array = [...set];
  // или
  const arrayAlt = Array.from(set);</code></pre>
              </div>
              
              <div class="code-sample">
                <h4>Практические примеры</h4>
                <pre><code>// Удаление дубликатов из массива
  const uniqueArray = [...new Set(arrayWithDuplicates)];
  
  // Объединение множеств
  const union = new Set([...set1, ...set2]);
  
  // Пересечение множеств
  const intersection = new Set(
    [...set1].filter(x => set2.has(x))
  );
  
  // Разность множеств
  const difference = new Set(
    [...set1].filter(x => !set2.has(x))
  );</code></pre>
              </div>
            </div>
            
            <div class="pitfalls">
              <h3>Подводные камни:</h3>
              <ul>
                <li><strong>Сериализация:</strong> Set нельзя напрямую сериализовать в JSON. Нужно сначала преобразовать в массив.</li>
                <li><strong>Объекты в Set:</strong> Объекты сравниваются по ссылке, а не по содержимому.</li>
                <li><strong>Примитивная функциональность:</strong> Set не имеет встроенных методов для операций над множествами (объединение, пересечение).</li>
                <li><strong>Нет прямого доступа:</strong> Нельзя получить элемент по индексу или позиции.</li>
              </ul>
            </div>
            
            <div class="use-cases">
              <h3>Когда использовать Set:</h3>
              <ul>
                <li>Когда нужно хранить только уникальные значения</li>
                <li>Для быстрой проверки наличия элемента</li>
                <li>При работе с математическими множествами</li>
                <li>Для удаления дубликатов из массива</li>
                <li>Когда порядок элементов важен (в отличие от обычных множеств в математике)</li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- WeakMap Component -->
        <div v-if="currentTopic === 'weakmap'" class="topic-section">
          <h2>WeakMap <span class="subtitle">Map со слабыми ссылками на ключи</span></h2>
          
          <div class="visualization">
            <div class="memory-model">
              <div class="memory-title">Модель памяти</div>
              <div class="memory-container">
                <div class="objects-container">
                  <div class="memory-subtitle">Объекты в памяти</div>
                  <div class="memory-objects">
                    <div 
                      v-for="(obj, index) in memoryObjects" 
                      :key="obj.id"
                      class="memory-object"
                      :class="{ active: obj.active }"
                      @click="toggleObjectActive(index)"
                    >
                      <div class="object-id">id: {{ obj.id }}</div>
                      <div class="object-content">{{ obj.content }}</div>
                      <div class="refs-count">
                        Ссылок: <span>{{ obj.refCount }}</span>
                      </div>
                    </div>
                    <button class="add-object-btn" @click="addMemoryObject">
                      + Создать объект
                    </button>
                  </div>
                </div>
                
                <div class="maps-container">
                  <div class="normal-map">
                    <div class="memory-subtitle">Map</div>
                    <div class="map-entries memory-map">
                      <div 
                        v-for="(entry, index) in normalMapEntries" 
                        :key="index"
                        class="map-entry memory-entry"
                      >
                        <div class="key">Object #{{ entry.keyId }}</div>
                        <div class="arrow">→</div>
                        <div class="value">{{ entry.value }}</div>
                      </div>
                      <div class="map-empty" v-if="normalMapEntries.length === 0">
                        Пустая Map
                      </div>
                    </div>
                  </div>
                  
                  <div class="weak-map">
                    <div class="memory-subtitle">WeakMap</div>
                    <div class="map-entries memory-map">
                      <div 
                        v-for="(entry, index) in weakMapEntries" 
                        :key="index"
                        class="map-entry memory-entry"
                      >
                        <div class="key">Object #{{ entry.keyId }}</div>
                        <div class="arrow">→</div>
                        <div class="value">{{ entry.value }}</div>
                      </div>
                      <div class="map-empty" v-if="weakMapEntries.length === 0">
                        Пустая WeakMap
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="memory-controls">
                <button 
                  @click="addObjectToMaps" 
                  :disabled="!activeObjectIndex"
                >
                  Добавить выбранный объект в карты
                </button>
                <button 
                  @click="runGarbageCollection" 
                  class="gc-button"
                >
                  Запустить сборку мусора
                </button>
                <div class="hint">
                  Подсказка: объекты без ссылок удаляются при сборке мусора. 
                  WeakMap не препятствует удалению объектов-ключей, в отличие от обычной Map.
                </div>
              </div>
            </div>
          </div>
          
          <div class="info-section">
            <div class="description">
              <h3>Что такое WeakMap?</h3>
              <p>WeakMap — это коллекция пар ключ-значение, где ключи должны быть объектами, а WeakMap удерживает слабые ссылки на эти ключи.</p>
              <p>Главная особенность: если на объект-ключ нет других ссылок в программе, он может быть удален сборщиком мусора, даже если он используется как ключ в WeakMap.</p>
            </div>
            
            <div class="features">
              <h3>Особенности WeakMap:</h3>
              <ul>
                <li><strong>Слабые ссылки на ключи:</strong> WeakMap не предотвращает удаление объектов-ключей сборщиком мусора.</li>
                <li><strong>Только объекты как ключи:</strong> В отличие от Map, ключами в WeakMap могут быть только объекты (не примитивы).</li>
                <li><strong>Нет итерации:</strong> WeakMap не является итерируемым и не поддерживает методы keys(), values(), entries().</li>
                <li><strong>Нет свойства size:</strong> Нельзя узнать размер WeakMap.</li>
                <li><strong>Ограниченные методы:</strong> Доступны только методы get(), set(), has(), delete().</li>
              </ul>
            </div>
            
            <div class="code-samples">
              <h3>Примеры использования:</h3>
              <div class="code-sample">
                <h4>Создание и работа с WeakMap</h4>
                <pre><code>// Создание WeakMap
  const weakMap = new WeakMap();
  
  // Создание объектов для использования в качестве ключей
  const obj1 = { name: 'Object 1' };
  const obj2 = { name: 'Object 2' };
  
  // Добавление записей
  weakMap.set(obj1, 'данные для объекта 1');
  weakMap.set(obj2, 'данные для объекта 2');
  
  // Получение значения
  console.log(weakMap.get(obj1)); // 'данные для объекта 1'
  
  // Проверка наличия ключа
  console.log(weakMap.has(obj1)); // true
  
  // Удаление записи
  weakMap.delete(obj1);</code></pre>
              </div>
              
              <div class="code-sample">
                <h4>Использование для приватных данных</h4>
                <pre><code>// Хранение приватных данных для объектов
  const privateData = new WeakMap();
  
  function processObject(obj) {
    // Добавляем приватные данные
    privateData.set(obj, { 
      createdAt: Date.now(),
      processCount: 0 
    });
    
    // Работаем с объектом...
  }
  
  function updateObject(obj) {
    // Получаем приватные данные
    const data = privateData.get(obj);
    if (data) {
      data.processCount++;
      data.lastUpdated = Date.now();
    }
    
    // Обновляем объект...
  }</code></pre>
              </div>
              
              <div class="code-sample">
                <h4>Использование для кеширования</h4>
                <pre><code>// Кеширование результатов вычислений для объектов
  const cache = new WeakMap();
  
  function processData(obj) {
    if (cache.has(obj)) {
      console.log('Возвращаем кешированный результат');
      return cache.get(obj);
    }
    
    // Выполняем сложные вычисления
    const result = expensiveComputation(obj);
    
    // Сохраняем результат в кеше
    cache.set(obj, result);
    
    return result;
  }</code></pre>
              </div>
            </div>
            
            <div class="pitfalls">
              <h3>Подводные камни:</h3>
              <ul>
                <li><strong>Ограничение по ключам:</strong> Нельзя использовать примитивы (строки, числа) как ключи.</li>
                <li><strong>Отсутствие итерации:</strong> Нельзя перебрать все ключи или значения WeakMap.</li>
                <li><strong>Невозможность отслеживания:</strong> Нельзя узнать, сколько пар ключ-значение находится в WeakMap.</li>
                <li><strong>Непредсказуемость сборки мусора:</strong> Нельзя точно предсказать, когда будет запущена сборка мусора и удалены неиспользуемые объекты.</li>
              </ul>
            </div>
            
            <div class="use-cases">
              <h3>Когда использовать WeakMap:</h3>
              <ul>
                <li>Для хранения приватных или дополнительных данных для объектов</li>
                <li>Для кеширования результатов операций над объектами без риска утечки памяти</li>
                <li>Для реализации систем событий и обработчиков, где объекты могут быть удалены</li>
                <li>Когда нужно ассоциировать данные с DOM-элементами без риска утечки памяти</li>
                <li>В ситуациях, где объекты могут быть удалены, но их ассоциированные данные должны быть автоматически очищены</li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- WeakSet Component -->
        <div v-if="currentTopic === 'weakset'" class="topic-section">
          <h2>WeakSet <span class="subtitle">Set со слабыми ссылками на объекты</span></h2>
          
          <div class="visualization">
            <div class="memory-model">
              <div class="memory-title">Модель памяти</div>
              <div class="memory-container">
                <div class="objects-container">
                  <div class="memory-subtitle">Объекты в памяти</div>
                  <div class="memory-objects">
                    <div 
                      v-for="(obj, index) in memoryObjectsWS" 
                      :key="obj.id"
                      class="memory-object"
                      :class="{ active: obj.active }"
                      @click="toggleObjectActiveWS(index)"
                    >
                      <div class="object-id">id: {{ obj.id }}</div>
                      <div class="object-content">{{ obj.content }}</div>
                      <div class="refs-count">
                        Ссылок: <span>{{ obj.refCount }}</span>
                      </div>
                    </div>
                    <button class="add-object-btn" @click="addMemoryObjectWS">
                      + Создать объект
                    </button>
                  </div>
                </div>
                
                <div class="sets-container">
                  <div class="normal-set">
                    <div class="memory-subtitle">Set</div>
                    <div class="set-values memory-set">
                      <div 
                        v-for="objId in normalSetValues" 
                        :key="objId"
                        class="set-value memory-value"
                      >
                        Object #{{ objId }}
                      </div>
                      <div class="set-empty" v-if="normalSetValues.length === 0">
                        Пустой Set
                      </div>
                    </div>
                  </div>
                  
                  <div class="weak-set">
                    <div class="memory-subtitle">WeakSet</div>
                    <div class="set-values memory-set">
                      <div 
                        v-for="objId in weakSetValues" 
                        :key="objId"
                        class="set-value memory-value"
                      >
                        Object #{{ objId }}
                      </div>
                      <div class="set-empty" v-if="weakSetValues.length === 0">
                        Пустой WeakSet
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="memory-controls">
                <button 
                  @click="addObjectToSets" 
                  :disabled="!activeObjectIndexWS"
                >
                  Добавить выбранный объект в множества
                </button>
                <button 
                  @click="runGarbageCollectionWS" 
                  class="gc-button"
                >
                  Запустить сборку мусора
                </button>
                <div class="hint">
                  Подсказка: объекты без ссылок удаляются при сборке мусора. 
                  WeakSet не препятствует удалению объектов, в отличие от обычного Set.
                </div>
              </div>
            </div>
          </div>
          
          <div class="info-section">
            <div class="description">
              <h3>Что такое WeakSet?</h3>
              <p>WeakSet — это коллекция уникальных объектов, которая хранит слабые ссылки на эти объекты.</p>
              <p>Основная особенность: если на объект нет других ссылок в программе, он может быть удален сборщиком мусора, даже если он содержится в WeakSet.</p>
            </div>
            
            <div class="features">
              <h3>Особенности WeakSet:</h3>
              <ul>
                <li><strong>Слабые ссылки на объекты:</strong> WeakSet не предотвращает удаление объектов сборщиком мусора.</li>
                <li><strong>Только объекты:</strong> В WeakSet можно добавлять только объекты (не примитивы).</li>
                <li><strong>Нет итерации:</strong> WeakSet не является итерируемым и не поддерживает методы values(), entries(), forEach().</li>
                <li><strong>Нет свойства size:</strong> Нельзя узнать размер WeakSet.</li>
                <li><strong>Ограниченные методы:</strong> Доступны только методы add(), has(), delete().</li>
              </ul>
            </div>
            
            <div class="code-samples">
              <h3>Примеры использования:</h3>
              <div class="code-sample">
                <h4>Создание и работа с WeakSet</h4>
                <pre><code>// Создание WeakSet
  const weakSet = new WeakSet();
  
  // Создание объектов
  const obj1 = { name: 'Object 1' };
  const obj2 = { name: 'Object 2' };
  
  // Добавление объектов
  weakSet.add(obj1);
  weakSet.add(obj2);
  
  // Проверка наличия объекта
  console.log(weakSet.has(obj1)); // true
  
  // Удаление объекта
  weakSet.delete(obj1);
  
  // Примитивы нельзя добавлять
  // Это вызовет ошибку:
  // weakSet.add(42);</code></pre>
              </div>
              
              <div class="code-sample">
                <h4>Использование для отметки объектов</h4>
                <pre><code>// Использование WeakSet для отметки "посещенных" объектов
  const visited = new WeakSet();
  
  function processNode(node) {
    // Проверяем, не обрабатывали ли мы уже этот объект
    if (visited.has(node)) {
      console.log('Этот узел уже был обработан');
      return;
    }
    
    // Отмечаем объект как посещенный
    visited.add(node);
    
    // Обрабатываем объект
    console.log('Обрабатываем:', node);
    
    // Обрабатываем связанные объекты
    if (node.children) {
      node.children.forEach(child => processNode(child));
    }
  }</code></pre>
              </div>
              
              <div class="code-sample">
                <h4>Использование для проверки валидности</h4>
              <pre><code>// Использование WeakSet для проверки "валидности" объектов
const validEntities = new WeakSet();

class Entity {
  constructor() {
    // Регистрируем созданный объект как валидный
    validEntities.add(this);
  }
  
  destroy() {
    // Удаляем из множества валидных объектов
    validEntities.delete(this);
  }
  
  process() {
    // Проверяем, что объект все еще валиден
    if (!validEntities.has(this)) {
      throw new Error('Доступ к недействительному объекту');
    }
    
    // Продолжаем обработку...
    console.log('Обработка выполняется...');
  }
}</code></pre>
            </div>
          </div>
          
          <div class="pitfalls">
            <h3>Подводные камни:</h3>
            <ul>
              <li><strong>Ограничение по содержимому:</strong> Можно хранить только объекты, не примитивы.</li>
              <li><strong>Отсутствие итерации:</strong> Нельзя перебрать содержимое WeakSet.</li>
              <li><strong>Невозможность отслеживания:</strong> Нельзя узнать, сколько объектов находится в WeakSet.</li>
              <li><strong>Невозможность клонирования:</strong> Нельзя создать копию WeakSet.</li>
              <li><strong>Непредсказуемость сборки мусора:</strong> Нельзя точно предсказать, когда будет запущена сборка мусора и удалены неиспользуемые объекты.</li>
            </ul>
          </div>
          
          <div class="use-cases">
            <h3>Когда использовать WeakSet:</h3>
            <ul>
              <li>Для маркировки или тегирования объектов (отметка "посещенных" узлов при обходе графа)</li>
              <li>Для хранения списка "валидных" объектов без риска утечки памяти</li>
              <li>Для проверки, был ли объект уже обработан (например, при рекурсивном обходе структуры данных)</li>
              <li>Когда нужно хранить ссылки на DOM-элементы, которые могут быть удалены из документа</li>
              <li>В ситуациях, где объекты могут исчезать, и нужно автоматически не учитывать их, не вызывая утечек памяти</li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Comparison Component -->
      <div v-if="currentTopic === 'comparison'" class="topic-section">
        <h2>Сравнение коллекций <span class="subtitle">Выбор правильного инструмента</span></h2>
        
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Особенность</th>
                <th>Map</th>
                <th>Set</th>
                <th>WeakMap</th>
                <th>WeakSet</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Тип хранимых данных</td>
                <td>Пары ключ-значение</td>
                <td>Уникальные значения</td>
                <td>Пары ключ-значение</td>
                <td>Уникальные объекты</td>
              </tr>
              <tr>
                <td>Типы ключей/значений</td>
                <td>Любой тип как ключ и как значение</td>
                <td>Любой тип</td>
                <td>Только объекты как ключи, любой тип как значение</td>
                <td>Только объекты</td>
              </tr>
              <tr>
                <td>Слабые ссылки</td>
                <td>Нет</td>
                <td>Нет</td>
                <td>Да (на ключи)</td>
                <td>Да</td>
              </tr>
              <tr>
                <td>Итерируемость</td>
                <td>Да</td>
                <td>Да</td>
                <td>Нет</td>
                <td>Нет</td>
              </tr>
              <tr>
                <td>Свойство size</td>
                <td>Да</td>
                <td>Да</td>
                <td>Нет</td>
                <td>Нет</td>
              </tr>
              <tr>
                <td>Основные методы</td>
                <td>set, get, has, delete, clear</td>
                <td>add, has, delete, clear</td>
                <td>set, get, has, delete</td>
                <td>add, has, delete</td>
              </tr>
              <tr>
                <td>Методы для итерации</td>
                <td>keys, values, entries, forEach</td>
                <td>values, entries, forEach</td>
                <td>Нет</td>
                <td>Нет</td>
              </tr>
              <tr>
                <td>Порядок элементов</td>
                <td>Порядок вставки</td>
                <td>Порядок вставки</td>
                <td>Не определен</td>
                <td>Не определен</td>
              </tr>
              <tr>
                <td>Влияние на сборку мусора</td>
                <td>Препятствует сборке мусора для ключей</td>
                <td>Препятствует сборке мусора для значений</td>
                <td>Не препятствует сборке мусора ключей</td>
                <td>Не препятствует сборке мусора объектов</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="decision-tree">
          <h3>Как выбрать правильную коллекцию?</h3>
          
          <div class="decision-diagram">
            <div class="decision-node root">
              Что вам нужно хранить?
              <div class="decision-options">
                <div class="decision-option">
                  <div class="decision-arrow">↙</div>
                  <div class="decision-label">Пары ключ-значение</div>
                </div>
                <div class="decision-option">
                  <div class="decision-arrow">↘</div>
                  <div class="decision-label">Уникальные значения</div>
                </div>
              </div>
            </div>
            
            <div class="decision-level">
              <div class="decision-node">
                Нужны ли объекты-ключи, которые могут быть собраны GC?
                <div class="decision-options">
                  <div class="decision-option">
                    <div class="decision-arrow">↙</div>
                    <div class="decision-label">Да</div>
                  </div>
                  <div class="decision-option">
                    <div class="decision-arrow">↘</div>
                    <div class="decision-label">Нет</div>
                  </div>
                </div>
              </div>
              
              <div class="decision-node">
                Нужно ли хранить объекты, которые могут быть собраны GC?
                <div class="decision-options">
                  <div class="decision-option">
                    <div class="decision-arrow">↙</div>
                    <div class="decision-label">Да</div>
                  </div>
                  <div class="decision-option">
                    <div class="decision-arrow">↘</div>
                    <div class="decision-label">Нет</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="decision-level results">
              <div class="decision-result">
                <div class="result-title">WeakMap</div>
                <div class="result-desc">Используйте, когда ключи - объекты, которые могут быть удалены</div>
              </div>
              
              <div class="decision-result">
                <div class="result-title">Map</div>
                <div class="result-desc">Используйте для обычного хранения пар ключ-значение</div>
              </div>
              
              <div class="decision-result">
                <div class="result-title">WeakSet</div>
                <div class="result-desc">Используйте для уникальных объектов, которые могут быть удалены</div>
              </div>
              
              <div class="decision-result">
                <div class="result-title">Set</div>
                <div class="result-desc">Используйте для хранения уникальных значений</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="practical-examples">
          <h3>Практические примеры использования</h3>
          
          <div class="example-cards">
            <div class="example-card">
              <h4>Кеширование вычислений</h4>
              <div class="card-content">
                <p>Map отлично подходит для создания кеша, особенно когда ключи могут быть любого типа:</p>
                <pre><code>const computationCache = new Map();

function expensiveCalculation(input) {
  // Проверяем кеш
  if (computationCache.has(input)) {
    return computationCache.get(input);
  }
  
  // Выполняем вычисления
  const result = /* сложные расчеты */;
  
  // Кешируем результат
  computationCache.set(input, result);
  
  return result;
}</code></pre>
              </div>
            </div>
            
            <div class="example-card">
              <div class="card-content">
                <h4>Устранение дубликатов</h4>
                <p>Set идеален для быстрого устранения дубликатов из массива:</p>
                <pre><code>function removeDuplicates(array) {
  return [...new Set(array)];
}

const numbers = [1, 2, 3, 1, 2, 4, 5, 3];
const unique = removeDuplicates(numbers);
// [1, 2, 3, 4, 5]</code></pre>
              </div>
            </div>
            
            <div class="example-card">
              <h4>Приватные данные объектов</h4>
              <div class="card-content">
                <p>WeakMap позволяет хранить приватные данные, связанные с объектами:</p>
                <pre><code>const privateData = new WeakMap();

class User {
  constructor(name, age) {
    this.name = name;
    // Храним приватные данные
    privateData.set(this, { age });
  }
  
  getAge() {
    return privateData.get(this).age;
  }
  
  setAge(age) {
    privateData.get(this).age = age;
  }
}</code></pre>
              </div>
            </div>
            
            <div class="example-card">
              <h4>DOM-элементы без утечек памяти</h4>
              <div class="card-content">
                <p>WeakSet и WeakMap отлично подходят для работы с DOM-элементами:</p>
                <pre><code>// Храним обработчики событий
const handlers = new WeakMap();

function addClickHandler(element, handler) {
  // Сохраняем оригинальный обработчик
  handlers.set(element, handler);
  
  // Функция-обертка для события
  const wrappedHandler = (event) => {
    handlers.get(element)(event);
  };
  
  // Добавляем обработчик
  element.addEventListener('click', wrappedHandler);
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Список тем
const topics = [
  { id: 'map', title: 'Map' },
  { id: 'set', title: 'Set' },
  { id: 'weakmap', title: 'WeakMap' },
  { id: 'weakset', title: 'WeakSet' },
  { id: 'comparison', title: 'Сравнение' }
];

// Текущая тема
const currentTopic = ref('map');

// Функция переключения темы
function switchTopic(topicId) {
  currentTopic.value = topicId;
}

// Map демонстрация
const mapEntries = ref([]);
const mapKeyInput = ref('');
const mapValueInput = ref('');
const mapLookupKey = ref('');

function addToMap() {
  if (!mapKeyInput.value) return;
  
  // Проверяем, есть ли уже такой ключ
  const existingIndex = mapEntries.value.findIndex(entry => entry.key === mapKeyInput.value);
  
  if (existingIndex !== -1) {
    // Обновляем существующую запись
    mapEntries.value[existingIndex].value = mapValueInput.value || '';
    mapEntries.value[existingIndex].highlight = true;
    
    // Убираем подсветку через секунду
    setTimeout(() => {
      mapEntries.value[existingIndex].highlight = false;
    }, 1000);
  } else {
    // Добавляем новую запись
    const newEntry = {
      key: mapKeyInput.value,
      value: mapValueInput.value || '',
      highlight: true
    };
    
    mapEntries.value.push(newEntry);
    
    // Убираем подсветку через секунду
    setTimeout(() => {
      const index = mapEntries.value.findIndex(entry => entry === newEntry);
      if (index !== -1) {
        mapEntries.value[index].highlight = false;
      }
    }, 1000);
  }
  
  // Очищаем поля ввода
  mapKeyInput.value = '';
  mapValueInput.value = '';
}

function findInMap() {
  if (!mapLookupKey.value) return;
  
  const index = mapEntries.value.findIndex(entry => entry.key === mapLookupKey.value);
  
  if (index !== -1) {
    // Подсвечиваем найденную запись
    mapEntries.value[index].highlight = true;
    
    // Убираем подсветку через секунду
    setTimeout(() => {
      mapEntries.value[index].highlight = false;
    }, 1000);
  }
}

function deleteFromMap() {
  if (!mapLookupKey.value) return;
  
  const index = mapEntries.value.findIndex(entry => entry.key === mapLookupKey.value);
  
  if (index !== -1) {
    // Удаляем запись
    mapEntries.value.splice(index, 1);
  }
  
  // Очищаем поле поиска
  mapLookupKey.value = '';
}

function clearMap() {
  mapEntries.value = [];
}

// Set демонстрация
const setEntries = ref([]);
const setValueInput = ref('');
const setLookupValue = ref('');

function addToSet() {
  if (!setValueInput.value) return;
  
  // Проверяем, есть ли уже такое значение
  const existingIndex = setEntries.value.findIndex(entry => entry.value === setValueInput.value);
  
  if (existingIndex === -1) {
    // Добавляем новую запись
    const newEntry = {
      value: setValueInput.value,
      highlight: true
    };
    
    setEntries.value.push(newEntry);
    
    // Убираем подсветку через секунду
    setTimeout(() => {
      const index = setEntries.value.findIndex(entry => entry === newEntry);
      if (index !== -1) {
        setEntries.value[index].highlight = false;
      }
    }, 1000);
  } else {
    // Подсвечиваем существующую запись как дубликат
    setEntries.value[existingIndex].highlight = true;
    
    // Убираем подсветку через секунду
    setTimeout(() => {
      setEntries.value[existingIndex].highlight = false;
    }, 1000);
  }
  
  // Очищаем поле ввода
  setValueInput.value = '';
}

function findInSet() {
  if (!setLookupValue.value) return;
  
  const index = setEntries.value.findIndex(entry => entry.value === setLookupValue.value);
  
  if (index !== -1) {
    // Подсвечиваем найденную запись
    setEntries.value[index].highlight = true;
    
    // Убираем подсветку через секунду
    setTimeout(() => {
      setEntries.value[index].highlight = false;
    }, 1000);
  }
}

function deleteFromSet() {
  if (!setLookupValue.value) return;
  
  const index = setEntries.value.findIndex(entry => entry.value === setLookupValue.value);
  
  if (index !== -1) {
    // Удаляем запись
    setEntries.value.splice(index, 1);
  }
  
  // Очищаем поле поиска
  setLookupValue.value = '';
}

function clearSet() {
  setEntries.value = [];
}

// WeakMap демонстрация
let nextObjectId = 1;
const memoryObjects = ref([]);
const activeObjectIndex = ref(null);
const normalMapEntries = ref([]);
const weakMapEntries = ref([]);

function addMemoryObject() {
  const newObj = {
    id: nextObjectId++,
    content: `{ data: "${Math.random().toString(36).substring(2, 8)}" }`,
    refCount: 0,
    active: false
  };
  
  memoryObjects.value.push(newObj);
}

function toggleObjectActive(index) {
  // Сбрасываем активный статус для всех объектов
  memoryObjects.value.forEach(obj => obj.active = false);
  
  // Устанавливаем новый активный объект
  memoryObjects.value[index].active = true;
  activeObjectIndex.value = index;
}

function addObjectToMaps() {
  if (activeObjectIndex.value === null) return;
  
  const obj = memoryObjects.value[activeObjectIndex.value];
  
  // Добавляем объект в Map и WeakMap
  const value = `Value for Object #${obj.id}`;
  
  // Добавляем в обычную Map (увеличивает счетчик ссылок)
  normalMapEntries.value.push({ keyId: obj.id, value });
  obj.refCount++;
  
  // Добавляем в WeakMap (не увеличивает счетчик ссылок в нашей симуляции)
  weakMapEntries.value.push({ keyId: obj.id, value });
}

function runGarbageCollection() {
  // Находим объекты без ссылок и удаляем их
  const indicesToRemove = [];
  
  memoryObjects.value.forEach((obj, index) => {
    if (obj.refCount === 0) {
      indicesToRemove.push(index);
    }
  });
  
  // Удаляем объекты без ссылок (в обратном порядке, чтобы не сбить индексы)
  for (let i = indicesToRemove.length - 1; i >= 0; i--) {
    const objId = memoryObjects.value[indicesToRemove[i]].id;
    
    // Удаляем объект из памяти
    memoryObjects.value.splice(indicesToRemove[i], 1);
    
    // Сбрасываем активный индекс, если он был удален
    if (activeObjectIndex.value === indicesToRemove[i]) {
      activeObjectIndex.value = null;
    } else if (activeObjectIndex.value > indicesToRemove[i]) {
      activeObjectIndex.value--;
    }
    
    // Удаляем записи из WeakMap (симуляция работы WeakMap)
    const weakIndices = weakMapEntries.value
      .map((entry, index) => entry.keyId === objId ? index : -1)
      .filter(index => index !== -1)
      .sort((a, b) => b - a);
    
    weakIndices.forEach(index => {
      weakMapEntries.value.splice(index, 1);
    });
  }
}

// WeakSet демонстрация
let nextObjectIdWS = 1;
const memoryObjectsWS = ref([]);
const activeObjectIndexWS = ref(null);
const normalSetValues = ref([]);
const weakSetValues = ref([]);

function addMemoryObjectWS() {
  const newObj = {
    id: nextObjectIdWS++,
    content: `{ value: "${Math.random().toString(36).substring(2, 8)}" }`,
    refCount: 0,
    active: false
  };
  
  memoryObjectsWS.value.push(newObj);
}

function toggleObjectActiveWS(index) {
  // Сбрасываем активный статус для всех объектов
  memoryObjectsWS.value.forEach(obj => obj.active = false);
  
  // Устанавливаем новый активный объект
  memoryObjectsWS.value[index].active = true;
  activeObjectIndexWS.value = index;
}

function addObjectToSets() {
  if (activeObjectIndexWS.value === null) return;
  
  const obj = memoryObjectsWS.value[activeObjectIndexWS.value];
  
  // Проверяем, есть ли уже такой объект в Set
  if (!normalSetValues.value.includes(obj.id)) {
    // Добавляем в обычный Set (увеличивает счетчик ссылок)
    normalSetValues.value.push(obj.id);
    obj.refCount++;
  }
  
  // Проверяем, есть ли уже такой объект в WeakSet
  if (!weakSetValues.value.includes(obj.id)) {
    // Добавляем в WeakSet (не увеличивает счетчик ссылок в нашей симуляции)
    weakSetValues.value.push(obj.id);
  }
}

function runGarbageCollectionWS() {
  // Находим объекты без ссылок и удаляем их
  const indicesToRemove = [];
  
  memoryObjectsWS.value.forEach((obj, index) => {
    if (obj.refCount === 0) {
      indicesToRemove.push(index);
    }
  });
  
  // Удаляем объекты без ссылок (в обратном порядке, чтобы не сбить индексы)
  for (let i = indicesToRemove.length - 1; i >= 0; i--) {
    const objId = memoryObjectsWS.value[indicesToRemove[i]].id;
    
    // Удаляем объект из памяти
    memoryObjectsWS.value.splice(indicesToRemove[i], 1);
    
    // Сбрасываем активный индекс, если он был удален
    if (activeObjectIndexWS.value === indicesToRemove[i]) {
      activeObjectIndexWS.value = null;
    } else if (activeObjectIndexWS.value > indicesToRemove[i]) {
      activeObjectIndexWS.value--;
    }
    
    // Удаляем записи из WeakSet (симуляция работы WeakSet)
    const weakIndex = weakSetValues.value.indexOf(objId);
    if (weakIndex !== -1) {
      weakSetValues.value.splice(weakIndex, 1);
    }
  }
}
</script>

<style scoped>
.collections-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #2c3e50;
}

h1, h2, h3, h4 {
  color: #2c3e50;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

h2 {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-weight: bold;
}

.subtitle {
  font-size: 0.7em;
  font-weight: normal;
  color: #777;
  margin-left: 10px;
}

.topic-switcher {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.topic-switcher button {
  padding: 10px 20px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.topic-switcher button:hover {
  background: #e9e9e9;
}

.topic-switcher button.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.topic-content {
  min-height: 500px;
}

.topic-section {
  animation: fadeIn 0.5s;
}

.visualization {
  margin-bottom: 30px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  background: #f9f9f9;
}

/* Map и Set стили */
.collection-container {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 15px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.collection-title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: #3498db;
  text-align: center;
}

.map-entries, .set-values {
  min-height: 150px;
  border: 1px dashed #ddd;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.map-entry, .set-value {
  padding: 6px 10px;
  background: #f5f5f5;
  border-radius: 4px;
  transition: all 0.3s;
}

.map-entry {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 10px;
  align-items: center;
}

.set-value {
  text-align: center;
}

.map-entry.highlight, .set-value.highlight {
  background: #ffeb3b;
  animation: pulse 1s;
}

.key, .value {
  padding: 4px 8px;
  border-radius: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.key {
  background: #e1f5fe;
  color: #0277bd;
  text-align: right;
}

.value {
  background: #e8f5e9;
  color: #2e7d32;
}

.arrow {
  font-weight: bold;
  color: #999;
}

.map-empty, .set-empty {
  padding: 20px;
  text-align: center;
  color: #999;
  font-style: italic;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.control-group {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.controls input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
}

.controls button {
  padding: 8px 12px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.controls button:hover {
  background: #2980b9;
}

.controls button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Memory Model стили для WeakMap и WeakSet */
.memory-model {
  margin-bottom: 20px;
}

.memory-title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #3498db;
  text-align: center;
}

.memory-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.memory-subtitle {
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c3e50;
}

.memory-objects {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 200px;
}

.memory-object {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
}

.memory-object:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.memory-object.active {
  border: 2px solid #3498db;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.object-id {
  font-weight: bold;
  margin-bottom: 5px;
  color: #3498db;
}

.object-content {
  font-family: monospace;
  background: #f5f5f5;
  padding: 5px;
  border-radius: 3px;
  margin-bottom: 5px;
}

.refs-count {
  font-size: 0.85rem;
  color: #777;
}

.refs-count span {
  font-weight: bold;
  color: #e74c3c;
}

.add-object-btn {
  padding: 10px;
  background: #e1f5fe;
  color: #0277bd;
  border: 1px dashed #0277bd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  margin-top: 10px;
}

.add-object-btn:hover {
  background: #b3e5fc;
}

.maps-container, .sets-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.normal-map, .weak-map, .normal-set, .weak-set {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px;
  background: white;
}

.memory-map, .memory-set {
  min-height: 120px;
}

.memory-entry, .memory-value {
  font-size: 0.85rem;
}

.memory-controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.gc-button {
  background: #e74c3c;
}

.gc-button:hover {
  background: #c0392b;
}

.hint {
  font-size: 0.85rem;
  color: #777;
  font-style: italic;
  margin-top: 5px;
}

/* Info section styles */
.info-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fff;
}

.description p {
  margin-bottom: 10px;
  line-height: 1.5;
}

.features ul, .pitfalls ul, .use-cases ul {
  padding-left: 20px;
  line-height: 1.5;
}

.features li, .pitfalls li, .use-cases li {
  margin-bottom: 8px;
}

.code-samples {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.code-sample h4 {
  margin-bottom: 5px;
}

.code-sample pre {
  margin: 0;
  padding: 15px;
  background: #2d2d2d;
  color: #f8f8f2;
  border-radius: 4px;
  overflow: auto;
  font-family: monospace;
  font-size: 0.85rem;
  line-height: 1.4;
}

/* Comparison Table Styles */
.comparison-table {
  margin-bottom: 30px;
  overflow-x: auto;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

.comparison-table th {
  background: #f5f5f5;
  padding: 12px;
  text-align: left;
  font-weight: bold;
  border: 1px solid #ddd;
}

.comparison-table td {
  padding: 10px;
  border: 1px solid #ddd;
  vertical-align: top;
}

.comparison-table tr:nth-child(even) {
  background: #f9f9f9;
}

/* Decision Tree Styles */
.decision-tree {
  margin-bottom: 30px;
}

.decision-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.decision-level {
  display: flex;
  gap: 60px;
}

.decision-node {
  width: 250px;
  padding: 15px;
  border: 2px solid #3498db;
  border-radius: 8px;
  background: #e1f5fe;
  text-align: center;
  position: relative;
}

.decision-node.root {
  width: 300px;
  border-color: #2c3e50;
  background: #ecf0f1;
}

.decision-options {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}

.decision-option {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.decision-arrow {
  font-size: 1.5rem;
  color: #95a5a6;
  font-weight: bold;
  margin-bottom: 5px;
}

.decision-label {
  font-size: 0.8rem;
  color: #7f8c8d;
}

.decision-level.results {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
}

.decision-result {
  padding: 15px;
  border: 2px solid #27ae60;
  border-radius: 8px;
  background: #e8f5e9;
  text-align: center;
}

.result-title {
  font-weight: bold;
  margin-bottom: 10px;
  color: #27ae60;
}

.result-desc {
  font-size: 0.85rem;
}

/* Practical Examples */
.example-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.example-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.example-card h4 {
  background: #3498db;
  color: white;
  margin: 0;
  padding: 15px;
}

.card-content {
  padding: 15px;
}

.card-content p {
  margin-bottom: 10px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
}

/* Медиа-запросы для адаптивности */
@media (max-width: 768px) {
  .memory-container {
    grid-template-columns: 1fr;
  }
  
  .decision-level.results {
    grid-template-columns: 1fr 1fr;
  }
  
  .stage-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .decision-level {
    flex-direction: column;
    gap: 20px;
  }
  
  .decision-level.results {
    grid-template-columns: 1fr;
  }
  
  .control-group {
    flex-direction: column;
  }
}
</style>