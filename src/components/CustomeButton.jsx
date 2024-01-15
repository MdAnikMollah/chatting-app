import { Button } from '@mui/material'
import React from 'react'

const CustomeButton = ({varient,text, styleing}) => {
  return (
    <Button className={styleing} variant={varient}>{text}</Button>
  )
}

export default CustomeButton