import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../index.css'; // CSS faylini qo'shish
import { apiGetCategories } from '../services/userService';
import BaseService from '../services/config';
import { useParams } from 'react-router-dom';

// Promotion interfeysi
interface Promotion {
    title: string;
    img: string;
    price: number;
    description: string;
    category: string;
}

// Yup valitsiyatsiya sxemasi
const validationSchema = Yup.object({
    title: Yup.string().required('Название обязательно'),
    img: Yup.string().url('Недопустимый формат URL').required('URL изображения обязателен'),
    price: Yup.number().required('Цена обязательна').positive('Цена должна быть положительной'),
    description: Yup.string().required('Описание обязательно'),
    category: Yup.string().required('Категория обязательна'),
});

const CreatePromotion: React.FC = () => {
    const { promotion, userId } = useParams()
    const [categories, setCategories] = useState<{ value: string, label: string }[] | null>(null)
    const [status, setStatus] = useState<"form" | "success" | "fail" | "sending">("form")
    const initialValues: Promotion = {
        title: '',
        img: '',
        price: 0,
        description: '',
        category: '',
    };

    const handleSubmit = async (values: Promotion) => {
        console.log(values);

        try {
            setStatus("sending")
            let responsePost = await BaseService.post(`/publish/${promotion}`, { ...values, owner: userId }, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
            console.log(responsePost);

            if (responsePost.status === 201) {
                setStatus('success')
            }


        } catch (error) {
            setStatus('fail')

        }
    };

    useEffect(() => {
        apiGetCategories({ beforeFunction: setCategories })
    }, [])

    return (
        <div className="w-full flex justify-center py-5  ">
            <div className="max-w-sm w-11/12 mx-auto   p-3  rounded-lg shadow  ">
                {
                    status === "form" ? <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="promotion-form">
                                <div className="mb-5">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Название</label>
                                    <Field type="text" id="title" name="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="img" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL изображения</label>
                                    <Field type="text" id="img" name="img" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
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

                                <div className="flex items-start mb-5">
                                    <div className="flex items-center h-5">
                                        <Field type="checkbox" id="agree" name="agree" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                                    </div>
                                    <label htmlFor="agree" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Я согласен с <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">условиями и положениями</a></label>
                                    <ErrorMessage name="agree" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={isSubmitting}>
                                    Зарегистрировать новый аккаунт
                                </button>
                            </Form>
                        )}
                    </Formik> : null
                }
                {
                    status != "form" ?
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
