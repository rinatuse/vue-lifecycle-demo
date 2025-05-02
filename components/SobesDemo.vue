// InterviewPreparation.vue
<template>
  <div class="interview-preparation">
    <header class="header">
      <h1>Подготовка к собеседованию</h1>
      <div class="controls">
        <div class="mode-switcher">
          <button 
            :class="{ active: mode === 'learn' }" 
            @click="setMode('learn')"
          >
            Обучение
          </button>
          <button 
            :class="{ active: mode === 'practice' }" 
            @click="setMode('practice')"
          >
            Тренировка
          </button>
        </div>
        <div class="filter-container">
          <select v-model="selectedCategory" @change="resetCurrentQuestion">
            <option value="">Все категории</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
      </div>
    </header>

    <main class="main-content">
      <!-- Режим обучения -->
      <div v-if="mode === 'learn'" class="learn-mode">
        <div class="question-list">
          <div class="list-header">
            <h2>Вопросы ({{ filteredQuestions.length }})</h2>
            <div class="search-box">
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Поиск вопросов..." 
                @input="resetCurrentQuestion"
              />
            </div>
          </div>
          <div class="list-container">
            <div 
              v-for="(question, index) in filteredQuestions" 
              :key="index"
              :class="['question-item', { active: currentQuestionIndex === index }]"
              @click="currentQuestionIndex = index"
            >
              <div class="question-text">{{ question.вопрос }}</div>
              <div class="question-category">{{ question.категория }}</div>
              <div 
                :class="['bookmark-indicator', { bookmarked: bookmarkedQuestions.includes(index) }]"
                @click.stop="toggleBookmark(index)"
              >
                <span class="bookmark-icon">★</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="question-details" v-if="currentQuestion">
          <div class="detail-header">
            <h2>{{ currentQuestion.вопрос }}</h2>
            <div class="category-badge">{{ currentQuestion.категория }}</div>
          </div>
          <div class="question-answer">
            <div class="section-title">
              <h3>Ответ</h3>
              <button @click="toggleAnswerVisibility" class="toggle-button">
                {{ showAnswer ? 'Скрыть' : 'Показать' }}
              </button>
            </div>
            <div v-if="showAnswer" class="answer-content">
              <p v-for="(paragraph, i) in answerParagraphs" :key="i">{{ paragraph }}</p>
            </div>
            <div v-else class="answer-placeholder">
              Ответ скрыт. Попробуйте сначала ответить самостоятельно.
            </div>
          </div>
          
          <div class="question-notes">
            <div class="section-title">
              <h3>Заметки</h3>
            </div>
            <textarea 
              v-model="notes[currentQuestionIndex]" 
              placeholder="Добавьте свои заметки по этому вопросу..."
              rows="4"
            ></textarea>
          </div>
        </div>
      </div>
      
      <!-- Режим тренировки -->
      <div v-if="mode === 'practice'" class="practice-mode">
        <div v-if="!practiceStarted" class="practice-start">
          <h2>Режим тренировки</h2>
          <p>В этом режиме вы получите случайные вопросы из выбранной категории. 
             Попробуйте ответить на них вслух, а затем сравните свой ответ с эталонным.</p>
          
          <div class="practice-settings">
            <div class="setting">
              <label>Категория:</label>
              <select v-model="practiceCategory">
                <option value="">Все категории</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>
            
            <div class="setting">
              <label>Количество вопросов:</label>
              <select v-model="practiceQuestionCount">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            
            <div class="setting">
              <label>Только сложные вопросы:</label>
              <input type="checkbox" v-model="practiceOnlyBookmarked">
            </div>
          </div>
          
          <button @click="startPractice" class="primary-button">
            Начать тренировку
          </button>
        </div>
        
        <div v-else class="practice-session">
          <div class="practice-progress">
            <div class="progress-text">
              Вопрос {{ currentPracticeIndex + 1 }} из {{ practiceQuestions.length }}
            </div>
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: `${((currentPracticeIndex + 1) / practiceQuestions.length) * 100}%` }"
              ></div>
            </div>
          </div>
          
          <div class="practice-question">
            <h2>{{ practiceQuestions[currentPracticeIndex].вопрос }}</h2>
            <div class="category-badge">
              {{ practiceQuestions[currentPracticeIndex].категория }}
            </div>
          </div>
          
          <div class="practice-timer" v-if="!showPracticeAnswer">
            <div class="timer">{{ formattedTimer }}</div>
            <p class="timer-hint">Ответьте на вопрос вслух</p>
          </div>
          
          <div class="practice-controls">
            <button 
              v-if="!showPracticeAnswer" 
              @click="showPracticeAnswer = true" 
              class="primary-button"
            >
              Показать ответ
            </button>
            
            <div v-else class="practice-answer">
              <h3>Эталонный ответ:</h3>
              <div class="answer-content">
                <p v-for="(paragraph, i) in practiceParagraphs" :key="i">{{ paragraph }}</p>
              </div>
              
              <div class="self-evaluation">
                <p>Как вы оцениваете свой ответ?</p>
                <div class="rating-buttons">
                  <button @click="rateAnswer(1)" class="rating-button poor">Плохо</button>
                  <button @click="rateAnswer(2)" class="rating-button fair">Удовлетворительно</button>
                  <button @click="rateAnswer(3)" class="rating-button good">Хорошо</button>
                  <button @click="rateAnswer(4)" class="rating-button excellent">Отлично</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <div class="results-modal" v-if="showResults">
      <div class="results-content">
        <h2>Результаты тренировки</h2>
        
        <div class="results-summary">
          <div class="result-item">
            <div class="result-label">Всего вопросов:</div>
            <div class="result-value">{{ practiceQuestions.length }}</div>
          </div>
          
          <div class="result-item">
            <div class="result-label">Уверенные ответы:</div>
            <div class="result-value">{{ practiceResults.filter(r => r >= 3).length }}</div>
          </div>
          
          <div class="result-item">
            <div class="result-label">Требуют доработки:</div>
            <div class="result-value">{{ practiceResults.filter(r => r < 3).length }}</div>
          </div>
        </div>
        
        <div class="results-questions">
          <h3>Вопросы, требующие дополнительной подготовки:</h3>
          <ul class="needs-improvement">
            <li v-for="(result, index) in practiceResults" :key="index">
              {{ practiceQuestions[index].вопрос }}
              <button 
                @click="bookmarkFromResults(practiceQuestions[index])" 
                class="bookmark-button"
              >
                Добавить в закладки
              </button>
            </li>
          </ul>
        </div>
        
        <div class="results-actions">
          <button @click="closeResults" class="secondary-button">Закрыть</button>
          <button @click="restartPractice" class="primary-button">Новая тренировка</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import interviewMockData from './mock-interview-data';

