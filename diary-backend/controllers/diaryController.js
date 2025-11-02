const Diary = require('../models/diaryModel');
const jwt = require('jsonwebtoken');

const getUserId = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('No token provided');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.userId;
};

// GET all diaries
exports.getAllDiaries = async (req, res) => {
  try {
    const userId = getUserId(req);
    const diaries = await Diary.find({ userId }).sort({ date: -1 });
    res.json(diaries);
  } catch (err) {
    console.error('GET diaries error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// ADD diary
exports.addDiary = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { title, description, mood, date } = req.body;
    const newDiary = new Diary({
      userId,
      title,
      description,
      mood,
      date: date || Date.now()
    });
    await newDiary.save();
    res.json({ message: 'Diary added', diary: newDiary });
  } catch (err) {
    console.error('ADD diary error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE diary
exports.updateDiary = async (req, res) => {
  try {
    const userId = getUserId(req);
    const diary = await Diary.findOne({ _id: req.params.id, userId });
    if (!diary) return res.status(404).json({ message: 'Diary not found' });

    await Diary.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Diary updated' });
  } catch (err) {
    console.error('UPDATE error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE diary
exports.deleteDiary = async (req, res) => {
  try {
    const userId = getUserId(req);
    const diary = await Diary.findOneAndDelete({ _id: req.params.id, userId });
    if (!diary) return res.status(404).json({ message: 'Diary not found' });
    res.json({ message: 'Diary deleted' });
  } catch (err) {
    console.error('DELETE error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};