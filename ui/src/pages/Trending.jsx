import React, { useState, useContext, useEffect } from "react";
import data from "./data.json";
import  Searchbar from "../components/Searchbar";
import { BookmarkContext } from "../App";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useNavigate } from "react-router-dom";  
  
function Trending() {
  const results = data.filter(trend => trend.isTrending === true)
  const recommended = data.filter(trend => trend.isTrending !== true)
  const [searchResult, setSearchResult] = useState("")
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
  const isTablet = useMediaQuery({ query: '(max-width: 899px)' })
  const isDesktop = useMediaQuery({ query: '(min-width: 900px)' })
  const isBoth = useMediaQuery({ query: '(min-width: 768px)' })
  const [searchLength, setSearchLength] = useState("")
  const [searchWord, setSearchWord] = useState("")
  const navigate = useNavigate();


  const { loggedIn, token, bookmarkedResult, setBookmarkedResult } = useContext(BookmarkContext)

  const toggleBookmark = async (movie) => {
      if (loggedIn === false) {
          navigate('/login')

      } else {
          token &&
              await axios.patch('/bookmarks', {
                  bookmarked: movie,
              }, {
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                  }
              })

      }
  };
  useEffect(() => {

      axios.get('/bookmarked')
          .then(response => {
              setBookmarkedResult(response.data);
          })
          .catch(err => console.log(err))
  }, [bookmarkedResult, setBookmarkedResult]);



  function handleSearch(e) {

      if (!e.target.value || e.target.value.length <= 0) {
          setSearchResult("")
          setSearchLength(0)
          setSearchWord(e.target.value)
      }

      else {
          const result = data.filter(
              (rec) => rec.title.toLowerCase().includes(e.target.value.toLowerCase())
          );
          setSearchResult(result)
          setSearchLength(result.length)
          setSearchWord(e.target.value)
      }
  }

  const trendElements = results.map(t => (
      <div style={{ backgroundImage: `url(${isBoth && t.thumbnail.trending && t.thumbnail.trending.large})`, }} className="trending-container" key={t.title}>
          <div style={{ backgroundImage: `url(${isMobile && t.thumbnail.trending && t.thumbnail.trending.small})`, }} className="trending-container" key={t.title}>
              <div onClick={() => toggleBookmark(t.title)} className="bookmark-container">
                  <img className="bookmark" alt="Bookmark" src={bookmarkedResult && bookmarkedResult.includes(t.title) ? "assets/icon-bookmark-full.svg" : "assets/icon-bookmark-empty.svg"} />
              </div>
              <div className="play-container hit-play">
                  <img className="play" alt="Bookmark" src="assets/icon-play.svg" /><b>Play</b>
              </div>

              <div className="wrapper">
                  <div className="text-container">
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
                  <h4 className="text-wrapper ">{t && t.title}</h4>
              </div>
          </div>
      </div>
  ));



  const recomElements = recommended.map(t => (
      <div key={t.title}>

          <div style={{ backgroundImage: `url(${isDesktop && t.thumbnail.regular && t.thumbnail.regular.large})`, }} className="recom-container">
              <div style={{ backgroundImage: `url(${isTablet && t.thumbnail.regular && t.thumbnail.regular.medium})`, }} className="recom-container">
                  <div style={{ backgroundImage: `url(${isMobile && t.thumbnail.regular && t.thumbnail.regular.small})`, }} className="recom-container" >
                      <div onClick={() => toggleBookmark(t.title)} className="bookmark-container-2">
                          <img className="bookmark" alt="Bookmark" src={bookmarkedResult && bookmarkedResult.includes(t.title) ? "../icons/bookmark full icon.png" : "../icons/bookmark icon empty.png"} />
                      </div>
                      <div className="play-container play-reduced">
                          <img className="play" alt="Bookmark" src="assets/icon-play.svg" /><b>Play</b>
                      </div>

                  </div>
              </div>
          </div>

          <div className="text-container wrapper-2">
              <p className="text-wrapper">{t && t.year}</p>
              <span>
                  <div className="oval-copy" />
                  <img className="movie-type" src={t.category === "Movie" ? "../icons/moviesicon.png" : "../icons/tvicon.png"} alt="img" />
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

  const searchComponent = searchResult && searchResult.map(t => (
      <div key={t.title}>

          <div style={{ backgroundImage: `url(${isDesktop && t.thumbnail.regular && t.thumbnail.regular.large})`, }} className="recom-container">
              <div style={{ backgroundImage: `url(${isTablet && t.thumbnail.regular && t.thumbnail.regular.medium})`, }} className="recom-container">
                  <div style={{ backgroundImage: `url(${isMobile && t.thumbnail.regular && t.thumbnail.regular.small})`, }} className="recom-container" >
                      <div onClick={() => toggleBookmark(t.title)} className="bookmark-container-2">
                          <img className="bookmark" alt="Bookmark" src={bookmarkedResult && bookmarkedResult.includes(t.title) ? "assets/icon-bookmark-full.svg" : "assets/icon-bookmark-empty.svg"} />
                      </div>
                      <div className="play-container play-reduced">
                          <img className="play" alt="Bookmark" src="assets/icon-play.svg" /><b>Play</b>
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

  return (
      <section>
            <Searchbar
                onInput={handleSearch}
            />
            {searchLength < 1 &&
                <article>
                    <h3>Trending </h3>

                    <div className="div">
                        {trendElements}
                    </div>
                </article>
            }
            {searchLength < 1 &&
                <article>
                    <h3>Recommended for you</h3>

                    <div className="div-3">
                        {recomElements}
                    </div>
                </article>
            }
            {searchResult &&
                <article>
                    <h3>Found {searchLength} {searchLength > 1 ? 'Results' : 'Result'} For '{searchWord}'</h3> :

                    <div className="div-3">
                        {searchComponent}
                    </div>
                </article>
            }

        </section>
    )
  }
 export  default  Trending; 

