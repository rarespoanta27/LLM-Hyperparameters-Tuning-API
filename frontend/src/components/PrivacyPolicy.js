import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const PrivacyPolicy = () => {
  return (
    <Box p={8} borderRadius="md" boxShadow="lg" bg="rgba(255, 255, 255, 0.2)" backdropFilter="blur(10px)">
      <Heading mb={4} color="white" size="lg">Politica de Confidențialitate</Heading>
      <Text color="gray.300" mb={2}>
        Aplicația noastră colectează și gestionează datele utilizatorilor în conformitate cu cele mai bune practici pentru a asigura protecția acestora.
      </Text>
      <Text color="gray.300" mb={2}>
        <strong>Colectarea datelor:</strong> Colectăm informații personale, cum ar fi numele și adresa de email, pentru a oferi o experiență mai bună utilizatorilor.
      </Text>
      <Text color="gray.300" mb={2}>
        <strong>Utilizarea datelor:</strong> Datele colectate sunt folosite doar pentru a îmbunătăți serviciile oferite și nu sunt partajate cu terți fără acordul utilizatorului.
      </Text>
      <Text color="gray.300">
        Pentru mai multe informații, contactați-ne la .......
      </Text>
    </Box>
  );
};

export default PrivacyPolicy;
