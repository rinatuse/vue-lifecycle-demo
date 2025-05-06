<template>
    <div class="anagram-explorer">
      <h1>Проверка на анаграммы: объяснение алгоритмов</h1>
      
      <div class="intro-section">
        <h2>Что такое анаграмма?</h2>
        <p>
          <strong>Анаграмма</strong> — это слово или фраза, образованная путем перестановки букв другого слова или фразы, 
          используя при этом каждую букву исходного слова ровно один раз.
        </p>
        <div class="examples">
          <div class="example correct">
            <div class="word">finder</div>
            <div class="arrow">⟺</div>
            <div class="word">friend</div>
            <div class="status">Анаграммы</div>
          </div>
          <div class="example incorrect">
            <div class="word">test</div>
            <div class="arrow">≠</div>
            <div class="word">sets</div>
            <div class="status">Не анаграммы</div>
          </div>
        </div>
      </div>
  
      <div class="conditions-section">
        <h2>Условия для анаграмм</h2>
        <p>Для того чтобы две строки были анаграммами, они должны:</p>
        <ul>
          <li>Иметь одинаковую длину</li>
          <li>Содержать одни и те же символы</li>
          <li>Иметь одинаковое количество каждого символа</li>
        </ul>
        <p>
          Давайте рассмотрим примеры из условия задачи:
        </p>
        <div class="examples-table">
          <div class="example-row header">
            <div>Пример</div>
            <div>Пояснение</div>
            <div>Результат</div>
          </div>
          <div class="example-row">
            <div>
              <code>isAnagram("finder", "friend")</code>
            </div>
            <div>
              Оба слова содержат: f, i, e, n, d, r (по одному разу)
            </div>
            <div class="result true">true</div>
          </div>
          <div class="example-row">
            <div>
              <code>isAnagram("test", "sets")</code>
            </div>
            <div>
              "test" содержит две буквы "t", а "sets" только одну
            </div>
            <div class="result false">false</div>
          </div>
          <div class="example-row">
            <div>
              <code>isAnagram("abc", "aaa")</code>
            </div>
            <div>
              Разные наборы букв: в первом есть b и c, а во втором нет
            </div>
            <div class="result false">false</div>
          </div>
          <div class="example-row">
            <div>
              <code>isAnagram("abb", "aab")</code>
            </div>
            <div>
              "abb" содержит "a" один раз и "b" два раза<br>
              "aab" содержит "a" два раза и "b" один раз
            </div>
            <div class="result false">false</div>
          </div>
        </div>
      </div>
  
      <div class="algorithms-section">
        <h2>Алгоритмы решения</h2>
        
        <div class="algorithm-selector">
          <button 
            v-for="(algo, index) in algorithms" 
            :key="algo.id"
            :class="{ active: currentAlgorithm === index }"
            @click="selectAlgorithm(index)"
          >
            {{ algo.name }}
          </button>
        </div>
        
        <div class="algorithm-container">
          <h3>{{ algorithms[currentAlgorithm].name }}</h3>
          <div class="algorithm-description">
            <p>{{ algorithms[currentAlgorithm].description }}</p>
          </div>
          
          <div class="complexity-info">
            <div class="complexity">
              <div class="complexity-title">Временная сложность:</div>
              <div class="complexity-value">{{ algorithms[currentAlgorithm].timeComplexity }}</div>
            </div>
            <div class="complexity">
              <div class="complexity-title">Пространственная сложность:</div>
              <div class="complexity-value">{{ algorithms[currentAlgorithm].spaceComplexity }}</div>
            </div>
          </div>
          
          <div class="code-block">
            <pre><code>{{ algorithms[currentAlgorithm].code }}</code></pre>
          </div>
          
          <div class="algorithm-demo">
            <div class="input-section">
              <div class="input-group">
                <label for="first-string">Первая строка:</label>
                <input 
                  id="first-string" 
                  type="text" 
                  v-model="firstString" 
                  placeholder="например, finder"
                  :disabled="isAnimating"
                />
              </div>
              <div class="input-group">
                <label for="second-string">Вторая строка:</label>
                <input 
                  id="second-string" 
                  type="text" 
                  v-model="secondString" 
                  placeholder="например, friend"
                  :disabled="isAnimating"
                />
              </div>
              <button 
                class="check-button" 
                @click="startDemo" 
                :disabled="isAnimating || !firstString || !secondString"
              >
                {{ isAnimating ? 'Выполняется...' : 'Проверить' }}
              </button>
            </div>
            
            <div v-if="animationStarted" class="animation-container">
              <transition name="fade">
                <div v-if="animationStep === 0" class="animation-step">
                  <div class="step-title">Предварительная проверка длины строк</div>
                  <div class="length-check">
                    <div class="string-length">
                      <div class="string-display">{{ firstString }}</div>
                      <div class="length">Длина: {{ firstString.length }}</div>
                    </div>
                    <div class="comparison">
                      {{ firstString.length === secondString.length ? '=' : '≠' }}
                    </div>
                    <div class="string-length">
                      <div class="string-display">{{ secondString }}</div>
                      <div class="length">Длина: {{ secondString.length }}</div>
                    </div>
                  </div>
                  <div class="step-result" :class="{ 'error': firstString.length !== secondString.length }">
                    {{ firstString.length === secondString.length 
                      ? 'Длины строк одинаковы, продолжаем проверку' 
                      : 'Длины строк различаются. Это не анаграммы!' }}
                  </div>
                </div>
              </transition>
              
              <transition name="fade">
                <div v-if="currentAlgorithm === 0 && animationStep === 1" class="animation-step">
                  <div class="step-title">Сортировка строк</div>
                  <div class="sort-visualization">
                    <div class="string-transform">
                      <div class="original">{{ firstString }}</div>
                      <div class="arrow">→</div>
                      <div class="sorted">{{ sortString(firstString) }}</div>
                    </div>
                    <div class="string-transform">
                      <div class="original">{{ secondString }}</div>
                      <div class="arrow">→</div>
                      <div class="sorted">{{ sortString(secondString) }}</div>
                    </div>
                  </div>
                </div>
              </transition>
              
              <transition name="fade">
                <div v-if="currentAlgorithm === 0 && animationStep === 2" class="animation-step">
                  <div class="step-title">Сравнение отсортированных строк</div>
                  <div class="comparison-visualization">
                    <div class="sorted-string">{{ sortString(firstString) }}</div>
                    <div class="comparison-result">
                      {{ sortString(firstString) === sortString(secondString) ? '=' : '≠' }}
                    </div>
                    <div class="sorted-string">{{ sortString(secondString) }}</div>
                  </div>
                  <div class="final-result" :class="{ 'success': isAnagramSortMethod(), 'error': !isAnagramSortMethod() }">
                    {{ isAnagramSortMethod() 
                      ? 'Отсортированные строки идентичны! Это анаграммы.' 
                      : 'Отсортированные строки различаются. Это не анаграммы!' }}
                  </div>
                </div>
              </transition>
              
              <transition name="fade">
                <div v-if="currentAlgorithm === 1 && animationStep === 1" class="animation-step">
                  <div class="step-title">Создание счетчиков символов</div>
                  <div class="counters-visualization">
                    <div class="counter-object">
                      <div class="counter-title">Счетчик для "{{ firstString }}"</div>
                      <div class="counter-content">
                        <div 
                          v-for="(count, char) in getCharCounts(firstString)" 
                          :key="'first-' + char" 
                          class="char-count"
                        >
                          <div class="char">{{ char }}</div>
                          <div class="count">{{ count }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="counter-object">
                      <div class="counter-title">Счетчик для "{{ secondString }}"</div>
                      <div class="counter-content">
                        <div 
                          v-for="(count, char) in getCharCounts(secondString)" 
                          :key="'second-' + char" 
                          class="char-count"
                        >
                          <div class="char">{{ char }}</div>
                          <div class="count">{{ count }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
              
              <transition name="fade">
                <div v-if="currentAlgorithm === 1 && animationStep === 2" class="animation-step">
                  <div class="step-title">Сравнение счетчиков</div>
                  <div class="counters-comparison">
                    <div 
                      v-for="char in getAllChars()" 
                      :key="char"
                      class="char-comparison"
                      :class="{ 
                        'diff': getCharCounts(firstString)[char] !== getCharCounts(secondString)[char] 
                      }"
                    >
                      <div class="char">{{ char }}</div>
                      <div class="first-count">{{ getCharCounts(firstString)[char] || 0 }}</div>
                      <div class="comparison-sign">
                        {{ (getCharCounts(firstString)[char] || 0) === (getCharCounts(secondString)[char] || 0) ? '=' : '≠' }}
                      </div>
                      <div class="second-count">{{ getCharCounts(secondString)[char] || 0 }}</div>
                    </div>
                  </div>
                  <div class="final-result" :class="{ 'success': isAnagramCountMethod(), 'error': !isAnagramCountMethod() }">
                    {{ isAnagramCountMethod() 
                      ? 'Счетчики символов идентичны! Это анаграммы.' 
                      : 'Счетчики символов различаются. Это не анаграммы!' }}
                  </div>
                </div>
              </transition>
              
              <transition name="fade">
                <div v-if="currentAlgorithm === 2 && animationStep === 1" class="animation-step">
                  <div class="step-title">Создание единого счетчика</div>
                  <div class="combined-counter-animation">
                    <div class="counter-object">
                      <div class="counter-title">Единый счетчик</div>
                      <div class="counter-content">
                        <div class="step-description">
                          1. Увеличиваем счетчик для каждого символа из "{{ firstString }}"
                        </div>
                        <div class="counter-updates">
                          <div 
                            v-for="(char, index) in firstString.split('')" 
                            :key="'inc-' + index"
                            class="counter-update"
                          >
                            <div class="char">{{ char }}</div>
                            <div class="operation">+1</div>
                          </div>
                        </div>
                        <div class="intermediate-counter">
                          <div 
                            v-for="(count, char) in getCharCounts(firstString)" 
                            :key="'single-' + char" 
                            class="char-count"
                          >
                            <div class="char">{{ char }}</div>
                            <div class="count">{{ count }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
              
              <transition name="fade">
                <div v-if="currentAlgorithm === 2 && animationStep === 2" class="animation-step">
                  <div class="step-title">Обновление счетчика для второй строки</div>
                  <div class="combined-counter-animation">
                    <div class="counter-object">
                      <div class="counter-title">Единый счетчик</div>
                      <div class="counter-content">
                        <div class="step-description">
                          2. Уменьшаем счетчик для каждого символа из "{{ secondString }}"
                        </div>
                        <div class="counter-updates">
                          <div 
                            v-for="(char, index) in secondString.split('')" 
                            :key="'dec-' + index"
                            class="counter-update"
                          >
                            <div class="char">{{ char }}</div>
                            <div class="operation">-1</div>
                          </div>
                        </div>
                        <div class="final-counter">
                          <div 
                            v-for="(value, char) in getSingleCounter()" 
                            :key="'final-' + char" 
                            class="char-count"
                            :class="{ 'non-zero': value !== 0 }"
                          >
                            <div class="char">{{ char }}</div>
                            <div class="count">{{ value }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
              
              <transition name="fade">
                <div v-if="currentAlgorithm === 2 && animationStep === 3" class="animation-step">
                  <div class="step-title">Финальная проверка</div>
                  <div class="check-zeros">
                    <div class="check-description">
                      Проверяем, равны ли все значения счетчика нулю
                    </div>
                    <div class="zero-check-result">
                      {{ Object.values(getSingleCounter()).every(v => v === 0) 
                        ? 'Все значения равны нулю ✓' 
                        : 'Не все значения равны нулю ✗' }}
                    </div>
                  </div>
                  <div class="final-result" :class="{ 'success': isAnagramSingleCounterMethod(), 'error': !isAnagramSingleCounterMethod() }">
                    {{ isAnagramSingleCounterMethod() 
                      ? 'Все значения счетчика равны нулю! Это анаграммы.' 
                      : 'Не все значения счетчика равны нулю. Это не анаграммы!' }}
                  </div>
                </div>
              </transition>
              
              <transition name="fade">
                <div v-if="currentAlgorithm === 3 && animationStep === 1" class="animation-step">
                  <div class="step-title">Расчет хеш-суммы для обеих строк</div>
                  <div class="hash-visualization">
                    <div class="string-hash">
                      <div class="string-display">{{ firstString }}</div>
                      <div class="hash-calculation">
                        <div class="hash-formula">Сумма кодов символов:</div>
                        <div class="hash-steps">
                          <span v-for="(char, index) in firstString" :key="'first-hash-' + index">
                            {{ char.charCodeAt(0) }}{{ index < firstString.length - 1 ? ' + ' : '' }}
                          </span>
                        </div>
                        <div class="hash-result">= {{ getStringHash(firstString) }}</div>
                      </div>
                    </div>
                    <div class="string-hash">
                      <div class="string-display">{{ secondString }}</div>
                      <div class="hash-calculation">
                        <div class="hash-formula">Сумма кодов символов:</div>
                        <div class="hash-steps">
                          <span v-for="(char, index) in secondString" :key="'second-hash-' + index">
                            {{ char.charCodeAt(0) }}{{ index < secondString.length - 1 ? ' + ' : '' }}
                          </span>
                        </div>
                        <div class="hash-result">= {{ getStringHash(secondString) }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
              
              <transition name="fade">
                <div v-if="currentAlgorithm === 3 && animationStep === 2" class="animation-step">
                  <div class="step-title">Проверка произведения кодов символов</div>
                  <div class="hash-visualization">
                    <div class="string-hash">
                      <div class="string-display">{{ firstString }}</div>
                      <div class="hash-calculation">
                        <div class="hash-formula">Произведение кодов символов:</div>
                        <div class="hash-steps">
                          <span v-for="(char, index) in firstString" :key="'first-prod-' + index">
                            {{ char.charCodeAt(0) }}{{ index < firstString.length - 1 ? ' × ' : '' }}
                          </span>
                        </div>
                        <div class="hash-result">= {{ getStringHashProduct(firstString) }}</div>
                      </div>
                    </div>
                    <div class="string-hash">
                      <div class="string-display">{{ secondString }}</div>
                      <div class="hash-calculation">
                        <div class="hash-formula">Произведение кодов символов:</div>
                        <div class="hash-steps">
                          <span v-for="(char, index) in secondString" :key="'second-prod-' + index">
                            {{ char.charCodeAt(0) }}{{ index < secondString.length - 1 ? ' × ' : '' }}
                          </span>
                        </div>
                        <div class="hash-result">= {{ getStringHashProduct(secondString) }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
              
              <transition name="fade">
                <div v-if="currentAlgorithm === 3 && animationStep === 3" class="animation-step">
                  <div class="step-title">Сравнение хеш-сумм</div>
                  <div class="hash-comparison">
                    <div class="compare-sums">
                      <div class="sum-title">Сравнение сумм:</div>
                      <div class="sum-values">
                        {{ getStringHash(firstString) }} 
                        {{ getStringHash(firstString) === getStringHash(secondString) ? '=' : '≠' }} 
                        {{ getStringHash(secondString) }}
                      </div>
                    </div>
                    <div class="compare-products">
                      <div class="product-title">Сравнение произведений:</div>
                      <div class="product-values">
                        {{ getStringHashProduct(firstString) }} 
                        {{ getStringHashProduct(firstString) === getStringHashProduct(secondString) ? '=' : '≠' }} 
                        {{ getStringHashProduct(secondString) }}
                      </div>
                    </div>
                  </div>
                  <div class="final-result" :class="{ 'success': isAnagramHashMethod(), 'error': !isAnagramHashMethod() }">
                    {{ isAnagramHashMethod() 
                      ? 'Хеш-суммы совпадают! Это анаграммы.' 
                      : 'Хеш-суммы различаются. Это не анаграммы!' }}
                  </div>
                  <div class="warning-note" v-if="isAnagramHashMethod() !== isAnagramSortMethod()">
                    <strong>Внимание!</strong> Метод хеширования может давать ложноположительные результаты в некоторых случаях.
                    Для точной проверки лучше использовать другие методы.
                  </div>
                </div>
              </transition>
              
              <div class="animation-controls" v-if="animationStep < getMaxSteps()">
                <button @click="nextStep" class="next-button">
                  Следующий шаг →
                </button>
              </div>
              
              <div class="animation-reset" v-if="animationStep >= getMaxSteps()">
                <button @click="resetDemo" class="reset-button">
                  Начать заново
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="pitfalls-section">
        <h2>Подводные камни и оптимизации</h2>
        <div class="pitfalls-list">
          <div class="pitfall">
            <h3>1. Регистр символов</h3>
            <p>
              По умолчанию, строки "Hello" и "hello" не будут считаться анаграммами из-за разного регистра букв.
              Если регистр не важен, нужно привести строки к одному регистру перед проверкой.
            </p>
            <div class="code-snippet">
              <pre><code>function isAnagram(first, second) {
    // Приводим к нижнему регистру
    first = first.toLowerCase();
    second = second.toLowerCase();
    
    // Дальнейшая проверка...
  }</code></pre>
            </div>
          </div>
          
          <div class="pitfall">
            <h3>2. Пробелы и знаки препинания</h3>
            <p>
              В некоторых определениях анаграмм пробелы и знаки препинания игнорируются.
              Например, "A decimal point" и "I'm a dot in place" могут считаться анаграммами.
            </p>
            <div class="code-snippet">
              <pre><code>function isAnagram(first, second) {
    // Удаляем все, кроме букв и цифр
    const cleanFirst = first.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const cleanSecond = second.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    // Дальнейшая проверка...
  }</code></pre>
            </div>
          </div>
          
          <div class="pitfall">
            <h3>3. Юникод и многобайтовые символы</h3>
            <p>
              При работе с многобайтовыми символами (эмодзи, символы многих языков) нужно быть осторожным при индексации строк.
              JavaScript строки используют UTF-16 кодирование, и некоторые символы могут занимать более одной единицы.
            </p>
            <div class="code-snippet">
              <pre><code>function isAnagram(first, second) {
    // Безопасное преобразование в массив символов для юникода
    const firstChars = Array.from(first);
    const secondChars = Array.from(second);
    
    // Дальнейшая проверка...
  }</code></pre>
            </div>
          </div>
          
          <div class="pitfall">
            <h3>4. Ложноположительные результаты при хешировании</h3>
            <p>
              Метод хеширования (суммы и произведения символов) может давать ложноположительные результаты,
              когда разные строки случайно дают одинаковые хеш-значения. Это называется коллизией хешей.
            </p>
            <div class="example-collision">
              <div>Например, строки "aas" и "bbn" могут иметь одинаковую сумму и произведение кодов,
              но очевидно, что они не являются анаграммами.</div>
            </div>
          </div>
          
          <div class="pitfall">
            <h3>5. Оптимизация для длинных строк</h3>
            <p>
              Для очень длинных строк метод с одним счетчиком может быть наиболее эффективным,
              так как он требует только одного прохода по каждой строке.
            </p>
          </div>
        </div>
      </div>
      
      <div class="recommendations-section">
        <h2>Рекомендации по выбору алгоритма</h2>
        <div class="recommendations">
          <div class="recommendation">
            <h3>Для простых задач и собеседований</h3>
            <p>
              Метод с сортировкой — самый простой для объяснения и реализации. Достаточно одной строки кода,
              но он не самый эффективный из-за сложности сортировки O(n log n).
            </p>
          </div>
          
          <div class="recommendation">
            <h3>Для оптимальной производительности</h3>
            <p>
              Метод с одним счетчиком символов — лучший выбор для большинства случаев.
              Он имеет линейную сложность O(n) и требует минимального дополнительного пространства.
            </p>
          </div>
          
          <div class="recommendation">
            <h3>Для обработки больших данных</h3>
            <p>
              Если нужно проверить миллионы пар строк, можно сначала использовать быструю проверку с хешированием
              как фильтр, а затем применить точный метод для проверки потенциальных совпадений.
            </p>
          </div>
        </div>
      </div>
      
      <div class="conclusion-section">
        <h2>Заключение</h2>
        <p>
          Мы рассмотрели четыре основных алгоритма проверки на анаграммы:
        </p>
        <ul>
          <li><strong>Метод сортировки</strong> — простой, но не самый эффективный (O(n log n))</li>
          <li><strong>Метод с двумя счетчиками</strong> — эффективный, но требует чуть больше кода (O(n))</li>
          <li><strong>Метод с одним счетчиком</strong> — наиболее сбалансированный подход (O(n))</li>
          <li><strong>Метод хеширования</strong> — быстрый, но с риском ложноположительных результатов (O(n))</li>
        </ul>
        <p>
          Для большинства практических задач рекомендуется использовать метод с одним счетчиком,
          так как он сочетает в себе оптимальную производительность и надежность.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        algorithms: [
          {
            id: 'sort',
            name: 'Алгоритм сортировки',
            description: 'Этот алгоритм сортирует символы обеих строк и сравнивает результаты. Если отсортированные строки идентичны, значит строки являются анаграммами.',
            timeComplexity: 'O(n log n) — из-за сортировки',
            spaceComplexity: 'O(n) — для хранения отсортированных строк',
            code: `function isAnagram(first, second) {
    // Проверка на равенство длин
    if (first.length !== second.length) {
      return false;
    }
    
    // Сортировка строк и сравнение
    const sortedFirst = first.split('').sort().join('');
    const sortedSecond = second.split('').sort().join('');
    
    return sortedFirst === sortedSecond;
  }`
          },
          {
            id: 'counters',
            name: 'Алгоритм с двумя счетчиками',
            description: 'Этот алгоритм создает два счетчика символов (объекта/Map/массива) и сравнивает их. Каждый счетчик хранит количество вхождений каждого символа.',
            timeComplexity: 'O(n) — один проход по каждой строке',
            spaceComplexity: 'O(k) — где k это количество уникальных символов',
            code: `function isAnagram(first, second) {
    // Проверка на равенство длин
    if (first.length !== second.length) {
      return false;
    }
    
    // Создаем счетчики символов
    const firstCounts = {};
    const secondCounts = {};
    
    // Заполняем первый счетчик
    for (let char of first) {
      firstCounts[char] = (firstCounts[char] || 0) + 1;
    }
    
    // Заполняем второй счетчик
    for (let char of second) {
      secondCounts[char] = (secondCounts[char] || 0) + 1;
    }
    
    // Сравниваем счетчики
    for (let char in firstCounts) {
      if (firstCounts[char] !== secondCounts[char]) {
        return false;
      }
    }
    
    return true;
  }`
          },
          {
            id: 'single-counter',
            name: 'Алгоритм с одним счетчиком',
            description: 'Этот алгоритм использует только один счетчик. Для первой строки увеличиваем счетчик, для второй — уменьшаем. В конце все значения должны быть равны нулю.',
            timeComplexity: 'O(n) — один проход по каждой строке',
            spaceComplexity: 'O(k) — где k это количество уникальных символов',
            code: `function isAnagram(first, second) {
    // Проверка на равенство длин
    if (first.length !== second.length) {
      return false;
    }
    
    // Создаем один счетчик символов
    const counts = {};
    
    // Увеличиваем счетчик для символов первой строки
    for (let char of first) {
      counts[char] = (counts[char] || 0) + 1;
    }
    
    // Уменьшаем счетчик для символов второй строки
    for (let char of second) {
      // Если символа нет в счетчике или его значение уже 0,
      // то строки не могут быть анаграммами
      if (!counts[char]) {
        return false;
      }
      counts[char]--;
    }
    
    // Все значения должны быть равны 0
    return Object.values(counts).every(count => count === 0);
  }`
          },
          {
            id: 'hash',
            name: 'Алгоритм хеширования',
            description: 'Этот алгоритм вычисляет "хеш" для каждой строки, используя сумму и произведение кодов символов. Если хеши совпадают, строки могут быть анаграммами.',
            timeComplexity: 'O(n) — один проход по каждой строке',
            spaceComplexity: 'O(1) — постоянное пространство',
            code: `function isAnagram(first, second) {
    // Проверка на равенство длин
    if (first.length !== second.length) {
      return false;
    }
    
    // Вычисляем сумму и произведение кодов символов
    let sumFirst = 0, prodFirst = 1;
    let sumSecond = 0, prodSecond = 1;
    
    for (let i = 0; i < first.length; i++) {
      const charCodeFirst = first.charCodeAt(i);
      const charCodeSecond = second.charCodeAt(i);
      
      sumFirst += charCodeFirst;
      sumSecond += charCodeSecond;
      
      prodFirst *= charCodeFirst;
      prodSecond *= charCodeSecond;
    }
    
    // Если суммы и произведения равны, строки могут быть анаграммами
    return sumFirst === sumSecond && prodFirst === prodSecond;
    
    // Внимание: этот метод может давать ложноположительные результаты!
    // Для абсолютно точной проверки рекомендуется использовать другие методы.
  }`
          }
        ],
        currentAlgorithm: 0,
        firstString: '',
        secondString: '',
        isAnimating: false,
        animationStarted: false,
        animationStep: 0
      };
    },
    methods: {
      selectAlgorithm(index) {
        this.currentAlgorithm = index;
        this.resetDemo();
      },
      startDemo() {
        this.isAnimating = true;
        this.animationStarted = true;
        this.animationStep = 0;
      },
      nextStep() {
        if (this.animationStep < this.getMaxSteps()) {
          this.animationStep++;
        }
      },
      resetDemo() {
        this.isAnimating = false;
        this.animationStarted = false;
        this.animationStep = 0;
      },
      getMaxSteps() {
        // Возвращает максимальное количество шагов для текущего алгоритма
        switch(this.currentAlgorithm) {
          case 0: return 2; // Сортировка: проверка длины + сортировка + сравнение
          case 1: return 2; // Два счетчика: проверка длины + создание счетчиков + сравнение
          case 2: return 3; // Один счетчик: проверка длины + увеличение + уменьшение + проверка
          case 3: return 3; // Хеширование: проверка длины + хеширование + сравнение
          default: return 1;
        }
      },
      sortString(str) {
        return str.split('').sort().join('');
      },
      getCharCounts(str) {
        const counts = {};
        for (const char of str) {
          counts[char] = (counts[char] || 0) + 1;
        }
        return counts;
      },
      getAllChars() {
        // Возвращает все уникальные символы из обеих строк
        const chars = new Set([...this.firstString, ...this.secondString]);
        return [...chars].sort();
      },
      getSingleCounter() {
        // Создаем один счетчик, увеличивая для первой строки и уменьшая для второй
        const counts = {};
        
        // Увеличиваем для первой строки
        for (const char of this.firstString) {
          counts[char] = (counts[char] || 0) + 1;
        }
        
        // Уменьшаем для второй строки
        for (const char of this.secondString) {
          counts[char] = (counts[char] || 0) - 1;
        }
        
        return counts;
      },
      getStringHash(str) {
        // Вычисляет сумму кодов символов строки
        let sum = 0;
        for (let i = 0; i < str.length; i++) {
          sum += str.charCodeAt(i);
        }
        return sum;
      },
      getStringHashProduct(str) {
        // Вычисляет произведение кодов символов строки
        let product = 1;
        for (let i = 0; i < str.length; i++) {
          product *= str.charCodeAt(i);
        }
        return product;
      },
      isAnagramSortMethod() {
        // Проверка по методу сортировки
        if (this.firstString.length !== this.secondString.length) {
          return false;
        }
        return this.sortString(this.firstString) === this.sortString(this.secondString);
      },
      isAnagramCountMethod() {
        // Проверка по методу двух счетчиков
        if (this.firstString.length !== this.secondString.length) {
          return false;
        }
        
        const firstCounts = this.getCharCounts(this.firstString);
        const secondCounts = this.getCharCounts(this.secondString);
        
        // Сравниваем счетчики
        for (const char in firstCounts) {
          if (firstCounts[char] !== secondCounts[char]) {
            return false;
          }
        }
        
        return true;
      },
      isAnagramSingleCounterMethod() {
        // Проверка по методу одного счетчика
        if (this.firstString.length !== this.secondString.length) {
          return false;
        }
        
        const counts = this.getSingleCounter();
        return Object.values(counts).every(count => count === 0);
      },
      isAnagramHashMethod() {
        // Проверка по методу хеширования
        if (this.firstString.length !== this.secondString.length) {
          return false;
        }
        
        const sumFirst = this.getStringHash(this.firstString);
        const sumSecond = this.getStringHash(this.secondString);
        
        const prodFirst = this.getStringHashProduct(this.firstString);
        const prodSecond = this.getStringHashProduct(this.secondString);
        
        return sumFirst === sumSecond && prodFirst === prodSecond;
      }
    }
  };
  </script>
  
  <style scoped>
  .anagram-explorer {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #333;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    line-height: 1.6;
  }
  
  h1, h2, h3 {
    color: #2c3e50;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 28px;
  }
  
  h2 {
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-top: 40px;
    font-size: 24px;
  }
  
  h3 {
    margin-top: 20px;
    font-size: 18px;
  }
  
  p {
    margin-bottom: 15px;
  }
  
  code {
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    background-color: #f5f5f5;
    padding: 2px 5px;
    border-radius: 3px;
    color: #e74c3c;
  }
  
  pre {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
    margin: 15px 0;
  }
  
  pre code {
    background-color: transparent;
    padding: 0;
  }
  
  /* Intro section */
  .intro-section {
    margin-bottom: 30px;
  }
  
  .examples {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 20px;
  }
  
  .example {
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 8px;
    background-color: #f8f9fa;
  }
  
  .example.correct {
    border: 2px solid #2ecc71;
  }
  
  .example.incorrect {
    border: 2px solid #e74c3c;
  }
  
  .word {
    font-size: 18px;
    font-weight: bold;
    padding: 5px 10px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .arrow {
    margin: 0 10px;
    font-size: 24px;
    color: #7f8c8d;
  }
  
  .status {
    margin-left: 10px;
    font-weight: bold;
  }
  
  .example.correct .status {
    color: #2ecc71;
  }
  
  .example.incorrect .status {
    color: #e74c3c;
  }
  
  /* Conditions section */
  .examples-table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
  }
  
  .example-row {
    display: grid;
    grid-template-columns: 1fr 2fr 0.5fr;
    border-bottom: 1px solid #eee;
  }
  
  .example-row.header {
    background-color: #f5f5f5;
    font-weight: bold;
  }
  
  .example-row > div {
    padding: 10px;
  }
  
  .result {
    font-weight: bold;
    text-align: center;
  }
  
  .result.true {
    color: #2ecc71;
  }
  
  .result.false {
    color: #e74c3c;
  }
  
  /* Algorithm section */
  .algorithm-selector {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .algorithm-selector button {
    padding: 10px 15px;
    border: none;
    background-color: #f5f5f5;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .algorithm-selector button:hover {
    background-color: #e0e0e0;
  }
  
  .algorithm-selector button.active {
    background-color: #3498db;
    color: white;
  }
  
  .algorithm-container {
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .algorithm-description {
    margin-bottom: 20px;
  }
  
  .complexity-info {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .complexity {
    flex: 1;
    padding: 10px;
    background-color: #e9f7fe;
    border-radius: 5px;
  }
  
  .complexity-title {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .complexity-value {
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    color: #0056b3;
  }
  
  .code-block {
    background-color: #2d2d2d;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .code-block pre {
    background-color: transparent;
    padding: 20px;
    color: #f8f8f2;
    margin: 0;
  }
  
  .code-block code {
    background-color: transparent;
    color: #f8f8f2;
  }
  
  /* Animation and demo */
  .input-section {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .input-group {
    flex: 1;
    min-width: 200px;
  }
  
  .input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .input-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .check-button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 16px;
    margin-top: 25px;
  }
  
  .check-button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .check-button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .animation-container {
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
  }
  
  .animation-step {
    margin-bottom: 20px;
  }
  
  .step-title {
    font-weight: bold;
    margin-bottom: 15px;
    padding: 10px;
    background-color: #f1f8ff;
    border-left: 4px solid #3498db;
    border-radius: 0 5px 5px 0;
  }
  
  .length-check {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .string-length {
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 8px;
    text-align: center;
  }
  
  .string-display {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .comparison {
    font-size: 24px;
    font-weight: bold;
  }
  
  .step-result {
    text-align: center;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
  }
  
  .step-result.error {
    background-color: #fce4e4;
    color: #e74c3c;
  }
  
  .sort-visualization {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  
  .string-transform {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .original, .sorted {
    padding: 10px 15px;
    background-color: #f5f5f5;
    border-radius: 5px;
    font-family: monospace;
    min-width: 100px;
    text-align: center;
    letter-spacing: 2px;
  }
  
  .sorted {
    background-color: #e9f7fe;
    color: #0056b3;
  }
  
  .comparison-visualization {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .sorted-string {
    padding: 10px 20px;
    background-color: #e9f7fe;
    border-radius: 5px;
    font-family: monospace;
    letter-spacing: 2px;
  }
  
  .comparison-result {
    font-size: 24px;
    font-weight: bold;
  }
  
  .final-result {
    text-align: center;
    padding: 15px;
    border-radius: 8px;
    font-weight: bold;
    margin-top: 20px;
  }
  
  .final-result.success {
    background-color: #d5f5e3;
    color: #27ae60;
  }
  
  .final-result.error {
    background-color: #fce4e4;
    color: #e74c3c;
  }
  
  .counters-visualization {
    display: flex;
    justify-content: space-around;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .counter-object {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    min-width: 200px;
    flex: 1;
  }
  
  .counter-title {
    background-color: #f5f5f5;
    padding: 10px;
    font-weight: bold;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
  
  .counter-content {
    padding: 15px;
  }
  
  .char-count {
    display: flex;
    margin-bottom: 8px;
    padding: 5px;
    background-color: #f9f9f9;
    border-radius: 4px;
  }
  
  .char {
    flex: 1;
    font-weight: bold;
  }
  
  .count {
    width: 30px;
    text-align: center;
    background-color: #e9f7fe;
    border-radius: 3px;
  }
  
  .counters-comparison {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .char-comparison {
    display: flex;
    align-items: center;
    padding: 8px;
    background-color: #f5f5f5;
    border-radius: 5px;
  }
  
  .char-comparison.diff {
    background-color: #fce4e4;
  }
  
  .char {
    width: 80px;
    font-weight: bold;
    text-align: center;
  }
  
  .first-count, .second-count {
    width: 80px;
    text-align: center;
    padding: 3px 8px;
    background-color: #fff;
    border-radius: 3px;
  }
  
  .comparison-sign {
    width: 40px;
    text-align: center;
    font-weight: bold;
  }
  
  .combined-counter-animation {
    margin-bottom: 20px;
  }
  
  .step-description {
    margin-bottom: 15px;
    font-style: italic;
  }
  
  .counter-updates {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .counter-update {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 10px;
    background-color: #f5f5f5;
    border-radius: 4px;
  }
  
  .operation {
    font-weight: bold;
    color: #3498db;
  }
  
  .intermediate-counter, .final-counter {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
  }
  
  .final-counter .char-count.non-zero {
    background-color: #fce4e4;
  }
  
  .check-zeros {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .check-description {
    margin-bottom: 10px;
  }
  
  .zero-check-result {
    font-weight: bold;
    padding: 8px;
    background-color: #f5f5f5;
    border-radius: 5px;
    display: inline-block;
  }
  
  .hash-visualization {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .string-hash {
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 8px;
  }
  
  .hash-calculation {
    margin-top: 10px;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
  }
  
  .hash-formula {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .hash-steps {
    font-family: monospace;
    margin-bottom: 5px;
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .hash-result {
    font-weight: bold;
    color: #0056b3;
  }
  
  .hash-comparison {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .compare-sums, .compare-products {
    margin-bottom: 15px;
  }
  
  .sum-title, .product-title {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .sum-values, .product-values {
    padding: 8px;
    background-color: #f5f5f5;
    border-radius: 5px;
    display: inline-block;
  }
  
  .warning-note {
    margin-top: 15px;
    padding: 10px;
    background-color: #fff8e1;
    border-left: 4px solid #ffc107;
    border-radius: 0 5px 5px 0;
  }
  
  .animation-controls {
    text-align: center;
    margin-top: 20px;
  }
  
  .next-button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .next-button:hover {
    background-color: #2980b9;
  }
  
  .animation-reset {
    text-align: center;
    margin-top: 20px;
  }
  
  .reset-button {
    padding: 10px 20px;
    background-color: #95a5a6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .reset-button:hover {
    background-color: #7f8c8d;
  }
  
  /* Pitfalls section */
  .pitfall {
    margin-bottom: 30px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #f39c12;
  }
  
  .code-snippet {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 5px;
    margin-top: 10px;
  }
  
  .example-collision {
    margin-top: 10px;
    padding: 10px;
    background-color: #fce4e4;
    border-radius: 5px;
    font-style: italic;
  }
  
  /* Recommendations section */
  .recommendation {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #e9f7fe;
    border-radius: 8px;
  }
  
  /* Conclusion section */
  .conclusion-section {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    margin-top: 30px;
  }
  
  /* Animation */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    .complexity-info {
      flex-direction: column;
    }
    
    .counters-visualization {
      flex-direction: column;
    }
    
    .length-check {
      flex-direction: column;
    }
    
    .comparison-visualization {
      flex-direction: column;
    }
    
    .example-row {
      grid-template-columns: 1fr;
    }
    
    .examples {
      flex-direction: column;
    }
  }
  </style>