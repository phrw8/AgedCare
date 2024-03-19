import React from 'react'
import styles from './card.module.css'
import { IoMdStar } from "react-icons/io";

import {ShowRating} from './../pagTecnicoInfo/avaliacao/ShowRating'

const Card = ({data}) => {
  return (
    <>
      <div className={styles.card}>
        <hr className={styles.divisoria1}/>
        <div className={styles.image}></div>
        <hr className={styles.divisoria}/>
          <h3 className={styles.username}>{`@${data ? data.userName : "error"}`}</h3>
          <div className={styles.avaliacao}>
                            <ShowRating rating={data ? data.avaliacao : "Nao possui avaliacoes"} title={true}/>
                                <div className={styles.numeroAvalicao}>
                                    <p className={styles.avNum}>5,0/{data ? data.avaliacao : "Nao possui avaliacoes"}</p>
                            </div>
                        </div>
      </div>
    </>
  )
}

export default Card