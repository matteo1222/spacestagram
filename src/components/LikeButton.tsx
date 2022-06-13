import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai/'
import { AiFillHeart } from 'react-icons/ai/'
import './LikeButton.css'

interface Props {
  liked: boolean,
  onClick: () => void
}

function LikeButton(props: Props) {
  return (
    <button
      aria-label='Like'
      onClick={props.onClick}
      className={`LikeButton ${props.liked ? 'LikeButton--Liked' : ''}`}
    >
      {
        props.liked ?
        <AiFillHeart/>
        :
        <AiOutlineHeart/>
      }
    </button>
  )
}

export default LikeButton