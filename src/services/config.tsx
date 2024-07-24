import axios from "axios"


const BaseService = axios.create({
    baseURL: "https://1f44088b-35dd-45bc-9944-1a61845df6a8-00-1lltk0fz3fl7b.riker.replit.dev:3001",
    timeout: 6000
})



export default BaseService