const noteModel = require('../models/noteModel');


const noteCtrl = {
    getNotes: async (req, res) => {
        try {
            // populate "postByID" lấy các giá trị của thằng này ra , "_id username" chỉ lấy các trường này 
            // nếu không muốn lấy trường nào đó .select(-_id) tên trường hoặc nếu trong -_id username
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)
            const startIndex = (page - 1) * limit
            const endIndex = page * limit

            const search = req.query.key
            const regex = new RegExp(search, 'i');
            let notes;
            
            if(search){
                notes = await noteModel.find({
                    user_id: req.user.id,
                    // Xử lý search
                    title: regex
                })
                    .populate("postByID", " _id username")
                    .limit(limit)
                    .skip(startIndex).exec()
            }else{
                notes = await noteModel.find({
                    user_id: req.user.id,
                })
                    .populate("postByID", " _id username")
                    .limit(limit)
                    .skip(startIndex).exec()
            }
            
            const totalItem = await noteModel.find({ user_id: req.user.id }).populate("postByID", " _id username");

            const previous = startIndex > 0 ? page - 1 : null;
            const next = endIndex < totalItem ? page + 1 : null;
            res.json({
                notes,
                totalItem: totalItem.length,
            })



        } catch (error) {
            return res.status(500).json({ msg: error.messages })
        }
    },
    createNote: async (req, res) => {
        try {
            const { title, desc } = req.body
            const newNote = new noteModel({
                title,
                desc,
                postByID: req.user.id,
                user_id: req.user.id,
                // name: req.user.name
            })
            await newNote.save()
            res.json(newNote)
        } catch (error) {
            return res.status(500).json({ msg: error.messages })
        }
    },
    deleteNote: async (req, res) => {
        try {
            const { id } = req.params
            await noteModel.findByIdAndDelete(id);
            res.json({ msg: "Delete Thành công" })
        } catch (error) {
            return res.status(500).json({ msg: error.messages })
        }
    },
    updateNote: async (req, res) => {
        try {
            const { title, desc } = req.body;
            await noteModel.findByIdAndUpdate({ _id: req.params.id }, {
                title, desc
            })
            res.json({ msg: "Update Thành công" })
        } catch (error) {
            return res.status(500).json({ msg: error.messages })
        }
    },
    getNote: async (req, res) => {
        try {
            const note = await noteModel.findById(req.params.id)
            res.json(note)
        } catch (error) {
            return res.status(500).json({ msg: error.messages })
        }
    }
}

module.exports = noteCtrl