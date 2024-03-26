import { useState, useEffect } from 'react'
import styles from './buscar.module.css'
import { Card } from '../pagHome/Card'
import { Home } from '../pagHome/Home'
import { InputSrc } from './InputSrc'
import useFetch from '../hooks/useFetch'
import { MdOutlineFilterAlt } from "react-icons/md";
import { InputSrcCidade } from './InputSrcCidade'
import { InputSrcCategorias } from './InputSrcCategorias'


export const Buscar = () => {
    const [locais, setLocais] = useState([])
    const [disponibilidades, setDisponibilidades] = useState([])
    const [cidade, setCidade] = useState("")
    const [open, setOpen] = useState(false)
    const [cuidadoresData, setCuidadoresData] = useState([]);
    const [cuidadoresName, setCuidadoresName] = useState([])
    const [name, setName] = useState("")
    const [skip, setSkip] = useState(0);
    const { data, loading, error } = useFetch(`http://localhost:3000/users?_limit=12&_start=${skip}`);

    const handleCheckboxChange = (local) => {
        const index = locais.indexOf(local);
        if (index === -1) {
            setLocais([...locais, local]);
        } else {
            const newLocal = [...locais];
            newLocal.splice(index, 1);
            setLocais(newLocal);
        }
        console.log(locais)
    };
    const handleDisponibilidadeChange = (disponibilidade) => {
        const index = disponibilidades.indexOf(disponibilidade);
        if (index === -1) {
            setDisponibilidades([...disponibilidades, disponibilidade]);
        } else {
            const newDisp = [...locais];
            newDisp.splice(index, 1);
            setDisponibilidades(newDisp);
        }
    };
    useEffect(() => {
        console.log(locais)
    })
    useEffect(() => {
        console.log(disponibilidades)
    })
    useEffect(() => {
        console.log(cuidadoresName)
    })
    useEffect(() => {
        if (data) {
            const cuidadores = data.filter(user => user.tecnico === true);
            setCuidadoresData(cuidadores);
        }
    }, [data, skip]);

    useEffect(() => {
        if (name || cidade || locais.length > 0 || disponibilidades.length > 0) {
            const nameLowerCase = name.toLowerCase();
            const cidadeLowerCase = cidade.toLowerCase();
    
            const tecnicosDe = cuidadoresData.filter(user => {
                const nameMatch = user.name.toLowerCase().includes(nameLowerCase);
                const cidadeMatch = user.cidade.toLowerCase().includes(cidadeLowerCase);
    
                const localMatch = locais.length === 0 || locais.every(local => user.locaisAptos[local] === true);
                const disponibilidadeMatch = disponibilidades.length === 0 || disponibilidades.every(disponibilidade =>
                    user.disponibilidade[disponibilidade] === true
                );
    
                return nameMatch && cidadeMatch && localMatch && disponibilidadeMatch;
            });
    
            setCuidadoresName(tecnicosDe);
        } else {
            setCuidadoresName([]);
        }
    }, [name, cidade, cuidadoresData, locais, disponibilidades]);


    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Ocorreu um erro ao carregar os dados.</div>;
    }
    return (
        <>
            <div className={styles.app}>
                <div className={styles.src}>
                    <p className={styles.srcH3}>Busca de técnico</p>
                    <InputSrc name={name} setName={setName} />
                </div>

                <div className={styles.filterRow}>
                    {name ? <p className={styles.h3}>Resultados para: <span className={styles.h3foggy}>{name}</span></p> : null}
                    <p className={styles.h3}><MdOutlineFilterAlt onClick={() => setOpen(!open)} className={styles.iconFilter} />Filtros</p>
                </div>
                {open ?
                    <div className={styles.filterContainer}>
                        <div className={styles.row}>
                            <div className={styles.src}>
                                <p >Cidade:</p>
                                <div className={styles.inputCidade}>
                                    <InputSrcCidade cidade={cidade} setCidade={setCidade} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <InputSrcCategorias handleCheckboxChange={handleCheckboxChange} handleDisponibilidadeChange={handleDisponibilidadeChange} />


                        </div>
                    </div> : null}


                {cuidadoresName.length > 0 && cuidadoresData.length > 0 && (
                    <div className={styles.content}>
                        {cuidadoresName.map(user => (
                            <Card key={user.id} name={user.name} img={user.perfil} age={user.birthday} cidade={user.cidade} locais={user.locaisAptos} id={user.id} />
                        ))}
                    </div>
                )}
                {cuidadoresName.length === 0 && cuidadoresData.length > 0 && name.length === 0 && (
                    <div className={styles.content}>
                        {cuidadoresData.map(user => (
                            <Card key={user.id} name={user.name} img={user.perfil} age={user.birthday} cidade={user.cidade} locais={user.locaisAptos} id={user.id} />
                        ))}
                    </div>
                )}
                {cuidadoresName.length === 0 && cuidadoresData.length > 0 && name.length > 0 && (
                    <div className={styles.alert}>Nenhum cuidador encontrado</div>
                )}
                {cuidadoresName.length === 0 && cuidadoresData.length === 0 && (
                    <div className={styles.alert}>Nenhum cuidador encontrado</div>
                )}
            </div>
        </>
    );

}
