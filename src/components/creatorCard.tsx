import React from 'react';
import { User } from '../types';
const CreaterCard: React.FC<User> = (user) => {
    return (
        <div className="flex justify-center items-center">
            {user ? (
                <div className=" shadow-lg rounded-lg overflow-hidden w-full max-w-md">
                    <div className=" flex flex-col items-start pl-4">
                        {/* <img
                            src="https://via.placeholder.com/150"
                            alt={`${user.firstName} ${user.lastName}`}
                            className="w-32 h-32 rounded-full border-4 border-white"
                        /> */}
                        <h1 className="text-white text-2xl mt-4">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-blue-200 mt-2">{user.phoneNumber}</p>
                        <p className="text-blue-200">{user.web_app.role}</p>
                    </div>
                    <div className="p-4">
                        <h2 className="text-xl font-bold text-white">About</h2>
                        <p className="text-white mt-2">Gender: {user.web_app.gender}</p>
                        <p className="text-white">Category: {user.web_app.category}</p>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                        <h2 className="text-xl font-bold text-white">Social Links</h2>
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
                    </div>
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
