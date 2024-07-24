import React from 'react'
import { CardLinkProps } from '../types'
import { Link, useParams } from 'react-router-dom'
import { FiExternalLink } from "react-icons/fi";




const CardLink: React.FC<CardLinkProps> = ({ title, description, link }) => {

    const { userId } = useParams()

    return (
        <div className='w-11/12'>
            <div className=" max-w-sm p-6  border  rounded-lg shadow  bg-gray-800 border-gray-700 hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white">{title}</h5>
                <p className="font-normal  text-gray-400">{description}</p>
                <Link to={`user/${userId}/for-me/${link}`} >
                    <button  className='p-1 bg-opacity-40 border border-blue-900 mt-2'>
                        <FiExternalLink  className='text-xl'/>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default CardLink