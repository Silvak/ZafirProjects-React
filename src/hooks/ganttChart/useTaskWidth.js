import { useState, useEffect } from "react";
import {
  differenceInDays,
  addDays,
  differenceInCalendarDays,
  differenceInMonths,
  getDaysInMonth,
  format,
  startOfMonth,
  endOfMonth,
} from "date-fns";

function useTaskWidth(view, date, taskStartDate, taskEndDate, dateRange) {
  const taskDurationInDays =
    Math.floor((taskEndDate - taskStartDate) / (1000 * 60 * 60 * 24)) + 1;

  if (view === "day") {
    return { width: taskDurationInDays * 100, left: 0 }; // Ancho fijo para la vista de día
  } else if (view === "week") {
    // Devolver el porcentaje total del ancho de la tarea
    const taskWidthPercentage = (taskDurationInDays / 7).toFixed(2) * 100;
    const taskLeft =
      differenceInDays(taskStartDate, date) * (100 / dateRange.length);
    return { width: taskWidthPercentage, left: taskLeft };
  } else if (view === "month") {
    // Calcular el número de meses entre las fechas
    const monthsRange = differenceInMonths(taskEndDate, taskStartDate) + 1;

    // Si la tarea dura menos de un mes, devolver el porcentaje correspondiente
    if (monthsRange === 1) {
      const taskWidthPercentage = (
        (taskDurationInDays / getDaysInMonth(taskStartDate)) *
        100
      ).toFixed(2);

      const daysFromStartOfMonth = differenceInDays(
        taskStartDate,
        startOfMonth(taskStartDate)
      );
      const taskLeftPercentage =
        (daysFromStartOfMonth / getDaysInMonth(taskStartDate)) * 100;

      return {
        width: taskWidthPercentage,
        left: taskLeftPercentage.toFixed(2),
      };
    }

    // Calcular la fracción del primer mes
    const startMonthDays =
      differenceInCalendarDays(endOfMonth(taskStartDate), taskStartDate) + 1;
    const startMonthFraction = startMonthDays / getDaysInMonth(taskStartDate);

    // Calcular la fracción del último mes
    const endMonthDays =
      differenceInCalendarDays(taskEndDate, startOfMonth(taskEndDate)) + 1;
    const endMonthFraction = endMonthDays / getDaysInMonth(taskEndDate);

    // Calcular el total de fracción de meses
    const totalFraction =
      startMonthFraction + (monthsRange - 2) + endMonthFraction;

    const taskWidthPercentage = (totalFraction * 100).toFixed(2);

    const daysFromStartOfMonth = differenceInDays(
      taskStartDate,
      startOfMonth(taskStartDate)
    );
    const taskLeftPercentage =
      (daysFromStartOfMonth / getDaysInMonth(taskStartDate)) * 100;

    return { width: taskWidthPercentage, left: taskLeftPercentage };
  }
}

export default useTaskWidth;

/*
//  ORIGINAL CODE 

const calculateTaskWidth = (
  view,
  date,
  taskStartDate,
  taskEndDate,
  dateRange
) => {
  const taskDurationInDays =
    Math.floor((taskEndDate - taskStartDate) / (1000 * 60 * 60 * 24)) + 1;

  if (view === "day") {
    return { width: taskDurationInDays * 100, left: 0 }; // Ancho fijo para la vista de día
  } else if (view === "week") {
    // Devolver el porcentaje total del ancho de la tarea
    const taskWidthPercentage = (taskDurationInDays / 7).toFixed(2) * 100;
    const taskLeft =
      differenceInDays(taskStartDate, date) * (100 / dateRange.length);
    return { width: taskWidthPercentage, left: taskLeft };
  } else if (view === "month") {
    // Calcular el número de meses entre las fechas
    const monthsRange = differenceInMonths(taskEndDate, taskStartDate) + 1;

    // Si la tarea dura menos de un mes, devolver el porcentaje correspondiente
    if (monthsRange === 1) {
      const taskWidthPercentage = (
        (taskDurationInDays / getDaysInMonth(taskStartDate)) *
        100
      ).toFixed(2);

      const daysFromStartOfMonth = differenceInDays(
        taskStartDate,
        startOfMonth(taskStartDate)
      );
      const taskLeftPercentage =
        (daysFromStartOfMonth / getDaysInMonth(taskStartDate)) * 100;

      return {
        width: taskWidthPercentage,
        left: taskLeftPercentage.toFixed(2),
      };
    }

    // Calcular la fracción del primer mes
    const startMonthDays =
      differenceInCalendarDays(endOfMonth(taskStartDate), taskStartDate) + 1;
    const startMonthFraction = startMonthDays / getDaysInMonth(taskStartDate);

    // Calcular la fracción del último mes
    const endMonthDays =
      differenceInCalendarDays(taskEndDate, startOfMonth(taskEndDate)) + 1;
    const endMonthFraction = endMonthDays / getDaysInMonth(taskEndDate);

    // Calcular el total de fracción de meses
    const totalFraction =
      startMonthFraction + (monthsRange - 2) + endMonthFraction;

    const taskWidthPercentage = (totalFraction * 100).toFixed(2);

    const daysFromStartOfMonth = differenceInDays(
      taskStartDate,
      startOfMonth(taskStartDate)
    );
    const taskLeftPercentage =
      (daysFromStartOfMonth / getDaysInMonth(taskStartDate)) * 100;

    return { width: taskWidthPercentage, left: taskLeftPercentage };
  }
};*/
