import { format } from "date-fns";
import { useEffect, useState } from "react";

function useDate() {
  //updated date
  const [date, setDate] = useState(new Date());

  //constant date
  const constDate = format(new Date(), "M/dd/yyyy");
  const constTime = format(new Date(), "h:mm a");

  //use effect to update the date
  useEffect(() => {
    const id = setInterval(() => setDate(new Date()), 1000);
    () => clearInterval(id);
  }, [date]);

  //format : for information visit date-fns documantation
  const formattedDate = format(date, "M/dd/yyyy");
  const formattedTime = format(date, "h:mm a");

  return { formattedDate, formattedTime, constDate, constTime };
}

export { useDate };
