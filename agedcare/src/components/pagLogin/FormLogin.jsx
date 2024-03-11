import React, { useEffect, useState } from 'react'
import styles from './formLogin.module.css'

import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

import { Link, Navigate } from 'react-router-dom'

const FormLogin = () => {

  const url = "http://localhost:3000/users"

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [tecnico, setTecnico] = useState(false)

  const [data, setData] = useState("")
  const [login, setLogin] = useState(false)
  const [userWrong, setUserWrong] = useState(false)
  const [passWrong, setPassWrong] = useState(false)

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
  }

  const getData = (e) => {
    e.preventDefault()
    fetch(url).then((res) => {
      return res.json()
    }).then((resp) => {
      setData(resp);

      

      const user = resp.find(user => user.userName === name);
      if (user === undefined) {
        setUserWrong(true)
      } else {
        setUserWrong(false)
        // Verifica a senha apenas se o usuário for encontrado
        const pass = user.password;

        // manda para a local storage pra acessar os dados do usuario
      localStorage.setItem('id', user.id);

        if (pass !== password) {
          setPassWrong(true)
        } else {
          setPassWrong(false)
          setLogin(true)
        }
      }


    }).catch((err) => {
      console.error('Falha no login devido a :' + err.message);
    })
  }
  // const processedLogin=(e)=>{
  //   getData()

  //   const user = data.users.find(user => user.name === name);

  //   console.log(user);
  // }

  // useEffect(() => {
  //   console.log(data);
  // }, [login]);

  return (
    <>
      {login ? <Navigate to="/Home" /> : null}
      <div className={styles.container}>
        <form className={styles.form} onSubmit={(e) => { getData(e) }}>
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

            {userWrong || passWrong ? <p className={`${styles.alert} ${styles.error}`}>Usuário ou senha inválidos</p> : null}

          </div>

          <button type="submit" className={styles.btn} onSubmit={(e) => handleSubmit(e)}>Entrar</button>

          {/* <h5 className={styles.newPassLink}>Esqueceu sua senha? Click <Link to='/'><span className={styles.destaque}>aqui</span></Link></h5> */}
          <h5 className={styles.newUserLink}>Nâo possui uma conta? Click <Link to='/NewUser'><span className={styles.destaque}>aqui</span></Link></h5>

        </form>
      </div>
    </>
  )
}

export default FormLogin