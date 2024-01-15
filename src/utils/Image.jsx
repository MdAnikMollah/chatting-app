import React from 'react'

const Image = ({src,alt,style}) => {
  return (
   <img className={style} src={src} alt={alt} />
  )
}

export default Image