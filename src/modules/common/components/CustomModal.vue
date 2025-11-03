<template>
  <dialog id="my_modal_1" class="modal" :open="open">
    <div class="modal-box">
      <div class="border-b border-blue-500">
        <slot name="header" />
      </div>

      <div class="my-5">
        <slot name="body" />
      </div>
      <div class="modal-action border-t border-t-blue-500">
        <slot name="footer" />
      </div>
    </div>
  </dialog>

  <div
    v-if="open"
    class="modal-backdrop fixed top-0 z-10 ebg-black opacity-50 w-screen h-screen"
  ></div>
</template>

<script setup lang="ts">
interface Props {
  open?: boolean;
}

withDefaults(defineProps<Props>(), {
  open: false,
});
</script>

<style scoped></style>
