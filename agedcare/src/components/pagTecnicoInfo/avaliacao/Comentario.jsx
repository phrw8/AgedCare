import { useState, useEffect } from 'react'

import styles from  './comentario.module.css'
import defaultUser from './../../../assets/defaultUser.png'
import ComentarioForm from './ComentarioForm'
import {ShowRating} from './ShowRating'

export const Comentario = ({
    comentario,
    replies,
    currentUserId,
    deleteComment,
    activeComentario,
    setActiveComentario,
    addComment,
    parentId = null,
    updateComment={updateComment} }) => {

    const canReply = Boolean(currentUserId) && !parentId
    const canEdit = currentUserId == comentario.userId
    const canDelete = currentUserId == comentario.userId
    const isReplying = activeComentario &&
        activeComentario.type == "replying" &&
        activeComentario.id == comentario.id;
    const isEditing = activeComentario &&
        activeComentario.type == "editing" &&
        activeComentario.id == comentario.id;
    const replyId = parentId ? parentId : comentario.id
    
 
    return (
        <div className={styles.comentarioCard}>
            <div className={styles.commentImage}>
                <img src={defaultUser} />
            </div>
            <div className={styles.commentRightPart}>
                {!parentId ? <ShowRating rating={comentario.avaliacao}/> : null}
                <div className={styles.commentContent}>
                    <div className={styles.commentAuthor}>{comentario.userName}</div>
                    <div className={styles.dateText}>
                        {new Date(comentario.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                </div>
                {!isEditing && <div className={styles.commentText}>{comentario.comentario}</div>}
            
                {isEditing && (
                    <ComentarioForm 
                    submitLabel={"Update"} 
                    hasCancelButton 
                    initialText={comentario.comentario} 
                    handleSubmit={(text)=>{
                        updateComment(text,comentario.id)
                        setActiveComentario(null)
                    }}  
                    handleCancel={()=> setActiveComentario(null)}/>
                )}
                <div className={styles.actions}>
                    {canReply && <div className={styles.commentAction} onClick={() =>
                        setActiveComentario({
                            id: comentario.id,
                            type: "replying"
                        })
                    }>Reply</div>}
                    {canEdit && <div className={styles.commentAction} onClick={() => setActiveComentario({ id: comentario.id, type: "editing" })}>Edit</div>}
                    {canDelete && <div className={styles.commentAction} onClick={() => { deleteComment(comentario.id) }}>Delete</div>}
                </div>

                {isReplying && (
                    <div className={styles.formComment}>
                        <ComentarioForm submitLabel="Reply" handleSubmit={(text) => addComment(text, replyId)} />
                    </div>
                )}
                {replies.length > 0 && (
                    <div className={styles.rep}>
                        {replies.map(reply => {
                            return (
                                <Comentario
                                    comentario={reply}
                                    key={reply.id}
                                    replies={[]}
                                    currentUserId={currentUserId}
                                    deleteComment={deleteComment}
                                    parentId={comentario.id}
                                    addComment={addComment}
                                    activeComentario={activeComentario}
                                    setActiveComentario={setActiveComentario}
                                    updateComment={updateComment} />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
