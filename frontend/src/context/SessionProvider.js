import React, { createContext, useContext, useState } from 'react'


const SessionContext = createContext()

const SessionProvider = ({children}) => {

    const [session, setSession] = useState({
        name: '',
        creator: '',
        playlist:'',
        attendees: [],
        id: '',
    });
    const [token, setToken] = useState('');
    const [data, setData] = useState();
    const [user, setUser] = useState();
    const [playlistTracks, setPlaylistTracks] = useState([])
    const [playlistID, setPlaylistID] = useState('');


  return (
    <SessionContext.Provider value={
      {session, 
      setSession, 
      token, 
      setToken, 
      data, 
      setData, 
      user, 
      setUser, 
      playlistTracks, 
      setPlaylistTracks,
      playlistID,
      setPlaylistID}}>
        {children}
    </SessionContext.Provider>
  )
}

export const SessionState = () => {
    return useContext(SessionContext)
}

export default SessionProvider;