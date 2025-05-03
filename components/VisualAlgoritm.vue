<template>
    <div class="range-algorithm-explorer">
      <h1>Алгоритм построения диапазонов чисел</h1>
      
      <div class="problem-description">
        <h2>Задача</h2>
        <p>Функция принимает массив чисел (не сортированный) и возвращает строку с диапазонами чисел, разделенными запятыми:</p>
        <ul>
          <li>Каждый диапазон представлен в формате <code>a-b</code>, где a — начало диапазона, а b — конец диапазона</li>
          <li>Если диапазон состоит из одного числа, он представлен просто как <code>a</code></li>
        </ul>
        <div class="example">
          <p><strong>Пример:</strong></p>
          <code>getRanges([1, 2, 5, 10, 6, 7, 8, 11, 13, 0, 17]) => '0-2,5-8,10-11,13,17'</code>
        </div>
      </div>
  
      <div class="algorithm-section">
        <h2>Алгоритм решения</h2>
        <div class="algorithm-steps">
          <div class="step" :class="{ active: currentStep >= 1 }">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Сортировка массива</h3>
              <p>Сначала отсортируем исходный массив по возрастанию, чтобы легко находить последовательные числа.</p>
            </div>
          </div>
          
          <div class="step" :class="{ active: currentStep >= 2 }">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Поиск диапазонов</h3>
              <p>Проходим по отсортированному массиву и определяем диапазоны последовательных чисел:</p>
              <ul>
                <li>Начинаем с первого числа как начала диапазона</li>
                <li>Последовательно проверяем, является ли следующее число продолжением текущего диапазона (на единицу больше предыдущего)</li>
                <li>Если да - расширяем диапазон</li>
                <li>Если нет - завершаем текущий диапазон и начинаем новый</li>
              </ul>
            </div>
          </div>
          
          <div class="step" :class="{ active: currentStep >= 3 }">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Форматирование результата</h3>
              <p>Преобразуем найденные диапазоны в требуемый формат:</p>
              <ul>
                <li>Для диапазона из одного числа: <code>a</code></li>
                <li>Для диапазона из нескольких чисел: <code>a-b</code></li>
                <li>Соединяем все диапазоны запятыми</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  
      <div class="interactive-demo">
        <h2>Интерактивная демонстрация</h2>
        
        <div class="input-controls">
          <div class="input-field">
            <label for="input-array">Введите числа через запятую:</label>
            <input 
              id="input-array" 
              v-model="inputString" 
              placeholder="Например: 1,2,5,10,6,7,8,11,13,0,17"
              @keyup.enter="parseAndRun"
            />
          </div>
          <button class="run-btn" @click="parseAndRun">Запустить алгоритм</button>
        </div>
        
        <div class="demo-container" v-if="demoStarted">
          <div class="algorithm-animation">
            <div class="step-description">
              {{ stepDescriptions[animationStep] }}
            </div>
            
            <div class="visualization">
              <!-- Исходный массив -->
              <div class="array original">
                <div class="array-label">Исходный массив:</div>
                <div class="array-items">
                  <div 
                    v-for="(num, idx) in originalArray" 
                    :key="`orig-${idx}`" 
                    class="array-item"
                  >
                    {{ num }}
                  </div>
                </div>
              </div>
              
              <!-- Сортированный массив -->
              <div class="array sorted" v-if="animationStep >= 1">
                <div class="array-label">Отсортированный массив:</div>
                <div class="array-items">
                  <div 
                    v-for="(num, idx) in sortedArray" 
                    :key="`sort-${idx}`" 
                    class="array-item"
                    :class="{
                      active: animationStep >= 2 && idx <= currentIndex,
                      'range-start': rangeStarts.includes(idx),
                      'range-end': rangeEnds.includes(idx),
                      'current-item': idx === currentIndex && animationStep >= 2 && animationStep < 5
                    }"
                  >
                    {{ num }}
                  </div>
                </div>
              </div>
              
              <!-- Текущий диапазон (для шага 2-4) -->
              <div class="current-range" v-if="animationStep >= 2 && animationStep <= 4">
                <div class="range-label">Текущий диапазон:</div>
                <div class="range-value">
                  <template v-if="currentRangeStart === currentRangeEnd">
                    {{ currentRangeStart }}
                  </template>
                  <template v-else>
                    {{ currentRangeStart }}-{{ currentRangeEnd }}
                  </template>
                </div>
              </div>
              
              <!-- Все найденные диапазоны -->
              <div class="found-ranges" v-if="animationStep >= 2">
                <div class="range-label">Найденные диапазоны:</div>
                <div class="ranges-container">
                  <div 
                    v-for="(range, idx) in foundRanges" 
                    :key="`range-${idx}`" 
                    class="range-item"
                    :class="{ 'current-add': idx === foundRanges.length - 1 && newRangeAdded }"
                  >
                    {{ range }}
                  </div>
                </div>
              </div>
              
              <!-- Итоговый результат -->
              <div class="result" v-if="animationStep >= 5">
                <div class="result-label">Результат:</div>
                <div class="result-value">{{ result }}</div>
              </div>
            </div>
            
            <div class="animation-controls">
              <button 
                class="control-btn"
                :disabled="animationStep <= 0"
                @click="prevStep"
              >
                Назад
              </button>
              <button 
                class="control-btn"
                :disabled="animationStep >= maxSteps"
                @click="nextStep"
              >
                Далее
              </button>
              <button 
                class="control-btn reset"
                @click="resetAnimation"
              >
                Сбросить
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="implementation">
        <h2>Реализация функции</h2>
        <pre><code>function getRanges(arr) {
    // Сортируем массив
    const sorted = [...arr].sort((a, b) => a - b);
    
    // Если массив пустой, возвращаем пустую строку
    if (sorted.length === 0) return '';
    
    const ranges = [];
    let start = sorted[0];
    let end = start;
    
    // Проходим по отсортированному массиву начиная со второго элемента
    for (let i = 1; i &lt; sorted.length; i++) {
      const current = sorted[i];
      
      // Если текущее число на единицу больше предыдущего, расширяем диапазон
      if (current === end + 1) {
        end = current;
      } else {
        // Иначе завершаем текущий диапазон
        if (start === end) {
          ranges.push(`${start}`);
        } else {
          ranges.push(`${start}-${end}`);
        }
        
        // И начинаем новый диапазон
        start = current;
        end = current;
      }
    }
    
    // Добавляем последний диапазон
    if (start === end) {
      ranges.push(`${start}`);
    } else {
      ranges.push(`${start}-${end}`);
    }
    
    // Соединяем диапазоны запятыми
    return ranges.join(',');
  }</code></pre>
      </div>
  
      <div class="edge-cases">
        <h2>Особые случаи и подводные камни</h2>
        
        <div class="edge-case">
          <h3>1. Пустой массив</h3>
          <p>Нужно корректно обрабатывать случай пустого массива, возвращая пустую строку.</p>
          <div class="example">
            <code>getRanges([]) => ''</code>
          </div>
        </div>
        
        <div class="edge-case">
          <h3>2. Массив с дубликатами</h3>
          <p>Если в массиве есть повторяющиеся числа, они будут учтены только один раз. Решение выше это правильно обрабатывает благодаря сортировке, но это потенциальное место для ошибки.</p>
          <div class="example">
            <code>getRanges([1, 1, 2, 2, 3]) => '1-3'</code>
          </div>
        </div>
        
        <div class="edge-case">
          <h3>3. Отрицательные числа</h3>
          <p>Алгоритм должен корректно работать с отрицательными числами, важно использовать правильную сортировку (с компаратором).</p>
          <div class="example">
            <code>getRanges([-3, -2, -1, 1, 2, 3]) => '-3-3'</code>
          </div>
        </div>
        
        <div class="edge-case">
          <h3>4. Массив из одного элемента</h3>
          <p>Для массива с одним элементом результатом будет просто это число.</p>
          <div class="example">
            <code>getRanges([42]) => '42'</code>
          </div>
        </div>
      </div>
  
      <div class="optimizations">
        <h2>Оптимизации и альтернативные подходы</h2>
        
        <div class="optimization">
          <h3>Оптимизация по времени и памяти</h3>
          <p>Временная сложность алгоритма: <strong>O(n log n)</strong> из-за сортировки. Пространственная сложность: <strong>O(n)</strong> для хранения отсортированного массива и результата.</p>
          <p>Для небольших массивов дополнительных оптимизаций может не требоваться, но для очень больших массивов можно:</p>
          <ul>
            <li>Использовать более эффективные сортировки для специфических данных</li>
            <li>Применить алгоритм без создания копии массива, если можно модифицировать исходный массив</li>
          </ul>
        </div>
        
        <div class="optimization">
          <h3>Функциональный подход</h3>
          <p>Решение можно переписать с использованием функциональных методов массивов:</p>
          <pre><code>function getRanges(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    
    if (sorted.length === 0) return '';
    
    // Группируем числа в диапазоны
    const ranges = sorted.reduce((acc, curr, idx, array) => {
      if (idx === 0) {
        // Начинаем первый диапазон
        return [{ start: curr, end: curr }];
      }
      
      const lastRange = acc[acc.length - 1];
      
      if (curr === lastRange.end + 1) {
        // Расширяем текущий диапазон
        lastRange.end = curr;
        return acc;
      } else {
        // Начинаем новый диапазон
        return [...acc, { start: curr, end: curr }];
      }
    }, []);
    
    // Форматируем результат
    return ranges.map(range => 
      range.start === range.end ? `${range.start}` : `${range.start}-${range.end}`
    ).join(',');
  }</code></pre>
        </div>
      </div>
  
      <div class="similar-problems">
        <h2>Похожие задачи и применение</h2>
        <p>Этот алгоритм или его вариации применяются в ряде практических задач:</p>
        <ul>
          <li>Сжатие данных, особенно для представления разреженных данных</li>
          <li>Представление свободных слотов в системах планирования и бронирования</li>
          <li>Форматирование номеров страниц при печати (например, "страницы 1-3, 5, 7-9")</li>
          <li>Сжатие IP-адресов и сетевых диапазонов (например, CIDR нотация)</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Состояние для интерактивной демонстрации
  const inputString = ref('1,2,5,10,6,7,8,11,13,0,17');
  const originalArray = ref([]);
  const sortedArray = ref([]);
  const foundRanges = ref([]);
  const result = ref('');
  
  // Состояние анимации
  const demoStarted = ref(false);
  const animationStep = ref(0);
  const currentStep = ref(0);
  const currentIndex = ref(0);
  const currentRangeStart = ref(null);
  const currentRangeEnd = ref(null);
  const rangeStarts = ref([]);
  const rangeEnds = ref([]);
  const newRangeAdded = ref(false);
  const maxSteps = ref(0);
  
  // Описания шагов анимации
  const stepDescriptions = ref([
    'Подготовка к запуску алгоритма...',
    'Шаг 1: Сортируем исходный массив по возрастанию',
    'Шаг 2: Начинаем поиск диапазонов с первого элемента',
    'Шаг 3: Проходим по отсортированному массиву, определяя диапазоны',
    'Шаг 4: Добавляем последний найденный диапазон',
    'Шаг 5: Формируем итоговый результат, соединяя диапазоны запятыми'
  ]);
  
  // Парсим входную строку и запускаем демонстрацию
  function parseAndRun() {
    try {
      // Разбираем строку ввода в массив чисел
      const parsedArray = inputString.value
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '')
        .map(item => parseInt(item, 10));
      
      // Проверяем, что все элементы - корректные числа
      if (parsedArray.some(isNaN)) {
        alert('Пожалуйста, введите только числа, разделенные запятыми');
        return;
      }
      
      // Запускаем демонстрацию с новым массивом
      startDemo(parsedArray);
    } catch (error) {
      alert('Произошла ошибка при разборе ввода. Проверьте формат и попробуйте снова.');
      console.error(error);
    }
  }
  
  // Запуск демонстрации алгоритма
  function startDemo(array) {
    // Сбрасываем состояние демонстрации
    resetAnimation();
    
    // Инициализируем данные
    originalArray.value = [...array];
    sortedArray.value = [...array].sort((a, b) => a - b);
    
    // Начинаем демонстрацию
    demoStarted.value = true;
    animationStep.value = 0;
    currentStep.value = 0;
    
    // Вычисляем максимальное количество шагов анимации
    maxSteps.value = sortedArray.value.length > 0 ? 5 : 1;
    
    // Запускаем первый шаг
    nextStep();
  }
  
  // Переход к следующему шагу анимации
  function nextStep() {
    if (animationStep.value >= maxSteps.value) return;
    
    animationStep.value++;
    currentStep.value = Math.max(currentStep.value, animationStep.value);
    
    // Обновляем состояние в зависимости от текущего шага
    updateAnimationState();
  }
  
  // Переход к предыдущему шагу анимации
  function prevStep() {
    if (animationStep.value <= 0) return;
    
    animationStep.value--;
    
    // Обновляем состояние в зависимости от текущего шага
    updateAnimationState();
  }
  
  // Сброс анимации
  function resetAnimation() {
    demoStarted.value = false;
    animationStep.value = 0;
    currentStep.value = 0;
    currentIndex.value = 0;
    currentRangeStart.value = null;
    currentRangeEnd.value = null;
    rangeStarts.value = [];
    rangeEnds.value = [];
    foundRanges.value = [];
    result.value = '';
    newRangeAdded.value = false;
  }
  
  // Обновление состояния анимации на основе текущего шага
  function updateAnimationState() {
    newRangeAdded.value = false;
    
    switch (animationStep.value) {
      case 1: // Сортировка массива
        // Состояние уже установлено
        break;
        
      case 2: // Начинаем поиск диапазонов
        if (sortedArray.value.length > 0) {
          rangeStarts.value = [0];
          currentIndex.value = 0;
          currentRangeStart.value = sortedArray.value[0];
          currentRangeEnd.value = sortedArray.value[0];
        }
        break;
        
      case 3: // Проходим по массиву, находя диапазоны
        simulateRangeFinding();
        break;
        
      case 4: // Добавляем последний диапазон
        // Добавляем последний найденный диапазон в результат
        if (currentRangeStart.value !== null) {
          const lastRangeStr = currentRangeStart.value === currentRangeEnd.value 
            ? `${currentRangeStart.value}` 
            : `${currentRangeStart.value}-${currentRangeEnd.value}`;
          
          if (!foundRanges.value.includes(lastRangeStr)) {
            foundRanges.value.push(lastRangeStr);
            newRangeAdded.value = true;
          }
        }
        break;
        
      case 5: // Формируем итоговый результат
        result.value = foundRanges.value.join(',');
        break;
    }
  }
  
  // Симуляция поиска диапазонов (для шага 3)
  function simulateRangeFinding() {
    const sorted = sortedArray.value;
    
    if (sorted.length <= 1) {
      // Для массива из 0-1 элементов просто добавляем его как диапазон
      if (sorted.length === 1) {
        foundRanges.value = [`${sorted[0]}`];
        rangeStarts.value = [0];
        rangeEnds.value = [0];
      }
      return;
    }
    
    // Инициализируем состояние поиска диапазонов
    const ranges = [];
    let start = sorted[0];
    let end = start;
    
    const starts = [0];
    const ends = [];
    
    // Проходим по массиву, обновляя диапазоны
    for (let i = 1; i < sorted.length; i++) {
      const current = sorted[i];
      
      if (current === end + 1) {
        // Текущее число продолжает диапазон
        end = current;
      } else {
        // Текущее число начинает новый диапазон
        ends.push(i - 1);
        
        // Форматируем и добавляем завершенный диапазон
        if (start === end) {
          ranges.push(`${start}`);
        } else {
          ranges.push(`${start}-${end}`);
        }
        
        // Начинаем новый диапазон
        start = current;
        end = current;
        starts.push(i);
      }
      
      // Если мы достигли индекса, на котором остановились, прекращаем обновление
      if (i >= currentIndex.value) break;
    }
    
    // Добавляем последний диапазон, если это необходимо
    if (currentIndex.value === sorted.length - 1) {
      ends.push(currentIndex.value);
      
      if (start === end) {
        ranges.push(`${start}`);
      } else {
        ranges.push(`${start}-${end}`);
      }
    }
    
    // Обновляем состояние анимации
    foundRanges.value = ranges;
    rangeStarts.value = starts;
    rangeEnds.value = ends;
    
    // Обновляем текущий диапазон
    if (currentIndex.value < sorted.length) {
      const idx = Math.max(0, currentIndex.value);
      
      // Находим, к какому диапазону относится текущий индекс
      let rangeIdx = -1;
      for (let i = 0; i < starts.length; i++) {
        const startIdx = starts[i];
        const endIdx = i < ends.length ? ends[i] : idx;
        
        if (idx >= startIdx && idx <= endIdx) {
          rangeIdx = i;
          break;
        }
      }
      
      if (rangeIdx !== -1) {
        const startIdx = starts[rangeIdx];
        const endIdx = rangeIdx < ends.length ? ends[rangeIdx] : idx;
        
        currentRangeStart.value = sorted[startIdx];
        currentRangeEnd.value = sorted[endIdx];
      }
    }
    
    // Переходим к следующему индексу при повторном вызове
    if (currentIndex.value < sorted.length - 1) {
      currentIndex.value++;
    }
  }
  
  // Автоматический запуск демонстрации с примером при загрузке
  function initDemo() {
    const defaultArray = [1, 2, 5, 10, 6, 7, 8, 11, 13, 0, 17];
    startDemo(defaultArray);
  }
  
  // Запускаем демонстрацию при загрузке компонента
  initDemo();
  </script>
  
  <style scoped>
  .range-algorithm-explorer {
    font-family: 'Arial', sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
    line-height: 1.6;
  }
  
  h1, h2, h3 {
    color: #2c3e50;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 2rem;
  }
  
  h2 {
    margin-top: 40px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #3498db;
    font-size: 1.5rem;
  }
  
  h3 {
    margin-top: 25px;
    margin-bottom: 15px;
    font-size: 1.2rem;
  }
  
  .problem-description, .edge-cases, .optimizations, .similar-problems {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .example {
    background-color: #e8f4f8;
    padding: 12px 15px;
    border-radius: 6px;
    margin: 15px 0;
    border-left: 4px solid #3498db;
  }
  
  .example code {
    font-family: 'Courier New', monospace;
    font-size: 0.95rem;
  }
  
  /* Стили для алгоритма и шагов */
  .algorithm-steps {
    margin: 20px 0;
  }
  
  .step {
    display: flex;
    margin-bottom: 25px;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }
  
  .step.active {
    opacity: 1;
  }
  
  .step-number {
    background-color: #3498db;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 15px;
    flex-shrink: 0;
  }
  
  .step-content {
    flex: 1;
  }
  
  .step-content h3 {
    margin-top: 0;
  }
  
  /* Интерактивная демонстрация */
  .interactive-demo {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin-top: 40px;
    margin-bottom: 30px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .input-controls {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    align-items: flex-end;
  }
  
  .input-field {
    flex: 1;
  }
  
  .input-field label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .input-field input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .run-btn {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
  }
  
  .run-btn:hover {
    background-color: #2980b9;
  }
  
  .demo-container {
    margin-top: 30px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .algorithm-animation {
    padding: 20px;
  }
  
  .step-description {
    background-color: #e8f4f8;
    padding: 12px 15px;
    border-radius: 6px;
    margin-bottom: 20px;
    font-weight: bold;
    text-align: center;
  }
  
  .visualization {
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  /* Стили для массивов и элементов */
  .array {
    margin-bottom: 25px;
  }
  
  .array-label, .range-label, .result-label {
    font-weight: bold;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  
  .array-items {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .array-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #ecf0f1;
    border: 2px solid #bdc3c7;
    border-radius: 6px;
    font-weight: bold;
    transition: all 0.3s ease;
  }
  
  .array-item.active {
    background-color: #d5f5e3;
    border-color: #2ecc71;
  }
  
  .array-item.range-start {
    background-color: #d6eaf8;
    border-color: #3498db;
    position: relative;
  }
  
  .array-item.range-end {
    background-color: #d6eaf8;
    border-color: #3498db;
    position: relative;
  }
  
  .array-item.current-item {
    transform: scale(1.1);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #f9e79f;
    border-color: #f1c40f;
  }
  
  .current-range, .found-ranges, .result {
    margin-bottom: 25px;
    padding: 15px;
    border-radius: 8px;
    background-color: #ecf0f1;
    border: 1px solid #bdc3c7;
  }
  
  .current-range .range-value {
    font-size: 1.2rem;
    font-weight: bold;
    color: #e74c3c;
  }
  
  .ranges-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
  }
  
  .range-item {
    padding: 8px 15px;
    background-color: #d6eaf8;
    border: 2px solid #3498db;
    border-radius: 20px;
    font-weight: bold;
    transition: all 0.3s ease;
  }
  
  .range-item.current-add {
    animation: pulse 1s;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); background-color: #bbdefb; }
    100% { transform: scale(1); }
  }
  
  .result .result-value {
    font-size: 1.4rem;
    font-weight: bold;
    color: #27ae60;
    padding: 10px;
    background-color: #d5f5e3;
    border-radius: 6px;
    display: inline-block;
  }
  
  /* Контролы анимации */
  .animation-controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
  }
  
  .control-btn {
    padding: 8px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s;
  }
  
  .control-btn:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .control-btn:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .control-btn.reset {
    background-color: #e74c3c;
  }
  
  .control-btn.reset:hover {
    background-color: #c0392b;
  }
  
  /* Реализация и код */
  .implementation {
    margin-top: 40px;
    margin-bottom: 30px;
  }
  
  .implementation pre {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 20px 0;
    font-family: 'Courier New', monospace;
    line-height: 1.5;
  }
  
  /* Подводные камни */
  .edge-case {
    margin-bottom: 25px;
  }
  
  .edge-case:last-child {
    margin-bottom: 0;
  }
  
  .edge-case h3 {
    color: #e74c3c;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .input-controls {
      flex-direction: column;
      align-items: stretch;
    }
    
    .input-field {
      width: 100%;
    }
    
    .array-item {
      width: 35px;
      height: 35px;
      font-size: 0.9rem;
    }
  }
  
  @media (max-width: 480px) {
    .array-item {
      width: 30px;
      height: 30px;
      font-size: 0.8rem;
    }
    
    .animation-controls {
      flex-direction: column;
      align-items: center;
    }
    
    .control-btn {
      width: 100%;
    }
  }
  </style>