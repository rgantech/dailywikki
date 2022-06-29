import React, { useState } from 'react'
import './carousel.css'
import './Index.css'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import blog1 from '../../Images/blog1.jpg'
import blog2 from '../../Images/blog2.jpg'
import parse from 'html-react-parser';
import { forHomeurl } from '../../Api/HomeApi'
import axios from 'axios'
import LoaderCustom from '../LoaderCustom/LoaderCustom'

const Home = () => {
    const [popular, setpopular] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const navigate = useNavigate();

    const getPopularArticles = async () => {
       await axios.get(forHomeurl)
       .then((response) => {
         setpopular(response.data)
         setisLoading(false)
       })
       .catch((error) => {
         console.log('error')
       })
    }

    useEffect(() => {
        getPopularArticles();
        
    }, [isLoading])

    console.log(isLoading,'===========')
  return (
    <>
    {isLoading?<LoaderCustom/>:
<main>
<div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={blog1} />
      <div className="container">
        <div className="carousel-caption text-start">
          <h1>Example headline.</h1>
          <p>Some representative placeholder content for the first slide of the carousel.</p>
        </div>
      </div>
    </div>
    <div className="carousel-item">
    <img src={blog2} />
      <div className="container">
        <div className="carousel-caption">
          <h1>Another example headline.</h1>
          <p>Some representative placeholder content for the second slide of the carousel.</p>
         
        </div>
      </div>
    </div>
    
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

<div className="container marketing">
  <div className='row'>

  <div className='left-side-section col-8'>
  <div className='row'>
    <h1>Popular Article Search</h1>
    
    </div>
    <hr className="featurette-divider top-one" />
    

<div className="row">
{
  popular?.mostread?.articles && popular?.mostread?.articles.slice(0,12).map((data,index) => {
  return (
        <div className="col-lg-3" key={index}>
    <div className='post-data'>
    <Link className="" to={`/${data?.title}`}>
   
    {data?.thumbnail?
     <img className="bd-placeholder-img rounded-circle" width="100" height="100" src={data?.thumbnail?.source} />
     :
     <svg className="bd-placeholder-img rounded-circle" width="100" height="100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>

    }
   
    <p><span>Views:</span> {data?.views}</p>
    <p className='titles'>{data?.title?.replace (/_/g, " ")}</p>
    </Link>
  </div>
  </div>
  )
  })
}
</div>
<hr className="featurette-divider top-one" />
<div className="row featurette">
<h1>Today's Featured Article.</h1>

  <div className="col-md-12">

  {

popular && Object.values(popular).map((data,index) => {
 return(
  <div className={`feat feat-${index}`} key={index}>
  <p className="lead">{data?.normalizedtitle}</p>
  <p>{data?.extract}</p>
  <p><Link to={`${data?.title}`}>Read more</Link></p>   
  </div>
   ) 
  })
}
  
  </div>
 
</div>

<hr className="featurette-divider" />


  </div>

  <div className='right-side-section col-3'>
  <div className='row'>
    <h1>In the News</h1>
    <hr className="featurette-divider top-one" />
    {
 popular?.news && popular?.news.map((data,index) => {
   return(
    data.links.map((item,i) => {
     return(
      <div className='latest-news' key={i}>
     <p><Link to={`${item.title}`} className="lead">{parse(item?.displaytitle)}</Link></p>
      </div>
     )
    })
   
   ) 
  })
}
 </div>
 <hr className="featurette-divider top-one" />
 <div className='row'>
    <h1 className='on-this-day'>On This Day</h1>
    
    {
 popular?.onthisday && popular?.onthisday.slice(0,5).map((data,index) => {
   return(
    
      <div className='latest-news' key={index}>
     
     {
       data.pages.slice(0,1).map((items,i) => {
         
         return(
          <p><b>Year {data.year}</b> - {data?.text}
         <Link to={`${items.title}`}>Read more</Link></p>
         )
       })
     }
      </div>
     
   
   ) 
  })
}
 </div>

  </div>

   </div>


</div>

</main>
}
    </>
  )
}

export default Home
