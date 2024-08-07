import React, { useState, useEffect } from 'react';
import styles from './perfil.module.css';
import { ContainerUserData } from './ContainerUserData';
import { UserImage } from './UserImage';

import img1 from './../../assets/BgCadeiraRodas.png';
import img2 from './../../assets/birdLine.png';

export const Perfil = () => {
  const [disabled, setDisabled] = useState(true);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const info = sessionStorage.getItem('user');
  let cod = null;

  if (info) {
    const user = JSON.parse(info);
    cod = user.cod;
  }

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  const fetchData = async () => {
    if (cod) {
      try {
        const userResponse = await fetch('http://localhost:5050/usuario', {
          credentials: 'include',
        });
        if (!userResponse.ok) {
          throw new Error('Erro ao buscar o usuário');
        }
        const data = await userResponse.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar o usuário:', error);
        setError(error);
        setLoading(false);
      }
    }
  };

  const updateUserData = async (newData) => {
    try {
      const updateResponse = await fetch('http://localhost:5050/usuario', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newData),
      });

      if (!updateResponse.ok) {
        throw new Error('Erro ao atualizar os dados do usuário');
      }

      console.log('Dados do usuário atualizados com sucesso');
      alert("Dados atualizados com sucesso");
    } catch (error) {
      console.error('Ocorreu um erro ao atualizar os dados do usuário:', error.message);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro: {error.message}</div>;
  }

  return (
    <div className={styles.containerPerfil}>
      <div className={styles.collumn0}>
        <img src={img2} alt="" />
        <img src={img2} alt="" className={styles.esquerda} />
      </div>
      <div className={styles.collumn1}>
        <h3 className={styles.title}>Aqui estão suas informações:</h3>
        <ContainerUserData
          disabled={disabled}
          toggleDisabled={toggleDisabled}
          oldData={userData}
          updateUserData={updateUserData}
        />
      </div>
      <div className={styles.collumn2}>
        <UserImage />
        <div className={styles.banner}>
          <img src={img1} alt="" />
        </div>
        <div className={styles.welcome}>
          <p>Bem-vindo!</p>
        </div>
      </div>
    </div>
  );
};
