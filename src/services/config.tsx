import axios from "axios"


const BaseService = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 6000
})



export default BaseService