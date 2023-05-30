import { useRef } from 'react';
import styles from './AddAlbumForm.module.css';

function AddAlbumForm(props) {

    const inputRef = useRef(null);

    function handleFormSubmit(e) {
        e.preventDefault();
        const albumName = inputRef.current.value;
        props.addAlbum(albumName);
        clearFormField();
    }

    function clearFormField() {
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
                        <button type='submit'>Add</button>
                        <button type='button' onClick={clearFormField}>Clear</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default AddAlbumForm;