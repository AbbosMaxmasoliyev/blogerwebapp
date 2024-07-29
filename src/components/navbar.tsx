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
                        <nav className="bg-blue-900 bg-opacity-45 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
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

                                    <div className='relative '>
                                        <button onClick={() => setIsOpen(!isOpen)} className='focus:outline-none hover:outline-none hover:border-transparent'>
                                            <span
                                                className="text-gray-800 dark:text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:ring-0 focus:outline-none"
                                            >
                                                {user ? user.firstName : "Yuklanmoqda"}
                                            </span>
                                            <img
                                                alt="tania andrew"
                                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                                                className="relative inline-block h-12 w-12 cursor-pointer rounded-full object-cover object-center"
                                                data-popover-target="profile-menu"
                                            />
                                        </button>

                                        <ul
                                            role="menu"
                                            data-popover="profile-menu"
                                            data-popover-placement="bottom"
                                            className={`${isOpen ? "flex" : "hidden"} absolute z-10  min-w-[180px] flex-col gap-2 overflow-auto rounded-md  bg-blue-950  p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none top-14 right-0 w-full md:w-[200px]`}
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
                                                    My Profile
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
                                                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                                                    ></path>
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    ></path>
                                                </svg>
                                                <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                                                    Edit Profile
                                                </p>
                                            </button>

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
                                                        d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
                                                    ></path>
                                                </svg>
                                                <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                                                    Help
                                                </p>
                                            </button>

                                        </ul>

                                    </div>

                                </div>
                            </div>
                        </nav>
                    </header >
                    : null
            }
            <main>
                <Outlet />
            </main>
        </body >
    );
};

export default Navbar;
