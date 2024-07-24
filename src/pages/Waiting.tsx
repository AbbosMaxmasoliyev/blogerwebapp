import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetPublishWaiting } from '../services/userService'
import { Promotion } from '../types'
import CardPromotion from '../components/cardPromotion'

const Waiting = () => {
    let { userId } = useParams()
    const [publishWaiting, setPublishWaiting] = useState<{
        value: Promotion[] | [],
        key: string
    }[] | null>(null)

    const getWaiting = () => {
        if (userId) {

            apiGetPublishWaiting({ userId, beforeFunction: setPublishWaiting })
        }
    }
    useEffect(() => {
        getWaiting()
    }, [])


    return (
        <div className='py-5 bg-blue-950 bg-opacity-45'>
            <div className="flex flex-col gap-3 items-center">
                {
                    publishWaiting ? publishWaiting.map(item => item.value.map(promotion => <CardPromotion publish promotion={promotion} proKey={item.key} submitNext={getWaiting} />)) : null
                }
            </div>
        </div>
    )
}

export default Waiting