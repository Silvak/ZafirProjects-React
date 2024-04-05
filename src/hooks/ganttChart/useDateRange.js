import { useState, useEffect } from "react";

const useDateRange = (taskList, view) => {
  const [dateRange, setDateRange] = useState([]);

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const addWeeks = (date, weeks) => {
    const result = new Date(date);
    result.setDate(result.getDate() + weeks * 7);
    return result;
  };

  const addMonths = (date, months) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  };

  useEffect(() => {
    const minDate = taskList.reduce((min, task) => {
      const taskDate = new Date(task.date.start.replace(/-/g, "/"));
      return taskDate < min ? taskDate : min;
    }, new Date());

    const maxDate = taskList.reduce((max, task) => {
      const taskDate = new Date(task.date.end.replace(/-/g, "/"));
      return taskDate > max ? taskDate : max;
    }, new Date());

    const calculateDateRange = (startDate, endDate, typeView) => {
      const dateRange = [];
      let iterator = startDate;

      const addTime = {
        day: addDays,
        week: addWeeks,
        month: addMonths,
      }[typeView];

      while (iterator <= endDate) {
        dateRange.push(iterator);
        iterator = addTime(iterator, 1);
      }

      return dateRange;
    };

    const calculatedDateRange = calculateDateRange(minDate, maxDate, view);
    setDateRange(calculatedDateRange);
  }, [taskList, view]);

  return dateRange;
};

export default useDateRange;

/*
//  ORIGINAL CODE 

const minDate = taskList.reduce((min, task) => {
    const taskDate = new Date(task.date.start.replace(/-/g, "/"));
    return taskDate < min ? taskDate : min;
  }, new Date());

  const maxDate = taskList.reduce((max, task) => {
    const taskDate = new Date(task.date.end.replace(/-/g, "/"));
    return taskDate > max ? taskDate : max;
  }, new Date());

  const calculateDateRange = (startDate, endDate, typeView) => {
    const dateRange = [];
    let iterator = startDate;

    const addTime = {
      day: addDays,
      week: addWeeks,
      month: addMonths,
    }[typeView];

    while (iterator <= endDate) {
      dateRange.push(iterator);
      iterator = addTime(iterator, 1);
    }

    return dateRange;
  };

  let dataRange = calculateDateRange(minDate, maxDate, view);
  //console.log(format(dateRange[0].getTime(), "M-d-yyyy"));
*/
