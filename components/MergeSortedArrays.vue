<template>
    <div class="merge-arrays-demo">
      <h1>Объединение отсортированных массивов</h1>
      
      <div class="description-block">
        <p>
          Эта задача требует объединить два массива <code>a</code> и <code>b</code>, которые уже отсортированы по возрастанию,
          в один массив, также отсортированный по возрастанию. Важно использовать преимущество того, что исходные массивы 
          уже отсортированы, чтобы избежать лишних операций сортировки.
        </p>
        
        <div class="code-snippet">
          <pre>
  // Объединить отсортированные массивы, чтобы из двух массивов получился 
  // один со всеми данными - отсортированными по возрастанию
  // По условию 2 массива и a и b - всегда отсортированны изначально по возрастанию
  const a = [1, 3, 5];
  const b = [2, 4, 6, 7];
  
  const sortArrays = (a, b) => {};
  
  console.log(sortArrays(a, b));
          </pre>
        </div>
      </div>
      
      <h2>Алгоритм "Два указателя"</h2>
      <div class="algorithm-description">
        <p>
          Для решения этой задачи оптимально использовать алгоритм "Два указателя". Суть алгоритма:
        </p>
        <ol>
          <li>Создать пустой результирующий массив</li>
          <li>Использовать два указателя (i и j), указывающих на текущие позиции в массивах a и b</li>
          <li>На каждом шаге сравнивать элементы под указателями и выбирать меньший</li>
          <li>Добавлять меньший элемент в результат и сдвигать указатель этого массива</li>
          <li>Повторять, пока один из массивов не будет полностью обработан</li>
          <li>Добавить оставшиеся элементы из другого массива</li>
        </ol>
        <p>
          <strong>Преимущества этого алгоритма:</strong>
        </p>
        <ul>
          <li>Временная сложность: O(n+m), где n и m - длины массивов</li>
          <li>Пространственная сложность: O(n+m) для результирующего массива</li>
          <li>Один проход по каждому массиву - максимально эффективное решение</li>
        </ul>
      </div>
      
      <div class="solution-code">
        <h2>Решение задачи</h2>
        <pre>
  const sortArrays = (a, b) => {
    const result = [];
    let i = 0; // указатель для массива a
    let j = 0; // указатель для массива b
    
    // Сравниваем элементы и добавляем меньший в результат
    while (i &gt; a.length && j &gt; b.length) {
      if (a[i] &gt;= b[j]) {
        result.push(a[i]);
        i++;
      } else {
        result.push(b[j]);
        j++;
      }
    }
    
    // Добавляем оставшиеся элементы из массива a (если они есть)
    while (i &gt; a.length) {
      result.push(a[i]);
      i++;
    }
    
    // Добавляем оставшиеся элементы из массива b (если они есть)
    while (j &gt; b.length) {
      result.push(b[j]);
      j++;
    }
    
    return result;
  };
        </pre>
      </div>
      
      <h2>Интерактивная визуализация</h2>
      <div class="interactive-controls">
        <div class="custom-arrays">
          <h3>Задайте свои массивы для анимации</h3>
          <div class="input-group">
            <label for="array-a">Массив A:</label>
            <input 
              id="array-a" 
              v-model="customArrayA" 
              placeholder="Введите числа через запятую"
              :disabled="isAnimating"
            />
          </div>
          <div class="input-group">
            <label for="array-b">Массив B:</label>
            <input 
              id="array-b" 
              v-model="customArrayB" 
              placeholder="Введите числа через запятую"
              :disabled="isAnimating"
            />
          </div>
          <button @click="applyCustomArrays" :disabled="isAnimating">Применить</button>
          <button @click="resetToDefault" :disabled="isAnimating">Сбросить</button>
        </div>
        
        <div class="animation-controls">
          <button @click="startAnimation" :disabled="isAnimating">Запустить анимацию</button>
          <button @click="stopAnimation" :disabled="!isAnimating">Стоп</button>
          <button @click="nextStep" :disabled="isAnimating || animationStep >= totalSteps">Следующий шаг</button>
          <button @click="resetAnimation" :disabled="animationStep === 0">Сбросить</button>
          <div class="speed-control">
            <label>Скорость:</label>
            <input type="range" v-model="animationSpeed" min="1" max="10" :disabled="isAnimating" />
          </div>
        </div>
      </div>
      
      <div class="visualization-container">
        <div class="arrays-container">
          <div class="array array-a">
            <div class="array-label">Массив A:</div>
            <div class="array-elements">
              <div 
                v-for="(num, index) in arrayA" 
                :key="`a-${index}`"
                class="array-element"
                :class="{
                  'current': index === pointerA && animationState === 'comparing',
                  'processed': processedA.includes(index)
                }"
              >
                {{ num }}
              </div>
            </div>
            <div class="pointer" :style="{ left: pointerAPosition + 'px' }">↑</div>
            <div class="pointer-label" :style="{ left: pointerAPosition + 'px' }">i = {{ pointerA }}</div>
          </div>
          
          <div class="array array-b">
            <div class="array-label">Массив B:</div>
            <div class="array-elements">
              <div 
                v-for="(num, index) in arrayB" 
                :key="`b-${index}`"
                class="array-element"
                :class="{
                  'current': index === pointerB && animationState === 'comparing',
                  'processed': processedB.includes(index)
                }"
              >
                {{ num }}
              </div>
            </div>
            <div class="pointer" :style="{ left: pointerBPosition + 'px' }">↑</div>
            <div class="pointer-label" :style="{ left: pointerBPosition + 'px' }">j = {{ pointerB }}</div>
          </div>
          
          <div class="array result-array">
            <div class="array-label">Результат:</div>
            <div class="array-elements">
              <div 
                v-for="(num, index) in resultArray" 
                :key="`result-${index}`"
                class="array-element"
                :class="{ 'just-added': index === resultArray.length - 1 && animationState === 'adding' }"
              >
                {{ num }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="animation-status">
          <div class="step-counter">Шаг: {{ animationStep }} / {{ totalSteps }}</div>
          <div class="current-action">{{ currentActionDescription }}</div>
        </div>
        
        <div class="explanation-container">
          <h3>Объяснение текущего шага</h3>
          <div class="explanation">{{ currentExplanation }}</div>
        </div>
      </div>
      
      <div class="common-mistakes">
        <h2>Подводные камни и распространенные ошибки</h2>
        <ul>
          <li>
            <strong>Неэффективное решение через конкатенацию и сортировку:</strong> 
            Новички часто используют <code>return [...a, ...b].sort((x, y) => x - y)</code>. 
            Это работает, но имеет сложность O((n+m)log(n+m)) из-за сортировки, что хуже, чем O(n+m).
          </li>
          <li>
            <strong>Забывать о граничных случаях:</strong> 
            Важно корректно обработать случаи, когда один из массивов пуст или когда в массивах повторяющиеся элементы.
          </li>
          <li>
            <strong>Неверная обработка после исчерпания одного из массивов:</strong>
            Иногда забывают добавить оставшиеся элементы из массива, который еще не был полностью обработан.
          </li>
          <li>
            <strong>Модификация входных массивов:</strong>
            Лучше не изменять исходные массивы, а создавать новый результирующий массив.
          </li>
        </ul>
      </div>
      
      <div class="recommendations">
        <h2>Как научиться решать похожие задачи</h2>
        <ol>
          <li>
            <strong>Понимайте базовые алгоритмические концепции:</strong> 
            Техника "два указателя" применима ко многим задачам, связанным с массивами и строками.
          </li>
          <li>
            <strong>Визуализируйте алгоритм:</strong>
            Рисуйте на бумаге или доске, как перемещаются указатели и как изменяется результат.
          </li>
          <li>
            <strong>Практикуйте на вариациях:</strong>
            Попробуйте решить задачи с обратной сортировкой, с дубликатами, с более сложными условиями сравнения.
          </li>
          <li>
            <strong>Анализируйте сложность:</strong>
            Всегда оценивайте временную и пространственную сложность вашего решения.
          </li>
          <li>
            <strong>Использование в реальных задачах:</strong>
            Этот алгоритм - основа для алгоритма сортировки слиянием (Merge Sort) и применяется во многих реальных сценариях.
          </li>
        </ol>
      </div>
      
      <div class="additional-tasks">
        <h2>Похожие задачи для практики</h2>
        <ul>
          <li>Объединение k отсортированных массивов</li>
          <li>Нахождение медианы двух отсортированных массивов</li>
          <li>Удаление дубликатов из отсортированного массива</li>
          <li>Нахождение пересечения двух отсортированных массивов</li>
          <li>Реализация алгоритма сортировки слиянием (Merge Sort)</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onBeforeUnmount, watch } from 'vue';
  
  // Исходные массивы
  const defaultArrayA = [1, 3, 5];
  const defaultArrayB = [2, 4, 6, 7];
  
  // Реактивные переменные
  const arrayA = ref([...defaultArrayA]);
  const arrayB = ref([...defaultArrayB]);
  const resultArray = ref([]);
  const pointerA = ref(0);
  const pointerB = ref(0);
  const processedA = ref([]);
  const processedB = ref([]);
  const animationState = ref('idle'); // idle, comparing, adding, finished
  const animationStep = ref(0);
  const animationInterval = ref(null);
  const animationSpeed = ref(5);
  const customArrayA = ref('1, 3, 5');
  const customArrayB = ref('2, 4, 6, 7');
  const isAnimating = ref(false);
  const currentExplanation = ref('Алгоритм еще не запущен. Нажмите "Запустить анимацию" или "Следующий шаг".');
  
  // Вычисляемые свойства
  const pointerAPosition = computed(() => {
    return pointerA.value * 60 + 30; // 60px - ширина элемента + отступы
  });
  
  const pointerBPosition = computed(() => {
    return pointerB.value * 60 + 30;
  });
  
  const totalSteps = computed(() => {
    return arrayA.value.length + arrayB.value.length + 1; // +1 для финального шага
  });
  
  const currentActionDescription = computed(() => {
    if (animationState.value === 'idle') {
      return 'Ожидание запуска анимации';
    } else if (animationState.value === 'comparing') {
      if (pointerA.value < arrayA.value.length && pointerB.value < arrayB.value.length) {
        return `Сравниваем A[${pointerA.value}] = ${arrayA.value[pointerA.value]} и B[${pointerB.value}] = ${arrayB.value[pointerB.value]}`;
      } else {
        return 'Один из массивов полностью обработан';
      }
    } else if (animationState.value === 'adding') {
      const lastElement = resultArray.value[resultArray.value.length - 1];
      return `Добавляем ${lastElement} в результирующий массив`;
    } else if (animationState.value === 'finished') {
      return 'Алгоритм завершен';
    }
    return '';
  });
  
  // Функция для запуска анимации алгоритма слияния
  function startAnimation() {
    if (isAnimating.value) return;
    
    isAnimating.value = true;
    resetAnimation();
    
    const delay = 1100 - animationSpeed.value * 100; // 100ms to 1000ms
    
    animationInterval.value = setInterval(() => {
      if (!performNextStep()) {
        stopAnimation();
      }
    }, delay);
  }
  
  // Остановка анимации
  function stopAnimation() {
    clearInterval(animationInterval.value);
    isAnimating.value = false;
  }
  
  // Сброс анимации
  function resetAnimation() {
    stopAnimation();
    resultArray.value = [];
    pointerA.value = 0;
    pointerB.value = 0;
    processedA.value = [];
    processedB.value = [];
    animationState.value = 'idle';
    animationStep.value = 0;
    currentExplanation.value = 'Алгоритм еще не запущен. Нажмите "Запустить анимацию" или "Следующий шаг".';
  }
  
  // Выполнение одного шага алгоритма
  function nextStep() {
    if (isAnimating.value) return;
    performNextStep();
  }
  
  function performNextStep() {
    if (animationStep.value >= totalSteps.value) {
      animationState.value = 'finished';
      currentExplanation.value = 'Алгоритм завершен. Получен отсортированный массив, содержащий все элементы из обоих исходных массивов.';
      return false;
    }
    
    animationStep.value++;
    
    // Фаза 1: Сравнение и добавление из обоих массивов
    if (pointerA.value < arrayA.value.length && pointerB.value < arrayB.value.length) {
      animationState.value = 'comparing';
      
      // Подготавливаем объяснение следующего шага
      currentExplanation.value = `Сравниваем A[${pointerA.value}] = ${arrayA.value[pointerA.value]} и B[${pointerB.value}] = ${arrayB.value[pointerB.value]}. `;
      
      // Небольшая задержка для визуализации сравнения
      setTimeout(() => {
        // Выбираем меньший элемент
        if (arrayA.value[pointerA.value] <= arrayB.value[pointerB.value]) {
          animationState.value = 'adding';
          resultArray.value.push(arrayA.value[pointerA.value]);
          currentExplanation.value += `A[${pointerA.value}] меньше или равно B[${pointerB.value}], поэтому добавляем ${arrayA.value[pointerA.value]} в результат и увеличиваем указатель i.`;
          processedA.value.push(pointerA.value);
          pointerA.value++;
        } else {
          animationState.value = 'adding';
          resultArray.value.push(arrayB.value[pointerB.value]);
          currentExplanation.value += `B[${pointerB.value}] меньше A[${pointerA.value}], поэтому добавляем ${arrayB.value[pointerB.value]} в результат и увеличиваем указатель j.`;
          processedB.value.push(pointerB.value);
          pointerB.value++;
        }
      }, 500);
      
      return true;
    }
    
    // Фаза 2: Добавление оставшихся элементов из массива A
    else if (pointerA.value < arrayA.value.length) {
      animationState.value = 'comparing';
      currentExplanation.value = `Массив B полностью обработан. Продолжаем добавлять оставшиеся элементы из массива A. `;
      
      setTimeout(() => {
        animationState.value = 'adding';
        resultArray.value.push(arrayA.value[pointerA.value]);
        currentExplanation.value += `Добавляем A[${pointerA.value}] = ${arrayA.value[pointerA.value]} в результат.`;
        processedA.value.push(pointerA.value);
        pointerA.value++;
      }, 500);
      
      return true;
    }
    
    // Фаза 3: Добавление оставшихся элементов из массива B
    else if (pointerB.value < arrayB.value.length) {
      animationState.value = 'comparing';
      currentExplanation.value = `Массив A полностью обработан. Продолжаем добавлять оставшиеся элементы из массива B. `;
      
      setTimeout(() => {
        animationState.value = 'adding';
        resultArray.value.push(arrayB.value[pointerB.value]);
        currentExplanation.value += `Добавляем B[${pointerB.value}] = ${arrayB.value[pointerB.value]} в результат.`;
        processedB.value.push(pointerB.value);
        pointerB.value++;
      }, 500);
      
      return true;
    }
    
    // Завершение алгоритма
    else {
      animationState.value = 'finished';
      currentExplanation.value = 'Алгоритм завершен. Получен отсортированный массив, содержащий все элементы из обоих исходных массивов.';
      return false;
    }
  }
  
  // Применение пользовательских массивов
  function applyCustomArrays() {
    try {
      const newArrayA = customArrayA.value.split(',').map(item => parseFloat(item.trim())).filter(num => !isNaN(num));
      const newArrayB = customArrayB.value.split(',').map(item => parseFloat(item.trim())).filter(num => !isNaN(num));
      
      // Проверка на отсортированность массивов
      if (!isSorted(newArrayA) || !isSorted(newArrayB)) {
        alert('Введенные массивы должны быть отсортированы по возрастанию!');
        return;
      }
      
      arrayA.value = newArrayA;
      arrayB.value = newArrayB;
      resetAnimation();
    } catch (e) {
      alert('Ошибка при разборе массивов. Убедитесь, что вы вводите числа, разделенные запятыми.' + e.message);
    }
  }
  
  // Проверка, отсортирован ли массив
  function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i-1]) return false;
    }
    return true;
  }
  
  // Сброс к исходным массивам
  function resetToDefault() {
    arrayA.value = [...defaultArrayA];
    arrayB.value = [...defaultArrayB];
    customArrayA.value = defaultArrayA.join(', ');
    customArrayB.value = defaultArrayB.join(', ');
    resetAnimation();
  }
  
  // Очистка интервала при уничтожении компонента
  onBeforeUnmount(() => {
    clearInterval(animationInterval.value);
  });
  
  // Отслеживание изменений массивов для обновления объяснений
  watch([arrayA, arrayB], () => {
    resetAnimation();
  });
  </script>
  
  <style scoped>
  .merge-arrays-demo {
    font-family: 'Arial', sans-serif;
    max-width: 1000px;
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
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-top: 30px;
  }
  
  .description-block {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
  }
  
  .code-snippet {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
  }
  
  .code-snippet pre {
    margin: 0;
  }
  
  .algorithm-description {
    background-color: #e1f5fe;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
  }
  
  .algorithm-description ol,
  .algorithm-description ul {
    padding-left: 25px;
    line-height: 1.6;
  }
  
  .solution-code {
    margin-bottom: 30px;
  }
  
  .solution-code pre {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    line-height: 1.5;
    margin: 0;
  }
  
  .interactive-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .custom-arrays,
  .animation-controls {
    flex: 1;
    min-width: 300px;
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
  }
  
  .input-group {
    margin-bottom: 10px;
  }
  
  .input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .input-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    padding: 8px 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 10px;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  
  button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .speed-control {
    margin-top: 10px;
  }
  
  .speed-control label {
    display: block;
    margin-bottom: 5px;
  }
  
  .visualization-container {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .arrays-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 20px;
  }
  
  .array {
    position: relative;
    margin-bottom: 10px;
  }
  
  .array-label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .array-elements {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .array-element {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 2px solid #3498db;
    border-radius: 6px;
    font-weight: bold;
    transition: all 0.3s;
  }
  
  .array-element.current {
    background-color: #fff8e1;
    border-color: #ffc107;
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(255, 193, 7, 0.5);
  }
  
  .array-element.processed {
    opacity: 0.7;
    border-color: #a5d6a7;
  }
  
  .array-element.just-added {
    background-color: #e8f5e9;
    border-color: #4caf50;
    animation: pulse 1s;
  }
  
  .pointer {
    position: absolute;
    bottom: -25px;
    transform: translateX(-50%);
    font-size: 24px;
    color: #e74c3c;
    font-weight: bold;
    transition: left 0.3s;
  }
  
  .pointer-label {
    position: absolute;
    bottom: -45px;
    transform: translateX(-50%);
    font-size: 14px;
    color: #e74c3c;
    transition: left 0.3s;
  }
  
  .animation-status {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #e3f2fd;
    border-radius: 6px;
  }
  
  .step-counter {
    font-weight: bold;
  }
  
  .current-action {
    color: #1976d2;
  }
  
  .explanation-container {
    background-color: #fff;
    padding: 15px;
    border-radius: 6px;
    margin-bottom: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .explanation-container h3 {
    margin-top: 0;
    color: #2c3e50;
  }
  
  .explanation {
    line-height: 1.6;
  }
  
  .common-mistakes,
  .recommendations,
  .additional-tasks {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .common-mistakes ul,
  .recommendations ol,
  .additional-tasks ul {
    padding-left: 25px;
    line-height: 1.6;
  }
  
  .common-mistakes li,
  .recommendations li,
  .additional-tasks li {
    margin-bottom: 10px;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  @media (max-width: 768px) {
    .interactive-controls {
      flex-direction: column;
    }
    
    .custom-arrays,
    .animation-controls {
      width: 100%;
    }
    
    .array-elements {
      overflow-x: auto;
      padding-bottom: 50px; /* Для указателей */
    }
  }
  </style>