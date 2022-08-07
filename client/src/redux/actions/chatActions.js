import { useDispatch, useSelector } from 'react-redux';
import { urlChat } from '../urls';
import Http from './../../utils/http';
import * as types from '../types';

export const fetchChats = (userId) => (dispatch) => {
  dispatch({ type: types.FETCH_CHATS_PENDING });

  Http.instance
    .get(`${urlChat}/${userId}`)
    .then(({ body }) => {
      dispatch({
        type: types.FETCH_CHATS_FULLFILLED,
        payload: { chats: body },
      });
    })
    .catch((error) => {
      dispatch({
        type: types.FETCH_CHATS_REJECTED,
        payload: { error },
      });
    });
};

export const createChat = (senderId, receiverId) => async (dispatch) => {
  dispatch({ type: types.CREATE_CHAT_PENDING });

  await Http.instance
    .post(urlChat, { users: [senderId, receiverId] })
    .then(({ body }) => {
      dispatch({
        type: types.CREATE_CHAT_FULLFILLED,
        payload: { newChat: body },
      });
    })
    .catch((error) => {
      dispatch({
        type: types.CREATE_CHAT_REJECTED,
        payload: { error },
      });
    });

  // (pending) not repeat!
  await Http.instance
    .get(`${urlChat}/${senderId}`)
    .then(({ body }) => {
      dispatch({
        type: types.FETCH_CHATS_FULLFILLED,
        payload: { chats: body },
      });
    })
    .catch((error) => {
      dispatch({
        type: types.FETCH_CHATS_REJECTED,
        payload: { error },
      });
    });
};

export const useChatsReducer = () => {
  const { chatsReducer } = useSelector((state) => state);
  const dispatch = useDispatch();

  const getChats = (userId) => {
    dispatch(fetchChats(userId));
  };

  const addChat = (senderId, receiverId) => {
    dispatch(createChat(senderId, receiverId));
  };

  const setChat = (chatId) => {
    dispatch({ 
      type: types.SELECT_CHAT,
      payload: { chatId },
    });
  }

  const unsetChat = () => {
    dispatch({ 
      type: types.DESELECT_CHAT,
    });
  }

  const chatsActions = {
    getChats,
    addChat,
    setChat,
    unsetChat,
  };

  return { chatsReducer, chatsActions };
};