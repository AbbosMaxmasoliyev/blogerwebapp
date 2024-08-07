import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiGetCategories, apiGetPromtions } from '../services/userService'
import { Promotion, PromotionObject } from '../types'
import { useTranslation } from 'react-i18next'
import PromotionAgreeWith from './PromotionAgree'


interface Category { value: string, [key: string]: string }


const PromotionCategories = () => {
    const { t, i18n: { language } } = useTranslation()
    const { userId, promotion } = useParams()
    const [categories, setCategories] = useState<{ all: Category[], length: { [key: string]: number } } | null>(null)
    const [promotions, setPromotions] = useState<Promotion[] | null>(null)

    useEffect(() => {
        if (promotion === "collaboration") {
            apiGetPromtions({ promotion, beforeFunction: setPromotions })
        } else if (promotion) {
            apiGetPromtions({ promotion, beforeFunction: setPromotions })
            apiGetCategories({ beforeFunction: setCategories, promotion: promotion })
        }
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
    let promotionName = navigateInformation.filter(item => item.link == promotion)[0].link
    console.log(categories);

    if (promotion != "collaboration") {

        return (



            <div className='bg-blue-950 bg-opacity-45 min-h-screen flex flex-col items-center py-5 z-0'>
                <div className="w-11/12 flex justify-between items-center">
                    <h1 className="text-xl text-start  my-3 font-semibold">{t(promotionName)}</h1>
                    {
                        promotion === "collaboration" && <Link
                            to={`/user/${userId}/create/${promotion}`}
                            className="text-white bg-gray-700   focus:ring-4  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-white hover:text-gray-800 focus:outline-none focus:ring-gray-800"
                        >
                            {t("create")}
                        </Link>
                    }
                </div>
                <div className='flex flex-wrap gap-3 w-11/12 justify-between font-mont font-bold'>
                    {
                        categories?.all ? categories.all?.map(category => <Link
                            to={`/user/${userId}/promotion/${promotion}/category/${category.value}`}
                            className='bg-blue-950 px-1 block min-w-[130px]   ring-0 focus:ring-0 active:ring-0 line-clamp rounded-xl'
                        >
                            <div className="group z-0   p-5 cursor-pointer relative text-xl font-normal border-0 flex items-center justify-center bg-transparenttext-red-500  h-auto   w-full   overflow-hidden    transition-all duration-100 truncate text-ellipsis ">


                                <p className="group-hover:opacity-0 group-hover:translate-x-[-100%] absolute translate-x-0 transition-all duration-200 z-0 text-[12px] truncate text-ellipsis w-[80%] text-center flex justify-center">
                                    <i className='max-w-[80px] truncate  block'>{t(category[language])}</i> ({categories.length[category.value] || "0"})</p>

                                <p className="group-hover:translate-x-0  group-hover:opacity-100 absolute  translate-x-full opacity-0 truncate text-ellipsis w-[80%] text-center flex justify-center  transition-all duration-200 z-0 text-[12px]"><i className='max-w-[80px] truncate '>{t(category[language])}</i>({categories.length[category.value] || "0"})
                                </p>


                            </div>
                        </Link>) : null
                    }
                </div>
                <div className='grid grid-cols-1 gap-3 w-11/12 '>
                    {
                        promotions && userId && typeof promotion === "string" ? promotions.map((promotionItem) => <PromotionAgreeWith promotion={promotionItem} userId={userId} promotionKey={promotion} />) : <h2>{t("unavailable")}</h2>
                    }
                </div>
            </div>
        )
    } else {
        return (



            <div className='bg-blue-950 bg-opacity-45 min-h-screen flex flex-col items-center py-5 z-0'>
                <div className="w-11/12 flex justify-between items-center">
                    <h1 className="text-xl text-start  my-3 font-semibold">{t(promotionName)}</h1>
                    <>
                        {
                            promotion === "collaboration" && <Link
                                to={`/user/${userId}/create/${promotion}`}
                                className="text-white bg-gray-700   focus:ring-4  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-white hover:text-gray-800 focus:outline-none focus:ring-gray-800"
                            >
                                {t("create")}
                            </Link>
                        }
                    </>
                </div>
                <div className='grid grid-cols-1 gap-3 w-11/12 '>
                    {
                        promotions && userId ? promotions.map((promotion) => <PromotionAgreeWith promotion={promotion} userId={userId} promotionKey={"collaboration"} />) : <h2>{t("unavailable")}</h2>
                    }
                </div>
            </div>
        )
    }
}

export default PromotionCategories




