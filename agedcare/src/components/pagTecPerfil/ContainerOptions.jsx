import React, { useState, useEffect } from 'react';
import styles from './../../pages/PerfilTec/tecnicoPerfil.module.css';
import { IconContext } from 'react-icons';
import { GrUserSettings } from "react-icons/gr";
import { RiHospitalLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { PiSunHorizon, PiSunDimLight, PiMoonDuotone, PiMoonFill } from "react-icons/pi";
import { SlEyeglass } from "react-icons/sl";
import { AiOutlineCalendar } from "react-icons/ai"; // Ícone para Fds

export const ContainerOptions = ({ name, data }) => {
    const [availability, setAvailability] = useState({
        Dia: false,
        Tarde: false,
        Noite: false,
        Pernoite: false,
        Fds: false,
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (data) {
            setAvailability({
                Dia: Boolean(data.dia),
                Tarde: Boolean(data.tarde),
                Noite: Boolean(data.noite),
                Pernoite: Boolean(data.pernoite),
                Fds: Boolean(data.fds),
            });
        }
    }, [data]);

    if (!data) {
        return <p>Carregando dados...</p>;
    }

    const locaisAptosAll = {
        Domicilio: data.domicilio,
        Hospital: data.hospital,
        Asilo: data.asilo,
        Clinica: data.clinica,
    };
    const locais = Object.entries(locaisAptosAll)
        .filter(([key, value]) => value)
        .map(([key]) => key);

    const icones = {
        'Asilo': SlEyeglass,
        'Hospital': RiHospitalLine,
        'Domicilio': IoHomeOutline,
        'Dia': PiSunHorizon,
        'Tarde': PiSunDimLight,
        'Noite': PiMoonDuotone,
        'Pernoite': PiMoonFill,
        'Fds': AiOutlineCalendar, // Ícone para Fds
    };

    const handleAvailabilityChange = (key) => {
        setAvailability((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const updateAvailability = async () => {
        const cod = sessionStorage.getItem('user');
        if (!cod) {
            alert('Código do técnico não encontrado. Faça login novamente.');
            console.error('Código do técnico não encontrado.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5050/perfilTecAtualiza', {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cod,
                    dia: availability.Dia,
                    tarde: availability.Tarde,
                    noite: availability.Noite,
                    pernoite: availability.Pernoite,
                    fds: availability.Fds,
                }),
            });

            console.log('Status da resposta:', response.status);
        console.log('Headers da resposta:', response.headers);

            if (!response.ok) {
                let errorMessage = 'Erro ao atualizar a disponibilidade.';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (jsonError) {
                    console.error('Resposta da API não contém JSON válido.');
                }
                console.error(errorMessage);
                alert(errorMessage);
                return;
            }

            console.log('Disponibilidade atualizada com sucesso.');
            setIsEditing(false);
            window.location.reload();
        } catch (error) {
            console.error('Erro ao atualizar a disponibilidade:', error);
            alert(`Erro ao atualizar a disponibilidade: ${error.message}`);
        }
    };

    return (
        <div className={styles.app}>
            <div className={styles.row}>
                <p className={styles.h3foggy}>{name}</p>
                <GrUserSettings className={styles.iconChangeConfig} onClick={() => setIsEditing(!isEditing)} />
            </div>
            <div className={styles.row}>
                <div className={styles.contentRow}>
                    {name === "Disponibilidade" && (
                        <>
                            {Object.keys(availability).map((key) => (
                                <div key={key} className={styles.itens}>
                                    <IconContext.Provider value={{ className: styles.icon }}>
                                        {icones[key] && React.createElement(icones[key])}
                                    </IconContext.Provider>
                                    <label>
                                        {key}
                                        <input
                                            type="checkbox"
                                            checked={availability[key]}
                                            onChange={() => isEditing && handleAvailabilityChange(key)}
                                            disabled={!isEditing}
                                        />
                                    </label>
                                </div>
                            ))}
                        </>
                    )}
                    {name === "Locais aptos" && locais.map((local, index) => (
                        <div key={index} className={styles.itens}>
                            <IconContext.Provider value={{ className: styles.icon }}>
                                {icones[local] && React.createElement(icones[local])}
                            </IconContext.Provider>
                            {local}
                        </div>
                    ))}
                </div>
                {isEditing && (
                    <button onClick={updateAvailability} className={styles.btnComentario}>Salvar</button>
                )}
            </div>
        </div>
    );
};
