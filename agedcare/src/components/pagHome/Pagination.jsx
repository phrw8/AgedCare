import React from 'react';
import styles from './pagination.module.css';

const maxItens = 5;
const maxLeft = (maxItens - 1) / 2;

export const Pagination = ({ limit, total, skip, setSkip, data }) => {
    const current = skip ? skip / limit + 1 : 1;
    const pages = Math.ceil(total / limit);
    const first = Math.max(current - maxLeft, 1);

    // Função para avançar  
    const handleNext = () => {
        if (data.length > skip + limit) {
            setSkip(prevSkip => prevSkip + limit);
        }
    };

    // Função para retroceder
    const handlePrevious = () => {
        if (skip >= limit) {
            setSkip(prevSkip => prevSkip - limit);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Adiciona uma animação de rolagem suave
        });
    };

    return (
        <div className={styles.content}>
            <button 
                onClick={handlePrevious} 
                className={styles.btn}
                disabled={skip === 0} // Desativa o botão se estiver na primeira página
            >
                Anterior
            </button>
            <ul className={styles.pagination}>
                {Array.from({ length: Math.min(maxItens, pages) })
                    .map((_, index) => index + first)
                    .map((page, index) => (
                        <li key={index}>
                            <button
                                className={`${styles.btnSkip} ${page === current ? styles.active : ''}`}
                                onClick={() => {
                                    scrollToTop();
                                    setSkip((page - 1) * limit);
                                }}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
            </ul>
            <button 
                onClick={handleNext} 
                className={styles.btn}
                disabled={skip + limit >= total} // Desativa o botão se estiver na última página
            >
                Próximo
            </button>
        </div>
    );
};
