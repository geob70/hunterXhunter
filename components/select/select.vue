<template>
  <select @change="onchange($event)">
    <option v-for="(item, index) in options" :key="index" :value="item.value">
      {{ item.label }}
    </option>
  </select>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    // Returns the value of the select element to its parent component
    onchange(event: any): void {
      this.$emit("onchange", event.target.value);
    }
  },
  computed: {}
});
</script>
<style lang="scss" scoped>
@import "./select.scss";
</style>
