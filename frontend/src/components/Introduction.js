import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Introduction = () => {
  return (
      <MotionBox
        p={8}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        bg="rgba(0, 0, 0, 0.5)" 
        borderRadius="lg"
        boxShadow="lg"
        maxW="80%"
        mx="auto"
        mt={24}
        position="relative"
        textAlign="center"
      >
        <Heading
          size="lg"
          mb={4}
          color="white"
          as={motion.div}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
         Bine ați venit pe platforma de optimizare a hiperparametrilor pentru LLM
        </Heading>
        <Text
          fontSize="lg"
          color="gray.300"
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Această platformă permite utilizatorilor să ajusteze modele mari de limbaj (LLM) prin configurarea hiperparametrilor esențiali precum rata de învățare, mărimea lotului, numărul de epoci, funcțiile de pierdere și optimizatorii.
        </Text>
        <Text
          mt={4}
          fontSize="md"
          color="gray.400"
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Scopul nostru este să simplificăm procesul de optimizare a modelelor, oferind o interfață ușor de utilizat pentru a experimenta diferite configurații și a obține cele mai bune rezultate pentru proiectele dumneavoastră de inteligență artificială. Cu această platformă, puteți rula mai multe încercări, ajusta parametrii și explora configurările optime pentru modelele dumneavoastră de învățare automată, fără a necesita cunoștințe avansate de infrastructură.
        </Text>
        <Text
          mt={4}
          fontSize="md"
          color="gray.400"
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Fie că sunteți un pasionat de învățare automată sau un profesionist, platforma noastră este concepută pentru a vă ajuta să obțineți maximum din modelele dumneavoastră cu ușurință.
        </Text>
      </MotionBox>
  );
};

export default Introduction;
