
/*import React from 'react'
import movieposter  from "../icons/moviedetails.png";

export default function Moviedetails() {
  return (
  <div className="container">
    <div className="poster">
      <img src={movieposter} alt="Movie poster"/>
     </div>
     <div className="info-box">
      <h1 className="title">To End All War: Oppenheimer & The Atomic Bomb</h1>
      <p className="rating"> 3.9</p>
     </div>
     <div class="items">
       <div class="item">length</div>
       <div class="item">language</div>
       <div class="item">year</div>
       <div class="item">Status</div>
    </div>
    <div class="items">
       <div class="item">88min</div>
       <div class="item">english</div>
       <div class="item">2023</div>
       <div class="item">N/A</div>
    </div>
    <div  classname="generes">
      <h3>Generes</h3>
      <p className="genre">Documentary</p>
      <p className="genre">History</p>
    </div>
      <h3 className="synopsis">Synopsis</h3>
      <p>Explore how one man's relentless drive and invention of the atomic bomb changed the nature of war forever, led to the deaths of hundreds of thousands of people, and unleashed mass hysteria.</p>
      <div className="casts">
        <h4>Casts:</h4>
        <p>J.Robert Oppenheimer</p>
      </div>
    </div>
 
  
  )
}*/

import React from 'react';
import movieposter from "../icons/moviedetails.png";

export default function Moviedetails() {
  return (
    <div className="container">
      <div className="poster">
        <img src={movieposter} alt="Movie poster"/>
      </div>
      <div className="details">
        <div className="info">
          <h3 className="title">To End All War: Oppenheimer & The Atomic Bomb</h3>
          <p className="rating">3.9</p>
        </div>
      <div className="items">
          <div className="item1">
           <p>Length</p>
           <p>Language</p>
           <p>Year</p>
           <p>Status</p>
          </div>
          <div className="item2">
           <p>88min</p>
           <p>English</p>
           <p>2023</p>
           <p>N/A</p>
          </div>
       </div>
        <div className="genres">
          <h3>Genres</h3>
          <p className="genre">Documentary</p>    <p className="genre"> history</p>
        </div>
        <div className="synopsis">
          <h3>Synopsis</h3>
          <p>Explore how one man's relentless drive and invention of the atomic bomb changed the nature of war forever, led to the deaths of hundreds of thousands of people, and unleashed mass hysteria.</p>
        </div>
        <div className="casts">
          <h4>Casts</h4>
          <p>J.Robert Oppenheimer</p>  <p>Ellen  Braidbury  Reid</p>  <p>Chritopher  nalon</p>  <p>JohnElse</p> <p>Kai  Bird</p>   <p>BillNye</p>
             <p>Richard Rods</p>  <p>mareena  rabinson snowden</p>   <p>Alen.b carr</p>  <p>GreggHarken</p>
        </div>
        <div className="genres">
          <p className="genre">Website</p>    <p className="genre">Imdb</p>
        </div>
      </div>
    </div>
  );
}



