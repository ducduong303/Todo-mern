const pagination = (model) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const results = {}

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        results.totalItem = await model.countDocuments().exec();
        try {
            results.result = await model.find({ user_id: req.user.id })
                .populate("postByID"," _id username")
                .limit(limit).skip(startIndex).exec()

            res.paginationResult = results
            next()
        } catch (error) {
            return res.status(500).json({ msg: error.messages })
        }
    }
}
module.exports = pagination