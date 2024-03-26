import { useEffect, useState } from 'react'
import styles from './../../pages/PerfilTec/tecnicoPerfil.module.css'
import { GrUserSettings } from "react-icons/gr";

const InputField = ({ label, name, value, onChange }) => (
  <label className={styles.labelInput}>
    {label}:
    <input
      type="text"
      className={`${styles.h3} ${styles.input}`}
      name={name}
      value={value}
      onChange={onChange}
    />
  </label>
);

export const ContainerPersonal = ({ name, data }) => {
  const [tecData, setTecData] = useState(data ? data : data);
  const [editing, setEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTecData({ ...tecData, [name]: value });
  };

  const submitComentario = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tecData)
      });

      if (response.ok) {
        console.log("deu certo fera");
      } else {
        console.error('Falha ao enviar comentário.');
      }
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
    }
  };

  useEffect(() => {
    console.log(tecData);
  }, [tecData]);

  return (
    <div className={styles.app}>
      <div className={styles.row}>
        <p className={styles.h3foggy}>{name}</p>
        <GrUserSettings className={styles.iconChangeConfig} onClick={() => setEditing(!editing)} />
      </div>
      <div className={styles.collumn}>
        {name === "Alterar informações pessoais" && !editing && (
          <>
            <div className={styles.row}>
              <InputField label="Nome" name="name" value={data ? data.name : "carregando"} onChange={handleInputChange} />
              <InputField label="CPF" name="cpf" value={data ? data.cpf : "carregando"} onChange={handleInputChange} />
            </div>
            <div className={styles.row}>
              <InputField label="Email" name="email" value={data ? data.email : "carregando"} onChange={handleInputChange} />
              <InputField label="RG" name="rg" value={data ? data.rg : "carregando"} onChange={handleInputChange} />
            </div>
            <div className={styles.row}>
              <InputField label="Celular" name="celular" value={data ? data.celular : "carregando"} onChange={handleInputChange} />
              <InputField label="Data de Nascimento" name="birthday" value={data ? data.birthday : "carregando"} onChange={handleInputChange} />
            </div>
          </>
        )}
        {name === "Alterar informações pessoais" && editing && (
          <>
            <div className={styles.row}>
              <InputField label="Nome" name="name" value={tecData ? tecData.name : "carregando"} onChange={handleInputChange} />
              <InputField label="CPF" name="cpf" value={tecData ? tecData.cpf : "n deu de pegar os dados"} onChange={handleInputChange} />
            </div>
            <div className={styles.row}>
              <InputField label="Email" name="email" value={tecData ? tecData.email : "n deu de pegar os dados"} onChange={handleInputChange} />
              <InputField label="RG" name="rg" value={tecData ? tecData.rg : "n deu de pegar os dados"} onChange={handleInputChange} />
            </div>
            <div className={styles.row}>
              <InputField label="Celular" name="celular" value={tecData ? tecData.celular : "n deu de pegar os dados"} onChange={handleInputChange} />
              <InputField label="Data de Nascimento" name="birthday" value={tecData ? tecData.birthday : "n deu de pegar os dados"} onChange={handleInputChange} />
            </div>
            <div className={styles.btnsComentario}>
              <button type='submit' className={styles.btnComentario} onClick={() => {
                submitComentario(tecData.id);
                setEditing(!editing);
              }}>Alterar</button>
              <button type='submit' className={styles.btnComentario} onClick={() => setEditing(!editing)}>Cancelar</button>
            </div>
          </>
        )}
        {name === "Alterar informações de endereço" && !editing && (
          <>
            <div className={styles.row}>
              <InputField label="CEP" name="cep" value={data ? data.cep : "n deu de pegar os dados"} onChange={handleInputChange} />
              <InputField label="UF" name="uf" value={data ? data.uf : "n deu de pegar os dados"} onChange={handleInputChange} />
              <InputField label="Cidade" name="cidade" value={data ? data.cidade : "n deu de pegar os dados"} onChange={handleInputChange} />
            </div>
            <div className={styles.row}>
              <InputField label="Bairro" name="bairro" value={data ? data.bairro : "n deu de pegar os dados"} onChange={handleInputChange} />
              <InputField label="Numero" name="numero" value={data ? data.numero : "n deu de pegar os dados"} onChange={handleInputChange} />
            </div>
            <div className={styles.row}>
              <InputField label="Logradouro" name="logradouro" value={data ? data.logradouro : "n deu de pegar os dados"} onChange={handleInputChange} />
              <InputField label="Endereço" name="endereco" value={data ? data.endereco : "n deu de pegar os dados"} onChange={handleInputChange} />
            </div>
          </>
        )}
        {name === "Alterar informações de endereço" && editing && (
          <>
            <div className={styles.row}>
              <InputField label="CEP" name="cep" value={tecData ? tecData.cep : "n deu de pegar os dados"} onChange={handleInputChange} />
              <InputField label="UF" name="uf" value={tecData ? tecData.uf : "n deu de pegar os dados"} onChange={handleInputChange} />
              <InputField label="Cidade" name="cidade" value={tecData ? tecData.cidade : "n deu de pegar os dados"} onChange={handleInputChange} />
            </div>
            <div className={styles.row}>
              <InputField label="Bairro" name="bairro" value={tecData ? tecData.bairro : "n deu de pegar os dados"} onChange={handleInputChange} />
              <InputField label="Numero" name="numero" value={tecData ? tecData.numero : "n deu de pegar os dados"} onChange={handleInputChange} />
            </div>
            <div className={styles.row}>
              <InputField label="Logradouro" name="logradouro" value={tecData ? tecData.logradouro : "n deu de pegar os dados"} onChange={handleInputChange} />
              <InputField label="Endereço" name="endereco" value={tecData ? tecData.endereco : "n deu de pegar os dados"} onChange={handleInputChange} />
            </div>
            <div className={styles.btnsComentario}>
              <button type='submit' className={styles.btnComentario} onClick={() => {
                submitComentario(tecData.id);
                setEditing(!editing);
              }}>Alterar</button>
              <button type='submit' className={styles.btnComentario} onClick={() => setEditing(!editing)}>Cancelar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
