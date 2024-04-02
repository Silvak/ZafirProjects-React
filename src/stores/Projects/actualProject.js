import { axiosInstance } from "@/config/apiConfig";

export const actualProject = (set) => ({
  projectsData: [],
  selectedProject: undefined,
  fetchProjects: async () => {
    try {
      const { data } = await axiosInstance.get("/projects");
      set({ projectsData: data, selectedProject: data[0] });
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  },
  setSelectedProject: (project) => set({ selectedProject: project }),
  updateProjects: async () => {
    try {
      const { data } = await axiosInstance.get("/projects");
      set({ projectsData: data });
    } catch (error) {
      console.error("Error actualizando proyectos:", error);
    }
  },
  updateProject: async (id, newProject) => {
    try {
      const { data } = await axiosInstance.put(`/projects/${id}`, newProject);
      console.log("DATA", data);
    } catch (error) {
      console.error("Error actualizando proyecto:", error);
    }
  },
});
