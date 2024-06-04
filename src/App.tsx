import React, { useContext } from 'react';

import Box from '@mui/material/Box';

import Wheel from './components/Wheel/Wheel';
import PlayerList from './components/Players/PlayerList';
import PlayersContextProvider, {
  PlayersContext,
} from './store/players-context';

import { Player } from './models/player.model';

function App() {
  const playersCtx = useContext(PlayersContext);

  const generatePlayers = (numPlayers: number) => {
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
    const generatedPlayers: Player[] = [];

    const generateId = () => {
      return Math.random().toString().slice(2, 9);
    };

    for (let i = 0; i < numPlayers; i++) {
      const name = names[i % names.length];
      const suffix = Math.floor(i / names.length);
      const playerName = suffix === 0 ? name : `${name} ${suffix}`;
      generatedPlayers.push({ id: generateId(), name: playerName });
    }

    console.log(generatedPlayers);

    return generatedPlayers;
  };

  const generatedPlayers = generatePlayers(50);
  console.log(generatedPlayers);

  return (
    <PlayersContextProvider>
      <Box width="100vw" display="flex" justifyContent="space-around">
        <Wheel players={generatedPlayers} />
        <PlayerList />
      </Box>
    </PlayersContextProvider>
  );
}

export default App;
