import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Lobby from './components/Lobby'
import CodePage from './components/CodePage'
import { io } from 'socket.io-client'
// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';
// const socket = io('http://localhost:3000');
function App() {

  // socket.on('connect', () => {
  //   console.log("connected")
  // })
  return (
    <div className='App'>
      <Routes>
        {/* <Route path={"/lobby"} element={<Lobby/>}/> */}
        {/* <Route path={"/"} element={<Navigate replace to="/lobby"/>}/> */}
        <Route path={"/"} element={<Lobby/>}/>
        <Route path={"/codePage/:roomId"} element={<CodePage/>}/>
        {/* <Route path={"/codePage"} element={<CodePage/>}/> */}
      </Routes>
    </div>
  )
}

export default App
