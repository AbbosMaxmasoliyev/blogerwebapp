import { Promotion, } from '../types'
import { apiAgreePromotion, } from '../services/userService'
import ImageWithFallback from '../components/ImageWithFallback'
import { FiSend } from "react-icons/fi";
import 'react-toastify/dist/ReactToastify.css';
import { openNotification } from '../utils/openNotifications'
import { ToastContainer } from 'react-toastify'
import CreaterCard from '../components/creatorCard'
import { useTranslation } from 'react-i18next'

interface PromotionAgreeWithProps {
    promotion: Promotion, userId: string,
    promotionKey: string
}


const PromotionAgreeWith: React.FC<PromotionAgreeWithProps> = ({ promotion, userId, promotionKey }) => {
    console.log(userId);

    const { t } = useTranslation()





    const handleAgreePromotion = async () => {
        console.log(promotion);

        try {
            let responseAgree = await apiAgreePromotion({ id: userId, promotionId: promotion._id, promotion: promotionKey })
            if (responseAgree.success && typeof responseAgree.success === "boolean") {
                openNotification({ type: "success", message: "Запрос успешно отправлен" })
            } else {

                if (typeof responseAgree.success == "string") {

                    openNotification({ type: "warning", message: responseAgree.success })

                } else {
                    openNotification({ type: "error", message: "Произошла ошибка при отправке запроса" })
                }
            }
        } catch (error) {


            openNotification({ type: "error", message: "Произошла ошибка при отправке запроса" })

        }
    }
    if (typeof promotion.owner != "string") {
        return (
            <div className='flex justify-center py-3'>


                <div className="max-w-sm w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-max">

                    {promotion.img ? <div className="h-52">
                        <ImageWithFallback src={promotion.img} alt={promotion.title} fallbackSrc='https://picsum.photos/350/250' />
                    </div> : null}
                    <div className="p-3"> <a href="#">
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{promotion.title}</h5>
                    </a>
                        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{promotion.description}</p>
                        {/* <p className="inline-flex font-medium items-center text-blue-600 hover:underline">
                            $ {promotion.price}
                        </p> */}

                        {
                            userId != promotion.owner?.userId ?
                                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 flex gap-2 items-center mt-3" onClick={handleAgreePromotion} >{t("agree")} <FiSend /></button> : null
                        }
                    </div>

                    {
                        typeof promotion.owner != "string" ? <CreaterCard {...promotion.owner} /> : null
                    }

                </div>
                <ToastContainer />
            </div>
        )
    } else {
        return null
    }

}

export default PromotionAgreeWith