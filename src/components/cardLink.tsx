import React from 'react'
import { CardLinkProps } from '../types'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'




const CardLink: React.FC<CardLinkProps> = ({ description, link, title }) => {
    const { t } = useTranslation()

    return (
        <Link to={link} className='block w-11/12  '>
            <div className='w-full '>
                <div className=" max-w-sm p-6 rounded-2xl  shadow-2xl     bg-[#196EEE]   hover:bg-[#fcfcfc] text-white hover:text-blue-600 transition-all duration-200 ">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight  ">{title}</h5>
                    <p className="font-normal ">{t(description)}</p>
                </div>
            </div>
        </Link>
    )
}

export default CardLink