import axios from "axios"
export const API_PREFIX: string = "https://bloggerbot.uz"
// export const API_PREFIX: string = "http://localhost:3001"

const BaseService = axios.create({
    baseURL: API_PREFIX,
    timeout: 6000
})



export default BaseService