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
      <button 
        :class="{ active: currentLesson === 'jsproblem' }"
        @click="currentLesson = 'jsproblem'"
      >
      jsproblem
      </button>
      <button 
        :class="{ active: currentLesson === 'asyncdefer' }"
        @click="currentLesson = 'asyncdefer'"
      >
      asyncdefer
      </button>
      <button 
        :class="{ active: currentLesson === 'arrowfunction' }"
        @click="currentLesson = 'arrowfunction'"
      >
      arrowfunction
      </button>
      <button 
        :class="{ active: currentLesson === 'hasownvsin' }"
        @click="currentLesson = 'hasownvsin'"
      >
      hasownvsin
      </button>
      <button 
        :class="{ active: currentLesson === 'freezedescription' }"
        @click="currentLesson = 'freezedescription'"
      >
      freezedescription
      </button>
      <button 
        :class="{ active: currentLesson === 'recursionexplorer' }"
        @click="currentLesson = 'recursionexplorer'"
      >
      recursionexplorer
      </button>
      <button 
        :class="{ active: currentLesson === 'supersubtypedemo' }"
        @click="currentLesson = 'supersubtypedemo'"
      >
      supersubtypedemo
      </button>
      <button 
        :class="{ active: currentLesson === 'sobesdemo' }"
        @click="currentLesson = 'sobesdemo'"
      >
      sobes
      </button>
      <button 
        :class="{ active: currentLesson === 'propsexplorer' }"
        @click="currentLesson = 'propsexplorer'"
      >
      propsexplorer
      </button>
      <button 
        :class="{ active: currentLesson === 'emitdemo' }"
        @click="currentLesson = 'emitdemo'"
      >
      emitdemo
      </button>
      <button 
        :class="{ active: currentLesson === 'hotelbookingcalculator' }"
        @click="currentLesson = 'hotelbookingcalculator'"
      >
      hotelbookingcalculator
      </button>
      <button 
        :class="{ active: currentLesson === 'arraygrouping' }"
        @click="currentLesson = 'arraygrouping'"
      >
      arraygrouping
      </button>
      <button 
        :class="{ active: currentLesson === 'eventemitter' }"
        @click="currentLesson = 'eventemitter'"
      >
      eventemitter
      </button>
      <button 
        :class="{ active: currentLesson === 'playergrouping' }"
        @click="currentLesson = 'playergrouping'"
      >
      playergrouping
      </button>
      <button 
        :class="{ active: currentLesson === 'bind' }"
        @click="currentLesson = 'bind'"
      >
      bind
      </button>
      <button 
        :class="{ active: currentLesson === 'mergesortedarrays' }"
        @click="currentLesson = 'mergesortedarrays'"
      >
      mergesortedarrays
      </button>
      <button 
        :class="{ active: currentLesson === 'twosum' }"
        @click="currentLesson = 'twosum'"
      >
      twosum
      </button>
      <button 
        :class="{ active: currentLesson === 'anagrmexplorer' }"
        @click="currentLesson = 'anagrmexplorer'"
      >
      anagrmexplorer
      </button>
      <button 
        :class="{ active: currentLesson === 'arraydifferenceexplainer' }"
        @click="currentLesson = 'arraydifferenceexplainer'"
      >
      arraydifferenceexplainer
      </button>
      <button 
        :class="{ active: currentLesson === 'bracketsvalidator' }"
        @click="currentLesson = 'bracketsvalidator'"
      >
      bracketsvalidator
      </button>
      <button 
        :class="{ active: currentLesson === 'algorstring' }"
        @click="currentLesson = 'algorstring'"
      >
      algorstring
      </button>
      <button 
        :class="{ active: currentLesson === 'visualalgoritm' }"
        @click="currentLesson = 'visualalgoritm'"
      >
      visualalgoritm
      </button>
      <button 
        :class="{ active: currentLesson === 'closuretimeouto' }"
        @click="currentLesson = 'closuretimeouto'"
      >
      closuretimeouto
      </button>
      <button 
        :class="{ active: currentLesson === 'memoization' }"
        @click="currentLesson = 'memoization'"
      >
      memoization
      </button>
      <button 
        :class="{ active: currentLesson === 'arrayflatten' }"
        @click="currentLesson = 'arrayflatten'"
      >
      arrayflatten
      </button>
      <button 
        :class="{ active: currentLesson === 'anagramgroupingvisualizer' }"
        @click="currentLesson = 'anagramgroupingvisualizer'"
      >
      anagramgroupingvisualizer
      </button>
      <button 
        :class="{ active: currentLesson === 'bracketsvalidators' }"
        @click="currentLesson = 'bracketsvalidators'"
      >
      bracketsvalidators
      </button>
      <button 
        :class="{ active: currentLesson === 'custompromiseall' }"
        @click="currentLesson = 'custompromiseall'"
      >
      custompromiseall
      </button>
      <button 
        :class="{ active: currentLesson === 'arraymethodsexplorer' }"
        @click="currentLesson = 'arraymethodsexplorer'"
      >
      arraymethodsexplorer
      </button>
      <button 
        :class="{ active: currentLesson === 'functionget' }"
        @click="currentLesson = 'functionget'"
      >
      functionget
      </button>
      <button 
        :class="{ active: currentLesson === 'debounceexplorer' }"
        @click="currentLesson = 'debounceexplorer'"
      >
      debounceexplorer
      </button>
      <button 
        :class="{ active: currentLesson === 'fetchretry' }"
        @click="currentLesson = 'fetchretry'"
      >
      fetchretry
      </button>
      <button 
        :class="{ active: currentLesson === 'amtalgorithmvisualization' }"
        @click="currentLesson = 'amtalgorithmvisualization'"
      >
      amtalgorithmvisualization
      </button>
      <button 
        :class="{ active: currentLesson === 'thiscontext' }"
        @click="currentLesson = 'thiscontext'"
      >
      thiscontext
      </button>
      <button 
        :class="{ active: currentLesson === 'protoinheitanceexplainer' }"
        @click="currentLesson = 'protoinheitanceexplainer'"
      >
      protoinheitanceexplainer
      </button>
      <button 
        :class="{ active: currentLesson === 'thiscontextexplorer' }"
        @click="currentLesson = 'thiscontextexplorer'"
      >
      thiscontextexplorer
      </button>
      <button 
        :class="{ active: currentLesson === 'thisisbind' }"
        @click="currentLesson = 'thisisbind'"
      >
      thisisbind
      </button>
      <button 
        :class="{ active: currentLesson === 'thisprototypeposition' }"
        @click="currentLesson = 'thisprototypeposition'"
      >
      thisprototypeposition
      </button>
      <button 
        :class="{ active: currentLesson === 'thiscontextjs' }"
        @click="currentLesson = 'thiscontextjs'"
      >
      thiscontextjs
      </button>
      <button 
        :class="{ active: currentLesson === 'hasownpropertyvsinexplainer' }"
        @click="currentLesson = 'hasownpropertyvsinexplainer'"
      >
      hasownpropertyvsinexplainer
      </button>
      <button 
        :class="{ active: currentLesson === 'eventloops' }"
        @click="currentLesson = 'eventloops'"
      >
      eventloops
      </button>
      <button 
        :class="{ active: currentLesson === 'eventloopexplainertwo' }"
        @click="currentLesson = 'eventloopexplainertwo'"
      >
      eventloopexplainertwo
      </button>
      <button 
        :class="{ active: currentLesson === 'eventloopthree' }"
        @click="currentLesson = 'eventloopthree'"
      >
      eventloopthree
      </button>
      <button 
        :class="{ active: currentLesson === 'eventloopfrou' }"
        @click="currentLesson = 'eventloopfrou'"
      >
      eventloopfrou
      </button>
      <button 
        :class="{ active: currentLesson === 'eventloopfive' }"
        @click="currentLesson = 'eventloopfive'"
      >
      eventloopfive
      </button>
      <button 
        :class="{ active: currentLesson === 'eventloopseven' }"
        @click="currentLesson = 'eventloopseven'"
      >
      eventloopseven
      </button>
      <button 
        :class="{ active: currentLesson === 'eventten' }"
        @click="currentLesson = 'eventten'"
      >
      eventten
      </button>
      <button 
        :class="{ active: currentLesson === 'eventlooppromise' }"
        @click="currentLesson = 'eventlooppromise'"
      >
      eventlooppromise
      </button>
      <button 
        :class="{ active: currentLesson === 'flattenobjectdemo' }"
        @click="currentLesson = 'flattenobjectdemo'"
      >
      flattenobjectdemo
      </button>
      <button 
        :class="{ active: currentLesson === 'recursivesumcomponent' }"
        @click="currentLesson = 'recursivesumcomponent'"
      >
      recursivesumcomponent
      </button>
      <button 
        :class="{ active: currentLesson === 'treesumexplainer' }"
        @click="currentLesson = 'treesumexplainer'"
      >
      treesumexplainer
      </button>
      <button 
        :class="{ active: currentLesson === 'deepcopyexplorer' }"
        @click="currentLesson = 'deepcopyexplorer'"
      >
      deepcopyexplorer
      </button>
      <button 
        :class="{ active: currentLesson === 'fibonaccisolver' }"
        @click="currentLesson = 'fibonaccisolver'"
      >
      fibonaccisolver
      </button>
      <button 
        :class="{ active: currentLesson === 'stringcompression' }"
        @click="currentLesson = 'stringcompression'"
      >
      stringcompression
      </button>
      <button 
        :class="{ active: currentLesson === 'substringsearchDemo' }"
        @click="currentLesson = 'substringsearchDemo'"
      >
      substringsearchDemo
      </button>
      <button 
        :class="{ active: currentLesson === 'capitalizedemo' }"
        @click="currentLesson = 'capitalizedemo'"
      >
      capitalizedemo
      </button>
      <button 
        :class="{ active: currentLesson === 'stringdeduplicator' }"
        @click="currentLesson = 'stringdeduplicator'"
      >
      stringdeduplicator
      </button>
    </div>
    
    <div class="lesson-content">
      <LifecycleDemo v-if="currentLesson === 'lifecycle'" />
      <CollectionsDemo v-if="currentLesson === 'collections'" />
      <ArraysWorkshop v-if="currentLesson === 'arrays'" />
      <WebSocketDemo v-if="currentLesson === 'websocket'" />
      <EventLoopExplorer v-if="currentLesson === 'eventloop'" />
      <BrowserRenderingCycle v-if="currentLesson === 'rendering'"/>
      <ConstEnum v-if="currentLesson === 'enum'"/>
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