import React from 'react';
import { Box } from '@chakra-ui/react';

const FullScreenBackground = () => (
  <Box
    position="fixed"
    top={0}
    left={0}
    w="100%"
    h="100%"
    zIndex={-1}
    overflow="hidden"
    bg="rgba(0, 0, 0, 0.4)" // Strat de culoare transparent pentru a îmbunătăți vizibilitatea
  >
    <video
      autoPlay
      muted
      loop
      playsInline
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: '-1',
      }}
    >
      <source src="eart_line3.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </Box>
);

export default FullScreenBackground;
