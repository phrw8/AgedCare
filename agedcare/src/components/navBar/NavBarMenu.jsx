import React, { useEffect } from 'react'
import styles from './navBarMenu.module.css'
import { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";

import NavBarData from './NavBarData';

const NavBarMenu = ({active,setActive}) => {
  return (
    <div className={styles.navBarContainer}>
    <div className={active ? styles.navBar : `${styles.navBar} ${styles.desactive}` }>
      <div className={styles.header}>
        <div className={styles.toggleHeader}>
          <RxHamburgerMenu onClick={()=>setActive(!active)} className={styles.toggleBtn}/>
        </div>
        {active ? <NavBarData/> : null}
       
      </div>
    </div>
    </div>
  )
}

export default NavBarMenu