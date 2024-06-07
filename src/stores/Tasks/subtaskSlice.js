import { axiosInstance } from '../../config/apiConfig';

export const createSubtasksSlice = (set, get) => ({
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
  // removeSubtask: (taskIdToDelete) =>
  //   set((state) => ({
  //     subtasks: state.subtasks.filter((task) => task.id !== taskIdToDelete),
  //   })),
  removeSubtask: async (subTaskId) => {
    try {
      // Obtener el estado actual de las subtasks utilizando un getter
      const { data } = await axiosInstance.delete(`/subtaks/${subTaskId}`);
      if (data) {
        const deletedSubTaskId = data._id;
        if (deletedSubTaskId) {
          const newSubtasks = await get().fetchSubtasksById(deletedSubTaskId);
          return newSubtasks;
        }
      }
    } catch (error) {
      console.error('Error deleting task', error);
    }
  },
  updateSubtask: async (updateTask) => {
    try {
      console.log(updateTask);
      await axiosInstance.put(`/subtaks/${updateTask._id}`, updateTask);
      const updatedTasks = await get().fetchSubtasksById(updateTask.taskId);
      return updatedTasks;
    } catch (error) {
      console.error('Error updating subTask', error);
    }
  },

  // fetchSubtasks: async () => {
  //   try {
  //     const { data } = await axiosInstance.get('/subtaks');
  //     console.log('data de subtasks:', data);
  //     set({ subtasks: data });
  //   } catch (error) {
  //     console.error('Error fetching subtasks', error);
  //   }
  // },

  fetchSubtasksById: async (taskId) => {
    try {
      const { data } = await axiosInstance.get(`/subtaks/task/${taskId}`);
      await set({ subtasks: data });
      const updatedSubtasks = await get().subtasks;
      return updatedSubtasks;
    } catch (error) {
      console.error('Error fetching subtasks', error);
    }
  },
});
