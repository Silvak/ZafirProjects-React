import { axiosInstance } from '../../config/apiConfig';

export const createSubtasksSlice = (set) => ({
  subtasks: [],
  addSubtask: async (subTaskData, taskId) => {
    try {
      await axiosInstance.post(`/subtaks/${taskId}`, subTaskData);
    } catch (error) {
      console.error('Error creating subTask', error);
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

  updateSubtask: async (updateTask) => {
    try {
      const newSubTasks = await axiosInstance.put(
        `/subtaks/${updateTask._id}`,
        updateTask
      );
      set((state) => ({
        subtasks: state.subtasks.map((task) =>
          task._id === newSubTasks._id ? newSubTasks : task
        ),
      }));
      fetchSubtasks();
      return newSubTasks;
    } catch (error) {
      console.error('Error updating subTask', error);
    }
  },

  fetchSubtasks: async () => {
    try {
      const { data } = await axiosInstance.get('/subtaks');
      set({ subtasks: data });
    } catch (error) {
      console.error('Error fetching subtasks', error);
    }
  },

  fetchSubTasksById: async (taskId) => {
    try {
      const { data } = await axiosInstance.get(`/subtaks/task/${taskId}`);
      set({ subtasks: data });
    } catch (error) {
      console.error('Error fetching subtasks', error);
    }
  },
});
