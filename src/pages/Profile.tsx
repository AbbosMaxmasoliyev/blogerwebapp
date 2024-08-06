import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { apiGetCategories, apiGetRoles, apiGetUserWithUserId, apiUpdateUser } from '../services/userService';
import { useParams } from 'react-router-dom';
import { openNotification } from '../utils/openNotifications';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';

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
    language?: string
}

const validationSchema = Yup.object({
    firstName: Yup.string().required('Имя обязательно для заполнения'),
    lastName: Yup.string().required('Фамилия обязательна для заполнения'),
    web_app: Yup.object({
        gender: Yup.string().required('Пол обязателен для заполнения'),
        role: Yup.string().required('Роль обязательна для заполнения'),
        youtube: Yup.string(),
        category: Yup.string().required('Категория обязательна для заполнения'),
        instagram: Yup.string(),
        telegram: Yup.string(),
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
    const { t } = useTranslation()
    const params = useParams();
    const [user, setUser] = useState<UserProps | null>(null);
    const [roles, setRoles] = useState<RoleOrCategory[] | null>(null);
    // const [categories, setCategories] = useState<RoleOrCategory[] | []>([]);
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
        // apiGetCategories({ beforeFunction: setCategories });
    }, []);

    return (
        <div className="bg-blue-950 bg-opacity-45 w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
            <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                <div className="p-0 md:p-4 w-full">
                    <div className="w-full px-6 pb-8 mt-8 sm:rounded-lg">

                        <div className="flex justify-between mb-4  w-full items-center">
                            <h2 className="text-white text-lg font-bold sm:text-xl">{t("your_data")}</h2>
                            {
                                !isEditing ?
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-[5px] py-[10px] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        {t("edit")}
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
                                                        <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>{t("your_name")}:</strong>
                                                        <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                            {user.firstName}
                                                        </p>
                                                    </div>
                                                    <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                        <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>{t("your_surname")}:</strong>
                                                        <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                            {user.lastName}
                                                        </p>
                                                    </div>
                                                    <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                        <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>{t("your_number")}:</strong>
                                                        <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                            {user.phoneNumber}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-2 sm:mb-6">
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2 ">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>{t("gender")}:</strong>

                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {user.web_app?.gender ? user.web_app?.gender === 'male' ? t("male") : t("female") : t("unavailable")}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>{t("role")}:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {roles?.find(role => role.value === user.web_app?.role ? user.web_app?.role : t("unavailable"))?.label}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>{t("category")}:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {/* {categories.find(category => category.value === user.web_app?.category ? user.web_app?.category : t("unavailable"))?.label} */}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>{t("url")} YouTube:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {user.web_app?.youtube ? user.web_app?.youtube : t("unavailable")}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>{t("url")} Instagram:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {user.web_app?.instagram ? user.web_app?.instagram : t("unavailable")}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>{t("url")} Telegram:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {user.web_app?.telegram ? user.web_app?.telegram : t("unavailable")}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>{t("price")} YouTube видео:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {user.web_app?.you_tube_price ? user.web_app?.you_tube_price : t("unavailable")}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>{t("price")} Instagram Reels:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {user.web_app?.instagram_reels_price ? user.web_app?.instagram_reels_price : t("unavailable")}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>{t("price")} Instagram Stories:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {user.web_app?.instagram_stories_price ? user.web_app?.instagram_stories_price : t("unavailable")}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>{t("price")} Instagram Post:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {user.web_app?.instagram_post_price ? user.web_app?.instagram_post_price : t("unavailable")}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-medium text-indigo-900 dark:text-white flex flex-col my-2">
                                                    <strong className='text-xl font-semibold leading-none tracking-tight text-gray-900  dark:text-white'>{t("telegram_post_price")}:</strong>
                                                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'>
                                                        {user.web_app?.telegram_post_price ? user.web_app?.telegram_post_price : t("unavailable")}
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
                                                                {t("your_name")}
                                                            </label>
                                                            <Field
                                                                type="text"
                                                                id="firstName"
                                                                name="firstName"
                                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                                placeholder={t("your_name")}
                                                            />
                                                            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                                                        </div>
                                                        <div className="w-full">
                                                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                                {t("your_surname")}
                                                            </label>
                                                            <Field
                                                                type="text"
                                                                id="lastName"
                                                                name="lastName"
                                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                                placeholder={t("your_surname")}
                                                            />
                                                            <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                                                        </div>
                                                    </div>

                                                    <div className="mb-2 sm:mb-6">
                                                        <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                            {t("your_number")}
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            id="phoneNumber"
                                                            name="phoneNumber"
                                                            disabled
                                                            className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light dark:text-slate-400"
                                                            placeholder={t("your_number")}

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
                                                            placeholder={t("gender")}
                                                        >
                                                            <option value="male">{t("male")}</option>
                                                            <option value="female">{t("female")}</option>
                                                        </Field>
                                                        <ErrorMessage name="web_app.gender" component="div" className="text-red-500 text-sm" />
                                                    </div>

                                                    <div className="mb-2 sm:mb-6">
                                                        <label htmlFor="web_app.role" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                            {t("role")}
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            id="web_app.role"
                                                            name="web_app.role"
                                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                            placeholder={t("role")}
                                                        >
                                                            {
                                                                roles?.map(role => <option key={role.value} value={role.value}>{t(role.value)}</option>)
                                                            }
                                                        </Field>
                                                        <ErrorMessage name="web_app.role" component="div" className="text-red-500 text-sm" />
                                                    </div>

                                                    <div className="mb-2 sm:mb-6">
                                                        <label htmlFor="web_app.category" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                            {t("category")}
                                                        </label>
                                                        {/* <Field
                                                            as="select"
                                                            id="web_app.category"
                                                            name="web_app.category"
                                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                            placeholder={t("category")}
                                                        >
                                                            {
                                                                categories?.map(category => <option key={category.value} value={category.value}>{t(category.value)}</option>)
                                                            }
                                                        </Field> */}
                                                        <ErrorMessage name="web_app.category" component="div" className="text-red-500 text-sm" />
                                                    </div>

                                                    <div className="mb-2 sm:mb-6">
                                                        <label htmlFor="web_app.youtube" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                            {t("url")} YouTube
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            id="web_app.youtube"
                                                            name="web_app.youtube"
                                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                            placeholder={t("url") + "YouTube"}
                                                        />
                                                        <ErrorMessage name="web_app.youtube" component="div" className="text-red-500 text-sm" />
                                                    </div>

                                                    <div className="mb-2 sm:mb-6">
                                                        <label htmlFor="web_app.instagram" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                            {t("url")} Instagram
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            id="web_app.instagram"
                                                            name="web_app.instagram"
                                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                            placeholder={t("url") + "Instagram"}
                                                        />
                                                        <ErrorMessage name="web_app.instagram" component="div" className="text-red-500 text-sm" />
                                                    </div>

                                                    <div className="mb-2 sm:mb-6">
                                                        <label htmlFor="web_app.telegram" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                            {t("url")} Telegram
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            id="web_app.telegram"
                                                            name="web_app.telegram"
                                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                            placeholder={t("url") + "Telegram"}
                                                        />
                                                        <ErrorMessage name="web_app.telegram" component="div" className="text-red-500 text-sm" />
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0">
                                                        <div className="w-full mb-2 sm:mb-6">
                                                            <label htmlFor="web_app.you_tube_price" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                                {t("youtube_price")}
                                                            </label>
                                                            <Field
                                                                type="number"
                                                                id="web_app.you_tube_price"
                                                                name="web_app.you_tube_price"
                                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                                placeholder={t("youtube_price")}
                                                            />
                                                            <ErrorMessage name="web_app.you_tube_price" component="div" className="text-red-500 text-sm" />
                                                        </div>
                                                        <div className="w-full mb-2 sm:mb-6">
                                                            <label htmlFor="web_app.instagram_reels_price" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                                {t("instagram_reels_price")}
                                                            </label>
                                                            <Field
                                                                type="number"
                                                                id="web_app.instagram_reels_price"
                                                                name="web_app.instagram_reels_price"
                                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                                placeholder={t("instagram_reels_price")}
                                                            />
                                                            <ErrorMessage name="web_app.instagram_reels_price" component="div" className="text-red-500 text-sm" />
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0">
                                                        <div className="w-full mb-2 sm:mb-6">
                                                            <label htmlFor="web_app.instagram_stories_price" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                                {t("instagram_stories_price")}
                                                            </label>
                                                            <Field
                                                                type="number"
                                                                id="web_app.instagram_stories_price"
                                                                name="web_app.instagram_stories_price"
                                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                                placeholder={t("instagram_stories_price")}
                                                            />
                                                            <ErrorMessage name="web_app.instagram_stories_price" component="div" className="text-red-500 text-sm" />
                                                        </div>
                                                        <div className="w-full mb-2 sm:mb-6">
                                                            <label htmlFor="web_app.instagram_post_price" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                                {t("instagram_post_price")}

                                                            </label>
                                                            <Field
                                                                type="number"
                                                                id="web_app.instagram_post_price"
                                                                name="web_app.instagram_post_price"
                                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                                placeholder={t("instagram_post_price")}
                                                            />
                                                            <ErrorMessage name="web_app.instagram_post_price" component="div" className="text-red-500 text-sm" />
                                                        </div>
                                                    </div>

                                                    <div className="mb-2 sm:mb-6">
                                                        <label htmlFor="web_app.telegram_post_price" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                                            {t("telegram_post_price")}
                                                        </label>
                                                        <Field
                                                            type="number"
                                                            id="web_app.telegram_post_price"
                                                            name="web_app.telegram_post_price"
                                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                            placeholder={t("telegram_post_price")}
                                                        />
                                                        <ErrorMessage name="web_app.telegram_post_price" component="div" className="text-red-500 text-sm" />
                                                    </div>

                                                    <div className="flex justify-center gap-3">
                                                        <button
                                                            onClick={() => setIsEditing(false)}
                                                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300   dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 font-medium rounded-lg text-sm px-5 py-2.5"
                                                        >
                                                            {t("cancel")}
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                        >
                                                            {t("save")}
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
