import { useRef } from 'react';
import styles from './AddImageForm.module.css';

function AddImageForm(props) {

    const imageNameRef = useRef(null);
    const imageUrlRef = useRef(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const imageInfo = { 
            imageName: imageNameRef.current.value, 
            imageUrl: imageUrlRef.current.value 
        }

        props.addImage(imageInfo);

        imageNameRef.current.value = '';
        imageUrlRef.current.value = '';
    }

    return (
        <>
        <div className={styles.form__outer}>
            <div className={styles.form__inner}>
                <div className={styles.addalbum__text}>
                    <p>Add Image</p>
                </div>
                <form onSubmit={handleFormSubmit} className={styles.addalbum__form}>
                    <div className={styles.input__container}>
                        <input ref={imageNameRef} onChange={(e) => e.target.value} type='text' placeholder='Image Name' required />
                        <input ref={imageUrlRef} onChange={(e) => e.target.value} type='text' placeholder='Image URL' required />
                        <button>Add</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default AddImageForm;