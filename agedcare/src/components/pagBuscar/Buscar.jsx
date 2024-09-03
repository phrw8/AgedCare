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
    const [cuidadoresName, setCuidadoresName] = useState([]);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5050/home'); // Removed pagination
            if (!response.ok) {
                throw new Error('Erro ao buscar dados');
            }
            const data = await response.json();
            const cuidadores = data.filter(user => user.tecnico === true);
            setCuidadoresData(cuidadores);
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

    const handleSearch = () => {
        // Fetch data after search
        fetchData(); 
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (name || cidade || locais.length > 0 || disponibilidades.length > 0) {
            const nameLowerCase = name.toLowerCase();
            const cidadeLowerCase = cidade.toLowerCase();

            const tecnicosFiltrados = cuidadoresData.filter(user => {
                const nameMatch = user.name.toLowerCase().includes(nameLowerCase);
                const cidadeMatch = user.cidade.toLowerCase().includes(cidadeLowerCase);

                const localMatch = locais.length === 0 || locais.every(local => user.locaisAptos?.[local] === true);
                const disponibilidadeMatch = disponibilidades.length === 0 || disponibilidades.every(disponibilidade =>
                    user.disponibilidade?.[disponibilidade] === true
                );

                return nameMatch && cidadeMatch && localMatch && disponibilidadeMatch;
            });

            setCuidadoresName(tecnicosFiltrados);
        } else {
            setCuidadoresName(cuidadoresData);
        }
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
                <InputSrc name={name} setName={setName} onSubmit={handleSearch} />
            </div>

            <div className={styles.filterRow}>
                {name && <p className={styles.h3}>Resultados para: <span className={styles.h3foggy}>{name}</span></p>}
                <p className={styles.h3}>
                    <MdOutlineFilterAlt onClick={() => setOpen(!open)} className={styles.iconFilter} />Filtros
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

            {cuidadoresName.length > 0 ? (
                <div className={styles.grid}>
                    {cuidadoresName.map((user) => (
                        <Card
                            key={user.cod}
                            name={user.name}
                            age={user.age}
                            cidade={user.cidade}
                            locaisAptos={user.locaisAptos}
                            img={user.img}
                            id={user.cod}  
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.h3foggy}>Nenhum técnico encontrado com os critérios especificados.</div>
            )}
        </div>
    );
}
