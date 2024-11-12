import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const AccountDetails = ({ user }) => {
  return (
    <Box p={8} borderRadius="md" boxShadow="lg" bg="rgba(255, 255, 255, 0.2)" backdropFilter="blur(10px)">
      <Heading mb={4} color="white" size="lg">Detalii Cont</Heading>
      <VStack spacing={3} align="start">
        <Text color="gray.300"><strong>Nume:</strong> {user.name}</Text>
        <Text color="gray.300"><strong>Email:</strong> {user.email}</Text>
        <Text color="gray.300"><strong>Data înregistrării:</strong> "NA" </Text>
      </VStack>
    </Box>
  );
};

export default AccountDetails;
