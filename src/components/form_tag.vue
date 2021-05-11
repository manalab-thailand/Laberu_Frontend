<template>
  <div class="tags-input-container">
    <div class="text-center" style="font-size:18px">ช่องใส่คำอธิบายรูปภาพ</div>
    <div class="q-mb-sm">
    <q-input label="กด Enter เพื่อเว้นวรรค" class="q-pa-none" v-model="tagValue" @keyup.enter="addTag" />
    </div>
    <div class="tag shadow-1" v-for="(tag, index) in tags" :key="'tag' + index">
      <span v-if="activeTag !== index" @click="activeTag = index">
        {{ tag }}
      </span>
      <input
        v-else
        v-model="tags[index]"
        v-focus
        :style="{ width: tag.length + 'ch' }"
        @keyup.enter="activeTag = null"
        @blur="activeTag = null"
      />
      <span @click="removeTag(index)"><i class="fas fa-times-circle"></i></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data: () => {
    return {
      tagValue: "",
      tags: [],
      activeTag: null,
    };
  },
  watch: {
    value(val) {
      if (val.length == 0) {
        this.tags = [];
      }
    },
  },
  methods: {
    addTag() {
      if (!this.tagValue == "") this.tags.push(this.tagValue);

      this.$emit("changeMessage", this.tags);

      this.tagValue = "";
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
  },
  directives: {
    focus: {
      inserted: (el) => {
        el.focus();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.tags-input-container {
  width: 100%;
  max-width: 600px;
  padding: 10px;
  background-color: rgba($color: #ffffff, $alpha: 0.7);
  

  input {
    width: 100%;
    padding: 0;
    margin: 0;
    border: 0;
    outline: none;
    background-color: transparent;
    font-size: 1rem;

  }
  .tag {
    margin-left: 3px;
    margin-top: 3px;
    float: left;
    padding: 3px 5px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    background-color: #d46aff;
    color: #ffffff;
    border-radius: 5px;
    &:hover {
      background-color: #57c340;
      border-radius: 5px;
    }
    span:first-child {
      margin-right: 8px;
    }
    svg {
      color: #666;
      &:hover {
        color: #333;
      }
    }
  }
}
</style>