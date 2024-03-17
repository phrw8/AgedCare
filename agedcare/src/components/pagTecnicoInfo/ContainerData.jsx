import React, { useState } from 'react'
import styles from './containerData.module.css'

import img1 from '../../assets/tecpic.png'
import { FaWhatsapp } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";

import { IconContext } from 'react-icons';

import { RiHospitalLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { PiSunHorizon } from "react-icons/pi";
import { PiSunDimLight } from "react-icons/pi";
import { PiMoonDuotone } from "react-icons/pi";
import { PiMoonFill } from "react-icons/pi";
import { SlEyeglass } from "react-icons/sl";
import  ComentarioForm  from './avaliacao/ComentarioForm';
import { Comentarios } from './avaliacao/Comentarios';

export const ContainerData = ({ data }) => {
    const tecId=data ? data.id : ""
    const currentUserId=localStorage.getItem("id")
    const numeroTelefone = data ? data.celular : null;
    const mensagem = 'Olá, venho da AgedCare!';
    const mensagemCodificada = encodeURIComponent(mensagem);

    const locaisAptosData = data ? data.locaisAptos : null;

    const locaisAptosArray = locaisAptosData ? Object.entries(locaisAptosData)
        .filter(([local, apto]) => apto)
        .map(([local, apto]) => local)
        : null;

    const disponibilidadeData = data ? data.disponibilidade : null;

    const disponibilidadeArray = disponibilidadeData ? Object.entries(disponibilidadeData)
        .filter(([local, apto]) => apto)
        .map(([local, apto]) => local)
        : null;



    function calcularIdade(dataNascimento) {
        // Converte a data de nascimento para um objeto Date
        const dataNascimentoObj = new Date(dataNascimento);
        const dataAtual = new Date(); // Data atual

        // Calcula a diferença entre as datas em milissegundos
        const diff = dataAtual - dataNascimentoObj;

        // Converte a diferença de milissegundos para anos
        const idade = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)); // 365.25 dias por ano considerando anos bissextos

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
    };
    console.log(tecId)
    return (
        <>
            <div className={styles.app}>
                <div className={styles.row0Container}>
                    <div className={styles.card}>
                        <img src={img1} className={styles.img} />
                    </div>
                    <div className={styles.dataContainer}>
                        <div className={styles.avaliacao}>
                            <div className={styles.stars}>
                                <IoMdStar className={styles.start} />
                                <IoMdStar className={styles.start} />
                                <IoMdStar className={styles.start} />
                                <IoMdStar className={styles.start} />
                                <IoMdStar className={styles.start} />
                            </div>
                            <div className={styles.avaliacao2}>
                                <div className={styles.numeroAvalicao}>
                                    <p className={styles.avNum}>5,0/5,0</p>
                                </div>
                                <div className={styles.quantidadeAvaliacoes}>
                                    <p className={styles.avLengh}>1.352 avaliações </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.personalContainer}>
                            <div className={styles.row0}>
                                <p className={styles.name}>{data ? data.name : "nome nao encontrado"} </p>
                            </div>
                            <div className={styles.row1}>
                                <p className={styles.ageCity}>{calcularIdade(data ? data.birthday : 0)} anos,</p>
                                <p className={styles.ageCity}>{data ? data.cidade : "cidade nao encontrado"}</p>
                            </div>
                            <hr className={styles.divisoria} />
                            <div className={styles.row2}>
                                <div className={styles.locaisDisp}>
                                    {locaisAptosArray ?
                                        locaisAptosArray.map((local, index) => (
                                            <div key={index} className={styles.item}>
                                                <IconContext.Provider value={{ className: styles.icon }}>
                                                    {icones[local] && React.createElement(icones[local])}
                                                </IconContext.Provider>
                                                <p className={styles.hab}>{local}</p>
                                            </div>
                                        ))
                                        : null
                                    }
                                </div>
                                <div className={styles.locaisDisp}>
                                    {disponibilidadeArray ?
                                        disponibilidadeArray.map((local, index) => (
                                            <div key={index} className={styles.item}>
                                                <IconContext.Provider value={{ className: styles.icon }}>
                                                    {icones[local] && React.createElement(icones[local])}
                                                </IconContext.Provider>
                                                <p className={styles.hab}>{local}</p>
                                            </div>
                                        ))
                                        : null
                                    }
                                </div>

                            </div>
                        </div>
                        <div className={styles.btnContainer}>
                            <button className={styles.btnWhatssap}><a href={`https://wa.me/${numeroTelefone}/?text=${mensagemCodificada}`} target="_blank" rel="noopener noreferrer">
                                Entre em contato <FaWhatsapp />
                            </a></button>

                        </div>
                    </div>
                </div>
                <div className={styles.row1Container}>
                    <div className={styles.descContainer}>
                        <p>{data ? data.comentario : 0}</p>
                    </div>
                </div>
                <div className={styles.row2Container}>
                    <Comentarios currentUserId={currentUserId} tecId={tecId}/>
                </div>



            </div>
        </>
    )
}
