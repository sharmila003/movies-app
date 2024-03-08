import React, { useState, useContext, useEffect } from "react";
import data from "./data.json";
import  Searchbar from "../components/Searchbar";
import axios from "axios";
import { BookmarkContext } from "../App";
import { useMediaQuery } from "react-responsive";

function Bookmarks() {
  const { loggedIn, bookmarkedResult, setBookmarkedResult } = useContext(BookmarkContext);
 
  const [authToken, setAuthToken] = useState("");
  var bookmarkedMovies = data.filter(movie => {
      return bookmarkedResult && bookmarkedResult.some(bookmark => movie.title.includes(bookmark))
  });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
  const isTablet = useMediaQuery({ query: '(max-width: 899px)' })
  const isDesktop = useMediaQuery({ query: '(min-width: 900px)' })
  const [searchResult, setSearchResult] = useState("")
  const [searchLength, setSearchLength] = useState("")
  const [searchWord, setSearchWord] = useState("")
  
  useEffect(() => {
    // Check if token exists in local storage on component mount
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  // Function to handle token retrieval (e.g., after login)
  const handleAuthToken = (token) => {
    setAuthToken(token);
    localStorage.setItem("authToken", token); // Store token in local storage
  };
  
  
  
  handleAuthToken("exampleToken");

  useEffect(() => {
    // Update axios defaults with authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  }, [authToken]);

  useEffect(() => {
      axios.get('/bookmarks')
          .then(response => {
              setBookmarkedResult(response.data);
          })
          .catch(err => console.log(err))
  }, [bookmarkedResult, setBookmarkedResult]);

  const toggleBookmark = async (movie) => {
      await axios.patch('/bookmarks', {
          bookmarked: movie,
      }, {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          }
      })

  };

  function handleSearch(e) {

      if (!e.target.value || e.target.value.length <= 0) {
          setSearchResult("")
          setSearchLength(0)
          setSearchWord(e.target.value)

      }

      else {
          const result = bookmarkedMovies.filter(
              (rec) => rec.title.toLowerCase().includes(e.target.value.toLowerCase())
          );
          setSearchResult(result)
          setSearchLength(result.length)
          setSearchWord(e.target.value)

      }
  }


  const movieElements = bookmarkedMovies.map(t => (
      t.category === "Movie" &&
      <div key={t.title}>
          <div style={{ backgroundImage: `url(${isDesktop && t.thumbnail.regular && t.thumbnail.regular.large})`, }} className="recom-container">
              <div style={{ backgroundImage: `url(${isTablet && t.thumbnail.regular && t.thumbnail.regular.large})`, }} className="recom-container">
                  <div style={{ backgroundImage: `url(${isMobile && t.thumbnail.regular && t.thumbnail.regular.small})`, }} className="recom-container" >
                      <div onClick={() => toggleBookmark(t.title)} className="bookmark-container-2">
                          <img className="bookmark" alt="Bookmark" src={bookmarkedResult && bookmarkedResult.includes(t.title) ? "assets/icon-bookmark-full.svg" : "assets/icon-bookmark-empty.svg"} />
                      </div>
                      <div className="play-container play-reduced">
                          <img className="play" alt="Book" src="assets/icon-play.svg" /><b>Play</b>
                      </div>
                  </div>
              </div>
          </div>
          <div className="text-container wrapper-2">
              <p className="text-wrapper">{t && t.year}</p>
              <span>
                  <div className="oval-copy" />
                  <img className="movie-type" src={t.category === "Movie" ? "assets/icon-category-movie.svg" : "assets/icon-category-tv.svg"} alt="img" />
                  <p className="text-wrapper">{t && t.category}</p>
              </span>
              <span className="div-2">
                  <div className="oval-copy" />
                  <p className="text-wrapper">{t && t.rating}</p>
              </span>
          </div>
          <h4 className="text">{t && t.title}</h4>
      </div>
  ));

  const seriesElements = bookmarkedMovies.map(t => (
      t.category === "TV Series" &&
      <div key={t.title}>
          <div style={{ backgroundImage: `url(${isDesktop && t.thumbnail.regular && t.thumbnail.regular.large})`, }} className="recom-container">
              <div style={{ backgroundImage: `url(${isTablet && t.thumbnail.regular && t.thumbnail.regular.large})`, }} className="recom-container">
                  <div style={{ backgroundImage: `url(${isMobile && t.thumbnail.regular && t.thumbnail.regular.small})`, }} className="recom-container" >
                      <div onClick={() => toggleBookmark(t.title)} className="bookmark-container-2">
                          <img className="bookmark" alt="Bookmark" src={bookmarkedResult && bookmarkedResult.includes(t.title) ? "assets/icon-bookmark-full.svg" : "assets/icon-bookmark-empty.svg"} />
                      </div>
                      <div className="play-container play-reduced">
                          <img className="play" alt="Book" src="assets/icon-play.svg" /><b>Play</b>
                      </div>

                  </div>
              </div>
          </div>
          <div className="text-container wrapper-2">
              <p className="text-wrapper">{t && t.year}</p>
              <span>
                  <div className="oval-copy" />
                  <img className="movie-type" src={t.category === "Movie" ? "assets/icon-category-movie.svg" : "assets/icon-category-tv.svg"} alt="img" />
                  <p className="text-wrapper">{t && t.category}</p>
              </span>
              <span className="div-2">
                  <div className="oval-copy" />
                  <p className="text-wrapper">{t && t.rating}</p>
              </span>
          </div>
          <h4 className="text">{t && t.title}</h4>
      </div>
  ));

  const searchElement = searchResult && searchResult.map(t => (
      <div key={t.title}>
          <div style={{ backgroundImage: `url(${isDesktop && t.thumbnail.regular && t.thumbnail.regular.large})`, }} className="recom-container">
              <div style={{ backgroundImage: `url(${isMobile && t.thumbnail.regular && t.thumbnail.regular.small})`, }} className="recom-container" >
                  <div onClick={() => toggleBookmark(t.title)} className="bookmark-container-2">
                      <img className="bookmark" alt="Bookmark" src={bookmarkedResult && bookmarkedResult.includes(t.title) ? "assets/icon-bookmark-full.svg" : "assets/icon-bookmark-empty.svg"} />
                  </div>
                  <div className="play-container play-reduced">
                      <img className="play" alt="Bookmark" src="assets/icon-play.svg" /><b>Play</b>
                  </div>

              </div>
          </div>
          <div className="text-container wrapper-2">
              <p className="text-wrapper">{t && t.year}</p>
              <span>
                  <div className="oval-copy" />
                  <img className="movie-type" src={t.category === "Movie" ? "assets/icon-category-movie.svg" : "assets/icon-category-tv.svg"} alt="img" />
                  <p className="text-wrapper">{t && t.category}</p>
              </span>
              <span className="div-2">
                  <div className="oval-copy" />
                  <p className="text-wrapper">{t && t.rating}</p>
              </span>
          </div>
          <h4 className="text">{t && t.title}</h4>
      </div>
  ));


  return (
    loggedIn && loggedIn === true &&
        <section data-testid="bookmark-element">
            <Searchbar
                onInput={handleSearch}
            />

            {searchLength < 1 &&
                <article>
                    <h3>Bookmarked Movies</h3>

                    <div className="div-3">
                        {movieElements}
                    </div>
                </article>
            }

            {searchLength < 1 &&
                <article>
                    <h3>Bookmarked TV Series</h3>

                    <div className="div-3">
                        {seriesElements}
                    </div>
                </article>
            }

            {searchLength > 1 &&
                <article>
                    <h3 data-testid="search">Found {searchLength} {searchLength > 1 ? 'Results' : 'Result'} For '{searchWord}'</h3> :

                    <div className="div-3">
                        {searchElement}
                    </div>
                </article>
            }
        </section>
  )
}

export  default  Bookmarks;