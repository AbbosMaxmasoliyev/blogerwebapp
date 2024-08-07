import React, { useEffect, useState } from 'react';
import { apiDeleteUser, apiGetUserWithUserId } from '../services/userService';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { User } from '../types';
import { BiArrowBack } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import SelectLanguage from './selectLanguage';
import { changeLanguage } from 'i18next';
import { openNotification } from '../utils/openNotifications';
import Footer from './footer';

const Navbar: React.FC = () => {
    const { t } = useTranslation()
    const [hasBot, setHasBot] = useState<boolean>(false)
    const [inHome, setInHome] = useState<boolean>(false)
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>();

    const goBack = () => {
        if (window.history.length > 1) {
            navigate(-1); // Tarixdagi oldingi sahifaga qaytish
        } else {
            navigate(`/user/${params.userId}`); // Bosh sahifaga yo'naltirish
        }
    }

    const checkBotInURL = () => {
        const path = location.pathname;
        setHasBot(path.includes('bot'));
    };

    const checkInHome = () => {
        const path = location.pathname;
        if (params.userId) {
            setInHome(path.split(params.userId).filter(value => value !== "").length == 2)
        }
        setIsOpen(false)
        setHasBot(path.includes('bot'));
    };

    useEffect(() => {

        if (location.pathname === "/") {
            if (window.Telegram.WebApp.initDataUnsafe.user.id) {
                let userId = window.Telegram.WebApp.initDataUnsafe.user.id
                if (userId) {

                    apiGetUserWithUserId({ id: `${userId}`, beforeFunction: setUser, })
                    navigate(`/user/${window.Telegram.WebApp.initDataUnsafe.user.id}`)
                }

            } else {
                console.log("Siz Brauzer orqali kiryapsiz");

                navigate(`/user/${params.userId}`)
            }
        } else {
            checkBotInURL()
            checkInHome()

            console.log(hasBot);
            if (params.userId) {
                apiGetUserWithUserId({ id: params.userId, beforeFunction: setUser, })
            }
        }

    }, [])

    useEffect(() => {
        checkBotInURL()
        checkInHome()


        window.Telegram.WebApp.BackButton.onClick(goBack);
    }, [location.pathname])

    useEffect(() => {
        changeLanguage(user?.language)
    }, [user])
    const reset = async () => {
        if (params.userId) {

            let resetResponse = await apiDeleteUser({ id: params.userId, beforeFunction: null })
            if (resetResponse.success) {
                openNotification({ type: "success", message: "Reseted" })
            }

            if (window.Telegram.WebApp) {
                window.Telegram.WebApp.close()
            }
        }
    }
    return (
        <body className='min-h-screen flex flex-col justify-between bg-[#6d5af8] font-mon'>
            {
                !hasBot ?
                    <header className='sticky top-0 z-10'>
                        <nav className="bg-blue-900  border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                                <span className="flex items-center gap-3">
                                    {
                                        inHome ? <button className='px-2 py-1' onClick={goBack}>
                                            <BiArrowBack />
                                        </button> : null
                                    }
                                    <Link to={`/user/${params.userId}`}
                                        className='w-7 h-8 overflow-x-hidden z-1  block '
                                    >
                                        <img
                                            src="https://optim.tildacdn.one/tild3461-3433-4965-a238-333336363931/-/resize/284x/-/format/webp/bloger-agency-logo-0.png"
                                            className="mr-3  sm:h-9 h-full  max-w-[175px] block    z-0"
                                            alt="Flowbite Logo"
                                        />
                                    </Link>
                                </span>
                                <div className="flex items-center lg:order-2">
                                    <div className='relative flex gap-2'>
                                        <button onClick={() => setIsOpen(!isOpen)} className='focus:outline-none hover:outline-none hover:border-transparent'>
                                            <span
                                                className="text-gray-800 dark:text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:ring-0 focus:outline-none"
                                            >
                                                {user ? user?.firstName : t("loading")}
                                            </span>
                                            {/* <img
                                                alt="user avatar"
                                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                                                className="relative inline-block h-12 w-12 cursor-pointer rounded-full object-cover object-center"
                                                data-popover-target="profile-menu"
                                            /> */}
                                        </button>

                                        {user?.language ? <SelectLanguage language={user.language} /> : null}

                                        <ul
                                            role="menu"
                                            data-popover="profile-menu"
                                            data-popover-placement="bottom"
                                            className={`${isOpen ? "flex" : "hidden"} bg-blue-950 absolute z-20  min-w-[180px] flex-col gap-2 overflow-auto rounded-md    p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none top-14 right-0 w-full md:w-[200px]`}
                                        >
                                            <Link to={`/user/${params.userId}/my-profile`}
                                                tabIndex={-1}
                                                role="menuitem"
                                                className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="2"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                                    ></path>
                                                </svg>
                                                <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                                                    {t("my_profile")}
                                                </p>
                                            </Link>
                                            <button
                                                tabIndex={-1}
                                                role="menuitem"
                                                className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="2"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.005-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.369-.491l1.217.456c.355.133.75.072 1.075-.124.074-.044.147-.087.221-.127.331-.183.581-.495.644-.869l.213-1.28zm2.446 12.31a3.75 3.75 0 100-7.501 3.75 3.75 0 000 7.5z"
                                                    ></path>
                                                </svg>
                                                <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                                                    {t("settings")}
                                                </p>
                                            </button>
                                            <button
                                                tabIndex={-1}
                                                role="menuitem"
                                                onClick={reset}
                                                className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                                            >

                                                <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                                                    Reset
                                                </p>
                                            </button>
                                            {/* <Link to="/"
                                                tabIndex={-1}
                                                role="menuitem"
                                                className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="2"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m9.75 12H6.75a2.25 2.25 0 01-2.25-2.25v-10.5A2.25 2.25 0 016.75 6H9m6 6h6m-6 0l3-3m-3 3l3 3"
                                                    ></path>
                                                </svg>
                                                <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                                                    Выйти
                                                </p>
                                            </Link> */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </header> : null
            }
            <div className="block">
                <Outlet />
            </div>
            {
                !hasBot ? <div className="block">
                    <Footer />
                </div> : null
            }

        </body>
    );
};

export default Navbar;
