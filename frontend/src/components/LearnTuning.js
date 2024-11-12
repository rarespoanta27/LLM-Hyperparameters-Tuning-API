import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const LearnTuning = () => {
  return (
    <MotionBox
      p={8}
      bg="rgba(0, 0, 0, 0.7)"  
      borderRadius="lg"
      boxShadow="xl"
      maxW="80%"
      mx="auto"
      mt={12}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Introducere */}
      <Heading
        size="lg"
        mb={4}
        color="white"
        as={motion.div}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        Învață Despre Optimizarea Hiperparametrilor
      </Heading>
      <Text color="gray.300" mb={6} fontSize="lg">
        Optimizarea hiperparametrilor este un proces esențial pentru îmbunătățirea performanței unui model de învățare automată. Prin ajustarea corectă a acestor parametri, putem maximiza precizia și eficiența modelului, fără a compromite generalizarea. În această secțiune, vei învăța despre fiecare hiperparametru și cum afectează acesta antrenarea modelului.
      </Text>

      {/* learning rate */}
      <Text mt={4} fontWeight="bold" fontSize="xl" color="white">
        Rata de Învățare (Learning Rate):
      </Text>
      <Text color="gray.300">
        Rata de învățare controlează cât de mult se modifică modelul la fiecare pas de optimizare. O rată prea mare poate face modelul instabil, iar una prea mică poate încetini semnificativ învățarea.
      </Text>

      {/* Batch Size */}
      <Text mt={4} fontWeight="bold" fontSize="xl" color="white">
        Batch Size (Mărimea Lotului):
      </Text>
      <Text color="gray.300">
        Mărimea lotului definește câte exemple de antrenament sunt procesate simultan înainte de actualizarea parametrilor modelului. Un lot mic poate duce la instabilitate, în timp ce un lot mare poate face procesul mai stabil, dar mai lent.
      </Text>

      {/* Epochs */}
      <Text mt={4} fontWeight="bold" fontSize="xl" color="white">
        Epoci (Epochs):
      </Text>
      <Text color="gray.300">
        O epocă reprezintă trecerea prin întregul set de date de antrenament. Mai multe epoci permit modelului să învețe mai multe tipare, dar prea multe pot duce la suprainstruire.
      </Text>

      {/* Functia de Pierdere */}
      <Text mt={4} fontWeight="bold" fontSize="xl" color="white">
        Funcția de Pierdere (Loss Function):
      </Text>
      <Text color="gray.300">
        Funcția de pierdere măsoară cât de bine performează modelul în prezicerea valorilor corecte. Obiectivul antrenării este de a minimiza această pierdere.
      </Text>

      {/* Optimizatorul */}
      <Text mt={4} fontWeight="bold" fontSize="xl" color="white">
        Optimizatorul (Optimizer):
      </Text>
      <Text color="gray.300">
        Optimizatorul ajustează parametrii modelului pentru a minimiza funcția de pierdere. Exemple de optimizatori includ AdamW, SGD și RMSProp.
      </Text>

      {/* Input Texts */}
      <Text mt={4} fontWeight="bold" fontSize="xl" color="white">
        Input Texts (Textele de Intrare):
      </Text>
      <Text color="gray.300">
        Textele de intrare sunt datele pe care modelul le folosește pentru a învăța și a genera predicții. Ele reprezintă exemplul oferit modelului pentru antrenament.
      </Text>

      {/* Output Texts */}
      <Text mt={4} fontWeight="bold" fontSize="xl" color="white">
        Output Texts (Textele de Ieșire):
      </Text>
      <Text color="gray.300">
        Textele de ieșire sunt rezultatele dorite pe care modelul ar trebui să le prezică. Acestea sunt utilizate pentru a evalua cât de bine a învățat modelul să genereze răspunsuri corecte.
      </Text>
    </MotionBox>
  );
};

export default LearnTuning;
