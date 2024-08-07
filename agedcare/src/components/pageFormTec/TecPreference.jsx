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
            <Checkbox value={data.manha} label="Manhã" onChange={()=>updateData("manha", !data.manha)} />
            <Checkbox label="Tarde" value={data.tarde} onChange={()=>updateData("tarde", !data.tarde)}/>
            <Checkbox label="Noite" value={data.noite} onChange={()=>updateData("noite", !data.noite)}/>
            <Checkbox label="Pernoite" value={data.pernoite} onChange={()=>updateData("pernoite", !data.pernoite)}/>
            <Checkbox label="Fim de semana" dado="fds" value={data.fds} onChange={()=>updateData("fds", !data.fds)}/>
          </div>
        </div>
        </div>
        <div className={styles.row2}>
        <div className={styles.inpGroup}>
          <label className={styles.titleLabel}>Quais locais você possui apdidão para trabalhar? </label>
          <div className={styles.inputCheckGroup}>
            <Checkbox label="Domicílio" value={data.domicílio} onChange={()=>updateData("domicílio", !data.domicílio)}/>
            <Checkbox label="Hospital" value={data.hospital} onChange={()=>updateData("hospital", !data.hospital)} />
            <Checkbox label="Asilo" value={data.asilo} onChange={()=>updateData("asilo", !data.asilo)} />
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