import React, { useState } from 'react'
import styles from './checkbox.module.css'

export const Checkbox = ({value,label,onChange,dado}) => {
    const [selected,setSelected]=useState(false)
    return (
        <>
            <div className={styles.checkboxGroup}>
                <div className={styles.checkbox}>
                <input 
                type="checkbox"
                 className={styles.checkboxInp} 
                 checked={value}
                 onChange={()=>{
                    onChange()
                    setSelected(!selected)
                 }}
                  />
                    <label 
                    htmlFor="checkbox" 
                    className={selected ? `${styles.checkboxLabel} ${styles.selected}`: styles.checkboxLabel}>
                    </label>
                </div>
                <label className={selected ? `${styles.label} ${styles.active} ${styles[dado]} `: `${styles.label} ${styles[dado] } `}>{label}</label>
            </div>
        </>
    )
}