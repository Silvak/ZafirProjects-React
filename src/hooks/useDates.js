// Define una función para determinar si una fecha está dentro de la semana actual
export const isInThisWeek = (date) => {
  const currentDate = new Date();
  const today = currentDate.getDay();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - today);
  const endOfWeek = new Date(currentDate);
  endOfWeek.setDate(currentDate.getDate() + (6 - today));
  return date >= startOfWeek && date <= endOfWeek;
};

// Define una función para determinar si una fecha está dentro del mes actual
export const isInThisMonth = (date) => {
  const today = new Date();
  return (
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// Define una función para determinar si una fecha es hoy
export const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};
