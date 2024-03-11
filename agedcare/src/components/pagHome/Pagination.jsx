import React from 'react'
import styles from './pagination.module.css'

const maxItens = 5;
const maxLeft = (maxItens - 1) / 2;

export const Pagination = ({ limit, total, skip, setSkip, data }) => {
    const current = skip ? skip / limit + 1 : 1;
    const pages = Math.ceil(total / limit);
    const first = Math.max(current - maxLeft, 1);

    // Função para avançar  
    const handleNext = () => {
        if (data.length >= skip + 12) {
            setSkip(prevSkip => prevSkip + 12);
        }
    };

    // Função para retroceder
    const handlePrevious = () => {
        if (skip >= 12) {
            setSkip(prevSkip => prevSkip - 12);
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Adiciona uma animação de rolagem suave
        });
    };

    return (
        <>
            <div className={styles.content}>
                <button onClick={() => handlePrevious()} className={styles.btn}>Anterior</button>
                <ul className={styles.pagination}>
                    {Array.from({ length: maxItens })
                        .map((_, index) => index + first)
                        .map((page, index) => {
                            return (
                                <li key={index}>
                                    <button
                                        className={`${styles.btnSkip} ${page === current ? styles.active : ''}`}
                                        onClick={() => {
                                            scrollToTop();
                                            setSkip((page - 1) * limit)
                                        }}
                                    >
                                        {page}
                                    </button>
                                </li>
                            );
                        })}
                </ul>
                <button onClick={() => handleNext()} className={styles.btn}>Próximo</button>
            </div>
        </>
    );
};