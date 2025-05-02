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
      <button 
        :class="{ active: currentLesson === 'rendering' }"
        @click="currentLesson = 'rendering'"
      >
        BrowserRenderingCycle
      </button>
      <button 
        :class="{ active: currentLesson === 'algorithms' }"
        @click="currentLesson = 'algorithms'"
      >
        AlgorithmsDemo
      </button>
      <button 
        :class="{ active: currentLesson === 'enum' }"
        @click="currentLesson = 'enum'"
      >
      Перегрузка функций Const Enum
      </button>
      <button 
        :class="{ active: currentLesson === 'this' }"
        @click="currentLesson = 'this'"
      >
      This
      </button>
      <button 
        :class="{ active: currentLesson === 'mur' }"
        @click="currentLesson = 'mur'"
      >
      Murych
      </button>
      <button 
        :class="{ active: currentLesson === 'generic' }"
        @click="currentLesson = 'generic'"
      >
      Generic
      </button>
      <button 
        :class="{ active: currentLesson === 'objectfive' }"
        @click="currentLesson = 'objectfive'"
      >
      objectfive
      </button>
      <button 
        :class="{ active: currentLesson === 'promise' }"
        @click="currentLesson = 'promise'"
      >
      promise
      </button>
    </div>
    
    <div class="lesson-content">
      <LifecycleDemo v-if="currentLesson === 'lifecycle'" />
      <CollectionsDemo v-if="currentLesson === 'collections'" />
      <ArraysWorkshop v-if="currentLesson === 'arrays'" />
      <WebSocketDemo v-if="currentLesson === 'websocket'" />
      <EventLoopExplorer v-if="currentLesson === 'eventloop'" />
      <BrowserRenderingCycle v-if="currentLesson === 'rendering'"/>
      <AlgorithmsDemo v-if="currentLesson === 'algorithms'"/>
      <ConstEnum v-if="currentLesson === 'enum'"/>
      <ThisDemo v-if="currentLesson === 'this'" />
      <ThisJSTutorial v-if="currentLesson === 'mur'" />
      <GenericDemo v-if="currentLesson === 'generic'" />
      <ObjectCopyDemo v-if="currentLesson === 'objectfive'" />
      <PromiseExplorer v-if="currentLesson === 'promise'" />
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
import BrowserRenderingCycle from './components/BrowserRenderingCycle.vue';
import AlgorithmsDemo from './components/AlgorithmsDemo.vue';
import ConstEnum from './components/ConstEnum.vue';
import ThisDemo from './components/ThisDemo.vue';
import ThisJSTutorial from './components/ThisJSTutorial.vue';
import GenericDemo from './components/GenericDemo.vue';
import ObjectCopyDemo from './components/ObjectCopyDemo.vue';
import PromiseExplorer from './components/PromiseExplorer.vue';

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