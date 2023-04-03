import React from "react"
import { Route, Routes } from "react-router-dom"

// pages
import Login from "./pages/Login"
import Home from "./pages/Home"
import TweetDetails from "./pages/TweetDetails"

// components
import LeftAsideNav from "./components/LeftAsideNav"
import InProgress from "./components/InProgress"
import ModalTweet from "./components/ModalTweet"

// contexto

function App() {

  return (
    
    <div className="App">
      <LeftAsideNav />
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/login" element={< Login />} />
        <Route path="/explore" element={< InProgress />} />
        <Route path="/notifications" element={< InProgress />} />
        <Route path="/messages" element={< InProgress />} />
        <Route path="/bookmarks" element={< InProgress />} />
        <Route path="/AntoninoS27" element={< InProgress />} />
        <Route path="/options" element={< InProgress />} />
        <Route path="/:twId" element={< TweetDetails />} />
      </Routes>
    </div>
  )
}

export default App
