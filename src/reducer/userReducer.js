import { BUY_MOVIE } from '../constants';

const initialState = {
  currentUser: {
    userBalance: 0,
  },
  currentAmount: 0,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${BUY_MOVIE}_PROGRESS`: {
      return {
        ...state,
        currentAmount: 0,
      }
    }
    case `${BUY_MOVIE}`: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser, userBalance: parseInt(state.currentUser.userBalance) - parseInt(action.payload)
        },
        currentAmount: action.payload,
      }
    }
    default: return state;
  }
}

export default userReducer;
