const initialState = {
    //userId: null , 
    userName : null

}
const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case "GET_USER":
            console.log(action.pload)
            return {
                ...state,
               // userId: action.pload.user_id , 
                userName : action.pload.userName
            }
        
        /* case "USER_STATUS":
            console.log(action.type)
            console.log(state)
            return {
                ...state
            } */

        default:
            return state;
    }

}
export default userReducer;