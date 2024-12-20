import React from 'react'
import styles from './normalInput.module.css'

export const NormalInput = ({ value, onChange, label, type, dado }) => {
    const handleDados = (dado, valor) => {
        switch (dado) {
            case 'endereco':
                setEndereco(valor);
                break;
            case 'bairro':
                setBairro(valor);
                break;
            case 'email':
                setEmail(valor);
                break;
            case 'cidade':
                setCidade(valor);
                break;
            case 'estado':
                setEstado(valor);
                break;
            case 'numHouse':
                setNumHouse(valor);
                break;
            case 'logradouro':
                setNumHouse(valor);
                break;
            default:
                console.error("Estado inválido");

        }
        console.log(valor)
    }
    return (
        <>
            <label className={`${styles.inpGroup} ${styles[dado]}`}>

                <input
                    type={type ? type : 'text'}
                    required
                    className={value ? `${styles.input} ${styles.hasValue} ` : `${styles.input}`}
                    value={value}
                    onChange={onChange}
                    maxLength={
                        dado === "uf" ? 2 : 
                        dado === "numero" ? 5 : 
                        dado === "cep" ? 10 : undefined
                    }
                />

                <label className={styles.placeholder}>{label}</label>
            </label>
        </>
    )
}
