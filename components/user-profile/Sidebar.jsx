import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="col-md-3 col-lg-2 p-3 text-white" style={{ backgroundColor: '#1E3A8A', marginTop: '25px' }}>
      <div className="nav flex-column nav-pills">
        <button
          className={`nav-link text-white text-start w-100 ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
          style={{ fontSize: '15px' }}
        >
          <i className="bi bi-person-circle me-2"></i>
          Profile
        </button>
        <button
          className={`nav-link text-white text-start w-100 ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
          style={{ fontSize: '15px' }}
        >
          <i className="bi bi-folder2-open me-2"></i>
          My Applications
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
