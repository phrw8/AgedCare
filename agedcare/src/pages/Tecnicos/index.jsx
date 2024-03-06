import React from 'react'
import styles from './tecnicos.module.css'
import img from './../../assets/MariaAparecida.png'

const index = () => {
  return (
    <>
    <div className={styles.app}>
        <img src={img}/>
        <div className={styles.container}>
            <div className={styles.slogam}>
                <div className={styles.referance}>
                    <h2>Seu <span>cuidado</span> em primeiro lugar</h2>
                </div>
            </div>
            <div className={styles.containerForm}>
                <h1>Aged Care</h1>
                <h5>Entre na sua conta</h5>
                <form >
                </form>

            </div>
        </div>
    </div>
    </>
  )
}

export default index