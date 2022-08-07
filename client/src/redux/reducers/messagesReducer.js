import * as types from "../types";

const INITIAL_STATE = {
  loading: false,
  error: null,
  messages: [],
};

const handleReceivedMessages = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    messages: [...action.payload.messages],
  };
};

const handleCreatedMessage = (state, action) => {
  const { newMessage } = action.payload;
  const { messages: lastMessages } = state;

  const messages = [...lastMessages, newMessage]

  return {
    ...state,
    loading: false,
    error: null,
    messages: messages,
  };
};

const handleErrorOnFetch = (state, action) => {
  return {
    ...state,
    loading: false,
    messages: [],
    error: action.payload.error,
  };
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGES_PENDING: {
      return { ...state, loading: true };
    }
    case types.FETCH_MESSAGES_FULLFILLED: {
      return handleReceivedMessages(state, action);
    }
    case types.FETCH_MESSAGES_REJECTED: {
      return handleErrorOnFetch(state, action);
    }
    case types.CREATE_MESSAGES_PENDING: {
      return { ...state };
    }
    case types.CREATE_MESSAGES_FULLFILLED: {
      return handleCreatedMessage(state, action);
    }
    case types.CREATE_MESSAGES_REJECTED: {
      return handleErrorOnFetch(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
