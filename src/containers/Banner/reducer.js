import { GET_BANNER,ADD_BANNER,DELETE_BANNER } from './action';

const initialState = {
    data: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BANNER:
            return Object.assign({}, state, {data:[ ...action.data] })
        case ADD_BANNER:
            return Object.assign({},state,{data:[ ...state.data,action.data] })
        case DELETE_BANNER:
            return Object.assign({},state,{data:[ ...state.data.filter(item=>item.id != action.data)] })
        default:
            return state
    }
}


export default reducer