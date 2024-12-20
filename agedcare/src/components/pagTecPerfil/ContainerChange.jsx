import React, { useState } from 'react';
import styles from './containerChange.module.css';
import { ImageCheckbox } from '../pageFormTec/inputs/ImageCheckbox';
import { BannerCheckbox } from './BannerCheckbox';

export const ContainerChange = ({ setShowScreen, opt, setShowScreen2 }) => {
  // Estado e função para seleção do Avatar (ImageCheckbox)
  const [selectedImageValue, setSelectedImageValue] = useState(null);
  const [selectedBannerValue, setSelectedBannerValue] = useState(null);
  // Função para atualizar dados no backend
  const handleSave = async (type) => {
    // Obtendo o código do usuário armazenado no sessionStorage
  const codUser = (() => {
    const user = sessionStorage.getItem('user'); // Obtém o item "user" como string
    if (user) {
      try {
        const parsedUser = JSON.parse(user); // Tenta parsear o JSON
        return parsedUser.cod; // Retorna o valor de "cod"
      } catch (error) {
        console.error('Erro ao parsear o usuário do sessionStorage:', error);
        return null;
      }
    }
    return null; // Retorna null se não existir ou ocorrer erro
  })();

  if (!codUser) {
    alert('Erro: Usuário não autenticado. Faça login novamente.');
    return;
  }

  // Definindo o payload com base no tipo (1 - Avatar ou 2 - Banner)
  let payload;
  let url;

  if (type === 1) { // Se for 1, estamos atualizando o avatar
    if (!selectedImageValue) {
      alert('Por favor, selecione um avatar antes de salvar.');
      return;
    }
    payload = { codUser, avatar: selectedImageValue }; // Para o avatar
    url = 'http://localhost:5050/avatar'; // Endpoint para avatar
  } else if (type === 2) { // Se for 2, estamos atualizando o banner
    if (!selectedBannerValue) {
      alert('Por favor, selecione um banner antes de salvar.');
      return;
    }
    payload = { codUser, banner: selectedBannerValue }; // Para o banner
    url = 'http://localhost:5050/banner'; // Endpoint para banner
  } else {
    alert('Tipo inválido para a atualização.');
    return;
  }

  // Realizando a requisição para atualizar o avatar ou o banner
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload), // Envia o payload com os dados
    });

    if (response.ok) {
      alert(type === 1 ? 'Avatar atualizado com sucesso!' : 'Banner atualizado com sucesso!');
      
      // Atualiza a exibição e fecha a tela correspondente
      if (type === 1) {
        setShowScreen(false);
      } else if (type === 2) {
        setShowScreen2(false);
      }
      
      // Recarrega a página
      window.location.reload();
    } else {
      const errorData = await response.json();
      alert(`Erro ao atualizar: ${errorData.error || 'Erro desconhecido.'}`);
    }
  } catch (error) {
    console.error('Erro na solicitação de atualização:', error);
    alert('Erro ao conectar com o servidor. Verifique sua conexão.');
  }
};

  const handleImageSelection = (value) => setSelectedImageValue(value);
  const handleBannerSelection = (value) => setSelectedBannerValue(value);


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
          <div className={styles.button} onClick={()=>handleSave(1)}>
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
          <BannerCheckbox value={2} isSelected={selectedBannerValue === 2} onSelect={handleBannerSelection} />
          <BannerCheckbox value={3} isSelected={selectedBannerValue === 3} onSelect={handleBannerSelection} />


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
          <div className={styles.button} onClick={() => handleSave(2)}>
            Salvar
          </div>
        </div>
      </div>
    );
  }

  return null; // Não renderiza nada se `opt` não for 1 ou 2
};
