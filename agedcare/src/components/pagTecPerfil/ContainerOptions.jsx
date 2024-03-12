import React from 'react'
import styles from './containerOptions.module.css'
import { GrUserSettings } from "react-icons/gr";


import { RiHospitalLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { PiSunHorizon } from "react-icons/pi";
import { PiSunDimLight } from "react-icons/pi";
import { PiMoonDuotone } from "react-icons/pi";
import { PiMoonFill } from "react-icons/pi";
import { BsCalendar2Week } from "react-icons/bs";
import { SlEyeglass } from "react-icons/sl";

export const ContainerOptions = ({name,data}) => {
    return (
        <>
            <div className={styles.app}>
                <div className={styles.row1}>
                    <p className={styles.h3foggy}>{name}</p>
                    <GrUserSettings />
                </div>
                <div className={styles.row2}>
                    <div className={styles.contentRow}>
                        <div className={styles.itens}><PiSunHorizon/>Manha</div>
                        <div className={styles.itens}><PiSunDimLight/>Tarde</div>
                        <div className={styles.itens}><PiMoonDuotone/>Noite</div>
                        <div className={styles.itens}><PiMoonFill/>Pernoite</div>
                        <div className={styles.itens}><BsCalendar2Week/>Fim de Semana</div>
                    </div>

                    
                </div>

            </div>
        </>
    )
}
