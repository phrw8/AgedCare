import React from 'react'
import styles from './footer.module.css'

import { FaUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

import {Link} from 'react-router-dom'

const footer = () => {
  return (
    <>
    <footer>
      <div className={styles.container}>

        <div className={styles.containerCopy}>
            <div className={styles.logo}>
                <h3>AgedCare</h3>
            </div>
            <div className={styles.copy}>
                <p>Copyright 2024 © AgedCare.</p>
            </div>
        </div>

        <div className={styles.containerLogs}>
          <Link to='/Login'>
            <div className={styles.login}>
              <FaUser />
              <p>Login</p>
            </div>
          </Link>
          <Link to='/NewUser'>
            <div className={styles.login}>
              <FaPlus />
              <p>Cadastrar-se</p>
            </div>
          </Link>
        </div>
      </div>
    </footer>
    </>
  )
}

export default footer