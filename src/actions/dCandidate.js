import api from "./api";

export const ACTION_TYPES = {
    CREATE:'CREATE',
    UPDATE:'UPDATE',
    DELETE:'DELETE',
    FETCH_ALL:'FETCH_ALL'
}

export const fetchAll = () => dispatch =>{
    api.userLogin().login({username: "berkevaroll", password: "bukonudaoldukcayetenekliecenurarslan"})
    .then(
        response=>{
            dispatch({
        type:ACTION_TYPES.FETCH_ALL,
        payload: response.data
    });
        console.log(response);
        }
    )
    .catch(err=>console.log(err))   
    
    
}