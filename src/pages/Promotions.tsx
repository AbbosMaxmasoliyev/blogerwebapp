import { Link, useParams } from "react-router-dom"
import { Promotion, PromotionObject } from "../types"
import { useEffect, useState } from "react"
import { apiGetpromotionWithCategory } from "../services/userService"
import CardPromotion from "../components/cardPromotion"

const Promotions = () => {
    const { promotion, userId, category } = useParams()

    const [promotions, setPromotions] = useState<Promotion[] | null>(null)
    useEffect(() => {
        if (category) {
            apiGetpromotionWithCategory({ category, beforeFunction: setPromotions, promotion, id: userId })
        }
    }, [])
    console.log(promotions);

    const navigateInformation: PromotionObject[] = [
        {
            title: "Объявление",
            description: "Рекламируйте желаемое объявление или собственный рекламный сервис",
            link: "announce"
        },
        {
            title: "Реклама",
            description: "Хотите рекламировать свои услуги?",
            link: "advertise"
        },
        {
            title: "Сотрудничество",
            description: "Хотите ли вы предоставить свои услуги клиентам посредством сотрудничества?",
            link: "collaboration"
        },
        {
            title: "Бартер",
            description: "Делитесь рекламой с другими влиятельными лицами",
            link: "barter"
        },
    ]
    let promotionName = navigateInformation.filter(item => item.link == promotion)[0].title


    return (
        <div className='bg-blue-950 bg-opacity-45 min-h-screen flex flex-col items-center py-5'>
            <div className="w-11/12 flex justify-between items-center">
                <h1 className="text-xl text-start  my-3 font-semibold">{promotionName}</h1>
                {
                    promotions && promotions.map(promotion => <CardPromotion promotion={promotion} />)
                }
            </div>
        </div>
    )
}

export default Promotions