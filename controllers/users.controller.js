const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
    const allUsers = await userModel.find({});
    return res.status(200).json({ 'status': 'success', 'data': allUsers })
}

const Register = async (req, res) => {

    try {
        if (!await userModel.find({ "email": req.body.email }))
            res.status(403).json("Email already exists");

        const newUser = req.body;
        newUser.password = await bcrypt.hash(newUser.password, 10)
        await userModel.insertOne({ "email": newUser.email, "password": newUser.password, "role": newUser.role });

        res.status(200).json({ "status": "success", "data": newUser }, { password: false });
    } catch (error) {
        res.status(500).json("User not registered");
    }

}

const Login = async (req, res) => {
    const creds = req.body;
    try {
        if (creds.email == '' || creds.password == '')
            return res.json("email and password can't be empty");

        const user = await userModel.findOne({ email: creds.email });

        const isPasswordCorrect = await bcrypt.compare(creds.password, user.password)

        if (!isPasswordCorrect)
            return res.json("email or password invalid");

        user.token = jwt.sign({ email: user.email, password: user.password, role: user.role }, process.env.JWT_PRIVATE_KEY, { expiresIn: '5m' });

        res.status(200).json({ status: "success", user }, { password: false });

    } catch (error) {
        res.status(500).json("Error happened!!!! this if from catch block");
    }
}

module.exports = {
    getAllUsers,
    Register,
    Login
}