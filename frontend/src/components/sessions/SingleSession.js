import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import {FaPlay} from 'react-icons/fa'

const SingleSession = ({session}) => {

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
          <Heading fontSize='1.5em'>{session.name}</Heading>
          <Text color="black">Time created: {session.createdAt}</Text>
        </Flex>
        <Text color='black' bgColor='orange.100' p='0.8em' borderRadius='40%'>{session.isPrivate? "Private": "Public"}</Text>
        <Flex>
          {renderAction()}
        </Flex>
      </Flex>
    </Box>
  )
}
 
export default SingleSession