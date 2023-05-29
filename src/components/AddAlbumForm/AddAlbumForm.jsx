import { useRef } from 'react';
import styles from './AddAlbumForm.module.css';

function AddAlbumForm(props) {

    const inputRef = useRef(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const albumName = inputRef.current.value;
        props.addAlbum(albumName);
        inputRef.current.value = '';
    }

    return (
        <>
        <div className={styles.form__outer}>
            <div className={styles.form__inner}>
                <div className={styles.addalbum__text}>
                    <p>Add Album</p>
                </div>
                <form onSubmit={handleFormSubmit} className={styles.addalbum__form}>
                    <div className={styles.input__container}>
                        <input ref={inputRef} onChange={(e) => e.target.value} type='text' placeholder='Album Name' required/>
                        <button>Add</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default AddAlbumForm;