import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaYoutube, FaInstagram, FaTelegram } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import BaseService from '../services/config';
import { apiGetUserWithUserId } from '../services/userService';
import { User } from '../types';



export const Loading = () => {
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
                <p className="text-xl font-bold font-awesome text-white text-center">Загрузка...</p>
            </div>
        </div>
    );
};

const Success = () => {
    return (
        <div id="success" className="w-full flex justify-center p-6  flex-col items-center  min-h-screen ">
            <div
                className="flex flex-col items-center justify-center flex-shrink-0  rounded-lg text-green-500 w-6/12 h-32">
                <svg className="w-32 h-32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <p className="text-xl font-bold font-awesome text-white text-center">Выполнено успешно</p>
            </div>
        </div>
    );
};


const Available = () => {
    return (
        <div id="success" className="w-full flex justify-center p-6  flex-col items-center  min-h-screen ">
            <div
                className="flex flex-col items-center justify-center flex-shrink-0  rounded-lg text-green-500 w-6/12 h-32">
                <svg className="w-32 h-32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <p className="text-xl font-bold font-awesome text-white text-center">Вы зарегистрированы</p>
            </div>
        </div>
    );
};

export const Error = () => {
    return (
        <div id="error" className="w-full flex justify-center p-6 min-h-screen">
            <div
                className="flex flex-col items-center justify-center flex-shrink-0 text-red-500 rounded-lg  w-6/12 h-32">
                <svg className="w-32 h-32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                </svg>
                <p className="text-xl font-bold font-awesome text-white">Неуспешный</p>
            </div>
        </div>
    );
};




