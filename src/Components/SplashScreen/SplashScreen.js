import React from 'react'
import styles from "./ss.module.css"
const SplashScreen = () => {
    return (
        <div className={styles.splash} >
            <h1 className={styles.cname} id="splashTitle">Social Book</h1>
            <div className={styles.progress_loader} id="splashLoader">
                <div className={styles.progress}></div>
            </div>
        </div>
    )
}

export default SplashScreen