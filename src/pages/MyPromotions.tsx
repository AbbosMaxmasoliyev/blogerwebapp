import { useEffect } from "react"
import promotions from "../hooks/promotions"

const MyPromotion = () => {
    const myPromotions = promotions("collaboration")

    useEffect(() => {
        console.log(myPromotions);

    })
    return (
        <div className='w-full flex items-center flex-col gap-3'>





        </div>
    )
}

export default MyPromotion