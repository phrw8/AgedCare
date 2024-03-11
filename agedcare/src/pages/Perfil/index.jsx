import React, { useState, useEffect} from 'react'
import styles from './perfil.module.css'
import { Perfil } from '../../components/pagPerfil/Perfil'
import Pages from '../../components/Pages'
import { useLocation } from 'react-router-dom';

const index = () => {
    const { state} = useLocation();
    const id = state ? state.id : null
    return(
        <>
        <Pages component={Perfil} id={id} />
        </>

    )
}

export default index