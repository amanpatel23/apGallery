import { useState } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import styles from './Images.module.css';

function Images(props) {

    const [showCarousel, setShowCarousel] = useState(false);
    const [currCarouselImage, setCurrCarouselImage] = useState(null);
    const [currCarouselImageUrl, setCurrCarouselImageUrl] = useState('');

    const { album, showImages, deleteImage } = props;
    const { imagesInfo } = album;

    function onClickHandler() {
        showImages(null);
    }

    function onCardClickHandler(imageId) {
        const idx = imagesInfo.findIndex((currImage) => currImage.imageId === imageId);
        setShowCarousel(true);
        setCurrCarouselImage(idx);
        setCurrCarouselImageUrl(imagesInfo[idx].imageUrl);
    }

    function onClickCarouselButton(dir) {
        const len = imagesInfo.length;
        if (dir === 'prev') {
            setCurrCarouselImage((currCarouselImage - 1 + len) % len);
        } else {
            setCurrCarouselImage((currCarouselImage + 1) % len);
        }

        setCurrCarouselImageUrl(imagesInfo[currCarouselImage].imageUrl);
    }

    return (
        <>
        <div className={styles.images__outer}>
            <div className={styles.images__inner}>
                <div className={styles.images__header}>
                    <div className={styles.images__header_ff}>
                        <div onClick={onClickHandler} className={styles.back__btn}>
                            <img src="/images/backBtn_icon.png" alt="go back" />
                        </div>
                        <div className={styles.album__name}><p>Images In {album.albumName}</p></div>
                    </div>
                    <div className={styles.images__header_ss}>
                        <div className={styles.add_image__icon}>
                        <i className="fa-solid fa-circle-plus"></i>
                        </div>
                        <div className={styles.add_image__text}>
                            <p>Add Image</p>
                        </div>
                    </div>
                </div>

                <div className={styles.images__container}>
                    {imagesInfo.map((image) => (
                            <ImageCard 
                            key={image.id} 
                            image={image} 
                            deleteImage={deleteImage}
                            onCardClick={onCardClickHandler}
                    />))}
                </div>

                {
                showCarousel && 
                <ImageCarousel 
                imageUrl={currCarouselImageUrl} 
                onClickCarouselButton={onClickCarouselButton}
                />
                }
            </div>
        </div>
        </>
    )
}

export default Images;