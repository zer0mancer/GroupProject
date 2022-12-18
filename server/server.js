
const express = require ('express');
const app = express ();
const port = 8000;
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:'http://localhost:3000'
}));

require('./config/mongoose.config')
require('./routes/user.routes')(app)
require('./routes/lobby.routes')(app)

app.listen(port, () => console.log(`This amp goes up to the volume of: ${port}`));