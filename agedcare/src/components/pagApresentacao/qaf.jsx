import React, { useState } from 'react';
import styles from './qaf.module.css';

const Qaf = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "Como posso me cadastrar na Aged Care?",
            answer: "Para se cadastrar, basta clicar no botão 'Cadastro' no topo da página e preencher o formulário com seus dados."
        },
        {
            question: "Quais serviços a Aged Care oferece?",
            answer: "A Aged Care oferece serviços de cuidadores para idosos, com disponibilidade para diferentes horários e tipos de atendimento."
        },
        {
            question: "Como os cuidadores são selecionados?",
            answer: "Nossos cuidadores passam por um rigoroso processo de verificação, que inclui análise de qualificação e experiência profissional."
        },
        {
            question: "Posso cancelar o serviço contratado?",
            answer: "Sim, é possível cancelar o serviço a qualquer momento. Consulte nossa política de cancelamento para mais detalhes."
        },
        {
            question: "Como faço para entrar em contato com o suporte?",
            answer: "Você pode entrar em contato com o suporte através do nosso formulário de contato ou pelo telefone disponível na seção 'Sobre nós'."
        }
    ];

    return (
        <div className={styles.qafContainer}>
            <h2 className={styles.title}>Dúvidas Frequentes e Dicas</h2>
            <div className={styles.faqs}>
                {faqData.map((item, index) => (
                    <div key={index} className={styles.faqItem}>
                        <h3 className={styles.question} onClick={() => toggleFAQ(index)}>
                            {item.question}
                            <span className={styles.toggleIcon}>{openIndex === index ? '-' : '^'}</span>
                        </h3>
                        {openIndex === index && <p className={styles.answer}>{item.answer}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Qaf;
