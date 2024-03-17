import React from 'react';
import { IoStarSharp } from 'react-icons/io5'; // Certifique-se de importar o ícone IoStarSharp

import styles from './showRating.module.css';

export const ShowRating = ({ rating }) => {
    return (
        <>
        <div className={styles.rating}>
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name='rating'
                            value={currentRating}
                        />
                        <IoStarSharp
                            className={styles.star}
                            color={currentRating <= rating ? "#6f00ff" : "#4b4b4b"}
                            onClick={()=>console.log(rating)}
                        />
                    </label>
                );
            })}
            </div>
        </>
    );
};
