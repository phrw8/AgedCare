import React from 'react'
import styles from './buscar.module.css'
import { Buscar } from '../../components/pagBuscar/Buscar'
import Pages from '../../components/Pages'
import { useLocation } from 'react-router-dom';
const index = () => {
    const { state} = useLocation();
    const id = state ? state.id : null
  return (
    <>
    <div className={styles.app}>
       <Pages component={Buscar} id={id}/>
    </div>
    </>
  )
}

export default index