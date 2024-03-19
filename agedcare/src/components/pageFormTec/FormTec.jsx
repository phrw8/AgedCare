import React, { useEffect } from 'react'
import { useState } from 'react';
import styles from './formTec.module.css'

import { TecData } from './TecData'
import { TecPreference } from "./TecPreference";
import { TecAdress } from "./TecAdress";
import { TecDocs } from './TecDocs';

import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { TecConfirm } from './TecConfirm';

import { Navigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const FormTec = ({ screen, setScreen }) => {

    const url='http://localhost:3000/users'
    const [submitted, setSubmitted] = useState(false); 

    const activeUserString=sessionStorage.getItem("user")
    const activeUser= JSON.parse(activeUserString)

    // dados a serem mandados para o server
    const formData = {
        ...activeUser,
        tecnico:true,
        name: "",
        birthday: "",
        cpf: "",
        emissor: "",
        rg: "",
        celular: "",
        email: "",
        civilState: "União Estável",
        sexo: "Masculino",
        cep: "",
        logradouro: "",
        endereco: "",
        nm: "",
        uf: "",
        cidade: "",
        bairro: "",
        disponibilidade: {
            Manhã: false,
            Tarde: false,
            Noite: false,
            Pernoite: false,
            Fds: false,
        },
        locaisAptos: {
            Domicilio: false,
            Hospital: false,
            Clinica: false,
            Asilo: false,
        },
        distancia: "",
        certificadoProfissional: "",
        identidade: "",
        perfil: "",
        comentario:"",
        avaliacao:""
    };

    const [data, setData] = useState(formData);
    const [validar, setValidar] = useState(false)
    // atualiza os dados do formData
    const updateData = (key, value) => {
        console.log(key)
        console.log(value)
        setData(prevData => {
            // Divide a chave em partes usando '.'
            const keys = key.split('.');
            // Copia o estado anterior de 'data'
            const newData = { ...prevData };
            // Atualiza o valor aninhado no objeto 'data'
            let current = newData;
            for (let i = 0; i < keys.length; i++) {
                if (i === keys.length - 1) {
                    // Última chave, atualiza o valor
                    current[keys[i]] = value;
                } else {
                    // Ainda não chegamos à última chave, avança para o próximo nível
                    current = current[keys[i]];
                }
            }
            return newData;
        });
    };

    // lista de componentes
    const componentsList = [
        <TecData updateData={updateData} data={data} />,
        <TecAdress updateData={updateData} data={data} />,
        <TecPreference updateData={updateData} data={data} />,
        <TecDocs updateData={updateData} data={data} />,
        <TecConfirm updateData={updateData} data={data} />
    ];

    // funcoes para passar peolos componentes
    const handleNextScreen = () => {
        screen < 4 && validar && setScreen(prevScreen => prevScreen + 1);
    };
    const handlePrevScreen = () => {
        screen > 0 && setScreen(prevScreen => prevScreen - 1);
    };

    // funcao para verificar se os campos de inputs estao sendo preenchidos 
    const validarSteps = () => {
        let isValid = false;

        if (screen === 0) {
            if (screen === 0) {
                if (data.name !== '' && data.email !== '' && data.birthday !== "" && data.cpf !== "" && data.emissor !== "" && data.rg !== '' && data.celular !== "") {
                    isValid = true;
                    console.log("Todos os campos estão preenchidos.");
                } else {
                    isValid = false;
                    alert("Preencha todos os campos .");
                }
            }
        } else if (screen === 1) {
            if (data.logradouro !== '' && data.cep !== '' && data.endereco !== "" && data.nm !== "" && data.uf !== "" && data.cidade !== '' && data.bairro !== "") {
                isValid = true;
                console.log("Todos os campos estão preenchidos.");
            } else {
                isValid = false;
                alert("Preencha todos os campos .");
            }
        } else if (screen === 2) {
            if (data.cep !== '' && data.nm !== '') {
                isValid = true;
                console.log("ok");
            } else {
                isValid = false;
                alert("Preencha todos os campos .");
            }
        } else if (screen === 3) {
            if (data.km !== '' && data.disponibilidade !== false) {
                isValid = true;
                console.log("ok");
            } else {
                isValid = false;
                alert("Preencha todos os campos .");
            }
        }
        setValidar(isValid); // Define o estado validar uma vez, com o valor de isValid
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userId=sessionStorage.getItem("userId")
        const res = await fetch(`${url}/${userId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
        })
        console.log(res);

        if (res.ok) {
            setSubmitted(true);
        }
    }
    return (
        <>
         {submitted ? <Navigate to="/Home" /> : null}
            <form className={styles.form} onSubmit={(e)=>{handleSubmit(e)}}>
                {componentsList[screen]}
                <div className={styles.buttons}>
                    {screen !== 0 ?
                        <button type="button" onClick={handlePrevScreen} className={styles.btnLeft}>
                            <GrFormPrevious />
                            <span>Anterior</span>
                        </button> : null}

                    {screen === 4 ?
                        <button type="submit" className={styles.btnRight} >
                            <span>Enviar</span>
                        </button> : null}
                    {screen !== 4 ?
                        <button type="button" onClick={() => {
                            validarSteps()
                            console.log("1")
                            handleNextScreen()
                            setValidar(!validar);
                        }} className={styles.btnRight}>
                            <span>Próximo</span>
                            <GrFormNext />
                        </button> : null
                    }
                </div>
            </form>
        </>

    )
}

export default FormTec