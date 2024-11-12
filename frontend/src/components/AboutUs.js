import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const AboutUs = () => {
  return (
    <Box
      p={8}
      bg="rgba(0, 0, 0, 0.5)"
      borderRadius="lg"
      boxShadow="lg"
      maxW="80%"
      mx="auto"
      mt={24}
      textAlign="center"
    >
      <Heading
        size="lg"
        mb={4}
        color="white"
        fontFamily="Poppins, sans-serif"
        fontWeight="bold"
      >
        Despre Noi
      </Heading>
      <Text
        fontSize="lg"
        color="gray.300"
        fontFamily="Poppins, sans-serif"
        lineHeight="1.8"
        mb={4}
      >
        Salut! Numele meu este Rares Poanta și sunt creatorul acestei aplicații.
      </Text>
      <Text
        fontSize="lg"
        color="gray.300"
        fontFamily="Poppins, sans-serif"
        lineHeight="1.8"
        mb={4}
      >
        Această platformă a fost creată pentru a facilita optimizarea modelelor mari de limbaj (LLM) și ajustarea hiperparametrilor pentru a obține performanța optimă, fie că sunteți un cercetător, un student, sau un entuziast AI.
      </Text>
      <Text
        fontSize="lg"
        color="gray.300"
        fontFamily="Poppins, sans-serif"
        lineHeight="1.8"
        mb={4}
      >
        Scopul este de a simplifica procesul de optimizare a modelelor, oferind o interfață ușor de utilizat și accesibilă, care permite experimentarea cu diferite configurări și ajustări ale modelelor pre-antrenate.
      </Text>
      <Text
        fontSize="lg"
        color="gray.300"
        fontFamily="Poppins, sans-serif"
        lineHeight="1.8"
      >
        Sper ca această platformă să fie un instrument util pentru proiectele dumneavoastră și să vă ajute să obțineți cele mai bune rezultate posibile din modelele de învățare automată.
      </Text>

    </Box>
  );
};

export default AboutUs;
