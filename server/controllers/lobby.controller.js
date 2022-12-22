const Lobby = require('../models/lobby.model');

const LobbyController = {

    test: (request, response)=>{
        response.status(200).json({message: "Your Lobby is full of bots."})
    },

    create: (request, response)=>{
        Lobby.create(request.body)
            .then((server)=>{
                console.log(server)
                response.status(201).json({server})
            })
            .catch((err0r)=>{
                response.status(400).json({message: "Cannot host server. Is your internet down?", error: err0r})
            })
    },

    oneLobby: (request, response)=>{
        Lobby.findOne({_id:request.params.id})
            .then((server)=>{
                // console.log(server)
                response.status(200).json({server:server,message: "Lobby Located"})
            })
            .catch((error)=>{
                response.status(400).json({message: "Are you sure your friends said to meet you here? It doesn't exist.",error:error})
            })
    },

    allLobbies:(request, response)=>{
        Lobby.find({})
            .then((servers)=>{
                // response.status(200).json({message: "These are all of your servers!"})
                response.status(200).json({servers})
            })
            .catch((error)=>{
                response.status(400).json({message: "Are you sure you're connected to the internet? There are no Lobbies.", error: error})
            })
    },

    update:(request, response)=>{
        Lobby.findByIdAndUpdate({_id:request.params.id},request.body,{new:true, runValidators:true})
            .then((lobby)=>{
                // console.log(lobby)
                response.status(200).json({upgradeLobby:lobby})
            })
            .catch((error)=>{
                response.status(400).json({message: "You're being bottle-necked. Upgrade your PC before trying to upgrade your Lobby again.", error: error})
            })
    },

    delete: (request, response)=>{
        Lobby.findByIdAndDelete({_id:request.params.id})
            .then((server)=>{
                console.log(server)
                response.status(200).json({message:"HACK THE PLANET",shutDown: server})
            })
            .catch((error)=>{
                response.status(400).json({message: "Cannot compute",error: error})
            })
    }
}

module.exports = LobbyController;