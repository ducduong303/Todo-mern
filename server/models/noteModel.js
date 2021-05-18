const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    postByID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    user_id: {
        type: String,
        require: true
    },
    // name: {
    //     type: String,
    //     require: true
    // }
}, {
    timestamps: true
})

module.exports = mongoose.model("Notes", noteSchema)