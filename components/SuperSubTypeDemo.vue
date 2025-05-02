<template>
    <div class="subtyping-demo">
      <h1>Супертипы и подтипы в TypeScript: глубокое погружение</h1>
      <p class="intro">Разберем концепцию типизации, отношения между типами и потенциальные проблемы</p>
      
      <div class="navigation-tabs">
        <button 
          v-for="(tab, index) in tabs" 
          :key="tab.id"
          :class="{ active: currentTab === index }"
          @click="currentTab = index"
        >
          {{ tab.title }}
        </button>
      </div>
      
      <div class="content-container">
        <!-- 1. Основы типизации и отношения между типами -->
        <section v-if="currentTab === 0" class="tab-content">
          <h2>Основы типизации и отношения между типами</h2>
          
          <div class="concept-explanation">
            <h3>Что такое супертип и подтип?</h3>
            <p><strong>Супертип</strong> — это тип, который менее конкретен и может содержать значения различных более конкретных типов.</p>
            <p><strong>Подтип</strong> — это более конкретный тип, все значения которого также принадлежат некоему более общему типу (супертипу).</p>
            <p>Проще говоря: подтип можно безопасно присвоить супертипу, но не наоборот.</p>
          </div>
          
          <div class="type-hierarchy">
            <h3>Иерархия типов в TypeScript</h3>
            
            <div class="hierarchy-diagram">
              <div class="hierarchy-node top-type">
                <span>unknown</span>
                <div class="node-description">Верхний тип (top type)</div>
              </div>
              
              <div class="hierarchy-branch">
                <div class="hierarchy-node super-type">
                  <span>object</span>
                </div>
                <div class="hierarchy-node super-type">
                  <span>Объединения (Union)</span>
                </div>
                <div class="hierarchy-node super-type">
                  <span>any</span>
                  <div class="node-description">Особый тип, избегает проверок</div>
                </div>
              </div>
              
              <div class="hierarchy-branch sub-levels">
                <div class="hierarchy-node sub-type">
                  <span>Интерфейсы</span>
                </div>
                <div class="hierarchy-node sub-type">
                  <span>Классы</span>
                </div>
                <div class="hierarchy-node sub-type">
                  <span>Литералы</span>
                </div>
              </div>
              
              <div class="hierarchy-node bottom-type">
                <span>never</span>
                <div class="node-description">Нижний тип (bottom type)</div>
              </div>
            </div>
            
            <div class="example-box">
              <h4>Пример отношения типов</h4>
              <pre class="code-block">
  // Отношение супертип -> подтип
  type Animal = { name: string };
  type Dog = { name: string; breed: string };
  
  const animal: Animal = { name: "Животное" };
  const dog: Dog = { name: "Бобик", breed: "Дворняга" };
  
  // Можно присвоить подтип супертипу
  const someAnimal: Animal = dog; // ✓ Работает
  
  // Нельзя присвоить супертип подтипу без утверждения типа
  // const someDog: Dog = animal; // ✗ Ошибка: отсутствует свойство 'breed'
  
  // Использование операторов расширения и пересечения
  type Pet = Animal & { owner: string }; // Пересечение: подтип Animal
  type LivingBeing = Animal | { species: string }; // Объединение: супертип Animal
  </pre>
            </div>
          </div>
          
          <div class="subtyping-rules">
            <h3>Основные правила отношений между типами</h3>
            <div class="rule-card">
              <div class="rule-header">Правило 1: Расширение свойств</div>
              <div class="rule-content">
                <p>Тип S является подтипом типа T, если S имеет все свойства T и, возможно, дополнительные свойства.</p>
                <div class="rule-example">
                  <pre class="code-block">
  type Person = { name: string; age: number };
  type Employee = { name: string; age: number; salary: number }; // Подтип Person
  
  const employee: Employee = { name: "Иван", age: 30, salary: 50000 };
  const person: Person = employee; // ✓ Работает
  </pre>
                </div>
              </div>
            </div>
            
            <div class="rule-card">
              <div class="rule-header">Правило 2: Совместимость примитивов и литералов</div>
              <div class="rule-content">
                <p>Литеральные типы являются подтипами их примитивных типов.</p>
                <div class="rule-example">
                  <pre class="code-block">
  type Direction = "north" | "south" | "east" | "west";
  const dir: Direction = "north";
  const str: string = dir; // ✓ Работает: литерал -> примитив
  
  // Но не наоборот
  const someString: string = "hello";
  // const someDirection: Direction = someString; // ✗ Ошибка
  </pre>
                </div>
              </div>
            </div>
            
            <div class="rule-card">
              <div class="rule-header">Правило 3: Правило пустого множества</div>
              <div class="rule-content">
                <p>Тип <code>never</code> является подтипом любого типа, а любой тип является подтипом <code>unknown</code>.</p>
                <div class="rule-example">
                  <pre class="code-block">
  function neverReturns(): never {
    throw new Error("Никогда не возвращает значение");
  }
  
  const value: string = neverReturns(); // ✓ Работает: never -> string
  const anything: unknown = "Строка";   // ✓ Работает: string -> unknown
  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- 2. Вариантность и присваиваемость типов -->
        <section v-if="currentTab === 1" class="tab-content">
          <h2>Вариантность и присваиваемость типов</h2>
          
          <div class="concept-explanation">
            <h3>Что такое вариантность?</h3>
            <p>Вариантность определяет, как отношения подтипов распространяются на составные типы (массивы, функции, дженерики).</p>
            <ul>
              <li><strong>Ковариантность</strong>: если A является подтипом B, то Container&lt;A&gt; является подтипом Container&lt;B&gt;</li>
              <li><strong>Контравариантность</strong>: если A является подтипом B, то Container&lt;B&gt; является подтипом Container&lt;A&gt;</li>
              <li><strong>Инвариантность</strong>: даже если A является подтипом B, между Container&lt;A&gt; и Container&lt;B&gt; нет отношения подтип-супертип</li>
              <li><strong>Бивариантность</strong>: Container&lt;A&gt; является подтипом Container&lt;B&gt; и наоборот</li>
            </ul>
          </div>
          
          <div class="variance-examples">
            <h3>Примеры вариантности в TypeScript</h3>
            
            <div class="variance-card">
              <div class="variance-header">Ковариантность массивов</div>
              <div class="variance-content">
                <p>Массивы в TypeScript являются ковариантными, но это может привести к ошибкам во время выполнения.</p>
                <pre class="code-block">
  // Ковариантность массивов
  type Animal = { name: string };
  type Dog = { name: string; bark(): void };
  
  function makeDogsNoise(dogs: Dog[]) {
    for (const dog of dogs) {
      dog.bark(); // Ожидает, что каждый элемент имеет метод bark()
    }
  }
  
  const myDogs: Dog[] = [
    { name: "Рекс", bark: () => console.log("Гав!") }
  ];
  
  // Массивы ковариантны, поэтому это допустимо
  const animals: Animal[] = myDogs;
  
  // ПОДВОДНЫЙ КАМЕНЬ: Мы можем добавить обычное животное в массив
  animals.push({ name: "Кот" });
  
  // Но при этом myDogs тоже изменился (тот же объект)
  // makeDogsNoise(myDogs); // 💥 Ошибка во время выполнения!
  </pre>
                <div class="variance-note">
                  <p>⚠️ <strong>Подводный камень</strong>: Несмотря на статическую типобезопасность, мутабельность массивов может привести к ошибкам во время выполнения из-за ковариантности.</p>
                </div>
              </div>
            </div>
            
            <div class="variance-card">
              <div class="variance-header">Контравариантность параметров функций</div>
              <div class="variance-content">
                <p>Типы параметров функций в TypeScript контравариантны.</p>
                <pre class="code-block">
  // Контравариантность функций
  type Animal = { name: string };
  type Dog = { name: string; bark(): void };
  
  // Функция, которая принимает Animal
  type AnimalCallback = (a: Animal) => void;
  
  // Функция, которая принимает Dog
  type DogCallback = (d: Dog) => void;
  
  function processAnimal(callback: AnimalCallback) {
    callback({ name: "Животное" });
  }
  
  const dogHandler: DogCallback = (dog) => {
    console.log(dog.name);
    dog.bark(); // Ожидаем метод bark()
  };
  
  // ПОДВОДНЫЙ КАМЕНЬ: Это НЕ работает!
  // processAnimal(dogHandler); // ✗ Ошибка: Animal не имеет метод bark()
  
  // Функция, принимающая супертип, может обрабатывать и подтипы
  const animalHandler: AnimalCallback = (animal) => {
    console.log(animal.name);
  };
  
  // Это работает, потому что Dog содержит все свойства Animal
  function processDog(callback: DogCallback) {
    callback({ name: "Бобик", bark: () => console.log("Гав!") });
  }
  
  processDog(animalHandler); // ✓ Работает
  </pre>
                <div class="variance-note">
                  <p>⚠️ <strong>Подводный камень</strong>: Контравариантность параметров функций не всегда интуитивно понятна: функция, принимающая более общий тип (супертип), может быть использована там, где ожидается функция, принимающая более конкретный тип (подтип).</p>
                </div>
              </div>
            </div>
            
            <div class="variance-card">
              <div class="variance-header">Бивариантность в TypeScript</div>
              <div class="variance-content">
                <p>В TypeScript параметры функций могут проявлять бивариантность при отключенной строгой проверке.</p>
                <pre class="code-block">
  // Пример бивариантности (без строгого режима)
  type Animal = { name: string };
  type Dog = { name: string; bark(): void };
  
  let animalCallback = (animal: Animal) => console.log(animal.name);
  let dogCallback = (dog: Dog) => { 
    console.log(dog.name);
    dog.bark();
  };
  
  // Без strictFunctionTypes это работает (бивариантность)
  // ⚠️ ОПАСНО: TypeScript позволяет это при отключенной строгой проверке
  animalCallback = dogCallback; // В неявном режиме - работает
  dogCallback = animalCallback; // В неявном режиме - работает, но опасно!
  
  // С включенным strictFunctionTypes:
  // animalCallback = dogCallback; // ✓ Работает: контравариантность
  // dogCallback = animalCallback; // ✗ Ошибка: animal не имеет метод bark
  </pre>
                <div class="variance-note">
                  <p>⚠️ <strong>Подводный камень</strong>: Бивариантность в TypeScript без <code>strictFunctionTypes</code> позволяет присваивать функции в обоих направлениях, что может привести к ошибкам во время выполнения.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- 3. Подводные камни при работе с типами -->
        <section v-if="currentTab === 2" class="tab-content">
          <h2>Подводные камни при работе с супертипами и подтипами</h2>
          
          <div class="concept-explanation">
            <p>При работе с типами в TypeScript есть множество неочевидных моментов, которые могут привести к ошибкам. Рассмотрим основные из них:</p>
          </div>
          
          <div class="pitfalls-container">
            <div class="pitfall-card">
              <div class="pitfall-header">
                <h3>1. Избыточные свойства (Excess Property Checks)</h3>
              </div>
              <div class="pitfall-content">
                <p>TypeScript проверяет избыточные свойства только при литеральном создании объекта, но не при присваивании переменных.</p>
                <div class="code-example">
                  <div class="example-part">
                    <h4>Пример избыточного свойства</h4>
                    <pre class="code-block">
  type User = {
    name: string;
    age: number;
  };
  
  // Ошибка: объект имеет лишнее свойство 'job'
  // const user: User = { name: "John", age: 30, job: "Developer" };
  
  // Но это работает! Объект с тем же лишним свойством:
  const person = { name: "John", age: 30, job: "Developer" };
  const user: User = person; // ✓ Работает
  </pre>
                  </div>
                  <div class="explanation-part">
                    <p>В первом случае TypeScript выполняет проверку избыточных свойств, потому что объект создается литерально.</p>
                    <p>Во втором случае переменная <code>person</code> сначала получает свой инферированный тип 
                      <code>{ name: string; age: number; job: string }</code>, который является подтипом <code>User</code>, 
                      поэтому присваивание проходит без ошибок.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="pitfall-card">
              <div class="pitfall-header">
                <h3>2. Структурная типизация vs номинальная</h3>
              </div>
              <div class="pitfall-content">
                <p>TypeScript использует структурную типизацию, а не номинальную. Это означает, что типы считаются совместимыми, если у них одинаковая структура, независимо от имени.</p>
                <div class="code-example">
                  <div class="example-part">
                    <h4>Пример структурной типизации</h4>
                    <pre class="code-block">
  // Два независимых типа с одинаковой структурой
  type Admin = {
    id: number;
    name: string;
  };
  
  type User = {
    id: number;
    name: string;
  };
  
  let admin: Admin = { id: 1, name: "Администратор" };
  let user: User = { id: 2, name: "Пользователь" };
  
  // Из-за структурной типизации эти типы совместимы
  admin = user; // ✓ Работает
  user = admin; // ✓ Работает
  
  // Если нужна номинальная типизация:
  type Admin = { id: number; name: string; _brand: "admin" };
  type User = { id: number; name: string; _brand: "user" };
  
  // Теперь они не совместимы
  // admin = user; // ✗ Ошибка
  // user = admin; // ✗ Ошибка
  </pre>
                  </div>
                  <div class="explanation-part">
                    <p>Из-за структурной типизации два типа с одинаковыми свойствами считаются совместимыми, даже если они имеют разные имена или предназначение.</p>
                    <p>Для имитации номинальной типизации можно использовать "брендирование" типов с помощью уникальных свойств или символов.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="pitfall-card">
              <div class="pitfall-header">
                <h3>3. Проблемы с дженериками</h3>
              </div>
              <div class="pitfall-content">
                <p>Дженерики могут вызывать неожиданные проблемы с типизацией из-за вариантности.</p>
                <div class="code-example">
                  <div class="example-part">
                    <h4>Пример проблем с дженериками</h4>
                    <pre class="code-block">
  interface Box&lt;T&gt; {
    value: T;
  }
  
  type Animal = { name: string };
  type Dog = { name: string; breed: string };
  
  const dogBox: Box&lt;Dog&gt; = {
    value: { name: "Рекс", breed: "Овчарка" }
  };
  
  // Дженерики обычно ковариантны по своим параметрам
  const animalBox: Box&lt;Animal&gt; = dogBox; // ✓ Работает
  
  // Мутабельность может привести к проблемам
  animalBox.value = { name: "Просто животное" }; // ✓ Допустимо
  // Теперь в dogBox.value больше нет свойства breed!
  
  // При использовании:
  console.log(dogBox.value.breed); // 💥 Ошибка во время выполнения!
  </pre>
                  </div>
                  <div class="explanation-part">
                    <p>Дженерики в TypeScript по умолчанию ковариантны по своим типовым параметрам, что может привести к проблемам при изменении значений.</p>
                    <p>В примере выше изменение <code>animalBox.value</code> приводит к тому, что в <code>dogBox.value</code> теперь отсутствует свойство <code>breed</code>, хотя статическая типизация предполагает, что оно должно там быть.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="pitfall-card">
              <div class="pitfall-header">
                <h3>4. "Нарушение" принципа подстановки Лисков</h3>
              </div>
              <div class="pitfall-content">
                <p>TypeScript иногда позволяет нарушать принцип подстановки Лисков из-за структурной типизации.</p>
                <div class="code-example">
                  <div class="example-part">
                    <h4>Пример нарушения LSP</h4>
                    <pre class="code-block">
  class Animal {
    eat(): void {
      console.log("Животное ест");
    }
  }
  
  class Bird extends Animal {
    fly(): void {
      console.log("Птица летит");
    }
  }
  
  class Penguin extends Bird {
    // Пингвины не летают, но класс Bird предполагает, что все птицы умеют летать
    fly(): void {
      throw new Error("Пингвины не умеют летать!");
    }
  }
  
  function makeItFly(bird: Bird) {
    bird.fly(); // 💥 Может вызвать ошибку для Penguin
  }
  
  const penguin = new Penguin();
  makeItFly(penguin); // 💥 Ошибка во время выполнения!
  
  // Лучший подход с интерфейсами:
  interface Animal {
    eat(): void;
  }
  
  interface Flyable {
    fly(): void;
  }
  
  class Bird implements Animal, Flyable {
    eat(): void { console.log("Птица ест"); }
    fly(): void { console.log("Птица летит"); }
  }
  
  class Penguin implements Animal {
    eat(): void { console.log("Пингвин ест"); }
    // Не реализует Flyable
  }
  </pre>
                  </div>
                  <div class="explanation-part">
                    <p>В первом примере из-за наследования класса и ожидаемого поведения мы нарушаем LSP: подкласс не может полноценно заменить базовый класс.</p>
                    <p>Лучший подход — использовать композицию интерфейсов вместо наследования классов, чтобы более точно моделировать отношения типов.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="pitfall-card">
              <div class="pitfall-header">
                <h3>5. Свойство readonly и вариантность</h3>
              </div>
              <div class="pitfall-content">
                <p>Readonly свойства и типы могут изменять вариантность.</p>
                <div class="code-example">
                  <div class="example-part">
                    <h4>Пример readonly и вариантности</h4>
                    <pre class="code-block">
  type Animal = { name: string };
  type Dog = { name: string; breed: string };
  
  // Массивы с возможностью мутации - проблемное место
  type AnimalArray = Array&lt;Animal&gt;;
  type DogArray = Array&lt;Dog&gt;;
  
  const dogs: DogArray = [{ name: "Рекс", breed: "Овчарка" }];
  const animals: AnimalArray = dogs; // ✓ Ковариантность - работает
  animals.push({ name: "Кот" }); // Добавили Animal, но не Dog!
  
  // А с readonly всё безопасно
  type ReadonlyAnimalArray = ReadonlyArray&lt;Animal&gt;;
  type ReadonlyDogArray = ReadonlyArray&lt;Dog&gt;;
  
  const readonlyDogs: ReadonlyDogArray = dogs;
  const readonlyAnimals: ReadonlyAnimalArray = readonlyDogs; // ✓ Работает
  // readonlyAnimals.push(...); // ✗ Ошибка: метод push не существует
  
  // Но это может усложнить другие операции
  function processDogs(dogs: DogArray) {
    dogs.push({ name: "Бобик", breed: "Дворняга" });
  }
  
  // processDogs(readonlyDogs); // ✗ Ошибка: ReadonlyArray не assignable к Array
  </pre>
                  </div>
                  <div class="explanation-part">
                    <p>Использование <code>readonly</code> делает типы безопаснее с точки зрения вариантности, но может ограничить способы их использования.</p>
                    <p>Readonly массивы (и объекты) гарантируют, что после присваивания значения не будут изменены, что делает ковариантность безопасной.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- 4. Практические паттерны -->
        <section v-if="currentTab === 3" class="tab-content">
          <h2>Практические паттерны и рекомендации</h2>
          
          <div class="concept-explanation">
            <p>Понимание супертипов и подтипов в TypeScript позволяет создавать более безопасный и гибкий код. Вот несколько практических паттернов и рекомендаций:</p>
          </div>
          
          <div class="patterns-container">
            <div class="pattern-card">
              <div class="pattern-header">
                <h3>1. Использование дискриминированных объединений</h3>
              </div>
              <div class="pattern-content">
                <div class="code-example">
                  <pre class="code-block">
  // Дискриминированные объединения
  type Circle = {
    kind: "circle";  // Дискриминатор
    radius: number;
  };
  
  type Rectangle = {
    kind: "rectangle";  // Дискриминатор
    width: number;
    height: number;
  };
  
  type Shape = Circle | Rectangle;  // Объединение с дискриминатором
  
  function calculateArea(shape: Shape): number {
    // TypeScript правильно определяет тип внутри веток
    switch (shape.kind) {
      case "circle":
        return Math.PI * shape.radius ** 2;  // shape здесь типизирован как Circle
      case "rectangle":
        return shape.width * shape.height;   // shape здесь типизирован как Rectangle
    }
  }
  
  // Использование
  const circle: Circle = { kind: "circle", radius: 5 };
  const rectangle: Rectangle = { kind: "rectangle", width: 10, height: 5 };
  
  console.log(calculateArea(circle));      // ≈ 78.54
  console.log(calculateArea(rectangle));   // 50
  </pre>
                </div>
                <div class="pattern-explanation">
                  <p>Дискриминированные объединения используют общее свойство-дискриминатор для определения конкретного типа.</p>
                  <p>Это создает безопасную типизацию при работе с различными типами, позволяя компилятору отслеживать правильное использование свойств в каждой ветке кода.</p>
                </div>
              </div>
            </div>
            
            <div class="pattern-card">
              <div class="pattern-header">
                <h3>2. Инвариантные контейнеры для безопасности</h3>
              </div>
              <div class="pattern-content">
                <div class="code-example">
                  <pre class="code-block">
  // Создаем инвариантный контейнер для безопасного хранения
  class InvariantBox&lt;T&gt; {
    private _value: T;
    
    constructor(value: T) {
      this._value = value;
    }
    
    get value(): T {
      return this._value;
    }
    
    set value(newValue: T) {
      this._value = newValue;
    }
  }
  
  type Animal = { name: string };
  type Dog = { name: string; breed: string };
  
  const dog: Dog = { name: "Рекс", breed: "Овчарка" };
  const dogBox = new InvariantBox&lt;Dog&gt;(dog);
  
  // Не допускается неявное преобразование типов
  // const animalBox: InvariantBox&lt;Animal&gt; = dogBox; // ✗ Ошибка
  // const dogBox2: InvariantBox&lt;Dog&gt; = new InvariantBox&lt;Animal&gt;({ name: "Животное" }); // ✗ Ошибка
  
  // Если нужно преобразование, делаем его явным
  function copyBox&lt;T, U extends T&gt;(source: InvariantBox&lt;U&gt;, target: InvariantBox&lt;T&gt;) {
    target.value = source.value; // Безопасно, т.к. U extends T
  }
  
  const animalBox = new InvariantBox&lt;Animal&gt;({ name: "Животное" });
  copyBox(dogBox, animalBox); // ✓ Работает: Dog -> Animal
  // copyBox(animalBox, dogBox); // ✗ Ошибка: Animal !-> Dog
  </pre>
                </div>
                <div class="pattern-explanation">
                  <p>Инвариантные контейнеры помогают предотвратить проблемы, связанные с ковариантностью и контравариантностью.</p>
                  <p>Они не позволяют неявно преобразовывать контейнеры между собой, даже если содержимое является подтипом/супертипом.</p>
                  <p>Для преобразования нужно использовать явные методы, которые гарантируют типобезопасность.</p>
                </div>
              </div>
            </div>
            
            <div class="pattern-card">
              <div class="pattern-header">
                <h3>3. Защищенные типы (Type Guards)</h3>
              </div>
              <div class="pattern-content">
                <div class="code-example">
                  <pre class="code-block">
  // Защищенные типы (Type Guards)
  type Animal = { name: string };
  type Dog = Animal & { breed: string; bark(): void };
  type Cat = Animal & { color: string; meow(): void };
  
  // Функции-предикаты для определения конкретного типа
  function isDog(animal: Animal): animal is Dog {
    return 'breed' in animal && typeof (animal as Dog).bark === 'function';
  }
  
  function isCat(animal: Animal): animal is Cat {
    return 'color' in animal && typeof (animal as Cat).meow === 'function';
  }
  
  function makeAnimalSound(animal: Animal) {
    // С помощью защищенных типов TypeScript понимает,
    // какой конкретно тип внутри ветки if
    if (isDog(animal)) {
      animal.bark(); // Здесь animal имеет тип Dog
    } else if (isCat(animal)) {
      animal.meow(); // Здесь animal имеет тип Cat
    } else {
      console.log(`Неизвестное животное: ${animal.name}`);
    }
  }
  
  // Использование
  const dog: Dog = { 
    name: "Рекс", 
    breed: "Овчарка", 
    bark: () => console.log("Гав!") 
  };
  
  const cat: Cat = { 
    name: "Мурзик", 
    color: "Рыжий", 
    meow: () => console.log("Мяу!") 
  };
  
  makeAnimalSound(dog);  // "Гав!"
  makeAnimalSound(cat);  // "Мяу!"
  </pre>
                </div>
                <div class="pattern-explanation">
                  <p>Защищенные типы (Type Guards) позволяют уточнить тип внутри определенных блоков кода.</p>
                  <p>Функции-предикаты со специальной сигнатурой <code>parameterName is Type</code> сообщают TypeScript, что если функция возвращает <code>true</code>, то параметр имеет указанный тип.</p>
                  <p>Это позволяет безопасно работать с подтипами, когда у вас есть переменная с типом супертипа.</p>
                </div>
              </div>
            </div>
            
            <div class="pattern-card">
              <div class="pattern-header">
                <h3>4. Типобезопасное расширение интерфейсов</h3>
              </div>
              <div class="pattern-content">
                <div class="code-example">
                  <pre class="code-block">
  // Базовый интерфейс
  interface BaseConfig {
    endpoint: string;
    timeout: number;
    retries?: number;
  }
  
  // Расширяем базовый интерфейс
  interface AuthConfig extends BaseConfig {
    token: string;
    refreshToken?: string;
  }
  
  // Функция, принимающая базовый конфиг
  function setupClient(config: BaseConfig) {
    console.log(`Настройка клиента для ${config.endpoint}`);
    return { send: () => console.log("Данные отправлены") };
  }
  
  // Функция, принимающая расширенный конфиг
  function setupAuthClient(config: AuthConfig) {
    console.log(`Настройка аутентифицированного клиента с токеном ${config.token}`);
    return {
      ...setupClient(config), // Переиспользуем базовую функцию
      refreshAuth: () => console.log("Токен обновлен")
    };
  }
  
  // Использование
  const baseConfig: BaseConfig = {
    endpoint: "https://api.example.com",
    timeout: 3000
  };
  
  const authConfig: AuthConfig = {
    endpoint: "https://api.example.com/secure",
    timeout: 5000,
    token: "abc123"
  };
  
  const client = setupClient(baseConfig);
  const authClient = setupAuthClient(authConfig);
  
  // Также можно использовать AuthConfig там, где ожидается BaseConfig
  setupClient(authConfig); // ✓ Работает, так как AuthConfig является подтипом BaseConfig
  </pre>
                </div>
                <div class="pattern-explanation">
                  <p>Расширение интерфейсов — это безопасный способ создания подтипов, который позволяет переиспользовать код.</p>
                  <p>Расширенные интерфейсы могут использоваться везде, где ожидается базовый интерфейс, соблюдая принцип подстановки Лисков.</p>
                  <p>Этот подход особенно полезен для создания модульных и расширяемых API.</p>
                </div>
              </div>
            </div>
            
            <div class="pattern-card">
              <div class="pattern-header">
                <h3>5. Условные типы для гибкой типизации</h3>
              </div>
              <div class="pattern-content">
                <div class="code-example">
                  <pre class="code-block">
  // Условные типы
  // Получаем тип элемента массива
  type ElementOf&lt;T&gt; = T extends Array&lt;infer E&gt; ? E : never;
  
  const numbers = [1, 2, 3, 4, 5];
  type NumberType = ElementOf&lt;typeof numbers&gt;; // type NumberType = number
  
  // Условный тип для определения общего возвращаемого типа функций
  type ReturnTypeUnion&lt;T extends any[]&gt; = {
    [K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : never
  }[number];
  
  function getNumber() { return 42; }
  function getString() { return "hello"; }
  function getBoolean() { return true; }
  
  type CombinedReturn = ReturnTypeUnion&lt;[
    typeof getNumber,
    typeof getString,
    typeof getBoolean
  ]&gt;; // type CombinedReturn = number | string | boolean
  
  // Исключаем один тип из объединения
  type Exclude&lt;T, U&gt; = T extends U ? never : T;
  type NumbersAndStrings = number | string | boolean;
  type JustNumbers = Exclude&lt;NumbersAndStrings, string | boolean&gt;; // type JustNumbers = number
  
  // Выбираем только определенные ключи из объекта
  type Pick&lt;T, K extends keyof T&gt; = {
    [P in K]: T[P];
  };
  
  type User = {
    id: number;
    name: string;
    email: string;
    age: number;
  };
  
  type UserBasicInfo = Pick&lt;User, "id" | "name"&gt;; // { id: number; name: string; }
  </pre>
                </div>
                <div class="pattern-explanation">
                  <p>Условные типы в TypeScript позволяют создавать сложные правила типизации, которые могут зависеть от свойств других типов.</p>
                  <p>Они особенно полезны для создания утилитарных типов, которые выполняют преобразования типов на основе входных параметров.</p>
                  <p>Стандартная библиотека TypeScript включает множество полезных условных типов, таких как <code>Pick</code>, <code>Exclude</code>, <code>Extract</code> и другие.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- 5. Проверь себя -->
        <section v-if="currentTab === 4" class="tab-content">
          <h2>Проверь свое понимание</h2>
          
          <div class="quiz-container">
            <div v-if="!quizStarted">
              <p>Проверьте свое понимание супертипов и подтипов в TypeScript, ответив на несколько вопросов.</p>
              <button class="start-quiz-btn" @click="startQuiz">Начать тест</button>
            </div>
            
            <div v-if="quizStarted && !quizFinished" class="quiz-question">
              <div class="question-number">Вопрос {{ currentQuestion + 1 }} из {{ questions.length }}</div>
              <div class="question-text">{{ questions[currentQuestion].question }}</div>
              
              <div v-if="questions[currentQuestion].code" class="question-code">
                <pre class="code-block">{{ questions[currentQuestion].code }}</pre>
              </div>
              
              <div class="answer-options">
                <div 
                  v-for="(option, index) in questions[currentQuestion].options" 
                  :key="index"
                  class="answer-option"
                  :class="{ 
                    selected: selectedOption === index,
                    correct: showAnswer && index === questions[currentQuestion].correctAnswer,
                    incorrect: showAnswer && selectedOption === index && index !== questions[currentQuestion].correctAnswer 
                  }"
                  @click="selectOption(index)"
                >
                  {{ option }}
                </div>
              </div>
              
              <div v-if="showAnswer" class="answer-explanation">
                <div class="explanation-title">{{ isCorrect ? 'Верно!' : 'Неверно!' }}</div>
                <div class="explanation-text">{{ questions[currentQuestion].explanation }}</div>
              </div>
              
              <div class="quiz-navigation">
                <button v-if="!showAnswer" @click="checkAnswer" class="check-btn">Проверить</button>
                <button v-else @click="nextQuestion" class="next-btn">
                  {{ currentQuestion < questions.length - 1 ? 'Следующий вопрос' : 'Завершить тест' }}
                </button>
              </div>
            </div>
            
            <div v-if="quizFinished" class="quiz-results">
              <h3>Результаты теста</h3>
              <div class="score">
                Вы ответили правильно на {{ correctAnswers }} из {{ questions.length }} вопросов
                ({{ Math.round(correctAnswers / questions.length * 100) }}%)
              </div>
              
              <div class="result-message">
                <template v-if="correctAnswers === questions.length">
                  Отлично! Вы отлично понимаете супертипы и подтипы в TypeScript!
                </template>
                <template v-else-if="correctAnswers >= Math.floor(questions.length * 0.7)">
                  Хороший результат! Вы уже хорошо понимаете концепции типизации, но есть ещё что изучить.
                </template>
                <template v-else>
                  Вам стоит повторить материал о супертипах и подтипах, чтобы лучше понять эти важные концепции.
                </template>
              </div>
              
              <button @click="restartQuiz" class="restart-btn">Пройти тест снова</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SuperSubTypeDemo',
    data() {
      return {
        tabs: [
          { id: 'basics', title: 'Основы типизации' },
          { id: 'variance', title: 'Вариантность' },
          { id: 'pitfalls', title: 'Подводные камни' },
          { id: 'patterns', title: 'Практические паттерны' },
          { id: 'quiz', title: 'Проверь себя' }
        ],
        currentTab: 0,
        
        // Для теста
        quizStarted: false,
        quizFinished: false,
        currentQuestion: 0,
        selectedOption: null,
        showAnswer: false,
        correctAnswers: 0,
        questions: [
          {
            question: "Какой из следующих типов является супертипом для типа Dog = { name: string, breed: string }?",
            options: [
              "{ name: string, breed: string, age: number }",
              "{ name: string }",
              "{ breed: string }",
              "{ name: number, breed: string }"
            ],
            correctAnswer: 1,
            explanation: "Супертип имеет меньше свойств или более общие типы свойств. Тип { name: string } является супертипом для Dog, поскольку содержит подмножество свойств типа Dog."
          },
          {
            question: "Что такое ковариантность в контексте типов?",
            options: [
              "Если A является подтипом B, то T<A> является подтипом T<B>",
              "Если A является подтипом B, то T<B> является подтипом T<A>",
              "A и B никак не связаны, даже если один является подтипом другого",
              "Типы A и B могут быть преобразованы в обоих направлениях"
            ],
            correctAnswer: 0,
            explanation: "Ковариантность означает, что отношения между типами сохраняются при их обёртывании в контейнеры. Если A является подтипом B, то и T<A> является подтипом T<B>."
          },
          {
            question: "Какой из следующих типов TypeScript является нижним типом (bottom type)?",
            options: [
              "unknown",
              "any",
              "undefined",
              "never"
            ],
            correctAnswer: 3,
            explanation: "never является нижним типом (bottom type) в системе типов TypeScript. Он представляет тип, который не может содержать никаких значений и является подтипом любого другого типа."
          },
          {
            question: "Рассмотрите следующий код. Какой будет результат его компиляции?",
            code: `
  type Animal = { name: string };
  type Dog = { name: string; bark(): void };
  
  const animals: Animal[] = [];
  const dogs: Dog[] = [{ name: "Rex", bark: () => console.log("Woof!") }];
  
  // Строка, которую проверяем:
  animals.push(...dogs);`,
            options: [
              "Ошибка компиляции: Type 'Dog' is not assignable to type 'Animal'",
              "Ошибка компиляции: Property 'bark' is missing in type 'Animal'",
              "Код скомпилируется без ошибок",
              "Ошибка компиляции: Spread operator cannot be used with Dog[]"
            ],
            correctAnswer: 2,
            explanation: "Код скомпилируется без ошибок, так как Dog является подтипом Animal (имеет все свойства Animal и дополнительные). В TypeScript массивы ковариантны, поэтому элементы типа Dog можно добавить в массив типа Animal."
          },
          {
            question: "В каком случае параметры функций проявляют контравариантность?",
            options: [
              "Когда тип возвращаемого значения более конкретный",
              "Когда тип параметра более общий",
              "Когда тип параметра более конкретный",
              "Типы параметров функций всегда инвариантны"
            ],
            correctAnswer: 1,
            explanation: "Параметры функций проявляют контравариантность: если A является подтипом B, то функция, принимающая B (более общий тип), является подтипом функции, принимающей A (более конкретный тип). Это связано с тем, что функция, которая может обрабатывать более общие типы, может также обрабатывать и более конкретные."
          }
        ]
      };
    },
    computed: {
      isCorrect() {
        return this.selectedOption === this.questions[this.currentQuestion].correctAnswer;
      }
    },
    methods: {
      startQuiz() {
        this.quizStarted = true;
        this.quizFinished = false;
        this.currentQuestion = 0;
        this.correctAnswers = 0;
        this.selectedOption = null;
        this.showAnswer = false;
      },
      
      selectOption(index) {
        if (!this.showAnswer) {
          this.selectedOption = index;
        }
      },
      
      checkAnswer() {
        if (this.selectedOption === null) return;
        
        this.showAnswer = true;
        if (this.isCorrect) {
          this.correctAnswers++;
        }
      },
      
      nextQuestion() {
        this.showAnswer = false;
        this.selectedOption = null;
        
        if (this.currentQuestion < this.questions.length - 1) {
          this.currentQuestion++;
        } else {
          this.quizFinished = true;
        }
      },
      
      restartQuiz() {
        this.startQuiz();
      }
    }
  };
  </script>
  
  <style scoped>
  .subtyping-demo {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
  }
  
  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  .intro {
    text-align: center;
    color: #7f8c8d;
    margin-bottom: 30px;
  }
  
  /* Стили для навигации */
  .navigation-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;
  }
  
  .navigation-tabs button {
    padding: 10px 20px;
    background-color: #f5f7fa;
    border: 1px solid #dfe4ea;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    color: #576574;
  }
  
  .navigation-tabs button:hover {
    background-color: #e9edf5;
  }
  
  .navigation-tabs button.active {
    background-color: #4b7bec;
    color: white;
    border-color: #4b7bec;
  }
  
  /* Стили для контейнера контента */
  .content-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 30px;
    margin-bottom: 40px;
  }
  
  .tab-content {
    animation: fadeIn 0.5s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  h2 {
    color: #2c3e50;
    border-bottom: 2px solid #4b7bec;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  
  h3 {
    color: #3d5af1;
    margin-top: 25px;
    margin-bottom: 15px;
  }
  
  /* Стили для объяснений концепций */
  .concept-explanation {
    margin-bottom: 30px;
    line-height: 1.6;
  }
  
  /* Стили для иерархии типов */
  .type-hierarchy {
    margin-bottom: 30px;
  }
  
  .hierarchy-diagram {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0;
    gap: 20px;
  }
  
  .hierarchy-node {
    padding: 15px 20px;
    border-radius: 8px;
    text-align: center;
    width: fit-content;
    max-width: 250px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .top-type {
    background-color: #4b7bec;
    color: white;
  }
  
  .super-type {
    background-color: #45aaf2;
    color: white;
  }
  
  .sub-type {
    background-color: #2bcbba;
    color: white;
  }
  
  .bottom-type {
    background-color: #fc5c65;
    color: white;
  }
  
  .node-description {
    font-size: 12px;
    margin-top: 5px;
    opacity: 0.8;
  }
  
  .hierarchy-branch {
    display: flex;
    justify-content: center;
    gap: 20px;
    width: 100%;
    flex-wrap: wrap;
  }
  
  /* Стили для примеров кода */
  .example-box {
    margin: 20px 0;
    border: 1px solid #dfe4ea;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .example-box h4 {
    background-color: #f5f7fa;
    margin: 0;
    padding: 15px;
    border-bottom: 1px solid #dfe4ea;
  }
  
  .code-block {
    background-color: #2e3440;
    color: #eceff4;
    padding: 20px;
    font-family: 'Consolas', 'Monaco', 'Andale Mono', monospace;
    font-size: 14px;
    line-height: 1.5;
    overflow-x: auto;
    margin: 0;
  }
  
  /* Стили для правил отношений типов */
  .rule-card {
    background-color: #f5f7fa;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .rule-header {
    background-color: #4b7bec;
    color: white;
    padding: 12px 20px;
    font-weight: bold;
  }
  
  .rule-content {
    padding: 20px;
  }
  
  .rule-example {
    margin-top: 15px;
  }
  
  /* Стили для вариантности */
  .variance-card {
    background-color: #f5f7fa;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .variance-header {
    background-color: #45aaf2;
    color: white;
    padding: 12px 20px;
    font-weight: bold;
  }
  
  .variance-content {
    padding: 20px;
  }
  
  .variance-note {
    background-color: #ffeaa7;
    padding: 15px;
    border-radius: 6px;
    margin-top: 15px;
    border-left: 4px solid #fdcb6e;
  }
  
  /* Стили для подводных камней */
  .pitfall-card {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #f1f2f6;
  }
  
  .pitfall-header {
    background-color: #fc5c65;
    color: white;
    padding: 15px 20px;
  }
  
  .pitfall-header h3 {
    margin: 0;
    color: white;
  }
  
  .pitfall-content {
    padding: 20px;
  }
  
  .code-example {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
  }
  
  .example-part {
    flex: 1;
  }
  
  .explanation-part {
    flex: 1;
    padding: 15px;
    background-color: #f5f7fa;
    border-radius: 6px;
    margin-top: 15px;
  }
  
  /* Стили для практических паттернов */
  .pattern-card {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #f1f2f6;
  }
  
  .pattern-header {
    background-color: #2bcbba;
    color: white;
    padding: 15px 20px;
  }
  
  .pattern-header h3 {
    margin: 0;
    color: white;
  }
  
  .pattern-content {
    padding: 20px;
  }
  
  .pattern-explanation {
    padding: 15px;
    background-color: #f1f9f7;
    border-radius: 6px;
    margin-top: 15px;
    border-left: 4px solid #2bcbba;
  }
  
  /* Стили для теста */
  .quiz-container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .start-quiz-btn {
    background-color: #4b7bec;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    margin: 20px auto;
    display: block;
    transition: all 0.3s ease;
  }
  
  .start-quiz-btn:hover {
    background-color: #3867d6;
  }
  
  .quiz-question {
    margin-bottom: 30px;
  }
  
  .question-number {
    font-size: 14px;
    color: #7f8c8d;
    margin-bottom: 10px;
  }
  
  .question-text {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .question-code {
    margin-bottom: 20px;
  }
  
  .answer-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .answer-option {
    padding: 15px;
    background-color: #f5f7fa;
    border: 1px solid #dfe4ea;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .answer-option:hover {
    background-color: #e9edf5;
  }
  
  .answer-option.selected {
    background-color: #c8d6f9;
    border-color: #4b7bec;
  }
  
  .answer-option.correct {
    background-color: #c3f9c8;
    border-color: #2bcbba;
  }
  
  .answer-option.incorrect {
    background-color: #f9c3c3;
    border-color: #fc5c65;
  }
  
  .answer-explanation {
    padding: 15px;
    background-color: #f5f7fa;
    border-radius: 6px;
    margin-bottom: 20px;
  }
  
  .explanation-title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .explanation-text {
    line-height: 1.6;
  }
  
  .quiz-navigation {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .check-btn, .next-btn, .restart-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
  }
  
  .check-btn {
    background-color: #4b7bec;
    color: white;
  }
  
  .next-btn {
    background-color: #2bcbba;
    color: white;
  }
  
  .restart-btn {
    background-color: #45aaf2;
    color: white;
    margin: 20px auto;
    display: block;
  }
  
  .quiz-results {
    text-align: center;
    padding: 20px;
  }
  
  .score {
    font-size: 20px;
    margin: 20px 0;
  }
  
  .result-message {
    margin-bottom: 30px;
    line-height: 1.6;
  }
  
  /* Медиа запросы для адаптивности */
  @media (max-width: 768px) {
    .content-container {
      padding: 20px;
    }
    
    .hierarchy-branch {
      flex-direction: column;
      align-items: center;
    }
    
    .code-example {
      flex-direction: column;
    }
    
    .navigation-tabs {
      flex-direction: column;
      align-items: stretch;
    }
    
    .navigation-tabs button {
      margin-bottom: 5px;
    }
  }
  </style>