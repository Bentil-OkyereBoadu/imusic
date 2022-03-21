import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import Track from './Track'

const TrackList = (props) => {
    const {onAdd, isRemoval, onRemove} = props;

    const [track, setTrack] = useState([])
    
  return (
    <Flex flexDirection='column' h='max-content' w='100%' alignItems='center' overflowY='scroll' overflowX='hidden'>
        {track.map( track => {
            return <Track track={track}
                            key={track.id}
                            onAdd = {onAdd}
                            isRemoval = {isRemoval}
                            onRemove = {onRemove} />
        })}
    </Flex>
  )
}

export default TrackList