import { TextField } from '@mui/material'
import React from 'react'

const Inputes = ({varient,labeltext,style,name,type,onChange,onClick}) => {
  return (
    <TextField onClick={onClick} onChange={onChange} className={style} type={type} name={name} label={labeltext} variant={varient}/>
  )
}

export default Inputes