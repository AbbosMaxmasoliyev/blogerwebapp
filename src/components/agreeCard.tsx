import React from 'react';
import { WebApp } from '../types';
import { useTranslation } from 'react-i18next';

interface UserCardProps {
    _id?: string;
    userId?: string;
    action?: string;
    is_bot?: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    name?: string;
    phoneNumber?: string;
    status?: boolean;
    language?: string;
    web_app?: WebApp
}

const UserCard: React.FC<UserCardProps> = ({ name = "", phoneNumber = "", web_app }) => {
    const { t } = useTranslation()
    const category = web_app?.category ? web_app.category : "other"
    const role = web_app?.role ? web_app.role : "other"
    const gender = web_app?.gender ? web_app.gender : "other"
    console.log(web_app);

    return (
        <div className="w-full ">
            <div className="px-6 py-4">
                <div className='flex  justify-between'>
                    <p className='text-gray-100 font-semibold truncate w-3/6'>{name}</p>

                    <p className="text-gray-300 text-base">{t(role)}</p>
                </div>
                <div className='flex  justify-between'>
                    <p className="text-gray-300 text-base">{phoneNumber}</p>

                    <p className="text-gray-300 text-base">{t(gender)}</p>
                </div>
                <p className="text-gray-300 text-base">{t(category)}</p>
            </div>
            <div className="px-6 pt-4 pb-2">

            </div>
        </div>
    );
}

export default UserCard;
