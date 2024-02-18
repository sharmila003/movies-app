import React from 'react'
import tvposter  from  "../icons/tvseriesdetails.png"


function TvseriesDetails() {
  return (
  <div className="container1">
    <div className="poster1">
      <img src={tvposter} alt="tv poster" />
    </div>
    <div className="details1">
        <div className="info1">
          <h3 className="title1">Law & Order: Special  Victims Unit</h3>
          <p className="rating1">4.0</p>
        </div>
    
    <div className="items1">
          <div className="item1">
           <p>Language</p>
           <p>Firstair</p>
           <p>lastair</p>
           <p>Status</p>
          </div>
          <div className="item3">
           <p>English</p>
           <p>1999-09-20</p>
           <p>2023-05-18</p>
           <p>Returning Series</p>
          </div>
       </div>
    <div  classname="genres1">
      <h3>Generes</h3>
      <p className="genre1">Crime</p>    <p className="genre">Drama</p>   <p className="genre">mystery</p> 
    </div>
    <div  classname="synopsis1">
      <h3>Synopsis</h3>
      <p> In the  criminal justice system.Sexually-based  offenses are considered  especially heinous.In new York City ,the dedicated detectives  who investigate these  vicious felonies  are members of an elite squad known as Special victims Unit.These are their stories.</p>
    </div>
   <div className="casts1">
          <h4>Casts</h4>
          <p>Mariska Hargita</p>  
          <p>peter scanvino</p>
          <p>Ice-T</p>
          <p>Octavio Pisano</p>
    </div>
    <div className="genres1">
      <p className="genre1">Website</p>   
    </div>
   </div>
  </div>
  )
}

export  default   TvseriesDetails;