import axios from "axios"
export const API_PREFIX: string = "https://bloggerbot.uz"

const BaseService = axios.create({
    baseURL: API_PREFIX,
    timeout: 6000
})



export default BaseService