import React, { useState } from 'react'
import styles from './tecData.module.css'
import { NormalInput } from './inputs/NormalInput'

export const TecData = ({ data, updateData }) => {
  // const [name, setName] = useState("")
  // const [date, setDate] = useState("")
  // const [cpf, setCpf] = useState("")
  // const [rg, setRg] = useState("")
  // const [stateRg, setStateRg] = useState("")
  // const [number, setNumber] = useState("")
  // const [email, setEmail] = useState("")
  // const [sexo, setSexo] = useState("")
  // const [civilState, setCivilState] = useState("")

  // const handleDados = (dado, valor) => {
  //   switch (dado) {
  //     case 'name':
  //       setName(valor);
  //       break;
  //     case 'password':
  //       setPassword(valor);
  //       break;
  //     case 'email':
  //       setEmail(valor);
  //       break;
  //     case 'tecnico':
  //       setTecnico(valor);
  //       break;
  //     case 'date':
  //       setDate(valor);
  //       break;
  //     case 'cpf':
  //       setCpf(valor);
  //       break;
  //     case 'rg':
  //       setRg(valor);
  //       break;
  //     case 'stateRg':
  //       setStateRg(valor);
  //       break;
  //     case 'number':
  //       setNumber(valor);
  //       break;
  //     case 'email':
  //       setEmail(valor);
  //       break;
  //     default:
  //       console.error("Estado inválido");

  //   }
  //   console.log(valor)
  // }

  return (
    <>
      {/* <div className={styles.content}>
        <div className={styles.row1}>
          <label className={`${styles.inpGroup} ${styles.name}`}>
            <input type="text" required className={name ? `${styles.input} ${styles.hasValue} ` : `${styles.input}`} value={name} onChange={(e) => handleDados("name", e.target.value)} />
            <label className={styles.placeholder}>Nome completo</label>
          </label>
          <label className={`${styles.inpGroup} ${styles.date}`}>
            <input type="date" required className={styles.dateInput} value={date} onChange={(e) => handleDados("date", e.target.value)} />
            <label className={styles.placeholderDate}>Data de Nascimento</label>
          </label>
        </div>
        <div className={styles.row2}>
          <label className={`${styles.inpGroup} ${styles.normalRow2}`}>
            <input type="number" required className={cpf ? `${styles.input} ${styles.hasValue}` : styles.input} value={cpf} onChange={(e) => handleDados("cpf", e.target.value)} />
            <label className={styles.placeholder}>CPF</label>
          </label>
          <label className={`${styles.inpGroup} ${styles.smallerRow2}`}>
            <input type="text" required className={stateRg ? `${styles.input} ${styles.hasValue}` : styles.input} value={stateRg} onChange={(e) => handleDados("stateRg", e.target.value)} />
            <label className={styles.placeholder}>Orgão emissor</label>
          </label>
          <label className={`${styles.inpGroup} ${styles.normalRow2}`}>
            <input type="number" required className={rg ? `${styles.input} ${styles.hasValue}` : styles.input} value={rg} onChange={(e) => handleDados("rg", e.target.value)} />
            <label className={styles.placeholder}>RG</label>
          </label>

        </div>
        <div className={styles.row3}>
          <label className={styles.inpGroupRow3}>
            <input type="number" required className={number ? `${styles.input} ${styles.hasValue}` : styles.input} value={number} onChange={(e) => handleDados("number", e.target.value)} />
            <label className={styles.placeholder}>Celular</label>
          </label>
          <label className={styles.inpGroupRow3}>
            <input type="email" className={email ? `${styles.input} ${styles.hasValue}` : styles.input} value={email} onChange={(e) => handleDados("email", e.target.value)} />
            <label className={styles.placeholder}>Email</label>
          </label>
        </div>s
      </div> */}

      <div className={styles.content}>
        <label className={styles.title}>Dados pessoais</label>
        <div className={styles.row1}>
          <NormalInput value={data.nome || ""} onChange={(e) => updateData("nome", e.target.value)} label="Nome Completo" dado="name" />
          <NormalInput value={data.datanasc || ""} onChange={(e) => updateData("datanasc", e.target.value)} label="Data de Nascimento" type="date" dado="datanasc" />
        </div>
        <div className={styles.row2}>
          <NormalInput value={data.cpf || ""} onChange={(e) => updateData("cpf", e.target.value)} label="CPF" dado="cpf" />
          <div className={styles.rgInfo}>
            <NormalInput value={data.org || ""} onChange={(e) => updateData("org", e.target.value)} label="Orgão emissor" dado="emissor" />
            <NormalInput value={data.rg || ""} onChange={(e) => updateData("rg", e.target.value)} label="RG" dado="rg" />
          </div>

        </div>
        <div className={styles.row3}>
          <NormalInput value={data.fone || ""} onChange={(e) => updateData("fone", e.target.value)} label="Celular" dado="number" />
          <NormalInput value={data.email || ""} onChange={(e) => updateData("email", e.target.value)} label="Email" dado="email" />
        </div>
        <div className={styles.row3}>
          <label className={styles.selectInp}>
            <label className={styles.placeholder}>Sexo</label>
            <select value={data.sexo || ""} onChange={(e) => updateData("sexo", e.target.value)} required>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outros">Outros</option>
            </select>
          </label>
          <label className={styles.selectInp}>
            <label className={styles.placeholder}>Estado Civil</label>
            <select value={data.civilState || ""} onChange={(e) => updateData("civilState", e.target.value)} required>
              <option value="União Estável">União Estável</option>
              <option value="Solteiro">Solteiro</option>
              <option value="Outros">Outros</option>
            </select>
          </label>
          {/* <NormalInput value={civilState} label="Estado Civil" onChange={setCivilState} dado="civilState" /> */}
        </div>
      </div>
    </>
  )
}

