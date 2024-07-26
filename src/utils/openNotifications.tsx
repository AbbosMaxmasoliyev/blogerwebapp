import { Bounce, toast } from "react-toastify"

interface NotificationProps {
    type: "success" | "warning" | "error",
    message: string
}
export const openNotification = ({ type, message }: NotificationProps): void => {
    switch (type) {
        case "success":

            toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
            break;

        case "error":

            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
            break;
        case "warning":

            toast.warning(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
            break;

        default:
            break;
    }
}