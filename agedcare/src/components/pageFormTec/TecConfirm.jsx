import React from 'react'
import styles from './tecConfirm.module.css'

export const TecConfirm = ({ update, data }) => {
    const getPropriedadesVerdadeiras = (objeto) => {
        // Usamos Object.keys para obter todas as chaves do objeto
        // Em seguida, usamos filter para manter apenas as chaves que têm um valor verdadeiro
        return Object.keys(objeto).filter(chave => objeto[chave]);
    };
    
    return (

        <>
            <div className={styles.content}>
                <label className={styles.title}>Confirme seus dados</label>
                <div className={styles.collumns}>
                    <div className={styles.collumn1}>
                        <p className={styles.p}>Nome completo: <span className={styles.dadoText}>{data.name}</span></p>
                        <p className={styles.p}>Data de nascimento: <span className={styles.dadoText}>{data.birthday}</span></p>
                        <p className={styles.p}>CPF: <span className={styles.dadoText}>{data.cpf}</span></p>
                        <p className={styles.p}>Orgão emissor: <span className={styles.dadoText}>{data.emissor}</span></p>
                        <p className={styles.p}>RG: <span className={styles.dadoText}>{data.rg}</span></p>
                        <p className={styles.p}>Estado civil: <span className={styles.dadoText}>{data.civilState}</span></p>
                        <p className={styles.p}>Sexo: <span className={styles.dadoText}>{data.sexo}</span></p>
                        <hr className={styles.divisaoR}/>
                        <p className={styles.p}>Celular: <span className={styles.dadoText}>{data.celular}</span></p>
                        <p className={styles.p}>Email: <span className={styles.dadoText}>{data.email}</span></p>
            

                    </div>
                    <hr className={styles.divisao}/>
                    <div className={styles.collumn2}>
                        <p className={styles.p}>CEP: <span className={styles.dadoText}>{data.cep}</span></p>
                        <p className={styles.p}>Logradouro: <span className={styles.dadoText}>{data.logradouro}</span></p>
                        <p className={styles.p}>Endereco: <span className={styles.dadoText}>{data.endereco}</span></p>
                        <p className={styles.p}>Nm: <span className={styles.dadoText}>{data.nm}</span></p>
                        <p className={styles.p}>UF: <span className={styles.dadoText}>{data.uf}</span></p>
                        <p className={styles.p}>Cidade: <span className={styles.dadoText}>{data.cidade}</span></p>
                        <p className={styles.p}>Bairro: <span className={styles.dadoText}>{data.bairro}</span></p>
                        <hr className={styles.divisaoR}/>
                        <p className={styles.p}>Disponibilidade:  <span className={styles.dadoText}>
                            {getPropriedadesVerdadeiras(data.disponibilidade).map((propriedade, index) => (
                                // Mapeamos sobre o array de propriedades verdadeiras e renderizamos cada uma dentro de um <span>
                                <span key={index}>{`${propriedade} `}</span>
                            ))}</span></p>
                        <p className={styles.p}>Locais de trabalho: <span className={styles.dadoText}>
                            {getPropriedadesVerdadeiras(data.locaisAptos).map((propriedade, index) => (
                                // Mapeamos sobre o array de propriedades verdadeiras e renderizamos cada uma dentro de um <span>
                                <span key={index}>{`${propriedade} `}</span>
                            ))}
                        </span></p>
                        <p className={styles.p}>Distância: <span className={styles.dadoText}>{data.km} km</span></p>

                    </div>
                </div>

                {/* <div className={styles.row1}>


                </div>
                <div className={styles.row2}>

                </div>
                <div className={styles.row3}>


                </div>
                <div className={styles.row4}>

                </div>
                <div className={styles.row5}>

                </div>
                <div className={styles.row6}>

                </div>
                <div className={styles.row7}>



                </div> */}
            </div>
        </>
    )
}
