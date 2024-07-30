// /src/LanguageSelectorForm.tsx
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { apiUpdateLanguage } from '../services/userService';
import { useParams } from 'react-router-dom';



interface FormValues {
    language: string;
}

const LanguageSelectorForm: React.FC<FormValues> = ({ language }) => {
    const { userId } = useParams()
    const { i18n } = useTranslation()
    const initialValues: FormValues = { language: language || i18n.language };
    const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
        const value = event.target.value;
        if (userId) {
            let respUser = await apiUpdateLanguage({ id: userId, data: { language: value } })
            console.log(respUser);
            if (respUser.success) {
                i18n.changeLanguage(value);
                setFieldValue("language", value)
            }
        }
    };




    return (
        <div className="flex items-center justify-center bg-blue-950 rounded-full text-white">
            <div className="w-full max-w-xs">
                <Formik
                    initialValues={initialValues}
                    onSubmit={values => {
                        console.log(values);
                    }}
                >
                    {({ setFieldValue }) => (
                        <Form className="bg-blue-950  rounded-full">
                            <div className="">

                                <Field
                                    as="select"
                                    name="language"

                                    className="block appearance-none w-full bg-gray-800 border border-gray-700 text-white py-3 px-4  rounded-full leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
                                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleChange(event, setFieldValue)}
                                >
                                    <option className='bg-gray-800 text-gray-200' value="uz">O'zbek</option>
                                    <option className='bg-gray-800 text-gray-200' value="ru">Русский</option>
                                </Field>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LanguageSelectorForm;
