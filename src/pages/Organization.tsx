import { PromotionObject } from "../types"
import { Link, useParams } from "react-router-dom"
import CardLink from "../components/cardLink"
import { useTranslation } from "react-i18next"
import { GrDocumentUser } from "react-icons/gr"

const Organization = () => {
    const { t } = useTranslation()

    const { userId } = useParams()

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
            title: "Коллаборация",
            description: "collaboration_description",
            link: "collaboration"
        },
        {
            title: "Бартер",
            description: "Делитесь рекламой с другими влиятельными лицами",
            link: "barter"
        },
    ]
    return (
        <div className="flex flex-col items-center gap-3 py-4">
            <Link
                to={`/user/${userId}/my-promotion-categories`}
                tabIndex={-1}
                role="menuitem"
                className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >

                <GrDocumentUser />

                <p className="block font-sans text-[12px] font-normal leading-normal text-inherit antialiased">
                    {t("my_promotions")}
                </p>
            </Link>
            {
                navigateInformation.map((information) => <CardLink title={t(information.link)} description="" link={`/user/${userId}/promotion/${information.link}/my-promotion`} />)
            }
        </div>
    )
}

export default Organization