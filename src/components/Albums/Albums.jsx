import { useState } from 'react';
import SingleAlbum from '../SingleAlbum/SingleAlbum'
import styles from './Albums.module.css';

function Albums(props) {

    const { albums, showImages, formVisible, showForm } = props;

    function clickedShowFormBtn() {
        showForm();
    }

    return (
        <>
        <div className={styles.albums__outer}>
            <div className={styles.albums__inner}>

                <div className={styles.albums__header}>
                    <div className={styles.albums__header_ff}>
                        <div className={styles.albums__text}><p>Albums</p></div>
                    </div>
                    <div onClick={clickedShowFormBtn} className={styles.albums__header_ss}>
                        <div className={styles.add_album__icon}>
                            {formVisible 
                            ? 
                            <i className="fa-solid fa-circle-minus"></i> 
                            : 
                            <i className="fa-solid fa-circle-plus"></i>}
                        </div>
                        <div className={styles.add_album__text}>
                            <p>{formVisible ? 'Close' : 'Add Album'}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.albums__container}>
                    {albums.map((album) => <SingleAlbum key={album.id} album={album} showImages={showImages} />)}
                </div>
            </div>
        </div>
        </>
    );
}

export default Albums;