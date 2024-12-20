import React, {useState,useEffect}from 'react';
import { Link } from 'react-router-dom';
import styles from './card.module.css';
import { RiHospitalLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { PiSunHorizon, PiSunDimLight, PiMoonDuotone, PiMoonFill } from "react-icons/pi";
import { SlEyeglass } from "react-icons/sl";
import { MdLocalHospital } from "react-icons/md";  // Ícone para clínica
import tecImage from './../../assets/tec1.jpeg'
import Avatar1 from '../../assets/tec1.jpeg'
import Avatar2 from '../../assets/tec2.jpeg'
import Avatar3 from '../../assets/tecpic.png'

export const Card = ({ name, age, cidade, locaisAptos, img, id }) => {
    const [value, setValue] = useState(null); // Estado inicial como null
    
      // Atualiza o estado com o avatar de 'data' quando disponível
      useEffect(() => {
        if (img) {
          setValue(Number(img));
        }
      }, [img]);
    
      // Determina qual avatar exibir
      const avatarToDisplay =
        value === 1 ? Avatar1 :
        value === 2 ? Avatar2 :
        value === 3 ? Avatar3 :
        null;
    
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
        <Link to={`/TecnicoInfo/${id}`}  className={styles.link}>
            <div className={styles.card}>
                <div className={styles.imgPerfil}>
                    {avatarToDisplay && <img src={avatarToDisplay} alt={``} />}
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

export default Card;
