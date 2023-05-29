import SingleAlbum from '../SingleAlbum/SingleAlbum'
import styles from './Albums.module.css';

function Albums(props) {

    const { albums, showImages } = props;
    return (
        <>
        <div className={styles.albums__outer}>
            <div className={styles.albums__inner}>
                {albums.map((album) => <SingleAlbum key={album.id} album={album} showImages={showImages} />)}
            </div>
        </div>
        </>
    );
}

export default Albums;