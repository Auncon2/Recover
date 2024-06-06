import { useState, useEffect } from "react";
const GlobalClock = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const hours = currentDateTime.getHours();
  const minutes = currentDateTime.getMinutes();
  const seconds = currentDateTime.getSeconds();
  const amPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return (
    <div className="flex gap-4 text-[#0C999A]">
      <p className="font-semibold ">
        {String(formattedHours).padStart(2, "0")} : {""}
        {String(minutes).padStart(2, "0")} : {String(seconds).padStart(2, "0")}
        {"  "}
        {amPm}
      </p>
      <p className="font-semibold"> {currentDateTime.toDateString()}</p>
    </div>
  );
};

export default GlobalClock;
