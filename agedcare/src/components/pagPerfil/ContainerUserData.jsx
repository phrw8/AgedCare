import React, { useState, useEffect } from 'react';
import styles from './containerUserData.module.css';
import { PiPencilSimpleSlashBold, PiPencilSimpleLineBold } from "react-icons/pi";
import { FaRegWindowClose } from "react-icons/fa";

export const ContainerUserData = ({ disabled, toggleDisabled, updateUserData, oldData }) => {
    const [nome, setNome] = useState(oldData.nome || '');
    const [email, setEmail] = useState(oldData.email || '');

    useEffect(() => {
        setNome(oldData.nome || '');
        setEmail(oldData.email || '');
    }, [oldData]);

    const handleNameChange = (e) => {
        setNome(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleUpdate = () => {
        const newUser = { nome, email };
        updateUserData(newUser);
        toggleDisabled();
    };

    return (
        <div className={styles.containerDataUser}>
            <label className={styles.nameGroup}>
                <input
                    className={styles.name}
                    type="text"
                    name='name'
                    disabled={disabled}
                    value={nome}
                    onChange={handleNameChange}
                />
                {disabled ? (
                    <PiPencilSimpleSlashBold className={styles.settings} onClick={toggleDisabled} />
                ) : (
                    <>
                        <PiPencilSimpleLineBold className={styles.settings} onClick={handleUpdate} />
                        <FaRegWindowClose className={styles.settings} onClick={toggleDisabled} />
                    </>
                )}
            </label>

            <label className={styles.inpGroupText}>
                <label className={styles.email}>Email:</label>
                <input
                    type="email"
                    className={styles.email}
                    value={email}
                    disabled={disabled}
                    onChange={handleEmailChange}
                />
            </label>
        </div>
    );
};
