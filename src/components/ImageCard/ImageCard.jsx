
import styles from './ImageCard.module.css';

function ImageCard(props) {

    const { image, deleteImage, onCardClick } = props;
    const { imageName, imageUrl } = image;

    function onDeleteClick(e) {
        e.stopPropagation();
        deleteImage(image.imageId);
    }

    function onCardClickHandler() {
        onCardClick(image.imageId);
    }

    return (
        <>
        <div onClick={onCardClickHandler} className={styles.card__outer}>
            <div className={styles.card__inner}>
                <div className={styles.card__image}>
                    <img src={imageUrl} alt="" />
                </div>
                <div className={styles.image__desc}>
                    <p>{imageName}</p>
                </div>
                <div className={styles.action__div}>
                    <div onClick={onDeleteClick} className={styles.delete__btn}>
                        <i className="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ImageCard;