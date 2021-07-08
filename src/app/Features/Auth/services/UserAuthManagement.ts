import axios from "axios"

export const LoginUserWithCredentials = ( email : string , password : string ) =>{
    return axios.post('https://quiz-mania-backend.arp99.repl.co/api/login',{
        email,
        password
    })
}

export const signUp = ( firstName : string , lastName : string | undefined , email : string , password : string) => {
    if(lastName?.length === 0){
        return axios.post('https://quiz-mania-backend.arp99.repl.co/api/signup', {
            firstName,
            email,
            password
        })
    }else{
        return axios.post('https://quiz-mania-backend.arp99.repl.co/api/signup', {
            firstName,
            lastName,
            email,
            password
        })
    }
}

