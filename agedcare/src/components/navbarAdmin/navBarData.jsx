import React, { useEffect, useState } from 'react';
import { FaHome } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { TbNurse } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { TbDoorEnter } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import styles from '../navBar/navBarData.module.css'; // Certifique-se de que o arquivo CSS seja copiado para a nova pasta

const NavBarDataAdmin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5050/logout', {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        console.log('Logout bem-sucedido');
        sessionStorage.removeItem('user');
        setUser(null);
        navigate('/Login');
      } else {
        throw new Error('Erro ao fazer logout');
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
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
  );
};

export default NavBarDataAdmin;
