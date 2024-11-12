import React, { useState } from 'react';
import { Box, Heading, Input, Button, VStack, FormControl, FormLabel, useToast} from '@chakra-ui/react';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      toast({
        title: "Email invalid.",
        description: "Emailul trebuie să fie în formatul corect (ex: exemplu@domeniu.com).",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!validatePassword(password)) {
      toast({
        title: "Parolă nevalidă.",
        description: "Parola trebuie să conțină cel puțin o literă mare și un caracter special (!, @, #, etc.).",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/signup/', {
        name,
        email,
        password
      });
      toast({
        title: "Cont creat cu succes.",
        description: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "A apărut o eroare.",
        description: error.response?.data?.detail || "Nu s-a putut crea contul.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={16} p={8} borderRadius="lg" boxShadow="lg" bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(10px)">
      <Heading mb={6} textAlign="center" color="white">Înregistrare</Heading>
      <VStack spacing={4}>
        <FormControl id="name">
          <FormLabel color="gray.300">Nume complet</FormLabel>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Introduceți numele complet" />
        </FormControl>
        <FormControl id="email">
          <FormLabel color="gray.300">Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Introduceți emailul" />
        </FormControl>
        <FormControl id="password">
          <FormLabel color="gray.300">Parolă</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Introduceți parola" />
        </FormControl>
        <Button colorScheme="blue" width="full" onClick={handleSignUp}>Înregistrare</Button>
      </VStack>
    </Box>
  );
};

export default SignUp;
