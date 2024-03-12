import React from 'react'
import styles from './containerContent.module.css'
import ContainerData from './ContainerData'
import Card from './Card'
import { ContainerOptions } from './ContainerOptions'

const ContainerContent = () => {
    return (
        <>
            <div className={styles.app}>
                <div className={styles.square}>
                    <div className={styles.banner}></div>
                    <div className={styles.row1}>
                        <ContainerData />
                        <Card />
                    </div>
                    <div className={styles.row2}>
                        <ContainerOptions name="Disponibilidade"/>
                        <ContainerOptions name="Locais aptos"/>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ContainerContent