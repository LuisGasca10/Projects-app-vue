<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Proyecto</th>
          <th>Tareas</th>
          <th>Avance</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(project, index) in projectStore.projectsWithCompletion"
          :key="project.id"
          class="hover:bg-base-300"
        >
          <th>{{ index + 1 }}</th>
          <td>{{ project.name }}</td>
          <td>{{ project.taskCount }}</td>
          <td>
            <progress
              class="progress progress-primary w-56"
              :value="project.completion"
              max="100"
            ></progress>
            <!-- {{ project.completion }} -->
          </td>
        </tr>
        <!-- row 3 -->
      </tbody>
    </table>

    <input-modal
      title="Nuevo Proyecto"
      sub-title="Dale un nombre unico a tu proyetco"
      :open="modalOpen"
      :placeholder="'Ingrese el nombre del proyecto'"
      @close="modalOpen = false"
      @value="onNewValue"
    />

    <custom-modal :open="customModalOpen">
      <template #header>
        <h1 class="text-3xl">Crear un nuevo proyecto</h1>
      </template>

      <template #body>
        <input
          ref="inputRef"
          type="text"
          class="input input-bordered input-primary w-full flex-1"
          name="proyecto"
          :placeholder="'Ingrese un valor'"
        />
      </template>

      <template #footer>
        <div class="flex justify-end gap-6">
          <button @click="customModalOpen = false" class="btn">Close</button>
          <button @click="customModalOpen = false" class="btn btn-primary">Agregar</button>
        </div>
      </template>
    </custom-modal>

    <fab-button @click="modalOpen = true">
      <add-circle />
    </fab-button>
    <fab-button @click="customModalOpen = true" position="bottom-left">
      <add-circle />
    </fab-button>
  </div>
</template>

<script setup lang="ts">
import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import { ref } from 'vue';

import { useProjectsStore } from '../store/project.store';

const modalOpen = ref(false);
const customModalOpen = ref(false);

const projectStore = useProjectsStore();

const onNewValue = (projectName: string) => {
  projectStore.addProject(projectName);
  modalOpen.value = false;
};
</script>

<style scoped></style>
