<template>
    <div class="algorithms-container">
      <h1>Основы алгоритмов</h1>
      <p class="intro">Интерактивное изучение основных алгоритмов и их визуализация</p>
  
      <div class="algorithm-selector">
        <button 
          v-for="algo in algorithms" 
          :key="algo.id"
          :class="{ active: currentAlgorithm === algo.id }"
          @click="currentAlgorithm = algo.id"
        >
          {{ algo.title }}
        </button>
      </div>
  
      <!-- Секция сортировок -->
      <div v-if="currentAlgorithm === 'sorting'" class="algorithm-section">
        <h2>Алгоритмы сортировки</h2>
        
        <div class="algo-type-selector">
          <button 
            v-for="sort in sortingAlgorithms" 
            :key="sort.id"
            :class="{ active: currentSortingAlgo === sort.id }"
            @click="selectSortingAlgorithm(sort.id)"
          >
            {{ sort.title }}
          </button>
        </div>
        
        <div class="algorithm-content">
          <div class="algorithm-info">
            <h3>{{ currentSortDetails.title }}</h3>
            <div class="complexity-badges">
              <div class="badge">
                <span class="badge-title">Временная сложность:</span>
                <span class="badge-value">{{ currentSortDetails.timeComplexity }}</span>
              </div>
              <div class="badge">
                <span class="badge-title">Пространственная сложность:</span>
                <span class="badge-value">{{ currentSortDetails.spaceComplexity }}</span>
              </div>
              <div class="badge">
                <span class="badge-title">Устойчивость:</span>
                <span class="badge-value">{{ currentSortDetails.stable ? 'Да' : 'Нет' }}</span>
              </div>
            </div>
            
            <p class="algorithm-description" v-html="currentSortDetails.description"></p>
            
            <div class="algorithm-steps">
              <h4>Принцип работы:</h4>
              <ol>
                <li v-for="(step, index) in currentSortDetails.steps" :key="index">
                  {{ step }}
                </li>
              </ol>
            </div>
            
            <div class="use-cases">
              <h4>Применение:</h4>
              <ul>
                <li v-for="(useCase, index) in currentSortDetails.useCases" :key="index">
                  {{ useCase }}
                </li>
              </ul>
            </div>
          </div>
          
          <div class="algorithm-visualization">
            <div class="controls">
              <button @click="resetVisualization" :disabled="isRunning">Сбросить</button>
              <button @click="runVisualization" :disabled="isRunning">Запустить</button>
              <button @click="stepVisualization" :disabled="isRunning || isFinished">Шаг</button>
              <label>
                Скорость:
                <input type="range" v-model="animationSpeed" min="1" max="10" :disabled="isRunning">
              </label>
            </div>
            
            <div class="visualization-container">
              <div class="array-container">
                <div 
                  v-for="(item, index) in visualArray" 
                  :key="index"
                  class="array-item"
                  :class="{
                    'current': currentIndices.includes(index),
                    'compared': comparedIndices.includes(index),
                    'sorted': sortedIndices.includes(index)
                  }"
                  :style="{ height: `${item * 3}px` }"
                >
                  {{ item }}
                </div>
              </div>
            </div>
            
            <div class="visualization-info">
              <div class="step-counter">Шаг: {{ stepCounter }}</div>
              <div class="operation-counter">Операций сравнения: {{ compareCounter }}</div>
              <div class="operation-counter">Операций перестановки: {{ swapCounter }}</div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Секция поиска -->
      <div v-if="currentAlgorithm === 'search'" class="algorithm-section">
        <h2>Алгоритмы поиска</h2>
        
        <div class="algo-type-selector">
          <button 
            v-for="search in searchAlgorithms" 
            :key="search.id"
            :class="{ active: currentSearchAlgo === search.id }"
            @click="selectSearchAlgorithm(search.id)"
          >
            {{ search.title }}
          </button>
        </div>
        
        <div class="algorithm-content">
          <div class="algorithm-info">
            <h3>{{ currentSearchDetails.title }}</h3>
            <div class="complexity-badges">
              <div class="badge">
                <span class="badge-title">Временная сложность:</span>
                <span class="badge-value">{{ currentSearchDetails.timeComplexity }}</span>
              </div>
              <div class="badge">
                <span class="badge-title">Пространственная сложность:</span>
                <span class="badge-value">{{ currentSearchDetails.spaceComplexity }}</span>
              </div>
              <div class="badge">
                <span class="badge-title">Требования:</span>
                <span class="badge-value">{{ currentSearchDetails.requirements }}</span>
              </div>
            </div>
            
            <p class="algorithm-description" v-html="currentSearchDetails.description"></p>
            
            <div class="algorithm-steps">
              <h4>Принцип работы:</h4>
              <ol>
                <li v-for="(step, index) in currentSearchDetails.steps" :key="index">
                  {{ step }}
                </li>
              </ol>
            </div>
            
            <div class="use-cases">
              <h4>Применение:</h4>
              <ul>
                <li v-for="(useCase, index) in currentSearchDetails.useCases" :key="index">
                  {{ useCase }}
                </li>
              </ul>
            </div>
          </div>
          
          <div class="algorithm-visualization">
            <div class="controls">
              <div class="search-controls">
                <input type="number" v-model.number="searchTarget" placeholder="Искомое число" min="1" max="99" :disabled="isRunning">
                <button @click="resetSearchVisualization" :disabled="isRunning">Сбросить</button>
                <button @click="runSearchVisualization" :disabled="isRunning || !searchTarget">Найти</button>
                <button @click="stepSearchVisualization" :disabled="isRunning || isFinished || !searchTarget">Шаг</button>
              </div>
              <label>
                Скорость:
                <input type="range" v-model="animationSpeed" min="1" max="10" :disabled="isRunning">
              </label>
            </div>
            
            <div class="visualization-container">
              <div class="array-container">
                <div 
                  v-for="(item, index) in searchArray" 
                  :key="index"
                  class="array-item"
                  :class="{
                    'current': searchCurrentIndices.includes(index),
                    'compared': searchComparedIndices.includes(index),
                    'found': foundIndex === index
                  }"
                >
                  {{ item }}
                </div>
              </div>
              <div class="search-pointers" v-if="currentSearchAlgo === 'binary'">
                <div class="pointer left" :style="{ left: `${leftPointerPosition}px` }">min</div>
                <div class="pointer middle" :style="{ left: `${middlePointerPosition}px` }">mid</div>
                <div class="pointer right" :style="{ left: `${rightPointerPosition}px` }">max</div>
              </div>
            </div>
            
            <div class="visualization-info">
              <div class="step-counter">Шаг: {{ searchStepCounter }}</div>
              <div class="operation-counter">Операций сравнения: {{ searchCompareCounter }}</div>
              <div class="result-message" v-if="searchResultMessage">{{ searchResultMessage }}</div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Секция графовых алгоритмов -->
      <div v-if="currentAlgorithm === 'graph'" class="algorithm-section">
        <h2>Графовые алгоритмы</h2>
        
        <div class="algo-type-selector">
          <button 
            v-for="graphAlgo in graphAlgorithms" 
            :key="graphAlgo.id"
            :class="{ active: currentGraphAlgo === graphAlgo.id }"
            @click="selectGraphAlgorithm(graphAlgo.id)"
          >
            {{ graphAlgo.title }}
          </button>
        </div>
        
        <div class="algorithm-content">
          <div class="algorithm-info">
            <h3>{{ currentGraphDetails.title }}</h3>
            <div class="complexity-badges">
              <div class="badge">
                <span class="badge-title">Временная сложность:</span>
                <span class="badge-value">{{ currentGraphDetails.timeComplexity }}</span>
              </div>
              <div class="badge">
                <span class="badge-title">Пространственная сложность:</span>
                <span class="badge-value">{{ currentGraphDetails.spaceComplexity }}</span>
              </div>
            </div>
            
            <p class="algorithm-description" v-html="currentGraphDetails.description"></p>
            
            <div class="algorithm-steps">
              <h4>Принцип работы:</h4>
              <ol>
                <li v-for="(step, index) in currentGraphDetails.steps" :key="index">
                  {{ step }}
                </li>
              </ol>
            </div>
            
            <div class="use-cases">
              <h4>Применение:</h4>
              <ul>
                <li v-for="(useCase, index) in currentGraphDetails.useCases" :key="index">
                  {{ useCase }}
                </li>
              </ul>
            </div>
          </div>
          
          <div class="algorithm-visualization">
            <div class="controls">
              <div class="graph-controls">
                <select v-model="startNode" :disabled="isRunning">
                  <option v-for="node in graphNodes" :key="node" :value="node">Начало: {{ node }}</option>
                </select>
                <select v-model="endNode" :disabled="isRunning || currentGraphAlgo === 'dfs' || currentGraphAlgo === 'bfs'">
                  <option v-for="node in graphNodes" :key="node" :value="node">Конец: {{ node }}</option>
                </select>
                <button @click="resetGraphVisualization" :disabled="isRunning">Сбросить</button>
                <button @click="runGraphVisualization" :disabled="isRunning || !startNode">Запустить</button>
                <button @click="stepGraphVisualization" :disabled="isRunning || isFinished || !startNode">Шаг</button>
              </div>
              <label>
                Скорость:
                <input type="range" v-model="animationSpeed" min="1" max="10" :disabled="isRunning">
              </label>
            </div>
            
            <div class="visualization-container graph-visualization">
              <svg class="graph-svg" viewBox="0 0 500 300">
                <!-- Ребра графа -->
                <g>
                  <line 
                    v-for="(edge, index) in graphEdges" 
                    :key="'edge-' + index"
                    :x1="nodePositions[edge.from].x"
                    :y1="nodePositions[edge.from].y"
                    :x2="nodePositions[edge.to].x"
                    :y2="nodePositions[edge.to].y"
                    :class="{
                      'edge-visited': visitedEdges.some(e => 
                        (e.from === edge.from && e.to === edge.to) || 
                        (e.from === edge.to && e.to === edge.from)
                      ),
                      'edge-path': pathEdges.some(e => 
                        (e.from === edge.from && e.to === edge.to) || 
                        (e.from === edge.to && e.to === edge.from)
                      )
                    }"
                  />
                  <text 
                    v-for="(edge, index) in graphEdges" 
                    :key="'edge-label-' + index"
                    :x="(nodePositions[edge.from].x + nodePositions[edge.to].x) / 2"
                    :y="(nodePositions[edge.from].y + nodePositions[edge.to].y) / 2 - 5"
                    class="edge-weight"
                  >
                    {{ edge.weight }}
                  </text>
                </g>
                
                <!-- Вершины графа -->
                <g>
                  <circle 
                    v-for="(position, node) in nodePositions" 
                    :key="'node-' + node"
                    :cx="position.x"
                    :cy="position.y"
                    r="20"
                    :class="{
                      'node-start': node === startNode,
                      'node-end': node === endNode,
                      'node-current': currentNode === node,
                      'node-visited': visitedNodes.includes(node),
                      'node-path': pathNodes.includes(node)
                    }"
                  />
                  <text 
                    v-for="(position, node) in nodePositions" 
                    :key="'node-label-' + node"
                    :x="position.x"
                    :y="position.y + 5"
                    text-anchor="middle"
                    class="node-label"
                  >
                    {{ node }}
                  </text>
                </g>
              </svg>
            </div>
            
            <div class="visualization-info">
              <div class="step-counter">Шаг: {{ graphStepCounter }}</div>
              <div class="queue-info" v-if="currentGraphAlgo === 'bfs' || currentGraphAlgo === 'dijkstra'">
                <span class="queue-label">Очередь:</span>
                <span class="queue-content">{{ queueDisplay }}</span>
              </div>
              <div class="stack-info" v-if="currentGraphAlgo === 'dfs'">
                <span class="stack-label">Стек:</span>
                <span class="stack-content">{{ stackDisplay }}</span>
              </div>
              <div class="distances-info" v-if="currentGraphAlgo === 'dijkstra'">
                <div class="distances-label">Расстояния:</div>
                <div class="distances-table">
                  <div v-for="(distance, node) in distances" :key="'dist-' + node" class="distance-item">
                    <span class="distance-node">{{ node }}:</span>
                    <span class="distance-value">{{ distance === Infinity ? '∞' : distance }}</span>
                  </div>
                </div>
              </div>
              <div class="result-message" v-if="graphResultMessage">{{ graphResultMessage }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Секция динамического программирования -->
      <div v-if="currentAlgorithm === 'dp'" class="algorithm-section">
        <h2>Динамическое программирование</h2>
        
        <div class="algo-type-selector">
          <button 
            v-for="dpAlgo in dpAlgorithms" 
            :key="dpAlgo.id"
            :class="{ active: currentDpAlgo === dpAlgo.id }"
            @click="selectDpAlgorithm(dpAlgo.id)"
          >
            {{ dpAlgo.title }}
          </button>
        </div>
        
        <div class="algorithm-content">
          <div class="algorithm-info">
            <h3>{{ currentDpDetails.title }}</h3>
            <div class="complexity-badges">
              <div class="badge">
                <span class="badge-title">Временная сложность:</span>
                <span class="badge-value">{{ currentDpDetails.timeComplexity }}</span>
              </div>
              <div class="badge">
                <span class="badge-title">Пространственная сложность:</span>
                <span class="badge-value">{{ currentDpDetails.spaceComplexity }}</span>
              </div>
            </div>
            
            <p class="algorithm-description" v-html="currentDpDetails.description"></p>
            
            <div class="algorithm-steps">
              <h4>Принцип работы:</h4>
              <ol>
                <li v-for="(step, index) in currentDpDetails.steps" :key="index">
                  {{ step }}
                </li>
              </ol>
            </div>
            
            <div class="use-cases">
              <h4>Применение:</h4>
              <ul>
                <li v-for="(useCase, index) in currentDpDetails.useCases" :key="index">
                  {{ useCase }}
                </li>
              </ul>
            </div>
          </div>
          
          <div class="algorithm-visualization">
            <div class="controls">
              <div class="dp-controls">
                <div v-if="currentDpAlgo === 'fibonacci'">
                  <input type="number" v-model.number="fibN" placeholder="Введите N" min="1" max="15" :disabled="isRunning">
                </div>
                <div v-if="currentDpAlgo === 'knapsack'">
                  <input type="number" v-model.number="knapsackCapacity" placeholder="Вместимость" min="1" max="20" :disabled="isRunning">
                </div>
                <button @click="resetDpVisualization" :disabled="isRunning">Сбросить</button>
                <button @click="runDpVisualization" :disabled="isRunning || (currentDpAlgo === 'fibonacci' && !fibN) || (currentDpAlgo === 'knapsack' && !knapsackCapacity)">Запустить</button>
                <button @click="stepDpVisualization" :disabled="isRunning || isFinished || (currentDpAlgo === 'fibonacci' && !fibN) || (currentDpAlgo === 'knapsack' && !knapsackCapacity)">Шаг</button>
              </div>
              <label>
                Скорость:
                <input type="range" v-model="animationSpeed" min="1" max="10" :disabled="isRunning">
              </label>
            </div>
            
            <div class="visualization-container">
              <div v-if="currentDpAlgo === 'fibonacci'" class="fibonacci-visualization">
                <div class="memoization-table">
                  <div class="table-header">Таблица мемоизации</div>
                  <div class="table-row">
                    <div class="table-cell header" v-for="i in fibN" :key="i">{{ i }}</div>
                  </div>
                  <div class="table-row">
                    <div 
                      v-for="i in fibN" 
                      :key="i" 
                      class="table-cell"
                      :class="{ 'current': fibCurrentIndices.includes(i), 'filled': fibMemo[i] !== undefined }"
                    >
                      {{ fibMemo[i] !== undefined ? fibMemo[i] : '' }}
                    </div>
                  </div>
                </div>
                
                <div class="fibonacci-tree">
                  <div class="tree-header">Дерево вызовов</div>
                  <div class="tree-container">
                    <svg class="tree-svg" :viewBox="`0 0 ${fibTreeWidth} ${fibTreeHeight}`">
                      <!-- Ребра дерева -->
                      <g>
                        <line 
                          v-for="(edge, index) in fibTreeEdges" 
                          :key="'tree-edge-' + index"
                          :x1="edge.x1"
                          :y1="edge.y1"
                          :x2="edge.x2"
                          :y2="edge.y2"
                          :class="{ 'tree-edge-active': fibTreeActiveEdges.includes(index) }"
                        />
                      </g>
                      
                      <!-- Узлы дерева -->
                      <g>
                        <circle 
                          v-for="(node, index) in fibTreeNodes" 
                          :key="'tree-node-' + index"
                          :cx="node.x"
                          :cy="node.y"
                          r="15"
                          :class="{
                            'tree-node-calculated': calculatedFibIndices.includes(node.value),
                            'tree-node-current': fibCurrentIndices.includes(node.value),
                            'tree-node-active': fibTreeActiveNodes.includes(index)
                          }"
                        />
                        <text 
                          v-for="(node, index) in fibTreeNodes" 
                          :key="'tree-node-label-' + index"
                          :x="node.x"
                          :y="node.y + 5"
                          text-anchor="middle"
                          class="tree-node-label"
                        >
                          fib({{ node.value }})
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div v-if="currentDpAlgo === 'knapsack'" class="knapsack-visualization">
                <div class="items-container">
                  <div class="items-header">Предметы</div>
                  <div class="items-list">
                    <div 
                      v-for="(item, index) in knapsackItems" 
                      :key="'item-' + index"
                      class="knapsack-item"
                      :class="{ 'item-selected': selectedItems.includes(index) }"
                    >
                      <div class="item-icon" :style="{ height: `${item.value * 5}px` }">{{ item.value }}</div>
                      <div class="item-details">
                        <div class="item-weight">Вес: {{ item.weight }}</div>
                        <div class="item-value">Ценность: {{ item.value }}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="dp-table-container">
                  <div class="dp-table-header">Таблица динамического программирования</div>
                  <div class="dp-table">
                    <div class="dp-table-row header">
                      <div class="dp-table-cell corner">Вес/Предмет</div>
                      <div 
                        v-for="w in knapsackCapacity + 1" 
                        :key="'header-' + (w - 1)"
                        class="dp-table-cell header"
                      >
                        {{ w - 1 }}
                      </div>
                    </div>
                    <div 
                      v-for="i in knapsackItems.length + 1" 
                      :key="'row-' + (i - 1)"
                      class="dp-table-row"
                    >
                      <div class="dp-table-cell header">{{ i - 1 }}</div>
                      <div 
                        v-for="j in knapsackCapacity + 1" 
                        :key="'cell-' + (i - 1) + '-' + (j - 1)"
                        class="dp-table-cell"
                        :class="{
                          'current': currentDpCell && currentDpCell.i === i - 1 && currentDpCell.j === j - 1,
                          'filled': dpTable[i - 1] && dpTable[i - 1][j - 1] !== undefined
                        }"
                      >
                        {{ dpTable[i - 1] && dpTable[i - 1][j - 1] !== undefined ? dpTable[i - 1][j - 1] : '' }}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="knapsack-result">
                  <div class="knapsack-capacity">
                    <div class="capacity-label">Вместимость рюкзака:</div>
                    <div class="capacity-value">{{ knapsackCapacity }}</div>
                  </div>
                  <div class="knapsack-sack" :style="{ height: `${knapsackCapacity * 10}px` }">
                    <div 
                      v-for="(item, index) in selectedItems" 
                      :key="'selected-' + index"
                      class="selected-item"
                      :style="{ 
                        height: `${knapsackItems[item].weight * 10}px`,
                        background: getItemColor(item)
                      }"
                    >
                      <span class="selected-item-value">{{ knapsackItems[item].value }}</span>
                    </div>
                  </div>
                  <div class="total-value">
                    <div class="value-label">Общая ценность:</div>
                    <div class="value-value">{{ selectedItemsValue }}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="visualization-info">
              <div class="step-counter">Шаг: {{ dpStepCounter }}</div>
              <div class="result-message" v-if="dpResultMessage">{{ dpResultMessage }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Секция жадных алгоритмов -->
      <div v-if="currentAlgorithm === 'greedy'" class="algorithm-section">
        <h2>Жадные алгоритмы</h2>
        
        <div class="algo-type-selector">
          <button 
            v-for="greedyAlgo in greedyAlgorithms" 
            :key="greedyAlgo.id"
            :class="{ active: currentGreedyAlgo === greedyAlgo.id }"
            @click="selectGreedyAlgorithm(greedyAlgo.id)"
          >
            {{ greedyAlgo.title }}
          </button>
        </div>
        
        <div class="algorithm-content">
          <div class="algorithm-info">
            <h3>{{ currentGreedyDetails.title }}</h3>
            <div class="complexity-badges">
              <div class="badge">
                <span class="badge-title">Временная сложность:</span>
                <span class="badge-value">{{ currentGreedyDetails.timeComplexity }}</span>
              </div>
              <div class="badge">
                <span class="badge-title">Пространственная сложность:</span>
                <span class="badge-value">{{ currentGreedyDetails.spaceComplexity }}</span>
              </div>
            </div>
            
            <p class="algorithm-description" v-html="currentGreedyDetails.description"></p>
            
            <div class="algorithm-steps">
              <h4>Принцип работы:</h4>
              <ol>
                <li v-for="(step, index) in currentGreedyDetails.steps" :key="index">
                  {{ step }}
                </li>
              </ol>
            </div>
            
            <div class="use-cases">
              <h4>Применение:</h4>
              <ul>
                <li v-for="(useCase, index) in currentGreedyDetails.useCases" :key="index">
                  {{ useCase }}
                </li>
              </ul>
            </div>
          </div>
          
          <div class="algorithm-visualization">
            <div class="controls">
              <div class="greedy-controls">
                <div v-if="currentGreedyAlgo === 'activity-selection'">
                  <!-- Временные интервалы генерируются автоматически -->
                </div>
                <div v-if="currentGreedyAlgo === 'huffman'">
                  <input type="text" v-model="huffmanInput" placeholder="Введите текст" maxlength="15" :disabled="isRunning">
                </div>
                <button @click="resetGreedyVisualization" :disabled="isRunning">Сбросить</button>
                <button @click="runGreedyVisualization" :disabled="isRunning || (currentGreedyAlgo === 'huffman' && !huffmanInput)">Запустить</button>
                <button @click="stepGreedyVisualization" :disabled="isRunning || isFinished || (currentGreedyAlgo === 'huffman' && !huffmanInput)">Шаг</button>
              </div>
              <label>
                Скорость:
                <input type="range" v-model="animationSpeed" min="1" max="10" :disabled="isRunning">
              </label>
            </div>
            
            <div class="visualization-container">
              <div v-if="currentGreedyAlgo === 'activity-selection'" class="activity-selection-visualization">
                <div class="timeline">
                  <div class="timeline-header">
                    <div v-for="i in 10" :key="i" class="time-marker">
                      <div class="marker-line"></div>
                      <div class="marker-label">{{ i - 1 }}</div>
                    </div>
                  </div>
                  <div class="activities">
                    <div 
                      v-for="(activity, index) in activities" 
                      :key="'activity-' + index"
                      class="activity"
                      :style="{
                        left: `${activity.start * 10}%`,
                        width: `${(activity.end - activity.start) * 10}%`
                      }"
                      :class="{
                        'current': currentActivityIndex === index,
                        'selected': selectedActivities.includes(index),
                        'rejected': rejectedActivities.includes(index)
                      }"
                    >
                      <div class="activity-label">A{{ index + 1 }}</div>
                      <div class="activity-time">{{ activity.start }}-{{ activity.end }}</div>
                    </div>
                  </div>
                </div>
                
                <div class="activities-info">
                  <div class="activities-header">Активности</div>
                  <div class="activities-table">
                    <div class="activities-row header">
                      <div class="activities-cell">ID</div>
                      <div class="activities-cell">Начало</div>
                      <div class="activities-cell">Конец</div>
                      <div class="activities-cell">Статус</div>
                    </div>
                    <div 
                      v-for="(activity, index) in activities" 
                      :key="'activity-info-' + index"
                      class="activities-row"
                      :class="{
                        'current': currentActivityIndex === index,
                        'selected': selectedActivities.includes(index),
                        'rejected': rejectedActivities.includes(index)
                      }"
                    >
                      <div class="activities-cell">A{{ index + 1 }}</div>
                      <div class="activities-cell">{{ activity.start }}</div>
                      <div class="activities-cell">{{ activity.end }}</div>
                      <div class="activities-cell status">
                        <span v-if="selectedActivities.includes(index)">Выбрана</span>
                        <span v-else-if="rejectedActivities.includes(index)">Отклонена</span>
                        <span v-else>-</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-if="currentGreedyAlgo === 'huffman'" class="huffman-visualization">
                <div class="frequency-table">
                  <div class="frequency-header">Частоты символов</div>
                  <div class="frequency-row header">
                    <div class="frequency-cell">Символ</div>
                    <div class="frequency-cell">Частота</div>
                    <div class="frequency-cell">Код</div>
                  </div>
                  <div 
                    v-for="(freq, char) in frequencies" 
                    :key="'freq-' + char"
                    class="frequency-row"
                    :class="{ 'current': currentHuffmanChar === char }"
                  >
                    <div class="frequency-cell">{{ char }}</div>
                    <div class="frequency-cell">{{ freq }}</div>
                    <div class="frequency-cell">{{ huffmanCodes[char] || '' }}</div>
                  </div>
                </div>
                
                <div class="huffman-tree">
                  <div class="tree-header">Дерево Хаффмана</div>
                  <div class="tree-container">
                    <svg class="tree-svg" :viewBox="`0 0 ${huffmanTreeWidth} ${huffmanTreeHeight}`">
                      <!-- Ребра дерева -->
                      <g>
                        <line 
                          v-for="(edge, index) in huffmanTreeEdges" 
                          :key="'huffman-edge-' + index"
                          :x1="edge.x1"
                          :y1="edge.y1"
                          :x2="edge.x2"
                          :y2="edge.y2"
                          :class="{ 'tree-edge-active': huffmanActiveEdges.includes(index) }"
                        />
                        <text 
                          v-for="(edge, index) in huffmanTreeEdges" 
                          :key="'huffman-edge-label-' + index"
                          :x="(edge.x1 + edge.x2) / 2"
                          :y="(edge.y1 + edge.y2) / 2 - 5"
                          text-anchor="middle"
                          class="edge-label"
                        >
                          {{ edge.label }}
                        </text>
                      </g>
                      
                      <!-- Узлы дерева -->
                      <g>
                        <circle 
                          v-for="(node, index) in huffmanTreeNodes" 
                          :key="'huffman-node-' + index"
                          :cx="node.x"
                          :cy="node.y"
                          r="15"
                          :class="{
                            'leaf-node': node.isLeaf,
                            'current-node': currentHuffmanNodes.includes(node.id)
                          }"
                        />
                        <text 
                          v-for="(node, index) in huffmanTreeNodes" 
                          :key="'huffman-node-label-' + index"
                          :x="node.x"
                          :y="node.y + 5"
                          text-anchor="middle"
                          class="tree-node-label"
                        >
                          {{ node.label }}
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
                
                <div class="encoded-result">
                  <div class="encoded-header">Результат кодирования</div>
                  <div class="original-text">
                    <div class="text-label">Исходный текст:</div>
                    <div class="text-content">{{ huffmanInput }}</div>
                    <div class="text-size">{{ huffmanInput.length * 8 }} бит</div>
                  </div>
                  <div class="encoded-text">
                    <div class="text-label">Закодированный текст:</div>
                    <div class="encoded-content">{{ encodedText }}</div>
                    <div class="text-size">{{ encodedTextLength }} бит</div>
                  </div>
                  <div class="compression-ratio">
                    <div class="ratio-label">Сжатие:</div>
                    <div class="ratio-value">{{ compressionRatio }}%</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="visualization-info">
              <div class="step-counter">Шаг: {{ greedyStepCounter }}</div>
              <div class="result-message" v-if="greedyResultMessage">{{ greedyResultMessage }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Основной выбор алгоритма
  const algorithms = [
    { id: 'sorting', title: 'Сортировки' },
    { id: 'search', title: 'Поиск' },
    { id: 'graph', title: 'Графы' },
    { id: 'dp', title: 'Динамическое программирование' },
    { id: 'greedy', title: 'Жадные алгоритмы' }
  ];
  
  const currentAlgorithm = ref('sorting');
  
  // Общие переменные для визуализации
  const isRunning = ref(false);
  const isFinished = ref(false);
  const animationSpeed = ref(5);
  const stepCounter = ref(0);
  const compareCounter = ref(0);
  const swapCounter = ref(0);
  
  // Переменные для асинхронной визуализации
  let visualizationInterval = null;
  
  // -----------------------------------------------
  // Алгоритмы сортировки
  // -----------------------------------------------
  const sortingAlgorithms = [
    { id: 'bubble', title: 'Сортировка пузырьком' },
    { id: 'quick', title: 'Быстрая сортировка' },
    { id: 'merge', title: 'Сортировка слиянием' },
    { id: 'insertion', title: 'Сортировка вставками' }
  ];
  
  const currentSortingAlgo = ref('bubble');
  const visualArray = ref([]);
  const originalArray = ref([]);
  const currentIndices = ref([]);
  const comparedIndices = ref([]);
  const sortedIndices = ref([]);
  
  // Описания алгоритмов сортировки
  const sortingDetails = {
    bubble: {
      title: 'Сортировка пузырьком',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      stable: true,
      description: 'Простой алгоритм сортировки, который многократно проходит через список, сравнивая соседние элементы и меняя их местами, если они расположены в неправильном порядке. Процесс повторяется до тех пор, пока список не будет отсортирован.',
      steps: [
        'Сравниваем соседние элементы. Если они не в правильном порядке, меняем их местами.',
        'Повторяем процесс для каждой пары соседних элементов от начала до конца списка.',
        'После завершения первого прохода самый большой элемент окажется в конце списка.',
        'Повторяем процесс для всех элементов, кроме последнего отсортированного.',
        'Продолжаем до тех пор, пока ни одной замены не произойдет за проход, что означает, что список отсортирован.'
      ],
      useCases: [
        'Образовательные цели для понимания базовых концепций сортировки',
        'Случаи, когда простота реализации важнее производительности',
        'Сортировка почти отсортированных массивов (в этом случае приближается к O(n))',
        'Небольшие массивы, где сложность O(n²) не критична'
      ]
    },
    quick: {
      title: 'Быстрая сортировка',
      timeComplexity: 'O(n log n), в худшем случае O(n²)',
      spaceComplexity: 'O(log n)',
      stable: false,
      description: 'Эффективный алгоритм сортировки, основанный на принципе "разделяй и властвуй". Выбирает опорный элемент и разделяет массив на две части: элементы меньше опорного и элементы больше опорного. Затем рекурсивно сортирует полученные подмассивы.',
      steps: [
        'Выбираем опорный элемент из массива (обычно последний элемент).',
        'Разделяем массив так, чтобы все элементы меньше опорного оказались слева, а все элементы больше опорного — справа.',
        'Рекурсивно применяем тот же алгоритм к подмассивам слева и справа от опорного элемента.',
        'Базовый случай рекурсии — массив из одного элемента или пустой массив, который уже отсортирован.'
      ],
      useCases: [
        'Общая сортировка массивов в большинстве практических случаев',
        'Встроенные функции сортировки во многих языках программирования',
        'Ситуации, где среднее время выполнения важнее гарантированного',
        'Сортировка больших объемов данных, когда пространственная эффективность имеет значение'
      ]
    },
    merge: {
      title: 'Сортировка слиянием',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      stable: true,
      description: 'Алгоритм "разделяй и властвуй", который разбивает массив пополам, рекурсивно сортирует каждую половину, а затем объединяет отсортированные половины. Гарантирует время выполнения O(n log n) даже в худшем случае.',
      steps: [
        'Разделяем массив на две равные половины (если возможно).',
        'Рекурсивно сортируем левую и правую половины.',
        'Объединяем две отсортированные половины в один отсортированный массив.',
        'При объединении сравниваем элементы из обеих половин и выбираем меньший для добавления в результат.'
      ],
      useCases: [
        'Случаи, когда требуется гарантированное время выполнения O(n log n)',
        'Внешняя сортировка больших объемов данных, которые не помещаются в память',
        'Приложения, где важна стабильность сортировки',
        'Параллельные вычисления, так как алгоритм хорошо поддается распараллеливанию'
      ]
    },
    insertion: {
      title: 'Сортировка вставками',
      timeComplexity: 'O(n²), в лучшем случае O(n)',
      spaceComplexity: 'O(1)',
      stable: true,
      description: 'Простой алгоритм сортировки, который строит отсортированный массив по одному элементу за раз. Эффективен для небольших массивов и почти отсортированных массивов.',
      steps: [
        'Начинаем со второго элемента, считая первый элемент уже отсортированным.',
        'Сравниваем текущий элемент с предыдущими элементами в отсортированной части массива.',
        'Сдвигаем все элементы, которые больше текущего, на одну позицию вправо.',
        'Вставляем текущий элемент в оставшуюся позицию.',
        'Повторяем для всех элементов массива.'
      ],
      useCases: [
        'Онлайн-алгоритмы, когда данные поступают в реальном времени',
        'Сортировка небольших массивов (быстрее многих сложных алгоритмов)',
        'Почти отсортированные массивы (приближается к O(n))',
        'Случаи, когда требуется простая реализация с минимальным использованием памяти'
      ]
    }
  };
  
  // Вычисляемое свойство для получения деталей текущего алгоритма сортировки
  const currentSortDetails = computed(() => {
    return sortingDetails[currentSortingAlgo.value];
  });
  
  // Функция для инициализации массива
  function initializeArray() {
    const array = [];
    for (let i = 0; i < 10; i++) {
      array.push(Math.floor(Math.random() * 90) + 10); // числа от 10 до 99
    }
    return array;
  }
  
  // Функция для выбора алгоритма сортировки
  function selectSortingAlgorithm(algoId) {
    currentSortingAlgo.value = algoId;
    resetVisualization();
  }
  
  // Функция для сброса визуализации
  function resetVisualization() {
    if (isRunning.value) return;
    
    clearInterval(visualizationInterval);
    isRunning.value = false;
    isFinished.value = false;
    stepCounter.value = 0;
    compareCounter.value = 0;
    swapCounter.value = 0;
    
    // Инициализация нового массива
    originalArray.value = initializeArray();
    visualArray.value = [...originalArray.value];
    
    // Сброс индексов
    currentIndices.value = [];
    comparedIndices.value = [];
    sortedIndices.value = [];
  }
  
  // Вспомогательная функция задержки для анимации
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Функция для запуска визуализации
  async function runVisualization() {
    if (isRunning.value || isFinished.value) return;
    
    isRunning.value = true;
    
    // Выбор соответствующего алгоритма сортировки
    switch (currentSortingAlgo.value) {
      case 'bubble':
        await visualizeBubbleSort();
        break;
      case 'quick':
        // Сброс для быстрой сортировки
        sortedIndices.value = [];
        await visualizeQuickSort(0, visualArray.value.length - 1);
        break;
      case 'merge':
        await visualizeMergeSort(0, visualArray.value.length - 1);
        break;
      case 'insertion':
        await visualizeInsertionSort();
        break;
    }
    
    // Отметка всех элементов как отсортированных
    sortedIndices.value = Array.from({ length: visualArray.value.length }, (_, i) => i);
    currentIndices.value = [];
    comparedIndices.value = [];
    
    isRunning.value = false;
    isFinished.value = true;
  }
  
  // Функция для визуализации одного шага сортировки
  function stepVisualization() {
    if (isRunning.value || isFinished.value) return;
    
    // Здесь будет реализация пошаговой визуализации
    // Это упрощенная версия, которая просто запускает полную визуализацию
    runVisualization();
  }
  
  // Визуализация сортировки пузырьком
  async function visualizeBubbleSort() {
    const n = visualArray.value.length;
    let swapped;
    
    for (let i = 0; i < n; i++) {
      swapped = false;
      
      for (let j = 0; j < n - i - 1; j++) {
        // Обновляем индексы для визуализации
        currentIndices.value = [j, j + 1];
        comparedIndices.value = [j, j + 1];
        stepCounter.value++;
        compareCounter.value++;
        
        await sleep(1000 / animationSpeed.value);
        
        if (visualArray.value[j] > visualArray.value[j + 1]) {
          // Меняем элементы местами
          [visualArray.value[j], visualArray.value[j + 1]] = [visualArray.value[j + 1], visualArray.value[j]];
          swapped = true;
          swapCounter.value++;
          
          await sleep(500 / animationSpeed.value);
        }
        
        // Очищаем индексы для сравнения
        comparedIndices.value = [];
      }
      
      // Отмечаем последний элемент как отсортированный
      sortedIndices.value.push(n - i - 1);
      
      // Если не было замен, массив отсортирован
      if (!swapped) break;
    }
    
    // Отмечаем оставшиеся элементы как отсортированные
    for (let i = 0; i < n; i++) {
      if (!sortedIndices.value.includes(i)) {
        sortedIndices.value.push(i);
      }
    }
    
    // Очищаем текущие индексы
    currentIndices.value = [];
  }
  
  // Визуализация быстрой сортировки
  async function visualizeQuickSort(left, right) {
    if (left >= right) return;
    
    const pivotIndex = await partition(left, right);
    sortedIndices.value.push(pivotIndex);
    
    await visualizeQuickSort(left, pivotIndex - 1);
    await visualizeQuickSort(pivotIndex + 1, right);
  }
  
  // Функция разделения для быстрой сортировки
  async function partition(left, right) {
    const pivot = visualArray.value[right];
    currentIndices.value = [right];
    stepCounter.value++;
    
    await sleep(1000 / animationSpeed.value);
    
    let i = left - 1;
    
    for (let j = left; j < right; j++) {
      comparedIndices.value = [j, right];
      compareCounter.value++;
      
      await sleep(500 / animationSpeed.value);
      
      if (visualArray.value[j] <= pivot) {
        i++;
        
        // Меняем элементы местами
        [visualArray.value[i], visualArray.value[j]] = [visualArray.value[j], visualArray.value[i]];
        swapCounter.value++;
        
        currentIndices.value = [i, j];
        await sleep(500 / animationSpeed.value);
      }
      
      comparedIndices.value = [];
    }
    
    // Меняем опорный элемент с элементом после всех меньших элементов
    [visualArray.value[i + 1], visualArray.value[right]] = [visualArray.value[right], visualArray.value[i + 1]];
    swapCounter.value++;
    
    currentIndices.value = [i + 1, right];
    await sleep(500 / animationSpeed.value);
    
    currentIndices.value = [];
    
    return i + 1;
  }
  
  // Визуализация сортировки слиянием
  async function visualizeMergeSort(left, right) {
    if (left >= right) return;
    
    const mid = Math.floor((left + right) / 2);
    
    // Визуализация разделения
    currentIndices.value = [left, mid, right];
    stepCounter.value++;
    await sleep(1000 / animationSpeed.value);
    
    // Рекурсивно сортируем левую и правую части
    await visualizeMergeSort(left, mid);
    await visualizeMergeSort(mid + 1, right);
    
    // Слияние частей
    await merge(left, mid, right);
  }
  
  // Функция слияния для сортировки слиянием
  async function merge(left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    
    // Создаем временные массивы
    const L = visualArray.value.slice(left, left + n1);
    const R = visualArray.value.slice(mid + 1, mid + 1 + n2);
    
    let i = 0, j = 0, k = left;
    
    // Слияние временных массивов обратно в основной массив
    while (i < n1 && j < n2) {
      comparedIndices.value = [left + i, mid + 1 + j];
      compareCounter.value++;
      
      await sleep(500 / animationSpeed.value);
      
      if (L[i] <= R[j]) {
        visualArray.value[k] = L[i];
        i++;
      } else {
        visualArray.value[k] = R[j];
        j++;
      }
      
      currentIndices.value = [k];
      swapCounter.value++;
      k++;
      
      await sleep(500 / animationSpeed.value);
    }
    
    // Копируем оставшиеся элементы из L, если они есть
    while (i < n1) {
      visualArray.value[k] = L[i];
      currentIndices.value = [k];
      swapCounter.value++;
      i++;
      k++;
      
      await sleep(500 / animationSpeed.value);
    }
    
    // Копируем оставшиеся элементы из R, если они есть
    while (j < n2) {
      visualArray.value[k] = R[j];
      currentIndices.value = [k];
      swapCounter.value++;
      j++;
      k++;
      
      await sleep(500 / animationSpeed.value);
    }
    
    // Отмечаем отсортированный диапазон
    for (let i = left; i <= right; i++) {
      if (!sortedIndices.value.includes(i)) {
        sortedIndices.value.push(i);
      }
    }
    
    comparedIndices.value = [];
  }
  
  // Визуализация сортировки вставками
  async function visualizeInsertionSort() {
    const n = visualArray.value.length;
    
    for (let i = 1; i < n; i++) {
      const key = visualArray.value[i];
      currentIndices.value = [i];
      stepCounter.value++;
      
      await sleep(1000 / animationSpeed.value);
      
      let j = i - 1;
      
      while (j >= 0 && visualArray.value[j] > key) {
        comparedIndices.value = [j, j + 1];
        compareCounter.value++;
        
        await sleep(500 / animationSpeed.value);
        
        visualArray.value[j + 1] = visualArray.value[j];
        swapCounter.value++;
        j--;
        
        await sleep(500 / animationSpeed.value);
      }
      
      visualArray.value[j + 1] = key;
      sortedIndices.value.push(i);
      
      comparedIndices.value = [];
      await sleep(500 / animationSpeed.value);
    }
    
    // Отмечаем первый элемент как отсортированный, если его еще нет
    if (!sortedIndices.value.includes(0)) {
      sortedIndices.value.push(0);
    }
  }
  
  // -----------------------------------------------
  // Алгоритмы поиска
  // -----------------------------------------------
  const searchAlgorithms = [
    { id: 'linear', title: 'Линейный поиск' },
    { id: 'binary', title: 'Бинарный поиск' }
  ];
  
  const currentSearchAlgo = ref('linear');
  const searchArray = ref([]);
  const searchTarget = ref(null);
  const searchCurrentIndices = ref([]);
  const searchComparedIndices = ref([]);
  const foundIndex = ref(-1);
  const searchStepCounter = ref(0);
  const searchCompareCounter = ref(0);
  const searchResultMessage = ref('');
  
  // Позиции указателей для бинарного поиска
  const leftPointerPosition = ref(0);
  const middlePointerPosition = ref(0);
  const rightPointerPosition = ref(0);
  
  // Описания алгоритмов поиска
  const searchDetails = {
    linear: {
      title: 'Линейный поиск',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      requirements: 'Нет особых требований',
      description: 'Самый простой алгоритм поиска, который последовательно проверяет каждый элемент в массиве, пока не найдет искомое значение или не достигнет конца массива.',
      steps: [
        'Начинаем с первого элемента массива.',
        'Сравниваем текущий элемент с искомым значением.',
        'Если элементы совпадают, возвращаем индекс текущего элемента.',
        'Если элементы не совпадают, переходим к следующему элементу.',
        'Повторяем шаги 2-4, пока не найдем элемент или не дойдем до конца массива.',
        'Если дошли до конца массива, а элемент не найден, возвращаем индикатор отсутствия элемента.'
      ],
      useCases: [
        'Поиск в неотсортированных массивах',
        'Поиск в небольших массивах, где накладные расходы на подготовку более сложных алгоритмов не оправданы',
        'Поиск в массивах, где элементы постоянно изменяются',
        'Ситуации, когда простота реализации важнее производительности'
      ]
    },
    binary: {
      title: 'Бинарный поиск',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      requirements: 'Отсортированный массив',
      description: 'Эффективный алгоритм поиска в отсортированном массиве, который работает по принципу "разделяй и властвуй". На каждом шаге алгоритм сравнивает искомое значение с элементом в середине массива и определяет, в какой половине нужно продолжать поиск.',
      steps: [
        'Определяем границы поиска: начало и конец массива.',
        'Находим средний элемент между текущими границами.',
        'Сравниваем средний элемент с искомым значением.',
        'Если элементы совпадают, возвращаем индекс среднего элемента.',
        'Если искомое значение меньше среднего элемента, продолжаем поиск в левой половине, обновляя верхнюю границу.',
        'Если искомое значение больше среднего элемента, продолжаем поиск в правой половине, обновляя нижнюю границу.',
        'Повторяем шаги 2-6, пока не найдем элемент или пока границы не пересекутся.',
        'Если границы пересеклись, а элемент не найден, возвращаем индикатор отсутствия элемента.'
      ],
      useCases: [
        'Поиск в больших отсортированных массивах данных',
        'Эффективный поиск в базах данных',
        'Поиск слов в словарях',
        'Определение позиции для вставки нового элемента в отсортированный массив'
      ]
    }
  };
  
  // Вычисляемое свойство для получения деталей текущего алгоритма поиска
  const currentSearchDetails = computed(() => {
    return searchDetails[currentSearchAlgo.value];
  });
  
  // Функция для выбора алгоритма поиска
  function selectSearchAlgorithm(algoId) {
    currentSearchAlgo.value = algoId;
    resetSearchVisualization();
  }
  
  // Функция для сброса визуализации поиска
  function resetSearchVisualization() {
    if (isRunning.value) return;
    
    clearInterval(visualizationInterval);
    isRunning.value = false;
    isFinished.value = false;
    searchStepCounter.value = 0;
    searchCompareCounter.value = 0;
    searchResultMessage.value = '';
    
    // Инициализация массива в зависимости от алгоритма
    if (currentSearchAlgo.value === 'linear') {
      searchArray.value = Array.from({ length: 10 }, () => Math.floor(Math.random() * 90) + 10);
    } else {
      // Для бинарного поиска нужен отсортированный массив
      searchArray.value = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);
    }
    
    searchCurrentIndices.value = [];
    searchComparedIndices.value = [];
    foundIndex.value = -1;
    
    // Сброс указателей
    leftPointerPosition.value = 0;
    middlePointerPosition.value = 0;
    rightPointerPosition.value = 0;
    
    // Сброс целевого значения
    searchTarget.value = null;
  }
  
  // Функция для запуска визуализации поиска
  async function runSearchVisualization() {
    if (isRunning.value || isFinished.value || !searchTarget.value) return;
    
    isRunning.value = true;
    
    switch (currentSearchAlgo.value) {
      case 'linear':
        await visualizeLinearSearch();
        break;
      case 'binary':
        await visualizeBinarySearch();
        break;
    }
    
    isRunning.value = false;
    isFinished.value = true;
  }
  
  // Функция для визуализации одного шага поиска
  function stepSearchVisualization() {
    if (isRunning.value || isFinished.value || !searchTarget.value) return;
    
    // Здесь будет реализация пошаговой визуализации
    // Это упрощенная версия, которая просто запускает полную визуализацию
    runSearchVisualization();
  }
  
  // Визуализация линейного поиска
  async function visualizeLinearSearch() {
    const target = searchTarget.value;
    
    for (let i = 0; i < searchArray.value.length; i++) {
      searchCurrentIndices.value = [i];
      searchStepCounter.value++;
      
      await sleep(1000 / animationSpeed.value);
      
      searchComparedIndices.value = [i];
      searchCompareCounter.value++;
      
      await sleep(500 / animationSpeed.value);
      
      if (searchArray.value[i] === target) {
        foundIndex.value = i;
        searchResultMessage.value = `Элемент ${target} найден на позиции ${i}`;
        return;
      }
      
      searchComparedIndices.value = [];
    }
    
    searchResultMessage.value = `Элемент ${target} не найден в массиве`;
  }
  
  // Визуализация бинарного поиска
  async function visualizeBinarySearch() {
    const target = searchTarget.value;
    let left = 0;
    let right = searchArray.value.length - 1;
    
    // Инициализация указателей
    updatePointers(left, Math.floor((left + right) / 2), right);
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      searchCurrentIndices.value = [mid];
      searchStepCounter.value++;
      
      await sleep(1000 / animationSpeed.value);
      
      searchComparedIndices.value = [mid];
      searchCompareCounter.value++;
      
      await sleep(500 / animationSpeed.value);
      
      if (searchArray.value[mid] === target) {
        foundIndex.value = mid;
        searchResultMessage.value = `Элемент ${target} найден на позиции ${mid}`;
        return;
      }
      
      if (searchArray.value[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
      
      // Обновление указателей
      updatePointers(left, Math.floor((left + right) / 2), right);
      
      searchComparedIndices.value = [];
      await sleep(500 / animationSpeed.value);
    }
    
    searchResultMessage.value = `Элемент ${target} не найден в массиве`;
  }
  
  // Функция для обновления позиций указателей
  function updatePointers(left, mid, right) {
    // Рассчитываем позиции в пикселях на основе индексов
    const itemWidth = 40; // Примерная ширина элемента в пикселях
    const paddingLeft = 30; // Отступ слева
    
    leftPointerPosition.value = paddingLeft + left * itemWidth;
    middlePointerPosition.value = paddingLeft + mid * itemWidth;
    rightPointerPosition.value = paddingLeft + right * itemWidth;
  }
  
  // -----------------------------------------------
  // Графовые алгоритмы
  // -----------------------------------------------
  const graphAlgorithms = [
    { id: 'bfs', title: 'Поиск в ширину' },
    { id: 'dfs', title: 'Поиск в глубину' },
    { id: 'dijkstra', title: 'Алгоритм Дейкстры' }
  ];
  
  const currentGraphAlgo = ref('bfs');
  const graphNodes = ['A', 'B', 'C', 'D', 'E', 'F'];
  const graphEdges = [
    { from: 'A', to: 'B', weight: 2 },
    { from: 'A', to: 'C', weight: 4 },
    { from: 'B', to: 'D', weight: 3 },
    { from: 'B', to: 'E', weight: 1 },
    { from: 'C', to: 'D', weight: 2 },
    { from: 'C', to: 'F', weight: 5 },
    { from: 'D', to: 'E', weight: 2 },
    { from: 'D', to: 'F', weight: 1 },
    { from: 'E', to: 'F', weight: 3 }
  ];
  
  // Координаты узлов для визуализации
  const nodePositions = {
    'A': { x: 100, y: 80 },
    'B': { x: 250, y: 50 },
    'C': { x: 250, y: 150 },
    'D': { x: 350, y: 100 },
    'E': { x: 400, y: 180 },
    'F': { x: 450, y: 80 }
  };
  
  const startNode = ref('A');
  const endNode = ref('F');
  const currentNode = ref(null);
  const visitedNodes = ref([]);
  const visitedEdges = ref([]);
  const pathNodes = ref([]);
  const pathEdges = ref([]);
  const queueDisplay = ref('');
  const stackDisplay = ref('');
  const distances = ref({});
  const graphStepCounter = ref(0);
  const graphResultMessage = ref('');
  
  // Описания графовых алгоритмов
  const graphDetails = {
    bfs: {
      title: 'Поиск в ширину (BFS)',
      timeComplexity: 'O(V + E), где V - количество вершин, E - количество рёбер',
      spaceComplexity: 'O(V)',
      description: 'Алгоритм обхода графа, который посещает все вершины на одном уровне (удаленности от начальной вершины) перед переходом к вершинам на следующем уровне. BFS можно использовать для поиска кратчайшего пути в невзвешенном графе.',
      steps: [
        'Выбираем начальную вершину и помечаем её как посещённую.',
        'Добавляем начальную вершину в очередь.',
        'Пока очередь не пуста, извлекаем вершину из начала очереди.',
        'Исследуем все смежные с ней вершины. Если вершина не посещена, помечаем её как посещённую и добавляем в очередь.',
        'Повторяем шаги 3-4, пока очередь не станет пустой.'
      ],
      useCases: [
        'Поиск кратчайшего пути в невзвешенном графе',
        'Обход состояний в головоломках (например, кубик Рубика)',
        'Поиск компонент связности в графе',
        'Определение минимального количества ходов в играх'
      ]
    },
    dfs: {
      title: 'Поиск в глубину (DFS)',
      timeComplexity: 'O(V + E), где V - количество вершин, E - количество рёбер',
      spaceComplexity: 'O(V)',
      description: 'Алгоритм обхода графа, который исследует ветви графа настолько глубоко, насколько возможно, перед возвратом и исследованием других ветвей. DFS можно реализовать рекурсивно или с использованием стека.',
      steps: [
        'Выбираем начальную вершину и помечаем её как посещённую.',
        'Исследуем все смежные с ней вершины. Для каждой непосещённой вершины:',
        'Помечаем её как посещённую.',
        'Рекурсивно запускаем DFS из этой вершины.',
        'После исследования всех смежных вершин, возвращаемся.'
      ],
      useCases: [
        'Топологическая сортировка направленного ациклического графа',
        'Поиск компонент сильной связности',
        'Нахождение циклов в графе',
        'Создание лабиринтов и решение головоломок'
      ]
    },
    dijkstra: {
      title: 'Алгоритм Дейкстры',
      timeComplexity: 'O(V² + E), или O((V + E) log V) с приоритетной очередью',
      spaceComplexity: 'O(V)',
      description: 'Алгоритм для нахождения кратчайших путей от одной вершины до всех остальных в графе с неотрицательными весами рёбер. Алгоритм поддерживает множество расстояний до каждой вершины и постепенно улучшает их.',
      steps: [
        'Инициализируем расстояния до всех вершин как бесконечность, а до начальной вершины как 0.',
        'Создаём множество непосещённых вершин.',
        'Пока множество не пусто:',
        'Выбираем вершину с минимальным расстоянием из непосещённых.',
        'Помечаем её как посещённую.',
        'Для каждой смежной с ней вершины обновляем расстояние, если найден более короткий путь.',
        'Повторяем шаги 3-6, пока не посетим все вершины или пока не найдём конечную вершину.'
      ],
      useCases: [
        'Нахождение кратчайшего пути между двумя вершинами во взвешенном графе',
        'Маршрутизация в компьютерных сетях',
        'Навигационные системы для поиска оптимальных маршрутов',
        'Планирование маршрутов в логистике'
      ]
    }
  };
  
  // Вычисляемое свойство для получения деталей текущего графового алгоритма
  const currentGraphDetails = computed(() => {
    return graphDetails[currentGraphAlgo.value];
  });
  
  // Функция для выбора графового алгоритма
  function selectGraphAlgorithm(algoId) {
    currentGraphAlgo.value = algoId;
    resetGraphVisualization();
  }
  
  // Функция для сброса визуализации графовых алгоритмов
  function resetGraphVisualization() {
    if (isRunning.value) return;
    
    clearInterval(visualizationInterval);
    isRunning.value = false;
    isFinished.value = false;
    graphStepCounter.value = 0;
    graphResultMessage.value = '';
    
    // Сброс посещённых узлов и рёбер
    currentNode.value = null;
    visitedNodes.value = [];
    visitedEdges.value = [];
    pathNodes.value = [];
    pathEdges.value = [];
    queueDisplay.value = '';
    stackDisplay.value = '';
    
    // Инициализация расстояний для алгоритма Дейкстры
    distances.value = {};
    graphNodes.forEach(node => {
      distances.value[node] = node === startNode.value ? 0 : Infinity;
    });
  }
  
  // Функция для запуска визуализации графовых алгоритмов
  async function runGraphVisualization() {
    if (isRunning.value || isFinished.value || !startNode.value) return;
    
    isRunning.value = true;
    
    switch (currentGraphAlgo.value) {
      case 'bfs':
        await visualizeBFS();
        break;
      case 'dfs':
        await visualizeDFS();
        break;
      case 'dijkstra':
        await visualizeDijkstra();
        break;
    }
    
    isRunning.value = false;
    isFinished.value = true;
  }
  
  // Функция для визуализации одного шага графового алгоритма
  function stepGraphVisualization() {
    if (isRunning.value || isFinished.value || !startNode.value) return;
    
    // Здесь будет реализация пошаговой визуализации
    // Это упрощенная версия, которая просто запускает полную визуализацию
    runGraphVisualization();
  }
  
  // Визуализация BFS
  async function visualizeBFS() {
    const queue = [startNode.value];
    const visited = new Set([startNode.value]);
    const parent = {};
    
    queueDisplay.value = queue.join(' → ');
    visitedNodes.value = [...visited];
    graphStepCounter.value++;
    
    await sleep(1000 / animationSpeed.value);
    
    while (queue.length > 0) {
      const node = queue.shift();
      currentNode.value = node;
      
      queueDisplay.value = queue.join(' → ');
      await sleep(1000 / animationSpeed.value);
      
      const neighbors = graphEdges
        .filter(edge => edge.from === node || edge.to === node)
        .map(edge => edge.from === node ? edge.to : edge.from);
      
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
          parent[neighbor] = node;
          
          visitedNodes.value = [...visited];
          queueDisplay.value = queue.join(' → ');
          
          // Добавляем ребро в список посещённых
          visitedEdges.value.push({ from: node, to: neighbor });
          
          graphStepCounter.value++;
          await sleep(1000 / animationSpeed.value);
        }
      }
    }
    
    currentNode.value = null;
    
    // Если нужно построить путь до конечной вершины
    if (visited.has(endNode.value)) {
      // Восстанавливаем путь
      const path = [];
      let current = endNode.value;
      
      while (current !== startNode.value) {
        path.unshift(current);
        current = parent[current];
      }
      path.unshift(startNode.value);
      
      // Отображаем путь
      pathNodes.value = path;
      
      // Добавляем рёбра пути
      for (let i = 0; i < path.length - 1; i++) {
        pathEdges.value.push({ from: path[i], to: path[i+1] });
      }
      
      graphResultMessage.value = `Путь найден: ${path.join(' → ')}`;
    } else {
      graphResultMessage.value = `Путь от ${startNode.value} до ${endNode.value} не существует`;
    }
  }
  
  // Визуализация DFS
  async function visualizeDFS() {
    const stack = [startNode.value];
    const visited = new Set();
    const parent = {};
    
    stackDisplay.value = stack.join(' → ');
    graphStepCounter.value++;
    
    await sleep(1000 / animationSpeed.value);
    
    while (stack.length > 0) {
      const node = stack.pop();
      
      if (!visited.has(node)) {
        visited.add(node);
        currentNode.value = node;
        visitedNodes.value = [...visited];
        
        stackDisplay.value = stack.join(' → ');
        await sleep(1000 / animationSpeed.value);
        
        const neighbors = graphEdges
          .filter(edge => edge.from === node || edge.to === node)
          .map(edge => edge.from === node ? edge.to : edge.from)
          .filter(neighbor => !visited.has(neighbor));
        
        // Добавляем соседей в стек в обратном порядке
        for (let i = neighbors.length - 1; i >= 0; i--) {
          const neighbor = neighbors[i];
          stack.push(neighbor);
          parent[neighbor] = node;
          
          // Добавляем ребро в список посещённых
          visitedEdges.value.push({ from: node, to: neighbor });
          
          stackDisplay.value = stack.join(' → ');
          graphStepCounter.value++;
          await sleep(500 / animationSpeed.value);
        }
      }
    }
    
    currentNode.value = null;
    
    graphResultMessage.value = `Обход DFS завершен. Посещено ${visitedNodes.value.length} узлов из ${graphNodes.length}`;
  }
  
  // Визуализация алгоритма Дейкстры
  async function visualizeDijkstra() {
    // Инициализация
    const dist = {};
    const prev = {};
    const unvisited = new Set(graphNodes);
    
    graphNodes.forEach(node => {
      dist[node] = node === startNode.value ? 0 : Infinity;
      prev[node] = null;
    });
    
    distances.value = { ...dist };
    queueDisplay.value = 'Приоритетная очередь: ' + Array.from(unvisited)
      .map(node => `${node}(${dist[node] === Infinity ? '∞' : dist[node]})`)
      .join(', ');
    
    graphStepCounter.value++;
    await sleep(1000 / animationSpeed.value);
    
    while (unvisited.size > 0) {
      // Находим вершину с минимальным расстоянием
      let minDist = Infinity;
      let minNode = null;
      
      for (const node of unvisited) {
        if (dist[node] < minDist) {
          minDist = dist[node];
          minNode = node;
        }
      }
      
      // Если минимальное расстояние бесконечно, значит, нет пути
      if (minDist === Infinity) break;
      
      // Удаляем вершину из непосещённых
      unvisited.delete(minNode);
      currentNode.value = minNode;
      visitedNodes.value.push(minNode);
      
      // Обновляем очередь
      queueDisplay.value = 'Приоритетная очередь: ' + Array.from(unvisited)
        .map(node => `${node}(${dist[node] === Infinity ? '∞' : dist[node]})`)
        .join(', ');
      
      await sleep(1000 / animationSpeed.value);
      
      // Если достигли конечной вершины, прекращаем поиск
      if (minNode === endNode.value) break;
      
      // Находим все рёбра, исходящие из текущей вершины
      const neighbors = graphEdges
        .filter(edge => edge.from === minNode || edge.to === minNode)
        .map(edge => {
          const neighbor = edge.from === minNode ? edge.to : edge.from;
          return {
            node: neighbor,
            weight: edge.weight
          };
        });
      
      for (const { node: neighbor, weight } of neighbors) {
        if (unvisited.has(neighbor)) {
          const alt = dist[minNode] + weight;
          
          // Визуализируем проверку соседа
          visitedEdges.value.push({ from: minNode, to: neighbor });
          graphStepCounter.value++;
          await sleep(500 / animationSpeed.value);
          
          if (alt < dist[neighbor]) {
            dist[neighbor] = alt;
            prev[neighbor] = minNode;
            distances.value = { ...dist };
            
            // Обновляем очередь
            queueDisplay.value = 'Приоритетная очередь: ' + Array.from(unvisited)
              .map(node => `${node}(${dist[node] === Infinity ? '∞' : dist[node]})`)
              .join(', ');
            
            await sleep(500 / animationSpeed.value);
          }
        }
      }
    }
    
    currentNode.value = null;
    
    // Восстанавливаем путь
    if (dist[endNode.value] !== Infinity) {
      const path = [];
      let current = endNode.value;
      
      while (current !== null) {
        path.unshift(current);
        current = prev[current];
      }
      
      // Отображаем путь
      pathNodes.value = path;
      
      // Добавляем рёбра пути
      for (let i = 0; i < path.length - 1; i++) {
        pathEdges.value.push({ from: path[i], to: path[i+1] });
      }
      
      graphResultMessage.value = `Кратчайший путь: ${path.join(' → ')}, длина: ${dist[endNode.value]}`;
    } else {
      graphResultMessage.value = `Путь от ${startNode.value} до ${endNode.value} не существует`;
    }
  }
  
  // -----------------------------------------------
  // Алгоритмы динамического программирования
  // -----------------------------------------------
  const dpAlgorithms = [
    { id: 'fibonacci', title: 'Числа Фибоначчи' },
    { id: 'knapsack', title: 'Задача о рюкзаке' }
  ];
  
  const currentDpAlgo = ref('fibonacci');
  const fibN = ref(null);
  const fibMemo = ref({});
  const fibCurrentIndices = ref([]);
  const calculatedFibIndices = ref([]);
  const fibTreeNodes = ref([]);
  const fibTreeEdges = ref([]);
  const fibTreeActiveNodes = ref([]);
  const fibTreeActiveEdges = ref([]);
  const fibTreeWidth = 600;
  const fibTreeHeight = 300;
  
  const knapsackCapacity = ref(null);
  const knapsackItems = [
    { weight: 1, value: 6 },
    { weight: 2, value: 10 },
    { weight: 3, value: 12 },
    { weight: 5, value: 15 },
    { weight: 7, value: 18 }
  ];
  const dpTable = ref([]);
  const currentDpCell = ref(null);
  const selectedItems = ref([]);
  
  const dpStepCounter = ref(0);
  const dpResultMessage = ref('');
  
  // Вычисляемое свойство для общей ценности выбранных предметов
  const selectedItemsValue = computed(() => {
    return selectedItems.value.reduce((sum, index) => sum + knapsackItems[index].value, 0);
  });
  
  // Описания алгоритмов динамического программирования
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dpDetails = {
    fibonacci: {
      title: 'Числа Фибоначчи',
      timeComplexity: 'O(n) с мемоизацией, O(2^n) без мемоизации',
      spaceComplexity: 'O(n)',
      description: 'Классический пример применения динамического программирования для вычисления чисел Фибоначчи. Последовательность Фибоначчи определяется рекуррентным соотношением: F(n) = F(n-1) + F(n-2) при n > 1, где F(0) = 0, F(1) = 1.',
      steps: [
        'Определяем базовые случаи: F(0) = 0, F(1) = 1.',
        'Для вычисления F(n) при n > 1, сначала проверяем, не вычислили ли мы уже это значение (используем мемоизацию).',
        'Если значение не вычислено, вычисляем F(n-1) и F(n-2) и складываем их.',
        'Сохраняем результат в таблице мемоизации для повторного использования.',
        'Возвращаем вычисленное значение F(n).'
      ],
      useCases: [
        'Демонстрация концепции динамического программирования',
        'Вычисление последовательности Фибоначчи для больших n',
        'Основа для решения других задач, связанных с рекуррентными соотношениями',
        'Применения в разных областях: компьютерные алгоритмы, математика, природные явления'
      ]
    },
    knapsack: {
  title: 'Задача о рюкзаке',
  timeComplexity: 'O(n × W), где n - количество предметов, W - вместимость рюкзака',
  spaceComplexity: 'O(n × W)',
  description: 'Классическая задача оптимизации: как выбрать из набора предметов с разными весами и ценностями те, которые дадут максимальную суммарную ценность при ограниченной вместимости рюкзака. Решается с помощью таблицы DP, где DP[i][w] — максимальная ценность, которую можно получить при рассмотрении первых i предметов и ограничении веса w.',
  steps: [
    'Создаем таблицу DP[n+1][W+1], где n - количество предметов, W - вместимость рюкзака.',
    'Инициализируем первую строку и первый столбец нулями (DP[0][j] = 0, DP[i][0] = 0).',
    'Для каждого предмета i и каждой вместимости w, решаем: взять предмет или не взять.',
    'Если вес предмета больше текущей вместимости (weight[i] > w), мы не можем его взять: DP[i][w] = DP[i-1][w].',
    'Иначе выбираем максимум из двух вариантов: не брать предмет (DP[i-1][w]) или взять (DP[i-1][w-weight[i]] + value[i]).',
    'После заполнения всей таблицы, DP[n][W] содержит максимальную возможную ценность.',
    'Для восстановления списка выбранных предметов, идем от DP[n][W] обратно к DP[0][0].'
  ],
  useCases: [
    'Логистика и оптимизация перевозок',
    'Планирование инвестиций с ограниченным бюджетом',
    'Размещение ресурсов в системах с ограниченной памятью или вычислительной мощностью',
    'Решение задач загрузки оборудования в производстве',
    'Финансовое планирование и составление портфеля активов'
  ]

} }
// Визуализация задачи о рюкзаке
async function visualizeKnapsack() {
  // Инициализация DP-таблицы
  const n = knapsackItems.length;
  const w = knapsackCapacity.value;
  
  // Создаем таблицу DP[n+1][w+1]
  dpTable.value = Array(n + 1).fill().map(() => Array(w + 1).fill(0));
  
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= w; j++) {
      if (i === 0 || j === 0) {
        dpTable.value[i][j] = 0;
      } else if (knapsackItems[i - 1].weight <= j) {
        const includingItem = dpTable.value[i - 1][j - knapsackItems[i - 1].weight] + knapsackItems[i - 1].value;
        const excludingItem = dpTable.value[i - 1][j];
        
        currentDpCell.value = { i, j };
        dpStepCounter.value++;
        await sleep(500 / animationSpeed.value);
        
        dpTable.value[i][j] = Math.max(includingItem, excludingItem);
      } else {
        currentDpCell.value = { i, j };
        dpStepCounter.value++;
        await sleep(500 / animationSpeed.value);
        
        dpTable.value[i][j] = dpTable.value[i - 1][j];
      }
    }
  }
  
  // Восстановление решения
  let i = n;
  let j = w;
  const selected = [];
  
  while (i > 0 && j > 0) {
    if (dpTable.value[i][j] !== dpTable.value[i - 1][j]) {
      selected.push(i - 1);
      j -= knapsackItems[i - 1].weight;
    }
    i--;
    
    currentDpCell.value = { i, j };
    await sleep(500 / animationSpeed.value);
  }
  
  selectedItems.value = selected.reverse();
  dpResultMessage.value = `Максимальная ценность: ${dpTable.value[n][w]}`;
}

