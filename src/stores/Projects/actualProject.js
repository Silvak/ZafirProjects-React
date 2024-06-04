import { axiosInstance } from '@/config/apiConfig';

export const actualProject = (set, get) => ({
  projectsData: [],
  selectedProject: undefined,
  myTasks: [],

  clearTasks: () => {
    set({ myTasks: [] });
  },

  fetchTasksById: async (projectId) => {
    try {
      const { data } = await axiosInstance.get(
        `/tasksList/project/${projectId}`
      );
      set({ myTasks: data });
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  },

  fetchProjects: async (idUser) => {
    try {
      const { data } = await axiosInstance.get(`/projects/user/${idUser}`);
      if (data) {
        set({ projectsData: data, selectedProject: data[0] });
        if (data[0]) {
          await get().fetchTasksById(data[0]._id);
        }
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  },

  setSelectedProject: async (project) => {
    set({ selectedProject: project });
    await get().fetchTasksById(project._id);
  },

  updateProjects: async () => {
    try {
      const { data } = await axiosInstance.get('/projects');
      set({ projectsData: data });
    } catch (error) {
      console.error('Error actualizando proyectos:', error);
    }
  },
  selectedProjectById: async (id) => {
    try {
      const { data } = await axiosInstance.get(`/projects/${id}`);
      if (data) {
        set({ selectedProject: data });
      }
    } catch (error) {
      console.error('Error actualizando proyecto:', error);
    }
  },
  updateProject: async (id, newProject) => {
    try {
      const data = await axiosInstance.put(`/projects/${id}`, newProject);
    } catch (error) {
      console.error('Error actualizando proyecto:', error);
    }
  },
  addProject: async (userId, newProject) => {
    try {
      const data = await axiosInstance.post(`/projects/${userId}`, newProject);
    } catch (error) {
      console.error('Error creando proyecto:', error);
    }
  },
  deleteProject: async (id) => {
    try {
      const data = await axiosInstance.delete(`/projects/${id}`);
    } catch (error) {
      console.error('Error eliminando proyecto:', error);
    }
  },
  clearProjects: () => {
    set({ projectsData: [], selectedProject: undefined });
  },
});
