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



        <div className='bg-blue-950 bg-opacity-45 min-h-screen flex flex-col items-center py-5 z-0'>
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
            <div className='grid grid-cols-2 gap-3 w-11/12 '>
                {
                    categories ? categories.map(category => <Link
                        to={`/user/${userId}/promotion/${promotion}/category/${category.value}`}
                        className='bg-blue-950   ring-0 focus:ring-0 active:ring-0'
                    >
                        <div className="group z-0  p-5 cursor-pointer relative text-xl font-normal border-0 flex items-center justify-center bg-transparenttext-red-500  h-auto   w-full   overflow-hidden    transition-all duration-100 ">
                            <span className="group-hover:w-full absolute left-0 h-full w-5 border-y border-l border-blue-500 transition-all duration-500 z-0">
                            </span>

                            <p className="group-hover:opacity-0 group-hover:translate-x-[-100%] absolute translate-x-0 transition-all duration-200 z-0">{category.label}</p>

                            <span className="group-hover:translate-x-0  group-hover:opacity-100 absolute  translate-x-full opacity-0  transition-all duration-200 z-0">{category.label}
                            </span>

                            <span
                                className="group-hover:w-full absolute right-0 h-full w-5  border-y border-r  border-blue-500 transition-all duration-500 z-0 ">
                            </span>
                        </div>
                    </Link>) : null
                }
            </div>
        </div>
    )
}

export default PromotionCategories