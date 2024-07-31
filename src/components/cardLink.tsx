import React from 'react'
import { CardLinkProps } from '../types'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'




const CardLink: React.FC<CardLinkProps> = ({ description, link, title }) => {
    const { t } = useTranslation()
    
    return (
        <Link to={link} className='block w-11/12'>
            <div className='w-full'>
                <div className=" max-w-sm p-6  border  rounded-lg shadow  bg-gray-800 border-gray-700 hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white">{title}</h5>
                    <p className="font-normal  text-gray-400">{t(description)}</p>
                </div>
            </div>
        </Link>
    )
}

export default CardLink