import React, { useState, useRef } from 'react'
import './TruncateMultiLineWithSeeMore.css'
import Skeleton from 'react-loading-skeleton'

interface Props {
  children: React.ReactElement
  isLoading?: boolean
}

const LIMITED_TEXT_LENGTH = 33

// TODO: check if the description need to be extended
function TruncateMultiLineWithSeeMore(props: Props) {
  const [extended, setExtended] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)
  function seeMoreButton() {
    if (props.isLoading) {
      return <Skeleton width="20%" />
    }

    if (!textRef.current) {
      return <Skeleton width="20%" />
    }
    const exceedLimitedTextLength =
      (textRef.current.textContent ? textRef.current.textContent.length : 0) >
      LIMITED_TEXT_LENGTH

    if (!extended && exceedLimitedTextLength) {
      return (
        <button className="Wrapper__Button" onClick={() => setExtended(true)}>
          See More
        </button>
      )
    }
    return null
  }
  return (
    <>
      <div className={`Wrapper ${extended ? 'Wrapper--Extended' : ''}`}>
        {React.cloneElement(props.children, { ref: textRef })}
      </div>
      {seeMoreButton()}
    </>
  )
}

export default TruncateMultiLineWithSeeMore
