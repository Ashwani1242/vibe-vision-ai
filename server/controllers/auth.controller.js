import jwt from "jsonwebtoken";
import { userModel } from "../models/auth.model.js";
import bcrypt from 'bcrypt'

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (user) {
            return res.status(409).json({
                message: "User already exists with this email",
                success: false
            })
        }

        const newUser = new userModel({ name, email, password })
        newUser.password = await bcrypt.hash(password, 10);

        await newUser.save();

        res.status(201).json({ message: 'Succesfully signed up.', success: true })
    } catch (err) {
        res.status(500).json({ message: err.message, success: false })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const errorMsg = "Auth failed. Email or Password is wrong.";
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            })
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )

        res.status(201).json({ message: 'Succesfully logged in.', success: true, jwtToken, email, name: user.name })
    } catch (err) {
        res.status(500).json({ message: err.message, success: false })
    }
}

export { signup, login }