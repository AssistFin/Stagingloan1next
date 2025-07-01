// "use client"; // Ensure client-side rendering

// import { useEffect, useState } from "react";
// import './preloader.module.scss'; // Ensure this matches your CSS file path

// const Preloader = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const handleLoad = () => {
//       console.log("Page fully loaded (load event) - Hiding preloader");
//       setLoading(false);
//     };

//     const handleReadyStateChange = () => {
//       if (document.readyState === "complete") {
//         console.log("Page fully loaded (readyState) - Hiding preloader");
//         setLoading(false);
//       }
//     };

//     // Check if the page is already loaded
//     if (document.readyState === "complete") {
//       handleLoad();
//     } else {
//       window.addEventListener("load", handleLoad);
//       document.addEventListener("readystatechange", handleReadyStateChange);
//     }

//     // Clean up event listeners
//     return () => {
//       window.removeEventListener("load", handleLoad);
//       document.removeEventListener("readystatechange", handleReadyStateChange);
//     };
//   }, []);

//   console.log("Rendering Preloader - Loading state:", loading);

//   if (!loading) {
//     return null;
//   }

//   return (
//     <div className="preloader">
//       <div className="ring-loader">
//         <div className="ring right" />
//         <div className="ring left" />
//       </div>
//       <h2 style={{ fontFamily: '"Jost", sans-serif', fontSize: '24px', fontWeight: 600, color: '#1a4dbe', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Loading...</h2>
//     </div>
//   );
// };

// export default Preloader;

import { useEffect, useState } from "react";

const Preloader = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [isLoded, setIsLoded] = useState(null);

  useEffect(() => {
    window.addEventListener("load", () => {
      setIsLoded("loaded");
    });

    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    showLoader && (
      <div id="preloader" className={`preloader ${isLoded}`}>
        <div className="animation-preloader">
          <div className="spinner"></div>
          <p className="text-center mt-3">Loading</p>
        </div>
        <div className="loader">
          <div className="row">
            <div className="col-3 loader-section section-left">
              <div className="bg"></div>
            </div>
            <div className="col-3 loader-section section-left">
              <div className="bg"></div>
            </div>
            <div className="col-3 loader-section section-right">
              <div className="bg"></div>
            </div>
            <div className="col-3 loader-section section-right">
              <div className="bg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Preloader;


// "use client"; // Ensure client-side rendering

// import { useEffect, useState } from "react";
// import RingLoader from 'react-spinners/RingLoader';

// const Preloader = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000); // 2s for demo

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     loading && (
//       <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999999, transition: 'opacity 0.5s ease-out', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
//         <RingLoader color="#1a4dbe" size={80} speedMultiplier={1} />
//         <h2 style={{ fontFamily: '"Jost", sans-serif', fontSize: '24px', fontWeight: 600, color: '#1a4dbe', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Loading...</h2>
//       </div>
//     )
//   );
// };

// export default Preloader;

// import { useEffect, useState } from "react";

// const Preloader = () => {
//   const [showLoader, setShowLoader] = useState(true);
//   const [isLoded, setIsLoded] = useState(null);

//   useEffect(() => {
//     window.addEventListener("load", () => {
//       setIsLoded("loaded");
//     });

//     const timer = setTimeout(() => {
//       setShowLoader(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     showLoader && (
//       <div id="preloader" className={`preloader ${isLoded}`}>
//         <div className="animation-preloader">
//           <div className="spinner"></div>
//           <p className="text-center mt-3">Loading</p>
//         </div>
//         <div className="loader">
//           <div className="row">
//             <div className="col-3 loader-section section-left">
//               <div className="bg"></div>
//             </div>
//             <div className="col-3 loader-section section-left">
//               <div className="bg"></div>
//             </div>
//             <div className="col-3 loader-section section-right">
//               <div className="bg"></div>
//             </div>
//             <div className="col-3 loader-section section-right">
//               <div className="bg"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default Preloader;
