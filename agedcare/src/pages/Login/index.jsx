import React from 'react';
import styles from './login.module.css';

import FormLogin from '../../components/pagLogin/FormLogin';

const Index = () => {


  return (
    <>
      <div className={styles.app}>
        <div className={styles.containerContent}>
          <div className={styles.filterBlue}></div>
          <div className={styles.container}>
            <div className={styles.slogam}>
              <div className={styles.referance}>
                <div className={styles.circleBlush}></div>
                <h2>Seu <span className={styles.bold}>cuidado</span> <br /> em primeiro lugar</h2>
              </div>
            </div>
            <div className={styles.containerForm}>
              <h1>Aged Care</h1>
              
                <FormLogin />

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
