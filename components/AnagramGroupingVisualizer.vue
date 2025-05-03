<template>
    <div class="anagram-visualizer">
      <h1>Группировка анаграмм: Визуализация и алгоритм</h1>
      
      <section class="problem-description">
        <h2>Задача</h2>
        <div class="description-card">
          <p class="task-description">
            Получив массив строк <code>strs</code>, сгруппируйте анаграммы вместе. 
            Вы можете вернуть ответ в любом порядке.
          </p>
          <p>
            <strong>Анаграмма</strong> - это слово или фраза, образованные путем перестановки 
            букв другого слова или фразы. Например, <code>"tea"</code> и <code>"eat"</code> - анаграммы.
          </p>
          <div class="example">
            <p><strong>Пример:</strong></p>
            <pre>Вход: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
  Выход: [["bat"],["nat","tan"],["ate","eat","tea"]]</pre>
          </div>
        </div>
      </section>
      
      <section class="solution-approach">
        <h2>Подход к решению</h2>
        <div class="algorithm-card">
          <p>Основная идея решения связана с определением характеристики, которая будет одинакова для всех анаграмм:</p>
          
          <div class="insight-box">
            <div class="insight-icon">💡</div>
            <p><strong>Ключевое понимание:</strong> Все анаграммы имеют одинаковый набор символов и их количества. Следовательно, если мы отсортируем символы в каждом слове, анаграммы будут иметь одинаковую отсортированную форму!</p>
          </div>
          
          <h3>Алгоритм:</h3>
          <ol>
            <li>Для каждого слова в массиве:</li>
            <ul>
              <li>Отсортировать символы слова (получив "ключ" анаграммы)</li>
              <li>Использовать этот ключ в хеш-таблице для группировки</li>
            </ul>
            <li>Вернуть все группы из хеш-таблицы как ответ</li>
          </ol>
          
          <div class="complexity">
            <p><strong>Временная сложность:</strong> O(n * k * log k), где n - количество слов, k - максимальная длина слова</p>
            <p><strong>Пространственная сложность:</strong> O(n * k)</p>
          </div>
        </div>
      </section>
      
      <section class="code-solution">
        <h2>Решение</h2>
        <div class="code-card">
          <pre class="code"><code>const groupAnagrams = (strs) => {
    // Хеш-таблица для группировки анаграмм
    const anagramGroups = new Map();
    
    // Проходим по каждому слову в массиве
    for (const word of strs) {
      // Создаем ключ, сортируя символы слова
      const sortedWord = word.split('').sort().join('');
      
      // Если ключ уже существует, добавляем слово в эту группу
      // Иначе создаем новую группу
      if (anagramGroups.has(sortedWord)) {
        anagramGroups.get(sortedWord).push(word);
      } else {
        anagramGroups.set(sortedWord, [word]);
      }
    }
    
    // Возвращаем все группы анаграмм в виде массива
    return Array.from(anagramGroups.values());
  };</code></pre>
          
          <div class="code-explanation">
            <p><strong>Пояснение кода:</strong></p>
            <ol>
              <li>Создаем <code>Map</code> для хранения групп анаграмм</li>
              <li>Для каждого слова вычисляем "отпечаток" анаграммы: сортируем буквы</li>
              <li>Используем этот отпечаток как ключ в Map для группировки</li>
              <li>В конце собираем все группы (значения Map) в массив</li>
            </ol>
          </div>
        </div>
      </section>
      
      <section class="algorithm-visualization">
        <h2>Пошаговая визуализация</h2>
        <div class="visualization-card">
          <div class="controls">
            <button :disabled="isPlaying || currentStep === 0" @click="resetVisualization">Сбросить</button>
            <button :disabled="isPlaying" @click="startVisualization">
              {{ currentStep === steps.length - 1 ? 'Повторить' : 'Начать' }}
            </button>
            <button :disabled="!isPlaying" @click="pauseVisualization">Пауза</button>
            <button :disabled="isPlaying || currentStep === steps.length - 1" @click="nextStep">Вперед</button>
          </div>
          
          <div class="visualization-container">
            <div class="step-info">
              <div class="step-number">Шаг {{ currentStep + 1 }} из {{ steps.length }}</div>
              <div class="step-description">{{ steps[currentStep].description }}</div>
            </div>
            
            <div class="visualization-content">
              <!-- Исходный массив -->
              <div class="input-array">
                <h3>Исходный массив:</h3>
                <div class="array-container">
                  <div 
                    v-for="(word, index) in initialArray" 
                    :key="`input-${index}`"
                    class="array-item"
                    :class="{ 
                      'current': currentStep > 0 && steps[currentStep].currentWordIndex === index,
                      'processed': currentStep > 0 && steps[currentStep].currentWordIndex > index
                    }"
                  >
                    {{ word }}
                  </div>
                </div>
              </div>
              
              <!-- Текущий процесс -->
              <div class="current-process" v-if="currentStep > 0">
                <div class="process-container">
                  <div class="current-word" v-if="steps[currentStep].currentWord">
                    <span>Текущее слово:</span>
                    <div class="word-box">{{ steps[currentStep].currentWord }}</div>
                  </div>
                  
                  <div class="sorting-process" v-if="steps[currentStep].sortingSteps">
                    <span>Сортировка:</span>
                    <div class="sorting-box">
                      <div class="sorting-step" 
                           v-for="(step, idx) in steps[currentStep].sortingSteps" 
                           :key="`sort-${idx}`"
                      >
                        {{ step }}
                      </div>
                      <div class="arrow" v-if="steps[currentStep].sortingSteps.length > 0">→</div>
                      <div class="sorted-result">{{ steps[currentStep].sortedWord }}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Хеш-таблица (Map) -->
              <div class="hash-map">
                <h3>Хеш-таблица для группировки:</h3>
                <div class="map-container">
                  <div 
                    v-for="(group, key) in steps[currentStep].anagramGroups" 
                    :key="`group-${key}`" 
                    class="map-entry"
                    :class="{ 'highlight': key === steps[currentStep].sortedWord }"
                  >
                    <div class="map-key">{{ key }}</div>
                    <div class="map-value">
                      <div 
                        v-for="(word, wordIdx) in group" 
                        :key="`word-${wordIdx}`"
                        class="group-word"
                        :class="{ 'last-added': word === steps[currentStep].currentWord && key === steps[currentStep].sortedWord }"
                      >
                        {{ word }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Результат -->
            <div class="result" v-if="currentStep === steps.length - 1">
              <h3>Результат:</h3>
              <div class="result-container">
                <div 
                  v-for="(group, idx) in Object.values(steps[currentStep].anagramGroups)" 
                  :key="`result-${idx}`"
                  class="result-group"
                >
                  [{{ group.join(", ") }}]
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="optimizations">
        <h2>Оптимизации и подводные камни</h2>
        <div class="optimizations-card">
          <div class="optimization-item">
            <h3>Альтернативный подход к вычислению ключа</h3>
            <p>Вместо сортировки букв (O(k log k)) можно использовать подсчет символов (O(k)):</p>
            <pre class="code"><code>const getKey = (word) => {
    const count = Array(26).fill(0);
    
    for (const char of word) {
      const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
      count[index]++;
    }
    
    // Создаем ключ вида "a1b2c3..."
    return count.map((cnt, idx) => {
      if (cnt > 0) {
        return String.fromCharCode(idx + 'a'.charCodeAt(0)) + cnt;
      }
      return '';
    }).join('');
  };</code></pre>
            <p><strong>Преимущество:</strong> Временная сложность улучшается до O(n * k), где n - количество слов, k - максимальная длина слова.</p>
          </div>
          
          <div class="optimization-item">
            <h3>Подводные камни</h3>
            <ul>
              <li>
                <strong>Регистрозависимость:</strong> Буквы "A" и "a" имеют разные коды. Нужно решить, 
                будет ли алгоритм чувствителен к регистру.
              </li>
              <li>
                <strong>Специальные символы:</strong> Если в словах могут быть не только латинские буквы, 
                но и другие символы, нужно адаптировать хеширование.
              </li>
              <li>
                <strong>Пустые строки:</strong> Алгоритм должен корректно обрабатывать пустые строки, 
                если они допустимы во входных данных.
              </li>
              <li>
                <strong>Большие данные:</strong> Для очень больших массивов строк может потребоваться 
                дополнительная оптимизация по памяти.
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      <section class="real-world-applications">
        <h2>Практическое применение</h2>
        <div class="applications-card">
          <div class="application-item">
            <h3>1. Поисковые системы и исправление опечаток</h3>
            <p>
              Поисковые системы могут использовать группировку анаграмм для исправления опечаток 
              и предложения альтернативных запросов. Например, если пользователь ввел "тсол" вместо "стол".
            </p>
          </div>
          
          <div class="application-item">
            <h3>2. Игры со словами</h3>
            <p>
              Игры типа "Эрудит" (Scrabble) или кроссворды используют анаграммы для генерации возможных 
              вариантов слов из имеющихся букв.
            </p>
          </div>
          
          <div class="application-item">
            <h3>3. Анализ текста и лингвистика</h3>
            <p>
              Лингвисты и системы обработки естественного языка могут анализировать тексты, 
              группируя слова-анаграммы для поиска закономерностей.
            </p>
          </div>
          
          <div class="application-item">
            <h3>4. Криптография и безопасность</h3>
            <p>
              Некоторые алгоритмы шифрования используют перестановки букв. Анализ анаграмм может 
              применяться при криптоанализе.
            </p>
          </div>
          
          <div class="application-item">
            <h3>5. Обнаружение плагиата</h3>
            <p>
              Анаграммы могут использоваться в системах обнаружения плагиата для выявления 
              переставленных фрагментов текста.
            </p>
          </div>
        </div>
      </section>
      
      <section class="interview-tips">
        <h2>Советы для собеседований</h2>
        <div class="tips-card">
          <div class="tip-item">
            <h3>1. Обсудите подход перед кодированием</h3>
            <p>
              Объясните интервьюеру свой подход к решению задачи, почему вы выбрали этот метод, 
              и какие еще альтернативы рассматривали.
            </p>
          </div>
          
          <div class="tip-item">
            <h3>2. Проанализируйте сложность</h3>
            <p>
              Обязательно укажите временную и пространственную сложность вашего решения. 
              Обсудите возможные оптимизации.
            </p>
          </div>
          
          <div class="tip-item">
            <h3>3. Рассмотрите крайние случаи</h3>
            <p>
              Не забудьте обсудить, как ваш алгоритм обрабатывает крайние случаи: пустой массив, 
              массив с одним элементом, слова с особыми символами и т.д.
            </p>
          </div>
          
          <div class="tip-item">
            <h3>4. Подумайте о возможных последующих вопросах</h3>
            <p>
              Будьте готовы к дополнительным вопросам, таким как: "Как бы вы модифицировали решение, 
              если бы требовалось также учитывать регистр букв?" или "Как бы вы оптимизировали решение 
              для очень больших наборов данных?"
            </p>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref,  onUnmounted } from 'vue';
  
  // Исходный массив для демонстрации
  const initialArray = ["eat", "tea", "tan", "ate", "nat", "bat"];
  
  // Генерация шагов визуализации
  const generateSteps = () => {
    const stepsArr = [];
    const anagramGroupsProgress = {};
    
    // Начальный шаг
    stepsArr.push({
      description: "Начальное состояние. У нас есть массив строк, и мы хотим сгруппировать анаграммы.",
      currentWordIndex: -1,
      currentWord: null,
      sortingSteps: [],
      sortedWord: null,
      anagramGroups: {}
    });
    
    // Для каждого слова в массиве
    initialArray.forEach((word, idx) => {
      // Шаг 1: Выбор текущего слова
      stepsArr.push({
        description: `Берем слово "${word}" из массива.`,
        currentWordIndex: idx,
        currentWord: word,
        sortingSteps: [],
        sortedWord: null,
        anagramGroups: { ...anagramGroupsProgress }
      });
      
      // Шаг 2: Сортировка слова
      const charsArray = word.split('');
      const sortingSteps = [charsArray.join('')]; // Начальное состояние
      
      // Простая визуализация сортировки
      const sortedChars = charsArray.sort();
      const sortedWord = sortedChars.join('');
      
      stepsArr.push({
        description: `Сортируем буквы в слове "${word}" для получения уникального ключа анаграммы.`,
        currentWordIndex: idx,
        currentWord: word,
        sortingSteps: sortingSteps,
        sortedWord: sortedWord,
        anagramGroups: { ...anagramGroupsProgress }
      });
      
      // Шаг 3: Добавление слова в соответствующую группу
      const anagramGroupsCopy = { ...anagramGroupsProgress };
      
      if (sortedWord in anagramGroupsCopy) {
        anagramGroupsCopy[sortedWord].push(word);
      } else {
        anagramGroupsCopy[sortedWord] = [word];
      }
      
      stepsArr.push({
        description: `Добавляем слово "${word}" в группу с ключом "${sortedWord}".`,
        currentWordIndex: idx,
        currentWord: word,
        sortingSteps: sortingSteps,
        sortedWord: sortedWord,
        anagramGroups: anagramGroupsCopy
      });
      
      // Обновляем для следующего слова
      anagramGroupsProgress[sortedWord] = [...anagramGroupsCopy[sortedWord]];
    });
    
    // Финальный шаг: результат
    stepsArr.push({
      description: "Все слова обработаны. Возвращаем группы анаграмм.",
      currentWordIndex: initialArray.length,
      currentWord: null,
      sortingSteps: [],
      sortedWord: null,
      anagramGroups: { ...anagramGroupsProgress }
    });
    
    return stepsArr;
  };
  
  // Состояние визуализации
  const steps = generateSteps();
  const currentStep = ref(0);
  const isPlaying = ref(false);
  let animationInterval = null;
  
  // Методы для управления визуализацией
  const resetVisualization = () => {
    currentStep.value = 0;
    isPlaying.value = false;
    clearInterval(animationInterval);
  };
  
  const startVisualization = () => {
    if (currentStep.value === steps.length - 1) {
      resetVisualization();
    }
    
    isPlaying.value = true;
    animationInterval = setInterval(() => {
      if (currentStep.value < steps.length - 1) {
        currentStep.value++;
      } else {
        pauseVisualization();
      }
    }, 2000); // Интервал между шагами (2 секунды)
  };
  
  const pauseVisualization = () => {
    isPlaying.value = false;
    clearInterval(animationInterval);
  };
  
  const nextStep = () => {
    if (currentStep.value < steps.length - 1) {
      currentStep.value++;
    }
  };
  
  // Очистка интервала при размонтировании компонента
  onUnmounted(() => {
    clearInterval(animationInterval);
  });
  </script>
  
  <style scoped>
  .anagram-visualizer {
    font-family: 'Roboto', 'Segoe UI', Arial, sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
    line-height: 1.6;
  }
  
  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  h2 {
    color: #3498db;
    border-bottom: 2px solid #3498db;
    padding-bottom: 5px;
    margin-top: 30px;
  }
  
  h3 {
    color: #2c3e50;
    margin-top: 20px;
    font-size: 1.2rem;
  }
  
  section {
    margin-bottom: 40px;
  }
  
  .description-card, .algorithm-card, .code-card, .visualization-card, 
  .optimizations-card, .applications-card, .tips-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-top: 15px;
  }
  
  /* Стили для блока задачи */
  .task-description {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 15px;
  }
  
  .example {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 6px;
    border-left: 4px solid #3498db;
    margin-top: 15px;
  }
  
  .example pre {
    margin: 10px 0 0;
    white-space: pre-wrap;
    font-family: 'Consolas', 'Monaco', monospace;
  }
  
  /* Стили для блока подхода */
  .insight-box {
    display: flex;
    align-items: flex-start;
    background-color: #e3f2fd;
    padding: 15px;
    border-radius: 6px;
    margin: 15px 0;
  }
  
  .insight-icon {
    font-size: 1.5rem;
    margin-right: 10px;
  }
  
  .complexity {
    background-color: #f8f9fa;
    padding: 10px 15px;
    border-radius: 6px;
    margin-top: 20px;
  }
  
  /* Стили для блока кода */
  pre.code {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Consolas', 'Monaco', monospace;
    line-height: 1.4;
  }
  
  .code-explanation {
    margin-top: 20px;
  }
  
  /* Стили для визуализации */
  .controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .controls button {
    padding: 8px 16px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .controls button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .controls button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .visualization-container {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 6px;
  }
  
  .step-info {
    margin-bottom: 20px;
    padding: 10px 15px;
    background-color: #e3f2fd;
    border-radius: 6px;
    border-left: 4px solid #3498db;
  }
  
  .step-number {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .input-array, .current-process, .hash-map, .result {
    margin-bottom: 25px;
  }
  
  .array-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
  }
  
  .array-item {
    padding: 8px 12px;
    background-color: #ecf0f1;
    border-radius: 4px;
    border: 1px solid #bdc3c7;
    transition: all 0.3s;
  }
  
  .array-item.current {
    background-color: #f39c12;
    color: white;
    transform: scale(1.05);
    border-color: #f39c12;
  }
  
  .array-item.processed {
    background-color: #2ecc71;
    color: white;
    border-color: #2ecc71;
  }
  
  .process-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: white;
    padding: 15px;
    border-radius: 6px;
    border: 1px solid #ddd;
  }
  
  .current-word, .sorting-process {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .word-box {
    padding: 8px 12px;
    background-color: #f39c12;
    color: white;
    border-radius: 4px;
    font-weight: bold;
  }
  
  .sorting-box {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .sorting-step {
    padding: 8px 12px;
    background-color: #ecf0f1;
    border-radius: 4px;
    border: 1px solid #bdc3c7;
  }
  
  .arrow {
    font-size: 1.2rem;
    font-weight: bold;
    color: #7f8c8d;
  }
  
  .sorted-result {
    padding: 8px 12px;
    background-color: #3498db;
    color: white;
    border-radius: 4px;
    font-weight: bold;
  }
  
  .map-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 10px;
  }
  
  .map-entry {
    display: flex;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.3s;
  }
  
  .map-entry.highlight {
    box-shadow: 0 0 8px rgba(243, 156, 18, 0.6);
    border-color: #f39c12;
  }
  
  .map-key {
    padding: 10px 15px;
    background-color: #34495e;
    color: white;
    font-weight: bold;
    min-width: 100px;
  }
  
  .map-value {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 10px;
    flex: 1;
  }
  
  .group-word {
    padding: 5px 10px;
    background-color: #ecf0f1;
    border-radius: 4px;
    transition: all 0.3s;
  }
  
  .group-word.last-added {
    background-color: #f39c12;
    color: white;
    animation: pulse 1s infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  .result-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 10px;
  }
  
  .result-group {
    padding: 10px 15px;
    background-color: #2ecc71;
    color: white;
    border-radius: 6px;
    animation: fadeIn 1s;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Стили для оптимизаций */
  .optimization-item {
    margin-bottom: 25px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  
  .optimization-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  
  /* Стили для практических применений */
  .application-item {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }
  
  .application-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  
  /* Советы для интервью */
  .tip-item {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }
  
  .tip-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    .anagram-visualizer {
      padding: 10px;
    }
    
    .controls {
      flex-wrap: wrap;
    }
    
    .array-container, .map-container, .result-container {
      flex-direction: column;
    }
    
    .process-container {
      padding: 10px;
    }
    
    .map-entry {
      flex-direction: column;
    }
    
    .map-key {
      min-width: auto;
    }
  }
  </style>