import React from 'react'
import styles from './tecAdress.module.css'
import { NormalInput } from './inputs/NormalInput'

import { useState } from 'react'

export const TecAdress = ({updateData,data}) => {
    // const [endereco, setEndereco] = useState("")
    // const [bairro, setBairro] = useState("")
    // const [cidade, setCidade] = useState("")
    // const [estado, setEstado] = useState("")
    // const [numHouse, setNumHouse] = useState("")
    // const [logradouro, setLogradouro] = useState("")
    // const [cep, setCep] = useState("")


    return (
        <>
            {/* <div className={styles.content}>
                <div className={styles.row1}>
                    <label className={`${styles.inpGroup} ${styles.logradouro}`}>
                        <input type="text" required className={logradouro ? `${styles.input} ${styles.hasValue} ` : `${styles.input}`} value={logradouro} onChange={(e) => handleDados("logradouro", e.target.value)} />
                        <label className={styles.placeholder}>Logradouro</label>
                    </label>
                    <label className={`${styles.inpGroup} ${styles.endereco}`}>
                        <input type="text" required className={endereco ? `${styles.input} ${styles.hasValue} ` : `${styles.input}`} value={endereco} onChange={(e) => handleDados("endereco", e.target.value)} />
                        <label className={styles.placeholder}>Endereço</label>
                    </label>
                    <label className={`${styles.inpGroup} ${styles.numero}`}>
                        <input type="text" required className={numHouse ? `${styles.input} ${styles.hasValue} ` : `${styles.input}`} value={numHouse} onChange={(e) => handleDados("numHouse", e.target.value)} />
                        <label className={styles.placeholder}>NM</label>
                    </label>
                </div>
                <div className={styles.row2}>
                    <label className={`${styles.inpGroup} ${styles.estado}`}>
                        <input type="text" required className={estado ? `${styles.input} ${styles.hasValue} ` : `${styles.input}`} value={estado} onChange={(e) => handleDados("estado", e.target.value)} />
                        <label className={styles.placeholder}>UF</label>
                    </label>
                    <label className={`${styles.inpGroup} ${styles.cidade}`}>
                        <input type="text" required className={cidade ? `${styles.input} ${styles.hasValue} ` : `${styles.input}`} value={cidade} onChange={(e) => handleDados("cidade", e.target.value)} />
                        <label className={styles.placeholder}>Cidade</label>
                    </label>
                    <label className={`${styles.inpGroup} ${styles.bairro}`}>
                        <input type="text" required className={bairro ? `${styles.input} ${styles.hasValue} ` : `${styles.input}`} value={bairro} onChange={(e) => handleDados("numHouse", e.target.value)} />
                        <label className={styles.placeholder}>Bairro</label>
                    </label>
                </div>
            </div> */}
            <div className={styles.content}>
                <label className={styles.title}>Dados de endereço</label>
                <div className={styles.row1}>
                    <NormalInput  value={data.logradouro || ""} onChange={(e)=>updateData("logradouro", e.target.value)}  label="Logradouro" dado="logradouro" />
                    <NormalInput value={data.cep || ""} onChange={(e)=>updateData("cep", e.target.value)} label="CEP" dado="cep" />
                    <NormalInput  value={data.endereco || ""} onChange={(e)=>updateData("endereco", e.target.value)}  label="Endereço" dado="endereco" />
                    <NormalInput  value={data.numero || ""} onChange={(e)=>updateData("numero", e.target.value)}  label="NM" dado="nm" />
                </div>
                <div className={styles.row2}>
                    <NormalInput  value={data.uf || ""} onChange={(e)=>updateData("uf", e.target.value)}  label="UF" dado="uf" />
                    <NormalInput  value={data.cidade || ""} onChange={(e)=>updateData("cidade", e.target.value)}  label="Cidade" dado="cidade" />
                    <NormalInput  value={data.bairro || ""} onChange={(e)=>updateData("bairro", e.target.value)}  label="Bairro" dado="bairro" />
                </div>
            </div>
        </>
    )
}
