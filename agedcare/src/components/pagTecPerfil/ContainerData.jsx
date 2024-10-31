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
            <h3 className={styles.name}> Nome:{data ? data.nome : "error"}</h3>
            <h3 className={styles.name}>Cpf: {data ? data.cpf : "error"}</h3>
            <h3 className={styles.name}>Email: {data ? data.email : "error"}</h3>
          </div>
          <h3 className={styles.birthday}>{data ? data.nasc : "error"}</h3>

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