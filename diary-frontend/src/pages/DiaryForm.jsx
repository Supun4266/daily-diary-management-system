
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const moods = ['Happy', 'Sad', 'Neutral', 'Excited', 'Calm', 'Anxious'];

export default function DiaryForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    description: '',
    mood: 'Happy'
  });

  useEffect(() => {
  if (isEdit) {
    const fetchDiary = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/diary`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const diary = res.data.find(d => d._id === id);
        if (diary) {
          setForm({
            date: new Date(diary.date).toISOString().split('T')[0],
            title: diary.title,
            description: diary.description,
            mood: diary.mood
          });
        } else {
          alert('Diary not found');
          navigate('/dashboard');
        }
      } catch (err) {
        console.error(err);
        alert('Failed to load diary');
      }
    };
    fetchDiary();
  }
}, [id, isEdit, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/diary/${id}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/diary', form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      navigate('/dashboard');
    } catch (err) {
      alert(isEdit ? 'Update failed' : 'Save failed');
    }
  };

  return (
    <div className="card">
      <h2>{isEdit ? 'Edit Entry' : 'Add Today\'s Details'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Date</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />

        <label>Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <label>Description</label>
        <textarea
          rows="5"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <label>Mood</label>
        <div className="d-flex gap-10" style={{ flexWrap: 'wrap' }}>
          {moods.map(mood => (
            <button
              key={mood}
              type="button"
              className={`mood-btn ${form.mood === mood ? 'selected' : ''}`}
              onClick={() => setForm({ ...form, mood })}
            >
              {mood}
            </button>
          ))}
        </div>

        <div className="d-flex gap-10 mt-20">
          <button type="submit" className="btn btn-primary">
            {isEdit ? 'Update' : 'Save'}
          </button>
          <button type="button" onClick={() => navigate('/dashboard')} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}