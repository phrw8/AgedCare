import React, { useState, useEffect } from 'react'
import styles from './perfil.module.css'
import { ContainerUserData } from './ContainerUserData';
import { UserImage } from './UserImage';

import img1 from './../../assets/bgCadeiraRodas.svg'
import useFetch from '../hooks/useFetch';


export const Perfil = () => {
  const [disabled, setDisabled] = useState(true);

  // pega a local storage e ve quem esta acessando 
  const userName = localStorage.getItem('userName');

  // modifica os dados do foundUser
  const [userData, setUserData] = useState([])

  // estado inicial que o dado se encontra
  const [data, setData] = useState(null); // Estado para armazenar os dados
  const { loading, error } = useFetch(`http://localhost:3000/users?userName=${userName}`);

  // Efeito para buscar dados sempre que userName mudar
  useEffect(() => {
    // Verifica se userName está vazio antes de fazer a requisição
    if (userName) {
      fetch(`http://localhost:3000/users?userName=${userName}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao buscar os dados do usuário');
          }
          return response.json();
        })
        .then(userData => {
          setData(userData); // Atualiza os dados com os dados recebidos
        })
        .catch(error => {
          console.error('Erro ao buscar os dados do usuário:', error.message);
        });
    }
  }, [data]);
   // Dependência: atualiza sempre que userName mudar
  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro: {error.message}</div>;
  }
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao excluir o usuário');
      }
  
      console.log('Usuário excluído com sucesso');
    } catch (error) {
      console.error('Ocorreu um erro ao excluir o usuário:', error.message);
    }
  };
  
  const updateUserData = async (userName,newData) => {
    try {
      const userResponse = await fetch(`http://localhost:3000/users?userName=${userName}`);
      if (!userResponse.ok) {
        throw new Error('Erro ao buscar o usuário');
      }
      const userData = await userResponse.json();
      const userId = userData[0].id;
      console.log(userId)

      const updateUserData={
        ...userData,
        ...newData
      }
  
      const updateResponse = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateUserData),
      });
  
      if (!updateResponse.ok) {
        throw new Error('Erro ao atualizar os dados do usuário');
      }
  
      console.log('Dados do usuário atualizados com sucesso');
    } catch (error) {
      console.error('Ocorreu um erro ao atualizar os dados do usuário:', error.message);
    }
  };


  // // Exemplo de uso:
  // const newData = {
  //     birthday: "1990-01-01",
  //     nome: "Novo Nome",
  //     sexo: "Masculino"
  // };

  // updateUserData('Paulo', newData);

  // const updateUserData = async (userName, newData) => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/users?userName=${userName}`, {
  //       method: 'PUT', // Ou 'PUT' dependendo da sua necessidade
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newData),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Erro ao atualizar os dados do usuário');
  //     }

  //     console.log('Dados do usuário atualizados com sucesso');
  //   } catch (error) {
  //     console.error('Ocorreu um erro ao atualizar os dados do usuário:', error.message);
  //   }
  // };


  // atualiza os dados do userData
  // const updateData = (key, value) => {
  //   console.log(key)
  //   console.log(value)
  //   setUserData(prevData => {
  //     // Divide a chave em partes usando '.'
  //     const keys = key.split('.');
  //     // Copia o estado anterior de 'data'
  //     const newData = { ...prevData };
  //     // Atualiza o valor aninhado no objeto 'data'
  //     let current = newData;
  //     for (let i = 0; i < keys.length; i++) {
  //       if (i === keys.length - 1) {
  //         // Última chave, atualiza o valor
  //         current[keys[i]] = value;
  //       } else {
  //         // Ainda não chegamos à última chave, avança para o próximo nível
  //         current = current[keys[i]];
  //       }
  //     }
  //     return newData;
  //   });
  // };
  return (
    <>
      <div className={styles.containerPerfil}>
        <ContainerUserData disabled={disabled} toggleDisabled={toggleDisabled} oldData={data} updateUserData={updateUserData} userName={userName} />
        <div className={styles.collumn2}>
          <UserImage />
          <div className={styles.banner}>
            <img src={img1} alt="" />
          </div>
        </div>

      </div>

    </>
  )
}
