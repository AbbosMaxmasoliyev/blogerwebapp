export interface CardLinkProps {
    title: string,
    description: string,
    link: string
}




export interface WebApp {
    gender: string;
    role: string;
    youtube: string;
    category: string;
    instagram: string;
    telegram: string;
    you_tube_price: number | null;
    instagram_reels_price: number | null;
    instagram_stories_price: number;
    instagram_post_price: number | null;
    telegram_post_price: number | null;
    userTelegramId: string;
}

export interface User {
    active?: boolean
    web_app: WebApp;
    _id: string;
    userId: string;
    action: string;
    is_bot: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    status: boolean;
    language?: string
}




export interface Promotion {
    _id: string;
    title: string;
    img: string;
    price: number;
    description: string;
    category: string;
    date: string
    owner: string | User
    agree: null | string | User[];
    status: boolean;
    __v: number;
}



export interface PromotionObject {
    title: string,
    link: string,
    description: string
}