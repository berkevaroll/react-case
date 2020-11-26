import axios from "axios";

const baseUrl = "http://localhost:51681/"

export default{
    userLogin(url=baseUrl+'api/Authentication/Login'){
        return{
            fetch: ()=>axios.get(url),
            login : userObject => axios.post(url,userObject),
        }
    }
}