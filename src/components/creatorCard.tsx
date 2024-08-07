import React, { useState } from 'react';
import { User } from '../types';
import { useTranslation } from 'react-i18next';
import { CgChevronDoubleDown } from 'react-icons/cg';

const CreaterCard: React.FC<User> = (user) => {
    const { t } = useTranslation()
    const [more, setMore] = useState<boolean>(false)
    return (
        <div className="flex flex-col justify-center items-center ">
            {user ? (
                <div className="   overflow-hidden w-full max-w-md transition-all duration-75">
                    <div className=" flex flex-col justify-between items-start  px-4 py-4">
                        <p className='self-start'>{t("owner")}</p>
                        {/* <img
                            src="https://via.placeholder.com/150"
                            alt={`${user.firstName} ${user.lastName}`}
                            className="w-32 h-32 rounded-full border-4 border-white"
                        /> */}
                        <h1 className="text-white text-2xl  cursor-pointer flex justify-between items-center w-full" onClick={() => setMore(!more)}>
                            <span>
                                {user.firstName} {user.lastName}
                            </span>
                            <CgChevronDoubleDown />
                        </h1>
                        {/* <button

                            className='flex hover:outline-none bg-gray-500 hover:border-transparent p-2 focus:outline-none'
                        >
                            More
                            <BiChevronLeft style={{ fontSize: "25px" }} className={`${more ? "-rotate-90" : ""} transition-all `} />

                        </button> */}
                    </div>
                    {
                        more ?
                            <>
                                <div className='pl-4'>
                                    <p className="text-blue-200 mt-2">{user.phoneNumber}</p>
                                    <p className="text-blue-200">{user.web_app.role}</p>
                                </div>
                                <div className="p-4">
                                    <h2 className="text-xl font-bold text-white">{t("about")}</h2>
                                    <p className="text-white mt-2">{t("gender")}: {t(user.web_app.gender)}</p>
                                    <p className="text-white">{t("category")}: {t(user.web_app.category)}</p>
                                </div>
                                {/* <div className="p-4 border-t border-gray-200">
                                    <h2 className="text-xl font-bold text-white">{t("socials")}</h2>
                                    <div className="mt-2 flex flex-col gap-2">
                                        <a href={user.web_app.youtube} className="text-blue-500 hover:underline">
                                            YouTube
                                        </a>
                                        <a href={user.web_app.instagram} className="text-blue-500 hover:underline">
                                            Instagram
                                        </a>
                                        <a href={user.web_app.telegram} className="text-blue-500 hover:underline">
                                            Telegram
                                        </a>
                                    </div>
                                </div> */}
                            </> : null
                    }
                    {/* <div className="p-4 border-t border-gray-200">
                        <h2 className="text-xl font-bold text-white">Pricing</h2>
                        <div className="mt-2 text-white">
                        <p>YouTube Price: {user.web_app.you_tube_price ? `$${user.web_app.you_tube_price}` : 'N/A'}</p>
                        <p>Instagram Reels Price: {user.web_app.instagram_reels_price ? `$${user.web_app.instagram_reels_price}` : 'N/A'}</p>
                            <p>Instagram Stories Price: ${user.web_app.instagram_stories_price}</p>
                            <p>Instagram Post Price: {user.web_app.instagram_post_price ? `$${user.web_app.instagram_post_price}` : 'N/A'}</p>
                            <p>Telegram Post Price: {user.web_app.telegram_post_price ? `$${user.web_app.telegram_post_price}` : 'N/A'}</p>
                        </div>
                    </div> */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default CreaterCard;
