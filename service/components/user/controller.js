import bcrypt from "bcrypt";
import store from './store';
import { jwtSignature } from "./jwt";

const addUser = (name) => {
    if (!name)
        return Promise.reject('Invalid name');

    const user = {
        name,
    };

    return store.add(user);
}

const listUsers = () => {
    return store.list();
}

async function login(username, password) {
  const userFromDB = await store.list({ username });

  const userAuthenticated = await bcrypt
    .compare(password, userFromDB[0].password)
    .then((passwordEqual) => {
      if (passwordEqual === true) {
        return { token: jwtSignature(userFromDB[0].toJSON()) };
      } else {
        throw new Error("Error authentication");
      }
    });

  return userAuthenticated;
}

async function register(username, password) {
  const user = {
    username,
    password,
  };

  user.password = await bcrypt.hash(user.password, 5);

  return store.add(user);
}

export default {
    addUser,
    listUsers,
    login,
    register
}