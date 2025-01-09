import React, { useEffect, useState } from 'react';
import styles from './containerContent.module.css';
import { ContainerData } from './ContainerData';
import Image1 from '../../assets/banner1.jpg';
import Image2 from '../../assets/banner2.jpg';
import Image3 from '../../assets/banner3.png';

const ContainerContent = ({ id }) => {
    const [data, setData] = useState(null);
    const [bannerValue, setBannerValue] = useState(null); // Estado inicial para o banner
    
    // Atualiza o estado com o banner de 'data' quando disponível
    useEffect(() => {
      if (data?.banner) {
        setBannerValue(Number(data.banner)); // Converte o valor do banner para número
        console.log(data)
      }
    }, [data]);
    
    // Determina qual banner exibir
    const bannerToDisplay =
      bannerValue === 1 ? Image1 :
      bannerValue === 2 ? Image2 :
      bannerValue === 3 ? Image3 :
      null;
    

      useEffect(() => {
        const fetchTechnicianData = async () => {
            try {
                if (!id) {
                    console.warn('Nenhum ID fornecido para buscar os dados do técnico');
                    return;
                }
    
                const url = `http://localhost:5050/tecnico/${id}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    const errorDetails = await response.json();
                    throw new Error(
                        `Erro ao obter os dados do técnico: ${response.status} ${response.statusText} - ${errorDetails.message || 'Detalhes não disponíveis'}`
                    );
                }
    
                const result = await response.json();
                console.log('Dados recebidos:', result);
                setData(result);
            } catch (error) {
                console.error('Erro ao buscar os dados do técnico:', error.message || error);
                alert('Ocorreu um erro ao buscar os dados do técnico. Tente novamente mais tarde.');
            }
        };
    
        fetchTechnicianData();
    }, [id]);

    return (
        <div className={styles.app}>
            <div className={styles.square}>
                <div className={styles.banner}>
                {bannerToDisplay && <img src={bannerToDisplay} alt="Banner" />}
                </div>
                <ContainerData data={data} />
            </div>
        </div>
    );
};

export default ContainerContent;
