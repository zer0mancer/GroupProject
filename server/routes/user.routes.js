
const UserController = require('../controllers/user.controller');
const {authenticate} = require ('../config/jwt.config')

const routes = (app)=>{

    app.get('/api/test', UserController.test)
    app.post('/api/users', UserController.create)
    app.get('/api/users', UserController.allPlayers)
    app.get('/api/users/:id', UserController.playerOne)
    app.put('/api/users/:id', UserController.update)
    app.delete('/api/users/:id', UserController.delete)
    app.post('/api/user/login', UserController.login)
    app.post('/api/user/logout', UserController.logout)

}

module.exports = routes;