import {
  Input,
  Popover,
  Box,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SearchResults from "./SearchResults";
import axios from "axios";
import { MdSearch } from "react-icons/md";
import { SessionState } from "../../context/SessionProvider";

const SearchBar = ({ addTrack, removeTrack }) => {
  const [term, setTerm] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const { token } = SessionState();
  const handleTermSearch = (event) => {
    setTerm(event.target.value);
  };

  const handleSearchTerm = async () => {
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/search?type=track&q=${term}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchItems(data.tracks.items);
    } catch (error) {
      console.log("something happened here");
      console.log(error.message);
    }
  };

  return (
    <Box marginTop="1em" w="70%">
      {/* initialFocusRef={initialFocusRef} */}
      <InputGroup>
        <Popover placement="bottom" closeOnBlur={true}>
          <InputRightElement
            children={
              <PopoverTrigger>
                <Box m="10px 20px 0px" color="white">
                  <MdSearch
                    w="100%"
                    h="100%"
                    onClick={handleSearchTerm}
                  ></MdSearch>
                </Box>
              </PopoverTrigger>
            }
            cursor="pointer"
          />
          <Input
            color="white"
            mb="0.8em"
            ml="1em"
            placeholder="Search for a Song, Album, or Artist"
            onChange={handleTermSearch}
          />

          <PopoverContent
            color="orange"
            bg="white"
            borderColor="orange"
            h="60vh"
            w="35vw"
          >
            <SearchResults
              tracks={searchItems}
              addTrack={addTrack}
              removeTrack={removeTrack}
            />

            <PopoverCloseButton />
          </PopoverContent>
        </Popover>
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
