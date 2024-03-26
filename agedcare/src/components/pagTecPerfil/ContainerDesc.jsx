import React, { useEffect, useState } from 'react'
// import styles from './containerDesc.module.css'
import styles from './../../pages/PerfilTec/tecnicoPerfil.module.css'

import { GrUserSettings } from "react-icons/gr";

export const ContainerDesc = ({ data }) => {
    const [comentario,setComentario] = useState("value")
    const [editing, setEditing] = useState(false)

    const submitComentario = async (value, id) => {
        const comentarioData = {
            comentario: comentario,
        };

        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comentarioData)
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
        if (data) {
            if (data.comentario) {
                setComentario(data.comentario);
            } else {
                setComentario("");
            }
        } else {
            setComentario("Carregando descrição");
        }
    }, [data, comentario]);
    useEffect(() => {
        console.log(comentario)
        console.log("ta mudadno")
    }, [comentario])
    return (
        <>
            <div className={styles.app}>
                <div className={styles.row}>
                    <p className={styles.h3foggy}>Alterar informações de exibição:</p>
                    <GrUserSettings className={styles.iconChangeConfig} onClick={() => setEditing(!editing)} />
                </div>
                <div className={styles.row}>
                    {!editing && <p className={`${styles.h3} ${styles.textarea}`}>{comentario}</p>}
                    {editing && <>
                    <form >
                        <textarea
                            type="text"
                            className={`${styles.h3} ${styles.textarea}`}
                            defaultValue={comentario}
                            onChange={(e) => {
                                console.log(e.target.value)
                                setComentario(e.target.value)
                            }}
                        ></textarea>
                        <div className={styles.btnsComentario}>
                            <button type='submit' className={styles.btnComentario} onClick={() => {
                                submitComentario(comentario, data.id)
                                setEditing(!editing)
                            }}>Alterar</button>
                            <button type='submit' className={styles.btnComentario} onClick={() => setEditing(!editing)}>Cancelar</button>
                        </div>
                        </form>
                    </>}
                </div>
            </div>
        </>
    )
}
