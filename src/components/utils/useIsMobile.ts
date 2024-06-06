/*
useIsMobile
@Author MD Mamun Miah <mamunahmed.m360ict@gmail.com>
*/
// import { useEffect, useState } from "react";

// const getIsMDMobile = () => window.innerWidth < 768;
// const getIsMobile = () => window.innerWidth <= 768;

// export default function useIsMobile() {
//   const [isMobile, setIsMobile] = useState(getIsMobile());

//   useEffect(() => {
//     const onResize = () => {
//       setIsMobile(getIsMobile());
//     };

//     window.addEventListener("resize", onResize);

//     return () => {
//       window.removeEventListener("resize", onResize);
//     };
//   }, []);

//   return isMobile;
// }

import { useEffect, useState } from "react";

const getIsMobile = () => window.innerWidth <= 768;
const getIsMDMobile = () => window.innerWidth < 768;

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getIsMobile());
  const [isMDMobile, setIsMDMobile] = useState(getIsMDMobile());

  useEffect(() => {
    const onResize = () => {
      const newIsMobile = getIsMobile();
      const newIsMDMobile = getIsMDMobile();
      setIsMobile(newIsMobile);
      setIsMDMobile(newIsMDMobile);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { isMobile, isMDMobile };
}
