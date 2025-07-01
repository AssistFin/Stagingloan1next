import React from 'react';
import styles from '../../styles/DocumentList.module.css';

const DocumentList = ({ documents }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <h5 className={styles.cardTitle}>Uploaded Documents</h5>
          <div className={styles.grid}>
            {documents.map((doc) => (
              <div key={doc.id} className={styles.cardItem}>
                <div className={styles.cardBodyItem}>
                  <i className="bi bi-file-earmark-pdf h4 text-danger"></i>
                  <h6 className={styles.docName}>{doc.name}</h6>
                  <p className={styles.docType}>{doc.type}</p>
                  <p className={styles.uploadDate}>Uploaded: {doc.uploadDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentList;