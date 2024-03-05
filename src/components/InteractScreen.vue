<template>
  <div class="screen">
    <div>
      <h1>In Match ({{ width }}x{{ height }})</h1>
      <button class="btn" @click="onStarAgain()">Start again!</button>
      <button class="btn" @click="onFlipAll()">Flip All!</button>
    </div>
    <div
      class="screen__inner"
      :style="{
        width: `${1360 - 16 * (width - 1)}px`,
      }"
    >
      <card-flip
        :key="index"
        :ref="`card-${index}`"
        v-for="(card, index) in cardsContext"
        :imgBackFaceUrl="`imgs/${card}.png`"
        :card="{ index: index, value: card }"
        :width="width"
        :height="height"
        @onFlip="checkRule($event)"
        :fliping="fliping"
      ></card-flip>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
export default {
  props: {
    cardsContext: {
      type: Array,
      default: function () {
        return [];
      },
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  components: {
    "card-flip": Card,
  },
  data() {
    return {
      rules: [],
      fliping: false,
    };
  },
  methods: {
    checkRule(card) {
      this.rules.push(card);

      // Test push card
      console.log(this.rules);

      // Reset rule [Done]
      if (this.rules.length > 2) {
        this.rules = [];
      }

      // handler flip one card twice err [Done]
      if (
        this.rules.length === 2 &&
        this.rules[0].index == this.rules[1].index
      ) {
        // console.log("dk err 1", this.rules);
        let clone = this.rules[1];
        this.rules = [];
        this.rules.push(clone);
      }
      // if (
      //   this.rules.length === 2 &&
      //   this.rules[0].index == this.rules[1].index
      // ) {
      //   // console.log("dk err 1", this.rules);
      //   let cardFliped = this.$refs[`card-${this.rules[1].index}`][0];
      //   this.rules = [];

      //   setTimeout(() => {
      //     cardFliped.onFlipBackCard();
      //   }, 500);
      // }

      //
      if (
        this.rules.length === 2 &&
        this.rules[0].value == this.rules[1].value &&
        this.rules[0].index !== this.rules[1].index
      ) {
        console.log("dk true", this.rules);
        console.log(">>> True");

        this.$refs[`card-${this.rules[0].index}`][0].onDisable();
        this.$refs[`card-${this.rules[1].index}`][0].onDisable();

        this.rules = [];

        const disabledElements = document.querySelectorAll(
          ".screen .card.disabled",
        );

        // console.log(disabledElements.length)
        // console.log(this.cardsContext.length)

        // Game set [Done]
        if (
          disabledElements &&
          disabledElements.length === this.cardsContext.length - 2
        ) {
          console.log(">>> Finish");

          setTimeout(() => {
            this.$emit("onFinish");
          }, 3000);
        }
      } else if (
        this.rules.length === 2 &&
        this.rules[0].value !== this.rules[1].value
      ) {
        console.log(">>> False");
        console.log("dk false", this.rules);

        let a = this.$refs[`card-${this.rules[0].index}`][0];
        let b = this.$refs[`card-${this.rules[1].index}`][0];
        this.rules = [];

        setTimeout(() => {
          a.onFlipBackCard();
          b.onFlipBackCard();
        }, 500);
      } else {
        // this.rules = []
        return false;
      }
    },

    onStarAgain() {
      this.$emit("onStarAgain");
    },

    onFlipAll() {
      if (this.fliping) {
        this.fliping = !this.fliping;
      } else {
        this.fliping = true;
      }
    },
  },
};
</script>

<style>
.screen {
  width: 100%;
  height: 100vh;
  padding: 40px;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  /* background-color: var(--dark-color);
  color: var(--light-color); */
}

h1 {
  margin-bottom: 20px;
}

.btn {
  margin-bottom: 20px;
  margin-left: 10px;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  color: white;
  background-color: rgb(0, 89, 255);
  border-radius: 10px;
  box-shadow: 0 2px 20px 2px rgba(0, 0, 0, 0.2);
}

button:hover {
  background-color: rgb(0, 60, 175);
  box-shadow: 0 2px 20px 2px rgba(0, 0, 0, 0.3);
}
</style>
