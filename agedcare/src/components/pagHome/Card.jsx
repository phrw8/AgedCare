import React from 'react';
import styles from './card.module.css';
import { Link } from 'react-router-dom';

export const Card = ({ name, age, cidade, locaisAptos, img, id }) => {
    const calcularIdade = (age) => {
        const dataNascimentoObj = new Date(age);
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

    const locaisArray = locaisAptos instanceof Object ?
        Object.keys(locaisAptos).filter(key => locaisAptos[key] === 'true') :
        [];

    return (
        <Link to="/TecnicoInfo" state={{ id: id }} className={styles.link}>
            <div className={styles.card}>
                <div className={styles.imgPerfil}>
                    {img && <img src={img} alt={`Foto de ${name}`} />}
                </div>
                <h4 className={styles.name}>{name}</h4>
                <h5 className={styles.personalInfo}>{calcularIdade(age)}, {cidade}</h5>

                <hr className={styles.divisao} />

                <ul className={styles.locaisList}>
                    {locaisArray.length > 0 ? locaisArray.map((item, index) => (
                        <li key={index}>{item}</li>
                    )) : <li>Nenhum local disponível</li>}
                </ul>
            </div>
        </Link>
    );
};
