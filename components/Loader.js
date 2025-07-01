// components/Loader.js
import React from 'react';
import styles from './Loader.module.css'; // Create styles for the loader component

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
