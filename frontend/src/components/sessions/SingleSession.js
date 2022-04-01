import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import {FaPlay} from 'react-icons/fa'

const SingleSession = () => {

    const renderAction = () => {
        return <Button rightIcon={<FaPlay/>} colorScheme="orange">Join</Button>
    }

  return (
    <Box w="100%" margin="0.3em 0em">
      <Flex
        flexDirection="row"
        bg="white"
        justifyContent="space-around"
        p="1em"
        borderRadius="0.7em"
        w="100%"
        border="2px solid orange"
        alignItems="center"
      >
        <Flex flexDirection="column" color="orange">
          <Heading>Session name</Heading>
          <Text color="black">Creator</Text>
          <Text color="black">Time created:</Text>
        </Flex>

        <Flex>
          {renderAction()}
        </Flex>
      </Flex>
    </Box>
  )
}

export default SingleSession