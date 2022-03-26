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
    

  return (
    <SessionContext.Provider value={{session, setSession}}>
        {children}
    </SessionContext.Provider>
  )
}

export const SessionState = () => {
    return useContext(SessionContext)
}

export default SessionProvider;