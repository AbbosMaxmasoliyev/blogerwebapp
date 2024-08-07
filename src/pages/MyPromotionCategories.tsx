import { useTranslation } from "react-i18next"
import CardLink from "../components/cardLink"
import { PromotionObject } from "../types"
import { useParams } from "react-router-dom"

const MyPromotionCategories = () => {
    const { userId } = useParams()
    const { t } = useTranslation()

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
        <div
            className="flex flex-col gap-3 items-center"
        >
            {
                navigateInformation.map((information) => <CardLink title={t(information.link)} description="" link={`/user/${userId}/promotion/${information.link}/my-promotion`} />)
            }
        </div>
    )
}

export default MyPromotionCategories