import { useState } from "react";
import styles from './ImageCarousel.module.css'

function ImageCarousel(props) {

    // destructuring the props
    const { imageUrl, onClickCarouselButton, closeCarousel } = props;

    // handle next button click on the carousel
    function clickNextButton() {
        onClickCarouselButton('next');
    }

    // handle prev button click on the carousel
    function clickPrevButton() {
        onClickCarouselButton('prev');
    }

    // handle close button clicked on the carosel
    function clickCloseButton() {
        closeCarousel();
    }

    // jsx
    return (
        <>
        <div className={styles.carousel__outer}>
            <div className={styles.carousel__inner}>
                <div className={styles.image__preview}>
                    <img src={imageUrl} alt="" />
                </div>
                {/* next button */}
                <div onClick={clickNextButton} className={styles.next__btn}>
                    <i className="fa-solid fa-circle-arrow-right"></i>
                </div>
                {/* prev button */}
                <div onClick={clickPrevButton} className={styles.prev__btn}>
                    <i className="fa-solid fa-circle-arrow-left"></i>
                </div>
                {/* close buttons */}
                <div onClick={clickCloseButton} className={styles.close__btn}>
                    <i className="fa-solid fa-circle-xmark"></i>
                </div>
            </div>
        </div>
        </>
    )
}

export default ImageCarousel;