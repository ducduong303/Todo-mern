require('dotenv').config();
const { connectDB } = require('../server/configs/connectDB');
connectDB()
const express = require('express');
const cors = require('cors');
const userRouter = require('../server/routes/userRouters');
const noteRouter = require('../server/routes/noteRouters');
const app = express()
app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.json({ "msg": "hello" })
})
app.use("/api/users", userRouter)
app.use("/api/notes", noteRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server Statr Success");
})

