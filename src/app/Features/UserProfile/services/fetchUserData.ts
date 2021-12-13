import { axiosAuthorization } from "../../Auth/services/axiosInstance"

export const fetchUserData = () => {
    return axiosAuthorization.get('api/user');
}