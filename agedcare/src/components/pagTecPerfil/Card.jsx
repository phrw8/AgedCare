import React, { useState,useEffect} from 'react'
import styles from './card.module.css'
import { IoMdStar } from "react-icons/io";
import Avatar1 from '../../assets/tec1.jpeg'
import Avatar2 from '../../assets/tec2.jpeg'
import Avatar3 from '../../assets/tecpic.png'
import {ShowRating} from './../pagTecnicoInfo/avaliacao/ShowRating'

const Card = ({ data }) => {
  const [value, setValue] = useState(null); // Estado inicial como null

  // Atualiza o estado com o avatar de 'data' quando disponível
  useEffect(() => {
    if (data?.avatar) {
      setValue(Number(data.avatar));
    }
  }, [data]);

  // Determina qual avatar exibir
  const avatarToDisplay =
    value === 1 ? Avatar1 :
    value === 2 ? Avatar2 :
    value === 3 ? Avatar3 :
    null;



  return (
    <>
      <div className={styles.card}>
        <hr className={styles.divisoria1} />
        <div className={styles.image}>
          {avatarToDisplay && <img src={avatarToDisplay} alt="Card " className={styles.image} />}
        </div>
        <hr className={styles.divisoria} />
        <h3 className={styles.username}>{`@${data ? data.nome : "error"}`}</h3>
        <div className={styles.avaliacao}>
          <ShowRating rating={data ? data.avaliacao : "Nao possui avaliacoes"} title={true} />
          <div className={styles.numeroAvalicao}>
            <p className={styles.avNum}>5,0/{data ? data.avaliacao : "Nao possui avaliacoes"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;