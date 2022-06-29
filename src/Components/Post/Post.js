import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import './Post.css'
import SideNav from '../../Common/SideNav';
import axios from 'axios';
import LoaderCustom from '../LoaderCustom/LoaderCustom';
import { useParams } from 'react-router-dom';


const Post = (props) => {
  const [singleData, setsingleData] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const param = useParams();
  const blogTitle = param.blog;

  const singleBlog = async () => {
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${blogTitle}&prop=text&origin=*&formatversion=2`
    await axios.get(url)
      .then((response) => {
        setsingleData(response.data)
        setisLoading(false)
      })
      .catch((error) => {
        console.log('error')
      })
  }

  useEffect(() => {
    singleBlog();
    window.scrollTo(0, 0)

  }, [])

  return (
    <>
      {isLoading ? <LoaderCustom /> : null}
      <div className="container marketing">
        <SideNav title={singleData?.parse?.title} titleforapi={blogTitle} />
        <div className='row single-top'>
          <h2>{singleData?.parse?.title}</h2>
        </div>
        <hr className="featurette-divider top-one" />
        <div className='row'>

          {
            singleData && Object.values(singleData)?.map(function (data, i) {
              return (
                <div className='' key={i}>
                  {parse(data?.text?.replace(new RegExp('/wiki/', "g"), ""))}
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Post
