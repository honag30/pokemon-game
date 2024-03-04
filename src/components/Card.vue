<template>
  <div
    class="card"
    :class="{ disabled: state.isDisabled }"
    :style="{
      width: `${(1200 - 16 * (width - 1)) / width}px`,
    }"
  >
    <p>isFlipped: {{ state.isFlipped }}</p>
    <p>fliping: {{ fliping }}</p>

    <div
      class="card__inner"
      :class="{ 'is-flipped': state.isFlipped }"
      @click="onToggleFlipCard"
    >
      <div class="card__face card__face--front">
        <div class="card__content"></div>
      </div>

      <div class="card__face card__face--back">
        <div
          class="card__content"
          :style="{
            backgroundImage: `url( ${require('@/assets/' + imgBackFaceUrl)} )`,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, watch } from "vue";
export default {
  props: {
    imgBackFaceUrl: {
      type: String,
      required: true,
    },
    card: {
      type: [Number, Object, String, Array],
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    fliping: {
      type: Boolean,
    },
  },

  // data() {
  //   return {
  //     isFlipped: false,
  //     isDisabled: false,
  //   };
  // }

  setup(props, { emit }) {
    let state = reactive({
      isFlipped: false,
      isDisabled: false,
    });

    watch(props.fliping, (newValue, oldValue) => {
      if (newValue == true) {
        state.isFlipped = true;
      } else if (oldValue == true) {
        state.isFlipped == false;
      }
    });

    // const changeFlipped = () => {
    //   console.log(props.fliping);
    //   if (props.fliping == true) {
    //     state.isFlipped = true;
    //   }
    // };
    // changeFlipped();

    return {
      state,
    };
  },

  methods: {
    onToggleFlipCard() {
      if (this.state.isDisabled) {
        return false;
      } else {
        this.state.isFlipped = !this.state.isFlipped;
        if (this.state.isFlipped) {
          this.$emit("onFlip", this.card);
        }
      }
    },
    onFlipBackCard() {
      this.state.isFlipped = false;
    },
    onDisable() {
      this.state.isDisabled = true;
    },
  },
};
</script>
<style scoped>
.card {
  display: inline-block;
  margin: 0.5rem;
  height: 10rem;
}

.card__inner {
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
}

.card__inner.is-flipped {
  transform: rotateY(-180deg);
}

.card.disabled .card__inner {
  cursor: default;
}

.card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  overflow: hidden;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 2px 20px 2px rgba(0, 0, 0, 0.2);
}

.card__face--front {
  background-color: var(--dark-color);
}

.card__face--front .card__content {
  background: url("../assets/imgs/icon_back.png") no-repeat center center;
  background-size: 50px 50px;
  height: 100%;
  width: 100%;
}

.card__face--back {
  background-color: var(--light-color);
  transform: rotateY(-180deg);
}

.card__face--back .card__content {
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}

.card.disabled .card__face--back {
  background-color: var(--disabled-color);
  transition: 1s;
}
</style>
