import React, { useState } from 'react'
import styles from './containerUserData.module.css'

import { PiPencilSimpleSlashBold } from "react-icons/pi";
import { PiPencilSimpleLineBold } from "react-icons/pi";

export const ContainerUserData = ({ disabled, toggleDisabled, updateUserData, oldData, userName }) => {
    const [name, setName] = useState(oldData ? oldData.name : "")
    const [cep, setCep] = useState(oldData ? oldData.cep : "")
    const [celular, setCelular] = useState(oldData ? oldData.celular : "")
    const [civilState, setCivilState] = useState({
        casado: false,
        solteiro: false,
        viúvo: false,
    })
    const [sexo, setSexo] = useState({
        masculino: false,
        feminino: false,
        outras: false,
    })
    const [birthday, setBirthday] = useState(oldData ? oldData.birthday || "" : "")
    

    const newUser = {
        name,
        cep,
        celular,
        civilState,
        sexo,
        birthday,
    };
    const handleDados = (dado, valor) => {
        switch (dado) {
            case 'name':
                setName(valor);
                break;
            case 'cep':
                setCep(valor);
                break;
            case 'celular':
                setName(valor);
                break;
            case 'civilState':
                setCep(valor);
                break;
            case 'sexo':
                setSexo(valor);
                break;
            case 'birthday':
                setBirthday(valor);
                break;
            default:
                console.error("Estado inválido");
        }
    }
    return (
        <>
            <div className={styles.containerDataUser}>
                <label className={styles.nameGroup}>
                    <input className={styles.name} type="text" disabled={disabled} value={name} onChange={(e) => {
                        handleDados("name", e.target.value)
                    }} />
                    {disabled ? <PiPencilSimpleSlashBold className={styles.settings} onClick={toggleDisabled} />
                        : <PiPencilSimpleLineBold className={styles.settings} onClick={() => {
                            console.log(newUser)
                            updateUserData(userName, newUser)
                            toggleDisabled()
                        }} />
                    }

                </label>

                <label htmlFor="" className={styles.inpGroupText}>
                    <label className={styles.idade}>Data de nascimento: </label>
                    <input type="date" disabled={disabled} value={birthday} />
                </label>
                <div className={styles.opcoesSexo}>
                    <div className={styles.inpGroup}>
                        <input type="radio" name='sexo' className={styles.sexo} disabled={disabled} />
                        <label>Masculino</label>
                    </div>
                    <div className={styles.inpGroup}>
                        <input type="radio" name='sexo' className={styles.sexo} disabled={disabled} />
                        <label>Feminino</label>
                    </div>
                    <div className={styles.inpGroup}>
                        <input type="radio" name='sexo' className={styles.sexo} disabled={disabled} />
                        <label>Outro</label>
                    </div>
                </div>
                <label className={styles.inpGroupText}>
                    <label className={styles.celular}>Celular:</label>
                    <input type="number" className={styles.celular} value={celular} disabled={disabled} onChange={(e) => { handleDados("number", e.target.value) }} />
                </label>
                <label className={styles.inpGroupText}>
                    <label className={styles.email}>Email:</label>
                    <input type="email" className={styles.email} value={"paulo@gmail.com"} disabled={disabled} />
                </label>
                <label className={styles.inpGroupText}>
                    <label className={styles.CEP}>CEP:</label>
                    <input type="text" className={styles.CEP} value={cep} disabled={disabled} onChange={(e) => {
                        handleDados("cep", e.target.value)
                    }} />
                </label>
                <div className={styles.estadoCivil}>
                    <div className={styles.inpGroup}>
                        <input type="radio" name='estadocivil' className={styles.civilState} disabled={disabled} />
                        <label>Casado</label>
                    </div>
                    <div className={styles.inpGroup}>
                        <input type="radio" name='estadocivil' className={styles.civilState} disabled={disabled} />
                        <label>Viúvo</label>
                    </div>
                    <div className={styles.inpGroup}>
                        <input type="radio" name='estadocivil' className={styles.civilState} disabled={disabled} />
                        <label>Solteiro</label>
                    </div>
                </div>

            </div></>
    )
}
