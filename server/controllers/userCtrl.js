
const UsersModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userCtrl = {
    registerUser: async (req, res) => {
        try {
            const { username, email, password } = req.body
            const user = await UsersModel.findOne({ email: email })
            if (user) {
                return res.status(400).json({ msg: "Email đã tồn tại" })
            }
            // Mã hóa password
            const hashPassword = await bcrypt.hash(password, 12)
            const newUser = new UsersModel({
                username,
                email,
                password: hashPassword
            })
            // lưu vào DB
            await newUser.save()
            res.json({ msg: "Register Success" })

        } catch (error) {
            return res.status(500).json({ msg: error.messages })
        }

    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body


            // Tìm Email xem có trong db chưa
            const user = await UsersModel.findOne({ email: email })
            if (!user) {
                return res.status(400).json({ msg: "Email không tồn tại" })
            }
            // So sánh password
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ msg: "Mật khẩu không chính xác" })
            }
            // Nếu đúng Tạo token
            const payload = { id: user._id, name: user.username }
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" })

            res.json({ token })

        } catch (error) {
            return res.status(500).json({ msg: error.messages })
        }
    },
    verifiedToken: async (req, res) => {
        try {
            const token = req.header("Authorization")
            if (!token) return res.send({ status: false })

            jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
                if (err) return res.send({ status: false })
                // console.log("verified", verified);
                const user = await UsersModel.findById(verified.id).select("-password")
                if (!user) return res.send({ status: false })

                return res.send({
                    status: true,
                    user
                })
            })

        } catch (error) {
            return res.status(500).json({ msg: error.messages })
        }
    }
}

module.exports = userCtrl