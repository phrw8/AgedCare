import React, { useState, useEffect } from 'react'
import styles from './pages.module.css'

import Header from './Header'
import Footer from './Footer'
import NavBarMenu from './navBar/NavBarMenu'

const Pages = ({component: Component,id }) => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        function handleResize() {
            setActive(window.innerWidth <= 760);
        }

        // Adiciona um event listener para detectar a mudança de tamanho da tela
        window.addEventListener('resize', handleResize);

        // Remove o event listener quando o componente é desmontado
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <>
            <div className={styles.app}>
                <div className={active ? styles.aside : styles.asideClose}>
                    <NavBarMenu active={active} setActive={setActive} />

                </div>
                <div className={active ? styles.contentSmaller : styles.content}>
                    <Header />
                    {<Component id={id}/>}
                    <Footer />
                </div>

            </div>
        </>
    )
}

export default Pages