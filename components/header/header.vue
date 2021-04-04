<template>
  <div class="header">
    <img draggable="false" src="~/assets/character.png" alt="" />

    <h3>{{ title }}</h3>
    <span>{{ text1 }}</span>
    <span>{{ text2 }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true
    },
    text1: {
      type: String
    },
    text2: {
      type: String
    }
  }
});
</script>

<style lang="scss" scoped>
@import "./header.scss";
</style>
