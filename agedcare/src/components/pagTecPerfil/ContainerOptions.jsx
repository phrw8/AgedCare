import React, { useState, useEffect } from 'react';
import styles from './../../pages/PerfilTec/tecnicoPerfil.module.css';
import { IconContext } from 'react-icons';
import { GrUserSettings } from "react-icons/gr";
import { RiHospitalLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { PiSunHorizon, PiSunDimLight, PiMoonDuotone, PiMoonFill } from "react-icons/pi";
import { SlEyeglass } from "react-icons/sl";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaClinicMedical } from "react-icons/fa";

export const ContainerOptions = ({ name, data }) => {
    const [availability, setAvailability] = useState({
        Dia: false,
        Noite: false,
        Tarde: false,
        Fds: false,
        Pernoite: false,
    });

    const [availaLugar, setAvailaLugar] = useState({
        Domicilio: false,
        Hospital: false,
        Asilo: false,
        Clinica: false,
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (data) {
            setAvailability({
                Dia: data.dia === 'true',
                Noite: data.noite === 'true',
                Tarde: data.tarde === 'true',
                Fds: data.fds === 'true',
                Pernoite: data.pernoite === 'true',
            });

            setAvailaLugar({
                Domicilio: data.domicilio === 'true',
                Hospital: data.hospital === 'true',
                Asilo: data.asilo === 'true',
                Clinica: data.clinica === 'true',
            });
        }
    }, [data]);

    if (!data) {
        return <p>Carregando dados...</p>;
    }

    const icones = {
        'Asilo': SlEyeglass,
        'Hospital': RiHospitalLine,
        'Domicilio': IoHomeOutline,
        'Clinica': FaClinicMedical,
        'Dia': PiSunHorizon,
        'Noite': PiMoonDuotone,
        'Tarde': PiSunDimLight,
        'Fds': AiOutlineCalendar,
        'Pernoite': PiMoonFill,
    };

    const handleAvailabilityChange = (key) => {
        setAvailability((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleAvailaLugar = (key) => {
        setAvailaLugar((prev) => ({
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
            const response = await fetch('http://localhost:5050/disponibilidade', {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cod,
                    dia: availability.Dia,
                    noite: availability.Noite,
                    tarde: availability.Tarde,
                    fds: availability.Fds,
                    pernoite: availability.Pernoite,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Erro ao atualizar a disponibilidade.';
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

    const updateAvailaLugar = async () => {
        const cod = sessionStorage.getItem('user');
        if (!cod) {
            alert('Código do técnico não encontrado. Faça login novamente.');
            console.error('Código do técnico não encontrado.');
            return;
        }
        try {
            const response = await fetch('http://localhost:5050/lugares', { // Rota específica para atualizar locais
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cod,
                    domicilio: availaLugar.Domicilio,
                    hospital: availaLugar.Hospital,
                    asilo: availaLugar.Asilo,
                    clinica: availaLugar.Clinica,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Erro ao atualizar os locais aptos.';
                console.error(errorMessage);
                alert(errorMessage);
                return;
            }

            console.log('Locais aptos atualizados com sucesso.');
            setIsEditing(false);
            window.location.reload();
        } catch (error) {
            console.error('Erro ao atualizar os locais aptos:', error);
            alert(`Erro ao atualizar os locais aptos: ${error.message}`);
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
                    {name === "Locais aptos" && Object.keys(availaLugar).map((key) => (
                        <div key={key} className={styles.itens}>
                            <IconContext.Provider value={{ className: styles.icon }}>
                                {icones[key] && React.createElement(icones[key])}
                            </IconContext.Provider>
                            <label>
                                {key}
                                <input
                                    type="checkbox"
                                    checked={availaLugar[key]}
                                    onChange={() => isEditing && handleAvailaLugar(key)}
                                    disabled={!isEditing}
                                />
                            </label>
                        </div>
                    ))}
                </div>
                {isEditing && (
                    <>
                        {name === "Disponibilidade" && (
                            <button onClick={updateAvailability} className={styles.btnComentario}>Salvar Disponibilidade</button>
                        )}
                        {name === "Locais aptos" && (
                            <button onClick={updateAvailaLugar} className={styles.btnComentario}>Salvar Locais</button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
