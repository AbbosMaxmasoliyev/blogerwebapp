import React from 'react';
import '../index.css';

interface ImageWithFallbackProps {
    src: string;
    fallbackSrc: string;
    alt: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, fallbackSrc, alt }) => {
    return (
        <div
            className="w-full h-full rounded-t-lg"
            style={{ backgroundImage: `url(${fallbackSrc})` }}
        >
            <img
                className="w-full h-full rounded-t-lg"
                src={src}
                alt={alt}
                onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => event.currentTarget.style.display = 'none'}
            />
        </div>
    );
}

export default ImageWithFallback;
