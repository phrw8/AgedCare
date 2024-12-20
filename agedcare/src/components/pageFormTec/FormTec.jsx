import React, { useState, useEffect } from 'react';
import styles from './formTec.module.css';
import { TecData } from './TecData';
import { TecPreference } from "./TecPreference";
import { TecAdress } from "./TecAdress";
import { TecDocs } from './TecDocs';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { TecConfirm } from './TecConfirm';
import { Navigate } from 'react-router-dom';

const FormTec = ({ screen, setScreen }) => {
    const [submitted, setSubmitted] = useState(false);
    const activeUserString = sessionStorage.getItem("user");
    const activeUser = JSON.parse(activeUserString);

    const formData = {
        ...activeUser,
        nome: activeUser.nome || "",
        cpf: "",
        datanasc: "",
        org: "",
        rg: "",
        email: activeUser.email || "",
        fone: "",
        sexo: "Masculino",
        estado: "União Estável",
        logradouro: "",
        numero: "",
        cidade: "",
        uf: "",
        bairro: "",
        cep: "",
        dia: false,
        noite: false,
        tarde: false,
        fds: false,
        pernoite: false,
        domicilio: false,
        hospital: false,
        asilo: false,
        clinica: false,
        km: "",
        obs: "deixar aki default so pra testa",
        avatar:1,
    };

    const [data, setData] = useState(formData);
    const [validar, setValidar] = useState(false);

    const updateData = (key, value) => {
        setData(prevData => ({
            ...prevData,
            [key]: value
        }));
        console.log(data)
    };
    useEffect(() => {
        console.log(data);
    }, [data]);


    const convertDateToBrazilian = (dateString) => {
        console.log(dateString)
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const componentsList = [
        <TecData updateData={updateData} data={data} />,
        <TecAdress updateData={updateData} data={data} />,
        <TecPreference updateData={updateData} data={data} />,
        <TecDocs updateData={updateData} data={data} />,
        <TecConfirm updateData={updateData} data={data} />
    ];

    const handleNextScreen = () => {
        screen < 4 && validar && setScreen(prevScreen => prevScreen + 1);
    };
    const handlePrevScreen = () => {
        screen > 0 && setScreen(prevScreen => prevScreen - 1);
    };

    const validarSteps = () => {
        let isValid = false;
        if (screen === 0) {
            if (data.nome && data.email && data.datanasc && data.cpf && data.org && data.rg && data.fone) {
                isValid = true;
            } else {
                alert("Preencha todos os campos.");
            }
        } else if (screen === 1) {
            if (data.logradouro && data.cep && data.numero && data.uf && data.cidade && data.bairro) {
                isValid = true;
            } else {
                alert("Preencha todos os campos.");
            }
        } else if (screen === 2) {
            if (data.dia || data.noite || data.tarde || data.fds || data.pernoite) {
                isValid = true;
            } else {
                alert("Preencha todos os campos.");
            }
        } else if (screen === 3) {
            if (data.km) {
                isValid = true;
            } else {
                alert("Preencha todos os campos.");
            }
        }
        setValidar(isValid);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clone the data object to avoid mutating the original
        const formattedData = { ...data };
        console.log(formattedData)

        // Format the date before adding to formattedData
        formattedData.datanasc = convertDateToBrazilian(data.datanasc);

        // Create FormData object and append all fields
        const formDataObj = new FormData();
        for (const key in formattedData) {
            formDataObj.append(key, formattedData[key]);
        }

        // Add cod_usuario to the FormData
        formDataObj.append('cod_usuario', activeUser.cod);

        try {
            const response = await fetch('http://localhost:5050/cadastro-tec', {
                method: 'POST',
                credentials: 'include',
                body: formDataObj,
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const errorData = await response.json();
                console.error('Erro ao enviar os dados:', errorData);
                alert('Erro ao enviar os dados.');
            }
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            alert('Erro ao enviar os dados.');
        }

        /*
     updateData(data.datanasc, convertDateToBrazilian(data.datanasc));
     console.log(data);
 
     const formData = new FormData();
 
     for (const key in data) {
         formData.append(key, data[key]);
     }
 
     // Add cod_usuario to the FormData
     formData.append('cod_usuario', activeUser.cod);
 
     try {
         const response = await fetch('http://localhost:5050/cadastro-tec', {
             method: 'POST',
             credentials: 'include',
             body: formData,
         });
 
         if (response.ok) {
             setSubmitted(true);
         } else {
             const errorData = await response.json();
             console.error('Erro ao enviar os dados:', errorData);
             alert('Erro ao enviar os dados.');
         }
     } catch (error) {
         console.error('Erro ao enviar os dados:', error);
         alert('Erro ao enviar os dados.');
     }
     */
    };


    return (
        <>
            {submitted ? <Navigate to="/Home" /> : null}
            <form className={styles.form} onSubmit={handleSubmit}>
                {componentsList[screen]}
                <div className={styles.buttons}>
                    {screen !== 0 && (
                        <button type="button" onClick={handlePrevScreen} className={styles.btnLeft}>
                            <GrFormPrevious />
                            <span>Anterior</span>
                        </button>
                    )}
                    {screen === 4 ? (
                        <button type="submit" className={styles.btnRight}>
                            <span>Enviar</span>
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => {
                                validarSteps();
                                handleNextScreen();
                            }}
                            className={styles.btnRight}
                        >
                            <span>Próximo</span>
                            <GrFormNext />
                        </button>
                    )}
                </div>
            </form>
        </>
    );
};

export default FormTec;
