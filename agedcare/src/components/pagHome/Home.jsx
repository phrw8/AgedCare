import React from 'react'
import styles from './home.module.css'

import { useState, useEffect } from 'react'
import useFetch from '../hooks/useFetch'

import { Card } from './Card'
import { Pagination } from './Pagination'
import { InputSrc } from './InputSrc'

export const Home = () => {
    const [cuidadoresData, setCuidadoresData] = useState([]);
    const [cidade, setCidade] = useState("")
    const [cidadeData, setCidadeData] = useState([])
    const [skip, setSkip] = useState(0); // Estado para controlar o valor de skip
    const { data, loading, error } = useFetch(`http://localhost:3000/users?_limit=12&_start=${skip}`);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        if (cidade) {
            const cidadeLowerCase = cidade.toLowerCase();
            const tecnicosDe = cuidadoresData.filter(user => user.cidade.toLowerCase().includes(cidadeLowerCase) );
            setCidadeData(tecnicosDe);
            console.log(cidadeData)
        } else {
            // Se o campo de cidade estiver vazio, exiba todos os resultados
            setCidade()
        }
    }, [cidade, cuidadoresData]);

    useEffect(() => {
        const fetchTotalItems = async () => {
            try {
                const response = await fetch('http://localhost:3000/users');
                const data = await response.json();
                setTotalItems(data.length); // Define o número total de itens
            } catch (error) {
                console.error('Ocorreu um erro ao buscar o número total de itens:', error);
            }
        };

        fetchTotalItems();
    }, []);

    useEffect(() => {
        if (data) {
            const cuidadores = data.filter(user => user.tecnico === true);
            setCuidadoresData(cuidadores);
            console.log(cuidadoresData)
        }
    }, [data, skip]);

    return (
        <>
            <div className={styles.homeContainer}>
                <InputSrc cidade={cidade} setCidade={setCidade} />
                {cidade ? <h2 className={styles.title}>Cuidadores de {cidade}</h2> :
                    <h2 className={styles.title}>Cuidadores perto de você</h2>}

                {loading && <div>Carregando...</div>}
                {error && <div>Ocorreu um erro: {error.message}</div>}
                {cidadeData.length > 0 && cuidadoresData.length > 0 && (
                    <div className={styles.content}>
                        {cidadeData.map(user => (
                            <Card key={user.id} name={user.name} img={user.perfil} age={user.birthday} cidade={user.cidade} locais={user.locaisAptos} id={user.id}/>
                        ))}
                    </div>
                )}
                {cidadeData.length === 0 && cuidadoresData.length > 0 && (
                    <div className={styles.content}>
                        {cuidadoresData.map(user => (
                            <Card key={user.id} name={user.name} img={user.perfil} age={user.birthday} cidade={user.cidade} locais={user.locaisAptos} id={user.id}/>
                        ))}
                    </div>
                )}
                {cidadeData.length === 0 && cuidadoresData.length === 0 && (
                    <div className={styles.alert}>Nenhum cuidador encontrado</div>
                )}
                <Pagination
                    limit={12}
                    total={cidadeData.length > 0 ? cidadeData.length : totalItems}
                    skip={skip}
                    setSkip={setSkip}
                    data={cidadeData.length > 0 ? cidadeData : cuidadoresData} />
            </div>
        </>
    );
};