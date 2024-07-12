import classNames from 'classnames';
import style from './LazyImage.module.scss';
import { forwardRef, useState } from 'react';
import images from '~/assets/images';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const LazyImage = forwardRef(({ src = images.noImage, fallback = images.noImage, alt, className, ...props }, ref) => {
    const [fallBack, setFallBack] = useState('');
    const handleError = () => {
        setFallBack(fallback);
    };
    return (
        <LazyLoadImage
            ref={ref}
            className={classNames(style.wrapper, className)}
            src={src}
            alt={alt}
            {...props}
            onError={handleError}
        ></LazyLoadImage>
    );
});

export default LazyImage;
