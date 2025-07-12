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


const getWeekData = async (req, res) => {
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
                    _id: { week: { $week: "$date" } },
                    totalHours: { $sum: "$hours" },
                    projects: { $push: "$project" }
                }
            }
        ]);
        return res.status(200).json(monthlyData);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}






export { workEntry, getWeekData,monthlyData }