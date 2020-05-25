const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');


require('./config/mongoose.config');
require('./config/mongoose2.config');

require('dotenv').config({path:__dirname+'/../.env'});


const app = express();
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());


const routeFunc = require('./routes/users.routes');
routeFunc(app);

const routeFunc2 = require('./routes/pirate.routes');
routeFunc2(app);

app.listen(8000,()=>console.log('Listening to port 8000'));