import React from 'react'
import { FaHome } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { TbNurse } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import styles from './navBarData.module.css'
const NavBarData = () => {
  return (
    <>
     <div className={styles.content}>
          <ul className={styles.ul}>

            <Link to='/Home' className={styles.li}>
              <FaHome className={styles.icon}/>
              <span>Home</span>
            </Link>
            <Link to='/Perfil' className={styles.li}>
              <FaRegUserCircle className={styles.icon} />
              <span>Perfil</span>
            </Link>
            <Link to='/Buscar' className={styles.li}>
            <IoMdSearch className={styles.icon} />
              <span>Buscar</span>
            </Link>
            <Link to='/PerfilTecnico' className={styles.li}>
            <TbNurse className={styles.icon} />
              <span>Técnicos</span>
            </Link>
            <Link to='/Configs' className={styles.li}>
            <IoSettingsOutline className={styles.icon} />
              <span>Configurações</span>
            </Link> 

          </ul>
        </div>
    </>
  )
}

export default NavBarData