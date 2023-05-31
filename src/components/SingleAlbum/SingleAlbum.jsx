
import styles from './SingleAlbum.module.css';

function SingleAlbum(props) {

    // destructring the props
    const { album, showImages } = props;

    // handling display album images
    const showAlbumImagesHandler = () => {
        showImages(album);
    }

    // jsx
    return (
        <>
        <div onClick={showAlbumImagesHandler} className={styles.album__outer}>
            <div className={styles.album__inner}>
                {/* folder icon to represent an album */}
                <img className={styles.folder__icon} src="/images/folder_icon.png" alt="album" />
                <p className={styles.album__name}>{album.albumName}</p>
            </div>
        </div>
        </>
    )
}

export default SingleAlbum;