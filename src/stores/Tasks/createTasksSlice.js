import { axiosInstance } from "../../config/apiConfig";

export const createTasksSlice = (set) => ({
  tasks: [],
  myTasks: [],
  addTask: async (taskData) => {
    try {
      console.log(taskData);
      const data = await axiosInstance.post(
        `/tasksList/660b037505e97aba86580b25`,
        taskData
      );
      console.log(taskData);
    } catch (error) {
      console.error("Error creating task", error);
    }
  },
  setTasks: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: status };
        }
        return task;
      }),
    })),
  removeTask: (taskIdToDelete) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskIdToDelete),
    })),

  updateTask: async (taskId, state, projectId) => {
    if (!taskId || state === undefined || state === null) {
      console.log("Faltan parametros");
      return;
    }
    try {
      const newData = {
        state,
      };
      const res = await axiosInstance.put(`/tasksList/${taskId}`, newData);
      if (res.status === 200) {
        createTasksSlice(set).fetchTasksById(projectId);
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  },

  fetchTasks: async () => {
    try {
      const { data } = await axiosInstance.get("/tasksList");
      set({ tasks: data });
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  },
  fetchTasksById: async (projectId) => {
    try {
      const { data } = await axiosInstance.get(`/tasksList/${projectId}`);
      set({ myTasks: data });
      console.log("desde el store:", data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  },
});
