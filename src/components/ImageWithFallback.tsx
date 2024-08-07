import React from 'react';
import '../index.css';

interface ImageWithFallbackProps {
    src: string;
    fallbackSrc: string;
    alt: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, fallbackSrc, alt }) => {
    return (
        <div className="p-2 ">
            <div
                className="w-full h-full  rounded-2xl overflow-hidden"
                style={{ backgroundImage: `url(${fallbackSrc})` }}
            >
                <img
                    className="w-full h-full rounded-t-lg object-cover object-center"
                    src={src}
                    alt={alt}
                    onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => event.currentTarget.style.display = 'none'}
                />
            </div>
        </div>
    );
}

export default ImageWithFallback;
