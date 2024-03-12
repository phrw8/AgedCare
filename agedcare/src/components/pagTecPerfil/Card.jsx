import React from 'react'
import styles from './card.module.css'

const Card = () => {
  return (
    <>
      <div className={styles.card}>
        <hr className={styles.divisoria1}/>
        <div className={styles.image}></div>
        <hr className={styles.divisoria}/>
          <h3 className={styles.username}>@UserName</h3>
      </div>
    </>
  )
}

export default Card