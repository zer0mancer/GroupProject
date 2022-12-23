const User = require('../models/user.model');
require ('dotenv').config();
const jwt = require('jsonwebtoken');
const secretCode = process.env.SECRET_KEY;
const bcrypt = require('bcrypt');

const UserController = {

    test: (request, response)=>{
        response.status(200).json({message: "Your user is actually a R E P L I C A N T"})
    },

    create: (request, response)=>{
        User.create(request.body)
            .then((newUser)=>{
                const userToken = jwt.sign({
                    id: newUser._id
                }, secretCode)
                console.log(newUser)
                response.status(201).cookie("userToken", userToken,     {httpOnly: true}).json({message: "user created with token", user: newUser, token: userToken})
            })
            .catch((err0r)=>{
                response.status(400).json({message: "User is not playable. They are an NPC", error: err0r})
            })
    },

    // CHANGED TO FINDONE AND MOVED MESSAGE TO OBJ INSIDE OF FIRST RESPONSE
    playerOne: (request, response)=>{
        User.findOne({_id:request.params.id})
            .then((singleUser)=>{
                // console.log(user)
                response.status(200).json({user:singleUser, message: "Ready Player One"})
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
        User.findByIdAndUpdate({_id:request.params.id},request.body,{new:true, runValidators:true})
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
    },

    login: async(request, response)=>{
        const existingUser = await User.findOne({email: request.body.email});
            if(existingUser === null){
                return response.status(400).json({error: "That user does not exist"});
            }
            // compare first the input to the existing user's password. We don't throw in User since we already grabbed it.
            const correctPassword = await bcrypt.compare(request.body.password, existingUser.password);

            if(!correctPassword){
                return response.status(400).json({error: "That password doesn't seem quite right, try again"});
            }
            const userToken = jwt.sign({
                id: existingUser._id
            }, secretCode);
            response.cookie("userToken", userToken,
                {httpOnly: true}
                ).json({message: "Level Passed!", user: existingUser, token: userToken});
    },
    
    logout: (request, response)=>{
        response.clearCookie('userToken');
        // This does status(200) on server side AS WELL as thumbs up on client side.
        response.sendStatus(200);
    }

}

module.exports = UserController;