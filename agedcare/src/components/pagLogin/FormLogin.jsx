import React, { useState } from 'react';
import styles from './formLogin.module.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, Navigate } from 'react-router-dom';

const FormLogin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [userWrong, setUserWrong] = useState(false);
  const [passWrong, setPassWrong] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);

  const handleDados = (dado, valor) => {
    switch (dado) {
      case 'name':
        setName(valor);
        break;
      case 'password':
        setPassword(valor);
        break;
      default:
        console.error("Estado inválido");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      nome: name,
      senha: password,
    };

    try {
      const response = await fetch('http://localhost:5050/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include', // Inclui cookies na solicitação
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro ao fazer login:', errorData);
        setUserWrong(true);
        setPassWrong(true);
        throw new Error(errorData.error || 'Usuário ou senha inválidos');
      }

      const result = await response.json();
      console.log(result); // Adicione este console.log para verificar a estrutura da resposta

      if (result.user && result.user.cod) {
        // Armazene os dados do usuário no sessionStorage
        sessionStorage.setItem('user', JSON.stringify(result.user));

        const userId = result.user.cod;

        // Verifica se o usuário é um técnico e se possui cadastro na tabela técnico
        if (result.user.permissao === 'tecnico') {
          const tecnicoResponse = await fetch('http://localhost:5050/home', {
            method: 'GET',
            credentials: 'include'
          });
          const tecnicoData = await tecnicoResponse.json();

          const isTecnicoRegistered = tecnicoData.some(tecnico => tecnico.cod_usuario === userId);

          if (!isTecnicoRegistered) {
            setRedirectTo('/formTec'); // Redireciona para o formulário de cadastro de técnico se não encontrar dados
          } else {
            setRedirectTo('/Home'); // Redireciona para a Home se o técnico já tiver o perfil
          }
        } else {
          setRedirectTo('/Home'); // Redireciona para a Home se for um usuário comum
        }
        setLogin(true);
      } else {
        console.error('Resposta inesperada do servidor:', result);
        setUserWrong(true);
        setPassWrong(true);
      }
    } catch (error) {
      console.error('Falha no login devido a: ' + error.message);
    }
  };

  if (redirectTo) {
    return <Navigate to={redirectTo} />
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h5 className={styles.subTitle}>Entre na sua conta</h5>
        <div className={styles.inpBox}>
          <label>
            <FaUser />
            <input type="text" placeholder='Usuário' value={name} onChange={(e) => handleDados("name", e.target.value)} required />
          </label>
          <label>
            <FaLock />
            <input type="password" placeholder='Senha' value={password} onChange={(e) => handleDados("password", e.target.value)} required />
          </label>
          {(userWrong || passWrong) && <p className={`${styles.alert} ${styles.error}`}>Usuário ou senha inválidos</p>}
        </div>
        <button type="submit" className={styles.btn}>Entrar</button>
        <h5 className={styles.newUserLink}>Não possui uma conta? Clique <Link to='/NewUser'><span className={styles.destaque}>aqui</span></Link></h5>
      </form>
    </div>
  );
};

export default FormLogin;
