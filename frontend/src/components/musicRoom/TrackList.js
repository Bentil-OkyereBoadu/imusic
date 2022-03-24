import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import Track from './Track'

const TrackList = ({onAdd, isRemoval, tracks}) => {
  // 
  return (
    <Flex flexDirection='column' h='80%' w='100%' alignItems='center' overflowY='scroll' overflowX='hidden' >
        {tracks.map( track => {
            return <Track track={track}
                            key={track.id}
                            onAdd = {onAdd}
                            isRemoval = {isRemoval}
                             />
        })}
    </Flex>
  )
}

export default TrackList