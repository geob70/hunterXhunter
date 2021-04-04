<template>
  <div class="health">
    <img draggable="false"
      class="heart"
      src="~/assets/heart.png"
      alt=""
      width="50px"
      height="42px"
      srcset=""
    />
    <div class="bar-container">
      <div :style="{ width: health }" class="health-bar"></div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    percentage: {
      type: Number,
      required: true
    }
  },
  computed: {
    health(): string {
      const percent = (this.percentage / 100) * 158; // 158 is the width of a full health bar
      return percent + "px";
    }
  }
});
</script>
<style lang="scss" scoped>
@import "./life.scss";
</style>
