import React from 'react';
import Search from "./Search"
import ListDisplay from "./ListDisplay"
import './App.css';

function App() {
  let [bookmarks, setBookmarks] = React.useState(() => (loadBookmarks() || []))
  let [page, setPage] = React.useState('search')
  let [list, setList] = React.useState([])

  React.useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    console.log(bookmarks)
  }, [bookmarks])

  return (
      <div className='App'>
          <h1>Mes Favoris</h1>
          <p>
              <button onClick={() => setPage('search')}>Search</button>
              <button onClick={() => setPage('bookmark')}>Favoris</button>
          </p>
          <div style={{display: page === 'bookmark' ? 'none' : 'block' }}>
              <Search
                  results={setList}
              />
          </div>
          <h3>Search</h3>
          <ListDisplay
              list={list}
              handleAction={addBookmark}
          />
          <h3>Bookmark</h3>
          <ListDisplay
              list={bookmarks}
              handleAction={removeBookmark}
          />
      </div>
  )



    function removeBookmark(event) {
        setBookmarks([...bookmarks.filter((i) => i.id !== event.target.id)])
    }

    function addBookmark(event) {
        const item = list.find((i) => (i.id === event.target.id))
        setBookmarks([...bookmarks, item])
    }

    function loadBookmarks() {
      return JSON.parse(localStorage.getItem('bookmarks'))
    }
}

export default App;
