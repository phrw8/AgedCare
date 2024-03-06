import React from 'react'
import styles from './feedback.module.css'
const Feedback = ({name,comment,image,id}) => {
  return (
    <>
        <div className={`${styles.feedbackCard} ${id === 1 ? styles.id1 : ''} ${id === 2 ? styles.id2 : ''}`}>
            <div className={`${styles.circle} ${id === 1 ? styles.c1 : ''} ${id === 2 ? styles.c2 : ''}  ${id === 3 ? styles.c3 : ''}`}></div>
            <div className={styles.content}>

            <div className={styles.image}>
              <img src={image} alt="" className={styles.img}/>
            </div>
                <h3 className={styles.name}>{name}</h3>
                <h5 className={styles.comment}>{comment}</h5>
            </div>

        </div>

    </>
  )
}

export default Feedback