import React, { useState } from 'react'
import styles from './configContainer.module.css'
import { Ul } from './Ul'
import {Teste} from './lis/Teste'
export const ConfigContainer = () => {
  const [page, setPage] = useState()
  return (
    <>
      <div className={styles.container}>
        <div className={styles.ul}>
          <Ul setPage={setPage} />
        </div>
        <div className={styles.content}>
        <Teste/>
          
        </div>
      </div>
    </>
  )
}
