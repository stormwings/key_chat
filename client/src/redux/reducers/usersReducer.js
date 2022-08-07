import * as types from "../types";
import { getArrayRandomItem } from '../../utils/arrayUtils';
import userUtils from '../../utils/userUtils';

const INITIAL_STATE = {
  loading: false,
  error: null,
  users: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_USERS_PENDING: {
      return {
        ...state,
        loading: true
      };
    }
    case types.FETCH_USERS_FULLFILLED: {
      const { users: fetchedUsers } = action.payload;

      const users = fetchedUsers.map(({ _id, name }) => {
        const userTheme = getArrayRandomItem(userUtils.themeColors);

        return {
          _id,
          name,
          userTheme,
        }
      })

      return {
        ...state,
        loading: false,
        error: null,
        users: [...users],
      };
    }
    case types.FETCH_USERS_REJECTED: {
      const { error } = action.payload;

      return {
        ...state,
        loading: false,
        users: [],
        error: error,
      };
    }
    default:
      return state;
  }
};

export default reducer;