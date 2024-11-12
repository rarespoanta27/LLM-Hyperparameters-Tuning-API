import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Button,
  Text
} from '@chakra-ui/react';
import FullScreenBackground from './components/FullScreenBackground';
import Introduction from './components/Introduction';
import LearnTuning from './components/LearnTuning';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Tuning from './components/Tuning';
import AccountDetails from './components/AccountDetails';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
   
  };

  return (
    <ChakraProvider>
      <FullScreenBackground />
      <Router>
        <Box maxW="1200px" mx="auto" py={8} px={4} position="relative" zIndex={1}>
          {/* Navbar */}
          <HStack as="nav" bg="blue.600" p={4} borderRadius="md" justify="space-between" boxShadow="md">
            <Link to="/introduction" style={{ color: 'white', fontWeight: 'bold' }}>Introduction</Link>
            <Link to="/tuning" style={{ color: 'white', fontWeight: 'bold' }}>Tuning</Link>
            <Link to="/learn-tuning" style={{ color: 'white', fontWeight: 'bold' }}>Learn About Tuning</Link>
            <Link to="/about-us" style={{ color: 'white', fontWeight: 'bold' }}>About Us</Link>

            {isAuthenticated ? (
              <Menu>
                <MenuButton as={Button} bg="transparent" _hover={{ bg: 'blue.700' }}>
                  <Avatar size="sm" name="User" src="/path/to/avatar.png" />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link to="/account-details">Detalii cont</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Text color="red.500">Logout</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <Link to="/login" style={{ color: 'white', fontWeight: 'bold' }}>Login</Link>
                <Link to="/signup" style={{ color: 'white', fontWeight: 'bold' }}>Sign Up</Link>
              </>
            )}
          </HStack>

          {/* Routes */}
          <Routes>
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/learn-tuning" element={<LearnTuning />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/tuning" element={<Tuning isAuthenticated={isAuthenticated} />} />
            <Route path="/account-details" element={<AccountDetails isAuthenticated={isAuthenticated} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </Box>

        {/* Footer */}
        <Box
          as="footer"
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          py={4}
          textAlign="center"
          color="gray.300"
          fontFamily="Poppins, sans-serif"
          fontSize="sm"
        >
          Developed by Rares.
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
