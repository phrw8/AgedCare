import React from 'react';
import styles from './inputSrcCategorias.module.css';
import { PiSunHorizon, PiSunDim, PiMoonDuotone, PiMoonFill, PiEyeglassesBold } from
"react-icons/pi";
import { BsCalendar2Week, BsHouse } from "react-icons/bs";
import { FaRegHospital } from "react-icons/fa6";
import { MdOutlineScience } from "react-icons/md";

const Input = ({ name, handleChange }) => {
return (
<label className={styles.switch}>
<input
type="checkbox"
value={name}
onChange={() => handleChange(name)}
className={styles.inputCheckbox}
/>
<span className={styles.slider}></span>
</label>
);
};
export const InputSrcCategorias = ({ handleCheckboxChange,
handleDisponibilidadeChange }) => {
return (
<div className={styles.app}>
<div className={styles.row}>
<div className={styles.textGroup}>
<Input name={"dia"} handleChange={handleDisponibilidadeChange} />
<div className={styles.icon}><PiSunHorizon /></div>
<p>dia</p>
</div>
<div className={styles.textGroup}>
<Input name={"noite"} handleChange={handleDisponibilidadeChange} />
<div className={styles.icon}><PiMoonDuotone /></div>
<p>Noite</p>
</div>
<div className={styles.textGroup}>
<Input name={"pernoite"} handleChange={handleDisponibilidadeChange} />
<div className={styles.icon}><PiMoonFill /></div>
<p>Pernoite</p>
</div>
<div className={styles.textGroup}>
<Input name={"fds"} handleChange={handleDisponibilidadeChange} />
<div className={styles.icon}><BsCalendar2Week /></div>
<p>Fds</p>
</div>
</div>
<div className={styles.row}>
<div className={styles.itens}>
<Input name={"hospital"} handleChange={handleCheckboxChange} />
<div className={styles.textGroup}>
<div className={styles.icon}><FaRegHospital /></div>
<p>Hospital</p>
</div>
</div>
<div className={styles.itens}>
<Input name={"domicilio"} handleChange={handleCheckboxChange} />

<div className={styles.textGroup}>
<div className={styles.icon}><BsHouse /></div>
<p>Domicílio</p>
</div>
</div>
<div className={styles.itens}>
<Input name={"asilo"} handleChange={handleCheckboxChange} />
<div className={styles.textGroup}>
<div className={styles.icon}><PiEyeglassesBold /></div>
<p>Asilo</p>
</div>
</div>
<div className={styles.itens}>
<Input name={"clinica"} handleChange={handleCheckboxChange} />
<div className={styles.textGroup}>
<div className={styles.icon}><PiEyeglassesBold /></div>
<p>Clinica</p>
</div>
</div>
</div>
</div>
);
};