import React from 'react'
import { Promotion } from '../types'
import ImageWithFallback from './ImageWithFallback'
import { BiSave } from 'react-icons/bi'
import { apiPostPublish } from '../services/userService'
import { Link } from 'react-router-dom'

interface PromotionProps {
    promotion: Promotion,
    publish?: boolean,
    submitNext?: Function,
    proKey?: string,
    userId?: string,
    promotionType?: string
}

const CardPromotion: React.FC<PromotionProps> = ({ promotion, publish, proKey, submitNext, userId, promotionType }) => {


    const handleSave = () => {
        if (proKey) {
            try {
                let responsePublish = apiPostPublish({ promoId: promotion._id, promoKey: proKey })
                console.log(responsePublish);
                if (submitNext) {
                    submitNext()
                }
            } catch (error) {

            }
        }


    }

    return (


        <div className="max-w-sm w-11/12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full h-[250px]">
                <ImageWithFallback
                    src={promotion.img}
                    fallbackSrc={"https://picsum.photos/450/350"}
                    alt="Example Image"
                />
            </div>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{promotion.title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{promotion.description}</p>


                {publish ? <form className="max-w-sm mx-auto">
                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input id={promotion.owner} type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        </div>
                        <label htmlFor={promotion.owner} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Статус</label>
                    </div>
                </form>
                    :
                    null}
                <div className="inline-flex gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">


                    {
                        publish ?
                            <button className='flex gap-2' onClick={handleSave}>
                                Публиковать
                                <BiSave className='text-lg' />
                            </button>
                            : <Link to={`/user/${userId}/promotion/${promotionType}/view/${promotion._id}`} className='flex gap-2'>
                                Read More
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                    }


                </div>
            </div>
        </div>

    )
}

export default CardPromotion