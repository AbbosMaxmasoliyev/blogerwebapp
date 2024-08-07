import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaYoutube, FaInstagram, FaTelegram } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import BaseService, { API_PREFIX } from '../services/config';
import { apiGetCategories, apiGetUserWithUserId } from '../services/userService';
import { User } from '../types';
import axios from 'axios';
import allCategories from "../utils/category.json"
import { useTranslation } from 'react-i18next';



export const Loading = ({ t }: { t: Function }) => {
    return (
        <div id="loading" className="w-full  flex-col justify-center p-6 ">
            <div role="status" className="flex flex-col items-center justify-center min-h-screen ">
                <svg aria-hidden="true"
                    className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                </svg>
                <p className="text-xl font-bold font-awesome text-white text-center">{t("loading")}</p>
            </div>
        </div>
    );
};

const Success = ({ t }: { t: Function }) => {
    return (
        <div id="success" className="w-full flex justify-center p-6  flex-col items-center  min-h-screen ">
            <div
                className="flex flex-col items-center justify-center flex-shrink-0  rounded-lg text-green-500 w-6/12 h-32">
                <svg className="w-32 h-32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <p className="text-xl font-bold font-awesome text-white text-center">{t("success")}</p>
            </div>
        </div>
    );
};


const Available = ({ t }: { t: Function }) => {
    return (
        <div id="success" className="w-full flex justify-center p-6  flex-col items-center  min-h-screen ">
            <div
                className="flex flex-col items-center justify-center flex-shrink-0  rounded-lg text-green-500 w-6/12 h-32">
                <svg className="w-32 h-32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <p className="text-xl font-bold font-awesome text-white text-center">{t("available")}</p>
            </div>
        </div>
    );
};

export const Error = ({ t }: { t: Function }) => {
    return (
        <div id="error" className="w-full flex justify-center p-6 min-h-screen">
            <div
                className="flex flex-col items-center justify-center flex-shrink-0 text-red-500 rounded-lg  w-6/12 h-32">
                <svg className="w-32 h-32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                </svg>
                <p className="text-xl font-bold font-awesome text-white">{t("error")}</p>
            </div>
        </div>
    );
};




