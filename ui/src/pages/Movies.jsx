
import React, { useState, useContext, useEffect } from "react";
import data from "./data.json";
import  Searchbar  from "../components/Searchbar";
import axios from "axios";
import { BookmarkContext } from "../App";
import { useMediaQuery } from "react-responsive";
import { useNavigate,Link } from "react-router-dom";


function Movies() {
  const results = data.filter(trend => trend.category === "Movie");
  const [searchResult, setSearchResult] = useState(results)
  const { loggedIn, token, bookmarkedResult, setBookmarkedResult } = useContext(BookmarkContext);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
  const isTablet = useMediaQuery({ query: '(max-width: 899px)' })
  const isDesktop = useMediaQuery({ query: '(min-width: 900px)' })
  const [searchLength, setSearchLength] = useState("")
  const [searchWord, setSearchWord] = useState("")
  const navigate = useNavigate();

  // Function to toggle the bookmark status of a movie
 const toggleBookmark = async (movie) => {
      if (loggedIn === false) {
          navigate('/login')

      } else {
          token &&
              await axios.patch('http://localhost:3001/bookmarks', {
                  bookmarked: movie,
              }, {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                 
                  }
              })
              const updatedBookmarkedResult = bookmarkedResult.includes(movie)
              ? bookmarkedResult.filter(item => item !== movie)
              : [...bookmarkedResult, movie];
          setBookmarkedResult(updatedBookmarkedResult);
          localStorage.setItem('bookmarkedResult', JSON.stringify(updatedBookmarkedResult));
      }  
   }   
  

  useEffect(() => {
      axios.get('/bookmarks')
          .then(response => {
              setBookmarkedResult(response.data);
   })
          .catch(err => console.log(err))
   }, [bookmarkedResult, setBookmarkedResult]);

   /*useEffect(() => {
    axios.get('http://localhost:3001/bookmarks', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(response => {
        setBookmarkedResult(response.data);
        setSearchResult(response.data); // Update search results with bookmarked data
        setSearchLength(response.data.length);
      })
      .catch(err => console.log(err));
    }, [token, setBookmarkedResult]);*/

  function handleSearch(e) {

      if (!e.target.value || e.target.value.length <= 0) {
          setSearchResult(results)
          setSearchLength(0)
          setSearchWord(e.target.value)

      }

      else {
          const result = results.filter(
              (rec) => rec.title.toLowerCase().match(e.target.value.toLowerCase())
          );
          setSearchResult(result)
          setSearchLength(result.length)
          setSearchWord(e.target.value)

      }
     };

     const movieElements = searchResult.map(t => (
      <div key={t.title}>
          <div style={{ backgroundImage: `url(${isDesktop && t.thumbnail.regular && t.thumbnail.regular.large})`, }} className="recom-container" >
              <div style={{ backgroundImage: `url(${isTablet && t.thumbnail.regular && t.thumbnail.regular.large})`, }} className="recom-container" >
                  <div style={{ backgroundImage: `url(${isMobile && t.thumbnail.regular && t.thumbnail.regular.small})`, }} className="recom-container" >
                      <div onClick={() => toggleBookmark(t.title)} className="bookmark-container-2">
                          <img className="bookmark" alt="Bookmark" src={bookmarkedResult && bookmarkedResult.includes(t.title) ? "assets/icon-bookmark-full.svg":"assets/icon-bookmark-empty.svg"} />
                      </div>
                      <div className="play-container play-reduced">
                          <img className="play" alt="Bookmark" src="assets/icon-play.svg"/><b>Play</b>
                      </div>
                  </div>
              </div>
          </div>

          <div className="text-container wrapper-2">
              <p className="text-wrapper">{t && t.year}</p>
              <span>
                  <div className="oval-copy" />
                  <img className="movie-type" src={t.category === "Movie" ?  "assets/icon-category-movie.svg" : "assets/icon-category-tv.svg"} alt="img" />
                  <p className="text-wrapper">{t && t.category}</p>
              </span>
              <span className="div-2">
                  <div className="oval-copy"/>
                  <p className="text-wrapper">{t && t.rating}</p>
              </span>
          </div>
          <Link to={`/movies/${t.title}`} className="text"> 
          <h4>{t && t.title}</h4>
      </Link>
     </div>
     
    ));
        
   return (
   <section>
    <Searchbar
        onInput={handleSearch}
    />
    {searchWord ?
        <h3>Found {searchLength} {searchLength > 1 ? 'Results' : 'Result'} For '{searchWord}'</h3> :
        <h3>Movies </h3>
    }
    <div className="div-3">
        {movieElements}
    </div>
   </section>
  )
 
}

export  default Movies;


  
