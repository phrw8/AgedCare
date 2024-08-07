import React from 'react';
import styles from './perfil.module.css';
import { Perfil } from '../../components/pagPerfil/Perfil';
import Pages from '../../components/Pages';

const Index = () => {
    // Obtém o id do usuário diretamente do sessionStorage
    const info = sessionStorage.getItem('user');
    const id = info ? JSON.parse(info).cod : null;

    return (
        <>
            <Pages component={Perfil} id={id} />
        </>
    );
};

export default Index;
