import { useEffect, useState } from 'react'
import { Promotion } from '../types'
import { apiAgreePromotion, apiGetPromotionWithId } from '../services/userService'
import { useParams } from 'react-router-dom'
import ImageWithFallback from '../components/ImageWithFallback'
import { Error, Loading } from './Bot'
import { FiSend } from "react-icons/fi";
import 'react-toastify/dist/ReactToastify.css';
import { openNotification } from '../utils/openNotifications'
import { ToastContainer } from 'react-toastify'
import CreaterCard from '../components/creatorCard'
import { useTranslation } from 'react-i18next'

const PromotionView = () => {
    const { promotion, id, userId } = useParams()
    const { t } = useTranslation()
    const [respPromotion, setPromotion] = useState<Promotion | null | "fail">(null)
    const [agree, setAgree] = useState<"success" | "normal" | "fail">("normal")
    const getPromotion = async () => {
        try {
            await apiGetPromotionWithId({ promotion, id, beforeFunction: setPromotion })
        } catch (error) {
            setPromotion("fail")
        }

    }

    useEffect(() => {
        getPromotion()
    }, [])

    if (!respPromotion) {
        return <Loading t={t} />
    }

    if (respPromotion === "fail") {
        return <Error t={t} />
    }
    console.log(promotion);
    const handleAgreePromotion = async () => {
        try {
            let responseAgree = await apiAgreePromotion({ id: userId, promotionId: respPromotion._id, promotion })
            if (responseAgree.success && typeof responseAgree.success === "boolean") {
                setAgree("success")
                openNotification({ type: "success", message: "Запрос успешно отправлен" })
            } else {
                setAgree("fail")

                if (typeof responseAgree.success == "string") {

                    return openNotification({ type: "warning", message: responseAgree.success })
                }
                openNotification({ type: "error", message: "Произошла ошибка при отправке запроса" })
            }
        } catch (error) {

            setAgree("fail")

            openNotification({ type: "error", message: "Произошла ошибка при отправке запроса" })

        }
    }

    return (
        <div className='flex justify-center py-3'>


            <div className="max-w-sm w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-max">

                {respPromotion.img && promotion != "collaboration" ? <div className="h-52">
                    <ImageWithFallback src={respPromotion.img} alt={respPromotion.title} fallbackSrc='https://picsum.photos/350/250' />
                </div> : null}
                <div className="p-3"> <a href="#">
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{respPromotion.title}</h5>
                </a>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{respPromotion.description}</p>
                    <p className="inline-flex font-medium items-center text-blue-600 hover:underline">
                        $ {respPromotion.price}
                    </p>
                    <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 flex gap-2 items-center mt-3" onClick={handleAgreePromotion} disabled={!(agree == "normal")}>{t("agree")} <FiSend /></button>
                </div>

                {
                    typeof respPromotion.owner != "string" ? <CreaterCard {...respPromotion.owner} /> : null
                }

            </div>
            <ToastContainer />
        </div>
    )
}

export default PromotionView