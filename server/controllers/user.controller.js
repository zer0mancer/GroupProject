const User = require('../models/user.model');

const UserController = {

    test: (request, response)=>{
        response.status(200).json({message: "Your user is actually a R E P L I C A N T"})
    },

    create: (response, request)=>{
        User.create(request.body)
            .then((newUser)=>{
                console.log(newUser)
                response.status(201).json({newUser})
            })
            .catch((err0r)=>{
                response.status(400).json({message: "User is not playable. They are an NPC", error: err0r})
            })
    },

    playerOne: (request, response)=>{
        User.find({_id:request.params.id})
            .then((user)=>{
                // console.log(user)
                response.status(200).json({user})
                response.status(200).json({message: "Ready Player One"})
            })
            .catch((error)=>{
                response.status(400).json({message: "Sorry but that Player cannot be found. You might need to download a patch.", error: error})
            })
    },

    allPlayers:(request, response)=>{
        User.find({})
            .then((players)=>{
                // response.status(200).json({message: "These are all of your players!"})
                response.status(200).json({players})
            })
            .catch((error)=>{
                response.status(400).json({message: "Your friends must be on a different server. We can't find any players", error: error})
            })
    },

    update:(request, response)=>{
        User.findByIdAndUpdate({_id:request.params.id}, request.body, {new:true, runValidators: true})
            .then((player)=>{
                // console.log(player)
                response.status(200).json({upgradePlayer: player})
            })
            .catch((error)=>{
                response.status(400).json({message: "You haven't gained enough EXP. Level up before trying to upgrade", error: error})
            })
    },

    delete: (request, response)=>{
        User.findByIdAndDelete({_id:request.params.id})
            .then((player)=>{
                console.log(player)
                response.status(200).json({message:"Player has been terminated", gameOver: player})
            })
            .catch((error)=>{
                response.status(400).json({message: "That player is using cheats and cannot be killed", error: error})
            })
    }
}

module.exports = UserController;