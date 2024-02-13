import { mockTasks } from "../../mockData/taskData";

export const createTasksSlice = (set) => ({
  tasks: mockTasks,
  addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
  removeTask: (taskIdToDelete) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskIdToDelete),
    })),
  updateTask: (updateTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updateTask.id ? updateTask : task
      ),
    })),
});
