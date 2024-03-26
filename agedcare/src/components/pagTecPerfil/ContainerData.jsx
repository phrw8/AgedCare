import React from 'react'
// import styles from "./containerData.module.css"
import styles from './../../pages/PerfilTec/tecnicoPerfil.module.css'

const ContainerData = ({data}) => {
  return (
    <>
      <div className={styles.app2}>
        <div className={styles.row}>
          <h3 className={styles.title}>Divulgue seu trabalho em parceria conosco!</h3>
        </div>
        <div className={styles.row}>
          <div >
            <h3 className={styles.name}>{data ? data.name : "error"}</h3>
            <h3 className={styles.h3foggy}>{data ? data.cpf : "error"}</h3>
          </div>
          <h3 className={styles.birthday}>{data ? data.birthday : "error"}</h3>

        </div>
        <div className={styles.row2}>
          <h3 className={styles.h3foggy}>Alterar foto de perfil</h3>
          <hr className={styles.divisoria} />
          <h3 className={styles.h3foggy}>Alterar banner</h3>
        </div>


      </div>
    </>
  )
}

export default ContainerData