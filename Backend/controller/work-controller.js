import Work from "../models/WorkEntry.js"

const workEntry = async (req, res) => {
    try {
        const { project, type, description, hours } = req.body;
        await Work.create({
            userId: req.userID,
            project, type, description, hours
        })
        res.status(201).json({
            message: "Registration successful",
        })
    } catch (error) {
        return res.status(500).json("internal server error")
    }
}

//helper
function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}


const currentWeekData = async (req, res) => {
    try {
        const today = new Date();
        const monday = getMonday(today);

        const entries = await Work.find({
            userId: req.userID,
            date: { $gte: monday, $lte: today }
        });
        // console.log("entries found:", entries);
        if (!entries || entries.length === 0) {
            return res.status(404).json({ message: "No entries found for this week." });
        }
        return res.status(200).json(entries);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const monthlyData = async (req, res) => {
    try {
        const monthlyData = await Work.aggregate([
            { $match: { userId: req.userID } },
            {
                $group: {
    _id: { week: { $isoWeek: "$date" } }, // Use ISO week
    totalHours: { $sum: "$hours" },
    projects: { $addToSet: "$project" }
  }
            },
            { $sort: { "_id.week": 1 } }
        ]);
        res.status(200).json(monthlyData);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const getWeekData = async (req, res) => {
    try {
        const { week, year } = req.query;

        // 1. Calculate the first day of the requested week
        const janFirst = new Date(`${year}-01-01`);
        const startOfYearWeek = getMonday(janFirst); // First Monday of the year
        const startOfWeek = new Date(startOfYearWeek);
        startOfWeek.setDate(startOfYearWeek.getDate() + (week - 1) * 7);

        // 2. Calculate end of week (Sunday)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999); // Include entire last day

        // 3. Fetch entries
        const entries = await Work.find({
            userId: req.userID,
            date: { $gte: startOfWeek, $lte: endOfWeek }
        });

        if (!entries?.length) {
            return res.status(404).json({ message: `No entries found for week ${week}, ${year}.` });
        }

        return res.status(200).json(entries);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};








export { workEntry, getWeekData, monthlyData,currentWeekData }