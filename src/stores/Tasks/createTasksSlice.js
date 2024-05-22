import { axiosInstance } from '../../config/apiConfig';

export const createTasksSlice = (set) => ({
  tasks: [],
  myTasks: [],
  customTasks: [],
  singleTask: null,

  addTask: async (taskData, projectId) => {
    try {
      const data = await axiosInstance.post(
        `/tasksList/project/${projectId}`,
        taskData
      );
      console.log(taskData, projectId);
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
  removeTask: (taskIdToDelete) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskIdToDelete),
    })),

  updateTask: async ({ taskId, newData, projectId }) => {
    console.log('FROM SLICE', newData);
    try {
      const res = await axiosInstance.put(`/tasksList/${taskId}`, newData);
      if (res.status === 200) {
        createTasksSlice(set).fetchTasksById(projectId);
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
  fetchTaskDetailsById: async (taskId) => {
    try {
      const { data } = await axiosInstance.get(`/tasksList/${taskId}`);
      set({ singleTask: data });
    } catch (error) {
      console.error('Error fetching task detail', error);
    }
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
  fetchTasksByIdCustom: async (projectId) => {
    try {
      const { data } = await axiosInstance.get(`/tasksList/${projectId}`);
      set({ customTasks: data });
      // console.log("desde el store:", data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  },
});
