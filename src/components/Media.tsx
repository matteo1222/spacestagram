import React from 'react'
import { MediaType } from '../pages/Home'

interface Props {
  mediaType: MediaType,
  className: string,
  src: string,
  alt?: string
}

function Media(props: Props) {
  if (props.mediaType === 'image') {
    return (
      <img
        className='Card__Image'
        src={props.src}
        alt={props.alt}
        loading='lazy'
      />
    )
  }
  if (props.mediaType === 'video') {
    return (
      <iframe
        width='100%'
        height='320'
        src={props.src}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Embedded youtube'
      />
    )
  }
  return null
}

export default Media