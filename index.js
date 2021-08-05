const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { error } = require('./middlewares/errorMiddleware');
var cookieParser = require('cookie-parser')
app.use(error);
app.use(express.json());
app.use(cookieParser());

dotenv.config({
    path: './config/env/.env'
});
const port = process.env.PORT;

const routers = require('./routers')

app.use('/api', routers)

app.use(error);

app.listen(port, () => {
    console.log('listen', port);
})