export default {
  name: 'InterviewPreparation',
  
  setup() {
    // Режимы работы
    const mode = ref('learn');
    const questions = ref(interviewMockData.вопросы);
    
    // Фильтрация и поиск
    const selectedCategory = ref('');
    const searchQuery = ref('');
    const currentQuestionIndex = ref(0);
    const showAnswer = ref(false);
    
    // Закладки и заметки
    const bookmarkedQuestions = ref([]);
    const notes = ref({});
    
    // Вычисляемые свойства
    const categories = computed(() => {
      const uniqueCategories = new Set();
      questions.value.forEach(q => {
        if (q.категория) {
          uniqueCategories.add(q.категория);
        }
      });
      return Array.from(uniqueCategories).sort();
    });
    
    const filteredQuestions = computed(() => {
      return questions.value.filter(q => {
        const matchesCategory = !selectedCategory.value || q.категория === selectedCategory.value;
        const matchesSearch = !searchQuery.value || 
                              q.вопрос.toLowerCase().includes(searchQuery.value.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    });
    
    const currentQuestion = computed(() => {
      if (filteredQuestions.value.length === 0) return null;
      return filteredQuestions.value[currentQuestionIndex.value];
    });
    
    const answerParagraphs = computed(() => {
      if (!currentQuestion.value) return [];
      return currentQuestion.value.ответ.split('\n\n').filter(p => p.trim());
    });
    
    // Обработчики для обучения
    const toggleAnswerVisibility = () => {
      showAnswer.value = !showAnswer.value;
    };
    
    const toggleBookmark = (index) => {
      const actualIndex = filteredQuestions.value[index] ? 
        questions.value.findIndex(q => q.вопрос === filteredQuestions.value[index].вопрос) : -1;
      
      if (actualIndex !== -1) {
        const bookmarkIndex = bookmarkedQuestions.value.indexOf(actualIndex);
        if (bookmarkIndex === -1) {
          bookmarkedQuestions.value.push(actualIndex);
        } else {
          bookmarkedQuestions.value.splice(bookmarkIndex, 1);
        }
        // Сохраняем закладки в localStorage
        localStorage.setItem('interview-bookmarks', JSON.stringify(bookmarkedQuestions.value));
      }
    };
    
    const resetCurrentQuestion = () => {
      currentQuestionIndex.value = 0;
    };
    
    // Режим тренировки
    const practiceStarted = ref(false);
    const practiceCategory = ref('');
    const practiceQuestionCount = ref(10);
    const practiceOnlyBookmarked = ref(false);
    const practiceQuestions = ref([]);
    const currentPracticeIndex = ref(0);
    const showPracticeAnswer = ref(false);
    const practiceResults = ref([]);
    const showResults = ref(false);
    const timerSeconds = ref(0);
    const timerInterval = ref(null);
    
    const practiceParagraphs = computed(() => {
      if (!practiceQuestions.value[currentPracticeIndex.value]) return [];
      return practiceQuestions.value[currentPracticeIndex.value].ответ.split('\n\n').filter(p => p.trim());
    });
    
    const formattedTimer = computed(() => {
      const minutes = Math.floor(timerSeconds.value / 60);
      const seconds = timerSeconds.value % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    });
    
    const startPractice = () => {
      // Формируем набор вопросов для тренировки
      let availableQuestions = [...questions.value];
      
      // Фильтруем по категории если выбрана
      if (practiceCategory.value) {
        availableQuestions = availableQuestions.filter(q => q.категория === practiceCategory.value);
      }
      
      // Фильтруем только закладки если выбрано
      if (practiceOnlyBookmarked.value) {
        availableQuestions = availableQuestions.filter((q, index) => 
          bookmarkedQuestions.value.includes(index)
        );
      }
      
      // Перемешиваем вопросы и выбираем нужное количество
      availableQuestions = shuffleArray(availableQuestions);
      practiceQuestions.value = availableQuestions.slice(0, practiceQuestionCount.value);
      
      // Если вопросов не хватает, берем сколько есть
      if (practiceQuestions.value.length === 0) {
        alert('Нет вопросов, соответствующих выбранным критериям. Пожалуйста, измените параметры.');
        return;
      }
      
      // Сбрасываем все значения и запускаем тренировку
      currentPracticeIndex.value = 0;
      showPracticeAnswer.value = false;
      practiceResults.value = [];
      practiceStarted.value = true;
      
      // Запускаем таймер
      timerSeconds.value = 0;
      if (timerInterval.value) clearInterval(timerInterval.value);
      timerInterval.value = setInterval(() => {
        timerSeconds.value++;
      }, 1000);
    };
    
    const rateAnswer = (rating) => {
      practiceResults.value[currentPracticeIndex.value] = rating;
      
      // Переходим к следующему вопросу или показываем результаты
      if (currentPracticeIndex.value < practiceQuestions.value.length - 1) {
        currentPracticeIndex.value++;
        showPracticeAnswer.value = false;
        timerSeconds.value = 0; // Сбрасываем таймер
      } else {
        // Закончили тренировку
        showResults.value = true;
        if (timerInterval.value) {
          clearInterval(timerInterval.value);
          timerInterval.value = null;
        }
      }
    };
    
    const closeResults = () => {
      showResults.value = false;
      practiceStarted.value = false;
    };
    
    const restartPractice = () => {
      showResults.value = false;
      practiceStarted.value = false;
    };
    
    const bookmarkFromResults = (question) => {
      const index = questions.value.findIndex(q => q.вопрос === question.вопрос);
      if (index !== -1 && !bookmarkedQuestions.value.includes(index)) {
        bookmarkedQuestions.value.push(index);
        localStorage.setItem('interview-bookmarks', JSON.stringify(bookmarkedQuestions.value));
      }
    };
    
    // Вспомогательные функции
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    
    const setMode = (newMode) => {
      mode.value = newMode;
      
      // Сбрасываем состояние при переключении режимов
      if (newMode === 'practice') {
        practiceStarted.value = false;
      }
    };
    
    // Загрузка сохраненных данных
    onMounted(() => {
      // Загружаем закладки
      const savedBookmarks = localStorage.getItem('interview-bookmarks');
      if (savedBookmarks) {
        try {
          bookmarkedQuestions.value = JSON.parse(savedBookmarks);
        } catch (e) {
          console.error('Ошибка при загрузке закладок:', e);
        }
      }
      
      // Загружаем заметки
      const savedNotes = localStorage.getItem('interview-notes');
      if (savedNotes) {
        try {
          notes.value = JSON.parse(savedNotes);
        } catch (e) {
          console.error('Ошибка при загрузке заметок:', e);
        }
      }
    });
    
    // Сохраняем заметки при изменении
    watch(notes, (newNotes) => {
      localStorage.setItem('interview-notes', JSON.stringify(newNotes));
    }, { deep: true });
    
    return {
      // Данные
      questions,
      categories,
      selectedCategory,
      searchQuery,
      currentQuestionIndex,
      filteredQuestions,
      currentQuestion,
      answerParagraphs,
      showAnswer,
      bookmarkedQuestions,
      notes,
      mode,
      
      // Обучение
      toggleAnswerVisibility,
      toggleBookmark,
      resetCurrentQuestion,
      setMode,
      
      // Тренировка
      practiceStarted,
      practiceCategory,
      practiceQuestionCount,
      practiceOnlyBookmarked,
      practiceQuestions,
      currentPracticeIndex,
      showPracticeAnswer,
      practiceParagraphs,
      practiceResults,
      showResults,
      timerSeconds,
      formattedTimer,
      
      startPractice,
      rateAnswer,
      closeResults,
      restartPractice,
      bookmarkFromResults
    };
  }
};
</script>

<style scoped>
.interview-preparation {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
  position: relative;
}

/* Заголовок и элементы управления */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.header h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 28px;
}

.controls {
  display: flex;
  gap: 15px;
  align-items: center;
}

.mode-switcher {
  display: flex;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
}

.mode-switcher button {
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.mode-switcher button.active {
  background-color: #3498db;
  color: white;
}

.filter-container select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  min-width: 200px;
}

/* Основной контент */
.main-content {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

/* Режим обучения */
.learn-mode {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 30px;
  min-height: 600px;
}

.question-list {
  background-color: #f9f9f9;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
}

.list-header {
  padding: 15px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #eee;
}

.list-header h2 {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #2c3e50;
}

.search-box input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.list-container {
  flex: 1;
  overflow-y: auto;
  max-height: 600px;
}

.question-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.question-item:hover {
  background-color: #f0f4f8;
}

.question-item.active {
  background-color: #e3f2fd;
  border-left: 4px solid #3498db;
}

.question-text {
  font-size: 15px;
  margin-bottom: 8px;
  font-weight: 500;
  padding-right: 25px; /* Место для закладки */
}

.question-category {
  font-size: 12px;
  color: #666;
  background-color: #eee;
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
}

.bookmark-indicator {
  position: absolute;
  top: 15px;
  right: 15px;
  color: #ccc;
  cursor: pointer;
  transition: all 0.2s ease;
}

.bookmark-indicator:hover {
  transform: scale(1.2);
}

.bookmark-indicator.bookmarked {
  color: #f39c12;
}

.bookmark-icon {
  font-size: 16px;
}

.question-details {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  min-height: 600px;
}

.detail-header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.detail-header h2 {
  margin: 0 0 10px 0;
  font-size: 22px;
  color: #2c3e50;
}

.category-badge {
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.question-answer, .question-notes {
  margin-bottom: 30px;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-title h3 {
  margin: 0;
  font-size: 18px;
  color: #2c3e50;
}

.toggle-button {
  padding: 6px 12px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease;
}

.toggle-button:hover {
  background-color: #e0e0e0;
}

.answer-content {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  line-height: 1.6;
  font-size: 15px;
  white-space: pre-line;
}

.answer-placeholder {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  color: #666;
  text-align: center;
  font-style: italic;
}

textarea {
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
}

/* Режим тренировки */
.practice-mode {
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #eee;
  min-height: 500px;
}

.practice-start {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 30px 0;
}

.practice-start h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.practice-start p {
  margin-bottom: 30px;
  color: #666;
  line-height: 1.6;
}

.practice-settings {
  margin-bottom: 30px;
  text-align: left;
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.setting {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.setting label {
  width: 200px;
  font-weight: 500;
}

.setting select, .setting input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
}

.primary-button {
  padding: 12px 24px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.primary-button:hover {
  background-color: #2980b9;
}

.practice-session {
  min-height: 500px;
}

.practice-progress {
  margin-bottom: 30px;
}

.progress-text {
  margin-bottom: 10px;
  font-weight: 500;
  color: #666;
}

.progress-bar {
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #3498db;
  transition: width 0.3s ease;
}

.practice-question {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.practice-question h2 {
  margin: 0 0 15px 0;
  font-size: 22px;
  color: #2c3e50;
}

.practice-timer {
  text-align: center;
  margin: 40px 0;
}

.timer {
  font-size: 48px;
  font-weight: 700;
  color: #3498db;
  margin-bottom: 10px;
}

.timer-hint {
  color: #666;
  font-style: italic;
}

.practice-controls {
  text-align: center;
  margin-top: 30px;
}

.practice-answer {
  text-align: left;
  margin-top: 30px;
}

.practice-answer h3 {
  margin-bottom: 15px;
  color: #2c3e50;
}

.self-evaluation {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  text-align: center;
}

.self-evaluation p {
  margin-bottom: 15px;
  font-weight: 500;
}

.rating-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.rating-button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.rating-button.poor {
  background-color: #e74c3c;
  color: white;
}

.rating-button.fair {
  background-color: #f39c12;
  color: white;
}

.rating-button.good {
  background-color: #2ecc71;
  color: white;
}

.rating-button.excellent {
  background-color: #3498db;
  color: white;
}

.rating-button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* Модальное окно с результатами */
.results-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.results-content {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.results-content h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
}

.results-summary {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.result-item {
  text-align: center;
}

.result-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.result-value {
  font-size: 24px;
  font-weight: 700;
  color: #3498db;
}

.results-questions {
  margin-bottom: 30px;
}

.results-questions h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 16px;
  color: #2c3e50;
}

.needs-improvement {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.needs-improvement li {
  padding: 12px;
  background-color: #fff8e1;
  border-radius: 6px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bookmark-button {
  padding: 6px 12px;
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.bookmark-button:hover {
  background-color: #e67e22;
}

.results-actions {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.secondary-button {
  padding: 12px 24px;
  background-color: #95a5a6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
}

.secondary-button:hover {
  background-color: #7f8c8d;
}

/* Адаптивная версия */
@media (max-width: 992px) {
  .learn-mode {
    grid-template-columns: 1fr;
  }
  
  .question-list {
    max-height: 300px;
  }
}

@media (max-width: 576px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .controls {
    flex-direction: column;
    width: 100%;
  }
  
  .mode-switcher {
    width: 100%;
  }
  
  .mode-switcher button {
    flex: 1;
  }
  
  .filter-container {
    width: 100%;
  }
  
  .filter-container select {
    width: 100%;
  }
  
  .results-summary {
    grid-template-columns: 1fr;
  }
  
  .results-actions {
    flex-direction: column;
  }
  
  .rating-buttons {
    flex-wrap: wrap;
  }
  
  .rating-button {
    flex: 1;
    min-width: 45%;
  }
}
</style>