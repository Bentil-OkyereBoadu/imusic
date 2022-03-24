import { Text } from '@chakra-ui/react'
import React from 'react'
import TrackList from './TrackList'

const SearchResults = ({tracks}) => {
  return (
    <div>
        <Text>Results</Text>
        <TrackList tracks={tracks}/>
    </div>
  )
}

export default SearchResults