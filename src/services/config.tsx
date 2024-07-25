import axios from "axios"


const BaseService = axios.create({
    baseURL: "https://209.38.233.168:4000",
    timeout: 6000
})



export default BaseService