import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"



const Home = React.lazy(() => import("./pages/Home"))


function App() {
  return (
    <React.Suspense fallback ={<div> <img style={{ position: "absolute", top: "50%", left: "50%", width: "10rem", height:"10rem" }} src={("./..//images/github (1).png")} alt="" /></div>}>
    <BrowserRouter>


      <Routes>
        <Route path="/" element={<Home/>} />
     
     
      </Routes>
    </BrowserRouter>


  </React.Suspense>
  );
}

export default App;
