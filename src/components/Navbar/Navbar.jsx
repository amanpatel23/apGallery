import styles from './Navbar.module.css';
import React from 'react';

// handle logo click, reload the website
function handleLogoClick() {
    window.location.reload();
}

// jsx
function Navbar() {
    return (
        <>
        <div className={styles.navbar__outer}>
            <div className={styles.navbar__inner}>
                <div onClick={handleLogoClick} className={styles.logo__container}>
                    <img src="/images/logo_icon.png" alt="" />
                    <p>apGallery</p>
                </div>
            </div>
        </div>
        </>
    );
}

export default Navbar;