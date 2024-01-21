import { Button } from '@mui/material'
import React from 'react'

const CustomeButton = ({varient,text, styleing, onClick}) => {
  return (
    <Button onClick={onClick} className={styleing} variant={varient}>{text}</Button>
  )
}

export default CustomeButton