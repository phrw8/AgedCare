import React from 'react';
import styles from './inputSrcCidade.module.css';

export const InputSrcCidade = ({ cidade, setCidade }) => {
    return (
        <label className={styles.inputGroup}>
            <input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className={cidade ? `${styles.filterTec} ${styles.hasValue}` : `${styles.filterTec}`}
                placeholder="Digite a cidade"
            />
        </label>
    );
};
