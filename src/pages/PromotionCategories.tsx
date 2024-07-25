import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiGetCategories } from '../services/userService'
import { PromotionObject } from '../types'

interface Category { value: string, label: string }


const PromotionCategories = () => {
    const { userId, promotion } = useParams()
    const [categories, setCategories] = useState<Category[] | null>(null)

    useEffect(() => {
        apiGetCategories({ beforeFunction: setCategories })
    }, [])

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
            title: "Сотрудничество",
            description: "Хотите ли вы предоставить свои услуги клиентам посредством сотрудничества?",
            link: "collaboration"
        },
        {
            title: "Бартер",
            description: "Делитесь рекламой с другими влиятельными лицами",
            link: "barter"
        },
    ]
    let promotionName = navigateInformation.filter(item => item.link == promotion)[0].title


    return (



        <div className='bg-blue-950 bg-opacity-45 min-h-screen flex flex-col items-center py-5'>
            <div className="w-11/12 flex justify-between items-center">
                <h1 className="text-xl text-start  my-3 font-semibold">{promotionName}</h1>
                {
                    promotion === "collaboration" && <Link
                        to={`/user/${userId}/create/${promotion}`}
                        className="text-white bg-gray-700   focus:ring-4  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-white hover:text-gray-800 focus:outline-none focus:ring-gray-800"
                    >
                        Добавить
                    </Link>
                }
            </div>
            <div className='grid grid-cols-2 gap-3 w-11/12'>
                {
                    categories ? categories.map(category => <Link
                        to={`/user/${userId}/promotion/${promotion}/category/${category.value}`}
                        className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 text-center'
                    >{category.label}</Link>) : null
                }
            </div>
        </div>
    )
}

export default PromotionCategories