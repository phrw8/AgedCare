import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


const EditUser = () => {
  const { cod } = useParams(); // Pega o código do usuário a partir da URL
  const [user, setUser] = useState({ nome: '', email: '', permissao: '' });
  const navigate = useNavigate();

  // Função para buscar os dados do usuário a partir do cod
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5050/user${cod}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };
    fetchUser();
  }, [cod]);

  // Função para salvar as alterações do usuário
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5050/atualiza/${cod}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      navigate('/admin'); // Redireciona de volta para o painel de controle
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  // Função para manipular as alterações nos inputs
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <div className="container">
        <h1>Editar Usuário</h1>
        <form onSubmit={handleSave}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={user.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Permissão:</label>
            <input
              type="text"
              name="permissao"
              value={user.permissao}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditUser;
