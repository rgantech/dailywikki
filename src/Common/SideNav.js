import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const SideNav = (props) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false)
    const sidebardata = useSelector((state) => state.sidebar.sidebar)
    //console.log(sidebardata?.parse,'sidebardata=========')
    const sendData = () => {
        dispatch({type:'FETCH_SIDEBAR_SAGA', payload:props.titleforapi})
    }
    useEffect(() => {
        sendData()
    }, [])
    
useEffect(() => {
  document.body.classList.toggle('modal-open', isOpen);
},[isOpen])

  return (
    <>

<nav className="navbar navbar-light bg-light fixed-top sideNav">
  <div className="container-fluid">
    
    <button onClick={()=> setIsOpen(!isOpen)} className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" data-backdrop="static" data-keyboard="false">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">{props.title}</h5>
        <button onClick={()=> setIsOpen(!isOpen)} type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
      <ul>
       {
           sidebardata?.parse?.sections && sidebardata?.parse?.sections.map((data,index) => {
               console.log(data)
               return(
                   <li className={`toclevel-${data.toclevel}`}><a href={`#${data.anchor}`}><span>{data.number}</span> - <span>{data.line}</span></a></li>
               )
           })
       }
        </ul>
      </div>
    </div>
  </div>
</nav>
      
    </>
  )
}

export default SideNav
