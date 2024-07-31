import React from 'react';
import { User } from '../types';
import UserCard from './agreeCard';
import { useTranslation } from 'react-i18next';

interface PromotioCardProps {
    title: string;
    description: string;
    price: number;
    category: string;
    agree?: User[] | null | string
}

const PromotionCard: React.FC<PromotioCardProps> = ({ title, description, price, category, agree }) => {
    const { t } = useTranslation()
    return (
        <div className="rounded overflow-hidden shadow-lg bg-gray-800  w-full ">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-white">{title}</div>
                <p className="text-gray-300 text-base">{description}</p>
                <p className="text-gray-100 font-bold text-lg">$ {price}</p>
                <p className="text-gray-400 text-sm">{t(category)}</p>
            </div>
            <h1 className='text-center font-semibold'>{t("agreed")}</h1>
            {
                typeof agree != "string" && agree && agree.length ?

                    <>
                        {agree.map(agreeUser => <UserCard name={`${agreeUser.firstName} ${agreeUser.lastName}`} phoneNumber={agreeUser.phoneNumber} web_app={agreeUser.web_app} />)}
                    </>
                    :
                    <h1 className='px-6 py-4'>{t("unavailable")}</h1>

            }
        </div>
    );
}

export default PromotionCard;
