// import { useState, useEffect } from 'react';

// export const useDebounce = (value: string, milliSeconds: number) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, milliSeconds);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, milliSeconds]);

//   return debouncedValue.trim();
// };

import { useState, useEffect } from "react";

export const useDebounce = (
  value: string,
  milliSeconds: number,
  callback: Function
) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback(debouncedValue); // Hit the API after 6 seconds of inactivity
    }, milliSeconds);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedValue, milliSeconds, callback]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, milliSeconds);

    return () => {
      clearTimeout(handler);
    };
  }, [value, milliSeconds]);

  return debouncedValue.trim();
};
