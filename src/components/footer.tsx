import { useTranslation } from "react-i18next"
import CustomLink from "./customLink"

const Footer = () => {
    const { t } = useTranslation()
    return (


        <footer className="bg-white  shadow p-4 dark:bg-gray-800">
            <h1 className="text-xl font-semibold">{t("footer")}</h1>
            <ul className="flex flex-wrap flex-col items-start mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 gap-4">
                <li className="hover:underline me-4 md:me-6">
                    <CustomLink link="https://www.instagram.com/bloger.agency">
                        <span>Instagram:</span> bloger.agency
                    </CustomLink>
                </li>
                <li className="hover:underline me-4 md:me-6">
                    <CustomLink link="https://bloger.agency">
                        <span>Web-site:</span> https://bloger.agency
                    </CustomLink>
                </li>
                <li className="hover:underline me-4 md:me-6">
                    <CustomLink link="tel:+998977087867">
                        <span>Phone:</span> +998977087867
                    </CustomLink>
                </li>
                <li className="hover:underline me-4 md:me-6">
                    <CustomLink link="https://t.me/baluevgeorge">
                        <span>Telegram:</span> @baluevgeorge
                    </CustomLink>
                </li>
            </ul>
        </footer>

    )
}

export default Footer