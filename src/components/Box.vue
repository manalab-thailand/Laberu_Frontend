<template>
  <div class="box-wrapper">
    <div class="row justify-between">
      <div
        style="padding: 0 5px"
        class="label"
        v-if="bLabel"
        :style="{
          top: bTop - 20 + 'px',
          left: bLeft + 'px',
          width: bWidth + 'px',
        }"
      >
        {{ bLabel }}
      </div>
      <div
        class="box-delete"
        v-on:click="removeMyself"
        v-if="bActive"
        :style="{
          top: bTop - 28 + 'px',
          left: bLeft + bWidth - 17 + 'px',
        }"
      >
        x
      </div>
    </div>
    <div
      class="box"
      :style="{
        top: bTop + 'px',
        left: bLeft + 'px',
        width: bWidth + 'px',
        height: bHeight + 'px',
      }"
      v-bind:class="{ active: bActive }"
      @mousedown="selectBox"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Box",
  props: [
    "b-top",
    "b-left",
    "b-width",
    "b-height",
    "b-label",
    "on-select",
    "b-active",
    "b-index",
    "on-delete",
  ],
  methods: {
    selectBox() {
      this.onSelect(this.bIndex);
    },
    removeMyself() {
      this.onDelete(this.bIndex);
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  position: absolute;
  border: 2px #90ee90 solid;

  &:hover,
  &.active {
    background-color: rgba(144, 238, 144, 0.2);
  }

  z-index: 3;
}
.label {
  position: absolute;
  height: 22px;
  font-size: 16px;
  color: #000;
  font-weight: bold;
  background-color: #90ee90;
  z-index: 4;
}
.box-delete {
  position: absolute;
  z-index: 6;
  font-weight: bold;
  color: red;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
}
</style>