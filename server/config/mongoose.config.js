const mongoose = require ('mongoose');
const db = 'LobbyDB'

mongoose.connect(`mongodb://localhost/${db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log(`You are now linked and in a fully committed relationship with: ${db}`))
    .catch((error)=>console.log(`${db} has rejected your love, but would still like to be friends.`, error));
