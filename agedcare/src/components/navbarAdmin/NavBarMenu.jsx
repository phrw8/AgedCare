import React, { useState } from 'react';
import styles from '../navBar/navBarMenu.module.css'; // Certifique-se de que o arquivo CSS seja copiado para a nova pasta
import { RxHamburgerMenu } from "react-icons/rx";
import NavBarData from './NavBarData'; // Atualize a importação para pegar o arquivo da nova pasta

const NavBarMenuAdmin = ({ active, setActive }) => {
  return (
    <div className={styles.navBarContainer}>
      <div className={active ? styles.navBar : `${styles.navBar} ${styles.desactive}`}>
        <div className={active ? styles.navBar : `${styles.navBar} ${styles.desactive}`}>
          <div className={active ? styles.toggleHeader : styles.toggleHeaderClose}>
            <RxHamburgerMenu onClick={() => setActive(!active)} className={styles.toggleBtn} />
          </div>
          {active ? <NavBarData /> : null}
        </div>
      </div>
    </div>
  );
};

export default NavBarMenuAdmin;
