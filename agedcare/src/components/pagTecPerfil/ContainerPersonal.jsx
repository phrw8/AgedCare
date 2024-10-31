import { useEffect, useState } from 'react';
import styles from './../../pages/PerfilTec/tecnicoPerfil.module.css';
import { GrUserSettings } from 'react-icons/gr';

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
  const [tecData, setTecData] = useState(data || {});
  const [editing, setEditing] = useState(false);
  const cod_usuario = sessionStorage.getItem('user');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTecData({ ...tecData, [name]: value });
  };

  const updateTecData = async () => {
    try {
      const response = await fetch('http://localhost:5050/perfilTecAtualiza', {
        method: 'PATCH', // Utilizando o PATCH para atualizações parciais
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...tecData, cod_usuario }), // Incluindo o código do usuário
      });

      if (response.ok) {
        console.log('Dados atualizados com sucesso.');
      } else {
        console.error('Falha ao atualizar os dados do técnico.');
      }
    } catch (error) {
      console.error('Erro ao atualizar os dados do técnico:', error);
    }
  };

  useEffect(() => {
    setTecData(data || {});
  }, [data]);

  return (
    <div className={styles.app}>
      <div className={styles.row}>
        <p className={styles.h3foggy}>{name}</p>
        <GrUserSettings className={styles.iconChangeConfig} onClick={() => setEditing(!editing)} />
      </div>
      <div className={styles.collumn}>
        {name === 'Alterar informações pessoais' && (
          <>
            <div className={styles.row}>
              <InputField label="Nome" name="nome" value={tecData.nome || ''} onChange={handleInputChange} />
              <InputField label="CPF" name="cpf" value={tecData.cpf || ''} onChange={handleInputChange} />
            </div>
            <div className={styles.row}>
              <InputField label="Email" name="email" value={tecData.email || ''} onChange={handleInputChange} />
              <InputField label="RG" name="rg" value={tecData.rg || ''} onChange={handleInputChange} />
            </div>
            <div className={styles.row}>
              <InputField label="Celular" name="fone" value={tecData.fone || ''} onChange={handleInputChange} />
              <InputField label="Data de Nascimento" name="datanasc" value={tecData.datanasc || ''} onChange={handleInputChange} />
            </div>
          </>
        )}
        {name === 'Alterar informações de endereço' && (
          <>
            <div className={styles.row}>
              <InputField label="CEP" name="cep" value={tecData.cep || ''} onChange={handleInputChange} />
              <InputField label="UF" name="uf" value={tecData.uf || ''} onChange={handleInputChange} />
              <InputField label="Cidade" name="cidade" value={tecData.cidade || ''} onChange={handleInputChange} />
            </div>
            <div className={styles.row}>
              <InputField label="Bairro" name="bairro" value={tecData.bairro || ''} onChange={handleInputChange} />
              <InputField label="Numero" name="numero" value={tecData.numero || ''} onChange={handleInputChange} />
            </div>
            <div className={styles.row}>
              <InputField label="Logradouro" name="logradouro" value={tecData.logradouro || ''} onChange={handleInputChange} />
            </div>
          </>
        )}
        {name === 'Alterar Descrição' && (
          <div className={styles.row}>
            <textarea
              name="obs"
              value={tecData.obs || ''}
              onChange={handleInputChange}
              className={`${styles.obsField} ${styles.input}`}
            />
          </div>
        )}
        {editing && (
          <div className={styles.btnsComentario}>
            <button type="button" className={styles.btnComentario} onClick={() => {
              updateTecData();
              setEditing(false);
            }}>Salvar</button>
            <button type="button" className={styles.btnComentario} onClick={() => setEditing(false)}>Cancelar</button>
          </div>
        )}
      </div>
    </div>
  );
};
