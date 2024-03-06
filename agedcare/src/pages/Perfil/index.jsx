import React, { useState } from 'react'
import styles from './perfil.module.css'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import NavBarMenu from '../../components/navBar/NavBarMenu'
import { Perfil } from '../../components/pagPerfil/Perfil'

const index = () => {
    const [active, setActive] = useState(false)
    return (
        <>
            <div className={styles.app}>
                <div className={active ? styles.aside : styles.asideClose}>
                    <NavBarMenu active={active} setActive={setActive} />

                </div>
                <div className={styles.content}>
                    <Header />
                    <Perfil/>
                    <Footer />
                </div>

            </div>
        </>
    )
}

export default index