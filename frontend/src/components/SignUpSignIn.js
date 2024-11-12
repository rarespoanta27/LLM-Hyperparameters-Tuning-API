




///TEST///




















import React from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';

const MotionBox = motion(Box);

const SignUpSignIn = () => {

  const handleGoogleLoginSuccess = (response) => {
    console.log("Google Login Success:", response);
    // Trimite token-ul la backend pentru validare sau creează un user pe baza acestuia
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  return (
    <MotionBox
      p={8}
      maxW="400px"
      mx="auto"
      mt={24}
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(10px)"
      borderRadius="lg"
      boxShadow="xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <Heading
        size="lg"
        mb={6}
        color="white"
        textAlign="center"
        as={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Sign In with Google
      </Heading>

      <VStack spacing={4}>
        {/* Google Login Button */}
        <Box pt={4}>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            useOneTap
          />
        </Box>
      </VStack>
    </MotionBox>
  );
};

export default SignUpSignIn;
