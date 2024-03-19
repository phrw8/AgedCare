import React from 'react'
import styles from './containerDesc.module.css'

import { GrUserSettings } from "react-icons/gr";

export const ContainerDesc = ({data}) => {
    return (
        <>
            <div className={styles.app}>
                <div className={styles.row1}>
                    <p className={styles.h3foggy}>Alterar informações de exibição:</p>
                    <GrUserSettings />
                </div>
                <div className={styles.row2}>
                    <p>
                        { data ? data.descricao ? data.descricao : "Adicione sua descrição" : "carregando descricao"}
                    </p>
                </div>
            </div>
        </>
    )
}
