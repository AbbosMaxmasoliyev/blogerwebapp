import { PromotionObject } from '../types'
import CardLink from '../components/cardLink'
import { useParams } from 'react-router-dom'

const Home = () => {



    const { userId } = useParams()
    console.log(userId);

    const navigateInformation: PromotionObject[] = [
        {
            title: "Реклама",
            description: "Хотите рекламировать свои услуги?",
            link: "advertise"
        },
        {
            title: "Коллаборация",
            description: "Хотите ли вы предоставить свои услуги клиентам посредством сотрудничества?",
            link: "collaboration"
        },
        {
            title: "Бартер",
            description: "Делитесь рекламой с другими влиятельными лицами",
            link: "barter"
        },
        {
            title: "Объявление",
            description: "Рекламируйте желаемое объявление или собственный рекламный сервис",
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