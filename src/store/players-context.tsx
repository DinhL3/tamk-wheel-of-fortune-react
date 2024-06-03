import React, { createContext, useState, useRef, useEffect } from 'react';
import { Player } from '../models/player.model';

type PlayersContextObj = {
  players: Player[];
  addPlayer: (player: Player) => void;
  removePlayer: (player: Player) => void;
};

export const PlayersContext = createContext<PlayersContextObj>({
  players: [],
  addPlayer: () => {},
  removePlayer: () => {},
});

interface Props {
  children: React.ReactNode;
}

const PlayersContextProvider = ({ children }: Props) => {
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = (player: Player) => {
    setPlayers((prevPlayers) => [...prevPlayers, player]);
  };

  const removePlayer = (player: Player) => {
    setPlayers((prevPlayers) => prevPlayers.filter((p) => p.id !== player.id));
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
