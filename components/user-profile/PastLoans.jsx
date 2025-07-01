import React from 'react';
import styles from '../../styles/PastLoans.module.css';

const PastLoans = ({ loans }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Past Loans</h3>
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Loan ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr key={loan.id}>
                    <td>{loan.id}</td>
                    <td>{loan.type}</td>
                    <td>₹{loan.amount}</td>
                    <td>
                      <span
                        className={`${styles.badge} ${
                          loan.status === 'Closed' ? styles.success : styles.warning
                        }`}
                      >
                        {loan.status}
                      </span>
                    </td>
                    <td>{loan.startDate}</td>
                    <td>{loan.endDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastLoans;