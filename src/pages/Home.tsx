import { PromotionObject } from '../types'
import CardLink from '../components/cardLink'
import { useParams } from 'react-router-dom'

const Home = () => {



    const { userId } = useParams()
    console.log(userId);

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
    return (
        <div className='bg-blue-950 bg-opacity-45 min-h-screen'>
            <div className="flex flex-col flex-wrap justify-center py-3 gap-3 items-center">
                {
                    navigateInformation.map(value => <CardLink {...value} />)
                }
            </div>
        </div>
    )
}

export default Home