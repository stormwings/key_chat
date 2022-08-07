
import { useDispatch, useSelector } from 'react-redux';
import { urlUser } from '../urls';
import Http from './../../utils/http';
import * as types from '../types';

const fetchUsers = () => (dispatch) => {
  dispatch({ type: types.FETCH_USERS_PENDING });

  Http.instance
    .get(urlUser)
    .then(({ body }) => {
      const users = body;

      dispatch({
        type: types.FETCH_USERS_FULLFILLED,
        payload: { users },
      });
    })
    .catch((error) => {
      dispatch({
        type: types.FETCH_USERS_REJECTED,
        payload: { error },
      });
    });
};

const getUser = (username) => (dispatch) => {
  dispatch({ type: types.FETCH_ACCOUNT_PENDING });

  Http.instance
    .get(urlUser)
    .then(({ body }) => {
      const account = body.find(
        (user) => user.name === username
      );

      if (!account) {
        throw new Error('User not found');

      } else {
        dispatch({
          type: types.FETCH_ACCOUNT_FULLFILLED,
          payload: { account: account },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: types.FETCH_ACCOUNT_REJECTED,
        payload: { error },
      });
    });
};

const createUser = (username) => (dispatch) => {
  dispatch({ type: types.FETCH_ACCOUNT_PENDING });

  const body = { name: username };

  Http.instance
    .post(urlUser, body)
    .then(({ body }) => {
      dispatch({
        type: types.FETCH_ACCOUNT_FULLFILLED,
        payload: { account: body },
      });
    })
    .catch((error) => {
      dispatch({
        type: types.FETCH_ACCOUNT_REJECTED,
        payload: { error },
      });
    });
};

export const useUsersReducer = () => {
  const { usersReducer } = useSelector((state) => state);
  const { accountReducer } = useSelector((state) => state);
  const dispatch = useDispatch();

  const getUsers = () => {
    dispatch(fetchUsers())
  }

  const findUser = (username) => {
    dispatch(getUser(username))
  }

  const addUser = (username) => {
    dispatch(createUser(username));
  }

  const logoutAccount = () => {
    dispatch({
      type: types.LOGOUT_ACCOUNT,
    });
  }

  const usersActions = {
    getUsers,
    findUser,
    addUser,
    logoutAccount,
  };

  return {
    usersReducer,
    accountReducer,
    usersActions,
  };
};