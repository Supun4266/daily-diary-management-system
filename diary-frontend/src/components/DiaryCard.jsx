// src/components/DiaryCard.jsx
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function DiaryCard({ diary, onDelete }) {
  return (
    <div className="diary-card">
      <h3>{diary.title}</h3>
      <p><strong>Date:</strong> {format(new Date(diary.date), 'MMM dd, yyyy')}</p>
      <p><strong>Mood:</strong> {diary.mood}</p>
      <p>{diary.description.substring(0, 100)}{diary.description.length > 100 ? '...' : ''}</p>
      <div className="diary-actions">
        <Link to={`/diary/edit/${diary._id}`} className="btn btn-secondary">
          Edit
        </Link>
        <button onClick={() => onDelete(diary._id)} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
}