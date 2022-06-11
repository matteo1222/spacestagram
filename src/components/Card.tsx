import React from 'react'
import './Card.css'

interface Props {
  title: string,
  imgSrc: string,
  date: string,
  description: string
}

function Card(props: Props) {
  return (
    <article className='Card'>
      <img className='Card__Image' src={props.imgSrc} alt={props.description}/>
      <h2 className='Card__Title'>{props.title}</h2>
      <p className='Card__Description'>{props.description}</p>
      <time className='Card__Date'>{props.date}</time>
    </article>
  )
}

export default Card