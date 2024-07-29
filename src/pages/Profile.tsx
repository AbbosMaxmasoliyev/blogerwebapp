import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { apiGetCategories, apiGetRoles, apiGetUserWithUserId, apiUpdateUser } from '../services/userService';
import { useParams } from 'react-router-dom';
import { openNotification } from '../utils/openNotifications';
import { ToastContainer } from 'react-toastify';

interface WebApp {
    gender?: string;
    role?: string;
    youtube?: string;
    category?: string;
    instagram?: string;
    telegram?: string;
    you_tube_price?: number | 0;
    instagram_reels_price?: number | 0;
    instagram_stories_price?: number | 0;
    instagram_post_price?: number | 0;
    telegram_post_price?: number | 0;
    userTelegramId?: string;
}

export interface UserProps {
    web_app?: WebApp;
    _id?: string;
    userId?: string;
    action?: string;
    is_bot?: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
}

const validationSchema = Yup.object({
    firstName: Yup.string().required('Имя обязательно для заполнения'),
    lastName: Yup.string().required('Фамилия обязательна для заполнения'),
    web_app: Yup.object({
        gender: Yup.string().required('Пол обязателен для заполнения'),
        role: Yup.string().required('Роль обязательна для заполнения'),
        youtube: Yup.string().url('Неверный URL'),
        category: Yup.string().required('Категория обязательна для заполнения'),
        instagram: Yup.string().url('Неверный URL'),
        telegram: Yup.string().url('Неверный URL'),
        you_tube_price: Yup.number().nullable(),
        instagram_reels_price: Yup.number().nullable(),
        instagram_stories_price: Yup.number().nullable(),
        instagram_post_price: Yup.number().nullable(),
        telegram_post_price: Yup.number().nullable(),
    }),
});

interface RoleOrCategory {
    value: string,
    label: string
}

