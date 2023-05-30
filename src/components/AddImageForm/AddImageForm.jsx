import { useRef, useEffect } from 'react';
import styles from './AddImageForm.module.css';

function AddImageForm(props) {

    const { addImage, editingMode, updateImage } = props;

    const imageNameRef = useRef(null);
    const imageUrlRef = useRef(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let imageInfo = { 
            imageName: imageNameRef.current.value, 
            imageUrl: imageUrlRef.current.value 
        }
        if (editingMode) {
            imageInfo.imageId = editingMode.imageId;
            updateImage(imageInfo);
        } else {
            addImage(imageInfo);
        }

        clearFormField();
    }

    function clearFormField() {
        imageNameRef.current.value = '';
        imageUrlRef.current.value = '';
    }

    useEffect(() => {
        if (editingMode) {
            const { imageName, imageUrl } = editingMode;
            imageNameRef.current.value = imageName;
            imageUrlRef.current.value = imageUrl;
        } else {
            clearFormField();
        }
    }, [editingMode])

    return (
        <>
        <form onSubmit={handleFormSubmit} className={styles.form__outer}>
            <div className={styles.form__inner}>
                <div className={styles.addalbum__text}>
                    <p>{editingMode ? `Edit Image - ${editingMode.imageName}` : 'Add Image'}</p>
                </div>
                <div className={styles.addalbum__form}>
                    <div className={styles.input__container}>
                        <input ref={imageNameRef} type='text' placeholder='Image Name' required />
                        <input ref={imageUrlRef} type='text' placeholder='Image URL' required />
                        <div className={styles.button__container}>
                            <button type='submit'>{editingMode ? 'Edit' : 'Add'}</button>
                            <button type='button' onClick={clearFormField}>Clear</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        </>
    )
}

export default AddImageForm;