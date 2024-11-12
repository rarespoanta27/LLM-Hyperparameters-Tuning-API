import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  VStack,
  Heading,
  Input,
  Textarea,
  Select,
  Button,
  CircularProgress,
  useToast,
  Text,
  SimpleGrid,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  Checkbox,
  Divider
} from '@chakra-ui/react';
import { FaArrowRight, FaChartLine, FaRobot } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Tuning = ({ isAuthenticated }) => {
  const [params, setParams] = useState({
    model_identifier: 'gpt2',
    learning_rate: 0.0001,
    batch_size: 10,
    epochs: 4,
    loss_function: 'L1',
    optimizer_name: 'RMSProp',
    input_texts: '',
    target_texts: '',
    random_search: false
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const optimizerOptions = ['AdamW', 'SGD', 'RMSProp', 'LBFGS', 'Adamax', 'Adagrad'];
  const lossFunctionOptions = ['CrossEntropy', 'MSE', 'L1', 'BCE', 'BCEWithLogits', 'Huber'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setParams({
      ...params,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const requestData = {
        ...params,
        input_texts: params.input_texts.split('\n'),
        target_texts: params.target_texts.split('\n')
      };

      console.log("Sending data to server:", requestData);

      const response = await axios.post('http://localhost:8000/tune/', requestData);

      setResults(response.data);
      toast({
        title: "Model tuned successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        toast({
          title: "Error tuning model.",
          description: error.response.data.detail ? JSON.stringify(error.response.data.detail) : "An error occurred on the server.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else if (error.request) {
        console.error('Error request:', error.request);
        toast({
          title: "Error tuning model.",
          description: "No response was received from the server. Please check your server.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error('General error:', error.message);
        toast({
          title: "Error tuning model.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Box p={8} bg="red.500" color="white" borderRadius="md" textAlign="center" mt={10}>
        <Text fontSize="xl" fontWeight="bold">Trebuie să fii logat pentru a folosi tuningul.</Text>
      </Box>
    );
  }

  return (
    <Box>
      <SimpleGrid columns={[1, 2, 3]} spacing={8} mt={8}>
        <MotionBox
          p={6}
          bg="rgba(255, 255, 255, 0.2)"
          borderRadius="md"
          boxShadow="lg"
          backdropFilter="blur(8px)"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Stat>
            <StatLabel color="white">Current Model</StatLabel>
            <StatNumber color="white">{params.model_identifier}</StatNumber>
            <StatHelpText color="white">Optimized with {params.optimizer_name}</StatHelpText>
          </Stat>
          <Flex mt={4} justify="center">
            <FaRobot size="40px" color="white" />
          </Flex>
        </MotionBox>

        <MotionBox
          p={6}
          bg="rgba(255, 255, 255, 0.2)"
          borderRadius="md"
          boxShadow="lg"
          backdropFilter="blur(8px)"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Stat>
            <StatLabel color="white">Learning Rate</StatLabel>
            <StatNumber color="white">{params.learning_rate}</StatNumber>
            <StatHelpText color="white">
              <StatArrow type="increase" />
              Adjust for performance
            </StatHelpText>
          </Stat>
          <Progress mt={4} value={(params.learning_rate * 10000)} colorScheme="blue" />
        </MotionBox>

        <MotionBox
          p={6}
          bg="rgba(255, 255, 255, 0.2)"
          borderRadius="md"
          boxShadow="lg"
          backdropFilter="blur(8px)"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Stat>
            <StatLabel color="white">Batch Size</StatLabel>
            <StatNumber color="white">{params.batch_size}</StatNumber>
            <StatHelpText color="white">Processing size per step</StatHelpText>
          </Stat>
          <Flex mt={4} justify="center">
            <FaChartLine size="40px" color="white" />
          </Flex>
        </MotionBox>
      </SimpleGrid>

      <MotionBox
        mt={8}
        p={6}
        bg="rgba(255, 255, 255, 0.2)"
        borderRadius="md"
        boxShadow="lg"
        backdropFilter="blur(10px)"
        transition={{ duration: 0.6 }}
      >
        <Heading as="h2" size="lg" color="white" mb={6}>Tune Your Model</Heading>
        <VStack as="form" spacing={4} onSubmit={handleSubmit}>
          <Input
            placeholder="Model Identifier"
            name="model_identifier"
            value={params.model_identifier}
            onChange={handleChange}
            bg="rgba(255, 255, 255, 0.6)"
          />
          <Textarea
            placeholder="Input Texts (separate by new lines)"
            name="input_texts"
            value={params.input_texts}
            onChange={handleChange}
            bg="rgba(255, 255, 255, 0.6)"
          />
          <Textarea
            placeholder="Target Texts (separate by new lines)"
            name="target_texts"
            value={params.target_texts}
            onChange={handleChange}
            bg="rgba(255, 255, 255, 0.6)"
          />
          <Input
            type="number"
            placeholder="Learning Rate"
            name="learning_rate"
            value={params.learning_rate}
            onChange={handleChange}
            bg="rgba(255, 255, 255, 0.6)"
          />
          <Input
            type="number"
            placeholder="Batch Size"
            name="batch_size"
            value={params.batch_size}
            onChange={handleChange}
            bg="rgba(255, 255, 255, 0.6)"
          />
          <Input
            type="number"
            placeholder="Epochs"
            name="epochs"
            value={params.epochs}
            onChange={handleChange}
            bg="rgba(255, 255, 255, 0.6)"
          />
          <Select
            name="loss_function"
            value={params.loss_function}
            onChange={handleChange}
            bg="rgba(255, 255, 255, 0.6)"
          >
            {lossFunctionOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
          <Select
            name="optimizer_name"
            value={params.optimizer_name}
            onChange={handleChange}
            bg="rgba(255, 255, 255, 0.6)"
          >
            {optimizerOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
          <Checkbox
            name="random_search"
            isChecked={params.random_search}
            onChange={handleChange}
            color="white"
          >
            Random Search
          </Checkbox>

          <Button type="submit" colorScheme="blue" width="full" isLoading={loading} rightIcon={<FaArrowRight />}>
            Tune Model
          </Button>
        </VStack>

        {loading ? (
          <Box mt={6} textAlign="center">
            <CircularProgress isIndeterminate color="blue.600" size="80px" />
            <Text mt={4} color="white">Please wait while the model is being tuned...</Text>
          </Box>
        ) : results && (
          <MotionBox
            mt={6}
            bg="rgba(255, 255, 255, 0.4)"
            p={6}
            borderRadius="md"
            boxShadow="xl"
            backdropFilter="blur(12px)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Heading as="h3" size="lg" color="white" mb={4} textAlign="center">Tuning Results</Heading>
            {results.error ? (
              <Text color="red.500" fontWeight="bold" fontSize="lg">Error: {results.error}</Text>
            ) : (
              <>
                <Box p={4} bg="whiteAlpha.800" borderRadius="md" mb={4} boxShadow="md">
                  <Text color="black" fontWeight="bold" fontSize="xl"><strong>Final Loss:</strong> {results.loss.toFixed(4)} seconds</Text>
                </Box>
                
                <Box p={4} bg="whiteAlpha.800" borderRadius="md" mb={4} boxShadow="md">
                  <Text color="black" fontWeight="bold" fontSize="xl"><strong>Loss History:</strong></Text>
                  <Flex wrap="wrap" gap={2} mt={2}>
                    {results.loss_history ? results.loss_history.map((loss, index) => (
                      <Box
                        key={index}
                        bg="blue.100"
                        borderRadius="full"
                        px={3}
                        py={1}
                        fontSize="sm"
                        fontWeight="semibold"
                      >
                        {loss.toFixed(4)}
                      </Box>
                    )) : "No loss history available"}
                  </Flex>
                </Box>
                
                <Box p={4} bg="whiteAlpha.800" borderRadius="md" mb={4} boxShadow="md">
                  <Text color="black" fontWeight="bold" fontSize="xl"><strong>Used Parameters:</strong></Text>
                  <Divider my={2} />
                  <VStack align="start" spacing={2}>
                    <Text color="black"><strong>Learning Rate:</strong> {results.best_params ? results.best_params.learning_rate : "N/A"}</Text>
                    <Text color="black"><strong>Batch Size:</strong> {results.best_params ? results.best_params.batch_size : "N/A"}</Text>
                    <Text color="black"><strong>Optimizer:</strong> {results.best_params ? results.best_params.optimizer_name : "N/A"}</Text>
                  </VStack>
                </Box>
                
                <Box p={4} bg="whiteAlpha.800" borderRadius="md" mb={4} boxShadow="md">
                  <Text color="black" fontWeight="bold" fontSize="xl"><strong>Epochs Completed:</strong> {results.epochs_completed ? results.epochs_completed : "N/A"}</Text>
                </Box>
              </>
            )}
          </MotionBox>
        )}
      </MotionBox>
    </Box>
  );
};

export default Tuning;
