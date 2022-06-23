import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [state, setstate] = useState('')
  const onchangeHandler = (e) => {
    setstate(e.target.value)
  }
  const getData = () => {
    navigate(state?.split(' ').join('_'));
  }
  useEffect(() => {
    //getData()
  }, [])
  return (
    <>

<form className="d-flex" action='/' method='get'>
          <input className="form-control me-2" type="search" onChange={onchangeHandler} placeholder="Search" name="search" aria-label="Search"/>
          <button className="btn btn-outline-success" value={state} onClick={getData} type="button">Search</button>
          
  </form>
      
    </>
  )
}

export default Search
