import React, { useEffect, useState } from 'react';
import styles from './containerContent.module.css';
import { ContainerData } from './ContainerData';

const ContainerContent = ({ id }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchTechnicianData = async () => {
            try {
                if (id) {
                    const url = `http://localhost:5050/tecnico/${id}`;
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error('Erro ao obter os dados do técnico');
                    }
                    const result = await response.json();
                    console.log('Dados recebidos:', result);
                    setData(result);
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        };

        fetchTechnicianData();
    }, [id]);

    return (
        <div className={styles.app}>
            <div className={styles.square}>
                <div className={styles.banner}></div>
                <ContainerData data={data} />
            </div>
        </div>
    );
};

export default ContainerContent;
