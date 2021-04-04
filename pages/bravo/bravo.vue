<template>
  <div class="div-container">
    <side-box class="left" />
    <div class="top">
      <m-header title="Bravo!" :text1="time_spent" />
      <div class="set-up">
        <span id="game">Game grid</span>
        <m-input />
      </div>
      <m-button :action="startGame" text="Start again" />
    </div>
    <side-box class="right" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import mButton from "~/components/button/button.vue";
import mHeader from "~/components/header/header.vue";
import SideBox from "~/components/side-box/side.vue";
import mInput from "~/components/input/input.vue";

export default Vue.extend({
  mounted() {
    // handle bravo page refresh
    if (this.$store.state.time == null) {
      this.$router.push("/");
    }
    this.$store.commit("SET_GRID", 5); // set grid size to default value
    this.time_spent = "Time Spent: " + this.$store.state.time + " seconds"; // fetch time taken to complete game from store
    this.$store.commit("SET_TIME", null); // reset time to null
  },
  data() {
    return {
      time_spent: ""
    };
  },
  methods: {
    handleChange: function(value: number): void {
      this.$store.commit("SET_GRID", value);
    },
    startGame: function(): void {
      this.$router.push("/game/game");
    }
  },
  components: {
    mButton,
    mHeader,
    SideBox,
    mInput
  }
});
</script>

<style lang="scss" scoped>
@import "./bravo.scss";
</style>
