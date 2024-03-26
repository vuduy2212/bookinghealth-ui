import classNames from 'classnames';
import style from './Imange.module.scss';
import { forwardRef, useState } from 'react';
import images from '~/assets/images';
const Image = forwardRef(({ src = images.noImage, fallback = images.noImage, alt, className, ...props }, ref) => {
    const [fallBack, setFallBack] = useState('');
    const handleError = () => {
        setFallBack(fallback);
    };
    return (
        <img
            ref={ref}
            className={classNames(style.wrapper, className)}
            src={src || fallback}
            alt={alt}
            {...props}
            onError={handleError}
        ></img>
    );
});

export default Image;
