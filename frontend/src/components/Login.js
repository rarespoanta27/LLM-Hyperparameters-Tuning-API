import React, { useState } from 'react';
import { Box, Heading, Input, Button, VStack, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login/', {
        email,
        password
      });

      toast({
        title: "Autentificare reușită.",
        description: `Bine ai venit, ${response.data.user}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      onLogin();
      navigate('/introduction');
    } catch (error) {
      toast({
        title: "A apărut o eroare.",
        description: error.response?.data?.detail || "Autentificare nereușită.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={16} p={8} borderRadius="lg" boxShadow="lg" bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(10px)">
      <Heading mb={6} textAlign="center" color="white">Autentificare</Heading>
      <VStack spacing={4}>
        <FormControl id="email">
          <FormLabel color="gray.300">Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Introduceți emailul" />
        </FormControl>
        <FormControl id="password">
          <FormLabel color="gray.300">Parolă</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Introduceți parola" />
        </FormControl>
        <Button colorScheme="blue" width="full" onClick={handleLogin}>Autentificare</Button>
      </VStack>
    </Box>
  );
};

export default Login;
