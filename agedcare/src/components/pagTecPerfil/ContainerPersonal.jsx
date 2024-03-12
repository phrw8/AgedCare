import React from 'react'
import styles from './containerPersonal.module.css'


import { GrUserSettings } from "react-icons/gr";

export const ContainerPersonal = ({name,data}) => {

    return (
        <>
            <div className={styles.app}>
                <div className={styles.row1}>
                    <p className={styles.h3foggy}>{name}</p>
                    <GrUserSettings />
                </div>
                <div className={styles.row2}>
                    {name=== "Alterar informações pessoais" && 
                     <>
                     <div className={styles.subRow}>
                       <p className={styles.h3}>Nome: {data? data.name : "n deu de pegar os dados"}</p>
                       <p className={styles.h3}>CPF: {data? data.cpf : "n deu de pegar os dados"}</p>
                     </div>
                     <div className={styles.subRow}>
                       <p className={styles.h3}>Email: {data? data.email : "n deu de pegar os dados"}</p>
                       <p className={styles.h3}>RG: {data? data.rg : "n deu de pegar os dados"}</p>
                     </div>
                     <div className={styles.subRow}>
                       <p className={styles.h3}>Celular: {data? data.celular : "n deu de pegar os dados"}</p>
                       <p className={styles.h3}>Data de Nascimento: {data? data.birthday : "n deu de pegar os dados"}</p>
                     </div>
                   </>}
                   {name === "Alterar informações de endereço" && 
                     <>
                     <div className={styles.subRow}>
                       <p className={styles.h3}>CEP: {data? data.cep : "n deu de pegar os dados"}</p>
                       <p className={styles.h3}>UF: {data? data.uf : "n deu de pegar os dados"}</p>
                       <p className={styles.h3}>Cidade: {data? data.cidade : "n deu de pegar os dados"}</p>
                     </div>
                     <div className={styles.subRow}>
                       <p className={styles.h3}>Bairro: {data? data.bairro : "n deu de pegar os dados"}</p>
                       <p className={styles.h3}>Numero: {data? data.nm : "n deu de pegar os dados"}</p>
                     </div>
                     <div className={styles.subRow}>
                       <p className={styles.h3}>Logradouro: {data? data.logradouro : "n deu de pegar os dados"}</p>
                       <p className={styles.h3}>Endereço: {data? data.endereco : "n deu de pegar os dados"}</p>
                     </div>
                   </>}
                    
                </div>
            </div>
        </>
    )
}
