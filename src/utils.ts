export function saveLikedPictures(ids: string[]) {
  window.localStorage.setItem('likedPictures', JSON.stringify(ids))
}

export function loadLikedPictures() {
  const likedPictures = window.localStorage.getItem('likedPictures')
  if (!likedPictures || typeof likedPictures !== 'string') return []
  return JSON.parse(likedPictures)
}