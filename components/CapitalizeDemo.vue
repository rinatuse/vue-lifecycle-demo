<template>
    <div class="capitalize-tutorial">
      <h1>Функция capitalize: превращаем первые буквы слов в заглавные</h1>
      
      <div class="task-description">
        <div class="task-header">
          <h2>Задача:</h2>
        </div>
        <div class="task-content">
          <p>Написать функцию <code>capitalize(input)</code>, которая возвращает копию строки <code>input</code>, где каждое слово начинается с заглавной буквы.</p>
          <p>"Слово" - это последовательность символов из группы "letters". Слова с дефисами ("что-то", "кто-либо") считаются одним словом.</p>
          <p class="example">Пример: <code>capitalize('А роза упала на лапу Азора') === 'А Роза Упала На Лапу Азора'</code></p>
        </div>
      </div>
      
      <!-- Навигация по разделам -->
      <div class="navigation">
        <button 
          v-for="(section, index) in sections" 
          :key="section.id"
          :class="{ active: currentSection === index }"
          @click="currentSection = index"
        >
          {{ section.title }}
        </button>
      </div>
      
      <!-- Содержимое текущего раздела -->
      <div class="section-content">
        <!-- Раздел 1: Анализ задачи -->
        <div v-if="currentSection === 0" class="section">
          <h2>Анализ задачи</h2>
          
          <div class="analysis">
            <div class="analysis-step">
              <h3>Шаг 1: Понимание требований</h3>
              <p>Нам нужно написать функцию, которая:</p>
              <ul>
                <li>Принимает строку <code>input</code></li>
                <li>Возвращает новую строку, где первая буква каждого слова заглавная</li>
                <li>Остальные буквы в слове должны остаться без изменений</li>
                <li>Слова с дефисами считаются одним словом</li>
              </ul>
            </div>
            
            <div class="analysis-step">
              <h3>Шаг 2: Определение "слова"</h3>
              <p>Слово - это последовательность юникод-символов из группы "letters".</p>
              <div class="examples">
                <p><strong>Примеры слов:</strong> "роза", "Азора", "что-то"</p>
                <p><strong>Не являются словами:</strong> "123", "!", пробелы</p>
              </div>
            </div>
            
            <div class="analysis-step">
              <h3>Шаг 3: Стратегии решения</h3>
              <p>Существует несколько подходов к решению этой задачи:</p>
              <div class="strategies">
                <div class="strategy">
                  <div class="strategy-icon">1</div>
                  <div class="strategy-content">
                    <h4>Разделение строки</h4>
                    <p>Разделить строку на массив слов, обработать каждое слово и соединить обратно.</p>
                    <div class="pros-cons">
                      <div class="pros">
                        <h5>Плюсы:</h5>
                        <ul>
                          <li>Простой и понятный подход</li>
                          <li>Легко реализовать</li>
                        </ul>
                      </div>
                      <div class="cons">
                        <h5>Минусы:</h5>
                        <ul>
                          <li>Сложно сохранить оригинальные пробелы и пунктуацию</li>
                          <li>Не учитывает сложные случаи (например, несколько пробелов)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="strategy">
                  <div class="strategy-icon">2</div>
                  <div class="strategy-content">
                    <h4>Регулярные выражения</h4>
                    <p>Использовать регулярные выражения для поиска слов и замены первой буквы каждого слова.</p>
                    <div class="pros-cons">
                      <div class="pros">
                        <h5>Плюсы:</h5>
                        <ul>
                          <li>Элегантное и компактное решение</li>
                          <li>Можно точно определить, что считать словом</li>
                          <li>Сохраняет оригинальную структуру строки</li>
                        </ul>
                      </div>
                      <div class="cons">
                        <h5>Минусы:</h5>
                        <ul>
                          <li>Регулярные выражения могут быть сложны для чтения</li>
                          <li>Необходимо правильно учесть все языки и символы</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="strategy">
                  <div class="strategy-icon">3</div>
                  <div class="strategy-content">
                    <h4>Итерация по символам</h4>
                    <p>Поочередно проходить по каждому символу строки, отслеживая начало каждого слова.</p>
                    <div class="pros-cons">
                      <div class="pros">
                        <h5>Плюсы:</h5>
                        <ul>
                          <li>Полный контроль над процессом</li>
                          <li>Не требует специальных методов или регулярных выражений</li>
                        </ul>
                      </div>
                      <div class="cons">
                        <h5>Минусы:</h5>
                        <ul>
                          <li>Более многословное решение</li>
                          <li>Сложнее учесть все специальные случаи</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Раздел 2: Решение с регулярными выражениями -->
        <div v-if="currentSection === 1" class="section">
          <h2>Решение с регулярными выражениями</h2>
          
          <div class="solution">
            <p>Мы будем использовать подход с регулярными выражениями, так как он наиболее элегантен и позволяет точно определить, что считать словом.</p>
            
            <div class="algorithm-steps">
              <div class="algorithm-step">
                <h3>Шаг 1: Определить регулярное выражение для поиска слов</h3>
                <p>Нам нужно регулярное выражение, которое найдет все "слова" в строке.</p>
                <div class="code-example">
                  <pre class="code"><code>// Поиск слов, включая слова с дефисами
  const wordRegex = /[A-Za-zА-Яа-я]+-?[A-Za-zА-Яа-я]*/g;</code></pre>
                </div>
                <p>Это выражение будет искать:</p>
                <ul>
                  <li><code>[A-Za-zА-Яа-я]+</code> - одну или более букв латиницы или кириллицы</li>
                  <li><code>-?</code> - необязательный дефис</li>
                  <li><code>[A-Za-zА-Яа-я]*</code> - ноль или более букв после дефиса</li>
                  <li><code>g</code> - глобальный флаг для поиска всех совпадений</li>
                </ul>
              </div>
              
              <div class="algorithm-step">
                <h3>Шаг 2: Заменить каждое найденное слово</h3>
                <p>Используем метод <code>replace</code> для замены каждого найденного слова на то же слово, но с заглавной первой буквой.</p>
                <div class="code-example">
                  <pre class="code"><code>function capitalize(input) {
    return input.replace(/[A-Za-zА-Яа-я]+-?[A-Za-zА-Яа-я]*/g, function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  }</code></pre>
                </div>
                <p>Здесь мы:</p>
                <ol>
                  <li>Ищем все слова в строке с помощью регулярного выражения</li>
                  <li>Для каждого найденного слова вызываем функцию замены</li>
                  <li>Преобразуем первый символ слова в верхний регистр с помощью <code>toUpperCase()</code></li>
                  <li>Добавляем оставшуюся часть слова без изменений с помощью <code>slice(1)</code></li>
                  <li>Заменяем исходное слово на преобразованное</li>
                </ol>
              </div>
            </div>
            
            <div class="improved-solution">
              <h3>Улучшенное решение с поддержкой Unicode</h3>
              <p>Предыдущее решение работает только для латиницы и кириллицы. Для полной поддержки Unicode и более точного определения "слова" используем современные возможности JavaScript:</p>
              <div class="code-example">
                <pre class="code"><code>function capitalize(input) {
    return input.replace(/\p{L}[\p{L}\p{Pd}]*/gu, function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  }</code></pre>
              </div>
              <p>Здесь:</p>
              <ul>
                <li><code>\p{L}</code> - любой Unicode-символ из категории "Letter"</li>
                <li><code>\p{Pd}</code> - любой Unicode-символ из категории "Punctuation, Dash" (включая дефисы)</li>
                <li><code>u</code> - флаг для включения поддержки Unicode в регулярных выражениях</li>
              </ul>
              <div class="note">
                <p><strong>Примечание:</strong> Это решение требует поддержки ECMAScript 2018 или новее, так как использует свойства Unicode в регулярных выражениях.</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Раздел 3: Анимация работы алгоритма -->
        <div v-if="currentSection === 2" class="section">
          <h2>Анимация работы алгоритма</h2>
          
          <div class="animation-container">
            <div class="animation-controls">
              <input 
                v-model="animationInput" 
                placeholder="Введите текст для обработки"
                class="animation-input"
              />
              <button @click="runAnimation" :disabled="isAnimating" class="animation-button">
                {{ isAnimating ? 'Обработка...' : 'Запустить анимацию' }}
              </button>
            </div>
            
            <div class="animation-display">
              <div class="animation-stages">
                <div class="animation-stage">
                  <h3>Исходная строка:</h3>
                  <div class="stage-content" ref="originalString">{{ animationInput }}</div>
                </div>
                
                <div class="animation-stage">
                  <h3>Поиск слов:</h3>
                  <div class="stage-content" ref="highlightWords">{{ animationInput }}</div>
                </div>
                
                <div class="animation-stage">
                  <h3>Результат:</h3>
                  <div class="stage-content" ref="result">{{ animationResult }}</div>
                </div>
              </div>
              
              <div class="animation-explanation">
                <div v-if="animationStep === 0" class="explanation-step">
                  <p>Введите текст и нажмите "Запустить анимацию" для демонстрации работы алгоритма.</p>
                </div>
                <div v-if="animationStep === 1" class="explanation-step">
                  <p>Шаг 1: Анализируем исходную строку.</p>
                </div>
                <div v-if="animationStep === 2" class="explanation-step">
                  <p>Шаг 2: Ищем все слова в строке с помощью регулярного выражения.</p>
                  <pre class="code"><code>const wordRegex = /[A-Za-zА-Яа-я]+-?[A-Za-zА-Яа-я]*/g;</code></pre>
                </div>
                <div v-if="animationStep === 3" class="explanation-step">
                  <p>Шаг 3: Для каждого найденного слова делаем первую букву заглавной.</p>
                  <pre class="code"><code>word.charAt(0).toUpperCase() + word.slice(1)</code></pre>
                </div>
                <div v-if="animationStep === 4" class="explanation-step">
                  <p>Шаг 4: Заменяем исходное слово на преобразованное и получаем результат!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Раздел 4: Подводные камни и ограничения -->
        <div v-if="currentSection === 3" class="section">
          <h2>Подводные камни и ограничения</h2>
          
          <div class="edge-cases">
            <div class="edge-case">
              <h3>1. Разные алфавиты и языки</h3>
              <p>Наше базовое решение работает только с латиницей и кириллицей. Для поддержки других алфавитов нужно использовать свойства Unicode.</p>
              <div class="edge-case-example">
                <div class="example-label">Проблема:</div>
                <div class="example-content">
                  <pre class="code"><code>capitalize("こんにちは世界"); // Не обрабатывает японские символы</code></pre>
                </div>
                <div class="example-label">Решение:</div>
                <div class="example-content">
                  <pre class="code"><code>// Используем \p{L} для поддержки всех букв Unicode
  input.replace(/\p{L}[\p{L}\p{Pd}]*/gu, function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });</code></pre>
                </div>
              </div>
            </div>
            
            <div class="edge-case">
              <h3>2. Составные символы и диакритические знаки</h3>
              <p>В Unicode некоторые символы могут быть представлены как отдельными кодовыми точками, так и составными знаками.</p>
              <div class="edge-case-example">
                <div class="example-label">Проблема:</div>
                <div class="example-content">
                  <pre class="code"><code>capitalize("café"); // Может неправильно обработать 'é'</code></pre>
                </div>
                <div class="example-label">Решение:</div>
                <div class="example-content">
                  <pre class="code"><code>// Используем String.prototype.normalize() для нормализации строки
  function capitalize(input) {
    const normalized = input.normalize('NFC');
    return normalized.replace(/\p{L}[\p{L}\p{Pd}]*/gu, function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  }</code></pre>
                </div>
              </div>
            </div>
            
            <div class="edge-case">
              <h3>3. Апострофы и другие символы в словах</h3>
              <p>В некоторых языках апострофы и другие символы могут быть частью слова (например, "l'hôtel" во французском).</p>
              <div class="edge-case-example">
                <div class="example-label">Проблема:</div>
                <div class="example-content">
                  <pre class="code"><code>capitalize("l'hôtel"); // Может обработать 'l' и 'hôtel' как отдельные слова</code></pre>
                </div>
                <div class="example-label">Решение:</div>
                <div class="example-content">
                  <pre class="code"><code>// Расширяем регулярное выражение для включения апострофов в слова
  function capitalize(input) {
    return input.replace(/\p{L}[\p{L}\p{Pd}']*(?:'\p{L}[\p{L}\p{Pd}']*)*/gu, function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  }</code></pre>
                </div>
              </div>
            </div>
            
            <div class="edge-case">
              <h3>4. Слова с заглавными буквами в середине</h3>
              <p>Например, "iPhone", "MacBook" - обычно такие слова сохраняют свою капитализацию.</p>
              <div class="edge-case-example">
                <div class="example-label">Проблема:</div>
                <div class="example-content">
                  <pre class="code"><code>capitalize("iPhone is great"); // Должно быть "IPhone Is Great" или "iPhone Is Great"?</code></pre>
                </div>
                <div class="example-label">Возможное решение:</div>
                <div class="example-content">
                  <pre class="code"><code>// Сохраняем исходную капитализацию, если она была нестандартной
  function capitalize(input) {
    return input.replace(/\p{L}[\p{L}\p{Pd}]*/gu, function(word) {
      // Проверяем, есть ли заглавные буквы в середине слова
      if (word.slice(1).match(/\p{Lu}/u)) {
        return word; // Сохраняем исходную капитализацию
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  }</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Раздел 5: Применение в реальной жизни -->
        <div v-if="currentSection === 4" class="section">
          <h2>Применение в реальной жизни</h2>
          
          <div class="real-world-applications">
            <div class="application">
              <div class="application-icon">
                <span class="material-icon">📝</span>
              </div>
              <div class="application-content">
                <h3>Форматирование текста</h3>
                <p>Функция <code>capitalize</code> часто используется при форматировании заголовков, названий, имен собственных и других элементов текста, где требуется "Title Case" (каждое слово с заглавной буквы).</p>
                <div class="application-example">
                  <p><strong>Пример:</strong> В блоге или CMS для автоматического форматирования заголовков статей.</p>
                  <pre class="code"><code>// Форматирование заголовка статьи
  const rawTitle = "десять способов улучшить код";
  const formattedTitle = capitalize(rawTitle); // "Десять Способов Улучшить Код"</code></pre>
                </div>
              </div>
            </div>
            
            <div class="application">
              <div class="application-icon">
                <span class="material-icon">👤</span>
              </div>
              <div class="application-content">
                <h3>Обработка пользовательских данных</h3>
                <p>При работе с пользовательскими данными, такими как имена, адреса, часто требуется нормализация регистра.</p>
                <div class="application-example">
                  <p><strong>Пример:</strong> Форматирование имен пользователей при регистрации.</p>
                  <pre class="code"><code>// Форматирование имени и фамилии
  const firstName = userInput.firstName.toLowerCase();
  const lastName = userInput.lastName.toLowerCase();
  const formattedName = capitalize(firstName + " " + lastName);
  // "Иван Иванов" вместо "иван иванов" или "ИВАН ИВАНОВ"</code></pre>
                </div>
              </div>
            </div>
            
            <div class="application">
              <div class="application-icon">
                <span class="material-icon">🔄</span>
              </div>
              <div class="application-content">
                <h3>Трансформация данных</h3>
                <p>При экспорте или импорте данных между системами может потребоваться преобразование регистра для соответствия конвенциям.</p>
                <div class="application-example">
                  <p><strong>Пример:</strong> Преобразование данных из CSV-файла в формат для отображения в UI.</p>
                  <pre class="code"><code>// Преобразование данных для отображения
  const products = csvData.map(item => ({
    ...item,
    displayName: capitalize(item.name),
    category: capitalize(item.category)
  }));</code></pre>
                </div>
              </div>
            </div>
            
            <div class="application">
              <div class="application-icon">
                <span class="material-icon">🌐</span>
              </div>
              <div class="application-content">
                <h3>Локализация и интернационализация</h3>
                <p>При локализации интерфейса на разные языки правила капитализации могут отличаться. Функцию <code>capitalize</code> можно адаптировать под конкретные правила языка.</p>
                <div class="application-example">
                  <p><strong>Пример:</strong> Локализация элементов меню на разные языки.</p>
                  <pre class="code"><code>// Локализация меню на английский
  const englishMenu = menu.map(item => ({
    ...item,
    label: capitalize(translations.en[item.key])
  }));</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Раздел 6: Полное решение -->
        <div v-if="currentSection === 5" class="section">
          <h2>Полное решение</h2>
          
          <div class="final-solution">
            <h3>Базовое решение</h3>
            <div class="code-example">
              <pre class="code"><code>/**
   * Функция capitalize возвращает копию строки input,
   * в которой каждое слово начинается с заглавной буквы.
   *
   * @param {string} input - строка с произвольным предложением
   * @return {string} - строка с заглавной буквой в каждом слове
   */
  function capitalize(input) {
    return input.replace(/[A-Za-zА-Яа-я]+-?[A-Za-zА-Яа-я]*/g, function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  }
  
  // Пример использования
  console.log(capitalize("А роза упала на лапу Азора"));
  // "А Роза Упала На Лапу Азора"
  </code></pre>
            </div>
            
            <h3>Расширенное решение с поддержкой Unicode</h3>
            <div class="code-example">
              <pre class="code"><code>/**
   * Функция capitalize возвращает копию строки input,
   * в которой каждое слово начинается с заглавной буквы.
   * Поддерживает символы Unicode и сложные случаи.
   *
   * @param {string} input - строка с произвольным предложением
   * @return {string} - строка с заглавной буквой в каждом слове
   */
  function capitalize(input) {
    // Нормализуем строку для правильной работы с диакритическими знаками
    const normalized = input.normalize('NFC');
    
    // Используем свойства Unicode для определения "слов"
    return normalized.replace(/\p{L}[\p{L}\p{Pd}]*/gu, function(word) {
      // Проверяем, есть ли заглавные буквы в середине слова (например, "iPhone")
      if (word.slice(1).match(/\p{Lu}/u)) {
        return word; // Сохраняем исходную капитализацию
      }
      
      // Иначе делаем первую букву заглавной, остальные без изменений
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  }
  
  // Тесты
  console.log(capitalize("А роза упала на лапу Азора"));
  // "А Роза Упала На Лапу Азора"
  
  console.log(capitalize("привет, мир! как дела?"));
  // "Привет, Мир! Как Дела?"
  
  console.log(capitalize("что-то кто-либо где-нибудь"));
  // "Что-то Кто-либо Где-нибудь"
  
  console.log(capitalize("iPhone and MacBook are Apple products"));
  // "iPhone And MacBook Are Apple Products"
  
  console.log(capitalize("café résumé über español"));
  // "Café Résumé Über Español"
  </code></pre>
            </div>
            
            <div class="step-by-step-explanation">
              <h3>Пошаговое объяснение решения</h3>
              <ol>
                <li>
                  <strong>Нормализация строки</strong>: Используем <code>normalize('NFC')</code> для правильной обработки составных символов.
                </li>
                <li>
                  <strong>Поиск слов</strong>: Используем регулярное выражение <code>/\p{L}[\p{L}\p{Pd}]*/gu</code>, которое находит:
                  <ul>
                    <li><code>\p{L}</code> - любую букву в юникоде (начало слова)</li>
                    <li><code>[\p{L}\p{Pd}]*</code> - любое количество букв или дефисов после первой буквы</li>
                    <li><code>gu</code> - глобальный поиск с поддержкой юникода</li>
                  </ul>
                </li>
                <li>
                  <strong>Обработка каждого слова</strong>: Для каждого найденного слова:
                  <ul>
                    <li>Проверяем, есть ли заглавные буквы в середине слова</li>
                    <li>Если есть, сохраняем исходную капитализацию</li>
                    <li>Иначе делаем первую букву заглавной с помощью <code>word.charAt(0).toUpperCase()</code></li>
                    <li>Добавляем остальную часть слова без изменений с помощью <code>word.slice(1)</code></li>
                  </ul>
                </li>
                <li>
                  <strong>Возврат результата</strong>: Возвращаем преобразованную строку.
                </li>
              </ol>
            </div>
            
            <div class="algorithm-complexity">
              <h3>Сложность алгоритма</h3>
              <ul>
                <li><strong>Временная сложность</strong>: O(n), где n - длина входной строки.</li>
                <li><strong>Пространственная сложность</strong>: O(n) для хранения результирующей строки.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sections: [
          { id: 'analysis', title: 'Анализ задачи' },
          { id: 'solution', title: 'Решение' },
          { id: 'animation', title: 'Анимация' },
          { id: 'edge-cases', title: 'Подводные камни' },
          { id: 'applications', title: 'Применение' },
          { id: 'complete', title: 'Полное решение' }
        ],
        currentSection: 0,
        animationInput: 'привет, мир! как дела?',
        animationResult: '',
        isAnimating: false,
        animationStep: 0,
        animationTimeout: null
      };
    },
    methods: {
      // Запуск анимации алгоритма
      runAnimation() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.animationStep = 0;
        
        // Сбрасываем предыдущую анимацию
        if (this.animationTimeout) {
          clearTimeout(this.animationTimeout);
        }
        
        this.animationResult = '';
        
        // Шаг 1: Анализ исходной строки
        this.animationStep = 1;
        
        // Шаг 2: Поиск слов
        this.animationTimeout = setTimeout(() => {
          this.animationStep = 2;
          
          // Находим все слова и добавляем подсветку
          const wordRegex = /[A-Za-zА-Яа-я]+-?[A-Za-zА-Яа-я]*/g;
          const highlightedText = this.animationInput.replace(wordRegex, 
            match => `<span class="highlight-word">${match}</span>`
          );
          
          if (this.$refs.highlightWords) {
            this.$refs.highlightWords.innerHTML = highlightedText;
          }
          
          // Шаг 3: Преобразование слов
          this.animationTimeout = setTimeout(() => {
            this.animationStep = 3;
            
            // Находим все слова и добавляем подсветку с капитализацией
            const capitalizedRegex = /[A-Za-zА-Яа-я]+-?[A-Za-zА-Яа-я]*/g;
            const capitalizedText = this.animationInput.replace(capitalizedRegex, 
              match => {
                const capitalized = match.charAt(0).toUpperCase() + match.slice(1);
                return `<span class="highlight-capitalized">${capitalized}</span>`;
              }
            );
            
            if (this.$refs.highlightWords) {
              this.$refs.highlightWords.innerHTML = capitalizedText;
            }
            
            // Шаг 4: Финальный результат
            this.animationTimeout = setTimeout(() => {
              this.animationStep = 4;
              
              // Вычисляем результат капитализации
              this.animationResult = this.animationInput.replace(/[A-Za-zА-Яа-я]+-?[A-Za-zА-Яа-я]*/g, 
                word => word.charAt(0).toUpperCase() + word.slice(1)
              );
              
              // Завершение анимации
              this.animationTimeout = setTimeout(() => {
                this.isAnimating = false;
              }, 1000);
            }, 1500);
          }, 1500);
        }, 1500);
      },
      
      // Простая реализация функции capitalize для тестирования
      capitalizeText(text) {
        return text.replace(/[A-Za-zА-Яа-я]+-?[A-Za-zА-Яа-я]*/g, function(word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        });
      }
    }
  };
  </script>
  
  <style>
  .capitalize-tutorial {
    font-family: Arial, sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    color: black;
    line-height: 1.6;
  }
  
  h1, h2, h3, h4, h5 {
    color: #333;
    margin-top: 1.5em;
    margin-bottom: 0.8em;
  }
  
  h1 {
    font-size: 28px;
    text-align: center;
    border-bottom: 2px solid #4a90e2;
    padding-bottom: 15px;
    margin-bottom: 30px;
  }
  
  h2 {
    font-size: 24px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  
  h3 {
    font-size: 20px;
  }
  
  h4 {
    font-size: 18px;
  }
  
  p {
    margin: 0 0 15px;
  }
  
  code {
    font-family: 'Courier New', monospace;
    background-color: #f5f5f5;
    padding: 2px 5px;
    border-radius: 3px;
    color: #d63031;
    font-size: 0.9em;
  }
  
  pre.code {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
    margin: 15px 0;
    line-height: 1.5;
  }
  
  /* Задача */
  .task-description {
    background-color: #f8f9fa;
    border-left: 5px solid #4a90e2;
    padding: 20px;
    margin-bottom: 30px;
    border-radius: 5px;
  }
  
  .task-header h2 {
    margin-top: 0;
    color: #4a90e2;
    border-bottom: none;
    padding-bottom: 0;
  }
  
  .example {
    font-weight: bold;
    margin-top: 15px;
  }
  
  /* Навигация */
  .navigation {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    overflow-x: auto;
    padding-bottom: 10px;
  }
  
  .navigation button {
    padding: 10px 15px;
    border: 1px solid #ddd;
    background-color: #f5f5f5;
    border-radius: 5px;
    cursor: pointer;
    flex: 1;
    white-space: nowrap;
    margin: 0 5px;
    transition: all 0.3s;
  }
  
  .navigation button:first-child {
    margin-left: 0;
  }
  
  .navigation button:last-child {
    margin-right: 0;
  }
  
  .navigation button:hover {
    background-color: #e9ecef;
  }
  
  .navigation button.active {
    background-color: #4a90e2;
    color: white;
    border-color: #4a90e2;
  }
  
  /* Стратегии решения */
  .strategies {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
  }
  
  .strategy {
    display: flex;
    gap: 15px;
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #eee;
  }
  
  .strategy-icon {
    width: 30px;
    height: 30px;
    background-color: #4a90e2;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  .strategy-content {
    flex: 1;
  }
  
  .strategy-content h4 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .pros-cons {
    display: flex;
    gap: 20px;
    margin-top: 15px;
  }
  
  .pros, .cons {
    flex: 1;
    padding: 15px;
    border-radius: 5px;
  }
  
  .pros {
    background-color: #e8f5e9;
    border-left: 4px solid #4caf50;
  }
  
  .cons {
    background-color: #ffebee;
    border-left: 4px solid #f44336;
  }
  
  .pros h5, .cons h5 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .pros ul, .cons ul {
    margin: 0;
    padding-left: 20px;
  }
  
  /* Анимация */
  .animation-container {
    background-color: #f8f9fa;
    border-radius: 5px;
    padding: 20px;
    margin-top: 20px;
  }
  
  .animation-controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .animation-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .animation-button {
    padding: 10px 20px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .animation-button:hover {
    background-color: #3a7bc8;
  }
  
  .animation-button:disabled {
    background-color: #a1c0ea;
    cursor: not-allowed;
  }
  
  .animation-stages {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .animation-stage {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
  }
  
  .animation-stage h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 16px;
    color: #666;
  }
  
  .stage-content {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 5px;
    min-height: 30px;
    font-family: 'Courier New', monospace;
  }
  
  .highlight-word {
    background-color: #ffeb3b;
    padding: 2px 3px;
    border-radius: 3px;
  }
  
  .highlight-capitalized {
    background-color: #a5d6a7;
    padding: 2px 3px;
    border-radius: 3px;
  }
  
  .animation-explanation {
    background-color: #e3f2fd;
    border-radius: 5px;
    padding: 15px;
    margin-top: 20px;
    min-height: 150px;
  }
  
  .explanation-step {
    animation: fadeIn 0.5s ease;
  }
  
  /* Подводные камни */
  .edge-cases {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .edge-case {
    background-color: #f8f9fa;
    border-radius: 5px;
    padding: 20px;
    border-left: 5px solid #ff9800;
  }
  
  .edge-case h3 {
    margin-top: 0;
    color: #e65100;
  }
  
  .edge-case-example {
    margin-top: 15px;
  }
  
  .example-label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #666;
  }
  
  .example-content {
    margin-bottom: 15px;
  }
  
  .note {
    background-color: #fff8e1;
    padding: 15px;
    border-radius: 5px;
    margin-top: 15px;
  }
  
  /* Применение в реальной жизни */
  .real-world-applications {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .application {
    display: flex;
    gap: 20px;
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 5px;
  }
  
  .application-icon {
    width: 60px;
    height: 60px;
    background-color: #e3f2fd;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .material-icon {
    font-size: 30px;
  }
  
  .application-content {
    flex: 1;
  }
  
  .application-content h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #1e88e5;
  }
  
  .application-example {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 5px;
    margin-top: 15px;
  }
  
  /* Полное решение */
  .final-solution {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 5px;
  }
  
  .step-by-step-explanation {
    margin-top: 30px;
  }
  
  .algorithm-complexity {
    margin-top: 30px;
    background-color: #e8f5e9;
    padding: 15px;
    border-radius: 5px;
  }
  
  /* Анимации */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Медиа-запросы для мобильных устройств */
  @media (max-width: 768px) {
    .navigation {
      flex-wrap: wrap;
    }
    
    .navigation button {
      flex: none;
      margin-bottom: 10px;
    }
    
    .pros-cons {
      flex-direction: column;
    }
    
    .application {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .strategy {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
  </style>