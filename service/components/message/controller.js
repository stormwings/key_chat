import store from './store';
import socket from './../../socket';
import config from '../../config';

const getMessages = (chatId) => {
    return new Promise((resolve, reject) => {
        resolve(store.list(chatId));
    })
}

const addMessage = (chat, user, message, file) => {
    return new Promise((resolve, reject) => {
        if (!chat || !user || !message) {
            console.error('[messageController] user or message chat not found');
            reject('incorrect data');
            return false;
        }

        let fileUrl = '';
        if (file) {
            fileUrl = config.host + ':' + config.port + config.publicRoute + '/'+ config.filesRoute + '/' + file.filename;
        }

        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl,
        };
    
        store.add(fullMessage);

        // emit 'message' to socket server => client
        socket.socket.io.emit('message', fullMessage);

        resolve(fullMessage);
    });
}

const updateMessage = (id, message) => {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            reject('Invalid data');
            return false;
        }

        const result = await store.updateText(id, message);

        resolve(result);
    })
}

const deleteMessage = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject('invalid id');
            return false;
        }

        store.remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            })
    });
}

export default {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
};