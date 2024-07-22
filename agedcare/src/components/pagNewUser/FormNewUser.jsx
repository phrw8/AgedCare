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

  const [emailRepetido,setEmailRepetido]=useState("")
  const [nomeRepetido,setNomeRepetido]=useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      userName,
      password,
      email,
      tecnico,
      name: userName,
      cep: "",
      celular: "",
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
      birthday: ""
    };

    try {
      // Necessita de alteração
      // Verificação do nome de usuário
      const response = await fetch(url);
      

      if (!response.ok) {
        throw new Error('Erro ao verificar o nome de usuário');
      }

      const data = await response.json();
      console.log('Dados retornados:', data);  // Adiciona log para ver os dados retornados

      
      // Verificação do email
      const repeatEmail = data.filter((us) => us.email === user.email);
      console.log(repeatEmail)
      if (repeatEmail.length > 0) {
        setEmailRepetido(true)
        throw new Error('Esse email já está em uso');
      }else{
        setEmailRepetido(false)
      }
      

      // Verifique se o usuário já existe
      const repeatUser = data.filter((us) => us.userName === user.userName);
      if (repeatUser.length > 0) {
        setNomeRepetido(true)
        throw new Error('Nome de usuário já está em uso');
      } else{
        setNomeRepetido(false)
      }
      

      

      // Criação de novo usuário
      // Necessita de alteração
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
        <button type="submit" className={styles.btn}  >Entrar</button>
      </form>
    </>
  )
}

export default FormNewUser