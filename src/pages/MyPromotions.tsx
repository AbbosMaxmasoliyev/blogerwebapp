import { useEffect } from "react"
import promotions from "../hooks/promotions"
import { Link, useNavigate, useParams } from "react-router-dom"
import PromotionCard from "../components/myPromotionCard"
import { useTranslation } from "react-i18next"

const MyPromotion = () => {
    const { t } = useTranslation()
    const { promotion, userId } = useParams()
    const navigate = useNavigate()
    if (typeof promotion != "string" || promotion == undefined && typeof userId != "string" || userId == undefined) {
        navigate("/")
        return <div className="flex">
            <h1>404</h1>
        </div>
    }
    const myPromotions = promotions("collaboration")

    useEffect(() => {
        console.log(myPromotions);

    })
    return (
        <div className='w-full flex items-center flex-col gap-3 mb-5 ' >
            <div className="flex items-center w-10/12 justify-between">
                <h1 className="text-xl text-start  my-3 font-semibold">{t(promotion)}</h1>
                {
                    promotion === "collaboration" && <Link
                        to={`/user/${userId}/create/${promotion}`}
                        className="text-white bg-gray-700   focus:ring-4  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-white hover:text-gray-800 focus:outline-none focus:ring-gray-800"
                    >
                        {t("create")}
                    </Link>
                }
            </div>
            <div className="flex flex-col px-1 w-full">
                {
                    myPromotions?.map(promotionItem => <PromotionCard
                        {...promotionItem}
                    //  promotion={promotionItem} promotionKey={promotion} userId={userId}
                    />)
                }
            </div>


        </div>
    )
}

export default MyPromotion