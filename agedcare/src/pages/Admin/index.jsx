import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import './index.css'; 

const index = () => {
  const [users, setUsers] = useState([]);

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5050/adm'); 
        const data = await response.json();
        setUsers(data);
        console.log(data)
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };
    fetchUsers();
  }, []);

  
  const handleDelete = async (cod) => {
    try {
      await fetch(`http://localhost:5050/delete/${cod}`, {
        method: 'DELETE',
      });
      setUsers(users.filter((user) => user.cod !== cod));
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  
  const handleEdit = (cod) => {
    window.location.href = `/atualizar/${cod}`;
  };

  return (
    <>
      <Header />
      <h1>Painel de Controle</h1>
      <div className="container">
        
        <table className="user-table">
          <thead>
            <tr>
              <th>Cod</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Permissão</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.cod}>
                <td>{user.cod}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.permissao}</td>
                <td>
                  <FaEdit className="icon edit" onClick={() => handleEdit(user.cod)} />
                  <FaTrashAlt className="icon delete" onClick={() => handleDelete(user.cod)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default index;
