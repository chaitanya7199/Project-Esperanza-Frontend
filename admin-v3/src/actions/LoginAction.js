import store from '../store'

export const storeJWT = (token) => async dispatch => {
    try {
        dispatch(
            {
                type: "STORE-TOKEN",
                token: token
            })
        console.log(store.getState())
    } catch (error) {
        console.log(error);
    }

}