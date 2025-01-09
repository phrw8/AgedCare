import React, { useEffect, useState } from 'react';
import styles from './containerContent.module.css';
import ContainerData from './ContainerData';
import Card from './Card';
import { ContainerOptions } from './ContainerOptions';
import { ContainerPersonal } from './ContainerPersonal';
import { ContainerDesc } from './ContainerDesc';
import { ContainerChange } from './ContainerChange';
import { Banner } from './Banner';

const ContainerContent = () => {
    // Obtém o 'cod_usuario' armazenado na sessão
    const user = JSON.parse(sessionStorage.getItem('user'));

    // Acessa o atributo 'cod' do objeto e transforma em número
    const codUser = Number(user.cod);
    const [dataTec, setDataTec] = useState();
    const [dataUser, setDataUser] = useState();
    const [dataAvaliacao,setDataAvaliacao]=useState()
    const [codTec,setCodTec]=useState()
    const [media,setMedia]=useState()
    
    function calcularMediaAvaliacoes(array, nm) {
        if (!Array.isArray(array)) {
            console.error('dataAvaliacao não é um array válido:', array);
            return 'Não possui avaliações';
        }
        let somaAvaliacoes = 0;
        let count = 0;
        console.log(array)
    
        array.forEach(item => {
            console.log(item)
            const avaliacao = item;
            if (avaliacao !== null && avaliacao !== undefined) {
                somaAvaliacoes += avaliacao;
                count++;
            }
        });
    
        const media = count > 0 ? (somaAvaliacoes / count).toFixed(1) : 'Não possui avaliações';
        setMedia((media))
        console.log(media)
        return nm ? media : count;
    }
    

    useEffect(() => {
        const fetchTecData = async () => {
            try {
                // Faz a requisição à API, incluindo as credenciais (sessão)
                const response = await fetch(`http://localhost:5050/perfilTec`, {
                    method: 'GET',
                    credentials: 'include', // Envia cookies e sessão na requisição
                });
                

                // Verifica se a resposta da solicitação é bem-sucedida
                if (response.ok) {
                    const data = await response.json();
                    setDataTec(data.data); // Acessa o campo 'data' do objeto retornado
                    setCodTec(data.data.cod)
                } else {
                    // Se a resposta não for bem-sucedida, lança um erro
                    throw new Error('Não foi possível obter os dados do usuário');
                }
            } catch (error) {
                console.error('Ocorreu um erro ao buscar os dados do usuário:', error);
            }
        };

        fetchTecData(); // Chama a função para buscar os dados do tecnico
    }, [codUser]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (codUser) {
              try {
                const userResponse = await fetch('http://localhost:5050/usuario', {
                  credentials: 'include',
                });
                if (!userResponse.ok) {
                  throw new Error('Erro ao buscar o usuário');
                }
                const data = await userResponse.json();
                setDataUser(data);
              } catch (error) {
                console.error('Erro ao buscar o usuário:', error);
              }
            }
          };

        fetchUserData(); // Chama a função para buscar os dados do usuário
    }, [codUser]);

    useEffect(() => {
            const fetchAvaliacaoTec = async () => {
                try {
                    const response = await fetch(`http://localhost:5050/comentario/${codTec}`, {
                        method: 'GET',
                        credentials: 'include', // Inclui cookies na requisição para gerenciar a sessão
                    });
    
                    if (!response.ok) {
                        throw new Error(`Erro ao buscar os comentários. Status: ${response.status}`);
                    }
    
                    const data = await response.json();
    
                    // Extrai apenas o campo "avaliacao" dos dados
                    const avaliacoes = data.data.map(comentario => comentario.avaliacao);
    
                    console.log('Avaliações:', avaliacoes); // Debug das avaliações extraídas
                    setDataAvaliacao(avaliacoes)
                } catch (error) {
                    console.error('Erro ao buscar os comentários:', error);
                }
            };
    
            fetchAvaliacaoTec();
        }, [codTec]);

        useEffect(() => {
            calcularMediaAvaliacoes(dataAvaliacao)
        }, [dataAvaliacao]);

    const [showScreen, setShowScreen] = useState();
    const [showScreen2, setShowScreen2] = useState()

    return (
        <>
            <div className={styles.app}>
                {(showScreen || showScreen2) && <div className={styles.foggyBack}></div>}
                <div className={styles.square}>
                    <Banner data={dataTec} />
                    <div className={styles.row1}>
                        <ContainerData data={dataTec} showScreen={showScreen} setShowScreen={setShowScreen} setShowScreen2={setShowScreen2} showScreen2={showScreen2} />
                        <Card data={dataTec} dataUser={dataUser} media={media} />
                    </div>
                    <div className={styles.row2}>
                        <ContainerOptions name="Disponibilidade" data={dataTec} />
                        <ContainerOptions name="Locais aptos" data={dataTec} />
                    </div>
                    <div className={styles.row3}>
                        <ContainerPersonal name="Alterar informações pessoais" data={dataTec} />
                        <ContainerPersonal name="Alterar informações de endereço" data={dataTec} />

                    </div>
                    <div className={styles.row4}>
                        <ContainerPersonal name="Alterar Descrição" data={dataTec} />
                    </div>
                </div>
                {showScreen && <ContainerChange setShowScreen={setShowScreen} className={styles.containerChange} opt={1} />}
                {showScreen2 && <ContainerChange setShowScreen2={setShowScreen2} className={styles.containerChange} opt={2} />}
            </div>
        </>
    );
};

export default ContainerContent;
