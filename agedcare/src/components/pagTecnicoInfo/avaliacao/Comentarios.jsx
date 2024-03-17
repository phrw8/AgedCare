import { useState, useEffect} from 'react'
import styles from './comentarios.module.css'
import  {Comentario} from './Comentario';
import useFetch from './../../hooks/useFetch.jsx'

import ComentarioForm from './ComentarioForm.jsx'

export const Comentarios = ({ currentUserId, tecId}) => {
    const { data, loading, error } = useFetch(`http://localhost:3000/users/${currentUserId}`)
    const userData= data
    const [comentarios, setComentarios] = useState([]);
    const [activeComentario, setActiveComentario] = useState(null)
    const [avaliacao,setAvaliacao]=useState(1)
    const rootComments = comentarios.filter(
        (cm) => cm.parentId === null
    )
    const getReplies = commendId => {
        return comentarios.filter(cm => cm.parentId === commendId).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    
    const handleSubmit = async (text, parentId) => {
        const data = {
            comentario: text,
            parentId: parentId,
            userId: 1,
            userName: userData.userName,
            createdAt:  new Date().toISOString().slice(0, 19).replace('T', ' '),
            avaliacao:avaliacao,
            tecId:tecId
        };
        console.log(data)

        try {
            const response = await fetch('http://localhost:3030/avaliacoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Aqui você pode tratar a resposta do backend, se necessário
                setComentarios([response, ...comentarios])

            } else {
                console.error('Falha ao enviar avaliacoes.');
            }
        } catch (error) {
            console.error('Erro ao enviar avaliacoes:', error);
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
                await fetch(`http://localhost:3030/avaliacoes/delete/${comentarioRelacionado.id}`, {
                    method: 'DELETE'
                });
            }
    
            const response = await fetch(`http://localhost:3030/avaliacoes/delete/${comentarioId}`, {
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
    const updateComment = async (text, commentId)=>{
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
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3030/avaliacoes');
                if (!response.ok) {
                    throw new Error('Erro ao buscar os comentários');
                }
                const data = await response.json();
                const comentariosInvertidos = data.reverse();
                const comentariosTec = comentariosInvertidos.filter(comentario => comentario.tecId === tecId);
                setComentarios(comentariosTec);

                const comentariosObjeto = data.reduce((objeto, comentario) => {
                    objeto[comentario.id] = comentario;
                    return objeto;
                }, {});

                // Define o valor inicial do textarea como o comentário do primeiro elemento
            } catch (error) {
                console.error('Erro ao buscar os comentários:', error);
            }
        };

        fetchData();

    }, [comentarios]);

    useEffect(()=>{
        console.log(avaliacao)
    },[avaliacao])

    return (
        <>
            <div className={styles.comments}>
                <h3 className={styles.comentsTitle}>Avaliações</h3>

                <div className={styles.commentFormTitle}>Faça uma avaliação</div>

                <ComentarioForm handleSubmit={addComment} submitLabel="Enviar"  setAvaliacao={setAvaliacao} avaliar={true}/>

                <div className={styles.commentContainer}>
                    {rootComments.map((rootComment) => {
                        return (
                            <Comentario
                                key={rootComment.id}
                                comentario={rootComment}
                                replies={getReplies(rootComment.id)}
                                currentUserId={currentUserId}
                                deleteComment={deleteComment}
                                activeComentario={activeComentario}
                                setActiveComentario={setActiveComentario}
                                addComment={addComment}
                                updateComment={updateComment}
                                avaliacao={avaliacao}
                                />
                                
                        );
                    })}
                </div>
            </div>
        </>

    )
}
