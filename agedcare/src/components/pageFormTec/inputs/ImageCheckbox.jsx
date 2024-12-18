import React, { useState } from 'react';
import styles from './imageCheckbox.module.css';
import Image1 from '../../../assets/tec1.jpeg';
import Image2 from '../../../assets/tec2.jpeg';
import Image3 from '../../../assets/tecpic.png';

export const ImageCheckbox = ({ value, isSelected, onSelect  }) => {


  // Lógica para escolher a imagem com base no valor
  const imageToDisplay = value === 1 ? Image1 : value === 2 ? Image2 : value === 3 ? Image3 :null;

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={() => onSelect(value)}
    >
      <div className={styles.checkbox}>
        {/* Mostra a imagem dependendo do valor */}
        {imageToDisplay && <img src={imageToDisplay} alt="Card Image" className={styles.image} />}
      </div>
    </div>
  );
};
