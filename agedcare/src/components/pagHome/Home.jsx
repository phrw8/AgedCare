import React, { useState, useEffect } from 'react';
import styles from './home.module.css';
import { InputSrc } from './InputSrc';
import { Card } from './Card';
import { Pagination } from './Pagination';

export const Home = () => {
    const [tecnicosData, setTecnicosData] = useState([]);
    const [cidade, setCidade] = useState("");
    const [cidadeData, setCidadeData] = useState([]);
    const [skip, setSkip] = useState(0); // Estado para controlar a paginação
    const limit = 12; // Limite de itens por página

    useEffect(() => {
        if (cidade) {
            const cidadeLowerCase = cidade.toLowerCase();
            const tecnicosFiltrados = tecnicosData.filter(tecnico => 
                tecnico.cidade.toLowerCase().includes(cidadeLowerCase)
            );
            setCidadeData(tecnicosFiltrados);
        } else {
            setCidadeData(tecnicosData); // Exibe todos os técnicos se a cidade não estiver filtrada
        }
    }, [cidade, tecnicosData]);

    useEffect(() => {
        const fetchTecnicos = async () => {
            try {
                const response = await fetch('http://localhost:5050/home');
                const data = await response.json();
                setTecnicosData(data);
            } catch (error) {
                console.error('Ocorreu um erro ao buscar os técnicos:', error);
            }
        };

        fetchTecnicos();
    }, []);

    // Cálculo dos dados a serem exibidos na página atual
    const currentData = cidadeData.slice(skip, skip + limit);

    return (
        <div className={styles.homeContainer}>
            <InputSrc cidade={cidade} setCidade={setCidade} />
            {cidade ? <h2 className={styles.title}>Cuidadores de {cidade}</h2> :
                <h2 className={styles.title}>Cuidadores perto de você</h2>}

            <div className={styles.content}>
                {currentData.length > 0 ? (
                    currentData.map(tecnico => (
                        <Card 
                            key={tecnico.cod} 
                            name={tecnico.nome} 
                            img={tecnico.avatar} 
                            age={tecnico.datanasc} 
                            cidade={tecnico.cidade} 
                            locaisAptos={{
                                dia: tecnico.dia,
                                noite: tecnico.noite,
                                tarde: tecnico.tarde,
                                fds: tecnico.fds,
                                pernoite: tecnico.pernoite,
                                domicilio: tecnico.domicilio,
                                hospital: tecnico.hospital,
                                asilo: tecnico.asilo,
                                clinica: tecnico.clinica
                            }}
                            id={tecnico.cod} 
                        />
                    ))
                ) : (
                    <div className={styles.alert}>Nenhum cuidador encontrado</div>
                )}
            </div>

            <Pagination
                limit={limit}
                total={cidadeData.length}
                skip={skip}
                setSkip={setSkip}
                data={cidadeData}
            />
        </div>
    );
};
