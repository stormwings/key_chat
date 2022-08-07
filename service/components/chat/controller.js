import store from './store';

const listChats = (userId) => {
    return store.list(userId);
}

const addChat = (users) => {
    if (!users || !Array.isArray(users))
        return Promise.reject('Invalid user list');

    const chat = {
        users: users,
    };

    return store.add(chat);
}

export default {
    addChat,
    listChats,
}