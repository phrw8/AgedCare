import React, { useEffect, useState } from 'react';
import { FaHome } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { TbNurse } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { TbDoorEnter } from "react-icons/tb";
import { Link } from 'react-router-dom';
import styles from './navBarData.module.css';

const NavBarData = () => {
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5050/logout', {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        console.log('Logout bem-sucedido');
        setUser(null); // Limpa o estado do usuário após logout
      } else {
        throw new Error('Erro ao fazer logout');
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5050/home', {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user); // Define o estado do usuário com os dados recebidos
        } else {
          throw new Error('Não foi possível obter os dados do usuário');
        }
      } catch (error) {
        console.error('Ocorreu um erro ao buscar os dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className={styles.content}>
        <ul className={styles.ul}>
          <Link to='/Home' className={styles.li}>
            <FaHome className={styles.icon} />
            <span>Home</span>
          </Link>
          {user && user.permissao !== 'tecnico' &&
            <Link to='/Perfil' className={styles.li}>
              <FaRegUserCircle className={styles.icon} />
              <span>Perfil</span>
            </Link>
          }
          <Link to='/Buscar' className={styles.li}>
            <IoMdSearch className={styles.icon} />
            <span>Buscar</span>
          </Link>
          {user && user.permissao === 'tecnico' &&
            <Link to='/PerfilTec' className={styles.li}>
              <TbNurse className={styles.icon} />
              <span>Técnicos</span>
            </Link>
          }
          <Link to='/Configs' className={styles.li}>
            <IoSettingsOutline className={styles.icon} />
            <span>Configurações</span>
          </Link>
        </ul>
        <Link to='/Login' className={styles.logout} onClick={handleLogout}>
          <TbDoorEnter className={styles.icon} />
          <span className={styles.logoutText}>Logout</span>
        </Link>
      </div>
    </>
  );
};

export default NavBarData;
