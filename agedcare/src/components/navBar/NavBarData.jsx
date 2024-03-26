import React, { useEffect, useState } from 'react'

import { FaHome } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { TbNurse } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { TbDoorEnter } from "react-icons/tb";


import { Link } from 'react-router-dom';
import styles from './navBarData.module.css'

const NavBarData = () => {
  const id = localStorage.getItem('id');
  const [tecOrNot, setTecOrNot] = useState()

  const removeId = () => {
    localStorage.removeItem('id');
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`);

        // Verifica se a resposta da solicitação é bem-sucedida
        if (response.ok) {
          const data = await response.json();
          setTecOrNot(data.tecnico); // Define o estado 'tecOrNot' com base nos dados recebidos
          console.log(data.tecnico);
        } else {
          // Se a resposta não for bem-sucedida, lança um erro
          throw new Error('Não foi possível obter os dados do usuário');
        }
      } catch (error) {
        console.error('Ocorreu um erro ao buscar os dados do usuário:', error);
      }
    };

    fetchUserData(); // Chama a função para buscar os dados do usuário
  }, [id]);

  return (
    <>
      <div className={styles.content}>
        <ul className={styles.ul}>

          <Link to='/Home' className={styles.li}>
            <FaHome className={styles.icon} />
            <span>Home</span>
          </Link>
          {tecOrNot == false ?
            <Link to='/Perfil' className={styles.li}>
              <FaRegUserCircle className={styles.icon} />
              <span>Perfil</span>
            </Link>
            :
            null}

          <Link to='/Buscar' className={styles.li}>
            <IoMdSearch className={styles.icon} />
            <span>Buscar</span>
          </Link>
          {tecOrNot == true ?
            <Link to='/PerfilTec' className={styles.li}>
              <TbNurse className={styles.icon} />
              <span>Técnicos</span>
            </Link>
            :
            null}

          <Link to='/Configs' className={styles.li}>
            <IoSettingsOutline className={styles.icon} />
            <span>Configurações</span>
          </Link>

        </ul>
        <Link to='/Login' className={styles.logout} onClick={()=>{
          removeId()
        }}>
          <TbDoorEnter className={styles.icon} />
          <span className={styles.logoutText}>Logout</span>
        </Link>
      </div>
    </>
  )
}

export default NavBarData