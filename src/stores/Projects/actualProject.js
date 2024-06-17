import { axiosInstance } from '@/config/apiConfig';

export const actualProject = (set, get) => ({
  projectsData: [],
  leaderProjects: [],
  memberProjects: [],
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
        const leaderProjects = data.filter(
          (project) => project.membershipType === 'leader'
        );
        const memberProjects = data.filter(
          (project) => project.membershipType === 'member'
        );
        set({
          projectsData: data,
          leaderProjects,
          memberProjects,
        });

        const selectedProject = get().selectedProject;
        if (!selectedProject) {
          set({ selectedProject: data[0] });
        }

        if (selectedProject && selectedProject._id) {
          await get().fetchTasksById(selectedProject._id);
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

  updateProjects: async (idUser) => {
    try {
      const { data } = await axiosInstance.get(`/projects/user/${idUser}`);

      const leaderProjects = data.filter(
        (project) => project.membershipType === 'leader'
      );
      const memberProjects = data.filter(
        (project) => project.membershipType === 'member'
      );

      set({
        projectsData: data,
        leaderProjects,
        memberProjects,
      });
      if (get().selectedProject?._id) {
        const id = get().selectedProject?._id;
        if (id) {
          await get().selectedProjectById(id);
          await get().fetchTasksById(id);
        }
      } else if (data.length > 1) {
        set({ selectedProject: data[0] });
      }
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

      const updatedProjects = [...get().projectsData];
      const index = updatedProjects.findIndex((project) => project._id === id);
      if (index !== -1) {
        updatedProjects[index] = { ...updatedProjects[index], ...newProject };
      }

      const leaderProjects = updatedProjects.filter(
        (project) => project.membershipType === 'leader'
      );
      const memberProjects = updatedProjects.filter(
        (project) => project.membershipType === 'member'
      );

      set({
        projectsData: updatedProjects,
        leaderProjects,
        memberProjects,
      });
    } catch (error) {
      console.error('Error actualizando proyecto:', error);
    }
  },

  addProject: async (userId, newProject) => {
    try {
      const data = await axiosInstance.post(`/projects/${userId}`, newProject);
      await get().updateProjects(userId);
    } catch (error) {
      console.error('Error creando proyecto:', error);
    }
  },

  deleteProject: async (id) => {
    try {
      const data = await axiosInstance.delete(`/projects/${id}`);
      const updatedProjects = get().projectsData.filter(
        (project) => project._id !== id
      );
      const leaderProjects = updatedProjects.filter(
        (project) => project.membershipType === 'leader'
      );
      const memberProjects = updatedProjects.filter(
        (project) => project.membershipType === 'member'
      );

      set({
        projectsData: updatedProjects,
        leaderProjects,
        memberProjects,
      });
    } catch (error) {
      console.error('Error eliminando proyecto:', error);
    }
  },

  clearProjects: () => {
    set({
      projectsData: [],
      leaderProjects: [],
      memberProjects: [],
      selectedProject: undefined,
    });
  },
});
