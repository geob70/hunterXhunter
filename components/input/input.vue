<template>
  <div class="input-div">
    <input
      type="number"
      min="5"
      max="12"
      :value="value"
      :v-bind="$attrs"
      disabled
    />
    <img draggable="false" class="up" @click="increment" src="~/assets/caret.png" alt="" srcset="" />
    <img draggable="false" class="down" @click="decrement" src="~/assets/caret.png" alt="" srcset="" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      value: 5
    };
  },
  methods: {
    increment: function() : void {
      if (this.value < 12) this.value ++;
      this.$store.commit("SET_GRID", this.value);
    },
    decrement: function() : void {
      if (this.value > 5) this.value --;
      this.$store.commit("SET_GRID", this.value);
    }
  },
  computed: {}
});
</script>
<style lang="scss" scoped>
@import "./input.scss";
</style>