const Bot = () => {

    const [status, setStatus] = useState("form")
    const [user, setUser] = useState<User | "failed" | "loading">("loading")
    const { userId } = useParams()
    const getUser = async () => {
        try {
            await apiGetUserWithUserId({ id: userId, beforeFunction: setUser })

        } catch (error) {
            setUser("failed")
        }
    }

    useEffect(() => {
        getUser()
    }, [])

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
            category: Yup.string().required('Категория обязательна'),
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
            }

        }
    });
    if (status === "error" || user === "failed") {
        return (<Error />)
    }
    if (status === "success") {
        return (<Success />)
    }
    if (status === "loading" || user === "loading") {
        return <Loading />
    }
    if (user.web_app.gender) {
        return (<Available />)
    }
    if (status === "form" && !user.web_app.gender) {
        return (
            <section className="bg-gray-900 w-full min-h-screen flex flex-col justify-center items-center">
                <div className="flex md:w-8/12 w-full flex-col items-center min-h-screen justify-center px-6 py-8 mx-auto lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Bloger Agency
                    </a>
                    <div className="rounded-lg shadow border md:mt-0 w-full xl:p-0 bg-gray-800 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className=" font-bold leading-tight tracking-tight text-2xl text-white">Создать аккаунт</h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                                <div className="flex justify-start gap-2">
                                    <p className="block mb-2 text-xl font-medium text-white">Пол:</p>
                                    <div className="flex gap-3 items-center">
                                        <input
                                            id="male-radio"
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="male-radio" className="ms-2 text-lg font-medium text-gray-300">Мужчина</label>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <input
                                            id="female-radio"
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="female-radio" className="ms-2 text-lg font-medium text-gray-300">Женщина</label>
                                    </div>
                                </div>
                                {formik.touched.gender && formik.errors.gender ? <div className="text-red-500 text-sm">{formik.errors.gender}</div> : null}

                                <div className="flex items-start justify-between flex-col gap-2">
                                    <label htmlFor="direction" className="block text-xl font-medium text-white">Роль:</label>
                                    <div className="flex gap-3 items-center">
                                        <input
                                            id="bloger-radio"
                                            type="radio"
                                            name="role"
                                            value="bloger"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="bloger-radio" className="ms-2 text-lg font-medium text-gray-300">Блогер</label>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <input
                                            id="freelancer-radio"
                                            type="radio"
                                            name="role"
                                            value="freelancer"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="freelancer-radio" className="ms-2 text-lg font-medium text-gray-300">Фрилансер</label>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <input
                                            id="reklama-radio"
                                            type="radio"
                                            name="role"
                                            value="reklama"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="reklama-radio" className="ms-2 text-lg font-medium text-gray-300">Рекламодатель</label>
                                    </div>
                                    <div className='flex gap-3 flex-col items-start w-full'>
                                        <label htmlFor="countries" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Выберите категорию</label>
                                        <select
                                            id="category"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option >Выберите категорию</option>
                                            <option value="sport">Sport</option>
                                            <option value="fitness">Fitness</option>
                                            <option value="it">IT </option>
                                        </select>
                                    </div>
                                </div>
                                {formik.touched.role && formik.errors.role ? <div className="text-red-500 text-sm">{formik.errors.role}</div> : null}

                                <div>
                                    <label htmlFor="youtube" className="flex items-center mb-2 text-xl font-medium font-sans text-white">
                                        <FaYoutube className="mr-2" style={{ color: 'red' }} /> YouTube
                                    </label>
                                    <input
                                        type="text"
                                        name="youtube"
                                        id="youtube"
                                        placeholder="YouTube профиль"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.youtube}
                                        className="bg-gray-700 border border-gray-600 text-gray-300 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                    {formik.touched.youtube && formik.errors.youtube ? <div className="text-red-500 text-sm">{formik.errors.youtube}</div> : null}
                                </div>

                                <div>
                                    <label htmlFor="instagram" className="flex items-center mb-2 text-xl font-medium font-sans text-white">
                                        <FaInstagram className="mr-2" style={{ color: 'pink' }} /> Instagram
                                    </label>
                                    <input
                                        type="text"
                                        name="instagram"
                                        id="instagram"
                                        placeholder="Instagram профиль"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.instagram}
                                        className="bg-gray-700 border border-gray-600 text-gray-300 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                    {formik.touched.instagram && formik.errors.instagram ? <div className="text-red-500 text-sm">{formik.errors.instagram}</div> : null}
                                </div>

                                <div>
                                    <label htmlFor="telegram" className="flex items-center mb-2 text-xl font-medium font-sans text-white">
                                        <FaTelegram className="mr-2" style={{ color: 'skyblue' }} /> Telegram
                                    </label>
                                    <input
                                        type="text"
                                        name="telegram"
                                        id="telegram"
                                        placeholder="Telegram профиль"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.telegram}
                                        className="bg-gray-700 border border-gray-600 text-gray-300 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                    {formik.touched.telegram && formik.errors.telegram ? <div className="text-red-500 text-sm">{formik.errors.telegram}</div> : null}
                                </div>

                                <div>
                                    <label htmlFor="youtube-price" className="block mb-2  font-medium font-sans text-white text-xl">Цена на YouTube:</label>
                                    <input
                                        type="number"
                                        name="you_tube_price"
                                        id="youtube-price"
                                        placeholder="Цена"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.you_tube_price}
                                        className="bg-gray-700 border border-gray-600 text-gray-300 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                    {formik.touched.you_tube_price && formik.errors.you_tube_price ? <div className="text-red-500 text-sm">{formik.errors.you_tube_price}</div> : null}
                                </div>

                                <div>
                                    <label htmlFor="instagram-reels-price" className="block mb-2  font-medium font-sans text-white text-xl">Цена на Instagram Reels:</label>
                                    <input
                                        type="number"
                                        name="instagram_reels_price"
                                        id="instagram-reels-price"
                                        placeholder="Цена"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.instagram_reels_price}
                                        className="bg-gray-700 border border-gray-600 text-gray-300 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                    {formik.touched.instagram_reels_price && formik.errors.instagram_reels_price ? <div className="text-red-500 text-sm">{formik.errors.instagram_reels_price}</div> : null}
                                </div>

                                <div>
                                    <label htmlFor="instagram-stories-price" className="block mb-2  font-medium font-sans text-white text-xl">Цена на Instagram Stories:</label>
                                    <input
                                        type="number"
                                        name="instagram_stories_price"
                                        id="instagram-stories-price"
                                        placeholder="Цена"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.instagram_stories_price}
                                        className="bg-gray-700 border border-gray-600 text-gray-300 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                    {formik.touched.instagram_stories_price && formik.errors.instagram_stories_price ? <div className="text-red-500 text-sm">{formik.errors.instagram_stories_price}</div> : null}
                                </div>

                                <div>
                                    <label htmlFor="instagram-post-price" className="block mb-2  font-medium font-sans text-white text-xl">Цена на Instagram Post:</label>
                                    <input
                                        type="number"
                                        name="instagram_post_price"
                                        id="instagram-post-price"
                                        placeholder="Цена"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.instagram_post_price}
                                        className="bg-gray-700 border border-gray-600 text-gray-300 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                    {formik.touched.instagram_post_price && formik.errors.instagram_post_price ? <div className="text-red-500 text-sm">{formik.errors.instagram_post_price}</div> : null}
                                </div>

                                <div>
                                    <label htmlFor="telegram-post-price" className="block mb-2  font-medium font-sans text-white text-xl">Цена на Telegram Post:</label>
                                    <input
                                        type="number"
                                        name="telegram_post_price"
                                        id="telegram-post-price"
                                        placeholder="Цена"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.telegram_post_price}
                                        className="bg-gray-700 border border-gray-600 text-gray-300 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                    {formik.touched.telegram_post_price && formik.errors.telegram_post_price ? <div className="text-red-500 text-sm">{formik.errors.telegram_post_price}</div> : null}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700"
                                >
                                    Зарегистрироваться
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
