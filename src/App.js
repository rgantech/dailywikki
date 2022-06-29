import Header from './Common/Header';
import Footer from './Common/Footer';
import Home from './Components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Common/Layout';
import Post from './Components/Post/Post';
import { useSelector } from 'react-redux';


function App() {
  //const loading = useSelector((state) => state.popular.isActive)
  return (
    <div className="App">
      

<BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
    
    <Route path='/' element={<Layout/>}>

        <Route index element={<Home loading='true'/>} />
        <Route path='post' element={<Post isActive='true' />}/>
        <Route path=':blog' element={<Post isActive='true'/>} />

    </Route>

    </Routes>
    
    </BrowserRouter>

    <Footer/>
      
    </div>
  );
}

export default App;
