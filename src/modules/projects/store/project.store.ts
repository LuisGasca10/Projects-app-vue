import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project } from '../interfaces/project.interface';
import { v4 as uuidv4 } from 'uuid';
const initialLoad = (): Project[] => {
  return [
    { id: '1', name: 'Project 1', tasks: [] },
    { id: '2', name: 'Project 2', tasks: [] },
    { id: '3', name: 'Project 3', tasks: [] },
  ];
};

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>(initialLoad());

  const addProject = (name: string) => {
    projects.value.push({ id: uuidv4(), name, tasks: [] });
  };

  return {
    projectList: computed(() => [...projects.value]),
    addProject,
  };
});
