import React from 'react'
import './Card.css'
import { format } from 'date-fns'
import { MediaType } from '../pages/Home'
import Media from './Media'

interface Props {
  copyright: string,
  mediaType: MediaType,
  title: string,
  src: string,
  date: string,
  description: string
}

// TODO check props date string is valid?
function Card(props: Props) {
  return (
    <article className='Card'>
      <h3 className='Card__Title'>{props.title}</h3>
      <h4 className='Card__SubTitle' style={{ visibility: props.copyright ? 'visible' : 'hidden' }}>Copyright: {props.copyright}</h4>
      <Media className='Card__Image' mediaType={props.mediaType} src={props.src} alt={props.title}/>
      <div className='Card__TextContainer'>
        <p className='Card__Description'>{props.description}</p>
        <time className='Card__Date'>{format(new Date(props.date), 'dd MMMM yyyy')}</time>
      </div>
    </article>
  )
}

export default Card