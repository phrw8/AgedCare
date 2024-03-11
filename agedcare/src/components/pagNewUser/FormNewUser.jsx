import { useState } from 'react'
import styles from './formNewUser.module.css'

import { Navigate } from 'react-router-dom';
// import useFetch from '../hooks/useFetch';

const FormNewUser = () => {

  const [submitted, setSubmitted] = useState(false);

  const url = "http://localhost:3000/users"

  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [tecnico, setTecnico] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      userName,
      password,
      email,
      tecnico,
      name:userName,
      cep:"",
      celular:"",
      civilState: {
        casado: false,
        solteiro: false,
        viuvo: false,
      },
      sexo: {
        masculino: false,
        feminino: false,
        outras: false,
      },
      birthday:""
    };

    try {
      // Use o fetch para fazer uma solicitação POST para verificar se o nome de usuário já existe
      const response = await fetch(`${url}?userName=${user.userName}`);

      if (!response.ok) {
        throw new Error('Erro ao verificar o nome de usuário');
      }

      // Verifique se o usuário já existe
      const data = await response.json();
      const repeatUser = data.filter((us) => us.userName === user.userName);

      if (repeatUser.length > 0) {
        throw new Error('Nome de usuário já está em uso');
      }

      // Se o usuário não existir, faça uma solicitação POST para criar um novo usuário
      const createUserResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(user),
      });

      if (!createUserResponse.ok) {
        throw new Error('Erro ao criar usuário');
      }

      const createdUser = await createUserResponse.json();

      sessionStorage.setItem('userId', createdUser.id);
      sessionStorage.setItem('user', JSON.stringify(createdUser));

      setSubmitted(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDados = (dado, valor) => {
    switch (dado) {
      case 'userName':
        setUserName(valor);
        break;
      case 'password':
        setPassword(valor);
        break;
      case 'email':
        setEmail(valor);
        break;
      case 'tecnico':
        setTecnico(valor);
        break;
      default:
        console.error("Estado inválido");


    }
    console.log(dado)
  }



  return (
    <>{
      submitted && tecnico ? <Navigate to="/FormTec" /> : null
    }
    
    {
      submitted && !tecnico ? <Navigate to="/Login" /> : null
    }

      <form className={styles.form} onSubmit={(e) => { handleSubmit(e) }}>
        <h3>Crie sua conta</h3>
        <label className={styles.inputGroup}>
          <input type="text" required value={userName} onChange={(e) => { handleDados("userName", e.target.value) }} className={userName ? `${styles.input} ${styles.hasValue}` : styles.input} />
          <label className={styles.placeholder}>Digite seu nome de usúario</label>
        </label>
        <label className={styles.inputGroup}>
          <input type="email" required value={email} onChange={(e) => { handleDados("email", e.target.value) }}
            className={email ? `${styles.input} ${styles.hasValue}` : styles.input} />
          <label className={styles.placeholder}>Digite seu email</label>
        </label>
        <div className={styles.passwords}>
          <label className={styles.inputGroup}>
            <input type="password" required value={password} onChange={(e) => { handleDados("password", e.target.value) }} className={password ? `${styles.input} ${styles.hasValue}` : styles.input} />
            <label className={styles.placeholder}>Crie uma senha</label>
          </label>
          <label className={styles.inputGroup}>
            <input type="password" disabled />
            <label className={styles.placeholder}>Confirme sua senha</label>
          </label>
        </div>
        <label className={styles.radioTec}>
          <label> Cuidador:</label>
          <label>
            Sim
            <input type="radio" required name='input' value={tecnico} onClick={(e) => { handleDados("tecnico", true) }} />
          </label>

          <label >
            Não
            <input type="radio" name='input' value={tecnico} onClick={(e) => { handleDados("tecnico", false) }} />
          </label>

        </label>
        <button type="submit" className={styles.btn}  >Entrar</button>
      </form>
    </>
  )
}

export default FormNewUser