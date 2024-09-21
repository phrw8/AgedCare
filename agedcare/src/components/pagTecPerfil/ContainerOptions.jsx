import React from 'react'
import styles from './../../pages/PerfilTec/tecnicoPerfil.module.css'
import { IconContext } from 'react-icons';

import { GrUserSettings } from "react-icons/gr";
import { RiHospitalLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { PiSunHorizon } from "react-icons/pi";
import { PiSunDimLight } from "react-icons/pi";
import { PiMoonDuotone } from "react-icons/pi";
import { PiMoonFill } from "react-icons/pi";
import { SlEyeglass } from "react-icons/sl";

export const ContainerOptions = ({ name, data }) => {
    if (!data) {
        return <p>Carregando dados...</p>; // Caso os dados não estejam disponíveis ainda
    }

    // Adaptando a estrutura de dados de acordo com a API
    const locaisAptosAll = {
        Domicilio: data.domicilio,
        Hospital: data.hospital,
        Asilo: data.asilo,
        Clinica: data.clinica
    };

    const disponibilidadeAll = {
        Manha: data.dia,
        Tarde: data.tarde,
        Noite: data.noite,
        Pernoite: data.pernoite
    };

    // Filtrando os valores que são verdadeiros
    const locais = Object.entries(locaisAptosAll)
        .filter(([key, value]) => value)
        .map(([key, value]) => key);

    const disponibilidade = Object.entries(disponibilidadeAll)
        .filter(([key, value]) => value)
        .map(([key, value]) => key);

    // Mapeamento dos ícones
    const icones = {
        'Asilo': SlEyeglass,
        'Hospital': RiHospitalLine,
        'Domicilio': IoHomeOutline,
        'Manha': PiSunHorizon,
        'Tarde': PiSunDimLight,
        'Noite': PiMoonDuotone,
        'Pernoite': PiMoonFill
    };

    return (
        <>
            <div className={styles.app}>
                <div className={styles.row}>
                    <p className={styles.h3foggy}>{name}</p>
                    <GrUserSettings className={styles.iconChangeConfig}/>
                </div>
                <div className={styles.row}>
                    <div className={styles.contentRow}>
                        {name === "Disponibilidade" && disponibilidade.map((item, index) => (
                            <div key={index} className={styles.itens}>
                                <IconContext.Provider value={{ className: styles.icon }}>
                                    {icones[item] && React.createElement(icones[item])}
                                </IconContext.Provider>
                                {item}
                            </div>
                        ))}
                        {name === "Locais aptos" && locais.map((local, index) => (
                            <div key={index} className={styles.itens}>
                                <IconContext.Provider value={{ className: styles.icon }}>
                                    {icones[local] && React.createElement(icones[local])}
                                </IconContext.Provider>
                                {local}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
