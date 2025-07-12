import User from "../models/user-model.js";
import Contact from "../models/contact-model.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        console.log(users);

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" })
        }
        return res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);

        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No contacts found" })
        }
        return res.status(200).json(contacts)

    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        res.status(200).json({ message: "user deleted successfully" });

    } catch (error) {
        next(error);
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const userData = await User.findOne({ _id: id }, { password: 0 })
        return res.status(200).json( userData )

    } catch (error) {
        next(error)
    }
}

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;

        const updatedData = await User.updateOne({ _id: id },
            {
                $set : updatedUserData,
            }
        );
        return res.status(200).json(updatedData)
    } catch (error) {
        next(error)
    }
}

export { getAllUsers, getAllContacts, deleteUser, getUserById,updateUserById };