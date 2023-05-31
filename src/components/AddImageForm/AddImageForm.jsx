import { useRef, useEffect } from 'react';
import styles from './AddImageForm.module.css';

function AddImageForm(props) {

    // destructuring props
    const { addImage, editingMode, updateImage } = props;

    // htlm input field ref
    const imageNameRef = useRef(null);
    const imageUrlRef = useRef(null);

    // handle form submission for adding a new image
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

    // clear the input field
    function clearFormField() {
        imageNameRef.current.value = '';
        imageUrlRef.current.value = '';
    }

    // fill the form with image info when the editing mode is on
    useEffect(() => {
        if (editingMode) {
            const { imageName, imageUrl } = editingMode;
            imageNameRef.current.value = imageName;
            imageUrlRef.current.value = imageUrl;
        } else {
            clearFormField();
        }
    }, [editingMode])

    // jsx
    return (
        <>
        <form onSubmit={handleFormSubmit} className={styles.form__outer}>
            <div className={styles.form__inner}>
                <div className={styles.addalbum__text}>
                    <p>{editingMode ? `Edit Image - ${editingMode.imageName}` : 'Add Image'}</p>
                </div>
                <div className={styles.addalbum__form}>
                    <div className={styles.input__container}>
                        {/* input field for image name and image url */}
                        <input ref={imageNameRef} type='text' placeholder='Image Name' required />
                        <input ref={imageUrlRef} type='text' placeholder='Image URL' required />
                        <div className={styles.button__container}>
                            {/* buttons for submit form and clear the form */}
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