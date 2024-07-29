import { useTranslation } from 'react-i18next';

const translate = () => {
    const { t } = useTranslation();
    return t;
};

export default translate;