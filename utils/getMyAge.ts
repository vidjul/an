import { differenceInYears } from "date-fns";

export const getMyAge = () => {
  const birthDate = new Date(1996, 4, 6);
  const currentDate = new Date();

  return differenceInYears(currentDate, birthDate);
};
