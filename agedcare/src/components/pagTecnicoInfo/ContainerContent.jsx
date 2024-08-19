// ContainerContent.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './containerContent.module.css';
import { ContainerData } from './ContainerData';

const ContainerContent = () => {
  const location = useLocation();
  const [data, setData] = useState(null);

  // Obtém o id da rota
  const id = location.state?.id;

  useEffect(() => {
    const fetchTechnicianData = async () => {
      try {
        if (id) {
          const url = `http://localhost:5050/tecnico/${id}`; // Endpoint para buscar dados do técnico
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Erro ao obter os dados do técnico');
          }
          const result = await response.json();
          setData(result);
          console.log(result)
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
