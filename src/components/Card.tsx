import React from 'react'
import './Card.css'
import { format } from 'date-fns'
import { MediaType } from '../pages/Home'
import Media from './Media'
import Skeleton from 'react-loading-skeleton'
import TruncateMultiLineWithSeeMore from './TruncateMultiLineWithSeeMore'
import LikeButton from './LikeButton'

interface Props {
  copyright?: string
  mediaType?: MediaType
  title?: string
  src?: string
  date?: string
  description?: string
  liked?: boolean
  handleLike?: (cardId?: string) => void
}

// TODO check props date string is valid?
function Card(props: Props) {
  return (
    <article className="Card">
      <h3 className="Card__Title">{props.title || <Skeleton />}</h3>
      <h4
        className="Card__SubTitle"
        style={{ visibility: props.copyright ? 'visible' : 'hidden' }}
      >
        Copyright: {props.copyright}
      </h4>
      {props.src && props.mediaType ? (
        <Media
          className="Card__Image"
          mediaType={props.mediaType}
          src={props.src}
          alt={props.title}
        />
      ) : (
        <Skeleton height={320} />
      )}
      <div className="Card__TextContainer">
        {props.src && props.date && props.liked !== undefined ? (
          <LikeButton
            liked={props.liked}
            onClick={() => props.handleLike && props.handleLike(props.date)}
          />
        ) : (
          <Skeleton width="10%" />
        )}
        <TruncateMultiLineWithSeeMore isLoading={!props.src}>
          <p className="Card__Description">
            {props.description || <Skeleton count={3} />}
          </p>
        </TruncateMultiLineWithSeeMore>
        <time className="Card__Date">
          {props.date ? (
            format(new Date(props.date), 'dd MMMM yyyy')
          ) : (
            <Skeleton width="20%" />
          )}
        </time>
      </div>
    </article>
  )
}

export default Card
