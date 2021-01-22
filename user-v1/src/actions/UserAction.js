import axios from 'axios'

export const getUser = (userDetails) => async dispatch => {
    try {
        console.log("Get user started")
        console.log(JSON.stringify(userDetails))
        axios.post('http://localhost:9050/user' , userDetails).then(res => {
            console.log(res)
            if(res.data === true)
            {
                localStorage.setItem("loggeduser",JSON.stringify(userDetails))
                dispatch(
                    {
                        type: "GET_USER",
                        pload: userDetails
                    })
            }
            else{
                alert("Invalid Login Credentials")
            }
        })
    } catch (error) {
        console.log(error);
    }

}

/* export const userStatus = () => async dispatch => {
    try {
        console.log("User Status started")
        dispatch(
            {
                type: "USER_STATUS"
            })

    } catch (error) {
        console.log(error);
    }

} */