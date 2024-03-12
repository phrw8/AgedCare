import React from 'react'
import styles from "./containerData.module.css"

const ContainerData = () => {
  return (
    <>
      <div className={styles.app}>
        <div className={styles.row1}>
          <h3 className={styles.title}>Divulgue seu trabalho em parceria conosco!</h3>
        </div>
        <div className={styles.row2}>
          <div className={styles.row11}>
            <h3 className={styles.name}>Amanda da Rosa Wernke</h3>
            <h3 className={styles.h3foggy}>123 456 789 00</h3>
          </div>
          <h3 className={styles.birthday}>31/05/1995</h3>

        </div>
        <div className={styles.row3}>
          <h3 className={styles.h3foggy}>Alterar foto de perfil</h3>
          <hr className={styles.divisoria} />
          <h3 className={styles.h3foggy}>Alterar banner</h3>
        </div>


      </div>
    </>
  )
}

export default ContainerData