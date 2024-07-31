import { useEffect, useState } from 'react'
import { apiGetAgreePromotions } from '../services/userService'
import { Promotion, PromotionObject } from '../types'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PromotionCard from '../components/myPromotionCard'

const OrganizationPage = () => {
    const { userId, promotion } = useParams()
    const [promotions, setPromotions] = useState<Promotion[] | null>(null)
    useEffect(() => {
        apiGetAgreePromotions({ id: userId, beforeFunction: setPromotions, promotion })
    }, [])

    const { t } = useTranslation()
    const navigateInformation: PromotionObject[] = [
        {
            title: "Реклама",
            description: "advertise_description",
            link: "advertise"
        },
        {
            title: "Коллаборация",
            description: "collaboration_description",
            link: "collaboration"
        },
        {
            title: "Бартер",
            description: "barter_description",
            link: "barter"
        },
        {
            title: "Объявление",
            description: "announce_description",
            link: "announce"
        },
    ]

    const link = navigateInformation.find(info => info.link === promotion)?.link

    console.log(promotions);

    if (promotions === null) {
        return (
            <div className='flex flex-col items-center'>
                <h1 className='w-11/12 font-semibold my-3'>{t("loading")}</h1>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center'>
            <h1 className='w-11/12 font-semibold my-3'>
                {t(link ? link : "other")}
            </h1>
            <div className="flex flex-col w-full max-w-96">
                {
                    promotions?.length ? promotions.map(promotion => <PromotionCard title={promotion.title} category={promotion.category} description={promotion.description} price={promotion.price} agree={promotion.agree} />)
                        : <h1>{t("unavailable")}</h1>
                }
            </div>
        </div>
    )
}

export default OrganizationPage