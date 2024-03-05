<template>
  <div class="screen">
    <h1 class="comp">Congratulation!</h1>
    <h2 class="comp">You finish the game in:</h2>
    <p class="comp score">{{ time }}</p>
    <!-- <h2 class="comp">second</h2> -->
    <button class="comp btn" @click="onStarAgain()">Start again!</button>
  </div>
</template>
<script>
import { toTimeString } from "../utils/array";

export default {
  props: {
    timer: {
      type: Number,
      required: true,
    },
  },

  computed: {
    time() {
      return toTimeString(Math.round(this.timer / 1000));
    },
  },

  methods: {
    onStarAgain() {
      this.$emit("onStarAgain");
    },
  },
};
</script>
<style scoped>
.comp {
  margin: 20px;
}
.score {
  font-size: 50px;
}

.btn {
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
