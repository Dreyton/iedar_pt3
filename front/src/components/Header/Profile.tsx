import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {

  return (
    <Flex align={'center'}>
      { showProfileData && (
        <Box mr={"4"} textAlign={"right"}>
          <Text>Tarcio Rocha</Text>
          <Text color={"gray.300"} fontSize={"small"}>tarcio_x@hotmail.com</Text>
        </Box>
      )}

      <Avatar
        background={'gray.300'}
        size={'md'}
        name={'Tarcio Rocha'}
        src={''}
      />
    </Flex>
  )
}