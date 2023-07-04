import React from 'react'
import { Outlet } from 'react-router-dom'
import GuessSong from './GuessSong'
import Header from './Header'
import useGlobal from '../hooks/useGlobal'
import SongPage from "./SongPage"


const Layout = () => {
  const { hasPlayedToday } = useGlobal(false);

  return (
    <main className='App'>
      <Header />
      {hasPlayedToday
        ? <SongPage />
        : <GuessSong />}
      <Outlet />
     
     

    </main>
  )
}

export default Layout