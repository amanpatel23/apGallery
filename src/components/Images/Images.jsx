import { useEffect, useState } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import styles from './Images.module.css';

function Images(props) {

    const [showCarousel, setShowCarousel] = useState(false);
    const [currCarouselImage, setCurrCarouselImage] = useState(null);
    const [currCarouselImageUrl, setCurrCarouselImageUrl] = useState('');

    const { album, showImages, deleteImage, showForm, formVisible } = props;
    const { imagesInfo } = album;

    function onClickHandler() {
        showImages(null);
    }

    function onCardClickHandler(imageId) {
        const idx = imagesInfo.findIndex((currImage) => currImage.imageId === imageId);
        setShowCarousel(true);
        setCurrCarouselImage(idx);
        setCurrCarouselImageUrl(imagesInfo[idx].imageUrl);
        console.log('onCardClick', idx);
    }

    function onClickCarouselButton(dir) {
        setCurrCarouselImage((prevCarouselImage) => {
            const len = imagesInfo.length;
            if (dir === 'prev') {
                return ((prevCarouselImage - 1 + len) % len);
            } else {
                return ((prevCarouselImage + 1) % len);
            }
        });
    }

    useEffect(() => {
        if (currCarouselImage !== null) {
            setCurrCarouselImageUrl(imagesInfo[currCarouselImage].imageUrl);
        }
    }, [currCarouselImage])

    function closeCarouselHandler() {
        setShowCarousel(false);
        setCurrCarouselImage(null);
        setCurrCarouselImageUrl('');
    }
    
    function clickedFormBtn() {
        showForm();
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
                    <div onClick={clickedFormBtn} className={styles.images__header_ss}>
                        <div className={styles.add_image__icon}>
                            {formVisible 
                            ? 
                            <i className="fa-solid fa-circle-minus"></i> 
                            : 
                            <i className="fa-solid fa-circle-plus"></i>}
                        </div>
                        <div className={styles.add_image__text}>
                            <p>{formVisible ? 'Close' : 'Add Image'}</p>
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
                closeCarousel={closeCarouselHandler}
                />
                }
            </div>
        </div>
        </>
    )
}

export default Images;