import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project } from '../interfaces/project.interface';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []));

  const addProject = (name: string) => {
    projects.value.push({ id: uuidv4(), name, tasks: [] });
  };

  const addTaskToProject = (projectId: string, taskName: string) => {
    if (taskName.trim().length === 0) return;

    const project = projects.value.find((p) => p.id === projectId);
    if (!project) return;

    project.tasks.push({ id: uuidv4(), name: taskName });
  };

  return {
    projectList: computed(() => [...projects.value]),
    noProjects: computed(() => projects.value.length === 0),
    addProject,
    addTaskToProject,
  };
});
