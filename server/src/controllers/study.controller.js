const StudySession = require("../models/StudySession");

// ➕ Add Study Hours
exports.addStudy = async (req, res) => {
  try {
    const { userId, hours } = req.body;
    const today = new Date().toISOString().split("T")[0];

    let session = await StudySession.findOne({ userId, date: today });

    if (session) {
      session.hours += hours;
    } else {
      session = new StudySession({ userId, date: today, hours });
    }

    await session.save();
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📊 Weekly Data
exports.getWeekly = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await StudySession.find({ userId });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};