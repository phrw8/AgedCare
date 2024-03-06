import React from 'react'
import styles from './userImage.module.css'

import { FaRegUserCircle } from "react-icons/fa";

import img1 from './../../assets/MariaAparecida.png'


export const UserImage = () => {
    return (
        <>
            <div className={styles.containerImagePerifl}>

                <div className={styles.image}>
                    <FaRegUserCircle className={styles.icon} />
                    <img src={img1} alt="" />
                    
                </div>
            </div>
        </>
    )
}
