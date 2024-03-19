import React from 'react';
import { IoStarSharp } from 'react-icons/io5'; // Certifique-se de importar o ícone IoStarSharp

import styles from './showRating.module.css';

export const ShowRating = ({ rating, title=false}) => {
    return (
        <>
        <div className={styles.rating}>
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                let roundedRating = rating;
                if (rating >= 3.6) {
                    roundedRating = Math.ceil(rating);
                }
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name='rating'
                            value={currentRating}
                        />
                        <IoStarSharp
                            className={title ? `${styles.star} ${styles.title}` : styles.star}
                            color={currentRating <= roundedRating ? "#6f00ff" : "#4b4b4b"}
                            onClick={()=>console.log(roundedRating)}
                        />
                    </label>
                );
            })}
            </div>
        </>
    );
};
