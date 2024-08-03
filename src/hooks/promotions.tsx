import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Promotion } from '../types'
import { apiGetMyPromotions } from '../services/userService'

const promotions = (promotion: string) => {
    const [response, setResponse] = useState<Promotion[] | null>(null)
    const { userId } = useParams()
    useEffect(() => {
        apiGetMyPromotions({ id: userId, promotion, beforeFunction: setResponse })
    }, [])
    return response
}

export default promotions