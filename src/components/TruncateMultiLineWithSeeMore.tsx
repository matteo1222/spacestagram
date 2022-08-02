import React, { useState, useRef } from 'react'
import './TruncateMultiLineWithSeeMore.css'
import Skeleton from 'react-loading-skeleton'
import { useEffect } from 'react'

interface Props {
  children: React.ReactElement
  isLoading?: boolean
}

const LIMITED_TEXT_LENGTH = 33

function TruncateMultiLineWithSeeMore(props: Props) {
  const [extended, setExtended] = useState(false)
  const [exceedLimitedTextLength, setExceedLimitedTextLength] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    setExceedLimitedTextLength(
      (textRef.current.textContent ? textRef.current.textContent.length : 0) >
        LIMITED_TEXT_LENGTH
    )
  }, [textRef])

  function seeMoreButton() {
    if (props.isLoading) {
      return <Skeleton width="20%" />
    }

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
