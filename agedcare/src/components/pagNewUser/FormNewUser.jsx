import { useState } from 'react';
import styles from './formNewUser.module.css';
import { Navigate } from 'react-router-dom';

const FormNewUser = () => {
  const [submitted, setSubmitted] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tecnico, setTecnico] = useState(false);

  const [emailRepetido, setEmailRepetido] = useState(false);
  const [nomeRepetido, setNomeRepetido] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      nome: userName,
      senha: password,
      email,
      permissao: tecnico ? 'tecnico' : 'usuario'
    };

    try {
     
      const createUserResponse = await fetch('http://localhost:5050/cadastro', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(user),
      });

      if (!createUserResponse.ok) {
        const errorData = await createUserResponse.json();
        if (errorData.message.includes('email já está em uso')) {
          setEmailRepetido(true);
        } else if (errorData.message.includes('nome de usuário já está em uso')) {
          setNomeRepetido(true);
        }
        throw new Error('Erro ao criar usuário');
      }

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
  };

  return (
    <>
      {submitted ? <Navigate to="/Login" /> : null}

      <form className={styles.form} onSubmit={(e) => { handleSubmit(e) }}>
        <h3>Crie sua conta</h3>
        <div className={nomeRepetido ? `${styles.alert}` : `${styles.noAlert}`}>
          <p>*Esse nome ja foi cadastrado em outra conta</p>
        </div>
        <label className={styles.inputGroup}>
          <input type="text" required value={userName} onChange={(e) => { handleDados("userName", e.target.value) }} className={userName ? `${styles.input} ${styles.hasValue}` : styles.input} />
          <label className={styles.placeholder}>Digite seu nome de usúario</label>
        </label>
        <div className={emailRepetido ? `${styles.alert}` : `${styles.noAlert}`}>
          <p>*Esse email ja foi cadastrado em outra conta</p>
        </div>
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
        <button type="submit" className={styles.btn}  >Criar</button>
      </form>
    </>
  );
}

export default FormNewUser;
