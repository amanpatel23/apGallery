
import styles from './SingleAlbum.module.css';

function SingleAlbum(props) {

    const { album, showImages } = props;

    const showAlbumImagesHandler = () => {
        showImages(album);
    }

    return (
        <>
        <div onClick={showAlbumImagesHandler} className={styles.album__outer}>
            <div className={styles.album__inner}>
                <img className={styles.folder__icon} src="/images/folder_icon.png" alt="album" />
                <p className={styles.album__name}>{album.albumName}</p>
            </div>
        </div>
        </>
    )
}

export default SingleAlbum;