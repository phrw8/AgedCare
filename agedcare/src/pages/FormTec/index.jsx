import React from 'react'
import styles from './formTec.module.css'
import { useState } from 'react';

import Header from '../../components/Header'
import FormTec from '../../components/pageFormTec/FormTec';

import { FaUser } from "react-icons/fa";
import { MdOutlineOtherHouses } from "react-icons/md";
import { FiCalendar } from "react-icons/fi";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { PiPaperPlaneTiltBold } from "react-icons/pi";


const index = () => {
  const [screen, setScreen] = useState(0);
  return (
    <>
    <Header/>
    <div className={styles.app}>
        <h3 className={styles.title}>Mande suas informações para nós avaliá-lo(a)!</h3>
       <div className={styles.formContainer}>
        <div className={styles.iconContainer}>

            <div className={styles.icon}><FaUser className={styles.active}/></div>
            <hr className={screen >= 1 ? `${styles.activeBg} ${styles.divisao}`: styles.divisao }/>

            <div className={styles.icon}><MdOutlineOtherHouses className={screen >= 1 ? `${styles.active}`: null} /></div>
            <hr className={screen >= 12 ? `${styles.activeBg} ${styles.divisao}`: styles.divisao }/>

            <div className={styles.icon}><FiCalendar className={screen >= 2 ? `${styles.active}`: null}/></div>
            <hr className={screen >= 3 ? `${styles.activeBg} ${styles.divisao}`: styles.divisao }/>

            <div className={styles.icon}><IoCloudDownloadOutline className={screen >= 3 ? `${styles.active}`: null}/></div>
            <hr className={screen >= 4 ? `${styles.activeBg} ${styles.divisao}`: styles.divisao }/>

            <div className={styles.icon}><PiPaperPlaneTiltBold className={screen >= 4 ? `${styles.active}`: null} /></div>

        </div>
        <FormTec screen={screen} setScreen={setScreen}/>
        
       </div>
    </div>
    </>
  )
}

export default index