import { useState } from "react";
import styles from './ImageCarousel.module.css'

function ImageCarousel(props) {

    const { imageUrl, onClickCarouselButton } = props;
    console.log(imageUrl);

    function clickNextButton() {
        onClickCarouselButton('next');
    }

    function clickPrevButton() {
        onClickCarouselButton('prev');
    }

    return (
        <>
        <div className={styles.carousel__outer}>
            <div className={styles.carousel__inner}>
                <div className={styles.image__preview}>
                    <img src={imageUrl} alt="" />
                </div>
                <div onClick={clickNextButton} className={styles.next__btn}>
                    <i className="fa-solid fa-circle-arrow-right"></i>
                </div>
                <div onClick={clickNextButton} className={styles.prev__btn}>
                    <i className="fa-solid fa-circle-arrow-left"></i>
                </div>
            </div>
        </div>
        </>
    )
}

export default ImageCarousel;