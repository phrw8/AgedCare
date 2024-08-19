// Card.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './card.module.css';
import { RiHospitalLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { PiSunHorizon, PiSunDimLight, PiMoonDuotone, PiMoonFill } from "react-icons/pi";
import { SlEyeglass } from "react-icons/sl";
import { MdLocalHospital } from "react-icons/md";  // Ícone para clínica

export const Card = ({ name, age, cidade, locaisAptos, img, id }) => {
    const calcularIdade = (age) => {
        const [dia, mes, ano] = age.split('/');
        const dataNascimentoObj = new Date(`${ano}-${mes}-${dia}`);
        if (isNaN(dataNascimentoObj)) {
            return 'Data inválida';
        }
        const dataAtual = new Date();

        let idade = dataAtual.getFullYear() - dataNascimentoObj.getFullYear();
        const mesAtual = dataAtual.getMonth();
        const diaAtual = dataAtual.getDate();
        const mesNascimento = dataNascimentoObj.getMonth();
        const diaNascimento = dataNascimentoObj.getDate();

        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
            idade--;
        }

        return idade;
    }

    const icones = {
        'asilo': SlEyeglass,
        'hospital': RiHospitalLine,
        'domicilio': IoHomeOutline,
        'manha': PiSunHorizon,
        'tarde': PiSunDimLight,
        'noite': PiMoonDuotone,
        'pernoite': PiMoonFill,
        'fds': PiSunHorizon,
        'clinica': MdLocalHospital,
        'dia': PiSunHorizon,
    };

    const locaisArray = locaisAptos instanceof Object ?
        Object.keys(locaisAptos).filter(key => locaisAptos[key] === 'true') :
        [];

    const tempoArray = locaisArray.filter(item =>
        ['manha', 'tarde', 'noite', 'pernoite', 'dia', 'fds'].includes(item.toLowerCase())
    );

    const locaisEspecificosArray = locaisArray.filter(item =>
        ['asilo', 'hospital', 'domicilio', 'clinica'].includes(item.toLowerCase())
    );

    return (
        <Link to={{ pathname: "/TecnicoInfo", state: { id } }} className={styles.link}>
            <div className={styles.card}>
                <div className={styles.imgPerfil}>
                    {img && <img src={img} alt={`Foto de ${name}`} />}
                </div>
                <h4 className={styles.name}>{name}</h4>
                <h5 className={styles.personalInfo}>{calcularIdade(age)}, {cidade}</h5>

                <hr className={styles.divisao} />

                <ul className={styles.locaisList}>
                    {tempoArray.length > 0 ? tempoArray.map((item, index) => {
                        const Icon = icones[item.toLowerCase()];
                        return (
                            <li key={index} className={styles.localItem}>
                                {Icon && <Icon className={styles.icone} />}
                                <span>{item}</span>
                            </li>
                        );
                    }) : <li>Nenhum horário disponível</li>}
                </ul>

                <hr className={styles.divisao} />

                <ul className={styles.locaisList}>
                    {locaisEspecificosArray.length > 0 ? locaisEspecificosArray.map((item, index) => {
                        const Icon = icones[item.toLowerCase()];
                        return (
                            <li key={index} className={styles.localItem}>
                                {Icon && <Icon className={styles.icone} />}
                                <span>{item}</span>
                            </li>
                        );
                    }) : <li>Nenhum local disponível</li>}
                </ul>
            </div>
        </Link>
    );
};
