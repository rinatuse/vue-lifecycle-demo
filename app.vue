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
    </div>
    
    <div class="lesson-content">
      <LifecycleDemo v-if="currentLesson === 'lifecycle'" />
      <CollectionsDemo v-if="currentLesson === 'collections'" />
      <ArraysWorkshop v-if="currentLesson === 'arrays'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LifecycleDemo from './components/LifecycleDemo.vue';
import CollectionsDemo from './components/CollectionsDemo.vue';
import ArraysWorkshop from './components/ArraysWorkshop.vue';

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

.lesson-navigation button.active {
  background: #34495e;
  color: white;
  border-color: #34495e;
}

.lesson-content {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  background: #fff;
  min-height: 500px;
}
</style>