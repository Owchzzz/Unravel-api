const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

module.exports = (type,user_id) => {
    const UserModel = mongoose.model("UserModel");

    let points = 15;
    let message = 'Action';
    let trait = "";
    let title = "";
    switch(type) {
        case 'new-account':
            points = 100;
            message = "Welcome to unravel!";
            title = "Created new account";
            trait = "new";
            break;
        case 'challenge':
            points = 50;
            title = "Placed a challenge";
            message = "You have showcased your critical thinking skills by comming up with an excellent challenge";
            trait = "critical-thinking";
            break;

        case 'answered':
            points = 20;
            message = "You were able to answer the question correctly showcasing your amazing critical thinking skills!";
            trait = "critical-thinking";
            break;
        case 'player-answered':
            title= "Player was able to answer your challenge"
            points = 5;
            message = "A player answered your challenge, you're a very effective communicator";
            trait = "effective-communicator";
            break;
        
        case 'posted':
            title="Posted a thread"
            message = "When you show that you care about something, you are socially responsible";
            points = 10;
            trait="socially-responsible";
            break;
        case 'replied':
            title = "Replied to a message";
            message = "You showed that you care about the community, that's very socially responsible of you.";
            points = 5;
            trait = "socially-responsible";
            break;
        case 'recieve-reply':
            title="A player replied to your thread"
            message = "You can create engaging content that captures attention and promotes action. You are a very effective communicator";
            points = 2;
            trait = "effective-communicator";
            break;
        case 'maze':
            title = "Completed the maze"
            message = "You were able to complete the maze challenge! That means you are an excellent critical thinker";
            points = 10;
            trait = "critical-thinking"
            break;
        default:
            title="Activity";
            message = 'You were rewarded for playing the game actively!';
            points=5;
            trait = "socially-responsible";
            break;
    }

    let notif = {
        type: trait,
        status: 'ready',
        title,
        description: message,
        points: points
    };
    console.log("updating points for user:",user_id);
    if(!user_id) {
        return false;
    }

    let updateReward = (doc, notif) => {
        UserModel.findOneAndUpdate({_id:doc._id}, {$push:{notifications: notif}}, {upsert:true}, (err, res) => {
            if(!err) {
           
                UserModel.findOneAndUpdate({_id:doc._id},{$inc:{score: notif.points}}, {new:true},(err, endres) => {
                    console.log('Updated points',endres);
                    return doc;
                });
            }
            else {
                console.log(err);
            }
            
    
        }); 
    };
    UserModel.findOne({_id:ObjectID(user_id)}, (err, doc)=>{

        console.log('Reward generation found a user:',doc._id);
        
        if(doc.notifications.length == 0 || ! doc.notifications) {
            console.log('Notifications not yet defined');
            UserModel.findOneAndUpdate({_id:doc._id},{$set:{notifications:[]}},{new:true},(err, newdoc) => {
                console.log('Created notifications table for user');
                updateReward(newdoc,notif);
            });
        }
        else {
            updateReward(doc, notif);
        }
              
    });
   
}