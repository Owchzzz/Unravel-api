const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.use(require('../Middleware/authenticated'));

router.post('/update/items',(req, res) => {
    const UserModel = mongoose.model('UserModel');
    res.json({message:'successfully queried json with obj',req});
});


module.exports = router;