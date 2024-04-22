import { axiosInstance } from "../../config/apiConfig";

export const createSubtasksSlice = (set) => ({
  subtasks: [],
  //   myTasks: [],
  addSubtask: async (taskData) => {
    try {
      const data = await axiosInstance.post(
        `/subtaks/${taskData.taskId}`,
        taskData
      );
      alert("subTask creada");
    } catch (error) {
      console.error("Error creating subTask", error);
    }
  },
  setSubtasks: (id, status) =>
    set((state) => ({
      subtasks: state.subtasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: status };
        }
        return task;
      }),
    })),
  removeSubtask: (taskIdToDelete) =>
    set((state) => ({
      subtasks: state.subtasks.filter((task) => task.id !== taskIdToDelete),
    })),
  updateSubtask: (updateTask) =>
    set((state) => ({
      subtasks: state.subtasks.map((task) =>
        task.id === updateTask.id ? updateTask : task
      ),
    })),
  fetchSubtasks: async () => {
    try {
      const { data } = await axiosInstance.get("/subtaks");
      set({ subtasks: data });
    } catch (error) {
      console.error("Error fetching subtasks", error);
    }
  },
  //   fetchTasksById: async (projectId) => {
  //     try {
  //       const { data } = await axiosInstance.get(`/subtaks/${projectId}`);
  //       set({ subtasks: data });
  //     } catch (error) {
  //       console.error("Error fetching subtasks", error);
  //     }
  //   },
});
