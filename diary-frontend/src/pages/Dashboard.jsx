
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import DiaryCard from '../components/DiaryCard';

export default function Dashboard() {
  const [diaries, setDiaries] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

const fetchDiaries = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const res = await axios.get('http://localhost:5000/api/diary', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setDiaries(res.data);
    setError('');
  } catch (err) {
    console.error(err);
    setError('Failed to load diaries. Please try again.');
  }
};

useEffect(() => {
  fetchDiaries();
}, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/diary/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDiaries(diaries.filter(d => d._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="card">
      <div className="d-flex justify-between align-center">
        <h2>Your Diary Entries</h2>
        <Link to="/diary/new" className="btn btn-primary">
          Add Today's Details
        </Link>
      </div>

      {diaries.length === 0 ? (
  <p className="text-center mt-20">
    No entries yet. <Link to="/diary/new">Add your first one!</Link>
  </p>
) : (
  diaries.map(diary => (
    <DiaryCard key={diary._id} diary={diary} onDelete={handleDelete} />
  ))
)}
    </div>
  );
}