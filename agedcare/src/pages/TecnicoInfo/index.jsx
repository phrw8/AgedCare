import React, { useEffect, useState} from 'react'
import styles from './tecnicoInfo.module.css'
import Pages from '../../components/Pages'
import { useLocation, useParams } from 'react-router-dom';
import  ContainerContent from '../../components/pagTecnicoInfo/ContainerContent'


const index = (props) => {
   const {id} =useParams()
    return(
        <>
         <Pages component={() => <ContainerContent id={id} />} />
        </>

    )
} 

export default index