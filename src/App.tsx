import React from 'react';

import Box from '@mui/material/Box';

import Wheel from './components/Wheel/Wheel';
import PlayerList from './components/Players/PlayerList';
import PlayersContextProvider from './store/players-context';

function App() {
  const generateNames = (numNames: number) => {
    const names = [
      'Alice',
      'Bob',
      'Charlie',
      'Dave',
      'Eve',
      'Frank',
      'Grace',
      'Heidi',
      'Ivan',
      'Judy',
      'Mallory',
      'Oscar',
      'Peggy',
      'Trent',
      'Walter',
      'Xavier',
      'Yvonne',
      'Zack',
      'Uma',
      'Victor',
    ];
    const generatedNames = [];

    for (let i = 0; i < numNames; i++) {
      const name = names[i % names.length];
      const suffix = Math.floor(i / names.length);
      generatedNames.push(suffix === 0 ? name : `${name} ${suffix}`);
    }

    return generatedNames;
  };

  const numberOfParticipants = 10; // Change this number to test with different numbers of participants
  const participants = generateNames(numberOfParticipants);

  return (
    <PlayersContextProvider>
      <Box width="100vw" display="flex">
        <Wheel participants={participants} />
        <PlayerList />
      </Box>
    </PlayersContextProvider>
  );
}

export default App;
