import React from 'react'
import styles from './header.module.css'

import { RiHeartAddFill } from "react-icons/ri";

const Header = () => {
    return (
        <header>
            <div className={styles.header}>
                <div className={styles.blueFilter}></div>
                <div className={styles.text}>
                <h2>Quem ama, <span className={styles.bold}>cuida</span></h2>
                <RiHeartAddFill  className={styles.icon}/>
                </div>
            </div>
        </header>
    )
}

export default Header