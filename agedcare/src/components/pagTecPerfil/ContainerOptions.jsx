import React from 'react'
import styles from './containerOptions.module.css'
import { IconContext } from 'react-icons';

import { GrUserSettings } from "react-icons/gr";
import { RiHospitalLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { PiSunHorizon } from "react-icons/pi";
import { PiSunDimLight } from "react-icons/pi";
import { PiMoonDuotone } from "react-icons/pi";
import { PiMoonFill } from "react-icons/pi";
import { BsCalendar2Week } from "react-icons/bs";
import { SlEyeglass } from "react-icons/sl";
import { ImLab } from "react-icons/im";

export const ContainerOptions = ({ name, data }) => {
    const locaisAptosAll = data ? data.locaisAptos : "n deu certo";

    const locais = Object.entries(locaisAptosAll)
        .filter(([key, value]) => value)
        .map(([key, value]) => key);

    const disponibilidadeAll = data ? data.disponibilidade : "n deu certo";

    const disponibilidade = Object.entries(disponibilidadeAll)
        .filter(([key, value]) => value)
        .map(([key, value]) => key);

    const icones = {
        'Asilo': SlEyeglass,
        'Hospital': RiHospitalLine,
        'Laboratorio': ImLab,
        'Domicilio': IoHomeOutline,
        'Manha': PiSunHorizon,
        'Tarde': PiSunDimLight,
        'Noite': PiMoonDuotone,
        'Pernoite': PiMoonFill,
        'Fim de semana': BsCalendar2Week,
    };


    return (
        <>
            <div className={styles.app}>
                <div className={styles.row1}>
                    <p className={styles.h3foggy}>{name}</p>
                    <GrUserSettings />
                </div>
                <div className={styles.row2}>
                    <div className={styles.contentRow}>
                        {name === "Disponibilidade" && disponibilidade.map((item, index) => (
                            <div key={index} className={styles.itens}>
                                <IconContext.Provider value={{ className: styles.icon }}>
                                    {icones[item] && React.createElement(icones[item])}
                                </IconContext.Provider>
                                {item}</div>
                        ))}
                        {name === "Locais aptos" && locais.map((local, index) => (
                            <div key={index} className={styles.itens}>
                                <IconContext.Provider value={{ className: styles.icon }}>
                                    {icones[local] && React.createElement(icones[local])}
                                </IconContext.Provider>
                                {local}</div>
                        ))}
                    </div>


                </div>

            </div>
        </>
    )
}
