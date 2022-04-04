import React, { createContext, useContext, useState } from 'react'


const SessionContext = createContext()

const SessionProvider = ({children}) => {

    const [token, setToken] = useState('');
    const [data, setData] = useState();
    const [user, setUser] = useState();
    const [playlistTracks, setPlaylistTracks] = useState([])
    const [playlistID, setPlaylistID] = useState('');
    
    const [sessionName, setSessionName] = useState()
    const [ privacy, setPrivacy ] = useState(false)
    const [createdSessionId, setCreatedSessionId] = useState('')

    const [sessionToJoin, setSessionToJoin] = useState();
  

  return (
    <SessionContext.Provider value={{
      createdSessionId,
      setCreatedSessionId,
      sessionToJoin,
      setSessionToJoin, 
      sessionName,
      setSessionName, 
      privacy,
      setPrivacy, 
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