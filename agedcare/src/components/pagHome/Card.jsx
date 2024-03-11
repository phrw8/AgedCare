import React from 'react'
import styles from './card.module.css'
import { Link } from 'react-router-dom';
export const Card = ({ name, age, cidade, locais, periodo, img, id}) => {

    // if (!locais) {
    //     return null; // Ou qualquer comportamento que você deseje caso 'locais' seja inválido
    // }

    // // Acessa a propriedade 'locais' do objeto e verifica se é um array
    // const locaisArray = locais.locais;
    // if (!Array.isArray(locaisArray)) {
    //     return null; // Ou qualquer comportamento que você deseje caso 'locaisArray' não seja um array
    // }

    // // Filtra os elementos verdadeiros do array locaisArray
    // const locaisVerdadeiros = locaisArray.filter(local => local);

    // <ul>
    //             {locaisVerdadeiros.map((local, index) => (
    //                 <li key={index}>{local}</li>
    //             ))}
    //         </ul>

    const calcularIdade = (dataNascimento) => {
        const dataNascimentoObj = new Date(dataNascimento);
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
    // const locaisArray = Object.entries(locais)
    //     .filter(([key, value]) => value) // Filtra apenas os valores verdadeiros
    //     .map(([key, value]) => ({ [key]: value }));

    const locaisArray = locais instanceof Object ?
        Object.keys(locais).filter(key => locais[key]) :
        null;


    return (
        <Link to="/TecnicoInfo" state={{ id: id }} className={styles.link} >
        <div className={styles.card}> 
             
            <div className={styles.imgPerfil}></div>
            <h4 className={styles.name}>{name}</h4>
            <h5 className={styles.personalInfo}>{calcularIdade(age)}, {cidade}</h5>

            <hr className={styles.divisao} />

            <ul className={styles.locaisList}>
                {locaisArray ? locaisArray.map((item, index) => (
                    <li key={index}>{item}</li>
                )) : null}
            </ul>

            <h5>{periodo}</h5>
            
        </div>
        </Link>
    );
};