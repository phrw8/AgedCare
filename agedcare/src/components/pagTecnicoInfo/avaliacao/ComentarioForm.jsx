import styles from './comentarioForm.module.css'
import { useState } from 'react'
import { Rating } from './Rating';
const ComentarioForm = ({ handleSubmit, submitLabel,hasCancelButton=false,initialText="",handleCancel,avaliacao,setAvaliacao, avaliar=false}) => {
  const [text, setText] = useState(initialText);
  const isTextDisabled=text.length === 0
  const [rating, setRating] = useState(avaliacao)
    const [hover, setHover] = useState(avaliacao)

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(text,null);
    setText("")
    console.log(avaliacao)
    setRating(null)
    setHover(null)
  };

  return (
    <form onSubmit={onSubmit} className={styles.formComments}>
      <div className={styles.ratingContainer}>
        {avaliar ? <Rating avaliacao={avaliacao} setAvaliacao={setAvaliacao} setHover={setHover} setRating={setRating} rating={rating} hover={hover} /> : null}
      
      </div>
      
      <textarea className={styles.textarea} value={text ? text : ""} onChange={(e) => setText(e.target.value)}></textarea>
      <div className={styles.btn}>
        <button className={styles.formButton} disabled={isTextDisabled}>{submitLabel}</button>
        {hasCancelButton && (
          <button type='button' className={styles.formButton} onClick={handleCancel}>Cancel</button>
        )}
        </div>

    </form>
  );
};

export default ComentarioForm;
