import axios from "./axiosInstance"

export const LoginUserWithCredentials = ( email : string , password : string ) =>{
    return axios.post('api/login',{
        email,
        password
    })
}

export const signUp = ( firstName : string , lastName : string | undefined , email : string , password : string) => {
    if(lastName?.length === 0){
        return axios.post('api/signup', {
            firstName,
            email,
            password
        })
    }else{
        return axios.post('api/signup', {
            firstName,
            lastName,
            email,
            password
        })
    }
}