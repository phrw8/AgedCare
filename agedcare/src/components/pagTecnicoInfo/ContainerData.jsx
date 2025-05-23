import React, { useState, useEffect } from 'react'
import styles from './containerData.module.css'

import { FaWhatsapp } from "react-icons/fa";
import { IconContext } from 'react-icons';
import tec1Image from './../../assets/tec1.jpeg'
import { RiHospitalLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { PiSunHorizon } from "react-icons/pi";
import { PiSunDimLight } from "react-icons/pi";
import { PiMoonDuotone } from "react-icons/pi";
import { PiMoonFill } from "react-icons/pi";
import { SlEyeglass } from "react-icons/sl";
// import ComentarioForm from './avaliacao/ComentarioForm';
import { Comentarios } from './avaliacao/Comentarios';
// import { Rating } from './avaliacao/Rating';
import { ShowRating } from './avaliacao/ShowRating';
import Avatar1 from '../../assets/tec1.jpeg'
import Avatar2 from '../../assets/tec2.jpeg'
import Avatar3 from '../../assets/tecpic.png'

export const ContainerData = ({ data }) => {
    // Garantindo que `data` existe antes de acessar suas propriedades
    const tecId = data ? data.cod : "";
    // const currentUserId = localStorage.getItem("id");
    const numeroTelefone = data ? data.fone : null;
    const mensagem = 'Olá, venho da AgedCare!';
    const mensagemCodificada = encodeURIComponent(mensagem);
    const [avaliacaoTec, setAvaliacaoTec] = useState();
    const [mediaAvTec, setMediaAvTec] = useState();


    // Verificação de null e uso de valores padrão
    const locaisAptosData = data ? {
        asilo: data.asilo === 'true',
        hospital: data.hospital === 'true',
        domicilio: data.domicilio === 'true',
        clinica: data.clinica === 'true'
    } : {};

    const disponibilidadeData = data ? {
        dia: data.dia === 'true',
        tarde: data.tarde === 'true',
        noite: data.noite === 'true',
        pernoite: data.pernoite === 'true',
        fds: data.fds === 'true'
    } : {};

    const locaisAptosArray = Object.entries(locaisAptosData)
        .filter(([local, apto]) => apto)
        .map(([local, apto]) => local);

    const disponibilidadeArray = Object.entries(disponibilidadeData)
        .filter(([local, apto]) => apto)
        .map(([local, apto]) => local);



    function calcularIdade(dataNascimento) {
        if (!dataNascimento) return "Data inválida";

        // Converte a data do formato DD/MM/YYYY para YYYY-MM-DD
        const partes = dataNascimento.split('/');
        const dataNascimentoFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;

        const dataNascimentoObj = new Date(dataNascimentoFormatada);
        const dataAtual = new Date();
        const diff = dataAtual - dataNascimentoObj;
        const idade = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

        return isNaN(idade) ? "Data inválida" : idade;
    }


    const icones = {
        'asilo': SlEyeglass,
        'hospital': RiHospitalLine,
        'domicilio': IoHomeOutline,
        'clinica': IoHomeOutline,
        'dia': PiSunHorizon,
        'tarde': PiSunDimLight,
        'noite': PiMoonDuotone,
        'pernoite': PiMoonFill,
        'fds': PiSunHorizon,
    };

    const [value, setValue] = useState(null); // Estado inicial como null

    // Atualiza o estado com o avatar de 'data' quando disponível
    useEffect(() => {
        if (data?.avatar) {
            setValue(Number(data.avatar));
        }
    }, [data]);
    useEffect(()=>{
        console.log(avaliacaoTec)
    },[avaliacaoTec])

    // Determina qual avatar exibir
    const avatarToDisplay =
        value === 1 ? Avatar1 :
            value === 2 ? Avatar2 :
                value === 3 ? Avatar3 :
                    null;
    function calcularMediaAvaliacoes(array, nm) {
        let somaAvaliacoes = 0;
        let count = 0;
        console.log(array)

        array.forEach(item => {
            console.log(item)
            const avaliacao = item;
            if (avaliacao !== null && avaliacao !== undefined) {
                somaAvaliacoes += avaliacao;
                count++;
            }
        });

        const media = count > 0 ? (somaAvaliacoes / count).toFixed(1) : 'Não possui avaliações';
        console.log(media)
        return nm ? media : count;
    }
    useEffect(() => {
        const fetchAvaliacaoTec = async () => {
            try {
                const response = await fetch(`http://localhost:5050/comentario/${tecId}`, {
                    method: 'GET',
                    credentials: 'include', // Inclui cookies na requisição para gerenciar a sessão
                });

                if (!response.ok) {
                    throw new Error(`Erro ao buscar os comentários. Status: ${response.status}`);
                }

                const data = await response.json();

                // Extrai apenas o campo "avaliacao" dos dados
                const avaliacoes = data.data.map(comentario => comentario.avaliacao);

                console.log('Avaliações:', avaliacoes); // Debug das avaliações extraídas
                setAvaliacaoTec(avaliacoes)
            } catch (error) {
                console.error('Erro ao buscar os comentários:', error);
            }
        };

        fetchAvaliacaoTec();
    }, [tecId]);

    // useEffect(() => {
    //     const atualizarAvaliacao = async () => {
    //         if (tecId && avaliacaoTec) {
    //             try {
    //                 await fetch(`http://localhost:3000/users/${tecId}`, {
    //                     method: 'PATCH',
    //                     headers: {
    //                         'Content-Type': 'application/json'
    //                     },
    //                     body: JSON.stringify({
    //                         avaliacao: calcularMediaAvaliacoes(avaliacaoTec, 1),
    //                     })
    //                 });
    //             } catch (error) {
    //                 console.error('Ocorreu um erro ao atualizar a avaliação:', error);
    //             }
    //         }
    //     };
    //     if (tecId) {
    //         atualizarAvaliacao();
    //     }
    // }, [tecId, avaliacaoTec]);

    return (
        <>
            <div className={styles.app}>
                <div className={styles.row0Container}>
                    <div className={styles.card}>
                        {avatarToDisplay && <img src={avatarToDisplay} alt="Foto do técnico" className={styles.img} />}
                    </div>
                    <div className={styles.dataContainer}>
                        <div className={styles.avaliacao}>
                            <ShowRating rating={avaliacaoTec ? calcularMediaAvaliacoes(avaliacaoTec, 1) : "carregando"} title={true} />
                            <div className={styles.avaliacao2}>
                                <div className={styles.numeroAvalicao}>
                                    <p className={styles.avNum}>5,0/{avaliacaoTec ? calcularMediaAvaliacoes(avaliacaoTec, 1) : "carregando"}</p>
                                </div>
                                <div className={styles.quantidadeAvaliacoes}>
                                    <p className={styles.avLengh}>{avaliacaoTec ? calcularMediaAvaliacoes(avaliacaoTec, 0) : "carregando"} avaliações </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.personalContainer}>
                            <div className={styles.row0}>
                                <p className={styles.name}>{data ? data.nome : "Nome não encontrado"}</p>
                            </div>
                            <div className={styles.row1}>
                                <p className={styles.ageCity}>{data ? calcularIdade(data.datanasc) : ""} anos,</p>
                                <p className={styles.ageCity}>{data ? data.cidade : "Cidade não encontrada"}</p>
                            </div>
                            <hr className={styles.divisoria} />
                            <div className={styles.row2}>
                                <div className={styles.locaisDisp}>
                                    {locaisAptosArray.map((local, index) => (
                                        <div key={index} className={styles.item}>
                                            <IconContext.Provider value={{ className: styles.icon }}>
                                                {icones[local] && React.createElement(icones[local])}
                                            </IconContext.Provider>
                                            <p className={styles.hab}>{local}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.locaisDisp}>
                                    {disponibilidadeArray.map((local, index) => (
                                        <div key={index} className={styles.item}>
                                            <IconContext.Provider value={{ className: styles.icon }}>
                                                {icones[local] && React.createElement(icones[local])}
                                            </IconContext.Provider>
                                            <p className={styles.hab}>{local}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={styles.btnContainer}>
                            <button className={styles.btnWhatssap}>
                                <a href={`https://wa.me/${numeroTelefone}/?text=${mensagemCodificada}`} target="_blank" rel="noopener noreferrer">
                                    Entre em contato <FaWhatsapp />
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.row1Container}>
                    <div className={styles.descContainer}>
                        <p>{data ? data.obs : "Sem observações"}</p>
                    </div>
                </div>
                <div className={styles.row2Container}>
                    <Comentarios tecId={tecId} />
                </div>
            </div>
        </>
    );
}
