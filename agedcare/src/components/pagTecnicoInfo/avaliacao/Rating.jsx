import { useEffect, useState } from 'react'
import styles from './rating.module.css'
import { IoStarSharp } from "react-icons/io5";
export const Rating = ({ avaliacao, setAvaliacao,rating,hover,setHover,setRating }) => {

    return (
        <>
            <div class={styles.rating}>
                {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;
                    return (
                        <label key={index}>
                            <input
                                type="radio"
                                name='rating'
                                value={currentRating}
                                onClick={() => {
                                    setRating(currentRating)
                                    setAvaliacao(currentRating)
                                }}
                                onMouseEnter={()=> setHover(currentRating)}
                                onMouseLeave={()=>setHover(null)}
                            />
                            <IoStarSharp className={styles.star}  color={currentRating <= (hover || rating) ? "#6f00ff" : "#4b4b4b"} />

                        </label>
                    )
                })}
            </div>

        </>


    )
}
