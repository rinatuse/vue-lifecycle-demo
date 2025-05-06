<template>
  <div class="app-container">
    <div class="menu-container">
      <!-- Vue и основы разработки -->
      <div class="menu-category">
        <div class="category-header">Vue и основы</div>
        <div class="category-buttons">
          <button 
            :class="{ active: currentLesson === 'lifecycle' }"
            @click="currentLesson = 'lifecycle'"
          >
            Жизненный цикл Vue
          </button>
          <button 
            :class="{ active: currentLesson === 'propsexplorer' }"
            @click="currentLesson = 'propsexplorer'"
          >
            Props Explorer
          </button>
          <button 
            :class="{ active: currentLesson === 'emitdemo' }"
            @click="currentLesson = 'emitdemo'"
          >
            Emit Demo
          </button>
          <button 
            :class="{ active: currentLesson === 'vuerenderingexplorer' }"
            @click="currentLesson = 'vuerenderingexplorer'"
          >
            Vue Rendering
          </button>
          <button 
            :class="{ active: currentLesson === 'rendering' }"
            @click="currentLesson = 'rendering'"
          >
            Browser Rendering
          </button>
        </div>
      </div>

      <!-- JavaScript основы -->
      <div class="menu-category">
        <div class="category-header">JavaScript основы</div>
        <div class="category-buttons">
          <button 
            :class="{ active: currentLesson === 'collections' }"
            @click="currentLesson = 'collections'"
          >
            Collections
          </button>
          <button 
            :class="{ active: currentLesson === 'arrays' }"
            @click="currentLesson = 'arrays'"
          >
            Работа с массивами
          </button>
          <button 
            :class="{ active: currentLesson === 'objectfive' }"
            @click="currentLesson = 'objectfive'"
          >
            Копирование объектов
          </button>
          <button 
            :class="{ active: currentLesson === 'interactivejavascript' }"
            @click="currentLesson = 'interactivejavascript'"
          >
            Интерактивный JavaScript
          </button>
          <button 
            :class="{ active: currentLesson === 'arraymethodsexplorer' }"
            @click="currentLesson = 'arraymethodsexplorer'"
          >
            Методы массивов
          </button>
          <button 
            :class="{ active: currentLesson === 'functionget' }"
            @click="currentLesson = 'functionget'"
          >
            Function Get
          </button>
          <button 
            :class="{ active: currentLesson === 'stringcompression' }"
            @click="currentLesson = 'stringcompression'"
          >
            Сжатие строк
          </button>
          <button 
            :class="{ active: currentLesson === 'substringsearchDemo' }"
            @click="currentLesson = 'substringsearchDemo'"
          >
            Поиск подстрок
          </button>
          <button 
            :class="{ active: currentLesson === 'capitalizedemo' }"
            @click="currentLesson = 'capitalizedemo'"
          >
            Capitalize
          </button>
          <button 
            :class="{ active: currentLesson === 'stringdeduplicator' }"
            @click="currentLesson = 'stringdeduplicator'"
          >
            String Deduplicator
          </button>
        </div>
      </div>

      <!-- This и контекст выполнения -->
      <div class="menu-category">
        <div class="category-header">This и контекст</div>
        <div class="category-buttons">
          <button 
            :class="{ active: currentLesson === 'this' }"
            @click="currentLesson = 'this'"
          >
            This Demo
          </button>
          <button 
            :class="{ active: currentLesson === 'mur' }"
            @click="currentLesson = 'mur'"
          >
            This Tutorial
          </button>
          <button 
            :class="{ active: currentLesson === 'thiscontext' }"
            @click="currentLesson = 'thiscontext'"
          >
            This Context
          </button>
          <button 
            :class="{ active: currentLesson === 'thiscontextexplorer' }"
            @click="currentLesson = 'thiscontextexplorer'"
          >
            This Context Explorer
          </button>
          <button 
            :class="{ active: currentLesson === 'thisisbind' }"
            @click="currentLesson = 'thisisbind'"
          >
            This и Bind
          </button>
          <button 
            :class="{ active: currentLesson === 'bind' }"
            @click="currentLesson = 'bind'"
          >
            Bind Demo
          </button>
          <button 
            :class="{ active: currentLesson === 'thisprototypeposition' }"
            @click="currentLesson = 'thisprototypeposition'"
          >
            This и прототипы
          </button>
          <button 
            :class="{ active: currentLesson === 'thiscontextjs' }"
            @click="currentLesson = 'thiscontextjs'"
          >
            This Context JS
          </button>
        </div>
      </div>

      <!-- Асинхронность -->
      <div class="menu-category">
        <div class="category-header">Асинхронность</div>
        <div class="category-buttons">
          <button 
            :class="{ active: currentLesson === 'promise' }"
            @click="currentLesson = 'promise'"
          >
            Promise Explorer
          </button>
          <button 
            :class="{ active: currentLesson === 'promisealldemo' }"
            @click="currentLesson = 'promisealldemo'"
          >
            Promise All
          </button>
          <button 
            :class="{ active: currentLesson === 'promiseanyexplainer' }"
            @click="currentLesson = 'promiseanyexplainer'"
          >
            Promise Any
          </button>
          <button 
            :class="{ active: currentLesson === 'custompromiseall' }"
            @click="currentLesson = 'custompromiseall'"
          >
            Custom Promise All
          </button>
          <button 
            :class="{ active: currentLesson === 'newpromise' }"
            @click="currentLesson = 'newpromise'"
          >
            New Promise
          </button>
          <button 
            :class="{ active: currentLesson === 'asyncdefer' }"
            @click="currentLesson = 'asyncdefer'"
          >
            Async/Defer
          </button>
          <button 
            :class="{ active: currentLesson === 'websocket' }"
            @click="currentLesson = 'websocket'"
          >
            WebSocket
          </button>
          <button 
            :class="{ active: currentLesson === 'asynclimitdemo' }"
            @click="currentLesson = 'asynclimitdemo'"
          >
            Async Limit
          </button>
          <button 
            :class="{ active: currentLesson === 'fetchretry' }"
            @click="currentLesson = 'fetchretry'"
          >
            Fetch Retry
          </button>
          <button 
            :class="{ active: currentLesson === 'abortcontrollerdemo' }"
            @click="currentLesson = 'abortcontrollerdemo'"
          >
            AbortController
          </button>
          <button 
            :class="{ active: currentLesson === 'sleepdemo' }"
            @click="currentLesson = 'sleepdemo'"
          >
            Sleep Demo
          </button>
        </div>
      </div>

      <!-- Event Loop -->
      <div class="menu-category">
        <div class="category-header">Event Loop</div>
        <div class="category-buttons">
          <button 
            :class="{ active: currentLesson === 'eventloop' }"
            @click="currentLesson = 'eventloop'"
          >
            Event Loop Explorer
          </button>
          <button 
            :class="{ active: currentLesson === 'eventloops' }"
            @click="currentLesson = 'eventloops'"
          >
            Event Loop
          </button>
          <button 
            :class="{ active: currentLesson === 'eventloopexplainertwo' }"
            @click="currentLesson = 'eventloopexplainertwo'"
          >
            Event Loop (2)
          </button>
          <button 
            :class="{ active: currentLesson === 'eventloopthree' }"
            @click="currentLesson = 'eventloopthree'"
          >
            Event Loop (3)
          </button>
          <button 
            :class="{ active: currentLesson === 'eventloopfrou' }"
            @click="currentLesson = 'eventloopfrou'"
          >
            Event Loop (4)
          </button>
          <button 
            :class="{ active: currentLesson === 'eventloopfive' }"
            @click="currentLesson = 'eventloopfive'"
          >
            Event Loop (5)
          </button>
          <button 
            :class="{ active: currentLesson === 'eventloopseven' }"
            @click="currentLesson = 'eventloopseven'"
          >
            Event Loop (7)
          </button>
          <button 
            :class="{ active: currentLesson === 'eventten' }"
            @click="currentLesson = 'eventten'"
          >
            Event Ten
          </button>
          <button 
            :class="{ active: currentLesson === 'eventlooppromise' }"
            @click="currentLesson = 'eventlooppromise'"
          >
            Event Loop Promise
          </button>
          <button 
            :class="{ active: currentLesson === 'eventLooppolyfills' }"
            @click="currentLesson = 'eventLooppolyfills'"
          >
            Event Loop Polyfills
          </button>
        </div>
      </div>

      <!-- Замыкания и функциональное программирование -->
      <div class="menu-category">
        <div class="category-header">Замыкания и функции</div>
        <div class="category-buttons">
          <button 
            :class="{ active: currentLesson === 'closuretimeouto' }"
            @click="currentLesson = 'closuretimeouto'"
          >
            Closure Timeout
          </button>
          <button 
            :class="{ active: currentLesson === 'clouserdemo' }"
            @click="currentLesson = 'clouserdemo'"
          >
            Closure Demo
          </button>
          <button 
            :class="{ active: currentLesson === 'clouserdetaileddemo' }"
            @click="currentLesson = 'clouserdetaileddemo'"
          >
            Подробно о замыканиях
          </button>
          <button 
            :class="{ active: currentLesson === 'closureloopexplaine' }"
            @click="currentLesson = 'closureloopexplaine'"
          >
            Closure Loop Explainer
          </button>
          <button 
            :class="{ active: currentLesson === 'closureloopdemo' }"
            @click="currentLesson = 'closureloopdemo'"
          >
            Closure Loop Demo
          </button>
          <button 
            :class="{ active: currentLesson === 'clouserdemodemo' }"
            @click="currentLesson = 'clouserdemodemo'"
          >
            Closures Demo Demo
          </button>
          <button 
            :class="{ active: currentLesson === 'arrowfunction' }"
            @click="currentLesson = 'arrowfunction'"
          >
            Стрелочные функции
          </button>
          <button 
            :class="{ active: currentLesson === 'carirovaniedemo' }"
            @click="currentLesson = 'carirovaniedemo'"
          >
            Каррирование
          </button>
          <button 
            :class="{ active: currentLesson === 'infinitycarrirovani' }"
            @click="currentLesson = 'infinitycarrirovani'"
          >
            Бесконечное каррирование
          </button>
          <button 
            :class="{ active: currentLesson === 'debounceexplorer' }"
            @click="currentLesson = 'debounceexplorer'"
          >
            Debounce Explorer
          </button>
          <button 
            :class="{ active: currentLesson === 'memoization' }"
            @click="currentLesson = 'memoization'"
          >
            Мемоизация
          </button>
        </div>
      </div>

      <!-- Алгоритмы и структуры данных -->
      <div class="menu-category">
        <div class="category-header">Алгоритмы и структуры данных</div>
        <div class="category-buttons">
          <button 
            :class="{ active: currentLesson === 'mergesortedarrays' }"
            @click="currentLesson = 'mergesortedarrays'"
          >
            Merge Sorted Arrays
          </button>
          <button 
            :class="{ active: currentLesson === 'twosum' }"
            @click="currentLesson = 'twosum'"
          >
            Two Sum
          </button>
          <button 
            :class="{ active: currentLesson === 'arraygrouping' }"
            @click="currentLesson = 'arraygrouping'"
          >
            Группировка массивов
          </button>
          <button 
            :class="{ active: currentLesson === 'anagrmexplorer' }"
            @click="currentLesson = 'anagrmexplorer'"
          >
            Анаграммы Explorer
          </button>
          <button 
            :class="{ active: currentLesson === 'anagramgroupingvisualizer' }"
            @click="currentLesson = 'anagramgroupingvisualizer'"
          >
            Анаграммы Grouping
          </button>
          <button 
            :class="{ active: currentLesson === 'bracketsvalidator' }"
            @click="currentLesson = 'bracketsvalidator'"
          >
            Проверка скобок
          </button>
          <button 
            :class="{ active: currentLesson === 'bracketsvalidators' }"
            @click="currentLesson = 'bracketsvalidators'"
          >
            Brackets Validators
          </button>
          <button 
            :class="{ active: currentLesson === 'fibonaccisolver' }"
            @click="currentLesson = 'fibonaccisolver'"
          >
            Числа Фибоначчи
          </button>
          <button 
            :class="{ active: currentLesson === 'recursionexplorer' }"
            @click="currentLesson = 'recursionexplorer'"
          >
            Рекурсия Explorer
          </button>
          <button 
            :class="{ active: currentLesson === 'recursivesumcomponent' }"
            @click="currentLesson = 'recursivesumcomponent'"
          >
            Recursive Sum
          </button>
          <button 
            :class="{ active: currentLesson === 'treesumexplainer' }"
            @click="currentLesson = 'treesumexplainer'"
          >
            Tree Sum
          </button>
          <button 
            :class="{ active: currentLesson === 'arrayflatten' }"
            @click="currentLesson = 'arrayflatten'"
          >
            Flatten Array
          </button>
          <button 
            :class="{ active: currentLesson === 'flattenobjectdemo' }"
            @click="currentLesson = 'flattenobjectdemo'"
          >
            Flatten Object
          </button>
          <button 
            :class="{ active: currentLesson === 'arraydifferenceexplainer' }"
            @click="currentLesson = 'arraydifferenceexplainer'"
          >
            Array Difference
          </button>
          <button 
            :class="{ active: currentLesson === 'algorstring' }"
            @click="currentLesson = 'algorstring'"
          >
            Алгоритмы строк
          </button>
          <button 
            :class="{ active: currentLesson === 'visualalgoritm' }"
            @click="currentLesson = 'visualalgoritm'"
          >
            Визуализация алгоритмов
          </button>
          <button 
            :class="{ active: currentLesson === 'amtalgorithmvisualization' }"
            @click="currentLesson = 'amtalgorithmvisualization'"
          >
            AMT Алгоритм
          </button>
        </div>
      </div>

      <!-- TypeScript -->
      <div class="menu-category">
        <div class="category-header">TypeScript</div>
        <div class="category-buttons">
          <button 
            :class="{ active: currentLesson === 'generic' }"
            @click="currentLesson = 'generic'"
          >
            Generics
          </button>
          <button 
            :class="{ active: currentLesson === 'enum' }"
            @click="currentLesson = 'enum'"
          >
            Const Enum
          </button>
          <button 
            :class="{ active: currentLesson === 'tsdemo' }"
            @click="currentLesson = 'tsdemo'"
          >
            TS Demo
          </button>
          <button 
            :class="{ active: currentLesson === 'tskeyof' }"
            @click="currentLesson = 'tskeyof'"
          >
            TS Keyof
          </button>
          <button 
            :class="{ active: currentLesson === 'typescript' }"
            @click="currentLesson = 'typescript'"
          >
            TypeScript
          </button>
          <button 
            :class="{ active: currentLesson === 'mypickexplainer' }"
            @click="currentLesson = 'mypickexplainer'"
          >
            MyPick Explainer
          </button>
          <button 
            :class="{ active: currentLesson === 'supersubtypedemo' }"
            @click="currentLesson = 'supersubtypedemo'"
          >
            Super/Subtypes
          </button>
        </div>
      </div>

      <!-- Прототипы и объекты -->
      <div class="menu-category">
        <div class="category-header">Прототипы и объекты</div>
        <div class="category-buttons">
          <button 
            :class="{ active: currentLesson === 'hasownvsin' }"
            @click="currentLesson = 'hasownvsin'"
          >
            hasOwnProperty vs in
          </button>
          <button 
            :class="{ active: currentLesson === 'hasownpropertyvsinexplainer' }"
            @click="currentLesson = 'hasownpropertyvsinexplainer'"
          >
            hasOwn vs in подробно
          </button>
          <button 
            :class="{ active: currentLesson === 'freezedescription' }"
            @click="currentLesson = 'freezedescription'"
          >
            Object.freeze
          </button>
          <button 
            :class="{ active: currentLesson === 'protoinheitanceexplainer' }"
            @click="currentLesson = 'protoinheitanceexplainer'"
          >
            Прототипное наследование
          </button>
          <button 
            :class="{ active: currentLesson === 'deepcopyexplorer' }"
            @click="currentLesson = 'deepcopyexplorer'"
          >
            Deep Copy
          </button>
        </div>
      </div>

      <!-- Практические задачи -->
      <div class="menu-category">
        <div class="category-header">Практические задачи</div>
        <div class="category-buttons">
          <button 
            :class="{ active: currentLesson === 'jsproblem' }"
            @click="currentLesson = 'jsproblem'"
          >
            JS Problem Solver
          </button>
          <button 
            :class="{ active: currentLesson === 'sobesdemo' }"
            @click="currentLesson = 'sobesdemo'"
          >
            Задачи с собеседований
          </button>
          <button 
            :class="{ active: currentLesson === 'hotelbookingcalculator' }"
            @click="currentLesson = 'hotelbookingcalculator'"
          >
            Калькулятор отеля
          </button>
          <button 
            :class="{ active: currentLesson === 'playergrouping' }"
            @click="currentLesson = 'playergrouping'"
          >
            Группировка игроков
          </button>
          <button 
            :class="{ active: currentLesson === 'eventemitter' }"
            @click="currentLesson = 'eventemitter'"
          >
            Event Emitter
          </button>
          <button 
            :class="{ active: currentLesson === 'myquestiions' }"
            @click="currentLesson = 'myquestiions'"
          >
            Мои вопросы
          </button>
        </div>
      </div>
    </div>
    
    <div class="lesson-content">
      <LifecycleDemo v-if="currentLesson === 'lifecycle'" />
      <CollectionsDemo v-if="currentLesson === 'collections'" />
      <ArraysWorkshop v-if="currentLesson === 'arrays'" />
      <WebSocketDemo v-if="currentLesson === 'websocket'" />
      <EventLoopExplorer v-if="currentLesson === 'eventloop'" />
      <BrowserRenderingCycle v-if="currentLesson === 'rendering'" />
      <ConstEnum v-if="currentLesson === 'enum'" />
      <ThisDemo v-if="currentLesson === 'this'" />
      <ThisJSTutorial v-if="currentLesson === 'mur'" />
      <GenericDemo v-if="currentLesson === 'generic'" />
      <ObjectCopyDemo v-if="currentLesson === 'objectfive'" />
      <PromiseExplorer v-if="currentLesson === 'promise'" />
      <JSProblemSolver v-if="currentLesson === 'jsproblem'" />
      <AsyncDeferDemo v-if="currentLesson === 'asyncdefer'" />
      <ArrowFunctionsDemo v-if="currentLesson === 'arrowfunction'" />
      <HasOwnVsIn v-if="currentLesson === 'hasownvsin'" />
      <ObjectFreezeDescriptors v-if="currentLesson === 'freezedescription'" />
      <RecursionExplorer v-if="currentLesson === 'recursionexplorer'" />
      <SuperSubTypeDemo v-if="currentLesson === 'supersubtypedemo'" />
      <SobesDemo v-if="currentLesson === 'sobesdemo'" />
      <PropsExplorer v-if="currentLesson === 'propsexplorer'" />
      <EmitDemo v-if="currentLesson === 'emitdemo'" />
      <HotelBookingCalculator v-if="currentLesson === 'hotelbookingcalculator'" />
      <ArrayGroupingDemo v-if="currentLesson === 'arraygrouping'" />
      <EventEmitterDemo v-if="currentLesson === 'eventemitter'" />
      <PlayerGroupingDemo v-if="currentLesson === 'playergrouping'" />
      <BindDemo v-if="currentLesson === 'bind'" />
      <MergeSortedArrays v-if="currentLesson === 'mergesortedarrays'" />
      <TwoSum v-if="currentLesson === 'twosum'" />
      <AnagrmExplorer v-if="currentLesson === 'anagrmexplorer'" />
      <ArrayDifferenceExplainer v-if="currentLesson === 'arraydifferenceexplainer'" />
      <BracketsValidator v-if="currentLesson === 'bracketsvalidator'" />
      <AlgorString v-if="currentLesson === 'algorstring'" />
      <VisualAlgoritm v-if="currentLesson === 'visualalgoritm'" />
      <ClosureTimeoutDemo v-if="currentLesson === 'closuretimeouto'" />
      <MemoizationDemo v-if="currentLesson === 'memoization'" />
      <ArrayFlattenDemo v-if="currentLesson === 'arrayflatten'" />
      <AnagramGroupingVisualizer v-if="currentLesson === 'anagramgroupingvisualizer'" />
      <BracketsValidators v-if="currentLesson === 'bracketsvalidators'" />
      <CustomPromiseAll v-if="currentLesson === 'custompromiseall'" />
      <ArrayMethodsExplorer v-if="currentLesson === 'arraymethodsexplorer'" />
      <FunctionGet v-if="currentLesson === 'functionget'" />
      <DebounceExplorer v-if="currentLesson === 'debounceexplorer'" />
      <FetchRetry v-if="currentLesson === 'fetchretry'" />
      <AMTAlgorithmVisualization v-if="currentLesson === 'amtalgorithmvisualization'" />
      <ThisContext v-if="currentLesson === 'thiscontext'" />
      <ProtoInheitanceExplainer v-if="currentLesson === 'protoinheitanceexplainer'" />
      <ThisContextExplorer v-if="currentLesson === 'thiscontextexplorer'" />
      <ThisIsBind v-if="currentLesson === 'thisisbind'" />
      <ThisPrototypePosition v-if="currentLesson === 'thisprototypeposition'" />
      <ThisContextJS v-if="currentLesson === 'thiscontextjs'" />
      <HasOwnPropertyVsinExplainer v-if="currentLesson === 'hasownpropertyvsinexplainer'" />
      <EventLoop v-if="currentLesson === 'eventloops'" />
      <EventLoopExplainertwo v-if="currentLesson === 'eventloopexplainertwo'" />
      <EventLoopthree v-if="currentLesson === 'eventloopthree'" />
      <EventLoopfrou v-if="currentLesson === 'eventloopfrou'" />
      <EventLoopFive v-if="currentLesson === 'eventloopfive'" />
      <EventLoopSeven v-if="currentLesson === 'eventloopseven'" />
      <EventTen v-if="currentLesson === 'eventten'" />
      <EventLoopPromise v-if="currentLesson === 'eventlooppromise'" />
      <FlattenObjectDemo v-if="currentLesson === 'flattenobjectdemo'" />
      <RecursiveSumComponent v-if="currentLesson === 'recursivesumcomponent'" />
      <TreeSumExplainer v-if="currentLesson === 'treesumexplainer'" />
      <DeepCopyExplorer v-if="currentLesson === 'deepcopyexplorer'" />
      <FibonacciSolver v-if="currentLesson === 'fibonaccisolver'" />
      <StringCompression v-if="currentLesson === 'stringcompression'" />
      <SubstringSearchDemo v-if="currentLesson === 'substringsearchDemo'" />
      <CapitalizeDemo v-if="currentLesson === 'capitalizedemo'" />
      <StringDeduplicator v-if="currentLesson === 'stringdeduplicator'" />
      <CarirovanieDemo v-if="currentLesson === 'carirovaniedemo'" />
      <InfinityCarrirovani v-if="currentLesson === 'infinitycarrirovani'" />
      <ClosureLoopExplaine v-if="currentLesson === 'closureloopexplaine'" />
      <ClosureLoopDemo v-if="currentLesson === 'closureloopdemo'" />
      <ClouserDetailedDemo v-if="currentLesson === 'clouserdetaileddemo'" />
      <ClouserDemo v-if="currentLesson === 'clouserdemo'" />
      <SleepDemo v-if="currentLesson === 'sleepdemo'" />
      <PromiseAllDemo v-if="currentLesson === 'promisealldemo'" />
      <PromiseAnyExplainer v-if="currentLesson === 'promiseanyexplainer'" />
      <AsyncLimitDemo v-if="currentLesson === 'asynclimitdemo'" />
      <TsDemo v-if="currentLesson === 'tsdemo'" />
      <MyPickExplainer v-if="currentLesson === 'mypickexplainer'" />
      <TypeScript v-if="currentLesson === 'typescript'" />
      <TSKeyof v-if="currentLesson === 'tskeyof'" />
      <MyQuestiions v-if="currentLesson === 'myquestiions'" />
      <InteractiveJavaScript v-if="currentLesson === 'interactivejavascript'" />
      <VueRenderingExplorer v-if="currentLesson === 'vuerenderingexplorer'" />
      <EventLoopPolyfills v-if="currentLesson === 'eventLooppolyfills'" />
      <NewPromise v-if="currentLesson === 'newpromise'" />
      <ClousersDemoDemo v-if="currentLesson === 'clouserdemodemo'" />
      <AbortControllerDemo v-if="currentLesson === 'abortcontrollerdemo'" />
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
import ConstEnum from './components/ConstEnum.vue';
import ThisDemo from './components/ThisDemo.vue';
import ThisJSTutorial from './components/ThisJSTutorial.vue';
import GenericDemo from './components/GenericDemo.vue';
import ObjectCopyDemo from './components/ObjectCopyDemo.vue';
import PromiseExplorer from './components/PromiseExplorer.vue';
import JSProblemSolver from './components/JSProblemSolver.vue';
import AsyncDeferDemo from './components/AsyncDeferDemo.vue';
import ArrowFunctionsDemo from './components/ArrowFunctionsDemo.vue';
import HasOwnVsIn from './components/HasOwnVsIn.vue';
import ObjectFreezeDescriptors from './components/ObjectFreezeDescriptors.vue';
import RecursionExplorer from './components/RecursionExplorer.vue';
import SuperSubTypeDemo from './components/SuperSubTypeDemo.vue';
import SobesDemo from './components/SobesDemo.vue';
import PropsExplorer from './components/PropsExplorer.vue';
import EmitDemo from './components/EmitDemo.vue';
import HotelBookingCalculator from './components/HotelBookingCalculator.vue';
import ArrayGroupingDemo from './components/ArrayGroupingDemo.vue';
import EventEmitterDemo from './components/EventEmitterDemo.vue';
import PlayerGroupingDemo from './components/PlayerGroupingDemo.vue';
import BindDemo from './components/BindDemo.vue';
import MergeSortedArrays from './components/MergeSortedArrays.vue';
import TwoSum from './components/TwoSum.vue';
import AnagrmExplorer from './components/AnagrmExplorer.vue';
import ArrayDifferenceExplainer from './components/ArrayDifferenceExplainer.vue';
import BracketsValidator from './components/BracketsValidator.vue';
import AlgorString from './components/AlgorString.vue';
import VisualAlgoritm from './components/VisualAlgoritm.vue';
import ClosureTimeoutDemo from './components/ClosureTimeoutDemo.vue';
import MemoizationDemo from './components/MemoizationDemo.vue';
import ArrayFlattenDemo from './components/ArrayFlattenDemo.vue';
import AnagramGroupingVisualizer from './components/AnagramGroupingVisualizer.vue';
import BracketsValidators from './components/BracketsValidators.vue';
import CustomPromiseAll from './components/CustomPromiseAll.vue';
import ArrayMethodsExplorer from './components/ArrayMethodsExplorer.vue';
import FunctionGet from './components/FunctionGet.vue';
import DebounceExplorer from './components/DebounceExplorer.vue';
import FetchRetry from './components/FetchRetry.vue';
import AMTAlgorithmVisualization from './components/AMTAlgorithmVisualization.vue';
import ThisContext from './components/ThisContext.vue';
import ProtoInheitanceExplainer from './components/ProtoInheitanceExplainer.vue';
import ThisContextExplorer from './components/ThisContextExplorer.vue';
import ThisIsBind from './components/ThisIsBind.vue';
import ThisPrototypePosition from './components/ThisPrototypePosition.vue';
import ThisContextJS from './components/ThisContextJS.vue';
import HasOwnPropertyVsinExplainer from './components/HasOwnPropertyVsinExplainer.vue';
import EventLoop from './components/EventLoop.vue';
import EventLoopExplainertwo from './components/EventLoopExplainertwo.vue';
import EventLoopthree from './components/EventLoopthree.vue';
import EventLoopfrou from './components/EventLoopfrou.vue';
import EventLoopFive from './components/EventLoopFive.vue';
import EventLoopSeven from './components/EventLoopSeven.vue';
import EventTen from './components/EventTen.vue';
import EventLoopPromise from './components/EventLoopPromise.vue';
import FlattenObjectDemo from './components/FlattenObjectDemo.vue';
import RecursiveSumComponent from './components/RecursiveSumComponent.vue';
import TreeSumExplainer from './components/TreeSumExplainer.vue';
import DeepCopyExplorer from './components/DeepCopyExplorer.vue';
import FibonacciSolver from './components/FibonacciSolver.vue';
import StringCompression from './components/StringCompression.vue';
import SubstringSearchDemo from './components/SubstringSearchDemo.vue';
import CapitalizeDemo from './components/CapitalizeDemo.vue';
import StringDeduplicator from './components/StringDeduplicator.vue';
import CarirovanieDemo from './components/CarirovanieDemo.vue';
import InfinityCarrirovani from './components/InfinityCarrirovani.vue';
import ClosureLoopExplaine from './components/ClosureLoopExplaine.vue';
import ClosureLoopDemo from './components/ClosureLoopDemo.vue';
import ClouserDetailedDemo from './components/ClouserDetailedDemo.vue';
import ClouserDemo from './components/ClouserDemo.vue';
import SleepDemo from './components/SleepDemo.vue';
import PromiseAllDemo from './components/PromiseAllDemo.vue';
import PromiseAnyExplainer from './components/PromiseAnyExplainer.vue';
import AsyncLimitDemo from './components/AsyncLimitDemo.vue';
import TsDemo from './components/TsDemo.vue';
import MyPickExplainer from './components/MyPickExplainer.vue';
import TypeScript from './components/TypeScript.vue';
import TSKeyof from './components/TSKeyof.vue';
import MyQuestiions from './components/MyQuestiions.vue';
import InteractiveJavaScript from './components/InteractiveJavaScript.vue';
import VueRenderingExplorer from './components/VueRenderingExplorer.vue';
import EventLoopPolyfills from './components/EventLoopPolyfills.vue';
import NewPromise from './components/NewPromise.vue';
import ClousersDemoDemo from './components/ClousersDemoDemo.vue';
import AbortControllerDemo from './components/AbortControllerDemo.vue';

const currentLesson = ref('lifecycle');
</script>

<style>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.menu-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.menu-category {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  background: #fafafa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.category-header {
  background: #34495e;
  color: white;
  padding: 10px 15px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
}

.category-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 15px;
}

.category-buttons button {
  padding: 8px 12px;
  font-size: 0.9rem;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.category-buttons button:hover {
  background: #eaeaea;
  transform: translateY(-2px);
}

.category-buttons button.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
  box-shadow: 0 2px 4px rgba(52, 152, 219, 0.3);
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
  .category-buttons {
    flex-direction: column;
  }
  
  .category-buttons button {
    width: 100%;
    text-align: left;
  }
  
  .lesson-content {
    padding: 15px;
  }
}

@media (max-width: 576px) {
  .app-container {
    padding: 10px;
  }
  
  .menu-category {
    margin-bottom: 10px;
  }
}
</style>