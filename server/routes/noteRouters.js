const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth');
const noteCtrl = require('../controllers/noteCtrl');

router.get("/", auth, noteCtrl.getNotes)

router.post("/", auth, noteCtrl.createNote)

router.delete("/:id", auth, noteCtrl.deleteNote)

router.put("/:id", auth, noteCtrl.updateNote)

router.get("/:id", auth, noteCtrl.getNote)


module.exports = router