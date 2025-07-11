import { useEffect, useRef } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";

const ScrollToTop = () => {
  const scrollTop = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTop.current) {
        if (window.scrollY > 200) {
          scrollTop.current.classList.add("active");
        } else {
          scrollTop.current.classList.remove("active");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={scrollTop} className="scrollToTop" onClick={scrollToTop}>
      <FaAngleDoubleUp />
    </div>
  );
};

export default ScrollToTop;


//26feb2025

// import Link from "next/link";
// import { useEffect, useRef } from "react";
// import { FaAngleDoubleUp } from "react-icons/fa";

// const ScrollToTop = () => {
//   const scrollTop = useRef();

//   useEffect(() => {
//     window.scroll({
//       top: 0,
//       left: 0,
//     });
//   });

//   useEffect(() => {
//     window.addEventListener("scroll", () => {
//       if (window.scrollY > 200) {
//         scrollTop.current.classList.add("active");
//       } else {
//         scrollTop.current.classList.remove("active");
//       }
//     });
//   }, []);

//   return (
//     <Link href="#gotoTop" className="scrollToTop" ref={scrollTop}>
//       <i>
//         <FaAngleDoubleUp />
//       </i>
//     </Link>
//   );
// };

// export default ScrollToTop;




//new updated code on 20-1-2025 by Saurav Swaraj

// import Link from "next/link";
// import { useEffect, useRef } from "react";
// import { FaAngleDoubleUp } from "react-icons/fa";

// const ScrollToTop = () => {
//   const scrollTop = useRef(null);

//   useEffect(() => {
//     window.scroll({
//       top: 0,
//       left: 0,
//     });
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (scrollTop.current) {
//         if (window.scrollY > 200) {
//           scrollTop.current.classList.add("active");
//         } else {
//           scrollTop.current.classList.remove("active");
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div ref={scrollTop} className="scrollToTop">
//       <Link href="#gotoTop" legacyBehavior>
//         <a>
//           <FaAngleDoubleUp />
//         </a>
//       </Link>
//     </div>
//   );
// };

// export default ScrollToTop;
