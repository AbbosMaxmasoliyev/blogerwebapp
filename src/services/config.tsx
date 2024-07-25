import axios from "axios"


const BaseService = axios.create({
    baseURL: "http://bloggerbot.uz",
    timeout: 6000
})



export default BaseService