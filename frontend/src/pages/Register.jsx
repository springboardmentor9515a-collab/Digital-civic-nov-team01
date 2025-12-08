import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'; // <--- 1. Import useNavigate

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'citizen', location: ''
  });
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate(); // <--- 2. Initialize it

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData); 
      // <--- 3. Redirect to Dashboard on success
      navigate('/dashboard'); 
      
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration Failed');
    }
  };

  return (
    <div className="auth-container" style={{ padding: '20px' }}>
      <h2>Create Civix Account</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" placeholder="Full Name" required 
          onChange={e => setFormData({...formData, name: e.target.value})} 
        /><br/>
        <input 
          type="email" placeholder="Email" required 
          onChange={e => setFormData({...formData, email: e.target.value})} 
        /><br/>
        <input 
          type="password" placeholder="Password" required 
          onChange={e => setFormData({...formData, password: e.target.value})} 
        /><br/>
        
        <select onChange={e => setFormData({...formData, role: e.target.value})}>
          <option value="citizen">Citizen</option>
          <option value="official">Public Official</option>
        </select><br/>
        
        <input 
          type="text" placeholder="Location" required 
          onChange={e => setFormData({...formData, location: e.target.value})} 
        /><br/>
        
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default Register;