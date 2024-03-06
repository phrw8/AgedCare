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
              <FaHome />
              <span>Home</span>
            </Link>
            <Link to='/Perfil' className={styles.li}>
              <FaRegUserCircle />
              <span>Perfil</span>
            </Link>
            <Link to='/Buscar' className={styles.li}>
            <IoMdSearch />
              <span>Buscar</span>
            </Link>
            <Link to='/Tecnicos' className={styles.li}>
            <TbNurse />
              <span>Técnicos</span>
            </Link>
            <Link to='/Configs' className={styles.li}>
            <IoSettingsOutline />
              <span>Configurações</span>
            </Link> 

          </ul>
        </div>
    </>
  )
}

export default NavBarData