<template>
  <div @click="action" class="button">{{ text }}</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    text: {
      type: String,
      required: true
    },
    action: {
      type: Function,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
@import "./button.scss";
</style>
