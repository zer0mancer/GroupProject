const mongoose = require('mongoose');

const LobbySchema = new mongoose.Schema({
    game:{
        type: String,
        required: [true, "A game is required for you to host a server"]
    },
    title:{
        type: String,
        required:[true, "A title is needed for your server. How will your friends find you?"],
        minLength:[8, "Title must be at least 8 characters"],
        maxLength:[30, "Title cannot exceed 30 characters"]
    },
    limit:{
        type: Number,
        required: [true, "A player limit is required for your lobby!"],
        min: [2, "Go play a single player game if you're not playing with other players."]
    },
    platform: {
        type: String,
        required: [true, "We need to know what platform this game is being hosted on"]
    },
    creatorId: {
        type: mongoose.Types.ObjectId,
        ref: "Users", 
        required: [true, "User must be logged in before creating a lobby"]
    },
    players: [{
        type: mongoose.Types.ObjectId,
        ref: "Users"
    }]
},{timestamps:true})

const Lobby = mongoose.model('Lobbies', LobbySchema);
module.exports = Lobby;