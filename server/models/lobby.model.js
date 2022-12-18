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
        required: [true, "A player limit is required for your lobby!"]
    },
    pc: {
        type: Boolean,
        required:[true, "platform status required"]
    },
    playstation: {
        type: Boolean,
        required:[true, "platform status required"]
    },
    xbox: {
        type: Boolean,
        required:[true, "platform status required"]
    },
    switch: {
        type: Boolean,
        required:[true, "platform status required"]
    },
    mac: {
        type: Boolean,
        required:[true, "platform status required"]
    },
    steamdeck: {
        type: Boolean,
        required:[true, "platform status required"]
    },
},{timestamps:true})

// >>Might need to be changed to Lobbys if there is an error.
const Lobby = mongoose.model('Lobbies', LobbySchema);
module.exports = Lobby;