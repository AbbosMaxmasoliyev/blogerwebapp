import { Link, useParams } from "react-router-dom"
import { PromotionObject } from "../types"

const Promotions = () => {
    const { promotion, userId } = useParams()
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
                    promotion === "collaboration" && <Link
                        to={`/user/${userId}/create/${promotion}`}
                        className="text-white bg-gray-700   focus:ring-4  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-white hover:text-gray-800 focus:outline-none focus:ring-gray-800"
                    >
                        Добавить
                    </Link>
                }
            </div>
        </div>
    )
}

export default Promotions