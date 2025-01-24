
const UserModel = require('../models/userModal')
exports.findAll = async (req, res) => {
    try {
        const users = await UserModel.find();
        const user = new UserModel({
            name: req.body.email,
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};