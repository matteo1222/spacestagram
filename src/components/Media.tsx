import React from 'react'
import { MediaType } from '../pages/Home'

interface Props {
  mediaType: MediaType
  className: string
  src: string
  alt?: string
}

function Media(props: Props) {
  if (props.mediaType === 'image') {
    return (
      <img
        className={props.className}
        src={props.src}
        alt={props.alt}
        loading="lazy"
      />
    )
  }
  if (props.mediaType === 'video') {
    return (
      <iframe
        className={props.className}
        src={props.src}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    )
  }
  return null
}

export default Media
