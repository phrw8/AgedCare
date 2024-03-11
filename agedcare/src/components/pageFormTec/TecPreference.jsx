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
            <Checkbox value={data.disponibilidade.Manha} label="Manhã" onChange={()=>updateData("disponibilidade.Manha", !data.disponibilidade.Manha)} />
            <Checkbox label="Tarde" value={data.disponibilidade.Tarde} onChange={()=>updateData("disponibilidade.Tarde", !data.disponibilidade.Tarde)}/>
            <Checkbox label="Noite" value={data.disponibilidade.Noite} onChange={()=>updateData("disponibilidade.Noite", !data.disponibilidade.Noite)}/>
            <Checkbox label="Pernoite" value={data.disponibilidade.pernoite} onChange={()=>updateData("disponibilidade.pernoite", !data.disponibilidade.pernoite)}/>
            <Checkbox label="Fim de semana" dado="fds" value={data.disponibilidade.Fds} onChange={()=>updateData("disponibilidade.Fds", !data.disponibilidade.Fds)}/>
          </div>
        </div>
        </div>
        <div className={styles.row2}>
        <div className={styles.inpGroup}>
          <label className={styles.titleLabel}>Quais locais você possui apdidão para trabalhar? </label>
          <div className={styles.inputCheckGroup}>
            <Checkbox label="Domicílio" value={data.locaisAptos.Domicílio} onChange={()=>updateData("locaisAptos.Domicílio", !data.locaisAptos.Domicílio)}/>
            <Checkbox label="Hospital" value={data.locaisAptos.Hospital} onChange={()=>updateData("locaisAptos.Hospital", !data.locaisAptos.Hospital)} />
            <Checkbox label="Asilo" value={data.locaisAptos.Asilo} onChange={()=>updateData("locaisAptos.Asilo", !data.locaisAptos.Asilo)} />
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