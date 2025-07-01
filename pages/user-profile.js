import React, { useState, useEffect } from 'react';
import Sidebar from '../components/user-profile/Sidebar';
import ProfileSection from '../components/user-profile/ProfileSection';
import styles from '../styles/UserProfile.module.css';
import MyApplications from '../components/user-profile/MyApplications';
import useAuthCheck from "../hooks/useAuthCheck";
import { getUserProfile } from '../api/kycApi';
import { useRouter } from 'next/router';

const UserProfile = () => {
  useAuthCheck();
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [loanApplication, setLoanApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { tab } = router.query;

  useEffect(() => {
    if (tab === 'applications') {
      setActiveTab('applications');
    }
  }, [tab]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loanData = await getUserProfile();
        if (loanData) {
          setLoanApplication(loanData);
        }
      } catch (error) {
        console.error('Error fetching loan application data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={`col-md-9 col-lg-10 ${styles.mainContent}`}>
          {loading ? (
            <p>Loading...</p>
          ) : activeTab === 'profile' ? (
            <ProfileSection userData={userData} loanApplication={loanApplication} />
          ) : activeTab === 'applications' ? (
            <MyApplications loanApplication={loanApplication} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
