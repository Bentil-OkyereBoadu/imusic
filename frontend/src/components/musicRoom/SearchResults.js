import { Text } from '@chakra-ui/react'
import React from 'react'
import TrackList from './TrackList'

const SearchResults = ({results}) => {
  return (
    <div>
        <Text>Results</Text>
        <TrackList tracks={results}/>
    </div>
  )
}

export default SearchResults