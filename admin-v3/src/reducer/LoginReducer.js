const initialState = {

}

const loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case "STORE_TOKEN":
            return {
                ...state,
                token: action.data
            }

        default:
            return state;
    }

}
export default loginReducer;