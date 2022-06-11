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
      <h2 className='Card__Title'>{props.title}</h2>
      <img className='Card__Image' src={props.imgSrc} alt={props.description}/>
      <div className='Card__TextContainer'>
        <p className='Card__Description'>{props.description}</p>
        <time className='Card__Date'>{props.date}</time>
      </div>
    </article>
  )
}

export default Card