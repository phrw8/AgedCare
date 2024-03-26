import React, { useEffect, useState} from 'react'
import Pages from '../../components/Pages'
import { useLocation } from 'react-router-dom';
import ContainerContent from '../../components/pagTecPerfil/ContainerContent';
import { ConfigContainer } from '../../components/pagConfigs/ConfigContainer';


const index = (props) => {
    const { state} = useLocation();
    const id = state ? state.id : null
    return(
        <>
        <Pages component={ConfigContainer} id={id} />
        </>

    )
} 

export default index