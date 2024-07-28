import React from 'react'
import { CardLinkProps } from '../types'
import { Link, useParams } from 'react-router-dom'




const CardLink: React.FC<CardLinkProps> = ({ title, description, link }) => {

    const { userId } = useParams()

    return (
        <Link to={`/user/${userId}/promotion/${link}`} className='block w-11/12'>
            <div className='w-full'>
                <div className=" max-w-sm p-6  border  rounded-lg shadow  bg-gray-800 border-gray-700 hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white">{title}</h5>
                    <p className="font-normal  text-gray-400">{description}</p>
                </div>
            </div>
        </Link>
    )
}

export default CardLink