import { useState, useEffect } from 'react'

import styles from './comentario.module.css'
import defaultUser from './../../../assets/defaultUser.png'
import { ShowRating } from './ShowRating'

export const Comentario = ({ dataUser,replies,comentario,currentUserId,deleteComment}) => {
    const [canDelete,setCanDelete]=useState(false)
    useEffect(() => {
        if (comentario.userId === currentUserId) {
            setCanDelete(true);
        } else {
            setCanDelete(false);
        }
    }, [comentario.userId, currentUserId]);

    return (
        <div className={styles.comentarioCard}>
            <div className={styles.commentImage}>
                <img src={defaultUser} />
            </div>
            <div className={styles.commentRightPart}>
                <ShowRating
                rating={comentario.avaliacao}
                />
                <div className={styles.commentContent}>
                    <div className={styles.commentAuthor}>{comentario.userName}</div>
                    <div className={styles.dateText}>
                    {new Date(comentario.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                </div>
                <div className={styles.commentText}>{comentario.comentario}</div>

                <div className={styles.actions}>
                    {/* Se você quiser permitir resposta ou exclusão, pode manter essas ações */}
                    {canDelete && <div className={styles.commentAction} onClick={() => { deleteComment(comentario.id) }}>Delete</div>}
                </div>

                {replies.length > 0 && (
                    <div className={styles.rep}>
                        {replies.map(reply => {
                            return (
                                <Comentario
                                //comentario={reply}
                                // key={reply.id}
                                //replies={[]}
                                //currentUserId={currentUserId}
                                //deleteComment={deleteComment}
                                // parentId={comentario.id}
                                // addComment={addComment}
                                //  activeComentario={activeComentario}
                                //  setActiveComentario={setActiveComentario}
                                //updateComment={updateComment}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}