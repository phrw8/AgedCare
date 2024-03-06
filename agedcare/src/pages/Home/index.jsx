import React, { useState } from 'react'
import styles from './home.module.css'

import { Home } from '../../components/pagHome/Home'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import NavBarMenu from '../../components/navBar/NavBarMenu'

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
                    <Home />
                    <Footer />
                </div>

            </div>
        </>
    )
}

export default index