import React from 'react'
import styles from './teste.module.css'

import img from './../../../assets/error404.png'
export const Teste = () => {
  return (
    <>
        <div className={styles.container}>
            <p className={styles.p}>Esta função está indisponivel temporáriamente</p>
            <img src={img} alt="" className={styles.img}/>
        </div>
    </>
  )
}
