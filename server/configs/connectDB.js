const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGOODB_URL, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })
        console.log("Connect DB success");

    } catch (error) {
        console.log(error);
        process.exit(1)
        
    }
}
module.exports = { connectDB }