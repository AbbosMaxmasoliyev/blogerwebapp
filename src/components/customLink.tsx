import React, { ReactNode } from 'react'

const CustomLink: React.FC<{ children?: ReactNode, link: string }> = ({ children, link }) => {
    const openLink = () => {
        if (window.Telegram) {
            window.Telegram.WebApp.openLink(link);
        }
    }

    return (
        <div onClick={openLink} className='w-full h-full bg-transparent'>
            {
                children
            }
        </div>
    )
}

export default CustomLink