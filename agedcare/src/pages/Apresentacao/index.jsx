import styles from './Apresentacao.module.css';

import { RiShieldCrossLine } from 'react-icons/ri';
import { MdPeopleAlt } from 'react-icons/md';
import { LuMonitorSmartphone } from 'react-icons/lu';

import Card from '../../components/pagApresentacao/Card';
import Feedback from '../../components/pagApresentacao/Feedback';
import Footer from '../../components/Footer';
import Qaf from '../../components/pagApresentacao/qaf'

import { useState } from 'react';
import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import img1 from './../../assets/MariaAparecida.png';
import img2 from './../../assets/Claudioni.jpg';
import img3 from './../../assets/Ermilio.png';

const index = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const handleOpenMenu = () => {
        setOpenMenu(!openMenu);
    };

    const [showBar, setShowBar] = useState(1);

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY >= 0 && window.scrollY <= 400) {
                setShowBar(1);
            } else if (window.scrollY > 400 && window.scrollY <= 500) {
                setShowBar(2);
            } else {
                setShowBar(3);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToFAQ = () => {
        const faqSection = document.getElementById('faqSection');
        if (faqSection) {
            faqSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className={styles.app}>
                <div className={styles.banner}>
                    {showBar === 1 ?
                        <div className={`${styles.header} ${styles.fadeIn}`}>
                            <Link to='/'><h3>AgedCare</h3></Link>
                            <div className={`${styles.btns} ${openMenu ? styles.active : ''}`}>
                                <button className={styles.btnLog}><Link to='/Login' className={styles.linkSemEstilo}>Login</Link></button>
                                <button className={styles.btnLog}><Link to='/NewUser' className={styles.linkSemEstilo}>Cadastro</Link></button>
                                <button className={styles.btnLog}><Link to='/About' className={styles.linkSemEstilo}>Sobre nós</Link></button>
                                <button className={styles.btnLog} onClick={scrollToFAQ}>Perguntas e Respostas</button> 
                            </div>
                            <div className={styles.menu} onClick={handleOpenMenu}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        :
                        <div className={`${showBar === 3 ? styles.disable : ''} ${styles.header} ${styles.fadeOut}`}>
                            <h3>AgedCare</h3>
                            <div className={styles.btns}>
                                <button className={styles.btnLog}>Login</button>
                                <button className={styles.btnLog}>Cadastro</button>
                            </div>
                        </div>
                    }

                    <h1>Aged Care</h1>
                    <h5>Amar é cuidar</h5>
                </div>

                <div className={styles.cardsContainer}>
                    <h2 className={styles.title}>Conheça a Aged Care</h2>
                    <div className={styles.cards}>
                        <Card txt1="ATENDIMENTO VERIFICADO" txt2="A AgedCare passa por uma verificação de capacitação dos seus cuidadores, isso para que entreguemos uma pessoa qualificada para todas suas necessidades!" icon={<RiShieldCrossLine />} />
                        <Card txt1="NOSSOS CUIDADOS A DISPOSIÇÃO" txt2="Encontre os mais diversos cuidadores segundo a sua necessidade a hora que você precisar!" icon={<MdPeopleAlt />} />
                        <Card txt1="CADASTRE-SE" txt2="Cadastre-se para conseguir ter acesso a todos os cuidadores além de possuir seu próprio perfil!" icon={<LuMonitorSmartphone />} />
                    </div>
                </div>

                <div className={styles.callTec}>
                    <h2 className={styles.title}>Quer trabalhar conosco?</h2>
                    <div className={styles.bgCallTec}>
                        <div className={styles.blackFilter}></div>
                        <div className={styles.referance}>
                            <Link to="/FormTec"><h2>Tenha mais informações aqui!</h2></Link>
                        </div>
                    </div>
                </div>

                <div className={styles.feedbackContainer}>
                    <h2 className={styles.title}>Veja alguns usúarios que recomendam nossos serviços</h2>
                    <div className={styles.feedbacks}>
                        <Feedback name="Maria Aparecida" comment="A facilidade de uso do site, juntamente com a atenção e cuidado demonstrados por sua equipe, tornam a experiência de encontrar um cuidador de confiança incrivelmente tranquila e reconfortante." image={img1} id={1} />
                        <Feedback name="Claudioni Pinho" comment="Encontrei alguém maravilhoso para cuidar da minha mãe, alguém que não só é altamente competente e profissional, mas também traz consigo carinho e humanidade." image={img2} id={2} />
                        <Feedback name="Emilio Escobar" comment="Encontrei alguém maravilhoso para cuidar da minha mãe, alguém que não só é altamente competente e profissional, mas também traz consigo carinho e humanidade." image={img3} id={3} />
                    </div>
                </div>

                <div id="faqSection">
                    <Qaf />
                </div>

                <Footer />
            </div>
        </>
    );
}

export default index;
