import React from 'react'
import styles from './tecDocs.module.css'
import { NormalInput } from './inputs/NormalInput'
import { useState } from 'react'
import { useEffect } from 'react'

export const TecDocs = ({ data, updateData }) => {
  // const [file, setFile] = useState(null);
  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const fileUrl= URL.createObjectURL(file)
  //     const jsonUrl=JSON.stringify(fileUrl)
  //     const response = await fetch('http://localhost:3000/users', {
  //       method: 'POST',
  //       body: jsonUrl
  //     });
      
  //     const data = await response.json();
  //     console.log('Resposta do servidor:', data);
  //   } catch (error) {
  //     console.error('Erro ao enviar imagem:', error);
  //   }
  // };
  return (
    <>
      <div className={styles.content}>
        <label className={styles.title}>Documentos</label>
        <div className={styles.row1}>
          <form action="" onSubmit={(e)=>handleSubmit(e)}>
          <label className={styles.label}>Certificado Profissional</label>
          <NormalInput type="file" onChange={(e)=>{
            handleFileChange(e)
            }} />
            <button type='submit'>Envia ai paizao</button>
            </form>
        </div>
        <div className={styles.row2}>
          <label className={styles.label}>Foto Identidade</label>
          <NormalInput type="file" onChange={(e) => handleFileChange(e)} />
        </div>
        <div className={styles.row3}>
          <label className={styles.label}>Foto de perfil</label>
          <NormalInput type="file" onChange={(e) => handleFileChange(e)} />
        </div>
      </div>
    </>
  )
}
