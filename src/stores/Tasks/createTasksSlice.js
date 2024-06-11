import { axiosInstance } from '../../config/apiConfig';

export const createTasksSlice = (set, get) => ({
  tasks: [],
  userTasks: [],
  singleTask: null,

  addTask: async (taskData, projectId) => {
    try {
      await axiosInstance.post(`/tasksList/project/${projectId}`, taskData);
    } catch (error) {
      console.error('Error creating task', error);
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
  removeTask: async (taskId) => {
    try {
      const taskDeleted = await axiosInstance.delete(`/tasksList/${taskId}`);
    } catch (error) {
      console.error('Error deleting task', error);
    }
    // set((state) => ({
    //   tasks: state.tasks.filter((task) => task.id !== taskIdToDelete),
    // }))
  },

  updateTask: async ({ taskId, newData, projectId }) => {
    // console.log('FROM SLICE', newData);
    try {
      const res = await axiosInstance.put(`/tasksList/${taskId}`, newData);
      if (res.status === 200) {
        await get().fetchTasksById(projectId);
      }
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
  fetchTasks: async () => {
    try {
      const { data } = await axiosInstance.get('/tasksList');
      set({ tasks: data });
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  },

  fetchTaskDetailsById: async (taskId, isSubtask) => {
    try {
      const { data } = await axiosInstance.get(`/tasksList/${taskId}`);
      set({ singleTask: data });
    } catch (error) {
      console.error('Error fetching task detail', error);
    }
    // try {
    //   let result = null;
    //   console.log(isSubtask);
    //   if (!isSubtask) {
    //     const { data } = await axiosInstance.get(`/tasksList/${taskId}`);
    //     result = { ...data };
    //   } else {
    //     console.log(isSubtask);
    //     const { data } = await axiosInstance.get(`/subtaks/${taskId}`);
    //     console.log(data);
    //     result = { ...data };
    //   }
    //   set({ singleTask: result });
    //   console.log(singleTask);
    // } catch (error) {
    //   console.error('Error fetching task detail', error);
    // }
  },
  fetchTasksByUser: async (userId) => {
    try {
      const { data } = await axiosInstance.get(`/tasksList/user/${userId}`);
      if (data) {
        set({ userTasks: data });
      }
      return data;
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  },
});
