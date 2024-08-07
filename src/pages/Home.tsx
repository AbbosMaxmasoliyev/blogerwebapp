import { PromotionObject } from '../types'
import CardLink from '../components/cardLink'
import { useParams } from 'react-router-dom'
import user from '../hooks/user'
import Organization from './Organization'
import { useTranslation } from 'react-i18next'


const Home = () => {
    const { t } = useTranslation()


    const { userId } = useParams()
    const userData = user()

    if (userData?.web_app.role === "reklama") {
        return <Organization />
    }

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

    if (userData?.web_app.role != "reklama") {
        return (
            <div className=' min-h-screen '>
                <div className="flex flex-col flex-wrap justify-center py-3 gap-3 items-center">
                    {
                        navigateInformation.map(value => <CardLink link={`/user/${userId}/promotion/${value.link}`} description={value.description} title={t(value.link)} />)
                    }
                </div>
            </div>
        )
    }

}

export default Home