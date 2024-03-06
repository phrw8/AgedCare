import React from 'react'
import styles from './newUser.module.css'
import FormNewUser from '../../components/pagNewUser/FormNewUser'

const index = () => {
  return (
    <>
    <div className={styles.app}>
        <div className={styles.whiteBg}></div>
        <div className={styles.blueBg}>
            <div className={styles.filterBlueBg}></div>
        </div>
        <div className={styles.contentContainer}>

            <div className={styles.logoContainer}>
                <div className={styles.filterImg}></div>
                <h1>Aged Care</h1>
            </div>

            <div className={styles.formContainer}>
                <FormNewUser/>
            </div>

        </div>
       
    </div>
    </>
  )
}

export default index