import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Force redirect
    navigate('/login');
    window.location.reload(); // Optional: force refresh
  };

  return (
    <nav className="d-flex justify-between align-center card" style={{ marginBottom: 0 }}>
      <h2>Daily Diary</h2>
      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
    </nav>
  );
}