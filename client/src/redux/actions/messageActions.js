
import { useDispatch, useSelector } from 'react-redux';
import { urlMessages } from '../urls';
import Http from './../../utils/http';
import * as types from '../types';

export const fetchMessages = (chatId) => (dispatch) => {
  dispatch({ type: types.FETCH_MESSAGES_PENDING });

  Http.instance
    .get(`${urlMessages}?chat=${chatId}`)
    .then(({ body }) => {
      dispatch({
        type: types.FETCH_MESSAGES_FULLFILLED,
        payload: { messages: body },
      });
    })
    .catch((error) => {
      dispatch({
        type: types.FETCH_MESSAGES_REJECTED,
        payload: { error },
      });
    });
};

export const createMessage = (chat, message, user) => (dispatch) => {
  dispatch({ type: types.CREATE_MESSAGES_PENDING });

  Http.instance
    .post(urlMessages, { chat, message, user })
    .catch((error) => {
      dispatch({
        type: types.CREATE_MESSAGES_REJECTED,
        payload: { error },
      });
    });
}

export const useMessagesReducer = () => {
  const { messagesReducer } = useSelector((state) => state);
  const dispatch = useDispatch();

  const getMessages = (chatId) => {
    dispatch(fetchMessages(chatId))
  };

  const addMessage = (chat, message, user) => {
    dispatch(createMessage(chat, message, user))
  };

  const injectMessage = (message) => {
    const newMessage = {
      ...message,
      user: {
        _id: message.user
      }
    };

    dispatch({
      type: types.CREATE_MESSAGES_FULLFILLED,
      payload: { newMessage: newMessage },
    });
  }

  const messagesActions = {
    getMessages,
    addMessage,
    injectMessage,
  };

  return { messagesReducer, messagesActions };
};