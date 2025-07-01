import React from 'react';
import styles from '../../styles/ProfileSection.module.css';

const ProfileSection = ({ loanApplication }) => {
  console.log("loanApplication", loanApplication);

  if (!loanApplication || !loanApplication.data || !loanApplication.data.user) {
    return <p>Loading profile details...</p>;
  }

  const { user } = loanApplication.data;

  const fields = [
    { label: 'First Name', value: user.firstname },
    { label: 'Last Name', value: user.lastname },
    { label: 'Email', value: user.email },
    { label: 'Mobile', value: user.mobile },
    { label: 'PAN', value: user.pan },
    { label: 'Date of Birth', value: user.date_of_birth },
    { label: 'Aadhaar Number', value: user.aadhaar_number },
  ];

  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>Profile Information</h3>
      </div>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <h5 className={styles.cardTitle}>User Information</h5>
          <div className={styles.grid}>
            {fields.map((field) => (
              <div key={field.label} className={styles.inputGroup}>
                <label className={styles.label}>{field.label}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={field.value || '-'}
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
