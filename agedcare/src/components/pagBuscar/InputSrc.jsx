import React from 'react'
import styles from './inputSrc.module.css'
import { CiLocationOn } from "react-icons/ci";

export const InputSrc = ({ name, setName }) => {
    return (
        <>
            <label className={styles.inputGroup}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)}}
                    className={name ? `${styles.filterTec} ${styles.hasValue} ` : `${styles.filterTec}`}
                />
                <button type='submit' className={styles.btn}>Procurar</button>
            </label>
            
        </>
    )
}
