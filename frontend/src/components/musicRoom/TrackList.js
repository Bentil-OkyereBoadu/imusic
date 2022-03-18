import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Track from './Track'

const TrackList = (props) => {
    const {onAdd, isRemoval, onRemove} = props;
    const tracks = ['manifest','bfafoi', 'eifboi', 'fnhaep4f', 'shir', 'feik', 'rnirns', 'rnrie','','']
  return (
    <Flex flexDirection='column' h='max-content' w='100%' alignItems='center' overflowY='scroll' overflowX='hidden' position='relative'>
        {tracks.map( track => {
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