import axios from "axios";
import config from '../public/config'

const Api = () => {
    return axios.create({
        baseURL: config.api,
        headers:{
            Accept: 'application/json',
            "Content-type": "application/json",
        }
    })
}

export default Api