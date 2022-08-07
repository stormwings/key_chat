import { combineReducers } from 'redux';

import accountReducer from './accountReducer';
import usersReducer from './usersReducer';
import chatsReducer from './chatsReducer';
import messagesReducer from './messagesReducer';

export default combineReducers({
  accountReducer,
  usersReducer,
  chatsReducer,
  messagesReducer,
});