import classNames from 'classnames/bind';
import style from './LazyBackground .module.scss';
import { forwardRef, useState } from 'react';
import images from '~/assets/images';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const LazyBackground = ({ src, className, children }) => {
    return (
        <div className={`lazy-background ${className}`}>
            <LazyLoadImage
                alt=""
                effect="blur"
                src={src}
                width="100%"
                height="100%"
                className="lazy-background-image"
            />
            {children}
        </div>
    );
};

export default LazyBackground;
