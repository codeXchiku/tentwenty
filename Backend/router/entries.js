// 1. Add Work Entry (POST /api/entries)
// routes/entries.js
router.post('/', authMiddleware, async (req, res) => {
  const { project, type, description, hours } = req.body;
  const entry = new WorkEntry({
    userId: req.user._id,  // From JWT
    project, type, description, hours
  });
  await entry.save();
  res.send({ success: true });
});

//helper
function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun, 1=Mon, etc.
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
  return new Date(d.setDate(diff));
}

// Current Week Timesheet (GET /api/timesheet)
// routes/entries.js
router.get('/', authMiddleware, async (req, res) => {
  const today = new Date();
  const monday = getMonday(today); // Helper to find Monday of the week
  const entries = await WorkEntry.find({
    userId: req.user._id,
    date: { $gte: monday, $lte: today }
  });
  res.send(entries);
});

//Monthly Summary (GET /api/monthly)
router.get('/monthly', authMiddleware, async (req, res) => {
  const monthlyData = await WorkEntry.aggregate([
    { $match: { userId: req.user._id } },
    { $group: { 
        _id: { week: { $week: "$date" } },
        totalHours: { $sum: "$hours" },
        projects: { $push: "$project" }
    }}
  ]);
  res.send(monthlyData);
});