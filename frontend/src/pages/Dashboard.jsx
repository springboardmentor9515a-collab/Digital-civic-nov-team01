import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome, {user?.name}!</h1>
      <p>Role: <strong>{user?.role}</strong> | Location: {user?.location}</p>
      
      <hr />
      
      {user?.role === 'official' ? (
        <div style={{ backgroundColor: '#e3f2fd', padding: '15px' }}>
          <h3>🏛 Public Official Panel</h3>
          <p>You can view local issues and respond to petitions.</p>
          <button>View Reports</button>
        </div>
      ) : (
        <div style={{ backgroundColor: '#fff3e0', padding: '15px' }}>
          <h3>📢 Citizen Panel</h3>
          <p>Create a petition or vote on polls in your area.</p>
          <button>Create Petition</button>
        </div>
      )}

      <br />
      <button onClick={logout} style={{ backgroundColor: 'red', color: 'white' }}>Logout</button>
    </div>
  );
};

export default Dashboard;

