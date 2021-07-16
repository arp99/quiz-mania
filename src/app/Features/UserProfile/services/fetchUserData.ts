import axios from "axios"

export const fetchUserData = (token: string | null) => {
    return axios.get('https://quiz-mania-backend.arp99.repl.co/api/user',{
        headers: { 'authorization': `Bearer ${token}` }
    });
}