const Bot = () => {
    const inputRef = useRef<HTMLSelectElement | null>(null);
    const { t, i18n: { language } } = useTranslation()
    const [status, setStatus] = useState("form")
    const [user, setUser] = useState<User | "failed" | "loading">("loading")
    const [category, setCategory] = useState<"bloger" | "reklama" | "freelancer" | null>(null)

    const { userId } = useParams()




    const getUser = async () => {
        try {
            await apiGetUserWithUserId({ id: userId, beforeFunction: setUser })

        } catch (error) {
            setUser("failed")
        }
    }


    const sendMessageToBot = async () => {
        try {
            const userId = window.Telegram?.WebApp?.initDataUnsafe.user.id;
            await axios.post(`${API_PREFIX}/close`, { userId }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error sending message to bot:', error);
        }
    };

    const handleClose = () => {



        const timer = setTimeout(() => {
            sendMessageToBot();
            window.Telegram?.WebApp.close();
        }, 2000);

        // Komponent unmounted bo'lganda timer'ni tozalash
        return () => clearTimeout(timer);
    };

    useEffect(() => {

        // Telegram Web App tayyor ekanligini bildirish
        if (window.Telegram?.WebApp) {
            window.Telegram?.WebApp.ready();
            getUser()
        }


    }, []);



    // Tugma bosilganda Telegram Web App'ni yopish va botga xabar yuborish





    const formik = useFormik({
        initialValues: {
            gender: '',
            role: '',
            youtube: '',
            category: '',
            instagram: '',
            telegram: '',
            you_tube_price: '',
            instagram_reels_price: '',
            instagram_stories_price: '',
            instagram_post_price: '',
            telegram_post_price: ''
        },
        validationSchema: Yup.object({
            gender: Yup.string().required('Пол обязателен'),
            role: Yup.string().required('Роль обязательна'),
            category: Yup.string().min(3).required('Категория обязательна'),
            youtube: Yup.string(),
            instagram: Yup.string(),
            telegram: Yup.string(),
            you_tube_price: Yup.number().positive('Цена должна быть положительной'),
            instagram_reels_price: Yup.number().positive('Цена должна быть положительной'),
            instagram_stories_price: Yup.number().positive('Цена должна быть положительной'),
            instagram_post_price: Yup.number().positive('Цена должна быть положительной'),
            telegram_post_price: Yup.number().positive('Цена должна быть положительной')
        }),
        onSubmit: async (values) => {
            setStatus("loading")
            let response = await BaseService.post(`/users/web/${userId}`, { ...values, action: 'web' })
            if (response.status === 200) {
                setStatus("success")
                setTimeout(() => {
                    handleClose()
                }, 2000)
            }

        }
        ,

    });

    useEffect(() => {

        if (inputRef.current) {
            inputRef.current.value = t("category_select")
        }


    }, [category]);

    if (status === "error" || user === "failed") {
        return (<Error t={t} />)
    }
    if (status === "success") {
        return (<Success t={t} />)
    }
    if (status === "loading" || user === "loading") {
        return <Loading t={t} />
    }
    if (user.web_app.gender) {
        return (<Available t={t} />)
    }


    const hanldeChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue("role", e.currentTarget.value)
        if (e.target.value === "bloger" || e.target.value === "freelancer" || e.target.value === "reklama") {

            setCategory(e.target.value)
        }
    }


    if (status === "form" && !user?.web_app.gender) {
        return (
            <section className="bg-gray-900 w-full  min-h-screen flex flex-col justify-center items-center py-12">
                <div className="flex md:w-8/12 w-full flex-col items-center min-h-screen justify-center  mx-auto lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white gap-2">

                        <div
                            className='w-7 h-8 overflow-x-hidden z-1  block '
                        >
                            <img

                                src="https://optim.tildacdn.one/tild3461-3433-4965-a238-333336363931/-/resize/284x/-/format/webp/bloger-agency-logo-0.png"
                                className="mr-3  sm:h-9 h-full  max-w-[175px] block    z-0"
                                alt="Flowbite Logo"
                            />
                        </div>
                        Bloger Agency
                    </a>
                    <div className="md:rounded-lg shadow md:border md:mt-0 w-full xl:p-0 bg-gray-800 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className=" font-bold leading-tight tracking-tight text-2xl text-white font-mont">{t("create_account")}</h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                                <div className="flex justify-start gap-2">
                                    <p className="block mb-2 text-xl font-medium text-white font-mont">{t("gender")}</p>
                                    <div className="flex gap-3 items-center">
                                        <input
                                            id="male-radio"
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-b-gray-700 dark:border-b-gray-600 font-mont"
                                        />
                                        <label htmlFor="male-radio" className="ms-2 text-lg font-medium text-gray-300 font-mont">{t("male")}</label>
                                    </div>

                                    <div className="flex gap-3 items-center">
                                        <input
                                            id="female-radio"
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-b-gray-700 dark:border-b-gray-600 font-mont"
                                        />
                                        <label htmlFor="female-radio" className="ms-2 text-lg font-medium text-gray-300 font-mont">{t("female")}</label>
                                    </div>
                                </div>
                                {formik.touched.gender && formik.errors.gender ? <div className="text-red-500 text-sm font-mont">{formik.errors.gender}</div> : null}

                                <div className="flex items-start justify-between flex-col gap-2">
                                    <label htmlFor="direction" className="block text-xl font-medium text-white font-mont">{t("role")}:</label>
                                    <div className="flex gap-3 items-center">
                                        <input
                                            id="bloger-radio"
                                            type="radio"
                                            name="role"
                                            value="bloger"
                                            onChange={hanldeChangeInput}
                                            onBlur={formik.handleBlur}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-b-gray-700 dark:border-b-gray-600 font-mont"
                                        />
                                        <label htmlFor="bloger-radio" className="ms-2 text-lg font-medium text-gray-300 font-mont">{t("bloger")}</label>
                                    </div>



                                    <div className="flex gap-3 items-center">
                                        <input
                                            id="freelancer-radio"
                                            type="radio"
                                            name="role"
                                            value="freelancer"
                                            onChange={hanldeChangeInput}
                                            onBlur={formik.handleBlur}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-b-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-b-gray-700 dark:border-b-gray-600"
                                        />
                                        <label htmlFor="freelancer-radio" className="ms-2 text-lg font-medium text-gray-300 font-mont">{t("freelancer")}</label>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <input
                                            id="reklama-radio"
                                            type="radio"
                                            name="role"
                                            value="reklama"
                                            onChange={hanldeChangeInput}
                                            onBlur={formik.handleBlur}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-b-gray-700 dark:border-b-gray-600 font-mont"
                                        />
                                        <label htmlFor="reklama-radio" className="ms-2 text-lg font-medium text-gray-300 font-mont">{t("reklama")}</label>
                                    </div>
                                    {formik.touched.role && formik.errors.role ? <div className="text-red-500 text-sm font-mont">{formik.errors.role}</div> : null}


                                    <div className='flex gap-3 flex-col items-start w-full'>
                                        <label htmlFor="countries" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white font-mont">{t("category_select")}</label>
                                        <select
                                            id="category"
                                            ref={inputRef}
                                            className="bg-transparent text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-b-blue-900 block w-full p-2.5 dark:bg-gray-700 dark:border-b-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-b-blue-500"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option className='font-mont'>{t("category_select")}</option>
                                            {
                                                category && typeof language == "string" && (language == "uz" || language == "ru") ? allCategories[category].map(categoryItem =>
                                                    <option value={categoryItem.value} className='capitalize font-mont'>{t(categoryItem[language])}</option>
                                                ) : null
                                            }

                                        </select>
                                    </div>
                                </div>
                                {formik.touched.category && formik.errors.category ? <div className="text-red-500 text-sm font-mont">{formik.errors.category}</div> : null}

                                <div>
                                    <label htmlFor="youtube" className="flex items-center mb-2 text-xl font-medium font-mont text-white">
                                        <FaYoutube className="mr-2" style={{ color: 'red' }} /> YouTube
                                    </label>
                                    <input
                                        type="text"
                                        name="youtube"
                                        id="youtube"
                                        placeholder={t("url") + "YouTube"}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.youtube}
                                        className="bg-transparent border-b border-gray-600 text-gray-300 sm:text-sm  focus:ring-0 focus:outline-none focus:border-b-blue-500 block w-full p-2.5 font-mont"
                                    />
                                    {formik.touched.youtube && formik.errors.youtube ? <div className="text-red-500 text-sm font-mont">{formik.errors.youtube}</div> : null}
                                </div>

                                <div>
                                    <label htmlFor="instagram" className="flex items-center mb-2 text-xl font-medium font-mont text-white">
                                        <FaInstagram className="mr-2" style={{ color: 'pink' }} /> Instagram
                                    </label>
                                    <input
                                        type="text"
                                        name="instagram"
                                        id="instagram"
                                        placeholder={t("url") + "Instagram"}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.instagram}
                                        className="bg-transparent border-b border-gray-600 text-gray-300 sm:text-sm  focus:ring-0 focus:outline-none focus:border-b-blue-500 block w-full p-2.5 font-mont"
                                    />
                                    {formik.touched.instagram && formik.errors.instagram ? <div className="text-red-500 text-sm font-mont">{formik.errors.instagram}</div> : null}
                                </div>

                                <div>
                                    <label htmlFor="telegram" className="flex items-center mb-2 text-xl font-medium font-mont text-white">
                                        <FaTelegram className="mr-2" style={{ color: 'skyblue' }} /> Telegram
                                    </label>
                                    <input
                                        type="text"
                                        name="telegram"
                                        id="telegram"
                                        placeholder={t("url") + "Telegram"}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.telegram}
                                        className="bg-transparent border-b border-gray-600 text-gray-300 sm:text-sm  focus:ring-0 focus:outline-none focus:border-b-blue-500 block w-full p-2.5 font-mont"
                                    />
                                    {formik.touched.telegram && formik.errors.telegram ? <div className="text-red-500 text-sm font-mont">{formik.errors.telegram}</div> : null}
                                </div>

                                <div>
                                    <label htmlFor="youtube-price" className="block mb-2  font-medium font-mont text-white text-xl">{t("youtube_price")}:</label>
                                    <input
                                        type="number"
                                        name="you_tube_price"
                                        id="youtube-price"
                                        placeholder={t("price")}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.you_tube_price}
                                        className="bg-transparent border-b border-gray-600 text-gray-300 sm:text-sm  focus:ring-0 focus:outline-none focus:border-b-blue-500 block w-full p-2.5 font-mont"
                                    />
                                    {formik.touched.you_tube_price && formik.errors.you_tube_price ? <div className="text-red-500 text-sm font-mont">{formik.errors.you_tube_price}</div> : null}
                                </div>

                                <div>
                                    <label htmlFor="instagram-reels-price" className="block mb-2  font-medium font-mont text-white text-xl">{t("instagram_reels_price")}:</label>
                                    <input
                                        type="number"
                                        name="instagram_reels_price"
                                        id="instagram-reels-price"
                                        placeholder={t("price")}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.instagram_reels_price}
                                        className="bg-transparent border-b border-gray-600 text-gray-300 sm:text-sm  focus:ring-0 focus:outline-none focus:border-b-blue-500 block w-full p-2.5 font-mont"
                                    />
                                    {formik.touched.instagram_reels_price && formik.errors.instagram_reels_price ? <div className="text-red-500 text-sm font-mont">{formik.errors.instagram_reels_price}</div> : null}
                                </div>

                                <div>
                                    <label htmlFor="instagram-stories-price" className="block mb-2  font-medium font-mont text-white text-xl">{t("instagram_stories_price")}:</label>
                                    <input
                                        type="number"
                                        name="instagram_stories_price"
                                        id="instagram-stories-price"
                                        placeholder={t("price")}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.instagram_stories_price}
                                        className="bg-transparent border-b border-gray-600 text-gray-300 sm:text-sm  focus:ring-0 focus:outline-none focus:border-b-blue-500 block w-full p-2.5 font-mont"
                                    />
                                    {formik.touched.instagram_stories_price && formik.errors.instagram_stories_price ? <div className="text-red-500 text-sm font-mont">{formik.errors.instagram_stories_price}</div> : null}
                                </div>

                                <div>
                                    <label htmlFor="instagram-post-price" className="block mb-2  font-medium font-mont text-white text-xl">{t("instagram_stories_price")}:</label>
                                    <input
                                        type="number"
                                        name="instagram_post_price"
                                        id="instagram-post-price"
                                        placeholder={t("price")}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.instagram_post_price}
                                        className="bg-transparent border-b border-gray-600 text-gray-300 sm:text-sm  focus:ring-0 focus:outline-none focus:border-b-blue-500 block w-full p-2.5 font-mont"
                                    />
                                    {formik.touched.instagram_post_price && formik.errors.instagram_post_price ? <div className="text-red-500 text-sm font-mont">{formik.errors.instagram_post_price}</div> : null}
                                </div>

                                <div>
                                    <label htmlFor="telegram-post-price" className="block mb-2  font-medium font-mont text-white text-xl">{t("telegram_post_price")}:</label>
                                    <input
                                        type="number"
                                        name="telegram_post_price"
                                        id="telegram-post-price"
                                        placeholder={t("price")}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.telegram_post_price}
                                        className="bg-transparent border-b border-gray-600 text-gray-300 sm:text-sm  focus:ring-0 focus:outline-none focus:border-b-blue-500 block w-full p-2.5 font-mont"
                                    />
                                    {formik.touched.telegram_post_price && formik.errors.telegram_post_price ? <div className="text-red-500 text-sm font-mont">{formik.errors.telegram_post_price}</div> : null}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-2xl text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  h-12 text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 font-mont"
                                >
                                    {t("submit")}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default Bot;
