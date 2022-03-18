import { Flex, Input, Popover, PopoverArrow, Button, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger } from '@chakra-ui/react'
import React, { useState } from 'react'
import SearchResults from './SearchResults';
import TrackList from './TrackList';

const SearchBar = () => {

    const [term, setTerm] = useState('');

    const handleTermSearch = (event) => {
        setTerm(event.target.value)
    }
  return (
    <Flex>
        <Input placeholder="Enter A Song, Album, or Artist" onChange={handleTermSearch}/>
        {/* initialFocusRef={initialFocusRef} */}
        <Popover
            placement='bottom'
            closeOnBlur={true}
        >
            <PopoverTrigger>
                <Button>Search</Button>
            </PopoverTrigger>
            <PopoverContent color='blue' bg='white' borderColor='blue.800'>
                <SearchResults/>
                <PopoverArrow />
                <PopoverCloseButton />

            </PopoverContent>
        </Popover>
    </Flex>
  )
}

export default SearchBar