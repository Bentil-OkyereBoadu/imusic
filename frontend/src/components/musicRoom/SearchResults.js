import React from 'react'
import TrackList from './TrackList'

const SearchResults = ({tracks , addTrack, removeTrack}) => {
  return (
    <div>
       <TrackList 
        tracks={tracks}
        addTrack={addTrack}
        removeTrack={removeTrack}
        />
    </div>
  )
}

export default SearchResults