import React from 'react'
import styles from './ul.module.css'

export const Ul = ({setPage}) => {
  return (
    <div className={styles.container}>
      <ul className={styles.ul}>
        <li className={styles.configs}>Configurações</li>
        <li className={styles.li}>Historico de Atividade</li>
        <li className={styles.li}>Idioma e Prefêrencia</li>
        <li className={styles.li}>Temos de Serviço </li>
        <li className={styles.li}>Política de Privacidade</li>
        <li className={styles.li}>Comentários e Avaliação</li>
      </ul>
    </div>
  )
}
