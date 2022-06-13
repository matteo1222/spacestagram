import React, { useState } from 'react'
import { fetchPictures } from '../api/fetchPictures';
import Card from '../components/Card';
import { useInfiniteQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroll-component';
import './Home.css';
import { BATCH_FETCH_DAYS, EARLIEST_AVAILABLE_DATE, CACHE_TIME } from '../constants';
import { addDays } from 'date-fns'
import { Oval } from  'react-loader-spinner'
import { AiFillRocket } from 'react-icons/ai'

export enum MediaType {
  image = 'image',
  video = 'video'
}

interface NASAResponse {
  copyright: string,
  title: string,
  url: string,
  date: string,
  explanation: string,
  media_type: MediaType
}
// TODO: write a test to test it
function exceedsEarliestAvailableDate(pageLength: number) {
    // calculate if the next page exceed the earliest available date
    const endDate = addDays(new Date(), -BATCH_FETCH_DAYS * pageLength)
    return endDate < new Date(EARLIEST_AVAILABLE_DATE)
}

function Home() {
  const [likedPictures, setLikedPictures] = useState<string[]>(loadLikedPictures)
  // TODO: use queryType
  const picturesQuery:any = useInfiniteQuery('pictures', fetchPictures, {
    select: data => ({
      pages: [...data.pages].reverse(),
      pageParams: [...data.pageParams].reverse(),
    }),
    getNextPageParam: (lastPage, pages) => {
      if (exceedsEarliestAvailableDate(pages.length)) {
        return undefined
      }
      return pages.length
    },
    staleTime: Infinity,
    cacheTime: CACHE_TIME
  })
  function handleLike(pictureId?: string) {
    if (!pictureId) return
    let newLikedPictures = []
    if (likedPictures.includes(pictureId)) {
      // remove from liked pictures
      newLikedPictures = likedPictures.filter(picture => picture !== pictureId)
      setLikedPictures(newLikedPictures)
    } else {
      // add to liked pictures
      newLikedPictures = [...likedPictures, pictureId]
      setLikedPictures(newLikedPictures)
    }
    // save liked history
    saveLikedPictures(newLikedPictures)
  }
  function saveLikedPictures(ids: string[]) {
    window.localStorage.setItem('likedPictures', JSON.stringify(ids))
  }
  function loadLikedPictures() {
    const likedPictures = window.localStorage.getItem('likedPictures')
    if (!likedPictures || typeof likedPictures !== 'string') return []
    return JSON.parse(likedPictures)
  }
  function pictures() {
    if (picturesQuery.status === 'loading') {
      return (
        new Array(2).fill(null).map((_el, idx) => <Card key={idx}/>)
      )
    }
    if (picturesQuery.status === 'error') {
      return <p>Error: {picturesQuery.error.message}</p>
    }
    return [...picturesQuery.data.pages.flat()].reverse().map((el: NASAResponse) => (
      <Card
        key={el.date}
        copyright={el.copyright}
        title={el.title}
        src={el.url}
        date={el.date}
        description={el.explanation}
        mediaType={el.media_type}
        liked={likedPictures.includes(el.date)}
        handleLike={handleLike}
      />
    ))
  }
  return (
    <div className='Home'>
      <nav className='NavBar'>
        <h1 className='NavBar__Title'>Spacestagram<AiFillRocket/></h1>
        <h2 className='NavBar__SubTitle'>NASA's Astronomy Picture of the Day</h2>
      </nav>
      <main className='Card__Container'>
        <InfiniteScroll
          dataLength={picturesQuery.data?.pages.length * BATCH_FETCH_DAYS}
          next={picturesQuery.fetchNextPage}
          hasMore={picturesQuery.hasNextPage}
          loader={<div style={{ display: 'flex', justifyContent: 'center'}}><Oval width='20' height='20' color='grey' ariaLabel='Loading'/></div>}
        >
          {pictures()}
        </InfiniteScroll>
      </main>
    </div>
  )
}

export default Home