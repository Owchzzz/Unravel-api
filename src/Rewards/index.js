const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

module.exports = (type,user_id) => {
    const UserModel = mongoose.model("UserModel");

    let points = 15;
    let message = 'Action';
    let trait = "";
    switch(type) {
        case 'challenge':
            points = 50;
            message = "You placed a challenge";
            trait = "effecive-communicator";
            break;
            
        case 'answered':
            points = 20;
            message = "You were able to answer the question correctly";
            trait = "critical-thinking";
            break;
        case 'player-answered':
            points = 5;
            message = "A player answered your challenge";
            trait = "effective-communicator";
            break;
        
        case 'posted':
            message = "You posted a thread!";
            points = 10;
            trait="socially-responsible";
            break;
        case 'replied':
            message = "You replied to a message!";
            points = 5;
            trait = "socially-responsible";
            break;
        case 'recieve-reply':
            message = "A player replied to your thread";
            points = 2;
            trait = "effective-communicator";
        case 'maze':
            message = "You completed the maze";
            points = 10;
            trait = "critical-thinking"
            break;
        default:
            message = 'You were rewarded for playing the game actively!';
            point = "socially-responsible";
            break;
    }


    let formatTitle = (x) => {
        switch (x) {
            
        }
    };



    let notif = {
        type: trait,
        status: 'ready',
        title: formatTitle(trait),
        description: message,
        points: points
    }

    UserModel.update({_id:user_id}, {$push:{notifications: notif}}, (err, doc) => {
        UserModel.update({_id:user_id},{$inc:{points: notif.points}},(err, doc) => {
            console.log('Updated points');
            console.log(doc);
            return doc;
        });

    });
}