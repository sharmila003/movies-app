import   HomeIcon  from "../icons/homeicon.png";
import   React, { useState } from "react";
import   { Outlet, Link } from "react-router-dom";
import   moviesIcon  from  "../icons/moviesicon.png";
import   SeriesIcon  from "../icons/tvicon.png";
import   BookmarkIcon  from  "../icons/bookmark full icon.png";
import  Topicon   from  "../icons/topicon.jpeg";

const Navbar = () => {
  const [homeIcon, setHomeIcon] = useState(true);
  const [movieIcon, setMovieIcon] = useState(false);
  const [seriesIcon, setSeriesIcon] = useState(false);
  const [bookmarkIcon, setBookmarkIcon] = useState(false);

  return (
    <header className="header-container">
      <Link to="/">
        <div onClick={() => { setHomeIcon(true); setMovieIcon(false); setSeriesIcon(false); setBookmarkIcon(false); }}>
          <img className="movie" alt="Movie" src={Topicon} style={{ width: '20px', height: '20px' }}  />
        </div>
      </Link>
      <nav className="group">
        <Link to="/">
          <img
            data-testid="hom"
            onClick={() => { setHomeIcon(true); setMovieIcon(false); setSeriesIcon(false); setBookmarkIcon(false); }}
            className={HomeIcon}  
            src={require("../icons/homeicon.png")}  // Use require for local images
            alt="trending"
            style={{ width: '20px', height: '20px' }} 
          />
        </Link>
        <Link to="/movies">
          <img
            data-testid="movies"
            onClick={() => { setMovieIcon(true); setSeriesIcon(false); setBookmarkIcon(false); setHomeIcon(false); }}
            className={moviesIcon} 
            src={require("../icons/moviesicon.png")}
            alt= "movies"
            style={{ width: '25px', height: '25px' }}
          />
        </Link>
        <Link to="/series">
          <img
            data-testid="series"
            onClick={() => { setSeriesIcon(true); setBookmarkIcon(false); setHomeIcon(false); setMovieIcon(false); }}
            className={SeriesIcon}  
            src={require("../icons/tvicon.png")}
            alt="series"
            style={{ width: '25px', height: '25px' }}
          />
        </Link>
        <Link to="/bookmarked">
          <img
            data-testid="bookmarked"
            onClick={() => { setBookmarkIcon(true); setHomeIcon(false); setMovieIcon(false); setSeriesIcon(false); }}
            className={BookmarkIcon}  
            src={require("../icons/bookmark full icon.png")}
            alt="bookmarks"
            style={{ width: '25px', height: '25px' }}
          />
        </Link>
      </nav>
      <Outlet />
      <Link to="/login">
        <div data-testid="container" onClick={() => { setBookmarkIcon(false); setHomeIcon(false); setMovieIcon(false); setSeriesIcon(false); }} className={` ${!homeIcon && !movieIcon && !bookmarkIcon && !seriesIcon ? "active" : "avatar-container"}`}>
          <img className="oval" alt="Oval" src="assets/image-avatar.png"  style={{ width: '30px', height: '30px' }} />
        </div>
      </Link>
    </header>
  );
};

export  default  Navbar;

