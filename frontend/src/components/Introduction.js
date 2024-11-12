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
         Welcome to the Hyperparameter Optimization Platform for LLM
        </Heading>
        <Text
          fontSize="lg"
          color="gray.300"
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          This platform allows users to fine-tune large language models (LLMs) by configuring essential hyperparameters such as learning rate, batch size, number of epochs, loss functions, and optimizers.
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
          Our goal is to simplify the process of model optimization, providing an easy-to-use interface for experimenting with different configurations and achieving the best results for your AI projects. With this platform, you can run multiple trials, adjust parameters, and explore optimal configurations for your machine learning models without requiring advanced infrastructure knowledge.
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
          Whether you're a machine learning enthusiast or a professional, our platform is designed to help you get the most out of your models with ease.
        </Text>
      </MotionBox>
  );
};

export default Introduction;
