import Model from './model';

const getMessages = async (chatId) => {
    return new Promise((resolve, reject) => {
        let filter = {};

        if (chatId !== null) {
            filter = { chat: chatId };
        }
        // populate: includes "username" instead of "_id"
        // exec: execute the population or handle error
        Model.find(filter)
            .populate('user')
            .exec((error, populated) => {
                if (error) {
                    reject(error);
                    return false;
                }

                resolve(populated);
            });
    })
}

const addMessage = (message) => {
    const myMessage = new Model(message);

    myMessage.save();
}

const removeMessage = (id) => {
    return Model.deleteOne({
        _id: id
    });
}

const updateText = async (id, message) => {
    const foundMessage = await Model.findOne({
        _id: id
    });

    foundMessage.message = message;

    const newMessage = await foundMessage.save();
    return newMessage;
}

export default {
    add: addMessage,
    list: getMessages,
    updateText: updateText,
    remove: removeMessage,
}