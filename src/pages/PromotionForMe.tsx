import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Promotion } from '../types'
import { apiGetCategories } from '../services/userService'
import CardPromotion from '../components/cardPromotion'
import PromotionView from './Promotion'

const PromotionForMe = () => {
    const { promotion, userId } = useParams()
    const [categoryData, setCategoryData] = useState<Promotion[] | null>(null)



    useEffect(() => {
        if (promotion) {
            apiGetCategories({ beforeFunction: setCategoryData })
        }
    }, [])


    useEffect(() => {
        if (userId) {
            apiGetCategories({ beforeFunction: setCategoryData })
        }

        console.log(categoryData);

    }, [promotion])


    return (
        <div className='w-full flex items-center flex-col gap-3'>




            {
                categoryData ? categoryData.map(promotion => <PromotionView />) : null
            }
        </div>
    )
}

export default PromotionForMe