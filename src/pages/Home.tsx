import { PromotionObject } from '../types'
import CardLink from '../components/cardLink'
import { Link, useParams } from 'react-router-dom'
import user from '../hooks/user'
import Organization from './Organization'
import { useTranslation } from 'react-i18next'
import { GrDocumentUser } from 'react-icons/gr'


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
                    <Link
                        to={`/user/${userId}/my-promotion-categories`}
                        tabIndex={-1}
                        role="menuitem"
                        className="flex w-11/12 max-w-sm cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none    hover:text-blue-700 hover:bg-white focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50  duration-200 transition-transform active:bg-opacity-80 active:text-blue-gray-900  bg-blue-800"
                    >

                        <GrDocumentUser />

                        <p className="block font-sans text-[12px] font-normal leading-normal text-inherit antialiased">
                            {t("my_promotions")}
                        </p>
                    </Link>
                    {
                        navigateInformation.map(value => <CardLink link={`/user/${userId}/promotion/${value.link}`} description={value.description} title={t(value.link)} />)
                    }
                </div>
            </div>
        )
    }

}

export default Home