
const express = require ('express');
const app = express ();
const port = 8000;
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}));

require('./config/jwt.config')
require('./config/mongoose.config')
require('./routes/user.routes')(app)
require('./routes/lobby.routes')(app)
require('dotenv').config();

app.listen(port, () => console.log(`This amp goes up to the volume of: ${port}`));