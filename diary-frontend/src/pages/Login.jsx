
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/users/login', form);
    localStorage.setItem('token', res.data.token);
    console.log('Login successful, token saved:', res.data.token);
    
    window.location.href = '/dashboard'; 
    
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed');
  }
};

  return (
    <div className="card" style={{ maxWidth: 400, margin: '50px auto' }}>
      <div className="text-center">
        <h1>FUCHSIUS</h1>
        <h2>Daily Diary System</h2>
      </div>
      <h3 className="text-center mt-20">Login</h3>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 20 }}>
          Login
        </button>
      </form>
      <p className="text-center mt-20">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}