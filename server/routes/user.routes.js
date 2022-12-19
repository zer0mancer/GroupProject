
const UserController = require('../controllers/user.controller');
const User = require('../models/user.model');

const routes = (app)=>{

    app.get('/api/test', UserController.test)
    app.post('/api/users', UserController.create)
    app.get('/api/users', UserController.allPlayers)
    app.get('/api/users/:id', UserController.playerOne)
    app.put('/api/users/:id', UserController.update)
    app.delete('/api/users/:id', UserController.delete)

}

module.exports = routes;