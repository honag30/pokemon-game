<template>
  <div class="screen">
    <h1>POKEMON GAME (90% Completed)</h1>

    <h2>Select mode to start game</h2>

    <div class="action">
      <button @click="onStart(4, 3)">
        <span>4x3</span><br />
        <span>Easy</span>
      </button>
      <button @click="onStart(6, 4)">
        <span>6x4</span><br />
        <span>Medium</span>
      </button>
      <button @click="onStart(8, 6)">
        <span>8x6</span><br />
        <span>Hard</span>
      </button>
      <button @click="onStart(10, 8)">
        <span>10x8</span><br />
        <span>Master</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onStart(width, height) {
      this.$emit("onStart", { width, height });
    },
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 50px;
}

button {
  margin: 20px;
  width: 100px;
  height: 80px;
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
