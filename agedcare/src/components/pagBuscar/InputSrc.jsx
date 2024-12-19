import React from 'react';
import styles from './inputSrc.module.css';

export const InputSrc = ({ name, setName, onSubmit }) => {
  return (
    <label className={styles.inputGroup}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={name ? `${styles.filterTec} ${styles.hasValue}` : `${styles.filterTec}`}
        placeholder="Digite o nome"
      />
      <button type='button' className={styles.btn} onClick={onSubmit}>Procurar</button>
    </label>
  );
};
