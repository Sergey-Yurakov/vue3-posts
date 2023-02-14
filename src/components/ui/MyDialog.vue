<template>
  <div class="dialog" v-show="show" @click="hideDialog">
    <div class="dialog__content" @click.stop>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "my-dialog",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideDialog() {
      this.$emit("update:show", false);
    },
  },
};
</script>

<style scoped>
.dialog {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog__content {
  padding: 20px;
  background: white;
  border-radius: 12px;
  min-width: 500px;
  min-height: 70px;
}
</style>
