import React, { useState } from 'react';
import styles from './containerChange.module.css';
import { ImageCheckbox } from '../pageFormTec/inputs/ImageCheckbox';
import { BannerCheckbox } from './BannerCheckbox';

export const ContainerChange = ({ setShowScreen, opt, setShowScreen2 }) => {
  // Estado e função para seleção do Avatar (ImageCheckbox)
  const [selectedImageValue, setSelectedImageValue] = useState(null);
  const handleImageSelection = (value) => {
    setSelectedImageValue(value);
    console.log("Avatar selecionado:", value); // Substitua por `setAvatar(value)` caso necessário.
  };

  // Estado e função para seleção dos Banners (BannerCheckbox)
  const [selectedBannerValue, setSelectedBannerValue] = useState(null);
  const handleBannerSelection = (value) => {
    setSelectedBannerValue(value);
    console.log("Banner selecionado:", value); // Substitua por `setBanner(value)` caso necessário.
  };

  // Condicional para renderizar conforme `opt`
  if (opt === 1) {
    return (
      <div className={styles.container}>
        <h1>Escolha um Avatar!</h1>
        <div className={styles.main}>
          <ImageCheckbox value={1} isSelected={selectedImageValue === 1} onSelect={handleImageSelection} />
          <ImageCheckbox value={2} isSelected={selectedImageValue === 2} onSelect={handleImageSelection} />
          <ImageCheckbox value={3} isSelected={selectedImageValue === 3} onSelect={handleImageSelection} />
        </div>
        <div className={styles.row}>
          <div
            className={styles.button}
            onClick={() => {
              setShowScreen(false);
            }}
          >
            Voltar
          </div>
          <div className={styles.button}>
            Salvar
          </div>
        </div>
      </div>
    );
  }

  // Caso `opt` seja 2, renderiza os Banners com um estado e função de seleção separados
  if (opt === 2) {
    return (
      <div className={styles.container}>
        <h1>Escolha um Banner!</h1>
        <div className={styles.main2}>
          <BannerCheckbox value={1} isSelected={selectedBannerValue === 1} onSelect={handleBannerSelection} />
          <BannerCheckbox value={1} isSelected={selectedBannerValue === 1} onSelect={handleBannerSelection} />
          
          
        </div>
        <div className={styles.row}>
          <div
            className={styles.button}
            onClick={() => {
              setShowScreen2(false);
            }}
          >
            Voltar
          </div>
          <div className={styles.button}>
            Salvar
          </div>
        </div>
      </div>
    );
  }

  return null; // Não renderiza nada se `opt` não for 1 ou 2
};
