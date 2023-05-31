import { useEffect, useState } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import styles from './Images.module.css';

function Images(props) {

    // state for conditional rendering image carousel
    const [showCarousel, setShowCarousel] = useState(false);
    // state for storing current image index of the carousel
    const [currCarouselImage, setCurrCarouselImage] = useState(null);
    // state for storing current image url of the carousel
    const [currCarouselImageUrl, setCurrCarouselImageUrl] = useState('');

    // destructuring the props
    const { album, showImages, deleteImage, showForm, formVisible, editImage } = props;
    const { imagesInfo } = album;

    // handling for back button click, don't display images
    function onClickHandler() {
        showImages(null);
    }

    // show image carousel when clicked on the image card
    function onCardClickHandler(imageId) {
        const idx = imagesInfo.findIndex((currImage) => currImage.imageId === imageId);
        setShowCarousel(true);
        setCurrCarouselImage(idx);
        setCurrCarouselImageUrl(imagesInfo[idx].imageUrl);
    }

    // handling next and prev buttons click on the image carousel
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

    // change the image url when clikced on next or prev button
    useEffect(() => {
        if (currCarouselImage !== null) {
            setCurrCarouselImageUrl(imagesInfo[currCarouselImage].imageUrl);
        }
    }, [currCarouselImage])

    // close the image carousel
    function closeCarouselHandler() {
        setShowCarousel(false);
        setCurrCarouselImage(null);
        setCurrCarouselImageUrl('');
    }
    
    // handling display of 'add new image' form
    function clickedFormBtn() {
        showForm();
    }

    // converting 'add image' form to 'edit image'
    function clickedUpdateButtonHandler(clickedImage) {
        editImage(clickedImage);
    }

    // jsx
    return (
        <>
        <div className={styles.images__outer}>
            <div className={styles.images__inner}>
                {!showCarousel && <div className={styles.images__header}>
                    <div className={styles.images__header_ff}>
                        {/* go back button */}
                        <div onClick={onClickHandler} className={styles.back__btn}>
                            <img src="/images/backBtn_icon.png" alt="go back" />
                        </div>
                        <div className={styles.album__name}><p>Images In {album.albumName}</p></div>
                    </div>
                    <div onClick={clickedFormBtn} className={styles.images__header_ss + ' ' + (formVisible ? styles.close__btn : '')}>
                        {/* display form button */}
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
                </div>}

                {/* displaying images card of an */}
                {!showCarousel && <div className={styles.images__container}>
                    {imagesInfo.length === 0 ? 
                    <p className={styles.no_images}>Not A Single Image Bro!</p> : 
                    imagesInfo.map((image) => (
                            <ImageCard 
                            key={image.imageId} 
                            image={image} 
                            deleteImage={deleteImage}
                            onCardClick={onCardClickHandler}
                            handleClickedUpdateButton={clickedUpdateButtonHandler}
                    />))}
                </div>}

                {/* displaying image carousel */}
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