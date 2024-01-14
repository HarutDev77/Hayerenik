import React, { FC } from 'react'
import classes from './MainBotton.module.scss'

interface MainButtonProps {
   width?: string
   height?: string
   text: string
   fontSize?: string
}

const MainButton: FC<MainButtonProps> = ({ width = '114px', height = '40px', fontSize = '15px', text, ...rest }) => {
   const { className, ...restData } = rest

   return (
      <button className={`${classes.hk_main_button} ${className}`} {...restData} style={{ width, height, fontSize }}>
         {text}
      </button>
   )
}

export default MainButton
