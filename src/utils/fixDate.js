import moment from "moment";

export const fixDate = (dateStart, dateEnd) => {
  const fixStart = moment(dateStart).format("DD/MM/YYYY"),
    fixEnd = moment(dateEnd).format("DD/MM/YYYY");

  return { fixStart, fixEnd };
};
