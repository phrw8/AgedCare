import React, { useState } from 'react'
import styles from './containerUserData.module.css'

import { PiPencilSimpleSlashBold } from "react-icons/pi";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { FaRegWindowClose } from "react-icons/fa";

export const ContainerUserData = ({ disabled, toggleDisabled, updateUserData, oldData, id, handleInputChange }) => {

    const [name, setName] = useState(oldData.name)
    const [cep, setCep] = useState(oldData.cep)
    const [celular, setCelular] = useState(oldData.celular)
    const [email, setEmail] = useState(oldData.email)
    const [civilState, setCivilState] = useState({
        casado: false,
        solteiro: false,
        viuvo: false,
    })
    const [sexo, setSexo] = useState({
        masculino: false,
        feminino: false,
        outras: false,
    })
    const [birthday, setBirthday] = useState(oldData.birthday)



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
                setCelular(valor);
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
            case 'email':
                setEmail(valor);
                break;
            default:
                console.error("Estado inválido");
        }
    }

    const updateData = (key, value, state) => {
        if (state == 0) {
            setCivilState(prevData => {
                // Cria um novo objeto para armazenar o estado atualizado
                const newData = {};

                // Define o valor para a chave específica como o valor fornecido
                newData[key] = value;

                // Define os outros valores como falso
                for (const otherKey in prevData) {
                    if (otherKey !== key) {
                        newData[otherKey] = false;
                    }
                }

                return newData;
            });

        } else if (state = 1) {
            setSexo(prevData => {
                // Cria um novo objeto para armazenar o estado atualizado
                const newData = {};

                // Define o valor para a chave específica como o valor fornecido
                newData[key] = value;

                // Define os outros valores como falso
                for (const otherKey in prevData) {
                    if (otherKey !== key) {
                        newData[otherKey] = false;
                    }
                }

                return newData;
            });

        }

    };
    return (
        <>
            <div className={styles.containerDataUser}>
                <label className={styles.nameGroup}>
                    <input className={styles.name} type="text" name='name' disabled={disabled} value={name ? name : oldData.name} onChange={(e) => {
                        handleDados("name", e.target.value)
                    }} />
                    {disabled ? (
                        <PiPencilSimpleSlashBold className={styles.settings} onClick={toggleDisabled} />
                    ) : (
                        <>
                            <PiPencilSimpleLineBold className={styles.settings} onClick={() => {
                                updateUserData(id, newUser);
                                toggleDisabled();
                            }} />
                            <FaRegWindowClose className={styles.settings} onClick={() => {
                                toggleDisabled();
                            }} />
                        </>
                    )}

                </label>

                <label htmlFor="" className={styles.inpGroupText}>
                    <label className={styles.idade}>Data de nascimento: </label>
                    <input type="date" disabled={disabled} value={birthday ? birthday : oldData.birthday} onChange={(e) => {
                        handleDados("birthday", e.target.value)
                    }} />
                </label>
                <div className={styles.opcoesSexo}>
                    <div className={styles.inpGroup}>
                        <input
                            type="radio"
                            name='sexo'
                            className={styles.sexo}
                            disabled={disabled}
                            onChange={() => updateData("masculino", !sexo.masculino, 1)}
                            checked={sexo.masculino}
                        />
                        <label>Masculino</label>
                    </div>
                    <div className={styles.inpGroup}>
                        <input
                            type="radio"
                            name='sexo'
                            className={styles.sexo}
                            disabled={disabled}
                            onChange={() => updateData("feminino", !sexo.feminino, 1)}
                            checked={sexo.feminino}
                        />
                        <label>Feminino</label>
                    </div>
                    <div className={styles.inpGroup}>
                        <input
                            type="radio"
                            name='sexo'
                            className={styles.sexo}
                            disabled={disabled}
                            onChange={() => updateData("outras", !sexo.outras, 1)}
                            checked={sexo.outras}
                        />
                        <label>Outro</label>
                    </div>
                </div>
                <label className={styles.inpGroupText}>
                    <label className={styles.celular}>Celular:</label>
                    <input type="number" className={styles.celular} value={celular ? celular : oldData.celular} disabled={disabled} onChange={(e) => { handleDados("celular", e.target.value) }} />
                </label>
                <label className={styles.inpGroupText}>
                    <label className={styles.email}>Email:</label>
                    <input type="email" className={styles.email} value={email ? email : oldData.email} disabled={disabled} onChange={(e) => { handleDados("email", e.target.value) }} />
                </label>
                <label className={styles.inpGroupText}>
                    <label className={styles.CEP}>CEP:</label>
                    <input type="text" className={styles.CEP} value={cep ? cep : oldData.cep} disabled={disabled} onChange={(e) => {
                        handleDados("cep", e.target.value)
                    }} />
                </label>
                <div className={styles.estadoCivil}>
                    <div className={styles.inpGroup}>
                        <input
                            type="radio"
                            name='estadocivil'
                            className={styles.civilState}
                            onChange={() => updateData("casado", !civilState.casado, 0)}
                            disabled={disabled}
                            checked={civilState.casado}
                        />
                        <label>Casado</label>
                    </div>
                    <div className={styles.inpGroup}>
                        <input
                            type="radio"
                            name='estadocivil'
                            className={styles.civilState}
                            onChange={() => updateData("viuvo", !civilState.viuvo, 0)}
                            disabled={disabled}
                            checked={civilState.viuvo}
                        />
                        <label>Viúvo</label>
                    </div>
                    <div className={styles.inpGroup}>
                        <input
                            type="radio"
                            name='estadocivil'
                            className={styles.civilState}
                            onChange={() => updateData("solteiro", !civilState.solteiro, 0)}
                            disabled={disabled}
                            checked={civilState.solteiro}
                        />
                        <label>Solteiro</label>
                    </div>
                </div>

            </div></>
    )
}
