import React, { useState, useEffect } from 'react'
import styles from './home.module.css'

import { Home } from '../../components/pagHome/Home'
import Pages from '../../components/Pages'
import { useLocation } from 'react-router-dom';

const index = () => {
    const info = sessionStorage.getItem('user');
    const id = info ? JSON.parse(info).cod : null;
    return (
        <>
        <Pages component={Home} id={id} />
        </>
    )
}

export default index