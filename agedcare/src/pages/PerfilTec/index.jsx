import React, { useEffect, useState} from 'react'
import styles from './tecnicoPerfil.module.css'
import Pages from '../../components/Pages'
import { useLocation } from 'react-router-dom';
import ContainerContent from '../../components/pagTecPerfil/ContainerContent';

const index = (props) => {
    const { state} = useLocation();
    const id = state ? state.id : null
    return(
        <>
        <Pages component={ContainerContent} id={id} />
        </>

    )
} 

export default index