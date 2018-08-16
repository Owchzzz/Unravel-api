const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.use(require('../Middleware/authenticated'));

router.post('/update/items',(req, res) => {
    const UserModel = mongoose.model('UserModel');
    console.log(req.body);
    res.json({message:'successfully queried json with obj',items: req.user.items});
});


module.exports = router;