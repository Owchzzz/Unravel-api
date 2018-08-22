const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.use(require('../Middleware/authenticated'));

router.get("/",(req,res) => {

    const ThreadModel = mongoose.model("ThreadModel");
    
    ThreadModel.find({},(err, threads) => {
        res.json(threads);
    });
});


module.exports = router;