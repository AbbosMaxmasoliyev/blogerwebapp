import React, { useEffect, useState } from 'react';
import { apiGetUserWithUserId } from '../services/userService';
import { Link, Outlet, useLocation, useNavigate, useParams, } from 'react-router-dom';
import { User } from '../types';
import { BiArrowBack } from 'react-icons/bi';



const Navbar: React.FC = () => {
    const [hasBot, setHasBot] = useState<boolean>(false)
    const [inHome, setInHome] = useState<boolean>(false)
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const goBack = () => {
        navigate(-1)
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

        setHasBot(path.includes('bot'));
    };


    useEffect(() => {
        checkBotInURL()
        checkInHome()

        console.log(hasBot);
        if (params.userId) {
            apiGetUserWithUserId({ id: params.userId, beforeFunction: setUser, })
        }
    }, [])


    useEffect(() => {
        checkBotInURL()

        checkInHome()
    }, [location.pathname])
    const linksForMe = [
        {
            title: "Объявление",
            link: "announce"
        },
        {
            title: "Реклама",
            link: "advertise"
        },
        {
            title: "Сотрудничество",
            link: "collaboration"
        },
        {
            title: "Бартер",
            link: "barter"
        },

    ]

    return (
        <body>
            {
                !hasBot ?
                    <header>
                        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
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
                                    <span
                                        className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                                    >
                                        {user ? user.firstName : "Yuklanmoqda"}
                                    </span>

                                    <button
                                        data-collapse-toggle="mobile-menu-2"
                                        type="button"
                                        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                        aria-controls="mobile-menu-2"
                                        aria-expanded={isOpen}
                                        onClick={toggleMenu}
                                    >
                                        <span className="sr-only">Open main menu</span>
                                        <svg
                                            className={`w-6 h-6 ${isOpen ? 'hidden' : 'block'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <svg
                                            className={`w-6 h-6 ${isOpen ? 'block' : 'hidden'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                                <div
                                    className={`${isOpen ? 'block' : 'hidden'
                                        } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
                                    id="mobile-menu-2"
                                >
                                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                        {
                                            linksForMe.map((link, index) => <li>
                                                <Link
                                                    to={`/user/${params.userId}/for-me/${link.link}`}
                                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                                    key={index}
                                                >
                                                    {link.title}
                                                </Link>
                                            </li>)
                                        }

                                        <li>
                                            <Link
                                                to={`/user/${params.userId}/waiting`}
                                                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                            >
                                                Ожидание публикации
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </header>
                    : null
            }
            <main>
                <Outlet />
            </main>
        </body>
    );
};

export default Navbar;
