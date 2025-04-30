<template>
  <div class="app-container">
    <div class="lesson-navigation">
      <button 
        :class="{ active: currentLesson === 'lifecycle' }"
        @click="currentLesson = 'lifecycle'"
      >
        Жизненный цикл Vue
      </button>
      <button 
        :class="{ active: currentLesson === 'collections' }"
        @click="currentLesson = 'collections'"
      >
        JavaScript Collections
      </button>
      <button 
        :class="{ active: currentLesson === 'arrays' }"
        @click="currentLesson = 'arrays'"
      >
        Работа с массивами
      </button>
      <button 
        :class="{ active: currentLesson === 'websocket' }"
        @click="currentLesson = 'websocket'"
      >
        WebSocket
      </button>
      <button 
        :class="{ active: currentLesson === 'eventloop' }"
        @click="currentLesson = 'eventloop'"
      >
        Event Loop
      </button>
    </div>
    
    <div class="lesson-content">
      <LifecycleDemo v-if="currentLesson === 'lifecycle'" />
      <CollectionsDemo v-if="currentLesson === 'collections'" />
      <ArraysWorkshop v-if="currentLesson === 'arrays'" />
      <WebSocketDemo v-if="currentLesson === 'websocket'" />
      <EventLoopExplorer v-if="currentLesson === 'eventloop'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LifecycleDemo from './components/LifecycleDemo.vue';
import CollectionsDemo from './components/CollectionsDemo.vue';
import ArraysWorkshop from './components/ArraysWorkshop.vue';
import WebSocketDemo from './components/WebSocketDemo.vue';
import EventLoopExplorer from './components/EventLoopExplorer.vue';

const currentLesson = ref('lifecycle');
</script>

<style>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.lesson-navigation {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.lesson-navigation button {
  padding: 12px 24px;
  font-size: 1rem;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.lesson-navigation button:hover {
  background: #eaeaea;
  transform: translateY(-2px);
}

.lesson-navigation button.active {
  background: #34495e;
  color: white;
  border-color: #34495e;
  box-shadow: 0 4px 6px rgba(52, 73, 94, 0.2);
}

.lesson-content {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  background: #fff;
  min-height: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* Медиа-запросы для адаптивности */
@media (max-width: 768px) {
  .lesson-navigation {
    flex-direction: column;
    align-items: stretch;
  }
  
  .lesson-navigation button {
    margin-bottom: 10px;
  }
  
  .lesson-content {
    padding: 15px;
  }
}

@media (max-width: 576px) {
  .app-container {
    padding: 10px;
  }
}
</style>