// Функция для получения цвета предмета
function getItemColor(index) {
  const colors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f39c12', '#1abc9c'];
  return colors[index % colors.length];
}

// Визуализация чисел Фибоначчи
async function visualizeFibonacci() {
  const n = fibN.value;
  
  // Инициализация мемоизации
  fibMemo.value = { 0: 0, 1: 1 };
  calculatedFibIndices.value = [0, 1];
  
  // Создание визуализации дерева вызовов
  createFibTree(n);
  
  // Вычисление чисел Фибоначчи с мемоизацией
  const result = await calculateFibonacciWithVisualization(n);
  
  dpResultMessage.value = `F(${n}) = ${result}`;
}

// Рекурсивное вычисление чисел Фибоначчи с визуализацией
async function calculateFibonacciWithVisualization(n) {
  // Если уже вычислено, возвращаем из кеша
  if (n in fibMemo.value) {
    fibCurrentIndices.value = [n];
    dpStepCounter.value++;
    await sleep(500 / animationSpeed.value);
    
    return fibMemo.value[n];
  }
  
  // Отмечаем текущий узел как активный
  const nodeIndex = fibTreeNodes.value.findIndex(node => node.value === n);
  if (nodeIndex !== -1) {
    fibTreeActiveNodes.value = [nodeIndex];
    
    // Находим и отмечаем ребра к детям
    const edgeIndices = fibTreeEdges.value.filter(edge => 
      edge.parentIndex === nodeIndex
    ).map((_, index) => index);
    
    fibTreeActiveEdges.value = edgeIndices;
  }
  
  fibCurrentIndices.value = [n];
  await sleep(1000 / animationSpeed.value);
  
  // Рекурсивно вычисляем F(n-1) и F(n-2)
  const fib1 = await calculateFibonacciWithVisualization(n - 1);
  const fib2 = await calculateFibonacciWithVisualization(n - 2);
  
  // Вычисляем результат
  const result = fib1 + fib2;
  
  // Сохраняем результат в мемоизацию
  fibMemo.value[n] = result;
  calculatedFibIndices.value.push(n);
  
  fibCurrentIndices.value = [];
  
  return result;
}

