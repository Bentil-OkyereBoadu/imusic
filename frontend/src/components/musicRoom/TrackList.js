import { Flex } from '@chakra-ui/react'
import React from 'react'
import Track from './Track'

const TrackList = ({ tracks, isRemoval, addTrack, removeTrack}) => {
   
  return (
    <Flex flexDirection='column' h='100%' w='100%' alignItems='center' overflowY='scroll' overflowX='hidden' >
        {tracks && tracks.map( track => {
                      return <Track  track={track}
                           key={track.id}
                           isRemoval = {isRemoval}
                           addTrack = {addTrack}
                           removeTrack = {removeTrack}
                          />
        })}
    </Flex>
  )
}

export default TrackList