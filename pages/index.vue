<template>
  <div class="div-container">
    <side-box class="left" />
    <div class="top">
      <m-header
        title="Greedy Hunter"
        text1="The aim is to eat all the food in record time"
        text2="Configure your game grid below 👇🏼"
      />
      <div class="set-up">
        <span id="game">Game grid</span>
        <m-input />
      </div>
      <m-button :action="startGame" text="Start game" />
    </div>
    <side-box class="right" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import mInput from "~/components/input/input.vue";
import mButton from "~/components/button/button.vue";
import mHeader from "~/components/header/header.vue";
import SideBox from "~/components/side-box/side.vue";

export default Vue.extend({
  mounted() {
    this.$store.commit("SET_GRID", 5); // set grid size to default value of 5
  },
  data() {
    return {};
  },
  methods: {
    startGame: function(): void {
      this.$router.push("/game/game");
    }
  },
  components: {
    mInput,
    mButton,
    mHeader,
    SideBox
  }
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
