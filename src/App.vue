<template>
  <!-- <h2>New Pokemon Game (90% Completed)</h2> -->
  <main-screen
    v-if="statusMatch === 'default'"
    @onStart="onHandleBeforeStart($event)"
  ></main-screen>

  <interect-screen
    v-if="statusMatch === 'match'"
    :cardsContext="settings.cardsContext"
    :width="width"
    :height="height"
    @onFinish="onGetResult()"
    @onStarAgain="statusMatch = 'default'"
  ></interect-screen>

  <result-screen
    v-if="statusMatch === 'result'"
    :timer="timer"
    @onStarAgain="statusMatch = 'default'"
  ></result-screen>
</template>

<script>
import MainScreen from "./components/MainScreen.vue";
import InteractScreen from "./components/InteractScreen.vue";
import ResultScreen from "./components/ResultScreen.vue";
import { shuffled } from "./utils/array";

export default {
  name: "App",

  components: {
    "main-screen": MainScreen,
    "interect-screen": InteractScreen,
    "result-screen": ResultScreen,
  },

  data() {
    return {
      settings: {
        width: 0,
        height: 0,
        totalBlocks: 0,
        cardsContext: [],
        startedAt: null,
      },
      statusMatch: "default",
      timer: 0,
    };
  },

  methods: {
    onHandleBeforeStart(config) {
      this.height = config.height;
      this.width = config.width;

      let total = this.width * this.height;
      this.settings.totalBlocks = total;

      // New
      function createRandomArray(length, min, max) {
        return Array.from(
          { length },
          () => Math.floor(Math.random() * (max - min + 1)) + min,
        );
      }
      const arrayLength = this.settings.totalBlocks / 2; // The length of the array
      const minValue = 1; // Minimum value for random numbers
      const maxValue = 64; // Maximum value for random numbers

      const firstCards = createRandomArray(arrayLength, minValue, maxValue);

      // const firstCards = Array.from(
      //   { length: this.settings.totalBlocks / 2 },
      //   (_, i) => i + 1,
      // );

      const secondCards = [...firstCards];

      const cards = [...firstCards, ...secondCards];

      this.settings.cardsContext = shuffled(cards);

      this.settings.startedAt = new Date().getTime();

      this.statusMatch = "match";
    },

    onGetResult() {
      let finishTime = new Date().getTime();
      this.timer = finishTime - this.settings.startedAt;

      this.statusMatch = "result";
    },
  },
};
</script>

<style></style>
