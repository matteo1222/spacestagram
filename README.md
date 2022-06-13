# Spacestagram

This project was built using NASA's API - Astronomy Picture of the Day (APOD).

## Features
- Infinite Scrolling that loads more Astronomy Picture of the Day 
- Users are able to press like button or undo like button
  - Animated like button
  - Saves likes if the page is reloaded
- Preconnecting and DNS Prefetching

## Future TODOs
- Write a Netlify function to proxy NASA API request to hide the API Key
- Write unit tests with React Testing Library
- Write end-to-end test with Cypress
- Fix See More Button - The button should be only shown when description height is greater than wrapper's height
  - Use React.children.map to attach ref on children that are passed into \<TruncateMultiLineWithSeeMore\/\>
  - Use getBoundingClientRect to get elements' height and compare them

## How to set up the project

### `Install Dependencies`
In the project directory, run:
```
npm install
```
This installs the required dependencies.

### `Set up API Key`
Apply for NASA's API key at https://api.nasa.gov.
Then create a .env at the root folder with the following:
```
REACT_APP_NASA_KEY=YOUR_API_KEY
```
### `Start Development Server`
Run:
```
npm start
```
