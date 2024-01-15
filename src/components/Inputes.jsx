import { TextField } from '@mui/material'
import React from 'react'

const Inputes = ({varient,labeltext,style,name,type}) => {
  return (
    <TextField className={style} type={type} name={name} label={labeltext} variant={varient}/>
  )
}

export default Inputes