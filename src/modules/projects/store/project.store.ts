import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Project } from '../interfaces/project.interface';

const initialLoad = (): Project[] => {
  return [
    { id: '1', name: 'Project 1', tasks: [] },
    { id: '2', name: 'Project 2', tasks: [] },
    { id: '3', name: 'Project 3', tasks: [] },
  ];
};

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>(initialLoad());
  return { projects };
});
