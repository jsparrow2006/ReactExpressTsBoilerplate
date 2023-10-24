import 'module-alias/register';
import env from 'dotenv';
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';

import sequelizeConnection from 'config/db/dbConfig';

import login from 'routes/login'
import image from 'routes/image';

import dbInit from 'config/db/init';

const server = express();
const service = createServer(server);

env.config()
dbInit()
sequelizeConnection.sync()

const corsOptions = {
    origin: process.env.CORS_ALLOW_ADR.split(','),
    optionsSuccessStatus: 200,
    credentials: true
}

const startPort = process.env.PORT || 5001;

require('config/config-passport');

server.use(cookieParser());
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
server.use(passport.initialize());
server.use(passport.session());
server.use(cors(corsOptions));


server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.raw({ inflate: true, limit: '50mb', type: 'text/xml' }));
server.use(bodyParser.json({ limit: '50mb' }));




server.get('/', function (req, res) {
    res.send(`Hello`);
});

server.use('api/user', login);
server.use('api/image', image);




service.listen(startPort, () => {
    setTimeout(() => {
        process.stdout.write(`\x1b[32mService started in http://localhost:${startPort}\n`)
        process.stdout.write('\x1b[37m')
    }, 500)
});
