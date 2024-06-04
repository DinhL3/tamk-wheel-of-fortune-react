import React, { createContext, useState, useRef, useEffect } from 'react';
import { Player } from '../models/player.model';

type PlayersContextObj = {
  players: Player[];
  addPlayer: (player: Player) => void;
  removePlayer: (id: string) => void;
};

export const PlayersContext = createContext<PlayersContextObj>({
  players: [],
  addPlayer: () => {},
  removePlayer: () => {},
});

interface Props {
  children: React.ReactNode;
}

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

  return generatedPlayers;
};

const PlayersContextProvider = ({ children }: Props) => {
  //change the number of players below to change the number of random generated players, do not go under 4, not working atm
  const [players, setPlayers] = useState<Player[]>(generatePlayers(4));

  const addPlayer = (player: Player) => {
    setPlayers((prevPlayers) => [...prevPlayers, player]);
  };

  const removePlayer = (id: string) => {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.id !== id)
    );
  };

  const contextValue: PlayersContextObj = {
    players: players,
    addPlayer: addPlayer,
    removePlayer: removePlayer,
  };

  return (
    <PlayersContext.Provider value={contextValue}>
      {children}
    </PlayersContext.Provider>
  );
};

export default PlayersContextProvider;
