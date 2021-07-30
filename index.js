const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { accessControl } = require('./middleware');
//app.use(accessControl);
app.use(express.json());
dotenv.config({
    path: './config/env/.env'
});
const port = process.env.PORT;

const routers = require('./routers')

app.use('/api', routers)

app.listen(port, () => {
    console.log('listen',port);
})