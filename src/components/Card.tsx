import React from 'react'
import './Card.css'
import { format } from 'date-fns'

interface Props {
  copyright: string,
  title: string,
  imgSrc: string,
  date: string,
  description: string
}

// TODO check props date string is valid?
function Card(props: Props) {
  return (
    <article className='Card'>
      <h3 className='Card__Title'>{props.title}</h3>
      <h4 className='Card__SubTitle'>Copyright: {props.copyright}</h4>
      <img className='Card__Image' src={props.imgSrc} alt={props.description}/>
      <div className='Card__TextContainer'>
        <p className='Card__Description'>{props.description}</p>
        <time className='Card__Date'>{format(new Date(props.date), 'dd MMMM yyyy')}</time>
      </div>
    </article>
  )
}

export default Card