<template>
    <div class="algorithm-demo">
      <h1>Разделение игроков по наличию команды</h1>
      
      <div class="description">
        <p>Эта демонстрация показывает, как разделить массив игроков на две группы:</p>
        <ul>
          <li>Игроки с командой (squad не null)</li>
          <li>Игроки без команды (squad равен null)</li>
        </ul>
      </div>
      
      <div class="input-data">
        <h2>Исходные данные</h2>
        <pre class="code">{{ JSON.stringify(initialPlayers, null, 2) }}</pre>
      </div>
      
      <div class="algorithm-selection">
        <h2>Выберите алгоритм</h2>
        <div class="algorithm-buttons">
          <button 
            v-for="algorithm in algorithms" 
            :key="algorithm.id"
            :class="['algorithm-button', { active: selectedAlgorithm === algorithm.id }]"
            @click="selectAlgorithm(algorithm.id)"
          >
            {{ algorithm.name }}
          </button>
        </div>
      </div>
      
      <div class="algorithm-explanation">
        <h2>Объяснение алгоритма</h2>
        <div class="explanation-content">
          <p>{{ selectedAlgorithmObject.description }}</p>
          <div class="algorithm-code">
            <h3>Код</h3>
            <pre class="code">{{ selectedAlgorithmObject.code }}</pre>
          </div>
          <div class="complexity">
            <h3>Сложность</h3>
            <p>{{ selectedAlgorithmObject.complexity }}</p>
          </div>
        </div>
      </div>
      
      <div class="visualization">
        <h2>Визуализация алгоритма</h2>
        <div class="controls">
          <button 
            class="control-button"
            @click="startVisualization" 
            :disabled="isRunning"
          >
            Запустить визуализацию
          </button>
          <button 
            class="control-button"
            @click="resetVisualization"
            :disabled="!hasRun"
          >
            Сбросить
          </button>
        </div>
        
        <div class="animation-container">
          <div class="animation-step">
            <div class="array-container">
              <h3>Исходный массив</h3>
              <div class="players-array">
                <div 
                  v-for="(player, index) in players" 
                  :key="player.id"
                  :class="['player-card', { 
                    'with-squad': player.squad !== null,
                    'without-squad': player.squad === null,
                    'current': currentIndex === index && isRunning,
                    'processed': processedIndices.includes(index)
                  }]"
                >
                  <div class="player-id">ID: {{ player.id }}</div>
                  <div class="player-squad">Squad: {{ player.squad !== null ? player.squad : 'null' }}</div>
                </div>
              </div>
            </div>
            
            <div class="processing-container" v-if="isRunning || hasRun">
              <div class="process-arrow">
                <div class="arrow-body"></div>
                <div class="arrow-head"></div>
              </div>
              <div class="process-description">
                {{ currentStepDescription }}
              </div>
            </div>
            
            <div class="result-container" v-if="isRunning || hasRun">
              <div class="result-arrays">
                <div class="result-array">
                  <h3>Игроки с командой</h3>
                  <div class="players-result">
                    <div 
                      v-for="player in visualResult[0]" 
                      :key="player.id"
                      class="player-card with-squad"
                      :class="{ 'just-added': justAddedWithSquad.includes(player.id) }"
                    >
                      <div class="player-id">ID: {{ player.id }}</div>
                      <div class="player-squad">Squad: {{ player.squad }}</div>
                    </div>
                    <div class="empty-message" v-if="visualResult[0].length === 0">
                      Пока пусто
                    </div>
                  </div>
                </div>
                
                <div class="result-array">
                  <h3>Игроки без команды</h3>
                  <div class="players-result">
                    <div 
                      v-for="player in visualResult[1]" 
                      :key="player.id"
                      class="player-card without-squad"
                      :class="{ 'just-added': justAddedWithoutSquad.includes(player.id) }"
                    >
                      <div class="player-id">ID: {{ player.id }}</div>
                      <div class="player-squad">Squad: {{ player.squad }}</div>
                    </div>
                    <div class="empty-message" v-if="visualResult[1].length === 0">
                      Пока пусто
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="comparison">
        <h2>Сравнение подходов</h2>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Алгоритм</th>
              <th>Преимущества</th>
              <th>Недостатки</th>
              <th>Рекомендуется для</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="algorithm in algorithms" :key="algorithm.id">
              <td>{{ algorithm.name }}</td>
              <td>
                <ul class="comparison-list">
                  <li v-for="(advantage, index) in algorithm.advantages" :key="index">
                    {{ advantage }}
                  </li>
                </ul>
              </td>
              <td>
                <ul class="comparison-list">
                  <li v-for="(disadvantage, index) in algorithm.disadvantages" :key="index">
                    {{ disadvantage }}
                  </li>
                </ul>
              </td>
              <td>{{ algorithm.recommendation }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="pitfalls">
        <h2>Подводные камни</h2>
        <div class="pitfall-container">
          <div class="pitfall-item" v-for="(pitfall, index) in pitfalls" :key="index">
            <h3>{{ pitfall.title }}</h3>
            <p>{{ pitfall.description }}</p>
            <div class="pitfall-code" v-if="pitfall.code">
              <pre class="code">{{ pitfall.code }}</pre>
            </div>
            <div class="pitfall-solution" v-if="pitfall.solution">
              <h4>Решение:</h4>
              <p>{{ pitfall.solution }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="conclusion">
        <h2>Итоги и рекомендации</h2>
        <p>При решении задач на разделение элементов массива на группы:</p>
        <ol>
          <li><strong>Для небольших массивов и простого кода:</strong> Используйте метод <code>filter</code> дважды. Это самый чистый и понятный подход.</li>
          <li><strong>Для больших массивов и оптимизации производительности:</strong> Используйте метод <code>reduce</code> или один проход циклом для минимизации проходов по массиву.</li>
          <li><strong>Для командной работы и поддерживаемости:</strong> Предпочитайте декларативный подход с использованием <code>filter</code>, так как он более читаемый и понятный для других разработчиков.</li>
          <li><strong>При работе с большими объектами:</strong> Обратите внимание на потенциальные проблемы с памятью из-за клонирования объектов и рассмотрите возможность использования ссылок.</li>
        </ol>
        <p>В большинстве случаев простота и читаемость кода важнее, чем минимальная оптимизация производительности. Выбирайте решение, которое будет понятно вам и вашей команде через 6 месяцев.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  
  const initialPlayers = [
    { id: 2, squad: 1 },
    { id: 3, squad: 1 },
    { id: 4, squad: null },
    { id: 5, squad: 2 },
    { id: 6, squad: 1 },
    { id: 7, squad: 2 },
  ];
  
  const players = ref([...initialPlayers]);
  const selectedAlgorithm = ref('filter');
  const isRunning = ref(false);
  const hasRun = ref(false);
  const currentIndex = ref(-1);
  const processedIndices = ref([]);
  const visualResult = ref([[], []]);
  const justAddedWithSquad = ref([]);
  const justAddedWithoutSquad = ref([]);
  const currentStepDescription = ref('');
  
  const algorithms = [
    {
      id: 'filter',
      name: 'Двойной filter',
      code: `const groupPlayersBySquad = (players) => {
    const playersWithSquad = players.filter(
      player => player.squad !== null
    );
    const playersWithoutSquad = players.filter(
      player => player.squad === null
    );
    
    return [playersWithSquad, playersWithoutSquad];
  };`,
      description: 'Использует метод filter() дважды для разделения массива. В первом вызове отбираются игроки с командой, во втором - игроки без команды. Простой и декларативный подход.',
      complexity: 'Временная сложность: O(2n), где n - количество игроков. Метод filter проходит по массиву дважды.',
      advantages: [
        'Прост для понимания и чтения',
        'Декларативный подход',
        'Краткий код',
        'Не меняет исходный массив'
      ],
      disadvantages: [
        'Проходит по массиву дважды (2n операций)',
        'Создаёт больше промежуточных массивов'
      ],
      recommendation: 'Небольшие массивы и случаи, когда важна читаемость кода'
    },
    {
      id: 'forLoop',
      name: 'Цикл for',
      code: `const groupPlayersBySquad = (players) => {
    const playersWithSquad = [];
    const playersWithoutSquad = [];
    
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (player.squad !== null) {
        playersWithSquad.push(player);
      } else {
        playersWithoutSquad.push(player);
      }
    }
    
    return [playersWithSquad, playersWithoutSquad];
  };`,
      description: 'Использует один проход с циклом for для распределения игроков по двум массивам. По мере прохождения по массиву, каждый игрок добавляется в соответствующий массив результатов.',
      complexity: 'Временная сложность: O(n), где n - количество игроков. Метод проходит по массиву один раз.',
      advantages: [
        'Только один проход по массиву',
        'Хорошая производительность',
        'Понятная логика',
        'Меньшее потребление памяти'
      ],
      disadvantages: [
        'Менее декларативный подход',
        'Код более многословный'
      ],
      recommendation: 'Средние и большие массивы, где важна производительность'
    },
    {
      id: 'reduce',
      name: 'Метод reduce',
      code: `const groupPlayersBySquad = (players) => {
    return players.reduce(
      (result, player) => {
        result[player.squad !== null ? 0 : 1].push(player);
        return result;
      },
      [[], []]
    );
  };`,
      description: 'Использует метод reduce() для группировки игроков за один проход. Начинаем с массива из двух пустых массивов [[], []] и добавляем каждого игрока в соответствующий подмассив.',
      complexity: 'Временная сложность: O(n), где n - количество игроков. Метод проходит по массиву один раз.',
      advantages: [
        'Один проход по массиву',
        'Функциональный подход',
        'Лаконичный код',
        'Не требует внешних переменных'
      ],
      disadvantages: [
        'Менее читаемый для новичков',
        'Сложнее понять логику с первого взгляда'
      ],
      recommendation: 'Средние и большие массивы, команды с опытом функционального программирования'
    },
    {
      id: 'forEach',
      name: 'Метод forEach',
      code: `const groupPlayersBySquad = (players) => {
    const playersWithSquad = [];
    const playersWithoutSquad = [];
    
    players.forEach(player => {
      if (player.squad !== null) {
        playersWithSquad.push(player);
      } else {
        playersWithoutSquad.push(player);
      }
    });
    
    return [playersWithSquad, playersWithoutSquad];
  };`,
      description: 'Использует метод forEach() для прохода по массиву один раз и распределения игроков. Сочетает императивный и декларативный стили.',
      complexity: 'Временная сложность: O(n), где n - количество игроков. Метод проходит по массиву один раз.',
      advantages: [
        'Один проход по массиву',
        'Более современный синтаксис, чем for',
        'Легко читаемый код',
        'Хорошая производительность'
      ],
      disadvantages: [
        'Нельзя досрочно прервать обработку (в отличие от for)',
        'Требует создания внешних переменных'
      ],
      recommendation: 'Общие случаи с хорошим балансом читаемости и производительности'
    }
  ];
  
  const pitfalls = [
    {
      title: 'Мутация исходных данных',
      description: 'При работе с объектами важно помнить, что даже при создании новых массивов, объекты внутри них - это ссылки на исходные объекты. Изменение свойств в отфильтрованном массиве повлияет на исходные данные.',
      code: `// Опасно!
  const playersWithSquad = players.filter(player => player.squad !== null);
  playersWithSquad.forEach(player => player.status = 'active');
  
  // Теперь исходные данные тоже изменились!`,
      solution: 'Если нужно изменять объекты, сначала создайте их глубокие копии с помощью JSON.parse(JSON.stringify()) или structuredClone() для небольших объектов, или используйте библиотеки для глубокого клонирования.'
    },
    {
      title: 'Проверка на null',
      description: 'В JavaScript null и undefined - это разные значения. Если условие требует проверки именно на null, нужно использовать строгое сравнение (===).',
      code: `// Опасно! Это условие пропустит undefined
  if (player.squad != null) { ... }
  
  // Правильно - проверка только на null
  if (player.squad !== null) { ... }
  
  // Если надо проверить и null, и undefined
  if (player.squad != null) { ... }`,
      solution: 'Всегда используйте строгое сравнение (===) при проверке на null, если нет особых причин делать иначе. Уточните, должны ли считаться игроки с undefined также игроками без команды.'
    },
    {
      title: 'Производительность при больших массивах',
      description: 'Подход с двойным filter может значительно снизить производительность на очень больших массивах, так как проходит по всему массиву дважды.',
      code: `// Для 1 миллиона элементов:
  // Метод filter (неоптимально)
  const withSquad = players.filter(p => p.squad !== null);    // 1M операций
  const withoutSquad = players.filter(p => p.squad === null); // 1M операций
  
  // Один проход (оптимально)
  const result = players.reduce(
    (acc, p) => {
      acc[p.squad !== null ? 0 : 1].push(p);
      return acc;
    },
    [[], []]
  ); // 1M операций`,
      solution: 'Для массивов с более чем несколькими тысячами элементов рассмотрите возможность использования подхода с одним проходом (reduce, for или forEach).'
    },
    {
      title: 'Проблемы с пустыми массивами',
      description: 'Не забывайте обрабатывать случай, когда входной массив может быть пустым или undefined.',
      code: `// Опасно! Вызовет ошибку, если players будет undefined
  const result = groupPlayersBySquad(players);
  
  // Безопасный вариант
  const groupPlayersBySquad = (players = []) => {
    if (!players || !Array.isArray(players)) {
      return [[], []];
    }
    
    // ... основная логика
  };`,
      solution: 'Добавьте проверку входных данных в начале функции. Установите значение по умолчанию для параметра функции и проверяйте, что входное значение является массивом.'
    },
    {
      title: 'Сохранение порядка элементов',
      description: 'Если порядок элементов важен, обратите внимание, что все представленные алгоритмы сохраняют порядок следования элементов в исходном массиве. Но некоторые методы сортировки могут нарушить этот порядок.',
      solution: 'Если вам необходимо сохранить порядок, используйте методы filter, forEach, reduce или обычный цикл for, которые гарантируют сохранение исходного порядка.'
    }
  ];
  
  const selectedAlgorithmObject = computed(() => {
    return algorithms.find(algorithm => algorithm.id === selectedAlgorithm.value);
  });
  
  function selectAlgorithm(algorithmId) {
    selectedAlgorithm.value = algorithmId;
    resetVisualization();
  }
  
  function resetVisualization() {
    players.value = [...initialPlayers];
    isRunning.value = false;
    hasRun.value = false;
    currentIndex.value = -1;
    processedIndices.value = [];
    visualResult.value = [[], []];
    justAddedWithSquad.value = [];
    justAddedWithoutSquad.value = [];
    currentStepDescription.value = '';
  }
  
  async function startVisualization() {
    resetVisualization();
    isRunning.value = true;
    
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    switch (selectedAlgorithm.value) {
      case 'filter':
        await visualizeFilter();
        break;
      case 'forLoop':
        await visualizeForLoop();
        break;
      case 'reduce':
        await visualizeReduce();
        break;
      case 'forEach':
        await visualizeForEach();
        break;
    }
    
    isRunning.value = false;
    hasRun.value = true;
    
    async function visualizeFilter() {
      // Первый проход - фильтрация игроков с командой
      currentStepDescription.value = 'Выполняем первый проход filter для игроков с командой (squad !== null)';
      await delay(1000);
      
      for (let i = 0; i < players.value.length; i++) {
        currentIndex.value = i;
        const player = players.value[i];
        
        await delay(800);
        
        if (player.squad !== null) {
          currentStepDescription.value = `Игрок ${player.id} имеет команду (squad = ${player.squad}), добавляем в первую группу`;
          visualResult.value[0].push(player);
          justAddedWithSquad.value = [player.id];
        } else {
          currentStepDescription.value = `Игрок ${player.id} не имеет команды (squad = null), пропускаем на первом проходе`;
        }
        
        processedIndices.value.push(i);
        await delay(800);
      }
      
      // Сбрасываем для второго прохода
      currentIndex.value = -1;
      processedIndices.value = [];
      justAddedWithSquad.value = [];
      
      await delay(1000);
      
      // Второй проход - фильтрация игроков без команды
      currentStepDescription.value = 'Выполняем второй проход filter для игроков без команды (squad === null)';
      await delay(1000);
      
      for (let i = 0; i < players.value.length; i++) {
        currentIndex.value = i;
        const player = players.value[i];
        
        await delay(800);
        
        if (player.squad === null) {
          currentStepDescription.value = `Игрок ${player.id} не имеет команды (squad = null), добавляем во вторую группу`;
          visualResult.value[1].push(player);
          justAddedWithoutSquad.value = [player.id];
        } else {
          currentStepDescription.value = `Игрок ${player.id} имеет команду (squad = ${player.squad}), пропускаем на втором проходе`;
        }
        
        processedIndices.value.push(i);
        await delay(800);
        justAddedWithoutSquad.value = [];
      }
      
      currentStepDescription.value = 'Операция завершена. Игроки разделены на две группы.';
    }
    
    async function visualizeForLoop() {
      currentStepDescription.value = 'Проходим по массиву с помощью цикла for и распределяем игроков в соответствующие группы';
      await delay(1000);
      
      for (let i = 0; i < players.value.length; i++) {
        currentIndex.value = i;
        const player = players.value[i];
        
        await delay(800);
        
        if (player.squad !== null) {
          currentStepDescription.value = `Игрок ${player.id} имеет команду (squad = ${player.squad}), добавляем в первую группу`;
          visualResult.value[0].push(player);
          justAddedWithSquad.value = [player.id];
          await delay(500);
          justAddedWithSquad.value = [];
        } else {
          currentStepDescription.value = `Игрок ${player.id} не имеет команды (squad = null), добавляем во вторую группу`;
          visualResult.value[1].push(player);
          justAddedWithoutSquad.value = [player.id];
          await delay(500);
          justAddedWithoutSquad.value = [];
        }
        
        processedIndices.value.push(i);
        await delay(500);
      }
      
      currentStepDescription.value = 'Операция завершена. Игроки разделены на две группы за один проход.';
    }
    
    async function visualizeReduce() {
      currentStepDescription.value = 'Начинаем reduce с начальным значением [[], []]';
      const result = [[], []];
      await delay(1000);
      
      for (let i = 0; i < players.value.length; i++) {
        currentIndex.value = i;
        const player = players.value[i];
        
        await delay(800);
        
        if (player.squad !== null) {
          currentStepDescription.value = `Игрок ${player.id} имеет команду (squad = ${player.squad}), добавляем в result[0]`;
          result[0].push(player);
          visualResult.value = [...result];
          justAddedWithSquad.value = [player.id];
          await delay(500);
          justAddedWithSquad.value = [];
        } else {
          currentStepDescription.value = `Игрок ${player.id} не имеет команды (squad = null), добавляем в result[1]`;
          result[1].push(player);
          visualResult.value = [...result];
          justAddedWithoutSquad.value = [player.id];
          await delay(500);
          justAddedWithoutSquad.value = [];
        }
        
        processedIndices.value.push(i);
        await delay(500);
      }
      
      currentStepDescription.value = 'Reduce завершен. Возвращаем итоговый массив [playersWithSquad, playersWithoutSquad].';
    }
    
    async function visualizeForEach() {
      currentStepDescription.value = 'Проходим по массиву с помощью forEach и распределяем игроков';
      await delay(1000);
      
      for (let i = 0; i < players.value.length; i++) {
        currentIndex.value = i;
        const player = players.value[i];
        
        await delay(800);
        
        if (player.squad !== null) {
          currentStepDescription.value = `Игрок ${player.id} имеет команду (squad = ${player.squad}), добавляем в первую группу`;
          visualResult.value[0].push(player);
          justAddedWithSquad.value = [player.id];
          await delay(500);
          justAddedWithSquad.value = [];
        } else {
          currentStepDescription.value = `Игрок ${player.id} не имеет команды (squad = null), добавляем во вторую группу`;
          visualResult.value[1].push(player);
          justAddedWithoutSquad.value = [player.id];
          await delay(500);
          justAddedWithoutSquad.value = [];
        }
        
        processedIndices.value.push(i);
        await delay(500);
      }
      
      currentStepDescription.value = 'forEach завершен. Возвращаем массив [playersWithSquad, playersWithoutSquad].';
    }
  }
  
  // Сбрасываем добавленные элементы через некоторое время
  watch(justAddedWithSquad, (newValue) => {
    if (newValue.length > 0) {
      setTimeout(() => {
        justAddedWithSquad.value = [];
      }, 800);
    }
  });
  
  watch(justAddedWithoutSquad, (newValue) => {
    if (newValue.length > 0) {
      setTimeout(() => {
        justAddedWithoutSquad.value = [];
      }, 800);
    }
  });
  </script>
  
  <style scoped>
  .algorithm-demo {
    font-family: Arial, sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
    font-size: 2rem;
  }
  
  h2 {
    color: #3498db;
    border-bottom: 2px solid #3498db;
    padding-bottom: 8px;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  
  h3 {
    color: #2c3e50;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  .description {
    background-color: #e7f4ff;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .input-data {
    margin-bottom: 30px;
  }
  
  .code {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    line-height: 1.5;
  }
  
  .algorithm-selection {
    margin-bottom: 30px;
  }
  
  .algorithm-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 15px;
  }
  
  .algorithm-button {
    padding: 10px 20px;
    background-color: #f1f1f1;
    border: 2px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
  }
  
  .algorithm-button:hover {
    background-color: #e9e9e9;
    border-color: #ccc;
  }
  
  .algorithm-button.active {
    background-color: #3498db;
    color: white;
    border-color: #2980b9;
  }
  
  .algorithm-explanation {
    margin-bottom: 30px;
  }
  
  .explanation-content {
    background-color: #ecf0f1;
    padding: 20px;
    border-radius: 8px;
  }
  
  .algorithm-code {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .complexity {
    background-color: #e7f4ff;
    padding: 10px 15px;
    border-radius: 8px;
    border-left: 4px solid #3498db;
  }
  
  .visualization {
    margin-bottom: 30px;
  }
  
  .controls {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
  }
  
  .control-button {
    padding: 10px 20px;
    background-color: #2ecc71;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
  }
  
  .control-button:hover {
    background-color: #27ae60;
  }
  
  .control-button:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
  
  .animation-container {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    min-height: 400px;
  }
  
  .animation-step {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .array-container {
    margin-bottom: 20px;
  }
  
  .players-array, .players-result {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
  }
  
  .player-card {
    padding: 10px;
    border-radius: 6px;
    background-color: #fff;
    border: 2px solid #ccc;
    min-width: 120px;
    position: relative;
    transition: all 0.3s ease;
  }
  
  .player-card.with-squad {
    border-color: #2ecc71;
    background-color: #eafaf1;
  }
  
  .player-card.without-squad {
    border-color: #e74c3c;
    background-color: #fdedec;
  }
  
  .player-card.current {
    box-shadow: 0 0 0 3px #3498db;
    transform: scale(1.05);
    z-index: 10;
  }
  
  .player-card.processed {
    opacity: 0.8;
  }
  
  .player-card.just-added {
    animation: pulse 0.8s;
  }
  
  .player-id {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .player-squad {
    color: #666;
  }
  
  .processing-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
  }
  
  .process-arrow {
    position: relative;
    width: 50px;
    height: 40px;
    margin-bottom: 10px;
  }
  
  .arrow-body {
    width: 2px;
    height: 30px;
    background-color: #3498db;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .arrow-head {
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid #3498db;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .process-description {
    color: #2c3e50;
    font-weight: bold;
    text-align: center;
    background-color: #e7f4ff;
    padding: 10px 15px;
    border-radius: 6px;
    border-left: 4px solid #3498db;
    max-width: 600px;
  }
  
  .result-container {
    margin-top: 20px;
  }
  
  .result-arrays {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .result-array {
    flex: 1;
    min-width: 300px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
  }
  
  .empty-message {
    color: #7f8c8d;
    font-style: italic;
    padding: 10px;
  }
  
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .comparison-table th,
  .comparison-table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  
  .comparison-table th {
    background-color: #3498db;
    color: white;
  }
  
  .comparison-table tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  .comparison-list {
    margin: 0;
    padding-left: 20px;
  }
  
  .comparison-list li {
    margin-bottom: 5px;
  }
  
  .pitfall-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .pitfall-item {
    background-color: #feecec;
    border-radius: 8px;
    padding: 15px;
    border-left: 4px solid #e74c3c;
  }
  
  .pitfall-item h3 {
    color: #c0392b;
    margin-top: 0;
  }
  
  .pitfall-code {
    margin: 15px 0;
  }
  
  .pitfall-solution {
    background-color: #eafaf1;
    padding: 10px;
    border-radius: 6px;
    border-left: 4px solid #2ecc71;
    margin-top: 15px;
  }
  
  .pitfall-solution h4 {
    color: #27ae60;
    margin: 0 0 10px 0;
  }
  
  .conclusion {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-top: 30px;
    border-left: 4px solid #9b59b6;
  }
  
  .conclusion ol {
    padding-left: 20px;
  }
  
  .conclusion li {
    margin-bottom: 10px;
    line-height: 1.6;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  
  @media (max-width: 768px) {
    .algorithm-button {
      flex: 1 0 40%;
    }
    
    .result-arrays {
      flex-direction: column;
    }
    
    .pitfall-container {
      grid-template-columns: 1fr;
    }
  }
  </style>