import { useState, useEffect } from 'react'
import styles from './comentarios.module.css'
import { Comentario } from './Comentario';
import useFetch from './../../hooks/useFetch.jsx'

import ComentarioForm from './ComentarioForm.jsx'

export const Comentarios = ({ tecId }) => {
    const [comentarios, setComentarios] = useState([]);
    const [activeComentario, setActiveComentario] = useState(null)
    const [avaliacao, setAvaliacao] = useState(1)
    const user = JSON.parse(sessionStorage.getItem('user'));
    const cod_usuario = user.cod;
    const rootComments = comentarios.filter(
        (cm) => cm.parentId === null
    )
    const getReplies = commendId => {
        return comentarios.filter(cm => cm.parentId === commendId).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    const [dataUser, setDataUser] = useState();
    const [userName, setUserName] = useState('');  // Inicializando como string vazia

    useEffect(() => {
        // Quando dataUser for atualizado, define o valor de userName
        if (dataUser && dataUser.nome) {
            setUserName(dataUser.nome);
        }
    }, [dataUser]);  // Esse useEffect vai ser chamado sempre que dataUser mudar

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await fetch(`http://localhost:5050/user/${cod_usuario}`, {
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
        };

        fetchUserData(); // Chama a função para buscar os dados do usuário
    }, []);

    useEffect(() => {
        console.log(userName)
    }, [userName]);

    useEffect(() => {
        console.log(dataUser)
    }, [dataUser]);

    useEffect(() => {
        console.log(`Avaliação atualizada: ${avaliacao}`);
        // Aqui você pode realizar outras ações, como salvar no backend ou atualizar algo na interface.
    }, [avaliacao]);

    useEffect(() => {
        console.log(`Id do tecnico: ${tecId}`);
        // Aqui você pode realizar outras ações, como salvar no backend ou atualizar algo na interface.
    }, [tecId]);

    useEffect(() => {
        const fetchComentarios = async () => {
            try {
                const response = await fetch(`http://localhost:5050/comentario/${tecId}`, {
                    method: 'GET',
                    credentials: 'include', // Inclui cookies na requisição para gerenciar a sessão
                });

                if (!response.ok) {
                    throw new Error(`Erro ao buscar os comentários. Status: ${response.status}`);
                }

                const data = await response.json();
                setComentarios(data.data); // Atualiza os comentários no estado
            } catch (error) {
                console.error('Erro ao buscar os comentários:', error);
            }
        };

        fetchComentarios();
    }, [tecId,comentarios]);


    const handleSubmit = async (text, parentId) => {
        const comentarioData = {
            comentario: text,
            parentId,
            createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
            avaliacao,
            tecId,
            cod_usuario, // Inclua o código do usuário no corpo da requisição
            userName,
        };
        console.log(comentarioData)

        try {
            const response = await fetch('http://localhost:5050/comentario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comentarioData)
            });

            if (response.ok) {
                alert('Comentário enviado com sucesso!');
                setComentarios([response, ...comentarios])
                
            } else {
                console.error(`Falha ao enviar avaliações. Status: ${response.status}`);
                const errorResponse = await response.text(); // Tente capturar o erro retornado pelo servidor
                console.error("Detalhes do erro do backend:", errorResponse);
            }
        } catch (error) {
            console.error(`Erro ao enviar avaliações: ${error.message}`);
            console.error("Stack Trace:", error.stack);
        }
    };
    const addComment = (text, parentId) => {
        console.log("add comment", text, parentId)
        handleSubmit(text, parentId)
        setActiveComentario(null)
    }

    const deleteComment = async (comentarioId) => {
        if (window.confirm("Tem certeza de que quer excluir esse comentario?"))
            try {
                const comentariosRelacionados = comentarios.filter(cm => cm.parentId === comentarioId);

                for (const comentarioRelacionado of comentariosRelacionados) {
                    await fetch(`http://localhost:5050/delete/${comentarioRelacionado.id}`, {
                        method: 'DELETE'
                    });
                }

                const response = await fetch(`http://localhost:5050/delete/${comentarioId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    setComentarios(comentarios.filter(cm => cm.id !== comentarioId));
                } else {
                    console.error('Falha ao excluir comentário.');
                }
            } catch (error) {
                console.error('Erro ao excluir comentário:', error);
            }
    };
    const updateComment = async (text, commentId) => {
        const data = {
            comentario: text,
        };

        try {
            const response = await fetch(`http://localhost:3030/avaliacoes/${commentId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log("deu certo fera")

            } else {
                console.error('Falha ao enviar comentário.');
            }
        } catch (error) {
            console.error('Erro ao enviar comentário:', error);
        }
    }

    

    useEffect(() => {
        console.log(avaliacao)
    }, [avaliacao])



    return (
        <>
            <div className={styles.comments}>
                <h3 className={styles.comentsTitle}>Avaliações</h3>

                <div className={styles.commentFormTitle}>Faça uma avaliação</div>

                <ComentarioForm handleSubmit={addComment} submitLabel="Enviar" avaliacao={avaliacao} setAvaliacao={setAvaliacao} avaliar={true} />

                <div className={styles.commentContainer}>
                    {rootComments
                        .sort((a, b) => b.id - a.id) // Ordena os comentários do maior id para o menor
                        .map((rootComment) => {
                            return (
                                <Comentario
                                    key={rootComment.id} // Certifique-se de que cada comentário tenha uma chave única
                                    comentario={rootComment}
                                    replies={getReplies(rootComment.id)}
                                    currentUserId={cod_usuario}
                                    deleteComment={deleteComment}
                                /* key={rootComment.id}
                                 comentario={rootComment}
                                 replies={getReplies(rootComment.id)}
                                
                                 
                                 activeComentario={activeComentario}
                                 setActiveComentario={setActiveComentario}
                                 addComment={addComment}
                                 updateComment={updateComment}
                                 avaliacao={avaliacao} */
                                />

                            );
                        })}
                </div>
            </div>
        </>

    )
}
