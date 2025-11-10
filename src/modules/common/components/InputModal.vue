<template>
  <dialog id="my_modal_1" class="modal" :open="open">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <p v-if="subTitle" class="py-4">{{ subTitle }}</p>
      <div class="modal-action flex flex-col">
        <form method="dialog" @submit.prevent="submitValue">
          <input
            ref="inputRef"
            type="text"
            v-model="inputValue"
            class="input input-bordered input-primary w-full flex-1"
            name="proyecto"
            :placeholder="placeholder ?? 'Ingrese un valor'"
          />
          <!-- if there is a button in form, it will close the modal -->
          <div class="flex justify-end mt-5 gap-6">
            <button type="button" @click="onClose" class="btn">Close</button>
            <button type="submit" class="btn btn-primary">Agregar</button>
          </div>
        </form>
      </div>
    </div>
  </dialog>

  <div
    v-if="open"
    class="modal-backdrop fixed top-0 z-10 ebg-black opacity-50 w-screen h-screen"
  ></div>
</template>

<script setup lang="ts">
import { onRenderTriggered, ref } from 'vue';

interface Props {
  title: string;
  subTitle?: string;
  open: boolean;
  placeholder?: string;
}
defineProps<Props>();
const emit = defineEmits<{
  close: [void];
  value: [string];
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const inputValue = ref('');

onRenderTriggered((effect) => {
  if (effect.key === 'open' && effect.newValue == true) {
    setTimeout(() => {
      inputRef.value?.focus();
    }, 50);
  }
});

const submitValue = () => {
  if (!inputValue.value) {
    inputRef.value?.focus();
    return;
  }

  emit('value', inputValue.value.trim());
  inputValue.value = '';
  emit('close');
};

const onClose = () => {
  emit('close');
  inputValue.value = '';
};
</script>

<style scoped></style>
