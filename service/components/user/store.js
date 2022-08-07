import Model from './model';

const addUser = (user) => {
    const myUser = new Model(user);

    return myUser.save();
}

const listUsers = (user = undefined) => Model.find(user);

export default {
    add: addUser,
    list: listUsers,
}