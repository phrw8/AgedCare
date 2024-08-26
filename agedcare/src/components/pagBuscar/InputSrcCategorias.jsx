import React from 'react';
import styles from './inputSrcCategorias.module.css';

import { PiSunHorizon, PiSunDim, PiMoonDuotone, PiMoonFill, PiEyeglassesBold } from "react-icons/pi";
import { BsCalendar2Week, BsHouse } from "react-icons/bs";
import { FaRegHospital } from "react-icons/fa6";
import { MdOutlineScience } from "react-icons/md";

const Input = ({ name, handleChange }) => {
    return (
        <label className={styles.switch}>
            <input
                type='checkbox'
                value={name}
                onChange={() => handleChange(name)}
                className={styles.inputCheckbox}
            />
            <span className={styles.slider}></span>
        </label>
    );
};

export const InputSrcCategorias = ({ handleCheckboxChange, handleDisponibilidadeChange }) => {
    return (
        <div className={styles.app}>
            <div className={styles.row}>
                <div className={styles.textGroup}>
                    <Input name={"Manha"} handleChange={handleDisponibilidadeChange} />
                    <div className={styles.icon}><PiSunHorizon /></div>
                    <p>Manhã</p>
                </div>
                <div className={styles.textGroup}>
                    <Input name={"Tarde"} handleChange={handleDisponibilidadeChange} />
                    <div className={styles.icon}><PiSunDim /></div>
                    <p>Tarde</p>
                </div>
                <div className={styles.textGroup}>
                    <Input name={"Noite"} handleChange={handleDisponibilidadeChange} />
                    <div className={styles.icon}><PiMoonDuotone /></div>
                    <p>Noite</p>
                </div>
                <div className={styles.textGroup}>
                    <Input name={"Pernoite"} handleChange={handleDisponibilidadeChange} />
                    <div className={styles.icon}><PiMoonFill /></div>
                    <p>Pernoite</p>
                </div>
                <div className={styles.textGroup}>
                    <Input name={"Fds"} handleChange={handleDisponibilidadeChange} />
                    <div className={styles.icon}><BsCalendar2Week /></div>
                    <p>Fds</p>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.itens}>
                    <Input name={"Hospital"} handleChange={handleCheckboxChange} />
                    <div className={styles.textGroup}>
                        <div className={styles.icon}><FaRegHospital /></div>
                        <p>Hospital</p>
                    </div>
                </div>
                <div className={styles.itens}>
                    <Input name={"Domicilio"} handleChange={handleCheckboxChange} />
                    <div className={styles.textGroup}>
                        <div className={styles.icon}><BsHouse /></div>
                        <p>Domicílio</p>
                    </div>
                </div>
                <div className={styles.itens}>
                    <Input name={"Asilo"} handleChange={handleCheckboxChange} />
                    <div className={styles.textGroup}>
                        <div className={styles.icon}><PiEyeglassesBold /></div>
                        <p>Asilo</p>
                    </div>
                </div>
                <div className={styles.itens}>
                    <Input name={"Lab"} handleChange={handleCheckboxChange} />
                    <div className={styles.textGroup}>
                        <div className={styles.icon}><MdOutlineScience /></div>
                        <p>Laboratório</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
