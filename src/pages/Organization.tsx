import { PromotionObject } from "../types"
import { useParams } from "react-router-dom"
import CardLink from "../components/cardLink"
import { useTranslation } from "react-i18next"

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
            {
                navigateInformation.map((information) => <CardLink title={t(information.link)} description="" link={`/user/${userId}/promotion/${information.link}/my-promotion`} />)
            }
        </div>
    )
}

export default Organization