import styles from './Navbar.module.css';
import React from 'react';

function Navbar() {
    return (
        <>
        <div className={styles.navbar__outer}>
            <div className={styles.navbar__inner}>
                <div className={styles.logo__container}>
                    <img src="/images/logo_icon.png" alt="" />
                    <p>apGallery</p>
                </div>
            </div>
        </div>

        </>
    );
}

export default Navbar;