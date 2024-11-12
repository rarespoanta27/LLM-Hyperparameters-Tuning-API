import React, { useState } from 'react';
import { Box, Heading, Text, VStack, Button, Input, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const LearnTuning = () => {
  const toast = useToast();

  // State for quiz answers
  const [learningRateAnswer, setLearningRateAnswer] = useState('');
  const [batchSizeAnswer, setBatchSizeAnswer] = useState('');
  const [epochAnswer, setEpochAnswer] = useState('');
  const [lossFunctionAnswer, setLossFunctionAnswer] = useState('');
  const [optimizerAnswer, setOptimizerAnswer] = useState('');

  const handleQuizSubmit = (answer, correctAnswer, message) => {
    if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      toast({
        title: "Correct!",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Incorrect answer",
        description: "Try again!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
      <Heading size="lg" mb={4} color="white">
        Learn About Hyperparameter Optimization
      </Heading>
      
      {/* Learning Rate */}
      <Text mt={4} fontWeight="bold" fontSize="xl" color="white">
        Learning Rate
      </Text>
      <Text color="gray.300" mb={2}>
        The learning rate controls how quickly or slowly a model adjusts its parameters during training.
        A high learning rate means the model makes large adjustments at each step, which can lead to faster optimization
        but may overshoot the optimal solution. A low learning rate means smaller adjustments, allowing the model to
        converge closer to the optimum but making training slower.
      </Text>

      <VStack align="start" mt={4}>
        <Text color="gray.300">1. What effect does a high learning rate have?</Text>
        <Input
          placeholder="Type your answer..."
          value={learningRateAnswer}
          onChange={(e) => setLearningRateAnswer(e.target.value)}
          mt={2}
          color="white"
        />
        <Button
          onClick={() =>
            handleQuizSubmit(
              learningRateAnswer,
              "The model makes large adjustments",
              "Correct! A high learning rate results in large adjustments at each step."
            )
          }
          colorScheme="green"
          mt={2}
        >
          Check Answer
        </Button>
      </VStack>

      {/* Batch Size */}
      <Text mt={8} fontWeight="bold" fontSize="xl" color="white">
        Batch Size
      </Text>
      <Text color="gray.300" mb={2}>
        Batch size defines the number of training examples processed before updating the model's parameters.
        Smaller batches can make training faster but less stable, while larger batches bring more stability
        and precision but consume more resources and slow down the training process.
      </Text>

      <VStack align="start" mt={4}>
        <Text color="gray.300">2. What is the advantage of a smaller batch size?</Text>
        <Input
          placeholder="Type your answer..."
          value={batchSizeAnswer}
          onChange={(e) => setBatchSizeAnswer(e.target.value)}
          mt={2}
          color="white"
        />
        <Button
          onClick={() =>
            handleQuizSubmit(
              batchSizeAnswer,
              "Faster training",
              "Correct! Smaller batches make training faster but less stable."
            )
          }
          colorScheme="green"
          mt={2}
        >
          Check Answer
        </Button>
      </VStack>

      {/* Epochs */}
      <Text mt={8} fontWeight="bold" fontSize="xl" color="white">
        Epochs
      </Text>
      <Text color="gray.300" mb={2}>
        An epoch represents a complete pass through the entire training dataset. More epochs allow the model
        to learn more patterns, but too many can lead to overfitting, where the model performs well on training data
        but poorly on new data.
      </Text>

      <VStack align="start" mt={4}>
        <Text color="gray.300">3. What does overfitting mean?</Text>
        <Input
          placeholder="Type your answer..."
          value={epochAnswer}
          onChange={(e) => setEpochAnswer(e.target.value)}
          mt={2}
          color="white"
        />
        <Button
          onClick={() =>
            handleQuizSubmit(
              epochAnswer,
              "Poor performance on new data",
              "Correct! Overfitting means poor performance on new data."
            )
          }
          colorScheme="green"
          mt={2}
        >
          Check Answer
        </Button>
      </VStack>

      {/* Loss Function */}
      <Text mt={8} fontWeight="bold" fontSize="xl" color="white">
        Loss Function
      </Text>
      <Text color="gray.300" mb={2}>
        The loss function measures how well the model predicts the desired outputs. The goal of training is to
        minimize this loss. Common loss functions for classification are Cross-Entropy, and for regression, Mean Squared Error (MSE).
      </Text>

      <VStack align="start" mt={4}>
        <Text color="gray.300">4. What is the goal of the loss function?</Text>
        <Input
          placeholder="Type your answer..."
          value={lossFunctionAnswer}
          onChange={(e) => setLossFunctionAnswer(e.target.value)}
          mt={2}
          color="white"
        />
        <Button
          onClick={() =>
            handleQuizSubmit(
              lossFunctionAnswer,
              "Minimize loss",
              "Correct! The goal is to minimize the loss function."
            )
          }
          colorScheme="green"
          mt={2}
        >
          Check Answer
        </Button>
      </VStack>

      {/* Optimizer */}
      <Text mt={8} fontWeight="bold" fontSize="xl" color="white">
        Optimizer
      </Text>
      <Text color="gray.300" mb={2}>
        The optimizer adjusts the model's parameters to minimize the loss function. Common optimizers include
        Adam, RMSProp, and SGD, each with a unique approach to optimization that can impact convergence.
      </Text>

      <VStack align="start" mt={4}>
        <Text color="gray.300">5. What is the role of an optimizer?</Text>
        <Input
          placeholder="Type your answer..."
          value={optimizerAnswer}
          onChange={(e) => setOptimizerAnswer(e.target.value)}
          mt={2}
          color="white"
        />
        <Button
          onClick={() =>
            handleQuizSubmit(
              optimizerAnswer,
              "Minimize the loss function",
              "Correct! The optimizer adjusts parameters to minimize loss."
            )
          }
          colorScheme="green"
          mt={2}
        >
          Check Answer
        </Button>
      </VStack>
    </MotionBox>
  );
};

export default LearnTuning;
