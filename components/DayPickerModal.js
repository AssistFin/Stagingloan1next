import { useEffect, useRef } from "react";
import styles from "./DayPickerModal.module.css";

export default function DayPickerModal({ onSelect, onClose }) {
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <h4 className={styles.title}>Select Salary Date</h4>
        <div className={styles.dayGrid}>
          {days.map((day) => (
            <button
              key={day}
              onClick={() => {
                onSelect(day);
                onClose(); // Auto-close after selection
              }}
              className={styles.dayButton}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
