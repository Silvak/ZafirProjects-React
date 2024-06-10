import { differenceInDays, addDays } from "date-fns";

// ----------------- Utility Functions TaskElement Component ----------------------
// Range
export const isTaskInRange = (view, date, taskStartDate, taskEndDate) => {
  switch (view) {
    case "day":
      return date >= taskStartDate && date <= taskEndDate;
    case "week":
      return (
        date >= addDays(taskStartDate, -taskStartDate.getDay()) &&
        date <= addDays(taskEndDate, 6 - taskEndDate.getDay())
      );
    case "month":
      return (
        date.getMonth() === taskStartDate.getMonth() &&
        date.getFullYear() === taskStartDate.getFullYear()
      );
    default:
      return false;
  }
};

// Calculate if the task start date is within the current view
export const isCurrentDateTaskStart = (view, date, taskStartDate) => {
  switch (view) {
    case "day":
      return differenceInDays(taskStartDate, date) === 0;
    case "week":
      return (
        date >= addDays(taskStartDate, -taskStartDate.getDay()) &&
        date <= addDays(taskStartDate, 6 - taskStartDate.getDay())
      );
    case "month":
      return (
        date.getMonth() === taskStartDate.getMonth() &&
        date.getFullYear() === taskStartDate.getFullYear()
      );
    default:
      return false;
  }
};
