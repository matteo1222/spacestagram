import React, { useState } from 'react'
import './TruncateMultiLineWithSeeMore.css'
import Skeleton from 'react-loading-skeleton'

interface Props {
  children: React.ReactNode,
  isLoading?: boolean
}
// TODO: check if the description need to be extended
function TruncateMultiLineWithSeeMore(props: Props) {
  const [extended, setExtended] = useState(false)
  function seeMoreButton() {
    if (props.isLoading) {
      return <Skeleton width='20%' />
    }
    if (!extended) {
      return <button className='Wrapper__Button' onClick={() => setExtended(true)}>See More</button>
    }
    return null
  } 
  return (
    <>
      <div className={`Wrapper ${extended ? 'Wrapper--Extended' : ''}`}>
        {props.children}
      </div>
      {seeMoreButton()}
    </>
  )
}

export default TruncateMultiLineWithSeeMore