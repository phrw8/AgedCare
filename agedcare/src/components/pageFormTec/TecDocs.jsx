import React from 'react'
import styles from './tecDocs.module.css'
import { NormalInput } from './inputs/NormalInput'
import { useState } from 'react'
import { useEffect } from 'react'
import { ImageCheckbox } from './inputs/ImageCheckbox'

export const TecDocs = ({ data, updateData }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [avatar,setAvatar] = useState()

  // Função para atualizar o estado do valor selecionado
  const handleSelection = (value) => {
    setSelectedValue(value);
    setAvatar(value)
    updateData('avatar',value)
  };
  useEffect(() => {
    console.log(avatar); 
  }, [avatar]);

  useEffect(()=>{
    console.log(data.avatar)
  },[avatar])
  return (
    <>
      <div className={styles.content}>
        <label className={styles.title}>Documentos</label>
        <div className={styles.row1}>
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <label className={styles.label}>Escolha seu avatar!</label>
            <div className={styles.imagesContainer}>
              <ImageCheckbox value={1} isSelected={selectedValue === 1} onSelect={handleSelection} />
              <ImageCheckbox value={2} isSelected={selectedValue === 2} onSelect={handleSelection} />
              <ImageCheckbox value={3} isSelected={selectedValue === 3} onSelect={handleSelection} />
              
            </div>
          </form>
        </div>

      </div>
    </>
  )
}

{/* 
<div className={styles.row2}>
  <label className={styles.label}>Foto Identidade</label>
  <NormalInput type="file" onChange={(e) => handleFileChange(e)} />
</div>
<div className={styles.row3}>
  <label className={styles.label}>Foto de perfil</label>
  <NormalInput type="file" onChange={(e) => handleFileChange(e)} />
</div>
*/}