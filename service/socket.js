import socketIO from 'socket.io';
const socket = {};

const connect = (server) => {
    socket.io = socketIO(server);
}

export default {
    connect,
    socket,
};
