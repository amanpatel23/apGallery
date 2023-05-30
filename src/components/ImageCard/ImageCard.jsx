
import styles from './ImageCard.module.css';

function ImageCard(props) {

    const { image, deleteImage, onCardClick, handleClickedUpdateButton } = props;
    const { imageId, imageName, imageUrl } = image;

    function onDeleteClick(e) {
        e.stopPropagation();
        deleteImage(imageId);
    }

    function onCardClickHandler() {
        onCardClick(imageId);
    }

    function clickedUpdateButton(e) {
        e.stopPropagation();
        handleClickedUpdateButton(image);
    }

    return (
        <>
        <div onClick={onCardClickHandler} className={styles.card__outer}>
            <div className={styles.card__inner}>
                <div className={styles.card__image}>
                    <img src={imageUrl} onError={(e) => e.target.src = '/images/image_not_found.jpg'} alt="could not load" />
                </div>
                <div className={styles.image__desc}>
                    <p>{imageName}</p>
                </div>
                <div className={styles.action__div}>
                    <div onClick={onDeleteClick} className={styles.delete__btn}>
                        <i className="fa-solid fa-trash"></i>
                    </div>
                    <div onClick={clickedUpdateButton} className={styles.update__btn}>
                        <i className="fa-solid fa-pen"></i>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ImageCard;