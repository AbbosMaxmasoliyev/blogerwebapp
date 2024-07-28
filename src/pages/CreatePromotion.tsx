import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../index.css'; // CSS faylini qo'shish
import { apiGetCategories } from '../services/userService';
import BaseService, { API_PREFIX } from '../services/config';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import { Error } from './Bot';
// Promotion interfeysi
interface Promotion {
    title: string;
    img: File | null;
    price: number;
    description: string;
    category: string;
}

// Yup valitsiyatsiya sxemasi
const validationSchema = Yup.object({
    title: Yup.string().required('Название обязательно'),
    img: Yup.mixed().required('Требуется загрузка файла'),
    price: Yup.number().required('Цена обязательна').positive('Цена должна быть положительной'),
    description: Yup.string().required('Описание обязательно'),
    category: Yup.string().required('Категория обязательна'),
});

const CreatePromotion: React.FC = () => {
    const { promotion, userId } = useParams();
    const [categories, setCategories] = useState<{ value: string, label: string }[] | null>(null);
    const [status, setStatus] = useState<"form" | "success" | "fail" | "sending">("form");

    const initialValues: Promotion = {
        title: '',
        img: null,
        price: 0,
        description: '',
        category: '',
    };

    const handleSubmit = async (values: Promotion) => {
        setStatus('sending');

        // FormData obyektini yaratamiz
        const formData = new FormData();

        // Faylni formData ga qo'shamiz
        if (values.img instanceof File) {
            formData.append('image', values.img);
        }

        try {
            // Rasmni serverga yuboramiz
            const imageResponse = await axios.post(`${API_PREFIX}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Rasm URL manzilini olish
            const imageUrl = imageResponse.data.url;
            // values.img ni yangilaymiz
            values.img = imageUrl;

            // Promotion ma'lumotlarini serverga yuboramiz
            const data = { ...values, owner: userId };
            const responsePost = await BaseService.post(`/${promotion}/create`, data);

            if (responsePost.status === 201) {
                setStatus('success');
            }
        } catch (error) {
            console.error('Xatolik:', error);
            setStatus('fail');
        }
    };

    useEffect(() => {
        apiGetCategories({ beforeFunction: setCategories });
    }, []);

    return (
        <div className="w-full flex justify-center py-5">
            <div className="max-w-sm w-11/12 mx-auto p-3 rounded-lg shadow">
                {
                    status === "form" ? <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form className="promotion-form">
                                <div className="mb-5">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Название</label>
                                    <Field type="text" id="title" name="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="img" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Загрузить изображение</label>
                                    <div className="block">
                                        <input
                                            id="img"
                                            name="img"
                                            type="file"
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            onChange={(event) => {
                                                if (event.currentTarget.files) {
                                                    setFieldValue('img', event.currentTarget.files[0]);
                                                }
                                            }}
                                        />
                                    </div>

                                    <ErrorMessage name="img" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Цена</label>
                                    <Field type="number" id="price" name="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                    <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Описание</label>
                                    <Field type="text" id="description" name="description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Выберите категорию</label>
                                    <Field as="select" id="category" name="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                                        <option value="">Выберите категорию</option>
                                        {
                                            categories?.map(category => <option value={category.value} className='capitalize'>{category.label}</option>)
                                        }
                                    </Field>
                                    <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                                </div>



                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={isSubmitting}>
                                    Зарегистрировать новый аккаунт
                                </button>
                            </Form>
                        )}
                    </Formik> : null
                }
                {
                    status !== "form" ?
                        <h1 className='font-bold'>
                            {
                                status === "success" ? <>
                                    Создано успешно
                                </> : null
                            }
                            {
                                status === "fail" ? <>
                                    Ошибка создания
                                </> : null
                            }
                            {
                                status === "sending" ? <>
                                    <h1>Создание</h1>
                                </> : null
                            }
                        </h1>
                        : null
                }
            </div>
        </div>
    );
};

export default CreatePromotion;
