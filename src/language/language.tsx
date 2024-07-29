import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend'; // HTTP orqali tarjima fayllarini yuklash uchun
import LanguageDetector from 'i18next-browser-languagedetector'; // Tilni aniqlash uchun

i18n
    .use(Backend) // HTTP backend o'rnatamiz
    .use(LanguageDetector) // Tilni aniqlash uchun
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: `/locales/{{lng}}/{{ns}}.json`, // Tarjima fayllarining yo'li
        },
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false, // React allaqachon xss-dan himoyalangan
        }
    });

export default i18n;
