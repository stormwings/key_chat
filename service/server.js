import express from 'express';
import http from 'http';
import cors from 'cors';
import config from './config';
import socket from './socket';
import database from './db';
import router from './network/routes';

const app = express();
const server = http.Server(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

database(config.dbUrl);
socket.connect(server);
router(app);

server.listen(config.port, function () {
    console.log(`server up ${config.host}:${config.port}`);
});