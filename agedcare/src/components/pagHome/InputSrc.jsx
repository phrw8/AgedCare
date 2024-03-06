import React from 'react'
import styles from './inputSrc.module.css'
import { CiLocationOn } from "react-icons/ci";

export const InputSrc = ({ cidade, setCidade }) => {
    return (
        <>
            <label className={styles.inputGroup}>
                <input
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    className={cidade ? `${styles.filterTec} ${styles.hasValue} ` : `${styles.filterTec}`}
                />
                <label className={styles.placeholder}><CiLocationOn />Selecione uma cidade:</label>
            </label>
        </>
    )
}
