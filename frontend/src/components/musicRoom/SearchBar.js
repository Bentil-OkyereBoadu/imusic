import { Flex, Input, Popover, PopoverArrow, Button, PopoverCloseButton, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import React, { useState } from 'react'
import SearchResults from './SearchResults';
import axios from 'axios';

const SearchBar = (props) => {
    const {token} = props;

    const [term, setTerm] = useState('');
    const [searchItems, setSearchItems] = useState([])

    const handleTermSearch = (event) => {
        setTerm(event.target.value)
    }

    const handleSearchTerm = () => {
        axios.get(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then( response =>{
            setSearchItems(response.data.tracks.items)
        }).catch( error => {
            console.log(error)
        })
    }

    const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleSearchTerm();
		}
	}

    console.log(searchItems);
    
  return (
    <Flex marginTop='1em' justifyContent='space-around' w='80%'>
        <Input color='black' bg='' w='70%' placeholder="Search for a Song, Album, or Artist" onChange={handleTermSearch} onKeyDown={handleKeyPress}/>
        {/* initialFocusRef={initialFocusRef} */}
        <Popover
            placement='bottom'
            closeOnBlur={true}
        >
            <PopoverTrigger>
                <Button onClick={handleSearchTerm}>Search</Button>
            </PopoverTrigger>
            <PopoverContent color='blue' bg='white' borderColor='blue.800' h="20%" overflowY='scroll' overflowX='hidden'>
                <SearchResults tracks={searchItems} />
                <PopoverArrow />
                <PopoverCloseButton />

            </PopoverContent>
        </Popover>
    </Flex>
  )
}

export default SearchBar