import React, { useEffect, useState } from 'react';
import styles from './containerContent.module.css';
import ContainerData from './ContainerData';
import Card from './Card';
import { ContainerOptions } from './ContainerOptions';
import { ContainerPersonal } from './ContainerPersonal';
import { ContainerDesc } from './ContainerDesc';

const ContainerContent = () => {
    // Obtém o 'cod_usuario' armazenado na sessão
    const cod_usuario = sessionStorage.getItem('user');
    const [dataUser, setDataUser] = useState();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Faz a requisição à API, incluindo as credenciais (sessão)
                const response = await fetch(`http://localhost:5050/perfilTec`, {
                    method: 'GET',
                    credentials: 'include', // Envia cookies e sessão na requisição
                });

                // Verifica se a resposta da solicitação é bem-sucedida
                if (response.ok) {
                    const data = await response.json();
                    setDataUser(data.data); // Acessa o campo 'data' do objeto retornado
                } else {
                    // Se a resposta não for bem-sucedida, lança um erro
                    throw new Error('Não foi possível obter os dados do usuário');
                }
            } catch (error) {
                console.error('Ocorreu um erro ao buscar os dados do usuário:', error);
            }
        };

        fetchUserData(); // Chama a função para buscar os dados do usuário
    }, [cod_usuario]);

    return (
        <>
            <div className={styles.app}>
                <div className={styles.square}>
                    <div className={styles.banner}></div>
                    <div className={styles.row1}>
                        <ContainerData data={dataUser} />
                        <Card data={dataUser} />
                    </div>
                    <div className={styles.row2}>
                        <ContainerOptions name="Disponibilidade" data={dataUser} />
                        <ContainerOptions name="Locais aptos" data={dataUser} />
                    </div>
                    <div className={styles.row3}>
                        <ContainerPersonal name="Alterar informações pessoais" data={dataUser} />
                        <ContainerPersonal name="Alterar informações de endereço" data={dataUser} />
                        
                    </div>
                    <div className={styles.row4}>
                        <ContainerPersonal name="Alterar Descrição" data={dataUser} />
                    </div>
                    <div className={styles.row4}>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContainerContent;
