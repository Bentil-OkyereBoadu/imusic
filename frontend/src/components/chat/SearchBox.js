import { Button, Text, Tooltip } from '@chakra-ui/react';
import React, { useState } from 'react'

const SearchBox = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();


  return (
    <>
        <Tooltip label="Search Users To Chat" hasArrow placement='bottom-end'>
            <Button variant="ghost">
                <i className="fa fa-search" aria-hidden="true"></i>
                <Text d={{base:"none", md:"flex"}} px='4'>Search User</Text>
            </Button>
        </Tooltip>
    </>
  )
}

export default SearchBox