const Profile = () => {
    const params = useParams();
    const [user, setUser] = useState<UserProps | null>(null);
    const [roles, setRoles] = useState<RoleOrCategory[] | null>(null);
    const [categories, setCategories] = useState<RoleOrCategory[] | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const getUser = () => {
        apiGetUserWithUserId({ id: params.userId, beforeFunction: setUser });
    };

    const handleSubmit = async (values: UserProps) => {
        if (params.userId) {
            try {
                let response = await apiUpdateUser({ id: params.userId, beforeFunction: getUser, data: values });

                if (response.success === true) {
                    openNotification({ type: "success", message: "Изменения успешно сохранены" });
                    setIsEditing(false); // After successful submission, switch back to view mode
                }
            } catch (error) {
                openNotification({ type: "error", message: "Не удалось сохранить изменения" });
            }
        }
    };

    useEffect(() => {
        getUser();
        apiGetRoles({ beforeFunction: setRoles });
        apiGetCategories({ beforeFunction: setCategories });
    }, []);

    return (
        <div className="bg-blue-950 bg-opacity-45 w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
            <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                <div className="p-0 md:p-4 w-full">
                    <div className="w-full px-6 pb-8 mt-8 sm:rounded-lg">

                        <div className="flex justify-between mb-4  w-full items-center">
                            <h2 className="text-white text-lg font-bold sm:text-xl">Ваш профиль</h2>
                            {
                                !isEditing ?
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-[5px] py-[10px] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Редактировать
                                    </button> : null
                            }
                        </div>

                        <div className="grid max-w-2xl mx-auto mt-8">
                            {user ? (
                                <>
                                    {!isEditing ? (
                                        <div>

                                            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                                <div className="w-full">
                                                    <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                        <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>Ваше имя:</strong>
                                                        <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                            {user.firstName}
                                                        </p>
                                                    </div>
                                                    <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                        <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>Ваша фамилия:</strong>
                                                        <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                            {user.lastName}
                                                        </p>
                                                    </div>
                                                    <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                        <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>Номер телефона:</strong>
                                                        <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                            {user.phoneNumber}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-2 sm:mb-6">
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2 ">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>Пол:</strong>

                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {user.web_app?.gender ? user.web_app?.gender === 'male' ? 'Мужской' : 'Женский' : "Недоступно"}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>Роль:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {roles?.find(role => role.value === user.web_app?.role ? user.web_app?.role : "Недоступно")?.label}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>Категория:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {categories?.find(category => category.value === user.web_app?.category ? user.web_app?.category : "Недоступно")?.label}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>Ссылка на YouTube:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {user.web_app?.youtube ? user.web_app?.youtube : "Недоступно"}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>Ссылка на Instagram:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {user.web_app?.instagram ? user.web_app?.instagram : "Недоступно"}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>Ссылка на Telegram:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {user.web_app?.telegram ? user.web_app?.telegram : "Недоступно"}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>Цена за YouTube видео:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {user.web_app?.you_tube_price ? user.web_app?.you_tube_price : "Недоступно"}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>Цена за Instagram Reels:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {user.web_app?.instagram_reels_price ? user.web_app?.instagram_reels_price : "Недоступно"}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>Цена за Instagram Stories:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {user.web_app?.instagram_stories_price ? user.web_app?.instagram_stories_price : "Недоступно"}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>Цена за Instagram Post:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {user.web_app?.instagram_post_price ? user.web_app?.instagram_post_price : "Недоступно"}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>Цена за Telegram Post:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {user.web_app?.telegram_post_price ? user.web_app?.telegram_post_price : "Недоступно"}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    ) : (
                                        <Formik
                                            initialValues={user}
                                            validationSchema={validationSchema}
                                            onSubmit={handleSubmit}
                                        >
                                            {({ }) => (
                                                <Form className="items-center mt-8 sm:mt-14 text-[#202142]">
                                                    <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                                        <div className="w-full">
                                                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                                Ваше имя
                                                            </label>
                                                            <Field
                                                                type="text"
                                                                id="firstName"
                                                                name="firstName"
                                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                                placeholder="Ваше имя"
                                                            />
                                                            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                                                        </div>
                                                        <div className="w-full">
                                                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                                Ваша фамилия
                                                            </label>
                                                            <Field
                                                                type="text"
                                                                id="lastName"
                                                                name="lastName"
                                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                                placeholder="Ваша фамилия"
                                                            />
                                                            <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                                                        </div>
                                                    </div>

                                                    <div className="mb-2 sm:mb-6">
                                                        <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                            Номер телефона
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            id="phoneNumber"
                                                            name="phoneNumber"
                                                            disabled
                                                            className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light dark:text-slate-400"
                                                            placeholder="Ваш номер телефона"
                                                        />
                                                    </div>

                                                    <div className="mb-2 sm:mb-6">
                                                        <label htmlFor="web_app.gender" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                            Пол
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            id="web_app.gender"
                                                            name="web_app.gender"
                                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                            placeholder="Пол"
                                                        >
                                                            <option value="male">Мужской</option>
                                                            <option value="female">Женский</option>
                                                        </Field>
                                                        <ErrorMessage name="web_app.gender" component="div" className="text-red-500 text-sm" />
                                                    </div>

                                                    <div className="mb-2 sm:mb-6">
                                                        <label htmlFor="web_app.role" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                            Роль
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            id="web_app.role"
                                                            name="web_app.role"
                                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                            placeholder="Роль"
                                                        >
                                                            {
                                                                roles?.map(role => <option key={role.value} value={role.value}>{role.label}</option>)
                                                            }
                                                        </Field>
                                                        <ErrorMessage name="web_app.role" component="div" className="text-red-500 text-sm" />
                                                    </div>

                                                    <div className="mb-2 sm:mb-6">
                                                        <label htmlFor="web_app.category" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                            Категория
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            id="web_app.category"
                                                            name="web_app.category"
                                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                            placeholder="Категория"
                                                        >
                                                            {
                                                                categories?.map(category => <option key={category.value} value={category.value}>{category.label}</option>)
                                                            }
                                                        </Field>
                                                        <ErrorMessage name="web_app.category" component="div" className="text-red-500 text-sm" />
                                                    </div>

                                                    <div className="mb-2 sm:mb-6">
                                                        <label htmlFor="web_app.youtube" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                            Ссылка на YouTube
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            id="web_app.youtube"
                                                            name="web_app.youtube"
                                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                            placeholder="Ссылка на YouTube"
                                                        />
                                                        <ErrorMessage name="web_app.youtube" component="div" className="text-red-500 text-sm" />
                                                    </div>

                                                    <div className="mb-2 sm:mb-6">
                                                        <label htmlFor="web_app.instagram" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                            Ссылка на Instagram
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            id="web_app.instagram"
                                                            name="web_app.instagram"
                                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                            placeholder="Ссылка на Instagram"
                                                        />
                                                        <ErrorMessage name="web_app.instagram" component="div" className="text-red-500 text-sm" />
                                                    </div>

                                                    <div className="mb-2 sm:mb-6">
                                                        <label htmlFor="web_app.telegram" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                            Ссылка на Telegram
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            id="web_app.telegram"
                                                            name="web_app.telegram"
                                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                            placeholder="Ссылка на Telegram"
                                                        />
                                                        <ErrorMessage name="web_app.telegram" component="div" className="text-red-500 text-sm" />
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0">
                                                        <div className="w-full mb-2 sm:mb-6">
                                                            <label htmlFor="web_app.you_tube_price" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                                Цена за YouTube видео
                                                            </label>
                                                            <Field
                                                                type="number"
                                                                id="web_app.you_tube_price"
                                                                name="web_app.you_tube_price"
                                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                                placeholder="Цена за YouTube видео"
                                                            />
                                                            <ErrorMessage name="web_app.you_tube_price" component="div" className="text-red-500 text-sm" />
                                                        </div>
                                                        <div className="w-full mb-2 sm:mb-6">
                                                            <label htmlFor="web_app.instagram_reels_price" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                                Цена за Instagram Reels
                                                            </label>
                                                            <Field
                                                                type="number"
                                                                id="web_app.instagram_reels_price"
                                                                name="web_app.instagram_reels_price"
                                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                                placeholder="Цена за Instagram Reels"
                                                            />
                                                            <ErrorMessage name="web_app.instagram_reels_price" component="div" className="text-red-500 text-sm" />
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0">
                                                        <div className="w-full mb-2 sm:mb-6">
                                                            <label htmlFor="web_app.instagram_stories_price" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                                Цена за Instagram Stories
                                                            </label>
                                                            <Field
                                                                type="number"
                                                                id="web_app.instagram_stories_price"
                                                                name="web_app.instagram_stories_price"
                                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                                placeholder="Цена за Instagram Stories"
                                                            />
                                                            <ErrorMessage name="web_app.instagram_stories_price" component="div" className="text-red-500 text-sm" />
                                                        </div>
                                                        <div className="w-full mb-2 sm:mb-6">
                                                            <label htmlFor="web_app.instagram_post_price" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                                Цена за Instagram Post
                                                            </label>
                                                            <Field
                                                                type="number"
                                                                id="web_app.instagram_post_price"
                                                                name="web_app.instagram_post_price"
                                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                                placeholder="Цена за Instagram Post"
                                                            />
                                                            <ErrorMessage name="web_app.instagram_post_price" component="div" className="text-red-500 text-sm" />
                                                        </div>
                                                    </div>

                                                    <div className="mb-2 sm:mb-6">
                                                        <label htmlFor="web_app.telegram_post_price" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                            Цена за Telegram Post
                                                        </label>
                                                        <Field
                                                            type="number"
                                                            id="web_app.telegram_post_price"
                                                            name="web_app.telegram_post_price"
                                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                            placeholder="Цена за Telegram Post"
                                                        />
                                                        <ErrorMessage name="web_app.telegram_post_price" component="div" className="text-red-500 text-sm" />
                                                    </div>

                                                    <div className="flex justify-center gap-3">
                                                        <button
                                                            onClick={() => setIsEditing(false)}
                                                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300   dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 font-medium rounded-lg text-sm px-5 py-2.5"
                                                        >
                                                            Отмена
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                        >
                                                            Сохранить
                                                        </button>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    )}
                                </>
                            ) : (
                                <p>Загрузка...</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <ToastContainer />
        </div>
    );
};

export default Profile;
