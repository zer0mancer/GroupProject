const LobbyController = require('../controllers/lobby.controller');
const Lobby = require('../models/lobby.model');

const routes = (app)=>{

    app.get('/api/lobbies/test', LobbyController.test)
    app.post('/api/lobbies', LobbyController.create)
    app.get('/api/lobbies', LobbyController.allLobbies)
    app.get('/api/lobbies/:id', LobbyController.oneLobby)
    app.put('/api/lobbies/:id', LobbyController.update)
    app.delete('/api/lobbies/:id', LobbyController.delete)

}

module.exports = routes;