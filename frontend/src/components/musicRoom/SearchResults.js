import React from 'react'
import TrackList from './TrackList'

const SearchResults = ({tracks , addTrack, removeTrack}) => {
  return (
    <div style={{height:'100%'}}>
       <TrackList 
        tracks={tracks}
        addTrack={addTrack}
        removeTrack={removeTrack}
        />
    </div>
  )
}

export default SearchResults