import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Search from '../Components/Search/Search';


const Layout = () => {
 return (
    <>
    <header>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Carousel</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          

        </ul>
        <Search/>
      </div>
    </div>
  </nav>
</header>
    
  <Outlet />

    </>
  )
}

export default Layout
