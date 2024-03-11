import React, { useEffect, useState } from 'react'
import styles from './containerContent.module.css'

import { ContainerData } from './ContainerData'

import banner from './../../assets/bgHeaderTec.jpg'
const ContainerContent = ({ id }) => {
  // Fazer as funcoes e requisicoes
  const [data, setData] = useState()

  useEffect(() => {
    const url = `http://localhost:3000/users/${id}`; // Substitua pelo seu endpoint real

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao obter os dados do usuário');
        }
        return response.json(); // Retorna uma promessa contendo os dados do usuário no formato JSON
      })
      .then(data => {
        // Define os dados do usuário no estado
        setData(data);
      })
      .catch(error => {
        // Manipula erros da requisição
        console.error('Erro na requisição:', error);
      });
  }, [id]);

  return (
    <>
      <div className={styles.app}>
        <div className={styles.square}>
          <div className={styles.banner}>

          </div>
        <ContainerData data={data} />
        </div>
      </div>
    </>
  )
}
export default ContainerContent
