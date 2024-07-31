import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { User } from '../types'
import { apiGetUserWithUserId } from '../services/userService'

const user = () => {
    const [user, setUser] = useState<User | null>(null)
    const { userId } = useParams()
    useEffect(() => {
        apiGetUserWithUserId({ id: userId, beforeFunction: setUser })
    }, [])
    return user
}

export default user