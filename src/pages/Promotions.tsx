import { useParams } from "react-router-dom"
import { Promotion, PromotionObject } from "../types"
import { useEffect, useState } from "react"
import { apiGetpromotionWithCategory } from "../services/userService"
import CardPromotion from "../components/cardPromotion"
import FileInput from "../components/fileInput"

const Promotions = () => {
    const { promotion, userId, category } = useParams()

    const [promotions, setPromotions] = useState<Promotion[] | null | boolean>(null)
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
            <div className="w-11/12 flex justify-between items-start flex-col">
                <h1 className="text-xl text-start  my-3 font-semibold">{promotionName}</h1>


                <div className="flex justify-center flex-col items-center">
                    {
                        (promotions != null && typeof promotions != "boolean") && promotions.map(promotionItem => <CardPromotion promotion={promotionItem} promotionType={promotion} userId={userId} />)
                    }
                    {
                        (promotions != null && typeof promotions == "boolean" && promotions == false) && <h1>На данный момент для вас нет {promotionName}</h1>
                    }
                </div>
            </div>
        </div>
    )
}

export default Promotions