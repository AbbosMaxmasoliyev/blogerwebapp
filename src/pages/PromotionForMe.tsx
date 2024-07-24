import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Promotion } from '../types'
import { apiGetpromotionForMe } from '../services/userService'
import CardPromotion from '../components/cardPromotion'

const PromotionForMe = () => {
    const { promotion, userId } = useParams()
    const [categoryData, setCategoryData] = useState<Promotion[] | null>(null)



    useEffect(() => {
        if (userId) {
            apiGetpromotionForMe({ id: userId, beforeFunction: setCategoryData, promotion })
        }
    }, [])


    useEffect(() => {
        if (userId) {
            apiGetpromotionForMe({ id: userId, beforeFunction: setCategoryData, promotion })
        }

        console.log(categoryData);

    }, [promotion])


    return (
        <div className='w-full flex items-center flex-col gap-3'>
            
            
            
            
            {
                categoryData ? categoryData.map(promotion => <CardPromotion promotion={promotion} />) : null
            }
        </div>
    )
}

export default PromotionForMe