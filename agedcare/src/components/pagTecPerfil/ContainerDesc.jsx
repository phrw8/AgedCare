import React from 'react'
import styles from './containerDesc.module.css'

import { GrUserSettings } from "react-icons/gr";

export const ContainerDesc = () => {
    return (
        <>
            <div className={styles.app}>
                <div className={styles.row1}>
                    <p className={styles.h3foggy}>Alterar informações de exibição:</p>
                    <GrUserSettings />
                </div>
                <div className={styles.row2}>
                    <p>
                    Descrição:
                    Olá, sou Amanda, uma apaixonada por cuidar daqueles que construíram histórias e deixaram um legado para nós. Com 32 anos de idade e formação técnica em enfermagem, dediquei minha carreira ao cuidado e bem-estar dos idosos. Compreendo profundamente a importância de proporcionar um ambiente seguro, acolhedor e respeitoso para nossos idosos. Cada indivíduo tem uma história única e preciosas lições para compartilhar, e é uma honra poder fazer parte desse capítulo de suas vidas. Minha abordagem é baseada no respeito, na empatia e na compaixão. Busco sempre ouvir atentamente suas necessidades, compreender suas preferências e oferecer um cuidado personalizado e de qualidade. Além de fornecer assistência prática e cuidados médicos, estou aqui para ser uma companheira, uma amiga e uma fonte de conforto. Estou comprometida em criar um ambiente que promova a saúde, a felicidade e a dignidade de cada indivíduo sob meus cuidados.Se você procura um profissional dedicado, atencioso e compassivo para cuidar de um ente querido, estou aqui para ajudar. Vamos juntos proporcionar o melhor cuidado possível aos nossos idosos, celebrando cada momento e honrando sua jornada de vida.
                    </p>
                </div>
            </div>
        </>
    )
}
