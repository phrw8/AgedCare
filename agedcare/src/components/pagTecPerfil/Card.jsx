import React from 'react'
import styles from './card.module.css'
import { IoMdStar } from "react-icons/io";

const Card = ({data}) => {
  return (
    <>
      <div className={styles.card}>
        <hr className={styles.divisoria1}/>
        <div className={styles.image}></div>
        <hr className={styles.divisoria}/>
          <h3 className={styles.username}>{`@${data ? data.userName : "error"}`}</h3>
          <div className={styles.avaliacao}>
                            <div className={styles.stars}>
                                <IoMdStar className={styles.start} />
                                <IoMdStar className={styles.start} />
                                <IoMdStar className={styles.start} />
                                <IoMdStar className={styles.start} />
                                <IoMdStar className={styles.start} />
                            </div>
                                <div className={styles.numeroAvalicao}>
                                    <p className={styles.avNum}>5,0/5,0</p>
                            </div>
                        </div>
      </div>
    </>
  )
}

export default Card