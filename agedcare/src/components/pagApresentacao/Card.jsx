import React from 'react'
import styles from './card.module.css'
const card = ({txt1,txt2,icon}) => {
  return (
    <>
    <div className={styles.card}>
                    <div className={styles.cardInner}>
                        <div className={styles.cardFront}>
                        <p>{txt1}</p>
                        <p className={styles.icon}>{icon}</p>
                        </div>
                        <div className={styles.cardBack}>
                        <p>{txt2}</p>
                        
                        </div>
                    </div>
                </div></>
  )
}

export default card