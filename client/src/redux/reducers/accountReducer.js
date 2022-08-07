import * as types from "../types";

const INITIAL_STATE = {
  loading: false,
  error: null,
  account: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_ACCOUNT_PENDING: {
      return {
        ...state,
        loading: true
      };
    }
    case types.FETCH_ACCOUNT_FULLFILLED: {
      const { account } = action.payload;

      return {
        ...state,
        loading: false,
        error: null,
        account: account,
      };
    }
    case types.FETCH_ACCOUNT_REJECTED: {
      const { error: { message } } = action.payload;

      return {
        ...state,
        loading: false,
        account: null,
        error: message,
      };
    }
    case types.LOGOUT_ACCOUNT: {
      return {
        ...INITIAL_STATE,
      };
    }
    default:
      return state;
  }
};

export default reducer;