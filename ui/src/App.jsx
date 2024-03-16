import  React , {createContext,useState} from  "react";
import  {BrowserRouter,Routes,Route }  from  "react-router-dom";
import  Home  from "./pages/Trending";
import  Signup  from  "./pages/Signup";
import  Login   from  "./pages/Login";
import  Tvseries   from  "./pages/Tvseries";
import  Movies   from  "./pages/Movies";
import  Bookmarks   from  "./pages/Bookmarks";
import  Navbar   from  "./components/Navbar";
import  axios from "axios";
import  MovieDetails  from "./pages/Moviedetails";
import  SeriesDetails from "./pages/Tvseriesdetails";

export const BookmarkContext = createContext()
axios.defaults.baseURL = 'http://127.0.0.1:3001/';


function App() {
  
  const [loggedIn, setLoggedIn] = useState(false)
  const [token, setToken] = useState("")
  const [bookmarkedResult, setBookmarkedResult] = useState("")
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
  
  return (
   <BookmarkContext.Provider value={{ loggedIn, setLoggedIn, token, setToken, bookmarkedResult, setBookmarkedResult }} >  
      < BrowserRouter>
       <Navbar />
           <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/movies" element={<Movies />}></Route>
            <Route exact path="/series" element={<Tvseries />}></Route>
            <Route exact path="/bookmarked" element={<Bookmarks />}></Route>
            <Route path="/movies/:title" element={<MovieDetails />}></Route>
            <Route path="/series/:title" element={<SeriesDetails />}></Route>
           </Routes>
        </BrowserRouter>
    </BookmarkContext.Provider>  
 );
}

export default App;


