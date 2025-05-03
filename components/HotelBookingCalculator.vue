<template>
    <div class="hotel-booking-calculator">
      <h1>Расчет стоимости проживания в отеле</h1>
      
      <div class="task-description">
        <h2>Задача:</h2>
        <pre>{{ taskDescription }}</pre>
      </div>
      
      <div class="solution-container">
        <h2>Решение:</h2>
        <pre><code>{{ solutionCode }}</code></pre>
        
        <div class="calculator-demo">
          <h3>Демонстрация работы:</h3>
          <div class="inputs">
            <div class="input-group">
              <label for="nights">Количество ночей:</label>
              <input id="nights" v-model.number="nights" type="number" min="1">
            </div>
            
            <div class="input-group">
              <label for="check-in-date">Дата заселения:</label>
              <input id="check-in-date" v-model="checkInDateString" type="date">
            </div>
            
            <button @click="calculate" :disabled="!isValid">Рассчитать</button>
          </div>
          
          <div v-if="showResult" class="result">
            <div class="animation-container">
              <div class="calendar">
                <div class="calendar-header">
                  <span>{{ formatMonth(checkInDate) }}</span>
                </div>
                <div class="weekdays">
                  <span v-for="day in weekDays" :key="day">{{ day }}</span>
                </div>
                <div class="days-grid">
                  <div 
                    v-for="(day, index) in calendarDays" 
                    :key="index" 
                    :class="getDayClass(day)"
                  >
                    {{ day.date }}
                    <span v-if="day.price" class="day-price">{{ day.price }} ₽</span>
                  </div>
                </div>
              </div>
              
              <div class="calculation-steps">
                <div class="steps-header">
                  <h3>Шаги расчета:</h3>
                </div>
                <div class="steps-content">
                  <div 
                    v-for="(step, index) in calculationSteps" 
                    :key="index" 
                    class="calculation-step"
                    :class="{ 'active': currentStep >= index }"
                  >
                    <div class="step-number">{{ index + 1 }}</div>
                    <div class="step-description">
                      <div v-html="step.description"></div>
                      <div v-if="step.price" class="step-price">{{ step.price }} ₽</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="total-price">
              <h3>Итоговая стоимость:</h3>
              <div class="price-value">{{ totalPrice }} ₽</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="pitfalls">
        <h2>Подводные камни:</h2>
        <ul>
          <li v-for="(pitfall, index) in pitfalls" :key="index">
            <strong>{{ pitfall.title }}:</strong> {{ pitfall.description }}
            <pre v-if="pitfall.code"><code>{{ pitfall.code }}</code></pre>
            <div v-if="pitfall.solution" class="pitfall-solution">
              <strong>Решение:</strong> {{ pitfall.solution }}
              <pre v-if="pitfall.solutionCode"><code>{{ pitfall.solutionCode }}</code></pre>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        taskDescription: `// Необходимо написать функцию расчета стоимости проживания посетителя в отеле
  // Функция может принимать 2 аргумента
  // 1. Количество ночей проживания в отеле (обязательный параметр)
  // 2. Дата заселения (необязательный параметр). Если значение не указано, то отсчет ведется от текущего дня
  // Стоимость проживания в будние дни (с понедельника по пятницу) стоит 1500 руб.
  // Стоимость проживания в выходные дни (суббота, воскресенье) стоит 2200 руб.
  
  const prices = {
    weekday: 1500,
    holiday: 2200,
  };
  
  function bookingCalculate() {}
  
  console.log(bookingCalculate(7)); // 11900
  console.log(bookingCalculate(3, new Date("2023-11-10"))); // 5900`,
  
        solutionCode: `function bookingCalculate(nights, checkInDate = new Date()) {
    // Проверка входных данных
    if (!nights || typeof nights !== 'number' || nights <= 0) {
      throw new Error('Количество ночей должно быть положительным числом');
    }
  
    let totalPrice = 0;
    const currentDate = new Date(checkInDate);
    
    // Расчет стоимости для каждой ночи
    for (let i = 0; i < nights; i++) {
      const dayOfWeek = currentDate.getDay();
      // getDay() возвращает 0 для воскресенья и 6 для субботы
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      // Добавляем стоимость в зависимости от дня недели
      totalPrice += isWeekend ? prices.holiday : prices.weekday;
      
      // Переходим к следующему дню
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return totalPrice;
  }`,
  
        nights: 7,
        checkInDateString: new Date().toISOString().split('T')[0],
        showResult: false,
        totalPrice: 0,
        calculationSteps: [],
        currentStep: 0,
        calendarDays: [],
        weekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        
        pitfalls: [
          {
            title: "Работа с датами в JavaScript",
            description: "JavaScript имеет особенности при работе с объектами Date. Важно помнить, что методы Date мутируют исходный объект, а не создают новый.",
            code: `const date = new Date("2023-11-10");
  console.log(date); // Fri Nov 10 2023...
  
  date.setDate(date.getDate() + 1);
  console.log(date); // Sat Nov 11 2023... (исходный объект изменился)`,
            solution: "Всегда создавайте копию объекта Date, если не хотите мутировать оригинал:",
            solutionCode: `const originalDate = new Date("2023-11-10");
  const newDate = new Date(originalDate); // Создаем копию
  
  newDate.setDate(newDate.getDate() + 1); // Модифицируем копию
  console.log(originalDate); // Оригинал остался неизменным`
          },
          {
            title: "Неделя начинается с воскресенья",
            description: "В JavaScript метод getDay() возвращает 0 для воскресенья, 1 для понедельника и так далее. Это может быть неожиданным, если вы привыкли, что неделя начинается с понедельника.",
            code: `const sunday = new Date("2023-11-12"); // Воскресенье
  console.log(sunday.getDay()); // 0
  
  const saturday = new Date("2023-11-11"); // Суббота
  console.log(saturday.getDay()); // 6`,
            solution: "Явно определяйте, какие дни недели считаются выходными:",
            solutionCode: `// Явное определение выходных дней
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // 0 = воскресенье, 6 = суббота`
          },
          {
            title: "Проблемы с часовыми поясами",
            description: "JavaScript работает с датами в UTC, что может вызвать неожиданное поведение при работе с локальным временем.",
            solution: "Для работы с днями недели лучше использовать методы, которые работают с локальной датой, такие как getDay(). При создании даты явно указывайте год, месяц и день, чтобы избежать проблем с часовыми поясами:"
          },
          {
            title: "Валидация входных данных",
            description: "Не забывайте проверять входные данные. Например, количество ночей должно быть положительным числом, а дата заселения должна быть валидной датой.",
            code: `// Что если передали некорректное значение?
  bookingCalculate(-7); // Должны ли мы обрабатывать отрицательные значения?
  bookingCalculate('7'); // Неверный тип данных
  bookingCalculate(7, 'не дата'); // Неверный формат даты`,
            solution: "Добавьте проверки во входных данных:",
            solutionCode: `// Проверка количества ночей
  if (!nights || typeof nights !== 'number' || nights <= 0) {
    throw new Error('Количество ночей должно быть положительным числом');
  }
  
  // Проверка даты заселения
  if (checkInDate && !(checkInDate instanceof Date) && isNaN(new Date(checkInDate))) {
    throw new Error('Некорректная дата заселения');
  }`
          },
          {
            title: "Особенности вычислений",
            description: "Важно понимать, что мы рассчитываем стоимость за ночи проживания, а не за дни. Заселение происходит в один день, а выселение - в другой, что может вызвать путаницу в расчетах.",
            solution: "Четко определите, за что взимается плата - за ночи проживания или за дни. В нашем примере плата взимается за каждую ночь, поэтому мы рассчитываем стоимость на основе дня заезда и последующих дней."
          }
        ]
      };
    },
    
    computed: {
      checkInDate() {
        return new Date(this.checkInDateString);
      },
      
      isValid() {
        return this.nights > 0 && !isNaN(this.checkInDate.getTime());
      }
    },
    
    methods: {
      calculate() {
        if (!this.isValid) return;
        
        this.showResult = true;
        this.currentStep = 0;
        this.calculationSteps = [];
        this.totalPrice = 0;
        
        // Генерируем календарь
        this.generateCalendar();
        
        // Рассчитываем стоимость и создаем шаги
        const currentDate = new Date(this.checkInDate);
        
        this.calculationSteps.push({
          description: `Начало расчета: дата заселения <strong>${this.formatDate(currentDate)}</strong>`
        });
        
        for (let i = 0; i < this.nights; i++) {
          const dayOfWeek = currentDate.getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          const price = isWeekend ? 2200 : 1500;
          
          this.totalPrice += price;
          
          this.calculationSteps.push({
            description: `День ${i + 1}: ${this.formatDate(currentDate)} - ${this.weekDays[dayOfWeek]} ${isWeekend ? '<strong>(выходной)</strong>' : '<strong>(будний)</strong>'}`,
            price: price
          });
          
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
        this.calculationSteps.push({
          description: `Итоговая стоимость за ${this.nights} ${this.getNightsWord(this.nights)}:`,
          price: this.totalPrice
        });
        
        // Запуск анимации расчета
        this.animateCalculation();
      },
      
      animateCalculation() {
        this.currentStep = 0;
        
        const animateStep = () => {
          if (this.currentStep < this.calculationSteps.length) {
            this.currentStep++;
            setTimeout(() => {
              animateStep();
            }, 1000); // Скорость анимации - 1 секунда на шаг
          }
        };
        
        animateStep();
      },
      
      generateCalendar() {
        this.calendarDays = [];
        
        const date = new Date(this.checkInDate);
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 = воскресенье
        
        // Добавляем пустые ячейки в начале месяца
        for (let i = 0; i < firstDayOfWeek; i++) {
          this.calendarDays.push({ empty: true });
        }
        
        // Добавляем дни месяца
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        
        for (let i = 1; i <= lastDay; i++) {
          const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
          const dayOfWeek = currentDate.getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          
          const isInBookingRange = this.isDateInBookingRange(currentDate);
          
          this.calendarDays.push({
            date: i,
            weekday: dayOfWeek,
            isWeekend,
            isCheckIn: i === date.getDate(),
            isInBookingRange,
            price: isInBookingRange ? (isWeekend ? 2200 : 1500) : null
          });
        }
      },
      
      isDateInBookingRange(date) {
        const startDate = new Date(this.checkInDate);
        startDate.setHours(0, 0, 0, 0);
        
        const endDate = new Date(this.checkInDate);
        endDate.setDate(endDate.getDate() + this.nights - 1);
        endDate.setHours(23, 59, 59, 999);
        
        return date >= startDate && date <= endDate;
      },
      
      getDayClass(day) {
        if (day.empty) return 'empty-day';
        
        return {
          'calendar-day': true,
          'weekend': day.isWeekend,
          'check-in': day.isCheckIn,
          'in-range': day.isInBookingRange
        };
      },
      
      formatDate(date) {
        return date.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      },
      
      formatMonth(date) {
        return date.toLocaleDateString('ru-RU', {
          month: 'long',
          year: 'numeric'
        });
      },
      
      getNightsWord(nights) {
        const lastDigit = nights % 10;
        const lastTwoDigits = nights % 100;
        
        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
          return 'ночей';
        }
        
        if (lastDigit === 1) {
          return 'ночь';
        }
        
        if (lastDigit >= 2 && lastDigit <= 4) {
          return 'ночи';
        }
        
        return 'ночей';
      }
    }
  };
  </script>
  
  <style scoped>
  .hotel-booking-calculator {
    font-family: Arial, sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
  }
  
  h1, h2, h3 {
    color: #2c3e50;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 30px;
  }
  
  pre {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 14px;
    line-height: 1.5;
    border: 1px solid #e9ecef;
  }
  
  code {
    color: #e74c3c;
  }
  
  .task-description {
    margin-bottom: 30px;
  }
  
  .solution-container {
    margin-bottom: 30px;
  }
  
  .calculator-demo {
    margin-top: 30px;
    padding: 20px;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    background-color: #f8f9fa;
  }
  
  .inputs {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  label {
    font-weight: bold;
  }
  
  input {
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    width: 150px;
  }
  
  button {
    padding: 8px 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    align-self: flex-end;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .result {
    margin-top: 20px;
    animation: fadeIn 0.5s;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animation-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .calendar {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .calendar-header {
    background-color: #3498db;
    color: white;
    padding: 10px;
    text-align: center;
    font-weight: bold;
  }
  
  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background-color: #f1f1f1;
    padding: 10px 0;
    text-align: center;
    font-weight: bold;
  }
  
  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
    padding: 5px;
  }
  
  .calendar-day, .empty-day {
    height: 60px;
    padding: 5px;
    text-align: center;
    position: relative;
    border-radius: 4px;
  }
  
  .calendar-day {
    background-color: #f9f9f9;
  }
  
  .empty-day {
    background-color: transparent;
  }
  
  .weekend {
    background-color: #fff8e1;
  }
  
  .check-in {
    background-color: #e3f2fd;
    border: 2px solid #2196f3;
  }
  
  .in-range {
    background-color: #e8f5e9;
  }
  
  .day-price {
    display: block;
    font-size: 12px;
    margin-top: 5px;
    color: #e74c3c;
  }
  
  .calculation-steps {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .steps-header {
    background-color: #3498db;
    color: white;
    padding: 10px;
    text-align: center;
    font-weight: bold;
  }
  
  .steps-content {
    padding: 10px;
    max-height: 300px;
    overflow-y: auto;
  }
  
  .calculation-step {
    display: flex;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 4px;
    opacity: 0.5;
    transition: all 0.3s;
  }
  
  .calculation-step.active {
    opacity: 1;
    background-color: #e8f5e9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: #3498db;
    color: white;
    border-radius: 50%;
    margin-right: 10px;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  .step-description {
    flex: 1;
  }
  
  .step-price {
    font-weight: bold;
    color: #e74c3c;
    margin-top: 5px;
  }
  
  .total-price {
    margin-top: 20px;
    text-align: center;
  }
  
  .price-value {
    font-size: 24px;
    font-weight: bold;
    color: #e74c3c;
  }
  
  .pitfalls {
    margin-top: 40px;
  }
  
  .pitfalls ul {
    padding-left: 20px;
  }
  
  .pitfalls li {
    margin-bottom: 20px;
  }
  
  .pitfall-solution {
    margin-top: 10px;
    padding: 10px;
    background-color: #e8f5e9;
    border-radius: 4px;
    border-left: 3px solid #4caf50;
  }
  
  @media (max-width: 768px) {
    .animation-container {
      grid-template-columns: 1fr;
    }
  }
  </style>