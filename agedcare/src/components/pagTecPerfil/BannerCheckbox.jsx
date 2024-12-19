import React, { useState } from 'react';
import styles from './bannerCheckbox.module.css';
import Image1 from '../../assets/banner1.jpg';
import Image2 from '../../assets/banner2.jpg';
import Image3 from '../../assets/banner3.png';

export const BannerCheckbox = ({ value, isSelected, onSelect  }) => {


  // Lógica para escolher a imagem com base no valor
  const bannerToDisplay = value === 1 ? Image1 : value === 2 ? Image2 : value === 3 ? Image3 :null;

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={() => onSelect(value)}
    >
      <div className={styles.checkbox}>
        {/* Mostra a imagem dependendo do valor */}
        {bannerToDisplay && <img src={bannerToDisplay} alt="Card banner" className={styles.banner} />}
      </div>
    </div>
  );
};
