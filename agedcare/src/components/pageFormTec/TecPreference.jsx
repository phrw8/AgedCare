import React from 'react'
import styles from './tecPreferences.module.css'
import { Checkbox } from './inputs/Checkbox'
import { NormalInput } from './inputs/NormalInput'

export const TecPreference = ({updateData,data}) => {
  return (
    <>
      <div className={styles.content}>
      <label className={styles.title}>Preferências</label>
      <div className={styles.row1}>
        <div className={styles.inpGroup}>
          <label className={styles.titleLabel}>Qual sua disponibilidade? </label>
          <div className={styles.inputCheckGroup}>
            <Checkbox value={data.disponibilidade.manha} label="Manhã" onChange={()=>updateData("disponibilidade.manha", !data.disponibilidade.manha)} />
            <Checkbox label="Tarde" value={data.disponibilidade.tarde} onChange={()=>updateData("disponibilidade.tarde", !data.disponibilidade.tarde)}/>
            <Checkbox label="Noite" value={data.disponibilidade.noite} onChange={()=>updateData("disponibilidade.noite", !data.disponibilidade.noite)}/>
            <Checkbox label="Pernoite" value={data.disponibilidade.pernoite} onChange={()=>updateData("disponibilidade.pernoite", !data.disponibilidade.pernoite)}/>
            <Checkbox label="Fim de semana" dado="fds" value={data.disponibilidade.fds} onChange={()=>updateData("disponibilidade.fds", !data.disponibilidade.fds)}/>
          </div>
        </div>
        </div>
        <div className={styles.row2}>
        <div className={styles.inpGroup}>
          <label className={styles.titleLabel}>Quais locais você possui apdidão para trabalhar? </label>
          <div className={styles.inputCheckGroup}>
            <Checkbox label="Domícilio" value={data.locaisAptos.domicilio} onChange={()=>updateData("locaisAptos.domicilio", !data.locaisAptos.domicilio)}/>
            <Checkbox label="Hospital" value={data.locaisAptos.hospital} onChange={()=>updateData("locaisAptos.hospital", !data.locaisAptos.hospital)} />
            <Checkbox label="Clínica" value={data.locaisAptos.clinica} onChange={()=>updateData("locaisAptos.clinica", !data.locaisAptos.clinica)}/>
            <Checkbox label="Asilo" value={data.locaisAptos.asilo} onChange={()=>updateData("locaisAptos.asilo", !data.locaisAptos.asilo)} />
          </div>
        </div>
        </div>
        <div className={styles.row3}>
        <div className={`${styles.inpGroup}`}>
          <label className={styles.titleLabel}>Até quantos km de distância do seu endereço você pretende atuar? </label>
          <div className={`${styles.inputCheckGroup } ${styles.groupKm}`}>
            <label className={styles.kmGroup}>
              <input type="number" className={styles.inputKm} value={data.km} onChange={(e)=>updateData("km", e.target.value)}/>
              <label className={styles.labelKm}>Km</label>
            </label>
          </div>
        </div>
        </div>
      </div>

    </>
  )
}