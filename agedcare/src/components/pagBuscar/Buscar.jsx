import { useState, useEffect } from 'react';
import styles from './buscar.module.css';
import { Card } from '../pagHome/Card';
import { InputSrc } from './InputSrc';
import { MdOutlineFilterAlt } from "react-icons/md";
import { InputSrcCidade } from './InputSrcCidade';
import { InputSrcCategorias } from './InputSrcCategorias';

export const Buscar = () => {
    const [locais, setLocais] = useState([]);
    const [disponibilidades, setDisponibilidades] = useState([]);
    const [cidade, setCidade] = useState("");
    const [open, setOpen] = useState(false);
    const [cuidadoresData, setCuidadoresData] = useState([]);
    const [cuidadoresFiltrados, setCuidadoresFiltrados] = useState([]);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5050/home');
            if (!response.ok) throw new Error('Erro ao buscar dados');
            const data = await response.json();
            console.log('Dados recebidos:', data);
            setCuidadoresData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (local) => {
        setLocais(prevLocais =>
            prevLocais.includes(local)
                ? prevLocais.filter(item => item !== local)
                : [...prevLocais, local]
        );
    };

    const handleDisponibilidadeChange = (disponibilidade) => {
        setDisponibilidades(prevDisponibilidades =>
            prevDisponibilidades.includes(disponibilidade)
                ? prevDisponibilidades.filter(item => item !== disponibilidade)
                : [...prevDisponibilidades, disponibilidade]
        );
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const nameLowerCase = name.toLowerCase();
        const cidadeLowerCase = cidade.toLowerCase();
        const tecnicosFiltrados = cuidadoresData.filter(tecnico => {
            const nameMatch = tecnico.nome.toLowerCase().includes(nameLowerCase);
            const cidadeMatch = tecnico.cidade.toLowerCase().includes(cidadeLowerCase);
            const localMatch = locais.length === 0 || locais.every(local => tecnico[local] === 'true');
            const disponibilidadeMatch = disponibilidades.length === 0 ||
                disponibilidades.every(disponibilidade => tecnico[disponibilidade] === 'true');
            return nameMatch && cidadeMatch && localMatch && disponibilidadeMatch;
        });
        setCuidadoresFiltrados(tecnicosFiltrados);
    }, [name, cidade, cuidadoresData, locais, disponibilidades]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Ocorreu um erro ao carregar os dados: {error}</div>;
    }

    return (
        <div className={styles.app}>
            <div className={styles.src}>
                <p className={styles.srcH3}>Busca de técnico</p>
                <InputSrc name={name} setName={setName} onSubmit={fetchData} />
            </div>
            <div className={styles.filterRow}>
                {name && <p className={styles.h3}>Resultados para: <span
                    className={styles.h3foggy}>{name}</span></p>}
                <p className={styles.h3}>
                    <MdOutlineFilterAlt onClick={() => setOpen(!open)} className={styles.iconFilter}
                    />Filtros
                </p>
            </div>
            {open && (
                <div className={styles.filterContainer}>
                    <div className={styles.row}>
                        <div className={styles.src}>
                            <p>Cidade:</p>
                            <div className={styles.inputCidade}>
                                <InputSrcCidade cidade={cidade} setCidade={setCidade} />
                            </div>
                        </div>
                    </div>
                    <InputSrcCategorias
                        handleCheckboxChange={handleCheckboxChange}
                        handleDisponibilidadeChange={handleDisponibilidadeChange}
                    />
                </div>
            )}
            {cuidadoresFiltrados.length > 0 ? (
                <div className={styles.grid}>
                    {cuidadoresFiltrados.map(tecnico => (
                        <Card
                            key={tecnico.cod}
                            name={tecnico.nome} // Alteração para garantir que o nome seja passado corretamente
                            img={tecnico.avatar}
                            age={tecnico.datanasc}
                            cidade={tecnico.cidade}
                            locaisAptos={{
                                dia: tecnico.dia,
                                noite: tecnico.noite,
                                tarde: tecnico.tarde,
                                fds: tecnico.fds,
                                pernoite: tecnico.pernoite,
                                domicilio: tecnico.domicilio,
                                hospital: tecnico.hospital,
                                asilo: tecnico.asilo,
                                clinica: tecnico.clinica
                            }}
                            id={tecnico.cod}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.h3foggy}>Nenhum técnico encontrado com os critérios especificados.</div>
            )}
        </div>
    );
};