// Создание визуализации дерева вызовов для Фибоначчи
function createFibTree(n) {
  const nodes = [];
  const edges = [];
  
  // Создаем узлы для дерева (предварительно)
  const createNode = (value, level, position, maxWidth) => {
    const xStep = maxWidth / Math.pow(2, level);
    const x = position * xStep + xStep / 2;
    const y = level * 60 + 30;
    
    nodes.push({ value, x, y });
    return nodes.length - 1;
  };
  
  // Рекурсивно создаем дерево
  const buildTree = (value, level, position, maxWidth) => {
    if (value <= 1) return;
    
    const nodeIndex = createNode(value, level, position, maxWidth);
    
    const leftIndex = buildTree(value - 1, level + 1, position * 2, maxWidth);
    if (leftIndex !== undefined) {
      edges.push({
        parentIndex: nodeIndex,
        childIndex: leftIndex,
        x1: nodes[nodeIndex].x,
        y1: nodes[nodeIndex].y,
        x2: nodes[leftIndex].x,
        y2: nodes[leftIndex].y
      });
    }
    
    const rightIndex = buildTree(value - 2, level + 1, position * 2 + 1, maxWidth);
    if (rightIndex !== undefined) {
      edges.push({
        parentIndex: nodeIndex,
        childIndex: rightIndex,
        x1: nodes[nodeIndex].x,
        y1: nodes[nodeIndex].y,
        x2: nodes[rightIndex].x,
        y2: nodes[rightIndex].y
      });
    }
    
    return nodeIndex;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rootIndex = createNode(n, 0, 0, fibTreeWidth);
  buildTree(n, 0, 0, fibTreeWidth);
  
  fibTreeNodes.value = nodes;
  fibTreeEdges.value = edges;
}

// Функция для визуализации динамического программирования
async function runDpVisualization() {
  if (isRunning.value || isFinished.value ||
      (currentDpAlgo.value === 'fibonacci' && !fibN.value) ||
      (currentDpAlgo.value === 'knapsack' && !knapsackCapacity.value)) return;
  
  isRunning.value = true;
  
  switch (currentDpAlgo.value) {
    case 'fibonacci':
      await visualizeFibonacci();
      break;
    case 'knapsack':
      await visualizeKnapsack();
      break;
  }
  
  isRunning.value = false;
  isFinished.value = true;
}

// Функция для визуализации одного шага динамического программирования
function stepDpVisualization() {
  if (isRunning.value || isFinished.value ||
      (currentDpAlgo.value === 'fibonacci' && !fibN.value) ||
      (currentDpAlgo.value === 'knapsack' && !knapsackCapacity.value)) return;
  
  // Это упрощенная версия, которая просто запускает полную визуализацию
  runDpVisualization();
}

// Функция для сброса визуализации динамического программирования
function resetDpVisualization() {
  if (isRunning.value) return;
  
  clearInterval(visualizationInterval);
  isRunning.value = false;
  isFinished.value = false;
  dpStepCounter.value = 0;
  dpResultMessage.value = '';
  
  if (currentDpAlgo.value === 'fibonacci') {
    fibMemo.value = {};
    fibCurrentIndices.value = [];
    calculatedFibIndices.value = [];
    fibTreeNodes.value = [];
    fibTreeEdges.value = [];
    fibTreeActiveNodes.value = [];
    fibTreeActiveEdges.value = [];
  } else if (currentDpAlgo.value === 'knapsack') {
    dpTable.value = [];
    currentDpCell.value = null;
    selectedItems.value = [];
  }
}

// Функция для выбора алгоритма динамического программирования
function selectDpAlgorithm(algoId) {
  currentDpAlgo.value = algoId;
  resetDpVisualization();
}

// -----------------------------------------------
// Жадные алгоритмы
// -----------------------------------------------
const greedyAlgorithms = [
  { id: 'activity-selection', title: 'Выбор активностей' },
  { id: 'huffman', title: 'Кодирование Хаффмана' }
];

const currentGreedyAlgo = ref('activity-selection');

// Выбор активностей
const activities = ref([
  { start: 1, end: 3 },
  { start: 2, end: 5 },
  { start: 3, end: 6 },
  { start: 5, end: 7 },
  { start: 6, end: 8 },
  { start: 8, end: 9 },
  { start: 0, end: 2 },
  { start: 5, end: 9 }
]);
const currentActivityIndex = ref(null);
const selectedActivities = ref([]);
const rejectedActivities = ref([]);

// Кодирование Хаффмана
const huffmanInput = ref('');
const frequencies = ref({});
const huffmanCodes = ref({});
const encodedText = ref('');
const encodedTextLength = ref(0);
const compressionRatio = ref(0);
const currentHuffmanChar = ref(null);
const currentHuffmanNodes = ref([]);
const huffmanTreeNodes = ref([]);
const huffmanTreeEdges = ref([]);
const huffmanActiveEdges = ref([]);
const huffmanTreeWidth = 600;
const huffmanTreeHeight = 300;

const greedyStepCounter = ref(0);
const greedyResultMessage = ref('');

// Описания жадных алгоритмов
const greedyDetails = {
  'activity-selection': {
    title: 'Выбор активностей',
    timeComplexity: 'O(n log n) из-за сортировки, O(n) если уже отсортировано',
    spaceComplexity: 'O(1) или O(n) для хранения результата',
    description: 'Алгоритм выбора максимального количества несовпадающих активностей, которые может выполнить один ресурс. Каждая активность имеет время начала и окончания. Два действия несовместимы, если их временные интервалы пересекаются.',
    steps: [
      'Сортируем активности по времени окончания в возрастающем порядке.',
      'Выбираем первую активность (с самым ранним временем окончания).',
      'Для каждой оставшейся активности проверяем, не пересекается ли она с последней выбранной активностью.',
      'Если активность не пересекается (время начала >= времени окончания последней выбранной), добавляем её в результат.',
      'Повторяем шаги 3-4 для всех оставшихся активностей.'
    ],
    useCases: [
      'Планирование занятий в учебных заведениях',
      'Управление ресурсами в операционных системах',
      'Планирование встреч и событий',
      'Составление расписания использования общих ресурсов'
    ]
  },
  'huffman': {
    title: 'Кодирование Хаффмана',
    timeComplexity: 'O(n log n), где n - количество уникальных символов',
    spaceComplexity: 'O(n)',
    description: 'Алгоритм оптимального префиксного кодирования для сжатия данных без потерь. Часто используемым символам присваиваются короткие коды, а редко используемым - длинные. Ни один код не является префиксом другого кода.',
    steps: [
      'Подсчитываем частоту каждого символа в исходном тексте.',
      'Создаем лист узлов, где каждый узел содержит символ и его частоту.',
      'Сортируем узлы по возрастанию частоты.',
      'Строим дерево Хаффмана: берем два узла с наименьшей частотой, создаем новый узел с суммарной частотой и добавляем его в лист.',
      'Повторяем шаг 4, пока в листе не останется только один узел — корень дерева.',
      'Обходим дерево, назначая каждому ребру бит (0 для левого, 1 для правого).',
      'Код для каждого символа — последовательность битов на пути от корня к листу с этим символом.'
    ],
    useCases: [
      'Сжатие данных в архиваторах (ZIP, GZIP)',
      'Алгоритмы сжатия изображений (JPEG) и видео',
      'Оптимизация передачи данных по сети',
      'Хранение больших объемов текстовых данных'
    ]
  }
};

// Вычисляемое свойство для получения деталей текущего жадного алгоритма
const currentGreedyDetails = computed(() => {
  return greedyDetails[currentGreedyAlgo.value];
});

// Функция для выбора жадного алгоритма
function selectGreedyAlgorithm(algoId) {
  currentGreedyAlgo.value = algoId;
  resetGreedyVisualization();
}

// Функция для сброса визуализации жадных алгоритмов
function resetGreedyVisualization() {
  if (isRunning.value) return;
  
  clearInterval(visualizationInterval);
  isRunning.value = false;
  isFinished.value = false;
  greedyStepCounter.value = 0;
  greedyResultMessage.value = '';
  
  if (currentGreedyAlgo.value === 'activity-selection') {
    // Генерируем новый набор активностей
    activities.value = [
      { start: 1, end: 3 },
      { start: 2, end: 5 },
      { start: 3, end: 6 },
      { start: 5, end: 7 },
      { start: 6, end: 8 },
      { start: 8, end: 9 },
      { start: 0, end: 2 },
      { start: 5, end: 9 }
    ];
    currentActivityIndex.value = null;
    selectedActivities.value = [];
    rejectedActivities.value = [];
  } else if (currentGreedyAlgo.value === 'huffman') {
    frequencies.value = {};
    huffmanCodes.value = {};
    encodedText.value = '';
    encodedTextLength.value = 0;
    compressionRatio.value = 0;
    currentHuffmanChar.value = null;
    currentHuffmanNodes.value = [];
    huffmanTreeNodes.value = [];
    huffmanTreeEdges.value = [];
    huffmanActiveEdges.value = [];
  }
}

// Функция для запуска визуализации жадных алгоритмов
async function runGreedyVisualization() {
  if (isRunning.value || isFinished.value || (currentGreedyAlgo.value === 'huffman' && !huffmanInput.value)) return;
  
  isRunning.value = true;
  
  switch (currentGreedyAlgo.value) {
    case 'activity-selection':
      await visualizeActivitySelection();
      break;
    case 'huffman':
      await visualizeHuffman();
      break;
  }
  
  isRunning.value = false;
  isFinished.value = true;
}

// Функция для визуализации одного шага жадного алгоритма
function stepGreedyVisualization() {
  if (isRunning.value || isFinished.value || (currentGreedyAlgo.value === 'huffman' && !huffmanInput.value)) return;
  
  // Это упрощенная версия, которая просто запускает полную визуализацию
  runGreedyVisualization();
}

// Визуализация выбора активностей
async function visualizeActivitySelection() {
  // Сортируем активности по времени окончания
  const sortedActivities = [...Array(activities.value.length).keys()]
    .sort((a, b) => activities.value[a].end - activities.value[b].end);
  
  greedyStepCounter.value++;
  await sleep(1000 / animationSpeed.value);
  
  if (sortedActivities.length > 0) {
    const firstActivity = sortedActivities[0];
    selectedActivities.value.push(firstActivity);
    currentActivityIndex.value = firstActivity;
    
    await sleep(1000 / animationSpeed.value);
  }
  
  let lastSelected = selectedActivities.value[0];
  
  for (let i = 1; i < sortedActivities.length; i++) {
    const currentIndex = sortedActivities[i];
    currentActivityIndex.value = currentIndex;
    greedyStepCounter.value++;
    
    await sleep(1000 / animationSpeed.value);
    
    if (activities.value[currentIndex].start >= activities.value[lastSelected].end) {
      selectedActivities.value.push(currentIndex);
      lastSelected = currentIndex;
    } else {
      rejectedActivities.value.push(currentIndex);
    }
    
    await sleep(500 / animationSpeed.value);
  }
  
  currentActivityIndex.value = null;
  greedyResultMessage.value = `Выбрано активностей: ${selectedActivities.value.length}`;
}

// Визуализация кодирования Хаффмана
async function visualizeHuffman() {
  // Подсчитываем частоту каждого символа
  const freqs = {};
  for (const char of huffmanInput.value) {
    freqs[char] = (freqs[char] || 0) + 1;
    currentHuffmanChar.value = char;
    await sleep(100 / animationSpeed.value);
  }
  
  frequencies.value = freqs;
  greedyStepCounter.value++;
  await sleep(1000 / animationSpeed.value);
  
  // Создаем узлы для дерева Хаффмана

  let nodes = Object.keys(freqs).map(char => ({
    id: char,
    char,
    freq: freqs[char],
    left: null,
    right: null,
    isLeaf: true
  }));
  
  // Создаем приоритетную очередь (упорядоченный массив)
  nodes.sort((a, b) => a.freq - b.freq);
  
  // Строим дерево Хаффмана
  let nextId = 0;
  while (nodes.length > 1) {
    // Берем два узла с наименьшей частотой
    const left = nodes.shift();
    const right = nodes.shift();
    
    currentHuffmanNodes.value = [left.id, right.id];
    greedyStepCounter.value++;
    await sleep(1000 / animationSpeed.value);
    
    // Создаем новый узел
    const newNode = {
      id: `internal${nextId++}`,
      char: null,
      freq: left.freq + right.freq,
      left,
      right,
      isLeaf: false
    };
    
    // Добавляем новый узел в очередь
    let i = 0;
    while (i < nodes.length && nodes[i].freq < newNode.freq) {
      i++;
    }
    nodes.splice(i, 0, newNode);
    
    await sleep(500 / animationSpeed.value);
  }
  
  // Корень дерева Хаффмана
  const root = nodes[0];
  
  // Генерируем коды для каждого символа
  const codes = {};
  
  function generateCodes(node, code = '') {
    if (node.isLeaf) {
      codes[node.char] = code || '0'; // Если только один символ
      return;
    }
    
    if (node.left) {
      generateCodes(node.left, code + '0');
    }
    
    if (node.right) {
      generateCodes(node.right, code + '1');
    }
  }
  
  generateCodes(root);
  huffmanCodes.value = codes;
  
  // Кодируем текст
  let encoded = '';
  for (const char of huffmanInput.value) {
    encoded += codes[char];
    currentHuffmanChar.value = char;
    await sleep(200 / animationSpeed.value);
  }
  
  encodedText.value = encoded;
  encodedTextLength.value = encoded.length;
  
  // Рассчитываем коэффициент сжатия
  const originalBits = huffmanInput.value.length * 8; // 8 бит на символ в ASCII
  const compressedBits = encoded.length;
  compressionRatio.value = Math.round((1 - compressedBits / originalBits) * 100);
  
  // Создаем визуализацию дерева Хаффмана
  const treeNodes = [];
  const treeEdges = [];
  
  function buildTreeVisualization(node, level, x, width) {
    if (!node) return null;
    
    const nodeInfo = {
      id: node.id,
      x,
      y: level * 70 + 40,
      label: node.isLeaf ? `${node.char}:${node.freq}` : node.freq,
      isLeaf: node.isLeaf
    };
    
    treeNodes.push(nodeInfo);
    const nodeIndex = treeNodes.length - 1;
    
    if (node.left) {
      const childWidth = width / 2;
      const childX = x - childWidth / 2;
      const childIndex = buildTreeVisualization(node.left, level + 1, childX, childWidth);
      
      if (childIndex !== null) {
        treeEdges.push({
          x1: x,
          y1: nodeInfo.y,
          x2: treeNodes[childIndex].x,
          y2: treeNodes[childIndex].y,
          label: '0'
        });
      }
    }
    
    if (node.right) {
      const childWidth = width / 2;
      const childX = x + childWidth / 2;
      const childIndex = buildTreeVisualization(node.right, level + 1, childX, childWidth);
      
      if (childIndex !== null) {
        treeEdges.push({
          x1: x,
          y1: nodeInfo.y,
          x2: treeNodes[childIndex].x,
          y2: treeNodes[childIndex].y,
          label: '1'
        });
      }
    }
    
    return nodeIndex;
  }
  
  buildTreeVisualization(root, 0, huffmanTreeWidth / 2, huffmanTreeWidth);
  huffmanTreeNodes.value = treeNodes;
  huffmanTreeEdges.value = treeEdges;
  
  currentHuffmanChar.value = null;
  currentHuffmanNodes.value = [];
  
  greedyResultMessage.value = `Сжатие: ${compressionRatio.value}%. Исходный размер: ${originalBits} бит, сжатый: ${compressedBits} бит`;
}

// Инициализация
onMounted(() => {
  resetVisualization();
});

</script>


<style scoped> 
.algorithms-container {
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
}

.intro {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 1.2em;
}

/* Стили для выбора алгоритмов */
.algorithm-selector, 
.algo-type-selector {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.algorithm-selector button, 
.algo-type-selector button {
  padding: 10px 20px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.algorithm-selector button:hover, 
.algo-type-selector button:hover,
.algorithm-selector button.active, 
.algo-type-selector button.active {
  background-color: #3498db;
  color: white;
}

/* Стили для блока алгоритма */
.algorithm-section {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.algorithm-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.algorithm-info {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

.complexity-badges {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.badge {
  background-color: #e8f4f8;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

.badge-title {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #2c3e50;
}

.badge-value {
  color: #3498db;
}

.algorithm-description {
  margin-bottom: 20px;
  line-height: 1.6;
}

.algorithm-steps, 
.use-cases {
  margin-bottom: 20px;
}

.algorithm-steps ol, 
.use-cases ul {
  padding-left: 20px;
}

.algorithm-steps li, 
.use-cases li {
  margin-bottom: 10px;
}

/* Стили для визуализации */
.algorithm-visualization {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.controls button {
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.controls button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.visualization-container {
  position: relative;
  min-height: 300px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 20px;
}

.visualization-info {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .algorithm-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .algorithm-selector, 
  .algo-type-selector {
    flex-direction: column;
    align-items: center;
  }

  .algorithm-selector button, 
  .algo-type-selector button {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>