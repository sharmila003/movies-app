import  React , {createContext,useState} from  "react";
import  {BrowserRouter,Routes,Route}  from  "react-router-dom";
import  Home  from "./pages/Trending";
import  Signup  from  "./pages/Signup";
import  Login   from  "./pages/Login";
import  Tvseries   from  "./pages/Tvseries";
import  Movies   from  "./pages/Movies";
import  Bookmarks   from  "./pages/Bookmarks";
import  Navbar   from  "./components/Navbar";
import  axios from "axios";
import  MovieDetails  from "./pages/Moviedetails";

export const BookmarkContext = createContext()
axios.defaults.baseURL = ' https://127.0.0.1:3001/ ';

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false)
  const [token, setToken] = useState("")
  const [bookmarkedResult, setBookmarkedResult] = useState("")
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  
  return (
    <BookmarkContext.Provider value={{ loggedIn, setLoggedIn, token, setToken, bookmarkedResult, setBookmarkedResult }} >  
      < BrowserRouter>
         <Navbar />
           < Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/movies" element={<Movies />}></Route>
            <Route path="/Tvseries" element={<Tvseries />}></Route>
            <Route path="/bookmarks" element={<Bookmarks />}></Route>
            <Route path="/movie/Title" element={<MovieDetails />} />
           </Routes>
        </BrowserRouter>
    </BookmarkContext.Provider>  
 );
}

export default App;


