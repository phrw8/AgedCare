import React, { useState, useEffect } from 'react';
import styles from './banner.module.css';
import Image1 from '../../assets/banner1.jpg';
import Image2 from '../../assets/banner2.jpg';
import Image3 from '../../assets/banner3.png';

export const Banner = ({ data }) => {
    const [bannerValue, setBannerValue] = useState(null); // Estado inicial para o banner

// Atualiza o estado com o banner de 'data' quando disponível
useEffect(() => {
  if (data?.banner) {
    setBannerValue(Number(data.banner)); // Converte o valor do banner para número
  }
}, [data]);

// Determina qual banner exibir
const bannerToDisplay =
  bannerValue === 1 ? Image1 :
  bannerValue === 2 ? Image2 :
  bannerValue === 3 ? Image3 :
  null;

    return (
        <div className={styles.banner}>
            {bannerToDisplay && <img src={bannerToDisplay} alt="Banner" />}
        </div>
    );
};