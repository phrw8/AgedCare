import React, { useState, useEffect } from 'react'
import styles from './perfil.module.css'
import { ContainerUserData } from './ContainerUserData';
import { UserImage } from './UserImage';

import img1 from './../../assets/BgCadeiraRodas.png'
import img2 from './../../assets/birdLine.png'

export const Perfil = () => {
  const [disabled, setDisabled] = useState(true);
  // pega a local storage e ve quem esta acessando 
  const id = localStorage.getItem('id');

  // estado inicial que o dado se encontra
  const [userData, setUserData] = useState([]); // Estado para armazenar os dados
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);


  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro: {error.message}</div>;
  }

  const fetchData = async () => {
    if (id) {
      try {
        const userResponse = await fetch(`http://localhost:3000/users/${id}`);
        if (!userResponse.ok) {
          throw new Error('Erro ao buscar o usuário');
        }
        const data = await userResponse.json();
        setUserData(data);
      } catch (error) {
        console.error('Erro ao buscar o usuário:', error);
      }
    }
  };
  const updateUserData = async ( id,newData) => {
    try {
      const updateResponse = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (!updateResponse.ok) {
        throw new Error('Erro ao atualizar os dados do usuário');
      }

      console.log('Dados do usuário atualizados com sucesso');
      alert("Dados atualizados com sucesso")
    } catch (error) {
      console.error('Ocorreu um erro ao atualizar os dados do usuário:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(userData)
  }, []);

  return (
    <>
      <div className={styles.containerPerfil}>
      <div className={styles.collumn0}>
        <img src={img2} alt="" />
        <img src={img2} alt="" className={styles.esquerda}/>

      </div>
        <div className={styles.collumn1}>
        <h3 className={styles.title}>Aqui esta suas informações:</h3>  
        <ContainerUserData disabled={disabled} toggleDisabled={toggleDisabled} oldData={userData} updateUserData={updateUserData} id={id}/>
        </div>
        <div className={styles.collumn2}>
          <UserImage />
          <div className={styles.banner}>
            <img src={img1} alt="" />
          </div>
          <div className={styles.welcome}>
            <p>Bem vindo!</p>
          </div>
        </div>

      </div>

    </>
  )
}
