import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../index.css'; // CSS faylini qo'shish
// import { apiGetCategories } from '../services/userService';
import BaseService from '../services/config';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import allCategories from "../utils/category.json"
import { MultiSelect } from 'primereact/multiselect';



interface Promotion {
    title: string;
    example: string;
    // price: number;
    description: string;
    category: string;
}

// Yup valitsiyatsiya sxemasi

const CreatePromotion: React.FC = () => {


    const categories: { name: string, code: string }[] = allCategories.bloger.map(value => {
        return { name: value["ru"], code: value.value }
    })

    const [selectedCategories, setSelectedCategories] = useState(null)


    const { t, i18n: { language } } = useTranslation()
    const validationSchema = Yup.object({
        title: Yup.string().required(t("title") + t("entered")),
        example: Yup.string(),
        // price: Yup.number().required(t("price") + t("entered")).positive(t("plus")),
        description: Yup.string().required(t("description") + t("entered")),
        category: Yup.string().required(t("category") + t("entered")),
    });


    const { promotion, userId } = useParams();
    // const [categories, setCategories] = useState<{ value: string, [key: string]: string }[] | null>(null);
    const [status, setStatus] = useState<"form" | "success" | "fail" | "sending">("form");

    const initialValues: Promotion = {
        title: '',
        example: "",
        // price: 0,
        description: '',
        category: '',
    };

    const handleSubmit = async (values: Promotion,) => {



        try {

            const data = { ...values, owner: userId };
            const responsePost = await BaseService.post(`/create/${promotion}`, data);

            if (responsePost.status === 201) {
                setStatus('success');
            }
        } catch (error) {
            console.error('Xatolik:', error);
            setStatus('fail');
        }


        window.scrollTo({ top: 0, behavior: "smooth" })
    };


    return (
        <div className="w-full flex justify-center py-5 ">
            <div className="max-w-sm w-11/12 mx-auto p-3 rounded-lg shadow bg-[#1924ee]">

                {
                    status == "sending" ? <>
                        <h1>{t("creating")}</h1>
                    </> : null
                }
                {
                    status === "form" ? <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, setFieldValue }) => (


                            <Form className="promotion-form ">


                                <div className="mb-5">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("title")}</label>
                                    <Field type="text" id="title" name="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                                </div>



                                <div className="mb-5">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("description")}</label>
                                    <Field type="text" id="description" name="description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="example" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("example")}</label>
                                    <Field type="text" id="example" name="example" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                    <ErrorMessage name="example" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("category_select")}</label>
                                    <MultiSelect value={selectedCategories} onChange={(e) => {
                                        setSelectedCategories(e.value)
                                        setFieldValue("category", e.value?.map((city: { name: string, code: string }) => city.code).join(","))
                                    }
                                    } options={categories} optionLabel="name"
                                        filter placeholder={t("category_select")} maxSelectedLabels={3} className="w-full md:w-20rem" />
                                    <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                                </div>



                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={isSubmitting}>
                                    {t("post")}
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
                                    {t("success")}
                                </> : null
                            }
                            {
                                status === "fail" ? <>
                                    {t("error")}
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
