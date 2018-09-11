import { GET_BANNER, ADD_BANNER, UPDATE_BANNER, DELETE_BANNER } from "./action";

const initialState = {
  data: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BANNER:
      return Object.assign({}, state, { data: [...action.data] });
    case ADD_BANNER:
      return Object.assign({}, state, { data: [...state.data, action.data] });
    case UPDATE_BANNER:
      //   let data = state.data
      //   let obj = data.find(item => item.id === action.data.id);
      //   obj = { ...action.data };
      //   console.log('====================================');
      //   console.log(obj);
      //   console.log('====================================');
      //   state.data = data
      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i].id === action.data.id) {
          state.data[i] = action.data;
        }
      }

      return Object.assign({}, state, { data: [...state.data] });
    case DELETE_BANNER:
      return Object.assign({}, state, {
        data: [...state.data.filter(item => item.id != action.data)]
      });
    default:
      return state;
  }
};

export default reducer;
