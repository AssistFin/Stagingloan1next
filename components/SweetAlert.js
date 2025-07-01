import { useEffect } from "react";
import Swal from "sweetalert2";

const SweetAlert = ({ type, title, message, onClose }) => {
  useEffect(() => {
    if (message) {
      Swal.fire({
        title: title || "Notification",
        text: message,
        icon: type || "info",
        confirmButtonText: "OK",
      }).then(() => {
        onClose && onClose(); 
      });
    }
  }, [message, title, type, onClose]); 

  return null;
};

export default SweetAlert;
