import React from 'react'
import Header from '../components/Header'
import About from '../components/About'
import Places from '../components/Places'
import { useLocation } from 'react-router-dom'

function Home() {
  
  return (
    <div>
      <Header/>
      <About/>
      <Places/>
    </div>
  )
}

export default Home
