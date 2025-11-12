<template>
  <div class="w-full">
    <section class="m-2">
      <bread-crumbs :name="project?.name ?? 'No encontrado'" />
    </section>

    <section class="m-2">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>Comletada</th>
              <th>Tarea</th>
              <th>Comletada en</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 2 -->
            <tr v-for="task in project?.tasks" :key="task.id" class="hover:bg-base-300">
              <th><input type="checkbox" class="checkbox checkbox-primary" /></th>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt }}</td>
            </tr>
            <tr class="hover:bg-base-300">
              <th></th>
              <td>
                <input
                  type="text"
                  class="input input-primary w-full opacity-60 transition-all hover:opacity-100 focus:opacity-100"
                  placeholder="Agregar nueva tarea"
                  @keyup.enter="addTask"
                  v-model="newTask"
                />
              </td>
              <th></th>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import { useProjectsStore } from '../store/project.store';
import { ref, watch } from 'vue';
import type { Project } from '../interfaces/project.interface';
import { useRouter } from 'vue-router';

interface Props {
  id: string;
}

const router = useRouter();
const newTask = ref('');
const props = defineProps<Props>();

const projectStore = useProjectsStore();
const project = ref<Project | null>();

const addTask = () => {
  if (!project.value) return;
  projectStore.addTaskToProject(project.value.id, newTask.value);
  newTask.value = '';
};

watch(
  () => props.id,
  () => {
    project.value = projectStore.projectList.find((project) => project.id === props.id);
    if (!project.value) {
      router.replace('/');
    }
  },
  {
    immediate: true,
  },
);
</script>
