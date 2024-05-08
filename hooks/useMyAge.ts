import { useEffect, useState } from "react";
import { differenceInYears } from "date-fns";

export const useMyAge = () => {
  const [myAge, setMyAge] = useState<string>("...");
  useEffect(() => {
    const birthDate = new Date(1996, 4, 6);
    const currentDate = new Date();

    const age = differenceInYears(currentDate, birthDate);

    setMyAge(age.toString());
  }, []);

  return myAge;
};
